# Class 2: Docker এবং Local Deployment

## Docker কী?

Docker package করে তোমার app এবং সব dependencies-কে একটা single unit-এ। যাকে call করি **image**। যখন image run করো, তখন তার একটা copy running থাকে যাকে call করি **container**।

**Analogy**: Docker image হলো রেসিপি, container হলো cooked meal।

---

## কেন Docker?

Production problem-এর common শুনা যায়:
> "আমার laptop-এ চলে কিন্তু server-এ crash হয়।"

Docker solution দেয়: same environment সবখানে।
- Same Node version
- Same npm packages
- Same operating system

---

## Dockerfile — Recipe লিখো

Dockerfile হলো একটা file যেখানে বলো Docker কীভাবে image তৈরি করবে।

### Simple Dockerfile

```dockerfile
FROM node:20-alpine           # Start from Node 20 image
WORKDIR /app                  # Container-এর working directory
COPY package.json .           # Copy package.json container-এ
RUN npm install               # Dependencies install করো
COPY . .                       # সব source code copy করো
EXPOSE 3000                    # এই port expose করছি (documentation)
CMD ["node", "src/main.js"]   # Container start হলে এটা run করো
```

### Multi-Stage Build (Production-এর জন্য)

সমস্যা: simple Dockerfile-এ সব tool থাকে (build tools, dev dependencies), যা production-এ লাগে না। Image large হয়।

Solution: Two stages — build করো একটায়, run করো আরেকটায়।

```dockerfile
# Stage 1: Builder (build-time dependencies থাকে)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json .
RUN npm install --only=prod        # Production dependencies শুধু
COPY . .

# Stage 2: Runtime (শুধু runtime files)
FROM node:20-alpine
WORKDIR /app
# Builder stage থেকে files copy করো
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json .
EXPOSE 3000
CMD ["node", "src/main.js"]
```

**Benefits:**
- Stage 1: সব build tools, dev dependencies
- Stage 2: শুধু চলার জন্য লাগা file
- Final image: 50MB (vs 300MB যদি সবকিছু থাকত)

---

## Docker Image Build এবং Run করো

### Image Build করো

```bash
# Build করো tag-এর সাথে
docker build -t taskapp:1.0.0 .

# Run করো
docker run -p 3000:3000 taskapp:1.0.0

# Environment variables pass করো
docker run \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=mongodb://localhost:27017/taskdb \
  taskapp:1.0.0
```

### Docker Commands

```bash
docker images              # Built images দেখো
docker ps                  # Running containers দেখো
docker logs <container-id> # Container logs দেখো
docker stop <container-id> # Container stop করো
docker rm <container-id>   # Container remove করো
```

---

## docker-compose — Multiple Services

যখন app + database চালাতে হয়, docker-compose use করো।

### docker-compose.yml

```yaml
version: '3.8'

services:
  # Express app
  app:
    build: .                           # এই folder-এ Dockerfile আছে
    ports:
      - "3000:3000"                     # localhost:3000 → container:3000
    environment:                        # or you can   env_file:
      - NODE_ENV=development            #                  - .env
      - PORT=3000
      - DATABASE_URL=mongodb://mongo:27017/taskdb
      - LOG_LEVEL=debug
      - JWT_SECRET=dev-secret-ok
    depends_on:
      - mongo                           # Mongo start হওয়া পর্যন্ত wait করো
    volumes:
      - .:/app                          # Local folder sync করো (hot-reload)
      - /app/node_modules               # node_modules sync করো না
    networks:
      - tasknet                         # Internal network

  # MongoDB service
  mongo:
    image: mongo:6-alpine               # Docker Hub-এ থাকা image use করো
    ports:
      - "27017:27017"                   # localhost:27017 → container:27017
    environment:
      - MONGO_INITDB_DATABASE=taskdb
    volumes:
      - mongo_data:/data/db             # Data persist করো
    networks:
      - tasknet

volumes:
  mongo_data:                           # Named volume (data survive করে restart-এ)

networks:
  tasknet:                              # Internal network যাতে services কথা বলতে পারে
```

### docker-compose Usage

```bash
# Start all services (foreground-এ)
docker-compose up

# Start সব services background-এ
docker-compose up -d

# Logs দেখো (follow mode)
docker-compose logs -f app

# Image rebuild করে start করো
docker-compose up --build

# Stop সব services
docker-compose down

# Stop করো এবং volumes remove করো
docker-compose down -v
```

---

## Environment Variables Docker-এ

### Method 1: docker-compose.yml-এ hardcode করা

```yaml
services:
  app:
    environment:
      - DATABASE_URL=mongodb://mongo:27017/taskdb
```

### Method 2: .env file use করা

docker-compose `.env` file automatically load করে:

```bash
# .env (in project root)
NODE_ENV=development
DATABASE_URL=mongodb://mongo:27017/taskdb
JWT_SECRET=my-secret
```

```yaml
# docker-compose.yml
services:
  app:
    environment:
      - NODE_ENV=${NODE_ENV}         # .env থেকে read করো
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
```

### Method 3: Command line

```bash
docker-compose --env-file=.env.prod up
```

---

## Docker Volumes — Data Persist করা

Volumes ছাড়া, container stop হলে data lost হয়ে যায়।

### Named Volumes (Database-এর জন্য)

```yaml
services:
  mongo:
    volumes:
      - mongo_data:/data/db   # Named volume

volumes:
  mongo_data:
```

MongoDB data `mongo_data` volume-এ save থাকে। Container restart হলেও data থাকে।

### Bind Mounts (Local development-এ)

```yaml
services:
  app:
    volumes:
      - .:/app   # Local current directory → /app in container
```

এখন local code edit করলে container-এ automatic update হয় (hot-reload)।

---

## Common Docker Problems

### "Port 3000 already in use"

```bash
# Different port use করো
docker run -p 3001:3000 taskapp
```

### "Container exits immediately"

```bash
docker logs <container-id>   # Error দেখো
```

### "Database connection refused"

Makefile sure:
- `docker-compose.yml`-এ `depends_on` আছে
- `DATABASE_URL` সঠিক (container-এর মধ্যে hostname use করো: `mongodb://mongo:27017`, না `localhost`)

### "Can't find Dockerfile"

```bash
# Dockerfile project root-এ থাকা উচিত, না src/-এ
ls -la Dockerfile
docker build -t taskapp .
```

---

## Development Workflow

```bash
# ১. Services start করো
docker-compose up

# २. Local code edit করো
# src/main.js change করো
# Container automatically reload হয়ে যাবে (volume mount করা আছে)

# ३. Test করো
curl http://localhost:3000/health

# ४. Stop করো
Ctrl+C
docker-compose down
```

---

## মনে রাখো

- **Docker consistency** — Same environment সবখানে (dev, test, prod)
- **Multi-stage builds** — Production image ছোট রাখো
- **Volumes** — Data persist করো (database-এর জন্য)
- **Networks** — Services container-এর মধ্যে communicate করতে পারে
- **env files** — Secrets Docker-এ safe রাখো

---

## পরবর্তী

এখন local development environment complete — app + database দুটোই Docker-এ। পরের classes-এ এই setup use করে actual code লিখব।

# Class 1: Industry Context — Real Companies কীভাবে Backend তৈরি করে?

---

## Monolith থেকে Microservices এর যাত্রা

### Stage 1: The Monolith (যেখান থেকে বেশিরভাগ Startups শুরু করে)

Monolith হলো একটা বড় application যা সবকিছু করে: users, products, orders, payments, সবই।

```
┌──────────────────────────────┐
│     Express Monolith         │
├──────────────────────────────┤
│  • User Service              │
│  • Product Service           │
│  • Order Service             │
│  • Payment Service           │
│  • Email Service             │
│  • Auth Service              │
│  • Logging                   │
│  • Caching                   │
└──────────────────────────────┘
         ↓
    একটা Database
```

**ভালো দিক**:
- Deploy করা সহজ (একটা container, একটা process)।
- Code share করা সহজ (সব services একই repository তে)।
- Debug করা সহজ (সবকিছু এক জায়গায়)।

**খারাপ দিক**:
- একটা bug = পুরো app down।
- Scaling: যদি order-processing এ বেশি power দরকার, পুরো app scale করতে হয়, অন্য features waste হয়।
- Deployment risk: Email Service এ একটা bug, Payment Service ও ধরিয়ে যায়।
- Technology lock-in: সব services একই tech stack, একই database ব্যবহার করে।

### Stage 2: Layered Monolith (এই Class আমাদের যেখানে নিয়ে যায়)

Monolith কে layers দিয়ে structure করো। একই app, কিন্তু সংগঠিত:

```
┌──────────────────────────────────────┐
│         Express App                  │
├──────────────────────────────────────┤
│  Routes Layer                        │
│  ├── /users                          │
│  ├── /products                       │
│  └── /orders                         │
├──────────────────────────────────────┤
│  Middleware Layer                    │
│  ├── Auth                            │
│  ├── Logging                         │
│  └── Error Handling                  │
├──────────────────────────────────────┤
│  Controller Layer                    │
│  ├── userController                  │
│  ├── productController               │
│  └── orderController                 │
├──────────────────────────────────────┤
│  Service Layer                       │
│  ├── userService                     │
│  ├── productService                  │
│  └── orderService                    │
├──────────────────────────────────────┤
│  Repository Layer                    │
│  ├── userRepository                  │
│  ├── productRepository               │
│  └── orderRepository                 │
└──────────────────────────────────────┘
        ↓
  PostgreSQL Database
```

**লাভ**: প্রতিটা service independently test, modify, বা replace করা যায়।

### Stage 3: Modular Monolith

একই app, কিন্তু feature modules দিয়ে সংগঠিত:

```
src/
  ├── modules/
  │   ├── users/
  │   │   ├── routes.js
  │   │   ├── controller.js
  │   │   ├── service.js
  │   │   ├── repository.js
  │   │   ├── dto.js
  │   │   └── types.js
  │   ├── products/
  │   │   └── [একই structure]
  │   ├── orders/
  │   │   └── [একই structure]
  │   └── shared/
  │       ├── middleware/
  │       ├── guards/
  │       ├── pipes/
  │       └── utils/
```

**লাভ**: পরে প্রতিটা module কে separate microservice এ extract করা যায়।

### Stage 4: Microservices (ভবিষ্যত)

যখন monolith খুব বড় হয়ে যায়, তখন এটা separate services এ split করা হয়:

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ User Service│    │Product Srvc │    │ Order Srvc  │
├─────────────┤    ├─────────────┤    ├─────────────┤
│ Express App │    │ Express App │    │ Express App │
│ + Auth DB   │    │ + Product DB│    │ + Order DB  │
└─────────────┘    └─────────────┘    └─────────────┘
      ↓                  ↓                  ↓
   Port 3001         Port 3002         Port 3003

API Gateway
(Requests combine করে, services এ route করে)
```

**লাভ**: প্রতিটা service independently scale, fail, বা deploy হতে পারে।

**এই Class এ**: আমরা stage 2–3 তৈরি করছি (layered, modular monolith)। এই layers এখন বুঝলে পরে microservice extract করা trivial হয়ে যাবে।

---

## Real-World Example: Uber-এর মতো Backend

### Feature: একটা Ride Book করা

**API Endpoint**: `POST /rides`

**Request**:
```json
{
  "pickupLocation": { "lat": 37.7749, "lng": -122.4194 },
  "dropoffLocation": { "lat": 37.3382, "lng": -121.8863 }
}
```

**Response** (201 Created):
```json
{
  "rideId": "ride_123",
  "driverId": "driver_456",
  "estimatedPrice": 45.50,
  "estimatedArrival": 5,
  "status": "finding_driver"
}
```

### প্রতিটা Layer কীভাবে কাজ করে

#### Repository Layer (Data Access)

```javascript
// repositories/rideRepository.js
class RideRepository {
  async create(ride) {
    // Database এ insert করো
    return db.ride.create(ride);
  }

  async findNearbyDrivers(location, radius) {
    // Geo-spatial query
    return db.driver.findMany({
      location: { near: location, within: radius }
    });
  }

  async updateStatus(rideId, status) {
    return db.ride.update(rideId, { status });
  }
}
```

#### Service Layer (Business Logic)

```javascript
// services/rideService.js
class RideService {
  constructor(rideRepository, driverService, pricingService, notificationService) {
    this.rideRepository = rideRepository;
    this.driverService = driverService;
    this.pricingService = pricingService;
    this.notificationService = notificationService;
  }

  async bookRide(dto) {
    // 1. Location validate করো
    if (!this.isValidLocation(dto.pickupLocation)) {
      throw new InvalidLocationError('Pickup location out of service area');
    }

    // 2. Price calculate করো
    const estimatedPrice = await this.pricingService.calculatePrice(
      dto.pickupLocation,
      dto.dropoffLocation
    );

    // 3. Ride record create করো
    const ride = await this.rideRepository.create({
      userId: dto.userId,
      pickupLocation: dto.pickupLocation,
      dropoffLocation: dto.dropoffLocation,
      estimatedPrice,
      status: 'finding_driver'
    });

    // 4. Drivers খুঁজো (async, background এ)
    this.findAndAssignDriver(ride.id).catch(err => {
      console.error('Driver assignment failed:', err);
      // Notification পাঠাও, retry করো, ইত্যাদি
    });

    // 5. User কে notify করো
    await this.notificationService.sendNotification(dto.userId, {
      type: 'ride_booked',
      rideId: ride.id
    });

    return this.toRideDTO(ride);
  }

  async findAndAssignDriver(rideId) {
    const ride = await this.rideRepository.findById(rideId);
    const drivers = await this.rideRepository.findNearbyDrivers(
      ride.pickupLocation,
      5 // 5 km radius
    );

    if (drivers.length === 0) {
      // কোনো driver available নেই
      await this.rideRepository.updateStatus(rideId, 'no_driver_available');
      return;
    }

    // প্রথম available driver কে assign করো
    const driver = drivers[0];
    await this.rideRepository.updateStatus(rideId, 'driver_assigned');
    await this.notificationService.notifyDriver(driver.id, {
      type: 'ride_request',
      rideId: ride.id
    });
  }

  toRideDTO(ride) {
    return {
      rideId: ride.id,
      driverId: ride.driverId,
      estimatedPrice: ride.estimatedPrice,
      estimatedArrival: 5, // Simplified
      status: ride.status
    };
  }
}
```

#### Controller Layer (HTTP Handler)

```javascript
// controllers/rideController.js
class RideController {
  constructor(rideService) {
    this.rideService = rideService;
  }

  async bookRide(req, res, next) {
    try {
      // 1. Authenticated request থেকে user extract করো
      const userId = req.user.id;

      // 2. Request body validate করো
      const dto = this.validateBookRideDTO(req.body);

      // 3. Service কল করো
      const ride = await this.rideService.bookRide({
        ...dto,
        userId
      });

      // 4. Response পাঠাও
      res.status(201).json(ride);
    } catch (err) {
      next(err); // Error middleware কে pass করো
    }
  }

  validateBookRideDTO(body) {
    // Zod বা Joi দিয়ে validation করো
    if (!body || typeof body !== 'object') {
      throw new ValidationError('Invalid request body');
    }

    const { pickupLocation, dropoffLocation } = body;

    if (!pickupLocation || !dropoffLocation) {
      throw new ValidationError('Locations are required');
    }

    return { pickupLocation, dropoffLocation };
  }
}
```

#### Route Layer

```javascript
// routes/rides.js
const router = express.Router();

router.post(
  '/',
  authenticate,  // Middleware: JWT check করো
  rateLimitMiddleware,  // Middleware: abuse prevent করো
  (req, res, next) => new RideController(rideService).bookRide(req, res, next)
);

export default router;

// main.js এ:
app.use('/rides', ridesRouter);
```

### Request Flow

```
POST /rides { pickup, dropoff }
    ↓
Route matches: POST /rides → controller.bookRide
    ↓
Middleware: authenticate (JWT token check করো)
    ↓
Middleware: rateLimitMiddleware (rate limit check করো)
    ↓
Controller: validateBookRideDTO (sanity check)
    ↓
Service: bookRide (business logic)
    ├─ Locations validate করো
    ├─ Price calculate করো
    ├─ DB এ ride create করো (repository এর মাধ্যমে)
    ├─ Drivers খুঁজো (async)
    └─ User কে notify করো
    ↓
Response: 201 { rideId, driverId, estimatedPrice, ... }
```

---

## Error Handling at Scale

### Structured Error Responses

বড় companies শুধু `{ error: 'something went wrong' }` return করে না। তারা errors কে structure করে:

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Invalid request",
  "statusCode": 400,
  "timestamp": "2026-04-18T10:30:00Z",
  "path": "/rides",
  "errors": [
    {
      "field": "pickupLocation",
      "message": "Latitude must be between -90 and 90"
    },
    {
      "field": "dropoffLocation",
      "message": "Location is outside service area"
    }
  ],
  "requestId": "req_abc123" // Tracing এর জন্য
}
```

### Error Classes

Strings throw না করে, structured errors throw করো:

```javascript
// errors/AppError.js
class AppError extends Error {
  constructor(code, statusCode, message, details) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

class ValidationError extends AppError {
  constructor(message, details) {
    super('VALIDATION_ERROR', 400, message, details);
  }
}

class NotFoundError extends AppError {
  constructor(resource) {
    super('NOT_FOUND', 404, `${resource} not found`);
  }
}

class UnauthorizedError extends AppError {
  constructor() {
    super('UNAUTHORIZED', 401, 'Authentication required');
  }
}
```

### Error Middleware

```javascript
app.use((err, req, res, next) => {
  const error = err instanceof AppError
    ? err
    : new AppError('INTERNAL_ERROR', 500, 'Internal server error');

  const response = {
    code: error.code,
    message: error.message,
    statusCode: error.statusCode,
    timestamp: new Date().toISOString(),
    path: req.path,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    ...(error.details && { errors: error.details })
  };

  res.status(error.statusCode).json(response);
});
```

---

## Logging & Observability

### Structured Logging

`console.log` এর বদলে structured logging ব্যবহার করো:

```javascript
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty'
  }
});

// ❌ খারাপ
console.log('User created');

// ✅ ভালো
logger.info({
  event: 'user_created',
  userId: '123',
  email: 'alice@example.com',
  timestamp: new Date().toISOString()
});
```

### Request Tracing

প্রতিটা log entry তে একটা request ID যোগ করো:

```javascript
function requestIdMiddleware(req, res, next) {
  const requestId = generateId();
  req.id = requestId;

  logger.info({
    event: 'request_received',
    requestId,
    method: req.method,
    path: req.path
  });

  // Request lifecycle এর পরে:
  logger.info({
    event: 'user_created',
    requestId, // একই ID!
    userId: '123'
  });

  next();
}
```

একটা single request এর সব logs একই `requestId` থাকে, যাতে পুরো flow trace করা সহজ হয়।

---

## Security Patterns

### API Keys

Machine-to-machine communication এর জন্য:

```javascript
function authenticateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }

  const client = validateApiKey(apiKey);
  if (!client) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  req.client = client;
  next();
}
```

### Rate Limiting

Brute force attacks এবং abuse prevent করো:

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // windowMs এ max 100 requests
  message: 'Too many requests, try again later'
});

app.use(limiter);
```

### CORS (Cross-Origin Resource Sharing)

কোন domains তোমার API access করতে পারবে তা control করো:

```javascript
import cors from 'cors';

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  credentials: true
}));
```

---

## Performance Considerations

### Caching

Frequently-accessed data কে cache করো:

```javascript
class RideService {
  async getDriverLocation(driverId) {
    // প্রথমে cache check করো
    const cached = await redis.get(`driver:${driverId}:location`);
    if (cached) return JSON.parse(cached);

    // Database থেকে fetch করো
    const location = await this.rideRepository.getDriverLocation(driverId);

    // 30 seconds এর জন্য cache করো
    await redis.setex(`driver:${driverId}:location`, 30, JSON.stringify(location));

    return location;
  }
}
```

### Async Jobs

Long-running tasks request lifecycle এর বাইরে চলা উচিত:

```javascript
class RideService {
  async bookRide(dto) {
    // ... quick operations ...

    // Long-running task queue করো
    await jobQueue.add('find-and-assign-driver', { rideId: ride.id });

    // এখনই return করো
    return this.toRideDTO(ride);
  }
}

// Worker (separately চলে)
jobQueue.process('find-and-assign-driver', async (job) => {
  const { rideId } = job.data;
  const ride = await rideRepository.findById(rideId);
  // ... driver খুঁজো, notify করো, ইত্যাদি ...
});
```

---

## সারসংক্ষেপ

- **Layering** optional নয় real systems এ। এটা code এর মধ্যে পার্থক্য যা কাজ করে এবং code যা *scale* করে।
- **Real companies** features (modules) দিয়ে organize করে এবং প্রতিটা module এর মধ্যে layers আছে।
- **Error handling** structured, শুধু strings নয়।
- **Logging** production debugging এর জন্য, শুধু local development নয়।
- **Security** এবং **performance** architecture এ বেঁধে দেওয়া, পরে নয়।

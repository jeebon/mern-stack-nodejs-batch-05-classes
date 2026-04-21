# ব্যাকএন্ডে ঢোকার আগে যা জানা দরকার

**ধরন**: Pre-Class Warm-up  
**সময়**: 60-90 মিনিট self-study  
**উদ্দেশ্য**: Next class শুরু করার আগে frontend থেকে backend-এ smooth transition করা

---

## এই Class-এ কী শিখবো?

এই warm-up শেষে আপনি:

1. **Browser আর server-এর role আলাদা করে বুঝবেন** — Client vs Server architecture
2. **HTTP request/response flow explain করতে পারবেন** — কীভাবে data আদান-প্রদান হয়
3. **Internet basic concepts জানবেন** — Network, Router, ISP, IP addresses
4. **TCP, UDP, এবং HTTP বুঝবেন** — Different protocols আর তাদের ব্যবহার
5. **Terminal commands use করতে পারবেন** — Windows এবং Linux basic commands
6. **NAT এবং Server basics বুঝবেন** — Real-world network concepts

---

## এই Class-এ আসার আগে যা জানা থাকা দরকার

- JavaScript basics জানেন (আমরা code example দেব)
- Browser devtools দেখেছেন
- Internet ব্যবহার করতে পারেন!

---

## কার জন্য?

এই primer তাদের জন্য যারা:

- JavaScript জানেন কিন্তু backend এখনো নতুন
- frontend framework যেমন React/Vue/Next.js নিয়ে কাজ করেছেন
- API use করেছেন, কিন্তু API build করেননি
- `GET`, `POST` শব্দগুলো শুনেছেন, কিন্তু গভীরভাবে বুঝতে চান
- `localhost:3000` দেখলে ভয় পান না, কিন্তু পুরো ব্যাপারটা আরো clear করতে চান

---

## Key Concepts at a Glance

### Client vs Server

- **Client**: Browser, mobile app, frontend app যা user-এর device-এ চলে
- **Server**: Logic chালায় এবং data serve করে, দূরবর্তী computer-এ থাকে

### HTTP

- Protocol যা web-এ communication-এর নিয়ম define করে
- Request: Client server-এ কিছু চায়
- Response: Server উত্তর পাঠায়

### IP Address

- Internet-এ প্রতিটি device-এর একটা unique address (যেমন `192.168.1.1` বা `203.76.221.45`)
- `localhost` = নিজের machine (`127.0.0.1`)

### Port

- একই machine-এ multiple services থাকতে পারে
- Port বলে দেয় কোন service-এ যেতে হবে (যেমন `3000`, `5432`)

---

## Topic Checklist

### 1. Client vs Server

Frontend-এ আপনি মূলত **client side**-এ ছিলেন। Browser user-এর device-এ চলে, UI render করে, button click ধরে, form submit করে।

Backend-এর **server side** কাজ হলো request receive করা, logic চালানো, database-এর সাথে কথা বলা, তারপর response পাঠানো।

**Analogy**: Client হলো restaurant-এর customer, server হলো kitchen। Customer menu দেখে order দেয়, kitchen decide করে কীভাবে রান্না হবে।

Study:
- [MDN: Client-side vs. server-side](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview)

---

### 2. HTTP

`fetch('/api/users')` লিখে আপনি যেটা করেন, সেটা আসলে একটা **HTTP request** পাঠানো।

HTTP হলো browser আর server-এর কথাবলার নিয়ম। কে কী চাইছে, কোন format-এ চাইছে, response কেমন হবে - এসবের language।

Study:
- [MDN: An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)

---

### 3. Request এবং Response

**Request** মানে client-এর প্রশ্ন।  
**Response** মানে server-এর উত্তর।

উদাহরণ:

```ts
fetch("/api/users");
```

এখানে browser বলছে: "ভাই, users দাও।"

Response যদি `200 OK` হয়, মানে server বলছে: "নাও, data দিলাম।"  
`404` হলে: "এই জিনিস এখানে নাই।"

Study:
- [MDN: HTTP messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)

---

### 4. HTTP Methods

সব request এক কাজের জন্য না।

- `GET` = data চাই
- `POST` = নতুন data বানাও
- `PUT` = পুরো data replace করো
- `PATCH` = কিছু অংশ update করো
- `DELETE` = data মুছে ফেলো

Frontend-এ আপনি অনেক সময় শুধু `GET`/`POST` বেশি দেখেছেন। Backend-এ method choice অনেক important।

Study:
- [MDN: HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

---

### 5. Status Codes

Server answer-এর সাথে 3-digit number দেয়। এইটাই status code।

- `200` = সব ঠিক
- `201` = নতুন কিছু তৈরি হয়েছে
- `400` = request-এ সমস্যা
- `401` = login দরকার
- `403` = login আছে, permission নাই
- `404` = পাওয়া যায়নি
- `500` = server side bug

Study:
- [MDN: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

---

### 6. URL Anatomy

এই URL-টা দেখুন:

```txt
http://localhost:3000/users?active=true
```

এখানে:

- `http` = protocol
- `localhost` = host
- `3000` = port
- `/users` = path
- `active=true` = query parameter

Frontend-এ routing করেছেন, কিন্তু backend-এ URL মানে incoming request-এর address.

Study:
- [MDN: What is a URL?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL)

---

### 7. DNS এবং IP

মানুষ domain name মনে রাখে, machine IP address বোঝে।

`google.com` টাইপ করলে browser magic করে না; DNS বলে দেয় কোন server-এ যেতে হবে।

**Analogy**: আপনার বন্ধুর নাম "রফিক", কিন্তু delivery rider-এর দরকার actual বাসার ঠিকানা।

Study:
- [MDN: How does the Internet work?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work)

---

### 8. JSON

Backend আর frontend data আদান-প্রদানের সবচেয়ে common format হলো `JSON`।

উদাহরণ:

```json
{
  "id": 1,
  "name": "Jeebon",
  "role": "student"
}
```

এটা basically data পাঠানোর clean, readable format।

যদি JavaScript object family-এর formal dress code থাকত, JSON সেই dress code.

Study:
- [MDN: JSON](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON)

---

### 9. REST API

REST API-তে সাধারণত resource-based URL ব্যবহার করা হয়।

উদাহরণ:

- `GET /users` = সব user
- `GET /users/42` = user 42
- `POST /users` = নতুন user

মানে URL দিয়ে resource identify করা হয়, method দিয়ে action বোঝানো হয়।

Frontend-এ API consume করতে গিয়ে এগুলো use করেছেন। Backend-এ এখন এগুলো design করবেন।

Study:
- [MDN: Web APIs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Introduction)
- [REST API Tutorial](https://restfulapi.net/)

---

### 10. Node.js

Node.js হলো browser-এর বাইরে JavaScript run করার runtime।

Browser-এ JavaScript মূলত UI আর browser APIs নিয়ে কাজ করে। Node.js-এ JavaScript file system, network, server process ইত্যাদির সাথে কাজ করতে পারে।

এক কথায়: JavaScript-কে browser hostel থেকে বের করে real world-এ চাকরি দেওয়ার নাম Node.js.

Study:
- [Node.js Learn](https://nodejs.org/en/learn)
- [freeCodeCamp: Node.js Course](https://www.freecodecamp.org/news/learn-node-js-full-course/)

---

### 11. npm / pnpm

এগুলো package manager।

আপনি যখন `npm install express` দেন, তখন project-এ dependency যোগ করেন।

Frontend-এ যেমন React app-এ package install করেছেন, backend-এও একই idea - শুধু package list অন্যরকম হবে।

`npm` হলো পরিচিত পাড়া-প্রতিবেশী, `pnpm` হলো একটু organized cousin.

Study:
- [npm Docs](https://docs.npmjs.com/)
- [pnpm Docs](https://pnpm.io/)

---

### 12. Terminal / CLI Basics

Backend-এ terminal-এর সাথে বন্ধুত্ব করতেই হবে।

কমপক্ষে এগুলো comfortable হওয়া উচিত:

```bash
pwd
ls
cd dirname
node -v
npm -v
pnpm -v
```

আপনি যদি terminal-কে এড়িয়ে চলেন, backend আপনাকে politely ignore করবে।

Study:
- [MDN: Command line crash course](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)

---

### 13. localhost এবং Port

`localhost` মানে আপনার নিজের machine।

`3000`, `5000`, `8080` এগুলো port - ভাবতে পারেন building-এর flat number-এর মতো। একই machine-এ অনেক service থাকতে পারে, port বলে দেয় কোন দরজায় knock করতে হবে।

`http://localhost:3000` মানে: "আমার নিজের computer-এর 3000 নম্বর service-এর সাথে কথা বলো।"

Study:
- [MDN: Local testing server](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/set_up_a_local_testing_server)

---

### 14. Environment Variables এবং `.env`

সব configuration code-এর ভেতরে লিখে রাখা ভালো idea না।

যেমন:

- database URL
- JWT secret
- port number
- API key

এসব `.env`-এ রাখা হয়, যাতে code আর config আলাদা থাকে।

আর হ্যাঁ, secret জিনিস GitHub-এ push করলে সেটা learning না, public announcement হয়ে যায়।

Study:
- [Node.js: Environment Variables](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs)

---

### 15. TypeScript Quick Refresh

`Next class`-এ request shape, response shape - এগুলো বুঝতে TypeScript basics দরকার।

বিশেষ করে:

- type vs interface
- function type
- object shape
- optional property
- strict mode

TypeScript backend-এ annoying friend না; future-you-এর unpaid bodyguard.

Study:
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

### 16. API Testing Tools

Frontend থাকলে browser devtools use করেন। Backend-এ request test করার জন্য Postman, Bruno, Thunder Client খুব useful।

এগুলো দিয়ে browser UI ছাড়া সরাসরি API hit করা যায়।

মানে kitchen test করতে customer বসিয়ে full restaurant খোলার দরকার নেই।

Study:
- [Postman Learning Center](https://learning.postman.com/)
- [Bruno Docs](https://docs.usebruno.com/)
- [Thunder Client](https://www.thunderclient.com/)

---

### 17. Git এবং GitHub Refresh

Backend শিখতে গিয়ে code change করবেন, branch করবেন, commit করবেন, pull request দেখবেন।

At minimum এগুলো জানা ভালো:

```bash
git status
git add .
git commit -m "message"
git pull
```

Git না জানলে coding যায়, কিন্তু teamwork আটকে যায়।

Study:
- [GitHub Docs: Hello World](https://docs.github.com/en/get-started/start-your-journey/hello-world)

---

### 18. Internet কীভাবে কাজ করে?

Internet হলো বিশ্বব্যাপী interconnected computers-এর network।

**মূল concepts:**
- **Network**: Connected computers যারা data share করে
- **Router**: Data packets সঠিক destination-এ পাঠায়
- **ISP** (Internet Service Provider): আপনার internet connection provide করে

**Simple analogy**: Postal system-এর মতো — router হলো post office, packets হলো letters।

**Example**: আপনি `google.com` visit করলে:
1. Request আপনার router থেকে ISP-তে যায়
2. ISP সেটা Google-এর server-এ forward করে
3. Google response পাঠায় একই path দিয়ে back

Study:
- [MDN: How does the Internet work?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work)

---

### 19. TCP, UDP, এবং HTTP

এরা internet-এ data পাঠানোর protocols (নিয়মকানুন)।

**TCP** (Transmission Control Protocol):
- Reliable delivery — data পৌঁছানো নিশ্চিত করে
- Packets order-এ পৌঁছায়
- উদাহরণ: File download, web browsing

**UDP** (User Datagram Protocol):
- Fast কিন্তু unreliable — কিছু packets হারাতে পারে
- Real-time applications-এ use হয়
- উদাহরণ: Video calls, online gaming

**HTTP** (Hypertext Transfer Protocol):
- Web-এর language — browser আর server যোগাযোগ করে
- TCP-র ওপর build করা
- উদাহরণ: `GET /users` request পাঠানো

**Analogy**: 
- TCP = Registered mail (delivery guaranteed)
- UDP = Shouting across the street (fast but might miss)
- HTTP = The message format you write

---

### 20. IP Address কী?

প্রতিটি internet-connected device-এর একটা unique address থাকে।

**Types:**

**Localhost / 127.0.0.1**:
- নিজের machine
- `http://localhost:3000` মানে আপনার computer-এ চলা server

**Loopback**: 
- Same as localhost, testing-এর জন্য use হয়

**LAN IP** (Local Area Network):
- আপনার home/office network-এ private address
- উদাহরণ: `192.168.1.10`
- শুধু same network-এ visible

**Public IP**:
- Internet-এ আপনার unique address
- ISP provide করে
- উদাহরণ: `203.76.221.45`

**Commands to check:**

```bash
# Windows - IP address দেখো
ipconfig

# Linux/Mac - IP address দেখো
ifconfig
# বা
ip addr
```

**Analogy**: LAN IP = আপনার ঘরের নম্বর, Public IP = আপনার বাড়ির ঠিকানা

---

### 21. Terminal Commands (Windows ও Linux)

Backend developer হতে হলে terminal-এ comfortable হতে হবে।

**Common Commands:**

| Task | Windows | Linux/Mac |
|------|---------|-----------|
| Current directory দেখো | `cd` | `pwd` |
| Files list করো | `dir` | `ls` |
| Directory change করো | `cd folder` | `cd folder` |
| Directory তৈরি করো | `mkdir folder` | `mkdir folder` |
| File delete করো | `del file.txt` | `rm file.txt` |
| IP address দেখো | `ipconfig` | `ifconfig` or `ip addr` |
| Network test করো | `ping google.com` | `ping google.com` |
| File content দেখো | `type file.txt` | `cat file.txt` |

**Try these:**

```bash
# Check if server reachable
ping google.com

# Show your IP address
ipconfig  # Windows
ifconfig  # Mac/Linux

# Check Node.js version
node -v

# List files
dir      # Windows
ls       # Mac/Linux
```

Study:
- [MDN: Command line crash course](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)

---

### 22. NAT (Network Address Translation) Basics

**NAT কী?**
NAT আপনার router-এর একটা feature যা private IP-গুলোকে একটা public IP দিয়ে internet-এ access করতে দেয়।

**কেন লাগে?**
- IPv4 addresses সীমিত
- Security: বাইরের world সরাসরি আপনার device দেখতে পায় না

**Simple example:**
- আপনার phone LAN IP: `192.168.1.5`
- আপনার laptop LAN IP: `192.168.1.6`
- Router public IP: `203.76.221.45`
- বাইরে থেকে দেখলে দুইটা device-ই same public IP দেখায়

**Analogy**: Company-র receptionist-এর মতো — সবাই একই phone number dial করে, receptionist সঠিক person-এ forward করে।

**Backend-এ কেন জানা দরকার?**
- `localhost` testing শেষে deploy করতে হলে NAT বুঝতে হয়
- Port forwarding setup করতে NAT লাগে

---

### 23. Server আসলে কী?

**Server** হলো একটা program যা requests listen করে এবং responses পাঠায়।

**Types:**

**Web Server**:
- HTTP requests handle করে
- উদাহরণ: Nginx, Apache, Express.js

**Application Server**:
- Business logic চালায়
- Database-এর সাথে কথা বলে
- উদাহরণ: Node.js app with Express

**Database Server**:
- Data store করে এবং queries serve করে
- উদাহরণ: PostgreSQL, MongoDB

**মনে রাখো**: আপনার laptop-ও server হতে পারে — শুধু server software চালাতে হবে!

**Simple server example:**

```javascript
// এটা একটা server — port 3000-এ listen করছে
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

এখন `http://localhost:3000` visit করলে "Hello World" দেখবেন।

---

## Quick Self-Check

নিচের প্রশ্নগুলোর অন্তত 4টার উত্তর যদি "হ্যাঁ" হয়, তাহলে আপনি `next class`-এর জন্য মোটামুটি ready।

- আমি explain করতে পারি browser আর server-এর কাজ কীভাবে আলাদা
- আমি `GET` আর `POST`-এর পার্থক্য জানি
- আমি `404` আর `500`-এর basic meaning জানি
- আমি terminal-এ `node -v` বা `npm -v` চালাতে পারি
- আমি `localhost:3000` দেখে confused হই না
- আমি JSON object পড়ে বুঝতে পারি
- আমি জানি `.env` কেন দরকার
- আমি roughly জানি Node.js কী
- আমি basic IP concepts বুঝি (localhost, public IP)
- আমি terminal commands use করতে পারি

যদি 2-3টার বেশি জায়গায় সন্দেহ থাকে, problem না। এই README, slides, আর quiz একবার calmly পড়লেই অনেক gap fill হয়ে যাবে।

---

## Recommended Study Order

1. আগে এই `README.md` শেষ করুন
2. তারপর `[slides/outline.md](./slides/outline.md)` skim করুন
3. এরপর `[quiz/quiz.md](./quiz/quiz.md)` দিয়ে নিজেকে test করুন
4. যেগুলো ভুল হবে, সেগুলোর study link খুলে পড়ুন
5. তারপর `[class-1/](../class-1/)` শুরু করুন

---

## Helpful Resources

### Web এবং HTTP

- [MDN: How does the web work?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Web_work)
- [MDN: HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [MDN: HTTP messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)
- [MDN: HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [MDN: Status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

### Node.js এবং Runtime

- [Node.js Learn](https://nodejs.org/en/learn)
- [Node.js Docs](https://nodejs.org/en/docs)
- [freeCodeCamp Node.js course](https://www.freecodecamp.org/news/learn-node-js-full-course/)

### Terminal এবং Tooling

- [MDN: Command line crash course](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)
- [npm Docs](https://docs.npmjs.com/)
- [pnpm Docs](https://pnpm.io/)

### TypeScript

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)

### API Testing

- [Postman Learning Center](https://learning.postman.com/)
- [Bruno Docs](https://docs.usebruno.com/)
- [Thunder Client](https://www.thunderclient.com/)

### বাংলা ভিডিও রিসোর্স

- [Stack Learner YouTube](https://www.youtube.com/@StackLearner)
- [Learn with Sumit YouTube](https://www.youtube.com/@LearnwithSumit)
- [Anisul Islam YouTube](https://www.youtube.com/@anisulislamrubel)

---

## Before You Enter Class 1

`class-1/`-এ আপনি layered architecture, middleware order, response data filtering, status code, request lifecycle শিখবেন।

এই Class 0-এর target হলো আপনার মাথায় এতটুকু foundation বসানো, যাতে class-1-এ গিয়ে মনে না হয় সবাই rocket science বলছে।

Backend rocket science না। তবে browser tab-এর বাইরে JavaScript-এর একটা আলাদা জীবন আছে - আজকে তার trailer দেখলেন।

**Next step:** `[class-1/README.md](../class-1/README.md)`

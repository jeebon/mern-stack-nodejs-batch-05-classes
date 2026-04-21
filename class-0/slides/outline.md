# Backend শুরু করার আগে Warm-up — Speaker Outline

**Total Duration**: 50 minutes  
**Format**: Slides + discussion + quick tool demo

---

## Welcome + Why This Exists

**Slide**: Title + "Frontend থেকে Backend: Side Change"

**Talking Points**:

- যারা frontend থেকে backend-এ আসছেন, তাদের জন্য এই warm-up।
- আপনারা already JavaScript জানেন, UI জানেন, browser জানেন।
- আজকের কাজ নতুন language শেখানো না; existing knowledge-কে backend direction-এ ঘুরিয়ে দেওয়া।
- Backend মানে mysterious dark cave না। শুধু browser-এর উল্টো পাশে কী হচ্ছে, সেটা দেখা।

**Ice-breaker**:

- "এতদিন button color ঠিক করতেন, আজকে দেখবেন button click-এর complaint কোথায় যায়।"
- "Frontend-এ pixel shift দেখে কষ্ট হতো, backend-এ আজকে `500` দেখে কষ্ট হবে। Growth."

---

## Client vs Server

**Slide**: Browser এক পাশে, Server আরেক পাশে

**Talking Points**:

- Client হলো user-facing অংশ: browser, mobile app, frontend app।
- Server হলো logic side: request receive, validate, process, database access, response return।
- Frontend সাধারণত data চায়; backend decide করে data দেওয়া safe কি না, valid কি না, available কি না।

**Analogy**:

- Client = customer
- Server = restaurant kitchen
- Database = fridge + store room

Customer menu দেখে order দেয়, কিন্তু kitchen decide করে কীভাবে রান্না হবে।

**Prompt**:

- Ask: "React app কি নিজে database connect করে?"
- Follow-up: "না করলে, কে করে?"

---

## HTTP, URL, Request, Response

**Slide**: `fetch("/api/users")` এর পর্দার আড়ালে

**Talking Points**:

- HTTP হলো communication protocol।
- Request-এর main parts:
  - method
  - URL
  - headers
  - body
- Response-এর main parts:
  - status code
  - headers
  - body

**Mini Example**:

```txt
GET /users HTTP/1.1
Host: localhost:3000
Accept: application/json
```

Explain:

- `GET` = কী action চাই
- `/users` = কোন resource চাই
- `Host` = কার সাথে কথা হচ্ছে

Then show:

```txt
HTTP/1.1 200 OK
Content-Type: application/json
```

**URL Breakdown**:

```txt
http://localhost:3000/users?active=true
```

- `http` = protocol
- `localhost` = host
- `3000` = port
- `/users` = path
- `active=true` = query

---

## Status Codes + REST Basics

**Slide**: 200, 201, 404, 500 - এগুলো আসলে কী বলে?

**Talking Points**:

- `200` = ঠিক আছে
- `201` = নতুন কিছু তৈরি হয়েছে
- `400` = আপনার request-এ সমস্যা
- `401` = login দরকার
- `403` = permission নাই
- `404` = resource নেই
- `500` = server side error

REST basics:

- URL resource identify করে
- method action বোঝায়

Examples:

- `GET /users`
- `GET /users/10`
- `POST /users`
- `DELETE /users/10`

---

## Internet এবং Networks

**Slide**: Internet কীভাবে কাজ করে?

**Talking Points**:

- Internet হলো globally connected networks-এর collection
- **Router**: Data packets সঠিক destination-এ পাঠায়
- **ISP**: আপনার internet connection provider
- Analogy: Postal system - router হলো post office

**Example**:
```
আপনি google.com visit করলে:
1. Request router → ISP
2. ISP Google-এর server-এ forward করে
3. Google response পাঠায় back
```

---

## TCP, UDP, HTTP Protocols

**Slide**: Different protocols - different jobs

**Talking Points**:

**TCP** (Transmission Control Protocol):
- Reliable - data পৌঁছানো guaranteed
- Order maintain করে
- Example: File downloads, web browsing

**UDP** (User Datagram Protocol):
- Fast কিন্তু unreliable
- Real-time applications
- Example: Video calls, gaming

**HTTP** (Hypertext Transfer Protocol):
- Web-এর language
- TCP-র ওপর build করা

**Analogy**:
- TCP = Registered letter (guaranteed delivery)
- UDP = Shouting from rooftop (fast, might miss)
- HTTP = The message format

---

## IP Addresses এবং Localhost

**Slide**: প্রতিটা device-এর একটা unique address

**Talking Points**:

**Types of IP:**
- **Localhost (127.0.0.1)**: নিজের machine
- **LAN IP (192.168.1.x)**: Home/office network
- **Public IP**: Internet-এ globally unique

**Commands**:
```bash
# Windows
ipconfig

# Linux/Mac
ifconfig
```

**Analogy**: LAN IP = ঘরের নম্বর, Public IP = পুরো বাড়ির ঠিকানা

---

## Terminal Commands

**Slide**: Backend developer = Terminal friend

**Talking Points**:

Common commands:

| Task | Windows | Linux/Mac |
|------|---------|-----------|
| Current location | `cd` | `pwd` |
| List files | `dir` | `ls` |
| Make folder | `mkdir name` | `mkdir name` |
| IP address | `ipconfig` | `ifconfig` |
| Test network | `ping google.com` | `ping google.com` |

**Live Demo** (optional):
```bash
ping google.com
```

Show that network is working.

---

## NAT এবং Servers

**Slide**: NAT = Router-এর magic trick

**Talking Points**:

**NAT** (Network Address Translation):
- Private IPs → Public IP
- Multiple devices same public IP থেকে internet access করে
- Analogy: Company receptionist

**Servers**:
- Program যা requests listen করে
- Types: Web server, App server, Database server
- Example: Node.js + Express = App server

---

## Wrap-up + Class 1 Teaser

**Slide**: আজ foundation, পরের class-এ architecture

**Talking Points**:

- আজকে আমরা vocabulary set করলাম
- এখন আপনি জানেন browser আর server কীভাবে কথা বলে
- Internet, networks, protocols - সব basic
- Terminal comfortable লাগবে

**Class 1 Teaser**:

- Request lifecycle: browser থেকে database, তারপর back
- Layering: কেন আমরা layer divide করি
- Middleware: request-এ কে কী করে
- Status codes: meaningful responses

**Closing Line**:

- "Backend শুরু করার আগে আপনার মাথায় map বসানো ছিল আজকের কাজ। কালকে map নিয়ে রাস্তায় নামব।"

**Next Step**:

- Read [`../README.md`](../README.md)
- Start [`../../class-1/README.md`](../../class-1/README.md)

---

## Suggested Slide Deck Structure

1. Title
2. কেন এই warm-up
3. Client vs Server
4. HTTP request/response
5. URL anatomy
6. Status codes + REST
7. Internet basics
8. TCP, UDP, HTTP protocols
9. IP addresses + localhost
10. Terminal commands
11. NAT basics
12. What is Server?
13. Class 1 teaser + Q&A

---

## Optional Live Questions

- "`fetch()` লিখলে আসলে কোথায় request যায়?"
- "`localhost` কি internet?"
- "`404` আর `500`-এর difference কী?"
- "একই machine-এ multiple services থাকতে পারে?"
- "আমার public IP কী কাজে লাগে?"
- "Terminal কেন গুরুত্বপূর্ণ?"

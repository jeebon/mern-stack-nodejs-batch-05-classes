# NodeJs Befor Start: Quiz

**সময়**: 15-20 মিনিট  
**ফরম্যাট**: 16টি MCQ  

---

## Questions

### Q1: Client আর Server-এর মধ্যে সঠিক পার্থক্য কোনটি?

**Question**: নিচের কোন statementটি সবচেয়ে সঠিক?

A) Client database-এ query চালায়, server শুধু UI render করে  
B) Client user-এর সাথে interact করে, server request process করে response দেয়  
C) Client শুধু mobile app, browser client না  
D) Server শুধু file save করে, logic handle করে না  

**Answer**: B  
**Explanation**: Client সাধারণত user-facing side, যেমন browser বা app। Server request receive করে, logic চালায়, database-এর সাথে কথা বলে, তারপর response দেয়।

---

### Q2: `fetch("/api/users")` আসলে কী করে?

**Question**: JavaScript-এর `fetch("/api/users")` call-এর সবচেয়ে কাছের ব্যাখ্যা কোনটি?

A) Browser local file খুলে ফেলে  
B) Browser server-এ HTTP request পাঠায়  
C) Browser database-এ directly connect করে  
D) Browser শুধু console-এ message print করে  

**Answer**: B  
**Explanation**: `fetch()` সাধারণত browser থেকে server-এ HTTP request পাঠায়। সেই request-এর response-এ data বা error ফিরে আসে।

---

### Q3: `404` status code সাধারণত কী বোঝায়?

**Question**: Server যদি `404` return করে, তার মানে কী?

A) Server খুব খুশি  
B) Resource পাওয়া যায়নি  
C) User admin হয়ে গেছে  
D) Database automatically backup হয়েছে  

**Answer**: B  
**Explanation**: `404 Not Found` মানে client যে resource চেয়েছে, server সেটি খুঁজে পায়নি।

---

### Q4: `GET` আর `POST`-এর মধ্যে সাধারণ পার্থক্য কী?

**Question**: নিচের কোনটি সঠিক?

A) `GET` সাধারণত data আনার জন্য, `POST` সাধারণত নতুন data তৈরির জন্য  
B) `GET` শুধু mobile app-এ কাজ করে  
C) `POST` মানেই file delete করা  
D) `GET` backend-এ ব্যবহার করা যায় না  

**Answer**: A  
**Explanation**: `GET` সাধারণত resource retrieve করতে use হয়, আর `POST` নতুন resource create করতে use হয়।

---

### Q5: `http://localhost:3000/users` URL-এ port কোন অংশ?

**Question**: নিচের URL-এ port number কোনটি?

```txt
http://localhost:3000/users
```

A) `http`  
B) `localhost`  
C) `3000`  
D) `/users`  

**Answer**: C  
**Explanation**: `3000` হলো port। একই machine-এ কোন service-এর সাথে কথা বলতে হবে, সেটা port identify করে।

---

### Q6: Node.js কী?

**Question**: নিচের কোন ব্যাখ্যাটি Node.js-এর জন্য সবচেয়ে উপযুক্ত?

A) এটা শুধু CSS framework  
B) এটা browser-এর বাইরে JavaScript run করার runtime  
C) এটা শুধু database  
D) এটা শুধু image editor  

**Answer**: B  
**Explanation**: Node.js JavaScript-কে browser-এর বাইরে run করতে দেয়, তাই server-side app, script, CLI tool ইত্যাদি তৈরি করা যায়।

---

### Q7: `npm install` সাধারণত কী করে?

**Question**: Project folder-এর মধ্যে `npm install` চালালে সাধারণত কী হয়?

A) Computer format হয়ে যায়  
B) Project-এর dependencies install হয়  
C) Git history delete হয়ে যায়  
D) Browser cache clear হয়  

**Answer**: B  
**Explanation**: `npm install` project-এর `package.json` দেখে দরকারি packages install করে।

---

### Q8: API-তে JSON এত বেশি ব্যবহার হয় কেন?

**Question**: JSON popular হওয়ার একটি বড় কারণ কোনটি?

A) এটা মানুষ ও machine - দুই পক্ষের জন্যই পড়তে তুলনামূলক সহজ  
B) এটা শুধু Python বোঝে  
C) এটা image edit করতে পারে  
D) এটা port number hide করে  

**Answer**: A  
**Explanation**: JSON lightweight, readable, এবং language-independent data format। তাই API request/response-এ খুব common।

---

### Q9: `.env` file সাধারণত কেন use করা হয়?

**Question**: `.env` file-এর সবচেয়ে common ব্যবহার কোনটি?

A) Meme store করার জন্য  
B) Secret/configuration values আলাদা করে রাখার জন্য  
C) HTML page render করার জন্য  
D) CSS animation control করার জন্য  

**Answer**: B  
**Explanation**: `.env` file-এ database URL, JWT secret, API key, port-এর মতো configuration রাখা হয়, যাতে code আর config আলাদা থাকে।

---

### Q10: REST API-তে "resource" বলতে কী বোঝায়?

**Question**: নিচের কোনটি resource-এর best example?

A) `users`  
B) `console.log`  
C) `margin-left`  
D) `setTimeout`  

**Answer**: A  
**Explanation**: REST API-তে resource মানে এমন entity বা data object যাকে URL দিয়ে represent করা যায়, যেমন `users`, `products`, `orders`।

---

### Q11: localhost এবং public IP-এর পার্থক্য কী?

**Question**: নিচের কোনটি সবচেয়ে সঠিক?

A) কোন পার্থক্য নেই  
B) localhost মানে নিজের machine, public IP মানে internet-এ unique address  
C) localhost fast, public IP slow  
D) localhost শুধু Windows-এ কাজ করে  

**Answer**: B  
**Explanation**: localhost (127.0.0.1) নিজের machine point করে, public IP internet-এ globally accessible address।

---

### Q12: TCP আর UDP-এর মধ্যে main পার্থক্য কী?

**Question**: নিচের কোনটি সঠিক?

A) TCP reliable আর ordered, UDP fast কিন্তু packet loss হতে পারে  
B) TCP শুধু video-র জন্য  
C) UDP secure, TCP না  
D) কোন পার্থক্য নেই  

**Answer**: A  
**Explanation**: TCP delivery guarantee করে, UDP speed optimize করে।

---

### Q13: `ping google.com` command কী করে?

**Question**: এই command-টার সবচেয়ে কাছের ব্যাখ্যা কোনটি?

A) Google delete করে  
B) Network connectivity test করে Google server-এ packets পাঠিয়ে  
C) Password check করে  
D) Browser open করে  

**Answer**: B  
**Explanation**: ping command network reachability test করে ICMP packets দিয়ে।

---

### Q14: NAT-এর main purpose কী?

**Question**: NAT (Network Address Translation) কী কাজ করে?

A) Internet speed বাড়ানো  
B) Multiple devices-কে একটা public IP share করতে দেওয়া  
C) Virus scan করা  
D) File download করা  

**Answer**: B  
**Explanation**: NAT private IPs-কে একটা public IP দিয়ে internet access করতে দেয়।

---

### Q15: Server হতে কোনটা দরকার?

**Question**: একটা server হওয়ার জন্য সবচেয়ে গুরুত্বপূর্ণ কী?

A) শুধু expensive hardware  
B) Program যা requests listen করে এবং responses পাঠায়  
C) Microsoft Office  
D) Graphic card  

**Answer**: B  
**Explanation**: যেকোনো computer server হতে পারে — শুধু server software চালাতে হবে।

---

### Q16: Internet-এ data কীভাবে আপনার কাছে পৌঁছায়?

**Question**: যখন আপনি google.com visit করেন, তখন কী ঘটে?

A) Browser directly Google-এর database connect করে  
B) Request router → ISP → Google server, then response আসে back  
C) Google আপনার computer-এ physically visit করে  
D) সব কিছু DNS-এ save আছে, DNS সরাসরি দেয়  

**Answer**: B  
**Explanation**: Request network path দিয়ে travel করে। Router requests এর route decide করে, ISP forward করে, server process করে, তারপর response back আসে।

---

## Score Guide

- **13-16**: আপনি `Next Class` ধরার জন্য খুবই ready
- **10-12**: ভালো foundation আছে, next class comfortably follow করতে পারবেন
- **7-9**: README আর slides আরেকবার skim করলে ভালো হবে
- **0-6**: panic করার দরকার নেই; আগে `README.md`-এর study links-গুলো দেখে নিন, তারপর আবার quiz দিন

---

## Quick Review Targets

যদি কোথাও ভুল হয়ে থাকে, আগে এগুলো revise করুন:

- Client vs Server
- HTTP request/response
- Status codes
- URL anatomy
- Node.js basics
- JSON
- `.env`


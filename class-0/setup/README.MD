# Environment Setup Guide

### Node.js & Express Backend Development Course

এই course শুরু করার আগে তোমার machine-এ কিছু software install করতে হবে। নিচে step-by-step সব কিছু দেওয়া আছে। **একটাও skip করবে না।**

---

## 1. Node.js Install

Node.js হলো আমাদের সবচেয়ে গুরুত্বপূর্ণ tool। এটা ছাড়া কিছুই চলবে না।

**Version: Node.js 20 LTS** (LTS মানে Long Term Support — এটাই stable)

---

### Windows

1. [https://nodejs.org](https://nodejs.org) এ যাও
2. **"20 LTS"** লেখা button-এ click করে installer (.msi) download করো
3. Installer চালাও, সব কিছু default রেখে "Next" দিতে থাকো
4. Install শেষ হলে **Command Prompt** বা **PowerShell** খোলো এবং check করো:

```bash
node -v
npm -v
```

Output এরকম আসবে:

```
v20.x.x
10.x.x
```

---

### macOS

**Option 1 — Direct Download (সহজ):**

1. [https://nodejs.org](https://nodejs.org) থেকে **"20 LTS"** macOS installer (.pkg) download করো
2. Install করো, Terminal খুলে check করো:

```bash
node -v
npm -v
```

**Option 2 — Homebrew দিয়ে (recommended for Mac users):**

```bash
brew install node@20
```

---

### Linux (Ubuntu / Debian)

```bash
# NodeSource repository add করো
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Node.js install করো
sudo apt-get install -y nodejs

# Version check করো
node -v
npm -v
```

---

### Verify করো (সব OS এর জন্য)

Terminal/Command Prompt-এ এই দুটো command run করো:

```bash
node -v    # v20.x.x দেখাবে
npm -v     # 10.x.x দেখাবে
```

যদি error আসে, আবার install করো অথবা class-এ জানাও।

---

## 2. VS Code Install

VS Code আমাদের code editor। এটা দিয়েই সব কোড লিখবো।

1. [https://code.visualstudio.com](https://code.visualstudio.com) এ যাও
2. তোমার OS অনুযায়ী Download button-এ click করো (Windows / Mac / Linux)
3. Install করো

---

### VS Code Extensions

VS Code install হয়ে গেলে নিচের extensions গুলো install করতে হবে। প্রতিটা extension VS Code-এর বাম দিকের Extensions icon (Ctrl+Shift+X) এ গিয়ে search করে install করো।

---

**ESLint**
`dbaeumer.vscode-eslint`

Code-এ mistake ধরে দেয়। JavaScript এর জন্য must-have।

---

**Prettier - Code Formatter**
`esbenp.prettier-vscode`

Code automatically সুন্দর করে format করে দেয়।

---

**REST Client**
`humao.rest-client`

VS Code এর ভেতর থেকেই API test করা যায়। `.http` file দিয়ে request পাঠানো যায়।

---

**Thunder Client**
`rangav.vscode-thunder-client`

Postman-এর মতো, কিন্তু VS Code-এর ভেতরে। Light weight এবং কাজে লাগে।

---

**MongoDB for VS Code**
`mongodb.mongodb-vscode`

VS Code থেকে সরাসরি MongoDB database দেখা এবং query করা যায়।

---

**GitLens**
`eamodio.gitlens`

Git history, blame, এবং changes সহজে দেখা যায়।

---

**Auto Rename Tag**
`formulahendry.auto-rename-tag`

HTML/JSX tag rename করলে automatically closing tag ও rename হয়।

---

**Path Intellisense**
`christian-kohler.path-intellisense`

File path লেখার সময় auto-suggestion দেয়।

---

**DotENV**
`mikestead.dotenv`

`.env` file-এ syntax highlighting দেয়। Environment variable সহজে পড়া যায়।

---

**Better Comments**
`aaron-bond.better-comments`

Comments colorful করে দেখায়। `TODO`, `!`, `?` দিয়ে আলাদা color পাওয়া যায়।

---

### VS Code Settings (Recommended)

VS Code খুলে `Ctrl+Shift+P` চাপো, তারপর **"Open User Settings (JSON)"** লিখে enter দাও। নিচের settings paste করো:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "files.autoSave": "onFocusChange",
  "terminal.integrated.defaultProfile.windows": "Git Bash"
}
```

---

## 3. MongoDB Install

MongoDB হলো আমাদের database। Data store হবে এখানে।

---

### Windows

1. [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) এ যাও
2. **Version: Latest**, **Platform: Windows**, **Package: MSI** select করো
3. Download করে installer চালাও
4. Install করার সময় **"Install MongoDB as a Service"** checked রাখো
5. **"Install MongoDB Compass"** option টাও checked রাখো (পরে আলাদা করে install লাগবে না)

Install শেষে Command Prompt-এ check করো:

```bash
mongod --version
```

---

### macOS

```bash
# Homebrew দিয়ে install (recommended)
brew tap mongodb/brew
brew install mongodb-community@7.0

# Service চালু করো
brew services start mongodb-community@7.0

# Version check
mongod --version
```

---

### Linux (Ubuntu)

```bash
# MongoDB GPG key import করো
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Repository add করো
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] \
https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update এবং install করো
sudo apt-get update
sudo apt-get install -y mongodb-org

# Service চালু করো
sudo systemctl start mongod
sudo systemctl enable mongod

# Version check
mongod --version
```

---

### MongoDB Compass Install

MongoDB Compass হলো MongoDB-এর GUI tool। Database-এর ভেতরের data চোখে দেখা যায়, query করা যায়।

**Windows-এ যদি MongoDB install করার সময় Compass install না হয়:**

1. [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass) এ যাও
2. তোমার OS অনুযায়ী download করো
3. Install করো

**Connect করার জন্য** Compass খুলে এই connection string দাও:

```
mongodb://localhost:27017
```

"Connect" button চাপলে local database-এ connect হয়ে যাবে।

---

## 4. Docker Install

Docker দিয়ে আমরা application এবং services (MongoDB, Redis ইত্যাদি) container-এ চালাবো। Class 2 থেকে লাগবে।

---

### Windows ও macOS

1. [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop) এ যাও
2. **"Download Docker Desktop"** click করো
3. Installer চালাও এবং install করো
4. Install শেষে Docker Desktop app খোলো এবং কিছুক্ষণ wait করো (প্রথমবার একটু সময় নেয়)

Check করো:

```bash
docker -v
docker compose version
```

> **Windows users:** Docker Desktop install করার সময় **WSL 2** backend use করার option আসবে। সেটা enable করে রাখো। WSL 2 না থাকলে Docker বলবে — তখন আগে WSL 2 install করো।

---

### Linux (Ubuntu)

```bash
# পুরনো version থাকলে remove করো
sudo apt-get remove docker docker-engine docker.io containerd runc

# Dependencies install করো
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg

# Docker GPG key add করো
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Repository add করো
echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install করো
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Root ছাড়া docker চালানোর জন্য
sudo usermod -aG docker $USER
newgrp docker

# Check করো
docker -v
docker compose version
```

---

## 5. Postman Install

Postman দিয়ে আমরা API test করবো। কোনো frontend ছাড়াই backend API-তে request পাঠানো যায়।

1. [https://www.postman.com/downloads](https://www.postman.com/downloads) এ যাও
2. তোমার OS অনুযায়ী download করো
3. Install করো
4. Account create করো (free) — এতে collection cloud-এ save হয়

> Account ছাড়াও use করা যায়, তবে account থাকলে data sync হয়।

---

## Final Check

সব install শেষে এই commands গুলো run করো এবং নিশ্চিত হও সব কাজ করছে:

```bash
node -v           # v20.x.x
npm -v            # 10.x.x
mongod --version  # v7.x.x
docker -v         # Docker version 24.x.x বা তার বেশি
```

VS Code খোলো এবং দেখো সব extensions আছে কিনা।

---

## সমস্যা হলে কী করবে?

- প্রথমে নিজে error message টা Google করো
- তারপরও না হলে error message সহ class-এর group-এ জানাও
- Class শুরু হওয়ার আগেই setup সেরে রাখো — class-এ setup করতে গেলে পিছিয়ে পড়বে

---

**Setup শেষ হলে class-1 এ যাও।**

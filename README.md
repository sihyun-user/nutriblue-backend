
# NutriBlue - 飲食日記與全面營養資訊平台後端 API 系統

NutriBlue 是您的飲食日記和營養指南的最佳夥伴。通過紀錄每日飲食習慣，了解每餐的營養成分，並查詢大量健康食品資料庫，幫助您做出更明智的飲食選擇，達成健康生活目標。立即加入我們，開啟您的健康飲食之旅！

## 安裝

以下將會引導你如何安裝此專案到你的電腦上。

Node.js 版本建議為：`18.16.0` 以上

### 取得專案

```bash
git clone https://github.com/sihyun-user/nutriblue-backend.git
```

### 安裝套件

```bash
npm install
```

### 環境變數設定

請在終端機輸入 cp .env.example .env 來複製 .env.example 檔案，並依據 .env 內容調整相關欄位。

### 運行專案

```bash
npm run dev
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:3000/
```

### 環境變數說明

```env
# 環境變數，區分開發環境或正式環境(development、production)
NODE_ENV = development

# 伺服器埠號
PORT=3000

# MongoDB 本地端
MONGODB_LOCAL=mongodb://localhost:27017/nutriblue

# MongoDB 正式端
MONGODB_URI=

# MongoDB 密碼
MONGODB_PASSWORD=

# JTW Token 密鑰
JWT_SECRET=

# 前端 URL
CLIENT_URL=http://localhost:3000

# FIREBASE
FIREBASE_TYPE=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=
FIREBASE_CLIENT_X509_CERT_URL=
```
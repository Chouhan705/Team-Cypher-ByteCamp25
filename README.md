# Mumbai Mitra 🚀

Mumbai Mitra is a real-time safety and awareness platform providing **hyper-local AQI & weather updates**, **health advisories**, and **AI-generated voice alerts** in **English & Mumbaiya Hindi**.

## 🌟 Features
- **📡 Real-Time Alerts:** Instant AQI and weather updates for Mumbai locations.
- **🌍 MongoDB Data Storage:** Efficient storage for AQI, weather, and generated reports.
- **📢 AI Text-to-Speech (TTS):** Converts reports into **realistic voice alerts**.
- **📊 Data-Driven Reports:** Daily insights on air quality, weather conditions, and health advisories.
- **🔗 RESTful API:** Provides structured JSON responses for seamless integration.

---

## 🛠 Tech Stack
- **Backend:** Python (Flask)
- **Database:** MongoDB
- **Data Processing:** Pandas, NumPy
- **Text-to-Speech:** gTTS (Google TTS)
- **API Hosting:** Flask-based server

---

## 🚀 Installation Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-repo/MumbaiMitra.git
cd MumbaiMitra
```

### 2️⃣ Create a Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

### 3️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

### 4️⃣ Set Up MongoDB
Ensure you have MongoDB running and update `MONGO_URI` in `config.py`.

### 5️⃣ Run the Application
```bash
python aqiweathertts.py
```

---

## 📡 API Endpoints

### 📝 Store AQI Data
```http
POST /store/aqi
```
- **Body:** `{ "location": "Andheri", "aqi": 120, "timestamp": "2025-03-16T14:30:00Z" }`
- **Response:** `{ "message": "AQI data stored successfully" }`

### 📝 Store Weather Data
```http
POST /store/weather
```
- **Body:** `{ "location": "Thane", "temperature": 32, "humidity": 65, "timestamp": "2025-03-16T14:30:00Z" }`

### 📊 Get Latest Report
```http
GET /report/latest/{location}
```
- **Response:** `{ "location": "Bandra", "aqi": 150, "weather": {"temp": 30, "humidity": 70} }`

### 🎙 Generate TTS Report
```http
GET /tts/{location}
```
- **Response:** `{ "message": "TTS file generated", "file_url": "audio/mumbai_bandra.mp3" }`

---

## 🤝 Contributing
Want to improve Mumbai Mitra? Feel free to fork and submit a PR!

---

💡 *Stay Safe, Stay Informed with Mumbai Mitra!* 🚀


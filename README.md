# 🚲 Hero Cycles – Pricing Engine

A production-ready web application for managing bicycle parts, cycle configurations, and generating quotes with frozen pricing snapshots.

---

## 🎯 Problem Statement

Hero Cycles, a large bicycle manufacturer, currently manages pricing via Excel spreadsheets. Part costs change frequently, leading to inconsistent quotes. This application replaces Excel with a reliable, versioned pricing system.

**Key Features:**
- Manages parts and their current prices (with price history)
- Allows reusable cycle configurations (any combination of parts)
- Instantly calculates price breakdowns for any cycle
- Generates quotes that **freeze** the price snapshot at the time of creation

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
|-------------|--------------------------------------|
| Backend     | Node.js + Express + MongoDB + Mongoose |
| Frontend    | React (functional components with hooks) + Vite |
| Styling     | Modern CSS (no frameworks)           |

---

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16+)
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/Prathamesh-1234/Hero-pricing-engine.git
cd Hero-pricing-engine
```

### Backend Setup

```bash
cd backend
npm install
```

**Environment Variables:**
Create a `.env` file in the `backend` directory:
```env
MONGODB_URI=mongodb://localhost:27017/hero-pricing
PORT=5000
NODE_ENV=development
```

**Start the server:**
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
```

**Start the development server:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
Hero-pricing-engine/
├── backend/
│   ├── models/           # MongoDB schemas (Parts, Configurations, Quotes)
│   ├── routes/           # API endpoints
│   ├── controllers/       # Business logic
│   └── server.js         # Express app entry point
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── styles/       # CSS files
│   │   └── App.jsx       # Main app component
│   └── vite.config.js    # Vite configuration
└── README.md
```

---

## 🚀 Usage

### Managing Parts
1. Navigate to the **Parts** section
2. Add new bicycle parts with their current price
3. View and update pricing history

### Creating Cycle Configurations
1. Go to **Configurations**
2. Select parts to combine into a cycle
3. Save the configuration for reuse

### Generating Quotes
1. Open **Quotes**
2. Select a cycle configuration
3. Generate a quote with frozen pricing
4. Quote snapshot preserves prices at creation time

---

## 🔄 API Endpoints

### Parts
- `GET /api/parts` – List all parts
- `POST /api/parts` – Create a new part
- `PUT /api/parts/:id` – Update part price
- `GET /api/parts/:id` – Get part details

### Configurations
- `GET /api/configurations` – List all configurations
- `POST /api/configurations` – Create a new configuration
- `GET /api/configurations/:id` – Get configuration details

### Quotes
- `GET /api/quotes` – List all quotes
- `POST /api/quotes` – Generate a new quote
- `GET /api/quotes/:id` – Get quote details

---

## 💡 Key Features

✅ **Price Versioning** – Track price changes over time  
✅ **Frozen Snapshots** – Quotes lock in prices at creation  
✅ **Reusable Configs** – Define cycle configurations once, use multiple times  
✅ **Real-time Calculations** – Instant price breakdowns  
✅ **MongoDB Storage** – Scalable data persistence  

---

## 🛣️ Future Roadmap

- [ ] User authentication & authorization
- [ ] Export quotes as PDF
- [ ] Discount management
- [ ] Advanced reporting & analytics
- [ ] Bulk import for parts

---

## 📝 License

This project is unlicensed. Feel free to use it for educational or commercial purposes.

---

## 👤 Author

**Prathamesh** – [GitHub Profile](https://github.com/Prathamesh-1234)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

---

## 📧 Support

For questions or issues, please open a GitHub issue in the [repository](https://github.com/Prathamesh-1234/Hero-pricing-engine/issues).

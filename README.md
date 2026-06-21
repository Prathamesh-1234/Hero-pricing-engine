# 🚲 Hero Cycles – Pricing Engine

A production-ready web application for managing bicycle parts, cycle configurations, and generating quotes with frozen pricing snapshots.

---

## 🎯 Problem Statement

Hero Cycles, a large bicycle manufacturer, currently manages pricing via Excel spreadsheets. Part costs change frequently, leading to inconsistent quotes. This application replaces Excel with a reliable **pricing engine** that:

- Manages parts and their current prices (with price history).
- Allows reusable cycle configurations (any combination of parts).
- Instantly calculates price breakdowns for any cycle.
- Generates quotes that **freeze** the price snapshot at the time of creation.

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
|-------------|--------------------------------------|
| Backend     | Node.js + Express + MongoDB + Mongoose |
| Frontend    | React (functional components with hooks) |
| Styling     | Modern CSS (no frameworks)           |

---

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)

### Clone the repository

```bash
git clone <https://github.com/Prathamesh-1234/Hero-pricing-engine.git>
cd hero-pricing-engine
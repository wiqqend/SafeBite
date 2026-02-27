# 🍽️ SafeBite

**Connecting students with food vendors on non-school days.**

SafeBite helps food-insecure students find free or low-cost meals from local vendors (home cooks, food trucks, nonprofits, restaurants) on weekends and holidays when school lunch programs are unavailable.

---

## 📁 Project Structure

```
src/
├── App.jsx                  # Root app — handles onboarding + view toggle
├── styles/
│   └── colors.js            # Shared color palette
├── data/
│   └── vendors.js           # Mock vendor data + calendar data
├── components/
│   ├── Header.jsx           # Top nav with Student/Vendor toggle
│   ├── MapView.jsx          # Visual map with vendor location pins
│   ├── VendorCard.jsx       # Expandable vendor listing card
│   └── CalendarView.jsx     # Weekly schedule with day selector
└── views/
    ├── ProfileSetup.jsx     # Student onboarding screen
    ├── StudentView.jsx      # Main student experience (map + calendar)
    └── VendorForm.jsx       # Vendor listing form + success screen
```

---

## 🚀 Getting Started

### Option 1 — Vite (recommended)
```bash
npm create vite@latest safebite -- --template react
cd safebite
# Replace src/ with the files in this project
npm install
npm run dev
```

### Option 2 — Create React App
```bash
npx create-react-app safebite
cd safebite
# Replace src/ with the files in this project
npm start
```

### Option 3 — StackBlitz / CodeSandbox
Upload all files maintaining the folder structure and run instantly in the browser.

---

## ✨ Features

- **Student onboarding** — name, grade, and ZIP code setup
- **Nearby vendors** — map view with color-coded pins and distance
- **Vendor cards** — expandable with menu, slot availability, hours, and Reserve button
- **Weekly calendar** — see which vendors are open each day
- **Vendor listing form** — vendors can publish their availability, menu, and slot count
- **Student/Vendor toggle** — switch between both app perspectives

---

## 🛠️ Built With

- React (hooks only, no external UI libraries)
- Inline styles + CSS-in-JS
- Google Fonts (Fredoka One + Nunito)

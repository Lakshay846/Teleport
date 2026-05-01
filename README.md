# Flight Schedule Manager

A flight schedule management dashboard built with **React + TypeScript + Material UI**.

This application allows users to manage flight schedules with filtering, editing, status toggling, selection, and deletion features in a performant virtualized table.

---

## Features

- View flight schedules in a virtualized table
- Edit flight details inline
- Toggle flight status (Active / Inactive)
- Delete single flight
- Select and delete multiple flights
- Search flights
- Filter flights with AND logic:
  - Date range
  - Days of operation
  - Status
  - AOC
  - Body type
- Clear all filters

---

## Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Material UI (MUI)**
- **react-window** (table virtualization)

---

## Project Setup

### 1. Clone repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install dependencies

Use `--legacy-peer-deps` because `react-window` has peer dependency conflicts with newer React versions.

```bash
npm install --legacy-peer-deps
```

### 3. Run development server

```bash
npm run dev
```

Application runs on:

```bash
http://localhost:5173
```

## Notes

- Table uses virtualization for performance with large datasets
- Only one row can be edited at a time
- All filters work together using AND logic

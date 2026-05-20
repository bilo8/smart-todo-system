# Smart Productivity System

A modern productivity-focused task management application built with React, TypeScript, Vite, and TailwindCSS.

The application helps users:

* Manage tasks efficiently
* Track productivity progress
* Build daily streaks
* Earn XP and levels
* Unlock achievements
* Receive reminders and motivational feedback

---

# Technologies Used

* React
* TypeScript
* Vite
* TailwindCSS
* React Router DOM
* React Hot Toast
* Recharts
* Lucide React
* DummyJSON API

---

# Main Features

## Authentication

* Login system using DummyJSON API
* Session-based authentication
* Protected routes
* Token storage using sessionStorage
* Persistent profile customization

---

## Task Management

* Add tasks
* Edit tasks
* Delete tasks
* Task completion system
* Task categories
* XP points system
* Browser reminder notifications
* Task reminders using datetime picker

---

## Productivity Features

* Daily streak system
* Level system
* XP progression
* Motivation messages
* Daily success modal
* Level-up modal
* Achievement system

---

## Analytics

* Weekly statistics
* Productivity charts
* XP tracking
* Task category tracking

---

## History System

* Completed tasks history
* Tasks grouped by completion day
* Daily productivity tracking

---

## User Experience

* Responsive design
* Dark / Light mode
* Mobile navigation
* Modern glassmorphism UI
* Reusable modals
* Toast notifications
* Animated interactions

---

# Project Architecture

The application follows a modular React architecture:

* components → reusable UI components
* pages → application screens/routes
* services → API and authentication logic
* utils → reusable helper functions
* types → TypeScript interfaces/types
* data → initial/mock data

This architecture improves:

* scalability
* maintainability
* reusability
* separation of concerns

---

# Authentication Flow

1. User logs in using DummyJSON API
2. API returns user information and tokens
3. Tokens are stored in sessionStorage
4. Protected routes verify token existence
5. User logs out automatically after browser session ends

---

# Motivation System

The application contains a gamified motivation system.

When:

* a task is completed
* all daily tasks are completed
* the user reaches a new level

The application displays:

* random motivation messages
* success notifications
* celebration modals

---

# Installation

```bash
npm install
```

---

# Start Development Server

```bash
npm run dev
```

---

# Build Production Version

```bash
npm run build
```

---

# Future Improvements

* Real backend API
* AI productivity assistant
* Push notifications
* Task priorities
* Real database integration


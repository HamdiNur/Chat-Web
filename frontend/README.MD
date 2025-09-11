# Hamdi Chat App

A real-time chat application built with **React**, **Firebase**, and **Context API** for managing authentication and chat state. Users can send text and image messages, view real-time updates, and maintain persistent sessions.

---

## Features

- **Authentication**
  - Sign up, login, and logout using Firebase Authentication.
  - Persistent sessions across refreshes.

- **Real-time Chat**
  - Real-time messaging with Firestore.
  - Messages include text and optional images (base64).
  - Latest message appears on top in chat lists.

- **Chat Management**
  - Users can select other users to start a chat.
  - Last message preview visible in chat list.
  - Dynamic avatar display for sender and receiver.

- **Responsive UI**
  - Mobile, tablet, and desktop-friendly layout.
  - Clean and modern interface inspired by WhatsApp.

- **Context API**
  - `AuthContext` manages authentication state.
  - `ChatContext` manages current chat and selected user.

---

## Tech Stack

- **Frontend:** React, SCSS
- **Backend:** Firebase Firestore & Authentication
- **Storage:** Firebase Storage (for image uploads)
- **State Management:** React Context API
- **Utilities:** UUID for unique message IDs


## Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/HamdiNur/Chat-Web.git
cd frontend


2. **Install dependencies**
npm install

# Hamdi Chat App
[🔗 Live Demo](https://chat-3501e.web.app)

Hamdi Chat App is a **real-time messaging platform** built with **React**, **Firebase**, and **Context API**. It allows users to exchange text and image messages, receive updates instantly, and maintain persistent login sessions.

---

## Key Features

- **User Authentication**
  - Sign up, login, and logout via Firebase Authentication.
  - Sessions persist across browser refreshes.

- **Instant Messaging**
  - Messages are updated in real-time using Firestore.
  - Supports text and optional image attachments (base64 encoded).
  - Recent messages always appear at the top of chat lists.

- **Chat Management**
  - Select other users to start conversations.
  - Last message previews visible in chat list.
  - Avatars displayed dynamically for both sender and receiver.

- **Responsive Design**
  - Works on mobile, tablet, and desktop screens.
  - Clean and modern interface inspired by WhatsApp.

- **State Management**
  - `AuthContext` handles authentication state.
  - `ChatContext` manages active chats and selected users.

---

## Technology Stack

- **Frontend:** React, SCSS
- **Backend:** Firebase Firestore & Authentication
- **Storage:** Firebase Storage (for image uploads)
- **State Management:** React Context API
- **Utilities:** UUID for unique message identifiers

---

## Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/HamdiNur/Chat-Web.git
cd frontend

2. **Install dependencies** 
npm install

3. **Run the project**

npm run dev

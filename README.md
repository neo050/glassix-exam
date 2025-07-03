# Glassix API Integration Assessment

## Overview

This repository contains my solution for the **Glassix API integration assessment**.
The project demonstrates full end‑to‑end interaction with the Glassix public REST API: authenticating, creating a ticket, sending a message, and closing the ticket – all wrapped in a small Express server that follows the required MVC structure.

---

## Getting Started

### 1 · Clone & install

```bash
git clone <your‑fork‑url>
cd Glassix‑Exam
npm install
```

### 2 · Configure environment variables

Create a `.env` file (or populate the provided `.env.example`) with the credentials you received:

```dotenv
API_KEY=########-####-####-####-############    # DepartmentId  (UUID)
API_SECRET=****************************************                # 128‑char key
API_USER=api@consist.co.il                                         # Always the same user
WORKSPACE=consist                                                  # Your Glassix workspace sub‑domain
PORT=3000                                                          # Optional – defaults to 3000
```

> **Never commit the real ****\`\`**** – it is ignored via .gitignore.**

### 3 · Run the server

```bash
# Development (auto‑reload)
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:3000/api/…`.

---

## API Endpoints exposed by this project

| Method | Path                           | Description                          |
| ------ | ------------------------------ | ------------------------------------ |
| `POST` | `/api/tickets/token`           | Returns a fresh Glassix access‑token |
| `POST` | `/api/tickets/create`          | Creates a new ticket (Mail → MailTo) |
| `POST` | `/api/tickets/send/:ticketId`  | Sends a text message to the ticket   |
| `PUT`  | `/api/tickets/close/:ticketId` | Sets ticket state to **Closed**      |

Each controller calls the matching function in \`\`, which hides authentication and error‑handling details.

---

## Folder Structure (MVC)

```
Glassix‑Exam/
├── server.js                 # Application entry point
├── package.json
├── .env.example              # Variable names only – for reference
├── controllers/              # Business‑logic handlers
│   └── ticketController.js
├── routes/                   # Express route definitions
│   └── tickets.js
├── services/                 # Glassix API integration layer
│   └── glassixService.js
├── screenshots/              # Required proof‑images (see below)
│   ├── auth-response.png
│   ├── create-ticket-response.png
│   ├── send-message-response.png
│   └── set-state-response.png
└── README.md                 # ← you are here
```

---

## Ticket ID

During testing the following ticket was created and used for the flow:

> \`\`

You will find this ID referenced in the screenshots and in the unit tests.

---

## Screenshots

Screenshots of every Glassix API response are stored under `/screenshots`:

1. \`\` – successful token generation
2. \`\` – new ticket with ID `158944335`
3. \`\` – "hello" message accepted
4. \`\` – ticket state changed to **Closed**

---

## Running Tests (optional)

A minimal Postman collection is provided in `tests/Glassix.postman_collection.json`.
Import it into Postman, set the environment variables, and run the four requests in order.

---

## Challenges & Notes

* **Circular JSON** – the raw Axios response object contains circular references. The controllers now reply with `response.data` only, preventing the classic `TypeError: Converting circular structure to JSON`.
* **Dynamic token refresh** – the `glassixService` caches tokens for 3 hours (Glassix expiry) and refreshes automatically.
* **404 vs 400** – Glassix returns *400 Bad Request* when path parameters are wrong and *404* when the ticket does not belong to the department. Custom error‑handling clarifies that for the caller.
* **AI usage** – ChatGPT was consulted for quick code snippets & error explanations, but all final code was handwritten and fully understood.

---

## Contribution & Contact

If you have any questions feel free to open an issue or reach me at [**gurl@consist.co.il**](mailto:gurl@consist.co.il).

Add `gurl@consist.co.il` as a collaborator when submission is done. Thank you!

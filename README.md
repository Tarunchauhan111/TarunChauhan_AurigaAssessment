# 🚨 Helpdesk Queue Management System

A lightweight and interactive **Helpdesk Queue Management System** designed for a two-person IT helpdesk. The application helps support staff prioritize incoming tickets, monitor SLA deadlines, and automatically escalate overdue tickets.

Built as a solution for the **Auriga Builder Round** challenge.

---

## 📌 Problem Statement

Priya runs a two-person IT helpdesk where tickets continuously arrive with different levels of urgency.

For example:

* 💻 A laptop won't boot before an important client demo.
* 🖥️ An employee wants a larger monitor.
* 🔐 A user cannot access an important system.

Each ticket has a **priority** and an agreed **response time (SLA)**.

The system should always help Priya pick the most pressing ticket first while ensuring that tickets that exceed their SLA are automatically escalated.

---

## ✨ Key Features

### 🎯 Smart Ticket Queue

Tickets are automatically ordered based on:

1. Priority
2. SLA urgency
3. Creation time

Priority order:

```text
URGENT → HIGH → NORMAL
```

---

### ⚡ Automatic SLA Escalation

The application automatically checks tickets every **30 seconds**.

If a pending ticket has exceeded its SLA:

```text
NORMAL → HIGH → URGENT
```

Only **one priority level is increased per escalation run**.

For example:

```text
Run 1:
Normal → High

Run 2:
High → Urgent

Run 3:
Urgent → Urgent
```

An already urgent ticket cannot be escalated further.

Resolved tickets are never escalated.

---

### ⚡ Manual SLA Check

The **Escalate SLA** button allows the helpdesk operator to immediately run the SLA escalation process.

This makes the feature easy to demonstrate during the Builder Round.

---

### 📊 Dashboard

The dashboard provides an overview of the current queue:

* Total tickets
* Urgent tickets
* High-priority tickets
* Normal tickets
* Resolved tickets

The dashboard updates automatically when ticket information changes.

---

### 🔍 Search & Filtering

Tickets can be filtered by:

* All
* Urgent
* High
* Normal
* Resolved

Users can also search tickets using:

* Ticket ID
* Ticket title
* Requester
* Category

---

### 🎫 Ticket Management

Each ticket contains information such as:

* Ticket ID
* Title
* Description
* Requester
* Category
* Priority
* Status
* SLA deadline
* Creation time

Tickets can be:

* Assigned
* Resolved
* Reopened
* Deleted

---

### 💾 Local Storage

Ticket information is stored using the browser's **LocalStorage**.

This means ticket changes remain available even after refreshing the browser.

No backend or database is required.

---

## ⏱️ SLA Rules

| Priority  | Response Time |
| --------- | ------------: |
| 🔴 Urgent |       2 hours |
| 🟠 High   |       8 hours |
| 🟢 Normal |      24 hours |

When the SLA deadline is exceeded, the ticket becomes eligible for escalation.

---

## 🔄 SLA Escalation Workflow

```text
                Ticket Created
                      │
                      ▼
                Check SLA Status
                      │
             ┌────────┴────────┐
             │                 │
         Within SLA        SLA Breached
             │                 │
             ▼                 ▼
        Keep Priority     Escalate ×1
                               │
                               ▼
                    ┌──────────────────┐
                    │ Normal → High    │
                    │ High → Urgent    │
                    │ Urgent → Urgent  │
                    └──────────────────┘
```

---

## 🧠 Queue Priority Logic

The application uses a priority ranking:

```javascript
Urgent = 0
High   = 1
Normal = 2
```

Therefore, a lower rank means higher priority.

The queue ensures that urgent tickets appear before high-priority tickets, and high-priority tickets appear before normal tickets.

Within the same priority, tickets approaching or exceeding their SLA are handled first.

---

## ⚡ Escalation Logic

The core escalation logic follows this rule:

```javascript
function escalatePriority(priority) {
    if (priority === "normal") return "high";
    if (priority === "high") return "urgent";
    return "urgent";
}
```

The system also checks whether the ticket is overdue before escalating it.

Resolved tickets are ignored.

---

## 🔁 Automated SLA Monitoring

The application runs an automatic SLA check every 30 seconds:

```javascript
setInterval(() => {
    automaticSlaCheck();
}, 30000);
```

This allows overdue tickets to be escalated without requiring manual interaction.

---

## 🧪 Demo Ticket

The application contains a demo ticket:

```text
HD-1004
Priority: Normal
Status: Pending
SLA: Breached
```

When the application performs an SLA check:

```text
Normal
   ↓
High
```

The ticket receives an escalation indicator.

Running the SLA check again after another breach can move it:

```text
High
 ↓
Urgent
```

This makes the automated escalation feature easy to demonstrate.

---

## 🏗️ Project Structure

```text
helpdesk-queue/
│
├── index.html
├── style.css
├── app.js
└── README.md
```

### `index.html`

Contains the application's UI structure:

* Dashboard
* Statistics cards
* Search
* Filters
* Ticket queue
* Ticket details
* Ticket creation form
* SLA controls

### `style.css`

Contains:

* Responsive layout
* Dashboard styling
* Ticket cards
* Priority indicators
* Buttons
* SLA warnings
* Escalation badges
* Mobile responsiveness

### `app.js`

Contains the application's functionality:

* Ticket management
* Queue sorting
* Searching
* Filtering
* SLA calculation
* SLA escalation
* LocalStorage
* Dashboard updates
* Automatic refresh

---

## 🛠️ Technologies Used

* **HTML5**
* **CSS3**
* **JavaScript**
* **LocalStorage**
* **Responsive Web Design**

No external backend is required.

---

## ▶️ How to Run

### 1. Clone the Repository

Clone the project to your local machine.

### 2. Open the Project

Open the project folder in **VS Code**.

### 3. Run the Application

You can simply open:

```text
index.html
```

in your browser.

For a better development experience, use the **Live Server** extension in VS Code.

### 4. Start Testing

Try:

1. Creating a new ticket.
2. Selecting different priorities.
3. Searching for tickets.
4. Filtering by priority.
5. Resolving a ticket.
6. Clicking **Escalate SLA**.
7. Checking how overdue tickets change priority.

---

## 📋 Business Rules

The system follows these rules:

### Rule 1 — Priority

```text
Urgent > High > Normal
```

### Rule 2 — SLA

Each priority has a defined response deadline.

### Rule 3 — Escalation

An overdue ticket increases by only **one priority level per run**.

### Rule 4 — Maximum Priority


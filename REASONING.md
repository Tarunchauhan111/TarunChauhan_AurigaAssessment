# 🧠 Reasoning & Design Decisions

## 1. Overview

The Helpdesk Queue Management System was designed around a simple operational problem:

> Priya needs to quickly identify which support ticket should be handled next while ensuring that tickets exceeding their agreed SLA do not remain unnoticed.

The solution therefore focuses on four core areas:

1. **Priority-based queue management**
2. **SLA monitoring**
3. **Automatic SLA escalation**
4. **A simple dashboard for quick decision-making**

The application is implemented as a frontend-only web application using HTML, CSS, and JavaScript, with LocalStorage used for persistence.

---

# 2. Understanding the Problem

Each helpdesk ticket contains information such as:

* Ticket ID
* Title
* Description
* Requester
* Category
* Priority
* Status
* Creation time
* SLA deadline

The main challenge is not simply displaying tickets. The system must determine **which ticket deserves attention first**.

For example, consider this queue:

```text
Ticket A → Normal
Ticket B → Urgent
Ticket C → High
Ticket D → Normal + SLA breached
```

Simply sorting by creation time would not be sufficient.

The system instead considers priority and SLA state when organizing the queue.

---

# 3. Priority Model

Three priority levels are used:

```text
URGENT
HIGH
NORMAL
```

They are represented internally using numerical ranks:

```javascript
Urgent = 0
High   = 1
Normal = 2
```

A lower numerical value represents a higher priority.

This makes sorting straightforward.

For example:

```text
Urgent (0)
High   (1)
Normal (2)
```

The queue can therefore be sorted using the priority rank.

---

# 4. Why Three Priority Levels?

The original problem establishes urgent and normal tickets, while the escalation requirement introduces an intermediate step.

The escalation rule is:

```text
Normal → High → Urgent
```

Adding `High` creates a controlled escalation path.

Without an intermediate level, a normal ticket would have to jump directly from:

```text
Normal → Urgent
```

That would make the escalation too aggressive.

The three-level model allows the system to increase urgency gradually.

---

# 5. SLA Design

Each priority has a response-time target.

| Priority |      SLA |
| -------- | -------: |
| Urgent   |  2 hours |
| High     |  8 hours |
| Normal   | 24 hours |

When a ticket is created, its SLA deadline is calculated from its creation time.

Conceptually:

```text
SLA Deadline = Creation Time + Priority SLA
```

For example:

```text
Created:
10:00 AM

Priority:
Normal

SLA:
24 hours

Deadline:
10:00 AM next day
```

The system then compares the current time with the deadline.

---

# 6. Detecting SLA Breaches

A ticket is considered overdue when:

```text
Current Time > SLA Deadline
```

This check is performed by the application whenever an SLA escalation run occurs.

The logic can be represented as:

```text
Is ticket resolved?
        │
        ├── Yes → Ignore
        │
        └── No
             │
             ▼
      Is SLA breached?
             │
       ┌─────┴─────┐
       │           │
      No          Yes
       │           │
       ▼           ▼
   Do nothing   Escalate
```

This ensures that only active tickets with breached SLAs are considered.

---

# 7. Why Resolved Tickets Are Ignored

A resolved ticket should not be escalated even if its SLA deadline has passed.

For example:

```text
Ticket:
HD-1005

Status:
Resolved

SLA:
Breached
```

The system does not change its priority.

This prevents historical or completed tickets from affecting the active helpdesk queue.

---

# 8. SLA Escalation Logic

The most important business rule is:

> A breached ticket can increase by at most one priority level per run.

The escalation path is:

```text
Normal → High
High → Urgent
Urgent → Urgent
```

The core logic is:

```javascript
function escalatePriority(priority) {
    if (priority === "normal") return "high";
    if (priority === "high") return "urgent";
    return "urgent";
}
```

This deliberately prevents a ticket from jumping multiple levels during one run.

---

# 9. Why Only One Level Per Run?

Consider a normal ticket that has been overdue for a long time.

It could be tempting to immediately change:

```text
Normal → Urgent
```

However, the requirement specifies one level per run.

Therefore:

### First escalation run

```text
Normal → High
```

### Next escalation run

```text
High → Urgent
```

### Further runs

```text
Urgent → Urgent
```

This creates a predictable and controlled escalation process.

---

# 10. Automated Monitoring

The system performs an automatic SLA check every 30 seconds.

Conceptually:

```text
Application Running
       │
       ▼
Wait 30 seconds
       │
       ▼
Check SLA
       │
       ▼
Find breached tickets
       │
       ▼
Escalate eligible tickets
       │
       ▼
Save changes
       │
       └──────────────► Repeat
```

The 30-second interval is primarily intended for the demonstration application.

In a production system, this responsibility would normally be handled by a backend scheduler, job queue, or cloud-based scheduled process.

---

# 11. Manual SLA Check

An **Escalate SLA** button is also provided.

This allows the user to manually trigger the same escalation process.

This serves two purposes:

1. It provides immediate control to the helpdesk operator.
2. It makes the SLA escalation feature easy to demonstrate.

For example:

```text
Click "⚡ Escalate SLA"
          ↓
Check overdue tickets
          ↓
Escalate eligible tickets
          ↓
Refresh dashboard
```

The manual and automatic checks use the same escalation logic.

---

# 12. Queue Ordering

The queue should help the operator identify the most pressing ticket.

The basic ordering principle is:

```text
Priority
   ↓
SLA urgency
   ↓
Ticket age
```

Priority is the first major factor:

```text
Urgent > High > Normal
```

Within the same priority, tickets closer to or beyond their SLA deadline receive attention before less urgent tickets.

Older tickets can then be used as a further tie-breaker.

This prevents the queue from behaving like a simple first-in-first-out list.

---

# 13. Dashboard Design

The dashboard provides a quick overview of the queue.

It displays counts such as:

```text
Total Tickets
Urgent
High
Normal
Resolved
```

The reasoning behind this design is that helpdesk operators should not need to inspect every ticket to understand the current workload.

For example:

```text
Urgent: 5
High:   3
Normal: 8
```

Immediately communicates the current distribution of work.

---

# 14. Filtering and Search

A helpdesk queue can become difficult to use as the number of tickets increases.

The application therefore provides:

### Priority Filters

```text
All
Urgent
High
Normal
Resolved
```

### Search

The search function can be used to locate tickets using information such as:

```text
Ticket ID
Title
Requester
Category
```

This separates **queue prioritization** from **ticket discovery**.

The queue determines what should be handled first, while search and filters help the operator locate specific tickets.

---

# 15. LocalStorage Decision

The application does not require a backend server.

Instead, ticket data is stored using browser LocalStorage.

The reasoning is:

* The Builder Round application can run immediately.
* No database setup is required.
* No backend deployment is required.
* Ticket changes survive browser refreshes.
* The application remains simple and easy to demonstrate.

The general data flow is:

```text
User Action
     ↓
JavaScript State
     ↓
LocalStorage
     ↓
Browser Refresh
     ↓
Restore Tickets
```

---

# 16. Frontend-Only Architecture

The project intentionally uses a simple architecture:

```text
┌─────────────────────────────┐
│          Browser            │
│                             │
│  ┌───────────────────────┐  │
│  │       index.html      │  │
│  │       User Interface  │  │
│  └───────────┬───────────┘  │
│              │              │
│  ┌───────────▼───────────┐  │
│  │       app.js          │  │
│  │ Queue + SLA + State   │  │
│  └───────────┬───────────┘  │
│              │              │
│  ┌───────────▼───────────┐  │
│  │      LocalStorage     │  │
│  │     Ticket Data       │  │
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
```

This keeps the implementation small while still demonstrating the required business logic.

---

# 17. Separation of Responsibilities

The project separates responsibilities across three files.

## `index.html`

Responsible for:

* Application structure
* Dashboard
* Ticket forms
* Filters
* Buttons
* Ticket containers

## `style.css`

Responsible for:

* Layout
* Colors
* Typography
* Responsive design
* Priority indicators
* SLA warnings
* Ticket cards

## `app.js`

Responsible for:

* Ticket state
* Queue sorting
* Search
* Filtering
* SLA calculations
* Escalation
* LocalStorage
* Dashboard updates

This separation makes the project easier to understand and modify.

---

# 18. Handling the Escalation State

When a ticket is escalated, the system records information such as:

```text
lastEscalatedAt
escalationCount
```

This provides visibility into how many times a ticket has been escalated.

For example:

```text
Ticket: HD-1004
Priority: High
Escalated ×1
```

After another escalation:

```text
Ticket: HD-1004
Priority: Urgent
Escalated ×2
```

This is useful for demonstrating the escalation history at a basic level.

---

# 19. Preventing Repeated Escalation in One Run

The escalation process operates on the ticket state present at the beginning of the run.

Each eligible ticket is escalated only once during that execution.

Therefore, a ticket cannot accidentally move:

```text
Normal → High → Urgent
```

during the same run.

Instead, it moves only:

```text
Normal → High
```

The next scheduled/manual run is required for:

```text
High → Urgent
```

This directly satisfies the one-level-per-run requirement.

---

# 20. Example Scenario

Suppose the queue contains:

```text
HD-1001 → Urgent → Pending
HD-1002 → High   → Pending
HD-1003 → Normal → Pending
HD-1004 → Normal → Pending → SLA Breached
HD-1005 → Normal → Resolved → SLA Breached
```

During an SLA check:

### HD-1001

```text
Urgent
→ Already highest priority
→ No escalation
```

### HD-1002

```text
High
→ SLA status checked
→ If breached: High → Urgent
```

### HD-1003

```text
Normal
→ If within SLA
→ No change
```

### HD-1004

```text
Normal
→ SLA breached
→ Normal → High
```

### HD-1005

```text
Resolved
→ Ignore
```

This demonstrates all major business rules.

---

# 21. Why the Solution Is Simple

The application deliberately avoids unnecessary complexity.

The goal is not to build a complete enterprise ITSM platform. The goal is to solve the specific queue-management problem effectively.

Therefore, the implementation avoids:

* Complex backend infrastructure
* Authentication systems
* External databases
* Unnecessary frameworks
* Third-party dependencies

This makes the solution:

* Easy to run
* Easy to understand
* Easy to demonstrate
* Easy to extend

---

# 22. Trade-offs

## LocalStorage vs Database

### Current Approach

```text
LocalStorage
```

Advantages:

* No server required
* Fast setup
* Simple implementation
* Works offline

Limitations:

* Data belongs to one browser
* No multi-user synchronization
* Not suitable for production-scale systems

### Production Approach

A real system could use:

```text
Frontend
    ↓
REST API
    ↓
Backend
    ↓
PostgreSQL / MySQL
```

---

## Browser Timer vs Backend Scheduler

### Current Approach

```javascript
setInterval(...)
```

Advantages:

* Easy to implement
* Suitable for a demonstration
* No backend infrastructure

Limitation:

The timer only operates while the application is running.

A production application should use a server-side scheduler or background job system.

---

# 23. Production Architecture Possibility

If this application were extended into a production system, the architecture could become:

```text
                  ┌──────────────┐
                  │   Frontend   │
                  │ React / Vue  │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │   REST API   │
                  └──────┬───────┘
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
       ┌─────────────┐      ┌─────────────┐
       │  Database   │      │ SLA Worker  │
       │ PostgreSQL  │      │ / Scheduler │
       └─────────────┘      └──────┬──────┘
                                   │
                                   ▼
                            Escalate Tickets
```

This would allow multiple helpdesk agents to work with the same queue.

---

# 24. Important Edge Cases

The implementation considers several important cases.

### Already Urgent

```text
Urgent → Urgent
```

No higher priority exists.

### Resolved Ticket

```text
Resolved + SLA Breached
→ No escalation
```

### Normal Ticket

```text
Normal + SLA Breached
→ High
```

### High Ticket

```text
High + SLA Breached
→ Urgent
```

### Ticket Within SLA

```text
Within SLA
→ No escalation
```

These rules prevent unintended priority changes.

---

# 25. User Experience Considerations

The interface is designed around the operator's workflow.

The operator should be able to:

```text
Open Dashboard
      ↓
Understand Queue
      ↓
Identify Urgent Work
      ↓
Inspect Ticket
      ↓
Resolve / Assign
      ↓
Monitor SLA
```

Visual priority indicators make urgent and escalated tickets easier to identify without opening every ticket.

---

# 26. Why This Approach Fits the Challenge

The solution directly addresses the central problem:

```text
Too many tickets
      ↓
Need prioritization
      ↓
Priority-based queue
      ↓
Need SLA monitoring
      ↓
Automatic breach detection
      ↓
Need escalation
      ↓
Normal → High → Urgent
```

Instead of only creating a ticket management interface, the application adds operational logic that actively helps the support team manage the queue.

---

# 27. Final Design Summary

The final solution is based on the following principles:

```text
1. Prioritize important tickets.
2. Track SLA deadlines.
3. Detect SLA breaches automatically.
4. Escalate only one level per run.
5. Never escalate resolved tickets.
6. Never escalate beyond Urgent.
7. Persist ticket data.
8. Keep the interface simple.
9. Make important queue information visible immediately.
10. Keep the architecture easy to extend.
```

The result is a lightweight helpdesk queue that demonstrates both **frontend implementation** and **business-rule-driven logic**, while leaving a clear path toward a production backend architecture.

Tarun, this email is about Auriga IT's Round 2 — "Builder" Round, a practical coding assessment. Here's what you need to know and how you should prepare.

🔹 Auriga IT — Round 2: Builder Round
📋 Assessment Details
Aspect	Details
Duration	2.5 hours (150 minutes)
Round Type	Hands-on development
Problem Statement	A short, real-world problem will be provided
Requirements	You must interpret the requirements yourself
Technical Specifications	No additional explanation will be provided
Technology Stack	You can use any stack you are comfortable with
AI Assistance	Allowed (ChatGPT, GitHub Copilot, etc.)
Development Environment	GitHub Codespaces
College Email	You must access Codespaces using your college email
Location	Sit at the same spot as in Round 1
🎯 What Will They Evaluate?

This round is designed to test your ability to build a functional application from an open-ended problem statement.

You may be evaluated on:

Understanding requirements — Can you identify what needs to be built?
Problem-solving — Can you design a practical solution?
Coding skills — Can you implement the features correctly?
UI/UX — Can you create a usable interface?
Database integration — Can you store and retrieve data effectively?
Code quality — Is your code organized and maintainable?
Time management — Can you complete the project within 2.5 hours?
🚀 How You Should Prepare

Since you have experience with MERN Stack development and projects such as TaskFlow, I recommend preparing a few reusable project templates.

1. Practice Building These Applications
📝 Task Management App — Create, update, delete, and filter tasks.
📚 Student Management System — Manage student records and search functionality.
💰 Expense Tracker — Add expenses, categorize them, and calculate totals.
📦 Inventory Management System — Manage products, stock, and transactions.
📅 Event Management App — Create events and allow users to register.
🎫 Issue Tracker — Create, assign, and track issues.
2. Prepare a Reusable Tech Stack

For a 2.5-hour assessment, choose technologies that you already know well.

For example:

Frontend:

React + Vite
HTML/CSS/JavaScript

Backend:

Node.js + Express

Database:

SQLite or PostgreSQL

Alternatively, you can use a simpler stack such as React + localStorage if the problem doesn't require a backend.

3. Follow This Time Management Strategy
Time	Task
0–15 min	Understand the problem and identify requirements
15–30 min	Plan the UI, data model, and application structure
30–100 min	Implement the core functionality
100–125 min	Add validation, filtering, and other important features
125–140 min	Test and fix bugs
140–150 min	Final testing and submission

Important: Build the core features first. Don't spend too much time on styling.

💡 My Recommendation

We can conduct a mock Auriga IT Builder Round right here.

I'll give you a real-world problem statement similar to what you might receive in the assessment, without explaining the requirements.

You will then:

Analyze the problem.
Decide the features.
Choose your tech stack.
Build the application.
Ask me for AI assistance whenever needed.
Would you like to start a mock Auriga IT Builder Round?

The helpdesk is drowning
Priya runs a two-person IT helpdesk and the queue never stops. Some tickets are ‘my laptop won’t boot before a client demo’ emergencies; others are ‘can I get a bigger monitor.’ Each ticket has a priority and an agreed response time — urgent within 2 hours, normal within a day — and Priya wants to always pick the most pressing ticket next, with anything past its promised time jumping to the front. She’s forever answering ‘what’s overdue?’ and ‘what’s assigned to me?’, and looking up a specific customer’s ticket by name. The list is huge, so she pages through it.
Build Priya something so the right ticket is always on top.
(The way Priya talks about her queue tells you what it needs — the ordering rule is the heart of it. Build it for any helpdesk, not just Priya’s. Get tickets and the queue order right first, then filters and assignment.)

Tarun, I've converted the Auriga IT Builder Round problem statement into a working Helpdesk Queue application.

🚀 Download the Helpdesk Queue Project
✅ Features implemented
Smart ticket ordering: Overdue tickets appear first, followed by the earliest SLA deadline.
Priority management: Urgent tickets have a 2-hour SLA; normal tickets have a 24-hour SLA.
Ticket creation: Add customer, issue, priority, and assignee.
Search: Find tickets by customer name, ticket ID, or issue.
Filters: Overdue, assigned to Priya, urgent, unassigned, and status.
Ticket assignment: Assign tickets to Priya or Arshad.
Status management: Open → In progress → Resolved.
Pagination: Browse large ticket lists.
Dashboard: View open, overdue, urgent, and assigned ticket counts.
Local storage: Data persists in the browser.
🛠️ Technology Stack
HTML
CSS
JavaScript
Browser localStorage

I chose a dependency-free stack so you can run it quickly during the assessment without spending time configuring a backend.

▶️ Run it in GitHub Codespaces
Download and extract the ZIP.
Upload the project to your GitHub repository.
Open it in GitHub Codespaces.
Run:
python3 -m http.server 8000
Open the forwarded port in your browser.

Important: The application includes demo tickets and a reset button so you can test the queue-ordering logic immediately.

its a good one but i also wat to add the feature when i click on these four boxes then its also show me the data like if i click on urgent box then it will show me 5 urgent tickets which are pending

Done, Tarun! ✅ I've updated your Helpdesk Queue project to make the four dashboard cards clickable.

🚀 Download Updated Helpdesk Queue
✨ New Feature: Interactive Dashboard Cards

When you click on a card:

Card	What happens
🟦 Open tickets	Shows all pending tickets
🔴 Overdue	Shows only overdue pending tickets
🟠 Urgent	Shows all urgent pending tickets
👤 Assigned to me	Shows tickets assigned to Priya that are still pending
Additional improvements
The selected card gets a highlighted border.
The ticket list updates automatically.
Search and previous filters are cleared when you select a dashboard card.
Pagination works with the filtered results.
Resolved tickets are excluded from these dashboard views.

For example: Clicking the Urgent card will display the 5 urgent, unresolved tickets in your demo dataset. 🎯

Absolutely — here is a complete README for your Auriga Builder Round Helpdesk Queue project, including the new automated SLA escalation feature.

🚨 Helpdesk Queue — Auriga Builder Round

A smart and responsive IT Helpdesk Queue Management System built for the Auriga Builder Round.

The application helps a small IT helpdesk prioritize incoming support tickets based on SLA deadlines, overdue status, and ticket priority. It also includes an automated SLA escalation mechanism that increases the priority of overdue tickets by one level at a time.

📌 Problem Statement

Priya runs a two-person IT helpdesk where tickets continuously arrive with different levels of urgency.

For example:

💻 "My laptop won't boot before a client demo" — Emergency
🖥️ "Can I get a larger monitor?" — Normal request
🔐 "I cannot access the VPN" — Urgent issue

Each ticket has an agreed response time:

Priority	SLA
🔴 Urgent	2 hours
🟣 High	8 hours
⚪ Normal	24 hours

The helpdesk needs to always work on the most pressing ticket first.

✨ Features
1. Smart Ticket Queue

Tickets are automatically ordered using:

Overdue
    ↓
SLA deadline
    ↓
Priority
    ↓
Oldest ticket

This ensures that tickets requiring immediate attention appear at the top of the queue.

2. Automated SLA Escalation ⚡

The application automatically checks for SLA breaches every 30 seconds.

When an active ticket exceeds its response deadline:

Normal → High → Urgent

Only one priority level is increased per escalation run.

Example

Suppose a Normal ticket becomes overdue.

First check:

Normal → High

If it remains overdue during the next check:

High → Urgent

Once the ticket reaches Urgent:

Urgent → Urgent

It cannot escalate beyond Urgent.

Important Rules
Resolved tickets are never escalated.
Only overdue active tickets are considered.
Urgent tickets remain Urgent.
A ticket can increase by only one priority level per run.
Escalation information is stored in localStorage.
3. Manual SLA Escalation

The application also provides an:

⚡ Escalate SLA

button.

This allows the escalation mechanism to be demonstrated immediately instead of waiting for the 30-second automatic check.

For example:

HD-1004: normal → high

After escalation, the application displays a notification showing which tickets were escalated.

4. Ticket Dashboard

The dashboard displays:

Open tickets
Overdue tickets
Urgent tickets
High-priority tickets

The statistics update automatically.

5. Ticket Filtering

Tickets can be filtered by:

Status
Active only
All statuses
Open
In progress
Resolved
View
All tickets
Overdue
Assigned to me
Unassigned
Urgent
High priority
6. Ticket Search 🔎

Users can search tickets using:

Ticket ID
Customer name
Issue title
Description

Example:

Rahul

or:

laptop
7. Ticket Details

Selecting a ticket displays:

Customer
Issue title
Description
Priority
SLA deadline
Creation time
Queue state
Number of escalations
Last escalation time
Assignee
Ticket status
8. Ticket Management

Users can:

Create tickets
Assign tickets
Change ticket status
Delete tickets
Reset demo data
9. Priority Levels

The application supports three priority levels:

🔴 Urgent

SLA:

2 hours
🟣 High

SLA:

8 hours
⚪ Normal

SLA:

24 hours
🧠 Queue Priority Logic

The queue uses the following priority ranking:

Urgent = 0
High   = 1
Normal = 2

However, overdue status is considered before priority.

The sorting algorithm is:

1. Overdue tickets first
2. Earliest SLA deadline
3. Highest priority
4. Oldest ticket

This makes the queue deterministic and predictable.

⚡ SLA Escalation Logic

The core escalation logic is:

function escalatePriority(priority) {

  if (priority === 'normal') {
    return 'high';
  }

  if (priority === 'high') {
    return 'urgent';
  }

  return 'urgent';
}

The automated check then evaluates every active ticket:

function runSlaEscalation() {

  let escalatedCount = 0;

  state.tickets.forEach((ticket) => {

    if (ticket.status === 'resolved') {
      return;
    }

    if (!isOverdue(ticket)) {
      return;
    }

    if (ticket.priority === 'urgent') {
      return;
    }

    ticket.priority =
      escalatePriority(ticket.priority);

    ticket.lastEscalatedAt =
      new Date().toISOString();

    ticket.escalationCount =
      (ticket.escalationCount || 0) + 1;

    escalatedCount++;

  });

  if (escalatedCount > 0) {
    saveTickets();
  }

  return escalatedCount;
}
⏱️ Automatic SLA Check

The application runs the escalation check every 30 seconds:

setInterval(
  automaticSlaCheck,
  30000
);

The application also performs an initial SLA check when it starts.

This means overdue tickets can be escalated immediately when the application loads.

💾 Data Persistence

The project uses the browser's Local Storage.

Tickets are stored using:

auriga-helpdesk-tickets-v2

This means ticket data remains available even after refreshing the browser.

No external database is required.

🖥️ Technology Stack
Technology	Purpose
HTML5	Application structure
CSS3	Styling and responsive design
JavaScript	Application logic
LocalStorage	Ticket persistence
Browser DOM API	Dynamic UI updates
📁 Project Structure
helpdesk-queue/
│
├── index.html
├── style.css
├── app.js
└── README.md
🚀 How to Run
Option 1 — VS Code Live Server
Open the project folder in VS Code.
Install the Live Server extension if it is not already installed.
Right-click index.html.
Select:
Open with Live Server
The application will open in your browser.
Option 2 — Direct Browser

You can also simply open:

index.html

in a modern web browser.

No backend or package installation is required.

🧪 Demo the SLA Escalation

The demo dataset contains an overdue Normal ticket:

HD-1004
Password reset request
Priority: Normal
Status: Open
SLA: Already breached

When the application starts or the ⚡ Escalate SLA button is clicked:

HD-1004
Normal → High

The ticket will then show:

HIGH
OVERDUE
ESCALATED ×1

If it remains overdue and another escalation run occurs:

High → Urgent

This demonstrates the requirement that a ticket can only increase one priority level per run.

📊 Example Workflow
Customer submits ticket
        ↓
Ticket receives priority
        ↓
SLA deadline is calculated
        ↓
Ticket enters queue
        ↓
Queue sorts tickets
        ↓
SLA monitoring runs
        ↓
Is ticket overdue?
      /     \
    No       Yes
    ↓         ↓
Continue   Check priority
              ↓
       Normal → High
              ↓
        Next SLA run
              ↓
          High → Urgent
              ↓
        Urgent remains
🎯 Builder Round Requirements

This project addresses the core requirements of the helpdesk scenario:

Requirement	Implementation
Ticket queue	✅
Priority handling	✅
SLA deadlines	✅
Overdue detection	✅
Queue prioritization	✅
Ticket creation	✅
Ticket assignment	✅
Status management	✅
Search	✅
Filtering	✅
Dashboard statistics	✅
Automated SLA escalation	✅
Normal → High	✅
High → Urgent	✅
One-level-per-run restriction	✅
Resolved tickets excluded	✅
Persistent data	✅
Responsive UI	✅
🔐 Business Rules

The application follows these rules:

Rule 1 — Resolved tickets
Resolved → No escalation
Rule 2 — Overdue tickets
Overdue + Normal → High
Rule 3 — High priority
Overdue + High → Urgent
Rule 4 — Urgent
Overdue + Urgent → Urgent
Rule 5 — Escalation limit
Maximum one priority increase per SLA run
📱 Responsive Design

The interface adapts to:

Desktop
Laptop
Tablet
Mobile

The ticket queue and ticket details automatically stack on smaller screens.

🏆 Project Highlights

The project demonstrates practical concepts including:

Queue management
Priority scheduling
SLA monitoring
Automated escalation
State management
CRUD operations
Local data persistence
Dynamic DOM rendering
Filtering and searching
Responsive UI design
Business-rule implementation
🔮 Future Improvements

The current application is frontend-only. It can be extended with:

User authentication
Role-based access
Backend API
PostgreSQL/MySQL database
Real-time notifications
Email notifications
Slack/Teams integration
Ticket history and audit logs
Advanced SLA policies
Multiple support teams
Analytics dashboard
Charts and reporting
Admin dashboard
AI-based ticket categorization
AI-based priority prediction
👨‍💻 Project

Auriga Builder Round — Helpdesk Queue

A lightweight helpdesk management application designed to ensure that the most pressing support ticket is always visible at the top while automatically escalating tickets that breach their SLA.

make a README.md file for github

Absolutely. Here is a GitHub-ready README.md for your Helpdesk Queue project, written to look professional for the Auriga Builder Round.

README.md
🚨 Helpdesk Queue Management System

A lightweight and interactive Helpdesk Queue Management System designed for a two-person IT helpdesk. The application helps support staff prioritize incoming tickets, monitor SLA deadlines, and automatically escalate overdue tickets.

Built as a solution for the Auriga Builder Round challenge.

📌 Problem Statement

Priya runs a two-person IT helpdesk where tickets continuously arrive with different levels of urgency.

For example:

💻 A laptop won't boot before an important client demo.
🖥️ An employee wants a larger monitor.
🔐 A user cannot access an important system.

Each ticket has a priority and an agreed response time (SLA).

The system should always help Priya pick the most pressing ticket first while ensuring that tickets that exceed their SLA are automatically escalated.

✨ Key Features
🎯 Smart Ticket Queue

Tickets are automatically ordered based on:

Priority
SLA urgency
Creation time

Priority order:

URGENT → HIGH → NORMAL
⚡ Automatic SLA Escalation

The application automatically checks tickets every 30 seconds.

If a pending ticket has exceeded its SLA:

NORMAL → HIGH → URGENT

Only one priority level is increased per escalation run.

For example:

Run 1:
Normal → High

Run 2:
High → Urgent

Run 3:
Urgent → Urgent

An already urgent ticket cannot be escalated further.

Resolved tickets are never escalated.

⚡ Manual SLA Check

The Escalate SLA button allows the helpdesk operator to immediately run the SLA escalation process.

This makes the feature easy to demonstrate during the Builder Round.

📊 Dashboard

The dashboard provides an overview of the current queue:

Total tickets
Urgent tickets
High-priority tickets
Normal tickets
Resolved tickets

The dashboard updates automatically when ticket information changes.

🔍 Search & Filtering

Tickets can be filtered by:

All
Urgent
High
Normal
Resolved

Users can also search tickets using:

Ticket ID
Ticket title
Requester
Category
🎫 Ticket Management

Each ticket contains information such as:

Ticket ID
Title
Description
Requester
Category
Priority
Status
SLA deadline
Creation time

Tickets can be:

Assigned
Resolved
Reopened
Deleted
💾 Local Storage

Ticket information is stored using the browser's LocalStorage.

This means ticket changes remain available even after refreshing the browser.

No backend or database is required.

⏱️ SLA Rules
Priority	Response Time
🔴 Urgent	2 hours
🟠 High	8 hours
🟢 Normal	24 hours

When the SLA deadline is exceeded, the ticket becomes eligible for escalation.

🔄 SLA Escalation Workflow
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
🧠 Queue Priority Logic

The application uses a priority ranking:

Urgent = 0
High   = 1
Normal = 2

Therefore, a lower rank means higher priority.

The queue ensures that urgent tickets appear before high-priority tickets, and high-priority tickets appear before normal tickets.

Within the same priority, tickets approaching or exceeding their SLA are handled first.

⚡ Escalation Logic

The core escalation logic follows this rule:

function escalatePriority(priority) {
    if (priority === "normal") return "high";
    if (priority === "high") return "urgent";
    return "urgent";
}

The system also checks whether the ticket is overdue before escalating it.

Resolved tickets are ignored.

🔁 Automated SLA Monitoring

The application runs an automatic SLA check every 30 seconds:

setInterval(() => {
    automaticSlaCheck();
}, 30000);

This allows overdue tickets to be escalated without requiring manual interaction.

🧪 Demo Ticket

The application contains a demo ticket:

HD-1004
Priority: Normal
Status: Pending
SLA: Breached

When the application performs an SLA check:

Normal
   ↓
High

The ticket receives an escalation indicator.

Running the SLA check again after another breach can move it:

High
 ↓
Urgent

This makes the automated escalation feature easy to demonstrate.

🏗️ Project Structure
helpdesk-queue/
│
├── index.html
├── style.css
├── app.js
└── README.md
index.html

Contains the application's UI structure:

Dashboard
Statistics cards
Search
Filters
Ticket queue
Ticket details
Ticket creation form
SLA controls
style.css

Contains:

Responsive layout
Dashboard styling
Ticket cards
Priority indicators
Buttons
SLA warnings
Escalation badges
Mobile responsiveness
app.js

Contains the application's functionality:

Ticket management
Queue sorting
Searching
Filtering
SLA calculation
SLA escalation
LocalStorage
Dashboard updates
Automatic refresh
🛠️ Technologies Used
HTML5
CSS3
JavaScript
LocalStorage
Responsive Web Design

No external backend is required.

▶️ How to Run
1. Clone the Repository

Clone the project to your local machine.

2. Open the Project

Open the project folder in VS Code.

3. Run the Application

You can simply open:

index.html

in your browser.

For a better development experience, use the Live Server extension in VS Code.

4. Start Testing

Try:

Creating a new ticket.
Selecting different priorities.
Searching for tickets.
Filtering by priority.
Resolving a ticket.
Clicking Escalate SLA.
Checking how overdue tickets change priority.
📋 Business Rules

The system follows these rules:

Rule 1 — Priority
Urgent > High > Normal
Rule 2 — SLA

Each priority has a defined response deadline.

Rule 3 — Escalation

An overdue ticket increases by only one priority level per run.

Rule 4 — Maximum Priority

Urgent is the highest priority.

Urgent → Urgent
Rule 5 — Resolved Tickets

Resolved tickets cannot be escalated.

Rule 6 — Persistence

Ticket changes are stored in browser LocalStorage.

📱 Responsive Design

The application is designed to work across:

💻 Desktop
💻 Laptop
📱 Tablet
📱 Mobile

The layout automatically adapts to smaller screen sizes.

🚀 Future Improvements

Possible future enhancements include:

Backend API integration
MySQL/PostgreSQL database
User authentication
Multiple helpdesk agents
Role-based access control
Email notifications
Slack/Teams notifications
Advanced SLA analytics
Ticket history and audit logs
Real-time WebSocket updates
Admin dashboard
Agent performance reports
🎯 Builder Round Requirements
Requirement	Implementation
Helpdesk ticket queue	✅
Ticket priorities	✅
SLA tracking	✅
Urgent tickets	✅
Normal tickets	✅
High-priority tickets	✅
Queue prioritization	✅
SLA breach detection	✅
Automatic escalation	✅
One-level escalation	✅
Manual SLA check	✅
Resolved ticket protection	✅
Search	✅
Filtering	✅
Dashboard statistics	✅
Persistent ticket data	✅
Responsive UI	✅
💡 Example

Suppose the queue contains:

Ticket A → Normal
Ticket B → Urgent
Ticket C → High
Ticket D → Normal (SLA breached)

The queue will prioritize:

1. Ticket B → Urgent
2. Ticket C → High
3. Ticket D → Normal (SLA breached)
4. Ticket A → Normal

After SLA escalation:

Ticket D → High

On a later escalation run:

Ticket D → Urgent

The system therefore ensures that overdue tickets receive progressively higher priority.

🏆 Project Objective

The goal of this project is to provide a simple but effective helpdesk queue that allows support staff to:

Identify the most important tickets quickly.
Track SLA deadlines.
Automatically react to SLA breaches.
Prevent overdue tickets from being ignored.
Maintain an organized support queue.
👨‍💻 Project

Helpdesk Queue Management System

Built for the Auriga Builder Round.

📄 License

This project is created for educational, demonstration, and Builder Round purposes.

You can copy this directly into a file named README.md and push it to your GitHub repository.

REASONING.md — an explanation of the thought process behind the solution.  

make a REASONING.md file for github

Yes. For GitHub, REASONING.md should explain the design decisions, architecture, prioritization logic, SLA escalation approach, and trade-offs rather than exposing private chain-of-thought. Here is a polished version you can add directly to the repository.

REASONING.md
🧠 Reasoning & Design Decisions
1. Overview

The Helpdesk Queue Management System was designed around a simple operational problem:

Priya needs to quickly identify which support ticket should be handled next while ensuring that tickets exceeding their agreed SLA do not remain unnoticed.

The solution therefore focuses on four core areas:

Priority-based queue management
SLA monitoring
Automatic SLA escalation
A simple dashboard for quick decision-making

The application is implemented as a frontend-only web application using HTML, CSS, and JavaScript, with LocalStorage used for persistence.

2. Understanding the Problem

Each helpdesk ticket contains information such as:

Ticket ID
Title
Description
Requester
Category
Priority
Status
Creation time
SLA deadline

The main challenge is not simply displaying tickets. The system must determine which ticket deserves attention first.

For example, consider this queue:

Ticket A → Normal
Ticket B → Urgent
Ticket C → High
Ticket D → Normal + SLA breached

Simply sorting by creation time would not be sufficient.

The system instead considers priority and SLA state when organizing the queue.

3. Priority Model

Three priority levels are used:

URGENT
HIGH
NORMAL

They are represented internally using numerical ranks:

Urgent = 0
High   = 1
Normal = 2

A lower numerical value represents a higher priority.

This makes sorting straightforward.

For example:

Urgent (0)
High   (1)
Normal (2)

The queue can therefore be sorted using the priority rank.

4. Why Three Priority Levels?

The original problem establishes urgent and normal tickets, while the escalation requirement introduces an intermediate step.

The escalation rule is:

Normal → High → Urgent

Adding High creates a controlled escalation path.

Without an intermediate level, a normal ticket would have to jump directly from:

Normal → Urgent

That would make the escalation too aggressive.

The three-level model allows the system to increase urgency gradually.

5. SLA Design

Each priority has a response-time target.

Priority	SLA
Urgent	2 hours
High	8 hours
Normal	24 hours

When a ticket is created, its SLA deadline is calculated from its creation time.

Conceptually:

SLA Deadline = Creation Time + Priority SLA

For example:

Created:
10:00 AM

Priority:
Normal

SLA:
24 hours

Deadline:
10:00 AM next day

The system then compares the current time with the deadline.

6. Detecting SLA Breaches

A ticket is considered overdue when:

Current Time > SLA Deadline

This check is performed by the application whenever an SLA escalation run occurs.

The logic can be represented as:

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

This ensures that only active tickets with breached SLAs are considered.

7. Why Resolved Tickets Are Ignored

A resolved ticket should not be escalated even if its SLA deadline has passed.

For example:

Ticket:
HD-1005

Status:
Resolved

SLA:
Breached

The system does not change its priority.

This prevents historical or completed tickets from affecting the active helpdesk queue.

8. SLA Escalation Logic

The most important business rule is:

A breached ticket can increase by at most one priority level per run.

The escalation path is:

Normal → High
High → Urgent
Urgent → Urgent

The core logic is:

function escalatePriority(priority) {
    if (priority === "normal") return "high";
    if (priority === "high") return "urgent";
    return "urgent";
}

This deliberately prevents a ticket from jumping multiple levels during one run.

9. Why Only One Level Per Run?

Consider a normal ticket that has been overdue for a long time.

It could be tempting to immediately change:

Normal → Urgent

However, the requirement specifies one level per run.

Therefore:

First escalation run
Normal → High
Next escalation run
High → Urgent
Further runs
Urgent → Urgent

This creates a predictable and controlled escalation process.

10. Automated Monitoring

The system performs an automatic SLA check every 30 seconds.

Conceptually:

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

The 30-second interval is primarily intended for the demonstration application.

In a production system, this responsibility would normally be handled by a backend scheduler, job queue, or cloud-based scheduled process.

11. Manual SLA Check

An Escalate SLA button is also provided.

This allows the user to manually trigger the same escalation process.

This serves two purposes:

It provides immediate control to the helpdesk operator.
It makes the SLA escalation feature easy to demonstrate.

For example:

Click "⚡ Escalate SLA"
          ↓
Check overdue tickets
          ↓
Escalate eligible tickets
          ↓
Refresh dashboard

The manual and automatic checks use the same escalation logic.

12. Queue Ordering

The queue should help the operator identify the most pressing ticket.

The basic ordering principle is:

Priority
   ↓
SLA urgency
   ↓
Ticket age

Priority is the first major factor:

Urgent > High > Normal

Within the same priority, tickets closer to or beyond their SLA deadline receive attention before less urgent tickets.

Older tickets can then be used as a further tie-breaker.

This prevents the queue from behaving like a simple first-in-first-out list.

13. Dashboard Design

The dashboard provides a quick overview of the queue.

It displays counts such as:

Total Tickets
Urgent
High
Normal
Resolved

The reasoning behind this design is that helpdesk operators should not need to inspect every ticket to understand the current workload.

For example:

Urgent: 5
High:   3
Normal: 8

Immediately communicates the current distribution of work.

14. Filtering and Search

A helpdesk queue can become difficult to use as the number of tickets increases.

The application therefore provides:

Priority Filters
All
Urgent
High
Normal
Resolved
Search

The search function can be used to locate tickets using information such as:

Ticket ID
Title
Requester
Category

This separates queue prioritization from ticket discovery.

The queue determines what should be handled first, while search and filters help the operator locate specific tickets.

15. LocalStorage Decision

The application does not require a backend server.

Instead, ticket data is stored using browser LocalStorage.

The reasoning is:

The Builder Round application can run immediately.
No database setup is required.
No backend deployment is required.
Ticket changes survive browser refreshes.
The application remains simple and easy to demonstrate.

The general data flow is:

User Action
     ↓
JavaScript State
     ↓
LocalStorage
     ↓
Browser Refresh
     ↓
Restore Tickets
16. Frontend-Only Architecture

The project intentionally uses a simple architecture:

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

This keeps the implementation small while still demonstrating the required business logic.

17. Separation of Responsibilities

The project separates responsibilities across three files.

index.html

Responsible for:

Application structure
Dashboard
Ticket forms
Filters
Buttons
Ticket containers
style.css

Responsible for:

Layout
Colors
Typography
Responsive design
Priority indicators
SLA warnings
Ticket cards
app.js

Responsible for:

Ticket state
Queue sorting
Search
Filtering
SLA calculations
Escalation
LocalStorage
Dashboard updates

This separation makes the project easier to understand and modify.

18. Handling the Escalation State

When a ticket is escalated, the system records information such as:

lastEscalatedAt
escalationCount

This provides visibility into how many times a ticket has been escalated.

For example:

Ticket: HD-1004
Priority: High
Escalated ×1

After another escalation:

Ticket: HD-1004
Priority: Urgent
Escalated ×2

This is useful for demonstrating the escalation history at a basic level.

19. Preventing Repeated Escalation in One Run

The escalation process operates on the ticket state present at the beginning of the run.

Each eligible ticket is escalated only once during that execution.

Therefore, a ticket cannot accidentally move:

Normal → High → Urgent

during the same run.

Instead, it moves only:

Normal → High

The next scheduled/manual run is required for:

High → Urgent

This directly satisfies the one-level-per-run requirement.

20. Example Scenario

Suppose the queue contains:

HD-1001 → Urgent → Pending
HD-1002 → High   → Pending
HD-1003 → Normal → Pending
HD-1004 → Normal → Pending → SLA Breached
HD-1005 → Normal → Resolved → SLA Breached

During an SLA check:

HD-1001
Urgent
→ Already highest priority
→ No escalation
HD-1002
High
→ SLA status checked
→ If breached: High → Urgent
HD-1003
Normal
→ If within SLA
→ No change
HD-1004
Normal
→ SLA breached
→ Normal → High
HD-1005
Resolved
→ Ignore

This demonstrates all major business rules.

21. Why the Solution Is Simple

The application deliberately avoids unnecessary complexity.

The goal is not to build a complete enterprise ITSM platform. The goal is to solve the specific queue-management problem effectively.

Therefore, the implementation avoids:

Complex backend infrastructure
Authentication systems
External databases
Unnecessary frameworks
Third-party dependencies

This makes the solution:

Easy to run
Easy to understand
Easy to demonstrate
Easy to extend
22. Trade-offs
LocalStorage vs Database
Current Approach
LocalStorage

Advantages:

No server required
Fast setup
Simple implementation
Works offline

Limitations:

Data belongs to one browser
No multi-user synchronization
Not suitable for production-scale systems
Production Approach

A real system could use:

Frontend
    ↓
REST API
    ↓
Backend
    ↓
PostgreSQL / MySQL
Browser Timer vs Backend Scheduler
Current Approach
setInterval(...)

Advantages:

Easy to implement
Suitable for a demonstration
No backend infrastructure

Limitation:

The timer only operates while the application is running.

A production application should use a server-side scheduler or background job system.

23. Production Architecture Possibility

If this application were extended into a production system, the architecture could become:

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

This would allow multiple helpdesk agents to work with the same queue.

24. Important Edge Cases

The implementation considers several important cases.

Already Urgent
Urgent → Urgent

No higher priority exists.

Resolved Ticket
Resolved + SLA Breached
→ No escalation
Normal Ticket
Normal + SLA Breached
→ High
High Ticket
High + SLA Breached
→ Urgent
Ticket Within SLA
Within SLA
→ No escalation

These rules prevent unintended priority changes.

25. User Experience Considerations

The interface is designed around the operator's workflow.

The operator should be able to:

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

Visual priority indicators make urgent and escalated tickets easier to identify without opening every ticket.

26. Why This Approach Fits the Challenge

The solution directly addresses the central problem:

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

Instead of only creating a ticket management interface, the application adds operational logic that actively helps the support team manage the queue.

27. Final Design Summary

The final solution is based on the following principles:

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

The result is a lightweight helpdesk queue that demonstrates both frontend implementation and business-rule-driven logic, while leaving a clear path toward a production backend architecture.

This version is suitable for a GitHub repository because it explains why the solution was designed this way, including the SLA escalation decision and production trade-offs, without exposing private chain-of-thought.

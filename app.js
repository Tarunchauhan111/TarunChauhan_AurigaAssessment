const STORAGE_KEY = 'auriga-helpdesk-tickets-v1';
const CURRENT_USER = 'Priya';
const PAGE_SIZE = 5;

const $ = (selector) => document.querySelector(selector);
const state = { tickets: [], selectedId: null, page: 1 };

const seedTickets = () => {
  const now = Date.now();
  const hoursAgo = (hours) => new Date(now - hours * 60 * 60 * 1000).toISOString();
  const hoursFromNow = (hours) => new Date(now + hours * 60 * 60 * 1000).toISOString();
  return [
    { id: 'HD-1001', customer: 'Rahul Mehta', title: 'Laptop will not boot before client demo', description: 'The laptop shows a black screen and the demo starts soon.', priority: 'urgent', status: 'open', assignee: 'Priya', createdAt: hoursAgo(4), dueAt: hoursAgo(2) },
    { id: 'HD-1002', customer: 'Ananya Sharma', title: 'Request for a larger monitor', description: 'Please arrange a 27-inch monitor for the design desk.', priority: 'normal', status: 'open', assignee: 'Unassigned', createdAt: hoursAgo(3), dueAt: hoursFromNow(21) },
    { id: 'HD-1003', customer: 'Vikram Singh', title: 'VPN access is failing', description: 'Unable to connect to the company VPN from home.', priority: 'urgent', status: 'in-progress', assignee: 'Arshad', createdAt: hoursAgo(1), dueAt: hoursFromNow(1) },
    { id: 'HD-1004', customer: 'Neha Kapoor', title: 'Password reset request', description: 'User is locked out after multiple failed attempts.', priority: 'normal', status: 'open', assignee: 'Priya', createdAt: hoursAgo(28), dueAt: hoursAgo(4) },
    { id: 'HD-1005', customer: 'Amit Joshi', title: 'Install approved accounting software', description: 'Install the approved accounting package on the finance workstation.', priority: 'normal', status: 'resolved', assignee: 'Arshad', createdAt: hoursAgo(30), dueAt: hoursAgo(6) },
    { id: 'HD-1006', customer: 'Pooja Verma', title: 'Email attachment blocked', description: 'A legitimate PDF attachment is being blocked by the mail gateway.', priority: 'urgent', status: 'open', assignee: 'Unassigned', createdAt: hoursAgo(0.5), dueAt: hoursFromNow(1.5) },
    { id: 'HD-1007', customer: 'Rohan Gupta', title: 'Keyboard replacement', description: 'Several keys are not responding.', priority: 'normal', status: 'open', assignee: 'Priya', createdAt: hoursAgo(5), dueAt: hoursFromNow(19) },
    { id: 'HD-1008', customer: 'Simran Kaur', title: 'Shared drive permission issue', description: 'Cannot access the marketing shared drive.', priority: 'urgent', status: 'in-progress', assignee: 'Unassigned', createdAt: hoursAgo(3), dueAt: hoursAgo(1) },
    { id: 'HD-1009', customer: 'Karan Bansal', title: 'New employee account setup', description: 'Create access for a new joiner starting tomorrow.', priority: 'normal', status: 'open', assignee: 'Arshad', createdAt: hoursAgo(2), dueAt: hoursFromNow(22) },
    { id: 'HD-1010', customer: 'Meera Shah', title: 'Wi-Fi disconnects frequently', description: 'The office Wi-Fi disconnects several times a day.', priority: 'urgent', status: 'open', assignee: 'Unassigned', createdAt: hoursAgo(2), dueAt: hoursFromNow(0.5) },
    { id: 'HD-1011', customer: 'Dev Malhotra', title: 'Request access to analytics dashboard', description: 'Need read-only access to the sales analytics dashboard.', priority: 'normal', status: 'open', assignee: 'Priya', createdAt: hoursAgo(1), dueAt: hoursFromNow(23) },
  ];
};

function loadTickets() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    state.tickets = Array.isArray(saved) ? saved : seedTickets();
  } catch {
    state.tickets = seedTickets();
  }
  saveTickets();
}

function saveTickets() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tickets));
}

function isOverdue(ticket) {
  return ticket.status !== 'resolved' && new Date(ticket.dueAt).getTime() < Date.now();
}

function priorityRank(priority) { return priority === 'urgent' ? 0 : 1; }

// Core business rule: unresolved overdue tickets first; then the earliest SLA deadline;
// then urgent before normal; finally oldest creation time for deterministic ordering.
function compareTickets(a, b) {
  const overdueDifference = Number(isOverdue(b)) - Number(isOverdue(a));
  if (overdueDifference !== 0) return overdueDifference;
  const dueDifference = new Date(a.dueAt) - new Date(b.dueAt);
  if (dueDifference !== 0) return dueDifference;
  const priorityDifference = priorityRank(a.priority) - priorityRank(b.priority);
  if (priorityDifference !== 0) return priorityDifference;
  return new Date(a.createdAt) - new Date(b.createdAt);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
}

function relativeDeadline(ticket) {
  const difference = new Date(ticket.dueAt).getTime() - Date.now();
  const absoluteHours = Math.abs(difference) / 3600000;
  if (difference < 0) {
    return `Overdue by ${absoluteHours >= 1 ? `${absoluteHours.toFixed(1)}h` : `${Math.round(absoluteHours * 60)}m`}`;
  }
  return `Due in ${absoluteHours >= 1 ? `${absoluteHours.toFixed(1)}h` : `${Math.round(absoluteHours * 60)}m`}`;
}

function getFilteredTickets() {
  const search = $('#searchInput').value.trim().toLowerCase();
  const status = $('#statusFilter').value;
  const view = $('#viewFilter').value;

  return state.tickets
    .filter((ticket) => {
      const haystack = `${ticket.id} ${ticket.customer} ${ticket.title} ${ticket.description}`.toLowerCase();
      const matchesSearch = !search || haystack.includes(search);
      const matchesStatus = status === 'all' || (status === 'active' ? ticket.status !== 'resolved' : ticket.status === status);
      const matchesView = view === 'all' ||
        (view === 'overdue' && isOverdue(ticket)) ||
        (view === 'mine' && ticket.assignee === CURRENT_USER) ||
        (view === 'unassigned' && ticket.assignee === 'Unassigned') ||
        (view === 'urgent' && ticket.priority === 'urgent');
      return matchesSearch && matchesStatus && matchesView;
    })
    .sort(compareTickets);
}

function renderStats() {
  const active = state.tickets.filter((ticket) => ticket.status !== 'resolved');
  $('#openCount').textContent = active.length;
  $('#overdueCount').textContent = active.filter(isOverdue).length;
  $('#urgentCount').textContent = active.filter((ticket) => ticket.priority === 'urgent').length;
  $('#mineCount').textContent = active.filter((ticket) => ticket.assignee === CURRENT_USER).length;
}

function renderQueue() {
  const tickets = getFilteredTickets();
  const totalPages = Math.max(1, Math.ceil(tickets.length / PAGE_SIZE));
  state.page = Math.min(state.page, totalPages);
  const start = (state.page - 1) * PAGE_SIZE;
  const visible = tickets.slice(start, start + PAGE_SIZE);

  $('#resultCount').textContent = `${tickets.length} ticket${tickets.length === 1 ? '' : 's'}`;
  $('#pageLabel').textContent = `Page ${state.page} of ${totalPages}`;
  $('#prevBtn').disabled = state.page === 1;
  $('#nextBtn').disabled = state.page === totalPages;

  const list = $('#ticketList');
  list.innerHTML = '';
  if (!visible.length) {
    list.innerHTML = '<div class="empty-state">No tickets match these filters.</div>';
    return;
  }

  visible.forEach((ticket) => {
    const overdue = isOverdue(ticket);
    const row = document.createElement('button');
    row.className = `ticket-row ${state.selectedId === ticket.id ? 'selected' : ''}`;
    row.type = 'button';
    row.innerHTML = `
      <div class="ticket-main">
        <div class="ticket-title"><span>${escapeHtml(ticket.title)}</span> <span class="ticket-id">${ticket.id}</span></div>
        <div class="ticket-subtitle">${escapeHtml(ticket.customer)} · ${escapeHtml(ticket.assignee)}</div>
        <div class="ticket-deadline ${overdue ? 'overdue-text' : ''}">${relativeDeadline(ticket)} · SLA deadline ${formatDate(ticket.dueAt)}</div>
      </div>
      <div class="ticket-meta">
        <span class="badge ${ticket.priority}">${ticket.priority}</span>
        ${overdue ? '<span class="badge overdue">Overdue</span>' : ''}
        <span class="badge ${ticket.status === 'resolved' ? 'resolved' : 'status'}">${ticket.status}</span>
      </div>`;
    row.addEventListener('click', () => { state.selectedId = ticket.id; render(); });
    list.appendChild(row);
  });
}

function renderDetails() {
  const ticket = state.tickets.find((item) => item.id === state.selectedId);
  const details = $('#ticketDetails');
  if (!ticket) {
    $('#detailsTitle').textContent = 'Ticket details';
    details.className = 'empty-state';
    details.textContent = 'No ticket selected.';
    return;
  }
  $('#detailsTitle').textContent = ticket.id;
  details.className = '';
  details.innerHTML = `
    <h3 class="detail-title">${escapeHtml(ticket.title)}</h3>
    <div class="ticket-subtitle">${escapeHtml(ticket.customer)}</div>
    <p class="detail-description">${escapeHtml(ticket.description || 'No description provided.')}</p>
    <div class="detail-grid">
      <div class="detail-item"><span>Priority</span><strong>${escapeHtml(ticket.priority)}</strong></div>
      <div class="detail-item"><span>Response deadline</span><strong>${formatDate(ticket.dueAt)}</strong></div>
      <div class="detail-item"><span>Created</span><strong>${formatDate(ticket.createdAt)}</strong></div>
      <div class="detail-item"><span>Queue state</span><strong>${isOverdue(ticket) ? 'Overdue' : 'Within SLA'}</strong></div>
    </div>
    <div class="detail-actions">
      <label>Assignee
        <select id="detailAssignee"><option>Unassigned</option><option>Priya</option><option>Arshad</option></select>
      </label>
      <label>Status
        <select id="detailStatus"><option value="open">Open</option><option value="in-progress">In progress</option><option value="resolved">Resolved</option></select>
      </label>
      <div class="action-row"><button id="saveTicketBtn" class="button button-primary">Save changes</button><button id="deleteTicketBtn" class="button button-secondary">Delete</button></div>
    </div>`;
  $('#detailAssignee').value = ticket.assignee;
  $('#detailStatus').value = ticket.status;
  $('#saveTicketBtn').addEventListener('click', () => {
    ticket.assignee = $('#detailAssignee').value;
    ticket.status = $('#detailStatus').value;
    saveTickets();
    render();
  });
  $('#deleteTicketBtn').addEventListener('click', () => {
    if (!confirm(`Delete ${ticket.id}?`)) return;
    state.tickets = state.tickets.filter((item) => item.id !== ticket.id);
    state.selectedId = null;
    saveTickets();
    render();
  });
}

function render() {
  renderStats();
  renderQueue();
  renderDetails();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function openDialog() {
  $('#ticketForm').reset();
  $('#ticketDialog').showModal();
}

function closeDialog() { $('#ticketDialog').close(); }

$('#newTicketBtn').addEventListener('click', openDialog);
$('#closeDialogBtn').addEventListener('click', closeDialog);
$('#cancelDialogBtn').addEventListener('click', closeDialog);
$('#ticketDialog').addEventListener('click', (event) => { if (event.target === $('#ticketDialog')) closeDialog(); });
$('#ticketForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const priority = form.get('priority');
  const createdAt = new Date();
  const dueAt = new Date(createdAt.getTime() + (priority === 'urgent' ? 2 : 24) * 3600000);
  const nextNumber = state.tickets.reduce((max, ticket) => Math.max(max, Number(ticket.id.split('-')[1]) || 1000), 1000) + 1;
  const ticket = {
    id: `HD-${nextNumber}`,
    customer: form.get('customer').trim(),
    title: form.get('title').trim(),
    description: form.get('description').trim(),
    priority,
    status: 'open',
    assignee: form.get('assignee'),
    createdAt: createdAt.toISOString(),
    dueAt: dueAt.toISOString(),
  };
  state.tickets.push(ticket);
  state.selectedId = ticket.id;
  state.page = 1;
  saveTickets();
  closeDialog();
  render();
});

['searchInput', 'statusFilter', 'viewFilter'].forEach((id) => {
  $(`#${id}`).addEventListener('input', () => { state.page = 1; renderQueue(); });
  $(`#${id}`).addEventListener('change', () => { state.page = 1; renderQueue(); });
});
$('#prevBtn').addEventListener('click', () => { state.page -= 1; renderQueue(); });
$('#nextBtn').addEventListener('click', () => { state.page += 1; renderQueue(); });
$('#seedBtn').addEventListener('click', () => {
  if (!confirm('Reset all tickets to the demo dataset?')) return;
  state.tickets = seedTickets();
  state.selectedId = null;
  state.page = 1;
  saveTickets();
  render();
});

loadTickets();
state.selectedId = state.tickets[0]?.id || null;
render();
setInterval(() => { renderStats(); renderQueue(); }, 30000);

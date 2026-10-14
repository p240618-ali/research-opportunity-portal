// ============================================
// Research Opportunity Portal - Frontend Logic
// ============================================

const API_URL = 'http://localhost:5000/api/opportunities';

// ---------- DOM refs ----------
const listContainer   = document.getElementById('opportunitiesList');
const formModal       = document.getElementById('formModal');
const detailModal     = document.getElementById('detailModal');
const form            = document.getElementById('opportunityForm');
const formTitle       = document.getElementById('formTitle');
const detailContent   = document.getElementById('detailContent');
const toast           = document.getElementById('toast');
const searchInput     = document.getElementById('searchInput');
const pageTitle       = document.getElementById('pageTitle');
const pageSubtitle    = document.getElementById('pageSubtitle');

let allOpportunities = [];
let currentView = 'dashboard';
let searchTerm = '';

// ---------- Toast ----------
let toastTimer;
function showToast(message, type = 'success') {
    const icon = type === 'success' ? '✓' : '✕';
    toast.className = `toast ${type}`;
    toast.querySelector('.toast-icon').textContent = icon;
    toast.querySelector('.toast-message').textContent = message;
    toast.classList.remove('hidden');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.add('hidden'), 3500);
}

// ---------- API ----------
async function apiRequest(url, options = {}) {
    const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
    return data;
}

// ---------- Load ----------
async function loadOpportunities() {
    listContainer.innerHTML = '<p class="empty">Loading...</p>';
    try {
        const { data } = await apiRequest(API_URL);
        allOpportunities = data;
        updateStats();
        renderOpportunities();
    } catch (err) {
        listContainer.innerHTML = '<p class="empty">⚠ Could not load data. Is the backend running?</p>';
        showToast(err.message, 'error');
    }
}

// ---------- Stats ----------
function updateStats() {
    const total = allOpportunities.length;
    const open = allOpportunities.filter(o => o.status === 'Open').length;
    const closed = allOpportunities.filter(o => o.status === 'Closed').length;
    const positions = allOpportunities.reduce((s, o) => s + (parseInt(o.available_positions) || 0), 0);

    animateNumber('statTotal', total);
    animateNumber('statOpen', open);
    animateNumber('statClosed', closed);
    animateNumber('statPositions', positions);
}

function animateNumber(id, target) {
    const el = document.getElementById(id);
    const start = parseInt(el.textContent) || 0;
    const duration = 400;
    const startTime = performance.now();
    function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        el.textContent = Math.floor(start + (target - start) * progress);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
    }
    requestAnimationFrame(step);
}

// ---------- Render ----------
function renderOpportunities() {
    let list = [...allOpportunities];

    if (currentView === 'open')   list = list.filter(o => o.status === 'Open');
    if (currentView === 'closed') list = list.filter(o => o.status === 'Closed');

    if (searchTerm) {
        const t = searchTerm.toLowerCase();
        list = list.filter(o =>
            (o.title || '').toLowerCase().includes(t) ||
            (o.research_area || '').toLowerCase().includes(t) ||
            (o.description || '').toLowerCase().includes(t) ||
            (o.faculty_name || '').toLowerCase().includes(t) ||
            (o.department || '').toLowerCase().includes(t)
        );
    }

    if (!list.length) {
        listContainer.innerHTML = `<p class="empty">📭 No opportunities found${searchTerm ? ` for "${escapeHtml(searchTerm)}"` : ''}.</p>`;
        return;
    }

    listContainer.innerHTML = list.map(opp => `
        <div class="opp-card">
            <div class="opp-card-header">
                <h3>${escapeHtml(opp.title)}</h3>
                <span class="badge ${opp.status.toLowerCase()}">
                    ${opp.status === 'Open' ? '🟢' : '🔴'} ${opp.status}
                </span>
            </div>
            <span class="opp-area">${escapeHtml(opp.research_area)}</span>
            <p class="opp-desc">${escapeHtml(opp.description)}</p>
            <div class="opp-meta">
                <span>👤 ${escapeHtml(opp.faculty_name)}</span>
                <span>🏛 ${escapeHtml(opp.department)}</span>
                <span>👥 ${opp.available_positions} position${opp.available_positions > 1 ? 's' : ''}</span>
                <span>📅 ${opp.application_deadline ? formatDate(opp.application_deadline) : 'No deadline'}</span>
            </div>
            <div class="opp-actions">
                <button class="btn btn-ghost btn-sm" onclick="viewDetails(${opp.id})">👁 View</button>
                <button class="btn btn-ghost btn-sm" onclick="editOpportunity(${opp.id})">✏ Edit</button>
                ${opp.status === 'Open'
                    ? `<button class="btn btn-success btn-sm" onclick="closeOpportunity(${opp.id})">🔒 Close</button>`
                    : ''}
                <button class="btn btn-danger btn-sm" onclick="deleteOpportunity(${opp.id})">🗑 Delete</button>
            </div>
        </div>
    `).join('');
}

function formatDate(d) {
    try {
        return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch { return d; }
}

// ---------- Details ----------
async function viewDetails(id) {
    try {
        const { data } = await apiRequest(`${API_URL}/${id}`);
        detailContent.innerHTML = `
            <dl class="detail-grid">
                <dt>ID</dt><dd>#${data.id}</dd>
                <dt>Title</dt><dd><strong>${escapeHtml(data.title)}</strong></dd>
                <dt>Description</dt><dd>${escapeHtml(data.description)}</dd>
                <dt>Research Area</dt><dd>${escapeHtml(data.research_area)}</dd>
                <dt>Faculty Member</dt><dd>${escapeHtml(data.faculty_name)}</dd>
                <dt>Department</dt><dd>${escapeHtml(data.department)}</dd>
                <dt>Required Skills</dt><dd>${escapeHtml(data.required_skills || '—')}</dd>
                <dt>Positions</dt><dd>${data.available_positions}</dd>
                <dt>Deadline</dt><dd>${data.application_deadline ? formatDate(data.application_deadline) : '—'}</dd>
                <dt>Status</dt><dd><span class="badge ${data.status.toLowerCase()}">${data.status}</span></dd>
                <dt>Created</dt><dd>${new Date(data.created_at).toLocaleString()}</dd>
            </dl>
        `;
        detailModal.classList.remove('hidden');
    } catch (err) {
        showToast(err.message, 'error');
    }
}

// ---------- Form (Create) ----------
document.getElementById('btnShowForm').addEventListener('click', () => {
    form.reset();
    document.getElementById('opportunityId').value = '';
    formTitle.textContent = 'Create New Opportunity';
    formModal.classList.remove('hidden');
});

// ---------- Form (Edit) ----------
async function editOpportunity(id) {
    try {
        const { data } = await apiRequest(`${API_URL}/${id}`);
        document.getElementById('opportunityId').value       = data.id;
        document.getElementById('title').value               = data.title;
        document.getElementById('description').value         = data.description;
        document.getElementById('research_area').value       = data.research_area;
        document.getElementById('faculty_name').value        = data.faculty_name;
        document.getElementById('department').value          = data.department;
        document.getElementById('required_skills').value     = data.required_skills || '';
        document.getElementById('available_positions').value = data.available_positions;
        document.getElementById('application_deadline').value = data.application_deadline ? data.application_deadline.split('T')[0] : '';
        document.getElementById('status').value              = data.status;
        formTitle.textContent = 'Update Opportunity';
        formModal.classList.remove('hidden');
    } catch (err) {
        showToast(err.message, 'error');
    }
}

// ---------- Close opportunity ----------
async function closeOpportunity(id) {
    if (!confirm('Mark this opportunity as Closed?')) return;
    try {
        await apiRequest(`${API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ status: 'Closed' })
        });
        showToast('Opportunity closed successfully', 'success');
        loadOpportunities();
    } catch (err) {
        showToast(err.message, 'error');
    }
}

// ---------- Delete ----------
async function deleteOpportunity(id) {
    if (!confirm('Are you sure you want to delete this opportunity?')) return;
    try {
        await apiRequest(`${API_URL}/${id}`, { method: 'DELETE' });
        showToast('Opportunity deleted successfully', 'success');
        loadOpportunities();
    } catch (err) {
        showToast(err.message, 'error');
    }
}

// ---------- Submit form ----------
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('opportunityId').value;
    const payload = {
        title:                document.getElementById('title').value.trim(),
        description:          document.getElementById('description').value.trim(),
        research_area:        document.getElementById('research_area').value.trim(),
        faculty_name:         document.getElementById('faculty_name').value.trim(),
        department:           document.getElementById('department').value.trim(),
        required_skills:      document.getElementById('required_skills').value.trim(),
        available_positions:  parseInt(document.getElementById('available_positions').value) || 1,
        application_deadline: document.getElementById('application_deadline').value || null,
        status:               document.getElementById('status').value
    };

    // Client-side validation
    const missing = [];
    if (!payload.title)         missing.push('Title');
    if (!payload.description)   missing.push('Description');
    if (!payload.research_area) missing.push('Research Area');
    if (!payload.faculty_name)  missing.push('Faculty Name');
    if (!payload.department)    missing.push('Department');

    if (missing.length) {
        showToast(`Required: ${missing.join(', ')}`, 'error');
        return;
    }

    try {
        if (id) {
            await apiRequest(`${API_URL}/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
            showToast('Opportunity updated successfully', 'success');
        } else {
            await apiRequest(API_URL, { method: 'POST', body: JSON.stringify(payload) });
            showToast('Opportunity created successfully', 'success');
        }
        formModal.classList.add('hidden');
        form.reset();
        loadOpportunities();
    } catch (err) {
        showToast(err.message, 'error');
    }
});

// ---------- Modal controls ----------
document.getElementById('closeFormModal').addEventListener('click', () => formModal.classList.add('hidden'));
document.getElementById('btnCancel').addEventListener('click', () => formModal.classList.add('hidden'));
document.getElementById('closeDetailModal').addEventListener('click', () => detailModal.classList.add('hidden'));

window.addEventListener('click', (e) => {
    if (e.target === formModal) formModal.classList.add('hidden');
    if (e.target === detailModal) detailModal.classList.add('hidden');
});

// ---------- Refresh ----------
document.getElementById('btnRefresh').addEventListener('click', loadOpportunities);

// ---------- Sidebar navigation ----------
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        currentView = item.dataset.view;

        const titles = {
            dashboard: ['Dashboard', 'Manage research opportunities in one place'],
            all:       ['All Opportunities', 'View every research opportunity'],
            open:      ['Open Opportunities', 'Currently accepting applications'],
            closed:    ['Closed Opportunities', 'No longer accepting applications']
        };
        [pageTitle.textContent, pageSubtitle.textContent] = titles[currentView];
        renderOpportunities();
    });
});

// ---------- Search ----------
searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value.trim();
    renderOpportunities();
});

// ---------- Theme toggle ----------
const btnTheme = document.getElementById('btnTheme');
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    btnTheme.querySelector('.theme-icon').textContent = '☀️';
}
btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    btnTheme.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ---------- Utils ----------
function escapeHtml(str) {
    if (str == null) return '';
    return String(str).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
}

// Expose for inline onclick
window.viewDetails = viewDetails;
window.editOpportunity = editOpportunity;
window.closeOpportunity = closeOpportunity;
window.deleteOpportunity = deleteOpportunity;

// ---------- Init ----------
loadOpportunities();
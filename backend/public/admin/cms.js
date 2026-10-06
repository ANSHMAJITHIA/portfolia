const API_BASE = '/api/v1';
let currentToken = localStorage.getItem('portfolio_admin_token') || null;
let currentTab = 'overview';

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  if (currentToken) {
    verifySession();
  } else {
    showLogin();
  }
});

// Toast notification helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  
  const bgColors = {
    success: 'bg-emerald-950 border-emerald-500/50 text-emerald-200',
    error: 'bg-rose-950 border-rose-500/50 text-rose-200',
    info: 'bg-indigo-950 border-indigo-500/50 text-indigo-200'
  };

  const icons = {
    success: 'fa-circle-check',
    error: 'fa-triangle-exclamation',
    info: 'fa-circle-info'
  };

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl border text-xs shadow-xl transition-all duration-300 transform translate-y-2 opacity-0 pointer-events-auto ${bgColors[type] || bgColors.info}`;
  toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i> <span>${message}</span>`;
  
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Session check
async function verifySession() {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { 'Authorization': `Bearer ${currentToken}` }
    });
    const data = await res.json();
    if (res.ok && data.success) {
      document.getElementById('user-display-name').innerText = data.user.username;
      showDashboard();
      loadAllData();
    } else {
      handleLogout();
    }
  } catch (err) {
    console.error('Session verify error:', err);
    handleLogout();
  }
}

// Login
async function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const btn = document.getElementById('login-btn');

  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...`;

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (res.ok && data.success) {
      currentToken = data.token;
      localStorage.setItem('portfolio_admin_token', currentToken);
      showToast('Signed in successfully', 'success');
      verifySession();
    } else {
      showToast(data.message || 'Authentication failed', 'error');
    }
  } catch (err) {
    showToast('Failed to connect to backend server', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<span>Sign In to Dashboard</span> <i class="fa-solid fa-arrow-right text-xs"></i>`;
  }
}

function handleLogout() {
  currentToken = null;
  localStorage.removeItem('portfolio_admin_token');
  showLogin();
  showToast('Logged out of CMS', 'info');
}

function showLogin() {
  document.getElementById('login-view').classList.remove('hidden');
  document.getElementById('dashboard-view').classList.add('hidden');
}

function showDashboard() {
  document.getElementById('login-view').classList.add('hidden');
  document.getElementById('dashboard-view').classList.remove('hidden');
}

// Navigation Tabs
function switchTab(tab) {
  currentTab = tab;
  
  // Update nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.className = 'nav-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition text-slate-400 hover:text-white hover:bg-slate-800/60';
  });

  const activeBtn = document.getElementById(`tab-btn-${tab}`);
  if (activeBtn) {
    if (tab === 'messages') {
      activeBtn.className = 'nav-btn w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition text-indigo-400 bg-indigo-600/10 border border-indigo-500/20';
    } else {
      activeBtn.className = 'nav-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition text-indigo-400 bg-indigo-600/10 border border-indigo-500/20';
    }
  }

  // Update section views
  document.querySelectorAll('.tab-section').forEach(sec => sec.classList.add('hidden'));
  const currentSec = document.getElementById(`section-${tab}`);
  if (currentSec) currentSec.classList.remove('hidden');

  // Title update
  const titles = {
    overview: 'Overview Dashboard',
    profile: 'Profile & Bio Management',
    skills: 'Technical Skills & Competencies',
    projects: 'Project Showcase Management',
    experience: 'Work & Educational Timeline',
    blog: 'Blog & Editorial Content',
    messages: 'Inquiries & Contact Inbox'
  };
  document.getElementById('current-section-title').innerText = titles[tab] || 'Dashboard';

  // Load specific data on tab switch
  if (tab === 'profile') loadProfile();
  if (tab === 'skills') loadSkills();
  if (tab === 'projects') loadProjects();
  if (tab === 'experience') loadExperience();
  if (tab === 'blog') loadBlog();
  if (tab === 'messages') loadMessages();
}

// Fetch headers helper
function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${currentToken}`
  };
}

// Load all initial data for overview
async function loadAllData() {
  loadProfile();
  loadSkills();
  loadProjects();
  loadExperience();
  loadBlog();
  loadMessages();
}

// ----------------------------------------------------
// Media Upload Helper
// ----------------------------------------------------
async function uploadMediaFile(inputElement, targetInputId) {
  const file = inputElement.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  showToast('Uploading asset...', 'info');

  try {
    const res = await fetch(`${API_BASE}/admin/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${currentToken}` },
      body: formData
    });
    const data = await res.json();
    if (res.ok && data.success) {
      document.getElementById(targetInputId).value = data.url;
      showToast('Media uploaded successfully!', 'success');
    } else {
      showToast(data.message || 'Upload failed', 'error');
    }
  } catch (err) {
    showToast('Failed to upload file', 'error');
  }
}

// ----------------------------------------------------
// 1. Profile
// ----------------------------------------------------
async function loadProfile() {
  try {
    const res = await fetch(`${API_BASE}/profile`);
    const data = await res.json();
    if (data.success && data.data) {
      const p = data.data;
      document.getElementById('prof-full_name').value = p.full_name || '';
      document.getElementById('prof-headline').value = p.headline || '';
      document.getElementById('prof-bio').value = p.bio || '';
      document.getElementById('prof-avatar_url').value = p.avatar_url || '';
      document.getElementById('prof-location').value = p.location || '';
      document.getElementById('prof-email').value = p.email || '';
      document.getElementById('prof-github_url').value = p.github_url || '';
      document.getElementById('prof-linkedin_url').value = p.linkedin_url || '';
    }
  } catch (err) {
    console.error('Profile load error:', err);
  }
}

async function saveProfile() {
  const updates = {
    full_name: document.getElementById('prof-full_name').value.trim(),
    headline: document.getElementById('prof-headline').value.trim(),
    bio: document.getElementById('prof-bio').value.trim(),
    avatar_url: document.getElementById('prof-avatar_url').value.trim(),
    location: document.getElementById('prof-location').value.trim(),
    email: document.getElementById('prof-email').value.trim(),
    github_url: document.getElementById('prof-github_url').value.trim(),
    linkedin_url: document.getElementById('prof-linkedin_url').value.trim(),
  };

  try {
    const res = await fetch(`${API_BASE}/admin/profile`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast('Profile updated successfully', 'success');
    } else {
      showToast(data.message || 'Failed to update profile', 'error');
    }
  } catch (err) {
    showToast('Server connection error', 'error');
  }
}

// ----------------------------------------------------
// 2. Skills
// ----------------------------------------------------
let allSkills = [];

async function loadSkills() {
  try {
    const res = await fetch(`${API_BASE}/skills`);
    const data = await res.json();
    if (data.success) {
      allSkills = data.data;
      document.getElementById('stat-skills').innerText = allSkills.length;
      renderSkills();
    }
  } catch (err) {
    console.error('Skills error:', err);
  }
}

function renderSkills() {
  const container = document.getElementById('skills-list');
  if (!allSkills.length) {
    container.innerHTML = `<div class="col-span-full py-8 text-center text-slate-500 text-xs">No skills registered yet. Click "Add New Skill" to create one.</div>`;
    return;
  }

  container.innerHTML = allSkills.map(skill => `
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between group hover:border-slate-700 transition">
      <div class="flex-1 pr-3">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-white text-sm">${skill.name}</span>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 border border-slate-700">${skill.category}</span>
        </div>
        <div class="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
          <div class="bg-indigo-500 h-full rounded-full" style="width: ${skill.proficiency}%"></div>
        </div>
        <div class="text-[11px] text-slate-400 mt-1">${skill.proficiency}% proficiency</div>
      </div>
      <div class="flex items-center gap-1 opacity-80 group-hover:opacity-100">
        <button onclick="editSkill('${skill.id}')" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"><i class="fa-solid fa-pen text-xs"></i></button>
        <button onclick="deleteSkill('${skill.id}')" class="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition"><i class="fa-solid fa-trash text-xs"></i></button>
      </div>
    </div>
  `).join('');
}

function openSkillModal(skill = null) {
  document.getElementById('skill-id').value = skill ? skill.id : '';
  document.getElementById('skill-name').value = skill ? skill.name : '';
  document.getElementById('skill-category').value = skill ? skill.category : 'Frontend';
  document.getElementById('skill-proficiency').value = skill ? skill.proficiency : 85;
  document.getElementById('skill-proficiency-val').innerText = skill ? skill.proficiency : 85;
  document.getElementById('modal-skill-title').innerText = skill ? 'Edit Skill' : 'Add New Skill';
  document.getElementById('modal-skill').classList.remove('hidden');
}

function editSkill(id) {
  const skill = allSkills.find(s => String(s.id) === String(id));
  if (skill) openSkillModal(skill);
}

async function handleSkillSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('skill-id').value;
  const payload = {
    name: document.getElementById('skill-name').value.trim(),
    category: document.getElementById('skill-category').value,
    proficiency: Number(document.getElementById('skill-proficiency').value)
  };

  const url = id ? `${API_BASE}/admin/skills/${id}` : `${API_BASE}/admin/skills`;
  const method = id ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: authHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(data.message, 'success');
      closeModal('modal-skill');
      loadSkills();
    } else {
      showToast(data.message || 'Action failed', 'error');
    }
  } catch (err) {
    showToast('Failed to save skill', 'error');
  }
}

async function deleteSkill(id) {
  if (!confirm('Are you sure you want to delete this skill?')) return;
  try {
    const res = await fetch(`${API_BASE}/admin/skills/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast('Skill deleted', 'success');
      loadSkills();
    } else {
      showToast(data.message, 'error');
    }
  } catch (err) {
    showToast('Failed to delete skill', 'error');
  }
}

// ----------------------------------------------------
// 3. Projects
// ----------------------------------------------------
let allProjects = [];

async function loadProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    const data = await res.json();
    if (data.success) {
      allProjects = data.data;
      document.getElementById('stat-projects').innerText = allProjects.length;
      renderProjects();
    }
  } catch (err) {
    console.error('Projects load error:', err);
  }
}

function renderProjects() {
  const container = document.getElementById('projects-list');
  if (!allProjects.length) {
    container.innerHTML = `<div class="col-span-full py-8 text-center text-slate-500 text-xs">No projects found. Click "Add Project" to showcase work.</div>`;
    return;
  }

  container.innerHTML = allProjects.map(p => `
    <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col group hover:border-slate-700 transition">
      <div class="h-44 bg-slate-950 relative overflow-hidden">
        ${p.image_url ? `<img src="${p.image_url}" alt="${p.title}" class="w-full h-full object-cover">` : `<div class="w-full h-full flex items-center justify-center text-slate-700"><i class="fa-solid fa-image text-3xl"></i></div>`}
        ${p.featured ? `<span class="absolute top-3 left-3 bg-indigo-600/90 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">Featured</span>` : ''}
      </div>
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h4 class="font-bold text-white text-base mb-1">${p.title}</h4>
          <p class="text-xs text-slate-400 line-clamp-2 mb-3">${p.summary || p.description || ''}</p>
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${(p.technologies || []).map(t => `<span class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">${t}</span>`).join('')}
          </div>
        </div>
        <div class="flex items-center justify-between pt-3 border-t border-slate-800/80">
          <div class="flex gap-2">
            ${p.live_url && p.live_url !== '#' ? `<a href="${p.live_url}" target="_blank" class="text-slate-400 hover:text-indigo-400 text-xs"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a>` : ''}
            ${p.github_url && p.github_url !== '#' ? `<a href="${p.github_url}" target="_blank" class="text-slate-400 hover:text-white text-xs"><i class="fa-brands fa-github"></i> Code</a>` : ''}
          </div>
          <div class="flex gap-1">
            <button onclick="editProject('${p.id}')" class="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800"><i class="fa-solid fa-pen text-xs"></i></button>
            <button onclick="deleteProject('${p.id}')" class="p-1.5 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800"><i class="fa-solid fa-trash text-xs"></i></button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function openProjectModal(p = null) {
  document.getElementById('project-id').value = p ? p.id : '';
  document.getElementById('project-title').value = p ? p.title : '';
  document.getElementById('project-slug').value = p ? p.slug : '';
  document.getElementById('project-summary').value = p ? p.summary : '';
  document.getElementById('project-description').value = p ? p.description : '';
  document.getElementById('project-image_url').value = p ? p.image_url : '';
  document.getElementById('project-technologies').value = p && p.technologies ? p.technologies.join(', ') : '';
  document.getElementById('project-live_url').value = p ? p.live_url : '';
  document.getElementById('project-github_url').value = p ? p.github_url : '';
  document.getElementById('project-featured').checked = p ? Boolean(p.featured) : false;
  document.getElementById('modal-project-title').innerText = p ? 'Edit Project' : 'Add Project';
  document.getElementById('modal-project').classList.remove('hidden');
}

function editProject(id) {
  const p = allProjects.find(item => String(item.id) === String(id));
  if (p) openProjectModal(p);
}

async function handleProjectSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('project-id').value;
  const payload = {
    title: document.getElementById('project-title').value.trim(),
    slug: document.getElementById('project-slug').value.trim(),
    summary: document.getElementById('project-summary').value.trim(),
    description: document.getElementById('project-description').value.trim(),
    image_url: document.getElementById('project-image_url').value.trim(),
    technologies: document.getElementById('project-technologies').value.split(',').map(s => s.trim()).filter(Boolean),
    live_url: document.getElementById('project-live_url').value.trim(),
    github_url: document.getElementById('project-github_url').value.trim(),
    featured: document.getElementById('project-featured').checked
  };

  const url = id ? `${API_BASE}/admin/projects/${id}` : `${API_BASE}/admin/projects`;
  const method = id ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: authHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(data.message, 'success');
      closeModal('modal-project');
      loadProjects();
    } else {
      showToast(data.message || 'Action failed', 'error');
    }
  } catch (err) {
    showToast('Failed to save project', 'error');
  }
}

async function deleteProject(id) {
  if (!confirm('Are you sure you want to delete this project?')) return;
  try {
    const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast('Project deleted', 'success');
      loadProjects();
    }
  } catch (err) {
    showToast('Failed to delete project', 'error');
  }
}

// ----------------------------------------------------
// 4. Experience & Education
// ----------------------------------------------------
let allExp = [];

async function loadExperience() {
  try {
    const res = await fetch(`${API_BASE}/experiences`);
    const data = await res.json();
    if (data.success) {
      allExp = data.data;
      renderExperience();
    }
  } catch (err) {
    console.error('Experience load error:', err);
  }
}

function renderExperience() {
  const container = document.getElementById('experience-list');
  if (!allExp.length) {
    container.innerHTML = `<div class="py-8 text-center text-slate-500 text-xs">No career or education milestones recorded yet.</div>`;
    return;
  }

  container.innerHTML = allExp.map(exp => `
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-start justify-between group hover:border-slate-700 transition">
      <div class="flex items-start gap-4">
        <div class="w-10 h-10 rounded-xl ${exp.type === 'work' ? 'bg-indigo-600/10 text-indigo-400' : 'bg-emerald-600/10 text-emerald-400'} flex items-center justify-center flex-shrink-0">
          <i class="fa-solid ${exp.type === 'work' ? 'fa-briefcase' : 'fa-graduation-cap'}"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-white text-sm">${exp.title}</h4>
            <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">${exp.type}</span>
          </div>
          <div class="text-xs text-indigo-400 font-medium">${exp.organization} • <span class="text-slate-400">${exp.location || 'Remote'}</span></div>
          <div class="text-[11px] text-slate-500 mt-1">${exp.start_date} — ${exp.end_date || (exp.is_current ? 'Present' : '')}</div>
          ${exp.description ? `<p class="text-xs text-slate-400 mt-2 leading-relaxed">${exp.description}</p>` : ''}
        </div>
      </div>
      <div class="flex items-center gap-1 opacity-80 group-hover:opacity-100 flex-shrink-0">
        <button onclick="editExp('${exp.id}')" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"><i class="fa-solid fa-pen text-xs"></i></button>
        <button onclick="deleteExp('${exp.id}')" class="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800"><i class="fa-solid fa-trash text-xs"></i></button>
      </div>
    </div>
  `).join('');
}

function openExpModal(exp = null) {
  document.getElementById('exp-id').value = exp ? exp.id : '';
  document.getElementById('exp-type').value = exp ? exp.type : 'work';
  document.getElementById('exp-title').value = exp ? exp.title : '';
  document.getElementById('exp-organization').value = exp ? exp.organization : '';
  document.getElementById('exp-location').value = exp ? exp.location : '';
  document.getElementById('exp-start_date').value = exp ? exp.start_date : '';
  document.getElementById('exp-end_date').value = exp ? exp.end_date : '';
  document.getElementById('exp-is_current').checked = exp ? Boolean(exp.is_current) : false;
  document.getElementById('exp-description').value = exp ? exp.description : '';
  document.getElementById('modal-exp-title').innerText = exp ? 'Edit Milestone' : 'Add Experience';
  document.getElementById('modal-experience').classList.remove('hidden');
}

function editExp(id) {
  const exp = allExp.find(item => String(item.id) === String(id));
  if (exp) openExpModal(exp);
}

async function handleExpSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('exp-id').value;
  const payload = {
    type: document.getElementById('exp-type').value,
    title: document.getElementById('exp-title').value.trim(),
    organization: document.getElementById('exp-organization').value.trim(),
    location: document.getElementById('exp-location').value.trim(),
    start_date: document.getElementById('exp-start_date').value.trim(),
    end_date: document.getElementById('exp-end_date').value.trim(),
    is_current: document.getElementById('exp-is_current').checked,
    description: document.getElementById('exp-description').value.trim()
  };

  const url = id ? `${API_BASE}/admin/experiences/${id}` : `${API_BASE}/admin/experiences`;
  const method = id ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: authHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(data.message, 'success');
      closeModal('modal-experience');
      loadExperience();
    }
  } catch (err) {
    showToast('Failed to save experience', 'error');
  }
}

async function deleteExp(id) {
  if (!confirm('Are you sure you want to delete this record?')) return;
  try {
    const res = await fetch(`${API_BASE}/admin/experiences/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast('Record deleted', 'success');
      loadExperience();
    }
  } catch (err) {
    showToast('Failed to delete experience', 'error');
  }
}

// ----------------------------------------------------
// 5. Blog
// ----------------------------------------------------
let allPosts = [];

async function loadBlog() {
  try {
    const res = await fetch(`${API_BASE}/admin/blog`, {
      headers: authHeaders()
    });
    const data = await res.json();
    if (data.success) {
      allPosts = data.data;
      document.getElementById('stat-posts').innerText = allPosts.filter(p => p.status === 'published').length;
      renderBlog();
    }
  } catch (err) {
    console.error('Blog load error:', err);
  }
}

function renderBlog() {
  const container = document.getElementById('blog-list');
  if (!allPosts.length) {
    container.innerHTML = `<div class="py-8 text-center text-slate-500 text-xs">No blog posts found. Click "New Article" to write one.</div>`;
    return;
  }

  container.innerHTML = allPosts.map(p => `
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between group hover:border-slate-700 transition">
      <div class="flex-1 pr-4">
        <div class="flex items-center gap-3">
          <span class="font-bold text-white text-sm">${p.title}</span>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'}">
            ${p.status}
          </span>
        </div>
        <p class="text-xs text-slate-400 mt-1 line-clamp-1">${p.excerpt || ''}</p>
        <div class="flex items-center gap-3 text-[11px] text-slate-500 mt-2">
          <span><i class="fa-regular fa-clock"></i> ${new Date(p.created_at).toLocaleDateString()}</span>
          <span>${(p.tags || []).join(', ')}</span>
        </div>
      </div>
      <div class="flex items-center gap-1 opacity-80 group-hover:opacity-100">
        <button onclick="editPost('${p.id}')" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"><i class="fa-solid fa-pen text-xs"></i></button>
        <button onclick="deletePost('${p.id}')" class="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800"><i class="fa-solid fa-trash text-xs"></i></button>
      </div>
    </div>
  `).join('');
}

function openPostModal(p = null) {
  document.getElementById('post-id').value = p ? p.id : '';
  document.getElementById('post-title').value = p ? p.title : '';
  document.getElementById('post-status').value = p ? p.status : 'published';
  document.getElementById('post-excerpt').value = p ? p.excerpt : '';
  document.getElementById('post-cover_image').value = p ? p.cover_image : '';
  document.getElementById('post-tags').value = p && p.tags ? p.tags.join(', ') : '';
  document.getElementById('post-content').value = p ? p.content : '';
  document.getElementById('modal-post-title').innerText = p ? 'Edit Article' : 'New Article';
  document.getElementById('modal-post').classList.remove('hidden');
}

function editPost(id) {
  const p = allPosts.find(item => String(item.id) === String(id));
  if (p) openPostModal(p);
}

async function handlePostSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('post-id').value;
  const payload = {
    title: document.getElementById('post-title').value.trim(),
    status: document.getElementById('post-status').value,
    excerpt: document.getElementById('post-excerpt').value.trim(),
    cover_image: document.getElementById('post-cover_image').value.trim(),
    tags: document.getElementById('post-tags').value.split(',').map(s => s.trim()).filter(Boolean),
    content: document.getElementById('post-content').value
  };

  const url = id ? `${API_BASE}/admin/blog/${id}` : `${API_BASE}/admin/blog`;
  const method = id ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: authHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(data.message, 'success');
      closeModal('modal-post');
      loadBlog();
    }
  } catch (err) {
    showToast('Failed to save article', 'error');
  }
}

async function deletePost(id) {
  if (!confirm('Are you sure you want to delete this blog post?')) return;
  try {
    const res = await fetch(`${API_BASE}/admin/blog/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast('Article deleted', 'success');
      loadBlog();
    }
  } catch (err) {
    showToast('Failed to delete post', 'error');
  }
}

// ----------------------------------------------------
// 6. Contact Inquiries
// ----------------------------------------------------
let allMessages = [];

async function loadMessages() {
  try {
    const res = await fetch(`${API_BASE}/admin/messages`, {
      headers: authHeaders()
    });
    const data = await res.json();
    if (data.success) {
      allMessages = data.data;
      const unreadCount = data.unreadCount || 0;
      
      document.getElementById('stat-messages').innerText = allMessages.length;
      document.getElementById('stat-unread-desc').innerText = `${unreadCount} unread inquiry${unreadCount === 1 ? '' : 's'}`;

      const badge = document.getElementById('unread-badge');
      if (unreadCount > 0) {
        badge.innerText = unreadCount;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }

      renderMessages();
    }
  } catch (err) {
    console.error('Messages load error:', err);
  }
}

function renderMessages() {
  const container = document.getElementById('messages-list');
  if (!allMessages.length) {
    container.innerHTML = `<div class="py-12 text-center text-slate-500 text-xs bg-slate-900 border border-slate-800 rounded-xl">Your inbox is clear. New inquiries from the portfolio contact form will appear here.</div>`;
    return;
  }

  container.innerHTML = allMessages.map(msg => `
    <div class="p-4 rounded-xl border ${msg.is_read ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-900 border-indigo-500/30'} flex items-center justify-between group transition">
      <div class="flex items-start gap-3 flex-1 cursor-pointer" onclick="viewMessage('${msg.id}')">
        <div class="mt-1">
          <span class="w-2.5 h-2.5 rounded-full inline-block ${msg.is_read ? 'bg-slate-700' : 'bg-indigo-500 animate-pulse'}"></span>
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-3">
            <span class="font-bold text-white text-sm">${msg.name}</span>
            <span class="text-xs text-indigo-400">&lt;${msg.email}&gt;</span>
            <span class="text-[11px] text-slate-500 ml-auto mr-4">${new Date(msg.created_at).toLocaleString()}</span>
          </div>
          <div class="text-xs font-semibold text-slate-300 mt-0.5">${msg.subject}</div>
          <p class="text-xs text-slate-400 line-clamp-1 mt-0.5">${msg.message}</p>
        </div>
      </div>
      <div class="flex items-center gap-1 ml-4">
        <button onclick="toggleMessageRead('${msg.id}')" title="${msg.is_read ? 'Mark Unread' : 'Mark Read'}" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
          <i class="fa-regular ${msg.is_read ? 'fa-envelope' : 'fa-envelope-open'} text-xs"></i>
        </button>
        <button onclick="deleteMessage('${msg.id}')" title="Delete message" class="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800">
          <i class="fa-solid fa-trash text-xs"></i>
        </button>
      </div>
    </div>
  `).join('');
}

async function viewMessage(id) {
  const msg = allMessages.find(m => String(m.id) === String(id));
  if (!msg) return;

  document.getElementById('msg-sender').innerText = msg.name;
  document.getElementById('msg-email').innerText = msg.email;
  document.getElementById('msg-subject').innerText = msg.subject;
  document.getElementById('msg-body').innerText = msg.message;
  document.getElementById('modal-message').classList.remove('hidden');

  if (!msg.is_read) {
    await toggleMessageRead(id, false);
  }
}

async function toggleMessageRead(id, refresh = true) {
  try {
    await fetch(`${API_BASE}/admin/messages/${id}/read`, {
      method: 'PATCH',
      headers: authHeaders()
    });
    if (refresh) loadMessages();
  } catch (err) {
    console.error('Toggle read error:', err);
  }
}

async function deleteMessage(id) {
  if (!confirm('Delete this message permanently?')) return;
  try {
    const res = await fetch(`${API_BASE}/admin/messages/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast('Message removed', 'success');
      loadMessages();
    }
  } catch (err) {
    showToast('Failed to delete message', 'error');
  }
}

// ----------------------------------------------------
// Modal Helpers
// ----------------------------------------------------
function closeModal(modalId) {
  document.getElementById(modalId).classList.add('hidden');
}

// Resilient API client for Portfolio Frontend
const API_BASE = '/api/v1';

export async function getProfile() {
  try {
    const res = await fetch(`${API_BASE}/profile`);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('API error (profile), using fallback:', err);
    return {
      full_name: 'Ansh Majithia',
      headline: 'Full-Stack Developer & Software Architect',
      bio: 'Passionate software engineer crafting resilient web architectures, modern reactive user interfaces, and bespoke content management systems.',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      email: 'ansh@example.com',
      location: 'India',
      github_url: 'https://github.com',
      linkedin_url: 'https://linkedin.com',
      twitter_url: 'https://twitter.com'
    };
  }
}

export async function getSkills() {
  try {
    const res = await fetch(`${API_BASE}/skills`);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('API error (skills), using fallback:', err);
    return [
      { id: '1', name: 'React.js', category: 'Frontend', proficiency: 95 },
      { id: '2', name: 'Tailwind CSS', category: 'Frontend', proficiency: 95 },
      { id: '3', name: 'Node.js & Express', category: 'Backend', proficiency: 90 },
      { id: '4', name: 'PostgreSQL & SQLite', category: 'Database', proficiency: 85 }
    ];
  }
}

export async function getProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('API error (projects), using fallback:', err);
    return [];
  }
}

export async function getExperiences() {
  try {
    const res = await fetch(`${API_BASE}/experiences`);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('API error (experiences), using fallback:', err);
    return [];
  }
}

export async function getBlogPosts() {
  try {
    const res = await fetch(`${API_BASE}/blog`);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('API error (blog), using fallback:', err);
    return [];
  }
}

export async function submitContact(form) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to send message');
  return data;
}

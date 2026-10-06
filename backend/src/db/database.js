const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed data generator
function getInitialSeedData() {
  const salt = bcrypt.genSaltSync(10);
  const adminPasswordHash = bcrypt.hashSync(process.env.ADMIN_PASS || 'admin123', salt);

  return {
    users: [
      {
        id: 'usr_1',
        username: process.env.ADMIN_USER || 'admin',
        email: 'admin@portfolio.dev',
        password_hash: adminPasswordHash,
        created_at: new Date().toISOString()
      }
    ],
    profile: {
      id: 'prof_1',
      full_name: 'Ansh Majithia',
      headline: 'Full-Stack Developer & Software Architect',
      bio: 'Passionate software engineer crafting resilient web architectures, modern reactive user interfaces, and bespoke content management systems. Specializing in high-performance full-stack JavaScript, TypeScript, React, and Node.js ecosystems.',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      resume_url: '#',
      location: 'India',
      email: 'ansh@example.com',
      github_url: 'https://github.com',
      linkedin_url: 'https://linkedin.com',
      twitter_url: 'https://twitter.com',
      updated_at: new Date().toISOString()
    },
    skills: [
      { id: 'sk_1', name: 'React.js', category: 'Frontend', proficiency: 95, icon: 'code', order_index: 1 },
      { id: 'sk_2', name: 'Next.js', category: 'Frontend', proficiency: 90, icon: 'globe', order_index: 2 },
      { id: 'sk_3', name: 'Tailwind CSS', category: 'Frontend', proficiency: 95, icon: 'palette', order_index: 3 },
      { id: 'sk_4', name: 'JavaScript / TypeScript', category: 'Frontend', proficiency: 92, icon: 'cpu', order_index: 4 },
      { id: 'sk_5', name: 'Node.js & Express', category: 'Backend', proficiency: 90, icon: 'server', order_index: 5 },
      { id: 'sk_6', name: 'REST APIs & GraphQL', category: 'Backend', proficiency: 88, icon: 'zap', order_index: 6 },
      { id: 'sk_7', name: 'PostgreSQL & MongoDB', category: 'Database', proficiency: 85, icon: 'database', order_index: 7 },
      { id: 'sk_8', name: 'Git & GitHub Workflows', category: 'Tools', proficiency: 92, icon: 'git-branch', order_index: 8 },
      { id: 'sk_9', name: 'Docker & CI/CD', category: 'DevOps', proficiency: 78, icon: 'box', order_index: 9 }
    ],
    projects: [
      {
        id: 'proj_1',
        title: 'Custom-Coded Headless CMS & Portfolio Engine',
        slug: 'custom-coded-headless-cms',
        summary: 'A bespoke content management system and portfolio API built from scratch with Express.js and React.',
        description: 'Complete decoupling of administrative operations and presentation. Features JWT authentication, dynamic schema management, instant asset uploads, and fine-grained REST endpoints.',
        image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        technologies: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'JWT'],
        live_url: 'http://localhost:5173',
        github_url: 'https://github.com',
        featured: true,
        order_index: 1,
        created_at: new Date().toISOString()
      },
      {
        id: 'proj_2',
        title: 'CloudOps Infrastructure Monitoring Dashboard',
        slug: 'cloudops-monitoring-dashboard',
        summary: 'Real-time telemetry and server health monitoring tool with interactive charts and alerts.',
        description: 'Streamlined DevOps monitoring tool designed to track system latency, CPU saturation, and uptime anomalies with real-time websocket pushes.',
        image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'WebSockets'],
        live_url: '#',
        github_url: 'https://github.com',
        featured: true,
        order_index: 2,
        created_at: new Date().toISOString()
      },
      {
        id: 'proj_3',
        title: 'E-Commerce Platform with Cart & Payment Flow',
        slug: 'ecommerce-platform',
        summary: 'High-conversion online storefront with cart persistence, filtering, and checkout flows.',
        description: 'Full-featured commerce web application supporting product categorization, dynamic inventory calculation, and payment gateway simulation.',
        image_url: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
        technologies: ['React', 'Express', 'Node.js', 'Tailwind CSS'],
        live_url: '#',
        github_url: 'https://github.com',
        featured: false,
        order_index: 3,
        created_at: new Date().toISOString()
      }
    ],
    experiences: [
      {
        id: 'exp_1',
        type: 'education',
        title: 'B.Tech in Information Technology',
        organization: 'GCET',
        location: 'India',
        start_date: '2022',
        end_date: '2026',
        is_current: true,
        description: 'Bachelor of Technology in Information Technology (IT Branch). Focused on Data Structures & Algorithms, Full-Stack Web Development, Database Management Systems, and Software Engineering.',
        order_index: 1
      },
      {
        id: 'exp_2',
        type: 'work',
        title: 'Full-Stack Developer Intern',
        organization: 'Tech Innovations Lab',
        location: 'Remote',
        start_date: '2024',
        end_date: 'Present',
        is_current: true,
        description: 'Developing scalable web applications, RESTful APIs, and custom CMS workflows. Building high-performance reactive components using React, Node.js, and Express.',
        order_index: 2
      },
      {
        id: 'exp_3',
        type: 'work',
        title: 'Frontend Web Developer Intern',
        organization: 'Digital Solutions Studio',
        location: 'Remote',
        start_date: '2023',
        end_date: '2024',
        is_current: false,
        description: 'Created modern, accessible, and responsive web interfaces using React and Tailwind CSS. Translated UI/UX designs into fast, cross-browser web applications.',
        order_index: 3
      }
    ],
    posts: [
      {
        id: 'post_1',
        title: 'Why We Built Our Own Headless CMS Instead of Using Third-Party SaaS',
        slug: 'why-we-built-custom-headless-cms',
        excerpt: 'An architectural exploration of why custom-coded admin panels provide ultimate flexibility, zero vendor lock-in, and unmatched speed.',
        content: `Building your own CMS allows you to strictly model your domain logic without dealing with heavy abstraction layers.\n\n### The Core Advantages\n1. **Zero External Dependencies**: No monthly subscription fees or third-party uptime reliance.\n2. **Tailored UX**: Only the fields you need, arranged exactly how you work.\n3. **Tight Integration**: Instant deployment alongside your backend API.\n\nCustom CMS development is a superpower for portfolio builders and full-stack software engineers.`,
        cover_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        tags: ['Architecture', 'CMS', 'Node.js', 'React'],
        status: 'published',
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'post_2',
        title: 'Mastering Modern Full-Stack State Management',
        slug: 'mastering-full-stack-state-management',
        excerpt: 'Best practices for keeping frontend client state and backend REST representations synchronized cleanly.',
        content: `State management is the backbone of reactive applications. Learn how modern hooks, resilient caching, and clean REST conventions prevent UI synchronization bugs.\n\n### Key Strategies\n- Optimistic UI updates with rollback\n- Normalized cache keys\n- Handling network disconnection gracefully`,
        cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        tags: ['React', 'JavaScript', 'State Management'],
        status: 'published',
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ],
    messages: [
      {
        id: 'msg_1',
        name: 'Sarah Connor',
        email: 'sarah@cyberdyne.org',
        subject: 'Collaboration opportunity on upcoming Web3 portal',
        message: 'Hi Ansh, I reviewed your portfolio and was thoroughly impressed by your custom CMS architecture. Would love to discuss an advisory role with our engineering team.',
        is_read: false,
        created_at: new Date(Date.now() - 3600000 * 4).toISOString()
      }
    ]
  };
}

class Database {
  constructor() {
    this.init();
  }

  init() {
    if (!fs.existsSync(DB_FILE)) {
      console.log('[DB] Initializing new database file with seed data...');
      const seed = getInitialSeedData();
      this.write(seed);
    } else {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        JSON.parse(raw);
      } catch (err) {
        console.error('[DB] Corrupted db file, re-seeding...', err);
        const seed = getInitialSeedData();
        this.write(seed);
      }
    }
  }

  read() {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(raw);
    } catch (err) {
      console.error('[DB Read Error]', err);
      return getInitialSeedData();
    }
  }

  write(data) {
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tempFile, DB_FILE);
  }

  // Model Operations
  getCollection(name) {
    const data = this.read();
    return data[name] || [];
  }

  // Generic Find
  find(collectionName, predicate = () => true) {
    const items = this.getCollection(collectionName);
    return items.filter(predicate);
  }

  findOne(collectionName, predicate) {
    const items = this.getCollection(collectionName);
    return items.find(predicate) || null;
  }

  findById(collectionName, id) {
    return this.findOne(collectionName, item => String(item.id) === String(id));
  }

  // Generic Create
  create(collectionName, itemData) {
    const data = this.read();
    if (!data[collectionName]) {
      data[collectionName] = [];
    }
    const newItem = {
      id: itemData.id || `${collectionName.slice(0, 3)}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      ...itemData,
      created_at: itemData.created_at || new Date().toISOString()
    };
    data[collectionName].push(newItem);
    this.write(data);
    return newItem;
  }

  // Generic Update
  update(collectionName, id, updates) {
    const data = this.read();
    const items = data[collectionName] || [];
    const index = items.findIndex(item => String(item.id) === String(id));
    if (index === -1) return null;

    items[index] = {
      ...items[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    data[collectionName] = items;
    this.write(data);
    return items[index];
  }

  // Generic Delete
  delete(collectionName, id) {
    const data = this.read();
    const items = data[collectionName] || [];
    const index = items.findIndex(item => String(item.id) === String(id));
    if (index === -1) return false;

    items.splice(index, 1);
    data[collectionName] = items;
    this.write(data);
    return true;
  }

  // Profile Singleton Ops
  getProfile() {
    const data = this.read();
    return data.profile || {};
  }

  updateProfile(updates) {
    const data = this.read();
    data.profile = {
      ...data.profile,
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.write(data);
    return data.profile;
  }
}

module.exports = new Database();

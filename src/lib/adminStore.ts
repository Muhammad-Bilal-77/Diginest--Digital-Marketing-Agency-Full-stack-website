// Admin credentials (localStorage-based, NOT secure for production)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "nexusmedia2024";
const AUTH_KEY = "nexus_admin_auth";

export const adminAuth = {
  login: (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  },
  logout: () => localStorage.removeItem(AUTH_KEY),
  isLoggedIn: () => localStorage.getItem(AUTH_KEY) === "true",
};

// ─── Types ───
export interface AdminService {
  id: string;
  title: string;
  slug: string;
  desc: string;
  tagline: string;
  description: string;
  heroImage: string;
  icon: string;
  features: { title: string; desc: string }[];
  process: { step: string; desc: string }[];
  stats: { value: string; label: string }[];
  testimonial: { quote: string; name: string; role: string; rating: number };
  faqs: { q: string; a: string }[];
}

export interface AdminCreator {
  id: string;
  name: string;
  category: string;
  followers: string;
  price: string;
  color: string;
  image: string;
}

export interface AdminProject {
  id: string;
  title: string;
  cat: string;
  img: string;
  desc: string;
  client: string;
  duration: string;
  year: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  deliverables: string[];
  testimonial: { text: string; author: string; role: string };
}

// ─── Generic CRUD ───
function getItems<T>(key: string): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setItems<T>(key: string, items: T[]) {
  localStorage.setItem(key, JSON.stringify(items));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ─── Services ───
const SERVICES_KEY = "nexus_services";

export const servicesStore = {
  getAll: (): AdminService[] => getItems<AdminService>(SERVICES_KEY),
  add: (service: Omit<AdminService, "id">): AdminService => {
    const items = getItems<AdminService>(SERVICES_KEY);
    const newItem = { ...service, id: generateId() };
    items.push(newItem);
    setItems(SERVICES_KEY, items);
    return newItem;
  },
  update: (id: string, service: Partial<AdminService>) => {
    const items = getItems<AdminService>(SERVICES_KEY);
    const idx = items.findIndex((i) => i.id === id);
    if (idx !== -1) { items[idx] = { ...items[idx], ...service }; setItems(SERVICES_KEY, items); }
  },
  remove: (id: string) => {
    setItems(SERVICES_KEY, getItems<AdminService>(SERVICES_KEY).filter((i) => i.id !== id));
  },
};

// ─── Creators ───
const CREATORS_KEY = "nexus_creators";

export const creatorsStore = {
  getAll: (): AdminCreator[] => getItems<AdminCreator>(CREATORS_KEY),
  add: (creator: Omit<AdminCreator, "id">): AdminCreator => {
    const items = getItems<AdminCreator>(CREATORS_KEY);
    const newItem = { ...creator, id: generateId() };
    items.push(newItem);
    setItems(CREATORS_KEY, items);
    return newItem;
  },
  update: (id: string, creator: Partial<AdminCreator>) => {
    const items = getItems<AdminCreator>(CREATORS_KEY);
    const idx = items.findIndex((i) => i.id === id);
    if (idx !== -1) { items[idx] = { ...items[idx], ...creator }; setItems(CREATORS_KEY, items); }
  },
  remove: (id: string) => {
    setItems(CREATORS_KEY, getItems<AdminCreator>(CREATORS_KEY).filter((i) => i.id !== id));
  },
};

// ─── Projects ───
const PROJECTS_KEY = "nexus_projects";

export const projectsStore = {
  getAll: (): AdminProject[] => getItems<AdminProject>(PROJECTS_KEY),
  add: (project: Omit<AdminProject, "id">): AdminProject => {
    const items = getItems<AdminProject>(PROJECTS_KEY);
    const newItem = { ...project, id: generateId() };
    items.push(newItem);
    setItems(PROJECTS_KEY, items);
    return newItem;
  },
  update: (id: string, project: Partial<AdminProject>) => {
    const items = getItems<AdminProject>(PROJECTS_KEY);
    const idx = items.findIndex((i) => i.id === id);
    if (idx !== -1) { items[idx] = { ...items[idx], ...project }; setItems(PROJECTS_KEY, items); }
  },
  remove: (id: string) => {
    setItems(PROJECTS_KEY, getItems<AdminProject>(PROJECTS_KEY).filter((i) => i.id !== id));
  },
};

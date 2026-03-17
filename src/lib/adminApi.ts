export interface AdminService {
  _id: string;
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
  _id: string;
  name: string;
  category: string;
  followers: string;
  price: string;
  color: string;
  image?: string;
}

export interface AdminProject {
  _id: string;
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

export interface AdminSettings {
  _id?: string;
  email: string;
  phone: string;
  location: string;
  whatsappNumber: string;
  socials: { name: string; url: string; icon: string }[];
}

export interface AdminAbout {
  _id?: string;
  heroTitle: string;
  heroDescription: string;
  stats: { value: string; label: string }[];
  storyTitle: string;
  storyContent: string[];
  valuesTitle: string;
  values: { title: string; description: string }[];
  teamTitle: string;
  teamDescription: string;
}

const TOKEN_KEY = "nexus_admin_token";

function getApiBase() {
  return import.meta.env.VITE_API_BASE_URL || "/api";
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function getAuthHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getApiBase()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    let message = "Request failed";
    try {
      const body = await response.json();
      if (body?.message) {
        message = body.message;
      }
    } catch {
      // Ignore JSON parse failures
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const adminAuth = {
  async login(username: string, password: string) {
    const result = await request<{ token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    localStorage.setItem(TOKEN_KEY, result.token);
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  isLoggedIn() {
    return Boolean(getToken());
  },

  async verify() {
    await request<{ ok: boolean }>("/auth/me", {
      headers: getAuthHeaders(),
    });
  },
};

export const servicesApi = {
  list() {
    return request<AdminService[]>("/services");
  },
  create(payload: Omit<AdminService, "_id">) {
    return request<AdminService>("/services", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
  },
  update(id: string, payload: Omit<AdminService, "_id">) {
    return request<AdminService>(`/services/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
  },
  remove(id: string) {
    return request<void>(`/services/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
  },
};

export const creatorsApi = {
  list() {
    return request<AdminCreator[]>("/creators");
  },
  create(payload: Omit<AdminCreator, "_id">) {
    return request<AdminCreator>("/creators", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
  },
  update(id: string, payload: Omit<AdminCreator, "_id">) {
    return request<AdminCreator>(`/creators/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
  },
  remove(id: string) {
    return request<void>(`/creators/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
  },
};

export const projectsApi = {
  list() {
    return request<AdminProject[]>("/projects");
  },
  create(payload: Omit<AdminProject, "_id">) {
    return request<AdminProject>("/projects", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
  },
  update(id: string, payload: Omit<AdminProject, "_id">) {
    return request<AdminProject>(`/projects/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
  },
  remove(id: string) {
    return request<void>(`/projects/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
  },
};

export const settingsApi = {
  get() {
    return request<AdminSettings>("/settings");
  },
  update(payload: AdminSettings) {
    return request<AdminSettings>("/settings", {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
  },
};

export const aboutApi = {
  get() {
    return request<AdminAbout>("/about");
  },
  update(payload: AdminAbout) {
    return request<AdminAbout>("/about", {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
  },
};

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${getApiBase()}/upload/image`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
    },
    body: formData,
  });

  if (!response.ok) {
    let message = "Image upload failed";
    try {
      const body = await response.json();
      if (body?.message) {
        message = body.message;
      }
    } catch {
      // Ignore JSON parse failures
    }
    throw new Error(message);
  }

  const result = (await response.json()) as { url: string };
  return result.url;
}

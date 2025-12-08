const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Projects API
export const projectsApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_URL}/projects/${id}`);
    if (!response.ok) throw new Error('Failed to fetch project');
    return response.json();
  },

  create: async (project: {
    title: string;
    description: string;
    image: string;
    category: string;
  }) => {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
  },

  update: async (
    id: number,
    project: {
      title: string;
      description: string;
      image: string;
      category: string;
    }
  ) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error('Failed to update project');
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete project');
    return response.json();
  },
};

// Videos API
export const videosApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/videos`);
    if (!response.ok) throw new Error('Failed to fetch videos');
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_URL}/videos/${id}`);
    if (!response.ok) throw new Error('Failed to fetch video');
    return response.json();
  },

  create: async (video: {
    title: string;
    url: string;
    description: string;
  }) => {
    const response = await fetch(`${API_URL}/videos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(video),
    });
    if (!response.ok) throw new Error('Failed to create video');
    return response.json();
  },

  update: async (
    id: number,
    video: {
      title: string;
      url: string;
      description: string;
    }
  ) => {
    const response = await fetch(`${API_URL}/videos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(video),
    });
    if (!response.ok) throw new Error('Failed to update video');
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_URL}/videos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete video');
    return response.json();
  },
};

// Contacts API
export const contactsApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/contacts`);
    if (!response.ok) throw new Error('Failed to fetch contacts');
    return response.json();
  },

  create: async (contact: {
    name: string;
    email: string;
    message: string;
  }) => {
    const response = await fetch(`${API_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    if (!response.ok) throw new Error('Failed to submit contact form');
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete contact');
    return response.json();
  },
};

// Contact Info API
export const contactInfoApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/contact-info`);
    if (!response.ok) throw new Error('Failed to fetch contact info');
    return response.json();
  },

  getByType: async (type: 'phone' | 'email') => {
    const response = await fetch(`${API_URL}/contact-info/type/${type}`);
    if (!response.ok) throw new Error('Failed to fetch contact info');
    return response.json();
  },

  create: async (contactInfo: {
    type: 'phone' | 'email';
    value: string;
    label?: string;
    display_order?: number;
  }) => {
    const response = await fetch(`${API_URL}/contact-info`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactInfo),
    });
    if (!response.ok) throw new Error('Failed to create contact info');
    return response.json();
  },

  update: async (
    id: number,
    contactInfo: {
      type: 'phone' | 'email';
      value: string;
      label?: string;
      display_order?: number;
    }
  ) => {
    const response = await fetch(`${API_URL}/contact-info/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactInfo),
    });
    if (!response.ok) throw new Error('Failed to update contact info');
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_URL}/contact-info/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete contact info');
    return response.json();
  },
};

// Types
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  created_at: string;
}

export interface Video {
  id: number;
  title: string;
  url: string;
  description: string;
  created_at: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface ContactInfo {
  id: number;
  type: 'phone' | 'email';
  value: string;
  label: string | null;
  display_order: number;
  created_at: string;
}

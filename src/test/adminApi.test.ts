import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  servicesApi,
  creatorsApi,
  projectsApi,
  settingsApi,
  aboutApi,
  type AdminService,
  type AdminCreator,
  type AdminProject,
  type AdminSettings,
  type AdminAbout,
} from "@/lib/adminApi";

// Mock the fetch function
global.fetch = vi.fn();

const mockFetch = global.fetch as ReturnType<typeof vi.fn>;

describe("Admin API - CRUD Operations", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    localStorage.clear();
    localStorage.setItem("nexus_admin_token", "test-token");
  });

  describe("Services API", () => {
    it("should list all services", async () => {
      const mockServices: AdminService[] = [
        {
          _id: "1",
          title: "Web Design",
          slug: "web-design",
          desc: "Professional web design",
          tagline: "Modern designs",
          description: "Full description",
          heroImage: "image.jpg",
          icon: "Palette",
          features: [],
          process: [],
          stats: [],
          testimonial: { quote: "", name: "", role: "", rating: 5 },
          faqs: [],
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockServices),
      });

      const result = await servicesApi.list();
      expect(result).toEqual(mockServices);
      expect(result[0]._id).toBe("1");
    });

    it("should create a new service", async () => {
      const newService: Omit<AdminService, "_id"> = {
        title: "New Service",
        slug: "new-service",
        desc: "Description",
        tagline: "Tagline",
        description: "Full description",
        heroImage: "",
        icon: "Palette",
        features: [],
        process: [],
        stats: [],
        testimonial: { quote: "", name: "", role: "", rating: 5 },
        faqs: [],
      };

      const createdService: AdminService = {
        _id: "new-id",
        ...newService,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: () => Promise.resolve(createdService),
      });

      const result = await servicesApi.create(newService);
      expect(result._id).toBe("new-id");
      expect(result.title).toBe("New Service");
    });

    it("should update an existing service", async () => {
      const updatedService: AdminService = {
        _id: "1",
        title: "Updated Service",
        slug: "updated-service",
        desc: "Updated description",
        tagline: "Updated tagline",
        description: "Updated full description",
        heroImage: "updated.jpg",
        icon: "Palette",
        features: [],
        process: [],
        stats: [],
        testimonial: { quote: "", name: "", role: "", rating: 5 },
        faqs: [],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(updatedService),
      });

      const result = await servicesApi.update("1", updatedService);
      expect(result._id).toBe("1");
      expect(result.title).toBe("Updated Service");
    });

    it("should delete a service", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
        json: () => Promise.resolve(undefined),
      });

      const result = await servicesApi.remove("1");
      expect(result).toBeUndefined();
    });
  });

  describe("Creators API", () => {
    it("should list all creators", async () => {
      const mockCreators: AdminCreator[] = [
        {
          _id: "creator-1",
          name: "John Doe",
          category: "Tech Reviewer",
          followers: "2.4M",
          price: "$1,500",
          color: "from-blue-500 to-cyan-400",
          image: "creator.jpg",
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockCreators),
      });

      const result = await creatorsApi.list();
      expect(result).toEqual(mockCreators);
      expect(result[0]._id).toBe("creator-1");
    });

    it("should create a new creator", async () => {
      const newCreator: Omit<AdminCreator, "_id"> = {
        name: "Jane Smith",
        category: "Fashion",
        followers: "1.2M",
        price: "$2,000",
        color: "from-pink-500 to-rose-400",
        image: "jane.jpg",
      };

      const createdCreator: AdminCreator = {
        _id: "new-creator",
        ...newCreator,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: () => Promise.resolve(createdCreator),
      });

      const result = await creatorsApi.create(newCreator);
      expect(result._id).toBe("new-creator");
      expect(result.name).toBe("Jane Smith");
      expect(result.category).toBe("Fashion");
    });

    it("should update an existing creator", async () => {
      const updatedCreator: AdminCreator = {
        _id: "creator-1",
        name: "Updated John",
        category: "Updated Category",
        followers: "3.0M",
        price: "$2,500",
        color: "from-green-500 to-emerald-400",
        image: "updated-creator.jpg",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(updatedCreator),
      });

      const result = await creatorsApi.update("creator-1", updatedCreator);
      expect(result._id).toBe("creator-1");
      expect(result.name).toBe("Updated John");
      expect(result.followers).toBe("3.0M");
    });

    it("should delete a creator", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
        json: () => Promise.resolve(undefined),
      });

      const result = await creatorsApi.remove("creator-1");
      expect(result).toBeUndefined();
    });
  });

  describe("Projects API", () => {
    it("should list all projects", async () => {
      const mockProjects: AdminProject[] = [
        {
          _id: "project-1",
          title: "E-commerce Platform",
          cat: "Web Design",
          img: "project.jpg",
          desc: "Full e-commerce solution",
          client: "Tech Startup",
          duration: "12 weeks",
          year: "2024",
          challenge: "Complex requirements",
          solution: "Implemented modular architecture",
          results: [{ label: "Conversion Rate", value: "+180%" }],
          deliverables: ["Design files", "Code"],
          testimonial: { text: "Great work", author: "Client", role: "CEO" },
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockProjects),
      });

      const result = await projectsApi.list();
      expect(result).toEqual(mockProjects);
      expect(result[0]._id).toBe("project-1");
    });

    it("should create a new project", async () => {
      const newProject: Omit<AdminProject, "_id"> = {
        title: "New Project",
        cat: "Branding",
        img: "new-project.jpg",
        desc: "A great project",
        client: "New Client",
        duration: "8 weeks",
        year: "2024",
        challenge: "Brand identity",
        solution: "Created unique brand guidelines",
        results: [],
        deliverables: [],
        testimonial: { text: "", author: "", role: "" },
      };

      const createdProject: AdminProject = {
        _id: "new-project",
        ...newProject,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: () => Promise.resolve(createdProject),
      });

      const result = await projectsApi.create(newProject);
      expect(result._id).toBe("new-project");
      expect(result.title).toBe("New Project");
      expect(result.cat).toBe("Branding");
    });

    it("should update an existing project", async () => {
      const updatedProject: AdminProject = {
        _id: "project-1",
        title: "Updated E-commerce",
        cat: "Web Design",
        img: "updated-project.jpg",
        desc: "Updated description",
        client: "Updated Client",
        duration: "16 weeks",
        year: "2024",
        challenge: "More complex",
        solution: "Advanced features",
        results: [{ label: "ROI", value: "+250%" }],
        deliverables: ["All files"],
        testimonial: { text: "Excellent", author: "Updated Client", role: "Manager" },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(updatedProject),
      });

      const result = await projectsApi.update("project-1", updatedProject);
      expect(result._id).toBe("project-1");
      expect(result.title).toBe("Updated E-commerce");
      expect(result.duration).toBe("16 weeks");
    });

    it("should delete a project", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
        json: () => Promise.resolve(undefined),
      });

      const result = await projectsApi.remove("project-1");
      expect(result).toBeUndefined();
    });
  });

  describe("Settings API", () => {
    it("should get settings", async () => {
      const mockSettings: AdminSettings = {
        _id: "settings",
        email: "hello@example.com",
        phone: "+1234567890",
        location: "New York",
        whatsappNumber: "+1234567890",
        socials: [],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockSettings),
      });

      const result = await settingsApi.get();
      expect(result._id).toBe("settings");
      expect(result.email).toBe("hello@example.com");
    });

    it("should update settings", async () => {
      const updatedSettings: AdminSettings = {
        email: "updated@example.com",
        phone: "+9876543210",
        location: "Los Angeles",
        whatsappNumber: "+9876543210",
        socials: [{ name: "Twitter", url: "https://twitter.com", icon: "twitter" }],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(updatedSettings),
      });

      const result = await settingsApi.update(updatedSettings);
      expect(result.email).toBe("updated@example.com");
      expect(result.location).toBe("Los Angeles");
    });
  });

  describe("About API", () => {
    it("should get about page", async () => {
      const mockAbout: AdminAbout = {
        _id: "about",
        heroTitle: "About Us",
        heroDescription: "We are awesome",
        stats: [],
        storyTitle: "Our Story",
        storyContent: [],
        valuesTitle: "Our Values",
        values: [],
        teamTitle: "Meet the Team",
        teamDescription: "Great team",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockAbout),
      });

      const result = await aboutApi.get();
      expect(result._id).toBe("about");
      expect(result.heroTitle).toBe("About Us");
    });

    it("should update about page", async () => {
      const updatedAbout: AdminAbout = {
        heroTitle: "Updated About",
        heroDescription: "Even more awesome",
        stats: [{ value: "100+", label: "Projects" }],
        storyTitle: "Updated Story",
        storyContent: ["Content 1", "Content 2"],
        valuesTitle: "Updated Values",
        values: [{ title: "Value 1", description: "Description" }],
        teamTitle: "Updated Team",
        teamDescription: "Updated team description",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(updatedAbout),
      });

      const result = await aboutApi.update(updatedAbout);
      expect(result.heroTitle).toBe("Updated About");
      expect(result.heroDescription).toBe("Even more awesome");
      expect(result.stats).toHaveLength(1);
    });
  });

  describe("Error Handling", () => {
    it("should handle network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(creatorsApi.list()).rejects.toThrow();
    });

    it("should handle 404 errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ message: "Not found" }),
      });

      await expect(creatorsApi.remove("non-existent")).rejects.toThrow("Not found");
    });

    it("should handle 401 unauthorized errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ message: "Unauthorized" }),
      });

      await expect(creatorsApi.create({ name: "", category: "", followers: "", price: "", color: "" })).rejects.toThrow("Unauthorized");
    });
  });

  describe("ID Handling - Critical Test", () => {
    it("should preserve _id when updating creators", async () => {
      // This test ensures _id is not transformed to id
      const originalCreator: AdminCreator = {
        _id: "creator-123",
        name: "Original Name",
        category: "Original Category",
        followers: "1M",
        price: "$1000",
        color: "from-blue-500 to-cyan-400",
      };

      // Simulate the edit flow
      const { _id, ...formData } = originalCreator;
      expect(_id).toBe("creator-123");
      expect(formData).not.toHaveProperty("_id");

      // Update should use the extracted _id
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ ...originalCreator, name: "Updated Name" }),
      });

      const result = await creatorsApi.update(_id, formData);
      expect(result._id).toBe("creator-123"); // Should be the original ID
      expect(result.name).toBe("Updated Name");
    });

    it("should not create new item when _id exists during update", async () => {
      const creatorWithId: AdminCreator = {
        _id: "existing-id",
        name: "Existing Creator",
        category: "Category",
        followers: "500K",
        price: "$500",
        color: "from-blue-500 to-cyan-400",
      };

      const { _id } = creatorWithId;
      
      // Verify that _id is extracted correctly
      expect(_id).toBeTruthy();
      expect(typeof _id).toBe("string");

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ ...creatorWithId, name: "Modified Name" }),
      });

      const result = await creatorsApi.update(_id, creatorWithId);
      
      // Verify it used the update endpoint (method: PUT)
      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[1].method).toBe("PUT");
      expect(result._id).toBe("existing-id");
    });
  });
});

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, Plus, Trash2, Edit2, X, Save, Briefcase, Users, FolderOpen,
  ChevronDown, ChevronUp, Image
} from "lucide-react";
import { adminAuth, servicesStore, creatorsStore, projectsStore } from "@/lib/adminStore";
import type { AdminService, AdminCreator, AdminProject } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ImageUpload from "@/components/ImageUpload";

type Tab = "services" | "creators" | "projects";

// ─── Helpers ───
const emptyService: Omit<AdminService, "id"> = {
  title: "", slug: "", desc: "", tagline: "", description: "", heroImage: "", icon: "Palette",
  features: [{ title: "", desc: "" }],
  process: [{ step: "", desc: "" }],
  stats: [{ value: "", label: "" }],
  testimonial: { quote: "", name: "", role: "", rating: 5 },
  faqs: [{ q: "", a: "" }],
};

const emptyCreator: Omit<AdminCreator, "id"> = {
  name: "", category: "", followers: "", price: "", color: "from-blue-500 to-cyan-400", image: "",
};

const emptyProject: Omit<AdminProject, "id"> = {
  title: "", cat: "", img: "", desc: "", client: "", duration: "", year: "",
  challenge: "", solution: "",
  results: [{ label: "", value: "" }],
  deliverables: [""],
  testimonial: { text: "", author: "", role: "" },
};

const colorOptions = [
  { label: "Blue → Cyan", value: "from-blue-500 to-cyan-400" },
  { label: "Pink → Rose", value: "from-pink-500 to-rose-400" },
  { label: "Green → Emerald", value: "from-green-500 to-emerald-400" },
  { label: "Purple → Violet", value: "from-purple-500 to-violet-400" },
  { label: "Orange → Amber", value: "from-orange-500 to-amber-400" },
  { label: "Red → Pink", value: "from-red-500 to-pink-400" },
];

const categoryOptions = ["Web Design", "Branding", "SEO", "Marketing", "Social Media", "Paid Ads"];

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("services");

  const [services, setServices] = useState<AdminService[]>([]);
  const [creators, setCreators] = useState<AdminCreator[]>([]);
  const [projects, setProjects] = useState<AdminProject[]>([]);

  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showCreatorForm, setShowCreatorForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingCreatorId, setEditingCreatorId] = useState<string | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const [serviceForm, setServiceForm] = useState<Omit<AdminService, "id">>(emptyService);
  const [creatorForm, setCreatorForm] = useState<Omit<AdminCreator, "id">>(emptyCreator);
  const [projectForm, setProjectForm] = useState<Omit<AdminProject, "id">>(emptyProject);

  // Delete confirmation state
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; type: string; id: string; name: string }>({
    open: false, type: "", id: "", name: "",
  });

  useEffect(() => {
    if (!adminAuth.isLoggedIn()) { navigate("/admin-login"); return; }
    refreshData();
  }, [navigate]);

  const refreshData = () => {
    setServices(servicesStore.getAll());
    setCreators(creatorsStore.getAll());
    setProjects(projectsStore.getAll());
  };

  const handleLogout = () => {
    adminAuth.logout();
    navigate("/admin-login");
  };

  const confirmDelete = () => {
    const { type, id } = deleteDialog;
    if (type === "service") { servicesStore.remove(id); toast({ title: "Service deleted" }); }
    else if (type === "creator") { creatorsStore.remove(id); toast({ title: "Creator deleted" }); }
    else if (type === "project") { projectsStore.remove(id); toast({ title: "Project deleted" }); }
    setDeleteDialog({ open: false, type: "", id: "", name: "" });
    refreshData();
  };

  const openDeleteDialog = (type: string, id: string, name: string) => {
    setDeleteDialog({ open: true, type, id, name });
  };

  // ─── Service CRUD ───
  const saveService = () => {
    if (!serviceForm.title || !serviceForm.slug) {
      toast({ title: "Error", description: "Title and slug are required", variant: "destructive" });
      return;
    }
    if (editingServiceId) {
      servicesStore.update(editingServiceId, serviceForm);
      toast({ title: "Service updated" });
    } else {
      servicesStore.add(serviceForm);
      toast({ title: "Service added" });
    }
    setShowServiceForm(false);
    setEditingServiceId(null);
    setServiceForm(emptyService);
    refreshData();
  };

  const editService = (s: AdminService) => {
    setServiceForm({ ...s });
    setEditingServiceId(s.id);
    setShowServiceForm(true);
  };

  // ─── Creator CRUD ───
  const saveCreator = () => {
    if (!creatorForm.name) {
      toast({ title: "Error", description: "Name is required", variant: "destructive" });
      return;
    }
    if (editingCreatorId) {
      creatorsStore.update(editingCreatorId, creatorForm);
      toast({ title: "Creator updated" });
    } else {
      creatorsStore.add(creatorForm);
      toast({ title: "Creator added" });
    }
    setShowCreatorForm(false);
    setEditingCreatorId(null);
    setCreatorForm(emptyCreator);
    refreshData();
  };

  const editCreator = (c: AdminCreator) => {
    setCreatorForm({ ...c });
    setEditingCreatorId(c.id);
    setShowCreatorForm(true);
  };

  // ─── Project CRUD ───
  const saveProject = () => {
    if (!projectForm.title || !projectForm.cat) {
      toast({ title: "Error", description: "Title and category are required", variant: "destructive" });
      return;
    }
    if (editingProjectId) {
      projectsStore.update(editingProjectId, projectForm);
      toast({ title: "Project updated" });
    } else {
      projectsStore.add(projectForm);
      toast({ title: "Project added" });
    }
    setShowProjectForm(false);
    setEditingProjectId(null);
    setProjectForm(emptyProject);
    refreshData();
  };

  const editProject = (p: AdminProject) => {
    setProjectForm({ ...p });
    setEditingProjectId(p.id);
    setShowProjectForm(true);
  };

  const tabs: { key: Tab; label: string; icon: React.ElementType; count: number }[] = [
    { key: "services", label: "Services", icon: Briefcase, count: services.length },
    { key: "creators", label: "Creators", icon: Users, count: creators.length },
    { key: "projects", label: "Projects", icon: FolderOpen, count: projects.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog(prev => ({ ...prev, open }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>"{deleteDialog.name}"</strong>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="font-heading text-xl font-extrabold gradient-text">Admin Panel</h1>
          <button onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tab === t.key
                  ? "gradient-bg text-accent-foreground shadow-lg"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}>
              <t.icon size={16} /> {t.label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${tab === t.key ? "bg-accent-foreground/20" : "bg-secondary"}`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* ─── Services Tab ─── */}
        {tab === "services" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-lg font-bold text-foreground">Manage Services</h2>
              <button
                onClick={() => { setServiceForm(emptyService); setEditingServiceId(null); setShowServiceForm(true); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-accent-foreground text-sm font-bold hover:opacity-90 transition-opacity">
                <Plus size={16} /> Add Service
              </button>
            </div>

            <div className="space-y-3">
              {services.length === 0 && (
                <p className="text-center text-muted-foreground py-12">No services added yet. Click "Add Service" to get started.</p>
              )}
              {services.map((s) => (
                <div key={s.id} className="bg-card border border-border rounded-xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {s.heroImage && (
                      <img src={s.heroImage} alt={s.title} className="w-14 h-14 rounded-lg object-cover" />
                    )}
                    <div>
                      <h3 className="font-heading font-bold text-foreground">{s.title}</h3>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => editService(s)} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => openDeleteDialog("service", s.id, s.title)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {showServiceForm && (
                <FormModal title={editingServiceId ? "Edit Service" : "Add Service"} onClose={() => { setShowServiceForm(false); setEditingServiceId(null); }}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Title" value={serviceForm.title} onChange={(v) => setServiceForm({ ...serviceForm, title: v, slug: v.toLowerCase().replace(/[^a-z0-9]+/g, "-") })} />
                      <InputField label="Slug" value={serviceForm.slug} onChange={(v) => setServiceForm({ ...serviceForm, slug: v })} />
                    </div>
                    <InputField label="Short Description" value={serviceForm.desc} onChange={(v) => setServiceForm({ ...serviceForm, desc: v })} />
                    <InputField label="Tagline" value={serviceForm.tagline} onChange={(v) => setServiceForm({ ...serviceForm, tagline: v })} />
                    <TextareaField label="Full Description" value={serviceForm.description} onChange={(v) => setServiceForm({ ...serviceForm, description: v })} />
                    <ImageUpload label="Hero Image" value={serviceForm.heroImage} onChange={(v) => setServiceForm({ ...serviceForm, heroImage: v })} />

                    <ArraySection label="Features" items={serviceForm.features}
                      renderItem={(item, i) => (
                        <div className="grid grid-cols-2 gap-2">
                          <input className="input-admin" placeholder="Feature title" value={item.title} onChange={(e) => {
                            const f = [...serviceForm.features]; f[i] = { ...f[i], title: e.target.value }; setServiceForm({ ...serviceForm, features: f });
                          }} />
                          <input className="input-admin" placeholder="Feature description" value={item.desc} onChange={(e) => {
                            const f = [...serviceForm.features]; f[i] = { ...f[i], desc: e.target.value }; setServiceForm({ ...serviceForm, features: f });
                          }} />
                        </div>
                      )}
                      onAdd={() => setServiceForm({ ...serviceForm, features: [...serviceForm.features, { title: "", desc: "" }] })}
                      onRemove={(i) => setServiceForm({ ...serviceForm, features: serviceForm.features.filter((_, idx) => idx !== i) })}
                    />

                    <ArraySection label="Process Steps" items={serviceForm.process}
                      renderItem={(item, i) => (
                        <div className="grid grid-cols-2 gap-2">
                          <input className="input-admin" placeholder="Step name" value={item.step} onChange={(e) => {
                            const p = [...serviceForm.process]; p[i] = { ...p[i], step: e.target.value }; setServiceForm({ ...serviceForm, process: p });
                          }} />
                          <input className="input-admin" placeholder="Step description" value={item.desc} onChange={(e) => {
                            const p = [...serviceForm.process]; p[i] = { ...p[i], desc: e.target.value }; setServiceForm({ ...serviceForm, process: p });
                          }} />
                        </div>
                      )}
                      onAdd={() => setServiceForm({ ...serviceForm, process: [...serviceForm.process, { step: "", desc: "" }] })}
                      onRemove={(i) => setServiceForm({ ...serviceForm, process: serviceForm.process.filter((_, idx) => idx !== i) })}
                    />

                    <ArraySection label="Stats" items={serviceForm.stats}
                      renderItem={(item, i) => (
                        <div className="grid grid-cols-2 gap-2">
                          <input className="input-admin" placeholder="Value (e.g. 200+)" value={item.value} onChange={(e) => {
                            const s = [...serviceForm.stats]; s[i] = { ...s[i], value: e.target.value }; setServiceForm({ ...serviceForm, stats: s });
                          }} />
                          <input className="input-admin" placeholder="Label" value={item.label} onChange={(e) => {
                            const s = [...serviceForm.stats]; s[i] = { ...s[i], label: e.target.value }; setServiceForm({ ...serviceForm, stats: s });
                          }} />
                        </div>
                      )}
                      onAdd={() => setServiceForm({ ...serviceForm, stats: [...serviceForm.stats, { value: "", label: "" }] })}
                      onRemove={(i) => setServiceForm({ ...serviceForm, stats: serviceForm.stats.filter((_, idx) => idx !== i) })}
                    />

                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground">Testimonial</p>
                      <TextareaField label="Quote" value={serviceForm.testimonial.quote} onChange={(v) => setServiceForm({ ...serviceForm, testimonial: { ...serviceForm.testimonial, quote: v } })} />
                      <div className="grid grid-cols-2 gap-2">
                        <InputField label="Name" value={serviceForm.testimonial.name} onChange={(v) => setServiceForm({ ...serviceForm, testimonial: { ...serviceForm.testimonial, name: v } })} />
                        <InputField label="Role" value={serviceForm.testimonial.role} onChange={(v) => setServiceForm({ ...serviceForm, testimonial: { ...serviceForm.testimonial, role: v } })} />
                      </div>
                    </div>

                    <ArraySection label="FAQs" items={serviceForm.faqs}
                      renderItem={(item, i) => (
                        <div className="space-y-2">
                          <input className="input-admin" placeholder="Question" value={item.q} onChange={(e) => {
                            const f = [...serviceForm.faqs]; f[i] = { ...f[i], q: e.target.value }; setServiceForm({ ...serviceForm, faqs: f });
                          }} />
                          <textarea className="input-admin min-h-[60px]" placeholder="Answer" value={item.a} onChange={(e) => {
                            const f = [...serviceForm.faqs]; f[i] = { ...f[i], a: e.target.value }; setServiceForm({ ...serviceForm, faqs: f });
                          }} />
                        </div>
                      )}
                      onAdd={() => setServiceForm({ ...serviceForm, faqs: [...serviceForm.faqs, { q: "", a: "" }] })}
                      onRemove={(i) => setServiceForm({ ...serviceForm, faqs: serviceForm.faqs.filter((_, idx) => idx !== i) })}
                    />

                    <button onClick={saveService} className="w-full h-11 rounded-lg gradient-bg text-accent-foreground font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      <Save size={16} /> {editingServiceId ? "Update Service" : "Add Service"}
                    </button>
                  </div>
                </FormModal>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ─── Creators Tab ─── */}
        {tab === "creators" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-lg font-bold text-foreground">Manage Creators</h2>
              <button
                onClick={() => { setCreatorForm(emptyCreator); setEditingCreatorId(null); setShowCreatorForm(true); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-accent-foreground text-sm font-bold hover:opacity-90 transition-opacity">
                <Plus size={16} /> Add Creator
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {creators.length === 0 && (
                <p className="col-span-full text-center text-muted-foreground py-12">No creators added yet.</p>
              )}
              {creators.map((c) => (
                <div key={c.id} className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className={`h-24 bg-gradient-to-br ${c.color} flex items-center justify-center`}>
                    {c.image ? (
                      <img src={c.image} alt={c.name} className="w-14 h-14 rounded-full object-cover border-2 border-accent-foreground/30" />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="font-heading text-lg font-bold text-accent-foreground">{c.name.split(" ").map(n => n[0]).join("")}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-foreground">{c.name}</h3>
                    <p className="text-xs text-muted-foreground">{c.category} · {c.followers} followers · {c.price}</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => editCreator(c)} className="flex-1 text-xs py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 font-medium transition-colors">Edit</button>
                      <button onClick={() => openDeleteDialog("creator", c.id, c.name)} className="text-xs py-2 px-3 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {showCreatorForm && (
                <FormModal title={editingCreatorId ? "Edit Creator" : "Add Creator"} onClose={() => { setShowCreatorForm(false); setEditingCreatorId(null); }}>
                  <div className="space-y-4">
                    <InputField label="Name" value={creatorForm.name} onChange={(v) => setCreatorForm({ ...creatorForm, name: v })} />
                    <InputField label="Category" value={creatorForm.category} onChange={(v) => setCreatorForm({ ...creatorForm, category: v })} placeholder="e.g. Tech Reviewer" />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Followers" value={creatorForm.followers} onChange={(v) => setCreatorForm({ ...creatorForm, followers: v })} placeholder="e.g. 2.4M" />
                      <InputField label="Price" value={creatorForm.price} onChange={(v) => setCreatorForm({ ...creatorForm, price: v })} placeholder="e.g. $1,500" />
                    </div>
                    <ImageUpload label="Profile Image" value={creatorForm.image} onChange={(v) => setCreatorForm({ ...creatorForm, image: v })} />
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Gradient Color</label>
                      <div className="grid grid-cols-3 gap-2">
                        {colorOptions.map((opt) => (
                          <button key={opt.value} onClick={() => setCreatorForm({ ...creatorForm, color: opt.value })}
                            className={`h-10 rounded-lg bg-gradient-to-br ${opt.value} text-xs font-medium text-accent-foreground flex items-center justify-center transition-all ${
                              creatorForm.color === opt.value ? "ring-2 ring-ring ring-offset-2 ring-offset-background" : ""
                            }`}>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button onClick={saveCreator} className="w-full h-11 rounded-lg gradient-bg text-accent-foreground font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      <Save size={16} /> {editingCreatorId ? "Update Creator" : "Add Creator"}
                    </button>
                  </div>
                </FormModal>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ─── Projects Tab ─── */}
        {tab === "projects" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-lg font-bold text-foreground">Manage Projects</h2>
              <button
                onClick={() => { setProjectForm(emptyProject); setEditingProjectId(null); setShowProjectForm(true); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-accent-foreground text-sm font-bold hover:opacity-90 transition-opacity">
                <Plus size={16} /> Add Project
              </button>
            </div>

            <div className="space-y-3">
              {projects.length === 0 && (
                <p className="text-center text-muted-foreground py-12">No projects added yet.</p>
              )}
              {projects.map((p) => (
                <div key={p.id} className="bg-card border border-border rounded-xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {p.img && (
                      <img src={p.img} alt={p.title} className="w-14 h-14 rounded-lg object-cover" />
                    )}
                    <div>
                      <h3 className="font-heading font-bold text-foreground">{p.title}</h3>
                      <p className="text-xs text-muted-foreground">{p.cat} · {p.client} · {p.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => editProject(p)} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => openDeleteDialog("project", p.id, p.title)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {showProjectForm && (
                <FormModal title={editingProjectId ? "Edit Project" : "Add Project"} onClose={() => { setShowProjectForm(false); setEditingProjectId(null); }}>
                  <div className="space-y-4">
                    <InputField label="Project Title" value={projectForm.title} onChange={(v) => setProjectForm({ ...projectForm, title: v })} />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
                        <select value={projectForm.cat} onChange={(e) => setProjectForm({ ...projectForm, cat: e.target.value })} className="input-admin">
                          <option value="">Select category</option>
                          {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <InputField label="Year" value={projectForm.year} onChange={(v) => setProjectForm({ ...projectForm, year: v })} placeholder="2024" />
                    </div>
                    <InputField label="Short Description" value={projectForm.desc} onChange={(v) => setProjectForm({ ...projectForm, desc: v })} />
                    <ImageUpload label="Project Image" value={projectForm.img} onChange={(v) => setProjectForm({ ...projectForm, img: v })} />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Client Name" value={projectForm.client} onChange={(v) => setProjectForm({ ...projectForm, client: v })} />
                      <InputField label="Duration" value={projectForm.duration} onChange={(v) => setProjectForm({ ...projectForm, duration: v })} placeholder="e.g. 12 Weeks" />
                    </div>
                    <TextareaField label="Challenge" value={projectForm.challenge} onChange={(v) => setProjectForm({ ...projectForm, challenge: v })} />
                    <TextareaField label="Solution" value={projectForm.solution} onChange={(v) => setProjectForm({ ...projectForm, solution: v })} />

                    <ArraySection label="Results" items={projectForm.results}
                      renderItem={(item, i) => (
                        <div className="grid grid-cols-2 gap-2">
                          <input className="input-admin" placeholder="Label (e.g. Conversion Rate)" value={item.label} onChange={(e) => {
                            const r = [...projectForm.results]; r[i] = { ...r[i], label: e.target.value }; setProjectForm({ ...projectForm, results: r });
                          }} />
                          <input className="input-admin" placeholder="Value (e.g. +180%)" value={item.value} onChange={(e) => {
                            const r = [...projectForm.results]; r[i] = { ...r[i], value: e.target.value }; setProjectForm({ ...projectForm, results: r });
                          }} />
                        </div>
                      )}
                      onAdd={() => setProjectForm({ ...projectForm, results: [...projectForm.results, { label: "", value: "" }] })}
                      onRemove={(i) => setProjectForm({ ...projectForm, results: projectForm.results.filter((_, idx) => idx !== i) })}
                    />

                    <ArraySection label="Deliverables" items={projectForm.deliverables}
                      renderItem={(item, i) => (
                        <input className="input-admin" placeholder="Deliverable name" value={item} onChange={(e) => {
                          const d = [...projectForm.deliverables]; d[i] = e.target.value; setProjectForm({ ...projectForm, deliverables: d });
                        }} />
                      )}
                      onAdd={() => setProjectForm({ ...projectForm, deliverables: [...projectForm.deliverables, ""] })}
                      onRemove={(i) => setProjectForm({ ...projectForm, deliverables: projectForm.deliverables.filter((_, idx) => idx !== i) })}
                    />

                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground">Testimonial</p>
                      <TextareaField label="Quote" value={projectForm.testimonial.text} onChange={(v) => setProjectForm({ ...projectForm, testimonial: { ...projectForm.testimonial, text: v } })} />
                      <div className="grid grid-cols-2 gap-2">
                        <InputField label="Author" value={projectForm.testimonial.author} onChange={(v) => setProjectForm({ ...projectForm, testimonial: { ...projectForm.testimonial, author: v } })} />
                        <InputField label="Role" value={projectForm.testimonial.role} onChange={(v) => setProjectForm({ ...projectForm, testimonial: { ...projectForm.testimonial, role: v } })} />
                      </div>
                    </div>

                    <button onClick={saveProject} className="w-full h-11 rounded-lg gradient-bg text-accent-foreground font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      <Save size={16} /> {editingProjectId ? "Update Project" : "Add Project"}
                    </button>
                  </div>
                </FormModal>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Reusable Components ───

const FormModal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-foreground/60 backdrop-blur-sm p-4 sm:p-8"
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.97 }}
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-2xl bg-background rounded-2xl shadow-2xl my-4 overflow-hidden"
    >
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h3 className="font-heading text-lg font-bold text-foreground">{title}</h3>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
          <X size={18} />
        </button>
      </div>
      <div className="p-5 max-h-[75vh] overflow-y-auto">{children}</div>
    </motion.div>
  </motion.div>
);

const InputField = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
  <div>
    <label className="block text-xs font-medium text-foreground mb-1">{label}</label>
    <input className="input-admin" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
  </div>
);

const TextareaField = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div>
    <label className="block text-xs font-medium text-foreground mb-1">{label}</label>
    <textarea className="input-admin min-h-[80px]" value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

const ArraySection = <T,>({ label, items, renderItem, onAdd, onRemove }: {
  label: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onAdd: () => void;
  onRemove: (index: number) => void;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <button onClick={onAdd} className="text-xs text-accent hover:underline flex items-center gap-1">
        <Plus size={12} /> Add
      </button>
    </div>
    {items.map((item, i) => (
      <div key={i} className="flex gap-2 items-start">
        <div className="flex-1">{renderItem(item, i)}</div>
        {items.length > 1 && (
          <button onClick={() => onRemove(i)} className="mt-1 p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
            <Trash2 size={13} />
          </button>
        )}
      </div>
    ))}
  </div>
);

export default Admin;

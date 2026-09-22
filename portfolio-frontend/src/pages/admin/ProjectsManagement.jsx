import React, { useState, useEffect } from 'react';
import { FaFolderOpen, FaPlus, FaExternalLinkAlt, FaGithub, FaFilm, FaCode } from 'react-icons/fa';
import api from '../../api/axios';
import AdminLayout from '../../layouts/AdminLayout';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import FormInput from '../../components/admin/FormInput';
import Button from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

const initialFormData = {
  title: '',
  category: 'CLIENT_WORK',
  project_type: 'Wedding Highlights',
  short_description: '',
  full_description: '',
  technologies: '',
  image_url: '',
  video_url: '',
  github_url: '',
  website_url: '',
  completion_date: '2026',
  is_featured: true,
  order: 0,
};

const ProjectsManagement = () => {
  const { addToast } = useToast();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get('/projects/');
      setData(res.data);
    } catch (err) {
      console.error('Fetch projects error:', err);
      addToast('Failed to load projects from database.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData(initialFormData);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      project_type: item.project_type,
      short_description: item.short_description,
      full_description: item.full_description || '',
      technologies: item.technologies,
      image_url: item.image_url || '',
      video_url: item.video_url || '',
      github_url: item.github_url || '',
      website_url: item.website_url || '',
      completion_date: item.completion_date || '',
      is_featured: item.is_featured,
      order: item.order || 0,
    });
    setModalOpen(true);
  };

  const handleOpenDelete = (item) => {
    setDeletingItem(item);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    setSubmitting(true);
    try {
      await api.delete(`/projects/${deletingItem.id}/`);
      addToast('Project deleted successfully.', 'success');
      setData((prev) => prev.filter((item) => item.id !== deletingItem.id));
      setDeleteConfirmOpen(false);
      setDeletingItem(null);
    } catch (err) {
      console.error('Delete error:', err);
      addToast('Failed to delete project.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingItem) {
        const res = await api.put(`/projects/${editingItem.id}/`, formData);
        setData((prev) => prev.map((item) => (item.id === editingItem.id ? res.data : item)));
        addToast('Project updated successfully.', 'success');
      } else {
        const res = await api.post('/projects/', formData);
        setData((prev) => [...prev, res.data]);
        addToast('Project created successfully.', 'success');
      }
      setModalOpen(false);
    } catch (err) {
      console.error('Save error:', err);
      addToast('Failed to save project.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      header: 'Project Title & Image',
      key: 'title',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {row.image_url && (
            <img
              src={row.image_url}
              alt={row.title}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-sm)',
                objectFit: 'cover',
                border: '1px solid var(--border-subtle)',
              }}
            />
          )}
          <div>
            <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{row.title}</strong>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.project_type}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      key: 'category',
      render: (row) => {
        const isClient = row.category === 'CLIENT_WORK';
        return (
          <span
            style={{
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              background: isClient ? 'rgba(245, 158, 11, 0.12)' : 'rgba(6, 182, 212, 0.12)',
              color: isClient ? 'var(--accent-gold)' : 'var(--accent-cyan)',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}
          >
            {isClient ? 'Client Work' : 'Development'}
          </span>
        );
      },
    },
    {
      header: 'Technologies / Gear',
      key: 'technologies',
      render: (row) => (
        <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
          {row.technologies}
        </span>
      ),
    },
    {
      header: 'Completion Date',
      key: 'completion_date',
    },
    {
      header: 'Links',
      key: 'links',
      render: (row) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {row.github_url && (
            <a href={row.github_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-light)' }} title="GitHub">
              <FaGithub />
            </a>
          )}
          {row.website_url && (
            <a href={row.website_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)' }} title="Website">
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      ),
    },
  ];

  return (
    <AdminLayout title="Projects Management">
      <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Screenshot 6 • Database Table: portfolio_project
          </span>
        </div>

        <DataTable
          title="Projects Management"
          subtitle="Manage videography client works (weddings, commercials, documentaries) and software engineering web apps."
          data={data}
          columns={columns}
          searchKey="title"
          searchPlaceholder="Search projects..."
          filterKey="category"
          filterOptions={[
            { label: 'Client Work (Videography)', value: 'CLIENT_WORK' },
            { label: 'Development Projects', value: 'DEVELOPMENT_PROJECT' },
          ]}
          onAdd={handleOpenAdd}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          addLabel="Add Project"
          loading={loading}
        />

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingItem ? 'Edit Project' : 'Add Project'}
          icon={FaFolderOpen}
          maxWidth="700px"
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <FormInput
              label="Project Title"
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Aurelia & Marcus: Palawan Wedding Highlights"
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput
                label="Portfolio Category"
                name="category"
                type="select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                options={[
                  { label: 'Client Work (Videography)', value: 'CLIENT_WORK' },
                  { label: 'Development Project (Software)', value: 'DEVELOPMENT_PROJECT' },
                ]}
                required
              />

              <FormInput
                label="Project Type"
                name="project_type"
                value={formData.project_type}
                onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                placeholder="e.g. Wedding Highlights / Web Application"
                required
              />
            </div>

            <FormInput
              label="Technologies & Camera Gear (Comma-separated)"
              name="technologies"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="e.g. Sony FX3, DaVinci Resolve or React, Django, PostgreSQL"
              required
            />

            <FormInput
              label="Short Description"
              name="short_description"
              type="textarea"
              rows={2}
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              placeholder="Quick 1-2 sentence overview for the project card..."
              required
            />

            <FormInput
              label="Full Project Story & Technical Details"
              name="full_description"
              type="textarea"
              rows={3}
              value={formData.full_description}
              onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
              placeholder="In-depth explanation of camera setup, lighting, color grading or software architecture..."
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput
                label="Cover Image URL"
                name="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://images.unsplash.com/..."
              />

              <FormInput
                label="Video / Reel Embed URL"
                name="video_url"
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                placeholder="https://youtube.com/... or Vimeo"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput
                label="GitHub Repository URL"
                name="github_url"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                placeholder="https://github.com/jeremyvillanueva/..."
              />

              <FormInput
                label="Live Demo / Film Website URL"
                name="website_url"
                value={formData.website_url}
                onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                placeholder="https://vimeo.com/... or live demo"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput
                label="Completion Date"
                name="completion_date"
                value={formData.completion_date}
                onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                placeholder="e.g. February 2026"
              />

              <FormInput
                label="Featured Project"
                name="is_featured"
                type="checkbox"
                value={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                placeholder="Yes, feature in primary gallery"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Saving...' : editingItem ? 'Update Project' : 'Save Project'}
              </Button>
            </div>
          </form>
        </Modal>

        <ConfirmDialog
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Project?"
          message={`Are you sure you want to delete "${deletingItem?.title}"? This cannot be undone.`}
          loading={submitting}
        />
      </div>
    </AdminLayout>
  );
};

export default ProjectsManagement;

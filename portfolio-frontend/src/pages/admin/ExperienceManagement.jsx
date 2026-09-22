import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaPlus, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import api from '../../api/axios';
import AdminLayout from '../../layouts/AdminLayout';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import FormInput from '../../components/admin/FormInput';
import Button from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

const initialFormData = {
  company: '',
  position: '',
  employment_type: 'Freelance',
  start_date: '',
  end_date: 'Present',
  is_current: false,
  location: '',
  description: '',
  order: 0,
};

const ExperienceManagement = () => {
  const { addToast } = useToast();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchExperience = async () => {
    setLoading(true);
    try {
      const res = await api.get('/work-experience/');
      setData(res.data);
    } catch (err) {
      console.error('Fetch experience error:', err);
      addToast('Failed to load work experience from database.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData(initialFormData);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      company: item.company,
      position: item.position,
      employment_type: item.employment_type,
      start_date: item.start_date,
      end_date: item.end_date,
      is_current: item.is_current,
      location: item.location || '',
      description: item.description,
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
      await api.delete(`/work-experience/${deletingItem.id}/`);
      addToast('Work experience record deleted successfully.', 'success');
      setData((prev) => prev.filter((item) => item.id !== deletingItem.id));
      setDeleteConfirmOpen(false);
      setDeletingItem(null);
    } catch (err) {
      console.error('Delete error:', err);
      addToast('Failed to delete experience record.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingItem) {
        const res = await api.put(`/work-experience/${editingItem.id}/`, formData);
        setData((prev) => prev.map((item) => (item.id === editingItem.id ? res.data : item)));
        addToast('Work experience updated successfully.', 'success');
      } else {
        const res = await api.post('/work-experience/', formData);
        setData((prev) => [...prev, res.data]);
        addToast('Work experience added successfully.', 'success');
      }
      setModalOpen(false);
    } catch (err) {
      console.error('Save error:', err);
      addToast('Failed to save work experience.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      header: 'Position & Company',
      key: 'position',
      render: (row) => (
        <div>
          <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{row.position}</strong>
          <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 600 }}>{row.company}</span>
        </div>
      ),
    },
    {
      header: 'Employment Type',
      key: 'employment_type',
      render: (row) => (
        <span
          style={{
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.8rem',
            color: 'var(--text-light)',
          }}
        >
          {row.employment_type}
        </span>
      ),
    },
    {
      header: 'Timeline',
      key: 'dates',
      render: (row) => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
          <FaCalendarAlt style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }} />
          <span>{row.start_date} – {row.end_date}</span>
        </span>
      ),
    },
    {
      header: 'Location',
      key: 'location',
      render: (row) => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <FaMapMarkerAlt />
          <span>{row.location || 'Metro Manila'}</span>
        </span>
      ),
    },
  ];

  return (
    <AdminLayout title="Work Experience Management">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Screenshot 3 • Database Table: portfolio_workexperience
          </span>
        </div>

        <DataTable
          title="Work Experience Management"
          subtitle="Manage lead videographer engagements, creative studio roles, and full-stack software development positions."
          data={data}
          columns={columns}
          searchKey="position"
          searchPlaceholder="Search roles or companies..."
          onAdd={handleOpenAdd}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          addLabel="Add Experience"
          loading={loading}
        />

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingItem ? 'Edit Work Experience' : 'Add Work Experience'}
          icon={FaBriefcase}
          maxWidth="640px"
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput
                label="Job Position"
                name="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="e.g. Lead Videographer & Editor"
                required
              />

              <FormInput
                label="Company / Studio"
                name="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Kinetic Visuals Studios"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput
                label="Employment Type"
                name="employment_type"
                type="select"
                value={formData.employment_type}
                onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                options={[
                  { label: 'Freelance', value: 'Freelance' },
                  { label: 'Full-time', value: 'Full-time' },
                  { label: 'Contract', value: 'Contract' },
                  { label: 'Part-time', value: 'Part-time' },
                ]}
                required
              />

              <FormInput
                label="Work Location"
                name="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Metro Manila (Hybrid)"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput
                label="Start Date"
                name="start_date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                placeholder="e.g. 2022 or Jan 2022"
                required
              />

              <FormInput
                label="End Date"
                name="end_date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                placeholder="e.g. Present or Dec 2024"
                required
              />
            </div>

            <FormInput
              label="Currently Working Here"
              name="is_current"
              type="checkbox"
              value={formData.is_current}
              onChange={(e) => setFormData({ ...formData, is_current: e.target.checked })}
              placeholder="Yes, this is my current ongoing role"
            />

            <FormInput
              label="Role Responsibilities & Achievements"
              name="description"
              type="textarea"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Details regarding camera gear handled, color grading pipelines, and software architecture..."
              required
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Saving...' : editingItem ? 'Update Experience' : 'Save Experience'}
              </Button>
            </div>
          </form>
        </Modal>

        <ConfirmDialog
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Work Experience?"
          message={`Are you sure you want to delete the record for "${deletingItem?.position} at ${deletingItem?.company}"? This cannot be undone.`}
          loading={submitting}
        />
      </div>
    </AdminLayout>
  );
};

export default ExperienceManagement;

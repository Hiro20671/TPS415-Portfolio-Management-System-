import React, { useState, useEffect } from 'react';
import { FaTrophy, FaPlus, FaCalendarAlt } from 'react-icons/fa';
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
  organization: '',
  date_received: '',
  description: '',
  image_url: '',
  order: 0,
};

const AchievementsManagement = () => {
  const { addToast } = useToast();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const res = await api.get('/achievements/');
      setData(res.data);
    } catch (err) {
      console.error('Fetch achievements error:', err);
      addToast('Failed to load achievements from database.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
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
      organization: item.organization,
      date_received: item.date_received,
      description: item.description,
      image_url: item.image_url || '',
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
      await api.delete(`/achievements/${deletingItem.id}/`);
      addToast('Achievement deleted successfully.', 'success');
      setData((prev) => prev.filter((item) => item.id !== deletingItem.id));
      setDeleteConfirmOpen(false);
      setDeletingItem(null);
    } catch (err) {
      console.error('Delete error:', err);
      addToast('Failed to delete achievement.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingItem) {
        const res = await api.put(`/achievements/${editingItem.id}/`, formData);
        setData((prev) => prev.map((item) => (item.id === editingItem.id ? res.data : item)));
        addToast('Achievement updated successfully.', 'success');
      } else {
        const res = await api.post('/achievements/', formData);
        setData((prev) => [...prev, res.data]);
        addToast('Achievement added successfully.', 'success');
      }
      setModalOpen(false);
    } catch (err) {
      console.error('Save error:', err);
      addToast('Failed to save achievement.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      header: 'Award / Achievement',
      key: 'title',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {row.image_url && (
            <img
              src={row.image_url}
              alt={row.title}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-sm)',
                objectFit: 'cover',
                border: '1px solid var(--border-subtle)',
              }}
            />
          )}
          <div>
            <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{row.title}</strong>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)' }}>{row.organization}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Date',
      key: 'date_received',
      render: (row) => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
          <FaCalendarAlt style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} />
          <span>{row.date_received}</span>
        </span>
      ),
    },
    {
      header: 'Description',
      key: 'description',
      render: (row) => (
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', maxWidth: '380px' }}>
          {row.description}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout title="Achievements Management">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Screenshot 8 • Database Table: portfolio_achievement
          </span>
        </div>

        <DataTable
          title="Achievements Management"
          subtitle="Manage cinematography festival awards, academic honors, hackathons, and creative recognitions."
          data={data}
          columns={columns}
          searchKey="title"
          searchPlaceholder="Search achievements..."
          onAdd={handleOpenAdd}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          addLabel="Add Achievement"
          loading={loading}
        />

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingItem ? 'Edit Achievement' : 'Add Achievement'}
          icon={FaTrophy}
          maxWidth="600px"
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <FormInput
              label="Achievement / Award Title"
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Best Cinematography Award"
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput
                label="Issuing Organization"
                name="organization"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g. National Indie Film Festival"
                required
              />

              <FormInput
                label="Date Received"
                name="date_received"
                value={formData.date_received}
                onChange={(e) => setFormData({ ...formData, date_received: e.target.value })}
                placeholder="e.g. December 2024"
                required
              />
            </div>

            <FormInput
              label="Image / Trophy Photo URL"
              name="image_url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://images.unsplash.com/..."
            />

            <FormInput
              label="Description / Project Associated"
              name="description"
              type="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Details about the award jury, film title or hackathon prototype..."
              required
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Saving...' : editingItem ? 'Update Achievement' : 'Save Achievement'}
              </Button>
            </div>
          </form>
        </Modal>

        <ConfirmDialog
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Achievement?"
          message={`Are you sure you want to delete "${deletingItem?.title}"? This cannot be undone.`}
          loading={submitting}
        />
      </div>
    </AdminLayout>
  );
};

export default AchievementsManagement;

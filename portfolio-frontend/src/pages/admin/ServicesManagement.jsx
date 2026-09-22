import React, { useState, useEffect } from 'react';
import { FaConciergeBell, FaPlus, FaCheck, FaTimes } from 'react-icons/fa';
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
  category: 'Cinematic Production',
  description: '',
  price_range: '₱35,000 - ₱90,000',
  icon_name: 'FaVideo',
  features: '',
  is_featured: true,
  order: 0,
};

const ServicesManagement = () => {
  const { addToast } = useToast();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/services/');
      setData(res.data);
    } catch (err) {
      console.error('Fetch services error:', err);
      addToast('Failed to load services from database.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
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
      description: item.description,
      price_range: item.price_range || '',
      icon_name: item.icon_name || 'FaVideo',
      features: item.features || '',
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
      await api.delete(`/services/${deletingItem.id}/`);
      addToast('Service deleted successfully.', 'success');
      setData((prev) => prev.filter((item) => item.id !== deletingItem.id));
      setDeleteConfirmOpen(false);
      setDeletingItem(null);
    } catch (err) {
      console.error('Delete error:', err);
      addToast('Failed to delete service.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingItem) {
        const res = await api.put(`/services/${editingItem.id}/`, formData);
        setData((prev) => prev.map((item) => (item.id === editingItem.id ? res.data : item)));
        addToast('Service updated successfully.', 'success');
      } else {
        const res = await api.post('/services/', formData);
        setData((prev) => [...prev, res.data]);
        addToast('Service created successfully.', 'success');
      }
      setModalOpen(false);
    } catch (err) {
      console.error('Save error:', err);
      addToast('Failed to save service.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      header: 'Service Name',
      key: 'title',
      render: (row) => (
        <div>
          <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{row.title}</strong>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.category}</span>
        </div>
      ),
    },
    {
      header: 'Price Range',
      key: 'price_range',
      render: (row) => (
        <span style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.85rem' }}>
          {row.price_range || 'Custom Quote'}
        </span>
      ),
    },
    {
      header: 'Icon',
      key: 'icon_name',
      render: (row) => (
        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
          {row.icon_name}
        </span>
      ),
    },
    {
      header: 'Featured',
      key: 'is_featured',
      render: (row) => (
        row.is_featured ? (
          <span style={{ color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <FaCheck /> Featured
          </span>
        ) : (
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Standard</span>
        )
      ),
    },
  ];

  return (
    <AdminLayout title="Services Management">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Screenshot 5 • Database Table: portfolio_service
          </span>
        </div>

        <DataTable
          title="Services Management"
          subtitle="Manage video production offerings, wedding packages, event coverage, and web engineering services."
          data={data}
          columns={columns}
          searchKey="title"
          searchPlaceholder="Search services..."
          onAdd={handleOpenAdd}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          addLabel="Add Service"
          loading={loading}
        />

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingItem ? 'Edit Service' : 'Add Service'}
          icon={FaConciergeBell}
          maxWidth="640px"
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <FormInput
              label="Service Title"
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Wedding Videography"
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput
                label="Category"
                name="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Event Cinematography"
                required
              />

              <FormInput
                label="Price Range"
                name="price_range"
                value={formData.price_range}
                onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
                placeholder="e.g. ₱45,000 - ₱150,000"
              />
            </div>

            <FormInput
              label="Icon"
              name="icon_name"
              type="select"
              value={formData.icon_name}
              onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
              options={[
                { label: 'FaVideo (Video Production)', value: 'FaVideo' },
                { label: 'FaCamera (Wedding & Photography)', value: 'FaCamera' },
                { label: 'FaFilm (Event Coverage & Editing)', value: 'FaFilm' },
                { label: 'FaInstagram (Social Media)', value: 'FaInstagram' },
                { label: 'FaCode (Web Development)', value: 'FaCode' },
              ]}
              required
            />

            <FormInput
              label="Service Overview Description"
              name="description"
              type="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of what this creative or engineering service provides..."
              required
            />

            <FormInput
              label="Feature Highlights (One per line)"
              name="features"
              type="textarea"
              rows={4}
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="Cinema-grade 4K 10-bit Recording&#10;Drone Aerial Coverage&#10;Same-Day Edit (SDE) Option&#10;Mastered Audio & Color Grading"
            />

            <FormInput
              label="Feature on Public Website"
              name="is_featured"
              type="checkbox"
              value={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              placeholder="Yes, showcase this service prominently"
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Saving...' : editingItem ? 'Update Service' : 'Save Service'}
              </Button>
            </div>
          </form>
        </Modal>

        <ConfirmDialog
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Service?"
          message={`Are you sure you want to delete "${deletingItem?.title}"? This cannot be undone.`}
          loading={submitting}
        />
      </div>
    </AdminLayout>
  );
};

export default ServicesManagement;

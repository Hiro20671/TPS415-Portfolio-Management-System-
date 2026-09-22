import React, { useState, useEffect } from 'react';
import { FaAddressBook, FaPlus, FaCheck, FaExternalLinkAlt } from 'react-icons/fa';
import api from '../../api/axios';
import AdminLayout from '../../layouts/AdminLayout';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import FormInput from '../../components/admin/FormInput';
import Button from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

const initialFormData = {
  platform: 'Email',
  label: '',
  value: '',
  url: '',
  icon_name: 'FaEnvelope',
  is_primary: false,
  order: 0,
};

const ContactInfoManagement = () => {
  const { addToast } = useToast();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/contact-information/');
      setData(res.data);
    } catch (err) {
      console.error('Fetch contacts error:', err);
      addToast('Failed to load contact info from database.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData(initialFormData);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      platform: item.platform,
      label: item.label,
      value: item.value,
      url: item.url || '',
      icon_name: item.icon_name || 'FaEnvelope',
      is_primary: item.is_primary,
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
      await api.delete(`/contact-information/${deletingItem.id}/`);
      addToast('Contact information record deleted successfully.', 'success');
      setData((prev) => prev.filter((item) => item.id !== deletingItem.id));
      setDeleteConfirmOpen(false);
      setDeletingItem(null);
    } catch (err) {
      console.error('Delete error:', err);
      addToast('Failed to delete contact record.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingItem) {
        const res = await api.put(`/contact-information/${editingItem.id}/`, formData);
        setData((prev) => prev.map((item) => (item.id === editingItem.id ? res.data : item)));
        addToast('Contact information updated successfully.', 'success');
      } else {
        const res = await api.post('/contact-information/', formData);
        setData((prev) => [...prev, res.data]);
        addToast('Contact information added successfully.', 'success');
      }
      setModalOpen(false);
    } catch (err) {
      console.error('Save error:', err);
      addToast('Failed to save contact information.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      header: 'Platform',
      key: 'platform',
      render: (row) => (
        <div>
          <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{row.platform}</strong>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.label}</span>
        </div>
      ),
    },
    {
      header: 'Value / Handle',
      key: 'value',
      render: (row) => (
        <span style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.9rem' }}>
          {row.value}
        </span>
      ),
    },
    {
      header: 'URL Link',
      key: 'url',
      render: (row) => (
        row.url ? (
          <a
            href={row.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-light)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.825rem' }}
          >
            <span>Open Link</span>
            <FaExternalLinkAlt style={{ fontSize: '0.75rem' }} />
          </a>
        ) : (
          '—'
        )
      ),
    },
    {
      header: 'Primary Channel',
      key: 'is_primary',
      render: (row) => (
        row.is_primary ? (
          <span style={{ color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <FaCheck /> Primary
          </span>
        ) : (
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Secondary</span>
        )
      ),
    },
  ];

  return (
    <AdminLayout title="Contact Information Management">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Screenshot 9 • Database Table: portfolio_contactinformation
          </span>
        </div>

        <DataTable
          title="Contact Information Management"
          subtitle="Manage direct client inquiry channels (email, phone, studio location) and professional social channels."
          data={data}
          columns={columns}
          searchKey="platform"
          searchPlaceholder="Search platforms or handles..."
          onAdd={handleOpenAdd}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          addLabel="Add Channel"
          loading={loading}
        />

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingItem ? 'Edit Contact Channel' : 'Add Contact Channel'}
          icon={FaAddressBook}
          maxWidth="560px"
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput
                label="Platform Name"
                name="platform"
                type="select"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                options={[
                  { label: 'Email', value: 'Email' },
                  { label: 'Phone', value: 'Phone' },
                  { label: 'Location', value: 'Location' },
                  { label: 'GitHub', value: 'GitHub' },
                  { label: 'LinkedIn', value: 'LinkedIn' },
                  { label: 'Instagram', value: 'Instagram' },
                  { label: 'Facebook', value: 'Facebook' },
                  { label: 'Vimeo', value: 'Vimeo' },
                  { label: 'YouTube', value: 'YouTube' },
                ]}
                required
              />

              <FormInput
                label="Display Label"
                name="label"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="e.g. Direct Inquiries / Mobile"
                required
              />
            </div>

            <FormInput
              label="Contact Value / Username"
              name="value"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              placeholder="e.g. jeremybryan.villanueva@gmail.com or +63 917 890 1234"
              required
            />

            <FormInput
              label="Destination URL"
              name="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="e.g. mailto:... or https://instagram.com/..."
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput
                label="Icon"
                name="icon_name"
                type="select"
                value={formData.icon_name}
                onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                options={[
                  { label: 'FaEnvelope (Email)', value: 'FaEnvelope' },
                  { label: 'FaPhone (Phone/WhatsApp)', value: 'FaPhone' },
                  { label: 'FaMapMarkerAlt (Location)', value: 'FaMapMarkerAlt' },
                  { label: 'FaGithub (GitHub)', value: 'FaGithub' },
                  { label: 'FaLinkedin (LinkedIn)', value: 'FaLinkedin' },
                  { label: 'FaInstagram (Instagram)', value: 'FaInstagram' },
                  { label: 'FaFacebook (Facebook)', value: 'FaFacebook' },
                ]}
                required
              />

              <FormInput
                label="Primary Contact"
                name="is_primary"
                type="checkbox"
                value={formData.is_primary}
                onChange={(e) => setFormData({ ...formData, is_primary: e.target.checked })}
                placeholder="Yes, highlight on contact section"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Saving...' : editingItem ? 'Update Channel' : 'Save Channel'}
              </Button>
            </div>
          </form>
        </Modal>

        <ConfirmDialog
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Contact Channel?"
          message={`Are you sure you want to delete the ${deletingItem?.platform} channel? This cannot be undone.`}
          loading={submitting}
        />
      </div>
    </AdminLayout>
  );
};

export default ContactInfoManagement;

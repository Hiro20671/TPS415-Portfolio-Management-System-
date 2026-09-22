import React, { useState, useEffect } from 'react';
import { FaCertificate, FaPlus, FaExternalLinkAlt } from 'react-icons/fa';
import api from '../../api/axios';
import AdminLayout from '../../layouts/AdminLayout';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import FormInput from '../../components/admin/FormInput';
import Button from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

const initialFormData = {
  name: '',
  issuing_organization: '',
  issue_date: '',
  expiration_date: 'No Expiration',
  credential_id: '',
  credential_url: '',
  description: '',
  order: 0,
};

const CertificationsManagement = () => {
  const { addToast } = useToast();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchCertifications = async () => {
    setLoading(true);
    try {
      const res = await api.get('/certifications/');
      setData(res.data);
    } catch (err) {
      console.error('Fetch certs error:', err);
      addToast('Failed to load certifications from database.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData(initialFormData);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      issuing_organization: item.issuing_organization,
      issue_date: item.issue_date,
      expiration_date: item.expiration_date || 'No Expiration',
      credential_id: item.credential_id || '',
      credential_url: item.credential_url || '',
      description: item.description || '',
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
      await api.delete(`/certifications/${deletingItem.id}/`);
      addToast('Certification deleted successfully.', 'success');
      setData((prev) => prev.filter((item) => item.id !== deletingItem.id));
      setDeleteConfirmOpen(false);
      setDeletingItem(null);
    } catch (err) {
      console.error('Delete error:', err);
      addToast('Failed to delete certification.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingItem) {
        const res = await api.put(`/certifications/${editingItem.id}/`, formData);
        setData((prev) => prev.map((item) => (item.id === editingItem.id ? res.data : item)));
        addToast('Certification updated successfully.', 'success');
      } else {
        const res = await api.post('/certifications/', formData);
        setData((prev) => [...prev, res.data]);
        addToast('Certification created successfully.', 'success');
      }
      setModalOpen(false);
    } catch (err) {
      console.error('Save error:', err);
      addToast('Failed to save certification.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      header: 'Certification Name',
      key: 'name',
      render: (row) => (
        <div>
          <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{row.name}</strong>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)' }}>{row.issuing_organization}</span>
        </div>
      ),
    },
    {
      header: 'Issued',
      key: 'issue_date',
    },
    {
      header: 'Expiration',
      key: 'expiration_date',
      render: (row) => (
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {row.expiration_date || 'No Expiration'}
        </span>
      ),
    },
    {
      header: 'Credential ID',
      key: 'credential_id',
      render: (row) => (
        row.credential_id ? (
          <code style={{ fontSize: '0.8rem', background: 'rgba(255, 255, 255, 0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
            {row.credential_id}
          </code>
        ) : (
          '—'
        )
      ),
    },
    {
      header: 'Verification',
      key: 'url',
      render: (row) => (
        row.credential_url ? (
          <a
            href={row.credential_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent-gold)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}
          >
            <span>Verify</span>
            <FaExternalLinkAlt style={{ fontSize: '0.75rem' }} />
          </a>
        ) : (
          '—'
        )
      ),
    },
  ];

  return (
    <AdminLayout title="Certifications Management">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Screenshot 7 • Database Table: portfolio_certification
          </span>
        </div>

        <DataTable
          title="Certifications Management"
          subtitle="Manage professional credentials from Blackmagic Design (DaVinci Resolve), Adobe Certified Professional, and Meta."
          data={data}
          columns={columns}
          searchKey="name"
          searchPlaceholder="Search certifications..."
          onAdd={handleOpenAdd}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          addLabel="Add Certification"
          loading={loading}
        />

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingItem ? 'Edit Certification' : 'Add Certification'}
          icon={FaCertificate}
          maxWidth="600px"
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <FormInput
              label="Certification Title"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. DaVinci Resolve Certified End User"
              required
            />

            <FormInput
              label="Issuing Organization"
              name="issuing_organization"
              value={formData.issuing_organization}
              onChange={(e) => setFormData({ ...formData, issuing_organization: e.target.value })}
              placeholder="e.g. Blackmagic Design / Adobe"
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput
                label="Issue Date"
                name="issue_date"
                value={formData.issue_date}
                onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                placeholder="e.g. November 2024"
                required
              />

              <FormInput
                label="Expiration Date"
                name="expiration_date"
                value={formData.expiration_date}
                onChange={(e) => setFormData({ ...formData, expiration_date: e.target.value })}
                placeholder="e.g. No Expiration or March 2027"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput
                label="Credential ID"
                name="credential_id"
                value={formData.credential_id}
                onChange={(e) => setFormData({ ...formData, credential_id: e.target.value })}
                placeholder="e.g. BMD-DVR-2024-8831"
              />

              <FormInput
                label="Verification Credential URL"
                name="credential_url"
                value={formData.credential_url}
                onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <FormInput
              label="Description & Skills Validated"
              name="description"
              type="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Summary of skills validated by this credential..."
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Saving...' : editingItem ? 'Update Certification' : 'Save Certification'}
              </Button>
            </div>
          </form>
        </Modal>

        <ConfirmDialog
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Certification?"
          message={`Are you sure you want to delete "${deletingItem?.name}"? This cannot be undone.`}
          loading={submitting}
        />
      </div>
    </AdminLayout>
  );
};

export default CertificationsManagement;

import React, { useState, useEffect } from 'react';
import { FaTools, FaPlus, FaVideo, FaFilm, FaCode, FaDatabase, FaCamera } from 'react-icons/fa';
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
  category: 'VIDEOGRAPHY',
  proficiency_percentage: 85,
  icon_name: 'FaVideo',
  years_practiced: 3,
  order: 0,
};

const CATEGORY_OPTIONS = [
  { label: 'Videography', value: 'VIDEOGRAPHY' },
  { label: 'Video Editing', value: 'VIDEO_EDITING' },
  { label: 'Web Development', value: 'WEB_DEVELOPMENT' },
  { label: 'Programming', value: 'PROGRAMMING' },
  { label: 'Database', value: 'DATABASE' },
  { label: 'Other', value: 'OTHER' },
];

const SkillsManagement = () => {
  const { addToast } = useToast();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await api.get('/skills/');
      setData(res.data);
    } catch (err) {
      console.error('Fetch skills error:', err);
      addToast('Failed to load skills from database.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
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
      category: item.category,
      proficiency_percentage: item.proficiency_percentage,
      icon_name: item.icon_name || 'FaCode',
      years_practiced: item.years_practiced || 3,
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
      await api.delete(`/skills/${deletingItem.id}/`);
      addToast('Skill deleted successfully.', 'success');
      setData((prev) => prev.filter((item) => item.id !== deletingItem.id));
      setDeleteConfirmOpen(false);
      setDeletingItem(null);
    } catch (err) {
      console.error('Delete error:', err);
      addToast('Failed to delete skill.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingItem) {
        const res = await api.put(`/skills/${editingItem.id}/`, formData);
        setData((prev) => prev.map((item) => (item.id === editingItem.id ? res.data : item)));
        addToast('Skill updated successfully.', 'success');
      } else {
        const res = await api.post('/skills/', formData);
        setData((prev) => [...prev, res.data]);
        addToast('Skill added successfully.', 'success');
      }
      setModalOpen(false);
    } catch (err) {
      console.error('Save error:', err);
      addToast('Failed to save skill.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      header: 'Skill Name',
      key: 'name',
      render: (row) => (
        <strong style={{ color: 'var(--text-primary)' }}>{row.name}</strong>
      ),
    },
    {
      header: 'Category',
      key: 'category',
      render: (row) => (
        <span
          style={{
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(245, 158, 11, 0.1)',
            color: 'var(--accent-gold)',
            fontSize: '0.8rem',
            fontWeight: 600,
          }}
        >
          {row.category_display || row.category}
        </span>
      ),
    },
    {
      header: 'Proficiency',
      key: 'proficiency_percentage',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '150px' }}>
          <div
            style={{
              flex: 1,
              height: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${row.proficiency_percentage}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--accent-gold), var(--accent-cyan))',
              }}
            />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700 }}>
            {row.proficiency_percentage}%
          </span>
        </div>
      ),
    },
    {
      header: 'Experience',
      key: 'years_practiced',
      render: (row) => `${row.years_practiced} Years`,
    },
  ];

  return (
    <AdminLayout title="Skills Management">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Screenshot 4 • Database Table: portfolio_skill
          </span>
        </div>

        <DataTable
          title="Skills Management"
          subtitle="Manage creative videography techniques, post-production software, and full-stack web engineering toolkits."
          data={data}
          columns={columns}
          searchKey="name"
          searchPlaceholder="Search skills..."
          filterKey="category"
          filterOptions={CATEGORY_OPTIONS}
          onAdd={handleOpenAdd}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          addLabel="Add Skill"
          loading={loading}
        />

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingItem ? 'Edit Skill' : 'Add Skill'}
          icon={FaTools}
          maxWidth="560px"
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <FormInput
              label="Skill Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. DaVinci Resolve Studio / React.js"
              required
            />

            <FormInput
              label="Category"
              name="category"
              type="select"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={CATEGORY_OPTIONS}
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-light)', marginBottom: '0.4rem' }}>
                  Proficiency Percentage: {formData.proficiency_percentage}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={formData.proficiency_percentage}
                  onChange={(e) => setFormData({ ...formData, proficiency_percentage: Number(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
                />
              </div>

              <FormInput
                label="Years Practiced"
                name="years_practiced"
                type="number"
                value={formData.years_practiced}
                onChange={(e) => setFormData({ ...formData, years_practiced: Number(e.target.value) })}
                required
              />
            </div>

            <FormInput
              label="Icon Identifier"
              name="icon_name"
              type="select"
              value={formData.icon_name}
              onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
              options={[
                { label: 'FaVideo (Videography)', value: 'FaVideo' },
                { label: 'FaFilm (Video Editing)', value: 'FaFilm' },
                { label: 'FaCamera (Cinema Camera)', value: 'FaCamera' },
                { label: 'FaCode (Web & Code)', value: 'FaCode' },
                { label: 'FaDatabase (Database)', value: 'FaDatabase' },
              ]}
              required
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Saving...' : editingItem ? 'Update Skill' : 'Save Skill'}
              </Button>
            </div>
          </form>
        </Modal>

        <ConfirmDialog
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Skill?"
          message={`Are you sure you want to delete "${deletingItem?.name}"? This cannot be undone.`}
          loading={submitting}
        />
      </div>
    </AdminLayout>
  );
};

export default SkillsManagement;

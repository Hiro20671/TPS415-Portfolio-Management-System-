import React, { useState, useEffect } from 'react';
import { FaGraduationCap, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import api from '../../api/axios';
import AdminLayout from '../../layouts/AdminLayout';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import FormInput from '../../components/admin/FormInput';
import Button from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

const initialFormData = {
  school: '',
  degree: '',
  field_of_study: '',
  start_year: '',
  end_year: 'Present',
  grade_or_honors: '',
  description: '',
  order: 0,
};

const EducationManagement = () => {
  const { addToast } = useToast();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchEducation = async () => {
    setLoading(true);
    try {
      const res = await api.get('/education/');
      setData(res.data);
    } catch (err) {
      console.error('Fetch education error:', err);
      addToast('Failed to load educational background from database.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData(initialFormData);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      school: item.school,
      degree: item.degree,
      field_of_study: item.field_of_study,
      start_year: item.start_year,
      end_year: item.end_year,
      grade_or_honors: item.grade_or_honors || '',
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
      await api.delete(`/education/${deletingItem.id}/`);
      addToast('Educational background record deleted successfully.', 'success');
      setData((prev) => prev.filter((item) => item.id !== deletingItem.id));
      setDeleteConfirmOpen(false);
      setDeletingItem(null);
    } catch (err) {
      console.error('Delete error:', err);
      addToast('Failed to delete educational record.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingItem) {
        const res = await api.put(`/education/${editingItem.id}/`, formData);
        setData((prev) => prev.map((item) => (item.id === editingItem.id ? res.data : item)));
        addToast('Educational background updated successfully.', 'success');
      } else {
        const res = await api.post('/education/', formData);
        setData((prev) => [...prev, res.data]);
        addToast('Educational background record added successfully.', 'success');
      }
      setModalOpen(false);
    } catch (err) {
      console.error('Save error:', err);
      addToast('Failed to save educational record.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      header: 'School / University',
      key: 'school',
      render: (row) => (
        <div>
          <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{row.school}</strong>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.degree}</span>
        </div>
      ),
    },
    {
      header: 'Field of Study',
      key: 'field_of_study',
    },
    {
      header: 'Period',
      key: 'period',
      render: (row) => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <FaCalendarAlt style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }} />
          <span>{row.start_year} – {row.end_year}</span>
        </span>
      ),
    },
    {
      header: 'Honors / Recognition',
      key: 'grade_or_honors',
      render: (row) => (
        row.grade_or_honors ? (
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
            {row.grade_or_honors}
          </span>
        ) : (
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>—</span>
        )
      ),
    },
  ];

  return (
    <AdminLayout title="Educational Background Management">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Subtitle tag for evaluation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Screenshot 2 • Database Table: portfolio_educationalbackground
          </span>
        </div>

        <DataTable
          title="Educational Background Management"
          subtitle="Manage university degrees, filmmaking academies, and software engineering coursework."
          data={data}
          columns={columns}
          searchKey="school"
          searchPlaceholder="Search schools, universities or degrees..."
          onAdd={handleOpenAdd}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          addLabel="Add Education"
          loading={loading}
        />

        {/* Animated Add/Edit Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingItem ? 'Edit Educational Background' : 'Add Educational Background'}
          icon={FaGraduationCap}
          maxWidth="640px"
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <FormInput
              label="School / University Name"
              name="school"
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              placeholder="e.g. De La Salle - College of Saint Benilde"
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput
                label="Degree"
                name="degree"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                placeholder="e.g. Bachelor of Arts"
                required
              />

              <FormInput
                label="Field of Study"
                name="field_of_study"
                value={formData.field_of_study}
                onChange={(e) => setFormData({ ...formData, field_of_study: e.target.value })}
                placeholder="e.g. Digital Filmmaking"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput
                label="Start Year"
                name="start_year"
                value={formData.start_year}
                onChange={(e) => setFormData({ ...formData, start_year: e.target.value })}
                placeholder="e.g. 2019"
                required
              />

              <FormInput
                label="End Year"
                name="end_year"
                value={formData.end_year}
                onChange={(e) => setFormData({ ...formData, end_year: e.target.value })}
                placeholder="e.g. 2023 or Present"
                required
              />
            </div>

            <FormInput
              label="Grade / Academic Honors"
              name="grade_or_honors"
              value={formData.grade_or_honors}
              onChange={(e) => setFormData({ ...formData, grade_or_honors: e.target.value })}
              placeholder="e.g. Magna Cum Laude • Best Thesis Film"
            />

            <FormInput
              label="Program Description & Highlights"
              name="description"
              type="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Summary of specialized coursework, thesis projects, and practical training..."
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Saving...' : editingItem ? 'Update Education' : 'Save Education'}
              </Button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <ConfirmDialog
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Educational Background?"
          message={`Are you sure you want to delete the record for "${deletingItem?.school}"? This cannot be undone.`}
          loading={submitting}
        />
      </div>
    </AdminLayout>
  );
};

export default EducationManagement;

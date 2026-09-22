import React, { useState, useEffect } from 'react';
import { FaUser, FaSave, FaEdit, FaSync } from 'react-icons/fa';
import api from '../../api/axios';
import AdminLayout from '../../layouts/AdminLayout';
import FormInput from '../../components/admin/FormInput';
import Button from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

const PersonalInfoManagement = () => {
  const { addToast } = useToast();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchPersonalInfo = async () => {
    setLoading(true);
    try {
      const res = await api.get('/personal-information/');
      if (res.data.length > 0) {
        setInfo(res.data[0]);
      } else {
        setInfo({
          full_name: 'Jeremy Bryan Villanueva',
          title: 'Videographer • Video Editor • Full Stack Developer',
          bio: '',
          about_details: '',
          location: 'Metro Manila, Philippines',
          email: 'jeremybryan.villanueva@gmail.com',
          phone: '+63 917 890 1234',
          years_experience: 5,
          projects_completed: 32,
          client_works: 45,
          technologies_count: 20,
          avatar_url: '',
          resume_url: '',
        });
      }
    } catch (err) {
      console.error('Error fetching personal info:', err);
      addToast('Failed to load personal information from database.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (info.id) {
        await api.put(`/personal-information/${info.id}/`, info);
        addToast('Personal information updated successfully in Aiven PostgreSQL!', 'success');
      } else {
        const res = await api.post('/personal-information/', info);
        setInfo(res.data);
        addToast('Personal information created successfully in Aiven PostgreSQL!', 'success');
      }
    } catch (err) {
      console.error('Save error:', err);
      addToast('Failed to save personal information. Please verify credentials.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Personal Information Management">
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Header Title Card for Screenshot 1 */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(245, 158, 11, 0.15)',
                color: 'var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
              }}
            >
              <FaUser />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Screenshot 1 • Database Table: portfolio_personalinformation
              </span>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.2rem 0' }}>
                Personal Information Management
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
                Manage core creative positioning, biographical summary, and animated counter metrics.
              </p>
            </div>
          </div>

          <Button variant="secondary" icon={FaSync} onClick={fetchPersonalInfo} disabled={loading}>
            Refresh
          </Button>
        </div>

        {/* Form Container */}
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading record from database...
          </div>
        ) : (
          <form
            onSubmit={handleSave}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <FormInput
                label="Full Name"
                name="full_name"
                value={info?.full_name}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Professional Title"
                name="title"
                value={info?.title}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <FormInput
                label="Email Address"
                name="email"
                type="email"
                value={info?.email}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Phone Number"
                name="phone"
                value={info?.phone}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Base Location"
                name="location"
                value={info?.location}
                onChange={handleChange}
                required
              />
            </div>

            <FormInput
              label="Primary Bio / Professional Positioning"
              name="bio"
              type="textarea"
              rows={3}
              value={info?.bio}
              onChange={handleChange}
              required
              helpText="Primary summary emphasizing videography as lead capability and full-stack development as engineering strength."
            />

            <FormInput
              label="Extended About Narrative"
              name="about_details"
              type="textarea"
              rows={3}
              value={info?.about_details}
              onChange={handleChange}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <FormInput
                label="Profile Avatar URL"
                name="avatar_url"
                value={info?.avatar_url}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
              />

              <FormInput
                label="Resume / CV URL"
                name="resume_url"
                value={info?.resume_url}
                onChange={handleChange}
                placeholder="https://example.com/cv.pdf"
              />
            </div>

            {/* Statistics Counters */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-gold)' }}>
                Animated Statistics Metrics (Displayed on About Section)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <FormInput
                  label="Years Experience"
                  name="years_experience"
                  type="number"
                  value={info?.years_experience}
                  onChange={handleChange}
                  required
                />

                <FormInput
                  label="Projects Completed"
                  name="projects_completed"
                  type="number"
                  value={info?.projects_completed}
                  onChange={handleChange}
                  required
                />

                <FormInput
                  label="Client Works"
                  name="client_works"
                  type="number"
                  value={info?.client_works}
                  onChange={handleChange}
                  required
                />

                <FormInput
                  label="Technologies & Gear"
                  name="technologies_count"
                  type="number"
                  value={info?.technologies_count}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
              <Button type="submit" variant="primary" size="lg" icon={FaSave} disabled={saving}>
                {saving ? 'Saving to Database...' : 'Save Personal Information'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};

export default PersonalInfoManagement;

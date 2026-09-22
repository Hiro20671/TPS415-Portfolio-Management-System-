import React, { useState, useEffect } from 'react';
import { FaEnvelopeOpenText, FaEnvelope, FaTrash, FaCheck, FaCalendarAlt } from 'react-icons/fa';
import api from '../../api/axios';
import AdminLayout from '../../layouts/AdminLayout';
import DataTable from '../../components/admin/DataTable';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

const ContactMessagesManagement = () => {
  const { addToast } = useToast();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingMessage, setViewingMessage] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingMessage, setDeletingMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await api.get('/contact-messages/');
      setMessages(res.data);
    } catch (err) {
      console.error('Fetch messages error:', err);
      addToast('Failed to load inquiries from database.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleOpenView = async (msg) => {
    setViewingMessage(msg);
    if (!msg.is_read) {
      try {
        await api.patch(`/contact-messages/${msg.id}/`, { is_read: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m))
        );
      } catch (err) {
        console.error('Mark read error:', err);
      }
    }
  };

  const handleOpenDelete = (msg) => {
    setDeletingMessage(msg);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingMessage) return;
    setSubmitting(true);
    try {
      await api.delete(`/contact-messages/${deletingMessage.id}/`);
      addToast('Inquiry message deleted.', 'success');
      setMessages((prev) => prev.filter((m) => m.id !== deletingMessage.id));
      setDeleteConfirmOpen(false);
      setDeletingMessage(null);
      if (viewingMessage?.id === deletingMessage.id) {
        setViewingMessage(null);
      }
    } catch (err) {
      console.error('Delete inquiry error:', err);
      addToast('Failed to delete inquiry message.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      header: 'Sender Name',
      key: 'name',
      render: (row) => (
        <div>
          <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{row.name}</strong>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.email}</span>
        </div>
      ),
    },
    {
      header: 'Subject',
      key: 'subject',
      render: (row) => (
        <span style={{ color: row.is_read ? 'var(--text-light)' : 'var(--accent-gold)', fontWeight: row.is_read ? 500 : 700 }}>
          {row.subject || 'General Production Inquiry'}
        </span>
      ),
    },
    {
      header: 'Received Date',
      key: 'created_at',
      render: (row) => {
        const date = new Date(row.created_at);
        return (
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        );
      },
    },
    {
      header: 'Status',
      key: 'is_read',
      render: (row) => (
        row.is_read ? (
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Read</span>
        ) : (
          <span style={{ color: 'var(--accent-gold)', background: 'rgba(245, 158, 11, 0.1)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>
            New
          </span>
        )
      ),
    },
  ];

  return (
    <AdminLayout title="Client Inquiries Management">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <DataTable
          title="Client Inquiries & Booking Messages"
          subtitle="Review inquiries submitted through the public portfolio website contact form."
          data={messages}
          columns={columns}
          searchKey="name"
          searchPlaceholder="Search sender name or subject..."
          onEdit={handleOpenView}
          onDelete={handleOpenDelete}
          loading={loading}
        />

        {/* View Message Modal */}
        <Modal
          isOpen={!!viewingMessage}
          onClose={() => setViewingMessage(null)}
          title={viewingMessage?.subject || 'Client Inquiry'}
          icon={FaEnvelopeOpenText}
          maxWidth="600px"
        >
          {viewingMessage && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sender:</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 600 }}>
                    {viewingMessage.name} &lt;{viewingMessage.email}&gt;
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Received:</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    {new Date(viewingMessage.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Message Scope:
                </label>
                <div
                  style={{
                    background: 'var(--bg-primary)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {viewingMessage.message}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <a
                  href={`mailto:${viewingMessage.email}?subject=Re: ${encodeURIComponent(viewingMessage.subject || 'Portfolio Inquiry')}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1.4rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'linear-gradient(135deg, var(--accent-gold), #d97706)',
                    color: '#0B0C10',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                  }}
                >
                  <FaEnvelope />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          )}
        </Modal>

        <ConfirmDialog
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Inquiry Message?"
          message={`Are you sure you want to delete message from "${deletingMessage?.name}"? This cannot be undone.`}
          loading={submitting}
        />
      </div>
    </AdminLayout>
  );
};

export default ContactMessagesManagement;

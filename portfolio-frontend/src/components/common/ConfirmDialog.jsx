import React from 'react';
import { FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import Modal from './Modal';
import Button from './Button';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Record?',
  message = 'Are you sure you want to delete this record? This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  loading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} icon={FaExclamationTriangle} maxWidth="480px">
      <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 1.25rem',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.12)',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
          }}
        >
          <FaExclamationTriangle />
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5, marginBottom: '2rem' }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button variant="danger" icon={FaTrash} onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting...' : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;

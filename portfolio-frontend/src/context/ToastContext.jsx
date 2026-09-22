import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle style={{ color: '#10B981', fontSize: '1.2rem', flexShrink: 0 }} />;
      case 'error':
        return <FaExclamationTriangle style={{ color: '#EF4444', fontSize: '1.2rem', flexShrink: 0 }} />;
      case 'warning':
        return <FaExclamationTriangle style={{ color: '#F59E0B', fontSize: '1.2rem', flexShrink: 0 }} />;
      default:
        return <FaInfoCircle style={{ color: '#3B82F6', fontSize: '1.2rem', flexShrink: 0 }} />;
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxWidth: '420px',
          width: 'calc(100vw - 48px)',
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 18px',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-subtle)',
                backdropFilter: 'blur(16px)',
              }}
            >
              {getIcon(toast.type)}
              <span style={{ flex: 1, fontSize: '0.925rem', fontWeight: 500, lineHeight: 1.4 }}>
                {toast.message}
              </span>
              <button
                onClick={() => removeToast(toast.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 0.2s',
                }}
                aria-label="Close notification"
              >
                <FaTimes />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

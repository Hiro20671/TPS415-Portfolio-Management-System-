import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

const AdminLayout = ({ children, title = 'Control Panel' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader title={title} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main
          style={{
            flex: 1,
            padding: '2rem',
            overflowY: 'auto',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

import React, { useState } from 'react';
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaFilter,
  FaInbox,
} from 'react-icons/fa';
import Button from '../common/Button';

const DataTable = ({
  title,
  subtitle,
  data = [],
  columns = [],
  searchKey = 'name',
  searchPlaceholder = 'Search records...',
  filterOptions = [],
  filterKey = 'category',
  onAdd,
  onEdit,
  onDelete,
  addLabel = 'Add Record',
  loading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const filteredData = data.filter((item) => {
    const matchesSearch = searchKey
      ? String(item[searchKey] || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      : true;

    const matchesFilter =
      selectedFilter === 'ALL' || !filterKey
        ? true
        : String(item[filterKey]) === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
        overflow: 'hidden',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          padding: '1.75rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: '0.2rem 0 0' }}>
              {subtitle}
            </p>
          )}
        </div>

        {onAdd && (
          <Button variant="primary" icon={FaPlus} onClick={onAdd}>
            {addLabel}
          </Button>
        )}
      </div>

      {/* Filter and Search controls */}
      <div
        style={{
          padding: '1rem 1.75rem',
          background: 'rgba(255, 255, 255, 0.015)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {/* Search input */}
        <div style={{ position: 'relative', minWidth: '260px', flex: '1 1 260px' }}>
          <div
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
            }}
          >
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 1rem 0.65rem 2.6rem',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              outline: 'none',
            }}
          />
        </div>

        {/* Filter dropdown */}
        {filterOptions.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaFilter style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }} />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              style={{
                padding: '0.65rem 1rem',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="ALL">All Categories</option>
              {filterOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredData.length}</strong> of <strong>{data.length}</strong> entries
        </div>
      </div>

      {/* Table Content */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid var(--border-subtle)' }}>
              {columns.map((col) => (
                <th
                  key={col.key || col.header}
                  style={{
                    padding: '1rem 1.25rem',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--text-muted)',
                    fontWeight: 700,
                  }}
                >
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th
                  style={{
                    padding: '1rem 1.25rem',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--text-muted)',
                    fontWeight: 700,
                    textAlign: 'right',
                  }}
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Loading database records from Aiven PostgreSQL...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  style={{
                    padding: '3.5rem 1rem',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    <FaInbox style={{ fontSize: '2.5rem', opacity: 0.3 }} />
                    <span style={{ fontSize: '1rem', fontWeight: 600 }}>No matching records found</span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background 0.2s',
                  }}
                  className="table-row"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key || col.header}
                      style={{
                        padding: '1rem 1.25rem',
                        fontSize: '0.9rem',
                        color: 'var(--text-light)',
                        verticalAlign: 'middle',
                      }}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}

                  {(onEdit || onDelete) && (
                    <td style={{ padding: '1rem 1.25rem', textAlign: 'right', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              padding: '0.4rem 0.75rem',
                              borderRadius: 'var(--radius-sm)',
                              background: 'rgba(245, 158, 11, 0.1)',
                              border: '1px solid rgba(245, 158, 11, 0.25)',
                              color: 'var(--accent-gold)',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'var(--transition)',
                            }}
                            title="Edit Record"
                          >
                            <FaEdit />
                            <span>Edit</span>
                          </button>
                        )}

                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              padding: '0.4rem 0.75rem',
                              borderRadius: 'var(--radius-sm)',
                              background: 'rgba(239, 68, 68, 0.1)',
                              border: '1px solid rgba(239, 68, 68, 0.25)',
                              color: '#ef4444',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'var(--transition)',
                            }}
                            title="Delete Record"
                          >
                            <FaTrash />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .table-row:hover {
          background: rgba(255, 255, 255, 0.025);
        }
      `}</style>
    </div>
  );
};

export default DataTable;

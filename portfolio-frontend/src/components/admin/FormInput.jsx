import React from 'react';

const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder = '',
  options = [], // For select dropdowns
  rows = 4, // For textarea
  helpText,
  disabled = false,
}) => {
  const inputStyles = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      {label && (
        <label
          htmlFor={name}
          style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-light)',
          }}
        >
          {label} {required && <span style={{ color: 'var(--accent-gold)' }}>*</span>}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          style={{ ...inputStyles, resize: 'vertical' }}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          required={required}
          disabled={disabled}
          style={{ ...inputStyles, cursor: 'pointer' }}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'checkbox' ? (
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '0.35rem' }}>
          <input
            id={name}
            name={name}
            type="checkbox"
            checked={!!value}
            onChange={onChange}
            disabled={disabled}
            style={{ width: '18px', height: '18px', accentColor: 'var(--accent-gold)' }}
          />
          <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{placeholder || 'Yes'}</span>
        </label>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value || ''}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          disabled={disabled}
          style={inputStyles}
        />
      )}

      {helpText && (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {helpText}
        </span>
      )}
    </div>
  );
};

export default FormInput;

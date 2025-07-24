import React, { useState } from 'react';

const columns = [
  { key: 'lastName', label: 'Фамилия' },
  { key: 'firstName', label: 'Имя' },
  { key: 'maidenName', label: 'Отчество' },
  { key: 'age', label: 'Возраст' },
  { key: 'gender', label: 'Пол' },
  { key: 'phone', label: 'Телефон' },
  { key: 'email', label: 'Email' },
  { key: 'country', label: 'Страна' },
  { key: 'city', label: 'Город' },
];

const sortableFields = [
  { key: 'fio', label: 'ФИО' },
  { key: 'age', label: 'Возраст' },
  { key: 'gender', label: 'Пол' },
  { key: 'phone', label: 'Телефон' },
];

export default function UserTable({ users, onRowClick }) {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const [columnWidths, setColumnWidths] = useState(() => {
    const initial = {};
    columns.forEach(({ key }) => {
      initial[key] = 120;
    });
    return initial;
  });

  function startResize(e, key) {
    const startX = e.clientX;
    const startWidth = columnWidths[key];

    const onMouseMove = (moveEvent) => {
      const delta = moveEvent.clientX - startX;
      setColumnWidths(prev => ({
        ...prev,
        [key]: Math.max(50, startWidth + delta),
      }));
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig.key || !sortConfig.direction) return 0;

    let aValue, bValue;

    if (sortConfig.key === 'fio') {
      aValue = `${a.lastName} ${a.firstName} ${a.maidenName}`.toLowerCase();
      bValue = `${b.lastName} ${b.firstName} ${b.maidenName}`.toLowerCase();
    } else {
      aValue = a[sortConfig.key]?.toString().toLowerCase();
      bValue = b[sortConfig.key]?.toString().toLowerCase();
    }

    if (sortConfig.direction === 'asc') return aValue > bValue ? 1 : -1;
    if (sortConfig.direction === 'desc') return aValue < bValue ? 1 : -1;
    return 0;
  });

  return (
    <div className='blockSort'>
      <div style={{ marginBottom: 10, display: 'flex', gap: 10 }}>
        <select
          value={sortConfig.key}
          onChange={(e) => setSortConfig(prev => ({ ...prev, key: e.target.value }))}
        >
          <option value="">Без сортировки</option>
          {sortableFields.map(field => (
            <option key={field.key} value={field.key}>{field.label}</option>
          ))}
        </select>

        <select
          value={sortConfig.direction}
          onChange={(e) => setSortConfig(prev => ({ ...prev, direction: e.target.value }))}
        >
          <option value="">Без направления</option>
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map(({ key, label }) => (
              <th
                key={key}
                style={{
                  width: columnWidths[key],
                  minWidth: 50,
                  position: 'relative',
                  borderBottom: '1px solid #808080',
                  padding: '8px',
                  userSelect: 'none',
                }}
              >
                <div>{label}</div>
                <div
                  onMouseDown={(e) => startResize(e, key)}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    height: '100%',
                    width: 5,
                    cursor: 'col-resize',
                    zIndex: 1,
                  }}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id} onClick={() => onRowClick(user)} style={{ cursor: 'pointer' }}>
              <td>{user.lastName}</td>
              <td>{user.firstName}</td>
              <td>{user.maidenName}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.address.country}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

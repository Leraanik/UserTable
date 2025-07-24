import React, { useEffect, useState } from 'react';
import { fetchUsers } from './services/api';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState('');

  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName} ${user.maidenName}`.toLowerCase();
    return (
      fullName.includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase()) ||
      user.address.city.toLowerCase().includes(filter.toLowerCase())
    );
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchUsers({ limit, skip: (page - 1) * limit });
        setUsers(data.users);
        setTotal(data.total);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, [page]);


  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: 20 }}>
      <h1>Пользователи</h1>
      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
      <div className='blockSearch'>
        <img src="/images/icon_search.svg" alt="иконка поиска" className='imgSearch'/>
        <input
          type="text"
          placeholder="Поиск по ФИО, email, городу"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className='inputSearch'
        />
      </div>

      <UserTable users={filteredUsers} onRowClick={setSelectedUser} />

      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      <div className='blockPages'>
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className='buttonPage'>
          <img src="/images/icon_arrowLeft.png" alt="стрелка назад" />
        </button>
        <span style={{ margin: '0 10px' }}>Страница {page}</span>
        <button onClick={() => setPage(p => p + 1)} className='buttonPage'>
          <img src="/images/icon_arrowRight.png" alt="стрелка вперед" />
        </button>
      </div>
    </div>
  );
}

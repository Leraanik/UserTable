import React from 'react';

export default function UserModal({ user, onClose }) {
  return (
    <div className='blockModal'>
      <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8, maxWidth: 500, width: '90%' }}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h2>{user.lastName} {user.firstName} {user.maidenName}</h2>
            <button onClick={onClose}>
                <img src="./images/icon_close.png" alt="Закрыть" style={{width: '35px'}}/>
            </button>
        </div>
        <p>Возраст: {user.age}</p>
        <p>Пол: {user.gender}</p>
        <p>Рост: {user.height} см</p>
        <p>Вес: {user.weight} кг</p>
        <p>Телефон: {user.phone}</p>
        <p>Email: {user.email}</p>
        <p>Страна: {user.address.country}</p>
        <p>Город: {user.address.city}</p>
        <p>Адрес: {user.address.address}</p>
        <img src={user.image} alt="avatar" width={100} style={{ borderRadius: '50%' }} />
        <br />
      </div>
    </div>
  );
}

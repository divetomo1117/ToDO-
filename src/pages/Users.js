import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Users.css'; // 必要に応じて

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.userId !== 'tomo') {
      alert('アクセス権限がありません');
      navigate('/login');
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(savedUsers);
  }, [navigate]);

  return (
    <div className="Users-container">
      <h2>ユーザー情報一覧</h2>

      {users.length === 0 ? (
        <p>ユーザーが登録されていません</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {index + 1}. {user.userId}
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: '20px' }}>
        <Link to="/todo">ToDo画面へ戻る</Link> | <Link to="/">ホームへ戻る</Link>
      </div>
    </div>
  );
}

export default Users;

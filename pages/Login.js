import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // 必要なら読み込み

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!userId.trim() || !password.trim()) {
      alert('ユーザーIDとパスワードを入力してください');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // ユーザーIDとパスワードが一致するかチェック
    const user = users.find(user => user.userId === userId && user.password === password);

    if (user) {
      // ログイン成功したユーザー情報を保存（例: localStorage）
      localStorage.setItem('currentUser', JSON.stringify(user));

      alert(`ログイン成功！${userId}、ちょっとToDo画面来れる～？`);

      // Todo画面へ遷移
      navigate('/todo');
    } else {
      alert('ユーザーIDかパスワードが間違っています');
    }
  };

  return (
    <div className="login-container">
      <h2>ログイン</h2>
      <input
        type="text"
        placeholder="ユーザーID"
        value={userId}
        onChange={e => setUserId(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>ログイン</button>

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/">ホームに戻る</Link>
      </p>
    </div>
  );
}

export default Login;

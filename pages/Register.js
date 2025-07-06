import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'; // CSSファイルがあれば読み込み

function Register() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!userId.trim() || !password.trim()) {
      alert('ユーザーIDとパスワードを入力してください');
      return;
    }

    // 既存のユーザー一覧を取得
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 同じユーザーIDがすでにあるかチェック
    const exists = users.some(user => user.userId === userId);
    if (exists) {
      alert('このユーザーIDはすでに使われています');
      return;
    }

    // 新しいユーザーを追加して保存
    users.push({ userId, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert(`登録が完了したで。${userId}、なんで寺尾に手伝わせてんねん。自分でやれよ。`);

    // 登録後にログイン画面へ遷移
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h2>新規登録</h2>
      <input
        type="text"
        placeholder="ユーザーID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>登録</button>

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/">ホームに戻る</Link>
      </p>
    </div>
  );
}

export default Register;

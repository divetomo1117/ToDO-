import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h2>ようこそ</h2>
      <p>ToDoアプリへようこそ。まずはログインまたは新規登録してください。</p>
      <div className="button-group">
        <Link to="/login" className="btn">ログイン</Link>
        <Link to="/register" className="btn btn-secondary">新規登録</Link>
      </div>
    </div>
  );
}

export default Home;

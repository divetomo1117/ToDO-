import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Todo.css';

function Todo() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userId = currentUser?.userId;

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }
    const saved = JSON.parse(localStorage.getItem(`tasks_${userId}`)) || [];
    setTasks(saved);
  }, [userId, navigate]);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem(`tasks_${userId}`, JSON.stringify(newTasks));
  };

  const addTask = () => {
    if (input.trim() === '') return;
    const newTask = { text: input, completed: false };
    saveTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleSelect = (index) => {
    setSelectedTasks((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const markSelectedAsComplete = () => {
    const updated = tasks.map((task, index) =>
      selectedTasks.includes(index) ? { ...task, completed: true } : task
    );
    saveTasks(updated);
    setSelectedTasks([]);
  };

  const deleteSelectedTasks = () => {
    const updated = tasks.filter((_, index) => !selectedTasks.includes(index));
    saveTasks(updated);
    setSelectedTasks([]);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <>
      <div className="todo-container">
        <h2>{userId} の ToDo</h2>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="タスクを入力"
        />
        <button onClick={addTask}>追加</button>

        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={selectedTasks.includes(index)}
                onChange={() => toggleSelect(index)}
                title="選択"
              />
              <span>{task.text}</span>
            </li>
          ))}
        </ul>

        <div className="batch-buttons">
          <button onClick={markSelectedAsComplete} disabled={selectedTasks.length === 0}>
            ✅ 選択を完了にする
          </button>
          <button onClick={deleteSelectedTasks} disabled={selectedTasks.length === 0}>
            🗑 選択を削除
          </button>
        </div>

        <button onClick={handleLogout} style={{ marginTop: 20 }}>
          ログアウト
        </button>
      </div>

      {/* ▼ ユーザー情報一覧ボタン（外に配置） ▼ */}
      {userId === 'tomo' && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button onClick={() => navigate('/Users')}>
            🧾 ユーザー情報一覧aa
          </button>
        </div>
      )}
    </>
  );
}

export default Todo;

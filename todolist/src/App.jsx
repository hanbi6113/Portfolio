import { useEffect, useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';

const SORT_OPTIONS = {
  status: '기본순',
  added: '추가순',
  alphabet: '가나다순',
  reverse: '역순',
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [sort, setSort] = useState('status'); // 기본 분류순

  // 초기 로딩 (3초 게이지)
  useEffect(() => {
    let value = 0;
    const interval = setInterval(() => {
      value += 2;
      setProgress(value);
      if (value >= 100) {
        clearInterval(interval);
        setTasks([
          { id: 1, title: '과제 구조 잡기', status: 'todo' },
          { id: 2, title: '기능 구현', status: 'doing' },
          { id: 3, title: '제출하기', status: 'done' },
        ]);
        setLoading(false);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // 작업 추가
  const addTask = (title) => {
    if (!title.trim()) return alert('작업 내용을 입력하세요.');
    setTasks(prev => [...prev, { id: Date.now(), title, status: 'todo' }]);
  };

  // 상태 변경
  const changeStatus = (id, status) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  // 필터 + 검색
  const filteredTasks = tasks
    .filter(task => filter === 'all' ? true : task.status === filter)
    .filter(task => task.title.toLowerCase().includes(search.toLowerCase()));

  // 로딩 UI
  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-6">
        <p className="text-4xl font-bold">로딩 중...</p>
        <div className="w-64 h-3 bg-gray-200 rounded overflow-hidden">
          <div className="h-full bg-black transition-all" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-sm text-gray-500">{progress}%</span>
      </div>
    );
  }

  return (
    <div className="max-w-[480px] mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Todo List</h1>

      <TaskInput onAdd={addTask} />

      <input
        className="w-full my-3 p-2 border rounded"
        placeholder="검색"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <TaskFilter current={filter} onChange={setFilter} />

      {/* 🔹 정렬 드롭다운 */}
      <select
        className="w-full my-3 p-2 border rounded"
        value={sort}
        onChange={e => setSort(e.target.value)}
      >
        {Object.entries(SORT_OPTIONS).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>

      <TaskList
        tasks={filteredTasks}
        onChangeStatus={changeStatus}
        currentFilter={filter}
        sort={sort}
      />
    </div>
  );
}

export default App;

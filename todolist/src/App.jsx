import { useEffect, useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [progress, setProgress] = useState(0);
  const [sort, setSort] = useState('added');

  // 초기 로딩 (3초 게이지)
  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += 2; // 2%씩 증가 → 약 3초
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
    if (!title.trim()) {
      alert('작업 내용을 입력하세요.');
      return;
    }

    setTasks(prev => [
      ...prev,
      { id: Date.now(), title, status: 'todo' },
    ]);
  };

  // 상태 변경
  const changeStatus = (id, status) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  // 필터 + 검색
  const filteredTasks = tasks
    .filter(task => (filter === 'all' ? true : task.status === filter))
    .filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );

  // 🔹 로딩 UI (게이지 + 중앙 정렬)
  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-6">
        <p className="text-4xl font-bold">로딩 중...</p>

        <div className="w-64 h-3 bg-gray-200 rounded overflow-hidden">
          <div
            className="h-full bg-black transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-sm text-gray-500">{progress}%</span>
      </div>
    );
  }

  // 에러 UI
  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="p-6 border rounded text-center">
          <p className="mb-4">에러가 발생했습니다. 다시 시도해 주세요.</p>
          <button
            className="px-4 py-2 rounded bg-gray-800 text-white"
            onClick={() => setError(false)}
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[480px] mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">
        Todo List
      </h1>

      <button
        className="mb-4 w-full py-2 rounded bg-red-500 text-white"
        onClick={() => setError(true)}
      >
        에러 발생
      </button>

      <TaskInput onAdd={addTask} />

      <input
        className="w-full my-3 p-2 border rounded"
        placeholder="검색"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <TaskFilter current={filter} onChange={setFilter} />

      <TaskList
        tasks={filteredTasks}
        onChangeStatus={changeStatus}
        currentFilter={filter}
      />
    </div>
  );
}

export default App;

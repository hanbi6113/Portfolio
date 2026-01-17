import { useState } from 'react';

export default function TaskInput({ onAdd }) {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    onAdd(value);
    setValue('');
  };

  return (
    <div className="flex gap-2 my-2">
      <input
        type="text"
        placeholder="오늘 할 일 입력"
        value={value}
        onChange={e => setValue(e.target.value)}
        className="flex-1 p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        추가
      </button>
    </div>
  );
}

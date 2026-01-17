const FILTERS = [
  { value: 'all', label: '전체' },
  { value: 'todo', label: '할 일' },
  { value: 'doing', label: '진행 중' },
  { value: 'done', label: '완료' },
];

export default function TaskFilter({ current, onChange }) {
  return (
    <div className="flex justify-center gap-2 my-4">
      {FILTERS.map(f => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`
            px-4 py-2 rounded-full font-semibold transition-colors duration-200
            ${current === f.value
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
          `}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

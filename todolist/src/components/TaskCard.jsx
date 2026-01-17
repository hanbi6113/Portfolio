const STATUS_LABEL = {
  todo: '할 일',
  doing: '진행 중',
  done: '완료',
};

// 상태별 색상 (배경 + 글자)
const STATUS_COLORS = {
  todo: 'bg-yellow-100 text-yellow-800',
  doing: 'bg-blue-100 text-blue-800',
  done: 'bg-green-100 text-green-800',
};

export default function TaskCard({ task, onChangeStatus }) {
  return (
    <div className={`p-4 rounded-lg shadow-md mb-3 flex justify-between items-center ${STATUS_COLORS[task.status]}`}>
      <span className="text-lg font-medium">{task.title}</span>
      
      <select
        value={task.status}
        onChange={e => onChangeStatus(task.id, e.target.value)}
        className="ml-4 px-2 py-1 rounded border bg-white"
      >
        {Object.entries(STATUS_LABEL).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

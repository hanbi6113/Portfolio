import TaskCard from './TaskCard';

// 상태별 정렬 순서 (할 일 → 진행 중 → 완료)
const STATUS_ORDER = {
  todo: 1,
  doing: 2,
  done: 3,
};

export default function TaskList({ tasks, onChangeStatus, currentFilter, sort }) {
  const emptyMessages = {
    all: "오늘의 할 일을 추가해 보세요!",
    todo: "할 일이 없네요. 새로운 일을 추가해 보세요.",
    doing: "진행 중인 일이 없습니다. 시작해 볼까요?",
    done: "완료한 일이 없어요. 열심히 해 봐요!",
  };

  if (!tasks.length) {
    return (
      <p className="text-center text-gray-500 mt-4 text-lg">
        {emptyMessages[currentFilter] || "할 일이 없습니다."}
      </p>
    );
  }

  // 🔹 정렬
  const sortedTasks = [...tasks].sort((a, b) => {
    switch(sort) {
      case 'status':
        return STATUS_ORDER[a.status] - STATUS_ORDER[b.status]; // 할 일 → 진행 중 → 완료
      case 'added':
        return a.id - b.id;
      case 'alphabet':
        return a.title.localeCompare(b.title, 'ko');
      case 'reverse':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-3">
      {sortedTasks.map(task => (
        <TaskCard key={task.id} task={task} onChangeStatus={onChangeStatus} />
      ))}
    </div>
  );
}

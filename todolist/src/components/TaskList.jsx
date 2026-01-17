import TaskCard from './TaskCard';

export default function TaskList({ tasks, onChangeStatus, currentFilter }) {
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

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onChangeStatus={onChangeStatus} />
      ))}
    </div>
  );
}

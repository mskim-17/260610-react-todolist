import Image from "next/image";
import { TaskType } from "../types/task";
import { useState } from "react";
import { getDateStr, getTodayStr, getTomorrow, getYesterday } from "../utils/date";

type ViewTaskProps = {
  task: TaskType,
  showDate: boolean,
  onEdit: (id: number, isCompleted: boolean, name: string, date: string) => void,
  onRemove: (id: number) => void
};

type ViewTasksProps = {
  tasks: TaskType[],
  onEdit: (id: number, isCompleted: boolean, name: string, date: string) => void,
  onRemove: (id: number) => void
};

type ViewTasksDateProps = ViewTasksProps & {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};

function ViewTask({ task, showDate, onEdit, onRemove }: ViewTaskProps) {

  const [isEditing, setIsEditing] = useState(task.isEditing);
  const [taskName, setTaskName] = useState(task.name);
  const [taskDate, setTaskDate] = useState(task.date);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "name") setTaskName(e.target.value);
    if (e.target.name == "date") setTaskDate(e.target.value);
    if (e.target.name == "isCompleted") setIsCompleted(Boolean(e.target.value));
  }

  return (
    <div className="flex justify-center items-center gap-3 border-b-1 border-zinc-300/30 py-1 w-full">
      <input
        type="checkbox"
        name="isCompleted"
        className={`w-[14px] h-[14px] box-border
                      disabled:opacity-30`}
        checked={isCompleted}
        disabled={isEditing}
        onChange={() => {
          const newIsCompleted = !isCompleted;
          setIsCompleted(newIsCompleted);
          onEdit(task.id, newIsCompleted, taskName, taskDate);
        }}
      />
      <input
        type="text"
        name="name"
        className={`outline-none text-[14px] ${isCompleted ? "text-zinc-400 line-through" : "font-semibold"}
                   w-[200px] h-[28px] box-border
                   not-focus:disabled:overflow-hidden not-focus:disabled:text-ellipsis
                   border border-zinc-300 rounded-full px-4
                   focus:not-disabled:shadow-lg focus:not-disabled:shadow-blue-500/30 focus:not-disabled:border-blue-300
                   disabled:border-transparent`}
        value={taskName}
        onChange={onChange}
        disabled={!isEditing} />
      <input
        type="date"
        name="date"
        min={getTodayStr()}
        className={`tabular-nums tracking-tighter text-[14px] 
                   outline-none w-[120px] h-[28px] box-border 
                   border border-zinc-300 rounded-full px-2
                   focus:not-disabled:shadow-lg focus:not-disabled:shadow-blue-500/30 focus:not-disabled:border-blue-300
                   ${showDate ? "disabled:border-transparent" : "disabled:opacity-0"}`}
        value={taskDate}
        onChange={onChange}
        disabled={!isEditing} />
      <button
        className="flex justify-center items-center
                   disabled:opacity-20 select-none hover:not-disabled:invert-70 hover:not-disabled:cursor-pointer"
        onClick={() => {
          if (!isEditing) {
            setIsEditing(true);
            return;
          }
          onEdit(task.id, isCompleted, taskName, taskDate);
          setIsEditing(false);
        }}
        disabled={isCompleted}
      ><Image
          src={isEditing ? "/images/floppy-disk-solid.svg" : "/images/pen-to-square-solid.svg"}
          width={16}
          height={16}
          alt="edit"
        /></button>
      <button
        className="flex justify-center items-center
                   disabled:opacity-20 select-none hover:not-disabled:invert-70 hover:not-disabled:cursor-pointer"
        onClick={() => { onRemove(task.id) }}
        disabled={isEditing || isCompleted}
      ><Image
          src="/images/xmark-solid.svg"
          width={12}
          height={12}
          alt="remove"
        /></button>
    </div>
  );
}


export function ViewTasksDate({ selectedDate, setSelectedDate, tasks, onEdit, onRemove }: ViewTasksDateProps) {

  return (
    <div>
      <div className="flex items-center justify-center mt-7">
        <button
          className="w-[16px] h-[16px] hover:cursor-pointer select-none"
          onClick={() => setSelectedDate(getDateStr(getYesterday(new Date(selectedDate))))}
        >
          <Image
            src="/images/angle-right-solid.svg"
            width={8}
            height={16}
            className="rotate-180"
            alt="edit"
          />
        </button>
        <div className="text-xl font-semibold tabular-nums w-[300px] text-center tracking-tight select-none">
          {selectedDate}
        </div>
        <button
          className="w-[16px] h-[16px] hover:cursor-pointer select-none"
          onClick={() => setSelectedDate(getDateStr(getTomorrow(new Date(selectedDate))))}
        >
          <Image
            src="/images/angle-right-solid.svg"
            width={8}
            height={16}
            alt="edit"
          />
        </button>
      </div>
      <div className="mt-5 w-full">
        {(tasks.filter((task) => task.date == selectedDate).length >= 1) ?
          tasks
            .filter((task) => task.date == selectedDate)
            .map((task) => <ViewTask showDate={false} task={task} key={task.id} onEdit={onEdit} onRemove={onRemove} />)
          : <div className="text-sm text-zinc-500 font-medium py-1 text-center w-full">🍵 계획이 없습니다.</div>}
      </div>
    </div>
  )
}

export function ViewTasksAll({ tasks, onEdit, onRemove }: ViewTasksProps) {
  return (
    <div className="mt-5 w-full">
      {(tasks.length >= 1) ?
        tasks
          .map((task) => <ViewTask showDate={true} task={task} key={task.id} onEdit={onEdit} onRemove={onRemove} />)
        : <div className="text-sm text-zinc-500 font-medium py-1 text-center w-full">🍵 계획이 없습니다.</div>}
    </div>
  )
}

export function ViewTasks({ tasks, onEdit, onRemove }: ViewTasksProps) {

  const [showAll, setShowAll] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(getTodayStr());

  return (
    <div className="w-[410px]">
      <div className="w-full flex flex-row-reverse items-center text-xs gap-3 font-medium mt-3">
        <input
          type="checkbox"
          name="showAll"
          className={`w-[14px] h-[14px] box-border
                      disabled:opacity-30`}
          checked={showAll}
          onChange={() => {
            const newShowAll = !showAll;
            setShowAll(newShowAll);
          }}
        /><div>모든 날짜의 계획 보기  </div>
      </div>
      <hr className="my-2 w-full border-zinc-300" />
      <div>
        {showAll
          ? <ViewTasksAll tasks={tasks} onEdit={onEdit} onRemove={onRemove} />
          : <ViewTasksDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} tasks={tasks} onEdit={onEdit} onRemove={onRemove} />}
      </div>
    </div>
  )
}
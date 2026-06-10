import Image from "next/image";
import { useState } from "react";
import { buttonBaseClass, buttonImageBaseClass, buttonImageShadowClass, buttonShadowClass } from "../styles/classes";
import { TaskType } from "../types/task";
import { getShiftedDateString, getTodayDateString } from "../utils/date";
import ViewTask from "./viewTask";


type ViewTasksProps = {
  tasks: TaskType[],
  onEdit: (id: number, isCompleted: boolean, name: string, date: string) => void,
  onRemove: (id: number) => void
};

type ViewTasksDateProps = ViewTasksProps & {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};

export function ViewTasksDate({ selectedDate, setSelectedDate, tasks, onEdit, onRemove }: ViewTasksDateProps) {

  return (
    <div>
      <div className="flex items-center justify-center mt-7">
        <button
          className={`${buttonBaseClass} ${buttonShadowClass.blue}`}
          onClick={() => setSelectedDate(getShiftedDateString(selectedDate, -1))}
        >
          <Image
            src="/images/angle-left-solid.svg"
            width={8}
            height={16}
            className={`${buttonImageBaseClass} ${buttonImageShadowClass.blue}`}
            alt="edit"
          />
        </button>
        <div className="text-xl font-semibold tabular-nums w-[300px] text-center tracking-tight select-none">
          {selectedDate}
        </div>
        <button
          className={`${buttonBaseClass} ${buttonShadowClass.blue}`}
          onClick={() => setSelectedDate(getShiftedDateString(selectedDate, 1))}
        >
          <Image
            src="/images/angle-right-solid.svg"
            width={8}
            height={16}
            alt="edit"
            className={`${buttonImageBaseClass} ${buttonImageShadowClass.blue}`}
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
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());

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
      <hr className="my-2 w-full border-zinc-300 dark:border-zinc-800" />
      <div>
        {showAll
          ? <ViewTasksAll tasks={tasks} onEdit={onEdit} onRemove={onRemove} />
          : <ViewTasksDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} tasks={tasks} onEdit={onEdit} onRemove={onRemove} />}
      </div>
    </div>
  )
}
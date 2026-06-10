import { useState } from "react";
import { TaskType } from "../types/task";
import { getTodayDateString } from "../utils/date";
import Image from "next/image";
import { buttonBaseClass, buttonImageBaseClass, buttonImageShadowClass, buttonShadowClass, imageBaseClass, inputDateBaseClass, inputTextBaseClass } from "../styles/classes";

type ViewTaskProps = {
  task: TaskType,
  showDate: boolean,
  onEdit: (id: number, isCompleted: boolean, name: string, date: string) => void,
  onRemove: (id: number) => void
};

export default function ViewTask({ task, showDate, onEdit, onRemove }: ViewTaskProps) {

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
    <div className="flex justify-center items-center gap-3 border-b-1 border-zinc-300 dark:border-zinc-800/30 py-1 w-full">
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
        className={`${inputTextBaseClass}
                    w-[200px] h-[28px]
                    text-[14px] 
                    ${isCompleted ? "text-zinc-400 line-through" : "font-semibold"}
                  `}
        value={taskName}
        onChange={onChange}
        disabled={!isEditing} />
      <input
        type="date"
        name="date"
        min={getTodayDateString()}
        className={`${inputDateBaseClass}
                    text-[14px]
                    w-[120px] h-[28px]
                    ${showDate ? "disabled:border-transparent" : "disabled:opacity-0"}`}
        value={taskDate}
        onChange={onChange}
        disabled={!isEditing} />
      <button
        className={`${buttonBaseClass} ${buttonShadowClass.blue}`}
        onClick={() => {
          if (!isEditing) {
            setIsEditing(true);
            return;
          }
          onEdit(task.id, isCompleted, taskName, taskDate);
          setIsEditing(false);
        }}
        disabled={isCompleted}
      >
        <Image
          src={isEditing ? "/images/floppy-disk-solid.svg" : "/images/pen-to-square-solid.svg"}
          width={16}
          height={16}
          alt="edit"
          className={`${imageBaseClass} ${buttonImageBaseClass} ${buttonImageShadowClass.blue}`}
        />
      </button>
      <button
        className={`${buttonBaseClass} ${buttonShadowClass.red}`}
        onClick={() => { onRemove(task.id) }}
        disabled={isEditing || isCompleted}
      >
        <Image
          src="/images/xmark-solid.svg"
          width={12}
          height={12}
          alt="remove"
          className={`${imageBaseClass} ${buttonImageBaseClass} ${buttonImageShadowClass.red}`}
        />
      </button>
    </div>
  );
}
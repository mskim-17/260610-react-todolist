import { useState } from "react";
import { TaskType } from "../types/task";
import { getTodayDateString } from "../utils/date";
import Image from "next/image";
import { buttonBaseClass, buttonImageBaseClass, buttonImageShadowClass, buttonShadowClass, imageBaseClass, inputDateBaseClass, inputTextBaseClass } from "../styles/classes";

type ViewTaskProps = {
  task: TaskType,
  showDate: boolean,
  onEdit: (id: number, isCompleted: boolean, name: string, date: string) => void,
  onSave: () => void;
  onRemove: (id: number) => void
};

export default function ViewTask({ task, showDate, onEdit, onSave, onRemove }: ViewTaskProps) {

  const [isEditing, setIsEditing] = useState(task.isEditing);
  const [taskStatus, setTaskStatus] = useState({
    name: task.name,
    date: task.date,
    isCompleted: task.isCompleted
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value, checked, type } = e.target;

    const newValue =
    type === "checkbox"
      ? checked
      : value;

    const newTaskStatus = {
      ...taskStatus,
      [name]: newValue,
    };

    setTaskStatus(newTaskStatus);
    onEdit(task.id, newTaskStatus.isCompleted, newTaskStatus.name, newTaskStatus.date);
  }

  return (
    <div className="flex justify-center items-center gap-3 border-b-1 border-zinc-300/30 dark:border-zinc-700/30 py-1 w-full">
      <input
        type="checkbox"
        name="isCompleted"
        className={`w-[14px] h-[14px] box-border
                      disabled:opacity-30`}
        checked={taskStatus.isCompleted}
        disabled={isEditing}
        onChange={onChange}
      />
      <input
        type="text"
        name="name"
        className={`${inputTextBaseClass}
                    w-[200px] h-[28px]
                    text-[14px] 
                    ${taskStatus.isCompleted ? "text-zinc-400 line-through" : "font-semibold"}
                  `}
        value={taskStatus.name}
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
        value={taskStatus.date}
        onChange={onChange}
        disabled={!isEditing} />
      <button
        className={`${buttonBaseClass} ${buttonShadowClass.blue}`}
        onClick={() => {
          if (!isEditing) {
            setIsEditing(true);
            return;
          }
          onSave();
          setIsEditing(false);
        }}
        disabled={taskStatus.isCompleted}
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
        disabled={isEditing || taskStatus.isCompleted}
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
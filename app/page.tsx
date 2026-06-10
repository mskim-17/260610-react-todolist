"use client"

import { useRef, useState } from "react";
import CreateTask from "./components/createTask";
import { TaskType, TaskInputType } from "./types/task";
import { ViewTasks, ViewTasksDate } from "./components/viewTasks";
import { getDateStr, getTodayStr, getTomorrow, getYesterday } from "./utils/date";
import Image from "next/image";

export default function Home() {

  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [taskInputs, setTaskInputs] = useState({
    name: '',
    date: getTodayStr()
  });
  const nextId = useRef(0);


  const { name, date } = taskInputs;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInputs({
      ...taskInputs,
      [event.target.name]: event.target.value
    });
  }

  const onCreate = () => {
    if (name.trim() === '') return;
    setTasks([
      ...tasks,
      {
        id: nextId.current++,
        name: name,
        date: date,
        isEditing: false,
        isCompleted: false
      }
    ].sort((a, b) => (
      10000 * (new Date(a.date).getDate() - new Date(b.date).getDate()) +
      a.id - b.id
    )))
    setTaskInputs({ ...taskInputs, name: "" }); // date는 연달아 쓸 수 있도록 유지
  }

  const onEdit = (id: number, isCompleted: boolean, name: string, date: string) => {
    setTasks(
      tasks.map((task) => (
        task.id == id 
        ? {...task, isCompleted: isCompleted, name: name, date: date} 
        : task)
    ).sort((a, b) => (
      10000 * (new Date(a.date).getDate() - new Date(b.date).getDate()) +
      a.id - b.id
    )));
  }

  const onRemove = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  }


  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-xl flex-col items-center py-32 px-16 bg-white dark:bg-black ">
        <h1 className="text-4xl font-bold text-center mb-5 select-none">📌 TODO LIST</h1>
        {/* Create Task */}
        <CreateTask name={name} date={date} onChange={onChange} onCreate={onCreate} />
        {/* View Task */}
        <ViewTasks tasks={tasks} onEdit={onEdit} onRemove={onRemove} />
      </main>
    </div>
  );
}

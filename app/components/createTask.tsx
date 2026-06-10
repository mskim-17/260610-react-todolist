import { useState } from "react";
import { getTodayStr } from "../utils/date";
import Image from "next/image";

type CreateTaskProps = {
  name: string,
  date: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onCreate: () => void
};

export default function CreateTask({ name, date, onChange, onCreate }: CreateTaskProps) {


  return (
    <div className="flex items-center gap-3 my-1">
      <input
        type="text"
        name="name"
        value={name}
        className="outline-none text-[14px] font-semibold
                   w-[200px] h-[28px] box-border 
                   border border-zinc-300 rounded-full px-4
                   focus:shadow-lg focus:shadow-blue-500/30 focus:border-blue-300"
        onChange={onChange}
      />
      <input
        type="date"
        name="date"
        value={date}
        min={getTodayStr()}
        className="tabular-nums tracking-tighter text-[14px] 
                   outline-none w-[120px] h-[28px] box-border 
                   border border-zinc-300 rounded-full px-2
                   focus:shadow-lg focus:shadow-blue-500/30 focus:border-blue-300"
        onChange={onChange}
      />
      <button
        className="flex justify-center items-center
                   disabled:opacity-20 select-none hover:not-disabled:invert-70 hover:not-disabled:cursor-pointer"
        onClick={onCreate}
        disabled={name.trim() === ''}
      ><Image
          src="/images/plus-solid.svg"
          width={14}
          height={14}
          alt="add"
        /></button>
    </div>
  );
}
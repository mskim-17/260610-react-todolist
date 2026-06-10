import Image from "next/image";
import { buttonBaseClass, buttonImageBaseClass, buttonImageShadowClass, buttonShadowClass, inputDateBaseClass, inputTextBaseClass } from "../styles/classes";
import { getTodayDateString } from "../utils/date";

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
        className={`${inputTextBaseClass}
                    text-[14px] font-semibold
                    w-[200px] h-[28px]`}
        onChange={onChange}
      />
      <input
        type="date"
        name="date"
        value={date}
        min={getTodayDateString()}
        className={`${inputDateBaseClass}
                    text-[14px] 
                    w-[120px] h-[28px]`}
        onChange={onChange}
      />
      <button
        className={`${buttonBaseClass} ${buttonShadowClass.blue}`}
        onClick={onCreate}
        disabled={name.trim() === ''}
      ><Image
          src="/images/plus-solid.svg"
          width={14}
          height={14}
          alt="add"
          className={`${buttonImageBaseClass} ${buttonImageShadowClass.blue}`}
        /></button>
    </div>
  );
}
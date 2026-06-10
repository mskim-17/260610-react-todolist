import Image from "next/image";
import { buttonBaseClass, buttonImageBaseClass, buttonImageShadowClass, buttonShadowClass, imageBaseClass, inputDateBaseClass, inputTextBaseClass, labelBaseCase } from "../styles/classes";
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
      <div className="flex flex-col">
        <label className={`${labelBaseCase}`}>작업명</label>
        <input
          type="text"
          name="name"
          value={name}
          className={`${inputTextBaseClass}
                    text-[14px] font-semibold
                    w-[200px] h-[28px]`}
          onChange={onChange}
        />
      </div>
      <div className="flex flex-col">
        <label className={`${labelBaseCase}`}>기한</label>
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
      </div>
      <button
        className={`mt-[16.5px] ${buttonBaseClass} ${buttonShadowClass.blue}`}
        onClick={onCreate}
        disabled={name.trim() === ''}
      >
        <Image
          src="/images/plus-solid.svg"
          width={14}
          height={14}
          alt="add"
          className={`${imageBaseClass} ${buttonImageBaseClass} ${buttonImageShadowClass.blue}`}
        />
      </button>
    </div>
  );
}
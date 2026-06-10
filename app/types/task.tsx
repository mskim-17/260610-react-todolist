export type TaskType = {
  id: number,
  name: string,
  date: string,
  isEditing: boolean,
  isCompleted: boolean
};

export type TaskInputType = {
  name: string,
  date: string,
};
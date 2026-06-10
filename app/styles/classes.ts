export const inputBaseClass = `
  bg-white dark:bg-zinc-800 disabled:bg-transparent
  box-border rounded-full
  border border-zinc-300 dark:border-zinc-600 
  outline-none
  focus:enabled:shadow-lg focus:enabled:shadow-blue-500/30 focus:enabled:border-blue-400
`;

export const inputTextBaseClass = `
  ${inputBaseClass}
  px-4
  not-focus:disabled:overflow-hidden not-focus:disabled:text-ellipsis
  disabled:border-transparent
`;

export const inputDateBaseClass = `
  ${inputBaseClass}
  px-2
  tabular-nums tracking-tighter
  dark:[&::-webkit-calendar-picker-indicator]:invert
`;


export const buttonBaseClass = `
  group select-none
  flex justify-center items-center
  disabled:opacity-20
  enabled:hover:cursor-pointer
`;

export const buttonShadowClass = {
  blue: "dark:enabled:hover:drop-shadow-[0_0_8px_theme(colors.blue.500)]",
  red:  "dark:enabled:hover:drop-shadow-[0_0_8px_theme(colors.red.500)]",
} as const;

export const imageBaseClass = `
  dark:invert
`;

export const buttonImageBaseClass = `
  duration-150
  group-enabled:group-hover:scale-120
  group-enabled:group-active:scale-90
`;

export const buttonImageShadowClass = {
  blue: "group-enabled:group-hover:drop-shadow-[0_0_8px_theme(colors.blue.500)]",
  red:  "group-enabled:group-hover:drop-shadow-[0_0_8px_theme(colors.red.500)]",
} as const;
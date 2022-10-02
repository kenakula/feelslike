export const compareDates = (date1: Date, noteDate: Date): boolean => {
  const resetedDate = new Date(noteDate.setHours(0, 0, 0, 0));

  return date1.getTime() === resetedDate.getTime();
};

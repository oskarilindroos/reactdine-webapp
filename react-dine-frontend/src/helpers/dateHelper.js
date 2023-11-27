export const getWeekDay = (date) => {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekDay = date.getDay();
  return weekDays[weekDay];
};

const nthNumber = (number) => {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const readableDate = (dateObj) => {
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getFullYear();

  return {
    day: day,
    nth: nthNumber(day),
    month: month,
    year: year,
  };
};

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const formatAMPM = (date) => {
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const currentDayOfWeek = daysOfWeek[date.getDay()];

  return {
    hour: date.getHours() % 12 || 12,
    minutes: minutes,
    seconds: date.getSeconds(),
    ampm: date.getHours() < 12 ? "AM" : "PM",
    currentDayOfWeek,
  };
};

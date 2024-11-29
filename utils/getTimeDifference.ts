export default function getTimeDifference(d1: Date, d2: Date) {
  const startDate = d1 < d2 ? d1 : d2;
  const endDate = d1 < d2 ? d2 : d1;

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();
  let hours = endDate.getHours() - startDate.getHours();

  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    const previousMonth = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      0,
    );
    days += previousMonth.getDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days, hours };
}

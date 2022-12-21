export function ChartSetLabels(props) {
  if (props.interval === 0) {
    return ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];
  } else if (props.interval === 1) {
    try {
      let date = new Date(props.currentYear, props.currentMonth, 1);
      let month = date.getMonth();
      let year = date.getFullYear();
      let daysInMonth = new Date(year, month + 1, 0).getDate();
      let labels = [];
      for (let i = 1; i <= daysInMonth; i++) {
        labels.push(i);
      }
      return labels;
    } catch (e) {
      console.log(e);
    }
  } else if (props.interval === 2) {
    return [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ];
  }
}

export function ChartSetData(props) {
  if (props.interval === 0) {
    let data = [0, 0, 0, 0, 0, 0, 0];
    let prevSunday = new Date();
    let nextSunday = new Date();
    prevSunday.setDate(prevSunday.getDate() - prevSunday.getDay() + 7 * props.arrowValue);
    nextSunday.setDate(nextSunday.getDate() - nextSunday.getDay() + 7 * (props.arrowValue + 1));
    props.setStartDate(prevSunday.getDate() + 1 + "." + (prevSunday.getMonth() + 1) + "." + prevSunday.getFullYear());
    props.setEndDate(nextSunday.getDate() + "." + (nextSunday.getMonth() + 1) + "." + nextSunday.getFullYear());
    // go through all incomes
    props.incomes.forEach((income) => {
      // if income.data is not in current week or
      if (new Date(income.data) < prevSunday || new Date(income.data) >= nextSunday) return;
      // if first income.data is in current week, add income value to data
      if (new Date(income.data) >= prevSunday) {
        let day = new Date(income.data).getDay();
        if (day === 0) day = 6;
        else day = day - 1;
        data[day] += parseFloat(income.kwota);
      }
    });
    return data;
  } else if (props.interval === 1) {
    let data = [];
    let prevMonth = new Date();
    let nextMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth() + props.arrowValue);
    nextMonth.setMonth(nextMonth.getMonth() + props.arrowValue + 1);
    props.setStartDate(prevMonth.getMonth() + 1 + "." + prevMonth.getFullYear());
    props.setCurrentMonth(prevMonth.getMonth());
    props.setCurrentYear(prevMonth.getFullYear());
    props.setEndDate("");
    // go through all incomes
    props.incomes.forEach((income) => {
      // if income.data is not in current month or
      if (
        new Date(income.data).getMonth() !== prevMonth.getMonth() ||
        new Date(income.data).getFullYear() !== prevMonth.getFullYear()
      )
        return;
      // if first income.data is in current month, add income value to data
      if (new Date(income.data).getMonth() === prevMonth.getMonth()) {
        let day = new Date(income.data).getDate();
        if (data[day - 1] === undefined) data[day - 1] = 0;
        data[day - 1] += parseFloat(income.kwota);
      }
    });
    return data;
  } else if (props.interval === 2) {
    let data = [];
    let prevYear = new Date();
    let nextYear = new Date();
    prevYear.setFullYear(prevYear.getFullYear() + props.arrowValue);
    nextYear.setFullYear(nextYear.getFullYear() + props.arrowValue + 1);
    props.setStartDate(prevYear.getFullYear());
    props.setEndDate(nextYear.getFullYear());
    // go through all incomes
    props.incomes.forEach((income) => {
      // if income.data is not in current year or
      if (new Date(income.data).getFullYear() !== prevYear.getFullYear()) return;
      // if first income.data is in current year, add income value to data
      if (new Date(income.data).getFullYear() === prevYear.getFullYear()) {
        let month = new Date(income.data).getMonth();
        if (data[month] === undefined) data[month] = 0;
        data[month] += parseFloat(income.kwota);
      }
    });
    return data;
  }
}

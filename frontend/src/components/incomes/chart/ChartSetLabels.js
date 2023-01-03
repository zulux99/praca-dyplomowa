import { GetIncomesFromDateToDate } from "../GetIncomesFromDateToDate";

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
    // fill array with nulls
    let data = Array(7).fill(null);
    let prevSunday = new Date();
    let nextSunday = new Date();
    prevSunday.setDate(prevSunday.getDate() - prevSunday.getDay() + 7 * props.arrowValue);
    nextSunday.setDate(nextSunday.getDate() - nextSunday.getDay() + 7 * (props.arrowValue + 1));
    props.setStartDate(prevSunday.getDate() + 1 + "." + (prevSunday.getMonth() + 1) + "." + prevSunday.getFullYear());
    props.setEndDate(nextSunday.getDate() + "." + (nextSunday.getMonth() + 1) + "." + nextSunday.getFullYear());
    let sum = 0;
    GetIncomesFromDateToDate({
      date_from: prevSunday.getFullYear() + "-" + (prevSunday.getMonth() + 1) + "-" + (prevSunday.getDate() + 1),
      date_to: nextSunday.getFullYear() + "-" + (nextSunday.getMonth() + 1) + "-" + nextSunday.getDate(),
      user: props.user,
    }).then((response) => {
      if (response === -1) return;
      response.forEach((income) => {
        let day = new Date(income.data).getDay();
        if (day === 0) day = 6;
        else day = day - 1;
        data[day] += parseFloat(income.kwota);
        sum += parseFloat(income.kwota);
      });
      props.setSum(sum);
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
    let sum = 0;
    GetIncomesFromDateToDate({
      date_from: prevMonth.getFullYear() + "-" + (prevMonth.getMonth() + 1) + "-01",
      date_to:
        prevMonth.getFullYear() +
        "-" +
        (prevMonth.getMonth() + 1) +
        "-" +
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate(),
      user: props.user,
    }).then((response) => {
      if (response === -1) return;
      console.log(response);
      response.forEach((income) => {
        let day = new Date(income.data).getDate();
        if (data[day - 1] === undefined) data[day - 1] = 0;
        data[day - 1] += parseFloat(income.kwota);
        sum += parseFloat(income.kwota);
      });
      props.setSum(sum);
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
    let sum = 0;
    GetIncomesFromDateToDate({
      date_from: prevYear.getFullYear() + "-01-01",
      date_to: prevYear.getFullYear() + "-12-31",
      user: props.user,
    }).then((response) => {
      if (response === -1) return;
      response.forEach((income) => {
        let month = new Date(income.data).getMonth();
        if (data[month] === undefined) data[month] = 0;
        data[month] += parseFloat(income.kwota);
        sum += parseFloat(income.kwota);
      });
      props.setSum(sum);
    });
    return data;
  }
}

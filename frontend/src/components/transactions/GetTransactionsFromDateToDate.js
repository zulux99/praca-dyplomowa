import axios from "axios";

export async function GetTransactionsFromDateToDate(props) {
  try {
    if (props.incomes) {
      const response = await axios.get(
        "/api/transactions/?" + "&incomes" + "&date_from=" + props.date_from + "&date_to=" + props.date_to,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.user.authTokens.access}`,
          },
        }
      );
      return response.data;
    } else if (props.expenses) {
      const response = await axios.get(
        "/api/transactions/?" + "&expenses" + "&date_from=" + props.date_from + "&date_to=" + props.date_to,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.user.authTokens.access}`,
          },
        }
      );
      return response.data;
    } else {
      const response = await axios.get(
        "/api/transactions/?" + "&date_from=" + props.date_from + "&date_to=" + props.date_to,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.user.authTokens.access}`,
          },
        }
      );
      return response.data;
    }
  } catch (err) {
    return -1;
  }
}

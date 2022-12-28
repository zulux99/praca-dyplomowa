import axios from "axios";

export async function GetTransactionsFromDateToDate(props) {
  try {
    const response = await axios.get("/api/transactions/" + props.date_from + "/" + props.date_to + "/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.user.authTokens.access}`,
      },
    });
    return response.data;
  } catch (err) {
    return -1;
  }
}

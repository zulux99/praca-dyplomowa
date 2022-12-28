import axios from "axios";

export async function GetIncomesFromDateToDate(props) {
  try {
    const response = await axios.get("/api/incomes/" + props.date_from + "/" + props.date_to + "/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.user.authTokens.access}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return -1;
  }
}

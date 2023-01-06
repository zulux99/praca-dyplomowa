import axios from "axios";

export async function DeleteDebt(props) {
  try {
    const response = await axios.delete("/api/debts/" + props.id + "/", {
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

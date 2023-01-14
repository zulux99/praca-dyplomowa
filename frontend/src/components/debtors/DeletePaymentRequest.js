import axios from "axios";

export async function DeletePayment(props) {
  try {
    const response = await axios.delete("/api/debts/payments/" + props.id + "/", {
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

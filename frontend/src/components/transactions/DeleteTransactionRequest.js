import axios from "axios";

export async function DeleteTransaction(props) {
  try {
    const response = await axios.delete("/api/transactions/" + props.id + "/", {
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

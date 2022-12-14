import axios from "axios";

export async function GetAllDebts(user) {
  try {
    const response = await axios.get(`/api/debts/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.authTokens.access}`,
      },
    });
    return response.data;
  } catch (err) {
    return -1;
  }
}

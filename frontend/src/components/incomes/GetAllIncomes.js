import axios from "axios";

export async function GetAllIncomes(user) {
  try {
    const response = await axios.get("/api/incomes/", {
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

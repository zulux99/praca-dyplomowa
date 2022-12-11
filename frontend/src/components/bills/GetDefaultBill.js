import axios from "axios";

export async function GetDefaultBill(user) {
  try {
    const response = await axios.get("/api/bills/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.authTokens.access}`,
      },
    });
    const defaultBill = response.data.find((bill) => bill.domyslne === true);
    return defaultBill;
  } catch (error) {
    return -1;
  }
}

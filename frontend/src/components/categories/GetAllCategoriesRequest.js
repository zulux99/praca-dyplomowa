import axios from "axios";

export async function GetAllCategories(user) {
  try {
    const response = await axios.get("/api/categories/", {
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

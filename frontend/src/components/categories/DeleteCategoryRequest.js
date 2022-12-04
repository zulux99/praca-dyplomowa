import axios from "axios";

export async function DeleteCategory(user, categoryId) {
  try {
    const response = await axios.delete("/api/categories/" + categoryId + "/", {
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

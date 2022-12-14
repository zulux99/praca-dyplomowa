import axios from "axios";

export async function AddCategory(user, categoryName, isIncome) {
  const user_id = user.user.user_id;
  try {
    const response = await axios.post(
      "/api/categories/",
      JSON.stringify({ user: user_id, nazwa: categoryName, przychod: isIncome }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.authTokens.access}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    return -1;
  }
}

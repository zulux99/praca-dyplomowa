import axios from "axios";

export async function AddTransaction(user, value, date, billId, categoryId, isIncome, description) {
  try {
    const response = await axios.post(
      "/api/transactions/",
      JSON.stringify({
        user: user.user.user_id,
        kwota: value,
        data: date,
        rachunek: billId,
        kategoria: categoryId,
        przychod: isIncome,
        opis: description,
      }),
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

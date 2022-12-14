import axios from "axios";

export async function AddTransaction(user, value, date, billId, categoryId, isIncome, description) {
  try {
    // const response = await axios.post(
    //   "/api/transactions",
    //   JSON.stringify({
    //     user: user.user.user_id,
    //     kwota: value,
    //     data: date,
    //     rachunek: billId,
    //     kategoria: categoryId,
    //     przychod: isIncome,
    //     opis: description,
    //   }),
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${user.authTokens.access}`,
    //     },
    //   }
    // );
    // return response.data;
    console.log("user: " + user.user.user_id);
    console.log("kwota: " + value);
    console.log("data: " + date);
    console.log("rachunek: " + billId);
    console.log("kategoria: " + categoryId);
    console.log("przychod: " + isIncome);
    console.log("opis: " + description);
  } catch (err) {
    return -1;
  }
}

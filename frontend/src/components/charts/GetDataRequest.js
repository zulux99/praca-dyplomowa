import axios from "axios";

export async function GetData(props) {
  try {
    const response = await axios.get(props.url, {
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

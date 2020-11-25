import { useDispatch } from "react-redux";
import { logged } from "./actions";
import { USER_TOKEN_KEY } from "./keys";

const dispatch = useDispatch();

export async function hasToken() {
  const tokens = JSON.parse(localStorage.getItem(USER_TOKEN_KEY));
  if (!(tokens && tokens.refresh_token)) return;
  const refreshToken = tokens.refresh_token;

  const response = await fetch(
    "https://fast-users.herokuapp.com/api/v1/auth/refresh",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    }
  );
  const json = await response.json();
  if (response.status === 200) {
    dispatch(logged(json));
  }
}

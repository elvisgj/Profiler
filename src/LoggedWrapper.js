import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logged } from "./actions";
import { BASE_URL, USER_TOKEN_KEY } from "./keys";
import LoadingAnimation from "./Loading";

function LoggedWarpper(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (isAuth) {
      async function refreshToken() {
        const tokens = JSON.parse(localStorage.getItem(USER_TOKEN_KEY));
        const refreshToken = tokens.refresh_token;

        const response = await fetch(`${BASE_URL}/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: refreshToken,
          }),
        });
        const json = await response.json();
        if (response.status === 200) {
          dispatch(logged(json));
        }
      }

      const value = setInterval(() => {
        refreshToken();
      }, 240000);

      return () => {
        clearInterval(value);
      };
    }
  }, [isAuth, dispatch]);

  useEffect(() => {
    async function refreshToken() {
      const tokens = JSON.parse(localStorage.getItem(USER_TOKEN_KEY));
      if (!(tokens && tokens.refresh_token)) {
        setLoading(false);
        return;
      }
      const refreshToken = tokens.refresh_token;
      const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: refreshToken,
        }),
      });
      const json = await response.json();

      if (response.status === 200) {
        dispatch(logged(json));
      }
      setLoading(false);
    }
    refreshToken();
  }, [dispatch]);

  if (loading) {
    return <LoadingAnimation />;
  }
  return <div>{props.children}</div>;
}

export default LoggedWarpper;

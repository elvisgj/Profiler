import React from "react";
import { BASE_URL, USER_TOKEN_KEY } from "./keys";
import useFetch from "./useFetch";
import LoadingAnimation from "./Loading";

function SpecificUser(props) {
  const token = JSON.parse(localStorage.getItem(USER_TOKEN_KEY));
  const access = token.access_token;
  const userID = props.match.params.id;

  const options = {
    url: `${BASE_URL}/users/${userID}`,
    method: "GET",
    headers: {
      Authorization: access,
    },
  };

  const { data, loading } = useFetch(options);

  if (loading) {
    return <LoadingAnimation />;
  }

  return <div>{data.email}</div>;
}

export default SpecificUser;

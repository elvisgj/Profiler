import React from "react";
import useFetch from "./useFetch";
import { BASE_URL, USER_TOKEN_KEY } from "./keys";
import LoadingAnimation from "./Loading";

function UserHome(props) {
  const token = JSON.parse(localStorage.getItem(USER_TOKEN_KEY));
  const access = token.access_token;

  const options = {
    url: `${BASE_URL}/users/me`,
    method: "GET",
    headers: {
      Authorization: access,
    },
  };

  const { data, loading } = useFetch(options);

  var dateCreated = "";
  var dateUpdated = "";
  if (data) {
    const dateFormat = new Intl.DateTimeFormat("en", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      hour12: false,
      minute: "numeric",
    });
    const a = new Date(data.created_at);
    dateCreated = dateFormat.format(a);
    const b = new Date(data.updated_at);
    dateUpdated = dateFormat.format(b);
  }

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <div className="flex justify-center mt-16">
        <div className="grid grid-cols-1 border-2 md:grid md:grid-cols-2 border-blue-300 m-8 p-4 rounded">
          <div>Email:</div>
          <div className="font-black mb-4">{data ? data.email : ""}</div>
          <div>Account ID:</div>
          <div className="font-black mb-4">{data ? data.id : ""}</div>
          <div>Your account is created at:</div>
          <div className="font-black mb-4">{data ? dateCreated : ""}</div>
          <div>Last update:</div>
          <div className="font-black mb-4">{data ? dateUpdated : ""}</div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;

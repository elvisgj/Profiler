import React from "react";
import useFetch from "./useFetch";
import { BASE_URL, USER_TOKEN_KEY } from "./keys";
import LoadingAnimation from "./Loading";
import UserDetails from "./UserDetails";

function ProfileUser() {
  const token = JSON.parse(localStorage.getItem(USER_TOKEN_KEY));
  const access = token.access_token;

  const options = {
    url: `${BASE_URL}/users`,
    method: "GET",
    headers: {
      Authorization: access,
    },
  };

  const { data, loading } = useFetch(options);
  let users = [];
  if (data) {
    users = data.map((user) => <UserDetails key={user.id} users={user} />);
  }

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="flex flex-col m-4 items-center">
      <p className="font-semibold text-center font-mono">
        All users of the app
      </p>
      {users}
    </div>
  );
}

export default ProfileUser;

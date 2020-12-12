import React from "react";
import { Link } from "react-router-dom";

function UserDetails(props) {
  return (
    <Link
      className="grid border-2 grid-cols-3
    border-blue-300 m-8 p-4 rounded md:gap-y-4 w-full md:w-1/2"
      to={`/users/${props.users.id}`}
    >
      <span className="col-span-3 md:col-span-1">Email</span>
      <span className="font-black col-span-3 md:col-span-2">
        {props.users.email}
      </span>
      <span className="col-span-3 md:col-span-1">ID</span>
      <span className="font-black col-span-3 md:col-span-2">
        {props.users.id}
      </span>
    </Link>
  );
}

export default UserDetails;

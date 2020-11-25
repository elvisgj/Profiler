import React from "react";

function UserDetails(props) {
  return (
    <div
      className="grid border-2 grid-cols-3
    border-blue-300 m-8 p-4 rounded md:gap-y-4 w-full md:w-1/2"
    >
      <span className="col-span-3 md:col-span-1">Email</span>
      <span className="font-black col-span-3 md:col-span-2">
        {props.users.email}
      </span>
      <span className="col-span-3 md:col-span-1">ID</span>
      <span className="font-black col-span-3 md:col-span-2">
        {props.users.id}
      </span>
    </div>
  );
}

export default UserDetails;

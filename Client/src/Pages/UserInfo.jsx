import React from "react";

const UserInfo = ({ user }) => {
  return (
    <div>
      <h1>User Name: {user?.displayName}</h1>
      <h2>Email: {user?.email}</h2>
    </div>
  );
};

export default UserInfo;

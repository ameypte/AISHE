import React from "react";
import isLoggedIn from "../components/isLoggedIn";

export default function Courses() {
  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    window.location.href = "/";
    alert("You are not logged in");
    return null;
  }
  
  return (
    <div>
      <h1>Courses Page</h1>
    </div>
  );
}

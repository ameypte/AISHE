import React from 'react'
import isLoggedIn from "../components/isLoggedIn";


export default function Financials() {
  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    window.location.href = "/";
    alert("You are not logged in");
    return null;
  }
  return (
    <div>
      <h1>Financial Information Page</h1>
    </div>
  )
}

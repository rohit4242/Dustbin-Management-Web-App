import React, { useEffect } from "react";

const SendSMS = ({ to, message }) => {
  useEffect(() => {
    const API_BASE_URL = "http://localhost:3000";

    fetch(API_BASE_URL + "/sms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: to,
        msg: message,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, []);
};

export default SendSMS;

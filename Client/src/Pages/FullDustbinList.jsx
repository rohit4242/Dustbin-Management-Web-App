import { onValue, ref } from "firebase/database";
import React, { useState, useEffect } from "react";
import Spinner from "../Components/Spinner";
import { db } from "../firebase";

const FullDustbinList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fullDustbin, setFullDustbin] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const val = [];
    onValue(ref(db, "smartbin"), (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().level > 80) {
          val.push({
            key: childSnapshot.key,
            data: childSnapshot.val(),
          });
          setIsLoading(false);
          sendSMS(
            "+917069588487",
            `Your Dustbin ${childSnapshot.key} is ${
              childSnapshot.val().level
            }% Full`
          );
        }
      });
    });
    setFullDustbin(val);
  }, []);

  const sendSMS = (to, message) => {
    const API_BASE_URL = "https://dustbin-management-web-app-server.vercel.app";

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
        return response.text();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  };

  if (isLoading) return <Spinner />;
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Index
            </th>
            <th scope="col" className="px-6 py-3">
              Dustbin name
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Level
            </th>
          </tr>
        </thead>
        <tbody>
          {fullDustbin &&
            fullDustbin.map((value, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index}
                  </th>
                  <td className="px-6 py-4">{value?.key}</td>
                  <td className="px-6 py-4">{value.data?.address}</td>
                  <td className="px-6 py-4">{value.data?.level}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default FullDustbinList;

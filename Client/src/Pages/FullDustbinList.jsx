import { onValue, ref } from "firebase/database";
import React, { useState, useEffect } from "react";
import Spinner from "../Components/Spinner";
import { db } from "../firebase";

const FullDustbinList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [FullDustbin, setFullDustbin] = useState(null);

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
        }
      });
    });
    setFullDustbin(val);
  }, [FullDustbin]);

  if (isLoading) return <Spinner />;
  return (
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Index
            </th>
            <th scope="col" class="px-6 py-3">
              Dustbin name
            </th>
            <th scope="col" class="px-6 py-3">
              Location
            </th>
            <th scope="col" class="px-6 py-3">
              Level
            </th>
          </tr>
        </thead>
        <tbody>
          {FullDustbin &&
            FullDustbin.map((value, index) => {
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index}
                  </th>
                  <td class="px-6 py-4">{value?.key}</td>
                  <td class="px-6 py-4">{value.data?.address}</td>
                  <td class="px-6 py-4">{value.data?.level}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default FullDustbinList;

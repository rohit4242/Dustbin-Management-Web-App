import { onValue, ref } from "firebase/database";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";
import { db } from "../firebase";

const DustbinDetails = () => {
  const { dustbinId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [dustbinInfo, setDustbinInfo] = useState(null);

  console.log(dustbinId);
  useEffect(() => {
    if (dustbinId) {
      setIsLoading(true);
      onValue(
        ref(db, "smartbin/" + dustbinId),
        (snapshot) => {
          console.log(snapshot.val());
          setDustbinInfo(snapshot.val());
          setIsLoading(false);
        },
        {
          onlyOnce: true,
        }
      );
    }
  }, [dustbinId]);

  if (isLoading) return <Spinner />;
  let i = 1;
  return (
    <div>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Dustbin name
              </th>
              <th scope="col" class="px-6 py-3">
                Address
              </th>
              <th scope="col" class="px-6 py-3">
                Level
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {i++}
              </th>
              <td class="px-6 py-4">{dustbinInfo?.address}</td>
              <td class="px-6 py-4">{dustbinInfo?.level}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DustbinDetails;

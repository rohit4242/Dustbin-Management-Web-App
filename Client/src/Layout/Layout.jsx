import React, { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import NotFound from "../Pages/NotFound";
import DustbinList from "../Pages/DustbinList";
import DustbinDetails from "../Pages/DustbinDetails";
import UserInfo from "../Pages/UserInfo";
import FullDustbinList from "../Pages/FullDustbinList";
import SendSMS from "../Components/SendSMS";

const Layout = ({ user }) => {
  const [menu, setMenu] = useState(true);
  return (
    <>
      <NavBar menu={menu} setMenu={setMenu} user={user} />
      <SideBar menu={menu} />

      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/listAll" element={<DustbinList />} />
            <Route
              path="/dustbinDetail/:dustbinId"
              element={<DustbinDetails />}
            />
            <Route path="/fullDustbinList" element={<FullDustbinList/>} />
            <Route path="/sendSMS" element={<SendSMS/>} />

            <Route path="/userInfo" element={<UserInfo user={user} />} />

            {/* <Route path="/create" element={<Create />} />
            <Route path="/videoDetail/:videoId" element={<VideoPinDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/userDetail/:userId" element={<UserProfile />} />
            <Route path="/accountInfo" element={<AccountInfo user={user}/>} /> */}
          </Routes>

          {/* <div class="grid grid-cols-3 gap-4 mb-4">
            <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
          </div>
          <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
          </div>
          <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Layout;

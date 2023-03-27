import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import NotFound from "./Pages/NotFound";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { fetchUser, userAccessToken } from "./Utils/fetchUser";
function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = userAccessToken();
    if (!accessToken) {
      navigate("/signin", { replace: true });
    } else {
      const [userInfo] = fetchUser();
      setUser(userInfo);
    }
  }, []);

  return (
    <Routes>
      <Route path="signIn" element={<SignIn />} />
      <Route path="signUp" element={<SignUp />} />
      <Route path="/*" element={<Layout user={user} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

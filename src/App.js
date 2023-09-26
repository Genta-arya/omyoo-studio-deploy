import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./View/Home/Index";
import DetailNotFound from "./View/Home/Component/NotFound";

import Jobs from "./View/Jobs/Index";
import SplashScreen from "./View/Splash";
import SlotMachine from "./View/Game/Slot/Index";
import GameList from "./View/Game";
import "./Style/Animation.css";
import QuizApp from "./View/Game/Quiz/Index";
import FormOrder from "./View/Order";

import FailedPage from "./View/Order/Component/Failed";
import Success from "./View/Order/Component/succes";
import Pending from "./View/Order/Component/Pending";
import LoginForm from "./View/Admin/Auth/Login/Login";

import Dashboard from "./View/Admin/Index";
import Mobile from "./View/Admin/Component/Mobile";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Router>
      {loading ? (
        <SplashScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/slot" element={<SlotMachine />} />
          <Route path="/quiz" element={<QuizApp />} />
          <Route path="/game" element={<GameList />} />
          <Route path="/form-order" element={<FormOrder />} />
          <Route path="/login-admin" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/akses-ditolak" element={<Mobile />} />
          <Route path="/sukses" element={<Success />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/gagal" element={<FailedPage />} />
          <Route path="*" element={<DetailNotFound />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;

//

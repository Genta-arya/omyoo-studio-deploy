import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Component/SideBar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    document.title = `OmYoo-Studio | Dashboard`;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");


    if (!token) {
      navigate("/login-admin");
    }
  }, [navigate]);

 

  useEffect(() => {
    if (isMobile) {
      navigate("/akses-ditolak");
    }
  }, [isMobile, navigate]);

  return (
    <div className="flex">
      <Sidebar />
    </div>
  );
};

export default Dashboard;

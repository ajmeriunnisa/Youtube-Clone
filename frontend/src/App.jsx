import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ON FIRST LOAD → sidebar open on desktop, closed on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
    else setIsSidebarOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        {/* Sidebar*/}
        <Outlet/>
      <Sidebar isOpen={isSidebarOpen} /> 
    </div>
  );
}

export default App;
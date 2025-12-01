import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // search text state
  const [searchQuery, setSearchQuery] = useState("");
  // category state
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ON FIRST LOAD → sidebar open on desktop, closed on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
    else setIsSidebarOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ---------------------- HEADER (always at top) ---------------------- */}
      <Header 
      onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      onSearch={setSearchQuery}
      selectedCategory={selectedCategory}
      onCategorySelect={setSelectedCategory}/>

      <div className="flex">

        {/* ---------------------- SIDEBAR ---------------------- */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* ---------------------- MAIN CONTENT ---------------------- */}
        <main
          className={`
            flex-1 p-4 transition-all duration-300 ml-0
            ${isSidebarOpen ? "lg:ml-56" : "lg:ml-20"}
          `}
        >
          <Outlet context={{ searchQuery , selectedCategory }} />
        </main>

      </div>
    </div>
  );
}

export default App;
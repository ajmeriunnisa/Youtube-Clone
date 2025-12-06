import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
    else setIsSidebarOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onSearch={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
         />

        <main className={`flex-1 p-4 transition-all duration-300 ml-0 ${isSidebarOpen ? "lg:ml-56" : "lg:ml-20"}`}>
          <Outlet context={{ searchQuery: searchQuery, selectedCategory: selectedCategory }} />
        </main>
      </div>
    </div>
  );
}

export default App;

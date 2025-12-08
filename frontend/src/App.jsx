// Main App layout with responsive sidebar and header
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Set initial sidebar state based on screen size
  useEffect(() => {
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
    else setIsSidebarOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with search and navigation */}
      <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onSearch={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <div className="relative flex">
        {/* Collapsible sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main content area */}
        <main
          className={`flex-1 p- overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "lg:ml-56" : "lg:ml-20"}`}
        >
          <Outlet
            context={{
              searchQuery,
              selectedCategory,
              setSelectedCategory
            }}
          />
        </main>
        {/* DARK OVERLAY when sidebar open on small/medium screens */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 sm:bg-black/40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;

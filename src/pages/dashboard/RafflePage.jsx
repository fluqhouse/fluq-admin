// 📁 src/pages/dashboard/RafflePage.jsx
import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";

const RafflePage = () => {
  const handleLogout = () => console.log("Logout clicked");

  const raffleNav = [
    { href: "/raffle", text: "Home", icon: <span>🏠</span>, active: true },
    { href: "/raffle/draws", text: "Draws", icon: <span>🎟️</span>, active: false },
    { href: "/raffle/winners", text: "Winners", icon: <span>🏆</span>, active: false },
  ];

  return (
    <Layout navItems={raffleNav} isAuthenticated={true} logout={handleLogout}>
      <h2 className="text-2xl font-bold mb-4">Raffle Page</h2>
      <p className="text-slate-300">This is Raffle’s custom navigation layout.</p>
    </Layout>
  );
};

export default RafflePage;

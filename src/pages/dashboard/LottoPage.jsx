// 📁 src/pages/dashboard/LottoPage.jsx
import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";

const LottoPage = () => {
  const handleLogout = () => console.log("Logout clicked");

  const lottoNav = [
    { href: "/lotto", text: "Home", icon: <span>🏠</span>, active: true },
    { href: "/lotto/analytics", text: "Analytics", icon: <span>📊</span>, active: false },
    { href: "/lotto/market", text: "Market", icon: <span>🛒</span>, active: false },
  ];

  return (
    <Layout navItems={lottoNav} isAuthenticated={true} logout={handleLogout}>
      <h2 className="text-2xl font-bold mb-4">Lotto Page</h2>
      <p className="text-slate-300">This is Lotto’s custom navigation layout.</p>
    </Layout>
  );
};

export default LottoPage;

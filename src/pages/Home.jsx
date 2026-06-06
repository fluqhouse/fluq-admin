import { PortalCard } from "../components/home/PortalCard";
import useAuth from "../hooks/useAuth";
import { PORTALS, getAccessiblePortals, ROLES } from "../constants";

const Home = () => {
  const { isAuthenticated, user, logout } = useAuth();

  // Get accessible portals based on user role
  // If not authenticated, show all portals (user will need to login)
  // If authenticated, superadmin sees all, others see only their portal
  const cards = isAuthenticated && user?.role
    ? getAccessiblePortals(user.role)
    : PORTALS;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="pt-12 pb-8 text-center relative">
        {/* Logout button for logged in users */}
        {isAuthenticated && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-300">
                Logged in as {user?.currentRole || user?.role}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-center mb-8 pt-8">
          <div className="w-33 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/20">
            <div className="w-28 h-28 bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">FH</span>
            </div>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          FLUQ HOUSE
        </h1>
        <p className="text-gray-400 text-lg">Admin Portal</p>
        {isAuthenticated && (
          <p className="text-blue-400 text-sm mt-2">Choose a role to switch to or re-login</p>
        )}
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <PortalCard key={index} title={card.title} description={card.description} role={card.role} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

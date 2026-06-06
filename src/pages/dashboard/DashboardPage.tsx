  // import useAuth from "../../hooks/useAuth";


  // type User = {
  //   email?: string;
  //   role?: string;
  //   // add other user properties if needed
  // };

  // export const Dashboard = () => {
  //   const { user, isAuthenticated, logout } = useAuth() as {
  //     user: User | null;
  //     isAuthenticated: boolean;
  //     logout: () => void;
  //   };
  //   console.log("Dashboard user:", user);

  //   return (
  //     <div className="min-h-screen bg-grey-400 flex">
  //       {/* Fixed Sidebar */}
  //       <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
  //         {/* Sidebar Header */}
  //         <div className="p-6 border-b border-gray-200">
  //           <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
  //         </div>
          
  //         {/* Sidebar Navigation */}
  //         <nav className="flex-1 p-4">
  //           <ul className="space-y-2">
  //             <li>
  //               <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition duration-200">
  //                 Home
  //               </a>
  //             </li>
  //             <li>
  //               <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition duration-200">
  //                 Profile
  //               </a>
  //             </li>
  //             <li>
  //               <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition duration-200">
  //                 Settings
  //               </a>
  //             </li>
  //             <li>
  //               <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition duration-200">
  //                 Analytics
  //               </a>
  //             </li>
  //           </ul>
  //         </nav>
          
  //         {/* Sidebar Footer */}
  //         <div className="p-4 border-t border-gray-200">
  //           {isAuthenticated && (
  //             <button
  //               onClick={logout}
  //               className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
  //             >
  //               Logout
  //             </button>
  //           )}
  //         </div>
  //       </div>

  //       {/* Main Content Area */}
  //       <div className="flex-1 ml-64">
  //         <div className="flex items-center justify-center min-h-screen p-8">
  //           <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
  //             {isAuthenticated ? (
  //               <>
  //                 <h1 className="text-2xl font-semibold text-gray-800 mb-2">
  //                   Welcome back{user?.email ? `, ${user.email}` : ""}!
  //                 </h1>

  //                 {user?.role && (
  //                   <p className="text-sm text-gray-500 mb-4">
  //                     Role:{" "}
  //                     <span className="font-medium text-grey-600">{user.role}</span>
  //                   </p>
  //                 )}

  //                 <p className="text-gray-400 mb-6">
  //                   You are logged in to your dashboard.
  //                 </p>
  //               </>
  //             ) : (
  //               <p className="text-lg text-grey-400">Please log on to continue.</p>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  import useAuth from "../../hooks/useAuth";

  type User = {
    email?: string;
    role?: string;
    // add other user properties if needed
  };

  export const Dashboard = () => {
    const { user, isAuthenticated, logout } = useAuth() as {
      user: User | null;
      isAuthenticated: boolean;
      logout: () => void;
    };
    console.log("Dashboard user:", user);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Fixed Navbar */}
        <nav className="fixed top-0 left-64 right-0 h-16 bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50 z-40">
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-white">Admin Portal</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              
              
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <span className="text-slate-300 text-sm hidden md:block">
                  {user?.email || 'Guest'}
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* Fixed Sidebar */}
        <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-800/95 backdrop-blur-sm border-r border-slate-700/50 z-50">
          {/* Sidebar Header */}
          <div className="flex items-center justify-center h-16 border-b border-slate-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">FH</span>
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">FLUQ HOUSE</h2>
                {/* <p className="text-slate-400 text-xs">Admin Portal</p> */}
              </div>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-white bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30 transition-all duration-200 hover:from-blue-600/30 hover:to-purple-600/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </a>

            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-slate-300 rounded-lg transition-all duration-200 hover:text-white hover:bg-slate-700/50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Profile</span>
            </a>

            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-slate-300 rounded-lg transition-all duration-200 hover:text-white hover:bg-slate-700/50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Settings</span>
            </a>

            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-slate-300 rounded-lg transition-all duration-200 hover:text-white hover:bg-slate-700/50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Analytics</span>
            </a>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-700/50">
            {isAuthenticated && (
              <button
                onClick={logout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-slate-300 bg-slate-700/50 rounded-lg transition-all duration-200 hover:text-white hover:bg-red-600/20 hover:border-red-500/30 border border-transparent"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="ml-64 pt-16 min-h-screen">
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              {isAuthenticated ? (
                <>
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                      Welcome back{user?.email ? `, ${user.email}` : ""}!
                    </h1>
                    {user?.role && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 mb-4">
                        <span className="text-sm text-blue-300">
                          Role: <span className="font-medium text-white">{user.role}</span>
                        </span>
                      </div>
                    )}
                    <p className="text-slate-300 text-lg">
                      You are logged in to your dashboard.
                    </p>
                  </div>

                  {/* Dashboard Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">Lotto Manager</h3>
                          <p className="text-slate-400 text-sm">Manage lottery transactions and portfolio tracking</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">Raffle Manager</h3>
                          <p className="text-slate-400 text-sm">Handle raffle transactions and portfolio tracking</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 text-center">
                  <h1 className="text-2xl font-bold text-white mb-4">Please log in to continue.</h1>
                  <p className="text-slate-400">Access your dashboard by logging in with your credentials.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  };
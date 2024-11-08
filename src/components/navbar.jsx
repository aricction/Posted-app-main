import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebase";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <nav className="bg-blue-500 p-4 text-white shadow-xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">POSTED</h1>
        </div>
        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <>
              {user && user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full space-x-4"
                />
              )}
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="border-solid rounded border-2 border-white p-2 w-fit">
                <h3>
                  <Link to="/login" className="text-white">
                    Login
                  </Link>
                </h3>
              </div>
              <div className="border-solid rounded border-2 border-white p-2 w-fit">
                <h3>
                  <Link to="/register" className="text-white">
                    Sign up
                  </Link>
                </h3>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

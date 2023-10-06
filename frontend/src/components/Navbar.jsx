// Navbar.js
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth(); // Asegúrate de tener una función de logout en tu contexto de autenticación
  console.log(user);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    console.log("Toggle user menu");
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  useEffect(() => {
    console.log("User:", user);
    console.log("Usuario autenticado " + isAuthenticated);
  }, [user]);

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <NavLink
                to="/" // Usamos NavLink para que los estilos se apliquen cuando estemos en la página de inicio
                //Clase activa para resaltar el enlace activo
              >
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </NavLink>
              <NavLink
                to="/" // Usamos NavLink para que los estilos se apliquen cuando estemos en la página de inicio
                className="text-white ml-2 text-sm font-medium"
                activeClassName="text-indigo-400" // Clase activa para resaltar el enlace activo
              >
                Developer Forum
              </NavLink>
            </div>

            

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NavLink
                  to="/"
                  exact
                  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                  activeClassName="text-indigo-400"
                  aria-current="page"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/team"
                  className="text-gray-300 hover-bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  activeClassName="text-indigo-400"
                >
                  Team
                </NavLink>
                <NavLink
                  to="/about"
                  className="text-gray-300 hover-bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  activeClassName="text-indigo-400"
                >
                  About
                </NavLink>
                <Link
                  to="/contact"
                  className="text-gray-300 hover-bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>
            <div className="relative ml-3">
              <div>
                {user ? (
                  <div className="relative inline-block text-left">
                    <button
                      type="button"
                      id="user-menu-button"
                      aria-expanded={isUserMenuOpen}
                      onClick={toggleUserMenu}
                      aria-haspopup="true"
                      className="text-white group rounded-md inline-flex items-center text-base font-medium hover:text-white focus:outline-none"
                    >
                      <span className="mr-2">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                          alt=""
                        />
                      </span>
                      <span className="hidden sm:inline-block">
                        Hello, {user.username}
                      </span>
                      
                    </button>
                    {isUserMenuOpen && (
                      <div
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex="-1"
                      >
                        {/* Contenido del menú */}
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          tabIndex="-1"
                        >
                          Your Profile
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          tabIndex="-1"
                        >
                          Settings
                        </a>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={logout}
                          role="menuitem"
                          tabIndex="-1"
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/iniciar-sesion" className="text-white">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <NavLink
            to="/"
            exact
            className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
            activeClassName="text-indigo-400"
            aria-current="page"
          >
            Home
          </NavLink>
          <NavLink
            to="/team"
            className="text-gray-300 hover-bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            activeClassName="text-indigo-400"
          >
            Team
          </NavLink>
          <NavLink
            to="/about"
            className="text-gray-300 hover-bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            activeClassName="text-indigo-400"
          >
            About
          </NavLink>
          <Link
            to="/contact"
            className="text-gray-300 hover-bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

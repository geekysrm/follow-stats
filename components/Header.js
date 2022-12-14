import { useState, useRef, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Header({ user }) {
  const node = useRef();

  const [open, setOpen] = useState(false);
  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <header>
      <div className="relative bg-white">
        <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6 md:justify-start md:space-x-10 lg:px-8">
          <div className="flex items-center justify-start space-x-2 lg:w-0 lg:flex-1">
            <Link href="/">
              <a>
                <span className="sr-only">FollowStats</span>
                <img
                  className="w-auto h-6 sm:h-10"
                  src="/images/logo.jpg"
                  alt="logo"
                />
              </a>
            </Link>
          </div>

          <div className="flex items-center justify-end md:flex md:flex-1 lg:w-0">
            <a
              href="https://github.com/geekysrm/followstats"
              target="_blank"
              rel="noreferrer noopener"
              className="text-base font-medium text-gray-800 whitespace-nowrap hover:text-gray-900"
            >
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-base font-medium text-gray-800 bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                <FaGithub className="mr-1" /> View Source
              </button>
            </a>

            {user ? (
              <div>
                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setOpen(true)}
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-8 h-8 rounded-full"
                        src={user.picture}
                        alt={user.name}
                      />
                    </button>
                  </div>

                  {open && (
                    <div
                      className="absolute right-0 z-50 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg w-50 ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                    >
                      <div>
                        <p className="block px-4 py-2 font-bold text-gray-700 text-md">
                          {user.name}
                        </p>
                        <p className="block px-4 pb-2 text-sm text-gray-500 overflow-ellipsis">
                          {user.email}
                        </p>
                      </div>

                      <Link href="/api/auth/logout">
                        <a
                          ref={node}
                          href="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Log out
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link href="/user">
                <a className="inline-flex items-center justify-center px-4 py-2 ml-4 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:bg-blue-700 bg-opacity-90">
                  Login
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

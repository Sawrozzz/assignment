import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { User2Icon } from "lucide-react";
import LogoutModal from "./LogoutModal";

export default function Navbar() {
  const logout = useAuthStore((state) => state.logout);

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setIsLogoutOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Logout successfull");
  };

  return (
    <nav className=" sticky top-0 z-50 bg-emerald-500 text-white px-12 py-4 shadow-md flex justify-between items-center">
      <div
        onClick={() => {
          navigate("/dashboard");
        }}
        className="text-2xl font-bold"
      >
        BYSAWROZ
      </div>

      <ul className="flex space-x-6">
        <li>
          <Link
            to="/dashboard"
            className="hover:text-emerald-200 transition-colors"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/favourite"
            className="hover:text-emerald-200 transition-colors"
          >
            Favourite
          </Link>
        </li>
        <li className="relative pt-2">
          <span className="absolute -top-1 left-1/2 z-10 -translate-x-1/2 rounded-md bg-emerald-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            Buyer
          </span>

          <button
            onClick={handleLogoutClick}
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-emerald-50 text-emerald-600 transition-all hover:border-emerald-500 hover:bg-white hover:text-emerald-500 active:scale-95 border border-transparent shadow-sm"
            title="Logout"
          >
            <User2Icon size={20} />
          </button>

          <LogoutModal
            isOpen={isLogoutOpen}
            onClose={() => setIsLogoutOpen(false)}
            onConfirm={handleLogout}
          />
        </li>
      </ul>
    </nav>
  );
}

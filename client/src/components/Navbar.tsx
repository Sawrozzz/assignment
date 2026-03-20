import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export default function Navbar() {
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Logout successfull");
  };

  return (
    <nav className="bg-emerald-500 text-white px-8 py-4 shadow-md flex justify-between items-center">
      <div className="text-2xl font-bold">BYSAWROZ</div>

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
        <li>
          <button
            onClick={handleLogout}
            className="hover:text-emerald-200 transition-colors"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

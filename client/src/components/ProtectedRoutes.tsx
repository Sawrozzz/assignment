import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function ProtectedNavs() {
  return (
    <div>
      <Navbar />
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
}

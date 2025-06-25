// AuthLayout.js
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div>
      {/* Không có Header, chỉ render route con */}
      <Outlet />
    </div>
  );
}

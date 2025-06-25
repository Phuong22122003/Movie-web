// AuthLayout.js
import { Outlet } from "react-router-dom";
import Header from "../components/header/header";

export default function AdminLayout() {
 return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Nơi các route con sẽ được render */}
      </main>
    </>
  );
}

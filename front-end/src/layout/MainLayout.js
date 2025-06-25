// MainLayout.js
import { Outlet } from "react-router-dom";
import Header from "../components/header/header";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Nơi các route con sẽ được render */}
      </main>
    </>
  );
}

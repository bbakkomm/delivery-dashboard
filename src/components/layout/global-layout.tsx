import { Outlet } from "react-router";

export default function GlobalLayout() {
  return (
    <div className="app-shell min-h-[100vh]">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

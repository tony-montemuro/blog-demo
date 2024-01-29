import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <div>
      <h1>Test</h1>
      <Outlet />
    </div>
  );
};
import { Outlet } from "react-router-dom";


export default function AuthLayout() {
  return (
    <main className="min-h-screen bg-[#F6F4F0] flex items-center justify-center">
      <Outlet />
    </main>
  )
}

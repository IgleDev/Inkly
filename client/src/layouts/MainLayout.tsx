import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom";
export default function MainLayout() {
  const { isError, isLoading } = useAuth();
  if(isLoading) return 'Cargando...'
  if(isError) { return <Navigate to="/auth/login" /> } 
  return (
    <>
      <main className="min-h-screen bg-[#F6F4F0] px-4 sm:px-0">
        <Outlet />
      </main>
    </>
  )
}
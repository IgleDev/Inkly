import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom";

export default function MainLayout() {
  const { data, isError, isLoading } = useAuth();

  if(isLoading) return 'Cargando...'

  if(isError) {
    return <Navigate to="/auth/login" />
  } 

  return (
    <>
      <header>
        {data.name}
      </header>
      <main className="min-h-screen bg-orange-400 flex items-center justify-center">

        <Outlet />
      </main>
    </>
  )
}

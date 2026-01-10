import LoginForm from "@/components/auth/LoginForm";

export default function LoginView() {
  return (
    <div className="mt-10 p-10 mx-auto max-w-3xl">
      <h1 className="text-center text-white font-black text-5xl">Inicia Sesión {'📕​'}</h1>
      <div>
        <LoginForm />
      </div>
    </div>
  )
}

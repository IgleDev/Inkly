import LoginForm from "@/components/auth/LoginForm";
export default function LoginView() {
  return (
    <div className="mt-6 sm:mt-10 p-5 sm:p-10 mx-auto w-full max-w-3xl">
      <h1 className="text-center text-[#C53F56] font-black text-3xl sm:text-5xl">Inicia Sesión {'📕'}</h1>
      <div>
        <LoginForm />
      </div>
    </div>
  )
}
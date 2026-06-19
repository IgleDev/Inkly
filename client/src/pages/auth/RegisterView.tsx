import RegisterForm from "@/components/auth/RegisterForm";
export default function RegisterView() {
  return (
    <div className="mt-6 sm:mt-10 p-5 sm:p-10 mx-auto w-full max-w-3xl">
      <h1 className="text-center text-[#C53F56] font-black text-3xl sm:text-5xl">Crea tu perfil {'📕'}</h1>
      <div>
        <RegisterForm />
      </div>
    </div>
  )
}
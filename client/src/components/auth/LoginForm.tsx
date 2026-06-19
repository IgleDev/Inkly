import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { AUTH_TOKEN } from "@/config/config";
import { loginAccount } from "@/api/AuthAPI";
import type { iUserFormLogin } from "@/types/types";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function LoginForm() {
  const initialValues: iUserFormLogin = { email: "", password: "", };

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<iUserFormLogin>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: loginAccount,
    onError: (error) => console.log(error),
    onSuccess: (data) => {
      reset();
      localStorage.setItem(AUTH_TOKEN, data!);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
  });

  const handleRegister = (formData: iUserFormLogin) => {
    mutate(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-8 p-6 sm:p-10 rounded-2xl w-full" noValidate>
        <div className="flex flex-col gap-2 w-full max-w-96">
          <label className="text-lg font-semibold text-[#C53F56]" htmlFor="email">
            Email
          </label>
          <input id="email" type="email" placeholder="correo@correo.com" className="duo-input w-full"
            {...register("email", {
              required: "El Correo es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />

          {errors.email && (<ErrorMessage>{errors.email.message}</ErrorMessage>)}
        </div>

        <div className="flex flex-col gap-2 w-full max-w-96">
          <label className="text-lg font-semibold text-[#C53F56]" htmlFor="password">
            Contraseña
          </label>

          <input id="password" type="password" placeholder="···············" className="duo-input w-full"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: 8,
            })}
          />

          {errors.password && (<ErrorMessage>{errors.password.message}</ErrorMessage>)}
        </div>
        <input type="submit" value="INICIAR SESIÓN" className="w-full mt-6 bg-[#C53F56] hover:bg-[#d8455e] text-white text-xl font-extrabold py-4 rounded-xl shadow-lg active:scale-95 transition cursor-pointer" />
      </form>

      <nav className="mt-10 flex flex-col space-y-4 px-4 sm:px-0">
        <Link to={"/auth/register"} className="text-center text-[#C53F56] font-bold">
          ¿No tienes Cuenta? Crea una cuenta!
        </Link>
      </nav>
    </>
  );
}
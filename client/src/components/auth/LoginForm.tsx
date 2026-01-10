import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { iUserFormLogin } from "@/types/types";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAccount } from "@/api/AuthAPI";

export default function LoginForm() {

  const initialValues: iUserFormLogin = { email: "", password: ""};

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<iUserFormLogin>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn : loginAccount,
    onError : (error) => (console.log(error)),
    onSuccess : (data) => { 
      reset(); 
      localStorage.setItem('AUTH_TOKEN', data!);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/')
    }
  })

  const handleRegister = (formData : iUserFormLogin) => { mutate(formData); }

  return (
    <>
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-8 p-10 rounded-2xl" noValidate>      
        <div className="flex flex-col gap-2 w-96">
          <label className="text-lg font-semibold text-white" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="correo@correo.com"
            className="duo-input"
            {...register("email", {
              required: "El Correo es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-2 w-96">
          <label className="text-lg font-semibold text-white" htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="···············"
            className="duo-input"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength : 8
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="INICIAR SESIÓN"
          className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white text-xl font-extrabold py-4 rounded-xl 
            shadow-lg active:scale-95 transition cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={"/auth/register"}
          className="text-center text-white font-bold"
        >
          ¿No tienes Cuenta? Crea una cuenta!
        </Link>
        <Link
          to={"/auth/forgot-password"}
          className="text-center text-white font-bold"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  );
}

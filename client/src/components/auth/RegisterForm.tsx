import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { iUserForm } from "@/types/types";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthAPI";

export default function RegisterForm() {

  const initialValues: iUserForm = { name: "", secondName: "", email: "", password: "", reg: 0 };

  const { register, handleSubmit, reset, formState: { errors } } = useForm<iUserForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn : createAccount,
    onError : (error) => (console.log(error)),
    onSuccess : (data) => {console.log(data); reset();}
  })

  const handleRegister = (formData : iUserForm) => { mutate(formData); }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10 rounded-2xl"
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold text-white" htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              placeholder="Juan Pérez"
              className="duo-input"
              {...register("name", {
                required: "El Nombre es obligatorio",
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold text-white" htmlFor="secondName">Apellido</label>
            <input
              id="secondName"
              type="text"
              placeholder="Osorio Lago"
              className="duo-input"
              {...register("secondName", {
                required: "El Apellido es obligatorio",
              })}
            />
            {errors.secondName && (
              <ErrorMessage>{errors.secondName.message}</ErrorMessage>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
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

          <div className="flex flex-col gap-2">
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
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-white">
            Región
          </label>

          <select className="duo-select"
            {...register("reg", {
              required: "Selecciona una región",
              valueAsNumber: true
            })}
          >
            <option value="">Selecciona tu región</option>
            <option value="1">España</option>
            <option value="1">México</option>
            <option value="1">Argentina</option>
            <option value="1">Colombia</option>
          </select>
          
          {errors.reg && (
            <ErrorMessage>{errors.reg.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="CREAR CUENTA"
          className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white text-xl font-extrabold py-4 rounded-xl 
            shadow-lg active:scale-95 transition cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={"/auth/login"}
          className="text-center text-white font-bold"
        >
          Ya tienes cuenta? Inicia Sesión!
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

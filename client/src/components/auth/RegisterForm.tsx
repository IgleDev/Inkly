import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { createAccount } from "@/api/AuthAPI";
import countries from "@/json/countries.json";
import type { iUserForm } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export default function RegisterForm() {

  const navigate = useNavigate();
  const initialValues: iUserForm = { name: "", secondName: "", email: "", password: "", reg: "", privacidad : false };

  const { register, handleSubmit, reset, formState: { errors } } = useForm<iUserForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn : createAccount,
    onError : (error) => (console.log(error), reset()),
    onSuccess : () => { navigate('/auth/login');}
  })

  const handleRegister = (formData: iUserForm) => {
    const { privacidad: _, ...rest } = formData;
    void _;
    mutate(rest);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10 rounded-2xl"
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold text-[#C53F56]" htmlFor="name">Nombre</label>
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
            <label className="text-lg font-semibold text-[#C53F56]" htmlFor="secondName">Apellido</label>
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
            <label className="text-lg font-semibold text-[#C53F56]" htmlFor="email">
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
            <label className="text-lg font-semibold text-[#C53F56]" htmlFor="password">Contraseña</label>
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
          <label className="text-lg font-semibold text-[#C53F56]">
            Región
          </label>

          <select className="duo-select"
            {...register("reg", {
              required: "Selecciona una región",
            })}
          >
            <option value="">Selecciona tu región</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>{country.name}</option>
            ))}
          </select>
          
          {errors.reg && (
            <ErrorMessage>{errors.reg.message}</ErrorMessage>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 leading-relaxed">
          <p>
            Tus datos (nombre, apellidos, email, foto, biografía, contraseña y región) serán tratados por{" "}
            <strong>Inkly</strong> para gestionar tu acceso a la plataforma.
            Base jurídica: ejecución de un contrato (Art. 6.1.b RGPD). No cedemos datos
            a terceros salvo obligación legal. Puedes ejercer tus derechos escribiendo a{" "}
            <a href="mailto: adriiglesias2016@gmail.com" className="underline font-semibold">
              adriiglesias2016@gmail.com
            </a>
            . Más info en nuestra{" "}
            <Link to="/privacidad" className="underline font-semibold">
              Política de Privacidad
            </Link>
            .
          </p>
        </div>

        <div className="flex items-start gap-3">
          <input
            id="privacidad"
            type="checkbox"
            className="mt-1 w-4 h-4 accent-[#C53F56] cursor-pointer flex-shrink-0"
            {...register("privacidad", {
              required: "Debes aceptar la política de privacidad para continuar",
            })}
          />
          <label htmlFor="privacidad" className="text-sm text-gray-600 cursor-pointer">
            He leído y acepto la{" "}
            <Link to="/privacidad" className="text-[#C53F56] font-semibold underline">
              Política de Privacidad
            </Link>{" "}
            y los{" "}
            <Link to="/terminos" className="text-[#C53F56] font-semibold underline">
              Términos y Condiciones
            </Link>
            .{" "}
            <span className="text-red-500">*</span>
          </label>
        </div>
        {errors.privacidad && <ErrorMessage>{errors.privacidad.message}</ErrorMessage>}

        <input
          type="submit"
          value="CREAR CUENTA"
          className="w-full mt-6 bg-[#C53F56] hover:bg-[#d8455e] text-white text-xl font-extrabold py-4 rounded-xl 
            shadow-lg active:scale-95 transition cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={"/auth/login"}
          className="text-center text-[#C53F56] font-bold"
        >
          Ya tienes cuenta? Inicia Sesión!
        </Link>
        <Link
          to={"/auth/forgot-password"}
          className="text-center text-[#C53F56] font-bold"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  );
}

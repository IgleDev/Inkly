import ErrorMessage from "../ErrorMessage";
import countries from "@/json/countries.json";
import type { iUserFormEdit } from "@/types/types";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";

interface iPerfilAccountForm {
    register : UseFormRegister<iUserFormEdit>,
    errors : FieldErrors<iUserFormEdit>
}

export default function PerfilAccountForm({ register, errors } : iPerfilAccountForm) {
    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-col mt-5">
                    <label className="text-lg font-semibold text-[#02be95]" htmlFor="name">
                        Nombre
                    </label>
                    <input id="name" type="text" className="w-96 border-2 border-gray-400 p-2 rounded-xl text-2xl" {...register("name", {
                        required: "El Nombre es obligatorio",
                    })} />
                    {errors.name && <ErrorMessage>{errors.name?.message}</ErrorMessage>}
                </div>
                <div className="flex flex-col mt-5">
                    <label className="text-lg font-semibold text-[#02be95]" htmlFor="name">
                        Apellidos
                    </label>
                    <input id="secondName" type="text" className="w-96 border-2 border-gray-400 p-2 rounded-xl text-2xl" {...register("secondName", {
                        required: "El Apellido es obligatorio",
                    })} />
                    {errors.secondName && <ErrorMessage>{errors.secondName?.message}</ErrorMessage>}
                </div>
                <div className="flex flex-col mt-5">
                    <label className="text-lg font-semibold text-[#02be95]" htmlFor="description">
                        Descripción
                    </label>
                    <textarea id="description" className="w-3/4 border-2 border-gray-400 p-2 rounded-xl text-2xl h-56 resize-none" {...register("description")} />
                    {errors.description && <ErrorMessage>{errors.description?.message}</ErrorMessage>}
                </div>
                <div className="flex flex-col mt-5">
                    <label className="text-lg font-semibold text-[#02be95]" htmlFor="email">
                        Email
                    </label>
                    <input id="text" type="mail" className="w-3/4 border-2 border-gray-400 p-2 rounded-xl text-2xl" {...register("email", {
                        required: "El Emial es obligatorio",
                        pattern: { value: /\S+@\S+\.\S+/, message: "E-mail no válido" },
                    })} />
                    {errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
                </div>
                <div className="flex flex-col mt-5">
                    <label className="text-lg font-semibold text-[#02be95]" htmlFor="reg">
                        Región
                    </label>

                    <select className="w-96 border-2 border-gray-400 p-2 rounded-xl text-2xl" id="reg"
                        {...register("reg", {
                        required: "Selecciona una región",
                        })}
                    >
                        <option value="">Selecciona tu región</option>
                        {countries.map((country) => (
                        <option key={country.value} value={country.value}>{country.name}</option>
                        ))}
                    </select>
                    {errors.reg && (<ErrorMessage>{errors.reg.message}</ErrorMessage>)}
                </div>
            </div>
        </>
    )
}

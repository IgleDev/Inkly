import ErrorMessage from "../ErrorMessage";
import countries from "@/json/countries.json";
import type { iUserFormEdit } from "@/types/types";
import { useState } from "react";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";

interface iPerfilAccountForm {
    register: UseFormRegister<iUserFormEdit>;
    errors: FieldErrors<iUserFormEdit>;
    setSelectedFile: (file: File) => void;
}

export default function PerfilAccountForm({ register, errors, setSelectedFile }: iPerfilAccountForm) {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPreview(URL.createObjectURL(file));
        setSelectedFile(file);
    };

    return (
        <div className="grid grid-cols-2">
            <div className="flex flex-col">
                <div className="flex flex-col mt-5">
                    <label className="text-lg font-semibold text-[#02be95]" htmlFor="name">Nombre</label>
                    <input id="name" type="text" className="w-96 border-2 border-gray-400 p-2 rounded-xl text-2xl" {...register("name", { required: "El Nombre es obligatorio" })} />
                    {errors.name && <ErrorMessage>{errors.name?.message}</ErrorMessage>}
                </div>
                <div className="flex flex-col mt-5">
                    <label className="text-lg font-semibold text-[#02be95]" htmlFor="secondName">Apellidos</label>
                    <input id="secondName" type="text" className="w-96 border-2 border-gray-400 p-2 rounded-xl text-2xl" {...register("secondName", { required: "El Apellido es obligatorio" })} />
                    {errors.secondName && <ErrorMessage>{errors.secondName?.message}</ErrorMessage>}
                </div>
                <div className="flex flex-col mt-5">
                    <label className="text-lg font-semibold text-[#02be95]" htmlFor="description">Descripción</label>
                    <textarea id="description" className="w-3/4 border-2 border-gray-400 p-2 rounded-xl text-2xl h-56 resize-none" {...register("description")} />
                    {errors.description && <ErrorMessage>{errors.description?.message}</ErrorMessage>}
                </div>
                <div className="flex flex-col mt-5">
                    <label className="text-lg font-semibold text-[#02be95]" htmlFor="email">Email</label>
                    <input id="email" type="mail" className="w-3/4 border-2 border-gray-400 p-2 rounded-xl text-2xl" {...register("email", {
                        required: "El Email es obligatorio",
                        pattern: { value: /\S+@\S+\.\S+/, message: "E-mail no válido" },
                    })} />
                    {errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
                </div>
                <div className="flex flex-col mt-5">
                    <label className="text-lg font-semibold text-[#02be95]" htmlFor="reg">Región</label>
                    <select className="w-96 border-2 border-gray-400 p-2 rounded-xl text-2xl" id="reg" {...register("reg", { required: "Selecciona una región" })}>
                        <option value="">Selecciona tu región</option>
                        {countries.map((country) => (
                            <option key={country.value} value={country.value}>{country.name}</option>
                        ))}
                    </select>
                    {errors.reg && <ErrorMessage>{errors.reg.message}</ErrorMessage>}
                </div>
            </div>
            <div className="flex flex-col text-[#02be95]">
                <label className="text-2xl font-bold my-5" htmlFor="photo">Modifica tu foto de escritor</label>
                {preview && (
                    <img src={preview} alt="Vista previa" className="w-40 h-40 object-cover rounded-full border-4 border-[#02be95] mb-4" />
                )}
                <input type="file" id="photo" accept="image/*" onChange={handleFileChange} className="file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#02be95] file:text-white file:cursor-pointer" />
            </div>
        </div>
    );
}
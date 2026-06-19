import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateProfile } from '@/api/AccountAPI';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { iUserFormEdit } from '@/types/types';
import PerfilAccountForm from '@/components/account/PerfilAccountForm';
import { uploadImage } from '@/api/UploadAPI';
export default function PerfilForm() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { data } = useQuery({
        queryKey: ['userForm', id],
        queryFn: () => getUserById(id!),
        enabled: !!id
    });
    const { register, handleSubmit, reset, formState: { errors } } = useForm<iUserFormEdit>();
    useEffect(() => {
        if (data?.user) {
            reset({
                name: data.user.name ?? "",
                secondName: data.user.secondName ?? "",
                description: data.user.description ?? "",
                email: data.user.email ?? "",
                reg: data.user.reg ?? "",
                photoProfile: data.user.photoProfile ?? "",
            });
        }
    }, [data, reset]);
    const { mutate } = useMutation({
        mutationFn: (formData: iUserFormEdit) => updateProfile(formData, id!),
        onSuccess: () => navigate(`/perfil/${id}`),
        onError: (error) => console.log(error)
    });
    const handleUpdate = async (formData: iUserFormEdit) => {
        if (selectedFile) {
            const url = await uploadImage(selectedFile);
            formData.photoProfile = url;
        }
        mutate(formData);
    };
    return (
        <div className="px-4 sm:px-0">
            <h1 className="text-3xl sm:text-5xl text-[#02be95] font-bold mb-4 sm:mb-0">Modifica tu datos</h1>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <PerfilAccountForm register={register} errors={errors} setSelectedFile={setSelectedFile} />
                <input type="submit" value="Guardar Cambios" className="mt-6 sm:mt-10 w-full sm:w-auto border bg-[#02be95] text-white p-4 rounded-lg cursor-pointer transition-colors hover:bg-[#029777]" />
            </form>
        </div>
    );
}
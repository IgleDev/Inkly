import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateProfile } from '@/api/AccountAPI';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { iUserFormEdit } from '@/types/types';
import PerfilAccountForm from '@/components/account/PerfilAccountForm'

export default function PerfilForm() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data } = useQuery({
        queryKey : ['userForm', id],
        queryFn : () => getUserById(id!),
        enabled : !!id
    });
    const initialValues : iUserFormEdit = { name : data?.user.name ?? '', secondName : data?.user.secondName ?? '', description : data?.user.description ?? '', email : data?.user.email ?? '', reg : data?.user.reg ?? '' };
    const { register, handleSubmit, reset, formState: { errors } } = useForm<iUserFormEdit>({ defaultValues: initialValues });

    useEffect(() => {
        if (data?.user) {
            reset({
                name: data.user.name ?? "", secondName: data.user.secondName ?? "", description : data.user.description ?? '', email: data.user.email ?? "", reg: data.user.reg ?? "",
            });
        }
    }, [data, reset]);

    const { mutate } = useMutation({
        mutationFn : (formData : iUserFormEdit) =>  updateProfile(formData, id!),
        onSuccess : () => {
            navigate(`/perfil/${id}`)
        },
        onError : (error) => console.log(error)
    })

    const handleUpadte = (formaData : iUserFormEdit) => mutate(formaData);
    
    return (
        <div>
            <h1 className="text-5xl text-[#02be95] font-bold">Modifica tu datos</h1>
            <form onSubmit={handleSubmit(handleUpadte)}>
                <PerfilAccountForm register={register} errors={errors}/>
                <input type='submit' value={'Guardar Cambios'} className={'mt-10 border bg-[#02be95] text-white p-4 rounded-lg cursor-pointer transition-colors hover:bg-[#029777]'}/>
            </form>
        </div>
    )
}

import bcrypt from "bcrypt";

// Crear
export const hashPassword = async (password : string) => {
    const salt = bcrypt.salt(10);
    return await bcrypt.hash(password, salt)
}

// Comparar
export const chechPassword = async (password : string, passwordHashed : string) => {
    return await bcrypt.compare(password, passwordHashed);
}
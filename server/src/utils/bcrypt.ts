import bcrypt from "bcrypt";

// Crear
export const hashPassword = async (password : string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}

// Comparar
export const checkPassword = async (password : string, passwordHashed : string) => {
    return await bcrypt.compare(password, passwordHashed);
}
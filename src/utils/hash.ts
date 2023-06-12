import bcrypt from 'bcrypt';

const SALT_CONSTANT = 7;

async function hashPassword(password: string) {
    return bcrypt.hash(password, SALT_CONSTANT);
}

async function comparePassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
}

export { comparePassword, hashPassword };
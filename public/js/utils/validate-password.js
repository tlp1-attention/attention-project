function validatePassword(pass) {

    // Al menos 8 caracteres de longitud
    if (pass.length < 8) return false;

    // Una mayúscula,
    // minúscula y número
    if (!(pass.match(/[A-Z]/) &&
        pass.match(/[a-z]/) &&
        pass.match(/\d/))) {
            return false;
    };

    return true;
}

export default validatePassword;
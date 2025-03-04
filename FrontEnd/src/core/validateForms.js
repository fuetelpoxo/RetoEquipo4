export const validateUserForm = (form, user = null) => {
    const errors = {};

    // Validación del nombre
    if (!form.name.trim()) {
        errors.name = 'El nombre es requerido';
    } else if (form.name.length > 255) {
        errors.name = 'El nombre debe tener menos de 255 caracteres';
    }

    // Validación del email
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    if (!form.email.trim()) {
        errors.email = 'El email es requerido';
    } else if (!emailRegex.test(form.email)) {
        errors.email = 'Debe ser una dirección de Gmail válida';
    }

    // Validación de la contraseña (solo para nuevos usuarios o si se intenta cambiar)
    if (!user && !form.password) {
        errors.password = 'La contraseña es requerida para nuevos usuarios';
    } else if (form.password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(form.password)) {
            errors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número';
        }
    }

    // Validación del perfil
    if (!form.perfil) {
        errors.perfil = 'El perfil es requerido';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
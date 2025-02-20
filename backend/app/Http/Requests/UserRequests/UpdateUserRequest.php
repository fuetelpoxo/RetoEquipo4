<?php

namespace App\Http\Requests\UserRequests;

use App\Rules\EmailValidator;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine si el usuario está autorizado para realizar esta solicitud.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;  // Asegúrate de que el usuario esté autorizado a hacer esta solicitud
    }

    /**
     * Obtener las reglas de validación que se aplican a la solicitud.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'nullable|string|max:255',  // Añadir validación para el campo 'name'
            'email' => ['nullable', 'string', new EmailValidator()],
            'password' => 'nullable|string|min:8',  // validación para password
            'activo' => 'nullable|boolean',  // validación para activo
            'perfil' => 'nullable|string|in:periodista,administrador,director,entrenador',  // validación para perfil
        ];
    }
    public function messages()
    {
        return [
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no debe exceder los 255 caracteres.',

            'email.email' => 'El correo electrónico debe ser válido.',
            'email.unique' => 'Ya existe una cuenta registrada con ese correo electrónico.',

            'password.string' => 'La contraseña debe ser una cadena de texto.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',

            'activo.boolean' => 'El estado de activación debe ser un valor booleano (true o false).',

            'perfil.string' => 'El perfil debe ser una cadena de texto.',
            'perfil.in' => 'El perfil debe ser uno de los siguientes: periodista, administrador, director, entrenador.',
        ];
    }
}

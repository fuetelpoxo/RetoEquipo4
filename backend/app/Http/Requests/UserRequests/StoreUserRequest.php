<?php

namespace App\Http\Requests\UserRequests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; // Asegúrate de que el usuario esté autorizado a hacer esta solicitud
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',  // Añadir validación para el campo 'name'
            'email' => 'required|email|unique:users,email,' . $this->user,  // validación para email
            'password' => 'required|string|min:8',  // validación para password
            'activo' => 'required|boolean',  // validación para activo
            'perfil' => 'required|string|in:periodista,administrador,director,entrenador',  // validación para perfil
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no debe exceder los 255 caracteres.',

            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser válido.',
            'email.unique' => 'Ya existe una cuenta registrada con ese correo electrónico.',

            'password.required' => 'La contraseña es obligatoria.',
            'password.string' => 'La contraseña debe ser una cadena de texto.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',

            'activo.required' => 'El estado de activación es obligatorio.',
            'activo.boolean' => 'El estado de activación debe ser un valor booleano (true o false).',

            'perfil.required' => 'El perfil es obligatorio.',
            'perfil.string' => 'El perfil debe ser una cadena de texto.',
            'perfil.in' => 'El perfil debe ser uno de los siguientes: periodista, administrador, director, entrenador.',
        ];
    }
}

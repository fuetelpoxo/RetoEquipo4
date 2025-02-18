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
            'perfil' => 'required|string|max:255',  // validación para perfil
        ];
    }
}

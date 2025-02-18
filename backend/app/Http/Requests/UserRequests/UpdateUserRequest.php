<?php

namespace App\Http\Requests\UserRequests;

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
            'name' => 'nullable|string|max:255',  // Permite null en name, ya que no es obligatorio
            'email' => 'nullable|email|unique:users,email,' . $this->route('id'),  // Verifica que el email sea único, pero excluye el usuario actual
            'perfil' => 'nullable|string|in:entrenador,director,periodista,administrador',  // Perfil debe ser uno de los valores definidos
        ];
    }
}

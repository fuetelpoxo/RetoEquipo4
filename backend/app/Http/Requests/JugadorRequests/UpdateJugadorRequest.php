<?php

namespace App\Http\Requests\JugadorRequests;

use App\Rules\DniValidator;
use App\Rules\EmailValidator;
use App\Rules\PhoneValidator;
use Illuminate\Foundation\Http\FormRequest;

class UpdateJugadorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'equipo_id' => 'nullable|integer|exists:equipos,id',
            'nombre' => 'nullable|string|min:3|max:10',
            'apellido1' => 'nullable|string|min:3|max:10',
            'apellido2' => 'nullable|string|min:3|max:10',
            'tipo' => 'required|string|in:jugador,entrenador,capitan',
            'estudio_id' => 'nullable|integer|exists:estudios,id',
            'dni' => ['required', 'string', 'unique:jugadores,dni', new DniValidator],  // Usamos la regla personalizada
            'email' => ['nullable', 'string', new EmailValidator()], // Usa la Rule de email
            'telefono' => ['required', 'string', 'unique:jugadores,telefono', new PhoneValidator()], // Validación personalizada del teléfono
        ];
    }
    public function messages(): array
    {
        return [
            'equipo_id.integer' => 'El ID del equipo debe ser un número entero.',
            'equipo_id.exists' => 'El equipo seleccionado no existe.',

            'nombre.string' => 'El nombre debe ser una cadena de texto.',
            'nombre.max' => 'El nombre no puede superar los 10 caracteres.',
            'nombre.min' => 'El nombre no puede ser inferior a los 3 caracteres.',

            'apellido1.string' => 'El primer apellido debe ser una cadena de texto.',
            'apellido1.max' => 'El primer apellido no puede superar los 10 caracteres.',
            'apellido1.min' => 'El primer apellido no puede ser inferior a los 3 caracteres.',

            'apellido2.string' => 'El segundo apellido debe ser una cadena de texto.',
            'apellido2.max' => 'El segundo apellido no puede superar los 10 caracteres.',
            'apellido2.min' => 'El segundo apellido no puede ser inferior a los 3 caracteres.',

            'tipo.required' => 'El tipo es obligatorio.',
            'tipo.string' => 'El tipo debe ser una cadena de texto.',
            'tipo.in' => 'El tipo debe ser jugador, entrenador o capitán.',

            'estudio_id.integer' => 'El ID del estudio debe ser un número entero.',
            'estudio_id.exists' => 'El estudio seleccionado no existe.',

            'dni.string' => 'El DNI debe ser una cadena de texto.',
            'dni.max' => 'El DNI no puede superar los 255 caracteres.',
            'dni.unique' => 'El DNI introducido ya se encuentra en nuestra base de datos.',

            'email.string' => 'El email debe ser una cadena de texto.',
            'email.max' => 'El email no puede superar los 255 caracteres.',

            'telefono.string' => 'El teléfono debe ser una cadena de texto.',
            'telefono.max' => 'El teléfono no puede superar los 255 caracteres.',
            'telefono.unique' => 'El teléfono introducido ya se encuentra en nuestra base de datos.',
        ];
    }
}

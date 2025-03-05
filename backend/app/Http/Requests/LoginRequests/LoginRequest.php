<?php

namespace App\Http\Requests\LoginRequests;

use App\Rules\EmailValidator;
use App\Rules\StrongPasswordValidator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Email;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', new EmailValidator()],
            'password' => ['required', 'string', new StrongPasswordValidator()],
        ];
    }
    public function messages()
    {
        return [
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.string' => 'El correo electrónico debe ser una cadena de texto.',

            'password.required' => 'La contraseña es obligatoria.',
            'password.string' => 'La contraseña debe ser una cadena de texto.',
        ];
    }
}

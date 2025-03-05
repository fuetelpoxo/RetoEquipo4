<?php

namespace App\Http\Requests\OngRequests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOngRequest extends FormRequest
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
            'nombre' => 'nullable|string|max:255',
            'landingPage' => 'nullable|string|max:255'
        ];
    }
}

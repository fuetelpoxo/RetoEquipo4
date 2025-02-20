<?php

namespace App\Http\Requests\CicloRequests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCicloRequest extends FormRequest
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
                'nombre'=> 'nullable|string',
                'familia_id'=> 'nullable|exists:familias,id'

        ];
    }
}

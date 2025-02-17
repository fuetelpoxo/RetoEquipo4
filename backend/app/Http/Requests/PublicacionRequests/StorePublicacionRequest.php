<?php

namespace App\Http\Requests\PublicacionRequests;

use Illuminate\Foundation\Http\FormRequest;

class StorePublicacionRequest extends FormRequest
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
            'titulo' => 'required|string|min:5|max:100',
            'texto' => 'required|string|min:10|max:10000',
            'portada' => 'nullable',
            'rutavideo' => 'nullable|url',
            'rutaaudio' => 'nullable|url|mimes:mp3,wav,ogg|max:10240',
        ];
    }
}

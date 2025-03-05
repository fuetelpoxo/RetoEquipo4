<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PhoneValidator implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Expresión regular para números de teléfono españoles (móviles y fijos)
        $pattern = '/^(6|7|9)\d{8}$/';

        // Verificar si el número coincide con el patrón
        if (!preg_match($pattern, $value)) {
            $fail('El número de teléfono debe ser válido en España y tener 9 dígitos.');
        }
    }
}

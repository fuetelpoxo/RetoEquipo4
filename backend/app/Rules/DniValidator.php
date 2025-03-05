<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class DniValidator implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Primero validamos el formato general del DNI (8 números seguidos de una letra)
        if (!preg_match('/^\d{8}[A-Za-z]$/', $value)) {
            $fail('El DNI debe tener un formato válido (8 números seguidos de una letra).');
            return;
        }

        // Extraemos el número y la letra
        $dniNumber = substr($value, 0, 8);
        $dniLetter = strtoupper(substr($value, -1));

        // Array con las letras posibles
        $letras = "TRWAGMYFPDXBNJZSQVHLCKE";

        // Calculamos la letra que le corresponde al número del DNI
        $letraCalculada = $letras[$dniNumber % 23];

        // Comparamos la letra calculada con la letra real
        if ($dniLetter !== $letraCalculada) {
            $fail('La letra del DNI no es válida.');
        }
    }
}

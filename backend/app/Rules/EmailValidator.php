<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
class EmailValidator implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Validar formato de email con las reglas nativas de Laravel
        $validator = Validator::make([$attribute => $value], [
            $attribute => 'email:rfc,dns'
        ]);

        if ($validator->fails()) {
            $fail('El correo electrónico no es válido o no tiene un dominio correcto.');
            return;
        }

        // Verificar unicidad en la tabla jugadores
        $exists = DB::table('jugadores')->where('email', $value)->exists();

        if ($exists) {
            $fail('Este correo electrónico ya está registrado en otro jugador.');
        }
    }
}

<?php
 
namespace Database\Seeders;
 
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class JugadorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('jugadores')->insert([
            ['equipo_id'=>1, 'nombre'=>'Pedro','apellido1'=>'López','apellido2'=>'Martínez','tipo'=>'capitan','estudio_id'=>1,'dni'=>'12345678A','email'=>'pedro@example.com','telefono'=>'123456789'],
            ['equipo_id'=>1, 'nombre'=>'Juan','apellido1'=>'Fernández','apellido2'=>'Ruiz','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678B','email'=>'juan@example.com','telefono'=>'126456789'],
            ['equipo_id'=>1, 'nombre'=>'Luis','apellido1'=>'Sánchez','apellido2'=>'Ortega','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345612C','email'=>'luis@example.com','telefono'=>'327456789'],
            ['equipo_id'=>1, 'nombre'=>'Carlos','apellido1'=>'Ramírez','apellido2'=>'Castillo','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678D','email'=>'carlos@example.com','telefono'=>'128456789'],
            ['equipo_id'=>1, 'nombre'=>'Javier','apellido1'=>'Domínguez','apellido2'=>'Méndez','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678E','email'=>'javier@example.com','telefono'=>'121456789'],
            ['equipo_id'=>2, 'nombre'=>'Antonio','apellido1'=>'Gutiérrez','apellido2'=>'Vega','tipo'=>'capitan','estudio_id'=>1,'dni'=>'12345678F','email'=>'antonio@example.com','telefono'=>'124456789'],
            ['equipo_id'=>2, 'nombre'=>'Manuel','apellido1'=>'Moreno','apellido2'=>'Pérez','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678G','email'=>'manuel@example.com','telefono'=>'123556789'],
            ['equipo_id'=>2, 'nombre'=>'José','apellido1'=>'Navarro','apellido2'=>'Reyes','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678H','email'=>'jose@example.com','telefono'=>'123446789'],
            ['equipo_id'=>2, 'nombre'=>'Francisco','apellido1'=>'Flores','apellido2'=>'Cabrera','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678I','email'=>'francisco@example.com','telefono'=>'293456789'],
            ['equipo_id'=>2, 'nombre'=>'David','apellido1'=>'Hernández','apellido2'=>'Soto','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678J','email'=>'david@example.com','telefono'=>'123256789'],
            ['equipo_id'=>3, 'nombre'=>'Maria','apellido1'=>'Cordero','apellido2'=>'Blanco','tipo'=>'capitan','estudio_id'=>1,'dni'=>'12345678K','email'=>'maria@example.com','telefono'=>'125458789'],
            ['equipo_id'=>3, 'nombre'=>'Ana','apellido1'=>'Molina','apellido2'=>'Gallardo','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678L','email'=>'ana@example.com','telefono'=>'923456789'],
            ['equipo_id'=>3, 'nombre'=>'Laura','apellido1'=>'Peña','apellido2'=>'Delgado','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678M','email'=>'laura@example.com','telefono'=>'823456789'],
            ['equipo_id'=>3, 'nombre'=>'Sara','apellido1'=>'Pacheco','apellido2'=>'Herrera','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678N','email'=>'sara@example.com','telefono'=>'723456789'],
            ['equipo_id'=>3, 'nombre'=>'Carmen','apellido1'=>'Medina','apellido2'=>'Lara','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678O','email'=>'carmen@example.com','telefono'=>'623456789'],
            ['equipo_id'=>4, 'nombre'=>'Rosa','apellido1'=>'Carrillo','apellido2'=>'Fuentes','tipo'=>'capitan','estudio_id'=>1,'dni'=>'12345678P','email'=>'rosa@example.com','telefono'=>'523456789'],
            ['equipo_id'=>4, 'nombre'=>'Elena','apellido1'=>'León','apellido2'=>'Campos','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678Q','email'=>'elena@example.com','telefono'=>'423456789'],
            ['equipo_id'=>4, 'nombre'=>'Isabel','apellido1'=>'Núñez','apellido2'=>'Ríos','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678R','email'=>'isabel@example.com','telefono'=>'323456789'],
            ['equipo_id'=>4, 'nombre'=>'Paula','apellido1'=>'Lorenzo','apellido2'=>'Bravo','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678S','email'=>'paula@example.com' ,'telefono'=>'223456789'],
            ['equipo_id'=>4, 'nombre'=>'Silvia','apellido1'=>'Serrano','apellido2'=>'Arias','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678T','email'=>'silvia@example.com','telefono'=>'523446789'],
            ['equipo_id'=>5, 'nombre'=>'Marta','apellido1'=>'Fernandez','apellido2'=>'Lopez','tipo'=>'capitan','estudio_id'=>1,'dni'=>'12345678U','email'=>'marta@example.com','telefono'=>'187356789'],
            ['equipo_id'=>5, 'nombre'=>'Raquel','apellido1'=>'Gomez','apellido2'=>'Herrero','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678V','email'=>'raquel@example.com','telefono'=>'171456789'],
            ['equipo_id'=>5, 'nombre'=>'Nuria','apellido1'=>'Moreno','apellido2'=>'Sanchez','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678W','email'=>'nuria@example.com','telefono'=>'197116789'],
            ['equipo_id'=>5, 'nombre'=>'Cristina','apellido1'=>'Perez','apellido2'=>'Martinez','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678X','email'=>'cristina@example.com','telefono'=>'147456789'],
            ['equipo_id'=>5, 'nombre'=>'Patricia','apellido1'=>'Diaz','apellido2'=>'Garcia','tipo'=>'jugador','estudio_id'=>1,'dni'=>'12345678Y','email'=>'patricia@example.com','telefono'=>'131456789'],
            ['equipo_id'=>6, 'nombre'=>'Eva','apellido1'=>'Alvarez','apellido2'=>'Lopez','tipo'=>'capitan','estudio_id'=>1,'dni'=>'12345678Z','email'=>'eva@example.com','telefono'=>'927456789'],
            ['equipo_id'=>6, 'nombre'=>'Sandra','apellido1'=>'Ruiz','apellido2'=>'Martinez','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678A','email'=>'sandra@example.com','telefono'=>'113456789'],
            ['equipo_id'=>6, 'nombre'=>'Beatriz','apellido1'=>'Torres','apellido2'=>'Gomez','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678B','email'=>'beatriz@example.com','telefono'=>'107456789'],
            ['equipo_id'=>6, 'nombre'=>'Gloria','apellido1'=>'Jimenez','apellido2'=>'Fernandez','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678C','email'=>'gloria@example.com','telefono'=>'197451189'],
            ['equipo_id'=>6, 'nombre'=>'Rocio','apellido1'=>'Serrano','apellido2'=>'Alonso','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678D','email'=>'rocio@example.com','telefono'=>'187453789'],
            ['equipo_id'=>7, 'nombre'=>'Rodrigo','apellido1'=>'Garcia','apellido2'=>'Vazquez','tipo'=>'capitan','estudio_id'=>1,'dni'=>'22345678E','email'=>'rodrigo@example.com','telefono'=>'177456789'],
            ['equipo_id'=>7, 'nombre'=>'Alejandro','apellido1'=>'Navarro','apellido2'=>'Pena','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678F','email'=>'alejandro@example.com','telefono'=>'167469789'],
            ['equipo_id'=>7, 'nombre'=>'Adrian','apellido1'=>'Gomez','apellido2'=>'Lopez','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678G','email'=>'adrian@example.com','telefono'=>'157556789'],
            ['equipo_id'=>7, 'nombre'=>'Ivan','apellido1'=>'Morales','apellido2'=>'Garcia','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678H','email'=>'ivan@example.com','telefono'=>'147476789'],
            ['equipo_id'=>7, 'nombre'=>'Hugo','apellido1'=>'Ruiz','apellido2'=>'Serrano','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678I','email'=>'hugo@example.com','telefono'=>'137436789'],
            ['equipo_id'=>8, 'nombre'=>'Marcos','apellido1'=>'Fernandez','apellido2'=>'Alvarez','tipo'=>'capitan','estudio_id'=>1,'dni'=>'22345678J','email'=>'marcos@example.com','telefono'=>'827456789'],
            ['equipo_id'=>8, 'nombre'=>'Sergio','apellido1'=>'Diaz','apellido2'=>'Jimenez','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678K','email'=>'sergio@example.com','telefono'=>'117452789'],
            ['equipo_id'=>8, 'nombre'=>'Ruben','apellido1'=>'Torres','apellido2'=>'Ruiz','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678L','email'=>'ruben@example.com','telefono'=>'107456799'],
            ['equipo_id'=>8, 'nombre'=>'Oscar','apellido1'=>'Lopez','apellido2'=>'Sanchez','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678M','email'=>'oscar@example.com','telefono'=>'197456711'],
            ['equipo_id'=>8, 'nombre'=>'Miguel','apellido1'=>'Martinez','apellido2'=>'Alonso','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678N','email'=>'miguel@example.com','telefono'=>'387456789'],
            ['equipo_id'=>9, 'nombre'=>'Angel','apellido1'=>'Serrano','apellido2'=>'Garcia','tipo'=>'capitan','estudio_id'=>1,'dni'=>'22345678O','email'=>'angel@example.com','telefono'=>'177456789'],
            ['equipo_id'=>9, 'nombre'=>'Pablo','apellido1'=>'Alvarez','apellido2'=>'Morales','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678P','email'=>'pablo@example.com','telefono'=>'167666789'],
            ['equipo_id'=>9, 'nombre'=>'Alvaro','apellido1'=>'Ruiz','apellido2'=>'Navarro','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678Q','email'=>'alvaro@example.com','telefono'=>'157756789'],
            ['equipo_id'=>9, 'nombre'=>'Jorge','apellido1'=>'Gomez','apellido2'=>'Torres','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678R','email'=>'jorge@example.com','telefono'=>'147756789'],
            ['equipo_id'=>9, 'nombre'=>'Enrique','apellido1'=>'Martinez','apellido2'=>'Vazquez','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678S','email'=>'enrique@example.com','telefono'=>'133456789'],
            ['equipo_id'=>10, 'nombre'=>'Fernando','apellido1'=>'Navarro','apellido2'=>'Gomez','tipo'=>'capitan','estudio_id'=>1,'dni'=>'22345678T','email'=>'fernando@example.com','telefono'=>'127456789'],
            ['equipo_id'=>10, 'nombre'=>'Diego','apellido1'=>'Torres','apellido2'=>'Fernandez','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678U','email'=>'diego@example.com','telefono'=>'117456789'],
            ['equipo_id'=>10, 'nombre'=>'Raul','apellido1'=>'Sanchez','apellido2'=>'Lopez','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678V','email'=>'raul@example.com','telefono'=>'107459789'],
            ['equipo_id'=>10, 'nombre'=>'Alberto','apellido1'=>'Lopez','apellido2'=>'Martinez','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678W','email'=>'alberto@example.com','telefono'=>'197456789'],
            ['equipo_id'=>10, 'nombre'=>'Joaquin','apellido1'=>'Gomez','apellido2'=>'Ruiz','tipo'=>'jugador','estudio_id'=>1,'dni'=>'22345678X','email'=>'joaquin@example.com','telefono'=>'187456789']
        ]);
    }
}
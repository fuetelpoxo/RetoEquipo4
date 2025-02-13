# Guía de despliegue

A lo largo de esta guía de despliegue vamos a explicar como montar un servidor en AWS para poder subir nuestra página web, siguiendo todos los pasos y explicándolos para que se vea de forma correcta el proceso que hemos seguido para poder lanzar nuestra aplicaión en AWS.

---

## *Creación de una VPC*
El primer paso que vamos a llevar a cabo es el de crear una VPC (Virtual private Cloud), esto es una red privada dentro de AWS donde podremos desplegar nuestras instancias y recurso la cual también nos permitirá definir subredes, grupos de seguridad y configuraciones de red personalizadas. A continuación mostraremos la creación de la VPc con las especificaciones necesarias:

- La VPC lleva el nombre "Equipo4RETO" que hace referencia al proyecto que llevamos a cabo. Por otra parte le asignamos un Bloque de CIDR (Classless Inter-Domain Routing) IPv4 que nos permitirá asignar rangos en direcciones IP. En nuestro caso le asignamos "10.0.0.0/16" lo que significa que la VPC tendrá las direcciones disponibles desde "10.0.0.0 hasta 10.0.255.255".

![Configuracion-VPC](img/image-1.png)

- Marcamos una sola zona de disponibilidad las cuales son centros de datos dentro de una región de AWS. Nosotros hemos marcado la zona "ues-east-1a" que nos indica que los recursos se crearán en la primera zona de disponibilidad de la región a la que hace referencia (US East - North Virginia).

- Como podemos ver asignamos una subred pública y otra privada dentro del bloque CIDR de subredes. La red pública será "10.0.0.0/24" (de la 10.0.0.0 a la 10.0.0.255) y la red privada será "10.0.1.0/24" (de la 10.0.1.0 a la 10.0.1.255), lo que significa que tendrán 256 direcciones IP disponibles cada una. 
 

![Configuracion-VPC](img/image-2.png)

- En los puntos de enlace de a VPC marcamos la opción "Ninguna", porque si marcamos la opción "Gateway de S3" en el mapa de recursos nos aparecerá otra red que se conecta a la subred privada y nos dará problemas a la hora de que la MV que crearemos se pueda conectar a la red.

![Configuracion-VPC](img/image-14.png)

- Este es el mensaje que nos indica se ha creado correctamente. En la imagen podemos ver todo lo que se ha creado en la confección de la VPC y que no ha dado ningún fallo.

![Configuracion-VPC](img/image-4.png)

## *Grupos de seguridad*

Los grupos de seguridad en AWS actúan como un firewall para controlar que tráfico puede entrar o salir de una instancia EC2.

- El nombre elegido para el grupo de seguridad es "grupo-seguridad-web-Equipo4RETO". Este grupo de seguridad le utilizaremos para habilitar los puertos web y le asignamos a la VPC creada anteriormente.

![Configuracion-grupoSeguridad](img/image-5.png)

- Creamos dos reglas de entrada. la primera es para permitir el tráfico HTTP, actuará en el puerto 80 y marcamos en tipo de origen "Anywhere IPv4" (0.0.0.0/0) que significa que cualquier dispositivo de Internet puede acceder al servidor a través del puerto especificado, está regla la necesitaremos para servir páginas web. La segunda regla es para permitir el tráfico de SSH y actuará en puerto 22 y como en la anterior marcamos el mismo tipo de origen el cual servirá para lo mismo, en este caso la regla la utilizaremos para conectarnos a la instancia y administrarla.

![Configuracion-grupoSeguridad](img/image-6.png)

- Este panel nos muestra que el grupo de seguridad se ha creado correctamente además de sus especificaciones.

![Configuracion-grupoSeguridad](img/image-7.png)

## *Máquina Virtual EC2*

Vamos a crear una máquina virtual en AWS (EC2) que actuará como servidor web con las siguientes características:

- Como nombre le daremos "ServidorWebEquipo4RETO" y el Sistema operativo que utilizaremos es "Ubuntu Server 22.04" la versión LTS (Long Term Support) ya que es una versión estable y optimizada de Ubuntu para servidores. Como vemos AWS nos ofrece imágenes preconfiguradas AMI(Amazon Machine Images) para diversos Sistemas Operativos.

![Configuracion-EC2](img/image-15.png)

- EL tipo de instancia que vamoa a elegir es "T2.medium", la cual consta de 2 vCPUs (procesadores virtuales) y de 4GB de RAM. En el caso de que la aplicación fuese muy grande o si en un futuro crece demasiado habría que cambiar a una instancia más grande, es decir, que tenga mas capacidad.

- Además elegiremos la opción de crear un par de claves vockey (pública y privada) que se usan para acceder por SSH a la instancia.

![Configuracion-EC2](img/image-9.png)

- Dentro de la configuración de red de la Máquina Virtual, le asignamos la vpc creada al principio y la subred pública "Equipo4RETO-subnet-public1-us-east-1a". La instancia creará esta subred dentro de la VPC y al ser pública  permitirá el acceso a internet.

- Habilitaremos la IP pública que se asignará a la instancia, lo que permitirá el acceso desde fuera de AWS (necesario para el servidor web y SSH).

- Usaremos el grupo se seguridad "grupo-seguridad-web-Equipo4RETO" que nos permite el acceso por HTTP y SSH.

![Configuracion-EC2](img/image-10.png)

- Optaremos por 20GB SSD de almacenamiento que es suficiente para un servidor web básico y en el caso de necesitar más sólo tendríamos que aumentarlo.

![Configuracion-EC2](img/image-11.png)

- Aquí vemos que se ha creado correctamente.

![Configuracion-EC2](img/image-12.png)

### *Resumen de configuración de la MV EC2*

| Configuración        | Valor |
|---------------------|---------------------------|
| **Nombre** | `ServidorWebEquipo4RETO` |
| **SO** | Ubuntu Server 22.04 |
| **Tipo de Instancia** | T2.medium (2 vCPU, 4GB RAM) |
| **Clave SSH** | `vockey.pem` |
| **Red** | Subred pública (`Equipo4RETO-subnet-public1-us-east-1a`) |
| **IP Pública** | Activada |
| **Grupo de Seguridad** | `grupo-seguridad-web-Equipo4RETO` (HTTP y SSH abiertos) |
| **Almacenamiento** | 20GB SSD |


## Conexión a la MV

La primera forma que tenemos de conectarnos a nuestra instancia es mediante el apartado de Conexión de la instancia EC2, el cual nos conectará directamente con la MV que hemos creado.

![Conexion](img/image-48.png)

Como vemos, ya estamos conectados a la MV y podemos empezar a trabajar con ella.

![Conexion](img/image-49.png)

La segunda forma de conectarnos a la MV es a través de la cmd del ordenador a través del cliente SSH. Lo primero que tenemos que hacer es descargarnos el PEM(Privacy-Enhanced Mail) que utilizamos comúnmenete para almacenar claves privadas y certificados. Este archivo lo guardaremos en un carpeta en la siguiente ruta:

![Conexion](img/image-51.png)

El siguiente paso es irnos al apartado de Cliente SSH y copiar el siguiente comando:

![Conexion](img/image-52.png)

Dentro del cmd nos situamos dentro de la carpeta mostrada antes y copiamos el comando cambiando el nombre de "vockey.pem" por "labsuser.pem" que es el nombre del archivo pem que nos hemos descargado.

![Conexion](img/image-53.png)

Como vemos ya estaríamos conectados ya ya podríamos empezar a configurarla.

![Conexion](img/image-54.png)



## Instalación y preparación del servidor en la MV de AWS

En este apartado vamos a mostrar como preparar el servidor para poder alojar nuestro proyecto.

- Lo primero que realizamos es "sudo apt update" para actualizar todos los paquetes existentes y que descargue todo lo necesario para la configuración que vamos a realizar.

![Configuracion-Servidor](img/image-16.png)

- Instalamos el servidor de apache a través del comando "sudo apt install apache2".

![Configuracion-Servidor](img/image-17.png)

-  Comprobamos que el servidor este funcionando correctamente utilizando "sudo systemctl status apache2", que nos muestra el estado actual del servidor.

![Configuracion-Servidor](img/image-18.png)

- A través de la IP de la máquina virtual vemos en el buscador que nos muestra la web por defecto de apache, loq ue significa que se ha instalado correctamente. Esta página de muestra la cambiaremos más adelante para mostrar lo que nosotros queramos.

![Configuracion-Servidor](img/image-19.png)

- Crearemos el archivo de configuración necesario para que nuestro host virtual funcione y opere desde una ruta en la que crearemos el directorio donde guardaremos nuestro proyecto.

![Configuracion-Servidor](img/image-20.png)

- Esta es la información que tiene el archivo de configuración que estamos creando.

![Configuracion-Servidor](img/image-26.png)

- Creamos el directorio mecionado anteriormente y nos aseguramos de que se ha creado correctamente. Como vemos dentro de la ruta especificada, se encuentra nuestro directorio.

![Configuracion-Servidor](img/image-22.png)

- Cambiamos los permisos de propiedad del directorio y nos aseguramos de que se ha realizado correctamente utilizando el segundo comando "ls -ld /var/www/Equipo4", que nos muestra los permisos y propiedades del directorio sin listar us contenido.

![Configuracion-Servidor](img/image-23.png)

- Utilizamos el comando "sudo a2ensite Equipo4.conf" para habilitar nuestro sitio web. Y luego reiniciamos el servidor para que los cambios realizados se guarden.

![Configuración-Servidor](img/image-24.png)

- Verificamos de que la configuración sea correcta.

![Configuracion-Servidor](img/image-25.png)

- En la ruta indicada en la imagen removemos el archivo index.html que hay por defecto y creamos el nuestro propio, para hacer pruebas y ver que funciona y se muestra nuestra web.

![Configuracion-Servidor](img/image-30.png)

- Contenido de la web de prueba.

![Configuracion-Servidor](img/image-28.png)

- Y esta sería la salida, es decir, el contenido antes mostrado, reflejado en el buscador.

![Configuracion-Servidor](img/image-29.png)

- El siguiente paso que vamos a seguir es la instalacion de ufw (Uncomplicated Firewall), es decir, vamos a instalar un firewall en nuestra EC2 a través del siguiente comando. Esto nos permitirá mejorar la seguridad de nuestro servidor, permitiendo solo el tráfico necesario y bloqueando el resto.

![Configuracion-Servidor](img/image-31.png)

- Con el siguiente comando podemos gestionar las reglas de firewall sin necesidad de explicar manualmente los puertos. En este caso solo mostramos una lista de los servicios que pueden ser gestionados fácilmente con UFW.

![Configuraucion-Servidor](img/image-32.png)

- En las dos siguientes imágenes mostramos los comandos "sudo ufw allow apache" y "sudo ufw allow OpenSSH" con los que vamos a permitir el tráfico de red para el servidor web Apache a través del firewall UFW, y por otro lado, permitiremos también el tráfico de red en el puerto por defecto de OpenSSH (puerto 22) a través del firewall UFW.

![Configuracion-Servidor](img/image-36.png)

![Configuracion-Servidor](img/image-33.png)

- Mostramos la lista de reglas activas.

![Configuracion-Servidor](img/image-55.png)

- Utilizamos otra vez "sudo apt update" para asegurarnos que nuestro sistema tenga la información más reciente sobre los paquetes y versiones disponibles para instalar o actualizar.

![Configuracion-Servidor](img/image-35.png)

## Grupo de seguridad para la Base de Datos

![alt text](img/image-37.png)

![alt text](img/image-38.png)

![alt text](img/image-39.png)

## Creación de subred pública y de la subred privada

![alt text](img/image-40.png)

![alt text](img/image-41.png)

![alt text](img/image-42.png)

![alt text](img/image-43.png)


## Creación de grupo de subredes de base de datos

![alt text](img/image-44.png)

![alt text](img/image-46.png)

![alt text](img/image-47.png)



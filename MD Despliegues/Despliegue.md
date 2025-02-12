# Guía de despliegue

A lo largo de esta guía de despliegue vamos a explicar como montar un servidor en AWS para poder subir nuestra página web, siguiendo todos los pasos y explicándolos para que se vea de forma correcta el proceso que hemos seguido para poder lanzar nuestra aplicaión en AWS.

---

## *Creación de una VPC*
El primer paso que vamos a llevar a cabo es el de crear una VPC (Virtual private Cloud), esto es una red privada dentro de AWS donde podremos desplegar nuestras instancias y recurso la cual también nos permitirá definir subredes, grupos de seguridad y configuraciones de red personalizadas. A continuación mostraremos la creación de la VPc con las especificaciones necesarias:

- La VPC lleva el nombre "Equipo4RETO" que hace referencia al proyecto que llevamos a cabo. Por otra parte le asignamos un Bloque de CIDR (Classless Inter-Domain Routing) IPv4 que nos permitirá asignar rangos en direcciones IP. En nuestro caso le asignamos "10.0.0.0/16" lo que significa que la VPC tendrá las direcciones disponibles desde "10.0.0.0 hasta 10.0.255.255".

![alt text](img/image-1.png)

- Marcamos una sola zona de disponibilidad las cuales son centros de datos dentro de una región de AWS. Nosotros hemos marcado la zona "ues-east-1a" que nos indica que los recursos se crearán en la primera zona de disponibilidad de la región a la que hace referencia (US East - North Virginia).

- Como podemos ver asignamos una subred pública y otra privada dentro del bloque CIDR de subredes. La red pública será "10.0.0.0/24" (de la 10.0.0.0 a la 10.0.0.255) y la red privada será "10.0.1.0/24" (de la 10.0.1.0 a la 10.0.1.255), lo que significa que tendrán 256 direcciones IP disponibles cada una. 
 

![alt text](img/image-2.png)

- En los puntos de enlace de a VPC marcamos la opción "Ninguna", porque si marcamos la opción "Gateway de S3" en el mapa de recursos nos aparecerá otra red que se conecta a la subred privada y nos dará problemas a la hora de que la MV que crearemos se pueda conectar a la red.

![alt text](img/image-14.png)

- Este es el mensaje que nos indica se ha creado correctamente. En la imagen podemos ver todo lo que se ha creado en la confección de la VPC y que no ha dado ningún fallo.

![alt text](img/image-4.png)

## *Grupos de seguridad*

Los grupos de seguridad en AWS actúan como un firewall para controlar que tráfico puede entrar o salir de una instancia EC2.

- El nombre elegido para el grupo de seguridad es "grupo-seguridad-web-Equipo4RETO". Este grupo de seguridad le utilizaremos para habilitar los puertos web y le asignamos a la VPC creada anteriormente.

![alt text](img/image-5.png)

- Creamos dos reglas de entrada. la primera es para permitir el tráfico HTTP, actuará en el puerto 80 y marcamos en tipo de origen "Anywhere IPv4" (0.0.0.0/0) que significa que cualquier dispositivo de Internet puede acceder al servidor a través del puerto especificado, está regla la necesitaremos para servir páginas web. La segunda regla es para permitir el tráfico de SSH y actuará en puerto 22 y como en la anterior marcamos el mismo tipo de origen el cual servirá para lo mismo, en este caso la regla la utilizaremos para conectarnos a la instancia y administrarla.

![alt text](img/image-6.png)

- Este panel nos muestra que el grupo de seguridad se ha creado correctamente además de sus especificaciones.

![alt text](img/image-7.png)

## *Máquina Virtual EC2*

![alt text](img/image-15.png)

![alt text](img/image-9.png)

![alt text](img/image-10.png)

![alt text](img/image-11.png)

![alt text](img/image-12.png)

## Conexión desde la terminal

Mostrar las dos formas de conectarnos.

![alt text](img/image-13.png)


## Instalación y preparación del servidor en la MV de AWS

![alt text](img/image-16.png)

![alt text](img/image-17.png)

![alt text](img/image-18.png)

![alt text](img/image-19.png)

![alt text](img/image-20.png)

![alt text](img/image-26.png)

![alt text](img/image-22.png)

![alt text](img/image-23.png)

![alt text](img/image-24.png)

![alt text](img/image-25.png)

![alt text](img/image-28.png)

![alt text](img/image-30.png)

![alt text](img/image-29.png)

![alt text](img/image-31.png)

![alt text](img/image-32.png)

![alt text](img/image-33.png)

![alt text](img/image-34.png)

![alt text](img/image-35.png)

![alt text](img/image-36.png)

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



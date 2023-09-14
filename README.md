# Proyecto: Attention

Problemática: Reducción en la capacidad de atención y concentración de las personas

## Integrantes

- Benitez, Dante Flavian
- López, Cristian Javier
- Mercado, Eric Alejandro

## Requisitos del proyecto

- Base de datos compatible con Sequelize
- Claves VAPID para el envío de notificaciones

## Instalación

1. Ejecute

```bash
git clone https://github.com/tlp1-attention/attention-project 
cd attention-project
npm install
```

2. Cree un archivo .env detallando las variables especificadas en .env.example

```
PORT=3000

DB_PASSWORD=
DB_USERNAME=
DB_HOST=
DB_NAME=
SECRET_KEY=

VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=

NOTIFICATION_EMAIL=
```

Las variables que comiencen con DB hacen referencia a la base de datos correspondientes.
SECRET_KEY es la clave privada de JWT a utilizar. Puede establecer el valor que desee, preferiblemente uno seguro.

Para generar claves VAPID válidas, puede ejecutar el método `.generateVapidKeys()` del módulo `web-push`.

La variable `NOTIFICATION_EMAIL` debe contener una dirección de correo electrónico válida de la forma `mailto:example@domain.com`. Esta información es necesaria para enviar recordatorios mediante `web-push`.

3. De ser necesario, deberá sincronizar los modelos con la Base de datos. Para ello, ejecute sólo una vez el método `sequelize.sync({ force: true })`.

4. Por último, ejecute:

```
npm run dev
```
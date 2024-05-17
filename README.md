# Instrumentos React

Este repositorio contiene un proyecto de aplicación web que requiere ciertos pasos para su correcto funcionamiento. Sigue estas instrucciones para configurar y ejecutar la aplicación localmente.

## Instrucciones de Uso

### Configuración de la Base de Datos
- Descargá el archivo de dump de la base de datos proporcionado en este repositorio ("dump.db_instrumentos").
- Restaurá la base de datos utilizando el archivo dump en PostgreSQL.

### Instalación de node_modules
- Instalá los paquetes necesarios para el proyecto, ejecutando el siguiente comando:

```bash
npm install
```

### Levantar el Servidor
- Abrí una terminal y navegá hasta el directorio raíz del proyecto.
- Ejecutá el siguiente comando para iniciar el servidor backend:

```bash
npm run start:backend
```

- En simultáneo, en otra terminal, ejecutá el siguiente comando para levantar el servidor frontend:

```bash
npm run dev
```

- Ambos servidores deben ejecutarse en simultáneo para que la aplicación funcione correctamente.

### Llenado de la Base de Datos
- Una vez que los servidores estén en funcionamiento, accedé a la siguiente URL en tu navegador:
http://localhost:5173/instrumentos/send-json
- Hacé clic en el botón "Enviar Datos" para llenar la base de datos con los datos proporcionados en el archivo src/data/instrumentos.json.
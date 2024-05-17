# Instrumentos React

Este repositorio contiene un proyecto de aplicación web que requiere ciertos pasos para su correcto funcionamiento. Sigue estas instrucciones para configurar y ejecutar la aplicación localmente.

## Instrucciones de Uso

### Configuración de la Base de Datos
- Descargá el archivo de dump de la base de datos proporcionado en este repositorio ("backend/instrumentos/DumpInstrumentos.sql").
- Restaurá la base de datos utilizando el archivo dump en MySQL.

### Instalación de node_modules
- Instalá los paquetes necesarios para el proyecto, ejecutando el siguiente comando:

```bash
npm install
```

### Levantar el Servidor
- Abrí el proyecto contenido en "backend/instrumentos" con un IDE indicado para Java Spring.
- Ejecutá el archivo "InstrumentosApplication" contenido en "instrumentos/src/main/java/com/utn/instrumentos" para iniciar el servidor backend.

- En simultáneo, en otra terminal, navegá hasta el proyecto contenido en la carpeta "frontend", y ejecutá el siguiente comando para levantar el servidor frontend:

```bash
npm run dev
```

- Ambos servidores deben ejecutarse en simultáneo para que la aplicación funcione correctamente.

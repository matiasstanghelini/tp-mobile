# Seguimiento de Hábitos

Aplicación móvil para el seguimiento de hábitos diarios, desarrollada con Ionic y Angular.

## Características

- 📅 Seguimiento de hábitos diarios
- ⏰ Recordatorios personalizables
- 📊 Estadísticas de progreso
- 🎨 Interfaz intuitiva y fácil de usar
- 📱 Diseño responsivo para móviles

## Hábitos por Defecto

La aplicación incluye 3 hábitos predefinidos:

1. **Beber agua** - Recordatorio a las 09:00
2. **Hacer ejercicio** - Recordatorio a las 18:00
3. **Leer 20 minutos** - Recordatorio a las 21:00

Puedes agregar, editar o eliminar hábitos según tus necesidades.

## Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior) o yarn
- Ionic CLI (última versión)
- Capacitor (para compilación móvil)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd tp-mobile
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   ionic serve
   ```

## Estructura del Proyecto

```
src/
├── app/                      # Módulo principal de la aplicación
│   ├── pages/               # Páginas de la aplicación
│   │   ├── habits/          # Página de hábitos
│   │   ├── today/           # Página de hoy
│   │   └── stats/           # Página de estadísticas
│   └── tabs/                # Navegación por pestañas
├── assets/                  # Recursos estáticos
└── theme/                   # Estilos globales
```

## Almacenamiento

La aplicación utiliza el almacenamiento local del dispositivo para guardar:
- Hábitos personalizados
- Historial de completitud
- Preferencias del usuario

## Personalización

Puedes personalizar la aplicación modificando los archivos en `src/theme/` para cambiar los colores, fuentes y estilos generales.

## Compilación para Producción

Para compilar la aplicación para producción:

```bash
ionic build
```

## Despliegue en Dispositivos Móviles

1. Añade una plataforma:
   ```bash
   ionic capacitor add android
   # o
   ionic capacitor add ios
   ```

2. Abre el proyecto en el IDE correspondiente:
   ```bash
   npx cap open android
   # o
   npx cap open ios
   ```

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

Desarrollado con ❤️ para el curso de Desarrollo de Aplicaciones Móviles

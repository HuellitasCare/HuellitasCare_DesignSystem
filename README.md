# HuellitasCare · Design System

Librería de componentes en **React Native (Expo + TypeScript)** para **HuellitasCare**, una app que ayuda a los dueños de mascotas a evaluar síntomas, darles seguimiento en casa y contactar a un veterinario.

Los componentes salen del archivo de Figma **"HuellitasCare – UABC"**: la página **Design System** (colores, tipografía, botones, inputs, cards) y las pantallas de **FLUJOS** (registro e inicio de sesión, evaluador de urgencia moderada y alta, guía en casa, perfil de mascota, historial de síntomas y contacto con veterinario).

> Este repo contiene **solo componentes**: no hay pantallas, navegación ni lógica de negocio. `App.tsx` es un **catálogo** para ver y probar todos los componentes.

---

## Tabla de contenido

- [Requisitos](#requisitos)
- [Cómo correrlo](#cómo-correrlo)
- [Scripts](#scripts)
- [Estructura](#estructura)
- [Tokens de diseño](#tokens-de-diseño)
- [Componentes](#componentes)
- [Uso](#uso)
- [Convenciones](#convenciones)
- [Notas sobre el Figma](#notas-sobre-el-figma)

---

## Requisitos

- Node.js 20 o superior
- npm
- Para probar en el teléfono: la app **Expo Go** (iOS o Android)

## Cómo correrlo

```bash
npm install
npm start            # abre Expo; escanea el QR con Expo Go
npm run web          # o ábrelo en el navegador (http://localhost:8081)
```

Al abrir la app aparece el **catálogo de componentes**. Con los chips de arriba puedes filtrar por sección.

## Scripts

| Script              | Qué hace                                  |
| ------------------- | ----------------------------------------- |
| `npm start`         | Inicia el servidor de desarrollo de Expo   |
| `npm run ios`       | Abre en el simulador de iOS                |
| `npm run android`   | Abre en el emulador de Android             |
| `npm run web`       | Abre en el navegador                       |
| `npm run lint`      | Revisa el código con ESLint (`expo lint`)  |
| `npm run typecheck` | Revisa los tipos de TypeScript             |

Antes de subir cambios corre `npm run lint` y `npm run typecheck`.

## Estructura

```
.
├── App.tsx                 # Carga la fuente Inter y muestra el catálogo
├── src/
│   ├── theme/              # Tokens: colores, tipografía, espaciado, radios, urgencia
│   ├── components/
│   │   ├── ui/             # Base: AppText, Button, TextField, Chip, Badge, Card…
│   │   ├── feedback/       # Alertas, banners de urgencia, notas y estados de éxito
│   │   ├── navigation/     # Header, tab bar, stepper del evaluador, footer de pasos
│   │   ├── lists/          # Filas, grupos, listas clave-valor, checklist, tips
│   │   ├── pets/           # Saludo, selector y perfil de mascota, tarjetas del dashboard
│   │   ├── urgency/        # Resultado, escala, categorías de síntomas, niveles de gravedad
│   │   ├── symptoms/       # Registro del historial y adjuntar foto
│   │   ├── vet/            # Veterinarios, llamada de emergencia y chat
│   │   ├── content/        # Búsqueda, artículos, audio guía, recordatorios
│   │   └── index.ts        # Exporta todo
│   └── catalog/            # Secciones del catálogo (solo para desarrollo)
└── assets/
```

## Tokens de diseño

Todos viven en `src/theme` y se importan desde ahí:

```ts
import { colors, spacing, radius, typography } from './src/theme';
```

### Colores

| Token            | Valor     | Uso                                  |
| ---------------- | --------- | ------------------------------------ |
| `primary`        | `#2E7D32` | Verde salud: acciones principales    |
| `primaryLight`   | `#66BB6A` | Verde suave                          |
| `secondary`      | `#F57C00` | Naranja cálido: urgencia moderada y CTAs del evaluador |
| `secondaryLight` | `#FFCC80` | Durazno                              |
| `error`          | `#D32F2F` | Rojo: errores, urgencia alta         |
| `warning`        | `#F9A825` | Ámbar                                |
| `success`        | `#388E3C` | Verde                                |
| `background`     | `#F4F4F4` | Fondo de pantalla                    |
| `surface`        | `#FFFFFF` | Cards                                |
| `text`           | `#1A1A1A` | Texto principal                      |
| `textSecondary`  | `#6B6B6B` | Texto secundario                     |
| `muted`          | `#A0A0A0` | Texto deshabilitado o placeholders   |

Además hay tonos tenues (`primarySoft`, `secondarySoft`, `errorSoft`…) para los fondos de alertas, badges y elementos seleccionados.

### Tipografía (Inter)

| Variante       | Tamaño | Peso      |
| -------------- | ------ | --------- |
| `h1`           | 28     | Bold      |
| `h2`           | 22     | SemiBold  |
| `h3`           | 18     | SemiBold  |
| `body`         | 16     | Regular   |
| `bodySmall`    | 14     | Regular   |
| `caption`      | 13     | Regular   |
| `label`        | 13     | SemiBold  |
| `button`       | 16     | Medium    |
| `sectionLabel` | 11     | Bold, MAYÚSCULAS |

### Espaciado y radios

- `spacing`: `xxs 2 · xs 4 · sm 8 · md 12 · lg 16 · xl 20 · xxl 24 · xxxl 32`
- `radius`: `sm 8 · md 12` (botones, inputs) `· lg 16` (cards) `· pill`

### Urgencia

`urgencyStyles` da el color, el fondo y el color del indicador para cada nivel (`alta`, `moderada`, `baja`). Lo usan los banners, la escala, la tarjeta de resultado y la grilla de gravedad.

## Versión web

Los mismos componentes se publican como página estática en GitHub Pages: https://huellitascare.github.io/HuellitasCare_DesignSystem/

- `App.web.tsx` es la entrada solo para web (react-native-web): muestra los componentes en una columna, sin títulos. En iOS/Android sigue siendo el catálogo de `App.tsx`.
- `npm run build:web` genera la carpeta `dist/`. La ruta base está en `experiments.baseUrl` de `app.json`.
- `.github/workflows/pages.yml` lo publica en cada push a `main`. Hay que activar **Settings → Pages → Source: GitHub Actions** una sola vez.

## Componentes

| Carpeta        | Componentes |
| -------------- | ----------- |
| **ui**         | `AppText`, `Icon`, `Button` (primary, secondary, ghost, danger, accent, social, inverse, link), `IconButton`, `Badge`, `Chip`, `ChipGroup`, `TextField` (con error, contraseña y multilínea), `SelectField`, `Checkbox`, `RadioPillGroup`, `SegmentedControl` (tabs y pills), `ProgressBar`, `Divider`, `Avatar`, `SectionLabel`, `Card` |
| **feedback**   | `Alert`, `UrgencyBanner`, `InfoNote`, `SuccessState` |
| **navigation** | `AppHeader`, `BottomTabBar`, `WizardStepper`, `FooterNavigation` |
| **lists**      | `ListGroup`, `ListRow`, `KeyValueList`, `StatRow` / `StatCard`, `StepList`, `NumberedSteps`, `ChecklistItem`, `TipList` (evitar / ayuda / señales de alerta) |
| **pets**       | `GreetingHeader`, `PetSelector`, `AddPetTile`, `PetProfileHeader`, `MonitoringStatusCard`, `UrgencyActiveCard` |
| **urgency**    | `UrgencyResultCard`, `UrgencyScale`, `SymptomCategoryAccordion`, `SeverityLevelGrid` |
| **symptoms**   | `SymptomRecordRow`, `PhotoAttach` |
| **vet**        | `VetCard`, `EmergencyCallCard`, `ChatHeader`, `ChatBubble`, `ChatInput`, `DateSeparator` |
| **content**    | `SearchBar`, `ActionCard`, `FeaturedArticleCard`, `ArticleRow`, `AudioGuidePlayer`, `RangeHighlight`, `ReminderCard`, `NotificationPreview`, `ImagePlaceholder` |

Cada componente documenta sus props con comentarios JSDoc. El catálogo (`src/catalog/sections/*`) muestra ejemplos reales de uso de cada uno.

## Uso

```tsx
import { useState } from 'react';
import { View } from 'react-native';

import { AppHeader, Button, ListGroup, ListRow, TextField, UrgencyBanner } from './src/components';

export function Ejemplo() {
  const [nombre, setNombre] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title="Registrar síntoma" onBack={() => {}} />

      <TextField label="Nombre de la mascota" value={nombre} onChangeText={setNombre} />

      <UrgencyBanner level="moderada" description="Consulta en las próximas 24 horas" />

      <ListGroup>
        <ListRow icon="📖" title="Cuidados básicos" subtitle="Guías y consejos" onPress={() => {}} />
        <ListRow
          icon="🩺"
          title="Evaluador de urgencia"
          subtitle="Evalúa ahora"
          badge={{ label: '1', tone: 'error' }}
          onPress={() => {}}
        />
      </ListGroup>

      <Button title="Guardar síntoma" fullWidth onPress={() => {}} />
    </View>
  );
}
```

> `AppHeader` y `BottomTabBar` usan los márgenes seguros del dispositivo (notch), así que la app debe estar envuelta en `<SafeAreaProvider>` (como en `App.tsx`).

## Convenciones

- **Solo presentación:** los componentes reciben datos por props y avisan de las acciones con callbacks (`onPress`, `onChange`). No navegan, no llaman APIs y no guardan estado global.
- **Inputs controlados:** el valor viene de afuera (`value` + `onChange` / `onChangeText`).
- **Tokens siempre:** nada de colores o tamaños "a mano"; todo sale de `src/theme`.
- **Íconos:** los íconos de interfaz usan Ionicons (`@react-native-vector-icons/ionicons`, el reemplazo recomendado de `@expo/vector-icons`). Los íconos decorativos de las pantallas son emojis: muchas props (`icon`) aceptan un emoji (`"🐾"`) o un elemento (`<Icon name="call" />`).
- **Accesibilidad:** cada elemento interactivo tiene `accessibilityRole`, `accessibilityLabel` y `accessibilityState`, y un área táctil mínima de 44 px.
- **Textos en español**, igual que en el diseño.

## Notas sobre el Figma

- La tipografía sigue el frame **"Tipografía"** del Design System (H1 28 / Body 16). Los *text styles* publicados en Figma dicen H1 24 / Body 18; conviene actualizarlos para que diseño y código coincidan.
- El botón naranja de las pantallas del evaluador ("Contactar veterinario", "Qué hacer ahora") no estaba en el DS; aquí es la variante `accent` de `Button`.

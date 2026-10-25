# HuellitasCare · Design System Glass

Catálogo de componentes de **HuellitasCare Glass** para iOS, Android y web. Esta rama adapta la presentación de `HuellitasCare_Glass` al repositorio del design system: paleta botánica, tipografía Inter, iconos de trazo redondeado, superficies translúcidas, ilustración y composiciones de inicio. El catálogo conserva componentes de presentación; la autenticación, el evaluador clínico, la API y la persistencia permanecen en la aplicación.

## Ejecutar el catálogo

```bash
npm install
npm start
npm run web
npm run lint
npm run typecheck
```

`App.tsx` muestra el catálogo móvil con filtros por familia. `App.web.tsx` muestra la página web completa. `npm run build:web` genera el sitio estático en `dist/`; la base para GitHub Pages sigue configurada en `app.json`.

## Fundamentos

| Token | Valor | Uso |
| --- | --- | --- |
| `colors.primary` | `#23755F` | Acciones y foco |
| `colors.secondary` | `#A25422` | Acentos cálidos |
| `colors.error` | `#B23F4D` | Alertas de alta urgencia |
| `colors.background` | `#F0F6F3` | Fondo ambiental |
| `colors.text` | `#183D34` | Texto principal |
| `radius.md` / `radius.lg` | `20` / `28` | Controles y tarjetas |

Los tokens completos están en `src/theme/`: colores, espaciado, radios, tipografía, urgencia y sombras. Las variantes `h1`, `h2` y `body` usan 30, 23 y 16 puntos. `src/design/screen.ts` define el fondo ambiental multiplataforma.

`GlassSurface` tiene tres tonos (`light`, `soft`, `dark`). Usa Liquid Glass nativo en iOS cuando está disponible y la persona no ha activado Reducir transparencia. En web aplica desenfoque y respeta `prefers-reduced-transparency`; Android y plataformas sin soporte usan una superficie opaca. Las alternativas conservan contraste y no requieren lógica en las pantallas. Véase la [referencia de Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/sdk/glass-effect/).

## Componentes

Las familias en `src/components/` son `ui`, `feedback`, `navigation`, `lists`, `pets`, `urgency`, `symptoms`, `vet` y `content`. `src/design/` agrega `CareHero`, `WelcomeHero` y el fondo ambiental. La sección **Identidad Glass** muestra la marca, los tres tonos de superficie y ambos hero. Las demás secciones muestran estados y variantes de los componentes existentes con el nuevo tema.

La iconografía sigue el patrón de `HuellitasCare_App`: nombres de Ionicons para los iconos comunes y trazos SVG de 24 × 24 para los propios. La marca y la ilustración se guardan como SVG. `IconSlot` acepta un nombre de icono o un elemento React; las etiquetas del catálogo son nombres breves en español.

```tsx
import { AppText, Button, Card, GlassSurface } from './src/components';
import { colors } from './src/theme';

export function Ejemplo() {
  return (
    <GlassSurface tone="soft" style={{ padding: 20, gap: 12 }}>
      <AppText variant="h2" color={colors.text}>Cuidemos a Luna</AppText>
      <Card><AppText>Registra las señales que observas.</AppText></Card>
      <Button title="Evaluar síntomas" onPress={() => {}} />
    </GlassSurface>
  );
}
```

Los controles reciben datos por props y notifican cambios mediante callbacks. `AppHeader` y `BottomTabBar` necesitan `SafeAreaProvider` en la raíz. `TextField` es controlado (`value` y `onChangeText`). Las áreas táctiles tienen un mínimo de 44 puntos.

La adaptación toma los archivos de diseño de `HuellitasCare_Glass` y conserva Expo SDK 57 en este repositorio. `expo-image` y `expo-glass-effect` se instalaron en sus versiones compatibles mediante `expo install`. La carpeta fuente no se modifica ni se sincroniza automáticamente.

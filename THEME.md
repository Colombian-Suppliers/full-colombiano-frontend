# Full Colombiano Theme

This document describes the color palette and styling conventions used throughout the application, based on the cosp-app design system.

**Note:** The primary color is **GREEN** (`#3d6b28` for primary-600), not blue. This is the main brand color.

## Color Palette

### Primary Colors (Green)
The primary color is used for headings, links, buttons, focus states, and accents.

| Shade | Hex       | Usage                                    |
|-------|-----------|------------------------------------------|
| 50    | `#f0f9f0` | Light backgrounds, gradients (`from-primary-50`) |
| 100   | `#e0f2e0` | Very light backgrounds                   |
| 200   | `#c1e5c1` | Card borders (`border-primary-200`)      |
| 300   | `#a2d8a2` | Light accents                            |
| 400   | `#83cb83` | Input hover borders (`hover:border-primary-400`) |
| 500   | `#46802f` | Focus rings, checkboxes (`focus:ring-primary-500`, `accent-primary-500`) |
| 600   | `#3d6b28` | Links, buttons (`text-primary-600`, `bg-primary-600`) - **Main brand color** |
| 700   | `#345621` | Headings, link hover (`text-primary-700`, `hover:text-primary-700`) |
| 800   | `#2b411a` | Darker shades                            |
| 900   | `#222c13` | Darkest shades                           |

### Secondary Colors (Dark Green)
The secondary color is used for gradient backgrounds and secondary buttons.

| Shade | Hex       | Usage                                    |
|-------|-----------|------------------------------------------|
| 50    | `#f0f9f0` | Background gradients (`to-secondary-50`) |
| 100   | `#e0f2e0` | Very light backgrounds                   |
| 200   | `#c1e5c1` | Light accents                            |
| 300   | `#a2d8a2` | Light shades                             |
| 400   | `#83cb83` | Medium-light shades                      |
| 500   | `#1b5903` | Medium shades                            |
| 600   | `#164d03` | Secondary buttons (`bg-secondary-600`)   |
| 700   | `#124102` | Secondary button hover (`hover:bg-secondary-700`) |
| 800   | `#0e3502` | Darker shades                            |
| 900   | `#0a2901` | Darkest shades                           |

### Gray/Neutral Colors
Gray colors are used extensively for text, borders, and backgrounds.

| Shade | Hex       | Usage                                    |
|-------|-----------|------------------------------------------|
| 50    | `#f9fafb` | Footer backgrounds (`bg-gray-50`)        |
| 100   | `#f3f4f6` | Light backgrounds                        |
| 200   | `#e5e7eb` | Borders (`border-gray-200`)              |
| 300   | `#d1d5db` | Input borders (`border-gray-300`)        |
| 400   | `#9ca3af` | Placeholders, icons (`placeholder:text-gray-400`, `text-gray-400`) |
| 500   | `#6b7280` | Helper text (`text-gray-500`)            |
| 600   | `#4b5563` | Descriptions (`text-gray-600`)           |
| 700   | `#374151` | Form labels (`text-gray-700`)            |
| 800   | `#1f2937` | Dark text                                |
| 900   | `#111827` | Body text (`text-gray-900`)              |

## Common Patterns

### Auth Pages Background
```css
bg-gradient-to-br from-primary-50 to-secondary-50
```
Gradient background used in authentication layout.

### Card Structure
- **Card Container**: `bg-white rounded-lg border border-gray-200 shadow-sm`
- **Header Section**: `px-6 py-4 border-b border-gray-200`
  - Heading: `text-2xl font-bold text-center text-primary-700`
  - Description: `text-center text-gray-600 mt-2`
- **Body Section**: `px-6 py-4`
- **Footer Section**: `px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg`

### Links
- Default: `text-primary-600`
- Hover: `hover:text-primary-700 hover:underline`

### Form Inputs
- Border: `border-gray-300`
- Focus: `focus:ring-2 focus:ring-primary-500 focus:border-primary-500`
- Hover: `hover:border-primary-400`
- Placeholder: `placeholder:text-gray-400`

### Buttons
- Primary: `bg-primary-600 text-white hover:bg-primary-700`
- Secondary: `bg-secondary-600 text-white hover:bg-secondary-700`

### Headings
- Page Titles: `text-2xl font-bold text-primary-700`
- Section Titles: `text-xl font-bold text-primary-700`

### Text Colors
- Body Text: `text-gray-900`
- Descriptions: `text-gray-600`
- Labels: `text-gray-700`
- Helper Text: `text-gray-500`

## Usage Examples

### Login/Register Card
```jsx
<Card className="bg-white rounded-lg border border-gray-200 shadow-sm w-full max-w-lg">
  <div className="px-6 py-4 border-b border-gray-200">
    <h1 className="text-2xl font-bold text-center text-primary-700">
      Bienvenido de vuelta
    </h1>
    <p className="text-center text-gray-600 mt-2">
      Ingresa tus credenciales para continuar
    </p>
  </div>
  <div className="px-6 py-4">
    {/* Form content */}
  </div>
  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
    {/* Footer links */}
  </div>
</Card>
```

### Auth Layout Background
```jsx
<div className="h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col">
  <main className="flex-1 flex flex-col items-center justify-center">
    {/* Content */}
  </main>
</div>
```

### Link Styling
```jsx
<Link
  href="/register"
  className="text-primary-600 hover:underline hover:text-primary-700 transition-colors"
>
  Regístrate aquí
</Link>
```

### Form Input
```jsx
<input
  type="email"
  className="w-full py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors border-gray-300 focus:ring-primary-500 focus:border-primary-500"
  placeholder="tucorreo@ejemplo.com"
/>
```

## Animations

### Fade In
```css
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}
```

### Slide Up
```css
.animate-slide-up {
  animation: slideUp 0.4s ease-out;
}
```

## Typography

- **Font Family**: System UI stack (system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)
- **Headings**: Bold, primary-700 color
- **Body Text**: Regular, gray-900 color
- **Descriptions**: Regular, gray-600 color


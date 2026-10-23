# Noxsensi

Build the NOX SENSI app UI by using the attached 3 reference images as the PRIMARY visual reference.



IMPORTANT:

Do NOT redesign the UI.

Do NOT change the overall layout, spacing, colors, typography style, card style, navigation style, or visual hierarchy.

Recreate the same visual language and flow as the references, while making the UI responsive and functional.



APP NAME:

NOX SENSI



THEME:

- Default dark mode

- Black / deep navy background

- Free Fire-inspired neon yellow accents

- White text

- Subtle blue highlights

- Premium gaming aesthetic

- Smooth rounded cards

- Thin borders

- Soft glow effects

- Lightweight, clean UI



SCREEN 1 — HOME:

Follow Reference Image 1 exactly:

- NOX SENSI logo/header at top

- Notification icon on right

- Large Free Fire hero banner

- "FIND YOUR PERFECT SENSITIVITY"

- "GET STARTED" button

- "CHOOSE YOUR DEVICE BRAND"

- 12 brand buttons in exactly 3 rows × 4 columns:

  Samsung, Xiaomi, realme, OPPO

  OnePlus, vivo, iPhone, iQOO

  Motorola, Google Pixel, POCO, Infinix

- Bottom navigation:

  Home | DPI | Save | Help



SCREEN 2 — BRAND MODELS:

Follow Reference Image 2 exactly.



When Samsung is selected:

- Show Samsung header

- Search device field

- All / Old / New filters

- Show 20+ Samsung models

- Models should mainly cover devices released around 2020–2026

- Use cards with phone image, model name and release year

- Keep the same 2-column card layout and spacing from the reference

- Samsung Galaxy S20, S21, S22, S23, S24, S25 and relevant A-series models should be included.

- Clicking Galaxy S24 must open the sensitivity generator screen.



SCREEN 3 — SENSITIVITY GENERATOR:

Follow Reference Image 3 exactly.



For Samsung Galaxy S24:

- Show Galaxy S24 image

- Show model name

- Show correct RAM options for the selected device

- For the reference state, use 8GB RAM

- Show processor/device information

- Model selector

- RAM selector

- "GENERATE SENSITIVITY" button



IMPORTANT:

The reference state should already look like the Generate button has been pressed.



Show generated sensitivity values:



General: random value between 180–200

Red Dot: random value between 170–195

2x Scope: random value between 160–190

4x Scope: random value between 130–160

Sniper Scope: random value between 150–180



For the initial Galaxy S24 example, use:

General: 188

Red Dot: 182

2x Scope: 171

4x Scope: 142

Sniper Scope: 166



Each generated result should be visually displayed exactly like the reference with:

- Sensitivity name

- Value

- Range

- Progress bar

- Gaming/aim icon



FUNCTIONAL FLOW:

Home → Select Brand → Select Mobile → Select RAM → Generate Sensitivity → Result



The selected mobile and RAM must dynamically affect the displayed device information.



Keep the entire app visually consistent with the 3 attached reference images.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://noxsensi.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/131061f4-b198-4a76-808a-6c7ed860c0b2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

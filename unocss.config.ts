import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

// @unocss-include

export default defineConfig({
  shortcuts: [
    ["n-link", "op50 hover:(op100 text-primary) transition"],
    ["n-link-text", "n-link underline"],
    ["n-tab", "text-base tracking-wide uppercase p3 border-b-2 border-transparent op20 transition"],
    ["n-tab-active", "border-current op100"],
    ["border-base", "border-gray-400/20"],
    ["flex-bc", "flex justify-between items-center"],
    ["flex-cc", "flex justify-center items-center"],
    ["dr", 'bg-red'],
    ["db", 'bg-blue'],
    ["btn-primary", "bg-primary opacity-80 rounded-md font-semibold shadow-sm mt-5 text-sm text-white w-full py-2 px-3 hover:(opacity-100)"],
  ],
  rules: [[/^view-transition-([\w-]+)$/, ([, name]) => ({ "view-transition-name": name })]],
  theme: {
    colors: {
      primary: "#6366f1",
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: "DM Sans",
        serif: "DM Serif Display",
        mono: "DM Mono",
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});

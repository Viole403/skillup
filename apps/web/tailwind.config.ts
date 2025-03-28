// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@workspace/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./apps/src/**/*.tsx"],
  presets: [sharedConfig],
};

export default config;
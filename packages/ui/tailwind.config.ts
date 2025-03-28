import type { Config } from "tailwindcss";
// import sharedConfig from "@workspace/tailwind-config";

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: ["./src/**/*.tsx"],
  prefix: "ui-",
  presets: [],
};

export default config;
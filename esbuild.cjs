const esbuild = require("esbuild");
const postCssPlugin = require("esbuild-style-plugin");
const sveltePlugin = require("esbuild-svelte");

let outdir = "./public";

esbuild
  .build({
    entryPoints: ["./src/index.js", "./src/styles/styles.css"],
    bundle: true,
    // minify: true,
    mainFields: ["svelte", "browser", "module", "main"],
    conditions: ["svelte", "browser"],
    sourcemap: true,
    target: ["es2020"],
    format: "esm",
    splitting: true,
    outdir: outdir,
    metafile: true,
    loader: {
      ".html": "text",
    },
    plugins: [
      sveltePlugin({
        compilerOptions: { css: "injected" },
      }),
      postCssPlugin({
        postcss: {
          plugins: [require("tailwindcss"), require("autoprefixer")],
        },
      }),
    ],
  })
  .catch(() => process.exit(1));

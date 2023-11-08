const esbuild = require("esbuild");
const postCssPlugin = require("esbuild-style-plugin");
const sveltePlugin = require("esbuild-svelte");

esbuild
  .build({
    entryPoints: ["./src/index.js"],
    bundle: true,
    minify: true,
    mainFields: ["svelte", "browser", "module", "main"],
    conditions: ["svelte", "browser"],
    sourcemap: true,
    target: ["es2020"],
    format: "esm",
    splitting: true,
    outdir: "./public",
    metafile: true,
    loader: {
      ".html": "text",
    },
    plugins: [sveltePlugin()],
  })
  .catch(() => process.exit(1));

// esbuild styles
esbuild
  .build({
    entryPoints: ["./src/styles/styles.css", "./src/styles/fonts.css"],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ["es2020"],
    format: "esm",
    splitting: false,
    outdir: "./public/styles",
    metafile: true,
    loader: {
      ".woff": "file",
      ".woff2": "file",
    },
    plugins: [
      postCssPlugin({
        postcss: {
          plugins: [require("tailwindcss"), require("autoprefixer")],
        },
      }),
    ],
  })
  .catch(() => process.exit(1));

const esbuild = require("esbuild");
const postCssPlugin = require("esbuild-style-plugin");
const sveltePlugin = require("esbuild-svelte");

esbuild
  .context({
    entryPoints: ["./src/index.js", "./src/styles/styles.css"],
    mainFields: ["svelte", "browser", "module", "main"],
    conditions: ["svelte", "browser"],
    bundle: true,
    sourcemap: true,
    target: ["es2020"],
    format: "esm",
    outdir: "./public",
    metafile: true,
    loader: {
      ".html": "text",
      ".woff": "file",
      ".woff2": "file",
    },
    plugins: [
      postCssPlugin({
        postcss: {
          plugins: [require("tailwindcss"), require("autoprefixer")],
        },
      }),
      sveltePlugin(),
    ],
  })
  .then((ctx) => {
    console.log("Watching for file changes...");
    ctx.watch().catch(() => process.exit(1));
  })
  .catch(() => process.exit(1));

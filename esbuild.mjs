import * as esbuild from 'esbuild'

esbuild.build({
  entryPoints: [
    './src/index.js',
  ],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['es2020'],
  format: 'esm',
  splitting: true,
  outdir: './public',
  metafile: true,
}).catch(() => process.exit(1))

// esbuild styles
esbuild.build({
  entryPoints: [
    './src/styles/styles.css',
    './src/styles/fonts.css',
  ],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['es2020'],
  format: 'esm',
  splitting: false,
  outdir: './public/styles',
  metafile: true,
  loader: {
    '.woff': 'file',
    '.woff2': 'file',
  },
}).catch(() => process.exit(1));

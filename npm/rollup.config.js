// @ts-check

import nodeResolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import filesize from "rollup-plugin-filesize";
// import { terser } from "rollup-plugin-terser";

const bundle = {
  input: ["parse5.ts"],
  output: {
    dir: "./dist",
    format: "esm",
    sourcemap: true
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    // terser(),
    filesize({ showBrotliSize: true })
  ]
};

export default [bundle];

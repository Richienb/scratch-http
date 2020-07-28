/* eslint-disable node/no-unpublished-import, import/no-anonymous-default-export */

import babel from "@rollup/plugin-babel"
import compiler from "@ampproject/rollup-plugin-closure-compiler"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import serve from "rollup-plugin-serve"
import path from "path"

const isProduction = !process.env.ROLLUP_WATCH

export default {
	input: "source/index.js",
	output: {
		file: "dist/index.min.js",
		format: "iife",
		sourcemap: !isProduction
	},
	plugins: [
		!isProduction && serve({
			open: true,
			openPage: "/node_modules/scratch-gui/index.html?extension=/dist/index.min.js",
			contentBase: path.resolve("."),
			headers: {
				"Access-Control-Allow-Origin": "*"
			}
		}),
		resolve({ browser: true }),
		commonjs(),
		babel({
			presets: [["@babel/preset-env", { targets: { browsers: ["last 3 versions", "Safari >= 8", "iOS >= 8"] } }]],
			babelHelpers: "bundled"
		}),
		isProduction && compiler({ externs: "utils/externs.js" })
	]
}

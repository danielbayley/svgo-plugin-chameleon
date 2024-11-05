<img alt="Chameleon" src="illustration.svg" align="right" width="98vw">

_Chameleon_
===========
Simple _[SVGO]_ [plugin] to change [`fill`] and [`stroke`] [attribute] colors.
Particularly useful for processing icons.

## Install
~~~ sh
pnpm add @danielbayley/svgo-plugin-chameleon --save-dev
~~~

API
---
This package is _[ESM]_ [only], and so [requires] _[Node]_ [`>=`]
[`14.16`] and must be [`import`]ed instead of [`require`]d:
~~~ json5
// package.json
"type": "module",
"engines": {
  "node": ">=14.16"
},
~~~
~~~ js
import { readFile, writeFile } from "node:fs/promises"
import { optimize } from "svgo"
import { chameleon } from "@danielbayley/svgo-plugin-chameleon"

const path = "input.svg"
const svg = await readFile(path, "utf-8")
~~~
~~~ svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
  fill="#0000"
  stroke="white"
>
  <rect width="14" height="14" x="1" y="1" rx="3.5"/>
  <circle cx="8" cy="8" r="3" fill="none"/>
  <circle cx="12" cy="4" r=".1"/>
</svg>
~~~
Passing `fill:` or `stroke:` as [`params`] will forcibly override those [attribute]s:
~~~ js
const { data } = optimize(svg, {
  path,
  //js2svg: { pretty: true, indent: 2 },
  plugins: [{
    ...chameleon,
    params: {
      fill: "none"
      stroke: "black"
    }
  }]
})

writeFile("output.svg", data)
~~~
~~~ svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
  fill="none"
  stroke="black"
>
  <rect width="14" height="14" x="1" y="1" rx="3.5"/>
  <circle cx="8" cy="8" r="3" fill="none"/>
  <circle cx="12" cy="4" r=".1"/>
</svg>
~~~

An `auto:` property will instead allow the algorithm to automatically find the first
existing [`stroke`] or [`fill`] attribute not already set to `none`, and override it with
the corresponding given value. Should neither exist, it will default to adding a `fill`:
~~~ js
optimize(svg, {
  plugins: [{
    ...chameleon,
    params: { auto: "currentcolor" }
  }]
})
~~~
~~~ svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
  fill="none"
  stroke="currentcolor"
>
  <rect width="14" height="14" x="1" y="1" rx="3.5"/>
  <circle cx="8" cy="8" r="3" fill="none"/>
  <circle cx="12" cy="4" r=".1"/>
</svg>
~~~
A value of [`currentcolor`] will inherit from the context of the [SVG].

This plugin currently works on the root [`<svg>`] [element] only,
and does not affect any [`<style>`] element, or [`style`] attributes.

License
-------
[MIT] © [Daniel Bayley]

[MIT]:                LICENSE.md
[Daniel Bayley]:      https://github.com/danielbayley

[svg]:                https://developer.mozilla.org/docs/Web/SVG
[element]:            https://developer.mozilla.org/docs/Web/SVG/Element
[`<svg>`]:            https://developer.mozilla.org/docs/Web/SVG/Element/svg
[`<style>`]:          https://developer.mozilla.org/docs/Web/SVG/Element/style
[attribute]:          https://developer.mozilla.org/docs/Web/SVG/Attribute
[`style`]:            https://developer.mozilla.org/docs/Web/SVG/Attribute/style
[`fill`]:             https://developer.mozilla.org/docs/Web/SVG/Attribute/fill
[`stroke`]:           https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke
[`currentcolor`]:     https://gomakethings.com/currentcolor-and-svgs

[svgo]:               https://svgo.dev/docs/introduction
[plugin]:             https://svgo.dev/docs/plugins
[`params`]:           https://github.com/svg/svgo#custom-plugins

[node]:               https://nodejs.org
[requires]:           https://docs.npmjs.com/cli/v9/configuring-npm/package-json#engines
[`>=`]:               https://docs.npmjs.com/cli/v6/using-npm/semver#ranges
[`14.16`]:            https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V14.md#14.16.0
[ESM]:                https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules
[only]:               https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[`import`]:           https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import
[`require`]:          https://nodejs.org/api/modules.html#requireid

import assert from "node:assert"
import { readFile } from "node:fs/promises"

import { optimize } from "svgo"
import { chameleon } from "../index.js"

console.log("NODE VERSION:", process.versions.node) // TODO: DELETE

const data = await readFile("test/fixtures/test.svg", "utf-8")
let { data: svg } = optimize(data, {
  plugins: [{
    name: "removeAttrs",
    params: { attrs: ["fill", "stroke"] }
  }]
})

function test(svg, params) {
  const { data } = optimize(svg, { plugins: [{ ...chameleon, params }] })
  return data
}

// Adds a fill attribute if no fill or stroke exists
const fill = "none"
assert(test(svg, [fill]).includes(`fill="${fill}"`))

// Forcibly overrides fill and stroke attributes
let stroke = "white"
svg = test(svg, { stroke, fill })
assert(svg.includes(`fill="${fill}" stroke="${stroke}"`))

// Skips irrelevant attributes
assert(test(svg, { "fill-rule": "nonzero", fill, "stroke-width": 2 }).includes(`fill="${fill}"`))

// Skips fill: none
stroke = "currentcolor"
assert(test(svg, [stroke]).includes(`stroke="${stroke}"`))

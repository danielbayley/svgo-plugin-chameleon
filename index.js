import manifest from "./package.json" assert { type: "json" }

let { name, description } = manifest
name = name.replace(/^(@[a-z-]+\/)?svgo-plugin-/, "")

const exists = ["stroke", "fill"]

const fn = ({ type }, { fill, stroke, auto, "0": aut0 }) => {
  function enter({ children: [{ name, attributes }] }) {
    if (name !== "svg") return
    auto ??= aut0

    if (!auto) return Object.assign(attributes, { fill, stroke })

    const [attribute] = Object.entries(attributes)
      .filter(([,value]) => value !== "none")
      .find(([attribute]) => exists.includes(attribute)) ?? exists.slice(1)

    attributes[attribute] = auto
  }
  return { [type]: { enter }}
}

export const chameleon = { name, description, fn }
export default chameleon

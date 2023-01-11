export function createColor(...values: number[]) {
  return `\u001b[${values[0]}m`
}

export const color = {
  white: createColor(0),
  red: createColor(31),
  green: createColor(32),
  yellow: createColor(33),
  blue: createColor(34),
  purple: createColor(35),
  cyan: createColor(36)
}
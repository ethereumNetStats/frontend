const isCloseTo1 = (num: number, tolerance = 0.000001): boolean => {
  return Math.abs(num - 1) < tolerance
}

const isDecimal = (num: number): boolean => {
  return num % 1 === 0
}

export { isCloseTo1, isDecimal }

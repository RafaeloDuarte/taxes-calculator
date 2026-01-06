import { describe, it, expect } from "vitest"
import { calculateTaxes } from "../../src/core/calculator"

describe("calculateTaxes – orquestração", () => {
  it("processa sequência completa de operações", () => {
    const result = calculateTaxes([
      { operation: "buy", unitCost: 10, quantity: 10000 },
      { operation: "sell", unitCost: 5, quantity: 5000 },
      { operation: "sell", unitCost: 20, quantity: 3000 }
    ])

    expect(result).toEqual([
      { tax: 0 },
      { tax: 0 },
      { tax: 1000 }
    ])
  })
})

import { describe, it, expect } from "vitest"
import { calculateTaxes } from "../../src/core/calculator"

describe("calculateTaxes", () => {

  it("retorna imposto zero para compras", () => {
    const result = calculateTaxes([
      { operation: "buy", unitCost: 10, quantity: 100 }
    ])

    expect(result).toEqual([{ tax: 0 }])
  })

  it("processa uma sequência de buy + sell", () => {
    const result = calculateTaxes([
      { operation: "buy", unitCost: 10, quantity: 10000 },
      { operation: "sell", unitCost: 20, quantity: 5000 }
    ])

    expect(result).toEqual([
      { tax: 0 },
      { tax: 10000 }
    ])
  })

  it("mantém a ordem dos impostos conforme as operações", () => {
    const result = calculateTaxes([
      { operation: "buy", unitCost: 10, quantity: 100 },
      { operation: "buy", unitCost: 20, quantity: 100 },
      { operation: "sell", unitCost: 30, quantity: 50 }
    ])

    expect(result.length).toBe(3)
  })
})

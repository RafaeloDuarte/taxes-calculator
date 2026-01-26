import { describe, it, expect } from "vitest";
import { Operation } from "../../src/types";
import Portifolio from "../../src/domain/Portfolio";

const buy = (unitCost: number, quantity: number): Operation => ({
    operation: 'buy',
    unitCost: unitCost,
    quantity: quantity,
})

const sell = (unitCost: number, quantity: number): Operation => ({
    operation: 'sell',
    unitCost: unitCost,
    quantity: quantity,
})

describe("Portfolio Domain test", () => {
    it("When operation is buy", () => {
        const p = new Portifolio()

        p.buy(buy(10, 100))
        p.buy(buy(10, 50))

        expect(p.getQuantity()).toBe(150)
        expect(p.getAvgProfit()).toBe(10)
        expect(p.getLoss()).toBe(0)
    })

    it("When operation is sell", () => {
        const p = new Portifolio()

        p.buy(buy(10, 1000))
        p.buy(buy(10, 50000))
        expect(p.sell(sell(20, 7000))).toStrictEqual({ tax: 14000 })
    })

    it("Acumulating losses", () => {
        const p = new Portifolio()

        p.buy(buy(10, 10000))
        p.sell(sell(5, 5000))

        expect(p.getLoss()).toBe(25000)
    })
})
import { describe, it, expect } from "vitest";
import { initialState, portifolioReducer } from "../../src/domain/portfolioReducer";
import { PortifolioEvent, PortifolioState } from "../../src/domain/events";

describe('portifolioReducer - dedução de prejuízo, cálculo de imposto', () => {
    it('when operation is buy, its do not responds with a tax just updates average and quantity', () => {
        const state = initialState
        const event: PortifolioEvent = { quantity: 10, type: "BUY", unitCost: 1000 }
        const result = portifolioReducer(state, event)

        expect(result.state.quantity).toBe(10)
        expect(result.state.avgProfit).toBe(1000)
        expect(result.tax).toBe(0)
    })

    it('when sell give profit less than 0', () => {
        const state: PortifolioState = {
            quantity: 10000,
            avgProfit: 10,
            losses: 0
        }

        const event: PortifolioEvent = {
            quantity: 5000,
            unitCost: 5,
            type: 'SELL'
        }

        const result = portifolioReducer(state, event)

        expect(result.state.avgProfit).toEqual(10)
        expect(result.state.losses).toEqual(25000)
        expect(result.tax).toEqual(0)
    })

    it('when theres a profit but with acumutated losses', () => {
        const state: PortifolioState = {
            quantity: 5000,
            avgProfit: 10,
            losses: 15000
        }

        const event: PortifolioEvent = {
            type: 'SELL',
            unitCost: 15,
            quantity: 2000
        }

        const result = portifolioReducer(state, event)

        expect(result.state.avgProfit).toEqual(10)
        expect(result.state.losses).toEqual(5000)
        expect(result.state.quantity).toEqual(3000)
        expect(result.tax).toEqual(0)
    })

    it('when sell has positive profit', () => {
        const state: PortifolioState = {
            avgProfit: 10,
            quantity: 1000,
            losses: 15000
        }

        const event: PortifolioEvent = {
            quantity: 500,
            unitCost: 50,
            type: 'SELL'
        }

        const result = portifolioReducer(state, event)

        expect(result.state.losses).toBe(0)
        expect(result.tax).toBe(1000)
    })

    it('when total is less/equal than 2000', () => {
        const state: PortifolioState = {
            avgProfit: 10,
            losses: 0,
            quantity: 0
        }

        const event: PortifolioEvent = {
            quantity: 100,
            unitCost: 10,
            type: 'SELL'
        }

        const result = portifolioReducer(state, event)

        expect(result.tax).toBe(0)
    })
})
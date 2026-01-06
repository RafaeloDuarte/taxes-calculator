import { Operation, CalculationState, Result } from "../types"

const ERROR_TRIES = 2
const MINIMUM_TOTAL = 20000
const TAX_PERCENT = 0.20

export const calculateTaxes = (operations: Operation[]): Result[] => {
    const state = {
        avgProfit: 0,
        loss: 0,
        quantity: 0,
        active: true,
        errorTries: 0
    } as CalculationState
    const result = [] as Result[]

    for (let op of operations) {
        if (!state.active) {
            result.push({ error: "Your account is blocked" })
        } else if (op.operation === "buy") {
            handleBuy(op, state)
            result.push({ tax: 0 })
        } else {
            const resultValue = handleSell(op, state)
            result.push(resultValue)
        }
    }

    return result
}

function handleBuy(op: Operation, state: CalculationState): void {
    const totalAvgCost = state.avgProfit * state.quantity
    const newTotalCost = op.unitCost * op.quantity

    state.quantity += op.quantity
    state.avgProfit = round2((totalAvgCost + newTotalCost) / state.quantity)
}

function handleSell(op: Operation, state: CalculationState): Result {
    const total = op.quantity * op.unitCost
    const profit = (op.unitCost - state.avgProfit) * op.quantity
    let newProfit = profit

    if (state.errorTries >= ERROR_TRIES) {
        state.active = false
    }

    if (op.quantity <= state.quantity) {
        state.errorTries = 0
    }
    
    if (op.quantity > state.quantity) {
        state.errorTries++
        return { error: "Can't sell more stocks than you have" }
    }

    state.quantity -= op.quantity

    if (profit < 0) {
        state.loss += Math.abs(profit)
        return { tax: 0 }
    }

    if (total <= MINIMUM_TOTAL) {
        return { tax: 0 }
    }

    if (state.loss > 0) {
        const deducted = Math.min(state.loss, newProfit)
        state.loss -= deducted
        newProfit -= deducted
    }

    const finalTax = newProfit * TAX_PERCENT

    return { tax: finalTax }
}

function round2(n: number) {
    return Math.round(n * 100) / 100
}

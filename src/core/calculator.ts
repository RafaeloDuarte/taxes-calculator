import { Operation, CalculationState, Tax } from "../types"

export const calculateTaxes = (operations: Operation[]): Tax[] => {
    const state = {
        avgProfit: 0,
        loss: 0,
        quantity: 0
    } as CalculationState
    const taxes = [] as Tax[]

    for (let op of operations) {
        if (op.operation === "buy") {
            handleBuy(op, state)
            taxes.push({ tax: 0 })
        } else {
            const tax = handleSell(op, state)
            taxes.push(tax)
        }
    }

    return taxes
}

function handleBuy(op: Operation, state: CalculationState): void {
    const totalAvgCost = state.avgProfit * state.quantity
    const newTotalCost = op.unitCost * op.quantity

    state.quantity += op.quantity
    state.avgProfit = round2((totalAvgCost + newTotalCost) / state.quantity)
}

function handleSell(op: Operation, state: CalculationState): Tax {
    const total = op.quantity * op.unitCost
    const profit = (op.unitCost - state.avgProfit) * op.quantity
    let newProfit = profit

    state.quantity -= op.quantity

    if (profit < 0) {
        state.loss += Math.abs(profit)
        return { tax: 0 }
    }

    if (total <= 20000) {
        return { tax: 0 }
    }

    if (state.loss > 0) {
        const deducted = Math.min(state.loss, newProfit)
        state.loss -= deducted
        newProfit -= deducted
    }

    const finalTax = newProfit * 0.20

    return { tax: finalTax }
}

function round2(n: number) {
    return Math.round(n * 100) / 100
}

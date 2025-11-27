import { CalculationState, Operation, Tax } from "../types"
import { round2 } from "../utils"
import { adjustedLosses, applyLosses, calculateProfit, isTaxable } from "./taxRules"

export function handleBuy(op: Operation, state: CalculationState): void {
    const totalAvgCost = state.avgProfit * state.quantity
    const newTotalCost = op.unitCost * op.quantity

    state.quantity += op.quantity
    state.avgProfit = round2((totalAvgCost + newTotalCost) / state.quantity)
}

export function handleSell(op: Operation, state: CalculationState): Tax {
    const total = op.quantity * op.unitCost
    const profit = calculateProfit(op, state)

    state.quantity -= op.quantity

    adjustedLosses(state, profit)

    if (isTaxable(profit, total)) return { tax: 0 }

    let adjustedProfit = applyLosses(state, profit)

    return { tax: adjustedProfit * 0.20 }
}
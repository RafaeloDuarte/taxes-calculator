import { CalculationState, Operation } from "../types"
import { round2 } from "../utils"

export function calculateProfit(op: Operation, state: CalculationState) {
    const profit = (op.unitCost - state.avgProfit) * op.quantity
    return round2(profit)
}

export function isTaxable(profit: number, total: number) {
    if (total <= 20000 || profit < 0) return true
    return false
}

export function applyLosses(
    state: CalculationState,
    profit: number
) {
    let adjusted = profit

    if (state.loss > 0) {
        const deducted = Math.min(state.loss, adjusted)
        adjusted -= deducted
        state.loss -= deducted
    }

    return adjusted
}

export function adjustedLosses(state: CalculationState, profit: number) {
    if (profit < 0) {
        state.loss += Math.abs(profit)
    }
}
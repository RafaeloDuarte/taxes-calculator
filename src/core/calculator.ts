import { Operation, CalculationState, Tax } from "../types"
import { handleBuy, handleSell } from "./handlers"

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

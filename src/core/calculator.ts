import { Operation, Tax } from "../types"
import { initialState, portifolioReducer } from "../domain/portfolioReducer"
import { PortifolioEvent } from "../domain/events"

export const calculateTaxes = (operations: Operation[]): Tax[] => {
    let state = initialState
    const taxes = [] as Tax[]

    for (let op of operations) {
        const event: PortifolioEvent =
            op.operation === "buy" ?
                { type: "BUY", unitCost: op.unitCost, quantity: op.quantity } :
                { type: "SELL", unitCost: op.unitCost, quantity: op.quantity }

        const result = portifolioReducer(state, event)
        state = result.state

        taxes.push({ tax: result.tax })
    }

    return taxes
}

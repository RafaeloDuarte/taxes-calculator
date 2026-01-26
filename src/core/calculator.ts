import Portifolio from "../domain/Portfolio"
import { Operation, Tax } from "../types"

export const calculateTaxes = (operations: Operation[]): Tax[] => {
    const portifolio = new Portifolio()
    const taxes = [] as Tax[]

    for (let op of operations) {
        if (op.operation === "buy") {
            portifolio.buy(op)
            taxes.push({ tax: 0 })
        } else {
            const tax = portifolio.sell(op)
            taxes.push(tax)
        }
    }

    return taxes
}

import { Operation, Tax } from "../types"
import { round2 } from "../utils"

class Portifolio {
    private avgProfit = 0
    private loss = 0
    private quantity = 0

    buy(op: Operation) {
        const totalAvgCost = this.avgProfit * this.quantity
        const newTotalCost = op.unitCost * op.quantity

        this.quantity += op.quantity
        this.avgProfit = round2((totalAvgCost + newTotalCost) / this.quantity)
    }

    sell(op: Operation): Tax {
        const total = op.quantity * op.unitCost
        const profit = (op.unitCost - this.avgProfit) * op.quantity

        this.quantity -= op.quantity

        if (profit < 0) {
            this.loss += Math.abs(profit)
        }

        if (this.isTaxable(profit, total)) return { tax: 0 }

        let adjustedProfit = this.applyLosses(profit)

        return { tax: adjustedProfit * 0.20 }
    }

    applyLosses(
        profit: number
    ) {
        let adjusted = profit

        if (this.loss > 0) {
            const deducted = Math.min(this.loss, adjusted)
            adjusted -= deducted
            this.loss -= deducted
        }

        return adjusted
    }

    isTaxable(profit: number, total: number) {
        if (total <= 20000 || profit < 0) return true
        return false
    }

    getAvgProfit(): number {
        return this.avgProfit
    }

    getLoss(): number {
        return this.loss
    }

    getQuantity(): number {
        return this.quantity
    }
}

export default Portifolio
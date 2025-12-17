export type BuyEvent = {
    type: "BUY",
    unitCost: number,
    quantity: number
}

export type SellEvent = {
    type: "SELL",
    unitCost: number,
    quantity: number
}

export type PortifolioEvent = BuyEvent | SellEvent

export type PortifolioState = {
    avgProfit: number
    quantity: number
    losses: number
}
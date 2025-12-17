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
    quantity: number,
    avgPrice: number,
    losses: number
}
export type Operation = {
    operation: string;
    unitCost: number;
    quantity: number;
}

export type CalculationState = {
    loss: number;
    avgProfit: number;
    quantity: number;
}

export type Tax = {
    tax: number;
}

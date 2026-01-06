export type Operation = {
    operation: string;
    unitCost: number;
    quantity: number;
}

export type CalculationState = {
    loss: number;
    avgProfit: number;
    quantity: number;
    active: boolean;
    errorTries: number;
}

export type Tax = {
    tax: number;
}

export type Error = {
    error: string;
}

export type Result = Tax | Error

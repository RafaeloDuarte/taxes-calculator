import { round2 } from "../utils"
import { PortifolioEvent } from "./events"

export type PortifolioState = {
    avgProfit: number
    quantity: number
    losses: number
}

export type PortifolioResult = {
    state: PortifolioState
    tax: number
}

export const initialState: PortifolioState = {
    avgProfit: 0,
    quantity: 0,
    losses: 0
}

export function portifolioReducer(
    state: PortifolioState,
    event: PortifolioEvent
): PortifolioResult {
    switch (event.type) {
        case "BUY":
            return reduceBuy(state, event)
        case "SELL":
            return reduceSell(state, event)
    }
}

function reduceBuy(
    state: PortifolioState,
    event: PortifolioEvent
): {
    state: PortifolioState,
    tax: number
} {
    const beforeCost = state.avgProfit * state.quantity
    const newCost = event.unitCost * event.quantity
    const newQuantity = state.quantity + event.quantity
    
    const newAvg = (beforeCost + newCost) / newQuantity

    return {
        state: {
            ...state,
            avgProfit: newAvg,
            quantity: newQuantity
        },
        tax: 0
    }
}

function reduceSell(
    state: PortifolioState,
    event: PortifolioEvent
): {
    state: PortifolioState,
    tax: number
} {
    const total = event.quantity * event.unitCost
    const profit = (event.unitCost - state.avgProfit) * event.quantity

    const newQuantity = state.quantity - event.quantity

    if (profit < 0) {
        return {
            state: {
                ...state,
                quantity: newQuantity,
                losses: Math.abs(profit)
            },
            tax: 0
        }
    }

    const deducted = Math.min(state.losses, profit)
    const adjustedProfit = profit - deducted
    const remainingLosses = state.losses - deducted

    if (total <= 20000) {
        return {
            state: {
                ...state,
                quantity: newQuantity,
                losses: remainingLosses
            },
            tax: 0
        }
    }

    return {
        state: {
            ...state,
            quantity: newQuantity,
            losses: remainingLosses
        },
        tax: adjustedProfit > 0 ? round2(adjustedProfit * .20) : 0
    }
}

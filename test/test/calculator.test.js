import { describe, it, expect } from "vitest";
import { calculateTaxes } from "../../src/core/calculator";

describe("Capital Gain Calculator", () => {

    it("When operation is just buy", () => {
        const ops = [
            { operation: "buy", unitCost: 10, quantity: 10000 },
        ];

        const result = calculateTaxes(ops);

        expect(result).toEqual([
            { tax: 0 },
        ]);
    });

    it("When sell's total is less than 20.000,00 or equal it", () => {
        const ops = [
            { operation: "buy", unitCost: 10, quantity: 100 },
            { operation: "sell", unitCost: 3, quantity: 100 }
        ];

        const result = calculateTaxes(ops);

        expect(result).toEqual([
            { tax: 0 },
            { tax: 0 }
        ]);
    });

    it("Case #1", () => {
        const ops = [
            { operation: "buy", unitCost: 10, quantity: 100 },
            { operation: "sell", unitCost: 15, quantity: 50 },
            { operation: "sell", unitCost: 15, quantity: 50 }
        ];

        const result = calculateTaxes(ops);

        expect(result).toEqual([
            { tax: 0 },
            { tax: 0 },
            { tax: 0 }
        ]);
    });

    it("Case #2 do PDF", () => {
        const ops = [
            { operation: "buy", unitCost: 10, quantity: 10000 },
            { operation: "sell", unitCost: 20, quantity: 5000 },
            { operation: "sell", unitCost: 5, quantity: 5000 }
        ];

        const result = calculateTaxes(ops);

        expect(result).toEqual([
            { tax: 0 },
            { tax: 10000 },
            { tax: 0 }
        ]);
    });

    it("Case #3", () => {
        const ops = [
            { operation: "buy", unitCost: 10, quantity: 10000 },
            { operation: "sell", unitCost: 5, quantity: 5000 },
            { operation: "sell", unitCost: 20, quantity: 3000 }
        ];

        const result = calculateTaxes(ops);

        expect(result).toEqual([
            { tax: 0 },
            { tax: 0 },
            { tax: 1000 }
        ]);
    });

    it("Case #4", () => {
        const ops = [
            { operation: "buy", unitCost: 10, quantity: 10000 },
            { operation: "buy", unitCost: 25, quantity: 5000 },
            { operation: "sell", unitCost: 15, quantity: 10000 }
        ];

        const result = calculateTaxes(ops);

        expect(result).toEqual([
            { tax: 0 },
            { tax: 0 },
            { tax: 0 }
        ]);
    });

    it("Case #5", () => {
        const ops = [
            { operation: "buy", unitCost: 10, quantity: 10000 },
            { operation: "buy", unitCost: 25, quantity: 5000 },
            { operation: "sell", unitCost: 15, quantity: 10000 },
            { operation: "sell", unitCost: 25, quantity: 5000 }
        ];

        const result = calculateTaxes(ops);

        expect(result).toEqual([
            { tax: 0 },
            { tax: 0 },
            { tax: 0 },
            { tax: 10000 }
        ]);
    });

    it("Case #6", () => {
        const ops = [
            { operation: "buy", unitCost: 10, quantity: 10000 },
            { operation: "sell", unitCost: 2, quantity: 5000 },
            { operation: "sell", unitCost: 20, quantity: 2000 },
            { operation: "sell", unitCost: 20, quantity: 2000 },
            { operation: "sell", unitCost: 25, quantity: 1000 }
        ];

        const result = calculateTaxes(ops);

        expect(result).toEqual([
            { tax: 0 },
            { tax: 0 },
            { tax: 0 },
            { tax: 0 },
            { tax: 3000 }
        ]);
    });

    it("Case #7", () => {
        const ops = [
            { operation: "buy", unitCost: 10, quantity: 10000 },
            { operation: "sell", unitCost: 2, quantity: 5000 },
            { operation: "sell", unitCost: 20, quantity: 2000 },
            { operation: "sell", unitCost: 20, quantity: 2000 },
            { operation: "sell", unitCost: 25, quantity: 1000 },
            { operation: "buy", unitCost: 20, quantity: 10000 },
            { operation: "sell", unitCost: 15, quantity: 5000 },
            { operation: "sell", unitCost: 30, quantity: 4350 },
            { operation: "sell", unitCost: 30, quantity: 650 }
        ];

        const result = calculateTaxes(ops);

        expect(result).toEqual([
            { tax: 0 },
            { tax: 0 },
            { tax: 0 },
            { tax: 0 },
            { tax: 3000 },
            { tax: 0 },
            { tax: 0 },
            { tax: 3700 },
            { tax: 0 }
        ]);
    });

    it("Case #8", () => {
        const ops = [
            { operation: "buy", unitCost: 10, quantity: 10000 },
            { operation: "sell", unitCost: 50, quantity: 10000 },
            { operation: "buy", unitCost: 20, quantity: 10000 },
            { operation: "sell", unitCost: 50, quantity: 10000 }
        ];

        const result = calculateTaxes(ops);

        expect(result).toEqual([
            { tax: 0 },
            { tax: 80000 },
            { tax: 0 },
            { tax: 60000 }
        ]);
    });

    it("Case #9", () => {
        const ops = [
            { operation: "buy", unitCost: 5000, quantity: 10 },
            { operation: "sell", unitCost: 4000, quantity: 5 },
            { operation: "buy", unitCost: 15000, quantity: 5 },
            { operation: "buy", unitCost: 4000, quantity: 2 },
            { operation: "buy", unitCost: 23000, quantity: 2 },
            { operation: "sell", unitCost: 20000, quantity: 1 },
            { operation: "sell", unitCost: 12000, quantity: 10 },
            { operation: "sell", unitCost: 15000, quantity: 3 }
        ];

        const result = calculateTaxes(ops);

        expect(result).toEqual([
            { tax: 0 },
            { tax: 0 },
            { tax: 0 },
            { tax: 0 },
            { tax: 0 },
            { tax: 0 },
            { tax: 1000 },
            { tax: 2400 }
        ]);
    });

    it('Venda com quantidade superior à quantidade obtida', () => {
        const ops = [
            { "operation": "buy", unitCost: 10, "quantity": 10000 },
            { "operation": "sell", unitCost: 20, "quantity": 11000 }
        ]

        const result = calculateTaxes(ops);

        expect(result).toEqual([
            { tax: 0 },
            { error: "Can't sell more stocks than you have" }
        ])
    })

    it('Venda com quantidade superior à quantidade obtida seguida de venda permitida', () => {
        const ops = [
            { "operation": "buy", unitCost: 10, "quantity": 10000 },
            { "operation": "sell", unitCost: 20, "quantity": 11000 },
            { "operation": "sell", unitCost: 20, "quantity": 5000 }
        ]

        const result = calculateTaxes(ops);

        expect(result).toEqual([
            { tax: 0 },
            { error: "Can't sell more stocks than you have" },
            { tax: 10000 },
        ])
    })

    it('Tentativa de operação após três tentativas inválidas consecutivas', () => {
        const ops = [
            { operation: "sell", unitCost: 20, quantity: 10000 },
            { operation: "sell", unitCost: 20, quantity: 10000 },
            { operation: "sell", unitCost: 20, quantity: 10000 },
            { operation: "buy", unitCost: 10, quantity: 10000 },
            { operation: "sell", unitCost: 10, quantity: 10000 }
        ]

        const result = calculateTaxes(ops);

        expect(result).toEqual([
            { error: "Can't sell more stocks than you have" },
            { error: "Can't sell more stocks than you have" },
            { error: "Can't sell more stocks than you have" },
            { error: "Your account is blocked" },
            { error: "Your account is blocked" }
        ])
    })

    it('Tentativa de operação após três tentativas inválidas não consecutivas', () => {
        const ops = [
            { operation: "sell", unitCost: 20, quantity: 10000 },
            { operation: "sell", unitCost: 20, quantity: 10000 },
            { operation: "buy", unitCost: 10, quantity: 10000 },
            { operation: "sell", unitCost: 10, quantity: 20000 },
            { operation: "buy", unitCost: 10, quantity: 10000 },
        ]

        const result = calculateTaxes(ops);

        expect(result).toEqual([
            { error: "Can't sell more stocks than you have" },
            { error: "Can't sell more stocks than you have" },
            { tax: 0 },
            { error: "Can't sell more stocks than you have" },
            { tax: 0 },
        ])
    })
});

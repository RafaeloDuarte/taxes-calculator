#!/usr/bin/env node
import readline from "readline";
import { calculateTaxes } from "./core/calculator";
import { Operation } from "./types";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on("line", (line) => {
  if (!line.trim()) {
    process.exit(0);
  }

  const rawOps = JSON.parse(line);
  const ops: Operation[] = rawOps.map((o: any) => ({
    operation: o.operation,
    quantity: o.quantity,
    unitCost: o["unit-cost"] ?? o.unitCost,
  }));
  const result = calculateTaxes(ops);

  console.log(JSON.stringify(result));
});

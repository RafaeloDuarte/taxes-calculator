import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";

describe("CLI Integration", () => {
  it("processa uma linha inteira", () => {
    const input = `[{"operation":"buy","unit-cost":10,"quantity":100}]`;

    const output = execSync(
      `echo '${input}' | ts-node ./src/index.ts`
    ).toString();

    expect(output.trim()).toBe('[{"tax":0}]');
  });
});


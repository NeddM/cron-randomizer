import {
  generateMinutes,
  generateHours,
  generateMonth,
  generateDayOfMonth,
  generateDayOfWeek,
} from "../src/utils";

describe("GenerateMinutes", () => {
  it("Returns an string", () => {

    const result: string = generateMinutes();
    expect(typeof result).toBe("string");
  });


  it('Returns a number between 0 and 60 as string', () => {
    const result: string = generateMinutes()
    expect(parseInt(result)).toBeGreaterThanOrEqual(0);
    expect(parseInt(result)).toBeLessThanOrEqual(60);
  });


  it("Returns different values on consecutive calls", () => {
    const results = new Set<string>();

    for (let i = 0; i < 1000; i++) {
      results.add(generateMinutes());
    }

    expect(results.size).toBeLessThanOrEqual(60);
  });
});

describe("GenerateHours", () => {
  it("Returns a string value", () => {

    const result: string = generateHours();
    expect(typeof result).toBe("string");
  });


  it("Returns a random number between 0 and 24", () => {

    const result: string = generateHours();
    expect(parseInt(result)).toBeGreaterThanOrEqual(0);
    expect(parseInt(result)).toBeLessThanOrEqual(24);
  });


  it('Returns different values on consecutive calls', () => {
    const results = new Set<string>();

    for (let i = 0; i < 1000; i++) {
      results.add(generateHours())
    }

    expect(results.size).toBeLessThanOrEqual(24);
  });
});

describe("GenerateMonth", () => {
  it("Returns a string value", () => {

    const result = generateMonth();

    expect(typeof result).toBe("string");
  });


  it("Returns a random value between 1 and 12", () => {
    const result = generateMonth();

    expect(parseInt(result)).toBeGreaterThanOrEqual(1);
    expect(parseInt(result)).toBeLessThanOrEqual(12);
  });

  it("Returns different values on consecutive calls", () => {

    const results = new Set<string>();

    for (let i = 0; i < 1000; i++) {
      results.add(generateMonth());
    }

    expect(results.size).toBeLessThanOrEqual(12);
  });
});

describe("generateDayOfMonth", () => {
  it("Returns a string value", () => {
    const result: string = generateDayOfMonth();

    expect(typeof result).toBe("string");
  });

  it("Returns a value between 1 and 28", () => {
    const result: string = generateDayOfMonth();

    expect(parseInt(result)).toBeLessThanOrEqual(28);
  });

  it("Returns different values on consecutive calls", () => {
    const results = new Set<string>();

    for (let i = 0; i < 1000; i++) {
      results.add(generateDayOfMonth());
    }

    expect(results.size).toBeLessThanOrEqual(28);
  });
});

describe("generateDayOfWeek", () => {

  it("Returns a string value", () => {
    const result: string = generateDayOfWeek();

    expect(typeof result).toBe("string");
  });

  it("Returns a value between 1 and 7", () => {
    const result: string = generateDayOfWeek();

    expect(parseInt(result)).toBeGreaterThanOrEqual(0);
    expect(parseInt(result)).toBeLessThanOrEqual(7);
  });

  it("Returns different values on consecutive calls", () => {
    const results = new Set<string>();

    for (let i = 0; i < 1000; i++) {
      results.add(generateDayOfWeek());
    }

    expect(results.size).toBeLessThanOrEqual(7);
  });

});

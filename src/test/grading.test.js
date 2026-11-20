import { expect, test, describe, it } from "vitest";
import {
  calculateAverage,
  calculateGPA,
  getGradePoint,
  getHighestScore,
  getLetterGrade,
  getLowestScore,
  isPassing,
} from "../grading";

describe("calculateAverage", () => {
  test("If [100, 100, 100] returns 100", () => {
    expect(calculateAverage([100, 100, 100])).toBe(100);
  });
  test("If [100, 50, 50, 100] returns 75", () => {
    expect(calculateAverage([100, 50, 50, 100])).toBe(75);
  });
});

describe("getLetterGrade", () => {
  test("If score 90 returns A", () => {
    expect(getLetterGrade(90)).toBe("A");
  });
  test("If score 80 returns B", () => {
    expect(getLetterGrade(80)).toBe("B");
  });
  test("If score 70 returns C", () => {
    expect(getLetterGrade(70)).toBe("C");
  });
  test("If score 60 returns D", () => {
    expect(getLetterGrade(60)).toBe("D");
  });
  test("If score 40 returns E", () => {
    expect(getLetterGrade(40)).toBe("E");
  });
  test("If score 20 returns F", () => {
    expect(getLetterGrade(20)).toBe("F");
  });
});

describe("getGradePoint", () => {
  it("should return 4.0 when letter grade is A", () => {
    expect(getGradePoint("A")).toBe(4.0);
  });
  it("should return 3.0 when letter grade is B", () => {
    expect(getGradePoint("B")).toBe(3.0);
  });
  it("should return 2.0 when letter grade is C", () => {
    expect(getGradePoint("C")).toBe(2.0);
  });
  it("should return 1.0 when letter grade is D", () => {
    expect(getGradePoint("D")).toBe(1.0);
  });
  it("should return 0.0 when letter grade is F", () => {
    expect(getGradePoint("F")).toBe(0.0);
  });
});

describe("isPassing", () => {
  test("If score of 90 passes", () => {
    expect(isPassing(90)).toBe(true);
  });
  test("If score of 40 fails", () => {
    expect(isPassing(40)).toBe(false);
  });
  test("If score of 40 with passing score 2 passes", () => {
    expect(isPassing(40, 20)).toBe(true);
  });
});

describe("CalculateGPA", () => {
  it("should return 4.0 when letter grades are all As", () => {
    const scores = ["A", "A", "A", "A"];
    expect(calculateGPA(scores)).toBe(4.0);
  });
  it("should return 0.0 when letter grades are all Fs", () => {
    const scores = ["F", "F", "F", "F"];
    expect(calculateGPA(scores)).toBe(0.0);
  });
  it("should return 2.0 when letter grades are 2 As & 2 Fs", () => {
    const scores = ["A", "A", "F", "F"];
    expect(calculateGPA(scores)).toBe(2.0);
  });
  it("should return 2.5 when letter grades are [A, B, C, D]", () => {
    const scores = ["A", "B", "C", "D"];
    expect(calculateGPA(scores)).toBe(2.5);
  });
});

describe("getHighestScore", () => {
  it("should return 100", () => {
    const scores = [100, 35, 76, 87];
    expect(getHighestScore(scores)).toBe(100);
  });
  it("should return 90", () => {
    const scores = [90, 35, 76, 87];
    expect(getHighestScore(scores)).toBe(90);
  });
});

describe("getLowestScore", () => {
  it("should return 35", () => {
    const scores = [100, 35, 76, 87];
    expect(getLowestScore(scores)).toBe(35);
  });
  it("should return 67", () => {
    const scores = [90, 67, 76, 87];
    expect(getLowestScore(scores)).toBe(67);
  });
});

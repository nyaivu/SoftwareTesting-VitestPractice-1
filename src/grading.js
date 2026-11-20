export function calculateAverage(scores) {
  if (!Array.isArray(scores)) {
    throw new TypeError("Scores must be an array");
  }
  if (scores.length === 0) {
    throw new Error("Scores array must not be empty");
  }

  const total = scores.reduce((sum, score) => {
    if (typeof score !== "number" || Number.isNaN(score)) {
      throw new TypeError("All scores must be valid numbers");
    }
    if (score < 0 || score > 100) {
      throw new RangeError("Scores must be between 0 and 100");
    }
    return sum + score;
  }, 0);

  return total / scores.length;
}

export function getLetterGrade(score) {
  if (typeof score !== "number" || Number.isNaN(score)) {
    throw new TypeError("Score must be a valid number");
  }
  if (score < 0 || score > 100) {
    throw new RangeError("Score must be between 0 and 100");
  }

  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  if (score >= 30) return "E";
  return "F";
}

export function isPassing(score, passingScore = 81) {
  if (typeof score !== "number" || Number.isNaN(score)) {
    throw new TypeError("Score must be a valid number");
  }
  if (typeof passingScore !== "number" || Number.isNaN(passingScore)) {
    throw new TypeError("Passing score must be a valid number");
  }
  if (score < 0 || score > 100) {
    throw new RangeError("Score must be between 0 and 100");
  }
  if (passingScore < 0 || passingScore > 100) {
    throw new RangeError("Passing score must be between 0 and 100");
  }

  return score >= passingScore;
}

export function getGradePoint(letterGrade) {
  const gradePoints = {
    A: 4.0,
    B: 3.0,
    C: 2.0,
    D: 1.0,
    F: 0.0,
  };

  if (!(letterGrade in gradePoints)) {
    throw new Error("Invalid letter grade");
  }

  return gradePoints[letterGrade];
}

export function calculateGPA(letterGrades) {
  if (!Array.isArray(letterGrades)) {
    throw new TypeError("Letter grades must be an array");
  }
  if (letterGrades.length === 0) {
    throw new Error("Letter grades array must not be empty");
  }

  const totalPoints = letterGrades.reduce(
    (sum, grade) => sum + getGradePoint(grade),
    0,
  );

  return Number((totalPoints / letterGrades.length).toFixed(2));
}

export function getHighestScore(scores) {
  if (!Array.isArray(scores) || scores.length === 0) {
    throw new Error("Scores must be a non-empty array");
  }
  return Math.max(...scores);
}

export function getLowestScore(scores) {
  if (!Array.isArray(scores) || scores.length === 0) {
    throw new Error("Scores must be a non-empty array");
  }
  return Math.min(...scores);
}

import {
  calculateAverage,
  calculateGPA,
  getLetterGrade,
  isPassing,
} from "./src/grading.js";
import { createStudentReport, rankStudents } from "./src/students.js";

const students = [
  { id: 1, name: "Agung", scores: [95, 88, 92] },
  { id: 2, name: "Ngurah", scores: [70, 75, 72] },
  { id: 3, name: "Julian", scores: [60, 58, 62] },
  { id: 4, name: "Putra", scores: [50, 60, 100] }
  { id: 5, name: "Suni", scores: [80, 90, 100] }
];

console.log("Student Grading Demo\n");

for (const student of students) {
  const average = Number(calculateAverage(student.scores).toFixed(2));
  const letterGrade = getLetterGrade(average);
  const passed = isPassing(average);

  console.log(`${student.name}`);
  console.log(`  Scores: ${student.scores.join(", ")}`);
  console.log(`  Average: ${average}`);
  console.log(`  Letter Grade: ${letterGrade}`);
  console.log(`  Passed: ${passed ? "Yes" : "No"}\n`);
}

console.log("Individual Report");
console.log(createStudentReport(students[0]));

console.log("\nRanked Students");
console.log(rankStudents(students));

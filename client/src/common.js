export const category = [
  "programming",
  "php",
  "web",
  "frontend",
  "backend",
  "java",
  "react",
  "oracle",
];

export const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H"];

export const createArray = (arr) => {
  let output = [];
  arr.forEach((item) => output.push({ label: item, value: item }));
  return output;
};
export const getCategory = (arr) => {
  let output = [];
  arr.forEach((item) => output.push(item.value));
  return output;
};

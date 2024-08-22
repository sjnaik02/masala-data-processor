const fs = require("fs");

// Read the JSON file
const jsonData = fs.readFileSync("rayban_sunglasses_modified.json", "utf8");
const sunglasses = JSON.parse(jsonData);

// Helper function to get unique values from an array
function getUniqueValues(array) {
  return [...new Set(array)];
}

// Generate the decision tree
const decisionTree = [
  {
    level: 1,
    theme: "shape",
    options: getUniqueValues(sunglasses.map((item) => item.tags.shape)),
  },
  {
    level: 2,
    theme: "material",
    options: getUniqueValues(sunglasses.map((item) => item.tags.material)),
  },
  {
    level: 3,
    theme: "frame_type",
    options: getUniqueValues(sunglasses.map((item) => item.tags.frame_type)),
  },
];

// Convert the decision tree to the desired format
const decisionTreeString = `const decisionTree = ${JSON.stringify(
  decisionTree,
  null,
  2
)};

export default decisionTree;
`;

// Write the decision tree to a file
fs.writeFileSync("decisionTree.js", decisionTreeString);

console.log("Decision tree generated and saved to decisionTree.js");

const fs = require("fs");

// Read the JSON file
const jsonData = fs.readFileSync("rayban_sunglasses.json", "utf8");
const sunglasses = JSON.parse(jsonData);

// Define the mapping for combining similar tags
const shapeMapping = {
  "Modified Oval": "Oval",
  "Modified Round": "Round",
  Geometric: "Square",
  "Cat Eye": "Oval",
  Rectangle: "Square",
  Shield: "Shield",
  Navigator: "Aviator",
};

const materialMapping = {
  "Metal, Plastic": "Metal",
  Nylon: "Plastic",
};

// Modify the tags in the sunglasses data
const modifiedSunglasses = sunglasses.map((item) => {
  const { shape, material, frame_type } = item.tags;

  const modifiedShape = shapeMapping[shape] || shape;
  const modifiedMaterial = materialMapping[material] || material;

  return {
    ...item,
    tags: {
      shape: modifiedShape,
      material: modifiedMaterial,
      frame_type,
    },
  };
});

// Write the modified sunglasses data to the JSON file
fs.writeFileSync(
  "rayban_sunglasses_modified.json",
  JSON.stringify(modifiedSunglasses, null, 2)
);

console.log(
  "Modified sunglasses data saved to rayban_sunglasses_modified.json"
);

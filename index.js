const fs = require("fs");

// Read the data from the external JSON file
fs.readFile("latestEG.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Parse the JSON data
  const parsedData = JSON.parse(data);

  // Define the column indices for easier access
  const columns = parsedData.COLUMNS;
  const brandIdx = columns.indexOf("BRAND_NAME");
  const frameLinkIdx = columns.indexOf("FRAME_LINK_NAME");

  // Filter and get the first 64 Ray-Ban glasses
  let rayBanGlasses = parsedData.DATA.filter(
    (row) => row[brandIdx] === "Adidas Originals"
  ).slice(0, 64);

  // Define the tags for each level
  const level1Tags = ["Round", "Square", "Cat-Eye", "Aviator"];
  const level2Tags = ["Retro", "Modern", "Oversized", "Sporty"];
  const level3Tags = ["Black", "Tortoise Shell", "Mirrored", "Two-Tone"];

  // Add a random tag to each row of the filtered data
  rayBanGlasses = rayBanGlasses.map((row) => {
    const level1Tag = level1Tags[Math.floor(Math.random() * level1Tags.length)];
    const level2Tag = level2Tags[Math.floor(Math.random() * level2Tags.length)];
    const level3Tag = level3Tags[Math.floor(Math.random() * level3Tags.length)];
    return [...row, level1Tag, level2Tag, level3Tag];
  });

  // Add the new TAGS column to the COLUMNS array
  parsedData.COLUMNS.push("LEVEL1_TAG", "LEVEL2_TAG", "LEVEL3_TAG");

  // Create a new JSON object to store the filtered data
  let filteredData = {
    COLUMNS: parsedData.COLUMNS,
    DATA: rayBanGlasses,
  };

  // Convert the filtered data to a JSON string
  let jsonString = JSON.stringify(filteredData, null, 2);

  // Save the filtered data to a new JSON file
  fs.writeFile("filtered_rayban_glasses.json", jsonString, "utf8", (err) => {
    if (err) {
      console.error("Error writing the file:", err);
      return;
    }
    console.log(
      "Filtered data successfully saved to filtered_rayban_glasses.json"
    );
  });
});

const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios");

// Read the HTML file
const html = fs.readFileSync("data.html", "utf8");

// Load the HTML into Cheerio
const $ = cheerio.load(html);

// Process each sunglasses item
const sunglasses = [];

async function processItem(item) {
  const name = item.find(".frameTitle h2").text().trim();
  const price = item
    .find(".price")
    .contents()
    .filter((_, el) => el.type === "text")
    .text()
    .trim();
  const link = "https://www.eyeglasses.com" + item.find("a").attr("href");
  const image = item
    .find(".image img")
    .attr("src")
    .replace(/^\/\//, "https://");

  // Make a request to the product page to extract tags
  const response = await axios.get(link);
  const productPage = response.data;
  const $product = cheerio.load(productPage);

  const detailsSection = $product("#details");
  const shape = detailsSection
    .find("li:contains('Shape:')")
    .text()
    .replace("Shape:", "")
    .trim();
  const material = detailsSection
    .find("li:contains('Material:')")
    .text()
    .replace("Material:", "")
    .trim();
  const frameType = detailsSection
    .find("li:contains('Rim:')")
    .text()
    .replace("Rim:", "")
    .trim();

  // Create an object for each sunglasses item
  const sunglassesItem = {
    name,
    price,
    link,
    image,
    tags: {
      shape,
      material,
      frame_type: frameType,
    },
  };

  return sunglassesItem;
}

async function processAllItems() {
  const itemPromises = [];

  $(".item").each((index, element) => {
    const item = $(element);
    itemPromises.push(processItem(item));
  });

  const sunglassesData = await Promise.all(itemPromises);

  // Convert the sunglasses data to JSON
  const jsonData = JSON.stringify(sunglassesData, null, 2);

  // Write the JSON data to a file
  fs.writeFileSync("rayban_sunglasses.json", jsonData);

  console.log(
    "Ray-Ban sunglasses data processed and saved to rayban_sunglasses.json"
  );
}

processAllItems();

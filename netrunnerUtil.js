const fs = require("fs");
const path = require("path");

//Constants
const PACK_DIR = "../netrunner-cards-json/pack";

// Concat all the pack files
function getAllCards() {
  const packDir = path.join(__dirname, PACK_DIR);
  const files = fs.readdirSync(packDir);

  const cards = [];
  files.forEach(file => {
    const currentPath = path.join(packDir, file);
    const rawData = fs.readFileSync(currentPath);
    const jsonData = JSON.parse(rawData);
    jsonData.forEach(card => cards.push(card));
  });
  return cards;
}

module.exports = { getAllCards };

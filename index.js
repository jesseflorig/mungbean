/*
 *  Save your changes to rerun the munger
 *
 */

const { map } = require("lodash");
const Cards = require("../netrunner-json/cards.json");
const { Mungbean, addField, capVal, genVal } = require("./mungbean");

console.log("cards", Cards.length);
const newId = genVal({
  fields: ["pack", "position"],
  delimiter: "-"
});

const cfg = {
  input: Cards,
  output: [],
  strategies: [
    addField("id", newId),
    addField("test", "test"),
    capVal("faction"),
    capVal("side"),
    capVal("type")
  ]
};

const munged = Mungbean(cfg);
console.log(munged[0]);

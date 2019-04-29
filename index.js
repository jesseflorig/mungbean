/*
 *  Save your changes to rerun the munger
 *
 */

const { map } = require("lodash");
const { Mungbean, addField, chgKey, genVal, lowerVal } = require("./mungbean");
const { getAllCards } = require("./netrunnerUtils");

const cards = getAllCards();

const newId = genVal({
  fields: ["pack_code", "position"],
  delimiter: "-"
});

const cfg = {
  env: "prod",
  input: cards,
  output: "../netrunner-json/cards.json",
  strategies: [
    addField("id", newId),
    chgKey("faction_code", "faction"),
    chgKey("faction_cost", "influence"),
    chgKey("deck_limit", "limit"),
    chgKey("side_code", "side"),
    chgKey("pack_code", "pack"),
    chgKey("type_code", "type"),
    chgKey("quantity", "qty"),
    chgKey("uniqueness", "unique"),
    lowerVal("keywords")
  ]
};

Mungbean(cfg);

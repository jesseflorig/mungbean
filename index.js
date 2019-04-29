/*
 *  Save your changes to rerun the munger
 *
 */

const { map } = require("lodash");
const { Mungbean, addField, chgKey, lowerVal } = require("./mungbean");
const { printKeys } = require("./util");
const { getAllCards } = require("./netrunnerUtil");

const cards = getAllCards();
printKeys(cards);

const cfg = {
  env: "prod",
  input: cards,
  output: "../netrunner-json/cards.json",
  strategies: [
    chgKey("code", "id"),
    chgKey("deck_limit", "limit"),
    chgKey("faction_code", "faction"),
    chgKey("faction_cost", "influence"),
    chgKey("side_code", "side"),
    chgKey("pack_code", "pack"),
    chgKey("position", "number"),
    chgKey("title", "name"),
    chgKey("type_code", "type"),
    chgKey("quantity", "qty"),
    chgKey("uniqueness", "unique")
  ]
};

Mungbean(cfg);

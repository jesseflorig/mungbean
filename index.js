const { data } = require("./sample-data");
const {
  Mungbean,
  addField,
  capVal,
  chgKey,
  concatVals,
  lowerVal
} = require("./mungbean");

// Strategy Helpers
const newId = concatVals({
  fields: ["firstName", "lastName"],
  delimiter: "-"
});

// Strategy
const strat = [
  addField("id", newId),
  lowerVal("id"),
  addField("test", "test"),
  capVal("occupation"),
  chgKey("occupation", "job")
];

const cfg = {
  env: "dev",
  input: data,
  output: [],
  strategies: strat
};

Mungbean(cfg);

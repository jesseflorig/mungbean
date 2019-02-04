// Glossary:
//   field - a key/value pair
//   key - reference for a value
//   value - contents of a key
//
// TODO: methods to add
// change a key
// remove a key
//
const { map } = require("lodash");

// Apply a strategy to an input to create an output
const Mungbean = ({ input, output, strategies }) => {
  map(input, item => {
    let mungedItem = item;
    map(strategies, strat => {
      mungedItem = strat(mungedItem);
    });
    output.push(mungedItem);
  });
  return output;
};

// Add a new key and value
const addField = (newKey, val) => item => {
  let newItem = item;
  newItem[newKey] = typeof val === "function" ? val(item) : val;
  return newItem;
};

// Generate a value from one or more existing fields
const genVal = ({ fields, delimiter, prefix, postfix }) => item => {
  let fieldVals = map(fields, f => item[f]);
  fieldVals = prefix ? [prefix, ...fieldVals] : fieldVals;
  fieldVals = postfix ? [...fieldVals, postfix] : fieldVals;
  return fieldVals.join(delimiter);
};

// Apply a function to a field if it exists
const modField = fn => field => item => {
  if (item[field]) {
    const newVal = fn(item[field]);
    item[field] = newVal;
  }
  return item;
};

// Uppercase a field
const upperVal = field => {
  return modField(input => {
    return input.toUpperCase();
  })(field);
};

// Lowercase a field
const lowerVal = field => {
  return modField(input => {
    return input.toLowerCase();
  })(field);
};

// Capitalize a field value
const capVal = field => {
  return modField(input => {
    return input.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  })(field);
};

module.exports = {
  Mungbean,
  addField,
  capVal,
  genVal,
  lowerVal,
  modField,
  upperVal
};

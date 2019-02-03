/* 
 *  Javascript Scratchpad 
 *  Save your changes to restart the server
 *
 */

const { map } = require("lodash");
const { Cards } = require("netrunner-json");

const mung = {};

const cfg = {
  input: Cards,
  output: [],
  strategies: []
};

const Mungbean = ({ input, output, strategies }) => {
  map(input, item => {
    let mungedItem = item;
    map(strategies, strat => {
      mungedItem = strat(item);
    });
    output.push(mungedItem);
  });

  console.log(output[0]);
};

Mungbean(cfg);

const dev = (msg, env) => {
  if (env === "dev") {
    if (typeof msg === "object") {
      return log(msg);
    }
    console.info(`DEV: ${msg}`);
  }
};

const err = msg => {
  console.error(`ERROR: ${msg}`);
};

const log = msg => {
  console.log(msg);
};

const plur = (key, count) => {
  const isPlur = count !== 1;
  const lookup = {
    record: "records"
  };

  return isPlur ? lookup[key] : key;
};

const hr = () => {
  log("=".repeat(32));
};

const printKeys = arr => {
  const keys = new Set();
  arr.map(item => {
    const currKeys = Object.keys(item);
    currKeys.map(key => keys.add(key));
  });
  console.log(Array.from(keys));
};

module.exports = { dev, err, hr, log, plur, printKeys };

const dev = (msg, env) => {
  if (env === "dev") {
    if (typeof msg === "object") {
      msg = JSON.stringify(msg, null, 2);
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

module.exports = { dev, err, hr, log, plur };

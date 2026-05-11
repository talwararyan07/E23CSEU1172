const axios = require("axios");

async function Log(stack, level, pkg, message) {
  try {
    console.log({
      stack,
      level,
      package: pkg,
      message,
    });
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = Log;
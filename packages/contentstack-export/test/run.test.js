const { join } = require("path");
const filter = require("lodash/filter");
const forEach = require("lodash/forEach");
const isEmpty = require("lodash/isEmpty");
const isArray = require("lodash/isArray");
const includes = require("lodash/includes");
const { existsSync, readdirSync } = require("fs");

const { initEnvData, getLoginCredentials } = require('./integration/utils/helper')
const { INTEGRATION_EXECUTION_ORDER, IS_TS, ENABLE_PREREQUISITES } = require("./config.json");

// NOTE init env variables
require('dotenv-expand').expand(require('dotenv').config())
// require('dotenv').config({ path: resolve(process.cwd(), '.env.test') })

const { INTEGRATION_TEST } = process.env;

initEnvData() // NOTE Prepare env data

const args = process.argv.slice(2);
const testFileExtension = IS_TS ? '.ts' : '.js'

/**
 * @method getFileName
 * @param {string} file
 * @returns {string}
 */
const getFileName = (file) => {
  if (includes(file, ".test") && includes(file, testFileExtension)) return file;
  else if (includes(file, ".test")) return `${file}${testFileExtension}`;
  else if (!includes(file, ".test")) return `${file}.test${testFileExtension}`;
  else return `${file}.test${testFileExtension}`;
};

/**
 * @method includeInitFileIfExist
 * @param {String} basePath 
 */
const includeInitFileIfExist = (basePath, region) => {
  const filePath = join(__dirname, basePath, `init.test${testFileExtension}`);

  try {
    if (existsSync(filePath)) {
      require(filePath)(region);
    }
  } catch (err) { 
    debugger
  }
}

/**
 * @method includeCleanUpFileIfExist
 * @param {String} basePath 
 */
const includeCleanUpFileIfExist = async (basePath, region) => {
  const filePath = join(__dirname, basePath, `clean-up.test${testFileExtension}`);

  try {
    if (existsSync(filePath)) {
      require(filePath)(region);
    }
  } catch (err) { }
}

/**
 * @method includeTestFiles
 * @param {Array<string>} files
 * @param {string} basePath
 */
const includeTestFiles = async (files, basePath = "integration") => {
  let regions = getLoginCredentials();
  for (let region of Object.keys(regions)) {
    if (ENABLE_PREREQUISITES) {
      includeInitFileIfExist(basePath, regions[region]) // NOTE Run all the pre configurations
    }

    files = filter(files, (name) => (
      !includes(`init.test${testFileExtension}`, name) &&
      !includes(`clean-up.test${testFileExtension}`, name)
    )) // NOTE remove init, clean-up files

    forEach(files, (file) => {
      const filename = getFileName(file);
      const filePath = join(__dirname, basePath, filename);
      try {
        if (existsSync(filePath)) {
          require(filePath)(region);
        } else {
          console.error(`File not found - ${filename}`);
        }
      } catch (err) {
        console.err(err.message)
      }
    });

    await includeCleanUpFileIfExist(basePath, regions[region]) // NOTE run all cleanup code/commands
  }
};

/**
 * @method run
 * @param {Array<string> | undefined | null | unknown} executionOrder
 * @param {boolean} isIntegrationTest
 */
const run = (
  executionOrder,
  isIntegrationTest = true
) => {
  const testFolder = isIntegrationTest ? "integration" : "unit";

  if (isArray(executionOrder) && !isEmpty(executionOrder)) {
    includeTestFiles(executionOrder, testFolder);
  } else {
    const basePath = join(__dirname, testFolder);
    const allIntegrationTestFiles = filter(readdirSync(basePath), (file) =>
      includes(file, `.test${testFileExtension}`)
    );

    includeTestFiles(allIntegrationTestFiles);
  }
};

if (INTEGRATION_TEST === 'true') {
  run(INTEGRATION_EXECUTION_ORDER);
} else if (includes(args, "--unit-test")) {
  // NOTE unit test case will be handled here
  // run(UNIT_EXECUTION_ORDER, false);
}

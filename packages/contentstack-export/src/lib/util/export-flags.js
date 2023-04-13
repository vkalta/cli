/*!
 * Contentstack Export
 * Copyright (c) 2019 Contentstack LLC
 * MIT Licensed
 */
let defaultConfig = require('../../config/default');
let message = require('../../../messages/index.json');
let { initial } = require('../../app');
let path = require('path');
const helper = require('../util/helper');
let _ = require('lodash');
const { cliux } = require('@contentstack/cli-utilities');

exports.configWithMToken = async function (config, managementTokens, host, contentTypes, branchName, securedAssets, moduleName, data) {
  let externalConfig = require(config);
  const modules = externalConfig.filteredModules;

  defaultConfig.securedAssets = securedAssets;
  defaultConfig.management_token = managementTokens.token;
  defaultConfig.host = host.cma;
  defaultConfig.cdn = host.cda;
  defaultConfig.branchName = branchName;
  defaultConfig.source_stack = managementTokens.apiKey;
  if (moduleName) {
    defaultConfig.moduleName = moduleName;
    // Specfic content type setting is only for entries module
    if (moduleName === 'entries' && Array.isArray(contentTypes) && contentTypes.length > 0) {
      defaultConfig.contentTypes = contentTypes;
    }
  }
  defaultConfig = _.merge(defaultConfig, externalConfig);

  if(!defaultConfig.data) {
    defaultConfig.data = data
  }

  if (_.isArray(modules)) {
    defaultConfig.modules.types = _.filter(defaultConfig.modules.types, (module) => _.includes(modules, module));
  }

  await initial(defaultConfig);
};

exports.parameterWithMToken = async function (
  managementTokens,
  data,
  moduleName,
  host,
  contentTypes,
  branchName,
  securedAssets,
) {
  defaultConfig.management_token = managementTokens.token;
  defaultConfig.host = host.cma;
  defaultConfig.cdn = host.cda;
  defaultConfig.branchName = branchName;
  defaultConfig.securedAssets = securedAssets;
  if (!moduleName) {
    defaultConfig.contentTypes = contentTypes;
  } else {
    defaultConfig.moduleName = moduleName;
    // Specfic content type setting is only for entries module
    if (moduleName === 'entries' && Array.isArray(contentTypes) && contentTypes.length > 0) {
      defaultConfig.contentTypes = contentTypes;
    }
  }
  defaultConfig.source_stack = managementTokens.apiKey;
  defaultConfig.data = data;
  await initial(defaultConfig);
};

// using ManagementToken
exports.withoutParameterMToken = async (
  managementTokens,
  moduleName,
  host,
  contentTypes,
  branchName,
  securedAssets,
) => {
  const stackUid = managementTokens.apiKey;
  const pathOfExport = await cliux.prompt(message.promptMessageList.promptPathStoredData);
  defaultConfig.management_token = managementTokens.token;
  defaultConfig.host = host.cma;
  defaultConfig.cdn = host.cda;
  defaultConfig.branchName = branchName;
  defaultConfig.securedAssets = securedAssets;
  if (moduleName) {
    defaultConfig.moduleName = moduleName;
    // Specfic content type setting is only for entries module
    if (moduleName === 'entries' && Array.isArray(contentTypes) && contentTypes.length > 0) {
      defaultConfig.contentTypes = contentTypes;
    }
  }
  defaultConfig.source_stack = stackUid;
  defaultConfig.data = pathOfExport;
  await initial(defaultConfig);
};

exports.configWithAuthToken = async function (config, moduleName, host, contentTypes, branchName, securedAssets) {
  let externalConfig = helper.readFile(path.resolve(config));
  defaultConfig.host = host.cma;
  defaultConfig.cdn = host.cda;
  defaultConfig.branchName = branchName;
  defaultConfig.securedAssets = securedAssets;
  if (moduleName) {
    defaultConfig.moduleName = moduleName;
    // Specfic content type setting is only for entries module
    if (moduleName === 'entries' && Array.isArray(contentTypes) && contentTypes.length > 0) {
      defaultConfig.contentTypes = contentTypes;
    }
  }
  defaultConfig = _.merge(defaultConfig, externalConfig);
  await initial(defaultConfig);
};

exports.parametersWithAuthToken = function (
  sourceStack,
  data,
  moduleName,
  host,
  contentTypes,
  branchName,
  securedAssets,
) {
  return new Promise(async (resolve, reject) => {
    defaultConfig.source_stack = sourceStack;
    if (moduleName) {
      defaultConfig.moduleName = moduleName;
      // Specfic content type setting is only for entries module
      if (moduleName === 'entries' && Array.isArray(contentTypes) && contentTypes.length > 0) {
        defaultConfig.contentTypes = contentTypes;
      }
    }
    defaultConfig.branchName = branchName;
    defaultConfig.host = host.cma;
    defaultConfig.cdn = host.cda;
    defaultConfig.data = data;
    defaultConfig.securedAssets = securedAssets;
    await initial(defaultConfig)
      .then(() => {
        return resolve();
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

exports.withoutParametersWithAuthToken = async (
  moduleName,
  host,
  contentTypes,
  branchName,
  securedAssets,
) => {
  const stackUid = await cliux.prompt(message.promptMessageList.promptSourceStack);
  const pathOfExport = await cliux.prompt(message.promptMessageList.promptPathStoredData);
  defaultConfig.source_stack = stackUid;
  defaultConfig.securedAssets = securedAssets;
  if (moduleName) {
    defaultConfig.moduleName = moduleName;
    // Specfic content type setting is only for entries module
    if (moduleName === 'entries' && Array.isArray(contentTypes) && contentTypes.length > 0) {
      defaultConfig.contentTypes = contentTypes;
    }
  }
  defaultConfig.branchName = branchName;
  defaultConfig.data = pathOfExport;
  defaultConfig.host = host.cma;
  defaultConfig.cdn = host.cda;
  await initial(defaultConfig);
};

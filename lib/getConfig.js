'use strict';
const path = require('path');

/**
 * getCustomConfig - checks the custom property
 * of a config object for webpack
 *
 *
 * @param obj
 * @returns {*}
 */
function getCustomConfig(obj) {
  if (obj.custom) {
    const webpack = obj.custom.webpack;
    if (typeof webpack === 'object') {
      return webpack;
    } else if (webpack === false) {
      return { configPath: '' };
    }
  }
  return { };
}

/**
 * Load the webpack configuration from the project or
 * the functions config file
 *
 * @param projectPath
 * @param project
 * @param func
 * @returns {*}
 */
module.exports = function getConfig(projectPath, project, func) {
  const defaults = {
    handlerExt: 'js',
    configPath: ''
  };

  const config = Object.assign(defaults, getCustomConfig(project), getCustomConfig(func));

  if (typeof config.config === 'object') {
    config.webpackConfig = config.config
  } else if (config.configPath) {
    try {
      const configPath = path.join(projectPath, config.configPath);
      config.webpackConfig = require(configPath);
    } catch (e) {
      console.log(e);
    }
  }

  return config;
};

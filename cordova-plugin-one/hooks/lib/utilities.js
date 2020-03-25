
/**
 * Utilities and shared functionality for the build hooks.
 */

var path = require("path");
var fs = require("fs");
var console = require("console");

const AUTOMATICIDENTITYTRANSFER = "automaticidentitytransfer";

/**
 * Used to get the path to the build.gradle file for the Android project.
 *
 * @returns {string} The path to the build.gradle file.
 */
function getBuildGradlePath() {
    return path.join("platforms", "android", "build.gradle");
};

module.exports = {

    /**
     * Used to get the name of the application as defined in the config.xml.
     * 
     * @param {object} context - The Cordova context.
     * @returns {string} The value of the name element in config.xml.
     */
    getAppName: function (context) {
        var ConfigParser = context.requireCordovaModule("cordova-lib").configparser;
        var config = new ConfigParser("config.xml");
        return config.name();
    },

    /**
     * The ID of the plugin; this should match the ID in plugin.xml.
     */
    getPluginId: function () {
        return "cordova-plugin-one";
    },

    //Reads ONEASPECTSENABLED property value. This property is specified by a user in the time of the plugin installation
    getOneAspectsEnabled: function (context) {
        var projectPath = context.opts.projectRoot;
        var applicationConfigPath = path.join(projectPath, "plugins", "fetch.json");
        var pluginConfig = require(applicationConfigPath);
        var oneAspectsEnabled = pluginConfig["cordova-plugin-one"].variables[AUTOMATICIDENTITYTRANSFER.toUpperCase()];
        console.log("One plugin: automaticidentitytransfer state " + oneAspectsEnabled);
        return "true" === oneAspectsEnabled;
    },

    /**
     * Used to read the contents of the Android project's build.gradle file.
     *
     * @returns {string} The contents of the Android project's build.gradle file.
     */
    readBuildGradle: function () {
        return fs.readFileSync(getBuildGradlePath(), "utf-8");
    },

    /**
     * Used to write the given build.gradle contents to the Android project's
     * build.gradle file.
     *
     * @param {string} buildGradle The body of the build.gradle file to write.
     */
    writeBuildGradle: function (buildGradle) {
        fs.writeFileSync(getBuildGradlePath(), buildGradle);
    },

    isAndroidPlatform: function(platforms) {
        return platforms.indexOf("android") !== -1;
    }
};

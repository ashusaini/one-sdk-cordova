
var androidHelper = require('./lib/android-helper');
var utilities = require("./lib/utilities");
var logger = require("console");

module.exports = function(context) {

    var platforms = context.opts.cordova.platforms;

    // Modify the Gradle build file to add aspectj config
    const utils = require('./lib/utilities');
    if (utils.isAndroidPlatform(platforms)){
        androidHelper.removeOneBuildToolsFromGradle();
        androidHelper.addOneBuildToolsGradle(context);
    }
};

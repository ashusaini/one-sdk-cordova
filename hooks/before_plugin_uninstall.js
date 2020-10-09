
var androidHelper = require('./lib/android-helper');
var utilities = require("./lib/utilities");

module.exports = function(context) {

    var platforms = context.opts.cordova.platforms;

    // Remove the Gradle modifications that were added when the plugin was installed.
    const utils = require('./lib/utilities');
    if (utils.isAndroidPlatform(platforms)){
        androidHelper.removeOneBuildToolsFromGradle();
    }
};

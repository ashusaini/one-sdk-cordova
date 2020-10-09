var gradleHelper = require('./lib/gradle_wrapper_update_helper');

module.exports = function(context) {

    var platforms = context.opts.cordova.platforms;

    // check android gradle plugin version and specify verison if needed
    const utils = require('./lib/utilities');
    if (utils.isAndroidPlatform(platforms)){
        gradleHelper.checkGradleDistributionVersionAndBumpIdNeeded();
    }
};
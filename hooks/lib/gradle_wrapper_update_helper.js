var fs = require("fs");
var path = require("path");
var utilities = require("./utilities");
var logger = require("console");

const ONE_REQUIRED_GRADLE_VERSION = "6.1.1";
const GRADLE_DISTRIBUTION_URL = "https\\://services.gradle.org/distributions/gradle-" + ONE_REQUIRED_GRADLE_VERSION + "-all.zip";

function bumpGradleWrapperDistribUrl(url) {
    logger.log("One plugin: bumping gradle version to the required %s...", ONE_REQUIRED_GRADLE_VERSION);
    process.env['CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL'] = url;
}

//ONE android plugin requires gradle wrapper 2.3 at the moment. And it subsequently depends on gradle 3.3 and newer
function checkMinGradleVersionSatisfied(url) {
    const versionStr = /gradle-(.+)-all/g.exec(url)[1];
    logger.log("One plugin: %s version of the gradle wrapper is used", versionStr);

    return Number(versionStr) >= ONE_REQUIRED_GRADLE_VERSION;
}

module.exports = {
    checkGradleDistributionVersionAndBumpIdNeeded: function () {
        //cordova looks for CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL environment variable to check weather user specified gradle version or not
        //we do the same: if version was specified and satisfies our needs we keep it or set required version otherwise
        var userDistribUrl = process.env['CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL'];
        if (userDistribUrl) {
            //if version is ok, return without doing anything
            if (checkMinGradleVersionSatisfied(userDistribUrl)) {
                return;
            }
        }

        bumpGradleWrapperDistribUrl(GRADLE_DISTRIBUTION_URL);
    }
};

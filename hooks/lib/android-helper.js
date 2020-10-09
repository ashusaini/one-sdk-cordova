var fs = require("fs");
var path = require("path");
var utilities = require("./utilities");
var logger = require("console");

module.exports = {
    // Appends a section to the build.gradle file of an android project
    addOneBuildToolsGradle: function (context) {

        logger.log("One plugin: Start adding build.gradle config...");
        var buildGradle = utilities.readBuildGradle();
        buildGradle +=
           `
           // One Cordova Plugin - Start One SDK configuration
            buildscript {
                repositories {
                    google()
                    jcenter()
                    maven { url 'https://thunderhead.mycloudrepo.io/public/repositories/one-sdk-android' }
                }
                dependencies {
                    classpath 'com.android.tools.build:gradle:3.4.2'
                    classpath 'com.thunderhead.android:orchestration-plugin:1.0.1'
                }
            }
            // One Cordova Plugin - End One SDK configuration`;
        
        utilities.writeBuildGradle(buildGradle);
        logger.log("One plugin: build.gradle config added");
    },

    removeOneBuildToolsFromGradle: function () {
        var buildGradle = utilities.readBuildGradle();
        buildGradle = buildGradle.replace(/\n\s+\/\/ One Cordova Plugin - Start One SDK configuration[\s\S]*\/\/ One Cordova Plugin - End One SDK configuration/, "");
        utilities.writeBuildGradle(buildGradle);
    }
};

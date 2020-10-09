const fs = require('fs');
const path = require('path');
const packagejson = require('../package.json');
const shell = require('shelljs');

const ANDROID_PLUGIN_RELATIVE_DIR = "../src/android";
const ANDROID_SOURCE_FILE_NAME = "OneSdkVersion.java";
const ONE_CORDOVA_PLUGIN_VERSION = packagejson.version;
const VERSION_REGEX = "[0-9]+\.[0-9]+\.*[0-9]*";

function bumpSDKVersionInPlugins() {
    writeCordovaSDKModuleVersionToPluginXML()
        .then(writeCordovaSDKModuleVersionToAndroidProps)
        .then(writeCordovaSDKModuleVersionToiOSOnePlugin)
        .catch(function (err) {
            console.log(err);
            process.exit(1);
        });
}

function writeCordovaSDKModuleVersionToAndroidProps() {
    const ANDROID_STRING_PATTERN_TO_REPLACE = /ONE_CORDOVA_PLUGIN_VERSION\s?=\s?"[0-9]+\.[0-9]+\.*[0-9]*";/;
    const ANDROID_REPLACEMENT_STRING = "ONE_CORDOVA_PLUGIN_VERSION = \"" + ONE_CORDOVA_PLUGIN_VERSION + "\";";

    let promise = new Promise(function (resolve, reject) {
        let androidSourceFilePath = path.join(__dirname, ANDROID_PLUGIN_RELATIVE_DIR, ANDROID_SOURCE_FILE_NAME);

        let resultFileContent = shell.sed('-i', ANDROID_STRING_PATTERN_TO_REPLACE, ANDROID_REPLACEMENT_STRING, androidSourceFilePath);
        let num = resultFileContent.search(ANDROID_REPLACEMENT_STRING);
        if (num == -1) {
            reject(Error("Failed to update plugin " + ANDROID_SOURCE_FILE_NAME + " with new version"));
        } else {
            console.log("Module version " + ONE_CORDOVA_PLUGIN_VERSION + " was written to " + ANDROID_SOURCE_FILE_NAME);
            resolve();
        }
    });
    return promise;
}

function writeCordovaSDKModuleVersionToiOSOnePlugin() {
    const INPUT_FILE_NAME = "OnePlugin.m";
    const INPUT_FILE_PATH = path.join("../src/ios/");

    let iOSMFileAbsolutePath = path.join(__dirname, INPUT_FILE_PATH, INPUT_FILE_NAME);

    const STRING_PATTERN_TO_REPLACE = /kOneCordovaPluginVersion\s?=\s?@"[0-9]+\.[0-9]+\.*[0-9]*";/;
    const REPLACEMENT_STRING = "kOneCordovaPluginVersion = @\"" + ONE_CORDOVA_PLUGIN_VERSION + "\";";

    let promise = new Promise(function (resolve, reject) {
        let resultFileContent = shell.sed('-i', STRING_PATTERN_TO_REPLACE, REPLACEMENT_STRING, iOSMFileAbsolutePath);
        let num = resultFileContent.search(REPLACEMENT_STRING);
        if (num == -1) {
            reject(Error("Failed to update iOS " + INPUT_FILE_NAME + " with new version"));
        } else {
            console.log("Module version " + ONE_CORDOVA_PLUGIN_VERSION + " was written to " + INPUT_FILE_NAME);
            resolve();
        }
    });
    return promise;
}

function writeCordovaSDKModuleVersionToPluginXML() {
    const INPUT_FILE_NAME = "plugin.xml";
    const INPUT_FILE_PATH = path.join("../", INPUT_FILE_NAME);
    let pluginXmlFileAbsolutePath = path.join(__dirname, INPUT_FILE_PATH);

    const VERSION_STRING_TO_REPLACE = /version\s?=\s?"[0-9]+\.[0-9]+\.*[0-9]*"/;
    const VERSION_STRING_TO_BE_PLACED = "version=" + "\"" + ONE_CORDOVA_PLUGIN_VERSION + "\"";

    let promise = new Promise(function (resolve, reject) {
        let resultFileContent = shell.sed('-i', VERSION_STRING_TO_REPLACE, VERSION_STRING_TO_BE_PLACED, pluginXmlFileAbsolutePath);
        let num = resultFileContent.search(VERSION_STRING_TO_BE_PLACED);
        if (num == -1) {
            reject(Error("Failed to update plugin " + INPUT_FILE_NAME + " with new version"));
        } else {
            console.log("Module version " + ONE_CORDOVA_PLUGIN_VERSION + " was written to " + INPUT_FILE_NAME);
            resolve();
        }
    });
    return promise;
}

bumpSDKVersionInPlugins();
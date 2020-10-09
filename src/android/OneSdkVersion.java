package com.thunderhead;

import com.thunderhead.One;
import com.thunderhead.utils.ThunderheadLogger;

public class OneSdkVersion {
    private static final String ONE_CORDOVA_PLUGIN_VERSION = "1.4.0";
    
    public static void updateModuleSdkVersion(One one) {
        if (one != null) {
            SdkExtraParams sdkExtraParams = new SdkExtraParams();
            sdkExtraParams.putStringExtraParameter(SdkExtraParams.PluginsApiParametersKeys.PARAMETER_CORDOVA_VERSION, ONE_CORDOVA_PLUGIN_VERSION);
            one.passExtraParameters(sdkExtraParams);
        } else {
            ThunderheadLogger.errorLog("Executing updateModuleSdkVersion(One) while one is null");
        }
    }
}
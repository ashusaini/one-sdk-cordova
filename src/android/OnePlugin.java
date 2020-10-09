package com.thunderhead.plugin.one;

import android.content.Context;
import android.util.Log;

import com.thunderhead.One;
import com.thunderhead.OneModes;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import com.thunderhead.OneSdkVersion;
import com.thunderhead.android.infrastructure.server.responses.BaseResponse;
import com.thunderhead.interfaces.GetCallback;
import com.thunderhead.utils.ThunderheadError;


/**
 * This class echoes a string called from JavaScript.
 */
public class OnePlugin extends org.apache.cordova.CordovaPlugin {
    
    private static volatile OnePlugin INSTANCE;
    protected static final String LOG_TAG = "OnePlugin";
    private Context context;
    private One one;
    
    @Override
    public boolean execute(final String action, final CordovaArgs args, final CallbackContext callbackContext) throws JSONException {
        if ("initializeOne".equals(action)) {
            return initializeOne(args, callbackContext);
        } else if ("sendInteraction".equals(action)) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    try {
                        JSONObject jsonObject = args.optJSONObject(1);
                        HashMap<String, String> propertiesMap = getPropertiesFromJSONObject(jsonObject);
                        sendInteraction(args.getString(0), propertiesMap, callbackContext);
                    } catch (Exception e) {
                        e.printStackTrace();
                        callbackContext.error("Failed to send properties: " + e.getLocalizedMessage());
                    }
                }
            });
            return true;
        } else if ("sendProperties".equals(action)) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    try {
                        JSONObject jsonObject = args.optJSONObject(1);
                        if (jsonObject == null) {
                            callbackContext.error("No properties to send");
                            return;
                        }
                        HashMap<String, String> propertiesMap = getPropertiesFromJSONObject(jsonObject);
                        if (propertiesMap != null && propertiesMap.size() > 0) {
                            sendProperties(args.getString(0), propertiesMap);
                            callbackContext.success();
                        } else  {
                            callbackContext.error("No properties to send");
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                        callbackContext.error("Failed to send properties: " + e.getLocalizedMessage());
                    }
                }
            });
            return true;
        } else if ("sendBaseTouchpointProperties".equals(action)) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    try {
                        JSONObject jsonObject = args.getJSONObject(0);
                        HashMap<String, String> propertiesMap = getPropertiesFromJSONObject(jsonObject);
                        if (propertiesMap != null && propertiesMap.size() > 0) {
                            sendBaseTouchpointProperties(propertiesMap);
                            callbackContext.success();
                        } else  {
                            callbackContext.error("No base Touchpoint properties to send");
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                        callbackContext.error("Failed to send base Touchpoint properties: " + e.getLocalizedMessage());
                    }
                }
            });
            return true;
        } else if ("getTid".equals(action)) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    callbackContext.success(getTid());
                }
            });
            return true;
        } else if ("clearUserProfile".equals(action)) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    clearUserProfile();
                    if (getTid() == null || getTid().length() == 0) {
                        callbackContext.success();
                    } else  {
                        callbackContext.error("Failed to clear user profile");
                    }
                }
            });
            return true;
        } else if ("sendInteractionForOutboundLink".equals(action)) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    try {
                        String stringURL = args.optString(0);
                        URL url = new URL(stringURL);
                        sendInteractionForOutboundLink(url);
                    } catch (Exception e) {
                        e.printStackTrace();
                        callbackContext.error("Failed to send interaction for outbound link: " + e.getLocalizedMessage());
                    }
                }
            });
            return true;
        } else if ("getURLWithOneTid".equals(action)) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    String stringURL = args.optString(0);
                    if (stringURL == null) {
                        callbackContext.error("Passed string URL is null");
                        return;
                    }
                    URL urlWithTid = getURLWithOneTid(stringURL);
                    if (urlWithTid != null) {
                        callbackContext.success(urlWithTid.toString());
                    } else  {
                        callbackContext.error("Failed to create an URL with tid");
                    }
                }
            });
            return true;
        } else if ("disableIdentityTransfer".equals(action)) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    boolean disable = args.optBoolean(0);
                    one.disableIdentityTransfer(disable);
                    callbackContext.success();
                }
            });
            return true;
        } else if ("handleURL".equals(action)) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    String stringURL = args.optString(0);
                    if (stringURL == null) {
                        callbackContext.error("Passed string URL is null");
                        return;
                    }
                    try {
                        one.handleURL(stringURL);
                        callbackContext.success();
                    } catch (Exception e) {
                        callbackContext.error("Failed to handle URL");
                    }
                }
            });
            return true;
        } else if ("sendPushToken".equals(action)) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                 public void run() {
                    String stringURL = args.optString(0);
                    if (stringURL == null) {
                        callbackContext.error("Passed string URL is null");
                        return;
                    }
                    try {
                        one.sendPushToken(stringURL);
                        callbackContext.success();
                    } catch (Exception e) {
                        callbackContext.error("Failed to handle URL");
                    }
                }       
            });
            return true;
        } else if ("getPushToken".equals(action)) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    try {
                        String token = one.getPushToken();
                        callbackContext.success(token);
                    } catch (Exception e) {
                        callbackContext.error("Failed to get push token");
                    }
                }
            });
            return true;
        } else if ("enablePushNotifications".equals(action)) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    boolean enable = args.optBoolean(0);
                    one.enablePushNotifications(enable);
                    callbackContext.success();
                }
            });
            return true;  
        } else if ("whitelistIdentityTransferLinks".equals(action)) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    ArrayList<String> links = getStringListFromCordovaArgs(args);
                    if (links.size() > 0) {
                        one.whitelistIdentityTransferLinks(links);
                        callbackContext.success();
                    } else {
                        callbackContext.error("The SDK cannot whitelist any links as no links were provided.");
                    }
                }
            });
            return true;
        } else if ("blacklistIdentityTransferLinks".equals(action)) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    ArrayList<String> links = getStringListFromCordovaArgs(args);
                    if (links.size() > 0) {
                        one.blacklistIdentityTransferLinks(links);
                        callbackContext.success();
                    } else {
                        callbackContext.error("The SDK cannot blacklist any links as no links were provided.");
                    }
                }
            });
            return true;
        }
        return false;
    }
    
    public boolean initializeOne(final CordovaArgs args, final CallbackContext callbackContext) {
        callAPI(new API(callbackContext) {
            void api() {
                Log.d(LOG_TAG, "Initializing Thunderhead One Plugin");
                context = cordova.getActivity().getApplicationContext();
                createOneObject(context);
                try {
                    init(args.getString(0), args.getString(1), args.getString(2), args.getString(3), args.getString(4), args.getBoolean(5), args.getString(6));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        return true;
    }
    
    private static abstract class API implements Runnable {
        private final CallbackContext mCallbackContext;
        
        API(final CallbackContext callbackContext) {
            super();
            mCallbackContext = callbackContext;
        }
        
        @Override
        public void run() {
            api();
            mCallbackContext.success();
        }
        
        abstract void api();
    }
    
    public OnePlugin() {
        
    }
    
    private OnePlugin(Context context) {
        createOneObject(context);
        this.context = context;
    }
    
    private void createOneObject(Context context) {
        one = One.getInstance(context);
        one.disableAutomaticInteractionDetection(true);
    }
    
    public static OnePlugin getInstance(final Context context) {
        if (context == null) {
            Log.d(LOG_TAG, "Context should not be null");
            return null;
        }
        
        if (INSTANCE == null) {
            synchronized (OnePlugin.class) {
                if (INSTANCE == null) {
                    INSTANCE = new OnePlugin(context.getApplicationContext());
                }
            }
        }
        return INSTANCE;
    }
    
    public synchronized boolean init(String siteKey, String touchpointURI, String apiKey, String sharedSecret, String userId, boolean isAdminMode, String hostName) {
        if (one == null) {
            createOneObject(cordova.getActivity().getApplicationContext());
        }
        if (one != null) {
            Log.d(LOG_TAG, "Initializing Thunderhead One");
            if (isAdminMode) {
                one.init(siteKey, touchpointURI, apiKey, sharedSecret, userId, OneModes.ADMIN_MODE, hostName);
            } else {
                one.init(siteKey, touchpointURI, apiKey, sharedSecret, userId, OneModes.USER_MODE, hostName);
            }
            OneSdkVersion.updateModuleSdkVersion(one);
            return true;
        }
        return false;
    }
    
    public void sendInteraction(String interactionPath, HashMap<String, String> propertiesMap, final CallbackContext callbackContext) {
        if (one != null) {
            Log.d(LOG_TAG, "Sending interaction: " + interactionPath + " with properties: " + propertiesMap);
            one.sendInteraction(interactionPath, propertiesMap, new GetCallback<BaseResponse>() {
                @Override
                public void done(BaseResponse baseResponse, ThunderheadError thunderheadError) {
                    if (thunderheadError == null) {
                        try {
                            JSONObject jsonObject = new JSONObject(baseResponse.toString());
                            callbackContext.success(jsonObject);
                        }
                        catch (Exception exception) {
                            exception.printStackTrace();
                            callbackContext.error(exception.getLocalizedMessage());
                        }
                    } else {
                        callbackContext.error(thunderheadError.getErrorMessage());
                    }
                }
            });
        }
    }
    
    public void sendProperties(String interactionPath, HashMap<String, String> propertiesMap) {
        if (one != null && interactionPath != null && propertiesMap != null) {
            Log.d(LOG_TAG, "Sending properties: " + propertiesMap + " for interaction: " + interactionPath);
            one.sendProperties(interactionPath, propertiesMap);
        }
    }
    
    public void sendBaseTouchpointProperties(HashMap<String, String> propertiesMap) {
        if (one != null && propertiesMap != null) {
            Log.d(LOG_TAG, "Sending base Touchpoint properties: " + propertiesMap);
            one.sendBaseTouchpointProperties(propertiesMap);
        }
    }

    public void sendInteractionForOutboundLink(URL url) {
        one.sendInteractionForOutboundLink(url);
    }

    public String getTid() {
        if (one != null) {
            return one.getTid();
        }
        return "";
    }
    
    public void clearUserProfile() {
        if (one != null) {
            one.clearUserProfile();
        }
    }

    public URL getURLWithOneTid(String stringURL) {
        URL url = null;
        try {
            url = one.getURLWithOneTid(new URL(stringURL));
        } catch (MalformedURLException e) {
            url = null;
            e.printStackTrace();
        }

        return url;
    }
    
    private void callAPI(final API api) {
        cordova.getActivity().runOnUiThread(api);
    }
    
    private HashMap<String, String> getPropertiesFromJSONObject(JSONObject jsonObject) {
        if (jsonObject != null && jsonObject.length() > 0) {
            HashMap<String, String> propertiesMap = new HashMap<String, String>(jsonObject.length());
            for(Iterator<String> iter = jsonObject.keys();iter.hasNext();) {
                String key = iter.next();
                try {
                    Object value = jsonObject.get(key);
                    if (value != null) {
                        propertiesMap.put(key, value.toString());
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            return propertiesMap;
        }
        return null;
    }

    private ArrayList<String> getStringListFromCordovaArgs(CordovaArgs args) {
        ArrayList<String> stringList = new ArrayList<String>();
        /**
         * CordovaArgs doesn't have methods to determine its size.
         * Therefore we have to determine its end by using isNull 
         * method.
         */
        for (int index = 0;;index++) {
            if (args.isNull(index)) {
                break;
            }
            String entry = args.optString(index);
            if (entry != null) {
                stringList.add(entry);
            }
        }
        return stringList;
    }
}

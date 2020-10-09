# cordova-plugin-one
[![npm version](https://badge.fury.io/js/cordova-plugin-one.svg)](https://badge.fury.io/js/rcordova-plugin-one)

The ONE SDK Cordova Plugin for iOS and Android.

## Installation
To install the ONE Cordova Plugin, navigate to your app’s folder and run the following command:
```sh
$ cordova plugin add cordova-plugin-one
```
## Usage
### Initialization
To initialize the ONE Cordova Plugin, call the following method:
```javascript
    One.init({
        siteKey: <site-key>,
        touchpointURI: <touchpoint-uri>,
        apiKey: <api-key>,
        sharedSecret:  <shared-secret>,
        userId:  <user-id>,
        adminMode:  <admin-mode>,
        hostName: <host-name>
    };
```
* See example of usage [here](https://github.com/thunderheadone/one-sdk-cordova/tree/master/ionic5-angular-example/src/app/app.component.ts#L28)

### Send an Interaction 
To send an Interaction request with properties, call the following method:
```javascript
One.sendInteraction("/interactionPath", null);
```
To send an Interaction request without properties, call the following method:
```javascript
One.sendInteraction("/interactionPath", {key: "value"});
```
* See example of usage [here](https://github.com/thunderheadone/one-sdk-cordova/tree/master/ionic5-angular-example/src/app/app.component.ts#L37)

### Send an Interaction with a Callback
To send an Interaction request with a callback and properties, call the following public method:
```javascript
One.sendInteraction("/interactionPath", {key: "value"}, 
    function(response) {
        console.log(response)
    }, 
    function(error) { 
        console.log(error)
    }
);
```
To send an Interaction request with a callback and without properties, call the following pubilc method:
```javascript
One.sendInteraction("/interactionPath", null, 
    function(response) {
        console.log(response)
    }, 
    function(error) { 
        console.log(error)
    }
);
```
* See example of usage [here](https://github.com/thunderheadone/one-sdk-cordova/tree/master/ionic5-angular-example/src/app/app.component.ts#L37)

### Send properties to an Interaction
To send properties to a specific Interaction, call the following public method, passing in your JavaScript object containing your properties:
```javascript
One.sendProperties("/interactionPath", {key:"value"});
```
* See example of usage [here](https://github.com/thunderheadone/one-sdk-cordova/tree/master/ionic5-angular-example/src/app/app.component.ts#L45)

### Send properties to a Base Touchpoint
To send properties to a Base Touchpoint, call the following public method and pass in your JavaScript object containing your properties:
```javascript
One.sendBaseTouchpointProperties({key:"value"});
```
* See example of usage [here](https://github.com/thunderheadone/one-sdk-cordova/tree/master/ionic5-angular-example/src/app/app.component.ts#L53)

### Get tid
To get the tid for the current app, call the following public method:
```javascript
var onTidSuccess = function(tid) {
    // Do something with the tid
};
One.getTid(onTidSuccess);
```
### Clear User Profile
To clear the current app tid, call the following public method:
```javascript
var onClearUserProfileSuccess = function() {
    console.log("The SDK cleared the tid");
}
var onClearUserProfileFailure = function() {
    console.log("The SDK failed to clear the tid");
};
One.clearUserProfile(onClearUserProfileSuccess,onClearUserProfileFailure);
```
### Identity transfer
####	Ability to whitelist identity transfer links
To whitelist links to which the SDK appends a one-tid, call the following public method:
```javascript
One.whitelistIdentityTransferLinks(["*.google.*","*.wikipedia.org"]);
```
**Note**: If a link is whitelisted, a one-tid will be appended to this link only.
####	Ability to blacklist identity transfer links
To blacklist links to which the SDK appends a one-tid, call the following public method:
```javascript
One.blacklistIdentityTransferLinks(["*.bbc.com"]);
```
**Note**: If a link is blacklisted, a one-tid will be appended to all other links but the blacklisted link.
#### Disable automatic identity transfer
To disable automatic identity transfer, call the following public method:
```javascript
var onDisablingAutomaticIdentityTransferSuccess = function() {
    // Do something
};
var onDisablingAutomaticIdentityTransferFailure = function(error) {
    console.log(error);
};
One.disableIdentityTransfer(true, onDisablingAutomaticIdentityTransferSuccess, onDisablingAutomaticIdentityTransferFailure);
```
#### Get a URL with one-tid
To get a URL with one-tid, call the following public method:
```javascript
var url = "https://en.m.wikipedia.org/wiki/Safari?key=value&key2=value2";
var onGetURLWithOneTidSuccess = function(urlWithOneTid) {
    // Do something with the returned URL;
};
var onGetURLWithOneTidFailure = function(error) {
    console.log(error);
};
One.getURLWithOneTid(url,onGetURLWithOneTidSuccess, onGetURLWithOneTidFailure);
```
#### Send properties for an incoming URL
To send properties for an incoming URL, call the following public method:
```javascript
var incomingURL = "https://en.m.wikipedia.org/wiki/Safari?key=value&key2=value2";
var onHandleURLSuccess = function() {
    // Do something
};
var onHandleURLError = function(error) {
    console.log(error);
};
One.handleURL(incomingURL, onHandleURLSuccess, onHandleURLError);
```
### Outbound link tracking
#### Disable automatic outbound link tracking 
To disable automatic outbound link tracking, call the following public method:
```javascript
var onDisablingAutomaticLinkTrackingSuccess = function() {
    // Do something
};
var onDisablingAutomaticLinkTrackingFailure = function(error) {
    console.log(error);
};
One.disableAutomaticOutboundLinkTracking(true, onDisablingAutomaticLinkTrackingSuccess, onDisablingAutomaticLinkTrackingFailure);
```
#### Send 'one-click' interaction for a URL
To send "one-click" Interaction request for a URL, call the following public method:
```javascript
var url = "https://en.m.wikipedia.org/wiki/Safari?key=value&key2=value2";
var onSendInteractionForLinkSuccess = function() {
    // Do something
}
var onSendInteractionForLinkFailure = function(error) {
    console.log(error);
};
One.sendInteractionForOutboundLink(url, onSendInteractionForLinkSuccess, onSendInteractionForLinkFailure);
```
###	Enable push notifications
#### iOS integration
To receive push notifications from ONE, take the following steps

1.	Open your app using Xcode.
2.	Enable **Push Notifications** in **Capabilities** pane.
3.	Enable **Background Modes** in **Capabilities** pane.
4.	Select **Remote Notifications** under **Background Modes** section.
5.	In your Cordova codebase call the method *enablePushNotifications* by passing **true**, as shown below:
```javascript
var onSuccess = function() {
    // Do something
};
var onError = function(error) {
    console.log(error);
};
One.enablePushNotifications(true, onSuccess, onError);
```
#### Android integration 
To receive push notifications from Thunderhead ONE or Salesforce Interaction Studio, Firebase Cloud Messaging (FCM) must be configured by following the FCM setup instructions.
At minimum the app must be configured in Firebase and the `google-services.json` needs to be in the root of the app project.

#### Minimum Gradle configuration
To use the codeless push notifications functionality without using FCM directly, you need to at least have the `google-services` plugin applied to your app build.gradle:

1. Add the Google Services Plugin to your classpath in the top-level build.gradle file, located in the root project directory, as shown below:
    ```gradle
    buildscript {
        repositories {
            google()
            jcenter()
            mavenCentral()
        }
        dependencies {
            classpath 'com.android.tools.build:gradle:3.4.2'
            // for cloud messaging support
            classpath 'com.google.gms:google-services:4.2.0'
        }
    }
    ```
2.  Apply the Google Messaging Service plugin to the app-level build.gradle file, as shown below:

    ```gradle
    // place this at the bottom of your app build.gradle
    apply plugin: 'com.google.gms.google-services'
    ```

    - The `Warning: The app gradle file must have a dependency on com.google.firebase:firebase-core for Firebase services to work as intended.`
    can safely be ignored as this is not required for Push Notification Support.

#### Enable codeless push notification support programmatically
- For Firebase Cloud Messaging simply enable push notifications as shown below:
    ```java
    One one = One.getInstance(getApplicationContext());
    one.enablePushNotifications(true);
    ```
*Note:*
- When the Thunderhead SDK is the only push message provider in your application and you enable codeless push notification support,
the SDK will automatically get the push token and handle receiving of push notifications on behalf of your app.

##### Configure push notifications with multiple push message SDKs
When the Thunderhead SDK is integrated into an App that has multiple push message providers for Firebase, extra configuration is required.
The Thunderhead SDK message APIs must be called from the service that receives the FCM token and FCM Message.  

```java
// Call when a new FCM token is retrieved:
One.getInstance(context).processMessagingToken(newToken);

// Call when a new message is received from Firebase:
One.getInstance(context).processMessage(message);
```

An example of a Firebase Messaging Service that calls the Thunderhead SDK messaging APIs:
```java
public final class FirebaseService extends FirebaseMessagingService {
    private static final String TAG = "FirebaseService";

    @Override
    public void onMessageReceived(final RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        try {
            One.getInstance(getApplicationContext()).processMessage(remoteMessage);
            // Call other Push Message SDKS.
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
        }
    }

    @Override
    public void onNewToken(final String newToken) {
        super.onNewToken(newToken);
        try {
            One.getInstance(getApplicationContext()).processMessagingToken(newToken);
            // Call other Push Message SDKS.
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
        }
    }
}
```

Do not forget to register the customer service (if required) that calls the Thunderhead SDK in the manifest:

```xml

<!-- The priority should be set to a high value in order to ensure this service receives the intent vs the other push provider SDKs -->
 <service android:name="com.example.FirebaseService">
    <intent-filter android:priority="100">
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```
###	Send a push token programmatically 
To send a push token programmatically to ONE, call the following public method:
```javascript
One.sendPushToken(token, 
    function() {
        console.log("The push token" + token +  " is sent.");
    }, function(error) {
        console.log("An error occurred when sending the push token: " + error);
    }
);
```
###	Get a push token programmatically  
To retrieve a push token stored in the iOS or Android SDK, call the following public method:
```javascript
One.getPushToken(function (token) {
    console.log(token);
});
```
## Plugin removal
To remove the ONE Cordova Plugin, call the following command in Terminal:
``` sh
$ cordova plugin remove cordova-plugin-one
```

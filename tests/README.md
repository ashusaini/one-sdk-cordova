The following steps describe how to set up and run unit tests for the One Cordova Plugin:

	1. open command line (for Windows) or Terminal (for Mac);
	
	2. navigate to target app folder by running
			cd <path-to-target-app-folder>;
	
	3. add cordova-plugin-test-framework plugin by running
			cordova plugin add http://git-wip-us.apache.org/repos/asf/cordova-plugin-test-framework.git;
	
	4. if the One Cordova Plugin is not added to the target app, add it by running 
			cordova plugin add <path-to-one-plugin>;
	
	5. add the One Cordova Plugin's tests as a plugin by running
			cordova plugin add <path-to-one-plugin/tests>;
	
	6. open the target app's config.xml file;
	
	7. comment out the entry <content src="index.html"> and add <content src="cdvtests/index.html" />;
	
	8. start the target app by running
			cordova emulate <target-platform>;

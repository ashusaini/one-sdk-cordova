exports.defineAutoTests = function() {
  describe('One unit testing', function () {
    
	var responseData = null;
    var errorData = null;
    var tid = "";
    var tid1 = "";
    var url = "https://en.m.wikipedia.org/wiki/Safari";
    var urlWithOneTid = "";
    var getURLWithOneTid = "";

	beforeAll(function() { 
		One.init({
					siteKey: "SITE-KEY",
					touchpointURI: "cordova",
					apiKey: "api-key",
					sharedSecret: "shared-secret",
					userId: "userid@company",
					adminMode: false,
					hostName: "server.thunderhead.com"
				}
			);
	});

    afterEach(function() {
		responseData = null;
	    errorData = null;
    });

    describe('Checking for One availability', function () {

        it('One should be defined', function() {
           expect(One).toBeDefined();
           console.log("One is defined");
        });

    });

    describe('Sending interaction', function () {

        beforeEach(function(done) {
			console.log("Sending interaction /InteractionFromCordova1...");
			One.sendInteraction("/InteractionFromCordova1", null, 
				function(response) { 
					console.log(response); 
					responseData = response; 
					done();
				}, 
				function(error) { 
					console.log(error); 
					errorData = error; 
					done();
				});
        });

        it('should return a response', function() {
            expect(responseData).toBeTruthy();
			expect(responseData.statusCode).toEqual(200);
			expect(errorData).toEqual(null);
			console.log("Sending interaction request is done.");
        });

    });

    describe('Sending interaction with properties', function () {

        beforeEach(function(done) {
			console.log("Sending interaction /InteractionFromCordova2 with properties...");
			One.sendInteraction("/InteractionFromCordova2", {key:"value"}, 
				function(response) { 
					console.log(response); 
					responseData = response; 
					done();
				}, 
				function(error) { 
					console.log(error); 
					errorData = error; 
					done();
				});        
		});

        it('should return a response', function() {
            expect(responseData).toBeTruthy();
			expect(responseData.statusCode).toEqual(200);
			expect(errorData).toEqual(null);
			console.log("Sending interaction with properties request is done.");
        });

    });

// Not possible to test sending properties for interaction because underlaying sendProperties method
// is used without completion block / callback at the moment.
/*
    describe('Sending properties for interaction', function () {

        beforeEach(function(done) {
			console.log("Sending properties for interaction /InteractionFromCordova3...");
			One.sendProperties("/InteractionFromCordova3", {key:"value"}, 
				function(response) { 
					console.log(response); 
					responseData = response; 
					done();
				}, 
				function(error) { 
					console.log(error); 
					errorData = error; 
					done();
				});        
		});

        it('should return a response', function() {
            expect(responseData).toBeTruthy();
			expect(responseData.statusCode).toEqual(200);
			expect(errorData).toEqual(null);
			console.log("Sending properties for interaction request is done.");
        });

    });
*/

// Not possible to test sending properties for interaction because underlaying sendProperties method
// is used without completion block / callback at the moment.
/*
    describe('Sending base touchpoint properties', function () {

        beforeEach(function(done) {
			console.log("Sending base touchpoint properties...");
			One.sendBaseTouchpointProperties({key:"value"}, 
				function(response) { 
					console.log(response); 
					responseData = response; 
					done();
				}, 
				function(error) { 
					console.log(error); 
					errorData = error; 
					done();
				});        
		});

        it('should return a response', function() {
            expect(responseData).toBeTruthy();
			expect(responseData.statusCode).toEqual(200);
			expect(errorData).toEqual(null);
			console.log("Sending base touchpoint properties request is done.");
        });

    });
*/

    describe('Getting TID', function () {

        beforeEach(function(done) {
			console.log("Clearing user profile...");
			One.getTid( 
				function(storedTid) {
					tid = storedTid; 
					console.log("Got tid: " + tid); 
					done();
				}, 
				function() { 
					console.log("Error happened while getting TID."); 
					done();
				});        
		});

        it('should return TID', function() {
        	expect(tid).not.toBe(null);
        	expect(tid.length > 0).toBe(true);
			console.log("Getting TID is done.");
        });

    });

    describe('Clearing user profile', function () {

        beforeEach(function(done) {
			console.log("Clearing user profile...");
			One.clearUserProfile( 
				function() { 
					console.log("Success by clearing user profile."); 
					done();
				}, 
				function() { 
					console.log("Error happened while clearing user profile."); 
					done();
				});        
		});

        it('should succeed', function() {
        	expect(true).toBe(true);
			console.log("Clearing user profile request is done.");
        });

    });

    describe('Verify TID', function () {

        beforeEach(function(done) {
			console.log("Clearing user profile...");
			One.getTid( 
				function(storedTid) {
					tid = storedTid; 
					console.log("Got tid: " + tid); 
					done();
				}, 
				function() { 
					console.log("Error happened while getting TID."); 
					done();
				});        
		});

        it('should be empty', function() {
        	expect(tid.length > 0).toBe(false);
			console.log("Verify TID request is done.");
        });

    });

    describe('Comparing TIDs', function () {

        beforeAll(function(done) {
			console.log("Sending interaction /InteractionFromCordovaTID1...");
			One.sendInteraction("/InteractionFromCordovaTID1", null, 
				function(response) { 
					console.log(response); 
					responseData = response; 
					tid1 = responseData.tid;
					console.log("TID1 from response " + tid1);
					done();
				}, 
				function(error) { 
					console.log(error); 
					errorData = error; 
					done();
				});
			
        });

        beforeEach(function(done) {
			One.getTid( 
				function(storedTid) {
					tid = storedTid; 
					console.log("TID1 from getTid: " + tid);  
					done();
				}, 
				function() { 
					console.log("Error happened while getting TID."); 
					done();
				});        
		});

        it('should be equal', function() {
        	expect(tid1).toEqual(tid);
            console.log("Equal " + tid); 
        });

        afterEach(function(done) {
			console.log("Clearing user profile...");
			One.clearUserProfile( 
				function() { 
					console.log("Success by clearing user profile."); 
					done();
				}, 
				function() { 
					console.log("Error happened while clearing user profile."); 
					done();
				});        
		});

    });

    describe('Comparing TIDs after clearing', function () {

        beforeAll(function(done) {
			console.log("Sending interaction /InteractionFromCordovaTID2...");
			One.sendInteraction("/InteractionFromCordovaTID1", null, 
				function(response) { 
					console.log(response); 
					responseData = response; 
					tid1 = responseData.tid;
					console.log("TID2 from response " + tid1);
					done();
				}, 
				function(error) { 
					console.log(error); 
					errorData = error; 
					done();
				});
			
        });

        beforeEach(function(done) {
			One.getTid( 
				function(storedTid) {
					tid = storedTid; 
					console.log("TID2 from getTid: " + tid);  
					done();
				}, 
				function() { 
					console.log("Error happened while getting TID."); 
					done();
				});        
		});

        it('should be equal', function() {
        	expect(tid1).toEqual(tid);
            console.log("Equal " + tid); 
        });
    });

    describe('Adding a one-tid to a URL', function () {

    	beforeAll(function(done) {
			console.log("Create link with one-tid");
			One.sendInteraction("/InteractionToGetTID", null, 
				function(response) { 
					console.log(response); 
					responseData = response; 
					tid = responseData.tid;
					urlWithOneTid = url + "?one-tid=" + tid;
					console.log("Manually created url with one-tid " + urlWithOneTid);
					done();
				}, 
				function(error) { 
					console.log(error); 
					errorData = error; 
					done();
				});
			
        });

        beforeEach(function(done) {
			One.getURLWithOneTid(url, 
				function(url){
					console.log("Get link with one-tid " + url);
					getURLWithOneTid = url;
					done();
				},
				function(error){
					console.log(error); 
					errorData = error; 
					done();
				});
        });

      
        it('should be equal', function() {
        	expect(urlWithOneTid).toEqual(getURLWithOneTid);
            console.log("Equal " + getURLWithOneTid); 
        });
    });

  });
};

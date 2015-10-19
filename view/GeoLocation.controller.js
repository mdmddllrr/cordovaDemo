jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.m.MessageBox");

sap.ui.core.mvc.Controller.extend("CordovaKapselSample.view.GeoLocation", {

	onInit: function() {
	    this._oView = this.getView();
		this._oRouter = this.getRouter();
		this.getRouter().attachRouteMatched(function(oEvent) {}, this);
		this.bindEvents();
		var watchID = null;
	},
	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},
	bindEvents: function() {
		document.addEventListener("deviceready", this.onDeviceReady, false);
	},

	onDeviceReady: function() {},

	navBack: function(oEvent) {
		this.getRouter().myNavBack("main");
	},

	/**** GetCurrentLocation ****/
	refreshWatch: function(oEvent) {

		var options = {
				enableHighAccuracy: true
			},
			that = this;

		that.setResults("Refreshing location data...");
		try {
			navigator.geolocation.getCurrentPosition(function(data) {
				that.onSuccess.call(that, data);
			}, function(error) {
				that.onError.call(that, error);
			}, options);
		} catch (e) {
			sap.m.MessageBox.show("Cordova plugin is not available.", sap.m.MessageBox.Icon.INFORMATION, "getCurrentPosition");
		}

	},

	/**** StartWatch ****/
	startWatch: function(oEvent) {
		var that = this;

		var options = {
			frequency: 5000
		};
		try {
			that.watchID = navigator.geolocation.watchPosition(function(data) {
				that.onSuccess.call(that, data);
			}, function(error) {
				that.onError.call(that, error);
			}, options);
		} catch (e) {
			sap.m.MessageBox.show("Cordova plugin is not available.", sap.m.MessageBox.Icon.INFORMATION, "StartWatch");
		}

	},

	/**** StopWatch ****/
	stopWatch: function(oEvent) {
		var that = this;

		try {
			if (that.watchID != null) {
				navigator.geolocation.clearWatch(that.watchID);
				that.watchID = null;
			}
		} catch (e) {
			sap.m.MessageBox.show("Cordova plugin is not available.", sap.m.MessageBox.Icon.INFORMATION, "StopWatch");
		}

	},

	setResults: function(value) {
		//var resultsbox = sap.ui.getCore().byId("map-page").byId("results");
		var resultsbox = this._oView.byId("results");
		if (!value) {
			resultsbox.value = "";
		} else {
			resultsbox.setValue(value);
		}
	},

	onSuccess: function(position) {
		this.setResults("Entering onSuceess...");
		this.setResults("Latitude: " + position.coords.latitude + "\n" +
			"Longitude: " + position.coords.longitude + "\n" +
			"Altitude: " + position.coords.altitude + "\n" +
			"Accuracy: " + position.coords.accuracy + "\n" +
			"Altitude Accuracy: " + position.coords.altitudeAccuracy + "\n" +
			"Heading: " + position.coords.heading + "\n" +
			"Speed: " + position.coords.speed + "\n" +
			"Current timestamp: " + new Date(position.timestamp).toLocaleTimeString().split(" ")[0] + "\n"
		);
	},

	onError: function(error) {
		this.setResults("Entering onError...");
		this.setResults("Code: " + error.code + "\n" +
			"Message: " + error.message + "\n");
	}

	,
	ViewCodeSample: function(oEvent) {
	
		this.getRouter().navTo("viewcode", {
			from: "geolocation",
			entity: "ViewCode",
			code: "GeoLocation"
		}, true);
	}

});
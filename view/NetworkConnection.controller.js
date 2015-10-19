jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.m.MessageBox");
sap.ui.core.mvc.Controller.extend("CordovaKapselSample.view.NetworkConnection", {

	onInit: function() {
		this.bindEvents();
		this._oRouter = this.getRouter();
		this.getRouter().attachRouteMatched(function(oEvent) {}, this);

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

	checkConnection: function(oEvent) {
		var that = this;
		try {
			var networkState = navigator.network.connection.type;
			var resultsbox = that.getView().byId("results");

			var states = {};
			states[Connection.UNKNOWN] = "Unknown connection";
			states[Connection.ETHERNET] = "Ethernet connection";
			states[Connection.WIFI] = "WiFi connection";
			states[Connection.CELL_2G] = "Cell 2G connection";
			states[Connection.CELL_3G] = "Cell 3G connection";
			states[Connection.CELL_4G] = "Cell 4G connection";
			states[Connection.CELL] = "Cell generic connection";
			states[Connection.NONE] = "No network connection";

			resultsbox.setValue("Network connection type is: " + states[networkState]);
		} catch (e) {
			sap.m.MessageBox.show("Cordova plugin is not available.", sap.m.MessageBox.Icon.INFORMATION, "Check Connection");
		}

	},

	setResults: function(value) {
		var resultsbox = sap.ui.getCore().byId("connection-page").byId("results");
		if (!value) {
			resultsbox.value = "";
		} else {
			resultsbox.setValue(value);
		}
	},
	ViewCodeSample: function(oEvent) {
		// var bReplace = jQuery.device.is.phone ? false : true;
		this.getRouter().navTo("viewcode", {
			from: "networkconnection",
			entity: "ViewCode",
			code: "NetworkConnection"
		}, true);
	}
});
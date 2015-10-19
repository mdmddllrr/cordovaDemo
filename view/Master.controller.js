sap.ui.core.mvc.Controller.extend("CordovaKapselSample.view.Master", {

	onInit: function() {
	//	this.oInitialLoadFinishedDeferred = jQuery.Deferred();


// 		var oList = this.getView().byId("list");
// 		oList.attachEvent("updateFinished", function() {
// 			this.oInitialLoadFinishedDeferred.resolve();
// 		//	oEventBus.publish("Master", "InitialLoadFinished");
// 		}, this);

		this.getRouter().attachRoutePatternMatched(this.onRouteMatched, this);

	},

	onRouteMatched: function(oEvent) {
		var sName = oEvent.getParameter("name");

		if (sName !== "main") {
			return;
		}
		//Load the detail view in desktop
	//	this.loadDetailView();
	},

	loadDetailView: function() {
		this.getRouter().myNavToWithoutHash({
			currentView: this.getView(),
			targetViewName: "CordovaKapselSample.view.Detail",
			targetViewType: "XML"
		});
	},
	getEventBus: function() {
		return sap.ui.getCore().getEventBus();
	},

	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

	handlecamera: function(oEvent) {

		this.getRouter().navTo("camera", {
			from: "master",
			entity: "feature/Camera"
		}, true);
	},
	handlecontacts: function(oEvent) {
		this.getRouter().navTo("contacts", {
			from: "master",
			entity: "feature/Contacts"
		}, true)
	},
	handlelocation: function(oEvent) {
		this.getRouter().navTo("geolocation", {
			from: "master",
			entity: "feature/GeoLocation"
		}, true)
	},
	handleconnection: function(oEvent) {
		this.getRouter().navTo("networkconnection", {
			from: "master",
			entity: "feature/NetworkConnection"
		}, true)
	},

	handleBarcode: function(oEvent) {
		this.getRouter().navTo("barcodescanner", {
			from: "main",
			entity: "feature/Barcode"
		}, true)

	},
	handleCalendar: function(oEvent) {
		this.getRouter().navTo("calendar", {
			from: "main",
			entity: "feature/Calendar"
		}, true)

	},
	handleOthers: function(oEvent) {
		this.getRouter().navTo("otherplugin", {
			from: "main",
			entity: "feature/OtherPlugins"
		}, true)

	}
});
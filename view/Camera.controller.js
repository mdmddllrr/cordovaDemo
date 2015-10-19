jQuery.sap.require("sap.m.MessageBox");

sap.ui.core.mvc.Controller.extend("CordovaKapselSample.view.Camera", {

	onInit: function() {
		this._oRouter = this.getRouter();
		 this.getRouter().attachRouteMatched(function(oEvent){
        },this);
        //this.getView().setShowNavButton(false);
	},
	getRouter : function () {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},
	navBack: function(oEvent) {
		this.getRouter().myNavBack("main");
	},
	/**** Capture Photo through Camera  ****/
	invokeCamera: function(oEvent) {

		var that = this;
		try {
			var cameraOptions = {
				quality: 100,
				targetWidth: 200,
				targetHeight: 200,
				sourceType: Camera.PictureSourceType.CAMERA,
				destinationType: Camera.DestinationType.DATA_URL,
				correctOrientation: true
			};
			navigator.camera.getPicture(function(data){that.takePictureSuccess.call(that,data);}, that.takePictureFailed, cameraOptions);
		} catch (e) {
			sap.m.MessageBox.show("Cordova plugin is not available. ", sap.m.MessageBox.Icon.INFORMATION,"Take Photo");
		}

	},
	takePictureSuccess: function(data) {

        var img = this.getView().byId("pict");
		var src = "data:image/jpeg;base64," + data;
		img.setSrc(src);
	},
	takePictureFailed: function(err) {

		var errMsg = JSON.stringify(err);
		sap.m.MessageBox.show(errMsg, sap.m.MessageBox.Icon.ERROR, "Take Picture");
	},

	

	/**** Read from Photo Gallery from the Emulator/Device ****/
	readGallery: function(oEvent) {
		var that = this;
		try {
			var cameraOptions = {
				quality: 100,
				targetWidth: 200,
				targetHeight: 200,
				sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
				destinationType: Camera.DestinationType.DATA_URL,
				correctOrientation: true
			};
			navigator.camera.getPicture(function(result){that.readGallerySuccess.call(that,result);}, that.readGalleryFailed, cameraOptions);
		} catch (e) {
			sap.m.MessageBox.show("Cordova plugin is not available. ", sap.m.MessageBox.Icon.INFORMATION,"Read Gallery");
		}

	},

	readGallerySuccess: function(data) {	
		var img = this.getView().byId("pict");
		var src = "data:image/jpeg;base64," + data;
		img.setSrc(src);
		
	},
	readGalleryFailed: function(err) {
		var errMsg = JSON.stringify(err);
		sap.m.MessageBox.show(errMsg, sap.m.MessageBox.Icon.ERROR, "Read Gallery");
	},
	
	/**** CleanUp API ****/
	cleanUp: function(oEvent) {
		function onSuccess() {
			sap.m.MessageBox.show("Camera cleanup success.", sap.m.MessageBox.Icon.SUCCESS,"Cleanup");
		}

		function onFail(message) {
			sap.m.MessageBox.show('Failed because: ' + message, sap.m.MessageBox.Icon.ERROR,"Cleanup");
		}
		try {
			navigator.camera.cleanup(onSuccess, onFail);
		} catch (e) {
			sap.m.MessageBox.show("Cordova plugin is not available. ", sap.m.MessageBox.Icon.INFORMATION,"Cleanup");
		}

	},
	ViewCodeSample: function(oEvent) {
	   // var bReplace = jQuery.device.is.phone ? false : true;
        this.getRouter().navTo("viewcode", {
            from: "camera",
            entity:"ViewCode",
            code:"Camera"
        },true);
   	}
});
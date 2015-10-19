jQuery.sap.require("sap.m.MessageBox");

sap.ui.core.mvc.Controller.extend("CordovaKapselSample.view.BarcodeScanner", {


	onInit: function(){
        
		this._oView = this.getView();
		this._oRouter = this.getRouter();
		this.getRouter().attachRouteMatched(function(oEvent) {}, this);
	},
	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},
    navBack:function(){
        this.getRouter().myNavBack("main");
    },

    onScan:function(oEvent){
        try {
        cordova.plugins.barcodeScanner.scan( function (result) {
                  sap.m.MessageBox.show("Barcode scanning result:\n" +
                  "Result: " + result.text + "\n" +
                  "Format: " + result.format + "\n" +
                  "Cancelled: " + result.cancelled+"\n","");
                  }, function (error) {
                     sap.m.MessageBox.show("Barcode scanning failed: ", error,"");
                  } );
        }
        catch (e) {
            
            sap.m.MessageToast.show("Cordova plugin is not available.");
        }
        
    },
    onEncode:function(oEvent){
        	this.getRouter().navTo("generateqrcode", {
			from: "barcodescanner",
			entity: "feature/GenerateQRCode"
		},true);
    },
    ViewCodeSample: function(oEvent) {
       
		this.getRouter().navTo("viewcode", {
			from: "barcodescanner",
			entity: "ViewCode",
			code: "BarcodeScanner"
		}, true);
	}

});
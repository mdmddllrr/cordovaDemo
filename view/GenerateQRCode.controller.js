jQuery.sap.require("sap.m.MessageBox");
sap.ui.core.mvc.Controller.extend("CordovaKapselSample.view.GenerateQRCode", {

	onInit: function() {
		this.getRouter().attachRouteMatched(function(oEvent) {}, this);
		this.getView().byId("freeTextFrm").setVisible(true);
		this.getView().byId("emailFrm").setVisible(false);
		this.getView().byId("smsFrm").setVisible(false);
	},
	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},
	navBack: function(oEvent) {
		this.getRouter().myNavBack("barcodescanner");
	},
	onRBSelected: function(oEvent) {
		var selected = oEvent.getSource().getSelectedButton().getText();

		switch (selected) {
			case "Text":
				this.getView().byId("freeTextFrm").setVisible(true);
				this.getView().byId("emailFrm").setVisible(false);
				this.getView().byId("smsFrm").setVisible(false);
				break;
			case "Email":
				this.getView().byId("freeTextFrm").setVisible(false);
				this.getView().byId("emailFrm").setVisible(true);
				this.getView().byId("smsFrm").setVisible(false);
				break;
			case "SMS":
				this.getView().byId("freeTextFrm").setVisible(false);
				this.getView().byId("emailFrm").setVisible(false);
				this.getView().byId("smsFrm").setVisible(true);
				break;
		}

	},
	onGenerate: function(oEvent) {
		var selected = this.getView().byId("rbGroup").getSelectedButton().getText();
		var msg = "";
		var qrcode = this.getView().byId("qrcode");
		switch (selected) {
			case "Text":
				msg = this.getView().byId("txtFreeContent").getValue();
				try {
					cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, msg,
						function(success) {
							qrcode.setText(JSON.stringify(success));
						}, function(fail) {
							sap.m.MessageBox.show("encoding failed: " + fail, "");
						});
				} catch (e) {

					sap.m.MessageToast.show("Cordova plugin is not available.");
				}

				break;
			case "Email":
				msg = "mailto:" + this.getView().byId("email").getValue();
				msg += "?subject=" + this.getView().byId("emailsub").getValue();
				msg += "&body=" + this.getView().byId("emailmsg").getValue();
				try {
					cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.EMAIL_TYPE, msg,
						function(success) {
							qrcode.setText(JSON.stringify(success));
						}, function(fail) {
							sap.m.MessageBox.show("encoding failed: " + fail, "");
						});
				} catch (e) {

					sap.m.MessageToast.show("Cordova plugin is not available.");
				}
				break;
			case "SMS":
				msg = "SMSTO:" + this.getView().byId("smsphone").getValue();
				msg += ":" + this.getView().byId("smsmsg").getValue();
				try {
					cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.SMS_TYPE, msg,
						function(success) {
							qrcode.setText(JSON.stringify(success));
						}, function(fail) {
							sap.m.MessageBox.show("encoding failed: " + fail, "");
						});
				} catch (e) {
				
					sap.m.MessageToast.show("Cordova plugin is not available.");
				}
				break;

		}

	}

});
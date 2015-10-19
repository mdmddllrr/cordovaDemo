jQuery.sap.require("sap.m.MessageBox");

sap.ui.core.mvc.Controller.extend("CordovaKapselSample.view.Contacts", {

	onInit: function() {

// 		this._oView = this.getView();
// 		this._oComponent = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this._oView));
// 		this._oRouter = this._oComponent.getRouter();
		this._oRouter = this.getRouter();
		 this.getRouter().attachRouteMatched(function(oEvent){
        },this);
	},
	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},
	navBack: function(oEvent) {
	 this.getRouter().myNavBack("main");
	},

	/**** Read Contacts  ****/
	readContacts: function(oEvent) {
		var that = this;

		try {
			var options = new ContactFindOptions();
			var fields = ["displayName", "name"];
			navigator.contacts.find(fields, function(data) {
				that.ReadContactSuccess.call(that, data)
			}, that.ReadContactError);
		} catch (e) {
			sap.m.MessageBox.show("Cordova plugin is not available.", sap.m.MessageBox.Icon.INFORMATION, "Read Contacts");
		}

	},

	ReadContactSuccess: function(data) {
		this.byId("listContact").destroyItems();
		var contactList = {};
		var contact = new Array();

		if (data.length > 0) {
			for (var i = 0; i < data.length; i++) {
				var obj = new Object();
				obj.displayName = data[i].name.givenName + " " + data[i].name.familyName;
				if (data[i].phoneNumbers) obj.phoneNumber = data[i].phoneNumbers[0].value;
				//obj.phoneNumber = data[i].phoneNumbers[0].value;
				contact.push(obj);
			}
		}
		contactList.contacts = contact;
		var model = new sap.ui.model.json.JSONModel(contactList);
		this.getView().setModel(model, "data");

	},
	ReadContactError: function(err) {
		sap.m.MessageBox.show(JSON.stringify(err), sap.m.MessageBox.Icon.ERROR, "Read Contact");
	},

	/**** Add Contact ****/
	newContact: function(oEvent) {
		this.getRouter().navTo("newcontact", {
			from: "contacts",
			entity: "feature/ContactAdd"
		},true);
	},

	/**** Pick Contact ****/
	pickContacts: function(oEvent) {
		var that = this;
		try {
			navigator.contacts.pickContact(function(contact) {
				var contactList = {};
				var obj = new Object();
				var list = new Array();
				obj.displayName = contact.name.givenName;
				if (contact.phoneNumbers) obj.phoneNumber = contact.phoneNumbers[0].value;
				//obj.phoneNumber = contact.phoneNumbers[0].value;
				list.push(obj);
				contactList.contacts = list;
				var model = new sap.ui.model.json.JSONModel(contactList);
				that.getView().setModel(model, "data");

			}, function(err) {
				sap.m.MessageBox.show("Error: " + err, "");
			});
		} catch (e) {
			sap.m.MessageBox.show("Cordova plugin is not available.", sap.m.MessageBox.Icon.INFORMATION, "Pick Contact");
		}
	},

	deleteContact: function() {
		try {
			navigator.contacts.pickContact(function(contact) {
				function onSuccess() {
					sap.m.MessageBox.show("Removal Success", "");
				}

				function onError(contactError) {
					sap.m.MessageBox.show("Error = " + contactError.code, "");
				}

				// remove the contact from the device
				contact.remove(onSuccess, onError);
			}, function(err) {
				sap.m.MessageBox.show("Error: " + err, "");
			});
		} catch (e) {
			sap.m.MessageBox.show("Cordova plugin is not available.", "");
		}
	},

	reset: function(oEvent) {
		this.byId("listContact").destroyItems();
	},
	ViewCodeSample: function(oEvent) {
		 
        this.getRouter().navTo("viewcode", {
            from: "contacts",
            entity:"ViewCode",
            code:"Contacts"
        },true);
	}
});
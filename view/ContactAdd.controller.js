jQuery.sap.require("sap.m.MessageBox");

sap.ui.core.mvc.Controller.extend("CordovaKapselSample.view.ContactAdd", {

	onInit: function() {
       this.getRouter().attachRouteMatched(this.onRouteMatched,this);
        
	},
	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},
    onRouteMatched:function(evt){
        this.getView().byId("firstname").setValue("");
        this.getView().byId("lastname").setValue("");
        this.getView().byId("phone").setValue("");
        this.getView().byId("email").setValue("");
        this.getView().byId("web").setValue("");
        
    },
    
    navBack:function(evt){
       this.getRouter().myNavBack("contacts");
    },
    
	saveContact:function(evt){
	    var firstname = this.getView().byId("firstname").getValue();
	    var lastname = this.getView().byId("lastname").getValue();
	    var phone = this.getView().byId("phone").getValue();
	    var email = this.getView().byId("email").getValue();
	    var web = this.getView().byId("web").getValue();
	   
        try {
            var contact = navigator.contacts.create();
            var name = new ContactName();
            name.givenName=firstname;
            name.familyName=lastname;
            contact.name = name;
            var phoneNumbers = [];
            var emails = [];
            var urls = [];
            phoneNumbers[0] = new ContactField("work", phone, true);
            emails[0] = new ContactField("email", email, false);
            urls[0] = new ContactField("url",web,false);
            contact.phoneNumbers = phoneNumbers;
            contact.emails = emails;
            contact.urls = urls;
            contact.save();
            sap.m.MessageBox.show("Successfully saved into Device/Simulator Contacts List ",sap.m.MessageBox.Icon.SUCCESS,"Add Contact");
            this.getRouter().myNavBack("contacts");
        }
        catch (e){
            sap.m.MessageBox.show("Cordova plugin is not available.","");
        }
        
	}

});
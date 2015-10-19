jQuery.sap.require("sap.m.MessageBox");
sap.ui.core.mvc.Controller.extend("CordovaKapselSample.view.ViewCode", {

	onInit: function() {
		var view = this.getView();
		var name;
    	this.getRouter().attachRouteMatched(this.onRouteMatched, this);
       
	},
	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},
	onRouteMatched: function(oEvent) {
		var that = this;
		var oParameters = oEvent.getParameters();
	
		var pluginName = oParameters.arguments.code;
		if(pluginName == undefined){
		    return;
		}
		name = pluginName.toLowerCase();
	    var full_path;
	    
	    var app_path = window.location.pathname;
	    if(app_path.indexOf("FioriLaunchpad") == -1){
	        full_path = window.location.protocol+"//"+window.location.hostname+"/";
	    }
	    else {
	        full_path = window.location.protocol+"//"+window.location.hostname+"/sap/fiori/cordovakapselsample/";
	    }
	   
	   // var full_path = window.location.protocol+"//"+window.location.hostname+"/";
	    
        var targetController = full_path+"view/" + pluginName + ".controller.js";
       
		var data = {
			title: "Code: " + pluginName
		};
		
		var targetView = full_path+"view/" + pluginName + ".view.xml";
		
		jQuery.ajax(targetView, {
			async: false,
			dataType: "text",
			error: function(jqXHR, status, error) {
				jQuery.sap.log.info(status + ", " + error + ", " + targetView);
				data.showView = false;
			},
			success: function(result) {
				data.selectedTab = "view";
				data.showView = true;
				data.viewCodeRaw = result;
				data.viewCode = that._convertCodeToHtml(result);
			}
		});
		jQuery.ajax(targetController, {
			async: false,
			dataType: "text",
			error: function(jqXHR, status, error) {
				jQuery.sap.log.info("no file found for: " + targetController);
				data.showController = false;
			},
			success: function(result) {
				data.selectedTab = "controller";
				data.showController = true;
				data.controllerCodeRaw = result;
				data.controllerCode = that._convertCodeToHtml(result);
			}
		});
		// set model
		var newModel = new sap.ui.model.json.JSONModel(data);
		that.getView().setModel(newModel);

	},
	/**
	 *
	 */
	_convertCodeToHtml: function(code) {

		jQuery.sap.require("jquery.sap.encoder");
		code = code.toString();

		// Get rid of function around code
		code = code.replace(/^function.+{/, "");
		code = code.replace(/}[!}]*$/, "");

		// Get rid of unwanted code if CODESNIP tags are used
		code = code.replace(/^[\n\s\S]*\/\/\s*CODESNIP_START\n/, "");
		code = code.replace(/\/\/\s*CODESNIP_END[\n\s\S]*$/, "");

		// Improve indentation for display
		code = code.replace(/\t/g, "  ");

		return '<pre><code>' + jQuery.sap.encodeHTML(code) + '</code></pre>';
	},
	onNavBack: function() {
		this.getRouter().myNavBack(name);
	}

});
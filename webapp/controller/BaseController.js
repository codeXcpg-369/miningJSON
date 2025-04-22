sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";

    return Controller.extend("app.miningdetailsb27.controller.BaseController", {
        onInit() {
        },
        getModel:function(model){
            return this.getView().getModel(model);
        }



    });
});
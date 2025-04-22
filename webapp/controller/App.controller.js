sap.ui.define([
  "./BaseController",
   "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
  "use strict";

  return Controller.extend("app.miningdetailsb27.controller.App", {
      onInit() {
        let oModel = new JSONModel("/model/mockData/miningsData.json");
        this.getView().setModel(oModel, "miningsModel");
      }
  });
});
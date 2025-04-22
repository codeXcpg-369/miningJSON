sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseController, JSONModel, Fragment, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("app.miningdetailsb27.controller.DetailView", {
        onInit: function () {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },

        onRouteMatched: function (oEvent) {
            let index = oEvent.getParameter("arguments").index;
            let sPath = "miningsModel>/miningData/" + index;
            let oView = this.getView();
            oView.bindElement(sPath);
        },

        
        onConfirmSupp: function (oEvent) {
            let oSelectedItem = oEvent.getParameter("selectedItem");
            let sValue = oSelectedItem.getProperty("info");
            let oInput = sap.ui.getCore().byId(this.inputFieldId);
            oInput.setValue(sValue);
        },
        onF4Help: function (oEvent) {
            this.inputFieldId = oEvent.getSource().getId();
            // console.log("Input Field ID:", this.inputFieldId);

            let oModel = this.getView().getModel("miningsModel");
            let aData = oModel.getProperty("/supplierSet");
            let deepCopy = JSON.parse(JSON.stringify(aData));
            let oModelFrag = new JSONModel({ newSuppSet: deepCopy });

            if (!this.oDialog) {
                Fragment.load({
                    fragmentName: "app.miningdetailsb27.fragments.popUp",
                    controller: this
                }).then((dialog) => {
                    this.oDialog = dialog;
                    this.getView().addDependent(this.oDialog);
                    this.getView().setModel(oModelFrag, "FragmentModel");
                    this.oDialog.open();
                    // console.log("Dialog opned.");
                }).catch((error) => {
                    // console.error("Error loading fragment:", error);
                });
            } else {
                this.oDialog.open();
                // console.log("Dialog opened.");
            }
        },
        onFilter: function () {
            let aFilter = [];
            let sName = this.getView().byId("idInptSupp").getValue();
            let sMine = this.getView().byId("idInptMineType").getValue();
            if (sName) {
                let filterName = new Filter("supplier_name", FilterOperator.Contains, sName);
                aFilter.push(filterName);
            }
            if (sMine) {
                let filterName = new Filter("mineral_type", FilterOperator.Contains, sMine);
                aFilter.push(filterName);
            }
            let oTable = this.getView().byId("idMTable");
            if (!oTable) {
                return;
            }
            let bindingInfo = oTable.getBinding("items");
            if (!bindingInfo) {
                return;
            }
            bindingInfo.filter(aFilter);
        },


        onListView: function () {
            let oRouter2 = this.getOwnerComponent().getRouter();
            oRouter2.navTo("RouteMasterView");
        }
    });
});






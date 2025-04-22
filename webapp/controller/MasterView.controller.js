sap.ui.define([
"./BaseController", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/Sorter"
], (Controller, Filter, FilterOperator, Sorter) => {
    "use strict";

    return Controller.extend("app.miningdetailsb27.controller.MasterView", {
        onInit() {  
        },
        onDetailView: function () {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetail");
        },
        onSort: function () {
            //for first time, it is undefined
            if (!this.bDescending) {
                this.bDescending = false;
            }
            let oSorter = new sap.ui.model.Sorter("mine_name", this.bDescending);
            let oList = this.getView().byId("toolList");
            let oBinding = oList.getBinding("items");
            oBinding.sort(oSorter);
            this.bDescending = !this.bDescending;

        },
        onSearch: function (oEvent) {
            let searchString = oEvent.getParameter("query") || oEvent.getParameter("newValue");
            let oName = new Filter("mine_name", FilterOperator.Contains, searchString);
            let oAvail = new Filter("operational_status", FilterOperator.Contains, searchString);
            let aFilter = [oName, oAvail];
            let MainFilter = new Filter({
                filters: aFilter,
                and: false
            });
            let oList = this.getView().byId("toolList");
            let oBinding = oList.getBinding("items");
            oBinding.filter(MainFilter);

        },
        onItemSelect: function (oEvent) {
            let oList = oEvent.getParameter("listItem");
            let sPath = oList.getBindingContextPath();
            let aItems = sPath.split("/");
            let id = aItems[aItems.length - 1];
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetail", {
                index: id
            })
        },
        
    });
});
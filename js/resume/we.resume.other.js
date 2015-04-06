;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.Other";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        initialize: function (options) {
        	this.type = options.type;

        	this.render();
        	this.initEvents();
        },

        initEvents: function () {

        },

        render: function () {

        	this.ui = {};
        	this.ui.wrap = $("#other-resume");
        	this.ui.doubleTable = $("#double-table");
        	this.ui.singleTable = $("#single-table");
        	this.ui.doubleLeft =  this.ui.doubleTable.find(".left-box");
        	this.ui.doubleRight =  this.ui.doubleTable.find(".right-box");
        	this.ui.singleLeft =  this.ui.doubleTable.find(".left-box");
        	this.ui.singleRight =  this.ui.doubleTable.find(".right-box");
        },

        add: function (dom) {
        	this.ui.wrap.show();
        	this.ui.doubleRight.append(dom);
        },

        remove: function (id) {
        	this.ui.wrap.find(id).remove();
        }

    }));
})(WE, jQuery, Backbone);
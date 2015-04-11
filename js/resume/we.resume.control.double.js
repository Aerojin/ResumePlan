;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.Control.Double";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        initialize: function (options) {

        	this.isRemove = options.isRemove;
        	this.master = options.master;
        	this.container = options.container;
        	
        	this.render();
        	this.setHeight();
        	this.initEvents();
        },

        initEvents: function () {

        },

        render: function () {
        	this.ui = {};
        	this.ui.wrap = this.container;
        	this.ui.left = this.ui.wrap.find("#resume-left");
            this.ui.right = this.ui.wrap.find("#resume-right");
            this.ui.main = this.ui.wrap.find("#resume-main");
            this.ui.header = this.ui.wrap.find("#resume-header");
            this.ui.body = this.ui.wrap.find("#resume-body");
            this.ui.base = this.ui.wrap.find("#resume-base");
            this.ui.education = this.ui.wrap.find("#resume-education");

        },

        append: function (data) {
            if(data.add){
                this.ui.left.append(data.element);

                if(this.runHeight(this.ui.left)){
                    data.element.appendTo(this.ui.right);
                }

                this.remove();
            }
        },

        before: function (data, dom, key) {
            if(!data.show){
                return;
            }

            if(!data.add){
                dom.remove();
                return;
            }

            if(dom.length == 0){
                this.append(data);
                return;
            }

            dom.before(data.element).remove();

            if(key == "base"){
                this.ui.header.find("img").attr({src: data.data.i_photo});
            }

            this.remove();
        },

        runHeight: function (dom) {
        	var height = 0;
            var infoBox = dom.find(".resume-box");

            $.each(infoBox, function () {
                height += $(this).outerHeight(true);
            });

            return height > this.maxHeight;
        },

         setHeight: function () {
            var height = this.master.container.height();
            var header = this.ui.header.outerHeight(true);
            var margin = this.ui.body.outerHeight(true) - this.ui.body.outerHeight();

            this.maxHeight = height - header - margin;
        },
        remove: function () {
        	if(this.runHeight(this.ui.left) && this.isRemove){
             	this.ui.left.find(".resume-box").eq(-1).remove();
             	this.remove();
             	return;
            }

            if(this.runHeight(this.ui.right) && this.isRemove){
             	this.ui.right.find(".resume-box").eq(-1).remove();
             	this.remove();
            }
        }

    }));
})(WE, jQuery, Backbone);
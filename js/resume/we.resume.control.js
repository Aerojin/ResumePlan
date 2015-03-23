;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.Control.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        initialize: function (options) {
            
            this.template = options.template;
            this.container = options.container;
            this.instance = WE.Resume.getInstance();

            this.render();
            this.initEvents();
        },

        initEvents: function () {

        },

        render: function () {
            var template  = _.template(this.getID("wrap"));
                template = template(this.getBase());

            this.ui = {};
            this.ui.wrap = $(template);
            this.ui.left = this.ui.wrap.find("#resume-left");
            this.ui.right = this.ui.wrap.find("#resume-right");
            this.ui.main = this.ui.wrap.find("#resume-main");
            this.ui.header = this.ui.wrap.find("#resume-header");
            this.ui.body = this.ui.wrap.find("#resume-body");
            this.ui.base = this.ui.wrap.find("#resume-base");
            this.ui.education = this.ui.wrap.find("#resume-education");



            this.container.empty().append(this.ui.wrap);

            this.setHeight();
            this.renderModule();
        },

        getBase: function () {
            var data = {};


            data.base = this.instance.getData("base");
            data.education = this.instance.getData("education");

            return data;
        },

        renderModule: function (){
            var module = this.instance.getModule();
            var len = module.length;

            for(var i =0; i < len; i++){
                var key = module[i];
                if(key == "base" || key == "education"){
                    continue;
                }

                var temp = _.template(this.getID(key));
                var data = this.instance.getData(key);

                if(key == "evaluation" || key == "hobbies"){
                    data = data[0];
                    temp = $(temp(data));
                }else{
                    temp = $(temp({data: data}));
                }
                    

                this.ui.left.append(temp);

                if(this.runHeight()){
                    temp.appendTo(this.ui.right);
                }
            }
        },

        getElement: function () {

        },

        getID: function (id) {
            if(!this.tmpl){
               this.tmpl = $(this.template); 
            }



            return this.tmpl.find("#resume-" + id).text();
        },

        replace: function (str) {
            return str.replace(new RegExp("{{","gi"), "<").replace(new RegExp("}}","gi"), ">");
        },

        setHeight: function () {
            var height = this.container.height();
            var header = this.ui.header.outerHeight(true);
            var margin = this.ui.body.outerHeight(true) - this.ui.body.outerHeight();

            this.maxHeight = height - header - margin;
        },

        runHeight: function () {
            var height = 0;
            var infoBox = this.ui.left.find(".infoBox");

            $.each(infoBox, function () {
                height += $(this).outerHeight(true);
            });

            return height > this.maxHeight;
        }

    }));


})(WE, jQuery, Backbone);
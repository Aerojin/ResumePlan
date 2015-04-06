;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.Control.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,


        initialize: function (options) {
            
            this.notDrag = options.notDrag || false;
            this.template = options.template;
            this.instance = options.instance;
            this.container = options.container;

            this.other = new WE.Resume.Other({
                type: options.type
            });

            this.render();
            this.initEvents();
            this.initPageEvent();
        },

        initEvents: function () {
            var _this = this;

            this.instance.on("change:show", function (args) {
                var id = _this.getID(args.key);

                if(args.value){
                    _this.append(args.key);
                    return;
                }

                _this.container.find(id).remove();
            });

            this.instance.on("change:ui", function (args) {
                _this.before(args)
            });
        },

        initPageEvent: function () {
            var _this = this;

            this.container.delegate(".infoBox", "mouseenter", function () {
                $(this).addClass('hover');
            });

            this.container.delegate(".infoBox", "mouseleave", function () {
                $(this).removeClass('hover');
            });
        },

        render: function () {
            var template  = _.template(this.getModuleTemp("wrap"));
                template = template(this.getDefault());

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

        getDefault: function () {
            var data = {};
            this.defaults = this.instance.getDefaultModule();

            for(var i = 0; i < this.defaults.length; i++){
                var key = this.defaults[i];
                data[key] = this.instance.getData(key);
            }

            return data;
        },

        renderModule: function (){
            var array = this.getBySort();
            var len = array.length;

            for(var i =0; i < len; i++){
                var obj = array[i];

                if(obj){
                    var key = obj.key;

                    if(_.indexOf(this.defaults, key) > -1 || !obj.show){
                        continue;
                    }
                    
                    this.append(key);
                }
            }
        },

        append: function (key) {
            var data = this.getElement(key);

            if(data.add){
                this.ui.left.append(data.element);

                if(this.runLeft()){
                    data.element.appendTo(this.ui.right);
                }

                if(this.runRight()){
                    this.other.add(data.element);
                }

                this.appendDrag(key, data.element);
            }
        },

        getElement: function (key) {
            var args = {};
            var data = this.instance.getData(key)
            var config = this.instance.getModuleByKey(key);
            var temp = _.template(this.getModuleTemp(key));

            args.data = data;
            args.show = config.show;
            args.add = !_.isEmpty(data);
            args.element = args.add ? $(temp({data: data})) : "";

            if(args.add){
                args.element.data({key: key});
            }

            return args;
        },

        before: function (args) {
            var data = this.getElement(args.key);
            var dom = $(this.getID(args.key));

            if(!data.show){
                return;
            }

            if(!data.add){
                dom.remove();
                return;
            }

            if(dom.length == 0){
                this.append(args.key);
                return;
            }

            dom.before(data.element).remove();
            this.appendDrag(args.key, data.element);

            if(args.key == "base"){
                this.ui.header.find("img").attr({src: data.data.i_photo});
            }
        },

        getModuleTemp: function (id) {
             if(!this.tmpl){
               this.tmpl = $(this.template); 
            }

            return this.tmpl.find(this.getID(id)).text();
        },

        getID: function (id) {
            return "#resume-" + id;
        },

        setHeight: function () {
            var height = this.container.height();
            var header = this.ui.header.outerHeight(true);
            var margin = this.ui.body.outerHeight(true) - this.ui.body.outerHeight();

            this.maxHeight = height - header - margin;
        },

        runLeft: function () {
            var height = 0;
            var infoBox = this.ui.left.find(".infoBox");

            $.each(infoBox, function () {
                height += $(this).outerHeight(true);
            });

            return height > this.maxHeight;
        },

        runRight: function () {
            var height = 0;
            var infoBox = this.ui.right.find(".infoBox");

            $.each(infoBox, function () {
                height += $(this).outerHeight(true);
            });

            return height > this.maxHeight;
        },

        getBySort: function () {
            var array = [];
            var data = this.instance.getModule();

            for(var key in data){
                array[data[key].sort] = $.extend({key: key}, data[key]);
            }

            return array;
        },

        appendDrag: function (key, element) {
            var _this = this;
            var newId = this.getID(key);
            var config = this.instance.getModuleByKey(key);

            if(!this.drag){
                this.drag = {};
            }

            if(!config.drag || this.notDrag){
                return;
            }

            element.addClass("dragDiv");

            this.drag[key] = new WE.Drag({
                dragClass: ".dragDiv",
                dragTable: $("#dragTable"),
                dragElement: $(newId),
                moveElement: $(newId),
                onMouseUp: function (element) {
                    element.css({cursor: "default"});
                    element.removeClass("focus");
                    _this.instance.setSort(_this.getModuleSort());
                },
                onMouseDown: function (element) {
                    element.css({cursor: "move"});
                    element.addClass("focus").removeClass("hover");
                }
            });
        },
        getModuleSort: function () {
            var array = [];
            var element = this.ui.wrap.find(".infoBox");

            _.each(element, function (e) {
                array.push($(e).data("key"));
            });

            return array;
        }

    }));


})(WE, jQuery, Backbone);
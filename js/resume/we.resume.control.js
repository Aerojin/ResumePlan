;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.Control.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        initialize: function (options) {
            
            this.template = options.template;
            this.instance = options.instance;
            this.container = options.container;

            this.defaults = ["base", "education"];

            this.render();
            this.initEvents();
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
                var key = obj.key;

                if(_.indexOf(this.defaults, key) > -1 || !obj.show){
                    continue;
                }
                
                this.append(key);
            }
        },

        append: function (key) {
            var data = this.instance.getData(key);
            var temp = _.template(this.getModuleTemp(key));
                temp = $(temp({data: data}));

            this.ui.left.append(temp);

            if(this.runHeight()){
                temp.appendTo(this.ui.right);
            }

            this.appendDrag(key);
        },

        before: function (args) {
            var show = this.instance.getShow(args.key)

            if(!show){
                return;
            }

            var dom = $(this.getID(args.key));
            var temp = _.template(this.getModuleTemp(args.key));
                temp = $(temp({data: args.data}));

            dom.before(temp).remove();
            this.appendDrag(args.key);
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

        runHeight: function () {
            var height = 0;
            var infoBox = this.ui.left.find(".infoBox");

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

        appendDrag: function (key) {
            var newId = this.getID(key);

            if(!this.drag){
                this.drag = {};
            }

            this.drag[key] = new WE.Drag({
                dragClass: ".dragDiv",
                dragTable: $("#dragTable"),
                dragElement: $(newId),
                moveElement: $(newId),
                onMouseUp: function (element) {
                    element.css({cursor: "default"});
                    element.removeClass("focus");
                },
                onMouseDown: function (element) {
                    element.css({cursor: "move"});
                    element.addClass("focus").removeClass("hover");
                }
            });
        }

    }));


})(WE, jQuery, Backbone);
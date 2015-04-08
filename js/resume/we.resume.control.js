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
            this.context = options.context;
            this.exceed = options.exceed;
            this.type = options.type;
            this.isRemove = !this.exceed;

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
                _this.runExceed();
                _this.action.remove();
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
            this.context.empty().append(this.ui.wrap);
            
            switch(this.type){
                case "0":
                    this.action =  new WE.Resume.Control.Single({
                        master: this,
                        isRemove: this.isRemove,
                        container: this.context
                    });
                    break;
                case "1":
                    this.action =  new WE.Resume.Control.Double({
                        master: this,
                        isRemove: this.isRemove,
                        container: this.context
                    });
                    break;
            }

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
                this.action.append(data);
                this.appendDrag(key, data.element);
                this.runExceed();
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

            this.action.before(data, dom, args.key);
            this.appendDrag(args.key, data.element);
            this.runExceed();
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
                    _this.runExceed();
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
        },

        runExceed: function () {
            if(this.exceed){
                var top = 1170;
                var height = this.container.outerHeight(true);
                    height = height - top;

                if(height <= 0){
                    this.exceed.hide();    
                }else{
                    this.exceed.show().css({top: top});
                }
            }
        }

    }));


})(WE, jQuery, Backbone);
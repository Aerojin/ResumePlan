;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Selected.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: "",

        initialize: function (options) {
            this.model = options.model;

            this.render();
            this.initEvents();
        },

        initEvents: function () {
            var _this = this;

            this.ui.btnWhite.click(function () {
                _this.showWhite();
            });

            this.ui.document.scroll(function () {
                var scrollTop = $(this).scrollTop();
                var offset = _this.ui.menu.offset();

                if(scrollTop > offset.top){
                    _this.ui.menuMini.show();
                }else{
                    _this.ui.menuMini.hide();
                }
            });
        },

        render: function () {

            this.ui = {};
            this.ui.body = $("body");
            this.ui.main = $("#main");
            this.ui.menu = $("#menu");
            this.ui.menuMini = $("#menu-mini");
            this.ui.document = $(document);
            this.ui.btnWhite = $("#btn-white");
            this.ui.whiteTmpl = $("#white-tmpl");
            this.ui.divDouble = $("#div-double");
            this.ui.divSingle = $("#div-single");

            this.ui.divDouble.empty();
            this.ui.divSingle.empty();

            this.loadSingle();
            this.loadDouble();
        },
        showWhite: function () {
            var template = _.template(this.ui.whiteTmpl.html());
                template = template({cid: this.cid});

            var ui = {};
                ui.wrap = $(template);
                ui.back = this.getCidEl("back", ui.wrap);
                ui.close = this.getCidEl("close", ui.wrap);

            ui.back.click(function () {
                ui.wrap.remove();
            });

            ui.close.click(function () {
               ui.wrap.remove(); 
            });

            this.ui.body.append(ui.wrap);
        },
        loadSingle: function () {
            var data = this.model.getSingle();

            for(var i = 0; i < data.length; i++){
                var item = new WE.Template.Main(data[i]);

                this.ui.divSingle.append(item.getElement());
            }


        },
        loadDouble: function () {
            var data = this.model.getDouble();

            for(var i = 0; i < data.length; i++){
                var item = new WE.Template.Main(data[i]);

                this.ui.divDouble.append(item.getElement());
            }
        }

    }));

    var model = new WE.Selected.Model();
    var view = new WE.Selected.View({model: model});

})(WE, jQuery, Backbone);
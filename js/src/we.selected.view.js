;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Selected.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: "",

        ELEMENT: {
            WIDTH: 270,
            HEIGHT: 515
        },

        initialize: function (options) {
            this.model = options.model;

            this.initEvents();
            this.render();
            this.initPageEvents();
        },

        initEvents: function () {
            this.model.on("change:pageIndex", function () {
                _this.loadData();
            });

            this.model.on("change:data", function () {
                _this.append();
            });
        },

        initPageEvents: function () {
            var _this = this;
            var offset = _this.ui.menu.offset();

            this.ui.btnWhite.click(function () {
                _this.showWhite();
            });

            this.ui.btnSearch.click(function () {
                var type = $(this).data("type");
                var money = $(this).data("money");

                _this.model.set({
                    type: type,
                    money: money,
                    pageIndex: 1
                });
            });

            this.ui.document.scroll(function () {
                _this.scroll();
            });

            this.ui.document.scroll(function () {
                var scrollTop = $(this).scrollTop();

                if(scrollTop > offset.top){
                    _this.ui.menu.hide();
                    _this.ui.menuMini.show();
                }else{
                    _this.ui.menu.show();
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
            this.ui.wrap = $("#wrap");
            this.ui.btnSearch = this.ui.main.find(".btn-search");

            //this.ui.wrap.empty();

            //this.loadSingle();
            //this.loadDouble();


            //每页显示多少个需要根据屏幕的大小进行设置,
            //第一页必须出现滚动条, 才会触发滚动事件
            /*
            var width = $(window).width();
            var height = $(window).height();            
            var cloumn = Math.floor(width / this.ELEMENT.WIDTH);
            var rows = Math.ceil(height / this.ELEMENT.HEIGHT);            
            var pageSize = rows * cloumn;
                        
            this.model.set({pageSize: pageSize});*/
            this.model.set({pageIndex: 1});
        },
        showWhite: function () {
            var _this = this;
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
        append: function () {
             var data = this.model.get("data");

            for(var i = 0; i < data.length; i++){
                var item = new WE.Template.Main(data[i]);

                this.ui.wrap.append(item.getElement());
            }

            this.isLoading = false;

            setTimeout(function () {
                _this.scroll();
            }, 1000);
        },
        loadData: function () {
            var options = {};

            options.data = {
                type: this.model.get("type"),
                is_money: this.model.get("money"),
                pageIndex: this.model.get("pageIndex"),
                pageSize: this.model.get("pageSize")
            };

            options.success = function (result) {
                this.model.set({
                    pageCount: result.data.pageCount,
                    data: this.model.parse(result.data.list)
                },{silent:true});

                this.model.trigger("change:data");
            };

            options.error = function (result) {
                this.model.trigger("change:pageIndex");
            };

            WE.Api.getTempList(options, this);
        },
        scroll: function () {
            var box = this.ui.wrap.find('li').eq(-1);
            var pageIndex = this.model.get("pageIndex");
            var pageCount = this.model.get("pageCount");

            if(this.isLoading || !box){
                return;
            }
            
            var documentH = this.ui.document.scrollTop() + $(window).height();
            var lastPinHeight = Math.floor(box.height() / 2) + box.height();
                lastPinHeight += box.offset() ? box.offset().top : 0;
                
            if(documentH > lastPinHeight && pageIndex + 1 <= pageCount){
                this.isLoading = true;
                this.model.set({pageIndex: pageIndex + 1});
            }
        },
        loadSingle: function () {
            var data = this.model.getSingle();

            for(var i = 0; i < data.length; i++){
                var item = new WE.Template.Main(data[i]);

                this.ui.wrap.append(item.getElement());
            }
        }
    }));

    var model = new WE.Selected.Model();
    var view = new WE.Selected.View({model: model});

})(WE, jQuery, Backbone);
;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: "",

        initialize: function (options) {
            this.model = options.model;
            this.constant = options.constant;

            this.render();
            this.initEvents();

            this.initZoom();
            this.initDrog();
            this.initSlideShow();
        },

        initEvents: function () {
            var _this = this;
            var ui = this.ui;

            this.constant.on("change", function () {
                _this.setItem(this.getChanged());
            });

            ui.infoBox.hover(function() {
                $(this).addClass('hover');
            }, function() {
                $(this).removeClass('hover');
            });

            ui.infoBox.mousedown(function () {
                $(this).addClass("focus").removeClass("hover");
            });

            ui.infoBox.mouseup(function () {
                $(this).removeClass("focus");
            });

        },

        render: function () {
            this.ui = {};
            this.ui.main = $("#main");
            this.ui.wrapSlide = $("#wrap-slide");
            this.ui.btnLeft = $("#btn-left");
            this.ui.btnRight = $("#btn-right");
            this.ui.btnAdd = $("#btn-add");
            this.ui.btnCut = $("#btn-cut");
            this.ui.resume = $("#resume");
            this.ui.span = $("#span-text");

            this.ui.infoBox = $(".infoBox");
        },

        initSlideShow: function () {
            var options = {
                prev: this.ui.btnLeft,
                next: this.ui.btnRight,
                pageSize: 1,
                range: 157,
                parentElements: this.ui.wrapSlide,
                data: this.model.getTemplate()
            };


            this.slideShow = new WE.Resume.SlidesShow(options);

            this.slideShow.onChange = function (index) {

            };
        },

        initZoom: function () {
            this.zoom = new WE.Resume.Zoom({
                add: this.ui.btnAdd,
                cut: this.ui.btnCut,
                span: this.ui.span,
                element: this.ui.resume
            });
        },

        initDrog: function () {
            var id = _.template("drag-<%-id%>");
            var array = ["base","education", "school", "work", "skill", "prize", "evaluation","research", "article", "subject", "hobbies"];

            for(var i = 0; i < array.length; i++){
                var newId = id({id: array[i]});

                new Drag(newId,newId);

                this.setItem({
                    key: array[i],
                    value: this.constant.getKey(array[i])
                });
            }
        },

        setItem: function (data) {
            var id = _.template("#drag-<%-id%>");
                id = id({id: data.key});

            if(data.value){
                $(id).show();    
            }else{
                $(id).hide();
            }
        }

    }));

    $(function () {
        var model = new WE.Resume.Model();
        var view = new WE.Resume.View({
            model: model,
            constant: WE.Resume.getConstant()
        });
    });


})(WE, jQuery, Backbone);
;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Common.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: "",

        initialize: function () {
            this.render();
            this.initEvents();
        },

        initEvents: function () {
            var _this = this;

            this.ui.btnWeixin.hover(function() {
                _this.ui.divWeixin.show();
            },function () {
                _this.ui.divWeixin.hide();
            });

            this.ui.btnUser.mouseenter(function () {
                if(_this.userTimer){
                    clearTimeout(_this.userTimer);
                }

                _this.ui.boxUser.show();
                $(this).addClass("focus");
            });

            this.ui.btnUser.mouseleave(function () {

                _this.userTimer = setTimeout(function () {
                    _this.ui.boxUser.hide();
                    _this.ui.btnUser.removeClass("focus");
                }, 300);
            });

            this.ui.boxUser.mouseenter(function () {
                if(_this.userTimer){
                    clearTimeout(_this.userTimer);
                }
                
                _this.ui.boxUser.show();
            });

            this.ui.boxUser.mouseleave(function () {
                _this.userTimer = setTimeout(function () {
                    _this.ui.boxUser.hide();
                }, 300);
            });

            if(this.ui.topHead.length > 0){
                $(window).scroll(function () {
                    var scrollTop = $(this).scrollTop();
                    var height = _this.ui.topHead.height();

                    if(scrollTop > height){
                        _this.ui.topHead.addClass("headerTopFixed");
                    }else{
                        _this.ui.topHead.removeClass("headerTopFixed");
                    } 
                });
            }
        },

        render: function () {
            this.ui = {};
            this.ui.btnSina = $("#btn-sina");
            this.ui.btnWeixin = $("#btn-weixin");
            this.ui.divWeixin = $("#div-weixin");
            this.ui.btnUser = $("#btn-user");
            this.ui.userPhoto = $("#user-photo");
            this.ui.userName = $("#user-name");
            this.ui.boxUser = $("#box-user");
            this.ui.topHead = $("#top-head");

            //设置新浪连接
            this.ui.btnSina.attr("href", this.getUrl());
        },
        getUrl: function () {
            return "http://weibo.com/p/1005053628584907/home?from=page_100505&mod=TAB#place";
        }

    }));

    $(function () {
        new WE.Common.View();
    });

})(WE, jQuery, Backbone);
;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.User.Center.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                date: new Date(),
                percent: 0
            };
        },

        TIPS: {
            CONFIRM_DELETE: "确定删除简历?",
            DELETE_SUCCESS: "删除成功!"
        },

        initialize: function () {

        },

        initEvents: function () {

        }

    }));


})(WE, jQuery, Backbone);


;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.User.Center.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: "",

        initialize: function (options) {
            this.model = options.model;
            
            this.initEvents();
            this.render();
            this.initPageEvents();
        },

        initEvents: function () {
            var _this= this;

            this.model.on("change:percent", function () {
                var percent = this.get("percent");

                _this.ui.lblPercent.text(percent + "%");
                _this.ui.spanPercent.css({width: percent + "%"});
            });

            this.model.on("change:date", function () {
                var date = this.get("date") || new Date();
                    //date = WE.Date.format("yyyy-MM-dd", date);
                
                _this.ui.spanTime.text("2015.02.12");
            });
        },

        initPageEvents: function () {
            var _this = this;

            this.ui.btnShare.click(function () {
                _this.openShare();
            });

            this.ui.hoverInfo.hover(function () {
                $(this).find(".ico-look").show();
                $(this).find(".ico-close").show();
            },function () {
                $(this).find(".ico-look").hide();
                $(this).find(".ico-close").hide();
            });

            this.ui.main.find(".ico-close").click(function () {
                 var $this = $(this);
                WE.UI.confirm(_this.model.TIPS.CONFIRM_DELETE,{
                    callback: function (bool) {
                         if(bool){
                            _this.ui.hoverNew.show(); 
                            _this.ui.divAction.hide();
                            _this.ui.divPercent.hide();
                            $this.closest(".hover-info").remove();
                            WE.UI.alert(_this.model.TIPS.DELETE_SUCCESS);
                         }
                    }
                })
            });

            this.ui.main.find(".ico-look").click(function () {

            });


            this.ui.otherMain.find(".ico-close").click(function () {
                var $this = $(this);

                WE.UI.confirm(_this.model.TIPS.CONFIRM_DELETE,{
                    callback: function (bool) {
                         if(bool){
                            $this.closest(".info-list").remove();
                            WE.UI.alert(_this.model.TIPS.DELETE_SUCCESS);
                         }
                    }
                })
            });

            this.ui.otherMain.find(".ico-look").click(function () {

            });
            

        },

        render: function () {
            
            this.ui = {};
            this.ui.body = $("body");
            this.ui.main = $("#main");
            this.ui.btnShare = this.ui.main.find("#btn-share");
            this.ui.spanTime = this.ui.main.find("#span-time");
            this.ui.spanPercent = this.ui.main.find("#span-percent");
            this.ui.lblPercent = this.ui.main.find("#lbl-percent");
            this.ui.spanPercent = this.ui.main.find("#span-percent");
            this.ui.hoverInfo = this.ui.body.find(".hover-info");
            this.ui.otherMain = this.ui.body.find("#other-main");
            this.ui.hoverNew = this.ui.main.find("#hover-new");
            this.ui.divPercent = this.ui.main.find("#div-percent");
            this.ui.divAction = this.ui.main.find("#div-action");
            
            
            
            this.model.set({
                percent: 33,
                date: new Date()
            });
        },
        openShare: function () {
            if(!this.share){
                this.share = new WE.Share({
                    onClose: function () {
                    
                    }
                });
            }

            this.share.show({});
        }

    }));

    $(function () {
        var model = new WE.User.Center.Model();
        var view = new WE.User.Center.View({model: model});
    });


})(WE, jQuery, Backbone);
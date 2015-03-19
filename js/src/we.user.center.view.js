;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.User.Center.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                main: null,
                data: null,
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

        },

        getUserResume: function () {
            var options = {
                data: {}
            };

            options.success = function (result) {
                this.format(result.data);
            };

            options.error = function (result) {
                WE.UI.alert(result.msg);
            };

            WE.Api.getUserResume(options, this);
        },

        format: function (data) {
            var main = null;
            var data = [];

            _.each(data, function (e) {
                if(e.is_main){
                    main = e;
                }else{
                    data.push(e);
                }
            });

            if(!main && data.length > 0){
                main = data.splice(0,1);
            }

            this.model.set({
                main: main,
                data: data
            })
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

            this.model.on("change:main", function () {

            });

            this.model.on("change:percent", function () {
                var percent = this.get("percent");

                _this.ui.lblPercent.text(percent + "%");
                _this.ui.spanPercent.css({width: percent + "%"});
            });

            this.model.on("change:date", function () {
                var date = this.get("date") || new Date();
                    date = WE.Date.format("yyyy-MM-dd", date);
                
                _this.ui.spanTime.text(date);
            });
        },

        initPageEvents: function () {
            var _this = this;

            this.ui.btnShare.click(function () {
                _this.openShare();
            });

            this.ui.btnUpdate.click(function () {
                //window.location.href="resume.html";                
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
                var data = {
                    list: [{
                        id: "10001",
                        direct: true,
                        title: "张三的简历",
                        image: "../images/pic_09.jpg"
                    }],
                    showButton: false
                };

                var dialog = new WE.User.Dialog(data);

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
                var data = {
                    list: [],
                    showButton: true
                };

                for(var i = 0; i < 10; i++){
                    data.list.push({
                        direct: false,
                        id: "10001" + i,
                        title: "张三的简历",
                        image: "../images/pic_09.jpg"
                    });
                }

                var dialog = new WE.User.Dialog(data);

            });

            this.ui.mainNew.click(function () {
                var mID = $(this).data("m_id");

                window.location.href = "/start.html?m_id=" + mID;
            });

            this.ui.collectWrap.delegate("li", "click", function () {
                var mID = $(this).data("m_id");

                window.location.href = "/start.html?m_id=" + mID;
            });
        },

        render: function () {
            
            this.ui = {};
            this.ui.body = $("body");
            this.ui.main = $("#main");
            this.ui.btnUpdate = this.ui.main.find("#btn-update");
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
            this.ui.mainNew = this.ui.main.find("#main-new");
            this.ui.mainCollect = $("#main-collect");
            this.ui.collectWrap =  this.ui.mainCollect.find(".wrap");
            
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
        },
        getUserResume: function () {
            var options = {
                data: {}
            };

            options.success = function (result) {

            };

            options.error = function () {

            };

            WE.Api.getUserResume(options, this);
        },
        getNewResume: function () {
            var options = {
                data: {
                    count: 1
                }
            };

            options.success = function (result) {
                if(result.data && result.data.length > 0){
                    var template = _.template(this.template.news);
                        template = template(result.data[0]);

                    this.ui.mainNew.html(template).data("m_id", result.data[0].id);
                }
            };

            options.error = function (result) {

            };

            WE.Api.getNewResume(options, this);
        },
        getCollectResume: function () {
            var options = {
                data: {}
            };

            options.success = function (result) {
                if(result.data && result.data.length > 0){
                    var html = [];
                    var template = _.template(this.template.collect);

                    _.each(result.data, function (e) {
                        html.push(template(e));
                    });

                    this.ui.collectWrap.html(html.join("\n"));
                }else{
                    this.ui.mainCollect.hide();
                }
            };

            options.error = function (result) {
                this.ui.mainCollect.hide();
            };

            WE.Api.getCollectResume(options, this);
        },

        template: {
            news: ['<img src="<%-url%>" />',
                    '<span class="userInfo_imgBg"></span>',
                    '<p class="userInfo_imgP"><%-title%></p>'
                ].join("\n"),
            collect: ['<li data-m_id="<%id%>">',
                        '<div class="userInfo_img">',
                            '<img src="<%-url%>" />',
                        '</div>',
                        '<p class="userCenterList_name"><%-title%></p>',
                    '</li>'].join("\n")
        }

    }));

    $(function () {
        var model = new WE.User.Center.Model();
        var view = new WE.User.Center.View({model: model});
    });


})(WE, jQuery, Backbone);
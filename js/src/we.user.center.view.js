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
                var data = this.get("main");
                var date = new Date(data.update_at);
                    date = WE.Date.format("yyyy-MM-dd", date);

                _this.ui.hoverNew.show();
                _this.ui.nowContext.hide();
                _this.ui.main.find(".hover-info").hide();

                 if(data){
                    _this.ui.hoverNew.show();
                    _this.ui.nowContext.show();
                    _this.ui.main.find(".hover-info").show();

                    _this.ui.spanTime.text(date);
                    _this.ui.mainTitle.text(data.title);
                    _this.ui.lblPercent.text(data.percent + "%");
                    _this.ui.spanPercent.css({width: data.percent + "%"});
                    _this.ui.mainPhoto.attr({src: data.i_img}).parent().show();
                }
            });

            this.model.on("change:data", function () {
                var data = this.get("data");
                var template = _.template(_this.template.resume);
                var ul = _this.ui.otherMain.find("ul");
                var last = ul.find("li").eq(-1);

                ul.find("li.info-list").remove();

                if(data && data.length > 0){
                    _.each(data, function (e, index) {
                        var item = template({
                            index: index,
                            image: e.i_img,
                            title: e.title
                        });

                        last.before(item);
                    });
                }
            });
        },

        initPageEvents: function () {
            var _this = this;

            this.ui.btnShare.click(function () {
                _this.openShare();
            });

            this.ui.btnUpdate.click(function () {
                var data = _this.model.get("main");
                window.location.href="/resume.html?s_id=" + data.id;                
            });

            this.ui.btnMail.click(function () {
                var data = _this.model.get("main");

                _this.model.sendMail(data.id);
            });

            this.ui.btnDownload.click(function () {
                var data = _this.model.get("main");

                _this.model.download(data.id);
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
                var data = _this.model.get("main");

                WE.UI.confirm(_this.model.TIPS.CONFIRM_DELETE,{
                    callback: function (bool) {
                         if(bool){
                            _this.model.removeResume({id: data.id}, function () {
                                WE.UI.alert(_this.model.TIPS.DELETE_SUCCESS);
                            });
                            /*
                            _this.ui.hoverNew.show(); 
                            _this.ui.divAction.hide();
                            _this.ui.divPercent.hide();
                            $this.closest(".hover-info").remove();
                            */
                         }
                    }
                })
            });

            this.ui.main.find(".ico-look").click(function () {
                var main = _this.model.get("main");
                var data = {
                    list: [{
                        id: main.id,
                        direct: main.is_main,
                        title: main.title,
                        image: main.i_url
                    }],
                    model: _this.model,
                    showButton: false
                };

                var dialog = new WE.User.Dialog(data);
            });


            this.ui.otherMain.delegate(".ico-close","click", function () {
                var $this = $(this);
                var index = $this.data("index");
                var data = _this.model.get("data");

                WE.UI.confirm(_this.model.TIPS.CONFIRM_DELETE,{
                    callback: function (bool) {
                         if(bool){
                            _this.model.removeResume({id: data[index].id}, function () {
                                WE.UI.alert(_this.model.TIPS.DELETE_SUCCESS);
                                $this.closest(".info-list").remove();
                            });
                         }
                    }
                })
            });

            this.ui.otherMain.find(".ico-look", "click", function () {
                var index = $(this).data("index");
                var data = _this.model.getData();

                var data = {
                    list: data,
                    index: index,
                    model: _this.model,
                    showButton: true
                };

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
            this.ui.nowContext = $(".now-context");
            this.ui.mainTitle = $("#main-title");
            this.ui.btnMail = $("#btn-mail");
            this.ui.btnDownload = $("#btn-download");
            

            this.getNewResume();
            this.getCollectResume();
            this.model.getUserResume();
        },
        openShare: function () {
            if(!this.share){
                this.share = new WE.Share({
                    onClose: function () {
                    
                    }
                });
            }

            var data = this.model.get("main");

            this.share.show({
                title: data.title,
                summary: data.title,
                imageUrl: data.i_url,
                url: window.location.host
            });
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
        }

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
                    '</li>'].join("\n"),
            resume: ['<li class="info-list">',
                        '<div class="userInfo_img hover-info">',
                            '<img src="<%=image%>" />',
                            '<a href="javascript: void(0);" data-index="<%-index%>" class="i_icoCloseX ico-close" style="display:none;"></a>',
                            '<a href="javascript: void(0);" data-index="<%-index%>" class="i_icoLook ico-look" style="display:none;"></a>',
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
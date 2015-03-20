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

            this.model.on("change:data", function () {
                var data = this.getData();

                _this.renderMain(data.main);
                _this.renderData(data.data);
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

            this.ui.body.delegate(".hover-info", "mouseenter", function () {
                $(this).find(".ico-look").show();
                $(this).find(".ico-close").show();
            });

            this.ui.body.delegate(".hover-info", "mouseleave", function () {
                $(this).find(".ico-look").hide();
                $(this).find(".ico-close").hide();
            });

            this.ui.body.delegate(".hover-info .ico-close", "click", function () {
                var $this = $(this);
                var id = $this.data("id");

                WE.UI.confirm(_this.model.TIPS.CONFIRM_DELETE,{
                    callback: function (bool) {
                         if(bool){
                            _this.model.removeResume({id: id}, function () {
                                WE.UI.alert(_this.model.TIPS.DELETE_SUCCESS);
                            });
                         }
                    }
                });
            });

            this.ui.body.delegate(".hover-info .ico-look", "click", function () {
                var index = $(this).data("index");
                var data = _this.model.get("data");

                var data = {
                    list: data,
                    index: index,
                    showButton: true,
                    model: _this.model
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
        renderMain: function (data) {
            var date = new Date(data.update_at);
                date = WE.Date.format("yyyy-MM-dd", date);

            this.ui.hoverNew.show();
            this.ui.nowContext.hide();
            this.ui.main.find(".hover-info").hide();

             if(data){
                this.ui.hoverNew.show();
                this.ui.nowContext.show();
                this.ui.main.find(".hover-info").show();
                this.ui.main.find(".hover-info .ico-close").data("id", data.id);
                this.ui.main.find(".hover-info .ico-look").data("index", data.index);

                this.ui.spanTime.text(date);
                this.ui.mainTitle.text(data.title);
                this.ui.lblPercent.text(data.percent + "%");
                this.ui.spanPercent.css({width: data.percent + "%"});
                this.ui.mainPhoto.attr({src: data.i_img}).parent().show();
            }
        },
        renderData: function (data) {
            var template = _.template(this.template.resume);
            var ul = this.ui.otherMain.find("ul");
            var last = ul.find("li").eq(-1);

            ul.find("li.info-list").remove();

            if(data && data.length > 0){
                _.each(data, function (e) {
                    var item = template({
                        id: e.id,
                        index: e.index,
                        image: e.i_img,
                        title: e.title
                    });

                    last.before(item);
                });
            }
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
            var _this = this;

            this.model.getNewResume(function(data) {
                var template = _.template(_this.template.news);
                    template = template(data[0]);

                _this.ui.mainNew.html(template).data("m_id", data[0].id);
            });
        },
        getCollectResume: function () {
            var _this = this;

            this.model.getCollectResume(function(result) {
                if(result.success && result.data && result.data.length > 0){
                    var html = [];
                    var template = _.template(_this.template.collect);

                    _.each(result.data, function (e) {
                        html.push(template(e));
                    });

                    _this.ui.mainCollect.show();
                    _this.ui.collectWrap.html(html.join("\n"));

                    return;
                }

                _this.ui.mainCollect.hide();
            });
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
                    '</li>'].join("\n"),
            resume: ['<li class="info-list">',
                        '<div class="userInfo_img hover-info">',
                            '<img src="<%=image%>" />',
                            '<a href="javascript: void(0);" data-id="<%-id%>" class="i_icoCloseX ico-close" style="display:none;"></a>',
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
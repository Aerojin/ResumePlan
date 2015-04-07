;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.User.Item";

    WE.namespace(_class, function (options, model, container) {

        this.id = options.id;
        this.image = options.image;
        this.title = options.title;
        this.direct = options.direct;
        this.container = container;
        this.model = model;

        this.init = function () {
            var template = _.template(this.template);
                template = template({title: this.title, image: this.image, direct: this.getDirect()});

            this.ui = {};
            this.ui.wrap = $(template);
            this.ui.btnEdit = this.ui.wrap.find(".btn-edit");
            this.ui.btnPrint= this.ui.wrap.find(".btn-print");
            this.ui.btnShare = this.ui.wrap.find(".btn-share");
            this.ui.btnMail = this.ui.wrap.find(".btn-mail");
            this.ui.btnDown = this.ui.wrap.find(".btn-down");
            this.ui.btnDirect = this.ui.wrap.find(".btn-direct");
            this.ui.content = this.ui.wrap.find(".content");

            this.initEvents();

            this.container.append(this.getElement());
            this.animation();
        };

        this.initEvents = function () {
            var _this = this;

            this.ui.btnEdit.click(function () {
                _this.edit();
            });

            this.ui.btnPrint.click(function () {
                _this.print();
            });

            this.ui.btnShare.click(function () {
                _this.share();
            });

            this.ui.btnMail.click(function () {
                _this.mail();
            });

            this.ui.btnDown.click(function () {
                _this.down();
            });

            this.ui.btnDirect.click(function() {
                _this.direct = !!_this.direct ? 0 : 1;

                if(!_this.loading){
                    _this.loading = true;
                    _this.model.actionMain({
                        id: _this.id,
                        isMain: _this.direct 
                    }, function () {
                        _this.loading = false;
                        WE.UI.show("主备简历修改成功", {delay: 2000});
                        _this.ui.btnDirect.text(_this.getDirect());
                    });
                }
            });
        };

        this.getElement = function () {
            return this.ui.wrap;
        };

        this.animation = function () {
            this.render();
            this.ui.wrap.fadeIn();
            this.ui.wrap.css({"display": "list-item"});
        };

        this.render = function () {
            new WE.User.Resume.View({
                id: this.id,
                container: this.ui.content
            });
        };

        this.edit = function () {
            window.location.href="/resume.html?m_id=" + this.id;
        };

        this.share = function () {
            this.shareDialog = new WE.Share({
                onClose: function () {
                
                }
            });

            this.shareDialog.show({
                title: this.title,
                summary: this.title,
                imageUrl: this.image,
                url: window.location.host
            });
        };

        this.print = function () {
            window.open("http://item.taobao.com/item.htm?spm=a1z10.1-c.w4004-7809348483.1.XEGB1z&id=39844918692&qq-pf-to=pcqq.c2c");
        };

        this.mail = function () {
            this.model.sendMail(this.id);
        };

        this.down = function () {
            //window.location.href="/preview.html?m_id=" + this.id;
            this.model.download(this.id);
            //window.open("/preview.html?m_id=" + this.id);
        };

        this.getDirect = function () {
            if(this.direct){
                return "主";
            }

            return "备";
        };

        this.template = [
            '<li class="img_li clearfix" style="display: none;">',
                '<div class="resumeCon img_liBox content" style="min-height:1150px;">',
                    '<div style="width:100%;height:600px; line-height:630px; overflow:hidden; text-align:center;font-size: 30px;">',
                        '内容正在加载中...',
                    '</div>',
                '</div>',
                '<div class="windowPreview_btn btn-box clearfix">',
                    '<p class="windowPreview_btnL">',
                        '<a href="javaScript:void(0);" class="i_icoWindOne btn-edit"></a>',
                        '<a href="javaScript:void(0);" class="i_icoWindTwo btn-print"></a>',
                        '<a href="javaScript:void(0);" class="i_icoWindThree btn-share"></a>',
                        '<a href="javaScript:void(0);" class="i_icoWindFour btn-mail"></a>',
                        '<a href="javaScript:void(0);" class="i_icoWindFive btn-down"></a>',
                        '<a href="javaScript:void(0);" class="i_icoWindSix btn-direct"><%-direct%></a>',
                    '</p>',
                    '<strong class="windowPreview_btnR"><%-title%></strong>',
                '</div>',
            '</li>'
        ].join("\n");

        this.init();
    });  
})(WE, jQuery, Backbone);
;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.User.Item";

    WE.namespace(_class, function (options) {

        this.id = options.id;
        this.image = options.image;
        this.title = options.title;

        this.init = function () {
            var template = _.template(this.template);
                template = template({title: this.title, image: this.image});

            this.ui = {};
            this.ui.wrap = $(template);
            this.ui.btnEdit = this.ui.wrap.find(".btn-edit");
            this.ui.btnPrint= this.ui.wrap.find(".btn-print");
            this.ui.btnShare = this.ui.wrap.find(".btn-share");
            this.ui.btnMail = this.ui.wrap.find(".btn-mail");
            this.ui.btnDown = this.ui.wrap.find(".btn-down");

            this.initEvents();
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
        };

        this.getElement = function () {
            return this.ui.wrap;
        };

        this.animation = function () {
            this.ui.wrap.fadeIn();
            this.ui.wrap.css({"display": "list-item"});
        };

        this.edit = function () {
            window.location.href="resume.html";
        };

        this.share = function () {
            this.shareDialog = new WE.Share({
                onClose: function () {
                
                }
            });

            this.shareDialog.show({});
        };

        this.print = function () {
            window.open("http://item.taobao.com/item.htm?spm=a1z10.1-c.w4004-7809348483.1.XEGB1z&id=39844918692&qq-pf-to=pcqq.c2c");
        };

        this.mail = function () {
            WE.UI.alert("发送邮件");
        };

        this.down = function () {
            WE.UI.alert("下载简历");
        };

        this.template = [
            '<li style="display: none;">',
                '<img src="<%-image%>" width="469" height="664">',
                '<div class="windowPreview_btn clearfix">',
                    '<p class="windowPreview_btnL">',
                        '<a href="javaScript:void(0);" class="i_icoWindOne btn-edit"></a>',
                        '<a href="javaScript:void(0);" class="i_icoWindTwo btn-print"></a>',
                        '<a href="javaScript:void(0);" class="i_icoWindThree btn-share"></a>',
                        '<a href="javaScript:void(0);" class="i_icoWindFour btn-mail"></a>',
                        '<a href="javaScript:void(0);" class="i_icoWindFive btn-down"></a>',
                    '</p>',
                    '<strong class="windowPreview_btnR"><%-title%></strong>',
                '</div>',
            '</li>'
        ].join("\n");

        this.init();
    });  
})(WE, jQuery, Backbone);
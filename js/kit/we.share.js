; (function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Share";

    WE.namespace(_class, superClass.extend({

        name: _class,

        template: [
            '<span class="blackBackground" id="<%-cid%>-shade" style="display:none;"></span>',
            '<div class="windowBox" id="<%-cid %>-share" style="width:480px; display:none;">',
                '<a href="javascript:void(0);" id="<%-cid %>-close" class="i_icoCloseW i_icoCloseWBtn"></a>',
                '<h2>分享</h2>',
                '<ul class="shareList clearfix">',
                    '<li><a href="javascript:void(0);" shareid="qzone" class="i_icoSone"></a></li>',
                    '<li><a href="javascript:void(0);" shareid="tsina" class="i_icoStwo"></a></li>',
                    '<li><a href="javascript:void(0);" shareid="tqq" class="i_icoSthrere"></a></li>',
                    '<li><a href="javascript:void(0);" shareid="linkedin" class="i_icoSfour"></a></li>',
                    '<li><a href="javascript:void(0);" shareid="weixin" class="i_icoSfive"></a></li>',
                '</ul>',
            '</div>'
        ].join("\n"),

        summary: '制作一份好简历居然可以这么简单，史上最强简历制作工具——“简历计划”，帮你做出HR心目中的好简历，面试机会滚滚来！@简历计划',

        jiaThisAPI: "http://www.jiathis.com/send/?webid=<%-shareid%>&url=<%-url%>&title=<%-title%>&summary=<%-summary%>&pic=<%-imageUrl%>",

        initialize: function (options) {
            this.url = options.url;
            this.title = options.title;
            //this.summary = options.summary;
            this.imageUrl = options.imageUrl;
            this.container = options.container || $('body');
            this.onClose = options.onClose || this.onClose;

            this.render();
            this.initEvents();
        },

        initEvents: function () {
            var _this = this;

            this.ui.button.click(function() {
                var shareID = $(this).attr("shareid");

                _this.share(shareID);
            });

            this.ui.btnClose.click(function () {
                _this.hide();
                _this.onClose();
            });
        },

        render: function () {
            
            var tamplate = _.template(this.template);
                tamplate = tamplate({cid: this.cid});

            this.ui = {};
            this.ui.wrap = $(tamplate);
            this.ui.button = this.ui.wrap.find("ul a");
            this.ui.shade = this.getCidEl("shade", this.ui.wrap);
            this.ui.btnClose = this.getCidEl("close", this.ui.wrap);

            this.container.append(this.ui.wrap);
        },

        share: function (shareID) {            
            var url = _.template(this.jiaThisAPI);
                url = url({
                    shareid: shareID,
                    url:  "http://www.jianlipro.com" || this.url,
                    title: this.title || "简历计划",
                    summary: this.summary || "简历计划",
                    imageUrl: this.imageUrl || ""
                });

            window.open(url);
        },

        show: function (options) {
            this.url = options.url;
            this.title = options.title;
            //this.summary = options.summary;
            this.imageUrl = options.imageUrl;

            this.ui.wrap.show();
            this.ui.shade.show();
        },

        hide: function () {
            this.ui.wrap.hide();
            this.ui.shade.hide();
        },

        onClose: function () {
        
        } 

    }));


})(WE, jQuery, Backbone);
; (function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Share";

    WE.namespace(_class, superClass.extend({

        name: _class,

        template: [
            '<div class="windowBox" id="<%-cid %>-share" style="width:480px;">',
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

        jiaThisAPI: "http://www.jiathis.com/send/?webid=<%-shareid%>&url=<%-url%>&title=<%-title%>&summary=<%-summary%>&imageUrl=<%-imageUrl%>",

        initialize: function (options) {
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
                _this.ui.wrap.remove();
                _this.onClose();
            });
        },

        render: function () {
            
            var tamplate = _.template(this.template);
                tamplate = tamplate({cid: this.cid});

            this.ui = {};
            this.ui.wrap = $(tamplate);
            this.ui.button = this.ui.wrap.find("ul a");
            this.ui.btnClose = this.getCidEl("close", this.ui.wrap);

            this.container.append(this.ui.wrap);
        },

        share: function (shareID) {            
            var url = _.template(this.jiaThisAPI);
                url = url({
                    shareid: shareID,
                    url: "http://www.baidu.com",
                    title: "简历计划",
                    summary: "简历计划",
                    imageUrl: ""
                });

            window.open(url);
        },

        onClose: function () {
        
        } 

    }));


})(WE, jQuery, Backbone);
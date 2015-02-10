;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Login.Dialog";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        el: 'body',

        initialize: function (options) {
            this.title = options.title || "";
            this.content = options.content || "";
            this.onClose = options.onClose || this.onClose;

            this.render();
            this.initEvents();
        },

        initEvents: function () {
            var _this = this;

            this.ui.btnClose.click(function () {
                _this.close();
            });
        },

        render: function () {
            
            var template = _.template(this.template);
            this.wrap = $(template({
                cid: this.cid,
                title: this.title
            }));

            this.ui = {};
            this.ui.wrap = this.wrap;
            this.ui.title = this.getCidEl("title", this.ui.wrap);
            this.ui.btnClose = this.getCidEl("close", this.ui.wrap);            
            this.ui.content = this.getCidEl("content", this.ui.wrap);

            this.ui.content.empty().append(this.content);
            this.$el.append(this.wrap);
        },

        setTitle: function (title) {
            this.ui.title.text(title);
        },

        setContent: function (content) {
            this.ui.content.empty().append(content);
        },

        getWrap: function () {
            return this.ui.wrap;
        },

        close: function () {
            this.ui.wrap.remove();
            this.onClose();
        },

        onClose: function () {

        },


        template: '<div class="window" id="<%-cid%>-dialog">\
                        <a href="javascript:void(0);" id="<%-cid%>-close" class="i_icoClose"></a>\
                        <h2 id="<%-cid%>-title"><%-title%></h2>\
                        <div id="<%-cid%>-content"></div>\
                    </div>'

    }));


})(WE, jQuery, Backbone);
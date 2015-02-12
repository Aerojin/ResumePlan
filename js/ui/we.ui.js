;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Base.UI"; 

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        initialize: function () {

        },

        initEvents: function () {

        },

        render: function () {

        },

        alert: function (text, options) {
            var template = _.template(this.template.alert);
                template = template({cid: this.cid, text: text});

            var ui = {};
                ui.wrap = $(template);
                ui.close = this.getCidEl("close", ui.wrap);
                ui.confirm = this.getCidEl("confirm", ui.wrap);

            options = options || {};
            ui.close.click(function () {
                ui.wrap.remove();

                if(options.close){
                    options.close();
                }
            });

            ui.confirm.click(function () {
                ui.wrap.remove();

                if(options.callback){
                    options.callback(true);
                }
            });

            $("body").append(ui.wrap);
        },
        confirm: function (text, options) {
            var template = _.template(this.template.confirm);
                template = template({cid: this.cid, text: text});

            var ui = {};
                ui.wrap = $(template);
                ui.close = this.getCidEl("close", ui.wrap);
                ui.cancel = this.getCidEl("cancel", ui.wrap);
                ui.confirm = this.getCidEl("confirm", ui.wrap);

            options = options || {};
            ui.close.click(function () {
                ui.wrap.remove();

                if(options.close){
                    options.close();
                }
            });

            ui.cancel.click(function () {
                ui.wrap.remove();

                if(options.callback){
                    options.callback(false);
                }
            });

            ui.confirm.click(function () {
                ui.wrap.remove();

                if(options.callback){
                    options.callback(true);
                }
            });

            $("body").append(ui.wrap);
        },

        template: {
           confirm: [
                '<span class="blackBackground"></span>',
                '<div class="windowBox" id="<%-cid%>-dialog" style="width:480px;">',
                    '<h2><%-text%></h2>',
                    '<p class="windowBoxBtn">',
                        '<a href="javascript:void(0);" id="<%-cid%>-confirm" class="btnK">确定</a>',
                        '<a href="javascript:void(0);" id="<%-cid%>-cancel" class="btnK">取消</a>',
                    '</p>',
                    '<a href="javascript:void(0);" id="<%-cid%>-close" class="i_icoCloseW i_icoCloseWBtn"></a>',
                '</div>'
           ].join("\n"),
           alert: [
                '<span class="blackBackground"></span>',
                '<div class="windowBox" id="<%-cid%>-dialog" style="width:480px;">',
                    '<h2><%-text%></h2>',
                    '<p class="windowBoxBtn">',
                        '<a href="javascript:void(0);" id="<%-cid%>-confirm" class="btnK">确定</a>',                        
                    '</p>',
                    '<a href="javascript:void(0);" id="<%-cid%>-close" class="i_icoCloseW i_icoCloseWBtn"></a>',
                '</div>'
           ].join("\n"),

        }

    }));


    WE.UI = new WE.Base.UI();

})(WE, jQuery, Backbone);
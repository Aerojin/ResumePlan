;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Base.UI"; 

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        TIPS: {
            TIP: "提示",
            INFO: "消息"
        },

        TYPE: {
            "success": "i_icoOkss",
            "warn": "i_icoPrompts"
        },

        initialize: function () {

        },

        initEvents: function () {

        },

        render: function () {

        },

        alert: function (text, options) {
            options = options || {};

            var type = options.type || "success";
            var template = _.template(this.template.alert);
                template = template({
                    cid: this.cid,
                    text: text,
                    type: this.TYPE[type],
                    title: options.title || this.TIPS.TIP
                });

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
            options = options || {};

            var template = _.template(this.template.confirm);
                template = template({cid: this.cid, text: text, title: options.title || this.TIPS.TIP});

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
                '<span class="blackBackground" style="display:none;"></span>',
                '<div class="windowBox" id="<%-cid%>-dialog" style="width:480px;">',
                    '<a href="javascript:void(0);" id="<%-cid%>-close" class="i_icoCloseW i_icoCloseWBtn"></a>',
                    '<h2><%-title%></h2>',
                    '<p class="windowBox_box"><%-text%></p>',
                    '<p class="windowBoxBtn mt_50">',
                        '<a href="javascript:void(0);" id="<%-cid%>-confirm" class="btnK">确定</a>',
                        '<a href="javascript:void(0);" id="<%-cid%>-cancel" class="btnK">取消</a>',
                    '</p>',
                    
                '</div>'
           ].join("\n"),
           alert: [
                '<span class="blackBackground" style="display:none;"></span>',
                '<div class="windowBox" id="<%-cid%>-dialog" style="width:480px;">',
                '<a href="javascript:void(0);" id="<%-cid%>-close" class="i_icoCloseW i_icoCloseWBtn"></a>',
                    '<h2><%-title%></h2>',
                    '<p class="windowBox_box"><i class="<%-type%> mr_10"></i><%-text%></p>',
                    '<p class="windowBoxBtn mt_50">',
                        '<a href="javascript:void(0);" id="<%-cid%>-confirm" class="btnK">确定</a>',                        
                    '</p>',
                '</div>'
           ].join("\n"),

        }

    }));


    WE.UI = new WE.Base.UI();

})(WE, jQuery, Backbone);
;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.Dialog;
    var _class = "WE.Resume.Skill.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        state: "ability",

        STATE: {
            ABILITY: "ability",
            CERTIFICATE: "certificate"
        },

        initialize: function (options) {
            this.key = options.key;
            this.title = options.text;
            this.width = options.width;

        	this.render();
        	this.initEvents();
        },

        initEvents: function () {
        	var _this = this;

            this.instance.on("change:ui", this.changeUI, this);
        	
            this.ui.btnCut.click(function() {
                var state = $(this).data("state");

                if(_this.state != state){
                    _this.state = state;
                    _this[state].render.call(_this);
                }

                _this.ui.btnCut.closest("li").removeClass("focus");
                $(this).parent().addClass("focus");
            });

            this.ui.btnSave.click(function () {
                _this.context.save();
            });
        },

        render: function () {
        	var template = _.template(this.template);
        		template = template({cid: this.cid});

        	this.el = $(template);
        	this.ui = {};
        	this.ui.wrap = this.el;
            this.ui.btnCut = this.ui.wrap.find(".btn-cut");
            this.ui.btnSave = this.getCidEl("save", this.ui.wrap);
            this.ui.divMenu =  this.getCidEl("menu", this.ui.wrap);
            this.ui.divContext =  this.getCidEl("context", this.ui.wrap);

        	this.show();
            this[this.state].render.call(this);
        },

        changeUI: function (args) {
            this.context.changeUI(args);
        },

        onClose: function () {
            this.instance.off("change:ui", this.changeUI);
        },

        ability: {
            render: function () {
                this.context = new WE.Resume.Ability.View({
                    master: this,
                    menu: this.ui.divMenu,
                    container: this.ui.divContext
                });
            }
        },

        certificate: {
            render: function () {
                this.context = new WE.Resume.Certificate.View({
                    master: this,
                    menu: this.ui.divMenu,
                    container: this.ui.divContext
                });
            }
        },

        template: ['<div class="clearfix">',
            '<div class="windowBoxA_nav">',
                '<ul>',
                    '<li class="focus">',
                        '<a href="javascript:void(0);" class="btn-cut" data-state="ability">技能</a>',
                    '</li>',
                    '<li>',
                        '<a href="javascript:void(0);" class="btn-cut" data-state="certificate">证书</a>',
                    '</li>',
                '</ul>',
            '</div>',
            '<div class="windowBoxA_from_two">',
                '<ul class="fromList fromListBox clearfix" id="<%-cid%>-context">',
                '</ul>',
                '<div class="windowBoxA_from_bottom" style="left:225px;">',
                    '<a href="javascript:void(0);" id="<%-cid%>-save" class="btnM">保存</a>',
                '</div>',
            '</div>',
            '<div class="windowBoxA_menu">',
                '<ul id="<%-cid%>-menu">',
                '</ul>',
            '</div>',
        '</div>'].join("\n")
    }));
})(WE, jQuery, Backbone);


;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.Dialog";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        initialize: function (options) {

            this.key = options.key;
            this.isLock = options.isLock;
        	this.width = options.width;
        	this.title = options.text;
        	this.content = options.content;
            this.constant = WE.Resume.getConstant();

        	this.render();
        	this.initEvents();
        	this.setPosition();

            window.dialog = this;
        },

        initEvents: function () {
            var _this = this;

            this.constant.on("change", this.setState, this);

            this.ui.btnClose.click(function () {
            	_this.close();
            });

            this.ui.wrap.delegate(".btn-ico","click",function() {
                _this.constant.setKey(_this.key);
            });
        },

        render: function () {
            var template = _.template(this.template);
            	template = template({
                    cid: this.cid,
                    title: this.title,
                    state: this.getState()
                });

            this.el = $(template);
            this.ui = {};
            this.ui.wrap = this.el;
            this.ui.body = $("body");
            this.ui.btnClose = this.getCidEl("close", this.ui.wrap);
            this.ui.container = this.getCidEl("container", this.ui.wrap);

            this.ui.container.empty().append(this.content);
            this.ui.wrap.width(this.width).appendTo(this.ui.body);

        },

        setPosition: function () {
        	var winWidth = $(window).width();
        	var left = (winWidth - this.width) / 2;

        	this.ui.wrap.css({"left": left, "margin-left": 0, "top": "10%"});
        },

        close: function () {
        	this.ui.wrap.remove();
            this.constant.off("change", this.setState);

        	this.onClose();
        },


        show: function () {
            if(window.dialog){
                window.dialog.close();
            }

        	this.render();
        },

        setState: function () {
            var ico = this.getState();
            var data = this.constant.changed;
            var element = this.ui.wrap.find(".btn-ico");

            element.after(ico).remove();
        },

        getState: function () {
            if(this.isLock){
                return this.stateTmpl.lock;
            }

            if(this.constant.getKey(this.key)){
                return this.stateTmpl.look;
            }

            return this.stateTmpl.unLook;
        },

        onClose: function () {

        },

        template: ['<div class="windowBoxA" id="<%-cid%>-dialog">',
			'<a href="javascript:void(0);" id="<%-cid%>-close" class="i_icoCloseW i_icoCloseWBtn"></a>',
			'<h2><%-title%> <%=state%></h2>',
			'<div id="<%-cid%>-container"></div>',
		'</div>'].join("\n"),

        stateTmpl: {
            lock: '<span>必填板块无法隐藏</span>',
            look: '<span class="currentP btn-ico"><i class="i_icoLooks mr_10"></i>隐藏该模块</span>',
            unLook: '<span class="currentP btn-ico"><i class="i_icoUnlooks mr_10"></i>显示该模块</span>'
        }

    }));

})(WE, jQuery, Backbone);



    
        
            
            
            
         
      

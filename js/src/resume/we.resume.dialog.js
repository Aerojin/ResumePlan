;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.Dialog";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        STATE: {
            LOOK: 'look',
            LOCK: 'lock',
            UN_LOOK: 'unLook'
        },

        initialize: function (options) {

            this.isLock = options.isLock;
            this.isShow = options.isShow;
        	this.width = options.width;
        	this.title = options.text;
        	this.content = options.content;

        	this.render();
        	this.initEvents();
        	this.setPosition();

            window.dialog = this;
        },

        initEvents: function () {
            var _this = this;

            this.ui.btnClose.click(function () {
            	_this.close();
            });

        },

        render: function () {
            
            var state = this.getState();
            var template = _.template(this.template);
            	template = template({
                    cid: this.cid,
                    title: this.title,
                    state: this.stateTmpl[state]
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

        	this.onClose();
        },

        show: function () {
            if(window.dialog){
                window.dialog.close();
            }

        	this.render();
        },

        getState: function () {
            if(this.isLock){
                return this.STATE.LOCK;
            }

            if(this.isShow){
                return this.STATE.LOOK;
            }

            return this.STATE.UN_LOOK;
        },

        onClose: function () {
            //
            //
        },

        template: ['<div class="windowBoxA" id="<%-cid%>-dialog">',
			'<a href="javascript:void(0);" id="<%-cid%>-close" class="i_icoCloseW i_icoCloseWBtn"></a>',
			'<h2><%-title%> <%=state%></h2>',
			'<div id="<%-cid%>-container"></div>',
		'</div>'].join("\n"),

        stateTmpl: {
            lock: '<span>必填板块无法隐藏</span>',
            look: '<span><i class="i_icoLooks mr_10"></i>隐藏该模块</span>',
            unLook: '<span><i class="i_icoUnlooks mr_10"></i>显示该模块</span>'
        }

    }));

})(WE, jQuery, Backbone);



    
        
            
            
            
         
      

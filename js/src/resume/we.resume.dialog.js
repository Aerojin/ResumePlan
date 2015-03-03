;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.Dialog";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        initialize: function (options) {

        	this.width = options.width;
        	this.title = options.title;
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
            
            var template = _.template(this.template);
            	template = template({cid: this.cid, title: this.title});

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

        onClose: function () {

        },

        template: ['<div class="windowBoxA" id="<%-cid%>-dialog">',
			'<a href="javascript:void(0);" id="<%-cid%>-close" class="i_icoCloseW i_icoCloseWBtn"></a>',
			'<h2><%-title%></h2>',
			'<div id="<%-cid%>-container"></div>',
		'</div>'].join("\n")

    }));

})(WE, jQuery, Backbone);




    
        
            
            
            
         
      

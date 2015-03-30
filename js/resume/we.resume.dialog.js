;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.Dialog";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        initialize: function (options) {

           
        },

        regEvents: function () {
            var _this = this;

            if(this.model){
                this.model.on("change", function () {
                    var changed = this.changed;

                    for(var key in changed){
                        var value = changed[key] || "";
                        var dom = _this.byName(key);

                        if(!dom || dom.length == 0){
                            continue;
                        }

                        if(dom.is("img")){
                            dom.attr({src: value}).show();
                            continue;
                        }
                        
                        dom.val(value);
                    }
                });
            }

            this.instance.on("change:show", this.setState, this);

            this.UI.btnClose.click(function () {
            	_this.close();
            });

            this.UI.wrap.delegate(".btn-ico","click",function() {
                _this.instance.setShow(_this.key);
            });

            if(this.ui.txtInput && this.ui.txtInput.length > 0){
                this.ui.txtInput.focus(function () {
                    var name = $(this).attr('name');
                    _this.hideTip(_this.byName(name));
                });

                this.ui.txtInput.blur(function () {
                    var obj = {};
                    var name = $(this).attr('name');
                    var value = $(this).val().trim();

                    obj[name] = value;
                    _this.model.set(obj, {validate: true, target: name});              
                });

                this.model.on('invalid', function(model, error){
                    for(var key in error){
                        _this.showTip(_this.byName(key), error[key]);
                    }                
                });
            }
        },

        initUI: function () {
            var template = _.template(this.container);
                template = template({
                    cid: this.cid,
                    title: this.title,
                    state: this.getState()
                });

            this.UI = {};
            this.UI.wrap = $(template);
            this.UI.body = $("body");
            this.UI.background = $(this.background);
            this.UI.btnClose = this.getCidEl("close", this.UI.wrap);
            this.UI.container = this.getCidEl("container", this.UI.wrap);

            this.UI.background.appendTo(this.UI.body) ;
            this.UI.container.empty().append(this.ui.wrap);
            this.UI.wrap.width(this.width).appendTo(this.UI.body);
        },

        setPosition: function () {
        	var winWidth = $(window).width();
        	var left = (winWidth - this.width) / 2;

        	this.UI.wrap.css({"left": left, "margin-left": 0, "top": "10%"});
        },

        close: function () {
        	this.UI.wrap.remove();
            this.UI.background.remove();
            this.instance.off("change", this.setState);

        	this.onClose();
        },


        show: function () {
            if(window.dialog){
                window.dialog.close();
            }

            window.dialog = this;
            this.instance = WE.Resume.getInstance();

            this.initUI();
            this.regEvents();
            this.setPosition();
        },

        setState: function () {
            var ico = this.getState();            
            var element = this.UI.wrap.find(".btn-ico");

            element.after(ico).remove();
        },

        getState: function () {
            if(this.instance.getLock(this.key)){
                return this.stateTmpl.lock;
            }

            if(this.instance.getShow(this.key)){
                return this.stateTmpl.look;
            }

            return this.stateTmpl.unLook;
        },

        getData: function () {
            return this.instance.getData(this.key);
        },

        showTip: function (dom, msg) {
            var _this = this;
            var template = _.template(this.tip);
                template = template({msg: msg});

            this.hideTip(dom);
            dom.after(template);
            dom.closest("li").addClass("on");

            setTimeout(function () {
                _this.hideTip(dom);
            }, 2000);
        },

        hideTip: function (dom) {
            dom.nextAll(".tips").fadeOut("slow", function () {
                $(this).remove();
                $(this).closest("li").removeClass("on");
            });
        },

        byName: function(name){
            return this.ui.wrap.find('[name=' + name + ']');
        },

        getMid: function () {
            return  this.getRequest().m_id;
        },

        getRequest: function () {
           var url = location.search; //获取url中"?"符后的字串
           var theRequest = new Object();
           if (url.indexOf("?") != -1) {
              var str = url.substr(1);
              strs = str.split("&");
              for(var i = 0; i < strs.length; i ++) {
                 theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
              }
           }
           return theRequest || {};
        },

        reset: function () {
            this.model.clear();
            this.ui.txtInput.val("");
        },

        onClose: function () {

        },

        container: ['<div class="windowBoxA" id="<%-cid%>-dialog">',
            			'<a href="javascript:void(0);" id="<%-cid%>-close" class="i_icoCloseW i_icoCloseWBtn"></a>',
            			'<h2><%-title%> <%=state%></h2>',
            			'<div id="<%-cid%>-container"></div>',
            		'</div>'].join("\n"),

        background: '<span class="blackBackground"></span>',

        tip: '<div class="tips"><%-msg%></div>',

        stateTmpl: {
            lock: '<span>必填板块无法隐藏</span>',
            look: '<span class="currentP btn-ico"><i class="i_icoLooks mr_10"></i>隐藏该模块</span>',
            unLook: '<span class="currentP btn-ico"><i class="i_icoUnlooks mr_10"></i>显示该模块</span>'
        }

    }));

})(WE, jQuery, Backbone);



    
        
            
            
            
         
      

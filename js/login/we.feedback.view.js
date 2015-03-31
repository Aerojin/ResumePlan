;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Feedback.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
        	return {
        		title: "意见反馈"
        	};
        },       

        initialize: function () {

        },

        initEvents: function () {

        }

    }));


})(WE, jQuery, Backbone);

;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Feedback.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        el: '<ul class="windowFrom">\
				<li>\
					<div class="textareaBox">\
						<textarea id="txt-context" name="" rows="" cols=""></textarea>\
						<label id="lbl-msg" class="label">输入您的意见与反馈...</label>\
					</div>\
				</li>\
			</ul>\
			<div class="window_btn"><a href="javascript:void(0);" id="btn-send" class="btnG">发送</a></div>',

        TIPS: {
            SUCCESS: "您的意见已经传达,感谢您对我们的支持!"
        },

        initialize: function (options) {
        	this.model = new WE.Feedback.Model();

        	this.render();
        	this.initEvents();
        },

        initEvents: function () {
        	var _this = this;

        	this.ui.txtContext.focus(function () {
        		_this.ui.lblMsg.hide();
        	});

        	this.ui.txtContext.blur(function () {
        		if(!$(this).val().trim().length){
        			_this.ui.lblMsg.show();
        		}
        	});

        	this.ui.btnSend.click(function() {
                _this.send();
        	});

        	this.ui.btnFeedback.click(function(event) {
        		_this.dialog = new WE.Login.Dialog({
        			content: _this.ui.wrap,
        			title: _this.model.get("title"),
                    onClose: function () {
                        _this.dialog = null;
                    }
                });

                
            	_this.dialog.getWrap().addClass('feedbackWindow');
        	});

        },

        render: function () {
        	this.ui = {};
        	this.ui.wrap = this.$el;
        	this.ui.btnFeedback = $('#btn-feedback');
            this.ui.txtContext = this.ui.wrap.find('#txt-context');
            this.ui.lblMsg = this.ui.wrap.find('#lbl-msg');
            this.ui.btnSend = this.ui.wrap.find('#btn-send');
        },
        send: function () {
            var options = {};
            var context = this.ui.txtContext.val().trim();

            if(context.length == 0){
                WE.UI.alert("反馈内容不能为空,请输入反馈内容!", {type: "warn"});
                return;
            }

            options.data = {
                f_context: context
            };

            options.success = function (result) {
                this.dialog.close();
                WE.UI.alert(this.TIPS.SUCCESS);
            };

            options.error = function (result) {
                WE.UI.alert(result.msg, {type: "warn"});
            };

            WE.Api.Feedback(options, this);
        }

    }));

	$(function () {
		var view = new WE.Feedback.View();
	});


})(WE, jQuery, Backbone);
;(function(WE, $){

	var MSG = {

	}; 

	WE.WebStatus = Backbone.Model.extend({
		defaults: function () {
			return {
				code: null,
				data: null,
				msg: null,
				success: null
			}
		},
		initialize: function () {
			this.initEvent();
		},
		initEvent: function () {
			this.on("change:code", function () {
				
				var code = this.get("code");				
				var success = code == 1;
				var msg = this.getMsgByCode(code);
				
				this.set({
					msg: msg,
					success: success
				});
			});
		},
		getMsgByCode: function (code){
			if(code == 999){
				$.cookie(WE.Constant.COOKIE_USER, null);
                $.cookie(WE.Constant.COOKIE_USERID, null);
                $.cookie(WE.Constant.COOKIE_PHOTO, null);
                $.cookie(WE.Constant.COOKIE_TOKEN, null);
                
				return "您还未登陆, 请登陆后再操作!";
			}

			return this.get("msg") || MSG[code] || "";
		},
		toJSON: function () {
			var json = {
				code : this.get("code"),
				msg: this.get("msg"),
				data:this.get("data"),				
				success: this.get("success")
			};

			return json;
		}
	});
})(WE, jQuery);
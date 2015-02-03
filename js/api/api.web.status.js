;(function(RP, $){			
	RP.WebStatus = Backbone.Model.extend({
		defaults: function () {
			return {
				code: null,
				data: null,
				msg: null,
				success: null
			}
		},
		initialize: function () {
			
		},
		initEvent: function () {
			this.on("change:code", function () {
				
				var code = this.get("code");				
				var success = code == "0";
				var msg = this.getMsgByCode(code);
				
				this.set({
					msg: msg,
					success: success
				});
			});
		},
		getMsgByCode: function (code){
			return "";
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
})(RP, jQuery);
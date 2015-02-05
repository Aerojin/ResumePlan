;(function (RP, $) {
	RP.HttpClient = new RP.Observer.extend({
		initialize: function (options) {
			options && WE.extend(this, options);
		},
		error:function(a, b){
			var observers = this.observers;
			for(var i = 0; observers && i<observers.length; i++){
				observers[i].error && observers[i].error(a, b);
			}
		},
		post:function(url, data){
			var _this = this;
			$.ajax({
				url:url,
				type:"post",
				data:data,
				dataType:"json",
				error:function(a, b){
					_this.error(a, b);
				},
				success:function(data){
					_this.notice(data);
				}
			});
		},
		get:function(url, data){
			var _this = this;
			$.ajax({
				url:url,
				type:"get",
				data:data,
				dataType:"json",
				error:function(a, b){
					_this.error(a, b);
				},
				success:function(data){
					_this.notice(data);
				}
			});
		}		
	});
})(RP, jQuery);
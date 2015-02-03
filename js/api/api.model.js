;(function(RP, $, Backbone){	
	RP.Api = new RP.HttpClient.extend({
		defaults: function () {
			return {
				index: ""	
			};
		}
	});
	
	RP.Api.getIndex = function (data) {
		this.post(this.get("index"), data);
	};	
})(RP, jQuery, Backbone);
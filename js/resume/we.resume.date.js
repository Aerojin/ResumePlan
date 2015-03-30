;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.Date";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        initialize: function (options) {

        	this.year = options.year || this.getNowYear();
        	this.month = options.month || this.getNowMonth();
        	this.onChange = options.onChange || this.onChange;
        	this.container = options.container;

        	this.render();
        	this.initEvents();
        },

        initEvents: function () {
        	var _this = this;

        	this.ui.year.change(function () {
        		_this.onChange(_this.getData());
        	});

        	this.ui.month.change(function () {
        		_this.onChange(_this.getData());
        	});
        },

        render: function () {

        	this.ui = {};
        	this.ui.year = $(this.template.select);
        	this.ui.month = $(this.template.select);

        	this.createYear();
        	this.createMonth();

        	this.container.empty();
        	this.container.append(this.ui.year);
        	this.container.append(this.ui.month);
        },

        createYear: function () {
        	var html = [];
        	var max = this.getNowYear();
        	var template = _.template(this.template.option);
        	
        	for(var i = 2000; i <= max; i++){
        		html.push(template({
        			text: i,
        			value: i,
        			selected: i == this.year ? "selected" : ""
        		}));
        	}

        	this.ui.year.html(html.join("\n"));
        },

        createMonth: function () {
        	var html = [];
        	var template = _.template(this.template.option);
        	
        	for(var i = 1; i <= 12; i++){
        		html.push(template({
        			text: i,
        			value: i,
        			selected: i == this.month ? "selected" : ""
        		}));
        	}

        	this.ui.month.html(html.join("\n"));
        },

        getNowYear: function () {
        	return new Date().getFullYear();
        },

        getNowMonth: function () {
        	return new Date().getMonth() + 1;
        },

        getData: function () {
        	var year = this.ui.year.val();
        	var month = this.ui.month.val();

        	return {
        		year: year,
        		month: month
        	};
        },

        setData: function (data) {
            var now = new Date();

        	this.ui.year.val(data.year || now.getFullYear());
        	this.ui.month.val(data.month || now.getMonth());
        },

        onChange: function () {

        },

        template: {
        	select: '<select class="select gray"></select>',
        	option: '<option value="<%-value%>" <%-selected%>><%-text%></option>'
        }

    }));


})(WE, jQuery, Backbone);
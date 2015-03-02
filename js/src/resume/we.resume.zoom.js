;(function (WE, jQuery, Backbone) {

    WE.namespace("WE.Resume.Zoom", function (options) {

        this.max = 100;
        this.min = 1;
        this.current = 100;

        this.ui = {};
        this.ui.element = options.element;
        this.ui.add = options.add;
        this.ui.cut = options.cut;
        this.ui.span = options.span;

        this.init = function () {
        	this.initEvent();
        };

        this.initEvent = function () {
        	var _this = this;

        	this.ui.add.click(function () {
        		_this.add();
        	});

        	this.ui.add.mousedown(function () {
        		_this.timer = setInterval(function () {
        			_this.add();
        		}, 50);

        	});

        	this.ui.add.mouseup(function () {
        		clearInterval(_this.timer);
        	});

        	this.ui.cut.click(function () {
        		_this.cut();
        	});

        	this.ui.cut.mousedown(function () {
        		_this.timer = setInterval(function () {
        			_this.cut();
        		}, 50);
        	});

        	this.ui.cut.mouseup(function () {
        		clearInterval(_this.timer);
        	});
        };

        this.add = function () {
        	this.current = this.current + 1;
    		this.current = this.current > this.max ? this.max : this.current;

    		this.zoom(this.current);
        };

        this.cut = function () {
        	this.current = this.current - 1;
    		this.current = this.current < this.min ? this.min : this.current;

    		this.zoom(this.current);
        };

        this.zoom = function (current) {
        	this.ui.span.text(current + "%");
        	this.ui.element.css({"transform": "scale(" + current / 100 + ")"});
        };

        this.init();
    }); 



})(WE, jQuery, Backbone);
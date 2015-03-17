;(function ($, _, WE) {

	/**
		SlideShow
		{
			parentElements: 父容器
			elements: 要变化的项
			time: 10000
			index: 0,默认显示项
			excessive: "Fade"
			isParentStop: 鼠标悬停父元素是否停止动画
		}
		
		event 
		onChange(index);
		
		function
		change(index);
	*/
	
	WE.namespace("WE.Resume.SlidesShow", function (options) {

		this.data = options.data || [];
		this.count = this.data.length - 4 || 0;
		this.pageSize = options.pageSize || 1;
		this.pageIndex = options.pageIndex || 0;
		this.pageCount = Math.ceil(this.count / this.pageSize);
		this.range = options.range;
		this.parentElements = options.parentElements;
		this.btnPrev = options.prev;
		this.btnNext = options.next;
		this.time = options.time || 300;
		

		this.TYPE = {
			FREE: 0,
			CHARGE: 1,
			TIME: 2,
			SOLE: 3
		};

		this.init = function(){
			var html = [];
			var template = _.template(this.template);

			for(var i = 0; i < this.data.length; i++){
				html.push(template({
					title: this.data[i].title,
					type: this.getType(this.data[i].type)
				}));
			}

			this.parentElements.html(html.join("\n")).css({"margin-left": this.range});
			this.regEvent();
			this.setButton(this.pageIndex);
		};

		this.regEvent = function(){
			var _this = this;

			this.btnPrev.find(".enabled").click(function () {
				_this.prev();
			});

			this.btnNext.find('.enabled').click(function () {
				_this.next();
			});
		};

		this.prev = function(){
			this.pageIndex = this.pageIndex - 1;
			this.pageIndex = this.pageIndex < 0 ? 0 : this.pageIndex;

			this.gotoPage( this.pageIndex );
		};

		this.next = function(){
			this.pageIndex = this.pageIndex + 1;
			this.pageIndex = this.pageIndex >= this.pageCount ? this.pageCount - 1 : this.pageIndex;

			this.gotoPage( this.pageIndex );
		};

		this.gotoPage = function(index){			
			this.setButton(index);
			this.change(index);
		};

		this.setButton = function (index) {
			if(index + 1 == this.pageCount){
                this.btnNext.find(".enabled").hide();
                this.btnNext.find(".disabled").show();
            }else{
                this.btnNext.find(".enabled").show();
                this.btnNext.find(".disabled").hide();
            }

            if(index == 0){
                this.btnPrev.find(".enabled").hide();
                this.btnPrev.find(".disabled").show();
            }else{
                this.btnPrev.find(".enabled").show();
                this.btnPrev.find(".disabled").hide();
            }
		};

		this.change = function( index ) {
			var _this = this;
			var moveRange = index * (this.range * this.pageSize) * -1 + this.range;
			
			this.parentElements.animate({
				"margin-left":moveRange
			}, this.time, function () {
				_this.onChange(_this.pageIndex);
			});	
		};

		this.getType = function (type) {
			switch(type){
				case this.TYPE.FREE:
					return "";
					break;
				case this.TYPE.CHARGE: 
					return '<span class="scroll_spanTwo">5元</span>';
					break;
				case this.TYPE.TIME:
					return '<span class="scroll_spanOne">限免</span>';
					break;
				case this.TYPE.SOLE:
					return '<span class="scroll_spanThree">买断</span>';
					break;
			}
		};

		this.onChange = function( index ){
			
		};

		this.template = [
			'<li>',
				'<div class="scrollBox"><%=type%></div>',
				'<p class="scroll_li_name"><%-title%></p>',
			'</li>'
		].join("\n");

		this.init();
	});
})(jQuery, _, WE);
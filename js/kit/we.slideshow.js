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
	
	WE.namespace("WE.SlidesShow", function (options) {

		this.currentIndex = options.index || 0;
		this.elements = options.elements;
		this.parentElements = options.parentElements;
		this.length = this.elements.length;
		this.time = options.time || 2000;
		this.animation = options.animation || 'fade';
		this.isStart = options.isStart ? options.isStart : 1;

		this.init = function(){
			
			this.regEvent();	
			this.interid = 0;
			
			if(this[this.animation]){
				this.change = this[this.animation];
			}else{
				this.change = this.fade;
			}
			
			if(this.isStart){
				this.start();
			}	
		};

		this.regEvent = function(){
			var _this = this;
			
			this.parentElements && this.parentElements.mouseover(function(){
				_this.stop();
			}).mouseout(function(){
				_this.start();
			});
		};

		this.start = function(){
			var _this = this;
			
			this.stop();			
			this.interid = setInterval(function(){
				_this.next();
			}, this.time);
			
		};

		this.stop = function(){
			clearInterval(this.interid);
		};

		this.prev = function(){
			var index = this.currentIndex - 1;			
			this.gotoPage( index );
		};

		this.next = function(){
			var index = this.currentIndex + 1;						
			this.gotoPage( index );
		};

		this.gotoPage = function(index){
			index = index < 0 ? this.length - 1 : index;
			index = index >= this.length ? 0 : index;
			this.stop();
			this.change(index);
			this.start();
		};

		this.change = function( index ){	
			
		};

		this.cut = function( index ){			
			var range = this.elements.eq(this.currentIndex).width();
			var moveRange = index * range * -1;
			
			this.parentElements.css({
				'margin-left': moveRange
			});
			
			this.currentIndex = index;
			this.onChange( this.currentIndex );		
		};

		this.fade = function( index ){
		
			
			this.elements.eq(this.currentIndex).stop(true, true).fadeOut().clearQueue();
			this.elements.eq(index).stop(true, true).fadeIn().clearQueue();	
			this.currentIndex = index;
			this.onChange( this.currentIndex );
		};

		this.onChange = function( index ){
			
		};
	});
})(jQuery, _, WE);
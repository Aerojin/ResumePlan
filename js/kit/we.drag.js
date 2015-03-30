/******************************* **************************************************************
拖拽组件
 2015.03.10
 AeroJin 
 ***********************************************************************************************/
;(function ($, _, WE) {
    WE.namespace("WE.Drag", function (options) {
    	var _this = this;

    	this.document = $(document);
    	this.dragClass = options.dragClass;
    	this.dragTable = options.dragTable;
    	this.dragElement = options.dragElement;
    	this.moveElement = options.moveElement;
    	this.isIE = $.browser.msie ? true : false;
    	this.column = this.dragTable.find("tr:first td");
    	this.opacity = options.opacity ? options.opacity : 60;

        this.onMouseUp = options.onMouseUp || function () {};
        this.onMouseDown = options.onMouseDown || function () {};

    	this.init = function () {
    		this.tmpX = 0;
	        this.tmpY = 0;
	        this.cells = [];
	        this.moveable = false;
	        this.dragArray = [];
	        this.borderWidth = 4;
	        this.currentCells = null;
	        this.originDragDiv = null;

	        for(var i = 0; i < this.column.length; i++){
	        	var column = this.column.eq(i);
	        	var offset = column.offset();

	        	this.cells.push({
	        		index: i,
	        		width: column.width(),
	        		left: offset.left,
	        		top: offset.top,
	        		element: column
	        	});
	        }

    		this.setArea();
    		this.regEvent();
    	};

    	this.regEvent = function () {
    		this.dragElement.mousedown(function (event) {
    			_this.onMouseDown($(this));
                _this.mousedown(event);
    		});
    	};

    	this.mousedown = function (ev) {
    		//只允许通过鼠标左键进行拖拽,IE鼠标左键为1 FireFox为0
    		if (ev.button ==2) {
                return false;
            }

            //处理特殊情况：在最上/下面MOVE时不碰到现有DIV的情况下，又回到起始拖拽的列最上/下方
            var tmpColId;
            for (c = 0; c < this.cells.length; c++) {
            	if(this.cells[c].element.find(this.moveElement).length > 0){
            		tmpColId = c;
            		this.currentCells = this.cells[c];
            		break;
            	}
            }

            var tmpPosFirstChild = this.getElementPos(this.currentCells.element.find(this.dragClass).eq(0));
            var tmpPosLastChild = this.getElementPos(this.currentCells.element.find(this.dragClass).eq(-1));
            var tmpObj = { colId: tmpColId, firstChildUp: tmpPosFirstChild.y, lastChildDown: tmpPosLastChild.y + this.currentCells.element.find(this.dragClass).eq(-1).height()};

            //保存当前可拖拽各容器的所在位置
            this.dragArray = this.regDragsPos();
            this.dashedElement = this.createDashed();
            this.moveElement.after(this.dashedElement);

            //拖动时变为absolute
            this.moveable = true;
            this.moveElement.css({
            	"width": this.moveElement.width(),
            	"position": "absolute",
            	"z-index": this.getZindex() + 1
            });

            var downPos = {
            	x: ev.pageX,
            	y: ev.pageY
            };

            this.tmpX = downPos.x - this.moveElement.get(0).offsetLeft;
            this.tmpY = downPos.y - this.moveElement.get(0).offsetTop;

            if (this.isIE) {
                this.moveElement.get(0).setCapture();
            } else {
                window.captureEvents(Event.mousemove);
            }

            this.setOpacity(this.moveElement, this.opacity);

            //FireFox 去除容器内拖拽图片问题
            if (ev.preventDefault) {
                ev.preventDefault();
                ev.stopPropagation();
            }

            this.document.bind("mousemove", function (event) {
            	_this.mousemove(event, tmpObj);
            });

            this.document.bind("mouseup", function (event) {
            	_this.mouseup(event);
            });
    	};

    	this.mousemove = function (ev, tmpObj) {
    		if (this.moveable) {
                //IE 去除容器内拖拽图片问题
                if (this.isIE){ //IE
                    ev.returnValue = false;
                }

                var movePos = {
                    x: ev.pageX,
                    y: ev.pageY
                };

	            var top = Math.max(Math.min(movePos.y - this.tmpY, this.dragArea.maxBottom), this.dragArea.maxTop);
	            var left = Math.max(Math.min(movePos.x - this.tmpX, this.dragArea.maxRight), this.dragArea.maxLeft);

	            this.moveElement.css({
	            	top: top,
	            	left: left
	            });

	            var width = 0;
	            var drag = null;
                var targetDiv = null;
                for (var k = 0; k < this.dragArray.length; k++) {
                    drag = this.dragArray[k];

                    if (this.moveElement.attr("id") == drag.DragId) {
                        continue;
                    }

                    if (movePos.x > drag.PosLeft && movePos.x < drag.PosLeft + drag.PosWidth
                        && movePos.y > drag.PosTop && movePos.y < drag.PosTop + drag.PosHeight
                    ) {
                        targetDiv = $("#" + drag.DragId);
                    	width = this.currentCells.width - this.borderWidth;

                        if (movePos.y < drag.PosTop + drag.PosHeight / 2) {
                            //往上移
                            this.dashedElement.css({
                            	width: width
                            }).insertBefore(targetDiv);
                        }
                        else {
                            //往下移
                            this.dashedElement.css({
                            	width: width
                            }).insertAfter(targetDiv);
                        }
                        break;
                    }
                }

                if(!targetDiv){
                    for (j = 0; j < this.cells.length; j++) {
                    	var cells = this.cells[j];
                        var startLeft = cells.left;
                        var element = cells.element.find(this.dragClass);

                        if (movePos.x > startLeft && movePos.x < startLeft + cells.width) {
                            ///列无DIV
                            if (element.length == 0) {
                            	this.dashedElement.css({
                            		width: this.currentCells.width - this.borderWidth
                            	}).appendTo(cells.element);
                            }else {
                                var posFirstChild = this.getElementPos(element.eq(0));
                                var posLastChild = this.getElementPos(element.eq(-1));
                                //处理特殊情况：在最上/下面MOVE时不碰到现有DIV的情况下，又回到起始拖拽的列最上/下方
                                var tmpUp, tmpDown;
                                if (this.currentCells.index == j) {
                                    tmpUp = tmpObj.firstChildUp;
                                    tmpDown = tmpObj.lastChildDown;
                                } else {
                                    tmpUp = posFirstChild.y;
                                    tmpDown = posLastChild.y + element.eq(-1).height();
                                }

                                if (movePos.y < tmpUp) {///从最上面插入虚线框
                                	this.dashedElement.css({
                                		width: this.currentCells.width - this.borderWidth
                                	}).insertBefore(element.eq(0));
                                } else if (movePos.y > tmpDown) {///从最下面插入虚线框
                                	this.dashedElement.css({
                                		width: this.currentCells.width - this.borderWidth
                                	}).appendTo(cells.element);
                                }
                            }
                        }
                    }
                }
    		}
    	};

    	this.mouseup = function (ev) {
    		if (this.moveable) {
                if (this.isIE) {
                    this.moveElement.get(0).releaseCapture();
                } else {
                    window.releaseEvents(this.moveElement.get(0).mousemove);
                }

				this.document.unbind("mouseup");
                this.document.unbind("mousemove");

                this.setOpacity(this.moveElement, 100);
                this.moveable = false;
                this.tmpX = 0;
                this.tmpY = 0;

                //务必写在此IF内
                this.moveElement.css({
                	left: "",
                	top: "",
                	width: "",
                	position: "",
                    "z-index": ""
                });

                this.dashedElement.before(this.moveElement);
                this.dashedElement.remove();                
                this.onMouseUp(this.moveElement);
            }
    	};

    	this.createDashed = function () {
    		//插入虚线框
            var dashedElement = $("<div></div>");            
	            dashedElement.css({
	            	"position": "position",
	            	"margin-bottom": "6px",
	            	"border": " dashed 2px #aaa ",
	            	"width":  this.currentCells.width - this.borderWidth + "px",
	            	"height": this.moveElement.height() - this.borderWidth + "px"
	            });

            return $(dashedElement);
    	};

    	this.setArea = function (area) {
    		this.dragArea = { 
    			maxLeft: -9999,
    		 	maxRight: 9999,
    		 	maxTop: -9999,
    		 	maxBottom: 9999
    		 };

	    	if (area) {
	            if (area.left && !isNaN(parseInt(area.left))) { this.dragArea.maxLeft = area.left };
	            if (area.right && !isNaN(parseInt(area.right))) { this.dragArea.maxRight = area.right };
	            if (area.top && !isNaN(parseInt(area.top))) { this.dragArea.maxTop = area.top };
	            if (area.bottom && !isNaN(parseInt(area.bottom))) { this.dragArea.maxBottom = area.bottom };
	        }
    	};

    	this.setOpacity = function(dragDiv, n) {
	        dragDiv.css({opacity: n / 100});
	    };

	    this.getZindex =  function() {
		    var maxZindex = 0;
		    var divs = $("div");

		    for (z = 0; z < divs.length; z++) {
                if($.isNumeric(divs.eq(z).css("z-index"))){
                    maxZindex = Math.max(maxZindex, parseInt(divs.eq(z).css("z-index")));
                }
		    }

		    return maxZindex;
		};

		this.regDragsPos = function() {
		    var div
		    var arrDragDivs = new Array();
		    var dragDiv = this.dragTable.find(".dragDiv:visible");

		    for (i = 0; i < dragDiv.length; i++) {
		        div = this.getElementPos(dragDiv.eq(i));

		        arrDragDivs.push({ 
		        	DragId:  div.id,
		        	PosLeft: div.x,
		        	PosTop: div.y,
		        	PosWidth: div.width,
		        	PosHeight: div.height
		        });
		    }

		    return arrDragDivs;
		};

        this.getElement = function () {
            return this.moveElement;
        };

		this.getElementPos = function (dom) {
			var id = dom.attr("id");
			var offset = dom.offset();

			return {
				id: id,
				y: offset.top,
				x: offset.left,
				width: dom.width(),
				height: dom.height()
			};
		};

		this.init();
    });
})(jQuery, _, WE);
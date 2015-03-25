var WE;
;(function (jQuery, Backbone) {
	WE = {};
	window.$App = {};
	WE.BaseCore = Backbone.Model.extend({
		initialize: function () {
			
		},		
		/**
		*声明命名空间与对应的JS对象
		*@param {Stirng} namespace 名称空间，比如M139.dom
		*@param {Object} obj 名称空间对应的JS对象
		*@param {Window} win 注册名称空间的window对象
		* @example
		* WE.core.namespace("WE.dom",{ hasClass:function(){} });
		*/
		namespace: function (namespace, obj, win) {
			var path = namespace.split(".");
			var target = win || window;
			while (path.length > 0) {
				var p = path.shift();
				if (!target[p]) {
					if (path.length > 0) {
						target[p] = {};
					} else {
						target[p] = obj || {};
					}
				} else {
					if (path.length == 0) {
						target[p] = jQuery.extend(target[p], obj);
					}
				}
				target = target[p];
			}
			/**命名空间注册产生的事件
				* @name WE.Core#namespace
				* @event
				* @param {String} ns 加载成功的命名空间
				* @example WE.core.on("namespace",function(ns){});
			*/
			this.trigger("namespace", namespace);
			return target;
		},
		/**
		*动态加载script标签
		*@param {Object} options 配置
		*@param {Stirng} options.id script标签的id ; 
		*@param {Stirng} options.src JS文件地址（完整路径）; 
		*@param {Stirng} options.charset 给script标签加charset属性
		*@param {Function} callback 加载完成的回调
		*@example
		*WE.core.utilCreateScriptTag(
			 {
				id:"examplejs",
				src:"http://images.139cm.com/m2012/richmail/js/example.js",
				charset:"utf-8"
			 },
			 function(){
				 alert("文件加载完毕");
			 }
		*);
		*/
		utilCreateScriptTag: function (options, callback) {
			var This = this;
			if (callback) {
				var _callback = callback;
				var callback = function (e) {
					_callback.call(This,e);
				}
			}
			var scriptId = options.id;
			var dataHref = this.getScriptPath(options.src);
			var charset = options.charset;
			var isReady = false;
			var head = document.getElementsByTagName("head")[0];
			var objScript = scriptId && document.getElementById(scriptId);
			//是否移出脚本DOM(非IE9时处理)
			var isRemoveScriptDom = !document.all && true || false,
			browserVersion = ["trident/7.0", "msie 10.0", "msie 9.0", "chrome", "firefox"],
			i = 0, bvLenght = browserVersion.length - 1,
			currVersion = window.navigator.userAgent.toLowerCase() || "";
			//IE9、chrome、firefox时处理
			while (i <= bvLenght) {
				isRemoveScriptDom = currVersion.indexOf(browserVersion[i]) > -1 && true || false;
				if (isRemoveScriptDom) {
					break;
				}
				i++;
			}
			browserVersion = null;
			try {
				if (objScript && isRemoveScriptDom) {
					objScript.src = "";
					objScript.parentNode.removeChild(objScript);
					objScript = null;
				}
			}
			catch (e) { }
			if (objScript != null) {
				if (dataHref.indexOf("?") == -1) dataHref += "?";
				dataHref += "&" + Math.random();
				objScript.src = dataHref;
				var dataScript = objScript;
			} else {
				var dataScript = document.createElement("script");
				if (scriptId) {
					dataScript.id = scriptId;
				}
				if (charset) {
					dataScript.charset = charset;
				}
				try {
					if (dataHref.indexOf("?") == -1) {
						dataHref = M139.Text.Url.makeUrl(dataHref, {
							sid: top.$App.getSid()
						});
					}
				} catch (e) {
				}
				dataScript.src = dataHref;
				dataScript.defer = true;
				dataScript.type = "text/javascript";
				head.appendChild(dataScript);
			}
			if (document.all) {
				dataScript.onreadystatechange = function () {
					if (dataScript.readyState == "loaded" || dataScript.readyState == "complete") {
						isReady = true;
						if (callback) callback();
					}
				}
			} else {
				dataScript.onload = function () {
					isReady = true;
					if (callback) callback();
				}
				dataScript.onerror = function () {
					isReady = true;
					if (callback) callback(false);
				}
			}
		}
	});
	
	//静态实例化
    WE.BaseCore = new WE.BaseCore({
        jsPath: "/m2012/js"
    });

    WE.namespace = function () {
        WE.BaseCore.namespace.apply(WE.BaseCore, arguments);
    };	
})(jQuery, Backbone);
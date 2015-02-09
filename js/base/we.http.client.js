;(function (Backbone, $) {
	WE.HttpClient = Backbone.Model.extend({
		initialize: function (options) {
			
		},
		/**
        *AJAX方法的封装 *注：每一次ajax方法都会重新创建一个XMLHttpRequest对象，因此可以重复发请求
        *@param {Object} options 配置参数
        *@param {String} options.url 请求提交的地址
        *@param {String} options.method http方法，post或者get，默认是get
        *@param {String} options.data 发送的数据，一般为String类型，如果data为对象，则默认以url-encoding的方式转换为key=value&key1=
        *@param {Number} options.timeout http方法，请求超时时间设置(毫秒)，为了避免阻塞其它请求，timeout还是很有必要的
        *@param {Object} options.headers http头设置，比如：Content-Type
        *@param {Function} callback 响应回调，自动监听为 client.on("response",callback);
        *@returns {WE.HttpClient} 返回对象自身
        *@example
        httpClient.request(
            {
                method:"post",
                timeout:10000,
                url:"/s?func=mbox:listMessage",
                headers:{
                    "Content-Type":"text/javascript"
                }
            },
            function(e){
                console.log(e.status);//http返回码，200,404等
                console.log(e.isTimeout);//返回是否超时
                console.log(e.responseText);//http返回码，200,404等
                console.log(e.getHeaders());//返回的http头集合，使用函数因为默认处理http头会消耗性能
            }
        );
        */
		request: function (options, callback) {
			var This = this;
			this.requestOptions = options;
            
            if (this.xhr) {
                throw "一个HTTPClient实例只能执行一次request操作";
            }

            //在时间中处理是否要取消当前请求（改为从代理页发起）
            this.trigger("beforerequest", options, callback);

            if (options.cancel) {
                if (options.async === false) {
                    return options.responseResult;
                } else {
                    return this;
                }
            }

            var xhr = this.xhr = this.utilCreateXHR(options);

            if (options.timeout) {
                var timer = setTimeout(function () {
                    if (xhr.readyState == 3 && xhr.status == 200) return;
                    xhr.abort();
                    This.onTimeout();
                }, options.timeout);
            }

            if (callback) {
                this.on("response", callback);
            }

            xhr.onreadystatechange = function (data) {
                //同步的ajax已在外面做了处理
                if (options.async === false) {
                    return;
                }

                if (xhr.readyState == 4 && xhr.status != 0) {//abort()后xhr.status为0
                    clearTimeout(timer);

                    var _status = xhr.status;

                    //httpStatus=1223是IE的一个bug，会将204状态码变为1223
                    //http://bugs.jquery.com/ticket/1450
                    //204状态是指服务器成功处理了客户端请求，但服务器无返回内容。204是HTTP中数据量最少的响应状态
                    if (1223 === _status && window.ActiveXObject) {
                        _status = 204;
                    }

                    if (_status == 304 || (_status >= 200 && _status < 300)) {
                        //保存服务时间，协助M139.Date.getServerTime()
                        var headers = This.utilGetHttpHeaders(xhr);

                        if (headers && headers["Date"]) {
                            var servreTime = new Date(headers["Date"]);
                            //M139._ServerTime_ = servreTime;
                            //M139._ClientDiffTime_ = new Date() - servreTime;
                        }

                        This.onResponse({
                            responseText: xhr.responseText,
                            status: _status,
                            getHeaders: function () {
                                return This.utilGetHttpHeaders(xhr);
                            }
                        });
                    } else {
                        This.onError({
                            status: _status,
                            responseText: xhr.responseText
                        });                       
                    }
                }
            }

            var data = options.data;
            var method = options.method || "get";            

            //如果到了这里data仍为object类型，则自动转化为urlencoded
            if (typeof data == "object") {
                data = [];
                for (var p in options.data) {
                    data.push(p + "=" + encodeURIComponent(options.data[p]));
                }
                data = data.join("&");
                if (!options.headers) options.headers = {};
                if (!options.headers["Content-Type"]) {
                    options.headers["Content-Type"] = "application/x-www-form-urlencoded";
                }
            }

            if (method.toLowerCase() == "get" && typeof data == "string") {
                options.url += "&" + data;
                data = "";
            }

            xhr.open(method, options.url, options.async !== false);

            this.utilSetHttpHeaders(options.headers, xhr);
           
            //同步ajax
            if (options.async === false) {
                xhr.send(data);
                clearTimeout(timer);
                if (xhr.status == 304 || (xhr.status >= 200 && xhr.status < 300)) {
                    return This.onResponse({
                        responseText: xhr.responseText,
                        status: xhr.status,
                        getHeaders: function () {
                            return This.utilGetHttpHeaders(xhr);
                        }
                    });
                } else {
                    return This.onError({
                        status: xhr.status,
                        responseText: xhr.responseText
                    });
                }
            } else {
                xhr.send(data);
                return this;
            }
		},
		abort: function (options) {
            this.xhr.abort();
            this.onAbort();
            return this;
        },
        /**@static*/
        utilCreateXHR: function (options) {
            //return new XMLHttpRequest();
            var win = (options && options.window) || window;
            if (win.XMLHttpRequest) {
                return new win.XMLHttpRequest();
            }else {
                var MSXML = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'Microsoft.XMLHTTP'];
                for (var n = 0; n < MSXML.length; n++) {
                    try {
                        return new win.ActiveXObject(MSXML[n]);
                        break;
                    }
                    catch (e) {
                    }
                }
            }
        },
        /**@static*/
        utilSetHttpHeaders: function (headers, xhr) {
            if (headers) {
                for (var p in headers) {
                    xhr.setRequestHeader(p, headers[p]);
                }
            }
        },
        /**@static*/
        utilGetHttpHeaders: function (xhr) {
            var lines = xhr.getAllResponseHeaders();
            var result = {};
            if (lines) {
                lines = lines.split(/\r?\n/);
                for (var i = 0; i < lines.length; i++) {
                    var l = lines[i];
                    var arr = l.split(": ");
                    var h = arr[0].replace(/^\w|-\w/g, function (v) { return v.toUpperCase(); }); //服务端有可能返回小写的头
                    if (h && arr[1]) {
                        result[h] = arr[1];
                    }
                }
            }
            return result;
        },
        /**@inner*/
        onAbort: function () {
            /**请求被中断事件
                * @name WE.HTTPClient#abort
                * @event
                * @param {Object} e 事件参数
                * @example
                httpClient.on("abort",function(e){
                });
            */
            this.trigger("abort");
        },
        /**@inner*/
        onResponse: function (info) {
            /**服务端响应事件
                * @name WE.HTTPClient#response
                * @event
                * @param {Object} e 事件参数
                * @param {Object} e.responseText 服务端响应报文
                * @param {Object} e.getHeaders() 获得响应头
                * @example
                httpClient.on("response",function(e){
                    console.log(e.status);
                    console.log(e.responseText);
                    console.log(e.getHeaders());
                });
            */
            this.trigger("response", info);
            return info;
        },
        /**
            *@inner
        */
        onError: function (e) {
            /**服务端异常事件
                * @name WE.HTTPClient#error
                * @event
                * @param {Object} e 事件参数
                * @example
                httpClient.on("error",function(e){
                    console.log(e.status);
                    console.log(e.responseText);
                });
            */
            this.trigger("error", e);
        },
        /**@inner*/
        onTimeout: function () {
            /**服务端超时事件
                * @name WE.HTTPClient#timeout
                * @event
                * @param {Object} e 事件参数
                * @example
                httpClient.on("timeout",function(e){
                });
            */
            this.trigger("timeout");
        }
	});
})(Backbone, jQuery);
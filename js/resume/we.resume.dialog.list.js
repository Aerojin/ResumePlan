;(function (WE, jQuery, Backbone) {

    var _class = "WE.Resume.List";  

    WE.namespace(_class, function (options) {

        /*
            [{
                title: "111"
            }];
        */

        this.key = options.key;
        this.data = options.data;
        this.container = options.container;

        this.init = function () {
            var html = [];
            var len = this.data.length;
            var template = _.template(this.template);

            for(var i = 0; i < len; i++){
                html.push(template({
                    index: i,
                    num: i + 1,
                    title: this.data[i].title
                }));
            }

            this.container.html(html.join("\n"));

            this.ui = {};
            this.ui.wrap = this.container;
            this.ui.li = this.ui.wrap.find("li");
            this.ui.btnRemove = this.ui.wrap.find(".btn-remove");

            this.regEvents();
        };

        this.regEvents = function () {
            var _this = this;

            this.ui.btnRemove.click(function () {
                var index = $(this).data("index");
                var data = _this.data[index];

                _this.onRemove(data, index);

                return false;
            });

            this.ui.li.click(function () {
                var index = $(this).data("index");
                var data = _this.data[index];

                _this.ui.li.removeClass("focus");
                _this.ui.li.eq(index).addClass("focus");

                _this.onChange(data, index);
            });

            this.ui.li.hover(function () {
                $(this).addClass("hover");
            },function () {
                $(this).removeClass("hover");
            });
        };

        this.remove = function (index) {
            this.ui.li.get(index).remove();
        };

        this.onRemove = function (data, index) {

        }; 

        this.onChange = function (data, index) {

        };

        this.render = function (options) {
            this.data = options.data;
            this.init();
        };

        this.template = [
        '<li class="clearfix" data-index="<%-index%>">',
            '<a href="javascript:void(0);" data-index="<%-index%>" class="i_icoCloseSmall btn-remove"></a>',
            '<span><%-num%></span>',
            '<p><%-title%></p>',
        '</li>'].join("\n");

        this.init();
    });
})(WE, jQuery, Backbone);
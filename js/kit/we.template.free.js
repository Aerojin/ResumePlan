;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Template.Free";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: ['<li id="<%-cid%>-item">',
                    '<div class="templateLi hover-info">',
                        '<img src="<%-image%>" alt="" title="" />',
                        '<span class="blackBg hover background" style="display:none;"></span>',
                        '<a href="javascript:void(0);" class="i_icoAdd hover btn-add" style="display:none;"></a>',
                        '<a href="javascript:void(0);" class="btnCollect btn-collect">',
                            '<i class="i_icoStarB"></i>收藏',
                        '</a>',
                    '</div>',
                    '<p class="templateP"><%-title%></p>',
                '</li>'].join("\n"),

         collect: false,       

        initialize: function (options) {

            this.title = options.title;
            this.image = options.image;
            this.collect = options.collect;
           
            this.render();
            this.initEvents();
        },

        initEvents: function () {
            var _this = this;

            this.ui.wrap.hover(function () {
                _this.ui.hover.show();
            }, function () {
                _this.ui.hover.hide();
            });

            this.ui.btnAdd.click(function () {
                WE.UI.alert("添加成功!");
            });

            this.ui.btnCollect.click(function () {
                _this.collect = !_this.collect;
                
                if(_this.collect){
                    $(this).html('<i class="i_icoStarA"></i>取消');
                }else{
                    $(this).html('<i class="i_icoStarB"></i>收藏');
                }
            });
        },

        render: function () {
            var template = _.template(this.template);
                template = template({
                    cid: this.cid,
                    image: this.image,
                    title: this.title
                });

            this.ui = {};
            this.ui.wrap = $(template);
            this.ui.hover = this.ui.wrap.find(".hover");
            this.ui.btnAdd = this.ui.wrap.find(".btn-add");
            this.ui.btnCollect = this.ui.wrap.find(".btn-collect");
            this.ui.background = this.ui.wrap.find(".background");
        },

        getElement: function  (argument) {
            return this.ui.wrap;
        }


    }));

})(WE, jQuery, Backbone);
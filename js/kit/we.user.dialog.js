;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.User.Dialog";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        pageIndex: 0,

        pageCount: 0,

        pageSize: 1,

        list: [],

        initialize: function (options) {

            this.list = options.list || [];
            this.showButton = options.showButton || false;

            this.pageCount = this.list.length - 1;

            this.render();
            this.initEvents();
            this.loadPage();
        },

        initEvents: function () {
            var _this = this;

            this.ui.btnPrev.find(".enabled").click(function () {
                _this.prev();
            });

            this.ui.btnNext.find(".enabled").click(function () {
                _this.next();
            });

            this.ui.content.click(function () {
                return false;
            });

            this.ui.button.click(function () {
                return false;
            });

            this.ui.wrap.click( function () {
                _this.close();
            });

        },

        render: function () {
            var template = _.template(this.template);
                template = template({cid: this.cid});

            this.ui= {};
            this.ui.html = $('html');
            this.ui.body = $("body");
            this.ui.wrap = $(template);
            this.ui.mask = $(this.maskTmpl);
            this.ui.button = this.ui.wrap.find(".button");
            this.ui.btnPrev = this.ui.wrap.find(".btn-prev");
            this.ui.btnNext = this.ui.wrap.find(".btn-next");
            this.ui.content = this.getCidEl("content", this.ui.wrap);
            //this.ui.container = this.getCidEl("container", this.ui.wrap);
            

            if(this.showButton){
                this.ui.button.show();
            }

            this.ui.body.append(this.ui.mask);
            this.ui.body.append(this.ui.wrap);
            this.ui.html.css({'padding-right': '17px','margin': '0px', 'overflow-y': 'hidden'});
            //this.ui.container.css({"z-index": 10, "width": "100%", "position": "relative", "text-align": "center"});
        },

        prev: function () {
            this.pageIndex -= 1;
            this.pageIndex = this.pageIndex <= 0 ? 0 : this.pageIndex;

            this.loadPage();
        },

        next: function () {
            this.pageIndex += 1;
            this.pageIndex = this.pageIndex >= this.pageCount ? this.pageCount : this.pageIndex;

            this.loadPage();
        },

        loadPage: function () {
            if(this.pageIndex == this.pageCount){
                this.ui.btnNext.find(".enabled").hide();
                this.ui.btnNext.find(".disabled").show();
            }else{
                this.ui.btnNext.find(".enabled").show();
                this.ui.btnNext.find(".disabled").hide();
            }

            if(this.pageIndex == 0){
                this.ui.btnPrev.find(".enabled").hide();
                this.ui.btnPrev.find(".disabled").show();
            }else{
                this.ui.btnPrev.find(".enabled").show();
                this.ui.btnPrev.find(".disabled").hide();
            }

            var data = this.list[this.pageIndex];
            var item = new WE.User.Item(data);

            this.ui.content.empty().append(item.getElement());
            item.animation();
        },

        close: function () {
            this.ui.wrap.remove();
            this.ui.mask.remove();
            this.ui.html.css({'padding-right': '0px', 'margin': '0px', 'overflow-y': 'auto'});
        },

        template: ['<div class="windowPreview" id="<%-cid%>-dialog">',
                    '<div class="imgnav"> ',
                        '<div id="img">',
                            '<ul id="<%-cid%>-content"></ul>',
                            '<div id="front" class="button btn-prev" title="上一张" style="display:none;">',
                                '<a href="javaScript:void(0);" class="pngFix enabled" style="display:none;"></a>',
                                '<a href="javaScript:void(0);" class="pngFix No disabled"></a>',
                            '</div>',
                            '<div id="next" class="button btn-next" title="下一张" style="display:none;">',
                                '<a href="javaScript:void(0);" class="pngFix enabled" style="display:none;"></a>',
                                '<a href="javaScript:void(0);" class="pngFix No disabled"></a>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join("\n"),

        maskTmpl: '<span class="blackBackground"></span>'


    }));

})(WE, jQuery, Backbone);


    
        
            
            
            
         
      

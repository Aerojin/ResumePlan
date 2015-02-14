;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Template";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                type: null
            };
        },

        TYPE: {
            FREE: 0,
            CHARGE: 1,
            TIME_LIMIT:2
        },

        initialize: function () {

        },

        initEvents: function () {

        }

    }));


})(WE, jQuery, Backbone);

;(function (WE, jQuery, Backbone) {

    WE.namespace("WE.Template.Main", function (options) {

        this.TYPE = {
            FREE: 0,
            CHARGE: 1,
            TIME:2
        };


        this.options = {};
        this.options.type = options.type || this.TYPE.FREE;
        this.options.title = options.title;
        this.options.image = options.image;
        this.options.time = options.time;
        this.options.state = options.state;
        this.options.collect = options.collect;
        this.options.lock  = options.lock || false;

        this.init = function () {

            switch(this.options.type){
                case this.TYPE.FREE:
                    this.template = new WE.Template.Free(this.options);
                    break;
                case this.TYPE.CHARGE:
                    this.template = new WE.Template.Charge(this.options);
                    break;
                case this.TYPE.TIME:
                    this.template = new WE.Template.Time(this.options);
                    break;
            }


        };

        this.getElement = function () {
            return this.template.getElement();
        };

        this.init();

    }); 



})(WE, jQuery, Backbone);
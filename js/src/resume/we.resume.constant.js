;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.Constant";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                base: true,
                education: true,
                school: true,
                work: true,
                skill: true,
                prize: true,
                evaluation: true,
                research: false,
                article: false,
                subject: false,
                hobbies: true
            };
        },      

        initialize: function () {
            this.initEvents();
        },

        initEvents: function () {

        },

        getChanged: function () {
            var changed = {};
            var object = this.changed;

            for(var key in object){
                changed.key = key;
                changed.value = object[key];

                break;
            }

            return changed;
        },

        getKey: function (key) {
            return this.get(key);
        },

        setKey: function (key) {
            var obj = {};
                obj[key] = !this.get(key);

            this.set(obj);
        }  

    }));

    //单例,保证按钮和模板间的交互同步
    WE.Resume.getConstant = function () {
        if(!window._CONSTANT){
            window._CONSTANT = new WE.Resume.Constant();
        }

        return window._CONSTANT;
    };


})(WE, jQuery, Backbone);
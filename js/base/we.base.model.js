/**
 * @fileOverview 定义Model基类.
 */

(function ($, _, WE) {    
    /**
   *@namespace
   */
    WE.Model = {};
    var superClass = Backbone.Model;
    WE.Model.ModelBase = superClass.extend(
    /**
    *@lends WE.Model.ModelBase.prototype
    */
    {
        /**
        *规范化的Model的基类,主要为了统一常用事件、方法的命名
        *它规定实例化的参数必须是Object类型，事件参数必须是Object类型，类必须有name属性
        *@constructs WE.Model.ModelBase
        *@require WE.Logger
        *@param {Object} options 参数集合
        *@example
        */
        initialize: function (options) {

            var name = this.name || this.get("name");

            if (name == null) {
                throw "继承自ModelBase的类型缺少name属性";
            }
            if (options && !_.isObject(options)) {
                throw "继承自ModelBase的类型初始化参数必须为Object类型";
            }
        },

        /**
         *覆盖基类的trigger方法，对事件参数给予约束，data必须是Object类型
         */
        trigger: function (eventName, data) {
            if (typeof data == "undefined") {
                data = {};
            }
            if (!_.isObject(data)) {
                throw this.get("name") + ".trigger(" + eventName + ")" + "方法必须使用Object数据参数";
            }
            try {
                return superClass.prototype.trigger.apply(this, arguments);
            } catch (ex) {
                console.error("trigger异常", ex.toString());
                //避免showtab事件中有异常，影响整个标签页切换
            }            
        }

    });

})(jQuery, _, WE);
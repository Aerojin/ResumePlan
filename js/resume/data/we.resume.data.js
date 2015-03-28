;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.DataInstance";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        defaults: function () {
            return {
                module: {}
            };
        },

        initialize: function (args, config) {
           
           this.data = args.data;
           this.config = config; 

           this.render();
           this.initEvents();
        },

        initEvents: function () {
            var _this = this;

            this.on("change:templateType", function (args) {
                this.set({module: args.data});
            });

            this.on("change:data", function (args) {
                if(this[args.key]){
                    this[args.key].reset(function(data){
                        _this.trigger("change:ui", {
                            key: args.key,
                            data: data
                        });
                    });
                }
            });

            this.on("remove:data", function (args) {
                if(this[args.key]){
                    this[args.key].remove(args.id, function (data) {
                        _this.trigger("change:ui", {
                            key: args.key,
                            data: data
                        });
                    });
                }
            });
        },

        render: function () {

            var parameter = {
                master: this,
                data: this.data
            };

            //创建主信息
            this.main = new WE.Resume.Data.Main(parameter);

            //创建基础信息
            this.base = new WE.Resume.Data.Base(parameter);

            //创建教育背景
            this.education = new WE.Resume.Data.Education(parameter);

            //创建校园经历
            this.school = new WE.Resume.Data.School(parameter);

            //创建工作经历
            this.work = new WE.Resume.Data.Work(parameter);

            //创建项目经历
            this.project = new WE.Resume.Data.Project(parameter);

            //创建技能信息
            this.skill = new WE.Resume.Data.Skill(parameter);

            //创建证书信息
            this.certificate = new WE.Resume.Data.Certificate(parameter);

            //创建获奖经历
            this.prize = new WE.Resume.Data.Prize(parameter);

            //创建科研经历
            this.research = new WE.Resume.Data.Research(parameter);

            //创建发表文章
            this.article = new WE.Resume.Data.Article(parameter);

            //创建自我评价
            this.evaluation = new WE.Resume.Data.Evaluation(parameter);

            //创建主修课程
            this.subject = new WE.Resume.Data.Subject(parameter);

            //创建爱好
            this.hobbies = new WE.Resume.Data.Hobbies(parameter);

            this.set({module: this.config.getConfig()});
        },

        getData: function (key) {
            if(this[key]){
                return this[key].getData();
            }

            return [];
        },
        
        getModule: function () {
            return this.get("module");
        },

        getModuleByKey: function (key) {
            var data = this.get("module");

            return data[key] || {};
        },

        setShow: function (key) {
            var data = this.get("module");          
            
            data[key] = $.extend(data[key], {
                show: !data[key].show
            });

            this.set({module: data});
            this.trigger("change:show", {
                key: key,
                value: data[key].show
            });
        },

        getShow: function (key) {
            var data = this.getModuleByKey(key);

            return data.show;
        },

        getLock: function (key) {
            var data = this.getModuleByKey(key);

            return data.lock;
        },


        getDrag: function () {
            var array = [];
            var data = this.get("module");

            for(var key in data){
                if(data[key].drag){
                    array.push(key);
                }
            }

            return array;
        }
    }));

    //单例,保证按钮和模板间的交互同步
    WE.Resume.getInstance = function (args) {
        if(!window._RESUME_DATA){
            var config = new WE.Resume.Data.Config(args);
            window._RESUME_DATA = new WE.Resume.DataInstance(args, config);
        }

        return window._RESUME_DATA;
    };
    


})(WE, jQuery, Backbone);
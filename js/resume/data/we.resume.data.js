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

            //创建基础信息
            this.base = new WE.Resume.Data.Base({master: this});
            this.base.setData(this.data[this.base.getTableName]);

            //创建教育背景
            this.education = new WE.Resume.Data.Education({master: this});
            this.education.setData(this.data[this.education.getTableName]);

            //创建校园经历
            this.school = new WE.Resume.Data.School({master: this});
            this.school.setData(this.data[this.school.getTableName]);

            //创建工作经历
            this.work = new WE.Resume.Data.Work({master: this});
            this.work.setData(this.data[this.work.getTableName]);

            //创建项目经历
            this.project = new WE.Resume.Data.Project({master: this});
            this.project.setData(this.data[this.project.getTableName]);

            //创建技能信息
            this.skill = new WE.Resume.Data.Skill({master: this});
            this.skill.setData(this.data[this.skill.getTableName]);

            //创建证书信息
            this.certificate = new WE.Resume.Data.Certificate({master: this});
            this.certificate.setData(this.data[this.certificate.getTableName]);

            //创建获奖经历
            this.prize = new WE.Resume.Data.Prize({master: this});
            this.prize.setData(this.data[this.prize.getTableName]);

            //创建科研经历
            this.research = new WE.Resume.Data.Research({master: this});
            this.research.setData(this.data[this.research.getTableName]);

            //创建发表文章
            this.article = new WE.Resume.Data.Article({master: this});
            this.article.setData(this.data[this.article.getTableName]);

            //创建自我评价
            this.evaluation = new WE.Resume.Data.Evaluation({master: this});
            this.evaluation.setData(this.data[this.evaluation.getTableName]);

            //创建主修课程
            this.subject = new WE.Resume.Data.Subject({master: this});
            this.subject.setData(this.data[this.subject.getTableName]);

            //创建爱好
            this.hobbies = new WE.Resume.Data.Hobbies({master: this});
            this.hobbies.setData(this.data[this.hobbies.getTableName]);

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
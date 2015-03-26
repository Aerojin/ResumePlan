;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.DataInstance";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                module: [
                    "base",
                    "education",
                    "school",
                    "work",
                    "project",
                    "ability",
                    "certificate",
                    "prize",
                    "evaluation",
                    "research",
                    "article",
                    "subject",
                    "hobbies"
                ]
            };
        },

        initialize: function () {
           
           this.render();
           this.setModule();
           this.initEvents();
        },

        initEvents: function () {
            var _this = this;

            this.on("change:data", function (args) {
                if(this[args.key]){
                    this[args.key].reset(function(data){
                        _this.trigger("change:ui", data);
                    });
                }
            });
        },

        render: function () {

            //创建基础信息
            this.base = new WE.Resume.Data.Base({
                isShow: true,
                isDrag: false,
                data: [{
                    id: "b001",
                    sex: "1",
                    political: "党员",
                    moblie: "13926572774",
                    email: "13926572774@139.com",
                    name: "金锐",
                    title: "金锐的工作简历",
                    job: "软件工程师",
                    pinyin: "jinrui",
                    photo: "../images/pic_10.jpg"
                }]
            });

            //创建教育背景
            this.education = new WE.Resume.Data.Education({
                isShow: true,
                isDrag: true,
                data: [{
                    id: "e001",
                    academic: "本科",
                    name: "武汉大学",
                    professional: "计算机科学",
                    startY: "2006",
                    startM: "09",
                    endY: "2010",
                    endM: "06",
                    gpa: "2.5/4.1",
                    sort: "前10"
                }]
            });

            //创建校园经历
            this.school = new WE.Resume.Data.School({
                isShow: true,
                isDrag: true,
                data: [{
                    id: "s001",
                    name: "人文系学生会",
                    position: "学生会主席",
                    startY: "2013",
                    startM: "5",
                    endY: "2013",
                    endM: "7",
                    context: "策划举办学院的院庆、毕业生晚会、新生晚会、学代会等各项活动与康师傅、雪碧、佳得乐等公司合作举办歌唱选秀、运动挑战赛(规模超过1000人)。"
                }]
            });

            //创建工作经历
            this.work = new WE.Resume.Data.Work({
                isShow: true,
                isDrag: true,
                data: [{
                    id: "s001",
                    name: "人文系学生会",
                    position: "学生会主席",
                    startY: "2013",
                    startM: "5",
                    endY: "2013",
                    endM: "7",
                    context: "策划举办学院的院庆、毕业生晚会、新生晚会、学代会等各项活动与康师傅、雪碧、佳得乐等公司合作举办歌唱选秀、运动挑战赛(规模超过1000人)。"
                }]
            });

            //创建项目经历
            this.project = new WE.Resume.Data.Project({
                isShow: true,
                isDrag: true,
                data: [{
                    id: "s001",
                    name: "人文系学生会",
                    position: "学生会主席",
                    startY: "2013",
                    startM: "5",
                    endY: "2013",
                    endM: "7",
                    context: "策划举办学院的院庆、毕业生晚会、新生晚会、学代会等各项活动与康师傅、雪碧、佳得乐等公司合作举办歌唱选秀、运动挑战赛(规模超过1000人)。"
                }]
            });

            //创建技能信息
            this.skill = new WE.Resume.Data.Skill({
                isShow: true,
                isDrag: true,
                data: [{
                    id: "a001",
                    name: "前端开发技术"
                }]
            });

            //创建证书信息
            this.certificate = new WE.Resume.Data.Certificate({
                isShow: true,
                isDrag: true,
                data: [{
                    id: "c001",
                    name: "计算机一级证书"
                }]
            });

            //创建获奖经历
            this.prize = new WE.Resume.Data.Prize({
                isShow: true,
                isDrag: true,
                data: [{
                    id: "p001",
                    name: "年度优秀员工",
                    jibie: "一级",
                    dateY: "2015",
                    dateM: "01"
                }]
            });

            //创建科研经历
            this.research = new WE.Resume.Data.Research({
                isShow: true,
                isDrag: true,
                data: [{
                    id: "r001",
                    name: "人文系学生会",
                    position: "学生会主席",
                    startY: "2013",
                    startM: "5",
                    endY: "2013",
                    endM: "7",
                    context: "策划举办学院的院庆、毕业生晚会、新生晚会、学代会等各项活动与康师傅、雪碧、佳得乐等公司合作举办歌唱选秀、运动挑战赛(规模超过1000人)。"
                }]
            });

            //创建发表文章
            this.article = new WE.Resume.Data.Article({
                isShow: true,
                isDrag: true,
                data: [{
                    id: "a001",
                    name: "人文系学生会",
                    title: "校园报刊",
                    dateY: "2015",
                    dateM: "3"
                }]
            });

            //创建自我评价
            this.evaluation = new WE.Resume.Data.Evaluation({
                isShow: true,
                isDrag: true,
                data: [{
                    id: "e001",
                    context: "人文系学生会"
                }]
            });

            //创建主修课程
            this.subject = new WE.Resume.Data.Subject({
                isShow: true,
                isDrag: true,
                data: [{
                    id: "e001",
                    context: "计算机科学"
                }]
            });

            //创建爱好
            this.hobbies = new WE.Resume.Data.Hobbies({
                isShow: true,
                isDrag: true,
                data: [{
                    id: "e001",
                    context: "羽毛球, 户外运动"
                }]
            });
        },

        getData: function (key) {
            if(this[key]){
                return this[key].getData();
            }

            return [];
        },

        setModule: function () {
            var obj = {};

            obj.base = {
                lock: 1,
                sort: 0,
                show: 1,
                drag: 0
            };

            obj.education = {
                lock: 1,
                sort: 1,
                show: 1,
                drag: 0
            };

            obj.school = {
                lock: 1,
                sort: 2,
                show: 1,
                drag: 1
            };

            obj.work = {
                lock: 1,
                sort: 3,
                show: 2,
                drag: 1
            };

            obj.project = {
                lock: 1,
                sort: 4,
                show: 2,
                drag: 1
            };

            obj.skill = {
                lock: 1,
                sort: 5,
                show: 2,
                drag: 1
            };

            obj.certificate = {
                lock: 1,
                sort: 6,
                show: 2,
                drag: 1
            };

            obj.prize = {
                lock: 0,
                sort: 7,
                show: 1,
                drag: 1
            };

            obj.evaluation = {
                lock: 0,
                sort: 8,
                show: 1,
                drag: 1
            };

            obj.research = {
                lock: 0,
                sort: 9,
                show: 0,
                drag: 1
            };

            obj.article = {
                lock: 0,
                sort: 10,
                show: 0,
                drag: 1
            };

            obj.subject = {
                lock: 0,
                sort: 11,
                show: 0,
                drag: 1
            };

            obj.hobbies = {
                lock: 0,
                sort: 12,
                show: 1,
                drag: 1
            };

            this.set({module: obj});
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
    WE.Resume.getInstance = function () {
        if(!window._RESUME_DATA){
            window._RESUME_DATA = new WE.Resume.DataInstance();
        }

        return window._RESUME_DATA;
    };
    


})(WE, jQuery, Backbone);
;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.Data";  

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
           
           this.render()
           this.initEvents();
        },

        initEvents: function () {
            this.on("changeShow", function (args) {
                //args.key
                //args.value
            });
        },

        render: function () {

            //创建基础信息
            this.base = new WE.Resume.Data.Base({
                isShow: true,
                isDrag: false,
                data: {
                    sex: "1",
                    political: "党员",
                    moblie: "13926572774",
                    email: "13926572774@139.com"
                    name: "金锐",
                    title: "金锐的工作简历",
                    job: "软件工程师",
                    pinyin: "jinrui",
                    photo: "../images/pic_10.jpg"
                }
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
            this.ability = new WE.Resume.Data.Ability({
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

        getModule: function () {
            return this.get("module");
        }
    }));

    //单例,保证按钮和模板间的交互同步
    WE.Resume.getInstance = function () {
        if(!window._RESUME_DATA){
            window._RESUME_DATA = new WE.Resume.Data();
        }

        return window._RESUME_DATA;
    };
    


})(WE, jQuery, Backbone);
;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.Data";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                sort: [
                    "base",
                    "education",
                    "school",
                    "work",
                    "skill",
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
                    gpa: "2.5/4.1"
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

            //创建工作经历
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
        },

        //创建基础信息
        createBase: function (data) {
            
        },

        //创建教育信息
        createEducation: function (data) {

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
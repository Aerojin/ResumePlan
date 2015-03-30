;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.Data.Config";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                
            };
        },      

        initialize: function (args) {
            this.sort = args.sort;
            this.type = args.type;

            if(this.sort && this.sort.length > 0){
                console.log("sort");
                var sort = $.parseJSON(this.sort[0].ser_sot);
                //var sort1 = sort.sort.replace(new RegExp("'","gi"), "\"");

                window._sort= sort;
                console.log("sort",sort);
                //this.sort = $.parseJSON(this.sort[0].ser_sot);
            }
        },

        getConfig: function () {
            if(this.sort){
                //return this.sort;
            }

            switch(this.type){
                case "0":
                    return this.getSingle();
                    break;
                case "1": 
                    return this.getDouble();
                    break;
            }
        },

        getSingle: function () {
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
                lock: 0,
                sort: 2,
                show: 1,
                drag: 1
            };

            obj.work = {
                lock: 0,
                sort: 3,
                show: 2,
                drag: 1
            };

            obj.project = {
                lock: 0,
                sort: 4,
                show: 2,
                drag: 1
            };

            obj.skill = {
                lock: 0,
                sort: 5,
                show: 2,
                drag: 1
            };

            obj.certificate = {
                lock: 0,
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

            return obj;
        },

        getDouble: function () {
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

            return obj;
        }
    }));


})(WE, jQuery, Backbone);
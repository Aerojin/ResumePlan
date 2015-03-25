;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Login.Main.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,  

        defaults: function () {
            return {
                state: null
            };            
        },

        STATE: {
            LOGIN: "login",
            FORGET: "forget",
            REGISTER: "register"
        },    

        initialize: function () {

        },

        initEvents: function () {

        }

    }));


})(WE, jQuery, Backbone);

;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Login.Main.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: "",

        initialize: function (options) {
            this.master = options.master;

            this.render();
            this.initEvents();
        },

        initEvents: function () {
            var _this = this;

            this.master.on("change:state", function () {
                var state = this.get("state");
                
                _this.createDialog();
                _this[state].render.call(_this);
            });

            this.ui.appLogin.click(function () {
                _this.showLogin();
            });
        },

        render: function () {
            this.ui = {};
            this.ui.appLogin = $("#app-login");
        },

        showLogin: function () {
            this.createDialog();
            this.master.set({state: this.master.STATE.LOGIN});
        },

        createDialog: function () {
            var _this = this;
            if(!this.dialog){
                this.dialog = new WE.Login.Dialog({
                    onClose: function () {
                        _this.dialog = null;
                        _this.master.set({state: null},{silent: true});
                    }
                });
            }
        },

        login: {
            render: function () {
                var _this = this;
                var view = new WE.Login.View({
                   dialog: this.dialog
                });

                view.on("forget", function () {
                    _this.master.set({state: _this.master.STATE.FORGET});
                });

                view.on("register", function () {
                    _this.master.set({state: _this.master.STATE.REGISTER});
                });
            }
        },
        register: {
            render: function () {
                var _this = this;
                var view = new WE.Register.View({
                   dialog: this.dialog
                });

                view.on("cancel", function () {
                    _this.master.set({state: _this.master.STATE.LOGIN});
                });
            }
        },
        forget: {
            render: function () {
                var _this = this;
                var view = new WE.Forget.View({
                    dialog:this.dialog
                });

                view.on("send", function () {
                    _this.dialog.close();
                });

                view.on("close", function () {
                    _this.master.set({state: _this.master.STATE.LOGIN});
                });
            }
        }

    }));

    $(function() {
        var master = new WE.Login.Main.Model();
        window.$App.Login = new WE.Login.Main.View({
            master: master
        });
    });

    

})(WE, jQuery, Backbone);
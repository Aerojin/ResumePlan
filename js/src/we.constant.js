;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Constant";  

    WE.namespace(_class, {
        COOKIE_USERID: "resume_userid",
        COOKIE_USER: "resume_user",
        COOKIE_PHOTO: "resume_photo",
        COOKIE_TOKEN: "resume_token"
    });
})(WE, jQuery, Backbone);
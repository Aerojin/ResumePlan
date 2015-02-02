 $(function(){
	//导航
	$(window).scroll(function (){
		var offsetTop = $(window).scrollTop();
		if (offsetTop>=1){
			$(".headerTop").addClass("headerTopFixed");
		}else{
			$(".headerTop").removeClass("headerTopFixed");
		}
	}); 

	//底部二维码
	$(".footerConBtn .btnE").hover(function(){
		$(this).siblings(".footerWindow").stop(true,true).fadeIn();
	},function(){
		$(this).siblings(".footerWindow").stop(true,true).fadeOut();
	});

	//选项卡
	var $li = $(".contentTabs_list li"),
			$content = $(".contentTabs li"),
			$index;

		$li.click(function(){
			$(this).addClass("focus").siblings().removeClass('focus');
			$index = $li.index($(this));
			$(".contentTabs li").removeClass("on");
			$content.eq($index).addClass("on").show().siblings().hide();
		});
	
	//登录
	$(".inputBox .input, .textareaBox textarea").focus(function(){
		$(this).siblings(".label").hide();
	});
	$(".inputBox").click(function(){
		$(this).find(".label").hide();
		$(this).find(".input").focus();
	});
	$(".inputBox .input, .textareaBox textarea").blur(function(){
		if($(this).val()==''){
			$(this).siblings(".label").show();
		}else{
			$(this).siblings(".label").hide();
		}
	});
	$(".window .i_icoClose").click(function(){
		$(this).parent(".window").fadeOut();
	});
	$(".btnLogin, .btnLoginA").click(function(){
		$(".window").fadeOut();
		$(".loginWindow").fadeIn();
	});
	$(".btnRegist").click(function(){
		$(".window").fadeOut();
		$(".registWindow").fadeIn();
	});
	$(".inputBox_span").click(function(){
		$(".window").fadeOut();
		$(".forgetWindow").fadeIn();
	});
	$(".btnSuccess").click(function(){
		$(".window").fadeOut();
		$(".successWindow").fadeIn();
	});
})
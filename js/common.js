 $(function(){
	//导航
	$(window).scroll(function (){
		var offsetTop = $(window).scrollTop();
		if (offsetTop>=1){
			$(".headerTopIndex").addClass("headerTopFixed");
		}else{
			$(".headerTopIndex").removeClass("headerTopFixed");
		}
		if (offsetTop>=62){
			$(".colorBox").addClass("colorBoxFoucs");
		}else{
			$(".colorBox").removeClass("colorBoxFoucs");
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

	var $lis = $(".tabs li"),
			$contents = $(".tabsCon"),
			$indexs;

		$lis.click(function(){
			$(this).addClass("focus").siblings().removeClass('focus');
			$indexs = $lis.index($(this));
			$contents.eq($indexs).show().siblings().hide();
		});
	/*
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
		$(".loginWindow").stop(true,true).fadeIn();
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
	*/

	//模板
	$(".i_icoClosesBtn, .btnIbtn, .i_icoCloseWBtn").click(function(){
		$(".whiteBackground, .windowWhite, .i_icoClosesBtn, .blackBackground, .windowPreview, .windowBox, .windowBoxA").fadeOut();
	});
	$(".i_icoPromptBtn").click(function(){
		$(".whiteBackground, .windowWhite, .i_icoClosesBtn").fadeIn();
	});
	$(".userInfo_img .i_icoLook").click(function(){
		$(".blackBackground, .windowPreview, .i_icoClosesBtn").fadeIn();
	});
	
	//幻灯片切换效果
	var n = 0;
	count=$(".item a").length;//显示区域的内容长度
	$(".item a").click(function(){
		$(this).addClass("seld").siblings().removeClass("seld");
		var _index=$(this).index();//分屏的数字索引
		$(".cont>a").eq(_index).fadeIn().siblings().fadeOut();
		n=_index;
	});
	t = setInterval(function(){
		n=n >=(count - 1)?0:++n;
		$(".item a").eq(n).trigger('click');
	},4000);//执行定义好的函数
	$(".customMadeBox").hover(function(){clearInterval(t)},function(){t=setInterval(function(){
		n = n >=(count - 1)?0:++n;
		$(".item a").eq(n).trigger('click');
	},4000);});                        
	
	//预览简历
	$(".userInfo_img").hover(function(){
		$(this).find(".i_icoCloseX, .i_icoLook").stop(true,true).fadeIn();
	},function(){
		$(this).find(".i_icoCloseX, .i_icoLook").stop(true,true).fadeOut();
	});
})
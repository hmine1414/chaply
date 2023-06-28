var frontUI = function() {
	var me = this;
	me.tablet = matchMedia("(max-width: 1279px)");
	me.mobile = matchMedia("(max-width: 1023px)");
	me.body = $("body");
	me.scrollbarWidth = window.innerWidth - $("body").width(); //modal Background ScrollBar
	me.scrollTop;

	$(document).ready(function(){
		me.firstLoad();

		$(".formgroup .inpbox input").focus(function() { 
			if(this.value == this.defaultValue) {
				this.value = "";
			}
			var myLabelParent = $(this).parent().parent().parent();
			myLabelParent.addClass("focusIn");
		}).blur(function() {
			if(!this.value.length) {
				this.value = this.defaultValue;
				var myLabelParent = $(this).parent().parent().parent();
				myLabelParent.removeClass("focusIn");
			}
		});

		$(".formgroup .optionbox select").click(function(){			
			var myLabelParent = $(this).parent().parent().parent();
			myLabelParent.addClass("focusIn");
			$(this).css("font-size", "1.4rem");
		});

	});

	$(window).resize(function(){
		me.modalResize();		
	});

	$(window).scroll(function(){
	});
}

frontUI.prototype = {
	firstLoad: function(){
		setTimeout(function(){
			$("#wrap").animate({opacity:1});
		}, 300)
	},
	allMenuToggle: function() {
		var me = this;
		
	},
	modalView: function(modalName, parentModal) {
		var me = this;
		var modalEl = $("."+modalName);
		var parentModal;
		var transparentLayer, transparentLayer2;		

		if(!parentModal){
			//$("html, body").animate({scrollTop:0}, 500);

			$(".modalpop").addClass("active");
			$(".modalpop").find(".popupwrap").removeClass("active");
			$("html, body").css("height", modalEl.height()+"px");
			$("#wrap").css("height", modalEl.height()+"px").css("overflow-y", "hidden");
			
			setTimeout(function(){
				if($("body > .pop-transparents-layer").length == 0) {
					$("body").append("<div class='pop-transparents-layer' style='opacity:0.4'></div>");
				}			
				modalEl.addClass("active");
			}, 500);

			transparentLayer = $("body > .pop-transparents-layer");
		}else{
			parentModal = $("."+parentModal);
			parentModal.find(modalEl).addClass("active").css("z-index", "111");
			parentModal.append("<div class='pop-transparents-layer'></div>");
			transparentLayer2 = parentModal.children(".pop-transparents-layer");
		}
		$(document).on("keydown", function(e){
			if ( e.keyCode == 27 || e.which == 27 ) { //esc
				modalEl.find('.btn-popclose').trigger('click');
			}
		});
	},
	modalHide: function(modalName, parentModal, parentCloseYN) {
		var me = this;
		var modalEl = $("."+modalName);
		var parentModal;

		if(!parentModal){
			$("html, body").css("height", "auto");
			$("#wrap").css("height", "auto").css("overflow-y", "auto");
			setTimeout(function(){
				$(".modalpop").removeClass("active");
				$("body > .pop-transparents-layer").remove();
				modalEl.removeClass("active");
			}, 500);
		}else{
			parentModal = $("."+parentModal);
			if (parentCloseYN === true){
				parentModal.css({visibility:"hidden", opacity:"0", left:"-99999px", top:"-99999px"});
				$("html, body").css("height", "auto");
				$("#wrap").css("height", "auto").css("overflow-y", "auto");
				parentModal.find(modalEl).removeClass("active");
				parentModal.children(".pop-transparents-layer").remove();
				$("body > .pop-transparents-layer").remove();
			}
			parentModal.find(modalEl).removeClass("active");
			parentModal.children(".pop-transparents-layer").remove();
		}
	},
	modalResize: function(){
		var me = this;
		var modalEl = $(".modalpop.active");
		var modalHeight = modalEl.children(".popupwrap").innerHeight();
		if(modalHeight > window.innerHeight){
			modalEl.css({alignItems:"flex-start"});
		}else {
			modalEl.css({alignItems:"center"});
		}
	},
	tabView: function (tabName) {
		$(".tabbox li").removeClass("on");
		$(".tabbox li."+tabName).addClass("on");
		$(".tab-hiddencontents").removeClass("on");
		$(".tab-hiddencontents."+tabName).addClass("on");
	},
}

var front = new frontUI ();


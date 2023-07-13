$(function(){
	
	$('.head-item').click(function(){
		$('.head-item').toggleClass('item-active', false);
		$(this).toggleClass('item-active', true);
		let type = $(this).attr('data-type');
		if(type == 'puli'){
			$('.bottom-text').text('谱例属性');
			$('#yinfu').hide();
			$('#puli').show();
		}else{
			$('.bottom-text').text('音符属性');
			$('#puli').hide();
			$('#yinfu').show();
		}
	})
	
	$('.keyboard-img').click(function(){
		let url = $(this).attr('src');
		if(url.indexOf('up') > -1){
			$(this).attr('src', 'assets/music_score_editor/images/keyboard_down.png');
		}else{
			$(this).attr('src', 'assets/music_score_editor/images/keyboard_up.png');
		}
		$('.main-box').toggleClass('main-box-up');
		$('.keyboard-box').toggleClass('keyboard-up');
	})
})
	function selectUnit(idx){
		$('#selectUnitImg').attr('src', 'assets/music_score_editor/images/speed' + idx + '.png');
		$("#L").val();
	}
	
	function selectSpeed(idx,val){
		$("#Q").val(val);
		$("#NOTE_Q").val(val);
		$('#selectSpeedImg').attr('src', 'assets/music_score_editor/images/speed' + idx + '.png');
		$('#selectSpeedImg').attr('speed', val);
		$('#selectSpeedImg2').attr('src', 'assets/music_score_editor/images/speed' + idx + '.png');
		$('#selectSpeedImg2').attr('speed', val);
		$("#Q").change();
	}
	
	function selectSpeed2(idx,val){
		$("#NOTE_Q").val(val);
		$('#selectSpeedImg2').attr('src', 'assets/music_score_editor/images/speed' + idx + '.png');
		$('#selectSpeedImg2').attr('speed', val);
		//changeNodeSpeed();
	}
	//选中时长
	function selectShiChang(L){
//		console.log(L)
		var val = L;
		$(".shichang-ul li").removeClass("selected");
		$(".shichang-ul img").each(function(i,item){
			var imgval = $(this).attr("value");
			if(val == imgval){
				$(this).parent().addClass("selected")
			}
		});
	}
	
// 确认是否执行弹出框
function confirm_box(msg, title, cb_ok, cb_cancel, ok_btn, cl_btn){
    if(typeof title=='string'){
        $('#confirm_con .confirm_title').html(title?title:'提示');
    }
    $('#confirm_con .confirm_body').html(msg?msg:'');
    $('#confirm_con').fadeIn();
    var cb_ok_fn;
    var cb_cancel_fn;
    if(typeof title=='function'){
        cb_ok_fn = title;
        if(typeof cb_ok=='function'){
            cb_cancel_fn = cb_ok;
        }
    }else{
        if(typeof cb_ok=='function'){
            cb_ok_fn = cb_ok;
        }
        if(typeof cb_cancel=='function'){
            cb_cancel_fn = cb_cancel;
        }
    }
    $('#confirm_con .ok_btn').off('click').on('click', function(){
        $('#confirm_con').fadeOut();
        if(typeof cb_ok_fn=='function'){
            cb_ok_fn();
        }
    }).html(ok_btn?ok_btn:'确定');
    $('#confirm_con .cancel_btn, #confirm_con .close_btn').off('click').on('click', function(){
        $('#confirm_con').fadeOut();
        if(typeof cb_cancel_fn=='function'){
            cb_cancel_fn();
        }
    });
    $('#confirm_con .cancel_btn').html(cl_btn?cl_btn:'取消');
}
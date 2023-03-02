function copy() {
	//复制小节 
	var selectedBars = $("svg[type='rectbar']");
	if($(selectedBars).length>0){
		copyNodes();
		return false;
	}
	var selectedNodes = $("svg[type='rectnode']");
	if($(selectedNodes).length>0){
		copyNodes();
		return false;
	}
	//复制音符
	var selectNotes = $(".selected_text[type*='HD'],.selected_text[type^='r'],.selected_text[type='note']")
	if(selectNotes.length>0){
		copyNote();
		return false;
	}
}

function paste() {
	var selectedBars = $("svg[type='rectbar']");
	if($(selectedBars).length>0){
		//粘贴小节
		pasteNode();
		return false;
	}
	var selectedNodes = $("svg[type='rectnode']");
	if($(selectedNodes).length>0){
		//粘贴小节
		pasteNode();
		return false;
	}
	var selectNotes = $(".selected_text[type*='HD'],.selected_text[type^='r'],.selected_text[type='note']")
	if(selectNotes.length>0){
		pasteNote();
		return false;
	}
}
function up8() {
	var selectedBars = $("svg[type='rectnode'],svg[type='rectbar']");
		//选中的是小节()
		if(selectedBars.length>0){
			var handleGraphEditor = upDownKeyWord(12);
			if(handleGraphEditor){
				return false;
			}
			return;
		}
		//选中的是单个音符
		if($(".selected_text").length>0 || $(".select_text_g").length>0){
			var handleGraphEditor = upDownKeyWord(12);
			if(handleGraphEditor){
				return false;
			}
			return;
		}
		staffUp8('source');
}

function down8() {
	var selectedBars = $("svg[type='rectnode'],svg[type='rectbar']");
	//选中的是小节()
	if(selectedBars.length>0){
		var handleGraphEditor = upDownKeyWord(-12);
		if(handleGraphEditor){
			return false;
		}
		return;
	}
	//选中的是单个音符
	if($(".selected_text").length>0 || $(".select_text_g").length>0){
		var handleGraphEditor = upDownKeyWord(-12);
		if(handleGraphEditor){
			return false;
		}
		return;
	}
	staffDown8('source')
}

function keepSelectNote(cb) {
	const istart = $('.selected_text').attr('istart')
	cb()
	setTimeout(() => {
		const el = $(`[type="hd"][istart="${istart}"]`)
		el.addClass('selected_text')
	}, 100)
}

function getSelectAbcCodeInfo() {
	localtosource()
	const txt = window.getSelection().toString()
	const selectEl = $('.selected_text')[0]
	if (!selectEl) return false
	const istart = +selectEl.getAttribute('istart')
	const length = txt.length
	const iend = istart + length
	return { txt, istart, iend, length }
}

/** @returns { number[] }*/
function getIstartList() {
	return [...new Set([...$('[istart]')].map(el => el.getAttribute('istart')))].sort()
}

function replaceCharsInRange(str, start, end, newChars) {
  if (start > end || start < 0 || end > str.length) {
    return str;
  }
  return str.slice(0, start) + newChars + str.slice(end);
}

/**
 * @param { (str: string, rawTxt: string) => string } cb 更改 abc 代码回调函数
 */
function changeAbc(cb) {
	const info = getSelectAbcCodeInfo()
	if (!info) return alert('请选中音符')
	let { istart, iend, txt } = info
	const abcCode = $('#source').val()
	const newCode = replaceCharsInRange(abcCode, istart, iend, cb(txt))
	$('#source').val(newCode)
	abc_change()
}

function lineTo() {
	keepSelectNote(() => {
		const info = getSelectAbcCodeInfo()
		if (!info) return alert('请选中音符')
		let { istart, txt } = info
		let abcCode = $('#source').val()
		const headCode = abcCode.substr(0, istart)
		let tailCode = abcCode.substr(istart).replace(txt, '')
		txt = '(' + txt
		tailCode = tailCode.replace(/[H-Zh-z]*({.*})?(!.*!)?\(?[A-Ga-g]\)?/, s => s + ')')
		abcCode = headCode + txt + tailCode
		$('#source').val(abcCode)
		abc_change()
	})
}

/**
 * 模拟键盘事件
 * @param { Object } opts - 选项
 * @param { ('keydown' | 'keyup')? } opts.method - 事件类型
 * @param { string } opts.key - 键值
 * @param { boolean? } opts.ctrlKey - 是否按下 ctrl 键
 * @param { boolean? } opts.altKey - 是否按下 alt 键
 * @param { boolean? } opts.shiftKey - 是否按下 shift 键
 * @param { boolean? } opts.metaKey - 是否按下 meta 键
 */
function emitDownKeyboardEvent(opts) {
	const defaultOpts = {
		method: 'keydown',
		isBubbles: true,
		key: '',
		ctrlKey: false,
		altKey: false,
		shiftKey: false,
		metaKey: false
	}
	const	{ method, key, ctrlKey, altKey, shiftKey, metaKey } = { ...defaultOpts, ...opts }
	const event = document.createEvent('KeyboardEvent');
	event.initKeyboardEvent(method, true, true, window, ctrlKey, altKey, shiftKey, metaKey, key, 0);
	document.dispatchEvent(event)
}

/**
 * 切割或合并音符
 * @param { 'left' | 'right' | 'all' } dir - 方向
 * @param { 'split' | 'merge' } type - 方式
 * @returns 
 */
function changeGroupNote(dir, type) {
	keepSelectNote(() => {
		const info = getSelectAbcCodeInfo()
		if (!info) return alert('请选中音符')
		let { istart, txt } = info
		/** @type { string } */
		let abcCode = $('#source').val()
		let headCode = abcCode.substr(0, istart)
		let tailCode = abcCode.substr(istart).replace(txt, '')
		if (type === 'merge') {
			if (['left', 'all'].includes(dir)) headCode = headCode.trimEnd()
			if (['right', 'all'].includes(dir)) tailCode = tailCode.trimStart()
		}
		if (type === 'split') {
			if (['left', 'all'].includes(dir)) txt = ' ' + txt
			if (['right', 'all'].includes(dir)) txt += ' '
		}
		abcCode = headCode + txt + tailCode
		$('#source').val(abcCode)
		abc_change()
	})
}


//工具栏的所有样本数据
var toolTemp = {
// note: {
// code: 'note',
// name: '音符',
// },
	length: {
		code: 'length',
		name: '时值',
		imgList: [
			{url: 'v2/images/note_1.png', value: '1/1',dur:'1536', title: '全音符',class:"operator_sc jp_note",keycode:"103"},		
			{url: 'v2/images/note_2.png', value: '1/2',dur:'768', title: '半音符',class:"operator_sc jp_note",keycode:"102"},
			{url: 'v2/images/note_3.png', value: '1/4',dur:'384', title: '四分音符',class:"operator_sc jp_note",keycode:"101"},
			{url: 'v2/images/note_4.png', value: '1/8',dur:'192', title: '八分音符',class:"operator_sc selected jp_note",keycode:"100"},
			{url: 'v2/images/note_5.png', value: '1/16',dur:'96', title: '16分音符',class:"operator_sc jp_note",keycode:"99"},
			{url: 'v2/images/note_6.png', value: '1/32',dur:'48', title: '32分音符',class:"operator_sc jp_note",keycode:"98"},
			{url: 'v2/images/note_7.png', value: '1/64',dur:'24', title: '64分音符',class:"operator_sc jp_note",keycode:"97"},
			//{url: 'v2/images/shichang1.png', value: '/', title: '减小音符长度',class:"operator_len cmenu minus_len",id:"minus_len",position:"after"},
			//{url: 'v2/images/shichang2.png', value: '2', title: '增加音符长度',class:"operator_len cmenu add_len",id:"add_len",position:"after"},
			//{url: 'v2/images/shichang4.png', value: '>', title: '3/1',class:"operator_len",id:"",position:"mid"},
			//{url: 'v2/images/shichang5.png', value: '<', title: '1/3',class:"operator_len",id:"",position:"mid"}
		],
		isExpand: false, // 是否展开
		canSwitch: true, // 是否可以切换
	},
	dur:{
		code: 'dur',
		name: '时值',
		imgList: [
			{url: 'images/dot3.png', value: '3/', title: '节奏附点',class:"cmenu",position:"after"},		
			{url: 'images/dot4.png', value: '7//', title: '节奏附点',class:"cmenu",position:"after"},	
			{url: 'v2/images/contact.png', value: '-', title: '连音线',class:"contact cmenu",id:"contact",position:"after"},	
			{url: 'images/con2.png', value: '(2', title: '2连音',class:"cmenu",position:"before"},	
			{url: 'images/con3.png', value: '(3', title: '3连音',class:"cmenu",position:"before"},	
			{url: 'images/con4.png', value: '(4', title: '4连音',class:"cmenu",position:"before"},	
			{url: 'images/con5.png', value: '(5', title: '5连音',class:"cmenu",position:"before"},	
			{url: 'images/con6.png', value: '(6', title: '6连音',class:"cmenu",position:"before"},	
			{url: 'images/con7.png', value: '(7', title: '7连音',class:"cmenu",position:"before"},	
			{url: 'images/b5.png', value: '!fermata!', title: '延长记号',class:"cmenu",position:"before"},	
			
			
		],
		isExpand: false // 是否展开
	},
	height: {
		code: 'height',
		name: '音高',
		imgList: [
//			{url: 'v2/images/yingao1.png', value: '^', title: '升',class:"yingao cmenu",position:"before"},		
//			{url: 'v2/images/cs.png', value: '^^', title: '重升',class:"yingao cmenu",position:"before"},		
//			{url: 'v2/images/yingao2.png', value: '_', title: '降',class:"yingao cmenu",position:"before"},
//			{url: 'v2/images/cj.png', value: '__', title: '重降',class:"yingao cmenu",position:"before"},
//			{url: 'v2/images/yingao3.png', value: '=', title: '还原',class:"yingao cmenu",position:"before"},
			
			{url: 'images/vaup.png', value: '!8va(!',value2:'!8va)!', title: '高8度演奏',class:"cmenu",position:"surround"},
			{url: 'images/vbdown.png', value: '!8vb(!',value2:'!8vb)!', title: '低8度演奏',class:"cmenu",position:"surround"},
			{url: 'images/15va.png', value: '!15ma(!',value2:'!15ma)!', title: '低15度演奏',class:"cmenu",position:"surround"},
			{url: 'images/15vb.png', value: '!15mb(!',value2:'!15mb)!', title: '低15度演奏',class:"cmenu",position:"surround"},
			
			
//			<img src="images/vaup.png" value="!8va(!" value2="!8va)!" title="高8度演奏" class="cmenu" position="surround"/>
//				<img src="images/vbdown.png" value="!8vb(!" value2="!8vb)!" title="低8度演奏" class="cmenu" position="surround"/>
//				<img src="images/15va.png" value="!15ma(!" value2="!15ma)!" title="高15度演奏" class="cmenu" position="surround"/>
//				<img src="images/15vb.png" value="!15mb(!" value2="!15mb)!" title="低15度演奏" class="cmenu" position="surround"/>
//			{url: 'v2/images/shengjiang1.png', value: 'up', title: '升一个音',class:"up cmenu",id:"up"},
//			{url: 'v2/images/shengjiang2.png', value: 'down', title: '降一个音',class:"down cmenu",id:"down"},
//			{url: 'v2/images/up-half.png', value: 'uphalf', title: '升半个音',class:"uphalf cmenu",id:"uphalf"},
//			{url: 'v2/images/down-half.png', value: 'downhalf', title: '降半个音',class:"downhalf cmenu",id:"downhalf"},
//			{url: 'v2/images/up8.png', value: 'up8', title: '上升一个八度',class:"up8 cmenu",id:"up8"},
//			{url: 'v2/images/down8.png', value: 'down8', title: '下降一个八度',class:"down8 cmenu",id:"down8"}
		],
		isExpand: false // 是否展开
	},
/*	chord: {
		code: 'chord',
		name: '和弦',
		imgList: [
			{url: 'images/I.png', level:'1',chord:'yuanwei', title: '原位',class:"chord_ins cmenu",type:"Ⅰ"},
			{url: 'images/I6.png', level:'1',chord:'zhuangwei1', title: '第一转位',class:"chord_ins cmenu",type:"Ⅰ6"},
			{url: 'images/I46.png', level:'1',chord:'zhuangwei2', title: '第二转位',class:"chord_ins cmenu",type:"Ⅰ46"},
			{url: 'images/IV.png', level:'4',chord:'yuanwei', title: '原位',class:"chord_ins cmenu",type:"Ⅳ"},
			{url: 'images/IV6.png', level:'4',chord:'zhuangwei1', title: '第一转位',class:"chord_ins cmenu",type:"Ⅳ6"},
			{url: 'images/IV46.png', level:'4',chord:'zhuangwei2',title: '第二转位',class:"chord_ins cmenu",type:"Ⅳ46"},
			{url: 'images/V.png', level:'5',chord:'yuanwei',title: '原位',class:"chord_ins cmenu",type:"Ⅴ"},
			{url: 'images/V6.png', level:'5',chord:'zhuangwei1',title: '第一转位',class:"chord_ins cmenu",type:"Ⅴ6"},
			{url: 'images/V46.png', level:'5',chord:'zhuangwei2',title: '第二转位',class:"chord_ins cmenu",type:"Ⅴ46"}
			
		],
		isExpand: false // 是否展开
	},*/
	rest: {
		code: 'rest',
		name: '休止符',
		imgList: [
			{url: 'v2/images/z1.png', value: '1', title: '全音休止符',class:"z_notes jp_note cmenu",type:"1"},		
			{url: 'v2/images/z2.png', value: '1/2', title: '半音休止符',class:"z_notes jp_note cmenu",type:"1/2"},
			{url: 'v2/images/z4.png', value: '1/4', title: '四分休止符',class:"z_notes jp_note cmenu",type:"1/4"},
			{url: 'v2/images/z8.png', value: '1/8', title: '八分休止符',class:"z_notes jp_note cmenu",type:"1/8"},
			{url: 'v2/images/z16.png', value: '1/16', title: '16分休止符',class:"z_notes jp_note cmenu",type:"1/16"},
			{url: 'v2/images/z32.png', value: '1/32', title: '32分休止符',class:"z_notes jp_note cmenu",type:"1/32"},
			{url: 'v2/images/z64.png', value: '1/64', title: '64分休止符',class:"z_notes jp_note cmenu",type:"1/64"}
		],
		isExpand: false, // 是否展开
		canSwitch: true, // 是否可以切换
		isExe: false // 是否在exe中打开
	},
	common: {
		code: 'common',
		name: '常用符号',
		imgList: [
		],
		isExpand: true, // 是否展开
		canSwitch: false // 是否可以切换
	},
	clef:{
		code: 'clef',
		name: '谱号',
		imgList: [
			{url: 'v2/images/ph_gy.png', value: '[K:treble]', title: '高音谱号',class:"cmenu",type:"all",position:"before"},
			{url: 'v2/images/ph_dy.png', value: '[K:bass]', title: '低音谱号',class:"cmenu",type:"all",position:"before"},
			{url: 'v2/images/ph_zy.png', value: '[K:alto]', title: '中音谱号',class:"cmenu",type:"all",position:"before"},
			{url: 'v2/images/ph_czy.png', value: '[K:tenor]', title: '次中音谱号',class:"cmenu",type:"all",position:"before"}
		],
		isExpand: false // 是否展开
	},
	key:{
		code: 'key',
		name: '调号',
		imgList: [
			{url: 'images/key/C.png', value: '[K:C]', class:"cmenu",type:"nodeline",position:"beforeInsert",title:"C大调"},
			{url: 'images/key/G.png', value: '[K:G]', class:"cmenu",type:"nodeline",position:"beforeInsert",title:"G大调"},
			{url: 'images/key/D.png', value: '[K:D]', class:"cmenu",type:"nodeline",position:"beforeInsert",title:"D大调"},
			{url: 'images/key/A.png', value: '[K:A]', class:"cmenu",type:"nodeline",position:"beforeInsert",title:"A大调"},
			{url: 'images/key/E.png', value: '[K:E]', class:"cmenu",type:"nodeline",position:"beforeInsert",title:"E大调"},
			{url: 'images/key/B.png', value: '[K:B]', class:"cmenu",type:"nodeline",position:"beforeInsert",title:"B大调"},
			{url: 'images/key/Fs.png', value: '[K:F#]', class:"cmenu",type:"nodeline",position:"beforeInsert",title:"#F大调"},
			{url: 'images/key/Cs.png', value: '[K:C#]', class:"cmenu",type:"nodeline",position:"beforeInsert",title:"#C大调"},
			{url: 'images/key/Cb.png', value: '[K:Cb]', class:"cmenu",type:"nodeline",position:"beforeInsert",title:"bC大调"},
			{url: 'images/key/Gb.png', value: '[K:Gb]', class:"cmenu",type:"nodeline",position:"beforeInsert",title:"bG大调"},
			{url: 'images/key/Db.png', value: '[K:Db]', class:"cmenu",type:"nodeline",position:"beforeInsert",title:"bD大调"},
			{url: 'images/key/Ab.png', value: '[K:Ab]', class:"cmenu",type:"nodeline",position:"beforeInsert",title:"bA大调"},
			{url: 'images/key/Eb.png', value: '[K:Eb]', class:"cmenu",type:"nodeline",position:"beforeInsert",title:"bE大调"},
			{url: 'images/key/Bb.png', value: '[K:Bb]', class:"cmenu",type:"nodeline",position:"beforeInsert",title:"bB大调"},
			{url: 'images/key/F.png', value: '[K:F]', class:"cmenu",type:"nodeline",position:"beforeInsert",title:"F大调"}
		]
	},
	
	bar: {
		code: 'bar',
		name: '小节线',
		imgList: [
			{url: 'v2/images/other23.png', value: '|', title: '小节线',class:"cmenu",type:"nodeline",position:"afterReplace"},	
			{url: 'v2/images/xnodeline.png', value: '.|', title: '虚线小节线',class:"cmenu",type:"nodeline",position:"afterReplace"},	
			{url: 'v2/images/nodeline2.png', value: '||', title: '双小节线',class:"cmenu",type:"nodeline",position:"afterReplace"},
			{url: 'v2/images/jwxjx.png', value: '|]', title: '结尾小结线',class:"cmenu",type:"nodeline",position:"afterReplace"},
			{url: 'v2/images/other24.png', value: '|:', title: '反覆开始',class:"cmenu",type:"nodeline",position:"preReplace"},
			{url: 'v2/images/other25.png', value: ':|', title: '反覆结束',class:"cmenu",type:"nodeline",position:"afterReplace"},//mid表示替换掉原来的
			{url: 'v2/images/other26.png', value: ':||:', title: '',class:"cmenu",type:"nodeline",position:"afterReplace"},
			{url: 'v2/images/other27.png', value: '[1.', title: '反复跳跃记号1.',class:"cmenu",type:"nodeline",position:"beforeInsert"},
			{url: 'v2/images/other28.png', value: '[2.', title: '反复跳跃记号2.',class:"cmenu",type:"nodeline",position:"beforeInsert"},
			{url: 'images/3.png', value: '[3.', title: '反复跳跃记号3.',class:"cmenu",type:"nodeline",position:"beforeInsert"},
			{url: 'images/4.png', value: '[4.', title: '反复跳跃记号4.',class:"cmenu",type:"nodeline",position:"beforeInsert"},
			{url: 'images/5.png', value: '[5.', title: '反复跳跃记号5.',class:"cmenu",type:"nodeline",position:"beforeInsert"},
			{url: 'images/breakline.png', value: '$', title: '换行',class:"cmenu",type:"nodeline",position:"beforeInsert"},
//			{url: 'v2/images/m.png', value: '[M:3/4]', title: '改变节拍',class:"operator cmenu",type:"nodeline",position:"after"},
//			{url: 'v2/images/key.png', value: '[K:E]', title: '改变调号',class:"cmenu",type:"nodeline",position:"after"},
//			{url: 'v2/images/speed.png', value: '#Q_div', title: '改变速度',class:"cmenu",datatoggle:"modal",datatarget:"#Q_div",id:"changenodespeed"},
			
//			{url: 'v2/images/nodeseq.png', value: '', title: '显示小节序号',class:"shownodeseq cmenu"},
//			{url: 'v2/images/firstnodeseq.png', value: '', title: '显示每行首个小节序号',class:"showfirstnodeseq cmenu"},
//			{url: 'images/direct/staffdown.png', value: '[I:staff +1]', title: '声部下移',class:"cmenu",position:"before"},
//			{url: 'images/direct/staffup.png', value: '[I:staff -1]', title: '声部上移',class:"cmenu",position:"before"},
//			{url: 'images/do_chn.png', value: 'DO', title: '简谱do位置',class:"cmenu",datatoggle:"modal",datatarget:"#DO_CHN_div", id:"do_chn"},
//			{url: 'images/beijingse2.png', value: '"-mb-"', title: '小节背景色',class:"operator cmenu nodecolorli",position:"before",type:"nodebg",id:"nodecolorli"},
//			{url: 'images/beijingse.png', value: '"-nb-"', title: '音符背景色',class:"operator cmenu notecolorli",position:"before",type:"notebg",id:"notecolorli"}
		],
		isExpand: false // 是否展开
	},
	rhythm:{
		code: 'rhythm',
		name: '节奏',
		imgList: [
			{ url: 'images/jz_wxp_4f.png', value: 'C2', len:'2',title: '', 'class': 'cmenu',position:'rhythm'},
			{ url: 'images/jz_wxp_28.png', value: 'CC', len:'2',title: '', 'class': 'cmenu',position:'rhythm'},
			{ url: 'images/jz_wxp_168.png', value: 'C/C/C', len:'2',title: '', 'class': 'cmenu',position:'rhythm'},
			{ url: 'images/jz_wxp_816.png', value: 'CC/C/', len:'2',title: '', 'class': 'cmenu',position:'rhythm'},
			{ url: 'images/jz_wxp_xqf.png', value: 'C/CC/', len:'2',title: '', 'class': 'cmenu',position:'rhythm'},
			{ url: 'images/jz_wxp_416.png', value: 'C/C/C/C/', len:'2',title: '', 'class': 'cmenu',position:'rhythm'},
			{ url: 'images/jz_wxp_xfd.png', value: 'C3/C/', len:'2',title: '', 'class': 'cmenu',position:'rhythm'},
			{ url: 'images/jz_wxp_hxfd.png', value: 'C/C3/', len:'2',title: '', 'class': 'cmenu',position:'rhythm'},
			{ url: 'images/jz_wxp_3ly.png', value: '(3CCC', len:'2',title: '', 'class': 'cmenu',position:'rhythm'},
			{ url: 'images/jz_wxp_fd64.png', value: 'C>CCC', len:'2',title: '', 'class': 'cmenu',position:'rhythm'}
		]
	},
	ruler: {
		code: 'ruler',
		name: '工具',
		imgList: [
			{ url: 'v2/images/yincheng.png', value: '1', title: '音程尺', id: 'ycc', 'class': 'ruler-img'},
			{ url: 'v2/images/dasan.png', value: '2', title: '大三和弦', id: 'dshx', 'class': 'ruler-img'},
			{ url: 'v2/images/xiaosan.png', value: '3', title: '小三和弦', id: 'xshx', 'class': 'ruler-img'},
			{ url: 'v2/images/xnrs.png', value: '#LTY_div', title: '虚拟人声', id: 'xnrs', 'class': 'ruler-img',datatoggle:"modal",datatarget:"#LTY_div"}
		]
	},
	meter:{
		code: 'meter',
		name: '拍号',
		imgList: [
			{url: 'images/meter/22.png', value: '[M:2/2]', class:"cmenu",type:"nodeline",position:"beforeInsert"},
			{url: 'images/meter/42.png', value: '[M:2/4]', class:"cmenu",type:"nodeline",position:"beforeInsert"},
			{url: 'images/meter/43.png', value: '[M:3/4]', class:"cmenu",type:"nodeline",position:"beforeInsert"},
			{url: 'images/meter/44.png', value: '[M:4/4]', class:"cmenu",type:"nodeline",position:"beforeInsert"},
			{url: 'images/meter/45.png', value: '[M:5/4]', class:"cmenu",type:"nodeline",position:"beforeInsert"},
			{url: 'images/meter/46.png', value: '[M:6/4]', class:"cmenu",type:"nodeline",position:"beforeInsert"},
			{url: 'images/meter/83.png', value: '[M:3/8]', class:"cmenu",type:"nodeline",position:"beforeInsert"},
			{url: 'images/meter/86.png', value: '[M:6/8]', class:"cmenu",type:"nodeline",position:"beforeInsert"},
			{url: 'images/meter/89.png', value: '[M:9/8]', class:"cmenu",type:"nodeline",position:"beforeInsert"},
			{url: 'images/meter/812.png', value: '[M:12/8]', class:"cmenu",type:"nodeline",position:"beforeInsert"},
			{url: 'images/meter/44C.png', value: '[M:C]', class:"cmenu",type:"nodeline",position:"beforeInsert"},
			{url: 'images/meter/22C.png', value: '[M:C|]', class:"cmenu",type:"nodeline",position:"beforeInsert"},
		]
	},
	linemark:{
		code: 'linemark',
		name: '线条记号',
		imgList: [
			{url: 'images/slur.png',id:'slurbtn', value: '(note)', class:"slur cmenu",title:"连句线"},
			{url: 'images/jq.png', value: '!<(!', value2:'!<)!',title:"渐强", class:"cmenu",position:"surround"},
			{url: 'images/jr.png', value: '!>(!', value2:"!>)!",title:"渐弱",class:"cmenu",position:"surround"},
			{url: 'images/cresc.png', value: '!cresc.!',title:"cresc.",class:"cmenu",position:"before"},
			{url: 'images/dim.png', value: '!dim.!',title:"dim.",class:"cmenu",position:"before"},
			{url: 'images/voice_slur_above.png',id:'voice_slur_pic',value: '"(slur"', value2:")slur",position:"surround", class:"cmenu",title:"跨声部连音线",type:"note"},
			{url: 'images/bracketgch.png',value: '"[-num-"', value2:"num-]",position:"surround", class:"cmenu",title:"标注",type:"note"},
			{url: 'images/bracketgch2.png',value: '"_[-num-"', value2:"num-]",position:"surround", class:"cmenu",title:"标注",type:"note"},
			{url: 'images/wavegch.png',value: '"[~num~"', value2:"num~]",position:"surround", class:"cmenu",title:"标注",type:"note"},
			{url: 'images/wavegch2.png',value: '"_[~num~"', value2:"num~]",position:"surround", class:"cmenu",title:"标注",type:"note"},
//			<img src="images/voice_slur_above.png" title="跨声部连音线在上方" class="cmenu" onclick="setVoiceSlur('source','\'')" />
//				<img src="images/voice_slur_below.png" title="跨声部连音线在下方" class="cmenu" onclick="setVoiceSlur('source',',')" />
		]
	},
	grace:{
		code: 'grace',
		name: '倚音',
		imgList: [
			{url: 'images/yy1.png', value: '{/}', class:"cmenu",title:"倚音",position:"before",type:"8"},
			{url: 'images/dyy.png', value: '{/}', class:"cmenu",title:"倚音",position:"before",type:"4"},
			{url: 'images/grace4b.png', value: '{}', class:"cmenu",title:"倚音",position:"before",type:"4"},
			{url: 'images/yy2.png', value: '{}', class:"cmenu",title:"倚音",position:"before",type:"8"},
			{url: 'images/grace16b.png', value: '{}', class:"cmenu",title:"倚音",position:"before",type:"16"},
			{url: 'images/grace32b.png', value: '{}', class:"cmenu",title:"倚音",position:"before",type:"32"},
			{url: 'images/grace32a.png', value: '{}', class:"cmenu",title:"倚音",position:"after",type:"32"},
			{url: 'images/grace16a.png', value: '{}', class:"cmenu",title:"倚音",position:"after",type:"16"},
			{url: 'images/yy6.png', value: '{}', class:"cmenu",title:"倚音",position:"after",type:"8"},
			{url: 'images/yy11.png', value: '{}', class:"cmenu",title:"倚音",position:"before", type:"syy"},
			{url: 'images/yy22.png', value: '{}', class:"cmenu",title:"倚音",position:"after", type:"syy"},
		]
	},
	fng:{
		code: 'fng',
		name: '指法',
		imgList: [
			{url: 'images/b6.png', value: '!0!', class:"cmenu",position:"before"},
			{url: 'images/b7.png', value: '!1!', class:"cmenu",position:"before"},
			{url: 'images/b8.png', value: '!2!', class:"cmenu",position:"before"},
			{url: 'images/b9.png', value: '!3!', class:"cmenu",position:"before"},
			{url: 'images/b10.png', value: '!4!', class:"cmenu",position:"before"},
			{url: 'images/b11.png', value: '!5!', class:"cmenu",position:"before"},
		]
	},
	gliss:{
		code: 'gliss',
		name: '琶音与滑音',
		imgList: [
			{url: 'images/pa.png', value: '!arpeggio!', class:"cmenu",position:"before"},
			{url: 'images/jpslid.png', value: '!jpslid!', class:"cmenu",position:"before"},
			{url: 'images/arp_link.png',id:'arp_link',value:'arp_link', class:"cmenu"},
			{url: 'images/paup.png', value: '!arpeggioup!', class:"cmenu",position:"before"},
			{url: 'images/padown.png', value: '!arpeggiodown!', class:"cmenu",position:"before"},
			{url: 'images/gliss.png', value: '!~(!note!~)!', class:"cmenu",type:"gliss"},
			{url: 'images/fall.png', value: '!slidelu!', class:"cmenu",position:"before"},
			{url: 'images/doit.png', value: '!slide!', class:"cmenu",position:"before"},
			{url: 'images/plop.png', value: '!sliderd!', class:"cmenu",position:"before"},
			{url: 'images/scoop.png', value: '!slideru!', class:"cmenu",position:"before"},
			{url: 'images/jphuayin.png', value: '!sliderd2!', class:"cmenu",position:"before"},
		]
	},
	tremolo:{
		code: 'tremolo',
		name: '震音',
		imgList: [
			{url: 'images/tremolo/1.png', value: '!/!', class:"cmenu",position:"before"},
			{url: 'images/tremolo/2.png', value: '!//!', class:"cmenu",position:"before"},
			{url: 'images/tremolo/3.png', value: '!///!', class:"cmenu",position:"before"},
			{url: 'images/tremolo/5.png', value: '!/-!', class:"cmenu",position:"before"},
			{url: 'images/tremolo/6.png', value: '!//-!', class:"cmenu",position:"before"},
			{url: 'images/tremolo/7.png', value: '!///-!', class:"cmenu",position:"before"},
			
		]
	},
	linkclef:{
		code: 'linkclef',
		name: '连谱号',
		imgList: [
			{url: 'images/brace.png', value: 'brace', class:"cmenu",type:"linkclef"},
			{url: 'images/bracket.png',value:'bracket', class:"cmenu",type:"linkclef"},
		]
	},

}

function changeNumberKeypadIndex(i) {
	let index = content_vue.m.numberKeypad.page
	index += i
	if (index < 0) {
		index = content_vue.m.numberKeypad.staffList.length - 1
	}
	else if (index > content_vue.m.numberKeypad.staffList.length - 1) {
		index = 0
	}
	content_vue.m.numberKeypad.page = index
}

var content_vue = new Vue({
	el: '#content',
	data: {
		isJxbz: false, // 是否即兴伴奏进来的
		keyboardShow: true, // 是否显示键盘
		toolList: [ // 工具栏列表
//			{
//				code: 'edit',
//				name: '编辑',
//				imgList: [
//					{url: 'v2/images/back.png', value: 'back', title: '上一步',id:"back",class:"back cmenu"},		
//					{url: 'v2/images/forward.png', value: 'forward', title: '下一步',id:"forward",class:"forward cmenu"},
					// {url: 'v2/images/cut.png', value: 'cut', title: '剪切',id:"cut",class:"cut cmenu"},
////					{url: 'v2/images/copy.png', value: 'copy', title: '复制',id:"copy",class:"copy cmenu"},
////					{url: 'v2/images/past.png', value: 'past', title: '粘贴',id:"past",class:"past cmenu"},
//					{url: 'v2/images/del.png', value: 'del', title: '删除',id:"del",class:"del cmenu"},
////					{url: 'v2/images/enter.png', value: 'enter', title: '换行',id:"enterLine",class:"enterLine cmenu"}
//				],
//				isShow: false
//			}
		],
		pulldownToolList: [	// 工具栏下拉框列表
//			{name: '常用符号', code: 'common', isShow: true},
			{name: '谱号', code: 'clef', isShow: true},
			{name: '连谱号', code: 'linkclef', isShow: false},
			{name: '调号', code: 'key', isShow: false},
			{name: '拍号', code: 'meter', isShow: false},
			{name: '音高', code: 'height', isShow: true},
			{name: '时值', code: 'dur', isShow: true},
			{name: '小节线', code: 'bar', isShow: true},
// {name: '音符', code: 'note', isShow: false},
			{name: '线条记号', code: 'linemark', isShow: true},
//			{name: '符点', code: 'dot', isShow: true},
//			{name: '休止符', code: 'rest', isShow: true},
//			{name: '工具', code: 'ruler', isShow: false},
			{name: '节奏', code: 'rhythm', isShow: false},
			{name: '倚音', code: 'grace', isShow: false},
			{name: '指法', code: 'fng', isShow: false},
			{name: '琶音与滑音', code: 'gliss', isShow: false},
			{name: '震音', code: 'tremolo', isShow: false},
		],
		toolsLengthList: toolTemp['length'], // 快捷导航：音符时值设置
		instrumentList: [{
			"code": 0,
			"name": "大钢琴（声学钢琴）"
		}, {
			"code": 1,
			"name": "明亮的钢琴"
		}, {
			"code": 2,
			"name": "电钢琴"
		}, {
			"code": 3,
			"name": "酒吧钢琴"
		}, {
			"code": 4,
			"name": "柔和的电钢琴"
		}, {
			"code": 5,
			"name": "加合唱效果的电钢琴"
		}, {
			"code": 6,
			"name": "羽管键琴（拨弦古钢琴）"
		}, {
			"code": 7,
			"name": "科拉维科特琴（击弦古钢琴）"
		}, {
			"code": 8,
			"name": "钢片琴"
		}, {
			"code": 10,
			"name": "八音盒"
		}, {
			"code": 11,
			"name": "颤音琴"
		}, {
			"code": 12,
			"name": "马林巴"
		}, {
			"code": 13,
			"name": "木琴"
		}, {
			"code": 14,
			"name": "管钟"
		}, {
			"code": 15,
			"name": "大扬琴"
		}, {
			"code": 16,
			"name": "击杆风琴"
		}, {
			"code": 17,
			"name": "打击式风琴"
		}, {
			"code": 18,
			"name": "摇滚风琴"
		}, {
			"code": 19,
			"name": "教堂风琴"
		}, {
			"code": 20,
			"name": "簧管风琴"
		}, {
			"code": 21,
			"name": "手风琴"
		}, {
			"code": 22,
			"name": "口琴"
		}, {
			"code": 23,
			"name": "探戈手风琴"
		}, {
			"code": 24,
			"name": "尼龙弦吉他"
		}, {
			"code": 25,
			"name": "钢弦吉他"
		}, {
			"code": 26,
			"name": "爵士电吉他"
		}, {
			"code": 27,
			"name": "清音电吉他"
		}, {
			"code": 28,
			"name": "闷音电吉他"
		}, {
			"code": 29,
			"name": "加驱动效果的电吉他"
		}, {
			"code": 30,
			"name": "加失真效果的电吉他"
		}, {
			"code": 31,
			"name": "吉他和音"
		}, {
			"code": 32,
			"name": "大贝司（声学贝司）"
		}, {
			"code": 33,
			"name": "电贝司（指弹）"
		}, {
			"code": 34,
			"name": "电贝司（拨片）"
		}, {
			"code": 35,
			"name": "无品贝司"
		}, {
			"code": 36,
			"name": "贝司掌击1"
		}, {
			"code": 37,
			"name": "贝司掌击2"
		}, {
			"code": 38,
			"name": "电子合成贝司1"
		}, {
			"code": 39,
			"name": "电子合成贝司2"
		}, {
			"code": 40,
			"name": "小提琴"
		}, {
			"code": 41,
			"name": "中提琴"
		}, {
			"code": 42,
			"name": "大提琴"
		}, {
			"code": 43,
			"name": "低音大提琴"
		}, {
			"code": 44,
			"name": "弦乐群颤音音色"
		}, {
			"code": 45,
			"name": "弦乐群拨弦音色"
		}, {
			"code": 46,
			"name": "竖琴"
		}, {
			"code": 47,
			"name": "定音鼓"
		}, {
			"code": 48,
			"name": "弦乐合奏音色1"
		}, {
			"code": 49,
			"name": "弦乐合奏音色2"
		}, {
			"code": 50,
			"name": "合成弦乐合奏音色1"
		}, {
			"code": 51,
			"name": "合成弦乐合奏音色2"
		}, {
			"code": 52,
			"name": "人声合唱“啊”"
		}, {
			"code": 53,
			"name": "人声“嘟”"
		}, {
			"code": 54,
			"name": "合成人声"
		}, {
			"code": 55,
			"name": "管弦乐敲击齐奏"
		}, {
			"code": 56,
			"name": "小号"
		}, {
			"code": 57,
			"name": "长号"
		}, {
			"code": 58,
			"name": "大号"
		}, {
			"code": 59,
			"name": "加弱音器小号"
		}, {
			"code": 60,
			"name": "法国号（圆号）"
		}, {
			"code": 61,
			"name": "铜管组（铜管乐器合奏音色）"
		}, {
			"code": 62,
			"name": "合成铜管音色1"
		}, {
			"code": 63,
			"name": "合成铜管音色2"
		}, {
			"code": 64,
			"name": "高音萨克斯风"
		}, {
			"code": 65,
			"name": "次中音萨克斯风"
		}, {
			"code": 66,
			"name": "中音萨克斯风"
		}, {
			"code": 67,
			"name": "低音萨克斯风"
		}, {
			"code": 68,
			"name": "双簧管"
		}, {
			"code": 69,
			"name": "英国管"
		}, {
			"code": 70,
			"name": "巴松（大管）"
		}, {
			"code": 71,
			"name": "单簧管（黑管）"
		}, {
			"code": 72,
			"name": "短笛"
		}, {
			"code": 73,
			"name": "长笛"
		}, {
			"code": 74,
			"name": "竖笛"
		}, {
			"code": 75,
			"name": "排箫"
		}, {
			"code": 76,
			"name": "吹瓶子"
		}, {
			"code": 77,
			"name": "日本尺八"
		}, {
			"code": 78,
			"name": "口哨声"
		}, {
			"code": 79,
			"name": "奥卡雷那"
		}, {
			"code": 80,
			"name": "合成主音1（方波）"
		}, {
			"code": 81,
			"name": "合成主音2（锯齿波）"
		}, {
			"code": 82,
			"name": "合成主音3"
		}, {
			"code": 83,
			"name": "合成主音4"
		}, {
			"code": 84,
			"name": "合成主音5"
		}, {
			"code": 85,
			"name": "合成主音6（人声）"
		}, {
			"code": 86,
			"name": "合成主音7（平行五度）"
		}, {
			"code": 87,
			"name": "合成主音8（贝司加主音）"
		}, {
			"code": 88,
			"name": "合成音色1（新世纪）"
		}, {
			"code": 89,
			"name": "合成音色2（温暖）"
		}, {
			"code": 90,
			"name": "合成音色3"
		}, {
			"code": 91,
			"name": "合成音色4（合唱）"
		}, {
			"code": 92,
			"name": "合成音色5"
		}, {
			"code": 93,
			"name": "合成音色6（金属声）"
		}, {
			"code": 94,
			"name": "合成音色7（光环）"
		}, {
			"code": 95,
			"name": "合成音色8"
		}, {
			"code": 96,
			"name": "合成效果1雨声"
		}, {
			"code": 97,
			"name": "合成效果2音轨"
		}, {
			"code": 98,
			"name": "合成效果3水晶"
		}, {
			"code": 99,
			"name": "合成效果4大气"
		}, {
			"code": 100,
			"name": "合成效果5明亮"
		}, {
			"code": 101,
			"name": "合成效果6鬼怪"
		}, {
			"code": 102,
			"name": "合成效果7回声"
		}, {
			"code": 103,
			"name": "合成效果8科幻"
		}, {
			"code": 104,
			"name": "西塔尔（印度）"
		}, {
			"code": 105,
			"name": "班卓琴（美洲）"
		}, {
			"code": 106,
			"name": "三昧线（日本）"
		}, {
			"code": 107,
			"name": "十三弦筝（日本）"
		}, {
			"code": 108,
			"name": "卡林巴"
		}, {
			"code": 109,
			"name": "风笛"
		}, {
			"code": 110,
			"name": "民族提琴"
		}, {
			"code": 111,
			"name": "山奈"
		}, {
			"code": 112,
			"name": "叮当铃"
		}, {
			"code": 113,
			"name": "Agogo"
		}, {
			"code": 114,
			"name": "钢鼓"
		}, {
			"code": 115,
			"name": "木鱼"
		}, {
			"code": 116,
			"name": "日本太鼓"
		}, {
			"code": 117,
			"name": "通通鼓"
		}, {
			"code": 118,
			"name": "合成鼓"
		},  {
			"code": 120,
			"name": "吉他换把杂音"
		}, {
			"code": 121,
			"name": "声音效果"
		}, {
			"code": 122,
			"name": "海浪声"
		}, {
			"code": 123,
			"name": "鸟鸣"
		}, {
			"code": 124,
			"name": "电话铃"
		}, {
			"code": 125,
			"name": "直升机"
		}, {
			"code": 126,
			"name": "鼓掌声"
		}, {
			"code": 127,
			"name": "枪声"
		}, {
			"code": 129,
			"name": "铃鼓"
		}, {
			"code": 130,
			"name": "响板"
		}, {
			"code": 131,
			"name": "竹笛"
		}, {
			"code": 132,
			"name": "二胡"
		}, {
			"code": 133,
			"name": "葫芦丝"
		}, {
			"code": 134,
			"name": "一批打击乐"
		}, {
			"code": 135,
			"name": "大锣"
		}, {
			"code": 136,
			"name": "口琴"
		}, {
			"code": 137,
			"name": "古筝"
		}, {
			"code": 138,
			"name": "琵琶"
		}, {
			"code": 139,
			"name": "唢呐"
		}, {
			"code": 140,
			"name": "京剧打击乐"
		}, {
			"code": 141,
			"name": "民族打击乐"
		}, {
			"code": 143,
			"name": "合成人声1"
		}, {
			"code": 144,
			"name": "合成人声2"
		}, {
			"code": 145,
			"name": "合成人声3"
		}, {
			"code": 146,
			"name": "合成人声4"
		}, {
			"code": 147,
			"name": "合成人声5"
		}, {
			"code": 148,
			"name": "合成人声6"
		}, {
			"code": 222,
			"name": "人声"
		}, {
			"code": 201,
			"name": "铙"
		}, {
			"code": 202,
			"name": "小军鼓"
		},
		 {
		        "code": 1000, 
		        "name": "手铃"//替换203
		    },
		    {
			"code": 1003,
			"name": "钟琴"//替换9
		    }, 
		    {
				"code": 5018,
				"name": "月琴"
			}, 
			{
				"code": 5019,
				"name": "柳琴"
			}, 
		    {
			"code": 1004,
			"name": "沙锤"//新增
		    }, 
		    {
				"code": 1007,
				"name": "摇铃"//新增
			}, 
		    {
			"code": 1008,
			"name": "棒铃"//新增
		    }, 
		    {
			"code": 1010,
			"name": "双响筒"//新增
		    }, 
		    {
			"code": 1011,
			"name": "响板"//新增
		    }, 
		     {
			"code": 1012,
			"name": "响棒"//新增
		    }, 
		     {
			"code": 1014,
			"name": "蛙鸣筒"//新增
		    }, 
		    {
			"code": 1018,
			"name": "三角铁"//128
		    }, 
		    {
				"code": 1020,
				"name": "碰铃"
			}, 
			{
				"code": 1021,
				"name": "跺脚"
			},
			{
				"code": 1022,
				"name": "拍肩"
			},
			{
				"code": 1023,
				"name": "拍腿"
			},
			{
				"code": 1024,
				"name": "拍手"
			},
			{
				"code": 1025,
				"name": "响指"
			},
		    {
		    	"code": 1026,
		    	"name": "手串铃"
		     }, 
		     {
			"code": 5005,
			"name": "中虎音锣"
		    }, 
		     {
			"code": 5007,
			"name": "钹"//替换119
		    }, 
		    {
			"code": 5027,
			"name": "小鼓"
		    }, 
		    {
			"code": 5030,
			"name": "小锣"
		    }
		    , 
		    {
				"code": 5037,
				"name": "镲"
			} ,
			{
				"code": 5038,
				"name": "羌笛"
			} ,
			{
				"code": 5039,
				"name": "口弦"
			} ,
		    {
				"code": 2009,
				"name": "小军鼓"
		    }
			, 
		    {
				"code": 2013,
				"name": "非洲鼓"
		    }
			, 
		    {
				"code": 5040,
				"name": "萧"
		    }
			, 
		    {
			"code": 5041,
			"name": "大锣鼓"
		    }
			, 
		    {
			"code": 5042,
			"name": "板胡"
		    }
		],
		pytbOption: 0,	// 谱音同步选项 0: 谱音同步 1: 只播图像 2: 只播声音
		instrumentOption: 0,	// 乐器选项
		playingInstrumentOption:0,//播放时的乐器
		isTbjpsz: true, // 是否同步键盘时值
		metrocheck: false, // 是否打开节拍器
		headerInBottom: false, // 顶部按钮放在下面
		instrumentKey: '', // 乐器搜索关键字
		voicePart : {}, // 声部插件
		abcSel : {}, // abc框选对象
		musicFormObj : {}, // 曲式绘制对象
		showMusicForm: false, // 是否显示曲式图
		menuList: typeof menuList == 'undefined' ? [] : menuList,// 导航菜单
		menuActive: '', // 导航菜单选中状态
		editorShow: false, // 代码编辑器
		symbolPanelShow: true, // 符号面板
		attrPanelShow: true, // 属性面板
		attrPanelIndex: 0, // 属性面板-》tab页索引
		usuallyFuncList: [], // 常用功能列表
		musicForm: { // 曲式分析数据
			id:'', // id
			pid:'', // 父id
			fieldno: '', // 编号
			orderby: '', // 排序号
			fieldname: '', // 段落名称
			bgcolor: '', // 块的背景图
			fielddesc: '', // 段落内容
			starttime: '', // 开始时间
			endtime: '', // 结束时间
			startNodeIndex: '', // 小节线起始索引
			endNodeIndex: '', // 小节线终止索引
			groupid: ''
			//width: '',
			//left: ''
		},
		cmd: 'A', // musicform cmd
		inpdisable: false, // 编辑框是否禁用
		isExe: false, // 是否在exe中打开
		isAndroid: false, // 是否在安卓中打开
		fileUpload : getFileData(),
		isShowHelp: false,

		// ———————————————————————————————————————— 分割线 __data ————————————————————————————————————————
		// 在远古项目基础上二次开发，新数据在 m 对象之中避免命名冲突
		m: {
			scoreOpts,
			lyric: {
				style: {
					color: '#333',
					fontWeight: 'normal',
					fontStyle: 'normal',
					fontSize: '14px',
					fontFamily: 'inherit'
				},
				fontSizeList: ['10px', '12px', '14px', '16px', '18px', '20px', '24px'],
				fontFamilyList: [
					{ label: '默认', val: 'inherit' },
					{ label: '黑体', val: 'SimHei' },
					{ label: '宋体', val: 'SimSun' },
					{ label: '仿宋', val: 'FangSong' },
					{ label: '楷体', val: 'KaiTi' },
					{ label: '微软雅黑', val: 'Microsoft YaHei' }
				]
			},
			selectNote: null,
			selectBar: null,
			menuIndex: -1,
			menuList: [
				{
					txt: '文件',
					children: [
						{ txt: '新建', fn: () => content_vue.m.newScore.musicType.show = true  },
						{ txt: '保存', fn: () => {
							const form = new FormData(document.getElementById("abcform"))
							const obj = {}
							for (const key of form.keys()) {
								obj[key] = form.get(key)
							}
							console.log(obj)
							// alert(JSON.stringify(obj))
						} },
						{ txt: '另存为', fn: () => alert('暂未开发') },
						{
							txt: '打开',
							fn: () => $('#input-file').val('') && $('#input-file').click()
						},
						{
							txt: '导出',
							fn: (event) => {
								hiddenMenuItem();
								$('#VOICEPART_div').modal('toggle');
								openVoicepartExport();
								event.stopPropagation();
							}
						},
					]
				},
				{ txt: '文本' },
				{ txt: '工具' },
				{ txt: '视图', checkedList: [] }
			],
			isMusicNoteShow: false,
			addBar: {
				show: false,
				before: 1,
				after: 1
			},
			numberKeypad: {
				isShow: true,
				isMove: false,
				moveStart: { x: 0, y: 0 },
				position: {
					x: 0,
					y: 0
				},
				page: 0,
				staffList: [
					[
						{ title: '箭头', fn: switchPrachEditor, isSelect: false, updateIsSelect() { this.isSelect = !draw_editor } },
						{ url: 'v2/images/cs.png', isKeepSelect: true, title: '重升', selector: '.pitchbtn[value="^^"]', isSelect: false },
						{ url: 'v2/images/cj.png', isKeepSelect: true, title: '重降', selector: '.pitchbtn[value="__"]', isSelect: false },
						{},
						{ url: 'v2/images/yingao3.png', isKeepSelect: true, title: '还原', selector: '.pitchbtn[value="="]', isSelect: false },
						{ url: 'v2/images/yingao1.png', isKeepSelect: true, title: '升号', selector: '.pitchbtn[value="^"]', isSelect: false },
						{ url: 'v2/images/yingao2.png', isKeepSelect: true, title: '降号', selector: '.pitchbtn[value="_"]', isSelect: false },
						{ url: '', title: '上一页', fn: () => changeNumberKeypadIndex(-1), isSelect: false },
						{ url: 'v2/images/note_3.png', title: '四分音符', selector: '.operator_sc.jp_note[keycode=101]', isSelect: false },
						{ url: 'v2/images/note_2.png', title: '半音符', selector: '.operator_sc.jp_note[keycode=102]', isSelect: false },
						{ url: 'v2/images/note_1.png', title: '全音符', selector: '.operator_sc.jp_note[keycode=103]', isSelect: false },
						{ url: 'v2/images/note_6.png', title: '32分音符', selector: '.operator_sc.jp_note[keycode=98]', isSelect: false },
						{ url: 'v2/images/note_5.png', title: '16分音符', selector: '.operator_sc.jp_note[keycode=99]', isSelect: false },
						{ url: 'v2/images/note_4.png', title: '八分音符', selector: '.operator_sc.jp_note[keycode=100]', isSelect: false },
						{ url: '', title: '下一页', fn: () => changeNumberKeypadIndex(1), isSelect: false },
						{ url: 'images/rest.png', isKeepSelect: true, title: '休止符', selector: '.reststatus', isSelect: false },
						{ url: 'images/dot3.png', isKeepSelect: true, title: '附点', selector: '.dotstatus[value="3/"]', isSelect: false },
					],
					[
						{ title: '箭头', fn: switchPrachEditor, isSelect: false, updateIsSelect() { this.isSelect = !draw_editor } },
						{ url: 'images/b5.png', isKeepSelect: true, title: '延长', fn: () => changeAbc(txt => `!fermata!${txt}`), isSelect: false },
						{ url: 'images/slur.png', isKeepSelect: true, title: '连线', fn: lineTo, isSelect: false },
						{},
						{ url: 'images/other3.png', isKeepSelect: true, title: '重音', fn: () => changeAbc(txt => `!>!${txt}`), isSelect: false },
						{ url: 'images/other4.png', isKeepSelect: true, title: '跳音', fn: () => changeAbc(txt => `.${txt}`), isSelect: false },
						{ url: 'images/other5.png', isKeepSelect: true, title: '保持音', fn: () => changeAbc(txt => `!emb!${txt}`), isSelect: false },
						{ url: 'v2/images/note_1.png', title: '上一页', fn: () => changeNumberKeypadIndex(-1), isSelect: false },
						{ url: 'images/yy2.png', isKeepSelect: true, title: '倚音', fn: () => changeAbc(txt => `{b}${txt}`), isSelect: false },
						{ url: 'images/yy1.png', isKeepSelect: true, title: '倚音', fn: () => changeAbc(txt => `{/b}${txt}`), isSelect: false },
						{ url: 'images/grace16b.png', isKeepSelect: true, title: '倚音', fn: () => changeAbc(txt => `{g/}${txt}`), isSelect: false },
						{ url: 'images/pa.png', isKeepSelect: true, title: '瑟音', fn: () => changeAbc(txt => `!arpeggio!${txt}`), isSelect: false },
						{ url: 'images/padown.png', isKeepSelect: true, title: '向下瑟音', fn: () => changeAbc(txt => `!arpeggiodown!${txt}`), isSelect: false },
						{ url: 'images/paup.png', isKeepSelect: true, title: '向上瑟音', fn: () => changeAbc(txt => `!arpeggioup!${txt}`), isSelect: false },
						{ url: 'v2/images/note_1.png', title: '下一页', fn: () => changeNumberKeypadIndex(1), isSelect: false },
						{},
						{ url: 'images/dot4.png', isKeepSelect: true, title: '复附点', selector: '.dotstatus[value="7//"]', isSelect: false },
					],
					[
						{ title: '箭头', fn: switchPrachEditor, isSelect: false, updateIsSelect() { this.isSelect = !draw_editor } },
						{},
						{},
						{},
						{},
						{},
						{},
						{ title: '上一页', fn: () => changeNumberKeypadIndex(-1), isSelect: false },
						{ url: 'images/tremolo/1.png', isKeepSelect: true, title: '颤音', fn: () => changeAbc(txt => `!/!${txt}`), isSelect: false },
						{ url: 'images/tremolo/2.png', isKeepSelect: true, title: '颤音', fn: () => changeAbc(txt => `!//!${txt}`), isSelect: false },
						{ url: 'images/tremolo/3.png', isKeepSelect: true, title: '颤音', fn: () => changeAbc(txt => `!///!${txt}`), isSelect: false },
						{ isKeepSelect: true, title: '启动符杠', fn: () => changeGroupNote('right', 'merge'), isSelect: false },
						{ isKeepSelect: true, title: '结束符杠', fn: () => changeGroupNote('left', 'merge'), isSelect: false },
						{ isKeepSelect: true, title: '符杠中间', fn: () => changeGroupNote('all', 'merge'), isSelect: false },
						{ isKeepSelect: true, title: '下一页', fn: () => changeNumberKeypadIndex(1), isSelect: false },
						{},
						{ isKeepSelect: true, title: '无符杠', fn: () => changeGroupNote('all', 'split'), isSelect: false }
					]
				],
				easyList: [
					[
						{ title: '箭头', fn: switchPrachEditor, isSelect: false, updateIsSelect() { this.isSelect = !draw_editor } },
						{ url: 'images/rest.png', title: '低8度', fn: () => upDownKeyWord(-12), isSelect: false },
						{ url: 'images/rest.png', title: '高8度', fn: () => upDownKeyWord(12), isSelect: false },
						{},
						{ url: 'images/dot3.png', isKeepSelect: true, title: '附点', selector: '.dotstatus[value="3/"]', isSelect: false },
						{ url: 'images/dot4.png', isKeepSelect: true, title: '复附点', selector: '.dotstatus[value="7//"]', isSelect: false },
						{},
						{ url: '', title: '上一页', fn: () => changeNumberKeypadIndex(-1), isSelect: false },
						{ url: 'v2/images/note_2_j.png', title: '2拍', selector: '.operator_sc.jp_note[keycode=102]', isSelect: false },
						{ url: 'v2/images/note_2_j.png', title: '3拍', fn: () => $('.operator_sc.jp_note[keycode=102]').click() | $('.dotstatus[value="3/"]').click(), isSelect: false },
						{ url: 'v2/images/note_1_j.png', title: '4拍', selector: '.operator_sc.jp_note[keycode=103]', isSelect: false },
						{ url: 'v2/images/note_6_j.png', title: '32分音符', selector: '.operator_sc.jp_note[keycode=98]', isSelect: false },
						{ url: 'v2/images/note_5_j.png', title: '16分音符', selector: '.operator_sc.jp_note[keycode=99]', isSelect: false },
						{ url: 'v2/images/note_4_j.png', title: '八分音符', selector: '.operator_sc.jp_note[keycode=100]', isSelect: false },
						{ url: '', title: '下一页', fn: () => changeNumberKeypadIndex(1), isSelect: false },
						{ url: 'images/rest.png', title: '休止符', selector: '.reststatus', isSelect: false },
						{ url: 'v2/images/note_3_j.png', title: '四分音符', selector: '.operator_sc.jp_note[keycode=101]', isSelect: false },
					],
					[
						{ title: '箭头', fn: switchPrachEditor, isSelect: false, updateIsSelect() { this.isSelect = !draw_editor } },
						{ url: 'images/other3.png', isKeepSelect: true, title: '重音记号', fn: () => changeAbc(txt => `!>!${txt}`), isSelect: false },
						{ url: 'images/other4.png', isKeepSelect: true, title: '跳音', fn: () => changeAbc(txt => `.${txt}`), isSelect: false },
						{ url: 'images/other5.png', isKeepSelect: true, title: '保持音', fn: () => changeAbc(txt => `!emb!${txt}`), isSelect: false },
						{ url: 'v2/images/yingao3.png', isKeepSelect: true, title: '还原', selector: '.pitchbtn[value="="]', isSelect: false },
						{ url: 'v2/images/yingao1.png', isKeepSelect: true, title: '升号', selector: '.pitchbtn[value="^"]', isSelect: false },
						{ url: 'v2/images/yingao2.png', isKeepSelect: true, title: '降号', selector: '.pitchbtn[value="_"]', isSelect: false },
						{ url: '', title: '上一页', fn: () => changeNumberKeypadIndex(-1), isSelect: false },
						{ url: 'images/yy2.png', isKeepSelect: true, title: '倚音', fn: () => changeAbc(txt => `{b}${txt}`), isSelect: false },
						{ url: 'v2/images/cs.png', isKeepSelect: true, title: '重升', selector: '.pitchbtn[value="^^"]', isSelect: false },
						{ url: 'v2/images/cj.png', isKeepSelect: true, title: '重降', selector: '.pitchbtn[value="__"]', isSelect: false },
						{ url: 'images/yy1.png', isKeepSelect: true, title: '倚音', fn: () => changeAbc(txt => `{/b}${txt}`), isSelect: false },
						{ url: 'images/slur.png', isKeepSelect: true, title: '连线', fn: lineTo, isSelect: false },
						{ url: 'images/b5.png', isKeepSelect: true, title: '延长记号', fn: () => changeAbc(txt => `!fermata!${txt}`), isSelect: false },
						{ url: '', title: '下一页', fn: () => changeNumberKeypadIndex(1), isSelect: false },
						{},
						{}
					]
				]
			},
			panzoom: {
				scale: 1
			},
			ctxMenu: {
				isShow: false,
				x: 0, y: 0,
				isSelectNote: false,
				isSelectBar: false,
				copyNoteInfo: user.copyNoteInfo,
				copyBarInfo: copyNodeInfo
			},
			newScore: {
				musicType: {
					show: true,
					list: [
						{ title: '简谱', val: 'easy', img: '/img/jianpu.png' },
						{ title: '大谱表', val: 'big', img: '/img/da_pu_piao.png' },
						{ title: '高音谱表', val: 'treble', img: '/img/gao_yin.png' },
						{ title: '低音谱表', val: 'bass', img: '/img/di_yin.png' },
						{ title: '合唱四声部', val: 'four', img: '/img/he_chang.png' },
					]
				},
				scoreOptsShow: false,
				keySignType: 'up',
				keySignUpList: [
					{ title: 'C大调', img: '/img/C.png', val: 'C' },
					{ title: 'G大调', img: '/img/G.png', val: 'G' },
					{ title: 'D大调', img: '/img/D.png', val: 'D' },
					{ title: 'A大调', img: '/img/A.png', val: 'A' },
					{ title: 'E大调', img: '/img/E.png', val: 'E' },
					{ title: 'B大调', img: '/img/B.png', val: 'B' },
					{ title: '#F大调', img: '/img/-F.png', val: 'F#' },
					{ title: '#C大调', img: '/img/-C.png', val: 'C#' },
				],
				keySignDownList: [
					{ title: 'C大调', img: '/img/C.png', val: 'C' },
					{ title: 'F大调', img: '/img/F.png', val: 'F' },
					{ title: 'bB大调', img: '/img/bB.png', val: 'Bb' },
					{ title: 'bE大调', img: '/img/bE.png', val: 'Eb' },
					{ title: 'bA大调', img: '/img/bA.png', val: 'Ab' },
					{ title: 'bD大调', img: '/img/bD.png', val: 'Db' },
					{ title: 'bG大调', img: '/img/bG.png', val: 'Gb' },
					{ title: 'bC大调', img: '/img/bC.png', val: 'Cb' }
				],
				isBeatNoteListShow: false,
				beatNoteList: new Array(12).fill(0).map((v, i) => i + 1 + ''),
				isBeatNoteList2Show: false,
				beatNoteList2: ['2', '4', '8', '16'],
				speedTxtList: [
					{ val: "40", txt: "Grave" },
					{ val: "46", txt: "Largo" },
					{ val: "52", txt: "Lento" },
					{ val: "56", txt: "Adagio" },
					{ val: "60", txt: "Larghtto" },
					{ val: "66", txt: "Andante" },
					{ val: "69", txt: "Andantino" },
					{ val: "88", txt: "Moderato" },
					{ val: "108", txt: "Allegretto" },
					{ val: "132", txt: "Allegro" },
					{ val: "160", txt: "Vivace" },
					{ val: "184", txt: "Presto" },
					{ val: "208", txt: "Prestissimo" },
				],
				speedNoteList: [
					{ val: '4/4', img: '' },
					{ val: '2/4', img: '' },
					{ val: '1/4', img: '' },
					{ val: '1/8', img: '' }
				],
				scoreOpts: {
					title: '标题',
					subTitle: '副标题',
					compose: '作曲家',
					lyricist: '作词家',
					isWeak: false,
					weakBarTop: '1',
					weakBarBot: '4',
					keySign: 'C',
					beatNote1: '4',
					beatNote2: '4',
					beatType: 'custom',
					musicType: 'easy',
					speedType: 'txt',
					speedText: 'Moderato',
					speedNote: "1/4",
					speedNum: "88",
					rows: '2',
					rowBars: '4'
				},
				previewUrl: './preview.html'
			}
		}
	},
	methods: {
		// -------图片上传组件---------
		setFileHtml : function(file) { // 根据文件类型，显示不同的对象
			return setFileHtml(file);
		},
		removeFile : function(file, idx) { // 移除文件
			delFile(file, this.$refs.upload, this.fileUpload.showFiles, idx, function(){
				content.fileUpload = getFileData();
				Vue.nextTick(function(){
					if(content.fileUpload.files.length == 0){
						$('.upload-add').show();
					}
				})
			});
		},
		uploadFile : function( cb) { // 启动上传，将文件传至服务器
			if (this.$refs.upload) {
				this.$refs.upload.active = true;
			}
		},
		inputFile : function(newFile, oldFile) {// 文件提交时，或者文件变更时触发
			// 将文件加入到展示列表中或者提交到服务器（启动上传后）
			var that = this;
			submitFile(newFile, oldFile, this.fileUpload.showFiles, function(result, msg) {
				console.log('submitFile:',result)
				if (result == 1) {// 文件成功上传到服务器之后，开始保存
					that.saveForm();
				}
			});
		},
		// -------图片上传组件 end ---------
		// 查找导航
		navFound: function( menuCode ){
			return this.menuList.find(function(item){
				return item.menuCode == menuCode ;
			})
		},
		// 查找导航项
		navItemFound: function( menuCode, code){
			var navPo = this.navFound( menuCode);
			if(!navPo){
				return;
			}
			return navPo.subMenuList.find(function(item){
				return item.code == code ;
			})
		},
		// 顶级菜单
		navClick: function( menuCode){
			var e = window.event;
			//console.log('e-----',window.event);
			// 防止点击子菜单因为冒泡引起闪现
			if(e.target.nodeName.toLowerCase() != 'li'){
				return;
			}
			this.menuActive = this.menuActive == menuCode ? '' : menuCode;
		},
		// 一级菜单 isNotTrigger 是否出发选中事件
		navItemClick: function(m, n, menuCode){
			if(!this.menuList[m].subMenuList[n].checkbox){
				return;
			}
			this.menuList[m].subMenuList[n].isChecked = !this.menuList[m].subMenuList[n].isChecked;
			this.setUsuallyFunc();
		},
		// 键盘收起、展开
		keyboardClick: function(){
			this.keyboardShow = !this.keyboardShow;
			/*
			 * if(this.keyboardShow && !this.headerInBottom){
			 * $('#content').css('padding-bottom', '200px'); }else{
			 * $('#content').css('padding-bottom', '0'); }
			 */
		},
		// 初始化常用功能
		setUsuallyFunc: function(){
			this.usuallyFuncList= [];
			for(var i = 0; i < this.menuList.length; i++){
				var curMenu = this.menuList[i];
				var funcJson = this.usuallyFuncList.find(item => item.menuCode == curMenu.menuCode);
				if(!funcJson){
					funcJson = {};
					funcJson.menuCode = curMenu.menuCode;
					funcJson.orderby = curMenu.orderby;
				}
				for(var j = 0; j < curMenu.subMenuList.length; j++){
					var curSubMenu = curMenu.subMenuList[j];
					if(curSubMenu.isChecked && curSubMenu.checkbox){
						funcJson.subMenuList = funcJson.subMenuList || [] ;
						funcJson.subMenuList.push(curSubMenu);
					}
				}
				this.usuallyFuncList.push(funcJson);
				// 将功能保存在缓存中
				localStorage.setItem('usuallyFuncList', JSON.stringify(this.usuallyFuncList));
			}
			Vue.nextTick(function(){
				bindAllEvent();
			})
		},

		// 初始化功能栏
		loadUsuallyFunc: function(){
			if(typeof this.menuList == 'undefined'){
				return;
			}
			var usuallyFuncList = localStorage.getItem('usuallyFuncList');
			if(usuallyFuncList){
				usuallyFuncList = JSON.parse(usuallyFuncList);
				// 回调工具栏
				this.usuallyFuncList = usuallyFuncList;
			}
			
			for(var i = 0; i < this.menuList.length; i++){
				if(!this.menuList[i].subMenuList){
					continue;
				}
				var menuCode = this.menuList[i].menuCode;
				// 功能
				var umenuJson = usuallyFuncList ? usuallyFuncList.find(item => item.menuCode == menuCode) : null;
				
				for(var j = 0; j < this.menuList[i].subMenuList.length; j++){
					var subMen = this.menuList[i].subMenuList[j];
					if( subMen && subMen.checkbox){
						
						if(umenuJson && umenuJson.subMenuList){
							usubMenuJson = umenuJson.subMenuList.find(item => item.code == subMen.code);
						}
						subMen.isChecked = typeof usubMenuJson != 'undefined' ? usubMenuJson.isChecked : false;
						// 视图选中特殊处理
						if( 'view' == menuCode){
							switch (subMen.code) {
								case 'symbol':
									// 音符面板
									this.symbolPanelShow = subMen.isChecked;
									// 当前是打开状态，那么点击之后就关闭
									leftPanelClick('.left-show-img', !this.symbolPanelShow);
									break;
								case 'attr':
									// 音符面板
									this.attrPanelShow = subMen.isChecked;
									break;
								case 'edit':
									// 语法编辑
									this.editorShow = subMen.isChecked;
									this.editorClickComm();
									break;
								case 'keyboard':
									// 钢琴键盘
									this.keyboardShow = subMen.isChecked;
									break;
								case 'chordpanel':
									// 钢琴键盘
									this.chordPanelShow = subMen.isChecked;
									this.chordPanelClick(this.chordPanelShow)
									break;
							}
						}
					}
					
				}
			}
		},
		
		// 任务栏下拉框内容点击事件
		pullToolClick: function(code, isShow, idx){
			this.toolList[idx + 1].isShow = !isShow; // 这里+1是因为编辑版块是常显的，下拉框是没有编辑板块的选项的，toolList比pulldownToolList多一个元素,所以索引要+1
// if(isShow){
// var tIdx;
// for(var i in this.toolList){
// var item = this.toolList[i];
// if(item.code == code){
// tIdx = i;
// break;
// }
// }
// this.toolList.splice(tIdx, 1);
// }else{
// this.toolList.push(toolTemp[code]);
// }
			this.pulldownToolList[idx].isShow = !isShow;	
			setTimeout(function(){
				// initBodyHeight();
			}, 10);
		},
		
		// 工具栏展开、收起按钮
		expandClick: function(idx){
			this.toolList[idx].isExpand = !this.toolList[idx].isExpand;
// var isExpand = $('#' + id).hasClass('contract');
// if(isExpand){ //当前展开状态
// $('#' + id).attr('title', '展开').prev().css({
// 'max-width': '220px'
// });
// }else{ //当前收起状态
// $('#' + id).attr('title', '收起').prev().css({
// 'max-width': '1000px'
// });
// }
//			
// $('#' + id).toggleClass('contract');
			// 过渡动画执行0.3s，0.3s后重新计算body-box高度
			setTimeout(function(){
				// initBodyHeight();
			}, 300);
		},
		
		// 工具栏内容点击事件
		toolItemClick: function(code, id, value){
			switch(code){
				case 'edit': 	// 编辑版块
					break;
				case 'note':	// 音符版块
					break;
				case 'length':	// 长度版块
					break;
				case 'height':	// 音高版块
					break;
				case 'rest': 	// 休止符版块
					break;
				case 'bar':		// 小节版块
					break;
				case 'ruler': 
					this.rulerClick(id, value);
					break;
				case 'rhythm':
					break;
				case 'clef':
					break;
				case 'dur':
					break;
				default: 
					
			}
		},
		
		// 编辑器显示、隐藏
		editorClick: function( editorShow ){
			var isShow = $('#editor').hasClass('menu-pressed');
			if(isShow){
				this.editorShow = false;
			}else{
				this.editorShow = true;
			}
			this.editorClickComm();
		},
		//和弦编辑
		chordPanelClick: function( chordPanelShow ){
			if(chordPanelShow===true){
				$(".choir-sel").show();
				$("#markType").change();
				return;
			}else if(chordPanelShow===false){
				$(".choir-sel").hide();
				$(".marktype").hide();
				return;
			}
			var checked = $(".chordpanel").hasClass("checked");
			if(checked){
				$(".choir-sel").hide();
				$(".marktype").hide();
			}else{
				$(".choir-sel").show();
				$("#markType").change();
			}
			
		},
		
		editorClickComm: function( ){
			var isNumStaffEditorShow = $('#numstaffeditor').hasClass('menu-pressed');
			if(isNumStaffEditorShow){
				this.numstaffClick()
			}
			// if(this.editorShow){
			// 	$('.right-top').css({
			// 		height: '60%'
			// 	});
			// 	$('.right-bottom').css("height","40%").show();
			// 	$("#numstaffinput").css("display","none");
			// 	$('#editor').addClass('menu-pressed');
			// 	if($("#source_float_div").css("display")=="block"){
					
			// 		$("#abcform").append($("#source"))
			// 		$( '#source' ).each(function () {
			// 			this.style.setProperty( 'width', '100%', 'important' );
			// 		});
			// 		$("#source").height($(".right-bottom").height())
			// 		$("#source").css("position","static");
			// 		$("#source_float_div").hide();
			// 	}
			// }else{
			// 	$('.right-top').css({
			// 		height: '100%'
			// 	});
			// 	$('.right-bottom').hide();
			// 	$('#editor').removeClass('menu-pressed');
			// }
		},
		
		// 节拍器打开、关闭
		metronomeClick: function(){
			$('#metronome').toggleClass('menu-pressed');
			playMetro = !playMetro;
			src_change();
		},
		// 简谱编辑器显示、隐藏
		numstaffClick:function(){
			var isEditorShow = $('#editor').hasClass('menu-pressed');
			if(isEditorShow){
				this.editorClick()
			}
			var isNumStaffEditorShow = $('#numstaffeditor').hasClass('menu-pressed');
			$('#numstaffeditor').toggleClass('menu-pressed');
			if(isNumStaffEditorShow){
				$("#numstaffinput").css({
					left:$(".body-left").width(),
					width:$('.right-top').width(),
					display:"none"
				});
			}else{
				$("#numstaffinput").css({
					left:$(".body-left").width(),
					width:$('.right-top').width(),
					display:""
				});
				$("#numstaffinput").focus();
			}
		},
		// 谱例属性显示、隐藏
		plsxClick: function(){
			$('.plsx-box').toggleClass('hide');
			$('#plsx').toggleClass('menu-pressed');
			setSpeedSelected();
		},
		
		// 点击"文件"
		rightMenuClick: function(){
			hideMenu();
			$('.menu-list-other').toggleClass('hide');
		},
		
		// 工具菜单下拉框选项显示、隐藏
		menuClick: function(id){
			hideMenu();
			var isShow = $('#' + id).hasClass('menu-pressed');
			$('#' + id).toggleClass('menu-pressed');
			if(isShow){
				$('#' + id).find('.menu-pulldown-box').hide();
			}else{
				$('#' + id).find('.menu-pulldown-box').show();
			}
		},
		
		// 谱音同步选择 value: 0: 谱音同步 1: 只播图像 2: 只播声音
		pytbChoose: function(value){
			hideMenu();
			this.pytbOption = value;
			changeChoice();
		},
		
		// 乐器的选择
		instrumentChoose: function(value){
			mystop();
			hideMenu();
			this.instrumentOption = value;
			var selNodes = $("svg[type='rectnode']");
			if(selNodes.length>0){
				//如果有选中小节，则设置小节对应的声部的音色
				var id = $(selNodes[0]).attr("id");
				var vStr = id.replace("mysvgnode","");
				var v = vStr.split("_")[0];
				setVoiceInstrument(parseInt(v)+1,value)
			}else{
				set("%%MIDI program",value);
			}
			var txt = "";
			var tmp_interval = setInterval(function(){
				txt = $("#playspan").text();
				if(txt=="播放"){
					abc_change();
					clearInterval(tmp_interval);
					return;
				}
			},100);
		},
		playingInstrumentChange:function(value,name){
			console.log("播放中更换音色：",value)
			this.playingInstrumentOption = value;
			$("#instruSpan").html(name);
			$("#playInstrument").css("width",20*name.length+"px");
			user.tmpInstru = value;
		},
		
		// 是否同步键盘时值
		tbjpszClick: function(){
			this.isTbjpsz = !this.isTbjpsz;
		},
		
		initToolList: function(){
			// 工具栏=》编辑常开，默认打开：音符、长度、音高、休止符
// this.toolList.push(toolTemp['note']);
// this.toolList.push(toolTemp['length']);
// this.toolList.push(toolTemp['height']);
// this.toolList.push(toolTemp['rest']);
			var list = this.pulldownToolList;
			for(var i = 0; i < list.length; i++){
				var obj = toolTemp[list[i].code];
				obj.isShow = list[i].isShow;
				this.toolList.push(obj);
			}
		},
		
		rulerClick: function(id, value){
			if(value == 1){
				activeRuler = 'tone-ruler';
				$('.' + activeRuler).css('left', '872px');
			}else if(value == 2){
				activeRuler = 'dshx-ruler';
				$('.' + activeRuler).css('left', '895px');
			}else if(value == 3){
				activeRuler = 'xshx-ruler';
				$('.' + activeRuler).css('left', '895px');
			}else{
				activeRuler = null;
			}
			var flag = $('#' + id).hasClass('selected');
			if(flag){
				$('.ruler-img').removeClass('selected');
				$('.ruler').hide();
			}else{
				$('.ruler-img').removeClass('selected');
				$('#' + id).addClass('selected');
				$('.ruler').hide();
				if(activeRuler){
					$('.' + activeRuler).show();
				}
			}
		},
		// 绘制曲式
		startDrawMF: function(){
			var that = this;
			if(!this.abcSel.isOpen){
				this.abcSel.action = 'open';
				var abcContent = $('#source').val();
				abcContent = setAbcKeyValue(abcContent,'%%staffsep', 100/scale);
				var mf = getAbcKeyValue(abcContent, '%%musicform');
				if(mf){
					mfSetting = JSON.parse(mf);
				}else{
					mfSetting = new Array();
				}
				$('#source').val(abcContent);
				src_change();
			}else{
				var abcContent = $('#source').val();
				this.abcSel.action = 'close';
				if(this.showMusicForm){
					this.abcSel.close();
				}else{
					abcContent = removeAbcKeyValue(abcContent,'%%staffsep');
				}
				if(mfSetting && mfSetting.length > 0){
					abcContent = setAbcKeyValue(abcContent,'%%musicform', JSON.stringify(mfSetting));
				}else{
					abcContent = removeAbcKeyValue(abcContent,'%%musicform');
				}
				$('#source').val(abcContent);
				src_change();
			}
			
		},
		// 展示曲式
		showMF: function(){
			this.showMusicForm = !this.showMusicForm;
			
			var abcContent = $('#source').val();
			var mf = getAbcKeyValue(abcContent, '%%musicform');
			if(this.showMusicForm && mf){
				abcContent = setAbcKeyValue(abcContent,'%%staffsep', 100/scale);
			}else{
				abcContent = removeAbcKeyValue(abcContent,'%%staffsep');
			}
			$('#source').val(abcContent);
			src_change();
		},
		
		// 曲式分析相关
		
		setStyle: function(v){
			var that = this;
			if(!that.musicForm.fieldno){
				return;
			}
			function repStyle( v){
				that.musicForm.fieldno = that.musicForm.fieldno.replace(/(\d)/g,function(params){
					return '<' + v + '>' + arguments [0]+ '</' + v + '>';
				})
			}
			this.inpdisable = true;
			this.musicForm.fieldno = this.musicForm.fieldno.replace(/<.*?>/g,'');
			switch (v) {
				case 'sub':
					 repStyle( v)
					break;
				case 'sup':
					 repStyle( v)
					break;
				default:
					break;
			}
			
		},
		inpEdit: function(){
			this.setStyle('restore');
			this.inpdisable = false;
		},
		// 曲式分析相关
		// 提交
		submit: function(){
			var that = this;
			
			if(!that.validForm()){
				return;
			}
			if (that.fileUpload.files.length > 0) {
				// 有文件的，先上传文件
				that.uploadFile();
			} else {
				that.saveForm();
			}
		},
		// 保存前数据完整性验证
		validForm: function(){
			if(!this.musicForm.fieldno){
				alert('请输入编号');
				return false;
			}
			if(!this.musicForm.fieldname){
				alert('请输入段落名称');
				return false;
			}
			if(!this.musicForm.bgcolor){
				alert('请选择背景颜色');
				return false;
			}
			if(!this.musicForm.fielddesc){
				alert('请输入 段落内容');
				return false;
			}
			if(Number(this.musicForm.startNodeIndex) + '' == 'NaN'){
				alert('请入音符的起始位置');
				return false;
			}
			if(Number(this.musicForm.endNodeIndex) + '' == 'NaN'){
				alert('请入音符的终止位置');
				return false;
			}
			return true;
			
		},
		
		// 保存曲式结构数组
		saveForm: function(){
			
			if(this.fileUpload.fileData.groupid){
				this.musicForm.groupid = this.fileUpload.fileData.groupid;
			}
			
			if(this.cmd == 'A'){
				mfSetting.push(clone(this.musicForm));
			}else{
				var id = this.musicForm.id;
				var index = mfSetting.findIndex(function(item){
					return item.id == id;
				})
				mfSetting.splice(index, 1, clone(this.musicForm));
			}
			renderMusicForm(mfSetting, scale, this.abcSel.isSelNote);
			$('#MUSIC_FORM_div').modal('hide');
		},
		
		validMusicForm: function(){
			
			var that = this;
			var id = this.musicForm.id;
			var endNodeIndex = this.musicForm.endNodeIndex - 0;
			var startNodeIndex = this.musicForm.startNodeIndex - 0;
			var musicFormList = mfSetting;
			var flag = true;
			
			var regionPo = this.musicForm;
			if(regionPo){
				
				// 寻找父级节点，判断是否超出父级的范围
				var parentRegionPo = musicFormList.find(item => item.id == regionPo.pid);
				if(parentRegionPo && startNodeIndex < parentRegionPo.startNodeIndex - 0){
					//this.musicForm.startNodeIndex = parentRegionPo.startNodeIndex - 0;
					flag = false;
					alert('不能超出上一级的范围');
					return;
				}
				
				if(parentRegionPo && endNodeIndex > parentRegionPo.endNodeIndex - 0){
					//this.musicForm.endNodeIndex = parentRegionPo.endNodeIndex - 0;
					flag = false;
					alert('不能超出上一级的范围');
					return;
				}
				
				// 判断是否存在靠后的兄弟节点，结束时间不能超过靠后的兄弟的开始时间
				var siblingsBackRegionPo = musicFormList.find(item => item.pid == regionPo.pid && item.startNodeIndex > Number(regionPo.startNodeIndex) && item.id != id);
				if(siblingsBackRegionPo && endNodeIndex > siblingsBackRegionPo.startNodeIndex - 0){
					//this.musicForm.endNodeIndex = siblingsBackRegionPo.startNodeIndex;
					flag = false;
					alert('不能进入同级的范围');
					return;
				}
				
				// 判断是否存在靠前的兄弟节点，开始时间不能小于靠前的兄弟的结束时间
				var siblingsFrontRegionPo = musicFormList.find(item => item.pid == regionPo.pid && item.startNodeIndex <  Number(regionPo.startNodeIndex) && item.id != id);
				if(siblingsFrontRegionPo && startNodeIndex < siblingsFrontRegionPo.endNodeIndex - 0){
					//this.musicForm.startNodeIndex = siblingsFrontRegionPo.endNodeIndex;
					flag = false;
					alert('不能进入同级的范围');
					return;
				}
			}
			return flag;
		},
		saveJxbzAbc: function() {
			var windowOpener = window.opener;
			typeof windowOpener.postMessage == 'function' && windowOpener.postMessage($('#source').val(), '*');
			window.close();
		},

		// ———————————————————————————————————————— 分割线 __method ————————————————————————————————————————
		changeSelectNote() {
			this.selectNote = $('.selected_text')[0] || null
		},
		changeSelectBar() {
			setTimeout(() => {
				this.selectBar = $('svg[type="rectnode"]')[0] || null
			}, 300)
		},
		changeMenuIndex(i) {
			if (this.m.menuIndex == i) {
				this.m.menuIndex = -1
				return
			}
			this.m.menuIndex = i
		},
		checkIsSelectBar(showAlert = true) {
			console.log(1234)
			let selectSvg = null
			$('svg').each((i, e) => {
				if (!e?.id.includes('mysvgnode')) return
				selectSvg = e
			})
			!selectSvg && showAlert && alert('请选中小节')
			return selectSvg
		},
		checkIsSelectNote(showAlert = true) {
			const selectNote = $('.selected_text')[0]
			console.log(selectNote)
			!selectNote && showAlert && alert('请选中音符')
			return selectNote
		},
		inputFile(e) {
			/** @type { File } */
			const file = e.target.files[0]
			/** @type { 'xml' | 'musicxml' | 'mid' } */
			const fileExt = (file.name.match(/[^\.]+$/) || [''])[0].toLowerCase()
			switch (fileExt) {
				case 'xml':
				case 'musicxml': {
          leesFile();
					break
				}
				case 'mid': {
					postmidifile()
					break
				}
				default: {
					alert('仅支持 xml，musicxml，mid 格式的文件')
				}
			}
		},
		emitNumKeybordFn(/** @type { string }*/ code) {
			const i = {
				NumLock: 0,
				NumpadDivide: 1,
				NumpadMultiply: 2,
				NumpadSubtract: 3,
				Numpad7: 4,
				Numpad8: 5,
				Numpad9: 6,
				NumpadAdd: 7,
				Numpad4: 8,
				Numpad5: 9,
				Numpad6: 10,
				Numpad1: 11,
				Numpad2: 12,
				Numpad3: 13,
				NumpadEnter: 14,
				Numpad0: 15,
				NumpadDecimal: 16,
			}[code]
			if (i === undefined) return
			const { page } = this.m.numberKeypad
			const type = ['staffList', 'all', 'easyList'][musicType]
			const { selector, fn, isKeepSelect } = this.m.numberKeypad[type][page][i]
			if (fn) {
				if (isKeepSelect) keepSelectNote(fn)
				else fn()
			}
			if (selector) {
				if (isKeepSelect) keepSelectNote(() => $(selector).click())
				else $(selector).click()
			}
		},
		changeNumKeypadSelect() {
			const { page } = this.m.numberKeypad
			const type = ['staffList', 'all', 'easyList'][musicType]
			const list = this.m.numberKeypad[type][page]
			setTimeout(() => {
				list.forEach((item, i) => {
					if (item.updateIsSelect) return item.updateIsSelect()
					if (!item.selector) return
					item.isSelect = $(item.selector).hasClass('selected')
				})
			})
		},
		initCtxMenu() {
			this.m.ctxMenu.isShow = false
		},
		initPanZoom() {
			/** @type { HTMLElement } */
			const panZoomEl = document.querySelector('#panZoom')
			window.panzoom = Panzoom(panZoomEl, {
				animate: true,
				minScale: 0.5,
				maxScale: 1.5,
				step: 0.1,
				overflow: 'auto',
				cursor: 'move',
				// disablePan: true
			})

			panZoomEl.addEventListener('panzoomzoom', e => {
				this.m.panzoom.scale = e.detail.scale
			})

			window.addEventListener('wheel', e => {
				if (!e.ctrlKey) return
				e.preventDefault()
				panzoom.zoomWithWheel(e)
			}, { passive: false })
			// window.addEventListener('keydown', e => {
			// 	if (e.code !== 'Space') return
			// 	e.preventDefault()
			// 	panzoom.setOptions({ disablePan: false, cursor: 'grab' })
			// })
			// window.addEventListener('keyup', e => {
			// 	if (e.code !== 'Space') return
			// 	panzoom.setOptions({ disablePan: true, cursor: 'default' })
			// })
		},
		getSelectedNote() {
			if ($('.selected_text').length <= 1) return $('.selected_text')[0]
			return $('.selected_text')
		},
		getSelectedBar() {
			if ($('svg[type="rectnode"]').length <= 1) return $('svg[type="rectnode"]')[0]
			return $('svg[type="rectnode"]')
		},
		/**
		 * 打开右键菜单
		 * @param { MouseEvent } e 
		 */
		openCtxMenu(e) {
			this.m.ctxMenu.x = e.clientX
			this.m.ctxMenu.y = e.clientY
			this.m.ctxMenu.isSelectNote = !!this.getSelectedNote()
			this.m.ctxMenu.isSelectBar = !!this.getSelectedBar()
			this.m.ctxMenu.copyNodeInfo = user.copyNoteInfo
			this.m.ctxMenu.copyBarInfo = copyNodeInfo
			this.m.ctxMenu.isShow = true
		},

		openNewTab() {

		},
		renderNewScore() {

		}
	},
	computed: {
		getMenuTxt() {
			return this.m.menuList[this.m.menuIndex]?.txt
		},
		getNumberKeypadPosStyle() {
			const { x, y } = this.m.numberKeypad.position
			return `transform: translate(${x}px, ${y}px);`
		},
		getCtxMenuList() {
			const { isSelectNote, isSelectBar, copyNodeInfo, copyBarInfo } = this.m.ctxMenu
			const menuList = []
			// TODO 曲式标记
			// if (this.abcSel.isOpen) return [
			// 	{ title: '删除全部曲式', fn: delAllMF },
			// 	{ title: '退出曲式标记', fn: this.startDrawMF }
			// ]
			if (isSelectNote || isSelectBar) {
				menuList.push(
					{ title: `复制`, subTitle: 'Ctrl + C', fn: copy },
					{ title: `粘贴`, subTitle: 'Ctrl + V', disabled: !(isSelectBar && copyBarInfo.size) && !(isSelectNote && copyNodeInfo.s) , fn: paste },
					{ title: `剪切`, subTitle: 'Ctrl + X', fn: () => copy() | isSelectBar ? delSelectedNode() : delSelNote() },
					{ title: '删除', subTitle: 'Backspace', fn: () => isSelectBar ? delSelectedNode() : delSelNote() },
				)
			}
			menuList.push({ title: '撤回', subTitle: 'Ctrl + Z', fn: goback })
			if (isSelectBar) menuList.push({ title: '添加小节', childList: [] })
			if (isSelectNote) menuList.push({ title: '添加歌词', childList: [
				{ title: '添加歌词', fn: () => createLyricEditor() }
			] })
			// TODO 曲式标记
			// menuList.push({ title: '曲式标记', fn: this.startDrawMF })
			if (isSelectBar || isSelectNote) menuList.push(
				{ title: '移高八度', fn: up8 },
				{ title: '移低八度', fn: down8 }
			)
			return menuList
		}
	},
	watch: {
		// 当任务栏列表有变化的时候，重新计算body-box的高度
/*
 * toolList: function(){ setTimeout(function(){ initBodyHeight(); }, 100); }
 */
 		// 监听’键盘‘伸缩
		keyboardShow: function(val){
			var viewPo = this.navItemFound('view' ,'keyboard');
			if(viewPo){
				viewPo.isChecked = val;
				$('.keyboard-bar .restore').click();
			}
		},
		
		// 监听‘语法编辑器’显隐
		editorShow: function(val){
			var viewPo = this.navItemFound('view' ,'edit');
			if(viewPo){
				viewPo.isChecked = val;
			}
		},
		
		// 监听‘符号面板’显隐
		symbolPanelShow: function(val){
			var viewPo = this.navItemFound('view' ,'symbol');
			if(viewPo){
				viewPo.isChecked = val;
			}
			
			Vue.nextTick(function(){
				setTimeout(function(){
					musicAreaSize();
				},300)
			})
		},
		// 监听‘符号面板’显隐
		attrPanelShow: function(val){
			var viewPo = this.navItemFound('view' ,'attr');
			if(viewPo){
				viewPo.isChecked = val;
			}
			
			Vue.nextTick(function(){
				setTimeout(function(){
					musicAreaSize();
				},300)
			})
		},
		
		'cmd': function(val){
			if('A' == val){
				this.setStyle('restore');
				this.inpdisable = false;
			}else {
				this.inpdisable = true;
			}
		},

		// ———————————————————————————————————————— 分割线 __watch ————————————————————————————————————————
		'm.isMusicNoteShow': (function() {
			let timer = null
			return function(isShow) {
				if (timer) clearTimeout(timer)
				leftPanelClick('.left-show-img', !isShow);
				timer = setTimeout(resizeStaff, 500)
			}
		})(),
		'm.lyric': {
			handler: setLyricStyle,
			deep: true
		},
		'm.newScore.scoreOptsShow'(isShow) {
			if (isShow) this.$refs.previewIframeRef?.contentWindow.postMessage(this.m.newScore.scoreOpts, '*')
		},
		'm.newScore.scoreOpts': {
			handler(val) {
				this.$refs.previewIframeRef?.contentWindow.postMessage(val, '*')
			},
			deep: true
		}
	},
	components : {
		FileUpload : VueUploadComponent
	// 文件上传组件
	},
	created: function(){
		var that = this;
		Vue.nextTick(function () {		
			// initBodyHeight();
			setAttrPanelHei();
			$(window).click(function(){
				$('.mf-click-box').remove();
			})
		})
		// 加载常用功能
		this.loadUsuallyFunc();
		
		this.isExe = getUrlParameter("IS_EXE") == '1';

		this.abcSel = new AbcSel(function(first, end){
			if(first >= 0 && end >= 0){
				var obj = new Object();
				obj.startNodeIndex = first;
				obj.endNodeIndex = end;
				that.musicFormObj = obj;
				
				
				// 保存结束之后置空 -- beg
				for(var key in that.musicForm){
					that.musicForm[key] = '';
				}
				$('#mfForm')[0].reset();
				$('#bgcolor').css({
					'background-color': '#fff'
				});
				// 保存结束之后置空 -- end
				
				// create by lhj 曲式参数
				console.log('abcSel曲式参数:')
				that.musicForm.startNodeIndex = first;
				that.musicForm.endNodeIndex = end;
				
				var currRegionData = buildRegionData(that, first, end );
				currRegionData.groupid = that.fileUpload.fileData.groupid = uuid();
				copyJson(currRegionData,that.musicForm);
				that.cmd = 'A';
				
				var flag = that.validMusicForm();
				if(!flag){
					return;
				}
				$("#MUSIC_FORM_div").modal();
			}
		},  ".right-top-content");
		
		// 初始化工具栏
		this.initToolList();
		
		var isJxbz = getUrlParameter('isJxbz');
		var musicType = getUrlParameter('musicType');
		if (isJxbz == '1') {
			this.isJxbz = true;
			if (musicType) {				
				Vue.nextTick(function() {
					switch(musicType) {
						case '0':
							$('.tools-li[title=五线谱]').click();
							break;
						case '1':
							$('.tools-li[title=简线混排]').click();
							break;
						case '2':
							$('.tools-li[title=简谱]').click();
							break;
					}
				})
			}
		}

	},
	mounted() {
		if (Object.keys(scoreOpts).length) $('#source').val(getAbcTemplateCode(scoreOpts))
		document.addEventListener('keydown', e => this.emitNumKeybordFn(e.code))
		this.changeNumKeypadSelect()
		const event = () => {
			this.changeNumKeypadSelect()
			this.initCtxMenu()
			this.changeSelectNote()
			this.changeSelectBar()
		}
		document.addEventListener('keyup', event)
		document.addEventListener('click', event)
		this.initPanZoom()
	}
})

/**
 * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串 sHex为传入的十六进制的色值
 * alpha为rgba的透明度
 */
function colorRgba(sHex, alpha){
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  /* 16进制颜色转为RGB格式 */
  let sColor = sHex.toLowerCase()
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    // 处理六位的颜色值
    var sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    // return sColorChange.join(',')
    // 或
    return 'rgba(' + sColorChange.join(',') + ',' + (alpha ? alpha : 1 ) + ')'
  } else {
    return sColor
  }
}

function abcLoadCball(){
	var that = content_vue;
	if(that.abcSel.action == 'open'){
		that.abcSel.open();
	}else if(that.abcSel.action == 'close'){
		that.abcSel.close();
	}
	that.abcSel.action = '';
	
	if(that.showMusicForm || that.abcSel.isOpen){
		var abcContent = $('#source').val();
		var mf = getAbcKeyValue(abcContent, '%%musicform');
		if(mf){
			mf = JSON.parse(mf);
			renderMusicForm(mf, scale, that.abcSel.isSelNote);
		}
	}
}

// 设置曲式内容
function setMusicForm(){
	var level = $('#musicFormLevel').val();
	var desc = $('#musicFormDesc').val();
	var title = $('#musicFormTitle').val();
	var color = $('#mfColor').val() || '';
	color = colorRgba('#' + color, '0.6');
	var obj = content_vue.musicFormObj;
	if(desc && obj.startNodeIndex >= 0 && obj.endNodeIndex >= 0){
		obj.desc = desc;
		obj.title = title;
		obj.color = color;
		if(obj.isEdit){
			delete obj.isEidt;
			if(mfSetting && mfSetting.length > 0){
				for(var i = 0; i < mfSetting.length; i++){
					var mf = mfSetting[i];
					if(mf.startNodeIndex == obj.startNodeIndex && mf.endNodeIndex == obj.endNodeIndex && mf.level == obj.level){
						obj.level = level;
						mfSetting[i] = obj;
						break;
					}
				}
			}
		}else{
			obj.level = level;
			mfSetting.push(obj);
		}
		$('#musicFormDesc').val('');
		renderMusicForm(mfSetting, scale, content_vue.abcSel.isSelNote);
	}
	
}

// 点击某个曲式
function mfClick(e){
	var that = content_vue;
	if(!that.abcSel.isOpen){
		return;
	}
	var left = e.pageX;
	var top = e.pageY;
	var cn = e.currentTarget.className.split(' ')[1];
	var divstr = '<div class="mf-click-box" style="left: ' + left + 'px;top: ' + top + 'px;"><li onclick="editMF(\'' + cn + '\')">编辑</li>';
	divstr += '<li onclick="musicFormPreview()">预览</li><li onclick="delMF(\'' + cn + '\')">删除</li><li onclick="delAllMF()">全部删除</li>';
	divstr += '</div>';
	$('.mf-click-box').remove();
	$('body').append(divstr);
	
	// 禁止事件冒泡
	if (e && e.stopPropagation) {
		e.stopPropagation();
	} else {
		window.e.cancelBubble = true;
	}
}

/**
 * 曲式预览
 */
function musicFormPreview(){
	var widHei = window.top.getPopWidHei(9999, 9999);
	var id = 'musicformIframe';
	var url = '/abc/musicform/music_form_show_qp.html?iframeId=' +  id;
	window.top.$.popBigWindow(id, url, "曲式分析预览", function() {
	}, {
		width : widHei.width*.8,
		height : widHei.height*.9,
		isIframe : true,
		isAriaHidden: true,
	});
}
function musicFormEdit(){
	var widHei = window.top.getPopWidHei(9999, 9999);
	var id = 'musicformEditIframe';
	var url = '/abc/musicform/music_form_edit_qp.html?iframeId=' +  id;
	window.top.$.popBigWindow(id, url, "曲式分析编辑", function(mf) {
		var  abcContent = $('#source').val();
		if(mf && mf.length > 0){
			abcContent = setAbcKeyValue(abcContent,'%%musicform', JSON.stringify(mf));
		}else{
			abcContent = removeAbcKeyValue(abcContent,'%%musicform');
		}
		$('#source').val(abcContent);
		src_change();
	}, {
		width : widHei.width,
		height : widHei.height,
		isIframe : true,
		isAriaHidden: true,
		isCloseBtn: 0
	});
}

// 选择“编辑”曲式
function editMF(cn){
	var that = content_vue;
	var obj = {
		startNodeIndex: cn.split('-')[1] - 0,
		endNodeIndex: cn.split('-')[2] - 0,
		level: cn.split('-')[3] - 0,
		isEdit: true
	}
	$('#musicFormLevel').val(obj.level);
	$('#musicFormTitle').val($('.' + cn + ':eq(0) > div').text());
	$('#musicFormDesc').val($('.' + cn + ':eq(0) > div').attr('title'));
	that.musicFormObj = obj;
	
	// create by lhj 获取当前区域块的信息
	that.cmd = 'U';
	var id = $('.' + cn).attr('data-id');
	if(mfSetting && mfSetting.length){
		var po = mfSetting.find(function(item){
			return  item.id == id;
		});
		
		if(po){
			copyJson(po, that.musicForm);
		}

		if(po && po.groupid){
			(function(gId, that){
				getFile(gId, function(arr) {
					var files = arr[gId];
					for (var i = 0; i < files.length; i++) {
						that.fileUpload.showFiles.push(files[i]);
					}
				});
			})(po.groupid, that)
		}else{
			that.musicForm.groupid = that.fileUpload.fileData.groupid = uuid();
		}
		
	}
	
	$("#MUSIC_FORM_div").modal();
	
}

// 删除曲式
function delMF(cn){
	swConfirm("确定要删除吗？", "", function(isConfirm){
		if(isConfirm){
			var sn = cn.split('-')[1];
			var en = cn.split('-')[2];
			var level = cn.split('-')[3];
			if(mfSetting && mfSetting.length > 0){
				for(var i = 0; i < mfSetting.length; i++){
					var mf = mfSetting[i];
					if(mf.startNodeIndex == sn && mf.endNodeIndex == en ){
						mfSetting.splice(i, 1);
						$("." + cn).remove();
						break;
					}
//					if(mf.startNodeIndex == sn && mf.endNodeIndex == en && mf.level == level){
//						mfSetting.splice(i, 1);
//						$("." + cn).remove();
//						break;
//					}
				}
			}
		}
	})
}

// 删除全部曲式
function delAllMF(){
	swConfirm("确定要删除全部内容吗？", "", function(isConfirm){
		if(isConfirm){
			mfSetting = new Array();
			$('.music-form').remove();
		}
	})
}

$('.tbjpsz').click(function(){
	$(this).find('img').toggleClass('hide');
});

// 左边列表收起、展开按钮
$('.left-show-img').click(function(){
	var isCurrOpenState = $(this).attr('src').indexOf('left') > -1;
	leftPanelClick(this, isCurrOpenState, function(){
		content_vue.symbolPanelShow = false;
	}, function(){
		content_vue.symbolPanelShow = true;
	})
	if(content_vue.abcSel.isOpen){
		content_vue.abcSel.reBuild();
	}
})

function leftPanelClick( obj, isCurrOpenState ,closeCb, openCb ){
	console.log(obj, isCurrOpenState)
	if(isCurrOpenState){	// 当前展开状态
		$(obj).attr('src', 'v2/images/right.png');
		$('.body-left').css({
			width: 0,
			'min-width': 0
		});
		$('.bottom-box').css('left', 0);
		var left = $("#noteInput").css("left").replace("px","");
		if(-left > 3905 - $(window).width()){
			left = -(3905 - $(window).width());
			$("#noteInput").css("left",left+"px");
		}
		return typeof closeCb == 'function' && closeCb();
	}else{	// 当前收起状态
		$(obj).attr('src', 'v2/images/left.png');
		$('.body-left').css({
			width: '220px',
			'min-width': '220px'
		});
		$('.bottom-box').css('left', '220px');
		return typeof openCb == 'function' && openCb();
	}
}

// 弹出、隐藏工具栏下拉框
$('.tool-title').click(function(e){
	hideMenu();
	$('.pulldown-tool-list').toggleClass('hide');
	// 阻止事件冒泡
	e.stopPropagation();
});

// 左边列表点击展开、收起
$('.body-left ul li').click(function(){
	$(this).children('.arrow').toggleClass('arrow-down');
	$(this).children('span').toggleClass('left-hide-content-show');
	$(this).find('.left-hide-content').toggleClass('left-hide-content-show');
});

// 阻止事件冒泡，收起列表
$('.left-hide-content').click(function(e){
	e.stopPropagation();
});

// 点击任意地方隐藏工具栏下拉框
$(document).click(function(){
	$('.pulldown-tool-list').addClass('hide');
	$('.menu-pulldown-box').hide();
	$('#pytb').removeClass('menu-pressed');
	$('#instrument').removeClass('menu-pressed');
	$('#playInstrument').removeClass('menu-pressed');
	$('.menu-list-other').addClass('hide');
});

// 初始化body-box的高度
function initBodyHeight(){
	/*
	 * var bodyHeight = $(window).height() - $('.header-box').outerHeight() -
	 * $('.tool-box').outerHeight();
	 */
	// if(content_vue.headerInBottom){
	// 	$('#content').css({
	// 		'padding-top': 0,
	// 		'padding-bottom': 0
	// 	})
	// }else{
	// 	if(content_vue.keyboardShow){
	// 		$('#content').css({
	// 			'padding-bottom': '200px'
	// 		})
	// 	}else{
	// 		$('#content').css({
	// 			'padding-bottom': 0
	// 		})
	// 	}
	// 	$('#content').css({
	// 		'padding-top': $('.header-box').outerHeight()
	// 	})
	// }
}

// 隐藏菜单下拉框，取消选中状态
function hideMenu(){
	$('.pulldown-tool-list').addClass('hide');
	$('.menu-pulldown-box').hide();
	$('#pytb').removeClass('menu-pressed');
	$('#instrument').removeClass('menu-pressed');
	$('#playInstrument').removeClass('menu-pressed');
	$('.menu-list-other').addClass('hide');
}

// 设置属性面板的高度
function setAttrPanelHei(){
	Vue.nextTick(function(){
		setTimeout(function(){
			var attrHei = $(window).height() - 130;
			if(!$('.bottom-box').hasClass('bottom-box-hide')){
				attrHei += -$('.keyboard-bar').height()- $('.keyboard-box').height() ;
			}
			$('.body-attr').height(attrHei);
		},300)
	})
}

//曲谱曲式分析编辑 -----------------beg
//构建时间片段数据
function buildRegionData(that, startNodeIndex, endNodeIndex){
//	1.1、判断是否被包含在时间片段内，若是则以当前时间片段作为父级片段，反之为父级时间片段（pid:0）
//	1.2、排序号:以父级排序号开始+001，表第一个子节点，以此类推往后累加
	var musicFormList = mfSetting;
	// 开始时间在谁的范围内就是谁的子级
	var arr = musicFormList.filter(item => startNodeIndex >= item.startNodeIndex && startNodeIndex <= item.endNodeIndex);
	
	// 取当前最小时间片段作为父级
	var arr2order = arr.sort((a, b)=>{
		return (a.endNodeIndex - a.startNodeIndex) - (b.endNodeIndex - b.startNodeIndex);
	});
	//debugger;
	var po = arr2order[0];
	// 判断如果超过父级的结束时间那么就取父级的结束时间
	if(po && endNodeIndex > po.endNodeIndex){
	//	that.currRegion.endNodeIndex = endNodeIndex = po.endNodeIndex;
		// 切换当前的wave区域的结束时间 也要改变
	}
	
	//console.log(po)
	var data = {};
	data.id = uuid();
	data.startNodeIndex = startNodeIndex;
	data.endNodeIndex = endNodeIndex;
	data.bgcolor = '';
	data.fieldname = '';
	data.fielddesc = '';
	var str = '000';
	if(po){
		var tmpArr = musicFormList.filter(item => new RegExp( po.orderby + '\\d{1,}','g').test(item.orderby));
		var order = (tmpArr.length + 1 ) + '';
		data.pid = po.id;
		data.orderby = po.orderby + '' + str.slice(0, str.length - order.length) + '' + order;
	}else{
		data.pid = 0;
		var tmpArr = musicFormList.filter(item => new RegExp('^\\d{3}$','g').test(item.orderby));
		var order = (tmpArr.length + 1 ) + '';
		data.orderby =  str.slice(0, str.length - order.length) + '' + order;
	}
	return data;
}

//用于生成uuid
function S4() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
//生成uuid
function uuid() {
	return (S4()+S4()+""+S4()+""+S4()+""+S4()+""+S4()+S4()+S4());
}

/**
* 复制对象
* 
* @param obj
* @returns
*/
function clone(obj){
	if(!obj){
		return obj;
	}
	return JSON.parse(JSON.stringify(obj));
}

function copyJson(source, target, isKeyInTarget) {
	if (!source ) {
		return target;
	}
	if( !target){
		target = {};
	}
	for ( var key in source) {
		if( isKeyInTarget && isKeyInTarget != undefined && target[key] == undefined){
			continue;
		}
		var cvalue = source[key];
		if(isJson( cvalue)){
			if( cvalue.length != undefined){
				// 数组
				var newArr = new Array();
				for (var i = 0; i < cvalue.length; i++) {
					newArr.push(copyJson(cvalue[i]));
				}
				target[key] = newArr;
			}else{
				target[key] = copyJson( cvalue);
			}
		}else{
			target[key] = cvalue;
		}
	}
	return target;
}

/**
* 是否是json数据
* 
* @param str
* @returns
*/
function isJson(str) {  
  try {  
      if (typeof str == "object") {  
          return true;  
      }  
  } catch(e) {  
  }  
  return false;  
}

//曲谱曲式分析编辑 -----------------end
/**
 * 获取abc内容
 */
var getAbcContentObj = function(){
	return {
		abcContent: $('#source').val(),
		musicType: musicType
	};
}
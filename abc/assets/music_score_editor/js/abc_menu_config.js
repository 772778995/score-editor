/**
 * 菜单参数： {code: '', id: '', name: '', classCss: '', value: '', position: '',
 * type: '', url: '', checkbox: true, isChecked: false}
 * 
 * @param code
 *            必填；用于设置常用功能项时查找JSON对象
 * @param id
 *            非必填；
 * @param name
 *            必填；
 * @param classCss
 *            必填；各元素的事件绑定的选择器，推荐使用类选择器
 * @param value
 *            非必填；
 * @param position
 *            非必填；
 * @param type
 *            非必填；
 * @param url
 *            必填；若要添加到常用功能栏，必须设置图片；否则反之
 * @param checkbox
 *            非必填；表示是否可以常用功能栏中添加或删除菜单项；
 * @param isChecked
 *            非必填；与checkbox配套使用；checkbox未设置，isChecked也就不必设置
 */
// 导航菜单
var menuList = [
	{ 
		menuName: '文件', 
		menuCode: 'file',
		orderby: 0,
		subMenuList: [
		      { code: 'newstaff', id: 'newstaff', name: '新建乐谱', classCss: 'newstaff', url: 'assets/music_score_editor/images/new.png', checkbox: true, isChecked: false},
//		      { code: 'plsx', id: 'plsx', name: '谱例属性', classCss: 'plsx', url: 'assets/music_score_editor/images/attr.png', checkbox: false, isChecked: false},
		      { code: 'openfile',  name: '打开文件', classCss: 'openfile', url: 'assets/music_score_editor/images/dakai.png', checkbox: true, isChecked: false},
		      { code: 'saveas', name: '另存文件', classCss: 'saveas', url: 'assets/music_score_editor/images/save.png', checkbox: true, isChecked: false},
		      { code: 'cmsaveas', name: '导出唱名', classCss: 'cmsaveas', url: 'assets/music_score_editor/images/xnrs.png', checkbox: true, isChecked: false},
		      { code: 'exportpic', name: '导出图片', classCss: 'exportpic', url: 'assets/music_score_editor/images/exportpng.png', checkbox: true, isChecked: false},
		      { code: 'exportpdf', name: '导出PDF', classCss: 'exportpdf', url: 'assets/music_score_editor/images/pdf.png', checkbox: true, isChecked: false},
		      { code: 'exportmp3', name: '导出Mp3', classCss: 'exportmp3', url: 'assets/music_score_editor/images/mp3.png', checkbox: true, isChecked: false},
		      { code: 'importmid', name: '导入MIDI', classCss: 'importmid', url: 'assets/music_score_editor/images/importmidi.png', checkbox: true, isChecked: false},
		      { code: 'exportmid', name: '导出MIDI', classCss: 'exportmid', url: 'assets/music_score_editor/images/exportmidi.png', checkbox: true, isChecked: false},
		      { code: 'importxml', name: '导入XML', classCss: 'importxml', url: 'assets/music_score_editor/images/impxml.png', checkbox: true, isChecked: false},
		      { code: 'exportxml', name: '导出XML', classCss: 'exportxml', url: 'assets/music_score_editor/images/exportxml.png', checkbox: true, isChecked: false},
		      { code: 'exportvoicepart', name: '分声部导出', classCss: 'exportvoicepart', url: 'assets/music_score_editor/images/voice-export.png', checkbox: true, isChecked: false},
		      { code: 'exportallvoicepart', name: '一键导出声部', classCss: 'exportallvoicepart', url: 'assets/music_score_editor/images/voice-export.png', checkbox: false, isChecked: false},
		      { code: 'localhistory', name: '本地缓存', classCss: 'localabchistory', url: 'assets/music_score_editor/images/history.png', checkbox: false, isChecked: false},
		      { code: 'serverhistory', name: '历史记录', classCss: 'serverabchistory', url: 'assets/music_score_editor/images/history.png', checkbox: false, isChecked: false},
		      { code: 'mystaff', name: '我的谱例', classCss: 'mystaff', url: 'assets/music_score_editor/images/history.png', checkbox: false, isChecked: false}
		] 
	},
	{ 
		menuName: '编辑', 
		menuCode: 'edit', 
		orderby: 1,
		subMenuList: [
		      { code: 'back' , name: '撤销', classCss: 'back', url: 'assets/music_score_editor/images/back.png', checkbox: true, isChecked: true},
		      { code: 'forward' , name: '恢复', classCss: 'forward', url: 'assets/music_score_editor/images/forward.png', checkbox: true, isChecked: true},
//		      { code: 'cut' , name: '剪切', classCss: 'cut', url: 'assets/music_score_editor/images/cut.png', checkbox: true, isChecked: false},
//		      { code: 'copy' , name: '复制', classCss: 'copy', url: 'assets/music_score_editor/images/copy.png', checkbox: true, isChecked: false},         
//		      { code: 'past' , name: '粘贴', classCss: 'past', url: 'assets/music_score_editor/images/past.png', checkbox: true, isChecked: false},         
		      { code: 'del' , name: '删除', classCss: 'del', url: 'assets/music_score_editor/images/del.png', checkbox: true, isChecked: true},         
		      { code: 'selectedStatus2' ,id:'selectedStatus2', name: '定位', classCss: 'selectedStatus2', url: 'assets/music_score_editor/images/selected.png', checkbox: true, isChecked: false},         
//		      { code: 'enterLine' , name: '换行', classCss: 'enterLine', url: 'assets/music_score_editor/images/enter.png', checkbox: true, isChecked: false},         
		] 
	},
	{ 
		menuName: '视图', 
		menuCode: 'view',
		orderby: 2,
		subMenuList: [		      
  		      { code: 'symbol' , name: '符号面板', classCss: 'symbolPanel', checkbox: true, isChecked: true},
  		      { code: 'attr' , name: '属性面板', classCss: 'attr', checkbox: true, isChecked: true},
		      { code: 'edit' , name: '语法编辑(E)', classCss: 'abcEditor', checkbox: true, isChecked: false},
		      { code: 'keyboard' , name: '钢琴键盘(D)', classCss: 'keyboard', checkbox: true, isChecked: false},
		      { code: 'chordpanel' , name: '和弦', classCss: 'chordpanel', checkbox: true, isChecked: false},
	      ] 
	},
	{ 
		menuName: '乐谱', 
		menuCode: 'music', 
		orderby: 3,
		subMenuList: [
		      { code: 'shiftKey' , name: '移调', classCss: 'shift-key', url: 'assets/music_score_editor/images/yd.png', checkbox: true, isChecked: true},
		      { code: 'changeSpeed' , name: '调速', classCss: 'change-speed', url: 'assets/music_score_editor/images/ts.png', checkbox: true, isChecked: true},
		      { code: 'lyric' , name: '歌词', classCss: 'lyric', url: 'assets/music_score_editor/images/edit_lyric.png', checkbox: true, isChecked: true},
		      { code: 'up8' , name: '升8度', classCss: 'up8', url: 'assets/music_score_editor/images/8va.png', checkbox: true, isChecked: true},
		      { code: 'down8' , name: '降8度', classCss: 'down8', url: 'assets/music_score_editor/images/8vb.png', checkbox: true, isChecked: true},
		] 
	},
	{ 
		menuName: '预览', 
		menuCode: 'preview', 
		orderby: 4,
		subMenuList: [
              { code: 'pytb' , name: '谱音同步', classCss: 'pytb', 
            	  subMenuList: [
    	    		      { code: '0' , name: '谱音同步', classCss: 'symbolPanel'},
    	    		      { code: '1' , name: '只播图像', classCss: 'abcEditor'},
    	    		      { code: '2' , name: '只播声音', classCss: 'keyboard'}                                                   
    	    	  ]
              },
              { code: 'openRhythm' , name: '节奏谱子', classCss: 'openRhythm', url: 'assets/music_score_editor/images/edit_rhythm.png', checkbox: true, isChecked: false},
              { code: 'midiset' , name: 'MIDI设置', classCss: 'midiset', url: 'assets/music_score_editor/images/midi.png', checkbox: true, isChecked: false},
              /*{ code: 'showStrongWeak' , name: '强弱记号', classCss: 'showStrongWeak', url: 'assets/music_score_editor/images/sw.png', checkbox: true, isChecked: false},*/
              { code: 'toggleLyric' , name: '显隐歌词', classCss: 'toggleLyric', url: 'assets/music_score_editor/images/togglelyric.png', checkbox: true, isChecked: false},
              { code: 'showKew' , name: '柯尔文记号', classCss: 'toggleKew', url: 'assets/music_score_editor/images/kewshow.png', checkbox: true, isChecked: false},
              { code: 'voisetting' , name: '音量设置', classCss: 'voisetting', url: 'assets/music_score_editor/images/vol.png', checkbox: true, isChecked: true},
        ] 
	},
//	{ 
//		menuName: '添加', 
//		menuCode: 'add', 
//		orderby: 5,
//		subMenuList: [
//              { code: 'pitch_series' , name: '音高', classCss: 'pitch', 
//            	  subMenuList: [
//    	    			{url: 'assets/music_score_editor/images/yingao1.png', value: '^', name: '升',classCss:"yingao cmenu",position:"before"},		
//    	    			{url: 'assets/music_score_editor/images/yingao2.png', value: '_', name: '降',classCss:"yingao cmenu",position:"before"},
//    	    			{url: 'assets/music_score_editor/images/yingao3.png', value: '=', name: '还原',classCss:"yingao cmenu",position:"before"},
//    	    			{url: 'assets/music_score_editor/images/shengjiang1.png', value: 'up', name: '升一个音',classCss:"up cmenu",id:"up"},
//    	    			{url: 'assets/music_score_editor/images/shengjiang2.png', value: 'down', name: '降一个音',classCss:"down cmenu",id:"down"},
//    	    			{url: 'assets/music_score_editor/images/up-half.png', value: 'uphalf', name: '升半个音',classCss:"uphalf cmenu",id:"uphalf"},
//    	    			{url: 'assets/music_score_editor/images/down-half.png', value: 'downhalf', name: '降半个音',classCss:"downhalf cmenu",id:"downhalf"},
//    	    			{url: 'assets/music_score_editor/images/up8.png', value: 'up8', name: '上升一个八度',classCss:"up8 cmenu",id:"up8"},
//    	    			{url: 'assets/music_score_editor/images/down8.png', value: 'down8', name: '下降一个八度',classCss:"down8 cmenu",id:"down8"}                                               
//    	    	  ]
//              },
//              
//              {	code: 'bar_series',
//          		name: '谱表',
//          		subMenuList: [
//        			{url: 'assets/music_score_editor/images/other23.png', value: '|', name: '小节线',classCss:"operator cmenu",type:"nodeline"},	
//        			{url: 'assets/music_score_editor/images/nodeline2.png', value: '||', name: '双小节线',classCss:"operator cmenu",type:"nodeline"},
//        			{url: 'assets/music_score_editor/images/other24.png', value: '|:', name: '反覆开始',classCss:"operator cmenu",type:"nodeline"},
//        			{url: 'assets/music_score_editor/images/other25.png', value: ':|', name: '反覆结束',classCss:"operator cmenu",type:"nodeline"},
//        			{url: 'assets/music_score_editor/images/jwxjx.png', value: '|]', name: '结尾小结线',classCss:"operator cmenu",type:"nodeline"},
//        			{url: 'assets/music_score_editor/images/other26.png', value: ':||:', name: '',classCss:"operator cmenu",type:"nodeline"},
//        			{url: 'assets/music_score_editor/images/other27.png', value: '|1.', name: '反复跳跃记号1.',classCss:"operator cmenu",type:"nodeline"},
//        			{url: 'assets/music_score_editor/images/other28.png', value: '|2.', name: '反复跳跃记号2.',classCss:"operator cmenu",type:"nodeline"},
//        			{url: 'assets/music_score_editor/images/m.png', value: '#M_div', name: '改变节拍',classCss:"cmenu",datatoggle:"modal",datatarget:"#M_div", id:"changenodebeat"},
//        			{url: 'assets/music_score_editor/images/key.png', value: '#K_div', name: '改变调号',classCss:"cmenu",datatoggle:"modal",datatarget:"#K_div", id:"changenodekey"},
//        			{url: 'assets/music_score_editor/images/speed.png', value: '#Q_div', name: '改变速度',classCss:"cmenu",datatoggle:"modal",datatarget:"#Q_div",id:"changenodespeed"},
//        			{url: 'assets/music_score_editor/images/ph_gy.png', value: '1 treble', name: '高音谱号',classCss:"node_puhao cmenu"},
//        			{url: 'assets/music_score_editor/images/ph_dy.png', value: '1 bass', name: '低音谱号',classCss:"node_puhao cmenu"},
//        			{url: 'assets/music_score_editor/images/ph_zy.png', value: '1 alto', name: '中音谱号',classCss:"node_puhao cmenu"},
//        			{url: 'assets/music_score_editor/images/ph_czy.png', value: '1 tenor', name: '次中音谱号',classCss:"node_puhao cmenu"},
//        			{url: 'assets/music_score_editor/images/hexian.png', value: '[]', name: '和弦',classCss:"operator cmenu",position:"hexian"},
//        			{url: 'assets/music_score_editor/images/nodeseq.png', value: '', name: '显示小节序号',classCss:"shownodeseq cmenu"},
//        			{url: 'assets/music_score_editor/images/firstnodeseq.png', value: '', name: '显示每行首个小节序号',classCss:"showfirstnodeseq cmenu"},
//        			{url: 'assets/music_score_editor/images/direct/staffdown.png', value: '[I:staff +1]', name: '声部下移',classCss:"operator cmenu",position:"before"},
//        			{url: 'assets/music_score_editor/images/direct/staffup.png', value: '[I:staff -1]', name: '声部上移',classCss:"operator cmenu",position:"before"},
//        			{url: 'assets/music_score_editor/images/do_chn.png', value: 'DO', name: '简谱do位置',classCss:"cmenu",datatoggle:"modal",datatarget:"#DO_CHN_div", id:"do_chn"},
//        			{url: 'assets/music_score_editor/images/beijingse.png', value: '"-mb-"', name: '小节背景色',classCss:"operator cmenu nodecolorli",position:"before",type:"nodebg"},
//        			{url: 'assets/music_score_editor/images/beijingse.png', value: '"-nb-"', name: '音符背景色',classCss:"operator cmenu notecolorli",position:"before",type:"notebg"}
//        		]
//              },
//              
//              {
//          		code: 'blur_series',
//          		name: '连音线',
//          		subMenuList: [
//					{ url:"assets/music_score_editor/images/contact.png" ,name:"连音" ,id:"contact", classCss:"contact cmenu"},
//					{ url:"assets/music_score_editor/images/con2.png" ,name:"2连音" ,value:"(2", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/con3.png" ,name:"3连音" ,value:"(3", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/con4.png" ,name:"4连音" ,value:"(4", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/con5.png" ,name:"5连音" ,value:"(5", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/con6.png" ,name:"6连音" ,value:"(6", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/con7.png" ,name:"7连音" ,value:"(7", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/voice_slur_above.png", name:"跨声部连音在上方", classCss:"cmenu overPartUp",  },
//					{ url:"assets/music_score_editor/images/voice_slur_below.png", name:"跨声部连音在下方", classCss:"cmenu overPartDown",  },
//          		]
//          	},
//          	
//            {
//          		code: 'grace_series',
//          		name: '依音',
//          		subMenuList: [
//					{ url:"assets/music_score_editor/images/yy1.png", name:"前依音", classCss:"yy_operator cmenu", value:"{/}", position:"before"},
//					{ url:"assets/music_score_editor/images/yy2.png", name:"前依音", classCss:"yy_operator cmenu", value:"{}", position:"before"},
//					{ url:"assets/music_score_editor/images/yy6.png", name:"后依音", classCss:"yy_operator cmenu", value:"{}", position:"after"},
//          		]
//          	},
//          	
//          	{
//          		code: 'glide_series',
//          		name: '琶音与滑音',
//          		subMenuList: [
//					{ url:"assets/music_score_editor/images/pa.png", classCss:"operator cmenu", value:"!arpeggio!", position:"before", name:"琶音"},
//					{ url:"assets/music_score_editor/images/arp_link.png", classCss:"cmenu gilde", name:"琶音"},
//					{ url:"assets/music_score_editor/images/paup.png", classCss:"operator cmenu", value:"!arpeggioup!", position:"before", name:"琶音"},
//					{ url:"assets/music_score_editor/images/padown.png", classCss:"operator cmenu", value:"!arpeggiodown!", position:"before", name:"琶音"},
//					{ url:"assets/music_score_editor/images/gliss.png", classCss:"operator cmenu", value:"!~(!note!~)!", type:"gliss", name:"滑音"},
//					{ url:"assets/music_score_editor/images/fall.png", classCss:"operator cmenu", value:"!slidelu!", position:"before", name:""},
//					{ url:"assets/music_score_editor/images/doit.png", classCss:"operator cmenu", value:"!slide!", position:"before", name:""},
//					{ url:"assets/music_score_editor/images/plop.png", classCss:"operator cmenu", value:"!sliderd!", position:"before", name:""},
//					{ url:"assets/music_score_editor/images/scoop.png", classCss:"operator cmenu", value:"!slideru!", position:"before", name:""},
//                ]
//          	},
//          	
//          	{
//          		code: 'clef_series',
//          		name: '谱号',
//          		subMenuList: [
//					{ url:"assets/music_score_editor/images/ph_gy.png", name:"高音谱号", classCss:"node_puhao", value:"1 treble"},
//					{ url:"assets/music_score_editor/images/ph_dy.png", name:"低音谱号", classCss:"node_puhao" , value:"1 bass"},
//					{ url:"assets/music_score_editor/images/ph_zy.png", name:"中音谱号", classCss:"node_puhao", value:"1 alto"},
//					{ url:"assets/music_score_editor/images/ph_czy.png", name:"次中音谱号", classCss:"node_puhao", value:"1 tenor"},
//          		]
//          	},
//          	
//          	{
//          		code: 'kelvin_series',
//          		name: '柯尔文手势',
//          		subMenuList: [
//					{ url:"assets/music_score_editor/images/kew1.png", name:" Do", classCss:"kew operator kelvin", value:"!kew1!", position:"before"},
//					{ url:"assets/music_score_editor/images/kew2.png", name:" Re", classCss:"kew operator kelvin", value:"!kew2!", position:"before"},
//					{ url:"assets/music_score_editor/images/kew3.png", name:" Mi", classCss:"kew operator kelvin", value:"!kew3!", position:"before"},
//					{ url:"assets/music_score_editor/images/kew4.png", name:" Fa", classCss:"kew operator kelvin", value:"!kew4!", position:"before"},
//					{ url:"assets/music_score_editor/images/kew5.png", name:" So", classCss:"kew operator kelvin", value:"!kew5!", position:"before"},
//					{ url:"assets/music_score_editor/images/kew6.png", name:" La", classCss:"kew operator kelvin", value:"!kew6!", position:"before"},
//					{ url:"assets/music_score_editor/images/kew7.png", name:" Si", classCss:"kew operator kelvin", value:"!kew7!", position:"before"},
//					{ url:"assets/music_score_editor/images/kew8.png", name:" Do", classCss:"kew operator kelvin", value:"!kew8!", position:"before"},
//          		              ]
//          	},
//          	
//          	{
//          		code: 'position_series',
//          		name: '方向控制',
//          		subMenuList: [
//					{ url:"assets/music_score_editor/images/direct/posstemdown.png", name:"向下翻转", classCss:"operator cmenu", value:"[I:pos stem down]", position:"before"},
//					{ url:"assets/music_score_editor/images/direct/posstemup.png", name:"向上翻转", classCss:"operator cmenu", value:"[I:pos stem up]", position:"before"},
//					{ url:"assets/music_score_editor/images/direct/1down.png", name:"显示在下方", classCss:"operator cmenu", value:"[I:pos orn down]", position:"before"},
//					{ url:"assets/music_score_editor/images/direct/1up.png", name:"显示在上方", classCss:"operator cmenu", value:"[I:pos orn up]", position:"before"},
//					{ url:"assets/music_score_editor/images/direct/jqbelow.png", name:"显示在下方", classCss:"operator cmenu", value:"[I:pos dyn below]", position:"before"},
//					{ url:"assets/music_score_editor/images/direct/jqabove.png", name:"显示在上方", classCss:"operator cmenu", value:"[I:pos dyn above]", position:"before"},
//					{ url:"assets/music_score_editor/images/contact.png", name:"连音线在上方", classCss:"operator cmenu", value:"'", position:"before"},
//					{ url:"assets/music_score_editor/images/contact2.png", name:"连音线在下方", classCss:"operator cmenu", value:",", position:"before"},
//          		              ]
//          	},
//          	{
//          		code: 'others_symbol_series',
//          		name: '其他符号',
//          		subMenuList: [
//					{ url:"assets/music_score_editor/images/vaup.png", value:"!8va(!", name:"高8度演奏", classCss:"operator cmenu", position:"surround"},
//					{ url:"assets/music_score_editor/images/vbdown.png", value:"!8vb(!", name:"低8度演奏", classCss:"operator cmenu", position:"surround"},
//					{ url:"assets/music_score_editor/images/jq.png", value:"!<(!", name:"渐强", classCss:"operator cmenu", position:"surround"},
//					{ url:"assets/music_score_editor/images/jr.png", value:"!>(!", name:"渐弱", classCss:"operator cmenu", position:"surround"},
//					{ url:"assets/music_score_editor/images/other1.png", value:"v", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other2.png", value:"u", classCss:"operator cmenu", position:"before" },
//					{ url:"assets/music_score_editor/images/sanjiao.png", value:"!wedge!", classCss:"operator cmenu", position:"before" },
//					{ url:"assets/music_score_editor/images/other3.png", value:"!>!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other4.png", value:".", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other5.png", value:"!tenuto!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other6.png", value:"!open!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other7.png", value:"!plus!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other8.png", value:"!snap!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/b1.png", value:"!trill!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/b2.png", value:"P", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/b3.png", value:"!mordent!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/b4.png", value:"!roll!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/b5.png", value:"!fermata!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/b6.png", value:"!0!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/b7.png", value:"!1!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/b8.png", value:"!2!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/b9.png", value:"!3!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/b10.png", value:"!4!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/b11.png", value:"!5!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other9.png", value:"!p!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other10.png", value:"!pp!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other11.png", value:"!ppp!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other12.png", value:"!f!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other13.png", value:"!ff!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other14.png", value:"!fff!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other15.png", value:"!mp!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other16.png", value:"!mf!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/sf.png", value:"!sf!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other17.png", value:"!sfz!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/sfp.png", value:"!sfp!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/fp.png", value:"!fp!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/fz.png", value:"!fz!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/rit.png", value:"!rit!", name:"渐慢", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/accel.png", value:"!accel!", name:"渐快", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/b12.png", value:"!turn!", name:"顺回音", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/b14.png", value:"!invertedturn!", name:"逆回音", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/b16.png", value:"!breath!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/b17.png", value:"!shortphrase!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other18.png", value:"!coda!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other19.png", value:"!segno!", name:"segno记号", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other20.png", value:"!D.C.!", name:"从头反复", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/dcalfine.png", value:"!D.C.alfine!", name:"从头反复到fine终止", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other21.png", value:"!D.S.!", name:"跳转到segno记号", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/dsalfine.png", value:"!D.S.alfine!", name:"跳转到segno记号到fine终止", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/other22.png", value:"!fine!", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/ped.png", value:"!ped!", name:"踩下", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/ped-up.png", value:"!ped-up!", name:"放松", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/pedall.png", value:"!pedall!", name:"踩下后放松", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/strong.png", value:"!strong!", name:"强", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/sec_strong.png", value:"!sec_strong!", name:"次强", classCss:"operator cmenu", position:"before"},
//					{ url:"assets/music_score_editor/images/weak.png", value:"!weak!", classCss:"operator cmenu", name:"弱", position:"before"},
//					{ url:"assets/music_score_editor/images/bc.png", value:"!bc!", classCss:"operator cmenu", name:"占位符", position:"before"},
//					{ url:"assets/music_score_editor/images/bc.png", value:"!bcb!", classCss:"operator cmenu", name:"占位符", position:"before"},          		              
//          		]
//          	}
//          	
//		 ] 
//	},
	{ 
		menuName: '帮助', 
		classCss:"help",
		menuCode: 'help', 
		orderby: 6,
		subMenuList: [] 
	},
	{ 
		menuName: '快捷键', 
		classCss:"shortcutKey",
		menuCode: 'shortcutKey', 
		orderby: 7,
		subMenuList: [] 
	},
	{ 
		menuName: '论坛', 
		classCss:"bbs",
		menuCode: 'bbs', 
		orderby: 8,
		subMenuList: [] 
	}
	
]
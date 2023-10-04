var content = new Vue({
	el: '#musicForm',
	data: {
		musicFormList: [],
		regionList: [], // 渲染时间块数组
		regionMap:{},
		treeData: null,
		wavesurfer: null,
		wavesurferUtil: null,
		zoom: 300,
		myZoom: 300,
		levelCnt: 0,
		currRegionList: [] , // 当前音频片段数组
		currRegion: {},
		iframeId: '',
		isPlay: false,
		audioUrl: null,
		audioPlay: { // 音频播放的参数
			startTime: '',
			endTime: '',
			mp3IntervalId: '',// 监听音频播放时长的定时器
			isPytbNode: true // false:音符谱音同步，true:小节谱音同步
		},
		isWaveClick: true,
		count: 0, // 预备拍倒计时数字
		puzi: { // 当前谱子的属性
			isWeakBar: false, // 是否弱起小节
			firstBeat: 0, // 第一小节的拍数
			beat: 0, // 每小节拍数
			speed: 0, // 速度
		},
		audioCountDown: {
			starttime: 0,
			duration: 0,
			isStart: false,
			count: 0
		},
		isFirstLoadAbc: true, // 是否第一次加载abc
		mulPrelude: [] ,
		currSpeed: 0,
		horizontalPlay : true,
		a_e: [],
		reqFrm:{
			ORGCODE : '',
			KNOWLEDGE_ID : '',
			EXAM_EXAMINEE_ID : '',
			EXAMPAPER_ID : '',
			EXAM_QS_ID : '',
			ANSWER_ID :  '',
			IS_MINE : '',
			IS_INTERACT : '',
			IS_CORRECT: 0,
			ATTACH_ID: '',
			PERSON_ID: '',
			MFDESC: '',
			COURSE_ID: '', // 作品
			KNOWLEDGE_ID: '',// 作品
			MUSIC_FORM_ID: '',// 作品Key
			FILE_PATH:'',// 作品
			ABC_CONTENT:'',// 作品
			FORM_TYPE: '',// 作品
			MUSIC_TYPE: '', // hk:学生作业；opus:老师作品
			TITLE:'',
			'interface': '1',
		},
		abcSel : {}, // abc框选对象
		musicForm: { },
		cmd: 'A', // musicform cmd
		inpdisable: false, // 编辑框是否禁用
//		isExe: false, // 是否在exe中打开
//		isAndroid: false, // 是否在安卓中打开
		fileUpload : getFileData(),
		musicFormObj : {}, // 曲式绘制对象
		showMusicForm: false, // 是否显示曲式图
		isShowHelp: false, 
		isPreview: true,
		modeIndex: 1,
		modeList: ['编辑模式','预览模式'],
		isAdd: false, // 是否显示编辑框
		selTrIndex: 0, // 选中索引值
		regionsBoxStyle: {},
		waveformStyle: {},
		contBoxStyle: {},
		fontSizeStyle: {},
		mformBoxStyle: {}
	},
	components : {
		FileUpload : VueUploadComponent
	// 文件上传组件
	},
	watch: {
		'modeIndex': function(v){
			this.isPreview =( v == 1);
			
			if(v == 0 && this.musicFormList && this.musicFormList.length == 0){
				this.openRowEdit();
			}
			this.prevMusicForm();
		},
		 'cmd' : function(v){
			 if(v == 'A'){
				 this.inpdisable = false;
			 }else{
				 this.inpdisable = true;
			 }
		 }
	},
	methods: {
		
		// 预览时，图片渲染
		prevMusicForm: function(){
			// 切换预览模式，获取图片
			if( this.isPreview && this.musicFormList && this.musicFormList.length){
				this.musicFormList.forEach(function( item){
					item.img_path = item.groupid;
				})
				// 转图片
				groupid2img(this.musicFormList, 'img_path');
			}
		},
		toggleMode: function( index){
			if(window.play.playing){
				top.swAutoAlert('请暂停播放');
				return ;
			}
			this.modeIndex = index;
			if(index == 1 ){
				this.abcSel.action = 'close';
			}else{
				this.abcSel.action = 'open';
			}
			
			var abcContent = $('#source').val();
			abcContent = setAbcKeyValue(abcContent,'%%staffsep', 100/scale);
			
			var mf = this.reqFrm.MFDESC;
			if(mf){
				mfSetting = JSON.parse(mf);
			}else{
				mfSetting = new Array();
			}
			$('#source').val(abcContent);
			src_change();
		},
		// 初始化曲式表单
		initMusicForm: function(){
			this.musicForm = {
				// 曲式分析数据
				id:'', // id
				pid:'', // 父id
				fieldno: '', // 编号
				orderby: '', // 排序号
				fieldname: '', // 段落名称
				bgcolor: '#000', // 块的背景图
				fielddesc: '', // 段落内容
				starttime: '', // 开始时间
				endtime: '', // 结束时间
				startNodeIndex: '', // 小节线起始索引
				endNodeIndex: '', // 小节线终止索引
				groupid: ''
				//width: '',
				//left: ''
			}
		},
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
		// 开始播放
		playPause: function(){
			//this.play();
		},
		// 停止播放
		stop: function(){
			//this.stop();
		},
		
		// 弹出曲式结构
		popTree: function(){
			var widHei = window.top.getPopWidHei(9999, 9999);
			var id = this.iframeId.replace('musicformIframe', 'musicformTreeIframe');
			var url = '../musicform/music_form_tree.html?attachid=' + this.attachid + '&iframeId=' + id;
			window.top.$.popBigWindow(id, url, "曲式结构图", function() {
			}, {
				width : widHei.width,
				height : widHei.height,
				isIframe : true,
			});
		},
		// 渲染 数据
		renderData: function(){
			var that = this;
			var tmpList = clone(that.musicFormList);
			tmpList.sort(function(a, b){
				return b.orderby.length -  a.orderby.length
			})
			
			that.levelCnt = (tmpList[0].orderby).length / 3;
		},
		// 缩放
		zoomCb: function( zoom){
			var that = this;
			that.musicFormList.forEach(function( item){
				item.width = Number(item.endtime - item.starttime) * Number(item.zoom);
				item.left = Number(item.starttime) * Number(item.zoom);
				item.width = Number(item.width) * (zoom / Number(item.zoom));
				item.left = Number(item.left) * (zoom / Number(item.zoom));
				item.zoom = zoom;
			})
			that.regionList = data2tree(clone(that.musicFormList));
		},
		// 根据当前的时间获取，音频片段
		getCurrGegionList: function( currTime){
			var that = this;
			var currArr = [].concat(that.musicFormList.filter(item=>{
				return item.starttime <= currTime && currTime < item.endtime;
			}))
			
			currArr.sort(function(a, b){
				return b.endtime - a.endtime;
			})
			
			that.currRegionList = currArr;
		},
		
		// 获取曲式片段
		getCurrMusicForm: function( index, isIndex){
			var noteX = isIndex ? ($('._' + index + '_').attr('x')-0 + $('._' + index + '_').attr('width')/2) * scale : index;
			
			// getBarLineCoor(scale,0,9);
			var that = this;
			var currArr = [].concat(that.musicFormList.filter(item=>{
				return item.bar_start <= noteX && noteX < item.bar_end;
			}))
			
			currArr.sort(function(a, b){
				return a.startNodeIndex - b.startNodeIndex;
			})
			
			that.currRegionList = currArr;
		},
		
		// 播放abc
		play : function() {
			$('.nobrk').css({
				'overflow-x': 'auto !important;'
			})
			// 播放中，点其他按钮 或者 正在走拍子； 则无法暂停
			var that = this;
			if (this.step == "playing" && this.playCode == playCode) { // 再次点击即为停止
				try {
					// 播放中，那么停止， 这些内容都在 endPlay中处理
					window.play_tune(0);
					scrollTop(this);
					// 启动播放状态
					that.isPlay = true;
				} catch (e) {
				}
				return;
			}
			user.isScrollIntoView = true;
			window.play_tune(-1);
			
		},
		// 停止播放
		stop : function() {
			window.play_tune(0);
		},
		// abc播放结束回调
		endPlay: function(){
			var that = this;
			$('.countdown-box').hide();
			// 去除音符的选中效果
			$("rect[type='splnum_note'],rect[type='note']").attr("style", "fill-opacity: 0.0");
			this.step = "end";
			user.isScrollIntoView = false;
			scrollTop(this);
			$('.nobrk').css({
				'overflow-x': 'inherit !important;'
			})
			
			// 停用播放状态
			that.isPlay = false;
		},
		
		eidtMode: function(){
			this.toggleMode(0);
		},
		saveMf: function( isRowSv){
			var that = this;
			// 行编辑保存时，无需关闭音符的编辑状态
			if(!isRowSv){
				
				this.abcSel.action = 'close';
				var abcContent = $('#source').val();
				if(this.showMusicForm){
					this.abcSel.close();
				}else{
					abcContent = removeAbcKeyValue(abcContent,'%%staffsep');
				}
				$('#source').val(abcContent);
				src_change();
			}
			// 保存用户作答
			if(mfSetting && mfSetting.length > 0){
				that.reqFrm.MFDESC = mfSetting;
				//saveExamMF(that.reqFrm, function( res){
//					console.log('res:',res);
//					if(res.result != 1){ // 失败
//						//that.currRegion.remove();
//						top.swAutoAlert('保存失败！')
//						return;
//					}
					
					// 是否来源于行编辑的保存
					if(!isRowSv){
						that.abcSel.isOpen = false;
						// 预览模式
						that.isPreview = true;
					}
					// 保存上一次的曲式数据
					that.saveLastList(clone(that.musicFormList));
					// 初始化
					that.initMusicForm();
					// 关闭行编辑
					that.closeRowEdit();
					top.swAutoAlert('保存成功！')
				//});
			}
		},
		
		//-----------绘制曲式beg---------------
		// 绘制曲式
		editMF: function(){
			var that = this;
			if(!this.abcSel.isOpen){
				this.eidtMode();
			}else{
				this.saveMf();
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
		// 曲式分析相关****************
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
				top.swAutoAlert('请输入编号');
				return false;
			}
			if(!this.musicForm.fieldname){
				top.swAutoAlert('请输入段落名称');
				return false;
			}
			if(!this.musicForm.bgcolor){
				top.swAutoAlert('请选择背景颜色');
				return false;
			}
			if(!this.musicForm.fielddesc){
				top.swAutoAlert('请输入 段落内容');
				return false;
			}
			
			if(this.musicForm.startNodeIndex === ''){
				top.swAutoAlert('音符起始位置不为空');
				return false;
			}
			if(this.musicForm.endNodeIndex === ''){
				top.swAutoAlert('音符终止位置不为空');
				return false;
			}
			if(!this.checkNumber(this.musicForm.startNodeIndex)){
				top.swAutoAlert('音符起始位置必须为数字');
				return false;
			}
			if(!this.checkNumber(this.musicForm.endNodeIndex)){
				top.swAutoAlert('音符终止位置必须为数字');
				return false;
			}
			if(this.musicForm.endNodeIndex-0 <= this.musicForm.startNodeIndex-0){
				top.swAutoAlert('结束音符索引不小于或等于开始音符索引');
				if( this.cmd == 'U'){
					// 还原上一次的时间
					this.restoreTime();
				}
				return false;
			}
			return true;
		},
		
		// 验证数字
		checkNumber: function( v){
			return /[0-9]/g.test(v);
		},
		// 行编辑时，若时间验证失败，则还原上一次的时间
		restoreTime: function(){
			var that = this;
			var po = this.musicFormList_old.find(function( item){
				return that.musicForm.id == item.id;
			})
			// 列表数据
			this.musicFormList[this.selTrIndex].startNodeIndex = po.startNodeIndex;
			this.musicFormList[this.selTrIndex].endNodeIndex = po.endNodeIndex;
		},
		// 保存上一次的曲式数据
		saveLastList: function( list){
			this.musicFormList_old = clone(list);
		},
		// 保存曲式结构数组
		saveForm: function(){
			var that = this;
			if(that.fileUpload.fileData.groupid){
				that.musicForm.groupid = that.fileUpload.fileData.groupid;
			}

			if(that.cmd == 'A'){
				mfSetting.push(clone(that.musicForm));
			}else{
				var id = this.musicForm.id;
				var index = mfSetting.findIndex(function(item){
					return item.id == id;
				})
				mfSetting.splice(index, 1, clone(this.musicForm));
			}
			renderMusicForm(mfSetting, scale, this.abcSel.isSelNote);
			that.musicFormList = mfSetting;
			$('#MUSIC_FORM_div').modal('hide');
			
			// 直接入库
			that.saveMf( true);
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
					top.swAutoAlert('不能超出上一级的范围');
					return;
				}
				
				if(parentRegionPo && endNodeIndex > parentRegionPo.endNodeIndex - 0){
					//this.musicForm.endNodeIndex = parentRegionPo.endNodeIndex - 0;
					flag = false;
					top.swAutoAlert('不能超出上一级的范围');
					return;
				}
				
				// 判断是否存在靠后的兄弟节点，结束时间不能超过靠后的兄弟的开始时间
				var siblingsBackRegionPo = musicFormList.find(item => item.pid == regionPo.pid && item.startNodeIndex-0 > Number(regionPo.startNodeIndex) && item.id != id);
				if(siblingsBackRegionPo && endNodeIndex >= siblingsBackRegionPo.startNodeIndex - 0){
					//this.musicForm.endNodeIndex = siblingsBackRegionPo.startNodeIndex;
					flag = false;
					top.swAutoAlert('不能进入同级的范围');
					return;
				}
				
				// 判断是否存在靠前的兄弟节点，开始时间不能小于靠前的兄弟的结束时间
				var siblingsFrontRegionPo = musicFormList.find(item => item.pid == regionPo.pid && item.startNodeIndex-0 <  Number(regionPo.startNodeIndex) && item.id != id);
				if(siblingsFrontRegionPo && startNodeIndex <= siblingsFrontRegionPo.endNodeIndex - 0){
					//this.musicForm.startNodeIndex = siblingsFrontRegionPo.endNodeIndex;
					flag = false;
					top.swAutoAlert('不能进入同级的范围');
					return;
				}
			}
			return flag;
		},
		//-----------绘制曲式end---------------
		
		// --- 行编辑 -beg-- 
		rowEdit: function( index, no){
			if(this.isAdd){
				top.swAutoAlert('请保存新增行');
				return;
			}
			this.cmd = 'U';
			this.selTrIndex = index;
			this.musicForm =  this.musicFormList[index];
			if( no){
				this.musicForm.fieldno = no;
			}
			// 起止音符位置的验证
			var flag = this.validMusicForm();
			if(!flag){
				// 还原上一次的时间
				this.restoreTime();
				return;
			}
			this.submit();
		},
		editForm: function( id){
			if(this.isAdd){
				top.swAutoAlert('请保存新增行');
				return;
			}
			var classList = $('.music-form[data-id="' + id + '"]')[0].classList;
			if(classList.item(1)){
				editMF(classList.item(1))
			}
		},
		delForm: function( id){
			var classList = $('.music-form[data-id="' + id + '"]')[0].classList;
			if(classList.item(1)){
				delMF(classList.item(1))
			}
		},
		saveRowEdit: function(){
			var that = this;
			// 简单的数据验证
			if(!that.validForm()){
				// 还原上一次的时间
				this.restoreTime();
				return;
			}
			var first = that.musicForm.startNodeIndex;
			var end = that.musicForm.endNodeIndex;
			
			var currRegionData = buildRegionData(that, first, end );
			currRegionData.groupid = that.fileUpload.fileData.groupid = uuid();
			copyJson(currRegionData,that.musicForm);
			// 起止音符位置的验证
			var flag = that.validMusicForm();
			if(!flag){
				// 还原上一次的时间
				this.restoreTime();
				return;
			}
			
			if (that.fileUpload.files.length > 0) {
				// 有文件的，先上传文件
				that.uploadFile();
			} else {
				that.saveForm();
			}
		},
		// 默认设置开始的音符位置
		getLastPos: function(){
			if(!(this.musicFormList && this.musicFormList.length)){
//				copyJson({
//					'fieldno': '1',
//					'bgcolor': '#000',
//					'fieldname': 'A',
//					'startNodeIndex': '0',
//					'endNodeIndex': this.a_e.length - 1,
//				},this.musicForm);
//				
//				console.log('this.musicForm-----', this.musicForm)
				this.musicForm.startNodeIndex = 0;
				return;
			}
			var frontBroArr = clone(this.musicFormList);
			frontBroArr.sort(function(a,b){
				return b.endNodeIndex - a.endNodeIndex;
			})
			this.musicForm.startNodeIndex = frontBroArr[0].endNodeIndex-0 + 1;
		},
		openRowEdit: function(){// 打开行编辑
			var that = this;
			this.isAdd = true;
			
			$('#mfForm')[0].reset();
			that.cmd = 'A';
			// 初始化
			that.initMusicForm();
			// 块的颜色，默认黑
			that.musicForm.bgcolor = '#000';
			// 默认音符起始位置
			that.getLastPos();
		},
		closeRowEdit: function(){// 关闭行编辑
			this.isAdd=false;
		},
		// --- 行编辑 -end-- 
		// 交卷
		save: function(){
			var callback = top.getModalCball();
			if(callback){
				callback(this.musicFormList);
				top.closePop();
			}
		}
	},
	created: function(){
		var that = this;
		// 初始化
		that.initMusicForm();
		
		var params = getUrlParamJson(document.URL);
		that.attachid = params.ATTACH_ID;
		copyJson(params, this.reqFrm);
		
		if(typeof top.getUserPo == 'function'){
			var user = top.getUserPo();
			this.reqFrm.PERSON_ID = user.personId;
			this.reqFrm.ORGCODE = user.orgCode;
		}
		
		Vue.nextTick(function(){
			pagewidth = $('.music-form-box').width() / 37.8;
			if( typeof parent.getAbcContent == 'function'){
				var abcContent = parent.getAbcContent().abcContent;
				var mf = getAbcKeyValue(abcContent, '%%musicform');
				jsLoadAll(that, abcContent, mf);
			}
			
			// 鼠标点击右键，关闭曲式块的操作框
			window.onclick = function(){
				$('.mf-click-box').remove();
			}
		})
	
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
//				$('#bgcolor').css({
//					'background-color': '#fff'
//				});
				// 保存结束之后置空 -- end
				
				// create by lhj 曲式参数
				console.log('abcSel曲式参数:')
				that.musicForm.startNodeIndex = first;
				that.musicForm.endNodeIndex = end;
				
				var currRegionData = buildRegionData(that, first, end );
				currRegionData.groupid = that.fileUpload.fileData.groupid = uuid();
				copyJson(currRegionData,that.musicForm);
				that.cmd = 'A';
				// 块的颜色，默认黑
				that.musicForm.bgcolor = '#000';
				
				var flag = that.validMusicForm();
				if(!flag){
					return;
				}
				$("#MUSIC_FORM_div").modal();
			}
		},  ".puzi-content");
		
		this.abcSel.isSelNote = true;
	}
});

function play(){
}
function pause(){}


function editAbc(abc) {
	/* 去除定义的页面宽度start */
	var reg = new RegExp("%%pagewidth.*(?=\\n)");
	var kRow = reg.exec(abc);
	if (kRow) {
		kRow = kRow[0];
		abc = abc.replace(kRow, "%%pagewidth 600\n");
	}
	/* 去除定义的页面宽度end */
	reg = new RegExp("%%scale.*(?=\\n)");
	var kRow = reg.exec(abc);
	if (kRow) {
		kRow = kRow[0];
		abc = abc.replace(kRow, "");
	}
	var rRow = [];
	reg = new RegExp("T:.*(?=\\n)", "g");
	while ((kRow = reg.exec(abc)) !== null) {
		rRow.push(kRow[0]);
		reg.lastIndex;
	}
	if (rRow) {
		for ( var i in rRow) {
			abc = abc.replace(rRow[i], "T:");
		}
	}
	rRow = [];
	reg = new RegExp("C:.*(?=\\n)", "g");
	while ((kRow = reg.exec(abc)) !== null) {
		rRow.push(kRow[0]);
		reg.lastIndex;
	}
	if (rRow) {
		for ( var i in rRow) {
			abc = abc.replace(rRow[i], "C:");
		}
	}
	rRow = [];
	reg = new RegExp("O:.*(?=\\n)", "g");
	while ((kRow = reg.exec(abc)) !== null) {
		rRow.push(kRow[0]);
		reg.lastIndex;
	}
	if (rRow) {
		for ( var i in rRow) {
			abc = abc.replace(rRow[i], "O:");
		}
	}

	abc = setAbcKeyValue(abc, '%%singleline', '');
	abc = setAbcKeyValue(abc, '%%notespacingfactor', '2'); // 加上singleline的谱子，简谱有些会挤在一起，加上这个属性会好一点
	if(myspace){
		myspace = 1.5;
	}
	return abc;
}
var loadTime = 0;
function jsLoadAll(that, abcContent, mfData) {
	if (loadTime > 200) {
		return;
	}
	loadTime++;
	var intId = setInterval(function() {
		// js加载完毕，页面也已经打开（高度大于0表示页面已显示出来）
		console.log('jsLoadNum:',jsLoadNum)
		if (jsLoadNum >= 8 && $("body").height() > 0) {
			var params = {
				abcContent: abcContent,
				musicType: 0
			};
			if(!abcContent){
				top.alert('谱例不存在');
				clearInterval(intId);
				//closePop('musicformIframeModal');
				return;
			}
//			var params = {
//					abcContent: `%%indent -10\n%%pagewidth 1222\n%%keydefined A=higher,C=higher \n%%leftmargin 2 \n%%rightmargin 10 \n%%titlefont Microsoft-YaHei 28 \n%%stretchlast 0.7 \nI:abc-charset utf-8 \nX:4 \nT:国旗国旗真美丽 \nC:王森 词 \nC:上海第六师范学校学生儿童歌曲创作组 曲 \nL:1/4 \nQ: "中速 亲切地"1/4=88 \nM:2/4 \nK: C\nV:1 treble\n%%MIDI program 0\nG E | G E | c A | G2 |\nw:国 旗|国 旗|真 美|丽，|\n E C | E C | G E | D2 |\nw:金 星|金 星|照 大|地。|\n E3/2 D/ | C D | E G | A2 |\nw:我 愿|变 朵|小 红|云，|\n A/G/ (E/A/) | G2 | G (D/E/) | C2 |] \nw:飞 上 蓝 *|天 | 亲 亲 *|您。|`,
//					musicType: 0
//			};
			params.abcContent = editAbc(params.abcContent);
			musicType = params.musicType;
			//$('.compute-mode.' + musicType).addClass('active');
			//console.log(params.abcContent)
			$('#source').val(params.abcContent).change();
			clearInterval(intId);
			// edit-1.js中的方法，重新初始化ABC相关对象、变量
			edit_init();
			src_change();
			user.notehlightCball = notehlightCball;
			user.endplayCball = that.endPlay;
			user.isScrollIntoView = false;
			// notehlight回调 on为false 提前30毫秒
			user.notehlightDelay = 30;
			// 水平滚动
			user.horizontal.open = true;
			animation = true;
			
			// 获取音符信息，展示曲式内容 create by lhj
			user.getNote = function(e){
				that.getCurrMusicForm(e.pageX);
			}

			user.abcLoadCball = function() {
				// abc加载后回调
				if(that.isFirstLoadAbc){
					// 为了获取glo_a_e数据
					getNoteData();
					that.a_e = glo_a_e;
					getData($('#source').val(), function(beat, speed){
						that.currSpeed = speed;
						console.log('that.currSpeed:',speed)
					})
					
				}
				var mf = mfData;
				
				if(typeof mfSetting != 'undefined' && mfSetting.length){
					// 所有音符横坐标
					mf = mfSetting;
				}else if(mf){
					// 曲式数据
					that.reqFrm.MFDESC = mf;
					mf = mfSetting = JSON.parse(mf);
				}
				
				if(mf && mf.length){
					renderMF(that, mf);
				}
				that.isFirstLoadAbc = false;
				
				if(that.abcSel.action == 'open'){
					that.abcSel.open();
				}else if(that.abcSel.action == 'close'){
					that.abcSel.close();
				}
				that.abcSel.action = '';
			};
		}
	}, 100);
}


function renderMF(that, mf){
	var notePosArr = notePos();
	for(var i = 0; i < mf.length; i++){
		var startNodeIndex = mf[i].startNodeIndex;
		var endNodeIndex = mf[i].endNodeIndex; 
		
		mf[i].bar_start = notePosArr[startNodeIndex].x1;
		mf[i].bar_end = notePosArr[endNodeIndex].x2;
	}
	
	that.musicFormList = that.musicFormList_old = mf;
	
	var tmpList = clone(that.musicFormList);
	tmpList.sort(function(a, b){
		return b.orderby.length -  a.orderby.length
	})
	
	that.levelCnt = (tmpList[0].orderby).length / 3;
	// 构建曲式数组----end
	renderMusicForm(mf, scale, true);
	
	that.zoomCb(that.zoom);
	// 处理曲式数据的图片
	that.prevMusicForm();
}
// 音符高亮回调
function notehlightCball(i, on) {
	if(i != -1 && on){
		content.getCurrMusicForm((i + '' ).match(/\d{1,}/g)[0], true);
	}
	/* 渲染倒计时数字 begin */
	if(content.count > 0 && on && i == -1 && content.step != 'end'){
		$('.countdown-box').text(content.count).show();
		content.count--;
		// 如果有弱起小节，则用延时器去递归调用来补全倒计时数字
		if(content.count > 0 && musicForm.puzi.isWeakBar && Math.ceil(content.puzi.firstBeat) >= content.count){
			setTimeout(function(){
				notehlightCball(-1, true);
			}, content.puzi.speed * 1000);
		}
		// TODO: 不完整结尾，要提前停止计时
		// 
		if(content.count == 0){
			setTimeout(function(){				
				$('.countdown-box').hide();
			}, content.puzi.speed * 1000);
		}
	}
	/* 渲染倒计时数字 end */
}

/**
 * 页面滚动至初始播放位置
 * 
 * @returns
 */
function scrollTop(that){
	if(that.horizontalPlay){
		$(user.horizontal.scrollClass).stop().animate({
			scrollLeft : 0 + 'px'
		}, 300);
	}else{			
		$('html').stop().animate({scrollTop: '0px', scrollLeft: 0}, 200);
	}
}


function notePos(){
	
	var notePosArr = [], notePostMap = {};
	var $notes;
	if(musicType == 2){
		$notes = $("svg rect[type='splnum_note'], svg rect[type='splnum_rest']")
	}else{
		$notes = $("svg rect[type='note'], svg rect[type='rest']");
	}
	var barlineArr = getBarLineCoor(scale,0,9);
	// 选择到音符
	$notes.each(function(index, item) {
		var $this = $(this);
		var istart =  $this.attr('istart');
		var line =  $this.parents("svg").index();
		var x = $this.attr('x') - 0;
		var w = $this.attr('width') - 0;
		var barPo = barlineArr.find(function(jtem){
			return jtem.line == line && jtem.barline_start[0] <= x && jtem.barline_end[0] >= x;
		})
		if(barPo){
			var notePosPo = {
				x1 : x * scale,
				y1 : barPo.barline_start[1],
				x2 : x * scale + w * scale + 2,
				y2 : barPo.barline_end[1] + $(this).outerHeight(),
				istart: istart,
				line: line
			};
			notePostMap[istart] = notePosPo;
			notePosArr.push(notePosPo);
		}
	})
	
	notePosArr.sort(function(a, b){
		return a.istart - b.istart;
	})
	
	return notePosArr;
}

function audioProgressCb(i){
	syncScroll(i)
}

function syncScroll(ori_i){
	if(ori_i > 0 ){
		var ww = $('#target').width(); // 谱子面板的显示的宽度
		var ol = $('._' + ori_i + '_').eq(0).attr("x") * scale - $(user.horizontal.scrollClass).scrollLeft(); // 当前音符需要滚动的值
		var isAni = true; // 是否要过渡动画
		var isDoOffset = true; // 是否要滚动
		if(ol || ol === 0){
			if(ol < 0){
				if(user.horizontal.canNoAniScroll){
					user.horizontal.canScroll = true;
					user.horizontal.lastOffsetLeft = user.horizontal.lastOffsetLeft + ol - ww / 2;
				}
				isAni = false;
			}else if($(user.horizontal.scrollClass).scrollLeft() + (ol - ww / 2) < user.horizontal.lastOffsetLeft){
				isDoOffset = false;
			}else{
				user.horizontal.lastOffsetLeft = $(user.horizontal.scrollClass).scrollLeft() + (ol - ww / 2) + ww / 5;
			}
			if(isDoOffset && user.horizontal.canScroll){
				$(user.horizontal.scrollClass).stop().animate({
					scrollLeft : user.horizontal.lastOffsetLeft + 'px'
				}, isAni ? 1000 : 0);
				user.horizontal.canScroll = false; // 滚动过程中禁止中途打断
				if(!isAni){
					user.horizontal.canNoAniScroll = false;
					setTimeout(function(){
						user.horizontal.canNoAniScroll = true;
					})
				}
				setTimeout(function(){
					// 1s后动画结束才能继续滚动
					user.horizontal.canScroll = true;
				}, 1000)
			}
		}
	}
}

//曲谱曲式分析编辑 -----------------beg
//构建时间片段数据
function buildRegionData(that, startNodeIndex, endNodeIndex){
//	1.1、判断是否被包含在时间片段内，若是则以当前时间片段作为父级片段，反之为父级时间片段（pid:0）
//	1.2、排序号:以父级排序号开始+001，表第一个子节点，以此类推往后累加
	var musicFormList = mfSetting;
	// 开始时间在谁的范围内就是谁的子级
	var arr = musicFormList.filter(item => startNodeIndex-0 >= item.startNodeIndex-0 && startNodeIndex-0 <= item.endNodeIndex-0);
	
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
//	data.bgcolor = '';
//	data.fieldname = '';
//	data.fielddesc = '';
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

//点击某个曲式
function mfClick(e){
	var that = content;
	if(!that.abcSel.isOpen){
		return;
	}
	var left = e.pageX;
	var top = e.pageY;
	var cn = e.currentTarget.className.split(' ')[1];
	var divstr = '<div class="mf-click-box" style="left: ' + left + 'px;top: ' + top + 'px;"><span>操作</span><li onclick="editMF(\'' + cn + '\')">编辑</li>';
	divstr += '<li onclick="delMF(\'' + cn + '\')">删除</li><li onclick="delAllMF()">全部删除</li>';
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


//选择“编辑”曲式
function editMF(cn){
	var that = content;
	var obj = {
		startNodeIndex: cn.split('-')[1] - 0,
		endNodeIndex: cn.split('-')[2] - 0,
		level: cn.split('-')[3] - 0,
		isEdit: true
	}
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
			that.fileUpload.showFiles = [];
			(function(gId, that){
				getFile(gId, function(arr) {
					var files = arr[gId];
					for (var i = 0; i < files.length; i++) {
						that.fileUpload.showFiles.push(files[i]);
					}
				});
			})(po.groupid, that)
			that.fileUpload.fileData.groupid = po.groupid;
		}else{
			that.musicForm.groupid = that.fileUpload.fileData.groupid = uuid();
		}
		
	}
	
	$("#MUSIC_FORM_div").modal();
	// 删除右键菜单
	$('.mf-click-box').remove();
	
}

// 删除曲式
function delMF(cn){
	if(!cn){
		return;
	}
	var that = content;
	var sn = cn.split('-')[1];
	var en = cn.split('-')[2];
	var level = cn.split('-')[3];
	
	// 判断是否是顶级
	var pos = that.musicFormList.filter(function(item){
		return  sn <= item.startNodeIndex && en >= item.endNodeIndex;
	})
	
	console.log(pos)
	
	var msg ='';
	if(pos && pos.length > 1){
		msg = "将同步删除所有下级片段， ";
	}
	
	top.swConfirm(msg + "确定要删除吗？", "", function(isConfirm){
		if(isConfirm){
			//保存用户作答
			if(mfSetting && mfSetting.length > 0){
				// 在父级范围内的块统统过滤
				mfSetting = mfSetting.filter(function(item){
					return !(sn <= item.startNodeIndex && en >= item.endNodeIndex);
				})
				that.reqFrm.MFDESC = mfSetting;
				//saveExamMF(that.reqFrm, function( res){
					//console.log('res:',res);
					// 删除右键菜单
					$('.mf-click-box').remove();
//					if(res.result != 1){ // 失败
//						//that.currRegion.remove();
//						top.swAutoAlert('删除失败！')
//						return;
//					}
					
					for(var i = 0; i < pos.length; i++){
						$(".mf-" + pos[i].startNodeIndex + '-' + pos[i].endNodeIndex + '-' + (pos[i].orderby).length /3 ).remove();
					}
//					that.abcSel.isOpen = false;
					that.musicFormList = mfSetting || [];
				//});
			}
		}
	})
}

// 删除全部曲式
function delAllMF(){
	var that = content;
	top.swConfirm("确定要删除全部内容吗？", "", function(isConfirm){
		if(isConfirm){
			//保存用户作答
			if(mfSetting && mfSetting.length > 0){
				that.reqFrm.MFDESC = mfSetting;
			//	saveExamMF(that.reqFrm, function( res){
//					console.log('res:',res);
//					if(res.result != 1){ // 失败
//						//that.currRegion.remove();
//						top.swAutoAlert('删除失败！');
//						return;
//					}
					
//					that.abcSel.isOpen = false;
					mfSetting = new Array();
					$('.music-form').remove();
					// 删除右键菜单
					$('.mf-click-box').remove();
			//	});
				
				that.musicFormList = mfSetting;
			}
		}
	})
}
// 数字上下标--------beg
function inpClozeSignEdit(that){
	var $pObj = $(that).parents('.op-cloze');
	setClozeSignStyle('restore' ,that, true);
	$pObj.addClass('edit');
	//显示弹框
	$('.pop-sel-box').hide();
	$pObj.find('.pop-sel-box').show();
	
	$pObj.find('.inp').focus();
	return false;
}

function inpBlur(that, cmd){
	setTimeout(function(){
		var p = $(that).parents('.op-cloze');
		
		var val = p.attr('data-itemno');
		p.find('.inp').val(val);
		p.find('.html').html(code2html(val) || '请填写');
		
		p.removeClass('edit');
		// 隐藏弹框
		p.find('.pop-sel-box').hide();
		
		// jquery 的回填无法，触发VUE双向绑定功能，只能先这么写了
		if(cmd == 'U'){
			var trIndex = p.parents('.table-tr').attr('data-index');
			content.rowEdit(trIndex, val);
		}
		if(cmd == 'A'){
			content.musicForm.fieldno = val;
		}
		
	},200)
}
// 设置数字上下标
function setClozeSignStyle(v, curObj, isExisttOld){
	var that = this;
	var p = $(curObj).parents('.op-cloze');
	var val = p.attr('data-itemno');
	if(val && val.length == 1){
		return;
	}
	
	val = code2html(val);

	function repStyle(v){
		val =  val.replace(/<[^>]+>/g,'');
		var inp = val.replace(/(\d)/g, function(params){
			return '<' + v + '>' + arguments[0]+ '</' + v + '>';
		})
		
		p.attr('data-itemno', inp);
		p.find('.sign-edit').val(inp);
		p.find('.sign-text').html(inp);
	}
	var orgiTxt  = val.replace(/<[^>]+>/g,'');
	p.find('.sign-edit').val(orgiTxt);
	p.find('.sign-text').html(orgiTxt);
	if(!isExisttOld){
		p.attr('data-itemno', orgiTxt)
	}
	p.removeClass('edit');
	// 隐藏弹框
	p.find('.pop-sel-box').hide();
	
	switch (v) {
		case 'sub':
			 repStyle( v);
			break;
		case 'sup':
			 repStyle( v);
			break;
		default:
			break;
	}
}

//function setValue( that, val){
//	var $that = $(that).parents('.op-cloze');
//	$that.attr('data-itemno',  html2code(val));
//	$that.find('.inp').val(val);
//	$that.find('.html').html(val);
//}

function inpClozeSin(that){
	var val = $(that).val();
	if(!val.replace(/\s/g,'')){
		return;
	}
	var $pObj = $(that).parents('.op-cloze');
	$pObj.attr('data-itemno',  html2code(val));
	$pObj.find('.inp').val(val);
	$pObj.find('.html').html(val);
}

function html2code(content) {
	if(!content){
		return content;
	}
	return content.replaceAll( "<","&lt;").replaceAll( ">","&gt;").replaceAll( "\"","&quot;");
}
function code2html(content) {
	if(!content){
		return content;
	}
	return content.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", "\"").replaceAll("&nbsp;", " ").replaceAll("<u>", "").replaceAll("</u>", "").replaceAll("&ldquo;","“").replaceAll("&rdquo;","”");
}
//数字上下标--------end


!(function(win, doc, undefined) {
	var timeSpan = 20;
	window.requestAnimaFrame = (function() {
//		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
//			setTimeout(callback, 30);
//		};
		
		return function(callback) {
			setTimeout(callback, timeSpan);
		};
	})();
	"use strict";
	var singVisual = function(options) {
		options = options || {};
		this.noteHei = options.noteHei || 13; // 音符高度15
		this.scale = options.scale || 1; // 谱子的缩放比
		this.lineMrgL = 18; // 频率线向左缩进
		this.curNotes = null;
		this.noteMrgRate = options.noteMrgRate || 0.9;
		this.noteRowIdx = 0;
		this.noteIdx = 0;
		this.currContext = null;
		this.isShowStandarLine = options.isShowStandarLine || 0;
		this.sc = options.sc;
		this.isLower8 = 0;
		this.errNumber = 0;
		this.rightNumber = 0;
		this.leftBottomY = 200;
		this.yHeight = 150;
		this.lineWidth = 8;
		this.isPureFreqMode = 0;
		this.moveTime = timeSpan; // 每隔30ms运动一次
	}
	var rouCouVal = 0.25; // 容错值，基准音前后半音0.2的范围
	var freq = 0; // 用户视唱当前频率
	var total = 0; // 累计用户视唱轨迹
	var noteNum = ''; // 用户视唱当前对应的音符索引
	var lineN = -1; // 用户视唱当前对应的行号
	var lastFreq = 0; // 用户视唱上一次的频率值
	var currNoteWidth = 0; // 用户视唱当前音符的轨迹
	var freqCnt = 0;// 用户视唱时累计采样次数
	singVisual.prototype = {
		// 初始化，绘制标准频率
		init : function() {
			$('.sc-canvas').remove();
			var rowNotes = this.curNotes = this.buildData();
			this.drawStandarFreq(rowNotes); // 绘制标准频率线
		},
		// 获取标准音符的信息
		buildData : function() {
			// 获取svg元素数组
			var svgArr = $(".nobrk > svg");
			if (!svgArr.length) {
				return;
			}
			// 谱子上出现所有音符的详细信息
			var noteData = getNoteData();
			// 纯律：getChunlvList
			// 12平均律：get12PingJunLvList
			var curFreqRule = get12PingJunLvList;
			if(this.isPureFreqMode){ // 使用纯律
				curFreqRule = getChunlvList;
			}
			curFreqRule.sort(function(a, b){
				return a.pitch < b.pitch;
			})
			// 琴键上的所有音符
			var pitchJson = {};
			var key;
			for (var i = 0; i < curFreqRule.length; i++) {
				key = curFreqRule[i];
				var curFreq = key.freq  || 0;
				var prevFreq = curFreqRule[i - 1] ? curFreqRule[i - 1].freq : 0;
				var nextFreq = curFreqRule[i + 1] ? curFreqRule[i + 1].freq : 0;
				pitchJson[key.pitch] = {
						"val" : key.val,
						"name" : key.name, // 唱名
						"freq" : curFreq, // 频率
						"prev_freq" : prevFreq,
						"next_freq" : nextFreq,
						"prev_haf_freq" : (curFreq - prevFreq) * rouCouVal,
						"next_haf_freq" : (nextFreq - curFreq) * rouCouVal,
						
				}
			}
		//	console.log('pitchJson:', pitchJson)
//			for (var i = 0; i < sd.KeyBoardStand.length; i++) {
//				key = sd.KeyBoardStand[i];
//				for (var j = 0; j < key.index.length; j++) {
//					var curFreq = key.freq && key.freq[j] || 0;
//					var prevFreq = (key.freq && key.freq[j - 1]) || 0;
//					var nextFreq = (key.freq && key.freq[j + 1]) || 0;
//					pitchJson[key.index[j]] = {
//							"group" : key.group,
//							"val" : key.val[j],
//							"name" : (key.name || key.nameU)[j], // 唱名
//							"freq" : curFreq, // 频率
//							"numstaff" : key.numstaff[j],
//							"prev_freq" : prevFreq,
//							"next_freq" : nextFreq,
//							"prev_haf_freq" : (curFreq - prevFreq) * .5,
//							"next_haf_freq" : (nextFreq - curFreq) * .5,
//							
//					}
//				}
//			}
			// 获取最小时值
			var minDuration = 0;
			for (var i = 0; i < noteData.length; i++) {
				var note = noteData[i];
				var duration = note[4];
				if (!minDuration || minDuration > duration) {
					minDuration = duration;
				}
			}
			// 构建每一行所有音符的信息
			var rowNotes = [];
			for (var i = 0; i < noteData.length; i++) {
				var note = noteData[i];
				var index = note[0];
				var startTime = note[1];
				var pitch = note[3];
				var duration = note[4];
				if (index == -1) {
					continue;
				}

				var pJson = copyJson(pitchJson[pitch], {});
				var freq = pJson.freq;

				var $rect = $("._" + index + "_");
				var rowIdx = $rect.parents("svg").index();
				var rowNote = rowNotes[rowIdx];
				if (!rowNote) {
					rowNote = {};
				}
				// console.log(rowIdx + " freq: " + freq);
				if (!rowNote.minFreq || rowNote.minFreq >= freq) {
					rowNote.minFreq = freq;
				}
				if (!rowNote.maxFreq || rowNote.maxFreq <= freq) {
					rowNote.maxFreq = freq;
				}

				pJson.pitch = pitch;
				pJson.index = index;
				pJson.startTime = startTime;
				pJson.duration = duration;
				// 相对于最小时值的倍数
				pJson.len = Math.round(duration / minDuration);
				pJson.x = $rect && $rect.length ? $rect.offset().left : 0;
				// 这样需要用scale转换
				// pJson.x = $rect && $rect.length ? $rect.x : 0;
				pJson.height = 1;
				pJson.line = rowIdx;

				if (!rowNote.data) {
					rowNote.data = [];
				}
				rowNote.x = 0;
				rowNote.y = 1;
				rowNote.width = 1;
				rowNote.height = 1;
				// 每行谱子的总时长
				rowNote.len = (rowNote.len || 0) + pJson.len;
				rowNote.data.push(pJson);
				rowNotes[rowIdx] = rowNote;
			}

			// 小节线数据
			// var barlineArr = getBarLineCoor(this.scale);
			var barlineArr = getBarLineCoor(this.scale, null, musicType == 2 ? 6 : 9);
			var row = {}, lineNum = 0, barWidTotal = 0, lastBarStart = 0;
			for (var i = 0; i < barlineArr.length; i++) {
				row = barlineArr[i];
				var star = row.barline_start;
				var end = row.barline_end;
				var rowNote = rowNotes[row.line];
				var svg = svgArr[row.line];
				var svgOffset = $(svg).offset();
				if (i == 0) {
					lineNum = row.line;
					lastBarStart = star[0];
				}

				if (lineNum != row.line) {
					barWidTotal = 0;
					lastBarStart = star[0];
				}
				// 一行所有小结的宽度
				barWidTotal += (end[0] - star[0]);
				lineNum = row.line;
				rowNote.y = 0;
				rowNote.width = svg.width.animVal.value;
				rowNote.svgLeft = svgOffset.left;
				rowNote.svgTop = svgOffset.top;
				rowNote.svgPz = svg;
				rowNote.barWidTotal = barWidTotal;
				rowNote.barStarX = lastBarStart;

			}
			return rowNotes;
		},
		// 绘制曲谱频率
		drawStandarFreq : function(rowNotes) {
			// 开始划
			var lineHtml = '';
			for (var i = 0; i < rowNotes.length; i++) {
				var rowNote = rowNotes[i];
				var x = rowNote.x;
				var y = rowNote.y;
				var width = rowNote.width;
				var height = rowNote.height;
				var minFreq = parseFloat(rowNote.minFreq);
				var maxFreq = parseFloat(rowNote.maxFreq);
				// 频率线的总高度
				var reqLineHeight = 200;
				var yH = parseInt(maxFreq);
				var html = '<canvas class="sc-canvas" id="canvas-' + i + '" width="' + width + '" height="' + reqLineHeight + '"></canvas>';
				$(rowNote.svgPz).after(html);

				var canvas = document.getElementById('canvas-' + i);
				var context = canvas.getContext('2d');
				// 绘制频率
				var rowNoteData = rowNote.data;
				var noteLen = rowNoteData.length;
				var barWidTotal = rowNote.barWidTotal;
				var unitWid = parseInt(barWidTotal / rowNote.len) * this.noteMrgRate;
				var nextX = 0;
				var first = 0;
				context.strokeStyle = "#C1C1C1";
				context.lineWidth = this.lineWidth;
				for (var j = 0; j < noteLen; j++) {
					var note = rowNote.data[j];
					note.x = note.x - rowNote.svgLeft;
					note.width = unitWid * note.len;
					if (note.pitch != 0) {
						note.y = this.leftBottomY - (this.yHeight / yH) * note.freq;
						note.yH = Number(yH);
						// console.log('note.x:',note.x,'note.y',note.y)
						context.moveTo(note.x, note.y);
						context.lineTo(note.x + note.width, note.y);
						context.stroke();
						nextX = note.x;
					}
				}
			}
		},

		// 查找哪一行
		findNoteRow : function(playTime, freq, cb) {
			var rowNotes = this.curNotes;
			var rowNotesLen = rowNotes.length;
			for (var i = 0; i < rowNotesLen; i++) {
				// 当前行数据
				var rowNote = rowNotes[i];
				var data = rowNote.data;
				for (var j = 0; j < data.length; j++) {
					var curNote = data[j];
					var startTime = curNote.startTime * 1e3;
					var endTime = startTime + curNote.duration * 1e3;
					// console.log('playTime-',playTime, 'startTime-',startTime,
					// 'endTime-',endTime)
					if (startTime <= playTime && playTime <= endTime) {
						// this.noteRowIdx = i;
						// this.noteIdx = j;
						// console.log('curNote--', curNote.index);
						return typeof cb == 'function' && cb(rowNote, curNote, freq);
					}

				}
			}

		},
		// 获取容错值
		getRouCouVal : function(rowNoteData, freq) {
			var shift_l = 5, shift_r = 5, finalFreq = 0;
			// 1、先从现有的音符在找
			for (var i = 0; i < rowNoteData.length; i++) {
				var note = rowNoteData[i];
				var prev_freq = note.prev_freq;
				if (prev_freq) {
					shift_l = (parseInt(note.freq) - parseInt(note.prev_freq)) * rouCouVal;
				}
				var next_freq = note.next_freq;
				if (next_freq) {
					shift_r = (parseInt(note.next_freq) - parseInt(note.freq)) * rouCouVal;
				}
				if (parseInt(freq) >= parseInt(note.freq) - shift_l && parseInt(freq) <= parseInt(note.freq) + shift_r) {
					finalFreq = note.freq;
					break;
				}
			}
			if (!finalFreq) {
				return freq;
			}
			return finalFreq;
		},
		drawUserFreq:function(startTime,sc){
			if (!sc.isRecording) {
				return;
			}
			freq = sc.frequency;
			console.log("freq",freq)
			//document.title = freq;
			if (this.isLower8) {
				freq *= 2;
			}
			var that = this;
			var playTime = new Date().getTime() - pObj.abcStartTime - 0;// 430
			if (freq != 0) { 
				
			}
			window.requestAnimaFrame(this.drawUserFreq.bind(this, startTime, sc));
		},
		// 绘制用户频率
		getFreq : function(pObj, sc) {
			if (!sc.isRecording) {
				return;
			}
			freq = sc.recorder.frequency;
			console.log("freq",freq)
			//document.title = freq;
			if (this.isLower8) {
				freq *= 2;
			}
			var that = this;
			var playTime = new Date().getTime() - pObj.abcStartTime - 0;// 430
			if (freq != 0) {
				freqCnt++;
				this.findNoteRow(playTime, freq, function(rowNote, currNote, freq) {
					
					// 整行的音符集合
					var rowNoteData = rowNote.data;
					// 当前谱子行出现低频和高频之间的所有频率
					var reqLineArr = rowNote.reqLineArr;
					// 绘制频率canvas所在的行
					var i = currNote.line;
					if (lineN != i) {
						lineN = i;
						var canvas = document.getElementById('canvas-' + i);
						that.currContext = canvas.getContext('2d');
					}
					var context = that.currContext;
					context.beginPath();

					var runWidth = 0;
					if (currNote) { // 当前曲谱上的音符
						//console.log(currNote.index, currNote, Number(currNote.freq), freq);
						var width = currNote.width;
						var dur = currNote.duration;
						// 按照30ms获取一次频率，得出录音频率移动的宽度
						runWidth = ((width * timeSpan) / (dur * 1e3)) * 1.15;
						var x = currNote.x;
						// 已经是下一个音符
						if (noteNum != currNote.index) {
							noteNum = currNote.index;
							total = x; // 下一个音符的起始X
							currNoteWidth = runWidth; // 下一个音符的运动长度
							freqCnt = 0;
							context.beginPath();
						}
						// 休止符不绘制
						if(currNote.pitch == 0){
							total += runWidth;
							currNoteWidth += runWidth;
							return;
						}
						if (freqCnt >= (width / runWidth) * 0.15) { // 从音符20%的位置开始绘制
							// 经容错处理得到的频率
							freq = that.getRouCouVal(rowNoteData, freq);
							var userFreqy = that.leftBottomY - (that.yHeight / currNote.yH) * freq;
							// 如果一个音符的运动总宽度大于标准音的宽度，那么就不再运动
							if (currNoteWidth > width) {
								runWidth = 0;
							}
							if (freq > currNote.freq) {
								userFreqy = 0;
							}
							if(!freq){
								userFreqy = 0;
							}
							// 落在标准音上，则显示绿色，否则红色。
							if (userFreqy == currNote.y) {
								context.strokeStyle = "#5AB53E";
								that.rightNumber++;
							} else {
								context.strokeStyle = "#E73535";
								that.errNumber++;
							}
							context.lineWidth = that.lineWidth;
							// console.log('userFreqy...',userFreqy)
							if (noteNum != currNote.index) { // 换下一个音符时，重新起笔
								context.moveTo(total, userFreqy);
								context.lineTo(total + runWidth, userFreqy);
							} else {
								context.lineTo(total, userFreqy);
								context.lineTo(total + runWidth, userFreqy);
							}
							context.stroke();
							context.save();
							context.lineWidth = 0;
							// 绘制渐变区域---beg
							var h = 0;
							if (userFreqy != currNote.y) {
								h = that.lineWidth / 2;
								if (freq > currNote.freq) {
									h *= -1;
								}
							}
							// 竖直往下，至x轴
							context.lineTo(total + runWidth, currNote.y + h);
							// 水平往左，至上一个点的在x轴的垂点
							context.lineTo(total, currNote.y + h);
							gradient = context.createLinearGradient(total, currNote.y, total, userFreqy);
							gradient.addColorStop(0, "rgba(116, 184, 95,0.5)");
							gradient.addColorStop(0.8, "rgba(231, 53, 53,0.5)");
							// 设置淡紫色
							// context.fillStyle = "rgba(231, 53, 53,0.2)";
							context.fillStyle = gradient;
							// 实现闭合与x轴之前的区域
							context.fill();
							context.restore();
							// 绘制渐变区域---end
							
							total += runWidth;
							currNoteWidth += runWidth;
						}
					}
				});
			}
			window.requestAnimaFrame(this.getFreq.bind(this, pObj, sc));
		},
		clearFreq : function() {
			total = 0, noteNum = '', lineN = -1, lastFreq = 0, currNoteWidth = 0, freqCnt = 0;
			$('.sc-canvas').remove();
		},
		playFreq : function() {
		},
		stopFreq: function(){}
	}
	win.singVisual = singVisual;
}(window, document))

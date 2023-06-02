window._isCtrl = false
const AbcType = Object.freeze({
  /** 速度 */
  Speed: 14,
  /** 节拍 */
  Beat: 6,
  /** 谱号 */
  KeySign: 1,
  /** 休止符 */
  Rest: 10,
  /** 音符 */
  Note: 8,
  /** 小节 */
  Bar: 0
})

window.addEventListener('mousewheel', e => {
  if (event.ctrlKey === true || event.metaKey) {
    event.preventDefault();
    const { deltaY } = e
    content_vue.m.panzoom.scale -= deltaY / 100
  }
}, { passive: false })

const changeSaveToList = debounce(async () => {
  if (!content_vue.m.saveToScore.title) return
  content_vue.m.saveToScore.isLoading = true
  const res = await request({
    method: 'POST',
    url: '/musicals/check-name',
    data: { keyword: content_vue.m.saveToScore.title, page: 1, page_size: 20 }
  })
  content_vue.m.saveToScore.isLoading = false
  content_vue.m.saveToScore.repeatList = res.map(item => item.name)
}, 500)

function changeSelectNoteStyle() {
  $("._select-note").removeClass("_select-note");
  const selectNote = $(".selected_text")[0];
  if (selectNote) {
    const istart = selectNote.getAttribute("istart");
    $(`[istart=${istart}]`).addClass("_select-note");
  }
}

// 防抖
function debounce(fn, delay) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

/**
 *
 * @param {Parameters<JQueryStatic['ajax']>[0] & { params: Object } | string} opts
 */
const request = async (opts = {}) => {
  return new Promise((resolve, reject) => {
    content_vue.m.reqs++
    /** @type { Parameters<JQueryStatic['ajax']>[0] } */
    const defaultOpts = {
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      success: (data) => {
        resolve(data)
        content_vue.m.reqs--
      },
      error: config => {
        if (config.status >= 200 && config.status <= 400) resolve(config.responseText)
        else {
          reject(config.status + config.statusText)
          alert(config.responseJSON?.error_msg || config.responseJSON?.message || '请求异常')
        }
        content_vue.m.reqs--
      },
    };
    if (typeof opts === "string") opts = { url: opts };
    opts = Object.assign(defaultOpts, opts);
    if (opts.url[0] && opts.url[0] === "/") {
      opts.url = API_SERVER_URL + opts.url;
    }
    if (opts.params) {
      const paramsStr = Object.keys(opts.params).reduce((str, key) => {
        const val = opts.params[key];
        if (!val && val !== 0) return str;
        return str + key + "=" + opts.params[key] + "&";
      }, "?");
      opts.url += paramsStr;
    }
    if (!opts.headers) opts.headers = {}
    if (localStorage.getItem('token')) {
      opts.headers = Object.assign({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }, opts.headers)
    }
    if (typeof opts.data === "object") opts.data = JSON.stringify(opts.data);
    $.ajax(opts)
  });
};

const saveScore = async (isSaveAs = false) => {
  if (!isSaveAs && !content_vue.m.id && !content_vue.m.saveToScore.isShow) {
    content_vue.m.saveToScore.title = $("#source").val().match(/(?<=T:\s*).+/g)[0]
    content_vue.m.saveToScore.isShow = true
    content_vue.m.saveToScore.sb = true
    return
  }

  let abcVal = $("#source").val() + '';
  let [title, subTitle] = abcVal.match(/(?<=T:\s*).+/g);
  const [composer, lyricist] = abcVal.match(/(?<=C:\s*).+/g);
  const [keySign] = abcVal.match(/(?<=K:\s*).+/);
  const [timeSign] = abcVal.match(/(?<=M:\s*).+/);
  const [speed] = abcVal.match(/(?<=Q:\s*).+/);
  const isChangeTimeSign = !!abcVal.match(/\$\[M:\s*\d+\/\d+\]/g);
  const isChangeKeySign = !!abcVal.match(/\$\[K:\s*[A-G]\]/g);
  const isUpbeat = scoreOpts.isWeak;
  const musicType = scoreOpts.musicType;
  const isHasLyric = !!abcVal.match(/\nw:.+/g);
  const initOpts = content_vue.m.scoreOpts

  let url = '/musicals'
  let method = content_vue.m.id ? 'PUT' : 'POST'
  if (isSaveAs) {
    method = 'POST'
    title = content_vue.m.saveToScore.title
    abcVal = abcVal.replace(/(?<=T:\s).+/, title)
  }
  if (method === 'PUT') {
    url += `/${content_vue.m.id}`
  }

  const reqOpts = {
    url,
    method,
    data: {
      name: title,
      base_info: {
        title,
        subTitle,
        composer,
        lyricist,
        keySign,
        speed,
        timeSign,
        isChangeTimeSign,
        isChangeKeySign,
        isUpbeat,
        musicType,
        isHasLyric,
        initOpts,
        lyricStyle: content_vue.m.lyric.style
      },
      abc_json_val: abcVal,
      music_type: scoreOpts.musicType,
    }
  }

  content_vue.m.saveToScore.isShow = false
  const res = await request(reqOpts);
  if (content_vue.m.saveToScore.sb) {
    $('#source').val($('#source').val().replace(/(?<=T:\s).+/, content_vue.m.saveToScore.title))
    abc_change()
    content_vue.m.id = res.id
  }
  if (!isSaveAs && method === 'POST') {
    content_vue.m.id = res.id
  }
  if (content_vue.m.saveToScore.sb) {
    content_vue.m.saveToScore.sb = false
    return alert('成功创建谱例')
  }
  alert(isSaveAs ? '成功另存为谱例' : content_vue.m.id ? '成功保存谱例' : '成功创建谱例')
};

async function getScorePngBase64() {
  return new Promise((resolve) => {
    const canvas = mergeSvg2Png();
    svgAsPngUri(canvas, null, (url) => resolve(url));
  });
}

const initNewScoreOpts = {
  title: "",
  subTitle: "",
  compose: "",
  lyricist: "",
  isWeak: false,
  weakBarTop: "1",
  weakBarBot: "4",
  keySign: "C",
  beatNote1: "4",
  beatNote2: "4",
  beatType: "custom",
  musicType: "easy",
  speedType: "txt",
  speedText: "Moderato",
  speedNote: "1/4",
  speedNum: "88",
  rows: "2",
  rowBars: "4",
};

function liaison(val) {
  console.log('liaison: 连音');
  // 连音线
  // debugger
  var selectEl = $(".selected_text")[0];
  if (!selectEl) return alert("未选中音符：请选取一个音符，然后重试");
  var content = $("#source").val();
  var matchArr = val.match(/\((\d)/);
  var num = matchArr[1];
  var cen = syms[selectEl.getAttribute("istart")];
  console.log('liaison cen', cen);
  var dur = cen["dur"];
  var sel_content = content["substring"](cen["istart"], cen["iend"]);
  console.log('liaison cen', sel_content);
  var n_dur = dur / 2;
  var n_content = "";
  var my_ulen = cen["my_ulen"];
  if (n_dur > my_ulen) {
    var n_dur_s = parseInt(n_dur / my_ulen);
    if (n_dur_s != 1) {
      n_content = n_dur_s + "";
    }
  } else {
    if (n_dur < my_ulen) {
      var n_dur_s = parseInt(my_ulen / n_dur);
      if (n_dur_s > 1) {
        for (var i = 1; i < n_dur_s; i = i * 2) {
          n_content += "/";
        }
      }
    }
  }
  if (/\d{1,}|\/{1,}/["test"](sel_content)) {
    sel_content = sel_content["replace"](/\d{1,}|\/{1,}/, n_content);
  } else {
    sel_content = sel_content + n_content;
  }
  for (var i = 0; i < num - 1; i++) {
    sel_content += "z" + n_content;
  }
  var new_content =
    content["substring"](0, cen["istart"]) +
    val +
    sel_content +
    " " +
    content["substring"](cen["iend"]);
  $("#source")["val"](new_content);
  if (musicType == 2) {
    src_change();
  } else {
    render();
  }
  doLog();
  return;
}
let isNewTab = false;
function copy() {
  //复制小节
  var selectedBars = $("svg[type='rectbar']");
  if ($(selectedBars).length > 0) {
    copyNodes();
    return false;
  }
  var selectedNodes = $("svg[type='rectnode']");
  if ($(selectedNodes).length > 0) {
    copyNodes();
    return false;
  }
  //复制音符
  var selectNotes = $(
    ".selected_text[type*='HD'],.selected_text[type^='r'],.selected_text[type='note']"
  );
  if (selectNotes.length > 0) {
    copyNote();
    copyNodeInfo = null
    return false;
  }
}

function paste() {
  var selectedBars = $("svg[type='rectbar']");
  if ($(selectedBars).length > 0) {
    //粘贴小节
    pasteNode();
    return false;
  }
  var selectedNodes = $("svg[type='rectnode']");
  if ($(selectedNodes).length > 0) {
    //粘贴小节
    pasteNode();
    return false;
  }
  var selectNotes = $(
    ".selected_text[type*='HD'],.selected_text[type^='r'],.selected_text[type='note']"
  );
  if (selectNotes.length > 0) {
    pasteNote();
    return false;
  }
}
function up8() {
  var selectedBars = $("svg[type='rectnode'],svg[type='rectbar']");
  //选中的是小节()
  if (selectedBars.length > 0) {
    var handleGraphEditor = upDownKeyWord(12);
    if (handleGraphEditor) {
      return false;
    }
    return;
  }
  //选中的是单个音符
  if ($(".selected_text").length > 0 || $(".select_text_g").length > 0) {
    var handleGraphEditor = upDownKeyWord(12);
    if (handleGraphEditor) {
      return false;
    }
    return;
  }
  staffUp8("source");
}

function down8() {
  var selectedBars = $("svg[type='rectnode'],svg[type='rectbar']");
  //选中的是小节()
  if (selectedBars.length > 0) {
    var handleGraphEditor = upDownKeyWord(-12);
    if (handleGraphEditor) {
      return false;
    }
    return;
  }
  //选中的是单个音符
  if ($(".selected_text").length > 0 || $(".select_text_g").length > 0) {
    var handleGraphEditor = upDownKeyWord(-12);
    if (handleGraphEditor) {
      return false;
    }
    return;
  }
  staffDown8("source");
}

function keepSelectNote(cb) {
  const istart = $(".selected_text").attr("istart");
  if (istart) window.lastIstart = istart;
  cb();
}

function getSelectAbcCodeInfo() {
  const abcCode = $('#source').val()
  const selectEl = $(".selected_text")[0];
  console.log(selectEl);
  // r1=rest
  if (!selectEl || !['hd', 'rest', 'r1', 'note'].includes($(selectEl).attr('type').toLowerCase())) {
    alert("未选中音符：请选取一个音符，然后重试")
    return false
  }
  const istart = +selectEl.getAttribute("istart");
  const iend = syms[istart].iend;
  let txt = abcCode.substring(iend - (iend - istart))
  txt = txt.substring(0, iend - istart)
  const length = txt.length;
  const head = abcCode.substring(0, istart)
  const tail = abcCode.substring(iend)
  return { txt, istart, iend, length, head, tail, abcCode };
}

/* 获取选中小节 */
function getSelectAbcNodeIndes() {
  var node_indexs = [];
  $('svg.music').each(function() {
    $(this).find('svg[type="rectnode"]').each(function(){
      node_indexs.push(Number($(this).attr('barindex')));
    });
  });
  if(!node_indexs.length && $(".selected_text").length){
    if (!['hd', 'rest', 'r1', 'note'].includes($(".selected_text").attr('type').toLowerCase())) {
      alert("未选中小节或音符")
      return []
    }
    for(var i=0; i<$(".selected_text").length; i++){
      var istart = +$(".selected_text")[i].getAttribute("istart");
      node_indexs.push(getNodeIndexByIstart(istart));
    }
  }
  if(node_indexs.length){
    node_indexs.sort();
  }
  return node_indexs;
}

/** @returns { number[] }*/
function getIstartList() {
  return [
    ...new Set([...$("[istart]")].map((el) => el.getAttribute("istart"))),
  ].sort();
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
  const info = getSelectAbcCodeInfo();
  if (!info) return alert("未选中音符：请选取一个音符，然后重试");
  let { istart, iend, txt } = info;
  const abcCode = $("#source").val();
  const newCode = replaceCharsInRange(abcCode, istart, iend, cb(txt));
  $("#source").val(newCode);
  abc_change();
}

function lineTo() {
  const el = $('.selected_text')
  var content = $("#source")["val"]();
  if (!el.length) return alert('未选中音符：请选取一个音符，然后重试')
  const istart = +el.attr('istart')
  var cen = syms[istart]
  if (cen.type === AbcType.Rest) return
    var _0x17007 = cen["next"];
    var _0x192A8 = cen["istart"];
    var _0x1951E = -1;
    for (var i = _0x192A8 + 1; i < syms["length"]; i++) {
      _0x17007 = syms[i];
      if (_0x17007) {
        if (_0x17007["type"] == 8 || _0x17007["type"] == 10) {
          if (_0x17007["v"] == cen["v"]) {
            _0x1951E = _0x17007["iend"];
            break;
          }
        }
      }
    }
    if (_0x1951E == -1) {
      return;
    }
    var _0x16251 = '(note)'
    var _0x1962C = content["substring"](cen["istart"], _0x1951E);
    _0x16251 = _0x16251["replace"]("note", _0x1962C);
    content =
      content["substring"](0, cen["istart"]) +
      _0x16251 +
      content["substring"](_0x1951E);
    $("#source")["val"](content);
    if (musicType == 2) {
      src_change();
    } else {
      render();
    }
    doLog();
    return;
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
    method: "keydown",
    isBubbles: true,
    key: "",
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
  };
  const { method, key, ctrlKey, altKey, shiftKey, metaKey } = {
    ...defaultOpts,
    ...opts,
  };
  const event = document.createEvent("KeyboardEvent");
  event.initKeyboardEvent(
    method,
    true,
    true,
    window,
    ctrlKey,
    altKey,
    shiftKey,
    metaKey,
    key,
    0
  );
  document.dispatchEvent(event);
}

/**
 * 切割或合并音符
 * @param { 'left' | 'right' | 'all' } dir - 方向
 * @param { 'split' | 'merge' } type - 方式
 * @returns
 */
function changeGroupNote(dir, type) {
  keepSelectNote(() => {
    const info = getSelectAbcCodeInfo();
    if (!info) return alert("未选中音符：请选取一个音符，然后重试");
    let { istart, txt } = info;
    /** @type { string } */
    let abcCode = $("#source").val();
    let headCode = abcCode.substr(0, istart);
    let tailCode = abcCode.substr(istart).replace(txt, "");
    if (type === "merge") {
      if (["left", "all"].includes(dir)) headCode = headCode.trimEnd();
      if (["right", "all"].includes(dir)) tailCode = tailCode.trimStart();
    }
    if (type === "split") {
      if (["left", "all"].includes(dir)) txt = " " + txt;
      if (["right", "all"].includes(dir)) txt += " ";
    }
    abcCode = headCode + txt + tailCode;
    $("#source").val(abcCode);
    abc_change();
  });
}

//工具栏的所有样本数据
var toolTemp = {
  // note: {
  // code: 'note',
  // name: '音符',
  // },
  length: {
    code: "length",
    name: "时值",
    imgList: [
      {
        url: "assets/music_score_editor/images/note_1.png",
        value: "1/1",
        dur: "1536",
        title: "全音符",
        class: "operator_sc jp_note",
        keycode: "103",
      },
      {
        url: "assets/music_score_editor/images/note_2.png",
        value: "1/2",
        dur: "768",
        title: "半音符",
        class: "operator_sc jp_note",
        keycode: "102",
      },
      {
        url: "assets/music_score_editor/images/note_3.png",
        value: "1/4",
        dur: "384",
        title: "四分音符",
        class: "operator_sc jp_note",
        keycode: "101",
      },
      {
        url: "assets/music_score_editor/images/note_4.png",
        value: "1/8",
        dur: "192",
        title: "八分音符",
        class: "operator_sc selected jp_note",
        keycode: "100",
      },
      {
        url: "assets/music_score_editor/images/note_5.png",
        value: "1/16",
        dur: "96",
        title: "16分音符",
        class: "operator_sc jp_note",
        keycode: "99",
      },
      {
        url: "assets/music_score_editor/images/note_6.png",
        value: "1/32",
        dur: "48",
        title: "32分音符",
        class: "operator_sc jp_note",
        keycode: "98",
      },
      {
        url: "assets/music_score_editor/images/note_7.png",
        value: "1/64",
        dur: "24",
        title: "64分音符",
        class: "operator_sc jp_note",
        keycode: "97",
      },
      //{url: 'assets/music_score_editor/images/shichang1.png', value: '/', title: '减小音符长度',class:"operator_len cmenu minus_len",id:"minus_len",position:"after"},
      //{url: 'assets/music_score_editor/images/shichang2.png', value: '2', title: '增加音符长度',class:"operator_len cmenu add_len",id:"add_len",position:"after"},
      //{url: 'assets/music_score_editor/images/shichang4.png', value: '>', title: '3/1',class:"operator_len",id:"",position:"mid"},
      //{url: 'assets/music_score_editor/images/shichang5.png', value: '<', title: '1/3',class:"operator_len",id:"",position:"mid"}
    ],
    isExpand: false, // 是否展开
    canSwitch: true, // 是否可以切换
  },
  dur: {
    code: "dur",
    name: "时值",
    imgList: [
      {
        url: "assets/music_score_editor/images/dot3.png",
        value: "3/",
        title: "节奏附点",
        class: "cmenu",
        position: "after",
      },
      {
        url: "assets/music_score_editor/images/dot4.png",
        value: "7//",
        title: "节奏附点",
        class: "cmenu",
        position: "after",
      },
      {
        url: "assets/music_score_editor/images/contact.png",
        value: "-",
        title: "连音线",
        class: "contact cmenu",
        id: "contact",
        position: "after",
      },
      {
        url: "assets/music_score_editor/images/con2.png",
        value: "(2",
        title: "2连音",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/con3.png",
        value: "(3",
        title: "3连音",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/con4.png",
        value: "(4",
        title: "4连音",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/con5.png",
        value: "(5",
        title: "5连音",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/con6.png",
        value: "(6",
        title: "6连音",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/con7.png",
        value: "(7",
        title: "7连音",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/b5.png",
        value: "!fermata!",
        title: "延长记号",
        class: "cmenu",
        position: "before",
      },
    ],
    isExpand: false, // 是否展开
  },
  height: {
    code: "height",
    name: "音高",
    imgList: [
      //			{url: 'assets/music_score_editor/images/yingao1.png', value: '^', title: '升',class:"yingao cmenu",position:"before"},
      //			{url: 'assets/music_score_editor/images/cs.png', value: '^^', title: '重升',class:"yingao cmenu",position:"before"},
      //			{url: 'assets/music_score_editor/images/yingao2.png', value: '_', title: '降',class:"yingao cmenu",position:"before"},
      //			{url: 'assets/music_score_editor/images/cj.png', value: '__', title: '重降',class:"yingao cmenu",position:"before"},
      //			{url: 'assets/music_score_editor/images/yingao3.png', value: '=', title: '还原',class:"yingao cmenu",position:"before"},

      {
        url: "assets/music_score_editor/images/vaup.png",
        value: "!8va(!",
        value2: "!8va)!",
        title: "高8度演奏",
        class: "cmenu",
        position: "surround",
      },
      {
        url: "assets/music_score_editor/images/vbdown.png",
        value: "!8vb(!",
        value2: "!8vb)!",
        title: "低8度演奏",
        class: "cmenu",
        position: "surround",
      },
      {
        url: "assets/music_score_editor/images/15va.png",
        value: "!15ma(!",
        value2: "!15ma)!",
        title: "低15度演奏",
        class: "cmenu",
        position: "surround",
      },
      {
        url: "assets/music_score_editor/images/15vb.png",
        value: "!15mb(!",
        value2: "!15mb)!",
        title: "低15度演奏",
        class: "cmenu",
        position: "surround",
      },

      //			<img src="assets/music_score_editor/images/vaup.png" value="!8va(!" value2="!8va)!" title="高8度演奏" class="cmenu" position="surround"/>
      //				<img src="assets/music_score_editor/images/vbdown.png" value="!8vb(!" value2="!8vb)!" title="低8度演奏" class="cmenu" position="surround"/>
      //				<img src="assets/music_score_editor/images/15va.png" value="!15ma(!" value2="!15ma)!" title="高15度演奏" class="cmenu" position="surround"/>
      //				<img src="assets/music_score_editor/images/15vb.png" value="!15mb(!" value2="!15mb)!" title="低15度演奏" class="cmenu" position="surround"/>
      //			{url: 'assets/music_score_editor/images/shengjiang1.png', value: 'up', title: '升一个音',class:"up cmenu",id:"up"},
      //			{url: 'assets/music_score_editor/images/shengjiang2.png', value: 'down', title: '降一个音',class:"down cmenu",id:"down"},
      //			{url: 'assets/music_score_editor/images/up-half.png', value: 'uphalf', title: '升半个音',class:"uphalf cmenu",id:"uphalf"},
      //			{url: 'assets/music_score_editor/images/down-half.png', value: 'downhalf', title: '降半个音',class:"downhalf cmenu",id:"downhalf"},
      //			{url: 'assets/music_score_editor/images/up8.png', value: 'up8', title: '上升一个八度',class:"up8 cmenu",id:"up8"},
      //			{url: 'assets/music_score_editor/images/down8.png', value: 'down8', title: '下降一个八度',class:"down8 cmenu",id:"down8"}
    ],
    isExpand: false, // 是否展开
  },
  /*	chord: {
		code: 'chord',
		name: '和弦',
		imgList: [
			{url: 'assets/music_score_editor/images/I.png', level:'1',chord:'yuanwei', title: '原位',class:"chord_ins cmenu",type:"Ⅰ"},
			{url: 'assets/music_score_editor/images/I6.png', level:'1',chord:'zhuangwei1', title: '第一转位',class:"chord_ins cmenu",type:"Ⅰ6"},
			{url: 'assets/music_score_editor/images/I46.png', level:'1',chord:'zhuangwei2', title: '第二转位',class:"chord_ins cmenu",type:"Ⅰ46"},
			{url: 'assets/music_score_editor/images/IV.png', level:'4',chord:'yuanwei', title: '原位',class:"chord_ins cmenu",type:"Ⅳ"},
			{url: 'assets/music_score_editor/images/IV6.png', level:'4',chord:'zhuangwei1', title: '第一转位',class:"chord_ins cmenu",type:"Ⅳ6"},
			{url: 'assets/music_score_editor/images/IV46.png', level:'4',chord:'zhuangwei2',title: '第二转位',class:"chord_ins cmenu",type:"Ⅳ46"},
			{url: 'assets/music_score_editor/images/V.png', level:'5',chord:'yuanwei',title: '原位',class:"chord_ins cmenu",type:"Ⅴ"},
			{url: 'assets/music_score_editor/images/V6.png', level:'5',chord:'zhuangwei1',title: '第一转位',class:"chord_ins cmenu",type:"Ⅴ6"},
			{url: 'assets/music_score_editor/images/V46.png', level:'5',chord:'zhuangwei2',title: '第二转位',class:"chord_ins cmenu",type:"Ⅴ46"}
			
		],
		isExpand: false // 是否展开
	},*/
  rest: {
    code: "rest",
    name: "休止符",
    imgList: [
      {
        url: "assets/music_score_editor/images/z1.png",
        value: "1",
        title: "全音休止符",
        class: "z_notes jp_note cmenu",
        type: "1",
      },
      {
        url: "assets/music_score_editor/images/z2.png",
        value: "1/2",
        title: "半音休止符",
        class: "z_notes jp_note cmenu",
        type: "1/2",
      },
      {
        url: "assets/music_score_editor/images/z4.png",
        value: "1/4",
        title: "四分休止符",
        class: "z_notes jp_note cmenu",
        type: "1/4",
      },
      {
        url: "assets/music_score_editor/images/z8.png",
        value: "1/8",
        title: "八分休止符",
        class: "z_notes jp_note cmenu",
        type: "1/8",
      },
      {
        url: "assets/music_score_editor/images/z16.png",
        value: "1/16",
        title: "16分休止符",
        class: "z_notes jp_note cmenu",
        type: "1/16",
      },
      {
        url: "assets/music_score_editor/images/z32.png",
        value: "1/32",
        title: "32分休止符",
        class: "z_notes jp_note cmenu",
        type: "1/32",
      },
      {
        url: "assets/music_score_editor/images/z64.png",
        value: "1/64",
        title: "64分休止符",
        class: "z_notes jp_note cmenu",
        type: "1/64",
      },
    ],
    isExpand: false, // 是否展开
    canSwitch: true, // 是否可以切换
    isExe: false, // 是否在exe中打开
  },
  common: {
    code: "common",
    name: "常用符号",
    imgList: [],
    isExpand: true, // 是否展开
    canSwitch: false, // 是否可以切换
  },
  clef: {
    code: "clef",
    name: "谱号",
    imgList: [
      {
        url: "assets/music_score_editor/images/ph_gy.png",
        value: "[K:treble]",
        title: "高音谱号",
        class: "cmenu",
        type: "all",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/ph_dy.png",
        value: "[K:bass]",
        title: "低音谱号",
        class: "cmenu",
        type: "all",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/ph_zy.png",
        value: "[K:alto]",
        title: "中音谱号",
        class: "cmenu",
        type: "all",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/ph_czy.png",
        value: "[K:tenor]",
        title: "次中音谱号",
        class: "cmenu",
        type: "all",
        position: "before",
      },
    ],
    isExpand: false, // 是否展开
  },
  key: {
    code: "key",
    name: "调号",
    imgList: [
      {
        url: "assets/music_score_editor/images/key/C.png",
        value: "[K:C]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
        title: "C大调",
      },
      {
        url: "assets/music_score_editor/images/key/G.png",
        value: "[K:G]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
        title: "G大调",
      },
      {
        url: "assets/music_score_editor/images/key/D.png",
        value: "[K:D]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
        title: "D大调",
      },
      {
        url: "assets/music_score_editor/images/key/A.png",
        value: "[K:A]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
        title: "A大调",
      },
      {
        url: "assets/music_score_editor/images/key/E.png",
        value: "[K:E]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
        title: "E大调",
      },
      {
        url: "assets/music_score_editor/images/key/B.png",
        value: "[K:B]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
        title: "B大调",
      },
      {
        url: "assets/music_score_editor/images/key/Fs.png",
        value: "[K:F#]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
        title: "#F大调",
      },
      {
        url: "assets/music_score_editor/images/key/Cs.png",
        value: "[K:C#]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
        title: "#C大调",
      },
      {
        url: "assets/music_score_editor/images/key/Cb.png",
        value: "[K:Cb]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
        title: "bC大调",
      },
      {
        url: "assets/music_score_editor/images/key/Gb.png",
        value: "[K:Gb]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
        title: "bG大调",
      },
      {
        url: "assets/music_score_editor/images/key/Db.png",
        value: "[K:Db]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
        title: "bD大调",
      },
      {
        url: "assets/music_score_editor/images/key/Ab.png",
        value: "[K:Ab]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
        title: "bA大调",
      },
      {
        url: "assets/music_score_editor/images/key/Eb.png",
        value: "[K:Eb]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
        title: "bE大调",
      },
      {
        url: "assets/music_score_editor/images/key/Bb.png",
        value: "[K:Bb]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
        title: "bB大调",
      },
      {
        url: "assets/music_score_editor/images/key/F.png",
        value: "[K:F]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
        title: "F大调",
      },
    ],
  },

  bar: {
    code: "bar",
    name: "小节线",
    imgList: [
      {
        url: "assets/music_score_editor/images/other23.png",
        value: "|",
        title: "小节线",
        class: "cmenu",
        type: "nodeline",
        position: "afterReplace",
      },
      {
        url: "assets/music_score_editor/images/xnodeline.png",
        value: ".|",
        title: "虚线小节线",
        class: "cmenu",
        type: "nodeline",
        position: "afterReplace",
      },
      {
        url: "assets/music_score_editor/images/nodeline2.png",
        value: "||",
        title: "双小节线",
        class: "cmenu",
        type: "nodeline",
        position: "afterReplace",
      },
      {
        url: "assets/music_score_editor/images/jwxjx.png",
        value: "|]",
        title: "结尾小结线",
        class: "cmenu",
        type: "nodeline",
        position: "afterReplace",
      },
      {
        url: "assets/music_score_editor/images/other24.png",
        value: "|:",
        title: "反覆开始",
        class: "cmenu",
        type: "nodeline",
        position: "preReplace",
      },
      {
        url: "assets/music_score_editor/images/other25.png",
        value: ":|",
        title: "反覆结束",
        class: "cmenu",
        type: "nodeline",
        position: "afterReplace",
      }, //mid表示替换掉原来的
      {
        url: "assets/music_score_editor/images/other26.png",
        value: ":||:",
        title: "",
        class: "cmenu",
        type: "nodeline",
        position: "afterReplace",
      },
      {
        url: "assets/music_score_editor/images/other27.png",
        value: "[1.",
        title: "反复跳跃记号1.",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
      },
      {
        url: "assets/music_score_editor/images/other28.png",
        value: "[2.",
        title: "反复跳跃记号2.",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
      },
      {
        url: "assets/music_score_editor/images/3.png",
        value: "[3.",
        title: "反复跳跃记号3.",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
      },
      {
        url: "assets/music_score_editor/images/4.png",
        value: "[4.",
        title: "反复跳跃记号4.",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
      },
      {
        url: "assets/music_score_editor/images/5.png",
        value: "[5.",
        title: "反复跳跃记号5.",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
      },
      {
        url: "assets/music_score_editor/images/breakline.png",
        value: "$",
        title: "换行",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
      },
      //			{url: 'assets/music_score_editor/images/m.png', value: '[M:3/4]', title: '改变节拍',class:"operator cmenu",type:"nodeline",position:"after"},
      //			{url: 'assets/music_score_editor/images/key.png', value: '[K:E]', title: '改变调号',class:"cmenu",type:"nodeline",position:"after"},
      //			{url: 'assets/music_score_editor/images/speed.png', value: '#Q_div', title: '改变速度',class:"cmenu",datatoggle:"modal",datatarget:"#Q_div",id:"changenodespeed"},

      //			{url: 'assets/music_score_editor/images/nodeseq.png', value: '', title: '显示小节序号',class:"shownodeseq cmenu"},
      //			{url: 'assets/music_score_editor/images/firstnodeseq.png', value: '', title: '显示每行首个小节序号',class:"showfirstnodeseq cmenu"},
      //			{url: 'assets/music_score_editor/images/direct/staffdown.png', value: '[I:staff +1]', title: '声部下移',class:"cmenu",position:"before"},
      //			{url: 'assets/music_score_editor/images/direct/staffup.png', value: '[I:staff -1]', title: '声部上移',class:"cmenu",position:"before"},
      //			{url: 'assets/music_score_editor/images/do_chn.png', value: 'DO', title: '简谱do位置',class:"cmenu",datatoggle:"modal",datatarget:"#DO_CHN_div", id:"do_chn"},
      //			{url: 'assets/music_score_editor/images/beijingse2.png', value: '"-mb-"', title: '小节背景色',class:"operator cmenu nodecolorli",position:"before",type:"nodebg",id:"nodecolorli"},
      //			{url: 'assets/music_score_editor/images/beijingse.png', value: '"-nb-"', title: '音符背景色',class:"operator cmenu notecolorli",position:"before",type:"notebg",id:"notecolorli"}
    ],
    isExpand: false, // 是否展开
  },
  rhythm: {
    code: "rhythm",
    name: "节奏",
    imgList: [
      {
        url: "assets/music_score_editor/images/jz_wxp_4f.png",
        value: "C2",
        len: "2",
        title: "",
        class: "cmenu",
        position: "rhythm",
      },
      {
        url: "assets/music_score_editor/images/jz_wxp_28.png",
        value: "CC",
        len: "2",
        title: "",
        class: "cmenu",
        position: "rhythm",
      },
      {
        url: "assets/music_score_editor/images/jz_wxp_168.png",
        value: "C/C/C",
        len: "2",
        title: "",
        class: "cmenu",
        position: "rhythm",
      },
      {
        url: "assets/music_score_editor/images/jz_wxp_816.png",
        value: "CC/C/",
        len: "2",
        title: "",
        class: "cmenu",
        position: "rhythm",
      },
      {
        url: "assets/music_score_editor/images/jz_wxp_xqf.png",
        value: "C/CC/",
        len: "2",
        title: "",
        class: "cmenu",
        position: "rhythm",
      },
      {
        url: "assets/music_score_editor/images/jz_wxp_416.png",
        value: "C/C/C/C/",
        len: "2",
        title: "",
        class: "cmenu",
        position: "rhythm",
      },
      {
        url: "assets/music_score_editor/images/jz_wxp_xfd.png",
        value: "C3/C/",
        len: "2",
        title: "",
        class: "cmenu",
        position: "rhythm",
      },
      {
        url: "assets/music_score_editor/images/jz_wxp_hxfd.png",
        value: "C/C3/",
        len: "2",
        title: "",
        class: "cmenu",
        position: "rhythm",
      },
      {
        url: "assets/music_score_editor/images/jz_wxp_3ly.png",
        value: "(3CCC",
        len: "2",
        title: "",
        class: "cmenu",
        position: "rhythm",
      },
      {
        url: "assets/music_score_editor/images/jz_wxp_fd64.png",
        value: "C>CCC",
        len: "2",
        title: "",
        class: "cmenu",
        position: "rhythm",
      },
    ],
  },
  ruler: {
    code: "ruler",
    name: "工具",
    imgList: [
      {
        url: "assets/music_score_editor/images/yincheng.png",
        value: "1",
        title: "音程尺",
        id: "ycc",
        class: "ruler-img",
      },
      {
        url: "assets/music_score_editor/images/dasan.png",
        value: "2",
        title: "大三和弦",
        id: "dshx",
        class: "ruler-img",
      },
      {
        url: "assets/music_score_editor/images/xiaosan.png",
        value: "3",
        title: "小三和弦",
        id: "xshx",
        class: "ruler-img",
      },
      {
        url: "assets/music_score_editor/images/xnrs.png",
        value: "#LTY_div",
        title: "虚拟人声",
        id: "xnrs",
        class: "ruler-img",
        datatoggle: "modal",
        datatarget: "#LTY_div",
      },
    ],
  },
  meter: {
    code: "meter",
    name: "拍号",
    imgList: [
      {
        url: "assets/music_score_editor/images/meter/22.png",
        value: "[M:2/2]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
      },
      {
        url: "assets/music_score_editor/images/meter/42.png",
        value: "[M:2/4]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
      },
      {
        url: "assets/music_score_editor/images/meter/43.png",
        value: "[M:3/4]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
      },
      {
        url: "assets/music_score_editor/images/meter/44.png",
        value: "[M:4/4]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
      },
      {
        url: "assets/music_score_editor/images/meter/45.png",
        value: "[M:5/4]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
      },
      {
        url: "assets/music_score_editor/images/meter/46.png",
        value: "[M:6/4]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
      },
      {
        url: "assets/music_score_editor/images/meter/83.png",
        value: "[M:3/8]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
      },
      {
        url: "assets/music_score_editor/images/meter/86.png",
        value: "[M:6/8]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
      },
      {
        url: "assets/music_score_editor/images/meter/89.png",
        value: "[M:9/8]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
      },
      {
        url: "assets/music_score_editor/images/meter/812.png",
        value: "[M:12/8]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
      },
      {
        url: "assets/music_score_editor/images/meter/44C.png",
        value: "[M:C]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
      },
      {
        url: "assets/music_score_editor/images/meter/22C.png",
        value: "[M:C|]",
        class: "cmenu",
        type: "nodeline",
        position: "beforeInsert",
      },
    ],
  },
  linemark: {
    code: "linemark",
    name: "线条记号",
    imgList: [
      {
        url: "assets/music_score_editor/images/slur.png",
        id: "slurbtn",
        value: "(note)",
        class: "slur cmenu",
        title: "连句线",
      },
      {
        url: "assets/music_score_editor/images/jq.png",
        value: "!<(!",
        value2: "!<)!",
        title: "渐强",
        class: "cmenu",
        position: "surround",
      },
      {
        url: "assets/music_score_editor/images/jr.png",
        value: "!>(!",
        value2: "!>)!",
        title: "渐弱",
        class: "cmenu",
        position: "surround",
      },
      {
        url: "assets/music_score_editor/images/cresc.png",
        value: "!cresc.!",
        title: "cresc.",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/dim.png",
        value: "!dim.!",
        title: "dim.",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/voice_slur_above.png",
        id: "voice_slur_pic",
        value: '"(slur"',
        value2: ")slur",
        position: "surround",
        class: "cmenu",
        title: "跨声部连音线",
        type: "note",
      },
      {
        url: "assets/music_score_editor/images/bracketgch.png",
        value: '"[-num-"',
        value2: "num-]",
        position: "surround",
        class: "cmenu",
        title: "标注",
        type: "note",
      },
      {
        url: "assets/music_score_editor/images/bracketgch2.png",
        value: '"_[-num-"',
        value2: "num-]",
        position: "surround",
        class: "cmenu",
        title: "标注",
        type: "note",
      },
      {
        url: "assets/music_score_editor/images/wavegch.png",
        value: '"[~num~"',
        value2: "num~]",
        position: "surround",
        class: "cmenu",
        title: "标注",
        type: "note",
      },
      {
        url: "assets/music_score_editor/images/wavegch2.png",
        value: '"_[~num~"',
        value2: "num~]",
        position: "surround",
        class: "cmenu",
        title: "标注",
        type: "note",
      },
      //			<img src="assets/music_score_editor/images/voice_slur_above.png" title="跨声部连音线在上方" class="cmenu" onclick="setVoiceSlur('source','\'')" />
      //				<img src="assets/music_score_editor/images/voice_slur_below.png" title="跨声部连音线在下方" class="cmenu" onclick="setVoiceSlur('source',',')" />
    ],
  },
  grace: {
    code: "grace",
    name: "倚音",
    imgList: [
      {
        url: "assets/music_score_editor/images/yy1.png",
        value: "{/}",
        class: "cmenu",
        title: "倚音",
        position: "before",
        type: "8",
      },
      {
        url: "assets/music_score_editor/images/dyy.png",
        value: "{/}",
        class: "cmenu",
        title: "倚音",
        position: "before",
        type: "4",
      },
      {
        url: "assets/music_score_editor/images/grace4b.png",
        value: "{}",
        class: "cmenu",
        title: "倚音",
        position: "before",
        type: "4",
      },
      {
        url: "assets/music_score_editor/images/yy2.png",
        value: "{}",
        class: "cmenu",
        title: "倚音",
        position: "before",
        type: "8",
      },
      {
        url: "assets/music_score_editor/images/grace16b.png",
        value: "{}",
        class: "cmenu",
        title: "倚音",
        position: "before",
        type: "16",
      },
      {
        url: "assets/music_score_editor/images/grace32b.png",
        value: "{}",
        class: "cmenu",
        title: "倚音",
        position: "before",
        type: "32",
      },
      {
        url: "assets/music_score_editor/images/grace32a.png",
        value: "{}",
        class: "cmenu",
        title: "倚音",
        position: "after",
        type: "32",
      },
      {
        url: "assets/music_score_editor/images/grace16a.png",
        value: "{}",
        class: "cmenu",
        title: "倚音",
        position: "after",
        type: "16",
      },
      {
        url: "assets/music_score_editor/images/yy6.png",
        value: "{}",
        class: "cmenu",
        title: "倚音",
        position: "after",
        type: "8",
      },
      {
        url: "assets/music_score_editor/images/yy11.png",
        value: "{}",
        class: "cmenu",
        title: "倚音",
        position: "before",
        type: "syy",
      },
      {
        url: "assets/music_score_editor/images/yy22.png",
        value: "{}",
        class: "cmenu",
        title: "倚音",
        position: "after",
        type: "syy",
      },
    ],
  },
  fng: {
    code: "fng",
    name: "指法",
    imgList: [
      {
        url: "assets/music_score_editor/images/b6.png",
        value: "!0!",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/b7.png",
        value: "!1!",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/b8.png",
        value: "!2!",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/b9.png",
        value: "!3!",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/b10.png",
        value: "!4!",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/b11.png",
        value: "!5!",
        class: "cmenu",
        position: "before",
      },
    ],
  },
  gliss: {
    code: "gliss",
    name: "琶音与滑音",
    imgList: [
      {
        url: "assets/music_score_editor/images/pa.png",
        value: "!arpeggio!",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/jpslid.png",
        value: "!jpslid!",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/arp_link.png",
        id: "arp_link",
        value: "arp_link",
        class: "cmenu",
      },
      {
        url: "assets/music_score_editor/images/paup.png",
        value: "!arpeggioup!",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/padown.png",
        value: "!arpeggiodown!",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/gliss.png",
        value: "!~(!note!~)!",
        class: "cmenu",
        type: "gliss",
      },
      {
        url: "assets/music_score_editor/images/fall.png",
        value: "!slidelu!",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/doit.png",
        value: "!slide!",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/plop.png",
        value: "!sliderd!",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/scoop.png",
        value: "!slideru!",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/jphuayin.png",
        value: "!sliderd2!",
        class: "cmenu",
        position: "before",
      },
    ],
  },
  tremolo: {
    code: "tremolo",
    name: "震音",
    imgList: [
      {
        url: "assets/music_score_editor/images/tremolo/1.png",
        value: "!/!",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/tremolo/2.png",
        value: "!//!",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/tremolo/3.png",
        value: "!///!",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/tremolo/5.png",
        value: "!/-!",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/tremolo/6.png",
        value: "!//-!",
        class: "cmenu",
        position: "before",
      },
      {
        url: "assets/music_score_editor/images/tremolo/7.png",
        value: "!///-!",
        class: "cmenu",
        position: "before",
      },
    ],
  },
  linkclef: {
    code: "linkclef",
    name: "连谱号",
    imgList: [
      {
        url: "assets/music_score_editor/images/brace.png",
        value: "brace",
        class: "cmenu",
        type: "linkclef",
      },
      {
        url: "assets/music_score_editor/images/bracket.png",
        value: "bracket",
        class: "cmenu",
        type: "linkclef",
      },
    ],
  },
};

function changeNumberKeypadIndex(i) {
  let index = content_vue.m.numberKeypad.page;
  let key = "staffList";
  if (scoreOpts.musicType === "easy") key = "easyList";
  index += i;
  if (index < 0) {
    index = content_vue.m.numberKeypad[key].length - 1;
  } else if (index > content_vue.m.numberKeypad[key].length - 1) {
    index = 0;
  }
  content_vue.m.numberKeypad.page = index;
}

var content_vue = new Vue({
  el: "#content",
  data: {
    isJxbz: false, // 是否即兴伴奏进来的
    keyboardShow: true, // 是否显示键盘
    toolList: [
      // 工具栏列表
      //			{
      //				code: 'edit',
      //				name: '编辑',
      //				imgList: [
      //					{url: 'assets/music_score_editor/images/back.png', value: 'back', title: '上一步',id:"back",class:"back cmenu"},
      //					{url: 'assets/music_score_editor/images/forward.png', value: 'forward', title: '下一步',id:"forward",class:"forward cmenu"},
      // {url: 'assets/music_score_editor/images/cut.png', value: 'cut', title: '剪切',id:"cut",class:"cut cmenu"},
      ////					{url: 'assets/music_score_editor/images/copy.png', value: 'copy', title: '复制',id:"copy",class:"copy cmenu"},
      ////					{url: 'assets/music_score_editor/images/past.png', value: 'past', title: '粘贴',id:"past",class:"past cmenu"},
      //					{url: 'assets/music_score_editor/images/del.png', value: 'del', title: '删除',id:"del",class:"del cmenu"},
      ////					{url: 'assets/music_score_editor/images/enter.png', value: 'enter', title: '换行',id:"enterLine",class:"enterLine cmenu"}
      //				],
      //				isShow: false
      //			}
    ],
    pulldownToolList: [
      // 工具栏下拉框列表
      //			{name: '常用符号', code: 'common', isShow: true},
      { name: "谱号", code: "clef", isShow: true },
      { name: "连谱号", code: "linkclef", isShow: false },
      { name: "调号", code: "key", isShow: false },
      { name: "拍号", code: "meter", isShow: false },
      { name: "音高", code: "height", isShow: true },
      { name: "时值", code: "dur", isShow: true },
      { name: "小节线", code: "bar", isShow: true },
      // {name: '音符', code: 'note', isShow: false},
      { name: "线条记号", code: "linemark", isShow: true },
      //			{name: '符点', code: 'dot', isShow: true},
      //			{name: '休止符', code: 'rest', isShow: true},
      //			{name: '工具', code: 'ruler', isShow: false},
      { name: "节奏", code: "rhythm", isShow: false },
      { name: "倚音", code: "grace", isShow: false },
      { name: "指法", code: "fng", isShow: false },
      { name: "琶音与滑音", code: "gliss", isShow: false },
      { name: "震音", code: "tremolo", isShow: false },
    ],
    toolsLengthList: toolTemp["length"], // 快捷导航：音符时值设置
    instrumentList: [
      {
        code: 0,
        name: "大钢琴（声学钢琴）",
      },
      {
        code: 1,
        name: "明亮的钢琴",
      },
      {
        code: 2,
        name: "电钢琴",
      },
      {
        code: 3,
        name: "酒吧钢琴",
      },
      {
        code: 4,
        name: "柔和的电钢琴",
      },
      {
        code: 5,
        name: "加合唱效果的电钢琴",
      },
      {
        code: 6,
        name: "羽管键琴（拨弦古钢琴）",
      },
      {
        code: 7,
        name: "科拉维科特琴（击弦古钢琴）",
      },
      {
        code: 8,
        name: "钢片琴",
      },
      {
        code: 10,
        name: "八音盒",
      },
      {
        code: 11,
        name: "颤音琴",
      },
      {
        code: 12,
        name: "马林巴",
      },
      {
        code: 13,
        name: "木琴",
      },
      {
        code: 14,
        name: "管钟",
      },
      {
        code: 15,
        name: "大扬琴",
      },
      {
        code: 16,
        name: "击杆风琴",
      },
      {
        code: 17,
        name: "打击式风琴",
      },
      {
        code: 18,
        name: "摇滚风琴",
      },
      {
        code: 19,
        name: "教堂风琴",
      },
      {
        code: 20,
        name: "簧管风琴",
      },
      {
        code: 21,
        name: "手风琴",
      },
      {
        code: 22,
        name: "口琴",
      },
      {
        code: 23,
        name: "探戈手风琴",
      },
      {
        code: 24,
        name: "尼龙弦吉他",
      },
      {
        code: 25,
        name: "钢弦吉他",
      },
      {
        code: 26,
        name: "爵士电吉他",
      },
      {
        code: 27,
        name: "清音电吉他",
      },
      {
        code: 28,
        name: "闷音电吉他",
      },
      {
        code: 29,
        name: "加驱动效果的电吉他",
      },
      {
        code: 30,
        name: "加失真效果的电吉他",
      },
      {
        code: 31,
        name: "吉他和音",
      },
      {
        code: 32,
        name: "大贝司（声学贝司）",
      },
      {
        code: 33,
        name: "电贝司（指弹）",
      },
      {
        code: 34,
        name: "电贝司（拨片）",
      },
      {
        code: 35,
        name: "无品贝司",
      },
      {
        code: 36,
        name: "贝司掌击1",
      },
      {
        code: 37,
        name: "贝司掌击2",
      },
      {
        code: 38,
        name: "电子合成贝司1",
      },
      {
        code: 39,
        name: "电子合成贝司2",
      },
      {
        code: 40,
        name: "小提琴",
      },
      {
        code: 41,
        name: "中提琴",
      },
      {
        code: 42,
        name: "大提琴",
      },
      {
        code: 43,
        name: "低音大提琴",
      },
      {
        code: 44,
        name: "弦乐群颤音音色",
      },
      {
        code: 45,
        name: "弦乐群拨弦音色",
      },
      {
        code: 46,
        name: "竖琴",
      },
      {
        code: 47,
        name: "定音鼓",
      },
      {
        code: 48,
        name: "弦乐合奏音色1",
      },
      {
        code: 49,
        name: "弦乐合奏音色2",
      },
      {
        code: 50,
        name: "合成弦乐合奏音色1",
      },
      {
        code: 51,
        name: "合成弦乐合奏音色2",
      },
      {
        code: 52,
        name: "人声合唱“啊”",
      },
      {
        code: 53,
        name: "人声“嘟”",
      },
      {
        code: 54,
        name: "合成人声",
      },
      {
        code: 55,
        name: "管弦乐敲击齐奏",
      },
      {
        code: 56,
        name: "小号",
      },
      {
        code: 57,
        name: "长号",
      },
      {
        code: 58,
        name: "大号",
      },
      {
        code: 59,
        name: "加弱音器小号",
      },
      {
        code: 60,
        name: "法国号（圆号）",
      },
      {
        code: 61,
        name: "铜管组（铜管乐器合奏音色）",
      },
      {
        code: 62,
        name: "合成铜管音色1",
      },
      {
        code: 63,
        name: "合成铜管音色2",
      },
      {
        code: 64,
        name: "高音萨克斯风",
      },
      {
        code: 65,
        name: "次中音萨克斯风",
      },
      {
        code: 66,
        name: "中音萨克斯风",
      },
      {
        code: 67,
        name: "低音萨克斯风",
      },
      {
        code: 68,
        name: "双簧管",
      },
      {
        code: 69,
        name: "英国管",
      },
      {
        code: 70,
        name: "巴松（大管）",
      },
      {
        code: 71,
        name: "单簧管（黑管）",
      },
      {
        code: 72,
        name: "短笛",
      },
      {
        code: 73,
        name: "长笛",
      },
      {
        code: 74,
        name: "竖笛",
      },
      {
        code: 75,
        name: "排箫",
      },
      {
        code: 76,
        name: "吹瓶子",
      },
      {
        code: 77,
        name: "日本尺八",
      },
      {
        code: 78,
        name: "口哨声",
      },
      {
        code: 79,
        name: "奥卡雷那",
      },
      {
        code: 80,
        name: "合成主音1（方波）",
      },
      {
        code: 81,
        name: "合成主音2（锯齿波）",
      },
      {
        code: 82,
        name: "合成主音3",
      },
      {
        code: 83,
        name: "合成主音4",
      },
      {
        code: 84,
        name: "合成主音5",
      },
      {
        code: 85,
        name: "合成主音6（人声）",
      },
      {
        code: 86,
        name: "合成主音7（平行五度）",
      },
      {
        code: 87,
        name: "合成主音8（贝司加主音）",
      },
      {
        code: 88,
        name: "合成音色1（新世纪）",
      },
      {
        code: 89,
        name: "合成音色2（温暖）",
      },
      {
        code: 90,
        name: "合成音色3",
      },
      {
        code: 91,
        name: "合成音色4（合唱）",
      },
      {
        code: 92,
        name: "合成音色5",
      },
      {
        code: 93,
        name: "合成音色6（金属声）",
      },
      {
        code: 94,
        name: "合成音色7（光环）",
      },
      {
        code: 95,
        name: "合成音色8",
      },
      {
        code: 96,
        name: "合成效果1雨声",
      },
      {
        code: 97,
        name: "合成效果2音轨",
      },
      {
        code: 98,
        name: "合成效果3水晶",
      },
      {
        code: 99,
        name: "合成效果4大气",
      },
      {
        code: 100,
        name: "合成效果5明亮",
      },
      {
        code: 101,
        name: "合成效果6鬼怪",
      },
      {
        code: 102,
        name: "合成效果7回声",
      },
      {
        code: 103,
        name: "合成效果8科幻",
      },
      {
        code: 104,
        name: "西塔尔（印度）",
      },
      {
        code: 105,
        name: "班卓琴（美洲）",
      },
      {
        code: 106,
        name: "三昧线（日本）",
      },
      {
        code: 107,
        name: "十三弦筝（日本）",
      },
      {
        code: 108,
        name: "卡林巴",
      },
      {
        code: 109,
        name: "风笛",
      },
      {
        code: 110,
        name: "民族提琴",
      },
      {
        code: 111,
        name: "山奈",
      },
      {
        code: 112,
        name: "叮当铃",
      },
      {
        code: 113,
        name: "Agogo",
      },
      {
        code: 114,
        name: "钢鼓",
      },
      {
        code: 115,
        name: "木鱼",
      },
      {
        code: 116,
        name: "日本太鼓",
      },
      {
        code: 117,
        name: "通通鼓",
      },
      {
        code: 118,
        name: "合成鼓",
      },
      {
        code: 120,
        name: "吉他换把杂音",
      },
      {
        code: 121,
        name: "声音效果",
      },
      {
        code: 122,
        name: "海浪声",
      },
      {
        code: 123,
        name: "鸟鸣",
      },
      {
        code: 124,
        name: "电话铃",
      },
      {
        code: 125,
        name: "直升机",
      },
      {
        code: 126,
        name: "鼓掌声",
      },
      {
        code: 127,
        name: "枪声",
      },
      {
        code: 129,
        name: "铃鼓",
      },
      {
        code: 130,
        name: "响板",
      },
      {
        code: 131,
        name: "竹笛",
      },
      {
        code: 132,
        name: "二胡",
      },
      {
        code: 133,
        name: "葫芦丝",
      },
      {
        code: 134,
        name: "一批打击乐",
      },
      {
        code: 135,
        name: "大锣",
      },
      {
        code: 136,
        name: "口琴",
      },
      {
        code: 137,
        name: "古筝",
      },
      {
        code: 138,
        name: "琵琶",
      },
      {
        code: 139,
        name: "唢呐",
      },
      {
        code: 140,
        name: "京剧打击乐",
      },
      {
        code: 141,
        name: "民族打击乐",
      },
      {
        code: 143,
        name: "合成人声1",
      },
      {
        code: 144,
        name: "合成人声2",
      },
      {
        code: 145,
        name: "合成人声3",
      },
      {
        code: 146,
        name: "合成人声4",
      },
      {
        code: 147,
        name: "合成人声5",
      },
      {
        code: 148,
        name: "合成人声6",
      },
      {
        code: 222,
        name: "人声",
      },
      {
        code: 201,
        name: "铙",
      },
      {
        code: 202,
        name: "小军鼓",
      },
      {
        code: 1000,
        name: "手铃", //替换203
      },
      {
        code: 1003,
        name: "钟琴", //替换9
      },
      {
        code: 5018,
        name: "月琴",
      },
      {
        code: 5019,
        name: "柳琴",
      },
      {
        code: 1004,
        name: "沙锤", //新增
      },
      {
        code: 1007,
        name: "摇铃", //新增
      },
      {
        code: 1008,
        name: "棒铃", //新增
      },
      {
        code: 1010,
        name: "双响筒", //新增
      },
      {
        code: 1011,
        name: "响板", //新增
      },
      {
        code: 1012,
        name: "响棒", //新增
      },
      {
        code: 1014,
        name: "蛙鸣筒", //新增
      },
      {
        code: 1018,
        name: "三角铁", //128
      },
      {
        code: 1020,
        name: "碰铃",
      },
      {
        code: 1021,
        name: "跺脚",
      },
      {
        code: 1022,
        name: "拍肩",
      },
      {
        code: 1023,
        name: "拍腿",
      },
      {
        code: 1024,
        name: "拍手",
      },
      {
        code: 1025,
        name: "响指",
      },
      {
        code: 1026,
        name: "手串铃",
      },
      {
        code: 5005,
        name: "中虎音锣",
      },
      {
        code: 5007,
        name: "钹", //替换119
      },
      {
        code: 5027,
        name: "小鼓",
      },
      {
        code: 5030,
        name: "小锣",
      },
      {
        code: 5037,
        name: "镲",
      },
      {
        code: 5038,
        name: "羌笛",
      },
      {
        code: 5039,
        name: "口弦",
      },
      {
        code: 2009,
        name: "小军鼓",
      },
      {
        code: 2013,
        name: "非洲鼓",
      },
      {
        code: 5040,
        name: "萧",
      },
      {
        code: 5041,
        name: "大锣鼓",
      },
      {
        code: 5042,
        name: "板胡",
      },
    ],
    pytbOption: 0, // 谱音同步选项 0: 谱音同步 1: 只播图像 2: 只播声音
    instrumentOption: 0, // 乐器选项
    playingInstrumentOption: 0, //播放时的乐器
    isTbjpsz: true, // 是否同步键盘时值
    metrocheck: false, // 是否打开节拍器
    headerInBottom: false, // 顶部按钮放在下面
    instrumentKey: "", // 乐器搜索关键字
    voicePart: {}, // 声部插件
    abcSel: {}, // abc框选对象
    musicFormObj: {}, // 曲式绘制对象
    showMusicForm: false, // 是否显示曲式图
    menuList: typeof menuList == "undefined" ? [] : menuList, // 导航菜单
    menuActive: "", // 导航菜单选中状态
    editorShow: false, // 代码编辑器
    symbolPanelShow: true, // 符号面板
    attrPanelShow: true, // 属性面板
    attrPanelIndex: 0, // 属性面板-》tab页索引
    usuallyFuncList: [], // 常用功能列表
    musicForm: {
      // 曲式分析数据
      id: "", // id
      pid: "", // 父id
      fieldno: "", // 编号
      orderby: "", // 排序号
      fieldname: "", // 段落名称
      bgcolor: "", // 块的背景图
      fielddesc: "", // 段落内容
      starttime: "", // 开始时间
      endtime: "", // 结束时间
      startNodeIndex: "", // 小节线起始索引
      endNodeIndex: "", // 小节线终止索引
      groupid: "",
      //width: '',
      //left: ''
    },
    cmd: "A", // musicform cmd
    inpdisable: false, // 编辑框是否禁用
    isExe: false, // 是否在exe中打开
    isAndroid: false, // 是否在安卓中打开
    fileUpload: getFileData(),
    isShowHelp: false,

    // ———————————————————————————————————————— 分割线 __data ————————————————————————————————————————
    m: {
      id: '',
      token: '',
      reqs: 0,
      scoreOpts,
      editor: {
        s: 0,
        isEsc: false,
        type: '',
        val: '',
        lyricIndex: 0,
        style: {}
      },
      alertMsg: "",
      isInsertMode: false,
      export: {
        show: false,
        list: [
          // { txt: "音频", checked: false, disabled: true },
          { txt: "图片", checked: true },
          { txt: "PDF", checked: false },
          // { txt: "MID", checked: false, disabled: true },
          // { txt: "XML", checked: false, disabled: true },
        ],
      },
      key: {
        show: false,
        val: "C",
        previewV: "C",
        list: [
          { txt: "C大调", val: "C", valueSelector: "c" },
          { txt: "G大调", val: "G", valueSelector: "g" },
          { txt: "D大调", val: "D", valueSelector: "d" },
          { txt: "A大调", val: "A", valueSelector: "a" },
          { txt: "E大调", val: "E", valueSelector: "e" },
          { txt: "B大调", val: "B", valueSelector: "b," },
          { txt: "♯F大调", val: "#F", valueSelector: "^f" },
          { txt: "♯C大调", val: "#C", valueSelector: "^c" },
          { txt: "F大调", val: "F", valueSelector: "f" },
          { txt: "♭B大调", val: "Bb", valueSelector: "_b," },
          { txt: "♭E大调", val: "Eb", valueSelector: "_e" },
          { txt: "♭A大调", val: "Ab", valueSelector: "_a," },
          { txt: "♭D大调", val: "Db", valueSelector: "_d" },
          { txt: "♭G大调", val: "Gb", valueSelector: "_g" },
          { txt: "♭C大调", val: "Cb", valueSelector: "_c" },
        ],
      },
      // scoreOpts,
      lyric: {
        style: {
          color: "#333",
          fontWeight: "normal",
          fontStyle: "normal",
          fontSize: "14px",
          fontFamily: "inherit",
        },
        fontSizeList: [
          "10px",
          "12px",
          "14px",
          "16px",
          "18px",
          "20px",
          "24px",
        ].map((v) => ({ txt: v, val: v })),
        fontFamilyList: [
          { txt: "默认", val: "inherit", fontFamily:"inherit", fontWeight:"" },
          { txt: "黑体", val: "SimHei", fontFamily:"simHei" , fontWeight:"550" },
          { txt: "宋体", val: "SimSun", fontFamily:"song", fontWeight:""  },
          { txt: "仿宋", val: "FangSong", fontFamily:"fangsong", fontWeight:""  },
          { txt: "楷体", val: "KaiTi", fontFamily:"kai", fontWeight:""  },
          { txt: "微软雅黑", val: "Microsoft YaHei", fontFamily:"sans-serif", fontWeight:"550" },
        ],
      },
      selectNote: null,
      selectBar: null,
      menuIndex: -1,
      menuList: [
        {
          txt: "文件",
          children: [
            {
              txt: "新建",
              fn: () =>
                (content_vue.m.newScore.musicType.show = true) |
                (isNewTab = true),
            },
            {
              txt: "保存",
              fn: () => saveScore(),
            },
            {
              txt: "另存为谱例",
              fn: () => {
                content_vue.m.saveToScore.isShow = !content_vue.m.saveToScore.isShow
              },
            },
            {
              txt: "打开谱例",
              fn: () => (content_vue.m.myScore.isShow = true),
            },
            {
              txt: "导入",
              fn: () => $("#input-file").val("") && $("#input-file").click(),
            },
            {
              txt: "导出",
              fn: () => {
                content_vue.m.export.show = true;
              },
            },
          ],
        },
        { txt: "文本" },
        { txt: "工具" },
        { txt: "视图" },
      ],
      myScore: {
        list: [],
        totalPage: 1,
        isLoading: false,
        index: -1,
        isShow: false,
        query: {
          page: 1,
          page_size: 12,
          fu_name: "",
          fu_music_type: "",
        },
      },
      saveToScore: {
        isShow: false,
        title: '',
        repeatList: [],
        isFoucs: false
      },
      isMusicNoteShow: false,
      addBar: {
        show: false,
        before: 1,
        after: 1,
      },
      numberKeypad: {
        isShow: true,
        isMove: false,
        moveStart: { x: 0, y: 0 },
        position: {
          x: 0,
          y: 0,
        },
        page: 0,
        staffList: [
          [
            {
              title: "箭头",
              fn: switchPrachEditor,
              className: "k-5-1",
              isSelect: false,
              updateIsSelect() {
                this.isSelect = draw_editor;
              },
            },
            {
              url: "assets/music_score_editor/images/cs.png",
              isKeepSelect: true,
              className: "k-5-2",
              title: "重升",
              selector: '.pitchbtn[value="^^"]',
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/cj.png",
              isKeepSelect: true,
              className: "k-5-3",
              title: "重降",
              selector: '.pitchbtn[value="__"]',
              isSelect: false,
            },
            {},
            {
              url: "assets/music_score_editor/images/yingao3.png",
              isKeepSelect: true,
              className: "k-5-5",
              title: "还原",
              selector: '.pitchbtn[value="="]',
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/yingao1.png",
              isKeepSelect: true,
              className: "k-5-6",
              title: "升号",
              selector: '.pitchbtn[value="^"]',
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/yingao2.png",
              className: "k-5-7",
              isKeepSelect: true,
              title: "降号",
              selector: '.pitchbtn[value="_"]',
              isSelect: false,
            },
            {
              url: "",
              title: "上一页",
              className: "k-5-8",
              fn: () => changeNumberKeypadIndex(-1),
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/note_3.png",
              title: "四分音符",
              className: "k-5-9",
              selector: ".operator_sc.jp_note[keycode=101]",
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/note_2.png",
              className: "k-5-10",
              title: "半音符",
              selector: ".operator_sc.jp_note[keycode=102]",
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/note_1.png",
              title: "全音符",
              className: "k-5-11",
              selector: ".operator_sc.jp_note[keycode=103]",
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/note_6.png",
              title: "32分音符",
              className: "k-5-12",
              selector: ".operator_sc.jp_note[keycode=98]",
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/note_5.png",
              title: "16分音符",
              className: "k-5-13",
              selector: ".operator_sc.jp_note[keycode=99]",
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/note_4.png",
              title: "八分音符",
              className: "k-5-14",
              selector: ".operator_sc.jp_note[keycode=100]",
              isSelect: false,
            },
            {
              url: "",
              title: "下一页",
              className: "k-5-15",
              fn: () => changeNumberKeypadIndex(1),
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/rest.png",
              isKeepSelect: true,
              className: "k-5-16",
              title: "休止符",
              // selector: ".reststatus",
              fn: () => updateNextNote('z', -1),
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/dot3.png",
              isKeepSelect: true,
              className: "k-5-17",
              title: "附点",
              selector: '.dotstatus[value="3/"]',
              isSelect: false,
            },
          ],
          [
            {
              title: "箭头",
              className: "k-5-18",
              fn: switchPrachEditor,
              isSelect: false,
              updateIsSelect() {
                this.isSelect = draw_editor;
              },
            },
            {
              url: "assets/music_score_editor/images/b5.png",
              className: "k-5-19",
              isKeepSelect: true,
              title: "延长",
              fn: () => {
                if (!content_vue.checkIsSelectNote()) return;
                const { head, tail, txt } =  getSelectAbcCodeInfo()
                $('#source').val(`${head.replace(/\!fermata\!$/, '')}!fermata!${txt}${tail}`)
                abc_change()
              },
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/slur.png",
              isKeepSelect: true,
              className: "k-5-20",
              title: "连线",
              fn: lineTo,
              isSelect: false,
            },
            {},
            {
              url: "assets/music_score_editor/images/other3.png",
              className: "k-5-22",
              isKeepSelect: true,
              title: "重音",
              fn: () => {
                if (!content_vue.checkIsSelectNote()) return;
                const { head, tail, txt } =  getSelectAbcCodeInfo()
                keepSelectNote(() => {
                  $('#source').val(`${head.replace(/\!>\!$/, '')}!>!${txt}${tail}`)
                  abc_change()
                })
              },
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/other4.png",
              className: "k-5-23",
              isKeepSelect: true,
              title: "跳音",
              fn: () => {
                if (!content_vue.checkIsSelectNote()) return;
                const { head, tail, txt } =  getSelectAbcCodeInfo()
                keepSelectNote(() => {
                  $('#source').val(`${head.replace(/\.$/, '')}.${txt}${tail}`)
                  abc_change()
                })
              },
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/other5.png",
              className: "k-5-24",
              isKeepSelect: true,
              title: "保持音",
              fn: () => {
                if (!content_vue.checkIsSelectNote()) return;
                const { head, tail, txt } =  getSelectAbcCodeInfo()
                keepSelectNote(() => {
                  $('#source').val(`${head.replace(/\!tenuto\!$/, '')}!tenuto!${txt}${tail}`)
                  abc_change()
                })
              },
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/note_1.png",
              className: "k-5-25",
              title: "上一页",
              fn: () => changeNumberKeypadIndex(-1),
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/yy2.png",
              className: "k-5-26",
              isKeepSelect: true,
              title: "倚音",
              fn: () => changeAbc((txt) => `{b}${txt}`),
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/yy1.png",
              isKeepSelect: true,
              className: "k-5-27",
              title: "单短倚音",
              fn: () => changeAbc((txt) => `{/b}${txt}`),
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/grace16b.png",
              className: "k-5-28",
              isKeepSelect: true,
              title: "短倚音",
              fn: () => changeAbc((txt) => `{gg}${txt}`),
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/pa.png",
              className: "k-5-29",
              isKeepSelect: true,
              title: "琶音",
              fn: () => changeAbc((txt) => `!arpeggio!${txt}`),
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/padown.png",
              className: "k-5-30",
              isKeepSelect: true,
              title: "琶音向下",
              fn: () => changeAbc((txt) => `!arpeggiodown!${txt}`),
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/paup.png",
              className: "k-5-31",
              isKeepSelect: true,
              title: "琶音向上",
              fn: () => changeAbc((txt) => `!arpeggioup!${txt}`),
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/note_1.png",
              className: "k-5-32",
              title: "下一页",
              fn: () => changeNumberKeypadIndex(1),
              isSelect: false,
            },
            {},
            {
              className: "k-5-34",
              url: "assets/music_score_editor/images/dot4.png",
              isKeepSelect: true,
              title: "复附点",
              selector: '.dotstatus[value="7//"]',
              isSelect: false,
            },
          ],
          [
            {
              className: "k-5-35",
              title: "箭头",
              fn: switchPrachEditor,
              isSelect: false,
              updateIsSelect() {
                this.isSelect = draw_editor;
              },
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {
              title: "上一页",
              className: "k-5-42",
              fn: () => changeNumberKeypadIndex(-1),
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/tremolo/1.png",
              isKeepSelect: true,
              className: "k-5-43",
              title: "颤音",
              fn: () => changeAbc((txt) => `!/!${txt}`),
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/tremolo/2.png",
              className: "k-5-44",
              isKeepSelect: true,
              title: "颤音",
              fn: () => changeAbc((txt) => `!//!${txt}`),
              isSelect: false,
            },
            {
              url: "assets/music_score_editor/images/tremolo/3.png",
              className: "k-5-45",
              isKeepSelect: true,
              title: "颤音",
              fn: () => changeAbc((txt) => `!///!${txt}`),
              isSelect: false,
            },
            {
              isKeepSelect: true,
              title: "向右",
              className: "k-5-46",
              fn: () => changeGroupNote("right", "merge"),
              isSelect: false,
            },
            {
              isKeepSelect: true,
              title: "连接符尾",
              className: "k-5-47",
              fn: () => changeGroupNote("left", "merge"),
              isSelect: false,
            },
            {
              isKeepSelect: true,
              className: "k-5-48",
              title: "向左",
              fn: () => changeGroupNote("all", "merge"),
              isSelect: false,
            },
            {
              isKeepSelect: true,
              className: "k-5-49",
              title: "下一页",
              fn: () => changeNumberKeypadIndex(1),
              isSelect: false,
            },
            {},
            {
              isKeepSelect: true,
              className: "k-5-51",
              title: "单拆音符",
              fn: () => changeGroupNote("all", "split"),
              isSelect: false,
            },
          ],
        ],
        easyList: [
          [
            {
              // className: "k-e-1",
              // title: "箭头",
              // fn: switchPrachEditor,
              // isSelect: false,
              // updateIsSelect() {
              //   this.isSelect = draw_editor;
              // },
            },
            {
              className: "k-e-2",
              url: "assets/music_score_editor/images/rest.png",
              title: "低8度",
              fn: () => upDownKeyWord(-12),
              isSelect: false,
            },
            {
              className: "k-e-3",
              url: "assets/music_score_editor/images/rest.png",
              title: "高8度",
              fn: () => upDownKeyWord(12),
              isSelect: false,
            },
            {},
            {
              className: "k-e-5",
              url: "assets/music_score_editor/images/dot3.png",
              isKeepSelect: true,
              title: "附点",
              selector: '.dotstatus[value="3/"]',
              isSelect: false,
            },
            {
              className: "k-e-6",
              url: "assets/music_score_editor/images/dot4.png",
              isKeepSelect: true,
              title: "复附点",
              selector: '.dotstatus[value="7//"]',
              isSelect: false,
            },
            {},
            {
              url: "",
              className: "k-e-8",
              title: "上一页",
              fn: () => changeNumberKeypadIndex(-1),
              isSelect: false,
            },
            {
              className: "k-e-9",
              url: "assets/music_score_editor/images/note_2_j.png",
              title: "2拍",
              selector: ".operator_sc.jp_note[keycode=102]",
              isSelect: false,
            },
            {
              className: "k-e-10",
              url: "assets/music_score_editor/images/note_2_j.png",
              title: "3拍",
              fn: () =>
                $(".operator_sc.jp_note[keycode=102]").click() |
                $('.dotstatus[value="3/"]').click(),
              isSelect: false,
            },
            {
              className: "k-e-11",
              url: "assets/music_score_editor/images/note_1_j.png",
              title: "4拍",
              selector: ".operator_sc.jp_note[keycode=103]",
              isSelect: false,
            },
            {
              className: "k-e-12",
              url: "assets/music_score_editor/images/note_6_j.png",
              title: "32分音符",
              selector: ".operator_sc.jp_note[keycode=98]",
              isSelect: false,
            },
            {
              className: "k-e-13",
              url: "assets/music_score_editor/images/note_5_j.png",
              title: "16分音符",
              selector: ".operator_sc.jp_note[keycode=99]",
              isSelect: false,
            },
            {
              className: "k-e-14",
              url: "assets/music_score_editor/images/note_4_j.png",
              title: "八分音符",
              selector: ".operator_sc.jp_note[keycode=100]",
              isSelect: false,
            },
            {
              url: "",
              className: "k-e-15",
              title: "下一页",
              fn: () => changeNumberKeypadIndex(1),
              isSelect: false,
            },
            {
              className: "k-e-16",
              url: "assets/music_score_editor/images/rest.png",
              title: "休止符",
              // selector: ".reststatus",
              fn: () => updateNextNote('z', -1),
              isSelect: false,
            },
            {
              className: "k-e-17",
              url: "assets/music_score_editor/images/note_3_j.png",
              title: "四分音符",
              selector: ".operator_sc.jp_note[keycode=101]",
              isSelect: false,
            },
          ],
          [
            {
              // className: "k-e-18",
              // title: "箭头",
              // fn: switchPrachEditor,
              // isSelect: false,
              // updateIsSelect() {
              //   this.isSelect = draw_editor;
              // },
            },
            {
              className: "k-e-19",
              url: "assets/music_score_editor/images/other3.png",
              isKeepSelect: true,
              title: "重音记号",
              fn: () => changeAbc((txt) => `!>!${txt}`),
              isSelect: false,
            },
            {
              className: "k-e-20",
              url: "assets/music_score_editor/images/other4.png",
              isKeepSelect: true,
              title: "跳音",
              fn: () => changeAbc((txt) => `.${txt}`),
              isSelect: false,
            },
            {
              className: "k-e-21",
              url: "assets/music_score_editor/images/other5.png",
              isKeepSelect: true,
              title: "保持音",
              fn: () => changeAbc((txt) => `!emb!${txt}`),
              isSelect: false,
            },
            {
              className: "k-e-22",
              url: "assets/music_score_editor/images/yingao3.png",
              isKeepSelect: true,
              title: "还原",
              selector: '.pitchbtn[value="="]',
              isSelect: false,
            },
            {
              className: "k-e-23",
              url: "assets/music_score_editor/images/yingao1.png",
              isKeepSelect: true,
              title: "升号",
              selector: '.pitchbtn[value="^"]',
              isSelect: false,
            },
            {
              className: "k-e-24",
              url: "assets/music_score_editor/images/yingao2.png",
              isKeepSelect: true,
              title: "降号",
              selector: '.pitchbtn[value="_"]',
              isSelect: false,
            },
            {
              className: "k-e-25",
              url: "",
              title: "上一页",
              fn: () => changeNumberKeypadIndex(-1),
              isSelect: false,
            },
            {
              className: "k-e-26",
              url: "assets/music_score_editor/images/yy2.png",
              isKeepSelect: true,
              title: "倚音",
              fn: () => changeAbc((txt) => `{b}${txt}`),
              isSelect: false,
            },
            {
              className: "k-e-27",
              url: "assets/music_score_editor/images/cs.png",
              isKeepSelect: true,
              title: "重升",
              selector: '.pitchbtn[value="^^"]',
              isSelect: false,
            },
            {
              className: "k-e-28",
              url: "assets/music_score_editor/images/cj.png",
              isKeepSelect: true,
              title: "重降",
              selector: '.pitchbtn[value="__"]',
              isSelect: false,
            },
            {
              className: "k-e-29",
              url: "assets/music_score_editor/images/yy1.png",
              isKeepSelect: true,
              title: "倚音",
              fn: () => changeAbc((txt) => `{gg}${txt}`),
              isSelect: false,
            },
            {
              className: "k-e-30",
              url: "assets/music_score_editor/images/slur.png",
              isKeepSelect: true,
              title: "连线",
              fn: lineTo,
              isSelect: false,
            },
            {
              className: "k-e-31",
              url: "assets/music_score_editor/images/b5.png",
              isKeepSelect: true,
              title: "延长记号",
              fn: () => changeAbc((txt) => `!fermata!${txt}`),
              isSelect: false,
            },
            {
              className: "k-e-32",
              url: "",
              title: "下一页",
              fn: () => changeNumberKeypadIndex(1),
              isSelect: false,
            },
            {},
            {},
          ],
        ],
      },
      panzoom: {
        scale: 90,
      },
      ctxMenu: {
        addBarShow: false,
        isShow: false,
        x: 0,
        y: 0,
        isSelectNote: false,
        isSelectBar: false,
        copyNoteInfo: user.copyNoteInfo,
        copyBarInfo: copyNodeInfo,
      },
      newScore: {
        musicType: {
          show: false,
          list: [
            { title: "简谱", val: "easy", img: "assets/music_score_editor/img/jianpu.png" },
            { title: "大谱表", val: "big", img: "assets/music_score_editor/img/da_pu_biao.png" },
            { title: "高音谱表", val: "treble", img: "assets/music_score_editor/img/gao_yin.png" },
            { title: "低音谱表", val: "bass", img: "assets/music_score_editor/img/di_yin.png" },
            {
              title: "合唱四声部",
              val: "four",
              img: "assets/music_score_editor/img/he_chang.png",
            },
          ],
        },
        scoreOptsShow: false,
        keySignType: "up",
        keySignUpList: [
          { title: "C大调", img: "assets/music_score_editor/img/C.png", val: "C" },
          { title: "G大调", img: "assets/music_score_editor/img/G.png", val: "G" },
          { title: "D大调", img: "assets/music_score_editor/img/D.png", val: "D" },
          { title: "A大调", img: "assets/music_score_editor/img/A.png", val: "A" },
          { title: "E大调", img: "assets/music_score_editor/img/E.png", val: "E" },
          { title: "B大调", img: "assets/music_score_editor/img/B.png", val: "B" },
          { title: "♯F大调", img: "assets/music_score_editor/img/-F.png", val: "F#", isUp: true },
          { title: "♯C大调", img: "assets/music_score_editor/img/-C.png", val: "C#", isUp: true },
        ],
        keySignDownList: [
          { title: "C大调", img: "assets/music_score_editor/img/C.png", val: "C" },
          { title: "F大调", img: "assets/music_score_editor/img/F.png", val: "F" },
          { title: "♭B大调", img: "assets/music_score_editor/img/bB.png", val: "Bb", isDown: true },
          { title: "♭E大调", img: "assets/music_score_editor/img/bE.png", val: "Eb", isDown: true },
          { title: "♭A大调", img: "assets/music_score_editor/img/bA.png", val: "Ab", isDown: true },
          { title: "♭D大调", img: "assets/music_score_editor/img/bD.png", val: "Db", isDown: true },
          { title: "♭G大调", img: "assets/music_score_editor/img/bG.png", val: "Gb", isDown: true },
          { title: "♭C大调", img: "assets/music_score_editor/img/bC.png", val: "Cb", isDown: true },
        ],
        keySignEasyList: [
          { txt: "C", val: "C" },
          { txt: "G", val: "G" },
          { txt: "D", val: "D" },
          { txt: "A", val: "A" },
          { txt: "E", val: "E" },
          { txt: "B", val: "B" },
          { txt: "♯F", val: "F#" },
          { txt: "♯C", val: "C#" },
          { txt: "F", val: "F" },
          { txt: "♭B", val: "Bb" },
          { txt: "♭E", val: "Eb" },
          { txt: "♭A", val: "Ab" },
          { txt: "♭D", val: "Db" },
          { txt: "♭G", val: "Gb" },
          { txt: "♭C", val: "Cb" },
        ],
        isBeatNoteListShow: false,
        beatNoteList: new Array(12)
          .fill(0)
          .map((v, i) => ({ txt: i + 1 + "", val: i + 1 + "" })),
        isBeatNoteList2Show: false,
        beatNoteList2: ["2", "4", "8", "16"].map((i) => ({ txt: i, val: i })),
        speedNoteList: [
          { val: "4/4", img: "assets/music_score_editor/img/note1.png" },
          { val: "2/4", img: "assets/music_score_editor/img/note2.png" },
          { val: "1/4", img: "assets/music_score_editor/img/note4.png" },
          { val: "1/8", img: "assets/music_score_editor/img/note8.png" },
          { val: "1/16", img: "assets/music_score_editor/img/note16.png" },
        ],
        speedTxtList: speedTxtList.map((item) => ({
          val: item.txt,
          txt: item.txt,
        })),
        scoreOpts: {
          title: "",
          subTitle: "",
          compose: "",
          lyricist: "",
          isWeak: false,
          weakBarTop: "1",
          weakBarBot: "4",
          keySign: "C",
          beatNote1: "4",
          beatNote2: "4",
          beatType: "custom",
          musicType: "easy",
          speedType: "txt",
          speedText: "Moderato",
          speedNote: "1/4",
          speedNum: "88",
          rows: "2",
          rowBars: "4",
        },
        previewUrl: "assets/music_score_editor/preview.html?v=1.0.1",
      },
      toolList: [
        {
          canClick: false,
          code: "clef",
          name: "谱号",
          cols: 4,
          isMove: !0,
          imgList: [
            {
              url: "assets/music_score_editor/img/notepanel/clef (1).png",
              value: "[K:treble]",
              title: "高音谱号",
              class: "cmenu",
              type: "all",
              position: "before",
            },
            {
              url: "assets/music_score_editor/img/notepanel/clef (2).png",
              value: "[K:bass]",
              title: "低音谱号",
              class: "cmenu",
              type: "all",
              position: "before",
            },
            {
              url: "assets/music_score_editor/img/notepanel/clef (3).png",
              value: "[K:alto]",
              title: "中音谱号",
              class: "cmenu",
              type: "all",
              position: "before",
            },
            {
              url: "assets/music_score_editor/img/notepanel/clef (4).png",
              value: "[K:tenor]",
              title: "次中音谱号",
              class: "cmenu",
              type: "all",
              position: "before",
            },
          ],
          isExpand: !1,
          isShow: !0,
        },
        {
          canClick: false,
          code: "key",
          name: "调号",
          cols: 3,
          imgList: [
            {
              url: "assets/music_score_editor/img/notepanel/key (1).png",
              value: "[K:C]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              title: "C大调",
            },
            {
              url: "assets/music_score_editor/img/notepanel/key (2).png",
              value: "[K:G]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              title: "G大调",
            },
            {
              url: "assets/music_score_editor/img/notepanel/key (3).png",
              value: "[K:D]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              title: "D大调",
            },
            {
              url: "assets/music_score_editor/img/notepanel/key (4).png",
              value: "[K:A]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              title: "A大调",
            },
            {
              url: "assets/music_score_editor/img/notepanel/key (5).png",
              value: "[K:E]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              title: "E大调",
            },
            {
              url: "assets/music_score_editor/img/notepanel/key (6).png",
              value: "[K:B]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              title: "B大调",
            },
            {
              url: "assets/music_score_editor/img/notepanel/key (7).png",
              value: "[K:F#]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              title: "♯F大调",
            },
            {
              url: "assets/music_score_editor/img/notepanel/key (8).png",
              value: "[K:C#]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              title: "♯C大调",
            },
            {
              url: "assets/music_score_editor/img/notepanel/key (9).png",
              value: "[K:F]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              title: "F大调",
            },
            {
              url: "assets/music_score_editor/img/notepanel/key (10).png",
              value: "[K:Bb]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              title: "♭B大调",
            },
            {
              url: "assets/music_score_editor/img/notepanel/key (11).png",
              value: "[K:Eb]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              title: "♭E大调",
            },
            {
              url: "assets/music_score_editor/img/notepanel/key (12).png",
              value: "[K:Ab]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              title: "♭A大调",
            },
            {
              url: "assets/music_score_editor/img/notepanel/key (13).png",
              value: "[K:Db]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              title: "♭D大调",
            },
            {
              url: "assets/music_score_editor/img/notepanel/key (14).png",
              value: "[K:Gb]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              title: "♭G大调",
            },
            {
              url: "assets/music_score_editor/img/notepanel/key (15).png",
              value: "[K:Cb]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              title: "♭C大调",
            },
          ],
          isShow: !1,
          isExpand: !1,
        },
        {
          canClick: false,
          code: "meter",
          cols: 4,
          name: "拍号",
          imgList: [
            {
              url: "assets/music_score_editor/img/notepanel/meter (1).png",
              value: "[M:2/4]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
            },
            {
              url: "assets/music_score_editor/img/notepanel/meter (2).png",
              value: "[M:3/4]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
            },
            {
              url: "assets/music_score_editor/img/notepanel/meter (3).png",
              value: "[M:4/4]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
            },
            {
              url: "assets/music_score_editor/img/notepanel/meter (4).png",
              value: "[M:3/8]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
            },
            {
              url: "assets/music_score_editor/img/notepanel/meter (5).png",
              value: "[M:6/8]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
            },
            {
              url: "assets/music_score_editor/img/notepanel/meter (6).png",
              value: "[M:9/8]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
            },
            {
              url: "assets/music_score_editor/img/notepanel/meter (7).png",
              value: "[M:C]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
            },
            {
              url: "assets/music_score_editor/img/notepanel/meter (8).png",
              value: "[M:C|]",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
            },
          ],
          isShow: !1,
          isExpand: !1,
        },
        {
          canClick: true,
          name: "临时记号",
          code: "tempMark",
          cols: 4,
          imgList: [
            {
              url: "assets/music_score_editor/img/notepanel/tempMark (1).png",
              value: "^",
              title: "升号",
              class: "cmenu",
              position: "before",
              fn: () => {
                keepSelectNote(() => $('.pitchbtn[value="^"]').click())
              }
            },
            {
              url: "assets/music_score_editor/img/notepanel/tempMark (2).png",
              value: "_",
              title: "降号",
              class: "cmenu",
              position: "before",
              fn: () => {
                keepSelectNote(() => $('.pitchbtn[value="_"]').click())
              }
            },
            {
              url: "assets/music_score_editor/img/notepanel/tempMark (3).png",
              value: "=",
              title: "还原",
              class: "cmenu",
              position: "before",
              fn: () => {
                keepSelectNote(() => $('.pitchbtn[value="="]').click())
              }
            },
            {
              url: "assets/music_score_editor/img/notepanel/tempMark (4).png",
              value: "^^",
              title: "重升",
              class: "cmenu",
              position: "before",
              fn: () => {
                keepSelectNote(() => $('.pitchbtn[value="^^"]').click())
              }
            },
            {
              url: "assets/music_score_editor/img/notepanel/tempMark (5).png",
              value: "__",
              title: "重降",
              class: "cmenu",
              position: "before",
              fn: () => {
                keepSelectNote(() => $('.pitchbtn[value="__"]').click())
              }
            },
            {
              url: "assets/music_score_editor/img/notepanel/tempMark (5).png",
              class: "opacity-0 pointer-events-none h-full",
            },
            {
              url: "assets/music_score_editor/img/notepanel/tempMark (5).png",
              class: "opacity-0 pointer-events-none h-full",
            },
            {
              url: "assets/music_score_editor/img/notepanel/tempMark (5).png",
              class: "opacity-0 pointer-events-none h-full",
            },
          ],
        },
        {
          canClick: true,
          code: "dur",
          name: "连音",
          cols: 3,
          imgList: [
            {
              url: "assets/music_score_editor/img/notepanel/dur (1).png",
              value: "(2",
              title: "2连音",
              class: "cmenu",
              position: "before",
              fn: () => liaison("(2"),
            },
            {
              url: "assets/music_score_editor/img/notepanel/dur (2).png",
              value: "(3",
              title: "3连音",
              class: "cmenu",
              position: "before",
              fn: () => liaison("(3"),
            },
            {
              url: "assets/music_score_editor/img/notepanel/dur (3).png",
              value: "(4",
              title: "4连音",
              class: "cmenu",
              position: "before",
              fn: () => liaison("(4"),
            },
            {
              url: "assets/music_score_editor/img/notepanel/dur (4).png",
              value: "(5",
              title: "5连音",
              class: "cmenu",
              position: "before",
              fn: () => liaison("(5"),
            },
            {
              url: "assets/music_score_editor/img/notepanel/dur (5).png",
              value: "(6",
              title: "6连音",
              class: "cmenu",
              position: "before",
              fn: () => liaison("(6"),
            },
            {
              url: "assets/music_score_editor/img/notepanel/dur (6).png",
              value: "(7",
              title: "7连音",
              class: "cmenu",
              position: "before",
              fn: () => liaison("(7"),
            },
          ],
          isExpand: !1,
          isShow: !1,
        },
        {
          canClick: false,
          code: "bar",
          name: "小节线",
          cols: 4,
          imgList: [
            {
              url: "assets/music_score_editor/img/notepanel/bar (1).png",
              value: "|:",
              title: "反复记号",
              class: "cmenu",
              type: "nodeline",
              position: "preReplace",
            },
            {
              url: "assets/music_score_editor/img/notepanel/bar (2).png",
              value: ":|",
              title: "反复记号",
              class: "cmenu",
              type: "nodeline",
              position: "afterReplace",
            },
            {
              url: "assets/music_score_editor/img/notepanel/bar (3).png",
              value: "|]",
              title: "结束线",
              class: "cmenu",
              type: "nodeline",
              position: "afterReplace",
            },
            {
              url: "assets/music_score_editor/img/notepanel/bar (4).png",
              value: "|",
              title: "小节线",
              class: "cmenu opacity-0 pointer-events-none",
              type: "nodeline",
              position: "afterReplace",
            },
          ],
          isExpand: !1,
          isShow: !0,
        },
        {
          canClick: true,
          code: "linemark",
          name: "线条记号",
          cols: 2,
          imgList: [
            {
              url: "assets/music_score_editor/img/notepanel/linemark (1).png",
              value: "!8va(!",
              value2: "!8va)!",
              title: "高八度记号",
              class: "cmenu",
              position: "surround",
            },
            {
              url: "assets/music_score_editor/img/notepanel/linemark (2).png",
              value: "!8vb(!",
              value2: "!8vb)!",
              title: "低八度记号",
              class: "cmenu",
              position: "surround",
            },
            {
              url: "assets/music_score_editor/img/notepanel/linemark (3).png",
              value: "!ped!",
              title: "踩下",
              class: "cmenu",
              position: "before",
            },
            {
              url: "assets/music_score_editor/img/notepanel/linemark (4).png",
              value: "!ped-up!",
              title: "松开",
              class: "cmenu",
              position: "before",
            },
            {
              url: "assets/music_score_editor/img/notepanel/linemark (5).png",
              value: "!<(!",
              value2: "!<)!",
              title: "渐强",
              class: "cmenu",
              position: "surround",
            },
            {
              url: "assets/music_score_editor/img/notepanel/linemark (6).png",
              value: "!>(!",
              value2: "!>)!",
              title: "渐弱",
              class: "cmenu",
              position: "surround",
            },
            {
              url: "assets/music_score_editor/img/notepanel/linemark (7).png",
              value: "[1.",
              title: "反复至第一房子",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              fn: () => setRepeatBracket(['[1.', ']']),
            },
            {
              url: "assets/music_score_editor/img/notepanel/linemark (8).png",
              value: "[2.",
              title: "反复至第二房子",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              fn: () => setRepeatBracket(['[2.']),
            },
            {
              url: "assets/music_score_editor/img/notepanel/linemark (8)-2.png",
              value: "[2.",
              title: "反复至第二房子",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              fn: () => setRepeatBracket(['[2.', ']']),
            },
            {
              url: "assets/music_score_editor/img/notepanel/linemark (9).png",
              value: "[3.",
              title: "反复至第三房子",
              class: "cmenu",
              type: "nodeline",
              position: "beforeInsert",
              fn: () => setRepeatBracket(['[3.']),
            },
            {
              url: "assets/music_score_editor/img/notepanel/linemark (10).png",
              id: "slurbtn",
              value: "(note)",
              class: "slur cmenu",
              title: "连线",
              fn: lineTo
            },
            {
              url: "assets/music_score_editor/img/notepanel/linemark (11).png",
              value: "!rit!",
              title: "渐慢",
              class: "cmenu",
              position: "before",
            },
            {
              url: "assets/music_score_editor/img/notepanel/linemark (12).png",
              value: "!accel!",
              title: "渐快",
              class: "cmenu",
              position: "before",
            },
            {
              url: "assets/music_score_editor/img/notepanel/linemark (13).png",
              value: "!cresc.!",
              title: "渐强",
              class: "cmenu",
              position: "before",
            },
            {
              url: "assets/music_score_editor/img/notepanel/linemark (14).png",
              value: "!dim.!",
              title: "渐弱",
              class: "cmenu",
              position: "before",
            },
          ],
          isShow: !0,
        },
        {
          code: "grace",
          name: "装饰音",
          cols: 3,
          canClick: true,
          imgList: [
            {
              url: "assets/music_score_editor/img/notepanel/grace (1).png",
              value: "{/}",
              class: "cmenu",
              title: "单短倚音",
              position: "before",
              type: "8",
              fn: () => {
                const type = $(".selected_text")?.attr("type") || "";
                if (type[0] === "r") return;
                changeAbc((txt) => `{/${txt}}${txt}`);
              },
            },
            {
              url: "assets/music_score_editor/img/notepanel/grace (2).png",
              value: "{}",
              class: "cmenu",
              title: "倚音",
              position: "before",
              type: "8",
              fn: () => {
                const type = $(".selected_text")?.attr("type") || "";
                if (type[0] === "r") return;
                changeAbc((txt) => `{${txt}}${txt}`);
              },
            },
            {
              url: "assets/music_score_editor/img/notepanel/grace (3).png",
              value: "{}",
              class: "cmenu",
              title: "长倚音",
              position: "before",
              type: "4",
              fn: () => {
                const type = $(".selected_text")?.attr("type") || "";
                if (type[0] === "r") return;
                changeAbc((txt) => `{2${txt}}${txt}`);
              },
            },
            {
              url: "assets/music_score_editor/img/notepanel/grace (4).png",
              value: "{}",
              class: "cmenu",
              title: "短倚音",
              position: "before",
              type: "16",
              fn: () => {
                const type = $(".selected_text")?.attr("type") || "";
                if (type[0] === "r") return;
                changeAbc((txt) => `${txt}{${txt}/}`);
              },
            },
            {
              url: "assets/music_score_editor/img/notepanel/grace (15).png",
              value: "{}",
              class: "cmenu",
              title: "复短倚音",
              type: "syy",
              position: "before",
              fn: () => {
                const type = $(".selected_text")?.attr("type") || "";
                if (type[0] === "r") return;
                changeAbc((txt) => `{${txt + txt}}${txt}`);
              },
            },
            {
              url: "assets/music_score_editor/img/notepanel/grace (4).png",
              class: "opacity-0 pointer-events-none h-full",
            },
            {
              url: "assets/music_score_editor/img/notepanel/grace (5).png",
              value: "!arpeggio!",
              class: "cmenu",
              position: "before",
              title: '琶音'
            },
            {
              url: "assets/music_score_editor/img/notepanel/grace (6).png",
              value: "!arpeggioup!",
              class: "cmenu",
              position: "before",
              title: '琶音向下'
            },
            {
              url: "assets/music_score_editor/img/notepanel/grace (7).png",
              value: "!arpeggiodown!",
              class: "cmenu",
              position: "before",
              title: '琶音向下'
            },
            {
              url: "assets/music_score_editor/img/notepanel/grace (8).png",
              value: "!turn!",
              title: "回音",
              class: "cmenu",
              position: "before",
            },
            {
              url: "assets/music_score_editor/img/notepanel/grace (9).png",
              value: "!invertedturn!",
              title: "逆回音",
              class: "cmenu",
              position: "before",
            },
            {
              url: "assets/music_score_editor/img/notepanel/grace (9).png",
              class: "opacity-0 pointer-events-none h-full",
            },
            {
              url: "assets/music_score_editor/img/notepanel/grace (10).png",
              value: "!umrd!",
              class: "cmenu",
              position: "before",
              title: '波音'
            },
            {
              url: "assets/music_score_editor/img/notepanel/grace (11).png",
              value: "!mordent!",
              class: "cmenu",
              position: "before",
              title: '逆波音'
            },
            {
              url: "assets/music_score_editor/img/notepanel/grace (10).png",
              class: "opacity-0 pointer-events-none h-full",
            },
            {
              url: "assets/music_score_editor/img/notepanel/grace (12).png",
              value: "!jpslid!",
              class: "cmenu",
              position: "before",
              title: '滑音'
            },
            // {
            //   url: "assets/music_score_editor/img/notepanel/grace (13).png",
            //   value: "!~(!note!~)!",
            //   class: "cmenu",
            //   type: "gliss",
            //   fn: () => changeAbc((txt) => `!~(!${txt}!)~!`),
            // },
            {
              url: "assets/music_score_editor/img/notepanel/grace (14).png",
              value: "!trill!",
              class: "cmenu",
              position: "before",
              title: '颤音'
            },
            {
              url: "assets/music_score_editor/img/notepanel/grace (14).png",
              class: 'opacity-0 pointer-events-none'
            }
          ],
          isShow: !1,
        },
        {
          code: "",
          name: "力度记号",
          cols: 4,
          canClick: true,
          imgList: [
            {
              title: '强',
              url: "assets/music_score_editor/img/notepanel/strength mark (1).png",
              value: "!f!",
              class: "cmenu",
              position: "before",
              fn: () => {
                const info = getSelectAbcCodeInfo()
                if (!info) return
                const { head, tail, txt } = info
                keepSelectNote(() => {
                  $('#source').val(`${head.replace(/(\!f+\!|\!p+\!|\!mf\!|\!mp\!|\!sf(z|p)?\!)$/, '')}!f!${txt}${tail}`)
                  abc_change()
                })
              },
            },
            {
              title: '很强',
              url: "assets/music_score_editor/img/notepanel/strength mark (2).png",
              value: "!ff!",
              class: "cmenu",
              position: "before",
              fn: () => {
                const info = getSelectAbcCodeInfo()
                if (!info) return
                const { head, tail, txt } = info
                keepSelectNote(() => {
                  $('#source').val(`${head.replace(/(\!f+\!|\!p+\!|\!mf\!|\!mp\!|\!sf(z|p)?\!)$/, '')}!ff!${txt}${tail}`)
                  abc_change()
                })
              },
            },
            {
              title: '非常强',
              url: "assets/music_score_editor/img/notepanel/strength mark (3).png",
              value: "!fff!",
              class: "cmenu",
              position: "before",
              fn: () => {
                const info = getSelectAbcCodeInfo()
                if (!info) return
                const { head, tail, txt } = info
                keepSelectNote(() => {
                  $('#source').val(`${head.replace(/(\!f+\!|\!p+\!|\!mf\!|\!mp\!|\!sf(z|p)?\!)$/, '')}!fff!${txt}${tail}`)
                  abc_change()
                })
              },
            },
            {
              title: '中强',
              url: "assets/music_score_editor/img/notepanel/strength mark (4).png",
              value: "!mf!",
              class: "cmenu",
              position: "before",
              fn: () => {
                const info = getSelectAbcCodeInfo()
                if (!info) return
                const { head, tail, txt } = info
                keepSelectNote(() => {
                  $('#source').val(`${head.replace(/(\!f+\!|\!p+\!|\!mf\!|\!mp\!|\!sf(z|p)?\!)$/, '')}!mf!${txt}${tail}`)
                  abc_change()
                })
              },
            },
            {
              title: '弱',
              url: "assets/music_score_editor/img/notepanel/strength mark (5).png",
              value: "!p!",
              class: "cmenu",
              position: "before",
              fn: () => {
                const info = getSelectAbcCodeInfo()
                if (!info) return
                const { head, tail, txt } = info
                keepSelectNote(() => {
                  $('#source').val(`${head.replace(/(\!f+\!|\!p+\!|\!mf\!|\!mp\!|\!sf(z|p)?\!)$/, '')}!p!${txt}${tail}`)
                  abc_change()
                })
              },
            },
            {
              title: '很弱',
              url: "assets/music_score_editor/img/notepanel/strength mark (6).png",
              value: "!pp!",
              class: "cmenu",
              position: "before",
              fn: () => {
                const info = getSelectAbcCodeInfo()
                if (!info) return
                const { head, tail, txt } = info
                keepSelectNote(() => {
                  $('#source').val(`${head.replace(/(\!f+\!|\!p+\!|\!mf\!|\!mp\!|\!sf(z|p)?\!)$/, '')}!pp!${txt}${tail}`)
                  abc_change()
                })
              },
            },
            {
              title: '非常弱',
              url: "assets/music_score_editor/img/notepanel/strength mark (7).png",
              value: "!ppp!",
              class: "cmenu",
              position: "before",
              fn: () => {
                const info = getSelectAbcCodeInfo()
                if (!info) return
                const { head, tail, txt } = info
                keepSelectNote(() => {
                  $('#source').val(`${head.replace(/(\!f+\!|\!p+\!|\!mf\!|\!mp\!|\!sf(z|p)?\!)$/, '')}!ppp!${txt}${tail}`)
                  abc_change()
                })
              },
            },
            {
              title: '中弱',
              url: "assets/music_score_editor/img/notepanel/strength mark (8).png",
              value: "!mp!",
              class: "cmenu",
              position: "before",
              fn: () => {
                const info = getSelectAbcCodeInfo()
                if (!info) return
                const { head, tail, txt } = info
                keepSelectNote(() => {
                  $('#source').val(`${head.replace(/(\!f+\!|\!p+\!|\!mf\!|\!mp\!|\!sf(z|p)?\!)$/, '')}!mp!${txt}${tail}`)
                  abc_change()
                })
              },
            },
            {
              title: '特强',
              url: "assets/music_score_editor/img/notepanel/strength mark (9).png",
              value: "!sf!",
              class: "cmenu",
              position: "before",
              fn: () => {
                const info = getSelectAbcCodeInfo()
                if (!info) return
                const { head, tail, txt } = info
                keepSelectNote(() => {
                  $('#source').val(`${head.replace(/(\!f+\!|\!p+\!|\!mf\!|\!mp\!|\!sf(z|p)?\!)$/, '')}!sf!${txt}${tail}`)
                  abc_change()
                })
              },
            },
            {
              title: '特强',
              url: "assets/music_score_editor/img/notepanel/strength mark (10).png",
              value: "!sfz!",
              class: "cmenu",
              position: "before",
              fn: () => {
                const info = getSelectAbcCodeInfo()
                if (!info) return
                const { head, tail, txt } = info
                keepSelectNote(() => {
                  $('#source').val(`${head.replace(/(\!f+\!|\!p+\!|\!mf\!|\!mp\!|\!sf(z|p)?\!)$/, '')}!sfz!${txt}${tail}`)
                  abc_change()
                })
              },
            },
            {
              title: '特强后弱',
              url: "assets/music_score_editor/img/notepanel/strength mark (11).png",
              value: "!sfp!",
              class: "cmenu",
              position: "before",
              fn: () => {
                const info = getSelectAbcCodeInfo()
                if (!info) return
                const { head, tail, txt } = info
                keepSelectNote(() => {
                  $('#source').val(`${head.replace(/(\!f+\!|\!p+\!|\!mf\!|\!mp\!|\!sf(z|p)?\!)$/, '')}!sfp!${txt}${tail}`)
                  abc_change()
                })
              },
            },
            {
              url: "assets/music_score_editor/img/notepanel/strength mark (11).png",
              class: "opacity-0 pointer-events-none h-full",
            },
          ],
        },
        {
          canClick: true,
          code: "playMark",
          name: "演奏记号",
          cols: 3,
          imgList: [
            {
              title: '跳音',
              url: "assets/music_score_editor/img/notepanel/playMark (1).png",
              value: ".",
              class: "cmenu",
              position: "before",
              fn: () => {
                const info = getSelectAbcCodeInfo()
                if (!info) return
                const { head, tail, txt } = info
                keepSelectNote(() => {
                  $('#source').val(`${head.replace(/\.$/, '')}.${txt}${tail}`)
                  abc_change()
                })
              },
            },
            {
              title: '重音',
              url: "assets/music_score_editor/img/notepanel/playMark (2).png",
              value: "!>!",
              class: "cmenu",
              position: "before",
              fn: () => {
                const info = getSelectAbcCodeInfo()
                if (!info) return
                const { head, tail, txt } = info
                keepSelectNote(() => {
                  $('#source').val(`${head.replace(/\!>\!$/, '')}!>!${txt}${tail}`)
                  abc_change()
                })
              },
            },
            {
              title: '保持音',
              url: "assets/music_score_editor/img/notepanel/playMark (3).png",
              value: "!tenuto!",
              class: "cmenu",
              position: "before",
              fn: () => {
                const info = getSelectAbcCodeInfo()
                if (!info) return
                const { head, tail, txt } = info
                keepSelectNote(() => {
                  $('#source').val(`${head.replace(/\!tenuto\!$/, '')}!tenuto!${txt}${tail}`)
                  abc_change()
                })
              },
            },
            {
              title: "延长",
              url: "assets/music_score_editor/img/notepanel/playMark (4).png",
              value: "!fermata!",
              class: "cmenu",
              position: "before",
              fn: () => {
                const info = getSelectAbcCodeInfo()
                if (!info) return
                const { head, tail, txt } = info
                $('#source').val(`${head.replace(/\!fermata\!$/, '')}!fermata!${txt}${tail}`)
                abc_change()
              },
            },
            {
              title: '顿音',
              url: "assets/music_score_editor/img/notepanel/playMark (5).png",
              value: "!wedge!",
              class: "cmenu",
              position: "before",
              fn: () => {
                const info = getSelectAbcCodeInfo()
                if (!info) return
                const { head, tail, txt } = info
                keepSelectNote(() => {
                  $('#source').val(`${head.replace(/\!wedge\!$/, '')}!wedge!${txt}${tail}`)
                  abc_change()
                })
              },
            },
          ],
        },
        {
          code: "speedTerm",
          name: "速度术语",
          cols: 2,
          speedList: speedTxtList,
        },
        {
          canClick: true,
          code: "repeatAndJump",
          name: "重复与跳转",
          cols: 2,
          imgList: [
            {
              url: "assets/music_score_editor/img/notepanel/repeat (1).png",
              value: "!segno!",
              title: "记号",
              position: "preInsert",
              type: "nodeline",
              fn: () => setRepeatAndJump('!segno!')
            },
            {
              title: "反复省略记号",
              url: "assets/music_score_editor/img/notepanel/repeat (2).png",
              value: "!coda!",
              position: "preInsert",
              type: "nodeline",
              fn: () => setRepeatAndJump('!coda!')
            },
            {
              title: "曲终",
              url: "assets/music_score_editor/img/notepanel/repeat (3).png",
              value: "!fine!",
              position: "afterInsert",
              type: "nodeline",
              fn: () => setRepeatAndJump('!fine!')
            },
            {
              title: "到结尾",
              url: "assets/music_score_editor/img/notepanel/repeat (4).png",
              value: "!tocoda!",
              position: "afterInsert",
              type: "nodeline",
              fn: () => setRepeatAndJump('!tocoda!')
            },
            {
              url: "assets/music_score_editor/img/notepanel/repeat (5).png",
              value: "!D.C.!",
              title: "从头开始反复",
              position: "afterInsert",
              type: "nodeline",
              fn: () => setRepeatAndJump('!D.C.!')
            },
            {
              url: "assets/music_score_editor/img/notepanel/repeat (6).png",
              value: "!D.S.!",
              title: "从记号处反复",
              position: "afterInsert",
              type: "nodeline",
              fn: () => setRepeatAndJump('!D.S.!')
            },
            {
              url: "assets/music_score_editor/img/notepanel/repeat (7).png",
              value: "!D.C.alfine!",
              title: "从头反复到结束",
              position: "afterInsert",
              type: "nodeline",
              fn: () => setRepeatAndJump('!D.C.alfine!')
            },
            {
              url: "assets/music_score_editor/img/notepanel/repeat (8).png",
              value: "!D.C.alcoda!",
              title: "跳过反复到结尾",
              position: "afterInsert",
              type: "nodeline",
              fn: () => setRepeatAndJump('!D.C.alcoda!')
            },
          ],
        },
        {
          canClick: true,
          name: "符尾",
          code: "tail",
          cols: 3,
          imgList: [
            {
              url: "assets/music_score_editor/img/notepanel/tail (1).png",
              title: "单拆音符",
              // class: "cmenu",
              fn: () => changeGroupNote("all", "split"),
              value: "$split",
            },
            {
              url: "assets/music_score_editor/img/notepanel/tail (2).png",
              title: "向右",
              // class: "cmenu",
              fn: () => changeGroupNote("right", "merge"),
              value: "$mergeRight",
            },
            {
              url: "assets/music_score_editor/img/notepanel/tail (3).png",
              title: "向左",
              // class: "cmenu",
              fn: () => changeGroupNote("left", "merge"),
              value: "$mergeLeft",
            },
            {
              url: "assets/music_score_editor/img/notepanel/tail (4).png",
              title: "连接符尾",
              // class: "cmenu",
              fn: () => changeGroupNote("all", "merge"),
              value: "$mergeAll",
            },
            {
              url: "assets/music_score_editor/img/notepanel/tail (4).png",
              class: "opacity-0 pointer-events-none h-full",
            },
            {
              url: "assets/music_score_editor/img/notepanel/tail (4).png",
              class: "opacity-0 pointer-events-none h-full",
            },
          ],
        },
      ],
      foldLine: {
        toolShow: false,
        show: false,
        line: 4,
        previewV: 4,
      },
      timbre: {
        show: false,
      },
      shortcutsPanel: {
        index: -1,
        typeList: [
          {
            title: "基本操作",
            leftList: [
              {
                title: "新建",
                shortList: ["Ctrl", "M"],
                valueList: ["m"],
                fn: () => (content_vue.newScore.musicType.show = true),
              },
              {
                title: "打开",
                shortList: ["Ctrl", "O"],
                valueList: ["o"],
                fn: () =>
                  (content_vue.m.myScore.isShow =
                    !content_vue.m.myScore.isShow),
              },
              {
                title: "导入",
                shortList: ["Ctrl", "R"],
                valueList: ["r"],
                fn: () => $("#input-file").val("") && $("#input-file").click(),
              },
              {
                title: "导出",
                shortList: ["Ctrl", "D"],
                valueList: ["d"],
                fn: () =>
                  (content_vue.m.export.show = !content_vue.m.export.show),
              },
              {
                title: "保存",
                shortList: ["Ctrl", "S"],
                valueList: ["s"],
                fn: () => saveScore(),
              },
              { title: "另存为谱例", shortList: ["Shift", "S"], valueList: ['s'], fn: () => content_vue.m.saveToScore.isShow = !content_vue.m.saveToScore.isShow },
              { title: "音符输入", shortList: ["N"] },
              { title: "缩放", shortList: ["Ctrl", "鼠标滚动"] },
              { title: "谱面拖动", shortList: ["Ctrl", "鼠标拖动"] },
            ],
            rightList: [
              {
                title: "删除",
                shortList: ["Backspace", "/", "Del"],
                valueList: ["Backspace", "Delete"],
                fn: () => keepSelectNote(delSelNote),
              },
              {
                title: "撤回",
                shortList: ["Ctrl", "Z"],
                valueList: ["z"],
                fn: (e) => {
                  if ($(e.target).attr("class") == "editor-div") {
                    return;
                  }
                  setTimeout(function () {
                    goback();
                    e.preventDefault();
                  }, 100);
                },
              },
              {
                title: "恢复",
                shortList: ["Ctrl", "Y"],
                valueList: ["y"],
                fn: () => $(".forward").click(),
              },
              {
                title: "复制",
                shortList: ["Ctrl", "C"],
                valueList: ["c"],
                fn: () => copy(),
              },
              {
                title: "粘贴",
                shortList: ["Ctrl", "V"],
                valueList: ["v"],
                fn: () => paste(),
              },
              {
                title: "全选",
                shortList: ["Ctrl", "A"],
                valueList: ["a"],
                fn: () => {
                  $('.selected_text').removeClass('selected_text')
                  $('._select-note').removeClass('_select-note')
                  $('text[type="hd"]').addClass("selected_text")
                },
              },
              {
                title: "剪切",
                shortList: ["Ctrl", "X"],
                valueList: ["x"],
                fn: () =>
                  copy() | delSelectedNode() |delSelNote()
              },
              {
                title: "删除小节",
                shortList: ["Ctrl", "Backspace"],
                valueList: ["Backspace"],
                fn: () => delSelectedNode(),
              },
              {
                title: '选取',
                shortList: ['鼠标单击'],
              }
            ],
          },
          {
            title: "音符输入",
            leftList: [
              { title: "Do", shortList: ["C", "/", "1"] },
              { title: "Re", shortList: ["D", "/", "2"] },
              { title: "Mi", shortList: ["E", "/", "3"] },
              { title: "Fa", shortList: ["F", "/", "4"] },
              { title: "Sol", shortList: ["G", "/", "5"] },
              { title: "La", shortList: ["A", "/", "6"] },
              { title: "Si", shortList: ["B", "/", "7"] },
              { title: "音符上下移动一度", shortList: ["↑", "/", "↓"] },
              { title: "音符上下移动八度", shortList: ["Ctrl", "↑", "/", "↓"] },
            ],
            rightList: [],
          },
          {
            title: "连音",
            leftList: [
              {
                title: "二连音",
                shortList: ["Ctrl", "2"],
                valueList: ["2"],
                fn: () => liaison("(2"),
              },
              {
                title: "三连音",
                shortList: ["Ctrl", "3"],
                valueList: ["3"],
                fn: () => liaison("(3"),
              },
              {
                title: "四连音",
                shortList: ["Ctrl", "4"],
                valueList: ["4"],
                fn: () => liaison("(4"),
              },
              {
                title: "五连音",
                shortList: ["Ctrl", "5"],
                valueList: ["5"],
                fn: () => liaison("(5"),
              },
              {
                title: "六连音",
                shortList: ["Ctrl", "6"],
                valueList: ["6"],
                fn: () => liaison("(6"),
              },
              {
                title: "七连音",
                shortList: ["Ctrl", "7"],
                valueList: ["7"],
                fn: () => liaison("(7"),
              }
            ],
            rightList: [],
          },
          {
            title: "工具",
            leftList: [
              {
                title: "元素前插入小节",
                shortList: ["Ctrl", "B"],
                valueList: ["b"],
                fn: () => insertNodes(1),
              },
              {
                title: "元素后插入小节",
                shortList: ["Ctrl", "Shift", "B"],
                valueList: ["b"],
                fn: () => insertNodes(1, true),
              },
              {
                title: "乐谱开始处插入小节",
                shortList: ["Alt", "B"],
                valueList: ["b"],
                fn: () => insertNodes(1, false, true),
              },
              {
                title: "乐谱结尾处插入小节",
                shortList: ["Alt", "Shift", "B"],
                valueList: ["b"],
                fn: () => appendNodes(1),
              },
              {
                title: "折行",
                shortList: ["Enter"],
                valueList: ["Enter"],
                fn: () => content_vue.checkIsSelectBar() && addBr(),
              },
              {
                title: "自定义折行",
                shortList: ["Ctrl", "Enter"],
                valueList: ["Enter"],
                fn: () => (content_vue.m.foldLine.show = true),
              },
              {
                title: "播放/暂停",
                shortList: ["空格键"],
                valueList: [" "],
                fn: () => myplay(),
              },
              {
                title: "回到开始处",
                shortList: ["Home"],
                valueList: ["Home"],
                fn: () => $("#player-2").click(),
              },
            ],
            rightList: [
              {
                title: "歌词",
                shortList: ["L"],
                valueList: ["l"],
                fn: () =>
                  content_vue.checkIsSelectNote() && createLyricEditor(),
              },
              {
                title: "节拍器",
                shortList: ["J"],
                valueList: ["j"],
                fn: () => $("#metronomesetting").click(),
              },
              {
                title: "移调",
                shortList: ["Y"],
                valueList: ["y"],
                fn: () => (content_vue.m.key.show = !content_vue.m.key.show),
              },
              // {
              //   title: "符干向上",
              //   shortList: ["U"],
              //   valueList: ["u"],
              //   fn: () =>
              //     content_vue.checkIsSelectNote() && setNoteStemDirect("up"),
              // },
              // {
              //   title: "符干向下",
              //   shortList: ["I"],
              //   valueList: ["i"],
              //   fn: () =>
              //     content_vue.checkIsSelectNote() && setNoteStemDirect("down"),
              // },
              {
                title: "音色",
                shortList: ["S"],
                valueList: ["s"],
                fn: () => {
                  content_vue.m.menuIndex = 2;
                  content_vue.$nextTick(() => {
                    $("#timbre").click();
                  });
                },
              },
              {
                title: "小键盘",
                shortList: ["P"],
                valueList: ["p"],
                fn: () =>
                  (content_vue.m.numberKeypad.isShow =
                    !content_vue.m.numberKeypad.isShow),
              },
              {
                title: "音符面板",
                shortList: ["Q"],
                valueList: ["q"],
                fn: () =>
                  (content_vue.m.isMusicNoteShow =
                    !content_vue.m.isMusicNoteShow),
              },
              {
                title: "虚拟键盘",
                shortList: ["M"],
                valueList: ["m"],
                fn: () => {
                  content_vue.menuActive = "";
                  content_vue.keyboardClick();
                },
              },
            ],
          },
          {
            title: "小键盘",
            leftList: [
              { title: "小键盘上的1", shortList: ["1"] },
              { title: "小键盘上的2", shortList: ["2"] },
              { title: "小键盘上的3", shortList: ["3"] },
              { title: "小键盘上的4", shortList: ["4"] },
              { title: "小键盘上的5", shortList: ["5"] },
              { title: "小键盘上的6", shortList: ["6"] },
              { title: "小键盘上的7", shortList: ["7"] },
              { title: "小键盘上的8", shortList: ["8"] },
              { title: "小键盘上的9", shortList: ["9"] },
            ],
            rightList: [
              { title: "小键盘上的0", shortList: ["0"] },
              { title: "小键盘上的.", shortList: ["."] },
              { title: "小键盘上的/", shortList: ["/"] },
              { title: "小键盘上的*", shortList: ["*"] },
              { title: "小键盘上的-", shortList: ["-"] },
              { title: "小键盘上的+", shortList: ["+"] },
              { title: "小键盘上的Enter", shortList: ["Enter"] },
            ],
          },
        ],
      },
    },
  },
  methods: {
    // -------图片上传组件---------
    setFileHtml: function (file) {
      // 根据文件类型，显示不同的对象
      return setFileHtml(file);
    },
    removeFile: function (file, idx) {
      // 移除文件
      delFile(
        file,
        this.$refs.upload,
        this.fileUpload.showFiles,
        idx,
        function () {
          content.fileUpload = getFileData();
          Vue.nextTick(function () {
            if (content.fileUpload.files.length == 0) {
              $(".upload-add").show();
            }
          });
        }
      );
    },
    uploadFile: function (cb) {
      // 启动上传，将文件传至服务器
      if (this.$refs.upload) {
        this.$refs.upload.active = true;
      }
    },
    inputFile: function (newFile, oldFile) {
      // 文件提交时，或者文件变更时触发
      // 将文件加入到展示列表中或者提交到服务器（启动上传后）
      var that = this;
      submitFile(
        newFile,
        oldFile,
        this.fileUpload.showFiles,
        function (result, msg) {
          console.log("submitFile:", result);
          if (result == 1) {
            // 文件成功上传到服务器之后，开始保存
            that.saveForm();
          }
        }
      );
    },
    // -------图片上传组件 end ---------
    // 查找导航
    navFound: function (menuCode) {
      return this.menuList.find(function (item) {
        return item.menuCode == menuCode;
      });
    },
    // 查找导航项
    navItemFound: function (menuCode, code) {
      var navPo = this.navFound(menuCode);
      if (!navPo) {
        return;
      }
      return navPo.subMenuList.find(function (item) {
        return item.code == code;
      });
    },
    // 顶级菜单
    navClick: function (menuCode) {
      var e = window.event;
      //console.log('e-----',window.event);
      // 防止点击子菜单因为冒泡引起闪现
      if (e.target.nodeName.toLowerCase() != "li") {
        return;
      }
      this.menuActive = this.menuActive == menuCode ? "" : menuCode;
    },
    // 一级菜单 isNotTrigger 是否出发选中事件
    navItemClick: function (m, n, menuCode) {
      if (!this.menuList[m].subMenuList[n].checkbox) {
        return;
      }
      this.menuList[m].subMenuList[n].isChecked =
        !this.menuList[m].subMenuList[n].isChecked;
      this.setUsuallyFunc();
    },
    // 键盘收起、展开
    keyboardClick: function () {
      this.keyboardShow = !this.keyboardShow;
      /*
       * if(this.keyboardShow && !this.headerInBottom){
       * $('#content').css('padding-bottom', '200px'); }else{
       * $('#content').css('padding-bottom', '0'); }
       */
    },
    // 初始化常用功能
    setUsuallyFunc: function () {
      this.usuallyFuncList = [];
      for (var i = 0; i < this.menuList.length; i++) {
        var curMenu = this.menuList[i];
        var funcJson = this.usuallyFuncList.find(
          (item) => item.menuCode == curMenu.menuCode
        );
        if (!funcJson) {
          funcJson = {};
          funcJson.menuCode = curMenu.menuCode;
          funcJson.orderby = curMenu.orderby;
        }
        for (var j = 0; j < curMenu.subMenuList.length; j++) {
          var curSubMenu = curMenu.subMenuList[j];
          if (curSubMenu.isChecked && curSubMenu.checkbox) {
            funcJson.subMenuList = funcJson.subMenuList || [];
            funcJson.subMenuList.push(curSubMenu);
          }
        }
        this.usuallyFuncList.push(funcJson);
        // 将功能保存在缓存中
        localStorage.setItem(
          "usuallyFuncList",
          JSON.stringify(this.usuallyFuncList)
        );
      }
      Vue.nextTick(function () {
        bindAllEvent();
      });
    },

    // 初始化功能栏
    loadUsuallyFunc: function () {
      if (typeof this.menuList == "undefined") {
        return;
      }
      var usuallyFuncList = localStorage.getItem("usuallyFuncList");
      if (usuallyFuncList) {
        usuallyFuncList = JSON.parse(usuallyFuncList);
        // 回调工具栏
        this.usuallyFuncList = usuallyFuncList;
      }

      for (var i = 0; i < this.menuList.length; i++) {
        if (!this.menuList[i].subMenuList) {
          continue;
        }
        var menuCode = this.menuList[i].menuCode;
        // 功能
        var umenuJson = usuallyFuncList
          ? usuallyFuncList.find((item) => item.menuCode == menuCode)
          : null;

        for (var j = 0; j < this.menuList[i].subMenuList.length; j++) {
          var subMen = this.menuList[i].subMenuList[j];
          if (subMen && subMen.checkbox) {
            if (umenuJson && umenuJson.subMenuList) {
              usubMenuJson = umenuJson.subMenuList.find(
                (item) => item.code == subMen.code
              );
            }
            subMen.isChecked =
              typeof usubMenuJson != "undefined"
                ? usubMenuJson.isChecked
                : false;
            // 视图选中特殊处理
            if ("view" == menuCode) {
              switch (subMen.code) {
                case "symbol":
                  // 音符面板
                  this.symbolPanelShow = subMen.isChecked;
                  // 当前是打开状态，那么点击之后就关闭
                  leftPanelClick(".left-show-img", !this.symbolPanelShow);
                  break;
                case "attr":
                  // 音符面板
                  this.attrPanelShow = subMen.isChecked;
                  break;
                case "edit":
                  // 语法编辑
                  this.editorShow = subMen.isChecked;
                  this.editorClickComm();
                  break;
                case "keyboard":
                  // 钢琴键盘
                  this.keyboardShow = subMen.isChecked;
                  break;
                case "chordpanel":
                  // 钢琴键盘
                  this.chordPanelShow = subMen.isChecked;
                  this.chordPanelClick(this.chordPanelShow);
                  break;
              }
            }
          }
        }
      }
    },

    // 任务栏下拉框内容点击事件
    pullToolClick: function (code, isShow, idx) {
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
      setTimeout(function () {
        // initBodyHeight();
      }, 10);
    },

    // 工具栏展开、收起按钮
    expandClick: function (idx) {
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
      setTimeout(function () {
        // initBodyHeight();
      }, 300);
    },

    // 工具栏内容点击事件
    toolItemClick: function (code, id, value) {
      switch (code) {
        case "edit": // 编辑版块
          break;
        case "note": // 音符版块
          break;
        case "length": // 长度版块
          break;
        case "height": // 音高版块
          break;
        case "rest": // 休止符版块
          break;
        case "bar": // 小节版块
          break;
        case "ruler":
          this.rulerClick(id, value);
          break;
        case "rhythm":
          break;
        case "clef":
          break;
        case "dur":
          break;
        default:
      }
    },

    // 编辑器显示、隐藏
    editorClick: function (editorShow) {
      var isShow = $("#editor").hasClass("menu-pressed");
      if (isShow) {
        this.editorShow = false;
      } else {
        this.editorShow = true;
      }
      this.editorClickComm();
    },
    //和弦编辑
    chordPanelClick: function (chordPanelShow) {
      if (chordPanelShow === true) {
        $(".choir-sel").show();
        $("#markType").change();
        return;
      } else if (chordPanelShow === false) {
        $(".choir-sel").hide();
        $(".marktype").hide();
        return;
      }
      var checked = $(".chordpanel").hasClass("checked");
      if (checked) {
        $(".choir-sel").hide();
        $(".marktype").hide();
      } else {
        $(".choir-sel").show();
        $("#markType").change();
      }
    },

    editorClickComm: function () {
      var isNumStaffEditorShow = $("#numstaffeditor").hasClass("menu-pressed");
      if (isNumStaffEditorShow) {
        this.numstaffClick();
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
    metronomeClick: function () {
      $("#metronome").toggleClass("menu-pressed");
      playMetro = !playMetro;
      src_change();
    },
    // 简谱编辑器显示、隐藏
    numstaffClick: function () {
      var isEditorShow = $("#editor").hasClass("menu-pressed");
      if (isEditorShow) {
        this.editorClick();
      }
      var isNumStaffEditorShow = $("#numstaffeditor").hasClass("menu-pressed");
      $("#numstaffeditor").toggleClass("menu-pressed");
      if (isNumStaffEditorShow) {
        $("#numstaffinput").css({
          left: $(".body-left").width(),
          width: $(".right-top").width(),
          display: "none",
        });
      } else {
        $("#numstaffinput").css({
          left: $(".body-left").width(),
          width: $(".right-top").width(),
          display: "",
        });
        $("#numstaffinput").focus();
      }
    },
    // 谱例属性显示、隐藏
    plsxClick: function () {
      $(".plsx-box").toggleClass("hide");
      $("#plsx").toggleClass("menu-pressed");
      setSpeedSelected();
    },

    // 点击"文件"
    rightMenuClick: function () {
      hideMenu();
      $(".menu-list-other").toggleClass("hide");
    },

    // 工具菜单下拉框选项显示、隐藏
    menuClick: function (id) {
      hideMenu();
      var isShow = $("#" + id).hasClass("menu-pressed");
      $("#" + id).toggleClass("menu-pressed");
      if (isShow) {
        $("#" + id)
          .find(".menu-pulldown-box")
          .hide();
      } else {
        $("#" + id)
          .find(".menu-pulldown-box")
          .show();
      }
    },

    // 谱音同步选择 value: 0: 谱音同步 1: 只播图像 2: 只播声音
    pytbChoose: function (value) {
      hideMenu();
      this.pytbOption = value;
      changeChoice();
    },

    // 乐器的选择
    instrumentChoose: function (value) {
      mystop();
      hideMenu();
      this.instrumentOption = value;
      var selNodes = $("svg[type='rectnode']");
      if (selNodes.length > 0) {
        //如果有选中小节，则设置小节对应的声部的音色
        var id = $(selNodes[0]).attr("id");
        var vStr = id.replace("mysvgnode", "");
        var v = vStr.split("_")[0];
        setVoiceInstrument(parseInt(v) + 1, value);
      } else {
        set("%%MIDI program", value);
      }
      var txt = "";
      var tmp_interval = setInterval(function () {
        txt = $("#playspan").text();
        if (txt == "播放") {
          abc_change();
          clearInterval(tmp_interval);
          return;
        }
      }, 100);
    },
    playingInstrumentChange: function (value, name) {
      console.log("播放中更换音色：", value);
      this.playingInstrumentOption = value;
      $("#instruSpan").html(name);
      $("#playInstrument").css("width", 20 * name.length + "px");
      user.tmpInstru = value;
    },

    // 是否同步键盘时值
    tbjpszClick: function () {
      this.isTbjpsz = !this.isTbjpsz;
    },

    initToolList: function () {
      // 工具栏=》编辑常开，默认打开：音符、长度、音高、休止符
      // this.toolList.push(toolTemp['note']);
      // this.toolList.push(toolTemp['length']);
      // this.toolList.push(toolTemp['height']);
      // this.toolList.push(toolTemp['rest']);
      var list = this.pulldownToolList;
      for (var i = 0; i < list.length; i++) {
        var obj = toolTemp[list[i].code];
        obj.isShow = list[i].isShow;
        this.toolList.push(obj);
      }
    },

    rulerClick: function (id, value) {
      if (value == 1) {
        activeRuler = "tone-ruler";
        $("." + activeRuler).css("left", "872px");
      } else if (value == 2) {
        activeRuler = "dshx-ruler";
        $("." + activeRuler).css("left", "895px");
      } else if (value == 3) {
        activeRuler = "xshx-ruler";
        $("." + activeRuler).css("left", "895px");
      } else {
        activeRuler = null;
      }
      var flag = $("#" + id).hasClass("selected");
      if (flag) {
        $(".ruler-img").removeClass("selected");
        $(".ruler").hide();
      } else {
        $(".ruler-img").removeClass("selected");
        $("#" + id).addClass("selected");
        $(".ruler").hide();
        if (activeRuler) {
          $("." + activeRuler).show();
        }
      }
    },
    // 绘制曲式
    startDrawMF: function () {
      var that = this;
      if (!this.abcSel.isOpen) {
        this.abcSel.action = "open";
        var abcContent = $("#source").val();
        abcContent = setAbcKeyValue(abcContent, "%%staffsep", 100 / scale);
        var mf = getAbcKeyValue(abcContent, "%%musicform");
        if (mf) {
          mfSetting = JSON.parse(mf);
        } else {
          mfSetting = new Array();
        }
        $("#source").val(abcContent);
        src_change();
      } else {
        var abcContent = $("#source").val();
        this.abcSel.action = "close";
        if (this.showMusicForm) {
          this.abcSel.close();
        } else {
          abcContent = removeAbcKeyValue(abcContent, "%%staffsep");
        }
        if (mfSetting && mfSetting.length > 0) {
          abcContent = setAbcKeyValue(
            abcContent,
            "%%musicform",
            JSON.stringify(mfSetting)
          );
        } else {
          abcContent = removeAbcKeyValue(abcContent, "%%musicform");
        }
        $("#source").val(abcContent);
        src_change();
      }
    },
    // 展示曲式
    showMF: function () {
      this.showMusicForm = !this.showMusicForm;

      var abcContent = $("#source").val();
      var mf = getAbcKeyValue(abcContent, "%%musicform");
      if (this.showMusicForm && mf) {
        abcContent = setAbcKeyValue(abcContent, "%%staffsep", 100 / scale);
      } else {
        abcContent = removeAbcKeyValue(abcContent, "%%staffsep");
      }
      $("#source").val(abcContent);
      src_change();
    },

    // 曲式分析相关

    setStyle: function (v) {
      var that = this;
      if (!that.musicForm.fieldno) {
        return;
      }
      function repStyle(v) {
        that.musicForm.fieldno = that.musicForm.fieldno.replace(
          /(\d)/g,
          function (params) {
            return "<" + v + ">" + arguments[0] + "</" + v + ">";
          }
        );
      }
      this.inpdisable = true;
      this.musicForm.fieldno = this.musicForm.fieldno.replace(/<.*?>/g, "");
      switch (v) {
        case "sub":
          repStyle(v);
          break;
        case "sup":
          repStyle(v);
          break;
        default:
          break;
      }
    },
    inpEdit: function () {
      this.setStyle("restore");
      this.inpdisable = false;
    },
    // 曲式分析相关
    // 提交
    submit: function () {
      var that = this;

      if (!that.validForm()) {
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
    validForm: function () {
      if (!this.musicForm.fieldno) {
        alert("请输入编号");
        return false;
      }
      if (!this.musicForm.fieldname) {
        alert("请输入段落名称");
        return false;
      }
      if (!this.musicForm.bgcolor) {
        alert("请选择背景颜色");
        return false;
      }
      if (!this.musicForm.fielddesc) {
        alert("请输入 段落内容");
        return false;
      }
      if (Number(this.musicForm.startNodeIndex) + "" == "NaN") {
        alert("请入音符的起始位置");
        return false;
      }
      if (Number(this.musicForm.endNodeIndex) + "" == "NaN") {
        alert("请入音符的终止位置");
        return false;
      }
      return true;
    },

    // 保存曲式结构数组
    saveForm: function () {
      if (this.fileUpload.fileData.groupid) {
        this.musicForm.groupid = this.fileUpload.fileData.groupid;
      }

      if (this.cmd == "A") {
        mfSetting.push(clone(this.musicForm));
      } else {
        var id = this.musicForm.id;
        var index = mfSetting.findIndex(function (item) {
          return item.id == id;
        });
        mfSetting.splice(index, 1, clone(this.musicForm));
      }
      renderMusicForm(mfSetting, scale, this.abcSel.isSelNote);
      $("#MUSIC_FORM_div").modal("hide");
    },

    validMusicForm: function () {
      var that = this;
      var id = this.musicForm.id;
      var endNodeIndex = this.musicForm.endNodeIndex - 0;
      var startNodeIndex = this.musicForm.startNodeIndex - 0;
      var musicFormList = mfSetting;
      var flag = true;

      var regionPo = this.musicForm;
      if (regionPo) {
        // 寻找父级节点，判断是否超出父级的范围
        var parentRegionPo = musicFormList.find(
          (item) => item.id == regionPo.pid
        );
        if (
          parentRegionPo &&
          startNodeIndex < parentRegionPo.startNodeIndex - 0
        ) {
          //this.musicForm.startNodeIndex = parentRegionPo.startNodeIndex - 0;
          flag = false;
          alert("不能超出上一级的范围");
          return;
        }

        if (parentRegionPo && endNodeIndex > parentRegionPo.endNodeIndex - 0) {
          //this.musicForm.endNodeIndex = parentRegionPo.endNodeIndex - 0;
          flag = false;
          alert("不能超出上一级的范围");
          return;
        }

        // 判断是否存在靠后的兄弟节点，结束时间不能超过靠后的兄弟的开始时间
        var siblingsBackRegionPo = musicFormList.find(
          (item) =>
            item.pid == regionPo.pid &&
            item.startNodeIndex > Number(regionPo.startNodeIndex) &&
            item.id != id
        );
        if (
          siblingsBackRegionPo &&
          endNodeIndex > siblingsBackRegionPo.startNodeIndex - 0
        ) {
          //this.musicForm.endNodeIndex = siblingsBackRegionPo.startNodeIndex;
          flag = false;
          alert("不能进入同级的范围");
          return;
        }

        // 判断是否存在靠前的兄弟节点，开始时间不能小于靠前的兄弟的结束时间
        var siblingsFrontRegionPo = musicFormList.find(
          (item) =>
            item.pid == regionPo.pid &&
            item.startNodeIndex < Number(regionPo.startNodeIndex) &&
            item.id != id
        );
        if (
          siblingsFrontRegionPo &&
          startNodeIndex < siblingsFrontRegionPo.endNodeIndex - 0
        ) {
          //this.musicForm.startNodeIndex = siblingsFrontRegionPo.endNodeIndex;
          flag = false;
          alert("不能进入同级的范围");
          return;
        }
      }
      return flag;
    },
    saveJxbzAbc: function () {
      var windowOpener = window.opener;
      typeof windowOpener.postMessage == "function" &&
        windowOpener.postMessage($("#source").val(), "*");
      window.close();
    },

    // ———————————————————————————————————————— 分割线 __method ————————————————————————————————————————
    changeSpeed() {
      if (this.m.scoreOpts.speedType !== 'sign') return
      let abcCode = $('#source').val()
      abcCode = abcCode.replace(/(?<=Q:\s+).+/, `${this.m.scoreOpts.speedNote}=${this.m.scoreOpts.speedNum}`)
      $('#source').val(abcCode)
      abc_change()
    },
    getSpeed() {
      const [sppedTxt] = $('#source').val().match(/(?<=Q:\s+).+/);
      const [speedNote, speedNum] = sppedTxt.split('=')
      this.m.scoreOpts.speedNote = speedNote
      this.m.scoreOpts.speedNum = speedNum
    },
    async updateMyScoreList() {
      this.m.myScore.index = -1;
      this.m.myScore.isLoading = true;
      const { data, meta } = await request({
        url: "/musicals",
        params: this.m.myScore.query,
      });
      this.m.myScore.list = data;
      const totalPage = Math.ceil(meta.total / this.m.myScore.query.page_size);
      this.m.myScore.totalPage = totalPage;
      this.m.myScore.isLoading = false;
    },
    async openMyNewScore() {
      const { id } = this.m.myScore.list[this.m.myScore.index]
      this.m.id = id
      this.m.myScore.isShow = false;
    },
    async exportScore() {
      this.m.export.show = false;
      const isNoChecked = this.m.export.list.every((item) => !item.checked);
      if (isNoChecked) return;

      const [pic, pdf] = this.m.export.list;
      // if (!this.m.isInsertMode) switchPrachEditor()

      window.code = $("#source").val();
      if (pic.checked){
        exportAbc2Pdf("source", 'png');
      }
      // src_change()
      if (pdf.checked) {
        exportAbc2Pdf("source");
      }
    },
    changeSelectNote() {
      this.selectNote = $(".selected_text")[0] || null;
    },
    changeSelectBar() {
      setTimeout(() => {
        this.selectBar = $('svg[type="rectnode"]')[0] || null;
      }, 300);
    },
    changeMenuIndex(i) {
      if (this.m.menuIndex == i) {
        this.m.menuIndex = -1;
        return;
      }
      this.m.menuIndex = i;
    },
    checkIsSelectBar(showAlert = true) {
      let selectSvg = null;
      $("svg").each((i, e) => {
        if (!e?.id.includes("mysvgnode")) return;
        selectSvg = e;
      });
      !selectSvg && showAlert && alert("未选中小节：请选取一个小节，然后重试");
      return selectSvg;
    },
    checkIsSelectNote(showAlert = true) {
      const selectNote = $(".selected_text")[0];
      console.log(selectNote);
      !selectNote && showAlert && alert("未选中音符：请选取一个音符，然后重试");
      return selectNote;
    },
    inputFile(e) {
      /** @type { File } */
      const file = e.target.files[0];
      /** @type { 'xml' | 'musicxml' | 'mid' } */
      const fileExt = (file.name.match(/[^\.]+$/) || [""])[0].toLowerCase();
      switch (fileExt) {
        case "xml":
        case "musicxml": {
          leesFile();
          break;
        }
        case "mid": {
          postmidifile();
          break;
        }
        default: {
          alert("仅支持 xml，musicxml 的文件");
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
      }[code];
      if (i === undefined) return;
      const { page } = this.m.numberKeypad;
      let key = "staffList";
      if (scoreOpts.musicType === "easy") key = "easyList";
      const { selector, fn, isKeepSelect } = this.m.numberKeypad[key][page][i];
      if (fn) keepSelectNote(fn);
      if (selector) keepSelectNote(() => $(selector).click());
    },
    changeNumKeypadSelect() {
      const { page } = this.m.numberKeypad;
      let key = "staffList";
      if (scoreOpts.musicType === "easy") key = "easyList";
      const list = this.m.numberKeypad[key][page];
      setTimeout(() => {
        list.forEach((item, i) => {
          if (item.updateIsSelect) return item.updateIsSelect();
          if (!item.selector) return;
          item.isSelect = $(item.selector).hasClass("selected");
        });
      });
    },
    initCtxMenu() {
      this.m.ctxMenu.isShow = false;
    },
    initPanZoom() {
      /** @type { HTMLElement } */
      const panZoomEl = document.querySelector("#panZoom");
      window.panzoom = Panzoom(panZoomEl, {
        animate: true,
        minScale: 0.5,
        maxScale: 1.5,
        step: 0.1,
        overflow: "auto",
        cursor: "move",
        // disablePan: true
      });

      panZoomEl.addEventListener("panzoomzoom", (e) => {
        this.m.panzoom.scale = e.detail.scale;
      });

      window.addEventListener(
        "wheel",
        (e) => {
          if (!e.ctrlKey) return;
          e.preventDefault();
          panzoom.zoomWithWheel(e);
        },
        { passive: false }
      );
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
      if ($(".selected_text").length <= 1) return $(".selected_text")[0];
      return $(".selected_text");
    },
    getSelectedBar() {
      if ($('svg[type="rectnode"]').length <= 1)
        return $('svg[type="rectnode"]')[0];
      return $('svg[type="rectnode"]');
    },
    /**
     * 打开右键菜单
     * @param { MouseEvent } e
     */
    openCtxMenu(e) {
      this.m.ctxMenu.x = e.clientX;
      this.m.ctxMenu.y = e.clientY;
      this.m.ctxMenu.isSelectNote = !!this.getSelectedNote();
      this.m.ctxMenu.isSelectBar = !!this.getSelectedBar();
      this.m.ctxMenu.copyNodeInfo = user.copyNoteInfo;
      this.m.ctxMenu.copyBarInfo = copyNodeInfo;
      this.m.ctxMenu.isShow = true;
    },
    createNewScore() {
      // console.log('createNewScore', this.m.newScore.scoreOpts);
      this.m.newScore.scoreOpts.subTitle = this.m.newScore.scoreOpts.subTitle?this.m.newScore.scoreOpts.subTitle:' ';
      this.m.newScore.scoreOpts.compose = this.m.newScore.scoreOpts.compose?this.m.newScore.scoreOpts.compose:' ';
      this.m.newScore.scoreOpts.lyricist = this.m.newScore.scoreOpts.lyricist?this.m.newScore.scoreOpts.lyricist:' ';
      if (isNewTab) {
        window.open(
          location.href.replace(/\?.+/, "") +
            `?scoreOpts=${encodeURIComponent(
              JSON.stringify(this.m.newScore.scoreOpts)
            )}`
        );
      } else {
        Object.assign(this.m.scoreOpts, this.m.newScore.scoreOpts);
        Object.assign(scoreOpts, this.m.newScore.scoreOpts)
        initScore(scoreOpts);
      }
      this.m.newScore.musicType.show = false;
      this.m.newScore.scoreOptsShow = false;
    },
    /**
     * @param {KeyboardEvent} e
     */
    listenKeydown(e) {
      const { ctrlKey, shiftKey, altKey, key, target, code } = e;
      if (code === "NumpadEnter") return;
      if ([...target.classList].includes("editor-div")) return;
      const shortcutList = this.m.shortcutsPanel.typeList
        .map((item) => item.leftList.concat(item.rightList))
        .flat()
        .map((item) => ({
          ...item,
          valueList: item.valueList?.map((item) => item.toLowerCase()) || [],
        }))
        .sort((pre, nxt) => pre.shortList.length - nxt.shortList.length);
      for (const item of shortcutList) {
        if (!item.fn) continue;
        if (ctrlKey !== item.shortList.includes("Ctrl")) continue;
        if (shiftKey !== item.shortList.includes("Shift")) continue;
        if (altKey !== item.shortList.includes("Alt")) continue;
        if (item.valueList.includes(key.toLowerCase())) {
          item.fn(e);
          e.preventDefault();
          e.returnValue = false;
          return false;
        }
      }
    },
  },
  computed: {
    getMenuTxt() {
      return this.m.menuList[this.m.menuIndex]?.txt;
    },
    getNumberKeypadPosStyle() {
      const { x, y } = this.m.numberKeypad.position;
      return `transform: translate(${x}px, ${y}px);`;
    },
    getCtxMenuList() {
      const { isSelectNote, isSelectBar, copyNodeInfo, copyBarInfo } =
        this.m.ctxMenu;
      // TODO 曲式标记
      // if (this.abcSel.isOpen) return [
      // 	{ title: '删除全部曲式', fn: delAllMF },
      // 	{ title: '退出曲式标记', fn: this.startDrawMF }
      // ]
      const menuList = [
        { title: `复制`, subTitle: "Ctrl + C", fn: copy, disabled: !isSelectNote && !isSelectBar },
        {
          title: `粘贴`,
          subTitle: "Ctrl + V",
          disabled:
            !(isSelectBar && copyBarInfo?.size) &&
            !(isSelectNote && copyNodeInfo.s),
          fn: paste,
        },
        {
          title: `剪切`,
          subTitle: "Ctrl + X",
          fn: () => (copy() | isSelectBar ? delSelectedNode() : delSelNote()),
          disabled: !(isSelectNote || isSelectBar),
        },
        {
          title: "删除",
          subTitle: (isSelectBar ? "Ctrl + " : "") + "Backspace",
          fn: () => (isSelectBar ? delSelectedNode() : delSelNote()),
          disabled: !(isSelectNote || isSelectBar),
        },
        { title: "撤回", subTitle: "Ctrl + Z", fn: goback },
        { type: "line" },
        {
          title: "添加小节",
          disabled: !isSelectBar,
          fn: () =>
            (content_vue.m.ctxMenu.addBarShow =
              !content_vue.m.ctxMenu.addBarShow),
        },
        {
          title: "添加歌词",
          subTitle: "L",
          disabled: !isSelectNote,
          fn: () => createLyricEditor(),
        },
        { type: "line" },
        {
          title: "移高八度",
          fn: up8,
          disabled: !(isSelectBar || isSelectNote),
        },
        {
          title: "移低八度",
          fn: down8,
          disabled: !(isSelectBar || isSelectNote),
        },
        // TODO 曲式标记
        // { title: '曲式标记', fn: this.startDrawMF }
      ];
      return menuList;
    },
  },
  watch: {
    // 当任务栏列表有变化的时候，重新计算body-box的高度
    /*
     * toolList: function(){ setTimeout(function(){ initBodyHeight(); }, 100); }
     */
    // 监听’键盘‘伸缩
    keyboardShow: function (val) {
      var viewPo = this.navItemFound("view", "keyboard");
      if (viewPo) {
        viewPo.isChecked = val;
        $(".keyboard-bar .restore").click();
      }
    },

    // 监听‘语法编辑器’显隐
    editorShow: function (val) {
      var viewPo = this.navItemFound("view", "edit");
      if (viewPo) {
        viewPo.isChecked = val;
      }
    },

    // 监听‘符号面板’显隐
    symbolPanelShow: function (val) {
      var viewPo = this.navItemFound("view", "symbol");
      if (viewPo) {
        viewPo.isChecked = val;
      }

      Vue.nextTick(function () {
        setTimeout(function () {
          musicAreaSize();
        }, 300);
      });
    },
    // 监听‘符号面板’显隐
    attrPanelShow: function (val) {
      var viewPo = this.navItemFound("view", "attr");
      if (viewPo) {
        viewPo.isChecked = val;
      }

      Vue.nextTick(function () {
        setTimeout(function () {
          musicAreaSize();
        }, 300);
      });
    },

    cmd: function (val) {
      if ("A" == val) {
        this.setStyle("restore");
        this.inpdisable = false;
      } else {
        this.inpdisable = true;
      }
    },

    // ———————————————————————————————————————— 分割线 __watch ————————————————————————————————————————
    'm.panzoom.scale'(scale) {
      if (scale >= 150) this.m.panzoom.scale = 150
      if (scale <= 50) this.m.panzoom.scale = 50
      // $('#target').css({
      //   height: $('.nobrk').height() * mScale + 'px',
      //   // width: $('.nobrk').width() * mScale + 'px'
      // })
    },
    async 'm.id'(id) {
      if (!id) return
      const res = await request({ url: `/musicals/${content_vue.m.id}` })
      console.log(res)
      // const url = FILE_URL + '/public:' + btoa(encodeURI(res.abc_json_val.replace(/^(public:)/, '')))
      const url = res.abc_json_val?res.abc_json_val.url:'';
      // console.log(this.m.scoreOpts)
      this.m.scoreOpts = Object.assign(this.m.scoreOpts, res.base_info?.initOpts)
      if (res.base_info?.lyricStyle) {
        Object.assign(this.m.lyric.style, res.base_info.lyricStyle)
      }
      console.log(content_vue.m.scoreOpts);
      const abcCode = await request({ url })
      $('#source').val(abcCode)
      abc_change()
      log = []
      var music_type = res?.music_type;
      if(music_type){
        content_vue.m.scoreOpts.musicType = music_type
      }
      // console.log('music_type', content_vue.m.scoreOpts?.musicType);
      setTimeout(()=>{
        changeStaffType(null, music_type === "easy" ? 2 : 0) | restoreEditor();
      }, 10)
    },
    'm.reqs': (function() {
      let timer = null
      return function(reqs) {
        clearTimeout(timer)
        if (reqs > 0) {
          timer = setTimeout(() => {
            document.querySelector('html').classList.add('cursor-wait')
            document.querySelector('body').classList.add('pointer-events-none')
          }, 300)
        } else {
          document.querySelector('html').classList.remove('cursor-wait')
          document.querySelector('body').classList.remove('pointer-events-none')
        }
      }
    })(),
    'm.saveToScore.title'(title) {
      if (!title) {
        this.m.saveToScore.repeatList = []
      }
    },
    'm.saveToScore.isShow'(isShow) {
      if (!isShow) {
        this.m.saveToScore.title = ''
      }
    },
    'm.editor.type'(val, type) {
      if (val) {
        this.$nextTick(() => {
          $('#editor').focus()
        })
      }
      else {
        if (this.m.editor.isEsc) {
          this.m.editor.isEsc = false
          return
        }
        if (type === 'lyric' || type === 'lyric2') {
          const s = this.m.editor.s || syms[this.m.editor.lyricIndex]
          updateLyrics(s, this.m.editor.val.split('\n'))
          this.m.editor.val = ''
          this.m.editor.s = 0
          this.m.editor.lyricIndex = 0
          return
        }
        if (!this.m.editor.val) {
          return alert({
            title: '标题',
            subTitle: '副标题',
            compose: '曲作者',
            lyricist: '词作者'
          }[type] + '不能为空')
        }
        const abcCode = $('#source').val()
        const replaceRegs = {
          title: /(?<=T:\s*).+/,
          subTitle: /(?<=T:.+\nT:\s*).+/,
          compose: /(?<=C:\s*).+/,
          lyricist: /(?<=C:.+\nC:\s*).+/
        }
        const strMatch = abcCode.match(replaceRegs[type])
        const [str] = strMatch
        const start = strMatch.index
        const end = str.length + start
        const newCode = replaceCharsInRange(abcCode, start, end, this.m.editor.val)
        $('#source').val(newCode)
        abc_change()
        this.m.editor.val = ''
        this.m.editor.s = 0
        this.m.editor.lyricIndex = 0
      }
    },
    'm.scoreOpts.speedType'(val) {
      this.changeSpeed()
    },
    'm.scoreOpts.speedNote'() {
      this.changeSpeed()
    },
    'm.scoreOpts.speedNum'() {
      this.changeSpeed()
    },
    "m.key.val"(val) {
      const valueSelector = this.m.key.list.find(
        (item) => item.val === val
      )?.valueSelector;
      $(`.keyChoice[value="${valueSelector}"]`).click();
      changeYG(val, "doPos2");
      changeZKey();
    },
    async "m.myScore.isShow"(isShow) {
      if (isShow) return this.updateMyScoreList();
    },
    "m.myScore.query.fu_music_type"() {
      this.m.myScore.query.page = 1;
    },
    "m.ctxMenu.isShow"(isShow) {
      if (isShow) return;
      this.m.ctxMenu.addBarShow = false;
    },
    "m.key.previewV"(val) {
      const valueSelector = this.m.key.list.find(
        (item) => item.val === val
      )?.valueSelector;
      $(`.keyChoice[value="${valueSelector}"]`).click();
      changeYG(val, "doPos2");
      changeZKey();
    },
    "m.isMusicNoteShow": (function () {
      let timer = null;
      return function (isShow) {
        if (timer) clearTimeout(timer);
        leftPanelClick(".left-show-img", !isShow);
        timer = setTimeout(resizeStaff, 500);
      };
    })(),
    "m.lyric": {
      handler: setLyricStyle,
      deep: true,
    },
    "m.newScore.scoreOptsShow"(isShow) {
      if (!isShow) {
        const scoreOpts = {
          title: "",
          subTitle: "",
          compose: "",
          lyricist: "",
          isWeak: false,
          weakBarTop: "1",
          weakBarBot: "4",
          keySign: "C",
          beatNote1: "4",
          beatNote2: "4",
          beatType: "custom",
          musicType: "easy",
          speedType: "txt",
          speedText: "Moderato",
          speedNote: "1/4",
          speedNum: "88",
          rows: "2",
          rowBars: "4",
        };
        for (const key in scoreOpts) {
          this.m.newScore.scoreOpts[key] = scoreOpts[key];
        }
      }

      this.$refs.previewIframeRef?.contentWindow.postMessage(
        this.m.newScore.scoreOpts,
        "*"
      );
    },
    "m.newScore.scoreOpts": {
      handler(val) {
        this.$refs.previewIframeRef?.contentWindow.postMessage(val, "*");
      },
      deep: true,
    },
    "m.newScore.scoreOpts.rowBars"(num) {
      this.m.foldLine.line = num;
    },
    'm.foldLine.show'(show) {
      if (show) {
        const num = this.m.foldLine.previewV
        $("#barsperstaff").val(num);
        var newContent = handleBreakLine($("#source").val(), num);
        $($("#source")).val(newContent);
        abc_change();
      } else {
        const num = this.m.foldLine.line
        $("#barsperstaff").val(num);
        var newContent = handleBreakLine($("#source").val(), num);
        $($("#source")).val(newContent);
        abc_change();
      }
    },
    "m.foldLine.previewV"(num) {
      $("#barsperstaff").val(num);
      var newContent = handleBreakLine($("#source").val(), num);
      $($("#source")).val(newContent);
      abc_change();
    },
    // 'm.foldLine.line'(num) {
    //     $('#barsperstaff').val(num)
    //     var newContent = handleBreakLine($('#source').val(), num);
    //     $($('#source')).val(newContent);
    //     abc_change()
    //   }
  },
  components: {
    FileUpload: VueUploadComponent,
    // 文件上传组件
  },
  created: function () {
    var that = this;
    Vue.nextTick(function () {
      // initBodyHeight();
      setAttrPanelHei();
      $(window).click(function () {
        $(".mf-click-box").remove();
      });
    });
    // 加载常用功能
    this.loadUsuallyFunc();

    this.isExe = getUrlParameter("IS_EXE") == "1";

    this.abcSel = new AbcSel(function (first, end) {
      if (first >= 0 && end >= 0) {
        var obj = new Object();
        obj.startNodeIndex = first;
        obj.endNodeIndex = end;
        that.musicFormObj = obj;

        // 保存结束之后置空 -- beg
        for (var key in that.musicForm) {
          that.musicForm[key] = "";
        }
        $("#mfForm")[0].reset();
        $("#bgcolor").css({
          "background-color": "#fff",
        });
        // 保存结束之后置空 -- end

        // create by lhj 曲式参数
        console.log("abcSel曲式参数:");
        that.musicForm.startNodeIndex = first;
        that.musicForm.endNodeIndex = end;

        var currRegionData = buildRegionData(that, first, end);
        currRegionData.groupid = that.fileUpload.fileData.groupid = uuid();
        copyJson(currRegionData, that.musicForm);
        that.cmd = "A";

        var flag = that.validMusicForm();
        if (!flag) {
          return;
        }
        $("#MUSIC_FORM_div").modal();
      }
    }, ".right-top-content");

    // 初始化工具栏
    this.initToolList();

    var isJxbz = getUrlParameter("isJxbz");
    var musicType = getUrlParameter("musicType");
    if (isJxbz == "1") {
      this.isJxbz = true;
      if (musicType) {
        Vue.nextTick(function () {
          switch (musicType) {
            case "0":
              $(".tools-li[title=五线谱]").click();
              break;
            case "1":
              $(".tools-li[title=简线混排]").click();
              break;
            case "2":
              $(".tools-li[title=简谱]").click();
              break;
          }
        });
      }
    }
  },
  async mounted() {
    this.m.isMusicNoteShow = true;
    window.alert = (msg) => {
      this.m.alertMsg = msg;
    };
    const params = new URLSearchParams(location.search);
    this.m.id = params.get('id') || ''
    if (!params.get("scoreOpts") && !this.m.id) {
      this.m.newScore.musicType.show = true;
    }
    this.m.token = params.get('token') || localStorage.getItem("token") || '';
    localStorage.setItem("token", this.m.token);
    if (Object.keys(scoreOpts).length) {
      $("#source").val(getAbcTemplateCode(scoreOpts));
      let keySign = scoreOpts.keySign;
      if (keySign.includes("#")) keySign = [...keySign].reverse().join("");
      this.m.key.val = keySign;
      this.m.key.previewV = keySign;
      this.m.foldLine.line = scoreOpts.rowBars;
      this.m.foldLine.previewV = scoreOpts.rowBars;
    }
    document.addEventListener("keydown", (e) => {
      if (["TEXTAREA", "INPUT"].includes(e.target.tagName)) return;
      this.emitNumKeybordFn(e.code);
      this.listenKeydown(e);
    });
    this.changeNumKeypadSelect();
    const event = () => {
      this.changeNumKeypadSelect();
      this.initCtxMenu();
      this.changeSelectNote();
      this.changeSelectBar();
      this.getSpeed()
      setLyricStyle();
      setTimeout(() => {
        this.m.isInsertMode = draw_editor;
        // updateLastSelect()
      });
      $('.nobrk').css({ cursor: `url(assets/music_score_editor/img/${!draw_editor ? 'black' : 'blue'}.png), auto` })
      changeSelectNoteStyle();
    };
    document.addEventListener("keydown", e => {
      window._isCtrl = e.ctrlKey
    });
    document.addEventListener("keyup", e => {
      window._isCtrl = e.ctrlKey
    })
    document.addEventListener("keyup", event);
    document.addEventListener("click", event);
    // this.initPanZoom();

    function dragMoveListener (event) {
      console.log(event)
      if (!_isCtrl) return
      var target = event.target;
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

      // update the position attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
    setTimeout(function(){
      // 延迟加载防止报错
      interact('#target').draggable({
        // inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
          }),
        ],
        autoScroll: true,
        onmove: dragMoveListener,
      });
    }, 200);
    
  },
});

/**
 * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串 sHex为传入的十六进制的色值
 * alpha为rgba的透明度
 */
function colorRgba(sHex, alpha) {
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  let sColor = sHex.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    // return sColorChange.join(',')
    // 或
    return "rgba(" + sColorChange.join(",") + "," + (alpha ? alpha : 1) + ")";
  } else {
    return sColor;
  }
}

function abcLoadCball() {
  var that = content_vue;
  if (that.abcSel.action == "open") {
    that.abcSel.open();
  } else if (that.abcSel.action == "close") {
    that.abcSel.close();
  }
  that.abcSel.action = "";

  if (that.showMusicForm || that.abcSel.isOpen) {
    var abcContent = $("#source").val();
    var mf = getAbcKeyValue(abcContent, "%%musicform");
    if (mf) {
      mf = JSON.parse(mf);
      renderMusicForm(mf, scale, that.abcSel.isSelNote);
    }
  }
}

// 设置曲式内容
function setMusicForm() {
  var level = $("#musicFormLevel").val();
  var desc = $("#musicFormDesc").val();
  var title = $("#musicFormTitle").val();
  var color = $("#mfColor").val() || "";
  color = colorRgba("#" + color, "0.6");
  var obj = content_vue.musicFormObj;
  if (desc && obj.startNodeIndex >= 0 && obj.endNodeIndex >= 0) {
    obj.desc = desc;
    obj.title = title;
    obj.color = color;
    if (obj.isEdit) {
      delete obj.isEidt;
      if (mfSetting && mfSetting.length > 0) {
        for (var i = 0; i < mfSetting.length; i++) {
          var mf = mfSetting[i];
          if (
            mf.startNodeIndex == obj.startNodeIndex &&
            mf.endNodeIndex == obj.endNodeIndex &&
            mf.level == obj.level
          ) {
            obj.level = level;
            mfSetting[i] = obj;
            break;
          }
        }
      }
    } else {
      obj.level = level;
      mfSetting.push(obj);
    }
    $("#musicFormDesc").val("");
    renderMusicForm(mfSetting, scale, content_vue.abcSel.isSelNote);
  }
}

// 点击某个曲式
function mfClick(e) {
  var that = content_vue;
  if (!that.abcSel.isOpen) {
    return;
  }
  var left = e.pageX;
  var top = e.pageY;
  var cn = e.currentTarget.className.split(" ")[1];
  var divstr =
    '<div class="mf-click-box" style="left: ' +
    left +
    "px;top: " +
    top +
    'px;"><li onclick="editMF(\'' +
    cn +
    "')\">编辑</li>";
  divstr +=
    '<li onclick="musicFormPreview()">预览</li><li onclick="delMF(\'' +
    cn +
    '\')">删除</li><li onclick="delAllMF()">全部删除</li>';
  divstr += "</div>";
  $(".mf-click-box").remove();
  $("body").append(divstr);

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
function musicFormPreview() {
  var widHei = window.top.getPopWidHei(9999, 9999);
  var id = "musicformIframe";
  var url = "assets/music_score_editor/musicform/music_form_show_qp.html?iframeId=" + id;
  window.top.$.popBigWindow(id, url, "曲式分析预览", function () {}, {
    width: widHei.width * 0.8,
    height: widHei.height * 0.9,
    isIframe: true,
    isAriaHidden: true,
  });
}
function musicFormEdit() {
  var widHei = window.top.getPopWidHei(9999, 9999);
  var id = "musicformEditIframe";
  var url = "assets/music_score_editor/musicform/music_form_edit_qp.html?iframeId=" + id;
  window.top.$.popBigWindow(
    id,
    url,
    "曲式分析编辑",
    function (mf) {
      var abcContent = $("#source").val();
      if (mf && mf.length > 0) {
        abcContent = setAbcKeyValue(
          abcContent,
          "%%musicform",
          JSON.stringify(mf)
        );
      } else {
        abcContent = removeAbcKeyValue(abcContent, "%%musicform");
      }
      $("#source").val(abcContent);
      src_change();
    },
    {
      width: widHei.width,
      height: widHei.height,
      isIframe: true,
      isAriaHidden: true,
      isCloseBtn: 0,
    }
  );
}

// 选择“编辑”曲式
function editMF(cn) {
  var that = content_vue;
  var obj = {
    startNodeIndex: cn.split("-")[1] - 0,
    endNodeIndex: cn.split("-")[2] - 0,
    level: cn.split("-")[3] - 0,
    isEdit: true,
  };
  $("#musicFormLevel").val(obj.level);
  $("#musicFormTitle").val($("." + cn + ":eq(0) > div").text());
  $("#musicFormDesc").val($("." + cn + ":eq(0) > div").attr("title"));
  that.musicFormObj = obj;

  // create by lhj 获取当前区域块的信息
  that.cmd = "U";
  var id = $("." + cn).attr("data-id");
  if (mfSetting && mfSetting.length) {
    var po = mfSetting.find(function (item) {
      return item.id == id;
    });

    if (po) {
      copyJson(po, that.musicForm);
    }

    if (po && po.groupid) {
      (function (gId, that) {
        getFile(gId, function (arr) {
          var files = arr[gId];
          for (var i = 0; i < files.length; i++) {
            that.fileUpload.showFiles.push(files[i]);
          }
        });
      })(po.groupid, that);
    } else {
      that.musicForm.groupid = that.fileUpload.fileData.groupid = uuid();
    }
  }

  $("#MUSIC_FORM_div").modal();
}

// 删除曲式
function delMF(cn) {
  swConfirm("确定要删除吗？", "", function (isConfirm) {
    if (isConfirm) {
      var sn = cn.split("-")[1];
      var en = cn.split("-")[2];
      var level = cn.split("-")[3];
      if (mfSetting && mfSetting.length > 0) {
        for (var i = 0; i < mfSetting.length; i++) {
          var mf = mfSetting[i];
          if (mf.startNodeIndex == sn && mf.endNodeIndex == en) {
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
  });
}

// 删除全部曲式
function delAllMF() {
  swConfirm("确定要删除全部内容吗？", "", function (isConfirm) {
    if (isConfirm) {
      mfSetting = new Array();
      $(".music-form").remove();
    }
  });
}

$(".tbjpsz").click(function () {
  $(this).find("img").toggleClass("hide");
});

// 左边列表收起、展开按钮
$(".left-show-img").click(function () {
  var isCurrOpenState = $(this).attr("src").indexOf("left") > -1;
  leftPanelClick(
    this,
    isCurrOpenState,
    function () {
      content_vue.symbolPanelShow = false;
    },
    function () {
      content_vue.symbolPanelShow = true;
    }
  );
  if (content_vue.abcSel.isOpen) {
    content_vue.abcSel.reBuild();
  }
});

function leftPanelClick(obj, isCurrOpenState, closeCb, openCb) {
  console.log(obj, isCurrOpenState);
  if (isCurrOpenState) {
    // 当前展开状态
    $(obj).attr("src", "assets/music_score_editor/images/right.png");
    $(".body-left").css({
      width: 0,
      "min-width": 0,
    });
    $(".bottom-box").css("left", 0);
    if($("#noteInput").length && $("#noteInput").css("left")){
      var left = $("#noteInput").css("left").replace("px", "");
      if (-left > 3905 - $(window).width()) {
        left = -(3905 - $(window).width());
        $("#noteInput").css("left", left + "px");
      }
    }
    return typeof closeCb == "function" && closeCb();
  } else {
    // 当前收起状态
    $(obj).attr("src", "assets/music_score_editor/images/left.png");
    $(".body-left").css({
      width: "220px",
      "min-width": "220px",
    });
    $(".bottom-box").css("left", "220px");
    return typeof openCb == "function" && openCb();
  }
}

// 弹出、隐藏工具栏下拉框
$(".tool-title").click(function (e) {
  hideMenu();
  $(".pulldown-tool-list").toggleClass("hide");
  // 阻止事件冒泡
  e.stopPropagation();
});

// 左边列表点击展开、收起
$(".body-left ul li").click(function () {
  $(this).children(".arrow").toggleClass("arrow-down");
  $(this).children("span").toggleClass("left-hide-content-show");
  $(this).find(".left-hide-content").toggleClass("left-hide-content-show");
});

// 阻止事件冒泡，收起列表
$(".left-hide-content").click(function (e) {
  e.stopPropagation();
});

// 点击任意地方隐藏工具栏下拉框
$(document).click(function () {
  $(".pulldown-tool-list").addClass("hide");
  $(".menu-pulldown-box").hide();
  $("#pytb").removeClass("menu-pressed");
  $("#instrument").removeClass("menu-pressed");
  $("#playInstrument").removeClass("menu-pressed");
  $(".menu-list-other").addClass("hide");
});

// 初始化body-box的高度
function initBodyHeight() {
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
function hideMenu() {
  $(".pulldown-tool-list").addClass("hide");
  $(".menu-pulldown-box").hide();
  $("#pytb").removeClass("menu-pressed");
  $("#instrument").removeClass("menu-pressed");
  $("#playInstrument").removeClass("menu-pressed");
  $(".menu-list-other").addClass("hide");
}

// 设置属性面板的高度
function setAttrPanelHei() {
  Vue.nextTick(function () {
    setTimeout(function () {
      var attrHei = $(window).height() - 130;
      if (!$(".bottom-box").hasClass("bottom-box-hide")) {
        attrHei += -$(".keyboard-bar").height() - $(".keyboard-box").height();
      }
      $(".body-attr").height(attrHei);
    }, 300);
  });
}

//曲谱曲式分析编辑 -----------------beg
//构建时间片段数据
function buildRegionData(that, startNodeIndex, endNodeIndex) {
  //	1.1、判断是否被包含在时间片段内，若是则以当前时间片段作为父级片段，反之为父级时间片段（pid:0）
  //	1.2、排序号:以父级排序号开始+001，表第一个子节点，以此类推往后累加
  var musicFormList = mfSetting;
  // 开始时间在谁的范围内就是谁的子级
  var arr = musicFormList.filter(
    (item) =>
      startNodeIndex >= item.startNodeIndex &&
      startNodeIndex <= item.endNodeIndex
  );

  // 取当前最小时间片段作为父级
  var arr2order = arr.sort((a, b) => {
    return (
      a.endNodeIndex - a.startNodeIndex - (b.endNodeIndex - b.startNodeIndex)
    );
  });
  //debugger;
  var po = arr2order[0];
  // 判断如果超过父级的结束时间那么就取父级的结束时间
  if (po && endNodeIndex > po.endNodeIndex) {
    //	that.currRegion.endNodeIndex = endNodeIndex = po.endNodeIndex;
    // 切换当前的wave区域的结束时间 也要改变
  }

  //console.log(po)
  var data = {};
  data.id = uuid();
  data.startNodeIndex = startNodeIndex;
  data.endNodeIndex = endNodeIndex;
  data.bgcolor = "";
  data.fieldname = "";
  data.fielddesc = "";
  var str = "000";
  if (po) {
    var tmpArr = musicFormList.filter((item) =>
      new RegExp(po.orderby + "\\d{1,}", "g").test(item.orderby)
    );
    var order = tmpArr.length + 1 + "";
    data.pid = po.id;
    data.orderby =
      po.orderby + "" + str.slice(0, str.length - order.length) + "" + order;
  } else {
    data.pid = 0;
    var tmpArr = musicFormList.filter((item) =>
      new RegExp("^\\d{3}$", "g").test(item.orderby)
    );
    var order = tmpArr.length + 1 + "";
    data.orderby = str.slice(0, str.length - order.length) + "" + order;
  }
  return data;
}

//用于生成uuid
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
//生成uuid
function uuid() {
  return (
    S4() + S4() + "" + S4() + "" + S4() + "" + S4() + "" + S4() + S4() + S4()
  );
}

/**
 * 复制对象
 *
 * @param obj
 * @returns
 */
function clone(obj) {
  if (!obj) {
    return obj;
  }
  return JSON.parse(JSON.stringify(obj));
}

function copyJson(source, target, isKeyInTarget) {
  if (!source) {
    return target;
  }
  if (!target) {
    target = {};
  }
  for (var key in source) {
    if (
      isKeyInTarget &&
      isKeyInTarget != undefined &&
      target[key] == undefined
    ) {
      continue;
    }
    var cvalue = source[key];
    if (isJson(cvalue)) {
      if (cvalue.length != undefined) {
        // 数组
        var newArr = new Array();
        for (var i = 0; i < cvalue.length; i++) {
          newArr.push(copyJson(cvalue[i]));
        }
        target[key] = newArr;
      } else {
        target[key] = copyJson(cvalue);
      }
    } else {
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
  } catch (e) {}
  return false;
}

//曲谱曲式分析编辑 -----------------end
/**
 * 获取abc内容
 */
var getAbcContentObj = function () {
  return {
    abcContent: $("#source").val(),
    musicType: musicType,
  };
};

/**
 * @param {number} start
 * @param {number} end
 * @returns {(cb: (str: string) => string) => void}
 */
const getChangeStrFn = (start, end) => (cb) => {
  const selectStr = $("#source").val().slice(start, end);
  const newCode = replaceCharsInRange(
    $("#source").val(),
    start,
    end,
    cb(selectStr)
  );
  $("#source").val(newCode);
  abc_change();
};

/**
 * 获取小节列表
 * @param {Vocal} vocal
 */
const getBarList = ({ index: vocalIndex, barListStr, start: vocalStart }) => {
  const { 0: lastMeterStr, index: lastMeterStrStart } = $("#source")
    .val()
    .match(/(?<=M:\s*)[^\s]+/);
  const lastMeterStrEnd = lastMeterStrStart + lastMeterStr.length;
  let lastMeterValue = "";
  if (lastMeterStr === "C") lastMeterValue = "4/4";
  else if (lastMeterStr === "C|") lastMeterValue = "2/2";
  else lastMeterValue = lastMeterStr;
  let lastMeter = {
    str: lastMeterStr,
    value: lastMeterValue,
    start: lastMeterStrStart,
    end: lastMeterStrEnd,
    isGlobal: true,
    isExtend: true,
    change: getChangeStrFn(lastMeterStrStart, lastMeterStrEnd),
  };
  const barList = barListStr
    .match(/[^\|]+(?:\|\||\|\]|:\|\|:|:\||\|)\$*/g)
    .map((barStr) => {
      const barLineStr = barStr.match(/\|\||\|\]|:\|\|:|:\||\|/)[0];
      barStr = barStr.replace(/\|\||\|\]|:\|\|:|:\||\|/, '')
      const barStrStart = barListStr.indexOf(barStr) + vocalStart;
      const barStrEnd = barStrStart + barStr.length
      const barLineStrStart = barStr.indexOf(barLineStr) + barStrStart;
      const barLineStrEnd = barLineStrStart + barLineStr.length;
      const barLine = {
        barLineStr,
        start: barLineStrStart,
        end: barLineStrEnd,
        change: getChangeStrFn(barLineStrStart, barLineStrEnd),
      };

      const meter = { ...lastMeter, isExtend: true };
      const meterMatch = barStr.match(/(?<=\[M:)[^\]]+/);
      if (meterMatch) {
        const meterStr = meterMatch[0];
        meter.isExtend = true;
        meter.str = meterStr;
        meter.currentMeter = meterStr;
        meter.value = meterStr.match(/\d+/g);

        if (meter.str === "C") meter.value = "4/4";
        else if (meter.str === "C|") meter.value = "2/2";
        else meter.value = meterStr.match(/\d+/g);

        const meterStrStart = barStr.indexOf(meterStr) + barStrStart;
        meter.start = meterStrStart;
        meter.end = meterStrStart + meterStr.length;
        meter.isGlobal = false;
        lastMeter = { ...meter };
      }
      // meter.change = () => {
      //   if (meter.isExtend) {
      //     barStr = str.replace(regexp, `${meter}`);
      //   } else {
      //     barStr = `[${meter}] ${barStr}`;
      //   }
      //   return str;
      // };

      barListStr = barListStr.replace(barStr, "操".repeat(barStr.length));
      return {
        vocalIndex,
        barStr,
        change: getChangeStrFn(barStrStart, barStrEnd),
        start: barStrStart,
        end: barStrEnd,
        barLine,
        meter,
        isBr: barStr.includes("$"),
      };
    });
  return barList;
};

/**
 * 获取声部列表
 * @returns {Vocal[]}
 */
const getVocalList = () => {
  let vocalList = $("#source")
    .val()
    .replace(/%%.+\n*/g, "")
    .match(/V:\d+\s*\n.+/g);
  if (!vocalList) return [];
  let abcCode = $("#source").val();
  vocalList = vocalList.map((vocalStr) => {
    const index = +vocalStr.match(/(?<=V:\s*)\d+/);
    const barListStr = vocalStr.replace(/V:\d+\s*\n*/, "");
    const vocalStart = abcCode.indexOf(barListStr);
    const vocalEnd = vocalStart + barListStr.length;

    const keySign = $("#source")
      .val()
      .match(eval(`/(?<=V:${index}\\s*)treble|bass|alto|tenor/`))[0];
    const vocal = {
      index,
      vocalStr,
      barListStr,
      change: getChangeStrFn(vocalStart, vocalEnd),
      start: vocalStart,
      end: vocalEnd,
      keySign,
    };
    let barList = getBarList({ ...vocal })
    vocal.barList = barList.map((item, i) => {
      item.next = barList[i + 1] || null;
      item.prev = barList[i - 1] || null;
      return item
    })
    abcCode = abcCode.replace(vocalStr, "操".repeat(vocalStr.length));
    return vocal;
  });
  return vocalList;
};

const getAllBarList = () => getVocalList().map(item => item.barList).flat();
const getSelectBar = () => {
  const selectBarEl = $('[type="rectnode"]')
  if (!selectBarEl.length) return alert('未选中小节：请选取一个小节，然后重试')
  let barIndex = selectBarEl.attr('barIndex')
  if (barIndex === undefined) barIndex = selectBarEl.attr('barindex')
  if (barIndex === undefined) return alert('未选中小节：请选取一个小节，然后重试')
  const barId = selectBarEl.attr('id')
  const [vocalI, barI] = barId.match(/\d+/g).map(item => +item)
  const vocalList = getAllBarList().filter(item => item.vocalIndex === +vocalI + 1)
  return vocalList[barI]
}

const changeSelectBar = (cb, isRepeatAndJmp = false) => {
  const bar = getSelectBar(isRepeatAndJmp)
  if (bar === undefined) return
  return bar.change(cb)
}
const setRepeatAndJump = (sign) => {
  const bar = getSelectBar()
  if (bar === undefined) return
  (bar.prev || bar).change(s => {
    console.log(s)
    return s.replace(/((\!fine\!)|(\!D\.S\.\!)|(\!D\.C\.((alfine)|(alcoda))*\!)|(\!(to)?coda\!)|(\!segno\!)(:?\|)?)$/, '') + sign
  })
}

const setRepeatBracket = (sign) => {
  console.log('setRepeatBracket', sign)
  const node_indexs = getSelectAbcNodeIndes();
  // console.log(node_indexs);
  if(node_indexs.length){
    var str1 = '';
    var str2 = '';
    if(typeof sign == 'object'){
      str1 = sign[0];
      str2 = typeof sign[1]!='undefined'?sign[1]:'';
    }else{
      str1 = sign;
    }
    var content = $("#source").val();
    var lines = getNodesInfo(content);
    // console.log('lines', lines);
    for(var i = 0; i<lines.length; i++){
      if(lines[i].type=='note' && lines[i].v==0){
        // console.log('note');
        for(var j=0; j<lines[i].nodes.length; j++){
          if(lines[i].nodes[j].nodeIndex==node_indexs[0]){
            content = replaceCharsInRange(content, lines[i].nodes[j].startSeq, lines[i].nodes[j].startSeq, str1);
            if(node_indexs.length==1){
              content = replaceCharsInRange(content, lines[i].nodes[j].endSeq+str1.length-1, lines[i].nodes[j].endSeq+str1.length-1, str2);
              break;
            }
          }
          if(lines[i].nodes[j].nodeIndex==node_indexs[node_indexs.length-1]){
            content = replaceCharsInRange(content, lines[i].nodes[j].endSeq+str1.length-1, lines[i].nodes[j].endSeq+str1.length-1, str2);
            break;
          }
        }
        // console.log(content);
        $("#source").val(content);
        abc_change();
        break;
      }
    }
  }
}

/**
 * @typedef {Object} Meter - 节拍
 * @property {string} str - 节拍字符串
 * @property {string} value - 节拍值
 * @property {number} start - 节拍在abc中的起始位置
 * @property {number} end - 节拍在abc中的结束位置
 * @property {boolean} isGlobal - 是否为全局节拍
 * @property {boolean} isExtend - 是否为继承的节拍
 */

/**
 * @typedef {Object} BarLine - 小节线
 * @property {string} barLineStr - 小节线字符串
 * @property {number} start - 小节线在abc中的起始位置
 * @property {number} end - 小节线在abc中的结束位置
 * @property {(cb: (str: string) => string) => void} change - 修改小节线字符串
 */

/**
 * @typedef {Object} Bar - 小节
 * @property {number} vocalIndex - 所在声部
 * @property {string} barContStr - 小节内容字符串
 * @property {string} barStr - 小节字符串
 * @property {number} start - 小节在abc中的起始位置
 * @property {number} end - 小节在abc中的结束位置
 * @property {boolean} isBr - 是否换行
 * @property {Meter} meter - 小节的节拍
 * @property {BarLine} barLine - 小节的小节线
 * @property {Bar} next - 下一个小节
 * @property {Bar} prev - 上一个小节
 * @property {(cb: (str: string) => string) => void} change - 修改小节字符串
 */

/**
 * @typedef {Object} Vocal - 声部
 * @property {string} index - 所在声部
 * @property {string} vocalStr - 声部字符串
 * @property {string} barListStr - 声部中的小节字符串
 * @property {Bar[]} barList - 声部中的小节列表
 * @property {number} start - 声部在abc中的起始位置
 * @property {number} end - 声部在abc中的结束位置
 * @property {string} keySign - 声部的调号
 * @property {(cb: (str: string) => string) => void} change - 修改声部中的小节字符串
 */

// abc2svg - ABC to SVG translator
// @source: https://chiselapp.com/user/moinejf/repository/abc2svg
// Copyright (C) 2014-2018 Jean-Francois Moine - LGPL3+
var lineNum = 0;
var barVoiceNumArr = []; // 获取小节内的最高的声部
var sameLineDim = {}; // 同一行出现渐强渐弱只保留一个的高度
var isVoiceMerge = false; // 是否声部合并
var myspace = 1; //音符间距，在简谱时，单线模式下singleline，要加大音符间距，可以修改这个值
var contralPage = 1;
var showHelpNote = false; //显示音符输入帮助
// 是否含有简谱
// var musicType = 1;
var my_node_index = 0;
var lastFirstNoteSeq = -1; //最后一次渲染的谱子的首个音符的位置
var glbCurS = null;
var lineyArr = []; // "起始值,终止值"："低音的坐标"
var isChordScore = false; // 是否和弦谱
var firstMeterWidth = -10; //第一个节拍标记占用的宽度
var isStave = false; //是否大谱表;
var hasTempo = false; //是否绘制过速度，该变量用于简谱或简线混排时，如果已经绘制过速度，则不再为简谱和简线混制放速度的位置重新定位
var lastMeter = ""; //最后一次节拍，该 变量用于简谱及简线混排时，只要节拍有变化，就要重新绘制
var lastTone = ""; //最后一次调号，该 变量用于简谱及简线混排时，只要调号有变化，就要重新绘制
var currMeter = new Array(); //当前拍号
var nodeBeatTotal = 0; //小节拍数总数
var lastNoteBeatSeq = -1; //上一个音符拍点序号
var showBeat = false; //是否显示强弱标记
var showKew = false; //是否显示柯尔文标记
var nodeKewMap = new Map(); //小节内柯尔文
var showSD = false; //是否显示竖笛
var showSD8 = false; //是否显示8孔竖笛
var firstNodeNotes = new Array(); //第一小节音符（这里存储第一小节音符是为了判断如果是弱起小节，则需要调整强弱记号）
var isInFirstNode = true; //是否是第一小节音符的标记
var isTi1 = 0; //是否有连音标记
var renderStaffMeterCount = 0; //五线谱拍号渲染次数
var currentKey = "";
var currentKSF = 0;
var staffOriKSF = 9999; //谱子的原始ksf值（移调前）
var staffKSF = 9999; //谱子的真实ksf值
var cresc = false; //是否在渐强的标记包围中
var dim = false; //是否在渐弱的标记包围中
var notAutoSFBarSeq = -1; //是否自动设置强弱标识（如果有人工设置强弱标识，则不自动设置，一个小节内只要有一个音符有人工设置，则整个小节不再自动设置强弱标识）
var beatModel5 = "";
var beatModel7 = "";
var syncopeArr = new Array(); //存储最后一个切分音的信息（每个切分音符的下标）
var preBarNotes = new Array(); //存储上一个小节的所有音符，用于判断是否有切分音，如果有，则需重新标识强弱
var T_url = ""; //标题的url
var C_url = ""; //作曲的Url
var Q_url = ""; //速度的Url
var M_url = ""; //拍号url
var K_url = ""; //调号url
var treble_url = ""; //高音谱号url
var bass_url = ""; //低音谱号url
var alto_url = ""; //中音谱号url
var tenor_url = ""; //次中音谱号url
var voice_slurs = new Array(); //跨声部的连音线
var arp_links = new Array(); //跨声部琶音
var bezier_slurs_left = new Array(); //跨声部贝赛尔连音线-左括号
var bezier_slurs_right = new Array(); //跨声部贝赛尔连音线-右括号
var staff_slurs_left = new Array(); //普通的跨声部连音线-左括号
var staff_slurs_right = new Array(); //普通的跨声部连音线-右括号
var bracketsArr = new Array(); //左右括号，该变量用于存已经出现过的左右括号+istart,用于防止多次渲染括号，比如在反复的小节线上加括号，在一行的末尾渲染一次，下一行的开头又会渲染一次
var customSlur = new Map(); //自定义连音线
var bracketGch = new Map(); //带中括号的注释
var waveGch = new Map(); //带波浪的注释
var voice_slurs_len = 0; //跨声部连音线个数
var arp_link_len = 0; //跨声部琶音个数
var cut_line_flag = false; //是否需要换行标记
var notespace = 1;
var staffsep = 110; //行高（46为默认）
var draw_editor = false; //图形编辑
var graph_update = false; //图形修改
var update_note_istart = -1; //当前编辑音符的istart
var update_note_istart_arr = []; //选中多个音符的istart
var update_note_index = -1; //当前编辑音符的s.notes中的index;
var update_note_index_arr = []; //当前编辑音符的s.notes中的index;

var bgBar = new Array(); //需要背景色的小节
var mb_desc = "-mb-"; //蒙板注释"-mb-rgb(105, 17, 238)"使用这个注释标识小节背景色
var last_bar_time = 0; //上一个小节线的时间
var has_weak_node = false; //是否有弱起小节
var weak_node_dur = 0; //弱起小节时长
var bar_count = 0; //小节
var appname = "/abc/";
var durSetting = 0; //当前选中的时值
var durSettingNotDot = 0; //当前选中的时值（不包括选中符点的时值，在计算点击音符生成休止符时有用到） 2021-3-1
var rest_status = ""; //当前是否是输入休止符
var dot_selected_value = ""; //当前符点状态：空未选中，"3/"选中单个符点，"7//"选中2个符点
var max_st_nodenum = 0; //当前
var curr_tempo = null; //当前速度
var xcoorGchReg = /\{[^\{]*x:\s*(-?\d{1,3})[^\{]*\}/;
var ycoorGchReg = /\{[^\{]*y:\s*(-?\d{1,3})[^\{]*\}/;

//声部小节线是否显示
var bar_visible = new Object();
var show_note_info = false; //是否返回点击的音符信息，返回到前端可做查询用，如点击ppp返回(装饰音ppp)

var lastVabHeight = 0; //上一个高8、15度、低8、15度

var editSvgLineIndex = -1; //当前编辑的svg的行号

var select_note_info = null; //更新状态时选中的

var select_deco_info = null; //选中的装饰音

var curr_wmeasure = 0; //当前的wmeasure值

var clientType = "pc"; //客户端类型：pc电脑端,ios:苹果，android:安卓（在显示I46的时候，要判断客户端类型，ios的会挤在一起）

var singleline = 0;

var last_v = 0; //上一个v

var barLineArray = new Array(); //小节线数据数组，存储小节线的istart及对应的s

var posy_sum = 0; //当前svg距离顶部距离

var myDecoPosArray = new Array(); //自定义的装饰音位置信息  "{'gchtype':'pf','x':0,'y':0}"

var noteBgArray = new Array(); //音符背景色
var noteBgLength = 0; //有设置音符背景色的个数
var nbReg = /-(s|e)-nbl?-(\d+)-(rgb\(.*\))/; //音符背景色设置正则-nbl-1-rgb(105, 17, 238)

var lyricBgReg = /\[(s|e)\.lbl?\.(\d+)\.(rgb\(.*\))\]/; //歌词背景色正则[s.lbl.1.rgb(105, 17, 238)]
var lyricBgLength = 0; //歌词背景色长度
var lyricBgArray = new Array(); //歌词背景色

var lyricColorReg = /\[(rgb\(.[^\[]*\))\]/; //歌词颜色正则[rgb(55,15,255)]

var isGetNoteData = false;

var startLine = 0; //开始渲染行数

var endLine = -1; //结束渲染行数

var lyricStandV = 0; //拷呗歌词%%lyricstandv 1,1表示以第1声部为标准

var standVsyms = null; //保留标准歌词声部的syms，用于在拷贝歌词时对比用

var dragDecoFlag = false; //是否有拖动的装饰音
var dragNumNoteFlag = false; //是否有拖动简谱音符（上下拖动）
if (window.navigator.onLine) {
  appname = "/abc/";
}
var assets_url = "/assets/";
var localurl = location.host;

var source_val = ""; //source的值

var instrMap = new Map(); //声部最后定义的音色，使用"midi115木鱼"来定义音色

var lastDir = 1;

function isContainIP(ip) {
  var reg =
    /((2[0-4][0-9])|(25[0-5])|(1[0-9]{0,2})|([1-9][0-9])|([1-9]))\.(((2[0-4][0-9])|(25[0-5])|(1[0-9]{0,2})|([1-9][0-9])|([0-9]))\.){2}((2[0-4][0-9])|(25[0-5])|(1[0-9]{0,2})|([1-9][0-9])|([1-9]))/;
  return reg.test(ip);
}

if (isContainIP(localurl) || localurl.indexOf("localhost") > -1) {
  //本地地址
  assets_url = "/assets/";
}

var cmFontSize = 14; //唱名字体大小要随着scale的变化而变化
function switchCmFontSize() {
  try {
    if (abc.cfmt().scale >= 2.2 && abc.cfmt().scale < 3) {
      cmFontSize = 12;
    } else if (abc.cfmt().scale >= 3) {
      cmFontSize = 10;
    }
  } catch (e) {}
}
var beatSetting = {
  1: ["strong"],
  2: ["strong", "weak"],
  3: ["strong", "weak", "weak"],
  4: ["strong", "weak", "sec_strong", "weak"],
  5: ["strong", "weak", "weak", "sec_strong", "weak"],
  51: ["strong", "weak", "sec_strong", "weak", "weak"],
  6: ["strong", "weak", "weak", "sec_strong", "weak", "weak"],
  7: ["strong", "weak", "sec_strong", "weak", "sec_strong", "weak", "weak"],
  71: ["strong", "weak", "sec_strong", "weak", "weak", "sec_strong", "weak"],
  72: ["strong", "weak", "weak", "sec_strong", "weak", "sec_strong", "weak"],
  8: [
    "strong",
    "weak",
    "sec_strong",
    "weak",
    "strong",
    "weak",
    "sec_strong",
    "weak",
  ],
  9: [
    "strong",
    "weak",
    "weak",
    "strong",
    "weak",
    "weak",
    "strong",
    "weak",
    "weak",
  ],
  12: [
    "strong",
    "weak",
    "weak",
    "sec_strong",
    "weak",
    "weak",
    "sec_strong",
    "weak",
    "weak",
    "sec_strong",
    "weak",
    "weak",
  ],
};
//扩展的音符char:对应的字符，instr:对应的音色,pitch:对应的音高(字符h使用115号音色，音高为77),show_char:显示的字符
//音色信息
var inst_info = {
  inst_lingu: { inst_code: 134, pitch: 71 }, //铃鼓，最后一个pitch有值，说明只能是134音色库里的71的那个音高才是铃鼓
  inst_pengl: { inst_code: 1020, pitch: -1 }, //碰铃
  inst_shac: { inst_code: 1004, pitch: -1 }, //沙锤
  inst_shanjt: { inst_code: 1018, pitch: -1 }, //三角铁
  inst_shoul: { inst_code: 1000, pitch: -1 }, //手铃
  inst_shuanxt: { inst_code: 1010, pitch: 62 }, //双响筒
  inst_xiangb: { inst_code: 1011, pitch: -1 }, //响板
  inst_xiaojg: { inst_code: 2009, pitch: -1 }, //小军鼓
  inst_feizg: { inst_code: 2013, pitch: -1 }, //非洲鼓
  inst_shuanglin: { inst_code: 0, pitch: -1 }, //双铃
  inst_xiangzhan: { inst_code: 0, pitch: -1 }, //响盏
  inst_xiaojiao: { inst_code: 115, pitch: -1 }, //小叫木鱼
  inst_xiaojiaoxiaoluo: { inst_code: 141, pitch: 69 }, //小叫小锣
  inst_yaoling: { inst_code: 1007, pitch: -1 }, //摇铃
  inst_wamt: { inst_code: 134, pitch: 65 }, //蛙鸣筒
  inst_bo: { inst_code: 5007, pitch: -1 }, //钹
  inst_daluo: { inst_code: 141, pitch: 67 }, //大锣
};
var extnotes = [
  { char: "h", instr: 115, pitch: 77, show_char: "X", pit: 200 },
  { char: "i", instr: 118, pitch: 77, show_char: "仓", pit: 201 },
  { char: "j", instr: 128, pitch: 77, show_char: "才", pit: 202 },
  { char: "K", instr: 141, pitch: 50, show_char: "X", pit: 203 }, //大鼓
  { char: "k", instr: 5027, pitch: 55, show_char: "x", pit: 204 }, //小鼓
  { char: "H", instr: 134, pitch: 69, show_char: "X", pit: 205 }, //沙锤
  { char: "I", instr: 134, pitch: 65, show_char: "X", pit: 206 }, //蛙鸣筒
];

var extnotes2 = [
  //pit那个属性是用来区分不同音符的，类似id的意思，没有实际意义
  { char: "m", instr: 115, pitch: 77, show_char: "X", pit: 100 },
  { char: "n", instr: 115, pitch: 77, show_char: "X", pit: 101 },
  { char: "o", instr: 115, pitch: 77, show_char: "X", pit: 102 },
];
abc2svg = {
  C: {
    BLEN: 1536,
    BAR: 0,
    CLEF: 1,
    CUSTOS: 2,
    GRACE: 4,
    KEY: 5,
    METER: 6,
    MREST: 7,
    NOTE: 8,
    PART: 9,
    REST: 10,
    SPACE: 11,
    STAVES: 12,
    STBRK: 13,
    TEMPO: 14,
    BLOCK: 16,
    REMARK: 17,
    FULL: 0,
    EMPTY: 1,
    OVAL: 2,
    OVALBARS: 3,
    SQUARE: 4,
    SL_ABOVE: 1,
    SL_BELOW: 2,
    SL_AUTO: 3,
    SL_HIDDEN: 4,
    SL_DOTTED: 8,
    SL_CENTER: 9,
  },
  Abc: function (user) {
    "use strict";
    var C = abc2svg.C;
    var require = empty_function,
      system = empty_function,
      write = empty_function,
      XMLHttpRequest = empty_function;
    this.user = user;
    var OPEN_BRACE = 1,
      CLOSE_BRACE = 2,
      OPEN_BRACKET = 4,
      CLOSE_BRACKET = 8,
      OPEN_PARENTH = 16,
      CLOSE_PARENTH = 32,
      STOP_BAR = 64,
      FL_VOICE = 128,
      OPEN_BRACE2 = 256,
      CLOSE_BRACE2 = 512,
      OPEN_BRACKET2 = 1024,
      CLOSE_BRACKET2 = 2048,
      MASTER_VOICE = 4096,
      IN = 96,
      CM = 37.8,
      YSTEP = 256;
    var errs = {
      bad_char: "无法识别的音符标记 '$1'",
      bad_val: "不正确的属性值 $1",
      bar_grace: "倚音内不允许有小节线",
      bad_grace: "倚音定义出错",
      ignored: "$1: inside tune - ignored",
      misplaced: "%%staves 配置错误 '$1'",
      must_note: "!$1! 必需是个音符",
      must_note_rest: "!$1! 必需是个音符或休止符",
      nonote_vo: "No note in voice overlay",
      not_enough_n: "Not enough notes/rests for %%repeat",
      not_enough_m: "Not enough measures for %%repeat",
      //not_ascii: "Not an ASCII character"
      not_ascii: "不是一个有效的ASCII字符,请检查输入音符的全/半角",
    };
    var glovar = {
        meter: {
          type: C.METER,
          wmeasure: 1, //一小节的总的dur
          a_meter: [],
        },
      },
      info = {},
      mac = {},
      maci = new Int8Array(128),
      parse = {
        ctx: {},
        prefix: "%",
        state: 0,
        ottava: [],
        line: new scanBuf(),
      },
      tunes = [],
      psvg;
    function clone(obj, lvl) {
      if (!obj) return obj;
      var tmp = new obj.constructor();
      // update by zhoudc， 2020-08-26，把lvl的判断移到循环外，更快
      // for (var k in obj) if (obj.hasOwnProperty(k)) {
      // if (lvl && typeof obj[k] == "object") tmp[k] = clone(obj[k], lvl - 1);
      // else tmp[k] = obj[k]
      // }

      if (lvl) {
        var cvalue;
        for (var k in obj) {
          if (!obj.hasOwnProperty(k)) {
            continue;
          }

          cvalue = obj[k];
          // 都已经是遍历属性了，不需要再判断属性是否存在了
          if (typeof cvalue == "object") {
            tmp[k] = clone(cvalue, lvl - 1);
          } else {
            tmp[k] = cvalue;
          }
        }
      } else {
        for (var k in obj) {
          if (!obj.hasOwnProperty(k)) {
            continue;
          }
          tmp[k] = obj[k];
        }
      }
      return tmp;
    }
    function errbld(sev, txt, fn, idx) {
      var i, j, l, c, h;
      if (user.errbld) {
        switch (sev) {
          case 0:
            sev = "警告";
            break;
          case 1:
            sev = "错误";
            break;
          default:
            sev = "严重错误";
            break;
        }
        user.errbld(sev, txt, fn, idx);
        return;
      }
      if (idx != undefined && idx >= 0) {
        i = l = 0;
        while (1) {
          j = parse.file.indexOf("\n", i);
          if (j < 0 || j > idx) break;
          l++;
          i = j + 1;
        }
        c = idx - i;
      }
      h = "";
      if (fn) {
        h = fn;
        if (l) h += "行:" + (l + 1) + "列:" + (c + 1);
        h += " ";
      }
      switch (sev) {
        case 0:
          h += "警告: ";
          break;
        case 1:
          h += "错误: ";
          break;
        default:
          h += "Internal bug: ";
          break;
      }
      user.errmsg(h + txt, l, c);
    }
    function error(sev, s, msg, a1, a2, a3, a4) {
      var i, j, regex, tmp;
      if (user.textrans) {
        tmp = user.textrans[msg];
        if (tmp) msg = tmp;
      }
      if (arguments.length > 3)
        msg = msg.replace(/\$./g, function (a) {
          switch (a) {
            case "$1":
              return a1;
            case "$2":
              return a2;
            case "$3":
              return a3;
            default:
              return a4;
          }
        });
      //            if (s && s.fname) errbld(sev, msg, s.fname, s.istart);
      if (s && s.fname) errbld(sev, msg, "语法错误:", s.istart); //不传入文件名
      else errbld(sev, msg);
    }
    function scanBuf() {
      this.index = 0;
      scanBuf.prototype.char = function () {
        return this.buffer[this.index];
      };
      scanBuf.prototype.next_char = function () {
        return this.buffer[++this.index];
      };
      scanBuf.prototype.next_char2 = function () {
        return this.buffer[this.index];
      };
      scanBuf.prototype.get_int = function () {
        var val = 0,
          c = this.buffer[this.index];
        while (c >= "0" && c <= "9") {
          val = val * 10 + Number(c);
          c = this.next_char();
        }
        return val;
      };
    }
    // create by lhj --beg
    Abc.prototype.syntax = function (sev, msg, a1, a2, a3, a4) {
      syntax(sev, msg, a1, a2, a3, a4);
    };
    Abc.prototype.error = function (sev, s, msg, a1, a2, a3, a4) {
      error(sev, s, msg, a1, a2, a3, a4);
    };
    Abc.prototype.setCurS = function (s) {
      glbCurS = s;
    };
    Abc.prototype.getCurS = function () {
      return glbCurS;
    };
    // ----end
    function syntax(sev, msg, a1, a2, a3, a4) {
      var s = {
        fname: parse.fname,
        istart: parse.istart + parse.line.index,
      };
      error(sev, s, msg, a1, a2, a3, a4);
    }
    function js_inject(js) {
      if (!/eval *\(|Function|setTimeout|setInterval/.test(js))
        eval('"use strict"\n' + js);
      else syntax(1, "不安全的代码");
    }
    var dd_tb = {},
      a_de,
      od;
    var decos = {
        dot: "0 stc 5 1 1",
        stc: "0 stc 5 1 1", //新增，为了在装饰音拖动那边能找到 跟dot一样的
        dot_bot: "4 stc_bot 5 1 1", //新增跳音显示在下
        stc_bot: "4 stc_bot 5 1 1", //新增跳音显示在下
        dot_top: "5 stc_top 5 1 1", //新增跳音显示在上
        stc_top: "5 stc_top 5 1 1", //新增跳音显示在上
        bc: "0 stc_blank 5 1 1", //新增一个占位符号
        stc_blank: "0 stc_blank 5 1 1", //新增一个占位符号
        bcb: "3 stc_blank 5 1 1", //新增一个占位符号
        tenuto: "3 tenutoup 5 3 3", //tenuto改成tenutoup,可以定义方向，原来emb不能定义方向
        emb: "0 emb 5 3 3",
        zy1: "0 zy1 5 3 3",
        zy2: "0 zy2 5 3 3",
        zy3: "0 zy3 5 3 3",
        slide: "1 sld 3 7 0",
        sld: "1 sld 3 7 0",
        slidelu: "1 sldlu 3 7 0",
        sldlu: "1 sldlu 3 7 0",
        slideru: "1 sldru 3 7 0",
        sldru: "1 sldru 3 7 0",
        sliderd: "1 sldrd 3 7 0",
        sliderd2: "1 sldrd2 3 7 0",
        sldrd: "1 sldrd 3 7 0",
        arpeggio: "2 arp 12 10 0",
        arp: "2 arp 12 10 0",
        arpeggioup: "2 arpup 12 10 0",
        arpup: "2 arpup 12 10 0",
        arpeggiodown: "2 arpdown 12 10 0",
        arpdown: "2 arpdown 12 10 0",
        roll: "3 roll 7 6 6",
        fngs: "3 fngs 7 6 6",
        fermata: "3 hld 12 7 7",
        hld: "3 hld 12 7 7",
        emphasis: "3 accent 7 4 4",
        accent: "3 accent 7 4 4",
        lowermordent: "3 lmrd 10 5 5",
        lmrd: "3 lmrd 10 5 5",
        coda: "3 coda 24 10 10",
        uppermordent: "3 umrd 10 5 5",
        umrd: "3 umrd 10 5 5",
        segno: "3 sgno 22 8 8",
        segno1: "3 sgno1 22 8 8",
        segno12: "3 sgno12 22 8 8",
        segno123: "3 sgno123 22 8 8",
        sgno: "3 sgno 22 8 8",
        trill: "3 trl 14 5 5",
        trl: "3 trl 14 5 5",
        upbow: "3 upb 10 5 5",
        //            upb: "3 upb 10 5 5",
        upb: "3 upb 0 0 0", //后面3个参数值改为0
        downb: "3 downb 10 5 5",
        downbow: "3 dnb 9 5 5",
        dnb: "3 dnb 9 5 5",
        gmark: "3 grm 6 5 5",
        grm: "3 grm 6 5 5",
        wedge: "0 wedge 7 3 3",
        turnx: "3 turnx 10 0 5",
        breath: "3 brth 0 1 20",
        brth: "3 brth 0 1 20",
        longphrase: "3 lphr 0 1 1",
        lphr: "3 lphr 0 1 1",
        mediumphrase: "3 mphr 0 1 1",
        mphr: "3 mphr 0 1 1",
        shortphrase: "3 sphr 0 1 1",
        sphr: "3 sphr 0 1 1",
        invertedfermata: "3 hld 12 7 7",
        hld: "3 hld 12 7 7",
        invertedturn: "3 invertedturn 10 0 5",
        invertedturnx: "3 turnx 10 0 5",
        turnx: "3 turnx 10 0 5",
        0: "3 fng 8 1 3 0",
        1: "3 fng 8 1 3 1",
        2: "3 fng 8 1 3 2",
        3: "3 fng 8 1 3 3",
        4: "3 fng 8 1 3 4",
        5: "3 fng 8 1 3 5",
        fng: "3 fng 8 3 3 5",
        tenutoup: "3 tenutoup 8 3 3 5", //新增
        plus: "3 dplus 7 3 3",
        dplus: "3 dplus 7 3 3",
        "+": "3 dplus 7 3 3",
        accent: "3 accent 6 4 4",
        ">": "3 accent 6 4 4",
        marcato: "3 marcato 9 3 3",
        "^": "3 marcato 9 3 3",
        mordent: "3 lmrd 10 5 5",
        lmrd: "3 lmrd 10 5 5",
        open: "3 opend 10 3 3",
        opend: "3 opend 10 3 3",
        snap: "3 snap 14 3 3",
        thumb: "3 thumb 14 3 3",
        strong: "6 strong 20 5 3", //新增
        weak: "6 weak 20 5 3", //新增
        s_w: "6 s_w 20 5 3", //新增
        kew1: "3 kew1 45 1 3", //新增
        kews1: "3 kews1 45 1 3", //新增
        kew2: "3 kew2 45 1 3", //新增
        kewb2: "3 kewb2 45 1 3", //新增
        kews2: "3 kews2 45 1 3", //新增
        kew3: "3 kew3 45 1 3", //新增
        kewb3: "3 kewb3 45 1 3", //新增
        kew4: "3 kew4 45 1 3", //新增
        kews4: "3 kews4 45 1 3", //新增
        kew5: "3 kew5 45 1 3", //新增
        kewb5: "3 kewb5 45 1 3", //新增
        kews5: "3 kews5 45 1 3", //新增
        kew6: "3 kew6 45 1 3", //新增
        kewb6: "3 kewb6 45 1 3", //新增
        kews6: "3 kews6 45 1 3", //新增
        kew7: "3 kew7 45 1 3", //新增
        kewb7: "3 kewb7 45 1 3", //新增
        kew8: "3 kew8 45 1 3", //新增
        sd1: "3 sd1 83 1 1", //新增竖笛
        sd2: "3 sd2 83 1 3", //新增竖笛
        sd3: "3 sd3 83 1 3", //新增竖笛
        sd4: "3 sd4 83 1 3", //新增竖笛
        sd5: "3 sd5 83 1 3", //新增竖笛
        sd5_: "3 sd5_ 83 1 3", //新增竖笛
        sd6: "3 sd6 83 1 3", //新增竖笛
        sd7: "3 sd7 83 1 3", //新增竖笛
        jpslid: "3 jpslid 3 21 13",

        showsd8: "",
        sd8_1: "3 sd8_1 99 1 3", //新增8孔竖笛
        sd8_u1: "3 sd8_u1 99 1 3", //新增8孔竖笛
        sd8_2: "3 sd8_2 99 1 3", //新增8孔竖笛
        sd8_3: "3 sd8_3 99 1 3", //新增8孔竖笛
        sd8_b3: "3 sd8_b3 99 1 3", //新增8孔竖笛
        sd8_4: "3 sd8_4 99 1 3", //新增8孔竖笛
        sd8_u4: "3 sd8_u4 99 1 3", //新增8孔竖笛
        sd8_5: "3 sd8_5 99 1 3", //新增8孔竖笛
        sd8_u5: "3 sd8_u5 99 1 3", //新增8孔竖笛
        sd8_6: "3 sd8_6 99 1 3", //新增8孔竖笛
        sd8_7: "3 sd8_7 99 1 3", //新增8孔竖笛
        sd8_b7: "3 sd8_b7 99 1 3", //新增8孔竖笛
        sd8_1s: "3 sd8_1s 99 1 3", //新增8孔竖笛
        sd8_u1s: "3 sd8_u1s 99 1 3", //新增8孔竖笛
        sd8_2s: "3 sd8_2s 99 1 3", //新增8孔竖笛
        sd8_3s: "3 sd8_3s 99 1 3", //新增8孔竖笛
        sd8_b3s: "3 sd8_b3s 99 1 3", //新增8孔竖笛
        sd8_4s: "3 sd8_4s 99 1 3", //新增8孔竖笛
        sd8_u4s: "3 sd8_u4s 99 1 3", //新增8孔竖笛
        sd8_5s: "3 sd8_5s 99 1 3", //新增8孔竖笛
        sd8_u5s: "3 sd8_u5s 99 1 3", //新增8孔竖笛
        sd8_6s: "3 sd8_6s 99 1 3", //新增8孔竖笛
        sd8_7s: "3 sd8_7s 99 1 3", //新增8孔竖笛
        sd8_b7s: "3 sd8_b7s 99 1 3", //新增8孔竖笛

        inst_lingu: "3 inst_lingu 45 1 3", //铃鼓
        inst_pengl: "3 inst_pengl 45 1 3", //碰铃
        inst_shuanxt: "3 inst_shuanxt 45 1 3", //双响筒
        inst_xiangb: "3 inst_xiangb 45 1 3", //响板
        inst_xiaojg: "3 inst_xiaojg 45 1 3", //小军鼓
        inst_shanjt: "3 inst_shanjt 45 1 3", //三角铁
        inst_shac: "3 inst_shac 45 1 3", //沙锤
        inst_shoul: "3 inst_shoul 45 1 3", //手铃
        inst_feizg: "3 inst_feizg 45 1 3", //非洲鼓
        inst_shuanglin: "3 inst_shuanglin 45 1 3", //双铃
        inst_xiangzhan: "3 inst_xiangzhan 45 1 3", //响盏
        inst_xiaojiao: "3 inst_xiaojiao 45 1 3", //小叫木鱼
        inst_xiaojiaoxiaoluo: "3 inst_xiaojiaoxiaoluo 45 1 3", //小叫小锣
        inst_yaoling: "3 inst_yaoling 45 1 3", //摇铃
        inst_wamt: "3 inst_wamt 45 1 3", //蛙鸣筒
        inst_bo: "3 inst_bo 45 1 3", //钹
        inst_daluo: "3 inst_daluo 45 1 3", //大锣

        img: "3 img 45 1 3", //新增
        sec_strong: "6 sec_strong 20 5 3",
        dacapo: "3 dacs 16 20 20 Da Capo",
        dacoda: "3 dacs 16 20 20 Da Coda",
        tocoda: "3 dacs 16 20 20 To Coda",
        "D.C.": "3 dacs 16 10 10 D.C.",
        "D.S.": "3 dacs 16 10 10 D.S.",
        "D.S.1": "3 dacs 16 10 10 D.S.1",
        "D.S.2": "3 dacs 16 10 10 D.S.2",
        "D.S.1.2": "3 dacs 16 10 10 D.S.1.2",
        "D.S.2.3": "3 dacs 16 10 10 D.S.2.3",
        "D.S.3": "3 dacs 16 10 10 D.S.3",
        "D.C.alcoda": "3 dacs 16 38 38 D.C. al Coda",
        "D.S.alcoda": "3 dacs 16 38 38 D.S. al Coda",
        "D.C.alfine": "3 dacs 16 38 38 D.C. al Fine",
        "D.S.alfine": "3 dacs 16 38 38 D.S. al Fine",
        fine: "3 dacs 16 10 10 Fine",
        dacs: "3 dacs 16 20 20 Da Capo",
        turn: "3 turn 10 0 5",
        bhffjh: "3 bhffjh 10 0 5", //额外增加 add by hxs
        invertedturn: "3 invertedturn 10 0 5",
        "trill(": "3 ltr 8 0 0",
        "trill)": "3 ltr 8 0 0",
        f: "6 pf 28 1 7",
        ff: "6 pf 28 2 10",
        fff: "6 pf 28 4 13",
        ffff: "6 pf 28 6 16",
        mf: "6 pf 28 6 13",
        sf: "6 pf 28 6 13",
        mp: "6 pf 28 6 16",
        p: "6 pf 28 2 8",
        pp: "6 pf 28 5 14",
        ppp: "6 pf 28 8 20",
        pppp: "6 pf 28 10 25",
        pf: "6 pf 28 10 25",
        pralltriller: "3 umrd 10 5 5",
        rit: '6 rit 18 4 10 ""',
        accel: '6 accel 18 12 25 ""',
        do: "4 do 28 8 20",
        re: "4 re 28 8 20",
        mi: "4 mi 28 8 20",
        fa: "4 fa 28 8 20",
        sol: "4 sol 28 8 20",
        la: "4 la 28 8 20",
        si: "4 si 28 8 20",
        lb: "3 l_brackets 0 0 0",
        rbl: "3 r_brackets_l 0 0 0",
        rbr: "3 r_brackets_r 0 0 0",

        sfz: '6 sfz 18 4 10 ""',
        sff: '6 sff 18 4 10 ""',
        sfp: '6 sfp 18 4 10 ""',
        fp: '6 fp 18 4 10 ""',
        mfp: '6 mfp 18 4 10 ""',
        fz: '6 fz 18 4 10 ""',
        "cresc.": '6 crescword 18 4 10 ""',
        "decresc.": '6 decrescword 18 4 10 ""',
        "dim.": '6 dimword 18 4 10 ""',
        ped: "4 ped 30 0 0", //修改了第一个参数
        "ped-up": "4 pedoff 20 0 0", //修改了第一个参数
        pedoff: "4 pedoff 20 0 0", //修改了第一个参数
        pedall: "4 pedall 30 0 0", //新增
        pedall2: "4 pedall2 30 0 0", //新增
        "crescendo(": "7 cresc 18 0 0",
        "crescendo)": "7 cresc 18 0 0",
        "<(": "7 cresc 18 0 0",
        "<)": "7 cresc 18 0 0",
        cresc: "7 cresc 18 0 0",
        "diminuendo(": "7 dim 18 0 0",
        "diminuendo)": "7 dim 18 0 0",
        ">(": "7 dim 18 0 0",
        ">)": "7 dim 18 0 0",
        dim: "7 dim 18 0 0",
        "-(": "8 gliss 0 0 0",
        "-)": "8 gliss 0 0 0",
        gliss: "8 gliss 0 0 0",
        "~(": "8 glisq 0 0 0",
        "~)": "8 glisq 0 0 0",
        glisq: "8 glisq 0 0 0",
        "*(": "8 glisw 0 0 0",
        "*)": "8 glisw 0 0 0",
        glisw: "8 glisw 0 0 0",
        "m_form(": "3 musicform 10 0 0",
        "m_form)": "3 musicform 10 0 0",
        "be(": "3 my_bezier 10 0 0", //跨声部贝赛尔连音线
        "be)": "3 my_bezier 10 0 0", //跨声部贝赛尔连音线
        "slur(": "3 my_staff_slur 10 0 0", //跨声部普通连音线
        "slur)": "3 my_staff_slur 10 0 0", //跨声部普通连音线
        "8va(": "3 8va 10 0 0",
        "8va)": "3 8va 10 0 0",
        "8va_b(": "4 8va_b 10 0 0",
        "8va_b)": "4 8va_b 10 0 0",
        "8vb(": "4 8vb 10 0 0",
        "8vb)": "4 8vb 10 0 0",
        "8vb_t(": "3 8vb_t 10 0 0",
        "8vb_t)": "3 8vb_t 10 0 0",
        "15ma(": "3 15ma 10 0 0",
        "15ma)": "3 15ma 10 0 0",
        "15mb(": "4 15mb 10 0 0",
        "15mb)": "4 15mb 10 0 0",
        invisible: "32 0 0 0 0",
        beamon: "33 0 0 0 0",
        trem1: "34 0 0 0 0",
        trem2: "34 0 0 0 0",
        trem3: "34 0 0 0 0",
        trem4: "34 0 0 0 0",
        xstem: "35 0 0 0 0",
        beambr1: "36 0 0 0 0",
        beambr2: "36 0 0 0 0",
        rbstop: "37 0 0 0 0",
        "/": "38 0 0 6 6",
        "//": "38 0 0 6 6",
        "///": "38 0 0 6 6",
        "/-": "38 0 0 6 6", //新增
        "//-": "38 0 0 6 6", //新增
        "///-": "38 0 0 6 6", //新增
        "beam-accel": "39 0 0 0 0",
        "beam-rall": "39 0 0 0 0",
        stemless: "40 0 0 0 0",
        rbend: "41 0 0 0 0",
        "tie(": "44 0 0 0 0",
        "tie)": "44 0 0 0 0",
      },
      f_near = [true, true, true],
      f_note = [false, false, false, true, true, true, false, false, true],
      f_staff = [false, false, false, false, false, false, true, true];
    function y_get(st, up, x, w) {
      var y,
        p_staff = staff_tb[st],
        i = ((x / realwidth) * YSTEP) | 0,
        j = (((x + w) / realwidth) * YSTEP) | 0;
      if (i < 0) i = 0;
      if (j >= YSTEP) {
        j = YSTEP - 1;
        if (i > j) i = j;
      }
      if (up) {
        y = p_staff.top[i++];
        while (i <= j) {
          if (y < p_staff.top[i]) y = p_staff.top[i];
          i++;
        }
      } else {
        y = p_staff.bot[i++];
        while (i <= j) {
          if (y > p_staff.bot[i]) y = p_staff.bot[i];
          i++;
        }
      }
      return y;
    }

    // 设置y的值
    function y_set(st, up, x, w, y) {
      if (st > 0) {
        isStave = true;
      }
      var p_staff = staff_tb[st],
        i = ((x / realwidth) * YSTEP) | 0,
        j = (((x + w) / realwidth) * YSTEP) | 0;
      if (i < 0) i = 0;
      if (j >= YSTEP) {
        j = YSTEP - 1;
        if (i > j) i = j;
      }
      if (up) {
        while (i <= j) {
          if (p_staff.top[i] < y) p_staff.top[i] = y;
          i++;
        }
      } else {
        while (i <= j) {
          if (p_staff.bot[i] > y) p_staff.bot[i] = y;
          i++;
        }
      }
    }
    function up_p(s, pos) {
      switch (pos) {
        case C.SL_ABOVE:
          return true;
        case C.SL_BELOW:
          return false;
      }
      if (s.multi && s.multi != 0) return s.multi > 0;
      if (!s.p_v.have_ly) return false;
      return s.pos.voc != C.SL_ABOVE;
    }
    function d_arp(de) {
      var m,
        h,
        dx,
        s = de.s,
        dd = de.dd,
        xc = 5;
      if (s.type == C.NOTE) {
        for (m = 0; m <= s.nhd; m++) {
          if (s.notes[m].acc) {
            dx = 5 + s.notes[m].shac;
          } else {
            dx = 6 - s.notes[m].shhd;
            switch (s.head) {
              case C.SQUARE:
                dx += 3.5;
                break;
              case C.OVALBARS:
              case C.OVAL:
                dx += 2;
                break;
            }
          }
          if (dx > xc) xc = dx;
        }
      }
      h = 3 * (s.notes[s.nhd].pit - s.notes[0].pit) + 4;
      m = dd.h;
      if (h < m) h = m;
      de.has_val = true;
      de.val = h;
      de.x -= xc;
      de.y = 3 * (s.notes[0].pit - 18) - 3;
    }
    function d_cresc(de) {
      if (de.ldst) return;
      var s,
        dd,
        dd2,
        up,
        x,
        dx,
        x2,
        i,
        s2 = de.s,
        de2 = de.start,
        de2_prev,
        de_next;
      s = de2.s;
      x = s.x + 3;
      i = de2.ix;
      if (i > 0) de2_prev = a_de[i - 1];
      de.st = s2.st;
      de.lden = false;
      de.has_val = true;
      up = up_p(s2, s2.pos.dyn);
      if (up) de.up = true;
      if (
        de2_prev &&
        de2_prev.s == s &&
        ((de.up && !de2_prev.up) || (!de.up && de2_prev.up))
      ) {
        dd2 = de2_prev.dd;
        if (f_staff[dd2.func]) {
          x2 = de2_prev.x + de2_prev.val + 4;
          if (x2 > x) x = x2;
        }
      }
      if (de.defl.noen) {
        dx = de.x - x;
        if (dx < 20) {
          x = de.x - 20 - 3;
          dx = 20;
        }
      } else {
        x2 = s2.x;
        de_next = a_de[de.ix + 1];
        if (
          de_next &&
          de_next.s == s &&
          ((de.up && !de_next.up) || (!de.up && de_next.up))
        ) {
          dd2 = de_next.dd;
          if (f_staff[dd2.func]) x2 -= 5;
        }
        dx = x2 - x - 4;
        if (dx < 20) {
          x -= (20 - dx) * 0.5;
          dx = 20;
        }
      }
      de.val = dx;
      de.x = x;
      de.y = y_get(de.st, up, x, dx);
      if (!up) {
        dd = de.dd;
        de.y -= dd.h;
      }
    }
    function d_near(de) {
      var y,
        up,
        s = de.s,
        dd = de.dd;
      if (dd.str) {
        return;
      }
      if (s.multi) up = s.multi > 0;
      else up = s.stem < 0;
      //	        up = true;//测试这里决定是向上还是向下，明天再修改，要判断如果是跳音，且有某个标记时
      if (dd.name == "dot" && s.a_gch) {
        //这里增加一个跳音上下位置的设置
        if (hasGch(s, ".up")) {
          up = true;
        } else if (hasGch(s, ".down")) {
          up = false;
        }
      }
      if (up) {
        y = s.ymx | 0;
      } else if (dd.name[0] == "w") {
        de.inv = true;
        y = s.ymn;
      } else {
        y = s.ymn - dd.h;
      }
      if (y > -6 && y < 24) {
        if (up) y += 3;
        y = (((y + 6) / 6) | 0) * 6 - 6;
      }
      if (up) {
        s.ymx = y + dd.h;
      } else if (dd.name[0] == "w") s.ymn = y - dd.h;
      else s.ymn = y;
      de.y = y;
      if (s.type == C.NOTE) de.x += s.notes[s.stem >= 0 ? 0 : s.nhd].shhd;
      if (dd.name[0] == "d" && s.nflags >= -1) {
        if (up) {
          if (s.stem > 0) de.x += 3.5;
        } else {
          if (s.stem < 0) de.x -= 3.5;
        }
      }
    }
    function d_pf(de) {
      var dd2,
        x2,
        x,
        up,
        s = de.s,
        dd = de.dd,
        de_prev;
      if (de.ldst) return;
      if (de.start) {
        d_cresc(de);
        return;
      }
      de.val = dd.wl + dd.wr;
      up = up_p(s, s.pos.vol);
      if (dd.pos == "_") {
        //单个装饰音方向控制
        up = false;
      }
      if (dd.pos == "^") {
        //单个装饰音方向控制
        up = true;
      }
      if (up) de.up = true;
      x = s.x - dd.wl;
      if (de.ix > 0) {
        de_prev = a_de[de.ix - 1];
        if (
          de_prev.s == s &&
          ((de.up && !de_prev.up) || (!de.up && de_prev.up))
        ) {
          dd2 = de_prev.dd;
          if (f_staff[dd2.func]) {
            x2 = de_prev.x + de_prev.val + 4;
            if (x2 > x) x = x2;
          }
        }
      }
      de.x = x;
      de.y = y_get(s.st, up, x, de.val);
      if (!up) de.y -= dd.h;
    }
    function d_slide(de) {
      var m,
        dx,
        s = de.s,
        yc = s.notes[0].pit,
        xc = 5;
      for (m = 0; m <= s.nhd; m++) {
        if (s.notes[m].acc) {
          dx = 4 + s.notes[m].shac;
        } else {
          dx = 5 - s.notes[m].shhd;
          switch (s.head) {
            case C.SQUARE:
              dx += 3.5;
              break;
            case C.OVALBARS:
            case C.OVAL:
              dx += 2;
              break;
          }
        }
        if (s.notes[m].pit <= yc + 3 && dx > xc) xc = dx;
      }
      de.x -= xc;
      de.y = 3 * (yc - 18);
    }
    function d_trill(de) {
      if (de.ldst) return;
      var dd,
        up,
        y,
        w,
        tmp,
        s2 = de.s,
        st = s2.st,
        s = de.start.s,
        x = s.x;
      if (de.prev) {
        x = de.prev.x + 10;
        y = de.prev.y;
      }
      de.st = st;
      if (de.dd.func != 4) {
        switch (de.dd.glyph) {
          case "8va":
          case "8vb_t":
          case "15ma":
            up = 1;
            break;
          default:
            up = s2.multi >= 0;
            break;
        }
      }
      if (de.defl.noen) {
        w = de.x - x;
        if (w < 20) {
          x = de.x - 20 - 3;
          w = 20;
        }
      } else {
        w = s2.x - x - 6;
        if (s2.type == C.NOTE) w -= 6;
        if (w < 20) {
          x -= (20 - w) * 0.5;
          w = 20;
        }
      }
      dd = de.dd;
      if (!y) y = y_get(st, up, x, w);
      if (up) {
        tmp = staff_tb[s.st].topbar + 2;
        if (y < tmp) y = tmp;
      } else {
        y -= dd.h;
        tmp = staff_tb[s.st].botbar - 2;
        if (y > tmp) y = tmp;
      }
      de.lden = false;
      de.has_val = true;
      de.val = w;
      de.x = x;
      de.y = y;
      if (up) y += dd.h;
      y_set(st, up, x, w, y);
      if (up) s.ymx = s2.ymx = y;
      else s.ymn = s2.ymn = y;
    }
    function d_upstaff(de) {
      if (de.ldst) return;
      if (de.start) {
        d_trill(de);
        return;
      }
      var yc,
        up,
        inv,
        s = de.s,
        dd = de.dd,
        x = s.x,
        w = dd.wl + dd.wr,
        stafft = staff_tb[s.st].topbar + 2,
        staffb = staff_tb[s.st].botbar - 2;
      if (s.nhd) x += s.notes[s.stem >= 0 ? 0 : s.nhd].shhd;
      up = -1;
      if (dd.func == 4) {
        up = 0;
      } else if (s.pos) {
        switch (s.pos.orn) {
          case C.SL_ABOVE:
            up = 1;
            break;
          case C.SL_BELOW:
            up = 0;
            break;
        }
      }
      if (dd.pos == "_") {
        //单独的上下位置设置
        up = 0;
      }
      if (dd.pos == "^") {
        //单独的上下位置设置
        up = 1;
      }
      if (de.s.st == 1 && dd.glyph == "fng" && de.s.pos.orn == 0) {
        //不是第一个声部,指法默认在下方
        up = 0;
      }
      switch (dd.glyph) {
        case "fngs": //同音换指语法add by hxs
        case "accent":
        case "roll":
          if (!up || (up < 0 && (s.multi < 0 || (!s.multi && s.stem > 0)))) {
            yc = y_get(s.st, false, s.x - dd.wl, w) - 2;
            if (yc > staffb) yc = staffb;
            yc -= dd.h;
            y_set(s.st, false, s.x, 0, yc);
            if (dd.glyph == "fngs") {
              //同音换指语法add by hxs
              dd.fnginv = true;
              de.fnginv = true;
              s.fnginv = true;
            } else {
              inv = true;
            }
            s.ymn = yc;
          } else {
            yc = y_get(s.st, true, s.x - dd.wl, w) + 2;
            if (yc < stafft) yc = stafft;
            y_set(s.st, true, s.x - dd.wl, w, yc + dd.h);
            s.ymx = yc + dd.h;
          }
          break;
        case "brth":
        case "lphr":
        case "mphr":
        case "sphr":
          yc = stafft + 1;
          if (dd.glyph == "brth" && yc < s.ymx) yc = s.ymx;
          for (s = s.ts_next; s; s = s.ts_next) if (s.seqst) break;
          x += ((s ? s.x : realwidth) - x) * 0.45;
          break;
        default:
          if (dd.name.indexOf("invert") == 0) inv = true;
          if (
            dd.name != "invertedfermata" &&
            (up > 0 || (up < 0 && s.multi >= 0))
          ) {
            yc = y_get(s.st, true, s.x - dd.wl, w) + 2;
            if (yc < stafft) yc = stafft;
            y_set(s.st, true, s.x - dd.wl, w, yc + dd.h);
            s.ymx = yc + dd.h;
          } else {
            yc = y_get(s.st, false, s.x - dd.wl, w) - 2;
            if (yc > staffb) yc = staffb;
            yc -= dd.h;
            y_set(s.st, false, s.x - dd.wl, w, yc);
            if (dd.name == "fermata") inv = true;
            s.ymn = yc;
          }
          break;
      }
      if (inv) {
        yc += dd.h;
        de.inv = true;
      }
      de.x = x;
      de.y = yc;
    }
    var func_tb = [
      d_near,
      d_slide,
      d_arp,
      d_upstaff,
      d_upstaff,
      d_trill,
      d_pf,
      d_cresc,
    ];
    var lastJqJrIstartMap = new Map(); //上一个渐强渐弱的左标记对应音符的istart
    var lastVabIstartMap = new Map(); //上一个升降8、15度的左标记对应音符的istart
    function deco_add(param) {
      var dv = param.match(/(\S*)\s+(.*)/);
      decos[dv[1]] = dv[2];
    }
    //装饰音定义,构建装饰音
    function deco_def(nm, s, dcnInfo) {
      //增加了dcnInfo
      if (!s) {
        return;
      }
      console.log("nm:", nm, s.istart);
      //        	if(nm.match(/8va\(|8vb\(|15ma\(|15mb\(/)!=null){
      //        		var tmpNm = nm.match(/8va\(|8vb\(|15ma\(|15mb\(/)[0];
      //        		if(tmpNm!=nm){
      //        			s.my_vabheight = parseFloat(nm.replace(tmpNm,""));
      //        		}
      //        	}
      var desc = "";
      var anchor = "";
      var my_slur_data = "";

      if (/empty([1-9]?)/.test(nm)) {
        //符头设置为空心的
        s.my_emptyhead = true;
        var m = /empty([1-9]?)/.exec(nm);
        if (m) {
          var num = m[1];
          if (num != "") {
            s.my_emptyhead_seq = num;
          }
        }
        return;
      }
      if (nm == "beamctn") {
        //符干在跨小节时，延续到下一个小节
        s.my_beamctn = true;
        return;
      }
      if (nm == "showsd8") {
        s.my_showsd8 = true;
        return;
      }
      if (nm.indexOf("slur(") == 0) {
        my_slur_data = nm.replace("slur(", "");
        nm = "slur(";
        s.my_slur_data = my_slur_data;

        if (staff_slurs_left.indexOf(s.istart) < 0) {
          staff_slurs_left.push(s.istart);
        }
      }
      if (nm.indexOf("m_form(") > -1) {
        desc = nm.substr(7);
        //        		console.log("desc:",desc);
        nm = "m_form(";
      }
      if (nm.indexOf("_end") > -1) {
        //这里特殊处理以_end结尾的,主要是dcfine一系列的，如果放在最后，只会显示一半
        anchor = "end";
        nm = nm.replace("_end", "");
      }
      if (nm.indexOf("x:") == 0) {
        s.xOffset = parseInt(nm.replace("x:", ""));
      }
      var fngs = [];
      if (nm.indexOf("fngs:") > -1) {
        var fngstr = nm.replace("fngs:", "").replace(/\s/g, "");
        fngs = fngstr.split(",");
        nm = "fngs";
        s.fngs = fngs;
      }
      var pos = "";
      var _reg = /^\_.*/; //下划线开头的指法显示在下方
      var upReg = /^\^.*/; //^开头的指法显示在上方
      if (nm.length > 1 && _reg.test(nm)) {
        nm = nm.replace("_", "");
        pos = "_";
      } else if (nm.length > 1 && upReg.test(nm)) {
        nm = nm.replace("^", "");
        pos = "^";
      }

      //图片特殊处理
      var img_path = "";
      var img_reg = /([_<>]?)img_(.*)/;
      var img_pos = "";
      var img_url = "";
      //if(nm.indexOf("img")==0){
      if (img_reg.test(nm)) {
        var img_matchs = nm.match(img_reg);
        img_pos = img_matchs[1];
        img_path = img_matchs[2];
        if (img_path.indexOf("http") == 0) {
        } else {
          img_path = img_path.replace(/\.(jpg|png)/, "");
        }
        nm = "img";
      }
      var a,
        dd,
        dd2,
        name2,
        c,
        i,
        elts,
        str,
        text = decos[nm];
      if (!text) {
        if (cfmt.decoerr) {
          if (nm.indexOf("-s-nb") == 0 || nm.indexOf("-e-nb") == 0) {
            return;
          }
          if (nm.indexOf("sh:") == 0) {
            return;
          }
          if (nm.indexOf("x:") == 0) {
            return;
          }
          console.log("--cfmt.diagram", cfmt.diagram);
          error(1, null, "无法识别的装饰音 '$1'", nm);
        }
        return;
      }
      a = text.match(/(\d+)\s+(.+?)\s+([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)/);
      if (!a) {
        error(1, null, "无法识别的装饰音 '$1'", nm);
        return;
      }
      var c_func = Number(a[1]),
        h = parseFloat(a[3]),
        wl = parseFloat(a[4]),
        wr = parseFloat(a[5]);
      if (isNaN(c_func)) {
        //                error(1, null, "%%deco: bad C function value '$1'", a[1])
        error(1, null, "%%deco: 错误的值 '$1'", a[1]);
        return;
      }
      if ((c_func < 0 || c_func > 10) && (c_func < 32 || c_func > 44)) {
        //                error(1, null, "%%deco: bad C function index '$1'", c_func)
        error(1, null, "%%deco: 错误的值 '$1'", c_func);
        return;
      }
      if (c_func == 5) c_func = 3;
      if (c_func == 7) c_func = 6;
      if (h < 0 || wl < 0 || wr < 0) {
        //                error(1, null, "%%deco: cannot have a negative value '$1'", text)
        error(1, null, "%%deco: 不能有负值 '$1'", text);
        return;
      }
      if (h > 99 || wl > 80 || wr > 80) {
        //                error(1, null, "%%deco: abnormal h/wl/wr value '$1'", text)
        error(1, null, "%%deco: 不正确的值 h/wl/wr  '$1'", text);
        return;
      }
      if (nm != "img") {
        dd = dd_tb[nm];
      } else {
        dd = clone(dd_tb[nm]);
      }
      if (!dd) {
        dd = {
          name: nm,
        };
        dd_tb[nm] = dd;
      }
      dd.func = dd.name.indexOf("head-") == 0 ? 9 : c_func;
      dd.glyph = a[2];
      dd.h = h;
      dd.wl = wl;
      dd.wr = wr;
      dd.pos = pos;
      //            if(s){
      //            	console.log("dd:",dd,"  sss---",s)
      //            	dd.istart = s.istart;
      //            }
      if (dcnInfo) {
        dd.istart = dcnInfo.istart;
        dd.iend = dcnInfo.iend;
      }
      dd.anchor = anchor;
      if (img_path != "") {
        dd.path = img_path;
        dd.pos = img_pos;
      }
      if (fngs.length > 0) {
        dd.path = s.istart;
      }
      str = text.replace(a[0], "").trim();
      if (str) {
        if (str[0] == '"') str = str.slice(1, -1);
        dd.str = str;
      }
      if (dd.func == 6 && dd.str == undefined) dd.str = dd.name;
      c = dd.name.slice(-1);
      if (c == "(" || (c == ")" && dd.name.indexOf("(") < 0)) {
        dd.str = null;
        name2 = dd.name.slice(0, -1) + (c == "(" ? ")" : "(");
        dd2 = dd_tb[name2];
        if (dd2) {
          if (c == "(") {
            dd.dd_en = dd2;
            dd2.dd_st = dd;
          } else {
            dd.dd_st = dd2;
            dd2.dd_en = dd;
          }
        } else {
          dd2 = deco_def(name2, s);
          if (!dd2) return;
        }
      }
      return dd;
    }
    function deco_cnv(a_dcn, s, prev, a_dcn_info) {
      var i,
        j,
        dd,
        dcn,
        note,
        nd = a_dcn.length;
      if (lastVabHeight != 0 && !s.my_vab_height) {
        s.my_vab_height = lastVabHeight;
      }
      for (i = 0; i < nd; i++) {
        var pos = "";
        dcn = a_dcn[i];
        if (/^[_^]/.test(dcn)) {
          pos = /[_^]/.exec(dcn)[0];
          dcn = dcn.replace(/[_^]/g, ""); //这里处理指法有指定上下位置的情况
        }
        dd = dd_tb[dcn];

        if (dcn == "<(" || dcn == ">(") {
          //这里要对应清楚开始和结束的音符的关系
          //                	lastJqJrIstart = s.istart;
          lastJqJrIstartMap.set("lastJqJrIstartV" + s.v, s.istart);
        }
        if (dcn == "<)" || dcn == ">)") {
          //                	if(lastJqJrIstart!=-1){
          //                		s.startJqJrNoteIstart = lastJqJrIstart;
          //                	}
          s.startJqJrNoteIstart = lastJqJrIstartMap.get(
            "lastJqJrIstartV" + s.v
          );
        }
        if (dcn.match(/8va\(|8vb\(|15ma\(|15mb\(/) != null) {
          //                	lastVabIstart = s.istart;
          lastVabIstartMap.set("lastVabIstartV" + s.st, s.istart);
        }
        if (dcn.match(/8va\)|8vb\)|15ma\)|15mb\)/) != null) {
          //                	if(lastVabIstart!=-1){
          //                		s.startVabIstart = lastVabIstart;
          //                	}
          s.startVabIstart = lastVabIstartMap.get("lastVabIstartV" + s.st);
        }
        var copyDD = null;
        if (s && dd) {
          //如果已经存在，要重新找istart和iend
          //dd.istart = s.istart;//新增hxs(这个不知道有什么用)
          var str = document
            .getElementById("source")
            .value.substring(0, s.istart);
          var ddStr = document
            .getElementById("source")
            .value.substring(dd.istart, dd.iend);
          copyDD = clone(dd);
          copyDD.istart = str.lastIndexOf(ddStr);
          copyDD.iend = copyDD.istart + ddStr.length;
          if (copyDD.glyph == "fng") {
            copyDD.pos = pos;
          }
        }
        if (!dd) {
          var dcnInfo = null;
          if (a_dcn_info) {
            dcnInfo = a_dcn_info.find((item) => item.dcn == dcn);
          }
          dd = deco_def(dcn, s, dcnInfo);
          if (!dd) continue;
        }
        switch (dd.func) {
          case 0:
            if (s.type == C.BAR && dd.name == "dot") {
              s.bar_dotted = true;
              break;
            }
          case 1:
          case 2:
            if (!s.notes) {
              error(1, s, errs.must_note_rest, dd.name);
              continue;
            }
            break;
          case 8:
            if (s.type != C.NOTE) {
              error(1, s, errs.must_note, dd.name);
              continue;
            }
            note = s.notes[s.nhd];
            if (!note.a_dcn) note.a_dcn = [];
            note.a_dcn.push(dd.name);
            continue;
          case 9:
            if (!s.notes) {
              error(1, s, errs.must_note_rest, dd.name);
              continue;
            }
            for (j = 0; j <= s.nhd; j++) {
              note = s.notes[j];
              if (!note.a_dcn) note.a_dcn = [];
              note.a_dcn.push(dd.name);
            }
            continue;
          default:
            break;
          case 10:
            if (s.notes) {
              for (j = 0; j <= s.nhd; j++) s.notes[j].color = dd.name;
            } else {
              s.color = dd.name;
            }
            continue;
          case 32:
            s.invis = true;
            continue;
          case 33:
            if (s.type != C.BAR) {
              error(1, s, "!beamon! 只能放在小节线上");
              continue;
            }
            s.beam_on = true;
            continue;
          case 34:
            if (
              s.type != C.NOTE ||
              !prev ||
              prev.type != C.NOTE ||
              s.dur != prev.dur
            ) {
              //                            error(1, s, "!$1! must be on the last of a couple of notes", dd.name)
              error(1, s, "!$1! 只能放在最后一对音符上", dd.name);
              continue;
            }
            s.trem2 = true;
            s.beam_end = true;
            s.beam_st = false;
            prev.beam_st = true;
            prev.beam_end = false;
            s.ntrem = prev.ntrem = Number(dd.name[4]);
            for (j = 0; j <= s.nhd; j++) s.notes[j].dur *= 2;
            for (j = 0; j <= prev.nhd; j++) prev.notes[j].dur *= 2;
            continue;
          case 35:
            if (s.type != C.NOTE) {
              //                            error(1, s, "!xstem! must be on a note")
              error(1, s, "!xstem! 只能放在音符上");
              continue;
            }
            s.xstem = true;
            continue;
          case 36:
            if (s.type != C.NOTE) {
              error(1, s, errs.must_note, dd.name);
              continue;
            }
            if (dd.name[6] == "1") s.beam_br1 = true;
            else s.beam_br2 = true;
            continue;
          case 37:
            s.rbstop = 1;
            continue;
          case 38:
            if (s.type != C.NOTE) {
              error(1, s, errs.must_note, dd.name);
              continue;
            }
            s.trem1 = true;
            // 增加了/-这种类型，画线画在2个音符的中间 add by hxs---------------
            s.ntrem = dd.name.replace("-", "").length;
            if (dd.name.indexOf("-") > -1) {
              s.trem_type = "mid";
            }
            //--------------end------------
            continue;
          case 39:
            if (s.type != C.NOTE) {
              error(1, s, errs.must_note, dd.name);
              continue;
            }
            s.feathered_beam = dd.name[5] == "a" ? 1 : -1;
            continue;
          case 40:
            s.stemless = true;
            continue;
          case 41:
            s.rbstop = 2;
            continue;
        }
        if (!s.a_dd) s.a_dd = [];
        if (
          copyDD &&
          (copyDD.glyph == "dacs" ||
            copyDD.glyph == "sgno" ||
            copyDD.glyph == "coda" ||
            copyDD.glyph == "fng")
        ) {
          s.a_dd.push(copyDD); //这种情况出现在多声部一些反复标记
        } else {
          if (pos != "") {
            dd.pos = pos;
          }
          s.a_dd.push(dd);
        }

        //如果有多个指法标记，第1声部自动进行降序排序，第2声部自动按升序排序start=========
        if (s.a_dd.length > 1) {
          var a_de_order = [];
          var fng_order = [];
          var yarr = [];

          var st = 0;
          for (var k = 0; k < s.a_dd.length; k++) {
            var td = s.a_dd[k];
            st = s.st;
            if (td.glyph == "fng") {
              fng_order.push(td);
            } else {
              a_de_order.push(td);
            }
          }
          if (fng_order.length > 1) {
            if (st == 0) {
              fng_order.sort(function (a, b) {
                if (s.pos.orn == 0) {
                  return a.name - b.name;
                } else if (s.pos.orn == 1) {
                  return a.name - b.name;
                } else if (s.pos.orn == 2) {
                  return b.name - a.name;
                }
              });
            } else if (st == 1) {
              fng_order.sort(function (a, b) {
                if (s.pos.orn == 0) {
                  return a.name - b.name;
                } else if (s.pos.orn == 1) {
                  return b.name - a.name;
                } else if (s.pos.orn == 2) {
                  return a.name - b.name;
                }
              });
            }

            var n_arr = a_de_order.concat(fng_order);
            s.a_dd = n_arr;
          }
        }
        //指法排序end===============
      }
    }
    function deco_update(s, dx) {
      var i,
        de,
        nd = a_de.length;
      for (i = 0; i < nd; i++) {
        de = a_de[i];
        if (de.s == s) de.x += dx;
      }
    }
    function deco_width(s) {
      var dd,
        i,
        wl = 0,
        a_dd = s.a_dd,
        nd = a_dd.length;
      for (i = 0; i < nd; i++) {
        dd = a_dd[i];
        switch (dd.func) {
          case 1:
            if (wl < 7) wl = 7;
            break;
          case 2:
            if (wl < 14) wl = 14;
            break;
          case 3:
            switch (dd.glyph) {
              case "brth":
              case "lphr":
              case "mphr":
              case "sphr":
                if (s.wr < 20) s.wr = 20;
                break;
            }
            break;
        }
      }
      if (wl != 0 && s.prev && s.prev.type == C.BAR) wl -= 3;
      return wl;
    }
    // 所有的感情符号/装饰音
    function draw_all_deco() {
      if (a_de.length == 0) return;

      var de,
        de2,
        dd,
        s,
        note,
        f,
        st,
        x,
        y,
        y2,
        ym,
        uf,
        i,
        str,
        a,
        new_de = [],
        ymid = [];
      if (!cfmt.dynalign) {
        st = nstaff;
        y = staff_tb[st].y;
        while (--st >= 0) {
          y2 = staff_tb[st].y;
          ymid[st] = (y + 24 + y2) * 0.5;
          y = y2;
        }
      }
      while (1) {
        de = a_de.shift();
        if (!de) break;
        dd = de.dd;
        if (!dd) continue;
        if (dd.dd_en) continue;
        s = de.s;
        f = dd.glyph;
        i = f.indexOf("/");
        if (i > 0) {
          if (s.stem >= 0) f = f.slice(0, i);
          else f = f.slice(i + 1);
        }
        if (f_staff[dd.func]) set_sscale(s.st);
        else set_scale(s);
        st = de.st;
        if (!staff_tb[st].topbar) continue;
        x = de.x;
        y = de.y + staff_tb[st].y;
        if (de.m != undefined) {
          note = s.notes[de.m];
          x += note.shhd * stv_g.scale;
        } else if (
          f_staff[dd.func] &&
          !cfmt.dynalign &&
          ((de.up && st > 0) || (!de.up && st < nstaff))
        ) {
          if (de.up) ym = ymid[--st];
          else ym = ymid[st++];
          ym -= dd.h * 0.5;
          if ((de.up && y < ym) || (!de.up && y > ym)) {
            y2 = y_get(st, !de.up, de.x, de.val) + staff_tb[st].y;
            if (de.up) y2 -= dd.h;
            if ((de.up && y2 > ym) || (!de.up && y2 < ym)) {
              y = ym;
            }
          }
        }
        uf = user[f];
        if (uf && typeof uf == "function") {
          uf(x, y, de);
          continue;
        }
        if (self.psdeco(f, x, y, de)) continue;
        anno_start(s, "deco");
        if (de.inv) {
          g_open(x, y, 0, 1, -1);
          x = y = 0;
        }

        if (de.has_val) {
          if (dd.func != 2 || stv_g.st < 0)
            out_deco_val(x, y, f, de.val / stv_g.scale, de.defl, s);
          else out_deco_val(x, y, f, de.val, de.defl, s);
          if (de.defl.noen) new_de.push(de.start);
        } else if (dd.str != undefined && dd.str != "sfz") {
          str = dd.str;
          if (str[0] == "@") {
            a = str.match(/^@([0-9.-]+),([0-9.-]+);?/);
            x += Number(a[1]);
            y += Number(a[2]);
            str = str.replace(a[0], "");
          }
          if (musicType != 2) {
            out_deco_str(x, y, f, str, dd.anchor, s); //加了一个anchor的参数，用于文本对齐，add by hxs,增加了参数s
          }
        } else if (de.lden) {
          out_deco_long(x, y, de);
        } else {
          if (dd.glyph != undefined && dd.glyph == "sld") {
            if (s.stem < 0) {
              //符干在下 左下的上滑音x坐标特殊处理
              x = x - 4;
            }
          }
          s.curr_dd = dd; //add by hxs
          // create by lhj
          if (musicType != 2) {
            xygl(x, y, f, 1, s); //增加了一个s参数
          }
          // 'hld'延音符
        }
        if (stv_g.g) g_close();
        if (de.dd.glyph != "my_staff_slur") {
          //如果是跨声部连音线，不画rect
          anno_stop(s, "deco");
        }
      }
      a_de = new_de;
    }

    //        function draw_all_deco() {
    //            if (a_de.length == 0) return
    //            var de, de2, dd, s, note, f, st, x, y, y2, ym, uf, i, str, a, new_de = [],
    //            ymid = []
    //            if (!cfmt.dynalign) {
    //                st = nstaff;
    //                y = staff_tb[st].y
    //                while (--st >= 0) {
    //                    y2 = staff_tb[st].y;
    //                    ymid[st] = (y + 24 + y2) * .5;
    //                    y = y2
    //                }
    //            }
    //            while (1) {
    //                de = a_de.shift()
    //                if (!de) break
    //                dd = de.dd
    //                if (!dd) continue
    //                if (dd.dd_en) continue
    //                s = de.s
    //                f = dd.glyph;
    //                i = f.indexOf('/')
    //                if (i > 0) {
    //                    if (s.stem >= 0) f = f.slice(0, i)
    //                    else f = f.slice(i + 1)
    //                }
    //                if (f_staff[dd.func]) set_sscale(s.st)
    //                else set_scale(s);
    //                st = de.st;
    //                if (!staff_tb[st].topbar) continue
    //                x = de.x;
    //                y = de.y + staff_tb[st].y
    //                if (de.m != undefined) {
    //                    note = s.notes[de.m];
    //                    x += note.shhd * stv_g.scale
    //                } else if (f_staff[dd.func] && !cfmt.dynalign && ((de.up && st > 0) || (!de.up && st < nstaff))) {
    //                    if (de.up) ym = ymid[--st]
    //                    else ym = ymid[st++];
    //                    ym -= dd.h * .5
    //                    if ((de.up && y < ym) || (!de.up && y > ym)) {
    //                        y2 = y_get(st, !de.up, de.x, de.val) + staff_tb[st].y
    //                        if (de.up) y2 -= dd.h
    //                        if ((de.up && y2 > ym) || (!de.up && y2 < ym)) {
    //                            y = ym
    //                        }
    //                    }
    //                }
    //                uf = user[f]
    //                if (uf && typeof(uf) == "function") {
    //                    uf(x, y, de)
    //                    continue
    //                }
    //                if (self.psdeco(f, x, y, de)) continue
    //                	anno_start(s, 'deco')
    //                	if (de.inv) {
    //                    g_open(x, y, 0, 1, -1);
    //                    x = y = 0
    //                }
    //                if (de.has_val) {
    //                    if (dd.func != 2 || stv_g.st < 0) out_deco_val(x, y, f, de.val / stv_g.scale, de.defl,s)
    //                    else out_deco_val(x, y, f, de.val, de.defl,s)
    //                    if (de.defl.noen) new_de.push(de.start)
    //                } else if (dd.str != undefined) {
    //                    str = dd.str
    //                    if (str[0] == '@') {
    //                        a = str.match(/^@([0-9.-]+),([0-9.-]+);?/);
    //                        x += Number(a[1]);
    //                        y += Number(a[2]);
    //                        str = str.replace(a[0], "")
    //                    }
    //                    out_deco_str(x, y, f, str)
    //                } else if (de.lden) {
    //                    out_deco_long(x, y, de)
    //                } else {
    //                    xygl(x, y, f)
    //                }
    //                if (stv_g.g) g_close();
    //                anno_stop(s, 'deco')
    //            }
    //            a_de = new_de
    //        }

    var ottava = {
      "8va(": 1,
      "8va)": 0,
      "8va_b(": 1,
      "8va_b)": 0,
      "15ma(": 2,
      "15ma)": 0,
      "8vb(": -1,
      "8vb)": 0,
      "8vb_t(": -1,
      "8vb_t)": 0,
      "15mb(": -2,
      "15mb)": 0,
    };
    function draw_deco_near() {
      var s, g;
      function ldeco_update(s) {
        var i,
          de,
          x = s.x - s.wl,
          nd = a_de.length;
        for (i = 0; i < nd; i++) {
          de = a_de[i];
          de.ix = i;
          de.s.x = de.x = x;
          de.defl.nost = true;
        }
      }
      function create_deco(s) {
        //            	console.log("create_deco:",s.istart,s)
        var dd,
          k,
          l,
          pos,
          de,
          x,
          nd = s.a_dd.length;
        for (k = 0; k < nd; k++) {
          dd = s.a_dd[k];
          switch (dd.func) {
            default:
              pos = 0;
              break;
            case 3:
            case 4:
              pos = s.pos.orn;
              break;
            case 6:
              pos = s.pos.vol;
              break;
            case 7:
              pos = s.pos.dyn;
              break;
          }
          if (pos == C.SL_HIDDEN) continue;
          de = {
            s: s,
            dd: dd,
            st: s.st,
            ix: a_de.length,
            defl: {},
            x: s.x,
            y: s.y,
          };
          a_de.push(de);
          if (dd.dd_en) {
            de.ldst = true;
          } else if (dd.dd_st) {
            de.lden = true;
            de.defl.nost = true;
          }
          if (!f_near[dd.func]) continue;
          func_tb[dd.func](de);
        }
      }

      function create_dh(s, m) {
        var f,
          str,
          de,
          uf,
          k,
          dcn,
          dd,
          note = s.notes[m],
          nd = note.a_dcn.length;
        for (k = 0; k < nd; k++) {
          dcn = note.a_dcn[k];
          dd = dd_tb[dcn];
          if (!dd) {
            dd = deco_def(dcn);
            if (!dd) continue;
          }
          switch (dd.func) {
            case 0:
            case 1:
            case 3:
            case 4:
            case 8:
              break;
            default:
              //                            error(1, null, "Cannot have !$1! on a head", dd.name)
              error(1, null, "!$1!不能放在这里", dd.name);
              continue;
            case 9:
              note.invis = true;
              break;
            case 10:
              note.color = dd.name;
              continue;
            case 32:
              note.invis = true;
              continue;
            case 40:
              s.stemless = true;
              continue;
          }
          de = {
            s: s,
            dd: dd,
            st: s.st,
            m: m,
            ix: 0,
            defl: {},
            x: s.x,
            y: 3 * (note.pit - 18),
          };
          a_de.push(de);
          if (dd.dd_en) {
            de.ldst = true;
          } else if (dd.dd_st) {
            de.lden = true;
            de.defl.nost = true;
          }
        }
      }

      function create_all(s) {
        var m;
        if (s.a_dd) create_deco(s);
        if (s.notes) {
          for (m = 0; m < s.notes.length; m++) {
            if (s.notes[m].a_dcn) create_dh(s, m);
          }
        }
      }

      function ll_deco() {
        var i,
          j,
          de,
          de2,
          dd,
          dd2,
          v,
          s,
          st,
          n_de = a_de.length;
        for (i = 0; i < n_de; i++) {
          de = a_de[i];
          if (!de.ldst) continue;
          dd = de.dd;
          dd2 = dd.dd_en;
          s = de.s;
          v = s.v;
          for (j = i + 1; j < n_de; j++) {
            de2 = a_de[j];
            if (!de2.start && de2.dd == dd2 && de2.s.v == v) break;
          }
          if (j == n_de) {
            st = s.st;
            for (j = i + 1; j < n_de; j++) {
              de2 = a_de[j];
              if (!de2.start && de2.dd == dd2 && de2.s.st == st) break;
            }
          }
          if (j == n_de) {
            de2 = {
              s: de.s,
              st: de.st,
              dd: dd2,
              ix: a_de.length - 1,
              x: realwidth - 6,
              y: de.s.y,
              lden: true,
              defl: {
                noen: true,
              },
            };
            if (de2.x < s.x + 10) de2.x = s.x + 10;
            if (de.m != undefined) de2.m = de.m;
            a_de.push(de2);
          }
          de2.start = de;
          de2.defl.nost = de.defl.nost;
          if (dd.name == "trill(" && i > 0 && a_de[i - 1].dd.name == "trill")
            de2.prev = a_de[i - 1];
        }
        for (i = 0; i < n_de; i++) {
          de2 = a_de[i];
          if (!de2.lden || de2.start) continue;
          s = de2.s;
          de = {
            s: prev_scut(s),
            st: de2.st,
            dd: de2.dd.dd_st,
            ix: a_de.length - 1,
            y: s.y,
            ldst: true,
          };
          de.x = de.s.x;
          if (de2.m != undefined) de.m = de2.m;
          a_de.push(de);
          de2.start = de;
        }
      }
      for (s = tsfirst; s; s = s.ts_next) {
        switch (s.type) {
          case C.CLEF:
          case C.KEY:
          case C.METER:
            continue;
        }
        break;
      }
      if (a_de.length != 0) ldeco_update(s);
      for (; s; s = s.ts_next) {
        switch (s.type) {
          case C.BAR:
          case C.MREST:
          case C.NOTE:
          case C.REST:
          case C.SPACE:
            break;
          case C.GRACE:
            for (g = s.extra; g; g = g.next) create_all(g);
          default:
            continue;
        }
        create_all(s);
      }
      ll_deco();
    }
    //画跨声部连音线
    function draw_voice_slur() {
      if (voice_slurs.length > 0) {
        for (var i = 0; i < voice_slurs.length; i++) {
          var s1 = voice_slurs[i].s1;
          var s2 = voice_slurs[i].s2;
          if (s1 == null || s2 == null) {
            continue;
          }
          if (!voice_slurs[i].has_draw) {
            voice_slurs[i].has_draw = true;
            draw_stave_slur(
              s1,
              s2,
              -1,
              -1,
              voice_slurs[i].direct,
              voice_slurs[i]
            );
          }
        }
      }
    }
    //画跨声部的连音线
    function draw_stave_slur(k1_o, k2, m1, m2, slur_type, slurinfo) {
      //在不同的声部时，调换一个位置
      if (k1_o.st != k2.st) {
        var tmp_k = clone(k2);
        k2 = clone(k1_o);
        k1_o = tmp_k;
      }
      var k1 = k1_o,
        k,
        g,
        x1,
        y1,
        x2,
        y2,
        height,
        addy,
        a,
        y,
        z,
        h,
        dx,
        dy,
        dir;
      //while (k1.v != k2.v) k1 = k1.ts_next;
      switch (slur_type & 7) {
        case C.SL_ABOVE:
          dir = 1;
          break;
        case C.SL_BELOW:
          dir = -1;
          break;
        default:
          dir = slur_multi(k1, k2);
          if (!dir) dir = slur_direction(k1, k2);
          break;
      }
      var nn = 1,
        upstaff = k1.st,
        two_staves = false;
      if (k1 != k2) {
        k = k1.next;
        while (1) {
          if (!k) break;
          if (k.type) {
            if (k.type == C.NOTE || k.type == C.REST) {
              nn++;
              if (k.st != upstaff) {
                two_staves = true;
                if (k.st < upstaff) upstaff = k.st;
              }
            }
          }
          if (k == k2) break;
          k = k.next;
        }
      }
      x1 = k1_o.x;
      if (k1_o.notes && k1_o.notes[0].shhd) x1 += k1_o.notes[0].shhd;
      if (k1_o != k2) {
        x2 = k2.x;
        if (k2.notes) x2 += k2.notes[0].shhd;
      } else {
        for (k = k2.ts_next; k; k = k.ts_next) if (k.type == C.STAVES) break;
        x2 = k ? k.x : realwidth;
      }
      if (m1 >= 0) {
        y1 = 3 * (k1.notes[m1].pit - 18) + 5 * dir;
      } else {
        y1 = dir > 0 ? k1.ymx + 2 : k1.ymn - 2;
        if (k1.type == C.NOTE) {
          if (dir > 0) {
            if (k1.stem > 0) {
              x1 += 5;
              if (k1.beam_end && k1.nflags >= -1 && !k1.in_tuplet) {
                if (k1.nflags > 0) {
                  x1 += 2;
                  y1 = k1.ys - 3;
                } else {
                  y1 = k1.ys - 6;
                }
              }
            }
          } else {
            if (k1.stem < 0) {
              x1 -= 1;
              if (k2.grace) {
                y1 = k1.y - 8;
              } else if (
                k1.beam_end &&
                k1.nflags >= -1 &&
                (!k1.in_tuplet || k1.ys < y1 + 3)
              ) {
                if (k1.nflags > 0) {
                  x1 += 2;
                  y1 = k1.ys + 3;
                } else {
                  y1 = k1.ys + 6;
                }
              }
            }
          }
        }
      }
      if (m2 >= 0) {
        y2 = 3 * (k2.notes[m2].pit - 18) + 5 * dir;
      } else {
        y2 = dir > 0 ? k2.ymx + 2 : k2.ymn - 2;
        if (k2.type == C.NOTE) {
          if (dir > 0) {
            if (k2.stem > 0) {
              x2 += 1;
              if (k2.beam_st && k2.nflags >= -1 && !k2.in_tuplet)
                y2 = k2.ys - 6;
            }
          } else {
            if (k2.stem < 0) {
              x2 -= 5;
              if (k2.beam_st && k2.nflags >= -1 && !k2.in_tuplet)
                y2 = k2.ys + 6;
            }
          }
        }
      }
      if (k1.type != C.NOTE) {
        y1 = y2 + 1.2 * dir;
        x1 = k1.x + k1.wr * 0.5;
        if (x1 > x2 - 12) x1 = x2 - 12;
      }
      if (k2.type != C.NOTE) {
        if (k1.type == C.NOTE) y2 = y1 + 1.2 * dir;
        else y2 = y1;
        if (k1 != k2) x2 = k2.x - k2.wl * 0.3;
      }
      if (nn >= 3) {
        if (k1.next.type != C.BAR && k1.next.x < x1 + 48) {
          if (dir > 0) {
            y = k1.next.ymx - 2;
            if (y1 < y) y1 = y;
          } else {
            y = k1.next.ymn + 2;
            if (y1 > y) y1 = y;
          }
        }
        if (k2.prev && k2.prev.type != C.BAR && k2.prev.x > x2 - 48) {
          if (dir > 0) {
            y = k2.prev.ymx - 2;
            if (y2 < y) y2 = y;
          } else {
            y = k2.prev.ymn + 2;
            if (y2 > y) y2 = y;
          }
        }
      }
      a = (y2 - y1) / (x2 - x1);
      if (a > SLUR_SLOPE || a < -SLUR_SLOPE) {
        a = a > SLUR_SLOPE ? SLUR_SLOPE : -SLUR_SLOPE;
        if (a * dir > 0) y1 = y2 - a * (x2 - x1);
        else y2 = y1 + a * (x2 - x1);
      }
      y = y2 - y1;
      if (y > 8) y = 8;
      else if (y < -8) y = -8;
      z = y;
      if (z < 0) z = -z;
      dx = 0.5 * z;
      dy = 0.3 * y;
      if (y * dir > 0) {
        x2 -= dx;
        y2 -= dy;
      } else {
        x1 += dx;
        y1 += dy;
      }
      if (k1.grace) x1 = k1.x - GSTEM_XOFF * 0.5;
      if (k2.grace) x2 = k2.x + GSTEM_XOFF * 1.5;
      h = 0;
      a = (y2 - y1) / (x2 - x1);
      if (k1 != k2 && k1.v == k2.v) {
        addy = y1 - a * x1;
        for (k = k1.next; k != k2; k = k.next) {
          if (!k) break;
          if (k.st != upstaff) continue;
          switch (k.type) {
            case C.NOTE:
            case C.REST:
              if (dir > 0) {
                y = 3 * (k.notes[k.nhd].pit - 18) + 6;
                if (y < k.ymx) y = k.ymx;
                y -= a * k.x + addy;
                if (y > h) h = y;
              } else {
                y = 3 * (k.notes[0].pit - 18) - 6;
                if (y > k.ymn) y = k.ymn;
                y -= a * k.x + addy;
                if (y < h) h = y;
              }
              break;
          }
        }
        y1 += 0.45 * h;
        y2 += 0.45 * h;
        h *= 0.65;
      }
      if (nn > 3) height = (0.08 * (x2 - x1) + 12) * dir;
      else height = (0.03 * (x2 - x1) + 8) * dir;
      if (dir > 0) {
        if (height < 3 * h) height = 3 * h;
        if (height > 40) height = 40;
      } else {
        if (height > 3 * h) height = 3 * h;
        if (height < -40) height = -40;
      }
      y = y2 - y1;
      if (y < 0) y = -y;
      if (dir > 0) {
        if (height < 0.8 * y) height = 0.8 * y;
      } else {
        if (height > -0.8 * y) height = -0.8 * y;
      }
      height *= cfmt.slurheight;
      if (musicType != 2) {
        if (k1_o.st != k2.st) {
          //不在一个谱表内
          height *= cfmt.slurheight * 5;
          if (slurinfo.y1 == -1 && slurinfo.y2 == -1) {
            if (k1_o.x < k2.x) {
              //下面声部对应音符x坐标在前
              if (k1_o.st < k2.st) {
                if (slur_type == 1) {
                  y2 -= 60;
                } else if (slur_type == 2) {
                  y2 -= 30;
                } else if (slur_type == 22) {
                  //y1 += 30;
                } else if (slur_type == 11) {
                  y1 += 90;
                  slur_type = 1;
                  dir = -1;
                }
              } else {
                if (slur_type == 1) {
                  y1 -= 60;
                } else if (slur_type == 2) {
                  y1 -= 30;
                }
              }
            } else {
              //下面声部对应音符x坐标在后
              if (k1_o.st < k2.st) {
                if (slur_type == 1) {
                  y1 += 60;
                } else if (slur_type == 2) {
                  y1 += 30;
                }
              } else {
                if (slur_type == 1) {
                  y2 -= 60;
                } else if (slur_type == 2) {
                  y2 -= 30;
                }
              }
            }
          } else {
            y1 += parseFloat(slurinfo.y1);
            y2 += parseFloat(slurinfo.y2);
            if (slurinfo.height) {
              height = cfmt.slurheight * slurinfo.height;
            }
            if (slurinfo.dir) {
              dir = slurinfo.dir;
            }
          }
        }
        var offsetY = 0;
        if (k1.stem == 1) {
          //符干在上面,减掉符干的高度
          offsetY = -21; // 符干的高度
          if (height > 0) {
            height =
              Math.abs(height) - Math.abs(Math.abs(y1) - Math.abs(y2)) - 21;
          } else {
            height = -(
              Math.abs(height) -
              Math.abs(Math.abs(y1) - Math.abs(y2)) -
              21
            );
          }
        }
        slur_out(
          x1,
          y1 + offsetY,
          x2 + 10,
          y2,
          dir,
          height,
          slur_type & C.SL_DOTTED
        );
      }
    }

    function draw_deco_note() {
      var i,
        de,
        dd,
        f,
        nd = a_de.length;
      for (i = 0; i < nd; i++) {
        de = a_de[i];
        dd = de.dd;
        f = dd.func;
        if (f_note[f] && de.m == undefined) func_tb[f](de);
      }
    }
    function draw_deco_staff() {
      var s,
        first_gchord,
        p_voice,
        x,
        y,
        w,
        i,
        v,
        de,
        dd,
        gch,
        gch2,
        ix,
        top,
        bot,
        minmax = new Array(nstaff + 1),
        nd = a_de.length;

      function draw_repbra(p_voice) {
        // 绘制反复记号
        var s, s1, y, y2, i, p, w, wh, first_repeat;
        y = staff_tb[p_voice.st].topbar + 25;
        for (s = p_voice.sym; s; s = s.next) {
          if (s.type != C.BAR) continue;
          if (!s.rbstart || s.norepbra) continue;
          if (!s.next) break;
          if (!first_repeat) {
            first_repeat = s;
            set_font("repeat");
          }
          s1 = s;
          for (;;) {
            if (!s.next) break;
            s = s.next;
            if (s.rbstop) break;
          }
          y2 = y_get(p_voice.st, true, s1.x, s.x - s1.x);
          if (y < y2) y = y2;
          if (s1.text) {
            wh = strwh(s1.text);
            y2 = y_get(p_voice.st, true, s1.x + 4, wh[0]);
            y2 += wh[1];
            if (y < y2) y = y2;
          }
          if (s.rbstart) s = s.prev;
        }
        s = first_repeat;
        if (!s) return;
        set_dscale(p_voice.st, true);
        y2 = y * staff_tb[p_voice.st].staffscale;
        for (; s; s = s.next) {
          if (!s.rbstart || s.norepbra) continue;
          s1 = s;
          while (1) {
            if (!s.next) break;
            s = s.next;
            if (s.rbstop) break;
          }
          if (s1 == s) break;
          x = s1.x;
          if (s.type != C.BAR) {
            w = s.rbstop ? 0 : s.x - realwidth + 4;
          } else if (
            (s.bar_type.length > 1 && s.bar_type != "[]") ||
            s.bar_type == "]"
          ) {
            if (s1.st > 0 && !(cur_sy.staves[s1.st - 1].flags & STOP_BAR))
              w = s.wl;
            else if (s.bar_type.slice(-1) == ":") w = 12;
            else if (s.bar_type[0] != ":") w = 0;
            else w = 8;
          } else {
            w = s.rbstop ? 0 : 8;
          }
          w = s.x - x - w;
          if (!s.next && !s.rbstop && !p_voice.bar_start) {
            p_voice.bar_start = clone(s);
            p_voice.bar_start.type = C.BAR;
            p_voice.bar_start.bar_type = "";
            delete p_voice.bar_start.text;
            p_voice.bar_start.rbstart = 1;
            delete p_voice.bar_start.a_gch;
          }
          if (2 == musicType) {
            var dc =
              s1.a_dd &&
              s1.a_dd.find(function (a) {
                return a.glyph == "dacs";
              });
            if (dc) {
              y2 = y2 - 20;
            }
          }
          if (s1.text) {
            if (!s1.invis) {
              //add by hxs 如果s1本身是隐藏的，那么也不显示分段文本
              xy_str(
                x + 4,
                y2 - gene.curfont.size - 3,
                s1.text,
                "repeatbar",
                "repeatbar",
                null,
                null,
                s1
              );
            }
          }
          // 绘制反复记号线
          // create by lhj
          x = x + 2
          if (2 == musicType) {
            out_XYAB('<path class="A" d="mX Y\n', x, y2, "stroke", 0, 1);
          } else {
            if (!s.invis) {
              //add by hxs 如果s本身是隐藏的，那么也不显示分段文本
              xypath(x, y2);
            }
          }
          w = w - 2;
          if (s1.rbstart == 2) output += "m0 20v-20";
          output += "h" + w.toFixed(1);
          if (s.rbstop == 2) output += "v20";
          output += '"/>\n';
          y_set(s1.st, true, x, w, y + 2);
          if (s.rbstart) s = s.prev;
        }
      }
      for (i = 0; i <= nstaff; i++)
        minmax[i] = {
          ymin: 0,
          ymax: 0,
        };
      for (i = 0; i < nd; i++) {
        de = a_de[i];
        dd = de.dd;
        if (!dd) continue;
        if (!f_staff[dd.func] || de.m != undefined) continue;
        func_tb[dd.func](de);
        if (dd.dd_en) continue;
        if (cfmt.dynalign) {
          if (de.up) {
            if (de.y > minmax[de.st].ymax) minmax[de.st].ymax = de.y;
          } else {
            if (de.y < minmax[de.st].ymin) minmax[de.st].ymin = de.y;
          }
        }
      }
      for (i = 0; i < nd; i++) {
        de = a_de[i];
        dd = de.dd;
        if (!dd) continue;
        if (dd.dd_en || !f_staff[dd.func]) continue;
        if (cfmt.dynalign) {
          if (de.up) y = minmax[de.st].ymax;
          else y = minmax[de.st].ymin;
          de.y = y;
        } else {
          y = de.y;
        }
        if (de.up) y += dd.h;
        y_set(de.st, de.up, de.x, de.val, y);
      }
      for (i = 0; i <= nstaff; i++)
        minmax[i] = {
          ymin: 0,
          ymax: 24,
        };
      for (s = tsfirst; s; s = s.ts_next) {
        if (!s.a_gch) continue;
        if (!first_gchord) first_gchord = s;
        gch2 = null;
        for (ix = 0; ix < s.a_gch.length; ix++) {
          gch = s.a_gch[ix];
          if (gch.type != "g") continue;
          gch2 = gch;
          if (gch.y < 0) break;
        }
        if (gch2) {
          w = gch2.wh[0];
          if (gch2.y >= 0) {
            y = y_get(s.st, true, s.x, w);
            if (y > minmax[s.st].ymax) minmax[s.st].ymax = y;
          } else {
            y = y_get(s.st, false, s.x, w);
            if (y < minmax[s.st].ymin) minmax[s.st].ymin = y;
          }
        }
      }
      if (first_gchord) {
        for (i = 0; i <= nstaff; i++) {
          bot = staff_tb[i].botbar;
          if (minmax[i].ymin > bot - 4) minmax[i].ymin = bot - 4;
          top = staff_tb[i].topbar;
          if (minmax[i].ymax < top + 4) minmax[i].ymax = top + 4;
        }
        set_dscale(-1);
        arp_links = new Array();
        for (s = first_gchord; s; s = s.ts_next) {
          if (!s.a_gch) continue;
          draw_gchord(s, minmax[s.st].ymin, minmax[s.st].ymax);
          draw_voice_slur(); //跨声部连音线 add by hxs
        }
      }
      for (v = 0; v < voice_tb.length; v++) {
        p_voice = voice_tb[v];
        if (p_voice.second || !p_voice.sym) continue;
        draw_repbra(p_voice);
      }
    }

    // 小节线上的序号
    function draw_measnb() {
      var s,
        st,
        bar_num,
        x,
        y,
        w,
        any_nb,
        font_size,
        w0,
        sy = cur_sy;
      for (st = 0; st <= nstaff; st++) {
        if (sy.st_print[st]) break;
      }
      if (st > nstaff) return;
      set_dscale(st);
      if (staff_tb[st].staffscale != 1) {
        font_size = get_font("measure").size;
        param_set_font(
          "measurefont",
          "* " + (font_size / staff_tb[st].staffscale).toString()
        );
      }
      set_font("measure");
      w0 = cwidf("0");
      s = tsfirst;
      bar_num = gene.nbar;
      if (bar_num > 1) {
        if (cfmt.measurenb == 0) {
          any_nb = true;
          y = y_get(st, true, 0, 20);
          if (y < staff_tb[st].topbar + 14) y = staff_tb[st].topbar + 14;
          xy_str(0, y, bar_num.toString(), "barnum", "barnum");
          y_set(st, true, 0, 20, y + gene.curfont.size + 2);
        } else if (bar_num % cfmt.measurenb == 0) {
          for (; ; s = s.ts_next) {
            switch (s.type) {
              case C.CLEF:
              case C.KEY:
              case C.METER:
              case C.STBRK:
                continue;
            }
            break;
          }
          if (s.type != C.BAR || !s.bar_num) {
            if (s.prev) s = s.prev;
            any_nb = true;
            w = w0;
            if (bar_num >= 10) w *= bar_num >= 100 ? 3 : 2;
            if (gene.curfont.pad) w += gene.curfont.pad * 2;
            x = s.x + s.wr + 1;
            y = y_get(st, true, x, w);
            if (y < staff_tb[st].topbar + 6) y = staff_tb[st].topbar + 6;
            if (gene.curfont.pad) {
              y += 2 + gene.curfont.pad;
            } else {
              y += 2;
            }
            //if(musicType != 2){// 简谱显示自己的小节序号create by lhj  先用原来自带的功，因为在第一声部隐藏，只显示第二声部时，简谱的小节序号显示有问题 hxs 2021-4-26
            xy_str(x, y, bar_num.toString(), "barnum", "barnum");
            //}
            if (gene.curfont.pad) {
              y += gene.curfont.size + gene.curfont.pad;
            } else {
              y += gene.curfont.size;
            }
            y_set(st, true, x, w, y);
            s.ymx = y;
          }
        }
      }
      for (; s; s = s.ts_next) {
        switch (s.type) {
          case C.STAVES:
            sy = s.sy;
            for (st = 0; st < nstaff; st++) {
              if (sy.st_print[st]) break;
            }
            set_dscale(st);
            continue;
          default:
            continue;
          case C.BAR:
            if (!s.bar_num || s.bar_num <= 1) continue;
            break;
        }
        bar_num = s.bar_num;
        if (
          cfmt.measurenb == 0 ||
          bar_num % cfmt.measurenb != 0 ||
          !s.next ||
          s.bar_mrep
        )
          continue;
        if (!any_nb) any_nb = true;
        w = w0;
        if (bar_num >= 10) w *= bar_num >= 100 ? 3 : 2;
        if (gene.curfont.pad) w += gene.curfont.pad * 2;
        x = s.x - w * (s.text ? 0.6 : 0.4);
        y = y_get(st, true, x, w);
        if (y < staff_tb[st].topbar + 3) y = staff_tb[st].topbar + 3;
        if (s.next.type == C.NOTE) {
          if (s.next.stem > 0) {
            if (y < s.next.ys - gene.curfont.size)
              y = s.next.ys - gene.curfont.size;
          } else {
            if (y < s.next.y) y = s.next.y;
          }
        }
        if (gene.curfont.pad) {
          y += 2 + gene.curfont.pad;
        } else {
          y += 2;
        }

        //if(musicType != 2){ // 简谱显示自己的小节序号create by lhj 先用原来自带的功，因为在第一声部隐藏，只显示第二声部时，简谱的小节序号显示有问题 hxs 2021-4-26
        xy_str(x, y, bar_num.toString(), "barnum", "barnum");
        //}
        if (gene.curfont.pad) {
          y += gene.curfont.size + gene.curfont.pad;
        } else {
          y += gene.curfont.size;
        }

        y_set(st, true, x, w, y);
        s.ymx = y;
      }
      gene.nbar = bar_num;
      if (font_size) param_set_font("measurefont", "* " + font_size.toString());
    }
    // 画的是速度标识：1/4 = 120
    function draw_notempo(s, x, y, dur, sc) {
      var dx,
        p,
        dotx,
        elts = identify_note(s, dur),
        head = elts[0],
        dots = elts[1],
        nflags = elts[2];
      // console.log('绘制速度');
      out_XYAB(
        '<g type="notempo" transform="translate(X,Y) scale(F)">\n',
        x + 4,
        y + 5,
        sc
      );
      switch (head) {
        case C.OVAL:
          p = "HD";
          break;
        case C.EMPTY:
          p = "Hd";
          break;
        default:
          p = "hd";
          break;
      }
      // 最后一个参数，后来加的 create by lhj
      xygl(-posx, posy, p, 1, s);
      dx = 4;
      if (dots) {
        dotx = 9;
        if (nflags > 0) dotx += 4;
        switch (head) {
          case C.SQUARE:
            dotx += 3;
            break;
          case C.OVALBARS:
          case C.OVAL:
            dotx += 2;
            break;
          case C.EMPTY:
            dotx += 1;
            break;
        }
        dx = dotx * dots;
        dotx -= posx;
        while (--dots >= 0) {
          xygl(dotx, posy, "dot", null, s);
          dotx += 3.5;
        }
      }
      if (dur < C.BLEN) {
        if (nflags <= 0) {
          out_stem(-posx, posy, 21, null, null, null, 1, 1, s); // 最后一个参数isPassRpl
        } else {
          out_stem(-posx, posy, 21, false, nflags, null, 1, 1, s);
          if (dx < 6) dx = 6;
        }
      }
      output += "</g>\n";
      return (dx + 15) * sc;
    }
    function tempo_width(s) {
      var w = 0;
      set_font("tempo");
      if (s.tempo_str1) w = strwh(s.tempo_str1)[0];
      if (s.tempo_ca) w += strwh(s.tempo_ca)[0];
      if (s.tempo_notes)
        w +=
          10 * s.tempo_notes.length +
          6 +
          cwid(" ") * gene.curfont.swfac * 6 +
          10;
      if (s.tempo_str2) w += strwh(s.tempo_str2)[0];
      return w;
    }

    // 画速度
    function write_tempo(s, x, y) {
      var j,
        dx,
        sc = (0.6 * gene.curfont.size) / 15;
      set_font("tempo");
      if (s.tempo_str1) {
        xy_str(x, y, s.tempo_str1);
        x += strwh(s.tempo_str1)[0] + 3;
      }
      // 保存当前音符信息
      abc.setCurS(s);
      // 新增 create by lhj
      if (0 != musicType && !hasTempo) {
        var w = 0,
          modeString;
        if (tmVal2key[getToneMark(source_val)]) {
          modeString = tmVal2key[getToneMark(source_val)].replace(/[_\^]/g, "");
        }
        if (!modeString) {
          w = 4;
        }
        x = sh(tempoMgL + 28 + w + strwh("2")[0] + 30);
        if (source_val.indexOf("%%text") == -1) {
          y += typeof tempoMgB == "undefined" ? 0 : tempoMgB;
        }
      }
      if (s.tempo_notes) {
        for (j = 0; j < s.tempo_notes.length; j++)
          x += draw_notempo(s, x, y, s.tempo_notes[j], sc);
        xy_str(x, y, "=");
        x += strwh("= ")[0];
        if (s.tempo_ca) {
          xy_str(x, y, s.tempo_ca);
          x += strwh(s.tempo_ca)[0];
        }
        if (s.tempo) {
          xy_str(x, y, s.tempo.toString());
          dx = cwid("0") * gene.curfont.swfac;
          x += dx + 5;
          if (s.tempo >= 10) {
            x += dx;
            if (s.tempo >= 100) x += dx;
          }
        } else {
          x += draw_notempo(s, x, y, s.new_beat, sc);
        }
      }
      if (s.tempo_str2) xy_str(x, y, s.tempo_str2);
      s.del = true;
    }
    function draw_partempo(st, top) {
      var s,
        some_part,
        some_tempo,
        h,
        w,
        y,
        dy = 0,
        ht = 0;
      var ymin = staff_tb[st].topbar + 8,
        dosh = 0,
        shift = 1,
        x = -100;
      for (s = tsfirst; s; s = s.ts_next) {
        if (s.type != C.TEMPO || s.del) continue;
        if (!some_tempo) some_tempo = s;
        w = s.tempo_wh[0];
        if (s.time == 0 && s.x > 40) s.x = 40;
        y = y_get(st, true, s.x - 16, w);
        if (y > ymin) ymin = y;
        if (x >= s.x - 16 && !(dosh & (shift >> 1))) dosh |= shift;
        shift <<= 1;
        x = s.x - 16 + w;
      }
      //gene.curfont.size = 12//写死测试
      if (some_tempo) {
        set_sscale(-1);
        set_font("tempo");
        ht = gene.curfont.size + 8;
        y = 2 - ht;
        h = y - ht;
        if (dosh != 0) ht *= 2;
        if (top < ymin + ht) dy = ymin + ht - top;
        for (s = some_tempo; s; s = s.ts_next) {
          if (s.type != C.TEMPO || s.del) continue;
          if (user.anno_start || user.anno_stop) {
            s.wl = 16;
            s.wr = 30;
            s.ymn = dosh & 1 ? h : y;
            s.ymx = s.ymn + 14;
            anno_start(s);
          }
          // create by lhj 20220509
          abc.setCurS(s);
          writempo(s, s.x - 16, dosh & 1 ? h : y);
          anno_stop(s);
          dosh >>= 1;
        }
      }
      ymin = staff_tb[st].topbar + 6;
      for (s = tsfirst; s; s = s.ts_next) {
        if (s.type != C.PART) continue;
        if (!some_part) {
          some_part = s;
          set_font("parts");
          h = gene.curfont.size + 2;
        }
        w = strwh(s.text)[0];
        y = y_get(st, true, s.x - 10, w + 3);
        if (ymin < y) ymin = y;
      }
      if (some_part) {
        set_sscale(-1);
        if (gene.curfont.box) h += 2;
        if (top < ymin + h + ht) dy = ymin + h + ht - top;
        for (s = some_part; s; s = s.ts_next) {
          if (s.type != C.PART) continue;
          s.x -= 10;
          if (user.anno_start || user.anno_stop) {
            w = strwh(s.text)[0];
            s.wl = 0;
            s.wr = w;
            s.ymn = -ht - h;
            s.ymx = s.ymn + h;
            anno_start(s);
          }
          xy_str(s.x, 2 - ht - h, s.text);
          anno_stop(s);
        }
      }
      return dy;
    }
    var STEM_MIN = 16,
      STEM_MIN2 = 14,
      STEM_MIN3 = 12,
      STEM_MIN4 = 10,
      STEM_CH_MIN = 14,
      STEM_CH_MIN2 = 10,
      STEM_CH_MIN3 = 9,
      STEM_CH_MIN4 = 9,
      BEAM_DEPTH = 3.2,
      BEAM_OFFSET = 0.25,
      BEAM_SHIFT = 5,
      BEAM_SLOPE = 0.4,
      BEAM_STUB = 8,
      SLUR_SLOPE = 0.5,
      GSTEM = 15,
      GSTEM_XOFF = 2.3;
    var cache;
    function b_pos(grace, stem, nflags, b) {
      var top,
        bot,
        d1,
        d2,
        shift = !grace ? BEAM_SHIFT : 3.5,
        depth = !grace ? BEAM_DEPTH : 1.8;
      function rnd6(y) {
        var iy = Math.round((y + 12) / 6) * 6 - 12;
        return iy - y;
      }
      if (stem > 0) {
        bot = b - (nflags - 1) * shift - depth;
        if (bot > 26) return 0;
        top = b;
      } else {
        top = b + (nflags - 1) * shift + depth;
        if (top < -2) return 0;
        bot = b;
      }
      d1 = rnd6(top - BEAM_OFFSET);
      d2 = rnd6(bot + BEAM_OFFSET);
      return d1 * d1 > d2 * d2 ? d2 : d1;
    }
    function sym_dup(s_orig) {
      var m,
        note,
        s = clone(s_orig);
      s.invis = true;
      delete s.text;
      delete s.a_gch;
      delete s.a_ly;
      delete s.a_dd;
      s.notes = clone(s_orig.notes);
      for (m = 0; m <= s.nhd; m++) {
        note = s.notes[m] = clone(s_orig.notes[m]);
        delete note.a_dcn;
      }
      return s;
    }
    var min_tb = [
      [STEM_MIN, STEM_MIN, STEM_MIN2, STEM_MIN3, STEM_MIN4, STEM_MIN4],
      [
        STEM_CH_MIN,
        STEM_CH_MIN,
        STEM_CH_MIN2,
        STEM_CH_MIN3,
        STEM_CH_MIN4,
        STEM_CH_MIN4,
      ],
    ];
    Abc.prototype.calculate_beam = function (bm, s1) {
      var s,
        s2,
        g,
        notes,
        nflags,
        st,
        v,
        two_staves,
        two_dir,
        x,
        y,
        ys,
        a,
        b,
        stem_err,
        max_stem_err,
        p_min,
        p_max,
        s_closest,
        stem_xoff,
        scale,
        visible,
        dy;
      if (!s1.beam_st) {
        s = sym_dup(s1);
        lkvsym(s, s1);
        lktsym(s, s1);
        s.x -= 12;
        if (s.x > s1.prev.x + 12) s.x = s1.prev.x + 12;
        s.beam_st = true;
        delete s.beam_end;
        s.tmp = true;
        delete s.sls;
        s1 = s;
      }
      notes = nflags = 0;
      two_staves = two_dir = false;
      st = s1.st;
      v = s1.v;
      stem_xoff = s1.grace ? GSTEM_XOFF : 3.5;
      for (s2 = s1; ; s2 = s2.next) {
        if (s2.type == C.NOTE) {
          if (s2.nflags > nflags) nflags = s2.nflags;
          notes++;
          if (s2.st != st) two_staves = true;
          if (s2.stem != s1.stem) two_dir = true;
          if (!visible && !s2.invis && (!s2.stemless || s2.trem2))
            visible = true;
          if (s2.beam_end) break;
        }
        if (!s2.next) {
          for (; ; s2 = s2.prev) {
            if (s2.type == C.NOTE) break;
          }
          s = sym_dup(s2);
          s.next = s2.next;
          if (s.next) s.next.prev = s;
          s2.next = s;
          s.prev = s2;
          s.ts_next = s2.ts_next;
          if (s.ts_next) s.ts_next.ts_prev = s;
          s2.ts_next = s;
          s.ts_prev = s2;
          delete s.beam_st;
          s.beam_end = true;
          s.tmp = true;
          delete s.sls;
          s.x += 12;
          if (s.x < realwidth - 12) s.x = realwidth - 12;
          s2 = s;
          notes++;
          break;
        }
      }
      if (!visible) return false;
      bm.s2 = s2;
      if (staff_tb[st].y == 0) {
        if (two_staves) return false;
      } else {
        if (!two_staves) {
          bm.s1 = s1;
          bm.a = (s1.ys - s2.ys) / (s1.xs - s2.xs);
          bm.b = s1.ys - s1.xs * bm.a + staff_tb[st].y;
          bm.nflags = nflags;
          return true;
        }
      }
      s_closest = s1;
      p_min = 100;
      p_max = 0;
      for (s = s1; ; s = s.next) {
        if (s.type != C.NOTE) continue;
        if ((scale = s.p_v.scale) == 1) scale = staff_tb[s.st].staffscale;
        if (s.stem >= 0) {
          x = stem_xoff + s.notes[0].shhd;
          if (s.notes[s.nhd].pit > p_max) {
            p_max = s.notes[s.nhd].pit;
            s_closest = s;
          }
        } else {
          x = -stem_xoff + s.notes[s.nhd].shhd;
          if (s.notes[0].pit < p_min) {
            p_min = s.notes[0].pit;
            s_closest = s;
          }
        }
        s.xs = s.x + x * scale;
        if (s == s2) break;
      }
      if (s.grace && cfmt.flatbeams) a = 0;
      else if (!two_dir && notes >= 3 && s_closest != s1 && s_closest != s2)
        a = 0;
      y = s1.ys + staff_tb[st].y;
      if (a == undefined) a = (s2.ys + staff_tb[s2.st].y - y) / (s2.xs - s1.xs);
      if (a != 0) a = (cfmt.beamslope * a) / (cfmt.beamslope + Math.abs(a));
      b = (y + s2.ys + staff_tb[s2.st].y) / 2 - (a * (s2.xs + s1.xs)) / 2;
      max_stem_err = 0;
      s = s1;
      if (two_dir) {
        ys = ((s1.grace ? 3.5 : BEAM_SHIFT) * (nflags - 1) + BEAM_DEPTH) * 0.5;
        if (s1.stem != s2.stem && s1.nflags < s2.nflags) b += ys * s2.stem;
        else b += ys * s1.stem;
      } else if (!s1.grace) {
        var beam_h = BEAM_DEPTH + BEAM_SHIFT * (nflags - 1);
        while (
          s.ts_prev &&
          s.ts_prev.type == C.NOTE &&
          s.ts_prev.time == s.time &&
          s.ts_prev.x > s1.xs
        )
          s = s.ts_prev;
        for (; s && s.time <= s2.time; s = s.ts_next) {
          if (s.type != C.NOTE || s.invis || (s.st != st && s.v != v)) {
            continue;
          }
          x = s.v == v ? s.xs : s.x;
          ys = a * x + b - staff_tb[s.st].y;
          if (s.v == v) {
            stem_err = min_tb[s.nhd == 0 ? 0 : 1][s.nflags];
            if (s.stem > 0) {
              if (s.notes[s.nhd].pit > 26) {
                stem_err -= 2;
                if (s.notes[s.nhd].pit > 28) stem_err -= 2;
              }
              stem_err -= ys - 3 * (s.notes[s.nhd].pit - 18);
            } else {
              if (s.notes[0].pit < 18) {
                stem_err -= 2;
                if (s.notes[0].pit < 16) stem_err -= 2;
              }
              stem_err -= 3 * (s.notes[0].pit - 18) - ys;
            }
            stem_err += BEAM_DEPTH + BEAM_SHIFT * (s.nflags - 1);
          } else {
            if (s1.stem > 0) {
              if (s.stem > 0) {
                if (s.ymn > ys + 4 || s.ymx < ys - beam_h - 2) continue;
                if (s.v > v) stem_err = s.ymx - ys;
                else stem_err = s.ymn + 8 - ys;
              } else {
                stem_err = s.ymx - ys;
              }
            } else {
              if (s.stem < 0) {
                if (s.ymx < ys - 4 || s.ymn > ys - beam_h - 2) continue;
                if (s.v < v) stem_err = ys - s.ymn;
                else stem_err = ys - s.ymx + 8;
              } else {
                stem_err = ys - s.ymn;
              }
            }
            stem_err += 2 + beam_h;
          }
          if (stem_err > max_stem_err) max_stem_err = stem_err;
        }
      } else {
        for (; ; s = s.next) {
          ys = a * s.xs + b - staff_tb[s.st].y;
          stem_err = GSTEM - 2;
          if (s.stem > 0) stem_err -= ys - 3 * (s.notes[s.nhd].pit - 18);
          else stem_err += ys - 3 * (s.notes[0].pit - 18);
          stem_err += 3 * (s.nflags - 1);
          if (stem_err > max_stem_err) max_stem_err = stem_err;
          if (s == s2) break;
        }
      }
      if (max_stem_err > 0) b += s1.stem * max_stem_err;
      if (!two_staves && !two_dir)
        for (s = s1.next; ; s = s.next) {
          switch (s.type) {
            case C.REST:
              g = s.ts_next;
              if (!g || g.st != st || (g.type != C.NOTE && g.type != C.REST))
                break;
            case C.BAR:
              if (s.invis) break;
            case C.CLEF:
              y = a * s.x + b;
              if (s1.stem > 0) {
                y = s.ymx - y + BEAM_DEPTH + BEAM_SHIFT * (nflags - 1) + 2;
                if (y > 0) b += y;
              } else {
                y = s.ymn - y - BEAM_DEPTH - BEAM_SHIFT * (nflags - 1) - 2;
                if (y < 0) b += y;
              }
              break;
            case C.GRACE:
              for (g = s.extra; g; g = g.next) {
                y = a * g.x + b;
                if (s1.stem > 0) {
                  y = g.ymx - y + BEAM_DEPTH + BEAM_SHIFT * (nflags - 1) + 2;
                  if (y > 0) b += y;
                } else {
                  y = g.ymn - y - BEAM_DEPTH - BEAM_SHIFT * (nflags - 1) - 2;
                  if (y < 0) b += y;
                }
              }
              break;
          }
          if (s == s2) break;
        }
      if (a == 0) b += b_pos(s1.grace, s1.stem, nflags, b - staff_tb[st].y);
      for (s = s1; ; s = s.next) {
        switch (s.type) {
          case C.NOTE:
            s.ys = a * s.xs + b - staff_tb[s.st].y;
            if (s.stem > 0) {
              s.ymx = s.ys + 2.5;
              s.my_ymx = s.ymx - 0; //add by hxs，加这个变量是为了画连音线时，从音符开始画，不受音符上的装饰音影响连音线开始的高度
              if (
                s.ts_prev &&
                s.ts_prev.stem > 0 &&
                s.ts_prev.st == s.st &&
                s.ts_prev.ymn < s.ymx &&
                s.ts_prev.x == s.x &&
                s.notes[0].shhd == 0
              ) {
                s.ts_prev.x -= 3;
                s.ts_prev.xs -= 3;
              }
            } else {
              s.ymn = s.ys - 2.5;
            }
            break;
          case C.REST:
            y = a * s.x + b - staff_tb[s.st].y;
            dy =
              BEAM_DEPTH +
              BEAM_SHIFT * (nflags - 1) +
              (s.head != C.FULL ? 4 : 9);
            if (s1.stem > 0) {
              y -= dy;
              if (s1.multi == 0 && y > 12) y = 12;
              if (s.y <= y) break;
            } else {
              y += dy;
              if (s1.multi == 0 && y < 12) y = 12;
              if (s.y >= y) break;
            }
            if (s.head != C.FULL) y = (((y + 3 + 12) / 6) | 0) * 6 - 12;
            s.y = y;
            break;
        }
        if (s == s2) break;
      }
      if (staff_tb[st].y == 0) return false;
      bm.s1 = s1;
      bm.a = a;
      bm.b = b;
      bm.nflags = nflags;
      return true;
    };
    function draw_beams(bm) {
      if (musicType == 2) return;
      var s,
        i,
        beam_dir,
        shift,
        bshift,
        bstub,
        bh,
        da,
        k,
        k1,
        k2,
        x1,
        s1 = bm.s1,
        s2 = bm.s2;

      function draw_beam(x1, x2, dy, h, bm, n) {
        var y1,
          dy2,
          s = bm.s1,
          nflags = s.nflags;
        if (s.ntrem) nflags -= s.ntrem;
        if (s.trem2 && n > nflags) {
          if (s.dur >= C.BLEN / 2) {
            x1 = s.x + 6;
            x2 = bm.s2.x - 6;
          } else if (s.dur < C.BLEN / 4) {
            x1 += 5;
            x2 -= 6;
          }
        }
        y1 = bm.a * x1 + bm.b - dy;
        x2 -= x1;
        x2 /= stv_g.scale;
        dy2 = bm.a * x2 * stv_g.scale;
        xypath(x1, y1, true);
        var x2_fix = x2.toFixed(1),
          dy2_fix = dy2.toFixed(1);
        output +=
          "l" +
          x2_fix +
          " " +
          -dy2_fix +
          "v" +
          h.toFixed(1) +
          "l" +
          -x2_fix +
          " " +
          dy2_fix +
          'z"';
        output += ' istart="' + s.istart + '"';
        output += ' iend="' + bm.s2.istart + '"';
        output += ' type="beam"';
        output += "/>\n";
      }
      anno_start(s1, "beam");
      if (!s1.grace) {
        bshift = BEAM_SHIFT;
        bstub = BEAM_STUB;
        shift = 0.34;
        bh = BEAM_DEPTH;
      } else {
        bshift = 3.5;
        bstub = 3.2;
        shift = 0.29;
        bh = 1.8;
      }
      beam_dir = s1.stem;
      if (s1.stem != s2.stem && s1.nflags < s2.nflags) beam_dir = s2.stem;
      if (beam_dir < 0) bh = -bh;
      var x1Indent = getXIndent(s1);
      var x2Indent = getXIndent(s2);

      draw_beam(
        s1.xs - shift + x1Indent,
        s2.xs + shift + x2Indent,
        0,
        bh,
        bm,
        1
      );
      da = 0;
      for (s = s1; ; s = s.next) {
        if (s.type == C.NOTE && s.stem != beam_dir)
          s.ys =
            bm.a * s.xs +
            bm.b -
            staff_tb[s.st].y +
            bshift * (s.nflags - 1) * s.stem -
            bh;
        if (s == s2) break;
      }
      if (s1.feathered_beam) {
        da = bshift / (s2.xs - s1.xs);
        if (s1.feathered_beam > 0) {
          da = -da;
          bshift = da * s1.xs;
        } else {
          bshift = da * s2.xs;
        }
        da = da * beam_dir;
      }
      shift = 0;
      for (i = 2; i <= bm.nflags; i++) {
        shift += bshift;
        if (da != 0) bm.a += da;
        for (s = s1; ; s = s.next) {
          if (s.type != C.NOTE || s.nflags < i) {
            if (s == s2) break;
            continue;
          }
          if (s.trem1 && i > s.nflags - s.ntrem) {
            x1 = s.dur >= C.BLEN / 2 ? s.x : s.xs;
            draw_beam(x1 - 5, x1 + 5, (shift + 2.5) * beam_dir, bh, bm, i);
            if (s == s2) break;
            continue;
          }
          k1 = s;
          while (1) {
            if (s == s2) break;
            k = s.next;
            if (k.type == C.NOTE || k.type == C.REST) {
              if (k.trem1) {
                if (k.nflags - k.ntrem < i) break;
              } else if (k.nflags < i) {
                break;
              }
            }
            if (k.beam_br1 || (k.beam_br2 && i > 2)) break;
            s = k;
          }
          k2 = s;
          while (k2.type != C.NOTE) k2 = k2.prev;
          x1 = k1.xs;
          if (k1 == k2) {
            if (k1 == s1) {
              x1 += bstub;
            } else if (k1 == s2) {
              x1 -= bstub;
            } else if (k1.beam_br1 || (k1.beam_br2 && i > 2)) {
              x1 += bstub;
            } else {
              k = k1.next;
              while (k.type != C.NOTE) k = k.next;
              if (k.beam_br1 || (k.beam_br2 && i > 2)) {
                x1 -= bstub;
              } else {
                k1 = k1.prev;
                while (k1.type != C.NOTE) k1 = k1.prev;
                if (
                  k1.nflags < k.nflags ||
                  (k1.nflags == k.nflags && k1.dots < k.dots)
                )
                  x1 += bstub;
                else x1 -= bstub;
              }
            }
          }
          draw_beam(x1, k2.xs, shift * beam_dir, bh, bm, i);
          if (s == s2) break;
        }
      }
      if (s1.tmp) unlksym(s1);
      else if (s2.tmp) unlksym(s2);
      anno_stop(s1, "beam");
    }
    // 连谱线 大谱表：谱表间的连线
    function draw_lstaff(x) {
      var i,
        j,
        yb,
        h,
        nst = cur_sy.nstaff,
        l = 0;

      var addH = 0; //简谱大谱表连线需要增加一些高度 add by hxs 2021-8-3
      if (musicType == 2) {
        for (var i = 0; i < lineyArr.length; i++) {
          var lineyInfo = lineyArr[i];
          if (
            lineyInfo.st == staff_tb.length - 1 &&
            lineyInfo.line == self.line
          ) {
            addH = lineyInfo.crdHei;
          }
        }
      }

      function draw_sysbra(x, st, flag) {
        var i, st_end, yt, yb;
        while (!cur_sy.st_print[st]) {
          if (cur_sy.staves[st].flags & flag) return;
          st++;
        }
        i = st_end = st;
        while (1) {
          if (cur_sy.st_print[i]) st_end = i;
          if (cur_sy.staves[i].flags & flag) break;
          i++;
        }
        yt = staff_tb[st].y + staff_tb[st].topbar * staff_tb[st].staffscale;
        yb =
          staff_tb[st_end].y +
          staff_tb[st_end].botbar * staff_tb[st_end].staffscale;

        if (flag & (CLOSE_BRACE | CLOSE_BRACE2) && musicType != 2) {
          out_brace(x, yb, yt - yb + addH); //增加addH
        } else {
          out_bracket(x, yt, yt - yb + addH); //增加addH
        }
      }
      for (i = 0; ; i++) {
        if (cur_sy.staves[i].flags & (OPEN_BRACE | OPEN_BRACKET)) l++;
        if (cur_sy.st_print[i]) break;
        if (cur_sy.staves[i].flags & (CLOSE_BRACE | CLOSE_BRACKET)) l--;
        if (i == nst) break;
      }
      for (j = nst; j > i; j--) {
        if (cur_sy.st_print[j]) break;
      }
      if (i == j && l == 0) return;
      yb = staff_tb[j].y + staff_tb[j].botbar * staff_tb[j].staffscale;
      h = staff_tb[i].y + staff_tb[i].topbar * staff_tb[i].staffscale - yb;
      // create lhj
      if (musicType == 2) {
        out_XYAB(
          '<path type="score" onclick="selScore(event,this)" class="A" d="mX Y\n',
          x,
          yb - addH,
          "stroke",
          null,
          1
        ); //增加了type="score"  addH   add by hxs
      } else {
        xypath(x, yb, null, "score");
      }

      output += "v" + (-(h + addH)).toFixed(2) + '"/>\n'; //增加addH hxs
      for (i = 0; i <= nst; i++) {
        if (cur_sy.staves[i].flags & OPEN_BRACE) draw_sysbra(x, i, CLOSE_BRACE);
        if (cur_sy.staves[i].flags & OPEN_BRACKET)
          draw_sysbra(x, i, CLOSE_BRACKET);
        if (cur_sy.staves[i].flags & OPEN_BRACE2)
          draw_sysbra(x - 6, i, CLOSE_BRACE2);
        if (cur_sy.staves[i].flags & OPEN_BRACKET2)
          draw_sysbra(x - 6, i, CLOSE_BRACKET2);
      }
    }
    function draw_meter(x, s) {
      if (!s.a_meter) return;
      var dx,
        i,
        j,
        meter,
        st = s.st,
        p_staff = staff_tb[st],
        y = p_staff.y;
      if (p_staff.stafflines != "|||||")
        y += (p_staff.topbar + p_staff.botbar) / 2 - 12;
      for (i = 0; i < s.a_meter.length; i++) {
        meter = s.a_meter[i];
        x = s.x + s.x_meter[i];
        if (meter.bot) {
          //原来是这样的
          /*out_XYAB('\
	<g transform="translate(X,Y)" text-anchor="middle">\n\
     <text type="meter" x="X" y="Y-12">A</text>\n\
     <text type="meter" x="X" y="Y">B</text>\n\
    </g>\n', x, y + 6, m_gl(meter.top), m_gl(meter.bot))*/

          //改成这样，add by hxs
          out_XYAB(
            '\
	<g transform="translate(0,0)" text-anchor="middle">\n\
     <text type="meter" istart="' +
              s.istart +
              '" x="X" y="' +
              (sy(y) - 18) +
              '">A</text>\n\
     <text type="meter" istart="' +
              s.istart +
              '" x="X" y="Y">B</text>\n\
    </g>\n',
            x,
            y + 6,
            m_gl(meter.top),
            m_gl(meter.bot)
          );
        } else {
          out_XYAB(
            '\
    <text type="meter" istart="' +
              s.istart +
              '" x="X" y="Y" text-anchor="middle">A</text>\n',
            x,
            y + 12,
            m_gl(meter.top)
          );
        }
      }
    }
    function draw_acc(x, y, acc, micro_n, micro_d, s) {
      if (micro_n) {
        if (micro_n == micro_d) {
          acc = acc == -1 ? -2 : 2;
        } else if (micro_n * 2 != micro_d) {
          xygl(x, y, "acc" + acc + "_" + micro_n + "_" + micro_d);
          return;
        }
      }
      xygl(x, y, "acc" + acc, null, s); // create by lhj
    }
    // 绘制音符的外加线
    function draw_hl(x, s, hltype) {
      var i,
        j,
        n,
        hla = [],
        st = s.st,
        p_staff = staff_tb[st];
      if (!p_staff.hll) return;
      for (i = 0; i <= s.nhd; i++) {
        if (!p_staff.hlmap[s.notes[i].pit - p_staff.hll])
          hla.push((s.notes[i].pit - 18) * 3);
      }
      n = hla.length;
      if (!n) return;
      var staffb = p_staff.y,
        stafflines = p_staff.stafflines,
        top = (stafflines.length - 1) * 6,
        bot = p_staff.botline,
        yl = bot,
        yu = top;
      for (i = 0; i < hla.length; i++) {
        if (hla[i] < yl) {
          yl = (((hla[i] + 51) / 6) | 0) * 6 - 48;
          n--;
        } else if (hla[i] > yu) {
          yu = ((hla[i] / 6) | 0) * 6;
          n--;
        }
      }
      for (; yl < bot; yl += 6) xygl(x, staffb + yl, hltype, null, s);
      for (; yu > top; yu -= 6) xygl(x, staffb + yu, hltype, null, s);
      if (!n) return;
      i = yl;
      j = yu;
      while (i > bot && stafflines[i / 6] == "-") i -= 6;
      while (j < top && stafflines[j / 6] == "-") j += 6;
      for (; i < j; i += 6) {
        if (stafflines[i / 6] == "-") xygl(x, staffb + i, hltype);
      }
    }
    var sharp_cl = new Int8Array([24, 9, 15, 21, 6, 12, 18]),
      flat_cl = new Int8Array([12, 18, 24, 9, 15, 21, 6]),
      sharp1 = new Int8Array([-9, 12, -9, -9, 12, -9]),
      sharp2 = new Int8Array([12, -9, 12, -9, 12, -9]),
      flat1 = new Int8Array([9, -12, 9, -12, 9, -12]),
      flat2 = new Int8Array([-12, 9, -12, 9, -12, 9]);
    function draw_keysig(x, s) {
      if (s.k_none || s.k_play) return;
      var old_sf = s.k_old_sf,
        st = s.st,
        staffb = staff_tb[st].y,
        i,
        shift,
        p_seq,
        clef_ix = s.k_y_clef;
      if (clef_ix & 1) clef_ix += 7;
      clef_ix /= 2;
      while (clef_ix < 0) clef_ix += 7;
      clef_ix %= 7;
      if (!s.k_a_acc) {
        if (cfmt.cancelkey || s.k_sf == 0) {
          if (s.k_sf == 0 || old_sf * s.k_sf < 0) {
            shift = sharp_cl[clef_ix];
            p_seq = shift > 9 ? sharp1 : sharp2;
            for (i = 0; i < old_sf; i++) {
              xygl(x, staffb + shift, "acc3", null, s); // add by lhj
              shift += p_seq[i];
              x += 5.5;
            }
            shift = flat_cl[clef_ix];
            p_seq = shift < 18 ? flat1 : flat2;
            for (i = 0; i > old_sf; i--) {
              xygl(x, staffb + shift, "acc3", null, s); // add by lhj
              shift += p_seq[-i];
              x += 5.5;
            }
            if (s.k_sf != 0) x += 3;
          }
        }
        if (s.k_sf > 0) {
          shift = sharp_cl[clef_ix];
          p_seq = shift > 9 ? sharp1 : sharp2;
          for (i = 0; i < s.k_sf; i++) {
            xygl(x, staffb + shift, "acc1", null, s); // add by lhj
            shift += p_seq[i];
            x += 5.5;
          }
          if (cfmt.cancelkey && i < old_sf) {
            x += 2;
            for (; i < old_sf; i++) {
              xygl(x, staffb + shift, "acc3", null, s); // add by lhj
              shift += p_seq[i];
              x += 5.5;
            }
          }
        }
        if (s.k_sf < 0) {
          shift = flat_cl[clef_ix];
          p_seq = shift < 18 ? flat1 : flat2;
          for (i = 0; i > s.k_sf; i--) {
            xygl(x, staffb + shift, "acc-1", null, s); // add by lhj
            shift += p_seq[-i];
            x += 5.5;
          }
          if (cfmt.cancelkey && i > old_sf) {
            x += 2;
            for (; i > old_sf; i--) {
              xygl(x, staffb + shift, "acc3", null, s); // add by lhj
              shift += p_seq[-i];
              x += 5.5;
            }
          }
        }
      } else if (s.k_a_acc.length) {
        var acc,
          last_acc = s.k_a_acc[0].acc,
          last_shift = 100,
          s2 = {
            st: st,
            nhd: 0,
            notes: [{}],
          };
        for (i = 0; i < s.k_a_acc.length; i++) {
          acc = s.k_a_acc[i];
          shift = (s.k_y_clef + acc.pit - 18) * 3;
          if (i != 0 && (shift > last_shift + 18 || shift < last_shift - 18))
            x -= 5.5;
          else if (acc.acc != last_acc) x += 3;
          last_acc = acc.acc;
          s2.notes[0].pit = shift / 3 + 18;
          self.draw_hl(x, s2, "hl");
          last_shift = shift;
          draw_acc(x, staffb + shift, acc.acc, acc.micro_n, acc.micro_d, s);
          x += 5.5;
        }
      }
    }
    function bar_cnv(bar_type) {
      switch (bar_type) {
        case "[":
        case "[]":
          return "";
        case "|:":
        case "|::":
        case "|:::":
          return "[" + bar_type;
        case ":|":
        case "::|":
        case ":::|":
          return bar_type + "]";
        case "::":
          return cfmt.dblrepbar;
        case "||:":
          return "[|:";
      }
      return bar_type;
    }
    function draw_bar(s, bot, h) {
      // console.log('draw_bar', s);
      var i,
        s2,
        yb,
        bar_type,
        st = s.st,
        p_staff = staff_tb[st],
        x = s.x;
      bar_type = bar_cnv(s.bar_type);
      if (!bar_type) return;
      if (st != 0 && s.ts_prev && s.ts_prev.type != C.BAR)
        h = p_staff.topbar * p_staff.staffscale;
      s.ymx = s.ymn + h;
      set_sscale(-1);
      anno_start(s);
      yb = p_staff.y + 12;
      if (p_staff.stafflines != "|||||")
        yb += (p_staff.topbar + p_staff.botbar) / 2 - 12;
      if (s.bar_mrep) {
        set_sscale(st);
        if (s.bar_mrep == 1) {
          for (s2 = s.prev; s2.type != C.REST; s2 = s2.prev);
          xygl(s2.x, yb, "mrep");
        } else {
          xygl(x, yb, "mrep2");
          if (s.v == cur_sy.top_voice) {
            set_font("annotation");
            xy_str(x, yb + p_staff.topbar - 9, s.bar_mrep.toString(), "c");
          }
        }
      }
      if(bar_type==':][:'){
        bar_type = ':|]|:'; // 开始-反复记号显示更新
      }
      for (i = bar_type.length; --i >= 0; ) {
        switch (bar_type[i]) {
          case "|":
            set_sscale(-1);
            out_bar(x, bot, h, s.bar_dotted, null, s);
            bar_visible[s.st] = bar_visible[s.st] + 1;
            if (max_st_nodenum < bar_visible[s.st]) {
              max_st_nodenum = bar_visible[s.st];
            }

            if (
              cfmt.singleline &&
              bar_visible[s.st] == 1 &&
              bar_visible[s.st] < max_st_nodenum
            ) {
              var offset = "";
              if (offset == "") offset = 0;
              if (musicType == 2) {
                //简谱要做一些y方向的偏移
                if (offset == "") {
                  offset = 0;
                } else {
                  offset = parseInt(offset);
                }
              } else {
                offset = 0;
              }
              if (musicType == 0) {
                //这里要查到前一个小节线
                var prev_s = s.ts_prev;
                while (prev_s) {
                  if (prev_s.type == 0 && prev_s.x != s.x) {
                    x = prev_s.x;
                    break;
                  }
                  prev_s = prev_s.ts_prev;
                }
                x += 10;
                //out_bracket(x, bot + 24 + offset, h)
                //out_bar(x, bot + offset, h);
              }
            }
            break;
          default:
            x -= 3;
            set_sscale(-1);
            out_thbar(x, bot, h, s);
            break;
          case ":":
            x -= 2;
            set_sscale(st);
            xygl(x + 1, yb - 12, "rdots");
            break;
        }
        x -= 3;
      }
      set_sscale(-1);
      anno_stop(s);
    }
    var rest_tb = [
      "r128",
      "r64",
      "r32",
      "r16",
      "r8",
      "r4",
      "r2",
      "r1",
      "r0",
      "r00",
    ];
    function draw_rest(s) {
      var s2,
        i,
        j,
        x,
        y,
        yb,
        bx,
        p_staff = staff_tb[s.st];
      if (s.dur_orig == s.p_v.meter.wmeasure || (s.rep_nb && s.rep_nb >= 0)) {
        if (!s.is_ext) {
          //如果是扩展音符，则不走这段代码，则否扩展音符显示的时值不对,nflags和dots来定义音符的长度
          if (s.dur < C.BLEN * 2) s.nflags = -2;
          else if (s.dur < C.BLEN * 4) s.nflags = -3;
          else s.nflags = -4;
          s.dots = 0;
        }

        s2 = s.ts_next;
        while (s2 && s2.time != s.time + s.dur) s2 = s2.ts_next;
        x = s2 ? s2.x : realwidth;
        s2 = s;
        while (!s2.seqst) s2 = s2.ts_prev;
        s2 = s2.ts_prev;
        x = (x + s2.x) / 2;
        if (s.a_dd) deco_update(s, x - s.x);
        s.x = x;
      } else {
        x = s.x;
        if (s.notes[0].shhd) x += s.notes[0].shhd * stv_g.scale;
      }
      if (s.invis) return;
      yb = p_staff.y;
      if (s.rep_nb) {
        set_sscale(s.st);
        anno_start(s);
        if (p_staff.stafflines == "|||||") yb += 12;
        else yb += (p_staff.topbar + p_staff.botbar) / 2;
        if (s.rep_nb < 0) {
          xygl(x, yb, "srep");
        } else {
          xygl(x, yb, "mrep");
          if (s.rep_nb > 2 && s.v == cur_sy.top_voice) {
            set_font("annotation");
            if (gene.curfont.box) {
              gene.curfont.box = false;
              bx = true;
            }
            xy_str(x, yb + p_staff.topbar - 9, s.rep_nb.toString(), "c");
            if (bx) gene.curfont.box = true;
          }
        }
        anno_stop(s);
        return;
      }
      set_scale(s);
      anno_start(s);
      if (s.notes[0].color) set_color(s.notes[0].color);
      y = s.y;
      i = 5 - s.nflags;
      if (i == 7 && y == 12 && p_staff.stafflines.length <= 2) y -= 6;
      //如果是扩展音符，就显示x-------start
      //            if(s.is_ext) {
      //            	// 如果是扩展音符，就直接显示x
      //            	xygl(x, y + yb, "x")
      //            }else{
      //            	xygl(x, y + yb, s.notes[0].head || rest_tb[i])
      //            }
      //如果是扩展音符，就显示x-------end
      if (s.notes[0].map && s.notes[0].map[0]) {
        xygl(x, y + yb, s.notes[0].map[0], null, s); // create by lhj
      } else {
        xygl(x, y + yb, s.notes[0].head || rest_tb[i], null, s); // create by lhj
      }

      if (i >= 6) {
        j = y / 6;
        switch (i) {
          default:
            switch (p_staff.stafflines[j + 1]) {
              case "|":
              case "[":
                break;
              default:
                xygl(x, y + 6 + yb, "hl1");
                break;
            }
            if (i == 9) {
              y -= 6;
              j--;
            }
            break;
          case 7:
            y += 6;
            j++;
          case 6:
            break;
        }
        switch (p_staff.stafflines[j]) {
          case "|":
          case "[":
            break;
          default:
            xygl(x, y + yb, "hl1");
            break;
        }
      }
      if (s.dots) {
        x += 8;
        y += yb + 3;
        for (i = 0; i < s.dots; i++) {
          xygl(x, y, "dot", null, s);
          x += 3.5;
        }
      }
      set_color();
      anno_stop(s);
    }
    //倚音及相关的连音线
    function draw_gracenotes(s) {
      var yy,
        x0,
        y0,
        x1,
        y1,
        x2,
        y2,
        x3,
        y3,
        bet1,
        bet2,
        slur,
        dy1,
        dy2,
        g,
        last,
        lastx,
        note,
        bm = {}; //增加了一个lastx
      var graceStart = s.istart; //add by hxs
      var graceEnd = -1; //add by hxs
      for (g = s.extra; g; g = g.next) {
        graceEnd = g.iend;
        if (g.beam_st && !g.beam_end) {
          if (self.calculate_beam(bm, g)) draw_beams(bm);
        }
        g.clef_type = s.clef_type;
        anno_start(g);
        draw_note(g, !bm.s2);
        if (g == bm.s2) bm.s2 = null;
        anno_stop(g);
        if (g.sls || g.sl2) slur = true;
        if (!g.next) break;
      }
      var graceslurdirect = 0; //倚音连线的方法
      var content = source_val;
      var graceStr = content.substring(graceStart, graceEnd);
      console.log("graceStr:", graceStr);
      var gracePos = "before"; //倚音的位置
      if (graceStr.indexOf(")") > -1) {
        //判断倚音位置，如果有）号，说明在后面
        gracePos = "after";
      }
      var graceMain = null;
      if ("before" == gracePos) {
        graceMain = s.next;
        if (graceMain) {
          var gch = graceMain.a_gch;
          if (hasGch(graceMain, "graceup")) {
            graceslurdirect = 1;
          } else if (hasGch(graceMain, "gracedown")) {
            graceslurdirect = -1;
          }
        }
      }
      if (s.sappo) {
        g = s.extra;
        if (!g.next) {
          x1 = 9;
          y1 = g.stem > 0 ? 5 : -5;
        } else {
          x1 = (g.next.x - g.x) * 0.5 + 4;
          y1 = (g.ys + g.next.ys) * 0.5 - g.y;
          if (g.stem > 0) y1 -= 1;
          else y1 += 1;
        }
        note = g.notes[g.stem < 0 ? 0 : g.nhd];
        out_acciac(x_head(g, note), y_head(g, note), x1, y1, g.stem > 0);
      }
      if (
        s.p_v.key.k_bagpipe ||
        !cfmt.graceslurs ||
        slur ||
        s.tie_s ||
        !s.next ||
        s.next.type != C.NOTE
      )
        return;
      last = g;

      if (
        graceslurdirect != -1 &&
        (graceslurdirect == 1 ||
          ((g.stem >= 0 || s.multi < 0) && g.notes[0].pit <= 28) ||
          g.notes[0].pit < 16)
      ) {
        yy = 127;
        var xx = 1270;
        for (g = s.extra; g; g = g.next) {
          if (g.y < yy) {
            yy = g.y;
            last = g;
          }
          if (g.x < xx) {
            xx = g.x;
            lastx = g;
          }
        }
        x0 = last.x;
        if (lastx) {
          //add by hxs
          x0 = lastx.x;
        } else {
          lastx = last;
        }
        y0 = last.y - 5;
        if (s.extra != last) {
          x0 -= 4;
          y0 += 1;
        }
        s = s.next;
        x3 = s.x - 1;
        if (s.stem < 0 && s.nflags > -2) x3 -= 4;
        y3 = 3 * (s.notes[0].pit - 18) - 5;
        dy1 = (x3 - x0) * 0.4;
        if (dy1 > 3) dy1 = 3;
        dy2 = dy1;
        bet1 = 0.2;
        bet2 = 0.8;
        if (y0 > y3 + 7) {
          x0 = lastx.x - 1; //原来是last.x，改为lastx.x
          y0 += 0.5;
          y3 += 6.5;
          x3 = s.x - 5.5;
          dy1 = (y0 - y3) * 0.8;
          dy2 = (y0 - y3) * 0.2;
          bet1 = 0;
        } else if (y3 > y0 + 4) {
          y3 = y0 + 4;
          x0 = lastx.x + 2; //原来是last.x，改为lastx.x
          y0 = last.y - 4;
        }
      } else {
        yy = -127;
        var xx = 1270;
        for (g = s.extra; g; g = g.next) {
          if (g.y > yy) {
            yy = g.y;
            last = g;
          }
          if (g.x < xx) {
            xx = g.x;
            lastx = g;
          }
        }
        x0 = last.x;
        if (lastx) {
          x0 = lastx.x;
        } else {
          lastx = last;
        }
        y0 = last.y + 5;
        if (s.extra != last) {
          x0 -= 4;
          y0 -= 1;
        }
        s = s.next;
        x3 = s.x - 1;
        if (s.stem >= 0 && s.nflags > -2) x3 -= 2;
        y3 = 3 * (s.notes[s.nhd].pit - 18) + 5;
        dy1 = (x0 - x3) * 0.4;
        if (dy1 < -3) dy1 = -3;
        dy2 = dy1;
        bet1 = 0.2;
        bet2 = 0.8;
        if (y0 < y3 - 7) {
          x0 = lastx.x - 1; //原来是last.x，改为lastx.x
          y0 -= 0.5;
          y3 -= 6.5;
          x3 = s.x - 5.5;
          dy1 = (y0 - y3) * 0.8;
          dy2 = (y0 - y3) * 0.2;
          bet1 = 0;
        } else if (y3 < y0 - 4) {
          y3 = y0 - 4;
          x0 = lastx.x + 2; //原来是last.x，改为lastx.x
          y0 = last.y + 4;
        }
      }
      x1 = bet1 * x3 + (1 - bet1) * x0 - x0;
      y1 = bet1 * y3 + (1 - bet1) * y0 - dy1 - y0;
      x2 = bet2 * x3 + (1 - bet2) * x0 - x0;
      y2 = bet2 * y3 + (1 - bet2) * y0 - dy2 - y0;
      anno_start(s, "slur");
      xypath(x0, y0 + staff_tb[s.st].y);
      output +=
        "c" +
        x1.toFixed(1) +
        " " +
        (-y1).toFixed(1) +
        " " +
        x2.toFixed(1) +
        " " +
        (-y2).toFixed(1) +
        " " +
        (x3 - x0).toFixed(1) +
        " " +
        (-y3 + y0).toFixed(1) +
        '"/>\n';
      anno_stop(s, "slur");
    }
    function setdoty(s, y_tb) {
      var m, m1, y;
      for (m = 0; m <= s.nhd; m++) {
        y = 3 * (s.notes[m].pit - 18);
        if (y % 6 == 0) {
          if (s.dot_low) y -= 3;
          else y += 3;
        }
        y_tb[m] = y;
      }
      for (m = 0; m < s.nhd; m++) {
        if (y_tb[m + 1] > y_tb[m]) continue;
        m1 = m;
        while (m1 > 0) {
          if (y_tb[m1] > y_tb[m1 - 1] + 6) break;
          m1--;
        }
        if (
          3 * (s.notes[m1].pit - 18) - y_tb[m1] <
          y_tb[m + 1] - 3 * (s.notes[m + 1].pit - 18)
        ) {
          while (m1 <= m) y_tb[m1++] -= 6;
        } else {
          y_tb[m + 1] = y_tb[m] + 6;
        }
      }
    }
    function x_head(s, note) {
      return s.x + (note.shhd ? note.shhd : 0) * stv_g.scale;
    }
    function y_head(s, note) {
      return staff_tb[s.st].y + 3 * (note.pit - 18);
    }
    function draw_basic_note(x, s, m, y_tb) {
      var i,
        p,
        yy,
        dotx,
        doty,
        inv,
        old_color = false,
        note = s.notes[m],
        staffb = staff_tb[s.st].y,
        y = 3 * (note.pit - 18),
        shhd = (note.shhd ? note.shhd : 0) * stv_g.scale,
        x_note = x + shhd,
        y_note = y + staffb;
      var elts = identify_note(s, note.dur),
        head = elts[0],
        dots = elts[1],
        nflags = elts[2];
      s.head = head; //这里增加了一个这个，不加这个最后一个音符是2倍的全音符时，会出错，M:2/1  L:1/2   c4,不知道会不会带来其它错误
      if (!note.hasOwnProperty("shhd") || isNaN(note.shhd)) {
        note.shhd = 0;
        shhd = note.shhd * stv_g.scale;
      }
      if (!s.notes[0].hasOwnProperty("shhd") || isNaN(s.notes[0].shhd)) {
        s.notes[0].shhd = 0;
      }
      //s.m = m;//把顺序加到s中，后面放到update_note_index里
      //	        if(s.type==8){
      //	        	var noteStr = source_val.substring(s.istart,s.iend);
      //	        	var note_reg = /(\^){0,2}(\_){0,2}(\=){0,1}[A-Ya-y][\,\'\/|1-9]*/g;
      //	        	var notes = str.match(note_reg);
      //	        	var res = new Array();//排序前的
      //	        	if(notes!=null){
      //	        		for(var i=0;i<notes.length;i++){
      //	        			var note = notes[i];
      //	        			var index = findIndexByNote(note.replace(/\d/,""));
      //	        			var obj = new Object();
      //	        			obj.note = note;
      //	        			obj.index = index;
      //	        			res.push(obj);
      //	        		}
      //	        	}
      //
      //	        	var noteArr2 = str2notes(note);//排序后的数组
      //	        	noteArr2
      //	        }
      if (
        y % 6 == 0 &&
        s.notes[0].hasOwnProperty("shhd") &&
        shhd != (s.stem > 0 ? s.notes[0].shhd : s.notes[s.nhd].shhd)
      ) {
        yy = 0;
        if (y >= 30) {
          yy = y;
          if (yy % 6) yy -= 3;
        } else if (y <= -6) {
          yy = y;
          if (yy % 6) yy += 3;
        }
        if (yy) xygl(x_note, yy + staffb, "hl");
      }
      if (note.invis) {
      } else if (s.grace) {
        p = "ghd";
        x_note -= 4.5 * stv_g.scale;
      } else if (note.map && note.map[0]) {
        i = s.head;
        p = note.map[0][i];
        if (!p) p = note.map[0][note.map[0].length - 1];
        i = p.indexOf("/");
        if (i >= 0) {
          if (s.stem >= 0) p = p.slice(0, i);
          else p = p.slice(i + 1);
        }
      } else if (s.type == C.CUSTOS) {
        p = "custos";
      } else {
        switch (head) {
          case C.OVAL:
            p = "HD";
            break;
          case C.OVALBARS:
            if (s.head != C.SQUARE) {
              p = "HDD";
              break;
            }
          case C.SQUARE:
            if (nflags > -4) {
              p = "breve";
            } else {
              p = "longa";
              inv = s.stem > 0;
            }
            if (!tsnext && s.next && s.next.type == C.BAR && !s.next.next)
              dots = 0;
            break;
          case C.EMPTY:
            p = "Hd";
            break;
          default:
            p = "hd";
            break;
        }
      }
      //把实力符头转为空心  !empty!表示当前音符为空心
      if (s.my_emptyhead) {
        if (s.my_emptyhead_seq) {
          if (s.my_emptyhead_seq == m + 1) {
            p = "Hd";
          }
        } else {
          p = "Hd";
        }
      }
      if (note.color != undefined) old_color = set_color(note.color);
      //重新高亮选中的音符
      if (update_note_index != -1 && update_note_istart != -1) {
        if (
          s.istart == update_note_istart &&
          m == update_note_index &&
          musicType != 2
        ) {
          old_color = set_color("#0E518F", update_note_istart);
          update_note_index = -1;
          update_note_istart = -1;
        }
      }
      if (update_note_istart_arr.length > 0) {
        for (var i = 0; i < update_note_istart_arr.length; i++) {
          if (update_note_index_arr.length > 0) {
            for (var j = 0; j < update_note_index_arr.length; j++) {
              if (
                s.istart == update_note_istart_arr[i] &&
                m == update_note_index_arr[j] &&
                musicType != 2
              ) {
                old_color = set_color(
                  "#0E518F",
                  update_note_istart_arr[i],
                  update_note_index_arr[j]
                );
                update_note_index_arr.splice(j, 1);
              }
            }
          } else {
            if (
              s.istart == update_note_istart_arr[i] &&
              m == update_note_index &&
              musicType != 2
            ) {
              old_color = set_color("#0E518F", update_note_istart_arr[i]);
              update_note_istart_arr.splice(i, 1);
            }
          }
        }
        //update_note_istart_arr = [];
      }
      if (p) {
        if (inv) {
          g_open(x_note, y_note, 0, 1, -1);
          x_note = y_note = 0;
        }
        if (!psxygl(x_note, y_note, p))
          // create by lhj
          xygl(x_note, y_note, p, null, s);
        if (inv) g_close();
      }
      if (dots) {
        dotx = x + (7.7 + s.xmx) * stv_g.scale;
        if (y_tb[m] == undefined) {
          y_tb[m] = 3 * (s.notes[m].pit - 18);
          if ((s.notes[m].pit & 1) == 0) y_tb[m] += 3;
        }
        doty = y_tb[m] + staffb;
        i = (note.dur / 12) >> (5 - nflags - dots);
        while (dots-- > 0) {
          // create by lhj
          xygl(dotx, doty, i & (1 << dots) ? "dot" : "dot+", null, s);
          dotx += 3.5;
        }
      }
      if (note.acc) {
        x -= note.shac * stv_g.scale;
        if (!s.grace) {
          draw_acc(x, y + staffb, note.acc, note.micro_n, note.micro_d, s); // create by lhj
        } else {
          g_open(x, y + staffb, 0, 0.75);
          draw_acc(0, 0, note.acc, note.micro_n, note.micro_d, s);
          g_close();
        }
      }
      if (old_color != false) set_color(old_color);
    }

    // 画出音符
    function draw_note(s, fl) {
      var s2,
        i,
        m,
        y,
        staffb,
        slen,
        c,
        hltype,
        nflags,
        x,
        y,
        note,
        x_hl,
        y_tb = new Array(s.nhd + 1);
      if (s.dots) setdoty(s, y_tb);
      note = s.notes[s.stem < 0 ? s.nhd : 0];
      x_hl = x = x_head(s, note);
      //这里要加一个判断，让想要往后移的音符往后移
      var xIndent = getXIndent(s);
      s.xin = xIndent;
      x_hl += xIndent;
      x += xIndent;
      staffb = staff_tb[s.st].y;
      if (s.grace) {
        hltype = "ghl";
        x_hl += 1.5;
      } else {
        hltype = "hl";
        switch (s.head) {
          case C.OVALBARS:
          case C.OVAL:
            x_hl -= 0.3;
            hltype = "hl1";
            break;
          case C.SQUARE:
            x_hl -= 2;
            hltype = "hl1";
            break;
        }
      }
      draw_hl(x_hl, s, hltype);
      y = y_head(s, note);
      if (!s.stemless) {
        slen = s.ys - s.y;
        nflags = s.nflags;
        if (s.ntrem) nflags -= s.ntrem;
        if (!fl || nflags <= 0) {
          if (s.nflags > 0) {
            if (s.stem >= 0) slen -= 1;
            else slen += 1;
          }
          // create by lhj
          // out_stem(x, y, slen, s.grace)
          out_stem(x, y, slen, s.grace, null, null, null, null, s);
        } else {
          // create by lhj
          // out_stem(x, y, slen, s.grace, nflags, cfmt.straightflags)
          out_stem(x, y, slen, s.grace, nflags, null, null, null, s);
        }
      } else if (s.xstem) {
        s2 = s.ts_prev;
        slen = (s2.stem > 0 ? s2.y : s2.ys) - s.y;
        slen += staff_tb[s2.st].y - staffb;
        // create by lhj
        out_stem(x, y, slen, null, null, null, null, null, s);
      }
      if (fl && s.trem1) {
        var ntrem = s.ntrem || 0,
          x1 = x;
        slen = 3 * (s.notes[s.stem > 0 ? s.nhd : 0].pit - 18);
        if (s.head == C.FULL || s.head == C.EMPTY) {
          x1 += (s.grace ? GSTEM_XOFF : 3.5) * s.stem;
          if (s.stem > 0) slen += 6 + 5.4 * ntrem;
          else slen -= 6 + 5.4;
        } else {
          if (s.stem > 0) slen += 5 + 5.4 * ntrem;
          else slen -= 5 + 5.4;
        }
        slen /= s.p_v.scale;

        // 在中间的震音 add by hxs
        var dir;
        var width;
        if (s.trem_type && s.trem_type == "mid") {
          var next_s = s.next;
          while (next_s && next_s.type != C.NOTE) {
            next_s = next_s.next;
          }
          var next_note;
          if (next_s) {
            width = Math.abs(s.x - next_s.x) * 0.5;
            next_note = next_s.notes[next_s.stem < 0 ? next_s.nhd : 0];
            x1 += (x_head(next_s, next_note) - x1) / 3;
          }
          if (next_note) {
            if (next_note.pit > note.pit) {
              dir = "up";
            } else {
              dir = "down";
            }
          }
          if (dir == "up") {
            out_trem(
              x1,
              staffb + s.y + (next_s.y - s.y) / 2,
              ntrem,
              width,
              dir
            );
          } else {
            out_trem(x1, staffb + s.y, ntrem, width, dir);
          }
        } else {
          // 原来的逻辑
          out_trem(x1, staffb + slen, ntrem, dir);
        }
      }
      x = s.x;
      x += xIndent;
      for (m = 0; m <= s.nhd; m++) {
        // 绘制符头
        draw_basic_note(x, s, m, y_tb);
      }
    }
    function next_scut(s) {
      var prev = s;
      for (s = s.next; s; s = s.next) {
        if (s.rbstop) return s;
        prev = s;
      }
      return prev;
    }
    function prev_scut(s) {
      while (s.prev) {
        s = s.prev;
        if (s.rbstart) return s;
      }
      s = s.p_v.sym;
      while (s.type != C.CLEF) s = s.ts_prev;
      if (s.next && s.next.type == C.KEY) s = s.next;
      if (s.next && s.next.type == C.METER) return s.next;
      return s;
    }
    function slur_direction(k1, k2) {
      var s, some_upstem, low, dir;

      function slur_multi(s1, s2) {
        if (s1.multi) return s1.multi;
        if (s2.multi) return s2.multi;
        return 0;
      }
      if (k1.grace && k1.stem > 0) return -1;
      dir = slur_multi(k1, k2);
      if (dir) return dir;
      for (s = k1; ; s = s.next) {
        if (s.type == C.NOTE) {
          if (!s.stemless) {
            if (s.stem < 0) return 1;
            some_upstem = true;
          }
          if (s.notes[0].pit < 22) low = true;
        }
        if (s.time == k2.time) break;
      }
      if (!some_upstem && !low) return 1;
      return -1;
    }

    // output svg 连音线
    var slur_out = function (
      x1,
      y1,
      x2,
      y2,
      dir,
      height,
      dotted,
      up,
      path,
      isLowerCase
    ) {
      //这里是对装饰音的位置进行自定义的设置---2022-3-17 start
      if (path) {
        var decoPosInfo = getDecoPos(path[0].istart, "slur");
        if (decoPosInfo) {
          x1 += decoPosInfo.x;
          y1 += decoPosInfo.y;
          x2 += decoPosInfo.x;
          y2 += decoPosInfo.y;
        }
        for (var i = 0; i < path.length; i++) {
          path[i].my_inslur = 1;
        }
      }

      //	    	console.log("x1:",x1,"  y1:",y1," x2:",x2," y2:",y2)
      var dx,
        dy,
        dz,
        alfa = 0.3,
        beta = 0.45;
      dy = y2 - y1;
      if (dy < 0) dy = -dy;
      dx = x2 - x1;
      if (dx > 40 && dy / dx < 0.7) {
        alfa = 0.3 + 0.002 * (dx - 40);
        if (alfa > 0.7) alfa = 0.7;
      }
      var mx = 0.5 * (x1 + x2),
        my = 0.5 * (y1 + y2),
        xx1 = mx + alfa * (x1 - mx),
        yy1 = my + alfa * (y1 - my) + height;
      xx1 = x1 + beta * (xx1 - x1);
      yy1 = y1 + beta * (yy1 - y1);
      var xx2 = mx + alfa * (x2 - mx),
        yy2 = my + alfa * (y2 - my) + height;
      xx2 = x2 + beta * (xx2 - x2);
      yy2 = y2 + beta * (yy2 - y2);
      dx = 0.03 * (x2 - x1);
      dy = 2 * dir;
      dz = 0.2 + 0.001 * (x2 - x1);
      if (dz > 0.6) dz = 0.6;
      dz *= dir;
      var scale_y = 1;
      var startIstart = "";
      var endIstart = "";
      //	        console.log(path);

      if (path) {
        startIstart = path[0].istart;
        endIstart = path[path.length - 1].istart;
      }
      // 简谱的连音线往上画弧
      if (!dotted) {
        output +=
          '<path id="' +
          uuid() +
          '" istart="' +
          startIstart +
          '" stroke-width="0.2" style="cursor:pointer;" stroke="black" cat="decos" start="' +
          startIstart +
          '" end="' +
          endIstart +
          '" type="slur" class="fill" d="M';
      } else {
        output +=
          '<path id="' +
          uuid() +
          '" istart="' +
          startIstart +
          '" stroke-width="0.2" style="cursor:pointer;" stroke="black" cat="decos" start="' +
          startIstart +
          '" end="' +
          endIstart +
          '" type="slur" class="stroke" stroke-dasharray="5,5" d="M';
      }
      if (isLowerCase) {
        output = output.replace('d="M', 'd="m');
      }
      var preXIn = 0;
      var sufXIn = 0;
      if (path && path.length > 0) {
        preXIn = getXIndent(path[0]);
        x1 = x1 + preXIn;
        sufXIn = getXIndent(path[path.length - 1]);
        x2 = x2 + sufXIn;
      }
      out_sxsy(x1, " ", y1);
      //	        yy1 -= 20;
      //	        yy2 -= 20;
      var cy1 = ((y1 - yy1) / scale_y).toFixed(2);
      var t = up && radianHei ? radianHei : 0;
      if (up && cy1 > 0) {
        cy1 = -cy1 - t;
      }
      var cyy1 = ((y1 - yy2) / scale_y).toFixed(2);
      if (up && cyy1 > 0) {
        cyy1 = -cyy1 - t;
      }
      var cy2 = ((y2 + dz - yy2 - dy) / scale_y).toFixed(2);
      if (up && cy2 > 0) {
        cy2 = -cy2 - t;
      }
      var cyy2 = ((y2 + dz - yy1 - dy) / scale_y).toFixed(2);
      if (up && cyy2 > 0) {
        cyy2 = -cyy2 - t;
      }
      output +=
        "c" +
        ((xx1 - x1) / stv_g.scale).toFixed(1) +
        " " +
        ((y1 - yy1) / scale_y).toFixed(1) +
        " " +
        ((xx2 - x1) / stv_g.scale).toFixed(1) +
        " " +
        ((y1 - yy2) / scale_y).toFixed(1) +
        " " +
        ((x2 - x1) / stv_g.scale).toFixed(1) +
        " " +
        ((y1 - y2) / scale_y).toFixed(1);
      if (!dotted)
        output +=
          "\n\tv" +
          (-dz).toFixed(1) +
          "c" +
          ((xx2 - dx - x2) / stv_g.scale).toFixed(1) +
          " " +
          ((y2 + dz - yy2 - dy) / scale_y).toFixed(1) +
          " " +
          ((xx1 + dx - x2) / stv_g.scale).toFixed(1) +
          " " +
          ((y2 + dz - yy1 - dy) / scale_y).toFixed(1) +
          " " +
          ((x1 - x2) / stv_g.scale).toFixed(1) +
          " " +
          ((y2 + dz - y1) / scale_y).toFixed(1);
      output += '"/>\n';
      lastDir = dir;
    };

    //        var slur_out= function(x1, y1, x2, y2, dir, height, dotted, up) {
    //            var dx, dy, dz, alfa = .3, beta = .45;
    //            dy = y2 - y1
    //            if (dy < 0) dy = -dy;
    //            dx = x2 - x1
    //            if (dx > 40. && dy / dx < .7) {
    //                alfa = .3 + .002 * (dx - 40.)
    //                if (alfa > .7) alfa = .7
    //            }
    //            var mx = .5 * (x1 + x2),
    //            my = .5 * (y1 + y2),
    //            xx1 = mx + alfa * (x1 - mx),
    //            yy1 = my + alfa * (y1 - my) + height;
    //            xx1 = x1 + beta * (xx1 - x1);
    //            yy1 = y1 + beta * (yy1 - y1)
    //            var xx2 = mx + alfa * (x2 - mx),
    //            yy2 = my + alfa * (y2 - my) + height;
    //            xx2 = x2 + beta * (xx2 - x2);
    //            yy2 = y2 + beta * (yy2 - y2);
    //            dx = .03 * (x2 - x1);
    //            dy = 2 * dir;
    //            dz = .2 + .001 * (x2 - x1)
    //            if (dz > .6) dz = .6;
    //            dz *= dir
    //            var scale_y = 1
    //            if (!dotted)
    //            	output += '<path d="M'
    //            else
    //            	output += '<path class="stroke" stroke-dasharray="5,5" d="M';
    //            out_sxsy(x1, ' ', y1);
    //            output += 'c' + ((xx1 - x1) / stv_g.scale).toFixed(1) + ' ' + ((y1 - yy1) / scale_y).toFixed(1) + ' ' + ((xx2 - x1) / stv_g.scale).toFixed(1) + ' ' + ((y1 - yy2) / scale_y).toFixed(1) + ' ' + ((x2 - x1) / stv_g.scale).toFixed(1) + ' ' + ((y1 - y2) / scale_y).toFixed(1)
    //            if (!dotted) output += '\n\tv' + ( - dz).toFixed(1) + 'c' + ((xx2 - dx - x2) / stv_g.scale).toFixed(1) + ' ' + ((y2 + dz - yy2 - dy) / scale_y).toFixed(1) + ' ' + ((xx1 + dx - x2) / stv_g.scale).toFixed(1) + ' ' + ((y2 + dz - yy1 - dy) / scale_y).toFixed(1) + ' ' + ((x1 - x2) / stv_g.scale).toFixed(1) + ' ' + ((y2 + dz - y1) / scale_y).toFixed(1);
    //            output += '"/>\n'
    //        }

    function slur_multi(k1, k2) {
      while (1) {
        if (!k1) break;
        if (k1.multi) return k1.multi;
        if (k1 == k2) break;
        k1 = k1.next;
      }
      return 0;
    }

    // 连音线
    function draw_slur(path, not1, sl) {
      console.log("draw_slur");
      var i,
        k,
        g,
        x1,
        y1,
        x2,
        y2,
        height,
        addy,
        a,
        y,
        z,
        h,
        dx,
        dy,
        ty = sl.ty,
        dir = (ty & 0x07) == C.SL_ABOVE ? 1 : -1,
        n = path.length,
        i1 = 0,
        i2 = n - 1,
        k1 = path[0],
        k2 = path[i2];
      var nn = 1,
        upstaff = k1.st,
        two_staves = false;
      if (k1.v != k2.v) {
        //如果不在同一个声部，就退出，add by hxs2021-12-2
        return;
      }
      if (path && path[0].type == 0) {
        //如果第一个元素就是小节线，则说明该连音线是从上一行延续下来的，那么方向应该跟上一个一致
        dir = lastDir;
      }
      set_dscale(k1.st);
      for (i = 1; i < n; i++) {
        k = path[i];
        if (k.type == C.NOTE || k.type == C.REST) {
          nn++;
          if (k.st != upstaff) {
            two_staves = true;
            if (k.st < upstaff) upstaff = k.st;
          }
        }
      }
      //这里不支持多个声部的连音线，del by hxs
      //if (two_staves) error(2, k1, "*** multi-staves slurs not treated yet");

      x1 = k1.x;
      if (k1.notes && k1.notes[0].shhd) x1 += k1.notes[0].shhd;
      x2 = k2.x;
      if (k2.notes) x2 += k2.notes[0].shhd;
      if (not1) {
        y1 = 3 * (not1.pit - 18) + 2 * dir;
        x1 += 3;
      } else {
        //	            y1 = dir > 0 ? k1.ymx + 2 : k1.ymn - 2;//把k1.ymx改成k1.my_ymx,这样连音线的开始位置就会在音符上方，而不会在装饰音的上方add by hxs
        y1 = dir > 0 ? k1.my_ymx + 2 : k1.ymn - 2; //
        if (k1.type == C.NOTE) {
          if (dir > 0) {
            if (k1.stem > 0) {
              x1 += 5;
              if (k1.beam_end && k1.nflags >= -1 && !k1.in_tuplet) {
                if (k1.nflags > 0) {
                  x1 += 2;
                  y1 = k1.ys - 3;
                } else {
                  y1 = k1.ys - 6;
                }
              }
            }
          } else {
            if (k1.stem < 0) {
              x1 -= 1;
              if (k2.grace) {
                y1 = k1.y - 8;
              } else if (
                k1.beam_end &&
                k1.nflags >= -1 &&
                (!k1.in_tuplet || k1.ys < y1 + 3)
              ) {
                if (k1.nflags > 0) {
                  x1 += 2;
                  y1 = k1.ys + 3;
                } else {
                  y1 = k1.ys + 6;
                }
              }
            }
          }
        }
      }
      if (sl.is_note) {
        y2 = 3 * (sl.note.pit - 18) + 2 * dir;
        x2 -= 3;
      } else {
        //	            y2 = dir > 0 ? k2.ymx + 2 : k2.ymn - 2;//把k2.ymx改成k1.my_ymx,这样连音线的结束位置就会在音符上方，而不会在装饰音的上方add by hxs
        y2 = dir > 0 ? k2.my_ymx + 2 : k2.ymn - 2;
        if (k2.type == C.NOTE) {
          if (dir > 0) {
            if (k2.stem > 0) {
              x2 += 1;
              if (k2.beam_st && k2.nflags >= -1 && !k2.in_tuplet)
                y2 = k2.ys - 6;
            }
          } else {
            if (k2.stem < 0) {
              x2 -= 5;
              if (k2.beam_st && k2.nflags >= -1 && !k2.in_tuplet)
                y2 = k2.ys + 6;
            }
          }
        }
      }
      if (k1.type != C.NOTE) {
        y1 = y2 + 1.2 * dir;
        x1 = k1.x + k1.wr * 0.5;
        if (x1 > x2 - 12) x1 = x2 - 12;
      }
      if (k2.type != C.NOTE) {
        if (k1.type == C.NOTE) y2 = y1 + 1.2 * dir;
        else y2 = y1;
        if (k1 != k2) x2 = k2.x - k2.wl * 0.3;
      }
      if (nn >= 3) {
        k = path[1];
        if (k.type != C.BAR && k.x < x1 + 48) {
          if (dir > 0) {
            y = k.ymx - 2;
            if (y1 < y) y1 = y;
          } else {
            y = k.ymn + 2;
            if (y1 > y) y1 = y;
          }
        }
        k = path[i2 - 1];
        if (k.type != C.BAR && k.x > x2 - 48) {
          if (dir > 0) {
            y = k.ymx - 2;
            if (y2 < y) y2 = y;
          } else {
            y = k.ymn + 2;
            if (y2 > y) y2 = y;
          }
        }
      }
      a = (y2 - y1) / (x2 - x1);
      if (a > SLUR_SLOPE || a < -SLUR_SLOPE) {
        a = a > SLUR_SLOPE ? SLUR_SLOPE : -SLUR_SLOPE;
        if (a * dir > 0) y1 = y2 - a * (x2 - x1);
        else y2 = y1 + a * (x2 - x1);
      }
      y = y2 - y1;
      if (y > 8) y = 8;
      else if (y < -8) y = -8;
      z = y;
      if (z < 0) z = -z;
      dx = 0.5 * z;
      dy = 0.3 * y;
      if (y * dir > 0) {
        x2 -= dx;
        y2 -= dy;
      } else {
        x1 += dx;
        y1 += dy;
      }
      if (k1.grace) x1 = k1.x - GSTEM_XOFF * 0.5;
      if (k2.grace) x2 = k2.x + GSTEM_XOFF * 1.5;
      h = 0;
      a = (y2 - y1) / (x2 - x1);
      if (k1 != k2 && k1.v == k2.v) {
        addy = y1 - a * x1;
        for (i = 1; i < i2; i++) {
          k = path[i];
          if (k.st != upstaff) continue;
          switch (k.type) {
            case C.NOTE:
            case C.REST:
              if (dir > 0) {
                y = 3 * (k.notes[k.nhd].pit - 18) + 6;
                if (y < k.ymx) y = k.ymx;
                y -= a * k.x + addy;
                if (y > h) h = y;
              } else {
                y = 3 * (k.notes[0].pit - 18) - 6;
                if (y > k.ymn) y = k.ymn;
                y -= a * k.x + addy;
                if (y < h) h = y;
              }
              break;
            case C.GRACE:
              for (g = k.extra; g; g = g.next) {
                if (dir > 0) {
                  y = 3 * (g.notes[g.nhd].pit - 18) + 6;
                  if (y < g.ymx) y = g.ymx;
                  y -= a * g.x + addy;
                  if (y > h) h = y;
                } else {
                  y = 3 * (g.notes[0].pit - 18) - 6;
                  if (y > g.ymn) y = g.ymn;
                  y -= a * g.x + addy;
                  if (y < h) h = y;
                }
              }
              break;
          }
        }
        //	            y1 += .45 * h;//把这里注释掉，连音线的头尾就会直接落在音符上，而不会增加装饰音的高度 add by hxs
        //	            y2 += .45 * h;//把这里注释掉，连音线的头尾就会直接落在音符上，而不会增加装饰音的高度add by hxs
        h *= 0.65;
      }
      if (nn > 3) height = (0.08 * (x2 - x1) + 12) * dir;
      else height = (0.03 * (x2 - x1) + 8) * dir;
      if (dir > 0) {
        if (height < 3 * h) height = 3 * h;
        if (height > 40) height = 40;
      } else {
        if (height > 3 * h) height = 3 * h;
        if (height < -40) height = -40;
      }
      y = y2 - y1;
      if (y < 0) y = -y;
      if (dir > 0) {
        if (height < 0.8 * y) height = 0.8 * y;
      } else {
        if (height > -0.8 * y) height = -0.8 * y;
      }
      height *= cfmt.slurheight;
      height *= getNoteSlurHeight(path[0]); //处理单 独设置的连音线高度
      if (musicType != 2) {
        slur_out(x1, y1, x2, y2, dir, height, ty & C.SL_DOTTED, null, path);
      }
      if (k2.grace != true) {
        // 简谱的滑音使用本身的连音（最后一个参数，表示和弦音的个数）---这里注释掉是因为简谱最后如果是连音线及倚音，就会显示不出连音线 2021-8-3 hxs
        //debugger;
        slur_out_spl(
          k1,
          k2,
          x1,
          x2,
          height,
          false,
          ty,
          slur_out,
          k1.notes && k1.notes.length > 1 ? k1.notes.length - 1 : 0,
          path
        );
      }
      dx = x2 - x1;
      a = (y2 - y1) / dx;
      addy = y1 - a * x1;
      if (height > 0) addy += 4 * Math.sqrt(height) - 2;
      else addy -= 4 * Math.sqrt(-height) - 2;
      for (i = 0; i < i2; i++) {
        k = path[i];
        if (k.st != upstaff) continue;
        y = a * k.x + addy;
        if (k.ymx < y) k.ymx = y;
        else if (k.ymn > y) k.ymn = y;
        if (i == i2 - 1) {
          dx = x2;
          if (k2.sl1) dx -= 5;
          y -= height / 3;
        } else {
          dx = path[i + 1].x;
        }
        if (i != 0) x1 = k.x;
        else y -= height / 3;
        dx -= x1;
        y_set(upstaff, dir > 0, x1, dx, y);
      }
    }
    function draw_slurs(s, last) {
      var gr1, i, m, note, sls, nsls;

      function draw_sls(s, sl, snote) {
        var k,
          v,
          i,
          dir,
          path = [],
          enote = sl.note,
          s2 = enote.s;
        if (last && s2.time > last.time) return;
        // 增加了&& !s2.grace的判断，否则一行最后一个音符是倚音时，会报错
        if (tsnext && s2.time >= tsnext.time && !s2.grace) {
          s.p_v.sls.push(sl);
          s2 = s.p_v.s_next.prev;
          while (s2.next) s2 = s2.next;
          sl = Object.create(sl);
          sl.note = {
            s: s2,
          };
        }
        switch (sl.ty & 0x07) {
          case C.SL_ABOVE:
            dir = 1;
            break;
          case C.SL_BELOW:
            dir = -1;
            break;
          default:
            if (s.v != s2.v) dir = -1;
            else dir = slur_direction(s, s2);
            sl.ty &= ~0x07;
            sl.ty |= dir > 0 ? C.SL_ABOVE : C.SL_BELOW;
            break;
        }
        //这里有bug，做个判断 add by hxs
        if (!cur_sy.voices[s.v] || !cur_sy.voices[s2.v]) {
          if (!cur_sy.voices[s.v]) {
            v = s2.v;
          } else if (!cur_sy.voices[s2.v]) {
            v = s.v;
          }
        } else {
          if (
            dir *
              (cur_sy.voices[s.v].range <= cur_sy.voices[s2.v].range ? 1 : -1) >
            0
          )
            v = s.v;
          else v = s2.v;
        }
        if (gr1 && !(s2.grace && s.v == s2.v && s.time == s2.time)) {
          do {
            path.push(s);
            s = s.next;
          } while (s);
          s = gr1.next;
        } else {
          path.push(s);
          if (s.grace) s = s.next;
          else s = s.ts_next;
        }
        if (!s2.grace) {
          while (1) {
            if (s.v == v) path.push(s);
            if (s == s2) break;

            if (!s.ts_next) {
              break;
            }
            s = s.ts_next;
          }
        } else if (s.grace) {
          while (1) {
            if (s.v == v) path.push(s);
            if (s == s2) break;
            s = s.next;
          }
        } else {
          k = s2;
          while (k.prev) k = k.prev;
          while (1) {
            if (s.v == v) path.push(s);
            if (s.extra == k) break;
            if (!s.ts_next) {
              break;
            }
            s = s.ts_next;
          }
          s = k;
          while (1) {
            path.push(s);
            if (s == s2) break;
            s = s.next;
          }
        }
        for (i = 1; i < path.length - 1; i++) {
          s = path[i];
          if (s.sls || s.sl1) draw_slurs(s, last);
          if (s.tp) draw_tuplet(s);
        }
        draw_slur(path, snote, sl);
        return 1;
      }
      while (1) {
        if (!s || s == last) {
          if (!gr1 || !(s = gr1.next) || s == last) break;
          gr1 = null;
        }
        if (s.type == C.GRACE) {
          gr1 = s;
          s = s.extra;
          continue;
        }
        if (s.sls) {
          sls = s.sls;
          s.sls = null;
          nsls = [];
          for (i = 0; i < sls.length; i++) {
            if (!draw_sls(s, sls[i])) nsls.push(sls[i]);
          }
          if (nsls.length) s.sls = nsls;
        }
        if (s.sl1) {
          for (m = 0; m <= s.nhd; m++) {
            note = s.notes[m];
            if (note.sls) {
              sls = note.sls;
              note.sls = null;
              nsls = [];
              for (i = 0; i < sls.length; i++) {
                if (!draw_sls(s, sls[i], note)) nsls.push(sls[i]);
              }
              if (nsls.length) note.sls = nsls;
            }
          }
        }
        s = s.next;
      }
    }
    // 绘制连音符号
    function draw_tuplet(s1, tp) {
      var s2,
        s3,
        g,
        upstaff,
        nb_only,
        some_slur,
        x1,
        x2,
        y1,
        y2,
        xm,
        ym,
        a,
        s0,
        yy,
        yx,
        dy,
        a,
        dir,
        r,
        tp = s1.tp.shift();
      if (!s1.tp.length) delete s1.tp;
      upstaff = s1.st;
      set_dscale(s1.st);
      for (s2 = s1; s2; s2 = s2.next) {
        if (s2.type != C.NOTE && s2.type != C.REST) {
          if (s2.type == C.GRACE) {
            for (g = s2.extra; g; g = g.next) {
              if (g.sls || g.sl1) draw_slurs(g);
            }
          }
          continue;
        }
        if (s2.sls || s2.sl1) draw_slurs(s2);
        if (s2.st < upstaff) upstaff = s2.st;
        if (s2.tp) draw_tuplet(s2);
        if (s2.tpe) break;
      }
      if (!s2) {
        //                error(1, s1, "No end of tuplet in this music line")
        error(1, s1, "N连音未正确结束");
        return;
      }
      s2.tpe--;
      if (tp && tp.f[0] == 1) return;
      if (!tp) return;
      dir = tp.f[3];
      if (!dir) {
        s3 = s1;
        // 判断是否是扩展音符
        var s_str = source_val.substring(s3.istart, s3.iend);
        //                s_str = s_str.replaceAll("/","").replaceAll(",","").replaceAll("'","").replace(/\d/g,"");
        s_str = s_str.replaceAll(/[,'/\d]/g, "");
        if (isExtendChar(s_str)) {
          s3.is_ext = true; //新增扩展音符标记 add by hxs
        }
        if (isExtend2Char(s_str)) {
          s3.is_ext2 = true; //新增扩展音符标记 add by hxs
        }

        while (s3 && !s3.is_ext && s3.type != C.NOTE) {
          s3 = s3.next;
        }
        if (s3) {
          dir = s3.stem > 0 ? C.SL_ABOVE : C.SL_BELOW;
        }
      }
      if (s1 == s2 || tp.f[1] == 2) {
        nb_only = true;
      } else if (tp.f[1] == 1) {
        nb_only = true;
        draw_slur([s1, s2], null, {
          ty: dir,
        });
      } else {
        if (tp.f[0] != 2 && s1.type == C.NOTE && s2.type == C.NOTE) {
          nb_only = true;
          for (s3 = s1; ; s3 = s3.next) {
            if (s3.type != C.NOTE && s3.type != C.REST) {
              if (s3.type == C.GRACE || s3.type == C.SPACE) continue;
              nb_only = false;
              break;
            }
            if (s3 == s2) break;
            if (s3.beam_end) {
              nb_only = false;
              break;
            }
          }
          if (nb_only && !s1.beam_st && !s1.beam_br1 && !s1.beam_br2) {
            for (s3 = s1.prev; s3; s3 = s3.prev) {
              if (s3.type == C.NOTE || s3.type == C.REST) {
                if (s3.nflags >= s1.nflags) nb_only = false;
                break;
              }
            }
          }
          if (nb_only && !s2.beam_end) {
            for (s3 = s2.next; s3; s3 = s3.next) {
              if (s3.type == C.NOTE || s3.type == C.REST) {
                if (!s3.beam_br1 && !s3.beam_br2 && s3.nflags >= s2.nflags)
                  nb_only = false;
                break;
              }
            }
          }
        }
      }
      if (nb_only) {
        if (tp.f[2] == 1) return;
        xm = (s2.x + s1.x) / 2;
        a = s2.x - s1.x;
        if (dir == C.SL_ABOVE) ym = y_get(upstaff, 1, xm - a / 2, a) + 2;
        else ym = y_get(upstaff, 0, xm - a / 2, a) - 10;
        if (s1.stem * s2.stem > 0) {
          if (s1.stem > 0) xm += 1.5;
          else xm -= 1.5;
        }
        //连音的音符不在同一行时，进行一些纠正，否则有些显示不出来，add by hxs
        if (s1.st != s2.st) {
          ym += 10;
        }
        //                "tpheight:-9"//数字的高度
        if (s1.a_gch) {
          var text = getGch(s1, "tpheight:");
          if (text) {
            s1.myTpHeight = parseInt(text.replace("tpheight:", ""));
          }
        }

        if (s1.myTpHeight) {
          ym += s1.myTpHeight;
        }
        if (tp.f[2] == 0) {
          out_bnum(xm, ym, tp.p);
        } else out_bnum(xm, ym, tp.p + ":" + tp.q);
        for (s3 = s1; ; s3 = s3.next) {
          if (s3.x >= xm) break;
        }
        if (dir == C.SL_ABOVE) {
          ym += 10;
          if (s3.ymx < ym) s3.ymx = ym;
          y_set(upstaff, true, xm - 3, 6, ym);
        } else {
          if (s3.ymn > ym) s3.ymn = ym;
          y_set(upstaff, false, xm - 3, 6, ym);
        }
        // 简谱的数字连音（有尾巴的连音）
        out_tubrn_spl(s1, xm, tp.p, out_tubrn);
        return;
      }
      if (dir == C.SL_ABOVE) {
        if (s1.st == s2.st) {
          y1 = y2 = staff_tb[upstaff].topbar + 4;
        } else {
          y1 = s1.ymx;
          y2 = s2.ymx;
        }
        x1 = s1.x - 4;
        if (s1.st == upstaff) {
          for (s3 = s1; !s3.dur; s3 = s3.next);
          ym = y_get(upstaff, 1, s3.x - 4, 8);
          if (ym > y1) y1 = ym;
          if (s1.stem > 0) x1 += 3;
        }
        if (s2.st == upstaff) {
          for (s3 = s2; !s3.dur; s3 = s3.prev);
          ym = y_get(upstaff, 1, s3.x - 4, 8);
          if (ym > y2) y2 = ym;
        }
        if (s2.dur > s2.prev.dur) {
          if (s2.next) x2 = s2.next.x - s2.next.wl - 5;
          else x2 = realwidth - 6;
        } else {
          x2 = s2.x + 4;
          r = s2.stem >= 0 ? 0 : s2.nhd;
          if (s2.notes[r].shhd > 0) x2 += s2.notes[r].shhd;
          if (s2.st == upstaff && s2.stem > 0) x2 += 3.5;
        }
        xm = 0.5 * (x1 + x2);
        ym = 0.5 * (y1 + y2);
        a = (y2 - y1) / (x2 - x1);
        s0 = (3 * (s2.notes[s2.nhd].pit - s1.notes[s1.nhd].pit)) / (x2 - x1);
        if (s0 > 0) {
          if (a < 0) a = 0;
          else if (a > s0) a = s0;
        } else {
          if (a > 0) a = 0;
          else if (a < s0) a = s0;
        }
        if (a * a < 0.1 * 0.1) a = 0;
        dy = 0;
        for (s3 = s1; ; s3 = s3.next) {
          if (!s3.dur || s3.st != upstaff) {
            if (s3 == s2) break;
            continue;
          }
          yy = ym + (s3.x - xm) * a;
          yx = y_get(upstaff, 1, s3.x - 4, 8) + 2;
          if (yx - yy > dy) dy = yx - yy;
          if (s3 == s2) break;
        }
        ym += dy;
        y1 = ym + a * (x1 - xm);
        y2 = ym + a * (x2 - xm);
        ym += 8;
        for (s3 = s1; ; s3 = s3.next) {
          if (s3.st == upstaff) {
            yy = ym + (s3.x - xm) * a;
            if (s3.ymx < yy) s3.ymx = yy;
            if (s3 == s2) break;
            y_set(upstaff, true, s3.x, s3.next.x - s3.x, yy);
          } else if (s3 == s2) {
            break;
          }
        }
      } else {
        x1 = s1.x - 7;
        if (s2.dur > s2.prev.dur) {
          if (s2.next) x2 = s2.next.x - s2.next.wl - 8;
          else x2 = realwidth - 6;
        } else {
          x2 = s2.x + 2;
          if (s2.notes[s2.nhd].shhd > 0) x2 += s2.notes[s2.nhd].shhd;
        }
        if (s1.stem >= 0) {
          x1 += 2;
          x2 += 2;
        }
        if (s1.st == upstaff) {
          for (s3 = s1; !s3.dur; s3 = s3.next);
          y1 = y_get(upstaff, 0, s3.x - 4, 8);
        } else {
          y1 = 0;
        }
        if (s2.st == upstaff) {
          for (s3 = s2; !s3.dur; s3 = s3.prev);
          y2 = y_get(upstaff, 0, s3.x - 4, 8);
        } else {
          y2 = 0;
        }
        xm = 0.5 * (x1 + x2);
        ym = 0.5 * (y1 + y2);
        a = (y2 - y1) / (x2 - x1);
        s0 = (3 * (s2.notes[0].pit - s1.notes[0].pit)) / (x2 - x1);
        if (s0 > 0) {
          if (a < 0) a = 0;
          else if (a > s0) a = s0;
        } else {
          if (a > 0) a = 0;
          else if (a < s0) a = s0;
        }
        if (a * a < 0.1 * 0.1) a = 0;
        dy = 0;
        for (s3 = s1; ; s3 = s3.next) {
          if (!s3.dur || s3.st != upstaff) {
            if (s3 == s2) break;
            continue;
          }
          yy = ym + (s3.x - xm) * a;
          yx = y_get(upstaff, 0, s3.x - 4, 8);
          if (yx - yy < dy) dy = yx - yy;
          if (s3 == s2) break;
        }
        ym += dy - 10;
        y1 = ym + a * (x1 - xm);
        y2 = ym + a * (x2 - xm);
        ym -= 2;
        for (s3 = s1; ; s3 = s3.next) {
          if (s3.st == upstaff) {
            if (s3 == s2) break;
            yy = ym + (s3.x - xm) * a;
            if (s3.ymn > yy) s3.ymn = yy;
            y_set(upstaff, false, s3.x, s3.next.x - s3.x, yy);
          }
          if (s3 == s2) break;
        }
      }
      if (tp.f[2] == 1) {
        out_tubr(x1, y1 + 4, x2 - x1, y2 - y1, dir == C.SL_ABOVE);
        return;
      }
      if (musicType != 2) {
        out_tubrn(
          x1,
          y1,
          x2 - x1,
          y2 - y1,
          dir == C.SL_ABOVE,
          tp.f[2] == 0 ? tp.p.toString() : tp.p + ":" + tp.q,
          s1
        ); //增加了最后一个参数s1
      }
      // 简谱的数字连音（无尾巴的连音）
      out_tubrn_spl(s1, xm, tp.p, out_tubrn);
      if (dir == C.SL_ABOVE) y_set(upstaff, true, xm - 3, 6, yy + 2);
      else y_set(upstaff, false, xm - 3, 6, yy);
    }
    // 同音的连音
    function draw_note_ties(not1, job, m1) {
      var m,
        x1,
        x2,
        s,
        y,
        h,
        time,
        not2 = not1.tie_n,
        p = job == 2 ? not1.pit : not2.pit,
        dir = (not1.tie_ty & 0x07) == C.SL_ABOVE ? 1 : -1,
        s1 = not1.s,
        st = s1.st,
        s2 = not2.s,
        x2 = s2.x,
        sh = not1.shhd;
      for (m = 0; m < s1.nhd; m++) if (s1.notes[m] == not1) break;
      if (dir > 0) {
        if (m < s1.nhd && p + 1 == s1.notes[m + 1].pit)
          if (s1.notes[m + 1].shhd > sh) sh = s1.notes[m + 1].shhd;
      } else {
        if (m > 0 && p == s1.notes[m - 1].pit + 1)
          if (s1.notes[m - 1].shhd > sh) sh = s1.notes[m - 1].shhd;
      }
      x1 = s1.x + sh * 0.6;
      if (job != 2) {
        for (m = 0; m < s2.nhd; m++) if (s2.notes[m] == not2) break;
        sh = s2.notes[m].shhd;
        if (dir > 0) {
          if (m < s2.nhd && p + 1 == s2.notes[m + 1].pit)
            if (s2.notes[m + 1].shhd < sh) sh = s2.notes[m + 1].shhd;
        } else {
          if (m > 0 && p == s2.notes[m - 1].pit + 1)
            if (s2.notes[m - 1].shhd < sh) sh = s2.notes[m - 1].shhd;
        }
        x2 += sh * 0.6;
      }
      switch (job) {
        case 0:
          p = not1.pit & 1 ? not1.pit : not2.pit;
          break;
        case 3:
          dir = -dir;
        case 1:
          x1 = s1.x;
          if (x1 > x2 - 20) x1 = x2 - 20;
          p = not2.pit;
          st = s2.st;
          break;
        default:
          if (s1 != s2) {
            x2 -= s2.wl;
            if (s2.type == C.BAR) x2 += 5;
          } else {
            time = s1.time + s1.dur;
            for (s = s1.ts_next; s; s = s.ts_next) if (s.time > time) break;
            x2 = s ? s.x : realwidth;
          }
          if (x2 < x1 + 16) x2 = x1 + 16;
          break;
      }
      if (x2 - x1 > 20) {
        x1 += 3.5;
        x2 -= 3.5;
      } else {
        x1 += 1.5;
        x2 -= 1.5;
      }
      if (
        s1.dots &&
        !(not1.pit & 1) &&
        ((dir > 0 && !s1.dot_low) || (dir < 0 && s1.dot_low))
      )
        x1 += 5;
      y = staff_tb[st].y + 3 * (p - 18);
      h = (0.03 * (x2 - x1) + 16) * dir;
      // create by lhj 同音连的istart
      if (s1.slur_istart) {
        s2.slur_istart = s1.slur_istart;
      } else if (s1.notes[0].pit == s2.notes[0].pit) {
        s2.slur_istart = s1.istart;
      }
      if (2 != musicType) {
        slur_out(x1, y, x2, y, dir, h, not1.tie_ty & C.SL_DOTTED);
      }
      // 同音的连音“-”
      slur_out_spl(s1, s2, x1, x2, h, true, s1.notes[m1].ti1, slur_out, m1);
    }

    // 简谱的连音线（此处可调高低）
    function slur_out_spl(
      k1,
      k2,
      x1,
      x2,
      h,
      isSameNote,
      slur_type,
      func,
      m1,
      path
    ) {
      if (musicType != 0 && (k1.dot_low_note || k1.dot_low)) {
        k1.slur2s = k2;
        k1.slur2sh = h;
        k1.slur_type = slur_type & C.SL_DOTTED;
        return;
      }

      if (0 == musicType) {
        return;
      }

      var hei = 0,
        rny = 0;
      if (isChordScore) {
        var noteObj = getNoteY(k2.istart, k2.st);
        hei += noteObj.crdHei + noteObj.addHei;
        rny = noteObj.ymn;
      } else {
        rny = rtnNoteY(k2.istart);
      }

      var nTop = staff_tb[k2.st].y + rny - abc.sh(isSameNote ? 28 : 26); // 值越大越往下
      if (musicType == 2) {
        nTop =
          staff_tb[k2.st].y +
          staff_tb[k2.st].topbar * staff_tb[k2.st].staffscale -
          hei +
          (isSameNote ? abc.sh(0) : abc.sh(5));
      }
      // 存在数字连音
      if (k2.in_tuplet) {
        nTop += 10;
      }

      if (m1) {
        //nTop += (circleSpace * 3 + 4 + underlineSpace * 3 + 4 + Number(chordFontSize-8) - circleMarginTop  + chordSpace ) * m1;
        // 与staff2num-splnum.js 预留的和弦间距保持一致
        nTop +=
          (circleSpace * 1 +
            1 +
            underlineSpace * 1 +
            1 +
            Number(chordFontSize - 8) -
            circleMarginTop +
            chordSpace) *
          m1;
      }
      if (musicType == 2 && k1.pos && k1.pos.spl == 9 && k1.notes.length == 1) {
        //简谱居中显示时，要调整连音线
        if (splBarHeight == 0) {
          setTimeout(src_change, 100); //这里由于第一次渲染还没有取到splBarHeight的值，所以要进行第二次渲染，hxs 2022-1-26
        }
        nTop += parseFloat(splBarHeight) / 2 / scale;
      }
      if (getSplnumscore(source_val, k1.st) && typeof func == "function") {
        func.apply(this, [
          x1,
          nTop,
          x2,
          nTop,
          1,
          Math.abs(h),
          slur_type & C.SL_DOTTED,
          true,
          path,
        ]);
      }
    }

    // 简谱的数字连音线
    function out_tubrn_spl(s1, xm, p, func) {
      if (0 == musicType) {
        return;
      }
      var hei = 0,
        rny = 0;
      if (isChordScore) {
        var noteObj = getNoteY(s1.istart, s1.st);
        hei += noteObj.crdHei + noteObj.addHei;
        rny = noteObj.ymn;
      } else {
        rny = rtnNoteY(s1.istart);
      }

      var nTop = staff_tb[s1.st].y + rny - abc.sh(25); // 35表示五线谱与简谱间的间距
      if (musicType == 2) {
        nTop =
          staff_tb[s1.st].y +
          staff_tb[s1.st].topbar * staff_tb[s1.st].staffscale -
          hei +
          abc.sh(10);
      }

      if (getSplnumscore(source_val, s1.st) && typeof func == "function") {
        // 这里s1.tf[2]取不到值了,先写死 add by hxs
        //func.apply(this,[s1.x, nTop, (xm - s1.x) * 2, 0, true, s1.tf[2] == 0 ? p.toString() : p + ":" + q]);
        func.apply(this, [
          s1.x,
          nTop,
          (xm - s1.x) * 2,
          0,
          true,
          p.toString(),
          s1,
        ]);
      }
    }
    //画同音的连音线
    function draw_ties(k1, k2, job) {
      var k3,
        i,
        j,
        not1,
        not3,
        time,
        pit,
        pit2,
        mhead3 = [],
        nh1 = k1.nhd;
      //如果音不一样，就不画连音线---update by hxs start------
      var abcContent = document.getElementById("source").value;
      var k1Str = abcContent
        .substring(k1.istart, k1.iend)
        .replace(/\d/g, "")
        .replace(/[/{}()-]/g, "");
      var k2Str = abcContent
        .substring(k2.istart, k2.iend)
        .replace(/\d/g, "")
        .replace(/[/{}()-]/g, "");
      if (k1Str != k2Str && k2.type != 0) {
        //如果同音连音线的音符不一样，且不是小节线，就退出（如果是小节线，说明是最后一节，连音线就画到小节线）
        if (!/\[.*\]/.test(k1Str) && !/\[.*\]/.test(k2Str)) {
          return;
        }
      }
      //如果音不一样，就不画连音线---update by hxs end------
      if (job == 2) {
        for (i = 0; i <= nh1; i++) {
          not1 = k1.notes[i];
          if (not1.tie_ty) {
            k3 = not1.tie_n;
            not1.tie_n = {
              s: k2 || k1,
            };
            draw_note_ties(not1, job, i);
            not1.tie_n = k3;
          }
        }
        return;
      }
      for (i = 0; i <= nh1; i++) {
        not1 = k1.notes[i];
        if (!not1.tie_ty) continue;
        if (!not1.s) not1.s = k1;
        if (not1.tie_n) draw_note_ties(not1, job, i);
        else mhead3.push(not1);
      }
      if (!mhead3.length) return;
      time = k1.time + k1.dur;
      k3 = k1.ts_next;
      if (job != 1) job = 0;
      while (k3 && k3.time < time) k3 = k3.ts_next;
      while (k3 && k3.time == time) {
        if (k3.type != C.NOTE || k3.st != k1.st) {
          k3 = k3.ts_next;
          continue;
        }
        for (i = mhead3.length; --i >= 0; ) {
          not1 = mhead3[i];
          pit = not1.opit || not1.pit;
          for (j = k3.nhd; j >= 0; j--) {
            not3 = k3.notes[j];
            pit2 = not3.opit || not3.pit;
            if (pit2 == pit) {
              not1.tie_n = not3;
              if (!not3.s) not3.s = k3;
              draw_note_ties(not1, job, j);
              mhead3.splice(i, 1);
              break;
            }
          }
        }
        if (!mhead3.length) break;
        k3 = k3.ts_next;
      }
      if (mhead3.length != 0) {
        // 这里不知道为什么报错，先去掉，否则无法保存，del by hxs 20190625
        // error(1, k1, "Bad tie")
      }
    }
    function tie_comb(s) {
      var s1, time, st;
      time = s.time + s.dur;
      st = s.st;
      for (s1 = s.ts_next; s1; s1 = s1.ts_next) {
        if (s1.st != st) continue;
        if (s1.time == time) {
          if (s1.type == C.NOTE) return s1;
          continue;
        }
        if (s1.time > time) return s;
      }
      return;
    }
    function draw_all_ties(p_voice) {
      var s, s1, s2, clef_chg, time, x, dx, s_next, m;

      function draw_ties_g(s1, s2, job) {
        if (s1.type == C.GRACE) {
          for (var g = s1.extra; g; g = g.next) {
            if (g.tie_s) draw_ties(g, s2, job);
          }
        } else {
          draw_ties(s1, s2, job);
        }
      }
      s_next = p_voice.sym;
      set_color(s_next.color);
      while (1) {
        for (s1 = s_next; s1; s1 = s1.next) {
          if (s1.ti2 && (s1 != s_next || !s_next.prev)) {
            s = s1.ti2;
            s.x = s1.x;
            s2 = s.next;
            s.next = s1;
            s.st = s1.st;
            s.time = s1.time - s.dur;
            draw_ties(s, s1, 1);
            s.next = s2;
          }
          if (s1.tie_s) break;
        }
        if (!s1) break;
        s2 = s1.tie_s;
        if (s2.v == s1.v) {
          s_next = s2;
          s = s1;
          while (1) {
            if (!s.next) {
              s2 = s;
              s = null;
              break;
            }
            s = s.next;
            if (s == s2) break;
          }
        } else {
          s_next = s1.next;
          s = s1;
          while (1) {
            if (!s.ts_next) {
              s = null;
              break;
            }
            s = s.ts_next;
            if (s == s2) break;
          }
          if (!s) {
            s2 = s1;
            while (s2.next) s2 = s2.next;
          }
        }
        if (!s) {
          draw_ties_g(s1, s2, 2);
          break;
        }
        time = s1.time + s.dur;
        for (s = s1.ts_next; s != s2; s = s.ts_next) {
          if (s.st != s1.st) continue;
          if (s.time > time) break;
          if (s.type == C.CLEF) {
            clef_chg = true;
            break;
          }
        }
        if (clef_chg || s1.st != s2.st) {
          clef_chg = false;
          dx = (s2.x - s1.x) * 0.4;
          x = s2.x;
          s2.x -= dx;
          if (s2.x > s1.x + 32) s2.x = s1.x + 32;
          draw_ties_g(s1, s2, 2);
          s2.x = x;
          x = s1.x;
          s1.x += dx;
          if (s1.x < s2.x - 24) s1.x = s2.x - 24;
          draw_ties(s1, s2, 3);
          s1.x = x;
          continue;
        }
        draw_ties_g(s1, s2, s2.type == C.NOTE ? 0 : 2);
      }
    }
    // 绘制所有的连音线
    function draw_all_slurs(p_voice) {
      var k,
        i,
        m2,
        s = p_voice.sym,
        slur_type = p_voice.slur_start,
        slur_st = 0;
      if (!s) return;
      if (slur_type) {
        p_voice.slur_start = 0;
        while (slur_type != 0) {
          slur_st <<= 4;
          slur_st |= slur_type & 15;
          slur_type >>= 4;
        }
      }
      draw_slurs(s, undefined);
      for (; s; s = s.next) {
        while (s.slur_end || s.sl2) {
          if (s.slur_end) {
            s.slur_end--;
            m2 = -1;
          } else {
            for (m2 = 0; m2 <= s.nhd; m2++) if (s.notes[m2].sl2) break;
            s.notes[m2].sl2--;
            s.sl2--;
          }
          slur_type = slur_st & 15;
          k = prev_scut(s);
          draw_slur(k, s, -1, m2, slur_type);
          if (
            k.type != C.BAR ||
            (k.bar_type[0] != ":" &&
              k.bar_type != "|]" &&
              k.bar_type != "[|" &&
              (!k.text || k.text[0] == "1"))
          )
            slur_st >>= 4;
        }
      }
      s = p_voice.sym;
      while (slur_st != 0) {
        slur_type = slur_st & 15;
        slur_st >>= 4;
        k = next_scut(s);
        draw_slur(s, k, -1, -1, slur_type);
        if (
          k.type != C.BAR ||
          (k.bar_type[0] != ":" &&
            k.bar_type != "|]" &&
            k.bar_type != "[|" &&
            (!k.text || k.text[0] == "1"))
        ) {
          if (!p_voice.slur_start) p_voice.slur_start = 0;
          p_voice.slur_start <<= 4;
          p_voice.slur_start += slur_type;
        }
      }
    }

    // 绘制符号
    function draw_sym_near() {
      var p_voice,
        p_st,
        s,
        v,
        st,
        y,
        g,
        w,
        i,
        st,
        dx,
        top,
        bot,
        output_sav = output;
      output = "";
      for (v = 0; v < voice_tb.length; v++) {
        var bm = {},
          first_note = true;
        p_voice = voice_tb[v];
        for (s = p_voice.sym; s; s = s.next) {
          //显示强弱记号add by hxs --------start
          if (s.type == C.BAR) {
            nodeBeatTotal = 0;
            lastNoteBeatSeq = -1;
          }
          handleStrongWeak(s); //强弱拍
          handleKew(s); //柯尔文手势
          handleSD(s); //竖笛
          handleSD8(s); //八孔竖笛
          //显示强弱记号add by hxs --------end
          //                	if(s.in_tuplet){
          //                		var a_dd = s.a_dd;
          //                		if(a_dd!=null){
          //                			for(var i=0;i<a_dd.length;i++){
          //                				var dd = a_dd[i];
          //                				if(dd.name=="strong"
          //                        				||dd.name=="sec_strong"
          //                        				||dd.name=="weak"
          //                        				||dd.name=="s_w")
          //                					s.a_dd.splice(i,1)
          //                			}
          //                		}
          //
          //                	}
          // create by lhj 添加行号,这里没有line这个变量了 add by hxs
          s.my_line = self.line;
          if (
            s.istart &&
            line0X == -1 &&
            s.my_line == 0 &&
            (s.type == 8 || s.type == 10 || s.type == 0)
          ) {
            line0X = s.x;
          }
          if (
            s.istart &&
            line1X == -1 &&
            s.my_line == 1 &&
            (s.type == 8 || s.type == 10 || s.type == 0)
          ) {
            line1X = s.x;
            user.numStaffiIndent = line1X - line0X;
            firstMeterWidth = user.numStaffiIndent;
            console.log("firstMeterWidth:", firstMeterWidth);
          }
          switch (s.type) {
            case C.GRACE:
              for (g = s.extra; g; g = g.next) {
                if (g.beam_st && !g.beam_end) self.calculate_beam(bm, g);
              }
              break;
            case C.NOTE:
              if ((s.beam_st && !s.beam_end) || (first_note && !s.beam_st)) {
                first_note = false;
                self.calculate_beam(bm, s);
              }
              break;
          }
        }
      }
      for (st = 0; st <= nstaff; st++) {
        p_st = staff_tb[st];
        if (!p_st.top) {
          p_st.top = new Float32Array(YSTEP);
          p_st.bot = new Float32Array(YSTEP);
        }
        for (i = 0; i < YSTEP; i++) {
          p_st.top[i] = 0;
          p_st.bot[i] = 24;
        }
      }
      set_tie_room();
      draw_deco_near();
      for (s = tsfirst; s; s = s.ts_next) {
        if (s.invis) continue;
        switch (s.type) {
          case C.GRACE:
            for (g = s.extra; g; g = g.next) {
              y_set(s.st, true, g.x - 2, 4, g.ymx + 1);
              y_set(s.st, false, g.x - 2, 4, g.ymn - 1);
            }
            continue;
          case C.MREST:
            y_set(s.st, true, s.x + 16, 32, s.ymx + 2);
            continue;
          default:
            y_set(s.st, true, s.x - s.wl, s.wl + s.wr, s.ymx + 2);
            y_set(s.st, false, s.x - s.wl, s.wl + s.wr, s.ymn - 2);
            continue;
          case C.NOTE:
            break;
        }
        if (s.stem > 0) {
          if (s.stemless) {
            dx = -5;
            w = 10;
          } else if (s.beam_st) {
            dx = 3;
            w = s.beam_end ? 4 : 10;
          } else {
            dx = -8;
            w = s.beam_end ? 11 : 16;
          }
          y_set(s.st, true, s.x + dx, w, s.ymx);
          y_set(s.st, false, s.x - s.wl, s.wl + s.wr, s.ymn);
        } else {
          y_set(s.st, true, s.x - s.wl, s.wl + s.wr, s.ymx);
          if (s.stemless) {
            dx = -5;
            w = 10;
          } else if (s.beam_st) {
            dx = -6;
            w = s.beam_end ? 4 : 10;
          } else {
            dx = -8;
            w = s.beam_end ? 5 : 16;
          }
          dx += s.notes[0].shhd;
          y_set(s.st, false, s.x + dx, w, s.ymn);
        }
        if (s.notes[s.nhd].acc) {
          y = s.y + 8;
          if (s.ymx < y) s.ymx = y;
          y_set(s.st, true, s.x, 0, y);
        }
        if (s.notes[0].acc) {
          y = s.y;
          if (s.notes[0].acc == 1 || s.notes[0].acc == 3) y -= 7;
          else y -= 5;
          if (s.ymn > y) s.ymn = y;
          y_set(s.st, false, s.x, 0, y);
        }
      }
      draw_deco_note();
      for (v = 0; v < voice_tb.length; v++) {
        p_voice = voice_tb[v];
        s = p_voice.sym;
        if (!s) continue;
        set_color(s.color);
        st = p_voice.st;
        for (; s; s = s.next) {
          if (s.tp) draw_tuplet(s);
          if (s.sls || s.sl1) draw_slurs(s);
        }
      }
      set_color();
      for (st = 0; st <= nstaff; st++) {
        p_st = staff_tb[st];
        top = p_st.topbar + 2;
        bot = p_st.botbar - 2;
        for (i = 0; i < YSTEP; i++) {
          if (top > p_st.top[i]) p_st.top[i] = top;
          if (bot < p_st.bot[i]) p_st.bot[i] = bot;
        }
      }
      if (cfmt.measurenb >= 0) draw_measnb();
      draw_deco_staff();
      set_dscale(-1);
      for (v = 0; v < voice_tb.length; v++) {
        p_voice = voice_tb[v];
        if (p_voice.have_ly || user.copyLyric) {
          draw_all_lyrics();
          break;
        }
      }

      for (v = 0; v < voice_tb.length; v++) {
        p_voice = voice_tb[v];
        // 画所有小节图片 add by hxs
        if (p_voice.have_picture) {
          draw_all_pics();
          break;
        }
      }
      set_dscale(-1);
      output = output_sav;
    }
    // 绘制声部名称
    function draw_vname(indent) {
      var p_voice,
        n,
        st,
        v,
        a_p,
        p,
        y,
        name_type,
        h,
        h2,
        staff_d = [];
      for (st = cur_sy.nstaff; st >= 0; st--) {
        if (cur_sy.st_print[st]) break;
      }
      if (st < 0) return;
      for (v = 0; v < voice_tb.length; v++) {
        p_voice = voice_tb[v];
        if (!p_voice.sym || !cur_sy.voices[v]) continue;
        st = cur_sy.voices[v].st;
        if (!cur_sy.st_print[st]) continue;
        if (p_voice.new_name) {
          name_type = 2;
          break;
        }
        if (p_voice.snm) name_type = 1;
      }
      if (!name_type) return;
      for (v = 0; v < voice_tb.length; v++) {
        p_voice = voice_tb[v];
        if (!p_voice.sym || !cur_sy.voices[v]) continue;
        st = cur_sy.voices[v].st;
        if (!cur_sy.st_print[st]) continue;
        if (p_voice.new_name) delete p_voice.new_name;
        p = name_type == 2 ? p_voice.nm : p_voice.snm;

        if (!p) continue;
        if (!staff_d[st]) staff_d[st] = p;
        else staff_d[st] += "\\n" + p;
      }
      if (staff_d.length == 0) return;
      set_font("voice");
      h = gene.curfont.size;
      h2 = h / 2;
      indent = -indent * 0.5;
      for (st = 0; st < staff_d.length; st++) {
        if (!staff_d[st]) continue;
        a_p = staff_d[st].split("\\n");

        y =
          staff_tb[st].y +
          staff_tb[st].topbar * 0.5 * staff_tb[st].staffscale +
          h2 * (a_p.length - 2);

        if (
          cur_sy.staves[st].flags & OPEN_BRACE &&
          cur_sy.staves[st + 1].flags & CLOSE_BRACE &&
          !staff_d[st + 1]
        )
          y -= (staff_tb[st].y - staff_tb[st + 1].y) * 0.5;
        for (n = 0; n < a_p.length; n++) {
          p = a_p[n];
          //处理居中add by hxs 第一声部-m（增加-m表示垂直居中）
          var v_pat = /\((\d)\)/;
          if (p.indexOf("-m") > -1 && staff_tb[staff_tb.length - 1].y != 0) {
            var vmatch = p.match(v_pat);
            var vnum = staff_tb.length;

            if (vmatch != null) {
              vnum = vmatch[1];
            }
            y =
              staff_tb[st].y +
              staff_tb[st].topbar * 0.5 * staff_tb[st].staffscale +
              h2 * (a_p.length - 2) +
              (staff_tb[vnum - 1].y - staff_tb[st].y) / 2; //跟原来的y取值相比 增加了这一行代码
          }
          p = p.replace("-m", ""); //add by hxs
          p = p.replace(v_pat, "");
          xy_str(indent, y, p, "c", "vname" + st);
          y -= h;
        }
      }
    }

    function getLineybystAndline(st, line) {
      var obj =
        lineyArr &&
        lineyArr.find(function (item) {
          return item.st == st && item.line == line;
        });
      if (!obj) {
        return 0;
      }
      return Number(obj.crdHei) + Number(obj.addHei);
    }
    // staff 设置五线谱表之间的距离
    function set_staff() {
      var s,
        i,
        st,
        prev_staff,
        v,
        y,
        staffsep,
        dy,
        maxsep,
        mbot,
        val,
        p_voice,
        p_staff;
      for (v = 0; v < voice_tb.length; v++) {
        p_voice = voice_tb[v];
        if (p_voice.scale != 1)
          p_voice.scale_str =
            'transform="scale(' + p_voice.scale.toFixed(2) + ')"';
      }
      for (st = 0; st <= nstaff; st++) {
        if (gene.st_print[st]) break;
      }
      y = 0;
      if (st > nstaff) {
        st--;
        p_staff = staff_tb[st];
      } else {
        p_staff = staff_tb[st];
        for (i = 0; i < YSTEP; i++) {
          val = p_staff.top[i];
          if (y < val) y = val;
        }
      }
      y += draw_partempo(st, y);

      if (!gene.st_print[st]) return y;
      y *= p_staff.staffscale;
      staffsep = cfmt.staffsep * 0.5 + p_staff.topbar * p_staff.staffscale;
      if (y < staffsep) y = staffsep;
      if (y < p_staff.ann_top) y = p_staff.ann_top;
      p_staff.y = -y;
      var spNumHeight = y;
      var spNumMarginBottom = 20;
      // 间线混排
      if (musicType == 1) {
        y +=
          sh(spNumMarginBottom + 24 + 20) +
          (isChordScore ? getLineybystAndline(st, self.line) : 0);
        // 大谱表
        if (nstaff > 0) {
          y += sh(10);
        }
      } else if (musicType == 2 && isChordScore) {
        // 大谱表的简谱加一点行间距,（原来是-10不够，往下调整2个单位）------去掉，不然行间距太大 2022-1-24 hxs
        y += getLineybystAndline(st, self.line) - 10; // 8
        if (nstaff > 0) {
          y += sh(15);
        }
      }
      prev_staff = st;
      var sy_staff_prev = cur_sy.staves[prev_staff];
      // 从第二个谱表开始
      for (st++; st <= nstaff; st++) {
        p_staff = staff_tb[st];
        if (!gene.st_print[st]) continue;
        if (sy_staff_prev) {
          staffsep = sy_staff_prev.sep || cfmt.sysstaffsep;
          maxsep = sy_staff_prev.maxsep || cfmt.maxsysstaffsep;
        } else {
          staffsep = cfmt.sysstaffsep;
          maxsep = cfmt.maxsysstaffsep;
        }
        //                staffsep = sy_staff_prev.sep || cfmt.sysstaffsep;//这里要做一下判断，否则在singleline模式下会报错
        //                maxsep = sy_staff_prev.maxsep || cfmt.maxsysstaffsep;//同上
        dy = 0;
        if (p_staff.staffscale == staff_tb[prev_staff].staffscale) {
          for (i = 0; i < YSTEP; i++) {
            val = p_staff.top[i] - staff_tb[prev_staff].bot[i];
            if (dy < val) dy = val;
          }
          dy *= p_staff.staffscale;
        } else {
          for (i = 0; i < YSTEP; i++) {
            val =
              p_staff.top[i] * p_staff.staffscale -
              staff_tb[prev_staff].bot[i] * staff_tb[prev_staff].staffscale;
            if (dy < val) dy = val;
          }
        }
        staffsep += p_staff.topbar * p_staff.staffscale;
        if (dy < staffsep) dy = staffsep;
        maxsep += p_staff.topbar * p_staff.staffscale;
        if (dy > maxsep) dy = maxsep;
        y += dy;
        p_staff.y = -y;
        //简线混排
        if (musicType == 2 && isChordScore) {
          y += getLineybystAndline(st, self.line);
        }
        // 间线混排
        if (musicType == 1 && getSplnumscore(source_val, st)) {
          y +=
            spNumHeight +
            sh(spNumMarginBottom) +
            (isChordScore ? getLineybystAndline(st, self.line) : 0);
        }
        prev_staff = st;
        sy_staff_prev = cur_sy.staves[prev_staff];
      }
      mbot = 0;
      for (i = 0; i < YSTEP; i++) {
        val = staff_tb[prev_staff].bot[i];
        if (mbot > val) mbot = val;
      }
      if (mbot > p_staff.ann_bot) mbot = p_staff.ann_bot;
      mbot *= staff_tb[prev_staff].staffscale;
      for (st = 0; st <= nstaff; st++) {
        p_staff = staff_tb[st];
        dy = p_staff.y;
        if (p_staff.staffscale != 1) {
          p_staff.scale_str =
            'transform="translate(0,' +
            (posy - dy).toFixed(1) +
            ") " +
            "scale(" +
            p_staff.staffscale.toFixed(2) +
            ')"';
        }
      }
      if (mbot == 0) {
        for (st = nstaff; st >= 0; st--) {
          if (gene.st_print[st]) break;
        }
        if (st < 0) return y;
      }
      dy = -mbot;
      staffsep = cfmt.staffsep * 0.5;
      if (dy < staffsep) dy = staffsep;
      maxsep = cfmt.maxstaffsep * 0.5;
      if (dy > maxsep) dy = maxsep;
      return y + dy;
    }
    function draw_systems(indent) {
      var s,
        s2,
        st,
        x,
        x2,
        res,
        staves_bar,
        bar_force,
        xstaff = [],
        bar_bot = [],
        bar_height = [];
      function bar_set() {
        var st,
          staffscale,
          top,
          bot,
          dy = 0;
        for (st = 0; st <= cur_sy.nstaff; st++) {
          if (xstaff[st] < 0) {
            bar_bot[st] = bar_height[st] = 0;
            continue;
          }
          staffscale = staff_tb[st].staffscale;
          top = staff_tb[st].topbar * staffscale;
          bot = staff_tb[st].botbar * staffscale;
          if (dy == 0) dy = staff_tb[st].y + top;
          bar_bot[st] = staff_tb[st].y + bot;
          bar_height[st] = dy - bar_bot[st];
          dy = cur_sy.staves[st].flags & STOP_BAR ? 0 : bar_bot[st];
        }
      }
      // 绘制五线
      function draw_staff(st, x1, x2) {
        var w,
          ws,
          i,
          dy,
          ty,
          y = 0,
          ln = "",
          stafflines = staff_tb[st].stafflines,
          l = stafflines.length;
        if (!/[\[|]/.test(stafflines)) return;
        w = x2 - x1;
        set_sscale(st);
        ws = w / stv_g.scale;
        if (cache && cache.st_l == stafflines && cache.st_ws == ws) {
          xygl(x1, staff_tb[st].y, "stdef" + cfmt.fullsvg);
          return;
        }

        for (i = 0; i < l; i++, y -= 6) {
          if (stafflines[i] == ".") continue;
          dy = 0;
          for (; i < l; i++, y -= 6, dy -= 6) {
            switch (stafflines[i]) {
              case ".":
              case "-":
                continue;
              case ty:
                ln += "m-" + ws.toFixed(2) + " " + dy + "h" + ws.toFixed(2);
                dy = 0;
                continue;
            }
            if (ty != undefined) ln += '"/>\n';
            ty = stafflines[i];
            ln += '<path class="stroke"';
            if (ty == "[") ln += ' stroke-width="1.5"';
            ln += ' d="m0 ' + y + "h" + ws.toFixed(2);
            dy = 0;
          }

          ln += '"/>\n';
        }
        var iniNotes = [
          "C,",
          "D,",
          "E,",
          "F,",
          "G,",
          "A,",
          "B,",
          "C",
          "D",
          "E",
          "F",
          "G",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "A",
          "B",
        ];
        var iniSeq = 7;
        var charAssessant =
          '<text class="f3 helpnote" x="0" y="12" st="' +
          st +
          '" style="display:none;">';
        var ncount = 0;
        for (var i = 0; i < 8; i++) {
          charAssessant +=
            '<tspan style="font-size:8px;" dx="-2" dy="-3">' +
            iniNotes[iniSeq++] +
            "</tspan>\n";
          charAssessant +=
            '<tspan style="font-size:8px;" dx="-2" dy="-3">' +
            iniNotes[iniSeq++] +
            "</tspan>\n";
        }
        iniSeq = 9;
        charAssessant += "</text>";
        ln += charAssessant;
        y = staff_tb[st].y;
        if (!cache && w == get_lwidth()) {
          cache = {
            st_l: stafflines,
            st_ws: ws,
          };
          i = "stdef" + cfmt.fullsvg;
          glyphs[i] = '<g id="' + i + '">\n' + ln + "</g>";
          xygl(x1, y, i);
          return;
        }
        out_XYAB(
          '<g type="staff" st="' +
            st +
            '" transform="translate(X, Y)">\n' +
            ln +
            "</g>\n",
          x1,
          y,
          null,
          null,
          null,
          true
        );
      }
      draw_vname(indent);
      for (st = 0; st <= nstaff; st++)
        xstaff[st] = !cur_sy.st_print[st] ? -1 : 0;
      bar_set();
      draw_lstaff(0);
      for (s = tsfirst; s; s = s.ts_next) {
        if (bar_force && s.time != bar_force) {
          bar_force = 0;
          for (st = 0; st <= nstaff; st++) {
            if (!cur_sy.st_print[st]) xstaff[st] = -1;
          }
          bar_set();
        }
        switch (s.type) {
          case C.STAVES:
            staves_bar = 0;
            for (s2 = s.ts_next; s2; s2 = s2.ts_next) {
              if (s2.time != s.time) break;
              switch (s2.type) {
                case C.BAR:
                case C.CLEF:
                case C.KEY:
                case C.METER:
                  staves_bar = s2.x;
                  continue;
              }
              break;
            }
            if (!s2) staves_bar = realwidth;
            cur_sy = s.sy;
            for (st = 0; st <= nstaff; st++) {
              x = xstaff[st];
              if (x < 0) {
                if (cur_sy.st_print[st])
                  xstaff[st] = s.ts_next.type == C.BAR ? s.x : s.x - s.wl - 2;
                continue;
              }
              if (cur_sy.st_print[st]) continue;
              if (staves_bar) {
                x2 = staves_bar;
                bar_force = s.time;
              } else {
                x2 = s.x - s.wl - 2;
                xstaff[st] = -1;
              }
              draw_staff(st, x, x2);
            }
            bar_set();
            continue;
          case C.BAR:
            st = s.st;
            if (s.second || s.invis) break;
            if (xstaff[st] < 0) {
              for (s2 = s.ts_next; s2 && s2.time == s.time; s2 = s2.ts_next) {
                if (s2.type == C.STAVES) break;
              }
              if (!s2 || s2.type != C.STAVES) break;
              xstaff[st] = s.x;
              bar_set();
            }
            draw_bar(s, bar_bot[st], bar_height[st]);
            break;
          case C.STBRK:
            if (cur_sy.voices[s.v].range == 0) {
              if (s.xmx > 14) {
                var nv = 0;
                for (var i = 0; i < voice_tb.length; i++) {
                  if (cur_sy.voices[i].range > 0) nv++;
                }
                for (s2 = s.ts_next; s2; s2 = s2.ts_next) {
                  if (s2.type != C.STBRK) break;
                  nv--;
                }
                if (nv == 0) draw_lstaff(s.x);
              }
            }
            s2 = s.prev;
            if (!s2) break;
            x2 = s2.x;
            if (s2.type != C.BAR) x2 += s2.wr;
            st = s.st;
            x = xstaff[st];
            if (x >= 0) {
              if (x >= x2) continue;
              draw_staff(st, x, x2);
            }
            xstaff[st] = s.x;
            break;
        }
      }
      for (st = 0; st <= nstaff; st++) {
        if (bar_force && !cur_sy.st_print[st]) continue;
        x = xstaff[st];
        if (x < 0 || x >= realwidth) continue;
        draw_staff(st, x, realwidth);
      }
    }
    // 画出abc语法出现的关键词
    function draw_symbols(p_voice) {
      var bm = {},
        s,
        g,
        x,
        y,
        st;
      for (s = p_voice.sym; s; s = s.next) {
        if (s.invis) {
          switch (s.type) {
            case C.KEY:
              p_voice.key = s;
            default:
              continue;
            case C.NOTE:
              break;
          }
        }
        st = s.st;
        x = s.x;
        set_color(s.color);
        // 判断是否是扩展音符
        var s_str = source_val.substring(s.istart, s.iend);
        //	            s_str = s_str.replaceAll("/","").replaceAll(",","").replaceAll("'","").replace(/[\d]/g,"");
        s_str = s_str.replaceAll(/[,'/\d]/g, "");
        if (isExtendChar(s_str)) {
          s.is_ext = true; //新增扩展音符标记 add by hxs
        }
        if (isExtend2Char(s_str)) {
          s.is_ext2 = true; //新增扩展音符标记 add by hxs
        }
        switch (s.type) {
          case C.NOTE:
            set_scale(s);
            if (s.beam_st && !s.beam_end) {
              if (self.calculate_beam(bm, s)) draw_beams(bm);
            }
            if (!s.invis) {
              anno_start(s);
              draw_note(s, !bm.s2);
              anno_stop(s);
            }
            if (s == bm.s2) bm.s2 = null;
            break;
          case C.REST:
            if (s.invis || !staff_tb[st].topbar) break;
            draw_rest(s);
            break;
          case C.BAR:
            break;
          case C.CLEF:
            if (s.time >= staff_tb[st].clef.time) staff_tb[st].clef = s;
            if (s.second || s.invis || !staff_tb[st].topbar) break;
            set_color();
            set_sscale(st);
            anno_start(s);
            y = staff_tb[st].y;
            if (s.clef_name)
              xygl(x, y + s.y, s.clef_name, null, s); //增加了后面2个参数
            else if (!s.clef_small)
              xygl(x, y + s.y, s.clef_type + "clef", null, s);
            //增加了后面2个参数
            else xygl(x, y + s.y, "s" + s.clef_type + "clef", null, s); //增加了后面2个参数
            if (s.clef_octave) {
              if (s.clef_octave > 0) {
                y += s.ymx - 10;
                if (s.clef_small) y -= 1;
              } else {
                //	                            y += s.ymn + 12
                y += s.ymn; //8和高音谱号靠太近 update by hxs
                if (s.clef_small) y += 1;
              }
              xygl(x - 2, y, "oct");
            }
            anno_stop(s);
            break;
          case C.METER:
            p_voice.meter = s;
            if (s.second || !staff_tb[s.st].topbar) break;
            set_color();
            set_sscale(s.st);
            anno_start(s);
            draw_meter(x, s);
            anno_stop(s);
            break;
          case C.KEY:
            p_voice.key = s;
            if (s.second || s.invis || !staff_tb[s.st].topbar) break;
            set_color();
            set_sscale(s.st);
            anno_start(s);
            draw_keysig(x, s);
            anno_stop(s);
            break;
          case C.MREST:
            set_scale(s);
            x += 32;
            anno_start(s);
            xygl(x, staff_tb[s.st].y + 12, "mrest");
            out_XYAB(
              '<text style="font:bold 15px serif"\n\
	 x ="X" y="Y" text-anchor="middle">A</text>\n',
              x,
              staff_tb[s.st].y + 28,
              s.nmes
            );
            anno_stop(s);
            break;
          case C.GRACE:
            set_scale(s);
            draw_gracenotes(s);
            break;
          case C.SPACE:
          case C.STBRK:
            break;
          case C.CUSTOS:
            set_scale(s);
            draw_note(s, 0);
            break;
          case C.BLOCK:
          case C.PART:
          case C.REMARK:
          case C.STAVES:
          case C.TEMPO:
            break;
          default:
            //	                    error(2, s, "draw_symbols - Cannot draw symbol " + s.type)
            error(2, s, "无法渲染标记 " + s.type);
            break;
        }
      }
      set_scale(p_voice.sym);
      draw_all_ties(p_voice);
      set_color();
    }

    // 画出所有的音符
    function draw_all_sym() {
      var p_voice,
        v,
        n = voice_tb.length;
      for (v = 0; v < n; v++) {
        p_voice = voice_tb[v];
        if (p_voice.sym && p_voice.sym.x != undefined) draw_symbols(p_voice);
      }
      draw_all_deco();
      glout();
      set_sscale(-1);
    }
    function set_tie_dir(s) {
      var i, ntie, dir, sec, pit, ty;
      for (; s; s = s.next) {
        if (!s.tie_s) continue;
        if (s.multi != 0) {
          dir = s.multi > 0 ? C.SL_ABOVE : C.SL_BELOW;
          for (i = 0; i <= s.nhd; i++) {
            ty = s.notes[i].tie_ty;
            if (!((ty & 0x07) == C.SL_AUTO)) continue;
            s.notes[i].tie_ty = (ty & C.SL_DOTTED) | dir;
          }
          continue;
        }
        sec = ntie = 0;
        pit = 128;
        for (i = 0; i <= s.nhd; i++) {
          if (s.notes[i].tie_ty) {
            ntie++;
            if (pit < 128 && s.notes[i].pit <= pit + 1) sec++;
            pit = s.notes[i].pit;
          }
        }
        if (ntie <= 1) {
          dir = s.stem < 0 ? C.SL_ABOVE : C.SL_BELOW;
          for (i = 0; i <= s.nhd; i++) {
            ty = s.notes[i].tie_ty;
            if (ty) {
              if ((ty & 0x07) == C.SL_AUTO)
                s.notes[i].tie_ty = (ty & C.SL_DOTTED) | dir;
              break;
            }
          }
          continue;
        }
        if (sec == 0) {
          if (ntie & 1) {
            ntie = (ntie - 1) / 2;
            dir = C.SL_BELOW;
            for (i = 0; i <= s.nhd; i++) {
              ty = s.notes[i].tie_ty;
              if (!ty) continue;
              if (ntie == 0) {
                if (s.notes[i].pit >= 22) dir = C.SL_ABOVE;
              }
              if ((ty & 0x07) == C.SL_AUTO)
                s.notes[i].tie_ty = (ty & C.SL_DOTTED) | dir;
              if (ntie-- == 0) dir = C.SL_ABOVE;
            }
            continue;
          }
          ntie /= 2;
          dir = C.SL_BELOW;
          for (i = 0; i <= s.nhd; i++) {
            ty = s.notes[i].tie_ty;
            if (!ty) continue;
            if ((ty & 0x07) == C.SL_AUTO)
              s.notes[i].tie_ty = (ty & C.SL_DOTTED) | dir;
            if (--ntie == 0) dir = C.SL_ABOVE;
          }
          continue;
        }
        pit = 128;
        for (i = 0; i <= s.nhd; i++) {
          if (s.notes[i].tie_ty) {
            if (pit < 128 && s.notes[i].pit <= pit + 1) {
              ntie = i;
              break;
            }
            pit = s.notes[i].pit;
          }
        }
        dir = C.SL_BELOW;
        for (i = 0; i <= s.nhd; i++) {
          ty = s.notes[i].tie_ty;
          if (!ty) continue;
          if (ntie == i) dir = C.SL_ABOVE;
          if ((ty & 0x07) == C.SL_AUTO)
            s.notes[i].tie_ty = (ty & C.SL_DOTTED) | dir;
        }
      }
    }
    function set_tie_room() {
      var p_voice, s, s2, v, dx, y, dy;
      for (v = 0; v < voice_tb.length; v++) {
        p_voice = voice_tb[v];
        s = p_voice.sym;
        if (!s) continue;
        s = s.next;
        if (!s) continue;
        set_tie_dir(s);
        for (; s; s = s.next) {
          if (!s.ti1) continue;
          if (s.notes[0].pit < 20 && (s.notes[0].ti1 & 7) == C.SL_BELOW);
          else if (
            s.notes[s.nhd].pit > 24 &&
            (s.notes[s.nhd].ti1 & 7) == C.SL_ABOVE
          );
          else continue;
          s2 = s.next;
          while (s2 && s2.type != C.NOTE) s2 = s2.next;
          if (s2) {
            if (s2.st != s.st) continue;
            dx = s2.x - s.x - 10;
          } else {
            dx = realwidth - s.x - 10;
          }
          if (dx < 100) dy = 9;
          else if (dx < 300) dy = 12;
          else dy = 16;
          if (s.notes[s.nhd].pit > 24) {
            y = 3 * (s.notes[s.nhd].pit - 18) + dy;
            if (s.ymx < y) s.ymx = y;
            if (s2 && s2.ymx < y) s2.ymx = y;
            y_set(s.st, true, s.x + 5, dx, y);
          }
          if (s.notes[0].pit < 20) {
            y = 3 * (s.notes[0].pit - 18) - dy;
            if (s.ymn > y) s.ymn = y;
            if (s2 && s2.ymn > y) s2.ymn = y;
            y_set(s.st, false, s.x + 5, dx, y);
          }
        }
      }
    }
    var musicfont =
      'url("data:application/octet-stream;base64,\
        	AAEAAAAOAIAAAwBgRkZUTYTd79wAAFggAAAAHEdERUYAFQAUAABYBAAAABxPUy8yWLxdCwAAAWgA\
        	AABWY21hcFxKS5kAAAQIAAADemN2dCAAIgKIAAAHhAAAAARnYXNw//8AAwAAV/wAAAAIZ2x5Zp27\
        	6QgAAAiwAABGeGhlYWQPFh8MAAAA7AAAADZoaGVhCWn/GwAAASQAAAAkaG10eNzF+scAAAHAAAAC\
        	SGxvY2GpopfcAAAHiAAAASZtYXhwANkBPQAAAUgAAAAgbmFtZbni4sIAAE8oAAADG3Bvc3Qtfw6A\
        	AABSRAAABbUAAQAAAAEAAI87udRfDzz1AAsEAAAAAADRlyIXAAAAANncuoH/OPzvBUsEiAAAAAgA\
        	AgAAAAAAAAABAAAEiPzvAFwEJf84/XQFSwABAAAAAAAAAAAAAAAAAAAAkgABAAAAkgEMAAUAAAAA\
        	AAIAAAABAAEAAABAAC4AAAAAAAEBhgGQAAUACAKZAswAAACPApkCzAAAAesAMwEJAAACAAUDAAAA\
        	AAAAAAAAARAAAAAAAAAAAAAAAFBmRWQAQAAA7LcDM/8zAFwEiAMRAAAAAQAAAAAAAAF2ACIAAAAA\
        	AVUAAAGQAAACWAAAAFcAAAFK/7ACE/+wANL/sAAjAAAAIwAAACMAAABkAAAEIwAABCUAAAHg/9wD\
        	XgB6AwsAAALSAAACv/+6AdYAAAMLAAADDgAAAyf/yADIAAABrgAAASIAAAGQAAABfAAAAZAAAAGQ\
        	AAABgQAAAZAAAAGQAAABgQAAAZkACQGYAAkB9AAAAQQAFAEEAAoCawAkAhIAAAHCAAABSQAAAUAA\
        	AAFK//4BLAAAAjAAAAFKAAABSgAAAGQAAAFAAAABQAAAAUAAAAFAAAAAZAAAATYAAADmAAABNgAA\
        	ATsAAAE7AAABOwAAATsAAAE7AAABOwAAATsAAAE7AAABOwAAATsAAAENAAAAyAAAAP8AAAELABQB\
        	bgAAAQ0AMgFu//UAqQAAAToAAAFA//0AUAAAAUAAAABkAAABGAAAAlgAAAC2AAAAggAAAIIAAAEs\
        	AAABLAAAAO4AAAD/AAABSQAAAY8AAAHYAAAB2AAAA1MAAAIz//ADIP/hAXv/tAG4/9sBFv9+ARP/\
        	2wDcAAAA6P/kAr//tAIz/7QCv/+0Ayv/2wFf/9sCaf9+AV//fgJp/34BXwAAAf0ABQG1AAABtQAA\
        	AkQADQJEAA0BGAAAATYAAAEs//8BLAAAAPoAAADIAAABGP84APoAAADIAAAEDQAAAhwADAH0AAAB\
        	9AAAAfQAAAH0AAAB9AAAAfQAAAB4AAAALQAAAhwAAAD6AAAA+v/oAcIAAAFIAAABQAAAAgoAAAIK\
        	AAAAZAAAAAAAAwAAAAMAAAAcAAEAAAAAAnQAAwABAAAAHAAEAlgAAACSAIAABgASAAAAIOAA4CTg\
        	MOA54EPgSOBQ4FzgYuBp4H3gjOCV4KTgqeCz4QHhueG74efh8uH04ffh+eH84gDiSeJk4oPkoOSi\
        	5KTkqOSs5MDkzuTq5O7lAeUl5S3lMeU55WflaeVt5YLl0OXi5hDmEuYU5hjmJOYw5lDmVekS6RXp\
        	GOkg6SXpXeoC6qTso+yl7Kfsqey3//8AAAAAACDgAOAi4DDgOOBD4EXgUOBc4GLgaeB64IDglOCg\
        	4Kngs+EB4bnhu+Hn4fLh9OH34fnh/OH+4kDiYOKA5KDkouSk5KjkrOTA5M7k4eTu5QDlIOUp5S/l\
        	OeVm5WnlbOWC5dDl4uYQ5hLmFOYY5iTmMOZQ5lXpEOkU6RjpIOkl6V3qAuqk7KLspeyn7Knst///\
        	AAP/5CAFH+Qf2R/SH8kfyB/BH7YfsR+rH5sfmR+SH4gfhB97Hy4edx52HkseQR5AHj4ePR47Hjod\
        	+x3lHcobrhutG6wbqRumG5Mbhht0G3EbYBtCGz8bPhs3GwsbChsIGvQapxqWGmkaaBpnGmQaWRpO\
        	Gi8aKxdxF3AXbhdnF2MXLBaIFecT6hPpE+gT5xPaAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
        	AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
        	AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
        	AAAAAAAAAAAAAQYAAAMAAAAAAAAAAQIAAAACAAAAAAAAAAAAAAAAAAAAAQAABAAAAAAAAAAAAAAA\
        	AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
        	AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
        	AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
        	AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiAogAAAAqACoAKgA2\
        	AD4AbgB8AIoAmACkALAAvgDcAVABrAIcAl4C6gN8A9wD8ASMBR4FdgW0BdYF6gY8BowGrAbyBzIH\
        	bAe4B/gIPgiYCKwI0gj4CSoJRgloCZQJqgnECfoKCAoUCiAKMgpOCnAKfgqSCqQKtAsACxALKgtE\
        	C3wLtAwCDE4MtA0WDZQODA4yDkwOfA6mDv4PJA9+D54P3BAEEBgQJBAyEEIQahCQEJwQqBC0EMAQ\
        	4hEIET4RjBHsEmASdhKcEsoTHhOSE+YUJhRqFMAWGhcmF+AYoBlwGgwa6hwGHQgdSh2OHdgd8h4W\
        	HioePh5uHn4ekB6sHsIe5h8WH/ggtCDcIPohLCFqIZwh3iHwIf4iGiI0IloifCKqIsQi7iMqIzwA\
        	AAACACIAAAEyAqoAAwAHAC6xAQAvPLIHBADtMrEGBdw8sgMCAO0yALEDAC88sgUEAO0ysgcGAfw8\
        	sgECAO0yMxEhESczESMiARDuzMwCqv1WIgJmAAABAAAAAAGRAZAAAwAAMREhEQGRAZD+cAABAAAA\
        	AAAAAAAAAAAAMQAAAQAAAAAAVwQDACAAABE1NjU0JyY1NDcGFRQXFhUUBxYVFAcGFRQXJjU0NzY1\
        	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\
        	AjU0JjUOAycyPgI1NCY1DgMnMj4CNTQmNQ4DHhxVVz0FHhMSEhISEhwuODszJwYdVVc9ARVWTUQJ\
        	HVVXPQEVVk1ECR1VVz0BFVZNRP6OAqwpSHdEIRk5NispKywtJyssLScrLCVIPTo3MzkbqilJeEQD\
        	DQQpXUNUhilJeEQDDQQpXUNUhilJeEQDDQQpXUNUAAAABQAA/VUBPAISACQAMgBAAE4AXAAAGQEz\
        	HgYVFAcWFRQHFhUUBxYVFAcWFRQHNjU0LgMjNR4DFzQ2NTQuAyceAxc0NjU0LgMnHgMXNDY1NC4D\
        	Jx4DFzQ2NTQuAx4GJzM7OC4cEhISEhISEhMeBSk+SEAWCURNVhUBKT5IQRYJRE1WFQEpPkhBFglE\
        	TVYVASk+SEEWCURNVhUBKT5IQf67A1cbOTM3Oj1IJSwrJy0sKyctLCsnLSwrKSs2ORkhN2RFNBir\
        	JFRDXSkDDQQ3ZUUzGaskVENdKQQMBDdlRTMZqyRUQ10pAw4DN2VFMxmrJFRDXSkEDAQ3ZUUzGQAA\
        	BQAA/bwBPAJ5ACMAMAA9AEoAVwAAGQEzMj4CNTQnFhUUBxYVFAcWFRQHFhUUBxYVFA4FBzUyPgI1\
        	NCY1DgMnMj4CNTQmNQ4DJzI+AjU0JjUOAycyPgI1NCY1DgMeHFVXPQUeExISEhISEhIcLjg7MycG\
        	HVVXPQEVVk1ECR1VVz0BFVZNRAkdVVc9ARVWTUQJHVVXPQEVVk1E/bwDVylId0QhGTk2KykrLC0n\
        	KywtJyssLScrLCVIPTo3MzkbqilJeEQDDQQpXUNUhilJeEQDDQQpXUNUhilJeEQDDQQpXUNUhilJ\
        	eEQDDQQpXUNUAAAAAgAA/2QA4QGwAAoAFgAANyIGHQE2NzY1NCY3MhYVFAcGIxEzETZnFCsiJisd\
        	ByM5S1JEKCN6JhO5Dzg7LxsmJjIjSUxSAkz+vDQAAAIAAP6GAMUBegADAAwAABc3NQcRFTcRIzUH\
        	ETcckJCpGawBZS2WLQFJ6DT9wOIzAkMBAAACAAD+mAD/AWgAAwAfAAA3FTc1AyM1BzU3NQc1NzUz\
        	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\
        	GR0bIssJBCkoHyAeGR0bTQIC/G4MASQMKCggIB8ZHRsiAAAAAAEAAP0MAdoBwABFAAATBiMiJjU0\
        	NjMyFhUUBzI/AQYjIiY1NDYzMhYVFAcyPwEGIyImNTQ2MzIWFRQHMj8BIg4BIyImNTQ2MhYVFAcy\
        	NzYyFwEnqyghKzcnGxwpF0ELOighKzcnGxwpF0ELOigfKzcnGxwpFz8LOgEgHBMrNyY4KRdILgIV\
        	A/6pLf48DCgoICAfGR0bIsoMKCggIB8ZHRsiygwoKCAgHxkdGyLLCQQpKB8gHhkdG00CAvtuDAAA\
        	AAEAAP0MAhkCrgBWAAAlBiMiJjU0NjMyFhUUBzI/AQYjIiY1NDYzMhYVFAcyPwEiDgEjIiY1NDYz\
        	MhYVFAcyNzYyFwEnEwYjIiY1NDYzMhYVFAcyPwEGIyImNTQ2MzIWFRQHMjcBPyghKzcnGxwpF0EL\
        	NigfKzcnGxwpFz8LNAEgHBMrNycbHCkXSC4BFgP+ai1VKCErNycbHCkXQQs6KCErNycbHCkXQQs0\
        	DCgoICAfGR0bIsQMKCggIB8ZHRsixwkEKSgfIB4ZHRtNAgL6gAwBJAwoKCAgHxkdGyLIDCgoICAf\
        	GR0bIgABAAD/GgNSAOYACwAANTMVITUzESM1IRUjGQMgGRn84BnmfX3+NH19AAAAAAP/8P8GAiYA\
        	+gAHAA8AEwAANiImNDYyFhQAIiY0NjIWFAUBMwFQMiMjMiMBiDIjIzIj/dIBuH7+R0sjMiMjMv7P\
        	IzIjIzJaAfT+DAAE/+H/BgMHAPoABwAPABMAFwAANiImNDYyFhQAIiY0NjIWFAUBMwEzATMBQTIj\
        	IzIjAncyIyMyI/zjAbh7/kd5Abh7/kdLIzIjIzL+zyMyIyMyWgH0/gwB9P4MAAL/tP+IAXwBGAAR\
        	ADsAADcWMzI2NzY1NCcmIyIGBwYVFBciJwczMhQrASI0OwETNjU0IyIOAwcGJjc2NzYzMhYXPgEz\
        	MhYVFAbFAgUSMg4NDwIEEjULDycqGS00CwvhCwtLaAYLCAwPCxkKBRsFMQ8YJCMkBx0mIx4tWSgB\
        	NSQgJiUFATMcJyQpLiB6Hh4BHRIMDwcUEiwQCA8JWBAZExoeDzQwSWsAAAH/2//2Ab4BGABTAAA3\
        	BgcGKwEiPwE2JiMiBgcGJjc+AzMyFzYzMhc+ATMyFhUUDwEGFRQzMjc+BTc2FgcOAiMiJjU0PwE2\
        	NTQjIg8BBgcnBiY/ATY1NCMiB1AHCAQENQ0NQgQGCA0WJAUVBBQQIh8SNwskJC0JCykTGSQFLwQI\
        	AQQFCwcMAw0BBhUGEhctHxUZBTQBFRsIQQgPJg0IBEMBFRsIFREDARqnDQ8aOQgMCSUaMBIoKCgQ\
        	GCMaCw99CwkOAgMJBg8FEgEJDQsfHxoWEw0NiAIEDhSrFgEBAQ8IqwIEDhQAAAAB/37/YAFeAbgA\
        	QQAAByImNTQ2MzIWFRQHBhUUMzI+BzcjIjU0OwE+ATMyFhUUBiMiJjU0NzY0IyIOBwczMhQrAQ4B\
        	MiAwFxMSFxIKGQsQDwsNCg4NFAo1ExFBFGk0IDAXExIXEgoZBwwKBwgFBgMGATYTEz8hdqAmIBoi\
        	FA8OCwcNDgYREyUkPDdVJxUTS18mIBoiFA8OCwYcBQsKFA0aDR4GKMXBAAAB/9sAAAETARMAKgAA\
        	Nz4BJiMiBg8BBgcGKwEiPwE2JiMiBgcGJjc+ATMyFhc2MzIWFRQjIiY1NNAFAwMFFCQJPwcIBAQ1\
        	DQ1CBAYIDhciBRUEITgiGx0EHyQaICsPG+cDBwQsGJwRAwEaow0PGjUIDAk8QBoNJx4ZNxYNFAAA\
        	AAEAAAAAANwBGAAxAAAzIiY1NDYyFhUUBxYzMjY1NC4CJyY1NDYzMhYVFAYjIiY1NDcmIyIGFRQe\
        	AhcWFRRQHjIVGhcQDBMWIQkLGAY6Ny0iNhYQDRYHDxEPGRESHgUwKxsQFhAMEhAQFhILDwcNBCUw\
        	IygkGBAYFA4DDhMRDQkTDBEDICtVAAAB/+T//ADnAQ8APAAAJwYuAT8BIgYjIiYOAQcGJyY3PgE3\
        	HgEzMjYzMhcWFA8BBhUUMzI2MzIXFjc2JyI1NDYzMhUUBisBLgEjIgoGCwEFsAUfDAMUDB8FDwQD\
        	CAwLAQ4vFSIrBAgFCweeAgIBDQYaIw0IBQckEg0mKB4dGCUIDgMECA0GwQYGAjIFDQsJEh4wAgEG\
        	CwEBEQenBgIDAxoKDg0DHQ4VNx4vAxgABf+0/4gFSwEYABsANQDZAPABCwAAJRYzMj4BNz4GNTQm\
        	JyYjIgYHDgIVFAUWMzI2Nz4FNTQmJyYjIgYHBhUUHgEXIicHMzIUKwEiNDsBEz4CNTQuAiMiDgMH\
        	BiY3Njc2MzIWFz4BMzIXPgEzMhYXPgEzMhc+ATMyFhc+ATMyFz4BMzIWFz4BMzIWFRQGIyInBzMy\
        	FCsBIjQ7ARM+AjU0JiMiBgcVFAYjIicHMzIUKwEiNDsBEz4CNTQmIyIGBxUUBiMiJwczMhQrASI0\
        	OwETND4DNDU0JiMiBgcVFAYlFjMyNjc+BDU0JicmIyIGBwYVFAUWMzI2Nz4GNTQmJyYjIg4BBwYV\
        	FBYCCgMEDB8eCQIDAgICAQEHCAMDEzQLBQcD/ssDBBIyDgIDAwMBAQcIAwMTNAsPBAcIFhktNAsL\
        	4QsLS2gBAwIBAgUDCAwPCxkKBRsFMQ8YJCMkBx0mIy8TEiIbIyQHHSYjLxMSIhsjJAcdJiMvExIi\
        	GyMkBx0mIx4ta0kWGS00CwvhCwtLaAEDAgUGDhQUa0kWGS00CwvhCwtLaAEDAgUGDhQUa0kWGS00\
        	CwvhCwtLaAECAQIFBg4UFGsDgwMEEjIOAgQDAwEHCAMDEzQLD/7LAwQSMg4CAwICAgEBBwgDAwwh\
        	HgcPCSgBGCoXBAoJCwoKCwUQFwMBMxwNGxgLKAcBNSQFCwwMDAwGEBcDATMcJiUMFA0qIHoeHgEd\
        	AggOBgMFBQIHFBIsEAgPCVgQGRMaHg8yHBYTGh4PMhwWExoeDzIcFhMaHg80MEdtIHoeHgEdAggO\
        	BgcIGCMBR20geh4eAR0CCA4GBwgYIwFHbSB6Hh4BHQEDBQUGBwMHCBgjAUdtKAE1JAYNDw4PBxAX\
        	AwEzHCYlKAcBNSQECgkLCgoLBRAXAwEYJRImJRIaAAAE/7T/iAQGARgAfQCYALQAzgAAISInBzMy\
        	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\
        	AQkNCx8fGhUUBg0HiAYOFKsWAQEBDwirAwMGCBT+nyYgGiIUDw4LBw0OBhETJSQ8N1UnDAkIC0tf\
        	JiAaIhQPDgsGHAULChQNGg0eBgwIBQkGxcEAAAAAAf9+/2ACaQG4AHsAACUjDgEjIiY1NDYzMhYV\
        	FAcGFRQzMj4HNyMiJjU0PgM7AT4BMzIWFRQGIyImNTQ3NjQjIgcGBxc+ATMyFhUUBiMiJjU0NzY0\
        	IyIOBwczMhYUBisBDgEjIiY1NDYzMhYVFAcGFRQzMj4HAV+bIXZfIDAXExIXEgoZCxAPCw0KDg0U\
        	CjUJCgEDBAYDQRRpNCAwFxMSFxIKGSYXAwGbFGk0IDAXExIXEgoZBwwKBwgFBgMGATYJCwsJPyF2\
        	XyAwFxMSFxIKGQsQDwsNCg8NFObFwSYgGiIUDw4LBw0OBhETJSQ8N1UnDAkDBQUEAktfJiAaIhQP\
        	DgsGHHMMBgFLXyYgGiIUDw4LBhwFCwoUDRoNHgYMEAzFwSYgGiIUDw4LBw0OBhETJSQ8N1UAAAAA\
        	Af9+/2ADdAG4ALMAABMzPgEzMhYVFAYjIiY1NDc2NCMiBwYHFz4BMzIWFRQGIyImNTQ3NjQjIg4H\
        	BzMyFhUUDgErAQ4BIyImNTQ2MzIWFRQHBhUUMzI+BzcjDgEjIiY1NDYzMhYVFAcGFRQzMj4HNyMO\
        	ASMiJjU0NjMyFhUUBwYVFDMyPgc3IyImNTQ+AzsBPgEzMhYVFAYjIiY1NDc2NCMiDgIHBsycFGk0\
        	IDAXExIXEgoZJhcDAZsUaTQgMBcTEhcSChkHDAoHCAUGAwYBNgkKBAkGPyF2XyAwFxMSFxIKGQsQ\
        	DwsNCg8NFAqbIXZfIDAXExIXEgoZCxAPCw0KDg0VCpshdl8gMBcTEhcSChkLEA8LDQoODRQKNQkK\
        	AQMEBgNBFGk0IDAXExIXEgoZDhUOCAYCAQ5LXyYgGiIUDw4LBhxzDAYBS18mIBoiFA8OCwYcBQsK\
        	FA0aDR4GDAgFCQbFwSYgGiIUDw4LBw0OBhETJSQ8N1UnxcEmIBoiFA8OCwcNDgYREyUkOzhVJ8XB\
        	JiAaIhQPDgsHDQ4GERMlJDw3VScMCQMFBQQCS18mIBoiFA8OCwYcEyciGwoAAf9+/2AEgAG4AOcA\
        	AAEXPgEzMhYVFAYjIiY1NDc2NCMiBwYHFz4BMzIWFRQGIyImNTQ3NjQjIg4HBzMyFhQGKwEOASMi\
        	JjU0NjMyFhUUBwYVFDMyPgc3Iw4BIyImNTQ2MzIWFRQHBhUUMzI+BzcjDgEjIiY1NDYzMhYVFAcG\
        	FRQzMj4HNyMOASMiJjU0NjMyFhUUBwYVFDMyPgc3IyImNTQ+AzsBPgEzMhYVFAYjIiY1NDc2NCMi\
        	BwYHFz4BMzIWFRQGIyImNTQ3NjQjIg4HAdicFGk0IDAXExIXEgoZJhcDAZsUaTQgMBcTEhcSChkH\
        	DAoHCAUGAwYBNgkKCgk/IXZfIDAXExIXEgoZCxAPCw0KDw0UCpshdl8gMBcTEhcSChkLEA8LDQoO\
        	DRQKmyF2XyAwFxMSFxIKGQsQDwsNCg8NFAqbIXZfIDAXExIXEgoZCxAPCw0KDg0UCjUJCgEDBAYD\
        	QRRpNCAwFxMSFxIKGSYXAwGbFGk0IDAXExIXEgoZBwwKBwgFBgMGAQ8BS18mIBoiFA8OCwYccwwG\
        	AUtfJiAaIhQPDgsGHAULChQNGg0eBgwQDMXBJiAaIhQPDgsHDQ4GERMlJDw3VSfFwSYgGiIUDw4L\
        	Bw0OBhETJSM8N1YnxcEmIBoiFA8OCwcNDgYREyUkPDdVJ8XBJiAaIhQPDgsHDQ4GERMlJDw3VScM\
        	CQMFBQQCS18mIBoiFA8OCwYccwwGAUtfJiAaIhQPDgsGHAUKCxMOGQ4dAAMAAP9gAt8BuAA3AHsA\
        	xQAAMyImNTQ2MzIWFRQHFjMyNjU0LgMnLgI1NDYzMhYVFAYjIi4BNTQ3JiMiBhUUHgIXHgEVFCUG\
        	LgE/AS4CIyIGIyIOAQcGJyY3PgE3HgEzMjYzMhYXFhQPAQ4BFRQeARcWPgEnLgE1NDYzMhUUBwYj\
        	IiMuAiMiBgUiJjU0NjMyFhUUBw4BHgEVFBYyPgc3IyIuATU0NjsBPgEzMhYVFAYjIiY1NDc2NCMi\
        	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\
        	KwoJF2ErCQJu/W5DZ0MeHUNnLQAAAAABAAD/eQFAAqgADQAAATMRFAYjIiY1NDYzMhcBIh55WTI8\
        	elgxHwKo/YBGaTgnRWocAAAAAQAA/3kCCgKoABoAAAERFAYjIiY1NDYzMhcRNTMeBBUUBzY1NAFA\
        	eVkyPHpYMR8eBi45OCUyEgG5/m9GaTgnRWocAU7vNVxHTnVJSHJBSe8AAAAAAgAA/3kCCwKoAB8A\
        	KAAAJTURMx4EFRQHFhUUBzY1NCYjERQGIyImNTQ2MzITHgEXNDY1NCYBIh4JMDg2IxUWIgV2OHlZ\
        	Mjx6WDE9DoUbAXZr5gFXJEc7QlgzJTIwJC5BGSFfnv7WRmk4J0VqAXY7ojUDDgNfnwAAAQAA/84A\
        	ZAAyAAcAABYiJjQ2MhYURyodHSodMh0qHR0qAAAAAAAOAK4AAQAAAAAAAACDAQgAAQAAAAAAAQAH\
        	AZwAAQAAAAAAAgAHAbQAAQAAAAAAAwAgAf4AAQAAAAAABAAHAi8AAQAAAAAABQAJAksAAQAAAAAA\
        	BgAHAmUAAwABBAkAAAEGAAAAAwABBAkAAQAOAYwAAwABBAkAAgAOAaQAAwABBAkAAwBAAbwAAwAB\
        	BAkABAAOAh8AAwABBAkABQASAjcAAwABBAkABgAOAlUAQwBvAHAAeQByAGkAZwBoAHQAIABcADIA\
        	NQAxACAAMgAwADEAOAAtADIAMAAxADkAIABKAGUAYQBuAC0ARgByAGEAbgBjAG8AaQBzACAATQBv\
        	AGkAbgBlAC4AIABUAGgAaQBzACAAZgBvAG4AdAAgAGkAcwAgAGwAaQBjAGUAbgBzAGUAZAAgAHUA\
        	bgBkAGUAcgAgAHQAaABlACAAUwBJAEwAIABPAHAAZQBuACAARgBvAG4AdAAgAEwAaQBjAGUAbgBz\
        	AGUAIABcACgAaAB0AHQAcAA6AC8ALwBzAGMAcgBpAHAAdABzAC4AcwBpAGwALgBvAHIAZwAvAE8A\
        	RgBMAFwAKQAuAABDb3B5cmlnaHQgXDI1MSAyMDE4LTIwMTkgSmVhbi1GcmFuY29pcyBNb2luZS4g\
        	VGhpcyBmb250IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBTSUwgT3BlbiBGb250IExpY2Vuc2UgXCho\
        	dHRwOi8vc2NyaXB0cy5zaWwub3JnL09GTFwpLgAAYQBiAGMAMgBzAHYAZwAAYWJjMnN2ZwAAUgBl\
        	AGcAdQBsAGEAcgAAUmVndWxhcgAARgBvAG4AdABGAG8AcgBnAGUAIAA6ACAAYQBiAGMAMgBzAHYA\
        	ZwAgADoAIAAyADgALQAxADAALQAyADAAMQA5AABGb250Rm9yZ2UgOiBhYmMyc3ZnIDogMjgtMTAt\
        	MjAxOQAAYQBiAGMAMgBzAHYAZwAAYWJjMnN2ZwAAVgBlAHIAcwBpAG8AbgAgACAAAFZlcnNpb24g\
        	IAAAYQBiAGMAMgBzAHYAZwAAYWJjMnN2ZwAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
        	AAAAkgAAAAEAAgECAAMBAwEEAQUBBgEHAQgBCQEKAQsBDAENAQ4BDwEQAREBEgETARQBFQEWARcB\
        	GAEZARoBGwEcAR0BHgEfASABIQEiASMBJAElASYBJwEoASkBKgErASwBLQEuAS8BMAExATIBMwE0\
        	ATUBNgE3ATgBOQE6ATsBPAE9AT4BPwFAAUEBQgFDAUQBRQFGAUcBSAFJAUoBSwFMAU0BTgFPAVAB\
        	UQFSAVMBVAFVAVYBVwFYAVkBWgFbAVwBXQFeAV8BYAFhAWIBYwFkAWUBZgFnAWgBaQFqAWsBbAFt\
        	AW4BbwFwAXEBcgFzAXQBdQF2AXcBeAF5AXoBewF8AX0BfgF/AYABgQGCAYMBhAGFAYYBhwGIAYkB\
        	igGLAYwBjQGOAY8GLm5vZGVmB3VuaUUwMDAHdW5pRTAyMgd1bmlFMDIzB3VuaUUwMjQHdW5pRTAz\
        	MAd1bmlFMDM4B3VuaUUwMzkHdW5pRTA0Mwd1bmlFMDQ1B3VuaUUwNDYHdW5pRTA0Nwd1bmlFMDQ4\
        	B3VuaUUwNTAHdW5pRTA1Qwd1bmlFMDYyB3VuaUUwNjkHdW5pRTA3QQd1bmlFMDdCB3VuaUUwN0MH\
        	dW5pRTA3RAd1bmlFMDgwB3VuaUUwODEHdW5pRTA4Mgd1bmlFMDgzB3VuaUUwODQHdW5pRTA4NQd1\
        	bmlFMDg2B3VuaUUwODcHdW5pRTA4OAd1bmlFMDg5B3VuaUUwOEEHdW5pRTA4Qgd1bmlFMDhDB3Vu\
        	aUUwOTQHdW5pRTA5NQd1bmlFMEEwB3VuaUUwQTEHdW5pRTBBMgd1bmlFMEEzB3VuaUUwQTQHdW5p\
        	RTBBOQd1bmlFMEIzB3VuaUUxMDEHdW5pRTFCOQd1bmlFMUJCB3VuaUUxRTcHdW5pRTFGMgd1bmlF\
        	MUY0B3VuaUUxRjcHdW5pRTFGOQd1bmlFMUZDB3VuaUUxRkUHdW5pRTFGRgd1bmlFMjAwB3VuaUUy\
        	NDAHdW5pRTI0MQd1bmlFMjQyB3VuaUUyNDMHdW5pRTI0NAd1bmlFMjQ1B3VuaUUyNDYHdW5pRTI0\
        	Nwd1bmlFMjQ4B3VuaUUyNDkHdW5pRTI2MAd1bmlFMjYxB3VuaUUyNjIHdW5pRTI2Mwd1bmlFMjY0\
        	B3VuaUUyODAHdW5pRTI4MQd1bmlFMjgyB3VuaUUyODMHdW5pRTRBMAd1bmlFNEEyB3VuaUU0QTQH\
        	dW5pRTRBOAd1bmlFNEFDB3VuaUU0QzAHdW5pRTRDRQd1bmlFNEUxB3VuaUU0RTIHdW5pRTRFMwd1\
        	bmlFNEU0B3VuaUU0RTUHdW5pRTRFNgd1bmlFNEU3B3VuaUU0RTgHdW5pRTRFOQd1bmlFNEVBB3Vu\
        	aUU0RUUHdW5pRTUwMAd1bmlFNTAxB3VuaUU1MjAHdW5pRTUyMQd1bmlFNTIyB3VuaUU1MjMHdW5p\
        	RTUyNAd1bmlFNTI1B3VuaUU1MjkHdW5pRTUyQQd1bmlFNTJCB3VuaUU1MkMHdW5pRTUyRAd1bmlF\
        	NTJGB3VuaUU1MzAHdW5pRTUzMQd1bmlFNTM5B3VuaUU1NjYHdW5pRTU2Nwd1bmlFNTY5B3VuaUU1\
        	NkMHdW5pRTU2RAd1bmlFNTgyB3VuaUU1RDAHdW5pRTVFMgd1bmlFNjEwB3VuaUU2MTIHdW5pRTYx\
        	NAd1bmlFNjE4B3VuaUU2MjQHdW5pRTYzMAd1bmlFNjUwB3VuaUU2NTUHdW5pRTkxMAd1bmlFOTEx\
        	B3VuaUU5MTIHdW5pRTkxNAd1bmlFOTE1B3VuaUU5MTgHdW5pRTkyMAd1bmlFOTI1B3VuaUU5NUQH\
        	dW5pRUEwMgd1bmlFQUE0B3VuaUVDQTIHdW5pRUNBMwd1bmlFQ0E1B3VuaUVDQTcHdW5pRUNBOQd1\
        	bmlFQ0I3AAAAAAAAAf//AAIAAQAAAAAAAAAMABQABAAAAAIAAAABAAAAAQAAAAAAAQAAAADZahND\
        	AAAAANGXIhcAAAAA2dy6gQ==\
        	") format("truetype")';
    //fff、sfz等字体
    var AarvarkCafeFont =
      'url("data:application/font-ttf;base64,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JyYjBgcGBzY3Njc2NzYXFhcWFxYXIyYnFhUWByc2JzQnJicmJyYnJicmBwYHNjc2FzIzNhYXFhcWByc2NS4BJx4BHwEHFhUWBwYHBgcGBwYnLgEnFhcWNzI3FwYHNjcXBgciJwYjBiYnJic1NCcWFxYXFjcyMzY3Nj8BFwcGBwYHIiMGJyYvATcmJyY3FwYVFhcWBxYXFjcyNxYzMjcGIwYnJicmJzcmNSY3NjcmIwYHJzYzMhcWFxYXFhcWFzY1NC8BNyYnJicmJyYnJgcGFSM0NzYXFhcWFxYXFhcWMzI1JicmJyYnNxYXFhcWFwYjIicVFiMGJyYnJgcjBhUUFxYXFjcyNzQzNicmJyYnJicGBwYHBgcnNjcyNwcXNwYjIiYjIgcGFxYXFhcWFxY3MjcWNxUHBicXBiMiJzcWMzI3JwYjBicmJyYnJicmNSY3BhcUFxYXFhcHJicmJwYVFhcHJicmJyY3BgcGFxQXByY1Jjc2NwcVIwYHJzY3BgcnNjcnNjcXBgc2NzY3BgcXBgcGByc2NwYHJzY3DwEGByc2NzUzNj8BFzY3NhceARcWAQcjByc3FzcBByYnJicjNSYnNDcXBhUWFyYnJicmNxcGFxYXFgcWFxYXBiMGJyYnJicmJyY3Njc2NxcGBycXBhcWFxYXFhcWNzI3JwcnJicmJyYnJjcyMwciIwYXFBcWFxYFByc/AQYHNTY3BwYHJzY3JwcmJyYnNDcXBhUWFxYXBgcnNjcXBisBNTMyNyUHJic0NTMUFRYFByc3JwYHIic3FjMyNycHJic3FhMnFy8BMRcmJxYTLgEnJicmJyYnByYnJicGBxYXFhc2NyYnJicmBwYHNjcyFxYXHgEXFhc0JyYnJicmJyYnJicmByIHNhYXNxcWFxYXFhcWFxYXFhcUBwYHBgcGJxYXByYnNDcmJyY3Mhc2MzIXFhcWNyYnJicmJyYHBhcUFzEWFxYXByYnJic1JjUmNzYXFhcWFxYXNCc0JyYnJicGBwYHBhcUFxYXFhcWNzI3IiMGJzcWNzI/ARc2NzYBJgcGBz4BOwEVFjMyJwYHNgEGBwYnJicmNTQ3JiMiFxQXFjcyJzkBAjcHJywzTwJONi1TBX+0ArSpBU1ib1EBVW1dbAVadIFhZ39ueAQSOxUcST4zclRiZ6A4AxU0c8EBAQRyBxAbDhoGCxoK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ARQGIyImNTQzBhUUMzI1NCMGByY1NjU0OwEWFxYHNzIHBiMiJzQ3NicGBwYjIicmPQE0MzIVFAYVFBc2MzIVFAYVFDM3NjcWJRQHBiMiJwcmJzU0NyciBwYVFBYVFAcWFxQjIicGIyInBiMiJyY1NDY1NCY1NCY1NDc2Mxc3MzIXNjcyFRQHFhUXMjc2FTQnNjc2Mxc2MzIXNxc2MzIXFhUUBhUXFgcWFRQHFhcUIyI1NDMyFxQPAQYjIiY1NDMWHwEWMzI1NCc1BiMiNTQzMhc2MzIdAQYdATY1FgcUBiMiNTQmNTQzMhUUBhUUMzI3NjcyJxQGIyImNTQzBhUUMzI1NCMGByY1Njc2NzY7ARYfARYHNzIDFAcWBgcOASMnBiMiJwciLwEmJyYnNyYnNyYnNjU0PwE+ATc2NzYzMhcWHwEWHwIWFwcUFhMUBiMiNTQ2MzIVFCMiJxQzMjcyBxQGIyInBiMiNTQ2MzIXJjU0MzIVFAYVFDM/ASUUBwYPAScGIycGMyInBiMvASYnNTcmNTQ2NS8BNjU0JzYzMhc2Mxc2MzIXFBYVBxYVHAEVBjUHFRcVFgcXMhc2Mxc2MzIXNxYVFAcXBxYlNScGByYvATU2NzY3JjU0NzY1LwE0NyYnJicmJyYjIgYjIiYjIgYjJwcVNBcGFRQXFAYVFwYVFBYVFAYVFDMyNzMWMzI2MzIWOwE/ASY3Nj0BPwIXBzYWFxYXNjMyFjMyPwEnAScmIyIVFDMyEzUmNTQ2NSYGJzcmPQE2NSc3Fjc2MxYXNjMXNzQmNTcnIicjIgYjIiYHIyc3JjU0Nyc3Ij8CNCc2NSYnNyciBiMiJiMiBiMnJiMiBisBJyMHFBYVFAYVFBYVFAYVFBcHFBcHFBYVBhUWFzI2MzIXNyYnATQjIhUUMzIXLwEHJiMGBxUWFRQHFhUPAS8CJicmJzYnBiMmByMGIyImIwcVFhUGBwYXBxQWFRQGFxUXFjMiNzI7ATY3JzY3JjcnNjczFzIWFxYXIjcyOwE3NTQnNzQnNjUUJyU1NCMiFRQzMhMmNTQ2NTQmNTQ2NTQmNTc0Ny8BByYHJyYHJwcGFRciBiMiJwYHJzYnNjcnBy8BIw8CFBcHFxYXBhcWFxQGFR8BMz8BNCY1NjU0JjUUNzY3FzcXFgcWBxc3FjMyNjMXNh8BNSYjIhUUMzIBNC8B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AYABggGGAYoBigGMAYz//wADAAQABQAGAAcACAAJAAoACwAMAA0ADgAPABAAEQASABMAFAAVABYAFwAYABkAGgAbABwAHQAeAB8AIAAhACIAIwAkACUAJgAnACgAKQAqACsALAAtAC4ALwAwADEAMgAzADQANQA2ADcAOAA5ADoAOwA8AD0APgA/AEAAQQBCAEMARABFAEYARwBIAEkASgBLAEwATQBOAE8AUABRAFIAUwBUAFUAVgBXAFgAWQBaAFsAXABdAF4AXwBgAJAAjQCBAIIAngCJAIYAjgCFAKEAtQCPAIwAkQCmAKQAkgBhAGIAhwBjAKgAZAClAKcArACpAKoAqwC4AGUArwCtAK4AkwBmAIgAsgCwALEAZwC6ALwAhABpAGgAagBsAGsAbQCKAG4AcABvAHEAcgB0AHMAdQB2ALkAdwB5AHgAegB8AHsAiwB+AH0AfwCAALsAvQCcAMQAvgC/AJQAlQC2ALcAnQDAAMEAswDGAMUAtAAQAJYAlwCaAJsAogCYAJkAowCDAJ8AoAChAMIAwwAAAAAAAAABAAAB6AABAE8AJAAGAbYADQAk/2oAJABS/+cAJABZ/84AJABa/84AJQBP/+cAKABFABkAKABPABkALABQABkALABVABkALwBSABkALwCh/0sAMgBGABkAMgBHABkAMgBJABkAMwBI/+cAMwBS/+cANQBS/+cANwBE/7UANwBI/7UANwBS/7UANwBV/7UANwBY/7UANwBa/7UANwBc/7UANwDE/5wAOQBE/+cAOQBI/+cAPABE/7UAPABI/7UAPABS/7UAPADE/7UAPgBE/84APgBI/5wAPgDE/5wARQBX/+cASABP/+cASABR/+cASABW/+cASABX/+cASQAWABkASQAZABQASQBFABkASQBLABkASQBPABkASQBXABQASgBNADIASwBJAAoATgBJAB4ATgBNACMATwBJAA8AUABJABkAUQBJABkAUQBNADIAUgBGABkAUgBX/+cAUgBb/90AVQBE/+cAVQBF/+cAVQBG/+cAVQBH/+cAVQBI/+cAVQBK/+cAVQBM/+cAVQBO/+cAVQBP/+cAVQBQ/+cAVQBR/+cAVQBS/+cAVQBT/+cAVQBV/+cAVQBW/+cAVQBX/+cAVQBY/+cAVwBX//EAVwBcABkAWABX/+cAWQBS/+cAWwBE/+cAWwBG/+cAAAAQAAAAzAkRBQACAgMDAgQEBgIDAwQEAQIBBAQEBAQEBAQEBAQBAQIGBAQGBQUEBQQDBQUDAwQEBQUFBAUFBAMEBAcFBAQDAwQHDQIEBAMEBAIEBAICBAIGBAQEBAMDAwQEBgQEAwIRBQUFBAQFBQQEBAQEBAQDBAQEBAICAgIEBAQEBAQEBAQEAwQDBQICBgUEBgQEBAQFAgUFBQcGAwQEBAICBAQEAwMCAgQFBAUEBAMDAwMFBQUEBAQCBAQEAwUEBAQEBAQCBAMFBQIEAgAAAAoTBQACAgQDAwUEBwIDAwUEAgMCBQUFBQUFBQUFBQUCAgIHBQUHBQYEBgQEBgUDAwUFBgUGBQYFBQQFBQgFBQUEAwUIDwMFBAMFBAMEBQICBAIHBQQEBAMEAwUEBwUEBAITBgUFBAQFBgUFBQUFBQUDBAQEBAICAgIFBAQEBAQFBQUFAwUDBQMCBgYFBwQFBQUFAgUFBggHBAUFBAICBAUEAwMCAwUFBAUEBAMDAwMGBgYFBQUDBQQFBAYEBQQFBAUCBQQFBQIFAwAAAAsVBgACAgQDAwUFCAIDAwUFAgMCBQUFBQUFBQUFBQUCAgIIBQUIBgYFBgUEBgYEAwUFBwYGBQYGBQQFBQkGBQUEAwUJEAMFBQQFBAMFBQMDBQIIBQUFBQQEAwUFCAUFBAIVBgYGBQUGBgUFBQUFBQUEBAQEBAMDAwMFBQUFBQUFBQUFBAUEBgMDBwYFBwUFBQUGAgYGBgkHBAUFBQICBQUFAwQCAwUGBQYFBQQEBAQGBgYFBQUDBQQFBAYFBQUFBQUCBQQGBgMFAwAAAAwXBgADAwQEAwYFCAIDAwYFAgMCBQYGBgYGBgYGBgYCAgMJBgUIBgcFBwUFBwYEBAYGBwYHBgcGBgQGBgkGBgUEBAYJEgMGBQQGBQMFBgMDBQMJBgUFBQQEBAYFCAYFBAMXBwYGBQUGBwYGBgYGBgYEBQUFBQMDAwMGBQUFBQUGBgYGBAYEBgMDBwcGCAUGBgYGAwYGBwkIBAYFBQMDBQYFBAQCAwYGBQYFBQQEBAQHBwcGBgYDBgUGBAcFBgUGBQYDBQQGBgMGAwAAAA0ZBwADAwUEBAYGCQMEBAYFAgMCBgYGBgYGBgYGBgYCAgMJBgYJBwgGBwYFBwcEBAYGCAcHBggHBgUGBgoHBgYFBAYKEwMGBgQGBQQGBgMDBQMJBgUGBgQFBAYFCQYGBQMZBwcHBgYHBwYGBgYGBgYEBQUFBQMDAwMGBQUFBQUGBgYGBAYEBwMDCAcGCQUGBgYHAwcHBwoJBQYGBQMDBgYGBAQCBAYHBgcGBgQEBAQHBwcGBgYDBgUGBQgGBgYGBgYDBgUHBwMGAwAAAA4bBwADAwUEBAcGCgMEBAcGAgQCBgcHBwcHBwcHBwcCAgMKBwYKCAgGCAYFCAcEBAcGCAcIBwgHBwUHBwsHBgYFBAYLFQQHBgUGBQQGBwMDBgMKBgYGBgUFBAcGCgcGBQMbCAgIBgYHCAcHBwcHBwcFBQUFBQMDAwMGBgYGBgYHBwcHBQcFBwQDCQgGCQYHBwcIAwgICAsJBQcGBgMDBgYGBAUDBAcIBggGBgQEBAQICAgHBwcEBwYHBQgGBgYHBgcDBgUHBwMHBAAAAA8dCAADAwUFBAcGCwMEBAcGAgQCBwcHBwcHBwcHBwcCAgMLBwcLCAkGCQcGCAgFBQcHCQgIBwkIBwUHBwwIBwcFBQcMFgQHBwUHBgQHBwMEBgMLBwYHBwUGBQcGCgcHBgMdCAgIBgcICAcHBwcHBwcFBgYGBgMDAwMHBgYGBgYHBwcHBQcFCAQDCQgHCgYHBwcIAwgICAwKBgcHBgMDBwcGBQUDBAcIBwgHBwUFBQUICAgHBwcEBwYHBgkGBwcHBwcDBwYICAMHBAAAABAfCAAEBAYFBAgHCwMEBQgHAwQDBwgICAgICAgICAgDAwQLCAcLCQkHCQcGCQgFBQgHCggJCAkICAYIBw0IBwcGBQcMGAQIBwUHBgQHCAQEBwQLBwcHBwUGBQcHCwcHBgQfCQkJBwcICQgICAgICAgFBgYGBgQEBAQHBwcHBwcHBwcHBQgFCQQECgkHCwcICAgJBAkJCQ0LBggHBwQEBwcHBQUDBAgJBwkHBwUFBQUJCQkICAgECAYIBgkHBwcIBwgEBwYICAQIBAAAABEhCQAEBAYFBQgHDAMFBQgHAwQDCAgICAgICAgICAgDAwQMCAgMCQoHCgcHCgkFBQgICgkKCAoJCAYICA0JCAgGBQgNGQQIBwYIBwUHCAQEBwQMCAcIBwYGBQgHDAgIBgQhCgkJBwcJCggICAgICAgGBwcHBwQEBAQIBwcHBwcICAgIBggGCQQECwoICwcICAgJBAkJCg0LBggIBwQECAgHBQYDBQgJBwkHBwUFBQUKCgoICAgECAcIBgoHCAgICAgECAYJCQQIBAAAABIjCQAEBAYGBQkIDQQFBQkIAwUDCAkJCQkJCQkJCQkDAwQNCAgNCgoICggHCgoGBQgICwkKCQsJCQYICA4KCAgGBQgOGwUJCAYIBwUICAQECAQNCAgICAYHBQgIDAgIBwQjCgoKCAgJCggJCQkJCQkGBwcHBwQEBAQICAgICAgICAgIBgkGCgUECwoIDAgJCQkKBAoKCg4MBwkICAQECAgIBgYDBQkKCAoICAYGBgYKCgoICAgFCQcJBwoICAgJCAkECAcJCQQJBQAAABMlCgAEBAcGBQkIDQQFBQkIAwUDCQkJCQkJCQkJCQkDAwQOCQkNCgsICwgHCwoGBgkJDAoLCQsKCQcJCQ8KCQkHBgkPHAUJCAYJBwUICQQFCAQOCQgJCAYHBgkIDQkIBwQlCwoKCAgKCwkJCQkJCQkGBwcHBwQEBAQJCAgICAgJCQkJBgkGCgUEDAsJDQgJCQkKBAoKCw8NBwkJCAQECAkIBgYDBQkKCAoICAYGBgYLCwsJCQkFCQgJBwsICQgJCQkECQcKCgQJBQAAABQmCgAFBQcGBQoJDgQGBgoIAwUDCQoKCgoKCgoKCgkDAwUOCQkOCwwJCwkICwsGBgkJDAoLCgwKCgcJCRALCQkHBgkPHgUKCQcJCAUJCQUFCAUOCQgJCQcHBgkIDgkJBwUmCwsLCQkKCwkKCgoKCgoHCAgICAUFBQUJCAgICAgJCQkJBwoHCwUFDAsJDQgKCgoLBQsLCxANBwkJCAQECQkJBgcEBQkLCQsJCQYGBgYLCwsJCQkFCggKBwwJCQkKCQoFCQcKCgUKBQAAABUoCwAFBQgHBgoJDwQGBgoJAwYDCgoKCgoKCgoKCgoDAwUPCgoPCwwJDAkIDAsHBgoKDQsMCgwLCgcKChALCgoIBgoQHwYKCQcKCAYJCgUFCQUPCgkJCQcIBgoJDgoJCAUoDAsLCQkLDAoKCgoKCgoHCAgICAUFBQUKCQkJCQkKCgoKBwoHCwYFDQwKDgkKCgoLBQsLDBEOCAoKCQUFCQoJBwcEBgoLCQsJCQcHBwcMDAwKCgoGCggKCAwJCgkKCQoFCggLCwUKBgAAABYqCwAFBQgHBgsJEAQGBgsJBAYECgoKCgsLCwsKCwoEBAUQCgoPDA0JDQoJDAwHBwoKDQsMCw0LCwgKChEMCgoIBwoRIQYLCggKCQYKCgUFCQUQCgkKCgcIBwoJDwoKCAUqDAwMCQoLDAoLCwsLCwsICQkJCQUFBQUKCQkJCQkKCgoKCAoIDAYFDgwKDwkLCwsMBQwMDBEPCAoKCQUFCgoJBwcEBgoMCgwKCgcHBwcMDAwKCgoGCwkLCA0KCgoLCgsFCggLCwULBgAAABcsDAAFBQgHBgsKEAUGBwsKBAYECgsLCwsLCwsLCwsEBAUQCwoQDA0KDQoJDQwHBwsLDgwNCw4MCwgLCxIMCwsIBwsSIgYLCggLCQYKCwUFCgUQCwoKCggIBwsKEAsKCAUsDQwMCgoMDQsLCwsLCwsICQkJCQUFBQULCgoKCgoLCwsLCAsIDAYFDg0LDwoLCwsMBQwMDRIPCQsLCgUFCgsKBwgEBgsMCgwKCgcHBwcNDQ0LCwsGCwkLCA0KCwoLCgsFCwgMDAULBgAAABguDAAFBQkIBwsKEQUHBwwKBAYECwsLCwsLCwsLCwsEBAURCwsRDQ4KDgsJDg0IBwsLDw0ODA4MCwgLCxMNCwsJBwsTIwYLCwgLCQcLCwYGCgURCwoLCggJBwsKEAsLCQUuDg0NCgsNDgsLCwsLCwsICQkJCQYGBgYLCgoKCgoLCwsLCAsIDQYGDw4LEAoMDAwNBQ0NDhMQCQsLCgUFCwsKCAgEBwsNCw0LCwgICAgODg4LCwsGCwkLCQ4KCwsMCwwFCwkMDQYLBgAAAAAAAXABkAAFAAECvAKKAAAAjwK8AooAAAHFADIBAwAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBbHRzAEAAIPACA7b/OAAAA7YA0gAAAAEAAAABAABqASHuXw889QAAA+gAAAAAu0cHKwAAAAC7Rwcr/xL/LgcbA7YAAAADAAIAAQAAAAAAAQAAA7b/OAAAB4L/Ev71BxsAAQAAAAAAAAAAAAAAAAAAAMcAAQAAAMcGRgBIAEsABAACAAgAQAAKAAAAcQDYAAIAAQ==")';
    var defined_font = {},
      font_tb = {},
      fid = 1,
      font_scale_tb = {
        serif: 1.05,
        serifBold: 1.05,
        "sans-serif": 1.1,
        "sans-serifBold": 1.1,
        Palatino: 1.1,
        Mono: 1.35,
      },
      fmt_lock = {};
    var cfmt = {
      annotationfont: {
        name: "sans-serif",
        size: 12,
      },
      dacsfontsize: 16, //新增，反复标记的字体大小
      aligncomposer: 1,
      beamslope: 0.4,
      breaklimit: 0.7,
      breakoneoln: true,
      cancelkey: true,
      composerfont: {
        name: "serif",
        style: "italic",
        size: 14,
      },
      composerspace: 6,
      composermargin: 0, //多行作曲间距，add by hxs
      dblrepbar: ":][:",
      decoerr: true,
      dynalign: true,
      footerfont: {
        name: "serif",
        size: 12,
      },
      fullsvg: "",
      kewsize: 0.8,
      imgsize: 1,
      gchordfont: {
        //name: "sans-serif",
        name: "AarvarkCafe",
        size: 12,
      },
      gchord2font: {
        //name: "sans-serif",
        name: "AarvarkCafe",
        size: 14,
      },
      gracespace: new Float32Array([4, 8, 11]),
      graceslurs: true,
      headerfont: {
        name: "serif",
        size: 16,
      },
      historyfont: {
        name: "serif",
        size: 16,
      },
      hyphencont: true,
      indent: 0,
      infofont: {
        name: "serif",
        style: "italic",
        size: 14,
      },
      infoname:
        'R "Rhythm: "\n\
        	B "Book: "\n\
        	S "Source: "\n\
        	D "Discography: "\n\
        	N "Notes: "\n\
        	Z "Transcription: "\n\
        	H "History: "',
      infospace: 0,
      keywarn: true,
      leftmargin: 1.4 * CM,
      botmargin: 0,
      lineskipfac: 1.1,
      linewarn: true,
      maxshrink: 0.65,
      maxstaffsep: 2000,
      maxsysstaffsep: 2000,
      measurefont: {
        name: "serif",
        style: "italic",
        size: 10,
        box: true,
      },
      measurefirst: 1,
      measurenb: -1,
      musicspace: 6,
      partsfont: {
        name: "serif",
        size: 15,
      },
      parskipfac: 0.4,
      partsspace: 8,
      pagewidth: (isNaN(pagewidth) ? 21 : pagewidth) * CM,
      printmargin: 0,
      rightmargin: 1.4 * CM,
      rbdbstop: true,
      rbmax: 4,
      rbmin: 2,
      repeatfont: {
        name: "serif",
        size: 13,
      },
      scale: scale,
      slurheight: 1,
      staffsep: staffsep,
      stemheight: 21,
      stretchlast: 0.25,
      stretchstaff: true,
      subtitlefont: {
        name: "serif",
        size: 16,
      },
      subtitlespace: 3,
      sysstaffsep: 34,
      tempofont: {
        name: "serif",
        weight: "bold",
        size: 12,
      },
      textfont: {
        name: "serif",
        size: 16,
      },
      textspace: 14,
      titlefont: {
        name: "serif",
        size: 20,
      },
      titlespace: 6,
      titletrim: true,
      topspace: 22,
      tuplets: [0, 0, 0, 0],
      vocalfont: {
        name: "楷体",
        weight: "bold",
        size: 13,
      },
      vocalspace: 10,
      writefields: "CMOPQsTWwSN", // S 打击乐的象声词
      wordsfont: {
        name: "serif",
        size: 16,
      },
      wordsspace: 5,
      hiddenkey: false, //隐藏调号
      hiddenspeed: false, //隐藏速度
      hiddenmeter: false, //隐藏拍号
      hiddentitle: false, //隐藏标题
      showmeterinstaff: false, //隐藏拍号
      showcm: false, //显示唱名
      pdfrate: "2", //pdf清析度
      combine: 0, //2个声部显示在一个staff里的显示方式
    };
    function get_bool(param) {
      return !param || !/^(0|n|f)/i.test(param);
    }
    function get_font_scale(param) {
      var a = param.split(/\s+/);
      if (a.length <= 1) return;
      var scale = parseFloat(a[a.length - 1]);
      if (isNaN(scale) || a <= 0) {
        //                syntax(1, "Bad scale value in %%font");
        syntax(1, " %%font 不正确的字体值 ");
        return;
      }
      font_scale_tb[a[0]] = scale;
      for (var fn in font_tb) {
        if (!font_tb.hasOwnProperty(fn)) continue;
        var font = font_tb[fn];
        if (font.name == a[0]) font.swfac = font.size * scale;
      }
    }
    function param_set_font(xxxfont, param) {
      var font, fn, old_fn, n, a, new_name, new_fn, new_size, scale, cl;
      if (xxxfont[xxxfont.length - 2] == "-") {
        n = xxxfont[xxxfont.length - 1];
        if (n < "1" || n > "9") return;
        xxxfont = "u" + n + "font";
      }
      fn = cfmt[xxxfont];
      if (fn) {
        font = font_tb[fn];
        if (font) {
          old_fn = font.name + "." + font.size;
          if (font.class) old_fn += "." + font.class;
        }
      }
      n = param.indexOf("class=");
      if (n >= 0) {
        n += 6;
        a = param.indexOf(" ", n);
        if (a > 0) cl = param.slice(n, a);
        else cl = param.slice(n);
        param = param.replace(new RegExp("class=" + cl), "").trim();
      }
      a = param.split(/\s+/);
      new_name = a[0];
      if (new_name == "*" && font) {
        new_name = font.name;
      } else {
        new_name = new_name.replace("Times-Roman", "serif");
        new_name = new_name.replace("Times", "serif");
        new_name = new_name.replace("Helvetica", "sans-serif");
        new_name = new_name.replace("Courier", "monospace");
      }
      if (a.length > 1) {
        new_size = a[a.length - 1];
        if (new_size == "*" && font) new_size = font.size;
      } else if (font) {
        new_size = font.size;
      }
      if (!new_size) {
        return;
      }
      new_fn = new_name + "." + new_size;
      if (cl) new_fn += "." + cl;
      if (new_fn == old_fn) return;
      font = font_tb[new_fn];
      if (!font) {
        scale = font_scale_tb[new_name];
        if (!scale) scale = 1.1;
        font = {
          name: new_name,
          size: Number(new_size),
          swfac: new_size * scale,
        };
        font_tb[new_fn] = font;
      }
      if (cl) font.class = cl;
      cfmt[xxxfont] = new_fn;
    }
    function get_unit(param) {
      var v = parseFloat(param);
      if (v < 100) {
        return v;
      }
      if (param.length <= 2) {
        return v;
      }
      switch (param.slice(-2)) {
        case "CM":
        case "cm":
          v *= CM;
          break;
        case "IN":
        case "in":
          v *= IN;
          break;
        case "PT":
        case "pt":
          v *= 0.75;
          break;
      }
      return v;
    }
    function set_infoname(param) {
      var tmp = cfmt.infoname.split("\n"),
        letter = param[0];
      for (var i = 0; i < tmp.length; i++) {
        var infoname = tmp[i];
        if (infoname[0] != letter) continue;
        if (param.length == 1) tmp.splice(i, 1);
        else tmp[i] = param;
        cfmt.infoname = tmp.join("\n");
        return;
      }
      cfmt.infoname += "\n" + param;
    }
    var textopt = {
      align: "j",
      center: "c",
      fill: "f",
      justify: "j",
      ragged: "f",
      right: "r",
      skip: "s",
    };
    function get_textopt(param) {
      return textopt[param];
    }
    var posval = {
      above: C.SL_ABOVE,
      auto: 0,
      below: C.SL_BELOW,
      down: C.SL_BELOW,
      hidden: C.SL_HIDDEN,
      opposite: C.SL_HIDDEN,
      under: C.SL_BELOW,
      up: C.SL_ABOVE,
      center: C.SL_CENTER,
    };
    function set_pos(k, v) {
      k = k.slice(0, 3);
      if (k == "ste") k = "stm";
      set_v_param("pos", k + " " + v);
    }
    function set_writefields(parm) {
      var c,
        i,
        a = parm.split(/\s+/);
      if (get_bool(a[1])) {
        for (i = 0; i < a[0].length; i++) {
          c = a[0][i];
          if (cfmt.writefields.indexOf(c) < 0) cfmt.writefields += c;
        }
      } else {
        for (i = 0; i < a[0].length; i++) {
          c = a[0][i];
          if (cfmt.writefields.indexOf(c) >= 0)
            cfmt.writefields = cfmt.writefields.replace(c, "");
        }
      }
    }
    function set_v_param(k, v) {
      if (curvoice) {
        set_vp([k + "=", v]);
        return;
      }
      k = [k + "=", v];
      var vid = "*";
      if (!info.V) info.V = {};
      if (info.V[vid]) Array.prototype.push.apply(info.V[vid], k);
      else info.V[vid] = k;
    }
    function set_page() {
      if (!img.chg) return;
      img.chg = false;
      img.lm = cfmt.leftmargin - cfmt.printmargin;
      if (img.lm < 0) img.lm = 0;
      img.rm = cfmt.rightmargin - cfmt.printmargin;
      if (img.rm < 0) img.rm = 0;
      img.width = cfmt.pagewidth - 2 * cfmt.printmargin;
      if (img.width - img.lm - img.rm < 100) {
        //                error(0, undefined, "Bad staff width");
        error(0, undefined, "错误的谱子宽度值");
        img.width = img.lm + img.rm + 150;
      }
      set_posx();
    }
    function set_format(cmd, param) {
      var f, f2, v, i;
      if (/.+font(-[\d])?$/.test(cmd)) {
        param_set_font(cmd, param);
        return;
      }
      switch (cmd) {
        case "aligncomposer":
        case "barsperstaff":
        case "infoline":
        case "measurefirst":
        case "measurenb":
        case "rbmax":
        case "rbmin":
        case "shiftunison":
          v = parseInt(param);
          if (isNaN(v)) {
            syntax(1, "不正确的整数值");
            break;
          }
          cfmt[cmd] = v;
          break;
        case "microscale":
          f = parseInt(param);
          if (isNaN(f) || f < 4 || f > 256 || f % 1) {
            syntax(1, errs.bad_val, "%%" + cmd);
            break;
          }
          set_v_param("uscale", f);
          break;
        case "bgcolor":
        case "fgcolor":
        case "dblrepbar":
        case "titleformat":
          cfmt[cmd] = param;
          break;
        case "beamslope":
        case "breaklimit":
        case "lineskipfac":
        case "maxshrink":
        case "pagescale":
        case "parskipfac":
        case "scale":
        case "slurheight":
        case "stemheight":
        case "stretchlast":
          f = parseFloat(param);
          if (isNaN(f)) {
            syntax(1, errs.bad_val, "%%" + cmd);
            break;
          }
          switch (cmd) {
            case "scale":
              f /= 0.75;
            case "pagescale":
              cmd = "scale";
              img.chg = true;
              break;
          }
          cfmt[cmd] = f;
          break;
        case "annotationbox":
        case "gchordbox":
        case "partsbox":
          cfmt[cmd.replace("box", "font")].box = get_bool(param);
          break;
        case "measurebox":
        case "bstemdown":
        case "breakoneoln":
        case "cancelkey":
        case "contbarnb":
        case "custos":
        case "decoerr":
        case "dynalign":
        case "flatbeams":
        case "graceslurs":
        case "graceword":
        case "hyphencont":
        case "keywarn":
        case "linewarn":
        case "quiet":
        case "rbdbstop":
        case "singleline":
        case "squarebreve":
        case "splittune":
        case "straightflags":
        case "stretchstaff":
        case "timewarn":
        case "titlecaps":
        case "titleleft":
        case "hiddentitle":
          if (cmd == "singleline") {
            singleline = get_bool(param);
          }
          cfmt[cmd] = get_bool(param);
          break;
        case "chordnames":
          v = param.split(",");
          cfmt.chordnames = {};
          for (i = 0; i < v.length; i++) cfmt.chordnames["CDEFGAB"[i]] = v[i];
          break;
        case "composerspace":
        case "indent":
        case "infospace":
        case "maxstaffsep":
        case "maxsysstaffsep":
        case "musicspace":
        case "partsspace":
        case "staffsep":
        case "subtitlespace":
        case "sysstaffsep":
        case "textspace":
        case "titlespace":
        case "topspace":
        case "vocalspace":
        case "kewsize":
        case "imgsize":
        case "wordsspace":
          f = get_unit(param);
          if (isNaN(f)) syntax(1, errs.bad_val, "%%" + cmd);
          else cfmt[cmd] = f;
          break;
        case "print-leftmargin":
          //                    syntax(0, "$1 is deprecated - use %%printmargin instead", '%%' + cmd)
          syntax(0, "$1 已过时 - 使用 %%printmargin 替代", "%%" + cmd);
          cmd = "printmargin";
        case "printmargin":
        case "leftmargin":
        case "pagewidth":
        case "rightmargin":
          f = get_unit(param);
          if (isNaN(f)) {
            syntax(1, errs.bad_val, "%%" + cmd);
            break;
          }
          cfmt[cmd] = f;
          img.chg = true;
          break;
        case "concert-score":
          if (cfmt.sound != "play") cfmt.sound = "concert";
          break;
        case "writefields":
          set_writefields(param);
          break;
        case "dynamic":
        case "gchord":
        case "gstemdir":
        case "ornament":
        case "stemdir":
        case "vocal":
        case "volume":
          set_pos(cmd, param);
          break;
        case "font":
          get_font_scale(param);
          break;
        case "fullsvg":
          if (parse.state != 0) {
            syntax(1, errs.not_in_tune, "%%fullsvg");
            break;
          }
          cfmt[cmd] = param;
          break;
        case "gracespace":
          v = param.split(/\s+/);
          for (i = 0; i < 3; i++)
            if (isNaN(Number(v[i]))) {
              syntax(1, errs.bad_val, "%%gracespace");
              break;
            }
          for (i = 0; i < 3; i++) cfmt[cmd][i] = Number(v[i]);
          break;
        case "tuplets":
          cfmt[cmd] = param.split(/\s+/);
          v = cfmt[cmd][3];
          if (v && posval[v]) cfmt[cmd][3] = posval[v];
          break;
        case "infoname":
          set_infoname(param);
          break;
        case "composermargin":
          cfmt.composermargin = parseInt(param);
          break;
        case "notespacingfactor":
          f = parseFloat(param);
          if (isNaN(f) || f < 1 || f > 5) {
            syntax(1, errs.bad_val, "%%" + cmd);
            break;
          }
          i = 5;
          f2 = space_tb[i];
          for (; --i >= 0; ) {
            f2 /= f;
            space_tb[i] = f2;
          }
          i = 5;
          f2 = space_tb[i];
          for (; ++i < space_tb.length; ) {
            f2 *= f;
            space_tb[i] = f2;
          }
          break;
        case "notespace":
          notespace = parseFloat(param);
          break;
        case "play":
          cfmt.sound = "play";
          break;
        case "pos":
          cmd = param.split(/\s+/);
          set_pos(cmd[0], cmd[1]);
          break;
        case "sounding-score":
          if (cfmt.sound != "play") cfmt.sound = "sounding";
          break;
        case "staffwidth":
          v = get_unit(param);
          if (isNaN(v)) {
            syntax(1, errs.bad_val, "%%" + cmd);
            break;
          }
          if (v < 100) {
            //syntax(1, "%%staffwidth too small")
            syntax(1, "%%staffwidth 值不能小于100");
            break;
          }
          v = cfmt.pagewidth - v - cfmt.leftmargin;
          if (v < 2) {
            //                        syntax(1, "%%staffwidth too big")
            syntax(1, "%%staffwidth 值太大");
            break;
          }
          cfmt.rightmargin = v;
          img.chg = true;
          break;
        case "textoption":
          cfmt[cmd] = get_textopt(param);
          break;
        case "titletrim":
          v = Number(param);
          if (isNaN(v)) cfmt[cmd] = get_bool(param);
          else cfmt[cmd] = v;
          break;
        case "combinevoices":
          syntax(1, "%%combinevoices 过时了 - 请使用 %%voicecombine ");
          break;
        case "voicemap":
          set_v_param("map", param);
          break;
        case "voicescale":
          set_v_param("scale", param);
          break;
        case "hiddenkey":
          cfmt[cmd] = true;
          break;
        case "lyricstandv": //新增，拷贝歌词 %%lyricStandV 1,后面的1是标准声部（即有歌词的声部，默认值1---V:1）
          if (param != "") {
            lyricStandV = parseInt(param);
          } else {
            lyricStandV = 1;
          }
          break;
        case "hiddenspeed":
          cfmt[cmd] = true;
          break;
        case "hiddenmeter":
          cfmt[cmd] = true;
          break;
        case "showmeterinstaff":
          cfmt[cmd] = true;
          break;
        case "showcm":
          cfmt[cmd] = true;
          break;
        case "dacsfontsize":
          cfmt[cmd] = param;
          break;
        case "pdfrate":
          cfmt[cmd] = param;
          break;
        case "voicecombine":
          cfmt[cmd] = param;
          break;
        default:
          if (parse.state == 0) cfmt[cmd] = param;
          break;
      }
    }
    function font_init() {
      param_set_font("annotationfont", "sans-serif 12");
      param_set_font("composerfont", "serif 14"); //修改作曲字体 update by hxs
      param_set_font("footerfont", "serif 16");
      param_set_font("gchordfont", "AarvarkCafe 14");
      param_set_font("gchord2font", "AarvarkCafe 14");
      param_set_font("headerfont", "serif 16");
      param_set_font("historyfont", "serif 16");
      param_set_font("infofont", "serifItalic 14");
      param_set_font("measurefont", "serifItalic 14");
      param_set_font("partsfont", "serif 15");
      param_set_font("repeatfont", "serif 13");
      param_set_font("subtitlefont", "serif 16");
      param_set_font("tempofont", "serifBold 15");
      param_set_font("textfont", "serif 14");
      param_set_font("titlefont", "serif 20");
      //            param_set_font("vocalfont", "楷体 13");
      param_set_font("vocalfont", "monospaceBold 13");
      //            param_set_font("vocalfont", "serifBold 13");//歌词字体，有些电脑用这个字体，IV46这种会粘在一块，所以改成了monospaceBold
      param_set_font("voicefont", "serifBold 13");
      param_set_font("wordsfont", "serif 16");
      // create by lhj
      param_set_font("splfont", "musicBold 18");
      param_set_font("yhfont", "microsoftyahei 13");
    }
    function style_font(fn) {
      var r = fn.split("."),
        sz = r[1],
        i = fn.indexOf("Italic"),
        j = 100,
        o = fn.indexOf("Oblique"),
        b = fn.indexOf("Bold");
      fn = r[0];
      r = "";
      if (b > 0) {
        r += "font-weight:bold; ";
        j = b;
      }
      if (i > 0 || o > 0) {
        if (i > 0) {
          r += "font-style:italic; ";
          if (i < j) j = i;
        }
        if (o > 0) {
          r += "font-style:oblique; ";
          if (o < j) j = o;
        }
      }
      if (j != 100) {
        if (fn[j - 1] == "-") j--;
        fn = fn.slice(0, j);
      }
      return "font-family:" + fn + "; " + r + "font-size:" + sz + "px";
    }
    Abc.prototype.style_font = style_font;
    Abc.prototype.font_class = font_class;
    function font_class(font) {
      if (font.class) return "f" + font.fid + cfmt.fullsvg + " " + font.class;
      return "f" + font.fid + cfmt.fullsvg;
    }
    function style_add_font(font) {
      if (font.name == "Microsoft-YaHei") {
        font_style +=
          "\n.f" +
          font.fid +
          cfmt.fullsvg +
          " {" +
          style_font("Microsoft YaHei." + font.size) +
          ";\nfont-weight: bold;}";
      } else {
        if (font.fid == 4) {
          font_style +=
            "\n.f" +
            font.fid +
            cfmt.fullsvg +
            " {" +
            style_font(font.name + "." + font.size) +
            "}";
        } else {
          font_style +=
            "\n.f" +
            font.fid +
            cfmt.fullsvg +
            " {" +
            style_font(font.name + "." + font.size) +
            "}";
        }
      }
    }
    function use_font(font) {
      //        	if(parseInt(editSvgLineIndex)>0){
      //        		return;
      //        	}
      if (!defined_font[font.fid]) {
        defined_font[font.fid] = true;
        style_add_font(font);
      }
    }
    function get_font(xxx) {
      xxx += "font";
      var fn = cfmt[xxx],
        font = font_tb[fn];
      //            if(!font){
      //            	font = fn;
      //            }

      if (!font) {
        //                syntax(1, "Unknown font $1", xxx);
        syntax(1, "无法识别的字体 $1", xxx);
        font = gene.curfont;
      }

      if (!font.fid) font.fid = fid++;
      use_font(font);
      return font;
    }
    var sav = {},
      mac = {},
      maci = {};
    var abc_utf = {
      "=D": "Đ",
      "=H": "Ħ",
      "=T": "Ŧ",
      "=d": "đ",
      "=h": "ħ",
      "=t": "ŧ",
      "/O": "Ø",
      "/o": "ø",
      "/L": "Ł",
      "/l": "ł",
      vL: "Ľ",
      vl: "ľ",
      vd: "ď",
      ".i": "ı",
      AA: "Å",
      aa: "å",
      AE: "Æ",
      ae: "æ",
      DH: "Ð",
      dh: "ð",
      OE: "Œ",
      oe: "œ",
      ss: "ß",
      TH: "Þ",
      th: "þ",
    };
    var oct_acc = {
      1: "♯",
      2: "♭",
      3: "♮",
      4: "&#x1d12a;",
      5: "&#x1d12b;",
    };
    function cnv_escape(src) {
      var c,
        c2,
        dst = "",
        i,
        j = 0,
        codeUnits;
      while (1) {
        i = src.indexOf("\\", j);
        if (i < 0) break;
        dst += src.slice(j, i);
        c = src[++i];
        if (!c) return dst + "\\";
        switch (c) {
          case "0":
          case "2":
            if (src[i + 1] != "0") break;
            c2 = oct_acc[src[i + 2]];
            if (c2) {
              dst += c2;
              j = i + 3;
              continue;
            }
            break;
          case "u":
            j = Number("0x" + src.slice(i + 1, i + 5));
            if (isNaN(j) || j < 32) {
              dst += src[++i] + "̆";
              j = i + 1;
              continue;
            }
            codeUnits = [j];
            if (j >= 55296 && j <= 57343) {
              j = Number("0x" + src.slice(i + 7, i + 11));
              if (isNaN(j)) break;
              codeUnits.push(j);
              j = i + 11;
            } else {
              j = i + 5;
            }
            dst += String.fromCharCode.apply(null, codeUnits);
            continue;
          case "t":
            dst += " ";
            j = i + 1;
            continue;
          default:
            c2 = abc_utf[src.slice(i, i + 2)];
            if (c2) {
              dst += c2;
              j = i + 2;
              continue;
            }
            switch (c) {
              case "`":
                dst += src[++i] + "̀";
                j = i + 1;
                continue;
              case "'":
                dst += src[++i] + "́";
                j = i + 1;
                continue;
              case "^":
                dst += src[++i] + "̂";
                j = i + 1;
                continue;
              case "~":
                dst += src[++i] + "̃";
                j = i + 1;
                continue;
              case "=":
                dst += src[++i] + "̄";
                j = i + 1;
                continue;
              case "_":
                dst += src[++i] + "̅";
                j = i + 1;
                continue;
              case ".":
                dst += src[++i] + "̇";
                j = i + 1;
                continue;
              case '"':
                dst += src[++i] + "̈";
                j = i + 1;
                continue;
              case "o":
                dst += src[++i] + "̊";
                j = i + 1;
                continue;
              case "H":
                dst += src[++i] + "̋";
                j = i + 1;
                continue;
              case "v":
                dst += src[++i] + "̌";
                j = i + 1;
                continue;
              case "c":
                dst += src[++i] + "̧";
                j = i + 1;
                continue;
              case ";":
                dst += src[++i] + "̨";
                j = i + 1;
                continue;
            }
            break;
        }
        dst += "\\" + c;
        j = i + 1;
      }
      return dst + src.slice(j);
    }
    var include = 0;
    function do_include(fn) {
      var file, parse_sav;
      if (!user.read_file) {
        //                syntax(1, "No read_file support");
        syntax(1, "无法识别的文件");
        return;
      }
      if (include > 2) {
        //                syntax(1, "Too many include levels");
        syntax(1, "太多的include级别");
        return;
      }
      file = user.read_file(fn);
      if (!file) {
        //                syntax(1, "Cannot read file '$1'", fn);
        syntax(1, "无法读取文件 '$1'", fn);
        return;
      }
      include++;
      parse_sav = clone(parse);
      tosvg(fn, file);
      parse_sav.state = parse.state;
      parse = parse_sav;
      include--;
    }
    //标题超链接格式%%title-url 
    function handleUrl(content) {
      var tUrlPattern = /%%T-url\((.*)\)/;
      //标题超链接
      if (tUrlPattern.test(content)) {
        T_url = content.match(tUrlPattern)[1];
      }
      //作曲url
      var cUrlPattern = /%%C-url\((.*)\)/;
      if (cUrlPattern.test(content)) {
        C_url = content.match(cUrlPattern)[1];
      }
      //速度url
      var qUrlPattern = /%%Q-url\((.*)\)/;
      if (qUrlPattern.test(content)) {
        Q_url = content.match(qUrlPattern)[1];
      }
      //拍号url
      var mUrlPattern = /%%M-url\((.*)\)/;
      if (mUrlPattern.test(content)) {
        M_url = content.match(mUrlPattern)[1];
      }
      //高音谱号
      var treblePattern = /%%treble-url\((.*)\)/;
      if (treblePattern.test(content)) {
        treble_url = content.match(treblePattern)[1];
      }
      //低音谱号
      var bassPattern = /%%bass-url\((.*)\)/;
      if (bassPattern.test(content)) {
        bass_url = content.match(bassPattern)[1];
      }
      //中音谱号
      var altoPattern = /%%alto-url\((.*)\)/;
      if (altoPattern.test(content)) {
        alto_url = content.match(altoPattern)[1];
      }
      //次中音谱号
      var tenorPattern = /%%tenor-url\((.*)\)/;
      if (tenorPattern.test(content)) {
        tenor_url = content.match(tenorPattern)[1];
      }
    }
    function tosvg(in_fname, file, bol, eof) {
      lyricStandV = 0;
      voice_slurs = new Array(); //跨声部的连音线
      isInFirstNode = true;
      if (!isGetNoteData) {
        myDecoPosArray = [];
        noteBgArray = new Array(); //音符背景色
        lyricBgArray = new Array(); //歌词背景色
        barLineArray = new Array();
        bezier_slurs_left = new Array();
        bezier_slurs_right = new Array();
        staff_slurs_left = new Array();
        staff_slurs_right = new Array();
        //        		update_note_index_arr = new Array();
        //        		update_note_istart_arr = new Array();
        bracketsArr = new Array();
        instrMap = new Map();
        customSlur = new Map();
        bracketGch = new Map();
        nodeKewMap = new Map();
        waveGch = new Map();
        staffOriKSF = 9999;
        staffKSF = 9999;
        my_node_index = 0;
        transYOffset = 0;
        lastLineNum = -1;
        showSD8 = false;

        currentKey = "";
        //        		source_val = document.getElementById("source").value;//有时候取不到值
        source_val = document.getElementById("source").value;
        weak_node_dur = 0;
        last_bar_time = 0;
      }
      bar_count = 0;
      handleUrl(file); //获取标题超链接
      var i,
        c,
        eol,
        end,
        select,
        line0,
        line1,
        last_info,
        opt,
        text,
        a,
        b,
        s,
        pscom,
        txt_add = "\n";

      function tune_selected() {
        var re,
          res,
          i = file.indexOf("K:", bol);
        if (i < 0) {
          return false;
        }
        i = file.indexOf("\n", i);
        if (parse.select.test(file.slice(parse.bol, i))) return true;
        re = /\n\w*\n/;
        re.lastIndex = i;
        res = re.exec(file);
        if (res) eol = re.lastIndex;
        else eol = eof;
        return false;
      }

      function uncomment(src, do_escape) {
        if (!src) return src;
        if (src.indexOf("%") >= 0)
          src = src.replace(/([^\\])%.*/, "$1").replace(/\\%/g, "%");
        src = src.replace(/\s+$/, "");
        if (do_escape && src.indexOf("\\") >= 0) return cnv_escape(src);
        return src;
      }

      function end_tune() {
        generate();
        if (info.W) put_words(info.W);
        put_history();
        parse.state = 0;
        blk_flush();
        cfmt = sav.cfmt;
        info = sav.info;
        char_tb = sav.char_tb;
        glovar = sav.glovar;
        maps = sav.maps;
        mac = sav.mac;
        maci = sav.maci;
        parse.tune_v_opts = null;
        parse.scores = null;
        init_tune();
        img.chg = true;
        set_page();
      }

      function do_voice(select, in_tune) {
        var opt, bol;
        if (select == "end") return;
        if (in_tune) {
          if (!parse.tune_v_opts) parse.tune_v_opts = {};
          opt = parse.tune_v_opts;
        } else {
          if (!parse.voice_opts) parse.voice_opts = {};
          opt = parse.voice_opts;
        }
        opt[select] = [];
        while (1) {
          bol = ++eol;
          if (file[bol] != "%") break;
          eol = file.indexOf("\n", eol);
          if (file[bol + 1] != line1) continue;
          bol += 2;
          if (eol < 0) text = file.slice(bol);
          else text = file.slice(bol, eol);
          a = text.match(/\S+/);
          switch (a[0]) {
            default:
              opt[select].push(uncomment(text, true));
              continue;
            case "score":
            case "staves":
            case "tune":
            case "voice":
              bol -= 2;
              break;
          }
          break;
        }
        eol = parse.eol = bol - 1;
        console.log("do_voice---e:", new Date().getTime());
      }

      function tune_filter() {
        console.log("tune_filter---s:", new Date().getTime());
        var o,
          opts,
          j,
          pc,
          h,
          i = file.indexOf("K:", bol);
        i = file.indexOf("\n", i);
        h = file.slice(parse.bol, i);
        for (i in parse.tune_opts) {
          if (!parse.tune_opts.hasOwnProperty(i)) continue;
          if (!new RegExp(i).test(h)) continue;
          opts = parse.tune_opts[i];
          for (j = 0; j < opts.t_opts.length; j++) {
            pc = opts.t_opts[j];
            switch (pc.match(/\S+/)[0]) {
              case "score":
              case "staves":
                if (!parse.scores) parse.scores = [];
                parse.scores.push(pc);
                break;
              default:
                self.do_pscom(pc);
                break;
            }
          }
          opts = opts.v_opts;
          if (!opts) continue;
          for (j in opts) {
            if (!opts.hasOwnProperty(j)) continue;
            if (!parse.tune_v_opts) parse.tune_v_opts = {};
            if (!parse.tune_v_opts[j]) parse.tune_v_opts[j] = opts[j];
            else parse.tune_v_opts[j] = parse.tune_v_opts[j].concat(opts[j]);
          }
        }
      }
      if (
        abc2svg.modules &&
        (abc2svg.modules.hooks.length || abc2svg.modules.g_hooks.length)
      )
        set_hooks();
      parse.file = file;
      parse.fname = in_fname;
      // 绘制谱子开始的位置
      console.log("开始的位置");
      isVoiceMerge = false;
      //  barVoiceNumArr=[];

      if (bol == undefined) bol = 0;
      if (!eof) eof = file.length;
      for (; bol < eof; bol = parse.eol + 1) {
        eol = file.indexOf("\n", bol);
        if (eol < 0 || eol > eof) eol = eof;
        parse.eol = eol;
        while (1) {
          eol--;
          switch (file[eol]) {
            case " ":
            case "\t":
              continue;
          }
          break;
        }
        eol++;
        if (eol == bol) {
          if (parse.state == 1) {
            parse.istart = bol;
            //                            syntax(1, "Empty line in tune header - ignored")
            syntax(1, "Empty line in tune header - ignored");
          } else if (parse.state >= 2) {
            end_tune();
            if (parse.select) {
              eol = file.indexOf("\nX:", parse.eol);
              if (eol < 0) eol = eof;
              parse.eol = eol;
            }
          }
          continue;
        }
        parse.istart = parse.bol = bol;
        parse.iend = eol;
        parse.line.index = 0;
        line0 = file[bol];
        line1 = file[bol + 1];
        if (line0 == "%") {
          if (parse.prefix.indexOf(line1) < 0) continue;
          if (
            file[bol + 2] == "a" &&
            file[bol + 3] == "b" &&
            file[bol + 4] == "c" &&
            file[bol + 5] == " "
          ) {
            bol += 6;
            line0 = file[bol];
            line1 = file[bol + 1];
          } else {
            pscom = true;
          }
        } else if (line0 == "I" && line1 == ":") {
          pscom = true;
        }
        if (pscom) {
          pscom = false;
          bol += 2;
          text = file.slice(bol, eol);
          a = text.match(/([^\s]+)\s*(.*)/);
          if (!a || a[1][0] == "%") continue;
          switch (a[1]) {
            case "abcm2ps":
            case "ss-pref":
              parse.prefix = a[2];
              continue;
            case "abc-include":
              do_include(uncomment(a[2]));
              continue;
          }
          if (a[1].slice(0, 5) == "begin") {
            b = a[1].substr(5);
            end = "\n" + line0 + line1 + "end" + b;
            i = file.indexOf(end, eol);
            if (i < 0) {
              syntax(1, "No $1 after %%$2", end.slice(1), a[1]);
              parse.eol = eof;
              continue;
            }
            do_begin_end(
              b,
              uncomment(a[2]),
              file
                .slice(eol + 1, i)
                .replace(new RegExp("^" + line0 + line1, "gm"), "")
            );
            parse.eol = file.indexOf("\n", i + 6);
            if (parse.eol < 0) parse.eol = eof;
            continue;
          }
          switch (a[1]) {
            case "select":
              if (parse.state != 0) {
                syntax(1, errs.not_in_tune, "%%select");
                continue;
              }
              select = uncomment(text.slice(7));
              if (select[0] == '"') select = select.slice(1, -1);
              if (!select) {
                delete parse.select;
                continue;
              }
              select = select.replace(/\(/g, "\\(");
              select = select.replace(/\)/g, "\\)");
              parse.select = new RegExp(select, "m");
              continue;
            case "tune":
              if (parse.state != 0) {
                syntax(1, errs.not_in_tune, "%%tune");
                continue;
              }
              select = uncomment(a[2]);
              if (!select) {
                parse.tune_opts = {};
                continue;
              }
              if (select == "end") continue;
              if (!parse.tune_opts) parse.tune_opts = {};
              parse.tune_opts[select] = opt = {
                t_opts: [],
              };
              while (1) {
                bol = ++eol;
                if (file[bol] != "%") break;
                eol = file.indexOf("\n", eol);
                if (file[bol + 1] != line1) continue;
                bol += 2;
                if (eol < 0) text = file.slice(bol);
                else text = file.slice(bol, eol);
                a = text.match(/([^\s]+)\s*(.*)/);
                switch (a[1]) {
                  case "tune":
                    break;
                  case "voice":
                    do_voice(uncomment(a[2], true), true);
                    continue;
                  default:
                    opt.t_opts.push(uncomment(text, true));
                    continue;
                }
                break;
              }
              if (parse.tune_v_opts) {
                opt.v_opts = parse.tune_v_opts;
                parse.tune_v_opts = null;
              }
              parse.eol = bol - 1;
              continue;
            case "voice":
              if (parse.state != 0) {
                syntax(1, errs.not_in_tune, "%%voice");
                continue;
              }
              select = uncomment(a[2]);
              if (!select) {
                parse.voice_opts = null;
                continue;
              }
              do_voice(select);
              continue;
          }
          do_pscom(uncomment(text, true));
          continue;
        }
        if (line1 != ":" || !/[A-Za-z+]/.test(line0)) {
          last_info = undefined;
          if (parse.state < 2) continue;
          parse.line.buffer = uncomment(file.slice(bol, eol), true);
          parse_music_line();
          continue;
        }
        bol += 2;
        while (1) {
          switch (file[bol]) {
            case " ":
            case "\t":
              bol++;
              continue;
          }
          break;
        }
        text = uncomment(file.slice(bol, eol), true);
        if (line0 == "+") {
          if (!last_info) {
            syntax(1, "+: without previous info field");
            continue;
          }
          txt_add = " ";
          line0 = last_info;
        }
        switch (line0) {
          case "X":
            if (parse.state != 0) {
              syntax(1, errs.ignored, line0);
              continue;
            }
            if (parse.select && !tune_selected()) {
              eol = file.indexOf("\nX:", parse.eol);
              if (eol < 0) eol = eof;
              parse.eol = eol;
              continue;
            }
            sav.cfmt = clone(cfmt);
            sav.info = clone(info, 2);
            sav.char_tb = clone(char_tb);
            sav.glovar = clone(glovar);
            sav.maps = clone(maps, 1);
            sav.mac = clone(mac);
            sav.maci = clone(maci);
            info.X = text;
            parse.state = 1;
            if (blkdiv < 1) blkdiv = 1;
            if (parse.tune_opts) tune_filter();
            continue;
          case "T":
            switch (parse.state) {
              case 0:
                continue;
              case 1:
              case 2:
                if (info.T == undefined) info.T = text;
                else info.T += "\n" + text;
                continue;
            }
            s = new_block("title");
            s.text = text;
            continue;
          case "K":
            switch (parse.state) {
              case 0:
                continue;
              case 1:
                info.K = text;
                break;
            }
            do_info(line0, text);
            continue;
          case "W":
            if (parse.state == 0 || cfmt.writefields.indexOf(line0) < 0) break;
            if (info.W == undefined) info.W = text;
            else info.W += txt_add + text;
            break;
          case "m":
            if (parse.state >= 2) {
              syntax(1, errs.ignored, line0);
              continue;
            }
            a = text.match(/(.*?)[= ]+(.*)/);
            if (!a || !a[2]) {
              syntax(1, errs.bad_val, "m:");
              continue;
            }
            mac[a[1]] = a[2];
            maci[a[1][0]] = true;
            break;
          case "s":
            if (parse.state != 3 || cfmt.writefields.indexOf(line0) < 0) break;
            get_sym(text, txt_add == " ");
            break;
          case "w":
            if (parse.state != 3 || cfmt.writefields.indexOf(line0) < 0) break;
            get_lyrics(text, txt_add == " ");
            if (text.slice(-1) == "\\") {
              txt_add = " ";
              last_info = line0;
              continue;
            }
            break;
          case "S": // create by lhj 打击乐象声词（拷贝歌词功能）
            if (parse.state != 3 || cfmt.writefields.indexOf(line0) < 0) break;
            get_strike(text, txt_add == " ");
            if (text.slice(-1) == "\\") {
              txt_add = " ";
              last_info = line0;
              continue;
            }
            break;
          case "N": // 小节图片配置 add by hxs
            //console.log("text:",text);
            if (parse.state != 3 || cfmt.writefields.indexOf(line0) < 0) break;
            get_note_pic(text, txt_add == " ");
            if (text.slice(-1) == "\\") {
              txt_add = " ";
              last_info = line0;
              continue;
            }
            break;
          case "|":
            if (parse.state < 2) continue;
            parse.line.buffer = text;
            parse_music_line();
            continue;
          default:
            if ("ABCDFGHNOSZ".indexOf(line0) >= 0) {
              if (parse.state >= 2) {
                syntax(1, errs.ignored, line0);
                continue;
              }
              if (!info[line0]) info[line0] = text;
              else info[line0] += txt_add + text;
              break;
            }
            do_info(line0, text);
            continue;
        }
        txt_add = "\n";
        last_info = line0;
      }
      if (musicType == 2 && user.jpEqualBars) {
        //如果是简谱，则直接加上小节对齐
        do_pscom(uncomment("equalbars 1", true));
      }

      if (include) return;
      if (parse.state >= 2) end_tune();
      parse.state = 0;
    }
    Abc.prototype.tosvg = tosvg;
    var gene,
      staff_tb,
      nstaff,
      tsnext,
      realwidth,
      insert_meter,
      spf_last,
      space_tb = new Float32Array([
        7, 10, 14.15, 20, 28.3, 40, 56.6, 80, 100, 120,
      ]),
      smallest_duration;
    var dx_tb = new Float32Array([10, 10, 11, 13, 13]);
    var hw_tb = new Float32Array([4.5, 5, 6, 7, 8]);
    var w_note = new Float32Array([3.5, 3.7, 5, 6, 7]);
    Abc.prototype.gene = function () {
      // create by lhj
      return gene;
    };
    function set_head_shift(s) {
      var i,
        i1,
        i2,
        d,
        ps,
        dx,
        dx_head = dx_tb[s.head],
        dir = s.stem,
        n = s.nhd;
      if (n == 0) return;
      dx = dx_head * 0.78;
      if (s.grace) dx *= 0.5;
      if (dir >= 0) {
        i1 = 1;
        i2 = n + 1;
        ps = s.notes[0].pit;
      } else {
        dx = -dx;
        i1 = n - 1;
        i2 = -1;
        ps = s.notes[n].pit;
      }
      var shift = false,
        dx_max = 0;
      for (i = i1; i != i2; i += dir) {
        d = s.notes[i].pit - ps;
        ps = s.notes[i].pit;
        if (d == 0) {
          if (shift) {
            var new_dx = (s.notes[i].shhd = s.notes[i - dir].shhd + dx);
            if (dx_max < new_dx) dx_max = new_dx;
            continue;
          }
          if (i + dir != i2 && ps + dir == s.notes[i + dir].pit) {
            s.notes[i].shhd = -dx;
            if (dx_max < -dx) dx_max = -dx;
            continue;
          }
        }
        if (d < 0) d = -d;
        if (d > 3 || (d >= 2 && s.head != C.SQUARE)) {
          shift = false;
        } else {
          shift = !shift;
          if (shift) {
            s.notes[i].shhd = dx;
            if (dx_max < dx) dx_max = dx;
          }
        }
      }
      s.xmx = dx_max;
    }
    function acc_shift(notes, dx_head) {
      var i,
        i1,
        dx,
        dx1,
        ps,
        p1,
        acc,
        n = notes.length;
      for (i = n - 1; --i >= 0; ) {
        dx = notes[i].shhd;
        if (!dx || dx > 0) continue;
        dx = dx_head - dx;
        ps = notes[i].pit;
        for (i1 = n; --i1 >= 0; ) {
          if (!notes[i1].acc) continue;
          p1 = notes[i1].pit;
          if (p1 < ps - 3) break;
          if (p1 > ps + 3) continue;
          if (notes[i1].shac < dx) notes[i1].shac = dx;
        }
      }
      for (i = n; --i >= 0; ) {
        acc = notes[i].acc;
        if (!acc) continue;
        dx = notes[i].shac;
        if (!dx) {
          dx = notes[i].shhd;
          if (dx < 0) dx = dx_head - dx;
          else dx = dx_head;
        }
        ps = notes[i].pit;
        for (i1 = n; --i1 > i; ) {
          if (!notes[i1].acc) continue;
          p1 = notes[i1].pit;
          if (p1 >= ps + 4) {
            if (p1 > ps + 4 || acc < 0 || notes[i1].acc < 0) continue;
          }
          if (dx > notes[i1].shac - 6) {
            dx1 = notes[i1].shac + 7;
            if (dx1 > dx) dx = dx1;
          }
        }
        notes[i].shac = dx;
      }
    }
    function set_acc_shft() {
      var s, s2, st, i, acc, st, t, dx_head, len;
      s = tsfirst;
      while (s) {
        if (s.type != C.NOTE || s.invis) {
          s = s.ts_next;
          continue;
        }
        st = s.st;
        t = s.time;
        acc = false;
        for (s2 = s; s2; s2 = s2.ts_next) {
          if (s2.time != t || s2.type != C.NOTE || s2.st != st) break;
          if (acc) continue;
          for (i = 0, len = s2.nhd; i <= len; i++) {
            if (s2.notes[i].acc) {
              acc = true;
              break;
            }
          }
        }
        if (!acc) {
          s = s2;
          continue;
        }
        dx_head = dx_tb[s.head];
        st = {
          notes: [],
        };
        for (; s != s2; s = s.ts_next) st.notes = st.notes.concat(s.notes);
        sort_pitch(st);
        acc_shift(st.notes, dx_head);
      }
    }
    function lkvsym(s, next) {
      s.next = next;
      s.prev = next.prev;
      if (s.prev) s.prev.next = s;
      else s.p_v.sym = s;
      next.prev = s;
    }
    function lktsym(s, next) {
      if (next) {
        s.ts_next = next;
        s.ts_prev = next.ts_prev;
        if (s.ts_prev) s.ts_prev.ts_next = s;
        next.ts_prev = s;
      } else {
        s.ts_next = s.ts_prev = null;
      }
    }
    function unlksym(s) {
      if (s.next) s.next.prev = s.prev;
      if (s.prev) s.prev.next = s.next;
      else s.p_v.sym = s.next;
      if (s.ts_next) {
        if (s.seqst) {
          if (s.ts_next.seqst) {
            s.ts_next.shrink += s.shrink;
            s.ts_next.space += s.space;
          } else {
            s.ts_next.seqst = true;
            s.ts_next.shrink = s.shrink;
            s.ts_next.space = s.space;
          }
        }
        s.ts_next.ts_prev = s.ts_prev;
      }
      if (s.ts_prev) s.ts_prev.ts_next = s.ts_next;
      if (tsfirst == s) tsfirst = s.ts_next;
      if (tsnext == s) tsnext = s.ts_next;
    }
    function insert_clef(s, clef_type, clef_line) {
      var p_voice = s.p_v,
        new_s,
        st = s.st;
      if (
        s.type == C.BAR &&
        s.prev &&
        s.prev.type == C.BAR &&
        s.prev.bar_type[0] != ":"
      )
        s = s.prev;
      p_voice.last_sym = s.prev;
      if (!p_voice.last_sym) p_voice.sym = null;
      p_voice.time = s.time;
      new_s = sym_add(p_voice, C.CLEF);
      new_s.next = s;
      s.prev = new_s;
      new_s.clef_type = clef_type;
      new_s.clef_line = clef_line;
      new_s.st = st;
      new_s.clef_small = true;
      delete new_s.second;
      new_s.notes = [];
      new_s.notes[0] = {
        pit: s.notes[0].pit,
      };
      new_s.nhd = 0;
      while (!s.seqst) s = s.ts_prev;
      lktsym(new_s, s);
      if (new_s.ts_prev.type != C.CLEF) new_s.seqst = true;
      return new_s;
    }
    function set_float() {
      var p_voice, st, staff_chg, v, s, s1, up, down;
      for (v = 0; v < voice_tb.length; v++) {
        p_voice = voice_tb[v];
        staff_chg = false;
        st = p_voice.st;
        for (s = p_voice.sym; s; s = s.next) {
          if (!s.floating) {
            while (s && !s.floating) s = s.next;
            if (!s) break;
            staff_chg = false;
          }
          if (!s.dur) {
            if (staff_chg) s.st++;
            continue;
          }
          if (s.notes[0].pit >= 19) {
            staff_chg = false;
            continue;
          }
          if (s.notes[s.nhd].pit <= 12) {
            staff_chg = true;
            s.st++;
            continue;
          }
          up = 127;
          for (s1 = s.ts_prev; s1; s1 = s1.ts_prev) {
            if (s1.st != st || s1.v == s.v) break;
            if (s1.type == C.NOTE)
              if (s1.notes[0].pit < up) up = s1.notes[0].pit;
          }
          if (up == 127) {
            if (staff_chg) s.st++;
            continue;
          }
          if (s.notes[s.nhd].pit > up - 3) {
            staff_chg = false;
            continue;
          }
          down = -127;
          for (s1 = s.ts_next; s1; s1 = s1.ts_next) {
            if (s1.st != st + 1 || s1.v == s.v) break;
            if (s1.type == C.NOTE)
              if (s1.notes[s1.nhd].pit > down) down = s1.notes[s1.nhd].pit;
          }
          if (down == -127) {
            if (staff_chg) s.st++;
            continue;
          }
          if (s.notes[0].pit < down + 3) {
            staff_chg = true;
            s.st++;
            continue;
          }
          up -= s.notes[s.nhd].pit;
          down = s.notes[0].pit - down;
          if (!staff_chg) {
            if (up < down + 3) continue;
            staff_chg = true;
          } else {
            if (up < down - 3) {
              staff_chg = false;
              continue;
            }
          }
          s.st++;
        }
      }
    }
    function set_graceoffs(s) {
      var next,
        m,
        dx,
        x,
        gspleft = cfmt.gracespace[0],
        gspinside = cfmt.gracespace[1],
        gspright = cfmt.gracespace[2],
        g = s.extra;
      if (s.prev && s.prev.type == C.BAR) gspleft -= 3;
      x = gspleft;
      g.beam_st = true;
      for (; ; g = g.next) {
        set_head_shift(g);
        acc_shift(g.notes, 7);
        dx = 0;
        for (m = g.nhd; m >= 0; m--) {
          if (g.notes[m].shac > dx) dx = g.notes[m].shac;
        }
        x += dx;
        g.x = x;
        if (g.nflags <= 0) {
          g.beam_st = true;
          g.beam_end = true;
        }
        next = g.next;
        if (!next) {
          g.beam_end = true;
          break;
        }
        if (next.nflags <= 0) g.beam_end = true;
        if (g.beam_end) {
          next.beam_st = true;
          x += gspinside / 4;
        }
        if (g.nflags <= 0) x += gspinside / 4;
        if (g.y > next.y + 8) x -= 1.5;
        x += gspinside;
      }
      next = s.next;
      if (next && next.type == C.NOTE) {
        if (g.y >= 3 * (next.notes[next.nhd].pit - 18)) gspright -= 1;
        else if (g.beam_st && g.y < 3 * (next.notes[next.nhd].pit - 18) - 4)
          gspright += 2;
      }
      x += gspright;
      return x;
    }
    function set_w_chs(s) {
      var i,
        ch,
        w0,
        s0,
        dw,
        x = 0,
        n = 0,
        len;
      for (; s; s = s.ts_next) {
        if (s.shrink) {
          x += s.shrink;
          n++;
        }
        if (!s.a_gch) continue;
        for (i = 0, len = s.a_gch.length; i < len; i++) {
          ch = s.a_gch[i];
          if (ch.type != "g" || ch.y < 0) continue;
          if (w0) {
            if (w0 > x + ch.x) {
              dw = (w0 - x - ch.x) / n;
              while (1) {
                s0 = s0.ts_next;
                if (s0.shrink) s0.shrink += dw;
                if (s0 == s) break;
              }
            }
          }
          s0 = s;
          w0 = ch.wh[0];
          n = 0;
          x = 0;
          break;
        }
      }
    }
    function gchord_width(s, wlnote, wlw) {
      var s2,
        gch,
        w,
        wl,
        ix,
        lspc = 0,
        rspc = 0,
        alspc = 0,
        arspc = 0;
      for (ix = 0; ix < s.a_gch.length; ix++) {
        gch = s.a_gch[ix];
        switch (gch.type) {
          default:
            wl = -gch.x;
            if (wl > lspc) lspc = wl;
            w = gch.w + 2 - wl;
            if (w > rspc) rspc = w;
            break;
          case "<":
            w = gch.w + wlnote;
            if (w > alspc) alspc = w;
            break;
          case ">":
            w = gch.w + s.wr;
            if (w > arspc) arspc = w;
            break;
        }
      }
      s2 = s.prev;
      if (s2) {
        if (s2.a_gch) {
          for (s2 = s.ts_prev; ; s2 = s2.ts_prev) {
            if (s2 == s.prev) {
              if (wlw < lspc) wlw = lspc;
              break;
            }
            if (s2.seqst) lspc -= s2.shrink;
          }
        }
        if (alspc != 0) if (wlw < alspc) wlw = alspc;
      }
      s2 = s.next;
      if (s2) {
        if (s2.a_gch) {
          for (s2 = s.ts_next; ; s2 = s2.ts_next) {
            if (s2 == s.next) {
              if (s.wr < rspc) s.wr = rspc;
              break;
            }
            if (s2.seqst) rspc -= 8;
          }
        }
        if (arspc != 0) if (s.wr < arspc) s.wr = alspc;
      }
      return wlw;
    }
    function set_width(s) {
      var s2,
        i,
        m,
        xx,
        w,
        wlnote,
        wlw,
        acc,
        bar_type,
        meter,
        last_acc,
        n1,
        n2,
        esp,
        tmp,
        len;
      if (s.play) {
        s.wl = s.wr = 0;
        return;
      }
      switch (s.type) {
        case C.NOTE:
        case C.REST:
          //s.wr = wlnote = hw_tb[s.head];
          var tmp = hw_tb[s.head];
          s.wr = tmp;
          wlnote = tmp;
          if (s.xmx > 0) {
            s.wr += s.xmx + 4;
          }
          for (s2 = s.prev; s2; s2 = s2.prev) {
            if (w_tb[s2.type] != 0) break;
          }
          if (s2) {
            switch (s2.type) {
              case C.BAR:
              case C.CLEF:
              case C.KEY:
              case C.METER:
                wlnote += 3;
                break;
            }
          }
          for (m = 0, len = s.nhd; m <= len; m++) {
            xx = s.notes[m].shhd;
            if (xx < 0) {
              if (wlnote < -xx + 5) wlnote = -xx + 5;
            }
            if (s.notes[m].acc) {
              tmp = s.notes[m].shac + (s.notes[m].micro ? 5.5 : 3.5);
              if (wlnote < tmp) wlnote = tmp;
            }
          }
          if (s2) {
            switch (s2.type) {
              case C.BAR:
              case C.CLEF:
              case C.KEY:
              case C.METER:
                wlnote -= 3;
                break;
            }
          }
          if (s.a_dd) wlnote += deco_width(s);
          if (s.beam_st && s.beam_end && s.stem > 0 && s.nflags > 0) {
            if (s.wr < s.xmx + 9) s.wr = s.xmx + 9;
          }
          if (s.dots) {
            if (s.wl == undefined)
              switch (s.head) {
                case C.SQUARE:
                case C.OVALBARS:
                  s.xmx += 3;
                  break;
                case C.OVAL:
                  s.xmx += 1;
                  break;
              }
            if (s.wr < s.xmx + 8) s.wr = s.xmx + 8;
            if (s.dots >= 2) s.wr += 3.5 * (s.dots - 1);
          }
          if (s.trem2 && s.beam_end && wlnote < 20) wlnote = 20;
          wlw = wlnote;
          if (s2) {
            switch (s2.type) {
              case C.NOTE:
                if (s2.stem > 0 && s.stem < 0) {
                  if (wlw < 7) wlw = 7;
                }
                if ((s.y > 27 && s2.y > 27) || (s.y < -3 && s2.y < -3)) {
                  if (wlw < 6) wlw = 6;
                }
                if (s2.tie) {
                  if (wlw < 14) wlw = 14;
                }
                break;
              case C.CLEF:
                if (s2.second || s2.clef_small) break;
                wlw += 8;
                break;
              case C.KEY:
                wlw += 4;
                break;
            }
          }
          if (s.a_gch) wlw = gchord_width(s, wlnote, wlw);
          if (s.a_ly) wlw = ly_width(s, wlw);
          if (s.a_pic) {
            // create by lhj
            wlw = pic_width(s, wlw);
          }
          if (s2 && s2.type == C.GRACE) {
            s.wl = wlnote - 4.5;
          } else {
            s.wl = wlw;
          }
          s.wr *= myspace; //设置小节宽度 add by hxs 2021-5-6
          return;
        case C.SPACE:
          xx = s.width / 2;
          s.wr = xx;
          if (s.a_gch) xx = gchord_width(s, xx, xx);
          if (s.a_dd) xx += deco_width(s);
          s.wl = xx;
          return;
        case C.BAR:
          bar_type = s.bar_type;
          switch (bar_type) {
            case "|":
              w = 5;
              break;
            default:
              w = 2 + 2.8 * bar_type.length;
              for (i = 0; i < bar_type.length; i++) {
                switch (bar_type[i]) {
                  case "[":
                  case "]":
                    w += 3;
                    break;
                  case ":":
                    w += 2;
                    break;
                }
              }
              break;
          }
          s.wl = w;
          if (s.next && s.next.type != C.METER) s.wr = 7;
          else s.wr = 5;
          for (s2 = s.prev; s2; s2 = s2.prev) {
            if (w_tb[s2.type] != 0) {
              if (s2.type == C.GRACE) s.wl -= 8;
              break;
            }
          }
          if (s.a_dd) s.wl += deco_width(s);
          if (s.text && s.text.length < 4 && s.next && s.next.a_gch) {
            set_font("repeat");
            s.wr += strwh(s.text)[0] + 2;
          }
          s.wr *= myspace; //设置小节宽度 add by hxs 2021-5-6
          return;
        case C.CLEF:
          if (s.invis) {
            s.wl = s.wr = 1;
            return;
          }
          s.wl = s.clef_small ? 9 : 12;
          s.wr = s.clef_small ? 7 : 12;
          return;
        case C.KEY:
          if ((!s.k_a_acc && !s.k_sf && !s.k_old_sf) || s.k_none || s.k_play) {
            s.wl = s.wr = 0;
            return;
          }
          s.wl = 3;
          esp = 4;
          if (!s.k_a_acc) {
            n1 = s.k_sf;
            if (s.k_old_sf && (cfmt.cancelkey || n1 == 0)) n2 = s.k_old_sf;
            else n2 = 0;
            if (n1 * n2 >= 0) {
              if (n1 < 0) n1 = -n1;
              if (n2 < 0) n2 = -n2;
              if (n2 > n1) n1 = n2;
            } else {
              n1 -= n2;
              if (n1 < 0) n1 = -n1;
              esp += 3;
            }
          } else {
            n1 = n2 = s.k_a_acc.length;
            if (n2) last_acc = s.k_a_acc[0].acc;
            for (i = 1; i < n2; i++) {
              acc = s.k_a_acc[i];
              if (
                acc.pit > s.k_a_acc[i - 1].pit + 6 ||
                acc.pit < s.k_a_acc[i - 1].pit - 6
              )
                n1--;
              else if (acc.acc != last_acc) esp += 3;
              last_acc = acc.acc;
            }
          }
          s.wr = 5.5 * n1 + esp;
          return;
        case C.METER:
          wlw = 0;
          s.x_meter = [];
          for (i = 0; i < s.a_meter.length; i++) {
            meter = s.a_meter[i];
            switch (meter.top[0]) {
              case "C":
              case "c":
              case "o":
                s.x_meter[i] = wlw + 6;
                wlw += 12;
                break;
              case ".":
              case "|":
                s.x_meter[i] = s.x_meter[i - 1];
                break;
              default:
                w = 0;
                if (!meter.bot || meter.top.length > meter.bot.length)
                  meter = meter.top;
                else meter = meter.bot;
                for (m = 0; m < meter.length; m++) {
                  switch (meter[m]) {
                    case "(":
                      wlw += 4;
                    case ")":
                    case "1":
                      w += 4;
                      break;
                    default:
                      w += 12;
                      break;
                  }
                }
                s.x_meter[i] = wlw + w / 2;
                wlw += w;
            }
          }
          s.wl = 0;
          s.wr = wlw + 6;
          return;
        case C.MREST:
          s.wl = 6;
          s.wr = 66;
          return;
        case C.GRACE:
          if (s.invis) break;
          s.wl = set_graceoffs(s);
          s.wr = 0;
          if (s.a_ly) ly_width(s, wlw);
          return;
        case C.STBRK:
          s.wl = s.xmx;
          if (s.next && s.next.type == C.CLEF) {
            s.wr = 2;
            delete s.next.clef_small;
          } else {
            s.wr = 8;
          }
          return;
        case C.CUSTOS:
          s.wl = s.wr = 4;
          return;
        case C.TEMPO:
          tempo_build(s);
          break;
        case C.BLOCK:
        case C.PART:
        case C.REMARK:
        case C.STAVES:
          break;
        default:
          //                    error(2, s, "set_width - Cannot set width for symbol $1", s.type)
          error(2, s, " 对象无法设置宽度 $1", s.type);
          break;
      }
      s.wl = s.wr = 0;
    }
    function time2space(s, len) {
      var i, l, space;
      if (smallest_duration >= C.BLEN / 2) {
        if (smallest_duration >= C.BLEN) len /= 4;
        else len /= 2;
      } else if (!s.next && len >= C.BLEN) {
        len /= 2;
      }
      if (len >= C.BLEN / 4) {
        if (len < C.BLEN / 2) i = 5;
        else if (len < C.BLEN) i = 6;
        else if (len < C.BLEN * 2) i = 7;
        else if (len < C.BLEN * 4) i = 8;
        else i = 9;
      } else {
        if (len >= C.BLEN / 8) i = 4;
        else if (len >= C.BLEN / 16) i = 3;
        else if (len >= C.BLEN / 32) i = 2;
        else if (len >= C.BLEN / 64) i = 1;
        else i = 0;
      }
      l = len - ((C.BLEN / 16 / 8) << i);
      space = space_tb[i];
      if (l) {
        if (l < 0) {
          space = (space_tb[0] * len) / (C.BLEN / 16 / 8);
        } else {
          if (i >= 9) i = 8;
          space +=
            ((space_tb[i + 1] - space_tb[i]) * l) / ((C.BLEN / 16 / 8) << i);
        }
      }
      return space;
    }

    // 设置音符的间隙
    function set_space(s) {
      var s2,
        i,
        l,
        space,
        prev_time = s.ts_prev.time,
        len = s.time - prev_time;
      if (s.in_tuplet && s.prev.time != prev_time) len *= 0.5;
      if (len == 0) {
        switch (s.type) {
          case C.MREST:
            return s.wl;
        }
        return 0;
      }
      if (s.ts_prev.type == C.MREST) return 71;
      if (smallest_duration >= C.BLEN / 2) {
        if (smallest_duration >= C.BLEN) len /= 4;
        else len /= 2;
      } else if (!s.next && len >= C.BLEN) {
        len /= 2;
      }
      if (len >= C.BLEN / 4) {
        if (len < C.BLEN / 2) i = 5;
        else if (len < C.BLEN) i = 6;
        else if (len < C.BLEN * 2) i = 7;
        else if (len < C.BLEN * 4) i = 8;
        else i = 9;
      } else {
        if (len >= C.BLEN / 8) i = 4;
        else if (len >= C.BLEN / 16) i = 3;
        else if (len >= C.BLEN / 32) i = 2;
        else if (len >= C.BLEN / 64) i = 1;
        else i = 0;
      }
      l = len - ((C.BLEN / 16 / 8) << i);
      space = space_tb[i];
      //  console.log('space_tb--',space_tb);
      if (s.notespace) {
        space *= s.notespace;
      }
      if (l != 0) {
        if (l < 0) {
          space = (space_tb[0] * len) / (C.BLEN / 16 / 8);
        } else {
          if (i >= 9) i = 8;
          space += ((space_tb[i + 1] - space_tb[i]) * l) / len;
        }
      }
      while (!s.dur) {
        switch (s.type) {
          case C.BAR:
            return space * 0.9 - 7;
          case C.CLEF:
            return space - s.wl - s.wr;
          case C.BLOCK:
          case C.PART:
          case C.REMARK:
          case C.STAVES:
          case C.TEMPO:
            s = s.ts_next;
            if (!s) return space;
            continue;
        }
        break;
      }
      if (!s.beam_st) space *= 0.9;
      if (s.type == C.NOTE && s.nflags >= -1 && s.stem > 0) {
        var stemdir = true;
        for (s2 = s.ts_prev; s2 && s2.time == prev_time; s2 = s2.ts_prev) {
          if (s2.type == C.NOTE && (s2.nflags < -1 || s2.stem > 0)) {
            stemdir = false;
            break;
          }
        }
        if (stemdir) {
          for (s2 = s.ts_next; s2 && s2.time == s.time; s2 = s2.ts_next) {
            if (s2.type == C.NOTE && (s2.nflags < -1 || s2.stem < 0)) {
              stemdir = false;
              break;
            }
          }
          if (stemdir) space *= 0.9;
        }
      }
      return space;
    }
    function set_sp_tup(s, s_et) {
      var s2,
        tim = s.time,
        endtime = s_et.time + s_et.dur,
        ttim = endtime - tim,
        space = (time2space(s, ttim / s.tp[0].q) * s.tp[0].q) / ttim;
      do {
        s = s.ts_next;
      } while (!s.seqst);
      do {
        if (!s_et.ts_next) {
          s2 = add_end_bar(s_et);
          s_et = s2;
        } else {
          s_et = s_et.ts_next;
        }
      } while (!s_et.seqst);
      s2 = s;
      while (1) {
        if (s2.dur && s2.dur * space < s2.shrink) space = s2.shrink / s2.dur;
        if (s2 == s_et) break;
        s2 = s2.ts_next;
      }
      while (1) {
        if (s.seqst) {
          s.space = (s.time - tim) * space;
          tim = s.time;
        }
        if (s == s_et) break;
        s = s.ts_next;
      }
    }
    function add_end_bar(s) {
      var bar = {
        type: C.BAR,
        bar_type: "|",
        fname: s.fname,
        istart: s.istart,
        iend: s.iend,
        v: s.v,
        p_v: s.p_v,
        st: s.st,
        dur: 0,
        seqst: true,
        invis: true,
        time: s.time + s.dur,
        nhd: 0,
        notes: [
          {
            pit: s.notes[0].pit,
          },
        ],
        wl: 0,
        wr: 0,
        prev: s,
        ts_prev: s,
        shrink: s.wr + 3,
      };
      s.next = s.ts_next = bar;
      return bar;
    }
    function set_allsymwidth() {
      var maxx,
        new_val,
        s_tupc,
        s_tupn,
        st,
        s_chs,
        tim,
        s = tsfirst,
        s2 = s,
        xa = 0,
        xl = [],
        wr = [],
        ntup = 0;
      maxx = xa;
      tim = s.time;
      while (1) {
        do {
          if (s.a_gch && !s_chs) s_chs = s;
          set_width(s);
          st = s.st;
          if (xl[st] == undefined) xl[st] = 0;
          if (wr[st] == undefined) wr[st] = 0;
          new_val = xl[st] + wr[st] + s.wl;
          if (new_val > maxx) maxx = new_val;
          s = s.ts_next;
        } while (s && !s.seqst);
        s2.shrink = maxx - xa;
        if (!ntup) s2.space = s2.ts_prev ? set_space(s2, tim) : 0;
        if (!s2.shrink && !s2.space && s2.type == C.CLEF) {
          delete s2.seqst;
          s2.time = tim;
        }
        tim = s2.time;
        if (!s) break;
        for (st = 0; st < wr.length; st++) wr[st] = 0;
        xa = maxx;
        do {
          st = s2.st;
          xl[st] = xa;
          if (s2.wr > wr[st]) wr[st] = s2.wr;
          if (s2.tp) {
            if (!ntup && !s_tupc) s_tupc = s2;
            ntup += s2.tp.length;
          }
          if (s2.tpe) ntup -= s2.tpe;
          s2 = s2.ts_next;
        } while (!s2.seqst);
      }
      if (s_chs) set_w_chs(s_chs);
      s = s_tupc;
      if (!s) return;
      do {
        s2 = s;
        ntup = 0;
        while (1) {
          if (s.tp) ntup += s.tp.length;
          if (s.tpe) ntup -= s.tpe;
          if (!ntup) break;
          s = s.ts_next;
        }
        set_sp_tup(s2, s);
        do {
          s = s.ts_next;
        } while (s && !s.tp);
      } while (s);
    }
    function to_rest(so) {
      var s = clone(so);
      s.prev.next = so.ts_prev = so.prev = s.ts_prev.ts_next = s;
      s.next = s.ts_next = so;
      so.seqst = false;
      so.invis = so.play = true;
      s.type = C.REST;
      delete s.in_tuplet;
      delete s.sl1;
      delete s.a_dd;
      delete s.a_gch;
      delete s.sls;
      return s;
    }
    function set_repeat(s) {
      var s2,
        s3,
        i,
        j,
        dur,
        n = s.repeat_n,
        k = s.repeat_k,
        st = s.st,
        v = s.v;
      s.repeat_n = 0;
      if (n < 0) {
        n = -n;
        i = n;
        for (s3 = s.prev; s3; s3 = s3.prev) {
          if (!s3.dur) {
            if (s3.type == C.BAR) {
              error(1, s3, "Bar in repeat sequence");
              return;
            }
            continue;
          }
          if (--i <= 0) break;
        }
        if (!s3) {
          error(1, s, errs.not_enough_n);
          return;
        }
        dur = s.time - s3.time;
        i = k * n;
        for (s2 = s; s2; s2 = s2.next) {
          if (!s2.dur) {
            if (s2.type == C.BAR) {
              error(1, s2, "Bar in repeat sequence");
              return;
            }
            continue;
          }
          if (--i <= 0) break;
        }
        if (!s2 || !s2.next) {
          error(1, s, errs.not_enough_n);
          return;
        }
        for (s2 = s.prev; s2 != s3; s2 = s2.prev) {
          if (s2.type == C.NOTE) {
            s2.beam_end = true;
            break;
          }
        }
        for (j = k; --j >= 0; ) {
          i = n;
          if (s.dur) i--;
          s2 = s.ts_next;
          while (i > 0) {
            if (s2.st == st) {
              s2.invis = s2.play = true;
              if (s2.seqst && s2.ts_next.seqst) s2.seqst = false;
              if (s2.v == v && s2.dur) i--;
            }
            s2 = s2.ts_next;
          }
          s = to_rest(s);
          s.dur = s.notes[0].dur = dur;
          s.rep_nb = -1;
          s.beam_st = true;
          set_width(s);
          s.head = C.SQUARE;
          for (s = s2; s; s = s.ts_next) {
            if (s.st == st && s.v == v && s.dur) break;
          }
        }
        return;
      }
      i = n;
      for (s2 = s.prev.prev; s2; s2 = s2.prev) {
        if (s2.type == C.BAR || s2.time == tsfirst.time) {
          if (--i <= 0) break;
        }
      }
      if (!s2) {
        error(1, s, errs.not_enough_m);
        return;
      }
      dur = s.time - s2.time;
      if (n == 1) i = k;
      else i = n;
      for (s2 = s; s2; s2 = s2.next) {
        if (s2.type == C.BAR) {
          if (--i <= 0) break;
        }
      }
      if (!s2) {
        error(1, s, errs.not_enough_m);
        return;
      }
      i = k;
      if (n == 2 && i > 1) {
        s2 = s2.next;
        if (!s2) {
          error(1, s, errs.not_enough_m);
          return;
        }
        s2.repeat_n = n;
        s2.repeat_k = --i;
      }
      dur /= n;
      if (n == 2) {
        s3 = s;
        for (s2 = s.ts_next; ; s2 = s2.ts_next) {
          if (s2.st != st) continue;
          if (s2.type == C.BAR) {
            if (s2.v == v) break;
            continue;
          }
          s2.invis = s2.play = true;
          if (s2.seqst && s2.ts_next.seqst) s2.seqst = false;
        }
        s3 = to_rest(s3);
        s3.dur = s3.notes[0].dur = dur;
        s3.invis = true;
        s2.bar_mrep = 2;
        s3 = s2.next;
        for (s2 = s3.ts_next; ; s2 = s2.ts_next) {
          if (s2.st != st) continue;
          if (s2.type == C.BAR) {
            if (s2.v == v) break;
            continue;
          }
          s2.invis = s2.play = true;
          if (s2.seqst && s2.ts_next.seqst) s2.seqst = false;
        }
        s3 = to_rest(s3);
        s3.dur = s3.notes[0].dur = dur;
        s3.invis = true;
        set_width(s3);
        return;
      }
      s3 = s;
      for (j = k; --j >= 0; ) {
        for (s2 = s3.ts_next; ; s2 = s2.ts_next) {
          if (s2.st != st) continue;
          if (s2.type == C.BAR) {
            if (s2.v == v) break;
            continue;
          }
          s2.invis = s2.play = true;
          if (s2.seqst && s2.ts_next.seqst) s2.seqst = false;
        }
        s3 = to_rest(s3);
        s3.dur = s3.notes[0].dur = dur;
        s3.beam_st = true;
        if (k == 1) {
          s3.rep_nb = 1;
          break;
        }
        s3.rep_nb = k - j + 1;
        s3 = s2.next;
      }
    }
    function custos_add(s) {
      var p_voice,
        new_s,
        i,
        s2 = s;
      while (1) {
        if (s2.type == C.NOTE) break;
        s2 = s2.next;
        if (!s2) return;
      }
      p_voice = s.p_v;
      p_voice.last_sym = s.prev;
      p_voice.time = s.time;
      new_s = sym_add(p_voice, C.CUSTOS);
      new_s.next = s;
      s.prev = new_s;
      lktsym(new_s, s);
      new_s.seqst = true;
      new_s.shrink = s.shrink;
      if (new_s.shrink < 8 + 4) new_s.shrink = 8 + 4;
      new_s.space = s2.space;
      new_s.wl = 0;
      new_s.wr = 4;
      new_s.nhd = s2.nhd;
      new_s.notes = [];
      for (i = 0; i < s.notes.length; i++) {
        new_s.notes[i] = {
          pit: s2.notes[i].pit,
          shhd: 0,
          dur: C.BLEN / 4,
        };
      }
      new_s.stemless = true;
    }
    function set_nl(s) {
      var s2, s3, p_voice, done;

      function set_eol(s) {
        if (cfmt.custos && voice_tb.length == 1) custos_add(s);
        s.nl = true;
      }

      function set_eol_next(s) {
        if (!s.next) {
          set_eol(s);
          return s;
        }
        for (s = s.ts_next; s; s = s.ts_next) {
          if (s.seqst) {
            set_eol(s);
            break;
          }
        }
        return s;
      }
      while (s) {
        if (!s.ts_next) return;
        if (s.ts_next.seqst) break;
        s = s.ts_next;
      }
      if (cfmt.keywarn || cfmt.timewarn) {
        for (s2 = s.ts_next; s2; s2 = s2.ts_next) {
          switch (s2.type) {
            case C.BAR:
            case C.CLEF:
              continue;
            case C.KEY:
              if (
                !cfmt.keywarn ||
                (!s2.k_a_acc && !s2.k_sf && !s2.k_old_sf) ||
                s2.k_none ||
                s2.k_play
              )
                continue;
            case C.METER:
              if (s2.type == C.METER && !cfmt.timewarn) continue;
              s3 = s2.ts_prev;
              if (s3 == s) {
                s = s2;
                continue;
              }
              unlksym(s2);
              lktsym(s2, s.ts_next);
              s = s2;
              while (1) {
                s2 = s2.ts_prev;
                if (s2.v == s.v) {
                  s.next = s2.next;
                  s.prev = s2;
                  s.next.prev = s;
                  s2.next = s;
                  break;
                }
              }
              if (s.type != s.ts_prev.type) {
                if (!s.seqst) {
                  s.seqst = true;
                  s.shrink = s.wl + s.prev.wr;
                  s.space = s.ts_next.space;
                  s.ts_next.space = 0;
                }
              } else {
                delete s.seqst;
              }
              s2 = s3;
              continue;
          }
          if (w_tb[s2.type]) break;
        }
      }
      switch (s.type) {
        case C.CLEF:
        case C.BAR:
        case C.STAVES:
          break;
        case C.GRACE:
          s = s.next;
          if (!s) return s;
        default:
          return set_eol_next(s);
      }
      for (; s; s = s.ts_prev) {
        if (s.seqst && s.type != C.CLEF) break;
      }
      done = 0;
      for (; ; s = s.ts_next) {
        if (!s) return s;
        if (!s.seqst) continue;
        if (done < 0) break;
        switch (s.type) {
          case C.STAVES:
            if (s.ts_prev && s.ts_prev.type == C.BAR) break;
            while (s.ts_next) {
              if (w_tb[s.ts_next.type] != 0 && s.ts_next.type != C.CLEF) break;
              s = s.ts_next;
            }
            if (!s.ts_next || s.ts_next.type != C.BAR) continue;
            s = s.ts_next;
          case C.BAR:
            if (done) break;
            done = 1;
            continue;
          case C.STBRK:
            if (!s.stbrk_forced) unlksym(s);
            else done = -1;
            continue;
          case C.CLEF:
            if (done) break;
            continue;
          default:
            if (!done || (s.prev && s.prev.type == C.GRACE)) continue;
            break;
        }
        break;
      }
      set_eol(s);
      return s;
    }
    function get_ck_width() {
      var r0,
        r1,
        p_voice = voice_tb[0];
      set_width(p_voice.clef);
      set_width(p_voice.key);
      set_width(p_voice.meter);
      return [
        p_voice.clef.wl + p_voice.clef.wr + p_voice.key.wl + p_voice.key.wr,
        p_voice.meter.wl + p_voice.meter.wr,
      ];
    }
    function get_width(s, last) {
      var shrink,
        space,
        w = 0,
        wmx = 0,
        sp_fac = 1 - cfmt.maxshrink;
      do {
        if (s.seqst) {
          shrink = s.shrink;
          wmx += shrink;
          if ((space = s.space) < shrink) w += shrink;
          else w += shrink * cfmt.maxshrink + space * sp_fac;
          s.x = w;
        }
        if (s == last) break;
        s = s.ts_next;
      } while (s);
      if (last) wmx += last.wr;
      return [w, wmx];
    }
    function set_lines(s, last, lwidth, indent) {
      var first,
        s2,
        s3,
        x,
        xmin,
        xmid,
        xmax,
        wwidth,
        shrink,
        space,
        ws,
        nlines,
        cut_here;
      if (
        cfmt.keywarn &&
        last &&
        last.type == C.BAR &&
        last.next &&
        last.next.time == last.next.time &&
        last.next.type == C.KEY
      )
        last = last.next;
      ws = get_width(s, last);
      if (ws[1] + indent < lwidth) {
        if (last) last = set_nl(last);
        return last;
      }
      wwidth = ws[0] + indent;
      while (1) {
        nlines = Math.ceil(wwidth / lwidth);
        if (nlines <= 1) {
          if (last) last = set_nl(last);
          return last;
        }
        s2 = first = s;
        xmin = s.x - s.shrink - indent;
        xmax = xmin + lwidth;
        xmid = xmin + wwidth / nlines;
        xmin += (wwidth / nlines) * cfmt.breaklimit;
        for (s = s.ts_next; s != last; s = s.ts_next) {
          if (!s.x) continue;
          if (s.type == C.BAR) s2 = s;
          if (s.x >= xmin) break;
        }
        if (s == last) {
          if (last) last = set_nl(last);
          return last;
        }
        cut_here = false;
        s3 = null;
        for (; s != last; s = s.ts_next) {
          x = s.x;
          if (!x) continue;
          if (x > xmax) break;
          if (s.type != C.BAR) continue;
          if (x < xmid) {
            s3 = s;
            continue;
          }
          if (!s3 || x - xmid < xmid - s3.x) s3 = s;
          break;
        }
        if (s3) {
          s = s3;
          cut_here = true;
        }
        if (!cut_here) {
          var beam = 0,
            bar_time = s2.time;
          xmax -= 8;
          s = s2;
          s3 = null;
          for (; s != last; s = s.ts_next) {
            if (s.beam_st) beam++;
            if (s.beam_end && beam > 0) beam--;
            x = s.x;
            if (!x) continue;
            if (x + s.wr >= xmax) break;
            if (beam || s.in_tuplet) continue;
            if ((s.time - bar_time) % (C.BLEN / 4) == 0) {
              s3 = s;
              continue;
            }
            if (!s3 || s.x < xmid) {
              s3 = s;
              continue;
            }
            if (s3 > xmid) break;
            if (xmid - s3.x < s.x - xmid) break;
            s3 = s;
            break;
          }
          if (s3 && s3.type == C.BAR) {
            s = s3;
            cut_here = true;
          }
        }
        if (!cut_here) {
          s3 = s = s2;
          for (; s != last; s = s.ts_next) {
            x = s.x;
            // 如果不是小节线，不能换行 add by hxs
            if (s.type != C.BAR) {
              continue;
            }

            if (!x) continue;
            if (s.x < xmid) {
              s3 = s;
              continue;
            }
            if (s3 > xmid) break;
            if (xmid - s3.x < s.x - xmid) break;
            s3 = s;
            break;
          }
          s = s3;
        }
        if (s.nl) {
          //error(0, s, "Line split problem - adjust maxshrink and/or breaklimit");
          error(0, s, "无法正确分割行，请调整maxshrink或breaklimit参数");
          nlines = 2;
          for (s = s.ts_next; s != last; s = s.ts_next) {
            if (!s.x) continue;
            if (--nlines <= 0) break;
          }
        }
        s = set_nl(s);
        if (!s || (last && s.time >= last.time)) break;
        wwidth -= s.x - first.x;
        indent = 0;
      }
      return s;
    }
    //强制换行
    function cut_tune(lwidth, indent) {
      var s,
        s2,
        s3,
        i,
        xmin,
        s = tsfirst;
      if (indent != 0) {
        i = set_indent();
        lwidth -= i;
        indent -= i;
      }
      i = get_ck_width();
      lwidth -= i[0];
      indent += i[1];
      if (cfmt.custos && voice_tb.length == 1) lwidth -= 12;
      if (cfmt.barsperstaff) {
        i = cfmt.barsperstaff;
        for (s2 = s; s2; s2 = s2.ts_next) {
          if (s2.type != C.BAR || !s2.bar_num || --i > 0) continue;
          s2.eoln = true;
          i = cfmt.barsperstaff;
        }
      }
      xmin = indent;
      s2 = s;

      for (; s; s = s.ts_next) {
        if (!s.seqst && !s.eoln) continue;

        xmin += s.shrink;
        //这里改成只有在遇到小节线的时候才可以换行，增加了&& s.type==0 add by hxs
        if (xmin > lwidth && s.type == 0) {
          // 这里强制换行
          s2 = set_lines(s2, s, lwidth, indent);
        } else {
          if (!s.eoln) continue;
          delete s.eoln;
          if (s.dur) {
            for (s3 = s.ts_next; s3; s3 = s3.ts_next) {
              if (s3.seqst || s3.dur < s.dur) break;
            }
            if (s3 && !s3.seqst) {
              s2 = set_lines(s2, s, lwidth, indent);
            } else s2 = set_nl(s);
          } else {
            s2 = set_nl(s);
          }
        }
        if (!s2) break;
        if (!s2.ts_prev) {
          delete s2.nl;
          continue;
        }
        xmin = s2.shrink;
        s = s2.ts_prev;
        indent = 0;
      }
    }
    function set_yval(s) {
      switch (s.type) {
        case C.CLEF:
          if (s.second || s.invis) {
            s.ymx = s.ymn = 12;
            break;
          }
          s.y = (s.clef_line - 1) * 6;
          switch (s.clef_type) {
            default:
              s.ymx = s.y + 28;
              s.ymn = s.y - 14;
              break;
            case "c":
              s.ymx = s.y + 13;
              s.ymn = s.y - 11;
              break;
            case "b":
              s.ymx = s.y + 7;
              s.ymn = s.y - 12;
              break;
          }
          if (s.clef_small) {
            s.ymx -= 2;
            s.ymn += 2;
          }
          if (s.ymx < 26) s.ymx = 26;
          if (s.ymn > -1) s.ymn = -1;
          if (s.clef_octave) {
            if (s.clef_octave > 0) s.ymx += 12;
            else s.ymn -= 12;
          }
          break;
        case C.KEY:
          if (s.k_sf > 2) s.ymx = 24 + 10;
          else if (s.k_sf > 0) s.ymx = 24 + 6;
          else s.ymx = 24 + 2;
          s.ymn = -2;
          break;
        default:
          s.ymx = 24 + 2;
          s.ymn = -2;
          break;
      }
    }
    function set_auto_clef(st, s_start, clef_type_start) {
      var s, min, max, time, s2, s3;
      max = 12;
      min = 20;
      for (s = s_start; s; s = s.ts_next) {
        if (s.type == C.STAVES && s != s_start) break;
        if (s.st != st) continue;
        if (s.type != C.NOTE) {
          if (s.type == C.CLEF) {
            if (s.clef_type != "a") break;
            unlksym(s);
          }
          continue;
        }
        if (s.notes[0].pit < min) min = s.notes[0].pit;
        else if (s.notes[s.nhd].pit > max) max = s.notes[s.nhd].pit;
      }
      if (min >= 19 || (min >= 13 && clef_type_start != "b")) return "t";
      if (max <= 13 || (max <= 19 && clef_type_start != "t")) return "b";
      if (clef_type_start == "a") {
        if ((max + min) / 2 >= 16) clef_type_start = "t";
        else clef_type_start = "b";
      }
      var clef_type = clef_type_start,
        s_last = s,
        s_last_chg = null;
      for (s = s_start; s != s_last; s = s.ts_next) {
        if (s.type == C.STAVES && s != s_start) break;
        if (s.st != st || s.type != C.NOTE) continue;
        time = s.time;
        if (clef_type == "t") {
          if (s.notes[0].pit > 12 || s.notes[s.nhd].pit > 20) {
            if (s.notes[0].pit > 20) s_last_chg = s;
            continue;
          }
          s2 = s.ts_prev;
          if (
            s2 &&
            s2.time == time &&
            s2.st == st &&
            s2.type == C.NOTE &&
            s2.notes[0].pit >= 19
          )
            continue;
          s2 = s.ts_next;
          if (
            s2 &&
            s2.st == st &&
            s2.time == time &&
            s2.type == C.NOTE &&
            s2.notes[0].pit >= 19
          )
            continue;
        } else {
          if (s.notes[0].pit < 12 || s.notes[s.nhd].pit < 20) {
            if (s.notes[s.nhd].pit < 12) s_last_chg = s;
            continue;
          }
          s2 = s.ts_prev;
          if (
            s2 &&
            s2.time == time &&
            s2.st == st &&
            s2.type == C.NOTE &&
            s2.notes[0].pit <= 13
          )
            continue;
          s2 = s.ts_next;
          if (
            s2 &&
            s2.st == st &&
            s2.time == time &&
            s2.type == C.NOTE &&
            s2.notes[0].pit <= 13
          )
            continue;
        }
        if (!s_last_chg) {
          clef_type = clef_type_start = clef_type == "t" ? "b" : "t";
          s_last_chg = s;
          continue;
        }
        s3 = s;
        for (s2 = s.ts_prev; s2 != s_last_chg; s2 = s2.ts_prev) {
          if (s2.st != st) continue;
          if (s2.type == C.BAR && s2.v == s.v) {
            s3 = s2;
            break;
          }
          if (s2.type != C.NOTE) continue;
          if (s2.beam_st && !s2.p_v.second) s3 = s2;
        }
        if (s3.time == s_last_chg.time) {
          s_last_chg = s;
          continue;
        }
        s_last_chg = s;
        clef_type = clef_type == "t" ? "b" : "t";
        s2 = insert_clef(s3, clef_type, clef_type == "t" ? 2 : 4);
        s2.clef_auto = true;
      }
      return clef_type_start;
    }
    // 设置staff_tb 参数
    function set_clefs() {
      var s,
        s2,
        st,
        v,
        p_voice,
        g,
        new_type,
        new_line,
        p_staff,
        pit,
        staff_clef = new Array(nstaff + 1),
        sy = cur_sy,
        mid = [];
      staff_tb = new Array(nstaff + 1);
      for (st = 0; st <= nstaff; st++) {
        staff_clef[st] = {
          autoclef: true,
        };
        staff_tb[st] = {
          output: "",
          sc_out: "",
        };
      }
      for (v = 0; v < voice_tb.length; v++) {
        p_voice = voice_tb[v];
        if (!sy.voices[v]) continue;
        st = sy.voices[v].st;
        if (!sy.voices[v].second) {
          if (p_voice.staffnonote != undefined)
            sy.staves[st].staffnonote = p_voice.staffnonote;
          if (p_voice.staffscale) sy.staves[st].staffscale = p_voice.staffscale;
          if (sy.voices[v].sep) sy.staves[st].sep = sy.voices[v].sep;
          if (sy.voices[v].maxsep) sy.staves[st].maxsep = sy.voices[v].maxsep;
          if (!p_voice.clef.clef_auto) staff_clef[st].autoclef = false;
        }
      }
      for (v = 0; v < voice_tb.length; v++) {
        p_voice = voice_tb[v];
        if (!sy.voices[v] || sy.voices[v].second) continue;
        st = sy.voices[v].st;
        s = p_voice.clef;
        if (staff_clef[st].autoclef) {
          s.clef_type = set_auto_clef(st, tsfirst, s.clef_type);
          s.clef_line = s.clef_type == "t" ? 2 : 4;
        }
        staff_clef[st].clef = staff_tb[st].clef = s;
      }
      for (st = 0; st <= sy.nstaff; st++)
        mid[st] = (sy.staves[st].stafflines.length - 1) * 3;
      for (s = tsfirst; s; s = s.ts_next) {
        if (s.repeat_n) set_repeat(s);
        switch (s.type) {
          case C.STAVES:
            sy = s.sy;
            for (st = 0; st <= nstaff; st++) staff_clef[st].autoclef = true;
            for (v = 0; v < voice_tb.length; v++) {
              if (!sy.voices[v]) continue;
              p_voice = voice_tb[v];
              st = sy.voices[v].st;
              if (!sy.voices[v].second) {
                if (p_voice.staffnonote != undefined)
                  sy.staves[st].staffnonote = p_voice.staffnonote;
                if (p_voice.staffscale)
                  sy.staves[st].staffscale = p_voice.staffscale;
                if (sy.voices[v].sep) sy.staves[st].sep = sy.voices[v].sep;
                if (sy.voices[v].maxsep)
                  sy.staves[st].maxsep = sy.voices[v].maxsep;
              }
              s2 = p_voice.clef;
              if (!s2.clef_auto) staff_clef[st].autoclef = false;
            }
            for (st = 0; st <= sy.nstaff; st++)
              mid[st] = (sy.staves[st].stafflines.length - 1) * 3;
            for (v = 0; v < voice_tb.length; v++) {
              if (!sy.voices[v] || sy.voices[v].second) continue;
              p_voice = voice_tb[v];
              st = sy.voices[v].st;
              s2 = p_voice.clef;
              if (s2.clef_auto) {
                new_type = set_auto_clef(
                  st,
                  s,
                  staff_clef[st].clef ? staff_clef[st].clef.clef_type : "a"
                );
                new_line = new_type == "t" ? 2 : 4;
              } else {
                new_type = s2.clef_type;
                new_line = s2.clef_line;
              }
              if (!staff_clef[st].clef) {
                if (s2.clef_auto) {
                  if (s2.type != "a") p_voice.clef = clone(p_voice.clef);
                  p_voice.clef.clef_type = new_type;
                  p_voice.clef.clef_line = new_line;
                }
                staff_tb[st].clef = staff_clef[st].clef = p_voice.clef;
                continue;
              }
              if (
                new_type == staff_clef[st].clef.clef_type &&
                new_line == staff_clef[st].clef.clef_line
              )
                continue;
              g = s.ts_prev;
              while (g && g.time == s.time && (g.v != v || g.st != st))
                g = g.ts_prev;
              if (!g || g.time != s.time) {
                g = s.ts_next;
                while (g && (g.v != v || g.st != st)) g = g.ts_next;
                if (!g || g.time != s.time) g = s;
              }
              if (g.type != C.CLEF) {
                g = insert_clef(g, new_type, new_line);
                if (s2.clef_auto) g.clef_auto = true;
              }
              staff_clef[st].clef = p_voice.clef = g;
            }
            continue;
          default: //这里加谱号类型，是为了不让后面有改变谱表时，串起来
            s.mid = mid[s.st];
            s.clef_type = s.p_v.clef.clef_type + "";
            s.my_ulen = s.p_v.ulen;

            continue;
          case C.CLEF:
            break;
        }
        if (s.clef_type == "a") {
          s.clef_type = set_auto_clef(
            s.st,
            s.ts_next,
            staff_clef[s.st].clef.clef_type
          );
          s.clef_line = s.clef_type == "t" ? 2 : 4;
        }
        p_voice = s.p_v;
        //p_voice = clone(s.p_v);

        p_voice.clef = s;
        if (s.second) {
          unlksym(s);
          continue;
        }
        st = s.st;
        if (staff_clef[st].clef) {
          if (
            s.clef_type == staff_clef[st].clef.clef_type &&
            s.clef_line == staff_clef[st].clef.clef_line
          ) {
            continue;
          }
        } else {
          staff_tb[st].clef = s;
        }
        staff_clef[st].clef = s;
      }
      sy = cur_sy;
      for (v = 0; v < voice_tb.length; v++) {
        if (!sy.voices[v]) continue;
        s2 = voice_tb[v].sym;
        if (!s2 || s2.notes[0].pit != 127) continue;
        st = sy.voices[v].st;
        switch (staff_tb[st].clef.clef_type) {
          default:
            pit = 22;
            break;
          case "c":
            pit = 16;
            break;
          case "b":
            pit = 10;
            break;
        }
        for (s = s2; s; s = s.next) s.notes[0].pit = pit;
      }
    }
    var delta_tb = {
      t: 0 - 2 * 2,
      c: 6 - 3 * 2,
      b: 12 - 4 * 2,
      p: 0 - 3 * 2,
    };
    var rest_sp = [
      [18, 18],
      [12, 18],
      [12, 12],
      [0, 12],
      [6, 8],
      [10, 10],
      [6, 4],
      [10, 0],
      [10, 4],
      [10, 10],
    ];
    function set_pitch(last_s) {
      var s,
        s2,
        g,
        st,
        delta,
        m,
        pitch,
        note,
        dur = C.BLEN,
        staff_delta = new Array(nstaff),
        sy = cur_sy;
      for (st = 0; st <= nstaff; st++) {
        s = staff_tb[st].clef;
        staff_delta[st] = delta_tb[s.clef_type] + s.clef_line * 2;
        if (s.clefpit) staff_delta[st] += s.clefpit;
        if (cfmt.sound) {
          if (s.clef_octave && !s.clef_oct_transp)
            staff_delta[st] += s.clef_octave;
        } else {
          if (s.clef_oct_transp) staff_delta[st] -= s.clef_octave;
        }
      }
      for (s = tsfirst; s != last_s; s = s.ts_next) {
        st = s.st;
        switch (s.type) {
          case C.CLEF:
            staff_delta[st] = delta_tb[s.clef_type] + s.clef_line * 2;
            if (s.clefpit) staff_delta[st] += s.clefpit;
            if (cfmt.sound) {
              if (s.clef_octave && !s.clef_oct_transp)
                staff_delta[st] += s.clef_octave;
            } else {
              if (s.clef_oct_transp) staff_delta[st] -= s.clef_octave;
            }
            set_yval(s);
            break;
          case C.GRACE:
            for (g = s.extra; g; g = g.next) {
              delta = staff_delta[g.st];
              if (delta != 0 && !s.p_v.key.k_drum) {
                for (m = 0; m <= g.nhd; m++) {
                  note = g.notes[m];
                  note.pit += delta;
                }
              }
              g.ymn = 3 * (g.notes[0].pit - 18) - 2;
              g.ymx = 3 * (g.notes[g.nhd].pit - 18) + 2;
            }
            set_yval(s);
            break;
          case C.KEY:
            s.k_y_clef = staff_delta[st];
          default:
            set_yval(s);
            break;
          case C.MREST:
            if (s.invis) break;
            s.y = 12;
            s.ymx = 24 + 15;
            s.my_ymx = s.ymx - 0; //add by hxs，加这个变量是为了画连音线时，从音符开始画，不受音符上的装饰音影响连音线开始的高度
            s.ymn = -2;
            break;
          case C.REST:
            if (voice_tb.length == 1) {
              s.y = 12;
              s.ymx = 24;
              s.my_ymx = s.ymx - 0; //add by hxs，加这个变量是为了画连音线时，从音符开始画，不受音符上的装饰音影响连音线开始的高度
              s.ymn = 0;
              break;
            }
          case C.NOTE:
            delta = staff_delta[st];
            if (delta != 0 && !s.p_v.key.k_drum) {
              for (m = s.nhd; m >= 0; m--) s.notes[m].pit += delta;
            }
            if (s.type == C.NOTE) {
              s.ymx = 3 * (s.notes[s.nhd].pit - 18) + 4;
              s.my_ymx = s.ymx - 0; //add by hxs，加这个变量是为了画连音线时，从音符开始画，不受音符上的装饰音影响连音线开始的高度
              s.ymn = 3 * (s.notes[0].pit - 18) - 4;
            } else {
              s.y = (((s.notes[0].pit - 18) / 2) | 0) * 6;
              s.ymx = s.y + rest_sp[5 - s.nflags][0];
              s.my_ymx = s.ymx - 0; //add by hxs，加这个变量是为了画连音线时，从音符开始画，不受音符上的装饰音影响连音线开始的高度
              s.ymn = s.y - rest_sp[5 - s.nflags][1];
            }
            if (s.dur < dur) dur = s.dur;
            break;
        }
      }
      if (!last_s) smallest_duration = dur;
    }
    Abc.prototype.set_stem_dir = function () {
      var t,
        u,
        i,
        st,
        rvoice,
        v,
        v_st,
        st_v,
        vobj,
        v_st_tb,
        st_v_tb = [],
        s = tsfirst,
        sy = cur_sy,
        nst = sy.nstaff;
      while (s) {
        for (st = 0; st <= nst; st++) st_v_tb[st] = [];
        v_st_tb = [];
        for (u = s; u; u = u.ts_next) {
          if (u.type == C.BAR) break;
          if (u.type == C.STAVES) {
            if (u != s) break;
            sy = s.sy;
            for (st = nst; st <= sy.nstaff; st++) st_v_tb[st] = [];
            nst = sy.nstaff;
            continue;
          }
          if ((u.type != C.NOTE && u.type != C.REST) || u.invis) continue;
          st = u.st;
          if (st > nst) {
            //var msg = "*** fatal set_stem_dir(): bad staff number " + st + " max " + nst;
            var msg =
              "*** set_stem_dir(): 错误的声部编号 " + st + " 最大值 " + nst;
            error(2, null, msg);
            throw new Error(msg);
          }
          v = u.v;
          v_st = v_st_tb[v];
          if (!v_st) {
            v_st = {
              st1: -1,
              st2: -1,
            };
            v_st_tb[v] = v_st;
          }
          if (v_st.st1 < 0) {
            v_st.st1 = st;
          } else if (v_st.st1 != st) {
            if (st > v_st.st1) {
              if (st > v_st.st2) v_st.st2 = st;
            } else {
              if (v_st.st1 > v_st.st2) v_st.st2 = v_st.st1;
              v_st.st1 = st;
            }
          }
          st_v = st_v_tb[st];
          rvoice = sy.voices[v].range;
          for (i = st_v.length; --i >= 0; ) {
            vobj = st_v[i];
            if (vobj.v == rvoice) break;
          }
          if (i < 0) {
            vobj = {
              v: rvoice,
              ymx: 0,
              ymn: 24,
            };
            for (i = 0; i < st_v.length; i++) {
              if (rvoice < st_v[i].v) {
                st_v.splice(i, 0, vobj);
                break;
              }
            }
            if (i == st_v.length) st_v.push(vobj);
          }
          if (u.type != C.NOTE) continue;
          if (u.ymx > vobj.ymx) vobj.ymx = u.ymx;
          if (u.ymn < vobj.ymn) vobj.ymn = u.ymn;
          if (u.xstem) {
            if (u.ts_prev.st != st - 1 || u.ts_prev.type != C.NOTE) {
              // error(1, s, "Bad !xstem!");
              error(1, s, "错误 !xstem!");
              u.xstem = false;
            } else {
              u.ts_prev.multi = 1;
              u.multi = 1;
              u.stemless = true;
            }
          }
        }
        for (; s != u; s = s.ts_next) {
          if (s.multi) continue;
          switch (s.type) {
            default:
              continue;
            case C.REST:
              if (
                (s.combine != undefined && s.combine < 0) ||
                !s.ts_next ||
                s.ts_next.type != C.REST ||
                s.ts_next.st != s.st ||
                s.time != s.ts_next.time ||
                s.dur != s.ts_next.dur ||
                (s.a_dd && s.ts_next.a_dd) ||
                (s.a_gch && s.ts_next.a_gch) ||
                s.invis
              )
                break;
              if (s.ts_next.a_dd) s.a_dd = s.ts_next.a_dd;
              if (s.ts_next.a_gch) s.a_gch = s.ts_next.a_gch;
              unlksym(s.ts_next);
              break;
            case C.NOTE:
            case C.GRACE:
              break;
          }
          st = s.st;
          v = s.v;
          v_st = v_st_tb[v];
          st_v = st_v_tb[st];
          if (v_st && v_st.st2 >= 0) {
            if (st == v_st.st1) s.multi = -1;
            else if (st == v_st.st2) s.multi = 1;
            continue;
          }
          if (st_v.length <= 1) {
            if (s.floating) s.multi = st == voice_tb[v].st ? -1 : 1;
            continue;
          }
          rvoice = sy.voices[v].range;
          for (i = st_v.length; --i >= 0; ) {
            if (st_v[i].v == rvoice) break;
          }
          if (i < 0) continue;
          if (i == st_v.length - 1) {
            s.multi = -1;
          } else {
            s.multi = 1;
            if (i != 0 && i + 2 == st_v.length) {
              if (st_v[i].ymn - cfmt.stemheight > st_v[i + 1].ymx) s.multi = -1;
              t = s.ts_next;
              if (
                s.ts_prev &&
                s.ts_prev.time == s.time &&
                s.ts_prev.st == s.st &&
                s.notes[s.nhd].pit == s.ts_prev.notes[0].pit &&
                s.beam_st &&
                s.beam_end &&
                (!t || t.st != s.st || t.time != s.time)
              )
                s.multi = -1;
            }
          }
        }
        while (s && s.type == C.BAR) s = s.ts_next;
      }
    };
    function set_rest_offset() {
      var s,
        s2,
        v,
        end_time,
        not_alone,
        v_s,
        y,
        ymax,
        ymin,
        shift,
        dots,
        dx,
        v_s_tb = [],
        sy = cur_sy;
      for (s = tsfirst; s; s = s.ts_next) {
        if (s.invis) continue;
        if (s.type == C.STAVES) sy = s.sy;
        if (!s.dur) continue;
        v_s = v_s_tb[s.v];
        if (!v_s) {
          v_s = {};
          v_s_tb[s.v] = v_s;
        }
        v_s.s = s;
        v_s.st = s.st;
        v_s.end_time = s.time + s.dur;
        if (s.type != C.REST) continue;
        ymin = -127;
        ymax = 127;
        not_alone = dots = false;
        for (v = 0; v <= v_s_tb.length; v++) {
          v_s = v_s_tb[v];
          if (!v_s || !v_s.s || v_s.st != s.st || v == s.v) continue;
          if (v_s.end_time <= s.time) continue;
          not_alone = true;
          s2 = v_s.s;
          if (sy.voices[v].range < sy.voices[s.v].range) {
            if (s2.time == s.time) {
              if (s2.ymn < ymax) {
                ymax = s2.ymn;
                if (s2.dots) dots = true;
              }
            } else {
              if (s2.y < ymax) ymax = s2.y;
            }
          } else {
            if (s2.time == s.time) {
              if (s2.ymx > ymin) {
                ymin = s2.ymx;
                if (s2.dots) dots = true;
              }
            } else {
              if (s2.y > ymin) ymin = s2.y;
            }
          }
        }
        end_time = s.time + s.dur;
        for (s2 = s.ts_next; s2; s2 = s2.ts_next) {
          if (s2.time >= end_time) break;
          if (s2.st != s.st || !s2.dur || s2.invis) continue;
          not_alone = true;
          if (sy.voices[s2.v].range < sy.voices[s.v].range) {
            if (s2.time == s.time) {
              if (s2.ymn < ymax) {
                ymax = s2.ymn;
                if (s2.dots) dots = true;
              }
            } else {
              if (s2.y < ymax) ymax = s2.y;
            }
          } else {
            if (s2.time == s.time) {
              if (s2.ymx > ymin) {
                ymin = s2.ymx;
                if (s2.dots) dots = true;
              }
            } else {
              if (s2.y > ymin) ymin = s2.y;
            }
          }
        }
        if (!not_alone) {
          s.y = 12;
          s.ymx = 24;
          s.ymn = 0;
          continue;
        }
        if (ymax == 127 && s.y < 12) {
          shift = 12 - s.y;
          s.y += shift;
          s.ymx += shift;
          s.ymn += shift;
        }
        if (ymin == -127 && s.y > 12) {
          shift = s.y - 12;
          s.y -= shift;
          s.ymx -= shift;
          s.ymn -= shift;
        }
        shift = ymax - s.ymx;
        if (shift < 0) {
          shift = Math.ceil(-shift / 6) * 6;
          if (s.ymn - shift >= ymin) {
            s.y -= shift;
            s.ymx -= shift;
            s.ymn -= shift;
            continue;
          }
          dx = dots ? 15 : 10;
          s.notes[0].shhd = dx;
          s.xmx = dx;
          continue;
        }
        shift = ymin - s.ymn;
        if (shift > 0) {
          shift = Math.ceil(shift / 6) * 6;
          if (s.ymx + shift <= ymax) {
            s.y += shift;
            s.ymx += shift;
            s.ymn += shift;
            continue;
          }
          dx = dots ? 15 : 10;
          s.notes[0].shhd = dx;
          s.xmx = dx;
          continue;
        }
      }
    }
    function new_sym(s, p_v, last_s) {
      s.p_v = p_v;
      s.v = p_v.v;
      s.st = p_v.st;
      s.time = last_s.time;
      if (p_v.last_sym) {
        s.next = p_v.last_sym.next;
        if (s.next) s.next.prev = s;
        p_v.last_sym.next = s;
        s.prev = p_v.last_sym;
      }
      p_v.last_sym = s;
      lktsym(s, last_s);
      if (s.ts_prev.type != s.type) s.seqst = true;
      if (last_s.type == s.type && s.v != last_s.v) {
        delete last_s.seqst;
        last_s.shrink = 0;
      }
    }
    // 增加了一个Line_num的参数 add by hxs
    function init_music_line(line_num) {
      var p_voice,
        s,
        s2,
        s3,
        last_s,
        v,
        st,
        shr,
        shrmx,
        nv = voice_tb.length;
      for (v = 0; v < nv; v++) {
        if (!cur_sy.voices[v]) continue;
        p_voice = voice_tb[v];
        p_voice.second = cur_sy.voices[v].second;
        p_voice.last_sym = p_voice.sym;
        st = cur_sy.voices[v].st;
        while (st < nstaff && !cur_sy.st_print[st]) st++;
        p_voice.st = st;
      }
      last_s = tsfirst;
      while (last_s && last_s.type == C.CLEF) {
        v = last_s.v;
        if (cur_sy.voices[v] && !cur_sy.voices[v].second) {
          delete last_s.clef_small;
          p_voice = last_s.p_v;
          p_voice.last_sym = p_voice.sym = last_s;
        }
        last_s = last_s.ts_next;
      }
      for (v = 0; v < nv; v++) {
        p_voice = voice_tb[v];
        if (p_voice.sym && p_voice.sym.type == C.CLEF) continue;
        if (
          !cur_sy.voices[v] ||
          (cur_sy.voices[v].second && !p_voice.bar_start)
        )
          continue;
        st = cur_sy.voices[v].st;
        if (!staff_tb[st] || !staff_tb[st].clef) continue;
        s = clone(staff_tb[st].clef);
        s.v = v;
        s.p_v = p_voice;
        s.st = st;
        s.time = tsfirst.time;
        s.my_line = line_num;
        s.prev = null;
        s.next = p_voice.sym;
        if (s.next) s.next.prev = s;
        p_voice.sym = s;
        p_voice.last_sym = s;
        s.ts_next = last_s;
        if (last_s) s.ts_prev = last_s.ts_prev;
        else s.ts_prev = null;
        if (!s.ts_prev) {
          tsfirst = s;
          s.seqst = true;
        } else {
          s.ts_prev.ts_next = s;
          delete s.seqst;
        }
        if (last_s) {
          last_s.ts_prev = s;
          if (last_s.type == C.CLEF) delete last_s.seqst;
        }
        delete s.clef_small;
        s.second = cur_sy.voices[v].second;
        if (!cur_sy.st_print[st]) s.invis = true;
      }
      for (v = 0; v < nv; v++) {
        if (
          !cur_sy.voices[v] ||
          cur_sy.voices[v].second ||
          !cur_sy.st_print[cur_sy.voices[v].st]
        )
          continue;
        p_voice = voice_tb[v];
        if (last_s && last_s.v == v && last_s.type == C.KEY) {
          p_voice.last_sym = last_s;
          last_s.k_old_sf = last_s.k_sf;
          last_s = last_s.ts_next;
          continue;
        }
        s2 = p_voice.key;
        if (s2.k_sf || s2.k_a_acc) {
          s = clone(s2);
          new_sym(s, p_voice, last_s);
          s.k_old_sf = s2.k_sf;
        }
      }
      if (insert_meter & 1) {
        for (v = 0; v < nv; v++) {
          p_voice = voice_tb[v];
          s2 = p_voice.meter;
          if (
            !cur_sy.voices[v] ||
            cur_sy.voices[v].second ||
            !cur_sy.st_print[cur_sy.voices[v].st] ||
            !s2.a_meter.length
          )
            continue;
          if (last_s && last_s.v == v && last_s.type == C.METER) {
            p_voice.last_sym = last_s;
            last_s = last_s.ts_next;
            continue;
          }
          s = clone(s2);
          new_sym(s, p_voice, last_s);
        }
        insert_meter &= ~1;
      }
      for (v = 0; v < nv; v++) {
        p_voice = voice_tb[v];
        if (p_voice.sls.length) {
          s = {
            type: C.BAR,
            fname: last_s.fname,
            bar_type: "|",
            dur: 0,
            multi: 0,
            invis: true,
            sls: p_voice.sls,
          };
          new_sym(s, p_voice, last_s);
          p_voice.sls = [];
        }
      }
      for (v = 0; v < nv; v++) {
        p_voice = voice_tb[v];
        s2 = p_voice.bar_start;
        p_voice.bar_start = null;
        if (last_s && last_s.v == v && last_s.type == C.BAR) {
          p_voice.last_sym = last_s;
          last_s = last_s.ts_next;
          continue;
        }
        if (!s2) continue;
        if (!cur_sy.voices[v] || !cur_sy.st_print[cur_sy.voices[v].st])
          continue;
        new_sym(s2, p_voice, last_s);
      }
      set_pitch(last_s);
      s = tsfirst;
      while (1) {
        s2 = s;
        shrmx = 0;
        do {
          set_width(s);
          shr = s.wl;
          if (s.prev) shr += s.prev.wr;
          if (shr > shrmx) shrmx = shr;
          s = s.ts_next;
        } while (s != last_s && !s.seqst);
        s2.shrink = shrmx;
        s2.space = 0;
        if (s == last_s) break;
      }
      if (!s) return;
      shr = 0;
      do {
        set_width(s);
        if (shr < s.wl) shr = s.wl;
        s = s.ts_next;
      } while (s && !s.seqst);
      last_s.shrink = s2.wr + shr;
      last_s.space = 0;
    }
    function set_words(p_voice) {
      // 增加了lastOne
      var s,
        s2,
        nflags,
        lastnote,
        res,
        lastOne,
        start_flag = true,
        pitch = 127;
      for (s = p_voice.sym; s; s = s.next) {
        if (s.type == C.NOTE) {
          pitch = s.notes[0].pit;
          break;
        }
      }
      for (s = p_voice.sym; s; s = s.next) {
        switch (s.type) {
          case C.MREST:
            start_flag = true;
            break;
          case C.BAR:
            s.bar_type = bar_cnv(s.bar_type);
            if (!s.beam_on) start_flag = true;
            if (!s.next && s.prev && s.prev.head == C.OVALBARS)
              s.prev.head = C.SQUARE;

            break;
          case C.GRACE:
            for (s2 = s.extra; s2; s2 = s2.next) s2.notes.sort(abc2svg.pitcmp);
            break;
          case C.NOTE:
          case C.REST:
            res = identify_note(s, s.dur_orig);
            s.head = res[0];
            s.dots = res[1];
            s.nflags = res[2];
            if (s.nflags <= -2) s.stemless = true;
            if (s.xstem) s.nflags = 0;
            if (s.trem1 && musicType == 0) {
              //add by hxs 2021-7-12 震音  && musicType==0

              if (s.nflags > 0) s.nflags += s.ntrem;
              else s.nflags = s.ntrem;
            }
            if (s.next && s.next.trem2) break;
            if (s.trem2) {
              s.prev.trem2 = true;
              s.prev.nflags = --s.nflags;
              s.prev.head = ++s.head;
              if (s.nflags > 0) {
                s.nflags += s.ntrem;
              } else {
                if (s.nflags <= -2) {
                  s.stemless = true;
                  s.prev.stemless = true;
                }
                s.nflags = s.ntrem;
              }
              s.prev.nflags = s.nflags;
              break;
            }
            nflags = s.nflags;
            if (s.ntrem) nflags += s.ntrem;
            if (s.type == C.REST && s.beam_end) {
              s.beam_end = false;
              // 五线谱的休止符与简谱按拍划分不一致
              s.beam_end_2 = true;
              start_flag = true;
            }
            if (start_flag || nflags <= 0) {
              if (lastnote) {
                if (!lastnote.my_beamctn) {
                  //如果有!beamctn!标记，则不切换符尾
                  lastnote.beam_end = true; //把音符符尾切断
                }
                if (lastnote.my_beamctn) {
                  lastnote.beam_end = false;
                }
                lastnote = null;
              }
              if (nflags <= 0) {
                s.beam_st = true;
                s.beam_end = true;
              } else if (s.type == C.NOTE) {
                s.beam_st = true;
                start_flag = false;
              }
            }
            if (s.beam_end) start_flag = true;
            if (s.type == C.NOTE) lastnote = s;
            lastOne = s;
            break;
        }
        if (s.type == C.NOTE) {
          if (s.nhd) s.notes.sort(abc2svg.pitcmp);
          pitch = s.notes[0].pit;
          for (s2 = s.prev; s2; s2 = s2.prev) {
            if (s2.type != C.REST) break;
            s2.notes[0].pit = pitch;
          }
        } else {
          if (!s.notes) {
            s.notes = [];
            s.notes[0] = {};
            s.nhd = 0;
          }
          s.notes[0].pit = pitch;
        }
      }
      if (lastnote) lastnote.beam_end = true;
      if (lastOne) lastOne.beam_end_2 = true;
    }
    function set_rb(p_voice) {
      var s2,
        n,
        s = p_voice.sym;
      while (s) {
        if (s.type != C.BAR || !s.rbstart || s.norepbra) {
          s = s.next;
          continue;
        }
        n = 0;
        s2 = null;
        for (s = s.next; s; s = s.next) {
          if (s.type != C.BAR) continue;
          n++;
          if (s.rbstop) break;
          if (!s.next) {
            s.rbstop = 2;
            break;
          }
          if (n == cfmt.rbmin) s2 = s;
          if (n == cfmt.rbmax) {
            if (s2) s = s2;
            s.rbstop = 1;
            break;
          }
        }
      }
    }
    var delpit = [0, -7, -14, 0];
    // 设置全局参数
    function set_global() {
      var p_voice, st, v, nv, sy;
      sy = cur_sy;
      st = sy.nstaff;
      while (1) {
        sy = sy.next;
        if (!sy) break;
        if (sy.nstaff > st) st = sy.nstaff;
      }
      nstaff = st;
      nv = voice_tb.length;
      for (v = 0; v < nv; v++) {
        p_voice = voice_tb[v];
        set_words(p_voice);
        set_rb(p_voice);
      }
      set_float();
      if (glovar.ottava && cfmt.sound != "play") set_ottava();
      set_clefs();
      set_pitch(null);
    }
    // 设置声部左边距
    function set_indent(first) {
      var st,
        v,
        w,
        p_voice,
        p,
        i,
        j,
        font,
        nv = voice_tb.length,
        maxw = 0;
      for (v = 0; v < nv; v++) {
        p_voice = voice_tb[v];
        if (!cur_sy.voices[v]) continue;
        st = cur_sy.voices[v].st;
        p =
          (first || p_voice.new_name) && p_voice.nm ? p_voice.nm : p_voice.snm;
        if (!p) continue;

        //声部名称是图片的处理add by hxs start*******
        var size = 1;
        if (p.indexOf("image:") == 0) {
          var sizeMatch = p.match(/size=(.*)/);
          if (sizeMatch != null) {
            if (sizeMatch[1] != "") {
              size = sizeMatch[1];
            }
          }
          p = "图片";
        }
        //end**********
        if (!font) {
          set_font("voice");
          font = gene.curfont;
        }
        i = 0;
        while (1) {
          j = p.indexOf("\\n", i);
          if (j < 0) w = strwh(p.slice(i));
          else w = strwh(p.slice(i, j));
          w = w[0];
          w = w * size; //图片有设置size参数时，要乘以size,add by hxs
          if (w > maxw) maxw = w;
          if (j < 0) break;
          i = j + 1;
        }
      }
      if (font) maxw += 4 * cwidf(" ");
      w = 0.5;
      for (st = 0; st <= cur_sy.nstaff; st++) {
        if (cur_sy.staves[st].flags & (OPEN_BRACE2 | OPEN_BRACKET2)) {
          w = 12;
          break;
        }
        if (cur_sy.staves[st].flags & (OPEN_BRACE | OPEN_BRACKET)) w = 6;
      }
      maxw += w;
      if (first) maxw += cfmt.indent;
      return maxw;
    }
    function set_beams(sym) {
      var s,
        t,
        g,
        beam,
        s_opp,
        dy,
        avg,
        n,
        m,
        mid_p,
        pu,
        pd,
        laststem = -1;
      for (s = sym; s; s = s.next) {
        if (s.type != C.NOTE) {
          if (s.type != C.GRACE) continue;
          g = s.extra;
          if (g.stem == 2) {
            s_opp = s;
            continue;
          }
          if (!s.stem && (s.stem = s.multi) == 0) s.stem = 1;
          for (; g; g = g.next) {
            g.stem = s.stem;
            g.multi = s.multi;
          }
          continue;
        }
        if (!s.stem && (s.stem = s.multi) == 0) {
          mid_p = s.mid / 3 + 18;
          if (beam) {
            s.stem = laststem;
          } else if (s.beam_st && !s.beam_end) {
            beam = true;
            pu = s.notes[s.nhd].pit;
            pd = s.notes[0].pit;
            for (g = s.next; g; g = g.next) {
              if (g.type != C.NOTE) continue;
              if (g.stem || g.multi) {
                s.stem = g.stem || g.multi;
                break;
              }
              if (g.notes[g.nhd].pit > pu) pu = g.notes[g.nhd].pit;
              if (g.notes[0].pit < pd) pd = g.notes[0].pit;
              if (g.beam_end) break;
            }
            if (g && g.beam_end) {
              if ((pu + pd) / 2 < mid_p) {
                s.stem = 1;
              } else if ((pu + pd) / 2 > mid_p) {
                s.stem = -1;
              } else {
                if (cfmt.bstemdown) s.stem = -1;
              }
            }
            if (!s.stem) s.stem = laststem;
          } else {
            n = (s.notes[s.nhd].pit + s.notes[0].pit) / 2;
            if (n == mid_p) {
              n = 0;
              for (m = 0; m <= s.nhd; m++) n += s.notes[m].pit;
              n /= s.nhd + 1;
            }
            if (n < mid_p) s.stem = 1;
            else if (n > mid_p) s.stem = -1;
            else if (cfmt.bstemdown) s.stem = -1;
            else s.stem = laststem;
          }
        } else {
          if (s.beam_st && !s.beam_end) beam = true;
        }
        if (s.beam_end) beam = false;
        laststem = s.stem;
        if (s_opp) {
          for (g = s_opp.extra; g; g = g.next) g.stem = -laststem;
          s_opp.stem = -laststem;
          s_opp = null;
        }
      }
    }
    function same_head(s1, s2) {
      var i1, i2, l1, l2, head, i11, i12, i21, i22, sh1, sh2;
      if (s1.shiftunison && s1.shiftunison >= 3) return false;
      if ((l1 = s1.dur) >= C.BLEN) return false;
      if ((l2 = s2.dur) >= C.BLEN) return false;
      if (s1.stemless && s2.stemless) return false;
      if (s1.dots != s2.dots) {
        if ((s1.shiftunison && s1.shiftunison & 1) || s1.dots * s2.dots != 0)
          return false;
      }
      //add by hxs 类型不一样，返回false,休止符和音符
      if (s1.type != s2.type) {
        return false;
      }
      if (s1.stem * s2.stem > 0) return false;
      i1 = i2 = 0;
      if (s1.notes[0].pit > s2.notes[0].pit) {
        if (s1.stem < 0) return false;
        while (s2.notes[i2].pit != s1.notes[0].pit) {
          if (++i2 > s2.nhd) return false;
        }
      } else if (s1.notes[0].pit < s2.notes[0].pit) {
        if (s2.stem < 0) return false;
        while (s2.notes[0].pit != s1.notes[i1].pit) {
          if (++i1 > s1.nhd) return false;
        }
      }
      if (s2.notes[i2].acc != s1.notes[i1].acc) return false;
      i11 = i1;
      i21 = i2;
      sh1 = s1.notes[i1].shhd;
      sh2 = s2.notes[i2].shhd;
      do {
        i1++;
        i2++;
        if (i1 > s1.nhd) {
          break;
        }
        if (i2 > s2.nhd) {
          break;
        }
        if (s2.notes[i2].acc != s1.notes[i1].acc) return false;
        if (sh1 < s1.notes[i1].shhd) sh1 = s1.notes[i1].shhd;
        if (sh2 < s2.notes[i2].shhd) sh2 = s2.notes[i2].shhd;
      } while (s2.notes[i2].pit == s1.notes[i1].pit);
      if (i1 <= s1.nhd) {
        if (i2 <= s2.nhd) return false;
        if (s2.stem > 0) return false;
      } else if (i2 <= s2.nhd) {
        if (s1.stem > 0) return false;
      }
      i12 = i1;
      i22 = i2;
      head = 0;
      if (l1 != l2) {
        if (l1 < l2) {
          l1 = l2;
          l2 = s1.dur;
        }
        if (l1 < C.BLEN / 2) {
          if (s2.dots) head = 2;
          else if (s1.dots) head = 1;
        } else if (l2 < C.BLEN / 4) {
          if (s1.shiftunison && s1.shiftunison & 2) return false;
          head = s2.dur >= C.BLEN / 2 ? 2 : 1;
        } else {
          return false;
        }
      }
      if (!head) head = s1.p_v.scale < s2.p_v.scale ? 2 : 1;
      if (head == 1) {
        for (i2 = i21; i2 < i22; i2++) {
          s2.notes[i2].invis = true;
          delete s2.notes[i2].acc;
        }
        for (i2 = 0; i2 <= s2.nhd; i2++) s2.notes[i2].shhd += sh1;
      } else {
        for (i1 = i11; i1 < i12; i1++) {
          s1.notes[i1].invis = true;
          delete s1.notes[i1].acc;
        }
        for (i1 = 0; i1 <= s1.nhd; i1++) s1.notes[i1].shhd += sh2;
      }
      return true;
    }
    function unison_acc(s1, s2, i1, i2) {
      var m, d;
      if (!s2.notes[i2].acc) {
        d = w_note[s2.head] * 2 + s2.xmx + s1.notes[i1].shac + 2;
        if (s1.notes[i1].micro) d += 2;
        if (s2.dots) d += 6;
        for (m = 0; m <= s1.nhd; m++) {
          s1.notes[m].shhd += d;
          s1.notes[m].shac -= d;
        }
        s1.xmx += d;
      } else {
        d = w_note[s1.head] * 2 + s1.xmx + s2.notes[i2].shac + 2;
        if (s2.notes[i2].micro) d += 2;
        if (s1.dots) d += 6;
        for (m = 0; m <= s2.nhd; m++) {
          s2.notes[m].shhd += d;
          s2.notes[m].shac -= d;
        }
        s2.xmx += d;
      }
    }
    var MAXPIT = 48 * 2;
    function set_left(s) {
      var m,
        i,
        j,
        shift,
        w_base = w_note[s.head],
        w = w_base,
        left = [];
      for (i = 0; i < MAXPIT; i++) left.push(-100);
      if (s.nflags > -2) {
        if (s.stem > 0) {
          w = -w;
          i = s.notes[0].pit * 2;
          j = (Math.ceil((s.ymx - 2) / 3) + 18) * 2;
        } else {
          i = (Math.ceil((s.ymn + 2) / 3) + 18) * 2;
          j = s.notes[s.nhd].pit * 2;
        }
        if (i < 0) i = 0;
        if (j >= MAXPIT) j = MAXPIT - 1;
        while (i <= j) left[i++] = w;
      }
      shift = s.notes[s.stem > 0 ? 0 : s.nhd].shhd;
      for (m = 0; m <= s.nhd; m++) {
        w = -s.notes[m].shhd + w_base + shift;
        i = s.notes[m].pit * 2;
        if (i < 0) i = 0;
        else if (i >= MAXPIT - 1) i = MAXPIT - 2;
        if (w > left[i]) left[i] = w;
        if (s.head != C.SQUARE) w -= 1;
        if (w > left[i - 1]) left[i - 1] = w;
        if (w > left[i + 1]) left[i + 1] = w;
      }
      return left;
    }
    function set_right(s) {
      var m,
        i,
        j,
        k,
        shift,
        w_base = w_note[s.head],
        w = w_base,
        flags = s.nflags > 0 && s.beam_st && s.beam_end,
        right = [];
      for (i = 0; i < MAXPIT; i++) right.push(-100);
      if (s.nflags > -2) {
        if (s.stem < 0) {
          w = -w;
          i = (Math.ceil((s.ymn + 2) / 3) + 18) * 2;
          j = s.notes[s.nhd].pit * 2;
          k = i + 4;
        } else {
          i = s.notes[0].pit * 2;
          j = (Math.ceil((s.ymx - 2) / 3) + 18) * 2;
        }
        if (i < 0) i = 0;
        if (j > MAXPIT) j = MAXPIT;
        while (i < j) right[i++] = w;
      }
      if (flags) {
        if (s.stem > 0) {
          if (s.xmx == 0) i = s.notes[s.nhd].pit * 2;
          else i = s.notes[0].pit * 2;
          i += 4;
          if (i < 0) i = 0;
          for (; i < MAXPIT && i <= j - 4; i++) right[i] = 11;
        } else {
          i = k;
          if (i < 0) i = 0;
          for (; i < MAXPIT && i <= s.notes[0].pit * 2 - 4; i++) right[i] = 3.5;
        }
      }
      shift = s.notes[s.stem > 0 ? 0 : s.nhd].shhd;
      for (m = 0; m <= s.nhd; m++) {
        w = s.notes[m].shhd + w_base - shift;
        i = s.notes[m].pit * 2;
        if (i < 0) i = 0;
        else if (i >= MAXPIT - 1) i = MAXPIT - 2;
        if (w > right[i]) right[i] = w;
        if (s.head != C.SQUARE) w -= 1;
        if (w > right[i - 1]) right[i - 1] = w;
        if (w > right[i + 1]) right[i + 1] = w;
      }
      return right;
    }
    function set_overlap() {
      var s,
        s1,
        s2,
        s3,
        i,
        i1,
        i2,
        m,
        sd,
        t,
        dp,
        d,
        d2,
        dr,
        dr2,
        dx,
        left1,
        right1,
        left2,
        right2,
        right3,
        pl,
        pr;
      function v_invert() {
        s1 = s2;
        s2 = s;
        d = d2;
        pl = left1;
        pr = right1;
        dr2 = dr;
      }
      for (s = tsfirst; s; s = s.ts_next) {
        // add by lhj s.type != C.REST
        //(s.type != C.NOTE && s.type != C.REST)
        //
        if ((s.type != C.NOTE && s.type != C.REST) || s.invis) continue;
        if (s.xstem && s.ts_prev.stem < 0) {
          for (m = 0; m <= s.nhd; m++) {
            s.notes[m].shhd -= 7;
            s.notes[m].shac += 16;
          }
        }

        s2 = s;
        while (1) {
          s2 = s2.ts_next;
          if (!s2) break;
          if (s2.time != s.time) {
            s2 = null;
            break;
          }
          if (s2.type == C.NOTE && !s2.invis && s2.st == s.st) break;
        }
        if (!s2) continue;
        s1 = s;

        if (
          cur_sy.voices[s1.v] &&
          cur_sy.voices[s2.v] &&
          cur_sy.voices[s1.v].range < cur_sy.voices[s2.v].range
        )
          s2.dot_low = true;
        else s1.dot_low = true;

        // create by lhj 通过此命令[I:staff -1]渲染的谱子，自定义保存下谱表对应的音符。
        s1.dot_low_note = {
          istart: s2.istart,
          iend: s2.iend,
          s: s2,
          x: s2.x,
          dur: s2.dur,
        };
        //                if( s1.dot_low){
        //                	console.log(' s1.dot_low-----')
        //                }
        //                if( s2.dot_low){
        //                	console.log(' s2.dot_low-----')
        //                }
        //                s2.dot_low_prev_note = {
        //            		istart: s1.istart,
        //            		iend: s1.iend
        //                }
        if (s1.ymn > s2.ymx || s1.ymx < s2.ymn) continue;
        if (same_head(s1, s2)) continue;
        right1 = set_right(s1);
        left2 = set_left(s2);
        s3 = s1.ts_prev;
        if (
          s3 &&
          s3.time == s1.time &&
          s3.st == s1.st &&
          s3.type == C.NOTE &&
          !s3.invis
        ) {
          right3 = set_right(s3);
          for (i = 0; i < MAXPIT; i++) {
            if (right3[i] > right1[i]) right1[i] = right3[i];
          }
        } else {
          s3 = null;
        }
        d = -10;
        for (i = 0; i < MAXPIT; i++) {
          if (left2[i] + right1[i] > d) d = left2[i] + right1[i];
        }
        if (d < -3) {
          if (
            !s1.dots ||
            !s2.dots ||
            !s2.dot_low ||
            s1.stem > 0 ||
            s2.stem < 0 ||
            s1.notes[s1.nhd].pit + 2 != s2.notes[0].pit ||
            s2.notes[0].pit & 1
          )
            continue;
        }
        right2 = set_right(s2);
        left1 = set_left(s1);
        if (s3) {
          right3 = set_left(s3);
          for (i = 0; i < MAXPIT; i++) {
            if (right3[i] > left1[i]) left1[i] = right3[i];
          }
        }
        d2 = dr = dr2 = -100;
        for (i = 0; i < MAXPIT; i++) {
          if (left1[i] + right2[i] > d2) d2 = left1[i] + right2[i];
          if (right2[i] > dr2) dr2 = right2[i];
          if (right1[i] > dr) dr = right1[i];
        }
        t = 0;
        i1 = s1.nhd;
        i2 = s2.nhd;
        while (1) {
          dp = s1.notes[i1].pit - s2.notes[i2].pit;
          switch (dp) {
            case 0:
              if (s1.notes[i1].acc != s2.notes[i2].acc) {
                t = -1;
                break;
              }
              if (s2.notes[i2].acc) s2.notes[i2].acc = 0;
              if (s1.dots && s2.dots && s1.notes[i1].pit & 1) t = 1;
              break;
            case -1:
              if (s1.dots && s2.dots) {
                if (s1.notes[i1].pit & 1) {
                  s1.dot_low = false;
                  s2.dot_low = false;
                } else {
                  s1.dot_low = true;
                  s2.dot_low = true;
                }
              }
              break;
            case -2:
              if (s1.dots && s2.dots && !(s1.notes[i1].pit & 1)) {
                s1.dot_low = false;
                s2.dot_low = false;
                break;
              }
              break;
          }
          if (t < 0) break;
          if (dp >= 0) {
            if (--i1 < 0) break;
          }
          if (dp <= 0) {
            if (--i2 < 0) break;
          }
        }
        if (t < 0) {
          unison_acc(s1, s2, i1, i2);
          continue;
        }
        sd = 0;
        if (s1.dots) {
          if (s2.dots) {
            if (!t) sd = 1;
          }
        } else if (s2.dots) {
          if (d2 + dr < d + dr2) sd = 1;
        }
        pl = left2;
        pr = right2;
        //                if (!s3 && d2 + dr < d + dr2) v_invert();//这里是两个声部音高相同的时候，时值长的放前面，不需要这个逻辑了 del by hxs 2021-5-7
        d += 3;
        if (d < 0) d = 0;
        m = s1.stem >= 0 ? 0 : s1.nhd;
        d += s1.notes[m].shhd;
        m = s2.stem >= 0 ? 0 : s2.nhd;
        d -= s2.notes[m].shhd;
        if (s1.dots) {
          dx = 7.7 + s1.xmx + 3.5 * s1.dots - 3.5 + 3;
          if (!sd) {
            d2 = -100;
            for (i1 = 0; i1 <= s1.nhd; i1++) {
              i = s1.notes[i1].pit;
              if (!(i & 1)) {
                if (!s1.dot_low) i++;
                else i--;
              }
              i *= 2;
              if (i < 1) i = 1;
              else if (i >= MAXPIT - 1) i = MAXPIT - 2;
              if (pl[i] > d2) d2 = pl[i];
              if (pl[i - 1] + 1 > d2) d2 = pl[i - 1] + 1;
              if (pl[i + 1] + 1 > d2) d2 = pl[i + 1] + 1;
            }
            if (dx + d2 + 2 > d) d = dx + d2 + 2;
          } else {
            if (dx < d + dr2 + s2.xmx) {
              d2 = 0;
              for (i1 = 0; i1 <= s1.nhd; i1++) {
                i = s1.notes[i1].pit;
                if (!(i & 1)) {
                  if (!s1.dot_low) i++;
                  else i--;
                }
                i *= 2;
                if (i < 1) i = 1;
                else if (i >= MAXPIT - 1) i = MAXPIT - 2;
                if (pr[i] > d2) d2 = pr[i];
                if (pr[i - 1] + 1 > d2) d2 = pr[i - 1] = 1;
                if (pr[i + 1] + 1 > d2) d2 = pr[i + 1] + 1;
              }
              if (d2 > 4.5 && 7.7 + s1.xmx + 2 < d + d2 + s2.xmx)
                s2.xmx = d2 + 3 - 7.7;
            }
          }
        }
        d -= 2; //这里是额外加的，李总说让两个一样的音靠的更近些2022-11-7
        for (m = s2.nhd; m >= 0; m--) {
          s2.notes[m].shhd += d;
        }
        s2.xmx += d;
        if (sd) s1.xmx = s2.xmx;
      }
    }
    function check_bar(s) {
      var bar_type,
        i,
        b1,
        b2,
        s_bs,
        s2,
        p_voice = s.p_v;
      while (s.type == C.CLEF || s.type == C.KEY || s.type == C.METER) {
        if (s.type == C.METER && s.time > p_voice.sym.time) insert_meter |= 1;
        s = s.prev;
        if (!s) return;
      }
      if (s.type != C.BAR) return;
      if (s.text != undefined) {
        p_voice.bar_start = clone(s);
        p_voice.bar_start.bar_type = "";
        delete s.text;
        delete s.a_gch;
      }
      bar_type = s.bar_type;
      if (bar_type == ":") return;
      if (bar_type.slice(-1) != ":") return;
      s2 = p_voice.s_next;
      if (s2) {
        while (1) {
          switch (s2.type) {
            case C.BAR:
            case C.GRACE:
            case C.NOTE:
            case C.REST:
              break;
            default:
              s2 = s2.next;
              if (!s2) return;
          }
          break;
        }
        if (s2.type == C.BAR) {
          s_bs = s2;
        } else {
          s_bs = clone(s);
          s_bs.next = s2;
          s_bs.prev = s2.prev;
          if (s2 == p_voice.s_next) p_voice.s_next = s_bs;
          else s2.prev.next = s_bs;
          s2.prev = s_bs;
          while (!s2.seqst) s2 = s2.ts_prev;
          s_bs.ts_next = s2;
          s_bs.ts_prev = s2.ts_prev;
          if (s2 == tsnext) tsnext = s_bs;
          else s2.ts_prev.ts_next = s_bs;
          s2.ts_prev = s_bs;
          delete s_bs.seqst;
          if (s_bs == tsnext || s2.ts_prev.type != C.BAR) {
            if (s2.seqst) {
              s_bs.seqst = true;
            } else {
              s2.seqst = true;
              s2.shrink = s_bs.wr + s2.wl;
              s2.space = 0;
            }
          }
        }
      }
      if (s_bs) {
        if (bar_type[0] != ":") {
          if (bar_type == "||:") {
            s_bs.bar_type = "[|:";
            s.bar_type = "||";
            return true;
          }
          s_bs.bar_type = bar_type;
          if (s.prev && s.prev.type == C.BAR) unlksym(s);
          else s.bar_type = "|";
          return;
        }
        i = 0;
        while (bar_type[i] == ":") i++;
        if (i < bar_type.length) {
          s.bar_type = bar_type.slice(0, i) + "|]";
          i = bar_type.length - 1;
          while (bar_type[i] == ":") i--;
          s_bs.bar_type = "[|" + bar_type.slice(i + 1);
        } else {
          i = (bar_type.length / 2) | 0;
          s.bar_type = bar_type.slice(0, i) + "|]";
          s_bs.bar_type = "[|" + bar_type.slice(i);
        }
      }

      return true;
    }
    function sym_staff_move(st) {
      for (var s = tsfirst; s; s = s.ts_next) {
        if (s.nl) break;
        if (s.st == st && s.type != C.CLEF) {
          s.st++;
          s.invis = true;
        }
      }
    }
    var blocks = [];
    function block_gen(s) {
      switch (s.subtype) {
        case "leftmargin":
        case "rightmargin":
        case "botmargin":
        case "pagescale":
        case "pagewidth":
        case "scale":
        case "staffwidth":
          blk_flush();
          set_format(s.subtype, s.param);
          break;
        case "ml":
          blk_flush();
          user.img_out(s.text);
          break;
        case "newpage":
          blk_flush();
          blkdiv = 2;
          break;
        case "sep":
          set_page();
          vskip(s.sk1);
          output += '<path class="stroke"\n\td="M';
          out_sxsy((img.width - s.l) / 2 - img.lm, " ", 0);
          output += "h" + s.l.toFixed(1) + '"/>\n';
          vskip(s.sk2);
          break;
        case "text":
          if (s.type == 16) {
            //                		write_text(s.text, "block")//del by hxs 如果这样写，text居中的功能实现不了
            write_text(s.text, s.opt);
          } else {
            write_text(s.text, s.opt);
          }
          break;
        case "urltext":
          write_text(s.text, s.opt);
          break;
        case "title":
          write_title(s.text, true);
          break;
        case "vskip":
          vskip(s.sk);
          break;
      }
    }
    function set_piece(line_num) {
      var s,
        last,
        p_voice,
        st,
        v,
        nst,
        nv,
        tmp,
        non_empty = [],
        non_empty_gl = [],
        sy = cur_sy;

      function reset_staff(st) {
        var p_staff = staff_tb[st],
          sy_staff = sy.staves[st];
        if (!p_staff) p_staff = staff_tb[st] = {};
        p_staff.y = 0;
        p_staff.stafflines = sy_staff.stafflines;
        p_staff.staffscale = sy_staff.staffscale;
        p_staff.ann_top = p_staff.ann_bot = 0;
      }

      function set_brace() {
        var st,
          i,
          empty_fl,
          n = sy.staves.length;
        for (st = 0; st < n; st++) {
          if (!(sy.staves[st].flags & (OPEN_BRACE | OPEN_BRACE2))) continue;
          empty_fl = 0;
          i = st;
          while (st < n) {
            empty_fl |= non_empty[st] ? 1 : 2;
            if (sy.staves[st].flags & (CLOSE_BRACE | CLOSE_BRACE2)) break;
            st++;
          }
          if (empty_fl == 3) {
            while (i <= st) {
              non_empty[i] = true;
              non_empty_gl[i++] = true;
            }
          }
        }
      }

      function set_top_bot() {
        var st, p_staff, i, j, l;
        for (st = 0; st <= nstaff; st++) {
          p_staff = staff_tb[st];
          if (!non_empty_gl[st]) {
            p_staff.botbar = p_staff.topbar = 0;
            continue;
          }
          l = p_staff.stafflines.length;
          p_staff.topbar = 6 * (l - 1);
          for (i = 0; i < l - 1; i++) {
            switch (p_staff.stafflines[i]) {
              case ".":
              case "-":
                continue;
            }
            break;
          }
          p_staff.botline = p_staff.botbar = i * 6;
          if (i >= l - 2) {
            if (p_staff.stafflines[i] != ".") {
              p_staff.botbar -= 6;
              p_staff.topbar += 6;
            } else {
              p_staff.botbar -= 12;
              p_staff.topbar += 12;
              continue;
            }
          }
          p_staff.hll = 17 + i;
          p_staff.hlmap = new Int8Array(new Array((l - i + 1) * 2));
          for (j = 1; i < l; i++, j += 2) {
            switch (p_staff.stafflines[i]) {
              case "|":
              case "[":
                p_staff.hlmap[j - 1] = 1;
                p_staff.hlmap[j] = 1;
                p_staff.hlmap[j + 1] = 1;
                break;
            }
          }
        }
      }
      nstaff = nst = sy.nstaff;
      for (st = 0; st <= nst; st++) reset_staff(st);
      // 遍历所有的音符元素
      for (s = tsfirst; s; s = s.ts_next) {
        s.my_line = line_num; //add by hxs
        if (s.nl) {
          break;
        }
        if (!s.ts_next) last = s;
        switch (s.type) {
          case C.STAVES:
            set_brace();
            sy.st_print = new Uint8Array(non_empty);
            sy = s.sy;
            nst = sy.nstaff;
            if (nstaff < nst) {
              for (st = nstaff + 1; st <= nst; st++) reset_staff(st);
              nstaff = nst;
            }
            non_empty = [];
            continue;
          case C.BLOCK:
            if (!s.play) blocks.push(s);
            continue;
        }
        st = s.st;
        if (non_empty[st]) continue;
        switch (s.type) {
          default:
            continue;
          case C.CLEF:
            if (st > nstaff) {
              staff_tb[st].clef = s;
              unlksym(s);
            }
            continue;
          case C.BAR:
            if (s.bar_mrep || sy.staves[st].staffnonote > 1) break;
            continue;
          case C.GRACE:
            break;
          case C.NOTE:
          case C.REST:
          case C.SPACE:
          case C.MREST:
            if (sy.staves[st].staffnonote > 1) break;
            if (s.invis) continue;
            if (sy.staves[st].staffnonote != 0 || s.type == C.NOTE) break;
            continue;
        }
        non_empty_gl[st] = non_empty[st] = true;
      }
      //	        if(s && s.nl && s.extra){//如果是个倚音
      //	        	tsnext = s.ts_next;
      //	        }else{
      //	        	tsnext = s;
      //	        }
      tsnext = s;
      set_brace();
      sy.st_print = new Uint8Array(non_empty);
      set_top_bot();
      for (st = 0; st < nstaff; st++) {
        if (!non_empty_gl[st]) sym_staff_move(st);
      }
      if (!non_empty_gl[nstaff]) staff_tb[nstaff].topbar = 0;
      init_music_line(line_num); //加了一个行号的参数 add by hxs
      gene.st_print = new Uint8Array(non_empty_gl);
      if (tsnext) {
        s = tsnext;
        delete s.nl;
        last = s.ts_prev;
        last.ts_next = null;
        nv = voice_tb.length;
        for (v = 0; v < nv; v++) {
          p_voice = voice_tb[v];
          if (p_voice.sym && p_voice.sym.time <= tsnext.time) {
            for (s = tsnext.ts_prev; s; s = s.ts_prev) {
              if (s.v == v) {
                p_voice.s_next = s.next;
                s.next = null;
                if (check_bar(s)) {
                  tmp = s.wl;
                  set_width(s);
                  s.shrink += s.wl - tmp;
                }
                break;
              }
            }
            if (s) continue;
          }
          p_voice.s_next = p_voice.sym;
          p_voice.sym = null;
        }
      }
      if (last.type != C.BAR) {
        s = add_end_bar(last);
        s.space = set_space(s, last.time);
        if (s.space < s.shrink && last.type != C.KEY) s.space = s.shrink;
      }
    }
    function set_stems() {
      var s, s2, g, slen, scale, ymn, ymx, nflags, ymin, ymax, res;
      for (s = tsfirst; s; s = s.ts_next) {
        if (s.type != C.NOTE) {
          if (s.type != C.GRACE) continue;
          ymin = ymax = s.mid;
          for (g = s.extra; g; g = g.next) {
            res = identify_note(s, g.dur);
            g.head = res[0];
            g.dots = res[1];
            g.nflags = res[2];
            slen = GSTEM;
            if (g.nflags > 1) slen += 1.2 * (g.nflags - 1);
            ymn = 3 * (g.notes[0].pit - 18);
            ymx = 3 * (g.notes[g.nhd].pit - 18);
            if (s.stem >= 0) {
              g.y = ymn;
              g.ys = ymx + slen;
              ymx = Math.round(g.ys);
            } else {
              g.y = ymx;
              g.ys = ymn - slen;
              ymn = Math.round(g.ys);
            }
            ymx += 2;
            ymn -= 2;
            if (ymn < ymin) ymin = ymn;
            else if (ymx > ymax) ymax = ymx;
            g.ymx = ymx;
            g.ymn = ymn;
          }
          s.ymx = ymax;
          s.ymn = ymin;
          continue;
        }
        set_head_shift(s);
        nflags = s.nflags;
        if (s.beam_st && !s.beam_end) {
          if (s.feathered_beam) nflags = ++s.nflags;
          for (s2 = s.next; ; s2 = s2.next) {
            if (s2.type == C.NOTE) {
              if (s.feathered_beam) s2.nflags++;
              if (s2.beam_end) break;
            }
          }
          if (s2.nflags > nflags) nflags = s2.nflags;
        } else if (!s.beam_st && s.beam_end) {
          for (s2 = s.prev; ; s2 = s2.prev) {
            if (s2.beam_st) break;
          }
          if (s2.nflags > nflags) nflags = s2.nflags;
        }
        slen = cfmt.stemheight;
        switch (nflags) {
          case 2:
            slen += 0;
            break;
          case 3:
            slen += 4;
            break;
          case 4:
            slen += 8;
            break;
          case 5:
            slen += 12;
            break;
        }
        if ((scale = s.p_v.scale) != 1) slen *= (scale + 1) * 0.5;
        ymn = 3 * (s.notes[0].pit - 18);
        if (s.nhd > 0) {
          slen -= 2;
          ymx = 3 * (s.notes[s.nhd].pit - 18);
        } else {
          ymx = ymn;
        }
        if (s.ntrem) slen += 2 * s.ntrem;
        if (s.stemless) {
          if (s.stem >= 0) {
            s.y = ymn;
            s.ys = ymx;
          } else {
            s.ys = ymn;
            s.y = ymx;
          }
          s.ymx = ymx + 4;
          s.ymn = ymn - 4;
        } else if (s.stem >= 0) {
          if (
            s.notes[s.nhd].pit > 26 &&
            (nflags <= 0 || !s.beam_st || !s.beam_end)
          ) {
            slen -= 2;
            if (s.notes[s.nhd].pit > 28) slen -= 2;
          }
          s.y = ymn;
          if (s.notes[0].tie) ymn -= 3;
          s.ymn = ymn - 4;
          s.ys = ymx + slen;
          if (s.ys < s.mid) s.ys = s.mid;
          s.ymx = (s.ys + 2.5) | 0;
        } else {
          if (
            s.notes[0].pit < 18 &&
            (nflags <= 0 || !s.beam_st || !s.beam_end)
          ) {
            slen -= 2;
            if (s.notes[0].pit < 16) slen -= 2;
          }
          s.ys = ymn - slen;
          if (s.ys > s.mid) s.ys = s.mid;
          s.ymn = (s.ys - 2.5) | 0;
          s.y = ymx;
          if (s.notes[s.nhd].tie) ymx += 3;
          s.ymx = ymx + 4;
        }
      }
    }
    function set_sym_glue(width) {
      console.log("set_sym_glue");
      var s,
        g,
        ll,
        some_grace,
        spf,
        xmin = 0,
        xx = 0,
        x = 0,
        xs = 0,
        xse = 0,
        offsetx = 0, //add by hxs  x方向偏移
        spaceRate = 1; //space的比例，如果offsetx有偏移，则间隙要小一些
      for (s = tsfirst; s; s = s.ts_next) {
        if (s.type == C.GRACE && !some_grace) some_grace = s;
        if (s.seqst) {
          xmin += s.shrink;
          if (s.space) {
            if (s.space < s.shrink) {
              xse += s.shrink;
              xx += s.shrink;
            } else {
              xx += s.space;
            }
          } else {
            xs += s.shrink;
          }
        }
      }
      if (!xx) {
        realwidth = 0;
        return;
      }
      ll = !tsnext || (tsnext.type == C.BLOCK && !tsnext.play) || blocks.length;
      if (xmin >= width) {
        if (xmin > width + 5) {
          //这里增加一个+5,超出了一点时，不报错add by hxs
          //	            	error(1, s, "Line too much shrunk $1 $2 $3", xmin.toFixed(1), xx.toFixed(1), width.toFixed(1));
          error(
            1,
            s,
            "自动换行计算失败，请检查shrunk参数  $1 $2 $3",
            xmin.toFixed(1),
            xx.toFixed(1),
            width.toFixed(1)
          );
        }
        x = 0;
        for (s = tsfirst; s; s = s.ts_next) {
          if (s.seqst) x += s.shrink;
          s.x = x + offsetx;
        }
        spf_last = 0;
      } else if (
        (ll && xx + xs > width * (1 - cfmt.stretchlast)) ||
        (!ll && (xx + xs > width || cfmt.stretchstaff))
      ) {
        if (xx == xse) xx += 5;
        for (var cnt = 4; --cnt >= 0; ) {
          spf = (width - xs - xse) / (xx - xse);
          if (spf > 1.0 && offsetx == 0) {
            offsetx = 2;
          }
          xx = 0;
          xse = 0;
          x = 0;
          for (s = tsfirst; s; s = s.ts_next) {
            if (s.seqst) {
              if (s.space) {
                if (s.space * spf <= s.shrink) {
                  xse += s.shrink;
                  xx += s.shrink;
                  x += s.shrink;
                } else {
                  xx += s.space;
                  x += s.space * spf * spaceRate; //增加了spaceRate
                }
              } else {
                x += s.shrink;
              }
            }
            s.x = x + offsetx; //增加了变量offsetx  x轴偏移 add by hxs
            //add by hxs ---start
            if ((s.type == 8 || s.type == 10) && s.prev && s.prev.type == 0) {
              s.my_node_st = true;
            } else if (s.type == 8 || s.type == 10) {
              s.x -= 2;
              if (s.prev && s.prev.dur == 288 && musicType == 2) {
                s.x -= 5;
              }
            }
            if ((s.type == 8 || s.type == 10) && s.next && s.next.type == 0) {
              s.my_node_end = true;
            }
            if (s.type == 0) {
              s.x -= offsetx;
            }
            //add by hxs ---end
          }
          if (Math.abs(x - width) < 0.1) break;
        }
        spf_last = spf;
      } else {
        spf = (width - xs - xse) / xx;
        if (spf_last < spf) spf = spf_last;
        if (spf > 1.0 && offsetx == 0) {
          offsetx = 7;
        }
        for (s = tsfirst; s; s = s.ts_next) {
          // 设置x
          if (s.seqst)
            x += s.space * spf <= s.shrink ? s.shrink : s.space * spf;
          s.x = x * spaceRate + offsetx;
          //add by hxs ---start
          if ((s.type == 8 || s.type == 10) && s.prev && s.prev.type == 0) {
            s.my_node_st = true;
            //                    	s.x += 5;
          }
          if ((s.type == 8 || s.type == 10) && s.next && s.next.type == 0) {
            s.my_node_end = true;
          }
          if (s.type == 0) {
            s.x -= offsetx;
          }
          //add by hxs ---end
        }
      }
      realwidth = x;
      for (s = some_grace; s; s = s.ts_next) {
        if (s.type != C.GRACE) continue;
        if (s.gr_shift) x = s.prev.x + s.prev.wr;
        else x = s.x - s.wl;
        for (g = s.extra; g; g = g.next) g.x += x;
      }
    }
    function set_sym_line() {
      var p_voice,
        s,
        v,
        nv = voice_tb.length;
      for (v = 0; v < nv; v++) {
        p_voice = voice_tb[v];
        s = p_voice.s_next;
        p_voice.sym = s;
        if (s) s.prev = null;
      }
    }
    function set_posx() {
      posx = img.lm / cfmt.scale;
    }
    function gen_init() {
      var s = tsfirst,
        tim = s.time;
      for (; s; s = s.ts_next) {
        if (s.time != tim) {
          set_page();
          return;
        }
        switch (s.type) {
          case C.NOTE:
          case C.REST:
          case C.MREST:
            set_page();
            return;
          default:
            continue;
          case C.STAVES:
            cur_sy = s.sy;
            break;
          case C.BLOCK:
            block_gen(s);
            break;
        }
        unlksym(s);
        if (s.p_v.s_next == s) s.p_v.s_next = s.next;
      }
      tsfirst = null;
    }

    // 输出乐谱
    Abc.prototype.output_music = function () {
      var v, lwidth, indent, line_height, ts1st, tslast, p_v;
      gen_init();
      posy_sum = 0; //add by hxs
      if (!tsfirst) return;
      tunes.push([tsfirst, voice_tb]);
      set_global();
      if (voice_tb.length > 1) self.set_stem_dir();
      for (v = 0; v < voice_tb.length; v++) set_beams(voice_tb[v].sym);
      set_stems();
      set_acc_shft(); //这句不能移到set_overlap后面，否则2个声部显示在同一行的同音（其中有一个音有升降调）会出现挤在一起的情况
      if (voice_tb.length > 1) {
        set_rest_offset();
        set_overlap();
      }
      set_allsymwidth();
      indent = set_indent(true);
      if (cfmt.singleline) {
        v = get_ck_width();
        lwidth = indent + v[0] + v[1] + get_width(tsfirst, null)[0];
        img.width = lwidth * cfmt.scale + img.lm + img.rm + 2;
      } else {
        lwidth = get_lwidth();
        //强制换行（音符太多了）
        cut_tune(lwidth, indent);
      }
      ts1st = tsfirst;
      v = voice_tb.length;
      while (--v >= 0) voice_tb[v].osym = voice_tb[v].sym;
      spf_last = 1.2;
      self.line = 0;

      if (0 != musicType) {
        // todo
        for (var s = tsfirst; s; s = s.ts_next) {
          if (s && s != null) {
            syms[s.istart] = s; ///////////////////////
          }
        }
        //	console.log('syms----------',syms)
        //	console.log('保存每个小节的最小、最大声部------')
        //保存每个小节的最小、最大声部
        getVoiceNumBybar();
      }

      while (1) {
        //	如果是更新状态,且不是当前编辑的行，则不渲染，直接取上次渲染的数据***start
        //            	if(self.line!=0 && self.line!=undefined && select_note_info!=null && self.line!=parseInt(editSvgLineIndex)){
        //            		//console.log("不是当前编辑的行，不渲染，直接取上次渲染的数据")
        //            		//console.log("0---------",(new Date()).getTime());
        //                	user.img_out(svgArr[parseInt(self.line)].outerHTML);
        //            		set_piece(self.line);
        //            		for (var s = tsfirst;s; s = s.ts_next) {
        //            			if(s && s!=null){
        //            				syms[s.istart] = s;///////////////////////
        //            			}
        //            		}
        //
        ////            		console.log("1---------",(new Date()).getTime());
        //
        //            		//如果行号不是当前编辑的行号相同，则跳过
        //            		tsfirst = tsnext;
        //
        //            		if(!tsfirst){// create by lhj
        //                    	lineyArr = [];
        //                    	isChordScore = false;
        //                    }
        //                    if (!tsnext) break;
        //                    gen_init();
        //                    if (!tsfirst) break;
        //                    tsfirst.ts_prev = null;
        //                    set_sym_line();
        //                    lwidth = get_lwidth();
        //                    indent = set_indent();
        //                	self.line++;
        //
        //                	if(self.line>=svgArr.length){
        //                		return;
        //                	}
        //                	continue;
        //                }
        //************************8end
        //            	console.log("output_music.....")

        if (!tsfirst) break;

        set_piece(self.line); //根据行分段开 增加了行号参数 add by hxs
        set_sym_glue(lwidth - indent);
        if (realwidth != 0) {
          if (indent != 0) posx += indent;
          // create by lhj 获取每个小节的最高声部
          // getVoiceNumBybar();
          setLowerNoteY(self.line, tsfirst.st);
          // create by lhj 添加行号
          draw_sym_near();
          line_height = set_staff();
          delayed_update();
          draw_systems(indent);
          // 画出所有的音符
          draw_all_sym();
          vskip(line_height);
          if (indent != 0) {
            posx -= indent;
            insert_meter &= ~2;
          }
          while (blocks.length != 0) block_gen(blocks.shift());
        }

        tsfirst = tsnext;
        //console.log("2tsfirst:",tsfirst)
        //                console.log("svg_flush-------------------------------")
        vskip(parseInt(cfmt.botmargin)); //底边距 add by hxs
        svg_flush(self.line);
        //console.log("3tsfirst:",tsfirst)

        if (!tsfirst) {
          // create by lhj
          lineyArr = [];
          barVoiceNumArr = [];
          isChordScore = false;
        }
        if (!tsnext) break;
        gen_init();
        if (!tsfirst) break;
        tsfirst.ts_prev = null;
        set_sym_line();
        lwidth = get_lwidth();
        indent = set_indent();
        self.line++; //记录谱表行号add by lhj
      }
    };

    // 1、保存同一谱表的数据
    // 2、根据同一谱表的数据，取出最小声部、最大声部
    var voiceMap = {},
      bmap = {},
      tmpArr = [],
      mK;
    var checkExistKey = "";

    // 找到第一个音符
    function findFirstNote(po) {
      var tb = clone(po);
      var po;
      for (var a = tb; a; a = a.next) {
        if (a.type == 8) {
          po = a;
          break;
        }
      }
      return po;
    }

    function findBarVoice(po, subPo, subPotb, max, min, mKey, k, i) {}

    function getVoiceNumBybar(arr) {
      var mKey = "",
        max = 0,
        min = 0;
      isVoiceMerge = false;
      //for( var i = 0, k, po, subPo, subPotb, firstNote; i < arr.length; i++){
      var i = 0,
        k,
        po,
        subPo,
        subPotb,
        firstNote;
      var firstNote = 0;
      for (var k in syms) {
        po = clone(syms[k]);

        if (syms[k].dot_low_note && !isVoiceMerge) {
          isVoiceMerge = true;
        }
        //k = po.istart;
        //	console.log('k----------',k)
        if (po.type !== 8 && po.type !== 0 && po.type !== 1) {
          continue;
        }

        if (po.type == 1 || (firstNote == 0 && po.type == 8)) {
          max = 0;
          firstNote = findFirstNote(po);
          if (!firstNote) {
            firstNote = po;
          }
          po = clone(firstNote);

          mKey = po.istart + ","; // 小节区间第一个音符
          min = po.v;
          firstNote = po.istart;
        }

        if (po.v > max) {
          max = po.v;
        }

        if (po.v < min) {
          min = po.v;
        }

        if (po.dot_low_note) {
          subPotb = clone(po.dot_low_note);
          for (subPo = subPotb; subPo; subPo = subPo.s.next.dot_low_note) {
            if (subPo.s.v > max) {
              max = subPo.s.v;
            }

            if (subPo.s.v < min) {
              min = subPo.s.v;
            }

            if (!subPo.s.next) {
              break;
            }
          }
        }

        //console.log('po.istart--8-',po.istart)
        if (po.type == 0) {
          // 小节区间第二个音符

          mKey += k;
          bmap[mKey] = {
            max: max,
            min: min,
          };
          max = 0;
          min = po.v;
          mKey = k + ",";
          //console.log('po.istart-0--',po.istart)
          if (syms.length - 1 == i) {
            mKey = "";
            i = -1;
          }
        }
        i++;
      }

      var tmpArr;
      for (var k in bmap) {
        if (checkExistKey.indexOf("'" + k + "'") > -1) {
          continue;
        }
        tmpArr = k.split(",");
        if (tmpArr[1] < tmpArr[0]) {
          continue;
        }
        checkExistKey += ",'" + k + "'";
        barVoiceNumArr.push({
          key: k,
          vMax: isVoiceMerge ? bmap[k].max : 0,
          vMin: isVoiceMerge ? bmap[k].min : 0,
        });
      }
    }

    // 获取超出五线谱第一线的音符坐标。add by lhj 通过curAddHei调整简谱行高
    function setLowerNoteY(line, st) {
      var tmp = clone(tsfirst);
      // console.log(tmp)
      for (var b = tmp; b; b = b.ts_next) {
        var lny = 0,
          tb = clone(b),
          key = "";
        var i = 0,
          chordTotalHei = 0,
          chordHei = 0,
          addTotalHei = 0,
          addHei = 0;
        for (var a = tb; a; a = a.next) {
          //	console.log('istart----------',a.istart)
          var cury = a.ymn;
          if (a.type == 8 || a.type == 10) {
            if (a.dot_low) {
              continue;
            }
            var curnote = source_val.slice(a.istart, a.iend);
            // 遇到和弦ymin还得往下加
            var isChord = eq("\\[,\\]", curnote);
            var noteReg = curnote.match(/[\=\^\_]*[a-zA-Z][\'\,\/]*/g);
            // [I:staff -1] 标记的音符，按和弦处理
            if (a.dot_low_note) {
              isChord = true;
              var dotLowNote = source_val.slice(
                a.dot_low_note.istart,
                a.dot_low_note.iend
              );
              var newNoteArr = dotLowNote.match(/[\=\^\_]*[a-zA-Z][\'\,\/]*/g);
              if (noteReg != null && newNoteArr != null) {
                noteReg = noteReg.concat(newNoteArr);
              }
            }
            if (isChord) {
              isChordScore = true;
              // 与staff2num-splnum.js 预留的和弦间距保持一致
              chordTotalHei =
                (circleSpace * 1 +
                  1 +
                  underlineSpace * 1 +
                  1 +
                  Number(chordFontSize - 8) -
                  circleMarginTop +
                  chordSpace) *
                chordScale *
                ((noteReg || "").length - 1);
              //chordTotalHei = (circleSpace * 3 + 4 + underlineSpace * 3 + 4 + Number(chordFontSize)  + chordSpace ) * chordScale * ((noteReg || "").length - 1);
              if (a.dot_low_note) {
                //chordTotalHei += 20;// todo调试一下
              }
            }

            var agch = a.a_gch,
              curAddHei = 0,
              add = a.a_dd;
            //标记一下是否已经加过了高度（注释和装饰不能同时加）
            var hasAddHei = false;
            if (add && add.length) {
              isChordScore = true;
              // curAddHei = 0 ;
              var lastAdd = null;
              for (var k = 0; k < add.length; k++) {
                if (a.type == 0) {
                  continue;
                }
                if (
                  ("cresc" == lastAdd || "dim" == lastAdd) &&
                  add[k].glyph == "pf"
                ) {
                  continue;
                }
                if (
                  ("cresc" == add[k].glyph || "dim" == add[k].glyph) &&
                  lastAdd == "pf"
                ) {
                  continue;
                }
                if ("cresc" != add[k].glyph && "dim" != add[k].glyph) {
                  if (add[k].glyph == "img") {
                    // 图片的注释特殊处理一下
                    curAddHei += 5;
                  } else {
                    //										 curAddHei += add[k].h*.5;  //这里先去掉，否则简谱行高会变得很高，后面如果有问题，要具体问题具体定义高度 2022-7-22
                  }
                  // console.log('curAddHei-1--',curAddHei)
                } else {
                  if ("dim" == add[k].glyph || "cresc" == add[k].glyph) {
                    if (a.my_inslur || a.sls) {
                      curAddHei += 10;
                    }
                    if (sameLineDim[line]) {
                      continue;
                    }
                    // 同一个音符头上出现强弱符，只要取一个高度
                    if ("dim" == lastAdd || "cresc" == add[k].glyph) {
                      continue;
                    }
                    // curAddHei += 26; todo create by 20211022
                    curAddHei += add[k].h * 0.3;
                    sameLineDim[line] = true;
                  } else {
                    curAddHei += 15;
                  }

                  // console.log('curAddHei-2--',curAddHei)
                }
                lastAdd = add[k].glyph;
              }
              //console.log(' 感情符号的高度=curAddHei=======', curAddHei);
              addTotalHei += curAddHei;
              // console.log('addTotalHei-2--',addTotalHei)
              hasAddHei = true;
            }
            // 注释的高度
            if (agch && agch.length) {
              isChordScore = true;
              for (var j = 0; j < agch.length; j++) {
                if (a.type == 0 || hasAddHei) {
                  continue;
                }

                // 背景颜色不作为注释
                if (agch[j].text && agch[j].text.indexOf("rgb") > -1) {
                  continue;
                }

                //curAddHei += abc.setStrwh("小")[1];//这里增加这句代码后，2个或2个以上的注释，会多增加空白区域
                if (!agch[j].text.repeat(/\s/g, "")) {
                  // 空格取一半的高度
                  curAddHei += 5;
                } else {
                  curAddHei += agch[0].wh[1] * 0.5; //这里增加这句代码后，2个或2个以上的注释，会多增加空白区域
                }
                //								 if(musicType==1){
                //									 curAddHei += abc.setStrwh("小")[1];
                //								 }
                //console.log(' 注释的高度==curAddHei======' + agch[j].text + '--' + hasAddHei, addTotalHei);
              }
              // 不能动
              if (!hasAddHei) {
                addTotalHei += curAddHei;
                hasAddHei = true;
              }
            }

            // 碰到连音线，预留15的高度
            if (
              a.in_tuplet ||
              a.my_inslur ||
              a.slur_start != null ||
              a.slur_end != null ||
              a.tie_s ||
              a.sls ||
              a.sl1 ||
              a.tp
            ) {
              // 官方的参数：同音连 由a.ti1改 a.tie_s update by lhj
              if (a.stem > 0) {
                // 符杆向上，弧线向下
                isChordScore = true;
                //addTotalHei += 15; //todo调试一下
              }
            }

            // console.log("最后====", addTotalHei)
          }

          if (!a.istart) {
            continue;
          }

          // 获取该行第一个音符
          if (i == 0) {
            key += a.istart;
          }

          // 获取该行最后一个音符
          if (!a.next) {
            key += "," + a.istart;
          }
          //	console.log("lny > (Number(cury) - chordTotalHei - addTotalHei) ", lny, Number(cury) - chordTotalHei - addTotalHei);
          if (lny > Number(cury) - chordTotalHei - addTotalHei) {
            lny = Number(cury) - chordTotalHei - addTotalHei;
            chordHei = chordTotalHei;
            addHei = addTotalHei;
          }
          // chordTotalHei = 0;
          addTotalHei = 0;
          st = a.st;
          i++;
        }
        //情况1： tsfirst 以为这个玩意只会返回不同行的数据。实际返回值情况如下所示
        //key 410,6345 ymn -6 st 3 line 34 crdHei 0 addHei 0
        //key 410,5029 ymn -72 st 3 line 34 crdHei 65 addHei 0
        //
        //情况2：同样的小节线分布在不同行
        //索引值973 :line=30;st=0
        //索引值973 :line=31;st=0
        //
        for (var n = 0; n < lineyArr.length; n++) {
          var item = lineyArr[n];
          if (item.st == st && item.line == line) {
            //console.log('key---',key);
            //        				if(key == '381,396'){
            //        					debugger;
            //        				}
            if (item.ymn - item.crdHei - item.addHei <= lny) {
              lny = item.ymn;
              chordHei = item.crdHei;
              addHei = item.addHei;
            } else {
              lineyArr.splice(n, 1);
            }
          }
        }

        lineyArr.push({
          key: key,
          ymn: lny,
          y: 0,
          ymx: 0,
          st: st,
          line: line,
          crdHei: chordHei,
          addHei: addHei,
        });
        //console.log(lineyArr, '============key', key,'ymn', lny, 'st' ,st, 'line', line, 'crdHei', chordHei, 'addHei', addHei)
        if (b.st == staff_tb.length - 1) {
          break;
        }
      }
    }

    function reset_gen() {
      insert_meter = cfmt.writefields.indexOf("M") >= 0 ? 3 : 2;
    }
    var a_gch,
      a_dcn,
      multicol,
      maps = {};
    var a_dcn_info; //add by hxs用于存储a_dcn的istart ,iend信息
    var qplet_tb = new Int8Array([0, 1, 3, 2, 3, 0, 2, 0, 3, 0]),
      ntb = "CDEFGABcdefgabhm";
    function set_ref(s) {
      s.fname = parse.fname;
      s.istart = parse.istart;
      s.iend = parse.iend;
    }
    function new_clef(clef_def) {
      var s = {
          type: C.CLEF,
          clef_line: 2,
          clef_type: "t",
          v: curvoice.v,
          p_v: curvoice,
          time: curvoice.time,
          dur: 0,
        },
        i = 1;
      set_ref(s);
      switch (clef_def[0]) {
        case '"':
          i = clef_def.indexOf('"', 1);
          s.clef_name = clef_def.slice(1, i);
          i++;
          break;
        case "a":
          if (clef_def[1] == "u") {
            s.clef_type = "a";
            s.clef_auto = true;
            i = 4;
            break;
          }
          i = 4;
        case "C":
          s.clef_type = "c";
          s.clef_line = 3;
          break;
        case "b":
          i = 4;
        case "F":
          s.clef_type = "b";
          s.clef_line = 4;
          break;
        case "n":
          i = 4;
          s.invis = true;
          break;
        case "t":
          if (clef_def[1] == "e") {
            s.clef_type = "c";
            s.clef_line = 4;
            break;
          }
          i = 6;
        case "G":
          break;
        case "p":
          i = 4;
        case "P":
          s.clef_type = "p";
          s.clef_line = 3;
          curvoice.key.k_sf = 0;

          if (!curvoice.key.hasOwnProperty("my_k_sf")) {
            curvoice.key.my_k_sf = 0;
          }
          curvoice.ckey.k_sf = 0;
          curvoice.ckey.k_map = abc2svg.keys[7];
          curvoice.ckey.k_b40 = 2;
          curvoice.ckey.k_drum = true;
          break;
        default:
          syntax(1, "Unknown clef '$1'", clef_def);
          return;
      }
      if (clef_def[i] >= "1" && clef_def[i] <= "9") {
        s.clef_line = Number(clef_def[i]);
        i++;
      }
      if (clef_def[i + 1] != "8") return s;
      switch (clef_def[i]) {
        case "^":
          s.clef_oct_transp = true;
        case "+":
          s.clef_octave = 7;
          break;
        case "_":
          s.clef_oct_transp = true;
        case "-":
          s.clef_octave = -7;
          break;
      }
      return s;
    }
    var note_pit = new Int8Array([0, 2, 4, 5, 7, 9, 11]);
    //老版本的方法，注释掉 add by hxs 2022-5-9,老的方法transpose有些有问题
    /*function get_transp(param, type) {
            var i, val, tmp, note, pit = [];
            if (param[0] == "0") return 0;
            if ("123456789-+".indexOf(param[0]) >= 0) {
                val = parseInt(param) * 3;
                if (isNaN(val) || val < -108 || val > 108) {
                    syntax(1, "Bad transpose value");
                    return
                }
                switch (param.slice( - 1)) {
                default:
                    return val;
                case "#":
                    val++;
                    break;
                case "b":
                    val += 2;
                    break
                }
                if (val > 0) return val;
                return val - 3
            }
            if (type == "instr") {
                tmp = param.indexOf("/");
                if (!cfmt.sound) {
                    if (tmp < 0) return 0;
                    param = param.replace("/", "")
                } else {
                    if (tmp < 0) param = "c" + param;
                    else param = param.replace(/.*\//, "c")
                }
            }
            tmp = new scanBuf;
            tmp.buffer = param;
            for (i = 0; i < 2; i++) {
                note = parse_acc_pit(tmp);
                if (!note) {
                    syntax(1, "Bad transpose value");
                    return
                }
                note.pit += 124;
                val = (note.pit / 7 | 0) * 12 + note_pit[note.pit % 7];
                if (note.acc && note.acc != 3) val += note.acc;
                pit[i] = val
            }
            // if (cfmt.sound) pit[0] = 252;
            val = (pit[1] - pit[0]) * 3;
            if (note) {
                switch (note.acc) {
                default:
                    return val;
                case 2:
                case 1:
                    val++;
                    break;
                case - 1 : case - 2 : val += 2;
                    break
                }
            }
            if (val > 0) return val;
            return val - 3
        }*/
    function get_transp(param) {
      if (param[0] == "0") return 0;
      if ("123456789-+".indexOf(param[0]) >= 0) {
        var val = parseInt(param);
        if (isNaN(val) || val < -36 || val > 36) {
          syntax(1, errs.bad_transp);
          return;
        }
        val += 36;
        return (
          (((val / 12) | 0) - 3) * 40 +
          (param.slice(-1) == "b" ? abc2svg.ifb40 : abc2svg.isb40)[val % 12]
        );
      }
    }
    function get_interval(param, score) {
      var i, val, tmp, note, pit;
      tmp = new scanBuf();
      tmp.buffer = param;
      pit = [];
      for (i = 0; i < 2; i++) {
        note = tmp.buffer[tmp.index] ? parse_acc_pit(tmp) : null;
        if (!note) {
          if (i != 1 || !score) {
            syntax(1, "Bad transpose value");
            return;
          }
          pit[i] = 242;
        } else {
          pit[i] = abc2svg.pab40(note.pit, note.acc);
        }
      }
      return pit[1] - pit[0];
    }
    function set_linebreak(param) {
      var i, item;
      for (i = 0; i < 128; i++) {
        if (char_tb[i] == "\n") char_tb[i] = nil;
      }
      param = param.split(/\s+/);
      for (i = 0; i < param.length; i++) {
        item = param[i];
        switch (item) {
          case "!":
          case "$":
          case "*":
          case ";":
          case "?":
          case "@":
            break;
          case "<none>":
            continue;
          case "<EOL>":
            item = "\n";
            break;
          default:
            syntax(1, "%%linebreak 的配置无法识别 '$1' ", item);
            continue;
        }
        char_tb[item.charCodeAt(0)] = "\n";
      }
    }
    function set_user(parm) {
      var k,
        c,
        v,
        a = parm.match(/(.*?)[= ]*([!"].*[!"])/);
      if (!a) {
        syntax(1, '标签U:中缺少开始标记 ! 或 "  U: / %%user');
        return;
      }
      c = a[1];
      v = a[2];
      if (v.slice(-1) != v[0]) {
        syntax(1, "标签U:中缺少结束标记 $1  U:/%%user", v[0]);
        return;
      }
      if (c[0] == "\\") {
        if (c[1] == "t") c = "\t";
        else if (!c[1]) c = " ";
      }
      k = c.charCodeAt(0);
      if (k >= 128) {
        syntax(1, errs.not_ascii);
        return;
      }
      switch (char_tb[k][0]) {
        case "0":
        case "d":
        case "i":
        case " ":
          break;
        case '"':
        case "!":
          if (char_tb[k].length > 1) break;
        default:
          syntax(1, "Bad user character '$1'", c);
          return;
      }
      switch (v) {
        case "!beambreak!":
          v = " ";
          break;
        case "!ignore!":
          v = "i";
          break;
        case "!nil!":
        case "!none!":
          v = "d";
          break;
      }
      char_tb[k] = v;
    }
    function get_st_lines(param) {
      if (!param) return;
      if (/^[\]\[|.-]+$/.test(param)) return param.replace(/\]/g, "[");
      var n = parseInt(param);
      switch (n) {
        case 0:
          return "...";
        case 1:
          return "..|";
        case 2:
          return ".||";
        case 3:
          return ".|||";
      }
      if (isNaN(n) || n < 0 || n > 16) return;
      return "||||||||||||||||".slice(0, n);
    }
    function new_block(subtype) {
      var s = {
        type: C.BLOCK,
        subtype: subtype,
        dur: 0,
      };
      if (parse.state == 2) goto_tune();
      var voice_s = curvoice;
      curvoice = voice_tb[par_sy.top_voice];
      sym_link(s);
      curvoice = voice_s;
      return s;
    }
    function set_vp(a) {
      var s, item, pos, val, clefpit;
      while (1) {
        item = a.shift();
        if (!item) break;
        if (item.slice(-1) == "=" && !a.length) {
          syntax(1, errs.bad_val, item);
          break;
        }
        switch (item) {
          case "clef=":
            s = a.shift();
            break;
          case "clefpitch=":
            item = a.shift();
            if (item) {
              val = ntb.indexOf(item[0]);
              if (val >= 0) {
                switch (item[1]) {
                  case "'":
                    val += 7;
                    break;
                  case ",":
                    val -= 7;
                    if (item[2] == ",") val -= 7;
                    break;
                }
                clefpit = 4 - val;
                break;
              }
            }
            syntax(1, errs.bad_val, item);
            break;
          case "octave=":
          case "uscale=":
            val = parseInt(a.shift());
            if (isNaN(val)) syntax(1, errs.bad_val, item);
            else curvoice[item.slice(0, -1)] = val;
            break;
          case "cue=":
            curvoice.scale = a.shift() == "on" ? 0.7 : 1;
            break;
          case "instrument=":
            item = a.shift();
            val = item.indexOf("/");
            if (val < 0) {
              val = 0;
              curvoice.sndtran = get_interval("c" + item);
            } else {
              curvoice.sndtran = get_interval("c" + item.slice(val + 1));
              val = get_interval(item.replace("/", ""));
            }
            curvoice.transp = cfmt.sound ? curvoice.sndtran : val;
            break;
          case "map=":
            curvoice.map = a.shift();
            break;
          case "name=":
          case "nm=":
            curvoice.nm = a.shift();
            if (curvoice.nm[0] == '"') curvoice.nm = curvoice.nm.slice(1, -1);
            curvoice.new_name = true;
            break;
          case "stem=":
          case "pos=":
            if (item == "pos=") item = a.shift().split(" ");
            else item = ["stm", a.shift()];
            val = posval[item[1]];
            if (val == undefined) {
              syntax(1, errs.bad_val, item[0]);
              break;
            }
            if (!pos) pos = {};
            pos[item[0]] = val;
            break;
          case "scale=":
            val = parseFloat(a.shift());
            if (isNaN(val) || val < 0.6 || val > 1.5)
              syntax(1, errs.bad_val, "%%voicescale");
            else curvoice.scale = val;
            break;
          case "score=":
            item = a.shift();
            if (cfmt.sound) break;
            curvoice.transp = get_transp(item);
            break;
          case "shift=":
            curvoice.shift = curvoice.sndsh = get_interval(a.shift());
            break;
          case "sound=":
          case "transpose=":
            if (cfmt.nedo) {
              syntax(1, errs.notransp);
              break;
            }
            val = get_transp(a.shift());
            if (val == undefined) {
              syntax(1, errs.bad_transp);
            } else {
              curvoice.sndtran = val;
              if (cfmt.sound) curvoice.transp = val;
              tr_p = 1;
            }
            break;
          case "subname=":
          case "sname=":
          case "snm=":
            curvoice.snm = a.shift();
            if (curvoice.snm[0] == '"')
              curvoice.snm = curvoice.snm.slice(1, -1);
            break;
          case "stafflines=":
            val = get_st_lines(a.shift());
            if (val == undefined) syntax(1, "Bad %%stafflines value");
            else if (curvoice.st != undefined)
              par_sy.staves[curvoice.st].stafflines = val;
            else curvoice.stafflines = val;
            break;
          case "staffnonote=":
            val = parseInt(a.shift());
            if (isNaN(val)) syntax(1, "Bad %%staffnonote value");
            else curvoice.staffnonote = val;
            break;
          case "staffscale=":
            val = parseFloat(a.shift());
            if (isNaN(val) || val < 0.3 || val > 2)
              syntax(1, "Bad %%staffscale value");
            else curvoice.staffscale = val;
            break;
          default:
            switch (item.slice(0, 4)) {
              case "treb":
              case "bass":
              case "alto":
              case "teno":
              case "perc":
                s = item;
                break;
              default:
                if ("GFC".indexOf(item[0]) >= 0) s = item;
                else if (item.slice(-1) == "=") a.shift();
                break;
            }
            break;
        }
      }
      if (pos) {
        curvoice.pos = clone(curvoice.pos);
        for (item in pos)
          if (pos.hasOwnProperty(item)) curvoice.pos[item] = pos[item];
      }
      if (s) {
        s = new_clef(s);
        if (s) {
          if (clefpit) s.clefpit = clefpit;
          get_clef(s);
        }
      }
    }
    function set_kv_parm(a) {
      if (!curvoice.init) {
        curvoice.init = true;
        if (info.V) {
          if (info.V["*"]) a = info.V["*"].concat(a);
          if (info.V[curvoice.id]) a = info.V[curvoice.id].concat(a);
        }
      }
      if (a.length) set_vp(a);
    }
    function memo_kv_parm(vid, a) {
      if (a.length == 0) return;
      if (!info.V) info.V = {};
      if (info.V[vid]) Array.prototype.push.apply(info.V[vid], a);
      else info.V[vid] = a;
    }
    function new_key(param) {
      //	    	console.log("new_key:",param);
      if (param != "bass" && param != "treble") {
        currentKey = param;
      }

      var i,
        clef,
        key_end,
        c,
        tmp,
        exp,
        sf = "FCGDAEB".indexOf(param[0]) - 1,
        mode = 0,
        s = {
          type: C.KEY,
          dur: 0,
        };

      function set_k_acc(s, sf) {
        var i,
          j,
          n,
          nacc,
          p_acc,
          accs = [],
          pits = [],
          m_n = [],
          m_d = [];
        if (sf > 0) {
          for (nacc = 0; nacc < sf; nacc++) {
            accs[nacc] = 1;
            pits[nacc] = [26, 23, 27, 24, 21, 25, 22][nacc];
          }
        } else {
          for (nacc = 0; nacc < -sf; nacc++) {
            accs[nacc] = -1;
            pits[nacc] = [22, 25, 21, 24, 20, 23, 26][nacc];
          }
        }
        n = s.k_a_acc.length;
        for (i = 0; i < n; i++) {
          p_acc = s.k_a_acc[i];
          for (j = 0; j < nacc; j++) {
            if (pits[j] == p_acc.pit) {
              accs[j] = p_acc.acc;
              if (p_acc.micro_n) {
                m_n[j] = p_acc.micro_n;
                m_d[j] = p_acc.micro_d;
              }
              break;
            }
          }
          if (j == nacc) {
            accs[j] = p_acc.acc;
            pits[j] = p_acc.pit;
            if (p_acc.micro_n) {
              m_n[j] = p_acc.micro_n;
              m_d[j] = p_acc.micro_d;
            }
            nacc++;
          }
        }
        for (i = 0; i < nacc; i++) {
          p_acc = s.k_a_acc[i];
          if (!p_acc) p_acc = s.k_a_acc[i] = {};
          p_acc.acc = accs[i];
          p_acc.pit = pits[i];
          if (m_n[i]) {
            p_acc.micro_n = m_n[i];
            p_acc.micro_d = m_d[i];
          } else {
            delete p_acc.micro_n;
            delete p_acc.micro_d;
          }
        }
      }
      set_ref(s);
      i = 1;
      if (sf < -1) {
        switch (param[0]) {
          case "H":
            switch (param[1]) {
              case "P":
              case "p":
                s.k_bagpipe = param[1];
                sf = param[1] == "P" ? 0 : 2;
                i++;
                break;
              default:
                syntax(1, "Unknown bagpipe-like key");
                key_end = true;
                break;
            }
            break;
          case "P":
            syntax(1, "K:P is deprecated");
            sf = 0;
            s.k_drum = true;
            key_end = true;
            break;
          case "n":
            if (param.indexOf("none") == 0) {
              sf = 0;
              s.k_none = true;
              i = 4;
              break;
            }
          default:
            s.k_map = [];
            return [s, info_split(param)];
        }
      }
      if (!key_end) {
        switch (param[i]) {
          case "#":
            sf += 7;
            i++;
            break;
          case "b":
            sf -= 7;
            i++;
            break;
        }
        param = param.slice(i).trim();
        switch (param.slice(0, 3).toLowerCase()) {
          default:
            if (
              param[0] != "m" ||
              (param[1] != " " && param[1] != "\t" && param[1] != "\n")
            ) {
              key_end = true;
              break;
            }
          case "aeo":
          case "m":
          case "min":
            sf -= 3;
            mode = 5;
            break;
          case "dor":
            sf -= 2;
            mode = 1;
            break;
          case "ion":
          case "maj":
            break;
          case "loc":
            sf -= 5;
            mode = 6;
            break;
          case "lyd":
            sf += 1;
            mode = 3;
            break;
          case "mix":
            sf -= 1;
            mode = 4;
            break;
          case "phr":
            sf -= 4;
            mode = 2;
            break;
        }
        if (!key_end) param = param.replace(/\w+\s*/, "");
        if (param.indexOf("exp ") == 0) {
          param = param.replace(/\w+\s*/, "");
          if (!param) syntax(1, "No accidental after 'exp'");
          exp = true;
        }
        c = param[0];
        if (c == "^" || c == "_" || c == "=") {
          s.k_a_acc = [];
          tmp = new scanBuf();
          tmp.buffer = param;
          do {
            var note = parse_acc_pit(tmp);
            if (!note) break;
            s.k_a_acc.push(note);
            c = param[tmp.index];
            while (c == " ") c = param[++tmp.index];
          } while (c == "^" || c == "_" || c == "=");
          if (!exp) set_k_acc(s, sf);
          param = param.slice(tmp.index);
        } else if (exp && param.indexOf("none") == 0) {
          sf = 0;
          param = param.replace(/\w+\s*/, "");
        }
      }
      s.k_sf = sf;
      if (!s.hasOwnProperty("my_k_sf")) {
        s.my_k_sf = sf - 0;
        currentKSF = sf;
        if (staffOriKSF == 9999) {
          staffOriKSF = sf;
        }
      }
      if (s.k_a_acc) {
        s.k_map = [];
        i = s.k_a_acc.length;
        while (--i >= 0) {
          note = s.k_a_acc[i];
          s.k_map[(note.pit + 19) % 7] = note.acc;
        }
      } else {
        s.k_map = abc2svg.keys[sf + 7];
      }
      s.k_mode = mode;
      s.k_b40 = [1, 24, 7, 30, 13, 36, 19, 2, 25, 8, 31, 14, 37, 20, 3][sf + 7];
      return [s, info_split(param)];
    }
    function new_meter(p) {
      if(musicType==1){
          // 五线谱+简谱时隐藏顶部简谱拍号和调号
          set_format('hiddenmeter', true)
          set_format('hiddenkey', true)
      }
      // 当前拍号 add by hxs
      currMeter = new Array();
      renderStaffMeterCount++;
      var s = {
          type: C.METER,
          dur: 0,
          a_meter: [],
        },
        meter = {},
        val,
        v,
        m1 = 0,
        m2,
        i = 0,
        j,
        wmeasure,
        in_parenth;
      set_ref(s);
      if (p.indexOf("none") == 0) {
        i = 4;
        wmeasure = 1;
      } else {
        wmeasure = 0;
        while (i < p.length) {
          if (p[i] == "=") break;
          switch (p[i]) {
            case "C":
              meter.top = p[i++];
              if (!m1) {
                m1 = 4;
                m2 = 4;
                currMeter.push({ top: m1, bot: m2 }); //设置当前拍号
              }
              break;
            case "c":
            case "o":
              meter.top = p[i++];
              if (!m1) {
                if (p[i - 1] == "c") {
                  m1 = 2;
                  m2 = 4;
                } else {
                  m1 = 3;
                  m2 = 4;
                }
                switch (p[i]) {
                  case "|":
                    m2 /= 2;
                    currMeter.push({ top: m1, bot: m2 }); //设置当前拍号
                    break;
                  case ".":
                    m1 *= 3;
                    m2 *= 2;
                    currMeter.push({ top: m1, bot: m2 }); //设置当前拍号
                    break;
                }
              }
              currMeter.push({ top: m1, bot: m2 }); //设置当前拍号
              break;
            case ".":
            case "|":
              m1 = 0;
              meter.top = p[i++];
              break;
            case "(":
              if (p[i + 1] == "(") {
                in_parenth = true;
                meter.top = p[i++];
                s.a_meter.push(meter);
                meter = {};
              }
              j = i + 1;
              while (j < p.length) {
                if (p[j] == ")" || p[j] == "/") break;
                j++;
              }
              if (p[j] == ")" && p[j + 1] == "/") {
                i++;
                continue;
              }
            case ")":
              in_parenth = p[i] == "(";
              meter.top = p[i++];
              s.a_meter.push(meter);
              meter = {};
              continue;
            default:
              if (p[i] <= "0" || p[i] > "9") {
                //                                syntax(1, "Bad char '$1' in M:", p[i])
                syntax(1, "节拍M: 中存在错误的字符 '$1'", p[i]);
                return;
              }
              m2 = 2;
              meter.top = p[i++];
              for (;;) {
                while (p[i] >= "0" && p[i] <= "9") meter.top += p[i++];
                if (p[i] == ")") {
                  if (p[i + 1] != "/") break;
                  i++;
                }
                if (p[i] == "/") {
                  i++;
                  if (p[i] <= "0" || p[i] > "9") {
                    syntax(1, "节拍M: 中存在错误的字符 '$1'", p[i]);
                    return;
                  }
                  meter.bot = p[i++];
                  while (p[i] >= "0" && p[i] <= "9") meter.bot += p[i++];
                  currMeter.push(meter); //设置当前拍号
                  break;
                }
                if (p[i] != " " && p[i] != "+") break;
                if (i >= p.length || p[i + 1] == "(") break;
                meter.top += p[i++];
              }
              m1 = parseInt(meter.top);
              break;
          }
          if (!in_parenth) {
            if (meter.bot) m2 = parseInt(meter.bot);
            //                        wmeasure += m1 * C.BLEN / m2 //原来是这句，如果复合拍子的话，wmeasure值变成叠加，不正确，改为下面那句代码
            wmeasure = (m1 * C.BLEN) / m2;
          }
          s.a_meter.push(meter);
          //设置当前拍号
          currMeter.push(meter);
          meter = {};
          while (p[i] == " ") i++;
          if (p[i] == "+") {
            meter.top = p[i++];
            s.a_meter.push(meter);
            //设置当前拍号
            currMeter.push(meter);
            meter = {};
          }
        }
      }
      if (p[i] == "=") {
        val = p.substring(++i).match(/^(\d+)\/(\d+)$/);
        if (!val) {
          //                    syntax(1, "Bad duration '$1' in M:", p.substring(i))
          syntax(1, "节拍M:设置不正确 '$1' ", p.substring(i));
          return;
        }
        wmeasure = (C.BLEN * val[1]) / val[2];
      }
      s.wmeasure = wmeasure;
      curr_wmeasure = wmeasure;
      if (cfmt.writefields.indexOf("M") < 0) s.a_meter = [];
      if (parse.state != 3) {
        info.M = p;
        glovar.meter = s;
        if (parse.state >= 1) {
          if (!glovar.ulen) {
            if (wmeasure <= 1 || wmeasure >= (C.BLEN * 3) / 4)
              glovar.ulen = C.BLEN / 8;
            else glovar.ulen = C.BLEN / 16;
          }
          for (v = 0; v < voice_tb.length; v++) {
            voice_tb[v].meter = s;
            voice_tb[v].wmeasure = wmeasure;
          }
        }
      } else {
        curvoice.wmeasure = wmeasure;
        if (is_voice_sig()) {
          curvoice.meter = s;
          reset_gen();
        } else {
          sym_link(s);
        }
      }
    }
    function new_tempo(text) {
      var i,
        c,
        d,
        nd,
        s = {
          type: C.TEMPO,
          dur: 0,
        };

      function get_nd(p) {
        var n,
          d,
          nd = p.match(/(\d+)\/(\d+)/);
        if (nd) {
          d = Number(nd[2]);
          if (d && !isNaN(d) && !(d & (d - 1))) {
            n = Number(nd[1]);
            if (!isNaN(n)) return (C.BLEN * n) / d;
          }
        }
        syntax(1, "Invalid note duration $1", c);
      }
      set_ref(s);
      if (cfmt.writefields.indexOf("Q") < 0) s.del = true;
      if (text[0] == '"') {
        c = text.match(/"([^"]*)"/);
        if (!c) {
          syntax(1, "Unterminated string in Q:");
          return;
        }
        s.tempo_str1 = c[1];
        text = text.slice(c[0].length).replace(/^\s+/, "");
      }
      if (text.slice(-1) == '"') {
        i = text.indexOf('"');
        s.tempo_str2 = text.slice(i + 1, -1);
        text = text.slice(0, i).replace(/\s+$/, "");
      }
      i = text.indexOf("=");
      if (i > 0) {
        d = text.slice(0, i).split(/\s+/);
        text = text.slice(i + 1).replace(/^\s+/, "");
        while (1) {
          c = d.shift();
          if (!c) break;
          nd = get_nd(c);
          if (!nd) return;
          if (!s.tempo_notes) s.tempo_notes = [];
          s.tempo_notes.push(nd);
        }
        if (text.slice(0, 4) == "ca. ") {
          s.tempo_ca = "ca. ";
          text = text.slice(4);
        }
        i = text.indexOf("/");
        if (i > 0) {
          nd = get_nd(text);
          if (!nd) return;
          s.new_beat = nd;
        } else {
          s.tempo = Number(text);
          if (!s.tempo || isNaN(s.tempo)) {
            //                            syntax(1, "Bad tempo value")
            syntax(1, "速度设置不正确");
            return;
          }
        }
      }
      curr_tempo = s;
      if (parse.state != 3) {
        if (parse.state == 1) {
          info.Q = text;
          glovar.tempo = s;
          return;
        }
        goto_tune();
      }
      if (curvoice.v == par_sy.top_voice) {
        sym_link(s);
        if (glovar.tempo && curvoice.time == 0) glovar.tempo.del = true;
      }
    }
    function do_info(info_type, text) {
      var s, d1, d2, a, vid;
      switch (info_type) {
        case "I":
          do_pscom(text);
          break;
        case "L":
          if (parse.state == 2) goto_tune();
          a = text.match(/^1\/(\d+)(=(\d+)\/(\d+))?$/);
          if (a) {
            d1 = Number(a[1]);
            if (!d1 || (d1 & (d1 - 1)) != 0) break;
            d1 = C.BLEN / d1;
            if (a[2]) {
              d2 = Number(a[4]);
              if (!d2 || (d2 & (d2 - 1)) != 0) {
                d2 = 0;
                break;
              }
              d2 = (Number(a[3]) / d2) * C.BLEN;
            } else {
              d2 = d1;
            }
          } else if (text == "auto") {
            d1 = d2 = -1;
          }
          if (!d2) {
            //                        syntax(1, "Bad L: value")
            syntax(1, "L: 设置不正确");
            break;
          }
          if (parse.state < 2) {
            glovar.ulen = d1;
          } else {
            curvoice.ulen = d1;
            curvoice.dur_fact = d2 / d1;
          }
          break;
        case "M":
          new_meter(text);
          break;
        case "U":
          set_user(text);
          break;
        case "P":
          if (parse.state == 0) break;
          if (parse.state == 1) {
            info.P = text;
            break;
          }
          if (parse.state == 2) goto_tune();
          s = {
            type: C.PART,
            text: text,
            dur: 0,
          };
          if (cfmt.writefields.indexOf(info_type) < 0) {
            s.invis = true;
          }
          var p_voice = voice_tb[par_sy.top_voice];
          if (curvoice.v != p_voice.v) {
            if (curvoice.time != p_voice.time) break;
            if (p_voice.last_sym && p_voice.last_sym.type == C.PART) break;
            var voice_sav = curvoice;
            curvoice = p_voice;
            sym_link(s);
            curvoice = voice_sav;
          } else {
            sym_link(s);
          }
          break;
        case "Q":
          if (parse.state == 0) break;
          new_tempo(text);
          break;
        case "V":
          get_voice(text);
          if (parse.state == 3) curvoice.ignore = !par_sy.voices[curvoice.v];
          break;
        case "K":
          if (!parse.state) break;
          get_key(text);
          break;
        case "N":
        case "R":
          if (!info[info_type]) info[info_type] = text;
          else info[info_type] += "\n" + text;
          break;
        case "r":
          if (!user.keep_remark || parse.state != 3) break;
          s = {
            type: C.REMARK,
            text: text,
            dur: 0,
          };
          sym_link(s);
          break;
        case "O": //自定义的装饰音位置信息
          console.log("-----------", text);
          break;
        default:
          syntax(0, "'$1:' line ignored", info_type);
          break;
      }
    }
    function adjust_dur(s) {
      var s2, time, auto_time, i, res;
      s2 = curvoice.last_sym;
      if (!s2) return;
      if (s2.type == C.MREST || s2.type == C.BAR) return;
      while (s2.type != C.BAR && s2.prev) s2 = s2.prev;
      time = s2.time;
      auto_time = curvoice.time - time;
      if (time == 0) {
        while (s2 && !s2.dur) s2 = s2.next;
        if (s2 && s2.type == C.REST && s2.invis) {
          time += (s2.dur * curvoice.wmeasure) / auto_time;
          if (s2.prev) s2.prev.next = s2.next;
          else curvoice.sym = s2.next;
          if (s2.next) s2.next.prev = s2.prev;
          s2 = s2.next;
        }
      }
      if (curvoice.wmeasure == auto_time) return;
      for (; s2; s2 = s2.next) {
        s2.time = time;
        if (!s2.dur || s2.grace) continue;
        s2.dur = (s2.dur * curvoice.wmeasure) / auto_time;
        s2.dur_orig = (s2.dur_orig * curvoice.wmeasure) / auto_time;
        time += s2.dur;
        if (s2.type != C.NOTE && s2.type != C.REST) continue;
        for (i = 0; i <= s2.nhd; i++)
          s2.notes[i].dur = (s2.notes[i].dur * curvoice.wmeasure) / auto_time;
        res = identify_note(s2, s2.dur_orig);
        s2.head = res[0];
        s2.dots = res[1];
        s2.nflags = res[2];
        if (s2.nflags <= -2) s2.stemless = true;
        else delete s2.stemless;
      }
      curvoice.time = s.time = time;
    }
    function new_bar() {
      my_node_index++;
      if (firstNodeNotes.length > 0 && isInFirstNode && showBeat) {
        var firstNodeActureDur = 0;
        var firstNodeDur = -1;
        for (var i = 0; i < firstNodeNotes.length; i++) {
          var note = firstNodeNotes[i];
          if (firstNodeDur == -1) {
            firstNodeDur = note.my_wmeasure;
          }
          firstNodeActureDur += note.dur;
        }
        var offSetBeat = parseInt((firstNodeDur - firstNodeActureDur) / 384);
        //这里判断如果是弱起小节，则重新设置音符对应的强弱关系
        if (currMeter[0].top != nodeBeatTotal && offSetBeat > 0) {
          cresc = false;
          dim = false;

          var lastNoteBeatSeqTmp = -1;

          for (var i = 0; i < firstNodeNotes.length; i++) {
            var note = firstNodeNotes[i];
            if (firstNodeDur == -1) {
              firstNodeDur = note.my_wmeasure;
            }
            firstNodeActureDur += note.dur;
          }

          for (var i = 0; i < firstNodeNotes.length; i++) {
            var note = firstNodeNotes[i];
            if (!note.beat_seq) {
              note.beat_seq = 0;
            }
            note.beat_seq += offSetBeat;

            if (note.a_dd) {
              // 先清掉原来自动设置的强弱标记
              for (var j = 0; j < note.a_dd.length; j++) {
                if (
                  note.a_dd[j].name.indexOf("strong") == 0 ||
                  note.a_dd[j].name.indexOf("sec_strong") == 0 ||
                  note.a_dd[j].name.indexOf("weak") == 0 ||
                  note.a_dd[j].name.indexOf("s_w") == 0
                ) {
                  if (note.a_dd[j].auto_setting) {
                    note.a_dd.splice(j, 1);
                  }
                }
              }
            }
            var topVal = currMeter[0].top;
            if (topVal == 5) {
              topVal = 5 + "" + beatModel5;
            } else if (topVal == 7) {
              topVal = 7 + "" + beatModel7;
            }
            var currBeatSetting = beatSetting[topVal];
            var pname = currBeatSetting[parseInt(note.beat_seq)];
            //上一个音符所在拍的序号，一个拍序号不重复显示强弱，一拍内只显示第一个音符的强弱
            if (lastNoteBeatSeqTmp != parseInt(note.beat_seq)) {
              var existStrongFlag = false;
              if (note.a_dd) {
                for (var j = 0; j < note.a_dd.length; j++) {
                  if (
                    note.a_dd[j].name == "strong" ||
                    note.a_dd[j].name == "sec_strong" ||
                    note.a_dd[j].name == "weak" ||
                    note.a_dd[j].name == "s_w"
                  ) {
                    existStrongFlag = true;
                    if (note.bar_index) {
                      notAutoSFBarSeq = note.bar_index;
                    }
                  }
                }
              }
              //如果已经存在强弱标识，就不再自动设置,小节内有人工设置的强弱标记的，不自动设置，在渐强渐弱的包围内，不自动设置
              //                        	if(!existStrongFlag && note.bar_index!=notAutoSFBarSeq && !cresc && !dim){
              if (!existStrongFlag && note.bar_index != notAutoSFBarSeq) {
                //暂时不处理渐强渐弱
                var my_dd = switchPname(note, pname);
                if (note.a_dd && my_dd != null) {
                  note.a_dd.unshift(my_dd);
                }
              }
            }
            if (note && note.a_dd && note.a_dd.length == 0) {
              delete note.a_dd;
            }
            //上一个音符所在拍的序号，一个拍序号不重复显示强弱，一拍内只显示第一个音符的强弱

            if (note.a_dd) {
              var cd = note.a_dd.find(function (item) {
                return item.glyph == "cresc" || item.glyph == "dim";
              });
              if (cd != null) {
                if (cd.glyph == "cresc") {
                  if (cd.dd_en) {
                    // 开始渐强
                    cresc = true;
                  } else if (cd.dd_st) {
                    // 结束渐强
                    cresc = false;
                  }
                } else if (cd.glyph == "dim") {
                  if (cd.dd_en) {
                    // 开始渐弱
                    dim = true;
                  } else if (cd.dd_st) {
                    // 结束渐弱
                    dim = false;
                  }
                }
              }
            }

            lastNoteBeatSeqTmp = parseInt(note.beat_seq);
          }
        }
        firstNodeNotes = new Array(); //第一小节使用完成后清空
      }
      isInFirstNode = false;

      //切分音处理
      //        	handleSyncope();
      //清空存储的上一小节的音符信息
      preBarNotes = new Array();
      syncopeArr = new Array();
      nodeBeatTotal = 0;
      lastNoteBeatSeq = -1;
      // end********
      var s2,
        c,
        bar_type,
        line = parse.line,
        s = {
          type: C.BAR,
          fname: parse.fname,
          istart: parse.bol + line.index,
          dur: 0,
          my_bar_num: 1,
          multi: 0,
        };
      if (vover && vover.bar) get_vover("|");
      if (glovar.new_nbar) {
        s.bar_num = glovar.new_nbar;
        glovar.new_nbar = 0;
      }
      bar_type = line.char();
      // console.log('bar_type', line, bar_type, line.buffer[line.index-1]);
      if(line.index-1 > -1 && typeof line.buffer[line.index-1] != 'undefined' && line.buffer[line.index-1]=='.'){
        c = bar_type + '.'; // 小节虚线
      }
      while (1) {
        c = line.next_char();
        switch (c) {
          case "|":
          case "[":
          case "]":
          case ":":
            bar_type += c;
            continue;
        }
        break;
      }
      if (bar_type[0] == ":") {
        if (bar_type.length == 1) {
          bar_type = "|";
          s.bar_dotted = true;
        } else {
          s.rbstop = 2;
          if (curvoice.tie_s) curvoice.tie_s.tie_s = s;
        }
      }
      if (a_gch) gch_build(s);
      if (a_dcn) {
        deco_cnv(a_dcn, s, null, a_dcn_info); //增加了第3，4个参数
        a_dcn = null;
      }
      if (parse.ottava.length) {
        s2 = s;
        if (curvoice.cst != curvoice.st) {
          s2 = {
            type: C.SPACE,
            fname: parse.fname,
            istart: parse.bol + line.index,
            dur: 0,
            multi: 0,
            invis: true,
            width: 1,
          };
          sym_link(s2);
        }
        s2.ottava = parse.ottava;
        parse.ottava = [];
      }
      switch (bar_type.slice(-1)) {
        case "[":
          if (/[0-9" ]/.test(c)) break;
          bar_type = bar_type.slice(0, -1);
          line.index--;
          c = "[";
          break;
        case ":":
          s.rbstop = 2;
          break;
      }
      if (c > "0" && c <= "9") {
        s.text = c;
        while (1) {
          c = line.next_char();
          if ("0123456789,.-".indexOf(c) < 0) break;
          s.text += c;
        }
        s.rbstop = 2;
        s.rbstart = 2;
      } else if (c == '"' && bar_type.slice(-1) == "[") {
        s.text = "";
        while (1) {
          c = line.next_char();
          if (!c) {
            syntax(1, "No end of repeat string");
            return;
          }
          if (c == '"') {
            line.index++;
            break;
          }
          s.text += c;
        }
        s.rbstop = 2;
        s.rbstart = 2;
      }
      if (bar_type[0] == "]") {
        s.rbstop = 2;
        if (bar_type.length != 1) bar_type = bar_type.slice(1);
        else {
          s.invis = true;
        }
      }
      s.iend = parse.bol + line.index;
      if (s.rbstart && curvoice.norepbra && !curvoice.second) s.norepbra = true;
      if (s.text) {
        if (bar_type.slice(-1) == "[") bar_type = bar_type.slice(0, -1);
        if (s.text[0] == "1") {
          if (curvoice.tie_s) curvoice.tie_s_rep = curvoice.tie_s;
          if (curvoice.acc_tie) curvoice.acc_tie_rep = curvoice.acc_tie.slice();
          else if (curvoice.acc_tie_rep) curvoice.acc_tie_rep = null;
        } else {
          if (curvoice.tie_s_rep) {
            curvoice.tie_s = clone(curvoice.tie_s_rep);
            curvoice.tie_s.notes = clone(curvoice.tie_s.notes);
            for (var m = 0; m <= curvoice.tie_s.nhd; m++) {
              curvoice.tie_s.notes[m] = clone(curvoice.tie_s.notes[m]);
              curvoice.tie_s.notes[m].s = curvoice.tie_s;
            }
          }
          if (curvoice.acc_tie_rep)
            curvoice.acc_tie = curvoice.acc_tie_rep.slice();
        }
      }
      curvoice.acc = [];
      if (curvoice.ulen < 0) adjust_dur(s);
      s2 = curvoice.last_sym;
      if (s2 && s2.time == curvoice.time) {
        if (bar_type == "[" || bar_type == "|:") {
          do {
            if (s2.type == C.BAR) break;
            if (w_tb[s2.type]) break;
            s2 = s2.prev;
          } while (s2);
          if (s2 && s2.type == C.BAR) {
            if (
              bar_type == "[" &&
              !s2.text &&
              (curvoice.st == 0 ||
                par_sy.staves[curvoice.st - 1].flags & STOP_BAR ||
                s.norepbra)
            ) {
              if (s.text) s2.text = s.text;
              if (s.a_gch) s2.a_gch = s.a_gch;
              if (s.norepbra) s2.norepbra = s.norepbra;
              if (s.rbstart) s2.rbstart = s.rbstart;
              if (s.rbstop) s2.rbstop = s.rbstop;
              return;
            }
            if (s2.st == curvoice.st && bar_type == "|:") {
              if (s2.bar_type == ":|") {
                s2.bar_type = "::";
                s2.rbstop = 2;
                return;
              }
              if (s2.bar_type == "||") {
                s2.bar_type = "||:";
                s2.rbstop = 2;
                return;
              }
            }
          }
        }
      }
      switch (bar_type) {
        case "[":
          s.rbstop = 2;
        case "[]":
        case "[|]":
          s.invis = true;
          bar_type = "[]";
          break;
        case ":|:":
        case ":||:":
          bar_type = "::";
          break;
        case "||":
          if (!cfmt.rbdbstop) break;
        case "[|":
        case "|]":
          s.rbstop = 2;
          break;
      }
      s.bar_type = bar_type;
      if (!curvoice.lyric_restart) curvoice.lyric_restart = s;
      // create by lhj 打击乐
      if (!curvoice.strike_restart) curvoice.strike_restart = s;
      // 小节图片相关
      if (!curvoice.picture_restart) curvoice.picture_restart = s;
      if (!curvoice.sym_restart) curvoice.sym_restart = s;
      sym_link(s);
      s.st = curvoice.st;
      if (
        s.rbstart &&
        !curvoice.norepbra &&
        curvoice.st > 0 &&
        !(par_sy.staves[curvoice.st - 1].flags & STOP_BAR)
      ) {
        s2 = {
          type: C.BAR,
          fname: s.fname,
          istart: s.istart,
          iend: s.iend,
          bar_type: "[",
          multi: 0,
          invis: true,
          text: s.text,
          rbstart: 2,
        };
        sym_link(s2);
        s2.st = curvoice.st;
        delete s.text;
        s.rbstart = 0;
      }
      // 判断是否有弱起小节 add by hxs
      var bar_dur = s.time - last_bar_time;
      if (bar_count == 0 && bar_dur > 0 && bar_dur < s.p_v.wmeasure) {
        has_weak_node = true;
        weak_node_dur = bar_dur;
        s.weak_bar = true;
      }
      last_bar_time = s.time;
      bar_count++;

      //把小节线数据存起来，add by hxs start -----------
      if (s.v == 0) {
        var node_line = new Object();
        var existItem = barLineArray.find(function (item) {
          return item.istart == s.istart;
        });
        if (!existItem) {
          node_line.istart = s.istart;
          node_line.s = s;
          node_line.bar_num = barLineArray.length;
          barLineArray.push(node_line);
        }
      }

      //end-------------
    }
    function parse_staves(p) {
      var v,
        vid,
        a_vf = [],
        err = false,
        flags = 0,
        brace = 0,
        bracket = 0,
        parenth = 0,
        flags_st = 0,
        i = 0;
      while (i < p.length) {
        switch (p[i]) {
          case " ":
          case "\t":
            break;
          case "[":
            if (parenth || brace + bracket >= 2) {
              syntax(1, errs.misplaced, "[");
              err = true;
              break;
            }
            flags |= brace + bracket == 0 ? OPEN_BRACKET : OPEN_BRACKET2;
            bracket++;
            flags_st <<= 8;
            flags_st |= OPEN_BRACKET;
            break;
          case "{":
            if (parenth || brace || bracket >= 2) {
              syntax(1, errs.misplaced, "{");
              err = true;
              break;
            }
            flags |= !bracket ? OPEN_BRACE : OPEN_BRACE2;
            brace++;
            flags_st <<= 8;
            flags_st |= OPEN_BRACE;
            break;
          case "(":
            if (parenth) {
              syntax(1, errs.misplaced, "(");
              err = true;
              break;
            }
            flags |= OPEN_PARENTH;
            parenth++;
            flags_st <<= 8;
            flags_st |= OPEN_PARENTH;
            break;
          case "*":
            if (brace && !parenth && !(flags & (OPEN_BRACE | OPEN_BRACE2)))
              flags |= FL_VOICE;
            break;
          case "+":
            flags |= MASTER_VOICE;
            break;
          default:
            if (!/\w/.test(p[i])) {
              //                        syntax(1, "Bad voice ID in %%staves");
              syntax(1, "%%staves中声部设置不正确");
              err = true;
              break;
            }
            vid = "";
            while (i < p.length) {
              if (" \t()[]{}|*".indexOf(p[i]) >= 0) break;
              vid += p[i++];
            }
            for (; i < p.length; i++) {
              switch (p[i]) {
                case " ":
                case "\t":
                  continue;
                case "]":
                  if (!(flags_st & OPEN_BRACKET)) {
                    syntax(1, errs.misplaced, "]");
                    err = true;
                    break;
                  }
                  bracket--;
                  flags |=
                    brace + bracket == 0 ? CLOSE_BRACKET : CLOSE_BRACKET2;
                  flags_st >>= 8;
                  continue;
                case "}":
                  if (!(flags_st & OPEN_BRACE)) {
                    syntax(1, errs.misplaced, "}");
                    err = true;
                    break;
                  }
                  brace--;
                  flags |= !bracket ? CLOSE_BRACE : CLOSE_BRACE2;
                  flags &= ~FL_VOICE;
                  flags_st >>= 8;
                  continue;
                case ")":
                  if (!(flags_st & OPEN_PARENTH)) {
                    syntax(1, errs.misplaced, ")");
                    err = true;
                    break;
                  }
                  parenth--;
                  flags |= CLOSE_PARENTH;
                  flags_st >>= 8;
                  continue;
                case "|":
                  flags |= STOP_BAR;
                  continue;
              }
              break;
            }
            a_vf.push([vid, flags]);
            flags = 0;
            continue;
        }
        i++;
      }
      if (flags_st != 0) {
        syntax(1, " %%staves 配置缺少 '}'或 ')'或']'");
        err = true;
      }
      if (err || a_vf.length == 0) return;
      return a_vf;
    }
    function info_split(text) {
      if (!text) return [];
      var a = text.match(/(".+?"|.+?)(\s+|=|$)/g);
      if (!a) {
        syntax(1, "Unterminated string");
        return [];
      }
      for (var i = 0; i < a.length; i++) a[i] = a[i].trim();
      return a;
    }
    function identify_note(s, dur) {
      var head, dots, flags;
      if (dur % 12 != 0) syntax(1, "Invalid note duration $1", dur);
      dur /= 12;
      if (dur == 0) syntax(1, "Note too short");
      for (flags = 5; dur != 0; dur >>= 1, flags--) {
        if (dur & 1) break;
      }
      dur >>= 1;
      switch (dur) {
        case 0:
          dots = 0;
          break;
        case 1:
          dots = 1;
          break;
        case 3:
          dots = 2;
          break;
        default:
          dots = 3;
          break;
      }
      flags -= dots;
      if (flags >= 0) {
        head = C.FULL;
      } else
        switch (flags) {
          default:
            syntax(1, "Note too long");
            flags = -4;
          case -4:
            head = C.SQUARE;
            break;
          case -3:
            head = cfmt.squarebreve ? C.SQUARE : C.OVALBARS;
            break;
          case -2:
            head = C.OVAL;
            break;
          case -1:
            head = C.EMPTY;
            break;
        }
      return [head, dots, flags];
    }
    var reg_dur = /(\d*)(\/*)(\d*)/g;
    function parse_dur(line) {
      var res, num, den;
      reg_dur.lastIndex = line.index;
      res = reg_dur.exec(line.buffer);
      if (!res[0]) return [1, 1];
      num = res[1] || 1;
      den = res[3] || 1;
      if (!res[3]) den *= 1 << res[2].length;
      line.index = reg_dur.lastIndex;
      return [num, den];
    }
    function parse_acc_pit(line) {
      var note,
        acc,
        micro_n,
        micro_d,
        pit,
        nd,
        c = line.char();
      switch (c) {
        case "^":
          c = line.next_char();
          if (c == "^") {
            acc = 2;
            c = line.next_char();
          } else {
            acc = 1;
          }
          break;
        case "=":
          acc = 3;
          c = line.next_char();
          break;
        case "_":
          c = line.next_char();
          if (c == "_") {
            acc = -2;
            c = line.next_char();
          } else {
            acc = -1;
          }
          break;
      }
      if ((acc && acc != 3 && c >= "1" && c <= "9") || c == "/") {
        nd = parse_dur(line);
        micro_n = nd[0];
        micro_d = nd[1];
        if (micro_d == 1) micro_d = curvoice ? curvoice.uscale : 1;
        else micro_d *= 2;
        c = line.char();
      }
      if (isExtend2Char(c) || isExtendChar(c)) {
        //扩展音符特殊处理
        var extn = extnotes2.find(function (item) {
          return item.char == c;
        });
        if (extn == null) {
          extn = extnotes.find(function (item) {
            return item.char == c;
          });
        }
        pit = extn.pit;
      } else {
        pit = ntb.indexOf(c) + 16;
      }
      c = line.next_char();
      if (pit < 16) {
        syntax(1, "'$1' 不是一个有效音符", line.buffer[line.index - 1]);
        return;
      }
      while (c == "'") {
        pit += 7;
        c = line.next_char();
      }
      while (c == ",") {
        pit -= 7;
        c = line.next_char();
      }
      note = {
        pit: pit,
        apit: pit,
        shhd: 0,
        shac: 0,
        ti1: 0,
      };
      if (acc) {
        note.acc = acc;
        if (micro_n) {
          note.micro_n = micro_n;
          note.micro_d = micro_d;
        }
      }
      return note;
    }
    // 增加了一个type参数 用户判断是否是休止符 add by hxs
    function set_map(note, type) {
      // debugger;
      var bn,
        an,
        nn,
        i,
        map = maps[curvoice.map];

      if (type == "rest") {
        //休止符特殊处理 add by hxs
        bn = "h";
      } else {
        bn = "abcdefg"[(note.pit + 77) % 7];
      }
      if (note.acc) an = ["__", "_", "", "^", "^^", "="][note.acc + 2];
      else an = "";
      nn = an + bn;

      // 休止符不走这个逻辑
      if (type != "rest") {
        for (i = note.pit; i >= 28; i -= 7) nn += "'";
        for (i = note.pit; i < 21; i += 7) nn += ",";
        if (!map[nn]) {
          nn = "octave," + an + bn;
          if (!map[nn]) {
            nn =
              "key," + "abcdefg"[(note.pit + 77 - curvoice.ckey.k_delta) % 7];
            if (!map[nn]) {
              nn = "all";
              if (!map[nn]) return;
            }
          }
        }
      }

      note.map = map[nn];
      if (note.map && note.map[1]) {
        note.apit = note.pit = note.map[1].pit;
        note.acc = note.map[1].acc;
      }
    }
    function parse_basic_note(line, ulen) {
      var nd,
        note = parse_acc_pit(line);
      if (!note) return;
      if (line.char() == "0") {
        parse.stemless = true;
        line.index++;
      }
      nd = parse_dur(line);
      note.dur = (ulen * nd[0]) / nd[1];
      return note;
    }
    function parse_vpos() {
      var c,
        line = parse.line,
        ti1 = 0;
      if (line.buffer[line.index - 1] == "." && !a_dcn) ti1 = C.SL_DOTTED;
      switch (line.next_char()) {
        case "'":
          line.index++;
          return ti1 + C.SL_ABOVE;
        case ",":
          line.index++;
          return ti1 + C.SL_BELOW;
      }
      return ti1 + C.SL_AUTO;
    }
    var cde2fcg = new Int8Array([0, 2, 4, -1, 1, 3, 5]),
      cgd2cde = new Int8Array([0, 4, 1, 5, 2, 6, 3]),
      acc2 = new Int8Array([-2, -1, 3, 1, 2]);
    function note_transp(s, sk, note) {
      var ak,
        an,
        d,
        b40,
        n = note.pit,
        a = note.acc;
      if (!a && sk.k_a_acc) a = sk.k_map[(n + 19) % 7];
      b40 = abc2svg.pab40(n, a) + sk.k_transp;
      note.apit = note.pit = abc2svg.b40p(b40);
      if (!a) {
        if (!sk.k_a_acc && !sk.k_none) return;
      }
      an = abc2svg.b40a(b40);
      if (a) {
        if (sk.k_a_acc) {
          ak = sk.k_map[(note.pit + 19) % 7];
          if (ak == an) an = 0;
        }
        if (!an) an = 3;
      } else if (sk.k_none) {
        if (acc_same_pitch(s, note.pit)) return;
      } else if (sk.k_a_acc) {
        if (acc_same_pitch(s, note.pit)) return;
        ak = sk.k_map[(note.pit + 19) % 7];
        if (ak) an = 3;
      } else {
        return;
      }
      d = note.micro_d;
      if (d && a != an) {
        n = note.micro_n;
        switch (an) {
          case 3:
            if (n > d / 2) {
              n -= d / 2;
              note.micro_n = n;
              an = a;
            } else {
              an = -a;
            }
            break;
          case 2:
            if (n > d / 2) {
              note.pit += 1;
              n -= d / 2;
            } else {
              n += d / 2;
            }
            an = a;
            note.micro_n = n;
            break;
          case -2:
            if (n >= d / 2) {
              note.pit -= 1;
              n -= d / 2;
            } else {
              n += d / 2;
            }
            an = a;
            note.micro_n = n;
            break;
        }
      }
      note.acc = an;
    }
    function sort_pitch(s) {
      s.notes = s.notes.sort(function (n1, n2) {
        return n1.pit - n2.pit;
      });
    }
    //添加唱名
    function getCmInfo(s) {
      //判断如果s本身有func=6的装饰音，则默认放在上方（唱名放在下面，这样不会重叠在一起）
      if (s.a_dd) {
        for (var i = 0; i < s.a_dd.length; i++) {
          var dd = s.a_dd[i];
          if (dd.func == 6) {
            dd.pos = "^";
          }
        }
      }
      var dd = new Object();
      //如果是小节的第一个音符，添加强记号
      dd.func = 6;
      dd.glyph = "dao";
      dd.h = 18;
      dd.name = "dao";
      dd.wl = 4; //左边距
      dd.wr = 4; //右边距
      dd.pos = "_"; //固定放在下方
      //        	console.log("currentKey",currentKey)
      //if(s.a_dd){

      //        	var key = getStaffKey();
      var key = $("#K").val();
      if (!key) {
        var content = document.getElementById("source").value;
        var matchs = content.match(/K\:(.*)/);
        if (matchs != null) {
          key = matchs[1].replace(/\s/g, "");
        }
      }

      //if(currentKey!="" && musicType==2){
      if (currentKey != "") {
        key = currentKey;
      }
      if (key.indexOf("shift") > -1) {
        key = key.split("shift")[0].trim();
      }

      var rel = ["", "do", "re", "mi", "fa", "sol", "la", "si"]; //do、re、mi、fa、sol、la、si
      //var rel = ["","doe","ray","me","far","sew","la","sea"];
      var content = source_val;
      var obj = new Object();
      obj.staff = content.substring(s.istart, s.iend);
      if (s.notes.length > 1) {
        return null;
      }

      obj.num = getSimpleNameByKAndStaff(
        key,
        obj.staff
          .replaceAll(/[\/0-9]/, "")
          .replaceAll(/[\(\)]/g, "")
          .replaceAll(/\-/g, ""),
        content
      );
      if (obj.num) {
        obj.lty = rel[parseInt(obj.num.replaceAll(/[\,\=\^\_\']/, ""))];
        obj.v = s.v;
        dd.name = obj.lty;
        dd.glyph = obj.lty;
        dd.iscm = 1;
      }
      //}

      return dd;
    }
    function switchPname(s, pname) {
      if (s.grace) {
        return;
      }
      //弱起小节的第一个音符都是弱
      if (s.time == 0 && has_weak_node) {
        pname = "weak";
      }
      var dd = new Object();
      dd.auto_setting = 1; //标记该音符的强弱标记是自动设置的
      var pfname = "";
      if (s.a_dd) {
        var pf = s.a_dd.find(function (item) {
          return item.glyph == "pf" || item.glyph == "accent";
        });
        if (pf && pf != null) {
          if (pf.name.indexOf("p") > -1) {
            // 已经有弱的标识了
            pname = "weak";
            pfname = pf.name;
          } else if (pf.name.indexOf("f") > -1) {
            // 已经有强的标识了
            pname = "strong";
            pfname = pf.name;
          } else if (pf.name == ">") {
            pname = "strong";
          }
        }
      }
      if (pname == "strong") {
        if (!s.a_dd) {
          s.a_dd = new Array();
        }
        //如果是小节的第一个音符，添加强记号
        dd.func = 6;
        dd.glyph = "strong";
        dd.h = 15;
        dd.name = "strong" + pfname;
        dd.str = "strong";
        dd.wl = 5;
        dd.wr = 3;
      } else if (pname == "sec_strong") {
        if (!s.a_dd) {
          s.a_dd = new Array();
        }
        dd.func = 6;
        dd.glyph = "sec_strong";
        dd.h = 15;
        dd.name = "sec_strong" + pfname;
        dd.str = "sec_strong";
        dd.wl = 5;
        dd.wr = 3;
      } else if (pname == "weak") {
        if (!s.a_dd) {
          s.a_dd = new Array();
        }
        dd.func = 6;
        dd.glyph = "weak";
        dd.h = 15;
        dd.name = "weak" + pfname;
        dd.str = "weak";
        dd.wl = 5;
        dd.wr = 3;
      } else if (pname == "s_w") {
        if (!s.a_dd) {
          s.a_dd = new Array();
        }
        dd.func = 6;
        dd.glyph = "s_w";
        dd.h = 15;
        dd.name = "s_w" + pfname;
        dd.str = "s_w";
        dd.wl = 5;
        dd.wr = 3;
      }
      if (!dd.name) {
        return null;
      }
      return dd;
    }
    // 处理切分音(根据切分音存储的序号，决定强弱，0为弱，1为强)
    function handleSyncope() {
      if (preBarNotes.length > 0) {
        for (var i = 0; i < preBarNotes.length; i++) {
          var s = preBarNotes[i];
          syncope(s); //切分音
          if (syncopeArr.length == 0) {
            continue;
          }
          var max = syncopeArr[syncopeArr.length - 1];
          var min = syncopeArr[0];

          if (s.a_dd && s.istart <= max && s.istart >= min) {
            // 先清掉原来自动设置的强弱标记
            for (var j = 0; j < s.a_dd.length; j++) {
              if (
                s.a_dd[j].name.indexOf("strong") == 0 ||
                s.a_dd[j].name.indexOf("sec_strong") == 0 ||
                s.a_dd[j].name.indexOf("weak") == 0 ||
                s.a_dd[j].name.indexOf("s_w") == 0
              ) {
                if (s.a_dd[j].auto_setting) {
                  s.a_dd.splice(j, 1);
                }
              }
            }
          }

          if (syncopeArr.indexOf(s.istart) < 0) {
            continue;
          }

          var index = syncopeArr.indexOf(s.istart);
          var pname = "";
          if (index > -1) {
            if (index == 0) {
              pname = "weak";
            } else if (index == 1) {
              pname = "strong";
            } else if (index == 2) {
              pname = "weak";
            }
          }
          var dd = new Object();
          if (pname == "strong") {
            if (!s.a_dd) {
              s.a_dd = new Array();
            }
            //如果是小节的第一个音符，添加强记号
            dd.func = 6;
            dd.glyph = "strong";
            dd.h = 15;
            dd.name = "strong";
            dd.str = "strong";
            dd.wl = 5;
            dd.wr = 3;
            s.a_dd.unshift(dd);
          } else if (pname == "sec_strong") {
            if (!s.a_dd) {
              s.a_dd = new Array();
            }
            dd.func = 6;
            dd.glyph = "sec_strong";
            dd.h = 15;
            dd.name = "sec_strong";
            dd.str = "sec_strong";
            dd.wl = 5;
            dd.wr = 3;
            s.a_dd.unshift(dd);
          } else if (pname == "weak") {
            if (!s.a_dd) {
              s.a_dd = new Array();
            }
            dd.func = 6;
            dd.glyph = "weak";
            dd.h = 15;
            dd.name = "weak";
            dd.str = "weak";
            dd.wl = 5;
            dd.wr = 3;
            s.a_dd.unshift(dd);
          } else if (pname == "s_w") {
            if (!s.a_dd) {
              s.a_dd = new Array();
            }
            dd.func = 6;
            dd.glyph = "s_w";
            dd.h = 15;
            dd.name = "s_w";
            dd.str = "s_w";
            dd.wl = 5;
            dd.wr = 3;
            s.a_dd.unshift(dd);
          }
          if (syncopeArr[syncopeArr.length - 1] == s.istart) {
            syncopeArr = new Array();
          }
        }
        preBarNotes = new Array();
        syncopeArr = new Array();
      }
    }
    // 切分音识别(返回切分音对应的几个音符的下标)
    function syncope(s) {
      if (!showBeat) {
        return;
      }
      if (syncopeArr.length != 0) {
        return;
      }

      // 时值为1 3模式（第一个音符0.5拍，第二个音符1.5拍或第一个音符1拍，第二个音符3拍）
      /*先不要吧----2020-1-2
        	if(s.type==C.NOTE && s.next){
        		var curNoteDur = s.dur;
        		var nextNoteDur = s.next.dur;
        		var tie = false;
        		//如果有连音符，则加上连音符的时值
        		if(s.next.ti1){
        			if(s.next.next){
        				nextNoteDur += s.next.next.dur;
        				tie = true;
        			}
        		}
        		if(curNoteDur*3 == nextNoteDur){
        			syncopeArr = new Array();
        			syncopeArr.push(s.istart);
        			if(!tie){
        				syncopeArr.push(s.next.istart);
        			}else{
        				syncopeArr.push(s.next.next.istart);
        			}
        		}
        	}
        	*/
      // 时值1 2 1模式（第一个音符0.5拍，第二个音符1拍，第三个音符0.5拍）
      if (s.type == C.NOTE && s.next && s.next.next) {
        var curNoteDur = s.dur;
        var nextNoteDur = s.next.dur;
        var threeNoteDur = 0;
        var tie = false;
        if (s.next.ti1) {
          nextNoteDur += s.next.next.dur;
          if (s.next.next.next) {
            threeNoteDur = s.next.next.next.dur;
            tie = true;
          }
        } else {
          threeNoteDur = s.next.next.dur;
        }
        if (curNoteDur * 2 == nextNoteDur && nextNoteDur == threeNoteDur * 2) {
          syncopeArr = new Array();
          syncopeArr.push(s.istart);
          syncopeArr.push(s.next.istart);
          if (!tie) {
            syncopeArr.push(s.next.next.istart);
          } else {
            syncopeArr.push(s.next.next.next.istart);
          }
        }
      }
    }
    //处理音符的柯尔文
    function handleKew(s) {
      if (showKew) {
        if (
          s.type == C.NOTE &&
          s.grace != true &&
          !s.ti2 &&
          s.clef_type != "p"
        ) {
          var noteStr = source_val.substring(s.istart, s.iend);
          var noteReg = /[_^A-Ga-g]{1,3}/;
          var matchs = noteStr.match(noteReg);
          if (matchs != null) {
            var c = matchs[0];
            var myKey = s.my_key;
            myKey = myKey.replaceAll(/\s/, "");
            if (myKey.indexOf("shift") > -1) {
              myKey = myKey.substring(0, myKey.indexOf("shift"));
            }
            var simpleName = getSimpleNameByKAndStaff(
              myKey,
              c.toUpperCase(),
              source_val
            );
            if (simpleName) {
              simpleName = simpleName
                .replace(/[,']/g, "")
                .replace("^", "s")
                .replace("_", "b");
              s.simpleName = simpleName;
              console.log(s);
              var nodeSameKew = nodeKewMap.get(
                "node" + s.my_node_index + c.toUpperCase()
              );
              if (nodeSameKew && nodeSameKew == c.toUpperCase()) {
                return;
              }
              nodeKewMap.set(
                "node" + s.my_node_index + c.toUpperCase(),
                c.toUpperCase()
              );
              if (!s.a_dd) {
                s.a_dd = new Array();
              }
              var dd = new Object();
              dd.func = 3;
              dd.glyph = "kew" + simpleName;
              dd.h = 45;
              dd.name = "kew" + simpleName;
              dd.str = "kew" + simpleName;
              dd.wl = 1;
              dd.wr = 3;
              s.a_dd.unshift(dd);
            }
          }
        }
      }
    }
    //竖笛
    function handleSD(s) {
      if (showSD) {
        if (s.type == C.NOTE && s.grace != true && !s.ti2) {
          //先把原有的竖笛的标记去掉
          if (s.a_dd) {
            for (var i = 0; i < s.a_dd.length; i++) {
              if (s.a_dd[i].name.indexOf("sd") == 0) {
                s.a_dd.splice(i, 1);
                i--;
              }
            }
          }

          var noteStr = source_val.substring(s.istart, s.iend);
          var noteReg = /[_^A-Ga-g]{1,3}/;
          var matchs = noteStr.match(noteReg);
          if (matchs != null) {
            var c = matchs[0];
            var myKey = s.my_key;
            myKey = myKey.replaceAll(/\s/, "");
            if (myKey.indexOf("shift") > -1) {
              myKey = myKey.substring(0, myKey.indexOf("shift"));
            }
            var simpleName = getSimpleNameByKAndStaff(
              myKey,
              c.toUpperCase(),
              source_val
            );
            if (simpleName) {
              simpleName = simpleName
                .replace(/[,']/g, "")
                .replace("^", "s")
                .replace("_", "b");
              s.simpleName = simpleName;
              if (!s.a_dd) {
                s.a_dd = new Array();
              }
              var dd = new Object();
              dd.func = 3;
              dd.glyph = "sd" + simpleName;
              dd.h = 83;
              dd.name = "sd" + simpleName;
              dd.str = "sd" + simpleName;
              dd.wl = 1;
              dd.wr = 3;
              s.a_dd.unshift(dd);
            }
          }
        }
      } else {
        //如果标识不显示强弱标记，则把有强弱标记的数据删除，并返回
        return;
        if (s.a_dd) {
          for (var i = 0; i < s.a_dd.length; i++) {
            if (s.a_dd[i].name.indexOf("sd") == 0) {
              s.a_dd.splice(i, 1);
              i--;
            }
          }
        }
        return s;
      }
    }
    function handleSD8(s) {
      if (showSD8 || s.my_showsd8) {
        if (s.type == C.NOTE && s.grace != true && !s.ti2) {
          //先把原有的竖笛标记去掉
          if (s.a_dd) {
            for (var i = 0; i < s.a_dd.length; i++) {
              if (s.a_dd[i].name.indexOf("sd8") == 0) {
                s.a_dd.splice(i, 1);
                i--;
              }
            }
          }

          var noteStr = source_val.substring(s.istart, s.iend);
          var noteReg = /[_^A-Ga-g]{1,3}/;
          var matchs = noteStr.match(noteReg);
          if (matchs != null) {
            var c = matchs[0];
            var ub = "";
            if (/[_^]/.test(c)) {
              ub = /[_^]/.exec(c)[0];
            }
            var myKey = s.my_key;
            myKey = myKey.replaceAll(/\s/, "");
            if (myKey.indexOf("shift") > -1) {
              myKey = myKey.substring(0, myKey.indexOf("shift"));
            }
            var ud = "";
            if (/[a-g]/.test(c)) {
              ud = "s";
            }
            var simpleName = getSimpleNameByKAndStaff(
              myKey,
              c.toUpperCase(),
              source_val
            );
            if (simpleName) {
              simpleName = simpleName
                .replace(/[,']/g, "")
                .replace("^", "u")
                .replace("_", "b");
              s.simpleName = simpleName;
              if (!s.a_dd) {
                s.a_dd = new Array();
              }
              var dd = new Object();
              dd.func = 3;
              dd.glyph = "sd8_" + simpleName + ud;
              if (s.my_showsd8) {
                dd.h = 115;
              } else {
                dd.h = 99;
              }
              dd.name = "sd8_" + simpleName + ud;
              dd.str = "sd8_" + simpleName + ud;
              dd.wl = 1;
              dd.wr = 3;
              s.a_dd.unshift(dd);
            }
          }
        }
      } else {
        //如果标识不显示竖笛标记，则把有竖笛标记的数据删除，并返回
        return;
        if (s.a_dd) {
          for (var i = 0; i < s.a_dd.length; i++) {
            if (s.a_dd[i].name.indexOf("sd8") == 0) {
              s.a_dd.splice(i, 1);
              i--;
            }
          }
        }
        return s;
      }
    }
    // 处理音符的强弱标记
    function handleStrongWeak(s) {
      if (!showBeat) {
        //如果标识不显示强弱标记，则把有强弱标记的数据删除，并返回
        if (s.a_dd) {
          for (var i = 0; i < s.a_dd.length; i++) {
            if (
              s.a_dd[i].name.indexOf("strong") == 0 ||
              s.a_dd[i].name.indexOf("sec_strong") == 0 ||
              s.a_dd[i].name.indexOf("weak") == 0 ||
              s.a_dd[i].name.indexOf("s_w") == 0
            ) {
              s.a_dd.splice(i, 1);
              i--;
            }
          }
        }
        return s;
      }
      if (s.type == C.NOTE && s.grace != true) {
        var prevData = null;
        if (s.v > 0 && s.ts_prev && s.ts_prev.time == s.time) {
          var tsPrev = s.ts_prev;
          if (tsPrev.a_dd) {
            for (var i = 0; i < tsPrev.a_dd.length; i++) {
              if (
                tsPrev.a_dd[i].name.indexOf("strong") == 0 ||
                tsPrev.a_dd[i].name.indexOf("sec_strong") == 0 ||
                tsPrev.a_dd[i].name.indexOf("weak") == 0 ||
                tsPrev.a_dd[i].name.indexOf("s_w") == 0
              ) {
                prevData = clone(tsPrev.a_dd[i]);
              }
            }
          }
        }

        //在这里计算拍点 add by hxs************************start
        //s.p_v.ulen
        var beat = s.dur_orig / s.p_v.ulen;
        if (s.in_tuplet) {
          beat = s.dur / s.p_v.ulen;
        }
        if (s.time == 0) {
          //第一个音符
          lastNoteBeatSeq = -1;
          nodeBeatTotal = 0;
        }
        s.beat_seq = nodeBeatTotal;
        if (s.beat_seq - parseInt(s.beat_seq) > 0.99) {
          //如果小数部分大于0.99，则直接四舍五入
          s.beat_seq = Math.round(s.beat_seq);
        }
        var ubeat = C.BLEN / s.my_meter[0].bot / s.p_v.ulen;
        nodeBeatTotal += beat / ubeat; //该值在newbar那个方法里面重置为0
        var topVal = s.my_meter[0].top;
        if (topVal == 5) {
          topVal = 5 + "" + beatModel5;
        } else if (topVal == 7) {
          topVal = 7 + "" + beatModel7;
        }
        var currBeatSetting = beatSetting[topVal];
        var pname = currBeatSetting[parseInt(s.beat_seq)];
        var pf = null;

        if (s.a_dd) {
          pf = s.a_dd.find(function (item) {
            return item.glyph == "pf" || item.glyph == "accent";
          });
        }

        //                if((lastNoteBeatSeq!=parseInt(s.beat_seq) && pname && pname!="") || (pf && pf != null)){
        if (lastNoteBeatSeq != parseInt(s.beat_seq) && pname && pname != "") {
          //去掉了|| (pf && pf != null)这个条件，原来是只要有强弱装饰音标记的，都要加上强弱记号？
          var existStrongFlag = false;
          // 判断是否已经存在强弱标识
          if (s.a_dd) {
            for (var i = 0; i < s.a_dd.length; i++) {
              if (
                s.a_dd[i].name.indexOf("strong") == 0 ||
                s.a_dd[i].name.indexOf("sec_strong") == 0 ||
                s.a_dd[i].name.indexOf("weak") == 0 ||
                s.a_dd[i].name.indexOf("s_w") == 0
              ) {
                existStrongFlag = true;
                if (s.bar_index) {
                  notAutoSFBarSeq = s.bar_index;
                }
              }
            }
          }
          //如果已经存在强弱标识，就不再自动设置,小节内有人工设置的强弱标记的，不自动设置，在渐强渐弱的包围内，不自动设置
          //                	if(!existStrongFlag && notAutoSFBarSeq!=s.bar_index && !cresc && !dim){
          if (!existStrongFlag && notAutoSFBarSeq != s.bar_index) {
            //暂时不处理渐强渐弱
            // 如果上一个音符有标记连音符号，则不添加强弱标记
            if (!s.ti2) {
              if (prevData != null) {
                if (!s.a_dd) {
                  s.a_dd = [];
                }
                s.a_dd.unshift(prevData);
              } else {
                var my_dd = switchPname(s, pname);
                if (my_dd != null && !prevData) {
                  s.a_dd.unshift(my_dd);
                }
              }
            }
          }
        }

        //上一个音符所在拍的序号，一个拍序号不重复显示强弱，一拍内只显示第一个音符的强弱
        lastNoteBeatSeq = parseInt(s.beat_seq);

        if (s.a_dd) {
          var cd = s.a_dd.find(function (item) {
            return item.glyph == "cresc" || item.glyph == "dim";
          });
          if (cd != null) {
            if (cd.glyph == "cresc") {
              if (cd.dd_en) {
                // 开始渐强
                cresc = true;
              } else if (cd.dd_st) {
                // 结束渐强
                cresc = false;
              }
            } else if (cd.glyph == "dim") {
              if (cd.dd_en) {
                // 开始渐弱
                dim = true;
              } else if (cd.dd_st) {
                // 结束渐弱
                dim = false;
              }
            }
          }
        }

        // 计算拍点结束************************end
      } else if (s.type == C.REST) {
        var beat = s.dur_orig / s.p_v.ulen;
        if (s.time == 0) {
          //第一个音符
          lastNoteBeatSeq = -1;
          nodeBeatTotal = 0;
        }
        s.beat_seq = nodeBeatTotal;
        var ubeat = C.BLEN / currMeter[0].bot / s.p_v.ulen;
        nodeBeatTotal += beat / ubeat; //该 值在newbar那个方法里面重置为0
      }

      if (s.notes) {
        isTi1 = s.notes[0].ti1;
        if (!isTi1) {
          isTi1 = 0;
        }
      }
    }
    // 构建音符
    function slur_add(enote, e_is_note) {
      var i, s, sl, snote, s_is_note;
      for (i = curvoice.sls.length; --i >= 0; ) {
        sl = curvoice.sls[i];
        snote = sl.note;
        s_is_note = sl.is_note;
        delete sl.is_note;
        if (snote.s != enote.s) {
          sl.note = enote;
          if (e_is_note) sl.is_note = e_is_note;
          s = s_is_note ? snote : snote.s;
          if (!s.sls) s.sls = [];
          s.sls.push(sl);
          curvoice.sls.splice(i, 1);
          if (s_is_note) snote.s.sl1 = true;
          if (sl.grace) sl.grace.sl1 = true;
          if (enote.s.grace) enote.s.sl2 = true;
          return;
        }
      }
      if (enote.grace) {
        error(1, enote.s, errs.bad_slur_end);
        return;
      }
      for (s = enote.s.prev; s; s = s.prev) {
        if (s.type == C.BAR && s.bar_type[0] == ":" && s.text) {
          if (!s.sls) s.sls = [];
          s.sls.push({
            note: enote,
            ty: C.SL_AUTO,
          });
          if (e_is_note) s.sls[s.sls.length - 1].is_note = e_is_note;
          return;
        }
      }
      syntax(1, "缺少开始括号(");
    }
    function pit2mid(pit, acc) {
      var p = [0, 2, 4, 5, 7, 9, 11][pit % 7],
        o = ((pit / 7) | 0) * 12,
        p0,
        p1,
        s,
        b40;
      if (curvoice.snd_oct) o += curvoice.snd_oct;
      if (acc == 3) acc = 0;
      if (acc) {
        if (typeof acc != "number") {
          s = acc[0] / acc[1];
          if (acc[1] == 100) return p + o + s;
        } else {
          s = acc;
        }
      } else {
        if (cfmt.temper) return cfmt.temper[abc2svg.p_b40[pit % 7]] + o;
        return p + o;
      }
      if (!cfmt.nedo) {
        if (!cfmt.temper) {
          p += o + s;
          return p;
        }
      } else {
        if (typeof acc == "number") {
          b40 = abc2svg.p_b40[pit % 7] + acc;
          return cfmt.temper[b40] + o;
        }
        if (acc[1] == cfmt.nedo) {
          b40 = abc2svg.p_b40[pit % 7];
          return cfmt.temper[b40] + o + s;
        }
      }
      p0 = cfmt.temper[abc2svg.p_b40[pit % 7]];
      if (s > 0) {
        p1 = cfmt.temper[(abc2svg.p_b40[pit % 7] + 1) % 40];
        if (p1 < p0) p1 += 12;
      } else {
        p1 = cfmt.temper[(abc2svg.p_b40[pit % 7] + 39) % 40];
        if (p1 > p0) p1 -= 12;
        s = -s;
      }
      return p0 + o + (p1 - p0) * s;
    }
    // 构建音符
    var last_is_trem1 = false; // add by hxs
    Abc.prototype.new_note = function (grace, sls) {
      var note,
        s,
        in_chord,
        c,
        dcn,
        type,
        tie_s,
        acc_tie,
        i,
        n,
        s2,
        nd,
        res,
        num,
        dur,
        apit,
        sl1 = [],
        line = parse.line,
        a_dcn_sav = a_dcn;
      var a_dcn_info_sav = a_dcn_info; //add by hxs
      if (!grace && curvoice.tie_s) {
        tie_s = curvoice.tie_s;
        curvoice.tie_s = null;
      }
      function do_ties(s, tie_s) {
        //	console.log(s, tie_s)
        var m, note, n;
        for (m = 0; m <= s.nhd; m++) {
          note = s.notes[m];
          n = abc2svg.b40m(note.b40);
          if (tie_s.type != C.GRACE) {
            for (i = 0; i <= tie_s.nhd; i++) {
              if (!tie_s.notes[i].tie_ty) continue;
              if (abc2svg.b40m(tie_s.notes[i].b40) == n) {
                tie_s.notes[i].tie_n = note;
                note.s = s;
                tie_s.tie_s = s;
                break;
              }
            }
          } else {
            for (s2 = tie_s.extra; s2; s2 = s2.next) {
              if (!s2.notes[0].tie_ty) continue;
              if (abc2svg.b40m(s2.notes[0].b40) == n) {
                s2.tie_s = s;
                s2.notes[0].tie_n = note;
                note.s = s;
                s2.notes[0].s = s2;
                tie_s.tie_s = s;
                break;
              }
            }
          }
          s.ti2 = tie_s;
          // create by lhj 把所有同音连的音符，标记在第一音符上。同步时，第一个音高亮，所有连音的音符都要高亮
          if (s.ti2) {
            // &&
            if (tie_s.slur_istart) {
              s.slur_istart = tie_s.slur_istart;
            } else if (tie_s.notes && tie_s.notes[0].pit == s.notes[0].pit) {
              // 只有同音高的音相连才同时高亮
              s.slur_istart = tie_s.istart;
            }
          }
        }
      }
      a_dcn = null;
      a_dcn_info = null; //add by hxs
      parse.stemless = false;
      s = {
        type: C.NOTE,
        fname: parse.fname,
        my_bar_num: 0,
        my_node_index: my_node_index,
        stem: 0,
        multi: 0,
        nhd: 0,
        xmx: 0,
      };
      s.istart = parse.bol + line.index;
      if (curr_tempo) {
        s.my_tempo = curr_tempo.tempo; //add by hxs
        s.my_tempo_notes = curr_tempo.tempo_notes; //add by hxs;
      }
      s.my_meter = currMeter;
      s.my_wmeasure = curr_wmeasure;
      s.my_key = currentKey;
      s.my_k_sf = currentKSF;
      if (curvoice.color) s.color = curvoice.color;
      if (grace) {
        s.grace = true;
      } else {
        if (a_gch) gch_build(s);
        if (parse.repeat_n) {
          s.repeat_n = parse.repeat_n;
          s.repeat_k = parse.repeat_k;
          parse.repeat_n = 0;
        }
      }
      s.my_midi_program = instrMap.get(curvoice.v); //音符的自定义音色
      c = line.char();
      //扩展的音符 add by hxs
      //if(c=="h"){
      if (isExtendChar(c)) {
        c = "z";
        s.is_ext = true;
      }
      if (isExtend2Char(c)) {
        c = "G";
        s.is_ext2 = true;
      }
      switch (c) {
        case "X":
          s.invis = true;
        case "Z":
          s.type = C.MREST;
          c = line.next_char();
          s.nmes = c > "0" && c <= "9" ? line.get_int() : 1;
          s.dur = curvoice.wmeasure * s.nmes;
          if (curvoice.second) {
            curvoice.time += s.dur;
            return;
          }
          if (s.nmes == 1) {
            s.type = C.REST;
            s.dur_orig = s.dur;
            s.notes = [
              {
                pit: 18,
                dur: s.dur,
              },
            ];
          }
          break;
        case "y":
          s.type = C.SPACE;
          s.invis = true;
          s.dur = 0;
          c = line.next_char();
          if (c >= "0" && c <= "9") s.width = line.get_int();
          else s.width = 10;
          if (tie_s) curvoice.tie_s = tie_s;
          break;
        case "x":
          s.invis = typeof isInvisx != "undefined" ? isInvisx : true;
        case "z":
          s.type = C.REST;
          line.index++;
          //增加对休止符后面增加,号和'号
          var next_char2 = line.char();
          while (next_char2 == "," || next_char2 == "'") {
            line.index++;
            next_char2 = line.char();
          }
          nd = parse_dur(line);
          s.dur_orig =
            ((curvoice.ulen < 0 ? C.BLEN : curvoice.ulen) * nd[0]) / nd[1];
          s.dur = s.dur_orig * curvoice.dur_fact;
          s.notes = [
            {
              pit: 18,
              dur: s.dur_orig,
            },
          ];
          if (curvoice.map && maps[curvoice.map]) {
            if (s.type == C.REST) {
              //休止符特殊处理 add by hxs
              set_map(s.notes[0], "rest");
            } else {
              set_map(s.notes[0]);
            }
          }
          break;
        case "[":
          in_chord = true;
          c = line.next_char();
        default:
          if (curvoice.acc_tie) {
            acc_tie = curvoice.acc_tie;
            curvoice.acc_tie = null;
          }
          if (curvoice.uscale) s.uscale = curvoice.uscale;
          s.notes = [];
          while (1) {
            if (in_chord) {
              while (1) {
                if (!c) break;
                i = c.charCodeAt(0);
                if (i >= 128) {
                  syntax(1, errs.not_ascii);
                  return;
                }
                type = char_tb[i];
                switch (type[0]) {
                  case "(":
                    sl1.push(parse_vpos());
                    c = line.char();
                    continue;
                  case "!":
                    if (!a_dcn) {
                      a_dcn = [];
                      a_dcn_info = []; //add by hxs
                    }
                    var dcnInfo = new Object(); //add by hxs 存储istart,iend
                    dcnInfo.istart = parse.bol + line.index;
                    if (type.length > 1) {
                      a_dcn.push(type.slice(1, -1));
                      dcnInfo.iend = parse.bol + line.index + 1;
                      dcnInfo.dcn = a_dcn[a_dcn.length - 1];
                      a_dcn_info.push(dcnInfo);
                    } else {
                      dcn = "";
                      while (1) {
                        c = line.next_char();
                        if (!c) {
                          //syntax(1, "装饰音声明未结束,请检查是否缺少'!'")
                          syntax(1, "装饰音声明未结束,请检查是否缺少'!'");
                          return;
                        }
                        if (c == "!") {
                          dcnInfo.iend = parse.bol + line.index + 1;
                          break;
                        }
                        dcn += c;
                      }
                      dcnInfo.dcn = dcn;
                      a_dcn_info.push(dcnInfo);
                      a_dcn.push(dcn);
                    }
                    c = line.next_char();
                    continue;
                }
                break;
              }
            }
            note = parse_basic_note(
              line,
              s.grace ? C.BLEN / 4 : curvoice.ulen < 0 ? C.BLEN : curvoice.ulen
            );
            if (!note) return;
            if (curvoice.octave) note.pit += curvoice.octave * 7;
            apit = note.pit + 19;
            s.octave = curvoice.octave;
            i = note.acc;
            note.midi = pit2mid(apit, i);
            if (i) {
              curvoice.acc[apit] = i;
            } else {
              if (curvoice.acc) i = curvoice.acc[apit];
              if (!i && acc_tie) i = acc_tie[apit];
              if (!i) i = curvoice.ckey.k_map[apit % 7] || 0;
            }
            note.b40 = abc2svg.pab40(note.pit, i);
            if (curvoice.map && maps[curvoice.map]) set_map(note);
            if (sl1.length) {
              while (1) {
                i = sl1.shift();
                if (!i) break;
                curvoice.sls.push({
                  is_note: true,
                  note: note,
                  ty: i,
                });
              }
              note.s = s;
            }
            if (a_dcn) {
              note.a_dcn = a_dcn;
              note.a_dcn_info = a_dcn_info; //add by hxs
              a_dcn = null;
              a_dcn_info = null; //add by hxs
            }
            s.notes.push(note);
            if (!in_chord) break;
            c = line.char();
            while (1) {
              switch (c) {
                case ")":
                  note.s = s;
                  slur_add(note, true);
                  c = line.next_char();
                  continue;
                case "-":
                  note.tie_ty = parse_vpos();
                  note.s = s;
                  curvoice.tie_s = s;
                  if (curvoice.acc[apit] || (acc_tie && acc_tie[apit])) {
                    if (!curvoice.acc_tie) curvoice.acc_tie = [];
                    curvoice.acc_tie[apit] =
                      curvoice.acc[apit] || acc_tie[apit];
                  }
                  c = line.char();
                  continue;
                case ".":
                  c = line.next_char();
                  switch (c) {
                    case "-":
                    case "(":
                      continue;
                  }
                  syntax(1, "Misplaced dot");
                  break;
              }
              break;
            }
            if (c == "]") {
              line.index++;
              nd = parse_dur(line);
              s.nhd = s.notes.length - 1;
              for (i = 0; i <= s.nhd; i++) {
                note = s.notes[i];
                note.dur = (note.dur * nd[0]) / nd[1];
              }
              break;
            }
          }
          if (sls.length) {
            while (1) {
              i = sls.shift();
              if (!i) break;
              s.notes[0].s = s;
              curvoice.sls.push({
                note: s.notes[0],
                ty: i,
              });
              if (grace) curvoice.sls[curvoice.sls.length - 1].grace = grace;
            }
          }
          s.dur_orig = s.notes[0].dur;
          s.dur = s.notes[0].dur * curvoice.dur_fact;
      }
      if (s.grace && s.type != C.NOTE) {
        syntax(1, errs.bad_grace);
        return;
      }
      if (s.notes) {
        if (!grace) {
          switch (curvoice.pos.stm) {
            case C.SL_ABOVE:
              s.stem = 1;
              break;
            case C.SL_BELOW:
              s.stem = -1;
              break;
            case C.SL_HIDDEN:
              s.stemless = true;
              break;
          }
          num = curvoice.brk_rhythm;
          if (num) {
            curvoice.brk_rhythm = 0;
            s2 = curvoice.last_note;
            var ori_dur = s2.dur_orig + 0;
            if (num > 0) {
              n = num * 2 - 1;
              s.dur = (s.dur * n) / num;
              s.dur_orig = (s.dur_orig * n) / num;
              for (i = 0; i <= s.nhd; i++)
                s.notes[i].dur = (s.notes[i].dur * n) / num;
              s2.dur /= num;
              s2.dur_orig /= num;
              for (i = 0; i <= s2.nhd; i++) s2.notes[i].dur /= num;
            } else {
              num = -num;
              n = num * 2 - 1;
              s.dur /= num;
              s.dur_orig /= num;
              for (i = 0; i <= s.nhd; i++) s.notes[i].dur /= num;
              s2.dur = (s2.dur * n) / num;
              s2.dur_orig = (s2.dur_orig * n) / num;
              for (i = 0; i <= s2.nhd; i++)
                s2.notes[i].dur = (s2.notes[i].dur * n) / num;
            }
            //修正上一个音符小节拍数
            var offsetBeat = (s2.dur_orig - ori_dur) / s2.p_v.ulen;
            if (currMeter[0]) {
              var ubeat = C.BLEN / currMeter[0].bot / s2.p_v.ulen;
              nodeBeatTotal += offsetBeat / ubeat; //该 值在newbar那个方法里面重置为0
            }
            curvoice.time = s2.time + s2.dur;
            for (s2 = s2.next; s2; s2 = s2.next) s2.time = curvoice.time;
          }
        } else {
          var div = curvoice.ckey.k_bagpipe ? 8 : 4;
          for (i = 0; i <= s.nhd; i++) s.notes[i].dur /= div;
          s.dur /= div;
          s.dur_orig /= div;
          if (grace.stem) s.stem = grace.stem;
        }
        curvoice.last_note = s;
        c = line.char();
        while (1) {
          switch (c) {
            case "-":
              var ty = parse_vpos();
              for (i = 0; i <= s.nhd; i++) {
                s.notes[i].tie_ty = ty;
                s.notes[i].s = s;
              }
              if (grace) grace.tie_s = curvoice.tie_s = grace;
              else curvoice.tie_s = s;
              for (i = 0; i <= s.nhd; i++) {
                note = s.notes[i];
                apit = note.pit + 19;
                if (curvoice.acc[apit] || (acc_tie && acc_tie[apit])) {
                  if (!curvoice.acc_tie) curvoice.acc_tie = [];
                  curvoice.acc_tie[apit] = curvoice.acc[apit] || acc_tie[apit];
                }
              }
              c = line.char();
              continue;
            case ")":
              s.notes[0].s = s;
              slur_add(s.notes[0]);
              c = line.next_char();
              continue;
            case ".":
              if (line.buffer[line.index + 1] != "-") break;
              c = line.next_char();
              continue;
          }
          break;
        }
        if (tie_s) do_ties(s, tie_s);
      }
      sym_link(s);
      if (cfmt.shiftunison) s.shiftunison = cfmt.shiftunison;

      if (!grace) {
        if (!curvoice.lyric_restart) curvoice.lyric_restart = s;
        // create by lhj 打击乐
        if (!curvoice.strike_restart) curvoice.strike_restart = s;
        // create by lhj 图片
        if (!curvoice.picture_restart) curvoice.picture_restart = s;
        if (!curvoice.sym_restart) curvoice.sym_restart = s;
      }
      if (a_dcn_sav) deco_cnv(a_dcn_sav, s, s.prev, a_dcn_info_sav); //增加了a_dcn_info_sav参数
      if (parse.ottava.length) {
        s.ottava = parse.ottava;
        parse.ottava = [];
      }
      if (parse.stemless) s.stemless = true;
      s.iend = parse.bol + line.index;
      //如果是震音，当前音的下一个音时值减半 add by hxs----start
      if (s.trem1 && s.trem_type == "mid") {
        curvoice.time = curvoice.time - s.dur / 2;
        last_is_trem1 = true;
        s.dur = s.dur / 2;
      }
      if (!s.trem1 && last_is_trem1) {
        last_is_trem1 = false;
        curvoice.time = curvoice.time - s.dur / 2;
        s.dur = s.dur / 2;
      }
      //--------end------
      //            handleStrongWeak(s);//强弱拍

      //唱名处理
      if (cfmt.showcm && s.type == 8) {
        var my_dd = getCmInfo(s);
        if (!s.a_dd) {
          s.a_dd = new Array();
        }
        if (my_dd != null) {
          s.a_dd.unshift(my_dd);
        }
      }
      preBarNotes.push(s);
      if (s.a_gch) {
        for (var i = 0; i < s.a_gch.length; i++) {
          var text = s.a_gch[i].text;
          if (/url\(.*\)/.test(text)) {
            s.color = "#0E518F";
          }
        }
      }
      if (isInFirstNode && s.type == 8) {
        firstNodeNotes.push(s);
      }
      return s;
    };
    function tp_adj(s, fact) {
      var tim = s.time;
      curvoice.time = s.time + (curvoice.time - s.time) * fact;
      while (1) {
        s.in_tuplet = true;
        if (!s.grace) {
          s.time = tim;
          if (s.dur) {
            s.dur = Math.round(s.dur * fact);
            tim += s.dur;
          }
        }
        if (!s.next) {
          s.dur = curvoice.time - s.time;
          if (s.tpe) s.tpe++;
          else s.tpe = 1;
          break;
        }
        s = s.next;
      }
    }
    var nil = ["0"];
    var char_tb = [
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      " ",
      "\n",
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      " ",
      "!",
      '"',
      "i",
      "\n",
      nil,
      "&",
      nil,
      "(",
      ")",
      "i",
      nil,
      nil,
      "-",
      "!dot!",
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      nil,
      "|",
      "i",
      "<",
      "n",
      "<",
      "i",
      "i",
      "n",
      "n",
      "n",
      "n",
      "n",
      "n",
      "n",
      "!fermata!",
      "d",
      "d",
      "d",
      "!emphasis!",
      "!lowermordent!",
      "d",
      "!coda!",
      "!uppermordent!",
      "d",
      "d",
      "!segno!",
      "!trill!",
      "d",
      "d",
      "d",
      "n",
      "d",
      "n",
      "[",
      "\\",
      "|",
      "n",
      "n",
      "i",
      "n",
      "n",
      "n",
      "n",
      "n",
      "n",
      "n",
      "d",
      "d",
      "d",
      "d",
      "d",
      "d",
      "d",
      "d",
      "d",
      "d",
      "d",
      "d",
      "d",
      "!upbow!",
      "!downbow!",
      "d",
      "n",
      "n",
      "n",
      "{",
      "|",
      "}",
      "!gmark!",
      nil,
    ];
    function parse_music_line() {
      var grace,
        last_note_sav,
        a_dcn_sav,
        no_eol,
        s,
        tps,
        tp = [],
        tpn = -1,
        sls = [],
        line = parse.line;

      function check_mac(m) {
        var i, j, b;
        for (i = 1, j = line.index + 1; i < m.length; i++, j++) {
          if (m[i] == line.buffer[j]) continue;
          if (m[i] != "n") return;
          b = ntb.indexOf(line.buffer[j]);
          if (b < 0) return;
          while (line.buffer[j + 1] == "'") {
            b += 7;
            j++;
          }
          while (line.buffer[j + 1] == ",") {
            b -= 7;
            j++;
          }
        }
        line.index = j;
        return b;
      }

      function n2n(n) {
        var c = ntb[n];
        while (n < 0) {
          n += 7;
          c += ",";
        }
        while (n > 14) {
          n -= 7;
          c += "'";
        }
        return c;
      }

      function expand(m, b) {
        var c,
          i,
          r = "",
          n = m.length;
        for (i = 0; i < n; i++) {
          c = m[i];
          if (c >= "h" && c <= "z") {
            r += n2n(b + c.charCodeAt(0) - "n".charCodeAt(0));
          } else {
            r += c;
          }
        }
        return r;
      }

      function parse_mac(k, m, b) {
        var te,
          ti,
          curv,
          s,
          line_sav = line,
          istart_sav = parse.istart;
        parse.line = line = new scanBuf();
        parse.istart += line_sav.index;
        if (cfmt.writefields.indexOf("m") < 0) {
          line.buffer = k.replace("n", n2n(b));
          s = curvoice.last_sym;
          ti = curvoice.time;
          parse_seq(true);
          if (!s) s = curvoice.sym;
          for (s = s.next; s; s = s.next) s.noplay = true;
          te = curvoice.time;
          curv = curvoice;
          curvoice = clone_voice(curv.id + "-p");
          if (!par_sy.voices[curvoice.v]) {
            curvoice.second = true;
            par_sy.voices[curvoice.v] = {
              st: curv.st,
              second: true,
              range: curvoice.v,
            };
          }
          curvoice.time = ti;
          s = curvoice.last_sym;
          parse.line = line = new scanBuf();
          parse.istart += line_sav.index;
          line.buffer = b ? expand(m, b) : m;
          parse_seq(true);
          if (curvoice.time != te)
            syntax(1, "Bad length of the macro sequence");
          if (!s) s = curvoice.sym;
          for (; s; s = s.next) {
            s.invis = s.play = true;
          }
          curvoice = curv;
        } else {
          line.buffer = b ? expand(m, b) : m;
          parse_seq(true);
        }
        parse.line = line = line_sav;
        parse.istart = istart_sav;
      }

      function parse_seq(in_mac) {
        var c, idx, type, k, s, dcn, i, n, text, note;
        while (1) {
          c = line.char();
          //扩展的音符的语法 add by hxs
          //if(c=="h"){
          if (isExtendChar(c)) {
            c = "z";
          }
          if (isExtend2Char(c)) {
            c = "G";
          }
          if (!c) break;
          if (curvoice.ignore) {
            while (1) {
              while (c && c != "[") c = line.next_char();
              if (!c) break;
              if (c == "V" && line.buffer[line.index + 1] == ":") break;
              c = line.next_char();
            }
            if (!c) break;
          }
          if (c == ".") {
            switch (line.buffer[line.index + 1]) {
              case "(":
              case "-":
              case "|":
                c = line.next_char();
                break;
            }
          }
          if (!in_mac && maci[c]) {
            n = 0;
            for (k in mac) {
              if (!mac.hasOwnProperty(k) || k[0] != c) continue;
              if (k.indexOf("n") < 0) {
                if (line.buffer.indexOf(k, line.index) != line.index) continue;
                line.index += k.length;
              } else {
                n = check_mac(k);
                if (!n) continue;
              }
              parse_mac(k, mac[k], n);
              n = 1;
              break;
            }
            if (n) continue;
          }
          idx = c.charCodeAt(0);
          if (idx >= 128) {
            syntax(1, errs.not_ascii);
            line.index++;
            break;
          }
          type = char_tb[idx];
          switch (type[0]) {
            case " ":
              s = curvoice.last_note;
              if (s) {
                s.beam_end = true; //遇到空格，把符尾切断
                if (grace) grace.gr_shift = true;
              }
              break;
            case "\n":
              if (cfmt.barsperstaff) break;
              if (
                par_sy.voices[curvoice.v] &&
                par_sy.voices[curvoice.v].range == 0 &&
                curvoice.last_sym
              )
                curvoice.last_sym.eoln = true;
              break;
            case "&":
              if (grace) {
                syntax(1, errs.bad_grace);
                break;
              }
              c = line.next_char();
              if (c == ")") {
                get_vover(")");
                break;
              }
              get_vover("&");
              continue;
            case "(":
              c = line.next_char();
              if (c > "0" && c <= "9") {
                if (grace) {
                  syntax(1, errs.bad_grace);
                  break;
                }
                var pplet = line.get_int(),
                  qplet = qplet_tb[pplet],
                  rplet = pplet,
                  c = line.char();
                if (c == ":") {
                  c = line.next_char();
                  if (c > "0" && c <= "9") {
                    qplet = line.get_int();
                    c = line.char();
                  }
                  if (c == ":") {
                    c = line.next_char();
                    if (c > "0" && c <= "9") {
                      rplet = line.get_int();
                      c = line.char();
                    } else {
                      syntax(1, "Invalid 'r' in tuplet");
                      continue;
                    }
                  }
                }
                if (qplet == 0 || qplet == undefined)
                  qplet = curvoice.wmeasure % 9 == 0 ? 3 : 2;
                if (tpn < 0) tpn = tp.length;
                tp.push({
                  p: pplet,
                  q: qplet,
                  r: rplet,
                  ro: rplet,
                  f: cfmt.tuplets,
                });
                continue;
              }
              if (c == "&") {
                if (grace) {
                  syntax(1, errs.bad_grace);
                  break;
                }
                get_vover("(");
                break;
              }
              line.index--;
              sls.push(parse_vpos());
              continue;
            case ")":
              if (curvoice.ignore) break;
              s = curvoice.last_sym;
              if (s) {
                switch (s.type) {
                  case C.SPACE:
                    if (!s.notes) {
                      s.notes = [];
                      s.notes[0] = {};
                    }
                  case C.NOTE:
                  case C.REST:
                    break;
                  case C.GRACE:
                    for (s = s.extra; s.next; s = s.next);
                    break;
                  default:
                    s = null;
                    break;
                }
              }
              if (!s) {
                syntax(1, errs.bad_char, c);
                break;
              }
              s.notes[0].s = s;
              slur_add(s.notes[0]);
              break;
            case "!":
              if (!a_dcn) {
                a_dcn = [];
                a_dcn_info = []; //add by hxs
              }
              var dcnInfo = new Object(); //add by hxs 存储istart,iend
              dcnInfo.istart = parse.bol + line.index;

              if (type.length > 1) {
                dcn = type.slice(1, -1);

                //add by hxs
                dcnInfo.iend = parse.bol + line.index + 1;
                //dcnInfo.dcn = a_dcn[a_dcn.length-1];
                //a_dcn_info.push(dcnInfo);
              } else {
                dcn = "";
                i = line.index;
                while (1) {
                  c = line.next_char();
                  if (!c) break;
                  if (c == "!") {
                    dcnInfo.iend = parse.bol + line.index + 1; //add by hxs
                    break;
                  }
                  dcn += c;
                }
                if (!c) {
                  line.index = i;
                  syntax(1, "装饰音声明未结束,请检查是否缺少'!'");
                  break;
                }
              }
              if (dcn.match(/8va\(|8vb\(|15ma\(|15mb\(/) != null) {
                //	                        	dcn=dcn.match(/8va\(|8vb\(|15ma\(|15mb\(/)[0];
                var tmpDcn = dcn.match(/8va\(|8vb\(|15ma\(|15mb\(/)[0];
                lastVabHeight = 0;
                if (tmpDcn != dcn) {
                  lastVabHeight = parseFloat(dcn.replace(tmpDcn, ""));
                }
                dcn = tmpDcn;
              }
              if (ottava[dcn] != undefined) {
                glovar.ottava = true;
                parse.ottava.push(ottava[dcn]);
              } else {
                a_dcn.push(dcn);

                dcnInfo.dcn = dcn; //add by hxs
                if (a_dcn_info) {
                  a_dcn_info.push(dcnInfo);
                }
              }
              break;
            case '"':
              if (grace) {
                syntax(1, errs.bad_grace);
                break;
              }
              parse_gchord(type);
              break;
            case "[":
              if (type.length > 1) {
                do_pscom(type.slice(3, -1));
                break;
              }
              var c_next = line.buffer[line.index + 1];
              if (
                '|[]: "'.indexOf(c_next) >= 0 ||
                (c_next >= "1" && c_next <= "9")
              ) {
                if (grace) {
                  syntax(1, errs.bar_grace);
                  break;
                }
                new_bar();
                continue;
              }
              if (line.buffer[line.index + 2] == ":") {
                if (grace) {
                  syntax(1, errs.bad_grace);
                  break;
                }
                i = line.buffer.indexOf("]", line.index + 1);
                if (i < 0) {
                  syntax(1, "缺少中括号 ']'");
                  break;
                }
                text = line.buffer.slice(line.index + 3, i).trim();
                parse.istart = parse.bol + line.index;
                parse.iend = parse.bol + ++i;
                do_info(c_next, text);
                line.index = i; //这是原来的代码，改成下面这一行，否则有在[I:pos]这种配置时，装饰音的decoistart会计算错误

                //line.index = i-line.index
                continue;
              }
            case "n":
              s = self.new_note(grace, sls);
              if (!s) continue;
              s.notespace = notespace;
              if (grace || !s.notes) continue;
              if (tpn >= 0) {
                s.tp = tp.slice(tpn);
                tpn = -1;
                if (tps) s.tp[0].s = tps;
                tps = s;
              } else if (!tps) {
                continue;
              }
              k = tp[tp.length - 1];
              if (--k.r > 0) continue;
              while (1) {
                tp_adj(tps, k.q / k.p);
                i = k.ro;
                if (k.s) tps = k.s;
                tp.pop();
                if (!tp.length) {
                  tps = null;
                  break;
                }
                k = tp[tp.length - 1];
                k.r -= i;
                if (k.r > 0) break;
              }
              continue;
            case "<":
              if (!curvoice.last_note) {
                syntax(1, "'<' 前应该要有音符");
                break;
              }
              if (grace) {
                //syntax(1, "Cannot have a broken rhythm in grace notes")
                syntax(1, "倚音不能加入标记'<'");
                break;
              }
              n = c == "<" ? 1 : -1;
              while (c == "<" || c == ">") {
                n *= 2;
                c = line.next_char();
              }
              curvoice.brk_rhythm = n;
              continue;
            case "i":
              break;
            case "{":
              if (grace) {
                syntax(1, "倚音内不能有该标记'{' ");
                break;
              }
              last_note_sav = curvoice.last_note;
              curvoice.last_note = null;
              a_dcn_sav = a_dcn;
              a_dcn = undefined;
              grace = {
                type: C.GRACE,
                fname: parse.fname,
                istart: parse.bol + line.index,
                dur: 0,
                multi: 0,
              };
              switch (curvoice.pos.gst) {
                case C.SL_ABOVE:
                  grace.stem = 1;
                  break;
                case C.SL_BELOW:
                  grace.stem = -1;
                  break;
                case C.SL_HIDDEN:
                  grace.stem = 2;
                  break;
              }
              sym_link(grace);
              c = line.next_char();
              if (c == "/") {
                grace.sappo = true;
                break;
              }
              continue;
            case "|":
              if (grace) {
                syntax(1, errs.bar_grace);
                break;
              }
              c = line.buffer[line.index - 1];
              new_bar();
              if (c == ".") curvoice.last_sym.bar_dotted = true;
              continue;
            case "}":
              s = curvoice.last_note;
              if (!grace || !s) {
                syntax(1, errs.bad_char, c);
                break;
              }
              if (a_dcn) syntax(1, "装饰音被忽略");
              grace.extra = grace.next;
              grace.extra.prev = null;
              grace.next = null;
              curvoice.last_sym = grace;
              grace = null;
              if (!s.prev && !curvoice.ckey.k_bagpipe) {
                for (i = 0; i <= s.nhd; i++) s.notes[i].dur *= 2;
                s.dur *= 2;
                s.dur_orig *= 2;
              }
              curvoice.last_note = last_note_sav;
              a_dcn = a_dcn_sav;
              break;
            case "\\":
              if (!line.buffer[line.index + 1]) {
                no_eol = true;
                break;
              }
            default:
              syntax(1, errs.bad_char, c);
              break;
          }
          line.index++;
        }
      }
      if (parse.state != 3) {
        if (parse.state != 2) return;
        goto_tune();
      }
      if (parse.tp) {
        tp = parse.tp;
        tps = parse.tps;
        parse.tp = null;
      }
      parse_seq();
      if (tp.length) {
        parse.tp = tp;
        parse.tps = tps;
      }
      if (grace) {
        //	            syntax(1, "No end of grace note sequence");
        syntax(1, "倚音定义未正确结束");
        curvoice.last_sym = grace.prev;
        curvoice.last_note = last_note_sav;
        if (grace.prev) grace.prev.next = null;
      }
      if (cfmt.breakoneoln && curvoice.last_note)
        curvoice.last_note.beam_end = true;
      if (no_eol || cfmt.barsperstaff) return;
      if (
        char_tb["\n".charCodeAt(0)] == "\n" &&
        par_sy.voices[curvoice.v] &&
        par_sy.voices[curvoice.v].range == 0 &&
        curvoice.last_sym
      )
        curvoice.last_sym.eoln = true;
    }
    var cw_tb = new Float32Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0.25, 0.333, 0.408, 0.5, 0.5, 0.833, 0.778, 0.333,
      0.333, 0.333, 0.5, 0.564, 0.25, 0.564, 0.25, 0.278, 0.5, 0.5, 0.5, 0.5,
      0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.278, 0.278, 0.564, 0.564, 0.564, 0.444,
      0.921, 0.722, 0.667, 0.667, 0.722, 0.611, 0.556, 0.722, 0.722, 0.333,
      0.389, 0.722, 0.611, 0.889, 0.722, 0.722, 0.556, 0.722, 0.667, 0.556,
      0.611, 0.722, 0.722, 0.944, 0.722, 0.722, 0.611, 0.333, 0.278, 0.333,
      0.469, 0.5, 0.333, 0.444, 0.5, 0.444, 0.5, 0.444, 0.333, 0.5, 0.5, 0.278,
      0.278, 0.5, 0.278, 0.778, 0.5, 0.5, 0.5, 0.5, 0.333, 0.389, 0.278, 0.5,
      0.5, 0.722, 0.5, 0.5, 0.444, 0.48, 0.2, 0.48, 0.541, 0.5,
    ]);
    function cwid(c) {
      var i = c.charCodeAt(0);
      if (i >= 128) {
        if (i >= 768 && i < 880) return 0;
        i = 97;
      }
      return cw_tb[i];
    }
    function cwidf(c) {
      return cwid(c) * gene.curfont.swfac;
    }
    //宽度计算 歌词宽度 注释宽度
    function strwh(str) {
      if (str.indexOf("[R]") == 0) {
        str = str.replace("[R]", "");
      }
      if (str.indexOf("[L]") == 0) {
        str = str.replace("[L]", "");
      }
      if (str.indexOf("[C]") == 0) {
        str = str.replace("[C]", "");
      }
      if (lyricBgReg.test(str)) {
        //如果是歌词背景色设置 add by hxs
        str = str.replace(lyricBgReg, "");
      }
      if (lyricColorReg.test(str)) {
        str = str.replace(lyricColorReg, "");
      }
      //格式化文本歌词
      if (/fmt:/.test(str)) {
        str = str.replace(/fmt:/, "");
        if (str.indexOf("/") > -1) {
          str = str.substring(0, str.indexOf("/"));
        } else {
          str = str.substring(0, 1);
        }
      }
      var upFlagReg = /\[\^(.[^\[]*)\]/; //上标
      var downFlagReg = /\[\_(.[^\[]*)\]/; //下标
      //歌词上下标
      if (/\[\^(.[^\[]*)\]/.test(str) || /\[\_(.[^\[]*)\]/.test(str)) {
        str = str.replace(/\[\^(.[^\[]*)\]/, "");
        str = str.replace(/\[\_(.[^\[]*)\]/, "");
      }
      if (
        str.indexOf("Ⅰ") == 0 ||
        str.indexOf("Ⅱ") == 0 ||
        str.indexOf("Ⅲ") == 0 ||
        str.indexOf("Ⅳ") == 0 ||
        str.indexOf("Ⅴ") == 0 ||
        str.indexOf("Ⅵ") == 0 ||
        str.indexOf("Ⅶ") == 0 ||
        str.indexOf("K") == 0 ||
        /\([,']?\d.*/.test(str)
      ) {
        str = str.substring(0, 1);
      }
      //ⅱ,ⅲ,ⅳ,ⅴ,ⅵ,ⅶ,ⅷ
      if (
        str.indexOf("ⅰ") == 0 ||
        str.indexOf("ⅱ") == 0 ||
        str.indexOf("ⅲ") == 0 ||
        str.indexOf("ⅳ") == 0 ||
        str.indexOf("ⅴ") == 0 ||
        str.indexOf("ⅵ") == 0 ||
        str.indexOf("ⅶ") == 0 ||
        str.indexOf("ⅷ") == 0
      ) {
        str = str.substring(0, 1);
      }

      if (/!.*!/.test(str)) {
        str = str.replace(/\&/g, "");
      }
      str = str.replace(/\[S\]/g, " ");
      if (str.indexOf("&mid") > -1) {
        str = str.replace(/\&mid\d*\&/g, "");
      }
      var font = gene.curfont,
        swfac = font.swfac,
        h = font.size,
        w = 0,
        i,
        j,
        c,
        n = str.length;
      for (i = 0; i < n; i++) {
        c = str[i];
        switch (c) {
          case "$":
            c = str[i + 1];
            if (c == "0") {
              font = gene.deffont;
            } else if (c >= "1" && c <= "9") {
              font = get_font("u" + c);
            } else {
              c = "$";
              break;
            }
            i++;
            swfac = font.swfac;
            if (font.size > h) h = font.size;
            continue;
          case "&":
            j = str.indexOf(";", i);
            if (j > 0 && j - i < 10) {
              i = j;
              c = "a";
            }
            break;
        }
        // 中文是英文字体的2倍宽度，create by lhj
        if (!isChinese(str.charCodeAt(i))) {
          // 中文
          w += cwid(c) * swfac;
        }
        w += cwid(c) * swfac;
      }
      gene.curfont = font;
      return [w, h];
    }
    function set_font(xxx) {
      if (typeof xxx == "string") xxx = get_font(xxx);
      gene.curfont = gene.deffont = xxx;
    }
    function out_str(str) {
      var n_font,
        o_font = gene.curfont,
        c_font = o_font;
      output += str.replace(/<|>|&.*?;|&|  |\$./g, function (c) {
        switch (c[0]) {
          case "<":
            return "&lt;";
          case ">":
            return "&gt;";
          case "&":
            if (c == "&") return "&amp;";
            return c;
          case " ":
            return "  ";
          case "$":
            if (c[1] == "0") {
              n_font = gene.deffont;
              use_font(n_font);
            } else if (c[1] >= "1" && c[1] <= "9")
              n_font = get_font("u" + c[1]);
            else return c;
            c = "";
            if (n_font == c_font) return c;
            if (c_font != o_font) c = "</tspan>";
            c_font = n_font;
            if (c_font == o_font) return c;
            return c + '<tspan\n\tclass="' + font_class(n_font) + '">';
        }
      });
      if (c_font != o_font) {
        output += "</tspan>";
        gene.curfont = c_font;
      }
    }
    function xy_str(x, y, str, action, line_w, color, ly, s) {
      //这里约定以url(http:开头的文本内容为超链接
      var url = "";
      var url_str = "";
      var style = 'style="';
      var click_str = "";
      var dblclick_str = "";
      var reg = /^url\((http\:\/\/.[^\(]*)\)/;
      var matchs = str.match(reg);
      if (matchs != null && matchs.length > 0) {
        url = matchs[1];
        str = str.replace(matchs[0], "");
        style +=
          "pointer-events: auto;text-decoration: underline;cursor:pointer;";
        click_str = "onclick=\"window.open('" + url + "')\"";
      }

      var h = strwh(str)[1];
      y += h * 0.2;
      var type = line_w;
      //两个以上的汉字共用一个音符，则要加下划线(注释排除掉)
      if (
        action != "zs" &&
        action != "repeatbar" &&
        /[\u4e00-\u9fa5]+/.test(str) &&
        checksum(
          str
            .replace(/\(.[^\(]*\)/g, "")
            .replace(/（.[^（]*）/g, "")
            .replace(/a-zA-Z/g, "")
            .replace(
              /，|\,|[1-9]|\.|\（|\）|\(|\)|、|。|！|“|”|‘|’|'|；|？|：/g,
              ""
            )
        ) > 2 &&
        action == "lyric" &&
        musicType != 0
      ) {
        if (style.indexOf("text-decoration") < 0) {
          style += ";";
          //            		style += 'text-decoration: underline;';
        }
      }
      if (line_w && line_w.indexOf("vname") == 0) {
        dblclick_str = ' ondblclick="editorVname(this)" ';
      }
      if ("lyric" == action) {
        if (s.my_ly_color) {
          style += "color: " + s.my_ly_color + ";";
        }
        //如果是歌词，且标记有！！包围，则加下划线  样例：!中.国/人/!
        if (/!.*!/.test(str)) {
          var node = /!.*!/.exec(str);

          var preStr = "";
          var endStr = "";
          if (node.index != 0) {
            preStr = str.substring(0, node.index);
          }
          endStr = str.substring(node.index + node[0].length);
          str = node[0];
          str = str.replace(/\!/g, "");

          style += '"';
          //            		style += 'text-decoration: underline;"';
          var idx = str.indexOf("/");
          var tmp_str = str;
          var substr = "";

          var tw = 0;
          //如果有&说明要加长 ,应付两个歌词下划线要连在一起add by hxs 20201128
          if (str.indexOf("&") > -1) {
            tw = 5;
          }
          output +=
            '<text type="' +
            type +
            '" ' +
            click_str +
            ' class="lyric ' +
            font_class(gene.curfont) +
            '" ' +
            style +
            click_str +
            ' x="';
          //out_sxsy(x+3+tw, '" y="', y);
          //created by lhj 20211014
          out_sxsy(x + 3, '" y="', y);
          if (color) {
            output += '" color="' + color;
          }
          output += '">';
          var preH = 0;
          if (preStr != "") {
            output += "<tspan>" + preStr + "</tspan>\n";
            preH = abc.setStrwh(preStr)[0];
          }
          var lineFlag = false;
          var offsety = 0;

          var addWidthValue = 0;
          //如果有&说明要加长 ,应付两个歌词下划线要连在一起add by hxs 20201128
          if (str.indexOf("&") > -1) {
            var len = str.match(/&/g).length;
            str = str.replace(/\&/g, "");
            addWidthValue = 10 * len;
          }
          var lycArray = str.match(/.\/*/g);
          var lineArr = [],
            maxNum = 0,
            h0 = 0;

          // console.log('lycArray---', lycArray)
          //问题：歌词下划线的横坐标总体靠左； x坐标向后4个像素 add by lhj 20211013
          x += 4;

          var txt, lineNum;
          // 收集 额外添加的下划线的位置数据，以及累计默认的下划线的总长
          if (lycArray && lycArray.length > 0) {
            for (var i = 0, j, n, jlen, len = lycArray.length; i < len; i++) {
              // 对应字符下划线的数量
              lineNum = lycArray[i].match(/\/+/g);
              //	console.log('lineNum-----', lineNum);
              // 单个字符
              txt = lycArray[i].replace(/\/+/g, "");
              //                    	var h = abc.setStrwh(txt)[0];//宽度加了8 否则有的下划线显示不全 add by hxs 20201128
              //                   // console.log('txt---', txt, h)

              //                    	// 小写字母加宽
              //                    	if(/[a-z]/g.test(lycArray[i][0])){
              //                    		h += 1;
              //                    	}
              if (lineNum) {
                for (j = 0, jlen = lineNum[0].length; j < jlen; j++) {
                  //                    			lineArr.push({
                  //                    				x1: x + h * i - 2,
                  //                    				x2: x + h * (i + 1) + 1,
                  //                    				y1: y - 3 * (j + 1) - 3,
                  //                    				y2: y - 3 * (j + 1) - 3
                  //                    			});
                  //                    			console.log('x :', (x))
                  //                    			console.log('x + h * i---', x, h, i,(x + h * i))

                  h = 0; // 如：歌词：1.中国，数字、符号、中文等，字宽不一。add by lhj 20211014
                  for (n = 0; n < i; n++) {
                    // 逐个累加宽度
                    if (!lycArray[n]) {
                      continue;
                    }
                    h += abc.setStrwh(lycArray[n][0])[0];

                    //小写字母加宽
                    if (/[a-z]/g.test(lycArray[n][0])) {
                      h += 1.2;
                    }
                  }
                  lineArr.push({
                    x1: x + h + preH,
                    x2: x + h + preH + (abc.setStrwh(lycArray[i][0])[0] + 1),
                    y1: y - 3 * (j + 1) - 3,
                    y2: y - 3 * (j + 1) - 3,
                  });
                }
                if (maxNum < lineNum[0].length) {
                  maxNum = lineNum[0].length;
                }
              }
              output += "<tspan>" + txt + "</tspan>\n";
              //h0 +=  h;
              h0 += abc.setStrwh(lycArray[i][0])[0]; // 按每个具体的歌词的宽度计算。add by lhj 20211014

              // 小写字母加宽
              if (/[a-z]/g.test(lycArray[i][0])) {
                h0 += 1.2;
              }
            }
          }
          if (endStr != "") {
            output += "<tspan>" + endStr + "</tspan>\n";
          }
          output += "</text>\n";
          // 默认显示的下划线
          //console.log('x---', x);
          //  output += '<line x1="' + sx(x - 2 )+ '" y1="' + sy(y - 3) +'" x2="' + sx(x + h0 + 1 + addWidthValue)+ '" y2="' + sy(y - 3) +'" class="splnum stroke" stroke-width="1" fill="black"></line>';
          output +=
            '<line x1="' +
            sx(x + preH) +
            '" y1="' +
            sy(y - 3) +
            '" x2="' +
            sx(x + preH + h0 + 1 + addWidthValue) +
            '" y2="' +
            sy(y - 3) +
            '" class="splnum stroke" stroke-width="1" fill="black"></line>';
          // console.log('lineArr---', lineArr);

          // 额外添加的下划线
          for (var i = 0, len = lineArr.length; i < len; i++) {
            var x1 = lineArr[i].x1;
            var x2 = lineArr[i].x2 + addWidthValue;
            var y1 = lineArr[i].y1;
            var y2 = lineArr[i].y2;
            //console.log('sx(x1)--', sx(x1));
            //console.log('x1---', x1);
            // 对应字符的下划线
            output +=
              '<line x1="' +
              sx(x1) +
              '" y1="' +
              sy(y1) +
              '" x2="' +
              sx(x2) +
              '" y2="' +
              sy(y2) +
              '" class="splnum stroke" stroke-width="1" fill="black"></line>';
          }
          return;
          //vskip( maxNum*2);
        }
      }
      if (line_w == "title") {
        if (!user.editorPage) {
          //判断标题的长度，如果小于7个字，则在每个字中间加空格
          var title = str;
          if (title && isChinese2txt(title.replace(/\s/g, ""))) {
            var title = title.replace(/\s/g, "");
            var len = title.length;
            if (len <= 7) {
              var newStr = "";
              for (var i = 0; i < len; i++) {
                newStr += title[i] + " ";
              }
              str = newStr;
              //$("svg text[type='title']").html(newStr)
            }
          }
        }

        style += "pointer-events: auto;padding-bottom:10px;";
        if (!color) {
          style +=
            "font-family: KaiTi, cursive, fangsong, monospace, serif; font-weight: normal;";
          // style += "fill:url(#g34);";
        }
        if (T_url != "") {
          style += "text-decoration: underline;cursor:pointer;";
          click_str = "onclick=\"window.open('" + T_url + "')\"";
        }
      }
      if (line_w == "composer") {
        style += "pointer-events: auto;";
        if (C_url != "") {
          style += "text-decoration: underline;cursor:pointer;";
          click_str = "onclick=\"window.open('" + C_url + "')\"";
          C_url = "";
        }
      }

      if (type == "zs" && str.indexOf("[font-size") > -1) {
        //注释设置字体大小
        var fontsizeset = /\[(font-size:.*)\]/.exec(str);
        if (fontsizeset != null) {
          style += /\[(font-size:.*)\]/.exec(str)[1];
          str = str.replace(/\[(font-size:.*)\]/, "");
        }
      }
      if (type == "zs" && /midi\d{1,4}.*/.test(str)) {
        str = str.replace(/midi\d{1,4}/, "");
      }
      if (type == "barnum" && cfmt.measurebox) {
        style += "font-style:normal;";
      }

      style += '"';

      // fng:1表示指法标记 add by hxs
      var fngIstartStr = "";
      if (str.indexOf("fng:") > -1) {
        str = str.replace("fng:", "");
        output +=
          '<text type="' +
          type +
          '" ' +
          click_str +
          ' class="fng" ' +
          style +
          click_str +
          ' x="';
        if (s && s.istart) {
          //output += ' istart="'+s.istart+'" '

          fngIstartStr = '" istart="' + s.istart + '" gch_istart="';
          if (s.a_gch) {
            for (var i = 0; i < s.a_gch.length; i++) {
              var sgch = s.a_gch[i];
              if (sgch.text.indexOf("fng:") > -1) {
                fngIstartStr +=
                  sgch.istart +
                  '" gch_iend="' +
                  sgch.iend +
                  '"' +
                  " onmousemove='moveSvgText(event)' onmousedown='mousedownSvgText(event)' onmouseup='mouseupSvgText(event)' onmouseout=\"mouseoutSvgText(event)";
              }
            }
          }
        }
        x += 5;
        y -= 3;
      } else if (str == "circle") {
        //声部名称显示图形,圆
        output +=
          '<circle r="8" stroke="#0E518F" stroke-width="1" fill="#0E518F" style="fill-opacity:0.5" cx="';
        out_sxsy(x, '" cy="', y + 6);
        output += '"></circle>';
        return;
      } else if (str == "square") {
        //声部名称显示图形，正方形
        output +=
          '<rect width="16" height="16" stroke="green" stroke-width="1" fill="green" style="fill-opacity:0.5" x="';
        out_sxsy(x - 8, '" y="', y + 8 + 6);
        output += '"></rect>';
        return;
      } else if (str == "triangle") {
        //声部名称显示图形，三角形
        var ori_x = sx(x);
        var ori_y = sy(y) - 12;
        output +=
          '<polygon points="' +
          ori_x +
          "," +
          ori_y +
          " " +
          (ori_x - 8) +
          "," +
          (ori_y + 16) +
          " " +
          (ori_x + 8) +
          "," +
          (ori_y + 16) +
          '" stroke="#ff6c00" stroke-width="1" fill="#ff6c00" style="fill-opacity:0.5"></polygon>';
        return;
      } else if (str == "star") {
        //声部名称显示图形，五角形 0,170 484,170 88,440 240,4 391,439 0,170
        var ori_x = sx(x) - 8;
        var ori_y = sy(y) - 6;
        //output += '<polygon points="' + (ori_x-8)+ ',' +ori_y + ' ' +(ori_x+8)+ ',' +ori_y+ ' ' + (ori_x-5)+ ',' +(ori_y+8) + ' ' + ori_x + ',' +(ori_y-6)+ ' ' +(ori_x+5)+ ',' +(ori_y+8)+ ' ' +(ori_x-8)+ ',' +ori_y+'" stroke="blue" stroke-width="1" fill="blue" style="fill-opacity:0.5"></polygon>';
        output +=
          '<path d="m' +
          ori_x +
          "," +
          ori_y +
          'l7.25741,0l2.24259,-6.91416l2.2426,6.91416l7.2574,0l-5.87135,4.27314l2.24271,6.91416l-5.87136,-4.27325l-5.87136,4.27325l2.24271,-6.91416l-5.87136,-4.27314z" stroke="blue" stroke-width="1" fill="blue" style="fill-opacity:0.5"></path>';
        //            	output += '<polygon points="'  +(ori_x+3)+ ',' +(ori_y)+ ' ' + (ori_x+3+3)+ ',' +(ori_y-6) + ' ' + (ori_x+3+3+3) + ',' +(ori_y)+ ' ' +(ori_x+3+3+3+3)+ ',' +(ori_y)+ ' ' +(ori_x-8)+ ',' +ori_y+'" stroke="blue" stroke-width="1" fill="blue" style="fill-opacity:0.5"></polygon>';
        return;
      } else if (str.indexOf("image:") == 0) {
        //用户自定义图片
        // <image xlink:href="/Content/img/logo.svg" src="/Content/img/logo.png" width="118" height="42" />
        var imgReg = /\.(jpg|png)/;
        if (!imgReg.test(str)) {
          str = str + ".png";
        }
        //用户自定义小节/音符图片
        if ("notePic" == action) {
          var picW = ly.w || 25;
          var picH = ly.h || 25;
          var picMarginTop = 0;
          var picMarginLeft = 0;
          var picX = sx(x);
          if (ly.is_bar_pic == 1) {
            picW = ly.istart + "_w";
            picX = ly.istart + "_x";
          }

          if (musicType == 2) {
            picMarginTop = s.a_ly && s.a_ly.length > 0 ? 15 : 5;
            picMarginLeft = 3;
          }
          if (musicType == 1) {
            picMarginTop = s.a_ly && s.a_ly.length > 0 ? -35 : 0;
          }

          if (typeof ly.ty == "number") {
            picMarginTop = picMarginTop + ly.ty;
          }

          if (str.indexOf("http://") > -1 || str.indexOf("https://") > -1) {
            output +=
              '<image preserveAspectRatio="none" xlink:href="' +
              str.replace("image:", "") +
              '" width="' +
              picW +
              '" align="xMaxYMin" height="' +
              picH +
              '" x="' +
              (picX + picMarginLeft) +
              '" y="' +
              (Number(sy(y)) - picH - picMarginTop) +
              '"></image>';
          } else {
            output +=
              '<image preserveAspectRatio="none" xlink:href="' +
              assets_url +
              str.replace("image:", "") +
              '" width="' +
              picW +
              '" align="xMaxYMin" height="' +
              picH +
              '" x="' +
              (picX + picMarginLeft) +
              '" y="' +
              (Number(sy(y)) - picH - picMarginTop) +
              '"></image>';
          }

          return;
        }
        var txt = "";
        if ("lyric" == action) {
          if (str.indexOf("?") > -1) {
            txt = str.substring(str.indexOf("?") + 1);
            str = str.substr(0, str.indexOf("?"));
          }
        }

        var sizeMatch = str.match(/\&size=(.*)/);
        var size = 1;
        if (sizeMatch != null) {
          str = str.replace(/\&size=.*/, "");
          if (sizeMatch[1] != "") {
            size = sizeMatch[1];
          }
        }
        if (str.indexOf("http://") > -1 || str.indexOf("https://") > -1) {
          output +=
            '<image xlink:href="' +
            str.replace("image:", "") +
            '" style="width:' +
            25 * size +
            'px;" x="' +
            (sx(x) - 12 * size) +
            '" y="' +
            (sy(y) - 15) +
            '"></image>';
        } else {
          output +=
            '<image xlink:href="' +
            assets_url +
            str.replace("image:", "") +
            '" style="width:' +
            25 * size +
            'px;" x="' +
            (sx(x) - 12 * size) +
            '" y="' +
            (sy(y) - 10) +
            '"></image>';
        }

        if (txt != "") {
          output += '<text type="lyric" class="f1" style="" x=';
          out_sxsy(sx(x) + 25 * size, ' y="', y);
          output += '">' + txt + "</text>\n";
        }

        return;
      } else {
        var xmlspace = "";
        if (type == "zs" || str.indexOf("&mid") > -1) {
          xmlspace = ' xml:space="preserve" ';
        }

        var textLenAttr = "";
        if (str.indexOf("&mid") > -1) {
          //这个是处理中间有&mid&的歌词，表示强弱符号居中
          var midReg = /&mid(\d*)&/;
          var midMatch = str.match(midReg);
          var spaceNum = 1;
          if (midMatch != null) {
            if (midMatch[1] != "") {
              spaceNum = parseInt(midMatch[1]);
            }
          }
          var spaceStr = "";
          for (var i = 0; i < spaceNum; i++) {
            spaceStr += " ";
          }
          str = str.replaceAll(midReg, spaceStr);
          str = str + "  ";
          var textLen = s.next.x - s.x;
          textLenAttr = ' textLength="' + textLen + '" lengthAdjust="spacing" ';
        }
        var istartStr = "";
        if (s && s.istart) {
          istartStr = ' istart="' + s.istart + '" ';
        }
        if (s && s.hasOwnProperty("currLyricIndex")) {
          var ly = s.a_ly[s.currLyricIndex];
          istartStr +=
            ' lyric_istart="' + ly.istart + '" lyric_iend="' + ly.iend + '" ';
        }
        var isGuiterGch = 0;
        if (s && s.a_dd && cfmt.diag) {
          //看是不是吉他谱的，如果是，字体样式要变为正常的
          var a_dd = getA_dd(s, str);
          if (a_dd.length > 0) {
            isGuiterGch = 1;
          }
        }
        var clsName = font_class(gene.curfont);
        if (type == "barnum" && cfmt.measurebox) {
          clsName += " box";
        }
        if (isGuiterGch == 1) {
          clsName = "f2";
        }
        var eventStr = "";
        var gchIstartInfo = "";
        if (type == "zs") {
          var dblClickEvent = "";
          if (s && s.istart) {
            dblClickEvent = " ondblclick='editorAnnot(" + s.istart + ")' ";
          }
          eventStr =
            dblClickEvent +
            " onmousemove='moveSvgText(event)' onmousedown='mousedownSvgText(event)' onmouseup='mouseupSvgText(event)' onmouseout='mouseoutSvgText(event)'";

          if (s && s.hasOwnProperty("currGchIndex")) {
            var cgch = s.a_gch[s.currGchIndex];
            gchIstartInfo +=
              ' gch_istart="' + cgch.istart + '" gch_iend="' + cgch.iend + '" ';
          }
          //如果没有中文，则默认用美术字体
          if (!isChinese2txt(str)) {
            //clsName = "f4";
            if (fngIstartStr == "") {
              style = style.replace(
                'style="',
                'style="font-family:AarvarkCafe;font-size:14px;'
              );
            }
          }
        }
        if (dblclick_str != "") {
          eventStr += dblclick_str;
        }
        output +=
          '<text type="' +
          type +
          '" ' +
          eventStr +
          gchIstartInfo +
          istartStr +
          xmlspace +
          click_str +
          textLenAttr +
          ' class="' +
          clsName +
          '" ' +
          style +
          ' x="';
      }
      var lyricXOffset = 0;
      //        	if("lyric" == action){
      //        		if(str.indexOf("fmt:")==0){
      //        			//lyricXOffset = 15;//因为在歌词宽度计算那里已经处理了，这里不需要再处理
      //        		}
      //        	}
      var yOffset = 0;
      if ("p" == action && musicType == 2) {
        yOffset += 5;
      }
      var oriTextX = sx(x + lyricXOffset);
      out_sxsy(x + lyricXOffset, '" y="', y + yOffset);
      if (fngIstartStr != "") {
        output += fngIstartStr;
      }
      if (color) {
        output += '" color="' + color;
      }
      if (action == "repeatbar") {
        output +=
          '" istart="' + s.istart + '" onclick="editorRepeatBarText(event)';
      }
      switch (action) {
        case "c":
          output += '" text-anchor="middle">';
          break;
        case "j":
          output += '" textLength="' + line_w.toFixed(2) + '">';
          break;
        case "r":
          output += '" text-anchor="end">';
          break;
        case "measure":
          output += '" type="measure">';
          break;
        default:
          output += '">';
          break;
      }
      if (s && s.chordLys) {
        //如果有多个上标或下标
        var yOffset = 0;
        var xOffset = 0;
        for (var i = 0; i < s.chordLys.length; i++) {
          var lyObj = s.chordLys[i];
          var str = lyObj.word;
          output +=
            '<tspan style="font-size:16px;" dx="' +
            xOffset +
            '" dy="' +
            yOffset +
            '">' +
            str +
            "</tspan>\n";
          var downWidth = 0;
          if (lyObj.downStr) {
            output +=
              '<tspan style="font-size:10px;" dx="' +
              -7 +
              '" dy="' +
              1 +
              '">' +
              lyObj.downStr +
              "</tspan>\n";
            if (str.length == 1 && isLuoMa(str)) {
              downWidth = lyObj.downStr.length * 5.5;
            } else if (str.length == 1) {
              downWidth = lyObj.downStr.length * 5;
            } else {
              downWidth = lyObj.downStr.length * 5.5;
            }
            //downWidth = lyObj.downStr.length*4;
          }
          if (lyObj.upStr) {
            output +=
              '<tspan style="font-size:10px;" dx="' +
              (-7 - downWidth) +
              '" dy="' +
              -8 +
              '">' +
              lyObj.upStr +
              "</tspan>\n";
          }
          yOffset += 7;
          xOffset = -12 + downWidth;
        }
      } else if (s && (s.upStr || s.downStr)) {
        //如果有上标或下标
        output += '<tspan style="font-size:16px;" >' + str + "</tspan>\n";
        var downWidth = 0;
        var sufWidth = -7;
        if (s.downStr) {
          output +=
            '<tspan style="font-size:10px;" dx="' +
            -7 +
            '" dy="1">' +
            s.downStr +
            "</tspan>\n";
          if (str.length == 1 && isLuoMa(str)) {
            downWidth = s.downStr.length * 5.5;
          } else if (str.length == 1) {
            downWidth = s.downStr.length * 5;
          } else {
            downWidth = s.downStr.length * 5.5;
          }
          sufWidth = -11 + s.downStr.length * 4;
        }
        if (s.upStr) {
          output +=
            '<tspan style="font-size:10px;" dx="' +
            (-7 - downWidth) +
            '" dy="-8">' +
            s.upStr +
            "</tspan>\n";
          if (s.upStr.length > s.downStr) {
            sufWidth = -11 + s.upStr.length;
          }
        }
        if (s.sufStr) {
          output +=
            '<tspan style="font-size:16px;" dx="' +
            sufWidth +
            '" dy="' +
            8 +
            '">' +
            s.sufStr +
            "</tspan>\n";
        }
      } else if (isLuoMa(str) && action == "lyric") {
        var normalStrWidth = getTextWidth("1", "16px monospace") * scale; //一个普通字符的宽度
        var topStrWidth = getTextWidth("1", "10px monospace") * scale; //一个字符的宽度

        //和弦表示特殊处理 add by hxs
        //            	<tspan>Ⅰ</tspan>
        //            	<tspan style="font-size:20px;" dx="-18 -13" dy="0 25">6</tspan>
        var offsetx = 0;
        var offsetx2 = 0;
        var isFmt = false;
        if (clientType == "ios") {
          offsetx = 5;
          offsetx2 = -5;
        } else if (clientType == "android") {
          offsetx = 2;
          offsetx2 = -1.5;
        } else {
          if (str.indexOf("Ⅰ") == 0) {
          }
          if (str.indexOf("Ⅱ") == 0) {
          }
          if (str.indexOf("Ⅲ") == 0) {
          }
          if (str.indexOf("Ⅳ") == 0) {
          }
          if (str.indexOf("Ⅴ") == 0) {
          }
          if (str.indexOf("Ⅵ") == 0) {
          }
          if (str.indexOf("Ⅶ") == 0) {
          }
        }
        if (str.indexOf("fmt:") == 0) {
          isFmt = true;
          str = str.replace("fmt:", "");
        }

        //            	if(isChinese2txt(str)){//如果有中文，直接返回,中文也要处理，所以注释掉
        //            		output += '<tspan style="font-size:14px;">' + str + '</tspan>\n';
        //            	}else{
        var splitIndex = 1;
        if (isFmt && str.indexOf("/") > -1) {
          splitIndex = str.indexOf("/");
          str = str.replace(/[\/]/, "");
        }
        if (isShuziChordLyric(str)) {
          //数字和弦
          var reg = /\((.*)\)/;
          var matchs = str.match(reg);
          if (matchs != null) {
            var markDown = matchs[0];
            var markText = matchs[1];
            var idx = str.indexOf(markDown);
            var preStr = str.substring(0, idx);
            var sufStr = str.substring(idx + markDown.length);
            output +=
              '<tspan style="font-size:16px;" dx="8">' + preStr + "</tspan>\n";
            output +=
              '<tspan style="font-size:10px;" dx="' +
              (-6 + offsetx) +
              '" dy="2">' +
              markText +
              "</tspan>\n";
            output +=
              '<tspan style="font-size:16px;" dx="-4" dy="-2">' +
              sufStr +
              "</tspan>\n";
          } else {
            output += '<tspan style="font-size:16px;">' + str + "</tspan>\n";
          }
        } else {
          var preStr = str.substr(0, splitIndex);
          if (preStr.indexOf("(o)") > -1) {
            output +=
              '<tspan style="font-size:16px;">' +
              str.substr(0, splitIndex).replace("(o)", "") +
              "</tspan>\n";
            output += '<tspan style="font-size:10px;" dx="-8">o</tspan>\n';
          } else {
            output +=
              '<tspan style="font-size:16px;">' +
              str.substr(0, splitIndex) +
              "</tspan>\n";
          }
          //ⅰ,ⅱ,ⅲ,ⅳ,ⅴ,ⅵ,ⅶ,ⅷ
          if (
            str.indexOf("Ⅲ") == 0 ||
            str.indexOf("Ⅶ") == 0 ||
            str.indexOf("Ⅵ") == 0 ||
            str.indexOf("ⅲ") == 0 ||
            str.indexOf("ⅵ") == 0 ||
            str.indexOf("ⅶ") == 0 ||
            str.indexOf("K") == 0
          ) {
            if (str.indexOf("+") > -1) {
              //+号特殊处理
              output +=
                '<tspan style="font-size:10px;" dx="' +
                (-6 + offsetx) +
                '" dy="-8">' +
                str.substr(splitIndex + 1) +
                "</tspan>\n";
            } else {
              //                    			output += '<tspan style="font-size:10px;" dx="'+(-7 + offsetx)+' '+ (-4.5+offsetx+offsetx2)+'" dy="1 -8">' + str.substr(splitIndex).replace(/\^/," ") + '</tspan>\n';
              var preWidth = getTextWidth(preStr, "16px monospace");
              output +=
                '<tspan style="font-size:10px;" x="' +
                (oriTextX + preWidth) +
                '">' +
                str.substring(splitIndex, splitIndex + 1).replace(/\^/, " ") +
                "</tspan>\n";
              output +=
                '<tspan style="font-size:10px;" x="' +
                (oriTextX + preWidth) +
                '" dy="-8">' +
                str.substring(splitIndex + 1).replace(/\^/, " ") +
                "</tspan>\n";
            }
          } else {
            if (str.indexOf("+") > -1) {
              //+号特殊处理
              output +=
                '<tspan style="font-size:10px;" dx="' +
                (-6 + offsetx) +
                '" dy="-8">' +
                str.substr(splitIndex + 1) +
                "</tspan>\n";
            } else {
              var sufStr = str.substr(splitIndex).replace(/\^/, " ");
              var qReg = /\(([^\)]*)\)/;
              if (qReg.test(sufStr)) {
                //如果有括号，则第一个括号内的字符串放在下标，其他字符串放上标
                var node = qReg.exec(sufStr);
                var downText = node[1];
                var upText = sufStr.replace(node[0], "");
                var otherTextYOffset = 0;
                var otherText = "";
                if (qReg.test(upText)) {
                  otherText = upText;
                  var up = qReg.exec(upText);
                  upText = up[1];
                  otherText = otherText.replace(up[0], "");
                  if (upText == "") {
                    otherTextYOffset = -8;
                  }
                }

                output +=
                  '<tspan style="font-size:10px;" dx="' +
                  (-7 + offsetx) +
                  '" dy="1">' +
                  downText +
                  "</tspan>\n";
                output +=
                  '<tspan style="font-size:10px;" dx="' +
                  (-7 + offsetx - downText.length * 4) +
                  '" dy="-8">' +
                  upText +
                  "</tspan>\n";
                if (otherText != "") {
                  output +=
                    '<tspan style="font-size:16px;" dx="-7" dy="' +
                    (8 + otherTextYOffset) +
                    '">' +
                    otherText +
                    "</tspan>\n";
                }
              } else {
                //output += '<tspan style="font-size:10px;" dx="'+(-7 + offsetx)+' '+ (-5+offsetx+offsetx2)+'" dy="1 -8">' + str.substr(splitIndex).replace(/\^/," ") + '</tspan>\n';
                var preWidth = getTextWidth(preStr, "16px monospace");
                output +=
                  '<tspan style="font-size:10px;" x="' +
                  (oriTextX + preWidth) +
                  '">' +
                  str.substring(splitIndex, splitIndex + 1).replace(/\^/, " ") +
                  "</tspan>\n";
                output +=
                  '<tspan style="font-size:10px;" x="' +
                  (oriTextX + preWidth) +
                  '" dy="-8">' +
                  str.substring(splitIndex + 1).replace(/\^/, " ") +
                  "</tspan>\n";
              }
            }
          }
        }

        //            	}
      } else {
        out_str(str);
      }
      output += "</text>\n";
    }

    // 添加符号的矩形块。用于谱音同步时，高亮显示。（蒙版）
    function xy_str_b(x, y, str) {
      var wh = strwh(str);
      output += '<rect class="stroke" x="';
      out_sxsy(x - 2, '" y="', y + wh[1] + 1);
      output +=
        '" width="' +
        (wh[0] + 4).toFixed(2) +
        '" height="' +
        (wh[1] + 3).toFixed(2) +
        '"/>\n';
      xy_str(x, y, str);
    }
    function trim_title(title, is_subtitle) {
      var i;
      if (cfmt.titletrim) {
        i = title.lastIndexOf(", ");
        if (i < 0 || title[i + 2] < "A" || title[i + 2] > "Z") {
          i = 0;
        } else if (cfmt.titletrim == true) {
          if (i < title.length - 7 || title.indexOf(" ", i + 3) >= 0) i = 0;
        } else {
          if (i < title.length - cfmt.titletrim - 2) i = 0;
        }
      }
      if (!is_subtitle && cfmt.writefields.indexOf("X") >= 0)
        title = info.X + ".  " + title;
      if (i) title = title.slice(i + 2).trim() + " " + title.slice(0, i);
      if (cfmt.titlecaps) return title.toUpperCase();
      return title;
    }
    function get_lwidth() {
      return (img.width - img.lm - img.rm - 2) / cfmt.scale;
    }
    //标题
    function write_title(title, is_subtitle) {
      var font, h;
      if (!title) return;
      if (cfmt.hiddentitle) {
        return;
      }
      set_page();
      title = trim_title(title, is_subtitle);
      if (is_subtitle) {
        set_font("subtitle");
        h = cfmt.subtitlespace;
      } else {
        set_font("title");
        h = cfmt.titlespace;
      }
      vskip(strwh(title)[1] + h);
      var title_type = "title";
      if (is_subtitle) {
        title_type = "subtitle";
      }
      if (cfmt.titleleft) {
        //xy_str(0, 0, title);
        //增加了颜色参数
        xy_str(0, 0, title, "", title_type, cfmt.titlecolor);
      } else {
        // 就为了给副标题下降10px左右的距离
        if (title_type == "subtitle") {
          xy_str(get_lwidth() / 2, -10, title, "c", title_type, cfmt.titlecolor);
        } else {
          xy_str(get_lwidth() / 2, 0, title, "c", title_type, cfmt.titlecolor);
        }
        //增加了颜色参数
      }
    }
    function put_inf2r(x, y, str1, str2, action, type) {
      if (!str1) {
        if (!str2) return;
        str1 = str2;
        str2 = null;
      }
      if (!str2) xy_str(x, y, str1, action, type);
      else xy_str(x, y, str1 + " (" + str2 + ")", action, type);
    }
    function str_skip(str) {
      vskip(strwh(str)[1] * cfmt.lineskipfac);
    }
    function write_text(text, action) {
      if (action == "s") return;
      set_font("text");
      set_page();
      var wh,
        font,
        strlw = get_lwidth(),
        sz = gene.curfont.size,
        lineskip = sz * cfmt.lineskipfac,
        parskip = sz * cfmt.parskipfac,
        i,
        j,
        x,
        words,
        w,
        k,
        ww,
        str;
      switch (action) {
        default:
          switch (action) {
            case "c":
              x = strlw / 2;
              break;
            case "r":
              x = strlw;
              break;
            default:
              x = 0;
              break;
          }
          j = 0;
          font = gene.curfont;
          while (1) {
            i = text.indexOf("\n", j);
            if (i < 0) {
              str = text.slice(j);
              wh = strwh(str);
              gene.curfont = font;
              vskip(wh[1] * cfmt.lineskipfac);
              xy_str(x, 0, str, action, null, wh);
              font = gene.curfont;
              break;
            }
            if (i == j) {
              vskip(parskip);
              blk_flush();
              use_font(gene.curfont);
              while (text[i + 1] == "\n") {
                vskip(lineskip);
                i++;
              }
              if (i == text.length) break;
            } else {
              str = text.slice(j, i);
              wh = strwh(str);
              gene.curfont = font;
              vskip(wh[1] * cfmt.lineskipfac);
              xy_str(x, 0, str, action, null, wh);
              font = gene.curfont;
            }
            j = i + 1;
          }
          vskip(parskip);
          blk_flush();
          break;
        case "f":
        case "j":
          j = 0;
          while (1) {
            i = text.indexOf("\n\n", j);
            if (i < 0) words = text.slice(j);
            else words = text.slice(j, i);
            words = words.split(/\s+/);
            w = k = 0;
            font = gene.curfont;
            for (j = 0; j < words.length; j++) {
              ww = strwh(words[j])[0];
              w += ww;
              if (w >= strlw) {
                str = words.slice(k, j).join(" ");
                gene.curfont = font;
                wh = strwh(str);
                gene.curfont = font;
                vskip(wh[1] * cfmt.lineskipfac);
                xy_str(0, 0, str, action, strlw, wh);
                font = gene.curfont;
                k = j;
                w = ww;
              }
              w += cwidf(" ");
            }
            if (w != 0) {
              str = words.slice(k).join(" ");
              gene.curfont = font;
              wh = strwh(str);
              gene.curfont = font;
              vskip(wh[1] * cfmt.lineskipfac);
              xy_str(0, 0, str, null, null, wh);
            }
            vskip(parskip);
            blk_flush();
            if (i < 0) break;
            while (text[i + 2] == "\n") {
              vskip(lineskip);
              i++;
            }
            if (i == text.length) break;
            use_font(gene.curfont);
            j = i + 2;
          }
          break;
      }
    }
    function put_words(words) {
      var p, i, j, n, nw, i2, i_end, have_text;
      function put_wline(p, x, right) {
        var i = 0,
          j,
          k;
        if (p[i] == "$" && p[i + 1] >= "0" && p[i + 1] <= "9") i += 2;
        k = 0;
        j = i;
        if ((p[i] >= "0" && p[i] <= "9") || p[i + 1] == ".") {
          while (i < p.length) {
            i++;
            if (p[i] == " " || p[i - 1] == ":" || p[i - 1] == ".") break;
          }
          k = i;
          while (p[i] == " ") i++;
        }
        if (k != 0) xy_str(x, 0, p.slice(j, k), "r");
        if (i < p.length) xy_str(x + 5, 0, p.slice(i), "l");
        return i >= p.length && k == 0;
      }
      blk_out();
      set_font("words");
      var middle = get_lwidth() / 2,
        max2col = (middle - 45) / (cwid("a") * gene.curfont.swfac);
      n = 0;
      words = words.split("\n");
      nw = words.length;
      for (i = 0; i < nw; i++) {
        p = words[i];
        if (p.length > max2col) {
          n = 0;
          break;
        }
        if (!p) {
          if (have_text) {
            n++;
            have_text = false;
          }
        } else {
          have_text = true;
        }
      }
      if (n > 0) {
        i = n = ((n + 1) / 2) | 0;
        have_text = false;
        for (i_end = 0; i_end < nw; i_end++) {
          p = words[i_end];
          j = 0;
          while (p[j] == " ") j++;
          if (j == p.length) {
            if (have_text && --i <= 0) break;
            have_text = false;
          } else {
            have_text = true;
          }
        }
        i2 = i_end + 1;
      } else {
        i2 = i_end = nw;
      }
      vskip(cfmt.wordsspace);
      for (i = 0; i < i_end || i2 < nw; i++) {
        if (i < i_end && words[i].length == 0) {
          blk_out();
          use_font(gene.curfont);
        }
        vskip(cfmt.lineskipfac * gene.curfont.size);
        if (i < i_end) put_wline(words[i], 45, 0);
        if (i2 < nw) {
          if (put_wline(words[i2], 20 + middle, 1)) {
            if (--n == 0) {
              if (i < i_end) {
                n++;
              } else if (i2 < words.length - 1) {
                middle *= 0.6;
              }
            }
          }
          i2++;
        }
      }
    }
    function put_history() {
      var i,
        j,
        c,
        str,
        font,
        h,
        w,
        head,
        names = cfmt.infoname.split("\n"),
        n = names.length;
      for (i = 0; i < n; i++) {
        c = names[i][0];
        if (cfmt.writefields.indexOf(c) < 0) continue;
        str = info[c];
        if (!str) continue;
        if (!font) {
          font = true;
          set_font("history");
          vskip(cfmt.textspace);
          h = gene.curfont.size * cfmt.lineskipfac;
        }
        head = names[i].slice(2);
        if (head[0] == '"') head = head.slice(1, -1);
        vskip(h);
        xy_str(0, 0, head);
        w = strwh(head)[0];
        str = str.split("\n");
        xy_str(w, 0, str[0]);
        for (j = 1; j < str.length; j++) {
          vskip(h);
          xy_str(w, 0, str[j]);
        }
        vskip(h * 0.3);
        blk_out();
        use_font(gene.curfont);
      }
    }
    var info_font_init = {
      A: "info",
      C: "composer",
      O: "composer",
      P: "parts",
      Q: "tempo",
      R: "info",
      T: "title",
      X: "title",
    };
    function write_headform(lwidth) {
      var c,
        font,
        font_name,
        align,
        x,
        y,
        sz,
        info_val = {},
        info_font = clone(info_font_init),
        info_sz = {
          A: cfmt.infospace,
          C: cfmt.composerspace,
          O: cfmt.composerspace,
          R: cfmt.infospace,
        },
        info_nb = {};
      var fmt = "",
        p = cfmt.titleformat,
        j = 0,
        i = 0;
      while (1) {
        while (p[i] == " ") i++;
        if (i >= p.length) break;
        c = p[i++];
        if (c < "A" || c > "Z") {
          if (c == "+") {
            if (fmt.length == 0 || fmt.slice(-1) == "+") continue;
            fmt = fmt.slice(0, -1) + "+";
          } else if (c == ",") {
            if (fmt.slice(-1) == "+") fmt = fmt.slice(0, -1) + "l";
            fmt += "\n";
          }
          continue;
        }
        if (!info_val[c]) {
          if (!info[c]) continue;
          info_val[c] = info[c].split("\n");
          info_nb[c] = 1;
        } else {
          info_nb[c]++;
        }
        fmt += c;
        switch (p[i]) {
          case "-":
            fmt += "l";
            i++;
            break;
          case "0":
            fmt += "c";
            i++;
            break;
          case "1":
            fmt += "r";
            i++;
            break;
          default:
            fmt += "c";
            break;
        }
      }
      if (fmt.slice(-1) == "+") fmt = fmt.slice(0, -1) + "l";
      fmt += "\n";
      var ya = {
          l: cfmt.titlespace,
          c: cfmt.titlespace,
          r: cfmt.titlespace,
        },
        xa = {
          l: 0,
          c: lwidth * 0.5,
          r: lwidth,
        },
        yb = {},
        str;
      p = fmt;
      i = 0;
      while (1) {
        yb.l = yb.c = yb.r = y = 0;
        j = i;
        while (1) {
          c = p[j++];
          if (c == "\n") break;
          align = p[j++];
          if (align == "+") align = p[j + 1];
          else if (yb[align] != 0) continue;
          str = info_val[c];
          if (!str) continue;
          font_name = info_font[c];
          if (!font_name) font_name = "history";
          font = get_font(font_name);
          sz = font.size * 1.1;
          if (info_sz[c]) sz += info_sz[c];
          if (y < sz) y = sz;
          yb[align] = sz;
        }
        ya.l += y - yb.l;
        ya.c += y - yb.c;
        ya.r += y - yb.r;
        while (1) {
          c = p[i++];
          if (c == "\n") break;
          align = p[i++];
          if (info_val[c].length == 0) continue;
          str = info_val[c].shift();
          if (align == "+") {
            info_nb[c]--;
            c = p[i++];
            align = p[i++];
            if (info_val[c].length > 0) {
              if (str) str += " " + info_val[c].shift();
              else str = " " + info_val[c].shift();
            }
          }
          font_name = info_font[c];
          if (!font_name) font_name = "history";
          font = get_font(font_name);
          sz = font.size * 1.1;
          if (info_sz[c]) sz += info_sz[c];
          set_font(font);
          x = xa[align];
          y = ya[align] + sz;
          if (c == "Q") {
            if (!glovar.tempo.del) {
              if (align != "l") {
                var w = tempo_width(glovar.tempo);
                if (align == "c") w *= 0.5;
                x -= w;
              }
              write_tempo(glovar.tempo, x, -y);
            }
          } else if (str) {
            xy_str(x, -y, str, align);
          }
          if (c == "T") {
            font_name = info_font.T = "subtitle";
            info_sz.T = cfmt.subtitlespace;
          }
          if (info_nb[c] <= 1) {
            if (c == "T") {
              font = get_font(font_name);
              sz = font.size * 1.1;
              if (info_sz[c]) sz += info_sz[c];
              set_font(font);
            }
            while (info_val[c].length > 0) {
              y += sz;
              str = info_val[c].shift();
              xy_str(x, -y, str, align);
            }
          }
          info_nb[c]--;
          ya[align] = y;
        }
        if (ya.c > ya.l) ya.l = ya.c;
        if (ya.r > ya.l) ya.l = ya.r;
        if (i >= fmt.length) break;
        ya.c = ya.r = ya.l;
      }
      vskip(ya.l);
    }
    function write_heading() {
      //        	console.log("write_heading.....")
      // 如果是更新状态，则不渲染头部信息
      //        	if(parseInt(editSvgLineIndex)>0){
      //        		return;
      //        	}
      var i,
        j,
        area,
        composer,
        origin,
        rhythm,
        down1,
        down2,
        lwidth = get_lwidth();
      vskip(cfmt.topspace);
      if (cfmt.titleformat) {
        write_headform(lwidth);
        vskip(cfmt.musicspace);
        return;
      }
      if (info.T && cfmt.writefields.indexOf("T") >= 0) {
        i = 0;
        while (1) {
          j = info.T.indexOf("\n", i);
          if (j < 0) {
            write_title(info.T.substring(i), i != 0);
            break;
          }
          write_title(info.T.slice(i, j), i != 0);
          i = j + 1;
        }
      }
      down1 = down2 = 0;
      if (
        parse.ckey.k_bagpipe &&
        !cfmt.infoline &&
        cfmt.writefields.indexOf("R") >= 0
      )
        rhythm = info.R;
      if (rhythm) {
        set_font("composer");
        xy_str(0, -cfmt.composerspace, rhythm);
        down1 = cfmt.composerspace;
      }
      area = info.A;
      if (cfmt.writefields.indexOf("C") >= 0) composer = info.C;
      if (cfmt.writefields.indexOf("O") >= 0) origin = info.O;
      if (composer || origin || cfmt.infoline) {
        var xcomp, align;
        set_font("composer");
        vskip(cfmt.composerspace);
        if (cfmt.aligncomposer < 0) {
          xcomp = 0;
          align = " ";
        } else if (cfmt.aligncomposer == 0) {
          xcomp = lwidth * 0.5;
          align = "c";
        } else {
          xcomp = lwidth;
          align = "r";
        }
        down2 = down1;
        if (composer || origin) {
          if (cfmt.aligncomposer >= 0 && down1 != down2) vskip(down1 - down2);
          i = 0;
          while (1) {
            vskip(gene.curfont.size + cfmt.composermargin);
            if (composer) j = composer.indexOf("\n", i);
            else j = -1;
            if (j < 0) {
              put_inf2r(
                xcomp,
                0,
                composer ? composer.substring(i) : null,
                origin,
                align,
                "composer"
              );
              break;
            }
            xy_str(xcomp, 0, composer.slice(i, j), align, "composer");
            down1 += gene.curfont.size;
            i = j + 1;
          }
          if (down2 > down1) vskip(down2 - down1);
        }
        rhythm = rhythm ? null : info.R;
        if ((rhythm || area) && cfmt.infoline) {
          set_font("info");
          vskip(gene.curfont.size + cfmt.infospace);
          put_inf2r(lwidth, 0, rhythm, area, "r");
          down1 += gene.curfont.size + cfmt.infospace;
        }
      } else {
        down2 = cfmt.composerspace;
      }
      if (info.P && cfmt.writefields.indexOf("P") >= 0) {
        set_font("parts");
        down1 = cfmt.partsspace + gene.curfont.size - down1;
        if (down1 > 0) down2 += down1;
        if (down2 > 0.01) vskip(down2);
        xy_str(0, 0, info.P, "p");
        down2 = 0;
      }
      vskip(down2 + cfmt.musicspace);
    }
    var output = "",
      style =
        "\
\ntext, tspan{fill:currentColor}\
\n.stroke{stroke:currentColor;fill:none}\
\n.bW{stroke:currentColor;fill:none;stroke-width:1}\
\n.bthW{stroke:currentColor;fill:none;stroke-width:3}\
\n.slW{stroke:currentColor;fill:none;stroke-width:.7}\
\n.slthW{stroke:currentColor;fill:none;stroke-width:1.5}\
\n.bn{font:bold 8px sans-serif}\
\n.sW{stroke:currentColor;fill:none;stroke-width:.7}",
      font_style = "",
      posx = cfmt.leftmargin / cfmt.scale,
      posy = 0,
      img = {
        width: cfmt.pagewidth,
        lm: cfmt.leftmargin,
        rm: cfmt.rightmargin,
      },
      defined_glyph = {},
      defs = "",
      fulldefs = "",
      stv_g = {
        scale: 1,
        dy: 0,
        st: -1,
        v: -1,
        g: 0,
      },
      blkdiv = 1;

    var tgls = {
      "mtr ": {
        x: 0,
        y: 0,
        c: "\u0020",
      },
      brace: {
        x: 0,
        y: 0,
        c: "\ue000",
      },
      hl: {
        x: -4,
        y: 0,
        c: "\ue022",
      },
      hl1: {
        x: -6,
        y: 0,
        c: "\ue023",
      },
      ghl: {
        x: -4,
        y: 0,
        c: "\ue024",
      },
      lphr: {
        x: 0,
        y: 24,
        c: "\ue030",
      },
      mphr: {
        x: 0,
        y: 24,
        c: "\ue038",
      },
      sphr: {
        x: 0,
        y: 27,
        c: "\ue039",
      },
      rdots: {
        x: -1,
        y: 0,
        c: "\ue043",
      },
      dsgn: {
        x: -4,
        y: -4,
        c: "\ue045",
      },
      dcap: {
        x: -4,
        y: -4,
        c: "\ue046",
      },
      sgno: {
        x: -6,
        y: 0,
        c: "\ue047",
      },
      sgno1: {
        x: -6,
        y: 0,
        c: "\ue047" + "1",
      },
      sgno12: {
        x: -6,
        y: 0,
        c: "\ue047" + "1.2",
      },
      sgno123: {
        x: -6,
        y: 0,
        c: "\ue047" + "1.2.3",
      },
      coda: {
        x: -12,
        y: -6,
        c: "\ue048",
      },
      tclef: {
        x: -8,
        y: 0,
        c: "\ue050",
      },
      cclef: {
        x: -8,
        y: 0,
        c: "\ue05c",
      },
      bclef: {
        x: -8,
        y: 0,
        c: "\ue062",
      },
      pclef: {
        x: -6,
        y: 0,
        c: "\ue069",
      },
      spclef: {
        x: -6,
        y: 0,
        c: "\ue069",
      },
      stclef: {
        x: -8,
        y: 0,
        c: "\ue07a",
      },
      scclef: {
        x: -8,
        y: 0,
        c: "\ue07b",
      },
      sbclef: {
        x: -7,
        y: 0,
        c: "\ue07c",
      },
      oct: {
        x: 0,
        y: 2,
        c: "\ue07d",
      },
      mtr0: {
        x: 0,
        y: 0,
        c: "\ue080",
      },
      mtr1: {
        x: 0,
        y: 0,
        c: "\ue081",
      },
      mtr2: {
        x: 0,
        y: 0,
        c: "\ue082",
      },
      mtr3: {
        x: 0,
        y: 0,
        c: "\ue083",
      },
      mtr4: {
        x: 0,
        y: 0,
        c: "\ue084",
      },
      mtr5: {
        x: 0,
        y: 0,
        c: "\ue085",
      },
      mtr6: {
        x: 0,
        y: 0,
        c: "\ue086",
      },
      mtr7: {
        x: 0,
        y: 0,
        c: "\ue087",
      },
      mtr8: {
        x: 0,
        y: 0,
        c: "\ue088",
      },
      mtr9: {
        x: 0,
        y: 0,
        c: "\ue089",
      },
      mtrC: {
        x: 0,
        y: 0,
        c: "\ue08a",
      },
      "mtr+": {
        x: 0,
        y: 0,
        c: "\ue08c",
      },
      "mtr(": {
        x: 0,
        y: 0,
        c: "\ue094",
      },
      "mtr)": {
        x: 0,
        y: 0,
        c: "\ue095",
      },
      meter0: {
        c: "",
      },
      meter1: {
        c: "",
      },
      meter2: {
        c: "",
      },
      meter3: {
        c: "",
      },
      meter4: {
        c: "",
      },
      meter5: {
        c: "",
      },
      meter6: {
        c: "",
      },
      meter7: {
        c: "",
      },
      meter8: {
        c: "",
      },
      meter9: {
        c: "",
      },
      meter10: {
        c: "" + "",
      },
      meter11: {
        c: "" + "",
      },
      meter12: {
        c: "" + "",
      },
      meter13: {
        c: "" + "",
      },
      meter14: {
        c: "" + "",
      },
      meter15: {
        c: "" + "",
      },
      meter16: {
        c: "" + "",
      },
      meter17: {
        c: "" + "",
      },
      meter18: {
        c: "" + "",
      },
      "meter+": {
        c: "",
      },
      "meter(": {
        c: "",
      },
      "meter)": {
        c: "",
      },
      HDD: {
        x: -7,
        y: 0,
        c: "\ue0a0",
      },
      breve: {
        x: -7,
        y: 0,
        c: "\ue0a1",
      },
      HD: {
        x: -5.2,
        y: 0,
        c: "\ue0a2",
      },
      Hd: {
        x: -3.8,
        y: 0,
        c: "\ue0a3",
      },
      hd: {
        x: -3.7,
        y: 0,
        c: "\ue0a4",
      },
      ghd: {
        x: 2,
        y: 0,
        c: "\ue0a4",
        sc: 0.66,
      },
      pshhd: {
        x: -3.7,
        y: 0,
        c: "\ue0a9",
      },
      pfthd: {
        x: -3.7,
        y: 0,
        c: "\ue0b3",
      },
      x: {
        x: -3.7,
        y: 0,
        c: "\ue0a9",
      },
      "circle-x": {
        x: -3.7,
        y: 0,
        c: "\ue0b3",
      },
      srep: {
        x: -5,
        y: 0,
        c: "\ue101",
      },
      "dot+": {
        x: -5,
        y: 0,
        sc: 0.7,
        c: "\ue101",
      },
      diamond: {
        x: -4,
        y: 0,
        c: "\ue1b9",
      },
      triangle: {
        x: -4,
        y: 0,
        c: "\ue1bb",
      },
      dot: {
        x: -2,
        y: 0,
        c: "\ue1e7",
      },
      flu1: {
        x: -0.3,
        y: 0,
        c: "\ue240",
      },
      fld1: {
        x: -0.3,
        y: 0,
        c: "\ue241",
      },
      flu2: {
        x: -0.3,
        y: 0,
        c: "\ue242",
      },
      fld2: {
        x: -0.3,
        y: 0,
        c: "\ue243",
      },
      flu3: {
        x: -0.3,
        y: 3.5,
        c: "\ue244",
      },
      fld3: {
        x: -0.3,
        y: -4,
        c: "\ue245",
      },
      flu4: {
        x: -0.3,
        y: 8,
        c: "\ue246",
      },
      fld4: {
        x: -0.3,
        y: -9,
        c: "\ue247",
      },
      flu5: {
        x: -0.3,
        y: 12.5,
        c: "\ue248",
      },
      fld5: {
        x: -0.3,
        y: -14,
        c: "\ue249",
      },
      "acc-1": {
        x: -1,
        y: 0,
        c: "\ue260",
      },
      acc3: {
        x: -1,
        y: 0,
        c: "\ue261",
      },
      acc1: {
        x: -2,
        y: 0,
        c: "\ue262",
      },
      acc2: {
        x: -3,
        y: 0,
        c: "\ue263",
      },
      "acc-2": {
        x: -3,
        y: 0,
        c: "\ue264",
      },
      "acc-1_1_4": {
        x: -2,
        y: 0,
        c: "\ue280",
      },
      "acc-1_3_4": {
        x: -3,
        y: 0,
        c: "\ue281",
      },
      acc1_1_4: {
        x: -1,
        y: 0,
        c: "\ue282",
      },
      acc1_3_4: {
        x: -3,
        y: 0,
        c: "\ue283",
      },
      accent: {
        x: -3,
        y: 0,
        c: "\ue4a0",
      },
      stc: {
        x: -1,
        y: -2,
        c: "\ue4a2",
      },
      emb: {
        x: -4,
        y: -2,
        c: "\ue4a4",
      },
      wedge: {
        x: -1,
        y: 0,
        c: "\ue4a8",
      },
      marcato: {
        x: -3,
        y: 0,
        c: "\ue4ac",
      },
      hld: {
        x: -7,
        y: 0,
        c: "\ue4c0",
      },
      brth: {
        x: 0,
        y: 0,
        c: "\ue4ce",
      },
      r00: {
        x: -1.5,
        y: 0,
        c: "\ue4e1",
      },
      r0: {
        x: -1.5,
        y: 0,
        c: "\ue4e2",
      },
      r1: {
        x: -3.5,
        y: -6,
        c: "\ue4e3",
      },
      r2: {
        x: -3.2,
        y: 0,
        c: "\ue4e4",
      },
      r4: {
        x: -3,
        y: 0,
        c: "\ue4e5",
      },
      r8: {
        x: -3,
        y: 0,
        c: "\ue4e6",
      },
      r16: {
        x: -4,
        y: 0,
        c: "\ue4e7",
      },
      r32: {
        x: -4,
        y: 0,
        c: "\ue4e8",
      },
      r64: {
        x: -4,
        y: 0,
        c: "\ue4e9",
      },
      r128: {
        x: -4,
        y: 0,
        c: "\ue4ea",
      },
      mrest: {
        x: -10,
        y: 0,
        c: "\ue4ee",
      },
      mrep: {
        x: -6,
        y: 0,
        c: "\ue500",
      },
      mrep2: {
        x: -9,
        y: 0,
        c: "\ue501",
      },
      p: {
        x: -4,
        y: -6,
        c: "\ue520",
      },
      f: {
        x: -4,
        y: -6,
        c: "\ue522",
      },
      pppp: {
        x: -4,
        y: -6,
        c: "\ue529",
      },
      ppp: {
        x: -4,
        y: -6,
        c: "\ue52a",
      },
      pp: {
        x: -4,
        y: -6,
        c: "\ue52b",
      },
      mp: {
        x: -4,
        y: -6,
        c: "\ue52c",
      },
      mf: {
        x: -4,
        y: -6,
        c: "\ue52d",
      },
      ff: {
        x: -4,
        y: -6,
        c: "\ue52f",
      },
      fff: {
        x: -4,
        y: -6,
        c: "\ue530",
      },
      ffff: {
        x: -4,
        y: -6,
        c: "\ue531",
      },
      sfz: {
        x: -4,
        y: -6,
        c: "\ue539",
      },
      sff: {
        x: -4,
        y: -6,
        c: "\ue539",
      },
      trl: {
        x: -4,
        y: -4,
        c: "\ue566",
      },
      turn: {
        x: -5,
        y: -4,
        c: "\ue567",
      },
      invertedturn: {
        x: -5,
        y: -4,
        c: "\ue569",
      },
      turnx: {
        x: -5,
        y: -4,
        c: "\ue569",
      },
      umrd: {
        x: -7,
        y: -2,
        c: "\ue56c",
      },
      lmrd: {
        x: -7,
        y: -2,
        c: "\ue56d",
      },
      dplus: {
        x: -4,
        y: 10,
        c: "\ue582",
      },
      sld: {
        x: -8,
        y: 12,
        c: "\ue5d0",
      },
      grm: {
        x: -2,
        y: 0,
        c: "\ue5e2",
      },
      dnb: {
        x: -4,
        y: 0,
        c: "\ue610",
      },
      upb: {
        x: -3,
        y: 0,
        c: "\ue612",
      },
      opend: {
        x: -2,
        y: 0,
        c: "\ue614",
      },
      roll: {
        x: 0,
        y: 0,
        c: "\ue618",
      },
      thumb: {
        x: 0,
        y: 0,
        c: "\ue624",
      },
      snap: {
        x: -2,
        y: 0,
        c: "\ue630",
      },
      ped: {
        x: -10,
        y: 0,
        c: "\ue650",
      },
      pedoff: {
        x: -5,
        y: 0,
        c: "\ue655",
      },
      pedall: {
        x: -10,
        y: 0,
        c: "\ue650\ue655",
      },
      pedall2: {
        x: -10,
        y: 0,
        c: "\ue655\ue650",
      },
      mtro: {
        x: 0,
        y: 0,
        c: "\ue911",
      },
      mtrc: {
        x: 0,
        y: 0,
        c: "\ue915",
      },
      "mtr.": {
        x: 0,
        y: 0,
        c: "\ue920",
      },
      "mtr|": {
        x: 0,
        y: 0,
        c: "\ue925",
      },
      longa: {
        x: -3.7,
        y: 0,
        c: "\ue95d",
      },
      custos: {
        x: -4,
        y: 3,
        c: "\uea02",
      },
      ltr: {
        x: 2,
        y: 6,
        c: "\ueaa4",
      },
    };
    var glyphs = {
      acc1_1_4:
        '<g id="acc1_1_4">\n\t<path d="m0 7.8v-15.4" class="stroke"/>\n\t<path class="fill" d="M-1.8 2.7l3.6 -1.1v2.2l-3.6 1.1v-2.2z\n\t\tM-1.8 -3.7l3.6 -1.1v2.2l-3.6 1.1v-2.2"/>\n</g>',
      acc1_3_4:
        '<g id="acc1_3_4">\n\t<path d="m-2.5 8.7v-15.4M0 7.8v-15.4M2.5 6.9v-15.4" class="stroke"/>\n\t<path class="fill" d="m-3.7 3.1l7.4 -2.2v2.2l-7.4 2.2v-2.2z\n\t\tM-3.7 -3.2l7.4 -2.2v2.2l-7.4 2.2v-2.2"/>\n</g>',
      "acc-1_3_4":
        '<g id="acc-1_3_4">\n    <path class="fill" d="m0.6 -2.7\n\tc-5.7 -3.1 -5.7 3.6 0 6.7c-3.9 -4 -4 -7.6 0 -5.8\n\tM1 -2.7c5.7 -3.1 5.7 3.6 0 6.7c3.9 -4 4 -7.6 0 -5.8"/>\n    <path d="m1.6 3.5v-13M0 3.5v-13" class="stroke" stroke-width=".6"/>\n</g>',
      pmsig:
        '<path id="pmsig" class="stroke" stroke-width="0.8"\n\td="m0 -7a5 5 0 0 1 0 -10a5 5 0 0 1 0 10"/>',
      pMsig:
        '<g id="pMsig">\n\t<use xlink:href="#pmsig"/>\n\t<path class="fill" d="m0 -10a2 2 0 0 1 0 -4a2 2 0 0 1 0 4"/>\n</g>',
      imsig:
        '<path id="imsig" class="stroke" stroke-width="0.8"\n\td="m3 -8a5 5 0 1 1 0 -8"/>',
      iMsig:
        '<g id="iMsig">\n\t<use xlink:href="#imsig"/>\n\t<path class="fill" d="m0 -10a2 2 0 0 1 0 -4a2 2 0 0 1 0 4"/>\n</g>',
      hl: '<path id="hl" class="stroke" stroke-width="1" d="m-6 0h12"/>',
      hl1: '<path id="hl1" class="stroke" stroke-width="1" d="m-7 0h14"/>',
      hl2: '<path id="hl2" class="stroke" stroke-width="1" d="m-9 0h18"/>',
      ghl: '<path id="ghl" class="stroke" d="m-3.5 0h7"/>',
      rdots:
        '<g id="rdots" class="fill">\n\t<circle cx="0" cy="-9" r="1.2"/>\n\t<circle cx="0" cy="-15" r="1.2"/>\n</g>',
      grm: '<path id="grm" class="fill" d="m-5 -2.5\n\tc5 -8.5 5.5 4.5 10 -2 -5 8.5 -5.5 -4.5 -10 2"/>',
      stc: '<circle id="stc" class="fill" cx="0" cy="-3" r="1.2"/>',
      stc_bot: '<circle id="stc_bot" class="fill" cx="0" cy="-1" r="1.2"/>', //新增的add by hxs
      stc_top: '<circle id="stc_top" class="fill" cx="0" cy="-1" r="1.2"/>', //新增的add by hxs
      stc_blank:
        '<circle id="stc_blank" class="fill" style="opacity:0;" cx="0" cy="-1" r="1.2"/>', //新增的add by hxs
      kew1:
        '<image id="kew1" x="-18" y="-45" xlink:href="' +
        assets_url +
        'kew/kew1.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>',
      kews1:
        '<image id="kews1" x="-18" y="-45" xlink:href="' +
        assets_url +
        'kew/kews1.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>',
      kew2:
        '<image id="kew2" x="-18" y="-45" xlink:href="' +
        assets_url +
        'kew/kew2.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>',
      kewb2:
        '<image id="kewb2" x="-18" y="-45" xlink:href="' +
        assets_url +
        'kew/kewb2.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>',
      kews2:
        '<image id="kews2" x="-18" y="-45" xlink:href="' +
        assets_url +
        'kew/kews2.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>',
      kew3:
        '<image id="kew3" x="-18" y="-45" xlink:href="' +
        assets_url +
        'kew/kew3.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>',
      kewb3:
        '<image id="kewb3" x="-18" y="-45" xlink:href="' +
        assets_url +
        'kew/kewb3.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>',
      kew4:
        '<image id="kew4" x="-18" y="-45" xlink:href="' +
        assets_url +
        'kew/kew4.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>',
      kews4:
        '<image id="kews4" x="-18" y="-45" xlink:href="' +
        assets_url +
        'kew/kews4.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>',
      kew5:
        '<image id="kew5" x="-18" y="-45" xlink:href="' +
        assets_url +
        'kew/kew5.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>',
      kewb5:
        '<image id="kewb5" x="-18" y="-45" xlink:href="' +
        assets_url +
        'kew/kewb5.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>',
      kews5:
        '<image id="kews5" x="-18" y="-45" xlink:href="' +
        assets_url +
        'kew/kews5.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>',
      kew6:
        '<image id="kew6" x="-18" y="-45" xlink:href="' +
        assets_url +
        'kew/kew6.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>',
      kewb6:
        '<image id="kewb6" x="-18" y="-45" xlink:href="' +
        assets_url +
        'kew/kewb6.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>',
      kews6:
        '<image id="kews6" x="-18" y="-45" xlink:href="' +
        assets_url +
        'kew/kews6.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>',
      kew7:
        '<image id="kew7" x="-18" y="-45" xlink:href="' +
        assets_url +
        'kew/kew7.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>',
      kewb7:
        '<image id="kewb7" x="-18" y="-45" xlink:href="' +
        assets_url +
        'kew/kewb7.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>',
      kew8:
        '<image id="kew8" x="-18" y="-45" xlink:href="' +
        assets_url +
        'kew/kew8.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>',

      inst_lingu:
        '<image id="inst_lingu" x="-18" y="-45" xlink:href="' +
        assets_url +
        'inst/lingu.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>', //铃鼓
      inst_shanjt:
        '<image id="inst_shanjt" x="-18" y="-45" xlink:href="' +
        assets_url +
        'inst/shanjt.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>', //三角铁
      inst_xiangb:
        '<image id="inst_xiangb" x="-18" y="-45" xlink:href="' +
        assets_url +
        'inst/xiangb.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>', //响板
      inst_pengl:
        '<image id="inst_pengl" x="-18" y="-45" xlink:href="' +
        assets_url +
        'inst/pengl.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>', //碰铃
      inst_shuanxt:
        '<image id="inst_shuanxt" x="-18" y="-45" xlink:href="' +
        assets_url +
        'inst/shuanxt.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>', //双响筒
      inst_shac:
        '<image id="inst_shac" x="-18" y="-45" xlink:href="' +
        assets_url +
        'inst/shac.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>', //沙锤
      inst_xiaojg:
        '<image id="inst_xiaojg" x="-18" y="-45" xlink:href="' +
        assets_url +
        'inst/xiaojg.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>', //小军鼓
      inst_shoul:
        '<image id="inst_shoul" x="-18" y="-45" xlink:href="' +
        assets_url +
        'inst/shoul.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>', //手铃
      inst_feizg:
        '<image id="inst_feizg" x="-18" y="-45" xlink:href="' +
        assets_url +
        'inst/feizg.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>', //非洲鼓
      inst_shuanglin:
        '<image id="inst_shuanglin" x="-18" y="-45" xlink:href="' +
        assets_url +
        'inst/shuanglin.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>', //双铃
      inst_xiangzhan:
        '<image id="inst_xiangzhan" x="-18" y="-45" xlink:href="' +
        assets_url +
        'inst/xiangzhan.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>', //响盏
      inst_xiaojiao:
        '<image id="inst_xiaojiao" x="-18" y="-45" xlink:href="' +
        assets_url +
        'inst/xiaojiao.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>', //小叫
      inst_xiaojiaoxiaoluo:
        '<image id="inst_xiaojiaoxiaoluo" x="-18" y="-45" xlink:href="' +
        assets_url +
        'inst/xiaojiaoxiaoluo.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>', //小叫
      inst_yaoling:
        '<image id="inst_yaoling" x="-18" y="-45" xlink:href="' +
        assets_url +
        'inst/yaoling.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>', //小叫
      inst_wamt:
        '<image id="inst_wamt" x="-18" y="-45" xlink:href="' +
        assets_url +
        'inst/wamt.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>', //小叫
      inst_bo:
        '<image id="inst_bo" x="-18" y="-45" xlink:href="' +
        assets_url +
        'inst/bo.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>', //小叫
      inst_daluo:
        '<image id="inst_daluo" x="-18" y="-45" xlink:href="' +
        assets_url +
        'inst/daluo.png"  width="' +
        40 * cfmt.kewsize +
        '" height="' +
        40 * cfmt.kewsize +
        '"/>', //小叫

      img:
        '<image id="img_myimgid" x="-18" y="-45" xlink:href="' +
        assets_url +
        'myimgid.png"  height="' +
        40 * cfmt.kewsize +
        '"/>',
      //sld: '<path id="sld" class="fill" d="m-7.2 4.8\n\tc1.8 .7 4.5 -.2 7.2 -4.8 -2.1 5 -5.4 6.8 -7.6 6"/>',
      sld: '<path id="sld" d="m0,12 s12,0 12,-12" fill="none" stroke="black" />',
      sld_spl:
        '<path id="sld_spl" d="m0,12 q4,-6 10,-8" fill="none" stroke="black" marker-end="url(#arrow)"/>',
      sldlu:
        '<path id="sldlu" d="m0,0 s12,0 12,12" fill="none" stroke="black" />',
      sldlu_spl:
        ' <path id="sldlu_spl" d="m0,0 q5,8 10,8" fill="none" stroke="black" marker-end="url(#arrow)"/>',
      sldru:
        '<path id="sldru" d="m0,12 s12,0 12,-12" fill="none" stroke="black" />',
      sldru_spl:
        '<path id="sldru_spl" d="m0,12 q5,1 10,-8" fill="none" stroke="black" marker-end="url(#arrow)"/>',
      sldrd:
        '<path id="sldrd" d="m0,0 s12,0 12,12" fill="none" stroke="black"/>',
      sldrd2:
        '<path id="sldrd2" d="m0,0 s7,-10 14,0" fill="none" stroke="black" marker-end="url(#arrow)"/>',
      sldrd_spl:
        '<path id="sldrd_spl" d="m0,0 q7,1 10,8" fill="none" stroke="black" marker-end="url(#arrow)"/>',
      emb: '<path id="emb" class="stroke" stroke-width="1.2" stroke-linecap="round"\n\td="m-4.5 -3h9"/>', // m-2.5 -3h5
      roll: '<path id="roll" class="fill" d="m-6 0\n\tc0.4 -7.3 11.3 -7.3 11.7 0 -1.3 -6 -10.4 -6 -11.7 0"/>',
      fngs: '<g id="fngs_istart"><text class="fng"><tspan dx="-8">start</tspan></text><path invstr class="fill" d="m-6 -8\n\tc0.4 -7.3 11.3 -7.3 11.7 0 -1.3 -6 -10.4 -6 -11.7 0"/><text class="fng"><tspan dx="3">end</tspan></text></g>',
      upb: '<path id="upb" class="stroke" d="m-2.6 -9.4\n\tl2.6 8.8 2.6 -8.8"/>',
      downb:
        '<path id="downb" class="stroke" d="m-2.6 0\n\tl2.6 -8.8 2.6 8.8"/>', //add by hxs，开口向下的换气
      dnb: '<g id="dnb">\n\t<path d="M-3.2 -2v-7.2m6.4 0v7.2" class="stroke"/>\n\t<path d="M-3.2 -6.8v-2.4l6.4 0v2.4" class="fill"/>\n</g>',
      dplus:
        '<path id="dplus" class="stroke" stroke-width="1.7"\n\td="m0 -.5v-6m-3 3h6"/>',
      lphr: '<path id="lphr" class="stroke" stroke-width="1.2"\n\td="m0 0v18"/>',
      mphr: '<path id="mphr" class="stroke" stroke-width="1.2"\n\td="m0 0v12"/>',
      sphr: '<path id="sphr" class="stroke" stroke-width="1.2"\n\td="m0 0v6"/>',
      sfz: '<text id="sfz" x="-5" y="-6" style="font-family:AarvarkCafe; font-size:14px">\n\ts<tspan font-size="16" >f</tspan>z</text>',
      sff: '<text id="sff" x="-5" y="-6" style="font-family:AarvarkCafe; font-size:14px">\n\ts<tspan font-size="16" >ff</tspan></text>',
      tenutoup: '<text id="tenutoup" x="-5" y="6" font-size="30">-</text>',
      rit: '<text id="rit" x="-5" y="-6" style="font-size:14px">\n\tr<tspan font-size="16" >i</tspan>t.</text>',
      accel:
        '<text id="accel" x="-5" y="-6" style="font-size:14px">\n\taccel.</text>',
      do:
        '<text id="do" x="-5" y="-6" style="font-size:' +
        cmFontSize +
        'px">\n\tdo</text>',
      re:
        '<text id="re" x="-5" y="-6" style="font-size:' +
        cmFontSize +
        'px">\n\tre</text>',
      mi:
        '<text id="mi" x="-5" y="-6" style="font-size:' +
        cmFontSize +
        'px">\n\tmi</text>',
      fa:
        '<text id="fa" x="-5" y="-6" style="font-size:' +
        cmFontSize +
        'px">\n\tfa</text>',
      sol:
        '<text id="sol" x="-5" y="-6" style="font-size:' +
        cmFontSize +
        'px">\n\tsol</text>',
      la:
        '<text id="la" x="-5" y="-6" style="font-size:' +
        cmFontSize +
        'px">\n\tla</text>',
      si:
        '<text id="si" x="-5" y="-6" style="font-size:' +
        cmFontSize +
        'px">\n\tsi</text>',
      //            ["doe","ray","me","far","sew","la","sea"]
      doe:
        '<text id="doe" x="-5" y="-6" style="font-size:' +
        cmFontSize +
        'px">\n\tdoe</text>',
      ray:
        '<text id="ray" x="-5" y="-6" style="font-size:' +
        cmFontSize +
        'px">\n\tray</text>',
      me:
        '<text id="me" x="-5" y="-6" style="font-size:' +
        cmFontSize +
        'px">\n\tme</text>',
      far:
        '<text id="far" x="-5" y="-6" style="font-size:' +
        cmFontSize +
        'px">\n\tfar</text>',
      sew:
        '<text id="sew" x="-5" y="-6" style="font-size:' +
        cmFontSize +
        'px">\n\tsew</text>',
      la:
        '<text id="la" x="-5" y="-6" style="font-size:' +
        cmFontSize +
        'px">\n\tla</text>',
      sea:
        '<text id="sea" x="-5" y="-6" style="font-size:' +
        cmFontSize +
        'px">\n\tsea</text>',

      l_brackets:
        '<text id="l_brackets" x="-9" y="15" class="splfont" style="font-size:14px">\n\t(</text>',
      r_brackets_l:
        '<text id="r_brackets_l" x="6" y="17" class="splfont" style="font-size:14px">\n\t)</text>',
      r_brackets_r:
        '<text id="r_brackets_r" x="6" y="17" class="splfont" style="font-size:14px">\n\t)</text>',

      sfp: '<text id="sfp" x="-5" y="-6" style="font-family:AarvarkCafe; font-size:14px">\n\ts<tspan font-size="16" >f</tspan>p</text>',
      fp: '<text id="fp" x="-5" y="-6" style="font-family:AarvarkCafe; font-size:14px">\n\tfp</text>', //add by hxs
      mfp: '<text id="mfp" x="-5" y="-6" style="font-family:AarvarkCafe; font-size:14px">\n\tmfp</text>', //add by hxs
      crescword:
        '<text id="crescword" x="-5" y="-6" style="font-family:AarvarkCafe; font-size:14px">\n\tcresc.</text>', //add by hxs
      decrescword:
        '<text id="decrescword" x="-5" y="-6" style="font-family:AarvarkCafe; font-size:14px">\n\tdecresc.</text>', //add by hxs
      dimword:
        '<text id="dimword" x="-5" y="-6" style="font-family:AarvarkCafe; font-size:14px">\n\tdim.</text>', //add by hxs
      fz: '<text id="fz" x="-5" y="-6" style="font-family:AarvarkCafe; font-size:14px">\n\tfz</text>', //add by hxs
      trl: '<text id="trl" x="-2" y="-4"\n\tstyle="font-family:serif; font-weight:bold; font-style:italic; font-size:16px">tr</text>',
      opend: '<circle id="opend" class="stroke"\n\tcx="0" cy="-3" r="2.5"/>',
      snap: '<path id="snap" class="stroke" d="m-3 -6\n\tc0 -5 6 -5 6 0 0 5 -6 5 -6 0\n\tM0 -5v6"/>',
      thumb:
        '<path id="thumb" class="stroke" d="m-2.5 -7\n\tc0 -6 5 -6 5 0 0 6 -5 6 -5 0\n\tM-2.5 -9v4"/>',
      strong:
        '<path id="strong" class="stroke" d="M15 0\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>',
      showsd8: "",
      sd8_1:
        '<g y="-2" id="sd8_1" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_u1:
        '<g y="-2" id="sd8_u1" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_2:
        '<g y="-2" id="sd8_2" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_3:
        '<g y="-2" id="sd8_3" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_b3:
        '<g y="-2" id="sd8_b3" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_4:
        '<g y="-2" id="sd8_4" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_u4:
        '<g y="-2" id="sd8_u4" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_5:
        '<g y="-2" id="sd8_5" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_u5:
        '<g y="-2" id="sd8_u5" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_6:
        '<g y="-2" id="sd8_6" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_7:
        '<g y="-2" id="sd8_7" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_b7:
        '<g y="-2" id="sd8_b7" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_1s:
        '<g y="-2" id="sd8_1s" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_u1s:
        '<g y="-2" id="sd8_u1s" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_2s:
        '<g y="-2" id="sd8_2s" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_3s:
        '<g y="-2" id="sd8_3s" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        //'<path class="stroke" d="M14 -92 L-2 -99" style="stroke:#000000;fill:black;"/>'+
        '<path class="stroke" transform="rotate(0)" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" transform="rotate(0)" d="M6 -92\n\tm-4 -4\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_b3s:
        '<g y="-2" id="sd8_b3s" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        //'<path class="stroke" d="M14 -92 L-2 -99" style="stroke:#000000;fill:black;"/>'+
        '<path class="stroke" transform="rotate(0)" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" transform="rotate(0)" d="M6 -92\n\tm-4 -4\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_4s:
        '<g y="-2" id="sd8_4s" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        //'<path class="stroke" d="M14 -92 L-2 -99" style="stroke:#000000;fill:black;"/>'+
        '<path class="stroke" transform="rotate(0)" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" transform="rotate(0)" d="M6 -92\n\tm-4 -4\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_u4s:
        '<g y="-2" id="sd8_u4s" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        //'<path class="stroke" d="M14 -92 L-2 -99" style="stroke:#000000;fill:black;"/>'+
        '<path class="stroke" transform="rotate(0)" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" transform="rotate(0)" d="M6 -92\n\tm-4 -4\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_5s:
        '<g y="-2" id="sd8_5s" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        //'<path class="stroke" d="M14 -92 L-2 -99" style="stroke:#000000;fill:black;"/>'+
        '<path class="stroke" transform="rotate(0)" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" transform="rotate(0)" d="M6 -92\n\tm-4 -4\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_u5s:
        '<g y="-2" id="sd8_u5s" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        //'<path class="stroke" d="M14 -92 L-2 -99" style="stroke:#000000;fill:black;"/>'+
        '<path class="stroke" transform="rotate(0)" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" transform="rotate(0)" d="M6 -92\n\tm-4 -4\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_6s:
        '<g y="-2" id="sd8_6s" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        //'<path class="stroke" d="M14 -92 L-2 -99" style="stroke:#000000;fill:black;"/>'+
        '<path class="stroke" transform="rotate(0)" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" transform="rotate(0)" d="M6 -92\n\tm-4 -4\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_7s:
        '<g y="-2" id="sd8_7s" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        //'<path class="stroke" d="M14 -92 L-2 -99" style="stroke:#000000;fill:black;"/>'+
        '<path class="stroke" transform="rotate(0)" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" transform="rotate(0)" d="M6 -92\n\tm-4 -4\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd8_b7s:
        '<g y="-2" id="sd8_b7s" stroke="black" stroke-width="1"><rect x="-5" y="-102" fill="none" width="20" height="102"/>' +
        '<path class="stroke" d="M14 -2\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -2\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-6 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M14 -14\n\tm-1 -3\n\ta2,2 0 1,0 -4,0\n\ta2,2 0 1,0 4,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -54\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -51 L-5 -51" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -66\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M16 -78\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        //'<path class="stroke" d="M14 -92 L-2 -99" style="stroke:#000000;fill:black;"/>'+
        '<path class="stroke" transform="rotate(0)" d="M14 -92\n\tm-4 -4\n\ta4,4 0 1,0 -8,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" transform="rotate(0)" d="M6 -92\n\tm-4 -4\n\ta4,4 0 1,0 8,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -90 L-5 -90" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd5_:
        '<g y="-2" id="sd5_" stroke="black" stroke-width="1"><rect x="-2" y="-74" fill="none" width="14" height="74"/>' +
        '<path class="stroke" d="M15 -2\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -14\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -50\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -62\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd6:
        '<g id="sd6" stroke="black" stroke-width="1"><rect x="-2" y="-74" fill="none" width="14" height="74"/>' +
        '<path class="stroke" d="M15 -2\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -14\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -50\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -62\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd7:
        '<g id="sd7" stroke="black" stroke-width="1"><rect x="-2" y="-74" fill="none" width="14" height="74"/>' +
        '<path class="stroke" d="M15 -2\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -14\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -50\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -62\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd1:
        '<g id="sd1" stroke="black" stroke-width="1"><rect x="-2" y="-74" fill="none" width="14" height="74"/>' +
        '<path class="stroke" d="M15 -2\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -14\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -50\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -62\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd2:
        '<g id="sd2" stroke="black" stroke-width="1"><rect x="-2" y="-74" fill="none" width="14" height="74"/>' +
        '<path class="stroke" d="M15 -2\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -14\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -50\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -62\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd3:
        '<g id="sd3" stroke="black" stroke-width="1"><rect x="-2" y="-74" fill="none" width="14" height="74"/>' +
        '<path class="stroke" d="M15 -2\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -14\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -50\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -62\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        "</g>",
      sd4:
        '<g id="sd4" stroke="black" stroke-width="1"><rect x="-2" y="-74" fill="none" width="14" height="74"/>' +
        '<path class="stroke" d="M15 -2\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -14\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        '<path class="stroke" d="M15 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -50\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -62\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        "</g>",
      sd5:
        '<g id="sd5" stroke="black" stroke-width="1"><rect x="-2" y="-74" fill="none" width="14" height="74"/>' +
        '<path class="stroke" d="M15 -2\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -14\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -26\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -38\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -50\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/>' +
        '<path class="stroke" d="M15 -62\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>' +
        "</g>",
      jpslid:
        '<g id="jpslid" transform="rotate(45)">' +
        '<use x="0" d="" y="0" xlink:href="#ltr"></use>' +
        '<use x="6" d="" y="0" xlink:href="#ltr"></use>' +
        '<use x="12" d="" y="0" xlink:href="#ltr"></use>' +
        "</g>",
      weak: '<path id="weak" class="stroke" d="M15 0\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/>',
      s_w: '<g id="s_w"><path class="stroke" d="M15 0\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:black;"/><path class="stroke" d="M26 0\n\tm-5 -5\n\ta5,5 0 1,0 -10,0\n\ta5,5 0 1,0 10,0" style="stroke:#000000;fill:white;"/></g>',
      sec_strong:
        '<g id="sec_strong"><path d="m5 0 a5 5 0 0 1 0 -10" stroke="black" fill="#000" stroke-width="1" />' +
        '<path d="m5 0 a5 5 0 0 0 0 -10" stroke="black" fill="#fff" stroke-width="1" /></g>',
      wedge: '<path id="wedge" class="fill" d="m0 -1l-4 -8h8l-4 8"/>',
      ltr: '<path id="ltr" class="fill"\n\td="m0 -.4c2 -1.5 3.4 -1.9 3.9 .4 0.2 .8 .7 .7 2.1 -.4\n\tv0.8c-2 1.5 -3.4 1.9 -3.9 -.4 -.2 -.8 -.7 -.7 -2.1 .4z"/>',
      custos:
        '<g id="custos">\n\t<path class="fill" d="m-4 0l2 2.5 2 -2.5 2 2.5 2 -2.5\n\t\t-2 -2.5 -2 2.5 -2 -2.5 -2 2.5"/>\n\t<path class="stroke" d="m3.5 0l5 -7"/>\n</g>',
      triangle:
        '<path id="triangle" class="fill" d="m-3.7 -3.2l7.4 0 -3.7 6.4 -3.7 -6.4"/>',
      diamond:
        '<path id="diamond" class="fill" d="m0 3.5l-3.7 -3.5 3.7 -3.5 3.7 3.5z"/>',
      oct: '<text id="oct" style="font-family:serif; font-size:12px">8</text>',
    };
    function m_gl(s) {
      s = s + "";
      return s.replace(/[Cco]\||[co]\.|./g, function (e) {
        var m = tgls["mtr" + e];
        return m.c;
      });
    }
    function def_use(gl, imgpath, s) {
      //增加了imgpath参数，自定义图片时，传入这个参数替换myimgid
      //        	console.log("def_use",gl)
      var i, j, g;
      if (defined_glyph[gl] && gl != "img" && gl != "fngs") {
        //增加了gl!="img"和gl!="fngs"的判断，自定义图片时，不同的图片需要不同的定义，add by hxs
        return;
      }
      defined_glyph[gl] = true;
      g = glyphs[gl];
      if (!g) {
        //error(1, null, "Unknown glyph: '$1'", gl);
        error(1, null, "无法识别的标记: '$1'", gl);
        return;
      }
      if (s && s.fnginv) {
        //同音换指显示在底部 add by hxs
        g = g.replace("invstr", 'transform="translate(0,-8)scale(1,-1)"');
      }
      if (s && s.fngs && s.fngs.length > 0) {
        g = g.replace("fngs_istart", "fngs_" + s.istart);
        g = g.replace("start", s.fngs[0]).replace("end", s.fngs[1]);
      }
      j = 0;
      while (1) {
        i = g.indexOf('xlink:href="#', j);
        if (i < 0) break;
        i += 13;
        j = g.indexOf('"', i);
        def_use(g.slice(i, j));
      }
      if (gl == "img" && imgpath) {
        //自定义图片的处理
        if (imgpath.indexOf("http") == 0) {
          defs +=
            "\n" +
            g
              .replace(/img_myimgid/g, imgpath.replace(/[:/.]/g, ""))
              .replace(/\"[^\"]*\.png\"/, '"' + imgpath + '"'); ///
          defs += ' style="border:1px solid #0E518F;"';
        } else {
          defs += "\n" + g.replace(/myimgid/g, imgpath); ///
        }
      } else {
        defs += "\n" + g;
      }
    }
    Abc.prototype.def_use = def_use;
    Abc.prototype.defs_add = defs_add;
    Abc.prototype.defs = defs; //add by hxs
    function defs_add(text) {
      var i,
        j,
        gl,
        tag,
        is,
        ie = 0;
      text = text.replace(/<!--.*?-->/g, "");
      while (1) {
        is = text.indexOf("<", ie);
        if (is < 0) break;
        i = text.indexOf('id="', is);
        if (i < 0) break;
        i += 4;
        j = text.indexOf('"', i);
        if (j < 0) break;
        gl = text.slice(i, j);
        ie = text.indexOf(">", j);
        if (ie < 0) break;
        if (text[ie - 1] == "/") {
          ie++;
        } else {
          i = text.indexOf(" ", is);
          if (i < 0) break;
          tag = text.slice(is + 1, i);
          ie = text.indexOf("</" + tag + ">", ie);
          if (ie < 0) break;
          ie += 3 + tag.length;
        }
        if (text.substr(is, 7) == "<filter")
          fulldefs += "\n" + text.slice(is, ie);
        else glyphs[gl] = text.slice(is, ie);
      }
    }
    function set_g() {
      if (stv_g.started) {
        stv_g.started = false;
        glout();
        output += "</g>\n";
      }
      if (stv_g.scale == 1 && !stv_g.color) return;
      glout();
      output += "<g ";
      if (stv_g.scale != 1) {
        if (stv_g.st >= 0) output += staff_tb[stv_g.st].scale_str;
        else output += voice_tb[stv_g.v].scale_str;
      }
      if (stv_g.color) {
        if (stv_g.scale != 1) output += " ";
        output += 'style="color:' + stv_g.color + '"';
      }
      var update_index = "";
      if (stv_g.update_index) {
        update_index = ' update_index="' + stv_g.update_index + '"';
      } else {
        update_index = ' update_index="' + updateNoteIndexInChord + '"';
      }

      if (stv_g.istart) {
        output +=
          ' istart = "' +
          stv_g.istart +
          '" ' +
          update_index +
          ' class="select_text_g"';
      }
      output += ">\n";
      // console.log('set_g--------',output)
      stv_g.started = true;
    }
    function set_color(color, istart, update_index) {
      //增加了istart参数 add by hxs
      if (color == stv_g.color) return undefined;
      var old_color = stv_g.color;
      stv_g.color = color;
      stv_g.istart = istart;
      stv_g.update_index = update_index;

      stv_g.className = "select_text_g";
      set_g();
      return old_color;
    }
    function set_sscale(st) {
      var new_scale, dy;
      if (st != stv_g.st && stv_g.scale != 1) stv_g.scale = 0;
      new_scale = st >= 0 ? staff_tb[st].staffscale : 1;
      if (st >= 0 && new_scale != 1) dy = staff_tb[st].y;
      else dy = posy;
      if (new_scale == stv_g.scale && dy == stv_g.dy) return;
      stv_g.scale = new_scale;
      stv_g.dy = dy;
      stv_g.st = st;
      set_g();
    }
    function set_scale(s) {
      var new_scale = s.p_v.scale;
      if (new_scale == 1) {
        set_sscale(s.st);
        return;
      }
      if (new_scale == stv_g.scale && stv_g.dy == posy) return;
      stv_g.scale = new_scale;
      stv_g.dy = posy;
      stv_g.st = -1;
      stv_g.v = s.v;
      set_g();
    }
    function set_dscale(st, no_scale) {
      if (output) {
        if (stv_g.st < 0) {
          staff_tb[0].output += output;
        } else if (stv_g.scale == 1) {
          staff_tb[stv_g.st].output += output;
        } else {
          staff_tb[stv_g.st].sc_out += output;
        }
        output = "";
      }
      if (st < 0) stv_g.scale = 1;
      else stv_g.scale = no_scale ? 1 : staff_tb[st].staffscale;
      stv_g.st = st;
      stv_g.dy = 0;
    }
    function delayed_update() {
      var st, new_out, text;
      for (st = 0; st <= nstaff; st++) {
        if (staff_tb[st].sc_out) {
          output +=
            '<g transform="translate(0,' +
            (posy - staff_tb[st].y).toFixed(2) +
            ") scale(" +
            staff_tb[st].staffscale.toFixed(2) +
            ')">\n' +
            staff_tb[st].sc_out +
            "</g>\n";
          staff_tb[st].sc_out = "";
        }
        if (!staff_tb[st].output) continue;

        output +=
          '<g transform="translate(0,' +
          -staff_tb[st].y.toFixed(2) +
          ')">\n' +
          staff_tb[st].output +
          "</g>\n";
        staff_tb[st].output = "";
      }
    }

    //        function delayed_update() {
    //            var st, new_out, text;
    //            for (st = 0; st <= nstaff; st++) {
    //                if (staff_tb[st].sc_out) {
    //                    output += '<g ' + staff_tb[st].scale_str + '>\n' + staff_tb[st].sc_out + '</g>\n';
    //                    staff_tb[st].sc_out = ""
    //                }
    //                if (!staff_tb[st].output) continue;
    //                output += '<g transform="translate(0,' + ( - staff_tb[st].y).toFixed(1) + ')">\n' + staff_tb[st].output + '</g>\n';
    //                staff_tb[st].output = ""
    //            }
    //        }

    var anno_type = [
      "bar",
      "clef",
      "custos",
      "",
      "grace",
      "key",
      "meter",
      "Zrest",
      "note",
      "part",
      "rest",
      "yspace",
      "staves",
      "Break",
      "tempo",
      "",
      "block",
      "remark",
    ];
    // 输出音符
    function anno_out(s, t, f) {
      if (s.istart == undefined) return;
      var type = s.type,
        h = s.ymx - s.ymn + 4,
        wl = s.wl || 2,
        wr = s.wr || 2;
      if (s.grace) {
        type = C.GRACE;
      }
      f(
        t || anno_type[type],
        s.istart,
        s.iend,
        s.x - wl - 2,
        staff_tb[s.st].y + s.ymn + h - 2,
        wl + wr + 4,
        h,
        s
      );
    }
    function a_start(s, t) {
      anno_out(s, t, user.anno_start);
    }
    function a_stop(s, t) {
      anno_out(s, t, user.anno_stop);
    }
    function empty_function() {}
    var anno_start = user.anno_start ? a_start : empty_function,
      anno_stop = user.anno_stop ? a_stop : empty_function;
    function out_XYAB(str, x, y, a, b, isPassRpl, notReplaceABFG) {
      //添加参数不替换ABFG
      x = sx(x);
      y = sy(y);
      // console.log('output1--', output)
      // 如果是换气符号upb,则x坐标往左移
      if (a && a == "upb") {
        x = x - 10;
        y = y + 5;
      } else if (a && a == "sld") {
        x = x - 8;
        y = y + 4;
      } else if (a && a == "sldlu") {
        //如果是左上滑音
        x = x - 8;
        y = y - 16;
      } else if (a && a == "sldru") {
        //右上滑音
        x = x + 10;
        y = y - 13;
      } else if (a && a == "sldrd") {
        //右下滑音
        x = x + 10;
      }
      var reg = new RegExp("X|Y|A|B|F|G", "g");
      if (str.indexOf("Fine") > -1) {
        //字符串里增加了type时，在有Fine的情况下，会出问题
        reg = new RegExp("X|Y|A|B|G", "g");
      }
      var svgString = str.replace(reg, function (c, x12, x13) {
        switch (c) {
          case "X":
            return x.toFixed(2);
          case "Y":
            return y.toFixed(2);
          case "A":
            if (a) {
              return a;
            } else {
              return "A";
            }
          case "B":
            if (b) {
              return b;
            }
            return "B";
          case "F":
            if (a && /^[\-0-9\.]*$/.test(a)) {
              return a.toFixed(2);
            } else {
              return "F";
            }
          default:
            if (notReplaceABFG) {
              return c;
            } else {
              if (b) {
                return b.toFixed(2);
              } else {
                return 0;
              }
            }
        }
      });
      // 简谱使用自身的显示
      if (musicType == 2 && /(text|path|use)/.test(str) && !isPassRpl) {
        return;
      }
      output += svgString;
    }
    function out_XYAB_spl(str, x, y, a, b, isPassRpl) {
      //            x = sx(x);
      //            y = sy(y);
      // console.log('output1--', output)
      // 如果是换气符号upb,则x坐标往左移
      if (a && a == "upb") {
        x = x - 10;
      } else if (a && a == "sld") {
        x = x - 8;
        y = y + 4;
      } else if (a && a == "sldlu") {
        //如果是左上滑音
        x = x - 8;
        y = y - 16;
      } else if (a && a == "sldru") {
        //右上滑音
        x = x + 10;
        y = y - 13;
      } else if (a && a == "sldrd") {
        //右下滑音
        x = x + 10;
      }
      var svgString = str.replace(/X|Y|A|B|F|G/g, function (c) {
        switch (c) {
          case "X":
            return x.toFixed(2);
          case "Y":
            return y.toFixed(2);
          case "A":
            return a;
          case "B":
            return b;
          case "F":
            return a.toFixed(2);
          default:
            return b.toFixed(2);
        }
      });
      output += svgString;
    }
    Abc.prototype.out_XYAB_spl = out_XYAB_spl;
    function g_open(x, y, rot, sx, sy) {
      glout();
      out_XYAB('<g transform="translate(X,Y', x, y);
      if (rot) output += ") rotate(" + rot.toFixed(2);
      if (sx) {
        if (sy) output += ") scale(" + sx.toFixed(2) + ", " + sy.toFixed(2);
        else output += ") scale(" + sx.toFixed(2);
      }
      output += ')">\n';
      stv_g.g++;
    }
    function g_close() {
      glout();
      stv_g.g--;
      output += "</g>\n";
    }
    Abc.prototype.out_svg = function (str) {
      output += str;
    };
    Abc.prototype.get_svg = function () {
      return output;
    };
    Abc.prototype.set_svg = function (str) {
      output = str;
    };
    Abc.prototype.psdeco = empty_function;
    function sx(x) {
      if (stv_g.g) return x;
      return (x + posx) / stv_g.scale;
    }
    Abc.prototype.sx = sx;
    function sy(y) {
      if (stv_g.g) return -y;
      if (stv_g.scale == 1) return posy - y;
      if (stv_g.v >= 0) return (stv_g.dy - y) / voice_tb[stv_g.v].scale;
      return stv_g.dy - y;
    }
    Abc.prototype.sy = sy;
    Abc.prototype.sh = sh;
    Abc.prototype.slur_out = slur_out;
    Abc.prototype.g_open = g_open;
    function sh(h) {
      if (stv_g.st < 0) return h / stv_g.scale;
      return h;
    }
    Abc.prototype.ax = function (x) {
      return x + posx;
    };
    Abc.prototype.ay = function (y) {
      if (stv_g.st < 0) return posy - y;
      return posy + (stv_g.dy - y) * stv_g.scale - stv_g.dy;
    };
    Abc.prototype.ah = function (h) {
      if (stv_g.st < 0) return h;
      return h * stv_g.scale;
    };
    function out_sxsy(x, sep, y) {
      x = sx(x);
      y = sy(y);
      output += x.toFixed(2) + sep + y.toFixed(2);
    }
    Abc.prototype.out_sxsy = out_sxsy;
    function xypath(x, y, fill, type) {
      //增加了一个type参数，在画连谱线的时候有传入该值
      var typeStr = "";
      if (type) {
        typeStr = 'type="score" onclick="selScore(event,this)"';
      }
      out_XYAB(
        "<path " + typeStr + ' class="A" d="mX Y\n',
        x,
        y,
        fill ? "fill" : "stroke"
      );
    }
    Abc.prototype.xypath = xypath;
    Abc.prototype.parse = function () {
      return parse;
    };
    Abc.prototype.xygl = xygl; // create by lhj
    // 设置特殊的音符符号（其他符号）
    //        function xygl(x, y, gl, isPassRpl) {
    //            var tgl = tgls[gl];
    //            if (tgl && !glyphs[gl]) {
    //                x += tgl.x * stv_g.scale;
    //                y += tgl.y;
    //                if (tgl.sc) out_XYAB('<text transform="translate(X,Y) scale(F)">B</text>\n', x, y, tgl.sc, tgl.c,isPassRpl);
    //                else out_XYAB('<text x="X" y="Y">A</text>\n', x, y, tgl.c, 0, isPassRpl);
    //                return
    //            }
    //            if (!glyphs[gl]) {
    //                error(1, null, "no definition of $1", gl);
    //                return
    //            }
    //            def_use(gl);
    //            out_XYAB('<use x="X" y="Y" xlink:href="#A"/>\n', x, y, gl, 0 ,isPassRpl)
    //        }
    var gla = [[], [], "", [], [], []];
    function glout() {
      var e,
        v = [];
      if (gla[0].length) {
        while (1) {
          e = gla[0].shift();
          if (e == undefined) break;
          v.push(e.toFixed(1));
        }
        output += '<text x="' + v.join(",");
        v = [];
        while (1) {
          e = gla[1].shift();
          if (e == undefined) break;
          v.push(e.toFixed(1));
        }
        output += '"\ny="' + v.join(",");
        output += '"\n>' + gla[2] + "</text>\n";
        gla[2] = "";
      }
      if (!gla[3].length) return;
      output += '<path class="sW" d="';
      while (1) {
        e = gla[3].shift();
        if (e == undefined) break;
        output +=
          "M" +
          e.toFixed(1) +
          " " +
          gla[3].shift().toFixed(1) +
          "v" +
          gla[3].shift().toFixed(1);
      }
      output += '"/>\n';
    }
    function xygl(x, y, gl, isPassRpl, s) {
      var tdeco = decos[gl];

      var cat = "";
      if (tdeco) {
        cat = "decos";
      }
      if (gl == "crescword" || gl == "decrescword" || gl == "dimword") {
        cat = "decos";
      }
      if (cat == "decos") {
        //这里是对装饰音的位置进行自定义的设置---2022-3-17 start
        var decoPosInfo = getDecoPos(s.istart, gl);
        if (decoPosInfo && (!s.calDecoPos || s.calDecoPos.indexOf(gl) < 0)) {
          if (!s.calDecoPos) s.calDecoPos = [];
          s.calDecoPos.push(gl);
          x += decoPosInfo.x;
          y += decoPosInfo.y;
        }
      }

      var decoInfoStr = "";
      if (s && s.curr_dd) {
        decoInfoStr +=
          ' decoIstart ="' +
          s.curr_dd.istart +
          '" decoIend ="' +
          s.curr_dd.iend +
          '" ';
      }
      //            var noteUpdateIndex = "";
      //            if(s &&s.notes && s.notes.length>0 && typeof(s.m)!="undefined"){
      //            	noteUpdateIndex = ' update_index="'+s.m+'" ';
      //            }
      if (glyphs[gl]) {
        if (s && s.curr_dd) {
          //自定义图片处理
          def_use(gl, s.curr_dd.path, s); //增加了一个s add by hxs
        } else {
          def_use(gl, null, s);
        }
        if (gl == "img" || gl == "fngs") {
          //图片处理 ，add by hxs
          //                	defs = defs.replace(/myimgid/g,s.curr_dd.path)///
          var pos = s.curr_dd.pos;
          var offset_x = 0;
          var offset_y = 0;
          if (pos == "<") {
            //在音符前面显示
            //                		offset_x = -20;
            //                		offset_y = -35;
          }
          if (musicType == 2) {
          } else {
            if (gl == "img") {
              if (
                s.curr_dd &&
                s.curr_dd.path &&
                s.curr_dd.path.indexOf("http") == 0
              ) {
                //直接传入地址的
                out_XYAB(
                  '<use cat="' +
                    cat +
                    '" istart="' +
                    s.istart +
                    '"' +
                    decoInfoStr +
                    ' type="' +
                    gl +
                    '" x="X" y="Y" xlink:href="#A"/>\n',
                  x + offset_x,
                  y + offset_y,
                  s.curr_dd.path.replace(/[.:/]/g, "")
                ); //图片要自定义多个use
              } else {
                out_XYAB(
                  '<use cat="' +
                    cat +
                    '" istart="' +
                    s.istart +
                    '"' +
                    decoInfoStr +
                    ' type="' +
                    gl +
                    '" x="X" y="Y" xlink:href="#A"/>\n',
                  x + offset_x,
                  y + offset_y,
                  gl + "_" + s.curr_dd.path
                ); //图片要自定义多个use
              }
            } else if (gl == "fngs") {
              out_XYAB(
                '<use cat="' +
                  cat +
                  '" istart="' +
                  s.istart +
                  '" type="' +
                  gl +
                  '" x="X" y="Y" xlink:href="#A"/>\n',
                x + offset_x,
                y + offset_y,
                gl + "_" + s.istart
              ); //同音换指
            }
          }
        } else {
          var istart = -1;
          if (s) {
            istart = s.istart;
          }
          if (
            "r_brackets_l" == gl ||
            "r_brackets_r" == gl ||
            "l_brackets" == gl
          ) {
            if (bracketsArr.indexOf(gl + istart) > -1) {
              return;
            }
            bracketsArr.push(gl + istart);
          }
          if (s && s.a_dd && s.a_dd.length > 1) {
            //                		y += 10;
          }
          out_XYAB(
            '<use cat="' +
              cat +
              '" istart="' +
              istart +
              '" type="' +
              gl +
              '" x="X" y="Y" xlink:href="#A"/>\n',
            x,
            y,
            gl
          );
        }
      } else {
        var tgl = tgls[gl];
        if (tgl) {
          x += tgl.x * stv_g.scale;
          y -= tgl.y;
          var istart = "";
          if (s) {
            istart = s.istart;
          }
          var parent_type = "";
          if (s && s.type == 5) {
            parent_type = ' parenttype="key" ';
          }
          if (tgl.sc)
            out_XYAB(
              '<text cat="' +
                cat +
                '" istart="' +
                istart +
                '" ' +
                parent_type +
                ' type="' +
                gl +
                '" class="' +
                (s ? (s.slur_istart ? s.slur_istart : s.istart) : "") +
                '" transform="translate(X,Y) scale(A)">B</text>\n',
              x,
              y,
              tgl.sc,
              tgl.c,
              isPassRpl
            );
          else
            out_XYAB(
              '<text cat="' +
                cat +
                '" istart="' +
                istart +
                '" ' +
                parent_type +
                ' type="' +
                gl +
                '"  class="' +
                (s ? (s.slur_istart ? s.slur_istart : s.istart) : "") +
                '" x="X" y="Y">A</text>\n',
              x,
              y,
              tgl.c,
              0,
              isPassRpl
            );
        } else {
          //                    error(1, null, 'no definition of $1', gl, 0 ,isPassRpl)
          error(1, null, "未定义的标记 $1", gl, 0, isPassRpl);
        }
      }
    }

    function xygl_spl(x, y, gl, isPassRpl, s) {
      var tgl = tgls[gl];
      if (tgl && !glyphs[gl]) {
        x += tgl.x * stv_g.scale;
        y += tgl.y;
        if (tgl.sc)
          out_XYAB(
            '<text transform="translate(X,Y) scale(F)">B</text>\n',
            x,
            y,
            tgl.sc,
            tgl.c,
            isPassRpl
          );
        else
          out_XYAB('<text x="X" y="Y">A</text>\n', x, y, tgl.c, 0, isPassRpl);
        return;
      }
      if (!glyphs[gl]) {
        error(1, null, "未定义的标记 $1", gl);
        return;
      }
      def_use(gl);
      //图片处理 add by hxs
      if (gl == "img") {
        defs = defs.replace(/myimgid/g, s.curr_dd.path);
        out_XYAB(
          '<use type="' + gl + '" x="X" y="Y" xlink:href="#A"/>\n',
          x,
          y,
          gl + "_" + s.curr_dd.path
        ); //图片要自定义多个use
      } else {
        out_XYAB(
          '<use type="' + gl + '" x="X" y="Y" xlink:href="#A"/>\n',
          x,
          y,
          gl
        );
      }

      out_XYAB_spl(
        '<use x="X" y="Y" xlink:href="#A"/>\n',
        x,
        y,
        gl,
        0,
        isPassRpl
      );
    }

    function out_acciac(x, y, dx, dy, up) {
      if (up) {
        x -= 1;
        y += 4;
      } else {
        x -= 5;
        y -= 4;
      }
      out_XYAB(
        '<path type="acciac" class="stroke" d="mX YlF G"/>\n',
        x,
        y,
        dx,
        -dy
      );
    }
    function out_bar(x, y, h, dotted, isbk, s) {
      if (musicType == 2 && !isbk) return;
      if (musicType == 2 && isbk) x += 0.7;
      var istartStr = "";
      if (s) {
        istartStr = " istart='" + s.istart + "' ";
      }
      output +=
        '<path type="bar"' +
        istartStr +
        ' class="stroke" stroke-width="1" ' +
        (dotted ? 'stroke-dasharray="5,5" ' : "") +
        'd="m' +
        (x + posx).toFixed(2) +
        " " +
        (posy - y).toFixed(2) +
        "v" +
        (-h).toFixed(2) +
        '"/>\n';
    }
    function out_bnum(x, y, str) {
      out_XYAB(
        '<text type="barnum" style="font-family:serif; font-style:italic; font-size:12px"\n\tx="X" y="Y" text-anchor="middle">A</text>\n',
        x,
        y,
        str.toString()
      );
    }
    //连谱线-大括号
    function out_brace(x, y, h) {
      x += posx - 6;
      y = posy - y;
      h /= 24;
      output +=
        '<text onclick="selScore(event,this)" type="brace" transform="translate(' +
        x.toFixed(2) +
        "," +
        y.toFixed(2) +
        ") scale(2.5," +
        h.toFixed(2) +
        ')">' +
        tgls.brace.c +
        "</text>\n";
    }
    // 连谱线-中括号;
    function out_bracket(x, y, h) {
      x += posx - 5;
      y = posy - y - 3;
      h += 2;
      output +=
        '<path onclick="selScore(event,this)" type="bracket" class="fill"\n\td="m' +
        x.toFixed(2) +
        " " +
        y.toFixed(2) +
        "\n\tc10.5 1 12 -4.5 12 -3.5c0 1 -3.5 5.5 -8.5 5.5\n\tv" +
        h.toFixed(2) +
        '\n\tc5 0 8.5 4.5 8.5 5.5c0 1 -1.5 -4.5 -12 -3.5"/>\n';
    }
    // （歌词）连字符
    function out_hyph(x, y, w) {
      //d的值不能居中，改成下面一句 update by hxs 2019-6-27
      //var n, a_y, d = 25 + (w / 20 | 0) * 3;
      var n,
        a_y,
        d = 25 + ((w / 2) | 0) * 3;
      if (w > 15) n = ((w - 15) / d) | 0;
      else n = 0;
      x += (w - d * n) / 2;
      // 这里歌词连线会出现多个，先去掉，改成下面一句 update by hxs 2019-6-27
      //out_XYAB('<path class="stroke" stroke-width="1.2"\n\tstroke-dasharray="5,A"\n\td="mX YhB"/>\n', x, y + 6, Math.round((d - 5) / stv_g.scale), d * n + 5, 1)
      out_XYAB(
        '<path type="hyph" class="stroke" stroke-width="1.2"\n\td="mX YhB"/>\n',
        x,
        y + 6,
        Math.round((d - 5) / stv_g.scale),
        5,
        1
      );
    }
    function test_output() {
      if (staff_tb != null && staff_tb.length > 0) {
        for (var i = 0; i < staff_tb.length; i++) {
          if (output.indexOf("-slur_transy_" + i) > -1) {
            output = output.replaceAll(
              "\\-slur_transy_" + i,
              staff_tb[i].y - 10
            );
          }
          if (output.indexOf("+slur_transy_" + i) > -1) {
            output = output.replaceAll(
              "\\+slur_transy_" + i,
              Math.abs(staff_tb[i].y) - Math.abs(staff_tb[i - 1].y)
            );
          }
        }
      }
    }
    // 符杆
    function out_stem(x, y, h, grace, nflags, straight, isPassRpl, isfail, s) {
      var dx = grace ? GSTEM_XOFF : 3.5,
        slen = -h;
      if (h < 0) dx = -dx;
      x += dx * stv_g.scale;
      if (stv_g.v >= 0) slen /= voice_tb[stv_g.v].scale;
      // 增加istart属性，在图形编辑的时候会用到
      out_XYAB(
        '<path type="stem" istart="' +
          s.istart +
          '" class="sW' +
          (s ? " " + (s.slur_istart ? s.slur_istart : s.istart) : "") +
          '" d="mX YvF" />\n',
        x,
        y,
        slen,
        0,
        isPassRpl
      );
      if (!nflags) return;
      // add by lhj
      if ((isfail || musicType != 2) && grace) {
        output += '<path type="stem" class="fill"\n\td="';
      }
      //
      y += h;
      if (h > 0) {
        if (!straight) {
          if (!grace) {
            // create by lhj
            xygl(x, y, "flu" + nflags, null, s);
            return;
          } else {
            // output += '<path d="'
            if (nflags == 1) {
              // 八分音符的符尾
              out_XYAB(
                "MX Yc0.6 3.4 5.6 3.8 3 10\n\t1.2 -4.4 -1.4 -7 -3 -7\n",
                x,
                y,
                0,
                0,
                isPassRpl
              );
            } else {
              while (--nflags >= 0) {
                // 十六分音符的符尾
                out_XYAB(
                  "MX Yc1 3.2 5.6 2.8 3.2 8\n\t1.4 -4.8 -2.4 -5.4 -3.2 -5.2\n",
                  x,
                  y,
                  0,
                  0,
                  isPassRpl
                );
                y -= 3.5;
              }
            }
          }
        } else {
          // output += '<path d="'
          if (!grace) {
            y += 1;
            while (--nflags >= 0) {
              out_XYAB("MX Yl7 3.2 0 3.2 -7 -3.2z\n", x, y, 0, 0, isPassRpl);
              y -= 5.4;
            }
          } else {
            while (--nflags >= 0) {
              out_XYAB("MX Yl3 1.5 0 2 -3 -1.5z\n", x, y, 0, 0, isPassRpl);
              y -= 3;
            }
          }
        }
      } else {
        if (!straight) {
          if (!grace) {
            // create by lhj
            xygl(x, y, "fld" + nflags, null, s);
            return;
          } else {
            output += '<path type="stem" d="';
            if (nflags == 1) {
              out_XYAB(
                "MX Yc0.6 -3.4 5.6 -3.8 3 -10\n\t1.2 4.4 -1.4 7 -3 7\n",
                x,
                y,
                0,
                0,
                isPassRpl
              );
            } else {
              while (--nflags >= 0) {
                out_XYAB(
                  "MX Yc1 -3.2 5.6 -2.8 3.2 -8\n\t1.4 4.8 -2.4 5.4 -3.2 5.2\n",
                  x,
                  y,
                  0,
                  0,
                  isPassRpl
                );
                y += 3.5;
              }
            }
          }
        } else {
          // output += '<path d="'
          if (!grace) {
            y += 1;
            while (--nflags >= 0) {
              out_XYAB("MX Yl7 -3.2 0 -3.2 -7 3.2z\n", x, y, 0, 0, isPassRpl);
              y += 5.4;
            }
          }
        }
      }
      // add by lhj
      if (isfail || musicType != 2) {
        output += '"/>\n';
      }
    }
    function out_thbar(x, y, h, s) {
      x += posx + 1.5;
      y = posy - y;
      if (musicType != 2) {
        var istartStr = "";
        if (s && s.istart) {
          istartStr = ' istart="' + s.istart + '" ';
        }
        output +=
          '<path type="thbar"' +
          istartStr +
          ' class="stroke" stroke-width="3" d="m' +
          x.toFixed(2) +
          " " +
          y.toFixed(2) +
          "v" +
          (-h).toFixed(2) +
          '"/>\n';
      }
    }

    function out_trem(x, y, ntrem, width, dir) {
      if (musicType == 2) return;

      out_XYAB('<path type="trem" class="fill test" d="mX Y\n\t', x - 4.5, y);
      while (1) {
        if (!width) {
          width = 9;
        }
        // 画不同方向的线add by hxs---------
        if (!dir) {
          output += "l" + width + " -3v3l-" + width + " 3z";
        } else {
          if (dir == "up") {
            output += "l" + width + " -3v3l-" + width + " 3z";
          } else if (dir == "down") {
            output += "l" + width + " 3v3l-" + width + " -3z";
          }
        }

        // end------------
        if (--ntrem <= 0) break;
        output += "m0 5.4";
      }
      output += '"/>\n';
    }
    function out_tubr(x, y, dx, dy, up) {
      if (musicType == 2) return;
      var h = up ? -3 : 3;
      y += h;
      dx /= stv_g.scale;
      output += '<path type="tubr" class="stroke" d="m';
      out_sxsy(x, " ", y);
      output +=
        "v" +
        h.toFixed(2) +
        "l" +
        dx.toFixed(2) +
        " " +
        (-dy).toFixed(2) +
        "v" +
        (-h).toFixed(2) +
        '"/>\n';
    }
    // 数字连音符
    var out_tubrn = function (x, y, dx, dy, up, str, s1) {
      var decoPosInfo = getDecoPos(s1.istart, "tubrn");
      if (decoPosInfo && (!s1.calDecoPos || s1.calDecoPos.indexOf(gl) < 0)) {
        if (!s1.calDecoPos) s1.calDecoPos = [];
        s1.calDecoPos.push("tubrn");
        x += decoPosInfo.x;
        y += decoPosInfo.y;
      }

      var sw = str.length * 10,
        h = up ? -3 : 3;
      out_XYAB(
        '<text cat="decos" istart="' +
          s1.istart +
          '" type="tubrn" style="font-family:serif; font-style:italic; font-size:12px"\n\tx="X" y="Y" text-anchor="middle">A</text>\n',
        x + dx / 2,
        y + dy / 2,
        str,
        0,
        1
      );
      dx /= stv_g.scale;
      if (!up) y += 6;
      output +=
        '<path class="stroke" cat="decos" istart="' + s1.istart + '" d="m';
      out_sxsy(x, " ", y);
      output +=
        "v" +
        h.toFixed(2) +
        "m" +
        dx.toFixed(2) +
        " " +
        (-dy).toFixed(2) +
        "v" +
        (-h).toFixed(2) +
        '"/>\n' +
        '<path cat="decos" istart="' +
        s1.istart +
        '" class="stroke" stroke-dasharray="' +
        ((dx - sw) / 2).toFixed(2) +
        " " +
        sw.toFixed(2) +
        '" d="m';
      out_sxsy(x, " ", y - h);
      output += "l" + dx.toFixed(2) + " " + (-dy).toFixed(2) + '"/>\n';
    };
    function out_wln(x, y, w) {
      out_XYAB(
        '<path type="wln" class="stroke" stroke-width="0.8" d="mX YhF"/>\n',
        x,
        y + 3,
        w
      );
    }
    var deco_str_style = {
      crdc: {
        dx: 0,
        dy: 5,
        style: "font-family:serif; font-style:italic; font-size:14px",
      },
      dacs: {
        dx: 0,
        dy: 3,
        style: "font-family:serif; font-size:" + cfmt.dacsfontsize + "px",
        anchor: ' text-anchor="middle"',
      },
      fng: {
        dx: 0,
        dy: 1,
        style: "font-family:Bookman; font-size:8px",
        anchor: ' text-anchor="middle"',
      },
      pf: {
        dx: 0,
        dy: 5, //这里改为15的话，离音符太远，先改回5 add by hxs 2022-7-22
        style: "font-family:AarvarkCafe; font-size:14px",
      },
      "@": {
        dx: 0,
        dy: 5,
        style: "font-family:sans-serif; font-size:14px",
      },
    };
    Abc.prototype.get_deco_str_style = deco_str_style;
    //输出装饰音
    function out_deco_str(x, y, name, str, anchor, s) {
      //增加了参数s
      var a,
        f,
        a_deco = deco_str_style[name];
      var dd = null;
      //这里处理上一个声部如果已经有相同的反复相关记号，则不再显示 add by hxs 2022-6-1
      if (s.ts_prev && s.ts_prev.a_dd) {
        dd = s.ts_prev.a_dd;
        if (dd) {
          if (
            dd.glyph == "coda" ||
            dd.glyph == "sgno" ||
            dd.glyph == "dacs" ||
            dd.glyph == "sgno"
          ) {
            for (var i = 0; i < dd.length; i++) {
              var d = dd[i];
              if (d.glyph == name || d.str == str) {
                return;
              }
            }
          }
        }
      }
      //end-----------------
      //这里是对装饰音的位置进行自定义的设置---2022-3-17 start
      var decoPosInfo = getDecoPos(s.istart, name);
      if (!decoPosInfo) {
        decoPosInfo = getDecoPos(s.istart, str);
      }
      if (name == "dacs") {
        var ddInfo = getA_ddInfo(s, name);
        var a_dd = s.a_dd;
        if (a_dd != null) {
          for (var i = 0; i < a_dd.length; i++) {
            var dd = a_dd[i];
            if (dd.glyph == "dacs") {
              if (
                dd.str.replace(/\s/g, "") == str.replace(/\s/g, "") ||
                dd.name.replace(/\s/g, "") == str.replace(/\s/g, "")
              ) {
                ddInfo = dd;
              }
            }
          }
        }
        decoPosInfo = getDecoPos(s.istart, ddInfo.name);
        //装饰音跟小节线左对齐
        if (decoPosInfo == null && ddInfo != null) {
          if (
            ddInfo.name == "D.C.alcoda" ||
            ddInfo.name == "D.S.alcoda" ||
            ddInfo.name == "D.C.alfine" ||
            ddInfo.name == "D.S.alfine"
          ) {
            x -= ddInfo.wl + 8;
          } else if (ddInfo.name == "D.C." || ddInfo.name == "D.S.") {
            x -= ddInfo.wl;
          } else if (ddInfo.name == "fine") {
            x -= ddInfo.wl + 4;
          } else if (ddInfo.name == "tocoda") {
            x -= ddInfo.wl + 6;
          }
        }
      }
      if (decoPosInfo && (!s.calDecoPos || s.calDecoPos.indexOf(name) < 0)) {
        if (!s.calDecoPos) s.calDecoPos = [];
        s.calDecoPos.push(name);
        x += decoPosInfo.x;
        y += decoPosInfo.y;
      }
      //这里是对装饰音的位置进行自定义的设置---end

      if (!a_deco) {
        //这里是预制的部分装饰音的样式
        xygl(x, y, name, null, s); //增加了参数s
        // xygl(x, y, name,("sfz" == name || "sfp" == name) && 1);// “sfz” create by lhj
        return;
      }
      x += a_deco.dx;
      y += a_deco.dy;
      if (!a_deco.def) {
        style += "\n." + name + " {" + a_deco.style + "}";
        a_deco.def = true;
      }
      // create by lhj
      var isPassRpl = 0;
      if (musicType == 2) {
        isPassRpl = 1;
      }
      // 如果本身有定义文本对齐方式，对替换掉默认的 add by hxs--------start
      var anchor_str = a_deco.anchor;
      if (anchor) {
        if (anchor_str) {
          anchor_str = anchor_str.replace("middle", anchor);
        }
      }
      // ----------end-----------
      var istart = ""; //add by hxs
      if (s) {
        istart = s.istart;
      }
      out_XYAB(
        '<text cat="decos" istart="' +
          istart +
          '" type="' +
          str +
          '" x="X" y="Y" class="A"B>',
        x,
        y,
        name,
        anchor_str || "",
        isPassRpl
      ); //增加了一些属性update by hxs
      set_font("annotation");
      out_str(str);
      output += "</text>\n";
    }
    function out_arp(x, y, val, def1, s) {
      var dist = 0;
      if (s.arp_seq) {
        var arp_link_item = arp_links.find(function (item) {
          return item.seq == s.arp_seq;
        });
        if (!s.arp_link) {
          arp_link_item.y1 = y;
          return;
        } else {
          dist = Math.abs(y - arp_link_item.y1);
        }
      }
      g_open(x, y, 270);
      x = 0;
      val = val + dist;
      val = Math.ceil(val / 6);
      while (--val >= 0) {
        // create by lhj
        xygl(x, 6, "ltr", null, s);
        x += 6;
      }
      g_close();
    }
    //简谱的
    function out_spl_arp(x, y, val) {
      g_open(x, y, 270);
      x = 0;
      y = -4;
      val = Math.ceil(val / 6);
      //這是向上的琶音
      //output += '<use x="4" y="'+(val+1)*6+'" xlink:href="#wedge" transform="rotate(-90)"><path id="wedge" class="fill" d="m0 -1l-1.5 -5h3l-1.5 5"></path></use>';
      //这是向下的琶音
      //output += '<use x="'+y+'" y="6" xlink:href="#wedge" transform="rotate(90)"><path id="wedge" class="fill" d="m0 -1l-1.5 -5h3l-1.5 5"></path></use>';
      while (--val >= 0) {
        xygl_spl(x, y, "ltr");
        x += 6;
      }
      g_close();
    }
    function out_arpup(x, y, val, s) {
      g_open(x, y, 270);
      x = 0;
      val = Math.ceil(val / 6);
      //這是向上的琶音
      output +=
        '<use cat="decos" type="arpup" x="6" y="' +
        (val + 1) * 6 +
        '" xlink:href="#wedge" transform="rotate(-90)"><path id="wedge" class="fill" d="m0 -1l-1.5 -5h3l-1.5 5"></path></use>';

      while (--val >= 0) {
        xygl(x, 6, "ltr");
        x += 6;
      }
      g_close();
    }
    function out_arpdown(x, y, val, s) {
      g_open(x, y, 270);
      x = 0;
      val = Math.ceil(val / 6);
      //這是向上的琶音
      //output += '<use x="4" y="'+(val+1)*6+'" xlink:href="#wedge" transform="rotate(-90)"><path id="wedge" class="fill" d="m0 -1l-1.5 -5h3l-1.5 5"></path></use>';
      //这是向下的琶音
      output +=
        '<use cat="decos" type="arpdown" istart="' +
        s.istart +
        '" x="-6" y="6" xlink:href="#wedge" transform="rotate(90)"><path id="wedge" class="fill" d="m0 -1l-1.5 -5h3l-1.5 5"></path></use>';
      while (--val >= 0) {
        xygl(x, 6, "ltr");
        x += 6;
      }
      g_close();
    }

    // 渐强
    function out_cresc(x, y, val, defl, s) {
      var a_dd = s.a_dd;
      var start;
      for (var i = 0; i < a_dd.length; i++) {
        if (a_dd[i].glyph == "cresc") {
          start = a_dd[i].istart;
        }
      }
      x += val;
      val = -val;

      var yShift = musicType == 2 ? -13 : 5; //简谱渐强渐弱放在第一小节时，太高了

      out_XYAB(
        '<path cat="decos" start="' +
          s.startJqJrNoteIstart +
          '" end="' +
          s.istart +
          '" type="jq" class="stroke jq"\n\td="mX YlA ',
        x,
        y + yShift,
        val,
        0,
        musicType == 2 ? 1 : 0
      );
      if (defl.nost)
        output += "-2.2m0 -3.6l" + (-val).toFixed(2) + ' -2.2"/>\n';
      else output += "-4l" + (-val).toFixed(2) + ' -4"/>\n';
    }
    // 渐弱
    function out_dim(x, y, val, defl, s) {
      var a_dd = s.a_dd;
      var start;
      for (var i = 0; i < a_dd.length; i++) {
        if (a_dd[i].glyph == "dim") {
          start = a_dd[i].istart;
        }
      }
      var yShift = musicType == 2 ? -1 : 5;
      // 下方无连音
      if (s.prev && !s.prev.beam_st) {
      }
      yShift = musicType == 2 ? -13 : 5;

      out_XYAB(
        '<path cat="decos" start="' +
          s.startJqJrNoteIstart +
          '" end="' +
          s.istart +
          '" type="jr" class="stroke jr"\n\td="mX YlA ',
        x,
        y + yShift,
        val,
        0,
        musicType == 2 ? 1 : 0
      );
      if (defl.noen)
        output += "-2.2m0 -3.6l" + (-val).toFixed(2) + ' -2.2"/>\n';
      else output += "-4l" + (-val).toFixed(2) + ' -4"/>\n';
    }
    //跨声部连音线
    function out_my_slur(x, y, val, defl, s) {
      console.log("out_my_slur:", s);
    }
    //贝赛尔连音线
    function out_my_bezier(x, y, val, defl, s) {
      var a_dd = s.a_dd;
      for (var i = 0; i < a_dd.length; i++) {
        var dd = a_dd[i];
        var glyph = dd.glyph;
        if ("my_bezier" == glyph) {
          var name = dd.name;
          if (name.indexOf("(") > -1) {
            if (bezier_slurs_left.indexOf(s.istart) < 0) {
              bezier_slurs_left.push(s.istart);
            }
          } else if (name.indexOf(")") > -1) {
            if (bezier_slurs_right.indexOf(s.istart) < 0) {
              bezier_slurs_right.push(s.prev.istart);
            }
          }
        }
      }
    }

    //普通的跨声部连音线
    function out_my_staff_slur(x, y, val, defl, s) {
      var a_dd = s.a_dd;
      for (var i = 0; i < a_dd.length; i++) {
        var dd = a_dd[i];
        var glyph = dd.glyph;
        if ("my_staff_slur" == glyph) {
          var name = dd.name;
          if (name.indexOf("(") > -1) {
            if (staff_slurs_left.indexOf(s.istart) < 0) {
              staff_slurs_left.push(s.istart);
            }
          } else if (name.indexOf(")") > -1) {
            if (staff_slurs_right.indexOf(s.istart) < 0) {
              staff_slurs_right.push(s.istart);
            }
          }
        }
      }
    }
    // 曲式图 add by hxs
    function out_musicform(x, y, val, defl, s) {
      return;
      y += 10;
      var obj = s.a_dd.find(function (item) {
        return item.dd_st.name == "m_form(";
      });

      if (!defl.nost) {
        out_XYAB('<path class="stroke" d="mX Yv6"/>\n', x, y);
        var text = obj ? obj.dd_st.desc : "";
        out_XYAB(
          '<text x="X" y="Y" style="font-family:serif; font-weight:bold; font-style:italic; font-size:12px">' +
            text +
            "</text>\n",
          x + val / 2 - text.length * 10,
          y + 3
        );
        //x += 12;
        val -= 12;
      } else {
        val -= 5;
      }
      //y += 6;
      out_XYAB('<path class="stroke" stroke="6,6" d="mX YhA"/>\n', x, y, val);
      if (!defl.noen)
        out_XYAB('<path class="stroke" d="mX Yv6"/>\n', x + val, y);
    }
    function out_ltr(x, y, val) {
      y += 4;
      val = Math.ceil(val / 6);
      while (--val >= 0) {
        xygl(x, y, "ltr");
        x += 6;
      }
    }
    function out_8va(x, y, val, defl, s) {
      //        	console.log("out_8va",s);
      var decoPosInfo = getDecoPos(s.istart, "8va");
      if (decoPosInfo && (!s.calDecoPos || s.calDecoPos.indexOf("8va") < 0)) {
        if (!s.calDecoPos) s.calDecoPos = [];
        s.calDecoPos.push(gl);
        x += decoPosInfo.x;
        y += decoPosInfo.y;
      }
      var startflag = false; //add by hxs 是否是第一行，有些8va标记有跨行显示的，第一行和后面的显示有差别
      if (!defl.nost) {
        var transform = "";
        if (s.my_vab_height) {
          transform = ' transform="translate(0,' + s.my_vab_height + ')" ';
        }
        out_XYAB(
          '<g type="8va" cat="decos"' +
            transform +
            ' start="' +
            s.startVabIstart +
            '" end="' +
            s.istart +
            '" style="pointer-events: auto;"><text type="8va" x="X" y="Y" \
    style="font:italic bold 12px serif">8\
    <tspan dy="-4" style="font-size:10px">va</tspan></text>\n',
          x - 8,
          y
        );
        x += 12;
        val -= 12;
        startflag = true;
      } else {
        startflag = false;
        val -= 5;
      }
      var tmpStr =
        ' type="8va" cat="decos" start="' +
        s.startVabIstart +
        '" end="' +
        s.istart +
        '" ';
      y += 6;
      out_XYAB(
        "<path " +
          tmpStr +
          ' class="stroke" stroke-dasharray="6,6" d="mX YhF"/>\n',
        x,
        y,
        val
      );
      if (!defl.noen)
        out_XYAB(
          '<path type="8va" cat="decos" start="' +
            s.startVabIstart +
            '" end="' +
            s.istart +
            '" pos="end" class="stroke" d="mX Yv6"/>\n',
          x + val,
          y
        );
      if (startflag) {
        out_XYAB("</g>"); //这里注释掉是因为如果不注释掉，其后面的音符的装修音的位置会错乱
      }
    }
    function out_8va_b(x, y, val, defl, s) {
      if (!defl.nost) {
        out_XYAB(
          '<text type="8va' +
            s.istart +
            '" x="X" y="Y" style="font:italic bold 12px serif">8<tspan dy="-4" style="font-size:10px">va</tspan></text>\n',
          x - 8,
          y
        );
        x += 12;
        val -= 12;
      } else {
        val -= 5;
      }
      //if (!defl.nost) {
      y += 6;
      out_XYAB(
        '<path type="8va' +
          s.istart +
          '" class="stroke" stroke-dasharray="6,6" d="mX YhF"/>\n',
        x,
        y,
        val
      );
      if (!defl.noen)
        out_XYAB(
          '<path type="8va' + s.istart + '" class="stroke" d="mX Yv-6"/>\n',
          x + val,
          y
        );
      //}
    }
    function out_8vb(x, y, val, defl, s) {
      console.log("out_8vb", s);
      var start = -1;
      if (s.a_dd) {
        for (var i = 0; i < s.a_dd.length; i++) {
          if (s.a_dd[i].glyph == "8vb") {
            start = s.a_dd[i].istart;
          }
        }
      }
      var transform = "";
      if (s.my_vab_height) {
        transform = ' transform="translate(0,' + s.my_vab_height + ')" ';
      }
      if (!defl.nost) {
        out_XYAB(
          '<g type="8vb" cat="decos"' +
            transform +
            ' start="' +
            s.startVabIstart +
            '" end="' +
            s.istart +
            '" style="pointer-events: auto;"><text type="8vb" x="X" y="Y" \
    style="font:italic bold 12px serif">8<tspan dy="-4" style="font-size:10px">vb</tspan></text>\n',
          x - 8,
          y
        );
        x += 4;
        val -= 4;
      } else {
        val -= 5;
      }
      //if (!defl.nost) {
      out_XYAB(
        '<path class="stroke" stroke-dasharray="6,6" d="mX YhF"/>\n',
        x,
        y,
        val
      );
      if (!defl.noen)
        out_XYAB('<path class="stroke" d="mX Yv-6"/>\n', x + val, y);
      //}
      //out_XYAB('</g>');//这里注释掉是因为如果不注释掉，其后面的音符的装修音的位置会错乱
    }
    function out_8vb_t(x, y, val, defl, s) {
      if (!defl.nost) {
        out_XYAB(
          '<text x="X" y="Y" \
    style="font:italic bold 12px serif">8<tspan dy="-4" style="font-size:10px">vb</tspan></text>\n',
          x - 8,
          y
        );
        x += 4;
        val -= 4;
      } else {
        val -= 5;
      }
      //if (!defl.nost) {
      out_XYAB(
        '<path class="stroke" stroke-dasharray="6,6" d="mX YhF"/>\n',
        x,
        y,
        val
      );
      if (!defl.noen)
        out_XYAB('<path class="stroke" d="mX Yv4"/>\n', x + val, y);
      //}
    }
    function out_15ma(x, y, val, defl, s) {
      console.log("out_15ma", s);
      var start = -1;
      if (s.a_dd) {
        for (var i = 0; i < s.a_dd.length; i++) {
          if (s.a_dd[i].glyph == "15ma") {
            start = s.a_dd[i].istart;
          }
        }
      }
      var transform = "";
      if (s.my_vab_height) {
        transform = ' transform="translate(0,' + s.my_vab_height + ')" ';
      }
      if (!defl.nost) {
        out_XYAB(
          '<g type="15ma" cat="decos"' +
            transform +
            ' start="' +
            s.startVabIstart +
            '" end="' +
            s.istart +
            '" style="pointer-events: auto;"><text type="15ma" x="X" y="Y" \
    style="font:italic bold 12px serif">15<tspan dy="-4" style="font-size:10px">va</tspan></text>\n',
          x - 10,
          y
        );
        x += 20;
        val -= 20;
      } else {
        val -= 5;
      }
      y += 6;
      out_XYAB(
        '<path class="stroke" stroke-dasharray="6,6" d="mX YhF"/>\n',
        x,
        y,
        val
      );
      if (!defl.noen)
        out_XYAB('<path class="stroke" d="mX Yv6"/>\n', x + val, y);
      //out_XYAB('</g>');//这里注释掉是因为如果不注释掉，其后面的音符的装修音的位置会错乱
    }
    function out_15mb(x, y, val, defl, s) {
      console.log("out_15mb", s);
      var start = -1;
      if (s.a_dd) {
        for (var i = 0; i < s.a_dd.length; i++) {
          if (s.a_dd[i].glyph == "15mb") {
            start = s.a_dd[i].istart;
          }
        }
      }
      var transform = "";
      if (s.my_vab_height) {
        transform = ' transform="translate(0,' + s.my_vab_height + ')" ';
      }
      if (!defl.nost) {
        out_XYAB(
          '<g type="15mb" cat="decos"' +
            transform +
            ' start="' +
            s.startVabIstart +
            '" end="' +
            s.istart +
            '" style="pointer-events: auto;"><text type="15mb" x="X" y="Y" \
    style="font:italic bold 12px serif">15<tspan dy="-4" style="font-size:10px">vb</tspan></text>\n',
          x - 10,
          y
        );
        x += 7;
        val -= 7;
      } else {
        val -= 5;
      }
      out_XYAB(
        '<path class="stroke" stroke-dasharray="6,6" d="mX YhF"/>\n',
        x,
        y,
        val
      );
      if (!defl.noen)
        out_XYAB('<path class="stroke" d="mX Yv-6"/>\n', x + val, y);
      // out_XYAB('</g>');//这里注释掉是因为如果不注释掉，其后面的音符的装修音的位置会错乱
    }
    var deco_val_tb = {
      arp: out_arp,
      arpup: out_arpup,
      arpdown: out_arpdown,
      cresc: out_cresc,
      my_staff_slur: out_my_staff_slur, //添加普通的跨声部连音线
      my_bezier: out_my_bezier, //添加s形的跨声部连音线
      dim: out_dim,
      ltr: out_ltr,
      musicform: out_musicform,
      "8va": out_8va,
      "8va_b": out_8va_b,
      "8vb": out_8vb,
      "8vb_t": out_8vb_t,
      "15ma": out_15ma,
      "15mb": out_15mb,
    };
    function out_deco_val(x, y, name, val, defl, s) {
      console.log("----name:", name, s.istart);
      var decoPosInfo = getDecoPos(s.istart, name);
      if (decoPosInfo && (!s.calDecoPos || s.calDecoPos.indexOf(name) < 0)) {
        if (!s.calDecoPos) s.calDecoPos = [];
        s.calDecoPos.push(name);
        x += decoPosInfo.x;
        y += decoPosInfo.y;
      }

      if (musicType != 2) {
        // create by lhj
        if (deco_val_tb[name]) deco_val_tb[name](x, y, val, defl, s);
        else error(1, null, "未定义的标记 '$1'", name);
      } else {
        // 简谱琶音的渲染
        if (name == "arp") {
          //debugger;
          //out_spl_arp(x, y, 100, defl, s);
          //deco_val_tb[name](x, y, val, defl, s);
        }
      }
      // staff_tb[s.st].y五线谱的临界值，小于该值符号显示在下面，简线混排简谱部分不显示，反之显示。
      if (!(y < staff_tb[s.st].y && musicType == 1)) {
        out_deco_val_spl(
          x,
          name,
          val,
          defl,
          s,
          y < staff_tb[s.st].y && staff_tb.length > 1
        );
      }
    }
    // 简谱的渐强、渐弱符号
    function out_deco_val_spl(x, name, val, defl, s, isDown) {
      // create by lhj
      if (0 == musicType || !("cresc" == name || "dim" == name)) {
        return;
      }

      var hei = 0,
        rny = 0;
      var noteObj = getNoteY(s.istart, s.st);
      if (isChordScore) {
        hei += noteObj.crdHei + noteObj.addHei;
        rny = noteObj.ymn;
      } else {
        rny = rtnNoteY(s.istart);
      }
      var nTop = staff_tb[s.st].y + rny - abc.sh(10); // 值越大越往下
      if (musicType == 2) {
        nTop =
          staff_tb[s.st].y +
          staff_tb[s.st].topbar * staff_tb[s.st].staffscale -
          hei +
          abc.sh(25);
        if (isDown) {
          // 显示在下面( created by lhj 20220309, 加了一个向下的判断；谱表高度 + 25)
          //console.log('out_deco_val_spl----', nTop)
          //nTop*=-1;//这个是不是有问题
          //nTop -= (abc.sh(46)+ abc.sh(25) ); //这一行和上一行代码，会导致多声部的渐强渐弱位置错乱，先去掉2022-9-26
          // 如果简谱上方有符号时，加上符号的高度（简谱会根据符号的高度将简谱往下方移）
          if (noteObj && noteObj.addHei > 0) {
            // noteObj.addHei：简谱上符号的高度；15： 渐强减弱的高度； 10：微调的值
            nTop -= abc.sh(15) + abc.sh(noteObj.addHei) + abc.sh(10);
          }
        }
      }
      // 存在数字连音（或连音线），避免与连音线交叉显示。
      // console.log('out_deco_val_spl--------------',s);
      //            if((s.in_tuplet || s && s.beam_st || s && s.beam_end || s.prev && s.prev.beam_st)&& !isDown ){
      //            	 nTop += 10;
      //            }
      if (
        (s.in_tuplet ||
          s.my_inslur ||
          (s.type == 0 && s.prev && s.prev.my_inslur)) &&
        !isDown
      ) {
        nTop += 10;
      }

      //            if(musicType == 2 && !isDown && !(s.in_tuplet || s && s.beam_st || s && s.beam_end || s.prev && s.prev.beam_st)){
      ///            	 nTop -= 10;
      //            }

      //var notelen = s.ctype == 'bar' ? s.prev.notes.length : s.notes.length;
      var notelen = 0;
      if (s.ctype == "bar") {
        if (s.prev && s.prev.notes) {
          notelen = s.prev.notes.length;
        }
      } else {
        notelen = s.notes.length;
      }
      if (notelen > 1) {
        //nTop += (circleSpace * 3 + 4 + underlineSpace * 3 + 4 + Number(chordFontSize-8) - circleMarginTop  + chordSpace ) * (notelen - 1);
        // 与staff2num-splnum.js 预留的和弦间距保持一致
        if (!isDown) {
          // 显示在上面
          nTop +=
            (circleSpace * 1 +
              1 +
              underlineSpace * 1 +
              1 +
              Number(chordFontSize - 8) -
              circleMarginTop +
              chordSpace) *
            (notelen - 1);
        }
      }

      var decoPosInfo = getDecoPos(s.istart, name);
      if (decoPosInfo && (!s.calDecoPos || s.calDecoPos.indexOf(name) < 0)) {
        if (!s.calDecoPos) s.calDecoPos = [];
        s.calDecoPos.push(name);
      }
      if (decoPosInfo) {
        x += decoPosInfo.x;
        nTop += decoPosInfo.y;
      }

      if (deco_val_tb[name]) deco_val_tb[name](x, nTop, val, defl, s);
    }
    function out_glisq(x2, y2, de) {
      var de1 = de.start,
        x1 = de1.x,
        y1 = de1.y + staff_tb[de1.st].y,
        ar = -Math.atan2(y2 - y1, x2 - x1),
        a = (ar / Math.PI) * 180,
        len = (x2 - x1) / Math.cos(ar);
      g_open(x1, y1, a);
      x1 = de1.s.dots ? 13 + de1.s.xmx : 8;
      len = ((len - x1 - 6) / 6) | 0;
      if (len < 1) len = 1;
      while (--len >= 0) {
        xygl(x1, 0, "ltr");
        x1 += 6;
      }
      g_close();
    }
    // 滑音
    function out_gliss(x2, y2, de) {
      if (musicType == 2) return;
      var de1 = de.start,
        x1 = de1.x,
        y1 = de1.y + staff_tb[de1.st].y,
        ar = -Math.atan2(y2 - y1, x2 - x1),
        a = (ar / Math.PI) * 180,
        len = (x2 - x1) / Math.cos(ar);
      g_open(x1, y1, a);
      x1 = de1.s.dots ? 13 + de1.s.xmx : 8;
      len -= x1 + 8;
      xypath(x1, 0);
      output += "l" + len.toFixed(2) + ' 0" stroke-width="1"/>\n';
      g_close();
    }
    var deco_l_tb = {
      glisq: out_glisq,
      gliss: out_gliss,
    };
    function out_deco_long(x, y, de) {
      var name = de.dd.glyph;
      if (deco_l_tb[name]) deco_l_tb[name](x, y, de);
      else error(1, null, "未定义的标记 '$1'", name);
    }
    function tempo_note(s, dur) {
      var p,
        elts = identify_note(s, dur);
      switch (elts[0]) {
        case C.OVAL:
          p = "\ueca2";
          break;
        case C.EMPTY:
          p = "\ueca3";
          break;
        default:
          switch (elts[2]) {
            case 2:
              p = "\ueca9";
              break;
            case 1:
              p = "\ueca7";
              break;
            default:
              p = "\ueca5";
              break;
          }
          break;
      }
      if (elts[1]) p += '<tspan dx=".1em">\uecb7</tspan>';
      return p;
    }
    function tempo_build(s) {
      var i,
        j,
        bx,
        p,
        wh,
        dy,
        w = 0,
        str = [];
      if (s.tempo_str) return;
      set_font("tempo");
      // console.log('tempo_build message', s);
      if (s.tempo_str1) {
        // str.push(s.tempo_str1);
        str.push(`<tspan type="speed_text">${s.tempo_str1}</tspan>`);
        w += strwh(s.tempo_str1)[0];
      }
      if((content_vue.m.scoreOpts.faceType==='txt' || content_vue.m.scoreOpts.faceType==='sign') && content_vue.m.scoreOpts.faceText){
        str.push(`<tspan type="face_text">${content_vue.m.scoreOpts.faceText}</tspan>`);
      }
      if (s.tempo_notes) {
        dy = ' dy="-.05em"';
        for (i = 0; i < s.tempo_notes.length; i++) {
          p = tempo_note(s, s.tempo_notes[i]);
          str.push(
            '<tspan\nclass="mtx" style="font-size:' +
              (gene.curfont.size * 1.3).toFixed(1) +
              '"' +
              dy +
              ">" +
              p +
              "</tspan>"
          );
          j = p.length > 1 ? 2 : 1;
          w += j * gene.curfont.swfac;
          dy = "";
        }
        str.push('<tspan dy=".065em">=</tspan>');
        w += cwidf("=");
        if (s.tempo_ca) {
          str.push(s.tempo_ca);
          w += strwh(s.tempo_ca)[0];
          j = s.tempo_ca.length + 1;
        }
        if (s.tempo) {
          //速度值，add by hxs
          str.push('<tspan id="tempospan">' + s.tempo + "</tspan>");
          w += strwh(s.tempo.toString())[0];
        } else {
          p = tempo_note(s, s.new_beat);
          str.push(
            '<tspan\nclass="mtx" style="font-size:' +
              (gene.curfont.size * 1.3).toFixed(1) +
              '" dy="-.05em">' +
              p +
              "</tspan>"
          );
          j = p.length > 1 ? 2 : 1;
          w += j * gene.curfont.swfac;
          dy = "y";
        }
      }
      if (s.tempo_str2) {
        if (dy) str.push('<tspan\n\tdy=".065em">' + s.tempo_str2 + "</tspan>");
        else str.push(s.tempo_str2);
        w += strwh(s.tempo_str2)[0];
      }
      s.tempo_str = str.join(" ");
      // 标记速度术语、表情术语
      if (content_vue.m.scoreOpts.speedType === "txt") {
        s.tempo_str = `<tspan type="speed_text">${content_vue.m.scoreOpts.speedText}</tspan>`;
        if((content_vue.m.scoreOpts.faceType==='txt' || content_vue.m.scoreOpts.faceType==='sign') && content_vue.m.scoreOpts.faceText){
          s.tempo_str +=`<tspan type="face_text"> ${content_vue.m.scoreOpts.faceText}</tspan>`;
        }
      }
      else if (content_vue.m.scoreOpts.speedType === "none") {
        s.tempo_str = `<tspan></tspan>`
        if((content_vue.m.scoreOpts.faceType==='txt' || content_vue.m.scoreOpts.faceType==='sign') && content_vue.m.scoreOpts.faceText){
          s.tempo_str +=`<tspan type="face_text">${content_vue.m.scoreOpts.faceText}</tspan>`;
        }
      }
      w += cwidf(" ") * (str.length - 1);
      s.tempo_wh = [w, 13.0];
      if (dy) s.tempo_dy = dy;
    }

    function writempo(s, x, y) {
      if (cfmt.hiddenspeed) {
        return;
      }
      var bx;
      set_font("tempo");
      if (gene.curfont.box) {
        gene.curfont.box = false;
        bx = x;
      }

      // 新增 create by lhj
      if (0 != musicType && !hasTempo) {
        var prevChar = source_val.slice(s.istart, s.iend);
        if (prevChar.indexOf("[") == -1) {
          // created by lhj 首调唱名后面的速度，不能显示为变换后的速度（带中括号的速度，系统认为是变换后速度）

          var w = 0,
            modeString;
          if (tmVal2key[getToneMark(source_val)]) {
            modeString = tmVal2key[getToneMark(source_val)].replace(
              /[_\^]/g,
              ""
            );
          }
          if (!modeString) {
            w = 4;
          }
          x = sh(tempoMgL + 28 + w + strwh("2")[0] + 30);
          if (source_val.indexOf("%%text") == -1) {
            y += typeof tempoMgB == "undefined" ? 0 : tempoMgB;
          }
          // 修改简谱右上角速度位置
          y -= 20;
          x -= 66;
        }
      }
      if(musicType==0){
        x = 0;
      }
      if (x < 0) {
        x = 0;
      }
      output +=
        '<text type="tempo" style="font-family:heiti;font-size:14px;font-weight:normal;" istart="' +
        s.istart +
        '" class="' +
        font_class(gene.curfont) +
        '" x="';
      out_sxsy(x, '" y="', y + gene.curfont.size * 0.2);
      output += '">' + s.tempo_str + "</text>\n";
      if (bx) {
        gene.curfont.box = true;
        bh = gene.curfont.size + 4;
        output += '<rect class="stroke" x="';
        out_sxsy(bx - 2, '" y="', y + bh - 1);
        output +=
          '" width="' +
          (s.tempo_wh[0] + 2).toFixed(1) +
          '" height="' +
          bh.toFixed(1) +
          '"/>\n';
      }
      s.del = true;
    }
    // 累计svg高度
    function vskip(h) {
      posy += h;
    }
    Abc.prototype.vskip = function () {
      return vskip(h);
    };
    // 用于生成uuid
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    // 生成uuid
    function uuid() {
      return (
        S4() +
        S4() +
        "" +
        S4() +
        "" +
        S4() +
        "" +
        S4() +
        "" +
        S4() +
        S4() +
        S4()
      );
    }
    function svg_flush(lineIndex) {
      if (multicol || !output || !user.img_out || posy == 0) return;

      if (abc.cfmt().showcm) {
        switchCmFontSize(); //调整唱名字体大小
      }
      var i,
        mtx = "music",
        head =
          '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" index="' +
          lineIndex +
          '" ondblclick="svgdblclickhandle(event)" onclick="svgclickhandler(evt)" page="pagenum" onmousemove="mousemovehandler(evt)" ontouchmove="mousemovehandler(evt)" id="' +
          lineIndex +
          '" class="music"\n\
     xmlns:xlink="http://www.w3.org/1999/xlink"\n\
     color="',
        g = "";
      glout();
      if (cfmt.fgcolor) head += cfmt.fgcolor + '" fill="' + cfmt.fgcolor + '"';
      else head += 'black"';
      head += ' stroke-width=".7"';
      if (cfmt.bgcolor)
        head += ' style="background-color: ' + cfmt.bgcolor + '"';
      posy *= cfmt.scale;
      if (user.imagesize) {
        head +=
          "\n" +
          user.imagesize +
          ' viewBox="0 0 ' +
          img.width.toFixed(0) +
          " " +
          posy.toFixed(0) +
          '">\n';
      } else {
        // updated by lin hq 如果谱子里有设置宽度，svg的宽度就按照设置的宽度来显示
        head +=
          ' viewBox="0 0 ' +
          img.width.toFixed(0) +
          " " +
          posy.toFixed(0) +
          '" '; //这里也要加上这个，不然分页的时候会出问题add by hxs 2021-4-1
        head +=
          '\n\twidth="' +
          (cfmt.pagewidth > 0 && cfmt.pagewidth > img.width.toFixed(0)
            ? cfmt.pagewidth
            : img.width.toFixed(0)) +
          'px" height="' +
          posy.toFixed(0) +
          'px" posy_top="' +
          posy_sum +
          '">\n';
        posy_sum += parseInt(posy.toFixed(0)); //add by hxs
      }
      // create by lhj
      font_style +=
        ".splfont{font-family:music,Microsoft YaHei;font-size:18px;font-weight:bold;font-style: normal;}";
      font_style += ".fng {font-family: Bookman;font-size: 8px;}";
      if (style || font_style || musicfont) {
        if (style.indexOf(".dacs {font-family:serif") > -1) {
          style = style.replace(
            /\.dacs.*/,
            ".dacs {font-family:serif; font-size:" + cfmt.dacsfontsize + "px}"
          );
        }
        head += '<style type="text/css">' + style + font_style;
        if (musicfont && (lineIndex == 0 || lineIndex == undefined)) {
          //editSvgLineIndex==0表示是编辑状态，且渲染第1行
          if (musicfont.indexOf("(") > 0) {
            head +=
              '\nsvg{font:24px music}\
    \n@font-face {\n\
      font-family:"music";\n\
      src:' +
              musicfont +
              "}";
            head +=
              '@font-face {\n  font-family: "AarvarkCafe";\n  src: ' +
              AarvarkCafeFont +
              "}";
          } else {
            head += "\nsvg{font:24px " + musicfont + "}";
            mtx = musicfont;
          }
        }
        head +=
          "\n.mtx{font-family:" +
          mtx +
          "}\
    \n</style>\n";
      }
      defs += fulldefs;
      if (defs) head += "<defs>" + defs + "\n</defs>\n";

      // 箭头的定义
      head += "<defs>\n";
      head += '<marker id="arrow" \n';
      head += 'markerUnits="strokeWidth" \n';
      head += 'markerWidth="12" \n';
      head += 'markerHeight="12" \n';
      head += 'viewBox="0 0 12 12" \n';
      head += 'refX="6" \n';
      head += 'refY="6" \n';
      head += 'orient="auto">\n';
      head +=
        '<path d="M2,2 L10,6 L2,10 L6,6 L2,2" style="fill: #000000;" />\n';
      head += "</marker>\n";
      head += "</defs>\n";
      // 颜射渐变
      head += "<defs>\n";
      head += '<linearGradient id="g34" x1="0%" y1="0%" x2="0" y2="100%">\n';
      head += '<stop offset="0%" stop-color="#0c82f5"></stop>\n';
      head += '<stop offset="33%" stop-color="#229dff"></stop>\n';
      head += '<stop offset="67%" stop-color="#003cff"></stop>\n';
      head += "</linearGradient>\n";
      head += "</defs>\n";
      // 添加形状
      head += "<defs>\n";
      head += '<path id="fablup" d="m-3.5 -3l7.2 0 0 6.2z" class="fill"/>\n';
      head += '<path id="fabldn" d="m-3.5 -3l7.2 6.2 -7.2 0z" class="fill"/>\n';
      head +=
        '<path id="labl" d="m-3.5 3l0 -6.2 7.2 0 0 6.2z" class="fill"/>\n';
      head +=
        '<path id="mibl" d="m0 3l-3.7 -3.2 3.7 -3.2 3.7 3.2z" class="fill"/>\n';
      head += "</defs>\n";
      // add by hxs
      head += "<defs>\n";
      head += '<text id="demo_black" x="0" y="0">\ue0a4</text>\n'; //黑色的符头
      head += "</defs>\n";
      head += "<defs>\n";
      head += '<text id="demo_light" x="0" y="0">\ue0a3</text>\n'; //白色的符头
      head += "</defs>\n";
      head += "<defs>\n";
      head +=
        '<text id="demo_black_chord" x="0" y="0"><tspan dx="0 -7.5 -7.5" dy="0 -6 -6">\ue0a4\ue0a4\ue0a4</tspan></text>\n'; //黑色和弦符头
      head += "</defs>\n";
      head += "<defs>\n";
      head +=
        '<text id="demo_light_chord" x="0" y="0"><tspan dx="0 -7.5 -7.5" dy="0 -6 -6">\ue0a3\ue0a3\ue0a3</tspan></text>\n'; //白色和弦符头
      head += "</defs>\n";
      head += "<defs>\n";
      // TODO 加一线样式
      head +=
        '<path id="my_hl" class="stroke" style="color: #0E518F;" stroke-width="1" d="m-6 0h12"></path>';
      head += "</defs>";
      // add by linhq
      head += "<defs>\n";
      head += '<text id="demo_black_circle" x="0" y="0">\ue0a3</text>\n';
      head += "</defs>\n";
      // 休止符 add by hxs
      head += "<defs>\n";
      head += '<text id="r32" x="0" y="0">\ue4e8</text>\n';
      head += "</defs>\n";
      // 休止符 add by hxs
      head += "<defs>\n";
      head += '<text id="r16" x="0" y="0">\ue4e7</text>\n';
      head += "</defs>\n";
      // 休止符 add by hxs
      head += "<defs>\n";
      head += '<text id="r8" x="0" y="0">\ue4e6</text>\n';
      head += "</defs>\n";
      // 休止符 add by hxs
      head += "<defs>\n";
      head += '<text id="r4" x="0" y="0">\ue4e5</text>\n';
      head += "</defs>\n";
      // 休止符 add by hxs
      head += "<defs>\n";
      head += '<text id="r2" x="0" y="0">\ue4e4</text>\n';
      head += "</defs>\n";
      // 休止符 add by hxs
      head += "<defs>\n";
      head += '<text id="r1" x="0" y="0">\ue4e3</text>\n';
      head += "</defs>\n";
      // 休止符 add by hxs
      head += "<defs>\n";
      head += '<text id="r0" x="0" y="0">\ue4e2</text>\n';
      head += "</defs>\n";
      //震音
      head += "<defs>\n";
      head +=
        '<g id="zy1" transform="rotate(-45)"><path class="stroke" stroke-width="1.2" stroke-linecap="round"\n\td="m-10 19 h12"/></g>'; //新增震音
      head +=
        '<g id="zy2" transform="rotate(-45)"><path class="stroke" stroke-width="1.2" stroke-linecap="round"\n\td="m-10 19 h12 m-10 5 h12"/></g>'; //新增震音
      head +=
        '<g id="zy3" transform="rotate(-45)"><path class="stroke" stroke-width="1.2" stroke-linecap="round"\n\td="m-10 19 h12 m-10 5 h12 m-10 5 h12"/></g>'; //新增震音
      head += "</defs>\n";
      // 休止符 add by hxs
      head += "<defs>\n";
      head +=
        '<path id="ltr" class="fill"\n\td="m0 -.4c2 -1.5 3.4 -1.9 3.9 .4 0.2 .8 .7 .7 2.1 -.4\n\tv0.8c-2 1.5 -3.4 1.9 -3.9 -.4 -.2 -.8 -.7 -.7 -2.1 .4z"/>';
      head += "</defs>\n";

      /*<defs>
    		    <pattern id="image" x="0" y="0" patternUnits="userSpaceOnUse" height="1" width="1">
    		      <image x="0" y="0" xlink:href="url.png"></image>
    		    </pattern>
    		  </defs>*/

      if (cfmt.scale != 1) {
        head +=
          '<g class="g" transform="scale(' + cfmt.scale.toFixed(2) + ')">\n';
        g = "</g>\n";
      }
      if (psvg) psvg.ps_flush(true);
      if (blkdiv > 0 && parseInt(editSvgLineIndex) <= 0) {
        //增加了编辑状态的判断add by hxs
        user.img_out(
          blkdiv == 1 ? '<div class="nobrk">' : '<div class="nobrk newpage">'
        );
        blkdiv = -1;
      }
      user.img_out(head + output + g + "</svg>");
      output = "";
      font_style = "";
      if (cfmt.fullsvg) {
        defined_glyph = {};
        for (i = 0; i < font_tb.length; i++) font_tb[i].used = false;
      } else {
        musicfont = "";
        style = "";
        fulldefs = "";
      }
      defs = "";
      posy = 0;
    }
    function blk_out() {
      if (multicol || !user.img_out) return;
      blk_flush();
      if (typeof block != "undefined") {
        if (user.page_format && !block.started) {
          block.started = true;
          if (block.newpage) {
            block.newpage = false;
            user.img_out('<div class="nobrk newpage">');
          } else {
            user.img_out('<div class="nobrk">');
          }
        }
      }
    }
    Abc.prototype.blk_out = blk_out;
    function blk_flush() {
      svg_flush();
      if (blkdiv < 0 && (!parse.state || cfmt.splittune)) {
        user.img_out("</div>");
        blkdiv = 0;
      }
    }
    Abc.prototype.blk_flush = blk_flush;
    var par_sy, cur_sy, voice_tb, curvoice, staves_found, vover, tsfirst;
    function voice_filter() {
      var opt;

      function vfilt(opts, opt) {
        var i,
          sel = new RegExp(opt);
        if (sel.test(curvoice.id) || sel.test(curvoice.nm)) {
          for (i = 0; i < opts.length; i++) self.do_pscom(opts[i]);
        }
      }
      if (parse.voice_opts)
        for (opt in parse.voice_opts) {
          if (parse.voice_opts.hasOwnProperty(opt))
            vfilt(parse.voice_opts[opt], opt);
        }
      if (parse.tune_v_opts)
        for (opt in parse.tune_v_opts) {
          if (parse.tune_v_opts.hasOwnProperty(opt))
            vfilt(parse.tune_v_opts[opt], opt);
        }
    }
    function sym_link(s) {
      if (!s.fname) set_ref(s);
      if (!curvoice.ignore) {
        parse.last_sym = s;
        s.prev = curvoice.last_sym;
        if (curvoice.last_sym) curvoice.last_sym.next = s;
        else curvoice.sym = s;
        curvoice.last_sym = s;
      }
      s.v = curvoice.v;
      s.p_v = curvoice;
      s.st = curvoice.cst;
      s.time = curvoice.time;
      if (s.time == 0) {
        currMeter = curvoice.meter.a_meter;
        s.my_meter = currMeter;
      }
      if (s.dur && !s.grace) curvoice.time += s.dur;
      s.pos = curvoice.pos;
      if (curvoice.second) s.second = true;
      if (curvoice.floating) s.floating = true;
    }
    function sym_add(p_voice, type) {
      var s = {
          type: type,
          dur: 0,
        },
        s2,
        p_voice2 = curvoice;
      curvoice = p_voice;
      sym_link(s);
      curvoice = p_voice2;
      s2 = s.prev;
      if (!s2) s2 = s.next;
      if (s2) {
        s.fname = s2.fname;
        s.istart = s2.istart;
        s.iend = s2.iend;
      }
      return s;
    }
    function mrest_expand(s) {
      var p_voice,
        s2,
        next,
        nb = s.nmes,
        dur = s.dur / nb;
      var a_dd = s.a_dd;
      s.type = C.REST;
      s.dur = dur;
      s.head = C.FULL;
      s.nflags = -2;
      next = s.next;
      p_voice = s.p_v;
      p_voice.last_sym = s;
      p_voice.time = s.time + dur;
      p_voice.cst = s.st;
      s2 = s;
      while (--nb > 0) {
        s2 = sym_add(p_voice, C.BAR);
        s2.bar_type = "|";
        s2 = sym_add(p_voice, C.REST);
        if (s.invis) {
          s2.invis = true;
        }
        s2.dur = dur;
        s2.head = C.FULL;
        s2.nflags = -2;
        p_voice.time += dur;
      }
      s2.next = next;
      if (next) next.prev = s2;
      s2.a_dd = a_dd;
    }
    //var w_tb = new Uint8Array([2, 1, 8, 0, 3, 5, 6, 9, 9, 0, 9, 3, 0, 7, 0, 0, 0, 0]);
    var w_tb = new Uint8Array([
      4, 1, 8, 0, 3, 5, 6, 9, 9, 0, 9, 3, 0, 7, 0, 0, 0, 0,
    ]);
    //排序所有音符（设置ts_next及ts_prev的值）
    function sort_all() {
      var s,
        s2,
        p_voice,
        v,
        time,
        w,
        wmin,
        ir,
        multi,
        prev,
        nb,
        ir2,
        v2,
        fl,
        new_sy,
        nv = voice_tb.length,
        vtb = [],
        vn = [],
        mrest_time = -1,
        sy = cur_sy;
      for (v = 0; v < nv; v++) vtb.push(voice_tb[v].sym);
      ir2 = nv;
      multi = -1;
      for (v = 0; v < nv; v++) {
        if (!sy.voices[v]) continue;
        ir = sy.voices[v].range;
        if (ir < ir2) ir2 = ir;
        vn[ir] = v;
        multi++;
      }
      v = vn[ir2];
      tsfirst = prev = vtb[v];
      if (!tsfirst) return;
      vtb[v] = tsfirst.next;
      prev.seqst = true;
      fl = !w_tb[prev.type] || tsfirst.type == tsfirst.next;
      while (1) {
        if (new_sy && fl) {
          sy = new_sy;
          new_sy = null;
          multi = -1;
          vn = [];
          for (v = 0; v < nv; v++) {
            if (!sy.voices[v]) continue;
            ir = sy.voices[v].range;
            vn[ir] = v;
            multi++;
          }
        }
        wmin = time = 1000000;
        for (ir = 0; ir < nv; ir++) {
          v = vn[ir];
          if (v == undefined) break;
          s = vtb[v];
          if (!s || s.time > time) continue;
          w = w_tb[s.type];
          if (s.time < time) {
            time = s.time;
            wmin = w;
          } else if (w < wmin) {
            wmin = w;
          }
          if (s.type == C.MREST) {
            if (s.nmes == 1) mrest_expand(s);
            else if (multi > 0) mrest_time = time;
          }
        }
        if (wmin > 127) break;
        if (time == mrest_time) {
          nb = 0;
          for (ir = 0; ir < nv; ir++) {
            v = vn[ir];
            if (v == undefined) break;
            s = vtb[v];
            if (!s || s.time != time || w_tb[s.type] != wmin) continue;
            if (s.type != C.MREST) {
              mrest_time = -1;
              break;
            }
            if (nb == 0) {
              nb = s.nmes;
            } else if (nb != s.nmes) {
              mrest_time = -1;
              break;
            }
          }
          if (mrest_time < 0) {
            for (ir = 0; ir < nv; ir++) {
              v = vn[ir];
              if (v == undefined) break;
              s = vtb[v];
              if (s && s.type == C.MREST) mrest_expand(s);
            }
          }
        }
        for (ir = 0; ir < nv; ir++) {
          v = vn[ir];
          if (v == undefined) break;
          s = vtb[v];
          if (!s || s.time != time || w_tb[s.type] != wmin) continue;
          if (s.type == C.STAVES) {
            new_sy = s.sy;
            for (ir2 = 0; ir2 < nv; ir2++) {
              if (vn[ir2] == undefined) break;
            }
            for (v2 = 0; v2 < nv; v2++) {
              if (!new_sy.voices[v2] || sy.voices[v2]) continue;
              vn[ir2++] = v2;
            }
          }
          if (fl) {
            fl = 0;
            s.seqst = true;
          }
          s.ts_prev = prev;
          prev.ts_next = s;
          prev = s;
          //复制歌词到另外一个声部
          if (user.copyLyric && s.type == 8 && !s.a_ly) {
            var cp_ly = null;
            if (standVsyms != null) {
              for (var ix = 0; ix < standVsyms.length; ix++) {
                var lys = standVsyms[ix];
                if (lys.a_ly && lys.time == s.time) {
                  cp_ly = clone(lys.a_ly);
                  s.a_ly = cp_ly;
                  break;
                }
              }
            }
          }
          //end-------------
          vtb[v] = s.next;
        }
        fl = wmin;
      }
    }
    function voice_adj(sys_chg) {
      var p_voice, s, s2, v;

      function set_feathered_beam(s1) {
        var s,
          s2,
          t,
          d,
          b,
          i,
          a,
          d = s1.dur,
          n = 1;
        for (s = s1; s; s = s.next) {
          if (s.beam_end || !s.next) break;
          n++;
        }
        if (n <= 1) {
          delete s1.feathered_beam;
          return;
        }
        s2 = s;
        b = d / 2;
        a = d / (n - 1);
        t = s1.time;
        if (s1.feathered_beam > 0) {
          for (s = s1, i = n - 1; s != s2; s = s.next, i--) {
            d = ((a * i) | 0) + b;
            s.dur = d;
            s.time = t;
            t += d;
          }
        } else {
          for (s = s1, i = 0; s != s2; s = s.next, i++) {
            d = ((a * i) | 0) + b;
            s.dur = d;
            s.time = t;
            t += d;
          }
        }
        s.dur = s.time + s.dur - t;
        s.time = t;
      }
      s = glovar.tempo;
      if (s && staves_found <= 0) {
        v = par_sy.top_voice;
        p_voice = voice_tb[v];
        if (p_voice.sym && p_voice.sym.type != C.TEMPO) {
          s = clone(s);
          s.v = v;
          s.p_v = p_voice;
          s.st = p_voice.st;
          s.time = 0;
          s.next = p_voice.sym;
          if (s.next) s.next.prev = s;
          p_voice.sym = s;
        }
      }
      for (v = 0; v < voice_tb.length; v++) {
        p_voice = voice_tb[v];
        if (!sys_chg && p_voice.sls.length) {
          while (1) {
            var sl = p_voice.sls.shift();
            if (!sl) break;
            s = sl.note.s;
            for (s2 = s.next; s2; s2 = s2.next) {
              if (s2.bar_type && s2.bar_type[0] == ":") break;
            }
            if (s2) {
              if (!s.sls) s.sls = [];
              s.sls.push({
                ty: sl.ty,
                note: {
                  s: s2,
                },
              });
            } else {
              syntax(1, "缺少右括号");
            }
          }
        }
        for (s = p_voice.sym; s; s = s.next) {
          if (s.time >= staves_found) break;
        }
        for (; s; s = s.next) {
          switch (s.type) {
            case C.GRACE:
              if (s.next && s.next.type == C.BAR) s.time--;
              if (!cfmt.graceword) continue;
              for (s2 = s.next; s2; s2 = s2.next) {
                switch (s2.type) {
                  case C.SPACE:
                    continue;
                  case C.NOTE:
                    if (!s2.a_ly) break;
                    s.a_ly = s2.a_ly;
                    s2.a_ly = null;
                    break;
                }
                break;
              }
              continue;
          }
          if (s.feathered_beam) set_feathered_beam(s);
        }
      }
    }
    function dupl_voice() {
      var p_voice,
        p_voice2,
        s,
        s2,
        g,
        g2,
        v,
        i,
        nv = voice_tb.length;
      for (v = 0; v < nv; v++) {
        p_voice = voice_tb[v];
        p_voice2 = p_voice.clone;
        if (!p_voice2) continue;
        p_voice.clone = null;
        for (s = p_voice.sym; s; s = s.next) {
          if (s.time >= staves_found) break;
        }
        p_voice2.clef = clone(p_voice.clef);
        curvoice = p_voice2;
        for (; s; s = s.next) {
          if (s.type == C.STAVES) continue;
          s2 = clone(s);
          if (s.notes) {
            s2.notes = [];
            for (i = 0; i <= s.nhd; i++) s2.notes.push(clone(s.notes[i]));
          }
          sym_link(s2);
          if (p_voice2.second) s2.second = true;
          else delete s2.second;
          if (p_voice2.floating) s2.floating = true;
          else delete s2.floating;
          delete s2.a_ly;
          g = s2.extra;
          if (!g) continue;
          g2 = clone(g);
          s2.extra = g2;
          s2 = g2;
          s2.v = p_voice2.v;
          s2.p_v = p_voice2;
          s2.st = p_voice2.st;
          for (g = g.next; g; g = g.next) {
            g2 = clone(g);
            if (g.notes) {
              g2.notes = [];
              for (i = 0; i <= g.nhd; i++) g2.notes.push(clone(g.notes[i]));
            }
            s2.next = g2;
            g2.prev = s2;
            s2 = g2;
            s2.v = p_voice2.v;
            s2.p_v = p_voice2;
            s2.st = p_voice2.st;
          }
        }
      }
    }
    function new_syst(init) {
      var st,
        v,
        sy_new = {
          voices: [],
          staves: [],
          top_voice: 0,
        };
      if (init) {
        cur_sy = par_sy = sy_new;
        return;
      }
      for (v = 0; v < voice_tb.length; v++) {
        if (par_sy.voices[v]) {
          st = par_sy.voices[v].st;
          var sy_staff = par_sy.staves[st],
            p_voice = voice_tb[v];
          if (p_voice.staffnonote != undefined)
            sy_staff.staffnonote = p_voice.staffnonote;
          if (p_voice.staffscale) sy_staff.staffscale = p_voice.staffscale;
        }
      }
      for (st = 0; st < par_sy.staves.length; st++) {
        sy_new.staves[st] = clone(par_sy.staves[st]);
        sy_new.staves[st].flags = 0;
      }
      par_sy.next = sy_new;
      par_sy = sy_new;
    }
    Abc.prototype.set_bar_num = function () {
      var s,
        s2,
        tim,
        bar_time,
        bar_num,
        rep_dtime,
        v = cur_sy.top_voice,
        wmeasure = voice_tb[v].meter.wmeasure,
        bar_rep = gene.nbar;
      for (s = tsfirst; ; s = s.ts_next) {
        if (!s) return;
        switch (s.type) {
          case C.METER:
            wmeasure = s.wmeasure;
          case C.CLEF:
          case C.KEY:
          case C.STBRK:
            continue;
          case C.BAR:
            if (s.bar_num) {
              gene.nbar = s.bar_num;
              break;
            }
            if (s.text && !cfmt.contbarnb) {
              if (s.text[0] == "1") {
                bar_rep = gene.nbar;
              } else {
                gene.nbar = bar_rep;
                s.bar_num = gene.nbar;
              }
            }
            break;
        }
        break;
      }
      bar_time = s.time + wmeasure;
      if (s.time == 0) {
        for (s2 = s.ts_next; s2; s2 = s2.ts_next) {
          if (s2.type == C.BAR && s2.time) {
            if (s2.time < bar_time) {
              s = s2;
              bar_time = s.time + wmeasure;
            }
            break;
          }
        }
      }
      bar_num = gene.nbar;
      for (; s; s = s.ts_next) {
        switch (s.type) {
          case C.METER:
            wmeasure = s.wmeasure;
            if (s.time < bar_time) bar_time = s.time + wmeasure;
            break;
          case C.MREST:
            bar_num += s.nmes - 1;
            while (s.ts_next && s.ts_next.type != C.BAR) s = s.ts_next;
            break;
          case C.BAR:
            if (s.time < bar_time) {
              if (s.text && s.text[0] == "1") {
                bar_rep = bar_num;
                rep_dtime = bar_time - s.time;
              }
              break;
            }
            tim = s.time;
            s2 = s;
            do {
              if (s2.dur) break;
              if (s2.type == C.BAR && s2.text) break;
              s2 = s2.next;
            } while (s2 && s2.time == tim);
            if (s.bar_num) bar_num = s.bar_num;
            else bar_num++;
            if (s2 && s2.type == C.BAR && s2.text) {
              if (/\d+/.exec(s2.text[0].replace(/\./g, ""))) {
                //有分段反复时 update by hxs
                //if (s2.text[0] == "1") {
                rep_dtime = 0;
                bar_rep = bar_num;
              } else {
                //if (!cfmt.contbarnb) bar_num = bar_rep; // 影响 my_bar_num
                if (rep_dtime) {
                  if (cfmt.contbarnb) bar_num--;
                  bar_time = tim + rep_dtime;
                  break;
                }
              }
            }
            s.bar_num = bar_num;
            s.my_bar_num = bar_num;

            //给后面声部的小节线加上小节序号
            var ts_next = s.ts_next;
            while (ts_next) {
              if (ts_next.type != 0) {
                break;
              }
              ts_next.my_bar_num = bar_num;

              //                    	//给小节的音符加上小节序号
              var tnext = ts_next.next;
              while (tnext) {
                if (tnext.type == 0) {
                  break;
                }
                tnext.my_bar_num = bar_num - 1;
                tnext = tnext.next;
              }

              ts_next = ts_next.ts_next;
            }
            //给小节的音符加上小节序号
            var next = s.next;
            while (next) {
              if (next.type == 0) {
                break;
              }
              next.my_bar_num = bar_num - 1;
              next = next.next;
            }

            bar_time = tim + wmeasure;
            while (s.ts_next && !s.ts_next.seqst) s = s.ts_next;
            break;
        }
      }
      if (cfmt.measurenb < 0) gene.nbar = bar_num;
    };
    function get_map(text) {
      if (!text) return;
      var i,
        note,
        notes,
        map,
        tmp,
        ns,
        a = info_split(text, 2);
      if (a.length < 3) {
        //                syntax(1, "Not enough parameters in %%map");
        syntax(1, "%%map参数设置不正确");
        return;
      }
      ns = a[1];
      if (ns.indexOf("octave,") == 0 || ns.indexOf("key,") == 0) {
        ns = ns.replace(/[,']+$/m, "").toLowerCase();
        if (ns[0] == "k") ns = ns.replace(/[_=^]+/, "");
      } else if (ns[0] == "*" || ns.indexOf("all") == 0) {
        ns = "all";
      } else {
        tmp = new scanBuf();
        tmp.buffer = a[1];
        note = parse_acc_pit(tmp);
        if (!note) {
          //                    syntax(1, "Bad note in %%map");
          syntax(1, "%%map中包含错语的音符");
          return;
        }
        //如果是h的音符，则不走下面的逻辑 add by hxs
        if (ns != "h") {
          ns = "abcdefg"[(note.pit + 77) % 7];
          if (note.acc) ns = ["__", "_", "", "^", "^^", "="][note.acc + 2] + ns;
          for (i = note.pit; i >= 28; i -= 7) ns += "'";
          for (i = note.pit; i < 21; i += 7) ns += ",";
        }
      }
      notes = maps[a[0]];
      if (!notes) maps[a[0]] = notes = {};
      map = notes[ns];
      if (!map) notes[ns] = map = [];
      if (!a[2]) return;
      i = 2;
      if (a[2].indexOf("=") < 0) {
        if (a[2][0] != "*") {
          tmp = new scanBuf();
          tmp.buffer = a[2];
          map[1] = parse_acc_pit(tmp);
        }
        if (!a[3]) return;
        i++;
        if (a[3].indexOf("=") < 0) {
          map[0] = a[3].split(",");
          i++;
        }
      }
      for (; i < a.length; i++) {
        switch (a[i]) {
          case "heads=":
            map[0] = a[++i].split(",");
            break;
          case "print=":
            tmp = new scanBuf();
            tmp.buffer = a[++i];
            map[1] = parse_acc_pit(tmp);
            break;
          case "color=":
            map[2] = a[++i];
            break;
        }
      }
    }
    function set_transp() {
      var s, transp, sndtran;
      if (curvoice.ckey.k_bagpipe || curvoice.ckey.k_drum) return;
      if (cfmt.transp && curvoice.transp)
        syntax(0, "Mix of old and new transposition syntaxes");
      if (
        cfmt.transp != undefined ||
        curvoice.transp != undefined ||
        curvoice.shift != undefined
      )
        transp =
          (cfmt.transp || 0) + (curvoice.transp || 0) + (curvoice.shift || 0);
      if (curvoice.sndtran != undefined || curvoice.sndsh != undefined)
        sndtran = (curvoice.sndtran || 0) + (curvoice.sndsh || 0);
      if (transp == undefined) {
        if (sndtran == undefined) return;
      } else {
        curvoice.vtransp = transp;
      }
      if (is_voice_sig()) {
        curvoice.key = s = clone(curvoice.okey);
      } else {
        s = curvoice.last_sym;
        while (1) {
          if (s.type == C.KEY) break;
          s = s.prev;
          if (!s) {
            s = curvoice.key;
            break;
          }
        }
      }
      if (transp != undefined) s.k_transp = transp;
      if (sndtran != undefined) s.k_sndtran = sndtran;
      curvoice.ckey = clone(s);
      if (curvoice.key.k_none) s.k_sf = 0;

      if (!s.hasOwnProperty("my_k_sf")) {
        s.my_k_sf = 0;
      }
    }
    function set_ottava() {
      var s,
        st,
        delta,
        note,
        g,
        o,
        m = nstaff + 1,
        staff_d = new Int16Array(new Array(m * 2)),
        staff_noo = new Int8Array(new Array(m));

      function ottava_add(s, ottava, start) {
        var dc_st = ["15mb(", "8vb(", null, "8va(", "15ma("],
          dc_en = ["15mb)", "8vb)", null, "8va)", "15ma)"];
        deco_cnv([(start ? dc_st : dc_en)[2 + ottava]], s);
      }
      for (st = 0; st <= nstaff; st++) {
        staff_d[st] = 0;
        staff_noo[st] = 0;
      }
      for (s = tsfirst; s; s = s.ts_next) {
        st = s.st;
        if (s.ottava != undefined || (s.extra && s.extra.ottava != undefined)) {
          var ottava = s.ottava ? s.ottava : s.extra.ottava;
          while (ottava.length) {
            o = ottava.shift();
            if (o) {
              //该声部如果已经有，就不再添加
              if (staff_noo[st]++ == 0) {
                ottava_add(s, o, true);
                staff_d[st] = -o * 7;
              }
            } else {
              if (--staff_noo[st] == 0) {
                if (s.extra) {
                  ottava_add(s.extra, -staff_d[st] / 7);
                } else {
                  ottava_add(s, -staff_d[st] / 7);
                }
                staff_d[st] = 0;
              }
            }
          }
        }
        switch (s.type) {
          case C.REST:
            if (voice_tb.length == 1) break;
          case C.NOTE:
            delta = staff_d[st];
            if (delta && !s.p_v.key.k_drum) {
              for (m = s.nhd; m >= 0; m--) {
                note = s.notes[m];
                if (!note.opit) note.opit = note.pit;
                note.pit += delta;
              }
            }
            break;
          case C.GRACE:
            for (g = s.extra; g; g = g.next) {
              delta = staff_d[st];
              if (delta && !s.p_v.key.k_drum) {
                for (m = 0; m <= g.nhd; m++) {
                  note = g.notes[m];
                  if (!note.opit) note.opit = note.pit;
                  note.pit += delta;
                }
              }
            }
            break;
        }
      }
    }
    function do_pscom(text) {
      var h1, val, s, cmd, param, n, k, b;
      cmd = text.match(/(\w|-)+/);
      if (!cmd) return;
      cmd = cmd[0];
      param = text.replace(cmd, "").trim();
      if (param.slice(-5) == " lock") {
        fmt_lock[cmd] = true;
        param = param.slice(0, -5).trim();
      } else if (fmt_lock[cmd]) {
        return;
      }
      switch (cmd) {
        //显示强弱拍 add by hxs
        case "showbeat":
          showBeat = true;
          return;
        case "showkew":
          showKew = true;
          return;
        case "showsd":
          showSD = true;
          return;
        case "showsd8":
          showSD8 = true;
          return;
        case "center":
          if (parse.state >= 2) {
            if (parse.state == 2) goto_tune();
            s = new_block("text");
            s.text = param;
            s.opt = "c";
            return;
          }
          write_text(param, "c");
          return;
        case "clef":
          if (parse.state >= 2) {
            if (parse.state == 2) goto_tune();
            s = new_clef(param);
            if (s) get_clef(s);
          }
          return;
        case "deco":
          deco_add(param);
          return;
        case "linebreak":
          set_linebreak(param);
          return;
        case "map":
          get_map(param);
          return;
        case "maxsysstaffsep":
          if (parse.state == 3) {
            par_sy.voices[curvoice.v].maxsep = get_unit(param);
            return;
          }
          break;
        case "multicol":
          generate(1);
          switch (param) {
            case "start":
              multicol = {
                posy: posy,
                maxy: posy,
                lmarg: cfmt.leftmargin,
                rmarg: cfmt.rightmargin,
                state: parse.state,
              };
              break;
            case "new":
              if (!multicol) {
                //syntax(1, "%%multicol new without start")
                syntax(1, "%%multicol new without start");
                break;
              }
              if (posy > multicol.maxy) multicol.maxy = posy;
              cfmt.leftmargin = multicol.lmarg;
              cfmt.rightmargin = multicol.rmarg;
              img.chg = true;
              set_page();
              posy = multicol.posy;
              break;
            case "end":
              if (!multicol) {
                syntax(1, "%%multicol end without start");
                break;
              }
              if (posy < multicol.maxy) posy = multicol.maxy;
              cfmt.leftmargin = multicol.lmarg;
              cfmt.rightmargin = multicol.rmarg;
              multicol = undefined;
              blk_flush();
              img.chg = true;
              set_page();
              break;
            default:
              //                            syntax(1, "Unknown keyword '$1' in %%multicol", param)
              syntax(1, " %%multicol 无法识别的设置 '$1'", param);
              break;
          }
          return;
        case "musicfont":
          musicfont = param;
          return;
        case "ottava":
          if (parse.state != 3) {
            if (parse.state != 2) return;
            goto_tune();
          }
          n = parseInt(param);
          if (isNaN(n) || n < -2 || n > 2) {
            syntax(1, errs.bad_val, "%%ottava");
            return;
          }
          glovar.ottava = true;
          parse.ottava.push(n);
          return;
        case "repbra":
          if (parse.state >= 2) {
            if (parse.state == 2) goto_tune();
            curvoice.norepbra = !get_bool(param);
          }
          return;
        case "repeat":
          if (parse.state != 3) return;
          if (!curvoice.last_sym) {
            syntax(1, "%%repeat cannot start a tune");
            return;
          }
          if (!param.length) {
            n = 1;
            k = 1;
          } else {
            b = param.split(/\s+/);
            n = parseInt(b[0]);
            k = parseInt(b[1]);
            if (
              isNaN(n) ||
              n < 1 ||
              (curvoice.last_sym.type == C.BAR && n > 2)
            ) {
              syntax(1, "Incorrect 1st value in %%repeat");
              return;
            }
            if (isNaN(k)) {
              k = 1;
            } else {
              if (k < 1) {
                syntax(1, "Incorrect 2nd value in %%repeat");
                return;
              }
            }
          }
          parse.repeat_n = curvoice.last_sym.type == C.BAR ? n : -n;
          parse.repeat_k = k;
          return;
        case "sep":
          var h2, len, values, lwidth;
          set_page();
          lwidth = img.width - img.lm - img.rm;
          h1 = h2 = len = 0;
          if (param) {
            values = param.split(/\s+/);
            h1 = get_unit(values[0]);
            if (values[1]) {
              h2 = get_unit(values[1]);
              if (values[2]) len = get_unit(values[2]);
            }
          }
          if (h1 < 1) h1 = 14;
          if (h2 < 1) h2 = h1;
          if (len < 1) len = 90;
          if (parse.state == 3) {
            s = new_block(cmd);
            s.x = (lwidth - len) / 2 / cfmt.scale;
            s.l = len / cfmt.scale;
            s.sk1 = h1;
            s.sk2 = h2;
            return;
          }
          vskip(h1);
          output += '<path class="stroke"\n\td="M';
          out_sxsy((lwidth - len) / 2 / cfmt.scale, " ", 0);
          output += "h" + (len / cfmt.scale).toFixed(1) + '"/>\n';
          vskip(h2);
          blk_flush();
          return;
        case "setbarnb":
          val = parseInt(param);
          if (isNaN(val) || val < 1) {
            //                        syntax(1, "Bad %%setbarnb value")
            syntax(1, "%%setbarnb 值不正确");
            break;
          }
          if (parse.state == 2) goto_tune();
          glovar.new_nbar = val;
          return;
        case "staff":
          if (parse.state != 3) {
            if (parse.state != 2) return;
            goto_tune();
          }
          val = parseInt(param);
          if (isNaN(val)) {
            //                        syntax(1, "Bad %%staff value '$1'", param)
            syntax(1, "%%staff 值不正确 '$1'", param);
            return;
          }
          var st;
          if (param[0] == "+" || param[0] == "-") st = curvoice.cst + val;
          else st = val - 1;
          if (st < 0 || st > nstaff) {
            //                        syntax(1, "Bad %%staff number $1 (cur $2, max $3)", st, curvoice.cst, nstaff)
            syntax(
              1,
              "%%staff 不正确的值 $1 (当前值 $2, 最大值 $3)",
              st,
              curvoice.cst,
              nstaff
            );
            return;
          }
          delete curvoice.floating;
          curvoice.cst = st;
          return;
        case "staffbreak":
          if (parse.state != 3) {
            if (parse.state != 2) return;
            goto_tune();
          }
          s = {
            type: C.STBRK,
            dur: 0,
          };
          if (param[0] >= "0" && param[0] <= "9") {
            s.xmx = get_unit(param);
            if (param.slice(-1) == "f") s.stbrk_forced = true;
          } else {
            s.xmx = 14;
            if (param[0] == "f") s.stbrk_forced = true;
          }
          sym_link(s);
          return;
        case "stafflines":
        case "staffscale":
        case "staffnonote":
          set_v_param(cmd, param);
          return;
        case "staves":
        case "score":
          if (parse.state == 0) return;
          if (parse.scores && parse.scores.length > 0) {
            text = parse.scores.shift();
            cmd = text.match(/([^\s]+)\s*(.*)/);
            get_staves(cmd[1], cmd[2]);
          } else {
            get_staves(cmd, param);
          }
          return;
        case "sysstaffsep":
          if (parse.state == 3) {
            par_sy.voices[curvoice.v].sep = get_unit(param);
            return;
          }
          break;
        case "text":
          if (parse.state >= 2) {
            if (parse.state == 2) goto_tune();
            s = new_block(cmd);
            s.text = param;
            s.opt = cfmt.textoption;
            return;
          }
          write_text(param, cfmt.textoption);
          return;
        case "urltext":
          // 添加超链接的文本 add by hxs
          if (parse.state >= 2) {
            s = new_block(cmd);
            s.text = cnv_escape(param);
            s.opt = cfmt.textoption;
            return;
          }
          write_text(cnv_escape(param), cfmt.textoption);
          return;
        case "transpose":
          if (cfmt.sound) return;
          val = get_transp(param);
          if (val == undefined) {
            val = get_interval(param);
            if (val == undefined) return;
          }
          switch (parse.state) {
            case 0:
              cfmt.transp = 0;
            case 1:
              cfmt.transp = (cfmt.transp || 0) + val;
              return;
          }
          for (s = curvoice.last_sym; s; s = s.prev) {
            switch (s.type) {
              case C.NOTE:
                s = clone(curvoice.okey);
                s.k_old_sf = curvoice.ckey.k_sf;
                sym_link(s);
                break;
              case C.KEY:
                break;
              default:
                continue;
            }
            break;
          }
          curvoice.transp = val;
          set_transp();
          return;
        case "tune":
          return;
        case "user":
          set_user(param);
          return;
        case "voicecolor":
          if (parse.state != 3) {
            if (parse.state != 2) return;
            goto_tune();
          }
          curvoice.color = param;
          return;
        case "hidescore":
          //隐藏某个声部，但有播放声音，这里只把该声部渲染为灰色
          if (user.hidescore) {
            console.log(param);
            var scoreArr = param.split(" ");
            for (var i = 0; i < scoreArr.length; i++) {
              var n = scoreArr[i];
              if (n.trim() != "") {
                if (voice_tb && voice_tb[parseInt(n) - 1]) {
                  voice_tb[parseInt(n) - 1].color = "gray";
                }
              }
            }
          }
          return;
        case "vskip":
          val = get_unit(param);
          if (val < 0) {
            //syntax(1, "%%vskip cannot be negative")
            syntax(1, "%%vskip 不能是负值");
            return;
          }
          if (parse.state == 3) {
            s = new_block(cmd);
            s.sk = val;
            return;
          }
          vskip(val);
          return;
        case "newpage":
        case "leftmargin":
        case "rightmargin":
        case "pagescale":
        case "pagewidth":
        case "printmargin":
        case "scale":
        case "staffwidth":
          if (parse.state >= 2) {
            if (parse.state == 2) goto_tune();
            s = new_block(cmd);
            s.param = param;
            return;
          }
          if (cmd == "newpage") {
            blk_flush();
            blkdiv = 2;
            return;
          }
          break;
      }
      set_format(cmd, param);
    }
    function do_begin_end(type, opt, text) {
      var i, j, action, s;
      switch (type) {
        case "js":
          js_inject(text);
          break;
        case "ml":
          if (parse.state == 3) {
            s = new_block(type);
            s.text = text;
          } else {
            blk_flush();
            if (user.img_out) user.img_out(text);
          }
          break;
        case "svg":
          j = 0;
          while (1) {
            i = text.indexOf('<style type="text/css">\n', j);
            if (i < 0) break;
            j = text.indexOf("</style>", i);
            if (j < 0) {
              syntax(1, "No </style> in %%beginsvg sequence");
              break;
            }
            style += text.slice(i + 23, j).replace(/\s+$/, "");
          }
          j = 0;
          while (1) {
            i = text.indexOf("<defs>\n", j);
            if (i < 0) break;
            j = text.indexOf("</defs>", i);
            if (j < 0) {
              syntax(1, "No </defs> in %%beginsvg sequence");
              break;
            }
            defs_add(text.slice(i + 6, j));
          }
          break;
        case "text":
          action = get_textopt(opt);
          if (!action) action = cfmt.textoption;
          if (text.indexOf("\\") >= 0) text = cnv_escape(text);
          if (parse.state >= 2) {
            if (parse.state == 2) goto_tune();
            s = new_block(type);
            s.text = text;
            s.opt = action;
            break;
          }
          write_text(text, action);
          break;
      }
    }
    // 开始生成
    function generate(in_mc) {
      var s, v, p_voice;
      if (parse.tp) {
        //syntax(1, "No end of tuplet")
        syntax(1, "N连音未正确结束");
        s = parse.tps;
        if (s) delete s.tp;
        delete parse.tp;
      }
      if (vover) {
        syntax(1, "No end of voice overlay");
        get_vover(vover.bar ? "|" : ")");
      }
      if (!voice_tb.length) return;
      voice_adj();
      dupl_voice();
      sort_all();
      if (!tsfirst) return;
      self.set_bar_num();
      pit_adj();
      if (user.get_abcmodel)
        user.get_abcmodel(tsfirst, voice_tb, anno_type, info);
      if (user.img_out) self.output_music();
      if (!in_mc) return;
      voice_tb = Object.create(voice_tb);
      for (v = 0; v < voice_tb.length; v++) {
        p_voice = voice_tb[v];
        p_voice.time = 0;
        p_voice.sym = p_voice.last_sym = null;
        delete p_voice.have_ly;
        p_voice.sls = [];
        p_voice.hy_st = 0;
        delete p_voice.bar_start;
      }
      staves_found = 0;
    }
    // 调整音高
    function pit_adj() {
      var i,
        p_v,
        s,
        sk,
        g,
        nv = voice_tb.length;
      while (--nv >= 0) {
        p_v = voice_tb[nv];
        if (p_v.vtransp == undefined) continue;
        if (p_v.key.k_transp) {
          sk = p_v.key;
          key_transp(sk);
        } else {
          sk = null;
        }
        s = p_v.sym;
        while (s) {
          if (!sk) {
            for (; s; s = s.next) {
              if (s.type == C.KEY && s.k_transp) break;
            }
          }
          for (; s; s = s.next) {
            switch (s.type) {
              case C.GRACE:
                for (g = s.extra; g; g = g.next) {
                  for (i = 0; i <= g.nhd; i++) note_transp(g, sk, g.notes[i]);
                }
                continue;
              case C.NOTE:
                for (i = 0; i <= s.nhd; i++) note_transp(s, sk, s.notes[i]);
                continue;
              case C.KEY:
                if (sk) s.k_sf = sk.k_sf;

                if (!s.hasOwnProperty("my_k_sf")) {
                  s.my_k_sf = sk.k_sf - 0;
                }
                key_transp(s);
                if (!s.k_transp) break;
                sk = s;
              default:
                continue;
            }
            break;
          }
          sk = null;
        }
      }
    }
    function key_transp(sk) {
      if (sk.k_a_acc || sk.k_none) return;
      var d,
        k_b40 = sk.k_b40,
        n_b40 = (k_b40 + 200 + sk.k_transp) % 40;
      d = abc2svg.b40k[n_b40] - n_b40;
      if (d) {
        if (sk.k_transp > 0) sk.k_transp += d;
        else sk.k_transp -= d;
        n_b40 += d;
      }
      sk.k_b40 = n_b40;
      var sf = abc2svg.b40sf[n_b40];
      sk.k_old_sf = sk.k_sf;
      sk.k_sf = sf;
      if (staffKSF == 9999) {
        staffKSF = sf;
      }

      if (!sk.hasOwnProperty("my_k_sf")) {
        sk.my_k_sf = sf - 0;
      }
      sk.k_map = abc2svg.keys[sf + 7];
    }
    function set_k_acc(s) {
      var i,
        j,
        n,
        nacc,
        p_acc,
        accs = [],
        pits = [],
        m_n = [],
        m_d = [];
      if (s.k_sf > 0) {
        for (nacc = 0; nacc < s.k_sf; nacc++) {
          accs[nacc] = 1;
          pits[nacc] = [26, 23, 27, 24, 21, 25, 22][nacc];
        }
      } else {
        for (nacc = 0; nacc < -s.k_sf; nacc++) {
          accs[nacc] = -1;
          pits[nacc] = [22, 25, 21, 24, 20, 23, 26][nacc];
        }
      }
      n = s.k_a_acc.length;
      for (i = 0; i < n; i++) {
        p_acc = s.k_a_acc[i];
        for (j = 0; j < nacc; j++) {
          if (pits[j] == p_acc.pit) {
            accs[j] = p_acc.acc;
            if (p_acc.micro_n) {
              m_n[j] = p_acc.micro_n;
              m_d[j] = p_acc.micro_d;
            }
            break;
          }
        }
        if (j == nacc) {
          accs[j] = p_acc.acc;
          pits[j] = p_acc.pit;
          if (p_acc.micro_n) {
            m_n[j] = p_acc.micro_n;
            m_d[j] = p_acc.micro_d;
          }
          nacc++;
        }
      }
      for (i = 0; i < nacc; i++) {
        p_acc = s.k_a_acc[i];
        if (!p_acc) p_acc = s.k_a_acc[i] = {};
        p_acc.acc = accs[i];
        p_acc.pit = pits[i];
        if (m_n[i]) {
          p_acc.micro_n = m_n[i];
          p_acc.micro_d = m_d[i];
        } else {
          delete p_acc.micro_n;
          delete p_acc.micro_d;
        }
      }
    }
    function acc_same_pitch(pitch) {
      var i,
        time,
        s = curvoice.last_sym.prev;
      if (!s) return;
      time = s.time;
      for (; s; s = s.prev) {
        switch (s.type) {
          case C.BAR:
            if (s.time < time) return;
            while (1) {
              s = s.prev;
              if (!s) return;
              if (s.type == C.NOTE) {
                if (s.time + s.dur == time) break;
                return;
              }
              if (s.time < time) return;
            }
            for (i = 0; i <= s.nhd; i++) {
              if (s.notes[i].pit == pitch && s.notes[i].ti1)
                return s.notes[i].acc;
            }
            return;
          case C.NOTE:
            for (i = 0; i <= s.nhd; i++) {
              if (s.notes[i].pit == pitch) return s.notes[i].acc;
            }
            break;
        }
      }
      return;
    }
    // 绘制大谱括号
    function get_staves(cmd, parm) {
      var s,
        p_voice,
        p_voice2,
        i,
        flags,
        v,
        vid,
        st,
        range,
        a_vf = parse_staves(parm);
      if (!a_vf) return;
      if (voice_tb.length) {
        voice_adj(true);
        dupl_voice();
      }
      var maxtime = 0,
        no_sym = true;
      for (v = 0; v < voice_tb.length; v++) {
        p_voice = voice_tb[v];
        if (p_voice.time > maxtime) maxtime = p_voice.time;
        if (p_voice.sym) no_sym = false;
      }
      if (no_sym || (maxtime == 0 && staves_found < 0)) {
        par_sy.staves = [];
        par_sy.voices = [];
      } else {
        for (v = 0; v < par_sy.voices.length; v++) {
          if (par_sy.voices[v]) {
            curvoice = voice_tb[v];
            break;
          }
        }
        curvoice.time = maxtime;
        s = {
          type: C.STAVES,
          dur: 0,
        };
        sym_link(s);
        par_sy.nstaff = nstaff;
        new_syst();
        s.sy = par_sy;
      }
      staves_found = maxtime;
      for (v = 0; v < voice_tb.length; v++) {
        p_voice = voice_tb[v];
        delete p_voice.second;
        delete p_voice.ignore;
        delete p_voice.floating;
      }
      range = 0;
      for (i = 0; i < a_vf.length; i++) {
        vid = a_vf[i][0];
        p_voice = new_voice(vid);
        p_voice.time = maxtime;
        v = p_voice.v;
        if (i == 0) par_sy.top_voice = p_voice.v;
        if (par_sy.voices[v]) {
          p_voice2 = clone(p_voice);
          par_sy.voices[voice_tb.length] = clone(par_sy.voices[v]);
          v = voice_tb.length;
          p_voice2.v = v;
          p_voice2.sym = p_voice2.last_sym = null;
          p_voice2.time = maxtime;
          voice_tb.push(p_voice2);
          delete p_voice2.clone;
          while (p_voice.clone) p_voice = p_voice.clone;
          p_voice.clone = p_voice2;
          p_voice = p_voice2;
        } else {
          par_sy.voices[v] = {};
        }
        a_vf[i][0] = p_voice;
        par_sy.voices[v].range = range++;
      }
      if (cmd[1] == "t") {
        for (i = 0; i < a_vf.length; i++) {
          flags = a_vf[i][1];
          if (!(flags & (OPEN_BRACE | OPEN_BRACE2))) continue;
          if (
            (flags & (OPEN_BRACE | CLOSE_BRACE)) ==
              (OPEN_BRACE | CLOSE_BRACE) ||
            (flags & (OPEN_BRACE2 | CLOSE_BRACE2)) ==
              (OPEN_BRACE2 | CLOSE_BRACE2)
          )
            continue;
          if (a_vf[i + 1][1] != 0) continue;
          if (flags & OPEN_PARENTH || a_vf[i + 2][1] & OPEN_PARENTH) continue;
          if (a_vf[i + 2][1] & (CLOSE_BRACE | CLOSE_BRACE2)) {
            a_vf[i + 1][1] |= FL_VOICE;
          } else if (
            a_vf[i + 2][1] == 0 &&
            a_vf[i + 3][1] & (CLOSE_BRACE | CLOSE_BRACE2)
          ) {
            a_vf[i][1] |= OPEN_PARENTH;
            a_vf[i + 1][1] |= CLOSE_PARENTH;
            a_vf[i + 2][1] |= OPEN_PARENTH;
            a_vf[i + 3][1] |= CLOSE_PARENTH;
          }
        }
      }
      st = -1;
      for (i = 0; i < a_vf.length; i++) {
        flags = a_vf[i][1];
        if (
          (flags & (OPEN_PARENTH | CLOSE_PARENTH)) ==
          (OPEN_PARENTH | CLOSE_PARENTH)
        ) {
          flags &= ~(OPEN_PARENTH | CLOSE_PARENTH);
          a_vf[i][1] = flags;
        }
        p_voice = a_vf[i][0];
        if (flags & FL_VOICE) {
          p_voice.floating = true;
          p_voice.second = true;
        } else {
          st++;
          if (!par_sy.staves[st]) {
            par_sy.staves[st] = {
              stafflines: "|||||",
              staffscale: 1,
            };
          }
          par_sy.staves[st].flags = 0;
        }
        v = p_voice.v;
        p_voice.st = p_voice.cst = par_sy.voices[v].st = st;
        par_sy.staves[st].flags |= flags;
        if (flags & OPEN_PARENTH) {
          p_voice2 = p_voice;
          while (i < a_vf.length - 1) {
            p_voice = a_vf[++i][0];
            v = p_voice.v;
            if (a_vf[i][1] & MASTER_VOICE) {
              p_voice2.second = true;
              p_voice2 = p_voice;
            } else {
              p_voice.second = true;
            }
            p_voice.st = p_voice.cst = par_sy.voices[v].st = st;
            if (a_vf[i][1] & CLOSE_PARENTH) break;
          }
          par_sy.staves[st].flags |= a_vf[i][1];
        }
      }
      if (st < 0) st = 0;
      par_sy.nstaff = nstaff = st;
      if (cmd[1] == "c") {
        for (st = 0; st < nstaff; st++) par_sy.staves[st].flags ^= STOP_BAR;
      }
      for (v = 0; v < voice_tb.length; v++) {
        p_voice = voice_tb[v];
        if (!par_sy.voices[v]) {
          p_voice.ignore = true;
          continue;
        }
        par_sy.voices[v].second = p_voice.second;
        st = p_voice.st;
        if (
          st > 0 &&
          !p_voice.norepbra &&
          !(par_sy.staves[st - 1].flags & STOP_BAR)
        )
          p_voice.norepbra = true;
      }
      curvoice = parse.state >= 2 ? voice_tb[par_sy.top_voice] : null;
    }
    function clone_voice(id) {
      var v, p_voice;
      for (v = 0; v < voice_tb.length; v++) {
        p_voice = voice_tb[v];
        if (p_voice.id == id) return p_voice;
      }
      p_voice = clone(curvoice);
      p_voice.v = voice_tb.length;
      p_voice.id = id;
      p_voice.sym = p_voice.last_sym = null;
      p_voice.key = clone(curvoice.key);
      delete p_voice.nm;
      delete p_voice.snm;
      delete p_voice.new_name;
      delete p_voice.lyric_restart;
      delete p_voice.lyric_cont;
      delete p_voice.ly_a_h;
      delete p_voice.sym_restart;
      delete p_voice.sym_cont;
      delete p_voice.have_ly;
      delete p_voice.have_picture; // 小节图片相关
      delete p_voice.pic_cont; // 小节图片相关
      delete p_voice.pic_restart; // 小节图片相关
      delete p_voice.pic_a_h; // 小节图片相关
      delete p_voice.tie_s;
      voice_tb.push(p_voice);
      return p_voice;
    }
    function get_vover(type) {
      var p_voice2,
        p_voice3,
        range,
        s,
        time,
        v,
        v2,
        v3,
        line = parse.line;

      if (curvoice.ignore) return;
      if (type == "|" || type == ")") {
        if (!curvoice.last_note) {
          syntax(1, errs.nonote_vo);
          return;
        }
        curvoice.last_note.beam_end = true;
        if (!vover) {
          syntax(1, "Erroneous end of voice overlay");
          return;
        }
        if (curvoice.time != vover.p_voice.time) {
          syntax(1, "Wrong duration in voice overlay");
          if (curvoice.time > vover.p_voice.time)
            vover.p_voice.time = curvoice.time;
        }
        curvoice = vover.p_voice;
        vover = null;
        return;
      }
      if (type == "(") {
        if (vover) {
          syntax(1, "Voice overlay already started");
          return;
        }
        vover = {
          p_voice: curvoice,
          time: curvoice.time,
        };
        return;
      }
      if (!curvoice.last_note) {
        syntax(1, errs.nonote_vo);
        return;
      }
      curvoice.last_note.beam_end = true;
      p_voice2 = curvoice.voice_down;
      if (!p_voice2) {
        p_voice2 = clone_voice(curvoice.id + "o");
        curvoice.voice_down = p_voice2;
        p_voice2.time = 0;
        p_voice2.second = true;
        v2 = p_voice2.v;
        par_sy.voices[v2] = {
          st: curvoice.st,
          second: true,
        };
        var f_clone = curvoice.clone != undefined ? 1 : 0;
        range = par_sy.voices[curvoice.v].range;
        for (v = 0; v < par_sy.voices.length; v++) {
          if (par_sy.voices[v] && par_sy.voices[v].range > range)
            par_sy.voices[v].range += f_clone + 1;
        }
        par_sy.voices[v2].range = range + 1;
        if (f_clone) {
          p_voice3 = clone_voice(p_voice2.id + "c");
          p_voice3.second = true;
          v3 = p_voice3.v;
          par_sy.voices[v3] = {
            second: true,
            range: range + 2,
          };
          p_voice2.clone = p_voice3;
        }
      }
      p_voice2.ulen = curvoice.ulen;
      p_voice2.dur_fact = curvoice.dur_fact;
      if (curvoice.uscale) p_voice2.uscale = curvoice.uscale;
      if (!vover) {
        vover = {
          bar: true,
          p_voice: curvoice,
        };
        time = p_voice2.time;
        for (s = curvoice.last_sym; ; s = s.prev) {
          if (s.type == C.BAR || s.time <= time) break;
        }
        vover.time = s.time;
      } else {
        if (curvoice != vover.p_voice && curvoice.time != vover.p_voice.time) {
          syntax(1, "Wrong duration in voice overlay");
          if (curvoice.time > vover.p_voice.time)
            vover.p_voice.time = curvoice.time;
        }
      }
      p_voice2.time = vover.time;
      curvoice = p_voice2;
      if (vover.bar) {
        sym_link({
          type: C.BAR,
          bar_type: type,
          dur: 0,
          multi: 0,
        });
      }
    }
    function is_voice_sig() {
      var s;
      if (!curvoice.sym) return true;
      if (curvoice.time != 0) return false;
      for (s = curvoice.last_sym; s; s = s.prev)
        if (w_tb[s.type] != 0) return false;
      return true;
    }
    function get_clef(s) {
      var s2, s3;
      if (is_voice_sig()) {
        curvoice.clef = s;
        return;
      }
      for (
        s2 = curvoice.last_sym;
        s2 && s2.prev && s2.time == curvoice.time;
        s2 = s2.prev
      ) {
        if (w_tb[s2.type] != 0) break;
      }
      if (
        s2 &&
        s2.prev &&
        s2.time == curvoice.time &&
        ((s2.type == C.KEY && !s2.k_none) || s2.type == C.BAR)
      ) {
        for (s3 = s2; s3.prev; s3 = s3.prev) {
          switch (s3.prev.type) {
            case C.KEY:
            case C.BAR:
              continue;
          }
          break;
        }
        s2 = curvoice.last_sym;
        curvoice.last_sym = s3.prev;
        sym_link(s);
        s.next = s3;
        s3.prev = s;
        curvoice.last_sym = s2;
      } else {
        sym_link(s);
      }
      s.clef_small = true;
    }
    function get_key(parm) {
      var v,
        p_voice,
        s,
        transp,
        sndtran,
        a = new_key(parm),
        s_key = a[0];
      a = a[1];
      switch (parse.state) {
        case 1:
          if (s_key.k_sf == undefined && !s_key.k_a_acc) {
            s_key.k_sf = 0;

            if (!s_key.hasOwnProperty("my_k_sf")) {
              s_key.my_k_sf = 0;
            }
            s_key.k_none = true;
            s_key.k_map = abc2svg.keys[7];
          }
          for (v = 0; v < voice_tb.length; v++) {
            p_voice = voice_tb[v];
            p_voice.key = clone(s_key);
            p_voice.okey = clone(s_key);
            p_voice.ckey = clone(s_key);
          }
          parse.ckey = s_key;
          if (a.length) memo_kv_parm("*", a);
          if (!glovar.ulen) glovar.ulen = C.BLEN / 8;
          parse.state = 2;
          return;
        case 2:
          goto_tune(true);
          break;
      }
      if (a.length) set_kv_parm(a);
      if (
        !curvoice.ckey.k_bagpipe &&
        !curvoice.ckey.k_drum &&
        (cfmt.transp != undefined ||
          curvoice.transp != undefined ||
          curvoice.shift != undefined)
      )
        transp =
          (cfmt.transp || 0) + (curvoice.transp || 0) + (curvoice.shift || 0);
      if (curvoice.sndtran != undefined || curvoice.sndsh != undefined)
        sndtran = (curvoice.sndtran || 0) + (curvoice.sndsh || 0);
      if (s_key.k_sf == undefined) {
        if (!s_key.k_a_acc && transp == undefined) {
          if (sndtran == undefined) return;
          s_key.k_play = true;
        }
        s_key.k_sf = curvoice.okey.k_sf;

        if (!s_key.hasOwnProperty("my_k_sf")) {
          s_key.my_k_sf = curvoice.okey.k_sf - 0;
        }
      }
      curvoice.okey = clone(s_key);
      if (transp != undefined) {
        curvoice.vtransp = transp;
        s_key.k_transp = transp;
      }
      if (sndtran != undefined) s_key.k_sndtran = sndtran;
      s_key.k_old_sf = curvoice.ckey.k_sf;
      if (!s_key.k_b40) s_key.k_b40 = curvoice.ckey.k_b40;
      curvoice.ckey = s_key;
      if (is_voice_sig()) {
        curvoice.key = clone(s_key);
        if (s_key.k_none) curvoice.key.k_sf = 0;

        if (!curvoice.key.hasOwnProperty("my_k_sf")) {
          curvoice.key.my_k_sf = 0;
        }
      } else {
        sym_link(s_key);
      }
    }
    function new_voice(id) {
      var p_voice,
        v,
        p_v_sav,
        n = voice_tb.length;
      if (n == 1 && voice_tb[0].default) {
        delete voice_tb[0].default;
        if (voice_tb[0].time == 0) {
          p_voice = voice_tb[0];
          p_voice.id = id;
          if (cfmt.transp && parse.state >= 2) {
            p_v_sav = curvoice;
            curvoice = p_voice;
            set_transp();
            curvoice = p_v_sav;
          }
          return p_voice;
        }
      }
      for (v = 0; v < n; v++) {
        p_voice = voice_tb[v];
        if (p_voice.id == id) return p_voice;
      }
      p_voice = {
        v: v,
        id: id,
        time: 0,
        new: true,
        pos: {
          dyn: 0,
          gch: 0,
          gst: 0,
          orn: 0,
          stm: 0,
          voc: 0,
          vol: 0,
          spl: 0, //简谱显示位置，9为居中
        },
        scale: 1,
        ulen: glovar.ulen,
        dur_fact: 1,
        key: clone(parse.ckey),
        ckey: clone(parse.ckey),
        okey: clone(parse.ckey),
        meter: clone(glovar.meter),
        wmeasure: glovar.meter.wmeasure,
        clef: {
          type: C.CLEF,
          clef_auto: true,
          clef_type: "a",
          time: 0,
        },
        acc: [],
        sls: [],
        hy_st: 0,
      };
      voice_tb.push(p_voice);
      return p_voice;
    }
    function init_tune() {
      nstaff = -1;
      voice_tb = [];
      curvoice = null;
      new_syst(true);
      staves_found = -1;
      gene = {};
      a_de = [];
      od = {};
    }
    function do_cloning(vs) {
      var i,
        eol,
        file = parse.file,
        start = parse.eol + 1,
        bol = start;
      while (1) {
        eol = file.indexOf("\n", bol);
        if (eol < 0) {
          eol = 0;
          break;
        }
        if (/%.*|\n.*|.:.|\[.:/.test(file.slice(eol + 1, eol + 4))) break;
        bol = eol + 1;
      }
      include++;
      tosvg(parse.fname, file, start, eol);
      for (i = 0; i < vs.length; i++) {
        get_voice(vs[i]);
        tosvg(parse.fname, file, start, eol);
      }
      include--;
    }
    function get_voice(parm) {
      var v,
        vs,
        a = info_split(parm),
        vid = a.shift();
      if (!vid) return;
      if (vid.indexOf(",") > 0) {
        vs = vid.split(",");
        vid = vs.shift();
      }
      if (parse.state < 2) {
        if (a.length) memo_kv_parm(vid, a);
        if (vid != "*" && parse.state == 1) curvoice = new_voice(vid);
        return;
      }
      if (vid == "*") {
        //	            syntax(1, "Cannot have V:* in tune body")
        syntax(1, "在音符区不能定义V:*");
        return;
      }
      curvoice = new_voice(vid);
      set_kv_parm(a);
      if (parse.state == 2) goto_tune();
      set_transp();
      v = curvoice.v;
      if (curvoice.new) {
        delete curvoice.new;
        if (staves_found < 0) {
          curvoice.st = curvoice.cst = ++nstaff;
          par_sy.nstaff = nstaff;
          par_sy.voices[v] = {
            st: nstaff,
            range: v,
          };
          par_sy.staves[nstaff] = {
            stafflines: curvoice.stafflines || "|||||",
            staffscale: 1,
          };
        }
        if (!par_sy.voices[v]) {
          if (staves_found >= 0) curvoice.ignore = true;
        }
      }
      if (
        !curvoice.filtered &&
        !curvoice.ignore &&
        (parse.voice_opts || parse.tune_v_opts)
      ) {
        curvoice.filtered = true;
        voice_filter();
      }
      if (vs) do_cloning(vs);
    }
    function goto_tune(is_K) {
      var v,
        p_voice,
        s = {
          type: C.STAVES,
          dur: 0,
          sy: par_sy,
        };
      set_page();
      write_heading();
      reset_gen();
      if (glovar.new_nbar) {
        gene.nbar = glovar.new_nbar;
        glovar.new_nbar = 0;
      } else {
        gene.nbar = 1;
      }
      parse.state = 3;
      if (!voice_tb.length) {
        get_voice("1");
        curvoice.clef.istart = curvoice.key.istart;
        curvoice.clef.iend = curvoice.key.iend;
        curvoice.default = true;
      } else if (!curvoice) {
        curvoice = voice_tb[staves_found < 0 ? 0 : par_sy.top_voice];
      }
      if (!curvoice.init && !is_K) {
        set_kv_parm([]);
        set_transp();
      }
      for (v = 0; v < voice_tb.length; v++) {
        p_voice = voice_tb[v];
        p_voice.ulen = glovar.ulen;
        if (p_voice.ckey.k_bagpipe && !p_voice.pos.stm) {
          p_voice.pos = clone(p_voice.pos);
          p_voice.pos.stm = C.SL_BELOW;
        }
      }
      if (staves_found < 0) {
        nstaff = voice_tb.length - 1;
        for (v = 0; v <= nstaff; v++) {
          p_voice = voice_tb[v];
          delete p_voice.new;
          p_voice.st = p_voice.cst = v;
          par_sy.voices[v] = {
            st: v,
            range: v,
          };
          par_sy.staves[v] = {
            stafflines: p_voice.stafflines || "|||||",
            staffscale: 1,
          };
        }
        par_sy.nstaff = nstaff;
      }
      p_voice = curvoice;
      curvoice = voice_tb[par_sy.top_voice];
      sym_link(s);
      curvoice = p_voice;
    }
    function get_sym(p, cont) {
      var s, c, i, j, d;
      if (curvoice.ignore) return;
      if (cont) {
        s = curvoice.sym_cont;
        if (!s) {
          syntax(1, "+: symbol line without music");
          return;
        }
      } else {
        if (curvoice.sym_restart) {
          curvoice.sym_start = s = curvoice.sym_restart;
          curvoice.sym_restart = null;
        } else {
          s = curvoice.sym_start;
        }
        if (!s) s = curvoice.sym;
        if (!s) {
          syntax(1, "s: without music");
          return;
        }
      }
      i = 0;
      while (1) {
        while (p[i] == " " || p[i] == "\t") i++;
        c = p[i];
        if (!c) break;
        switch (c) {
          case "|":
            while (s && s.type != C.BAR) s = s.next;
            if (!s) {
              syntax(1, "Not enough measure bars for symbol line");
              return;
            }
            s = s.next;
            i++;
            continue;
          case "!":
          case '"':
            j = ++i;
            i = p.indexOf(c, j);
            if (i < 0) {
              //syntax(1, c == '!' ? "No end of decoration" : "No end of guitar chord");
              syntax(1, c == "!" ? "装饰音未正确结束" : "吉他和弦未正确结束");
              i = p.length;
              continue;
            }
            d = p.slice(j - 1, i + 1);
            break;
          case "*":
            break;
          default:
            d = c.charCodeAt(0);
            if (d < 128) {
              d = char_tb[d];
              if (d.length > 1 && (d[0] == "!" || d[0] == '"')) {
                c = d[0];
                break;
              }
            }
            syntax(1, errs.bad_char, c);
            break;
        }
        while (s && (s.type != C.NOTE || s.grace)) s = s.next;
        if (!s) {
          syntax(1, "Too many elements in symbol line");
          return;
        }
        switch (c) {
          default:
            break;
          case "!":
            deco_cnv([d.slice(1, -1)], s, s.prev);
            break;
          case '"':
            a_gch = s.a_gch;
            parse_gchord(d);
            if (a_gch) self.gch_build(s);
            break;
        }
        s = s.next;
        i++;
      }
      curvoice.lyric_cont = s;
    }
    // 获取小节图片配置
    function get_note_pic(text, cont) {
      var s, word, p, i, j, ly, picW, picH, picTy, is_bar_pic;
      if (curvoice.ignore) return;
      if (curvoice.pos.voc != C.SL_HIDDEN) curvoice.have_picture = true;
      if (cont) {
        s = curvoice.picture_cont;
        if (!s) {
          syntax(1, "+: picture without music");
          return;
        }
      } else {
        set_font("vocal");
        if (curvoice.picture_restart) {
          curvoice.picture_start = s = curvoice.picture_restart;
          curvoice.picture_restart = null;
          curvoice.picture_line = 0;
        } else {
          curvoice.picture_line++;
          s = curvoice.picture_start;
        }
        if (!s) s = curvoice.sym;
        if (!s) {
          syntax(1, "w: without music");
          return;
        }
      }
      p = text;
      i = 0;
      while (1) {
        while (p[i] == " " || p[i] == "\t") i++;
        if (!p[i]) break;
        j = parse.istart + i + 2;
        switch (p[i]) {
          case "|":
            while (s && s.type != C.BAR) s = s.next;
            if (!s) {
              syntax(1, "Not enough measure bars for picture line");
              return;
            }
            s = s.next;
            i++;
            continue;
          /*	case "-":*/
          /*		word = "-\n";*/
          /*	break;
        			case "_":
        				word = "_\n";*/
          /*break;*/
          case "*":
            word = "";
            break;
          default:
            if (p[i] == "\\" && i == p.length - 1) {
              curvoice.picture_cont = s;
              return;
            }
            word = "";
            while (1) {
              if (!p[i]) break;
              switch (p[i]) {
                /*case "_":*/
                case "*":
                case "|":
                  i--;
                case " ":
                case "\t":
                  break;
                case "~":
                  word += " ";
                  i++;
                  continue;
                /*	case "-":
        						word += "\n";*/
                //        						break;
                case "\\":
                  word += p[++i];
                  i++;
                  continue;
                default:
                  word += p[i++];
                  continue;
              }
              break;
            }
            break;
        }
        //        		while (s && (s.type != C.NOTE || s.grace )){
        //        			// 如果是扩展音符则也要替换
        //        			if(s.is_ext){
        //        				break;
        //        			}
        //        			s = s.next;
        //        		}

        //如果想要在休止符中加入歌词，则在休止符后面加一个逗号
        var rest_use_lyric = check_rest_type(s);
        while (s && (s.type != C.NOTE || s.grace) && !rest_use_lyric) {
          s = s.next;
          rest_use_lyric = check_rest_type(s);
        }
        if (!s) {
          //syntax(1, "Too many words in picture line");
          syntax(1, "图片数多于音符数");
          return;
        }
        if (word && s.pos.voc != C.SL_HIDDEN) {
          if (word.match(/^\$\d/)) {
            if (word[1] == "0") set_font("vocal");
            else set_font("u" + word[1]);
            word = word.slice(2);
          }

          // <image:images/demo1.png&h=35&w=25&bar=1>
          // @params h 图片高
          // @params w 图片宽
          // @params bar 图片是否与小节同宽，参数值为1时传入w值无效。
          if (word) {
            word = word.replace(/\<|\>/g, "").split("&");
            picW =
              (
                word.find(function (a) {
                  return new RegExp("w=", "g").test(a);
                }) || ""
              ).replace("w=", "") - 0;
            picH =
              (
                word.find(function (a) {
                  return new RegExp("h=", "g").test(a);
                }) || ""
              ).replace("h=", "") - 0;
            picTy =
              (
                word.find(function (a) {
                  return new RegExp("ty=", "g").test(a);
                }) || ""
              ).replace("ty=", "") - 0;
            is_bar_pic = (
              word.find(function (a) {
                return new RegExp("bar=", "g").test(a);
              }) || ""
            ).replace("bar=", "");
            word = word[0];
          }
          ly = {
            t: word,
            font: gene.curfont,
            w: picW || 35,
            h: picH || 35,
            istart: j,
            ty: picTy || 0,
            iend: j + word.length + 2,
            is_bar_pic: is_bar_pic || 0,
          };
          if (!s.a_pic) s.a_pic = [];
          s.a_pic[curvoice.picture_line] = ly;
        }
        s = s.next;
        i++;
      }
      curvoice.picture_cont = s;
    }

    // 获取歌词
    function get_lyrics(text, cont) {
      var s, word, p, i, j, ly;
      if (curvoice.ignore) return;
      if (curvoice.pos.voc != C.SL_HIDDEN) curvoice.have_ly = true;
      if (cont) {
        s = curvoice.lyric_cont;
        if (!s) {
          syntax(1, "+: lyric without music");
          return;
        }
      } else {
        set_font("vocal");
        if (curvoice.lyric_restart) {
          curvoice.lyric_start = s = curvoice.lyric_restart;
          curvoice.lyric_restart = null;
          curvoice.lyric_line = 0;
        } else {
          curvoice.lyric_line++;
          s = curvoice.lyric_start;
        }
        if (!s) s = curvoice.sym;
        if (!s) {
          syntax(1, "w: without music");
          return;
        }
      }
      p = text;
      i = 0;
      var joffset = 0,
        k = 0; //add by hxs ,歌词位置错位功能需要的变量
      while (1) {
        while (p[i] == " " || p[i] == "\t") i++;
        if (!p[i]) break;
        //-----start add by hxs 歌词w: a中间如果有空格，会导致错位，所以加了这一段
        while (1) {
          switch (
            document.getElementById("source").value[parse.istart + i + 2 + k]
          ) {
            case " ":
            case "\t":
              k++;
              joffset++;
              continue;
          }
          break;
        }
        //-----end
        j = parse.istart + i + 2 + joffset; //增加了joffset

        switch (p[i]) {
          case "|":
            while (s && s.type != C.BAR) s = s.next;
            if (!s) {
              syntax(1, "Not enough measure bars for lyric line");
              return;
            }
            s = s.next;
            i++;
            continue;
          case "-":
            word = "-\n";
            break;
          case "_":
            word = "_\n";
            break;
          case "*":
            word = "";
            break;
          default:
            if (p[i] == "\\" && i == p.length - 1) {
              curvoice.lyric_cont = s;
              return;
            }
            word = "";
            while (1) {
              if (!p[i]) break;
              switch (p[i]) {
                //                                case '_'://不解析下划线了 hxs 2022-8-15
                case "*":
                case "|":
                  i--;
                case " ":
                case "\t":
                  break;
                case "~":
                  word += " ";
                  i++;
                  continue;
                case "-":
                  word += "\n";
                  break;
                case "\\":
                  word += p[++i];
                  i++;
                  continue;
                default:
                  word += p[i++];
                  continue;
              }
              break;
            }
            break;
        }
        //如果想要在休止符中加入歌词，则在休止符后面加一个逗号
        var rest_use_lyric = check_rest_type(s);
        while (s && (s.type != C.NOTE || s.grace) && !rest_use_lyric) {
          s = s.next;
          rest_use_lyric = check_rest_type(s);
        }
        if (!s) {
          //                    syntax(1, "Too many words in lyric line")
          syntax(1, "该行歌词数大于音符数");
          return;
        }
        if (word && s.pos.voc != C.SL_HIDDEN) {
          if (word.match(/^\$\d/)) {
            if (word[1] == "0") set_font("vocal");
            else set_font("u" + word[1]);
            word = word.slice(2);
          }
          ly = {
            t: word,
            font: gene.curfont,
            wh: strwh(word),
            istart: j,
            iend: j + word.length,
            my_node_index: s.my_node_index,
          };
          if (!s.a_ly) s.a_ly = [];
          // 添加歌词到a_ly数组
          s.a_ly[curvoice.lyric_line] = ly;
        }
        s = s.next;
        i++;
      }
      curvoice.lyric_cont = s;
    }

    function check_rest_type(s) {
      if (s && s.type == C.REST) {
        // 如果是休止符，则判断是否有逗号，如果有逗号，则可以放歌词
        var tmp_str = source_val.substring(s.istart, s.iend);
        if (tmp_str.indexOf(",") > -1) {
          return true;
        }
      }
      return false;
    }
    // create by lhj 打击乐象声词
    function get_strike(text, cont) {
      var s, word, p, i, j, ly;
      if (curvoice.ignore) return;
      if (curvoice.pos.voc != C.SL_HIDDEN) curvoice.have_strike = true;
      if (cont) {
        s = curvoice.strike_cont;
        if (!s) {
          syntax(1, "+: strike without music");
          return;
        }
      } else {
        set_font("vocal");
        if (curvoice.strike_restart) {
          curvoice.strike_start = s = curvoice.strike_restart;
          curvoice.strike_restart = null;
          curvoice.strike_line = 0;
        } else {
          curvoice.strike_line++;
          s = curvoice.strike_start;
        }
        if (!s) s = curvoice.sym;
        if (!s) {
          syntax(1, "w: without music");
          return;
        }
      }
      p = text;
      i = 0;
      while (1) {
        while (p[i] == " " || p[i] == "\t") i++;
        if (!p[i]) break;
        j = parse.istart + i + 2;
        switch (p[i]) {
          case "|":
            while (s && s.type != C.BAR) s = s.next;
            if (!s) {
              syntax(1, "Not enough measure bars for strike line");
              return;
            }
            s = s.next;
            i++;
            continue;
          case "-":
            word = "-\n";
            break;
          case "_":
            word = "_\n";
            break;
          case "*":
            word = "";
            break;
          default:
            if (p[i] == "\\" && i == p.length - 1) {
              curvoice.strike_cont = s;
              return;
            }
            word = "";
            while (1) {
              if (!p[i]) break;
              switch (p[i]) {
                case "_":
                case "*":
                case "|":
                  i--;
                case " ":
                case "\t":
                  break;
                case "~":
                  word += " ";
                  i++;
                  continue;
                case "-":
                  word += "\n";
                  break;
                case "\\":
                  word += p[++i];
                  i++;
                  continue;
                default:
                  word += p[i++];
                  continue;
              }
              break;
            }
            break;
        }
        while (s && (s.type != C.NOTE || s.grace)) {
          // 如果是扩展音符则也要替换
          if (s.is_ext) {
            break;
          }
          s = s.next;
        }
        if (!s) {
          syntax(1, "Too many words in strike line");
          return;
        }
        if (word && s.pos.voc != C.SL_HIDDEN) {
          if (word.match(/^\$\d/)) {
          }

          var grArr = word.match(/\{([\u4e00-\u9fa5]|\w)*\}/g);
          // 依音 象声词
          var gr = {};
          if (grArr) {
            word = word.replaceAll(/\{([\u4e00-\u9fa5]|\w)*\}/g, "");
            var grStr = grArr[0].replaceAll(/\{|\}/g, "");
            if (s.prev && s.prev.extra) {
              var grs = clone(s.prev.extra);
              //debugger;
              for (
                var cur_gr = grs, gr_index = 0;
                cur_gr;
                cur_gr = cur_gr.next, gr_index++
              ) {
                if (!cur_gr.grace) {
                  break;
                }
                gr[cur_gr.istart] = grStr[gr_index];
              }
            }
          }

          ly = {
            t: word,
            t_gr: grStr,
            t_gr_arr: gr,
            font: gene.curfont,
            w: strwh(word)[0],
            istart: j,
            iend: j + word.length,
          };
          if (!s.a_stk) s.a_stk = [];
          s.a_stk[curvoice.strike_line] = ly;
        }
        s = s.next;
        i++;
      }
      curvoice.strike_cont = s;
    }
    // 小节图片相关
    function pic_width(s, wlw) {
      var ly,
        sz,
        swfac,
        align,
        xx,
        w,
        i,
        j,
        k,
        shift,
        p,
        a_pic = s.a_pic;
      align = 0;
      for (i = 0; i < a_pic.length; i++) {
        ly = a_pic[i];
        if (!ly) continue;
        p = ly.t;
        if (p == "-\n" || p == "_\n") {
          ly.shift = 0;
          continue;
        }
        //        		w = ly.wh[0];
        w = ly.w;
        swfac = ly.font.swfac;
        xx = w + 2 * cwid(" ") * swfac;
        if (s.type == C.GRACE) {
          shift = s.wl;
        } else if (
          (p[0] >= "0" && p[0] <= "9" && p.length > 2) ||
          p[1] == ":" ||
          p[0] == "(" ||
          p[0] == ")"
        ) {
          if (p[0] == "(") {
            sz = cwid("(") * swfac;
          } else {
            j = p.indexOf(" ");
            set_font(ly.font);
            if (j > 0) sz = strwh(p.slice(0, j))[0];
            else sz = w * 0.2;
          }
          shift = (w - sz + 2 * cwid(" ") * swfac) * 0.4;
          if (shift > 20) shift = 20;
          shift += sz;
          if (ly.t[0] >= "0" && ly.t[0] <= "9") {
            if (shift > align) align = shift;
          }
        } else {
          shift = xx * 0.4;
          if (shift > 20) shift = 20;
        }
        ly.shift = shift;
        if (wlw < shift) wlw = shift;
        xx -= shift;
        shift = 2 * cwid(" ") * swfac;
        for (k = s.next; k; k = k.next) {
          switch (k.type) {
            case C.NOTE:
            case C.REST:
              if (!k.a_pic || !k.a_pic[i]) xx -= 9;
              else if (k.a_pic[i].t == "-\n" || k.a_pic[i].t == "_\n")
                xx -= shift;
              else break;
              if (xx <= 0) break;
              continue;
            case C.CLEF:
            case C.METER:
            case C.KEY:
              xx -= 10;
              continue;
            default:
              xx -= 5;
              break;
          }
          break;
        }
        if (xx > s.wr) s.wr = xx;
      }
      if (align > 0) {
        for (i = 0; i < a_pic.length; i++) {
          ly = a_pic[i];
          if (ly && ly.t[0] >= "0" && ly.t[0] <= "9") ly.shift = align;
        }
      }
      return wlw;
    }
    function ly_width(s, wlw) {
      var ly,
        sz,
        swfac,
        align,
        xx,
        w,
        i,
        j,
        k,
        shift,
        p,
        a_ly = s.a_ly;
      align = 0;
      for (i = 0; i < a_ly.length; i++) {
        ly = a_ly[i];
        if (!ly) continue;
        p = ly.t;
        if (lyricBgReg.test(p)) {
          //如果有背景色设置
          //                	console.log(p)
          p = p.replace(lyricBgReg, "");
        }
        if (lyricColorReg.test(p)) {
          p = p.replace(lyricColorReg, "");
        }
        if (p == "-\n" || p == "_\n") {
          ly.shift = 0;
          continue;
        }
        w = ly.wh[0];
        swfac = ly.font.swfac;
        xx = w + 2 * cwid(" ") * swfac;
        if (s.type == C.GRACE) {
          shift = s.wl;
        } else if (
          (p[0] >= "0" && p[0] <= "9" && p.length > 2) ||
          p[1] == ":" ||
          p[0] == "(" ||
          p[0] == ")"
        ) {
          if (p[0] == "(") {
            sz = cwid("(") * swfac;
          } else {
            j = p.indexOf(" ");
            set_font(ly.font);
            if (j > 0) sz = strwh(p.slice(0, j))[0];
            else sz = w * 0.2;
          }
          shift = (w - sz + 2 * cwid(" ") * swfac) * 0.4;
          if (shift > 20) shift = 20;
          shift += sz;
          if (ly.t[0] >= "0" && ly.t[0] <= "9") {
            if (shift > align) align = shift;
          }
        } else {
          shift = xx * 0.4;
          if (shift > 20) shift = 20;
        }
        ly.shift = shift;
        if (wlw < shift) wlw = shift;
        xx -= shift;
        shift = 2 * cwid(" ") * swfac;
        for (k = s.next; k; k = k.next) {
          switch (k.type) {
            case C.NOTE:
            case C.REST:
              if (!k.a_ly || !k.a_ly[i]) xx -= 9;
              else if (k.a_ly[i].t == "-\n" || k.a_ly[i].t == "_\n")
                xx -= shift;
              else break;
              if (xx <= 0) break;
              continue;
            case C.CLEF:
            case C.METER:
            case C.KEY:
              xx -= 10;
              continue;
            default:
              xx -= 5;
              break;
          }
          break;
        }
        if (xx > s.wr) s.wr = xx;
      }
      if (align > 0) {
        for (i = 0; i < a_ly.length; i++) {
          ly = a_ly[i];
          if (ly && ly.t[0] >= "0" && ly.t[0] <= "9") ly.shift = align;
        }
      }
      return wlw;
    }
    //小节图片相关：绘制每行小节图片
    function draw_pic_line(p_voice, j, y) {
      var p, lastx, w, s, s2, ly, lyl, hyflag, lflag, x0, font, shift;
      if (p_voice.hy_st & (1 << j)) {
        hyflag = true;
        p_voice.hy_st &= ~(1 << j);
      }
      for (s = p_voice.sym; ; s = s.next)
        if (s.type != C.CLEF && s.type != C.KEY && s.type != C.METER) break;
      lastx = s.prev ? s.prev.x : tsfirst.x;
      x0 = 0;
      for (; s; s = s.next) {
        if (s.a_pic) ly = s.a_pic[j];
        else ly = null;
        if (!ly) {
          switch (s.type) {
            case C.REST:
            case C.MREST:
              if (lflag) {
                out_wln(lastx + 3, y, x0 - lastx);
                lflag = false;
                lastx = s.x + s.wr;
              }
          }
          continue;
        }

        if (ly.font != gene.curfont) gene.curfont = font = ly.font;
        p = ly.t;
        w = ly.w;
        shift = ly.shift;
        if (shift == undefined) {
          shift = 0;
        }
        if (hyflag) {
          if (p == "_\n") {
            p = "-\n";
          } else if (p != "-\n") {
            out_hyph(lastx, y, s.x - shift - lastx);
            hyflag = false;
            lastx = s.x + s.wr;
          }
        }
        if (lflag && p != "_\n") {
          out_wln(lastx + 3, y, x0 - lastx + 3);
          lflag = false;
          lastx = s.x + s.wr;
        }
        if (p == "-\n" || p == "_\n") {
          if (x0 == 0 && lastx > s.x - 18) lastx = s.x - 18;
          if (p[0] == "-") hyflag = true;
          else lflag = true;
          if (isChinese2txt(p) && musicType != 0) {
            x0 = s.x - shift / 2; // 歌词偏移原来的一半 create by lhj
          } else {
            x0 = s.x - shift;
          }
          continue;
        }

        if (isChinese2txt(p) && musicType != 0) {
          x0 = s.x - shift / 2; // 歌词偏移原来的一半 create by lhj
        } else {
          x0 = s.x - shift;
        }
        // 全音休止符处理
        if (s.type == C.REST && s.dur == s.p_v.wmeasure) {
          var s2 = s.ts_next;
          while (s2 && s2.time != s.time + s.dur) s2 = s2.ts_next;
          var x2 = s2 ? s2.x : realwidth;
          s2 = s;
          while (!s2.seqst) s2 = s2.ts_prev;
          s2 = s2.ts_prev;

          x0 = s2.x + (x2 - s2.x) / 2 - 5;
        }

        //右对齐 add by hxs
        if (p.indexOf("[R]") == 0) {
          p = p.replace("[R]", "");
          p = p.replace(/\[S\]/g, " ");
          var chinese_p = p.replace(/[a-zA-Z/.]|\d/g, "");
          var p_len = chinese_p.length - 1;
          if (p_len < 1) {
            p_len = 1;
          }
          if (musicType != 0) {
            x0 = x0 - (w / p.length) * p_len + 15;
          } else {
            x0 = x0 - (w / p.length) * p_len + 19;
          }
        } else if (p.indexOf("[L]") == 0) {
          p = p.replace("[L]", "");
          p = p.replace(/\[S\]/g, " ");
          var chinese_p = p.replace(/[a-zA-Z]/g, "");
          var p_len = chinese_p.length - 1;
          if (p_len < 1) {
            p_len = 1;
          }
          if (musicType != 0) {
            x0 = x0 + ((w / p.length) * p_len) / 2;
          } else {
            x0 = x0 + ((w / p.length) * p_len) / 2;
          }
        } else if (p.indexOf("[C]") == 0) {
          p = p.replace("[C]", "");
          p = p.replace(/\[S\]/g, " ");
          var chinese_p = p.replace(/[a-zA-Z]/g, "");
          var p_len = chinese_p.length - 1;
          if (p_len < 1) {
            p_len = 1;
          }
          if (musicType != 0) {
            x0 = x0 - ((w / p.length) * p_len) / 2;
          } else {
            x0 = x0 - ((w / p.length) * p_len) / 2;
          }
        }

        if (p.slice(-1) == "\n") {
          p = p.slice(0, -1);
          hyflag = true;
        }
        if (user.anno_start || user.anno_stop) {
          s2 = {
            st: s.st,
            istart: ly.istart,
            iend: ly.iend,
            x: x0,
            y: y,
            ymn: y,
            ymx: y + gene.curfont.size,
            wl: 0,
            wr: w - 0,
          };
          anno_start(s2, "notePic");
        }
        //xy_str(x0, y, p);
        //增加了颜色参数
        xy_str(x0, y, p, "notePic", null, cfmt.lyriccolor, ly, s);
        anno_stop(s2, "notePic");
        lastx = x0 + w;
      }
      if (hyflag) {
        hyflag = false;
        x0 = realwidth - 10;
        if (x0 < lastx + 10) x0 = lastx + 10;
        out_hyph(lastx, y, x0 - lastx);
        if (cfmt.hyphencont) p_voice.hy_st |= 1 << j;
      }
      for (p_voice.s_next; s; s = s.next) {
        if (s.type == C.NOTE) {
          if (!s.a_pic) break;
          ly = s.a_pic[j];
          if (ly && ly.t == "_\n") {
            lflag = true;
            x0 = realwidth - 15;
            if (x0 < lastx + 12) x0 = lastx + 12;
          }
          break;
        }
      }
      if (lflag) {
        out_wln(lastx + 3, y, x0 - lastx + 3);
        lflag = false;
      }
    }
    // 绘制歌词行
    function draw_lyric_line(p_voice, j, y) {
      var p, lastx, w, s, s2, ly, lyl, hyflag, lflag, x0, font, shift;
      if (p_voice.hy_st & (1 << j)) {
        hyflag = true;
        p_voice.hy_st &= ~(1 << j);
      }
      for (s = p_voice.sym; ; s = s.next)
        if (s.type != C.CLEF && s.type != C.KEY && s.type != C.METER) break;
      lastx = s.prev ? s.prev.x : tsfirst.x;
      x0 = 0;
      for (; s; s = s.next) {
        if (s.a_ly) ly = s.a_ly[j];
        else ly = null;
        if (!ly) {
          switch (s.type) {
            case C.REST:
            case C.MREST:
              if (lflag) {
                out_wln(lastx + 3, y, x0 - lastx);
                lflag = false;
                lastx = s.x + s.wr;
              }
          }
          continue;
        }

        if (ly.font != gene.curfont) gene.curfont = font = ly.font;
        p = ly.t;
        w = ly.wh[0];
        shift = ly.shift;
        if (shift == undefined) {
          shift = 0;
        }
        if (p.indexOf("&mid&") > -1) {
          shift = 5;
        }
        if (hyflag) {
          if (p == "_\n") {
            p = "-\n";
          } else if (p != "-\n") {
            out_hyph(lastx, y, s.x - shift - lastx);
            hyflag = false;
            lastx = s.x + s.wr;
          }
        }
        if (lflag && p != "_\n") {
          out_wln(lastx + 3, y, x0 - lastx + 3);
          lflag = false;
          lastx = s.x + s.wr;
        }
        if (p == "-\n" || p == "_\n") {
          if (x0 == 0 && lastx > s.x - 18) lastx = s.x - 18;
          if (p[0] == "-") hyflag = true;
          else lflag = true;
          if (isChinese2txt(p) && musicType != 0) {
            x0 = s.x - shift / 2; // 歌词偏移原来的一半 create by lhj
          } else {
            x0 = s.x - shift;
          }
          continue;
        }

        if (isChinese2txt(p) && musicType != 0) {
          x0 = s.x - shift / 2; // 歌词偏移原来的一半 create by lhj
        } else {
          x0 = s.x - shift;
        }
        //歌词背景色处理
        if (lyricBgReg.test(p)) {
          var lyricMatchs = p.match(lyricBgReg);
          if (lyricMatchs != null) {
            var lyricBgDetail = new Object();
            lyricBgDetail.type = lyricMatchs[1]; //开始:s/结束:e
            lyricBgDetail.seq = lyricMatchs[2]; //序号
            lyricBgDetail.color = lyricMatchs[3]; //颜色
            lyricBgDetail.s = s;
            lyricBgDetail.istart = ly.istart;

            var existItem = lyricBgArray.find(function (item) {
              return item.seq == lyricBgDetail.seq;
            });
            if (existItem) {
              //已经存在
              if (lyricBgDetail.type == "s") {
                existItem.start = lyricBgDetail;
              } else if (lyricBgDetail.type == "e") {
                existItem.end = lyricBgDetail;
              }
            } else {
              var lyricBg = new Object();
              lyricBg.seq = lyricMatchs[2]; //序号
              if (lyricBgDetail.type == "s") {
                lyricBg.start = lyricBgDetail;
              } else if (lyricBgDetail.type == "e") {
                lyricBg.end = lyricBgDetail;
              }
              //长背景色，渲染到下一个音符前
              if (p.indexOf("lbl") > -1) {
                lyricBg.is_long = 1;
              } else {
                lyricBg.is_long = 0;
              }

              lyricBgArray.push(lyricBg);
            }

            if (lyricBgLength <= parseInt(lyricBgDetail.seq)) {
              lyricBgLength++;
            }
          }
          p = p.replace(lyricBgReg, "");
        }
        //设置歌词颜色
        if (lyricColorReg.test(p)) {
          console.log("设置歌词颜色");
          var lyColor = lyricColorReg.exec(p)[1];
          s.my_ly_color = lyColor;
          p = p.replace(lyricColorReg, "");
        }

        // 全音休止符处理
        if (s.type == C.REST && s.dur == s.p_v.wmeasure) {
          var s2 = s.ts_next;
          while (s2 && s2.time != s.time + s.dur) s2 = s2.ts_next;
          var x2 = s2 ? s2.x : realwidth;

          s2 = s;
          while (!s2.seqst) s2 = s2.ts_prev;
          s2 = s2.ts_prev;

          x0 = s2.x + (x2 - s2.x) / 2 - 5;
        }

        //右对齐 add by hxs
        if (p.indexOf("[R]") == 0) {
          p = p.replace("[R]", "");
          p = p.replace(/\[S\]/g, " ");
          //中文字符数
          var chineseMatch = p.match(/[\u4e00-\u9fa5]/g);
          var chineseWordLength = 0;
          if (chineseMatch != null) {
            chineseWordLength = chineseMatch.length;
          }
          //英文字符数
          var englishMatch = p.match(/[1-9a-zA-Z\/\.]/g);
          var englishWordLength = 0;
          if (englishMatch != null) {
            englishWordLength = englishMatch.length;
          }
          var allWordLen = englishWordLength + chineseWordLength * 2; //一个中文相当于2个英文宽度
          if (allWordLen > 0) {
            x0 = x0 - (w / allWordLen) * (allWordLen - 2);
          }
        } else if (p.indexOf("[L]") == 0) {
          p = p.replace("[L]", "");
          p = p.replace(/\[S\]/g, " ");
          var chinese_p = p.replace(/[a-zA-Z]/g, "");
          var p_len = chinese_p.length - 1;
          if (p_len < 1) {
            p_len = 1;
          }
          if (musicType != 0) {
            x0 = x0 + ((w / p.length) * p_len) / 2;
          } else {
            x0 = x0 + ((w / p.length) * p_len) / 2;
          }
        } else if (p.indexOf("[C]") == 0) {
          p = p.replace("[C]", "");
          p = p.replace(/\[S\]/g, " ");
          var chinese_p = p.replace(/[a-zA-Z]/g, "");
          var p_len = chinese_p.length - 1;
          if (p_len < 1) {
            p_len = 1;
          }
          if (musicType != 0) {
            x0 = x0 - ((w / p.length) * p_len) / 2;
          } else {
            x0 = x0 - ((w / p.length) * p_len) / 2;
          }
        }

        if (p.slice(-1) == "\n") {
          p = p.slice(0, -1);
          hyflag = true;
        }
        if (user.anno_start || user.anno_stop) {
          s2 = {
            st: s.st,
            istart: ly.istart,
            iend: ly.iend,
            x: x0,
            y: y,
            ymn: y,
            ymx: y + gene.curfont.size,
            wl: 0,
            wr: w,
            my_node_index: s.my_node_index,
            parentIstart: s.istart,
          };
          anno_start(s2, "lyrics");
        }
        //xy_str(x0, y, p);
        //增加了颜色参数
        s.currLyricIndex = j; //增加了一个属性j,记录当前使用的歌词索引

        //处理上下标歌词中：歌词[_下标][^上标]
        var upFlagReg = /\[\^(.[^\[]*)\]/; //上标
        var downFlagReg = /\[\_(.[^\[]*)\]/; //下标
        var aReg = /[a-zA-ZⅠ-Ⅸ/\u4e00-\u9fa5][^\[^\]]*\[/g;
        if (p.match(aReg) && p.match(aReg).length > 1) {
          //有多个元素有上下标
          var matchs = p.match(aReg);
          s.chordLys = new Array(); //和弦数组
          for (var i = 0; i < matchs.length; i++) {
            var str = matchs[i];
            console.log(str);
            var curStartIndex = p.indexOf(str);
            var curEndIndex = -1;
            if (i + 1 <= matchs.length - 1) {
              curEndIndex = p.indexOf(matchs[i + 1]);
            } else {
              curEndIndex = p.length;
            }
            var curSubStr = "";
            if (curEndIndex > -1) {
              curSubStr = p.substr(curStartIndex, curEndIndex);
              var lyObj = new Object();
              lyObj.word = str.replace("[", "");
              var upStr = "";
              if (upFlagReg.test(curSubStr)) {
                var node = upFlagReg.exec(curSubStr);
                lyObj.upStr = node[1];
              }
              var downStr = "";
              if (downFlagReg.test(curSubStr)) {
                var node = downFlagReg.exec(curSubStr);
                lyObj.downStr = node[1];
              }
              s.chordLys.push(lyObj);
            }
          }
          console.log("多个上下标歌词：", s);
        } else if (upFlagReg.test(p) || downFlagReg.test(p)) {
          var rightBracketsIndex = -1;
          var leftBracketsIndex = -1;
          var upStr = "";
          if (upFlagReg.test(p)) {
            var node = upFlagReg.exec(p);
            s.upStr = node[1];
            leftBracketsIndex = node.index;
            rightBracketsIndex = node.index + node[0].length;
          }

          var downStr = "";
          if (downFlagReg.test(p)) {
            var node = downFlagReg.exec(p);
            s.downStr = node[1];
            if (leftBracketsIndex == -1 || node.index < leftBracketsIndex) {
              leftBracketsIndex = node.index;
            }
            if (node.index > rightBracketsIndex) {
              rightBracketsIndex = node.index + node[0].length;
            }
          }
          var sufStr = p.substring(rightBracketsIndex);
          if (sufStr != "") {
            s.sufStr = sufStr;
          }
          p = p.substring(0, leftBracketsIndex);
        }

        xy_str(x0, y, p, "lyric", "lyric", cfmt.lyriccolor, null, s);
        anno_stop(s2, "lyrics");
        lastx = x0 + w;
      }
      if (hyflag) {
        hyflag = false;
        x0 = realwidth - 10;
        if (x0 < lastx + 10) x0 = lastx + 10;
        out_hyph(lastx, y, x0 - lastx);
        if (cfmt.hyphencont) p_voice.hy_st |= 1 << j;
      }
      for (p_voice.s_next; s; s = s.next) {
        if (s.type == C.NOTE) {
          if (!s.a_ly) break;
          ly = s.a_ly[j];
          if (ly && ly.t == "_\n") {
            lflag = true;
            x0 = realwidth - 15;
            if (x0 < lastx + 12) x0 = lastx + 12;
          }
          break;
        }
      }
      if (lflag) {
        out_wln(lastx + 3, y, x0 - lastx + 3);
        lflag = false;
      }
    }
    //判断汉字个数
    function checksum(chars) {
      var sum = 0;
      for (var i = 0; i < chars.length; i++) {
        var c = chars.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
          sum++;
        } else {
          sum += 2;
        }
      }
      return sum;
    }

    // 小节图片相关：绘制小节图片
    function draw_pics(p_voice, nly, a_h, y, incr) {
      console.log("draw_pics");
      var j,
        top,
        sc = staff_tb[p_voice.st].staffscale;
      set_font("vocal");

      // 展示简谱时歌词的y坐标设置
      if (musicType == 0 || musicType == 2) {
        y += -sh(5);
      } else if (musicType == 1 && !isChordScore) {
        y += -sh(20 + 24 + 20);
      }
      // 歌词行间距
      var lySpace = 5;
      if (incr > 0) {
        if (y > -cfmt.vocalspace) y = -cfmt.vocalspace;
        y *= sc;
        for (j = 0; j < nly; j++) {
          y -= a_h[j] * 1.1 + lySpace;
          draw_pic_line(p_voice, j, y);
        }
        return (y - a_h[j - 1] / 6) / sc;
      }

      top = staff_tb[p_voice.st].topbar + cfmt.vocalspace;

      if (y < top) y = top;
      y *= sc;

      for (j = nly; --j >= 0; ) {
        draw_pic_line(p_voice, j, y);
        y += a_h[j] * 1.1;
      }

      return y / sc;
    }
    /**
     * @param p_voice
     * @param nly
     * @param a_h
     * @param y
     * @param incr
     */
    function draw_lyrics(p_voice, nly, a_h, y, incr) {
      if (cfmt.hasOwnProperty("hidelyric")) {
        return;
      }
      var j,
        top,
        sc = staff_tb[p_voice.st].staffscale;
      set_font("vocal");

      // 展示简谱时歌词的y坐标设置
      if (musicType == 0 || musicType == 2) {
        y += -sh(5);
      } else if (musicType == 1 && !isChordScore) {
        y += -sh(20 + 24 + 20);
      }
      if (isVoiceMerge && (musicType == 2 || musicType == 1)) {
        //y +=-sh(10);
      }
      // 歌词行间距
      var lySpace = 5;
      if (incr > 0) {
        if (y > -cfmt.vocalspace) y = -cfmt.vocalspace;
        y *= sc;
        for (j = 0; j < nly; j++) {
          y -= a_h[j] * 1.1 + lySpace;
          draw_lyric_line(p_voice, j, y);
        }
        return (y - a_h[j - 1] / 6) / sc;
      }

      top = staff_tb[p_voice.st].topbar + cfmt.vocalspace;

      if (y < top) y = top;
      y *= sc;

      for (j = nly; --j >= 0; ) {
        draw_lyric_line(p_voice, j, y);
        y += a_h[j] * 1.1;
      }

      return y / sc;
    }
    // 绘制所有的歌词
    function draw_all_lyrics() {
      var p_voice,
        s,
        v,
        nly,
        i,
        x,
        y,
        w,
        a_ly,
        ly,
        lyst_tb = new Array(nstaff),
        nv = voice_tb.length,
        h_tb = new Array(nv),
        nly_tb = new Array(nv),
        above_tb = new Array(nv),
        rv_tb = new Array(nv),
        top = 0,
        bot = 0,
        st = -1;
      for (v = 0; v < nv; v++) {
        p_voice = voice_tb[v];
        // console.log("绘制所有的歌词",p_voice);
        if (!p_voice.sym) continue;
        if (p_voice.st != st) {
          top = 0;
          bot = 0;
          st = p_voice.st;
        }
        nly = 0;
        if (p_voice.have_ly || (user.copyLyric && lyricStandV != 0)) {
          //增加了colylyric和lyricstandv两个参数
          if (!h_tb[v]) h_tb[v] = [];
          for (s = p_voice.sym; s; s = s.next) {
            a_ly = s.a_ly;
            if (!a_ly) continue;
            x = s.x;
            w = 10;
            for (i = 0; i < a_ly.length; i++) {
              ly = a_ly[i];
              // 对音符的索引值 create by lhj
              if (ly) {
                ly.nstart = s.istart;
              }
              if (ly && ly.wh[0] != 0) {
                // x -= ly.shift; create by 影响美观先注释
                w = ly.wh[0];
                break;
              }
            }

            y = y_get(p_voice.st, 1, x, w);
            if (top < y) top = y;
            y = y_get(p_voice.st, 0, x, w);

            // 设置简线混排的歌词位置（只有当前为和弦谱子时才这么判断，否则切换间线时加载太慢）
            if (isChordScore || isVoiceMerge) {
              if (musicType == 1) {
                y = staff_tb[s.st].y + rtnNoteY(s.istart) - sh(20 + 24 + 20);
              } else if (musicType == 2) {
                var noteObj = getNoteY(s.istart, s.st);
                y -= noteObj.crdHei + noteObj.addHei;
              }
            }

            if (bot > y) bot = y;
            while (nly < a_ly.length) h_tb[v][nly++] = 0;
            for (i = 0; i < a_ly.length; i++) {
              ly = a_ly[i];
              if (!ly) continue;
              if (!h_tb[v][i] || ly.font.size > h_tb[v][i])
                h_tb[v][i] = ly.font.size;
            }
          }
        } else {
          y = y_get(p_voice.st, 1, 0, realwidth);
          if (top < y) top = y;
          y = y_get(p_voice.st, 0, 0, realwidth);
          if (bot > y) bot = y;
        }
        if (!lyst_tb[st]) lyst_tb[st] = {};

        lyst_tb[st].top = top;
        lyst_tb[st].bot = bot;
        nly_tb[v] = nly;
        if (nly == 0) continue;
        if (p_voice.pos.voc) {
          above_tb[v] = p_voice.pos.voc == C.SL_ABOVE;
        } else if (
          voice_tb[v + 1] &&
          voice_tb[v + 1].st == st &&
          voice_tb[v + 1].have_ly
        ) {
          above_tb[v] = true;
        } else {
          above_tb[v] = false;
        }
        if (above_tb[v]) {
          lyst_tb[st].a = true;
        } else {
          lyst_tb[st].b = true;
        }
      }
      i = 0;
      for (v = 0; v < nv; v++) {
        p_voice = voice_tb[v];
        if (!p_voice.sym) {
          continue;
        }
        if (!user.copyLyric && !p_voice.have_ly) {
          //增加了user.copyLyric
          continue;
        }
        if (above_tb[v]) {
          rv_tb[i++] = v;
          continue;
        }
        st = p_voice.st;
        set_dscale(st, true);
        if (nly_tb[v] > 0 || (user.copyLyric && lyricStandV != 0)) {
          //增加了user.copyLyric
          lyst_tb[st].bot = draw_lyrics(
            p_voice,
            nly_tb[v],
            h_tb[v],
            lyst_tb[st].bot,
            1
          );
        }
      }
      // 设置歌词的下边距
      var lyMarginBottom = 0;
      if (musicType == 1) {
        lyMarginBottom = sh(24 + 25);
      } else if (musicType == 0) {
        lyMarginBottom -= sh(5);
      } else {
        lyMarginBottom -= sh(10);
      }

      while (--i >= 0) {
        v = rv_tb[i];
        p_voice = voice_tb[v];
        st = p_voice.st;
        set_dscale(st, true);
        lyst_tb[st].top = draw_lyrics(
          p_voice,
          nly_tb[v],
          h_tb[v],
          lyst_tb[st].top,
          -1
        );
      }
      for (v = 0; v < nv; v++) {
        p_voice = voice_tb[v];
        if (!p_voice.sym) continue;
        st = p_voice.st;
        if (lyst_tb[st].a) {
          top = lyst_tb[st].top + 2;
          for (s = p_voice.sym.next; s; s = s.next) {
            if (s.a_ly) {
              y_set(st, 1, s.x - 2, 10, top);
            }
          }
        }
        if (lyst_tb[st].b) {
          bot = lyst_tb[st].bot - 2 + lyMarginBottom;
          if (nly_tb[p_voice.v] > 0) {
            for (s = p_voice.sym.next; s; s = s.next) {
              if (s.a_ly) {
                y_set(st, 0, s.x - 2, 10, bot);
              }
            }
          } else {
            y_set(st, 0, 0, realwidth, bot);
          }
        }
      }
    }
    //小节图片相关：画所有的小节图片
    function draw_all_pics() {
      //console.log("绘制所有的pic",p_voice);
      var p_voice,
        s,
        v,
        npic,
        i,
        x,
        y,
        w,
        a_pic,
        pic,
        picst_tb = new Array(nstaff),
        nv = voice_tb.length,
        h_tb = new Array(nv),
        npic_tb = new Array(nv),
        above_tb = new Array(nv),
        rv_tb = new Array(nv),
        top = 0,
        bot = 0,
        st = -1;
      for (v = 0; v < nv; v++) {
        p_voice = voice_tb[v];
        // console.log("绘制所有的歌词",p_voice);
        if (!p_voice.sym) continue;
        if (p_voice.st != st) {
          top = 0;
          bot = 0;
          st = p_voice.st;
        }
        npic = 0;
        if (p_voice.have_picture) {
          if (!h_tb[v]) h_tb[v] = [];
          for (s = p_voice.sym; s; s = s.next) {
            a_pic = s.a_pic;
            if (!a_pic) continue;
            x = s.x;
            w = 10;
            for (i = 0; i < a_pic.length; i++) {
              pic = a_pic[i];
              // 对音符的索引值 create by lhj
              if (pic) {
                pic.nstart = s.istart;
              }
              if (pic && pic.w != 0) {
                // x -= pic.shift; create by 影响美观先注释
                w = pic.w;
                break;
              }
            }

            y = y_get(p_voice.st, 1, x, w);
            if (top < y) top = y;
            y = y_get(p_voice.st, 0, x, w);

            // 设置简线混排的歌词位置（只有当前为和弦谱子时才这么判断，否则切换间线时加载太慢）
            if (isChordScore) {
              if (musicType == 1) {
                y = staff_tb[s.st].y + rtnNoteY(s.istart) - sh(20 + 24 + 20);
              } else if (musicType == 2) {
                var noteObj = getNoteY(s.istart, s.st);
                //	y -= (noteObj.crdHei + noteObj.addHei);
              }
            }

            if (bot > y) bot = y;
            while (npic < a_pic.length) h_tb[v][npic++] = 0;
            for (i = 0; i < a_pic.length; i++) {
              pic = a_pic[i];
              if (!pic) continue;
              if (!h_tb[v][i] || pic.font.size > h_tb[v][i]) h_tb[v][i] = pic.h;
            }
          }
        } else {
          y = y_get(p_voice.st, 1, 0, realwidth);
          if (top < y) top = y;
          y = y_get(p_voice.st, 0, 0, realwidth);
          if (bot > y) bot = y;
        }
        if (!picst_tb[st]) picst_tb[st] = {};

        picst_tb[st].top = top;
        picst_tb[st].bot = bot;
        npic_tb[v] = npic;
        if (npic == 0) continue;
        if (p_voice.pos.voc) above_tb[v] = p_voice.pos.voc == C.SL_ABOVE;
        else if (
          voice_tb[v + 1] &&
          voice_tb[v + 1].st == st &&
          voice_tb[v + 1].have_picture
        )
          above_tb[v] = true;
        else above_tb[v] = false;
        if (above_tb[v]) picst_tb[st].a = true;
        else picst_tb[st].b = true;
      }
      i = 0;
      for (v = 0; v < nv; v++) {
        p_voice = voice_tb[v];
        if (!p_voice.sym) continue;
        if (!p_voice.have_picture) continue;
        if (above_tb[v]) {
          rv_tb[i++] = v;
          continue;
        }
        st = p_voice.st;
        set_dscale(st, true);
        if (npic_tb[v] > 0)
          picst_tb[st].bot = draw_pics(
            p_voice,
            npic_tb[v],
            h_tb[v],
            picst_tb[st].bot,
            1
          );
      }
      // 设置歌词的下边距
      var picMarginBottom = 0;
      if (musicType == 1) {
        picMarginBottom = sh(24 + 25);
      } else if (musicType == 0) {
        picMarginBottom -= sh(5);
      } else {
        picMarginBottom -= sh(10);
      }
      //
      while (--i >= 0) {
        v = rv_tb[i];
        p_voice = voice_tb[v];
        st = p_voice.st;
        set_dscale(st, true);
        picst_tb[st].top = draw_pics(
          p_voice,
          npic_tb[v],
          h_tb[v],
          picst_tb[st].top,
          -1
        );
      }
      for (v = 0; v < nv; v++) {
        p_voice = voice_tb[v];
        if (!p_voice.sym) continue;
        st = p_voice.st;
        if (picst_tb[st].a) {
          top = picst_tb[st].top + 2;
          for (s = p_voice.sym.next; s; s = s.next) {
            if (s.a_pic) {
              y_set(st, 1, s.x - 2, 10, top);
            }
          }
        }
        if (picst_tb[st].b) {
          bot = picst_tb[st].bot - 2 + picMarginBottom;
          if (npic_tb[p_voice.v] > 0) {
            for (s = p_voice.sym.next; s; s = s.next) {
              if (s.a_pic) {
                y_set(st, 0, s.x - 2, 10, bot);
              }
            }
          } else {
            y_set(st, 0, 0, realwidth, bot);
          }
        }
      }
    }
    function parse_gchord(type) {
      var c,
        text,
        gch,
        x_abs,
        y_abs,
        type,
        i,
        istart,
        iend,
        ann_font = get_font("annotation"),
        h_ann = ann_font.size,
        line = parse.line;
      function get_float() {
        var txt = "";
        while (1) {
          c = text[i++];
          if ("1234567890.-".indexOf(c) < 0) return parseFloat(txt);
          txt += c;
        }
      }
      istart = parse.bol + line.index;
      if (type.length > 1) {
        text = type.slice(1, -1);
        iend = istart + 1;
      } else {
        text = "";
        while (1) {
          c = line.next_char();
          if (!c) {
            //                        syntax(1, "No end of guitar chord");
            syntax(1, "吉他谱未结束");
            return;
          }
          if (c == '"') break;
          if (c == "\\") {
            text += c;
            c = line.next_char();
          }
          text += c;
        }
        iend = parse.bol + line.index + 1;
      }
      if (curvoice.pos.gch == C.SL_HIDDEN) return;
      i = 0;
      type = "g";
      while (1) {
        c = text[i];
        if (!c) break;
        gch = {
          text: "",
          istart: istart,
          iend: iend,
          font: ann_font,
        };
        switch (c) {
          case "@":
            type = c;
            i++;
            x_abs = get_float();
            if (c != ",") {
              //                        syntax(1, "',' lacking in annotation '@x,y'");
              syntax(1, "缺少逗号 ','  '@x,y'");
              y_abs = 0;
            } else {
              y_abs = get_float();
              if (c != " ") i--;
            }
            gch.x = x_abs;
            gch.y = y_abs - h_ann / 2;
            break;
          case "^":
          case "_":
          case "<":
          case ">":
            i++;
            if (text[i] == "∆") {
              gch.font = get_font("gchord2"); //设置为美文字体
              gch.fonttype = "∆";
              i++;
            }
            type = c;
            break;
          case "∆":
            i++;
            //                    type = c;
            gch.font = get_font("gchord2"); //设置为美文字体
            break;
          default:
            switch (type) {
              case "g":
                gch.font = get_font("gchord");
                break;
              case "@":
                gch.x = x_abs;
                y_abs -= h_ann;
                gch.y = y_abs - h_ann / 2;
                break;
            }
            break;
        }
        gch.type = type;
        while (1) {
          c = text[i];
          if (!c) break;
          switch (c) {
            case "\\":
              c = text[++i];
              if (!c || c == "n") break;
              gch.text += "\\";
            default:
              gch.text += c;
              i++;
              continue;
            case "&":
              while (1) {
                gch.text += c;
                c = text[++i];
                switch (c) {
                  default:
                    continue;
                  case ";":
                  case undefined:
                  case "\\":
                    break;
                }
                break;
              }
              if (c == ";") {
                gch.text += c;
                continue;
              }
              break;
            case ";":
              break;
          }
          i++;
          break;
        }
        if (!a_gch) a_gch = [];
        a_gch.push(gch);
      }
    }
    var note_names = "CDEFGAB",
      latin_names = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si"],
      acc_name = ["bb", "b", "", "#", "##"];
    function gch_tr1(p, i2) {
      var new_txt,
        l,
        n,
        i1,
        i3,
        i4,
        ix,
        a,
        ip,
        ip2,
        latin = 0;
      switch (p[0]) {
        case "A":
          n = 5;
          break;
        case "B":
          n = 6;
          break;
        case "C":
          n = 0;
          break;
        case "D":
          if (p[1] == "o") {
            latin++;
            n = 0;
            break;
          }
          n = 1;
          break;
        case "E":
          n = 2;
          break;
        case "F":
          if (p[1] == "a") latin++;
          n = 3;
          break;
        case "G":
          n = 4;
          break;
        case "L":
          latin++;
          n = 5;
          break;
        case "M":
          latin++;
          n = 2;
          break;
        case "R":
          latin++;
          n = 1;
          break;
        case "S":
          latin++;
          if (p[1] == "o") {
            latin++;
            n = 4;
          } else {
            n = 6;
          }
          break;
        case "/":
          latin--;
          break;
        default:
          return p;
      }
      a = 0;
      ip = latin + 1;
      if (latin >= 0) {
        while (p[ip] == "#") {
          a++;
          ip++;
        }
        while (p[ip] == "b") {
          a--;
          ip++;
        }
        i3 = cde2fcg[n] + i2 + a * 7;
        i4 = cgd2cde[(i3 + 16 * 7) % 7];
        i1 = ((((i3 + 22) / 7) | 0) + 159) % 5;
        new_txt = (latin ? latin_names[i4] : note_names[i4]) + acc_name[i1];
      } else {
        new_txt = "";
      }
      ip2 = p.indexOf("/", ip);
      if (ip2 < 0) return new_txt + p.slice(ip);
      n = note_names.indexOf(p[++ip2]);
      if (n < 0) return new_txt + p.slice(ip);
      new_txt += p.slice(ip, ip2);
      a = 0;
      if (p[++ip2] == "#") {
        a++;
        if (p[++ip2] == "#") {
          a++;
          ip2++;
        }
      } else if (p[ip2] == "b") {
        a--;
        if (p[++ip2] == "b") {
          a--;
          ip2++;
        }
      }
      i3 = cde2fcg[n] + i2 + a * 7;
      i4 = cgd2cde[(i3 + 16 * 7) % 7];
      i1 = ((((i3 + 22) / 7) | 0) + 159) % 5;
      return new_txt + note_names[i4] + acc_name[i1] + p.slice(ip2);
    }
    function gch_transp(s) {
      var gch,
        p,
        j,
        i = 0,
        i2 = curvoice.ckey.k_sf - curvoice.okey.k_sf;
      while (1) {
        gch = s.a_gch[i++];
        if (!gch) return;
        if (gch.type != "g") continue;
        p = gch.text;
        j = p.indexOf("\t");
        if (j >= 0) {
          j++;
          p = p.slice(0, j) + gch_tr1(p.slice(j), i2);
        }
        gch.text = gch_tr1(p, i2);
      }
    }
    function gch_build(s) {
      var gch,
        wh,
        xspc,
        ix,
        pos = curvoice.pos.gch == C.SL_BELOW ? -1 : 1,
        y_above = 0,
        y_below = 0,
        y_left = 0,
        y_right = 0,
        GCHPRE = 0.4;
      s.a_gch = a_gch;
      a_gch = null;
      //这段代码是插入空的注释时，直接去掉start hxs
      if (s.a_gch && musicType == 0) {
        for (var i = 0; i < s.a_gch.length; i++) {
          var txt = s.a_gch[i].text.replace(/(^\s*)|(\s*$)/g, "");
          if (txt == "") {
            s.a_gch.splice(i, 1);
          }
        }
        if (s.a_gch.length == 0) {
          delete s.a_gch;
          return;
        }
      }

      var midiReg = /midi(\d{1,4}).*/;
      //这段代码是插入空的注释时，直接去掉end
      if (curvoice.vtransp) gch_transp(s);
      for (ix = 0; ix < s.a_gch.length; ix++) {
        gch = s.a_gch[ix];

        if (gch.type == "<" && gch.text == "サ") {
          gch.type = "g";
        }
        if (gch.type == "g") {
          if (cfmt.chordnames) {
            gch.otext = gch.text;
            gch.text = gch.text.replace(/A|B|C|D|E|F|G/g, function (c) {
              return cfmt.chordnames[c];
            });
            if (cfmt.chordnames.B == "H")
              gch.text = gch.text.replace(/Hb/g, "Bb");
          }
        } else {
          if (gch.type == "@" && !user.anno_start && !user.anno_stop) {
            gch.wh = [0, 0];
            continue;
          }
        }
        gch.text = gch.text.replace(
          /\(##\)|\(#\)|\(=\)|\(bb\)|\(b\)|  /g,
          function (x) {
            switch (x) {
              case "(##)":
                return "&#x1d12a;";
              case "(#)":
                return "\u266f";
              case "(=)":
                return "\u266e";
              case "(b)":
                return "\u266d";
              case "  ":
                return "  ";
            }
            return "&#x1d12b;";
          }
        );

        if (gch.text.indexOf("gchtype") > -1) {
          var obj = JSON.parse(gch.text.replace(/'/g, '"'));
          obj.istart = s.istart;
          myDecoPosArray.push(obj);
          wh = strwh("");
        }

        set_font(gch.font);
        // 如果是背景模板的注释|音符模板的注释，就不计算宽度，add by hxs
        if (
          gch.text.indexOf(mb_desc) == 0 ||
          (nbReg != null && nbReg.test(gch.text)) ||
          gch.text.indexOf("fng:") > -1 ||
          gch.text.indexOf("sh:") == 0 ||
          gch.text == ".up" ||
          gch.text == ".down" ||
          gch.text == "graceup" ||
          gch.text == "gracedown" ||
          gch.text.indexOf("x-in:") == 0 ||
          /^\[(.[^\[]*)\]/.test(gch.text) ||
          gch.text.indexOf("jptext:") == 0 ||
          gch.text.indexOf("tpheight:") == 0
        ) {
          wh = strwh("9 ");
        } else if (gch.text.indexOf("barwidth:") == 0) {
          wh = strwh("");
        } else if (gch.text.indexOf("[font-size:") > -1) {
          wh = strwh(gch.text.replace(/\[(font-size:.*)\]/, ""));
        } else if (
          gch.text.indexOf("(slur-") == 0 ||
          gch.text.indexOf(")slur-") == 0
        ) {
          //自定义的连音线
          wh = strwh("");
        } else if (/\[\-\d/.test(gch.text) || /\d\-\]/.test(gch.text)) {
          wh = strwh("");
        } else if (midiReg.test(gch.text)) {
          wh = strwh(gch.text.replace(/midi(\d{1,4})/, ""));
          var midiSeq = gch.text.match(midiReg)[1];
          instrMap.set(curvoice.v, midiSeq);
        } else if (xcoorGchReg.test(gch.text) || ycoorGchReg.test(gch.text)) {
          wh = strwh(
            gch.text.replace(xcoorGchReg, "").replace(ycoorGchReg, "")
          );
        } else if (gch.text.indexOf("gchtype") > -1) {
          wh = strwh("");
        } else if (gch.text.indexOf("fermatatime") == 0) {
          wh = strwh("");
        } else if (gch.text.indexOf("{x:") == 0) {
          wh = strwh("");
        } else {
          wh = strwh(gch.text);
        }

        gch.wh = wh;
        if (gch.font.box) wh[1] += 4;
        switch (gch.type) {
          case "@":
            break;
          case "^":
            xspc = wh[0] * GCHPRE;
            if (xspc > 8) xspc = 8;
            gch.x = -xspc;
            y_above -= wh[1];
            gch.y = y_above;
            break;
          case "_":
            xspc = wh[0] * GCHPRE;
            if (xspc > 8) xspc = 8;
            gch.x = -xspc;
            y_below -= wh[1];
            gch.y = y_below;
            break;
          case "<":
            gch.x = -(wh[0] + 6);
            y_left -= wh[1];
            gch.y = y_left + wh[1] / 2;
            break;
          case ">":
            gch.x = 6;
            y_right -= wh[1];
            gch.y = y_right + wh[1] / 2;
            break;
          default:
            xspc = wh[0] * GCHPRE;
            if (xspc > 8) xspc = 8;
            gch.x = -xspc;
            if (pos < 0) {
              y_below -= wh[1];
              gch.y = y_below;
            } else {
              y_above -= wh[1];
              gch.y = y_above;
            }
            break;
        }
      }
      y_left /= 2;
      y_right /= 2;
      for (ix = 0; ix < s.a_gch.length; ix++) {
        gch = s.a_gch[ix];
        switch (gch.type) {
          case "^":
            gch.y -= y_above;
            break;
          case "<":
            gch.y -= y_left;
            break;
          case ">":
            gch.y -= y_right;
            break;
          case "g":
            if (pos > 0) gch.y -= y_above;
            break;
        }
      }
    }
    function draw_gchord(s, gchy_min, gchy_max) {
      var gch,
        text,
        ix,
        x,
        y,
        y2,
        hbox,
        h,
        y_above,
        y_below,
        w = 0,
        yav = s.dur
          ? (((s.notes[s.nhd].pit + s.notes[0].pit) >> 1) - 18) * 3
          : 12;
      for (ix = 0; ix < s.a_gch.length; ix++) {
        gch = s.a_gch[ix];
        if (gch.wh[0] > w) w = gch.wh[0];
      }
      y_above = y_get(s.st, 1, s.x - 3, w);
      y_below = y_get(s.st, 0, s.x - 3, w);
      if (y_above < gchy_max) y_above = gchy_max;
      if (y_below > gchy_min) y_below = gchy_min;
      set_dscale(s.st);
      for (ix = 0; ix < s.a_gch.length; ix++) {
        gch = s.a_gch[ix];
        use_font(gch.font);
        set_font(gch.font);
        h = gch.font.size;
        hbox = gch.font.box ? 2 : 0;
        w = gch.wh[0];
        x = s.x + gch.x;
        text = gch.text;
        if (gch.type == "<" || gch.type == ">") {
          text = text.replace(/^\[.[^\[]*\]/, "");
        }
        if (text.indexOf("jptext:") == 0) {
          continue;
        }
        if (text.indexOf("barwidth:") == 0) {
          continue;
        }
        if (text.indexOf("tpheight:") == 0) {
          s.myTpHeight = parseInt(text.replace("tpheight:", ""));
          continue;
        }
        if (text.indexOf("{x:") == 0) {
          s.xOffset = parseFloat(text.replace("{x:", "").replace("}", ""));
          continue;
        }
        if (text.indexOf("gchtype") > -1) {
          //	            	var obj = JSON.parse(text.replace(/'/g,'"'));
          //	            	obj.istart = s.istart;
          //	            	myDecoPosArray.push(obj);
          continue;
        }
        if (text.indexOf("(slur-") == 0 || text.indexOf(")slur-") == 0) {
          //自定义连音线
          //	            	 * 开始标记："(slur-1-[x:10,y:5,c1x:1,c1y:2,c2x:3,c2y:4]"  注释：x表示开始点x轴偏移，y表示开始点y轴偏移，c1为控制点1,c2为控制点2
          //	            	 * 结束标记：")slur-1-[x:10,y:5]"   注释：x表示结束点x轴偏移，y表示结束点y轴偏移
          getMySlurInfo(text, s);
          continue;
        }
        if (/\[\-\d/.test(text) || /\d{1,3}\-\]/.test(text)) {
          //自定义中括号注释
          //	            	 * 开始标记："[-1-[x:10,y:5,c1x:1,c1y:2,c2x:3,c2y:4]"  注释：x表示开始点x轴偏移，y表示开始点y轴偏移，c1为控制点1,c2为控制点2
          //	            	 * 结束标记："1-]"   注释：x表示结束点x轴偏移，y表示结束点y轴偏移
          getBracketGchInfo(text, s, gch.type);
          continue;
        }
        if (/\[\~\d/.test(text) || /\d{1,3}\~\]/.test(text)) {
          //自定义波浪注释
          //	            	 * 开始标记："[~1~[x:10,y:5,c1x:1,c1y:2,c2x:3,c2y:4]"  注释：x表示开始点x轴偏移，y表示开始点y轴偏移，c1为控制点1,c2为控制点2
          //	            	 * 结束标记："1~]"   注释：x表示结束点x轴偏移，y表示结束点y轴偏移
          getWaveGchInfo(text, s, gch.type);
          continue;
        }
        if (text.indexOf("fermatatime") == 0) {
          s.fermatatime = text.replace("fermatatime:", "");
          continue;
        }
        //设置背景色的
        if (text.indexOf("-mb-") == 0) {
          if (s.type == 0 && s.a_gch) {
            s.a_gch.forEach(function (item) {
              if (item.text.indexOf(mb_desc) == 0) {
                var idx = s.bar_num - 1;
                var exist = false;
                bgBar.forEach(function (item) {
                  if (item.bar_num && item.bar_num == idx) {
                    exist = true;
                  }
                });
                var existItem = barLineArray.find(function (xitem) {
                  return xitem.istart == s.istart;
                });

                var obj = new Object();
                //                				obj.bar_num = 0;
                if (existItem != null) {
                  obj.bar_num = existItem.bar_num;
                  obj.color = item.text.replace(mb_desc, "");
                  bgBar.push(obj);
                }
                //                				console.log(bgBar);

                //	                			if(!exist && s.bar_num){
                //	                				var obj = new Object();
                //
                //	                				obj.bar_num = existItem.bar_num;
                ////	                				if(has_weak_node){
                ////	                					obj.bar_num = s.bar_num - 1;
                ////	                				}else{
                ////	                					obj.bar_num = s.bar_num - 2;
                ////	                				}
                //	                				obj.color = item.text.replace(mb_desc,"");
                //	                				bgBar.push(obj);
                //	                			}else if(!exist && s.weak_bar){
                //	                				var obj = new Object();
                ////	                				obj.bar_num = 0;
                //	                				obj.bar_num = existItem.bar_num;
                //	                				obj.color = item.text.replace(mb_desc,"");
                //	                				bgBar.push(obj);
                //	                			}
              }
            });
          }

          continue;
        }

        var xcoorMatch = text.match(xcoorGchReg);
        var ycoorMatch = text.match(ycoorGchReg);
        var xCoorVal = 0; //注释x方向偏移
        var yCoorVal = 0; //注释y方向偏移
        var oriX = x - 0;
        var oriY = y_above - 0;
        s.oriX = oriX;
        s.oriY = oriY;
        if (xcoorMatch != null) {
          xCoorVal = parseInt(xcoorMatch[1]);
          x += xCoorVal;
        }
        if (ycoorMatch != null) {
          yCoorVal = parseInt(ycoorMatch[1]);
          y_above += yCoorVal;
        }
        text = text.replace(xcoorGchReg, "").replace(ycoorGchReg, "");
        //设置倚音弧线开口位置
        if (text == "graceup" || text == "gracedown") {
          continue;
        }
        //设置在单行模式下 添加括号
        if (text.indexOf("-bk-") == 0 || text.indexOf("-v-") == 0) {
          continue;
        }
        //跳音位置设置
        if (text == ".up" || text == ".down") {
          continue;
        }
        if (text.indexOf("x-in:") == 0) {
          continue;
        }

        //音符背景色设置，数字1是做为全局序号，多个音符一起标记背景色时，这个序号相同-nbl-1-rgb(105, 17, 238)
        nbReg = /-(s|e)-nbl?-(\d+)-(rgb\(.*\))/;
        if (nbReg.test(text)) {
          var nbMatchs = text.match(nbReg);
          if (nbMatchs != null) {
            var noteBgDetail = new Object();
            noteBgDetail.type = nbMatchs[1]; //开始:s/结束:e
            noteBgDetail.seq = nbMatchs[2]; //序号
            noteBgDetail.color = nbMatchs[3]; //颜色
            noteBgDetail.s = s;

            var existItem = noteBgArray.find(function (item) {
              return item.seq == noteBgDetail.seq;
            });
            if (existItem) {
              //已经存在
              if (noteBgDetail.type == "s") {
                existItem.start = noteBgDetail;
              } else if (noteBgDetail.type == "e") {
                existItem.end = noteBgDetail;
              }
            } else {
              var noteBg = new Object();
              noteBg.seq = nbMatchs[2]; //序号
              if (noteBgDetail.type == "s") {
                noteBg.start = noteBgDetail;
              } else if (noteBgDetail.type == "e") {
                noteBg.end = noteBgDetail;
              }
              //长背景色，渲染到下一个音符前
              if (text.indexOf("nbl") > -1) {
                noteBg.is_long = 1;
              } else {
                noteBg.is_long = 0;
              }

              noteBgArray.push(noteBg);
            }

            if (noteBgLength <= parseInt(noteBgDetail.seq)) {
              noteBgLength++;
            }
          }
          continue;
        }
        //查找匹配"(1[y1:-60,y2:0,height:1]-","-1)"这样的注释的，是自定义的跨声部的连音线-------start
        //	            var regStart = new RegExp(/^\([,']{1,2}([0-9]+)\-$/);
        var regStart = new RegExp(/^\([,']{1,2}([0-9]+)(\[*.*\]*)\-$/);
        if (regStart.test(text)) {
          var start = regStart.exec(text);
          //如果是"(1"这样的注释，就当成不同声部的连音线标记 add by hxs
          var slurObj = new Object();
          slurObj.s1 = s;
          slurObj.s2 = null;
          slurObj.direct = 0;
          if (text.indexOf(",,") > -1) {
            slurObj.direct = 11;
          } else if (text.indexOf(",") > -1) {
            slurObj.direct = C.SL_BELOW;
          } else if (text.indexOf("''") > -1) {
            slurObj.direct = 22;
          } else if (text.indexOf("'") > -1) {
            slurObj.direct = C.SL_ABOVE;
          }
          slurObj.seq = text
            .replace("(", "")
            .replaceAll(",", "")
            .replaceAll("'", "")
            .replace(/\[.*\]/, "")
            .replace("-", "");
          slurObj.y1 = -1;
          slurObj.y2 = -1;
          if (start[2] != "") {
            var str = start[2];
            // [y1:0,y2:60,height:5
            var jsonstr =
              '{"' +
              str
                .replace("[", "")
                .replace("]", "")
                .replaceAll(":", '":')
                .replaceAll(",", ',"') +
              "}";
            try {
              var jsonObj = JSON.parse(jsonstr);
              if (jsonObj.hasOwnProperty("y1") && jsonObj.y1 != "") {
                slurObj.y1 = jsonObj.y1;
              }
              if (jsonObj.hasOwnProperty("y2") && jsonObj.y2 != "") {
                slurObj.y2 = jsonObj.y2;
              }
              if (jsonObj.hasOwnProperty("height") && jsonObj.height != "") {
                slurObj.height = jsonObj.height;
              }
              if (jsonObj.hasOwnProperty("dir") && jsonObj.dir != "") {
                slurObj.dir = jsonObj.dir;
              }
            } catch (e) {
              console.log(e);
            }

            //	            		var coors = str.replace("[","").replace("]","").split(",");
            //	            		var y1 = 0;
            //	            		var y2 = 0;
            //	            		if(coors!=null && coors.length>0){
            //	            			if(coors[0].indexOf(":")>-1){
            //	            				y1 = coors[0].split(":")[1];
            //	            				slurObj.y1 = y1;
            //	            			}
            //	            			if(coors.length > 1){
            //	            				if(coors[1].indexOf(":")>-1){
            //	            					y2 = coors[1].split(":")[1];
            //	            					slurObj.y2 = y2;
            //	            				}
            //	            			}
            //	            			if(coors.length>2){
            //	            				if(coors[2].indexOf(":")>-1){
            //	            					slurObj.height = parseInt(coors[2].split(":")[1])
            //	            				}
            //	            			}
            //	            			if(coors.length>3){
            //	            				if(coors[3].indexOf(":")>-1){
            //	            					slurObj.dir = parseInt(coors[3].split(":")[1])
            //	            				}
            //	            			}
            //	            		}
          }

          if (voice_slurs_len <= parseInt(slurObj.seq)) {
            voice_slurs_len = parseInt(slurObj.seq) + 1;
          }
          var exist = false;
          for (var i = 0; i < voice_slurs.length; i++) {
            if (voice_slurs[i].seq == slurObj.seq) {
              voice_slurs[i].s1 = s;
              voice_slurs[i].direct = slurObj.direct;
              voice_slurs[i].y1 = slurObj.y1;
              voice_slurs[i].y2 = slurObj.y2;
              voice_slurs[i].height = slurObj.height;
              voice_slurs[i].dir = slurObj.dir;
              exist = true;
              break;
            }
          }
          if (!exist) {
            voice_slurs.push(slurObj);
          }
          continue;
        }
        var regEnd = new RegExp(/^\-([0-9]+)\)$/);
        if (regEnd.test(text)) {
          //如果是"(1"这样的注释，就当成不同声部的连音线标记 add by hxs
          var seq = text.replace(")", "").replace("-", "");
          var slurObj = new Object();
          slurObj.s1 = null;
          slurObj.s2 = s;
          slurObj.seq = text.replace(")", "").replace("-", "");
          var exist = false;
          for (var i = 0; i < voice_slurs.length; i++) {
            if (voice_slurs[i].seq == slurObj.seq) {
              voice_slurs[i].s2 = s;
              exist = true;
              break;
            }
          }
          if (!exist) {
            voice_slurs.push(slurObj);
          }
          continue;
        }
        //查找匹配"(1-","-1)"这样的注释的，是自定义的跨声部的连音线-------end
        //跨声部琶音处理---------start
        var regArpStart = new RegExp(/^\(arp[0-9]+\-$/);
        if (regArpStart.test(text)) {
          var arpObj = new Object();
          arpObj.s1 = s;
          arpObj.s2 = null;
          arpObj.seq = text.replace("(arp", "").replace("-", "");
          s.arp_seq = arpObj.seq;
          if (arp_link_len <= parseInt(arpObj.seq)) {
            arp_link_len++;
          }
          var exist = false;
          for (var i = 0; i < arp_links.length; i++) {
            if (arp_links[i].seq == arpObj.seq) {
              arp_links[i].s1 = s;
              exist = true;
              break;
            }
          }
          if (!exist) {
            arp_links.push(arpObj);
          }
          continue;
        }

        var regArpEnd = new RegExp(/^\-[0-9]+arp\)$/);
        if (regArpEnd.test(text)) {
          s.arp_link = 1; //设置需要连接2个声部琶音
          var seq = text.replace("arp)", "").replace("-", "");
          var arpObj = new Object();
          arpObj.s1 = null;
          arpObj.s2 = s;
          arpObj.seq = seq;
          s.arp_seq = seq;
          var exist = false;
          for (var i = 0; i < arp_links.length; i++) {
            if (arp_links[i].seq == arpObj.seq) {
              arp_links[i].s2 = s;
              exist = true;
              break;
            }
          }
          if (!exist) {
            arp_links.push(arpObj);
          }
          continue;
        }
        //跨声部琶音处理---------end
        //连音线高度设置
        if (text.indexOf("sh:") == 0) {
          var sh = text.replace("sh:", "");
          if (sh != "") {
            sh = parseFloat(sh);
            s.slurHeight = sh;
            continue;
          }
        }
        // 散拍子"サ"符号的处理
        if (text == "サ") {
          x = x - 2;
        }
        switch (gch.type) {
          case "_":
            y = gch.y + y_below;
            y_set(s.st, 0, x, w, y - hbox);
            break;
          case "^":
            y = gch.y + y_above + hbox;
            y_set(s.st, 1, x, w, y + h + hbox);
            break;
          case "<":
            if (s.notes[0].acc) x -= s.notes[0].shac;
            y = gch.y + yav - h / 2;
            break;
          case ">":
            if (s.xmx) x += s.xmx;
            if (s.dots) x += 1.5 + 3.5 * s.dots;
            y = gch.y + yav - h / 2;
            break;
          default:
            if (gch.y >= 0) {
              y = gch.y + y_above + hbox;
              y_set(s.st, true, x, w, y + h + hbox);
            } else {
              y = gch.y + y_below;
              y_set(s.st, false, x, w, y - hbox);
            }
            break;
          case "@":
            y = gch.y + yav;
            if (y > 0) {
              y2 = y + h;
              if (y2 > staff_tb[s.st].ann_top) staff_tb[s.st].ann_top = y2;
            } else {
              if (y < staff_tb[s.st].ann_bot) staff_tb[s.st].ann_bot = y;
            }
            break;
        }
        if (user.anno_start)
          user.anno_start(
            "annot",
            gch.istart,
            gch.iend,
            x - 2,
            y + h + 2,
            w + 4,
            h + 4,
            s
          );
        //简谱的时候不绘制五线谱的注释
        if (musicType != 2 || (gch.type == "@" && musicType == 2)) {
          // 注释 create by lhj
          //	            if(musicType != 2 ){//去掉了|| ( gch.type == '@' && musicType == 2 )这段，不然段落前面的简谱会画2
          if (gch.box) {
            //xy_str_b(x, y, text);
            xy_str(x, y, text, null, null, gch.wh);
          } else {
            s.currGchIndex = ix;
            xy_str(x, y, text, "zs", "zs", null, null, s);
          }
        }

        if (user.anno_stop)
          user.anno_stop(
            "annot",
            gch.istart,
            gch.iend,
            x - 2,
            y + h + 2,
            w + 4,
            h + 4,
            s
          );
      }
    }
    function psdeco() {
      return false;
    }
    function psxygl() {
      return false;
    }
    font_init();
    init_tune();
    // 设置y坐标的最大值，和最小值
    Abc.prototype.add_style = function (s) {
      style += s;
    };
    Abc.prototype.get_a_gch = function () {
      return a_gch;
    };
    Abc.prototype.get_bool = get_bool;
    Abc.prototype.get_cur_sy = function () {
      return cur_sy;
    };
    Abc.prototype.get_curvoice = function () {
      return curvoice;
    };
    Abc.prototype.get_delta_tb = function () {
      return delta_tb;
    };
    Abc.prototype.get_decos = function () {
      return decos;
    };
    Abc.prototype.unlksym = unlksym;
    Abc.prototype.get_fname = function () {
      return parse.fname;
    };
    Abc.prototype.get_unit = get_unit;
    Abc.prototype.get_font = get_font;
    Abc.prototype.cfmt = function () {
      return cfmt;
    };
    Abc.prototype.get_font_style = function () {
      return font_style;
    };
    Abc.prototype.get_glyphs = function () {
      return glyphs;
    };
    Abc.prototype.get_img = function () {
      return img;
    };
    Abc.prototype.get_maps = function () {
      return maps;
    };
    Abc.prototype.get_multi = function () {
      return multicol;
    };
    Abc.prototype.get_newpage = function () {
      if (block.newpage) {
        block.newpage = false;
        return true;
      }
    };
    Abc.prototype.get_posy = function () {
      var t = posy;
      posy = 0;
      return t;
    };
    Abc.prototype.get_staff_tb = function () {
      return staff_tb;
    };
    Abc.prototype.get_top_v = function () {
      return par_sy.top_voice;
    };
    Abc.prototype.get_tsfirst = function () {
      return tsfirst;
    };
    Abc.prototype.get_voice_tb = function () {
      return voice_tb;
    };
    Abc.prototype.info = function () {
      return info;
    };
    Abc.prototype.out_bracket = out_bracket;
    Abc.prototype.set_cur_sy = function (sy) {
      cur_sy = sy;
    };
    Abc.prototype.set_tsfirst = function (s) {
      tsfirst = s;
    };
    Abc.prototype.setpage = function () {
      set_page();
    };
    Abc.prototype.clone = clone;
    Abc.prototype.deco_put = function (nm, s) {
      a_dcn = [];
      a_dcn.push(nm);
      deco_cnv(a_dcn, s);
    };
    Abc.prototype.dh_put = function (nm, s, nt) {
      if (a_dcn == null) {
        a_dcn = [];
      }
      a_dcn.push(nm);
      dh_cnv(s, nt);
    };
    Abc.prototype.set_xhtml = function (wt) {
      var wto = write_text;
      write_text = wt;
      return wto;
    };
    Abc.prototype.out_trem = out_trem;
    Abc.prototype.setStrwh = strwh; // create by lhj
    Abc.prototype.set_font = function (str) {
      return set_font(str);
    };
    Abc.prototype.sort_pitch = sort_pitch;
    Abc.prototype.stv_g = function () {
      // console.log("Abc.prototype.stv_g-----------------", stv_g)
      return stv_g;
    };
    Abc.prototype.svg_flush = svg_flush;
    Abc.prototype.set_pagef = function () {
      blkdiv = 1;
    };
    Abc.prototype.tunes = tunes;
    Abc.prototype.tgls = tgls; // create by lhj
    //判断是否是扩展音符
    Abc.prototype.isExtendChar = isExtendChar;
    Abc.prototype.isExtend2Char = isExtend2Char;
    //获取扩展音符的显示
    Abc.prototype.getExtendObject = getExtendObject;
    Abc.prototype.glout = glout;
    var hook_init;
    function set_hooks() {
      var h = abc2svg.modules.hooks,
        gh = abc2svg.modules.g_hooks;
      function set_hs(hs) {
        var of, h;
        for (var k = 0; k < hs.length; k++) {
          h = hs[k];
          if (typeof h == "string") {
            if (!self[h]) {
              eval("self." + h + "=" + h);
            }
          } else if (typeof h == "function") {
            h(self);
          } else {
            if (h[0] == "output_music") {
              eval(
                "of=self." +
                  h[0] +
                  ";self." +
                  h[0] +
                  "=" +
                  h[1] +
                  ".bind(self,of)"
              );
            } else {
              eval("of=" + h[0] + ";" + h[0] + "=" + h[1] + ".bind(self,of)");
            }
          }
        }
      }
      if (hook_init) {
        if (h.length) {
          set_hs(h);
          gh.push.apply(gh, h);
          abc2svg.modules.hooks = [];
        }
      } else {
        if (h.length) {
          gh.push.apply(gh, h);
          abc2svg.modules.hooks = [];
        }
        set_hs(gh);
        hook_init = true;
      }
    }
    var self = this;
  },
};
abc2svg.keys = [
  new Int8Array([-1, -1, -1, -1, -1, -1, -1]),
  new Int8Array([-1, -1, -1, 0, -1, -1, -1]),
  new Int8Array([0, -1, -1, 0, -1, -1, -1]),
  new Int8Array([0, -1, -1, 0, 0, -1, -1]),
  new Int8Array([0, 0, -1, 0, 0, -1, -1]),
  new Int8Array([0, 0, -1, 0, 0, 0, -1]),
  new Int8Array([0, 0, 0, 0, 0, 0, -1]),
  new Int8Array([0, 0, 0, 0, 0, 0, 0]),
  new Int8Array([0, 0, 0, 1, 0, 0, 0]),
  new Int8Array([1, 0, 0, 1, 0, 0, 0]),
  new Int8Array([1, 0, 0, 1, 1, 0, 0]),
  new Int8Array([1, 1, 0, 1, 1, 0, 0]),
  new Int8Array([1, 1, 0, 1, 1, 1, 0]),
  new Int8Array([1, 1, 1, 1, 1, 1, 0]),
  new Int8Array([1, 1, 1, 1, 1, 1, 1]),
];
abc2svg.p_b40 = new Int8Array([2, 8, 14, 19, 25, 31, 37]);
abc2svg.b40_p = new Int8Array([
  0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4,
  4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6,
]);
abc2svg.b40_a = new Int8Array([
  -2, -1, 0, 1, 2, 0, -2, -1, 0, 1, 2, 0, -2, -1, 0, 1, 2, -2, -1, 0, 1, 2, 0,
  -2, -1, 0, 1, 2, 0, -2, -1, 0, 1, 2, 0, -2, -1, 0, 1, 2,
]);
abc2svg.b40_m = new Int8Array([
  -2, -1, 0, 1, 2, 0, 0, 1, 2, 3, 4, 0, 2, 3, 4, 5, 6, 3, 4, 5, 6, 7, 0, 5, 6,
  7, 8, 9, 0, 7, 8, 9, 10, 11, 0, 9, 10, 11, 12, 13,
]);
abc2svg.b40k = new Int8Array([
  36, 1, 2, 3, 8, 2, 2, 7, 8, 13, 14, 2, 8, 13, 14, 19, 20, 13, 14, 19, 20, 25,
  2, 19, 24, 25, 30, 31, 2, 25, 30, 31, 36, 37, 2, 31, 36, 37, 38, 3,
]);
abc2svg.b40sf = new Int8Array([
  -2, -7, 0, 7, 2, 88, 0, -5, 2, -3, 4, 88, 2, -3, 4, -1, 6, -3, 4, -1, 6, 1,
  88, -1, -6, 1, -4, 3, 88, 1, -4, 3, -2, 5, 88, 3, -2, 5, 0, 7,
]);
abc2svg.isb40 = new Int8Array([0, 1, 6, 11, 12, 17, 18, 23, 28, 29, 34, 35]);
abc2svg.ifb40 = new Int8Array([0, 5, 6, 11, 12, 17, 22, 23, 28, 29, 34, 39]);
abc2svg.pab40 = function (p, a) {
  p += 19;
  var b40 = ((p / 7) | 0) * 40 + abc2svg.p_b40[p % 7];
  if (a && a != 3) b40 += a;
  return b40;
};
abc2svg.b40p = function (b) {
  return ((b / 40) | 0) * 7 + abc2svg.b40_p[b % 40] - 19;
};
abc2svg.b40a = function (b) {
  return abc2svg.b40_a[b % 40];
};
abc2svg.b40m = function (b) {
  return ((b / 40) | 0) * 12 + abc2svg.b40_m[b % 40];
};
abc2svg.ch_alias = {
  maj: "",
  min: "m",
  "-": "m",
  "°": "dim",
  "+": "aug",
  "+5": "aug",
  maj7: "M7",
  Δ7: "M7",
  Δ: "M7",
  min7: "m7",
  "-7": "m7",
  ø7: "m7b5",
  "°7": "dim7",
  "min+7": "m+7",
  aug7: "+7",
  "7+5": "+7",
  "7#5": "+7",
  sus: "sus4",
  "7sus": "7sus4",
};
abc2svg.rat = function (n, d) {
  var a,
    t,
    n0 = 0,
    d1 = 0,
    n1 = 1,
    d0 = 1;
  while (1) {
    if (d == 0) break;
    t = d;
    a = (n / d) | 0;
    d = n % d;
    n = t;
    t = n0 + a * n1;
    n0 = n1;
    n1 = t;
    t = d0 + a * d1;
    d0 = d1;
    d1 = t;
  }
  return [n1, d1];
};
abc2svg.pitcmp = function (n1, n2) {
  return n1.pit - n2.pit;
};
function isExtendChar(c) {
  // update by zhoudc， 2020-08-26，for循环判断中不应该有表达式，更快
  for (var i = 0, len = extnotes.length; i < len; i++) {
    if (extnotes[i].char === c) {
      return true;
    }
  }
  return false;
}

function isExtend2Char(c) {
  // update by zhoudc， 2020-08-26，for循环判断中不应该有表达式，更快
  if (c) {
    c = c.replace(/[\,\'\_\^\-\=\/\d]/g, "");
  }
  for (var i = 0, len = extnotes2.length; i < len; i++) {
    if (extnotes2[i].char === c) {
      return true;
    }
  }
  return false;
}
//是否是罗马数字
function isLuoMa(str) {
  if (str.indexOf("fmt:") == 0) {
    return true;
  }
  if (str.indexOf("Ⅴ/") == 0) {
    //副属三和弦的处理，副属三和弦都是以Ⅴ/开头
    return false;
  }
  if (
    str.indexOf("Ⅰ") == 0 ||
    str.indexOf("Ⅱ") == 0 ||
    str.indexOf("Ⅲ") == 0 ||
    str.indexOf("Ⅳ") == 0 ||
    str.indexOf("Ⅴ") == 0 ||
    str.indexOf("Ⅵ") == 0 ||
    str.indexOf("Ⅶ") == 0 ||
    str.indexOf("K") == 0
  ) {
    return true;
  }
  //ⅱ,ⅲ,ⅳ,ⅴ,ⅵ,ⅶ,ⅷ
  if (
    str.indexOf("ⅰ") == 0 ||
    str.indexOf("ⅱ") == 0 ||
    str.indexOf("ⅲ") == 0 ||
    str.indexOf("ⅳ") == 0 ||
    str.indexOf("ⅴ") == 0 ||
    str.indexOf("ⅵ") == 0 ||
    str.indexOf("ⅶ") == 0 ||
    str.indexOf("ⅷ") == 0
  ) {
    return true;
  }
  //数字和弦判断
  if (isShuziChordLyric(str)) {
    return true;
  }
  return false;
}
//数字和弦判断
function isShuziChordLyric(str) {
  if (typeof shuzi_chord == "undefined") {
    return false;
  }
  for (var key in shuzi_chord) {
    for (var key2 in shuzi_chord[key]) {
      var vals = shuzi_chord[key][key2];
      for (var i = 0; i < vals.length; i++) {
        var v = vals[i];
        if (v == str) {
          return true;
        }
      }
    }
  }
  //	var yw = shuzi_chord["7"]["yuanwei"]
  //	for(var i=0;i<yw.length;i++){
  //		var v = yw[i];
  //		if(v==str){
  //			return true;
  //		}
  //	}
  //	var zw1 = shuzi_chord["7"]["zhuangwei1"]
  //	for(var i=0;i<zw1.length;i++){
  //		var v = zw1[i];
  //		if(v==str){
  //			return true;
  //		}
  //	}
  //	var zw2 = shuzi_chord["7"]["zhuangwei2"]
  //	for(var i=0;i<zw2.length;i++){
  //		var v = zw2[i];
  //		if(v==str){
  //			return true;
  //		}
  //	}
  //	var zw3 = shuzi_chord["7"]["zhuangwei3"]
  //	for(var i=0;i<zw3.length;i++){
  //		var v = zw3[i];
  //		if(v==str){
  //			return true;
  //		}
  //	}
  return false;
}
//字母和弦判断
function isZiMuLyric(str) {
  if (typeof zimu_chord == "undefined") {
    return false;
  }
  for (var key in zimu_chord) {
    var vals = zumu_chord[key];
    for (var i = 0; i < vals.length; i++) {
      if (vals[i] == str) {
        return true;
      }
    }
  }
  return false;
}
function getExtendObject(c) {
  if (c) {
    c = c.replace(/[\,\'\_\^\-\=\/\d]/g, "");
  }
  var arr = extnotes.concat(extnotes2);
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].char == c) {
      return arr[i];
    }
  }
  return null;
}
var Abc = abc2svg.Abc;
if (typeof module == "object" && typeof exports == "object") {
  exports.abc2svg = abc2svg;
  exports.Abc = Abc;
}
abc2svg.loadjs = function (fn, onsuccess, onerror) {
  if (onerror) onerror();
};
abc2svg.modules = {
  ambitus: {
    fn: "ambitus-1.js",
  },
  beginps: {
    fn: "psvg-1.js",
  },
  break: {
    fn: "break-1.js",
  },
  capo: {
    fn: "capo-1.js",
  },
  clip: {
    fn: "clip-1.js",
  },
  voicecombine: {
    fn: "combine-1.js",
  },
  diagram: {
    fn: "diag-1.js",
  },
  equalbars: {
    fn: "equalbars-1.js",
  },
  grid: {
    fn: "grid-1.js",
  },
  grid2: {
    fn: "grid2-1.js",
  },
  MIDI: {
    fn: "MIDI-1.js",
  },
  pageheight: {
    fn: "page-1.js",
  },
  strtab: {
    fn: "strtab-1.js",
  },
  percmap: {
    fn: "perc-1.js",
  },
  soloffs: {
    fn: "soloffs-1.js",
  },
  sth: {
    fn: "sth-1.js",
  },
  temperament: {
    fn: "temper-1.js",
  },
  grapheditor: {
    fn: "graph-editor.js",
  },
  nreq: 0,
  hooks: [],
  g_hooks: [],
  load: function (file, relay, errmsg) {
    function get_errmsg() {
      if (typeof user == "object" && user.errmsg) return user.errmsg;
      if (typeof printErr == "function") return printErr;
      if (typeof alert == "function")
        return function (m) {
          window.top.alert(m);
        };
      if (typeof console == "object") return console.log;
      return function () {};
    }
    var m,
      r,
      nreq_i = this.nreq,
      ls = file.match(/(^|\n)%%.+?\b/g);
    if (!ls) return true;
    //如果是简谱，则直接加上小节对齐 自动加上equalsbar
    //    	var existEqualbars = false;
    //        if(musicType==2){
    //
    //        	for (var i = 0; i < ls.length; i++) {
    //        		var val = ls[i];
    //        		if(val.indexOf("%%equalbars")>-1){
    //        			existEqualbars = true;
    //        		}
    //        	}
    //        	if(!existEqualbars){
    //        		ls.push("\n%%equalbars");
    //        	}
    //        }
    this.cbf = relay || function () {};
    this.errmsg = errmsg || get_errmsg();
    for (var i = 0; i < ls.length; i++) {
      m = abc2svg.modules[ls[i].replace(/\n?%%/, "")];
      if (!m || m.loaded) continue;
      m.loaded = true;
      this.nreq++;
      abc2svg.loadjs(
        m.fn,
        function () {
          if (--abc2svg.modules.nreq == 0) abc2svg.modules.cbf();
        },
        function () {
          try {
            abc2svg.modules.errmsg("error loading " + m.fn);
            if (--abc2svg.modules.nreq == 0) abc2svg.modules.cbf();
          } catch (err) {}
        }
      );
    }
    return this.nreq == nreq_i;
  },
};
//add by hxs 鼠标移动事件
function mousemovehandler(e) {
  if (dragRect) {
    if ($("rect[selected='selected']").length > 0) {
      updatePath(e);
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    return;
  }
  if (dragDecoFlag) {
    if ($("rect[selected='selected']").length > 0) {
      moveDeco(e);
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    return;
  }
  if (!draw_editor) {
    return;
  }
  followMouse(e);
}

function mouseouthandler(e) {
  console.log("———————————", e);
  select_note_info = null;
  cen = null;
  editSvgLineIndex = -1;
  $("#use_black").remove();
  $("use[type='demo_hl']").remove();
  $(".editor_rect").removeClass("editor_rect");
}
function svgdblclickhandle(e) {
  console.log("svgdblclickhandle");
}
function svgclickhandler(e) {
  if (e && e.target.tagName.toUpperCase() != "RECT") {
    $("rect[type='startpoint']").remove();
    $("rect[type='endpoint']").remove();
    $("rect[type='control1']").remove();
    $("rect[type='control2']").remove();
  }

  setSelectBarStyle();

  console.log("---svgclickhandler");
  if ($(".lyric").length > 0 && $(".lyric").hasClass("menu-pressed")) {
    $(".lyric").removeClass("menu-pressed");
    genLyric();
    return;
  }
  if (typeof hiddenMenu == "function") {
    hiddenMenu();
  }
  if (!draw_editor) {
    //非插入状态，直接返回
    return true;
  }
  if (isSelectDeco) {
    //选中装饰的状态下，直接返回
    return true;
  }
  genClickNote(e);
}
var hasLoadGraphEditorJs = false;
//切换输入模式
function switchPrachEditor(obj) {
  user.clickAddText = false;
  $("#target").css("cursor", "default");
  if ($(".lyric").hasClass("menu-pressed")) {
    $(".lyric").click();
    $(".lyric").removeClass("menu-pressed");
  }
  if ($("#insertWord").hasClass("menu-pressed")) {
    $("#insertWord").removeClass("menu-pressed");
    setTimeout(src_change, 100); //如果切换输入模式前，是插入文字模式，则要先重新渲染一下谱子，否则istart可能对不上
  }
  editSvgLineIndex = -1;
  if (musicType == 2) {
    //简谱没有插入状态
    $("#graphEditorMenu").attr("title", "当前模式：修改");
    graph_update = true;
    $("#use_black").remove();
    if ($("#graphEditorMenuInsert")) {
      $("#graphEditorMenuInsert").removeClass("menu-pressed");
    }
    if ($("#graphEditorMenuUpdate")) {
      $("#graphEditorMenuUpdate").removeClass("menu-pressed");
    }
    return;
  }
  draw_editor = !draw_editor;
  if ($("#graphEditorMenuUpdate")) {
    $("#graphEditorMenuUpdate").removeClass("menu-pressed");
  }
  if ($("#graphEditorMenuInsert")) {
    $("#graphEditorMenuInsert").removeClass("menu-pressed");
  }
  if (draw_editor) {
    //$("#graphEditorMenu").attr("title","当前模式：插入");

    graph_update = false;
    if (!hasLoadGraphEditorJs) {
      abc2svg.loadjs("graph-editor.js", function () {
        hasLoadGraphEditorJs = true;
      });
    }

    if ($("#graphEditorMenuInsert")) {
      $("#graphEditorMenuInsert").addClass("menu-pressed");
    }

    let selectSvg = null;
    $("svg").each((i, e) => {
      if (e?.id.includes("mysvgnode")) selectSvg = e;
    });
    if (selectSvg) {
      selectSvg.remove();
      $("#nodeMenu").css({ display: "none" });
    }
  } else {
    //$("#graphEditorMenu").attr("title","当前模式：修改");
    graph_update = true;
    $("#use_black").remove();
    $(".editor_rect").removeClass("editor_rect");
    $('use[type="demo_hl"]').remove();
    if ($("#graphEditorMenuUpdate")) {
      $("#graphEditorMenuUpdate").addClass("menu-pressed");
    }
  }
  $("#selectedStatus").removeClass("menu-pressed");
  //	if(graph_update){
  //		graph_update = !graph_update;
  //		if($("#graphUpdateMenu")){
  //			$("#graphUpdateMenu").removeClass("menu-pressed");
  //		}
  //	}
}

function updatePrachEditor() {
  currentEditorObject = null;
  graph_update = !graph_update;
  if (graph_update) {
    if (!hasLoadGraphEditorJs) {
      abc2svg.loadjs("graph-editor.js", function () {
        hasLoadGraphEditorJs = true;
      });
    }
    $("#use_black").remove();
    $("rect").css("fill-opacity", "0.0");
    if ($("#graphUpdateMenu")) {
      $("#graphUpdateMenu").addClass("menu-pressed");
    }
  } else {
    if ($("#graphUpdateMenu")) {
      $("#graphUpdateMenu").removeClass("menu-pressed");
    }
  }
  if (draw_editor) {
    draw_editor = !draw_editor;
    if ($("#graphEditorMenu")) {
      $("#graphEditorMenu").removeClass("menu-pressed");
    }
  }
}
var initSvgTop = -1;
//选中连谱号事件
function selScore(e, obj) {
  $("svg[type='rectnode']").remove();
  $("#nodeMenu").hide();
  console.log(e.offsetY, e.pageY, e.clientY);
  $(obj).addClass("selected_text");
  //添加拖动杆
  var box = obj.getBoundingClientRect();
  var bbox = $(obj)[0].getBBox();
  //	console.log("box:",box)
  //	console.log("bbox:",bbox)
  var r = 10;
  var type = $(obj).attr("type");
  var top = 0;
  var left = 0;
  var heightrate = 1;

  var rectStart = null;
  var rectEnd = null;

  if (type == "brace") {
    var transformStr = $(obj).attr("transform");
    var translate = getTransformsTranslate(transformStr);
    var scaleStr = getTransformsScale(transformStr);
    console.log("tscale:", scaleStr);
    var tscale = parseFloat(scaleStr.split(",")[1]);
    top = parseFloat(translate.y) - (bbox.height * tscale) / scale;
    left = 5;
    if (tscale != 1) {
      //			switch(tscale){
      //				case 4.5:
      //					heightrate = 1.4;
      //					break;
      //				case 8:
      //					heightrate = 2.2;
      //					break;
      //				case 11.5:
      //					heightrate = 6;
      //					break;
      //				case 15:
      //					heightrate = 12;
      //					break;
      //				default:
      //					heightrate = 1;
      //			}

      heightrate = 1 + tscale / 40;
    }
    if (initSvgTop == -1) {
      initSvgTop =
        $(obj).parents("svg").offset().top +
        $(".right-top-content").scrollTop();
    }
    rectStart = drawRect(
      "linkclef",
      bbox.x + bbox.width + left,
      $(obj).offset().top / scale -
        initSvgTop / scale +
        $(".right-top-content").scrollTop() / scale,
      r,
      "start",
      $(obj).attr("type")
    );
    rectEnd = drawRect(
      "linkclef",
      bbox.x + bbox.width + left,
      top + (bbox.height * tscale) / scale,
      r,
      "end",
      $(obj).attr("type")
    );
  } else if (type == "bracket") {
    var d = $(obj).attr("d");
    var mReg = /m(.*)/;
    var matchs = d.match(mReg);
    if (matchs != null) {
      var coorStr = matchs[1];
      top = parseFloat(coorStr.split(" ")[1]);
    }
    top = top - 15;
    left = -12;
    rectStart = drawRect(
      "linkclef",
      bbox.x + bbox.width + left,
      top,
      r,
      "start",
      $(obj).attr("type")
    );
    rectEnd = drawRect(
      "linkclef",
      bbox.x + bbox.width + left,
      top + bbox.height * heightrate + 12,
      r,
      "end",
      $(obj).attr("type")
    );
  }

  $(obj).parent().append(rectStart);
  $(obj).parent().append(rectEnd);
}

//取单个音符的slurHeight
function getNoteSlurHeight(s) {
  var gch = s.a_gch;
  if (gch) {
    for (var i = 0; i < gch.length; i++) {
      var g = gch[i];
      var text = g.text;
      if (text.indexOf("sh:") == 0) {
        var sh = text.replace("sh:", "");
        if (sh != "") {
          sh = parseFloat(sh);
          return sh;
        }
      }
    }
  }
  return 1;
}
/**
 * 画跨声部的s型连音线
 * @param svg 所在的svg
 * @param startPoint 开始点的坐标（包函x,y）
 * @param endPoint 结束点的坐标（包函x,y）
 * @returns
 */
function drawBezierCurve(svg, startPoint, endPoint) {
  //给定2个点，画平滑贝赛尔曲线
  //	var mx = 300,my = 200;//起点
  //	var tx = 660,ty = 314;//终点
  if (startPoint.y > endPoint.y) {
    var tmpPoint = clone(startPoint, 1);
    startPoint = clone(endPoint);
    endPoint = tmpPoint;
  }
  var mx = startPoint.x;
  var my = startPoint.y;
  var tx = endPoint.x;
  var ty = endPoint.y;
  var qx2 = mx + (tx - mx) / 2,
    qy2 = my + (ty - my) / 2; //切点
  var qx1 = mx + 10,
    qy1 = qy2; //控制点
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  var dStr =
    "M" +
    mx +
    " " +
    my +
    " Q" +
    qx1 +
    " " +
    qy1 +
    " " +
    qx2 +
    " " +
    qy2 +
    " T" +
    tx +
    " " +
    ty;
  path.setAttribute("d", dStr);
  path.setAttribute("stroke", "#000000");
  path.setAttribute("style", "stroke-width: 1px;");
  path.setAttribute("fill", "none");
  svg.append(path);
}
function drawCustomSlur(value) {
  var istart = value.s_start.istart;
  var iend = value.s_end.istart;

  var startPoint = new Object(); //开始点
  var endPoint = new Object(); //结束点
  var srect = $(
    "rect[istart=" +
      istart +
      "][type='note'],rect[istart=" +
      istart +
      "][type='rest'],rect[istart=" +
      istart +
      "][type='bar']"
  );
  var erect = $(
    "rect[istart=" +
      iend +
      "][type='note'],rect[istart=" +
      iend +
      "][type='rest'],rect[istart=" +
      iend +
      "][type='bar']"
  );
  var startTransformX = 0;
  var startTransformY = 0;
  var endTransformX = 0;
  var endTransformY = 0;
  if (musicType == 2) {
    srect = $(
      "rect[istart=" +
        istart +
        "][type='splnum_note'],rect[istart=" +
        istart +
        "][type='splnum_rest'],rect[istart=" +
        istart +
        "][type='splnum_bar']"
    );
    erect = $(
      "rect[istart=" +
        iend +
        "][type='splnum_note'],rect[istart=" +
        iend +
        "][type='splnum_rest'],rect[istart=" +
        iend +
        "][type='splnum_bar']"
    );
    var startParent = $(srect).parents("g")[0];
    var startTransform = $(startParent).attr("transform");
    var startTranslate = getTransformsTranslate(startTransform);
    startTransformX = startTranslate.x;
    startTransformY = startTranslate.y;

    var endParent = $(erect).parents("g")[0];
    var endTransform = $(endParent).attr("transform");
    var endTranslate = getTransformsTranslate(endTransform);
    if (endTranslate) {
      endTransformX = endTranslate.x;
      endTransformY = endTranslate.y;
    }
  }
  var svg = $(srect).parents("svg")[0];
  var width = parseFloat($(srect).attr("width"));
  var height = parseFloat($(srect).attr("height"));

  startPoint.x =
    (parseFloat($(srect).attr("x")) +
      parseFloat(startTransformX) +
      width / 2 +
      value.startPoint.x) *
    scale;
  startPoint.oriX =
    (parseFloat($(srect).attr("x")) + parseFloat(startTransformX) + width / 2) *
    scale;
  startPoint.y =
    (parseFloat($(srect).attr("y")) +
      parseFloat(startTransformY) +
      value.startPoint.y) *
    scale;
  startPoint.oriY =
    (parseFloat($(srect).attr("y")) + parseFloat(startTransformY)) * scale;
  startPoint.h = parseFloat($(srect).attr("height"));

  if (iend == -1) {
    //如果未指定终点，则先画一个跟起点比较近的位置
    endPoint.x = startPoint.x + 100;
    endPoint.y = startPoint.y;
    endPoint.h = startPoint.h;
  } else {
    endPoint.x =
      (parseFloat($(erect).attr("x")) +
        parseFloat(endTransformX) +
        width / 2 +
        value.endPoint.x) *
      scale;
    endPoint.oriX =
      (parseFloat($(erect).attr("x")) + parseFloat(endTransformX) + width / 2) *
      scale;
    endPoint.y =
      (parseFloat($(erect).attr("y")) +
        parseFloat(endTransformY) +
        value.endPoint.y) *
      scale;
    endPoint.oriY =
      (parseFloat($(erect).attr("y")) + parseFloat(endTransformY)) * scale;
    endPoint.h = parseFloat($(erect).attr("height"));
  }
  startPoint.istart = istart;
  endPoint.istart = iend;
  drawStaffSlur(svg, startPoint, endPoint, value.control1, value.control2);
}
function drawMySlur(start, end, type) {
  var startPoint = new Object(); //开始点
  var endPoint = new Object(); //结束点
  var srect = $("rect[istart=" + start + "][type='note']");
  var erect = $("rect[istart=" + end + "][type='note']");
  var svg = $(srect).parents("svg")[0];
  var width = parseFloat($(srect).attr("width"));
  var height = parseFloat($(srect).attr("height"));
  //如果开始点的istart大于结束点的istart，说明起点在下面的声部
  var reverse = false;
  if (start > end && end != -1) {
    reverse = true;
  }

  startPoint.x = (parseFloat($(srect).attr("x")) + width / 2) * scale;
  startPoint.y = (parseFloat($(srect).attr("y")) + height) * scale;
  startPoint.h = parseFloat($(srect).attr("height"));
  if (reverse) {
    startPoint.y -= startPoint.h;
  }
  startPoint.istart = start;
  if (end == -1) {
    //如果未指定终点，则先画一个跟起点比较近的位置
    endPoint.x = startPoint.x + 100;
    endPoint.y = startPoint.y;
    endPoint.h = startPoint.h;
  } else {
    endPoint.x = (parseFloat($(erect).attr("x")) + width / 2) * scale;
    endPoint.y = parseFloat($(erect).attr("y")) * scale;
    endPoint.h = parseFloat($(erect).attr("height"));
  }
  if (reverse) {
    endPoint.y += endPoint.h;
  }
  endPoint.istart = end;

  if (type == "s_slur") {
    //s形的跨声部连音线
    drawBezierCurve(svg, startPoint, endPoint);
  } else if (type == "k_slur") {
    //普通的跨声部连音线
    //		drawStaffSlur(svg,startPoint,endPoint);
  }
}
//渲染贝赛尔s型连音线
function renderMySlur(type) {
  if (type == "s_slur") {
    if (bezier_slurs_left.length > 0) {
      for (var i = 0; i < bezier_slurs_left.length; i++) {
        var s_istart = bezier_slurs_left[i];
        if (bezier_slurs_right[i]) {
          var e_istart = bezier_slurs_right[i];
          drawMySlur(s_istart, e_istart, type);
        }
      }
    }
  } else if (type == "k_slur") {
    if (staff_slurs_left.length > 0) {
      for (var i = 0; i < staff_slurs_left.length; i++) {
        var s_istart = staff_slurs_left[i];
        if (staff_slurs_right[i]) {
          var e_istart = staff_slurs_right[i];
          drawMySlur(s_istart, e_istart, type);
        } else {
          drawMySlur(s_istart, -1, type);
        }
      }
    }
  } else if (type == "custom") {
    if (customSlur.size > 0) {
      customSlur.forEach(function (value, key) {
        if (value.s_start && value.s_end) {
          var istart = value.s_start.istart;
          var iend = value.s_end.istart;
          drawCustomSlur(value);
        }
      });
    }
  }
}
//画正常的跨声部连音线
function drawStaffSlur(svg, startPoint, endPoint, control1, control2) {
  //	if(startPoint.y>endPoint.y){
  //		var tmpPoint = clone(startPoint,1);
  //		startPoint = clone(endPoint);
  //		endPoint = tmpPoint;
  //	}
  drawSlurPath(svg, startPoint, endPoint, control1, control2);
}
//画带中括号的注释
function renderMyWaveGch() {
  if (waveGch.size > 0) {
    var waveGchFontSize = 14;
    waveGchFontSize = getWaveGchFontSize();
    if (!waveGchFontSize) {
      waveGchFontSize = 14;
    }
    waveGch.forEach(function (value, key) {
      var istart = value.s_start.istart;
      var iend = value.s_end.istart;
      console.log(value);
      drawWaveGch(value, waveGchFontSize);
    });
  }
}
//获取自定义波浪线标注字体大小
function getWaveGchFontSize() {
  var content = document.getElementById("source").value;
  var waveGchFontSizePattern = /wavegchfont\s*(\d{1,2})/;
  var matchs = content.match(waveGchFontSizePattern);
  if (matchs != null) {
    var fontSize = matchs[1];
    return parseInt(fontSize);
  }
  return null;
}
//
function drawWaveGch(value, fontSize) {
  var word = value.text;
  var istart = value.s_start.istart;
  var top = value.top;
  var iend = value.s_end.istart;
  var ss = syms[istart];
  var es = syms[iend];

  var startPoint = new Object(); //开始点
  var endPoint = new Object(); //结束点
  var srect = $(
    "rect[istart=" +
      istart +
      "][type='note'],rect[istart=" +
      istart +
      "][type='bar'],rect[istart=" +
      istart +
      "][type='rest']"
  );
  var erect = $(
    "rect[istart=" +
      iend +
      "][type='note'],rect[istart=" +
      iend +
      "][type='bar'],rect[istart=" +
      iend +
      "][type='rest']"
  );
  var startTransformX = 0;
  var startTransformY = 0;
  var endTransformX = 0;
  var endTransformY = 0;
  if (musicType == 2) {
    srect = $(
      "rect[istart=" +
        istart +
        "][type='splnum_note'],rect[istart=" +
        istart +
        "][type='splnum_bar'],rect[istart=" +
        istart +
        "][type='splnum_rest']"
    );
    erect = $(
      "rect[istart=" +
        iend +
        "][type='splnum_note'],rect[istart=" +
        iend +
        "][type='splnum_bar'],rect[istart=" +
        iend +
        "][type='splnum_rest']"
    );
    var startParent = $(srect).parents("g")[0];
    var startTransform = $(startParent).attr("transform");
    var startTranslate = getTransformsTranslate(startTransform);
    if (startTranslate) {
      startTransformX = startTranslate.x;
      startTransformY = startTranslate.y;
    }

    var endParent = $(erect).parents("g")[0];
    var endTransform = $(endParent).attr("transform");
    var endTranslate = getTransformsTranslate(endTransform);
    if (endTranslate) {
      endTransformX = endTranslate.x;
      endTransformY = endTranslate.y;
    }
  }
  var svg = $(srect).parents("svg")[0];
  var width = parseFloat($(srect).attr("width"));
  var height = parseFloat($(srect).attr("height"));

  startPoint.x =
    (parseFloat($(srect).attr("x")) +
      parseFloat(startTransformX) +
      width / 2 +
      (value.startPoint ? value.startPoint.x : 0)) *
    scale;
  startPoint.oriX =
    (parseFloat($(srect).attr("x")) + parseFloat(startTransformX) + width / 2) *
    scale;
  startPoint.y =
    (parseFloat($(srect).attr("y")) +
      parseFloat(startTransformY) +
      (value.startPoint ? value.startPoint.y : 0)) *
      scale +
    parseFloat(top) * scale;
  startPoint.oriY =
    (parseFloat($(srect).attr("y")) + parseFloat(startTransformY)) * scale;
  startPoint.h = parseFloat($(srect).attr("height"));
  startPoint.w = width;
  startPoint.type = value.type;
  endPoint.type = value.type;

  if (iend == -1) {
    //如果未指定终点，则先画一个跟起点比较近的位置
    endPoint.x = startPoint.x + 100;
    endPoint.y = startPoint.y;
    endPoint.h = startPoint.h;
  } else {
    endPoint.x =
      (parseFloat($(erect).attr("x")) +
        parseFloat(endTransformX) +
        width / 2 +
        (value.endPoint ? value.endPoint.x : 0)) *
      scale;
    endPoint.oriX =
      (parseFloat($(erect).attr("x")) + parseFloat(endTransformX) + width / 2) *
      scale;
    endPoint.y =
      (parseFloat($(erect).attr("y")) +
        parseFloat(endTransformY) +
        (value.endPoint ? value.endPoint.y : 0)) *
        scale +
      parseFloat(top) * scale;
    endPoint.oriY =
      (parseFloat($(erect).attr("y")) + parseFloat(endTransformY)) * scale;
    endPoint.h = parseFloat($(erect).attr("height"));
  }
  startPoint.istart = istart;
  endPoint.istart = iend;
  if (musicType == 2) {
    startPoint.y -= 10;
  }
  startPoint.seq = value.seq;
  endPoint.seq = value.seq;

  if (ss && es && ss.my_line != es.my_line) {
    //如果不在同一行
    var lineEndS = null; //一行最后一个音符
    var next = ss.next;
    while (next) {
      if (next.next) {
        next = next.next;
      } else {
        break;
      }
    }
    lineEndS = next;
    var lineEndPoint = new Object();
    lineEndPoint.x = lineEndS.x * scale;
    lineEndPoint.y = startPoint.y;
    lineEndPoint.istart = endPoint.istart;
    lineEndPoint.seq = value.seq;
    drawWaveGchPath(svg, startPoint, lineEndPoint, word, fontSize, "start");

    //画下一行
    var lineStartS = null; //一行最前一个
    var prev = es.prev;
    while (prev) {
      if (prev.prev) {
        prev = prev.prev;
      } else {
        break;
      }
    }
    lineStartS = prev;
    var lineStartPoint = new Object();
    if (musicType == 2) {
      lineStartPoint.x = lineStartS.x * scale + 40;
    } else {
      lineStartPoint.x = lineStartS.x * scale + 20;
      endPoint.x += 5;
    }
    lineStartPoint.y = endPoint.y - 10;
    lineStartPoint.istart = startPoint.istart;
    lineStartPoint.seq = value.seq;
    drawWaveGchPath(
      $(erect).parents("svg"),
      lineStartPoint,
      endPoint,
      "",
      fontSize,
      "end"
    );
    return;
  } else {
    drawWaveGchPath(svg, startPoint, endPoint, word, fontSize);
  }
}

function drawWaveGchPath(svg, startPoint, endPoint, word, fontSize, drawType) {
  startPoint.x -= 2;
  endPoint.x += 2;
  var fs = 12;
  if (fontSize) {
    fs = fontSize;
  }
  fs = fs * scale;
  var font = { fontsize: fs, fontfamily: "sans-serif" };
  var wordWidth = getTextWidth(word, font.fontsize + "px " + font.fontfamily);
  var distance = endPoint.x - startPoint.x;

  var target = new Date().getTime();
  var seq = startPoint.seq;

  //显示在下方
  if (startPoint.type == "_") {
    startPoint.y += startPoint.h * scale + 30;
    endPoint.y += startPoint.h * scale + 30;
  } else {
    //显示在上方
    startPoint.y -= 20;
    endPoint.y -= 20;
  }

  var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  text.setAttribute("id", target);
  text.setAttribute("type", "bracketgch");
  text.setAttribute("subtype", "wave");
  text.setAttribute("seq", seq);
  text.setAttribute("x", startPoint.x + distance / 2 - wordWidth / 2);
  text.setAttribute("y", startPoint.y - 8);
  text.setAttribute("ori-y", startPoint.y - 8);

  text.setAttribute("start_istart", startPoint.istart);
  text.setAttribute("end_istart", endPoint.istart);
  text.setAttribute(
    "style",
    "font-size:" +
      font.fontsize +
      "px;font-family:" +
      font.fontfamily +
      ";cursor:pointer;"
  );
  var textNode = document.createTextNode(word);
  text.appendChild(textNode);

  text.addEventListener("click", function (e) {
    if (!user.editorAnnot) {
      return;
    }
    $("rect[type='startpoint']").remove();
    $("rect[type='endpoint']").remove();
    if (drawType) {
      //开始和结束点不在一行
      drawrectPath(svg, startPoint.x, startPoint.y, "startpoint", target);
      var endPath = $("path[type='lline'][subtype='end'][seq='" + seq + "']");
      var ex = $(endPath).attr("my_x");
      var ey = parseFloat($(endPath).attr("my_y")) + 10;
      drawrectPath($(endPath).parents("svg"), ex, ey, "endpoint", target);
    } else {
      //单击选中,y坐标都使用开始点的，这样能保证在一条线上
      drawrectPath(svg, startPoint.x, startPoint.y, "startpoint", target);
      drawrectPath(svg, endPoint.x, startPoint.y, "endpoint", target);
    }
    e.preventDefault();
    e.stopPropagation();
  });
  text.addEventListener("dblclick", function (e) {
    if (!user.editorAnnot) {
      return;
    }
    //删除拖动框
    $("rect[target='" + target + "']").remove();
    var box = this.getBoundingClientRect();
    //		var $input = $('#tmpText');
    var input = document.createElement("textarea"); //$('#tmpComposerText');
    $(input).css("z-index", 2).css("position", "absolute");
    $("body").append($(input));
    var $self = $(this);
    // 设置值和属性
    $(input)
      .val($(this).text())
      .css({
        left: box.left,
        top: box.top,
        width: box.width + 20,
        height: box.height + 20,
      })
      .show() // 聚焦
      .focus() // 失去焦点移除输入框，设置值
      .on("blur", function () {
        //console.log("----",$(this).val())
        var textVal = $(this).val();
        $self.text(textVal);
        $(this).css("display", "none");
        var sIstart = $(this).attr("start_istart");
        var eIstart = $(this).attr("end_istart");
        if (textVal == "") {
          //删除
          delBracketGch(seq, "wave");
        } else {
          updateBracketGchText(seq, textVal, "wave");
        }
      });
  });
  text.addEventListener("mousedown", function (e) {
    if (user.mode == "editor") {
      bracketGchMouseDownTime = new Date().getTime();
      dragBracketGch = true;
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });
  text.addEventListener("mousemove", function (e) {
    if (user.mode == "editor") {
      if (dragBracketGch) {
        var parent = $(e.target).parents("g")[0];
        var transform = $(parent).attr("transform");
        var o = getTransformsTranslate(transform);
        if (o == null) {
          o = new Object();
          o.x = 0;
          o.y = 0;
        }
        //$(event.target).attr("x",e.offsetX-($(e.target)[0].getBBox().width/2));
        $(event.target).attr("y", e.offsetY - o.y + 5);
        var id = $(event.target).attr("id");
        var ori_y = parseFloat($(event.target).attr("ori-y"));
        var curr_y = parseFloat($(event.target).attr("y"));
        var y_dist = curr_y - ori_y;

        //删除拖动框
        $("rect[target='" + target + "']").remove();

        var srect = $("rect[target='" + target + "'][type='bg_rect']");
        if (srect) {
          $(srect).attr("y", curr_y - y_dist - 5 - box.height);
        }
        //重新定位波浪线y
        if (startPoint.type == "_") {
          $("use[target='" + target + "']").attr(
            "y",
            e.offsetY / scale - o.y + 8 - 20
          );
        } else {
          $("use[target='" + target + "']").attr(
            "y",
            e.offsetY / scale - o.y + 8
          );
        }
      }
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });
  text.addEventListener("mouseup", function (e) {
    if (user.mode == "editor") {
      dragBracketGch = false;
      var bracketGchMouseUpTime = new Date().getTime();
      if (bracketGchMouseUpTime - bracketGchMouseDownTime < 200) {
        return;
      }
      var parents = $(this).parents("svg");
      var svg = parents[parents.length - 1];
      var x = parseInt(parseInt($(this).attr("x")));
      var y = parseInt(parseInt($(this).attr("y")) - 15);
      console.log("e.x", x, y);
      var ori_y = parseInt($(this).attr("ori-y"));
      var y_dist = y - ori_y;
      updateBrackGchTop(target);

      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });

  $(svg).append(rect);

  $(svg).append(text);
  var box = text.getBBox();
  /*rect.setAttribute('x',startPoint.x + (distance/2) - wordWidth/2-5);
	rect.setAttribute('y',startPoint.y-5-box.height);
	rect.setAttribute('ori-y',startPoint.y-5-box.height);
	rect.setAttribute('width',box.width+10);
	rect.setAttribute('height',box.height);
	rect.setAttribute('fill',"white");
	rect.setAttribute('type',"bg_rect");
	rect.setAttribute('target',target);*/

  //画波浪线
  var blX = startPoint.x;
  var blY = startPoint.y;

  for (var i = 0; i < parseInt((distance + startPoint.w) / (scale * 6)); i++) {
    var use = document.createElementNS(svgns, "use");
    //添加'href'属性（使用xlink命名空间）
    use.setAttributeNS(xlinkns, "href", "#ltr");
    use.setAttribute("x", blX / scale);
    if (startPoint.type == "_") {
      use.setAttribute("y", blY / scale - 20);
    } else {
      use.setAttribute("y", blY / scale);
    }
    use.setAttribute("type", "ltr");
    use.setAttribute("istart", "-1");
    use.setAttribute("cat", "mywave");
    use.setAttribute("target", target);
    if ($(svg).find(".g").length > 0) {
      $(svg).find(".g").append($(use));
    }
    //		$(svg).append($(use));
    blX += scale * 6;
  }
}

//画带中括号的注释
function renderMyBracketGch() {
  if (bracketGch.size > 0) {
    var bracketGchFontSize = 14;
    bracketGchFontSize = getBracketGchFontSize();
    bracketGch.forEach(function (value, key) {
      var istart = value.s_start.istart;
      var iend = value.s_end.istart;
      console.log(value);
      drawBracketGch(value, bracketGchFontSize);
    });
  }
}
//获取自定义带中括号标注字体大小
function getBracketGchFontSize() {
  var content = document.getElementById("source").value;
  var bracketGchFontSizePattern = /brackgchfont\s*(\d{1,2})/;
  var matchs = content.match(bracketGchFontSizePattern);
  if (matchs != null) {
    var fontSize = matchs[1];
    return parseInt(fontSize);
  }
  return null;
}
function drawBracketGch(value, bracketGchFontSize) {
  var word = value.text;
  var istart = value.s_start.istart;
  var top = value.top;
  var iend = value.s_end.istart;
  var ss = syms[istart];
  var es = syms[iend];

  var startPoint = new Object(); //开始点
  var endPoint = new Object(); //结束点
  var srect = $(
    "rect[istart=" +
      istart +
      "][type='note'],rect[istart=" +
      istart +
      "][type='bar'],rect[istart=" +
      istart +
      "][type='rest']"
  );
  var erect = $(
    "rect[istart=" +
      iend +
      "][type='note'],rect[istart=" +
      iend +
      "][type='bar'],rect[istart=" +
      iend +
      "][type='rest']"
  );
  var startTransformX = 0;
  var startTransformY = 0;
  var endTransformX = 0;
  var endTransformY = 0;
  if (musicType == 2) {
    srect = $(
      "rect[istart=" +
        istart +
        "][type='splnum_note'],rect[istart=" +
        istart +
        "][type='splnum_bar'],rect[istart=" +
        istart +
        "][type='splnum_rest']"
    );
    erect = $(
      "rect[istart=" +
        iend +
        "][type='splnum_note'],rect[istart=" +
        iend +
        "][type='splnum_bar'],rect[istart=" +
        iend +
        "][type='splnum_rest']"
    );
    var startParent = $(srect).parents("g")[0];
    var startTransform = $(startParent).attr("transform");
    var startTranslate = getTransformsTranslate(startTransform);
    if (startTranslate) {
      startTransformX = startTranslate.x;
      startTransformY = startTranslate.y;
    }

    var endParent = $(erect).parents("g")[0];
    var endTransform = $(endParent).attr("transform");
    var endTranslate = getTransformsTranslate(endTransform);
    if (endTranslate) {
      endTransformX = endTranslate.x;
      endTransformY = endTranslate.y;
    }
  }
  var svg = $(srect).parents("svg")[0];
  var width = parseFloat($(srect).attr("width"));
  var height = parseFloat($(srect).attr("height"));

  startPoint.x =
    (parseFloat($(srect).attr("x")) +
      parseFloat(startTransformX) +
      width / 2 +
      (value.startPoint ? value.startPoint.x : 0)) *
    scale;
  startPoint.oriX =
    (parseFloat($(srect).attr("x")) + parseFloat(startTransformX) + width / 2) *
    scale;
  startPoint.y =
    (parseFloat($(srect).attr("y")) +
      parseFloat(startTransformY) +
      (value.startPoint ? value.startPoint.y : 0)) *
      scale +
    parseFloat(top) * scale;
  startPoint.oriY =
    (parseFloat($(srect).attr("y")) + parseFloat(startTransformY)) * scale;
  startPoint.h = parseFloat($(srect).attr("height"));
  startPoint.type = value.type;
  endPoint.type = value.type;

  if (iend == -1) {
    //如果未指定终点，则先画一个跟起点比较近的位置
    endPoint.x = startPoint.x + 100;
    endPoint.y = startPoint.y;
    endPoint.h = startPoint.h;
  } else {
    endPoint.x =
      (parseFloat($(erect).attr("x")) +
        parseFloat(endTransformX) +
        width / 2 +
        (value.endPoint ? value.endPoint.x : 0)) *
      scale;
    endPoint.oriX =
      (parseFloat($(erect).attr("x")) + parseFloat(endTransformX) + width / 2) *
      scale;
    endPoint.y =
      (parseFloat($(erect).attr("y")) +
        parseFloat(endTransformY) +
        (value.endPoint ? value.endPoint.y : 0)) *
        scale +
      parseFloat(top) * scale;
    endPoint.oriY =
      (parseFloat($(erect).attr("y")) + parseFloat(endTransformY)) * scale;
    endPoint.h = parseFloat($(erect).attr("height"));
  }
  startPoint.istart = istart;
  endPoint.istart = iend;
  if (musicType == 2) {
    startPoint.y -= 10;
  }
  startPoint.seq = value.seq;
  endPoint.seq = value.seq;

  if (ss && es && ss.my_line != es.my_line) {
    //如果不在同一行
    var lineEndS = null; //一行最后一个音符
    var next = ss.next;
    while (next) {
      if (next.next) {
        next = next.next;
      } else {
        break;
      }
    }
    lineEndS = next;
    var lineEndPoint = new Object();
    lineEndPoint.x = lineEndS.x * scale;
    lineEndPoint.y = startPoint.y;
    lineEndPoint.istart = endPoint.istart;
    lineEndPoint.seq = value.seq;
    drawBracketGchPath(
      svg,
      startPoint,
      lineEndPoint,
      word,
      bracketGchFontSize,
      "start"
    );

    //画下一行
    var lineStartS = null; //一行最前一个
    var prev = es.prev;
    while (prev) {
      if (prev.prev) {
        prev = prev.prev;
      } else {
        break;
      }
    }
    lineStartS = prev;
    var lineStartPoint = new Object();
    if (musicType == 2) {
      lineStartPoint.x = lineStartS.x * scale + 40;
    } else {
      lineStartPoint.x = lineStartS.x * scale + 20;
      endPoint.x += 5;
    }
    lineStartPoint.y = endPoint.y - 10;
    lineStartPoint.istart = startPoint.istart;
    lineStartPoint.seq = value.seq;
    drawBracketGchPath(
      $(erect).parents("svg"),
      lineStartPoint,
      endPoint,
      "",
      bracketGchFontSize,
      "end"
    );
    return;
  } else {
    drawBracketGchPath(svg, startPoint, endPoint, word, bracketGchFontSize);
  }
}
//是否有某个注释
function hasGch(s, val) {
  var gch = s.a_gch;
  if (gch != null) {
    for (var i = 0; i < gch.length; i++) {
      var g = gch[i];
      if (g.text == val) {
        return true;
      }
    }
  }
  return false;
}
//是否包含某个注释 相当于like查询
function likeGch(s, val) {
  var gch = s.a_gch;
  if (gch != null) {
    for (var i = 0; i < gch.length; i++) {
      var g = gch[i];
      if (g.text.indexOf(val) > -1) {
        return true;
      }
    }
  }
  return false;
}
//获取注释的值，主要是根据给定的like的值得到完整的值
function getGch(s, val) {
  var gch = s.a_gch;
  if (gch != null) {
    for (var i = 0; i < gch.length; i++) {
      var g = gch[i];
      if (g.text.indexOf(val) > -1) {
        if (g.type != "g") {
          return g.type + g.text;
        }
        return g.text;
      }
    }
  }
  return false;
}
function getGchInfo(s, val) {
  var gch = s.a_gch;
  if (gch != null) {
    for (var i = 0; i < gch.length; i++) {
      var g = gch[i];
      if (
        g.text
          .replace(/\[font-size.[^\]]*\]/, "")
          .replace(xcoorGchReg, "")
          .replace(xcoorGchReg, "") == val
      ) {
        return g;
      }
    }
  }
  return null;
}
//获取a_dd的值
function getA_dd(s, val) {
  var arr = new Array();
  var a_dd = s.a_dd;
  if (a_dd != null) {
    for (var i = 0; i < a_dd.length; i++) {
      var dd = a_dd[i];
      if (dd.glyph.indexOf(val) == 0) {
        arr.push(dd.glyph);
      }
    }
  }
  return arr;
}
//获取a_dd
function getA_ddInfo(s, val) {
  console.log('getA_ddInfo', s, val);
  var isSplWedge = false;
  if (musicType == 2) {
    if (val == "wedge") {
      isSplWedge = true;
    }
  }
  var arr = new Array();
  if (!s) {
    return arr;
  }
  var a_dd = s.a_dd;
  if (a_dd != null) {
    for (var i = 0; i < a_dd.length; i++) {
      var dd = a_dd[i];
      if (dd.glyph == "pf" || dd.glyph == "dacs" || dd.glyph == "coda") {
        if (dd.str == val || dd.name == val || dd.glyph == val) {
          arr.push(dd);
        }
      } else {
        if (dd.glyph.indexOf(val) == 0 || val.indexOf(dd.glyph) == 0) {
          arr.push(dd);
        } else if (isSplWedge && dd.glyph.indexOf("stc") == 0) {
          arr.push(dd);
        }
      }
    }
  }
  return arr;
}

//获取x-in注释的值
function getXIndent(s) {
  var xIndent = 0;
  if (s.a_gch) {
    var a_gch = s.a_gch;
    for (var i = 0; i < a_gch.length; i++) {
      var gch = a_gch[i];
      if (gch.text.indexOf("x-in:") == 0) {
        var val = gch.text.replace("x-in:", "");
        if (val != "") {
          xIndent = parseInt(val);
        }
        break;
      }
    }
  }
  return xIndent;
}
//判断是否有某个装饰音
function check_deco(s, name) {
  if (s.a_dd) {
    for (var i = 0; i < s.a_dd.length; i++) {
      if (s.a_dd[i].name == name) {
        return true;
      }
    }
  }
  return false;
}
//判断是否有某个装饰音（前匹配）
function check_deco_like(s, name) {
  if (s.a_dd) {
    for (var i = 0; i < s.a_dd.length; i++) {
      if (s.a_dd[i].name.indexOf(name) == 0) {
        return true;
      }
    }
  }
  return false;
}
// 是否中文 create by lhj
function isChinese(charCode) {
  return charCode >= 0 && charCode <= 128;
}
function isChinese2txt(txt) {
  var re = /[\u4e00-\u9fa5]/;
  if (re.test(txt)) {
    return true;
  } else {
    return false;
  }
}
//编辑反复框内的文字
function editorRepeatBarText(e) {
  if (!user.editorAnnot) {
    return;
  }
  console.log("---------------editorRepeatBarText");
  var selectedNote = $(e.target);
  console.log(selectedNote);
  if (selectedNote.length > 0) {
    var input = document.createElement("div");
    $(input)
      .css("z-index", 99999)
      .css("position", "absolute")
      .css("background-color", "white");
    $(input).attr("contenteditable", "true");
    $(input).addClass("editor-repeatbar");
    $(input).html($(selectedNote).text());
    var oldVal = $(selectedNote).text();
    $(input).on("keyup", function (e) {
      e.preventDefault();
    });
    var isfocus = false;
    $(input).focus(function (e) {
      console.log("聚焦");
      isfocus = true;
    });

    //失去焦点更新
    $(input).blur(function (e) {
      console.log("失焦", e);
      isfocus = false;
      var that = this;
      setTimeout(function () {
        if (isfocus) {
          return;
        }
        var val = $(that).text();
        var istart = $(selectedNote).attr("istart");
        var content = $("#source").val();
        var subStr = content.substring(istart);
        val = val.replace(/[。，、\,]/g, ".");
        if (isChinese2txt(val)) {
          val = '"' + val + '"';
        }
        var newContent =
          content.substring(0, istart) + subStr.replace(oldVal, val);
        $("#source").val(newContent);
        src_change();
        doLog();
        $(that).remove();
      }, 50);
    });

    var bbox = $(selectedNote)[0].getBBox();
    var box = $(selectedNote)[0].getBoundingClientRect();

    var inputTop = 0;
    var inputHeight = 30;

    var pLeft = $("#target").offset().left;
    var pTop = $("#target").offset().top;

    inputTop = box.top - pTop;

    $(input)
      .css({
        left: box.left - pLeft,
        top: inputTop,
        "min-width": 40,
        "min-height": inputHeight,
      })
      .show();

    $("#target").append($(input));
    $(input).focus();
  }
}

function addHelpAssessant(istart) {
  if (showHelpNote) {
    $(".helpnote").hide();
    var s = syms[istart];
    var clef_type = s.clef_type;
    var y = 0;
    if (clef_type == "t") {
      y = 12;
    } else if (clef_type == "b") {
      y = 18;
    }
    var st = s.st;
    var x = s.x;
    var helpText = $(".selected_text[istart='" + istart + "']")
      .parents("g")
      .find(".helpnote[st='" + st + "']");
    $(helpText).attr("x", x);
    $(helpText).attr("y", y);
    $(helpText).show();
  }
}
var moveSvgTextFlag = false;
//拖动文本
function mousedownSvgText(event) {
  if (!user.moveText) {
    return;
  }
  var target = $(event.target);
  if (!$(target).attr("ori_x")) {
    $(target).attr("selected", "selected");
    $(target).css("color", "#0E518F");
    $(target).attr("ori_x", $(target).attr("x"));
    $(target).attr("ori_y", $(target).attr("y"));
  }
  selectGchInfo = event.target;
  showProperties("gch", event);
  select_note_info = null;
  moveSvgTextFlag = true;
  event.preventDefault();
  event.stopPropagation();
}
//拖动文本
function moveSvgText(event) {
  if (!user.moveText) {
    return;
  }

  //console.log("--moveSvgText",event.offsetX/scale,$(event.target)[0].getBBox().width/2)
  //console.log("---top",event.offsetY/scale)
  var parent = $(event.target).parents("g")[0];
  var transform = $(parent).attr("transform");
  var o = getTransformsTranslate(transform);
  if (moveSvgTextFlag) {
    $(event.target).attr(
      "x",
      event.offsetX / scale - $(event.target)[0].getBBox().width / 2
    );
    $(event.target).attr("y", event.offsetY / scale - (o ? o.y : 0) + 5);
  }
  event.preventDefault();
  event.stopPropagation();
}
//拖动文本
function mouseupSvgText(event) {
  dragDecoRect = false;
  if (!user.moveText) {
    return;
  }
  moveSvgTextFlag = false;
  var txt = $(event.target);
  var orix = parseInt($(txt).attr("ori_x"));
  if (!orix) {
    orix = 0;
  }
  var oriy = parseInt($(txt).attr("ori_y"));
  if (!oriy) {
    oriy = 0;
  }
  var x = parseInt($(txt).attr("x"));
  var y = parseInt($(txt).attr("y"));
  var dx = x - orix;
  var dy = y - oriy;
  if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
    var gchIstart = $(txt).attr("gch_istart");
    var gchIend = $(txt).attr("gch_iend");
    var content = document.getElementById("source").value;
    var oldGch = content.substring(gchIstart, gchIend);
    var xcoorMatch = oldGch.match(xcoorGchReg);
    var ycoorMatch = oldGch.match(ycoorGchReg);
    var xCoorVal = 0; //注释x方向偏移
    var yCoorVal = 0; //注释y方向偏移
    if (xcoorMatch != null) {
      xCoorVal = parseInt(xcoorMatch[1]);
      oldGch = oldGch.replace(xcoorGchReg, "");
    }
    if (ycoorMatch != null) {
      yCoorVal = parseInt(ycoorMatch[1]);
      oldGch = oldGch.replace(ycoorGchReg, "");
    }

    var coorStr =
      "{x:" +
      (xCoorVal + parseInt(dx)) +
      ",y:" +
      (yCoorVal - parseInt(dy)) +
      "}";

    content =
      content.substring(0, gchIstart) +
      '"' +
      oldGch.replace(/\"/g, "") +
      coorStr +
      '"' +
      content.substring(parseInt(gchIend));
    $("#source").val(content);
    doLog();
    src_change();
    //		event.preventDefault();
    //		event.stopPropagation()
    return false;
  }
}
function mouseoutSvgText(event) {
  if (!user.moveText) {
    return;
  }
  moveSvgTextFlag = false;
}
//编辑谱表名字
function editorVname(obj) {
  if ($("#graphEditorMenu").hasClass("menu-pressed")) {
    $("#graphEditorMenu").click();
  }
  var pLeft = $("#target").offset().left;
  var pTop = $("#target").offset().top;

  var input = document.createElement("div");
  $(input)
    .css("z-index", 99999)
    .css("position", "absolute")
    .css("background-color", "white");
  $(input).attr("contenteditable", "true");
  $(input).addClass("editor-div");
  $(input).attr("v", $(obj).attr("type").replace("vname", ""));
  var oldVal = $(obj).html();
  $(input).html(oldVal);
  $(input).on("keyup", function (e) {
    e.preventDefault();
  });
  var isfocus = false;
  $(input).focus(function (e) {
    console.log("聚焦");
    isfocus = true;
  });
  //失去焦点更新
  $(input).blur(function (e) {
    console.log("失焦", e);
    isfocus = false;
    var that = this;
    setTimeout(function () {
      if (isfocus) {
        return;
      }
      var val = $(that).text();
      if (val == "") {
        val = " ";
      }
      var v = parseInt($(that).attr("v")) + 1;
      var nmReg = new RegExp("V:s*" + v + '.[^=]*nm="(.[^"]*)"');
      var snmReg = new RegExp("V:s*" + v + '.*snm="(.[^"]*)"');
      var content = $("#source").val();
      if (nmReg.test(content)) {
        //替换nm
        var matchNode = nmReg.exec(content);
        var oldStr = matchNode[0];

        if (oldVal == matchNode[1]) {
          var newStr = oldStr.replace(matchNode[1], val);
          content = content.replace(oldStr, newStr);
        }
      }
      if (snmReg.test(content)) {
        //替换snm
        var matchNode = snmReg.exec(content);
        var oldStr = matchNode[0];
        if (oldVal == matchNode[1]) {
          var newStr = oldStr.replace(matchNode[1], val);
          content = content.replace(oldStr, newStr);
        }
      }

      $("#source").val(content);
      doLog();
      src_change();
      $(that).remove();
    }, 50);
  });

  var bbox = $(obj)[0].getBBox();
  var box = $(obj)[0].getBoundingClientRect();

  var inputTop = 0;
  var inputHeight = 30;

  inputTop = box.top - pTop - x * 25;

  $(input)
    .css({
      left: box.left - pLeft,
      top: inputTop,
      "min-width": 40,
      "min-height": inputHeight,
    })
    .show();

  $("#target").append($(input));
  $(input).focus();
}
//获取标准声部的信息
function getStandVsyms() {
  var arr = new Array();
  for (var i = 0; i < syms.length; i++) {
    var s = syms[i];
    if (s && s.v == lyricStandV - 1 && (s.type == 10 || s.type == 8)) {
      arr.push(s);
    }
  }
  return arr;
}
function getBracketGchInfo(text, s, type) {
  //	开始标记 "[-0-注释-(高度)"  高度参数可能没有
  //	结束标记 "-0-]"
  var startReg = /\[\-(\d*)-/;
  var endReg = /(\d{1,3})\-\]/;
  if (startReg.test(text)) {
    //开始
    var seq = -1;
    var seqMatch = text.match(startReg);
    if (seqMatch != null) {
      seq = parseInt(seqMatch[1]);
    }
    var obj = bracketGch.get("bracketgch" + seq);
    if (!obj) {
      obj = new Object();
    }

    obj.seq = seq;
    obj.s_start = s;
    obj.text = text.replace(startReg, "");
    obj.top = 0;
    obj.type = type;
    if (obj.text.indexOf("-(") > -1) {
      //如果有设置高度
      var hReg = /\-\((.[^\(]*)\)/;
      var node = hReg.exec(obj.text);
      if (node) {
        obj.text = obj.text.replace(hReg, "");
        obj.top = node[1];
      }
    }
    bracketGch.set("bracketgch" + seq, obj);
  }
  if (endReg.test(text)) {
    //开始
    var seq = -1;
    var seqMatch = text.match(endReg);
    if (endReg != null) {
      seq = parseInt(seqMatch[1]);
    }
    var obj = bracketGch.get("bracketgch" + seq);
    if (!obj) {
      obj = new Object();
      obj.seq = seq;
    }
    obj.s_end = s;
    bracketGch.set("bracketgch" + seq, obj);
  }
}
function getWaveGchInfo(text, s, type) {
  //	开始标记 "[-0-注释-(高度)"  高度参数可能没有
  //	结束标记 "-0-]"
  var startReg = /\[\~(\d*)~/;
  var endReg = /(\d{1,3})\~\]/;
  if (startReg.test(text)) {
    //开始
    var seq = -1;
    var seqMatch = text.match(startReg);
    if (seqMatch != null) {
      seq = parseInt(seqMatch[1]);
    }
    var obj = waveGch.get("wavegch" + seq);
    if (!obj) {
      obj = new Object();
    }

    obj.seq = seq;
    obj.s_start = s;
    obj.text = text.replace(startReg, "");
    obj.top = 0;
    obj.type = type;
    if (obj.text.indexOf("-(") > -1) {
      //如果有设置高度
      var hReg = /\-\((.[^\(]*)\)/;
      var node = hReg.exec(obj.text);
      if (node) {
        obj.text = obj.text.replace(hReg, "");
        obj.top = node[1];
      }
    }
    waveGch.set("wavegch" + seq, obj);
  }
  if (endReg.test(text)) {
    //开始
    var seq = -1;
    var seqMatch = text.match(endReg);
    if (endReg != null) {
      seq = parseInt(seqMatch[1]);
    }
    var obj = waveGch.get("wavegch" + seq);
    if (!obj) {
      obj = new Object();
      obj.seq = seq;
    }
    obj.s_end = s;
    waveGch.set("wavegch" + seq, obj);
  }
}
//获自定义连音线信息
function getMySlurInfo(text, s) {
  //	 * 开始标记："(slur-1-[sx:10,sy:5,c1x:1,c1y:2,c2x:3,c2y:4]"  注释：x表示开始点x轴偏移，y表示开始点y轴偏移，c1为控制点1,c2为控制点2
  //	 * 结束标记：")slur-1-[x:10,y:5]"   注释：x表示结束点x轴偏移，y表示结束点y轴偏移

  if (text.indexOf("(slur") == 0) {
    var reg = /\(slur\-(\d*)/;
    var seq = -1;
    var seqMatch = text.match(reg);
    if (seqMatch != null) {
      seq = parseInt(seqMatch[1]);
    }

    var obj = customSlur.get("slur" + seq);
    if (!obj) {
      obj = new Object();
    }

    obj.seq = seq;
    obj.s_start = s;

    var startPoint = null;
    //开始点x坐标
    var sxReg = /sx\:([-]?\d*[.1-9]*)/;
    var sxMatch = text.match(sxReg);
    startPoint = _getxy(startPoint, sxMatch, "x");
    //开始点y坐标
    var syReg = /sy\:([-]?\d*[.1-9]*)/;
    var syMatch = text.match(syReg);
    startPoint = _getxy(startPoint, syMatch, "y");
    obj.startPoint = startPoint;

    var control1 = null;
    //控制点1 x坐标
    var c1xReg = /c1x\:([-]?\d*[.1-9]*)/;
    var c1xMatch = text.match(c1xReg);
    control1 = _getxy(control1, c1xMatch, "x");
    //控制点1 y坐标
    var c1yReg = /c1y\:([-]?\d*[.1-9]*)/;
    var c1yMatch = text.match(c1yReg);
    control1 = _getxy(control1, c1yMatch, "y");
    obj.control1 = control1;

    var control2 = null;
    //控制点2 x坐标
    var c2xReg = /c2x\:([-]?\d*[.1-9]*)/;
    var c2xMatch = text.match(c2xReg);
    control2 = _getxy(control2, c2xMatch, "x");
    //控制点1 y坐标
    var c2yReg = /c2y\:([-]?\d*[.1-9]*)/;
    var c2yMatch = text.match(c2yReg);
    control2 = _getxy(control2, c2yMatch, "y");
    obj.control2 = control2;
    customSlur.set("slur" + seq, obj);
    return obj;
  }
  if (text.indexOf(")slur") == 0) {
    var reg = /\)slur\-(\d*)/;
    var seq = -1;
    var seqMatch = text.match(reg);
    if (seqMatch != null) {
      seq = parseInt(seqMatch[1]);
    }

    var obj = customSlur.get("slur" + seq);
    if (!obj) {
      obj = new Object();
    }

    obj.seq = seq;
    obj.s_end = s;

    var endPoint = null;
    //结束点x坐标
    var exReg = /x\:([-]?\d*[.1-9]*)/;
    var exMatch = text.match(exReg);
    endPoint = _getxy(endPoint, exMatch, "x");
    //结束点y坐标
    var eyReg = /y\:([-]?\d*[.1-9]*)/;
    var eyMatch = text.match(eyReg);
    endPoint = _getxy(endPoint, eyMatch, "y");
    obj.endPoint = endPoint;
    customSlur.set("slur" + seq, obj);
    return obj;
  }
}
function _getxy(obj, matchInfo, xy) {
  if (matchInfo != null) {
    if (obj == null) {
      obj = new Object();
    }
    if (xy == "x") {
      obj.x = parseFloat(matchInfo[1]);
    } else if (xy == "y") {
      obj.y = parseFloat(matchInfo[1]);
    }
  }
  return obj;
}
/**
 * 获取自定义的装饰音的位置 信息
 * @param istart
 * @param type 装饰音类型
 * @returns
 */
//"{'gchtype':'pf','x':0,'y':0}"
function getDecoPos(istart, type) {
  for (var i = 0; i < myDecoPosArray.length; i++) {
    var obj = myDecoPosArray[i];
    if (
      obj.istart == istart &&
      obj.gchtype.replace(/\s/g, "").toLowerCase() ==
        type.replace(/\s/g, "").toLowerCase()
    ) {
      return obj;
    }
  }
  return null;
}
/**
 * 获取字符串在不同字体大小下的宽度
 * @param text 字符串
 * @param font 字体大小
 * @returns
 */
function getTextWidth(text, font) {
  var canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}
abc2svg.version = "1.17.7";
abc2svg.vdate = "2018-07-04";

function setSelectBarStyle() {
  // const selectBarRect = $('[type="rectnode"]')[0]?.children[0];
  // if (!selectBarRect) return;
  // $(selectBarRect).attr("stroke", "none");
  // $(selectBarRect).css({
  //   display: "block",
  //   fillOpacity: "1",
  //   fill: "rgba(0, 0, 0, .5)",
  //   transform: "translateX(-2px)",
  // });
}

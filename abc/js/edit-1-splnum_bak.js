const updateLastSelect = () => {
  const istart = window.lastIstart
    if (istart) {
      console.log(istart)
      $(`text[type*='HD'][istart='${istart}'],text[type^='r'][istart='${istart}']`).addClass('selected_text')
      window.lastIstart = null
    }
}

const getAllNote = () => $('rect[type="note"]');
const getNotIstartList = () => [
  ...new Set([...getAllNote()].map((item) => item.getAttribute("istart"))),
];
let oldNoteList = [];

let isFirst = true
const _init = async () => {
  if (!isFirst) return;
  isFirst = false;
  changeStaffType(null, content_vue.m.scoreOpts?.musicType === "easy" ? 2 : 0) |
    restoreEditor();
};

const previewScale = () => {
  const scale = 556 / $('#target').height()
  if (scale >= 1) {
    return $('body').css({
      transform: `scale(0.9)`
    })
  }
  $('body').css({
    transform: `scale(${scale})`
  })
}

const changeNobrk = () => {
  // $('.nobrk').css({
  //   borderRadius: '8px',
  //   overflow: 'hidden',
  //   boxShadow: '4px 4px 24px 0px rgba(0,22,41,0.14)',
  //   background: 'rgb(245, 245, 245)',
  //   minHeight: '800px',
  //   transform: `scale(${content_vue.m.panzoom.scale / 100})`,
  //   transformOrigin: 'top',
  //   cursor: `url(./img/${!draw_editor ? 'black' : 'blue'}.png), auto`
  // })
}

const changeSign = () => {
  if (location.href.indexOf('preview') < 0) {
    changeNobrk()
  } else {
    previewScale()
  }
  // $(`g[transform]>use[cat='decos'][type='wedge']`).each((i, item) => {
  //   const el = $(item)
  //   el.css({
  //     'transform': 'translateY(30px) rotate(180deg)'
  //   })
  // })
}

const selectNewNote = () => {
  const newNoteIstartList = getNotIstartList();
  const lengthDiff = newNoteIstartList.length - oldNoteList.length;
  if (lengthDiff === 1) {
    const istart = newNoteIstartList.find((newIstart) =>
      oldNoteList.every((oldIstart) => newIstart !== oldIstart)
    );
    if (istart)
      $(`text[istart="${istart}"][type="hd"]`).addClass("selected_text");
  }
  oldNoteList = newNoteIstartList;
  delObj = {
    click_obj: $("text.selected_text"),
  };
};

const setLyricStyle = () => {
  $(
    'text:not([selected="selected"])[type="lyric"],text[type="lyric"]>tspan'
  ).css(content_vue.m.lyric.style);
};

/***************************************************************************/
/*                                                                         */
/*  This obfuscated code was created by Javascript Obfuscator Free Version.*/
/*  Javascript Obfuscator Free Version can be downloaded here              */
/*  http://javascriptobfuscator.com                                        */
/*                                                                         */
/***************************************************************************/
var _$_6a78 = [
  "onerror",
  "Uncaught EvalError: Possible side-effect in debug-evaluate",
  "string",
  "window error: ",
  "\x0AURL: ",
  "\x0ALine: ",
  "alert",
  "top",
  "object",
  "type",
  " ",
  "src",
  "target",
  "noname.abc",
  "",
  "Bad line number",
  "File name: ",
  "Please, load the included file ",
  "currentScript",
  "match",
  "script",
  "getElementsByTagName",
  "length",
  "function",
  "display",
  "style",
  "s",
  "inline",
  "value",
  "src1",
  "innerHTML",
  "diverr",
  '<b onclick="gotoabc(',
  ",",
  ')" style="cursor: pointer; display: inline-block">',
  "</b><br/>\x0A",
  "<br/>\x0A",
  "indexOf",
  "beam",
  "slur",
  "tuplet",
  "clef_auto",
  "singleRect",
  "syncRect",
  "single",
  " ondblclick = 'editorAnnot(",
  ")'",
  "bar",
  "splnum_bar",
  " onclick='clickBar(",
  ",event)'",
  "tempo",
  "lyrics",
  "xin",
  "<rect ",
  ' type="',
  '" v="',
  "v",
  '" istart="',
  '" class="abcr _',
  '_" x="',
  "out_svg",
  "sh",
  '" y="',
  "undefined",
  "out_sxsy",
  "a_gch",
  "text",
  "test",
  '" onclick="window.open(\'',
  "')",
  '" style="cursor: pointer;',
  "meter",
  "clef",
  "clef_type",
  "t",
  "b",
  "c",
  "clef_small",
  '" width="',
  "toFixed",
  '" height="',
  '"/>\x0A',
  "showSplNumber",
  "apply",
  ".nobrk",
  "editor",
  "setItem",
  "removeItem",
  "getItem",
  "&lt;",
  "<",
  "&gt;",
  ">",
  "&amp;",
  "&",
  "replace",
  "edit-",
  ".js",
  "loadjs",
  "err-",
  "lang",
  "en",
  "getElementById",
  "visibility",
  "hidden",
  "visible",
  "files",
  "abcfile",
  "name",
  "onloadend",
  "result",
  "source",
  "%%linebreak",
  "UTF-8",
  "readAsText",
  "none",
  "backgroundColor",
  "#ffd0d0",
  "#80ff80",
  "a_pe",
  "%%abc-include ",
  "s1",
  "\x0A",
  "slice",
  "load",
  "hide",
  "#nodeMenu",
  "getTime",
  "val",
  "#source",
  "modules",
  "img_out",
  "my_img_out",
  "get_abcmodel",
  "Abc",
  "edit",
  "%%bgcolor #F5F5F5",
  "tosvg",
  "message",
  "\x0Aabc2svg tosvg bug - stack:\x0A",
  "stack",
  "abc_end",
  "render",
  "html",
  "#target",
  "\u89e3\u6790\u65f6\u957f\uff1a",
  "log",
  "\u6e32\u67d3\u65f6\u957f\uff1a",
  "abcLoadCball",
  "open",
  "horizontal",
  "100%",
  "auto",
  "border-box",
  "css",
  "scrollClass",
  "\x0Aabc2svg image bug - abort",
  "er",
  "hidefirstmeter",
  "first",
  ".staff_meter",
  ".spl_meter",
  ".spl_meter_mode",
  "bad_nb",
  "focus",
  "setSelectionRange",
  "split",
  "clickAddText",
  "attr",
  "mytext",
  "-----svgMouseDown",
  ".selected_text",
  ".selected_path",
  ".selected_text[type='note']",
  "istart",
  "iend",
  "substring",
  "2",
  "-----svgMouseUp",
  "svgClickCball",
  "showNoteInfo",
  "toLowerCase",
  "tagName",
  "rect",
  "svg",
  "parents",
  "offsetX",
  "offsetY",
  "type:",
  "showNoteInfoCallback",
  "getNote",
  "svgselBan",
  "class",
  "getAttribute",
  "ctxMenu",
  "isCtrl",
  "isEmptyClean",
  "substr",
  "abcr",
  "changePianoBoard",
  "findPosition",
  "loop",
  "stopImmediatePropagation",
  "preventDefault",
  "block",
  "playing",
  "stop",
  "abcplay",
  "scrollTop",
  "scrollHeight",
  "noteClick",
  "lightoperator",
  ".menu-box",
  "find",
  "menuActive",
  "setselCball",
  "isSelect2play",
  "_",
  "getElementsByClassName",
  "fillOpacity",
  "blur",
  "fill-opacity",
  "0.4",
  "idx:",
  "  v:",
  "seltxt:",
  "0",
  ".abcr",
  "selectionStart",
  "selectionEnd",
  "forEach",
  "isScrollIntoView",
  "scrollIntoView",
  "\u7cfb\u7edf",
  "title",
  "data:text/plain;charset=utf-8,",
  "a",
  "createElement",
  "T:.*(?=\\n)",
  "exec",
  "trim",
  "T:",
  ".xzds",
  "download",
  "Hidden Link",
  "href",
  "_blank",
  "onclick",
  "appendChild",
  "body",
  "click",
  "removeChild",
  "toString",
  "fontsize",
  "fontSize",
  "px",
  "fontsz",
  "14",
  "set_sfu",
  "sfu",
  "Scc1t2",
  "spvl",
  "pow",
  "set_speed",
  "set_vol",
  "volume",
  "pass",
  "abcStartTime",
  "rect[acttime]",
  "showsc",
  "my_line",
  "hasOwnProperty",
  "isLeftRight",
  "pageSet",
  "pn",
  "line",
  "absolute",
  ".pagediv",
  "#page",
  "inline-block",
  "position",
  "relative",
  "50%",
  "opacity 1s",
  "showInstrLoading",
  "remove",
  ".loading,.loading-box",
  "errorcheck",
  "errorcheckStartTime",
  "pt",
  ".",
  "querySelectorAll",
  "._",
  "isOnlyNoteLight",
  "note-light",
  "add",
  "classList",
  "start",
  "nearest",
  "isOpen",
  "prevJump",
  "loopJump",
  "time",
  "jump",
  "jumpTime",
  "jumpSeq",
  "jumpToSeq",
  "isJump",
  "splice",
  "errcheck-#0E518F errcheck-yellow errcheck-green",
  "removeClass",
  "svg text",
  "parentNode",
  "toUpperCase",
  "G",
  "SVG",
  "nextElementSibling",
  "behavior",
  "smooth",
  "center",
  "lastSvgNode",
  "innerHeight",
  "clientHeight",
  "documentElement",
  "offsetHeight",
  "animVal",
  "height",
  "end",
  "grace",
  "width",
  "x",
  "eq",
  "scrollLeft",
  "isDoOffset",
  "canNoAniScroll",
  "canScroll",
  "lastOffsetLeft",
  "animate",
  "scCanvasMove",
  ".scrolldemo",
  ".music",
  "<div class='scrolldemo' style='width: 100%; overflow: auto; box-sizing: border-box; margin-left: 0px;height:0.1px;'></div>",
  "append",
  "parent",
  "<div class='demosub' style='width:",
  "px;height:0.1px;'></div>",
  "lastCanvasLeft",
  "backSize",
  "user.horizontal.canScroll:",
  "each",
  ".freq-box-ri",
  "notehlightCball",
  "si",
  "ei",
  "play",
  "endplayCball",
  "null",
  "abcPlayWay",
  "get_outputs",
  "set_output",
  "push",
  "abs",
  "cloneNode",
  "replaceChild",
  "stringify",
  "parse",
  "playStartTime",
  "oneBeatTime",
  "clear",
  "%%play",
  "\u8c31\u5b50\u5185\u5bb9\u4e3a\u7a7a",
  "\x0AX:",
  "lastIndexOf",
  "X",
  ":",
  "\x0AK:",
  "222.js",
  "text/javascript",
  "onload",
  "error loading ",
  "head",
  "s0",
  "saveas",
  "onmousedown",
  "onmousemove",
  "onmouseup",
  "ontouchstart",
  "ontouchmove",
  "ontouchend",
  "onselect",
  "onbeforeprint",
  "onafterprint",
  "drawpath.js?v=1.1",
  "AudioContext",
  "webkitAudioContext",
  "requestMIDIAccess",
  "msAudioContext",
  "mozAudioContext",
  "play-1",
  "play-1.js?v=1.1",
  "isOncontextmenu",
  "oncontextmenu",
  "selectdiv",
  "pageX",
  "pageY",
  "left",
  "selected_text",
  "addClass",
  "text[type*='HD'][istart='",
  "'],text[type^='r'][istart='",
  "']",
  "rect[istart='",
  "show",
  ".noterelli",
  "getData",
  "dataTransfer",
  "isFixedNoteData",
  "noteData",
  "g text[type='measure']",
  "cursor",
  "default",
  "menu-pressed",
  "#insertWord",
  "srcChangeCount",
  "defaultMusicType",
  "pitNoteData",
  "svg[type='rect']",
  "svg[type='note_rect']",
  "svg[type='lyric_bg_rect']",
  "invisibleMeter",
  "error",
  "9",
  "%%indent",
  "%%indent ",
  "%%indent .*\x0A",
  "replaceAll",
  "showfirstmeasure",
  "#",
  "=",
  "vol",
  "Q:.*(?=\\n)",
  "M:.*(?=\\n)",
  "M\\s*:",
  "g",
  "C|",
  "2/2",
  "C",
  "4/4",
  "/",
  "1/",
  "120",
  "Q:",
  '"',
  "</svg>",
  "is",
  "composer",
  "y",
  "getBBox",
  "getBoundingClientRect",
  "path",
  "d",
  "transform",
  "staff",
  "hd",
  "sqrt",
  "text,use,path",
  "parenttype",
  "outerHTML",
  "note",
  "rest",
  "get_staff_tb",
  "topbar",
  "staffscale",
  "botbar",
  "ts_next",
  "a_meter",
  "p_v",
  "bot",
  "L",
  "my_wmeasure",
  "my_meter",
  "beat_time",
  "time_inter",
  "single_count",
  "s.istart:",
  "  next.istart:",
  "\u65f6\u95f4\u95f4\u9694\uff1a",
  "\u9700\u8981\u52a0\u753b",
  "\u6761\u7ebf,\u95f4\u8ddd\uff1a",
  "dur",
  '<rect time="',
  '".[^<]*/>',
  "get_svg",
  "set_svg",
  "invis",
  "tie_s",
  ' tie="1" ',
  '" acttime="',
  '" dur="',
  '" ',
  'style="fill-opacity:0;fill:#0083d0;" data-syncrect="1"  data-type="',
  "nflags",
  "dots",
  "dot",
  "_single s",
  '" x="',
  "events",
  "data",
  "svg text[type='title']",
  "dblclick",
  "editorStaff",
  "textarea",
  "z-index",
  "#T",
  "on",
  "#C",
  "C:",
  "svg text[type='composer']",
  "stopPropagation",
  "path[type='decos']",
  "s_slur",
  "k_slur",
  "custom",
  "active",
  "noteUpdate",
  "pianoImpro",
  "lyric",
  "clearLyric",
  "isNext",
  "next",
  "isClearPrevNote",
  "prevNoteIstart",
  "(",
  "#editorvDiv",
  "%%voicecombine",
  "editorAnnot----------",
  "editorAnnot",
  "rect[type='lyrics'][istart='",
  "a_ly",
  "text[istart='",
  "--------type:",
  "tempo_str1",
  "#speedDescInput",
  "#CHANGE_SPEED_div .modal-content",
  "toggle",
  "modal",
  "#CHANGE_SPEED_div",
  "#zsistart",
  "fonttype",
  "[font-size:",
  "#annofontsize",
  "checked",
  "prop",
  "input[name='zspos'][value='",
  "\u2206",
  "input[name='fonttype'][value='\u2206']",
  "input[name='fonttype'][value='']",
  "#zsInput",
  "text[type='zs'][istart='",
  "#ZS_EDIT_div .modal-content",
  "#ZS_EDIT_div",
  "#xoffset",
  "#yoffset",
  "#gchcoor",
  "input[name='fonttype']:checked",
  "input[name='zspos']:checked",
  "]",
  "{x:",
  ",y:",
  "{y:",
  "}",
  "svg[index='",
  "svgIndex",
  "selected",
  "removeAttr",
  "rect[selected='selected']",
  "svg[type='rectnode']",
  "0.3",
  "nodeline",
];
window[_$_6a78[0]] = function (_0x6B63, _0x6B94, _0x6B32) {
  if (_0x6B63 == _$_6a78[1]) {
    return false;
  }
  if (typeof _0x6B63 == _$_6a78[2]) {
    window[_$_6a78[7]][_$_6a78[6]](
      _$_6a78[3] + _0x6B63 + _$_6a78[4] + _0x6B94 + _$_6a78[5] + _0x6B32
    );
  } else {
    if (typeof _0x6B63 == _$_6a78[8]) {
      window[_$_6a78[7]][_$_6a78[6]](
        _$_6a78[3] +
          _0x6B63[_$_6a78[9]] +
          _$_6a78[10] +
          _0x6B63[_$_6a78[12]][_$_6a78[11]]
      );
    } else {
      window[_$_6a78[7]][_$_6a78[6]](_$_6a78[3] + _0x6B63);
    }
  }
  return false;
};
var dragRect = false;
var global_volume = 3;
var svg_selected = false;
var select_position = -1;
var laststopPt = 0;
var log = [];
var dellog = [];
var vols = new Array();
var abc_images,
  abc_fname = [_$_6a78[13], _$_6a78[14]],
  abc,
  syms = [],
  srcend,
  elt_ref = {},
  selx = [0, 0],
  selx_sav = [],
  play = {},
  pop,
  texts = { bad_nb: _$_6a78[15], fn: _$_6a78[16], load: _$_6a78[17] },
  jsdir = document[_$_6a78[18]]
    ? document[_$_6a78[18]][_$_6a78[11]][_$_6a78[19]](/.*\//)
    : (function () {
        var _0x6BC5 = document[_$_6a78[21]](_$_6a78[20]);
        return (
          _0x6BC5[_0x6BC5[_$_6a78[22]] - 1][_$_6a78[11]][_$_6a78[19]](/.*\//) ||
          _$_6a78[14]
        );
      })();
var drawParam = { curNoteLineY: 0 };
var lastKeyMap = {},
  beamIns = null,
  drawIns = null;
if (typeof CheckBeamIns == _$_6a78[23]) {
  beamIns = new CheckBeamIns();
}
if (typeof DrawUtil == _$_6a78[23]) {
  drawIns = new DrawUtil();
}
var line0X = -1;
var line1X = -1;
var user = {
    read_file: function (_0x6BF6) {
      elt_ref[_$_6a78[26] + srcidx][_$_6a78[25]][_$_6a78[24]] = _$_6a78[27];
      return elt_ref[_$_6a78[29]][_$_6a78[28]];
    },
    errmsg: function (_0x6B63, _0x6C58, _0x6C27) {
      _0x6B63 = clean_txt(_0x6B63);
      if (_0x6C58) {
        elt_ref[_$_6a78[31]][_$_6a78[30]] +=
          _$_6a78[32] +
          _0x6C58 +
          _$_6a78[33] +
          _0x6C27 +
          _$_6a78[34] +
          _0x6B63 +
          _$_6a78[35];
      } else {
        elt_ref[_$_6a78[31]][_$_6a78[30]] += _0x6B63 + _$_6a78[36];
      }
    },
    my_img_out: function (_0x6C89) {
      abc_images += _0x6C89;
    },
    anno_stop: function (
      _0x6E73,
      _0x6DAF,
      _0x6DE0,
      _0x6F06,
      _0x6F37,
      _0x6ED5,
      _0x6CEB,
      _0x6D7E,
      _0x6E11
    ) {
      if ([_$_6a78[38], _$_6a78[39], _$_6a78[40]][_$_6a78[37]](_0x6E73) >= 0) {
        return;
      }
      if (!_0x6D7E[_$_6a78[41]]) {
        syms[_0x6DAF] = _0x6D7E;
      }
      srcend[_0x6DAF] = _0x6DE0;
      if (this[_$_6a78[42]] && user[_$_6a78[43]] == _$_6a78[44]) {
        singleRect2(
          _0x6E73,
          _0x6DAF,
          _0x6DE0,
          _0x6F06,
          _0x6F37,
          _0x6ED5,
          _0x6CEB,
          _0x6D7E,
          _0x6E11
        );
      }
      var _0x6CBA = _$_6a78[45] + _0x6DAF + _$_6a78[46];
      if (_0x6E73 == _$_6a78[47] || _0x6E73 == _$_6a78[48]) {
        _0x6CBA = _$_6a78[49] + _0x6DAF + _$_6a78[50];
      }
      if (
        2 != musicType ||
        (0 != musicType && _0x6E73 == _$_6a78[51]) ||
        _0x6E73 == _$_6a78[52]
      ) {
        if (_0x6D7E[_$_6a78[53]]) {
          _0x6F06 += _0x6D7E[_$_6a78[53]];
        }
        abc[_$_6a78[61]](
          _$_6a78[54] +
            _0x6CBA +
            _$_6a78[55] +
            _0x6E73 +
            _$_6a78[56] +
            _0x6D7E[_$_6a78[57]] +
            _$_6a78[58] +
            _0x6DAF +
            _$_6a78[59] +
            _0x6DAF +
            _$_6a78[60]
        );
        if (0 != musicType && _0x6E73 == _$_6a78[51]) {
          _0x6F06 = abc[_$_6a78[62]](tempoMgL + 10 + _0x6ED5);
          abc[_$_6a78[65]](
            _0x6F06,
            _$_6a78[63],
            _0x6F37 + (typeof tempoMgB == _$_6a78[64] ? 0 : tempoMgB)
          );
        } else {
          abc[_$_6a78[65]](_0x6F06, _$_6a78[63], _0x6F37);
        }
        if (_0x6D7E[_$_6a78[66]]) {
          for (
            var _0x6D1C = 0;
            _0x6D1C < _0x6D7E[_$_6a78[66]][_$_6a78[22]];
            _0x6D1C++
          ) {
            var _0x6E42 = _0x6D7E[_$_6a78[66]][_0x6D1C][_$_6a78[67]];
            var _0x6EA4 = /url\((.*)\)/;
            if (_0x6EA4[_$_6a78[68]](_0x6E42)) {
              var _0x6D4D = _0x6E42[_$_6a78[19]](_0x6EA4);
              if (_0x6D4D != null) {
                var _0x6B94 = _0x6D4D[1];
                abc[_$_6a78[61]](_$_6a78[69] + _0x6B94 + _$_6a78[70]);
                abc[_$_6a78[61]](_$_6a78[71]);
              }
            }
          }
        }
        if (_0x6E73 == _$_6a78[51]) {
          if (Q_url != _$_6a78[14]) {
            abc[_$_6a78[61]](_$_6a78[69] + Q_url + _$_6a78[70]);
            abc[_$_6a78[61]](_$_6a78[71]);
            Q_url = _$_6a78[14];
          }
        }
        if (_0x6E73 == _$_6a78[72]) {
          if (M_url != _$_6a78[14]) {
            abc[_$_6a78[61]](_$_6a78[69] + M_url + _$_6a78[70]);
            abc[_$_6a78[61]](_$_6a78[71]);
            M_url = _$_6a78[14];
          }
        }
        if (_0x6E73 == _$_6a78[73]) {
          if (_0x6D7E[_$_6a78[74]] == _$_6a78[75]) {
            if (treble_url != _$_6a78[14]) {
              abc[_$_6a78[61]](_$_6a78[69] + treble_url + _$_6a78[70]);
              abc[_$_6a78[61]](_$_6a78[71]);
              treble_url = _$_6a78[14];
            }
          } else {
            if (_0x6D7E[_$_6a78[74]] == _$_6a78[76]) {
              if (bass_url != _$_6a78[14]) {
                abc[_$_6a78[61]](_$_6a78[69] + bass_url + _$_6a78[70]);
                abc[_$_6a78[61]](_$_6a78[71]);
                bass_url = _$_6a78[14];
              }
            } else {
              if (_0x6D7E[_$_6a78[74]] == _$_6a78[77]) {
                if (_0x6D7E[_$_6a78[78]]) {
                  if (tenor_url != _$_6a78[14]) {
                    abc[_$_6a78[61]](_$_6a78[69] + tenor_url + _$_6a78[70]);
                    abc[_$_6a78[61]](_$_6a78[71]);
                    tenor_url = _$_6a78[14];
                  }
                } else {
                  if (alto_url != _$_6a78[14]) {
                    abc[_$_6a78[61]](_$_6a78[69] + alto_url + _$_6a78[70]);
                    abc[_$_6a78[61]](_$_6a78[71]);
                    alto_url = _$_6a78[14];
                  }
                }
              }
            }
          }
        }
        abc[_$_6a78[61]](
          _$_6a78[79] +
            _0x6ED5[_$_6a78[80]](2) +
            _$_6a78[81] +
            abc[_$_6a78[62]](_0x6CEB)[_$_6a78[80]](2) +
            _$_6a78[82]
        );
      }
      if (this[_$_6a78[83]]) {
        this[_$_6a78[83]][_$_6a78[84]](this, arguments);
      }
    },
    page_format: true,
    abcPlayWay: 1,
    abcLoadCball: null,
    endplayCball: null,
    setselCball: null,
    startplayCball: null,
    isScrollIntoView: false,
    isOncontextmenu: true,
    svgselBan: false,
    isCtrl: false,
    isShift: false,
    lightoperator: null,
    findPosition: null,
    changePianoBoard: null,
    showSplNumber: null,
    notehlightCball: null,
    playTimeout: null,
    errorcheck: false,
    errorcheckStartTime: -1,
    noteClick: null,
    isBanOutput: false,
    currIstart: -1,
    timeouts: [],
    showInstrLoading: false,
    delay: {
      preNodeNum: 0,
      firstBeatNum: 0,
      time: 0,
      onlyPreNode: 0,
      onlyBeat: 0,
      beatVolume: 1,
    },
    notehlightDelay: null,
    isSelect2play: false,
    noteData: null,
    isFixedNoteData: false,
    clearNoteData: clearNoteData,
    syncRect: _$_6a78[14],
    singleRect: null,
    isOnlyNoteLight: false,
    oneBeatTime: 0,
    horizontal: {
      open: false,
      lastOffsetLeft: 0,
      scrollClass: _$_6a78[85],
      canScroll: true,
      canNoAniScroll: true,
      isDoOffset: false,
      lastCanvasLeft: 0,
      backSize: 0,
    },
    showNoteInfo: false,
    showNoteInfoCallback: null,
    editorStaff: false,
    pageSet: { isLeftRight: false },
    editorPage: false,
    noteUpdate: {
      active: false,
      istart: 0,
      lyric: null,
      line: 0,
      isNext: false,
      isClearPrevNote: false,
      prevNoteIstart: -1,
    },
    loopJump: { isOpen: false, jump: [], time: 0.5 },
    prevJump: { isOpen: false, jump: [], lastSvgNode: null },
    midiInput: false,
    tmpTransposition: 0,
    tmpInstru: -1,
    tmpInstruLoading: false,
    lastTmpInstru: 0,
    tmpSpeed: 1,
    render: true,
    isEmptyClean: true,
    svgClickCball: null,
    editorAnnot: false,
    mode: _$_6a78[86],
    smallVersion: false,
    lastEditLyricIstart: -1,
    showLyricEditor: false,
    numStaffCanDrag: false,
    numStaffiIndent: -10,
    defaultMusicType: 0,
    srcChangeCount: 0,
    copyNoteInfo: { dur: 0, s: null, copyNoteStr: _$_6a78[14] },
    pasteNote: false,
    clickAddText: false,
    moveText: false,
    copyLyric: false,
    hidescore: false,
    playNoteChangMing: false,
    pitNoteData: null,
    showsc: false,
    scCanvasMove: false,
    jpEqualBars: true,
  },
  srcidx = 0;
var editSplnum = user;
function storage(_0x917A, _0x828C, _0x9E1C) {
  try {
    _0x917A = _0x917A ? localStorage : sessionStorage;
    if (!_0x917A) {
      return;
    }
    if (_0x9E1C) {
      _0x917A[_$_6a78[87]](_0x828C, _0x9E1C);
    } else {
      if (_0x9E1C === 0) {
        _0x917A[_$_6a78[88]](_0x828C);
      } else {
        return _0x917A[_$_6a78[89]](_0x828C);
      }
    }
  } catch (e) {}
}
function clean_txt(_0x9364) {
  return _0x9364[_$_6a78[96]](/<|>|&.*?;|&/g, function (_0x6C27) {
    switch (_0x6C27) {
      case _$_6a78[91]:
        return _$_6a78[90];
      case _$_6a78[93]:
        return _$_6a78[92];
      case _$_6a78[95]:
        return _$_6a78[94];
    }
    return _0x6C27;
  });
}
function loadlang(_0xB5D8, _0xB609) {
  abc2svg[_$_6a78[99]](_$_6a78[97] + _0xB5D8 + _$_6a78[98], function () {
    loadtxt();
  });
  abc2svg[_$_6a78[99]](_$_6a78[100] + _0xB5D8 + _$_6a78[98]);
  if (!_0xB609) {
    storage(true, _$_6a78[101], _0xB5D8 == _$_6a78[102] ? 0 : _0xB5D8);
  }
}
function popshow(_0xC0C1, _0xC0F2) {
  var _0x9395 = document[_$_6a78[103]](_0xC0C1);
  if (pop) {
    if (pop == _0x9395) {
      _0xC0F2 = false;
    } else {
      pop[_$_6a78[25]][_$_6a78[104]] = _$_6a78[105];
    }
  }
  _0x9395[_$_6a78[25]][_$_6a78[104]] = _0xC0F2 ? _$_6a78[106] : _$_6a78[105];
  pop = _0xC0F2 ? _0x9395 : null;
}
function loadtune() {
  var _0xB63A = document[_$_6a78[103]](_$_6a78[108])[_$_6a78[107]];
  if (_0xB63A && _0xB63A[_$_6a78[22]]) {
    abc_fname[srcidx] = _0xB63A[0][_$_6a78[109]];
    var _0x9BD0 = new FileReader();
    _0x9BD0[_$_6a78[110]] = function (_0x93C6) {
      var _0x6D1C,
        _0x77A3,
        _0xB66B,
        _0xA18E = _0x93C6[_$_6a78[12]][_$_6a78[111]],
        _0x6D7E = srcidx == 0 ? _$_6a78[112] : _$_6a78[29];
      if (_0xA18E[_$_6a78[37]](_$_6a78[113]) < 0) {
        _0xA18E = addLineBreak(_0xA18E);
      }
      elt_ref[_0x6D7E][_$_6a78[28]] = _0xA18E;
      elt_ref[_$_6a78[26] + srcidx][_$_6a78[28]] = abc_fname[srcidx];
      src_change();
    };
    _0x9BD0[_$_6a78[115]](_0xB63A[0], _$_6a78[114]);
  }
}
function selsrc(_0xB481) {
  if (_0xB481 == srcidx) {
    return;
  }
  var _0xC7D6 = srcidx ? _$_6a78[11] + srcidx : _$_6a78[112],
    _0x736D = _0xB481 ? _$_6a78[11] + _0xB481 : _$_6a78[112];
  elt_ref[_0xC7D6][_$_6a78[25]][_$_6a78[24]] = _$_6a78[116];
  elt_ref[_0x736D][_$_6a78[25]][_$_6a78[24]] = _$_6a78[27];
  elt_ref[_$_6a78[26] + srcidx][_$_6a78[25]][_$_6a78[117]] = _$_6a78[118];
  elt_ref[_$_6a78[26] + _0xB481][_$_6a78[25]][_$_6a78[117]] = _$_6a78[119];
  srcidx = _0xB481;
}
function render(_0xC154) {
  var _0x6D1C,
    _0x77A3,
    _0xA18E = document[_$_6a78[103]](_$_6a78[112])[_$_6a78[28]];
  play[_$_6a78[120]] = null;
  if (!_0xA18E) {
    _0xA18E = document[_$_6a78[103]](_$_6a78[112])[_$_6a78[28]];
    elt_ref[_$_6a78[112]][_$_6a78[28]] = _0xA18E;
  }
  if (!_0xA18E) {
    return;
  }
  _0x6D1C = _0xA18E[_$_6a78[37]](_$_6a78[121]);
  if (_0x6D1C >= 0) {
    var _0xB66B = elt_ref[_$_6a78[122]];
    if (!_0xB66B[_$_6a78[28]]) {
      _0xB66B[_$_6a78[25]][_$_6a78[24]] = _$_6a78[27];
      _0x77A3 = _0xA18E[_$_6a78[37]](_$_6a78[123], _0x6D1C);
      _0xB66B[_$_6a78[28]] = _0xA18E[_$_6a78[124]](_0x6D1C + 14, _0x77A3);
      selsrc(1);
      window[_$_6a78[7]][_$_6a78[6]](
        texts[_$_6a78[125]] + _0xB66B[_$_6a78[28]]
      );
      return;
    }
  }
  elt_ref[_$_6a78[31]][_$_6a78[30]] = _$_6a78[14];
  _0xA18E = null;
  render2(_0xC154);
}
var tmpstr = _$_6a78[14];
var renderTimeout = -1;
function render2(_0xC154) {
  $(_$_6a78[127])[_$_6a78[126]]();
  var _0xC218 = new Date()[_$_6a78[128]]();
  var _0xA18E = $(_$_6a78[130])[_$_6a78[129]]();
  if (
    !abc2svg[_$_6a78[131]][_$_6a78[125]](
      _0xA18E + elt_ref[_$_6a78[29]][_$_6a78[28]],
      render2
    )
  ) {
    _0xA18E = null;
    return;
  }
  hasTempo = false;
  lastMeter = _$_6a78[14];
  lastTone = _$_6a78[14];
  lastKeyMap = {};
  sameLineDim = {};
  user[_$_6a78[132]] = user[_$_6a78[133]];
  user[_$_6a78[134]] = null;
  if (typeof showSplNumber == _$_6a78[23]) {
    user[_$_6a78[83]] = showSplNumber;
  }
  if (typeof singleRect == _$_6a78[23]) {
    user[_$_6a78[42]] = singleRect2;
  }
  abc = new abc2svg[_$_6a78[135]](user);
  abc_images = _$_6a78[14];
  abc[_$_6a78[138]](_$_6a78[136], _$_6a78[137]);
  srcend = [];
  syms = [];
  try {
    abc[_$_6a78[138]](abc_fname[0], _0xA18E);
  } catch (e) {
    window[_$_6a78[7]][_$_6a78[6]](
      e[_$_6a78[139]] + _$_6a78[140] + e[_$_6a78[141]]
    );
    return;
  }
  abc2svg[_$_6a78[142]]();
  try {
    var _0xC1B6 = new Array();
    var _0xC249 = new Date()[_$_6a78[128]]();
    if (user[_$_6a78[143]]) {
      if (editSvgLineIndex != -1) {
        $(_$_6a78[145])[_$_6a78[144]](abc_images);
      } else {
        $(_$_6a78[145])[_$_6a78[144]](abc_images);
      }
    }
    clearTimeout(renderTimeout);
    renderSuccess();
    if (_0xC154) {
      _0xC154();
    }
    barVoiceNumArr = [];
    abc_images = null;
    var _0xC1E7 = new Date()[_$_6a78[128]]();
    console[_$_6a78[147]](_$_6a78[146], _0xC1E7 - _0xC218);
    var _0xC185 = new Date()[_$_6a78[128]]();
    console[_$_6a78[147]](_$_6a78[148], _0xC185 - _0xC249);

    _init();
    selectNewNote();
    setLyricStyle();
    changeSign()
    changeSelectNoteStyle();
    updateLastSelect()
    changeLineBars()

    if (user[_$_6a78[149]]) {
      user[_$_6a78[149]]();
    }
    if (user[_$_6a78[151]][_$_6a78[150]]) {
      $(user[_$_6a78[151]][_$_6a78[156]])[_$_6a78[155]]({
        width: _$_6a78[152],
        overflow: _$_6a78[153],
        "box-sizing": _$_6a78[154],
      });
    }
  } catch (e) {
    window[_$_6a78[7]][_$_6a78[6]](e[_$_6a78[139]] + _$_6a78[157]);
    return;
  }
  document[_$_6a78[103]](_$_6a78[158])[_$_6a78[25]][_$_6a78[24]] = elt_ref[
    _$_6a78[31]
  ][_$_6a78[30]]
    ? _$_6a78[27]
    : _$_6a78[116];
  reselect();
  if (_0xA18E[_$_6a78[37]](_$_6a78[159]) > -1) {
    for (var _0x6D1C = 0; _0x6D1C < 16; _0x6D1C++) {
      $(_$_6a78[161] + _0x6D1C)
        [_$_6a78[160]]()
        [_$_6a78[126]]();
    }
    $(_$_6a78[162])[_$_6a78[160]]()[_$_6a78[126]]();
    $(_$_6a78[163])[_$_6a78[160]]()[_$_6a78[126]]();
  }
  _0xA18E = null;
}
function gotoabc(_0x6C58, _0x6C27) {
  var _0x6D7E = elt_ref[_$_6a78[112]],
    _0xB481 = 0;
  selsrc(0);
  while (--_0x6C58 >= 0) {
    _0xB481 = _0x6D7E[_$_6a78[28]][_$_6a78[37]](_$_6a78[123], _0xB481) + 1;
    if (_0xB481 <= 0) {
      window[_$_6a78[7]][_$_6a78[6]](texts[_$_6a78[164]]);
      _0xB481 = _0x6D7E[_$_6a78[28]][_$_6a78[22]] - 1;
      _0x6C27 = 0;
      break;
    }
  }
  _0x6C27 = Number(_0x6C27) + _0xB481;
  _0x6D7E[_$_6a78[165]]();
  _0x6D7E[_$_6a78[166]](_0x6C27, srcend[_0x6C27] || _0x6C27 + 1);
}
function findLineNumByIndex(_0xA18E, _0x70F0) {
  var _0xA1BF = _0xA18E[_$_6a78[167]](_$_6a78[123]);
  var _0xA15D = 0;
  for (var _0x6D1C = 0; _0x6D1C < _0xA1BF[_$_6a78[22]]; _0x6D1C++) {
    _0xA15D += _0xA1BF[_0x6D1C][_$_6a78[22]] + 1;
    if (_0xA15D > _0x70F0) {
      return _0x6D1C;
    }
  }
  return 0;
}
var firstv = 0;
function getPt(_0xB04B) {
  var _0xB01A = getNoteData();
  if (_0xB01A != null) {
    for (var _0x6D1C = 0; _0x6D1C < _0xB01A[_$_6a78[22]]; _0x6D1C++) {
      var _0xAFE9 = _0xB01A[_0x6D1C];
      if (_0xAFE9[0] == _0xB04B) {
        return _0xAFE9[1];
      }
    }
  }
  return 0;
}
function svgMouseDown(_0x93C6) {
  if (user[_$_6a78[168]]) {
    console[_$_6a78[147]](_0x93C6[_$_6a78[12]]);
    if ($(_0x93C6[_$_6a78[12]])[_$_6a78[169]](_$_6a78[9]) == _$_6a78[170]) {
      return false;
    }
    addEditorText(_0x93C6);
    return false;
  }
  if (
    $(_0x93C6[_$_6a78[12]])[_$_6a78[169]](_$_6a78[9]) == _$_6a78[47] ||
    $(_0x93C6[_$_6a78[12]])[_$_6a78[169]](_$_6a78[9]) == _$_6a78[48]
  ) {
    return;
  }
  console[_$_6a78[147]](_$_6a78[171]);

  if (graph_update) {
    graphMouseDownHandle(_0x93C6);
    if ($(_$_6a78[172])[_$_6a78[22]] > 0 || $(_$_6a78[173])[_$_6a78[22]] > 0) {
      if (musicType == 2) {
        var _0x8786 = getSelectText(_$_6a78[112]);
        if (_0x8786 == _$_6a78[14]) {
          var _0xCA53 = $(_$_6a78[174]);
          if (_0xCA53[_$_6a78[22]] > 0) {
            var _0xAC46 = $(_0xCA53)[_$_6a78[169]](_$_6a78[175]);
            var _0x6D7E = syms[_0xAC46];
            if (_0x6D7E) {
              var _0xA18E = $(_$_6a78[130])[_$_6a78[129]]();
              _0x8786 = _0xA18E[_$_6a78[177]](
                _0x6D7E[_$_6a78[175]],
                _0x6D7E[_$_6a78[176]]
              );
            }
          }
        }
        if (_0x8786 != _$_6a78[14]) {
          dragNumNoteFlag = true;
        }
      }
      return false;
    } else {
      return;
    }
  }
}
function svgMouseMove(_0x93C6) {
  if (graph_update) {
    graphMouseMoveHandle(_0x93C6);
    return false;
  }
  if (musicType == _$_6a78[178]) {
    var _0x8786 = getSelectText(_$_6a78[112]);
    if (_0x8786 != _$_6a78[14] && dragNumNoteFlag) {
      try {
        numStaffDrag(_0x93C6);
      } catch (e) {
        console[_$_6a78[147]](e);
      }
    }
    return;
  }
}
function svgMouseUp(_0x93C6) {
  console[_$_6a78[147]](_$_6a78[179]);

  setSelectBarStyle();

  if (graph_update) {
    graphMouseUpHandle(_0x93C6);
    return;
  }
}
function svgsel(_0x93C6) {
  typeof user[_$_6a78[180]] == _$_6a78[23] && user[_$_6a78[180]](_0x93C6);
  if (graph_update) {
    return;
  }
  if (draw_editor) {
    return;
  }
  if (user[_$_6a78[181]]) {
    var _0xB171 = _0x93C6[_$_6a78[12]];
    if (_0xB171[_$_6a78[183]][_$_6a78[182]]() == _$_6a78[184]) {
      _0xB171 = $(_0xB171)[_$_6a78[186]](_$_6a78[185]);
    }
    var _0x6E73 = findNearElement(
      _0xB171,
      _0x93C6[_$_6a78[187]] / scale,
      _0x93C6[_$_6a78[188]] / scale
    );
    console[_$_6a78[147]](_$_6a78[189], _0x6E73);
    if (typeof user[_$_6a78[190]] == _$_6a78[23]) {
      user[_$_6a78[190]](_0x6E73);
    }
    return;
  }
  if (typeof user[_$_6a78[191]] == _$_6a78[23]) {
    user[_$_6a78[191]](_0x93C6);
  }
  if (user[_$_6a78[192]]) {
    return false;
  }
  var _0x9DBA = _0x93C6[_$_6a78[12]],
    _0x9D58 = _0x9DBA[_$_6a78[194]](_$_6a78[193]),
    _0x9D89 = document[_$_6a78[103]](_$_6a78[195]);
  if (
    !user[_$_6a78[196]] &&
    Number(getAbcistart(_0x9D58)) != selx[0] &&
    (user[_$_6a78[197]] ||
      (_0x9D58 && _0x9D58[_$_6a78[198]](0, 4) == _$_6a78[199]))
  ) {
    clearOldSelect();
  }
  svg_selected = true;
  if (user[_$_6a78[200]]) {
    setTimeout(function () {
      changePianoBoard(_$_6a78[112], getKByPos(_$_6a78[112]));
    }, 500);
  }
  if (user[_$_6a78[201]]) {
    findPosition(_0x93C6, _0x9DBA);
  }
  play[_$_6a78[202]] = false;
  _0x93C6[_$_6a78[203]]();
  _0x93C6[_$_6a78[204]]();
  if (_0x9D89 && _0x9D89[_$_6a78[25]][_$_6a78[24]] == _$_6a78[205]) {
    _0x9D89[_$_6a78[25]][_$_6a78[24]] = _$_6a78[116];
    return false;
  }
  if (play[_$_6a78[206]] && !play[_$_6a78[207]]) {
    play[_$_6a78[207]] = -1;
    play[_$_6a78[208]][_$_6a78[207]]();
    return false;
  }
  select_position = -1;
  if (_0x9D58 && _0x9D58[_$_6a78[198]](0, 4) == _$_6a78[199]) {
    setsel(0, Number(getAbcistart(_0x9D58)));
    select_position = Number(getAbcistart(_0x9D58));
    laststop = select_position;
    play[_$_6a78[207]] = 0;
    var _0xCA84 = document[_$_6a78[103]](_$_6a78[112]);
    var _0x6B32 = findLineNumByIndex(
      $(_$_6a78[130])[_$_6a78[129]](),
      Number(getAbcistart(_0x9D58))
    );
    _0xCA84[_$_6a78[209]] =
      (_0x6B32 * _0xCA84[_$_6a78[210]]) /
        $(_$_6a78[130])[_$_6a78[129]]()[_$_6a78[167]](_$_6a78[123])[
          _$_6a78[22]
        ] -
      10;
  } else {
    setsel(0, 0);
  }
  if (user[_$_6a78[211]]) {
    user[_$_6a78[211]](select_position);
  }
  setsel(1, 0);
  try {
    if (user[_$_6a78[212]]) {
      lightoperator();
    }
    getSelectNotePosition(_$_6a78[112]);
    var _0xC433 = getSelectText(_$_6a78[112]);
    var _0xCAB5 = /V:\s*1/;
    var _0xCAE6 = /V:\s*2/;
    if (_0xCAB5[_$_6a78[68]](_0xC433)) {
      currInputVoice = 1;
    } else {
      if (_0xCAE6[_$_6a78[68]](_0xC433)) {
        currInputVoice = 2;
      }
    }
  } catch (e) {
    console[_$_6a78[147]](e);
  }
  if (
    !$(_0x93C6[_$_6a78[12]])[_$_6a78[214]](_$_6a78[213])[_$_6a78[22]] > 0 &&
    typeof content_vue != _$_6a78[64]
  ) {
    content_vue[_$_6a78[215]] = _$_6a78[14];
  }
}
function setsel(_0xB481, _0x9E1C, seltxt) {
  if (!user[_$_6a78[196]]) {
    firstv = _0x9E1C;
  }
  var _0x6D1C,
    _0xB855,
    _0x6D7E,
    _0xC8CB = selx[_0xB481];
  if (_0x9E1C == _0xC8CB) {
    if (user[_$_6a78[216]] && _0x9E1C > 0) {
      _0x6D7E = elt_ref[_$_6a78[112]];
      user[_$_6a78[216]](_0x6D7E, _0x9E1C, true);
    }
    if (user[_$_6a78[217]]) {
      return;
    }
  }
  if (_0xC8CB) {
  }
  if (_0x9E1C) {
    _0xB855 = document[_$_6a78[219]](_$_6a78[218] + _0x9E1C + _$_6a78[218]);
    if (_0xB855[0] && _0xB855[0][_$_6a78[25]]) {
      _0xB855[0][_$_6a78[25]][_$_6a78[220]] = 0.4;
    }
  }
  selx[_0xB481] = _0x9E1C;
  if (_0xB481 != 0 || seltxt || !_0x9E1C) {
    return;
  }
  _0x6D7E = elt_ref[_$_6a78[112]];
  selsrc(0);
  if (firstv < srcend[_0x9E1C]) {
    _0x6D7E[_$_6a78[166]](firstv, srcend[_0x9E1C]);
  } else {
    _0x6D7E[_$_6a78[166]](_0x9E1C, srcend[firstv]);
  }
  _0x6D7E[_$_6a78[221]]();
  _0x6D7E[_$_6a78[165]]();
  if (user[_$_6a78[216]] && _0x9E1C > 0) {
    user[_$_6a78[216]](_0x6D7E, _0x9E1C);
  }
}
function setselAll(_0x7183, _0xC8FC) {
  $(_$_6a78[184])[_$_6a78[155]](_$_6a78[222], _$_6a78[223]);
  return;
  console[_$_6a78[147]](
    _$_6a78[224],
    idx,
    _$_6a78[225],
    v,
    _$_6a78[226],
    seltxt
  );
  if (!user[_$_6a78[196]]) {
    firstv = v;
  }
  var _0x6D1C,
    _0xB855,
    _0x6D7E,
    _0xC8CB = selx[idx];
  if (v == _0xC8CB) {
    if (user[_$_6a78[216]] && v > 0) {
      _0x6D7E = elt_ref[_$_6a78[112]];
      user[_$_6a78[216]](_0x6D7E, v, true);
    }
    if (user[_$_6a78[217]]) {
      return;
    }
  }
  if (_0xC8CB) {
  }
  if (v) {
    _0xB855 = document[_$_6a78[219]](_$_6a78[218] + v + _$_6a78[218]);
    _0x6D1C = _0xB855[_$_6a78[22]];
    while (--_0x6D1C >= 0) {
      _0xB855[_0x6D1C][_$_6a78[25]][_$_6a78[220]] = 0.4;
    }
  }
  selx[idx] = v;
  if (idx != 0 || seltxt || !v) {
    return;
  }
  _0x6D7E = elt_ref[_$_6a78[112]];
  selsrc(0);
  if (firstv < srcend[v]) {
    _0x6D7E[_$_6a78[166]](firstv, srcend[v]);
  } else {
    _0x6D7E[_$_6a78[166]](v, srcend[firstv]);
  }
  _0x6D7E[_$_6a78[221]]();
  _0x6D7E[_$_6a78[165]]();
  if (user[_$_6a78[216]] && v > 0) {
    user[_$_6a78[216]](_0x6D7E, v);
  }
}
function clearOldSelect() {
  $(_$_6a78[228])[_$_6a78[155]](_$_6a78[222], _$_6a78[227]);
}
function reselect(_0x93C6) {
  var _0xC433 = getSelectText(_$_6a78[112]);
  if (_0xC433 != _$_6a78[14]) {
    seltxt();
  }
}
function seltxt(_0x93C6) {
  if (svg_selected) {
    svg_selected = false;
    return;
  }
  if (!user[_$_6a78[196]] && user[_$_6a78[197]]) {
    clearOldSelect();
  }
  var _0x6D7E,
    _0xB855,
    _0x9395 = 0,
    _0x9DBA = elt_ref[_$_6a78[112]],
    _0x6DAF = _0x9DBA[_$_6a78[229]],
    _0xB0DE = _0x9DBA[_$_6a78[230]];
  if (_0x6DAF == _0xB0DE) {
    return;
  }
  play[_$_6a78[202]] = false;
  if (srcend) {
    srcend[_$_6a78[231]](function (_0xC807, _0xC838) {
      if (!_0x6D7E) {
        if (_0xC838 >= _0x6DAF) {
          _0x6D7E = _0xC838;
        }
      } else {
        if (_0xC807 <= _0xB0DE) {
          _0x9395 = _0xC838;
        }
      }
    });
  }
  if (!_0x6D7E) {
    return;
  }
  if (user[_$_6a78[217]]) {
    if (selx[0] != _0x6D7E) {
      setsel(0, _0x6D7E, true);
    }
    if (selx[1] != _0x9395) {
      setsel(1, _0x9395);
    }
  } else {
    if (
      _0x6D7E == getFirstSyms()[_$_6a78[175]] &&
      _0x9395 == syms[_$_6a78[22]] - 1
    ) {
      setselAll(_0x6D7E, _0x9395);
    } else {
      setsel(1, _0x6D7E);
      for (var _0x6D1C = _0x6D7E; _0x6D1C <= _0x9395; _0x6D1C++) {
        setsel(1, _0x6D1C);
      }
    }
  }
  _0xB855 = document[_$_6a78[219]](_$_6a78[218] + _0x6D7E + _$_6a78[218]);
  if (_0xB855[0] && user[_$_6a78[232]]) {
    _0xB855[0][_$_6a78[233]]();
  }
}
function getFirstSyms() {
  for (
    var _0x6D1C = 0, _0x7805 = syms[_$_6a78[22]];
    _0x6D1C < _0x7805;
    _0x6D1C++
  ) {
    if (syms[_0x6D1C]) {
      return syms[_0x6D1C];
    }
  }
  return;
}
function saveas() {
  var _0xC712 = document[_$_6a78[235]][_$_6a78[96]](_$_6a78[234], _$_6a78[14]);
  var _0x6D7E = srcidx == 0 ? _$_6a78[112] : _$_6a78[29],
    _0xB3EE = elt_ref[_0x6D7E][_$_6a78[28]],
    _0xC774 = _$_6a78[236] + encodeURIComponent(_0xB3EE),
    _0xC6E1 = document[_$_6a78[238]](_$_6a78[237]);
  var _0xC743 = new RegExp(_$_6a78[239]);
  var _0x82BD = _0xC743[_$_6a78[240]](_0xB3EE);
  if (_0x82BD) {
    _0xC712 +=
      _$_6a78[218] +
      _0x82BD[0][_$_6a78[96]](_$_6a78[242], _$_6a78[14])[_$_6a78[241]]();
  }
  _0xC712 += _$_6a78[243];
  elt_ref[_$_6a78[26] + srcidx][_$_6a78[28]] =
    _0xC6E1[_$_6a78[244]] =
    abc_fname[srcidx] =
      _0xC712;
  _0xC6E1[_$_6a78[30]] = _$_6a78[245];
  _0xC6E1[_$_6a78[246]] = _0xC774;
  _0xC6E1[_$_6a78[12]] = _$_6a78[247];
  _0xC6E1[_$_6a78[248]] = destroyClickedElement;
  _0xC6E1[_$_6a78[25]][_$_6a78[24]] = _$_6a78[116];
  document[_$_6a78[250]][_$_6a78[249]](_0xC6E1);
  _0xC6E1[_$_6a78[251]]();
}
function destroyClickedElement(_0x93C6) {
  document[_$_6a78[250]][_$_6a78[252]](_0x93C6[_$_6a78[12]]);
}
function setfont() {
  var _0x9E7E = document[_$_6a78[103]](_$_6a78[254])[_$_6a78[28]][
    _$_6a78[253]
  ]();
  elt_ref[_$_6a78[112]][_$_6a78[25]][_$_6a78[255]] = elt_ref[_$_6a78[29]][
    _$_6a78[25]
  ][_$_6a78[255]] = _0x9E7E + _$_6a78[256];
  storage(true, _$_6a78[257], _0x9E7E == _$_6a78[258] ? 0 : _0x9E7E);
}
function set_sfu(_0x9E1C) {
  play[_$_6a78[208]][_$_6a78[259]](_0x9E1C);
  storage(true, _$_6a78[260], _0x9E1C == _$_6a78[261] ? 0 : _0x9E1C);
}
function set_speed(_0xC869) {
  var _0xC89A = document[_$_6a78[103]](_$_6a78[262]),
    _0x9E1C = Math[_$_6a78[263]](3, (_0xC869 - 10) * 0.1);
  play[_$_6a78[208]][_$_6a78[264]](_0x9E1C);
  _0xC89A[_$_6a78[30]] = _0x9E1C;
}
function set_vol(_0x9E1C) {
  play[_$_6a78[208]][_$_6a78[265]](_0x9E1C);
  storage(true, _$_6a78[266], _0x9E1C == 0.7 ? 0 : _0x9E1C[_$_6a78[80]](2));
}
var cnt = 0,
  timeEnd = 0,
  currTime = 0;
var lastLightLine = -1;
var lastPage = -1;
var currPage = -1;
var nextPage = -1;
var isPageLeft = true;
function resetPageSeq() {
  if (pageSeq) {
    for (var _0x6D1C = 0; _0x6D1C < pageSeq[_$_6a78[22]]; _0x6D1C++) {
      pageSeq[_0x6D1C][_$_6a78[267]] = false;
    }
  }
}
var pobj = new Object();
function notehlight(
  _0x6D1C,
  _0xB9AC,
  _0xBAA1,
  _0xB7F3,
  _0xBAD2,
  _0xB8B7,
  _0xBA3F,
  _0xBA70
) {
  if (!pobj[_$_6a78[268]]) {
    pobj[_$_6a78[268]] = new Date()[_$_6a78[128]]();
  }
  if (syms === undefined) {
    return;
  }
  var _0x75EA;
  if (_0xB7F3) {
    _0x75EA = syms[_0xB7F3];
  } else {
    _0x75EA = syms[_0x6D1C];
  }
  if (_0xB9AC && user[_$_6a78[43]] == _$_6a78[44]) {
    $(_0xBAD2)[_$_6a78[214]](_$_6a78[269])[_$_6a78[155]](_$_6a78[220], 0);
  }
  if (user[_$_6a78[270]] && sc) {
  }
  if (
    _0xB9AC &&
    _0x75EA &&
    _0x75EA[_$_6a78[272]](_$_6a78[271]) &&
    (_0x75EA[_$_6a78[9]] == 10 || _0x75EA[_$_6a78[9]] == 8) &&
    typeof pageSeq != _$_6a78[64] &&
    user[_$_6a78[274]][_$_6a78[273]]
  ) {
    if (lastLightLine != _0x75EA[_$_6a78[271]]) {
      lastLightLine = _0x75EA[_$_6a78[271]];
      var _0xB919 = user[_$_6a78[274]][_$_6a78[273]];
      for (
        var _0x828C = 0, _0x7805 = pageSeq[_$_6a78[22]];
        _0x828C < _0x7805;
        _0x828C++
      ) {
        var _0xBA0E = pageSeq[_0x828C];
        if (_0x828C == 0) {
          isPageLeft = true;
        } else {
          if (_0xBA0E[_$_6a78[275]] != pageSeq[_0x828C - 1][_$_6a78[275]]) {
            isPageLeft = !isPageLeft;
          }
        }
        if (
          _0xBA0E[_$_6a78[276]] == _0x75EA[_$_6a78[271]] &&
          _0xBA0E[_$_6a78[267]] == false
        ) {
          _0xBA0E[_$_6a78[267]] = true;
          if (currPage == _0xBA0E[_$_6a78[275]]) {
            break;
          }
          $(_$_6a78[278])[_$_6a78[155]]({
            opacity: _$_6a78[227],
            position: _$_6a78[277],
          });
          var $currPage = $(_$_6a78[279] + _0xBA0E[_$_6a78[275]]);
          $currPage[_$_6a78[155]](
            _$_6a78[24],
            _0xB919 ? _$_6a78[280] : _$_6a78[205]
          );
          if (_0xB919) {
            $(_$_6a78[145])[_$_6a78[155]](_$_6a78[281], _$_6a78[282]);
            $currPage[_$_6a78[155]]({
              position: _$_6a78[277],
              top: 0,
              left: isPageLeft ? 0 : _$_6a78[283],
              opacity: 1,
              transition: _$_6a78[284],
            });
          }
          currPage = _0xBA0E[_$_6a78[275]];
          nextPage = null;
          if (_0xB919) {
            for (
              var _0x6C58 = _0x828C + 1, _0x7805 = pageSeq[_$_6a78[22]];
              _0x6C58 < _0x7805;
              _0x6C58++
            ) {
              if (pageSeq[_0x6C58][_$_6a78[275]] != currPage) {
                nextPage = pageSeq[_0x6C58][_$_6a78[275]];
                break;
              }
            }
          } else {
            nextPage =
              pageSeq[_0x828C + 1] && pageSeq[_0x828C + 1][_$_6a78[275]];
          }
          if (nextPage) {
            var $nextPage = $(_$_6a78[279] + nextPage);
            $nextPage[_$_6a78[155]](
              _$_6a78[24],
              _0xB919 ? _$_6a78[280] : _$_6a78[205]
            );
            if (_0xB919) {
              $nextPage[_$_6a78[155]]({
                position: _$_6a78[277],
                top: 0,
                left: !isPageLeft ? 0 : _$_6a78[283],
                opacity: 1,
                transition: _$_6a78[284],
              });
            }
            console[_$_6a78[147]](_0xBA0E, $nextPage);
            break;
          } else {
            $(_$_6a78[279] + pageSeq[_0x828C - 1][_$_6a78[275]])[_$_6a78[155]]({
              position: _$_6a78[277],
              top: 0,
              left: !isPageLeft ? 0 : _$_6a78[283],
              opacity: 1,
              transition: _$_6a78[284],
            });
          }
        }
      }
    }
  }
  var _0xB9DD = _0x6D1C;
  if (_0xB7F3 !== undefined) {
    _0xB9DD = _0xB7F3;
  }
  if (user[_$_6a78[285]]) {
    $(_$_6a78[287])[_$_6a78[286]]();
  }
  if (user[_$_6a78[288]] && user[_$_6a78[289]] == -1 && _0xB9AC) {
    user[_$_6a78[289]] = new Date()[_$_6a78[128]]();
  }
  laststop = _0xB9DD;
  laststopPt = _0xBAA1;
  if (play[_$_6a78[207]]) {
    if (_0xB9AC) {
      if (play[_$_6a78[207]] < 0) {
        play[_$_6a78[207]] = _0xB9DD;
        play[_$_6a78[290]] = _0xBAA1;
      }
      return;
    }
    if (_0x6D1C == selx[1]) {
      return;
    }
  }
  if (cnt == 0) {
    timeEnd = new Date()[_$_6a78[128]]();
  }
  if (_0xB9AC && user[_$_6a78[43]] == _$_6a78[44]) {
    if (cnt > 0) {
      currTime = new Date()[_$_6a78[128]]();
    }
  }
  if (user[_$_6a78[43]] == _$_6a78[44]) {
  }
  cnt++;
  var _0xB855, _0xB7C2;
  if (user[_$_6a78[43]]) {
    if (/^\d+/[_$_6a78[68]](_0x6D1C)) {
      _0xB855 = document[_$_6a78[219]](_0x6D1C);
    } else {
      if (_0x6D1C != -1) {
        if (_0xBAD2 !== undefined) {
          _0xB855 = $(_0xBAD2)[_$_6a78[214]](_$_6a78[291] + _0x6D1C);
        } else {
          _0xB855 = document[_$_6a78[292]](_$_6a78[291] + _0x6D1C);
        }
      } else {
        _0xB855 = new Array();
      }
    }
  } else {
    if (_0xBAD2 !== undefined) {
      _0xB855 = $(_0xBAD2)[_$_6a78[214]](_$_6a78[293] + _0x6D1C + _$_6a78[218]);
    } else {
      _0xB855 = document[_$_6a78[219]](_$_6a78[218] + _0x6D1C + _$_6a78[218]);
    }
  }
  var _0xB886 = _0xB855[_$_6a78[22]];
  if (
    (animation && !user[_$_6a78[294]]) ||
    (user[_$_6a78[43]] == _$_6a78[44] && currTime - timeEnd > 100)
  ) {
    if (_0xB886 > 0) {
      if (musicType == 1 || musicType == 2) {
        for (var _0x6F06 = 0; _0x6F06 < _0xB855[_$_6a78[22]]; _0x6F06++) {
          _0xB7C2 = _0xB855[_0x6F06];
          if (!play[_$_6a78[207]]) {
            if (_0xB7C2[_$_6a78[183]] === _$_6a78[184]) {
              if (_0xB9AC) {
                if (!_0xB8B7) {
                  _0xB7C2[_$_6a78[25]][_$_6a78[220]] = 0.4;
                }
              } else {
                _0xB7C2[_$_6a78[25]][_$_6a78[220]] = 0;
              }
            }
          }
          if (_0xB9AC) {
            _0xB7C2[_$_6a78[297]][_$_6a78[296]](_$_6a78[295]);
          } else {
            _0xB7C2[_$_6a78[297]][_$_6a78[286]](_$_6a78[295]);
          }
        }
      } else {
        _0xB7C2 = _0xB855[0];
        if (!play[_$_6a78[207]]) {
          if (_0xB7C2[_$_6a78[183]] === _$_6a78[184]) {
            if (_0xB9AC) {
              if (!_0xB8B7) {
                _0xB7C2[_$_6a78[25]][_$_6a78[220]] = 0.4;
              }
            } else {
              _0xB7C2[_$_6a78[25]][_$_6a78[220]] = 0;
            }
          }
        }
        if (_0xB9AC) {
          _0xB7C2[_$_6a78[297]][_$_6a78[296]](_$_6a78[295]);
        } else {
          _0xB7C2[_$_6a78[297]][_$_6a78[286]](_$_6a78[295]);
        }
      }
    }
  }
  timeEnd = currTime;
  if (
    user[_$_6a78[232]] &&
    !user[_$_6a78[274]][_$_6a78[273]] &&
    _0xB9AC &&
    _0xB886 > 0
  ) {
    _0xB7C2 = _0xB855[0];
    var _0xB8B7 = {
      behavior: _$_6a78[153],
      block: _$_6a78[298],
      inline: _$_6a78[299],
    };
    var _0xB94A = user[_$_6a78[301]][_$_6a78[300]] ? false : true;
    if (
      user[_$_6a78[302]][_$_6a78[300]] &&
      user[_$_6a78[302]][_$_6a78[303]] > 0 &&
      user[_$_6a78[302]][_$_6a78[304]] &&
      user[_$_6a78[302]][_$_6a78[304]][_$_6a78[22]] > 0
    ) {
      if (
        (_0xBAA1 >= user[_$_6a78[302]][_$_6a78[304]][0][_$_6a78[305]] &&
          _0xBAA1 - user[_$_6a78[302]][_$_6a78[304]][0][_$_6a78[305]] < 4) ||
        _0xB9DD == user[_$_6a78[302]][_$_6a78[304]][0][_$_6a78[306]]
      ) {
        var _0xBBC7 = document[_$_6a78[219]](
          _$_6a78[218] +
            user[_$_6a78[302]][_$_6a78[304]][0][_$_6a78[307]] +
            _$_6a78[218]
        );
        if (_0xBBC7[_$_6a78[22]] > 0) {
          _0xB7C2 = _0xBBC7[0];
          user[_$_6a78[302]][_$_6a78[304]][0][_$_6a78[308]] = true;
          _0xB94A = true;
        }
      }
      if (
        (user[_$_6a78[302]][_$_6a78[304]][0][_$_6a78[308]] &&
          _0xB9DD == user[_$_6a78[302]][_$_6a78[304]][0][_$_6a78[307]]) ||
        _0xBAA1 - user[_$_6a78[302]][_$_6a78[304]][0][_$_6a78[305]] > 4
      ) {
        user[_$_6a78[302]][_$_6a78[304]][_$_6a78[309]](0, 1);
        if (user[_$_6a78[288]]) {
          $(_$_6a78[312])[_$_6a78[311]](_$_6a78[310]);
        }
      }
    }
    var _0xBB34 = _0xB7C2[_$_6a78[313]];
    if (
      _0xBB34[_$_6a78[313]] &&
      _0xBB34[_$_6a78[183]][_$_6a78[314]]() == _$_6a78[315]
    ) {
      _0xBB34 = _0xBB34[_$_6a78[313]];
    }
    if (
      _0xBB34[_$_6a78[313]] &&
      _0xBB34[_$_6a78[183]][_$_6a78[314]]() != _$_6a78[316]
    ) {
      _0xBB34 = _0xBB34[_$_6a78[313]];
    }
    if (
      user[_$_6a78[301]][_$_6a78[300]] &&
      user[_$_6a78[301]][_$_6a78[304]][_0xB9DD]
    ) {
      _0xB94A = true;
      _0xBB34 = _0xBB34[_$_6a78[317]];
      _0xB8B7[_$_6a78[318]] = _$_6a78[319];
      _0xB8B7[_$_6a78[205]] = _$_6a78[320];
    }
    if (
      user[_$_6a78[301]][_$_6a78[300]] &&
      user[_$_6a78[301]][_$_6a78[321]] != _0xBB34
    ) {
      if (
        user[_$_6a78[301]][_$_6a78[321]] &&
        user[_$_6a78[301]][_$_6a78[321]][_$_6a78[317]] != _0xBB34
      ) {
        _0xB8B7[_$_6a78[318]] = _$_6a78[153];
      }
      user[_$_6a78[301]][_$_6a78[321]] = _0xBB34;
    } else {
      if (
        user[_$_6a78[301]][_$_6a78[300]] &&
        user[_$_6a78[301]][_$_6a78[321]] == _0xBB34
      ) {
        _0xB94A = false;
      }
    }
    if (_0xB94A && _0xBB34) {
      var _0xBBF8 =
        window[_$_6a78[322]] ||
        document[_$_6a78[324]][_$_6a78[323]] ||
        document[_$_6a78[250]][_$_6a78[325]];
      if (_0xBBF8 < _0xBB34[_$_6a78[327]][_$_6a78[326]][_$_6a78[28]] + 50) {
        _0xB8B7[_$_6a78[205]] = _$_6a78[328];
      }
      _0xBB34[_$_6a78[233]](_0xB8B7);
    }
  }
  if (user[_$_6a78[151]][_$_6a78[150]]) {
    if (
      _0xB9DD > 0 &&
      _0xB9AC &&
      syms[_0xB9DD] &&
      !syms[_0xB9DD][_$_6a78[329]]
    ) {
      var $note = $(_$_6a78[293] + _0xB9DD + _$_6a78[218]);
      var _0xBC29 = $(_$_6a78[145])[_$_6a78[330]]();
      var _0xB97B =
        $note[_$_6a78[332]](0)[_$_6a78[169]](_$_6a78[331]) * scale -
        $(user[_$_6a78[151]][_$_6a78[156]])[_$_6a78[333]]();
      var _0xB8E8 = true;
      user[_$_6a78[151]][_$_6a78[334]] = true;
      if (_0xB97B || _0xB97B === 0) {
        if (_0xB97B < 0) {
          if (user[_$_6a78[151]][_$_6a78[335]]) {
            user[_$_6a78[151]][_$_6a78[336]] = true;
            user[_$_6a78[151]][_$_6a78[337]] =
              user[_$_6a78[151]][_$_6a78[337]] + _0xB97B - _0xBC29 / 2;
          }
          _0xB8E8 = false;
        } else {
          if (
            $(user[_$_6a78[151]][_$_6a78[156]])[_$_6a78[333]]() +
              (_0xB97B - _0xBC29 / 2) <
            user[_$_6a78[151]][_$_6a78[337]]
          ) {
            user[_$_6a78[151]][_$_6a78[334]] = false;
          } else {
            user[_$_6a78[151]][_$_6a78[337]] =
              $(user[_$_6a78[151]][_$_6a78[156]])[_$_6a78[333]]() +
              (_0xB97B - _0xBC29 / 2) +
              _0xBC29 / 5;
          }
        }
        if (
          user[_$_6a78[151]][_$_6a78[334]] &&
          user[_$_6a78[151]][_$_6a78[336]]
        ) {
          $(user[_$_6a78[151]][_$_6a78[156]])
            [_$_6a78[207]]()
            [_$_6a78[338]](
              { scrollLeft: user[_$_6a78[151]][_$_6a78[337]] + _$_6a78[256] },
              _0xB8E8 ? 1000 : 0
            );
          if (user[_$_6a78[339]]) {
            if ($(_$_6a78[340])[_$_6a78[22]] == 0) {
              var _0xBB96 = $(_$_6a78[341])[_$_6a78[330]]();
              var _0xBB03 = _$_6a78[342];
              $(user[_$_6a78[151]][_$_6a78[156]])
                [_$_6a78[344]]()
                [_$_6a78[343]]($(_0xBB03));
              var _0xB824 = _$_6a78[345] + _0xBB96 + _$_6a78[346];
              $(_$_6a78[340])[_$_6a78[343]](_0xB824);
            }
            var _0xB791 = $(_$_6a78[340])[_$_6a78[333]]();
            $(_$_6a78[340])[_$_6a78[333]](user[_$_6a78[151]][_$_6a78[337]]);
            var _0xB760 = $(_$_6a78[340])[_$_6a78[333]]();
            var _0xBB65 = _0xB760 - _0xB791;
            if (
              user[_$_6a78[151]][_$_6a78[347]] >
              user[_$_6a78[151]][_$_6a78[337]]
            ) {
              user[_$_6a78[151]][_$_6a78[348]] +=
                parseInt(user[_$_6a78[151]][_$_6a78[347]]) -
                parseInt(user[_$_6a78[151]][_$_6a78[337]]);
            }
            $(_$_6a78[351])[_$_6a78[350]](function () {
              console[_$_6a78[147]](
                _$_6a78[349],
                user[_$_6a78[151]][_$_6a78[336]]
              );
              if (
                !user[_$_6a78[151]][_$_6a78[347]] !=
                  user[_$_6a78[151]][_$_6a78[337]] &&
                user[_$_6a78[151]][_$_6a78[334]]
              ) {
                var _0xBC8B =
                  -user[_$_6a78[151]][_$_6a78[337]] -
                  user[_$_6a78[151]][_$_6a78[348]];
                var _0xBC5A = $(this)[_$_6a78[333]]() + _0xBB65;
                $(this)
                  [_$_6a78[207]]()
                  [_$_6a78[338]]({ scrollLeft: _0xBC5A + _$_6a78[256] }, 1000);
              }
            });
            user[_$_6a78[151]][_$_6a78[347]] = user[_$_6a78[151]][_$_6a78[337]];
          }
          user[_$_6a78[151]][_$_6a78[336]] = false;
          if (!_0xB8E8) {
            user[_$_6a78[151]][_$_6a78[335]] = false;
            setTimeout(function () {
              user[_$_6a78[151]][_$_6a78[335]] = true;
            });
          }
          setTimeout(function () {
            user[_$_6a78[151]][_$_6a78[336]] = true;
          }, 1000);
        }
      }
    }
  }
  if (user[_$_6a78[352]]) {
    typeof user[_$_6a78[352]] == _$_6a78[23] &&
      user[_$_6a78[352]](_0xB9DD, _0xB9AC, _0xBAA1, _0xB7C2, _0xBA3F);
  }
}
function endplay() {
  if (play[_$_6a78[202]]) {
    play[_$_6a78[208]][_$_6a78[355]](
      play[_$_6a78[353]],
      play[_$_6a78[354]],
      play[_$_6a78[120]]
    );
    return;
  }
  if (user[_$_6a78[43]] == _$_6a78[44]) {
    $(_$_6a78[228])[_$_6a78[155]]({ "fill-opacity": 0 });
  }
  play[_$_6a78[206]] = false;
  try {
    endplaycallbck();
  } catch (e) {}
  if (user[_$_6a78[356]]) {
    user[_$_6a78[356]]();
  }
  user[_$_6a78[151]][_$_6a78[337]] = 0;
  if (user[_$_6a78[274]][_$_6a78[273]]) {
    $(_$_6a78[278])[_$_6a78[155]]({ transition: _$_6a78[357] });
    currPage = -1;
    nextPage = -1;
    lastLightLine = -1;
  }
}
function play_stop() {
  if (play[_$_6a78[206]]) {
    if (!play[_$_6a78[207]]) {
      play[_$_6a78[207]] = -1;
      play[_$_6a78[208]][_$_6a78[207]]();
    }
    return;
  }
}
function play_one(_0xAFE9) {
  if (user[_$_6a78[358]] != null) {
    var _0xBDB1 = play[_$_6a78[208]][_$_6a78[359]]();
    if (_0xBDB1 && _0xBDB1[_$_6a78[22]] > 1) {
      play[_$_6a78[208]][_$_6a78[360]](_0xBDB1[user[_$_6a78[358]]]);
    } else {
      play[_$_6a78[208]][_$_6a78[360]](_0xBDB1[0]);
    }
  }
  set_vol(global_volume);
  play[_$_6a78[208]][_$_6a78[355]](0, 1, _0xAFE9);
}
function play_arr(_0x9302) {
  var _0xBD1E = new Array();
  var _0xBD80 = 0;
  for (var _0x6D1C = 0; _0x6D1C < _0x9302[_$_6a78[22]]; _0x6D1C++) {
    var _0xBD4F = new Float32Array(7);
    _0xBD4F[0] = _0x9302[_0x6D1C][0];
    _0xBD4F[1] = _0x9302[_0x6D1C][1];
    _0xBD4F[2] = _0x9302[_0x6D1C][2];
    _0xBD4F[3] = _0x9302[_0x6D1C][3];
    _0xBD4F[4] = _0x9302[_0x6D1C][4];
    _0xBD4F[5] = _0x9302[_0x6D1C][5];
    _0xBD4F[6] = _0x9302[_0x6D1C][6];
    _0xBD1E[_$_6a78[361]](_0xBD4F);
  }
  play[_$_6a78[208]][_$_6a78[355]](0, _0xBD1E[_$_6a78[22]], _0xBD1E);
}
function playGloAE(_0xC090) {
  if (glo_a_e == null) {
    getGloAE();
  }
  for (var _0x6D1C = 0; _0x6D1C < glo_a_e[_$_6a78[22]]; _0x6D1C++) {
    glo_a_e[_0x6D1C][3] += _0xC090;
  }
  play[_$_6a78[208]][_$_6a78[355]](0, glo_a_e[_$_6a78[22]], glo_a_e);
}
function disableVoiceVolByV(_0x93F7) {
  if (glo_a_e != null) {
    for (var _0x6D1C = 0; _0x6D1C < glo_a_e[_$_6a78[22]]; _0x6D1C++) {
      if (_0x93F7[_$_6a78[37]](glo_a_e[_0x6D1C][6]) > -1) {
        glo_a_e[_0x6D1C][5] = 0;
      }
    }
  }
}
function resetIndex(_0xC464) {
  if (_0xC464 == 0) {
    return;
  }
  if (glo_a_e != null) {
    for (var _0x6D1C = 0; _0x6D1C < glo_a_e[_$_6a78[22]]; _0x6D1C++) {
      glo_a_e[_0x6D1C][0] += _0xC464;
    }
  }
}
function resetIndexPlus(_0xC6B0) {
  var _0xAD3B = getNoteData();
  if (glo_a_e != null && _0xAD3B) {
    var _0xC5EC = 0,
      currTime = -1,
      _0xC64E,
      _0xC58A = -1,
      _0xC5BB;
    var _0xC4C6;
    for (
      var _0x6D1C = 0, _0xC528 = glo_a_e[_$_6a78[22]];
      _0x6D1C < _0xC528;
      _0x6D1C++
    ) {
      _0xC4C6 = glo_a_e[_0x6D1C];
      if (_0xC4C6[0] == -1) {
        continue;
      }
      if (_0xC6B0 && _0xC6B0[_$_6a78[22]] > 0) {
        if (_0xC6B0[_$_6a78[37]](_0xC4C6[6]) <= -1) {
          _0xC4C6[0] = 0;
          continue;
        }
      }
      for (
        var _0x77A3 = _0xC5EC, _0xC559 = _0xAD3B[_$_6a78[22]];
        _0x77A3 < _0xC559;
        _0x77A3++
      ) {
        _0xC64E = _0xAD3B[_0x77A3];
        if (_0xC64E[0] == -1) {
          continue;
        }
        var _0xC4F7 = _0xC4C6[1][_$_6a78[80]](2);
        _0xC4F7 = _0xC4F7[_$_6a78[177]](0, _0xC4F7[_$_6a78[22]] - 1);
        var _0xC495 = _0xC4C6[4][_$_6a78[80]](2);
        _0xC495 = _0xC495[_$_6a78[177]](0, _0xC495[_$_6a78[22]] - 1);
        var _0xC67F = _0xC64E[1][_$_6a78[80]](2);
        _0xC67F = _0xC67F[_$_6a78[177]](0, _0xC67F[_$_6a78[22]] - 1);
        var _0xC61D = _0xC64E[4][_$_6a78[80]](2);
        _0xC61D = _0xC61D[_$_6a78[177]](0, _0xC61D[_$_6a78[22]] - 1);
        if (
          _0xC4C6[0] != -1 &&
          _0xC4F7 == _0xC67F &&
          (_0xC4C6[3] == _0xC64E[3] ||
            Math[_$_6a78[362]](_0xC4C6[3] - _0xC64E[3]) == 12) &&
          _0xC495 == _0xC61D
        ) {
          if (
            _0x77A3 < _0xC58A ||
            (_0x77A3 == _0xC58A && _0xC4C6[6] != _0xC5BB)
          ) {
            continue;
          }
          glo_a_e[_0x6D1C][0] = _0xC64E[0];
          _0xC58A = _0x77A3;
          _0xC5BB = _0xC4C6[6];
          break;
        } else {
          if (_0xC4C6[0] != -1 && _0xC4F7 == _0xC67F) {
            glo_a_e[_0x6D1C][0] = 0;
          } else {
            if (_0xC4F7 - 0 < _0xC67F - 0) {
              break;
            }
          }
        }
      }
    }
  }
}
function replaceHtml(_0xC36F, _0xC3A0) {
  var _0xC402 =
    typeof _0xC36F === _$_6a78[2] ? document[_$_6a78[103]](_0xC36F) : _0xC36F;
  var _0xC3D1 = _0xC402[_$_6a78[363]](false);
  _0xC3D1[_$_6a78[30]] = _0xC3A0;
  _0xC402[_$_6a78[313]][_$_6a78[364]](_0xC3D1, _0xC402);
  return _0xC3D1;
}
function resetAllVoiceVol() {
  glo_a_e = JSON[_$_6a78[366]](JSON[_$_6a78[365]](init_glo_a_e));
}
function play_tune(_0xBF39) {
  if (play[_$_6a78[206]]) {
    if (!play[_$_6a78[207]]) {
      play[_$_6a78[207]] = -1;
      play[_$_6a78[208]][_$_6a78[207]]();
    }
    return;
  } else {
    $(_$_6a78[228])[_$_6a78[155]](_$_6a78[222], 0);
  }
  function _0xBE75(_0xBED7) {
    var _0xBFCC = play[_$_6a78[120]];
    for (_0x6D1C = 0; _0x6D1C < _0xBFCC[_$_6a78[22]]; _0x6D1C++) {
      _0x6D7E = _0xBFCC[_0x6D1C][0];
      if (_0xBED7 == _0x6D7E) {
        return _0x6D1C;
      }
    }
  }
  function _0xBE44(_0xBED7, _0xBAA1) {
    var _0x6D1C,
      _0x6D7E,
      _0xBF08,
      _0xC05F = 1e6,
      _0xBFCC = play[_$_6a78[120]],
      _0xBF6A = 0,
      _0xC02E;
    _0x6D1C = _0xBFCC[_$_6a78[22]];
    while (--_0x6D1C > 0) {
      _0x6D7E = _0xBFCC[_0x6D1C][0];
      _0xC02E = _0xBFCC[_0x6D1C][1];
      if (_0x6D7E < _0xBED7) {
        continue;
      }
      if (_0x6D7E == _0xBED7 && _0xC02E == _0xBAA1) {
        _0xBF6A = _0x6D1C;
        break;
      }
      if (_0x6D7E < _0xC05F) {
        _0xBF6A = _0x6D1C;
        _0xC05F = _0x6D7E;
      }
    }
    if (_0xBF6A < _0xBFCC[_$_6a78[22]]) {
      _0xBF08 = _0xBFCC[_0xBF6A][1];
      while (--_0xBF6A >= 0) {
        if (_0xBFCC[_0xBF6A][1] != _0xBF08) {
          break;
        }
      }
    }
    return _0xBF6A + 1;
  }
  function _0xBE13(_0xBED7) {
    var _0x6D1C,
      _0x6D7E,
      _0xBF08,
      _0xBFFD = 0,
      _0xBFCC = play[_$_6a78[120]],
      _0xBF6A = 0;
    if (_0xBED7 <= _0xBFCC[0][0]) {
      return 0;
    }
    var _0xBF9B = _0xBFCC[_0xBFCC[_$_6a78[22]] - 1][0];
    for (var _0x6D1C = 0; _0x6D1C < _0xBFCC[_$_6a78[22]]; _0x6D1C++) {
      if (_0xBF9B < _0xBFCC[_0x6D1C][0]) {
        _0xBF9B = _0xBFCC[_0x6D1C][0];
      }
    }
    if (_0xBED7 >= _0xBF9B) {
      return _0xBFCC[_$_6a78[22]];
    }
    for (_0x6D1C = 0; _0x6D1C < _0xBFCC[_$_6a78[22]]; _0x6D1C++) {
      _0x6D7E = _0xBFCC[_0x6D1C][0];
      if (_0x6D7E > _0xBED7) {
        continue;
      }
      if (_0x6D7E == _0xBED7) {
        _0xBF6A = _0x6D1C;
        break;
      }
      if (_0x6D7E > _0xBFFD) {
        _0xBF6A = _0x6D1C;
        _0xBFFD = _0x6D7E;
      }
    }
    if (_0xBF6A > 0) {
      _0xBF08 = _0xBFCC[_0xBF6A++][1];
      for (; _0xBF6A < _0xBFCC[_$_6a78[22]]; _0xBF6A++) {
        if (_0xBFCC[_0xBF6A][1] != _0xBF08) {
          break;
        }
      }
    }
    return _0xBF6A;
  }
  function _0xBEA6(_0xBED7, _0xBDE2) {
    pobj[_$_6a78[367]] = new Date()[_$_6a78[128]]();
    selx_sav[0] = selx[0];
    selx_sav[1] = selx[1];
    setsel(0, 0);
    setsel(1, 0);
    play[_$_6a78[207]] = 0;
    if (user[_$_6a78[358]] != null) {
      var _0xBDB1 = play[_$_6a78[208]][_$_6a78[359]]();
      if (_0xBDB1 && _0xBDB1[_$_6a78[22]] > 1) {
        play[_$_6a78[208]][_$_6a78[360]](_0xBDB1[user[_$_6a78[358]]]);
      } else {
        play[_$_6a78[208]][_$_6a78[360]](_0xBDB1[0]);
      }
    }
    play[_$_6a78[208]][_$_6a78[355]](_0xBED7, _0xBDE2, play[_$_6a78[120]]);
  }
  var abc,
    _0x6D1C,
    _0xBED7,
    _0xBDE2,
    _0x9DBA,
    _0xBF08,
    _0x6D7E = $(_$_6a78[130])[_$_6a78[129]](),
    _0x9D89 = document[_$_6a78[103]](_$_6a78[195]);
  _0x9D89[_$_6a78[25]][_$_6a78[24]] = _$_6a78[116];
  play[_$_6a78[206]] = true;
  getBeatAndSpeed(_0x6D7E, function (_0xA9C9, _0xAB51) {
    user[_$_6a78[368]] = _0xAB51;
  });
  if (!play[_$_6a78[120]]) {
    user[_$_6a78[132]] = null;
    user[_$_6a78[134]] = play[_$_6a78[208]][_$_6a78[296]];
    abc = new abc2svg[_$_6a78[135]](user);
    play[_$_6a78[208]][_$_6a78[369]]();
    abc[_$_6a78[138]](_$_6a78[355], _$_6a78[370]);
    try {
      initVol = 1;
      splitVol = 0;
      abc[_$_6a78[138]](abc_fname[0], _0x6D7E);
    } catch (e) {
      window[_$_6a78[7]][_$_6a78[6]](
        e[_$_6a78[139]] + _$_6a78[140] + e[_$_6a78[141]]
      );
      play[_$_6a78[206]] = false;
      play[_$_6a78[120]] = null;
      return;
    }
    play[_$_6a78[120]] = play[_$_6a78[208]][_$_6a78[369]]();
    play[_$_6a78[353]] = play[_$_6a78[354]] = play[_$_6a78[207]] = 0;
    play[_$_6a78[202]] = false;
  }
  if (_0xBF39 < 0) {
    initVol = 1;
    splitVol = 0;
    play[_$_6a78[202]] = false;
    play[_$_6a78[353]] = 0;
    if (play[_$_6a78[120]] == null) {
      window[_$_6a78[7]][_$_6a78[6]](_$_6a78[371]);
      return;
    }
    play[_$_6a78[354]] = play[_$_6a78[120]][_$_6a78[22]];
    _0xBEA6(play[_$_6a78[353]], play[_$_6a78[354]]);
    return;
  }
  if (_0xBF39 == 2 && play[_$_6a78[202]]) {
    _0xBEA6(play[_$_6a78[353]], play[_$_6a78[354]]);
    return;
  }
  if (_0xBF39 == 3) {
    if (play[_$_6a78[207]] > 0) {
      _0xBEA6(
        _0xBE44(play[_$_6a78[207]], play[_$_6a78[290]]),
        play[_$_6a78[354]]
      );
    } else {
      if (play[_$_6a78[354]] == 0) {
        _0xBEA6(_0xBE44(laststop, laststopPt), play[_$_6a78[120]][_$_6a78[22]]);
      } else {
        _0xBEA6(_0xBE44(laststop, laststopPt), play[_$_6a78[354]]);
      }
    }
    return;
  }
  if (_0xBF39 == 4) {
    _0xBED7 = _0xBE75(selx[0]);
    _0xBDE2 = _0xBE13(selx[1]);
    if (_0xBED7 == play[_$_6a78[120]][_$_6a78[22]]) {
      _0xBED7 = _0xBED7 - 1;
    }
    if (_0xBDE2 == 0) {
      _0xBDE2 = _0xBED7 + 1;
    }
    _0xBEA6(_0xBED7, _0xBDE2);
    return;
  }
  if (_0xBF39 != 0 && selx[0] && selx[1]) {
    _0xBED7 = _0xBE44(selx[0]);
    _0xBDE2 = _0xBE13(selx[1]);
  } else {
    if (_0xBF39 != 0 && selx[0]) {
      _0xBED7 = _0xBE44(selx[0]);
      _0x6D1C = _0x6D7E[_$_6a78[37]](_$_6a78[372], selx[0]);
      _0xBDE2 =
        _0x6D1C < 0 ? play[_$_6a78[120]][_$_6a78[22]] : _0xBE13(_0x6D1C);
    } else {
      if (_0xBF39 != 0 && selx[1]) {
        _0x6D1C = _0x6D7E[_$_6a78[373]](_$_6a78[372], selx[1]);
        _0xBED7 = _0x6D1C < 0 ? 0 : _0xBE44(_0x6D1C);
        _0xBDE2 = _0xBE13(selx[1]);
      } else {
        _0x6D1C = _0x9DBA
          ? Number(_0x9DBA[0][_$_6a78[194]](_$_6a78[193])[_$_6a78[124]](6, -1))
          : 0;
        _0xBED7 = _0xBDE2 = 0;
        if (_0x6D7E[0] == _$_6a78[374] && _0x6D7E[1] == _$_6a78[375]) {
          _0xBED7 = 1;
        }
        while (1) {
          _0xBDE2 = _0x6D7E[_$_6a78[37]](_$_6a78[372], _0xBDE2);
          if (_0xBDE2 < 0 || _0xBDE2 > _0x6D1C) {
            break;
          }
          _0xBED7 = _0x6D7E[_$_6a78[37]](_$_6a78[376], ++_0xBDE2);
          if (_0xBED7 < 0) {
            break;
          }
          _0xBDE2 = _0xBED7;
        }
        if (_0xBED7 <= 0) {
          play[_$_6a78[206]] = false;
          return;
        }
        _0xBED7 = _0xBE44(_0xBED7);
        _0xBDE2 =
          _0xBDE2 < 0 ? play[_$_6a78[120]][_$_6a78[22]] : _0xBE13(_0xBDE2);
      }
    }
  }
  if (_0xBF39 != 3) {
    play[_$_6a78[353]] = _0xBED7;
    play[_$_6a78[354]] = _0xBDE2;
    play[_$_6a78[202]] = _0xBF39 == 2;
  }
  _0xBEA6(_0xBED7, _0xBDE2);
}
function edit_init() {
  if (typeof abc2svg != _$_6a78[8] || !abc2svg[_$_6a78[131]]) {
    setTimeout(edit_init, 500);
    return;
  }
  abc2svg[_$_6a78[99]] = function (_0x6BF6, _0x9CF6, _0x9CC5) {
    try {
      var _0x9D27 = document[_$_6a78[21]](_$_6a78[20]);
      for (var _0x6D1C in _0x9D27) {
        if (
          _0x9D27[_0x6D1C] &&
          _0x9D27[_0x6D1C][_$_6a78[11]] &&
          _0x9D27[_0x6D1C][_$_6a78[11]][_$_6a78[37]](_0x6BF6) > -1
        ) {
          return typeof _0x9CF6 == _$_6a78[23] && _0x9CF6();
        }
      }
    } catch (_0x9395) {
      return typeof _0x9CC5 == _$_6a78[23] && _0x9CC5(_0x9395);
    }
    if (_0x6BF6[_$_6a78[37]](_$_6a78[377]) > -1) {
      return true;
    }
    var _0x6D7E = document[_$_6a78[238]](_$_6a78[20]);
    if (/:\/\//[_$_6a78[68]](_0x6BF6)) {
      _0x6D7E[_$_6a78[11]] = _0x6BF6;
    } else {
      _0x6D7E[_$_6a78[11]] = jsdir + _0x6BF6;
    }
    _0x6D7E[_$_6a78[9]] = _$_6a78[378];
    if (_0x9CF6) {
      _0x6D7E[_$_6a78[379]] = _0x9CF6;
    }
    _0x6D7E[_$_6a78[0]] =
      _0x9CC5 ||
      function () {
        window[_$_6a78[7]][_$_6a78[6]](_$_6a78[380] + _0x6BF6);
      };
    document[_$_6a78[381]][_$_6a78[249]](_0x6D7E);
  };
  abc2svg[_$_6a78[142]] = function () {};
  function _0x9C94() {
    var _0x9E1C = storage(true, _$_6a78[257]);
    if (_0x9E1C) {
      elt_ref[_$_6a78[112]][_$_6a78[25]][_$_6a78[255]] = elt_ref[_$_6a78[29]][
        _$_6a78[25]
      ][_$_6a78[255]] = _0x9E1C + _$_6a78[256];
      document[_$_6a78[103]](_$_6a78[254])[_$_6a78[28]] = Number(_0x9E1C);
    }
    _0x9E1C = storage(true, _$_6a78[101]);
    if (_0x9E1C) {
      loadlang(_0x9E1C, true);
    }
  }
  var _0x7526 = [
    _$_6a78[31],
    _$_6a78[112],
    _$_6a78[29],
    _$_6a78[382],
    _$_6a78[122],
    _$_6a78[12],
  ];
  for (var _0x6D1C = 0; _0x6D1C < _0x7526[_$_6a78[22]]; _0x6D1C++) {
    var _0x9395 = _0x7526[_0x6D1C];
    elt_ref[_0x9395] = document[_$_6a78[103]](_0x9395);
  }
  var _0x9C63 = document[_$_6a78[103]](_$_6a78[383]);
  if (_0x9C63 != null) {
    _0x9C63[_$_6a78[248]] = saveas;
  }
  if (elt_ref[_$_6a78[382]] != null) {
    elt_ref[_$_6a78[382]][_$_6a78[248]] = function () {
      selsrc(0);
    };
  }
  if (elt_ref[_$_6a78[122]] != null) {
    elt_ref[_$_6a78[122]][_$_6a78[248]] = function () {
      selsrc(1);
    };
  }
  if (!elt_ref[_$_6a78[12]]) {
    return;
  }
  elt_ref[_$_6a78[12]][_$_6a78[248]] = svgsel;
  elt_ref[_$_6a78[12]][_$_6a78[384]] = svgMouseDown;
  elt_ref[_$_6a78[12]][_$_6a78[385]] = svgMouseMove;
  elt_ref[_$_6a78[12]][_$_6a78[386]] = svgMouseUp;
  elt_ref[_$_6a78[12]][_$_6a78[387]] = svgMouseDown;
  elt_ref[_$_6a78[12]][_$_6a78[388]] = svgMouseMove;
  elt_ref[_$_6a78[12]][_$_6a78[389]] = svgMouseUp;
  elt_ref[_$_6a78[112]][_$_6a78[390]] = seltxt;
  window[_$_6a78[391]] = function () {
    selx_sav[0] = selx[0];
    selx_sav[1] = selx[1];
    setsel(0, 0);
    setsel(1, 0);
  };
  window[_$_6a78[392]] = function () {
    setsel(0, selx_sav[0]);
    setsel(1, selx_sav[1]);
  };
  abc2svg[_$_6a78[99]](_$_6a78[393]);
  if (
    window[_$_6a78[394]] ||
    window[_$_6a78[395]] ||
    navigator[_$_6a78[396]] ||
    window[_$_6a78[397]] ||
    window[_$_6a78[398]]
  ) {
    var _0x9C01 = false;
    var _0x9C32 = document[_$_6a78[292]](_$_6a78[20]);
    for (var _0x6D1C = 0; _0x6D1C < _0x9C32[_$_6a78[22]]; _0x6D1C++) {
      if (_0x9C32[_0x6D1C][_$_6a78[11]][_$_6a78[37]](_$_6a78[399]) != -1) {
        _0x9C01 = true;
        break;
      }
    }
    if (_0x9C01) {
      play[_$_6a78[208]] = AbcPlay({ onend: endplay, onnote: notehlight });
    } else {
      abc2svg[_$_6a78[99]](_$_6a78[400], function () {
        play[_$_6a78[208]] = AbcPlay({ onend: endplay, onnote: notehlight });
      });
    }
    if (user[_$_6a78[401]]) {
      var _0x9395 = elt_ref[_$_6a78[12]];
      _0x9395[_$_6a78[402]] = function (_0x93C6) {
        if (document[_$_6a78[103]](_$_6a78[403]) != null) {
          document[_$_6a78[103]](_$_6a78[403])[_$_6a78[25]][_$_6a78[24]] =
            _$_6a78[116];
        }
        var _0x6F06,
          _0x6F37,
          _0x9DBA = _0x93C6[_$_6a78[12]],
          _0x9D58 = _0x9DBA[_$_6a78[194]](_$_6a78[193]);
        _0x93C6[_$_6a78[203]]();
        _0x93C6[_$_6a78[204]]();
        if (_0x9D58 && _0x9D58[_$_6a78[198]](0, 4) == _$_6a78[199]) {
          setsel(1, Number(getAbcistart(_0x9D58)));
        }
        while (_0x9DBA[_$_6a78[183]] && _0x9DBA[_$_6a78[183]] != _$_6a78[185]) {
          _0x9DBA = _0x9DBA[_$_6a78[313]];
        }
        play[_$_6a78[185]] = _0x9DBA;
        var _0x9D89 = document[_$_6a78[103]](_$_6a78[195]);
        _0x9D89[_$_6a78[25]][_$_6a78[24]] = _$_6a78[205];
        _0x6F06 =
          _0x93C6[_$_6a78[404]] +
          elt_ref[_$_6a78[12]][_$_6a78[313]][_$_6a78[333]];
        _0x6F37 = _0x93C6[_$_6a78[405]];
        _0x9D89[_$_6a78[25]][_$_6a78[406]] = _0x6F06 + 5 + _$_6a78[256];
        _0x9D89[_$_6a78[25]][_$_6a78[7]] = _0x6F37 + 20 + _$_6a78[256];
        var _0x7183 = $(_0x93C6[_$_6a78[12]])[_$_6a78[169]](_$_6a78[175]);
        if (_0x7183) {
          if ($(_$_6a78[172])[_$_6a78[22]] == 0) {
            var _0x9DEB = $(
              _$_6a78[409] + _0x7183 + _$_6a78[410] + _0x7183 + _$_6a78[411]
            )[_$_6a78[408]](_$_6a78[407]);
          }
          $(_$_6a78[412] + _0x7183 + _$_6a78[411])[_$_6a78[155]](
            _$_6a78[222],
            _$_6a78[227]
          );
        }
        if ($(_$_6a78[172])[_$_6a78[22]] > 0) {
          $(_$_6a78[414])[_$_6a78[413]]();
        } else {
          $(_$_6a78[414])[_$_6a78[126]]();
        }
        return false;
      };
    }
  }
  _0x9C94();
}
function getAbcistart(_0x9D58) {
  if (_0x9D58 != null) {
    var _0xA905 = _0x9D58[_$_6a78[19]](/[0-9]+/g);
    if (!_0xA905) {
      return 0;
    }
    return _0xA905[0];
  }
}
function drag_over(_0x93C6) {
  _0x93C6[_$_6a78[203]]();
  _0x93C6[_$_6a78[204]]();
}
function dropped(_0x93C6) {
  _0x93C6[_$_6a78[203]]();
  _0x93C6[_$_6a78[204]]();
  var _0x9B9F = _0x93C6[_$_6a78[416]][_$_6a78[415]](_$_6a78[67]);
  if (_0x9B9F) {
    _0x93C6[_$_6a78[12]][_$_6a78[28]] = _0x9B9F;
    src_change();
    return;
  }
  _0x9B9F = _0x93C6[_$_6a78[416]][_$_6a78[107]];
  if (_0x9B9F[_$_6a78[22]] != 0) {
    var _0x9BD0 = new FileReader();
    _0x9BD0[_$_6a78[379]] = function (_0x93C6) {
      $(_$_6a78[130])[_$_6a78[129]](_0x93C6[_$_6a78[12]][_$_6a78[111]]);
      src_change();
    };
    _0x9BD0[_$_6a78[115]](_0x9B9F[0], _$_6a78[114]);
    return;
  }
}
function getNoteData() {
  if (user[_$_6a78[417]] && user[_$_6a78[418]]) {
    return user[_$_6a78[418]];
  }
  isGetNoteData = true;
  var abc,
    _0x6D7E = $(_$_6a78[130])[_$_6a78[129]]();
  user[_$_6a78[132]] = null;
  user[_$_6a78[134]] = play[_$_6a78[208]][_$_6a78[296]];
  abc = new abc2svg[_$_6a78[135]](user);
  try {
    initVol = 1;
    splitVol = 0;
    abc[_$_6a78[138]](abc_fname[0], _0x6D7E);
    isGetNoteData = false;
  } catch (e) {
    window[_$_6a78[7]][_$_6a78[6]](
      e[_$_6a78[139]] + _$_6a78[140] + e[_$_6a78[141]]
    );
    play[_$_6a78[206]] = false;
    play[_$_6a78[120]] = null;
    isGetNoteData = false;
    return;
  }
  var _0xAD3B = play[_$_6a78[208]][_$_6a78[369]]();
  if (user[_$_6a78[417]]) {
    user[_$_6a78[418]] = _0xAD3B;
  }
  isGetNoteData = false;
  return _0xAD3B;
}
function clearNoteData() {
  user[_$_6a78[418]] = null;
}
function getAllNoteIndex() {
  var _0xA936 = getNoteData();
  var _0xA967 = new Array();
  for (var _0x6D1C = 0; _0x6D1C < _0xA936[_$_6a78[22]]; _0x6D1C++) {
    _0xA967[_$_6a78[361]](_0xA936[_0x6D1C][0]);
  }
  return _0xA967;
}
function showFirstBarSeq() {
  $[_$_6a78[350]]($(_$_6a78[185]), function (_0x6D1C, _0x89A1) {
    $[_$_6a78[350]](
      $(_0x89A1)[_$_6a78[214]](_$_6a78[419]),
      function (_0x77A3, _0xC92D) {
        if (_0x77A3 > 0) {
          $(_0xC92D)[_$_6a78[286]]();
        }
      }
    );
  });
}
var timer;
function src_change(_0xC154) {
  $(_$_6a78[145])[_$_6a78[155]](_$_6a78[420], _$_6a78[421]);
  $(_$_6a78[423])[_$_6a78[311]](_$_6a78[422]);
  var _0xA18E = $(_$_6a78[130])[_$_6a78[129]]();
  if (_0xA18E == _$_6a78[14]) {
    return;
  }
  if (user[_$_6a78[424]] == 0) {
    user[_$_6a78[425]] = musicType;
  }
  user[_$_6a78[426]] = null;
  line0X = -1;
  line1X = -1;
  $(_$_6a78[427])[_$_6a78[286]]();
  $(_$_6a78[428])[_$_6a78[286]]();
  $(_$_6a78[429])[_$_6a78[286]]();
  user[_$_6a78[430]] = null;
  try {
    has_weak_node = false;
    bar_count = 0;
    last_bar_time = 0;
    bar_visible = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
    };
    max_st_nodenum = 0;
    last_bar_x = 0;
  } catch (e) {
    console[_$_6a78[431]](e);
  }
  showBeat = false;
  showKew = false;
  showSD = false;
  isInFirstNode = true;
  firstNodeNotes = new Array();
  renderStaffMeterCount = 0;
  if (!elt_ref[_$_6a78[112]]) {
    return;
  }
  var _0xC9C0 = new Array();
  var _0xCA22 = /V\s*:\s*([0-9]*)/g;
  var _0x6D4D = _0xA18E[_$_6a78[19]](_0xCA22);
  isStave = false;
  notAutoSFBarSeq = -1;
  if (_0x6D4D != null && _0x6D4D[_$_6a78[22]] > 0) {
    for (var _0x6D1C = 0; _0x6D1C < _0x6D4D[_$_6a78[22]]; _0x6D1C++) {
      var _0x6C89 = _0x6D4D[_0x6D1C];
      var _0xC9F1 = _0x6C89[_$_6a78[19]](/V\s*:\s*([0-9]*)/)[1];
      if (_0xC9C0[_$_6a78[37]](_0xC9F1) < 0) {
        _0xC9C0[_$_6a78[361]](_0xC9F1);
      }
    }
  }
  if (_0xC9C0[_$_6a78[22]] > 1) {
    isStave = true;
  } else {
    if (_0xC9C0[_$_6a78[22]] == 1) {
      if (_0xC9C0[0] == _$_6a78[432]) {
        isStave = true;
      }
    }
  }
  if (!isStave && musicType == 2) {
    if (false) {
      var _0xA18E = $(_$_6a78[130])[_$_6a78[129]]();
      if (_0xA18E[_$_6a78[37]](_$_6a78[433]) > -1) {
        var _0xC98F = firstMeterWidth;
        _0xA18E = _0xA18E[_$_6a78[96]](/\%\%indent.*/, _$_6a78[434] + _0xC98F);
        $(_$_6a78[130])[_$_6a78[129]](_0xA18E);
      } else {
        $(_$_6a78[130])[_$_6a78[129]](
          _$_6a78[434] +
            firstMeterWidth +
            _$_6a78[123] +
            $(_$_6a78[130])[_$_6a78[129]]()
        );
      }
    }
  } else {
    $(_$_6a78[130])[_$_6a78[129]](
      $(_$_6a78[130])[_$_6a78[129]]()[_$_6a78[436]](_$_6a78[435], _$_6a78[14])
    );
  }
  play_stop();
  play[_$_6a78[206]] = false;
  if (!play[_$_6a78[206]]) {
    timer = setTimeout(render, 100, _0xC154);
  }
  if (
    elt_ref[_$_6a78[112]] &&
    $(_$_6a78[130])[_$_6a78[129]]() != _$_6a78[14] &&
    $(_$_6a78[130])[_$_6a78[129]]()[_$_6a78[37]](_$_6a78[437]) > -1
  ) {
    setTimeout(showFirstBarSeq, 100);
  }
  getVoiceVol(_$_6a78[112]);
}
function getVoiceVol(_0xB3EE) {
  var _0xA18E = $(_$_6a78[438] + _0xB3EE)[_$_6a78[129]]();
  if (!_0xA18E) {
    return;
  }
  var _0xB38C = /%%voicevol\((.*)\)/;
  var _0x6D4D = _0xA18E[_$_6a78[19]](_0xB38C);
  if (_0x6D4D != null) {
    var _0x6C89 = _0x6D4D[1];
    var _0xB41F = _0x6C89[_$_6a78[167]](_$_6a78[33]);
    vols = new Array();
    for (var _0x77A3 = 0; _0x77A3 < _0xB41F[_$_6a78[22]]; _0x77A3++) {
      var _0xB3BD = _0xB41F[_0x77A3];
      var _0x9E1C = _0xB3BD[_$_6a78[167]](_$_6a78[439])[0];
      var _0xB450 = _0xB3BD[_$_6a78[167]](_$_6a78[439])[1];
      var _0x9333 = new Object();
      _0x9333[_$_6a78[57]] = _0x9E1C;
      _0x9333[_$_6a78[440]] = _0xB450;
      vols[_$_6a78[361]](_0x9333);
    }
  }
}
setTimeout(edit_init, 200);
function getBeatAndSpeed(_0xA18E, _0x6BF6) {
  var _0xAABE = new RegExp(_$_6a78[441]);
  var _0xAA8D = new RegExp(_$_6a78[442]);
  var _0xAA2B = _0xAABE[_$_6a78[240]](_0xA18E);
  var _0x82BD = _0xAA8D[_$_6a78[240]](_0xA18E);
  var _0xAA5C;
  if (!_0x82BD) {
    return typeof _0x6BF6 == _$_6a78[23] && _0x6BF6();
  }
  var _0xA9FA = _0x82BD[0][_$_6a78[96]](
    new RegExp(_$_6a78[443], _$_6a78[444]),
    _$_6a78[14]
  );
  if (_0xA9FA[_$_6a78[37]](_$_6a78[445]) > -1) {
    _0xA9FA = _$_6a78[446];
  } else {
    if (_0xA9FA[_$_6a78[37]](_$_6a78[447]) > -1) {
      _0xA9FA = _$_6a78[448];
    } else {
      if (_0xA9FA[_$_6a78[167]](_$_6a78[449])[_$_6a78[22]] > 2) {
        _0xA9FA = _0xA9FA[_$_6a78[241]]()[_$_6a78[167]](_$_6a78[10])[0];
      }
    }
  }
  _0xA9FA = _0xA9FA[_$_6a78[436]](_$_6a78[10], _$_6a78[14]);
  var _0xA9C9 = _0xA9FA[_$_6a78[167]](_$_6a78[449])[0];
  if (!_0xAA2B) {
    _0xAA5C = [
      _$_6a78[450] + _0xA9FA[_$_6a78[167]](_$_6a78[449])[1],
      _$_6a78[451],
    ];
  } else {
    _0xAA5C = _0xAA2B[0]
      [_$_6a78[96]](_$_6a78[452], _$_6a78[14])
      [_$_6a78[167]](_$_6a78[439]);
    if (
      _0xAA5C &&
      _0xAA5C[_$_6a78[22]] > 0 &&
      _0xAA5C[0][_$_6a78[37]](_$_6a78[453]) > -1
    ) {
      qAsplit = _0xAA5C[0][_$_6a78[167]](_$_6a78[453]);
      _0xAA5C[0] = qAsplit[qAsplit[_$_6a78[22]] - 1];
    }
  }
  var _0xAB51 = 0;
  if (_0xAA5C[_$_6a78[22]] > 0) {
    var _0xAAEF = _0xAA5C[1];
    var _0x9302 = _0xAA5C[0][_$_6a78[167]](_$_6a78[449]);
    var _0x85FE = eval(_0xAA5C[0]);
    var _0xAB20 =
      (_0xAAEF * _0xA9FA[_$_6a78[167]](_$_6a78[449])[1]) / _0x9302[1];
    _0xAB51 = 60 / _0xAB20;
  } else {
    _0xAB51 = 60 / _0xAA5C[0];
  }
  var _0xA998 = _0xAA5C[1];
  return (
    typeof _0x6BF6 == _$_6a78[23] && _0x6BF6(_0xA9C9, _0xAB51, _0xA998, _0xA9FA)
  );
}
function getSubSvg(_0xB171, _0x70F0) {
  var _0xB140 = _$_6a78[14];
  var _0xB10F = _$_6a78[14];
  for (var _0x6D1C = 0; _0x6D1C < _0x70F0; _0x6D1C++) {
    var _0x6DAF = _0xB171[_$_6a78[37]](_$_6a78[454]);
    _0xB171 = _0xB171[_$_6a78[198]](_0x6DAF + 6);
  }
  var _0xB0DE = _0xB171[_$_6a78[37]](_$_6a78[454]);
  return _0xB171[_$_6a78[177]](0, _0xB0DE + 6);
}
function getClickNoteInfo(_0x7183) {
  return syms[_0x7183];
}
function findNearElement(_0xA283, _0x6F06, _0x6F37) {
  var _0xA1F0 = 9999;
  var _0xA221 = 9999;
  var _0xA252 = null;
  if ($(_0xA283)[_$_6a78[455]](_$_6a78[67])) {
    var _0x6E73 = $(_0xA283)[_$_6a78[169]](_$_6a78[9]);
    if (_0x6E73 == _$_6a78[235] || _0x6E73 == _$_6a78[456]) {
      _0xA252 = $(_0xA283);
      var _0x9333 = new Object();
      _0x9333[_$_6a78[9]] = _0x6E73;
      _0x9333[_$_6a78[67]] = $(_0xA283)[_$_6a78[67]]();
      return _0x9333;
    }
  }
  $(_0xA283)
    [_$_6a78[214]](_$_6a78[466])
    [_$_6a78[350]](function (_0x6D1C, _0x89A1) {
      var _0xA3A9 = $(this)[_$_6a78[169]](_$_6a78[331]);
      var _0xA3DA = $(this)[_$_6a78[169]](_$_6a78[457]);
      if (!_0xA3A9) {
        _0xA3A9 = 0;
      }
      if (!_0xA3DA) {
        _0xA3DA = 0;
      }
      _0xA3A9 = parseFloat(_0xA3A9);
      _0xA3DA = parseFloat(_0xA3DA);
      var _0xA2B4 = $(_0x89A1)[0][_$_6a78[458]]();
      var _0xA4CF = $(_0x89A1)[0][_$_6a78[459]]();
      var _0x9023 = _0xA2B4[_$_6a78[327]];
      var _0xA626 = _0xA2B4[_$_6a78[330]];
      if ($(_0x89A1)[_$_6a78[455]](_$_6a78[460]) && !_0xA3A9) {
        var _0xA2E5 = $(_0x89A1)[_$_6a78[169]](_$_6a78[461]);
        if (_0xA2E5 && _0xA2E5 != _$_6a78[14]) {
          var _0xA46D = /m(\d*[.]\d*\s*\d*[.]\d*)/i;
          var _0xA49E = _0xA2E5[_$_6a78[19]](_0xA46D);
          if (_0xA49E != null && _0xA49E[_$_6a78[22]] > 0) {
            var _0xA43C = _0xA49E[1][_$_6a78[96]](/\s+/, _$_6a78[10]);
            _0xA3A9 = parseFloat(_0xA43C[_$_6a78[167]](_$_6a78[10])[0]);
            _0xA3DA = parseFloat(_0xA43C[_$_6a78[167]](_$_6a78[10])[1]);
          }
        }
      }
      var _0x85FE = $(this)[_$_6a78[344]]();
      var _0x884A = 0;
      var _0x887B = 0;
      var _0xA531 = 1;
      if ($(_0x85FE)[_$_6a78[455]](_$_6a78[444])) {
        var _0xA5C4 = $(_0x85FE)[_$_6a78[169]](_$_6a78[462]);
        if (_0xA5C4 && _0xA5C4 != _$_6a78[14]) {
          var _0xA5F5 = /translate\((.[^\(]*)\)/;
          var _0xA500 = /scale\((.[^\(]*)\)/;
          var _0xA562 = _0xA5C4[_$_6a78[19]](_0xA5F5);
          if (_0xA562 != null && _0xA562[_$_6a78[22]] > 0) {
            var _0xA593 = _0xA562[1];
            _0x884A = parseFloat(_0xA593[_$_6a78[167]](_$_6a78[33])[0]);
            _0x887B = parseFloat(_0xA593[_$_6a78[167]](_$_6a78[33])[1]);
          }
          var _0xA40B = _0xA5C4[_$_6a78[19]](_0xA500);
          if (_0xA40B != null && _0xA40B[_$_6a78[22]] > 0) {
            _0xA531 = parseFloat(_0xA40B[1]);
            _0xA626 = parseFloat(_0xA626) / _0xA531;
            _0x9023 = parseFloat(_0x9023) / _0xA531;
          }
        }
        if ($(_0x85FE)[_$_6a78[169]](_$_6a78[9]) == _$_6a78[463]) {
          _0x9023 = -_0x9023;
        }
      }
      var _0x6E73 = $(_0x89A1)[_$_6a78[169]](_$_6a78[9]);
      if (_0x6E73 && _0x6E73[_$_6a78[182]]() == _$_6a78[464]) {
        if (parseFloat(_0x9023) > 0) {
          _0x9023 = parseFloat(_0x9023) - 20;
        }
      }
      if ($(_0x89A1)[_$_6a78[455]](_$_6a78[460])) {
        if (
          _0x6F06 >= _0xA3A9 + _0x884A &&
          _0x6F06 <= parseFloat(_0xA3A9) + parseFloat(_0xA626) + _0x884A &&
          _0x6F37 >= parseFloat(_0xA3DA) + _0x887B &&
          _0x6F37 <= Math[_$_6a78[362]](_0xA3DA) + parseFloat(_0x9023) + _0x887B
        ) {
          _0xA252 = $(this);
          return false;
        }
      } else {
        if (
          _0x6F06 >= _0xA3A9 + _0x884A &&
          _0x6F06 <= parseFloat(_0xA3A9) + parseFloat(_0xA626) + _0x884A &&
          _0x6F37 <= parseFloat(_0xA3DA) + _0x887B &&
          _0x6F37 >= Math[_$_6a78[362]](_0xA3DA) - parseFloat(_0x9023) + _0x887B
        ) {
          _0xA252 = $(this);
          return false;
        }
      }
      var _0x8F5F = Math[_$_6a78[362]](parseFloat(_0xA3A9 + _0x884A) - _0x6F06);
      if (_0x8F5F > 30) {
        return;
      }
      if (_0x8F90 > 30) {
        return;
      }
      var _0x8F90 = Math[_$_6a78[362]](parseFloat(_0xA3DA + _0x887B) - _0x6F37);
      var _0xA378 = Math[_$_6a78[362]](
        parseFloat(_0xA3DA) + parseFloat(_0x9023) - _0x6F37
      );
      var _0xA316 = Math[_$_6a78[465]](
        Math[_$_6a78[263]](_0x8F5F, 2) + Math[_$_6a78[263]](_0x8F90, 2)
      );
      var _0xA347 = Math[_$_6a78[465]](
        Math[_$_6a78[263]](_0x8F5F, 2) + Math[_$_6a78[263]](_0xA378, 2)
      );
      if (_0xA347 < _0xA316) {
        _0xA316 = _0xA347;
      }
      if (_0xA316 < 50) {
        if (_0xA316 < _0xA221) {
          _0xA221 = _0xA316;
          _0xA252 = $(this);
        }
      }
    });
  var _0x9333 = new Object();
  _0x9333[_$_6a78[9]] = null;
  _0x9333[_$_6a78[67]] = _$_6a78[14];
  _0x9333[_$_6a78[467]] = _$_6a78[14];
  if (_0xA252 != null && _0xA252[_$_6a78[22]] > 0) {
    console[_$_6a78[147]](_0xA252[0][_$_6a78[468]]);
    _0x9333[_$_6a78[9]] = $(_0xA252)[_$_6a78[169]](_$_6a78[9]);
    if ($(_0xA252)[_$_6a78[455]](_$_6a78[67])) {
      _0x9333[_$_6a78[67]] = $(_0xA252)[_$_6a78[67]]();
    }
    if ($(_0xA252)[_$_6a78[169]](_$_6a78[467])) {
      _0x9333[_$_6a78[467]] = $(_0xA252)[_$_6a78[169]](_$_6a78[467]);
    }
    _0x9333[_$_6a78[144]] = _0xA252[0][_$_6a78[468]];
  }
  return _0x9333;
}
var singleRect2 = function (
  _0x6E73,
  _0x6DAF,
  _0x6DE0,
  _0x6F06,
  _0x6F37,
  _0x6ED5,
  _0x6CEB,
  _0x6D7E,
  _0x6E11
) {
  if (_$_6a78[469] != _0x6E73 && _$_6a78[470] != _0x6E73) {
    return;
  }
  var _0x8C1E = 2,
    _0x8C80,
    _0x8C4F,
    _0x8BED;
  _0x8C4F = _0x6D7E[_$_6a78[331]] - 4.5 - 2;
  let _0x8CE2 = abc[_$_6a78[471]]();
  let _0x8D13 = _0x8CE2[_$_6a78[22]];
  var _0x8CB1 = 0;
  var _0x8B8B = -1;
  var _0x8B5A = 0;
  for (var _0x6D1C = 0; _0x6D1C < _0x8CE2[_$_6a78[22]]; _0x6D1C++) {
    if (_0x8CE2[_0x6D1C][_$_6a78[457]] != 0) {
      if (_0x8B8B == -1) {
        _0x8B8B = _0x6D1C;
      }
      _0x8CB1++;
      _0x8B5A = _0x6D1C;
    }
  }
  if (_0x8CB1 == 1) {
    _0x8C80 =
      _0x8CE2[_0x8B8B][_$_6a78[457]] +
      _0x8CE2[_0x8B8B][_$_6a78[472]] * _0x8CE2[_0x8B8B][_$_6a78[473]] +
      15;
    _0x8BED =
      _0x8CE2[_0x8B8B][_$_6a78[472]] * _0x8CE2[_0x8B8B][_$_6a78[473]] + 30;
    if (_0x6D7E[_$_6a78[271]] == 0 && musicType == 2) {
      _0x8BED = _0x8BED + 15;
    }
  } else {
    _0x8C80 =
      abc[_$_6a78[471]]()[_0x8B8B][_$_6a78[457]] +
      _0x8CE2[_0x8B8B][_$_6a78[472]] * _0x8CE2[_0x8B8B][_$_6a78[473]] +
      15;
    _0x8BED =
      _0x8CE2[_0x8B8B][_$_6a78[457]] +
      _0x8CE2[_0x8B8B][_$_6a78[472]] * _0x8CE2[_0x8B8B][_$_6a78[473]] -
      (_0x8CE2[_0x8B5A][_$_6a78[457]] +
        _0x8CE2[_0x8B5A][_$_6a78[474]] * _0x8CE2[_0x8B5A][_$_6a78[473]]) +
      30;
    if (_0x6D7E[_$_6a78[271]] == 0 && musicType == 2) {
      _0x8BED = _0x8BED + 15;
    }
  }
  var _0x8BBC = getValidNext(_0x6D7E, _0x6D7E[_$_6a78[475]]);
  var _0x8D44 = _0x8BBC[_$_6a78[303]] - _0x6D7E[_$_6a78[303]];
  var _0x8C1E = 2,
    _0x8C80,
    _0x8C4F,
    _0x8BED;
  var _0x7E25 = getMeter(_0x6D7E[_$_6a78[477]][_$_6a78[72]][_$_6a78[476]][0]);
  var _0x7DC3 = $(_$_6a78[130])[_$_6a78[129]]();
  var _0x6FFB = _0x7DC3[_$_6a78[124]](_0x6DAF, _0x6DE0);
  if (_0x7E25 && _0x7E25[_$_6a78[478]] < 4) {
    _0x7E25[_$_6a78[478]] = 4;
    _0x7E25[_$_6a78[7]] = (4 / _0x7E25[_$_6a78[478]]) * _0x7E25[_$_6a78[7]];
  }
  var _0x6C58 = getTag(_0x7DC3, _$_6a78[479]);
  var _0x8A65 =
    _0x6D7E[_$_6a78[480]] / parseInt(_0x6D7E[_$_6a78[481]][0][_$_6a78[7]]);
  _0x6D7E[_$_6a78[482]] = _0x8A65;
  _0x6D7E[_$_6a78[483]] = _0x8D44;
  _0x6D7E[_$_6a78[484]] = 0;
  if (_0x8D44 > _0x8A65) {
    var _0x8B29 = isMinXWithSameTime(_0x6D7E);
    if (!_0x8B29) {
      return;
    }
    if (_0x8B29) {
      var _0x8AC7 = removeSingleLine(_0x6D7E);
      if (_0x8AC7) {
        drawSingleLine(
          _0x8C4F,
          _0x8C80,
          _0x8C1E,
          _0x8BED,
          _0x6D7E,
          _0x6E73,
          0,
          _0x6D7E[_$_6a78[303]],
          _0x8A65
        );
      }
    }
    var _0x8A96 = 0;
    var _0x8AF8 = _0x8D44 + 0;
    while (_0x8D44 > _0x8A65) {
      _0x8D44 = _0x8D44 - _0x8A65;
      _0x8A96++;
    }
    var _0x8D75 = _0x8BBC[_$_6a78[331]] - _0x6D7E[_$_6a78[331]];
    var _0x8DA6 = _0x8D75 / (_0x8A96 + 1);
    _0x6D7E[_$_6a78[484]] = _0x8A96;
    for (var _0x6D1C = 1; _0x6D1C <= _0x8A96; _0x6D1C++) {
      drawSingleLine(
        _0x8C4F + _0x8DA6 * _0x6D1C,
        _0x8C80,
        _0x8C1E,
        _0x8BED,
        _0x6D7E,
        _0x6E73,
        _0x6D1C,
        _0x6D7E[_$_6a78[303]] + (_0x8AF8 / (_0x8A96 + 1)) * _0x6D1C,
        _0x8AF8 / (_0x8A96 + 1)
      );
    }
    console[_$_6a78[147]](
      _$_6a78[485],
      _0x6D7E[_$_6a78[175]],
      _$_6a78[486],
      _0x8BBC[_$_6a78[175]]
    );
    console[_$_6a78[147]](_$_6a78[487], _0x8D44);
    console[_$_6a78[147]](_$_6a78[488] + _0x8A96 + _$_6a78[489], _0x8DA6);
  } else {
    if (_0x8D44 > 0) {
      if (isMinXWithSameTime(_0x6D7E)) {
        var _0x8AC7 = removeSingleLine(_0x6D7E);
        if (_0x8AC7) {
          drawSingleLine(
            _0x8C4F,
            _0x8C80,
            _0x8C1E,
            _0x8BED,
            _0x6D7E,
            _0x6E73,
            0,
            _0x6D7E[_$_6a78[303]],
            _0x6D7E[_$_6a78[490]]
          );
        }
      }
    } else {
      if (_0x8D44 == 0 && _0x8BBC[_$_6a78[9]] == 10) {
        var _0x8AC7 = removeSingleLine(_0x6D7E);
        if (_0x8AC7) {
          drawSingleLine(
            _0x8C4F,
            _0x8C80,
            _0x8C1E,
            _0x8BED,
            _0x6D7E,
            _0x6E73,
            0,
            _0x6D7E[_$_6a78[303]],
            _0x6D7E[_$_6a78[490]]
          );
        }
      }
    }
  }
};
function isMinXWithSameTime(_0x6D7E) {
  for (var _0x6D1C = 0; _0x6D1C < syms[_$_6a78[22]]; _0x6D1C++) {
    var _0xB4E3 = syms[_0x6D1C];
    if (
      _0xB4E3 &&
      _0x6D7E[_$_6a78[9]] == 10 &&
      _0x6D7E[_$_6a78[303]] == _0xB4E3[_$_6a78[303]] &&
      _0x6D7E[_$_6a78[175]] != _0xB4E3[_$_6a78[175]] &&
      (_0xB4E3[_$_6a78[9]] == 10 || _0xB4E3[_$_6a78[9]] == 8)
    ) {
      if (_0x6D7E[_$_6a78[331]] < _0xB4E3[_$_6a78[331]]) {
        return true;
      }
      return false;
    }
  }
  return true;
}
function removeSingleLine(_0x6D7E) {
  var _0xB38C = new RegExp(
    _$_6a78[491] + _0x6D7E[_$_6a78[303]] + _$_6a78[492],
    _$_6a78[444]
  );
  var _0xC123 = abc[_$_6a78[493]]();
  var _0x6D4D = _0xC123[_$_6a78[19]](_0xB38C);
  if (_0x6D4D != null) {
    for (var _0x6D1C = 0; _0x6D1C < _0x6D4D[_$_6a78[22]]; _0x6D1C++) {
      _0xC123 = _0xC123[_$_6a78[96]](_0x6D4D[_0x6D1C], _$_6a78[14]);
    }
    abc[_$_6a78[494]](_0xC123);
  }
  return true;
}
function getValidNext(_0x6D7E, _0x8BBC) {
  if (
    _0x8BBC[_$_6a78[495]] ||
    (_0x8BBC &&
      _0x8BBC[_$_6a78[9]] != 10 &&
      _0x8BBC[_$_6a78[9]] != 8 &&
      _0x8BBC[_$_6a78[9]] != 0)
  ) {
    while (_0x8BBC[_$_6a78[475]]) {
      _0x8BBC = _0x8BBC[_$_6a78[475]];
      if (_0x8BBC[_$_6a78[495]]) {
        continue;
      }
      if (
        _0x8BBC[_$_6a78[9]] == 10 ||
        _0x8BBC[_$_6a78[9]] == 8 ||
        _0x8BBC[_$_6a78[9]] == 0
      ) {
        break;
      }
    }
  }
  if (
    _0x8BBC[_$_6a78[303]] - _0x6D7E[_$_6a78[303]] == 0 &&
    _0x8BBC[_$_6a78[9]] == 10
  ) {
    _0x8BBC = _0x8BBC[_$_6a78[475]];
    return getValidNext(_0x6D7E, _0x8BBC);
  }
  return _0x8BBC;
}
function drawSingleLine(
  _0x8C4F,
  _0x8C80,
  _0x8C1E,
  _0x8BED,
  _0x6D7E,
  _0x6E73,
  _0x99B5,
  _0x9A79,
  _0x99E6
) {
  _0x8C1E = 2;
  var _0x9A48 = _$_6a78[14];
  if (_0x6D7E[_$_6a78[496]]) {
    var _0x9A17 = _0x6D7E[_$_6a78[496]][_$_6a78[175]];
    _0x9A48 = _$_6a78[497];
  }
  abc[_$_6a78[61]](
    _$_6a78[491] +
      _0x6D7E[_$_6a78[303]] +
      _$_6a78[498] +
      _0x9A79 +
      _$_6a78[499] +
      _0x99E6 +
      _$_6a78[500] +
      _0x9A48 +
      _$_6a78[501] +
      (_0x6D7E[_$_6a78[502]] == 0 && _0x6D7E[_$_6a78[503]] == 1
        ? _$_6a78[504]
        : _$_6a78[14]) +
      _$_6a78[59] +
      _0x6D7E[_$_6a78[175]] +
      _$_6a78[505] +
      _0x99B5 +
      _$_6a78[506]
  );
  abc[_$_6a78[65]](_0x8C4F, _$_6a78[63], _0x8C80);
  abc[_$_6a78[61]](
    _$_6a78[79] +
      _0x8C1E[_$_6a78[80]](2) +
      _$_6a78[81] +
      abc[_$_6a78[62]](_0x8BED)[_$_6a78[80]](2) +
      _$_6a78[82]
  );
}
function renderSuccess() {
  renderTimeout = setTimeout(function () {
    $('.f1, .f2, .f3').on('dblclick', function() {
      const el = $(this)
      let { top, left } = el.offset()
      let { width, height } = el.get(0).getBoundingClientRect()
      top +='px'
      left +='px'
      width +='px'
      height +='px'
      content_vue.m.editor.style = {
        top, left, width, height,
        minHeight: '40px'
      }

      let type = ''
      const className = el.attr('class')
      content_vue.m.editor.val = el.text()
      if (className === 'f1') type = 'title'
      else if (className === 'f2') type = 'subTitle'
      else if (className === 'f3') {
        const index = el.index()
        if (index === 2) type = 'compose'
        else if (index === 3) type = 'lyricist'
      }
      content_vue.m.editor.type = type
    })
    var $events = $(_$_6a78[509])[_$_6a78[508]](_$_6a78[507]);
    // $(_$_6a78[509])[_$_6a78[515]](_$_6a78[510], function () {
    //   if (!user[_$_6a78[511]]) {
    //     return false;
    //   }
    //   var _0xC30D = this[_$_6a78[459]]();
    //   var _0xC33E = document[_$_6a78[238]](_$_6a78[512]);
    //   $(_0xC33E)
    //     [_$_6a78[155]](_$_6a78[513], 2)
    //     [_$_6a78[155]](_$_6a78[281], _$_6a78[277]);
    //   $(_$_6a78[250])[_$_6a78[343]]($(_0xC33E));
    //   var $self = $(this);
    //   $(_0xC33E)
    //     [_$_6a78[129]](getAllTitle())
    //     [_$_6a78[155]]({
    //       left: _0xC30D[_$_6a78[406]],
    //       top: _0xC30D[_$_6a78[7]],
    //       width: _0xC30D[_$_6a78[330]] < 200 ? 200 : _0xC30D[_$_6a78[330]],
    //       height: _0xC30D[_$_6a78[327]] < 80 ? 80 : _0xC30D[_$_6a78[327]],
    //     })
    //     [_$_6a78[413]]()
    //     [_$_6a78[165]]()
    //     [_$_6a78[515]](_$_6a78[221], function () {
    //       $self[_$_6a78[67]]($(this)[_$_6a78[129]]());
    //       $(_$_6a78[514])[_$_6a78[129]]($(this)[_$_6a78[129]]());
    //       set(_$_6a78[242], $(this)[_$_6a78[129]]());
    //       $(this)[_$_6a78[155]](_$_6a78[24], _$_6a78[116]);
    //       src_change();
    //     });
    // });
    // $(_$_6a78[518])[_$_6a78[515]](_$_6a78[510], function () {
    //   if (!user[_$_6a78[511]]) {
    //     return false;
    //   }
    //   var _0xC30D = this[_$_6a78[459]]();
    //   var _0xC33E = document[_$_6a78[238]](_$_6a78[512]);
    //   $(_0xC33E)
    //     [_$_6a78[155]](_$_6a78[513], 2)
    //     [_$_6a78[155]](_$_6a78[281], _$_6a78[277]);
    //   $(_$_6a78[250])[_$_6a78[343]]($(_0xC33E));
    //   var $self = $(this);
    //   $(_0xC33E)
    //     [_$_6a78[129]]($(_$_6a78[516])[_$_6a78[129]]())
    //     [_$_6a78[155]]({
    //       left: _0xC30D[_$_6a78[406]] - 100,
    //       top: _0xC30D[_$_6a78[7]] - 50,
    //       width: _0xC30D[_$_6a78[330]] + 100,
    //       height: _0xC30D[_$_6a78[327]] + 80,
    //     })
    //     [_$_6a78[413]]()
    //     [_$_6a78[165]]()
    //     [_$_6a78[515]](_$_6a78[221], function () {
    //       $(_$_6a78[516])[_$_6a78[129]]($(this)[_$_6a78[129]]());
    //       set(_$_6a78[517], $(this)[_$_6a78[129]]());
    //       src_change();
    //       $(this)[_$_6a78[286]]();
    //     });
    // });
    $(_$_6a78[520])[_$_6a78[251]](function (_0x9395) {
      console[_$_6a78[147]](_0x9395[_$_6a78[331]]);
      _0x9395[_$_6a78[204]]();
      _0x9395[_$_6a78[519]]();
    });
    try {
      renderByBarIndex(bgBar);
      renderNoteBgColor();
      renderLyricBgColor();
      renderMySlur(_$_6a78[521]);
      renderMySlur(_$_6a78[522]);
      renderMySlur(_$_6a78[523]);
      renderMyBracketGch();
      renderMyWaveGch();
      renderMyText();
      if (lyricStandV != 0 && standVsyms == null) {
        standVsyms = getStandVsyms();
      }
    } catch (err) {
      console[_$_6a78[147]](err);
    } finally {
      try {
        bgBar = new Array();
      } catch (e) {
        console[_$_6a78[147]](e);
      }
    }
  }, 100);
  if (user[_$_6a78[525]][_$_6a78[524]]) {
    user[_$_6a78[525]][_$_6a78[524]] = false;
    if (
      graphEditor[_$_6a78[526]] &&
      typeof graphEditor[_$_6a78[526]][_$_6a78[525]] == _$_6a78[23]
    ) {
      graphEditor[_$_6a78[526]][_$_6a78[525]](
        user[_$_6a78[525]][_$_6a78[175]],
        user[_$_6a78[525]][_$_6a78[527]],
        user[_$_6a78[525]][_$_6a78[276]],
        true,
        false,
        user[_$_6a78[525]][_$_6a78[528]]
      );
    }
    if (user[_$_6a78[525]][_$_6a78[529]]) {
      var _0xC27A = syms[user[_$_6a78[525]][_$_6a78[175]]];
      var _0x8A96 = 20;
      while (
        _0x8A96 > 0 &&
        _0xC27A &&
        _0xC27A[_$_6a78[530]] &&
        (_0xC27A[_$_6a78[530]][_$_6a78[9]] == 8 ||
          _0xC27A[_$_6a78[530]][_$_6a78[9]] == 10)
      ) {
        _0xC27A = _0xC27A[_$_6a78[530]];
        graphEditor[_$_6a78[526]][_$_6a78[525]](
          _0xC27A[_$_6a78[175]],
          user[_$_6a78[525]][_$_6a78[527]],
          user[_$_6a78[525]][_$_6a78[276]],
          true
        );
        _0x8A96--;
      }
    }
    user[_$_6a78[525]][_$_6a78[529]] = false;
    user[_$_6a78[525]][_$_6a78[527]] = null;
    user[_$_6a78[525]][_$_6a78[276]] = 0;
    user[_$_6a78[525]][_$_6a78[528]] = false;
  } else {
    if (user[_$_6a78[525]][_$_6a78[531]]) {
      var abc = $(_$_6a78[130])[_$_6a78[129]]();
      if (user[_$_6a78[525]][_$_6a78[532]] > -1) {
        var _0xB545 = abc[user[_$_6a78[525]][_$_6a78[532]]];
        if (_0xB545 == _$_6a78[291] || _0xB545 == _$_6a78[533]) {
          abc =
            abc[_$_6a78[177]](0, user[_$_6a78[525]][_$_6a78[532]]) +
            abc[_$_6a78[177]](
              user[_$_6a78[525]][_$_6a78[532]] + 1,
              abc[_$_6a78[22]]
            );
          $(_$_6a78[130])[_$_6a78[129]](abc);
          src_change();
        }
      }
      user[_$_6a78[525]][_$_6a78[531]] = false;
      user[_$_6a78[525]][_$_6a78[532]] = -1;
    }
  }
  if ($(_$_6a78[534])[_$_6a78[22]] > 0) {
    if ($(_$_6a78[130])[_$_6a78[129]]()[_$_6a78[37]](_$_6a78[535]) > -1) {
      $(_$_6a78[534])[_$_6a78[155]](_$_6a78[24], _$_6a78[14]);
    } else {
      $(_$_6a78[534])[_$_6a78[155]](_$_6a78[24], _$_6a78[116]);
    }
  }
}
function editorAnnot(_0x6DAF) {
  console[_$_6a78[147]](_$_6a78[536]);
  if (!user[_$_6a78[537]]) {
    return;
  }
  const txtTyricEl = $(`text[type='lyric'][lyric_istart=${_0x6DAF}]`)
  if (txtTyricEl.length) {
    const lyricStr = syms
      .filter(item => item?.a_ly)
      .map(item => item.a_ly)
      .find(item => item.find(item => item?.istart == _0x6DAF))
      .map(item => item.t)
      .join('\n')
    return createLyricEditor(lyricStr, txtTyricEl.attr('istart'))
  }
  console[_$_6a78[147]](_$_6a78[541], syms[_0x6DAF][_$_6a78[9]]);
  if (syms[_0x6DAF][_$_6a78[9]] == 14) {
    var _0x6D7E = syms[_0x6DAF];
    if (_0x6D7E[_$_6a78[542]]) {
      $(_$_6a78[543])[_$_6a78[129]](_0x6D7E[_$_6a78[542]]);
    }
    $(_$_6a78[543])[_$_6a78[169]](_$_6a78[175], _0x6DAF);
    $(_$_6a78[544])[_$_6a78[155]](
      _$_6a78[406],
      ($(window)[_$_6a78[330]]() - $(_$_6a78[544])[_$_6a78[330]]()) / 2
    );
    $(_$_6a78[547])[_$_6a78[546]](_$_6a78[545]);
    return;
  }
  var _0x9EE0 = false;
  if (syms[_0x6DAF][_$_6a78[9]] == 8 || syms[_0x6DAF][_$_6a78[9]] == 10) {
    _0x9EE0 = true;
  }
  if (!_0x9EE0) {
    return;
  }
  $(_$_6a78[548])[_$_6a78[129]](_0x6DAF);
  var _0x6D7E = syms[_0x6DAF];
  var _0x9EAF = _0x6D7E[_$_6a78[66]];
  var _0x6C89 = _$_6a78[14];
  var _0x9F73 = _$_6a78[14];
  var _0x9E4D = _$_6a78[14];
  if (_0x9EAF) {
    for (var _0x6D1C = 0; _0x6D1C < _0x9EAF[_$_6a78[22]]; _0x6D1C++) {
      _0x6C89 += _0x9EAF[_0x6D1C][_$_6a78[67]];
      _0x9F73 = _0x9EAF[_0x6D1C][_$_6a78[9]];
      _0x9E4D = _0x9EAF[_0x6D1C][_$_6a78[549]];
      if (_0x6D1C != _0x9EAF[_$_6a78[22]] - 1) {
        _0x6C89 += _$_6a78[123];
      }
    }
  }
  if (_0x6C89[_$_6a78[37]](_$_6a78[550]) > -1) {
    var _0x7AE4 = /\[(font-size:.*)\]/[_$_6a78[240]](_0x6C89);
    var _0x9E7E = _$_6a78[14];
    if (_0x7AE4 != null) {
      _0x9E7E = /\[font-size:(.*)\]/[_$_6a78[240]](_0x6C89)[1];
      _0x6C89 = _0x6C89[_$_6a78[96]](/\[(font-size:.*)\]/, _$_6a78[14]);
    }
    _0x6C89 = _0x6C89[_$_6a78[96]](/\[(font-size:.*)\]/, _$_6a78[14]);
  }
  _0x6C89 = getGchCoorInfo(_0x6C89);
  if (_0x9E7E && _0x9E7E != _$_6a78[14]) {
    $(_$_6a78[551])[_$_6a78[129]](_0x9E7E);
  }
  $(_$_6a78[554] + _0x9F73 + _$_6a78[411])[_$_6a78[553]](
    _$_6a78[552],
    _$_6a78[552]
  );
  if (_0x9E4D == _$_6a78[555]) {
    $(_$_6a78[556])[_$_6a78[553]](_$_6a78[552], _$_6a78[552]);
  } else {
    $(_$_6a78[557])[_$_6a78[553]](_$_6a78[552], _$_6a78[552]);
  }
  $(_$_6a78[558])[_$_6a78[129]](_0x6C89);
  var _0x7183 = _0x6D7E[_$_6a78[175]];
  $(_$_6a78[559] + _0x7183 + _$_6a78[411])[_$_6a78[408]](_$_6a78[407]);
  $(_$_6a78[560])[_$_6a78[155]](
    _$_6a78[406],
    ($(window)[_$_6a78[330]]() - $(_$_6a78[560])[_$_6a78[330]]()) / 2
  );
  $(_$_6a78[561])[_$_6a78[546]]();
}
function getGchCoorInfo(_0x6C89) {
  var _0xA872 = _$_6a78[14];
  $(_$_6a78[562])[_$_6a78[129]](_$_6a78[14]);
  $(_$_6a78[563])[_$_6a78[129]](_$_6a78[14]);
  $(_$_6a78[564])[_$_6a78[129]](_$_6a78[14]);
  if (xcoorGchReg[_$_6a78[68]](_0x6C89) || ycoorGchReg[_$_6a78[68]](_0x6C89)) {
    var _0xAC77 = xcoorGchReg[_$_6a78[240]](_0x6C89);
    var _0xACD9 = ycoorGchReg[_$_6a78[240]](_0x6C89);
    var _0xACA8 = 0;
    var _0xAD0A = 0;
    if (_0xAC77 != null) {
      _0xA872 = _0xAC77[0];
      _0xACA8 = parseInt(_0xAC77[1]);
      $(_$_6a78[562])[_$_6a78[129]](_0xACA8);
      _0x6C89 = _0x6C89[_$_6a78[96]](xcoorGchReg, _$_6a78[14]);
    }
    if (_0xACD9 != null) {
      _0xA872 = _0xACD9[0];
      _0xAD0A = parseInt(_0xACD9[1]);
      $(_$_6a78[563])[_$_6a78[129]](_0xAD0A);
      _0x6C89 = _0x6C89[_$_6a78[96]](ycoorGchReg, _$_6a78[14]);
    }
    $(_$_6a78[564])[_$_6a78[129]](_0xA872);
  }
  return _0x6C89;
}
function saveZs() {
  var _0x7183 = $(_$_6a78[548])[_$_6a78[129]]();
  var _0xA12C = $(_$_6a78[558])[_$_6a78[129]]();
  var _0x9E4D = $(_$_6a78[565])[_$_6a78[129]]();
  var _0x9F73 = $(_$_6a78[566])[_$_6a78[129]]();
  var _0x9302 = _0xA12C[_$_6a78[167]](_$_6a78[123]);
  if (_0x7183 != _$_6a78[14]) {
    _0x7183 = parseInt(_0x7183);
    var _0x6D7E = syms[_0x7183];
    var _0x6C89 = _$_6a78[14];
    var _0x9E7E = $(_$_6a78[551])[_$_6a78[129]]();
    var _0xA872 = genGchCoorStr();
    for (var _0x6D1C = 0; _0x6D1C < _0x9302[_$_6a78[22]]; _0x6D1C++) {
      if (_0x9302[_0x6D1C] != _$_6a78[14]) {
        _0x6C89 += _$_6a78[453];
        _0x6C89 += _0x9F73 + _0x9E4D;
        if (_0x9E7E != _$_6a78[258]) {
          _0x6C89 += _$_6a78[550] + _0x9E7E + _$_6a78[567];
        }
        _0x6C89 += _0x9302[_0x6D1C] + _0xA872 + _$_6a78[453];
      }
    }
    var _0xA18E = $(_$_6a78[130])[_$_6a78[129]]();
    _0xA18E =
      _0xA18E[_$_6a78[177]](0, _0x6D7E[_$_6a78[175]]) +
      _0x6C89 +
      _0xA18E[_$_6a78[177]](_0x6D7E[_$_6a78[175]]);
    var _0x9EAF = _0x6D7E[_$_6a78[66]];
    if (_0x9EAF != null) {
      for (var _0x6D1C = _0x9EAF[_$_6a78[22]] - 1; _0x6D1C >= 0; _0x6D1C--) {
        var _0xC7A5 = _0x9EAF[_0x6D1C];
        _0xA18E =
          _0xA18E[_$_6a78[177]](0, _0xC7A5[_$_6a78[175]]) +
          _0xA18E[_$_6a78[177]](_0xC7A5[_$_6a78[176]]);
      }
    }
    $(_$_6a78[130])[_$_6a78[129]](_0xA18E);
    src_change();
    doLog();
  }
}
function genGchCoorStr() {
  var _0xA8A3 = $(_$_6a78[562])[_$_6a78[129]]();
  var _0xA8D4 = $(_$_6a78[563])[_$_6a78[129]]();
  var _0xA872 = _$_6a78[14];
  if (_0xA8A3 != _$_6a78[14]) {
    _0xA872 = _$_6a78[568] + _0xA8A3;
  }
  if (_0xA8D4 != _$_6a78[14]) {
    if (_0xA872 != _$_6a78[14]) {
      _0xA872 += _$_6a78[569] + _0xA8D4;
    } else {
      _0xA872 = _$_6a78[570] + _0xA8D4;
    }
  }
  if (_0xA872 != _$_6a78[14]) {
    _0xA872 += _$_6a78[571];
  }
  return _0xA872;
}
function renderMyText() {
  var _0xA18E = $(_$_6a78[130])[_$_6a78[129]]();
  var _0xB38C = /%%beginmytext([\n\r\s\S]*)%%endmytext/;
  var _0x6D4D = _0xA18E[_$_6a78[19]](_0xB38C);
  if (_0x6D4D != null) {
    var _0xA1BF = _0x6D4D[1][_$_6a78[167]](_$_6a78[123]);
    if (_0xA1BF != null && _0xA1BF[_$_6a78[22]] > 0) {
      for (var _0x6D1C = 0; _0x6D1C < _0xA1BF[_$_6a78[22]]; _0x6D1C++) {
        var _0x6B32 = _0xA1BF[_0x6D1C];
        if (_0x6B32[_$_6a78[96]](/\s/g, _$_6a78[14]) != _$_6a78[14]) {
          var _0x9333 = JSON[_$_6a78[366]](_0x6B32);
          console[_$_6a78[147]](_0x9333);
          var _0xB171 = $(_$_6a78[572] + _0x9333[_$_6a78[573]] + _$_6a78[411]);
          addText2Svg(
            (_0x9333[_$_6a78[331]] * 1.4) / scale,
            _0x9333[_$_6a78[457]],
            _0xB171,
            _0x9333[_$_6a78[67]]
          );
        }
      }
    }
  }
}
function clickBar(_0x7183, _0x9395) {
  if (typeof isGetBarInfo != _$_6a78[64]) {
    svgsel(_0x9395);
    return false;
  }
  if (graph_update) {
    $(_$_6a78[576])
      [_$_6a78[155]](_$_6a78[222], _$_6a78[227])
      [_$_6a78[575]](_$_6a78[574]);
    $(_$_6a78[577])[_$_6a78[286]]();
    $(_$_6a78[127])[_$_6a78[126]]();
    $(_$_6a78[412] + _0x7183 + _$_6a78[411])
      [_$_6a78[155]](_$_6a78[222], _$_6a78[578])
      [_$_6a78[169]](_$_6a78[574], _$_6a78[574]);
    $(_$_6a78[412] + _0x7183 + _$_6a78[411])[_$_6a78[408]](_$_6a78[407]);
    showProperties(_$_6a78[579], _0x9395);
    console[_$_6a78[147]](_0x7183);
    _0x9395[_$_6a78[204]]();
    _0x9395[_$_6a78[519]]();
    return false;
  }
}

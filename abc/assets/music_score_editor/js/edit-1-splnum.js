const updateLastSelect = () => {
  const istart = window.lastIstart
  if (istart) {
    $(`text[type*='HD'][istart='${istart}'],text[type^='r'][istart='${istart}']`).addClass('selected_text');
    if($(`text[type='note'][istart='${istart}']`).length)
    $(`text[type='note'][istart='${istart}']`)[0].classList.add('selected_text')
    window.lastIstart = null
  }
  const abcVal = $('#source').val()
  // @filter 过滤 P1
  if (abcVal.match('V:1 treble nm="P1"\n')) {
    $('#source').val(abcVal.replace('V:1 treble nm="P1"\n', ''))
    abc_change()
  }
  // @filter 修正简谱表情术语坐标
  $('[type="zs"]').css({
    transform: `translateY(${content_vue.m.scoreOpts.musicType === 'easy' ? '-5px' : '0'})`
  })
  console.log($('[type="zs"]'))
}

const asyncRect = () => {
  // const rectEl = $('[style="fill-opacity: 0.4;"]')
  // console.log(rectEl)
  // if (rectEl.length) {
  //   $('.selected_text').removeClass('selected_text')
  //   rectEl.addClass('selected_text')
  // }
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
// 创建预留
const previewScale = () => {
  // const scale = 556 / $('#target').height()
  const scale = ($(window).width()-10) / $('#target').width()
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
  //   cursor: `url(assets/music_score_editor/img/${!draw_editor ? 'black' : 'blue'}.png), auto`
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


/** 
 * 
 **/

window["onerror"] = function (_0x6B63, _0x6B94, _0x6B32) {
  if (_0x6B63 == "Uncaught EvalError: Possible side-effect in debug-evaluate") {
    return false;
  }
  if (typeof _0x6B63 == "string") {
    window["top"]["alert"](
      "window error: " + _0x6B63 + "\x0AURL: " + _0x6B94 + "\x0ALine: " + _0x6B32
    );
  } else {
    if (typeof _0x6B63 == "object") {
      window["top"]["alert"](
        "window error: " +
          _0x6B63["type"] +
          " " +
          _0x6B63["target"]["src"]
      );
    } else {
      window["top"]["alert"]("window error: " + _0x6B63);
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
  abc_fname = ["noname.abc", ""],
  abc,
  syms = [],
  srcend,
  elt_ref = {},
  selx = [0, 0],
  selx_sav = [],
  play = {},
  pop,
  texts = { bad_nb: "Bad line number", fn: "File name: ", load: "Please, load the included file " },
  jsdir = document["currentScript"]
    ? document["currentScript"]["src"]["match"](/.*\//)
    : (function () {
        var _0x6BC5 = document["getElementsByTagName"]("script");
        return (
          _0x6BC5[_0x6BC5["length"] - 1]["src"]["match"](/.*\//) ||
          ""
        );
      })();
var drawParam = { curNoteLineY: 0 };
var lastKeyMap = {},
  beamIns = null,
  drawIns = null;
if (typeof CheckBeamIns == "function") {
  beamIns = new CheckBeamIns();
}
if (typeof DrawUtil == "function") {
  drawIns = new DrawUtil();
}
var line0X = -1;
var line1X = -1;
var user = {
    read_file: function (_0x6BF6) {
      elt_ref["s" + srcidx]["style"]["display"] = "inline";
      return elt_ref["src1"]["value"];
    },
    errmsg: function (_0x6B63, _0x6C58, _0x6C27) {
      _0x6B63 = clean_txt(_0x6B63);
      if (_0x6C58) {
        elt_ref["diverr"]["innerHTML"] +=
          '<b onclick="gotoabc(' +
          _0x6C58 +
          "," +
          _0x6C27 +
          ')" style="cursor: pointer; display: inline-block">' +
          _0x6B63 +
          "</b><br/>\x0A";
      } else {
        elt_ref["diverr"]["innerHTML"] += _0x6B63 + "<br/>\x0A";
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
      if (["beam", "slur", "tuplet"]["indexOf"](_0x6E73) >= 0) {
        return;
      }
      if (!_0x6D7E["clef_auto"]) {
        syms[_0x6DAF] = _0x6D7E;
      }
      srcend[_0x6DAF] = _0x6DE0;
      if (this["singleRect"] && user["syncRect"] == "single") {
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
      var _0x6CBA = " ondblclick = 'editorAnnot(" + _0x6DAF + ")'";
      if (_0x6E73 == "bar" || _0x6E73 == "splnum_bar") {
        _0x6CBA = " onclick='clickBar(" + _0x6DAF + ",event)'";
      }
      if (
        2 != musicType ||
        (0 != musicType && _0x6E73 == "tempo") ||
        _0x6E73 == "lyrics"
      ) {
        if (_0x6D7E["xin"]) {
          _0x6F06 += _0x6D7E["xin"];
        }
        abc["out_svg"](
          "<rect " +
            _0x6CBA +
            ' type="' +
            _0x6E73 +
            '" v="' +
            _0x6D7E["v"] +
            '" istart="' +
            _0x6DAF +
            '" class="abcr _' +
            _0x6DAF +
            '_" x="'
        );
        if (0 != musicType && _0x6E73 == "tempo") {
          _0x6F06 = abc["sh"](tempoMgL + 10 + _0x6ED5);
          abc["out_sxsy"](
            _0x6F06,
            '" y="',
            _0x6F37 + (typeof tempoMgB == "undefined" ? 0 : tempoMgB)
          );
        } else {
          abc["out_sxsy"](_0x6F06, '" y="', _0x6F37);
        }
        if (_0x6D7E["a_gch"]) {
          for (
            var _0x6D1C = 0;
            _0x6D1C < _0x6D7E["a_gch"]["length"];
            _0x6D1C++
          ) {
            var _0x6E42 = _0x6D7E["a_gch"][_0x6D1C]["text"];
            var _0x6EA4 = /url\((.*)\)/;
            if (_0x6EA4["test"](_0x6E42)) {
              var _0x6D4D = _0x6E42["match"](_0x6EA4);
              if (_0x6D4D != null) {
                var _0x6B94 = _0x6D4D[1];
                abc["out_svg"]('" onclick="window.open(\'' + _0x6B94 + "')");
                abc["out_svg"]('" style="cursor: pointer;');
              }
            }
          }
        }
        if (_0x6E73 == "tempo") {
          if (Q_url != "") {
            abc["out_svg"]('" onclick="window.open(\'' + Q_url + "')");
            abc["out_svg"]('" style="cursor: pointer;');
            Q_url = "";
          }
        }
        if (_0x6E73 == "meter") {
          if (M_url != "") {
            abc["out_svg"]('" onclick="window.open(\'' + M_url + "')");
            abc["out_svg"]('" style="cursor: pointer;');
            M_url = "";
          }
        }
        if (_0x6E73 == "clef") {
          if (_0x6D7E["clef_type"] == "t") {
            if (treble_url != "") {
              abc["out_svg"]('" onclick="window.open(\'' + treble_url + "')");
              abc["out_svg"]('" style="cursor: pointer;');
              treble_url = "";
            }
          } else {
            if (_0x6D7E["clef_type"] == "b") {
              if (bass_url != "") {
                abc["out_svg"]('" onclick="window.open(\'' + bass_url + "')");
                abc["out_svg"]('" style="cursor: pointer;');
                bass_url = "";
              }
            } else {
              if (_0x6D7E["clef_type"] == "c") {
                if (_0x6D7E["clef_small"]) {
                  if (tenor_url != "") {
                    abc["out_svg"]('" onclick="window.open(\'' + tenor_url + "')");
                    abc["out_svg"]('" style="cursor: pointer;');
                    tenor_url = "";
                  }
                } else {
                  if (alto_url != "") {
                    abc["out_svg"]('" onclick="window.open(\'' + alto_url + "')");
                    abc["out_svg"]('" style="cursor: pointer;');
                    alto_url = "";
                  }
                }
              }
            }
          }
        }
        abc["out_svg"](
          '" width="' +
            _0x6ED5["toFixed"](2) +
            '" height="' +
            abc["sh"](_0x6CEB)["toFixed"](2) +
            '"/>\x0A'
        );
      }
      if (this["showSplNumber"]) {
        this["showSplNumber"]["apply"](this, arguments);
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
    syncRect: "",
    singleRect: null,
    isOnlyNoteLight: false,
    oneBeatTime: 0,
    horizontal: {
      open: false,
      lastOffsetLeft: 0,
      scrollClass: ".nobrk",
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
    mode: "editor",
    smallVersion: false,
    lastEditLyricIstart: -1,
    showLyricEditor: false,
    numStaffCanDrag: false,
    numStaffiIndent: -10,
    defaultMusicType: 0,
    srcChangeCount: 0,
    copyNoteInfo: { dur: 0, s: null, copyNoteStr: "" },
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
      _0x917A["setItem"](_0x828C, _0x9E1C);
    } else {
      if (_0x9E1C === 0) {
        _0x917A["removeItem"](_0x828C);
      } else {
        return _0x917A["getItem"](_0x828C);
      }
    }
  } catch (e) {}
}
function clean_txt(_0x9364) {
  return _0x9364["replace"](/<|>|&.*?;|&/g, function (_0x6C27) {
    switch (_0x6C27) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
    }
    return _0x6C27;
  });
}
function loadlang(_0xB5D8, _0xB609) {
  abc2svg["loadjs"]("edit-" + _0xB5D8 + ".js", function () {
    loadtxt();
  });
  abc2svg["loadjs"]("err-" + _0xB5D8 + ".js");
  if (!_0xB609) {
    storage(true, "lang", _0xB5D8 == "en" ? 0 : _0xB5D8);
  }
}
function popshow(_0xC0C1, _0xC0F2) {
  var _0x9395 = document["getElementById"](_0xC0C1);
  if (pop) {
    if (pop == _0x9395) {
      _0xC0F2 = false;
    } else {
      pop["style"]["visibility"] = "hidden";
    }
  }
  _0x9395["style"]["visibility"] = _0xC0F2 ? "visible" : "hidden";
  pop = _0xC0F2 ? _0x9395 : null;
}
function loadtune() {
  var _0xB63A = document["getElementById"]("abcfile")["files"];
  if (_0xB63A && _0xB63A["length"]) {
    abc_fname[srcidx] = _0xB63A[0]["name"];
    var _0x9BD0 = new FileReader();
    _0x9BD0["onloadend"] = function (_0x93C6) {
      var _0x6D1C,
        _0x77A3,
        _0xB66B,
        _0xA18E = _0x93C6["target"]["result"],
        _0x6D7E = srcidx == 0 ? "source" : "src1";
      if (_0xA18E["indexOf"]("%%linebreak") < 0) {
        _0xA18E = addLineBreak(_0xA18E);
      }
      elt_ref[_0x6D7E]["value"] = _0xA18E;
      elt_ref["s" + srcidx]["value"] = abc_fname[srcidx];
      src_change();
    };
    _0x9BD0["readAsText"](_0xB63A[0], "UTF-8");
  }
}
function selsrc(_0xB481) {
  if (_0xB481 == srcidx) {
    return;
  }
  var _0xC7D6 = srcidx ? "src" + srcidx : "source",
    _0x736D = _0xB481 ? "src" + _0xB481 : "source";
  elt_ref[_0xC7D6]["style"]["display"] = "none";
  elt_ref[_0x736D]["style"]["display"] = "inline";
  elt_ref["s" + srcidx]["style"]["backgroundColor"] = "#ffd0d0";
  elt_ref["s" + _0xB481]["style"]["backgroundColor"] = "#80ff80";
  srcidx = _0xB481;
}
function render(_0xC154) {
  var _0x6D1C,
    _0x77A3,
    _0xA18E = document["getElementById"]("source")["value"];
  play["a_pe"] = null;
  if (!_0xA18E) {
    _0xA18E = document["getElementById"]("source")["value"];
    elt_ref["source"]["value"] = _0xA18E;
  }
  if (!_0xA18E) {
    return;
  }
  _0x6D1C = _0xA18E["indexOf"]("%%abc-include ");
  if (_0x6D1C >= 0) {
    var _0xB66B = elt_ref["s1"];
    if (!_0xB66B["value"]) {
      _0xB66B["style"]["display"] = "inline";
      _0x77A3 = _0xA18E["indexOf"]("\x0A", _0x6D1C);
      _0xB66B["value"] = _0xA18E["slice"](_0x6D1C + 14, _0x77A3);
      selsrc(1);
      window["top"]["alert"](
        texts["load"] + _0xB66B["value"]
      );
      return;
    }
  }
  elt_ref["diverr"]["innerHTML"] = "";
  _0xA18E = null;
  render2(_0xC154);
}
var tmpstr = "";
var renderTimeout = -1;
function render2(_0xC154) {
  $("#nodeMenu")["hide"]();
  var _0xC218 = new Date()["getTime"]();
  var _0xA18E = $("#source")["val"]();
  if (
    !abc2svg["modules"]["load"](
      _0xA18E + elt_ref["src1"]["value"],
      render2
    )
  ) {
    _0xA18E = null;
    return;
  }
  hasTempo = false;
  lastMeter = "";
  lastTone = "";
  lastKeyMap = {};
  sameLineDim = {};
  user["img_out"] = user["my_img_out"];
  user["get_abcmodel"] = null;
  if (typeof showSplNumber == "function") {
    user["showSplNumber"] = showSplNumber;
  }
  if (typeof singleRect == "function") {
    user["singleRect"] = singleRect2;
  }
  abc = new abc2svg["Abc"](user);
  abc_images = "";
  abc["tosvg"]("edit", "%%bgcolor #F5F5F5");
  srcend = [];
  syms = [];
  try {
    abc["tosvg"](abc_fname[0], _0xA18E);
  } catch (e) {
    window["top"]["alert"](
      e["message"] + "\x0Aabc2svg tosvg bug - stack:\x0A" + e["stack"]
    );
    return;
  }
  abc2svg["abc_end"]();
  try {
    var _0xC1B6 = new Array();
    var _0xC249 = new Date()["getTime"]();
    if (user["render"]) {
      if (editSvgLineIndex != -1) {
        $("#target")["html"](abc_images);
      } else {
        $("#target")["html"](abc_images);
      }
    }
    clearTimeout(renderTimeout);
    renderSuccess();
    if (_0xC154) {
      _0xC154();
    }
    barVoiceNumArr = [];
    abc_images = null;
    var _0xC1E7 = new Date()["getTime"]();
    console["log"]("\u89e3\u6790\u65f6\u957f\uff1a", _0xC1E7 - _0xC218);
    var _0xC185 = new Date()["getTime"]();
    console["log"]("\u6e32\u67d3\u65f6\u957f\uff1a", _0xC185 - _0xC249);

    _init();
    selectNewNote();
    setLyricStyle();
    changeSign()
    changeSelectNoteStyle();
    updateLastSelect()
    asyncRect()
    changeLineBars()

    if (user["abcLoadCball"]) {
      user["abcLoadCball"]();
    }
    if (user["horizontal"]["open"]) {
      $(user["horizontal"]["scrollClass"])["css"]({
        width: "100%",
        overflow: "auto",
        "box-sizing": "border-box",
      });
    }
  } catch (e) {
    console.error('error:', e);
    // window["top"]["alert"](e["message"] + "\x0Aabc2svg image bug - abort");
    return;
  }
  document["getElementById"]("er")["style"]["display"] = elt_ref[
    "diverr"
  ]["innerHTML"]
    ? "inline"
    : "none";
  reselect();
  if (_0xA18E["indexOf"]("hidefirstmeter") > -1) {
    for (var _0x6D1C = 0; _0x6D1C < 16; _0x6D1C++) {
      $(".staff_meter" + _0x6D1C)
        ["first"]()
        ["hide"]();
    }
    $(".spl_meter")["first"]()["hide"]();
    $(".spl_meter_mode")["first"]()["hide"]();
  }
  _0xA18E = null;
  // 修改速度焦点位置
  if(typeof $ != 'undefined'){
      setTimeout(()=>{
          console.log('writempo reset rect');
          $('svg.music text[type="tempo"]').each(function(){
              var tempo_t = $(this);
              var tempo_e = $('svg.music rect[type="tempo"][istart="'+$(this).eq(0).attr('istart')+'"]');
              // console.log('writempo reset', tempo_e, tempo_t);
              if(tempo_e.length && tempo_t.length){
                  var tempo_e_x = parseFloat(tempo_t.eq(0).attr('x'));
                  var tempo_e_y = parseFloat(tempo_t.eq(0).attr('y'));
                  tempo_e.eq(0).attr('x', tempo_e_x);
                  tempo_e.eq(0).attr('y', tempo_e_y-15);
              }
          });
      }, 500);
  }
}
function gotoabc(_0x6C58, _0x6C27) {
  var _0x6D7E = elt_ref["source"],
    _0xB481 = 0;
  selsrc(0);
  while (--_0x6C58 >= 0) {
    _0xB481 = _0x6D7E["value"]["indexOf"]("\x0A", _0xB481) + 1;
    if (_0xB481 <= 0) {
      window["top"]["alert"](texts["bad_nb"]);
      _0xB481 = _0x6D7E["value"]["length"] - 1;
      _0x6C27 = 0;
      break;
    }
  }
  _0x6C27 = Number(_0x6C27) + _0xB481;
  _0x6D7E["focus"]();
  _0x6D7E["setSelectionRange"](_0x6C27, srcend[_0x6C27] || _0x6C27 + 1);
}
function findLineNumByIndex(_0xA18E, _0x70F0) {
  var _0xA1BF = _0xA18E["split"]("\x0A");
  var _0xA15D = 0;
  for (var _0x6D1C = 0; _0x6D1C < _0xA1BF["length"]; _0x6D1C++) {
    _0xA15D += _0xA1BF[_0x6D1C]["length"] + 1;
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
    for (var _0x6D1C = 0; _0x6D1C < _0xB01A["length"]; _0x6D1C++) {
      var _0xAFE9 = _0xB01A[_0x6D1C];
      if (_0xAFE9[0] == _0xB04B) {
        return _0xAFE9[1];
      }
    }
  }
  return 0;
}
function svgMouseDown(_0x93C6) {
  if (user["clickAddText"]) {
    console["log"](_0x93C6["target"]);
    if ($(_0x93C6["target"])["attr"]("type") == "mytext") {
      return false;
    }
    addEditorText(_0x93C6);
    return false;
  }
  if (
    $(_0x93C6["target"])["attr"]("type") == "bar" ||
    $(_0x93C6["target"])["attr"]("type") == "splnum_bar"
  ) {
    return;
  }
  if($(_0x93C6["target"])["attr"]("type")=='zs'){
    $('.selected_text').removeClass('selected_text');
    $('._select-note').removeClass('_select-note');
    if($(_0x93C6["target"]).length && $(_0x93C6["target"]).attr('ondblclick')){
      // $(_0x93C6["target"]).dbclick();
      $(_0x93C6["target"]).trigger('dbclick');
      return;
    }
  }
  console["log"]("-----svgMouseDown");

  if (graph_update) {
    graphMouseDownHandle(_0x93C6);

    // 选择音符回显
    if ($(".selected_text").length > 0){
      var selectNote =   $(".selected_text")[0];
      var sel_content ='';
      if (selectNote) {
        var cen = syms[$(selectNote).attr("istart")];
        console.log('sym', cen);
        var content = $("#source").val();
        sel_content = content.substring(cen["istart"], cen["iend"]);
        console.log('sel_content', sel_content);
      }
      // 选择休止符回显
      if(sel_content.match(/z/)){
        switch(calNodeLen_PT(sel_content)){
          case 8:
          // 全分音符
          $('.operator_sc.jp_note[value="1/1"]').click();
          break;
          case 4:
          // 2分音符
          $('.operator_sc.jp_note[value="1/2"]').click();
          break;
          case 2:
          // 4分音符
          $('.operator_sc.jp_note[value="1/4"]').click();
          break;
          case 1:
          // 8分音符
          $('.operator_sc.jp_note[value="1/8"]').click();
          break;
          case 0.5:
          // 16分音符
          $('.operator_sc.jp_note[value="1/16"]').click();
          break;
          case 0.25:
          // 32分音符
          $('.operator_sc.jp_note[value="1/32"]').click();
          break;
          case 0.125:
          // 64分音符
          $('.operator_sc.jp_note[value="1/64"]').click();
          break;
          case 0.125:
          // 64分音符
          $('.operator_sc.jp_note[value="1/64"]').click();
          break;
        }
      }
    }

    if ($(".selected_text")["length"] > 0 || $(".selected_path")["length"] > 0) {
      console.log('点中音符')
      console.log('停止播放')
      mystop(); // 停止播放
      if (musicType == 2) {
        var _0x8786 = getSelectText("source");
        if (_0x8786 == "") {
          var _0xCA53 = $(".selected_text[type='note']");
          if (_0xCA53["length"] > 0) {
            var _0xAC46 = $(_0xCA53)["attr"]("istart");
            var _0x6D7E = syms[_0xAC46];
            if (_0x6D7E) {
              var _0xA18E = $("#source")["val"]();
              _0x8786 = _0xA18E["substring"](
                _0x6D7E["istart"],
                _0x6D7E["iend"]
              );
            }
          }
        }
        if (_0x8786 != "") {
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
  if (musicType == "2") {
    var _0x8786 = getSelectText("source");
    if (_0x8786 != "" && dragNumNoteFlag) {
      try {
        numStaffDrag(_0x93C6);
      } catch (e) {
        console["log"](e);
      }
    }
    return;
  }
}
function svgMouseUp(_0x93C6) {
  console["log"]("-----svgMouseUp");

  setSelectBarStyle();

  if (graph_update) {
    graphMouseUpHandle(_0x93C6);
    return;
  }
}
function svgsel(_0x93C6) {
  typeof user["svgClickCball"] == "function" && user["svgClickCball"](_0x93C6);
  if (graph_update) {
    return;
  }
  if (draw_editor) {
    return;
  }
  if (user["showNoteInfo"]) {
    var _0xB171 = _0x93C6["target"];
    if (_0xB171["tagName"]["toLowerCase"]() == "rect") {
      _0xB171 = $(_0xB171)["parents"]("svg");
    }
    var _0x6E73 = findNearElement(
      _0xB171,
      _0x93C6["offsetX"] / scale,
      _0x93C6["offsetY"] / scale
    );
    console["log"]("type:", _0x6E73);
    if (typeof user["showNoteInfoCallback"] == "function") {
      user["showNoteInfoCallback"](_0x6E73);
    }
    return;
  }
  if (typeof user["getNote"] == "function") {
    user["getNote"](_0x93C6);
  }
  if (user["svgselBan"]) {
    return false;
  }
  var _0x9DBA = _0x93C6["target"],
    _0x9D58 = _0x9DBA["getAttribute"]("class"),
    _0x9D89 = document["getElementById"]("ctxMenu");
  if (
    !user["isCtrl"] &&
    Number(getAbcistart(_0x9D58)) != selx[0] &&
    (user["isEmptyClean"] ||
      (_0x9D58 && _0x9D58["substr"](0, 4) == "abcr"))
  ) {
    clearOldSelect();
  }
  svg_selected = true;
  if (user["changePianoBoard"]) {
    setTimeout(function () {
      changePianoBoard("source", getKByPos("source"));
    }, 500);
  }
  if (user["findPosition"]) {
    findPosition(_0x93C6, _0x9DBA);
  }
  play["loop"] = false;
  _0x93C6["stopImmediatePropagation"]();
  _0x93C6["preventDefault"]();
  if (_0x9D89 && _0x9D89["style"]["display"] == "block") {
    _0x9D89["style"]["display"] = "none";
    return false;
  }
  if (play["playing"] && !play["stop"]) {
    play["stop"] = -1;
    play["abcplay"]["stop"]();
    return false;
  }
  select_position = -1;
  if (_0x9D58 && _0x9D58["substr"](0, 4) == "abcr") {
    setsel(0, Number(getAbcistart(_0x9D58)));
    select_position = Number(getAbcistart(_0x9D58));
    laststop = select_position;
    play["stop"] = 0;
    var _0xCA84 = document["getElementById"]("source");
    var _0x6B32 = findLineNumByIndex(
      $("#source")["val"](),
      Number(getAbcistart(_0x9D58))
    );
    _0xCA84["scrollTop"] =
      (_0x6B32 * _0xCA84["scrollHeight"]) /
        $("#source")["val"]()["split"]("\x0A")[
          "length"
        ] -
      10;
  } else {
    setsel(0, 0);
  }
  if (user["noteClick"]) {
    user["noteClick"](select_position);
  }
  setsel(1, 0);
  try {
    if (user["lightoperator"]) {
      lightoperator();
    }
    getSelectNotePosition("source");
    var _0xC433 = getSelectText("source");
    var _0xCAB5 = /V:\s*1/;
    var _0xCAE6 = /V:\s*2/;
    if (_0xCAB5["test"](_0xC433)) {
      currInputVoice = 1;
    } else {
      if (_0xCAE6["test"](_0xC433)) {
        currInputVoice = 2;
      }
    }
  } catch (e) {
    console["log"](e);
  }
  if (
    !$(_0x93C6["target"])["find"](".menu-box")["length"] > 0 &&
    typeof content_vue != "undefined"
  ) {
    content_vue["menuActive"] = "";
  }
}
function setsel(_0xB481, _0x9E1C, seltxt) {
  if (!user["isCtrl"]) {
    firstv = _0x9E1C;
  }
  var _0x6D1C,
    _0xB855,
    _0x6D7E,
    _0xC8CB = selx[_0xB481];
  if (_0x9E1C == _0xC8CB) {
    if (user["setselCball"] && _0x9E1C > 0) {
      _0x6D7E = elt_ref["source"];
      user["setselCball"](_0x6D7E, _0x9E1C, true);
    }
    if (user["isSelect2play"]) {
      return;
    }
  }
  if (_0xC8CB) {
  }
  if (_0x9E1C) {
    _0xB855 = document["getElementsByClassName"]("_" + _0x9E1C + "_");
    if (_0xB855[0] && _0xB855[0]["style"]) {
      _0xB855[0]["style"]["fillOpacity"] = 0.4;
    }
  }
  selx[_0xB481] = _0x9E1C;
  if (_0xB481 != 0 || seltxt || !_0x9E1C) {
    return;
  }
  _0x6D7E = elt_ref["source"];
  selsrc(0);
  if (firstv < srcend[_0x9E1C]) {
    _0x6D7E["setSelectionRange"](firstv, srcend[_0x9E1C]);
  } else {
    _0x6D7E["setSelectionRange"](_0x9E1C, srcend[firstv]);
  }
  _0x6D7E["blur"]();
  _0x6D7E["focus"]();
  if (user["setselCball"] && _0x9E1C > 0) {
    user["setselCball"](_0x6D7E, _0x9E1C);
  }
}
function setselAll(_0x7183, _0xC8FC) {
  $("rect")["css"]("fill-opacity", "0.4");
  return;
  console["log"](
    "idx:",
    idx,
    "  v:",
    v,
    "seltxt:",
    seltxt
  );
  if (!user["isCtrl"]) {
    firstv = v;
  }
  var _0x6D1C,
    _0xB855,
    _0x6D7E,
    _0xC8CB = selx[idx];
  if (v == _0xC8CB) {
    if (user["setselCball"] && v > 0) {
      _0x6D7E = elt_ref["source"];
      user["setselCball"](_0x6D7E, v, true);
    }
    if (user["isSelect2play"]) {
      return;
    }
  }
  if (_0xC8CB) {
  }
  if (v) {
    _0xB855 = document["getElementsByClassName"]("_" + v + "_");
    _0x6D1C = _0xB855["length"];
    while (--_0x6D1C >= 0) {
      _0xB855[_0x6D1C]["style"]["fillOpacity"] = 0.4;
    }
  }
  selx[idx] = v;
  if (idx != 0 || seltxt || !v) {
    return;
  }
  _0x6D7E = elt_ref["source"];
  selsrc(0);
  if (firstv < srcend[v]) {
    _0x6D7E["setSelectionRange"](firstv, srcend[v]);
  } else {
    _0x6D7E["setSelectionRange"](v, srcend[firstv]);
  }
  _0x6D7E["blur"]();
  _0x6D7E["focus"]();
  if (user["setselCball"] && v > 0) {
    user["setselCball"](_0x6D7E, v);
  }
}
function clearOldSelect() {
  $(".abcr")["css"]("fill-opacity", "0");
}
function reselect(_0x93C6) {
  var _0xC433 = getSelectText("source");
  if (_0xC433 != "") {
    seltxt();
  }
}
function seltxt(_0x93C6) {
  if (svg_selected) {
    svg_selected = false;
    return;
  }
  if (!user["isCtrl"] && user["isEmptyClean"]) {
    clearOldSelect();
  }
  var _0x6D7E,
    _0xB855,
    _0x9395 = 0,
    _0x9DBA = elt_ref["source"],
    _0x6DAF = _0x9DBA["selectionStart"],
    _0xB0DE = _0x9DBA["selectionEnd"];
  if (_0x6DAF == _0xB0DE) {
    return;
  }
  play["loop"] = false;
  if (srcend) {
    srcend["forEach"](function (_0xC807, _0xC838) {
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
  if (user["isSelect2play"]) {
    if (selx[0] != _0x6D7E) {
      setsel(0, _0x6D7E, true);
    }
    if (selx[1] != _0x9395) {
      setsel(1, _0x9395);
    }
  } else {
    if (
      _0x6D7E == getFirstSyms()["istart"] &&
      _0x9395 == syms["length"] - 1
    ) {
      setselAll(_0x6D7E, _0x9395);
    } else {
      setsel(1, _0x6D7E);
      for (var _0x6D1C = _0x6D7E; _0x6D1C <= _0x9395; _0x6D1C++) {
        setsel(1, _0x6D1C);
      }
    }
  }
  _0xB855 = document["getElementsByClassName"]("_" + _0x6D7E + "_");
  if (_0xB855[0] && user["isScrollIntoView"]) {
    _0xB855[0]["scrollIntoView"]();
  }
}
function getFirstSyms() {
  for (
    var _0x6D1C = 0, _0x7805 = syms["length"];
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
  var _0xC712 = document["title"]["replace"]("\u7cfb\u7edf", "");
  var _0x6D7E = srcidx == 0 ? "source" : "src1",
    _0xB3EE = elt_ref[_0x6D7E]["value"],
    _0xC774 = "data:text/plain;charset=utf-8," + encodeURIComponent(_0xB3EE),
    _0xC6E1 = document["createElement"]("a");
  var _0xC743 = new RegExp("T:.*(?=\\n)");
  var _0x82BD = _0xC743["exec"](_0xB3EE);
  if (_0x82BD) {
    _0xC712 +=
      "_" +
      _0x82BD[0]["replace"]("T:", "")["trim"]();
  }
  _0xC712 += ".xzds";
  elt_ref["s" + srcidx]["value"] =
    _0xC6E1["download"] =
    abc_fname[srcidx] =
      _0xC712;
  _0xC6E1["innerHTML"] = "Hidden Link";
  _0xC6E1["href"] = _0xC774;
  _0xC6E1["target"] = "_blank";
  _0xC6E1["onclick"] = destroyClickedElement;
  _0xC6E1["style"]["display"] = "none";
  document["body"]["appendChild"](_0xC6E1);
  _0xC6E1["click"]();
}
function destroyClickedElement(_0x93C6) {
  document["body"]["removeChild"](_0x93C6["target"]);
}
function setfont() {
  var _0x9E7E = document["getElementById"]("fontsize")["value"][
    "toString"
  ]();
  elt_ref["source"]["style"]["fontSize"] = elt_ref["src1"][
    "style"
  ]["fontSize"] = _0x9E7E + "px";
  storage(true, "fontsz", _0x9E7E == "14" ? 0 : _0x9E7E);
}
function set_sfu(_0x9E1C) {
  play["abcplay"]["set_sfu"](_0x9E1C);
  storage(true, "sfu", _0x9E1C == "Scc1t2" ? 0 : _0x9E1C);
}
function set_speed(_0xC869) {
  var _0xC89A = document["getElementById"]("spvl"),
    _0x9E1C = Math["pow"](3, (_0xC869 - 10) * 0.1);
  play["abcplay"]["set_speed"](_0x9E1C);
  _0xC89A["innerHTML"] = _0x9E1C;
}
function set_vol(_0x9E1C) {
  play["abcplay"]["set_vol"](_0x9E1C);
  storage(true, "volume", _0x9E1C == 0.7 ? 0 : _0x9E1C["toFixed"](2));
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
    for (var _0x6D1C = 0; _0x6D1C < pageSeq["length"]; _0x6D1C++) {
      pageSeq[_0x6D1C]["pass"] = false;
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
  if (!pobj["abcStartTime"]) {
    pobj["abcStartTime"] = new Date()["getTime"]();
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
  if (_0xB9AC && user["syncRect"] == "single") {
    $(_0xBAD2)["find"]("rect[acttime]")["css"]("fillOpacity", 0);
  }
  if (user["showsc"] && sc) {
  }
  if (
    _0xB9AC &&
    _0x75EA &&
    _0x75EA["hasOwnProperty"]("my_line") &&
    (_0x75EA["type"] == 10 || _0x75EA["type"] == 8) &&
    typeof pageSeq != "undefined" &&
    user["pageSet"]["isLeftRight"]
  ) {
    if (lastLightLine != _0x75EA["my_line"]) {
      lastLightLine = _0x75EA["my_line"];
      var _0xB919 = user["pageSet"]["isLeftRight"];
      for (
        var _0x828C = 0, _0x7805 = pageSeq["length"];
        _0x828C < _0x7805;
        _0x828C++
      ) {
        var _0xBA0E = pageSeq[_0x828C];
        if (_0x828C == 0) {
          isPageLeft = true;
        } else {
          if (_0xBA0E["pn"] != pageSeq[_0x828C - 1]["pn"]) {
            isPageLeft = !isPageLeft;
          }
        }
        if (
          _0xBA0E["line"] == _0x75EA["my_line"] &&
          _0xBA0E["pass"] == false
        ) {
          _0xBA0E["pass"] = true;
          if (currPage == _0xBA0E["pn"]) {
            break;
          }
          $(".pagediv")["css"]({
            opacity: "0",
            position: "absolute",
          });
          var $currPage = $("#page" + _0xBA0E["pn"]);
          $currPage["css"](
            "display",
            _0xB919 ? "inline-block" : "block"
          );
          if (_0xB919) {
            $("#target")["css"]("position", "relative");
            $currPage["css"]({
              position: "absolute",
              top: 0,
              left: isPageLeft ? 0 : "50%",
              opacity: 1,
              transition: "opacity 1s",
            });
          }
          currPage = _0xBA0E["pn"];
          nextPage = null;
          if (_0xB919) {
            for (
              var _0x6C58 = _0x828C + 1, _0x7805 = pageSeq["length"];
              _0x6C58 < _0x7805;
              _0x6C58++
            ) {
              if (pageSeq[_0x6C58]["pn"] != currPage) {
                nextPage = pageSeq[_0x6C58]["pn"];
                break;
              }
            }
          } else {
            nextPage =
              pageSeq[_0x828C + 1] && pageSeq[_0x828C + 1]["pn"];
          }
          if (nextPage) {
            var $nextPage = $("#page" + nextPage);
            $nextPage["css"](
              "display",
              _0xB919 ? "inline-block" : "block"
            );
            if (_0xB919) {
              $nextPage["css"]({
                position: "absolute",
                top: 0,
                left: !isPageLeft ? 0 : "50%",
                opacity: 1,
                transition: "opacity 1s",
              });
            }
            console["log"](_0xBA0E, $nextPage);
            break;
          } else {
            $("#page" + pageSeq[_0x828C - 1]["pn"])["css"]({
              position: "absolute",
              top: 0,
              left: !isPageLeft ? 0 : "50%",
              opacity: 1,
              transition: "opacity 1s",
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
  if (user["showInstrLoading"]) {
    $(".loading,.loading-box")["remove"]();
  }
  if (user["errorcheck"] && user["errorcheckStartTime"] == -1 && _0xB9AC) {
    user["errorcheckStartTime"] = new Date()["getTime"]();
  }
  laststop = _0xB9DD;
  laststopPt = _0xBAA1;
  if (play["stop"]) {
    if (_0xB9AC) {
      if (play["stop"] < 0) {
        play["stop"] = _0xB9DD;
        play["pt"] = _0xBAA1;
      }
      return;
    }
    if (_0x6D1C == selx[1]) {
      return;
    }
  }
  if (cnt == 0) {
    timeEnd = new Date()["getTime"]();
  }
  if (_0xB9AC && user["syncRect"] == "single") {
    if (cnt > 0) {
      currTime = new Date()["getTime"]();
    }
  }
  if (user["syncRect"] == "single") {
  }
  cnt++;
  var _0xB855, _0xB7C2;
  if (user["syncRect"]) {
    if (/^\d+/["test"](_0x6D1C)) {
      _0xB855 = document["getElementsByClassName"](_0x6D1C);
    } else {
      if (_0x6D1C != -1) {
        if (_0xBAD2 !== undefined) {
          _0xB855 = $(_0xBAD2)["find"]("." + _0x6D1C);
        } else {
          _0xB855 = document["querySelectorAll"]("." + _0x6D1C);
        }
      } else {
        _0xB855 = new Array();
      }
    }
  } else {
    if (_0xBAD2 !== undefined) {
      _0xB855 = $(_0xBAD2)["find"]("._" + _0x6D1C + "_");
    } else {
      _0xB855 = document["getElementsByClassName"]("_" + _0x6D1C + "_");
    }
  }
  var _0xB886 = _0xB855["length"];
  if (
    (animation && !user["isOnlyNoteLight"]) ||
    (user["syncRect"] == "single" && currTime - timeEnd > 100)
  ) {
    if (_0xB886 > 0) {
      if (musicType == 1 || musicType == 2) {
        for (var _0x6F06 = 0; _0x6F06 < _0xB855["length"]; _0x6F06++) {
          _0xB7C2 = _0xB855[_0x6F06];
          if (!play["stop"]) {
            if (_0xB7C2["tagName"] === "rect") {
              if (_0xB9AC) {
                if (!_0xB8B7) {
                  _0xB7C2["style"]["fillOpacity"] = 0.4;
                }
              } else {
                _0xB7C2["style"]["fillOpacity"] = 0;
              }
            }
          }
          if (_0xB9AC) {
            _0xB7C2["classList"]["add"]("note-light");
          } else {
            _0xB7C2["classList"]["remove"]("note-light");
          }
        }
      } else {
        _0xB7C2 = _0xB855[0];
        if (!play["stop"]) {
          if (_0xB7C2["tagName"] === "rect") {
            if (_0xB9AC) {
              if (!_0xB8B7) {
                _0xB7C2["style"]["fillOpacity"] = 0.4;
              }
            } else {
              _0xB7C2["style"]["fillOpacity"] = 0;
            }
          }
        }
        if (_0xB9AC) {
          _0xB7C2["classList"]["add"]("note-light");
        } else {
          _0xB7C2["classList"]["remove"]("note-light");
        }
      }
    }
  }
  timeEnd = currTime;
  if (
    user["isScrollIntoView"] &&
    !user["pageSet"]["isLeftRight"] &&
    _0xB9AC &&
    _0xB886 > 0
  ) {
    _0xB7C2 = _0xB855[0];
    var _0xB8B7 = {
      behavior: "auto",
      block: "start",
      inline: "nearest",
    };
    var _0xB94A = user["prevJump"]["isOpen"] ? false : true;
    if (
      user["loopJump"]["isOpen"] &&
      user["loopJump"]["time"] > 0 &&
      user["loopJump"]["jump"] &&
      user["loopJump"]["jump"]["length"] > 0
    ) {
      if (
        (_0xBAA1 >= user["loopJump"]["jump"][0]["jumpTime"] &&
          _0xBAA1 - user["loopJump"]["jump"][0]["jumpTime"] < 4) ||
        _0xB9DD == user["loopJump"]["jump"][0]["jumpSeq"]
      ) {
        var _0xBBC7 = document["getElementsByClassName"](
          "_" +
            user["loopJump"]["jump"][0]["jumpToSeq"] +
            "_"
        );
        if (_0xBBC7["length"] > 0) {
          _0xB7C2 = _0xBBC7[0];
          user["loopJump"]["jump"][0]["isJump"] = true;
          _0xB94A = true;
        }
      }
      if (
        (user["loopJump"]["jump"][0]["isJump"] &&
          _0xB9DD == user["loopJump"]["jump"][0]["jumpToSeq"]) ||
        _0xBAA1 - user["loopJump"]["jump"][0]["jumpTime"] > 4
      ) {
        user["loopJump"]["jump"]["splice"](0, 1);
        if (user["errorcheck"]) {
          $("svg text")["removeClass"]("errcheck-#0E518F errcheck-yellow errcheck-green");
        }
      }
    }
    var _0xBB34 = _0xB7C2["parentNode"];
    if (
      _0xBB34["parentNode"] &&
      _0xBB34["tagName"]["toUpperCase"]() == "G"
    ) {
      _0xBB34 = _0xBB34["parentNode"];
    }
    if (
      _0xBB34["parentNode"] &&
      _0xBB34["tagName"]["toUpperCase"]() != "SVG"
    ) {
      _0xBB34 = _0xBB34["parentNode"];
    }
    if (
      user["prevJump"]["isOpen"] &&
      user["prevJump"]["jump"][_0xB9DD]
    ) {
      _0xB94A = true;
      _0xBB34 = _0xBB34["nextElementSibling"];
      _0xB8B7["behavior"] = "smooth";
      _0xB8B7["block"] = "center";
    }
    if (
      user["prevJump"]["isOpen"] &&
      user["prevJump"]["lastSvgNode"] != _0xBB34
    ) {
      if (
        user["prevJump"]["lastSvgNode"] &&
        user["prevJump"]["lastSvgNode"]["nextElementSibling"] != _0xBB34
      ) {
        _0xB8B7["behavior"] = "auto";
      }
      user["prevJump"]["lastSvgNode"] = _0xBB34;
    } else {
      if (
        user["prevJump"]["isOpen"] &&
        user["prevJump"]["lastSvgNode"] == _0xBB34
      ) {
        _0xB94A = false;
      }
    }
    if (_0xB94A && _0xBB34) {
      var _0xBBF8 =
        window["innerHeight"] ||
        document["documentElement"]["clientHeight"] ||
        document["body"]["offsetHeight"];
      if (_0xBBF8 < _0xBB34["height"]["animVal"]["value"] + 50) {
        _0xB8B7["block"] = "end";
      }
      _0xBB34["scrollIntoView"](_0xB8B7);
    }
  }
  if (user["horizontal"]["open"]) {
    if (
      _0xB9DD > 0 &&
      _0xB9AC &&
      syms[_0xB9DD] &&
      !syms[_0xB9DD]["grace"]
    ) {
      var $note = $("._" + _0xB9DD + "_");
      var _0xBC29 = $("#target")["width"]();
      var _0xB97B =
        $note["eq"](0)["attr"]("x") * scale -
        $(user["horizontal"]["scrollClass"])["scrollLeft"]();
      var _0xB8E8 = true;
      user["horizontal"]["isDoOffset"] = true;
      if (_0xB97B || _0xB97B === 0) {
        if (_0xB97B < 0) {
          if (user["horizontal"]["canNoAniScroll"]) {
            user["horizontal"]["canScroll"] = true;
            user["horizontal"]["lastOffsetLeft"] =
              user["horizontal"]["lastOffsetLeft"] + _0xB97B - _0xBC29 / 2;
          }
          _0xB8E8 = false;
        } else {
          if (
            $(user["horizontal"]["scrollClass"])["scrollLeft"]() +
              (_0xB97B - _0xBC29 / 2) <
            user["horizontal"]["lastOffsetLeft"]
          ) {
            user["horizontal"]["isDoOffset"] = false;
          } else {
            user["horizontal"]["lastOffsetLeft"] =
              $(user["horizontal"]["scrollClass"])["scrollLeft"]() +
              (_0xB97B - _0xBC29 / 2) +
              _0xBC29 / 5;
          }
        }
        if (
          user["horizontal"]["isDoOffset"] &&
          user["horizontal"]["canScroll"]
        ) {
          $(user["horizontal"]["scrollClass"])
            ["stop"]()
            ["animate"](
              { scrollLeft: user["horizontal"]["lastOffsetLeft"] + "px" },
              _0xB8E8 ? 1000 : 0
            );
          if (user["scCanvasMove"]) {
            if ($(".scrolldemo")["length"] == 0) {
              var _0xBB96 = $(".music")["width"]();
              var _0xBB03 = "<div class='scrolldemo' style='width: 100%; overflow: auto; box-sizing: border-box; margin-left: 0px;height:0.1px;'></div>";
              $(user["horizontal"]["scrollClass"])
                ["parent"]()
                ["append"]($(_0xBB03));
              var _0xB824 = "<div class='demosub' style='width:" + _0xBB96 + "px;height:0.1px;'></div>";
              $(".scrolldemo")["append"](_0xB824);
            }
            var _0xB791 = $(".scrolldemo")["scrollLeft"]();
            $(".scrolldemo")["scrollLeft"](user["horizontal"]["lastOffsetLeft"]);
            var _0xB760 = $(".scrolldemo")["scrollLeft"]();
            var _0xBB65 = _0xB760 - _0xB791;
            if (
              user["horizontal"]["lastCanvasLeft"] >
              user["horizontal"]["lastOffsetLeft"]
            ) {
              user["horizontal"]["backSize"] +=
                parseInt(user["horizontal"]["lastCanvasLeft"]) -
                parseInt(user["horizontal"]["lastOffsetLeft"]);
            }
            $(".freq-box-ri")["each"](function () {
              console["log"](
                "user.horizontal.canScroll:",
                user["horizontal"]["canScroll"]
              );
              if (
                !user["horizontal"]["lastCanvasLeft"] !=
                  user["horizontal"]["lastOffsetLeft"] &&
                user["horizontal"]["isDoOffset"]
              ) {
                var _0xBC8B =
                  -user["horizontal"]["lastOffsetLeft"] -
                  user["horizontal"]["backSize"];
                var _0xBC5A = $(this)["scrollLeft"]() + _0xBB65;
                $(this)
                  ["stop"]()
                  ["animate"]({ scrollLeft: _0xBC5A + "px" }, 1000);
              }
            });
            user["horizontal"]["lastCanvasLeft"] = user["horizontal"]["lastOffsetLeft"];
          }
          user["horizontal"]["canScroll"] = false;
          if (!_0xB8E8) {
            user["horizontal"]["canNoAniScroll"] = false;
            setTimeout(function () {
              user["horizontal"]["canNoAniScroll"] = true;
            });
          }
          setTimeout(function () {
            user["horizontal"]["canScroll"] = true;
          }, 1000);
        }
      }
    }
  }
  if (user["notehlightCball"]) {
    typeof user["notehlightCball"] == "function" &&
      user["notehlightCball"](_0xB9DD, _0xB9AC, _0xBAA1, _0xB7C2, _0xBA3F);
  }
}
function endplay() {
  if (play["loop"]) {
    play["abcplay"]["play"](
      play["si"],
      play["ei"],
      play["a_pe"]
    );
    return;
  }
  if (user["syncRect"] == "single") {
    $(".abcr")["css"]({ "fill-opacity": 0 });
  }
  play["playing"] = false;
  try {
    endplaycallbck();
  } catch (e) {}
  if (user["endplayCball"]) {
    user["endplayCball"]();
  }
  user["horizontal"]["lastOffsetLeft"] = 0;
  if (user["pageSet"]["isLeftRight"]) {
    $(".pagediv")["css"]({ transition: "null" });
    currPage = -1;
    nextPage = -1;
    lastLightLine = -1;
  }
}
function play_stop() {
  if (play["playing"]) {
    if (!play["stop"]) {
      play["stop"] = -1;
      play["abcplay"]["stop"]();
    }
    return;
  }
}
function play_one(_0xAFE9) {
  if (user["abcPlayWay"] != null) {
    var _0xBDB1 = play["abcplay"]["get_outputs"]();
    if (_0xBDB1 && _0xBDB1["length"] > 1) {
      play["abcplay"]["set_output"](_0xBDB1[user["abcPlayWay"]]);
    } else {
      play["abcplay"]["set_output"](_0xBDB1[0]);
    }
  }
  set_vol(global_volume);
  play["abcplay"]["play"](0, 1, _0xAFE9);
}
function play_arr(_0x9302) {
  var _0xBD1E = new Array();
  var _0xBD80 = 0;
  for (var _0x6D1C = 0; _0x6D1C < _0x9302["length"]; _0x6D1C++) {
    var _0xBD4F = new Float32Array(7);
    _0xBD4F[0] = _0x9302[_0x6D1C][0];
    _0xBD4F[1] = _0x9302[_0x6D1C][1];
    _0xBD4F[2] = _0x9302[_0x6D1C][2];
    _0xBD4F[3] = _0x9302[_0x6D1C][3];
    _0xBD4F[4] = _0x9302[_0x6D1C][4];
    _0xBD4F[5] = _0x9302[_0x6D1C][5];
    _0xBD4F[6] = _0x9302[_0x6D1C][6];
    _0xBD1E["push"](_0xBD4F);
  }
  play["abcplay"]["play"](0, _0xBD1E["length"], _0xBD1E);
}
function playGloAE(_0xC090) {
  if (glo_a_e == null) {
    getGloAE();
  }
  for (var _0x6D1C = 0; _0x6D1C < glo_a_e["length"]; _0x6D1C++) {
    glo_a_e[_0x6D1C][3] += _0xC090;
  }
  play["abcplay"]["play"](0, glo_a_e["length"], glo_a_e);
}
function disableVoiceVolByV(_0x93F7) {
  if (glo_a_e != null) {
    for (var _0x6D1C = 0; _0x6D1C < glo_a_e["length"]; _0x6D1C++) {
      if (_0x93F7["indexOf"](glo_a_e[_0x6D1C][6]) > -1) {
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
    for (var _0x6D1C = 0; _0x6D1C < glo_a_e["length"]; _0x6D1C++) {
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
      var _0x6D1C = 0, _0xC528 = glo_a_e["length"];
      _0x6D1C < _0xC528;
      _0x6D1C++
    ) {
      _0xC4C6 = glo_a_e[_0x6D1C];
      if (_0xC4C6[0] == -1) {
        continue;
      }
      if (_0xC6B0 && _0xC6B0["length"] > 0) {
        if (_0xC6B0["indexOf"](_0xC4C6[6]) <= -1) {
          _0xC4C6[0] = 0;
          continue;
        }
      }
      for (
        var _0x77A3 = _0xC5EC, _0xC559 = _0xAD3B["length"];
        _0x77A3 < _0xC559;
        _0x77A3++
      ) {
        _0xC64E = _0xAD3B[_0x77A3];
        if (_0xC64E[0] == -1) {
          continue;
        }
        var _0xC4F7 = _0xC4C6[1]["toFixed"](2);
        _0xC4F7 = _0xC4F7["substring"](0, _0xC4F7["length"] - 1);
        var _0xC495 = _0xC4C6[4]["toFixed"](2);
        _0xC495 = _0xC495["substring"](0, _0xC495["length"] - 1);
        var _0xC67F = _0xC64E[1]["toFixed"](2);
        _0xC67F = _0xC67F["substring"](0, _0xC67F["length"] - 1);
        var _0xC61D = _0xC64E[4]["toFixed"](2);
        _0xC61D = _0xC61D["substring"](0, _0xC61D["length"] - 1);
        if (
          _0xC4C6[0] != -1 &&
          _0xC4F7 == _0xC67F &&
          (_0xC4C6[3] == _0xC64E[3] ||
            Math["abs"](_0xC4C6[3] - _0xC64E[3]) == 12) &&
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
    typeof _0xC36F === "string" ? document["getElementById"](_0xC36F) : _0xC36F;
  var _0xC3D1 = _0xC402["cloneNode"](false);
  _0xC3D1["innerHTML"] = _0xC3A0;
  _0xC402["parentNode"]["replaceChild"](_0xC3D1, _0xC402);
  return _0xC3D1;
}
function resetAllVoiceVol() {
  glo_a_e = JSON["parse"](JSON["stringify"](init_glo_a_e));
}
function play_tune(_0xBF39) {
  if (play["playing"]) {
    if (!play["stop"]) {
      play["stop"] = -1;
      play["abcplay"]["stop"]();
    }
    return;
  } else {
    $(".abcr")["css"]("fill-opacity", 0);
  }
  function _0xBE75(_0xBED7) {
    var _0xBFCC = play["a_pe"];
    for (_0x6D1C = 0; _0x6D1C < _0xBFCC["length"]; _0x6D1C++) {
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
      _0xBFCC = play["a_pe"],
      _0xBF6A = 0,
      _0xC02E;
    _0x6D1C = _0xBFCC["length"];
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
    if (_0xBF6A < _0xBFCC["length"]) {
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
      _0xBFCC = play["a_pe"],
      _0xBF6A = 0;
    if (_0xBED7 <= _0xBFCC[0][0]) {
      return 0;
    }
    var _0xBF9B = _0xBFCC[_0xBFCC["length"] - 1][0];
    for (var _0x6D1C = 0; _0x6D1C < _0xBFCC["length"]; _0x6D1C++) {
      if (_0xBF9B < _0xBFCC[_0x6D1C][0]) {
        _0xBF9B = _0xBFCC[_0x6D1C][0];
      }
    }
    if (_0xBED7 >= _0xBF9B) {
      return _0xBFCC["length"];
    }
    for (_0x6D1C = 0; _0x6D1C < _0xBFCC["length"]; _0x6D1C++) {
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
      for (; _0xBF6A < _0xBFCC["length"]; _0xBF6A++) {
        if (_0xBFCC[_0xBF6A][1] != _0xBF08) {
          break;
        }
      }
    }
    return _0xBF6A;
  }
  function _0xBEA6(_0xBED7, _0xBDE2) {
    pobj["playStartTime"] = new Date()["getTime"]();
    selx_sav[0] = selx[0];
    selx_sav[1] = selx[1];
    setsel(0, 0);
    setsel(1, 0);
    play["stop"] = 0;
    if (user["abcPlayWay"] != null) {
      var _0xBDB1 = play["abcplay"]["get_outputs"]();
      if (_0xBDB1 && _0xBDB1["length"] > 1) {
        play["abcplay"]["set_output"](_0xBDB1[user["abcPlayWay"]]);
      } else {
        play["abcplay"]["set_output"](_0xBDB1[0]);
      }
    }
    play["abcplay"]["play"](_0xBED7, _0xBDE2, play["a_pe"]);
  }
  var abc,
    _0x6D1C,
    _0xBED7,
    _0xBDE2,
    _0x9DBA,
    _0xBF08,
    _0x6D7E = $("#source")["val"](),
    _0x9D89 = document["getElementById"]("ctxMenu");
  _0x9D89["style"]["display"] = "none";
  play["playing"] = true;
  getBeatAndSpeed(_0x6D7E, function (_0xA9C9, _0xAB51) {
    user["oneBeatTime"] = _0xAB51;
  });
  if (!play["a_pe"]) {
    user["img_out"] = null;
    user["get_abcmodel"] = play["abcplay"]["add"];
    abc = new abc2svg["Abc"](user);
    play["abcplay"]["clear"]();
    abc["tosvg"]("play", "%%play");
    try {
      initVol = 1;
      splitVol = 0;
      abc["tosvg"](abc_fname[0], _0x6D7E);
    } catch (e) {
      window["top"]["alert"](
        e["message"] + "\x0Aabc2svg tosvg bug - stack:\x0A" + e["stack"]
      );
      play["playing"] = false;
      play["a_pe"] = null;
      return;
    }
    play["a_pe"] = play["abcplay"]["clear"]();
    play["si"] = play["ei"] = play["stop"] = 0;
    play["loop"] = false;
  }
  if (_0xBF39 < 0) {
    initVol = 1;
    splitVol = 0;
    play["loop"] = false;
    play["si"] = 0;
    if (play["a_pe"] == null) {
      window["top"]["alert"]("\u8c31\u5b50\u5185\u5bb9\u4e3a\u7a7a");
      return;
    }
    play["ei"] = play["a_pe"]["length"];
    _0xBEA6(play["si"], play["ei"]);
    return;
  }
  if (_0xBF39 == 2 && play["loop"]) {
    _0xBEA6(play["si"], play["ei"]);
    return;
  }
  if (_0xBF39 == 3) {
    if (play["stop"] > 0) {
      _0xBEA6(
        _0xBE44(play["stop"], play["pt"]),
        play["ei"]
      );
    } else {
      if (play["ei"] == 0) {
        _0xBEA6(_0xBE44(laststop, laststopPt), play["a_pe"]["length"]);
      } else {
        _0xBEA6(_0xBE44(laststop, laststopPt), play["ei"]);
      }
    }
    return;
  }
  if (_0xBF39 == 4) {
    _0xBED7 = _0xBE75(selx[0]);
    _0xBDE2 = _0xBE13(selx[1]);
    if (_0xBED7 == play["a_pe"]["length"]) {
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
      _0x6D1C = _0x6D7E["indexOf"]("\x0AX:", selx[0]);
      _0xBDE2 =
        _0x6D1C < 0 ? play["a_pe"]["length"] : _0xBE13(_0x6D1C);
    } else {
      if (_0xBF39 != 0 && selx[1]) {
        _0x6D1C = _0x6D7E["lastIndexOf"]("\x0AX:", selx[1]);
        _0xBED7 = _0x6D1C < 0 ? 0 : _0xBE44(_0x6D1C);
        _0xBDE2 = _0xBE13(selx[1]);
      } else {
        _0x6D1C = _0x9DBA
          ? Number(_0x9DBA[0]["getAttribute"]("class")["slice"](6, -1))
          : 0;
        _0xBED7 = _0xBDE2 = 0;
        if (_0x6D7E[0] == "X" && _0x6D7E[1] == ":") {
          _0xBED7 = 1;
        }
        while (1) {
          _0xBDE2 = _0x6D7E["indexOf"]("\x0AX:", _0xBDE2);
          if (_0xBDE2 < 0 || _0xBDE2 > _0x6D1C) {
            break;
          }
          _0xBED7 = _0x6D7E["indexOf"]("\x0AK:", ++_0xBDE2);
          if (_0xBED7 < 0) {
            break;
          }
          _0xBDE2 = _0xBED7;
        }
        if (_0xBED7 <= 0) {
          play["playing"] = false;
          return;
        }
        _0xBED7 = _0xBE44(_0xBED7);
        _0xBDE2 =
          _0xBDE2 < 0 ? play["a_pe"]["length"] : _0xBE13(_0xBDE2);
      }
    }
  }
  if (_0xBF39 != 3) {
    play["si"] = _0xBED7;
    play["ei"] = _0xBDE2;
    play["loop"] = _0xBF39 == 2;
  }
  _0xBEA6(_0xBED7, _0xBDE2);
}
function edit_init() {
  if (typeof abc2svg != "object" || !abc2svg["modules"]) {
    setTimeout(edit_init, 500);
    return;
  }
  abc2svg["loadjs"] = function (_0x6BF6, _0x9CF6, _0x9CC5) {
    try {
      var _0x9D27 = document["getElementsByTagName"]("script");
      for (var _0x6D1C in _0x9D27) {
        if (
          _0x9D27[_0x6D1C] &&
          _0x9D27[_0x6D1C]["src"] &&
          _0x9D27[_0x6D1C]["src"]["indexOf"](_0x6BF6) > -1
        ) {
          return typeof _0x9CF6 == "function" && _0x9CF6();
        }
      }
    } catch (_0x9395) {
      return typeof _0x9CC5 == "function" && _0x9CC5(_0x9395);
    }
    if (_0x6BF6["indexOf"]("222.js") > -1) {
      return true;
    }
    var _0x6D7E = document["createElement"]("script");
    if (/:\/\//["test"](_0x6BF6)) {
      _0x6D7E["src"] = _0x6BF6;
    } else {
      _0x6D7E["src"] = jsdir + _0x6BF6;
    }
    _0x6D7E["type"] = "text/javascript";
    if (_0x9CF6) {
      _0x6D7E["onload"] = _0x9CF6;
    }
    _0x6D7E["onerror"] =
      _0x9CC5 ||
      function () {
        window["top"]["alert"]("error loading " + _0x6BF6);
      };
    document["head"]["appendChild"](_0x6D7E);
  };
  abc2svg["abc_end"] = function () {};
  function _0x9C94() {
    var _0x9E1C = storage(true, "fontsz");
    if (_0x9E1C) {
      elt_ref["source"]["style"]["fontSize"] = elt_ref["src1"][
        "style"
      ]["fontSize"] = _0x9E1C + "px";
      document["getElementById"]("fontsize")["value"] = Number(_0x9E1C);
    }
    _0x9E1C = storage(true, "lang");
    if (_0x9E1C) {
      loadlang(_0x9E1C, true);
    }
  }
  var _0x7526 = [
    "diverr",
    "source",
    "src1",
    "s0",
    "s1",
    "target",
  ];
  for (var _0x6D1C = 0; _0x6D1C < _0x7526["length"]; _0x6D1C++) {
    var _0x9395 = _0x7526[_0x6D1C];
    elt_ref[_0x9395] = document["getElementById"](_0x9395);
  }
  var _0x9C63 = document["getElementById"]("saveas");
  if (_0x9C63 != null) {
    _0x9C63["onclick"] = saveas;
  }
  if (elt_ref["s0"] != null) {
    elt_ref["s0"]["onclick"] = function () {
      selsrc(0);
    };
  }
  if (elt_ref["s1"] != null) {
    elt_ref["s1"]["onclick"] = function () {
      selsrc(1);
    };
  }
  if (!elt_ref["target"]) {
    return;
  }
  elt_ref["target"]["onclick"] = svgsel;
  elt_ref["target"]["onmousedown"] = svgMouseDown;
  elt_ref["target"]["onmousemove"] = svgMouseMove;
  elt_ref["target"]["onmouseup"] = svgMouseUp;
  elt_ref["target"]["ontouchstart"] = svgMouseDown;
  elt_ref["target"]["ontouchmove"] = svgMouseMove;
  elt_ref["target"]["ontouchend"] = svgMouseUp;
  elt_ref["source"]["onselect"] = seltxt;
  window["onbeforeprint"] = function () {
    selx_sav[0] = selx[0];
    selx_sav[1] = selx[1];
    setsel(0, 0);
    setsel(1, 0);
  };
  window["onafterprint"] = function () {
    setsel(0, selx_sav[0]);
    setsel(1, selx_sav[1]);
  };
  abc2svg["loadjs"]("drawpath.js?v=1.0.19");
  if (
    window["AudioContext"] ||
    window["webkitAudioContext"] ||
    navigator["requestMIDIAccess"] ||
    window["msAudioContext"] ||
    window["mozAudioContext"]
  ) {
    var _0x9C01 = false;
    var _0x9C32 = document["querySelectorAll"]("script");
    for (var _0x6D1C = 0; _0x6D1C < _0x9C32["length"]; _0x6D1C++) {
      if (_0x9C32[_0x6D1C]["src"]["indexOf"]("play-1") != -1) {
        _0x9C01 = true;
        break;
      }
    }
    if (_0x9C01) {
      play["abcplay"] = AbcPlay({ onend: endplay, onnote: notehlight });
    } else {
      abc2svg["loadjs"]("play-1.js?v=1.0.19", function () {
        play["abcplay"] = AbcPlay({ onend: endplay, onnote: notehlight });
      });
    }
    if (user["isOncontextmenu"]) {
      var _0x9395 = elt_ref["target"];
      _0x9395["oncontextmenu"] = function (_0x93C6) {
        if (document["getElementById"]("selectdiv") != null) {
          document["getElementById"]("selectdiv")["style"]["display"] =
            "none";
        }
        var _0x6F06,
          _0x6F37,
          _0x9DBA = _0x93C6["target"],
          _0x9D58 = _0x9DBA["getAttribute"]("class");
        _0x93C6["stopImmediatePropagation"]();
        _0x93C6["preventDefault"]();
        if (_0x9D58 && _0x9D58["substr"](0, 4) == "abcr") {
          setsel(1, Number(getAbcistart(_0x9D58)));
        }
        while (_0x9DBA["tagName"] && _0x9DBA["tagName"] != "svg") {
          _0x9DBA = _0x9DBA["parentNode"];
        }
        play["svg"] = _0x9DBA;
        var _0x9D89 = document["getElementById"]("ctxMenu");
        _0x9D89["style"]["display"] = "block";
        _0x6F06 =
          _0x93C6["pageX"] +
          elt_ref["target"]["parentNode"]["scrollLeft"];
        _0x6F37 = _0x93C6["pageY"];
        _0x9D89["style"]["left"] = _0x6F06 + 5 + "px";
        _0x9D89["style"]["top"] = _0x6F37 + 20 + "px";
        var _0x7183 = $(_0x93C6["target"])["attr"]("istart");
        if (_0x7183) {
          if ($(".selected_text")["length"] == 0) {
            var _0x9DEB = $(
              "text[type*='HD'][istart='" + _0x7183 + "'],text[type^='r'][istart='" + _0x7183 + "']"
            )["addClass"]("selected_text");
          }
          $("rect[istart='" + _0x7183 + "']")["css"](
            "fill-opacity",
            "0"
          );
        }
        if ($(".selected_text")["length"] > 0) {
          $(".noterelli")["show"]();
        } else {
          $(".noterelli")["hide"]();
        }
        return false;
      };
    }
  }
  _0x9C94();
}
function getAbcistart(_0x9D58) {
  if (_0x9D58 != null) {
    var _0xA905 = _0x9D58["match"](/[0-9]+/g);
    if (!_0xA905) {
      return 0;
    }
    return _0xA905[0];
  }
}
function drag_over(_0x93C6) {
  _0x93C6["stopImmediatePropagation"]();
  _0x93C6["preventDefault"]();
}
function dropped(_0x93C6) {
  _0x93C6["stopImmediatePropagation"]();
  _0x93C6["preventDefault"]();
  var _0x9B9F = _0x93C6["dataTransfer"]["getData"]("text");
  if (_0x9B9F) {
    _0x93C6["target"]["value"] = _0x9B9F;
    src_change();
    return;
  }
  _0x9B9F = _0x93C6["dataTransfer"]["files"];
  if (_0x9B9F["length"] != 0) {
    var _0x9BD0 = new FileReader();
    _0x9BD0["onload"] = function (_0x93C6) {
      $("#source")["val"](_0x93C6["target"]["result"]);
      src_change();
    };
    _0x9BD0["readAsText"](_0x9B9F[0], "UTF-8");
    return;
  }
}
function getNoteData() {
  if (user["isFixedNoteData"] && user["noteData"]) {
    return user["noteData"];
  }
  isGetNoteData = true;
  var abc,
    _0x6D7E = $("#source")["val"]();
  user["img_out"] = null;
  user["get_abcmodel"] = play["abcplay"]["add"];
  abc = new abc2svg["Abc"](user);
  try {
    initVol = 1;
    splitVol = 0;
    abc["tosvg"](abc_fname[0], _0x6D7E);
    isGetNoteData = false;
  } catch (e) {
    window["top"]["alert"](
      e["message"] + "\x0Aabc2svg tosvg bug - stack:\x0A" + e["stack"]
    );
    play["playing"] = false;
    play["a_pe"] = null;
    isGetNoteData = false;
    return;
  }
  var _0xAD3B = play["abcplay"]["clear"]();
  if (user["isFixedNoteData"]) {
    user["noteData"] = _0xAD3B;
  }
  isGetNoteData = false;
  return _0xAD3B;
}
function clearNoteData() {
  user["noteData"] = null;
}
function getAllNoteIndex() {
  var _0xA936 = getNoteData();
  var _0xA967 = new Array();
  for (var _0x6D1C = 0; _0x6D1C < _0xA936["length"]; _0x6D1C++) {
    _0xA967["push"](_0xA936[_0x6D1C][0]);
  }
  return _0xA967;
}
function showFirstBarSeq() {
  $["each"]($("svg"), function (_0x6D1C, _0x89A1) {
    $["each"](
      $(_0x89A1)["find"]("g text[type='measure']"),
      function (_0x77A3, _0xC92D) {
        if (_0x77A3 > 0) {
          $(_0xC92D)["remove"]();
        }
      }
    );
  });
}

var timer;
function src_change(cb) {
    $("#target")["css"]("cursor", "default");
    $("#insertWord")["removeClass"]("menu-pressed");
    var abc_content = $("#source")["val"]();
    if (abc_content == "") {
        return
    }
    if (user["srcChangeCount"] == 0) {
        user["defaultMusicType"] = musicType
    }
    user["pitNoteData"] = null;
    line0X = -1;
    line1X = -1;
    $("svg[type=\'rect\']")["remove"]();
    $("svg[type=\'note_rect\']")["remove"]();
    $("svg[type=\'lyric_bg_rect\']")["remove"]();
    user["invisibleMeter"] = null;
    try {
        has_weak_node = false;
        bar_count = 0;
        last_bar_time = 0;
        bar_visible = {
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0,
            "10": 0,
            "11": 0,
            "12": 0,
            "13": 0,
            "14": 0,
            "15": 0
        };
        max_st_nodenum = 0;
        last_bar_x = 0
    } catch (e) {
        console["error"](e)
    }
    showBeat = false;
    showKew = false;
    showSD = false;
    isInFirstNode = true;
    firstNodeNotes = new Array();
    renderStaffMeterCount = 0;
    if (!elt_ref["source"]) {
        return
    }
    var v_arr = new Array(); // 声部
    var check_v = /V\s*:\s*([0-9]*)/g;
    var v_info_arr = abc_content["match"](check_v);
    isStave = false;
    notAutoSFBarSeq = -1;
    if (v_info_arr != null && v_info_arr["length"] > 0) {
        for (var i = 0; i < v_info_arr["length"]; i++) {
            var v_info = v_info_arr[i];
            var v_index = v_info["match"](/V\s*:\s*([0-9]*)/)[1];
            if (v_arr["indexOf"](v_index) < 0) {
                v_arr["push"](v_index)
            }
        }
    }
    if (v_arr["length"] > 1) {
        isStave = true
    } else {
        if (v_arr["length"] == 1) {
            if (v_arr[0] == "9") {
                isStave = true
            }
        }
    }
    if (!isStave && musicType == 2) {
        if (false) {
            var abc_content = $("#source")["val"]();
            if (abc_content["indexOf"]("%%indent") > -1) {
                abc_content = abc_content["replace"](/\%\%indent.*/, "%%indent " + firstMeterWidth);
                $("#source")["val"](abc_content)
            } else {
                $("#source")["val"]("%%indent " + firstMeterWidth + "\x0A" + $("#source")["val"]())
            }
        }
    } else {
        $("#source")["val"]($("#source")["val"]()["replaceAll"]("%%indent .*\x0A", ""))
    }
    play_stop();
    play["playing"] = false;
    if (!play["playing"]) {
        timer = setTimeout(render, 100, cb)
    }
    if (elt_ref["source"] && $("#source")["val"]() != "" && $("#source")["val"]()["indexOf"]("showfirstmeasure") > -1) {
        setTimeout(showFirstBarSeq, 100)
    }
    getVoiceVol("source")
}

function src_change_bak(_0xC154) {
  $("#target")["css"]("cursor", "default");
  $("#insertWord")["removeClass"]("menu-pressed");
  var _0xA18E = $("#source")["val"]();
  if (_0xA18E == "") {
    return;
  }
  if (user["srcChangeCount"] == 0) {
    user["defaultMusicType"] = musicType;
  }
  user["pitNoteData"] = null;
  line0X = -1;
  line1X = -1;
  $("svg[type='rect']")["remove"]();
  $("svg[type='note_rect']")["remove"]();
  $("svg[type='lyric_bg_rect']")["remove"]();
  user["invisibleMeter"] = null;
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
    console["error"](e);
  }
  showBeat = false;
  showKew = false;
  showSD = false;
  isInFirstNode = true;
  firstNodeNotes = new Array();
  renderStaffMeterCount = 0;
  if (!elt_ref["source"]) {
    return;
  }
  var _0xC9C0 = new Array();
  var _0xCA22 = /V\s*:\s*([0-9]*)/g;
  var _0x6D4D = _0xA18E["match"](_0xCA22);
  isStave = false;
  notAutoSFBarSeq = -1;
  if (_0x6D4D != null && _0x6D4D["length"] > 0) {
    for (var _0x6D1C = 0; _0x6D1C < _0x6D4D["length"]; _0x6D1C++) {
      var _0x6C89 = _0x6D4D[_0x6D1C];
      var _0xC9F1 = _0x6C89["match"](/V\s*:\s*([0-9]*)/)[1];
      if (_0xC9C0["indexOf"](_0xC9F1) < 0) {
        _0xC9C0["push"](_0xC9F1);
      }
    }
  }
  if (_0xC9C0["length"] > 1) {
    isStave = true;
  } else {
    if (_0xC9C0["length"] == 1) {
      if (_0xC9C0[0] == "9") {
        isStave = true;
      }
    }
  }
  if (!isStave && musicType == 2) {
    if (false) {
      var _0xA18E = $("#source")["val"]();
      if (_0xA18E["indexOf"]("%%indent") > -1) {
        var _0xC98F = firstMeterWidth;
        _0xA18E = _0xA18E["replace"](/\%\%indent.*/, "%%indent " + _0xC98F);
        $("#source")["val"](_0xA18E);
      } else {
        $("#source")["val"](
          "%%indent " +
            firstMeterWidth +
            "\x0A" +
            $("#source")["val"]()
        );
      }
    }
  } else {
    $("#source")["val"](
      $("#source")["val"]()["replaceAll"]("%%indent .*\x0A", "")
    );
  }
  play_stop();
  play["playing"] = false;
  if (!play["playing"]) {
    timer = setTimeout(render, 100, _0xC154);
  }
  if (
    elt_ref["source"] &&
    $("#source")["val"]() != "" &&
    $("#source")["val"]()["indexOf"]("showfirstmeasure") > -1
  ) {
    setTimeout(showFirstBarSeq, 100);
  }
  getVoiceVol("source");
}
function getVoiceVol(_0xB3EE) {
  var _0xA18E = $("#" + _0xB3EE)["val"]();
  if (!_0xA18E) {
    return;
  }
  var _0xB38C = /%%voicevol\((.*)\)/;
  var _0x6D4D = _0xA18E["match"](_0xB38C);
  if (_0x6D4D != null) {
    var _0x6C89 = _0x6D4D[1];
    var _0xB41F = _0x6C89["split"](",");
    vols = new Array();
    for (var _0x77A3 = 0; _0x77A3 < _0xB41F["length"]; _0x77A3++) {
      var _0xB3BD = _0xB41F[_0x77A3];
      var _0x9E1C = _0xB3BD["split"]("=")[0];
      var _0xB450 = _0xB3BD["split"]("=")[1];
      var _0x9333 = new Object();
      _0x9333["v"] = _0x9E1C;
      _0x9333["vol"] = _0xB450;
      vols["push"](_0x9333);
    }
  }
}
setTimeout(edit_init, 200);
function getBeatAndSpeed(_0xA18E, _0x6BF6) {
  var _0xAABE = new RegExp("Q:.*(?=\\n)");
  var _0xAA8D = new RegExp("M:.*(?=\\n)");
  var _0xAA2B = _0xAABE["exec"](_0xA18E);
  var _0x82BD = _0xAA8D["exec"](_0xA18E);
  var _0xAA5C;
  if (!_0x82BD) {
    return typeof _0x6BF6 == "function" && _0x6BF6();
  }
  var _0xA9FA = _0x82BD[0]["replace"](
    new RegExp("M\\s*:", "g"),
    ""
  );
  if (_0xA9FA["indexOf"]("C|") > -1) {
    _0xA9FA = "2/2";
  } else {
    if (_0xA9FA["indexOf"]("C") > -1) {
      _0xA9FA = "4/4";
    } else {
      if (_0xA9FA["split"]("/")["length"] > 2) {
        _0xA9FA = _0xA9FA["trim"]()["split"](" ")[0];
      }
    }
  }
  _0xA9FA = _0xA9FA["replaceAll"](" ", "");
  var _0xA9C9 = _0xA9FA["split"]("/")[0];
  if (!_0xAA2B) {
    _0xAA5C = [
      "1/" + _0xA9FA["split"]("/")[1],
      "120",
    ];
  } else {
    _0xAA5C = _0xAA2B[0]
      ["replace"]("Q:", "")
      ["split"]("=");
    if (
      _0xAA5C &&
      _0xAA5C["length"] > 0 &&
      _0xAA5C[0]["indexOf"]('"') > -1
    ) {
      qAsplit = _0xAA5C[0]["split"]('"');
      _0xAA5C[0] = qAsplit[qAsplit["length"] - 1];
    }
  }
  var _0xAB51 = 0;
  if (_0xAA5C["length"] > 0) {
    var _0xAAEF = _0xAA5C[1];
    var _0x9302 = _0xAA5C[0]["split"]("/");
    var _0x85FE = eval(_0xAA5C[0]);
    var _0xAB20 =
      (_0xAAEF * _0xA9FA["split"]("/")[1]) / _0x9302[1];
    _0xAB51 = 60 / _0xAB20;
  } else {
    _0xAB51 = 60 / _0xAA5C[0];
  }
  var _0xA998 = _0xAA5C[1];
  return (
    typeof _0x6BF6 == "function" && _0x6BF6(_0xA9C9, _0xAB51, _0xA998, _0xA9FA)
  );
}
function getSubSvg(_0xB171, _0x70F0) {
  var _0xB140 = "";
  var _0xB10F = "";
  for (var _0x6D1C = 0; _0x6D1C < _0x70F0; _0x6D1C++) {
    var _0x6DAF = _0xB171["indexOf"]("</svg>");
    _0xB171 = _0xB171["substr"](_0x6DAF + 6);
  }
  var _0xB0DE = _0xB171["indexOf"]("</svg>");
  return _0xB171["substring"](0, _0xB0DE + 6);
}
function getClickNoteInfo(_0x7183) {
  return syms[_0x7183];
}
function findNearElement(_0xA283, _0x6F06, _0x6F37) {
  var _0xA1F0 = 9999;
  var _0xA221 = 9999;
  var _0xA252 = null;
  if ($(_0xA283)["is"]("text")) {
    var _0x6E73 = $(_0xA283)["attr"]("type");
    if (_0x6E73 == "title" || _0x6E73 == "composer") {
      _0xA252 = $(_0xA283);
      var _0x9333 = new Object();
      _0x9333["type"] = _0x6E73;
      _0x9333["text"] = $(_0xA283)["text"]();
      return _0x9333;
    }
  }
  $(_0xA283)
    ["find"]("text,use,path")
    ["each"](function (_0x6D1C, _0x89A1) {
      var _0xA3A9 = $(this)["attr"]("x");
      var _0xA3DA = $(this)["attr"]("y");
      if (!_0xA3A9) {
        _0xA3A9 = 0;
      }
      if (!_0xA3DA) {
        _0xA3DA = 0;
      }
      _0xA3A9 = parseFloat(_0xA3A9);
      _0xA3DA = parseFloat(_0xA3DA);
      var _0xA2B4 = $(_0x89A1)[0]["getBBox"]();
      var _0xA4CF = $(_0x89A1)[0]["getBoundingClientRect"]();
      var _0x9023 = _0xA2B4["height"];
      var _0xA626 = _0xA2B4["width"];
      if ($(_0x89A1)["is"]("path") && !_0xA3A9) {
        var _0xA2E5 = $(_0x89A1)["attr"]("d");
        if (_0xA2E5 && _0xA2E5 != "") {
          var _0xA46D = /m(\d*[.]\d*\s*\d*[.]\d*)/i;
          var _0xA49E = _0xA2E5["match"](_0xA46D);
          if (_0xA49E != null && _0xA49E["length"] > 0) {
            var _0xA43C = _0xA49E[1]["replace"](/\s+/, " ");
            _0xA3A9 = parseFloat(_0xA43C["split"](" ")[0]);
            _0xA3DA = parseFloat(_0xA43C["split"](" ")[1]);
          }
        }
      }
      var _0x85FE = $(this)["parent"]();
      var _0x884A = 0;
      var _0x887B = 0;
      var _0xA531 = 1;
      if ($(_0x85FE)["is"]("g")) {
        var _0xA5C4 = $(_0x85FE)["attr"]("transform");
        if (_0xA5C4 && _0xA5C4 != "") {
          var _0xA5F5 = /translate\((.[^\(]*)\)/;
          var _0xA500 = /scale\((.[^\(]*)\)/;
          var _0xA562 = _0xA5C4["match"](_0xA5F5);
          if (_0xA562 != null && _0xA562["length"] > 0) {
            var _0xA593 = _0xA562[1];
            _0x884A = parseFloat(_0xA593["split"](",")[0]);
            _0x887B = parseFloat(_0xA593["split"](",")[1]);
          }
          var _0xA40B = _0xA5C4["match"](_0xA500);
          if (_0xA40B != null && _0xA40B["length"] > 0) {
            _0xA531 = parseFloat(_0xA40B[1]);
            _0xA626 = parseFloat(_0xA626) / _0xA531;
            _0x9023 = parseFloat(_0x9023) / _0xA531;
          }
        }
        if ($(_0x85FE)["attr"]("type") == "staff") {
          _0x9023 = -_0x9023;
        }
      }
      var _0x6E73 = $(_0x89A1)["attr"]("type");
      if (_0x6E73 && _0x6E73["toLowerCase"]() == "hd") {
        if (parseFloat(_0x9023) > 0) {
          _0x9023 = parseFloat(_0x9023) - 20;
        }
      }
      if ($(_0x89A1)["is"]("path")) {
        if (
          _0x6F06 >= _0xA3A9 + _0x884A &&
          _0x6F06 <= parseFloat(_0xA3A9) + parseFloat(_0xA626) + _0x884A &&
          _0x6F37 >= parseFloat(_0xA3DA) + _0x887B &&
          _0x6F37 <= Math["abs"](_0xA3DA) + parseFloat(_0x9023) + _0x887B
        ) {
          _0xA252 = $(this);
          return false;
        }
      } else {
        if (
          _0x6F06 >= _0xA3A9 + _0x884A &&
          _0x6F06 <= parseFloat(_0xA3A9) + parseFloat(_0xA626) + _0x884A &&
          _0x6F37 <= parseFloat(_0xA3DA) + _0x887B &&
          _0x6F37 >= Math["abs"](_0xA3DA) - parseFloat(_0x9023) + _0x887B
        ) {
          _0xA252 = $(this);
          return false;
        }
      }
      var _0x8F5F = Math["abs"](parseFloat(_0xA3A9 + _0x884A) - _0x6F06);
      if (_0x8F5F > 30) {
        return;
      }
      if (_0x8F90 > 30) {
        return;
      }
      var _0x8F90 = Math["abs"](parseFloat(_0xA3DA + _0x887B) - _0x6F37);
      var _0xA378 = Math["abs"](
        parseFloat(_0xA3DA) + parseFloat(_0x9023) - _0x6F37
      );
      var _0xA316 = Math["sqrt"](
        Math["pow"](_0x8F5F, 2) + Math["pow"](_0x8F90, 2)
      );
      var _0xA347 = Math["sqrt"](
        Math["pow"](_0x8F5F, 2) + Math["pow"](_0xA378, 2)
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
  _0x9333["type"] = null;
  _0x9333["text"] = "";
  _0x9333["parenttype"] = "";
  if (_0xA252 != null && _0xA252["length"] > 0) {
    console["log"](_0xA252[0]["outerHTML"]);
    _0x9333["type"] = $(_0xA252)["attr"]("type");
    if ($(_0xA252)["is"]("text")) {
      _0x9333["text"] = $(_0xA252)["text"]();
    }
    if ($(_0xA252)["attr"]("parenttype")) {
      _0x9333["parenttype"] = $(_0xA252)["attr"]("parenttype");
    }
    _0x9333["html"] = _0xA252[0]["outerHTML"];
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
  if ("note" != _0x6E73 && "rest" != _0x6E73) {
    return;
  }
  var _0x8C1E = 2,
    _0x8C80,
    _0x8C4F,
    _0x8BED;
  _0x8C4F = _0x6D7E["x"] - 4.5 - 2;
  let _0x8CE2 = abc["get_staff_tb"]();
  let _0x8D13 = _0x8CE2["length"];
  var _0x8CB1 = 0;
  var _0x8B8B = -1;
  var _0x8B5A = 0;
  for (var _0x6D1C = 0; _0x6D1C < _0x8CE2["length"]; _0x6D1C++) {
    if (_0x8CE2[_0x6D1C]["y"] != 0) {
      if (_0x8B8B == -1) {
        _0x8B8B = _0x6D1C;
      }
      _0x8CB1++;
      _0x8B5A = _0x6D1C;
    }
  }
  if (_0x8CB1 == 1) {
    _0x8C80 =
      _0x8CE2[_0x8B8B]["y"] +
      _0x8CE2[_0x8B8B]["topbar"] * _0x8CE2[_0x8B8B]["staffscale"] +
      15;
    _0x8BED =
      _0x8CE2[_0x8B8B]["topbar"] * _0x8CE2[_0x8B8B]["staffscale"] + 30;
    if (_0x6D7E["my_line"] == 0 && musicType == 2) {
      _0x8BED = _0x8BED + 15;
    }
  } else {
    _0x8C80 =
      abc["get_staff_tb"]()[_0x8B8B]["y"] +
      _0x8CE2[_0x8B8B]["topbar"] * _0x8CE2[_0x8B8B]["staffscale"] +
      15;
    _0x8BED =
      _0x8CE2[_0x8B8B]["y"] +
      _0x8CE2[_0x8B8B]["topbar"] * _0x8CE2[_0x8B8B]["staffscale"] -
      (_0x8CE2[_0x8B5A]["y"] +
        _0x8CE2[_0x8B5A]["botbar"] * _0x8CE2[_0x8B5A]["staffscale"]) +
      30;
    if (_0x6D7E["my_line"] == 0 && musicType == 2) {
      _0x8BED = _0x8BED + 15;
    }
  }
  var _0x8BBC = getValidNext(_0x6D7E, _0x6D7E["ts_next"]);
  var _0x8D44 = _0x8BBC["time"] - _0x6D7E["time"];
  var _0x8C1E = 2,
    _0x8C80,
    _0x8C4F,
    _0x8BED;
  var _0x7E25 = getMeter(_0x6D7E["p_v"]["meter"]["a_meter"][0]);
  var _0x7DC3 = $("#source")["val"]();
  var _0x6FFB = _0x7DC3["slice"](_0x6DAF, _0x6DE0);
  if (_0x7E25 && _0x7E25["bot"] < 4) {
    _0x7E25["bot"] = 4;
    _0x7E25["top"] = (4 / _0x7E25["bot"]) * _0x7E25["top"];
  }
  var _0x6C58 = getTag(_0x7DC3, "L");
  var _0x8A65 =
    _0x6D7E["my_wmeasure"] / parseInt(_0x6D7E["my_meter"][0]["top"]);
  _0x6D7E["beat_time"] = _0x8A65;
  _0x6D7E["time_inter"] = _0x8D44;
  _0x6D7E["single_count"] = 0;
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
          _0x6D7E["time"],
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
    var _0x8D75 = _0x8BBC["x"] - _0x6D7E["x"];
    var _0x8DA6 = _0x8D75 / (_0x8A96 + 1);
    _0x6D7E["single_count"] = _0x8A96;
    for (var _0x6D1C = 1; _0x6D1C <= _0x8A96; _0x6D1C++) {
      drawSingleLine(
        _0x8C4F + _0x8DA6 * _0x6D1C,
        _0x8C80,
        _0x8C1E,
        _0x8BED,
        _0x6D7E,
        _0x6E73,
        _0x6D1C,
        _0x6D7E["time"] + (_0x8AF8 / (_0x8A96 + 1)) * _0x6D1C,
        _0x8AF8 / (_0x8A96 + 1)
      );
    }
    console["log"](
      "s.istart:",
      _0x6D7E["istart"],
      "  next.istart:",
      _0x8BBC["istart"]
    );
    console["log"]("\u65f6\u95f4\u95f4\u9694\uff1a", _0x8D44);
    console["log"]("\u9700\u8981\u52a0\u753b" + _0x8A96 + "\u6761\u7ebf,\u95f4\u8ddd\uff1a", _0x8DA6);
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
            _0x6D7E["time"],
            _0x6D7E["dur"]
          );
        }
      }
    } else {
      if (_0x8D44 == 0 && _0x8BBC["type"] == 10) {
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
            _0x6D7E["time"],
            _0x6D7E["dur"]
          );
        }
      }
    }
  }
};
function isMinXWithSameTime(_0x6D7E) {
  for (var _0x6D1C = 0; _0x6D1C < syms["length"]; _0x6D1C++) {
    var _0xB4E3 = syms[_0x6D1C];
    if (
      _0xB4E3 &&
      _0x6D7E["type"] == 10 &&
      _0x6D7E["time"] == _0xB4E3["time"] &&
      _0x6D7E["istart"] != _0xB4E3["istart"] &&
      (_0xB4E3["type"] == 10 || _0xB4E3["type"] == 8)
    ) {
      if (_0x6D7E["x"] < _0xB4E3["x"]) {
        return true;
      }
      return false;
    }
  }
  return true;
}
function removeSingleLine(_0x6D7E) {
  var _0xB38C = new RegExp(
    '<rect time="' + _0x6D7E["time"] + '".[^<]*/>',
    "g"
  );
  var _0xC123 = abc["get_svg"]();
  var _0x6D4D = _0xC123["match"](_0xB38C);
  if (_0x6D4D != null) {
    for (var _0x6D1C = 0; _0x6D1C < _0x6D4D["length"]; _0x6D1C++) {
      _0xC123 = _0xC123["replace"](_0x6D4D[_0x6D1C], "");
    }
    abc["set_svg"](_0xC123);
  }
  return true;
}
function getValidNext(_0x6D7E, _0x8BBC) {
  if (
    _0x8BBC["invis"] ||
    (_0x8BBC &&
      _0x8BBC["type"] != 10 &&
      _0x8BBC["type"] != 8 &&
      _0x8BBC["type"] != 0)
  ) {
    while (_0x8BBC["ts_next"]) {
      _0x8BBC = _0x8BBC["ts_next"];
      if (_0x8BBC["invis"]) {
        continue;
      }
      if (
        _0x8BBC["type"] == 10 ||
        _0x8BBC["type"] == 8 ||
        _0x8BBC["type"] == 0
      ) {
        break;
      }
    }
  }
  if (
    _0x8BBC["time"] - _0x6D7E["time"] == 0 &&
    _0x8BBC["type"] == 10
  ) {
    _0x8BBC = _0x8BBC["ts_next"];
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
  var _0x9A48 = "";
  if (_0x6D7E["tie_s"]) {
    var _0x9A17 = _0x6D7E["tie_s"]["istart"];
    _0x9A48 = ' tie="1" ';
  }
  abc["out_svg"](
    '<rect time="' +
      _0x6D7E["time"] +
      '" acttime="' +
      _0x9A79 +
      '" dur="' +
      _0x99E6 +
      '" ' +
      _0x9A48 +
      'style="fill-opacity:0;fill:#0083d0;" data-syncrect="1"  data-type="' +
      (_0x6D7E["nflags"] == 0 && _0x6D7E["dots"] == 1
        ? "dot"
        : "") +
      '" class="abcr _' +
      _0x6D7E["istart"] +
      "_single s" +
      _0x99B5 +
      '" x="'
  );
  abc["out_sxsy"](_0x8C4F, '" y="', _0x8C80);
  abc["out_svg"](
    '" width="' +
      _0x8C1E["toFixed"](2) +
      '" height="' +
      abc["sh"](_0x8BED)["toFixed"](2) +
      '"/>\x0A'
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
      console.log('dblclick::', el.attr('type'));
      if(el.attr('type')=='tempo'){
        return false;
      }
      let type = ''
      const className = el.attr('class')
      content_vue.m.editor.val = el.text()
      if (className === 'f1') type = 'title'
      else if (className === 'f3' || el.attr('type') === 'composer') {
        let index = el.index()
        if (className === 'f2') index ++
        if (index === 2) type = 'compose'
        else if (index === 3) type = 'lyricist'
      }
      else if (className === 'f2') type = 'subTitle'
      content_vue.m.editor.type = type
    })
    var $events = $("svg text[type='title']")["data"]("events");
    // $("svg text[type='title']")["on"]("dblclick", function () {
    //   if (!user["editorStaff"]) {
    //     return false;
    //   }
    //   var _0xC30D = this["getBoundingClientRect"]();
    //   var _0xC33E = document["createElement"]("textarea");
    //   $(_0xC33E)
    //     ["css"]("z-index", 2)
    //     ["css"]("position", "absolute");
    //   $("body")["append"]($(_0xC33E));
    //   var $self = $(this);
    //   $(_0xC33E)
    //     ["val"](getAllTitle())
    //     ["css"]({
    //       left: _0xC30D["left"],
    //       top: _0xC30D["top"],
    //       width: _0xC30D["width"] < 200 ? 200 : _0xC30D["width"],
    //       height: _0xC30D["height"] < 80 ? 80 : _0xC30D["height"],
    //     })
    //     ["show"]()
    //     ["focus"]()
    //     ["on"]("blur", function () {
    //       $self["text"]($(this)["val"]());
    //       $("#T")["val"]($(this)["val"]());
    //       set("T:", $(this)["val"]());
    //       $(this)["css"]("display", "none");
    //       src_change();
    //     });
    // });
    // $("svg text[type='composer']")["on"]("dblclick", function () {
    //   if (!user["editorStaff"]) {
    //     return false;
    //   }
    //   var _0xC30D = this["getBoundingClientRect"]();
    //   var _0xC33E = document["createElement"]("textarea");
    //   $(_0xC33E)
    //     ["css"]("z-index", 2)
    //     ["css"]("position", "absolute");
    //   $("body")["append"]($(_0xC33E));
    //   var $self = $(this);
    //   $(_0xC33E)
    //     ["val"]($("#C")["val"]())
    //     ["css"]({
    //       left: _0xC30D["left"] - 100,
    //       top: _0xC30D["top"] - 50,
    //       width: _0xC30D["width"] + 100,
    //       height: _0xC30D["height"] + 80,
    //     })
    //     ["show"]()
    //     ["focus"]()
    //     ["on"]("blur", function () {
    //       $("#C")["val"]($(this)["val"]());
    //       set("C:", $(this)["val"]());
    //       src_change();
    //       $(this)["remove"]();
    //     });
    // });
    $("path[type='decos']")["click"](function (_0x9395) {
      console["log"](_0x9395["x"]);
      _0x9395["preventDefault"]();
      _0x9395["stopPropagation"]();
    });
    try {
      renderByBarIndex(bgBar);
      renderNoteBgColor();
      renderLyricBgColor();
      renderMySlur("s_slur");
      renderMySlur("k_slur");
      renderMySlur("custom");
      renderMyBracketGch();
      renderMyWaveGch();
      renderMyText();
      if (lyricStandV != 0 && standVsyms == null) {
        standVsyms = getStandVsyms();
      }
    } catch (err) {
      console["log"](err);
    } finally {
      try {
        bgBar = new Array();
      } catch (e) {
        console["log"](e);
      }
    }
  }, 100);
  if (user["noteUpdate"]["active"]) {
    user["noteUpdate"]["active"] = false;
    if (
      graphEditor["pianoImpro"] &&
      typeof graphEditor["pianoImpro"]["noteUpdate"] == "function"
    ) {
      graphEditor["pianoImpro"]["noteUpdate"](
        user["noteUpdate"]["istart"],
        user["noteUpdate"]["lyric"],
        user["noteUpdate"]["line"],
        true,
        false,
        user["noteUpdate"]["clearLyric"]
      );
    }
    if (user["noteUpdate"]["isNext"]) {
      var _0xC27A = syms[user["noteUpdate"]["istart"]];
      var _0x8A96 = 20;
      while (
        _0x8A96 > 0 &&
        _0xC27A &&
        _0xC27A["next"] &&
        (_0xC27A["next"]["type"] == 8 ||
          _0xC27A["next"]["type"] == 10)
      ) {
        _0xC27A = _0xC27A["next"];
        graphEditor["pianoImpro"]["noteUpdate"](
          _0xC27A["istart"],
          user["noteUpdate"]["lyric"],
          user["noteUpdate"]["line"],
          true
        );
        _0x8A96--;
      }
    }
    user["noteUpdate"]["isNext"] = false;
    user["noteUpdate"]["lyric"] = null;
    user["noteUpdate"]["line"] = 0;
    user["noteUpdate"]["clearLyric"] = false;
  } else {
    if (user["noteUpdate"]["isClearPrevNote"]) {
      var abc = $("#source")["val"]();
      if (user["noteUpdate"]["prevNoteIstart"] > -1) {
        var _0xB545 = abc[user["noteUpdate"]["prevNoteIstart"]];
        if (_0xB545 == "." || _0xB545 == "(") {
          abc =
            abc["substring"](0, user["noteUpdate"]["prevNoteIstart"]) +
            abc["substring"](
              user["noteUpdate"]["prevNoteIstart"] + 1,
              abc["length"]
            );
          $("#source")["val"](abc);
          src_change();
        }
      }
      user["noteUpdate"]["isClearPrevNote"] = false;
      user["noteUpdate"]["prevNoteIstart"] = -1;
    }
  }
  if ($("#editorvDiv")["length"] > 0) {
    if ($("#source")["val"]()["indexOf"]("%%voicecombine") > -1) {
      $("#editorvDiv")["css"]("display", "");
    } else {
      $("#editorvDiv")["css"]("display", "none");
    }
  }
}
function editorAnnot(_0x6DAF) {
  console.log("editorAnnot----------", _0x6DAF);
  if (!user["editorAnnot"]) {
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
  console["log"]("--------type:", syms[_0x6DAF]["type"]);
  if (syms[_0x6DAF]["type"] == 14) {
    var _0x6D7E = syms[_0x6DAF];
    if (_0x6D7E["tempo_str1"]) {
      $("#speedDescInput")["val"](_0x6D7E["tempo_str1"]);
    }
    $("#speedDescInput")["attr"]("istart", _0x6DAF);
    $("#CHANGE_SPEED_div .modal-content")["css"](
      "left",
      ($(window)["width"]() - $("#CHANGE_SPEED_div .modal-content")["width"]()) / 2
    );
    $("#CHANGE_SPEED_div")["modal"]("toggle");
    return;
  }
  var _0x9EE0 = false;
  if (syms[_0x6DAF]["type"] == 8 || syms[_0x6DAF]["type"] == 10) {
    _0x9EE0 = true;
  }
  if (!_0x9EE0) {
    return;
  }
  $("#zsistart")["val"](_0x6DAF);
  var _0x6D7E = syms[_0x6DAF];
  var _0x9EAF = _0x6D7E["a_gch"];
  var text = "";
  var _0x9F73 = "";
  var _0x9E4D = "";
  if (_0x9EAF) {
    for (var _0x6D1C = 0; _0x6D1C < _0x9EAF["length"]; _0x6D1C++) {
      text += _0x9EAF[_0x6D1C]["text"];
      _0x9F73 = _0x9EAF[_0x6D1C]["type"];
      _0x9E4D = _0x9EAF[_0x6D1C]["fonttype"];
      if (_0x6D1C != _0x9EAF["length"] - 1) {
        text += "\n";
      }
    }
  }
  if (text["indexOf"]("[font-size:") > -1) {
    var _0x7AE4 = /\[(font-size:.*)\]/["exec"](text);
    var _0x9E7E = "";
    if (_0x7AE4 != null) {
      _0x9E7E = /\[font-size:(.*)\]/["exec"](text)[1];
      text = text["replace"](/\[(font-size:.*)\]/, "");
    }
    text = text["replace"](/\[(font-size:.*)\]/, "");
  }
  text = getGchCoorInfo(text);
  if (_0x9E7E && _0x9E7E != "") {
    $("#annofontsize")["val"](_0x9E7E);
  }
  $("input[name='zspos'][value='" + _0x9F73 + "']")["prop"](
    "checked",
    "checked"
  );
  if (_0x9E4D == "\u2206") {
    $("input[name='fonttype'][value='\u2206']")["prop"]("checked", "checked");
  } else {
    $("input[name='fonttype'][value='']")["prop"]("checked", "checked");
  }
  $("#zsInput")["val"](text);
  var _0x7183 = _0x6D7E["istart"];
  $("text[type='zs'][istart='" + _0x7183 + "']")["addClass"]("selected_text");
  $("#ZS_EDIT_div .modal-content")["css"](
    "left",
    ($(window)["width"]() - $("#ZS_EDIT_div .modal-content")["width"]()) / 2
  );
  $("#ZS_EDIT_div")["modal"]();
}
function getGchCoorInfo(text) {
  var _0xA872 = "";
  $("#xoffset")["val"]("");
  $("#yoffset")["val"]("");
  $("#gchcoor")["val"]("");
  if (xcoorGchReg["test"](text) || ycoorGchReg["test"](text)) {
    var _0xAC77 = xcoorGchReg["exec"](text);
    var _0xACD9 = ycoorGchReg["exec"](text);
    var _0xACA8 = 0;
    var _0xAD0A = 0;
    if (_0xAC77 != null) {
      _0xA872 = _0xAC77[0];
      _0xACA8 = parseInt(_0xAC77[1]);
      $("#xoffset")["val"](_0xACA8);
      text = text["replace"](xcoorGchReg, "");
    }
    if (_0xACD9 != null) {
      _0xA872 = _0xACD9[0];
      _0xAD0A = parseInt(_0xACD9[1]);
      $("#yoffset")["val"](_0xAD0A);
      text = text["replace"](ycoorGchReg, "");
    }
    $("#gchcoor")["val"](_0xA872);
  }
  return text;
}
const setEmoTxt = (txt) => {
  // $("#zsistart")["val"]($($('[type="note"],[type="rest"],[type="splnum_rest"]')[0]).attr('istart'))
  $("#zsistart")["val"]($($(".selected_text")[$(".selected_text").length-1]).attr('istart'))
  $("#zsInput")["val"](txt)
  saveZs()
}
function saveZs() {
  var zsistart = $("#zsistart")["val"]();
  var zsInput = $("#zsInput")["val"]();
  // console.log('zsInput:', zsInput);
  var fonttype = $("input[name='fonttype']:checked")["val"]();
  var zspos = $("input[name='zspos']:checked")["val"]();
  var text = zsInput["split"]("\n");
  // console.log('text:', text);
  if (zsistart != "") {
    zsistart = parseInt(zsistart);
    var cen = syms[zsistart];
    var s_text = "";
    var annofontsize = $("#annofontsize")["val"]();
    var CoorStr = genGchCoorStr();
    for (var i = 0; i < text["length"]; i++) {
      if (text[i] != "") {
        s_text += '"';
        s_text += zspos + fonttype;
        if (annofontsize != "14") {
          s_text += "[font-size:" + annofontsize + "]";
        }
        s_text += text[i] + CoorStr + '"';
      }
    }
    var abc_content = $("#source")["val"]();
    abc_content =
    abc_content["substring"](0, cen["istart"]) +
      s_text +
      abc_content["substring"](cen["istart"]);
    var a_gch = cen["a_gch"];
    if (a_gch != null) {
      for (var i = a_gch.length - 1; i >= 0; i--) {
        var g = a_gch[i];
        abc_content =
        abc_content["substring"](0, g["istart"]) +
        abc_content["substring"](g["iend"]);
      }
    }
    $("#source")["val"](abc_content);
    src_change();
    doLog();
  }else{
    window.top.alert('请选择一个音符');
  }
}
function genGchCoorStr() {
  var _0xA8A3 = $("#xoffset")["val"]();
  var _0xA8D4 = $("#yoffset")["val"]();
  var _0xA872 = "";
  if (_0xA8A3 != "") {
    _0xA872 = "{x:" + _0xA8A3;
  }
  if (_0xA8D4 != "") {
    if (_0xA872 != "") {
      _0xA872 += ",y:" + _0xA8D4;
    } else {
      _0xA872 = "{y:" + _0xA8D4;
    }
  }
  if (_0xA872 != "") {
    _0xA872 += "}";
  }
  return _0xA872;
}
function renderMyText() {
  var _0xA18E = $("#source")["val"]();
  var _0xB38C = /%%beginmytext([\n\r\s\S]*)%%endmytext/;
  var _0x6D4D = _0xA18E["match"](_0xB38C);
  if (_0x6D4D != null) {
    var _0xA1BF = _0x6D4D[1]["split"]("\x0A");
    if (_0xA1BF != null && _0xA1BF["length"] > 0) {
      for (var _0x6D1C = 0; _0x6D1C < _0xA1BF["length"]; _0x6D1C++) {
        var _0x6B32 = _0xA1BF[_0x6D1C];
        if (_0x6B32["replace"](/\s/g, "") != "") {
          var _0x9333 = JSON["parse"](_0x6B32);
          console["log"](_0x9333);
          var _0xB171 = $("svg[index='" + _0x9333["svgIndex"] + "']");
          addText2Svg(
            (_0x9333["x"] * 1.4) / scale,
            _0x9333["y"],
            _0xB171,
            _0x9333["text"]
          );
        }
      }
    }
  }
}
function clickBar(_0x7183, _0x9395) {
  if (typeof isGetBarInfo != "undefined") {
    svgsel(_0x9395);
    return false;
  }
  if (graph_update) {
    $("rect[selected='selected']")
      ["css"]("fill-opacity", "0")
      ["removeAttr"]("selected");
    $("svg[type='rectnode']")["remove"]();
    $("#nodeMenu")["hide"]();
    $("rect[istart='" + _0x7183 + "']")
      ["css"]("fill-opacity", "0.3")
      ["attr"]("selected", "selected");
    $("rect[istart='" + _0x7183 + "']")["addClass"]("selected_text");
    showProperties("nodeline", _0x9395);
    console["log"](_0x7183);
    _0x9395["preventDefault"]();
    _0x9395["stopPropagation"]();
    return false;
  }
}

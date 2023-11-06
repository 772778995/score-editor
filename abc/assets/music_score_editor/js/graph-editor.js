/* graph editor */
var rest = false;
var cen = new Object();
var svgns = "http://www.w3.org/2000/svg";
var xlinkns = "http://www.w3.org/1999/xlink";
var currShape = "#demo_black";
var lastShape = "";
var headModel = "";
var isSelectDeco = false;
var selectDecoType = "";
var selectDecoInfo = null;
var selectGchInfo = null;
var editorV = -1;
var selectedStaffNum = -1;
var hasAddBlank = false;
var dragSplNum = false;
var chordInput = false;
var nearDecoNote = null;
var updateNoteIndexInChord = -1;
var models = {
  "Treble Clef": "%%staffsep 110\x0A%%sysstaffsep 60\x0A%%pagewidth 1500\x0A%%contbarnb 1\x0A%%leftmargin 2\x0A%%rightmargin 10\x0A%%titlefont Microsoft-YaHei 28\x0A%%stretchlast 0.7\x0AI:abc-charset utf-8\x0AX: 1\x0AT: \u6807\u9898\x0AC: \u4f5c\u66f2\x0AQ: 1/4=88\x0AM: 4/4\x0AL: 1/8\x0AK: C\x0AV:1 treble\x0A%%MIDI program 0\x0A",
  "Bass Clef": "%%staffsep 110\x0A%%sysstaffsep 60\x0A%%pagewidth 1500\x0A%%contbarnb 1\x0A%%leftmargin 2\x0A%%rightmargin 10\x0A%%titlefont Microsoft-YaHei 28\x0A%%stretchlast 0.7\x0AI:abc-charset utf-8\x0AX: 1\x0AT: \u6807\u9898\x0AC: \u4f5c\u66f2\x0AQ: 1/4=88\x0AM: 4/4\x0AL: 1/8\x0AK: C\x0AV:1 bass\x0A%%MIDI program 0\x0A",
  "Grand Clef": "%%staffsep 110\x0A%%sysstaffsep 60\x0A%%contbarnb 1\x0A%%leftmargin 2\x0A%%rightmargin 10\x0A%%titlefont Microsoft-YaHei 28\x0A%%stretchlast 0.7\x0AI:abc-charset utf-8\x0AX: 1\x0AT: \u6807\u9898\x0AC: \u4f5c\u66f2\x0AQ: 1/4=88\x0AM: 4/4\x0AL: 1/8\x0AK: C\x0A%%MIDI program 0\x0AV:1 treble\x0A\x0AV:2 bass\x0A",
  SATB: "%%staffsep 110\x0A%%sysstaffsep 60\x0A%%contbarnb 1\x0A%%leftmargin 2\x0A%%rightmargin 10\x0A%%titlefont Microsoft-YaHei 28\x0A%%stretchlast 0.7\x0AI:abc-charset utf-8\x0AX: 1\x0AT: \u6807\u9898\x0AC: \u4f5c\u66f2\x0AQ: 1/4=88\x0AM: 4/4\x0AL: 1/8\x0AK: C\x0A%%MIDI program 0\x0AV:1 treble\x0A\x0AV:2 bass\x0A",
};
var deco_params = {
  jr: { start: "!>(!", end: "!>)!" },
  jq: { start: "!<(!", end: "!<)!" },
  k_slur: { start: "!slur(!", end: "!slur)!" },
  dnb: { start: "v" },
  upb: { start: "u" },
  accent: { start: "!>!" },
  stc: { start: "." },
  emb: { start: "!tenuto!" },
  lmrd: { start: "!mordent!" },
  opend: { start: "!open!" },
  dplus: { start: "!plus!" },
  sgno: { start: "!segno!" },
  brth: { start: "!breath!" },
  sphr: { start: "!shortphrase!" },
  "D.C. al Fine": { start: "!D.C.alfine!" },
  "D.S. al Fine": { start: "!D.S.alfine!" },
  Fine: { start: "!fine!" },
  pedoff: { start: "!ped-up!" },
  slur: { start: "(", end: ")" },
  "8va": { start: "!8va(!", end: "!8va)!" },
  "8vb": { start: "!8vb(!", end: "!8vb)!" },
  "15ma": { start: "!15ma(!", end: "!15ma)!" },
  "15mb": { start: "!15mb(!", end: "!15mb)!" },
  tubrn: { start: "(\\d{1,2}" },
};
var tubrn_rules = {
  3: "/2",
  4: "/4",
  5: "/4",
  6: "/4",
  7: "/4",
  8: "/8",
  9: "/8",
};
graph_update = true;
var graphEditor = { isPlayNote: true, pianoImpro: null };
var fixedLen = false;
var chordNote = "";
var chordNoteLyric = "";
// 鼠标事件
function followMouse(e) {
  console.log('followMouse', e);
  if (rest) {
    return;
  }
  var target = e["target"];
  var tagName = target["tagName"];
  if (tagName != "svg") {
    target = $(target)["parents"]("svg");
  }
  var _0x18687 = document.getElementById("use_black");
  if (
    $(e["target"])
      ["parents"]("svg")
      ["attr"]("id") !=
    $(_0x18687)["parents"]("svg")["attr"]("id")
  ) {
    $("#use_black")["remove"]();
    _0x18687 = null;
  }
  if (!_0x18687) {
    _0x18687 = document["createElementNS"](svgns, "use");
    _0x18687["setAttribute"]("id", "use_black");
    _0x18687["setAttributeNS"](xlinkns, "href", currShape);
    _0x18687["setAttribute"]("x", -10);
    _0x18687["setAttribute"]("y", -10);
    if ($(target)["find"](".g")["length"] > 0) {
      $(target)["find"](".g")["append"]($(_0x18687));
    }
  }
  $("use[type='demo_hl']")["remove"]();
  $(".editor_rect")["removeClass"]("editor_rect");
  editSvgLineIndex = $(_0x18687)
    ["parents"]("svg")
    ["attr"]("id");
  var _0x186B4 = findNearInfo(
    $(_0x18687)["parents"]("svg"),
    e["offsetX"] / scale,
    e["offsetY"] / scale
  );
  if (_0x186B4) {
    cen = syms[_0x186B4["istart"]];
  } else {
    cen = null;
  }
  if (isSelectDeco) {
    if (selectDecoType == "nodeline") {
      moveingRenderBar(e);
    }
    if (selectDecoType == "linkclef") {
      movingRenderStaff(e);
    }
    return;
  }
  var _0x176B5 = getYinfo(
    $(_0x18687)["parents"]("svg"),
    e["offsetY"] / scale
  );
  if (_0x186B4 && _0x176B5) {
    _0x18687["setAttribute"]("x", parseFloat(_0x186B4["x"]));
    _0x18687["setAttribute"]("y", parseFloat(_0x176B5["y"]));
    var _0x175D4 = _0x176B5["num"];
    if (_0x175D4 != 0) {
      draw_short_line(
        _0x175D4,
        parseFloat(_0x186B4["x"]),
        _0x176B5,
        target
      );
    }
    cen["mouse_pos"] = _0x176B5["mouse_pos"];
  } else {
    console["log"]("\u672a\u627e\u5230\u4efb\u4f55\u97f3\u7b26" + new Date());
  }
  rest = true;
  setTimeout(function () {
    rest = false;
  }, 66);
}
function draw_short_line(_0x175D4, _0x16008, _0x176B5, _0x17688) {
  if (_0x175D4 != 0) {
    var _0x17601 = _0x16008 + 4;
    var _0x1762E = parseFloat(_0x176B5["staffY"]);
    if (_0x175D4 > 0) {
      _0x1762E -= 24;
      for (var i = 0; i < _0x175D4; i++) {
        _0x1762E -= 6;
        var _0x1765B = document["createElementNS"](svgns, "use");
        _0x1765B["setAttributeNS"](xlinkns, "href", "#my_hl");
        _0x1765B["setAttribute"]("type", "demo_hl");
        $(_0x17688)["find"](".g")["append"]($(_0x1765B));
        _0x1765B["setAttribute"]("x", _0x17601);
        _0x1765B["setAttribute"]("y", _0x1762E);
      }
    } else {
      for (var i = 0; i > _0x175D4; i--) {
        _0x1762E += 6;
        var _0x1765B = document["createElementNS"](svgns, "use");
        _0x1765B["setAttributeNS"](xlinkns, "href", "#my_hl");
        _0x1765B["setAttribute"]("type", "demo_hl");
        $(_0x17688)["find"](".g")["append"]($(_0x1765B));
        _0x1765B["setAttribute"]("x", _0x17601);
        _0x1765B["setAttribute"]("y", _0x1762E);
      }
    }
  }
}
function findNearInfo(argAAA, argBBB, argCCC) {
  var aaa = "";
  var jqEditorvSelected = $(".editorv.selected");
  if (jqEditorvSelected["length"] > 0) {
    aaa =
      "[v='" +
      (parseInt($(jqEditorvSelected)["attr"]("value")) - 1) +
      "']";
  }
  var bbb = 9999;
  var ccc = 9999;
  var ddd = null;
  var eee = "rect[type='rest']" + aaa + ",rect[type='note']" + aaa + "";
  if (musicType == 2) {
    eee = "rect[type='splnum_note'],rect[type='splnum_rest'],rect[type='splnum_chord']";
  }
  var fff = $(dragObj)["attr"]("value");
  if (fff && fff["indexOf"]("[K:") == 0) {
    eee += ",rect[type='bar']" + aaa + ",rect[type='clef']";
  }
  if ($(dragObj)["attr"]("type") == "all") {
    if (musicType == 2) {
      eee += ",rect[type='splnum_bar']" + aaa + ",rect[type='clef']";
    } else {
      eee += ",rect[type='bar']" + aaa + ",rect[type='clef']";
    }
  }
  if (dragObj != null) {
    // console["log"]($(dragObj)["attr"]("type"));
    if ($(dragObj)["attr"]("type") == "linkclef") {
      return;
    }
    if (musicType == 0) {
      if ($(dragObj)["attr"]("type") == "nodeline") {
        return;
        eee = "rect[type='bar']";
      }
    } else {
      if ($(dragObj)["attr"]("type") == "nodeline") {
        return;
        eee = "rect[type='splnum_bar']";
      }
    }
  }
  $(argAAA)
    ["find"](eee)
    ["each"](function (i, _0x1646D) {
      var ggg = parseFloat($(this)["attr"]("x"));
      var hhh = parseFloat($(this)["attr"]("y"));
      var iii = parseFloat($(this)["attr"]("height"));
      var jjj = parseFloat($(this)["attr"]("width"));
      if (musicType == 2) {
        if ($(_0x1646D)["attr"]("type") != "splnum_bar") {
          var kkk = $(_0x1646D)["parent"]();
          var lll = $(kkk)["attr"]("transform");
          var mmm = getTransformsTranslate(lll);
          ggg = ggg + parseFloat(mmm["x"]);
          hhh = hhh + parseFloat(mmm["y"]);
        }
      }
      if (
        argBBB >= ggg &&
        argBBB <= ggg + jjj &&
        argCCC >= hhh &&
        argCCC <= hhh + iii
      ) {
        ccc = ppp;
        ddd = $(this);
      } else {
        var nnn = Math["abs"](parseFloat(ggg) - argBBB);
        var ooo = Math["abs"](parseFloat(hhh) - argCCC);
        if (nnn > 50) {
          return;
        }
        if (ooo > 50) {
          if (argCCC < hhh) {
            return;
          } else {
            if (argCCC > hhh && argCCC - (hhh + parseFloat(iii)) > 30) {
              return;
            }
          }
        }
        var ppp = 0;
        if (argCCC > parseFloat(hhh) + parseFloat(iii)) {
          var _0x18330 = Math["abs"](
            argCCC - (parseFloat(hhh) + parseFloat(iii))
          );
          ppp = Math["sqrt"](
            Math["pow"](nnn, 2) + Math["pow"](_0x18330, 2)
          );
        } else {
          ppp = Math["sqrt"](
            Math["pow"](nnn, 2) + Math["pow"](ooo, 2)
          );
        }
        if (ppp < 30) {
          if (ppp < ccc) {
            ccc = ppp;
            ddd = $(this);
          }
        }
      }
    });
  var _0x18114 = false;
  if (ddd != null) {
    var _0x181F5 = $(ddd)["attr"]("istart");
    var sym_data = syms[_0x181F5];
    if (sym_data && sym_data["dur"] == sym_data["my_wmeasure"]) {
      _0x18114 = true;
    }
  }
  if (ddd != null) {
    $(".editor_rect")["removeClass"]("editor_rect");
    $("rect[type='rest'],rect[type='note']")["css"]("fill-opacity", "0");
    $(ddd)["addClass"]("editor_rect");
    var _0x17AED = new Object();
    var ts_prev = $(ddd)["prev"]();
    while ($(ts_prev)["attr"]("type") == "dot") {
      ts_prev = $(ts_prev)["prev"]();
    }
    if ($(ts_prev)["is"]("g")) {
      ts_prev = $(ts_prev)["find"]("text");
    }
    var argBBB = $(ts_prev)["attr"]("x");
    _0x17AED["x"] = argBBB;
    _0x17AED["istart"] = $(ddd)["attr"]("istart");
    return _0x17AED;
  } else {
    console["log"]("\u672a\u627e\u5230\u9644\u8fd1\u7684", argBBB, argCCC);
    var nodeInfo = getMouseNode(
      $(argAAA)["attr"]("index"),
      argBBB * scale,
      argCCC * scale
    );
    if (nodeInfo == null) {
      return;
    }
    console["log"]("\u5f53\u524d\u6240\u5728\u7684\u5c0f\u8282\u5e8f\u53f7\uff1a", nodeInfo);
    var LinesInfo = getNodesInfo($("#source")["val"]());
    var _0x1819B = getNodeContent(
      LinesInfo,
      nodeInfo["node_index"],
      nodeInfo["v"]
    );
    _0x1819B = _0x1819B["replace"](/\[.[^\]]*\]/, "")
      ["replace"](/[,'$|]/g, "")
      ["replace"](/\d/g, "")
      ["replace"](/\s/g, "");
    console["log"]("\u5c0f\u8282\u5185\u5bb9\uff1a", _0x1819B);
    if (_0x1819B == "z") {
      var _0x17AED = new Object();
      var argBBB = nodeInfo["nodeline_start"][0] / scale;
      if (argBBB == 0) {
        var _0x1808D = $(argAAA)["find"]("text[type='bclef'],text[type='tclef']")[0];
        if (_0x1808D) {
          argBBB += parseFloat($(_0x1808D)["attr"]("x")) + 40;
        } else {
          argBBB += 60;
        }
      } else {
        argBBB += 20;
      }
      _0x17AED["x"] = argBBB;
      var _0x181C8 = nodeInfo["node_index"];
      if (has_weak_node) {
        _0x181C8--;
      }
      _0x17AED["istart"] = getRestIstart(_0x181C8, nodeInfo["v"]);
      console["log"]("obj.istart:", _0x17AED["istart"]);
      return _0x17AED;
    }
  }
}
function getMouseNode(_0x19D8E, _0x16008, _0x16035) {
  console["log"]("---", _0x16008, _0x16035);
  var _0x19D07 = getStaffNodeCoor(scale, false, 0);
  var _0x19875 = new Array();
  for (var i = 0; i < _0x19D07["length"]; i++) {
    var _0x19CDA = _0x19D07[i];
    var _0x19E15 = _0x19CDA["nodeline_start"][0];
    var _0x19D34 = _0x19CDA["nodeline_end"][0];
    var _0x19E42 = _0x19CDA["nodeline_start"][1];
    var _0x19D61 = _0x19CDA["nodeline_start"][3];
    if (
      _0x16008 >= _0x19E15 &&
      _0x16008 < _0x19D34 &&
      _0x19D8E == _0x19CDA["line"]
    ) {
      _0x19875["push"](_0x19CDA);
    }
  }
  if (_0x19875["length"] == 1) {
    return _0x19875[0];
  } else {
    if (_0x19875["length"] > 1) {
      for (var i = 0; i < _0x19875["length"]; i++) {
        var _0x19CDA = _0x19875[i];
        var _0x1619D = _0x19CDA["nodeline_start"][1];
        var _0x160E9 = _0x19CDA["nodeline_start"][3];
        if (i + 1 < _0x19875["length"]) {
          var _0x19DE8 = _0x19875[i + 1]["nodeline_start"][1];
          var _0x19DBB = _0x19875[i + 1]["nodeline_start"][3];
          _0x160E9 = _0x160E9 + (_0x19DE8 - _0x160E9) / 2;
        } else {
          return _0x19875[i];
        }
        if (_0x16035 < _0x160E9) {
          return _0x19875[i];
        }
      }
    }
  }
  return null;
}
function getNodeContent(LinesInfo, _0x181C8, _0x185A6) {
  for (var i = 0; i < LinesInfo["length"]; i++) {
    var LineInfo = LinesInfo[i];
    if (LineInfo["type"] == "note") {
      var _0x1A112 = LineInfo["nodes"];
      for (var _0x15D0B = 0; _0x15D0B < _0x1A112["length"]; _0x15D0B++) {
        var nodeInfo = _0x1A112[_0x15D0B];
        if (
          nodeInfo["nodeIndex"] == _0x181C8 &&
          nodeInfo["v"] == _0x185A6
        ) {
          return nodeInfo["nodeStr"];
        }
      }
    }
  }
  return "";
}
function getRestIstart(_0x181C8, _0x185A6) {
  console["log"]("nodeIndex:", _0x181C8, _0x185A6);
  for (var i = 0; i < syms["length"]; i++) {
    var sym_data = syms[i];
    if (sym_data && sym_data["type"] == 10) {
      if (
        sym_data["my_wmeasure"] == sym_data["dur"] &&
        sym_data["my_bar_num"] == _0x181C8 &&
        sym_data["v"] == _0x185A6
      ) {
        return sym_data["istart"];
      }
    }
  }
  return -1;
}
var lastStaffY = -1;
function getYinfo(_0x1792B, _0x16035) {
  var _0x168D2 = /translate\((.[^\(]*)\)/;
  var _0x1A301 = 9999;
  var _0x1A3E2 = null;
  var _0x1A32E = null;
  var _0x17AED = new Object();
  $(_0x1792B)
    ["find"]("g[type='staff']")
    ["each"](function (_0x1646D) {
      var _0x17A39 = $(this)["attr"]("transform");
      var ac_abc_content = _0x168D2["exec"](_0x17A39)[1];
      var _0x1A3B5 = ac_abc_content["replace"]("s", "")[
        "split"
      ](",")[1];
      _0x1A3B5 = parseFloat(_0x1A3B5);
      var _0x1A35B = Math["abs"](_0x1A3B5 - _0x16035);
      var _0x1A388 = Math["abs"](_0x1A3B5 - 24 - _0x16035);
      var _0x182A9 = _0x1A35B;
      if (_0x1A388 < _0x1A35B) {
        _0x182A9 = _0x1A388;
      }
      if (_0x182A9 < _0x1A301) {
        _0x1A301 = _0x182A9;
        _0x1A3E2 = $(this);
        _0x1A32E = _0x1A3B5;
      }
    });
  _0x17AED["staffY"] = _0x1A32E;
  var _0x1A40F = _0x1A32E - _0x16035;
  _0x17AED["mouse_pos"] = parseInt(_0x1A40F / 3);
  _0x17AED["y"] = _0x1A32E - parseInt(_0x1A40F / 3) * 3;
  if (_0x1A40F > 0) {
    if (_0x1A40F >= 24) {
      _0x17AED["num"] = parseInt((_0x1A40F - 24) / 6);
    } else {
      _0x17AED["num"] = 0;
    }
  } else {
    _0x17AED["num"] = parseInt(_0x1A40F / 6);
  }
  if (cen == null) {
    console["log"]("cen is null");
    return null;
  }
  if ($(_0x1A3E2)["attr"]("st") != cen["st"]) {
    return null;
  }
  return _0x17AED;
}
function getStaffBotLineY(_0x1792B, _0x16035) {
  var _0x168D2 = /translate\((.[^\(]*)\)/;
  var _0x1A32E = null;
  var _0x1A301 = 9999;
  $(_0x1792B)
    ["find"]("g[type='staff']")
    ["each"](function (_0x1646D) {
      var _0x17A39 = $(this)["attr"]("transform");
      var ac_abc_content = _0x168D2["exec"](_0x17A39)[1];
      var _0x1A3B5 = ac_abc_content["replace"]("s", "")[
        "split"
      ](",")[1];
      _0x1A3B5 = parseFloat(_0x1A3B5);
      var _0x1A35B = Math["abs"](_0x1A3B5 - _0x16035);
      var _0x1A388 = Math["abs"](_0x1A3B5 - 24 - _0x16035);
      var _0x182A9 = _0x1A35B;
      if (_0x1A388 < _0x1A35B) {
        _0x182A9 = _0x1A388;
      }
      if (_0x182A9 < _0x1A301) {
        _0x1A301 = _0x182A9;
        _0x1A32E = _0x1A3B5;
      }
    });
  return _0x1A32E;
}
function genClickNote(_0x16062, _0x18BCD) {
  console.log('genClickNote');
  if (cen == null) {
    return;
  }
  hasAddBlank = false;
  var _0x18C81 = getNewNote(cen);
  var _0x18AEC = _0x18C81["note"];
  if (_0x18BCD) {
    _0x18AEC = _0x18BCD;
  }
  if (rest_status == "selected") {
    _0x18AEC = "z";
  }
  if (chordNote != "") {
    _0x18AEC = chordNote;
  }
  var _0x18C54 = genNoteAndDur(_0x18AEC, cen);
  if (!_0x18C54) {
    return;
  }
  _0x18C54["note"] = _0x18AEC;
  var _0x18BFA = _0x18C54["noteStr"];
  editSplnum["noteUpdate"]["line"] = 0;
  if (cen["in_tuplet"]) {
    _0x18C54["note_dur"] = cen["dur_orig"];
    _0x18C54["noteStr"] = _0x18C54["oriNoteStr"];
    _0x18C54["del_s"] = [];
    _0x18C54["update_dur_s"] = null;
    replaceNote("source", cen["istart"], cen["iend"], _0x18C54);
  } else {
    if (cen["type"] == 10) {
      if (
        graphEditor["pianoImpro"] &&
        graphEditor["pianoImpro"]["isEditLyric"]
      ) {
        editSplnum["noteUpdate"]["active"] = true;
        editSplnum["noteUpdate"]["istart"] =
          _0x18C54["noteStr"][0] == " "
            ? cen["istart"] + 1
            : cen["istart"];
      }
      replaceNote("source", cen["istart"], cen["iend"], _0x18C54);
    } else {
      if (cen["type"] == 8) {
        var _0x18C27 = cen["dur"];
        if (cen["tie_s"]) {
          _0x18C27 += cen["tie_s"]["dur"];
        }
        if (_0x18C27 == durSetting) {
          var _0x18A0B = genChordNote(cen, _0x18AEC, durSetting);
          if (rest_status == "" && chordNote == "") {
            _0x18C54["noteStr"] = _0x18A0B["chordNoteStr"];
          }
          if (
            graphEditor["pianoImpro"] &&
            graphEditor["pianoImpro"]["isEditLyric"]
          ) {
            editSplnum["noteUpdate"]["active"] = true;
            editSplnum["noteUpdate"]["istart"] =
              _0x18C54["noteStr"][0] == " "
                ? cen["istart"] + 1
                : cen["istart"];
          }
          replaceNote(
            "source",
            cen["istart"],
            cen["iend"],
            _0x18C54
          );
        } else {
          _0x18C54["note_dur"] = durSetting;
          if (
            graphEditor["pianoImpro"] &&
            graphEditor["pianoImpro"]["isEditLyric"]
          ) {
            editSplnum["noteUpdate"]["active"] = true;
            editSplnum["noteUpdate"]["istart"] =
              _0x18C54["noteStr"][0] == " "
                ? cen["istart"] + 1
                : cen["istart"];
          }
          replaceNote(
            "source",
            cen["istart"],
            cen["iend"],
            _0x18C54
          );
        }
      }
    }
  }
  if (rest_status == "selected") {
    cen = null;
    return;
  }
  var _0x18CDB = new Array();
  if (_0x18AEC["indexOf"]("[") > -1) {
    var notes = _0x18AEC["match"](/[=_^]{0,1}[a-gA-G][,']{0,1}/g);
    for (var i = 0; i < notes["length"]; i++) {
      var _0x18CAE = new Object();
      _0x18CAE["pitch"] = findIndexByNote(notes[i]);
      _0x18CAE["dur"] = durSetting;
      _0x18CAE["time"] = 0;
      _0x18CDB["push"](_0x18CAE);
    }
    play_notes(_0x18CDB);
    cen = null;
    return;
  }
  var _0x18CAE = new Object();
  _0x18CAE["pitch"] = _0x18C81["note_seq"];
  _0x18CAE["dur"] = durSetting;
  _0x18CAE["time"] = 0;
  _0x18CDB["push"](_0x18CAE);
  if (_0x18AEC && _0x18AEC["indexOf"]("z") == -1) {
    play_notes(_0x18CDB);
  }
  cen = null;
}
function getNewNote(cen) {
  var position = cen["mouse_pos"];
  var notes = cen["notes"];
  var _0x1A031 = 0;
  if (notes) {
    var _0x19FD7 = notes[0];
    var _0x1A004 = _0x19FD7["opit"];
    var _0x1A05E = _0x19FD7["pit"];
    if (_0x1A004) {
      if (_0x1A004 - _0x1A05E == 7) {
        _0x1A031 = 12;
      } else {
        if (_0x1A004 - _0x1A05E == -7) {
          _0x1A031 = -12;
        } else {
          if (_0x1A004 - _0x1A05E == 14) {
            _0x1A031 = 24;
          } else {
            if (_0x1A004 - _0x1A05E == -14) {
              _0x1A031 = -24;
            }
          }
        }
      }
    }
  }
  if (cen["octave"]) {
    _0x1A031 -= cen["octave"] * 12;
  }
  var _0x19F50 = cen["clef_type"];
  var _0x17AED = new Object();
  var _0x18AEC = "";
  var _0x19FAA = -1;
  if (_0x19F50 == "t") {
    var _0x1A08B = [1, 2, 2, 2, 1, 2, 2];
    var _0x1A0B8 = [2, 2, 1, 2, 2, 2, 1];
    var _0x1A0E5 = 64;
    var _0x18BCD = parseInt(position / 7);
    var _0x185A6 = position % 7;
    var _0x17250 = 0;
    if (position >= 0) {
      _0x17250 = _0x18BCD * 12 + getArrSum(_0x1A08B, _0x185A6);
    } else {
      if (position < 0) {
        _0x17250 =
          _0x18BCD * 12 - getArrSum(_0x1A0B8, Math["abs"](_0x185A6));
      }
    }
    _0x19FAA = _0x1A0E5 + _0x17250;
  } else {
    if (_0x19F50 == "b") {
      var _0x19E9C = [2, 2, 1, 2, 2, 1, 2];
      var _0x19EC9 = [2, 1, 2, 2, 1, 2, 2];
      var _0x19EF6 = 43;
      var _0x18BCD = parseInt(position / 7);
      var _0x185A6 = position % 7;
      var _0x17250 = 0;
      if (position >= 0) {
        _0x17250 = _0x18BCD * 12 + getArrSum(_0x19E9C, _0x185A6);
      } else {
        if (position < 0) {
          _0x17250 =
            _0x18BCD * 12 - getArrSum(_0x19EC9, Math["abs"](_0x185A6));
        }
      }
      _0x19FAA = _0x19EF6 + _0x17250;
    } else {
      if (_0x19F50 === "p") {
        _0x19FAA = 71;
        _0x1A031 = 0;
      } else {
        if (_0x19F50 == "c") {
          var _0x19F23 = 0;
          for (var i = cen["istart"]; i > 0; i--) {
            var _0x19F7D = syms[i];
            if (_0x19F7D && _0x19F7D["type"] == 1) {
              if (_0x19F7D["clef_type"] == "c") {
                _0x19F23 = _0x19F7D["clef_line"];
                break;
              }
            }
          }
          if (_0x19F23 == 3) {
            var _0x1A08B = [2, 2, 2, 1, 2, 2, 1];
            var _0x1A0B8 = [1, 2, 2, 1, 2, 2, 2];
            var _0x19E6F = 53;
            var _0x18BCD = parseInt(position / 7);
            var _0x185A6 = position % 7;
            var _0x17250 = 0;
            if (position >= 0) {
              _0x17250 = _0x18BCD * 12 + getArrSum(_0x1A08B, _0x185A6);
            } else {
              if (position < 0) {
                _0x17250 =
                  _0x18BCD * 12 -
                  getArrSum(_0x1A0B8, Math["abs"](_0x185A6));
              }
            }
            _0x19FAA = _0x19E6F + _0x17250;
          } else {
            if (_0x19F23 == 4) {
              var _0x1A08B = [2, 1, 2, 2, 2, 1, 2];
              var _0x1A0B8 = [2, 1, 2, 2, 2, 1, 2];
              var _0x19E6F = 50;
              var _0x18BCD = parseInt(position / 7);
              var _0x185A6 = position % 7;
              var _0x17250 = 0;
              if (position >= 0) {
                _0x17250 = _0x18BCD * 12 + getArrSum(_0x1A08B, _0x185A6);
              } else {
                if (position < 0) {
                  _0x17250 =
                    _0x18BCD * 12 -
                    getArrSum(_0x1A0B8, Math["abs"](_0x185A6));
                }
              }
              _0x19FAA = _0x19E6F + _0x17250;
            }
          }
        }
      }
    }
  }
  _0x18AEC = findStandNoteByIndex(_0x19FAA + _0x1A031);
  _0x17AED["note"] = _0x18AEC;
  _0x17AED["note_seq"] = _0x19FAA + _0x1A031;
  return _0x17AED;
}
function genChordNote(cen, _0x18AEC) {
  var _0x18A0B = new Object();
  var abc_content = $("#source")["val"]();
  var ac_abc_content = abc_content["substring"](cen["istart"], cen["iend"]);
  var _0x18ABF = "";
  var _0x18BA0 = cen["p_v"]["ulen"];
  var _0x18A65 = cen["dur"];
  if (cen["tie_s"]) {
    var _0x18B19 = cen["tie_s"];
    var _0x18B46 = abc_content["substring"](
      _0x18B19["istart"],
      _0x18B19["iend"]
    );
    if (_0x18B46["indexOf"]("[") > -1) {
      _0x18B46 = _0x18B46["replace"]("[", "")["replace"](
        "]",
        ""
      );
    }
    var _0x18A92 =
      _0x18B46 + _0x18AEC + getLenStr(_0x18BA0, _0x18B19["dur"]);
    _0x18A0B["tie_str"] = "[" + _0x18A92 + "]";
  }
  if (ac_abc_content["indexOf"]("[") > -1) {
    var _0x18A38 = /\[(.[^\[]*)\]/;
    var _0x17D09 = ac_abc_content["match"](_0x18A38);
    if (
      _0x17D09[1] !=
      ac_abc_content["replace"]("[", "")["replace"](
        "]",
        ""
      )
    ) {
      _0x18ABF =
        "[" +
        _0x17D09[1] +
        _0x18AEC +
        "]" +
        getLenStr(_0x18BA0, _0x18A65);
    } else {
      _0x18ABF =
        "[" +
        ac_abc_content["replace"]("[", "")["replace"](
          "]",
          ""
        ) +
        _0x18AEC +
        getLenStr(_0x18BA0, _0x18A65) +
        "]";
    }
  } else {
    var _0x18B73 = "";
    if (cen["tie_s"]) {
      _0x18B73 = "-";
    }
    _0x18ABF =
      "[" +
      ac_abc_content +
      _0x18AEC +
      getLenStr(_0x18BA0, _0x18A65) +
      _0x18B73 +
      "]";
  }
  _0x18A0B["chordNoteStr"] = _0x18ABF;
  return _0x18A0B;
}

// 查找小节内前面音符是否存在自定属性
function checkPrevNoteAttr(sym, attr_arr){
  var status = false;
  if(sym){
    var item = null;
    for(var i=0; i<attr_arr.length; i++){
      if(item){
        if(item[attr_arr[i]]){
          if(i==attr_arr.length-1){
            status = true;
          }
        }
      }else{
        if(sym[attr_arr[i]]){
          if(i==attr_arr.length-1){
            status = true;
          }
        }
      }
    }
    if(!status && sym['prev'] && (typeof sym['prev']['bar_type']=='undefined' || sym['prev']['bar_type']!='|')){
      return checkPrevNoteAttr(sym['prev'], attr_arr);
    }
  }
  return status;
}

function genNoteAndDur(note_str, cen, _0x1916D, dur_s, is_t) {
  console.log('genNoteAndDur:', note_str, cen, _0x1916D, dur_s, is_t);
  if (!cen || !cen["p_v"]) {
    return;
  }
  durSetting = durSetting - 0;
  var _0x17AED = new Object();
  var _0x18F7E = 384;
  var abc_content = $("#source").val();
  var _0x18FAB = beatSum(cen);
  var _0x18FD8 = "";
  var _0x17115 = abc_content.substring(cen["istart"], cen["iend"]);
  if (_0x18FAB != 0 && parseInt(_0x18FAB) == _0x18FAB) {
    if (abc_content.substr(cen["istart"] - 1, 1) != " ") {
      if(!checkPrevNoteAttr(cen, ['a_gch'])){
        _0x18FD8 = " ";
        hasAddBlank = true;
        console.log('hasAddBlank');
      }
    }
  }
  var _0x18C27 = cen["dur"];
  if (user["pasteNote"]) {
    _0x18C27 = cen["dur"];
  }
  var _0x19005 = new Array();
  var _0x191C7 = null;
  var _0x18BA0 = cen["p_v"]["ulen"];
  _0x17AED["ulen"] = _0x18BA0;
  _0x17AED["note_dur"] = durSetting;
  var _0x1905F = durSetting;
  if (user["pasteNote"]) {
    if (user["copyNoteInfo"]["dur"]) {
      durSetting = user["copyNoteInfo"]["dur"];
    } else {
      durSetting = user["copyNoteInfo"]["s"]["dur"];
    }
    _0x17AED["note_dur"] = durSetting;
  }
  if (
    !_0x1916D &&
    graph_update &&
    midiInStatus == false &&
    !user["pasteNote"] &&
    !is_t
  ) {
    _0x18FD8 = "";
    _0x17AED["noteStr"] = _0x17115.replace(/[a-gA-G_^=,']*/, note_str);
    _0x17AED["del_s"] = _0x19005;
    _0x17AED["update_dur_s"] = _0x191C7;
    return _0x17AED;
  }
  var _0x1908C = parseInt(durSetting) + 0;
  var _0x1919A = /([\/0-9]+)/g;
  if (_0x1916D) {
    durSetting = dur_s;
    fixedLen = true;
  }
  if (cen["grace"]) {
    var _0x17115 =
      note_str + (!fixedLen ? getLenStr(_0x18BA0, durSetting) : "");
    if (user["pasteNote"]) {
      _0x17115 = note_str;
    }
    _0x17AED["oriNoteStr"] = _0x17115;
    _0x17AED["noteStr"] = _0x17115;
  } else {
    if (cen["in_tuplet"]) {
      var _0x17115 =
        note_str +
        (!fixedLen ? getLenStr(_0x18BA0, cen["dur_orig"]) : "");
      if (user["pasteNote"]) {
        _0x17115 = note_str;
      }
      console.log('new noteStr1:', '|'+_0x17115+'|');
      _0x17AED["oriNoteStr"] = _0x17115;
      _0x17AED["noteStr"] = _0x17115;
    } else {
      if (_0x18C27 == durSetting) {
        var _0x17115 =
          note_str + (!fixedLen ? getLenStr(_0x18BA0, durSetting) : "");
        console.log('new noteStr2:', '|'+_0x17115+'|');
        if (user["pasteNote"]) {
          _0x17115 = note_str;
        } else {
          if (cen["notes"]["length"] > 0) {
            if (
              $(".selected_text")["length"] > 0 &&
              cen["notes"]["length"] > 1
            ) {
              var _0x191F4 = parseInt(
                $(".selected_text")["attr"]("update_index")
              );
              if (isNaN(_0x191F4)) {
              } else {
                var _0x190E6 = abc_content["substring"](
                  cen["istart"],
                  cen["iend"]
                );
                var _0x1708E = str2notes(
                  _0x190E6["replace"](/[\[\]]/g, "")
                );
                console["log"]("当前修改的音符是：", _0x1708E[_0x191F4]);
                var _0x19221 = _0x1708E[_0x191F4]["note"];
                _0x17115 = _0x190E6["replace"](_0x19221, _0x17115);
              }
            }
          }
        }
        console.log('new noteStr3:', '|'+_0x18FD8+'|', '|'+_0x17115+'|');
        _0x17AED["oriNoteStr"] = _0x17115;
        _0x17AED["noteStr"] = _0x18FD8 + _0x17115;
      } else {
        if (_0x18C27 < durSetting) {
          var _0x19032 = durSetting - _0x18C27;
          var ts_next = cen["next"];
          while (ts_next) {
            if (ts_next["type"] != 8 && ts_next["type"] != 10) {
              if (ts_next["type"] == 0) {
                _0x17AED["del_nodeline"] = 1;
                _0x17AED["dur_nodeline_behind"] = _0x19032;
              }
              _0x19005["push"](abc["clone"](ts_next, 2));
              ts_next = ts_next["next"];
              if (ts_next == null) {
                for (
                  var i = cen["istart"] + 1,
                    _0x1881C = syms["length"];
                  i < _0x1881C;
                  i++
                ) {
                  var _0x18BCD = syms[i];
                  if (_0x18BCD) {
                    if (
                      _0x18BCD["v"] == cen["v"] &&
                      (_0x18BCD["type"] == 8 ||
                        _0x18BCD["type"] == 10)
                    ) {
                      ts_next = _0x18BCD;
                      break;
                    }
                  }
                }
              }
              continue;
            }
            if (
              (ts_next["type"] == 8 || ts_next["type"] == 10) &&
              ts_next["dur"] <= _0x19032
            ) {
              _0x19032 = _0x19032 - ts_next["dur"];
              if (_0x19032 <= 0) {
                if (_0x19032 == 0) {
                  _0x19005["push"](abc["clone"](ts_next, 2));
                } else {
                  if (_0x19032 < 0) {
                    _0x191C7 = ts_next;
                    _0x191C7["dur"] = ts_next["dur"] - _0x19032;
                    _0x191C7["dur_orig"] = _0x191C7["dur"];
                    _0x191C7["notes"]["forEach"](function (
                      _0x1646D,
                      i
                    ) {
                      _0x191C7["notes"][i]["dur"] =
                        _0x191C7["dur"];
                    });
                    var _0x1924E = abc_content["substring"](
                      _0x191C7["istart"],
                      _0x191C7["iend"]
                    );
                    _0x1924E = _0x1924E["replace"](_0x1919A, "");
                    _0x191C7["restStr"] =
                      _0x1924E +
                      getDurStrByNoteDur(_0x191C7["dur"], _0x18BA0);
                  }
                }
                break;
              }
              _0x19005["push"](abc["clone"](ts_next, 2));
              ts_next = ts_next["next"];
            } else {
              _0x191C7 = ts_next;
              _0x191C7["dur"] = ts_next["dur"] - _0x19032;
              _0x191C7["dur_orig"] = _0x191C7["dur"];
              _0x191C7["notes"]["forEach"](function (
                _0x1646D,
                i
              ) {
                _0x191C7["notes"][i]["dur"] =
                  _0x191C7["dur"];
              });
              var _0x1924E = abc_content["substring"](
                _0x191C7["istart"],
                _0x191C7["iend"]
              );
              _0x1924E = _0x1924E["replace"](_0x1919A, "");
              _0x191C7["restStr"] =
                _0x1924E + getDurStrByNoteDur(_0x191C7["dur"], _0x18BA0);
              break;
            }
          }
          var _0x17115 =
            note_str +
            (!fixedLen ? getLenStr(_0x18BA0, durSetting) : "");
          console.log('new note_str:', note_str, _0x18BA0, durSetting, _0x17115);
          if (user["pasteNote"]) {
            _0x17115 = note_str;
          }
          _0x17AED["oriNoteStr"] = _0x17115;
          _0x17AED["noteStr"] = _0x18FD8 + _0x17115;
          console.log('new noteStr4:', '|'+_0x18FD8+'|', '|'+_0x17115+'|');
        } else {
          var _0x19032 = _0x18C27 - durSetting;
          var _0x19113 = "";
          if (_0x19032 >= durSetting) {
            if (dot_selected_value != "") {
              _0x19113 +=
                "z," +
                getLenStr(_0x18BA0, durSettingNotDot * 2 - durSetting);
              _0x19032 = _0x19032 - (durSettingNotDot * 2 - durSetting);
              for (var i = 2; i < 20; i = i * 2) {
                if (_0x19032 > 0) {
                  if (_0x19032 - durSettingNotDot * i > 0) {
                    _0x19113 +=
                      "z," +
                      getLenStr(_0x18BA0, durSettingNotDot * i);
                  } else {
                    _0x19113 += "z," + getLenStr(_0x18BA0, _0x19032);
                    _0x19032 = 0;
                    break;
                  }
                  _0x19032 = _0x19032 - durSettingNotDot * i;
                } else {
                  break;
                }
              }
            } else {
              _0x19113 += "z," + getLenStr(_0x18BA0, durSetting);
              _0x19032 = _0x19032 - durSetting;
              for (var i = 2; i < 20; i = i * 2) {
                if (_0x19032 > 0) {
                  if (_0x19032 - durSetting * i > 0) {
                    _0x19113 +=
                      "z," + getLenStr(_0x18BA0, durSetting * i);
                  } else {
                    _0x19113 += "z," + getLenStr(_0x18BA0, _0x19032);
                    _0x19032 = 0;
                    break;
                  }
                  _0x19032 = _0x19032 - durSetting * i;
                } else {
                  break;
                }
              }
            }
          } else {
            _0x19113 += "z," + getLenStr(_0x18BA0, _0x19032);
          }
          var _0x17115 =
            note_str +
            (!fixedLen ? getLenStr(_0x18BA0, durSetting) : "");
          if (user["pasteNote"]) {
            _0x17115 = note_str;
          }
          _0x17AED["oriNoteStr"] = _0x17115;
          _0x17AED["noteStr"] = _0x18FD8 + _0x17115 + _0x19113;
          console.log('new noteStr5:', '|'+_0x18FD8+'|', '|'+_0x17115+'|', '|'+_0x19113+'|');
        }
      }
    }
  }
  if (_0x1916D) {
    fixedLen = false;
  }
  durSetting = _0x1908C;
  _0x17AED["del_s"] = _0x19005;
  _0x17AED["update_dur_s"] = _0x191C7;
  if (user["pasteNote"]) {
    durSetting = _0x1905F;
  }
  return _0x17AED;
}

function genRestStrByDur(_0x18BA0, _0x18C27, _0x1970D) {
  return "z," + getDurStrByNoteDur(_0x18C27, _0x18BA0);
  if (1 == 1) {
    return;
  }
  var _0x196B3 = _0x1970D;
  var _0x19032 = _0x18C27 - _0x196B3;
  var _0x19113 = "";
  if (_0x19032 >= _0x196B3) {
    var _0x196E0 = getLenStr(_0x18BA0, _0x196B3);
    _0x19113 += "z" + _0x196E0;
    var _0x16332 = 0;
    for (var i = 2; i < 20; i = i * 2) {
      if (_0x19032 > 0) {
        _0x19113 += "z" + getLenStr(_0x18BA0, _0x196B3 * i);
        _0x19032 = _0x19032 - _0x196B3 * i * 2;
      }
    }
  } else {
    if (_0x19032 == 0) {
      _0x19032 = _0x18C27;
    }
    _0x19113 += "z" + getLenStr(_0x18BA0, _0x19032);
  }
  return _0x19113;
}
function beatSum(cen) {
  var _0x16143 = 0;
  for (var i = cen["istart"] - 1; i > 0; i--) {
    if (syms[i] && syms[i]["type"] == 0) {
      break;
    }
    if (!syms[i]) {
      continue;
    }
    if (syms[i]["type"] == 8 || syms[i]["type"] == 10) {
      var sym_data = syms[i];
      if (sym_data["in_tuplet"]) {
        _0x16143 += sym_data["dur"];
      } else {
        _0x16143 += sym_data["dur_orig"];
      }
    }
  }
  var _0x16116 = cen["my_meter"];
  if (_0x16116 != null && _0x16116["length"] > 0) {
    var _0x1619D = _0x16116[0]["top"];
    var _0x160E9 = _0x16116[0]["bot"];
    if (_0x1619D % 3 == 0 && _0x160E9 == 8) {
      return _0x16143 / 576;
    }
  }
  return _0x16143 / 384;
}
function getLastMeter(istart) {
  var _0x17AED = new Object();
  _0x17AED["wmeasure"] = 768;
  _0x17AED["beat"] = 2;
  _0x17AED["perBeat"] = 384;
  for (var i = istart; i > 0; i--) {
    if (!syms[i]) {
      continue;
    }
    if (syms[i]["type"] == 6) {
      _0x17AED["wmeasure"] = syms[i]["wmeasure"];
      _0x17AED["beat"] = syms[i]["a_meter"][0]["top"];
    }
  }
  return _0x17AED;
}
function getLenStr(_0x18BA0, _0x1881C) {
  if (_0x1881C == 0) {
    return "";
  }
  return getDurStrByNoteDur(_0x1881C, _0x18BA0);
}
function replaceNote(source_seleter, istart, iend, g_note_obj) {
  console.log('replaceNote', source_seleter, istart, iend, g_note_obj);
  console.log(update_note_istart);
  if (update_note_istart < istart || update_note_istart > iend) {
    update_note_istart = -1;
  }
  var noteStr = g_note_obj["noteStr"];
  var abc_content = $("#" + source_seleter)["val"]();
  var del_s = g_note_obj["del_s"];
  var update_dur_s = g_note_obj["update_dur_s"];
  var update_sel_note_str = "";
  var update_near_note_str = "";
  if (del_s["length"] > 0) {
    for (var i = del_s["length"] - 1; i >= 0; i--) {
      var sym_data = del_s[i];
      if (sym_data["type"] == 8) {
        if (
          graphEditor["pianoImpro"] &&
          typeof graphEditor["pianoImpro"]["noteUpdate"] == "function"
        ) {
          abc_content = graphEditor["pianoImpro"]["noteUpdate"](
            sym_data["istart"],
            ""
          );
        }
      }
    }
    del_s["forEach"](function (sym_data) {
      if (sym_data["type"] == 0) {
        update_sel_note_str = abc_content["substring"](
          sym_data["istart"],
          sym_data["iend"]
        );
        if (abc_content["substr"](sym_data["iend"], 1) == "$") {
          update_sel_note_str += "$";
        }
      }
      iend = sym_data["iend"];
    });
  }
  if (update_dur_s != null) {
    iend = update_dur_s["iend"];
  }
  // console.log(noteStr);
  if (update_sel_note_str != "" && g_note_obj["dur_nodeline_behind"]) {
    var my_wmeasure = syms[istart]["my_wmeasure"];
    noteStr = getNoteStr_(my_wmeasure, g_note_obj);
    update_near_note_str =
      g_note_obj["note"] +
      getLenStr(g_note_obj["ulen"], g_note_obj["dur_nodeline_behind"]);
    if (update_dur_s != null) {
      update_near_note_str += update_dur_s["restStr"];
    }
  } else {
    if (update_dur_s != null) {
      update_near_note_str += update_dur_s["restStr"];
    }
  }
  // console.log(noteStr);
  // console.log(noteStr, update_sel_note_str, update_near_note_str);
  abc_content =
    abc_content["substr"](0, istart) +
    noteStr +
    update_sel_note_str +
    update_near_note_str +
    abc_content["substr"](iend);
    // console.log(abc_content);
  abc_content = replaceBlankLine(abc_content);
  // console.log(abc_content);
  $("#" + source_seleter)["val"](abc_content);
  doLog();
  if (musicType == 2) {
    hasTempo = false;
    render();
  } else {
    render();
  }
  if (
    chordNote != "" &&
    (!graphEditor["pianoImpro"] || !graphEditor["pianoImpro"]["isOpen"])
  ) {
    setTimeout(function () {
      if (hasAddBlank) {
        istart = parseInt(istart) + 1;
      }
      var sym_data = syms[istart];
      updateLyrics(sym_data, [chordNoteLyric]);
    }, 100);
  }
  if (user["midiInput"]) {
    var near_note_obj = $("svg ." + istart);
    if (near_note_obj["length"] > 0) {
      near_note_obj[0]["scrollIntoView"]();
    }
  }
  if ($("#micInput")["hasClass"]("menu-pressed")) {
    var n_istart = syms[istart];
    if (n_istart) {
      console["log"]("micInput:", istart);
      var near_note_obj = $("svg ." + n_istart["istart"] + "[x]");
      if (near_note_obj["length"] > 0) {
        var _0x16008 =
          parseInt($($(near_note_obj)[0])["attr"]("x")) * scale;
        var _0x1770F = $(".right-top-content")["width"]();
        if (_0x16008 > _0x1770F / 2) {
          $(".right-top-content")
            ["stop"]()
            ["animate"](
              { scrollLeft: _0x16008 - _0x1770F / 2 + "px" },
              1000
            );
        }
      }
    }
  }
  if (
    update_dur_s != null &&
    graphEditor["pianoImpro"] &&
    typeof graphEditor["pianoImpro"]["noteUpdate"] == "function"
  ) {
    if (!syms[istart]) {
      return;
    }
    var ts_next = syms[istart]["next"];
    var i = 20;
    while (ts_next && i > 0) {
      if (ts_next["type"] == 10) {
        graphEditor["pianoImpro"]["noteUpdate"](ts_next["istart"]);
      } else {
        if (ts_next["type"] == 0) {
          ts_next = null;
          i = 0;
          break;
        }
      }
      ts_next = ts_next["next"];
      i--;
    }
  }
}

function getNoteStr_(my_wmeasure, g_note_obj) {
  // console.log('getNoteStr_', my_wmeasure, g_note_obj);
  var dur = g_note_obj["note_dur"] - g_note_obj["dur_nodeline_behind"];
  var note_arr = new Array();
  while (dur > my_wmeasure) {
    var ac_abc_content =
      g_note_obj["note"] +
      getLenStr(g_note_obj["ulen"], my_wmeasure) +
      "- ";
      note_arr.push(ac_abc_content);
    dur = dur - my_wmeasure;
  }
  // console.log(note_arr);
  if (dur > 0) {
    var ac_abc_content =
      g_note_obj["note"] +
      getLenStr(g_note_obj["ulen"], dur) +
      "- ";
      note_arr.push(ac_abc_content);
  }
  // console.log(note_arr);
  var new_content = "";
  if (note_arr.length > 0) {
    for (var i = note_arr.length; i > 0; i--) {
      if (i > 1) {
        new_content += note_arr[i - 1] + "|";
      } else {
        new_content += note_arr[i - 1];
      }
    }
  }
  return new_content;
}

function getArrSum(_0x19875, _0x18D35) {
  var _0x198A2 = 0;
  for (var i = 0; i < _0x18D35; i++) {
    _0x198A2 += _0x19875[i];
  }
  return _0x198A2;
}
function play_note(_0x1B13E, _0x18A65) {
  var _0x18CDB = new Array();
  var _0x18CAE = new Object();
  _0x18CAE["pitch"] = _0x1B13E;
  _0x18CAE["dur"] = _0x18A65;
  _0x18CAE["time"] = 0;
  _0x18CDB["push"](_0x18CAE);
  if (_0x1B13E != -1) {
    play_notes(_0x18CDB);
  }
}
function play_notes(notes) {
  if (!graphEditor["isPlayNote"]) {
    return;
  }
  var _0x1B198 = 768;
  for (var i = 0; i < syms["length"]; i++) {
    if (syms[i]) {
      var sym_data = syms[i];
      if (sym_data["tempo"]) {
        var _0x17BA1 = 0;
        var _0x18BCD = sym_data["tempo_notes"]["length"];
        for (j = 0; j < _0x18BCD; j++) {
          _0x17BA1 += sym_data["tempo_notes"][j];
        }
        _0x1B198 = (_0x17BA1 * sym_data["tempo"]) / 60;
        break;
      }
    }
  }
  var _0x1B16B = new Array();
  var _0x1B1C5 = 0;
  for (var i = 0; i < notes["length"]; i++) {
    var _0x18AEC = new Float32Array(7);
    _0x18AEC[0] = -1;
    _0x18AEC[1] = notes[i]["time"];
    _0x18AEC[2] = 0;
    _0x18AEC[3] = notes[i]["pitch"];
    _0x18AEC[4] = parseInt(notes[i]["dur"]) / _0x1B198;
    _0x18AEC[5] = 1;
    _0x18AEC[6] = 0;
    _0x1B16B["push"](_0x18AEC);
  }
  if (typeof doPlayNotes == "function") {
    doPlayNotes(_0x1B16B);
  } else {
    play["abcplay"]["play"](0, _0x1B16B["length"], _0x1B16B);
  }
}
var delObj = null;
var svgArr = new Array();
var clickTimeMill = -1;
function graphMouseDownHandle(_0x1A4C3) {
  console.log('graphMouseDownHandle', content_vue.m.editor.type, content_vue.m.editor.val);
  if(content_vue.m.editor.type){
    content_vue.m.o_editor = { ...content_vue.m.editor };
    // editor 关闭前保存好数据
  }
  if ($("rect[type='startpoint']")["length"]) {
    src_change();
    return;
  }
  $("rect[type!='bg_rect']")["css"]("fill-opacity", "0");
  $("rect[type='splplaceholder']")["css"]("fill-opacity", "");
  $("rect[recttype='movedragger']")["remove"]();
  var _0x167F1 = document.getElementById("source");
  if (window["getSelection"]) {
    if (
      _0x167F1["selectionStart"] != undefined &&
      _0x167F1["selectionEnd"] != undefined
    ) {
      if (_0x167F1["selectionStart"] != _0x167F1["selectionEnd"]) {
        _0x167F1["blur"]();
        _0x167F1["focus"]();
        _0x167F1["selectionStart"] = 0;
        _0x167F1["selectionEnd"] = 0;
      }
    }
  }
  clickTimeMill = new Date()["getTime"]();
  if (_0x1A4C3["path"]) {
    var _0x1A577 = $(_0x1A4C3["path"][0])["attr"]("type");
    if (_0x1A577 == "brace" || _0x1A577 == "bracket") {
      $(".selected_text")["removeClass"]("selected_text");
      $('rect[dragtype="linkclef"]')["remove"]();
      return;
    }
  }
  $("#ctxMenu")["hide"]();
  $('[cat="decos"]')["removeAttr"]("selected");
  $('[cat="decos"]')["removeClass"]("selected_path");
  $('text[type="zs"]')["removeAttr"]("selected");
  $('text[type="zs"]')["css"]("color", "");
  $('rect[type="bar"][selected="selected"]')
    ["css"]("fill-opacity", "0")
    ["removeAttr"]("selected");
  console["log"]("dragDecoFlag:", dragDecoFlag);
  if (!dragDecoFlag) {
    $("rect[dragtype]")["remove"]();
  }
  $("[cat='decos']")
    ["css"]("color", "")
    ["removeAttr"]("fill");
  $("text[type='hd'],text[type='HD']")["css"]("color", "");
  $("g[style]")["css"]("color", "");
  $(".editor-div")["blur"]();
  if (!_0x1A4C3["ctrlKey"] && _0x1A4C3["button"] != 2) {
    $(".selected_text")["removeClass"]("selected_text");
    $(".select_text_g")["removeClass"]("select_text_g");
    $('text[type="lyric"]')["removeAttr"]("selected");
    $('text[type="lyric"]')["each"](function (i, _0x1646D) {
      var _0x1A5D1 = $(_0x1646D)["attr"]("style");
      if (_0x1A5D1["indexOf"]("color: rgb(") < 0) {
        $(_0x1646D)["css"]("color", "");
      }
    });
  }
  selectDecoInfo = null;
  selectGchInfo = null;
  console["log"]("graphMouseDownHandle");
  if (_0x1A4C3["button"] == 2) {
    return;
  }
  if ($("g[type='gcolor']")["length"] > 0) {
    $("g[type='gcolor']")["removeAttr"]("style");
  }
  $("svg[type='rectnode']")["remove"]();
  $("#nodeMenu")["hide"]();
  var _0x1A496 = _0x1A4C3["target"],
    _0x1A43C = _0x1A496["getAttribute"]("class");
  var _0x17688 = _0x1A4C3["target"];
  if (_0x17688 == null) {
    return;
  }
  if (_0x17688["tagName"]["toLowerCase"]() != "svg") {
    var _0x17AC0 = $(_0x17688)["parents"]("svg");
    _0x17688 = _0x17AC0[_0x17AC0["length"] - 1];
  } else {
    _0x17688 = $(_0x17688);
    if (_0x17688["length"] > 1) {
      return;
    }
  }
  if (_0x1A4C3["touches"]) {
    _0x1A4C3["offsetX"] =
      _0x1A4C3["touches"][0]["pageX"] -
      $(_0x17688)["offset"]()["left"];
    _0x1A4C3["offsetY"] =
      _0x1A4C3["touches"][0]["pageY"] -
      $(_0x17688)["offset"]()["top"];
  }
  findNearNote(
    _0x1A4C3,
    _0x17688,
    _0x1A4C3["offsetX"] / scale,
    _0x1A4C3["offsetY"] / scale
  );
  if (select_note_info == null) {
    return;
  }
  cen = syms[$(select_note_info["click_obj"])["attr"]("istart")];
  svgArr = $("#target")["find"]("svg");
  editSvgLineIndex = $(_0x17688)["attr"]("id");
  if (
    select_note_info["click_obj"] == null ||
    $(select_note_info["click_obj"])["attr"]("cat") == "decos"
  ) {
    if ($(select_note_info["click_obj"])["length"] > 0) {
      selectDecoInfo = select_note_info["click_obj"];
      _0x1A4F0 = true;
    } else {
      var _0x1A4F0 = findNearDeco(
        _0x1A4C3,
        _0x17688,
        _0x1A4C3["offsetX"] / scale,
        _0x1A4C3["offsetY"] / scale
      );
      if (dragDecoFlag) {
        return;
      }
    }
    if (_0x1A4F0) {
      showProperties("deco", _0x1A4C3);
      var _0x1649A = $(selectDecoInfo)[0]["getBBox"]();
      var istart = $(selectDecoInfo)["attr"]("start");
      if (!istart) {
        istart = $(selectDecoInfo)["attr"]("istart");
      }
      $(
        "rect[type='" +
          $(selectDecoInfo)["attr"]("type") +
          "'][istart='" +
          istart +
          "']"
      )["remove"]();
      var _0x17769 = 0,
        _0x1773C = 0;
      if ($(selectDecoInfo)["attr"]("type") == "stc") {
        _0x17769 = 5;
        _0x1773C = 5;
      }
      var _0x1A469 = drawDecoRect(
        _0x1649A["x"],
        _0x1649A["y"],
        _0x1649A["width"] + _0x17769,
        _0x1649A["height"] + _0x1773C,
        istart,
        $(selectDecoInfo)["attr"]("type")
      );
      $(selectDecoInfo)["parent"]()["append"](_0x1A469);
      return;
    }
    var _0x1A51D = findNearObjByType(
      _0x1A4C3,
      _0x17688,
      _0x1A4C3["offsetX"] / scale,
      _0x1A4C3["offsetY"] / scale,
      "zs"
    );
    if (_0x1A51D) {
      showProperties("gch", _0x1A4C3);
      event["preventDefault"]();
      event["stopPropagation"]();
      return false;
    }
    var _0x1A54A = findNearObjByType(
      _0x1A4C3,
      _0x17688,
      _0x1A4C3["offsetX"] / scale,
      _0x1A4C3["offsetY"] / scale,
      "lyric"
    );
    if (_0x1A54A) {
      showProperties("lyric", _0x1A4C3);
      return;
    }
    var abc_content = $("#source")["val"]();
    if (musicType == 2) {
      selectSimpleNode(_0x17688, _0x1A4C3, scale, true);
      return;
    }
    var _0x1A5A4 = getStaffBotLineY(_0x17688, _0x1A4C3["offsetY"] / scale);
    var _0x1A40F = _0x1A5A4 - _0x1A4C3["offsetY"] / scale;
    if (_0x1A40F > 0 && _0x1A40F <= 24) {
      console.log("未选中音符，且点击在五线内");
      selectNode(_0x17688, _0x1A4C3, scale, true);
      showProperties("bar", _0x1A4C3);
    }
  } else {
    if (
      $(select_note_info["click_obj"])["attr"]("cat") ==
      "decos"
    ) {
      if (selectDecoInfo == null) {
        selectDecoInfo = $(select_note_info["click_obj"]);
      }
      showProperties("deco", _0x1A4C3);
      return;
    } else {
      if (
        $(select_note_info["click_obj"])["attr"]("type") ==
        "zs"
      ) {
        selectGchInfo = $(select_note_info["click_obj"]);
        showProperties("gch", _0x1A4C3);
        return;
      } else {
        if (
          $(select_note_info["click_obj"])["attr"]("type") ==
          "lyric"
        ) {
          selectGchInfo = $(select_note_info["click_obj"]);
          showProperties("lyric", _0x1A4C3);
          return;
        }
      }
    }
  }
}
function moveingRenderBar(_0x16062) {
  console.log("在移动小节类的装饰音", _0x16062);
  var startpoint_element_target = _0x16062["target"];
  if (startpoint_element_target["tagName"] == "svg") {
    var _0x17688 = startpoint_element_target;
    selectBar(_0x17688, _0x16062, scale, false);
  }
}
function movingRenderStaff(_0x16062) {
  console.log(
    "——————————————————————————\n" +
      _0x16062 +
      "\n——————————————————————————————————————————"
  );
  console["log"]("\u5728\u79fb\u52a8\u8fde\u8c31\u53f7", _0x16062);
  var startpoint_element_target = _0x16062["target"];
  if (musicType == 0 || musicType == 1) {
    if (startpoint_element_target["tagName"] == "svg") {
      var _0x17688 = startpoint_element_target;
      $(_0x17688)
        ["find"]("g[type='staff']")
        ["find"]("path")
        ["css"]("stroke", "black");
      selectStaff(_0x17688, _0x16062);
    }
  } else {
    if (musicType == 2) {
      console["log"](_0x16062["target"]);
      if (startpoint_element_target["tagName"] == "svg") {
        var _0x17688 = startpoint_element_target;
        $(_0x17688)
          ["find"]("g[type='bar_datas']")
          ["find"]("text")
          ["css"]("stroke", "black");
        selectStaff(_0x17688, _0x16062);
      }
    }
  }
}
function selectStaff(_0x17688, _0x16062) {
  var _0x1B657 = _0x16062["offsetY"];
  var _0x182A9 = 99999;
  var _0x1962C = -1;
  if (musicType == 0 || musicType == 1) {
    $(_0x17688)
      ["find"]("g[type='staff']")
      ["each"](function (i, _0x1646D) {
        var _0x17C82 = $(_0x1646D)["attr"]("transform");
        if (_0x17C82) {
          var _0x17A66 = getTransformsTranslate(_0x17C82);
          if (
            _0x1B657 < _0x17A66["y"] * scale &&
            _0x1B657 > (_0x17A66["y"] - 24) * scale
          ) {
            _0x1962C = $(_0x1646D)["attr"]("st");
            return false;
          }
        }
      });
  } else {
    if (musicType == 2) {
      $(_0x17688)
        ["find"]("g[type='bar_datas']")
        ["each"](function (i, _0x1646D) {
          var _0x17C82 = $(_0x1646D)["attr"]("transform");
          if (_0x17C82) {
            var _0x17A66 = getTransformsTranslate(_0x17C82);
            console["log"](
              "-----",
              _0x1B657,
              _0x17A66["y"],
              _0x17A66["y"] * scale,
              (parseFloat(_0x17A66["y"]) + 24) * scale
            );
            if (
              _0x1B657 > _0x17A66["y"] * scale &&
              _0x1B657 <= (parseFloat(_0x17A66["y"]) + 24) * scale
            ) {
              _0x1962C = $(_0x1646D)["attr"]("st");
              return false;
            }
          }
        });
    }
  }
  if (_0x1962C != -1) {
    if (musicType == 0 || musicType == 1) {
      $(_0x17688)
        ["find"]("g[type='staff'][st='" + _0x1962C + "']")
        ["find"]("path")
        ["css"]("stroke", "#0E518F")
        ["addClass"]("select_staff");
    } else {
      $(_0x17688)
        ["find"]("g[type='bar_datas'][st='" + _0x1962C + "']")
        ["find"]("text")
        ["css"]("stroke", "#0E518F")
        ["addClass"]("select_staff");
    }
    selectedStaffNum = _0x1962C;
  }
}
function findNearNote(_0x16062, _0x1792B, _0x16008, _0x16035) {
  console.log('findNearNote', _0x16062.target.classList);
  if ([..._0x16062.target.classList].find(item => ['f1', 'f2', 'f3'].includes(item))) {
    if ([..._0x16062.target.classList].length === 1) return
  }
  console["log"]("findnearnote...");
  select_note_info = new Object();
  delObj = new Object();
  var _0x183B7 = null;
  $(_0x1792B)
    ["find"]("text")
    ["each"](function (i, _0x1646D) {
      var _0x17E9E = $(this)["attr"]("x");
      var _0x17ECB = $(this)["attr"]("y");
      var _0x184C5 = 1;
      if (musicType == 2) {
        var _0x17C55 = $(_0x1646D)["parent"]();
        var _0x17C82 = $(_0x17C55)["attr"]("transform");
        if (_0x17C82) {
          var _0x17A66 = getTransformsTranslate(_0x17C82);
          if (_0x17A66 != null) {
            if (_0x17E9E) {
              _0x17E9E =
                parseFloat(_0x17E9E) + parseFloat(_0x17A66["x"]);
            }
            if (_0x17ECB) {
              _0x17ECB =
                parseFloat(_0x17ECB) + parseFloat(_0x17A66["y"]);
            }
          }
          if ($(_0x17C55)["attr"]("isgrace") == "1") {
            _0x184C5 = getTransformsScale(_0x17C82);
          }
        }
        if ($(_0x17C55)["hasClass"]("jpchord")) {
          var _0x18498 = $(_0x17C55)["parent"]();
          var _0x184F2 = $(_0x18498)["attr"]("transform");
          if (_0x184F2) {
            var _0x1851F = getTransformsTranslate(_0x184F2);
            if (_0x1851F != null) {
              if (_0x17E9E) {
                _0x17E9E =
                  parseFloat(_0x17E9E) + parseFloat(_0x1851F["x"]);
              }
              if (_0x17ECB) {
                _0x17ECB =
                  parseFloat(_0x17ECB) + parseFloat(_0x1851F["y"]);
              }
            }
          }
        }
      }
      if (!_0x17E9E || !_0x17ECB) {
        var _0x17A39 = $(_0x1646D)["attr"]("transform");
        if (_0x17A39 && _0x17A39 != "") {
          var _0x168D2 = /translate\((.[^\(]*)\)/;
          var _0x168A5 = _0x17A39["match"](_0x168D2);
          if (_0x168A5 != null) {
            var _0x17B74 = _0x168A5[1]["replace"](/\s/g, "");
            var _0x17B47 = _0x17B74["split"](",");
            _0x17E9E = _0x17B47[0];
            _0x17ECB = _0x17B47[1];
          }
        } else {
          return;
        }
      }
      var _0x18006 = parseFloat(_0x17E9E) * _0x184C5;
      var _0x18033 = parseFloat(_0x17ECB);
      if (musicType == 0) {
        if (
          _0x16008 >= _0x18006 - 3 &&
          _0x16008 <= _0x18006 + 6 &&
          _0x16035 <= _0x18033 + 3 &&
          _0x16035 >= _0x18033 - 6
        ) {
          _0x183B7 = $(this);
          if ($(_0x183B7)["attr"]("type") == "ghd") {
          } else {
            $(_0x183B7)["attr"]("x", _0x17E9E);
            $(_0x183B7)["attr"]("y", _0x17ECB);
          }
        }
      } else {
        if (
          _0x16008 >= _0x18006 - 3 &&
          _0x16008 <= _0x18006 + 16 &&
          _0x16035 <= _0x18033 + 3 &&
          _0x16035 >= _0x18033 - 16
        ) {
          _0x183B7 = $(this);
        }
      }
    });
  $(_0x1792B)
    ["find"]("text:not([type='title'])")
    ["css"]("fill", "");
  if (_0x183B7 != null) {
    var type = $(_0x183B7)["attr"]("type");
    if (
      type &&
      ($(_0x183B7)["attr"]("type")["indexOf"]("acc") == 0 ||
        eq("meter", type))
    ) {
      var _0x183E4 = $(_0x183B7)["attr"]("istart");
      $("text[istart='" + _0x183E4 + "']")["addClass"]("selected_text");
      clearFocus();
    } else {
      if (type && type == "tempo") {
        // 选中谱速度
        // $(_0x183B7)["find"]("tspan")["addClass"]("selected_text");
        console.log($(_0x183B7));
        $(_0x183B7).addClass("selected_text");
        $(_0x183B7).find("tspan").addClass("selected_text");
        $(_0x183B7).find("tspan").attr('istart', $(_0x183B7).attr('istart'))
        clearFocus();
        showProperties("tempo", _0x16062);
      } else {
        if (
          type &&
          (type["toLowerCase"]() == "hd" || type == "note")
        ) {
          showProperties("note", _0x16062, _0x183B7);
        } else {
          if (type && type["indexOf"]("r") == 0) {
            showProperties("rest", _0x16062);
          }
        }
        $(_0x183B7)["addClass"]("selected_text");
        addHelpAssessant($($(_0x183B7))["attr"]("istart"));
        clearFocus();
      }
    }
  }
  delObj["click_obj"] = _0x183B7;
  select_note_info["click_obj"] = _0x183B7;
  var istart = $(select_note_info["click_obj"])["attr"]("istart");
  if (istart != "") {
    var _0x1843E = $(select_note_info["click_obj"])["attr"]("y");
    var _0x18411 = $(select_note_info["click_obj"])
      ["parents"]("svg")
      ["find"](
        "text[type='hd']." +
          istart +
          ",text[type='Hd']." +
          istart +
          ",text[type='HD']." +
          istart +
          ",text[type='note'][istart='" +
          istart +
          "']"
      )
      ["sort"](function (_0x1735E, _0x1738B) {
        return (
          $(_0x1738B)["attr"]("y") -
          $(_0x1735E)["attr"]("y")
        );
      });
    var _0x1846B = -1;
    for (var i = 0; i < _0x18411["length"]; i++) {
      if (
        parseFloat(_0x1843E) ==
        parseFloat($(_0x18411[i])["attr"]("y"))
      ) {
        _0x1846B = i;
      }
    }
    $(select_note_info["click_obj"])["attr"]("ori_y", _0x1843E);
    $(select_note_info["click_obj"])["attr"]("update_index", _0x1846B);
  }
}
function findNearObjByType(_0x16062, _0x1792B, _0x16008, _0x16035, _0x1862D) {
  var _0x17B1A = false;
  var _0x180E7 = "text[type='" + _0x1862D + "']";
  if (_0x1862D == "use") {
    _0x180E7 = "use[cat='decos']";
  }
  $(_0x1792B)
    ["find"](_0x180E7)
    ["each"](function (i, _0x1646D) {
      if (!_0x17B1A) {
        var _0x17E9E = $(this)["attr"]("x");
        var _0x17ECB = $(this)["attr"]("y");
        var _0x18006 = parseFloat(_0x17E9E);
        var _0x18033 = parseFloat(_0x17ECB);
        var _0x17C82 = $(_0x1646D)["parent"]()["attr"]("transform");
        var _0x17A66 = getTransformsTranslate(_0x17C82);
        if (_0x17A66 != null) {
          _0x18006 = _0x18006 + parseFloat(_0x17A66["x"]);
          _0x18033 = _0x18033 + parseFloat(_0x17A66["y"]);
        }
        var _0x1649A = $(this)[0]["getBBox"]();
        var _0x17FAC = 0,
          _0x17CDC = 0;
        if (_0x1649A) {
          _0x17FAC = _0x1649A["width"];
          _0x17CDC = _0x1649A["height"];
        }
        if (
          _0x16008 >= _0x18006 &&
          _0x16008 <= _0x18006 + Math["abs"](_0x17FAC) &&
          _0x16035 <= _0x18033 &&
          _0x16035 >= _0x18033 - _0x17CDC
        ) {
          $(_0x1646D)["css"]("color", "#0E518F");
          $(_0x1646D)["attr"]("fill", "#0E518F");
          $(_0x1646D)["attr"]("selected", "selected");
          selectGchInfo = $(this);
          _0x17B1A = true;
          return true;
        }
      }
    });
  return _0x17B1A;
}
function findNearDeco(_0x16062, _0x1792B, _0x16008, _0x16035) {
  console.log('findNearDeco');
  var _0x17B1A = false;
  $(_0x1792B)
    ["find"]("[cat='decos']")
    ["each"](function (i, _0x1646D) {
      if (!_0x17B1A) {
        var type = $(_0x1646D)["attr"]("type");
        var _0x17E9E = $(this)["attr"]("x");
        var _0x17ECB = $(this)["attr"]("y");
        if (
          type &&
          (type == "invertedturn" ||
            type == "tubrn" ||
            type == "wedge" ||
            type == "accent" ||
            (musicType == 2 && type == "upb") ||
            (musicType == 2 && type["indexOf"]("inst_") == 0) ||
            (musicType == 2 && type == "sldrd2") ||
            (musicType == 2 && type == "sldrd_spl") ||
            (musicType == 2 && type == "sldru_spl") ||
            (musicType == 2 && type == "dnb") ||
            (musicType == 2 && type == "tenutoup") ||
            (musicType == 2 && type == "opend") ||
            (musicType == 2 && type == "dplus") ||
            (musicType == 2 && type == "snap") ||
            (musicType == 2 && type == "trl") ||
            (musicType == 2 && type == "rit") ||
            (musicType == 2 && type == "crescword") ||
            (musicType == 2 && type == "dimword") ||
            (musicType == 2 && type == "accel") ||
            (musicType == 2 && type == "sphr") ||
            (musicType == 2 && type == "kew1") ||
            (musicType == 2 && type == "kew2") ||
            (musicType == 2 && type == "kew3") ||
            (musicType == 2 && type == "kew4") ||
            (musicType == 2 && type == "kew5") ||
            (musicType == 2 && type == "kew6") ||
            (musicType == 2 && type == "kew7") ||
            (musicType == 2 && type == "kew8") ||
            (musicType == 2 && type == "img"))
        ) {
          var _0x17A39 = $(_0x1646D)["parent"]()["attr"]("transform");
          if (_0x17A39 && _0x17A39 != "") {
            var _0x168D2 = /translate\((.[^\(]*)\)/;
            var _0x168A5 = _0x17A39["match"](_0x168D2);
            if (_0x168A5 != null) {
              var _0x17B74 = _0x168A5[1]["replace"](/\s/g, "");
              var _0x17B47 = _0x17B74["split"](",");
              _0x17E9E = parseFloat(_0x17B47[0]) + parseFloat(_0x17E9E);
              _0x17ECB = parseFloat(_0x17B47[1]) + parseFloat(_0x17ECB);
            }
          }
        }
        var _0x18006 = parseFloat(_0x17E9E);
        var _0x18033 = parseFloat(_0x17ECB);
        if (type == "img") {
          _0x18006 = _0x18006 - 5;
        }
        var _0x1649A = $(this)[0]["getBBox"]();
        var _0x17FAC = 0,
          _0x17CDC = 0;
        if (_0x1649A) {
          _0x17FAC = _0x1649A["width"];
          _0x17CDC = _0x1649A["height"];
        }
        if (musicType != 2 && type == "accent") {
          _0x18033 += _0x17CDC;
        }
        if (musicType != 2 && type == "wedge") {
        }
        if (type == "slur" || type == "tie") {
          var _0x17F25 =
            $(this)["parents"]("svg")["offset"]()["top"] +
            $("#target")["scrollTop"]();
          var _0x17EF8 = $(this)["parents"]("svg")["offset"]()[
            "left"
          ];
          var _0x17C55 = $(_0x1646D)["parent"]();
          var _0x17C82 = $(_0x17C55)["attr"]("transform");
          var _0x17A66 = getTransformsTranslate(_0x17C82);
          console["log"](_0x17A66);
          var _0x164C7 = this["getBoundingClientRect"]();
          var _0x1649A = $(this)[0]["getBBox"]();
          var _0x17E71, _0x17E17, _0x17E44;
          var _0x15F81 = 8;
          _0x18006 = (_0x164C7["x"] - _0x17EF8) / scale;
          _0x18033 = (_0x164C7["y"] - _0x17F25) / scale;
          if (
            _0x16008 >= _0x18006 &&
            _0x16008 <= _0x18006 + _0x1649A["width"] &&
            _0x16035 >= _0x18033 &&
            _0x16035 <= _0x18033 + _0x1649A["height"]
          ) {
            console["log"]("\u70b9\u51fb\u8fde\u53e5\u7ebf\u91cc\u9762", _0x16062["target"]);
            var _0x17F7F = _0x16062["target"];
            var dragtype = $(_0x17F7F)["attr"]("dragtype");
            var _0x17F52 = $(_0x17F7F)["attr"]("pos");
            if (dragtype == "slur" && _0x17F52 == "mid") {
              return;
            }
            selectDecoInfo = $(this);
            if ($(selectDecoInfo)["hasClass"]("selected_path")) {
              showProperties("slur", _0x16062);
              return;
            }
            console["log"]($(selectDecoInfo)["attr"]("d"));
            var _0x17796 = $(selectDecoInfo)["attr"]("d");
            var _0x17D36 = getPathInfo(_0x17796);
            var startpoint_element_target = $(selectDecoInfo)["attr"]("id");
            $(_0x1646D)["addClass"]("selected_path");
            $(_0x1646D)["attr"]("selected", "selected");
            _0x17E71 = drawRect(
              type,
              _0x1649A["x"] - _0x15F81,
              _0x17D36["start"]["y"],
              _0x15F81,
              "start",
              $(selectDecoInfo)["attr"]("start"),
              startpoint_element_target
            );
            _0x17E17 = drawRect(
              type,
              _0x1649A["x"] + _0x1649A["width"],
              parseFloat(_0x17D36["start"]["y"]) +
                parseFloat(_0x17D36["end"]["y"]),
              _0x15F81,
              "end",
              $(selectDecoInfo)["attr"]("end"),
              startpoint_element_target
            );
            $(selectDecoInfo)["parent"]()["append"](_0x17E71);
            $(selectDecoInfo)["parent"]()["append"](_0x17E17);
            setPathInfo(selectDecoInfo[0], _0x17D36);
            $(selectDecoInfo)
              ["parent"]()
              ["parent"]()
              ["append"]($(selectDecoInfo)["parent"]());
            _0x17B1A = true;
            showProperties("slur", _0x16062);
            return true;
          }
        } else {
          if (type == "jq" || type == "jr") {
            var _0x17E9E = $(this)["attr"]("x");
            var _0x17ECB = $(this)["attr"]("y");
            if (!_0x17E9E || !_0x17ECB) {
              var _0x17A39 = $(_0x1646D)["attr"]("transform");
              if (_0x17A39 && _0x17A39 != "") {
                var _0x168D2 = /translate\((.[^\(]*)\)/;
                var _0x168A5 = _0x17A39["match"](_0x168D2);
                if (_0x168A5 != null) {
                  var _0x17B74 = _0x168A5[1]["replace"](/\s/g, "");
                  var _0x17B47 = _0x17B74["split"](",");
                  _0x17E9E = _0x17B47[0];
                  _0x17ECB = _0x17B47[1];
                }
              }
              var _0x17DBD, _0x17DEA;
              var _0x17BA1 = $(_0x1646D)["attr"]("d");
              var _0x168D2 = /m(.[^l]*)l/;
              var _0x17D09 = _0x17BA1["match"](_0x168D2);
              if (_0x17D09["length"] != null) {
                var _0x17B74 = _0x17D09[1]["replace"](/\s+/, " ");
                var _0x17B47 = _0x17B74["split"](" ");
                _0x17DBD = _0x17B47[0];
                _0x17DEA = _0x17B47[1];
              }
              var _0x17FD9 = _0x17BA1["match"](/l(.[^l]*)l/);
              var _0x17D90, _0x17D63;
              if (_0x17FD9 != null) {
                var _0x17B74 = _0x17FD9[1]["replace"](/\s+/, " ");
                var _0x17B47 = _0x17B74["split"](" ");
                _0x17D90 = parseFloat(_0x17B47[0]);
                _0x17D63 = Math["abs"](parseFloat(_0x17B47[1]));
              }
              if (!_0x17E9E) {
                _0x17E9E = _0x17DBD;
              } else {
                _0x17E9E = parseFloat(_0x17E9E) + parseFloat(_0x17DBD);
              }
              if (!_0x17ECB) {
                _0x17ECB = _0x17DEA;
              } else {
                _0x17ECB = parseFloat(_0x17ECB) + parseFloat(_0x17DEA);
              }
            }
            if ($(this)["attr"]("type")) {
              console["log"]($(this)["attr"]("type"));
            }
            var _0x18006 = parseFloat(_0x17E9E);
            var _0x18033 = parseFloat(_0x17ECB);
            if (_0x17D90 < 0) {
              _0x18006 = _0x18006 + _0x17D90;
            }
            if (
              _0x16008 >= _0x18006 &&
              _0x16008 <= _0x18006 + Math["abs"](_0x17D90) &&
              _0x16035 <= _0x18033 &&
              _0x16035 >= _0x18033 - _0x17D63 * 2
            ) {
              selectDecoInfo = $(this);
              if (
                $(selectDecoInfo)["attr"]("selected") === "selected"
              ) {
                return;
              }
              $(selectDecoInfo)["addClass"]("selected_path");
              $(selectDecoInfo)["attr"]("selected", "selected");
              var _0x17C28 = $(selectDecoInfo)["attr"]("d");
              var _0x17BFB = getDinfo(_0x17C28);
              if (_0x17BFB != null) {
                var _0x15F81 = 8;
                var _0x17E71, _0x17E17;
                if (_0x17BFB["lines"][0]["x"] > 0) {
                  _0x17E71 = drawRect(
                    type,
                    _0x17BFB["m"]["x"] - _0x15F81,
                    _0x17BFB["m"]["y"] - 8,
                    _0x15F81,
                    "start",
                    $(selectDecoInfo)["attr"]("start")
                  );
                  _0x17E17 = drawRect(
                    type,
                    _0x17BFB["m"]["x"] +
                      _0x17BFB["lines"][0]["x"],
                    _0x17BFB["m"]["y"] - 8,
                    _0x15F81,
                    "end",
                    $(selectDecoInfo)["attr"]("end")
                  );
                } else {
                  _0x17E71 = drawRect(
                    type,
                    _0x17BFB["m"]["x"],
                    _0x17BFB["m"]["y"] - 8,
                    _0x15F81,
                    "end",
                    $(selectDecoInfo)["attr"]("end")
                  );
                  _0x17E17 = drawRect(
                    type,
                    _0x17BFB["m"]["x"] +
                      _0x17BFB["lines"][0]["x"] -
                      _0x15F81,
                    _0x17BFB["m"]["y"] - 8,
                    _0x15F81,
                    "start",
                    $(selectDecoInfo)["attr"]("start")
                  );
                }
                $(selectDecoInfo)["parent"]()["append"](_0x17E71);
                $(selectDecoInfo)["parent"]()["append"](_0x17E17);
              }
              _0x17B1A = true;
              return true;
            }
          } else {
            if (
              type == "8va" ||
              type == "8vb" ||
              type == "15ma" ||
              type == "15mb"
            ) {
              var _0x17F25 =
                $(this)["parents"]("svg")["offset"]()[
                  "top"
                ] + $("#target")["scrollTop"]();
              var _0x17EF8 = $(this)["parents"]("svg")["offset"]()[
                "left"
              ];
              var _0x164C7 = this["getBoundingClientRect"]();
              var _0x1649A = $(this)[0]["getBBox"]();
              console["log"]("box===", _0x164C7);
              console["log"]("bbox===", _0x1649A);
              console["log"](
                "x:",
                _0x16008,
                "  y:",
                _0x16035
              );
              var _0x17E71, _0x17E17;
              var _0x15F81 = 8;
              _0x18006 = (_0x164C7["x"] - _0x17EF8) / scale;
              _0x18033 = (_0x164C7["y"] - _0x17F25) / scale;
              console["log"](
                "wx:",
                _0x18006,
                "  wy:",
                _0x18033
              );
              if (
                _0x16008 >= _0x18006 &&
                _0x16008 <= _0x18006 + _0x1649A["width"] &&
                _0x16035 >= _0x18033 &&
                _0x16035 <= _0x18033 + _0x1649A["height"]
              ) {
                console["log"]("\u70b9\u51fb\u9ad88/15\u5ea6\u91cc\u9762");
                selectDecoInfo = $(this);
                if ($(selectDecoInfo)["hasClass"]("selected_path")) {
                  return;
                }
                $(_0x1646D)["addClass"]("selected_path");
                $(_0x1646D)["attr"]("selected", "selected");
                _0x17E71 = drawRect(
                  type,
                  _0x1649A["x"] - 2 * _0x15F81,
                  _0x1649A["y"],
                  _0x15F81,
                  "start",
                  $(selectDecoInfo)["attr"]("start")
                );
                var _0x17BCE = $(
                  "path[type='8va'][start='" +
                    $(selectDecoInfo)["attr"]("start") +
                    "']"
                );
                $["each"](_0x17BCE, function (i, _0x18060) {
                  $(_0x18060)["addClass"]("selected_path");
                });
                var _0x17CAF = false;
                _0x17E17 = drawRect(
                  type,
                  _0x1649A["x"] + _0x1649A["width"] + _0x15F81,
                  _0x1649A["y"],
                  _0x15F81,
                  "end",
                  $(selectDecoInfo)["attr"]("end")
                );
                $(selectDecoInfo)["parent"]()["append"](_0x17E71);
                $(selectDecoInfo)["parent"]()["append"](_0x17E17);
                $(selectDecoInfo)
                  ["parent"]()
                  ["parent"]()
                  ["append"]($(selectDecoInfo)["parent"]());
                _0x17B1A = true;
                return true;
              }
            } else {
              if (type == "stc") {
                if (
                  _0x16008 >= _0x18006 - 3 &&
                  _0x16008 <= _0x18006 + Math["abs"](_0x17FAC) &&
                  _0x16035 >= _0x18033 - 5 &&
                  _0x16035 <= _0x18033 + _0x17CDC
                ) {
                  _0x17FAC = 5;
                  _0x17CDC = 5;
                  $(_0x1646D)["css"]("color", "#0E518F");
                  $(_0x1646D)["attr"]("fill", "#0E518F");
                  $(_0x1646D)["attr"]("selected", "selected");
                  selectDecoInfo = $(this);
                  _0x17B1A = true;
                }
              } else {
                if (type == "emb") {
                  if (
                    _0x16008 >= _0x18006 - 3 &&
                    _0x16008 <= _0x18006 + Math["abs"](_0x17FAC) &&
                    _0x16035 >= _0x18033 &&
                    _0x16035 <= _0x18033 + _0x17CDC
                  ) {
                    _0x17CDC = 5;
                    selectDecoInfo = $(this);
                    _0x17B1A = true;
                  }
                } else {
                  if (musicType == 2 && type == "wedge") {
                    if (
                      _0x16008 >= _0x18006 - 3 &&
                      _0x16008 <= _0x18006 + Math["abs"](_0x17FAC) &&
                      _0x16035 >= _0x18033 - _0x17CDC &&
                      _0x16035 <= _0x18033
                    ) {
                      selectDecoInfo = $(this);
                      _0x17B1A = true;
                    }
                  } else {
                    if (type == "invertedturn") {
                      if (
                        _0x16008 >= _0x18006 - 3 &&
                        _0x16008 <= _0x18006 + Math["abs"](_0x17FAC) &&
                        _0x16035 >= _0x18033 &&
                        _0x16035 <= _0x18033 + _0x17CDC
                      ) {
                        console["log"](_0x1646D);
                        $(_0x1646D)["css"]("color", "#0E518F");
                        $(_0x1646D)["attr"]("fill", "#0E518F");
                        $(_0x1646D)["attr"]("selected", "selected");
                        selectDecoInfo = $(this);
                        _0x17B1A = true;
                        return true;
                      }
                    } else {
                      if (
                        _0x16008 >= _0x18006 - 3 &&
                        _0x16008 <= _0x18006 + Math["abs"](_0x17FAC) &&
                        _0x16035 <= _0x18033 &&
                        _0x16035 >= _0x18033 - _0x17CDC
                      ) {
                        console["log"](_0x1646D);
                        $(_0x1646D)["css"]("color", "#0E518F");
                        $(_0x1646D)["attr"]("fill", "#0E518F");
                        $(_0x1646D)["attr"]("selected", "selected");
                        selectDecoInfo = $(this);
                        _0x17B1A = true;
                        return true;
                      } else {
                        if (
                          _0x16008 >= _0x18006 - 3 &&
                          _0x16008 <= _0x18006 + Math["abs"](_0x17FAC) &&
                          _0x16035 >= _0x18033 &&
                          _0x16035 <= _0x18033 + _0x17CDC
                        ) {
                          selectDecoInfo = $(this);
                          _0x17B1A = true;
                          return true;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  return _0x17B1A;
}
var dragDecoRect = false;
var decoRectMouseDownTime;
function drawDecoRect(
  _0x16008,
  _0x16035,
  _0x1770F,
  _0x176E2,
  istart,
  type
) {
  var _0x15F27 = "http://www.w3.org/2000/svg";
  var _0x15FAE = document["createElementNS"](_0x15F27, "rect");
  _0x15FAE["setAttribute"]("x", _0x16008);
  _0x15FAE["setAttribute"]("y", _0x16035);
  _0x15FAE["setAttribute"]("width", _0x1770F);
  _0x15FAE["setAttribute"]("height", _0x176E2);
  _0x15FAE["setAttribute"]("istart", istart);
  _0x15FAE["setAttribute"]("type", type);
  _0x15FAE["setAttribute"]("recttype", "movedragger");
  _0x15FAE["setAttribute"]("fill", "#0E518F");
  _0x15FAE["setAttribute"]("style", "opacity:0.3");
  if (type == "tubrn") {
    for (var i = istart; i < syms["length"]; i++) {
      var sym_data = syms[i];
      if (sym_data) {
        if (sym_data["in_tuplet"]) {
          $("rect[type='note'][istart='" + i + "']")["remove"]();
        } else {
          break;
        }
      }
    }
  }
  _0x15FAE["addEventListener"]("mousedown", function (_0x16062) {
    if (user["mode"] == "editor") {
      decoRectMouseDownTime = new Date()["getTime"]();
      dragDecoRect = true;
      _0x16062["preventDefault"]();
      _0x16062["stopPropagation"]();
      return false;
    }
    decoRectDrag = true;
  });
  _0x15FAE["addEventListener"]("mousemove", function (_0x16062) {
    if (user["mode"] == "editor") {
      if (dragDecoRect) {
        var type = $(event["target"])["attr"]("type");
        var _0x17769 = 0;
        var _0x1773C = 0;
        var _0x1792B = $(_0x16062["target"])["parents"]("g")[0];
        var _0x17A39 = $(_0x1792B)["attr"]("transform");
        var _0x178A4 = getTransformsTranslate(_0x17A39);
        if (_0x178A4 == null) {
          _0x178A4 = new Object();
          _0x178A4["x"] = 0;
          _0x178A4["y"] = 0;
        }
        $(event["target"])["attr"](
          "x",
          _0x16062["offsetX"] / scale -
            parseInt(_0x178A4["x"]) -
            $(_0x16062["target"])[0]["getBBox"]()["width"] / 2
        );
        if (type == "accent") {
          if (musicType == 2) {
            _0x1773C = 7 * scale;
            $(event["target"])["attr"](
              "y",
              _0x16062["offsetY"] / scale -
                parseInt(_0x178A4["y"]) -
                3 -
                _0x1773C
            );
          } else {
            _0x1773C = $(_0x16062["target"])[0]["getBBox"]()["height"];
            $(event["target"])["attr"](
              "y",
              -(
                _0x16062["offsetY"] / scale -
                parseInt(_0x178A4["y"]) -
                18 +
                _0x1773C
              )
            );
          }
        } else {
          if (type == "invertedturn") {
            if (musicType == 2) {
              _0x1773C = 15 * scale;
              $(event["target"])["attr"](
                "y",
                _0x16062["offsetY"] / scale -
                  parseInt(_0x178A4["y"]) -
                  3 -
                  _0x1773C
              );
            } else {
              _0x1773C = $(_0x16062["target"])[0]["getBBox"]()[
                "height"
              ];
              $(event["target"])["attr"](
                "y",
                -(
                  _0x16062["offsetY"] / scale -
                  parseInt(_0x178A4["y"]) -
                  28 +
                  _0x1773C
                )
              );
            }
          } else {
            if (type == "8vb") {
              _0x1773C =
                $(_0x16062["target"])[0]["getBBox"]()["height"] - 15;
              $(event["target"])["attr"](
                "y",
                _0x16062["offsetY"] / scale -
                  parseInt(_0x178A4["y"]) -
                  3 -
                  _0x1773C
              );
            } else {
              if (type == "img") {
                $(event["target"])["attr"](
                  "y",
                  _0x16062["offsetY"] / scale -
                    parseInt(_0x178A4["y"]) -
                    3 -
                    _0x1773C
                );
              } else {
                $(event["target"])["attr"](
                  "y",
                  _0x16062["offsetY"] / scale -
                    parseInt(_0x178A4["y"]) -
                    3 -
                    _0x1773C
                );
              }
            }
          }
        }
        $(event["target"])["attr"]("style", "opacity:0");
        var istart = $(event["target"])["attr"]("istart");
        var _0x179DF = $(
          "[cat='decos'][start='" +
            istart +
            "'][type='" +
            type +
            "'],[cat='decos'][istart='" +
            istart +
            "'][type='" +
            type +
            "']"
        );
        if (type == "tubrn") {
          var _0x17958 = $("path[cat='decos'][istart='" + istart + "']");
          var _0x168D2 = /m(.[^v]*)v/;
          var _0x179B2 = /m(.[^l]*)l/;
          for (var i = 0; i < _0x17958["length"]; i++) {
            var _0x17796 = $(_0x17958[i])["attr"]("d");
            var nodeInfo = _0x168D2["exec"](_0x17796);
            if (nodeInfo) {
              var _0x17985 = nodeInfo[1];
              var _0x16008 = _0x17985["split"](" ")[0];
              var _0x16035 = _0x17985["split"](" ")[1];
              var _0x17769 =
                _0x17958[i]["getBBox"]()["width"] / 2;
              var _0x177C3 =
                parseInt($(event["target"])["attr"]("x")) -
                _0x17769;
              var _0x177F0 =
                parseInt($(event["target"])["attr"]("y")) +
                $(_0x16062["target"])[0]["getBBox"]()["height"];
              _0x17796 =
                "m" +
                (_0x177C3 - _0x178A4["x"]) +
                " " +
                _0x177F0 +
                "v" +
                _0x17796["replace"](nodeInfo[0], "");
              $(_0x17958[i])["attr"]("d", _0x17796);
              var _0x178D1 = $(_0x17958[i])["attr"]("orix");
              var _0x178FE = $(_0x17958[i])["attr"]("oriy");
              if (!_0x178D1) {
                _0x178D1 = _0x16008;
                _0x178FE = _0x16035;
                $(_0x17958[i])["attr"]("orix", _0x16008);
                $(_0x17958[i])["attr"]("oriy", _0x16035);
              }
              $(_0x17958[i])["attr"](
                "disx",
                _0x177C3 - parseInt(_0x178D1)
              );
              $(_0x17958[i])["attr"](
                "disy",
                _0x177F0 - parseInt(_0x178FE)
              );
            } else {
              if ((nodeInfo = _0x179B2["exec"](_0x17796))) {
                var _0x17985 = nodeInfo[1];
                var _0x16008 = _0x17985["split"](" ")[0];
                var _0x16035 = _0x17985["split"](" ")[1];
                var _0x17769 =
                  _0x17958[i]["getBBox"]()["width"] / 2;
                var _0x177C3 =
                  parseInt($(event["target"])["attr"]("x")) -
                  _0x17769;
                var _0x177F0 =
                  parseInt($(event["target"])["attr"]("y")) +
                  6 * scale;
                _0x17796 =
                  "m" +
                  (_0x177C3 - _0x178A4["x"]) +
                  " " +
                  _0x177F0 +
                  "l" +
                  _0x17796["replace"](nodeInfo[0], "");
                $(_0x17958[i])["attr"]("d", _0x17796);
                var _0x178D1 = $(_0x17958[i])["attr"]("orix");
                var _0x178FE = $(_0x17958[i])["attr"]("oriy");
                if (!_0x178D1) {
                  _0x178D1 = _0x16008;
                  _0x178FE = _0x16035;
                  $(_0x17958[i])["attr"]("orix", _0x16008);
                  $(_0x17958[i])["attr"]("oriy", _0x16035);
                }
                $(_0x17958[i])["attr"](
                  "disx",
                  _0x177C3 - parseInt(_0x178D1)
                );
                $(_0x17958[i])["attr"](
                  "disy",
                  _0x177F0 - parseInt(_0x178FE)
                );
              }
            }
          }
        }
        if (_0x179DF[0]["tagName"]["toLowerCase"]() == "path") {
          if (type == "jq" || type == "jr") {
            var _0x17796 = $(_0x179DF)["attr"]("d");
            var _0x168D2 = /m(.[^l]*)l/;
            var nodeInfo = _0x168D2["exec"](_0x17796);
            if (nodeInfo) {
              var _0x17985 = nodeInfo[1];
              var _0x16008 = _0x17985["split"](" ")[0];
              var _0x16035 = _0x17985["split"](" ")[1];
              var _0x17769 = 0;
              if (type == "jq") {
                _0x17769 = $(_0x16062["target"])[0]["getBBox"]()[
                  "width"
                ];
              }
              var _0x177C3 =
                parseInt($(event["target"])["attr"]("x")) +
                _0x17769;
              var _0x177F0 =
                parseInt($(event["target"])["attr"]("y")) +
                $(_0x16062["target"])[0]["getBBox"]()["height"];
              _0x17796 =
                "m" +
                _0x177C3 +
                " " +
                _0x177F0 +
                "l" +
                _0x17796["replace"](nodeInfo[0], "");
              $(_0x179DF)["attr"]("d", _0x17796);
              var _0x178D1 = $(_0x179DF)["attr"]("orix");
              var _0x178FE = $(_0x179DF)["attr"]("oriy");
              if (!_0x178D1) {
                _0x178D1 = _0x16008;
                _0x178FE = _0x16035;
                $(_0x179DF)["attr"]("orix", _0x16008);
                $(_0x179DF)["attr"]("oriy", _0x16035);
              }
              $(_0x179DF)["attr"](
                "disx",
                _0x177C3 - parseInt(_0x178D1)
              );
              $(_0x179DF)["attr"](
                "disy",
                _0x177F0 - parseInt(_0x178FE)
              );
            }
            $("rect[dragtype]")["remove"]();
          } else {
            if (type == "slur") {
              var _0x17796 = $(_0x179DF)["attr"]("d");
              var _0x168D2 = /M(.[^c]*)c/;
              var nodeInfo = _0x168D2["exec"](_0x17796);
              if (nodeInfo) {
                var _0x17985 = nodeInfo[1];
                var _0x16008 = _0x17985["split"](" ")[0];
                var _0x16035 = _0x17985["split"](" ")[1];
                var _0x17769 = 0;
                var _0x177C3 =
                  parseInt($(event["target"])["attr"]("x")) +
                  _0x17769;
                var _0x177F0 =
                  parseInt($(event["target"])["attr"]("y")) +
                  $(_0x16062["target"])[0]["getBBox"]()["height"];
                _0x17796 =
                  "M" +
                  _0x177C3 +
                  " " +
                  _0x177F0 +
                  "c" +
                  _0x17796["replace"](nodeInfo[0], "");
                $(_0x179DF)["attr"]("d", _0x17796);
                var _0x178D1 = $(_0x179DF)["attr"]("orix");
                var _0x178FE = $(_0x179DF)["attr"]("oriy");
                if (!_0x178D1) {
                  _0x178D1 = _0x16008;
                  _0x178FE = _0x16035;
                  $(_0x179DF)["attr"]("orix", _0x16008);
                  $(_0x179DF)["attr"]("oriy", _0x16035);
                }
                $(_0x179DF)["attr"](
                  "disx",
                  _0x177C3 - parseInt(_0x178D1)
                );
                $(_0x179DF)["attr"](
                  "disy",
                  _0x177F0 - parseInt(_0x178FE)
                );
              }
              $("rect[dragtype]")["remove"]();
            }
          }
        } else {
          if (_0x179DF[0]["tagName"]["toLowerCase"]() == "g") {
            if (
              type == "8va" ||
              type == "8vb" ||
              type == "15ma" ||
              type == "15mb"
            ) {
              $(_0x179DF)["find"]("rect")["remove"]();
              var _0x17A0C = $(_0x179DF)["attr"]("transform");
              var _0x17A66 = getTransformsTranslate(_0x17A39);
              if (!_0x17A66) {
                _0x17A66 = new Object();
                _0x17A66["x"] = 0;
                _0x17A66["y"] = 0;
              }
              var _0x178D1 = parseInt(
                $(_0x179DF)["find"]("text")["attr"]("x")
              );
              var _0x178FE = parseInt(
                $(_0x179DF)["find"]("text")["attr"]("y")
              );
              if (!_0x178D1) {
                $(_0x179DF)["attr"]("orix", 0);
                $(_0x179DF)["attr"]("oriy", 0);
              }
              if (type == "8va") {
                _0x1773C = $(_0x16062["target"])[0]["getBBox"]()[
                  "height"
                ];
              } else {
              }
              var _0x1784A =
                parseInt($(event["target"])["attr"]("x")) -
                _0x178D1 +
                _0x17769;
              var _0x17877 =
                parseInt($(event["target"])["attr"]("y")) -
                _0x178FE +
                _0x1773C;
              $(_0x179DF)["attr"]("x", _0x1784A);
              $(_0x179DF)["attr"]("y", _0x17877);
              var _0x1781D =
                "translate(" + _0x1784A + "," + _0x17877 + ")";
              $(_0x179DF)["attr"]("disx", _0x1784A);
              $(_0x179DF)["attr"]("disy", _0x17877);
              $(_0x179DF[0])["attr"]("transform", _0x1781D);
              $("rect[dragtype]")["remove"]();
            }
          } else {
            switch (type) {
              case "hld":
                _0x1773C = 5 * scale;
                break;
              case "coda":
                _0x17769 = 0;
                _0x1773C = 14 * scale;
                break;
              case "accent":
                if (musicType == "2") {
                  _0x1773C += 3 * scale;
                } else {
                  _0x1773C += -5 * scale;
                }
                break;
              case "crescword":
                _0x17769 = 7;
                _0x1773C = 12 * scale;
                break;
              case "dimword":
                _0x17769 = 5;
                _0x1773C = 12 * scale;
                break;
              case "kew1":
              case "kew2":
              case "kew3":
              case "kew4":
              case "kew5":
              case "kew6":
              case "kew7":
              case "kew8":
                _0x17769 = $(_0x179DF)[0]["getBBox"]()["width"] / 2 - 2;
                _0x1773C = 25 * scale;
                break;
              case "inst_lingu":
              case "inst_pengl":
              case "inst_shac":
              case "inst_shanjt":
              case "inst_shoul":
              case "inst_shuanxt":
              case "inst_xiangb":
              case "inst_xiaojg":
              case "inst_feizg":
                _0x17769 = $(_0x179DF)[0]["getBBox"]()["width"] / 2;
                _0x1773C = 32 * scale;
                break;
              case "invertedturn":
                if (musicType == 2) {
                  _0x17769 =
                    $(_0x179DF)[0]["getBBox"]()["width"] / 2 - 5;
                } else {
                  _0x17769 = $(_0x179DF)[0]["getBBox"]()["width"] / 2;
                }
                _0x1773C = 15 * scale;
                break;
              case "img":
                _0x17769 = $(_0x179DF)[0]["getBBox"]()["width"] / 2;
                _0x1773C = 20 * scale;
                break;
              default:
                _0x17769 = $(_0x179DF)[0]["getBBox"]()["width"] / 2;
                _0x1773C = 7 * scale;
            }
            var _0x178D1 = $(_0x179DF)["attr"]("orix");
            var _0x178FE = $(_0x179DF)["attr"]("oriy");
            if (!_0x178D1) {
              $(_0x179DF)["attr"](
                "orix",
                $(_0x179DF)["attr"]("x")
              );
              $(_0x179DF)["attr"](
                "oriy",
                $(_0x179DF)["attr"]("y")
              );
            }
            var _0x1784A =
              parseInt($(event["target"])["attr"]("x")) +
              _0x17769;
            var _0x17877 =
              parseInt($(event["target"])["attr"]("y")) +
              _0x1773C;
            $(_0x179DF)["attr"]("x", _0x1784A);
            $(_0x179DF)["attr"]("y", _0x17877);
            $(_0x179DF)["attr"](
              "disx",
              _0x1784A - parseInt(_0x178D1)
            );
            $(_0x179DF)["attr"](
              "disy",
              _0x17877 - parseInt(_0x178FE)
            );
          }
        }
      }
      _0x16062["preventDefault"]();
      _0x16062["stopPropagation"]();
      return false;
    }
  });
  _0x15FAE["addEventListener"]("mouseup", function (_0x16062) {
    if (user["mode"] == "editor") {
      dragDecoRect = false;
      var _0x17A93 = new Date()["getTime"]();
      if (_0x17A93 - decoRectMouseDownTime < 200) {
        return;
      }
      var _0x17AC0 = $(this)["parents"]("svg");
      var _0x17688 = _0x17AC0[_0x17AC0["length"] - 1];
      var _0x16008 = parseInt(parseInt($(this)["attr"]("x")));
      var _0x16035 = parseInt(parseInt($(this)["attr"]("y")) - 15);
      var istart = $(this)["attr"]("istart");
      var type = $(this)["attr"]("type");
      var _0x179DF = $(
        "[cat='decos'][type='" +
          type +
          "'][start='" +
          istart +
          "'],[cat='decos'][type='" +
          type +
          "'][istart='" +
          istart +
          "']"
      );
      if (_0x179DF["length"] > 0) {
        updateDecoPosInfo(_0x179DF);
      }
      _0x16062["preventDefault"]();
      _0x16062["stopPropagation"]();
      return false;
    }
    decoRectDrag = false;
  });
  return _0x15FAE;
}
function updateDecoPosInfo(_0x17AED) {
  var type = $(_0x17AED)["attr"]("type");
  var _0x1BBF7 = $(_0x17AED)["attr"]("disx");
  var _0x1BC24 = $(_0x17AED)["attr"]("disy");
  if (!_0x1BBF7 || !_0x1BC24) {
    return;
  }
  var istart = $(_0x17AED)["attr"]("istart")
    ? $(_0x17AED)["attr"]("istart")
    : $(_0x17AED)["attr"]("start");
  switch (type) {
    case "jq":
    case "jr":
    case "8va":
    case "8vb":
    case "15ma":
    case "15mb":
      if (type == "jq") {
        type = "cresc";
      } else {
        if (type == "jr") {
          type = "dim";
        }
      }
      istart = $(_0x17AED)["attr"]("end");
      break;
    case "D.C.":
      break;
  }
  var sym_data = syms[istart];
  var abc_content = $("#source")["val"]();
  var a_gchs = sym_data["a_gch"];
  var _0x1BC51;
  if (a_gchs != null) {
    for (var i = 0; i < a_gchs["length"]; i++) {
      var _0x17C55 = a_gchs[i];
      if (_0x17C55["text"]["indexOf"]("gchtype") > -1) {
        var _0x1BCAB = JSON["parse"](
          _0x17C55["text"]["replace"](/\'/g, '"')
        );
        if (_0x1BCAB["gchtype"] == type) {
          _0x1BC51 = _0x17C55;
          break;
        }
      }
    }
  }
  if (_0x1BC51) {
    var _0x1BD05 = abc_content["substring"](
      _0x1BC51["istart"],
      _0x1BC51["iend"]
    );
    var _0x1BCD8 = JSON["parse"](
      _0x1BD05["replace"](/\"/g, "")["replace"](
        /\'/g,
        '"'
      )
    );
    var _0x1BC7E =
      "\"{'gchtype':'" +
      type +
      "','x':" +
      (_0x1BCD8["x"] + parseInt(_0x1BBF7)) +
      ",'y':" +
      (_0x1BCD8["y"] - parseInt(_0x1BC24)) +
      '}"';
    abc_content =
      abc_content["substring"](0, _0x1BC51["istart"]) +
      _0x1BC7E +
      abc_content["substring"](_0x1BC51["iend"]);
  } else {
    var _0x1BC7E =
      "\"{'gchtype':'" +
      type +
      "','x':" +
      parseInt(_0x1BBF7) +
      ",'y':" +
      -parseInt(_0x1BC24) +
      '}"';
    abc_content =
      abc_content["substring"](0, istart) +
      _0x1BC7E +
      abc_content["substring"](istart);
  }
  $("#source")["val"](abc_content);
  doLog();
  src_change();
}
function drawRect(
  type,
  _0x16008,
  _0x16035,
  _0x15F81,
  position,
  istart,
  startpoint_element_target
) {
  var _0x15F27 = "http://www.w3.org/2000/svg";
  var _0x15FAE = document["createElementNS"](_0x15F27, "rect");
  _0x15FAE["setAttribute"]("dragtype", type);
  _0x15FAE["setAttribute"]("type", position);
  if (startpoint_element_target) {
    _0x15FAE["setAttribute"]("target", startpoint_element_target);
  }
  _0x15FAE["setAttribute"]("x", _0x16008);
  _0x15FAE["setAttribute"]("y", _0x16035);
  _0x15FAE["setAttribute"]("inity", _0x16035);
  _0x15FAE["setAttribute"]("width", _0x15F81);
  _0x15FAE["setAttribute"]("height", _0x15F81);
  _0x15FAE["setAttribute"]("stroke", "#0E518F");
  _0x15FAE["setAttribute"]("stroke-width", 1);
  _0x15FAE["setAttribute"]("fill", "white");
  _0x15FAE["setAttribute"]("pos", position);
  _0x15FAE["setAttribute"]("istart", istart);
  if (deco_params[type]) {
    _0x15FAE["setAttribute"]("str", deco_params[type][position]);
  }
  _0x15FAE["addEventListener"]("mousedown", function (_0x16062) {
    $(this)["attr"]("selected", "selected");
    dragDecoFlag = true;
    rectMouseDownTime = new Date()["getTime"]();
    $(document)
      ["off"]("mouseup")
      ["on"]("mouseup", function (_0x16062) {
        console["log"]("mouseup", "  dragDecoFlag:", dragDecoFlag);
        var _0x160BC = new Date()["getTime"]();
        if (rectMouseDownTime > 0 && _0x160BC - rectMouseDownTime < 100) {
          dragDecoFlag = false;
          return;
        }
        rectMouseDownTime = -1;
        if (dragDecoFlag) {
          if (type == "linkclef") {
            var _0x1608F = $("rect[selected='selected']");
            updateLinkClef(_0x1608F);
            return;
          }
          if (type == "slur" && position == "mid") {
            var _0x1608F = $("rect[selected='selected']");
            updateDecoPosY(_0x1608F);
            return;
          } else {
            var _0x1608F = $("rect[selected='selected']");
            updateDecoPos(_0x1608F);
            return;
          }
        }
      });
  });
  _0x15FAE["addEventListener"]("mouseup", function (_0x16062) {
    var _0x160BC = new Date()["getTime"]();
    if (_0x160BC - rectMouseDownTime < 100) {
      return;
    }
    if (type == "linkclef") {
      updateLinkClef(this);
      return;
    }
    if (type == "slur" && position == "mid") {
      updateDecoPosY(this);
    } else {
      updateDecoPos(this);
    }
  });
  return _0x15FAE;
}
function updateLinkClef(_0x1608F, _0x1BDB9) {
  console["log"]("1111");
  $(_0x1608F)["removeAttr"]("selected");
  dragDecoFlag = false;
  var _0x19659 = $('rect[dragtype="linkclef"][pos="start"]');
  var _0x1BF21 = parseFloat($(_0x19659)["attr"]("y"));
  var _0x176E2 = parseFloat($(_0x19659)["height"]());
  var _0x193B6 = $('rect[dragtype="linkclef"][pos="end"]');
  var _0x1BE40 = parseFloat($(_0x193B6)["attr"]("y"));
  var _0x17688 = $(_0x19659)["parents"]("svg");
  var _0x1BE9A = [];
  if (musicType == 0 || musicType == 1) {
    $(_0x17688)
      ["find"]('g[type="staff"]')
      ["each"](function (i, _0x1646D) {
        var _0x1BF7B = $(_0x1646D)["attr"]("transform");
        var _0x17A66 = getTransformsTranslate(_0x1BF7B);
        var _0x1BF4E = parseFloat(_0x17A66["y"]) - 24;
        _0x1BE9A["push"](_0x1BF4E);
      });
  } else {
    if (musicType == 2) {
      $(_0x17688)
        ["find"]('g[type="bar_datas"]')
        ["each"](function (i, _0x1646D) {
          var _0x1BF7B = $(_0x1646D)["attr"]("transform");
          var _0x17A66 = getTransformsTranslate(_0x1BF7B);
          var _0x1BF4E = parseFloat(_0x17A66["y"]) - 24;
          if (_0x1BE9A["indexOf"](_0x1BF4E) < 0) {
            _0x1BE9A["push"](_0x1BF4E);
          }
        });
    }
  }
  _0x1BE9A["sort"](function (_0x1735E, _0x1738B) {
    return _0x1735E - _0x1738B;
  });
  console["log"](
    "startTop:",
    _0x1BF21,
    "   endTop:",
    _0x1BE40,
    _0x1BE9A
  );
  var _0x1BEF4 = 0;
  var _0x1BE13 = 0;
  var _0x1BE6D = -1;
  var type = $(_0x1608F)["attr"]("istart");
  for (var i = 0; i < _0x1BE9A["length"]; i++) {
    if (_0x1BF21 > _0x1BE6D) {
      _0x1BEF4 = i;
    }
    if (type == "brace") {
      if (_0x1BE40 > _0x1BE6D) {
        _0x1BE13 = i;
      }
    } else {
      if (type == "bracket") {
        if (_0x1BE40 > _0x1BE9A[i]) {
          _0x1BE13 = i;
        }
      }
    }
    _0x1BE6D = _0x1BE9A[i] + 24;
  }
  if (musicType == 0 || musicType == 1) {
  } else {
  }
  console["log"]("startSt:", _0x1BEF4, "   endSt:", _0x1BE13);
  $('rect[dragtype="linkclef"]')["remove"]();
  if ($(".select_staff")["length"] > 0) {
    var abc_content = $("#source")["val"]();
    var LinesInfo = getLinesInfo($("#source")["val"]());
    var _0x18D08 = "";
    var _0x1BEC7 = "";
    var _0x1BDE6 = "";
    if (type == "brace") {
      _0x1BEC7 = "{";
      _0x1BDE6 = "}";
    } else {
      if (type == "bracket") {
        _0x1BEC7 = "[";
        _0x1BDE6 = "]";
      } else {
        if (type == "none") {
        }
      }
    }
    var abc_content_temp_p1 = "";
    for (var i = 0; i < LinesInfo["length"]; i++) {
      var LineInfo = LinesInfo[i];
      var lineStr = LineInfo["lineStr"];
      if (
        lineStr["indexOf"]("%%score") > -1 ||
        lineStr["indexOf"]("%%staves") > -1
      ) {
        var _0x16C83 = lineStr["match"](/%%score|%%staves/)[0];
        clefReg = /\s*\(.[^\(]*\)\s*\|{0,1}|\s*\d\s*\|{0,1}/g;
        lineStr = lineStr["replace"](_0x1BEC7, "")["replace"](
          _0x1BDE6,
          ""
        );
        var _0x18D35 = 0;
        var _0x18D62 = 0;
        var new_note_str = "";
        while ((node = clefReg["exec"](lineStr))) {
          console["log"](node);
          new_note_str += lineStr["substring"](_0x18D62, node["index"]);
          if (_0x18D35 == _0x1BEF4) {
            new_note_str += _0x1BEC7;
          }
          new_note_str += node[0] + "|";
          if (_0x18D35 == _0x1BE13) {
            new_note_str = new_note_str["substring"](0, new_note_str["length"] - 1);
            new_note_str += _0x1BDE6;
            new_note_str = new_note_str["replace"](/\|\s*\|/, "|");
          }
          _0x18D62 = node["index"] + node[0]["length"];
          _0x18D35++;
        }
        if (_0x18D62 < lineStr["length"]) {
          new_note_str += lineStr["substr"](_0x18D62);
        }
        abc_content_temp_p1 += new_note_str + "\x0A";
      } else {
        abc_content_temp_p1 += lineStr + "\x0A";
      }
    }
    $("#source")["val"](abc_content_temp_p1);
    src_change();
    doLog();
  }
}
var rectMouseDownTime = -1;
function addSlurDragRect(
  type,
  _0x16008,
  _0x16035,
  _0x15F81,
  position,
  istart
) {
  var _0x15F27 = "http://www.w3.org/2000/svg";
  var _0x15FAE = document["createElementNS"](_0x15F27, "rect");
  _0x15FAE["setAttribute"]("dragtype", type);
  _0x15FAE["setAttribute"]("x", _0x16008);
  _0x15FAE["setAttribute"]("y", _0x16035);
  _0x15FAE["setAttribute"]("width", _0x15F81);
  _0x15FAE["setAttribute"]("height", _0x15F81);
  _0x15FAE["setAttribute"]("stroke", "#0E518F");
  _0x15FAE["setAttribute"]("stroke-width", 1);
  _0x15FAE["setAttribute"]("fill", "black");
  _0x15FAE["setAttribute"]("pos", position);
  _0x15FAE["setAttribute"]("istart", istart);
  _0x15FAE["setAttribute"]("str", deco_params[type][position]);
  _0x15FAE["addEventListener"]("mousedown", function (_0x16062) {
    $(this)["attr"]("selected", "selected");
    dragDecoFlag = true;
    rectMouseDownTime = new Date()["getTime"]();
    $(document)
      ["off"]("mouseup")
      ["on"]("mouseup", function (_0x16062) {
        if (dragDecoFlag) {
          var _0x1608F = $("rect[selected='selected']");
          updateDecoPos(_0x1608F);
          return;
        }
      });
  });
  _0x15FAE["addEventListener"]("mouseup", function () {
    var _0x160BC = new Date()["getTime"]();
    if (rectMouseDownTime > 0 && _0x160BC - rectMouseDownTime < 100) {
      return;
    }
    rectMouseDownTime = -1;
    dragDecoFlag = false;
    updateDecoPos(this);
  });
  return _0x15FAE;
}
function updateDecoPos(_0x1608F) {
  $(_0x1608F)["removeAttr"]("selected");
  dragDecoFlag = false;
  if (nearDecoNote != null) {
    var _0x1BABC = $(_0x1608F)["attr"]("dragtype");
    var istart = $(_0x1608F)["attr"]("istart");
    var _0x1BB43 = nearDecoNote["istart"];
    var _0x1BAE9 = syms[_0x1BB43];
    if (
      "8va" == _0x1BABC ||
      "8vb" == _0x1BABC ||
      "15ma" == _0x1BABC ||
      "15mb" == _0x1BABC
    ) {
      if (_0x1BAE9 && _0x1BAE9["next"]) {
        _0x1BB43 = _0x1BAE9["next"]["istart"];
      }
    }
    if (istart != _0x1BB43) {
      var ac_abc_content = $(_0x1608F)["attr"]("str");
      var abc_content = $("#source")["val"]();
      var _0x19578 = "";
      var _0x1BB70 = false;
      var _0x1BB9D = -1;
      if (_0x1BABC == "k_slur" && istart == -1) {
        if (istart == -1) {
          var _0x1BB16 = syms[_0x1BB43]["next"];
          if (_0x1BB16) {
            var abc_content_temp_p1 =
              abc_content["substring"](0, _0x1BB16["istart"]) +
              ac_abc_content +
              abc_content["substring"](_0x1BB16["istart"]);
            $("#source")["val"](abc_content_temp_p1);
            src_change();
            doLog();
            return;
          }
        }
      }
      if (
        eq("k_slur,slur", _0x1BABC) &&
        $(_0x1608F)["attr"]("pos") == "end"
      ) {
        _0x1BB70 = true;
        var sym_data = syms[istart];
        _0x1BB9D = sym_data["iend"];
        _0x19578 = abc_content["substring"](0, sym_data["iend"]);
      } else {
        _0x19578 = abc_content["substring"](0, istart);
        if (_0x1BABC == "k_slur") {
          var _0x18D62 = _0x19578["lastIndexOf"]("!slur(");
          _0x19578 =
            _0x19578["substring"](0, _0x18D62) +
            _0x19578["substring"](_0x18D62)["replace"](
              /\!slur\([^\!]*\!/,
              ""
            );
        }
      }
      if (!ac_abc_content) {
        return;
      }
      var _0x1BBCA = ac_abc_content["replace"]("(", "\\(")[
        "replace"
      ](")", "\\)");
      var _0x168D2 = new RegExp("([^~]*)(" + _0x1BBCA + ")");
      _0x19578 = _0x19578["replace"](_0x168D2, "$1");
      var abc_content_temp_p1 = "";
      if (parseInt(istart) < parseInt(_0x1BB43)) {
        if (_0x1BB70) {
          var sym_data = syms[_0x1BB43];
          if (_0x1BABC == "k_slur") {
            abc_content_temp_p1 =
              _0x19578 +
              abc_content["substring"](_0x1BB9D, sym_data["iend"])[
                "replace"
              ](ac_abc_content, "") +
              ac_abc_content +
              abc_content["substr"](sym_data["iend"]);
          } else {
            abc_content_temp_p1 =
              _0x19578 +
              abc_content["substring"](_0x1BB9D, sym_data["iend"]) +
              ac_abc_content +
              abc_content["substr"](sym_data["iend"]);
          }
        } else {
          abc_content_temp_p1 =
            _0x19578 +
            abc_content["substring"](istart, _0x1BB43) +
            ac_abc_content +
            abc_content["substr"](_0x1BB43);
        }
      } else {
        if (_0x1BB70) {
          var sym_data = syms[_0x1BB43];
          abc_content_temp_p1 =
            _0x19578["substring"](0, sym_data["iend"]) +
            ac_abc_content +
            _0x19578["substring"](sym_data["iend"], istart) +
            abc_content["substr"](istart)["replace"](
              ac_abc_content,
              ""
            );
        } else {
          abc_content_temp_p1 =
            _0x19578["substring"](0, _0x1BB43) +
            ac_abc_content +
            _0x19578["substring"](_0x1BB43, istart) +
            abc_content["substr"](istart);
        }
      }
      $("#source")["val"](abc_content_temp_p1);
      src_change();
      doLog();
    }
  }
}
var lastSlurHeight = 1;
function updateDecoPosY(_0x1608F) {
  console["log"]("updateDecoPosY-----", moveSlurHeight);
  $(_0x1608F)["removeAttr"]("selected");
  dragDecoFlag = false;
  moveSlurHeight = parseInt(moveSlurHeight * 10) / 10;
  if (Math["abs"](moveSlurHeight - lastSlurHeight) > 0.3) {
    var istart = $(_0x1608F)["attr"]("istart");
    var abc_content = $("#source")["val"]();
    var _0x1BD5F = '"sh:' + moveSlurHeight + '"';
    var sym_data = syms[istart];
    var a_gchs = sym_data["a_gch"];
    var abc_content_temp_p1 = "";
    if (a_gchs != null) {
      for (var i = 0; i < a_gchs["length"]; i++) {
        var a_gch = a_gchs[i];
        var _0x1BD8C = a_gch["text"];
        if (_0x1BD8C["indexOf"]("sh:") == 0) {
          abc_content_temp_p1 = abc_content["substring"](0, a_gch["istart"]);
        }
      }
    }
    if (abc_content_temp_p1 == "") {
      abc_content_temp_p1 =
        abc_content["substring"](0, istart) +
        _0x1BD5F +
        abc_content["substring"](istart);
    } else {
      abc_content_temp_p1 = abc_content_temp_p1 + _0x1BD5F + abc_content["substring"](istart);
    }
    $("#source")["val"](abc_content_temp_p1);
    src_change();
    doLog();
  }
}
function findNearNoteWithSelectedDeco(
  _0x1792B,
  _0x16008,
  _0x16035,
  type,
  _0x185A6,
  _0x16062
) {
  var _0x180BA = 9999;
  var _0x18141 = 9999;
  var _0x1816E = null;
  var _0x1827C = "";
  var _0x18579 = 0;
  var _0x1854C = _0x16062["target"]["tagName"];
  if (_0x1854C["toUpperCase"]() == "SVG") {
    _0x18579 = $(_0x16062["target"])["offset"]()["top"];
  } else {
    _0x18579 = $($(_0x16062["target"])["parents"]("svg")[0])[
      "offset"
    ]()["top"];
  }
  _0x16035 = _0x18579 + _0x16035;
  console["log"](
    "parentY:",
    _0x18579,
    "x:",
    _0x16008,
    "y:",
    _0x16035
  );
  if (
    type == "slur" ||
    type == "jq" ||
    type == "jr" ||
    type == "8va" ||
    type == "8vb" ||
    type == "15ma" ||
    type == "15mb"
  ) {
    _0x1827C = "[v='" + _0x185A6 + "']";
  }
  var _0x185D3 = "";
  if (
    type == "8va" ||
    type == "8vb" ||
    type == "15ma" ||
    type == "15mb"
  ) {
    _0x185D3 = ",rect[type='bar']" + _0x1827C;
  }
  $("#target")
    ["find"](
      "rect[type='rest']" +
        _0x1827C +
        ",rect[type='note']" +
        _0x1827C +
        ",rect[type='splnum_note']" +
        _0x1827C +
        ",rect[type='splnum_rest']" +
        _0x1827C +
        _0x185D3
    )
    ["each"](function (i, _0x1646D) {
      var _0x1835D = $(this)["attr"]("x");
      var _0x1838A = $(this)["attr"]("y");
      var _0x18600 = $($(this)["parents"]("svg")[0])["offset"]()[
        "top"
      ];
      if (_0x1838A) {
        _0x1838A = parseFloat(_0x1838A);
        _0x1838A = _0x1838A + _0x18600;
      }
      if (musicType == 2) {
        var _0x17C55 = $(_0x1646D)["parent"]();
        var _0x17C82 = $(_0x17C55)["attr"]("transform");
        var _0x17A66 = getTransformsTranslate(_0x17C82);
        _0x1835D = parseFloat(_0x1835D) + parseFloat(_0x17A66["x"]);
        _0x1838A = parseFloat(_0x1838A) + parseFloat(_0x17A66["y"]);
      }
      var _0x17CDC = $(this)["attr"]("height");
      var _0x182D6 = Math["abs"](parseFloat(_0x1835D) - _0x16008);
      var _0x18303 = Math["abs"](_0x1838A - _0x16035);
      if (_0x182D6 > 30) {
        return;
      }
      var _0x182A9 = 0;
      if (_0x16035 > parseFloat(_0x1838A) + parseFloat(_0x17CDC)) {
        var _0x18330 = Math["abs"](
          _0x16035 - (parseFloat(_0x1838A) + parseFloat(_0x17CDC))
        );
        _0x182A9 = Math["sqrt"](
          Math["pow"](_0x182D6, 2) + Math["pow"](_0x18330, 2)
        );
        console["log"]("\u4e0b");
      } else {
        _0x182A9 = Math["sqrt"](
          Math["pow"](_0x182D6, 2) + Math["pow"](_0x18303, 2)
        );
        console["log"]("\u4e0a");
      }
      console["log"](
        "istart:",
        $(this)["attr"]("istart"),
        " currParentY:",
        _0x18600,
        " y:",
        _0x16035,
        " iy:",
        _0x1838A,
        " dis:",
        _0x182A9
      );
      if (_0x182A9 < 60) {
        if (_0x182A9 < _0x18141) {
          _0x18141 = _0x182A9;
          _0x1816E = $(this);
        }
      }
    });
  if (_0x1816E != null) {
    $(".editor_rect")["removeClass"]("editor_rect");
    $("rect[type='rest'],rect[type='note'],rect[type='splnum_note'],rect[type='splnum_rest']")["css"]("fill-opacity", "0");
    $(_0x1816E)["addClass"]("editor_rect");
    var _0x17AED = new Object();
    var ts_prev = $(_0x1816E)["prev"]();
    while ($(ts_prev)["attr"]("type") == "dot") {
      ts_prev = $(ts_prev)["prev"]();
    }
    if ($(ts_prev)["is"]("g")) {
      ts_prev = $(ts_prev)["find"]("text");
    }
    var _0x16008 = $(ts_prev)["attr"]("x");
    _0x17AED["x"] = _0x16008;
    _0x17AED["istart"] = $(_0x1816E)["attr"]("istart");
    return _0x17AED;
  }
}
function getDinfo(_0x17796) {
  var _0x17AED = new Object();
  var _0x19B9F = /m(.[^l]*)l/;
  var _0x19B45 = _0x17796["match"](_0x19B9F);
  var _0x19B72 = new Object();
  if (_0x19B45 != null) {
    var _0x17B74 = _0x19B45[1];
    _0x17B74 = _0x17B74["replace"](/\s+/, " ");
    _0x19B72["x"] = parseFloat(_0x17B74["split"](" ")[0]);
    _0x19B72["y"] = parseFloat(_0x17B74["split"](" ")[1]);
  }
  _0x17AED["m"] = _0x19B72;
  var _0x19B18 = /l(.[^l]*)/g;
  var _0x19AEB = _0x17796["match"](_0x19B18);
  var _0x19ABE = new Array();
  if (_0x19AEB != null) {
    for (
      var i = 0, _0x1881C = _0x19AEB["length"];
      i < _0x1881C;
      i++
    ) {
      var lineStr = _0x19AEB[i];
      lineStr = lineStr["replace"](/\s+/, " ");
      var _0x17B47 = lineStr["split"](" ");
      var LineInfo = new Object();
      LineInfo["x"] = parseFloat(
        _0x17B47[0]["replace"]("l", "")
      );
      LineInfo["y"] = parseFloat(_0x17B47[1]);
      _0x19ABE["push"](LineInfo);
    }
  }
  _0x17AED["lines"] = _0x19ABE;
  return _0x17AED;
}
function delSelNote() {
  console.log('delSelNote');
  if ($("text.selected_text[type='mytext']")["length"] > 0) {
    var textElement = $("text.selected_text[type='mytext']");
    delMyTextInfo($(textElement)["attr"]("id"));
    $(textElement)["remove"]();
    return;
  }
  if ($("rect[type='bar'][selected='selected'],rect[type='splnum_bar'][selected='selected']")["length"] > 0) {
    var nodeElement = $("rect[type='bar'][selected='selected'],rect[type='splnum_bar'][selected='selected']");
    if (nodeElement["length"] > 1) {
      nodeElement = nodeElement[nodeElement["length"] - 1];
    }
    var istart = $(nodeElement)["attr"]("istart");
    var sym_data = syms[istart];
    if (sym_data) {
      var cbar = checkBarIsInLineFirst(nodeElement);
      if (cbar) {
        var BarIsInLineFirst = true;
        // var _0x170BB = 0;
        // var _0x17304 = new Array();
        var ts_prev = sym_data["ts_prev"];
        while (ts_prev) {
          if (ts_prev["type"] != 0) {
            break;
          }
          if (
            ts_prev["ts_prev"] &&
            ts_prev["ts_prev"]["type"] == 0
          ) {
            ts_prev = ts_prev["ts_prev"];
          } else {
            break;
          }
        }
        var temp_sym_data = null;
        if (ts_prev["type"] == 0) {
          temp_sym_data = ts_prev;
        } else {
          temp_sym_data = sym_data;
        }
        console.log(temp_sym_data);
        if (temp_sym_data) {
          for (var i = 0; i < temp_sym_data["istart"]; i++) {
            if (
              syms[i] &&
              (syms[i]["type"] == 8 ||
                syms[i]["type"] == 10)
            ) {
              BarIsInLineFirst = false;
            }
          }
        }
        if (BarIsInLineFirst) {
          var abc_content = $("#source")["val"]();
          var abc_content_temp_p1 = abc_content.substring(0, temp_sym_data["istart"]);
          var abc_content_temp_sel = abc["clone"](temp_sym_data, 2);
          var ts_next = temp_sym_data["ts_next"];
          while (ts_next && ts_next["type"] == 0) {
            abc_content_temp_p1 += abc_content["substring"](
              abc_content_temp_sel["iend"],
              ts_next["istart"]
            );
            abc_content_temp_sel = abc["clone"](ts_next, 2);
            ts_next = ts_next["ts_next"];
          }
          abc_content_temp_p1 += abc_content["substring"](abc_content_temp_sel["iend"]);
          $("#source").val(abc_content_temp_p1);
          doLog();
          src_change();
          return;
        } else {
          var abc_content = $("#source")["val"]();
          var abc_content_temp_p1 =
            abc_content["substring"](0, temp_sym_data["istart"]) + "|";
          var abc_content_temp_sel = abc["clone"](temp_sym_data, 2);
          var ts_next = temp_sym_data["ts_next"];
          while (ts_next && ts_next["type"] == 0) {
            abc_content_temp_p1 +=
              abc_content["substring"](
                abc_content_temp_sel["iend"],
                ts_next["istart"]
              ) + "|";
            abc_content_temp_sel = abc["clone"](ts_next, 2);
            ts_next = ts_next["ts_next"];
          }
          abc_content_temp_p1 += abc_content["substring"](abc_content_temp_sel["iend"]);
          $("#source").val(abc_content_temp_p1);
          doLog();
          src_change();
          return;
        }
      }
    }
    console.log("不允许删除这个小节线");
    return;
  }
  if ($("text[type='zs'][selected='selected']")["length"] > 0) {
    var zs_element_istart = $("text[type='zs'][selected='selected']")["attr"]("gch_istart");
    var zs_element_iend = $("text[type='zs'][selected='selected']")["attr"]("gch_iend");
    var abc_content = $("#source")["val"]();
    abc_content = abc_content["substring"](0, zs_element_istart) + abc_content["substring"](zs_element_iend);
    $("#source")["val"](abc_content);
    doLog();
    src_change();
    return;
  }
  if ($('.selected_text[type="bracket"]')["length"] > 0 || $('.selected_text[type="brace"]')["length"] > 0) {
    var bracket_start_str = "";
    var bracket_end_str = "";
    if ($('.selected_text[type="bracket"]')["length"] > 0) {
      bracket_start_str = "[";
      bracket_end_str = "]";
    } else {
      if ($('.selected_text[type="brace"]')["length"] > 0) {
        bracket_start_str = "{";
        bracket_end_str = "}";
      }
    }
    var abc_content = $("#source")["val"]();
    var LinesInfo = getLinesInfo(abc_content);
    var abc_content_temp_p1 = "";
    for (var i = 0; i < LinesInfo["length"]; i++) {
      var LineInfo = LinesInfo[i];
      var lineStr = LineInfo["lineStr"];
      if (
        lineStr["indexOf"]("%%score") > -1 ||
        lineStr["indexOf"]("%%staves") > -1
      ) {
        lineStr = lineStr["replace"](bracket_start_str, "")["replace"](
          bracket_end_str,
          ""
        );
      }
      abc_content_temp_p1 += lineStr + "\x0A";
    }
    $("#source")["val"](abc_content_temp_p1);
    src_change(doLog);
    return;
  }
  if ($("text[type='lyric'][selected='selected']")["length"] > 0) {
    var lyric_element = $("text[type='lyric'][selected='selected']");
    var istart = $(lyric_element)["attr"]("lyric_istart");
    var iend = $(lyric_element)["attr"]("lyric_iend");
    var abc_content = $("#source")["val"]();
    abc_content =
      abc_content["substring"](0, istart) +
      "*" +
      abc_content["substring"](iend);
    $("#source")["val"](abc_content);
    doLog();
    src_change();
    return;
  }
  if (selectDecoInfo != null) {
    delSelectDeco();
    return;
  }
  if ($("rect[type='startpoint']")["length"] > 0) {
    var startpoint_element_target = $("rect[type='startpoint']")["attr"]("target");
    var type = $("#" + startpoint_element_target)["attr"]("type");
    if (type == "bracketgch") {
      var seq = $("#" + startpoint_element_target)["attr"]("seq");
      var subtype = $("#" + startpoint_element_target)["attr"]("subtype");
      delBracketGch(seq, subtype);
    } else {
      delCuntomSlur();
    }
    return;
  }
  if (delObj == null) {
    if (typeof window["top"]["swAutoAlert"] == "function") {
      window["top"]["swAutoAlert"]("请选中需删除的音符");
    } else {
      window["top"]["alert"]("请选中需删除的音符");
    }
    return;
  }
  if (delObj["click_obj"] == null) {
    return;
  }
  var istart = $(delObj["click_obj"])["attr"]("istart");
  if (!istart) {
    return;
  }
  cen = syms[istart];
  if (cen["type"] == 14) {
    var abc_content = $("#source")["val"]();
    abc_content = "%%hiddenspeed\x0A" + abc_content;
    $("#source")["val"](abc_content);
    src_change();
    doLog();
    return;
  }
  var notes = cen["notes"];
  if (!notes) {
    return;
  }
  var abc_content = $("#source")["val"]();
  if (notes["length"] == 1) {
    var ac_abc_content = abc_content["substring"](cen["istart"], cen["iend"]);
    if (ac_abc_content["indexOf"](":") > -1) {
      if (ac_abc_content["indexOf"]("M:") > -1) {
      } else {
        abc_content =
          abc_content["substr"](0, cen["istart"]) +
          abc_content["substr"](cen["iend"]);
      }
      $("#source")["val"](abc_content);
      src_change();
      return;
    }
    var n_abc_content = ac_abc_content["replace"](/[\[\]\_\^\=\,\']/g, "")[
      "replace"
    ](/[a-gA-G]/, "z,");
    if (cen["type"] == 10) {
    } else {
      if (cen["grace"]) {
        var _0x1719C = -1;
        var _0x17061 = -1;
        for (var i = cen["istart"] - 1; i > 0; i--) {
          var _0x16D91 = abc_content["charAt"](i);
          if (_0x16D91 != " ") {
            _0x1719C = i;
            break;
          }
        }
        for (
          var i = cen["iend"] + 1;
          i < syms["length"];
          i++
        ) {
          var _0x16D91 = abc_content["charAt"](i);
          if (_0x16D91 != " ") {
            _0x17061 = i;
            break;
          }
        }
        var _0x16E45 = abc_content["substring"](_0x1719C, _0x17061);
        var _0x17115 = abc_content["substring"](
          cen["istart"],
          cen["iend"]
        );
        if (
          _0x16E45["replace"](/\s/, "")["replace"](
            /[\{\}]/g,
            ""
          ) == _0x17115
        ) {
          var _0x167F1 = _0x16E45["replace"](/\{.*\}/, "");
          if (cen["sl2"]) {
            var _0x17142 = -1,
              _0x17034 = -1;
            for (var i = _0x1719C; i > _0x1719C - 5; i--) {
              var _0x16D91 = abc_content["charAt"](i);
              if (_0x16D91 == "(") {
                _0x17142 = i;
                break;
              }
            }
            for (i = _0x17061; i < _0x17061 + 5; i++) {
              var _0x16D91 = abc_content["charAt"](i);
              if (_0x16D91 == ")") {
                _0x17034 = i;
              }
            }
            var _0x172AA = abc_content["substring"](_0x17142 + 1, _0x17034);
            abc_content =
              abc_content["substr"](0, _0x17142) +
              _0x172AA["replace"](/\{.*\}/, "") +
              abc_content["substr"](_0x17034 + 1);
          } else {
            abc_content =
              abc_content["substr"](0, _0x1719C) +
              _0x167F1 +
              abc_content["substr"](_0x17061);
          }
        } else {
          abc_content =
            abc_content["substr"](0, cen["istart"]) +
            abc_content["substr"](cen["iend"]);
        }
      } else {
        abc_content =
          abc_content["substr"](0, cen["istart"]) +
          n_abc_content +
          abc_content["substr"](cen["iend"]);
      }
    }
    $("#source")["val"](abc_content);
    src_change();
    doLog();
  } else {
    if (notes["length"] > 1) {
      var ac_abc_content = abc_content["substring"](
        cen["istart"],
        cen["iend"]
      );
      var _0x1708E = str2notes(ac_abc_content);
      var _0x16FDA = "";
      var param = $(delObj["click_obj"])
        ["parents"]("svg")
        ["find"](
          "text[type='hd']." +
            istart +
            ",text[type='Hd']." +
            istart +
            ",text[type='HD']." +
            istart +
            ",text[type='note'][istart='" +
            istart +
            "']"
        )
        ["sort"](function (_0x1735E, _0x1738B) {
          return (
            $(_0x1738B)["attr"]("y") -
            $(_0x1735E)["attr"]("y")
          );
        });
      var _0x16E18 = $(delObj["click_obj"])["attr"]("y");
      var _0x16E9F = false;
      for (var i = 0; i < param["length"]; i++) {
        if (
          _0x16E18 == $(param[i])["attr"]("y") &&
          !_0x16E9F
        ) {
          _0x16E9F = true;
        } else {
          _0x16FDA += _0x1708E[i]["note"];
        }
      }
      var _0x168A5 = 0;
      if (notes["length"] == 2) {
        _0x168A5 = 1;
      }
      _0x16FDA =
        ac_abc_content["substring"](
          0,
          ac_abc_content["indexOf"]("[") + 1 - _0x168A5
        ) +
        _0x16FDA +
        ac_abc_content["substring"](ac_abc_content["indexOf"]("]") + _0x168A5);
      abc_content =
        abc_content["substr"](0, cen["istart"]) +
        _0x16FDA +
        abc_content["substr"](cen["iend"]);
      $("#source")["val"](abc_content);
      src_change();
      doLog();
    }
  }
}
function delCuntomSlur() {
  var startpoint_element_target = $("rect[type='startpoint']")["attr"]("target");
  var _0x16986 = $("path[id='" + startpoint_element_target + "']");
  var _0x169E0 = $(_0x16986)["attr"]("ss_istart");
  var _0x16959 = $(_0x16986)["attr"]("es_istart");
  var _0x169B3 = syms[_0x169E0];
  var _0x1692C = syms[_0x16959];
  var _0x16A0D = '"' + getGch(_0x169B3, "(slur-") + '"';
  var _0x168FF = '"' + getGch(_0x1692C, ")slur-") + '"';
  var abc_content = $("#source")["val"]();
  abc_content = abc_content["replace"](_0x16A0D, "")["replace"](
    _0x168FF,
    ""
  );
  $("#source")["val"](abc_content);
  doLog();
  src_change();
}
function delSelectDeco() {
  console.log('delSelectDeco');
  var type = $(selectDecoInfo)["attr"]("type");
  var abc_content = $("#source")["val"]();
  var abc_content_temp_p1 = "";
  if (type["indexOf"]("sd8") == 0) {
    var istart = $(selectDecoInfo)["attr"]("istart");
    var abc_content_p = abc_content["substring"](0, istart);
    abc_content_p = replaceLast(abc_content_p, "!showsd8!", "");
    var abc_content_c = abc_content["substring"](istart);
    abc_content_temp_p1 = abc_content_p + abc_content_c;
  } else {
    if (type == "tie") {
      var istart = $(selectDecoInfo)["attr"]("start");
      var s_end = $(selectDecoInfo)["attr"]("end");
      var abc_content_p = abc_content["substring"](0, istart);
      var abc_content_s = abc_content["substring"](istart, s_end)["replace"]("-", "");
      var abc_content_c = abc_content["substring"](s_end);
      abc_content_temp_p1 = abc_content_p + abc_content_s + abc_content_c;
    }else if (eqs("jq,jr,slur,8va,8vb,15ma,15mb", type)) {
      var abc_content_p, abc_content_s, abc_content_c;
      var start = deco_params[type]["start"];
      var end = deco_params[type]["end"];
      var s_start = $(selectDecoInfo)["attr"]("start");
      var s_end = $(selectDecoInfo)["attr"]("end");
      start = start["replace"]("(", "\\(")[
        "replace"
      ](")", "\\)");
      end = end["replace"]("(", "\\(")[
        "replace"
      ](")", "\\)");
      var s_index = -1;
      if (parseInt(s_end) < parseInt(s_start)) {
        s_index = s_start + 0;
        s_start = s_end + 0;
        s_end = s_index;
      }
      var re = new RegExp("([\\s\\S]*)(" + start + ")");
      var re2 = new RegExp("(.*)(" + end + ")");
      abc_content_p = abc_content["substring"](0, s_start);
      var ec = re["exec"](abc_content_p);
      abc_content_p = abc_content_p["replace"](re, "$1");
      abc_content_s = abc_content["substring"](s_start, s_end);
      if (type == "slur") {
        abc_content_c = abc_content["substr"](s_end)["replace"](
          ")",
          ""
        );
      } else {
        abc_content_s = abc_content_s["replace"](re2, "$1");
        abc_content_c = abc_content["substr"](s_end);
      }
      abc_content_temp_p1 = abc_content_p + abc_content_s + abc_content_c;
      switch (type) {
        case "jq":
          type = "cresc";
          break;
        case "jr":
          type = "dim";
          break;
      }
      abc_content_temp_p1 = delDecoPosInfo(abc_content_temp_p1, syms[s_end], type);
    } else {
      if (eqs("0,1,2,3,4,5", type)) {
        var istart = $(selectDecoInfo)["attr"]("istart");
        var sym_data = syms[istart];
        if (sym_data) {
          var dd = getA_ddInfo(sym_data, "fng");
          for (var i = 0; i < dd["length"]; i++) {
            var d = dd[i];
            if (d["str"] == type) {
              abc_content_temp_p1 =
                abc_content["substring"](0, d["istart"]) +
                abc_content["substring"](d["iend"]);
              abc_content_temp_p1 = delDecoPosInfo(abc_content_temp_p1, syms[istart], type);
              break;
            }
          }
        }
      } else {
        if (type == "tubrn") {
          var istart = $(selectDecoInfo)["attr"]("istart");
          var param = deco_params[type];
          var ac_abc_content = "";
          if (param) {
            ac_abc_content = deco_params[type]["start"];
          }
          ac_abc_content = ac_abc_content["replace"]("(", "\\(")
            ["replace"](")", "\\)")
            ["replace"](/\./g, "\\.");
          var re = new RegExp("(.*)" + ac_abc_content);
          var abc_content_p;
          abc_content_p = abc_content["substring"](0, istart);
          abc_content_p = abc_content_p["replace"](re, "$1");
          abc_content_temp_p1 = abc_content_p + abc_content["substring"](istart);
          abc_content_temp_p1 = delDecoPosInfo(abc_content_temp_p1, syms[istart], type);
        } else {
          if (
            abc2svg["diag"] &&
            abc2svg["diag"]["cd"][type]
          ) {
            var istart = $(selectDecoInfo)["attr"]("istart");
            var sym_data = syms[istart];
            var a_gchs = sym_data["a_gch"];
            if (a_gchs) {
              for (
                var i = 0;
                i < a_gchs["length"];
                i++
              ) {
                if (a_gchs[i]["text"] == type) {
                  abc_content_temp_p1 =
                    abc_content["substring"](0, a_gchs[i]["istart"]) +
                    abc_content["substring"](a_gchs[i]["iend"]);
                  abc_content_temp_p1 = delDecoPosInfo(abc_content_temp_p1, syms[istart], type);
                }
              }
            }
          } else {
            var istart = $(selectDecoInfo)["attr"]("istart");
            var sym_data = syms[istart];
            if (sym_data) {
              if(type=='dot'){
                var dd = [sym_data['curr_dd']];
              }else{
                var dd = getA_ddInfo(sym_data, type);
              }
              // console.log(dd, istart, type);
              if (dd["length"] > 0) {
                var d = dd[0];
                // abc_content_temp_p1 = abc_content["substring"](0, d["istart"]) + abc_content["substring"](d["iend"]);
                abc_content_temp_p1 = abc_content["substring"](0, istart-(d["iend"]-d["istart"])) + abc_content["substring"](istart);
                // console.log(abc_content_temp_p1);
                abc_content_temp_p1 = delDecoPosInfo(abc_content_temp_p1, syms[istart], type);
              }
            }
          }
        }
      }
    }
  }
  if (abc_content_temp_p1 == "") {
    return;
  }
  $("#source")["val"](abc_content_temp_p1);
  doLog();
  src_change();
  return;
}
function delDecoPosInfo(ac_abc_content, sym_data, type) {
  var _0x16A94 = getDecoPos(sym_data["istart"], type);
  if (_0x16A94) {
    var a_gchs = sym_data["a_gch"];
    for (var i = 0; i < a_gchs["length"]; i++) {
      var a_gch = a_gchs[i];
      if (a_gch["text"]["indexOf"]("{'gchtype':") > -1) {
        ac_abc_content = ac_abc_content["replace"](
          '"' + a_gch["text"] + '"',
          ""
        );
      }
    }
  }
  return ac_abc_content;
}
var d_reg = /m(.*)v/;
function graphMouseMoveHandle(_0x16062) {
  const noMoves = $('[x][type="hld"],[x][type="accent"],[x][type="To Coda"],[x][type="Fine"],[x][type="D.C."],[x][type="D.S."],[x][type="D.C. al Fine"],[x][type="D.C. al Fine"],[x][type="D.C. al Coda"]')
  if (noMoves.length > 0) {
    return
  }
  var _0x1A5FE = new Date()["getTime"]();
  if (_0x1A5FE - clickTimeMill < 200) {
    return;
  }
  var abc_content = $("#source")["val"]();
  if (musicType == "2") {
    var _0x1962C = getSelectText("source");
    if (_0x1962C == "") {
      var _0x1A7ED = $(".selected_text[type='note']");
      if (_0x1A7ED["length"] > 0) {
        var _0x1A6B2 = $(_0x1A7ED)["attr"]("istart");
        var sym_data = syms[_0x1A6B2];
        if (sym_data) {
          _0x1962C = abc_content["substring"](
            sym_data["istart"],
            sym_data["iend"]
          );
        }
      }
    }
    if (_0x1962C != "" && dragNumNoteFlag) {
      try {
        numStaffDrag(_0x16062);
      } catch (_0x16062) {
        console["log"](_0x16062);
      }
    }
    return;
  }
  if (select_note_info == null || select_note_info["click_obj"] == null) {
    return;
  }
  if (rest) {
    return;
  }
  if ($(select_note_info["click_obj"])["attr"]("type")) {
    if (
      $(select_note_info["click_obj"])
        ["attr"]("type")
        ["indexOf"]("r") == 0
    ) {
      return;
    }
  }
  var _0x17688 = _0x16062["target"];
  if (_0x17688["tagName"]["toLowerCase"]() == "rect") {
    _0x17688 = $(_0x17688)["parents"]("svg");
  } else {
    _0x17688 = $(_0x17688);
  }
  if (_0x16062["touches"]) {
    _0x16062["offsetX"] =
      _0x16062["touches"][0]["pageX"] -
      _0x17688["offset"]()["left"];
    _0x16062["offsetY"] =
      _0x16062["touches"][0]["pageY"] -
      _0x17688["offset"]()["top"];
  }
  var _0x176B5 = getYinfo(
    $(select_note_info["click_obj"])["parents"]("svg"),
    _0x16062["offsetY"] / scale
  );
  console["log"](_0x176B5);
  if (_0x176B5 == null || !_0x176B5) {
    return;
  }
  if (!_0x176B5 || _0x176B5 == null || _0x176B5 == undefined) {
    return;
  }
  var istart = $(select_note_info["click_obj"])["attr"]("istart");
  if (syms[istart] && syms[istart]["type"] == 14) {
    return;
  }
  $("use[type='demo_hl']")["remove"]();
  $(select_note_info["click_obj"])[0]["setAttribute"](
    "y",
    _0x176B5["y"]
  );
  var _0x16E18 = $(select_note_info["click_obj"])["attr"]("y");
  var _0x16986 = $("path[type='stem'][istart='" + istart + "']");
  cen = syms[istart];
  if (!cen) {
    return;
  }
  if (cen && cen["notes"] && cen["notes"]["length"] == 1) {
    if (_0x16986["length"] > 0) {
      var _0x17BA1 = $(_0x16986)["attr"]("d");
      var _0x1A793 = /m(.*)v/;
      var _0x1A766 = _0x17BA1["match"](_0x1A793);
      var _0x1A739 = _0x1A766[1];
      var _0x1A6DF = _0x1A739["split"](" ");
      var _0x1A7C0 = _0x17BA1["replace"](
        _0x1A739,
        _0x1A6DF[0] + " " + _0x16E18
      );
      $(_0x16986)["attr"]("d", _0x1A7C0);
    }
    var _0x1A62B = $(
      "text[type^='flu'][istart='" + istart + "'],text[type^='fld'][istart='" + istart + "']"
    );
    if (_0x1A62B["length"] > 0) {
      var _0x1A658 = $(_0x1A62B)["attr"]("ori_y");
      if (!_0x1A658) {
        $(_0x1A62B)["attr"](
          "ori_y",
          $(_0x1A62B)["attr"]("y")
        );
      }
      var _0x1843E = parseFloat(
        $(select_note_info["click_obj"])["attr"]("ori_y")
      );
      var _0x1A70C = parseFloat(_0x16E18) - _0x1843E;
      var _0x1A685 = parseFloat($(_0x1A62B)["attr"]("ori_y"));
      $(_0x1A62B)["attr"]("y", _0x1A685 + _0x1A70C);
    }
  }
  cen["mouse_pos"] = _0x176B5["mouse_pos"];
  var _0x1A81A = $(cen)["attr"]("x");
  if (_0x176B5) {
    var _0x175D4 = _0x176B5["num"];
    console["log"]("lineNum:", _0x175D4);
    if (_0x175D4 != 0) {
      draw_short_line(
        _0x175D4,
        parseFloat($(select_note_info["click_obj"])["attr"]("x")),
        _0x176B5,
        $(_0x17688)["parents"]("svg")
      );
    }
  }
  console["log"]("graphMouseMoveHandle-end:", new Date()["getTime"]());
  rest = true;
  setTimeout(function () {
    rest = false;
  }, 33);
}
var note_reg = /(\^){0,2}(\_){0,2}(\=){0,1}[A-Ya-y][\,\'\/|1-9]*/g;
var staff_order = [
  "c",
  "d",
  "e",
  "f",
  "g",
  "a",
  "b",
];
function str2notes(ac_abc_content) {
  var notes = ac_abc_content["match"](note_reg);
  var _0x1B8FA = new Array();
  if (notes != null) {
    for (var i = 0; i < notes["length"]; i++) {
      var _0x18AEC = notes[i];
      var _0x18D35 = findIndexByNote(_0x18AEC["replace"](/\d/, ""));
      var _0x17AED = new Object();
      _0x17AED["note"] = _0x18AEC;
      _0x17AED["index"] = _0x18D35;
      _0x1B8FA["push"](_0x17AED);
    }
  }
  return _0x1B8FA["sort"](function (_0x1735E, _0x1738B) {
    return _0x1735E["index"] - _0x1738B["index"];
  });
}
function synStem(sym_data, _0x1BA62, _0x1B9AE) {
  if (sym_data["beam_st"] && sym_data["beam_end"]) {
    if ($(_0x1BA62)["length"] > 0) {
      var _0x17BA1 = $(_0x1BA62)["attr"]("d");
      var _0x168A5 = d_reg["exec"](_0x17BA1);
      if (_0x168A5 != null) {
        if (sym_data["notes"]["length"] == 0) {
          var _0x1BA35 = _0x168A5[1];
          var _0x1B9DB = _0x168A5[1];
          var _0x17B47 = _0x1B9DB["split"](" ");
          var _0x1BA08 = 0;
          if (_0x17B47["length"] > 0) {
            _0x1BA08 = parseFloat(_0x17B47[1]) - _0x1B9AE;
          }
          _0x17BA1 = _0x17BA1["replace"](
            _0x1BA35,
            _0x17B47[0] + " " + _0x1BA08
          );
        } else {
        }
      }
      $(_0x1BA62)[0]["setAttribute"]("d", _0x17BA1);
    }
  }
}
function synTail(sym_data, _0x1BA8F, _0x1B9AE) {
  if ($(_0x1BA8F)["length"] > 0) {
    $(_0x1BA8F)[0]["setAttribute"](
      "y",
      parseFloat($(_0x1BA8F)["attr"]("y")) - _0x1B9AE
    );
  }
}
function graphMouseUpHandle(_0x16062) {
  var _0x1A5FE = new Date()["getTime"]();
  if (_0x1A5FE - clickTimeMill < 200) {
    select_note_info = null;
    return;
  }
  console["log"]("graphMouseUpHandle:", select_note_info);
  if (select_note_info != null && cen != null) {
    if (cen["type"] == 0) {
      return;
    }
    var notes = cen["notes"];
    var abc_content = $("#source")["val"]();
    var istart = $(select_note_info["click_obj"])["attr"]("istart");
    var _0x1843E = $(select_note_info["click_obj"])["attr"]("ori_y");
    var _0x1A847 = $(select_note_info["click_obj"])["attr"]("y");
    if (_0x1843E && _0x1843E == _0x1A847) {
      select_note_info = null;
      return;
    }
    if (notes && notes["length"] == 1) {
      var _0x18C81 = getNewNote(cen);
      console["log"]("noteobj:", _0x18C81["note"]);
      var _0x18AEC = _0x18C81["note"];
      var g_note_obj = genNoteAndDur(_0x18AEC, cen);
      g_note_obj["note"] = _0x18AEC;
      update_note_istart = istart;
      update_note_index = 0;
      console["log"]("2:graphMouseMoveHandle-start:", new Date()["getTime"]());
      replaceNote("source", cen["istart"], cen["iend"], g_note_obj);
    } else {
      var _0x1846B = $(select_note_info["click_obj"])["attr"](
        "update_index"
      );
      if (!_0x1846B) {
        select_note_info = null;
        return;
      }
      var _0x18C81 = getNewNote(cen);
      var _0x18AEC = _0x18C81["note"];
      update_note_istart = istart;
      var ac_abc_content = abc_content["substring"](
        cen["istart"],
        cen["iend"]
      );
      var _0x1708E = str2notes(ac_abc_content);
      var _0x1881C = "";
      if (_0x1708E[0] != "") {
        _0x1881C = _0x1708E[0]["note"]
          ["replace"](/[a-zA-Z]/g, "")
          ["replace"](/[\,\'\=\^\_]/g, "");
      }
      var _0x16FDA = "";
      for (var i = 0; i < _0x1708E["length"]; i++) {
        if (i != parseInt(_0x1846B)) {
          _0x16FDA += _0x1708E[i]["note"];
        } else {
          _0x16FDA += _0x18AEC + _0x1881C;
        }
      }
      var _0x1A874 = str2notes(_0x16FDA);
      _0x16FDA = "";
      for (var i = 0; i < _0x1A874["length"]; i++) {
        _0x16FDA += _0x1A874[i]["note"];
      }
      _0x16FDA =
        ac_abc_content["substring"](0, ac_abc_content["indexOf"]("[") + 1) +
        _0x16FDA +
        ac_abc_content["substring"](ac_abc_content["indexOf"]("]"));
      abc_content =
        abc_content["substr"](0, cen["istart"]) +
        _0x16FDA +
        abc_content["substr"](cen["iend"]);
      if (_0x16FDA != ac_abc_content) {
        $("#source")["val"](abc_content);
        doLog();
        render();
      }
    }
  }
  select_note_info = null;
}
function restoreRest() {
  if ($(".reststatus")["hasClass"]("selected")) {
    $(".reststatus")["click"]();
  }
}
function restoreChord() {
  if ($(".chord.selected")["length"] > 0) {
    $(".chord.selected")["click"]();
  }
}
var dragObj = null;
function initDecoDrag() {
  var _0x1A928 = false;
  var _0x1A8FB = false;
  var _0x1A955 = null;
  var _0x1A8CE = ".cmenu";
  $(_0x1A8CE)["attr"]("draggable", false);
  $(_0x1A8CE)["off"]("touchstart")["on"]("touchstart", _0x1A8A1);
  $(_0x1A8CE)["off"]("mousedown")["mousedown"](_0x1A8A1);
  function _0x1A8A1(_0x16062) {
    if ($("rect[type='startpoint']")["length"] > 0) {
      src_change();
    }
    if ($("#graphEditorMenuInsert")["hasClass"]("menu-pressed")) {
      graph_update = true;
      draw_editor = false;
      $("#use_black")["remove"]();
      if ($("#graphEditorMenuInsert")) {
        $("#graphEditorMenuInsert")["removeClass"]("menu-pressed");
      }
      if ($("#graphEditorMenuUpdate")) {
        $("#graphEditorMenuUpdate")["addClass"]("menu-pressed");
      }
      $("#selectedStatus")["removeClass"]("menu-pressed");
    }
    var _0x1A9DC = _0x16062["touches"]
      ? _0x16062["touches"][0]["pageX"]
      : _0x16062["pageX"];
    var _0x1AA09 = _0x16062["touches"]
      ? _0x16062["touches"][0]["pageY"]
      : _0x16062["pageY"];
    var _0x1A9AF = _0x16062["touches"] ? "touchmove" : "mousemove";
    var _0x193B6 = _0x16062["touches"] ? "touchend" : "mouseup";
    var $that = $(this);
    dragObj = this;
    var _0x1AA36 = $that["attr"]("src");
    _0x1A955 = setTimeout(function () {
      isSelectDeco = true;
      var _0x1AB71 = {
        left: $("#target")["offset"]()["left"],
        top: $("#target")["offset"]()["top"],
        width: $("#target")["width"](),
        height: $("#target")["height"](),
      };
      var _0x1AAEA = true;
      var _0x1AABD = '<img draggable="false" ondragstart="return false;" src="_src" class="drag-note-img" style="top:_top;left:_left;"/>';
      var _0x1AA90 = $that["attr"]("data-code");
      var type = $that["attr"]("data-type");
      var _0x1AB44 = $that["attr"]("data-music-type");
      var _0x1824F = $that["attr"]("value");
      var _0x1ABCB = $that["attr"]("value2");
      var _0x18A65 = $that["attr"]("dur");
      var _0x1AB17 = $that["attr"]("data-know-id");
      var _0x1AB9E = $that["attr"]("position");
      var type = $that["attr"]("type");
      console["log"]("----------", type);
      selectDecoType = type;
      var _0x1AA63 = $that["attr"]("class");
      if (typeof draw_editor != undefined) {
        draw_editor = true;
      }
      _0x1AABD = _0x1AABD["replace"]("_top", _0x1AA09 + "px")
        ["replace"]("_left", _0x1A9DC + "px")
        ["replace"]("_src", _0x1AA36);
      $(".drag-note-img")["remove"]();
      $("body")["append"](_0x1AABD);
      if (_0x16062 && _0x16062["stopPropagation"]) {
        _0x16062["stopPropagation"]();
      } else {
        window["event"]["cancelBubble"] = true;
      }
      $(document)
        ["off"](_0x1A9AF)
        ["on"](_0x1A9AF, function (_0x16062) {
          _0x1A9DC = _0x16062["touches"]
            ? _0x16062["touches"][0]["pageX"]
            : _0x16062["pageX"];
          _0x1AA09 = _0x16062["touches"]
            ? _0x16062["touches"][0]["pageY"]
            : _0x16062["pageY"];
          if (_0x1AAEA) {
            $(".drag-note-img")["css"]({ top: _0x1AA09, left: _0x1A9DC });
            if (
              _0x1A9DC > _0x1AB71["left"] &&
              _0x1A9DC < _0x1AB71["left"] + _0x1AB71["width"] &&
              _0x1AA09 > _0x1AB71["top"] &&
              _0x1AA09 < _0x1AB71["top"] + _0x1AB71["height"]
            ) {
              _0x1A928 = false;
              _0x1A8FB = true;
              if (_0x16062["touches"]) {
                var _0x1ABF8 = $("svg");
                for (
                  var i = 0;
                  i < _0x1ABF8["length"];
                  i++
                ) {
                  var _0x1646D = _0x1ABF8["eq"](i);
                  if (
                    _0x1A9DC > _0x1646D["offset"]()["left"] &&
                    _0x1AA09 > _0x1646D["offset"]()["top"] &&
                    _0x1A9DC <
                      _0x1646D["offset"]()["left"] +
                        _0x1646D["width"]() &&
                    _0x1AA09 <
                      _0x1646D["offset"]()["top"] +
                        _0x1646D["height"]()
                  ) {
                    _0x16062["target"] = _0x1646D[0];
                    break;
                  }
                }
                var _0x17688 = _0x16062["target"];
                _0x16062["offsetX"] =
                  _0x16062["touches"][0]["pageX"] -
                  $(_0x17688)["offset"]()["left"];
                _0x16062["offsetY"] =
                  _0x16062["touches"][0]["pageY"] -
                  $(_0x17688)["offset"]()["top"];
                console["log"]("decoType:", type);
                if (type == "linkclef") {
                  movingRenderStaff(_0x16062);
                } else {
                  if (type == "nodeline") {
                    moveingRenderBar(_0x16062);
                  } else {
                    mousemovehandler(_0x16062);
                  }
                }
              }
            }
          }
        })
        ["off"](_0x193B6)
        ["on"](_0x193B6, function (_0x16062) {
          _0x1AAEA = false;
          if (!isSelectDeco) {
            return;
          }
          $(".drag-note-img")["remove"]();
          console["log"]("---end");
          dragObj = null;
          console["log"]("value:", _0x1824F, "position", _0x1AB9E);
          genNoteDeco(_0x1824F, _0x1ABCB, _0x1AB9E, type);
          isSelectDeco = false;
          selectDecoType = "";
          if (!$("#graphEditorMenu")["hasClass"]("menu-pressed")) {
            draw_editor = false;
          }
        });
    }, 200);
  }
  $(_0x1A8CE)
    ["off"]("mouseup")
    ["mouseup"](function () {
      if (_0x1A955 != null) {
        clearTimeout(_0x1A955);
      }
      if (typeof draw_editor != undefined) {
        draw_editor = false;
      }
    })
    ["off"]("touchend")
    ["on"]("touchend", function () {
      if (_0x1A955 != null) {
        clearTimeout(_0x1A955);
      }
    });
}
function selectBar(_0x17688, _0x1A4C3, _0x199B0, _0x1B549) {
  if (graphEditor["pianoImpro"] && graphEditor["pianoImpro"]["isOpen"]) {
    return;
  }
  var _0x16008 = _0x1A4C3["offsetX"];
  var _0x16035 = _0x1A4C3["offsetY"];
  var _0x175D4 = $(_0x17688)["attr"]("index");
  var _0x1A2A7 = getClickBarIndex(_0x16008, _0x16035, _0x199B0, _0x175D4);
  if (_0x1A2A7 == -1) {
    return;
  }
  var _0x19875 = new Array();
  if (user["isShift"]) {
    if (lastSelectBarIndex != -1) {
      var _0x1B5A3 = -1;
      if (lastSelectBarIndex > _0x1A2A7) {
        _0x1B5A3 = lastSelectBarIndex + 0;
        lastSelectBarIndex = _0x1A2A7;
        _0x1A2A7 = _0x1B5A3;
      }
      for (
        var i = lastSelectBarIndex;
        i <= _0x1A2A7;
        i++
      ) {
        var _0x1738B = new Object();
        _0x1738B["bar_num"] = i;
        _0x1738B["color"] = "#0E518F";
        _0x1738B["stroke"] = "#0E518F";
        _0x19875["push"](_0x1738B);
      }
    }
  } else {
    var _0x1738B = new Object();
    _0x1738B["bar_num"] = _0x1A2A7;
    _0x1738B["color"] = "#0E518F";
    _0x1738B["stroke"] = "#0E518F";
    _0x19875["push"](_0x1738B);
  }
  lastSelectBarIndex = _0x1A2A7;
  $("svg[type='rectbar']")["remove"]();
  renderByBarIndex(_0x19875, "bar");
  $("#mysvgbar" + _0x1A2A7)["attr"]("barIndex", _0x1A2A7);
  if (!$("#mysvgbar" + _0x1A2A7)["offset"]()) {
    return;
  }
  var _0x1619D = $("#mysvgbar" + _0x1A2A7)["offset"]()["top"];
  var _0x19BCC = $("#mysvgbar" + _0x1A2A7)["offset"]()["left"];
  var _0x1B51C = getSelectBarContent(_0x1A2A7, 0);
  var _0x1B4EF = getPreBarInfo(_0x1A2A7, 0);
  if (_0x1B51C == null) {
    return;
  }
  if (
    _0x1B51C["indexOf"]("$") > -1 ||
    (_0x1B4EF && _0x1B4EF["nextBr"])
  ) {
    $("#btnAddBr")["html"]("\u53d6\u6d88\u6362\u884c");
  } else {
    $("#btnAddBr")["html"]("\u6362\u884c");
  }
  if (_0x1A2A7 == 0) {
    $("#btnAddBr")["hide"]();
    $("#changeInstrBtn")["show"]();
    var _0x1B576 = getStaffInfo();
    if (_0x1B576["vocalCount"] > 1) {
      $("#delStaff")["show"]();
    } else {
      $("#delStaff")["hide"]();
    }
  } else {
    $("#changeInstrBtn")["hide"]();
    $("#btnAddBr")["show"]();
    $("#delStaff")["hide"]();
  }
  var _0x1673D = $(".abc-content")["offset"]()["top"];
  var _0x16710 = $(".abc-content")["offset"]()["left"];
  if (_0x1B549) {
    $("#nodeMenu")
      ["css"]("position", "absolute")
      ["css"](
        "top",
        _0x1619D - _0x1673D - $("#nodeMenu")["height"]()
      )
      ["css"]("left", _0x19BCC - _0x16710);
    $("#nodeMenu")["attr"]("barIndex", _0x1A2A7);
  }
}
function selectNode(_0x17688, _0x1A4C3, _0x199B0, _0x1B549) {
  if (graphEditor["pianoImpro"] && graphEditor["pianoImpro"]["isOpen"]) {
    return;
  }
  var _0x16008 = _0x1A4C3["offsetX"];
  var _0x16035 = _0x1A4C3["offsetY"];
  var _0x175D4 = $(_0x17688)["attr"]("index");
  var _0x1B5FD = getClickNodeInfo(_0x16008, _0x16035, _0x199B0, _0x175D4);
  if (_0x1B5FD == null) {
    return;
  }
  var _0x1A2A7 = _0x1B5FD["node_index"];
  var _0x1B5D0 = _0x1B5FD["v"];
  var _0x1B62A = $(_0x17688)["find"]("g[type='staff']")["length"];
  var _0x19875 = new Array();
  if (_0x1A4C3["shiftKey"]) {
    if (lastSelectBarIndex != -1) {
      var _0x1B5A3 = -1;
      if (lastSelectBarIndex > _0x1A2A7) {
        _0x1B5A3 = lastSelectBarIndex + 0;
        lastSelectBarIndex = _0x1A2A7;
        _0x1A2A7 = _0x1B5A3;
      }
      for (
        var i = lastSelectBarIndex;
        i <= _0x1A2A7;
        i++
      ) {
        if (_0x1B5D0 == lastSelectNodeV) {
          var _0x1738B = new Object();
          _0x1738B["bar_num"] = i;
          _0x1738B["color"] = "#0E518F";
          _0x1738B["stroke"] = "#0E518F";
          _0x1738B["v"] = _0x1B5D0;
          _0x19875["push"](_0x1738B);
        } else {
          selectBar(_0x17688, _0x1A4C3, _0x199B0, _0x1B549);
          return;
        }
      }
    }
  } else {
    var _0x1738B = new Object();
    _0x1738B["bar_num"] = _0x1B5FD["node_index"];
    _0x1738B["v"] = _0x1B5FD["v"];
    _0x1738B["color"] = "#0E518F";
    _0x1738B["stroke"] = "#0E518F";
    _0x19875["push"](_0x1738B);
  }
  lastSelectBarIndex = _0x1A2A7;
  lastSelectNodeV = _0x1B5D0;
  $("svg[type='rectbar']")["remove"]();
  renderStaffNodeBySt(_0x19875, "node");
  $("#mysvgnode" + _0x1B5D0 + "_" + _0x1A2A7)["attr"](
    "barIndex",
    _0x1A2A7
  );
  var _0x1619D = $("#mysvgnode" + _0x1B5D0 + "_" + _0x1A2A7)[
    "offset"
  ]()["top"];
  var _0x19BCC = $("#mysvgnode" + _0x1B5D0 + "_" + _0x1A2A7)[
    "offset"
  ]()["left"];
  var _0x1B51C = getSelectBarContent(_0x1A2A7, 0);
  var _0x1B4EF = getPreBarInfo(_0x1A2A7, 0);
  if (_0x1B51C == null) {
    return;
  }
  if (
    _0x1B51C["indexOf"]("$") > -1 ||
    (_0x1B4EF && _0x1B4EF["nextBr"])
  ) {
    $("#btnAddBr")["html"]("\u53d6\u6d88\u6362\u884c");
    $("#notebr")["prop"]("checked", true);
  } else {
    $("#btnAddBr")["html"]("\u6362\u884c");
    $("#notebr")["prop"]("checked", false);
  }
  if (_0x1A2A7 == 0) {
    $("#btnAddBr")["hide"]();
    var _0x1B576 = getStaffInfo();
    $("#changeInstrBtn")["show"]();
    if (_0x1B576["vocalCount"] > 1) {
      $("#delStaff")["show"]();
    } else {
      $("#delStaff")["hide"]();
    }
  } else {
    $("#changeInstrBtn")["hide"]();
    $("#btnAddBr")["show"]();
    $("#delStaff")["hide"]();
  }
  var _0x1673D = $(".abc-content")["offset"]()["top"];
  var _0x16710 = $(".abc-content")["offset"]()["left"];
  if (_0x1B549) {
    $("#nodeMenu")
      ["css"]("position", "absolute")
      ["css"](
        "top",
        _0x1619D - _0x1673D - $("#nodeMenu")["height"]()
      )
      ["css"]("left", _0x19BCC - _0x16710)
      ["show"]();
    $("#nodeMenu")["attr"]("barIndex", _0x1A2A7);
  }
}
function getSelectNodeContent(_0x1A2A7, _0x185A6) {
  var _0x168D2 = new RegExp(".*%V" + _0x185A6 + "end");
  var _0x1A2D4 = $("#source")["val"]()["match"](_0x168D2);
}
var lastSelectBarIndex = -1;
var lastSelectNodeV = -1;
function getClickBarIndex(_0x16008, _0x16035, _0x199B0, _0x175D4) {
  var _0x198CF = getBarLineCoor(_0x199B0);
  for (var i = 0; i < _0x198CF["length"]; i++) {
    if (_0x198CF[i]["line"] == parseInt(_0x175D4)) {
      var _0x199DD = _0x198CF[i]["barline_start"][0];
      var _0x19A37 = _0x198CF[i]["barline_start"][1];
      var _0x19A0A = _0x198CF[i]["barline_start"][2];
      var _0x19A64 = _0x198CF[i]["barline_start"][3];
      var _0x198FC = _0x198CF[i]["barline_end"][0];
      var _0x19956 = _0x198CF[i]["barline_end"][1];
      var _0x19929 = _0x198CF[i]["barline_end"][2];
      var _0x19983 = _0x198CF[i]["barline_end"][3];
      if (
        _0x16008 >= _0x199DD &&
        _0x16008 <= _0x198FC &&
        _0x16035 >= _0x19A37 &&
        _0x16035 <= _0x19A64
      ) {
        return i;
      }
    }
  }
  return -1;
}
function getClickNodeInfo(_0x16008, _0x16035, _0x199B0, _0x175D4) {
  var _0x19A91 = getStaffNodeCoor(_0x199B0);
  for (var i = 0; i < _0x19A91["length"]; i++) {
    if (_0x19A91[i]["line"] == parseInt(_0x175D4)) {
      var _0x199DD = _0x19A91[i]["nodeline_start"][0];
      var _0x19A37 = _0x19A91[i]["nodeline_start"][1];
      var _0x19A0A = _0x19A91[i]["nodeline_start"][2];
      var _0x19A64 = _0x19A91[i]["nodeline_start"][3];
      var _0x198FC = _0x19A91[i]["nodeline_end"][0];
      var _0x19956 = _0x19A91[i]["nodeline_end"][1];
      var _0x19929 = _0x19A91[i]["nodeline_end"][2];
      var _0x19983 = _0x19A91[i]["nodeline_end"][3];
      if (
        _0x16008 >= _0x199DD &&
        _0x16008 <= _0x198FC &&
        _0x16035 >= _0x19A37 &&
        _0x16035 <= _0x19A64
      ) {
        return _0x19A91[i];
      }
    }
  }
  return null;
}
function setBarsPerstaffWithLineBreak() {
  var index = $("#nodeMenu")["attr"]("barIndex");
}
function genTremlo(sym_data, val) {
  var abc_content = $("#source")["val"]();
  var _0x1981B = sym_data["prev"];
  var ts_next = sym_data["next"];
  var _0x19794 = "";
  var _0x19578 = "";
  var _0x19848 = "";
  var abc_content_temp_p1 = "";
  if (_0x1981B) {
    _0x19578 = abc_content["substring"](0, _0x1981B["iend"]);
    abc_content_temp_p1 = _0x19578;
    _0x19794 = abc_content["substring"](
      _0x1981B["iend"],
      sym_data["istart"]
    );
    _0x19794 = _0x19794["replace"](/\![/]*\-\!/, "");
    abc_content_temp_p1 += _0x19794;
    var _0x19767 = abc_content["substring"](
      sym_data["istart"],
      sym_data["iend"]
    );
    _0x19767 = _0x19767["replace"](/\d/g, "")["replace"](
      /[\/]/g,
      ""
    );
    var _0x1973A = getDurStrByNoteDur(
      sym_data["dur"] * 2,
      sym_data["my_ulen"]
    );
    if (_0x1973A == "1") {
      _0x1973A = "";
    }
    _0x19767 = _0x19767 + _0x1973A;
    abc_content_temp_p1 += val + _0x19767;
    var _0x197EE = abc_content["substring"](
      ts_next["istart"],
      ts_next["iend"]
    );
    _0x197EE = _0x197EE["replace"](/\d/g, "")["replace"](
      /[\/]/g,
      ""
    );
    var _0x197C1 = _0x1973A;
    _0x197EE = _0x197EE + _0x1973A;
    abc_content_temp_p1 += abc_content["substring"](
      sym_data["iend"],
      ts_next["istart"]
    );
    abc_content_temp_p1 += _0x197EE;
    abc_content_temp_p1 += abc_content["substring"](ts_next["iend"]);
    $("#source")["val"](abc_content_temp_p1);
    doLog();
    src_change();
  }
}
function genNoteDeco(val, insert_content, position, type) {
  console.log('genNoteDeco:', val, insert_content, position, type);
  if ($(".editor_rect[type='rest']")[0]) {
    if (["^", "^^", "=", "_", "__"].includes(val)) return;
  }
  if (["$mergeAll", "$mergeLeft", "$mergeRight"].includes(val)) return;
  console["log"]("cen", cen);
  var rectbar = $("svg[type='rectbar'],svg[type='rectnode']");
  if (rectbar["length"] > 0) {
    console.log("这里拖动的是小节类型的----选中的小节序号：", $(rectbar)["attr"]("barIndex"));
    genBarDeco(
      val,
      insert_content,
      position,
      type,
      $(rectbar)["attr"]("barIndex")
    );
    return;
  }
  if (val == '"(slur"') {
    if (cen == null || !cen["istart"]) {
      return;
    }
    console["log"]("\u81ea\u5b9a\u4e49\u8fde\u97f3\u7ebf");
    var _0x17250 = customSlur["size"];
    var _0x1943D = -1;
    customSlur["forEach"](function (_0x1824F, _0x18795) {
      _0x1943D = parseInt(_0x18795["replace"]("slur", ""));
    });
    _0x17250 = _0x1943D + 1;
    var _0x19659 = '"(slur-' + _0x17250 + '[sx:0,sy:0,c1x:0,c1y:0,c2x:0,c2y:0]"';
    var _0x193B6 = '")slur-' + _0x17250 + '[x:0,y:0]"';
    var abc_content = $("#source")["val"]();
    abc_content =
      abc_content["substring"](0, cen["istart"]) +
      _0x19659 +
      abc_content["substring"](cen["istart"], cen["iend"]) +
      _0x193B6 +
      abc_content["substring"](cen["iend"]);
    $("#source")["val"](abc_content);
    doLog();
    src_change();
    return;
  }
  if (val == '"[-num-"' || val == '"_[-num-"') {
    console["log"]("\u81ea\u5b9a\u4e49\u6807\u6ce8");
    var _0x17250 = bracketGch["size"];
    while (bracketGch["get"]("bracketgch" + _0x17250) != null) {
      _0x17250++;
    }
    var _0x19659 = '"[-' + _0x17250 + '-\u6587\u5b57"';
    var _0x193B6 = '"' + _0x17250 + '-]"';
    if (val == '"_[-num-"') {
      _0x19659 = '"_[-' + _0x17250 + '-\u6587\u5b57"';
    }
    var abc_content = $("#source")["val"]();
    abc_content =
      abc_content["substring"](0, cen["istart"]) +
      _0x19659 +
      abc_content["substring"](cen["istart"], cen["iend"]) +
      _0x193B6 +
      abc_content["substring"](cen["iend"]);
    $("#source")["val"](abc_content);
    doLog();
    src_change();
    return;
  }
  if (val == '"[~num~"' || val == '"_[~num~"') {
    console["log"]("\u81ea\u5b9a\u4e49\u6807\u6ce8");
    var _0x17250 = waveGch["size"];
    while (waveGch["get"]("wavegch" + _0x17250) != null) {
      _0x17250++;
    }
    var _0x19659 = '"[~' + _0x17250 + '~\u6587\u5b57"';
    var _0x193B6 = '"' + _0x17250 + '~]"';
    if (val == '"_[~num~"') {
      _0x19659 = '"_[~' + _0x17250 + '~\u6587\u5b57"';
    }
    var abc_content = $("#source")["val"]();
    abc_content =
      abc_content["substring"](0, cen["istart"]) +
      _0x19659 +
      abc_content["substring"](cen["istart"], cen["iend"]) +
      _0x193B6 +
      abc_content["substring"](cen["iend"]);
    $("#source")["val"](abc_content);
    doLog();
    src_change();
    return;
  }
  if (type == "linkclef") {
    if ($(".select_staff")["length"] > 0) {
      $("g[type='staff']")
        ["find"]("path")
        ["css"]("stroke", "black");
      genLinkClef(val);
    }
    return;
  }
  if (cen == null) {
    return;
  }
  if (
    val == "!/-!" ||
    val == "!//-!" ||
    val == "!///-!"
  ) {
    if (!cen["next"]) {
      return;
    }
    if (cen["next"] && cen["next"]["type"] != 8) {
      return;
    }
    genTremlo(cen, val);
    return;
  }
  if (val == "arp_link") {
    setArpLink("source");
    return;
  }
  if (type == "spl") {
    dragSplNum = true;
    console.log('updateNextNote', val, cen["istart"], chordInput);
    updateNextNote(val, cen["istart"], chordInput, true);
    dragSplNum = false;
    lastMidiReplaceNoteIstart = -1;
    lastMidiReplaceNoteV = -1;
    return;
  }
  var abc_content = $("#source")["val"]();
  if (position == "rhythm") {
    var g_note_obj = genNoteAndDur(val, cen, true, 384);
    replaceNote("source", cen["istart"], cen["iend"], g_note_obj);
    return;
  }
  if (val["indexOf"]("[K:") == 0 && cen["type"] == 1) {
    var _0x18D08 = abc_content["substring"](cen["istart"], cen["iend"]);
    var _0x19302 = /(treble)|(bass)|(alto)|(tenor)/;
    if (_0x19302["test"](_0x18D08)) {
      _0x18D08 = _0x18D08["replace"](
        _0x19302,
        val["replace"]("[K:", "")["replace"](
          "]",
          ""
        )
      );
    } else {
      _0x18D08 =
        _0x18D08 +
        " " +
        val["replace"]("[K:", "")["replace"](
          "]",
          ""
        );
    }
    var abc_content_temp_p1 =
      abc_content["substring"](0, cen["istart"]) +
      _0x18D08 +
      abc_content["substring"](cen["iend"]);
    $("#source")["val"](abc_content_temp_p1);
    src_change();
    doLog();
    return;
  }
  var abc_content = $("#source")["val"]();
  if (type == "lyric") {
    updateLyrics(cen, [val]);
    return;
  }
  if (val == "{}" || val == "{/}") {
    var _0x1962C = abc_content["substring"](cen["istart"], cen["iend"]);
    if ("before" == position) {
      if (type == "syy") {
        val =
          val["replace"]("}", "") +
          _0x1962C["replace"](/\d/g, "")["replace"](
            /\//g,
            ""
          ) +
          _0x1962C["replace"](/\d/g, "")["replace"](
            /\//g,
            ""
          ) +
          "}" +
          _0x1962C;
      } else {
        if (/\d+/["test"](type)) {
          var _0x19389 = getDurStrByNoteDur(
            1536 / parseInt(type),
            cen["my_ulen"]
          );
          if (_0x19389 == "1") {
            _0x19389 = "";
          }
          val =
            val["replace"]("}", "") +
            _0x1962C["replace"](/\d/g, "")["replace"](
              /\//g,
              ""
            ) +
            _0x19389 +
            "}" +
            _0x1962C;
        }
      }
    } else {
      if ("after" == position) {
        if (type == "syy") {
          val =
            "(" +
            _0x1962C +
            "{" +
            _0x1962C["replace"](/\d/g, "")["replace"](
              /[\/\)]/g,
              ""
            ) +
            _0x1962C["replace"](/\d/g, "")["replace"](
              /[\/\)]/g,
              ""
            ) +
            "})";
        } else {
          if (/\d+/["test"](type)) {
            var _0x19389 = getDurStrByNoteDur(
              1536 / parseInt(type),
              cen["my_ulen"]
            );
            if (_0x19389 == "1") {
              _0x19389 = "";
            }
            val =
              "(" +
              _0x1962C +
              "{" +
              _0x1962C["replace"](/\d/g, "")["replace"](
                /[\/\)]/g,
                ""
              ) +
              _0x19389 +
              "})";
          }
        }
      }
    }
    abc_content =
      abc_content["substring"](0, cen["istart"]) +
      val +
      abc_content["substring"](cen["iend"]);
    $("#source")["val"](abc_content);
    if (musicType == 2) {
      src_change();
    } else {
      render();
    }
    doLog();
    return;
  }
  // 连音线
  var _0x195FF = /\((\d)/;
  if (_0x195FF["test"](val)) {
    liaison(val)
    return;
    var _0x17D09 = val["match"](_0x195FF);
    var _0x18BCD = _0x17D09[1];
    console["log"](cen);
    var dur = cen["dur"];
    var _0x17115 = abc_content["substring"](cen["istart"], cen["iend"]);
    var _0x1946A = dur / 2;
    var _0x19497 = "";
    var _0x18BA0 = cen["my_ulen"];
    if (_0x1946A > _0x18BA0) {
      var _0x1738B = parseInt(_0x1946A / _0x18BA0);
      if (_0x1738B != 1) {
        _0x19497 = _0x1738B + "";
      }
    } else {
      if (_0x1946A < _0x18BA0) {
        var _0x1738B = parseInt(_0x18BA0 / _0x1946A);
        if (_0x1738B > 1) {
          for (var i = 1; i < _0x1738B; i = i * 2) {
            _0x19497 += "/";
          }
        }
      }
    }
    if (/\d{1,}|\/{1,}/["test"](_0x17115)) {
      _0x17115 = _0x17115["replace"](/\d{1,}|\/{1,}/, _0x19497);
    } else {
      _0x17115 = _0x17115 + _0x19497;
    }
    for (var i = 0; i < _0x18BCD - 1; i++) {
      _0x17115 += "z" + _0x19497;
    }
    var abc_content_temp_p1 =
      abc_content["substring"](0, cen["istart"]) +
      val +
      _0x17115 +
      " " +
      abc_content["substring"](cen["iend"]);
    $("#source")["val"](abc_content_temp_p1);
    if (musicType == 2) {
      src_change();
    } else {
      render();
    }
    doLog();
    return;
  }
  if (val == "!~(!note!~)!") {
    var _0x1962C = abc_content["substring"](cen["istart"], cen["iend"]);
    val = val["replace"]("note", _0x1962C);
    abc_content =
      abc_content["substring"](0, cen["istart"]) +
      val +
      abc_content["substring"](cen["iend"]);
    $("#source")["val"](abc_content);
    if (musicType == 2) {
      src_change();
    } else {
      render();
    }
    doLog();
    return;
  }
  // 这，就是连线！
  if (val == "(note)") {
    if (cen.type === AbcType.Rest) return
    var ts_next = cen["next"];
    var _0x192A8 = cen["istart"];
    var _0x1951E = -1;
    for (var i = _0x192A8 + 1; i < syms["length"]; i++) {
      ts_next = syms[i];
      if (ts_next) {
        if (ts_next["type"] == 8 || ts_next["type"] == 10) {
          if (ts_next["v"] == cen["v"]) {
            _0x1951E = ts_next["iend"];
            break;
          }
        }
      }
    }
    if (_0x1951E == -1) {
      return;
    }
    var _0x1962C = abc_content["substring"](cen["istart"], _0x1951E);
    val = val["replace"]("note", _0x1962C);
    abc_content =
      abc_content["substring"](0, cen["istart"]) +
      val +
      abc_content["substring"](_0x1951E);
    $("#source")["val"](abc_content);
    if (musicType == 2) {
      src_change();
    } else {
      render();
    }
    doLog();
    return;
  }
  if (val == "3/" || val == "7//") {
    var _0x1935C = 1;
    if (val == "3/") {
      _0x1935C = 1.5;
    } else {
      if (val == "7//") {
        _0x1935C = 1.75;
      }
    }
    genDotInfo(cen, _0x1935C);
    return;
    var _0x195D2 = abc_content["substring"](cen["istart"], cen["iend"]);
    var _0x18C54 = new Object();
    var _0x1954B = cen["dur"];
    var _0x1932F = /([\/0-9]+)/g;
    var _0x17D09 = _0x195D2["match"](_0x1932F);
    if (_0x17D09 != null) {
      var _0x19686 = _0x17D09[0];
      var _0x193E3 = _0x19686["indexOf"]("/");
      var _0x19410 = /\d/["test"](_0x19686);
      if (_0x193E3 > 0 && !_0x19410) {
        _0x195D2 =
          _0x195D2["substring"](0, _0x193E3) +
          val +
          _0x195D2["substring"](_0x193E3);
      } else {
        if (_0x193E3 == -1 && _0x19410) {
          var _0x18BCD = parseInt(_0x19686);
          var _0x194F1 = 1;
          if (val == "7//") {
            _0x194F1 = 7 / 4;
          } else {
            if (val == "3/") {
              _0x194F1 = 3 / 2;
            }
          }
          var _0x194C4 = _0x18BCD * _0x194F1;
          _0x194C4 = decimalsToFractional(_0x194C4) + "";
          _0x194C4 = _0x194C4["replace"]("/4", "//")
            ["replace"]("/2", "/")
            ["replace"]("/1", "");
          _0x195D2 = _0x195D2["replace"](/\d/g, _0x194C4);
        }
      }
    } else {
      _0x195D2 += val;
    }
    abc_content =
      abc_content["substring"](0, cen["istart"]) +
      _0x195D2 +
      abc_content["substring"](cen["iend"]);
    $("#source")["val"](abc_content);
    if (musicType == 2) {
      src_change();
    } else {
      render();
    }
    doLog();
    return;
  }
  if (cen["type"] == 0) {
    if (!position) {
      abc_content =
        abc_content["substring"](0, cen["istart"]) +
        val +
        abc_content["substring"](cen["iend"]);
    } else {
      if (position == "after") {
        if (val["indexOf"]("[M:") > -1) {
          var M_val = val;
          abc_content = dragMeter(abc_content, cen, M_val);
        } else {
          abc_content =
            abc_content["substring"](0, cen["iend"]) +
            val +
            abc_content["substring"](cen["iend"]);
        }
      } else {
        // 这，就是谱号！(放置小节)
        if (position == "before") {
          const head = abc_content["substring"](0, cen["istart"]).replace(/(\[K:[^\]]+\]\|?)$/, s => s.indexOf('|') > -1 ? '|' : '')
          const cont = val
          const tail = abc_content["substring"](cen["istart"]).replace(/^(\|\[K:[^\]]+\])/, '|')
          abc_content = head + cont + tail
        }
      }
    }
  } else {
    if (position == "before") {
      if (
        "^" == val ||
        "^^" == val ||
        "_" == val ||
        "__" == val ||
        "=" == val
      ) {
        if (cen["notes"]["length"] > 1) {
          return;
        }
      }
      if (
        "^" == val ||
        "^^" == val ||
        "_" == val ||
        "__" == val ||
        "=" == val
      ) {
        var _0x192D5 = abc_content["substring"](
          cen["istart"],
          cen["iend"]
        );
        _0x192D5 = _0x192D5["replace"](/[\^\_\=]/g, "");
        abc_content =
          abc_content["substring"](0, cen["istart"]) +
          val +
          _0x192D5 +
          abc_content["substring"](cen["iend"]);
      } else {
        if (val["indexOf"]("[M:") > -1) {
          var M_val = val;
          abc_content = dragMeter(abc_content, cen, M_val);
        } else {
          if (val == '".up"' || val == '".down"') {
            if (hasGch(cen, ".up") && val == '".up"') {
              return;
            }
            if (hasGch(cen, ".down") && val == '".down"') {
              return;
            }
            if (hasGch(cen, ".up") && val == '".down"') {
              var _0x19578 = abc_content["substring"](0, cen["istart"]);
              var _0x18D62 = _0x19578["lastIndexOf"]('".up"');
              abc_content =
                _0x19578["substring"](0, _0x18D62) +
                _0x19578["substring"](_0x18D62)["replace"](
                  '".up"',
                  ""
                ) +
                val +
                abc_content["substring"](cen["istart"]);
              $("#source")["val"](abc_content);
              if (musicType == 2) {
                src_change();
              } else {
                render();
              }
              doLog();
              return;
            } else {
              if (hasGch(cen, ".down") && val == '".up"') {
                var _0x19578 = abc_content["substring"](0, cen["istart"]);
                var _0x18D62 = _0x19578["lastIndexOf"]('".down"');
                abc_content =
                  _0x19578["substring"](0, _0x18D62) +
                  _0x19578["substring"](_0x18D62)["replace"](
                    '".down"',
                    ""
                  ) +
                  val +
                  abc_content["substring"](cen["istart"]);
                $("#source")["val"](abc_content);
                if (musicType == 2) {
                  src_change();
                } else {
                  render();
                }
                doLog();
                return;
              }
            }
          }
          var abc_content_s = getMidStr(cen);
          if (abc_content_s["indexOf"](val) < 0) {
            let head = abc_content["substring"](0, cen["istart"])
            if (/\[K:[^\]]+\]/.test(val)) {
              head = head.replace(/\[K:[^\]]+\]\|?$/, s => s.indexOf('|') > -1 ? '|' : '')
            }
            else if (/((\!p+\!)|(\!m(f|p)\!)|(\!f+\!)|(\!sf(z|p)?\!))$/.test(val)) {
              head = head.replace(/((\!p+\!)|(\!m(f|p)\!)|(\!f+\!)|(\!sf(z|p)?\!))$/, s => s.indexOf('|') > -1 ? '|' : '')
            }
            abc_content =
              head +
              val +
              abc_content["substring"](cen["istart"]);
          }
          if (type == "pgt") {
            if (abc_content["indexOf"]("%%diagram") < 0) {
              abc_content = "%%diagram 1\x0A" + abc_content;
            }
          }
        }
      }
    } else {
      if (position == "surround") {
        abc_content =
          abc_content["substring"](0, cen["istart"]) +
          val +
          abc_content["substring"](cen["istart"], cen["iend"]) +
          insert_content +
          abc_content["substring"](cen["iend"]);
      } else {
        if (position == "after") {
          abc_content =
            abc_content["substring"](0, cen["iend"]) +
            val +
            abc_content["substring"](cen["iend"]);
        }
      }
    }
  }
  $("#source")["val"](abc_content);
  if (musicType == 2) {
    src_change();
  } else {
    render();
  }
  doLog();
}
function dragMeter(abc_content, _0x1627E, M_val) {
  var _0x173E5 = new Array();
  var _0x173B8 = new Array();
  var _0x1757A = new Object();
  _0x1757A["v"] = _0x1627E["v"];
  _0x1757A["istart"] = _0x1627E["istart"];
  _0x1757A["iend"] = _0x1627E["iend"];
  _0x1757A["isLineEnd"] = false;
  if (_0x1627E["next"] == null) {
    _0x1757A["isLineEnd"] = true;
  }
  _0x173E5["push"](_0x1627E["istart"]);
  _0x173B8["push"](_0x1627E["iend"]);
  var _0x17520 = new Array();
  _0x17520["push"](_0x1757A);
  var abc_content_temp_p1 = "";
  var _0x17412 = _0x1627E["v"];
  var _0x174F3 = _0x1627E["ts_prev"];
  while (_0x174F3) {
    if (_0x174F3["type"] == 0 && _0x17412 != _0x174F3["v"]) {
      _0x17412 = _0x174F3["v"];
      _0x173E5["push"](_0x174F3["istart"]);
      _0x173B8["push"](_0x174F3["iend"]);
      var _0x1754D = new Object();
      _0x1754D["v"] = _0x174F3["v"];
      _0x1754D["istart"] = _0x174F3["istart"];
      _0x1754D["iend"] = _0x174F3["iend"];
      _0x1754D["isLineEnd"] = _0x1757A["isLineEnd"];
      _0x17520["push"](_0x1754D);
      _0x174F3 = _0x174F3["ts_prev"];
    } else {
      break;
    }
  }
  _0x17412 = _0x1627E["v"];
  var _0x174C6 = _0x1627E["ts_next"];
  while (_0x174C6) {
    if (_0x174C6["type"] == 0 && _0x17412 != _0x174C6["v"]) {
      _0x17412 = _0x174C6["v"];
      _0x173E5["push"](_0x174C6["istart"]);
      _0x173B8["push"](_0x174C6["iend"]);
      var _0x1754D = new Object();
      _0x1754D["v"] = _0x174C6["v"];
      _0x1754D["istart"] = _0x174C6["istart"];
      _0x1754D["iend"] = _0x174C6["iend"];
      _0x1754D["isLineEnd"] = _0x1757A["isLineEnd"];
      _0x17520["push"](_0x1754D);
      _0x174C6 = _0x174C6["ts_next"];
    } else {
      break;
    }
  }
  _0x173E5["sort"](function (_0x1735E, _0x1738B) {
    return _0x1735E - _0x1738B;
  });
  _0x173B8["sort"](function (_0x1735E, _0x1738B) {
    return _0x1735E - _0x1738B;
  });
  _0x17520["sort"](function (_0x1735E, _0x1738B) {
    return _0x1738B["istart"] - _0x1735E["istart"];
  });
  // var _0x1743F = 0;
  abc_content_temp_p1 = abc_content;
  for (var i = 0; i < _0x17520["length"]; i++) {
    var _0x1754D = _0x17520[i];
    var _0x175A7 = _0x1754D["istart"];
    var _0x17499 = M_val;
    if (M_val["indexOf"]("M:C|") > -1) {
      _0x17499 = "[M:2/2]";
    } else {
      if (M_val["indexOf"]("M:C") > -1) {
        _0x17499 = "[M:4/4]";
      }
    }
    abc_content_temp_p1 = resetBarStrByMeter(_0x1754D, _0x17499, abc_content_temp_p1);
  }
  return abc_content_temp_p1;
}
function getDragBarInfo(_0x1627E) {
  var _0x173E5 = new Array();
  var _0x173B8 = new Array();
  var _0x1757A = new Object();
  _0x1757A["v"] = _0x1627E["v"];
  _0x1757A["istart"] = _0x1627E["istart"];
  _0x1757A["iend"] = _0x1627E["iend"];
  _0x173E5["push"](_0x1627E["istart"]);
  _0x173B8["push"](_0x1627E["iend"]);
  var _0x17520 = new Array();
  _0x17520["push"](_0x1757A);
  var abc_content_temp_p1 = "";
  var _0x17412 = _0x1627E["v"];
  var _0x174F3 = _0x1627E["ts_prev"];
  while (_0x174F3) {
    if (_0x174F3["type"] == 0 && _0x17412 != _0x174F3["v"]) {
      _0x17412 = _0x174F3["v"];
      _0x173E5["push"](_0x174F3["istart"]);
      _0x173B8["push"](_0x174F3["iend"]);
      var _0x1754D = new Object();
      _0x1754D["v"] = _0x174F3["v"];
      _0x1754D["istart"] = _0x174F3["istart"];
      _0x1754D["iend"] = _0x174F3["iend"];
      _0x17520["push"](_0x1754D);
      _0x174F3 = _0x174F3["ts_prev"];
    } else {
      break;
    }
  }
  _0x17412 = _0x1627E["v"];
  var _0x174C6 = _0x1627E["ts_next"];
  while (_0x174C6) {
    if (_0x174C6["type"] == 0 && _0x17412 != _0x174C6["v"]) {
      _0x17412 = _0x174C6["v"];
      _0x173E5["push"](_0x174C6["istart"]);
      _0x173B8["push"](_0x174C6["iend"]);
      var _0x1754D = new Object();
      _0x1754D["v"] = _0x174C6["v"];
      _0x1754D["istart"] = _0x174C6["istart"];
      _0x1754D["iend"] = _0x174C6["iend"];
      _0x17520["push"](_0x1754D);
      _0x174C6 = _0x174C6["ts_next"];
    } else {
      break;
    }
  }
  _0x173E5["sort"](function (_0x1735E, _0x1738B) {
    return _0x1735E - _0x1738B;
  });
  _0x173B8["sort"](function (_0x1735E, _0x1738B) {
    return _0x1735E - _0x1738B;
  });
  _0x17520["sort"](function (_0x1735E, _0x1738B) {
    return _0x1738B["istart"] - _0x1735E["istart"];
  });
  return _0x17520;
}
function resetBarStrByMeter(_0x1754D, _0x1B3E1, abc_content) {
  var LinesInfo = getLinesInfo(abc_content);
  console["log"]("vo:", _0x1754D);
  console["log"]("lines:", LinesInfo);
  var istart = _0x1754D["istart"];
  var iend = _0x1754D["iend"];
  var new_content = "";
  var _0x15C84 = 0;
  var _0x1B40E = "";
  var _0x1B3B4 = /linebreak (.)/;
  var _0x1B387 = "";
  if (_0x1B3B4["test"](abc_content)) {
    _0x1B387 = _0x1B3B4["exec"](abc_content)[1];
  }
  var _0x1B43B = /(:\|\|:)|(:\|:)|(:\|)|(::)|(\|:)|(\|\|)|(\|\])|(\|)/g;
  var _0x1B300 = new Array();
  for (var i = 0; i < LinesInfo["length"]; i++) {
    var LineInfo = LinesInfo[i];
    var lineStr = LineInfo["lineStr"];
    if (
      LineInfo["v"] == _0x1754D["v"] &&
      LineInfo["type"] == "note"
    ) {
      if (_0x1B300[_0x1754D["v"]]) {
        new_content += lineStr + "\x0A";
        continue;
      }
      _0x1B300[_0x1754D["v"]] = false;
      var _0x1B495 = LineInfo["startSeq"];
      var _0x1B35A = LineInfo["endSeq"];
      if (_0x1B35A > iend) {
        var ac_abc_content = "";
        if (_0x1B495 < istart) {
          if (
            _0x1754D["isLineEnd"] &&
            _0x15C84 == 0 &&
            abc_content["indexOf"]("linebreak") < 0
          ) {
            _0x1B40E = _0x1B3E1;
          } else {
            if (
              _0x1754D["isLineEnd"] &&
              _0x15C84 == 0 &&
              _0x1B387 != ""
            ) {
              iend += 1;
            }
            ac_abc_content = lineStr["substring"](iend - _0x1B495);
            ac_abc_content = ac_abc_content["replace"](":||:", ":|:")[
              "replace"
            ]("::", ":|:");
            var nodeInfo = "";
            var _0x1B468 = "";
            var _0x18D62 = 0;
            var _0x1B4C2 = "";
            while ((nodeInfo = _0x1B43B["exec"](ac_abc_content))) {
              _0x1B468 = ac_abc_content["substring"](
                _0x18D62,
                nodeInfo["index"]
              );
              var _0x1B32D = replaceNodeContentToRestWithMeter(
                _0x1B468,
                _0x1B3E1
              );
              if (_0x1B468["indexOf"]("$") > -1) {
                _0x1B32D = "$" + _0x1B32D;
              }
              if (_0x1B32D == _0x1B468) {
                _0x1B300[_0x1754D["v"]] = true;
                _0x1B4C2 +=
                  _0x1B32D + ac_abc_content["substring"](nodeInfo["index"]);
                break;
              }
              _0x1B4C2 += _0x1B32D + nodeInfo[0];
              _0x18D62 = nodeInfo["index"] + nodeInfo[0]["length"];
            }
            if (_0x1B4C2["trim"]()["indexOf"]("$") == 0) {
              lineStr =
                lineStr["substring"](0, iend - _0x1B495) +
                "$" +
                _0x1B3E1 +
                _0x1B4C2["substring"](_0x1B4C2["indexOf"]("$") + 1);
            } else {
              lineStr =
                lineStr["substring"](0, iend - _0x1B495) +
                _0x1B3E1 +
                _0x1B4C2;
            }
          }
          _0x15C84++;
        } else {
          ac_abc_content = LineInfo["lineStr"];
          ac_abc_content = ac_abc_content["replace"](":||:", ":|:")[
            "replace"
          ]("::", ":|:");
          var nodeInfo = "";
          var _0x1B468 = "";
          var _0x18D62 = 0;
          var _0x1B4C2 = "";
          while ((nodeInfo = _0x1B43B["exec"](ac_abc_content))) {
            _0x1B468 += ac_abc_content["substring"](
              _0x18D62,
              nodeInfo["index"]
            );
            _0x1B4C2 +=
              replaceNodeContentToRestWithMeter(_0x1B468, _0x1B3E1) +
              nodeInfo[0];
          }
          lineStr =
            lineStr["substring"](0, iend - _0x1B495) +
            _0x1B3E1 +
            _0x1B4C2;
          if (_0x1B40E != "") {
            _0x1B4C2 = _0x1B40E + _0x1B4C2;
            _0x1B40E = "";
          }
          lineStr = _0x1B4C2;
        }
      }
    }
    new_content += lineStr + "\x0A";
  }
  console["log"]("result:", new_content);
  return new_content;
}
var moveSlurHeight = 1;
function moveDeco(_0x16062) {
  $(".editor_rect")["removeClass"]("editor_rect");
  var _0x15FAE = $("rect[selected='selected']");
  var istart = $(_0x15FAE)["attr"]("istart");
  var _0x185A6 = 0;
  if (syms[istart]) {
    _0x185A6 = syms[istart]["v"];
  }
  var type = $(_0x15FAE)["attr"]("dragtype");
  var position = $(_0x15FAE)["attr"]("pos");
  if (type == "linkclef") {
    var _0x1ACD9 = $(_0x15FAE)["parents"]("g")[0];
    var _0x17A39 = $(_0x1ACD9)["attr"]("transform");
    var _0x17A66 = getTransformsTranslate(_0x17A39);
    var _0x1AC52 = 0;
    if (_0x17A66 != null) {
      _0x1AC52 = parseFloat(
        _0x16062["offsetY"] / scale - _0x17A66["y"]
      );
    } else {
      _0x1AC52 = parseFloat(_0x16062["offsetY"] / scale);
    }
    var _0x1AC25 = -1;
    var position = $(_0x15FAE)["attr"]("pos");
    if (position == "start") {
      _0x1AC25 = $('rect[dragtype="linkclef"][pos="end"]')["attr"]("inity");
      if (_0x1AC52 > _0x1AC25) {
        return;
      }
    }
    if (position == "end") {
      _0x1AC25 = $('rect[dragtype="linkclef"][pos="start"]')["attr"]("inity");
      if (_0x1AC52 < _0x1AC25) {
        return;
      }
    }
    var startpoint_element_target = _0x16062["target"];
    if (startpoint_element_target["tagName"] == "svg") {
      var _0x17688 = startpoint_element_target;
      $(_0x17688)
        ["find"]("g[type='staff']")
        ["find"]("path")
        ["css"]("stroke", "black");
      selectStaff(_0x17688, _0x16062);
    } else {
      startpoint_element_target = $(_0x16062["target"])["parents"]("svg");
      var _0x17688 = startpoint_element_target;
      $(_0x17688)
        ["find"]("g[type='staff']")
        ["find"]("path")
        ["css"]("stroke", "black");
      selectStaff(_0x17688, _0x16062);
    }
    selectStaff(_0x17688, _0x16062);
    $(_0x15FAE)["attr"]("y", _0x1AC52);
    return;
  }
  if (type == "slur" && position == "mid") {
    var _0x1AD06 = $(_0x15FAE)["parents"]("g")[0];
    var _0x17A39 = $(_0x1AD06)["attr"]("transform");
    var _0x17A66 = getTransformsTranslate(_0x17A39);
    var _0x1AC52 = parseFloat(
      _0x16062["offsetY"] / scale - _0x17A66["y"]
    );
    var _0x1AC7F = parseFloat($(_0x15FAE)["attr"]("y"));
    var _0x1ACAC = Math["abs"](_0x1AC52 - _0x1AC7F) / _0x1AC7F;
    console["log"]("present:", _0x1ACAC);
    moveSlurHeight = _0x1ACAC * 100;
    if (moveSlurHeight > 3) {
      moveSlurHeight = 3;
    } else {
      if (moveSlurHeight < 1) {
        moveSlurHeight = 1;
      }
    }
    $(_0x15FAE)["attr"]("y", _0x1AC52);
    return;
  }
  if (type == "k_slur") {
    $(_0x15FAE)["attr"]("x", _0x16062["offsetX"]);
  } else {
    $(_0x15FAE)["attr"]("x", _0x16062["offsetX"] / scale);
  }
  var param = $(_0x15FAE)["parents"]("svg")[0];
  nearDecoNote = findNearNoteWithSelectedDeco(
    param,
    _0x16062["offsetX"] / scale,
    _0x16062["offsetY"] / scale,
    type,
    _0x185A6,
    _0x16062
  );
  console["log"]("---", nearDecoNote);
  var istart = $(_0x15FAE)["attr"]("istart");
}

// 更新/插入下个音符
var lastMidiReplaceNoteIstart = -1;
var lastMidiReplaceNoteV = -1;
var midiInStatus = false;
function updateNextNote(inputNote, noteIndex, chordInput, _0x1C197) {
  console.log('updateNextNote:', inputNote, noteIndex, chordInput, _0x1C197);
  if (!graph_update && inputNote !== 'z') {
    return;
  }
  var selected_len = $(".selected_text").length;
  console.log('updateNextNote dragSplNum', dragSplNum);
  if (dragSplNum) {
    selected_len = 1;
  }
  console.log('selected_len', selected_len);
  if (!dragSplNum && selected_len == 0 && lastMidiReplaceNoteIstart == -1) {
    var sym_item = null;
    for (var i = 0; i < syms["length"]; i++) {
      var sym_data = syms[i];
      if (sym_data) {
        if (sym_data["type"] == 10 || sym_data["type"] == 8) {
          sym_item = sym_data;
          break;
        }
      }
    }
    if (sym_item != null) {
      $("text[istart='" + sym_data["istart"] + "']")["addClass"](
        "selected_text"
      );
    }
    selected_len = $(".selected_text").length;
  }
  console.log('selected_len :', selected_len, lastMidiReplaceNoteIstart);
  if (selected_len > 0 || lastMidiReplaceNoteIstart != -1) {
    midiInStatus = true;
    if (selected_len > 0) {
      lastMidiReplaceNoteIstart = -1;
      lastMidiReplaceNoteV = -1;
    }
    var ts_istart = -1;
    if (lastMidiReplaceNoteIstart > 0) {
      if (!syms[lastMidiReplaceNoteIstart]) {
        return;
      }
      var ts_next = syms[lastMidiReplaceNoteIstart]["next"];
      while (ts_next) {
        if (ts_next["type"] == 8 || ts_next["type"] == 10) {
          ts_istart = ts_next["istart"];
          break;
        } else {
          ts_next = ts_next["next"];
          if (ts_next == null) {
            break;
          }
        }
      }
      if (ts_istart === -1) {
        var _0x1C13D = syms[lastMidiReplaceNoteIstart]["my_line"] + 1;
        for (
          var i = 0, _0x1881C = syms["length"];
          i < _0x1881C;
          i++
        ) {
          var _0x1C1C4 = syms[i];
          if (
            _0x1C1C4 &&
            _0x1C1C4["v"] == lastMidiReplaceNoteV &&
            _0x1C1C4["my_line"] == _0x1C13D &&
            (_0x1C1C4["type"] == 8 || _0x1C1C4["type"] == 10)
          ) {
            ts_istart = _0x1C1C4["istart"];
            break;
          }
        }
      }
    } else {
      ts_istart = $($(".selected_text")[$(".selected_text")["length"] - 1])["attr"](
        "istart"
      );
      if (dragSplNum) {
        ts_istart = noteIndex;
      }
    }
    if (ts_istart === -1) {
      if (
        graphEditor["pianoImpro"] &&
        graphEditor["pianoImpro"]["isOpen"]
      ) {
        return;
      }
      appendNodes(1);
      autoChangeLineBars(); // 按全局换行排列自动换行，影响临时换行
      setTimeout(() => {
        console.log('updateNextNote appendNodes:', inputNote, noteIndex);
        updateNextNote(inputNote, noteIndex);
      }, 500);
      midiInStatus = false;
      return;
    }
    var sym_data = syms[ts_istart];
    if (sym_data) {
      lastMidiReplaceNoteIstart = ts_istart;
      lastMidiReplaceNoteV = sym_data["v"];
      var _0x18C54 = genNoteAndDur(inputNote, sym_data);
      console.log("noteInfo:", _0x18C54);
      if (_0x18C54["noteStr"]["startWith"](" ")) {
        lastMidiReplaceNoteIstart++;
      }
      _0x18C54["note"] = inputNote;
      var _0x18BFA = _0x18C54["noteStr"];
      midiInStatus = false;
      if (sym_data["type"] == 10) {
        replaceNote(
          "source",
          sym_data["istart"],
          sym_data["iend"],
          _0x18C54
        );
      } else {
        if (sym_data["type"] == 8) {
          var _0x18C27 = sym_data["dur"];
          if (sym_data["tie_s"]) {
            _0x18C27 += sym_data["tie_s"]["dur"];
          }
          if (_0x18C27 == durSetting) {
            var _0x18A0B = genChordNote(sym_data, inputNote, durSetting);
            if (
              rest_status == "" &&
              chordNote == "" &&
              chordInput
            ) {
              _0x18C54["noteStr"] = _0x18A0B["chordNoteStr"];
            }
            replaceNote(
              "source",
              sym_data["istart"],
              sym_data["iend"],
              _0x18C54
            );
          } else {
            _0x18C54["note_dur"] = durSetting;
            replaceNote(
              "source",
              sym_data["istart"],
              sym_data["iend"],
              _0x18C54
            );
          }
        }
      }
    }
    if (chordInput) {
      $("rect[istart='" + ts_istart + "']")
        ["css"]("fill-opacity", "0.4")
        ["click"]();
      $("text[istart='" + ts_istart + "']")["addClass"]("selected_text");
      clearFocus();
      return ts_istart;
    }
    if (!syms[ts_istart]) {
      ts_istart++;
    }
    if (!_0x1C197) {
      update_note_istart = -1;
      if (!syms[ts_istart]) {
        return;
      }
      var _0x1C1C4 = syms[ts_istart]["next"];
      if (_0x1C1C4) {
        while (_0x1C1C4["type"] != 8 && _0x1C1C4["type"] != 10) {
          _0x1C1C4 = _0x1C1C4["next"];
          if (!_0x1C1C4) {
            break;
          }
        }
        if (_0x1C1C4) {
          $("rect[istart='" + _0x1C1C4["istart"] + "']")
            ["css"]("fill-opacity", "0.4")
            ["click"]();
          $("text[istart='" + _0x1C1C4["istart"] + "']")["addClass"](
            "selected_text"
          );
          if (showHelpNote) {
            addHelpAssessant(_0x1C1C4["istart"]);
          }
          clearFocus();
        }
      }
    }
  } else {
    console.log('没有选中音符');
    window.top.alert('请选中1个音符开始输入');
  }
  return ts_istart;
}

// 自动设置折行
function autoChangeLineBars() {
  console.log('autoChangeLineBars');
  // TODO: 像 changeLineBars();
  changeLineBars();
  // var nodes_info = getNodesInfo($('#source').val());
}

function showLyricInput() {
  var _0x1B738 = new Array();
  var _0x1673D = $("#target")["offset"]()["top"];
  var _0x16710 = $("#target")["offset"]()["left"];
  $("svg")
    ["find"]("rect[type='note'],rect[type='splnum_note']")
    ["each"](function (i, _0x1646D) {
      var istart = $(_0x1646D)["attr"]("istart");
      var sym_data = syms[istart];
      var _0x164C7 = this["getBoundingClientRect"]();
      var _0x1665C = sym_data["a_ly"];
      var _0x1B792 = "";
      if (_0x1665C) {
        for (
          var i = 0, _0x1881C = _0x1665C["length"];
          i < _0x1881C;
          i++
        ) {
          var _0x1B819 = _0x1665C[i];
          if (!_0x1B819) {
            _0x1B792 += "<br>";
            continue;
          }
          if (i > 0) {
            _0x1B792 += "<br>";
          }
          _0x1B792 += _0x1B819["t"];
        }
      }
      var _0x1657B = document["createElement"]("div");
      $(_0x1657B)
        ["css"]("z-index", 2)
        ["css"]("position", "absolute")
        ["css"]("background-color", "white");
      $(_0x1657B)["attr"]("contenteditable", "true");
      $(_0x1657B)["addClass"]("editor-div");
      $(_0x1657B)["attr"]("istart", istart);
      $(_0x1657B)["attr"]("line", sym_data["my_line"]);
      $(_0x1657B)["attr"]("v", sym_data["v"]);
      $(_0x1657B)["html"](_0x1B792);
      $(_0x1657B)["on"]("keyup", function (_0x16062) {
        _0x16062["preventDefault"]();
      });
      $(_0x1657B)[0]["addEventListener"]("paste", function (_0x1A4C3) {
        clipdata = _0x1A4C3["clipboardData"] || window["clipboardData"];
        clipdataContent = clipdata["getData"]("text/plain");
        console["log"]("\u7c98\u8d34\u5185\u5bb9\uff1a", clipdataContent);
        if (clipdataContent != "") {
          var _0x168D2 = /\[(.[^\[]*)\]/g;
          var _0x15F81 = null;
          var _0x16C83 = "";
          var _0x18D62 = 0;
          var _0x1B873 = new Array();
          while ((_0x15F81 = _0x168D2["exec"](clipdataContent))) {
            console["log"](_0x15F81, _0x15F81[0], _0x15F81["index"]);
            _0x16C83 = clipdataContent["substring"](
              _0x18D62,
              _0x15F81["index"]
            );
            if (_0x16C83 != "") {
              var _0x1B846 = _0x16C83["split"]("");
              for (
                var i = 0;
                i < _0x1B846["length"];
                i++
              ) {
                _0x1B873["push"](_0x1B846[i]);
              }
            }
            _0x1B873["push"](_0x15F81[1]);
            _0x18D62 = _0x15F81["index"] + _0x15F81[0]["length"];
          }
          if (_0x18D62 < clipdataContent["length"]) {
            var abc_content_c = clipdataContent["substring"](
              _0x18D62,
              clipdataContent["length"]
            );
            if (abc_content_c != "") {
              var _0x1B846 = abc_content_c["split"]("");
              for (
                var i = 0;
                i < _0x1B846["length"];
                i++
              ) {
                _0x1B873["push"](_0x1B846[i]);
              }
            }
          }
          console["log"]($(this)["attr"]("istart"));
          var istart = $(this)["attr"]("istart");
          var _0x185A6 = $(this)["attr"]("v");
          var _0x1B8A0 = 0;
          for (
            var _0x15D0B = parseInt(istart), _0x1B8CD = syms["length"];
            _0x15D0B < _0x1B8CD;
            _0x15D0B++
          ) {
            if (syms[_0x15D0B] && syms[_0x15D0B]["v"] == _0x185A6) {
              var s_start = syms[_0x15D0B]["istart"];
              if (
                s_start &&
                $(".editor-div[istart=" + s_start + "]")["length"] > 0
              ) {
                if (_0x1B8A0 < _0x1B873["length"]) {
                  $(".editor-div[istart=" + s_start + "]")["html"](
                    _0x1B873[_0x1B8A0++]
                  );
                } else {
                  break;
                }
              }
            }
          }
        }
        _0x1A4C3["preventDefault"]();
      });
      var _0x1B7EC = new Object();
      _0x1B7EC["lineNum"] = sym_data["my_line"];
      _0x1B7EC["v"] = sym_data["v"];
      _0x1B7EC["top"] =
        parseFloat(_0x164C7["top"]) +
        parseFloat(_0x164C7["height"]) +
        $("#target")["scrollTop"]();
      var _0x1B7BF = _0x1B738["find"](function (_0x1646D) {
        return (
          _0x1646D["lineNum"] == sym_data["my_line"] &&
          _0x1646D["v"] == sym_data["v"]
        );
      });
      if (_0x1B7BF == null) {
        _0x1B738["push"](_0x1B7EC);
      } else {
        if (_0x1B7BF["top"] < _0x1B7EC["top"]) {
          _0x1B7BF["top"] = _0x1B7EC["top"];
        }
      }
      $(_0x1657B)
        ["css"]({
          left: _0x164C7["left"] + 10 - _0x16710,
          "min-width": 40,
          "min-height": 30,
        })
        ["show"]();
      $("#target")["append"]($(_0x1657B));
    });
  var _0x1B765 = 0;
  if (musicType == 2) {
    _0x1B765 = 20;
  }
  $(".editor-div")["each"](function (i, _0x1646D) {
    var LineInfo = $(_0x1646D)["attr"]("line");
    var _0x185A6 = $(_0x1646D)["attr"]("v");
    var _0x1B7BF = _0x1B738["find"](function (_0x1646D) {
      return (
        _0x1646D["lineNum"] == LineInfo && _0x1646D["v"] == _0x185A6
      );
    });
    $(_0x1646D)["css"]({
      top: _0x1B7BF["top"] + 20 - _0x1673D + _0x1B765,
    });
  });
}
function genLyric() {
  var _0x18E43 = 0,
    _0x18D8F = [];
  var _0x18E16 = new Array();
  var _0x18DE9 = getLineIndexArr();
  $(".editor-div")["each"](function (i, _0x1646D) {
    var _0x1665C = new Object();
    _0x1665C["str"] = $(_0x1646D)
      ["html"]()
      ["replaceAll"]("<div><br></div>", "<br>")
      ["replaceAll"]("<div>", "<br>")
      ["replaceAll"]("</div>", "");
    _0x1665C["istart"] = parseInt($(_0x1646D)["attr"]("istart"));
    _0x1665C["line"] = getLineIndex(_0x18DE9, _0x1665C["istart"]);
    _0x1665C["update"] = false;
    var sym_data = syms[_0x1665C["istart"]];
    if (sym_data["a_ly"]) {
      var _0x18EF7 = "";
      for (
        var _0x15D0B = 0;
        _0x15D0B < sym_data["a_ly"]["length"];
        _0x15D0B++
      ) {
        var _0x18F24 = sym_data["a_ly"][_0x15D0B];
        if (!_0x18F24) {
          _0x18EF7 += "<br><br>";
          continue;
        }
        var _0x18F51 = _0x18F24["t"];
        if (_0x15D0B == 0) {
          _0x18EF7 = _0x18F51;
        } else {
          _0x18EF7 += "<br>" + _0x18F51;
        }
        if (_0x18F51 != _0x1665C["str"]) {
          _0x1665C["update"] = true;
        }
      }
    } else {
      _0x1665C["update"] = true;
    }
    if (_0x18D8F["indexOf"](_0x1665C["line"]) == -1) {
      _0x18D8F["push"](_0x1665C["line"]);
    }
    _0x18E16["push"](_0x1665C);
    if (
      _0x1665C["str"] &&
      _0x1665C["str"]["split"]("<br>")["length"] > _0x18E43
    ) {
      _0x18E43 = _0x1665C["str"]["split"]("<br>")["length"];
    }
  });
  if (!_0x18E16 || _0x18E16["length"] <= 0) {
    return;
  }
  _0x18E16["sort"](function (_0x1735E, _0x1738B) {
    return _0x1738B["line"] == _0x1735E["line"]
      ? _0x1738B["istart"] - _0x1735E["istart"]
      : _0x1738B["line"] - _0x1735E["line"];
  });
  var LineInfo = _0x18E16[0]["line"];
  var _0x18E9D = [];
  _0x18E9D["push"]([]);
  for (
    var i = 0, _0x1881C = _0x18E16["length"];
    i < _0x1881C;
    i++
  ) {
    if (LineInfo != _0x18E16[i]["line"]) {
      _0x18E9D["push"]([]);
      LineInfo = _0x18E16[i]["line"];
    }
    _0x18E9D[_0x18E9D["length"] - 1]["push"](_0x18E16[i]);
  }
  var _0x18E70;
  for (
    var _0x15D0B = 0, _0x18DBC = _0x18E9D["length"];
    _0x15D0B < _0x18DBC;
    _0x15D0B++
  ) {
    _0x18E70 = _0x18E9D[_0x15D0B];
    for (var _0x16332 = _0x18E43 - 1; _0x16332 >= 0; _0x16332--) {
      for (
        var i = 0, _0x1881C = _0x18E70["length"];
        i < _0x1881C;
        i++
      ) {
        if (
          graphEditor["pianoImpro"] &&
          typeof graphEditor["pianoImpro"]["noteUpdate"] == "function"
        ) {
          var ac_abc_content = _0x18E70[i]["str"];
          var _0x18ECA = ac_abc_content["split"]("<br>");
          if (!_0x18E70[i]["update"]) {
            continue;
          }
          if (_0x16332 < _0x18ECA["length"] && _0x18ECA[_0x16332]) {
            graphEditor["pianoImpro"]["noteUpdate"](
              _0x18E70[i]["istart"],
              _0x18ECA[_0x16332],
              _0x16332
            );
          } else {
            graphEditor["pianoImpro"]["noteUpdate"](
              _0x18E70[i]["istart"],
              "*",
              _0x16332
            );
          }
        }
      }
    }
  }
  $(".lyric")["removeClass"]("menu-pressed");
  var abc_content = $("#source")["val"]();
  abc_content = replaceBlankLine(abc_content);
  $("#source")["val"](abc_content);
  src_change();
  doLog();
}
function getLineIndex(_0x19875, istart) {
  if (!_0x19875 || _0x19875["length"] <= 0 || !istart) {
    return 0;
  }
  var _0x19BCC = 0;
  var _0x19C26 = _0x19875["length"];
  var _0x19BF9 = 0;
  var _0x15C84 = _0x19875["length"];
  while (_0x19BCC < _0x19C26 && _0x15C84 > 0) {
    _0x19BF9 = _0x19BCC + parseInt((_0x19C26 - _0x19BCC) / 2);
    if (
      istart >= _0x19875[_0x19BF9]["start"] &&
      istart <= _0x19875[_0x19BF9]["end"]
    ) {
      break;
    } else {
      if (istart < _0x19875[_0x19BF9]["start"]) {
        _0x19C26 = _0x19BF9;
      } else {
        if (istart > _0x19875[_0x19BF9]["end"]) {
          _0x19BCC = _0x19BF9;
        }
      }
    }
    _0x15C84--;
  }
  return _0x19BF9;
}
function getLineIndexArr() {
  var _0x19C53 = $("#source")["val"]();
  var LinesInfo = _0x19C53["split"]("\x0A");
  var LineInfo = "";
  var _0x19659 = 0;
  var _0x18DE9 = [];
  var _0x19C80 = false,
    _0x19CAD = false;
  for (
    var i = 0, _0x1881C = LinesInfo["length"];
    i < _0x1881C;
    i++
  ) {
    if (
      LineInfo["indexOf"]("w:") == -1 &&
      LineInfo["replaceAll"](/\".*\"/g, "")
        ["replace"](/\[.[^\]]*\]/, "")
        ["replace"](/\{.[^\}]*\}/, "")
        ["indexOf"]("|") > -1
    ) {
      _0x19CAD = true;
    } else {
      _0x19CAD = false;
    }
    LineInfo = LinesInfo[i];
    var _0x17AED = { start: _0x19659, end: _0x19659 + LineInfo["length"] };
    if (_0x19C80 && _0x19CAD) {
      _0x18DE9[_0x18DE9["length"] - 1]["end"] = _0x17AED["end"];
    } else {
      _0x18DE9["push"](_0x17AED);
    }
    _0x19659 = _0x17AED["end"] + 1;
    _0x19C80 = _0x19CAD;
  }
  return _0x18DE9;
}
function enabledEditor(_0x17AED) {
  user["clickAddText"] = false;
  $("#target")["css"]("cursor", "default");
  if ($(_0x17AED)["hasClass"]("menu-pressed")) {
    $(_0x17AED)["removeClass"]("menu-pressed");
    graph_update = true;
    draw_editor = false;
    $("#graphEditorMenuInsert")["remove"]("menu-pressed");
    $("#graphEditorMenuUpdate")["addClass"]("menu-pressed");
  } else {
    if ($("#insertWord")["hasClass"]("menu-pressed")) {
      $("#insertWord")["removeClass"]("menu-pressed");
    }
    $(_0x17AED)["addClass"]("menu-pressed");
    $("#graphEditorMenu")["removeClass"]("menu-pressed");
    graph_update = false;
    draw_editor = false;
    $("#graphEditorMenuInsert")["removeClass"]("menu-pressed");
    $("#graphEditorMenuUpdate")["removeClass"]("menu-pressed");
  }
}
function showSpeedDiv() {
  $("#QC_div .modal-content")["css"](
    "left",
    ($(window)["width"]() - $("#Q_div .modal-content")["width"]()) / 2
  );
  $("#speedtype")["val"]("node");
  $("#QC_div")["modal"]();
}
function addNodeSpeed() {
  var index = $("#nodeMenu")["attr"]("barIndex");
  if (!index) {
    return;
  }
  index = parseInt(index);
  var abc_content = $("#source")["val"]();
  if (index == 0) {
    var _0x15ECD = /Q:.*(\d\/\d=\d{1,3})/;
    var _0x15E46 = $("#selectSpeedImg2")["attr"]("speed");
    var _0x15E73 = $("#NOTE_Q_V")["val"]();
    var _0x15EA0 = abc_content["match"](_0x15ECD);
    if (_0x15EA0 != null) {
      var _0x15E19 = _0x15EA0[0]["replace"](
        _0x15EA0[1],
        _0x15E46 + "=" + _0x15E73
      );
      abc_content = abc_content["replace"](_0x15EA0[0], _0x15E19);
      $("#source")["val"](abc_content);
      src_change();
      doLog();
      return;
    }
  }
  var LinesInfo = getLinesInfo(abc_content);
  var _0x15D65 = "";
  var _0x15C84 = 0;
  if (LinesInfo != null) {
    for (var i = 0; i < LinesInfo["length"]; i++) {
      if (LinesInfo[i]["type"] == "note") {
        var lineStr = LinesInfo[i]["lineStr"];
        _0x15D65 = lineStr["replace"](/%V1line\d+(end)?/, "");
        var _0x15CB1 = lineStr["match"](/\$?%V1line\d+(end)?/);
        var _0x15D38 = "";
        if (_0x15CB1 != null) {
          _0x15D38 = _0x15CB1[0];
        }
        var _0x15C2A = getBarsArray(_0x15D65, false);
        var _0x15DEC = "";
        for (var _0x15D0B = 0; _0x15D0B < _0x15C2A["length"]; _0x15D0B++) {
          _0x15DEC += _0x15C2A[_0x15D0B]["replace"](
            /\[Q:.[^\[]*\]/,
            ""
          );
          if (_0x15C84 == index - 1) {
            var _0x15E46 = $("#selectSpeedImg2")["attr"]("speed");
            var _0x15E73 = $("#NOTE_Q_V")["val"]();
            _0x15DEC +=
              "[Q: " + _0x15E46 + "=" + _0x15E73 + "]";
          }
          _0x15C84++;
        }
        abc_content = abc_content["replace"](lineStr, _0x15DEC + _0x15D38);
        if (_0x15C84 > index) {
          break;
        }
      }
    }
    $("#source")["val"](abc_content);
    src_change();
    doLog();
  }
}
function showNodeBgColorPicker() {
  $("#nodecolorselecter")["val"]("000000");
  $("#nodecolorselecter")["click"]();
}
function setNodeBgColor() {
  var index = $("#nodeMenu")["attr"]("barIndex");
  if (!index) {
    return;
  }
  index = parseInt(index);
  var abc_content = $("#source")["val"]();
  var LinesInfo = getNodesInfo(abc_content);
  var _0x15D65 = "";
  var _0x15C84 = 0;
  var _0x162D8 = /\"-mb-.[^(]*\"/;
  var _0x163E6 = new Array();
  var _0x16305 = /mysvgbar([\d]+)/;
  $("svg[type=rectbar],svg[type=rectnode]")["each"](function (i, _0x1646D) {
    var _0x16413 = $(_0x1646D)["attr"]("id");
    var type = $(_0x1646D)["attr"]("type");
    if (type == "rectnode") {
      var index = $(_0x1646D)["attr"]("barIndex");
      _0x163E6["push"](index);
    } else {
      var _0x16440 = _0x16413["match"](_0x16305);
      if (_0x16440 != null) {
        _0x163E6["push"](_0x16440[1]);
      }
    }
  });
  if (LinesInfo != null) {
    var abc_content_temp_p1 = "";
    for (var i = 0; i < LinesInfo["length"]; i++) {
      var LineInfo = LinesInfo[i];
      if (LineInfo["type"] == "note") {
        var _0x15DEC = "";
        var _0x1A112 = LineInfo["nodes"];
        for (var _0x15D0B = 0; _0x15D0B < _0x1A112["length"]; _0x15D0B++) {
          var nodeInfo = _0x1A112[_0x15D0B];
          var _0x162AB = nodeInfo["nodeStr"];
          for (var _0x16332 = 0; _0x16332 < _0x163E6["length"]; _0x16332++) {
            if (nodeInfo["nodeIndex"] == _0x163E6[_0x16332]) {
              $(".nodecolorli")["css"](
                "background-color",
                $("#nodecolorselecter")["val"]()
              );
              var _0x1B684 = $(".nodecolorli")["css"]("background-color");
              _0x162AB = _0x162AB["replace"](_0x162D8, "");
              _0x162AB =
                _0x162AB["substring"](0, _0x162AB["indexOf"]("|")) +
                '"-mb-' +
                _0x1B684 +
                '"' +
                _0x162AB["substring"](_0x162AB["indexOf"]("|"));
            }
          }
          _0x15DEC += _0x162AB;
          abc_content_temp_p1 += _0x15DEC;
        }
      } else {
        abc_content_temp_p1 += LineInfo["lineStr"] + "\x0A";
      }
    }
    $("#source")["val"](abc_content_temp_p1);
    src_change();
    doLog();
  }
}
function setNodeBgColor(_0x1B684) {
  var index = $("#nodeMenu")["attr"]("barIndex");
  if (!index) {
    return;
  }
  index = parseInt(index);
  var abc_content = $("#source")["val"]();
  var LinesInfo = getNodesInfo(abc_content);
  var _0x15D65 = "";
  var _0x15C84 = 0;
  var _0x162D8 = /\"-mb-.[^)]*\"/;
  var _0x163E6 = new Array();
  var _0x16305 = /mysvgbar([\d]+)/;
  $("svg[type='rectbar'],svg[type='rectnode']")["each"](function (i, _0x1646D) {
    var _0x16413 = $(_0x1646D)["attr"]("id");
    var type = $(_0x1646D)["attr"]("type");
    if (type == "rectnode") {
      var _0x181C8 = parseInt($(_0x1646D)["attr"]("barindex"));
      if (_0x181C8 == undefined) {
        _0x181C8 = parseInt($(_0x1646D)["attr"]("barIndex"));
      }
      _0x163E6["push"](_0x181C8);
    } else {
      var _0x16440 = _0x16413["match"](_0x16305);
      if (_0x16440 != null) {
        _0x163E6["push"](_0x16440[1]);
      }
    }
  });
  if (_0x163E6["length"] == 0) {
    window["top"]["swAutoAlert"]("\u672a\u9009\u62e9\u5c0f\u8282");
    return;
  }
  if (LinesInfo != null) {
    var abc_content_temp_p1 = "";
    for (var i = 0; i < LinesInfo["length"]; i++) {
      var LineInfo = LinesInfo[i];
      if (LineInfo["type"] == "note") {
        var _0x15DEC = "";
        var _0x1A112 = LineInfo["nodes"];
        var _0x1B6B1 = -1;
        for (var _0x15D0B = 0; _0x15D0B < _0x1A112["length"]; _0x15D0B++) {
          var nodeInfo = _0x1A112[_0x15D0B];
          var _0x162AB = nodeInfo["nodeStr"];
          for (var _0x16332 = 0; _0x16332 < _0x163E6["length"]; _0x16332++) {
            if (nodeInfo["nodeIndex"] == _0x163E6[_0x16332]) {
              _0x162AB = _0x162AB["replace"](_0x162D8, "");
              _0x162AB = _0x162AB["replace"](/(\"-mb).*(\)\")/g, "");
              _0x162AB =
                _0x162AB["substring"](
                  0,
                  _0x162AB["indexOf"](nodeInfo["barLineStr"])
                ) +
                '"-mb-' +
                colorRGB(_0x1B684) +
                '"' +
                _0x162AB["substring"](
                  _0x162AB["indexOf"](nodeInfo["barLineStr"])
                );
            }
          }
          _0x15DEC += _0x162AB;
          _0x1B6B1 = nodeInfo["endSeq"];
        }
        abc_content_temp_p1 +=
          _0x15DEC + abc_content["substring"](_0x1B6B1, LineInfo["endSeq"]);
      } else {
        abc_content_temp_p1 += LineInfo["lineStr"] + "\x0A";
      }
    }
    $("#source")["val"](abc_content_temp_p1);
    src_change();
    doLog();
  }
}
function clearNodeBgColor() {
  var index = $("#nodeMenu")["attr"]("barIndex");
  if (!index) {
    return;
  }
  index = parseInt(index);
  var abc_content = $("#source")["val"]();
  var LinesInfo = getNodesInfo(abc_content);
  var _0x15D65 = "";
  var _0x15C84 = 0;
  var _0x162D8 = /\"-mb-.[^\)]*\)\"/;
  var _0x163E6 = new Array();
  var _0x16305 = /mysvgbar([\d]+)/;
  $("svg[type=rectbar],svg[type=rectnode]")["each"](function (i, _0x1646D) {
    var _0x16413 = $(_0x1646D)["attr"]("id");
    var type = $(_0x1646D)["attr"]("type");
    if (type == "rectnode") {
      var index = $(_0x1646D)["attr"]("barIndex");
      if (typeof index == "undefined") {
        index = $(_0x1646D)["attr"]("barindex");
      }
      _0x163E6["push"](index);
    } else {
      var _0x16440 = _0x16413["match"](_0x16305);
      if (_0x16440 != null) {
        _0x163E6["push"](_0x16440[1]);
      }
    }
  });
  var abc_content_temp_p1 = "";
  if (LinesInfo != null) {
    for (var i = 0; i < LinesInfo["length"]; i++) {
      var LineInfo = LinesInfo[i];
      _0x15D65 = LineInfo["lineStr"];
      if (LineInfo["type"] == "note") {
        var _0x15C2A = LineInfo["nodes"];
        var _0x15DEC = "";
        for (var _0x15D0B = 0; _0x15D0B < _0x15C2A["length"]; _0x15D0B++) {
          var _0x1627E = _0x15C2A[_0x15D0B];
          var _0x162AB = _0x1627E["nodeStr"];
          for (var _0x16332 = 0; _0x16332 < _0x163E6["length"]; _0x16332++) {
            if (_0x1627E["nodeIndex"] == _0x163E6[_0x16332]) {
              _0x162AB = _0x162AB["replace"](_0x162D8, "");
              break;
            }
          }
          _0x15DEC += _0x162AB;
        }
        var _0x163B9 = "";
        if (
          _0x15C2A["length"] > 0 &&
          _0x15C2A[_0x15C2A["length"] - 1]["endSeq"] <
            LineInfo["endSeq"]
        ) {
          _0x163B9 = abc_content["substring"](
            _0x15C2A[_0x15C2A["length"] - 1]["endSeq"],
            LineInfo["endSeq"]
          )["replace"]("\x0A", "");
        }
        abc_content_temp_p1 += _0x15DEC + _0x163B9 + "\x0A";
      } else {
        abc_content_temp_p1 += _0x15D65 + "\x0A";
      }
    }
    $("#source")["val"](abc_content_temp_p1);
    doLog();
    src_change();
  }
}
function showKeyDiv() {
  $("#K_div .modal-content")["css"](
    "left",
    ($(window)["width"]() - $("#K_div .modal-content")["width"]()) / 2
  );
  $("#K_div")["modal"]();
}
function changeNodeKey() {
  var val = $(".keyChoice.selected")["attr"]("value");
  if (!val) {
    return;
  }
  console["log"]("selected key:", val);
  var index = $("#nodeMenu")["attr"]("barIndex");
  if (!index) {
    return;
  }
  index = parseInt(index);
  var abc_content = $("#source")["val"]();
  if (index == 0) {
    var _0x161F7 = /K:\s*[CDEFGABb#]{1,2}/;
    var _0x161CA = abc_content["match"](_0x161F7);
    if (_0x161CA != null) {
      var _0x16224 = _0x161CA[0]["replace"](
        _0x161CA[0],
        val["replace"]("[", "")["replace"](
          "]",
          ""
        )
      );
      abc_content = abc_content["replace"](_0x161CA[0], _0x16224);
      $("#source")["val"](abc_content);
      src_change();
      doLog();
      return;
    }
  }
  var LinesInfo = abc_content["match"](/.*%V1line\d+(end)?/g);
  var _0x15D65 = "";
  var _0x15C84 = 0;
  if (LinesInfo != null) {
    for (var i = 0; i < LinesInfo["length"]; i++) {
      _0x15D65 = LinesInfo[i]["replace"](
        /%V1line\d+(end)?/,
        ""
      );
      var _0x15CB1 = LinesInfo[i]["match"](/\$?%V1line\d+(end)?/);
      var _0x15D38 = "";
      if (_0x15CB1 != null) {
        _0x15D38 = _0x15CB1[0];
      }
      var _0x15C2A = getBarsArray(_0x15D65, false);
      var _0x15DEC = "";
      for (var _0x15D0B = 0; _0x15D0B < _0x15C2A["length"]; _0x15D0B++) {
        _0x15DEC += _0x15C2A[_0x15D0B];
        if (_0x15C84 == index - 1) {
          _0x15DEC += val;
        }
        _0x15C84++;
      }
      abc_content = abc_content["replace"](
        LinesInfo[i],
        _0x15DEC + _0x15D38
      );
      if (_0x15C84 > index) {
        break;
      }
    }
    $("#source")["val"](abc_content);
    src_change();
    doLog();
  }
}
function showMeterDiv() {
  $("#M_div .modal-content")["css"](
    "left",
    ($(window)["width"]() - $("#M_div .modal-content")["width"]()) / 2
  );
  $("#M_div")["modal"]();
}
function changeNodeMeter() {}
function switchRhythm(_0x17AED) {
  var abc_content = switchRhythmContent(_0x17AED);
  $("#source")["val"](abc_content);
  src_change();
  doLog();
}
function switchRhythmContent(_0x17AED) {
  var _0x1B954 = $(_0x17AED)["attr"]("staffnum");
  var abc_content = $("#source")["val"]();
  var _0x1B981 = new RegExp("V:\\s*" + _0x1B954 + ".*");
  var _0x1B927 = new Array();
  var _0x17D09 = abc_content["match"](_0x1B981);
  if (_0x17D09 != null) {
    for (var i = 0; i < _0x17D09["length"]; i++) {
      var ac_abc_content = _0x17D09[i];
      if ($(_0x17AED)["is"](":checked")) {
        abc_content = abc_content["replace"](ac_abc_content, ac_abc_content + " perc stafflines=1");
      } else {
        abc_content = abc_content["replace"](
          ac_abc_content,
          ac_abc_content["replace"]("perc stafflines=1", "")
        );
      }
    }
  }
  return abc_content;
}

function genBarDeco(val, insert_content, position, type, index) {
  console.log('genBarDeco:', val, insert_content, position, type, index);
  var ind = index;
  var abc_content = $("#source")["val"]();
  var new_content = "";
  // var _0x186E1 = "";
  // var _0x1743F = 0;
  // var _0x18768 = false;
  if (
    (val == "|:" ||
      val == "!coda!" ||
      val == "!segno!") &&
    parseInt(index) == 0
  ) {
    var LinesInfo = getNodesInfo(abc_content);
    var new_content = "";
    for (var i = 0; i < LinesInfo["length"]; i++) {
      var LineInfo = LinesInfo[i];
      var lineStr = LineInfo["lineStr"];
      if (
        LineInfo["type"] == "note" &&
        LineInfo["nodes"][0]["nodeIndex"] == 0
      ) {
        lineStr = lineStr
        .replace(/^(\!coda\!)|(\!segno\!)|(\|:)/, '')
          // .replace(/^(\!coda\!)|(\!segno\!)|(\|:)/, '')
          // .replace(/^(\!coda\!)|(\!segno\!)/, '')
        lineStr = val + lineStr
      }
      new_content += lineStr + "\x0A";
    }
    $("#source")["val"](new_content);
    doLog();
    src_change();
    return;
  }
  // BUG 修改拍号时，会出现乐谱错乱
  if (val["indexOf"]("[M:") > -1) {
    if (index == 0) {
      var M_val = val;
      M_val = M_val["replace"](/[\[\]]/g, "")["replace"](/M:/, "")["replace"](/\s/g, "");
      // console.log('genBarDeco', M_val, $("#M_type").val());
      $("#M_type").val("1");
      if (M_val == "C|") {
        M_val = "2/2";
        $("#M_type").val("C|");
      } else {
        if (M_val == "C") {
          M_val = "4/4";
          $("#M_type").val("C");
        }
      }
      $("#M_mol").val(M_val["split"]("/")[0]);
      $("#M_den").val(M_val["split"]("/")[1]);

      // console.log('genUpdateStaff', abc_content);
      // var Meter_list = abc_content.match(/M\s*:\s*[1-9]\/[1-9]/g);
      // var Meter_arr = Meter_list[Meter_list.length-1].replace(/M\:(\s)*/g, '').split('/');
      // console.log('genUpdateStaff', Meter_arr);

      setMValue();
      genInitStaff();
      // genUpdateStaff(val);
      return;
    } else {
      var LinesInfo = getNodesInfo(abc_content);
      var new_content = "";
      for (var i = 0; i < LinesInfo["length"]; i++) {
        var LineInfo = LinesInfo[i];
        var lineStr = LineInfo["lineStr"];
        var new_note_str = "";
        var startSeq = -1;
        var newNodeIndex = 99999;
        if (LineInfo["type"] == "note") {
          for (var j = 0; j < LineInfo["nodes"]["length"]; j++) {
            var nodeInfo = LineInfo["nodes"][j];
            if (
              nodeInfo["nodeIndex"] >= index &&
              nodeInfo["nodeIndex"] < newNodeIndex
            ) {
              if (
                nodeInfo["nodeStr"]["indexOf"]("[M:") > -1 &&
                newNodeIndex == 99999
              ) {
                newNodeIndex = nodeInfo["ondeIndex"];
                new_note_str += nodeInfo["nodeStr"];
                continue;
              }
              var n_note_str = replaceNodeContentToRestWithMeter(
                nodeInfo["nodeStr"],
                val
              );
              if (nodeInfo["nodeIndex"] == index) {
                n_note_str = val + n_note_str;
              }
              if (nodeInfo["nodeStr"]["indexOf"]("$") > -1) {
                n_note_str =
                  nodeInfo["nodeStr"]["substring"](
                    0,
                    nodeInfo["nodeStr"]["indexOf"]("$") + 1
                  ) + n_note_str;
              }
              new_note_str += n_note_str + nodeInfo["barLineStr"];
            } else {
              new_note_str += nodeInfo["nodeStr"];
            }
            startSeq = nodeInfo["endSeq"];
          }
          new_note_str += abc_content["substring"](startSeq, LineInfo["endSeq"]);
          new_content += new_note_str;
        } else {
          new_content += lineStr + "\x0A";
        }
      }
      $("#source")["val"](new_content);
      src_change();
      doLog();
      return;
    }
  }
  if (val["indexOf"]("K:") > -1 && index == 0) {
    var _0x187C2 = val["replace"](/[\[\]]/g, "");
    var _0x18795 = _0x187C2["replace"](/K\:/, "")["replace"](
      /\s/g,
      ""
    );
    $("#K")["val"](_0x18795);
    $("#K")["change"]();
    return;
  }
  var rectbar = $("svg[type='rectbar']");
  var abc_content = $("#source")["val"]();
  if (position == "preReplace" || position == "preInsert") {
    index--;
  }
  if (rectbar["length"] > 0) {
    var LinesInfo = getNodesInfo(abc_content);
    var new_content = "";
    for (
      var i = 0;
      i < LinesInfo.length;
      i++
    ) {
      var LineInfo = LinesInfo[i];
      var lineStr = LineInfo["lineStr"];
      var new_note_str = "";
      var startSeq = -1;
      if (LineInfo["type"] == "note") {
        var _0x18876 = false;
        for (
          var j = 0;
          j < LineInfo["nodes"]["length"];
          j++
        ) {
          // 这就是调号
          var nodeInfo = LineInfo["nodes"][j];
          if (nodeInfo["nodeIndex"] == index) {
            _0x18876 = true;
            if (position == "afterReplace" || position == "preReplace") {
              var _0x1870E = nodeInfo["barLineStr"]["replace"](
                /./g,
                function (_0x1735E) {
                  return "\\" + _0x1735E;
                }
              );
              var _0x168D2 = new RegExp("(.*)" + _0x1870E);
              new_note_str += nodeInfo["nodeStr"]["replace"](
                _0x168D2,
                function (_0x189DE, _0x15E46) {
                  return _0x15E46 + val;
                }
              );
            } else {
              if (position == "beforeInsert") {
                nodeInfo.nodeStr = nodeInfo.nodeStr.replace(/\[K:[^\]]+\]/g, '')
                if (
                  nodeInfo["nodeStr"]
                    ["trim"]()
                    ["indexOf"]("$") == 0
                ) {
                  new_note_str +=
                    "$" +
                    val +
                    nodeInfo["nodeStr"]["substring"](
                      nodeInfo["nodeStr"]["indexOf"]("$") + 1
                    );
                } else {
                  let rnm = nodeInfo["nodeStr"]
                  rnm = rnm.replace(/^\[K:.+\]/, '')
                  new_note_str += val + rnm;
                }
              } else {
                if (position == "preInsert" || position == "afterInsert") {
                  var _0x1870E = nodeInfo["barLineStr"]["replace"](
                    /./g,
                    function (_0x1735E) {
                      return "\\" + _0x1735E;
                    }
                  );
                  var _0x168D2 = new RegExp("(.*)" + _0x1870E);
                  new_note_str += nodeInfo["nodeStr"]["replace"](
                    _0x168D2,
                    function (_0x189DE, _0x15E46) {
                      return _0x15E46
                        .replace(
                          /((\!fine\!)|(\!D\.S\.\!)|(\!D\.C\.((alfine)|(alcoda))*\!)|(\!(to)?coda\!)|(\!segno\!)\|?)$/,
                          s => s.match(/\|$/) ? '|' : ''
                        ) + val + nodeInfo["barLineStr"];
                    }
                  );
                }
              }
            }
          } else {
            new_note_str += nodeInfo["nodeStr"];
          }
          startSeq = nodeInfo["endSeq"];
        }
        new_note_str += abc_content["substring"](startSeq, LineInfo["endSeq"]);
        new_content += new_note_str + "\x0A";
      } else {
        new_content += LineInfo["lineStr"] + "\x0A";
      }
    }
    new_content = replaceBlankLine(new_content);
    $("#source")["val"](new_content);
    src_change();
    doLog();
    return;
  }
}
function selectSimpleNode(_0x17688, _0x1A4C3, _0x199B0, _0x1B549) {
  if (graphEditor["pianoImpro"] && graphEditor["pianoImpro"]["isOpen"]) {
    return;
  }
  var _0x16008 = _0x1A4C3["offsetX"];
  var _0x16035 = _0x1A4C3["offsetY"];
  var _0x175D4 = $(_0x17688)["attr"]("index");
  var _0x1B5FD = getClickNodeInfo(_0x16008, _0x16035, _0x199B0, _0x175D4);
  if (_0x1B5FD == null) {
    return;
  }
  var _0x1A2A7 = _0x1B5FD["node_index"];
  var _0x1B5D0 = _0x1B5FD["v"];
  var _0x1B62A = $(_0x17688)["find"]("g[type='staff']")["length"];
  var _0x19875 = new Array();
  if (_0x1A4C3["shiftKey"]) {
    if (lastSelectBarIndex != -1) {
      var _0x1B5A3 = -1;
      if (lastSelectBarIndex > _0x1A2A7) {
        _0x1B5A3 = lastSelectBarIndex + 0;
        lastSelectBarIndex = _0x1A2A7;
        _0x1A2A7 = _0x1B5A3;
      }
      for (
        var i = lastSelectBarIndex;
        i <= _0x1A2A7;
        i++
      ) {
        if (_0x1B5D0 == lastSelectNodeV) {
          var _0x1738B = new Object();
          _0x1738B["bar_num"] = i;
          _0x1738B["color"] = "#0E518F";
          _0x1738B["stroke"] = "#0E518F";
          _0x1738B["v"] = _0x1B5D0;
          _0x19875["push"](_0x1738B);
        } else {
          selectBar(_0x17688, _0x1A4C3, _0x199B0, _0x1B549);
          return;
        }
      }
    }
  } else {
    var _0x1738B = new Object();
    _0x1738B["bar_num"] = _0x1B5FD["node_index"];
    _0x1738B["v"] = _0x1B5FD["v"];
    _0x1738B["color"] = "#0E518F";
    _0x1738B["stroke"] = "#0E518F";
    _0x19875["push"](_0x1738B);
  }
  lastSelectBarIndex = _0x1A2A7;
  lastSelectNodeV = _0x1B5D0;
  $("svg[type='rectbar']")["remove"]();
  renderStaffNodeBySt(_0x19875, "node");
  showProperties("bar", _0x1A4C3);
  $("#mysvgnode" + _0x1B5D0 + "_" + _0x1A2A7)["attr"](
    "barIndex",
    _0x1A2A7
  );
  var _0x1619D = $("#mysvgnode" + _0x1B5D0 + "_" + _0x1A2A7)[
    "offset"
  ]()["top"];
  var _0x19BCC = $("#mysvgnode" + _0x1B5D0 + "_" + _0x1A2A7)[
    "offset"
  ]()["left"];
  var _0x1B51C = getSelectBarContent(_0x1A2A7, 0);
  var _0x1B4EF = getPreBarInfo(_0x1A2A7, 0);
  if (_0x1B51C == null) {
    return;
  }
  if (
    _0x1B51C["indexOf"]("$") > -1 ||
    (_0x1B4EF && _0x1B4EF["nextBr"])
  ) {
    $("#btnAddBr")["html"]("\u53d6\u6d88\u6362\u884c");
  } else {
    $("#btnAddBr")["html"]("\u6362\u884c");
  }
  if (_0x1A2A7 == 0) {
    $("#btnAddBr")["hide"]();
    var _0x1B576 = getStaffInfo();
    if (_0x1B576["vocalCount"] > 1) {
      $("#delStaff")["show"]();
    } else {
      $("#delStaff")["hide"]();
    }
  } else {
    $("#btnAddBr")["show"]();
    $("#delStaff")["hide"]();
  }
  var _0x1673D = $(".abc-content")["offset"]()["top"];
  var _0x16710 = $(".abc-content")["offset"]()["left"];
  if (_0x1B549) {
    $("#nodeMenu")
      ["css"]("position", "absolute")
      ["css"](
        "top",
        _0x1619D - _0x1673D - $("#nodeMenu")["height"]()
      )
      ["css"]("left", _0x19BCC - _0x16710)
      ["show"]();
    $("#nodeMenu")["attr"]("barIndex", _0x1A2A7);
  }
}
function genLinkClef(type) {
  var abc_content = $("#source")["val"]();
  var LinesInfo = getLinesInfo($("#source")["val"]());
  var _0x18D08 = "";
  if (musicType == 2) {
    type = "bracket";
  }
  if (type == "brace") {
    _0x18D08 = "{NUM}";
  } else {
    if (type == "bracket") {
      _0x18D08 = "[NUM]";
    } else {
      if (type == "none") {
      }
    }
  }
  var abc_content_temp_p1 = "";
  for (var i = 0; i < LinesInfo["length"]; i++) {
    var LineInfo = LinesInfo[i];
    var lineStr = LineInfo["lineStr"];
    if (
      lineStr["indexOf"]("%%score") > -1 ||
      lineStr["indexOf"]("%%staves") > -1
    ) {
      var _0x16C83 = lineStr["match"](/%%score|%%staves/)[0];
      clefReg = /\s*\(.[^\(]*\)\s*\|{0,1}|\s*\d\s*\|{0,1}/g;
      var _0x18D35 = 0;
      var _0x18D62 = 0;
      var new_note_str = "";
      while ((node = clefReg["exec"](lineStr))) {
        console["log"](node);
        new_note_str += lineStr["substring"](_0x18D62, node["index"]);
        if (_0x18D35 == selectedStaffNum) {
          new_note_str += _0x18D08["replace"]("NUM", node[0]);
        } else {
          new_note_str += node[0];
        }
        _0x18D62 = node["index"] + node[0]["length"];
        _0x18D35++;
      }
      if (_0x18D62 < lineStr["length"]) {
        new_note_str += lineStr["substr"](_0x18D62);
      }
      abc_content_temp_p1 += new_note_str + "\x0A";
    } else {
      abc_content_temp_p1 += lineStr + "\x0A";
    }
  }
  $("#source")["val"](abc_content_temp_p1);
  src_change();
  doLog();
}
function createLyricEditor(lyricStr, noteIstart) {
  console.log('createLyricEditor editorWord', lyricStr, noteIstart);
  if(content_vue.m.o_editor!='undefined' && content_vue.m.o_editor){
    console.log('createLyricEditor editorWord input...');
    $('.selected_text').removeClass('selected_text');
    $('._select-note').removeClass('_select-note');
    return;
  }
  if (lyricStr && noteIstart) {
    const line = syms[noteIstart].my_line
    const lines = lyricStr.split('\n').length
    const height = lines * 23 + 20 + 'px'
    let top
    if (content_vue.m.scoreOpts.musicType === 'easy') {
      const el = $(`text[type='note'][istart='${noteIstart}']`)
      top = el.offset().top
    } else {
      top = $($(`g[type="staff"]`)[line]).offset().top
    }
    top += -30 + $('.abc-content').scrollTop() * content_vue.m.panzoom.scale / 100
    top += 'px'
    let left
    if (content_vue.m.scoreOpts.musicType === 'easy') {
      left = $(`text[type='note'][istart='${noteIstart}']`).offset().left
    }
    else {
      left = $($(`text[type="hd"][istart=${noteIstart}],text[type="r1"][istart=${noteIstart}],text[type="r2"][istart=${noteIstart}],text[type="r4"][istart=${noteIstart}],text[type="r8"][istart=${noteIstart}],text[type="r16"][istart=${noteIstart}],text[type="r32"][istart=${noteIstart}],text[type="64"][istart=${noteIstart}]`)).offset().left
    }
    left +='px'
    content_vue.m.editor.style = {
      top: top,
      left: left,
      width: '100px',
      height,
    }
    content_vue.m.editor.s = syms[noteIstart]
    content_vue.m.editor.noteIstart = noteIstart
    content_vue.m.editor.val = lyricStr
    content_vue.m.editor.type = 'lyric2'
    content_vue.$nextTick(() => {
      setTimeout(()=>{
        $('#editor').focus();
        console.log('editorWord focus1');
      }, 200);
    })
    return
  }

  let el = null;
  if(content_vue.m.editor.isTab && content_vue.m.editor.noteIstart){
    const noteList = [...$(`rect[ondblclick][type='rest'],rect[ondblclick][type='note'],rect[ondblclick][type='splnum_note'],rect[ondblclick][type='splnum_rest']`)]
    const eindex = noteList.findIndex(el => el.getAttribute('istart') === content_vue.m.editor.noteIstart)
    if(typeof noteList[eindex]!='undefined'){
      el = noteList[eindex];
    }
    content_vue.m.editor.isTab = false; // 获取下个焦点后初始tab状态
    // console.log('editorWord el1', content_vue.m.editor.noteIstart, content_vue.m.editor.isTab, el);
  }

  if(!el){
    /** @type {ReturnType<JQueryStatic>} */
    el = $('.selected_text')[0]
    // console.log('editorWord el', content_vue.m.editor.noteIstart, content_vue.m.editor.isTab, el);
    if (!el) return
  }

  el = $(el)
  // console.log('editorWord el :', el);
  const istart = el.attr('istart')
  // console.log('editorWord istart :', istart);
  content_vue.m.editor.noteIstart = istart
  const s = syms[istart]
  const line = s.my_line
  let top
  if (content_vue.m.scoreOpts.musicType === 'easy') {
    top = el.offset().top
  } else {
    top = $($(`g[type="staff"]`)[line]).offset().top
  }
  top += -30 + $('.abc-content').scrollTop() * content_vue.m.panzoom.scale / 100
  top += 'px'
  let { left } = el.offset()
  left +='px'
  content_vue.m.editor.style = {
    top,
    left,
    width: '100px',
    height: '40px',
    minHeight: '40px'
  }
  content_vue.m.editor.lyricIndex = istart
  content_vue.$nextTick(() => {
    setTimeout(()=>{
      $('#editor').focus();
      console.log('editorWord focus2');
    }, 200);
  })
  const val = s.a_ly?.map(item => item.t).join('\n') || ''
  content_vue.m.editor.val = val
  content_vue.m.editor.type = 'lyric'
}
function updateLyrics(sym_data, _0x18E16) {
  var LinesInfo = getNodesInfo($("#source")["val"]());
  var _0x1C0B6 = -1;
  var _0x1C0E3 = -1;
  for (var i = 0; i < LinesInfo["length"]; i++) {
    var LineInfo = LinesInfo[i];
    if (
      sym_data["istart"] >= LineInfo["startSeq"] &&
      sym_data["iend"] <= LineInfo["endSeq"]
    ) {
      _0x1C0B6 = LineInfo["index"];
      for (
        var _0x15D0B = 0;
        _0x15D0B < LineInfo["nodes"]["length"];
        _0x15D0B++
      ) {
        var nodeInfo = LineInfo["nodes"][_0x15D0B];
        if (
          sym_data["istart"] >= nodeInfo["startSeq"] &&
          sym_data["iend"] <= nodeInfo["endSeq"]
        ) {
          _0x1C0E3 = _0x15D0B;
          break;
        }
      }
      break;
    }
  }
  var _0x1C002 = LinesInfo[_0x1C0B6]["lyricLineNums"];
  var _0x1C110 = [];
  var _0x1B495 = LinesInfo[_0x1C0B6]["startSeq"];
  var _0x1B35A = LinesInfo[_0x1C0B6]["endSeq"];
  var _0x1C089 = new Map();
  var _0x1C02F =
    _0x18E16["length"] > _0x1C002["length"]
      ? _0x18E16["length"]
      : _0x1C002["length"];
  for (var _0x15D0B = 0; _0x15D0B < _0x1C02F; _0x15D0B++) {
    var _0x1C05C = _0x1C089["get"]("lyric" + _0x15D0B);
    if (_0x1C05C == null) {
      _0x1C05C = "w:";
    }
    var _0x1BFD5 = [];
    for (var i = _0x1B495; i <= _0x1B35A; i++) {
      var _0x1BFA8 = syms[i];
      if (_0x1BFA8) {
        if (
          (_0x1BFA8["type"] == 8 && !_0x1BFA8["grace"]) ||
          _0x1BFA8["type"] == 10
        ) {
          if (_0x1BFD5["indexOf"](_0x1BFA8["istart"]) > -1) {
            continue;
          }
          if (_0x1BFA8["type"] == 10) {
            var abc_content = $("#source")["val"]();
            var _0x17115 = abc_content["substring"](
              _0x1BFA8["istart"],
              _0x1BFA8["iend"]
            );
            if (_0x17115["indexOf"](",") < 0) {
              continue;
            }
          }
          _0x1BFD5["push"](_0x1BFA8["istart"]);
          var _0x1665C = "*";
          if (_0x1BFA8["a_ly"] && _0x1BFA8["a_ly"][_0x15D0B]) {
            _0x1665C = _0x1BFA8["a_ly"][_0x15D0B]["t"];
          }
          if (_0x1BFA8["istart"] == sym_data["istart"]) {
            var _0x167F1 = _0x18E16[_0x15D0B];
            if (!_0x167F1 || _0x167F1 == "") {
              _0x167F1 = "*";
            }
            _0x1C05C += " " + _0x167F1;
          } else {
            _0x1C05C += " " + _0x1665C;
          }
        } else {
          if (_0x1BFA8["type"] == 0) {
            _0x1C05C += "|";
          }
        }
      }
    }
    _0x1C089["set"]("lyric" + _0x15D0B, _0x1C05C);
  }
  var new_content = "";
  var _0x15C84 = 0;
  for (var i = 0; i < LinesInfo["length"]; i++) {
    if (_0x1C002["indexOf"](i) > -1) {
      continue;
    }
    var LineInfo = LinesInfo[i];
    var lineStr = LineInfo["lineStr"];
    new_content += lineStr + "\x0A";
    if (i < _0x1C0B6 && LineInfo["type"] == "note") {
      if (
        LinesInfo[i + 1] &&
        LinesInfo[i + 1]["type"] != "lyric"
      ) {
        new_content += "w:\x0A";
      }
    }
    if (i == _0x1C0B6) {
      for (var _0x15D0B = 0; _0x15D0B < _0x1C02F; _0x15D0B++) {
        new_content +=
          _0x1C089["get"]("lyric" + _0x15D0B) + "\x0A";
      }
    }
  }
  new_content = replaceBlankLine(new_content);
  $("#source")["val"](new_content);
  src_change(createLyricEditor);
  doLog();
}
function editCurrNoteLyric() {
  hiddenMenu();
  createLyricEditor();
}
function editorCurrNoteAnnot() {
  console.log('editorCurrNoteAnnot');
  hiddenMenu();
  var selected_text = $(".selected_text[type*='HD'],.selected_text[type^='r'], ._select-note[type='splnum_note'], ._select-note[type='splnum_rest']");
  if (selected_text["length"] == 0) {
    window["top"]["swAutoAlert"]("\u672a\u9009\u4e2d\u97f3\u7b26");
    return;
  }
  var istart = $(selected_text)["attr"]("istart");
  editorAnnot(istart);
}
function getPathInfo(ac_abc_content) {
  var _0x17AED = new Object();
  var _0x17D36 = new Object();
  var _0x19B9F = /M(.[^c]*)c/;
  var _0x1A24D = _0x19B9F["exec"](ac_abc_content);
  var _0x19659 = new Object();
  _0x19659["x"] = parseFloat(
    _0x1A24D[1]["split"](" ")[0]
  );
  _0x19659["y"] = parseFloat(
    _0x1A24D[1]["split"](" ")[1]
  );
  _0x17AED["start"] = _0x19659;
  var _0x1A1F3 = /c(.[^v]*)v/;
  var _0x1A16C = _0x1A1F3["exec"](ac_abc_content);
  var _0x1A220 = _0x1A16C[1]
    ["replace"](/\s+/, " ")
    ["replace"]("\x0A", "")
    ["replace"]("\x09", "");
  var _0x1A27A = _0x1A220["split"](" ");
  var _0x1A199 = new Object();
  _0x1A199["x"] = parseFloat(_0x1A27A[0]);
  _0x1A199["y"] = parseFloat(_0x1A27A[1]);
  _0x17AED["control1"] = _0x1A199;
  var _0x1A1C6 = new Object();
  _0x1A1C6["x"] = parseFloat(_0x1A27A[2]);
  _0x1A1C6["y"] = parseFloat(_0x1A27A[3]);
  _0x17AED["control2"] = _0x1A1C6;
  var _0x193B6 = new Object();
  _0x193B6["x"] = parseFloat(_0x1A27A[4]);
  _0x193B6["y"] = parseFloat(_0x1A27A[5]);
  _0x17AED["end"] = _0x193B6;
  console["log"](_0x17AED);
  return _0x17AED;
}
function setPathInfo(_0x16986, _0x17D36) {
  var _0x1B70B = _0x17D36["start"];
  var _0x1A199 = _0x17D36["control1"];
  var _0x1A1C6 = _0x17D36["control2"];
  var _0x1B6DE = _0x17D36["end"];
  _0x16986["setAttribute"]("ori_start_x", _0x1B70B["x"]);
  _0x16986["setAttribute"]("ori_start_y", _0x1B70B["y"]);
  _0x16986["setAttribute"]("ori_end_x", _0x1B6DE["x"]);
  _0x16986["setAttribute"]("ori_end_y", _0x1B6DE["y"]);
  _0x16986["setAttribute"]("ori_control1_x", _0x1A199["x"]);
  _0x16986["setAttribute"]("ori_control1_y", _0x1A199["y"]);
  _0x16986["setAttribute"]("ori_control2_x", _0x1A1C6["x"]);
  _0x16986["setAttribute"]("ori_control2_y", _0x1A1C6["y"]);
}
function pathxy(
  _0x1AFD6,
  _0x1B08A,
  _0x1B003,
  _0x1B0B7,
  _0x1AE41,
  _0x17CDC,
  _0x1AFA9,
  _0x1AE6E
) {
  var _0x182D6,
    _0x18303,
    _0x1AE9B,
    _0x1AD33 = 0.3,
    _0x1AD60 = 0.45;
  _0x18303 = _0x1B0B7 - _0x1B08A;
  if (_0x18303 < 0) {
    _0x18303 = -_0x18303;
  }
  _0x182D6 = _0x1B003 - _0x1AFD6;
  if (_0x182D6 > 40 && _0x18303 / _0x182D6 < 0.7) {
    _0x1AD33 = 0.3 + 0.002 * (_0x182D6 - 40);
    if (_0x1AD33 > 0.7) {
      _0x1AD33 = 0.7;
    }
  }
  var _0x1AEC8 = 0.5 * (_0x1AFD6 + _0x1B003),
    _0x1AEF5 = 0.5 * (_0x1B08A + _0x1B0B7),
    _0x1B030 = _0x1AEC8 + _0x1AD33 * (_0x1AFD6 - _0x1AEC8),
    _0x1B0E4 = _0x1AEF5 + _0x1AD33 * (_0x1B08A - _0x1AEF5) + _0x17CDC;
  _0x1B030 = _0x1AFD6 + _0x1AD60 * (_0x1B030 - _0x1AFD6);
  _0x1B0E4 = _0x1B08A + _0x1AD60 * (_0x1B0E4 - _0x1B08A);
  var _0x1B05D = _0x1AEC8 + _0x1AD33 * (_0x1B003 - _0x1AEC8),
    _0x1B111 = _0x1AEF5 + _0x1AD33 * (_0x1B0B7 - _0x1AEF5) + _0x17CDC;
  _0x1B05D = _0x1B003 + _0x1AD60 * (_0x1B05D - _0x1B003);
  _0x1B111 = _0x1B0B7 + _0x1AD60 * (_0x1B111 - _0x1B0B7);
  _0x182D6 = 0.03 * (_0x1B003 - _0x1AFD6);
  _0x18303 = 2 * _0x1AE41;
  _0x1AE9B = 0.2 + 0.001 * (_0x1B003 - _0x1AFD6);
  if (_0x1AE9B > 0.6) {
    _0x1AE9B = 0.6;
  }
  _0x1AE9B *= _0x1AE41;
  var _0x1AF22 = "";
  _0x1AF22 +=
    "M" +
    abc["sx"](_0x1AFD6) +
    "  " +
    abc["sy"](_0x1B08A);
  var _0x1AF4F = 1;
  var _0x1AD8D = ((_0x1B08A - _0x1B0E4) / _0x1AF4F)["toFixed"](2);
  var _0x167F1 = _0x1AFA9 && radianHei ? radianHei : 0;
  if (_0x1AFA9 && _0x1AD8D > 0) {
    _0x1AD8D = -_0x1AD8D - _0x167F1;
  }
  var _0x1ADE7 = ((_0x1B08A - _0x1B111) / _0x1AF4F)["toFixed"](2);
  if (_0x1AFA9 && _0x1ADE7 > 0) {
    _0x1ADE7 = -_0x1ADE7 - _0x167F1;
  }
  var _0x1ADBA = ((_0x1B0B7 + _0x1AE9B - _0x1B111 - _0x18303) / _0x1AF4F)[
    "toFixed"
  ](2);
  if (_0x1AFA9 && _0x1ADBA > 0) {
    _0x1ADBA = -_0x1ADBA - _0x167F1;
  }
  var _0x1AE14 = ((_0x1B0B7 + _0x1AE9B - _0x1B0E4 - _0x18303) / _0x1AF4F)[
    "toFixed"
  ](2);
  if (_0x1AFA9 && _0x1AE14 > 0) {
    _0x1AE14 = -_0x1AE14 - _0x167F1;
  }
  var _0x1AF7C = new Object();
  _0x1AF7C["scale"] = 1;
  var _0x1AF4F = 1;
  _0x1AF22 +=
    "c" +
    ((_0x1B030 - _0x1AFD6) / _0x1AF7C["scale"])["toFixed"](1) +
    " " +
    ((_0x1B08A - _0x1B0E4) / _0x1AF4F)["toFixed"](1) +
    " " +
    ((_0x1B05D - _0x1AFD6) / _0x1AF7C["scale"])["toFixed"](1) +
    " " +
    ((_0x1B08A - _0x1B111) / _0x1AF4F)["toFixed"](1) +
    " " +
    ((_0x1B003 - _0x1AFD6) / _0x1AF7C["scale"])["toFixed"](1) +
    " " +
    ((_0x1B08A - _0x1B0B7) / _0x1AF4F)["toFixed"](1);
  if (!_0x1AE6E) {
    _0x1AF22 +=
      "\x0A\x09v" +
      (-_0x1AE9B)["toFixed"](1) +
      "c" +
      ((_0x1B05D - _0x182D6 - _0x1B003) / _0x1AF7C["scale"])["toFixed"](
        1
      ) +
      " " +
      ((_0x1B0B7 + _0x1AE9B - _0x1B111 - _0x18303) / _0x1AF4F)["toFixed"](
        1
      ) +
      " " +
      ((_0x1B030 + _0x182D6 - _0x1B003) / _0x1AF7C["scale"])["toFixed"](
        1
      ) +
      " " +
      ((_0x1B0B7 + _0x1AE9B - _0x1B0E4 - _0x18303) / _0x1AF4F)["toFixed"](
        1
      ) +
      " " +
      ((_0x1AFD6 - _0x1B003) / _0x1AF7C["scale"])["toFixed"](1) +
      " " +
      ((_0x1B0B7 + _0x1AE9B - _0x1B08A) / _0x1AF4F)["toFixed"](1);
  }
  _0x1AF22 += '"/>\x0A';
  console["log"](_0x1AF22);
}

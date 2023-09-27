/* myabc_plus */

function showStaffProp() {
  setSpeedSelected();
  initStaffProp();
  $("#STAFF_div .modal-content")["css"]("left", ($(window)["width"]() - $("#STAFF_div .modal-content")["width"]()) / 2);
  $("#STAFF_div .modal-content")["css"]("width", "950px");
  $("#STAFF_div")["modal"]()
}
function initStaffProp() {
  var _0x69C1 = "<select staffnum=\"NUM\" id=\"staffclefNUM\" class=\"staffcleftype\">" + "<option value=\"treble\">\u9ad8\u97f3\u8c31\u53f7</option>" + "<option value=\"bass\">\u4f4e\u97f3\u8c31\u53f7</option>" + "<option value=\"alto\">\u4e2d\u97f3\u8c31\u53f7</option>" + "<option value=\"tenor\">\u6b21\u4e2d\u97f3\u8c31\u53f7</option>" + "</select>";
  var _0x6A39 = "<select id=\"toneNUM\" class=\"toneClass\" style=\"width:200px;\">";
  for (var _0x4C11 = 0; _0x4C11 < content_vue["instrumentList"]["length"]; _0x4C11++) {
      _0x6A39 += "<option value=\"" + content_vue["instrumentList"][_0x4C11]["code"] + "\">" + content_vue["instrumentList"][_0x4C11]["name"] + "</option>"
  }
  ;_0x6A39 += "</select>";
  var _0x54A9 = getStaffInfo("source");
  $("#STAFFNUM")["val"](_0x54A9["vocalCount"]);
  var _0x6A11 = "<div id=\"staffPropNUM\" staffnum=\"NUM\" class=\"staffProp\" style=\"padding-top:5px;\"> \u8c31\u53f7\uff1a" + _0x69C1 + " \u8c31\u8868\u540d\u79f0\uff1a<input staffnum=\"NUM\" id=\"nmNUM\" type=\"text\" style=\"width:125px;\" value=\"vnmName\">&nbsp;" + "\u526f\u540d\u79f0\uff1a<input staffnum=\"NUM\" id=\"snmNUM\" type=\"text\" style=\"width:125px;\" value=\"vsnmName\">&nbsp;" + "\u97f3\u8272\uff1a" + _0x6A39 + "\u8282\u594f\u8c31\uff1a<input type=\"checkbox\" staffnum=\"NUM\" onclick=\"switchRhythm(this)\" id=\"isRhythm\" class=\"isRhythm\" style=\"width:20px;margin-left: 0px;margin-right: 0px;\">" + "</div>";
  var _0x5409 = parseInt($("#STAFFNUM")["val"]());
  var _0x69E9 = $(".staffcleftype")["length"];
  if (_0x5409 > _0x69E9) {
      for (var _0x4C11 = 1; _0x4C11 <= parseInt(_0x5409); _0x4C11++) {
          var _0x5111 = _0x6A11["replaceAll"]("NUM", (_0x4C11)) + "";
          var _0x6A61 = _0x54A9["vocalArr"]["find"](function(_0x62E1, _0x64C1, _0x5819) {
              return _0x62E1["seq"] == _0x4C11
          });
          if (_0x6A61) {
              _0x5111 = _0x5111["replace"]("vnmName", _0x6A61["nm"]);
              _0x5111 = _0x5111["replace"]("vsnmName", _0x6A61["snm"])
          }
          ;if ($("#staffProp" + (_0x4C11))["length"] == 0) {
              $("#staffsettingdiv")["append"]($(_0x5111))
          }
      }
  } else {
      if (_0x5409 < _0x69E9) {
          for (var _0x4C11 = _0x5409 + 1; _0x4C11 <= _0x69E9; _0x4C11++) {
              $("#staffProp" + _0x4C11)["remove"]()
          }
      }
  }
  ;for (var _0x4C11 = 0; _0x4C11 < _0x54A9["vocalArr"]["length"]; _0x4C11++) {
      $("#staffclef" + (_0x4C11 + 1))["val"](_0x54A9["vocalArr"][_0x4C11]["clef"]);
      if (_0x54A9["vocalArr"][_0x4C11]["rhythm"]) {
          $("#isRhythm[staffnum=\'" + (_0x4C11 + 1) + "\']")["prop"]("checked", "checked")
      }
      ;$("#tone" + (_0x4C11 + 1))["val"](_0x54A9["vocalArr"][_0x4C11]["midi"])
  }
}
function initStaffSplit() {
  var _0x6AB1 = "<input class=\"staffoption\" seq=\"SEQ\" style=\"width:30px;text-align:center;\">";
  var _0x6AD9 = "<input class=\"staffoption\" seq=\"SEQ\" style=\"width:30px;text-align:center;\">";
  var _0x6B01 = "<span seq=\"SEQ\">SEQ</span>";
  var _0x5409 = parseInt($("#STAFFNUM")["val"]());
  var _0x6A89 = $("input[seq]")["length"];
  if (_0x5409 > (_0x6A89 - 1)) {
      $("input[seq=\'" + _0x6A89 + "\']")["remove"]();
      for (var _0x4C11 = _0x6A89; _0x4C11 <= parseInt(_0x5409); _0x4C11++) {
          if (_0x4C11 == 0) {
              continue
          }
          ;if ($("input[seq=\'" + _0x4C11 + "\']")["length"] == 0) {
              var _0x6B29 = _0x6AB1["replaceAll"]("SEQ", _0x4C11);
              var _0x6B51 = _0x6B01["replaceAll"]("SEQ", _0x4C11);
              $("#staffSplitDiv")["append"]($(_0x6B29))["append"]($(_0x6B51))
          }
      }
      ;var _0x6B29 = _0x6AD9["replaceAll"]("SEQ", _0x5409 + 1);
      var _0x6B51 = _0x6B01["replaceAll"]("SEQ", _0x5409 + 1);
      $("#staffSplitDiv")["append"]($(_0x6B29))
  } else {
      if (_0x5409 < (_0x6A89 - 1)) {
          for (var _0x4C11 = _0x5409 + 1; _0x4C11 <= _0x6A89; _0x4C11++) {
              $("input[seq=\'" + _0x4C11 + "\']")["remove"]();
              $("span[seq=\'" + _0x4C11 + "\']")["remove"]()
          }
          ;var _0x6B29 = _0x6AD9["replaceAll"]("SEQ", _0x5409 + 1);
          var _0x6B51 = _0x6B01["replaceAll"]("SEQ", _0x5409 + 1);
          $("#staffSplitDiv")["append"]($(_0x6B29))
      }
  }
}
function popStaffProp() {
  updateStaffPropStatus = true;
  if ($("#staffProp1")["length"] == 0) {
      initStaffProp();
      $("#STAFF_div .modal-content")["css"]("left", ($(window)["width"]() - $("#DO_CHN_div .modal-content")["width"]()) / 2);
      $("#STAFF_div .modal-content")["css"]("width", "950px");
      $("#STAFF_div")["modal"]();
      return
  }
  ;$("#STAFF_div")["modal"]()
}
function genWeakBarRestNotes(_0x63D1) {
  var _0x6421 = new Object();
  _0x6421["top"] = parseInt($("#M_mol")["val"]());
  _0x6421["bot"] = parseInt($("#M_den")["val"]());
  var _0x6471 = new Object();
  _0x6471["top"] = parseInt($("#L")["val"]()["split"]("/")[0]);
  _0x6471["bot"] = parseInt($("#L")["val"]()["split"]("/")[1]);
  var _0x6129 = _0x6471["bot"] / _0x63D1["bot"];
  if (_0x6129 != parseInt(_0x6129)) {
      return ""
  }
  ;return genznotes(_0x6129 * _0x63D1["top"])
}
function genznotes(_0x5409) {
  var _0x5099 = parseInt(_0x5409 / 2);
  var _0x5661 = _0x5409 % 2;
  var _0x4D51 = "";
  for (var _0x4C11 = 0; _0x4C11 < _0x5099; _0x4C11++) {
      _0x4D51 += "z2"
  }
  ;if (_0x5661 != 0 && _0x5661 % 1 == 0) {
      _0x4D51 += "z"
  } else {
      if (_0x5661 != 0 && _0x5661 % 1 != 0) {
          var _0x6601 = "";
          if (_0x5661 > 1) {
              _0x6601 += "z"
          }
          ;var _0x65D9 = _0x5661 % 1;
          for (_0x4C11 = 2; ; _0x4C11 *= 2) {
              _0x6601 += "/";
              if (1 / _0x4C11 == _0x65D9) {
                  break
              }
          }
          ;_0x4D51 += "z" + _0x6601
      }
  }
  ;return _0x4D51
}
function genInitStaff() {
  lastMidiReplaceNoteIstart = -1;
  lastMidiReplaceNoteV = -1;
  if (updateStaffPropStatus) {
      updateStaffPropStatus = false;
      updateStaffProp();
      return
  }
  ;var _0x4BE9 = $("#source")["val"]();
  var _0x63A9 = genVSetting();
  var _0x5409 = parseInt($("#STAFFNUM")["val"]());
  var _0x53B9 = parseInt($("#nodecount")["val"]());
  var _0x5341 = $("#barsperstaff")["val"]();
  var _0x63F9 = "";
  var _0x63D1 = null;
  if ($("#isR")["is"](":checked")) {
      _0x63D1 = new Object();
      _0x63D1["top"] = parseInt($("#weakBarTop")["val"]());
      _0x63D1["bot"] = parseInt($("#weakBarBot")["val"]())
  }
  ;if (_0x63D1 != null) {
      _0x63F9 = genWeakBarRestNotes(_0x63D1);
      if (_0x63F9 != "") {
          _0x63F9 += "|"
      }
  }
  ;var _0x4D51 = "";
  var _0x6381 = getScoreStr();
  if (_0x6381 && _0x6381 != "") {
      var _0x6359 = /%%(score|staves).*/;
      var _0x6331 = _0x4BE9["match"](_0x6359);
      if (_0x6331 != null) {
          _0x4BE9 = _0x4BE9["replace"](_0x6331[0], _0x6381)
      } else {
          _0x4D51 += _0x6381 + "\x0A"
      }
  }
  ;_0x4D51 += _0x63A9;
  for (var _0x4C11 = 1; _0x4C11 <= _0x5409; _0x4C11++) {
      _0x4D51 += "V:" + _0x4C11 + "\x0A";
      var _0x5D69 = _0x63F9 + genNodesByCount(_0x53B9);
      if (_0x4C11 == 1 && parseInt(_0x5341) != -1) {}
      ;_0x4D51 += _0x5D69 + "%V" + _0x4C11 + "line0end\x0A"
  }
  ;var _0x5111 = _0x4BE9["split"]("\x0A");
  var _0x5D41 = "";
  for (var _0x4C11 = 0; _0x4C11 < _0x5111["length"]; _0x4C11++) {
      if (_0x5111[_0x4C11] == "%%vsetting_start") {
          break
      }
      ;_0x5D41 += _0x5111[_0x4C11] + "\x0A"
  }
  ;_0x5D41 += _0x4D51;
  _0x5D41 = handleBreakLine(_0x5D41, parseInt(_0x5341));
  var _0x6309 = $("#M_type")["val"]();
  if (_0x6309 != "1") {
      _0x5D41 = _0x5D41["replace"](/M:.*/, "M:" + _0x6309)
  }
  ;$("#source")["val"](_0x5D41);
  isNew = false;
  src_change();
  doLog()
}
function handleBarNum() {
  var _0x67B9 = getStaffInfo("source");
  if (!_0x67B9) {
      return
  }
  ;var _0x53B9 = parseInt($("#nodecount")["val"]());
  if (_0x53B9 > _0x67B9["barCount"]) {
      appendNodes(_0x53B9 - _0x67B9["barCount"])
  } else {
      if (_0x53B9 < _0x67B9["barCount"]) {
          var _0x6791 = [];
          for (var _0x4C11 = _0x67B9["barCount"]; _0x4C11 >= _0x53B9; _0x4C11--) {
              _0x6791["push"](_0x4C11)
          }
          ;delNodes(_0x6791)
      }
  }
}
function handleBreakLine(_0x4BE9, _0x6809) {
  var _0x6859 = getLinesInfo(_0x4BE9);
  var _0x4D51 = "";
  var _0x5391 = /(\|[1-9\.]+)|(\|\[[1-9\.]+)|(:\|\|:)|(:\|:)|(:\|)|(::)|(\|:)|(\|\|)|(\|\])|(\|)/g;
  var _0x53B9 = 0;
  var _0x5369 = new Map();
  for (var _0x4C11 = 0, _0x4C61 = _0x6859["length"]; _0x4C11 < _0x4C61; _0x4C11++) {
      var _0x4C89 = _0x6859[_0x4C11];
      if (parseInt(_0x6809) < 1) {
          if (_0x4C89["v"] != -1 && _0x4C89["type"] == "note") {
              _0x4D51 += _0x4C89["lineStr"]["replace"](/\$/g, "") + "\x0A"
          } else {
              _0x4D51 += _0x4C89["lineStr"] + "\x0A"
          }
      } else {
          if (_0x4C89["v"] != -1 && _0x4C89["type"] == "note") {
              if (_0x5369["get"]("count" + _0x4C89["v"]) == null) {
                  _0x5369["set"]("count" + _0x4C89["v"], 0)
              }
              ;_0x53B9 = _0x5369["get"]("count" + _0x4C89["v"]);
              var _0x4CD9 = _0x4C89["lineStr"];
              _0x4CD9 = _0x4CD9["replace"](/\$/g, "");
              _0x4CD9 = _0x4CD9["replace"](/^\s*/, "");
              _0x4CD9 = _0x4CD9["replace"](":||:", ":|:")["replace"]("::", ":|:");
              var _0x4D29 = "";
              var _0x6831 = 0;
              var _0x4D01 = "";
              while (_0x4D29 = _0x5391["exec"](_0x4CD9)) {
                  if (_0x4D29["index"] == 0) {
                      continue
                  }
                  ;_0x53B9++;
                  _0x4D01 += _0x4CD9["substring"](_0x6831, _0x4D29["index"]) + _0x4D29[0];
                  if (_0x53B9 % _0x6809 == 0) {
                      _0x4D01 += "$"
                  }
                  ;_0x6831 = _0x4D29["index"] + _0x4D29[0]["length"]
              }
              ;_0x5369["set"]("count" + _0x4C89["v"], _0x53B9);
              _0x4D01 += _0x4CD9["substring"](_0x6831, _0x4CD9["length"]);
              _0x4D51 += _0x4D01 + "\x0A"
          } else {
              if (_0x4C89["v"] != -1 && _0x4C89["type"] == "note") {
                  _0x4D51 += _0x4C89["lineStr"]["replace"](/\$/g, "") + "\x0A"
              } else {
                  _0x4D51 += _0x4C89["lineStr"] + "\x0A"
              }
          }
      }
  }
  ;if (_0x4D51["indexOf"]("%%linebreak") < 0) {
      _0x4D51 = "%%linebreak $\x0A" + _0x4D51
  }
  ;if (parseInt(_0x6809) < 1) {
      _0x4D51 = _0x4D51["replace"]("%%linebreak $\x0A", "")
  }
  ;_0x4D51 = _0x4D51["replace"](/%%barsperstaff.*\n/, "");
  return _0x4D51
}
function handleBarsPerStaff(_0x5D69, _0x5341) {
  var _0x67E1 = getBarsArray(_0x5D69, true);
  var _0x4D51 = "";
  for (var _0x4C11 = 1; _0x4C11 <= _0x67E1["length"]; _0x4C11++) {
      if (_0x67E1[_0x4C11 - 1]["replace"](/\s/g, "") != "") {
          _0x4D51 += _0x67E1[_0x4C11 - 1];
          if (_0x4C11 > 1 && _0x4C11 % _0x5341 == 0) {
              _0x4D51 += "$"
          }
      }
  }
  ;return _0x4D51
}
function getBarsArray(_0x5D69, _0x6629) {
  if (_0x6629) {
      return _0x5D69["replace"](/::/g, ":|:")["replace"](/\$/g, "")["match"](/.[^\|]*[:]?[|]?\|[:]?[\]]?/g)
  } else {
      return _0x5D69["replace"](/::/g, ":|:")["match"](/.[^\|]*[:]?[|]?\|[:]?[\]]?/g)
  }
}
function genVSetting(_0x64E9) {
  var _0x5409 = parseInt($("#STAFFNUM")["val"]());
  var _0x4D51 = "%%vsetting_start\x0A";
  var _0x4C11 = 1;
  var _0x64C1 = 1;
  var _0x6381 = "";
  if (_0x64E9) {
      var _0x4BE9 = $("#source")["val"]();
      var _0x6359 = /%%score.*|%%staves.*/;
      var _0x5E59 = _0x4BE9["match"](_0x6359);
      if (_0x5E59 != null) {
          _0x6381 = _0x5E59[0]
      }
  } else {
      _0x6381 = "%%score ";
      for (var _0x4C11 = 0; _0x4C11 < _0x5409; _0x4C11++) {
          _0x6381 += _0x4C11 + 1 + " "
      }
  }
  ;_0x6381 += "\x0A";
  _0x4D51 += _0x6381;
  $["each"]($(".staffProp"), function(_0x5099, _0x62E1) {
      _0x4C11 = $(_0x62E1)["attr"]("staffnum");
      var _0x6511 = $("#staffclef" + _0x4C11)["val"]();
      var _0x6561 = $("#nm" + _0x4C11)["val"]();
      var _0x6589 = $("#snm" + _0x4C11)["val"]();
      var _0x65B1 = $("#tone" + _0x4C11)["val"]();
      var _0x6539 = $(".isRhythm[staffnum=\'" + _0x4C11 + "\']")["prop"]("checked");
      var _0x59A9 = "V:" + _0x64C1++;
      if (_0x6511 && _0x6511 != "") {
          _0x59A9 += " clef=" + _0x6511
      } else {
          if (_0x5099 % 2 == 0) {
              _0x59A9 += " treble"
          } else {
              _0x59A9 += " bass"
          }
      }
      ;if (_0x6539) {
          _0x59A9 += " perc stafflines=1"
      }
      ;if (_0x6561 && _0x6561 != "") {
          _0x59A9 += " nm=\"" + _0x6561 + "\""
      }
      ;if (_0x6589 && _0x6589 != "") {
          _0x59A9 += " snm=\"" + _0x6589 + "\""
      }
      ;if (_0x65B1 && _0x65B1 != "") {
          _0x59A9 += "\x0A%%MIDI program " + _0x65B1
      } else {
          _0x59A9 += "\x0A%%MIDI program 0"
      }
      ;_0x4D51 += _0x59A9 + "\x0A"
  });
  if (_0x64C1 == 1) {
      for (var _0x4C11 = 0; _0x4C11 < _0x5409; _0x4C11++) {
          var _0x6499 = "";
          if (_0x4C11 % 2 == 0) {
              _0x6499 = "treble"
          } else {
              _0x6499 = "bass"
          }
          ;_0x4D51 += "V:" + (_0x4C11 + 1) + " " + _0x6499 + "\x0A";
          _0x4D51 += "%%MIDI program 0\x0A"
      }
  }
  ;_0x4D51 += "%%vsetting_end\x0A";
  return _0x4D51
}
function genNodesByCount(_0x53B9, _0x6421) {
  if (!_0x6421) {
      var _0x6421 = new Object();
      _0x6421["top"] = parseInt($("#M_mol")["val"]());
      _0x6421["bot"] = parseInt($("#M_den")["val"]())
  }
  ;var _0x6471 = new Object();
  _0x6471["top"] = parseInt($("#L")["val"]()["split"]("/")[0]);
  _0x6471["bot"] = parseInt($("#L")["val"]()["split"]("/")[1]);
  var _0x6129 = parseInt(_0x6471["bot"] / _0x6421["bot"]);
  var _0x6449 = "z," + _0x6129 * _0x6421["top"];
  var _0x4D51 = "";
  for (var _0x4C11 = 0; _0x4C11 < _0x53B9; _0x4C11++) {
      _0x4D51 += " " + _0x6449 + " |"
  }
  ;return _0x4D51
}
function updateStaffProp() {
  var _0x4BE9 = $("#source")["val"]();
  var _0x7B41 = genVSetting(true);
  var _0x5049 = /%%vsetting_start[\s\S]*%%vsetting_end\n/;
  var _0x6359 = /%%score.*/;
  var _0x5E59 = _0x4BE9["match"](_0x5049);
  if (_0x5E59 != null) {
      _0x4BE9 = _0x4BE9["replace"](_0x5E59[0], _0x7B41);
      $("#source")["val"](_0x4BE9);
      src_change()
  } else {
      if (_0x6359["test"](_0x4BE9)) {
          _0x4BE9 = _0x4BE9["replace"](_0x6359["exec"](_0x4BE9)[0], _0x7B41);
          _0x4BE9 = replaceBlankLine(_0x4BE9);
          $("#source")["val"](_0x4BE9);
          src_change()
      }
  }
}
function appendNodes(_0x4FF9) {
  var _0x5409 = parseInt($("#STAFFNUM")["val"]());
  var _0x4BE9 = $("#source")["val"]();
  var _0x5319 = genNodesByCount(_0x4FF9);
  var _0x4CB1 = getLinesInfo(_0x4BE9);
  var _0x5391 = /(\|[1-9\.]+)|(\|\[[1-9\.]+)|(:\|\|:)|(:\|:)|(:\|)|(::)|(\|:)|(\|\|)|(\|\])|(\|)/g;
  var _0x53B9 = 0;
  var _0x4D51 = "";
  var _0x5369 = new Map();
  var _0x53E1 = 0;
  for (var _0x4C61 = _0x4CB1["length"] - 1, _0x4C11 = _0x4C61; _0x4C11 > 0; _0x4C11--) {
      var _0x4C89 = _0x4CB1[_0x4C11];
      var _0x4CD9 = _0x4C89["lineStr"];
      var _0x4D01 = "";
      if (_0x4C89["type"] == "note") {
          if (_0x5369["get"]("key" + _0x4C89["v"]) == null) {
              _0x5369["set"]("key" + _0x4C89["v"], true);
              _0x4C89["lineStr"] = _0x4C89["lineStr"]["replace"](/(.*\|)/, "$1" + _0x5319)
          }
          ;_0x53E1++
      }
  }
  ;var _0x4D51 = "";
  for (var _0x4C11 = 0, _0x4C61 = _0x4CB1["length"]; _0x4C11 < _0x4C61; _0x4C11++) {
      var _0x4C89 = _0x4CB1[_0x4C11];
      _0x4D51 += _0x4C89["lineStr"] + "\x0A"
  }
  ;if (_0x53E1 == 0) {
      _0x4D51 += "\x0A" + _0x5319
  }
  ;var _0x5341 = $("#barsperstaff")["val"]();
  _0x4D51 = replaceBlankLine(_0x4D51);
  $("#source")["val"](_0x4D51);
  src_change();
  doLog()
}
function popAppendNode() {
  $("#APPEND_NODE_div .modal-content")["css"]("left", ($(window)["width"]() - $("#APPEND_NODE_div .modal-content")["width"]()) / 2);
  $("#APPEND_NODE_div .modal-content")["css"]("width", "250px");
  $("#APPEND_NODE_div")["modal"]()
}
function handleAppendNodes() {
  var _0x4FF9 = $("#appendNodeNum")["val"]();
  appendNodes(_0x4FF9)
}
function handleStaffChange() {
  var _0x4CB1 = getLinesInfo($("#source")["val"]());
  var _0x67B9 = getStaffInfo("source");
  var _0x6999 = parseInt($("#STAFFNUM")["val"]());
  var _0x5D41 = "";
  var _0x6921 = [];
  var _0x68F9 = [];
  if (_0x6999 > _0x67B9["vocalCount"]) {
      var _0x6949 = "";
      for (var _0x4C11 = _0x67B9["vocalCount"] + 1; _0x4C11 <= _0x6999; _0x4C11++) {
          _0x68F9["push"](_0x4C11);
          _0x6949 += getNewStaffStr(_0x4C11, _0x67B9["barCount"])
      }
      ;var _0x5D41 = $("#source")["val"]() + _0x6949;
      _0x5D41 = replaceBlankLine(_0x5D41)
  } else {
      if (_0x6999 < _0x67B9["vocalCount"]) {
          for (var _0x4C11 = _0x67B9["vocalCount"]; _0x4C11 > _0x6999; _0x4C11--) {
              _0x6921["push"](_0x4C11)
          }
          ;for (var _0x4C11 = 0; _0x4C11 < _0x4CB1["length"]; _0x4C11++) {
              var _0x5111 = _0x4CB1[_0x4C11];
              if (_0x6921["indexOf"](_0x5111["v"] + 1) < 0) {
                  if (_0x5111["type"] == "v") {
                      if (_0x6921["indexOf"](_0x5111["vNum"] + 1) < 0) {
                          _0x5D41 += _0x5111["lineStr"] + "\x0A"
                      }
                  } else {
                      _0x5D41 += _0x5111["lineStr"] + "\x0A"
                  }
              }
          }
          ;_0x5D41 = replaceBlankLine(_0x5D41)
      }
  }
  ;var _0x6359 = /%%score|%%staves/;
  $("#source")["val"](_0x5D41);
  _0x4CB1 = getLinesInfo($("#source")["val"]());
  var _0x4D51 = "";
  for (var _0x4C11 = 0; _0x4C11 < _0x4CB1["length"]; _0x4C11++) {
      var _0x5111 = _0x4CB1[_0x4C11];
      var _0x4CD9 = _0x5111["lineStr"];
      var _0x5E59 = _0x4CD9["match"](_0x6359);
      if (_0x5E59 != null) {
          var _0x6381 = _0x5E59[0];
          if (_0x6921["length"] > 0) {
              for (var _0x4C39 = 0; _0x4C39 < _0x6921["length"]; _0x4C39++) {
                  _0x4CD9 = _0x4CD9["replace"](_0x6921[_0x4C39], "")
              }
          } else {
              if (_0x68F9["length"] > 0) {
                  var _0x6971 = "";
                  for (var _0x4C39 = 0; _0x4C39 < _0x68F9["length"]; _0x4C39++) {
                      _0x6971 += " " + _0x68F9[_0x4C39]
                  }
                  ;_0x4CD9 += _0x6971
              }
          }
      }
      ;_0x4D51 += _0x4CD9 + "\x0A"
  }
  ;$("#source")["val"](_0x4D51);
  src_change(doLog)
}
function getNewStaffStr(_0x66C9, _0x6679) {
  var _0x59A9 = "\x0AV:" + _0x66C9 + " \x0A";
  var _0x66A1 = genNodesByCount(_0x6679);
  return _0x59A9 + _0x66A1 + "\x0A"
}
function addBr() {
  var _0x4BC1 = $("#btnAddBr")["html"]();
  if (_0x4BC1 == "\u53d6\u6d88\u6362\u884c") {
      cancelBr();
      return
  }
  ;var _0x4B99 = $("#nodeMenu")["attr"]("barIndex");
  if (!_0x4B99) {
      return
  }
  ;_0x4B99 = parseInt(_0x4B99);
  var _0x4BE9 = $("#source")["val"]();
  _0x4BE9 = _0x4BE9["replace"](/%%barsperstaff.*\n/, "");
  var _0x4CB1 = getNodesInfo(_0x4BE9);
  var _0x4D51 = "";
  var _0x4D79 = getSelectedBarInfo(_0x4B99, 0);
  if (_0x4D79["isLineFirstNode"]) {
      _0x4B99--;
      for (var _0x4C11 = 0, _0x4C61 = _0x4CB1["length"]; _0x4C11 < _0x4C61; _0x4C11++) {
          var _0x4C89 = _0x4CB1[_0x4C11];
          var _0x4CD9 = _0x4C89["lineStr"];
          var _0x4D01 = "";
          if (_0x4C89["type"] == "note") {
              for (var _0x4C39 = 0; _0x4C39 < _0x4C89["nodes"]["length"]; _0x4C39++) {
                  var _0x4D29 = _0x4C89["nodes"][_0x4C39];
                  if (_0x4D29["nodeIndex"] == _0x4B99) {
                      _0x4D01 += _0x4D29["nodeStr"] + "$"
                  } else {
                      _0x4D01 += _0x4D29["nodeStr"]
                  }
                  ;lastNodeEndSeq = _0x4D29["endSeq"]
              }
              ;_0x4D01 += _0x4BE9["substring"](lastNodeEndSeq, _0x4C89["endSeq"]);
              _0x4D51 += _0x4D01 + "\x0A"
          } else {
              _0x4D51 += _0x4C89["lineStr"] + "\x0A"
          }
      }
      ;_0x4D51 = replaceBlankLine(_0x4D51);
      $("#source")["val"](_0x4D51);
      doLog();
      src_change();
      return
  }
  ;for (var _0x4C11 = 0, _0x4C61 = _0x4CB1["length"]; _0x4C11 < _0x4C61; _0x4C11++) {
      var _0x4C89 = _0x4CB1[_0x4C11];
      var _0x4CD9 = _0x4C89["lineStr"];
      var _0x4D01 = "";
      if (_0x4C89["type"] == "note") {
          for (var _0x4C39 = 0; _0x4C39 < _0x4C89["nodes"]["length"]; _0x4C39++) {
              var _0x4D29 = _0x4C89["nodes"][_0x4C39];
              if (_0x4D29["nodeIndex"] == _0x4B99) {
                  _0x4D01 += "$" + _0x4D29["nodeStr"]
              } else {
                  _0x4D01 += _0x4D29["nodeStr"]
              }
              ;lastNodeEndSeq = _0x4D29["endSeq"]
          }
          ;_0x4D01 += _0x4BE9["substring"](lastNodeEndSeq, _0x4C89["endSeq"]);
          _0x4D51 += _0x4D01 + "\x0A"
      } else {
          _0x4D51 += _0x4C89["lineStr"] + "\x0A"
      }
  }
  ;_0x4D51 = replaceBlankLine(_0x4D51);
  $("#source")["val"](_0x4D51);
  doLog();
  src_change()
}
function cancelBr() {
  var _0x4B99 = $("#nodeMenu")["attr"]("barIndex");
  if (!_0x4B99) {
      return
  }
  ;_0x4B99 = parseInt(_0x4B99);
  var _0x4BE9 = $("#source")["val"]();
  var _0x4CB1 = getNodesInfo(_0x4BE9);
  var _0x4D51 = "";
  var _0x54F9 = getPreBarInfo(_0x4B99, 0);
  if (_0x54F9["nextBr"]) {
      _0x4B99--;
      for (var _0x4C11 = 0, _0x4C61 = _0x4CB1["length"]; _0x4C11 < _0x4C61; _0x4C11++) {
          var _0x4C89 = _0x4CB1[_0x4C11];
          var _0x4CD9 = _0x4C89["lineStr"];
          var _0x4D01 = "";
          if (_0x4C89["type"] == "note") {
              var _0x54D1 = false;
              for (var _0x4C39 = 0; _0x4C39 < _0x4C89["nodes"]["length"]; _0x4C39++) {
                  var _0x4D29 = _0x4C89["nodes"][_0x4C39];
                  if (_0x4D29["nodeIndex"] == _0x4B99) {
                      _0x54D1 = true
                  }
                  ;_0x4D01 += _0x4D29["nodeStr"];
                  lastNodeEndSeq = _0x4D29["endSeq"]
              }
              ;if (_0x54D1) {
                  _0x4D01 += _0x4BE9["substring"](lastNodeEndSeq, _0x4C89["endSeq"])["replace"]("$", "")
              } else {
                  _0x4D01 += _0x4BE9["substring"](lastNodeEndSeq, _0x4C89["endSeq"])
              }
              ;_0x4D51 += _0x4D01 + "\x0A"
          } else {
              _0x4D51 += _0x4C89["lineStr"] + "\x0A"
          }
      }
      ;_0x4D51 = replaceBlankLine(_0x4D51);
      $("#source")["val"](_0x4D51);
      doLog();
      src_change();
      return
  }
  ;for (var _0x4C11 = 0, _0x4C61 = _0x4CB1["length"]; _0x4C11 < _0x4C61; _0x4C11++) {
      var _0x4C89 = _0x4CB1[_0x4C11];
      var _0x4CD9 = _0x4C89["lineStr"];
      var _0x4D01 = "";
      if (_0x4C89["type"] == "note") {
          var _0x54D1 = false;
          for (var _0x4C39 = 0; _0x4C39 < _0x4C89["nodes"]["length"]; _0x4C39++) {
              var _0x4D29 = _0x4C89["nodes"][_0x4C39];
              if (_0x4D29["nodeIndex"] == _0x4B99) {
                  _0x54D1 = true;
                  _0x4D01 += _0x4D29["nodeStr"]["replace"]("$", "")
              } else {
                  _0x4D01 += _0x4D29["nodeStr"]
              }
              ;lastNodeEndSeq = _0x4D29["endSeq"]
          }
          ;if (_0x54D1) {
              _0x4D01 += _0x4BE9["substring"](lastNodeEndSeq, _0x4C89["endSeq"])
          }
          ;_0x4D51 += _0x4D01 + "\x0A"
      } else {
          _0x4D51 += _0x4C89["lineStr"] + "\x0A"
      }
  }
  ;_0x4D51 = replaceBlankLine(_0x4D51);
  $("#source")["val"](_0x4D51);
  doLog();
  src_change()
}
function switchNoteBr() {
  if ($("#notebr")["prop"]("checked")) {
      addBr()
  } else {
      cancelBr()
  }
}
function getPreBarInfo(_0x4B99, _0x66F1) {
  return getSelectedBarInfo(_0x4B99 - 1, _0x66F1)
}
function getSelectedBarInfo(_0x4B99, _0x66F1) {
  var _0x4BE9 = $("#source")["val"]();
  var _0x4CB1 = getNodesInfo(_0x4BE9);
  for (var _0x4C11 = 0, _0x4C61 = _0x4CB1["length"]; _0x4C11 < _0x4C61; _0x4C11++) {
      var _0x4C89 = _0x4CB1[_0x4C11];
      var _0x4CD9 = _0x4C89["lineStr"];
      if (_0x4C89["v"] == _0x66F1 && _0x4C89["type"] == "note") {
          var _0x5139 = _0x4C89["nodes"];
          for (var _0x4C39 = 0; _0x4C39 < _0x5139["length"]; _0x4C39++) {
              var _0x4D29 = _0x5139[_0x4C39];
              if (_0x4D29["nodeIndex"] == _0x4B99) {
                  return _0x4D29
              }
          }
      }
  }
  ;return null
}
function getSelectBarContent(_0x4B99, _0x66F1) {
  var _0x4BE9 = $("#source")["val"]();
  var _0x4CB1 = getNodesInfo(_0x4BE9);
  for (var _0x4C11 = 0, _0x4C61 = _0x4CB1["length"]; _0x4C11 < _0x4C61; _0x4C11++) {
      var _0x4C89 = _0x4CB1[_0x4C11];
      var _0x4CD9 = _0x4C89["lineStr"];
      if (_0x4C89["v"] == _0x66F1 && _0x4C89["type"] == "note") {
          var _0x5139 = _0x4C89["nodes"];
          for (var _0x4C39 = 0; _0x4C39 < _0x5139["length"]; _0x4C39++) {
              var _0x4D29 = _0x5139[_0x4C39];
              if (_0x4D29["nodeIndex"] == _0x4B99) {
                  return _0x4D29["nodeStr"]
              }
          }
      }
  }
}
function delNode(_0x4B99) {
  var _0x5DB9 = $("#STAFFNUM")["val"]();
  var _0x4BE9 = $("#source")["val"]();
  for (var _0x4C11 = 0; _0x4C11 < parseInt(_0x5DB9); _0x4C11++) {
      var _0x5049 = new RegExp(".*%V" + (_0x4C11 + 1) + "lined+(end)?","g");
      var _0x5D91 = new RegExp("%V" + v + "(line\\d+|end)");
      var _0x4CB1 = _0x4BE9["match"](_0x5049);
      if (_0x4CB1 != null) {
          var _0x5D69 = "";
          for (var _0x4C39 = 0, _0x4C61 = _0x4CB1["length"]; _0x4C39 < _0x4C61; _0x4C39++) {
              _0x5D69 += _0x4CB1[_0x4C11]["replace"](_0x5D91, "")
          }
          ;if (_0x5D69 != "") {
              getBarsArray(_0x5D69, false)
          }
      }
  }
}
function upDownKeyWord(_0x7BE1) {
  var _0x57F1 = $("svg[type=\'rectnode\'],svg[type=\'rectbar\']");
  var _0x4BE9 = $("#source")["val"]();
  if (_0x57F1["length"] > 0) {
      var _0x7961 = new Array();
      $["each"]($(_0x57F1), function(_0x4C11, _0x62E1) {
          var _0x5161 = $(_0x62E1)["attr"]("id");
          var _0x6601 = _0x5161["replace"]("mysvgnode", "")["replace"]("mysvgbar", "");
          var _0x76B9, _0x66F1;
          if (_0x6601["indexOf"]("_") > -1) {
              _0x76B9 = parseInt(_0x6601["split"]("_")[1]);
              _0x66F1 = parseInt(_0x6601["split"]("_")[0])
          } else {
              _0x76B9 = parseInt(_0x6601);
              _0x66F1 = -1
          }
          ;var _0x51D9 = new Object();
          _0x51D9["barNum"] = _0x76B9;
          _0x51D9["v"] = _0x66F1;
          _0x7961["push"](_0x51D9)
      });
      if (_0x7961["length"] > 0) {
          var _0x4CB1 = getNodesInfo(_0x4BE9);
          var _0x5391 = /(\|[1-9\.]+)|(\|\[[1-9\.]+)|(:\|\|:)|(:\|:)|(:\|)|(::)|(\|:)|(\|\|)|(\|\])|(\|)/g;
          var _0x53B9 = 0;
          var _0x4D51 = "";
          var _0x5369 = new Map();
          for (var _0x4C11 = 0, _0x4C61 = _0x4CB1["length"]; _0x4C11 < _0x4C61; _0x4C11++) {
              var _0x4C89 = _0x4CB1[_0x4C11];
              var _0x4CD9 = _0x4C89["lineStr"];
              var _0x4D01 = "";
              if (_0x4C89["type"] == "note") {
                  var _0x5139 = _0x4C89["nodes"];
                  var _0x7BB9 = false;
                  var _0x7C81 = _0x4C89["endSeq"];
                  var _0x7CD1 = -1;
                  for (var _0x5099 = 0; _0x5099 < _0x5139["length"]; _0x5099++) {
                      var _0x4D29 = _0x5139[_0x5099];
                      var _0x7E11 = false;
                      var _0x7E39 = "";
                      for (var _0x7C31 = 0; _0x7C31 < _0x7961["length"]; _0x7C31++) {
                          var _0x7B69 = _0x7961[_0x7C31];
                          if ((_0x4D29["v"] == _0x7B69["v"] || _0x7B69["v"] == -1) && _0x4D29["nodeIndex"] == _0x7B69["barNum"]) {
                              _0x7E39 = updownnote(_0x4D29["nodeStr"], _0x7BE1);
                              _0x7E11 = true;
                              _0x7BB9 = true
                          }
                      }
                      ;_0x7CD1 = _0x4D29["endSeq"];
                      if (!_0x7E11) {
                          _0x4D01 += _0x4D29["nodeStr"]
                      } else {
                          _0x4D01 += _0x7E39
                      }
                  }
                  ;if (_0x7CD1 < _0x7C81) {
                      _0x4D01 += _0x4BE9["substring"](_0x7CD1, _0x7C81)
                  }
                  ;if (_0x7BB9) {
                      _0x4D51 += _0x4D01 + "\x0A"
                  } else {
                      _0x4D51 += _0x4CD9 + "\x0A"
                  }
              } else {
                  _0x4D51 += _0x4C89["lineStr"] + "\x0A"
              }
          }
      }
      ;_0x4D51 = replaceBlankLine(_0x4D51);
      $("#source")["val"](_0x4D51);
      src_change();
      doLog();
      return true
  }
  ;if ($(".selected_text")["length"] > 1 || $(".select_text_g")["length"] > 1) {
      var _0x7D21 = _0x4BE9 + "";
      var _0x5D41 = "";
      var _0x5599 = 0;
      var _0x7C59 = 0;
      var _0x7C09 = 0;
      var _0x7D99 = [];
      $(".selected_text,.select_text_g")["each"](function(_0x4C11, _0x62E1) {
          var _0x5571 = -1;
          _0x5571 = $(_0x62E1)["attr"]("istart");
          if (_0x5571 == -1) {
              return false
          }
          ;var _0x5661 = syms[_0x5571];
          update_note_index = 0;
          if (_0x5661 && _0x5661["notes"]["length"] > 1) {
              var _0x7E61 = _0x7D21["substring"](_0x5661["istart"], _0x5661["iend"]);
              var _0x4D29 = /\[(.[^\[]*)\]/["exec"](_0x7E61);
              if (_0x4D29 != null) {
                  var _0x59A9 = _0x4D29[1];
                  var _0x7B91 = str2notes(_0x59A9);
                  var _0x7EB1 = "";
                  for (var _0x5099 = 0; _0x5099 < _0x7B91["length"]; _0x5099++) {
                      _0x7EB1 += _0x7B91[_0x5099]["note"]
                  }
                  ;_0x4BE9 = _0x4BE9["substring"](0, _0x5661["istart"]) + "[" + _0x7EB1 + _0x7E61["substring"](_0x7E61["indexOf"]("]")) + _0x4BE9["substring"](_0x5661["iend"]);
                  $("#source")["val"](_0x4BE9);
                  update_note_index = $(_0x62E1)["attr"]("update_index");
                  if (update_note_index == -1 && $(_0x62E1)["hasClass"]("select_text_g")) {
                      update_note_index = $(_0x62E1)["children"](":first")["attr"]("update_index")
                  }
                  ;update_note_index_arr["push"](update_note_index);
                  update_note_istart_arr["push"](_0x5661["istart"]);
                  var _0x7ED9 = _0x7B91[update_note_index];
                  var _0x7DE9 = _0x7B91[update_note_index]["note"];
                  console["log"]("update_note_index:", update_note_index, " \u5f53\u524d\u66f4\u65b0\u7684\u97f3\u7b26\uff1a", _0x7B91[update_note_index]);
                  var _0x7CF9 = _0x7ED9["index"] + _0x7BE1;
                  var _0x7CA9 = updownnote(_0x7DE9, _0x7BE1);
                  console["log"]("\u66f4\u65b0\u524d\u7684\u97f3\u7b26\uff1a", _0x7DE9, "  \u66f4\u65b0\u540e:", _0x7CA9);
                  _0x7C09 += _0x7CA9["length"] - _0x7DE9["length"];
                  var _0x51D9 = new Object();
                  var _0x7E89 = false;
                  for (var _0x4C39 = 0; _0x4C39 < _0x7D99["length"]; _0x4C39++) {
                      var _0x6601 = _0x7D99[_0x4C39];
                      if (_0x6601["istart"] == _0x5661["istart"]) {
                          _0x51D9 = _0x7D99[_0x4C39];
                          _0x7E89 = true
                      }
                  }
                  ;if (_0x7E89) {
                      _0x51D9["oldNoteStrArr"]["push"](_0x7DE9);
                      _0x51D9["newNoteStrArr"]["push"](_0x7CA9);
                      _0x51D9["updateIndexArr"]["push"](parseInt(update_note_index))
                  } else {
                      _0x51D9["istart"] = _0x5661["istart"];
                      _0x51D9["iend"] = _0x5661["iend"];
                      _0x51D9["chordNotes"] = []["concat"](_0x7B91);
                      _0x51D9["oldNoteStrArr"] = [];
                      _0x51D9["oldNoteStrArr"]["push"](_0x7DE9);
                      _0x51D9["newNoteStrArr"] = [];
                      _0x51D9["newNoteStrArr"]["push"](_0x7CA9);
                      _0x51D9["updateIndexArr"] = [];
                      _0x51D9["updateIndexArr"]["push"](parseInt(update_note_index));
                      _0x7D99["push"](_0x51D9)
                  }
                  ;return true
              }
          }
          ;var _0x7CF9 = mypit2mid(_0x5661, 0) + _0x7BE1;
          play_note(_0x7CF9, durSetting);
          update_note_istart_arr["push"](parseInt(_0x5571) + _0x7C09);
          if (!_0x5661) {
              return
          }
          ;var _0x7D49 = _0x4BE9["substring"](_0x5661["istart"], _0x5661["iend"]);
          var _0x7AF1 = str2notes(_0x7D49["replace"](/[\[\]]/g, ""));
          console["log"]("\u5f53\u524d\u4fee\u6539\u7684\u97f3\u7b26\u662f\uff1a", _0x7AF1[update_note_index]);
          updateNoteIndexInChord = update_note_index;
          if (!_0x7AF1[update_note_index]) {
              return
          }
          ;var _0x7DE9 = _0x7AF1[update_note_index]["note"];
          var _0x7CA9 = updownnote(_0x7DE9, _0x7BE1);
          var _0x7731 = _0x7D49["replace"](_0x7DE9, _0x7CA9);
          console["log"]("newNoteStr:", _0x7731);
          _0x7C09 += _0x7731["length"] - _0x7D49["length"];
          _0x5D41 += _0x4BE9["substring"](_0x7C59, _0x5661["istart"]) + _0x7731;
          _0x5599 = _0x5661["istart"];
          _0x7C59 = _0x5661["iend"]
      });
      if (_0x7D99["length"] > 0) {
          for (var _0x4C11 = 0; _0x4C11 < _0x7D99["length"]; _0x4C11++) {
              var _0x51D9 = _0x7D99[_0x4C11];
              var _0x7B91 = _0x51D9["chordNotes"];
              var _0x7D49 = _0x4BE9["substring"](_0x51D9["istart"], _0x51D9["iend"]);
              var _0x5611 = _0x7D49["substring"](0, _0x7D49["indexOf"]("[") + 1);
              var _0x7321 = _0x7D49["substring"](_0x7D49["indexOf"]("]"));
              var _0x7CA9 = "";
              for (var _0x4C39 = 0; _0x4C39 < _0x7B91["length"]; _0x4C39++) {
                  var _0x7D71 = false;
                  var _0x62B9 = "";
                  for (var _0x5099 = 0; _0x5099 < _0x51D9["updateIndexArr"]["length"]; _0x5099++) {
                      var _0x7DC1 = _0x51D9["updateIndexArr"][_0x5099];
                      if (_0x7DC1 == _0x4C39) {
                          _0x7D71 = true;
                          _0x62B9 = _0x51D9["newNoteStrArr"][_0x5099]
                      }
                  }
                  ;if (_0x7D71) {
                      _0x7CA9 += _0x62B9
                  } else {
                      _0x7CA9 += _0x7B91[_0x4C39]["note"]
                  }
              }
              ;if (_0x7CA9 != "") {
                  _0x7CA9 = _0x5611 + _0x7CA9 + _0x7321;
                  console["log"]("newNoteStr:", _0x7CA9);
                  _0x5D41 = _0x4BE9["substring"](0, _0x51D9["istart"]) + _0x7CA9 + _0x4BE9["substring"](_0x51D9["iend"])
              }
          }
          ;$("#source")["val"](_0x5D41);
          lastFirstNoteSeq = getFirstNoteSeq();
          src_change();
          doLog();
          return true
      }
      ;if (_0x5D41 != "") {
          _0x5D41 += _0x4BE9["substring"](_0x7C59);
          $("#source")["val"](_0x5D41);
          lastFirstNoteSeq = getFirstNoteSeq();
          src_change();
          doLog();
          return true
      }
  }
  ;if ($(".selected_text")["length"] == 1 || $(".select_text_g")["length"] == 1) {
      var _0x5571 = -1;
      if ($(".selected_text")["length"] > 0) {
          _0x5571 = $(".selected_text")["attr"]("istart")
      } else {
          if ($(".select_text_g")["length"] > 0) {
              _0x5571 = $("g[istart]")["attr"]("istart")
          }
      }
      ;if (_0x5571 == -1) {
          return false
      }
      ;var _0x5661 = syms[_0x5571];
      var _0x7CF9 = mypit2mid(_0x5661, 0) + _0x7BE1;
      play_note(_0x7CF9, durSetting);
      var _0x4BE9 = $("#source")["val"]();
      update_note_index = 0;
      if (_0x5661 && _0x5661["notes"]["length"] > 1) {
          update_note_index = $(".select_text_g,.selected_text")["attr"]("update_index")
      }
      ;update_note_istart = _0x5571;
      if (!_0x5661) {
          return
      }
      ;var _0x7D49 = _0x4BE9["substring"](_0x5661["istart"], _0x5661["iend"]);
      var _0x7AF1 = str2notes(_0x7D49["replace"](/[\[\]]/g, ""));
      console["log"]("\u5f53\u524d\u4fee\u6539\u7684\u97f3\u7b26\u662f\uff1a", _0x7AF1[update_note_index]);
      updateNoteIndexInChord = update_note_index;
      if (!_0x7AF1[update_note_index]) {
          return
      }
      ;var _0x7DE9 = _0x7AF1[update_note_index]["note"];
      var _0x7CA9 = updownnote(_0x7DE9, _0x7BE1);
      var _0x7731 = _0x7D49["replace"](_0x7DE9, _0x7CA9);
      console["log"]("newNoteStr:", _0x7731);
      var _0x5D41 = _0x4BE9["substring"](0, _0x5661["istart"]) + _0x7731 + _0x4BE9["substring"](_0x5661["iend"]);
      $("#source")["val"](_0x5D41);
      lastFirstNoteSeq = getFirstNoteSeq();
      src_change();
      doLog();
      return true
  }
  ;return false
}
function handleWeakBar() {
  genInitStaff()
}
function getScoreStr() {
  return "";
  var _0x59A9 = "%%score ";
  var _0x6741 = 0;
  var _0x6719 = 0;
  $["each"]($(".toneClass"), function(_0x4C11, _0x62E1) {
      var _0x6769 = $(_0x62E1)["val"]();
      if (parseInt(_0x6769) < 7) {
          _0x6741++;
          _0x59A9 += "{"
      } else {
          if (_0x6741 > 0) {
              _0x6741--;
              if (_0x6741 > 0) {
                  _0x59A9 += "}"
              }
          }
      }
      ;if (_0x6741 == 1) {}
      ;_0x59A9 += _0x4C11 + " "
  });
  return _0x59A9
}
function delStaff(_0x51D9) {
  var _0x5DE1 = $(_0x51D9)["attr"]("staffnum");
  $("#staffProp" + _0x5DE1)["remove"]();
  $("#STAFFNUM")["val"](parseInt($("#STAFFNUM")["val"]()) - 1);
  genInitStaff()
}
function addStaff() {
  $("#STAFFNUM")["val"](parseInt($("#STAFFNUM")["val"]()) + 1);
  genInitStaff();
  initStaffProp()
}
function backfilStaffProp(_0x54A9) {
  $("#STAFFNUM")["val"](_0x54A9["vocalCount"]);
  if (has_weak_node) {
      $("#nodecount")["val"](_0x54A9["barCount"] - 1)
  } else {
      $("#nodecount")["val"](_0x54A9["barCount"])
  }
  ;if (_0x54A9["lineBarNum"] != -1) {
      $("#barsperstaff")["val"](_0x54A9["lineBarNum"])
  } else {
      $("#barsperstaff")["val"]("")
  }
  ;if (_0x54A9["hasWeakNode"] && _0x54A9["weakNodeVal"] > 0) {
      $("#isR")["prop"]("checked", true);
      $("#weakBarTop")["removeAttr"]("disabled");
      $("#weakBarTop")["val"](_0x54A9["weakNode"]["top"]);
      $("#weakBarBot")["removeAttr"]("disabled");
      $("#weakBarBot")["val"](_0x54A9["weakNode"]["bot"])
  } else {
      $("#isR")["prop"]("checked", false);
      $("#weakBarTop")["attr"]("disabled", "disabled");
      $("#weakBarBot")["attr"]("disabled", "disabled")
  }
  ;if (_0x54A9["lineHeight"] != -1) {
      $(".line_height")["val"](_0x54A9["lineHeight"])
  } else {
      $(".line_height")["val"]("")
  }
  ;if (_0x54A9["meter"] != null) {
      $("#M_mol")["val"](_0x54A9["meter"]["top"]);
      $("#M_den")["val"](_0x54A9["meter"]["bot"])
  }
  ;if (_0x54A9["isFreeMeasure"]) {
      $("#nometer")["prop"]("checked", true)
  } else {
      $("#nometer")["prop"]("checked", false)
  }
  ;$("#Q_DESC")["val"](_0x54A9["speedDesc"]);
  if (_0x54A9["speed"] && _0x54A9["speed"]["meter"]) {
      var _0x5481 = _0x54A9["speed"]["meter"]["top"] + "/" + _0x54A9["speed"]["meter"]["bot"];
      var _0x5431 = ["1/1", "1/2", "1/4", "1/8", "1/16", "1/32"];
      var _0x5459 = _0x5431["indexOf"](_0x5481);
      $("#Q_V")["val"](_0x54A9["speed"]["val"]);
      if (_0x5459) {
          selectSpeed(_0x5459 + 1, _0x5481)
      }
  }
  ;if (_0x54A9["key"] != null) {
      $("#K")["val"](_0x54A9["key"]);
      switchJiTaChord(_0x54A9["key"]);
      swithchJianPu(_0x54A9["key"])
  }
  ;if (_0x54A9["titleFontSize"] != null) {
      $("#titleFontSize")["val"](_0x54A9["titleFontSize"])
  }
  ;if (_0x54A9["titleFontColor"] != null) {
      $("#titleColor")["val"](_0x54A9["titleFontColor"]);
      $("#titleColor")["css"]("background-color", _0x54A9["titleFontColor"])
  }
  ;if (_0x54A9["lyricFontSize"] != null) {
      $("#lyricFontSize")["val"](_0x54A9["lyricFontSize"])
  }
  ;if (_0x54A9["lyricFontColor"] != null) {
      $("#lyricColor")["val"](_0x54A9["lyricFontColor"]);
      $("#lyricColor")["css"]("background-color", _0x54A9["lyricFontColor"])
  }
}
function genDotInfo(_0x6039, _0x6089) {
  var _0x4BE9 = $("#source")["val"]();
  var _0x6219 = _0x4BE9["substring"](_0x6039["istart"], _0x6039["iend"]);
  var _0x5EA9 = new Object();
  var _0x61F1 = _0x6039["dur"];
  var _0x6151 = _0x6039["dur"] * _0x6089;
  var _0x60B1 = _0x6151 - _0x61F1;
  var _0x6241 = /([\/0-9]+)/g;
  var _0x5E59 = _0x6219["match"](_0x6241);
  var _0x5ED1 = _0x6219;
  if (_0x5E59 != null) {
      var _0x6269 = _0x5E59[0];
      _0x5ED1 = _0x6219["replaceAll"](_0x6269, "");
      if (1 == 2) {
          var _0x60D9 = _0x6269["indexOf"]("/");
          var _0x6101 = /\d/["test"](_0x6269);
          if (_0x60D9 > 0 && !_0x6101) {
              _0x6219 = _0x6219["substring"](0, _0x60D9) + val + _0x6219["substring"](_0x60D9)
          } else {
              if (_0x60D9 == -1 && _0x6101) {
                  var _0x6129 = parseInt(_0x6269);
                  var _0x61A1 = 1;
                  if (val == "7//") {
                      _0x61A1 = 7 / 4
                  } else {
                      if (val == "3/") {
                          _0x61A1 = 3 / 2
                      }
                  }
                  ;var _0x6179 = _0x6129 * _0x61A1;
                  _0x6179 = decimalsToFractional(_0x6179) + "";
                  _0x6179 = _0x6179["replace"]("/4", "//")["replace"]("/2", "/")["replace"]("/1", "");
                  _0x6219 = _0x6219["replace"](/\d/g, _0x6179)
              }
          }
      }
  }
  ;_0x5EA9["note"] = _0x5ED1;
  _0x5ED1 = _0x5ED1 + getDurStrByNoteDur(_0x6151, _0x6039["my_ulen"]);
  var _0x6061 = new Array();
  var _0x6291 = null;
  var _0x61C9 = _0x6039["next"];
  while (_0x61C9) {
      if (_0x61C9["type"] != 8 && _0x61C9["type"] != 10) {
          if (_0x61C9["type"] == 0) {
              _0x5EA9["del_nodeline"] = 1;
              _0x5EA9["dur_nodeline_behind"] = _0x60B1
          }
          ;_0x6061["push"](abc["clone"](_0x61C9, 2));
          _0x61C9 = _0x61C9["next"];
          if (_0x61C9 == null) {
              for (var _0x4C11 = _0x6039["istart"] + 1, _0x4C61 = syms["length"]; _0x4C11 < _0x4C61; _0x4C11++) {
                  var _0x6129 = syms[_0x4C11];
                  if (_0x6129) {
                      if (_0x6129["v"] == _0x6039["v"] && (_0x6129["type"] == 8 || _0x6129["type"] == 10)) {
                          _0x61C9 = _0x6129;
                          break
                      }
                  }
              }
          }
          ;continue
      }
      ;if ((_0x61C9["type"] == 8 || _0x61C9["type"] == 10) && _0x61C9["dur"] <= _0x60B1) {
          _0x60B1 = _0x60B1 - _0x61C9["dur"];
          if (_0x60B1 <= 0) {
              if (_0x60B1 == 0) {
                  _0x6061["push"](abc["clone"](_0x61C9, 2))
              } else {
                  if (_0x60B1 < 0) {
                      _0x6291 = _0x61C9;
                      _0x6291["dur"] = _0x61C9["dur"] - _0x60B1;
                      _0x6291["dur_orig"] = _0x6291["dur"];
                      _0x6291["notes"]["forEach"](function(_0x62E1, _0x4C11) {
                          _0x6291["notes"][_0x4C11]["dur"] = _0x6291["dur"]
                      });
                      var _0x62B9 = _0x4BE9["substring"](_0x6291["istart"], _0x6291["iend"]);
                      _0x62B9 = _0x62B9["replace"](_0x6241, "");
                      _0x6291["restStr"] = _0x62B9 + getDurStrByNoteDur(_0x6291["dur"], _0x6039["my_ulen"])
                  }
              }
              ;break
          }
          ;_0x6061["push"](abc["clone"](_0x61C9, 2));
          _0x61C9 = _0x61C9["next"]
      } else {
          _0x6291 = _0x61C9;
          _0x6291["dur_orig"] = _0x6291["dur"] + 0;
          _0x6291["dur"] = _0x61C9["dur"] - _0x60B1;
          _0x6291["notes"]["forEach"](function(_0x62E1, _0x4C11) {
              _0x6291["notes"][_0x4C11]["dur"] = _0x6291["dur"]
          });
          var _0x62B9 = _0x4BE9["substring"](_0x6291["istart"], _0x6291["iend"]);
          _0x62B9 = _0x62B9["replace"](_0x6241, "");
          _0x6291["restStr"] = _0x62B9 + getDurStrByNoteDur(_0x6291["dur"], _0x6039["my_ulen"]);
          break
      }
  }
  ;_0x5EA9["note_dur"] = _0x6151;
  _0x5EA9["ulen"] = _0x6039["my_ulen"];
  _0x5EA9["noteStr"] = _0x5ED1;
  _0x5EA9["del_s"] = _0x6061;
  _0x5EA9["update_dur_s"] = _0x6291;
  replaceNote("source", _0x6039["istart"], _0x6039["iend"], _0x5EA9);
  return;
  _0x4BE9 = _0x4BE9["substring"](0, _0x6039["istart"]) + _0x6219 + _0x4BE9["substring"](_0x6039["iend"]);
  $("#source")["val"](_0x4BE9);
  if (musicType == 2) {
      src_change()
  } else {
      render()
  }
  ;doLog();
  return
}
function setBarBgColor() {
  var _0x6FD9 = $("#barBgColorInput")["val"]();
  if (_0x6FD9["indexOf"]("#") < 0) {
      _0x6FD9 = "#" + _0x6FD9
  }
  ;setNodeBgColor(_0x6FD9)
}
function switchBarRestShow(_0x6719) {
  console["log"]("switchBarRestShow");
  var _0x57F1 = $("svg[type=\'rectnode\'],svg[type=\'rectbar\']");
  var _0x4BE9 = $("#source")["val"]();
  if (_0x57F1["length"] > 0) {
      var _0x7961 = new Array();
      $["each"]($(_0x57F1), function(_0x4C11, _0x62E1) {
          var _0x5161 = $(_0x62E1)["attr"]("id");
          var _0x6601 = _0x5161["replace"]("mysvgnode", "")["replace"]("mysvgbar", "");
          var _0x76B9, _0x66F1;
          if (_0x6601["indexOf"]("_") > -1) {
              _0x76B9 = parseInt(_0x6601["split"]("_")[1]);
              _0x66F1 = parseInt(_0x6601["split"]("_")[0])
          } else {
              _0x76B9 = parseInt(_0x6601);
              _0x66F1 = -1
          }
          ;var _0x51D9 = new Object();
          _0x51D9["barNum"] = _0x76B9;
          _0x51D9["v"] = _0x66F1;
          _0x7961["push"](_0x51D9)
      });
      if (_0x7961["length"] > 0) {
          var _0x4CB1 = getNodesInfo(_0x4BE9);
          var _0x5391 = /(\|[1-9\.]+)|(\|\[[1-9\.]+)|(:\|\|:)|(:\|:)|(:\|)|(::)|(\|:)|(\|\|)|(\|\])|(\|)/g;
          var _0x53B9 = 0;
          var _0x4D51 = "";
          var _0x5369 = new Map();
          var _0x79B1 = [];
          for (var _0x4C11 = 0, _0x4C61 = _0x4CB1["length"]; _0x4C11 < _0x4C61; _0x4C11++) {
              var _0x4C89 = _0x4CB1[_0x4C11];
              var _0x4CD9 = _0x4C89["lineStr"];
              var _0x4D01 = "";
              if (_0x4C89["type"] == "note") {
                  var _0x5139 = _0x4C89["nodes"];
                  var _0x50E9 = -1;
                  for (var _0x5099 = 0; _0x5099 < _0x5139["length"]; _0x5099++) {
                      var _0x79D9 = _0x5139[_0x5099];
                      var _0x5779 = _0x4BE9["substring"](_0x79D9["startSeq"], _0x79D9["endSeq"]);
                      var _0x6F89 = _0x5779;
                      for (var _0x4C39 = 0; _0x4C39 < _0x7961["length"]; _0x4C39++) {
                          var _0x7989 = _0x7961[_0x4C39];
                          if (_0x7989["barNum"] == _0x79D9["nodeIndex"] && _0x7989["v"] == _0x79D9["v"] && _0x79B1["indexOf"](_0x7989["barNum"] + "-" + _0x7989["v"]) < 0) {
                              if (_0x6719 == "hide") {
                                  _0x6F89 = _0x5779["replace"]("z,", "x")["replace"]("z", "x")
                              } else {
                                  if (_0x6719 == "show") {
                                      _0x6F89 = _0x5779["replace"]("x", "z")
                                  }
                              }
                              ;_0x79B1["push"](_0x7989["barNum"] + "-" + _0x7989["v"])
                          }
                      }
                      ;_0x4D51 += _0x6F89;
                      _0x50E9 = _0x79D9["endSeq"]
                  }
                  ;if (_0x50E9 < _0x4C89["endSeq"]) {
                      _0x4D51 += _0x4BE9["substring"](_0x50E9, _0x4C89["endSeq"])
                  }
              } else {
                  _0x4D51 += _0x4C89["lineStr"] + "\x0A"
              }
          }
      }
      ;$("#source")["val"](_0x4D51);
      src_change();
      doLog();
      return true
  }
}
function changeSGch() {
  var _0x5071 = $("#gchText")["val"]();
  var _0x5A99 = $("#gchText")["attr"]("ori_val");
  var _0x5571 = $(selectGchInfo)["attr"]("istart");
  var _0x5661 = syms[_0x5571];
  if (_0x5661) {
      var _0x5891 = _0x5661["a_gch"];
      var _0x5A49 = getGchInfo(_0x5661, _0x5A99);
      if (_0x5A49 != null) {
          var _0x4BE9 = $("#source")["val"]();
          var _0x5A71 = $("input[name=\'gchdirect\']:checked")["val"]() + $("input[name=\'gchfonttype\']:checked")["val"]();
          var _0x5A21 = $("#gchfontsize")["val"]();
          if (_0x5A21 != 14) {
              _0x5A71 += "[font-size:" + _0x5A21 + "]"
          }
          ;_0x5A71 += _0x5071;
          var _0x59F9 = "{";
          var _0x4FF9 = 0;
          if ($("#xoffset")["val"]() != "") {
              _0x59F9 += "x:" + $("#xoffset")["val"]();
              _0x4FF9++
          }
          ;if ($("#yoffset")["val"]() != "") {
              if (_0x4FF9 > 0) {
                  _0x59F9 += ","
              }
              ;_0x59F9 += "y:" + $("#yoffset")["val"]();
              _0x4FF9++
          }
          ;_0x59F9 += "}";
          if (_0x4FF9 == 0) {
              _0x59F9 = ""
          }
          ;_0x4BE9 = _0x4BE9["substring"](0, _0x5A49["istart"]) + "\"" + _0x5A71 + _0x59F9 + "\"" + _0x4BE9["substring"](_0x5A49["iend"]);
          $("#source")["val"](_0x4BE9);
          doLog();
          src_change(function() {
              $("text[gch_istart=" + _0x5A49["istart"] + "]")["attr"]("selected", "selected")["css"]("color", "red");
              selectGchInfo = $("text[gch_istart=" + _0x5A49["istart"] + "]");
              $("#gchText")["attr"]("ori_val", _0x5071)
          })
      }
  }
}
function syncText() {
  if (event["keyCode"] == 13) {
      changeSGch()
  }
}
function setSlurDirect(_0x7529) {
  var _0x7169 = "";
  if (_0x7529 == "up") {
      _0x7169 = "\'"
  } else {
      if (_0x7529 == "down") {
          _0x7169 = ","
      }
  }
  ;var _0x7551 = $(".selected_path[type=\'slur\']");
  if (_0x7551["length"] > 0) {
      var _0x5571 = $(_0x7551)["attr"]("istart");
      var _0x5661 = syms[_0x5571];
      var _0x4BE9 = $("#source")["val"]();
      var _0x5611 = _0x4BE9["substring"](0, _0x5571);
      lastIndex = _0x5611["lastIndexOf"]("(") + 1;
      var _0x6971 = _0x4BE9["substr"](lastIndex, 1);
      if (_0x6971 == "," || _0x6971 == "\'") {
          _0x4BE9 = _0x4BE9["substring"](0, lastIndex) + _0x7169 + _0x4BE9["substring"](lastIndex + 1)
      } else {
          _0x4BE9 = _0x4BE9["substring"](0, lastIndex) + _0x7169 + _0x4BE9["substring"](lastIndex)
      }
      ;$("#source")["val"](_0x4BE9);
      doLog();
      src_change()
  }
}
function switchJiTaChord(_0x7A01) {
  $(".left-hide-content[mkey]")["hide"]();
  $(".left-hide-content[mkey=\'" + _0x7A01 + "\']")["show"]();
  switchHx(_0x7A01)
}
function swithchJianPu(_0x7A01) {
  var _0x7B19 = _0x7A01["replace"]("#", "")["replace"]("b", "");
  var _0x7AF1 = ["C,", "D,", "E,", "F,", "G,", "A,", "B,", "C", "D", "E", "F", "G", "A", "B", "c", "d", "e", "f", "g", "a", "b"];
  var _0x7AC9 = _0x7AF1["indexOf"](_0x7B19);
  if (_0x7AC9 > 10) {
      _0x7AC9 = _0x7AC9 - 7
  }
  ;$["each"]($(".spl-input div[type=\'spl\']"), function(_0x4C11, _0x62E1) {
      $(_0x62E1)["attr"]("value", _0x7AF1[_0x7AC9++]);
      $(_0x62E1)["html"](_0x4C11 + 1);
      $(_0x62E1)["attr"]("level", 0)
  })
}
function jianPuOperatorUp8(_0x6B79) {
  var _0x6BA1 = "";
  if (_0x6B79 > 0) {
      _0x6BA1 += "\'"
  } else {
      if (_0x6B79 < 0) {
          _0x6BA1 += ","
      }
  }
  ;$["each"]($(".spl-input div[num]"), function(_0x4C11, _0x62E1) {
      var _0x5071 = $(_0x62E1)["attr"]("value") + _0x6BA1;
      var _0x6BF1 = parseInt($(_0x62E1)["attr"]("level")) + _0x6B79;
      if (Math["abs"](_0x6BF1) > 2) {
          return
      }
      ;_0x5071 = _0x5071["replace"](",\'", "")["replace"]("\',", "");
      _0x5071 = _0x5071["replace"](/([cdefgab]),/, function(_0x6C19, _0x5841, _0x6C41) {
          console["log"](_0x6C19, _0x5841, _0x6C41);
          return _0x5841["toUpperCase"]()
      });
      _0x5071 = _0x5071["replace"](/([CDEFGAB])'/, function(_0x6C19, _0x5841, _0x6C41) {
          console["log"](_0x6C19, _0x5841, _0x6C41);
          return _0x5841["toLowerCase"]()
      });
      $(_0x62E1)["attr"]("value", _0x5071);
      $(_0x62E1)["attr"]("level", _0x6BF1);
      var _0x6BC9 = "";
      if (_0x6BF1 > 0) {
          _0x6BC9 = "<i class=\"dot-t-" + _0x6BF1 + "\"></i>"
      } else {
          if (_0x6BF1 < 0) {
              _0x6BC9 = "<i class=\"dot-b-" + Math["abs"](_0x6BF1) + "\"></i>"
          }
      }
      ;$(_0x62E1)["find"]("i")["remove"]();
      $(_0x62E1)["append"]($(_0x6BC9))
  })
}
function mergeNote() {
  var _0x6CE1 = $(".selected_text")["length"];
  if (_0x6CE1 == 2) {
      var _0x6D31 = $(".selected_text")[0];
      var _0x6C91 = $(".selected_text")[1];
      var _0x6D09 = parseInt($(_0x6D31)["attr"]("istart"));
      var _0x6C69 = parseInt($(_0x6C91)["attr"]("istart"));
      if (_0x6D09 > _0x6C69) {
          var _0x6601 = _0x6D09 + 0;
          _0x6D09 = _0x6C69 + 0;
          _0x6C69 = _0x6601
      }
      ;var _0x4BE9 = $("#source")["val"]();
      var _0x6D59 = syms[_0x6D09];
      var _0x6CB9 = syms[_0x6C69];
      var _0x55E9 = _0x4BE9["substring"](_0x6D59["iend"], _0x6CB9["istart"]);
      _0x55E9 = _0x55E9["replace"](/\s/g, "");
      _0x4BE9 = _0x4BE9["substring"](0, _0x6D59["iend"]) + _0x55E9 + _0x4BE9["substring"](_0x6CB9["istart"]);
      $("#source")["val"](_0x4BE9);
      doLog();
      src_change()
  } else {
      window["top"]["alert"]("\u8bf7\u9009\u62e92\u4e2a\u97f3\u7b26\u540e\u518d\u8fdb\u884c\u5408\u5e76\u64cd\u4f5c")
  }
}
var lastCoorStrLen = 0;
function setGchPos(_0x6E49) {
  var _0x5571 = $("#zsistart")["val"]();
  var _0x5661 = syms[_0x5571];
  if (_0x5661) {
      var _0x5891 = _0x5661["a_gch"];
      var _0x5071 = $("#gchText")["val"]();
      if (_0x5071 == "") {
          _0x5071 = $("#zsInput")["val"]()
      }
      ;var _0x5A49 = getGchInfo(_0x5661, _0x5071);
      if (_0x5A49 != null) {
          getGchCoorInfo(_0x5A49["text"]);
          lastCoorStrLen = $("#gchcoor")["val"]()["length"];
          var _0x5099 = $("#xoffset")["val"]();
          var _0x50C1 = $("#yoffset")["val"]();
          if (_0x5099 == "") {
              _0x5099 = 0
          }
          ;if (_0x50C1 == "") {
              _0x50C1 == 0
          }
          ;if (_0x6E49 == "left") {
              _0x5099--
          } else {
              if (_0x6E49 == "right") {
                  _0x5099++
              } else {
                  if (_0x6E49 == "up") {
                      _0x50C1++
                  } else {
                      if (_0x6E49 == "down") {
                          _0x50C1--
                      }
                  }
              }
          }
          ;$("#xoffset")["val"](_0x5099);
          $("#yoffset")["val"](_0x50C1);
          var _0x4BE9 = $("#source")["val"]();
          var _0x5A71 = ($("input[name=\'gchdirect\']:checked")["val"]() ? $("input[name=\'gchdirect\']:checked")["val"]() : "") + $("input[name=\'gchfonttype\']:checked")["val"]();
          if ($("#ZS_EDIT_div")["css"]("display") == "block") {
              _0x5A71 = $("input[name=\'zspos\']:checked")["val"]() + $("input[name=\'fonttype\']:checked")["val"]()
          }
          ;var _0x5A21 = $("#gchfontsize")["val"]();
          if (_0x5A21 != 14) {
              _0x5A71 += "[font-size:" + _0x5A21 + "]"
          }
          ;_0x5A71 += _0x5071;
          var _0x59F9 = genGchCoorStr();
          var _0x7191 = _0x59F9["length"];
          $("#zsistart")["val"](parseInt(_0x5571) + parseInt(_0x7191 - lastCoorStrLen));
          _0x5A71 += _0x59F9;
          _0x4BE9 = _0x4BE9["substring"](0, _0x5A49["istart"]) + "\"" + _0x5A71 + "\"" + _0x4BE9["substring"](_0x5A49["iend"]);
          $("#source")["val"](_0x4BE9);
          doLog();
          src_change(reselectGch)
      }
  }
}
function reselectGch() {
  var _0x5571 = $("#zsistart")["val"]();
  $("text[type=\'zs\'][istart=\'" + _0x5571 + "\']")["css"]("color", "red")["attr"]("selected", "selected")
}
function changeMusicSpace(_0x5521) {
  var _0x4BE9 = $("#source")["val"]();
  if (_0x4BE9["indexOf"]("%%musicspace") > -1) {
      _0x4BE9 = _0x4BE9["replace"](/%%musicspace.*/, "%%musicspace " + _0x5521)
  } else {
      _0x4BE9 = "%%musicspace " + _0x5521 + "\x0A" + _0x4BE9
  }
  ;$("#source")["val"](_0x4BE9);
  src_change()
}
function changeTitleSpace(_0x5521) {
  var _0x4BE9 = $("#source")["val"]();
  if (_0x4BE9["indexOf"]("%%titlespace") > -1) {
      _0x4BE9 = _0x4BE9["replace"](/%%titlespace.*/, "%%titlespace " + _0x5521)
  } else {
      _0x4BE9 = "%%titlespace " + _0x5521 + "\x0A" + _0x4BE9
  }
  ;$("#source")["val"](_0x4BE9);
  src_change()
}
function changeComposerSpace(_0x5521) {
  var _0x4BE9 = $("#source")["val"]();
  if (_0x4BE9["indexOf"]("%%composerspace") > -1) {
      _0x4BE9 = _0x4BE9["replace"](/%%composerspace.*/, "%%composerspace " + _0x5521)
  } else {
      _0x4BE9 = "%%composerspace " + _0x5521 + "\x0A" + _0x4BE9
  }
  ;$("#source")["val"](_0x4BE9);
  src_change()
}
function setDirName() {
  var _0x7169 = "files/abc/" + (new Date())["Format"]("yyyyMMdd");
  $("#dirname")["val"](_0x7169)
}
function uploadNotePic() {
  setDirName();
  ossUploadType = "noteImg";
  $("#postfiles")["click"]()
}
function uploadNotePicCallback(_0x7F01) {
  var _0x5EF9 = $(".selected_text");
  var _0x5571 = $(_0x5EF9)["attr"]("istart");
  if (_0x5571 && _0x5571 != -1) {
      var _0x5661 = syms[_0x5571];
      if (_0x5661) {
          lastSelectedNoteIstart = parseInt(_0x5571);
          var _0x4BE9 = $("#source")["val"]();
          var _0x5D41 = "";
          lastSelectedNoteIstart = lastSelectedNoteIstart + _0x7F01["length"];
          _0x5D41 = _0x4BE9["substring"](0, _0x5661["istart"]) + _0x7F01 + _0x4BE9["substring"](_0x5661["istart"]);
          $("#source")["val"](_0x5D41);
          src_change(reSelectNote);
          doLog()
      }
  }
}
function enabledInsertWord(_0x51D9) {
  user["clickAddText"] = false;
  if ($(_0x51D9)["hasClass"]("menu-pressed")) {
      $("#target")["css"]("cursor", "default");
      $(_0x51D9)["removeClass"]("menu-pressed");
      src_change()
  } else {
      if ($("#graphEditorMenuInsert")["hasClass"]("menu-pressed")) {
          switchPrachEditor()
      }
      ;if ($("#selectedStatus")["hasClass"]("menu-pressed")) {
          enabledEditor($("#selectedStatus")[0])
      }
      ;$(_0x51D9)["addClass"]("menu-pressed");
      $("#target")["css"]("cursor", "text");
      user["clickAddText"] = true
  }
}
function addEditorText(_0x4E41, _0x4DC9, _0x4DF1, _0x4E19, _0x4DA1) {
  var _0x4F31 = $("#target")["offset"]()["top"];
  var _0x4F09 = $("#target")["offset"]()["left"];
  var _0x4F59 = _0x4E41["target"];
  if (_0x4F59 == null) {
      return
  }
  ;if (_0x4F59["tagName"]["toLowerCase"]() != "svg") {
      var _0x4EE1 = $(_0x4F59)["parents"]("svg");
      _0x4F59 = _0x4EE1[_0x4EE1["length"] - 1]
  } else {
      _0x4F59 = $(_0x4F59);
      if (_0x4F59["length"] > 1) {
          return
      }
  }
  ;var _0x4E69 = document["createElement"]("div");
  $(_0x4E69)["css"]("z-index", 99999)["css"]("position", "absolute")["css"]("background-color", "white");
  $(_0x4E69)["attr"]("contenteditable", "true");
  $(_0x4E69)["addClass"]("editor-div");
  $(_0x4E69)["attr"]("type", "mytext");
  if (_0x4DC9) {
      $(_0x4E69)["text"](_0x4DC9)
  }
  ;var _0x4E91 = false;
  var _0x4EB9 = false;
  $(_0x4E69)["focus"](function(_0x4F81) {
      console["log"]("\u805a\u7126");
      _0x4E91 = true
  });
  $(_0x4E69)["blur"](function(_0x4F81) {
      console["log"]("\u5931\u7126", _0x4F81);
      _0x4E91 = false;
      var _0x4FA9 = this;
      setTimeout(function() {
          if (_0x4E91) {
              return
          }
          ;var _0x5071 = $(_0x4FA9)["html"]();
          var _0x5021 = null;
          var _0x5049 = /\<div(([\s\S])*?)\<\/div\>/g;
          var _0x4FD1 = [];
          var _0x4FF9 = 0;
          while (_0x5021 = _0x5049["exec"](_0x5071)) {
              if (_0x4FF9 == 0) {
                  if (_0x5021["index"] != 0) {
                      _0x4FD1["push"](_0x5071["substring"](0, _0x5021["index"]))
                  }
              }
              ;_0x4FD1["push"](_0x5021[1]["replaceAll"]("<br>", "")["replace"](">", "")["replace"](/\s/g, ""));
              _0x4FF9++
          }
          ;if (_0x4FF9 == 0) {
              _0x4FD1["push"](_0x5071["replace"](/\s/g, "")["replaceAll"]("<br>", ""))
          }
          ;while (_0x4FD1[_0x4FD1["length"] - 1] == "") {
              _0x4FD1["splice"](_0x4FD1["length"] - 1, 1)
          }
          ;console["log"](_0x4FD1);
          $(_0x4FA9)["remove"]();
          if (_0x4DA1) {
              updateMyTextInfo(null, null, _0x4DA1, _0x5071)
          } else {
              if (_0x5071 != "") {
                  var _0x5099 = parseInt((parseInt($(_0x4E69)["css"]("left")["replace"]("px", ""))) / scale);
                  var _0x50C1 = parseInt((parseInt($(_0x4E69)["css"]("top")["replace"]("px", "")) - ($(_0x4F59)["offset"]()["top"] - $(".right-top-content")["offset"]()["top"] + $(".right-top-content")["scrollTop"]()) + 15) / scale);
                  console["log"]("e.x", _0x5099, _0x50C1);
                  if (_0x4DA1) {
                      updateMyTextInfo(_0x5099, _0x50C1, _0x4DA1)
                  } else {
                      addText2SvgAndSource(_0x5099, _0x50C1, _0x4F59, _0x5071, new Date()["getTime"]())
                  }
              }
          }
      }, 50)
  });
  $(_0x4E69)["css"]({
      left: _0x4DF1 ? _0x4DF1 : _0x4E41["offsetX"] + 1,
      top: _0x4E19 ? _0x4E19 : _0x4E41["y"] - _0x4F31,
      "min-width": 40,
      "min-height": 30
  });
  $("#target")["append"]($(_0x4E69));
  $(_0x4E69)["focus"]();
  showProperties("text", _0x4E41)
}
var dragMyText = false;
var hasDragMyText = false;
var myTextMouseDownTime = 0;
function addText2Svg(_0x5099, _0x50C1, _0x4F59, _0x5201, _0x5161) {
  var _0x4BE9 = $("#source")["val"]();
  var _0x51D9 = new Object();
  _0x51D9["text"] = _0x5201;
  _0x51D9["fontsize"] = 14;
  _0x51D9["svgIndex"] = $(_0x4F59)["attr"]("index");
  var _0x51B1 = "http://www.w3.org/2000/svg";
  var _0x5189 = document["createElementNS"](_0x51B1, "text");
  _0x5189["setAttribute"]("id", _0x5161);
  _0x51D9["id"] = _0x5161;
  _0x5189["setAttribute"]("x", _0x5099);
  _0x5189["setAttribute"]("type", "mytext");
  _0x51D9["x"] = _0x5099;
  _0x5189["setAttribute"]("y", _0x50C1 + 15);
  _0x51D9["y"] = _0x50C1;
  $(_0x5189)["css"]("font-size", "14px");
  _0x5189["addEventListener"]("mousedown", function(_0x4F81) {
      if (user["mode"] == "editor") {
          myTextMouseDownTime = new Date()["getTime"]();
          dragMyText = true;
          $("text[type=\'mytext\']")["removeClass"]("selected_text");
          $(this)["addClass"]("selected_text");
          _0x4F81["preventDefault"]();
          _0x4F81["stopPropagation"]();
          return false
      }
  });
  _0x5189["addEventListener"]("mousemove", function(_0x4F81) {
      if (user["mode"] == "editor") {
          if (dragMyText) {
              var _0x5279 = $(_0x4F81["target"])["parents"]("g")[0];
              var _0x52A1 = $(_0x5279)["attr"]("transform");
              var _0x5251 = getTransformsTranslate(_0x52A1);
              if (_0x5251 == null) {
                  _0x5251 = new Object();
                  _0x5251["x"] = 0;
                  _0x5251["y"] = 0
              }
              ;$(event["target"])["attr"]("x", _0x4F81["offsetX"] / scale - ($(_0x4F81["target"])[0]["getBBox"]()["width"] / 2));
              $(event["target"])["attr"]("y", _0x4F81["offsetY"] / scale - _0x5251["y"] + 5)
          }
          ;_0x4F81["preventDefault"]();
          _0x4F81["stopPropagation"]();
          return false
      }
  });
  _0x5189["addEventListener"]("mouseup", function(_0x4F81) {
      if (user["mode"] == "editor") {
          var _0x52C9 = new Date()["getTime"]();
          if ((_0x52C9 - myTextMouseDownTime) < 200) {
              return
          }
          ;dragMyText = false;
          var _0x4EE1 = $(this)["parents"]("svg");
          var _0x4F59 = _0x4EE1[_0x4EE1["length"] - 1];
          var _0x5099 = parseInt((parseInt($(this)["attr"]("x"))));
          var _0x50C1 = parseInt((parseInt($(this)["attr"]("y"))) - 15);
          console["log"]("e.x", _0x5099, _0x50C1);
          updateMyTextInfo(_0x5099, _0x50C1, $(this)["attr"]("id"));
          _0x4F81["preventDefault"]();
          _0x4F81["stopPropagation"]();
          return false
      }
  });
  _0x5189["addEventListener"]("dblclick", function(_0x4F81) {
      addEditorText(_0x4F81, $(_0x5189)["text"](), parseInt($(_0x5189)["attr"]("x")) * scale, parseInt($(_0x5189)["attr"]("y")) * scale - 15, $(_0x5189)["attr"]("id"))
  });
  var _0x5229 = document["createTextNode"](_0x5201);
  _0x5189["appendChild"](_0x5229);
  $(_0x4F59)["children"]("g")["append"](_0x5189);
  return _0x51D9
}
function delMyTextInfo(_0x5161) {
  var _0x4BE9 = $("#source")["val"]();
  var _0x5049 = new RegExp(".*\"id\":" + _0x5161 + ".*");
  var _0x4D29 = _0x5049["exec"](_0x4BE9);
  if (_0x4D29 != null) {
      console["log"](_0x4D29[0]);
      var _0x59A9 = _0x4D29[0];
      _0x4BE9 = _0x4BE9["replace"](_0x59A9, "");
      _0x4BE9 = replaceBlankLine(_0x4BE9);
      $("#source")["val"](_0x4BE9);
      doLog();
      src_change()
  }
}
function updateMyTextInfo(_0x5099, _0x50C1, _0x5161, _0x5071) {
  var _0x4BE9 = $("#source")["val"]();
  var _0x5049 = new RegExp(".*\"id\":" + _0x5161 + ".*");
  var _0x4D29 = _0x5049["exec"](_0x4BE9);
  if (_0x4D29 != null) {
      console["log"](_0x4D29[0]);
      var _0x59A9 = _0x4D29[0];
      var _0x51D9 = JSON["parse"](_0x59A9);
      if (_0x5099) {
          _0x51D9["x"] = _0x5099
      }
      ;if (_0x50C1) {
          _0x51D9["y"] = _0x50C1
      }
      ;if (_0x5071) {
          _0x51D9["text"] = _0x5071
      }
      ;var _0x7731 = JSON["stringify"](_0x51D9);
      _0x4BE9 = _0x4BE9["replace"](_0x59A9, _0x7731);
      _0x4BE9 = replaceBlankLine(_0x4BE9);
      $("#source")["val"](_0x4BE9);
      doLog();
      src_change()
  }
}
function addText2SvgAndSource(_0x5099, _0x50C1, _0x4F59, _0x5201, _0x5161) {
  var _0x52F1 = addText2Svg(_0x5099, _0x50C1, _0x4F59, _0x5201, _0x5161);
  setMyText(JSON["stringify"](_0x52F1))
}
function setMyText(_0x59A9) {
  var _0x4BE9 = $("#source")["val"]();
  var _0x5049 = /%%beginmytext([\n\r\s\S]*)%%endmytext/;
  var _0x5E59 = _0x4BE9["match"](_0x5049);
  var _0x7399 = "%%beginmytext";
  if (_0x5E59 != null) {
      _0x7399 += _0x5E59[1] + _0x59A9;
      _0x7399 += "\x0A%%endmytext";
      _0x4BE9 = _0x4BE9["replace"](_0x5E59[0], _0x7399)
  } else {
      _0x7399 += "\x0A" + _0x59A9;
      _0x7399 += "\x0A%%endmytext\x0A";
      _0x4BE9 = _0x7399 + _0x4BE9
  }
  ;$("#source")["val"](_0x4BE9)
}
function changeSlyric() {
  var _0x4BE9 = $("#source")["val"]();
  var _0x5201 = $("#lyricText")["val"]();
  var _0x5B61 = $("#lyricTextUp")["val"]();
  var _0x5B11 = $("#lyricTextDown")["val"]();
  var _0x5AE9 = $("#lyricBgColor")["val"]();
  var _0x5AC1 = $("input[name=\'lyricAlign\']:checked")["val"]();
  var _0x59A9 = "";
  if (_0x5AC1 == "right") {
      _0x59A9 += "[R]"
  }
  ;_0x59A9 += _0x5201;
  if (_0x5B11 != "") {
      _0x59A9 += "[_" + _0x5B11 + "]"
  }
  ;if (_0x5B61 != "") {
      _0x59A9 += "[^" + _0x5B61 + "]"
  }
  ;var _0x5909 = $("#editorLyricIstart")["val"]();
  var _0x5B39 = $("#editorLyricIend")["val"]();
  _0x4BE9 = _0x4BE9["substring"](0, _0x5909) + _0x5AE9 + _0x59A9 + _0x4BE9["substring"](_0x5B39);
  $("#source")["val"](_0x4BE9);
  doLog();
  src_change(function() {
      var _0x5661 = syms[_0x5909];
      $("text[type=\'lyric\'][lyric_istart=\'" + _0x5909 + "\']")["css"]("color", "red");
      $("#editorLyricIend")["val"](_0x5661["iend"])
  })
}
function switchLyricAlign(_0x5AC1) {
  var _0x7A29 = "";
  if (_0x5AC1 == "right") {
      _0x7A29 = "[R]"
  } else {
      if (_0x5AC1 == "left") {
          _0x7A29 = "[L]"
      }
  }
  ;var _0x4BE9 = $("#source")["val"]();
  var _0x5909 = $("#editorLyricIstart")["val"]();
  var _0x5B39 = $("#editorLyricIend")["val"]();
  var _0x5931 = _0x4BE9["substring"](_0x5909, _0x5B39);
  _0x5931 = _0x5931["replace"]("[R]", "")["replace"]("[L]", "");
  _0x4BE9 = _0x4BE9["substring"](0, _0x5909) + _0x7A29 + _0x5931 + _0x4BE9["substring"](_0x5B39);
  $("#source")["val"](_0x4BE9);
  doLog();
  src_change(function() {
      var _0x5661 = syms[_0x5909];
      $("text[type=\'lyric\'][lyric_istart=\'" + _0x5909 + "\']")["css"]("color", "red");
      $("#editorLyricIend")["val"](_0x5661["iend"])
  })
}
function setLyricBgColor() {
  var _0x6FD9 = $("#lyricBgColorInput")["val"]();
  if (_0x6FD9["indexOf"]("#") < 0) {
      _0x6FD9 = "#" + _0x6FD9
  }
  ;_0x6FD9 = colorRGB(_0x6FD9);
  var _0x64C1 = lyricBgArray["length"];
  var _0x5CC9 = $("text[type=\'lyric\'][selected=\'selected\'],text[type=\'lyric\'].selected_text");
  var _0x4BE9 = $("#source")["val"]();
  var _0x5D19 = 0;
  var _0x5C29 = 0;
  var _0x5CF1 = 0;
  var _0x5049 = /\[[se]\.lb\.[^\]]*\]/;
  var _0x71B9 = /\[[se]\.lb\.([0-9]{1,})\..*\]/;
  if (lyricBgArray["length"] > 0) {
      for (var _0x4C11 = 0; _0x4C11 < lyricBgArray["length"]; _0x4C11++) {
          var _0x7259 = lyricBgArray[_0x4C11];
          var _0x7281 = parseInt(_0x7259["seq"]);
          if (_0x7281 >= _0x64C1) {
              _0x64C1 = _0x7281 + 1
          }
      }
  }
  ;if (_0x5CC9["length"] == 1) {
      _0x5D19 = $(_0x5CC9)["attr"]("lyric_istart");
      var _0x59A9 = "[s.lb." + _0x64C1 + "." + _0x6FD9 + "]";
      _0x5CF1 = _0x59A9["length"];
      var _0x5661 = syms[_0x5D19];
      var _0x5931 = _0x4BE9["substring"](_0x5661["istart"], _0x5661["iend"]);
      if (_0x5931["indexOf"]("[s.lb.") == 0) {}
      ;var _0x7321 = _0x4BE9["substring"](_0x5D19);
      if (_0x5049["test"](_0x5931)) {
          _0x7321 = _0x7321["replace"](_0x5049, "");
          _0x5CF1 -= _0x5049["exec"](_0x5931)[0]["length"];
          var _0x5CA1 = _0x71B9["exec"](_0x5931)[1];
          _0x59A9 = "[s.lb." + _0x5CA1 + "." + _0x6FD9 + "]"
      }
      ;_0x4BE9 = _0x4BE9["substring"](0, _0x5D19) + _0x59A9 + _0x7321
  } else {
      if (_0x5CC9["length"] == 2) {
          var _0x72F9 = "[s.lb." + _0x64C1 + "." + _0x6FD9 + "]";
          var _0x71E1 = "[e.lb." + _0x64C1 + "." + _0x6FD9 + "]";
          _0x5D19 = parseInt($(_0x5CC9[0])["attr"]("lyric_istart"));
          _0x5C29 = parseInt($(_0x5CC9[1])["attr"]("lyric_istart"));
          if (_0x5D19 > _0x5C29) {
              var _0x7349 = _0x5D19 - 0;
              _0x5D19 = _0x5C29 - 0;
              _0x5C29 = _0x7349
          }
          ;_0x5CF1 += _0x72F9["length"];
          var _0x72D1 = syms[_0x5D19];
          var _0x7231 = syms[_0x5C29];
          var _0x72A9 = _0x4BE9["substring"](_0x72D1["istart"], _0x72D1["iend"]);
          var _0x7209 = _0x4BE9["substring"](_0x7231["istart"], _0x7231["iend"]);
          var _0x55E9 = _0x4BE9["substring"](_0x5D19, _0x5C29);
          var _0x7321 = _0x4BE9["substring"](_0x5C29);
          if (_0x5049["test"](_0x72A9)) {
              _0x55E9 = _0x55E9["replace"](_0x5049, "");
              _0x5CF1 -= _0x5049["exec"](_0x72A9)[0]["length"];
              var _0x5CA1 = _0x71B9["exec"](_0x72A9)[1];
              _0x72F9 = "[s.lb." + _0x5CA1 + "." + _0x6FD9 + "]"
          }
          ;if (_0x5049["test"](_0x7209)) {
              _0x7321 = _0x7321["replace"](_0x5049, "");
              var _0x5CA1 = _0x71B9["exec"](_0x7209)[1];
              _0x71E1 = "[e.lb." + _0x5CA1 + "." + _0x6FD9 + "]"
          }
          ;_0x4BE9 = _0x4BE9["substring"](0, _0x5D19) + _0x72F9 + _0x55E9 + _0x71E1 + _0x7321
      }
  }
  ;$("#source")["val"](_0x4BE9);
  doLog();
  src_change(function() {
      $("text[type=\'lyric\'][lyric_istart=\'" + _0x5D19 + "\']")["css"]("color", "red")["attr"]("selected", "selected");
      if (_0x5C29 != 0) {
          _0x5C29 = _0x5C29 + _0x5CF1;
          $("text[type=\'lyric\'][lyric_istart=\'" + _0x5C29 + "\']")["css"]("color", "red")["attr"]("selected", "selected")
      }
  })
}
function clearLyricBgColor() {
  var _0x4BE9 = $("#source")["val"]();
  var _0x5D19 = 0;
  var _0x5C29 = 0;
  var _0x5CF1 = 0;
  var _0x5CC9 = $("text[type=\'lyric\'][selected=\'selected\']");
  var _0x5049 = /\[[se]\.lb\.([0-9]{1,})\..[^\[]*\]/;
  if (_0x5CC9["length"] > 0) {
      _0x5D19 = $(_0x5CC9)["attr"]("lyric_istart");
      var _0x5661 = syms[_0x5D19];
      var _0x5C51 = _0x4BE9["substring"](_0x5661["istart"], _0x5661["iend"]);
      if (_0x5049["test"](_0x5C51)) {
          var _0x5CA1 = _0x5049["exec"](_0x5C51)[1];
          var _0x5C79 = new RegExp("\\[[se]\\.lb\\." + _0x5CA1 + "\\..[^\\[]*\\]","g");
          _0x4BE9 = _0x4BE9["replace"](_0x5C79, "")
      }
  }
  ;$("#source")["val"](_0x4BE9);
  doLog();
  src_change(function() {
      $("text[type=\'lyric\'][lyric_istart=\'" + _0x5D19 + "\']")["css"]("color", "red")["attr"]("selected", "selected");
      if (_0x5C29 != 0) {
          _0x5C29 = _0x5C29 + _0x5CF1;
          $("text[type=\'lyric\'][lyric_istart=\'" + _0x5C29 + "\']")["css"]("color", "red")["attr"]("selected", "selected")
      }
  })
}
function setSingleLyricColor() {
  var _0x6FD9 = $("#singleLyricColorInput")["val"]();
  if (_0x6FD9["indexOf"]("#") < 0) {
      _0x6FD9 = "#" + _0x6FD9
  }
  ;_0x6FD9 = colorRGB(_0x6FD9);
  var _0x5CC9 = $("text[type=\'lyric\'][selected=\'selected\'],text[type=\'lyric\'].selected_text");
  var _0x4BE9 = $("#source")["val"]();
  if (_0x5CC9["length"] > 0) {
      var _0x5D41 = "";
      var _0x5599 = 0;
      for (var _0x4C11 = 0; _0x4C11 < _0x5CC9["length"]; _0x4C11++) {
          var _0x5D19 = $(_0x5CC9[_0x4C11])["attr"]("lyric_istart");
          var _0x5661 = syms[_0x5D19];
          if (_0x5661) {
              var _0x5C51 = _0x4BE9["substring"](_0x5661["istart"], _0x5661["iend"]);
              if (lyricColorReg["test"](_0x5C51)) {
                  _0x5C51 = _0x5C51["replace"](lyricColorReg, "")
              }
              ;_0x5C51 = "[" + _0x6FD9 + "]" + _0x5C51;
              _0x5D41 += _0x4BE9["substring"](_0x5599, _0x5661["istart"]) + _0x5C51;
              _0x5599 = _0x5661["iend"]
          }
      }
      ;if (_0x5D41 != "") {
          _0x5D41 += _0x4BE9["substring"](_0x5599);
          $("#source")["val"](_0x5D41);
          doLog();
          src_change(function() {
              for (var _0x4C11 = 0; _0x4C11 < _0x5CC9["length"]; _0x4C11++) {
                  var _0x5D19 = $(_0x5CC9[_0x4C11])["attr"]("lyric_istart");
                  $("text[type=\'lyric\'][lyric_istart=\'" + _0x5D19 + "\']")["css"]("color", _0x6FD9)["attr"]("selected", "selected")
              }
          })
      }
  }
}
function clearSingleLyricColor() {
  var _0x4BE9 = $("#source")["val"]();
  var _0x5CC9 = $("text[type=\'lyric\'][selected=\'selected\']");
  var _0x5049 = /\[[se]\.lb\.([0-9]{1,})\..[^\[]*\]/;
  if (_0x5CC9["length"] > 0) {
      var _0x5D41 = "";
      var _0x5599 = 0;
      for (var _0x4C11 = 0; _0x4C11 < _0x5CC9["length"]; _0x4C11++) {
          var _0x5D19 = $(_0x5CC9[_0x4C11])["attr"]("lyric_istart");
          var _0x5661 = syms[_0x5D19];
          if (_0x5661) {
              var _0x5C51 = _0x4BE9["substring"](_0x5661["istart"], _0x5661["iend"]);
              if (lyricColorReg["test"](_0x5C51)) {
                  _0x5C51 = _0x5C51["replace"](lyricColorReg, "")
              }
              ;_0x5D41 += _0x4BE9["substring"](_0x5599, _0x5661["istart"]) + _0x5C51;
              _0x5599 = _0x5661["iend"]
          }
      }
      ;if (_0x5D41 != "") {
          _0x5D41 += _0x4BE9["substring"](_0x5599);
          $("#source")["val"](_0x5D41);
          doLog();
          src_change(function() {})
      }
  }
}
function delVoice() {
  var _0x57F1 = $("svg[type=\'rectbar\'],svg[type=\'rectnode\']");
  var _0x4BE9 = $("#source")["val"]();
  if (_0x57F1["length"] > 0) {
      var _0x5161 = $(_0x57F1[0])["attr"]("id");
      var _0x5E09 = _0x5161["replace"]("mysvgbar", "")["replace"]("mysvgnode", "");
      var _0x5E31 = parseInt(_0x5E09["split"]("_")[0]);
      var _0x4CB1 = getLinesInfo(_0x4BE9);
      var _0x5D41 = "";
      for (var _0x4C11 = 0; _0x4C11 < _0x4CB1["length"]; _0x4C11++) {
          var _0x4C89 = _0x4CB1[_0x4C11];
          var _0x4CD9 = _0x4C89["lineStr"];
          if (_0x4C89["v"] == _0x5E31) {
              continue
          } else {
              if (_0x4C89["type"] == "v" && _0x4C89["vNum"] == _0x5E31) {
                  continue
              } else {
                  if (_0x4C89["type"] == "score") {
                      var _0x5049 = new RegExp((parseInt(_0x5E31) + 1) + ".[^\\d]*");
                      _0x4CD9 = _0x4CD9["replace"](_0x5049, "")
                  }
              }
          }
          ;_0x5D41 += _0x4CD9 + "\x0A"
      }
      ;$("#source")["val"](_0x5D41);
      doLog();
      src_change()
  }
}
function changeNodeLineType(_0x51D9) {
  var _0x5571 = $("rect[selected=\'selected\']")["attr"]("istart");
  var _0x5661 = syms[_0x5571];
  if (_0x5661) {
      var _0x4BE9 = $("#source")["val"]();
      if (_0x5661["bar_dotted"]) {
          _0x4BE9 = _0x4BE9["substring"](0, _0x5661["istart"] - 1) + $(_0x51D9)["val"]() + _0x4BE9["substring"](_0x5661["iend"])
      } else {
          _0x4BE9 = _0x4BE9["substring"](0, _0x5661["istart"]) + $(_0x51D9)["val"]() + _0x4BE9["substring"](_0x5661["iend"])
      }
      ;$("#source")["val"](_0x4BE9);
      doLog();
      src_change()
  }
}
function changeStaffMargin(_0x5BB1, _0x5BD9) {
  var _0x4BE9 = $("#source")["val"]();
  if (_0x5BB1 != "") {
      if (_0x4BE9["indexOf"]("%%leftmargin") > -1) {
          _0x4BE9 = _0x4BE9["replace"](/%%leftmargin.*/, "%%leftmargin " + _0x5BB1)
      } else {
          _0x4BE9 = "%%leftmargin " + _0x5BB1 + "\x0A" + _0x4BE9
      }
  }
  ;if (_0x5BD9 != "") {
      if (_0x4BE9["indexOf"]("%%rightmargin") > -1) {
          _0x4BE9 = _0x4BE9["replace"](/%%rightmargin.*/, "%%rightmargin " + _0x5BD9)
      } else {
          _0x4BE9 = "%%rightmargin " + _0x5BD9 + "\x0A" + _0x4BE9
      }
  }
  ;$("#source")["val"](_0x4BE9);
  doLog();
  src_change()
}
function changeStaffBotMargin(_0x5B89) {
  var _0x4BE9 = $("#source")["val"]();
  if (_0x5B89 != "") {
      if (_0x4BE9["indexOf"]("%%botmargin") > -1) {
          _0x4BE9 = _0x4BE9["replace"](/%%botmargin.*/, "%%botmargin " + _0x5B89)
      } else {
          _0x4BE9 = "%%botmargin " + _0x5B89 + "\x0A" + _0x4BE9
      }
  }
  ;$("#source")["val"](_0x4BE9);
  doLog();
  src_change()
}
function addLineBreak(_0x4BE9) {
  if (_0x4BE9["indexOf"]("%%linebreak") > -1) {
      return _0x4BE9
  }
  ;var _0x4CB1 = getNodesInfo(_0x4BE9);
  var _0x4D51 = "";
  for (var _0x4C11 = 0; _0x4C11 < _0x4CB1["length"]; _0x4C11++) {
      var _0x5111 = _0x4CB1[_0x4C11];
      var _0x4CD9 = _0x5111["lineStr"];
      if (_0x5111["type"] == "note") {
          var _0x5139 = _0x5111["nodes"];
          var _0x4D01 = "";
          var _0x50E9 = -1;
          for (var _0x4C39 = 0; _0x4C39 < _0x5139["length"]; _0x4C39++) {
              var _0x4D29 = _0x5139[_0x4C39];
              _0x4D01 += _0x4D29["nodeStr"];
              _0x50E9 = _0x4D29["endSeq"]
          }
          ;_0x4D51 += _0x4D01 + "$" + _0x4BE9["substring"](_0x50E9, _0x5111["endSeq"])
      } else {
          _0x4D51 += _0x5111["lineStr"] + "\x0A"
      }
  }
  ;_0x4D51 = "%%linebreak $\x0A" + _0x4D51;
  _0x4D51 = replaceBlankLine(_0x4D51);
  return _0x4D51
}
function switchSplNoteCenter(_0x5AC1) {
  var _0x4B99 = $("#nodeMenu")["attr"]("barIndex");
  if (!_0x4B99) {
      return
  }
  ;_0x4B99 = parseInt(_0x4B99);
  var _0x4BE9 = $("#source")["val"]();
  _0x4BE9 = _0x4BE9["replace"](/%%barsperstaff.*\n/, "");
  var _0x4CB1 = getNodesInfo(_0x4BE9);
  var _0x4D51 = "";
  for (var _0x4C11 = 0, _0x4C61 = _0x4CB1["length"]; _0x4C11 < _0x4C61; _0x4C11++) {
      var _0x4C89 = _0x4CB1[_0x4C11];
      var _0x4CD9 = _0x4C89["lineStr"];
      var _0x4D01 = "";
      if (_0x4C89["type"] == "note") {
          for (var _0x4C39 = 0; _0x4C39 < _0x4C89["nodes"]["length"]; _0x4C39++) {
              var _0x4D29 = _0x4C89["nodes"][_0x4C39];
              if (_0x4D29["nodeIndex"] == _0x4B99) {
                  _0x4D01 += "[I:pos spl " + _0x5AC1 + "]" + _0x4D29["nodeStr"]["replace"]("[I:pos spl auto]", "")["replace"]("[I:pos spl center]", "")
              } else {
                  _0x4D01 += _0x4D29["nodeStr"]
              }
              ;lastNodeEndSeq = _0x4D29["endSeq"]
          }
          ;_0x4D01 += _0x4BE9["substring"](lastNodeEndSeq, _0x4C89["endSeq"]);
          _0x4D51 += _0x4D01 + "\x0A"
      } else {
          _0x4D51 += _0x4C89["lineStr"] + "\x0A"
      }
  }
  ;_0x4D51 = replaceBlankLine(_0x4D51);
  $("#source")["val"](_0x4D51);
  doLog();
  src_change()
}
function splitVoice() {
  var _0x4B99 = $("#nodeMenu")["attr"]("barIndex");
  if (!_0x4B99) {
      return
  }
  ;_0x4B99 = parseInt(_0x4B99);
  var _0x4BE9 = $("#source")["val"]();
  _0x4BE9 = _0x4BE9["replace"](/%%barsperstaff.*\n/, "");
  var _0x4CB1 = getNodesInfo(_0x4BE9);
  var _0x4D51 = "";
  var _0x4D79 = getSelectedBarInfo(_0x4B99, 0);
  console["log"](_0x4D79);
  var _0x5779 = _0x4D79["nodeStr"];
  if (_0x5779["indexOf"]("(&") > -1) {}
}
function showInstruSelector(_0x6881) {
  setTimeout(function() {
      $(".menu-pulldown-box")["show"]()
  }, 100);
  _0x6881["preventDefault"]();
  return false
}
function setVoiceInstrument(_0x66F1, _0x6769) {
  var _0x4BE9 = $("#source")["val"]();
  var _0x7669 = new RegExp("V:s*" + _0x66F1 + ".*\x0A%%MIDI program(.*)");
  var _0x77F9 = new RegExp("V:s*" + _0x66F1 + ".*\x0A%%MIDI program");
  var _0x4D29 = _0x7669["exec"](_0x4BE9);
  var _0x7759 = _0x77F9["exec"](_0x4BE9);
  if (_0x4D29) {
      var _0x5E81 = _0x4D29[0];
      var _0x77A9 = _0x4D29[1]["replace"](/\s/g, "");
      var _0x7709 = _0x7759[0] + " " + _0x6769;
      _0x4BE9 = _0x4BE9["replace"](_0x5E81, _0x7709);
      $("#source")["val"](_0x4BE9);
      doLog();
      src_change()
  } else {
      var _0x7821 = new RegExp("V:s*" + _0x66F1 + ".*");
      var _0x7781 = _0x7821["exec"](_0x4BE9);
      if (_0x7781) {
          var _0x77D1 = _0x7781[0];
          var _0x7731 = _0x77D1 + "\x0A%%MIDI program " + _0x6769;
          _0x4BE9 = _0x4BE9["replace"](_0x77D1, _0x7731);
          $("#source")["val"](_0x4BE9);
          doLog();
          src_change()
      }
  }
}
function splitNode(_0x6881) {
  var _0x76E1 = $("svg[type=\'rectnode\']");
  if (_0x76E1["length"] > 0) {
      var _0x7911 = "z";
      var _0x78C1 = null;
      for (var _0x5571 in syms) {
          var _0x5661 = syms[_0x5571];
          if (_0x5661["type"] == 8 || _0x5661["type"] == 10) {
              var _0x78E9 = _0x5661["my_wmeasure"] / _0x5661["my_ulen"];
              _0x7911 += _0x78E9;
              break
          }
      }
      ;var _0x5161 = $(_0x76E1)["attr"]("id");
      var _0x6601 = _0x5161["replace"]("mysvgnode", "")["replace"]("mysvgbar", "");
      var _0x76B9, _0x66F1;
      if (_0x6601["indexOf"]("_") > -1) {
          _0x76B9 = parseInt(_0x6601["split"]("_")[1]);
          _0x66F1 = parseInt(_0x6601["split"]("_")[0])
      } else {
          _0x76B9 = parseInt(_0x6601);
          _0x66F1 = -1
      }
      ;var _0x4D79 = getSelectedBarInfo(_0x76B9, _0x66F1);
      console["log"](_0x4D79);
      var _0x7939 = _0x4D79["nodeStr"]["replace"](_0x4D79["barLineStr"], "");
      var _0x5D41 = "(&" + _0x7939 + " & " + _0x7911 + "&)" + _0x4D79["barLineStr"];
      var _0x4BE9 = $("#source")["val"]();
      _0x4BE9 = _0x4BE9["substring"](0, _0x4D79["startSeq"]) + _0x5D41 + _0x4BE9["substring"](_0x4D79["endSeq"]);
      $("#source")["val"](_0x4BE9);
      doLog();
      src_change()
  }
}
function changeFermatatime(_0x5071) {
  var _0x5689 = $("text[type=\'hld\'][selected=\'selected\'],text.selected_text[type=\'hld\']");
  if (_0x5689["length"] > 0) {
      var _0x5571 = $(_0x5689)["attr"]("istart");
      var _0x4BE9 = $("#source")["val"]();
      var _0x5661 = syms[_0x5571];
      var _0x5639 = _0x5661["prev"];
      var _0x5611 = _0x4BE9["substring"](0, _0x5661["istart"]);
      var _0x56B1 = _0x4BE9["substring"](_0x5661["istart"]);
      var _0x5201 = getGch(_0x5661, "fermata");
      if (_0x5661["fermatatime"]) {
          var _0x5049 = /\"fermatatime:[^\"]*\"/g;
          var _0x4D29;
          var _0x5599 = -1;
          var _0x55C1 = "";
          while (_0x4D29 = _0x5049["exec"](_0x5611)) {
              _0x5599 = _0x4D29["index"];
              _0x55C1 = _0x4D29[0]
          }
          ;var _0x5549 = "\"fermatatime:" + _0x5071 + "\"";
          _0x4BE9 = _0x4BE9["substring"](0, _0x5599) + _0x4BE9["substring"](_0x5599)["replace"](_0x55C1, _0x5549);
          _0x5661["istart"] += _0x5549["length"] - _0x55C1["length"]
      } else {
          var _0x55E9 = "\"fermatatime:" + _0x5071 + "\"";
          _0x4BE9 = _0x4BE9["substring"](0, _0x5661["istart"]) + _0x55E9 + _0x4BE9["substring"](_0x5661["istart"]);
          _0x5661["istart"] += _0x55E9["length"]
      }
      ;_0x5661["fermatatime"] = _0x5071;
      $("#source")["val"](_0x4BE9);
      doLog();
      src_change(function() {
          $("text[type=\'hld\'][istart=\'" + _0x5661["istart"] + "\']")["attr"]("selected", "selected")["addClass"]("selected_text")
      })
  }
}
function setStaffNameHandle() {
  var _0x76E1 = $("svg[type=\'rectnode\']");
  if (_0x76E1["length"] > 0) {
      var _0x5161 = $(_0x76E1)["attr"]("id");
      var _0x6601 = _0x5161["replace"]("mysvgnode", "")["replace"]("mysvgbar", "");
      var _0x76B9, _0x66F1;
      if (_0x6601["indexOf"]("_") > -1) {
          _0x76B9 = parseInt(_0x6601["split"]("_")[1]);
          _0x66F1 = parseInt(_0x6601["split"]("_")[0])
      } else {
          _0x76B9 = parseInt(_0x6601);
          _0x66F1 = -1
      }
      ;setStaffName(parseInt(_0x66F1) + 1, "\u58f0\u90e8\u540d\u79f0", "\u58f0\u90e8\u526f\u540d\u79f0")
  }
}
function setStaffName(_0x66F1, _0x6561, _0x6589) {
  var _0x7669 = new RegExp("V:\\s*" + _0x66F1 + ".*");
  var _0x4BE9 = $("#source")["val"]();
  var _0x4D29 = _0x7669["exec"](_0x4BE9);
  console["log"](_0x4D29);
  if (_0x4D29 != null) {
      var _0x7691 = _0x4D29[0];
      var _0x75A1 = new RegExp("nm=\\\"(.[^\"]*)\\\"");
      var _0x7619 = new RegExp("snm=\\\"(.[^\"]*)\\\"");
      var _0x7579 = _0x75A1["exec"](_0x7691);
      if (_0x7579 != null) {
          var _0x75C9 = "nm=\"" + _0x7579[1] + "\"";
          _0x7691 = _0x7691["replace"](_0x75C9, "nm=\"" + _0x6561 + "\"")
      } else {
          _0x7691 += " nm=\"" + _0x6561 + "\""
      }
      ;var _0x75F1 = _0x7619["exec"](_0x7691);
      if (_0x75F1 != null) {
          var _0x7641 = "snm=\"" + _0x75F1[1] + "\"";
          _0x7691 = _0x7691["replace"](_0x7641, "snm=\"" + _0x6589 + "\"")
      } else {
          _0x7691 += " snm=\"" + _0x6589 + "\""
      }
      ;console["log"](_0x7691);
      _0x4BE9 = _0x4BE9["replace"](_0x7669, _0x7691);
      $("#source")["val"](_0x4BE9);
      doLog();
      src_change()
  } else {
      var _0x7691 = "V:" + _0x66F1 + " nm=\"" + _0x6561 + "\" snm=\"" + _0x6589 + "\"";
      var _0x4CB1 = getLinesInfo(_0x4BE9);
      var _0x4D51 = "";
      var _0x53E1 = 0;
      for (var _0x4C11 = 0; _0x4C11 < _0x4CB1["length"]; _0x4C11++) {
          var _0x5111 = _0x4CB1[_0x4C11];
          if (_0x5111["type"] == "note") {
              if (_0x53E1 == 0) {
                  _0x4D51 += _0x7691 + "\x0A"
              }
              ;_0x53E1++
          }
          ;_0x4D51 += _0x5111 + "\x0A"
      }
      ;$("#source")["val"](_0x4D51);
      doLog();
      src_change()
  }
}
function setNoteJpText() {
  var _0x7461 = $(".selected_text");
  if (_0x7461["length"] == 0) {
      return
  }
  ;var _0x5201 = $("#noteJpText")["val"]();
  if (_0x5201 == "") {
      var _0x5571 = $(_0x7461)["attr"]("istart");
      var _0x5661 = syms[_0x5571];
      var _0x7411 = getGch(_0x5661, "jptext:");
      if (_0x7411 != "") {
          var _0x4BE9 = $("#source")["val"]();
          _0x4BE9 = replaceLast(_0x4BE9["substring"](0, _0x5571), "\"" + _0x7411 + "\"", "") + _0x4BE9["substring"](_0x5571);
          $("#source")["val"](_0x4BE9);
          doLog();
          src_change();
          showProperties("staff")
      }
      ;return
  }
  ;var _0x73C1 = "\"jptext:" + _0x5201;
  var _0x5571 = $(_0x7461)["attr"]("istart");
  var _0x5661 = syms[_0x5571];
  var _0x7411 = getGch(_0x5661, "jptext:");
  if (!_0x7411) {
      _0x7411 = ""
  }
  ;var _0x7439 = _0x7411["replace"]("jptext:", "");
  var _0x73E9 = "";
  if (_0x7439["split"](":")["length"] > 1) {
      _0x73E9 = _0x7439["split"](":")[1]
  }
  ;if (_0x73E9 != "") {
      _0x73C1 += ":" + _0x73E9
  }
  ;_0x73C1 += "\"";
  var _0x4BE9 = $("#source")["val"]();
  _0x4BE9 = replaceLast(_0x4BE9["substring"](0, _0x5571), "\"" + _0x7411 + "\"", "") + _0x73C1 + _0x4BE9["substring"](_0x5571);
  $("#source")["val"](_0x4BE9);
  doLog();
  src_change();
  showProperties("staff")
}
function setNoteJpTextMidi() {
  var _0x7461 = $(".selected_text");
  if (_0x7461["length"] == 0) {
      return
  }
  ;var _0x74B1 = $("#noteJpText")["val"]();
  if (_0x74B1 == "") {
      alert("\u8bf7\u5148\u8bbe\u7f6e\u6587\u672c");
      return
  }
  ;var _0x74D9 = $("#noteJpTextMidi")["val"]();
  if (_0x74D9 == "") {
      var _0x5571 = $(_0x7461)["attr"]("istart");
      var _0x5661 = syms[_0x5571];
      var _0x7411 = getGch(_0x5661, "jptext:");
      if (_0x7411 != "") {
          var _0x7501 = _0x7411["split"](":");
          var _0x7489 = "\"" + _0x7501[0] + ":" + _0x7501[1] + "\"";
          var _0x4BE9 = $("#source")["val"]();
          _0x4BE9 = replaceLast(_0x4BE9["substring"](0, _0x5571), "\"" + _0x7411 + "\"", _0x7489) + _0x4BE9["substring"](_0x5571);
          $("#source")["val"](_0x4BE9);
          doLog();
          src_change();
          showProperties("staff")
      }
      ;return
  }
  ;var _0x7489 = "\"jptext:" + _0x74B1 + ":" + _0x74D9 + "\"";
  var _0x5571 = $(_0x7461)["attr"]("istart");
  var _0x5661 = syms[_0x5571];
  var _0x7411 = getGch(_0x5661, "jptext:");
  var _0x4BE9 = $("#source")["val"]();
  _0x4BE9 = replaceLast(_0x4BE9["substring"](0, _0x5571), "\"" + _0x7411 + "\"", _0x7489) + _0x4BE9["substring"](_0x5571);
  $("#source")["val"](_0x4BE9);
  doLog();
  src_change();
  showProperties("staff")
}
function setDacsFontSize() {
  var _0x70F1 = $("#dacsFontSize")["val"]();
  var _0x4BE9 = $("#source")["val"]();
  if (_0x70F1 != "") {
      var _0x7119 = /dacsfontsize.*/;
      var _0x5E59 = _0x4BE9["match"](_0x7119);
      if (_0x5E59 != null) {
          var _0x7141 = _0x5E59[0];
          _0x4BE9 = _0x4BE9["replace"](_0x7141, _0x7141["replace"](/[0-9]\d*/, _0x70F1))
      } else {
          _0x4BE9 = "%%dacsfontsize " + _0x70F1 + "\x0A" + _0x4BE9
      }
  }
  ;$("#source")["val"](_0x4BE9);
  src_change()
}
function setBarWidth() {
  var _0x57F1 = $("svg[type=\'rectnode\'],svg[type=\'rectbar\']");
  if (_0x57F1["length"] > 0) {
      var _0x4BE9 = $("#source")["val"]();
      var _0x4B99 = $(_0x57F1[0])["attr"]("barIndex");
      if (!_0x4B99) {
          _0x4B99 = $(_0x57F1[0])["attr"]("barindex");
          if (!_0x4B99) {
              return
          }
      }
      ;var _0x70A1 = $("#barWidthInput")["val"]();
      if (_0x70A1 == "0") {
          _0x70A1 = ""
      }
      ;var _0x70C9 = "";
      if (_0x70A1 != "") {
          _0x70C9 = "\"barwidth:" + _0x70A1 + "\""
      } else {
          _0x70C9 = ""
      }
      ;var _0x4D51 = "";
      var _0x4CB1 = getNodesInfo(_0x4BE9);
      for (var _0x4C11 = 0, _0x4C61 = _0x4CB1["length"]; _0x4C11 < _0x4C61; _0x4C11++) {
          var _0x4C89 = _0x4CB1[_0x4C11];
          var _0x4CD9 = _0x4C89["lineStr"];
          var _0x4D01 = "";
          if (_0x4C89["type"] == "note") {
              for (var _0x4C39 = 0; _0x4C39 < _0x4C89["nodes"]["length"]; _0x4C39++) {
                  var _0x4D29 = _0x4C89["nodes"][_0x4C39];
                  if (_0x4D29["nodeIndex"] == _0x4B99) {
                      var _0x6F89 = _0x4D29["nodeStr"]["replace"](/\"barwidth:.[^\"]*\"/, "");
                      _0x6F89 = replaceLast(_0x6F89, _0x4D29["barLineStr"], "") + _0x70C9 + _0x4D29["barLineStr"];
                      _0x4D01 += _0x6F89
                  } else {
                      _0x4D01 += _0x4D29["nodeStr"]
                  }
                  ;lastNodeEndSeq = _0x4D29["endSeq"]
              }
              ;_0x4D01 += _0x4BE9["substring"](lastNodeEndSeq, _0x4C89["endSeq"]);
              _0x4D51 += _0x4D01 + "\x0A"
          } else {
              _0x4D51 += _0x4C89["lineStr"] + "\x0A"
          }
      }
      ;_0x4D51 = _0x4D51["replace"](/\%\%equalbars.*/, "");
      _0x4D51 = "%%equalbars 1\x0A" + _0x4D51;
      _0x4D51 = replaceBlankLine(_0x4D51);
      $("#source")["val"](_0x4D51);
      doLog();
      src_change(function() {
          var _0x5819 = new Array();
          var _0x5841 = new Object();
          _0x5841["bar_num"] = _0x4B99;
          _0x5841["color"] = "red";
          _0x5841["stroke"] = "red";
          _0x5841["v"] = 0;
          _0x5819["push"](_0x5841);
          renderStaffNodeBySt(_0x5819, "node")
      });
      return
  }
}
function setBarWidth2() {
  var _0x57F1 = $("svg[type=\'rectnode\'],svg[type=\'rectbar\']");
  if (_0x57F1["length"] > 0) {
      var _0x4BE9 = $("#source")["val"]();
      var _0x4B99 = $(_0x57F1[0])["attr"]("barIndex");
      if (!_0x4B99) {
          _0x4B99 = $(_0x57F1[0])["attr"]("barindex");
          if (!_0x4B99) {
              return
          }
      }
      ;var _0x70A1 = $("#barWidthInput2")["val"]();
      if (_0x70A1 == "0") {
          _0x70A1 = ""
      }
      ;var _0x70C9 = "";
      if (_0x70A1 != "") {
          _0x70C9 = "\"barwidtimes:" + _0x70A1 + "\""
      } else {
          _0x70C9 = ""
      }
      ;var _0x4D51 = "";
      var _0x4CB1 = getNodesInfo(_0x4BE9);
      for (var _0x4C11 = 0, _0x4C61 = _0x4CB1["length"]; _0x4C11 < _0x4C61; _0x4C11++) {
          var _0x4C89 = _0x4CB1[_0x4C11];
          var _0x4CD9 = _0x4C89["lineStr"];
          var _0x4D01 = "";
          if (_0x4C89["type"] == "note") {
              for (var _0x4C39 = 0; _0x4C39 < _0x4C89["nodes"]["length"]; _0x4C39++) {
                  var _0x4D29 = _0x4C89["nodes"][_0x4C39];
                  if (_0x4D29["nodeIndex"] == _0x4B99) {
                      var _0x6F89 = _0x4D29["nodeStr"]["replace"](/\"barwidtimes:.[^\"]*\"/, "");
                      _0x6F89 = replaceLast(_0x6F89, _0x4D29["barLineStr"], "") + _0x70C9 + _0x4D29["barLineStr"];
                      _0x4D01 += _0x6F89
                  } else {
                      _0x4D01 += _0x4D29["nodeStr"]
                  }
                  ;lastNodeEndSeq = _0x4D29["endSeq"]
              }
              ;_0x4D01 += _0x4BE9["substring"](lastNodeEndSeq, _0x4C89["endSeq"]);
              _0x4D51 += _0x4D01 + "\x0A"
          } else {
              _0x4D51 += _0x4C89["lineStr"] + "\x0A"
          }
      }
      ;_0x4D51 = _0x4D51["replace"](/\%\%equalbars.*/, "");
      _0x4D51 = "%%equalbars 1\x0A" + _0x4D51;
      _0x4D51 = replaceBlankLine(_0x4D51);
      $("#source")["val"](_0x4D51);
      doLog();
      src_change(function() {
          var _0x5819 = new Array();
          var _0x5841 = new Object();
          _0x5841["bar_num"] = _0x4B99;
          _0x5841["color"] = "red";
          _0x5841["stroke"] = "red";
          _0x5841["v"] = 0;
          _0x5819["push"](_0x5841);
          renderStaffNodeBySt(_0x5819, "node")
      });
      return
  }
}
function setBarHeight(_0x68D1) {
  var _0x57F1 = $("svg[type=\'rectnode\'],svg[type=\'rectbar\']");
  if (_0x57F1["length"] > 0) {
      var _0x4BE9 = $("#source")["val"]();
      var _0x4B99 = $(_0x57F1[0])["attr"]("barIndex");
      if (!_0x4B99) {
          _0x4B99 = $(_0x57F1[0])["attr"]("barindex");
          if (!_0x4B99) {
              return
          }
      }
      ;var _0x7029 = "";
      if (_0x68D1 == "top") {
          _0x7029 = $("#barHeightTopInput")["val"]()
      } else {
          if (_0x68D1 == "bot") {
              _0x7029 = $("#barHeightBotInput")["val"]()
          }
      }
      ;if (_0x7029 == "0") {
          _0x7029 = ""
      }
      ;var _0x7051 = "";
      if (_0x7029 != "") {
          _0x7051 = "[I:vskip " + _0x7029 + "]"
      } else {
          _0x7051 = ""
      }
      ;var _0x4D51 = "";
      var _0x4CB1 = getNodesInfo(_0x4BE9);
      for (var _0x4C11 = 0, _0x4C61 = _0x4CB1["length"]; _0x4C11 < _0x4C61; _0x4C11++) {
          var _0x4C89 = _0x4CB1[_0x4C11];
          var _0x4CD9 = _0x4C89["lineStr"];
          var _0x4D01 = "";
          if (_0x4C89["type"] == "note") {
              for (var _0x4C39 = 0; _0x4C39 < _0x4C89["nodes"]["length"]; _0x4C39++) {
                  var _0x4D29 = _0x4C89["nodes"][_0x4C39];
                  if (_0x4D29["nodeIndex"] == _0x4B99) {
                      var _0x7079 = _0x4D29["nodeStr"]["indexOf"]("[I:vskip");
                      var _0x6F89 = _0x4D29["nodeStr"];
                      if (_0x68D1 == "top") {
                          if (_0x7079 < 2) {
                              _0x6F89 = _0x4D29["nodeStr"]["replace"](/\[I:vskip.[^\[]*\]/, "")
                          }
                          ;if (_0x6F89["indexOf"]("$") > -1) {
                              var _0x7001 = _0x6F89["indexOf"]("$");
                              _0x6F89 = _0x6F89["substring"](0, _0x7001 + 1) + _0x7051 + _0x6F89["substring"](_0x7001 + 1)
                          } else {
                              _0x6F89 = _0x7051 + _0x6F89
                          }
                      } else {
                          if (_0x68D1 == "bot") {
                              _0x6F89 = _0x4D29["nodeStr"]["replace"](/\[I:vskip.[^\[]*\]\|/, "");
                              _0x6F89 = replaceLast(_0x6F89, _0x4D29["barLineStr"], "") + _0x7051 + _0x4D29["barLineStr"]
                          }
                      }
                      ;_0x4D01 += _0x6F89
                  } else {
                      _0x4D01 += _0x4D29["nodeStr"]
                  }
                  ;lastNodeEndSeq = _0x4D29["endSeq"]
              }
              ;_0x4D01 += _0x4BE9["substring"](lastNodeEndSeq, _0x4C89["endSeq"]);
              _0x4D51 += _0x4D01 + "\x0A"
          } else {
              _0x4D51 += _0x4C89["lineStr"] + "\x0A"
          }
      }
      ;_0x4D51 = replaceBlankLine(_0x4D51);
      $("#source")["val"](_0x4D51);
      doLog();
      src_change(function() {
          var _0x5819 = new Array();
          var _0x5841 = new Object();
          _0x5841["bar_num"] = _0x4B99;
          _0x5841["color"] = "red";
          _0x5841["stroke"] = "red";
          _0x5841["v"] = 0;
          _0x5819["push"](_0x5841);
          renderStaffNodeBySt(_0x5819, "node")
      });
      return
  }
}
function moveNote(_0x6E49) {
  var _0x6EE9 = $(".selected_text,.select_text_g");
  if (_0x6EE9["length"] > 0) {
      var _0x4BE9 = $("#source")["val"]();
      var _0x5571 = parseInt($(".selected_text,.select_text_g")["attr"]("istart"));
      var _0x5661 = syms[_0x5571];
      update_note_index = 0;
      update_note_istart = _0x5571;
      var _0x6EC1 = _0x4BE9["substring"](0, _0x5661["istart"]);
      var _0x6F11 = _0x4BE9["substring"](_0x5661["istart"]);
      var _0x6E71 = 0;
      if (_0x5661 && (_0x5661["xOffset"] || _0x5661["xOffset"] == 0)) {
          _0x6EC1 = replaceLast(_0x6EC1, /\!.[^\!]*\!/, "");
          _0x6E71 = 4 + (_0x5661["xOffset"] + "")["length"]
      }
      ;if (!_0x5661["xOffset"]) {
          _0x5661["xOffset"] = 0
      }
      ;if ("left" == _0x6E49) {
          _0x5661["xOffset"]--
      } else {
          if ("right" == _0x6E49) {
              _0x5661["xOffset"]++
          }
      }
      ;var _0x6E99 = 4 + (_0x5661["xOffset"] + "")["length"];
      update_note_istart = update_note_istart + (_0x6E99 - _0x6E71);
      var _0x5D41 = _0x6EC1 + "!x:" + _0x5661["xOffset"] + "!" + _0x6F11;
      $("#source")["val"](_0x5D41);
      lastFirstNoteSeq = getFirstNoteSeq();
      if (getFirstNoteSeq() == _0x5571) {
          lastFirstNoteSeq += _0x6E99 - _0x6E71
      }
      ;src_change(function() {
          if (_0x5661["type"] == 0) {
              console["log"]("\u5c0f\u8282\u7ebf");
              $("rect[istart=\'" + (_0x5571 + _0x6E99 - _0x6E71) + "\']")["css"]("fill-opacity", "0.3")["attr"]("selected", "selected");
              $("rect[istart=\'" + (_0x5571 + _0x6E99 - _0x6E71) + "\']")["addClass"]("selected_text")
          }
      });
      return
  }
}
function xdtest() {
  var _0x5819 = JSON["parse"]("[{\"istart\":295,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u6bcd\"],\"currlyric\":\"\u6bcd\",\"startTime\":5.0,\"dur\":0.3},{\"istart\":296,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u9e21\"],\"currlyric\":\"\u9e21\",\"startTime\":5.296054493683608,\"dur\":0.3},{\"istart\":298,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u6bcd\"],\"currlyric\":\"\u6bcd\",\"startTime\":5.592108987367215,\"dur\":0.3},{\"istart\":299,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u9e21\"],\"currlyric\":\"\u9e21\",\"startTime\":5.888163481050823,\"dur\":0.3},{\"istart\":303,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u53eb\"],\"currlyric\":\"\u53eb\",\"startTime\":6.18421797473443,\"dur\":0.3},{\"istart\":304,\"sdur\":192,\"pitch\":70,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u54af\"],\"currlyric\":\"\u54af\",\"startTime\":6.480272468418038,\"dur\":0.3},{\"istart\":306,\"sdur\":384,\"pitch\":70,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u54af\"],\"currlyric\":\"\u54af\",\"startTime\":6.7763269621016455,\"dur\":0.6},{\"istart\":311,\"sdur\":192,\"pitch\":65,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u53eb\",\"\u5ff5\u54af\"],\"currlyric\":\"\u53eb\",\"startTime\":7.368435949468861,\"dur\":0.3},{\"istart\":312,\"sdur\":192,\"pitch\":68,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u54af\",\"\u54af\"],\"currlyric\":\"\u54af\",\"startTime\":7.664490443152468,\"dur\":0.3},{\"istart\":314,\"sdur\":384,\"pitch\":68,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u54af\",\"\u54d2\"],\"currlyric\":\"\u54af\",\"startTime\":7.960544936836075,\"dur\":0.6},{\"istart\":319,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u53eb\",\"\u54af\"],\"currlyric\":\"\u53eb\",\"startTime\":8.552653924203291,\"dur\":0.3},{\"istart\":320,\"sdur\":192,\"pitch\":70,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u54af\",\"\u54af\"],\"currlyric\":\"\u54af\",\"startTime\":8.848708417886897,\"dur\":0.3},{\"istart\":322,\"sdur\":384,\"pitch\":70,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u54af\",\"\u54d2\"],\"currlyric\":\"\u54af\",\"startTime\":9.144762911570506,\"dur\":0.6},{\"istart\":394,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u6bcd\"],\"currlyric\":\"\u6bcd\",\"startTime\":9.736871898937721,\"dur\":0.3},{\"istart\":395,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u9e21\"],\"currlyric\":\"\u9e21\",\"startTime\":10.032926392621327,\"dur\":0.3},{\"istart\":397,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u6bcd\"],\"currlyric\":\"\u6bcd\",\"startTime\":10.328980886304937,\"dur\":0.3},{\"istart\":398,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u9e21\"],\"currlyric\":\"\u9e21\",\"startTime\":10.625035379988542,\"dur\":0.3},{\"istart\":402,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u53eb\"],\"currlyric\":\"\u53eb\",\"startTime\":10.92108987367215,\"dur\":0.3},{\"istart\":403,\"sdur\":192,\"pitch\":70,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u54af\"],\"currlyric\":\"\u54af\",\"startTime\":11.217144367355758,\"dur\":0.3},{\"istart\":405,\"sdur\":384,\"pitch\":70,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u54af\"],\"currlyric\":\"\u54af\",\"startTime\":11.513198861039365,\"dur\":0.6},{\"istart\":410,\"sdur\":192,\"pitch\":68,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u9e21\",\"\u5ff5\u54af\"],\"currlyric\":\"\u9e21\",\"startTime\":12.10530784840658,\"dur\":0.3},{\"istart\":411,\"sdur\":192,\"pitch\":68,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u86cb\",\"\u54af\"],\"currlyric\":\"\u86cb\",\"startTime\":12.401362342090188,\"dur\":0.3},{\"istart\":413,\"sdur\":192,\"pitch\":65,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u5df2\",\"\u54d2\"],\"currlyric\":\"\u5df2\",\"startTime\":12.697416835773796,\"dur\":0.3},{\"istart\":414,\"sdur\":192,\"pitch\":65,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u751f\"],\"currlyric\":\"\u751f\",\"startTime\":12.993471329457403,\"dur\":0.3},{\"istart\":418,\"sdur\":768,\"pitch\":63,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u843d\",\"\u54af\u54af\u54d2\"],\"currlyric\":\"\u843d\",\"startTime\":13.28952582314101,\"dur\":1.2},{\"istart\":489,\"sdur\":192,\"pitch\":65,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u8116\"],\"currlyric\":\"\u8116\",\"startTime\":14.473743797875441,\"dur\":0.3},{\"istart\":490,\"sdur\":192,\"pitch\":68,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u5b50\"],\"currlyric\":\"\u5b50\",\"startTime\":14.769798291559049,\"dur\":0.3},{\"istart\":492,\"sdur\":192,\"pitch\":68,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u4f38\"],\"currlyric\":\"\u4f38\",\"startTime\":15.065852785242656,\"dur\":0.3},{\"istart\":493,\"sdur\":192,\"pitch\":68,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u4f38\"],\"currlyric\":\"\u4f38\",\"startTime\":15.361907278926264,\"dur\":0.3},{\"istart\":497,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u4e24\"],\"currlyric\":\"\u4e24\",\"startTime\":15.657961772609871,\"dur\":0.3},{\"istart\":498,\"sdur\":192,\"pitch\":72,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u7ffc\"],\"currlyric\":\"\u7ffc\",\"startTime\":15.954016266293479,\"dur\":0.3},{\"istart\":500,\"sdur\":192,\"pitch\":70,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u6251\"],\"currlyric\":\"\u6251\",\"startTime\":16.250070759977085,\"dur\":0.3},{\"istart\":501,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u6251\"],\"currlyric\":\"\u6251\",\"startTime\":16.54612525366069,\"dur\":0.3},{\"istart\":505,\"sdur\":192,\"pitch\":65,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u5411\"],\"currlyric\":\"\u5411\",\"startTime\":16.8421797473443,\"dur\":0.3},{\"istart\":506,\"sdur\":192,\"pitch\":68,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u4eba\"],\"currlyric\":\"\u4eba\",\"startTime\":17.13823424102791,\"dur\":0.3},{\"istart\":508,\"sdur\":192,\"pitch\":68,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u62a5\"],\"currlyric\":\"\u62a5\",\"startTime\":17.434288734711515,\"dur\":0.3},{\"istart\":509,\"sdur\":192,\"pitch\":68,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u559c\"],\"currlyric\":\"\u559c\",\"startTime\":17.73034322839512,\"dur\":0.3},{\"istart\":513,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u6dfb\"],\"currlyric\":\"\u6dfb\",\"startTime\":18.02639772207873,\"dur\":0.3},{\"istart\":514,\"sdur\":192,\"pitch\":72,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u5feb\"],\"currlyric\":\"\u5feb\",\"startTime\":18.32245221576234,\"dur\":0.3},{\"istart\":516,\"sdur\":384,\"pitch\":70,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u4e50\"],\"currlyric\":\"\u4e50\",\"startTime\":18.618506709445946,\"dur\":0.6},{\"istart\":558,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u6bcd\",\"\u5ff5\u54af\"],\"currlyric\":\"\u6bcd\",\"startTime\":19.21061569681316,\"dur\":0.3},{\"istart\":559,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u9e21\",\"\u54af\"],\"currlyric\":\"\u9e21\",\"startTime\":19.50667019049677,\"dur\":0.3},{\"istart\":561,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u6bcd\",\"\u54d2\"],\"currlyric\":\"\u6bcd\",\"startTime\":19.802724684180376,\"dur\":0.3},{\"istart\":562,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u9e21\"],\"currlyric\":\"\u9e21\",\"startTime\":20.09877917786398,\"dur\":0.3},{\"istart\":566,\"sdur\":192,\"pitch\":67,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u53eb\",\"\u54af\"],\"currlyric\":\"\u53eb\",\"startTime\":20.39483367154759,\"dur\":0.3},{\"istart\":567,\"sdur\":192,\"pitch\":70,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u54af\",\"\u54af\"],\"currlyric\":\"\u54af\",\"startTime\":20.6908881652312,\"dur\":0.3},{\"istart\":569,\"sdur\":384,\"pitch\":70,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u54af\",\"\u54d2\"],\"currlyric\":\"\u54af\",\"startTime\":20.986942658914806,\"dur\":0.6},{\"istart\":574,\"sdur\":192,\"pitch\":68,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u9e21\",\"\u54af\"],\"currlyric\":\"\u9e21\",\"startTime\":21.57905164628202,\"dur\":0.3},{\"istart\":575,\"sdur\":192,\"pitch\":68,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u86cb\",\"\u54af\"],\"currlyric\":\"\u86cb\",\"startTime\":21.875106139965627,\"dur\":0.3},{\"istart\":577,\"sdur\":192,\"pitch\":65,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u5df2\",\"\u54af\"],\"currlyric\":\"\u5df2\",\"startTime\":22.171160633649237,\"dur\":0.3},{\"istart\":578,\"sdur\":192,\"pitch\":65,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u751f\",\"\u54d2\"],\"currlyric\":\"\u751f\",\"startTime\":22.467215127332842,\"dur\":0.3},{\"istart\":582,\"sdur\":768,\"pitch\":63,\"meter\":\"2/4\",\"scoretype\":\"all\",\"lyric\":[\"\u843d\",\"\u54d2\"],\"dur\":1.2,\"currlyric\":\"\u843d\",\"startTime\":22.763269621016452}]");
  var _0x7F29 = new Array();
  var _0x7F51 = 0;
  var _0x7F79 = 0;
  for (var _0x4C11 = 0; _0x4C11 < _0x5819["length"]; _0x4C11++) {
      console["log"](_0x5819[_0x4C11]);
      var _0x4D29 = _0x5819[_0x4C11];
      if (_0x7F51 % (192 * 4) == 0) {
          var _0x51D9 = new Object();
          _0x51D9["node_index"] = _0x7F79++;
          _0x51D9["starttime"] = parseFloat(_0x4D29["startTime"]) - 0.25;
          _0x7F29["push"](_0x51D9)
      }
      ;_0x7F51 += _0x4D29["sdur"]
  }
  ;return JSON["stringify"](_0x7F29)
}
function dotClick() {
  var _0x5EF9 = $(".selected_text");
  if (_0x5EF9["length"] > 0) {
      var _0x5571 = $(_0x5EF9)["attr"]("istart");
      cen = syms[_0x5571];
      var _0x4BE9 = $("#source")["val"]();
      var _0x5ED1 = _0x4BE9["substring"](cen["istart"], cen["iend"]);
      var _0x5E59 = _0x5ED1["match"](/[A-Ga-gz]{1,}/g);
      var _0x5E81 = "";
      if (_0x5E59 != null) {
          for (var _0x4C11 = 0; _0x4C11 < _0x5E59["length"]; _0x4C11++) {
              _0x5E81 += _0x5E59[_0x4C11]
          }
      }
      ;if (_0x5E81["length"] == 1) {} else {
          if (_0x5E81["length"] > 1) {
              _0x5E81 = "[" + _0x5E81 + "]"
          }
      }
      ;var _0x5EA9 = genNoteAndDur(_0x5E81, cen, null, null, true);
      _0x5EA9["note"] = _0x5E81;
      update_note_istart = _0x5571;
      update_note_index = 0;
      replaceNote("source", cen["istart"], cen["iend"], _0x5EA9)
  }
}
function switchMicInput() {
  if ($("#micInput")["hasClass"]("menu-pressed")) {
      closeMic();
      $("#source")["val"](staffTypes["treble"]);
      src_change();
      $("#micInput")["removeClass"]("menu-pressed");
      var _0x7A79 = "mic_iframe";
      var _0x7A51 = $("#" + _0x7A79)["prop"]("contentWindow");
      $("#" + _0x7A79)["attr"]("src", "about:blank");
      try {
          _0x7A51["document"]["write"]("");
          _0x7A51["document"]["clear"]()
      } catch (e) {}
  } else {
      $("#source")["val"](staffTypes["mic"]["replace"]("M: 4/4\x0A", ""));
      src_change();
      if ($("#graphEditorMenuInsert")["hasClass"]("menu-pressed")) {
          $("#graphEditorMenuUpdate")["click"]()
      }
      ;$("#micInput")["addClass"]("menu-pressed");
      $("#mic_iframe")["attr"]("src", "mic2pitch.html")
  }
}
function getCurrMicPitch() {
  $("#mic_iframe")[0]["contentWindow"]["getCurrPitch"]()
}
function closeMic() {
  $("#mic_iframe")[0]["contentWindow"]["closeMic"]()
}
function setMicAquireNoteTime() {
  if ($("#micInput")["hasClass"]("menu-pressed")) {
      var _0x67B9 = getStaffInfo("source");
      if (_0x67B9["speed"]) {
          var _0x5481 = _0x67B9["speed"]["meter"]["top"] + "/" + _0x67B9["speed"]["meter"]["bot"] + "=" + _0x67B9["speed"]["val"];
          var _0x7371 = getDurTimeBySpeed(_0x5481, durSetting);
          $("#mic_iframe")[0]["contentWindow"]["setAquireNoteTime"](_0x7371)
      }
  }
}
function mic2Staff(_0x6DF9, _0x6DA9) {
  noteStr = _0x6DF9;
  var _0x67B9 = getStaffInfo("source");
  var _0x6DD1 = "";
  if (_0x67B9["speed"]) {
      var _0x5481 = _0x67B9["speed"]["meter"]["top"] + "/" + _0x67B9["speed"]["meter"]["bot"] + "=" + _0x67B9["speed"]["val"];
      var _0x6E21 = getDurTimeBySpeed(_0x5481, durSetting);
      var _0x6D81 = (_0x6DA9 / 1000 / _0x6E21);
      if (_0x6D81 >= 0 && _0x6D81 <= 4) {
          _0x6DD1 = _0x6D81["toFixed"](0)
      } else {
          _0x6DD1 = 4
      }
      ;if (_0x6DD1 == "1" || _0x6DD1 == "0") {
          _0x6DD1 = ""
      }
      ;if (parseInt(_0x6DD1) > 2 && parseInt(_0x6DD1) <= 3) {
          _0x6DD1 = "2"
      } else {
          if (parseInt(_0x6DD1) > 3 && parseInt(_0x6DD1) <= 4) {
              _0x6DD1 = "4"
          }
      }
  }
  ;setStandDur(_0x6DD1);
  console["log"]("noteStr:", noteStr);
  if (noteStr != "") {
      console["log"]("", noteStr);
      updateNextNote(noteStr, -1)
  }
}
function setStandDur(_0x6DA9) {
  $(".jp_note")["removeClass"]("selected");
  $(".dotstatus")["removeClass"]("selected");
  if (_0x6DA9 == "" || _0x6DA9 == 1) {
      $(".jp_note[dur=192]")["addClass"]("selected")
  } else {
      if (_0x6DA9 == 2) {
          $(".jp_note[dur=384]")["addClass"]("selected")
      } else {
          if (_0x6DA9 == 3) {
              $(".jp_note[dur=384]")["addClass"]("selected");
              $(".dotstatus")["addClass"]("selected")
          } else {
              if (_0x6DA9 == 4) {
                  $(".jp_note[dur=768]")["addClass"]("selected")
              }
          }
      }
  }
  ;console["log"](_0x6DA9);
  if ($(".operator_sc.selected")["length"] > 0) {
      durSetting = $(".operator_sc.selected")["attr"]("dur")
  }
}
function switchStaffType() {
  var _0x7AA1 = $("#staffModule")["val"]();
  console["log"](_0x7AA1);
  if (_0x7AA1 == "") {
      $("#staffType option")["css"]("display", "");
      return
  }
  ;$("#staffType option")["each"](function(_0x4C11, _0x62E1) {
      if ($(_0x62E1)["attr"]("module") == _0x7AA1) {
          $(_0x62E1)["css"]("display", "")
      } else {
          $(_0x62E1)["css"]("display", "none")
      }
  })
}
var sourceFloatMove = false;
var clickX = 0
, clickY = 0;
function showFloatEditor() {
  if ($("#editor")["hasClass"]("menu-pressed")) {
      $("#editor")["click"]()
  }
  ;$("#source")["css"]("position", "absolute")["css"]("display", "block")["css"]("left", "0px")["css"]("top", "30px")["height"](300)["css"]("resize", "both")["css"]("z-index", "9");
  $("#source")["each"](function() {
      this["style"]["setProperty"]("width", "750px", "important")
  });
  $("#source_float_div")["css"]("display", "block")["css"]("left", "0px")["css"]("top", "0px")["css"]("height", "30px")["width"]($("#source")["outerWidth"]());
  $("#float_div")["append"]($("#source"));
  var $textareas = jQuery("#source");
  $textareas["data"]("x", $textareas["outerWidth"]());
  $textareas["data"]("y", $textareas["outerHeight"]());
  $textareas["mouseup"](function() {
      var $this = jQuery(this);
      if ($this["outerWidth"]() != $this["data"]("x") || $this["outerHeight"]() != $this["data"]("y")) {
          $("#source_float_div")["width"]($this["outerWidth"]())
      }
      ;$this["data"]("x", $this["outerWidth"]());
      $this["data"]("y", $this["outerHeight"]())
  })
}
function source_float_mousedown(_0x4F81) {
  clickX = _0x4F81["offsetX"];
  clickY = _0x4F81["offsetY"];
  sourceFloatMove = true
}
function source_float_mouseup() {
  clickX = 0;
  clickY = 0;
  sourceFloatMove = false
}
function source_float_mousemove(_0x4F81) {
  if (sourceFloatMove) {
      var _0x5BB1 = $("#source_float_div")["offset"]()["left"];
      var _0x7899 = $("#source_float_div")["offset"]()["top"];
      $("#source_float_div")["css"]("left", _0x4F81["x"] - clickX);
      $("#source")["css"]("left", _0x4F81["x"] - clickX);
      $("#source_float_div")["css"]("top", _0x4F81["y"] - clickY);
      $("#source")["css"]("top", _0x4F81["y"] - clickY + $("#source_float_div")["height"]())
  }
}
function source_float_change() {
  $("#source")["val"]($("#source_float")["val"]());
  abc_change()
}
function changeNodeDur() {
  var _0x57C9 = parseInt($("#barTimeTop")["attr"]("oldval"));
  var _0x57A1 = parseInt($("#barTimeBot")["attr"]("oldval"));
  var _0x5751 = parseInt($("#barTimeTop")["val"]());
  $("#barTimeTop")["attr"]("oldval", _0x5751);
  var _0x5729 = parseInt($("#barTimeBot")["val"]());
  $("#barTimeBot")["attr"]("oldval", _0x5729);
  var _0x56D9 = _0x5751 / _0x5729 - _0x57C9 / _0x57A1;
  var _0x57F1 = $("svg[type=\'rectnode\'],svg[type=\'rectbar\']");
  if (_0x57F1["length"] > 0) {
      var _0x4BE9 = $("#source")["val"]();
      var _0x4B99 = $(_0x57F1[0])["attr"]("barIndex");
      if (!_0x4B99) {
          _0x4B99 = $(_0x57F1[0])["attr"]("barindex");
          if (!_0x4B99) {
              return
          }
      }
      ;var _0x4D51 = "";
      var _0x4CB1 = getNodesInfo(_0x4BE9);
      for (var _0x4C11 = 0, _0x4C61 = _0x4CB1["length"]; _0x4C11 < _0x4C61; _0x4C11++) {
          var _0x4C89 = _0x4CB1[_0x4C11];
          var _0x4CD9 = _0x4C89["lineStr"];
          var _0x4D01 = "";
          if (_0x4C89["type"] == "note") {
              for (var _0x4C39 = 0; _0x4C39 < _0x4C89["nodes"]["length"]; _0x4C39++) {
                  var _0x4D29 = _0x4C89["nodes"][_0x4C39];
                  if (_0x4D29["nodeIndex"] == _0x4B99) {
                      var _0x5779 = _0x4D29["nodeStr"];
                      if (_0x56D9 > 0) {
                          var _0x5701 = getDurStrByNoteDur(1536 * (_0x5751 / _0x5729 - _0x57C9 / _0x57A1), getNodeFirstNote(_0x4D29)["my_ulen"]);
                          _0x4D01 += _0x4D29["nodeStr"]["replace"](_0x4D29["barLineStr"], "") + " z," + _0x5701 + _0x4D29["barLineStr"]
                      } else {
                          if (_0x56D9 < 0) {
                              _0x4D01 += nodeCut(_0x4D29, _0x56D9)
                          }
                      }
                  } else {
                      _0x4D01 += _0x4D29["nodeStr"]
                  }
                  ;lastNodeEndSeq = _0x4D29["endSeq"]
              }
              ;_0x4D01 += _0x4BE9["substring"](lastNodeEndSeq, _0x4C89["endSeq"]);
              _0x4D51 += _0x4D01 + "\x0A"
          } else {
              _0x4D51 += _0x4C89["lineStr"] + "\x0A"
          }
      }
      ;_0x4D51 = replaceBlankLine(_0x4D51);
      $("#source")["val"](_0x4D51);
      doLog();
      src_change(function() {
          var _0x5819 = new Array();
          var _0x5841 = new Object();
          _0x5841["bar_num"] = _0x4B99;
          _0x5841["color"] = "red";
          _0x5841["stroke"] = "red";
          _0x5841["v"] = 0;
          _0x5819["push"](_0x5841);
          renderStaffNodeBySt(_0x5819, "node")
      });
      return
  }
}
function nodeCut(_0x4D29, _0x56D9) {
  var _0x4BE9 = $("#source")["val"]();
  var _0x5B89 = decimalsToFractional(_0x56D9);
  var _0x6F61 = 1536 * Math["abs"](_0x56D9);
  console["log"]("dis:", _0x5B89);
  var _0x6F89 = "";
  var _0x6F39 = 0;
  if (_0x56D9 > 0) {
      var _0x5701 = getDurStrByNoteDur(1536 * (newTop / newBot - oldTop / oldBot), getNodeFirstNote(_0x4D29)["my_ulen"]);
      _0x6F89 = _0x4D29["nodeStr"]["replace"](_0x4D29["barLineStr"], "") + " z," + _0x5701 + _0x4D29["barLineStr"]
  } else {
      if (_0x56D9 < 0) {
          var _0x6FB1 = _0x4D29["nodeStr"];
          for (var _0x4C11 = _0x4D29["endSeq"] - 1; _0x4C11 >= _0x4D29["startSeq"]; _0x4C11--) {
              var _0x5661 = syms[_0x4C11];
              if (_0x5661) {
                  if (_0x5661["type"] == 8 || _0x5661["type"] == 10) {
                      if (_0x5661["dur"] == _0x6F61) {
                          var _0x5571 = getMinIstart(_0x5661);
                          var _0x5ED1 = _0x4BE9["substring"](_0x5571, _0x5661["iend"]);
                          _0x6F89 = replaceLast(_0x6FB1, _0x5ED1, "");
                          break
                      } else {
                          if (_0x5661["dur"] > _0x6F61) {
                              var _0x5571 = getMinIstart(_0x5661);
                              var _0x5ED1 = _0x4BE9["substring"](_0x5571, _0x5661["iend"]);
                              var _0x5701 = getDurStrByNoteDur(_0x5661["dur"] - _0x6F61, getNodeFirstNote(_0x4D29)["my_ulen"]);
                              _0x6F89 = replaceLast(_0x6FB1, _0x5ED1, "z," + _0x5701);
                              break
                          } else {
                              if (_0x5661["dur"] < _0x6F61) {
                                  _0x6F61 = _0x6F61 - _0x5661["dur"];
                                  var _0x5571 = getMinIstart(_0x5661);
                                  var _0x5ED1 = _0x4BE9["substring"](_0x5571, _0x5661["iend"]);
                                  _0x6FB1 = replaceLast(_0x6FB1, _0x5ED1, "")
                              }
                          }
                      }
                  }
              }
          }
      }
  }
  ;return _0x6F89
}
function getMinIstart(_0x5661) {
  var _0x5571 = _0x5661["istart"];
  if (_0x5661["a_gch"]) {
      for (var _0x4C39 = 0; _0x4C39 < _0x5661["a_gch"]["length"]; _0x4C39++) {
          if (_0x5661["a_gch"][_0x4C39]["istart"] < _0x5571) {
              _0x5571 = _0x5661["a_gch"][_0x4C39]["istart"]
          }
      }
  }
  ;if (_0x5661["a_dd"]) {
      for (var _0x4C39 = 0; _0x4C39 < _0x5661["a_dd"]["length"]; _0x4C39++) {
          if (_0x5661["a_dd"][_0x4C39]["istart"] < _0x5571) {
              _0x5571 = _0x5661["a_dd"][_0x4C39]["istart"]
          }
      }
  }
  ;return _0x5571
}
function handleFingerInput(_0x6881) {
  var _0x68A9 = $(".selected_text");
  if (_0x68A9["length"] > 0) {
      var _0x68D1 = $(_0x68A9)["attr"]("type");
      if (_0x68D1["toLowerCase"]() == "hd") {
          var _0x5571 = parseInt($(_0x68A9)["attr"]("istart"));
          var _0x5661 = syms[_0x5571];
          lastSelectedNoteIstart = parseInt(_0x5571) + 3;
          if (_0x5661) {
              var _0x4BE9 = $("#source")["val"]();
              var _0x5D41 = _0x4BE9["substring"](0, _0x5571) + "!" + (_0x6881["which"] - 48) + "!" + _0x4BE9["substring"](_0x5571);
              $("#source")["val"](_0x5D41);
              doLog();
              src_change(reSelectNote);
              return false
          }
      }
  }
}
function editCurrNoteChord(_0x4F81) {
  hiddenMenu();
  var _0x5571 = $(ctxMenu)["attr"]("istart");
  $("#editorChordIstart")["val"](_0x5571);
  $("#chordText")["val"]("");
  $("#editorChordIend")["val"]("");
  $("#leftUpText")["val"]("");
  $("#rightUpText")["val"]("");
  $("#rightDownText")["val"]("");
  $("#chordText2")["val"]("");
  var _0x5661 = syms[_0x5571];
  if (_0x5661) {
      var _0x5891 = _0x5661["a_gch"];
      if (_0x5891 != null) {
          for (var _0x4C11 = 0; _0x4C11 < _0x5891["length"]; _0x4C11++) {
              var _0x5869 = _0x5891[_0x4C11];
              if (_0x5869["text"]["indexOf"]("my_chord") == 0) {
                  var _0x59A9 = _0x5869["text"]["replace"]("my_chord:", "");
                  console["log"](_0x59A9);
                  var _0x6011 = /\[\^(.[^\[]*)\]/;
                  var _0x5F21 = /\[\_(.[^\[]*)\]/;
                  if (_0x59A9["indexOf"]("[^") == 0) {
                      var _0x5F49 = "";
                      var _0x4D29 = _0x6011["exec"](_0x59A9);
                      _0x5F49 = _0x4D29[0];
                      $("#leftUpText")["val"](_0x4D29[1]);
                      _0x59A9 = _0x59A9["replace"](_0x5F49, "")
                  }
                  ;var _0x5FE9 = _0x59A9["indexOf"]("[");
                  if (_0x5FE9 == -1) {
                      _0x5FE9 = _0x59A9["indexOf"]("/")
                  }
                  ;var _0x5FC1 = _0x59A9["substring"](0, _0x5FE9);
                  $("#chordText")["val"](_0x5FC1);
                  _0x59A9 = _0x59A9["substring"](_0x5FE9);
                  if (_0x6011["test"](_0x59A9)) {
                      var _0x5F99 = "";
                      var _0x4D29 = _0x6011["exec"](_0x59A9);
                      _0x5F99 = _0x4D29[0];
                      $("#rightUpText")["val"](_0x4D29[1]);
                      _0x59A9 = _0x59A9["replace"](_0x5F99, "")
                  }
                  ;if (_0x5F21["test"](_0x59A9)) {
                      var _0x5F71 = "";
                      var _0x4D29 = _0x5F21["exec"](_0x59A9);
                      _0x5F71 = _0x4D29[0];
                      $("#rightDownText")["val"](_0x4D29[1]);
                      _0x59A9 = _0x59A9["replace"](_0x5F71, "")
                  }
                  ;if (_0x59A9["indexOf"]("/") > -1) {
                      var _0x59D1 = _0x59A9["substring"](_0x59A9["indexOf"]("/") + 1);
                      $("#chordText2")["val"](_0x59D1)
                  }
              }
          }
      }
  }
  ;showProperties("chordinput", _0x4F81)
}
function changeSChord() {
  var _0x4BE9 = $("#source")["val"]();
  var _0x5201 = $("#chordText")["val"]();
  var _0x59D1 = $("#chordText2")["val"]();
  var _0x58E1 = $("#leftUpText")["val"]();
  var _0x5981 = $("#rightUpText")["val"]();
  var _0x5959 = $("#rightDownText")["val"]();
  var _0x59A9 = "";
  if (_0x58E1 != "") {
      _0x59A9 += "[^" + _0x58E1 + "]"
  }
  ;_0x59A9 += _0x5201;
  if (_0x5959 != "") {
      _0x59A9 += "[_" + _0x5959 + "]"
  }
  ;if (_0x5981 != "") {
      _0x59A9 += "[^" + _0x5981 + "]"
  }
  ;if (_0x59D1 != "") {
      _0x59A9 += "/" + _0x59D1
  }
  ;var _0x5909 = parseInt($("#editorChordIstart")["val"]());
  var _0x5661 = syms[_0x5909];
  if (_0x5661) {
      var _0x5891 = getGch(_0x5661, "my_chord");
      if (!_0x5891) {
          var _0x58B9 = "\"my_chord:" + _0x59A9 + "\"";
          _0x4BE9 = _0x4BE9["substring"](0, _0x5909) + _0x58B9 + _0x4BE9["substring"](_0x5909);
          $("#source")["val"](_0x4BE9);
          _0x5909 += _0x58B9["length"];
          doLog();
          $("#editorChordIstart")["val"](_0x5909);
          src_change(function() {
              var _0x5661 = syms[_0x5909];
              $("text[type=\'lyric\'][lyric_istart=\'" + _0x5909 + "\']")["css"]("color", "red")
          })
      } else {
          var _0x58B9 = "\"my_chord:" + _0x59A9 + "\"";
          var _0x5891 = _0x5661["a_gch"];
          var _0x5931 = "";
          if (_0x5891 != null) {
              for (var _0x4C11 = 0; _0x4C11 < _0x5891["length"]; _0x4C11++) {
                  var _0x5869 = _0x5891[_0x4C11];
                  if (_0x5869["text"]["indexOf"]("my_chord") == 0) {
                      _0x5931 = _0x5869["text"];
                      var _0x58B9 = "\"my_chord:" + _0x59A9 + "\"";
                      _0x4BE9 = _0x4BE9["substring"](0, _0x5869["istart"]) + _0x58B9 + _0x4BE9["substring"](_0x5869["iend"]);
                      $("#source")["val"](_0x4BE9);
                      _0x5909 += _0x58B9["length"] - 2 - _0x5931["length"];
                      doLog();
                      $("#editorChordIstart")["val"](_0x5909);
                      src_change(function() {
                          var _0x5661 = syms[_0x5909];
                          $("text[type=\'hd\'][istart=\'" + _0x5909 + "\']")["css"]("color", "red")
                      })
                  }
              }
          }
      }
  }
}
function addSpecChar() {
  console["log"]("pointIndex:", currChordInputPointIndex);
  $("#SPEC_CHAR_div .modal-content")["css"]("left", ($(window)["width"]() - $("#SPEC_CHAR_div .modal-content")["width"]()) / 2);
  $("#SPEC_CHAR_div .modal-content")["css"]("width", "600px");
  chordInputCtxMenu["style"]["display"] = "none";
  if (currEditChordInputId) {
      $("#" + currEditChordInputId)["css"]("background-color", "lightsalmon")
  }
  ;$("#SPEC_CHAR_div")["modal"]()
}
function getCursortPosition(_0x51D9) {
  var _0x5C01 = 0;
  if (document["selection"]) {
      _0x51D9["focus"]();
      var _0x6651 = document["selection"]["createRange"]();
      _0x6651["moveStart"]("character", -_0x51D9["value"]["length"]);
      _0x5C01 = _0x6651["text"]["length"]
  } else {
      if (_0x51D9["selectionStart"] || _0x51D9["selectionStart"] == 0) {
          _0x5C01 = _0x51D9["selectionStart"]
      }
  }
  ;return _0x5C01
}
function chordInputClickHandler(_0x51D9) {
  var _0x5C01 = getCursortPosition(_0x51D9);
  console["log"]("cursorIndex:", _0x5C01);
  currChordInputPointIndex = _0x5C01;
  currEditChordInputId = _0x51D9["id"];
  $(".chordinput")["css"]("background-color", "");
  $(_0x51D9)["css"]("background-color", "lightsalmon")
}
function closeSepcChar() {
  $("#" + currEditChordInputId)["css"]("background-color", "")
}

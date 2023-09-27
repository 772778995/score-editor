/* util */

function getById(_0xA200) {
  return document["getElementById"](_0xA200)
}
String["prototype"]["replaceAll"] = function(_0x94FE, _0x9510) {
  return this["replace"](new RegExp(_0x94FE,"gm"), _0x9510)
}
;
String["prototype"]["replaceAllNum"] = function(_0x94FE) {
  return this["replace"](new RegExp(/[0-9]/ig,"gm"), _0x94FE)
}
;
String["prototype"]["startWith"] = function(_0x9534) {
  var _0x9522 = new RegExp("^" + _0x9534);
  return _0x9522["test"](this)
}
;
String["prototype"]["endWith"] = function(_0x9534) {
  var _0x9522 = new RegExp(_0x9534 + "$");
  return _0x9522["test"](this)
}
;
Array["prototype"]["clone"] = function() {
  var _0x9546 = [];
  for (var _0x9558 = 0; _0x9558 < this["length"]; _0x9558++) {
      _0x9546["push"](this[_0x9558])
  }
  ;return _0x9546
}
;
var nodeBarReg = /(\|[1-9\.]+)|(\|\[[1-9\.]+)|(:\|\|:)|(:\|:)|(:\|)|(::)|(\|:)|(\|\|)|(\|\])|(\|)/g;
Date["prototype"]["Format"] = function(_0x956A) {
  var _0x958E = {
      "M+": this["getMonth"]() + 1,
      "d+": this["getDate"](),
      "h+": this["getHours"](),
      "m+": this["getMinutes"](),
      "s+": this["getSeconds"](),
      "q+": Math["floor"]((this["getMonth"]() + 3) / 3),
      "S": this["getMilliseconds"]()
  };
  if (/(y+)/["test"](_0x956A)) {
      _0x956A = _0x956A["replace"](RegExp["$1"], (this["getFullYear"]() + "")["substr"](4 - RegExp["$1"]["length"]))
  }
  ;for (var _0x957C in _0x958E) {
      if (new RegExp("(" + _0x957C + ")")["test"](_0x956A)) {
          _0x956A = _0x956A["replace"](RegExp["$1"], (RegExp["$1"]["length"] == 1) ? (_0x958E[_0x957C]) : (("00" + _0x958E[_0x957C])["substr"](("" + _0x958E[_0x957C])["length"])))
      }
  }
  ;return _0x956A
}
;
function unique(_0x9AD4) {
  var _0xC28E = [];
  for (var _0x9558 = 0; _0x9558 < _0x9AD4["length"]; _0x9558++) {
      if (_0xC28E["indexOf"](_0x9AD4[_0x9558]) == -1) {
          _0xC28E["push"](_0x9AD4[_0x9558])
      }
  }
  ;return _0xC28E
}
function S4() {
  return (((1 + Math["random"]()) * 0x10000) | 0)["toString"](16)["substring"](1)
}
function uuid() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4())
}
function trimLeft(_0x98DC) {
  if (_0x98DC == null) {
      return ""
  }
  ;var _0xC27C = new String(" \x09\x0A\x0D");
  var _0x9534 = new String(_0x98DC);
  if (_0xC27C["indexOf"](_0x9534["charAt"](0)) != -1) {
      var _0x96D2 = 0
        , _0x9558 = _0x9534["length"];
      while (_0x96D2 < _0x9558 && _0xC27C["indexOf"](_0x9534["charAt"](_0x96D2)) != -1) {
          _0x96D2++
      }
      ;_0x9534 = _0x9534["substring"](_0x96D2, _0x9558)
  }
  ;return _0x9534
}
function genspace(_0x9B64) {
  var _0x9534 = "";
  for (var _0x9558 = 0; _0x9558 < _0x9B64; _0x9558++) {
      _0x9534 = _0x9534 + " "
  }
  ;return _0x9534
}
function getStartPos(_0xB2F2) {
  if (typeof _0xB2F2["selectionStart"] != "undefined") {
      start = _0xB2F2["selectionStart"]
  } else {
      var _0xB2BC = document["selection"]["createRange"]();
      var _0xB2CE = document["body"]["createTextRange"]();
      _0xB2CE["moveToElementText"](_0xB2F2);
      for (var _0xB2E0 = 0; _0xB2CE["compareEndPoints"]("StartToStart", _0xB2BC) < 0; _0xB2E0++) {
          _0xB2CE["moveStart"]("character", 1)
      }
      ;start = _0xB2E0
  }
  ;return start
}
function getSelectText(_0xA200) {
  var _0x996C = document["getElementById"](_0xA200);
  if (window["getSelection"]) {
      if (_0x996C["selectionStart"] != undefined && _0x996C["selectionEnd"] != undefined && _0x996C["selectionStart"] != _0x996C["selectionEnd"]) {
          return _0x996C["value"]["substring"](_0x996C["selectionStart"], _0x996C["selectionEnd"])
      } else {
          return ""
      }
  } else {
      return document["selection"]["createRange"]()["text"]
  }
}
function toFloat(_0x9534) {
  if (_0x9534 == null) {
      return 0
  }
  ;if (_0x9534 == "") {
      return 0
  }
  ;if (_0x9534["indexOf"]("/") < 0) {
      return parseFloat(_0x9534)
  }
  ;var _0x98DC = _0x9534["split"]("/");
  var _0x9D4A = parseFloat(_0x98DC[0]) / parseFloat(_0x98DC[1]);
  return _0x9D4A
}
function insertText(_0x9534) {
  var _0xA6EC = document["getElementById"]("source");
  if (document["selection"]) {
      var _0xB59E = document["selection"]["createRange"]();
      _0xB59E["text"] = _0x9534
  } else {
      if (typeof _0xA6EC["selectionStart"] === "number" && typeof _0xA6EC["selectionEnd"] === "number") {
          var _0xAFDA = _0xA6EC["selectionStart"]
            , _0xB58C = _0xA6EC["selectionEnd"]
            , _0x9990 = _0xA6EC["value"];
          var _0xA842 = getStartPos(getById("source"));
          if (_0xA842 == 0) {
              _0xA842 = _0xA6EC["value"]["length"]
          }
          ;_0xA6EC["value"] = _0x9990["substring"](0, _0xA842) + _0x9534 + _0x9990["substring"](_0xA842, _0x9990["length"]);
          setCaretPosition(document["getElementById"]("source"), _0xA842 + _0x9534["length"]);
          setTimeout(function() {
              var _0xB5B0 = document["getElementsByClassName"]("_" + _0xA842 + "_");
              if (_0xB5B0[0]) {
                  _0xB5B0[0]["scrollIntoView"]()
              }
          }, 300)
      } else {
          _0xA6EC["value"] += _0x9534
      }
  }
}
function insertWithVoice(_0x9534, _0xB5C2) {
  var _0x961E = $("#source")["val"]();
  var _0x9708 = _0x961E["split"]("\x0A");
  var _0xB5D4 = new RegExp("V:s*" + currInputVoice);
  if (!_0xB5D4["test"](_0x961E)) {
      _0x961E = replaceBlankLine(_0x961E);
      _0x961E = _0x961E + "\x0AV:2 bass\x0A";
      _0x9708 = _0x961E["split"]("\x0A")
  }
  ;var _0x985E = "";
  var _0xAC9E = _0x9708["length"] - 1;
  for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
      var _0x96F6 = _0x9708[_0x9558];
      if (_0xB5D4["test"](_0x96F6)) {
          for (var _0x96D2 = _0x9558 + 1; _0x96D2 < _0x9708["length"]; _0x96D2++) {
              if (_0x9708[_0x96D2]["indexOf"]("%%") < 0 && _0x9708[_0x96D2]["indexOf"]("w:") < 0 && _0x9708[_0x96D2]["indexOf"]("N:") < 0) {
                  if (_0x9708[_0x96D2]["indexOf"]("V:") > -1) {
                      break
                  }
                  ;_0x985E = _0x9708[_0x96D2];
                  _0xAC9E = _0x96D2
              }
          }
      }
  }
  ;if (_0x985E == "z") {
      _0x985E = ""
  }
  ;_0x985E += _0x9534;
  var _0x9D4A = "";
  for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
      if (_0x9558 != _0xAC9E) {
          _0x9D4A += _0x9708[_0x9558];
          if (_0x9558 != (_0x9708["length"] - 1)) {
              _0x9D4A += "\x0A"
          }
      } else {
          _0x9D4A += _0x985E;
          if (_0xAC9E != (_0x9708["length"] - 1)) {
              _0x9D4A += "\x0A"
          }
      }
  }
  ;_0x9D4A = replaceBlankLine(_0x9D4A);
  $("#source")["val"](_0x9D4A);
  autoNodeLine2(_0xAC9E);
  return _0xAC9E
}
function moveEnd() {
  var _0xA6EC = document["getElementById"]("source");
  _0xA6EC["focus"]();
  var _0x9B64 = _0xA6EC["value"]["length"];
  if (document["selection"]) {
      var _0xB59E = _0xA6EC["createTextRange"]();
      _0xB59E["moveStart"]("character", _0x9B64);
      _0xB59E["collapse"]();
      _0xB59E["select"]()
  } else {
      if (typeof _0xA6EC["selectionStart"] == "number" && typeof _0xA6EC["selectionEnd"] == "number") {
          _0xA6EC["selectionStart"] = _0xA6EC["selectionEnd"] = _0x9B64
      }
  }
}
function setSelectRange(_0xB2F2, _0xA0BC, _0xA02C) {
  if (typeof _0xB2F2["createTextRange"] != "undefined") {
      var _0xB2BC = _0xB2F2["createTextRange"]();
      _0xB2BC["moveStart"]("character", 0);
      _0xB2BC["moveEnd"]("character", 0);
      _0xB2BC["collapse"](true);
      _0xB2BC["moveEnd"]("character", _0xA02C);
      _0xB2BC["moveStart"]("character", _0xA0BC);
      _0xB2BC["select"]()
  } else {
      if (typeof _0xB2F2["setSelectionRange"] != "undefined") {
          _0xB2F2["setSelectionRange"](_0xA0BC, _0xA02C);
          _0xB2F2["focus"]()
      }
  }
}
function replaceYinGao(_0x9534) {
  return _0x9534["replace"]("^", "")["replace"]("_", "")["replace"]("=", "")
}
function getUrlParameter(_0xB35E) {
  if (location["search"] == "") {
      return ""
  }
  ;var _0x958E = {};
  var _0xB370 = location["search"]["replace"](/\?/, "");
  _0xB370 = decodeURIComponent(_0xB370);
  var _0x98DC = _0xB370["split"]("&");
  for (var _0x9558 = 0; _0x9558 < _0x98DC["length"]; _0x9558++) {
      _0x958E[_0x98DC[_0x9558]["split"]("=")[0]] = _0x98DC[_0x9558]["split"]("=")[1]
  }
  ;return _0x958E[_0xB35E] == undefined ? "" : _0x958E[_0xB35E]
}
function maskFullTxt(_0xB5F8) {
  if (!_0xB5F8 || _0xB5F8 == undefined) {
      _0xB5F8 = "\u52a0\u8f7d\u4e2d..."
  }
  ;var _0xB5E6 = "";
  _0xB5E6 += "<div class=\"modal-backdrop fade loading\" ></div>";
  _0xB5E6 += "<div class=\"modal center-modal fade show loading-box\" id=\"modal-mask\" ondblclick=\"hideMaskFullTxt()\">";
  _0xB5E6 += "  <div class=\"modal-dialog\">";
  _0xB5E6 += "\x09<div class=\"modal-content\">";
  _0xB5E6 += "\x09  <div class=\"modal-body text-center\"><div class=\"outer\"></div>";
  _0xB5E6 += "\x09\x09<span id=\"maskfulltxt\">" + _0xB5F8 + "</span>";
  _0xB5E6 += "\x09  </div>";
  _0xB5E6 += "\x09</div>";
  _0xB5E6 += "  </div>";
  _0xB5E6 += "</div>";
  $("body")["append"](_0xB5E6)
}
function hideMaskFullTxt() {
  $(".loading,.loading-box")["remove"]()
}
function replaceBlankLine() {
  var _0x9522 = /\n(\n)*( )*(\n)*\n/g;
  var _0xBD36 = $("#source")["val"]();
  var _0xBD24 = _0xBD36["replace"](_0x9522, "\x0A");
  $("#source")["val"](_0xBD24)
}
function replaceBlankLine(_0x9CDE) {
  var _0x9522 = /\n(\n)*( )*(\n)*\n/g;
  return _0x9CDE["replace"](_0x9522, "\x0A")
}
function replaceQuotation(_0x9534) {
  return _0x9534["replaceAll"](/"[^"]+"/g, "")["replace"](/[()]/g, "")
}
function getMetro(_0x95E8) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  var _0xAB36 = /M:.*\n/g;
  var _0xAB12 = /L:.*\n/g;
  var _0xAB48 = _0x961E["match"](_0xAB36);
  var _0xAB24 = _0x961E["match"](_0xAB12);
  var _0x971A = _0xAB48[0]["replaceAll"]("M:", "")["replaceAll"](" ", "")["split"]("/")[1];
  var _0x96E4 = _0xAB24[0]["replaceAll"]("L:", "")["replaceAll"](" ", "")["split"]("/")[1];
  var _0x9708 = _0x961E["split"]("\x0A");
  var _0x9D4A = "";
  if (_0x9708 != null) {
      for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
          var _0x96F6 = _0x9708[_0x9558];
          var _0x9CCC = replaceQuotation(_0x96F6);
          if (_0x9CCC["replace"](/\{.[^\}]*\}/g, "")["indexOf"]("|") > -1) {
              break
          }
          ;if (_0x96F6["indexOf"]("MIDI program") > -1) {
              _0x9D4A = _0x9D4A + "%%MIDI program 115 \x0A"
          } else {
              _0x9D4A = _0x9D4A + _0x96F6 + "\x0A"
          }
      }
  }
  ;var _0xAB5A = parseInt(_0x96E4) / parseInt(_0x971A);
  if (_0xAB5A < 1) {
      if (_0xAB5A == 0.5) {
          _0xAB5A = "/"
      }
      ;if (_0xAB5A == 0.25) {
          _0xAB5A = "//"
      }
  } else {
      if (_0xAB5A == 1) {
          _0xAB5A = ""
      }
  }
  ;if (_0x9D4A != "") {
      for (var _0x9558 = 0; _0x9558 < 50; _0x9558++) {
          _0x9D4A = _0x9D4A + "A" + _0xAB5A
      }
  }
  ;if (_0x9D4A["indexOf"]("MIDI program") < 0) {
      _0x9D4A = _0x9D4A + "\x0A%%MIDI program 115"
  }
  ;return _0x9D4A
}
String["prototype"]["startWith"] = function(_0x9534) {
  var _0x9522 = new RegExp("^" + _0x9534);
  return _0x9522["test"](this)
}
;
var formatJson = function(_0x95A0, _0x95B2) {
  return _0x95A0["replaceAll"]("\x0A", "")["replaceAll"]("{", "\x0A{")["replaceAll"]("}", "}\x0A")
};
function svgdownload(_0xC1C8) {
  var _0xC1DA = $(_0xC1C8)["html"]();
  var _0xC1B6 = new Image();
  _0xC1B6["src"] = "data:image/svg+xml;base64," + window["btoa"](unescape(encodeURIComponent(_0xC1DA)));
  var _0xA39E = document["createElement"]("canvas");
  _0xA39E["width"] = $(_0xC1C8 + " svg")["width"]();
  _0xA39E["height"] = $(_0xC1C8 + " svg")["height"]();
  var _0xC1A4 = _0xA39E["getContext"]("2d");
  _0xC1A4["drawImage"](_0xC1B6, 0, 0);
  var _0x9546 = document["createElement"]("a");
  _0x9546["href"] = _0xA39E["toDataURL"]("image/png");
  _0x9546["download"] = "MapByMathArtSys";
  _0x9546["click"]()
}
function dataURItoBlob(_0xA13A) {
  var _0xA128 = "";
  if (_0xA13A["split"](",")[0]["indexOf"]("base64") >= 0) {
      _0xA128 = atob(_0xA13A["split"](",")[1])
  } else {
      _0xA128 = unescape(_0xA13A["split"](",")[1])
  }
  ;var _0xA15E = _0xA13A["split"](",")[0]["split"](":")[1]["split"](";")[0];
  var _0xA116 = new ArrayBuffer(_0xA128["length"]);
  var _0xA14C = new Uint8Array(_0xA116);
  for (var _0x9558 = 0; _0x9558 < _0xA128["length"]; _0x9558++) {
      _0xA14C[_0x9558] = _0xA128["charCodeAt"](_0x9558)
  }
  ;return new Blob([_0xA116],{
      type: _0xA15E
  })
}
function getVNum(_0xADAC) {
  var _0x98B8 = /V:.[^V]*\n/g;
  var _0x961E = $("#" + _0xADAC)["val"]();
  var _0x9D4A = _0x961E["match"](_0x98B8);
  if (_0x9D4A != null) {
      return _0x9D4A["length"]
  }
  ;return 1
}
function getNodeDatas_v1(_0xAD9A, _0xADAC) {
  var _0xAD64 = 0;
  var _0xAD2E = 0;
  var _0xAD40 = 0;
  var _0x961E = $("#source")["val"]();
  var _0xAD88 = false;
  if (_0x961E["indexOf"]("stafflines=1") > -1) {
      _0xAD88 = true
  }
  ;$["each"]($("#" + _0xAD9A + " svg>g")["first"]()["find"]("path"), function(_0x9558, _0x960C) {
      if (_0x9558 == 0) {
          _0xAD2E = $(_0x960C)["attr"]("d")["split"](" ")[2]
      }
      ;_0xAD40 = $(_0x960C)["attr"]("d")["split"](" ")[2]
  });
  var _0xACF8 = parseFloat(_0xAD40) - parseFloat(_0xAD2E);
  var _0xACE6 = new Array();
  var _0xADBE = 0;
  var _0xAD0A = 0;
  var _0xA6EC = new Object();
  var _0xAD76 = getNoteContent()[0]["str"];
  var _0xA596 = _0xAD76["replaceAll"]("\\|\\|", "|")["split"]("|");
  var _0xAD52 = 0;
  var _0xAD1C = new Object();
  $["each"]($("#" + _0xAD9A + " rect[type=\'bar\']"), function(_0x9558, _0x960C) {
      var _0xAC8C = new Object();
      var _0xA6B6 = new Array();
      var _0xA6A4 = new Array();
      var _0x9C72 = new Array();
      var _0x9B9A = "";
      var _0xA722, _0xAE2A, _0xA734, _0xAE3C;
      _0xA722 = Number($(_0x960C)["attr"]("x")) + Number($(_0x960C)["attr"]("width")) / 2;
      _0xAE2A = Number($(_0x960C)["attr"]("y"));
      _0xA734 = Number($(_0x960C)["attr"]("x")) + Number($(_0x960C)["attr"]("width")) / 2;
      _0xAE3C = Number($(_0x960C)["attr"]("y")) + Number($(_0x960C)["attr"]("height"));
      if (_0x961E["indexOf"]("stafflines") > -1) {
          _0xACF8 = Number($(_0x960C)["attr"]("height"))
      }
      ;_0xA6A4["push"](_0xA722["toFixed"](2) * staffscale);
      _0xA6A4["push"]((_0xAE3C - _0xACF8)["toFixed"](2) * staffscale);
      _0xA6A4["push"](_0xA734["toFixed"](2) * staffscale);
      _0xA6A4["push"](_0xAE3C["toFixed"](2) * staffscale);
      _0x9B9A = _0xA596[_0x9558];
      if (_0x9B9A == undefined) {
          return
      }
      ;if (_0x9B9A["replaceAll"](" ", "") == "") {
          return
      }
      ;_0x9B9A = _0x9B9A["replaceAll"](/((![0-9]*!)|(![a-zA-Z]*!)|(!\>!)|(!\<\(!)|(!\<\)!)|(!\>\(!)|(!\>\)!)|\.|v|u|\>|P)/g, "");
      _0x9B9A = _0x9B9A["replaceAll"](":", "")["replaceAll"]("-", "")["replaceAll"]("{.[^}]*}", "");
      _0x9B9A = _0x9B9A["replaceAll"](/\".*\"/, "");
      var _0x9C72 = getNotesLength(_0x9B9A);
      _0xAC8C["notes"] = _0x9C72;
      _0xAC8C["barline_end"] = _0xA6A4;
      if (_0xAD0A != _0xAE3C) {
          _0xA6B6 = new Array();
          var _0xAE18 = new Object();
          var _0xADD0 = 10
            , _0xADF4 = _0xAE2A
            , _0xADE2 = 10
            , _0xAE06 = _0xAE3C;
          _0xA6B6["push"](_0xADD0["toFixed"](2) * staffscale);
          _0xA6B6["push"]((_0xAE06 - _0xACF8)["toFixed"](2) * staffscale);
          _0xA6B6["push"](_0xADE2["toFixed"](2) * staffscale);
          _0xA6B6["push"](_0xAE06["toFixed"](2) * staffscale)
      } else {
          _0xA6B6 = _0xAD1C
      }
      ;_0xAC8C["barline_start"] = _0xA6B6;
      _0xAC8C["linefirst"] = 0;
      _0xAC8C["linelast"] = 0;
      _0xAC8C["node_index"] = _0xAD52++;
      _0xAD0A = _0xAE3C;
      _0xAD1C = _0xA6A4;
      _0xACE6["push"](_0xAC8C)
  });
  _0xACE6[_0xACE6["length"] - 1]["linelast"] = 1;
  if (_0xAD88) {
      _0xACE6["sort"](function(_0x9546, _0x9798) {
          return _0x9546["barline_end"][1] - _0x9798["barline_end"][1]
      })
  }
  ;return _0xACE6
}
function getNodeDatas_v2(_0xADAC) {
  var _0xAE96 = getVNum(_0xADAC);
  var _0x961E = $("#" + _0xADAC)["val"]();
  var _0xAE84 = new Array();
  var _0xAE72;
  var _0xAE4E = 0;
  var _0xAE60 = new Array();
  var _0xACE6 = new Array();
  for (var _0x9558 = 1; _0x9558 <= _0xAE96; _0x9558++) {
      var _0x98B8 = eval("/\\[V:\\s*" + _0x9558 + ".[^\\[]*]/");
      var _0x9D4A = _0x961E["match"](_0x98B8);
      _0xAE72 = _0x9D4A[0];
      _0xAE84["push"](_0xAE72);
      if (_0x9558 > 1) {
          _0xAE60["push"](_0x961E["substring"](_0x961E["indexOf"](_0xAE4E) + _0xAE4E["length"], _0x961E["indexOf"](_0xAE72)))
      }
      ;_0xAE4E = _0xAE72
  }
  ;_0xAE60["push"](_0x961E["substr"](_0x961E["indexOf"](_0xAE72) + _0xAE72["length"]));
  for (var _0x9558 = 0; _0x9558 < _0xAE60["length"]; _0x9558++) {
      var _0xAD76 = _0xAE60[_0x9558];
      var _0xA596 = _0xAD76["split"]("|");
      var _0x9D02 = 0;
      for (var _0x96D2 = 0; _0x96D2 < _0xA596["length"]; _0x96D2++) {
          var _0xAC8C = new Object();
          nodestr = _0xA596[_0x96D2];
          nodestr = replaceSuffix(nodestr);
          if (nodestr["replace"](/\n/, "")["replaceAll"](" ", "") == "") {
              continue
          }
          ;var _0x9C72 = getNotesLength(nodestr);
          _0xAC8C["v"] = _0x9558 + 1;
          _0xAC8C["node_index"] = _0x9D02++;
          _0xAC8C["notes"] = _0x9C72;
          _0xACE6["push"](_0xAC8C)
      }
  }
  ;return _0xACE6
}
function getMetroSpeed(_0x95E8) {
  var _0x9E22;
  var _0x961E = $("#" + _0x95E8)["val"]();
  var _0xAB7E = /Q:.*\n/g;
  var _0xAB90 = _0x961E["match"](_0xAB7E);
  var _0x9CDE = _0xAB90[0]["replaceAll"]("Q:", "")["replaceAll"](" ", "");
  var _0xAB36 = /M:.*\n/g;
  var _0xAB48 = _0x961E["match"](_0xAB36);
  var _0xAB6C = _0xAB48[0]["replaceAll"]("M:", "")["replaceAll"](" ", "");
  if (_0x9CDE == null || _0x9CDE == "") {
      _0x9E22 == 120
  } else {
      var _0x9534 = _0x9CDE["split"]("=");
      var _0xABA2 = _0x9534[0]["split"]("/")[1];
      var _0xABB4 = _0x9534[1];
      var _0x9870 = _0xAB6C["split"]("/")[1];
      if (_0x9870 != null && _0x9870 != "") {
          _0x9E22 = parseInt(_0xABB4) * _0x9870 / _0xABA2
      }
  }
  ;return _0x9E22
}
function updownnote(_0xC31E, _0xC2C4) {
  var _0xC2FA = false;
  var _0xC330 = _0xC31E + "";
  var _0x9C72 = new Array();
  var _0xC30C = /\".[^\"]*\"|\!.[^\!]*\!/g;
  var _0xA6EC;
  var _0xB60A = 0;
  while (_0xA6EC = _0xC30C["exec"](_0xC31E)) {
      if (_0xA6EC["index"] > 0) {
          var _0xC342 = _0xC31E["substring"](_0xB60A, _0xA6EC["index"]);
          updownnote_(_0xC342, _0xB60A, _0x9C72, _0xC2C4)
      }
      ;_0xB60A = _0xA6EC["index"] + _0xA6EC[0]["length"]
  }
  ;if (_0xB60A != _0xC31E["length"]) {
      var _0xC342 = _0xC31E["substring"](_0xB60A);
      updownnote_(_0xC342, _0xB60A, _0x9C72, _0xC2C4)
  }
  ;var _0xBD24 = "";
  for (var _0x9558 = 0; _0x9558 < _0x9C72["length"]; _0x9558++) {
      var _0xC2E8 = _0x9C72[_0x9558];
      var _0xA0BC = _0xC2E8["index"];
      var _0xA02C = 0;
      if (_0x9558 < _0x9C72["length"] - 1) {
          _0xA02C = _0x9C72[_0x9558 + 1]["index"]
      } else {
          _0xA02C = _0xC31E["length"]
      }
      ;var _0x9534 = _0xC31E["substring"](_0xA0BC, _0xA02C);
      _0x9534 = _0x9534["replace"](_0xC2E8["old_note"], _0xC2E8["new_note"]);
      if (_0x9558 == 0) {
          _0x9534 = _0xC31E["substring"](0, _0xA0BC) + _0x9534
      }
      ;_0xBD24 = _0xBD24 + _0x9534
  }
  ;if (_0xC31E["replace"](/\".[^\"]*\"/g, "")["indexOf"]("[") > -1 && _0xC31E["replace"](/\".[^\"]*\"/g, "")["indexOf"]("]") > -1) {
      var _0xB772 = /\[(.*)\]\d*/g;
      _0xC31E = _0xB772["exec"](_0xC31E)[1];
      _0xC2FA = true
  }
  ;if (_0xC2FA) {}
  ;return _0xBD24
}
function updownnote_(_0xC342, _0xB60A, _0x9C72, _0xC2C4) {
  var _0xC354 = null
    , _0xA9AA = "";
  var _0x98B8 = /\^*\_*\=*[A-Ga-gz]\,*\'*/g;
  var _0xC366 = /\^{1,2}|\_{1,2}|\={1}/g;
  var _0x9C2A = "";
  while (_0x9C2A = _0x98B8["exec"](_0xC342)) {
      var _0x958E = new Object();
      _0x958E["old_note"] = _0x9C2A[0];
      _0xC354 = _0x958E["old_note"]["match"](_0xC366);
      if (_0xC354 != null) {
          _0xA9AA = _0xC354[0]
      }
      ;if (_0x958E["old_note"] == "z") {
          _0x958E["new_note"] = "z"
      } else {
          if (_0x958E["old_note"] == "z,") {
              _0x958E["new_note"] = "z,"
          } else {
              if (Math["abs"](_0xC2C4) == 1) {
                  _0x958E["new_note"] = getStandNoteByInterval(_0x9C2A[0], _0xC2C4)
              } else {
                  if (Math["abs"](_0xC2C4) == 12) {
                      _0x958E["new_note"] = getStandNoteByInterval(_0x9C2A[0]["replace"](/[\^\_\=]/g, ""), _0xC2C4);
                      if (_0xA9AA != "") {
                          _0x958E["new_note"] = _0xA9AA + _0x958E["new_note"]["replace"](/[\^\_\=]/g, "")
                      }
                  }
              }
          }
      }
      ;_0x958E["index"] = _0xB60A + _0x9C2A["index"];
      _0x9C72["push"](_0x958E)
  }
}
function updown8(_0xC2D6, _0xC2C4) {
  var _0xB166 = /\[(.+?)\]|\"(.+?)\"|!(.+?)!|[a-gA-G]{1}[,']*/g;
  var _0x9C72 = _0xC2D6["match"](_0xB166);
  var _0xBD24 = "";
  if (_0x9C72 != null) {
      for (var _0x9558 = 0; _0x9558 < _0x9C72["length"]; _0x9558++) {
          var _0x9C06 = _0x9C72[_0x9558]
            , _0x9534 = _0x9C72[_0x9558];
          var _0x9D02 = _0xC2D6["indexOf"](_0x9534);
          _0xBD24 += _0xC2D6["substr"](0, _0x9D02);
          if (_0x9534["indexOf"]("[") > -1) {
              if (_0x9534["indexOf"](":") > -1) {
                  _0xBD24 += _0x9C06
              } else {
                  var _0x9522 = /[a-gA-G]{1}[,']*/g;
                  var _0xC2B2 = _0x9534["match"](_0x9522);
                  for (var _0x96D2 = 0; _0x96D2 < _0xC2B2["length"]; _0x96D2++) {
                      var _0xC2A0 = _0xC2B2[_0x96D2];
                      _0xBD24 += _0x9534["substring"](0, _0x9534["indexOf"](_0xC2A0));
                      _0xBD24 += genUpOrDown8(_0xC2A0, _0xC2C4);
                      _0x9534 = _0x9534["substr"](_0x9534["indexOf"](_0xC2A0) + _0xC2A0["length"])
                  }
                  ;if (_0x9534 != "") {
                      _0xBD24 += _0x9534
                  }
              }
          } else {
              if (_0x9534["indexOf"]("\"") > -1 || _0x9534["indexOf"]("!") > -1) {
                  _0xBD24 += _0x9C06
              } else {
                  _0xBD24 += genUpOrDown8(_0x9534, _0xC2C4)
              }
          }
          ;_0xC2D6 = _0xC2D6["substring"](_0x9D02 + _0x9C06["length"])
      }
      ;if (_0xC2D6 != "") {
          _0xBD24 += _0xC2D6
      }
  }
  ;return _0xBD24
}
var lowerReg = /[a-g]/;
var upperReg = /[A-G]/;
function genUpOrDown8(_0x9534, _0x99A2) {
  if (_0x99A2 == 8) {
      if (lowerReg["test"](_0x9534)) {
          if (_0x9534["indexOf"](",") > -1) {
              return _0x9534["replace"](",", "")
          } else {
              return _0x9534 + "\'"
          }
      } else {
          if (upperReg["test"](_0x9534)) {
              if (_0x9534["indexOf"](",") > -1) {
                  return _0x9534["replace"](",", "")
              } else {
                  if (_0x9534["indexOf"]("\'") > -1) {
                      return _0x9534 + "\'"
                  } else {
                      return _0x9534["toLowerCase"]()
                  }
              }
          }
      }
  } else {
      if (_0x99A2 == -8) {
          if (upperReg["test"](_0x9534)) {
              if (_0x9534["indexOf"]("\'") > -1) {
                  return _0x9534["replace"]("\'", "")
              } else {
                  return _0x9534 + ","
              }
          } else {
              if (lowerReg["test"](_0x9534)) {
                  if (_0x9534["indexOf"]("\'") > -1) {
                      return _0x9534["replace"]("\'", "")
                  } else {
                      if (_0x9534["indexOf"](",") > -1) {
                          return _0x9534 + ","
                      } else {
                          return _0x9534["toUpperCase"]()
                      }
                  }
              }
          }
      }
  }
  ;return _0x9534
}
function setCaretPosition(_0xC0A8, _0xBC70) {
  if (_0xC0A8["setSelectionRange"]) {
      _0xC0A8["focus"]();
      _0xC0A8["setSelectionRange"](_0xBC70, _0xBC70)
  } else {
      if (_0xC0A8["createTextRange"]) {
          var _0xB2BC = _0xC0A8["createTextRange"]();
          _0xB2BC["collapse"](true);
          _0xB2BC["moveEnd"]("character", _0xBC70);
          _0xB2BC["moveStart"]("character", _0xBC70);
          _0xB2BC["select"]()
      }
  }
}
function move2End() {
  var _0x961E = document["getElementById"]("source")["value"];
  if (_0x961E["indexOf"]("w:") > -1 || _0x961E["indexOf"]("N:") > -1) {
      var _0xAF38 = _0x961E["length"];
      var _0x98B8 = /\n(.*)/g;
      var _0x9D4A = _0x961E["match"](_0x98B8);
      if (_0x9D4A != null) {
          for (var _0x9558 = _0x9D4A["length"] - 1; _0x9558 >= 0; _0x9558--) {
              var _0x98DC = _0x9D4A[_0x9558];
              if (_0x98DC["indexOf"]("w:") > -1 || _0x98DC["indexOf"]("N:") > -1) {
                  _0xAF38 = _0xAF38 - _0x98DC["length"]
              } else {
                  break
              }
          }
      }
      ;setCaretPosition(document["getElementById"]("source"), _0xAF38)
  } else {
      moveEnd()
  }
}
function getNoteEndPos() {
  var _0x961E = document["getElementById"]("source")["value"];
  if (_0x961E["indexOf"]("w:") > -1 || _0x961E["indexOf"]("N:") > -1) {
      var _0xAF38 = _0x961E["length"];
      var _0x98B8 = /\n(.*)/g;
      var _0x9D4A = _0x961E["match"](_0x98B8);
      if (_0x9D4A != null) {
          for (var _0x9558 = _0x9D4A["length"] - 1; _0x9558 >= 0; _0x9558--) {
              var _0x98DC = _0x9D4A[_0x9558];
              if (_0x98DC["indexOf"]("w:") > -1 || _0x98DC["indexOf"]("N:") > -1) {
                  _0xAF38 = _0xAF38 - _0x98DC["length"]
              } else {
                  break
              }
          }
      }
      ;return _0xAF38
  }
  ;return _0x961E["length"]
}
function getCurrentLineContent(_0xA878, _0xA842) {
  var _0x961E = document["getElementById"](_0xA878)["value"];
  var _0x98B8 = /\n(.*)/g;
  var _0x9708 = _0x961E["split"]("\x0A");
  var _0xA866 = 0;
  var _0xA854 = 0;
  if (_0x9708 != null) {
      for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
          _0xA854 = _0xA854 + _0x9708[_0x9558]["length"] + 1;
          if (_0xA854 > _0xA842) {
              return _0x9708[_0x9558]
          }
      }
  }
  ;return ""
}
function getLyricDiv_nouse(_0x95E8) {
  $("#lyric_edit_div")["html"]("");
  var _0x961E = $("#" + _0x95E8)["val"]();
  var _0x9708 = _0x961E["split"]("\x0A");
  var _0xAA04 = "<input type=\"text\" style=\"width:40px;margin:1px;\" line=\"var_line\" index=\"var_index\" note=\"var_note\" value=\"var_value\" inner_line=\"0\">";
  var _0xAAA6 = /(\[[\^\_\=A-Ya-y\/1-9,']*\])|(\^){0,1}(\_){0,1}(\=){0,1}[^\[\s\]]{1}[\,\'\/|1-9]*/g;
  var _0x9C18 = /[a-yA-Y]/;
  var _0xAA16 = "";
  var _0xA9F2 = 0;
  var _0xAA28 = 0;
  var _0xAA70 = "";
  if (_0x9708 != null) {
      for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
          var _0x96F6 = _0x9708[_0x9558];
          _0x96F6 = _0x96F6["replaceAll"](/\".*\"/g, "");
          var _0xAA82 = "";
          if ((_0x9558 + 1) < _0x9708["length"]) {
              _0xAA82 = _0x9708[_0x9558 + 1]
          }
          ;_0xAA70 += _0x96F6 + "\x0A";
          if (_0x96F6["replace"](/\[.[^\]]*\]/, "")["replace"](/\{.[^\}]*\}/, "")["indexOf"]("|") > -1) {
              if (_0x96F6["indexOf"]("w:") < 0 && _0x96F6["indexOf"]("N:") < 0) {
                  _0xAA28++;
                  _0xAA16 += "<div line=\"" + (_0xAA28) + "\">";
                  _0x96F6 = _0x96F6["replaceAll"](/\".[^\"]*\"/, "");
                  _0x96F6 = _0x96F6["replaceAll"]("\\|", "");
                  var _0x9C72 = _0x96F6["match"](_0xAAA6);
                  var _0xAA94 = 0;
                  var _0xAA3A = "";
                  if (_0x9C72 != null) {
                      for (var _0x957C = 0; _0x957C < _0x9C72["length"]; _0x957C++) {
                          if (_0x9C18["test"](_0x9C72[_0x957C])) {
                              _0xAA16 += _0xAA04["replace"]("var_index", _0xA9F2++)["replace"]("var_note", _0x9C72[_0x957C])["replace"]("var_value", "value_" + _0xAA94)["replace"]("var_line", _0xAA28);
                              _0xAA3A += _0xAA04["replace"]("var_index", _0xA9F2++)["replace"]("var_note", _0x9C72[_0x957C])["replace"]("var_value", "value_" + _0xAA94)["replace"]("var_line", _0xAA28);
                              _0xAA94++
                          }
                      }
                  }
                  ;if (_0xAA82["indexOf"]("w:") < 0 && _0xAA82["indexOf"]("N:") < 0) {
                      _0xAA70 += "w:\x0A"
                  }
                  ;if (_0xAA82["indexOf"]("w:") > -1) {
                      _0xAA82 = _0xAA82["replace"]("w:", "")["replaceAll"](":", "")["replaceAll"]("\\|", " ");
                      var _0x9A8C = $["trim"](_0xAA82)["split"](" ");
                      var _0xAA4C = 0;
                      if (_0x9A8C != null) {
                          for (var _0x957C = 0; _0x957C < _0x9A8C["length"]; _0x957C++) {
                              if ($["trim"](_0x9A8C[_0x957C]) != "") {
                                  _0xAA16 = _0xAA16["replace"]("value_" + (_0xAA4C++), _0x9A8C[_0x957C]["replace"]("*", ""))
                              }
                          }
                      }
                  }
                  ;var _0xAAB8 = 1;
                  for (j = 2; j < 4; j++) {
                      if ((_0x9558 + j) < _0x9708["length"]) {
                          n_line = _0x9708[_0x9558 + j];
                          if (n_line["indexOf"]("w:") > -1) {
                              n_line = n_line["replace"]("w:", "")["replaceAll"](":", "")["replaceAll"]("\\|", " ");
                              ;;var _0xAA5E = _0xAA3A;
                              var _0x9A8C = $["trim"](n_line)["split"](" ");
                              var _0xAA4C = 0;
                              if (_0x9A8C != null) {
                                  for (var _0x957C = 0; _0x957C < _0x9A8C["length"]; _0x957C++) {
                                      if ($["trim"](_0x9A8C[_0x957C]) != "") {
                                          _0xAA5E = _0xAA5E["replace"]("inner_line=\"0\"", "inner_line=\"" + _0xAAB8 + "\"")["replace"]("value_" + (_0xAA4C++), _0x9A8C[_0x957C]["replace"]("*", ""))
                                      }
                                  }
                              }
                              ;_0xAA16 += "<br>" + _0xAA5E
                          } else {
                              break
                          }
                          ;_0xAAB8++
                      }
                  }
                  ;_0xAA16 = _0xAA16["replace"](/value\_[0-9]{1,2}/g, "");
                  _0xAA16 += "<input type=\"button\" value=\"+\" onclick=\"add_lyric_line(\'" + _0x95E8 + "\'," + _0xAA28 + ")\">";
                  _0xAA16 += "</div><hr>"
              }
          }
      }
  }
  ;_0xAA70 = replaceBlankLine(_0xAA70);
  $("#" + _0x95E8)["val"](_0xAA70);
  return _0xAA16
}
function add_lyric_line(_0x95E8, _0x95C4) {
  var _0x95D6 = getMaxInnerLine(_0x95C4);
  $["each"]($("#lyric_edit_div input[line=\'" + _0x95C4 + "\'][inner_line=\'0\']"), function(_0x9558, _0x960C) {
      var _0x95FA = $(_0x960C)["clone"]();
      $(_0x95FA)["attr"]("inner_line", _0x95D6 + 1)["val"]("");
      $("#lyric_edit_div div[line=\'" + _0x95C4 + "\']")["append"](_0x95FA)
  });
  $("#lyric_edit_div div[line=\'" + _0x95C4 + "\']")["append"]($("<br>"));
  $("#lyric_edit_div input")["on"]("input", function() {
      lyricInputChangeHandler(this, _0x95E8)
  })
}
function getMaxInnerLine(_0x95C4) {
  var _0xAACA = 0;
  $["each"]($("#lyric_edit_div input[line=\'" + _0x95C4 + "\']"), function(_0x9558, _0x960C) {
      var _0xAADC = $(_0x960C)["attr"]("inner_line");
      if (parseInt(_0xAADC) > _0xAACA) {
          _0xAACA = parseInt(_0xAADC)
      }
  });
  return _0xAACA
}
function findLineNumByIndex(_0x961E, _0x9D02) {
  var _0x9708 = _0x961E["split"]("\x0A");
  var _0xA476 = 0;
  for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
      _0xA476 += _0x9708[_0x9558]["length"] + 1;
      if (_0xA476 > _0x9D02) {
          return _0x9558
      }
  }
  ;return 0
}
function note_lyrics_data(_0x95E8) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  for (var _0x96D2 = 0; _0x96D2 < syms["length"]; _0x96D2++) {
      if (!syms[_0x96D2]) {
          continue
      }
      ;syms[_0x96D2]["line"] = findLineNumByIndex(_0x961E, syms[_0x96D2]["istart"])
  }
  ;return syms
}
function getHeadStaff(_0x95E8) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  var _0x9708 = _0x961E["split"]("\x0A");
  var _0xA8E4 = "";
  var _0xA8D2 = getFirstNoteLine(_0x95E8);
  for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
      if (_0x9558 < _0xA8D2) {
          var _0x96F6 = _0x9708[_0x9558];
          _0xA8E4 += _0x96F6 + "\x0A"
      }
  }
  ;return _0xA8E4
}
function getPartStaff(_0x95E8, _0xA0BC, _0xA02C, _0xB0C4) {
  var _0xA8D2 = getFirstNoteLine(_0x95E8);
  var _0xB08E = note_lyrics_data(_0x95E8);
  var _0x961E = $("#" + _0x95E8)["val"]();
  var _0x9774 = "";
  var _0xB06A = -1;
  var _0xB058 = -1;
  var _0x9AB0 = new Array();
  var _0xA6EC = new Object();
  if (_0xB0C4) {
      var _0xB0B2 = -1;
      var _0xB010 = -1;
      for (var _0x9558 = 0; _0x9558 < _0xB08E["length"]; _0x9558++) {
          if (!_0xB08E[_0x9558]) {
              continue
          }
          ;if (_0xB08E[_0x9558]["istart"] == _0xA0BC || getLyricIstart(_0xB08E[_0x9558])["indexOf"](_0xA0BC) > -1) {
              _0xB0B2 = _0xB08E[_0x9558]["bar_index"]
          }
          ;if (_0xB08E[_0x9558]["istart"] == _0xA02C || getLyricIstart(_0xB08E[_0x9558])["indexOf"](_0xA02C) > -1) {
              _0xB010 = _0xB08E[_0x9558]["bar_index"]
          }
      }
      ;for (var _0x9558 = 0; _0x9558 < _0xB08E["length"]; _0x9558++) {
          if (_0xB08E[_0x9558]["line"] < _0xA8D2) {
              continue
          }
          ;var _0x9EC4 = _0xB08E[_0x9558]["istart"];
          var _0xB046 = _0xB08E[_0x9558]["iend"];
          var _0xB034 = _0xB08E[_0x9558]["bar_index"];
          var _0xB07C = _0xB08E[_0x9558]["a_ly"];
          var _0xA104 = _0xB08E[_0x9558]["v"];
          var _0xB0A0 = new Object();
          _0xB0A0["v"] = _0xA104;
          if (_0xA104 == 1 && _0xB08E[_0x9558]["type"] == 0) {}
          ;_0xB0A0["staff"] = "";
          _0xB0A0["lyrics"] = new Array();
          var _0xB022 = false;
          for (var _0x96D2 = 0; _0x96D2 < _0x9AB0["length"]; _0x96D2++) {
              if (_0x9AB0[_0x96D2]["v"] == _0xA104) {
                  _0xB0A0 = _0x9AB0[_0x96D2];
                  _0xB022 = true;
                  break
              }
          }
          ;if (!_0xB022) {
              _0x9AB0["push"](_0xB0A0)
          }
          ;if (_0xB034 >= _0xB0B2 && _0xB034 <= _0xB010) {
              if (_0xB058 != -1 && _0x9EC4 > _0xB058 && _0xB0A0["staff"] != "") {
                  var _0x9990 = _0x961E["substring"](_0xB058, _0x9EC4);
                  if (_0x9990["indexOf"]("\x0A") < 0) {
                      _0xB0A0["staff"] += _0x9990
                  }
              }
              ;if (_0xB06A != -1 && _0xB06A != _0xB08E[_0x9558]["line"] && _0xB0A0["staff"] != "") {
                  _0xB0A0["staff"] += "\x0A"
              }
              ;_0xB0A0["staff"] += _0x961E["substring"](_0x9EC4, _0xB046);
              handleLyric(_0xB08E[_0x9558], _0xB0A0, _0xB06A, _0x961E)
          }
          ;_0xB06A = _0xB08E[_0x9558]["line"];
          _0xB058 = _0xB08E[_0x9558]["iend"]
      }
  } else {
      for (var _0x9558 = 0; _0x9558 < _0xB08E["length"]; _0x9558++) {
          if (_0xB08E[_0x9558]["istart"] == _0xA0BC || getLyricIstart(_0xB08E[_0x9558])["indexOf"](_0xA0BC) > -1) {
              _0xA0BC = _0xB08E[_0x9558]["istart"]
          }
          ;if (_0xB08E[_0x9558]["istart"] == _0xA02C || getLyricIstart(_0xB08E[_0x9558])["indexOf"](_0xA02C) > -1) {
              _0xA02C = _0xB08E[_0x9558]["istart"]
          }
      }
      ;for (var _0x9558 = 0; _0x9558 < _0xB08E["length"]; _0x9558++) {
          var _0x9EC4 = _0xB08E[_0x9558]["istart"];
          var _0xB046 = _0xB08E[_0x9558]["iend"];
          var _0xA104 = _0xB08E[_0x9558]["v"];
          var _0xB0A0 = new Object();
          _0xB0A0["v"] = _0xA104;
          _0xB0A0["staff"] = "";
          _0xB0A0["lyrics"] = new Array();
          var _0xB022 = false;
          for (var _0x96D2 = 0; _0x96D2 < _0x9AB0["length"]; _0x96D2++) {
              if (_0x9AB0[_0x96D2]["v"] == _0xA104) {
                  _0xB0A0 = _0x9AB0[_0x96D2];
                  _0xB022 = true;
                  break
              }
          }
          ;if (!_0xB022) {
              _0x9AB0["push"](_0xB0A0)
          }
          ;if (_0x9EC4 >= _0xA0BC && _0x9EC4 <= _0xA02C) {
              if (_0xB058 != -1 && _0x9EC4 > _0xB058 && _0xB0A0["staff"] != "") {
                  var _0x9990 = _0x961E["substring"](_0xB058, _0x9EC4);
                  if (_0x9990["indexOf"]("\x0A") < 0) {
                      _0xB0A0["staff"] += _0x9990
                  }
              }
              ;if (_0xB06A != -1 && _0xB06A != _0xB08E[_0x9558]["line"]) {
                  _0xB0A0["staff"] += "\x0A"
              }
              ;_0xB0A0["staff"] += _0x961E["substring"](_0x9EC4, _0xB046);
              handleLyric(_0xB08E[_0x9558], _0xB0A0, _0xB06A, _0x961E)
          }
          ;_0xB06A = _0xB08E[_0x9558]["line"];
          _0xB058 = _0xB08E[_0x9558]["iend"]
      }
  }
  ;return arr2Str(_0x9AB0)
}
function getLyricIstart(_0x98DC) {
  var _0x9AD4 = new Array();
  if (_0x98DC["a_ly"]) {
      for (var _0x9558 = 0; _0x9558 < _0x98DC["a_ly"]["length"]; _0x9558++) {
          if (_0x98DC["a_ly"][_0x9558]) {
              _0x9AD4["push"](_0x98DC["a_ly"][_0x9558]["istart"])
          }
      }
  }
  ;return _0x9AD4
}
function arr2Str(_0x9AB0) {
  var _0x9534 = "";
  if (_0x9AB0 != null) {
      for (var _0x9558 = 0; _0x9558 < _0x9AB0["length"]; _0x9558++) {
          if (_0x9AB0["length"] > 1) {
              _0x9534 += "V:" + (_0x9558 + 1) + "\x0A"
          }
          ;var _0x9774 = _0x9AB0[_0x9558]["staff"];
          var _0x9AC2 = _0x9774["split"]("\x0A");
          for (var _0x957C = 0; _0x957C < _0x9AC2["length"]; _0x957C++) {
              _0x9534 += _0x9AC2[_0x957C] + "\x0A";
              var _0x9A8C = _0x9AB0[_0x9558]["lyrics"];
              for (var _0x96D2 = 0; _0x96D2 < _0x9A8C["length"]; _0x96D2++) {
                  var _0x9A9E = _0x9A8C[_0x96D2]["words"]["split"]("\x0A");
                  if (_0x9A9E[_0x957C]) {
                      _0x9534 += "w:" + _0x9A9E[_0x957C] + "\x0A"
                  }
              }
          }
      }
  }
  ;return _0x9534
}
function handleLyric(_0x98DC, _0xB0A0, _0xB06A, _0x961E) {
  var _0xB07C = _0x98DC["a_ly"];
  if (_0x98DC["a_ly"] && _0xB07C != null) {
      for (var _0x957C = 0; _0x957C < _0xB07C["length"]; _0x957C++) {
          var _0xA986 = _0xB07C[_0x957C];
          var _0xB4B4 = new Object();
          _0xB4B4["field"] = _0x957C;
          _0xB4B4["words"] = "";
          var _0xB4A2 = false;
          for (var _0x969C = 0; _0x969C < _0xB0A0["lyrics"]["length"]; _0x969C++) {
              if (_0xB0A0["lyrics"][_0x969C]["field"] == _0x957C) {
                  _0xB4B4 = _0xB0A0["lyrics"][_0x969C];
                  _0xB4A2 = true;
                  break
              }
          }
          ;if (!_0xB4A2) {
              _0xB0A0["lyrics"]["push"](_0xB4B4)
          }
          ;if (_0xA986 != null) {
              if (_0xB4B4["iend"] && _0xA986["istart"] > _0xB4B4["iend"] && _0xB4B4["words"] != "") {
                  var _0xB4C6 = _0x961E["substring"](_0xB4B4["iend"], _0xA986["istart"]);
                  if (_0xB4C6["indexOf"]("\x0A") < 0) {
                      _0xB4B4["words"] += _0xB4C6["replaceAll"]("\\|", "")["replaceAll"]("\\*", "")
                  }
              }
              ;if (_0xB4B4["line"] && _0xB4B4["line"] != -1 && _0xB4B4["line"] != _0x98DC["line"]) {
                  _0xB4B4["words"] += "\x0A"
              }
              ;_0xB4B4["words"] += _0x961E["substring"](_0xA986["istart"], _0xA986["iend"]);
              _0xB4B4["iend"] = _0xA986["iend"];
              _0xB4B4["line"] = _0x98DC["line"]
          }
      }
  } else {
      if (_0x98DC["type"] == 0) {
          for (var _0x9558 = 0; _0x9558 < _0xB0A0["lyrics"]["length"]; _0x9558++) {
              var _0xB4B4 = _0xB0A0["lyrics"][_0x9558];
              if (_0xB4B4["line"] && _0xB4B4["line"] != -1 && _0xB4B4["line"] != _0x98DC["line"]) {
                  _0xB4B4["words"] += "\x0A"
              }
              ;_0xB4B4["words"] += "|";
              _0xB4B4["line"] = _0x98DC["line"]
          }
      } else {
          if (_0x98DC["type"] == 8) {
              for (var _0x9558 = 0; _0x9558 < _0xB0A0["lyrics"]["length"]; _0x9558++) {
                  var _0xB4B4 = _0xB0A0["lyrics"][_0x9558];
                  if (_0xB4B4["line"] && _0xB4B4["line"] != -1 && _0xB4B4["line"] != _0x98DC["line"]) {
                      _0xB4B4["words"] += "\x0A"
                  }
                  ;_0xB4B4["words"] += "*";
                  _0xB4B4["line"] = _0x98DC["line"]
              }
          }
      }
  }
}
function getFirstNoteLine(_0x95E8) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  var _0x9708 = _0x961E["split"]("\x0A");
  for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
      var _0x96F6 = _0x9708[_0x9558];
      if (_0x96F6["indexOf"]("%%") == 0 || _0x96F6["indexOf"]("X:") == 0 || _0x96F6["indexOf"]("T:") == 0 || _0x96F6["indexOf"]("C:") == 0 || _0x96F6["indexOf"]("L:") == 0 || _0x96F6["indexOf"]("Q:") == 0 || _0x96F6["indexOf"]("M:") == 0 || _0x96F6["indexOf"]("K:") == 0) {
          continue
      }
      ;if (_0x96F6["indexOf"]("|") > -1) {
          return _0x9558
      }
  }
  ;return 0
}
function note_lyrics(_0x95E8) {
  var _0xAAA6 = /(\[[\^\_\=A-Ya-y\/1-9,']*\])|(\^){0,1}(\_){0,1}(\=){0,1}[^\[\s\]]{1}[\,\'\/|1-9]*/g;
  var _0x9C18 = /[a-yA-Y]/;
  var _0x961E = $("#" + _0x95E8)["val"]();
  var _0x9708 = _0x961E["split"]("\x0A");
  var note_lyrics = new Array();
  var _0xB7A8 = 0;
  var _0x9B64 = 0;
  for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
      _0x9B64 = _0x9B64 + _0x9708[_0x9558]["length"];
      var _0x96F6 = _0x9708[_0x9558]["replaceAll"](/\".[^\"]*\"/g, "");
      if (_0x96F6["replace"](/\[.[^\]]*\]/, "")["replace"](/\{.[^\}]*\}/, "")["indexOf"]("|") > -1) {
          if (_0x96F6["indexOf"]("w:") > -1 || _0x96F6["indexOf"]("N:") > -1) {} else {
              var _0xA01A = 0;
              var _0x9C72 = new Array();
              var _0x983A = new Object();
              _0x96F6 = _0x96F6["replaceAll"](/(\!.*\!|\([1-9]|\".[^\"]*\"|\.|v|u|\>|P)/g, "");
              _0x96F6 = _0x96F6["replaceAll"](/\[K.[^\]]*\]/g, "");
              _0x96F6 = _0x96F6["replaceAll"](":", "")["replaceAll"]("-", "")["replaceAll"]("{.[^}]*}", "");
              _0x96F6 = _0x96F6["replaceAll"](/\".[^\"]*\"/g, "");
              _0x96F6 = _0x96F6["replaceAll"](/\(/g, "");
              _0x96F6 = _0x96F6["replaceAll"](/\)/g, "");
              var _0x9D4A = _0x96F6["match"](_0xAAA6);
              if (_0x9D4A != null) {
                  for (var _0x96D2 = 0; _0x96D2 < _0x9D4A["length"]; _0x96D2++) {
                      if (_0x9C18["test"](_0x9D4A[_0x96D2])) {
                          if (_0x9D4A[_0x96D2]["indexOf"]("K") > -1) {
                              continue
                          }
                          ;var _0x9C06 = new Object();
                          _0x9C06["note"] = _0x9D4A[_0x96D2];
                          _0x9C06["index"] = _0xA01A++;
                          _0x9C72["push"](_0x9C06)
                      }
                  }
                  ;_0x983A["notes"] = _0x9C72;
                  _0x983A["line_index"] = _0xB7A8++;
                  _0x983A["lyrics"] = new Array();
                  for (var _0x957C = 1; _0x957C < 10; _0x957C++) {
                      if ((_0x957C + _0x9558) < _0x9708["length"]) {
                          var _0x95C4 = _0x957C + _0x9558;
                          var _0xA974 = _0x9708[_0x95C4];
                          var _0xB208 = getLyricByLineStr(_0xA974);
                          if (_0xB208 == null) {
                              break
                          } else {
                              _0x983A["lyrics"]["push"](_0xB208)
                          }
                      }
                  }
                  ;note_lyrics["push"](_0x983A)
              }
          }
      }
  }
  ;return positionNotes(_0x95E8, note_lyrics)
}
function positionNotes(_0x95E8, note_lyrics) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  _0x961E = _0x961E + "\x0A";
  var _0xB826 = /.*\n/g;
  var _0x9708 = _0x961E["match"](_0xB826);
  var _0x9B64 = 0;
  if (_0x9708 != null) {
      var _0xB84A = -1;
      for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
          var _0x96F6 = _0x9708[_0x9558];
          var _0xB85C = _0x9708[_0x9558]["replace"](/\[.[^\]]*\]/, "")["replace"](/\{.[^\}]*\}/, "");
          if (_0xB85C["indexOf"]("|") > -1 && _0xB85C["indexOf"]("w:") < 0 && _0xB85C["indexOf"]("N:") < 0) {
              var _0x9B1C = 0;
              _0xB84A++;
              var _0x9C72 = note_lyrics[_0xB84A]["notes"];
              var _0x9522 = /(\".[^\"]*\")|(\!.[^\!]*\!)|\[K.[^\]]*\]/g;
              var _0xB838 = _0x96F6["replace"](_0x9522, function(_0xB86E, _0xB880) {
                  return _0xB86E["replace"](/./g, " ")
              });
              var _0xA998 = 0;
              var _0xA962 = 0;
              for (var _0x96D2 = 0; _0x96D2 < _0x9C72["length"]; _0x96D2++) {
                  var _0x9C06 = _0x9C72[_0x96D2]["note"];
                  _0x9C72[_0x96D2]["pos"] = _0x9B64 + _0xB838["indexOf"](_0x9C06);
                  var _0xA9AA = _0x961E["substring"](_0x9B64, _0x9C72[_0x96D2]["pos"]);
                  _0xA9AA = trimLeft(_0xA9AA);
                  _0xA9AA = _0xA9AA["replace"](/\".[^\"]*\"/g, "");
                  if (_0xA9AA["startWith"]("\\|")) {
                      _0xA9AA = _0xA9AA["substring"](1)
                  }
                  ;_0xA9AA = _0xA9AA["replaceAll"](/\|\|/g, "|")["replaceAll"](/\:\:/g, "|");
                  _0x9B1C = _0xA9AA["split"]("|")["length"] - 1;
                  _0x9C72[_0x96D2]["nodeIndex"] = _0x9B1C;
                  if (_0xA962 != _0x9B1C) {
                      _0xA998 = 0
                  }
                  ;_0x9C72[_0x96D2]["noteInNodeIndex"] = _0xA998++;
                  _0xA962 = _0x9B1C;
                  _0xB838 = _0xB838["replace"](_0x9C06, function(_0xB86E, _0xB880) {
                      return _0xB86E["replace"](/./g, " ")
                  })
              }
          }
          ;if ($["trim"](_0x9708[_0x9558]) != "") {
              _0x9B64 += _0x9708[_0x9558]["length"]
          }
      }
  }
  ;return note_lyrics
}
function getLyricByLineStr(_0xA974) {
  if (_0xA974["indexOf"]("w:") < 0) {
      return null
  }
  ;var _0x9534 = _0xA974["replace"]("w:", "")["replace"](/\|/g, " ");
  _0x9534 = trimLeft(_0x9534);
  var _0xA9E0 = _0x9534["split"](" ");
  var _0x9D4A = new Array();
  if (_0xA9E0 != null) {
      var _0xA9BC = 0;
      var _0xA9AA = "";
      var _0xA998 = 0;
      var _0xA962 = 0;
      for (var _0x9558 = 0; _0x9558 < _0xA9E0["length"]; _0x9558++) {
          if ($["trim"](_0xA9E0[_0x9558]) != "") {
              var _0x9B1C = 0;
              var _0xA9CE = _0xA974["replace"](_0xA9AA, "");
              _0xA9AA += _0xA9CE["substring"](0, _0xA9CE["indexOf"](_0xA9E0[_0x9558]) + _0xA9E0[_0x9558]["length"]);
              var _0xA986 = new Object();
              _0xA986["word"] = _0xA9E0[_0x9558];
              _0xA986["nodeIndex"] = _0xA9AA["split"]("|")["length"] - 1;
              if (_0xA986["nodeIndex"] != _0xA962) {
                  _0xA998 = 0
              }
              ;_0xA986["noteInNodeIndex"] = _0xA998++;
              _0x9D4A["push"](_0xA986);
              _0xA962 = _0xA986["nodeIndex"]
          }
      }
  }
  ;return _0x9D4A
}
function getNotePositionBySelectLyric(_0x95E8) {
  var _0xACB0 = getSelectText(_0x95E8);
  var _0xAFDA = getStartPos(document["getElementById"](_0x95E8));
  var _0x961E = $("#" + _0x95E8)["val"]();
  var _0x9708 = _0x961E["split"]("\x0A");
  var _0x95C4 = 0;
  var _0x9D02 = 0;
  var _0xAF6E = 0;
  var _0xA6EC = new Object();
  var _0xAF5C = false;
  for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
      var _0x96F6 = _0x9708[_0x9558];
      if (_0x96F6["indexOf"]("|") > -1) {
          _0xAF5C = true
      } else {
          _0xAF5C = false
      }
      ;_0x9D02 += _0x96F6["length"] + 1;
      var _0xAF80 = _0x9708[_0x9558]["replaceAll"](/\".*\"/g, "");
      if (_0xAF80["replace"](/\[.[^\]]*\]/, "")["replace"](/\{.[^\}]*\}/, "")["indexOf"]("|") > -1) {
          if (_0xAF80["indexOf"]("w:") < 0 && _0xAF80["indexOf"]("N:") < 0) {
              _0xA6EC["line_index"] = _0x95C4++;
              _0xA6EC["note_index"] = 0
          }
      }
      ;if (_0x9D02 > _0xAFDA) {
          var _0xAFB6 = _0x961E["substring"](_0xAF6E, _0xAFDA);
          if (_0xAFB6["indexOf"]("w:") > -1) {
              var _0xAFC8 = /[ ]{1,}/g;
              _0xA6EC["nodeIndex"] = _0xAFB6["split"]("|")["length"] - 1;
              var _0xAFFE = _0xAFB6["split"]("|")[_0xA6EC["nodeIndex"]]["replace"]("w:", "")["replace"](_0xAFC8, " ");
              var _0xAFEC = _0xAFFE["split"](" ");
              var _0x9B64 = 0;
              for (var _0x9558 = 0; _0x9558 < _0xAFEC["length"]; _0x9558++) {
                  if ($["trim"](_0xAFEC[_0x9558]) != "") {
                      _0x9B64++
                  }
              }
              ;_0xA6EC["note_index"] = _0x9B64
          }
          ;break
      }
      ;_0xAF6E += _0x96F6["length"] + 1;
      _0x96F6 = _0x9708[_0x9558]["replaceAll"](/\".*\"/g, "")
  }
  ;var _0xAF4A = note_lyrics(_0x95E8);
  for (var _0x9558 = 0; _0x9558 < _0xAF4A["length"]; _0x9558++) {
      var _0xAF92 = _0xAF4A[_0x9558];
      if (_0xAF92["line_index"] == _0xA6EC["line_index"]) {
          var _0xAFA4 = _0xAF92["notes"];
          for (var _0x96D2 = 0; _0x96D2 < _0xAFA4["length"]; _0x96D2++) {
              if (_0xAF5C) {
                  if (_0xAFA4[_0x96D2]["noteInNodeIndex"] == _0xA6EC["note_index"] && _0xAFA4[_0x96D2]["nodeIndex"] == _0xA6EC["nodeIndex"]) {
                      _0xA6EC["pos"] = _0xAFA4[_0x96D2]["pos"]
                  }
              } else {
                  if (_0xAFA4[_0x96D2]["index"] == _0xA6EC["note_index"]) {
                      _0xA6EC["pos"] = _0xAFA4[_0x96D2]["pos"]
                  }
              }
          }
      }
  }
  ;return _0xA6EC
}
function getSelectNotePosition(_0x95E8) {
  var _0xACB0 = getSelectText(_0x95E8);
  var _0xAFDA = getStartPos(document["getElementById"](_0x95E8));
  var _0x961E = $("#" + _0x95E8)["val"]();
  var _0x9708 = _0x961E["split"]("\x0A");
  var _0x95C4 = 0;
  var _0x9D02 = 0;
  var _0xAF6E = 0;
  var _0xA6EC = new Object();
  for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
      var _0x96F6 = _0x9708[_0x9558];
      _0x9D02 += _0x96F6["length"] + 1;
      var _0xAF80 = _0x9708[_0x9558]["replaceAll"](/\".*\"/g, "");
      if (_0xAF80["replace"](/\[.[^\]]*\]/, "")["replace"](/\{.[^\}]*\}/, "")["indexOf"]("|") > -1) {
          if (_0xAF80["indexOf"]("w:") < 0) {
              _0xA6EC["line_index"] = _0x95C4++;
              _0xA6EC["note_index"] = 0
          }
      }
      ;if (_0x9D02 > _0xAFDA) {
          var _0xAFB6 = _0x961E["substring"](_0xAF6E, _0xAFDA);
          var _0xAAA6 = /(\[[\^\_\=A-Ya-y\/1-9,']*\])|(\^){0,1}(\_){0,1}(\=){0,1}[^\[\s\]]{1}[\,\'\/|1-9]*/g;
          var _0x9C18 = /[a-yA-Y]/;
          _0xAFB6 = _0xAFB6["replaceAll"](/((![0-9]*!)|(![a-zA-Z]*!)|(!\>!)|(!\<\(!)|(!\<\)!)|(!\>\(!)|(!\>\)!)|\.|v|u|\>|P)/g, "");
          _0xAFB6 = _0xAFB6["replaceAll"](":", "")["replaceAll"]("-", "")["replaceAll"]("{.[^}]*}", "");
          _0xAFB6 = _0xAFB6["replaceAll"](/\".*\"/, "");
          _0xAFB6 = _0xAFB6["replaceAll"](/\(/g, "");
          _0xAFB6 = _0xAFB6["replaceAll"](/\)/g, "");
          var _0x9D4A = _0xAFB6["match"](_0xAAA6);
          if (_0x9D4A != null) {
              var _0x969C = 0;
              for (var _0x96D2 = 0; _0x96D2 < _0x9D4A["length"]; _0x96D2++) {
                  if (_0x9C18["test"](_0x9D4A[_0x96D2])) {
                      if (_0x9D4A[_0x96D2]["indexOf"]("K") > -1) {
                          continue
                      }
                      ;_0xA6EC["note_index"] = ++_0x969C
                  }
              }
          }
          ;break
      }
      ;_0xAF6E += _0x96F6["length"] + 1;
      _0x96F6 = _0x9708[_0x9558]["replaceAll"](/\".*\"/g, "")
  }
  ;return _0xA6EC
}
function getSelectLyric(_0x95E8, _0xA0BC, _0xA02C) {
  var _0xB1AE = note_lyrics(_0x95E8);
  var _0xB250 = _0xA0BC["line_index"];
  var _0xB23E = _0xA0BC["note_index"];
  var _0xB1E4 = _0xA02C["line_index"];
  var _0xB1D2 = _0xA02C["note_index"];
  var _0x9D4A = new Array();
  if (_0xB1E4 > _0xB1AE["length"]) {
      _0xB1E4 = _0xB1AE["length"] - 1
  }
  ;for (var _0x9558 = _0xB250; _0x9558 <= _0xB1E4; _0x9558++) {
      var _0xA6EC = new Object();
      _0xA6EC["line_index"] = _0x9558;
      _0xA6EC["lyrics"] = new Array();
      var _0x96F6 = _0xB1AE[_0x9558];
      var _0xB21A = _0x96F6["lyrics"];
      var _0xB22C = _0x96F6["notes"];
      if (_0xB21A != null && _0xB21A["length"] > 0) {
          for (var _0x96D2 = 0; _0x96D2 < _0xB21A["length"]; _0x96D2++) {
              var _0x9B1C = 0;
              var _0xB1C0 = -1;
              var _0xB262 = "w:";
              var _0xB208 = _0xB21A[_0x96D2];
              var _0xB1F6 = false;
              if (_0xB208 != null) {
                  if (_0x9558 == _0xB250) {
                      if (_0xB208["length"] < _0xB22C["length"]) {
                          for (var _0x957C = _0xB23E; _0x957C < _0xB22C["length"]; _0x957C++) {
                              var _0x9C06 = _0xB22C[_0x957C];
                              for (var _0x9870 = 0; _0x9870 < _0xB208["length"]; _0x9870++) {
                                  var _0xA986 = _0xB208[_0x9870];
                                  if (_0xA986["nodeIndex"] == _0x9C06["nodeIndex"] && _0xA986["noteInNodeIndex"] == _0x9C06["noteInNodeIndex"]) {
                                      _0x9B1C = _0xA986["nodeIndex"];
                                      if (_0xB1C0 == -1) {
                                          _0xB1C0 = _0x9B1C
                                      }
                                      ;if (_0xB1C0 < _0x9B1C) {
                                          for (var _0x969C = _0xB1C0; _0x969C < _0x9B1C; _0x969C++) {
                                              _0xB262 = _0xB262 + "|";
                                              _0xB1F6 = true
                                          }
                                      }
                                      ;_0xB1C0 = _0x9B1C;
                                      _0xB262 += _0xA986["word"] + " "
                                  }
                              }
                          }
                      } else {
                          var _0x9B64 = _0xB208["length"] - 1;
                          if (_0xB250 == _0xB1E4) {
                              _0x9B64 = _0xB1D2
                          }
                          ;for (var _0x957C = _0xB23E; _0x957C <= _0x9B64; _0x957C++) {
                              _0x9B1C = _0xB208[_0x957C]["nodeIndex"];
                              if (_0xB1C0 == -1) {
                                  _0xB1C0 = _0x9B1C
                              }
                              ;if (_0xB1C0 < _0x9B1C) {
                                  for (var _0x969C = _0xB1C0; _0x969C < _0x9B1C; _0x969C++) {
                                      _0xB262 = _0xB262 + "|";
                                      _0xB1F6 = true
                                  }
                              }
                              ;_0xB1C0 = _0x9B1C;
                              _0xB262 += _0xB208[_0x957C]["word"] + " "
                          }
                      }
                  } else {
                      if (_0x9558 == _0xB1E4) {
                          if (_0xB208["length"] < _0xB22C["length"]) {
                              for (var _0x957C = 0; _0x957C <= _0xB1D2; _0x957C++) {
                                  var _0x9C06 = _0xB22C[_0x957C];
                                  for (var _0x9870 = 0; _0x9870 < _0xB208["length"]; _0x9870++) {
                                      var _0xA986 = _0xB208[_0x9870];
                                      if (_0xA986["nodeIndex"] == _0x9C06["nodeIndex"] && _0xA986["noteInNodeIndex"] == _0x9C06["noteInNodeIndex"]) {
                                          _0x9B1C = _0xA986["nodeIndex"];
                                          if (_0xB1C0 == -1) {
                                              _0xB1C0 = _0x9B1C
                                          }
                                          ;if (_0xB1C0 < _0x9B1C) {
                                              for (var _0x969C = _0xB1C0; _0x969C < _0x9B1C; _0x969C++) {
                                                  _0xB262 = _0xB262 + "|";
                                                  _0xB1F6 = true
                                              }
                                          }
                                          ;_0xB1C0 = _0x9B1C;
                                          _0xB262 += _0xA986["word"] + " "
                                      }
                                  }
                              }
                          } else {
                              for (var _0x957C = 0; _0x957C <= _0xB1D2; _0x957C++) {
                                  _0x9B1C = _0xB208[_0x957C]["nodeIndex"];
                                  if (_0xB1C0 == -1) {
                                      _0xB1C0 = _0x9B1C
                                  }
                                  ;if (_0xB1C0 < _0x9B1C) {
                                      for (var _0x969C = _0xB1C0; _0x969C < _0x9B1C; _0x969C++) {
                                          _0xB262 = _0xB262 + "|";
                                          _0xB1F6 = true
                                      }
                                  }
                                  ;_0xB1C0 = _0x9B1C;
                                  _0xB262 += _0xB208[_0x957C]["word"] + " "
                              }
                          }
                      } else {
                          for (var _0x957C = 0; _0x957C < _0xB208["length"]; _0x957C++) {
                              _0x9B1C = _0xB208[_0x957C]["nodeIndex"];
                              if (_0xB1C0 == -1) {
                                  _0xB1C0 = _0x9B1C
                              }
                              ;if (_0xB1C0 < _0x9B1C) {
                                  for (var _0x969C = _0xB1C0; _0x969C < _0x9B1C; _0x969C++) {
                                      _0xB262 = _0xB262 + "|";
                                      _0xB1F6 = true
                                  }
                              }
                              ;_0xB1C0 = _0x9B1C;
                              _0xB262 += _0xB208[_0x957C]["word"] + " "
                          }
                      }
                  }
              }
              ;if (_0xB1F6) {
                  _0xB262 += "|\x0A"
              }
              ;_0xA6EC["lyrics"]["push"](_0xB262)
          }
      }
      ;_0x9D4A["push"](_0xA6EC)
  }
  ;return _0x9D4A
}
function testSelectLyric(_0xC210, _0xC234, _0xC1FE, _0xC222) {
  var _0xA0BC = new Object();
  _0xA0BC["line_index"] = _0xC210;
  _0xA0BC["note_index"] = _0xC234;
  var _0xA02C = new Object();
  _0xA02C["line_index"] = _0xC1FE;
  _0xA02C["note_index"] = _0xC222;
  var _0xC246 = getSelectLyric("source", _0xA0BC, _0xA02C);
  console["log"]("selectLyric:", _0xC246)
}
function convert2Rhythm(_0x95E8, _0x9F8A) {
  if (!_0x9F8A) {
      _0x9F8A = 115
  }
  ;var _0x961E = $("#" + _0x95E8)["val"]();
  var _0x9708 = _0x961E["split"]("\x0A");
  var _0x9C18 = /[a-gA-G](\,*)(\'*)/g;
  var _0x9D4A = "";
  var _0x9FAE = false;
  var _0x9F9C = false;
  var _0x9F66 = -1;
  for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
      var _0x96F6 = _0x9708[_0x9558];
      if (_0x96F6["replace"](/\{.[^\}]*\}/g, "")["indexOf"]("|") > -1 && _0x96F6["replaceAll"](" ", "")["indexOf"]("w:") != 0 && _0x96F6["indexOf"]("N:") != 0) {
          _0x9F66 = _0x9558;
          _0x96F6 = getRhythmLine(_0x96F6);
          if (!_0x9FAE) {
              _0x96F6 = "V:1 perc stafflines=1 octave=0\x0A" + _0x96F6;
              _0x9FAE = true
          }
      } else {
          if (_0x96F6["indexOf"]("V:") > -1) {
              var _0x9F78 = _0x96F6["match"](/V:\s*([0-9])/);
              if (_0x9F78 != null) {
                  var _0x9FC0 = _0x9F78[0];
                  var _0x9522 = new RegExp(_0x9FC0 + ".*perc");
                  var _0x9F54 = _0x96F6["match"](_0x9522);
                  if (_0x9F54 == null) {
                      if (_0x96F6["indexOf"]("perc") < 0) {
                          _0x96F6 = _0x96F6 + " perc stafflines=1 octave=0"
                      }
                  }
              }
              ;if (_0x9F66 != -1) {
                  _0x96F6 = "%%MIDI program " + _0x9F8A + "\x0A" + _0x96F6
              }
              ;_0x9FAE = true
          } else {
              if (_0x96F6["indexOf"]("%%score") > -1) {
                  _0x96F6 = "%%MIDI program " + _0x9F8A + "\x0A" + _0x96F6
              }
          }
      }
      ;_0x9D4A += _0x96F6 + "\x0A"
  }
  ;_0x9D4A = _0x9D4A + "\x0A%%MIDI program " + _0x9F8A + "";
  _0x9D4A = _0x9D4A["replaceAll"](/%%MIDI\s*program\s*\d{1,3}/g, "%%MIDI program " + _0x9F8A + "");
  _0x9D4A = _0x9D4A["replaceAll"](/%%showcm.*\n/, "");
  return replaceBlankLine(_0x9D4A)
}
function getRhythmLine(_0x96F6) {
  var _0x9D4A = "";
  var _0xB18A = 0;
  var _0xB0FA = 0;
  var _0xB130 = 0;
  var _0xB11E = 0;
  var _0xB154 = 0;
  var _0xB166 = new RegExp(/[a-gA-Gz]/);
  var _0xB178 = new RegExp(/[2-9]/);
  var _0xB142 = true;
  var _0xB0E8 = false;
  for (var _0x9558 = 0; _0x9558 < _0x96F6["length"]; _0x9558++) {
      var _0x95FA = _0x96F6[_0x9558];
      if (_0xB0E8) {
          _0x9D4A += _0x95FA;
          continue
      }
      ;if (_0x95FA == "%") {
          _0x9D4A += _0x95FA;
          _0xB0E8 = true;
          continue
      }
      ;if (_0x95FA == "$") {
          _0x9D4A += _0x95FA;
          continue
      }
      ;if (_0x95FA == "\"") {
          _0xB18A++
      }
      ;if (_0xB18A % 2 == 1) {
          _0x9D4A += _0x95FA;
          continue
      }
      ;if (_0x95FA == "!") {
          _0xB0FA++
      }
      ;if (_0xB0FA % 2 == 1) {
          _0x9D4A += _0x95FA;
          continue
      }
      ;if (_0x95FA == "," || _0x95FA == "\'" || _0x95FA == "^" || _0x95FA == "_" || _0x95FA == "=" || _0x95FA == "(" || _0x95FA == ")") {
          var _0xB10C = false;
          if (_0x95FA == "(" && _0x9558 + 1 < _0x96F6["length"]) {
              var _0xB0D6 = _0x96F6[_0x9558 + 1];
              if (/\d/["test"](_0xB0D6)) {
                  _0xB10C = true
              }
          }
          ;if (_0x96F6[_0x9558 - 1] && _0x96F6[_0x9558 - 1] == "z") {} else {
              if (!_0xB10C) {
                  continue
              }
          }
      }
      ;if (_0x95FA == "[" || _0x95FA == "]") {
          var _0xB19C = false;
          if (_0x95FA == "]" && _0x96F6[_0x9558 - 1] == "|") {
              _0xB19C = true
          }
          ;if (_0x95FA == "[") {
              if (_0x96F6[_0x9558 + 1]) {
                  if (/\d/["test"](_0x96F6[_0x9558 + 1])) {
                      _0xB19C = true
                  } else {
                      if ("\"" == _0x96F6[_0x9558 + 1]) {
                          _0xB19C = true
                      }
                  }
              }
          }
          ;if (!_0xB19C) {
              _0xB130++;
              _0xB11E = 0;
              _0xB154 = 0;
              _0xB142 = true
          }
      }
      ;if (_0xB130 % 2 == 1) {
          if (_0x95FA == ":") {
              _0xB142 = false
          }
          ;if (!_0xB142) {
              _0x9D4A += _0x95FA;
              continue
          }
          ;if (_0xB166["test"](_0x95FA)) {
              if (_0xB11E == 0) {
                  _0x9D4A += _0x95FA["replace"](/[a-gA-Gz](\,*)(\'*)/g, "B");
                  _0xB11E++
              }
          } else {
              if (_0xB178["test"](_0x95FA)) {
                  if (_0xB154 == 0) {
                      _0x9D4A += _0x95FA;
                      _0xB154++
                  }
              } else {
                  _0x9D4A += _0x95FA
              }
          }
          ;continue
      }
      ;_0x95FA = _0x95FA["replace"](/[a-gA-G](\,*)(\'*)/g, "B");
      var _0x9CF0 = extnotes["concat"](extnotes2);
      for (var _0x96D2 = 0, _0x9B64 = _0x9CF0["length"]; _0x96D2 < _0x9B64; _0x96D2++) {
          _0x95FA = _0x95FA["replace"](_0x9CF0[_0x96D2]["char"], "B")
      }
      ;_0x9D4A += _0x95FA
  }
  ;_0x9D4A = _0x9D4A["replace"](/\"midi[0-9]{1,4}\"/g, "");
  return _0x9D4A
}
function getLastM(_0x95E8) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  var _0xA950 = /M\:\s*[1-9]\/[1-9]/g;
  var _0x9D4A = _0x961E["match"](_0xA950);
  if (_0x9D4A != null) {
      return _0x9D4A[_0x9D4A["length"] - 1]
  }
  ;return ""
}
function getFreCharge(_0xA8C0, _0xA8AE, _0xA89C) {
  var _0x95A0;
  if ("higher" == _0xA89C) {
      _0x95A0 = {
          'C': 0,
          'G': 7,
          'D': 2,
          'A': 9,
          'E': 4,
          'B': 11,
          'F#': 6,
          'C#': 1,
          'F': 5,
          'Bb': 10,
          'Eb': 3,
          'Ab': 8,
          'Db': 1,
          'Gb': 6,
          'Cb': -1
      }
  } else {
      if ("lower" == _0xA89C) {
          _0x95A0 = {
              'C': 12,
              'G': -5,
              'D': -10,
              'A': -3,
              'E': -8,
              'B': -1,
              'F#': -6,
              'C#': -11,
              'F': -7,
              'Bb': -2,
              'Eb': -9,
              'Ab': -4,
              'Db': -11,
              'Gb': -6,
              'Cb': -1
          }
      } else {
          _0x95A0 = {
              'C': 0,
              'G': 7,
              'D': 2,
              'A': 9,
              'E': 4,
              'B': 11,
              'F#': 6,
              'C#': 1,
              'F': 5,
              'Bb': -2,
              'Eb': 3,
              'Ab': 8,
              'Db': 1,
              'Gb': 6,
              'Cb': -1
          }
      }
  }
  ;var _0x973E = 0;
  for (key in _0x95A0) {
      if (_0xA8C0 == key) {
          _0x973E = _0x95A0[key] * -1
      }
  }
  ;if (_0xA8AE != "C") {
      _0x973E += _0x95A0[_0xA8AE]
  }
  ;return _0x973E
}
function changePlayingKey(_0x9DFE) {
  var _0x9E10 = $("#K")["val"]();
  var _0x9DEC = getFreCharge(_0x9E10, _0x9DFE);
  user["tmpTransposition"] = _0x9DEC
}
function findPosition(_0x9642, _0x9E7C) {
  try {
      if (!showNotePosition) {
          return
      }
  } catch (err) {
      return
  }
  ;if ($(_0x9E7C)["find"](".g")["length"] == 0) {
      $("#mycursor")["remove"]();
      if (cursorInterval) {
          clearInterval(cursorInterval)
      }
      ;return
  }
  ;if ($(_0x9E7C)["find"]("g[type=\'staff\']")["length"] == 0) {
      $("#mycursor")["remove"]();
      if (cursorInterval) {
          clearInterval(cursorInterval)
      }
      ;return
  }
  ;var _0xA4AC = $(_0x9E7C)["find"]("g[type=\'staff\']")["offset"]()["top"];
  var _0xA49A = $(_0x9E7C)["find"]("g[type=\'staff\'] .stroke")[0]["getBoundingClientRect"]()["height"];
  var _0x969C = _0x9642["pageX"] - $(_0x9E7C)["offset"]()["left"];
  var _0x96AE = _0x9642["pageY"] - $(_0x9E7C)["offset"]()["top"];
  if (_0x9642["pageY"] < _0xA4AC || _0x9642["pageY"] > (_0xA4AC + _0xA49A)) {
      $("#mycursor")["remove"]();
      if (cursorInterval) {
          clearInterval(cursorInterval)
      }
      ;move2End();
      return
  }
  ;var _0xA4BE;
  var _0x9678 = new Array();
  var _0xA488 = 9999999;
  var _0x9D4A;
  $["each"]($(_0x9E7C)["find"]("rect.abcr"), function(_0x9558, _0x960C) {
      var _0xA518 = $(_0x960C)["parent"]("g[transform]");
      var _0xA53C = 0;
      var _0xA54E = 0;
      if (_0xA518["length"] > 0) {
          var _0x9534 = $(_0xA518)["attr"]("transform");
          if (_0x9534["indexOf"]("translate") > -1) {
              var _0x9AD4 = _0x9534["replace"]("translate(", "")["replace"](")", "")["split"](",");
              _0xA53C = parseFloat(_0x9AD4[0]);
              _0xA54E = parseFloat(_0x9AD4[1])
          }
      }
      ;var _0x9666 = new Object();
      _0x9666["index"] = parseInt($(_0x960C)["attr"]("class")["replace"](" ", "")["replace"]("abcr", "")["replaceAll"]("_", ""));
      if ($(_0x960C)["attr"]("type") != "note") {
          return
      }
      ;_0x9666["x"] = parseFloat($(_0x960C)["attr"]("x")) + _0xA53C;
      _0x9666["y"] = parseFloat($(_0x960C)["attr"]("y")) + _0xA54E;
      _0x9666["width"] = parseFloat($(_0x960C)["attr"]("width"));
      _0x9666["height"] = parseFloat($(_0x960C)["attr"]("height"));
      _0x9666["x"] = _0x9666["x"] * scale;
      _0x9666["y"] = _0x9666["y"] * scale;
      _0x9666["width"] = _0x9666["width"] * scale;
      _0x9666["height"] = _0x9666["height"] * scale;
      var _0xA4D0 = Math["abs"](_0x969C - _0x9666["x"]) + Math["abs"](_0x96AE - _0x9666["y"]);
      var _0xA4E2 = Math["abs"](_0x969C - _0x9666["x"]) + Math["abs"](_0x96AE - (_0x9666["y"] + _0x9666["height"]));
      var _0xA4F4 = Math["abs"](_0x969C - (_0x9666["x"] + _0x9666["width"])) + Math["abs"](_0x96AE - _0x9666["y"]);
      var _0xA506 = Math["abs"](_0x969C - (_0x9666["x"] + _0x9666["width"])) + Math["abs"](_0x96AE - (_0x9666["y"] + _0x9666["height"]));
      var _0xA52A = 999999;
      if (_0xA52A > _0xA4D0) {
          _0xA52A = _0xA4D0
      }
      ;if (_0xA52A > _0xA4E2) {
          _0xA52A = _0xA4E2
      }
      ;if (_0xA52A > _0xA4F4) {
          _0xA52A = _0xA4F4
      }
      ;if (_0xA52A > _0xA506) {
          _0xA52A = _0xA506
      }
      ;if (_0xA52A < _0xA488) {
          _0xA488 = _0xA52A;
          _0x9D4A = _0x9666
      }
      ;_0x9678["push"](_0x9666)
  });
  if (_0x9D4A) {
      if (_0x969C > _0x9D4A["x"]) {
          _0x9D4A["pos"] = "behind"
      } else {
          _0x9D4A["pos"] = "before"
      }
      ;_0x9D4A["staffTop"] = _0xA4AC;
      _0x9D4A["staffHeight"] = _0xA49A;
      _0x9678["sort"](function(_0x9546, _0x9798) {
          return _0x9546["index"] - _0x9798["index"]
      });
      addCursor(_0x9642, _0x9D4A, _0x9678)
  }
}
var cursorInterval;
function addCursor(_0x9642, _0x9666, _0x9678) {
  if (_0x9666["pos"] == "behind") {
      var _0x9654 = -1;
      var _0x968A = "";
      for (var _0x9558 = 0; _0x9558 < _0x9678["length"]; _0x9558++) {
          if (_0x9678[_0x9558]["index"] > _0x9666["index"]) {
              _0x9654 = _0x9678[_0x9558]["index"];
              break
          }
      }
      ;if (_0x9654 != -1) {
          var _0x961E = $("#source")["val"]();
          _0x968A = _0x961E["substring"](_0x9666["index"], _0x9654)
      }
      ;setCaretPosition(document["getElementById"]("source"), _0x9666["index"] + _0x968A["replaceAll"](" ", "")["length"])
  } else {
      setCaretPosition(document["getElementById"]("source"), _0x9666["index"])
  }
  ;$("#mycursor")["remove"]();
  if (cursorInterval) {
      clearInterval(cursorInterval)
  }
  ;var _0x969C = $(".nobrk")["offset"]()["left"];
  var _0x96AE = $(".nobrk")["offset"]()["top"];
  var _0x9630 = "<div id=\"mycursor\" style=\"position:absolute;left:" + (_0x9642["pageX"] - _0x969C) + "px;top:" + (_0x9666["staffTop"] - _0x96AE) + "px;width:20px;height:" + _0x9666["staffHeight"] + "px;background-color: red;opacity:0.4;\"></div>";
  $(".nobrk")["append"]($(_0x9630));
  $("#mycursor")["click"](function() {
      $("#mycursor")["remove"]();
      move2End()
  });
  cursorInterval = setInterval(function() {
      if ($("#mycursor")["length"] > 0) {
          $("#mycursor")["toggle"]()
      } else {
          clearInterval(cursorInterval)
      }
  }, 1000)
}
function genRhythm(_0x95E8, _0x9750, _0x99A2) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  var _0xA5A8 = getNoteContent()[0]["str"];
  var _0x971A = get("M:");
  var _0x96E4 = get("L:");
  var _0x972C = parseInt(_0x96E4["split"]("/")[1]) / parseInt(_0x971A["split"]("/")[1]);
  var _0x973E = parseInt(_0x971A["split"]("/")[0]);
  _0xA5A8 = _0xA5A8["replaceAll"]("\\|\\|", "|");
  _0xA5A8 = _0xA5A8["replaceAll"]("\\:\\:", "|");
  var _0xA596 = _0xA5A8["split"]("|");
  var _0xA5F0 = "V:99 perc stafflines=1\x0A%%MIDI program 115\x0AK:C shift=cc octave=0\x0A";
  var _0xA5DE = "";
  for (var _0x9558 = 0; _0x9558 < _0xA596["length"]; _0x9558++) {
      var _0xA584 = "";
      var _0xA572 = _0xA596[_0x9558];
      if ($["trim"](_0xA572) == "" || $["trim"](_0xA572) == "]") {
          continue
      }
      ;var _0x9948 = 0;
      if (_0xA572["startWith"]("\\:")) {
          _0x9948 = 1
      }
      ;var _0x98B8 = /\[.\:.[^\]]*\]/g;
      var _0x9D4A = _0xA572["match"](_0x98B8);
      var _0xA602 = new Array();
      if (_0x9D4A != null) {
          for (var _0x96D2 = 0; _0x96D2 < _0x9D4A["length"]; _0x96D2++) {
              if (_0x9D4A[_0x96D2]["indexOf"]("M:") > -1) {
                  var _0xA560 = /[1-9]\/[1-9]/;
                  _0x971A = _0x9D4A[_0x96D2]["match"](_0xA560)[0];
                  _0x972C = parseInt(_0x96E4["split"]("/")[1]) / parseInt(_0x971A["split"]("/")[1]);
                  _0x973E = parseInt(_0x971A["split"]("/")[0])
              }
              ;_0x9948 = _0xA572["indexOf"](_0x9D4A[_0x96D2]) + _0x9D4A[_0x96D2]["length"]
          }
      }
      ;_0xA5DE += _0xA572["substr"](0, _0x9948);
      var _0x95FA = "B";
      if (_0x99A2 == "pre") {
          _0x95FA = "z"
      } else {
          _0x95FA = "B"
      }
      ;for (var _0x96D2 = 0; _0x96D2 < _0x973E; _0x96D2++) {
          if (_0x972C != 1) {
              _0xA5DE += _0x95FA + _0x972C
          } else {
              _0xA5DE += _0x95FA
          }
      }
      ;if (_0xA572["endWith"]("\\:")) {
          _0xA5DE += ":"
      }
      ;_0xA5DE += "|"
  }
  ;var _0xA5BA = "";
  if (_0x9750 > 0) {
      for (var _0x9558 = 0; _0x9558 < _0x9750; _0x9558++) {
          _0xA5BA += "|";
          for (var _0x96D2 = 0; _0x96D2 < _0x973E; _0x96D2++) {
              if (_0x972C != 1) {
                  _0xA5BA += "B" + _0x972C
              } else {
                  _0xA5BA += "B"
              }
          }
      }
      ;if (_0xA5BA != "") {
          _0xA5BA = _0xA5BA["substr"](1)
      }
  }
  ;if (_0xA5BA != "") {
      if (_0xA5DE["startWith"]("\\|")) {
          _0xA5DE = _0xA5BA + _0xA5DE
      } else {
          _0xA5DE = _0xA5BA + "|" + _0xA5DE
      }
  }
  ;_0xA5DE = _0xA5DE["replaceAll"](/\[V:.[^\]]*\]/g, "");
  var _0xA5CC = _0xA5F0 + _0xA5DE;
  if (_0xA5CC["indexOf"]("|]") > -1) {
      return _0xA5CC
  } else {
      return _0xA5CC + "]"
  }
}
function addPreNode(_0x95E8, _0x9750) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  var _0x9786 = true;
  if (_0x961E["indexOf"]("V:") < 0) {
      _0x9786 = false
  }
  ;var _0x9708 = _0x961E["split"]("\x0A");
  var _0x9774 = "";
  var _0x96C0 = 0;
  var _0x971A = get("M:");
  var _0x96E4 = get("L:");
  var _0x972C = parseInt(_0x96E4["split"]("/")[1]) / parseInt(_0x971A["split"]("/")[1]);
  var _0x973E = parseInt(_0x971A["split"]("/")[0]);
  var _0x9762 = "";
  for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
      var _0x96F6 = _0x9708[_0x9558];
      if (_0x96F6["indexOf"]("V:") > -1) {
          _0x96C0 = 0;
          _0x9762 = ""
      }
      ;if (_0x96F6["indexOf"]("w:") < 0 && _0x96F6["indexOf"]("N:") < 0 && _0x96F6["replaceAll"](/\".*\"/g, "")["replace"](/\[.[^\]]*\]/, "")["replace"](/\{.[^\}]*\}/, "")["indexOf"]("|") > -1) {
          if (_0x9750 != 0 && _0x96C0 == 0) {
              for (var _0x969C = 0; _0x969C < _0x9750; _0x969C++) {
                  _0x9762 += "|";
                  for (var _0x96D2 = 0; _0x96D2 < _0x973E; _0x96D2++) {
                      if (_0x972C != 1) {
                          _0x9762 += "B" + _0x972C
                      } else {
                          _0x9762 += "B"
                      }
                  }
              }
              ;if (_0x9762 != "") {
                  _0x9762 = _0x9762["substr"](1)
              }
              ;if (_0x96F6["startWith"]("\\|")) {
                  _0x96F6 = _0x9762 + _0x96F6
              } else {
                  _0x96F6 = _0x9762 + "|" + _0x96F6
              }
          }
          ;_0x96C0++
      }
      ;_0x9774 += _0x96F6 + "\x0A"
  }
}
function addPreNodeAndRhythm(_0x95E8, _0x9750, _0x99A2, _0x9936) {
  if (!_0x9936) {
      _0x9936 = 0
  }
  ;var _0x961E = $("#" + _0x95E8)["val"]();
  if (_0x961E["indexOf"]("X:") < 0) {
      _0x961E = "X:1\x0A" + _0x961E
  }
  ;var _0x9786 = true;
  if (_0x961E["indexOf"]("V:") < 0) {
      _0x9786 = false
  }
  ;var _0x9708 = getNodesInfo(_0x961E);
  var _0x97E0 = "-1";
  var _0x9804 = "-1";
  if (_0x9936) {
      _0x9804 = _0x9936
  }
  ;if (_0x9936 == 0) {
      _0x9804 = _0x9936
  }
  ;var _0x9924 = getStaffInfo(_0x95E8);
  var _0x9774 = "";
  var _0x96C0 = 0;
  var _0x971A = get("M:");
  var _0x96E4 = get("L:");
  for (var _0x9558 = 0; _0x9558 < syms["length"]; _0x9558++) {
      var _0x97CE = syms[_0x9558];
      if (_0x97CE) {
          if (_0x97CE["v"] == _0x9936 && (_0x97CE["type"] == 8 || _0x97CE["type"] == 10) && !_0x97CE["grace"]) {
              _0x96E4 = decimalsToFractional(_0x97CE["my_ulen"] / 1536);
              break
          }
      }
  }
  ;var _0x972C = parseInt(_0x96E4["split"]("/")[1]) / parseInt(_0x971A["split"]("/")[1]);
  var _0x973E = parseInt(_0x971A["split"]("/")[0]);
  var _0x9762 = "";
  var _0x97F2 = -1;
  var _0x9816 = new Array();
  var _0x984C = "";
  var _0x97AA = 0;
  var _0x99C6 = new Array();
  for (var _0x99EA = 0; _0x99EA < syms["length"]; _0x99EA++) {
      var _0x98EE = syms[_0x99EA];
      if (_0x98EE && _0x98EE["type"] == 8) {
          var _0x995A = _0x98EE["v"];
          if (_0x99C6["indexOf"](_0x995A) < 0) {
              _0x99C6["push"](_0x995A)
          }
      }
  }
  ;for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
      var _0x983A = _0x9708[_0x9558];
      var _0x96F6 = _0x983A["lineStr"];
      if (_0x984C != "" && (_0x96F6["indexOf"]("%%score") > -1 || _0x96F6["indexOf"]("%%staves") > -1)) {
          _0x9774 += "V:99 perc stafflines=1\x0A%%MIDI program 115\x0AK:C shift=cc octave=0\x0A" + _0x984C;
          _0x984C = ""
      }
      ;if (_0x96F6["indexOf"]("V:") > -1) {
          var _0x99B4 = /V:\s*([1-9])/;
          var _0x9882 = _0x96F6["match"](_0x99B4);
          if (_0x9882 != null && _0x9882["length"] > 0) {
              _0x97E0 = _0x9882[1];
              if (_0x97E0 != "") {
                  _0x97E0 = parseInt(_0x97E0) - 1
              }
          }
          ;if (_0x9804 == "-1") {
              _0x9804 = _0x97E0
          }
          ;if (_0x9816["indexOf"](_0x97E0) < 0) {
              _0x96C0 = 0;
              _0x9762 = ""
          }
          ;if (_0x9804 == _0x97E0) {
              if (_0x984C != "") {
                  _0x9774 += "V:99 perc stafflines=1\x0A%%MIDI program 115\x0AK:C shift=cc octave=0\x0A" + _0x984C;
                  _0x984C = ""
              }
          }
      }
      ;if (_0x983A["type"] == "note") {
          _0x97E0 = _0x983A["v"];
          if (_0x97E0 == _0x9804) {
              var _0x985E = _0x96F6["replace"](/::/g, ":|:")["replace"](/\|\]/g, "|")["replace"](/\|:/g, "|");
              var _0x9828 = _0x983A["nodes"];
              for (var _0x957C = 0; _0x957C < _0x9828["length"]; _0x957C++) {
                  var _0x98A6 = _0x9828[_0x957C]["nodeStr"];
                  if (_0x98A6 == "") {
                      continue
                  }
                  ;if (_0x98A6["indexOf"]("%V") > -1) {
                      continue
                  }
                  ;if (_0x98A6["replace"](/\s+/g, "") != "" && (/[a-gA-G]/["test"](_0x98A6) || _0x98A6["indexOf"]("m") > -1 || _0x98A6["indexOf"]("h") > -1 || _0x98A6["indexOf"]("n") > -1 || _0x98A6["indexOf"]("z") > -1 || (_0x9924["vocalCount"] > 1 && _0x98A6["indexOf"]("x") > -1))) {
                      if (/\[M:.*\]/["test"](_0x98A6)) {
                          _0x984C += /\[M:.[^\[]*\]/["exec"](_0x98A6)[0]
                      }
                      ;var _0x9990 = _0x98A6["replaceAll"](/\[\".[^\"]*\"/g, "")["replaceAll"](/\[.\:.[^\]]*\]/g, "")["replaceAll"](/\".[^\"]*\"/g, "");
                      if (!/[a-gA-g]/["test"](_0x9990["replace"](/\|\]/, "")) && _0x9990["indexOf"]("x") > -1) {
                          if (_0x99C6["length"] == 1) {
                              _0x984C += _0x9990;
                              continue
                          }
                      }
                      ;if (_0x98A6["indexOf"]("x") > -1) {
                          nodeLen = calNodeLen(_0x9990)
                      } else {
                          nodeLen = calNodeLenByIndex(_0x9828[_0x957C]["startSeq"], _0x9828[_0x957C]["endSeq"])
                      }
                      ;var _0x95FA = "B";
                      if (_0x99A2 == "pre") {
                          _0x95FA = "z"
                      } else {
                          _0x95FA = "B"
                      }
                      ;if (nodeLen <= _0x972C && nodeLen > 0) {
                          if (nodeLen > 0) {
                              if (nodeLen == _0x972C) {
                                  _0x984C += _0x95FA + parseInt(nodeLen);
                                  nodeLen = nodeLen - _0x972C
                              }
                              ;if (nodeLen > 1 && parseInt(nodeLen) != nodeLen) {
                                  _0x984C += _0x95FA + parseInt(nodeLen);
                                  nodeLen = nodeLen - 1
                              } else {
                                  if (nodeLen > 1 && parseInt(nodeLen) == nodeLen) {
                                      _0x984C += _0x95FA + parseInt(nodeLen);
                                      nodeLen = 0
                                  }
                              }
                              ;if (nodeLen == 1) {
                                  _0x984C += _0x95FA
                              }
                              ;if (nodeLen > 0 && nodeLen < 1) {
                                  var _0x98DC = nodeLen;
                                  var _0x996C = "";
                                  for (var _0x9870 = 2; ; _0x9870 = _0x9870 * 2) {
                                      if (_0x98DC == 0) {
                                          break
                                      }
                                      ;if (_0x98DC >= 1 / _0x9870) {
                                          _0x98DC = _0x98DC - 1 / _0x9870
                                      }
                                      ;_0x996C += "/"
                                  }
                                  ;_0x984C += _0x95FA + _0x996C
                              }
                          }
                      } else {
                          while (nodeLen >= _0x972C) {
                              nodeLen = nodeLen - _0x972C;
                              if (_0x972C == 0.5) {
                                  _0x984C += _0x95FA + "/"
                              } else {
                                  _0x984C += _0x95FA + _0x972C
                              }
                          }
                          ;if (nodeLen > 0) {
                              if (nodeLen == 1) {
                                  _0x984C += _0x95FA + parseInt(nodeLen);
                                  nodeLen = nodeLen - 1
                              }
                              ;if (nodeLen > 1 && parseInt(nodeLen) != nodeLen) {
                                  _0x984C += _0x95FA + parseInt(nodeLen);
                                  nodeLen = nodeLen - 1
                              } else {
                                  if (nodeLen > 1 && parseInt(nodeLen) == parseInt(nodeLen)) {
                                      _0x984C += _0x95FA + parseInt(nodeLen);
                                      nodeLen = 0
                                  }
                              }
                              ;if (nodeLen == 1) {
                                  _0x984C += _0x95FA
                              }
                              ;if (nodeLen > 0 && nodeLen < 1) {
                                  var _0x98DC = nodeLen;
                                  var _0x996C = "";
                                  for (var _0x9870 = 2; ; _0x9870 = _0x9870 * 2) {
                                      if (_0x98DC == 0) {
                                          break
                                      }
                                      ;if (_0x98DC >= 1 / _0x9870) {
                                          _0x98DC = _0x98DC - 1 / _0x9870
                                      }
                                      ;_0x996C += "/"
                                  }
                                  ;_0x984C += _0x95FA + _0x996C
                              }
                          }
                      }
                      ;_0x984C += _0x9828[_0x957C]["barLineStr"]["replace"](/\[\d\./, "")["replace"](/\d\.*/g, "")
                  } else {
                      if (/x\d*/["test"](_0x98A6)) {
                          _0x984C += _0x98A6
                      }
                  }
              }
              ;_0x984C += "\x0A"
          }
          ;if (_0x96C0 == 0) {
              _0x9816["push"](_0x97E0);
              var _0x98A6 = _0x96F6["split"]("|")[0];
              if ($["trim"](_0x98A6) == "") {
                  _0x98A6 = _0x96F6["split"]("|")[1]
              }
              ;var _0x9990 = _0x98A6["replaceAll"](/\[.\:.[^\]]*\]/g, "")["replaceAll"](/\".[^\"]*\"/g, "");
              var _0x98B8 = /\[.\:.[^\]]*\]/g;
              _0x97F2 = calNodeLen(_0x9990);
              var _0x9894 = _0x972C * _0x973E - _0x97F2;
              if (_0x9750 == 0) {
                  _0x9894 = 0
              }
              ;if (_0x9894 > 0) {
                  var _0x9798 = parseInt(_0x9894 / 2);
                  var _0x98DC = _0x9894 % 2;
                  var _0x97BC = "";
                  if (_0x9798 != 0) {
                      _0x97BC = "z" + 2 * _0x9798
                  }
                  ;var _0x9912 = "";
                  if (_0x98DC != 0) {
                      var _0x996C = "";
                      for (var _0x957C = 1; ; _0x957C = _0x957C * 2) {
                          if (_0x98DC == 0) {
                              break
                          }
                          ;if (_0x98DC >= 1 / _0x957C) {
                              _0x9912 += "z" + _0x996C;
                              _0x98DC = _0x98DC - 1 / _0x957C
                          }
                          ;_0x996C += "/"
                      }
                  }
                  ;var _0x9900 = _0x96F6["match"](_0x98B8);
                  var _0x9948 = 0;
                  if (_0x96F6["indexOf"]("|:") > -1) {
                      _0x9948 = _0x96F6["indexOf"]("|:") + 2
                  }
                  ;if (_0x9900 != null) {
                      for (var _0x957C = 0; _0x957C < _0x9900["length"]; _0x957C++) {
                          _0x9948 = _0x96F6["indexOf"](_0x9900[_0x957C]) + _0x9900[_0x957C]["length"]
                      }
                  }
                  ;_0x96F6 = _0x96F6["substr"](0, _0x9948) + _0x97BC + _0x9912 + _0x96F6["substr"](_0x9948)
              }
              ;if (_0x9750 != 0) {
                  for (var _0x969C = 0; _0x969C < _0x9750; _0x969C++) {
                      _0x9762 += "|";
                      for (var _0x96D2 = 0; _0x96D2 < _0x973E; _0x96D2++) {
                          if (_0x972C != 1) {
                              _0x9762 += "z" + _0x972C
                          } else {
                              _0x9762 += "z"
                          }
                      }
                  }
                  ;if (_0x9762 != "") {
                      _0x9762 = _0x9762["substr"](1)
                  }
              }
              ;if (_0x9762 != "") {
                  if (_0x96F6["startWith"]("\\|")) {
                      _0x96F6 = _0x9762 + _0x96F6
                  } else {
                      _0x96F6 = _0x9762 + "|" + _0x96F6
                  }
              }
              ;if (!_0x9786) {
                  _0x96F6 = "V:1\x0A" + _0x96F6;
                  _0x9786 = true
              }
          }
          ;_0x96C0++
      }
      ;if (_0x96F6["indexOf"]("%%staves") > -1) {
          if (_0x96F6["indexOf"]("]") > -1 && _0x96F6["indexOf"]("]") == (_0x96F6["length"] - 1)) {
              _0x96F6 = _0x96F6["replace"](/(.*)\]/, "$1  99]]")
          } else {
              _0x96F6 = _0x96F6 + " 99"
          }
      }
      ;if (_0x96F6["indexOf"]("%%score") > -1) {
          if (_0x96F6["indexOf"]("]") > -1 && _0x96F6["indexOf"]("]") == (_0x96F6["length"] - 1)) {
              _0x96F6 = _0x96F6["replace"](/(.*)\]/, "$1  99]")
          } else {
              _0x96F6 = _0x96F6["replace"]("%%score", "%%score [") + " 99]"
          }
      }
      ;var _0x99D8 = _0x96F6["match"](/\[V:.[^\]]*\]/);
      if (_0x99D8 != null) {
          _0x96F6 = _0x96F6["replace"](_0x99D8[0], "");
          _0x96F6 = _0x99D8[0] + _0x96F6
      }
      ;if (_0x96F6["replace"]("s", "") != "") {
          _0x9774 += _0x96F6 + "\x0A"
      }
  }
  ;_0x9774 = replaceBlankLine(_0x9774);
  if (_0x9774["trim"]()["endWith"]("%%endtext")) {
      var _0x9522 = /%%begintext/g;
      var _0x997E = _0x9774["match"](_0x9522);
      if (_0x997E["length"] > 0) {
          for (var _0x9558 = _0x997E["length"]; _0x9558 > 0; _0x9558--) {
              var _0x98CA = _0x9522["exec"](_0x9774);
              if (_0x9558 == 1) {
                  _0x9774 = _0x9774["substring"](0, _0x98CA["index"])
              }
          }
      }
  }
  ;_0x9774 += "V:99 perc stafflines=1\x0A%%MIDI program 115\x0AK:C shift=cc octave=0\x0A" + _0x984C + "\x0A";
  if (_0x9774["match"](/L:/g) != null && _0x9774["match"](/L:/g)["length"] > 1) {
      _0x9774 = _0x9774["replace"](/V:99 perc stafflines=1/g, "V:99 perc stafflines=1\x0AL:" + _0x96E4)
  }
  ;_0x9774 = replaceBlankLine(_0x9774);
  return _0x9774
}
function mergeSvg2Png() {
  staffData = mydolayout($("#source")["val"](), false);
  var _0xB718 = $("svg.music");
  var _0xB6D0;
  var _0xB6E2 = 0;
  var _0xADBE = 0;
  var _0xB72A = 0;
  if (_0xB718 != null && _0xB718["length"] > 0) {
      _0xB6D0 = _0xB718[0];
      var _0x9A68 = $(_0xB6D0)["find"]("g.g")["offset"]()["top"] - $(_0xB6D0)["offset"]()["top"];
      _0xB6E2 = $(_0xB6D0)["height"]();
      for (var _0x9558 = 1; _0x9558 < _0xB718["length"]; _0x9558++) {
          var _0x9E7C = _0xB718[_0x9558];
          var _0xA518 = $(_0x9E7C)["find"]("g.g");
          var _0xB6BE = $(_0x9E7C)["find"]("defs");
          var _0xACC2 = $(_0xA518)["attr"]("transform");
          if (_0xACC2 != null) {
              _0xACC2 = _0xACC2 + "translate(0," + _0xB6E2 / scale + ")"
          } else {
              _0xACC2 = "translate(0," + _0xB6E2 / scale + ")"
          }
          ;if (_0xA518["length"] > 0) {
              _0xB6E2 += $(_0x9E7C)["height"]();
              if (_0xB6BE["length"] > 0) {
                  $(_0xB6D0)["append"]($(_0xB6BE))
              }
              ;$(_0xB6D0)["append"]($(_0xA518)["attr"]("transform", _0xACC2))
          }
      }
  }
  ;$(_0xB6D0)["height"](_0xB6E2);
  $(_0xB6D0)["attr"]("height", _0xB6E2);
  var _0xB73C = $(_0xB6D0)["attr"]("viewBox");
  var _0xB706 = "";
  if (_0xB73C) {
      var _0x9C84 = _0xB73C["split"](" ");
      for (var _0x9558 = 0; _0x9558 < _0x9C84["length"]; _0x9558++) {
          if (_0x9558 < _0x9C84["length"] - 1) {
              _0xB706 += _0x9C84[_0x9558] + " "
          } else {
              _0xB706 += _0xB6E2
          }
      }
  }
  ;if (_0xB706 != "") {
      $(_0xB6D0)["attr"]("viewBox", _0xB706)
  }
  ;var _0xB6F4 = new Array();
  $["each"]($(_0xB6D0)["find"]("g.g"), function(_0x9558, _0x960C) {
      var _0xACC2 = $(_0x960C)["attr"]("transform");
      if ($["trim"](_0xACC2) != "") {
          if (_0xACC2["indexOf"]("translate") > -1) {
              var _0x9AD4 = _0xACC2["replace"]("translate(", "")["replace"](")", "")["split"](",");
              translateX = parseFloat(_0x9AD4[0]);
              translateY = parseFloat(_0x9AD4[1]);
              _0xB6F4["push"](parseFloat(translateY["toFixed"](2)))
          } else {
              _0xB6F4["push"](0)
          }
      }
  });
  staffData["line_offsets"] = _0xB6F4;
  var _0xA39E = $($(_0xB6D0)["prop"]("outerHTML"))[0];
  console["log"](_0xA39E);
  return _0xA39E
}
function getBarLineData() {
  var _0xA6EC = new Object();
  var _0x9D02 = 0;
  var _0xA78E = new Array();
  var _0xA7B2 = new Array();
  var _0xA7A0 = new Array();
  var _0xA77C = new Array();
  var _0xA76A = -1;
  $["each"]($("svg.music"), function(_0x9558, _0x960C) {
      var _0xA7D6 = new Array();
      var _0xA7FA = new Array();
      var _0xA7E8 = new Array();
      var _0xA7C4 = new Array();
      var _0x96AE = -1;
      _0xA77C["push"]($(_0x960C)["offset"]()["top"]);
      $["each"]($(_0x960C)["find"]("rect[type=\'bar\'],rect[type=\'splnum_bar\']"), function(_0x96D2, _0x9666) {
          var _0xA80C = $(_0x9666)["attr"]("class")["match"](/\_([0-9]*)\_/)[1];
          if (_0x96D2 == 0) {
              _0x96AE = $(_0x9666)["attr"]("y")
          }
          ;if (_0xA76A == _0xA80C) {
              return
          }
          ;_0xA76A = _0xA80C;
          if (Math["abs"](parseInt(_0x96AE) - parseInt($(_0x9666)["attr"]("y"))) < 50) {
              var _0x9CCC = parseFloat($(_0x9666)["attr"]("x"));
              var _0x9E6A = checkBarIsInLineFirst($(_0x9666));
              if (_0x9E6A) {
                  return
              }
              ;if (_0xA7C4["indexOf"](_0x9CCC) < 0) {
                  _0xA7D6["push"](_0x9CCC);
                  _0xA7C4["push"](_0x9CCC)
              }
          }
          ;_0xA7FA["push"](parseFloat($(_0x9666)["attr"]("y")));
          _0xA7E8["push"](parseFloat($(_0x9666)["attr"]("y")) + parseFloat($(_0x9666)["attr"]("height")))
      });
      _0xA78E["push"](_0xA7D6["sort"](function(_0x9546, _0x9798) {
          return _0x9546 - _0x9798
      }));
      _0xA7FA["sort"](function(_0x9546, _0x9798) {
          return _0x9546 - _0x9798
      });
      _0xA7E8["sort"](function(_0x9546, _0x9798) {
          return _0x9798 - _0x9546
      });
      _0xA7B2["push"](_0xA7FA[0]);
      _0xA7A0["push"](_0xA7E8[0])
  });
  _0xA6EC["tops"] = _0xA77C;
  _0xA6EC["xs"] = _0xA78E;
  _0xA6EC["ymins"] = _0xA7B2;
  _0xA6EC["ymaxs"] = _0xA7A0;
  return _0xA6EC
}
function getNodeCoor() {
  var _0x9AF8 = getBarLineData();
  _0x9AF8["staff"] = new Array();
  $["each"]($("g[type=\'staff\']"), function(_0x9558, _0x960C) {
      console["log"]($(_0x960C)["height"]());
      var _0xACB0 = $(_0x960C)["attr"]("st");
      var _0x9774 = new Object();
      var _0xACC2 = $(_0x960C)["attr"]("transform");
      var _0xACD4 = getTransformsTranslate(_0xACC2);
      var _0xAC9E = $(_0x960C)["parents"]("svg")["attr"]("index");
      _0x9774["translate"] = _0xACD4;
      _0x9774["v"] = parseInt(_0xACB0);
      _0x9774["lineIndex"] = parseInt(_0xAC9E);
      _0x9774["top"] = $(_0x960C)["offset"]()["top"];
      _0x9AF8["staff"]["push"](_0x9774)
  });
  return _0x9AF8
}
function getSimpleNodeCoor() {
  var _0x9AF8 = getBarLineData();
  _0x9AF8["staff"] = new Array();
  $["each"]($("rect[type=\'splnum_bar\']"), function(_0x9558, _0x960C) {
      var _0xACB0 = parseInt($(_0x960C)["attr"]("st"));
      var _0x969C = parseFloat($(_0x960C)["attr"]("x"));
      var _0x96AE = parseFloat($(_0x960C)["attr"]("y"));
      var _0xAC9E = parseInt($(_0x960C)["parents"]("svg")["attr"]("index"));
      var _0xB022 = false;
      for (var _0x96D2 = 0; _0x96D2 < _0x9AF8["staff"]["length"]; _0x96D2++) {
          stf = _0x9AF8["staff"][_0x96D2];
          if (stf["v"] == _0xACB0 && stf["lineIndex"] == _0xAC9E) {
              _0xB022 = true
          }
      }
      ;if (!_0xB022) {
          var _0xACD4 = new Object();
          _0xACD4["x"] = _0x969C;
          _0xACD4["y"] = _0x96AE;
          var _0x9774 = new Object();
          _0x9774["v"] = parseInt(_0xACB0);
          _0x9774["lineIndex"] = parseInt(_0xAC9E);
          _0x9774["top"] = $(_0x960C)["offset"]()["top"];
          _0x9774["translate"] = _0xACD4;
          _0x9AF8["staff"]["push"](_0x9774)
      }
  });
  return _0x9AF8
}
function getBarLineCoor(_0xA710, _0xA680, _0xA6FE) {
  var _0x9AF8 = getBarLineData();
  var _0xA692 = new Array();
  var _0x9B1C = 0;
  var _0xA6DA = 0;
  var _0xA6C8 = new Array();
  for (var _0x96F6 = 0; _0x96F6 < _0x9AF8["xs"]["length"]; _0x96F6++) {
      for (var _0x9558 = 0; _0x9558 < _0x9AF8["xs"][_0x96F6]["length"]; _0x9558++) {
          var _0xA722 = 0;
          var _0xA758 = 0;
          var _0xA734 = 0;
          var _0xA746 = 0;
          var _0xA6EC = new Object();
          var _0xA6B6 = new Array();
          if (_0x9558 == 0) {
              if (musicType == 2) {
                  _0xA722 = 30 * _0xA710
              } else {
                  _0xA722 = 0
              }
          } else {
              _0xA722 = _0x9AF8["xs"][_0x96F6][_0x9558 - 1] * _0xA710
          }
          ;_0xA734 = _0x9AF8["xs"][_0x96F6][_0x9558] * _0xA710;
          if (_0xA680) {
              _0xA758 = _0x9AF8["ymins"][_0x96F6] * _0xA710 + _0x9AF8["tops"][_0x96F6];
              _0xA746 = _0x9AF8["ymaxs"][_0x96F6] * _0xA710 + _0x9AF8["tops"][_0x96F6]
          } else {
              _0xA758 = _0x9AF8["ymins"][_0x96F6] * _0xA710;
              _0xA746 = _0x9AF8["ymaxs"][_0x96F6] * _0xA710
          }
          ;if (_0xA6FE) {
              _0xA722 += _0xA6FE * _0xA710;
              _0xA734 += _0xA6FE * _0xA710
          }
          ;if (_0x9558 == 0 && musicType != 2) {
              _0xA722 = 0
          }
          ;_0xA6B6["push"](_0xA722);
          _0xA6B6["push"](_0xA758);
          _0xA6B6["push"](_0xA722);
          _0xA6B6["push"](_0xA746);
          _0xA6EC["barline_start"] = _0xA6B6;
          var _0xA6A4 = new Array();
          _0xA6A4["push"](_0xA734);
          _0xA6A4["push"](_0xA758);
          _0xA6A4["push"](_0xA734);
          _0xA6A4["push"](_0xA746);
          _0xA6EC["barline_end"] = _0xA6A4;
          _0xA6EC["node_index"] = _0x9B1C++;
          _0xA6EC["line"] = _0x96F6;
          _0xA692["push"](_0xA6EC);
          if (_0xA6DA < _0xA734) {
              _0xA6DA = _0xA734
          }
          ;if (_0x9558 + 1 == _0x9AF8["xs"][_0x96F6]["length"]) {
              _0xA6C8["push"](_0xA6EC)
          }
      }
  }
  ;for (var _0x9558 = 0; _0x9558 < _0xA6C8["length"]; _0x9558++) {
      var _0xA02C = _0xA6C8[_0x9558]["barline_end"][0];
      if (Math["abs"](_0xA6DA - _0xA02C) < 100) {
          _0xA6C8[_0x9558]["barline_end"][0] = _0xA6DA;
          _0xA6C8[_0x9558]["barline_end"][2] = _0xA6DA
      }
  }
  ;return _0xA692
}
function replaceBraces(_0xADAC) {
  var _0x961E = $("#" + _0xADAC)["val"]();
  if (!_0x961E) {
      return
  }
  ;_0x961E = _0x961E["replaceAll"](/\{\/*\s*\}/g, "");
  $("#" + _0xADAC)["val"](_0x961E)
}
function getNearK(_0x95E8) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  var _0xA842 = getStartPos(getById(_0x95E8));
  if (_0xA842 > 0) {
      _0x961E = _0x961E["substr"](0, _0xA842)
  }
  ;var _0xAC20 = /\[K:\s*(.[^\]]*)\]|K:\s(.*)\n/g;
  var _0xAC0E = _0x961E["match"](_0xAC20);
  if (_0xAC0E == null) {
      return null
  } else {
      var _0xAC56 = /K:\s*(.[^\]]*)]*/;
      var _0xAC44 = _0xAC0E[_0xAC0E["length"] - 1];
      if (_0xAC44 != "") {
          var _0xAC32 = _0xAC44["match"](_0xAC56);
          if (_0xAC32 != null) {
              return _0xAC32[1]
          }
      }
      ;return _0xAC44
  }
  ;return ""
}
function decimalsToFractional(_0xA194) {
  const _0xA1B8 = _0xA194["toFixed"](5);
  let _0xA1A6 = 10000;
  let _0xA1CA = _0xA1B8 * 10000;
  let _0xA182 = 0;
  function _0xA1DC() {
      _0xA182 = _0xA1A6 > _0xA1CA ? _0xA1A6 : _0xA1CA;
      for (let _0x9558 = _0xA182; _0x9558 > 1; _0x9558--) {
          if (Number["isInteger"](_0xA1CA / _0x9558) && Number["isInteger"](_0xA1A6 / _0x9558)) {
              _0xA1CA = _0xA1CA / _0x9558;
              _0xA1A6 = _0xA1A6 / _0x9558;
              _0xA1DC()
          }
      }
  }
  _0xA1DC();
  return _0xA1CA + "/" + _0xA1A6
}
function setBarsPerstaff(_0x95E8, _0x973E) {
  if (_0x973E == "") {
      _0x973E = 0
  }
  ;var _0x961E = $("#" + _0x95E8)["val"]();
  var _0x98B8 = /%%barsperstaff\s*(\d)*\n/;
  if (parseInt(_0x973E) < 1) {
      _0x961E = _0x961E["replaceAll"](_0x98B8, "")
  } else {
      var _0xC060 = _0x961E["match"](_0x98B8);
      var _0x9534 = "%%barsperstaff " + _0x973E + "\x0A";
      if (_0xC060 != null) {
          _0x961E = _0x961E["replaceAll"](_0x98B8, _0x9534)
      } else {
          _0x961E = _0x9534 + _0x961E
      }
  }
  ;$("#" + _0x95E8)["val"](_0x961E);
  doLog();
  src_change();
  return;
  var _0xB640 = handleBreakLine(_0x961E, _0x973E);
  $("#" + _0x95E8)["val"](_0xB640);
  abc_change()
}
function showNodeSeq(_0x95E8) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  var _0x98B8 = /%%measurenb\s*1\n%%contbarnb 1\n/;
  var _0xC060 = _0x961E["match"](_0x98B8);
  var _0x9534 = "%%measurenb 1\x0A%%contbarnb 1\x0A";
  if (_0xC060 != null) {
      _0x961E = _0x961E["replaceAll"](_0x98B8, "")
  } else {
      _0x961E = _0x9534 + _0x961E
  }
  ;if (_0x961E["indexOf"]("%%showfirstmeasure") > -1) {
      _0x961E = _0x961E["replaceAll"](/%%showfirstmeasure\n/, "")
  }
  ;_0x961E = _0x961E["replaceAll"](/%%measurenb\s*0\n/, "");
  $("#" + _0x95E8)["val"](_0x961E);
  abc_change()
}
function showNodeSeq5(_0x95E8) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  var _0x98B8 = /%%measurenb.*\n/;
  var _0xC060 = _0x961E["match"](_0x98B8);
  var _0x9534 = "%%measurenb 5\x0A";
  if (_0xC060 != null) {
      _0x961E = _0x961E["replaceAll"](_0x98B8, "")
  } else {
      _0x961E = _0x9534 + _0x961E
  }
  ;if (_0x961E["indexOf"]("%%showfirstmeasure") > -1) {
      _0x961E = _0x961E["replaceAll"](/%%showfirstmeasure\n/, "")
  }
  ;_0x961E = _0x961E["replaceAll"](/%%measurenb\s*0\n/, "");
  $("#" + _0x95E8)["val"](_0x961E);
  y;
  abc_change()
}
function showMeasurebox(_0x95E8) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  if (_0x961E["indexOf"]("%%measurebox") > -1) {
      _0x961E = _0x961E["replaceAll"](/%%measurebox\n/, "")
  } else {
      _0x961E = "%%measurebox\x0A" + _0x961E
  }
  ;$("#" + _0x95E8)["val"](_0x961E);
  abc_change();
  doLog()
}
function showLineFirstNodeSeq(_0x95E8) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  var _0x98B8 = /%%measurenb\s*0\n/;
  var _0xC060 = _0x961E["match"](_0x98B8);
  var _0x9534 = "%%measurenb 0\x0A";
  if (_0xC060 != null) {
      _0x961E = _0x961E["replaceAll"](_0x98B8, "")
  } else {
      _0x961E = _0x9534 + _0x961E
  }
  ;_0x961E = _0x961E["replaceAll"](/%%measurenb\s*1\n/, "");
  $("#" + _0x95E8)["val"](_0x961E);
  abc_change()
}
function getVoicePart(_0x95E8, _0x99C6) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  var _0x9708 = _0x961E["split"]("\x0A");
  var _0xB394 = "";
  for (var _0x96D2 = 0; _0x96D2 < _0x99C6["length"]; _0x96D2++) {
      var _0xA104 = _0x99C6[_0x96D2];
      var _0xB3DC = "V:" + (_0xA104 + 1) + "\x0A";
      var _0xB3CA = "%%MIDI program PRONUM \x0A";
      var _0x985E = _0xB3DC + "";
      var _0xB3B8 = -1;
      for (var _0x9558 = 0; _0x9558 < syms["length"]; _0x9558++) {
          if (!syms[_0x9558]) {
              continue
          }
          ;var _0x98DC = syms[_0x9558];
          if (_0xB3CA["indexOf"]("PRONUM") > -1) {
              _0xB3CA = _0xB3CA["replace"]("PRONUM", _0x98DC["p_v"]["instr"] == undefined ? 0 : _0x98DC["p_v"]["instr"])
          }
          ;var _0xB304 = findLineNumByIndex(_0x961E, _0x98DC["istart"]);
          if (_0xB304 != _0xB3B8) {
              if (_0x9708[_0xB304]["indexOf"]("V:") < 0 && _0x9708[_0xB304]["indexOf"]("score") < 0 && _0x9708[_0xB304]["indexOf"]("stave") < 0) {
                  _0x985E += _0x9708[_0xB304] + "\x0A"
              }
          }
          ;_0xB3B8 = _0xB304
      }
      ;_0xB394 += _0x985E
  }
  ;var _0xB3A6 = getHeadStaff("source");
  return _0xB3A6 + _0xB3CA + _0xB394
}
function getVoiceList(_0x95E8) {
  all_s(true);
  var _0xB382 = new Array();
  for (var _0x9558 = 0; _0x9558 < s_list["length"]; _0x9558++) {
      var _0x98DC = s_list[_0x9558];
      if (_0xB382["indexOf"](_0x98DC["v"]) < 0) {
          _0xB382["push"](_0x98DC["v"])
      }
  }
  ;return _0xB382
}
function replaceBlankNote(_0x961E) {
  var _0xBD48 = -1;
  var _0xB08E = all_s(false);
  var _0xBD7E = getNoteData();
  var _0xBD6C = "";
  var _0xBD5A = new Array();
  var _0xB058 = 0;
  var _0x99C6 = new Array();
  for (var _0x9558 = 0; _0x9558 < _0xBD7E["length"]; _0x9558++) {
      var _0x9C06 = _0xBD7E[_0x9558];
      if (_0x9C06[3] != 0) {
          _0xBD48 = _0x9558;
          break
      } else {
          var _0x9EC4 = _0x9C06[0];
          for (var _0x96D2 = 0; _0x96D2 < _0xB08E["length"]; _0x96D2++) {
              var _0x98DC = _0xB08E[_0x96D2];
              if (_0x98DC["istart"] == _0x9EC4) {
                  _0x961E = replaceByIndex(_0x961E, _0x98DC["istart"], _0x98DC["iend"])
              }
          }
      }
  }
  ;return _0x961E
}
function replaceByIndex(_0x961E, _0xA0BC, _0xA02C) {
  var _0x9CCC = _0x961E["substring"](_0xA0BC, _0xA02C);
  _0x9CCC = _0x9CCC["replace"]("x", "y");
  var _0xB640 = _0x961E["substring"](0, _0xA0BC) + _0x9CCC + _0x961E["substring"](_0xA02C);
  return _0xB640
}
function setTitleSize(_0x95E8, _0xC072) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  if (_0xC072 != "") {
      var _0xC096 = /titlefont.*/;
      var _0x9882 = _0x961E["match"](_0xC096);
      if (_0x9882 != null) {
          var _0xC084 = _0x9882[0];
          var _0xB178 = new RegExp(/[0-9]/);
          if (_0xB178["test"](_0xC084)) {
              _0x961E = _0x961E["replace"](_0xC084, _0xC084["replace"](/[0-9]\d*/, _0xC072))
          } else {
              _0x961E = _0x961E["replace"](_0xC084, _0xC084 + " " + _0xC072)
          }
      } else {
          _0x961E = "%%titlefont Microsoft-YaHei " + _0xC072 + "\x0A" + _0x961E
      }
  }
  ;$("#" + _0x95E8)["val"](_0x961E);
  abc_change()
}
function setTitleColor(_0x95E8, _0x99FC) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  if (_0x99FC != "") {
      if (_0x99FC["indexOf"]("#") < 0) {
          _0x99FC = "#" + _0x99FC
      }
      ;var _0xC0BA = /titlecolor.*/;
      var _0x9882 = _0x961E["match"](_0xC0BA);
      if (_0x9882 != null) {
          var _0xC084 = _0x9882[0];
          _0x961E = _0x961E["replace"](_0xC084, "titlecolor " + _0x99FC)
      } else {
          _0x961E = "%%titlecolor " + _0x99FC + "\x0A" + _0x961E
      }
  }
  ;$("#" + _0x95E8)["val"](_0x961E);
  abc_change()
}
function setTitleBold(_0x95E8, _0xC102) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  if (_0xC102) {
      if (_0x961E["indexOf"]("titlefont serifB") > -1) {
          return
      }
      ;if (_0x961E["indexOf"]("titlefont serif") > -1) {
          _0x961E = _0x961E["replace"]("titlefont serif", "titlefont serifB")
      } else {
          _0x961E = "%%titlefont serifB\x0A" + _0x961E
      }
  } else {
      if (_0x961E["indexOf"]("titlefont serifB") > -1) {
          _0x961E = _0x961E["replace"]("titlefont serifB", "titlefont serif")
      }
  }
  ;$("#" + _0x95E8)["val"](_0x961E);
  abc_change()
}
function setLyricSize(_0x95E8, _0xC072) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  if (_0xC072 != "") {
      var _0xC096 = /vocalfont.*/;
      var _0x9882 = _0x961E["match"](_0xC096);
      if (_0x9882 != null) {
          var _0xC084 = _0x9882[0];
          _0x961E = _0x961E["replace"](_0xC084, _0xC084["replace"](/[0-9]\d*/, _0xC072))
      } else {
          _0x961E = "%%vocalfont serifBold " + _0xC072 + "\x0A" + _0x961E
      }
  }
  ;$("#" + _0x95E8)["val"](_0x961E);
  abc_change()
}
function setBracketGchSize() {
  var _0xC072 = $("#bracketGchFontSize")["val"]();
  setBracketGchFontSize("source", _0xC072)
}
function setBracketGchFontSize(_0x95E8, _0xC072) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  if (_0xC072 != "") {
      var _0xC096 = /brackgchfont.*/;
      var _0x9882 = _0x961E["match"](_0xC096);
      if (_0x9882 != null) {
          var _0xC084 = _0x9882[0];
          _0x961E = _0x961E["replace"](_0xC084, _0xC084["replace"](/[0-9]\d*/, _0xC072))
      } else {
          _0x961E = "%%brackgchfont " + _0xC072 + "\x0A" + _0x961E
      }
  }
  ;$("#" + _0x95E8)["val"](_0x961E);
  abc_change()
}
function setLyricColor(_0x95E8, _0x99FC) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  if (_0x99FC != "") {
      if (_0x99FC["indexOf"]("#") < 0) {
          _0x99FC = "#" + _0x99FC
      }
      ;var _0xC0BA = /lyriccolor.*/;
      var _0x9882 = _0x961E["match"](_0xC0BA);
      if (_0x9882 != null) {
          var _0xC084 = _0x9882[0];
          _0x961E = _0x961E["replace"](_0xC084, "lyriccolor " + _0x99FC)
      } else {
          _0x961E = "%%lyriccolor " + _0x99FC + "\x0A" + _0x961E
      }
  }
  ;$("#" + _0x95E8)["val"](_0x961E);
  abc_change()
}
function dataURIToBlob(_0xA13A) {
  var _0xA170 = atob(_0xA13A["split"](",")[1])
    , _0x9B64 = _0xA170["length"]
    , _0x9AD4 = new Uint8Array(_0x9B64);
  for (var _0x9558 = 0; _0x9558 < _0x9B64; _0x9558++) {
      _0x9AD4[_0x9558] = _0xA170["charCodeAt"](_0x9558)
  }
  ;return new Blob([_0x9AD4])
}
function exportPdf(_0xA320, _0xA2FC) {
  var _0xA356 = new jsPDF("","pt","a4");
  var _0xA332 = 0;
  var _0xA30E = 0;
  var _0xA368 = 0;
  var _0xA344 = setInterval(function() {
      if (_0xA368 != 0) {
          return
      }
      ;if (_0xA30E > _0xA320["length"] - 1) {
          clearInterval(_0xA344);
          return
      }
      ;var _0xA38C = _0xA320[_0xA30E++];
      console["log"](_0xA38C["id"]);
      _0xA368 = 1;
      console["log"]("currIndex:", _0xA30E);
      $("#maskfulltxt")["html"]("\u6b63\u5728\u5bfc\u51fa\u7b2c(" + _0xA30E + "/" + _0xA320["length"] + ")\u9875");
      html2canvas(_0xA38C, {
          async: false,
          onrendered: function(_0xA39E) {
              var _0xA3C2 = _0xA39E["width"];
              var _0xA3B0 = _0xA39E["height"];
              var _0xA41C = _0xA3C2 / 592.28 * 841.89;
              var _0xA3F8 = _0xA3B0;
              var _0xA42E = 0;
              var _0xA3E6 = 595.28;
              var _0xA3D4 = 592.28 / _0xA3C2 * _0xA3B0;
              var _0xA40A = _0xA39E["toDataURL"]("image/jpeg", 1.0);
              if (_0xA3F8 < _0xA41C) {
                  _0xA356["addImage"](_0xA40A, "JPEG", 0, 0, _0xA3E6, _0xA3D4);
                  if (_0xA30E < _0xA320["length"]) {
                      _0xA356["addPage"]()
                  }
              } else {
                  while (_0xA3F8 > 0) {
                      _0xA356["addImage"](_0xA40A, "JPEG", 0, _0xA42E, _0xA3E6, _0xA3D4);
                      _0xA3F8 -= _0xA41C;
                      _0xA42E -= 841.89;
                      if (_0xA3F8 > 0) {
                          _0xA356["addPage"]()
                      }
                  }
              }
              ;_0xA368 = 0;
              _0xA332++
          }
      })
  }, 500);
  var _0xA37A = setInterval(function() {
      if (_0xA332 > _0xA320["length"] - 1) {
          var _0xA440 = getT();
          if (!_0xA440) {
              _0xA440 = "content"
          } else {
              _0xA440 = _0xA440["replace"](/\s/g, "")
          }
          ;_0xA356["save"](_0xA440 + ".pdf");
          clearInterval(_0xA37A);
          if (typeof _0xA2FC == "function") {
              _0xA2FC()
          }
      }
  }, 500)
}
function getImageBase64(_0xA93E, _0xA92C) {
  var _0xA39E = document["createElement"]("canvas");
  _0xA39E["width"] = _0xA93E["width"];
  _0xA39E["height"] = _0xA93E["height"];
  var _0xA908 = _0xA39E["getContext"]("2d");
  _0xA908["drawImage"](_0xA93E, 0, 0, _0xA93E["width"], _0xA93E["height"]);
  var _0xA91A = _0xA39E["toDataURL"]("image/" + _0xA92C);
  _0xA39E = null;
  return _0xA91A
}
function dragFunc(_0xA200) {
  var _0xA1EE = document["getElementById"](_0xA200);
  _0xA1EE["onmousedown"] = function(_0xA248) {
      var _0xA236 = _0xA248 || window["event"];
      _0xA248["stopPropagation"]();
      var _0xA212 = _0xA236["pageX"] - _0xA1EE["offsetLeft"];
      var _0xA224 = _0xA236["pageY"] - _0xA1EE["offsetTop"];
      document["onmousemove"] = function(_0xA248) {
          var _0xA236 = _0xA248 || window["event"];
          _0xA1EE["style"]["left"] = _0xA236["pageX"] - _0xA212 + 350 + "px";
          _0xA1EE["style"]["top"] = _0xA236["pageY"] - _0xA224 + "px";
          _0xA1EE["style"]["cursor"] = "move"
      }
  }
  ;
  _0xA1EE["onmouseup"] = function() {
      document["onmousemove"] = null;
      this["style"]["cursor"] = "default"
  }
}
function barLineCoorData(_0x9AE6, _0x9B0A) {
  if (!bar_seq) {
      getNoteData()
  }
  ;var _0x9B2E = 12;
  for (var _0x9558 = 0; _0x9558 < _0x9AE6["length"]; _0x9558++) {
      var _0x9AF8 = _0x9AE6[_0x9558];
      if (_0x9B0A != 2) {
          _0x9AF8["barline_end"][0] += _0x9B2E;
          _0x9AF8["barline_end"][2] += _0x9B2E;
          _0x9AF8["barline_start"][0] += _0x9B2E;
          _0x9AF8["barline_start"][2] += _0x9B2E
      }
      ;if (_0x9AF8["notes"] && _0x9AF8["notes"]["length"] > 0) {
          continue
      }
      ;var _0x9B1C = _0x9AF8["node_index"];
      for (var _0x96D2 = 0; _0x96D2 < bar_seq["length"]; _0x96D2++) {
          if (bar_seq[_0x96D2]["node_index"] == _0x9B1C) {
              _0x9AF8["notes"] = new Array();
              var _0x9AD4 = new Array();
              _0x9AD4["push"]("");
              _0x9AD4["push"](bar_seq[_0x96D2]["beat"]);
              _0x9AF8["notes"]["push"](_0x9AD4);
              break
          }
      }
  }
}
var switchMeter = new Array();
function showStrongWeak(_0x95E8) {
  switchMeter = new Array();
  var _0x961E = $("#" + _0x95E8)["val"]();
  if (_0x961E["indexOf"]("showbeat") > -1) {
      _0x961E = _0x961E["replace"]("%%showbeat\x0A", "");
      $("#" + _0x95E8)["val"](_0x961E);
      src_change();
      return
  } else {
      _0x961E = "%%showbeat\x0A" + _0x961E
  }
  ;$("#" + _0x95E8)["val"](_0x961E);
  src_change();
  var _0xC192 = getAllMeter("source");
  if (_0xC192 != null) {
      for (var _0x9558 = 0; _0x9558 < _0xC192["length"]; _0x9558++) {
          var _0x9534 = _0xC192[_0x9558];
          var _0x9882 = _0x9534["match"](/M\s*:\s*([1-9])\/[1-9]/);
          var _0x9870 = _0x9882[1];
          if (_0x9870 == 5 || _0x9870 == 7) {
              switchMeter["push"](_0x9870)
          }
      }
  }
  ;if (switchMeter["length"] > 0) {
      var _0xC16E = false;
      var _0xC180 = false;
      for (var _0x9558 = 0; _0x9558 < switchMeter["length"]; _0x9558++) {
          if (switchMeter[_0x9558]["indexOf"]("5") > -1) {
              _0xC16E = true;
              $("#m5_div")["css"]("display", "");
              continue
          }
          ;if (switchMeter[_0x9558]["indexOf"]("7") > -1) {
              _0xC180 = true;
              $("#m7_div")["css"]("display", "");
              continue
          }
      }
      ;if (!_0xC16E) {
          $("#m5_div")["css"]("display", "none")
      }
      ;if (!_0xC180) {
          $("#m7_div")["css"]("display", "none")
      }
      ;if (_0xC16E && _0xC180) {
          $("#METER_MODEL_div .modal-content")["css"]("height", 400)
      }
      ;$("#METER_MODEL_div .modal-content")["css"]("left", ($(window)["width"]() - $("#METER_MODEL_div .modal-content")["width"]()) / 2);
      $("#METER_MODEL_div")["modal"]({
          keyboard: true
      })
  } else {
      src_change()
  }
}
function toggleKew(_0x95E8) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  if (_0x961E["indexOf"]("showkew") > -1) {
      _0x961E = _0x961E["replace"]("%%showkew\x0A", "");
      $("#" + _0x95E8)["val"](_0x961E);
      src_change();
      return
  } else {
      _0x961E = "%%showkew\x0A" + _0x961E
  }
  ;$("#" + _0x95E8)["val"](_0x961E);
  src_change()
}
function changeMeterModel5(_0x9DDA) {
  beatModel5 = _0x9DDA;
  src_change()
}
function changeMeterModel7(_0x9DDA) {
  beatModel7 = _0x9DDA;
  src_change()
}
function getAllMeter(_0x95E8) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  var _0xA64A = /M\s*:\s*[1-9]\/[1-9]/g;
  return _0x961E["match"](_0xA64A)
}
function toggleLyric(_0x95E8) {
  var _0x961E = $("#" + _0x95E8)["val"]();
  if (_0x961E["indexOf"]("hidelyric") > -1) {
      _0x961E = _0x961E["replace"]("%%hidelyric\x0A", "")
  } else {
      _0x961E = "%%hidelyric\x0A" + _0x961E
  }
  ;$("#" + _0x95E8)["val"](_0x961E);
  src_change()
}
function toggleAbcKeyValue(_0xA614, _0x9DFE, _0xA464) {
  var _0x9522 = new RegExp(_0x9DFE + ".*(\\r)*(?=\\n)");
  var _0xA638 = _0x9522["exec"](_0xA614);
  if (!_0xA638) {
      return _0x9DFE + " " + _0xA464 + "\x0A" + _0xA614
  }
  ;_0xA638 = _0xA638[0];
  _0xA614 = _0xA614["replace"](_0xA638, "");
  return _0xA614
}
function setAbcKeyValue(_0xA614, _0x9DFE, _0xA464) {
  if (_0x9DFE["indexOf"]("%%MIDI program") != -1) {
      return setAbcProgram(_0xA614, _0x9DFE, _0xA464)
  }
  ;var _0x9522 = new RegExp(_0x9DFE + ".*(\\r)*(?=\\n)");
  var _0xA638 = _0x9522["exec"](_0xA614);
  if (!_0xA638) {
      if (_0x9DFE == "%%score") {
          var _0xBF9A = new RegExp("K:.*(\\r)*(?=\\n)");
          var _0xBFAC = _0xBF9A["exec"](_0xA614);
          if (_0xBFAC) {
              _0xA614 = _0xA614["replace"](_0xBFAC[0], _0xBFAC[0] + "\x0A" + _0x9DFE + " " + _0xA464)
          }
          ;return _0xA614
      } else {
          return _0x9DFE + " " + _0xA464 + "\x0A" + _0xA614
      }
  }
  ;_0xA638 = _0xA638[0];
  _0xA614 = _0xA614["replace"](_0xA638, _0x9DFE + " " + (_0xA464 || ""));
  return _0xA614
}
function convert2RhythmAndPlay(_0x961E, _0x99C6, _0xA086) {
  if (_0xA086) {
      $("#source")["val"](setAbcKeyValue(_0x961E, "%%score", _0xA086));
      src_change()
  }
  ;var _0xA0CE = getVoicePart("source", _0x99C6);
  var _0x96E4 = "";
  var _0x9936 = 0;
  for (var _0x9558 = 0; _0x9558 < syms["length"]; _0x9558++) {
      var _0x97CE = syms[_0x9558];
      if (_0x97CE) {
          if (_0x97CE["v"] == _0x9936 && (_0x97CE["type"] == 8 || _0x97CE["type"] == 10) && !_0x97CE["grace"]) {
              _0x96E4 = decimalsToFractional(_0x97CE["my_ulen"] / 1536);
              break
          }
      }
  }
  ;var _0xA074 = _0x961E["indexOf"]("%%score") == -1 && _0x961E["indexOf"]("%%staves") == -1;
  var _0xA062 = false;
  var _0xA0BC = 0;
  var _0xA02C = 0;
  var _0xA01A = 0;
  var _0xA0AA = "V:" + (_0x99C6[0] + 1);
  var _0xA098 = "%%score [ " + (_0x99C6[0] - 0 + 1) + " 9 ]";
  var _0xA008 = new Array();
  var _0x9FF6 = getLinesInfo($("#source")["val"]());
  var _0x9708 = _0x9FF6;
  var _0xA03E = false;
  for (var _0x9558 = 0; _0x9558 < _0x9FF6["length"]; _0x9558++) {
      var _0x983A = _0x9FF6[_0x9558];
      if (_0x983A["v"] == _0x99C6[0] && _0x983A["type"] == "note") {
          _0xA02C++
      }
      ;var _0x9FE4 = _0x983A["lineStr"];
      if (_0x9FF6[_0x9558]["type"] == "note") {
          _0xA03E = true
      }
      ;var _0xA050 = false;
      if (_0x9FE4["indexOf"](_0xA0AA) != -1) {
          _0xA01A++;
          if (_0xA01A > 1) {
              _0xA050 = true
          }
      }
      ;if (_0xA062) {
          _0xA062 = false;
          _0xA050 = false
      }
      ;if (_0x9FE4["indexOf"]("%%score") != -1 && _0xA01A > 0) {
          _0xA050 = true;
          _0xA062 = true
      }
      ;if (_0xA03E && _0xA050) {
          var _0x9D4A = "";
          var _0x9FAE = false;
          for (var _0x96D2 = _0xA0BC; _0x96D2 < _0x9708["length"]; _0x96D2++) {
              var _0x96F6 = _0x9708[_0x96D2]["lineStr"];
              if (_0x9708[_0x96D2]["v"] == _0x99C6[0] && _0x9708[_0x96D2]["type"] == "note") {
                  _0x96F6 = getRhythmLine(_0x96F6);
                  _0x96F6 = _0x96F6["replace"](/\".[^\"]*\"/g, "");
                  if (!_0x9FAE) {
                      _0x96F6 = "\x0AV:9 perc stafflines=1 octave=0\x0A" + _0x96F6;
                      _0x9FAE = true
                  }
                  ;_0x9D4A += _0x96F6 + "\x0A";
                  _0xA0BC = _0x96D2 + 1;
                  _0xA008["push"](_0x96F6 + "\x0A");
                  _0xA02C--;
                  if (_0xA02C == 0) {
                      _0xA008["push"]("%%MIDI program 115\x0A");
                      break
                  }
              }
          }
      }
      ;if (_0x9FE4["indexOf"]("%%score") != -1) {
          _0xA008["push"](_0xA098)
      } else {
          _0xA008["push"](_0x9FE4)
      }
      ;if (_0xA074 && _0x9FE4["trim"]()["indexOf"]("X:") == 0) {
          _0xA008["push"](_0xA098 + "\x0A")
      }
  }
  ;var _0x9D4A = "";
  var _0x9FAE = false;
  var _0x9FD2 = false;
  for (var _0x96D2 = _0xA0BC; _0x96D2 < _0x9708["length"]; _0x96D2++) {
      var _0x96F6 = _0x9708[_0x96D2]["lineStr"];
      if (_0x9708[_0x96D2]["v"] == _0x99C6[0] && _0x9708[_0x96D2]["type"] == "note") {
          _0x96F6 = getRhythmLine(_0x96F6);
          _0x96F6 = _0x96F6["replace"](/\".[^\"]*\"/g, "");
          if (!_0x9FAE) {
              _0x96F6 = "\x0AV:9 perc stafflines=1 octave=0\x0A" + _0x96F6;
              _0x9FAE = true
          }
          ;_0x9D4A += _0x96F6 + "\x0A";
          _0xA008["push"](_0x96F6 + "\x0A");
          _0x9FD2 = true
      }
  }
  ;_0x961E = _0xA008["join"]("\x0A");
  _0x9D4A = _0x961E;
  if (_0x9FD2) {
      _0x9D4A += "\x0A%%MIDI program 115"
  }
  ;var _0x9774 = replaceBlankLine(_0x9D4A);
  if (_0x9774["trim"]()["endWith"]("%%endtext")) {
      var _0x9522 = /%%begintext/g;
      var _0x997E = _0x9774["match"](_0x9522);
      if (_0x997E["length"] > 0) {
          for (var _0x9558 = _0x997E["length"]; _0x9558 > 0; _0x9558--) {
              var _0x98CA = _0x9522["exec"](_0x9774);
              if (_0x9558 == 1) {
                  _0x9774 = _0x9774["substring"](0, _0x98CA["index"])
              }
          }
      }
  }
  ;if (_0x9774["match"](/L:/g) != null && _0x9774["match"](/L:/g)["length"] > 1) {
      _0x9774 = _0x9774["replace"](/V:9 perc stafflines=1 octave=0/g, "V:9 perc stafflines=1 octave=0\x0AL:" + _0x96E4 + "\x0A%%MIDI program 115")
  }
  ;return _0x9774
}
function convertStaffAndRhythm(_0x961E, _0xA104) {
  var _0x9708 = getLinesInfo(_0x961E);
  var _0xA0F2 = "";
  var _0x9D4A = "";
  var _0xA01A = 0;
  for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
      var _0x96F6 = _0x9708[_0x9558];
      var _0xA0E0 = _0x96F6["type"];
      var _0x985E = _0x96F6["lineStr"];
      if (_0xA0E0 == "note" && _0x96F6["v"] == _0xA104) {
          _0xA0F2 += getRhythmLine(_0x985E) + "\x0A"
      }
      ;if (_0xA0F2 != "" && _0x96F6["v"] != _0xA104) {
          if (_0xA01A == 0) {
              _0xA0F2 = "V:9 perc stafflines=1 octave=0\x0A%%MIDI program 115\x0A" + _0xA0F2
          } else {
              _0xA0F2 = "V:9\x0A" + _0xA0F2
          }
          ;_0x9D4A += _0xA0F2;
          _0xA0F2 = "";
          _0xA01A++
      }
      ;if (_0x96F6["type"] == "score") {
          _0x985E = _0x985E + " 9"
      }
      ;_0x9D4A += _0x985E + "\x0A"
  }
  ;if (_0xA01A == 0) {
      _0x9D4A += "V:9 perc stafflines=1 octave=0\x0A%%MIDI program 115\x0A" + _0xA0F2;
      _0xA0F2 = ""
  }
  ;if (_0xA0F2 != "") {
      if (_0xA01A == 0) {
          _0xA0F2 = "V:9 perc stafflines=1 octave=0\x0A%%MIDI program 115\x0A" + _0xA0F2
      } else {
          _0xA0F2 = "V:9\x0A" + _0xA0F2
      }
      ;_0x9D4A += _0xA0F2;
      _0xA0F2 = ""
  }
  ;_0x9D4A = replaceBlankLine(_0x9D4A);
  return _0x9D4A
}
function setAbcProgram(_0xA614, _0x9DFE, _0xA464) {
  var _0x9522 = new RegExp(_0x9DFE + ".*(\\r)*(?=\\n)*","gi");
  var _0xA638 = _0xA614["match"](_0x9522);
  if (!_0xA638) {
      return _0x9DFE + " " + _0xA464 + "\x0A" + _0xA614
  } else {
      if (_0xA638["length"] == 1) {
          var _0xBFD0 = _0xA614["indexOf"]("V:99 perc") != -1;
          var _0xBFBE = _0xA614["indexOf"]("V:9 perc") != -1;
          if (_0xBFD0 || _0xBFBE) {
              return _0x9DFE + " " + _0xA464 + "\x0A" + _0xA614
          }
      }
  }
  ;_0xA638 = _0xA638[0];
  _0xA614 = _0xA614["replace"](_0xA638, _0x9DFE + " " + _0xA464);
  return _0xA614
}
function getAbcKeyValue(_0xA614, _0x9DFE) {
  var _0x9522 = new RegExp(_0x9DFE + ".*(\\r)*(?=\\n)");
  var _0xA638 = _0x9522["exec"](_0xA614);
  if (!_0xA638) {
      return ""
  }
  ;_0xA638 = _0xA638[0];
  var _0xA626 = _0xA638["replace"](_0x9DFE, "")["replace"](/(^\s*)|(\s*$)/g, "");
  return _0xA626
}
function removeAbcKeyValue(_0xA614, _0x9DFE) {
  var _0x9522 = new RegExp(_0x9DFE + ".*(\\r)*(?=\\n)\\n");
  var _0xA638 = _0x9522["exec"](_0xA614);
  if (!_0xA638) {
      return _0xA614
  }
  ;_0xA638 = _0xA638[0];
  _0xA614 = _0xA614["replace"](_0xA638, "");
  return _0xA614
}
function renderMusicForm(_0xBA66, _0xA710, _0xBA54) {
  if (_0xBA54) {
      renderMusicFormByNote(_0xBA66, _0xA710)
  } else {
      renderMusicFormByBar(_0xBA66, _0xA710)
  }
}
function renderMusicFormByNote(_0xBA66, _0xA710, _0xBA54) {
  if (_0xBA66 != null && _0xBA66["length"] > 0) {
      var _0xBB2C = clone(_0xBA66);
      _0xBB2C["sort"](function(_0x9546, _0x9798) {
          return _0x9798["orderby"]["length"] - _0x9546["orderby"]["length"]
      });
      var _0x9A44 = (_0xBB2C[0]["orderby"])["length"] / 3;
      $(".music-form")["remove"]();
      $(".nobrk")["css"]({
          position: "relative",
          padding: 0
      });
      var _0xBC5E = [];
      var $notes;
      if (musicType == 2) {
          $notes = $("svg rect[type=\'splnum_note\']:not(.ph), svg rect[type=\'splnum_rest\']:not(.ph)")
      } else {
          $notes = $("svg rect[type=\'note\'], svg rect[type=\'rest\']")
      }
      ;var _0xBA78 = getBarLineCoor(_0xA710, 0, 9);
      $notes["each"](function(_0x9D02, _0x960C) {
          var $this = $(this);
          var _0x9EC4 = $this["attr"]("istart");
          var _0x96F6 = $this["parents"]("svg")["index"]();
          var _0x969C = $this["attr"]("x") * _0xA710;
          var _0x99EA = $this["attr"]("width") * _0xA710;
          var _0xBCEE;
          var _0xBCDC = _0xBA78["find"](function(_0x960C) {
              if (_0x9D02 == 0 && _0x960C["barline_start"][0] >= _0x969C) {
                  _0x969C = _0x960C["barline_start"][0]
              }
              ;_0xBCEE = _0x969C + _0x99EA / 2;
              return _0x960C["line"] == _0x96F6 && _0x960C["barline_start"][0] <= _0xBCEE && _0x960C["barline_end"][0] >= _0xBCEE
          });
          if (_0xBCDC) {
              _0xBC5E["push"]({
                  x1: _0x969C,
                  y1: _0xBCDC["barline_start"][1],
                  x2: _0x969C + _0x99EA + 2,
                  y2: _0xBCDC["barline_end"][1] + $(this)["outerHeight"](),
                  istart: _0x9EC4,
                  line: _0x96F6
              })
          }
      });
      _0xBC5E["sort"](function(_0x9546, _0x9798) {
          return _0x9546["istart"] - _0x9798["istart"]
      });
      var _0xBC82 = all_s()
        , _0xBCA6 = {};
      for (var _0x9558 = 0; _0x9558 < _0xBC82["length"]; _0x9558++) {
          var _0xBC94 = _0xBC82[_0x9558];
          _0xBCA6[_0xBC94["istart"]] = _0xBC94
      }
      ;for (var _0x9558 = 0; _0x9558 < _0xBC5E["length"]; _0x9558++) {
          var _0xBC16 = _0xBC5E[_0x9558 + 1];
          var _0xBC28 = _0xBC5E[_0x9558];
          var _0xBC3A = _0xBCA6[_0xBC28["istart"]], _0xBBBC = 0, $bar;
          var $barS = null
            , $barE = null
            , $barW = 0;
          if (_0xBC3A["next"] && _0xBC3A["next"]["type"] == 0 && _0xBC3A["prev"] && _0xBC3A["prev"]["type"] == 0 && syms[_0xBC3A["istart"]]["my_line"] == syms[_0xBC3A["prev"]["istart"]]["my_line"]) {
              $barS = $("._" + _0xBC3A["prev"]["istart"] + "_");
              $barE = $("._" + _0xBC3A["next"]["istart"] + "_");
              _0xBC28["x1"] = $barS["attr"]("x") * _0xA710 + $barS["attr"]("width") * _0xA710 * 0.5;
              _0xBC28["x2"] = $barE["attr"]("x") * _0xA710 + $barE["attr"]("width") * _0xA710 * 0.5;
              continue
          }
          ;if (!_0xBC16) {
              continue
          }
          ;if (_0xBC3A["next"] && _0xBC3A["next"]["type"] == 0) {
              _0xBBBC = "end";
              $bar = $("._" + _0xBC3A["next"]["istart"] + "_")
          }
          ;if (_0xBC3A["prev"] && _0xBC3A["prev"]["type"] == 0 && syms[_0xBC3A["istart"]]["my_line"] == syms[_0xBC3A["prev"]["istart"]]["my_line"]) {
              _0xBBBC = "start";
              $bar = $("._" + _0xBC3A["prev"]["istart"] + "_")
          }
          ;if (_0xBBBC) {
              var $bar_x = $bar["attr"]("x") * _0xA710;
              var $bar_w = $bar["attr"]("width") * _0xA710;
              var _0xBC4C = $bar_x + $bar_w / 2;
              switch (_0xBBBC) {
              case "start":
                  _0xBC28["x1"] = _0xBC4C;
                  _0xBC28["x2"] = _0xBC16["x1"];
                  break;
              case "end":
                  _0xBC28["x2"] = _0xBC4C;
                  break
              }
              ;continue
          }
          ;_0xBC28["x2"] = _0xBC16["x1"]
      }
      ;for (var _0x957C = 0; _0x957C < _0xBA66["length"]; _0x957C++) {
          var _0x9A56 = _0xBA66[_0x957C];
          var _0xBCB8 = _0xBC5E[_0x9A56["startNodeIndex"]];
          var _0xBBE0 = _0xBC5E[_0x9A56["endNodeIndex"]];
          if (!_0xBCB8 || !_0xBBE0) {
              continue
          }
          ;var _0xBB1A = _0xBCB8["y1"];
          var _0xBAF6 = _0xBCB8["x1"];
          var _0xBAAE = _0xBBE0["y2"];
          var _0xBA8A = _0xBBE0["x2"];
          var _0xBB08 = _0xBCB8["line"];
          var _0xBA9C = _0xBBE0["line"];
          if (_0xBB08 == _0xBA9C) {
              var _0x9A7A = _0xBA8A - _0xBAF6;
              var _0x9A32 = _0xBAF6;
              var _0x9A68 = _0xBB1A;
              appendDivstr(_0x9A56, _0xBA9C, _0x9A68, _0x9A32, _0x9A7A, _0x9A44)
          } else {
              var _0xBAC0 = true;
              for (var _0x96F6 = _0xBB08; _0x96F6 <= _0xBA9C; _0x96F6++) {
                  var _0xBC70 = _0xBC5E["filter"](function(_0x960C) {
                      return _0x96F6 == _0x960C["line"]
                  });
                  if (!_0xBC70) {
                      continue
                  }
                  ;if (_0x96F6 == _0xBB08) {
                      _0xBC70["sort"](function(_0x9546, _0x9798) {
                          return _0x9798["istart"] - _0x9546["istart"]
                      });
                      var _0xBBCE = _0xBC70[0];
                      var _0x9A7A = _0xBBCE["x2"] - _0xBAF6;
                      var _0x9A32 = _0xBAF6;
                      var _0x9A68 = _0xBB1A
                  } else {
                      if (_0x96F6 == _0xBA9C) {
                          _0xBC70["sort"](function(_0x9546, _0x9798) {
                              return _0x9546["istart"] - _0x9798["istart"]
                          });
                          var _0xBBCE = _0xBC70[0];
                          var _0x9A7A = _0xBA8A - _0xBBCE["x1"];
                          var _0x9A32 = _0xBBCE["x1"];
                          var _0x9A68 = _0xBBCE["y1"]
                      } else {
                          if (_0x96F6 != _0xBB08 && _0x96F6 != _0xBA9C) {
                              _0xBC70["sort"](function(_0x9546, _0x9798) {
                                  return _0x9546["istart"] - _0x9798["istart"]
                              });
                              var _0xBBF2 = _0xBC70[0];
                              _0xBC70["sort"](function(_0x9546, _0x9798) {
                                  return _0x9798["istart"] - _0x9546["istart"]
                              });
                              var _0xBC04 = _0xBC70[0];
                              var _0x9A7A = _0xBC04["x2"] - _0xBBF2["x1"];
                              var _0x9A32 = _0xBBF2["x1"];
                              var _0x9A68 = _0xBBF2["y1"]
                          }
                      }
                  }
                  ;appendDivstr(_0x9A56, _0x96F6, _0x9A68, _0x9A32, _0x9A7A, _0x9A44)
              }
          }
      }
  }
}
function renderMusicFormByBar(_0xBA66, _0xA710) {
  if (_0xBA66 != null && _0xBA66["length"] > 0) {
      var _0xBB2C = clone(_0xBA66);
      _0xBB2C["sort"](function(_0x9546, _0x9798) {
          return _0x9798["orderby"]["length"] - _0x9546["orderby"]["length"]
      });
      var _0x9A44 = (_0xBB2C[0]["orderby"])["length"] / 3;
      $(".music-form")["remove"]();
      $(".nobrk")["css"]({
          position: "relative",
          padding: 0
      });
      var _0xBA78 = getBarLineCoor(_0xA710, 0, 9);
      for (var _0x957C = 0; _0x957C < _0xBA66["length"]; _0x957C++) {
          var _0x9A56 = _0xBA66[_0x957C];
          if (!_0xBA78[_0x9A56["startNodeIndex"]] || !_0xBA78[_0x9A56["endNodeIndex"]]) {
              continue
          }
          ;var _0xBB1A = _0xBA78[_0x9A56["startNodeIndex"]]["barline_start"][1];
          var _0xBAF6 = _0xBA78[_0x9A56["startNodeIndex"]]["barline_start"][0];
          var _0xBAAE = _0xBA78[_0x9A56["endNodeIndex"]]["barline_end"][1];
          var _0xBA8A = _0xBA78[_0x9A56["endNodeIndex"]]["barline_end"][0];
          var _0xBB08 = _0xBA78[_0x9A56["startNodeIndex"]]["line"];
          var _0xBA9C = _0xBA78[_0x9A56["endNodeIndex"]]["line"];
          if (_0xBB08 == _0xBA9C) {
              var _0x9A7A = _0xBA8A - _0xBAF6;
              var _0x9A32 = _0xBAF6;
              var _0x9A68 = _0xBB1A;
              appendDivstr(_0x9A56, _0xBA9C, _0x9A68, _0x9A32, _0x9A7A, _0x9A44)
          } else {
              var _0xBAC0 = true;
              for (var _0x96D2 = _0x9A56["endNodeIndex"] - 1; _0x96D2 >= _0x9A56["startNodeIndex"]; _0x96D2--) {
                  var _0xBAE4 = _0xBA78[_0x96D2]["barline_start"][1];
                  var _0xBAD2 = _0xBA78[_0x96D2]["line"];
                  if (_0xBAD2 != _0xBA9C) {
                      var _0x9A7A = _0xBA8A - _0xBA78[_0x96D2 + 1]["barline_start"][0];
                      var _0x9A32 = _0xBA78[_0x96D2 + 1]["barline_start"][0];
                      var _0x9A68 = _0xBAAE;
                      appendDivstr(_0x9A56, _0xBA9C, _0x9A68, _0x9A32, _0x9A7A, _0x9A44);
                      _0xBA9C = _0xBA78[_0x96D2]["line"];
                      if (_0xBAD2 != _0xBB08) {
                          _0xBAC0 = false;
                          _0xBAAE = _0xBAE4;
                          _0xBA8A = _0xBA78[_0x96D2]["barline_end"][0]
                      } else {
                          if (_0xBAD2 == _0xBB08) {
                              var _0x9A7A = _0xBA78[_0x96D2]["barline_end"][0] - _0xBAF6;
                              var _0x9A32 = _0xBAF6;
                              var _0x9A68 = _0xBB1A;
                              line = _0xBA78[_0x96D2]["line"];
                              appendDivstr(_0x9A56, _0xBA9C, _0x9A68, _0x9A32, _0x9A7A, _0x9A44);
                              break
                          }
                      }
                  }
              }
          }
      }
  }
}
function draw_slur() {
  var _0xA25A = "<path class=\"mypath stroke\" d=\"M48.93 197.00 C100 197 130 197 152 119\"></path>"
}
function appendDivstr(_0x9A56, _0x96F6, _0x9A68, _0x9A32, _0x9A7A, _0x9A44) {
  var _0x99FC;
  if (_0x9A56["level"] == 2) {
      _0x9A68 -= 30;
      _0x99FC = "rgba(0,0,255,.4);"
  } else {
      if (_0x9A56["level"] == 1) {
          _0x9A68 -= 60;
          _0x99FC = "rgba(255,0,0,.4);"
      }
  }
  ;if (_0x9A56["orderby"]) {
      _0x9A68 += _0x9A56["orderby"]["length"] / 3 * 30 - 30 * (_0x9A44 + 1)
  }
  ;if (_0x9A56["bgcolor"]) {
      _0x99FC = _0x9A56["bgcolor"]
  }
  ;var _0x9A0E = "<div class=\"music-form _id\" data-id=\"_kid\" onclick=\"mfClick(event)\" style=\"position:absolute;overflow:hidden;font-size:18px;color:#fff;text-align:center;line-height:30px;height:30px;top:_top;left:_left;width:_width;\">" + "<div style=\"width:100%;height:30px;background:_bgColor;opacity:.5;border-top:2px solid #eee;border-right:.5px solid #eee;box-sizing: border-box;\" title=\"_desc\">_title</div>" + "</div>";
  if (_0x96F6 > 0) {
      for (var _0x9558 = _0x96F6 - 1; _0x9558 >= 0; _0x9558--) {
          _0x9A68 += $("svg.music:eq(" + _0x9558 + ")")["height"]()
      }
  }
  ;if (musicType == 2) {}
  ;var _0x9A20 = _0x9A0E["replace"]("_top", _0x9A68 + "px")["replace"]("_width", _0x9A7A + "px")["replace"]("_left", _0x9A32 + "px")["replace"]("_bgColor", _0x99FC);
  if (_0x9A56["fieldno"]) {
      _0x9A20 = _0x9A20["replace"]("_title", _0x9A56["fieldno"])
  }
  ;if (_0x9A56["fielddesc"]) {
      _0x9A20 = _0x9A20["replace"]("_desc", _0x9A56["fielddesc"])
  }
  ;if (_0x9A56["id"]) {
      _0x9A20 = _0x9A20["replace"]("_kid", _0x9A56["id"])
  }
  ;_0x9A20 = _0x9A20["replace"]("_title", _0x9A56["title"])["replace"]("_desc", _0x9A56["desc"])["replace"]("_id", "mf-" + _0x9A56["startNodeIndex"] + "-" + _0x9A56["endNodeIndex"] + "-" + (_0x9A56["level"] || _0x9A56["orderby"]["length"] / 3));
  $(".nobrk")["append"](_0x9A20)
}
function setNoteBgColor(_0x99A2) {
  var _0x99FC = "";
  if (_0x99A2 == 1) {
      _0x99FC = $("#noteBgColorInput")["val"]()
  } else {
      if (_0x99A2 == 2) {
          _0x99FC = $("#noteBgColorInput2")["val"]()
      }
  }
  ;if (_0x99FC["indexOf"]("#") < 0) {
      _0x99FC = "#" + _0x99FC
  }
  ;_0x99FC = colorRGB(_0x99FC);
  var _0x9ED6 = $(".selected_text");
  if (_0x9ED6["length"] == 0) {
      return
  }
  ;var _0xC0CC = "";
  if (_0x99A2 == 2) {
      _0xC0CC = "l"
  }
  ;var _0x9D02 = noteBgLength;
  var _0x961E = $("#source")["val"]();
  var _0xC018 = "\"-s-nb" + _0xC0CC + "-" + _0x9D02 + "-" + _0x99FC + "\"";
  var _0xBFE2 = "\"-e-nb-" + _0x9D02 + "-" + _0x99FC + "\"";
  if (_0x9ED6["length"] == 1) {
      var _0x9EC4 = $(_0x9ED6)["attr"]("istart");
      _0x961E = _0x961E["substring"](0, _0x9EC4) + _0xC018 + _0x961E["substring"](_0x9EC4);
      var _0x98DC = syms[_0x9EC4];
      if (_0x98DC) {
          _0x961E = setNoteBgColor_(_0x98DC, _0x961E)
      }
  } else {
      if (_0x9ED6["length"] == 2) {
          var _0x9EE8 = parseInt($(_0x9ED6[0])["attr"]("istart"));
          var _0x9EA0 = parseInt($(_0x9ED6[1])["attr"]("istart"));
          if (_0x9EE8 > _0x9EA0) {
              var _0x9F0C = _0x9EE8 + 0;
              _0x9EE8 = _0x9EA0;
              _0x9EA0 = _0x9F0C
          }
          ;_0x961E = _0x961E["substring"](0, _0x9EE8) + _0xC018 + _0x961E["substring"](_0x9EE8, _0x9EA0) + _0xBFE2 + _0x961E["substring"](_0x9EA0);
          var _0x9EFA = syms[_0x9EE8];
          var _0x9EB2 = syms[_0x9EA0];
          if (_0x9EFA) {
              _0x961E = setNoteBgColor_(_0x9EFA, _0x961E)
          }
          ;if (_0x9EB2) {
              _0x961E = setNoteBgColor_(_0x9EB2, _0x961E)
          }
      } else {
          if (_0x9ED6["length"] > 2) {
              window["top"]["alert"]("\u8bbe\u7f6e\u97f3\u7b26\u80cc\u666f\u8272\u65f6\u6700\u591a\u9009\u4e2d\u4e24\u4e2a\u97f3\u7b26");
              return
          }
      }
  }
  ;$("#source")["val"](_0x961E);
  doLog();
  src_change()
}
function setNoteBgColor_(_0x98DC, _0x961E) {
  if (_0x98DC) {
      if (likeGch(_0x98DC, "-s-nb")) {
          var _0xAF26 = "\"" + getGch(_0x98DC, "-s-nb") + "\"";
          var _0xC0DE = _0xAF26["replace"]("-s-", "-e-");
          _0x961E = _0x961E["replace"](_0xAF26, "")["replace"](_0xC0DE, "")
      } else {
          if (likeGch(_0x98DC, "-e-nb")) {
              var _0xAF26 = "\"" + getGch(_0x98DC, "-e-nb") + "\"";
              var _0xC0F0 = _0xAF26["replace"]("-e-", "-s-");
              _0x961E = _0x961E["replace"](_0xAF26, "")["replace"](_0xC0F0, "")
          }
      }
  }
  ;return _0x961E
}
function clearNoteBgColor(_0x99A2) {
  var _0x9ED6 = $(".selected_text");
  if (_0x9ED6["length"] == 0) {
      return
  }
  ;var _0x961E = $("#source")["val"]();
  if (_0x9ED6["length"] == 1) {
      var _0x9EC4 = $(_0x9ED6)["attr"]("istart");
      var _0x98DC = syms[_0x9EC4];
      if (_0x98DC) {
          _0x961E = setNoteBgColor_(_0x98DC, _0x961E)
      }
  } else {
      if (_0x9ED6["length"] == 2) {
          var _0x9EE8 = parseInt($(_0x9ED6[0])["attr"]("istart"));
          var _0x9EA0 = parseInt($(_0x9ED6[1])["attr"]("istart"));
          if (_0x9EE8 > _0x9EA0) {
              var _0x9F0C = _0x9EE8 + 0;
              _0x9EE8 = _0x9EA0;
              _0x9EA0 = _0x9F0C
          }
          ;var _0x9EFA = syms[_0x9EE8];
          var _0x9EB2 = syms[_0x9EA0];
          if (_0x9EFA) {
              _0x961E = setNoteBgColor_(_0x9EFA, _0x961E)
          }
          ;if (_0x9EB2) {
              _0x961E = setNoteBgColor_(_0x9EB2, _0x961E)
          }
      }
  }
  ;if (_0x99A2 == 1) {
      $("#noteBgColorInput")["val"]("000000");
      $("#noteBgColorInput")["css"]("background-color", "#000000")
  } else {
      if (_0x99A2 == 2) {
          $("#noteBgColorInput2")["val"]("000000");
          $("#noteBgColorInput2")["css"]("background-color", "#000000")
      }
  }
  ;$("#source")["val"](_0x961E);
  doLog();
  src_change()
}
function colorRGB(_0x9F1E) {
  _0x9F1E = _0x9F1E["toLowerCase"]();
  var _0x9522 = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (_0x9F1E && _0x9522["test"](_0x9F1E)) {
      if (_0x9F1E["length"] === 4) {
          var _0x9F42 = "#";
          for (var _0x9558 = 1; _0x9558 < 4; _0x9558 += 1) {
              _0x9F42 += _0x9F1E["slice"](_0x9558, _0x9558 + 1)["concat"](_0x9F1E["slice"](_0x9558, _0x9558 + 1))
          }
          ;_0x9F1E = _0x9F42
      }
      ;var _0x9F30 = [];
      for (var _0x9558 = 1; _0x9558 < 7; _0x9558 += 2) {
          _0x9F30["push"](parseInt("0x" + _0x9F1E["slice"](_0x9558, _0x9558 + 2)))
      }
      ;return "rgb(" + _0x9F30["join"](",") + ")"
  }
  ;return _0x9F1E
}
function hex(_0x969C) {
  return ("0" + parseInt(_0x969C)["toString"](16))["slice"](-2)
}
function RGB2HEX(_0xBF76) {
  _0xBF76 = _0xBF76["match"](/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return "#" + hex(_0xBF76[1]) + hex(_0xBF76[2]) + hex(_0xBF76[3])
}
function setVoiceSlur(_0xADAC, _0xC114) {
  var _0xACB0 = getSelectText(_0xADAC);
  if (_0xACB0 == "") {
      return
  }
  ;var _0xC018 = "";
  var _0xBFE2 = "";
  var _0xAFDA = getStartPos(document["getElementById"](_0xADAC));
  var _0xA9AA = $("#" + _0xADAC)["val"]()["substring"](_0xAFDA - 6, _0xAFDA);
  var _0xC006 = new RegExp(/\([,']([0-9]+)\-/);
  if (_0xC006["test"](_0xA9AA)) {
      var _0xA0BC = _0xA9AA["match"](_0xC006);
      _0xC018 = _0xA0BC[0];
      var _0xA80C = _0xA0BC[1];
      _0xBFE2 = "\"-" + _0xA80C + ")\"";
      var _0x961E = $("#" + _0xADAC)["val"]();
      _0x961E = _0x961E["replace"]("\"" + _0xC018 + "\"", "")["replace"](_0xBFE2, "");
      $("#" + _0xADAC)["val"](_0x961E);
      abc_change();
      return
  }
  ;var _0xBFF4 = new RegExp(/\-([0-9]+)\)/);
  if (_0xBFF4["test"](_0xA9AA)) {
      var _0xA02C = _0xA9AA["match"](_0xBFF4);
      _0xBFE2 = _0xA02C[0];
      var _0xA80C = _0xA02C[1];
      startStr1 = "\"(," + _0xA80C + "-\"";
      startStr2 = "\"(\'" + _0xA80C + "-\"";
      var _0x961E = $("#" + _0xADAC)["val"]();
      _0x961E = _0x961E["replace"](startStr1, "")["replace"](startStr2, "")["replace"](_0xBFE2, "");
      $("#" + _0xADAC)["val"](_0x961E);
      abc_change();
      return
  }
  ;var _0x9D02 = voice_slurs_len;
  _0xC018 = "\"(" + _0xC114 + _0x9D02 + "-\"";
  _0xBFE2 = "\"-" + _0x9D02 + ")\"";
  var _0xBD24 = _0xC018;
  var _0x9882 = _0xACB0["match"](notes_pattern);
  if (_0x9882 != null) {
      var _0xC126 = _0x9882[_0x9882["length"] - 1];
      _0xBD24 += _0xACB0["substring"](0, _0xACB0["length"] - _0xC126["length"]) + _0xBFE2 + _0xC126
  }
  ;replaceSelected(_0xACB0, _0xBD24)
}
function renderNoteBgColor() {
  for (var _0x9558 = 0; _0x9558 < noteBgArray["length"]; _0x9558++) {
      var _0xBD12 = noteBgArray[_0x9558];
      var _0xA0BC = _0xBD12["start"];
      var _0xA02C = _0xBD12["end"];
      var _0xB958 = _0xBD12["is_long"];
      if (_0xA0BC && _0xA02C) {
          var _0x98DC = _0xA0BC["s"];
          var _0xB9B2 = $("rect.abcr._" + _0x98DC["istart"] + "_");
          var _0xB9FA = 0;
          var _0xBA0C = 0;
          if (musicType == 2) {
              var _0xA518 = $(_0xB9B2)["parent"]("g");
              if (_0xA518) {
                  var _0xACC2 = $(_0xA518)["attr"]("transform");
                  var _0xBA30 = /translate\((.[^\[]*)\)/;
                  var _0xBA1E = _0xACC2["match"](_0xBA30);
                  if (_0xBA1E != null) {
                      var _0xBA42 = _0xBA1E[1];
                      _0xB9FA = parseFloat(_0xBA42["replace"](/\s/g, "")["split"](",")[0]);
                      _0xBA0C = parseFloat(_0xBA42["replace"](/\s/g, "")["split"](",")[1])
                  }
              }
          }
          ;var _0xB9D6 = parseFloat(_0xB9B2["attr"]("x"));
          var _0xB9E8 = parseFloat(_0xB9B2["attr"]("y"));
          var _0xB9C4 = parseFloat(_0xB9B2["attr"]("width"));
          var _0xB98E = parseFloat(_0xB9B2["attr"]("height"));
          var _0xB3EE = _0xA02C["s"];
          var _0xB910 = $("rect.abcr._" + _0xB3EE["istart"] + "_");
          var _0xB934 = parseFloat(_0xB910["attr"]("x"));
          var _0xB946 = parseFloat(_0xB910["attr"]("y"));
          var _0xB922 = parseFloat(_0xB910["attr"]("width"));
          var _0xB8EC = parseFloat(_0xB910["attr"]("height"));
          var _0x99FC = _0xA0BC["color"];
          var _0x99EA = _0xB934 - _0xB9D6 + _0xB922;
          var _0xACF8 = _0xB98E > _0xB8EC ? _0xB98E : _0xB8EC;
          if (_0xB958) {
              var _0xBD00 = _0xB3EE["next"];
              while (_0xBD00) {
                  if (_0xBD00["grace"] || (_0xBD00["extra"] && _0xBD00["extra"]["grace"])) {
                      _0xBD00 = _0xBD00["next"]
                  } else {
                      break
                  }
              }
              ;if (_0xBD00) {
                  var _0xB8FE = $("rect.abcr._" + _0xBD00["istart"] + "_");
                  _0x99EA = parseFloat(_0xB8FE["attr"]("x")) - _0xB9D6
              }
          }
          ;$(_0xB9B2)["parents"]("svg")["prepend"]("<svg id=\"note_bg_svg" + _0xA0BC["seq"] + "\" type=\"note_rect\"><rect type=\"bg_rect\" x=\"" + ((_0xB9D6 + _0xB9FA) * scale) + "\" y=\"" + ((_0xB9E8 + _0xBA0C) * scale) + "\" width=\"" + _0x99EA * scale + "\" height=\"" + _0xACF8 * scale + "\" fill=\"" + _0x99FC + "\" fill-opacity=\"0.3\"></rect></svg>")
      } else {
          var _0x98DC = _0xA0BC["s"];
          var _0xB9B2 = $("rect.abcr._" + _0x98DC["istart"] + "_");
          var _0xB9FA = 0;
          var _0xBA0C = 0;
          if (musicType == 2) {
              var _0xA518 = $(_0xB9B2)["parent"]("g");
              if (_0xA518) {
                  var _0xACC2 = $(_0xA518)["attr"]("transform");
                  var _0xBA30 = /translate\((.[^\[]*)\)/;
                  var _0xBA1E = _0xACC2["match"](_0xBA30);
                  if (_0xBA1E != null) {
                      var _0xBA42 = _0xBA1E[1];
                      _0xB9FA = parseFloat(_0xBA42["replace"](/\s/g, "")["split"](",")[0]);
                      _0xBA0C = parseFloat(_0xBA42["replace"](/\s/g, "")["split"](",")[1])
                  }
              }
          }
          ;var _0xB9D6 = parseFloat(_0xB9B2["attr"]("x"));
          var _0xB9E8 = parseFloat(_0xB9B2["attr"]("y"));
          var _0x99EA = parseFloat(_0xB9B2["attr"]("width"));
          var _0xACF8 = parseFloat(_0xB9B2["attr"]("height"));
          var _0x99FC = _0xA0BC["color"];
          if (_0xB958) {
              var _0xBD00 = _0x98DC["next"];
              while (_0xBD00) {
                  if (_0xBD00["grace"] || (_0xBD00["extra"] && _0xBD00["extra"]["grace"])) {
                      _0xBD00 = _0xBD00["next"]
                  } else {
                      break
                  }
              }
              ;if (_0xBD00) {
                  var _0xB9A0 = $("rect.abcr._" + _0xBD00["istart"] + "_");
                  _0x99EA = parseFloat(_0xB9A0["attr"]("x")) - _0xB9D6
              }
          }
          ;$(_0xB9B2)["parents"]("svg")["prepend"]("<svg id=\"note_bg_svg" + _0xA0BC["seq"] + "\" type=\"note_rect\"><rect type=\"bg_rect\" x=\"" + ((_0xB9D6 + _0xB9FA) * scale) + "\" y=\"" + ((_0xB9E8 + _0xBA0C) * scale) + "\" width=\"" + _0x99EA * scale + "\" height=\"" + _0xACF8 * scale + "\" fill=\"" + _0x99FC + "\" fill-opacity=\"0.3\"></rect></svg>")
      }
  }
}
function renderLyricBgColor() {
  for (var _0x9558 = 0; _0x9558 < lyricBgArray["length"]; _0x9558++) {
      var _0xB96A = lyricBgArray[_0x9558];
      var _0xA0BC = _0xB96A["start"];
      var _0xA02C = _0xB96A["end"];
      var _0xB958 = _0xB96A["is_long"];
      if (_0xA0BC && _0xA02C) {
          var _0xB97C = _0xA0BC["istart"];
          var _0xB9B2 = $("rect.abcr._" + _0xB97C + "_");
          var _0xB9FA = 0;
          var _0xBA0C = 0;
          var _0xA518 = $(_0xB9B2)["parent"]("g");
          if (_0xA518) {
              var _0xACC2 = $(_0xA518)["attr"]("transform");
              var _0xBA30 = /translate\((.[^\[]*)\)/;
              var _0xBA1E = _0xACC2["match"](_0xBA30);
              if (_0xBA1E != null) {
                  var _0xBA42 = _0xBA1E[1];
                  _0xB9FA = parseFloat(_0xBA42["replace"](/\s/g, "")["split"](",")[0]);
                  _0xBA0C = parseFloat(_0xBA42["replace"](/\s/g, "")["split"](",")[1])
              }
          }
          ;var _0xB9D6 = parseFloat(_0xB9B2["attr"]("x"));
          var _0xB9E8 = parseFloat(_0xB9B2["attr"]("y"));
          var _0xB9C4 = parseFloat(_0xB9B2["attr"]("width"));
          var _0xB98E = parseFloat(_0xB9B2["attr"]("height"));
          var _0xB8DA = _0xA02C["istart"];
          var _0xB910 = $("rect.abcr._" + _0xB8DA + "_");
          var _0xB934 = parseFloat(_0xB910["attr"]("x"));
          var _0xB946 = parseFloat(_0xB910["attr"]("y"));
          var _0xB922 = parseFloat(_0xB910["attr"]("width"));
          var _0xB8EC = parseFloat(_0xB910["attr"]("height"));
          var _0x99FC = _0xA0BC["color"];
          var _0x99EA = _0xB934 - _0xB9D6 + _0xB922;
          var _0xACF8 = _0xB98E > _0xB8EC ? _0xB98E : _0xB8EC;
          if (_0xB958) {
              if (_0xA02C["s"]["next"]) {
                  var _0xB8FE = $("rect.abcr._" + _0xA02C["s"]["next"]["istart"] + "_");
                  _0x99EA = parseFloat(_0xB8FE["attr"]("x")) - _0xB9D6
              }
          }
          ;$(_0xB9B2)["parents"]("svg")["prepend"]("<svg id=\"lyric_bg_svg" + _0xA0BC["seq"] + "\" type=\"lyric_bg_rect\"><rect type=\"bg_rect\" x=\"" + ((_0xB9D6 + _0xB9FA) * scale) + "\" y=\"" + ((_0xB9E8 + _0xBA0C) * scale) + "\" width=\"" + _0x99EA * scale + "\" height=\"" + _0xACF8 * scale + "\" fill=\"" + _0x99FC + "\" fill-opacity=\"0.3\"></rect></svg>")
      } else {
          var _0xB97C = _0xA0BC["istart"];
          var _0xB9B2 = $("rect.abcr._" + _0xB97C + "_");
          var _0xB9FA = 0;
          var _0xBA0C = 0;
          var _0xA518 = $(_0xB9B2)["parent"]("g");
          if (_0xA518) {
              var _0xACC2 = $(_0xA518)["attr"]("transform");
              var _0xBA30 = /translate\((.[^\[]*)\)/;
              var _0xBA1E = _0xACC2["match"](_0xBA30);
              if (_0xBA1E != null) {
                  var _0xBA42 = _0xBA1E[1];
                  _0xB9FA = parseFloat(_0xBA42["replace"](/\s/g, "")["split"](",")[0]);
                  _0xBA0C = parseFloat(_0xBA42["replace"](/\s/g, "")["split"](",")[1])
              }
          }
          ;var _0xB9D6 = parseFloat(_0xB9B2["attr"]("x"));
          var _0xB9E8 = parseFloat(_0xB9B2["attr"]("y"));
          var _0x99EA = parseFloat(_0xB9B2["attr"]("width"));
          var _0xACF8 = parseFloat(_0xB9B2["attr"]("height"));
          var _0x99FC = _0xA0BC["color"];
          if (_0xB958) {
              if (_0xA0BC["s"]["next"]) {
                  var _0xB9A0 = $("rect.abcr._" + _0xA0BC["s"]["next"]["istart"] + "_");
                  _0x99EA = parseFloat(_0xB9A0["attr"]("x")) - _0xB9D6
              }
          }
          ;$(_0xB9B2)["parents"]("svg")["prepend"]("<svg id=\"lyric_bg_svg" + _0xA0BC["seq"] + "\" type=\"lyric_bg_rect\"><rect type=\"bg_rect\" x=\"" + ((_0xB9D6 + _0xB9FA) * scale) + "\" y=\"" + ((_0xB9E8 + _0xBA0C) * scale) + "\" width=\"" + _0x99EA * scale + "\" height=\"" + _0xACF8 * scale + "\" fill=\"" + _0x99FC + "\" fill-opacity=\"0.3\"></rect></svg>")
      }
  }
}
function setArpLink(_0xADAC) {
  var _0x961E = $("#" + _0xADAC)["val"]();
  var _0xC018 = "";
  var _0xBFE2 = "";
  startPos = cen["istart"];
  var _0xA9AA = $("#" + _0xADAC)["val"]()["substring"](startPos - 19, startPos);
  var _0xC006 = new RegExp(/\"\(arp([0-9]+)\-\"\!arpeggio\!/);
  if (_0xC006["test"](_0xA9AA)) {
      var _0xA0BC = _0xA9AA["match"](_0xC006);
      _0xC018 = _0xA0BC[0];
      var _0xA80C = _0xA0BC[1];
      _0xBFE2 = "\"-" + _0xA80C + "arp)\"!arpeggio!";
      var _0x961E = $("#" + _0xADAC)["val"]();
      _0x961E = _0x961E["replace"](_0xC018, "")["replace"](_0xBFE2, "");
      $("#" + _0xADAC)["val"](_0x961E);
      doLog();
      abc_change();
      return
  }
  ;var _0xBFF4 = new RegExp(/\"\-([0-9]+)arp\)\"\!arpeggio\!/);
  if (_0xBFF4["test"](_0xA9AA)) {
      var _0xA02C = _0xA9AA["match"](_0xBFF4);
      _0xBFE2 = _0xA02C[0];
      var _0xA80C = _0xA02C[1];
      _0xC018 = "\"(arp" + _0xA80C + "-\"!arpeggio!";
      var _0x961E = $("#" + _0xADAC)["val"]();
      _0x961E = _0x961E["replace"](_0xC018, "")["replace"](_0xBFE2, "");
      $("#" + _0xADAC)["val"](_0x961E);
      doLog();
      abc_change();
      return
  }
  ;var _0x9D02 = arp_link_len;
  _0xC018 = "\"(arp" + _0x9D02 + "-\"!arpeggio!";
  _0xBFE2 = "\"-" + _0x9D02 + "arp)\"!arpeggio!";
  var _0xC02A = cen["ts_next"];
  while (_0xC02A) {
      if (_0xC02A["invis"]) {
          _0xC02A = _0xC02A["ts_next"];
          continue
      }
      ;break
  }
  ;if (_0xC02A && _0xC02A["st"] != cen["st"]) {
      var _0xC03C = _0xC02A;
      var _0xB640 = "";
      if (cen["istart"] < _0xC03C["istart"]) {
          _0xB640 = _0x961E["substring"](0, cen["istart"]) + _0xC018 + _0x961E["substring"](cen["istart"], _0xC03C["istart"]) + _0xBFE2 + _0x961E["substring"](_0xC03C["istart"])
      } else {
          var _0xC04E = cen["ts_prev"];
          if (_0xC04E && _0xC04E["st"] != cen["st"]) {
              _0xB640 = _0x961E["substring"](0, _0xC04E["istart"]) + _0xC018 + _0x961E["substring"](_0xC04E["istart"], cen["istart"]) + _0xBFE2 + _0x961E["substring"](cen["istart"])
          }
      }
      ;if (_0xB640 != "") {
          $("#" + _0xADAC)["val"](_0xB640);
          doLog();
          abc_change();
          return
      }
  }
}
function get(_0x9BD0) {
  var _0x961E = $("#source")["val"]();
  var _0x9522 = new RegExp(_0x9BD0 + "(.*)");
  var _0x9882 = _0x961E["match"](_0x9522);
  var _0x9D4A = "";
  if (_0x9882 != null) {
      _0x9D4A = _0x9882[1];
      _0x9D4A = _0x9D4A["replace"](/^\s+/, "")["replace"](/\s+$/, "")["replace"](/\!invisible\!M/, "")
  }
  ;return _0x9D4A
}
function calNodeLen(_0x9B9A) {
  try {
      var _0x9B64 = 0;
      _0x9B9A = _0x9B9A["replaceAll"](/\[.[^\[]*\:.[^\[]*\]/g, "")["replaceAll"](/!.[^!]*!/, "");
      _0x9B9A = replaceDivide(_0x9B9A);
      var _0x9B40 = calNodeLen_HX(_0x9B9A);
      var _0x9B52 = _0x9B40["split"]("|")[0];
      _0x9B9A = _0x9B40["split"]("|")[1];
      var _0x9B76 = calNodeLen_LY(_0x9B9A);
      var _0x9B88 = _0x9B76["split"]("|")[0];
      _0x9B9A = _0x9B76["split"]("|")[1];
      var _0x9BAC = calNodeLen_PT(_0x9B9A);
      _0x9B64 = parseFloat(_0x9B52) + parseFloat(_0x9B88) + parseFloat(_0x9BAC);
      return _0x9B64
  } catch (e) {
      console["log"](e)
  }
}
function calNodeLenByIndex(_0x9DA4, _0x9D80) {
  var _0x9DB6 = 0;
  var _0x9DC8 = 0;
  var _0x9D92 = [];
  for (var _0x9558 = _0x9DA4; _0x9558 < _0x9D80; _0x9558++) {
      var _0x98DC = syms[_0x9558];
      if (_0x98DC && !_0x98DC["grace"]) {
          if (_0x98DC["dur"] && _0x9D92["indexOf"](_0x98DC["istart"]) < 0) {
              _0x9DB6 += _0x98DC["dur"];
              _0x9D92["push"](_0x98DC["istart"])
          }
          ;if (_0x9DC8 == 0 && _0x98DC["my_ulen"]) {
              _0x9DC8 = _0x98DC["my_ulen"]
          }
      }
  }
  ;return _0x9DB6 / _0x9DC8
}
function replaceDivide(_0x9534) {
  if (_0x9534) {
      return _0x9534["replace"](/\/2/g, "/")["replace"](/\/4/g, "//")["replace"](/\/8/g, "///")["replace"](/\/16/g, "////")
  }
  ;return _0x9534
}
function calNodeLen_HX(_0x9B9A) {
  var _0x96E4 = get("L:")["split"]("/")[1];
  var _0x971A = get("M:")["split"]("/")[1];
  var _0x9BBE = parseInt(_0x971A) / parseInt(_0x96E4);
  var _0x9BE2 = /\[(.[^\[^\:]*)\][\d\/]*/g;
  var _0x9BF4 = _0x9B9A["match"](_0x9BE2);
  var _0x9B40 = 0;
  var _0x9C3C = 0;
  var _0x973E = "123456789";
  var _0x9C18 = new RegExp("[a-gA-G]");
  var _0x9C2A = "cdefgab,\'CDEFGABz";
  if (_0x9BF4 != null) {
      var _0x9BD0 = 1;
      _0x9B40 = 1;
      for (var _0x9558 = 0; _0x9558 < _0x9BF4["length"]; _0x9558++) {
          var _0x9C06 = _0x9BF4[_0x9558];
          if (_0x9C18["test"](_0x9C06)) {
              for (var _0x96D2 = 0; _0x96D2 < _0x9C06["length"]; _0x96D2++) {
                  if (_0x9C2A["indexOf"](_0x9C06[_0x96D2]) > -1) {
                      _0x9BD0 = 1;
                      _0x9B40 = 1
                  } else {
                      if (_0x973E["indexOf"](_0x9C06[_0x96D2]) > -1) {
                          if (parseInt(_0x9C06[_0x96D2]) > _0x9B40) {
                              _0x9B40 = parseInt(_0x9C06[_0x96D2])
                          }
                      } else {
                          if (_0x9C06[_0x96D2] == "/") {
                              _0x9BD0 = _0x9BD0 * 2;
                              _0x9B40 = 1 / _0x9BD0
                          }
                      }
                  }
              }
              ;_0x9C3C = _0x9C3C + _0x9B40
          }
      }
  }
  ;_0x9B9A = _0x9B9A["replace"](_0x9BE2, "");
  return _0x9C3C + "|" + _0x9B9A
}
function calNodeLen_LY(_0x9B9A) {
  try {
      var _0x96E4 = get("L:")["split"]("/")[1];
      var _0x971A = get("M:")["split"]("/")[1];
      var _0x9C96 = /\([2-9](.*)/g;
      var _0x9CBA = _0x9B9A["match"](_0x9C96);
      var _0x9B76 = 0;
      if (_0x9B9A != null) {
          var _0x9C72 = _0x9B9A["split"](" ");
          for (var _0x9558 = 0; _0x9558 < _0x9C72["length"]; _0x9558++) {
              var _0x9534 = _0x9C72[_0x9558]["match"](_0x9C96);
              if (_0x9534 != null) {
                  var _0x9CA8 = /\((\d)/;
                  var _0x9C60 = _0x9534[0]["match"](_0x9CA8);
                  var _0x972C = -1;
                  if (_0x9C60 != null) {
                      _0x972C = _0x9C60[1]
                  }
                  ;var _0x9CCC = _0x9534[0]["replace"](/\(\d/, "");
                  if (_0x9CCC["indexOf"]("/") > -1) {
                      var _0x9C4E = _0x9CCC["match"](/\//g)["length"];
                      _0x9B76 += 0.5 * _0x972C / _0x9C4E
                  } else {
                      var _0x9CDE = 1;
                      var _0x9C84 = _0x9CCC["match"](/\d/);
                      if (_0x9C84 != null) {
                          _0x9B76 += parseInt(_0x9C84[0])
                      } else {
                          _0x9B76++
                      }
                  }
                  ;_0x9B9A = _0x9B9A["replace"](_0x9534[0], "")
              }
          }
      }
      ;return _0x9B76 * _0x96E4 / _0x971A + "|" + _0x9B9A
  } catch (e) {
      console["log"](e)
  }
}
function calNodeLen_PT(_0x9B9A) {
  _0x9B9A = _0x9B9A["replace"](/\{.[^\{]*\}/g, "");
  var _0x96E4 = get("L:")["split"]("/")[1];
  var _0x971A = get("M:")["split"]("/")[1];
  var _0x9BBE = parseInt(_0x971A) / parseInt(_0x96E4);
  var _0x9D38 = "[cdefgabzCDEFGABZx";
  var _0x9CF0 = extnotes["concat"](extnotes2);
  for (var _0x96D2 = 0, _0x9B64 = _0x9CF0["length"]; _0x96D2 < _0x9B64; _0x96D2++) {
      _0x9D38 += _0x9CF0[_0x96D2]["char"]
  }
  ;_0x9D38 += "](,*)(\'*)([0-9]*)(/*)";
  var _0x98B8 = new RegExp(_0x9D38,"g");
  var _0x9D14 = /([0-9]*)/g;
  var _0x9D4A = _0x9B9A["match"](_0x98B8);
  var _0x9B64 = 0;
  if (_0x9D4A != null) {
      for (var _0x9558 = 0; _0x9558 < _0x9D4A["length"]; _0x9558++) {
          var _0x9D02 = 0;
          var _0x9C06 = _0x9D4A[_0x9558];
          var _0x9D5C = 0;
          var _0x9D26 = _0x9C06["match"](_0x9D14);
          if (_0x9D26 != null) {
              for (var _0x96D2 = 0; _0x96D2 < _0x9D26["length"]; _0x96D2++) {
                  if (_0x9D26[_0x96D2] != "") {
                      _0x9D02++;
                      _0x9D5C += parseInt(_0x9D26[_0x96D2])
                  }
              }
          }
          ;if (_0x9C06["indexOf"]("/") > -1) {
              var _0x9D6E = 1;
              if (_0x9D5C != 0) {
                  _0x9D6E = _0x9D5C
              }
              ;var _0x9BD0 = false;
              for (var _0x96D2 = 0; _0x96D2 < _0x9C06["length"]; _0x96D2++) {
                  if (_0x9C06[_0x96D2] == "/") {
                      _0x9D02++;
                      _0x9D6E = _0x9D6E / 2;
                      _0x9BD0 = true
                  }
              }
              ;if (_0x9BD0) {
                  _0x9B64 = _0x9B64 + _0x9D6E
              }
          } else {
              _0x9B64 = _0x9B64 + _0x9D5C
          }
          ;if (_0x9D02 == 0) {
              _0x9B64++
          }
      }
  }
  ;return _0x9B64
}
function setVoiceVol(_0xA6EC, _0x9CDE) {
  var _0xA104 = $(_0xA6EC)["attr"]("index");
  $("span[name=\'voicevolspan\'][index=\'" + _0xA104 + "\']")["html"](_0x9CDE);
  var _0xB022 = false;
  for (var _0x9558 = 0; _0x9558 < vols["length"]; _0x9558++) {
      var _0xC14A = vols[_0x9558];
      if (_0xC14A["v"] == _0xA104) {
          _0xC14A["vol"] = _0x9CDE;
          _0xB022 = true
      }
  }
  ;if (!_0xB022) {
      var _0xA6EC = new Object();
      _0xA6EC["v"] = _0xA104;
      _0xA6EC["vol"] = _0x9CDE;
      vols["push"](_0xA6EC)
  }
  ;var _0x961E = $("#source")["val"]();
  var _0xC138 = "";
  for (var _0x9558 = 0; _0x9558 < vols["length"]; _0x9558++) {
      _0xC138 += "," + vols[_0x9558]["v"] + "=" + vols[_0x9558]["vol"]
  }
  ;if (_0xC138 != "") {
      _0xC138 = _0xC138["substring"](1)
  }
  ;if (_0x961E["indexOf"]("voicevol") > -1) {
      _0x961E = _0x961E["replace"](/voicevol\(.*\)/, "voicevol(" + _0xC138 + ")")
  } else {
      _0x961E = "%%voicevol(" + _0xC138 + ")\x0A" + _0x961E
  }
  ;$("#source")["val"](_0x961E);
  src_change()
}
function insertChord(_0xB544, _0xB532) {
  currInputVoice = 2;
  var _0xB556 = getSuffix();
  var _0xAC9E = insertWithVoice(_0xB544 + _0xB556, _0xB532, true);
  insertChordLyric(_0xAC9E, _0xB532);
  play_chord(_0xB544);
  src_change()
}
function insertChordLyric(_0xAC9E, _0x99A2) {
  var _0x961E = $("#source")["val"]();
  var _0x9708 = _0x961E["split"]("\x0A");
  if ((_0xAC9E + 1) >= _0x9708["length"]) {
      var _0xB568 = "w:" + _0x99A2;
      _0x961E = _0x961E + "\x0A" + _0xB568
  } else {
      var _0xB57A = _0x9708[_0xAC9E + 1];
      var _0xB568 = "w:" + _0x99A2;
      var _0x9990 = "";
      _0x9708["forEach"](function(_0x960C, _0x9D02) {
          if (_0x9D02 != (_0xAC9E + 1)) {
              _0x9990 += _0x960C + "\x0A"
          } else {
              if (_0xB57A["indexOf"]("w:") > -1) {
                  _0x9990 += _0x960C + " " + _0x99A2
              } else {
                  _0x9990 += _0x960C + "\x0A" + _0xB568 + "\x0A"
              }
          }
      });
      _0x961E = _0x9990
  }
  ;$("#source")["val"](_0x961E)
}
function play_chord(_0xB544) {
  if (_0xB544) {
      var _0xAAA6 = /(\[[\^\_\=A-Ya-y\/1-9,']*\])|(\^){0,1}(\_){0,1}(\=){0,1}[^\[\s\]]{1}[\,\'\/|1-9]*/g;
      _0xB544 = _0xB544["replace"]("[", "")["replace"]("]", "");
      var _0xB7BA = new Array();
      var _0x9C72 = _0xB544["match"](_0xAAA6);
      _0x9C72["forEach"](function(_0x960C, _0x9558) {
          var _0x9C06 = new Float32Array(7);
          _0x9C06[0] = -1;
          _0x9C06[1] = 0;
          _0x9C06[2] = 0;
          _0x9C06[3] = findIndexByNote(_0x960C);
          _0x9C06[4] = 1;
          _0x9C06[5] = 1;
          _0x9C06[6] = 0;
          _0xB7BA["push"](_0x9C06)
      });
      play_arr(_0xB7BA)
  }
}
function getTotalLengthByLine(_0x961E, _0xB304) {
  var _0x9708 = _0x961E["split"]("\x0A");
  var _0xB316 = 0;
  _0x9708["forEach"](function(_0x960C, _0x9D02) {
      if (_0x9D02 <= _0xB304) {
          _0xB316 += _0x960C["length"] + 1
      }
  });
  return _0xB316
}
function source2ClipBoard() {
  $("#source")["focus"]();
  $("#source")["select"]();
  if (document["execCommand"]("copy")) {
      document["execCommand"]("copy")
  }
}
var bar_offset_x = 9;
function renderByBarIndex(_0xB8A4, _0x99A2) {
  if (musicType == 2) {
      bar_offset_x = 7
  } else {
      bar_offset_x = 9
  }
  ;var _0xB8C8 = "";
  if (_0x99A2) {
      _0xB8C8 = _0x99A2
  }
  ;var _0x9AF8 = getBarLineCoor(scale);
  for (var _0x9558 = 0; _0x9558 < _0xB8A4["length"]; _0x9558++) {
      var _0x9D02 = _0xB8A4[_0x9558]["bar_num"];
      var _0x99FC = _0xB8A4[_0x9558]["color"];
      var _0xB8B6 = _0xB8A4[_0x9558]["stroke"];
      if (_0x99FC == "") {
          _0x99FC = "blue"
      }
      ;if (_0x9D02 > (_0x9AF8["length"] - 1)) {
          return
      }
      ;var _0xA6B6 = _0x9AF8[_0x9D02]["barline_start"];
      var _0xA6A4 = _0x9AF8[_0x9D02]["barline_end"];
      var _0x969C = bar_offset_x * scale + _0xA6B6[0];
      var _0x96AE = _0xA6B6[1];
      var _0x99EA = _0xA6A4[0] - _0xA6B6[0];
      var _0xACF8 = _0xA6A4[3] - _0xA6B6[1];
      var _0xB892 = $("svg.music")[_0x9AF8[_0x9D02]["line"]];
      $("#mysvg" + _0xB8C8 + _0x9D02)["remove"]();
      if (_0xB8B6) {
          $(_0xB892)["prepend"]("<svg id=\"mysvg" + _0xB8C8 + _0x9D02 + "\" type=\"rect" + _0xB8C8 + "\"><rect type=\"bg_rect\" x=\"" + _0x969C + "\" y=\"" + _0x96AE + "\" width=\"" + _0x99EA + "\" height=\"" + _0xACF8 + "\" stroke=\"red\" stroke-width=\"3\" fill=\"" + _0x99FC + "\" fill-opacity=\"0\"></rect></svg>")
      } else {
          $(_0xB892)["prepend"]("<svg id=\"mysvg" + _0xB8C8 + _0x9D02 + "\" type=\"rect" + _0xB8C8 + "\"><rect type=\"bg_rect\" x=\"" + _0x969C + "\" y=\"" + _0x96AE + "\" width=\"" + _0x99EA + "\" height=\"" + _0xACF8 + "\" fill=\"" + _0x99FC + "\" fill-opacity=\"0.3\"></rect></svg>")
      }
  }
}
function doLog() {
  if (log[log["length"] - 1] != $("#source")["val"]()) {
      log[log["length"]] = $("#source")["val"]()
  }
}
function handleKeyPress(_0xB3EE, _0xB400) {
  if (_0xB3EE["keyCode"] >= 65 && _0xB3EE["keyCode"] <= 71) {
      var _0xB436 = ["A", "B", "C", "D", "E", "F", "G"];
      var _0x95FA = _0xB436[_0xB3EE["keyCode"] - 65];
      var _0x9C2A = "CDEFGAB";
      var _0x9CDE = _0x95FA;
      current_group = $(".group-active")["attr"]("group");
      if (_0xB3EE["shiftKey"]) {
          current_group = "C" + (parseInt(current_group["replace"]("C", "")) + 1)
      } else {
          if (_0xB3EE["ctrlKey"]) {
              current_group = "C" + (parseInt(current_group["replace"]("C", "")) - 1)
          }
      }
      ;if (_0x9C2A["indexOf"](_0x9CDE) > -1) {
          var _0xB448 = _0x9CDE;
          var _0xB46C = sd["KeyBoardStand"];
          var _0xB490;
          var _0xB424 = sd["KeyBoardStand"]["group"];
          for (var _0x9558 = 0; _0x9558 < _0xB46C["length"]; _0x9558++) {
              var _0xB412 = _0xB46C[_0x9558]["group"];
              if (current_group == _0xB412) {
                  _0xB490 = _0xB46C[_0x9558]["val"];
                  for (var _0x96D2 = 0; _0x96D2 < _0xB490["length"]; _0x96D2++) {
                      if (_0xB490[_0x96D2]["toUpperCase"]()["indexOf"](_0xB448["toUpperCase"]()) > -1) {
                          var _0xB45A = _0xB46C[_0x9558]["index"][_0x96D2];
                          play_note(_0xB45A, durSetting);
                          if (_0xB400 == "editor") {
                              updateNextNote(_0xB490[_0x96D2], -1);
                              return
                          } else {
                              var _0xB47E = getSelectText("source");
                              if (_0xB47E != "") {
                                  replaceSelected(_0xB47E, _0xB490[_0x96D2])
                              } else {
                                  insertText(_0xB490[_0x96D2])
                              }
                          }
                          ;typeof (autoNodeLine) == "function" && autoNodeLine();
                          typeof (abc_change) == "function" && abc_change();
                          $("#source")["focus"]();
                          break
                      }
                  }
              }
          }
      }
  }
}
function getContentHistory() {
  var _0xA830 = storage(true, "abc_content_his");
  var _0xA81E = JSON["parse"](_0xA830);
  return _0xA81E
}
function showLocalAbcHistory() {
  var _0xA8F6 = getContentHistory();
  $("#abchistorytab tbody")["html"]("");
  if (_0xA8F6 && _0xA8F6 != null) {
      for (var _0x9558 = 1; _0x9558 < _0xA8F6["length"]; _0x9558++) {
          var _0xC15C = "<tr>";
          _0xC15C += "<td onclick=\'getHisItemContent(this)\'>" + _0xA8F6[_0x9558]["time"] + "</td>";
          _0xC15C += "</tr>";
          $("#abchistorytab tbody")["append"]($(_0xC15C))
      }
  }
  ;$("#CONTENT_HIS_div")["modal"]("toggle")
}
function getHisItemContent(_0xA6EC) {
  var _0xA2C6 = $(_0xA6EC)["html"]();
  var _0xA8F6 = getContentHistory();
  var _0x960C = _0xA8F6["find"](function(_0x98DC) {
      return _0x98DC["time"] == _0xA2C6
  });
  $("#source")["val"](_0x960C["content"]);
  src_change()
}
function handleNumPress(_0xB3EE, _0xB400) {
  if (_0xB3EE["keyCode"] == 96 || _0xB3EE["keyCode"] == 48) {
      _0x9CDE = "z";
      if (_0xB400 == "editor") {
          updateNextNote(_0x9CDE, -1);
          return
      }
  }
  ;var _0xB50E = false;
  if (_0xB3EE["shiftKey"]) {
      _0xB50E = true
  }
  ;var _0x9DFE = "";
  var _0x98B8 = /K:\s*([CDEFGAB]#{0,1}b{0,1})/g;
  var _0x961E = $("#source")["val"]();
  var _0xB4EA = _0x961E["match"](_0x98B8);
  if (_0xB4EA != null) {
      var _0xB4FC = _0xB4EA[_0xB4EA["length"] - 1];
      var _0xB4D8 = _0xB4FC["match"](/K:\s*([CDEFGAB]#{0,1}b{0,1})/);
      _0x9DFE = _0xB4D8[1]
  }
  ;var _0x95FA;
  if (_0xB3EE["keyCode"] >= 49 && _0xB3EE["keyCode"] <= 55) {
      _0x95FA = _0xB3EE["keyCode"] - 48
  } else {
      if (_0xB3EE["keyCode"] >= 97 && _0xB3EE["keyCode"] <= 103) {
          _0x95FA = _0xB3EE["keyCode"] - 96
      }
  }
  ;var _0xB520 = sd["Simple2Staff"]["SimpleValue"];
  var _0x9D02 = -1;
  var _0x9C06 = "";
  for (var _0x9558 = 0; _0x9558 < _0xB520["length"]; _0x9558++) {
      if (_0xB520[_0x9558] == _0x95FA) {
          _0x9D02 = _0x9558;
          break
      }
  }
  ;var _0xB45A = -1;
  if (_0x9D02 != -1) {
      var _0xACE6 = sd["Simple2Staff"]["StaffValue"];
      for (var _0x9558 = 0; _0x9558 < _0xACE6["length"]; _0x9558++) {
          var _0x9AF8 = _0xACE6[_0x9558];
          if (_0x9AF8["K"] == _0x9DFE) {
              _0x9C06 = _0x9AF8["STAFF"][_0x9D02];
              _0xB45A = _0x9AF8["index"][_0x9D02];
              break
          }
      }
  }
  ;play_note(_0xB45A, durSetting);
  var _0x9C2A = "CDEFGAB";
  var _0x9CDE = _0x9C06["toUpperCase"]();
  current_group = $(".group-active")["attr"]("group");
  if (!current_group) {
      current_group = "C4"
  }
  ;if (_0x9C2A["indexOf"](_0x9CDE) > -1) {
      var _0xB448 = _0x9CDE;
      var _0xB46C = sd["KeyBoardStand"];
      var _0xB490;
      var _0xB424 = sd["KeyBoardStand"]["group"];
      for (var _0x9558 = 0; _0x9558 < _0xB46C["length"]; _0x9558++) {
          var _0xB412 = _0xB46C[_0x9558]["group"];
          if (current_group == _0xB412) {
              _0xB490 = _0xB46C[_0x9558]["val"];
              for (var _0x96D2 = 0; _0x96D2 < _0xB490["length"]; _0x96D2++) {
                  if (_0xB490[_0x96D2]["toUpperCase"]()["indexOf"](_0xB448["toUpperCase"]()) > -1) {
                      if (_0xB400 == "editor") {
                          updateNextNote(_0x9C06, -1, _0xB50E || chordInput);
                          return
                      } else {
                          var _0xB47E = getSelectText("source");
                          if (_0xB47E != "") {
                              replaceSelected(_0xB47E, _0xB490[_0x96D2])
                          } else {
                              insertText(_0xB490[_0x96D2])
                          }
                      }
                      ;autoNodeLine();
                      $("#source")["focus"]();
                      break
                  }
              }
          }
      }
  }
}
function resetJqEqualBars() {
  user["jpEqualBars"] = true
}
function resetBarsPerLine() {
  var _0xBE32 = $("svg.music")["length"];
  var _0xBE20 = getStaffInfo("source");
  var _0xBE0E = Math["ceil"](_0xBE20["barCount"] / _0xBE32);
  var _0x961E = $("#source")["val"]();
  _0x961E["replace"](/%%barsperstaff.*\n/, "");
  _0x961E = "%%barsperstaff " + _0xBE0E + "\x0A" + _0x961E;
  $("#source")["val"](_0x961E)
}
function getSvgTotalHeight() {
  var _0xADBE = 0;
  $("svg")["each"](function(_0x9558, _0x960C) {
      _0xADBE += parseFloat($(_0x960C)["height"]())
  });
  return _0xADBE
}
function findArrayItem(_0x9AD4, _0xA452, _0xA464) {
  if (_0x9AD4 != null) {
      for (var _0x9558 = 0, _0x9B64 = _0x9AD4["length"]; _0x9558 < _0x9B64; _0x9558++) {
          var _0x9CDE = _0x9AD4[_0x9558][_0xA452];
          if (_0x9CDE == _0xA464) {
              return _0x9AD4[_0x9558]
          }
      }
  }
  ;return null
}
function resetForm() {
  $("#STAFFNUM")["val"](1);
  $("#barsperstaff")["val"](-1);
  $("#isR")["prop"]("checked", false);
  $("#weakBarTop")["val"](1);
  $("#weakBarTop")["attr"]("disabled", "disabled");
  $("#weakBarBot")["val"](4);
  $("#weakBarBot")["attr"]("disabled", "disabled");
  $("#X")["val"](1);
  $("#staffsepheight")["val"](46);
  $("#nodecount")["val"](32);
  $("#T_S")["val"]("");
  $("#stafftypeid")["val"]("");
  $("#M_mol")["val"](2);
  $("#M_den")["val"](4);
  $("#L")["val"]("1/8");
  $("#Q_V")["val"](88);
  $("#nometer")["prop"]("checked", false);
  $("#titleFontSize")["val"](28);
  $("#titleColor")["val"]("000000");
  $("#titleColor")["css"]("background-color", "#000000");
  setTitleFontColor();
  $("#lyricFontSize")["val"](14);
  $("#lyricColor")["val"]("000000");
  $("#lyricColor")["css"]("background-color", "#000000");
  setLyricFontSize();
  $("#plsxspeedtype")["val"]("88");
  $("#plsxspeedtype option[text=\'88\']")["attr"]("selected", true)
}
function getAllTitle() {
  var _0x961E = $("#source")["val"]();
  var _0xA66E = /T:.*/g;
  var _0x9882 = _0x961E["match"](_0xA66E);
  var _0xA65C = "";
  if (_0x9882 != null) {
      for (var _0x9558 = 0, _0x9B64 = _0x9882["length"]; _0x9558 < _0x9B64; _0x9558++) {
          var _0xA440 = _0x9882[_0x9558];
          if (_0x9558 > 0) {
              _0xA65C += "\x0A"
          }
          ;_0xA65C += _0xA440["replace"]("T:", "")["trim"]()
      }
  }
  ;return _0xA65C
}
function getMeterRest(_0xAB00, _0xAAEE) {
  var _0x98A6 = "";
  var _0x9D4A = "";
  for (var _0x9558 = 0, _0x9B64 = _0xAB00["length"]; _0x9558 < _0x9B64; _0x9558++) {
      _0x98A6 = _0xAB00[_0x9558];
      _0x9D4A += replaceNodeContentToRestWithMeter(_0x98A6, _0xAAEE)
  }
  ;return _0x9D4A
}
function clearFocus() {
  $["each"]($("input"), function(_0x9558, _0x960C) {
      if ($(_0x960C)["attr"]("type") == "input") {
          $(_0x960C)["blur"]()
      }
  });
  $("#source")["blur"]()
}
function scroll2SelectNote(_0x9EC4) {
  var _0xBF88 = document["getElementById"]("source");
  var _0x96F6 = findLineNumByIndex($("#source")["val"](), _0x9EC4);
  _0xBF88["scrollTop"] = (_0x96F6 * _0xBF88["scrollHeight"]) / $("#source")["val"]()["split"]("\x0A")["length"] - 10;
  var _0x98DC = syms[_0x9EC4];
  if (_0x98DC) {
      textSelect(_0xBF88, _0x98DC["istart"], _0x98DC["iend"])
  }
}
function textSelect(_0xC26A, _0xA0BC, _0xA02C) {
  if (_0xC26A["setSelectionRange"]) {
      _0xC26A["setSelectionRange"](_0xA0BC, _0xA02C)
  } else {
      if (_0xC26A["createTextRange"]) {
          var _0xC258 = _0xC26A["createTextRange"]();
          _0xC258["collapse"](true);
          _0xC258["moveStart"]("character", _0xA0BC);
          _0xC258["moveEnd"]("character", _0xA02C - _0xA0BC);
          _0xC258["select"]()
      }
  }
}
function changePlaySpeed(_0x9E22) {
  user["tmpSpeed"] = _0x9E22;
  play["abcplay"]["set_speed"](_0x9E22)
}
function durToTime(_0xA26C, _0xA27E) {
  if (_0xA26C > 0 && _0xA27E) {
      var _0x9C06 = _0xA26C / 1536;
      _0xA27E = _0xA27E["replace"](/\s/g, "");
      var _0xA2A2 = _0xA27E["split"]("=")[0];
      var _0xA290 = _0xA2A2["split"]("/")[0] / _0xA2A2["split"]("/")[1];
      var _0xA2B4 = 60 / _0xA27E["split"]("=")[1];
      var _0xA2C6 = _0x9C06 / _0xA290 * _0xA2B4;
      return _0xA2C6
  }
  ;return 0
}
function getStaffNodeCoor(_0xA710, _0xA680, _0xA6FE) {
  var _0x9AF8 = null;
  if (musicType == 2) {
      _0x9AF8 = getSimpleNodeCoor()
  } else {
      _0x9AF8 = getNodeCoor()
  }
  ;var _0xA692 = new Array();
  var _0x9B1C = 0;
  var _0xA6DA = 0;
  var _0xA6C8 = new Array();
  for (var _0x96F6 = 0; _0x96F6 < _0x9AF8["xs"]["length"]; _0x96F6++) {
      for (var _0x9558 = 0; _0x9558 < _0x9AF8["xs"][_0x96F6]["length"]; _0x9558++) {
          for (var _0xB286 = 0; _0xB286 < _0x9AF8["staff"]["length"]; _0xB286++) {
              var _0x9774 = _0x9AF8["staff"][_0xB286];
              if (_0x9774["lineIndex"] == _0x96F6) {
                  var _0xA722 = 0;
                  var _0xA758 = 0;
                  var _0xA734 = 0;
                  var _0xA746 = 0;
                  var _0xA6EC = new Object();
                  var _0xB2AA = new Array();
                  if (_0x9558 == 0) {
                      if (musicType == 2) {
                          _0xA722 = 30 * _0xA710
                      } else {
                          _0xA722 = 0
                      }
                  } else {
                      _0xA722 = _0x9AF8["xs"][_0x96F6][_0x9558 - 1] * _0xA710
                  }
                  ;_0xA734 = _0x9AF8["xs"][_0x96F6][_0x9558] * _0xA710;
                  if (_0xA680) {
                      if (musicType == 2) {
                          _0xA758 = (parseFloat(_0x9774["translate"]["y"])) * _0xA710 + _0x9AF8["tops"][_0x96F6];
                          _0xA746 = _0xA758 + 24 * _0xA710
                      } else {
                          _0xA758 = (parseFloat(_0x9774["translate"]["y"]) - 24) * _0xA710 + _0x9AF8["tops"][_0x96F6];
                          _0xA746 = parseFloat(_0x9774["translate"]["y"]) * _0xA710
                      }
                  } else {
                      if (musicType == 2) {
                          _0xA758 = (parseFloat(_0x9774["translate"]["y"])) * _0xA710;
                          _0xA746 = _0xA758 + 24 * _0xA710
                      } else {
                          _0xA758 = (parseFloat(_0x9774["translate"]["y"]) - 24) * _0xA710;
                          _0xA746 = parseFloat(_0x9774["translate"]["y"]) * _0xA710
                      }
                  }
                  ;if (_0xA6FE) {
                      _0xA722 += _0xA6FE * _0xA710;
                      _0xA734 += _0xA6FE * _0xA710
                  }
                  ;if (_0x9558 == 0 && musicType != 2) {
                      _0xA722 = 0
                  }
                  ;_0xB2AA["push"](_0xA722);
                  _0xB2AA["push"](_0xA758);
                  _0xB2AA["push"](_0xA722);
                  _0xB2AA["push"](_0xA746);
                  _0xA6EC["nodeline_start"] = _0xB2AA;
                  _0xA6EC["v"] = _0x9774["v"];
                  var _0xB298 = new Array();
                  _0xB298["push"](_0xA734);
                  _0xB298["push"](_0xA758);
                  _0xB298["push"](_0xA734);
                  _0xB298["push"](_0xA746);
                  _0xA6EC["nodeline_end"] = _0xB298;
                  _0xA6EC["node_index"] = _0x9B1C;
                  _0xA6EC["line"] = _0x96F6;
                  _0xA692["push"](_0xA6EC);
                  if (_0xA6DA < _0xA734) {
                      _0xA6DA = _0xA734
                  }
                  ;if (_0x9558 + 1 == _0x9AF8["xs"][_0x96F6]["length"]) {
                      _0xA6C8["push"](_0xA6EC)
                  }
              }
          }
          ;_0x9B1C++
      }
  }
  ;for (var _0x9558 = 0; _0x9558 < _0xA6C8["length"]; _0x9558++) {
      var _0xA02C = _0xA6C8[_0x9558]["nodeline_end"][0];
      if (Math["abs"](_0xA6DA - _0xA02C) < 100) {
          _0xA6C8[_0x9558]["nodeline_end"][0] = _0xA6DA;
          _0xA6C8[_0x9558]["nodeline_end"][2] = _0xA6DA
      }
  }
  ;return _0xA692
}
function checkBarIsInLineFirst(_0x9E34) {
  var _0x9E46 = parseFloat($(_0x9E34)["attr"]("x"));
  var _0x9E7C = $(_0x9E34)["parents"]("svg");
  var _0x9E58 = "rect[type=\'rest\'],rect[type=\'note\']";
  if (musicType == 2) {
      _0x9E58 = "rect[type=\'splnum_note\'],rect[type=\'splnum_rest\'],rect[type=\'splnum_chord\']"
  }
  ;var _0x9E6A = true;
  $(_0x9E7C)["find"](_0x9E58)["each"](function(_0x9558, _0x960C) {
      var _0x9E8E = parseFloat($(_0x960C)["attr"]("x"));
      if (_0x9E8E < _0x9E46) {
          _0x9E6A = false
      }
  });
  return _0x9E6A
}
function replacejscssfile(_0xBDD8, _0xBDC6, _0xBDA2) {
  var _0xBDFC = (_0xBDA2 == "js") ? "script" : (_0xBDA2 == "css") ? "link" : "none";
  var _0xBDEA = (_0xBDA2 == "js") ? "src" : (_0xBDA2 == "css") ? "href" : "none";
  var _0xBD90 = document["getElementsByTagName"](_0xBDFC);
  for (var _0x9558 = _0xBD90["length"]; _0x9558 >= 0; _0x9558--) {
      if (_0xBD90[_0x9558] && _0xBD90[_0x9558]["getAttribute"](_0xBDEA) != null && _0xBD90[_0x9558]["getAttribute"](_0xBDEA)["indexOf"](_0xBDD8) != -1) {
          var _0xBDB4 = createjscssfile(_0xBDC6, _0xBDA2);
          _0xBD90[_0x9558]["parentNode"]["replaceChild"](_0xBDB4, _0xBD90[_0x9558])
      }
  }
}
function resetMeter(_0xAAEE) {
  var _0x9DB6 = 0;
  var _0xBE7A = [];
  var _0xB760 = new Map();
  _0xB760["set"]("1/4", 0.25);
  _0xB760["set"]("2/4", 0.5);
  _0xB760["set"]("3/4", 0.75);
  _0xB760["set"]("4/4", 1);
  _0xB760["set"]("5/4", 1.25);
  _0xB760["set"]("6/4", 1.5);
  _0xB760["set"]("3/8", 0.375);
  _0xB760["set"]("4/8", 0.5);
  _0xB760["set"]("6/8", 0.75);
  _0xB760["set"]("9/8", 1.125);
  _0xB760["set"]("12/8", 1.5);
  _0xB760["set"]("2/2", 1);
  _0xB760["set"]("4/2", 2);
  var _0x961E = $("#source")["val"]();
  var _0xBEF8 = _0xB760["get"](_0xAAEE);
  if (!_0xBEF8) {
      return
  }
  ;var _0xBF2E = "";
  var _0xB60A = 0;
  var _0x9D4A = "";
  var _0xBF64 = 0;
  var _0x9DC8 = 0;
  var _0xB652 = 0;
  var _0xBF52 = new Map();
  var nodeBarReg = /(\|[1-9\.]+)|(\|\[[1-9\.]+)|(:\|\|:)|(:\|:)|(:\|)|(::)|(\|:)|(\|\|)|(\|\])|(\|)/g;
  var _0xBEB0 = "";
  if (!syms) {
      return
  }
  ;for (var _0x9558 = 0; _0x9558 < syms["length"]; _0x9558++) {
      if (syms[_0x9558]) {
          var _0x98DC = syms[_0x9558];
          if (_0x98DC["type"] == 6) {
              if (_0xBF2E == "") {
                  _0xBF2E = _0x98DC["a_meter"][0]["top"] + "/" + _0x98DC["a_meter"][0]["bot"]
              }
          }
          ;if (_0xBE7A["indexOf"](_0x98DC["istart"]) < 0) {
              if (_0x98DC["type"] == 8 || _0x98DC["type"] == 10) {
                  if (_0xBF64 == 0) {
                      _0xBF64 = _0x98DC["my_wmeasure"];
                      _0x9DC8 = _0x98DC["my_ulen"];
                      _0xB652 = _0xBF64 / _0x9DC8
                  }
                  ;_0x9DB6 = _0xBF52["get"](_0x98DC["v"]);
                  if (_0x9DB6 == null) {
                      _0x9DB6 = 0
                  }
                  ;_0x9DB6 += _0x98DC["dur"] / 1536;
                  if (_0x9DB6 == _0xBEF8) {
                      var _0xBF40 = _0x961E["substring"](_0xB60A, _0x98DC["iend"]);
                      if (_0xB60A != 0) {
                          _0x9D4A += _0xBF40["replace"](nodeBarReg, "")
                      } else {
                          _0x9D4A += _0xBF40
                      }
                      ;_0x9D4A += "|";
                      _0x9DB6 = 0;
                      _0xB60A = _0x98DC["iend"]
                  } else {
                      if (_0x9DB6 > _0xBEF8) {
                          var _0xBED4 = _0x9DB6 - _0xBEF8;
                          if (_0xBED4 < _0xBEF8) {
                              var _0xBEC2 = _0xBED4 * 1536;
                              var _0xBE56 = _0x98DC["dur"] - _0xBEC2;
                              var _0xBE44 = getDurStrByNoteDur(_0xBE56, _0x98DC["my_ulen"]);
                              var _0xBE68 = getDurStrByNoteDur(_0xBEC2, _0x98DC["my_ulen"]);
                              var _0xB544 = _0x961E["substring"](_0x98DC["istart"], _0x98DC["iend"]);
                              var _0xBF0A = _0xB544["replace"](/[0-9]*$|\//, _0xBE44);
                              var _0xBF1C = _0xB544["replace"](/[0-9]*$|\//, _0xBE68);
                              var _0xBEE6 = "";
                              if (_0xBF0A["indexOf"]("z") < 0) {
                                  _0xBEE6 = _0xBF0A + "-|" + _0xBF1C
                              } else {
                                  _0xBEE6 = _0xBF0A + "|" + _0xBF1C
                              }
                              ;_0x9D4A += _0x961E["substring"](_0xB60A, _0x98DC["istart"]) + _0xBEE6;
                              _0xB60A = _0x98DC["iend"];
                              _0x9DB6 = _0x9DB6 - _0xBEF8
                          } else {
                              while (_0xBED4 >= _0xBEF8) {
                                  var _0xBEC2 = _0xBEF8 * 1536;
                                  var _0xBE56 = _0x98DC["dur"] - _0xBEC2;
                                  var _0xBE44 = getDurStrByNoteDur(_0xBE56, _0x98DC["my_ulen"]);
                                  var _0xBE68 = getDurStrByNoteDur(_0xBEC2, _0x98DC["my_ulen"]);
                                  var _0xB544 = _0x961E["substring"](_0x98DC["istart"], _0x98DC["iend"]);
                                  var _0xBF0A = _0xB544["replace"](/[0-9]*$|\//, _0xBE44);
                                  var _0xBF1C = _0xB544["replace"](/[0-9]*$|\//, _0xBE68);
                                  var _0xBEE6 = "";
                                  if (_0xBF0A["indexOf"]("z") < 0) {
                                      _0xBEE6 = _0xBF0A + "-|" + _0xBF1C + "|"
                                  } else {
                                      _0xBEE6 = _0xBF0A + "|" + _0xBF1C + "|"
                                  }
                                  ;_0x9D4A += _0x961E["substring"](_0xB60A, _0x98DC["istart"]) + _0xBEE6;
                                  _0xB60A = _0x98DC["iend"];
                                  _0x9DB6 = _0x9DB6 - _0xBEF8 - _0xBEF8;
                                  _0xBED4 = _0x9DB6
                              }
                          }
                      }
                  }
                  ;console["log"](_0x9558, "\u5f53\u524d\u4f4d\u7f6e\uff1a", _0x98DC["istart"], " \u62cd\u6570\uff1a", _0x9DB6);
                  _0xBE7A["push"](_0x98DC["istart"]);
                  _0xBF52["set"](_0x98DC["v"], _0x9DB6)
              } else {
                  if (_0x98DC["type"] == 0) {
                      if (_0x98DC["time"] != 0) {
                          _0x9D4A += _0x961E["substring"](_0xB60A, _0x98DC["istart"])
                      } else {
                          _0x9D4A += _0x961E["substring"](_0xB60A, _0x98DC["iend"])
                      }
                      ;_0xB60A = _0x98DC["iend"];
                      if (_0x961E["substr"](_0x98DC["iend"], 1) == "$") {
                          _0xB60A++
                      }
                  }
              }
          }
      }
  }
  ;var _0xBE9E = _0x9D4A["substr"](_0x9D4A["length"] - 1, 1);
  if (_0xBE9E != "|") {
      var _0xBE8C = _0x9D4A["lastIndexOf"]("|");
      _0x9D4A = _0x9D4A["substring"](0, _0xBE8C + 1)
  }
  ;if (_0xB60A < _0x961E["length"]) {
      _0x9D4A += _0x961E["substring"](_0xB60A)
  }
  ;_0x9D4A = mergeRest(_0x9D4A, toFloat(_0xAAEE) / toFloat(_0xBF2E) * _0xB652);
  _0x9D4A = _0x9D4A["replace"](/M:.*/, "M: " + _0xAAEE);
  $("#source")["val"](_0x9D4A);
  src_change();
  doLog();
  return _0x9D4A
}
function mergeRest(_0x961E, _0xB652) {
  var _0xB688 = /\|{0,1}z[,1-9][^\|]*\|/g;
  var _0xB664 = /z[,]{0,1}[/]{0,}\d{0,2}/g;
  var _0xB676 = /z[,]{0,1}([/]{0,}\d{0,2})/;
  var _0xAC8C;
  var _0xB60A = 0;
  var _0xB640 = "";
  var _0xA01A = 0;
  while (_0xAC8C = _0xB688["exec"](_0x961E)) {
      var _0x9534 = _0xAC8C[0]["replace"](/\|/, "");
      _0xB640 += _0x961E["substring"](_0xB60A, _0xAC8C["index"]);
      var _0xAC7A = _0x9534["match"](_0xB664);
      if (_0xAC7A != null) {
          var _0xB6AC = 0;
          for (var _0x9558 = 0; _0x9558 < _0xAC7A["length"]; _0x9558++) {
              var _0xB69A = _0xAC7A[_0x9558];
              var _0xB62E = _0xB69A["match"](_0xB676);
              var _0x9B64 = 0;
              if (_0xB62E != null) {
                  var _0xB61C = _0xB62E[1];
                  if (_0xB61C == "/") {
                      _0x9B64 = 0.5
                  } else {
                      if (_0xB61C == "//") {
                          _0x9B64 = 0.25
                      } else {
                          if (_0xB61C == "///") {
                              _0x9B64 = 0.125
                          } else {
                              if (parseInt(_0xB61C)["toString"]() == _0xB61C) {
                                  _0x9B64 = parseInt(_0xB61C)
                              }
                          }
                      }
                  }
              } else {
                  _0x9B64 = 1
              }
              ;_0xB6AC += _0x9B64
          }
          ;if (_0xB6AC == _0xB652) {
              _0xB640 += "z," + _0xB652 + "|";
              console["log"]("\u5c0f\u8282\u5185\u5bb9\uff1a", _0xAC8C[0], " \u5168\u662f\u4f11\u6b62\u7b26")
          } else {
              _0xB640 += _0xAC8C[0]
          }
      } else {
          _0xB640 += _0xAC8C[0]
      }
      ;_0xB60A = _0xAC8C["index"] + _0xAC8C[0]["length"];
      _0xA01A++
  }
  ;if (_0xB60A < _0x961E["length"]) {
      _0xB640 += _0x961E["substring"](_0xB60A, _0x961E["length"])
  }
  ;return _0xB640
}
function getNoteBgColor(_0x98DC) {
  $("#noteBgColorInput2")["css"]("background-color", "#000000");
  $("#noteBgColorInput2")["val"]("000000");
  $("#noteBgColorInput")["css"]("background-color", "#000000");
  $("#noteBgColorInput")["val"]("000000");
  var _0xAF14 = "";
  if (likeGch(_0x98DC, "-s-nb") || likeGch(_0x98DC, "-e-nb")) {
      var _0xAF26 = _0x98DC["a_gch"];
      if (_0xAF26 != null) {
          for (var _0x9558 = 0; _0x9558 < _0xAF26["length"]; _0x9558++) {
              var _0xA518 = _0xAF26[_0x9558];
              if (_0xA518["text"]["indexOf"]("-s-nb") == 0 || _0xA518["text"]["indexOf"]("-e-nb") == 0) {
                  _0xAF14 = _0xA518["text"];
                  break
              }
          }
      }
  }
  ;if (_0xAF14 != "") {
      var _0x9522 = /rgb\(.*\)/;
      var _0x99A2 = "short";
      if (_0xAF14["indexOf"]("-nbl-") > -1) {
          _0x99A2 = "long"
      }
      ;var _0x9882 = _0xAF14["match"](_0x9522);
      if (_0x9882 != null) {
          var _0xAF02 = _0x9882[0];
          var _0xAC68 = RGB2HEX(_0xAF02);
          if (_0x99A2 == "short") {
              $("#noteBgColorInput")["val"](_0xAC68["replace"]("#", ""));
              $("#noteBgColorInput")["css"]("background-color", _0xAC68)
          } else {
              if (_0x99A2 == "long") {
                  $("#noteBgColorInput2")["val"](_0xAC68["replace"]("#", ""));
                  $("#noteBgColorInput2")["css"]("background-color", _0xAC68)
              }
          }
      }
  }
}
function getNodeBgColor() {
  var _0x9D02 = parseInt($("#nodeMenu")["attr"]("barIndex"));
  var _0x9708 = getNodesInfo($("#source")["val"]());
  for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
      var _0x96F6 = _0x9708[_0x9558];
      if (_0x96F6["type"] == "note") {
          var _0xA596 = _0x96F6["nodes"];
          for (var _0x96D2 = 0; _0x96D2 < _0xA596["length"]; _0x96D2++) {
              var _0xAC8C = _0xA596[_0x96D2];
              if (_0xAC8C["nodeIndex"] == _0x9D02) {
                  var _0x98A6 = _0xAC8C["nodeStr"];
                  var _0x9522 = /(rgb\(.[^\)]*\))/;
                  var _0xAC7A = _0x98A6["match"](_0x9522);
                  if (_0xAC7A != null) {
                      var _0x99FC = _0xAC7A[1];
                      var _0xAC68 = RGB2HEX(_0x99FC);
                      barBgColorInput;
                      $("#barBgColorInput")["val"](_0xAC68["replace"]("#", ""));
                      $("#barBgColorInput")["css"]("background-color", _0xAC68);
                      return
                  }
              }
          }
      }
  }
}
function getNodeWidth() {
  var _0x9D02 = parseInt($("#nodeMenu")["attr"]("barIndex"));
  var _0x9708 = getNodesInfo($("#source")["val"]());
  $("#barWidthInput2")["val"]("1.0");
  var _0x9A7A = "";
  for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
      var _0x96F6 = _0x9708[_0x9558];
      if (_0x96F6["type"] == "note") {
          var _0xA596 = _0x96F6["nodes"];
          for (var _0x96D2 = 0; _0x96D2 < _0xA596["length"]; _0x96D2++) {
              var _0xAC8C = _0xA596[_0x96D2];
              if (_0xAC8C["nodeIndex"] == _0x9D02) {
                  var _0x98A6 = _0xAC8C["nodeStr"];
                  var _0x9522 = /\"barwidtimes\:([0-9.]{1,})\"/;
                  var _0xAC7A = _0x98A6["match"](_0x9522);
                  if (_0xAC7A != null) {
                      _0x9A7A = _0xAC7A[1];
                      $("#barWidthInput2")["val"](_0x9A7A);
                      break
                  }
              }
          }
      }
  }
}
function getNodeDur() {
  var _0x9D02 = parseInt($("#nodeMenu")["attr"]("barIndex"));
  var _0x9708 = getNodesInfo($("#source")["val"]());
  var _0x9A7A = "";
  for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
      var _0x96F6 = _0x9708[_0x9558];
      if (_0x96F6["type"] == "note") {
          var _0xA596 = _0x96F6["nodes"];
          for (var _0x96D2 = 0; _0x96D2 < _0xA596["length"]; _0x96D2++) {
              var _0xAC8C = _0xA596[_0x96D2];
              if (_0xAC8C["nodeIndex"] == _0x9D02) {
                  var _0x98A6 = _0xAC8C["nodeStr"];
                  var _0x9DB6 = getDurInSection(_0xAC8C["startSeq"], _0xAC8C["endSeq"]);
                  var _0xAAEE = getNodeMeter(_0xAC8C["startSeq"], _0xAC8C["endSeq"]);
                  $("#barTimeTop")["val"](_0x9DB6 / (1536 / _0xAAEE["bot"]));
                  $("#barTimeTop")["attr"]("oldval", _0x9DB6 / (1536 / _0xAAEE["bot"]));
                  $("#barTimeBot")["val"](_0xAAEE["bot"]);
                  $("#barTimeBot")["attr"]("oldval", _0xAAEE["bot"])
              }
          }
      }
  }
}
function getDurInSection(_0xA0BC, _0xA02C) {
  var _0x9DB6 = 0;
  var _0xA88A = [];
  for (var _0x9D02 in syms) {
      if (_0x9D02 >= _0xA0BC && _0x9D02 < _0xA02C) {
          if (syms[_0x9D02]["type"] == 8 || syms[_0x9D02]["type"] == 10) {
              if (syms[_0x9D02]["grace"]) {
                  continue
              }
              ;if (_0xA88A["indexOf"](syms[_0x9D02]["istart"]) < 0) {
                  _0x9DB6 += syms[_0x9D02]["dur_orig"]
              }
              ;_0xA88A["push"](syms[_0x9D02]["istart"])
          }
      }
  }
  ;return _0x9DB6
}
function getNodeMeter(_0xA0BC, _0xA02C) {
  var _0xA6EC = new Object();
  for (var _0x9D02 in syms) {
      if (_0x9D02 >= _0xA0BC && _0x9D02 < _0xA02C) {
          if (syms[_0x9D02]["type"] == 8 || syms[_0x9D02]["type"] == 10) {
              return syms[_0x9D02]["my_meter"][0]
          }
      }
  }
}
function getNodeHeight() {
  $("#barHeightBotInput")["val"]("");
  $("#barHeightTopInput")["val"]("");
  var _0x9D02 = parseInt($("#nodeMenu")["attr"]("barIndex"));
  var _0x9708 = getNodesInfo($("#source")["val"]());
  var _0x9A7A = "";
  for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
      var _0x96F6 = _0x9708[_0x9558];
      if (_0x96F6["type"] == "note") {
          var _0xA596 = _0x96F6["nodes"];
          for (var _0x96D2 = 0; _0x96D2 < _0xA596["length"]; _0x96D2++) {
              var _0xAC8C = _0xA596[_0x96D2];
              if (_0xAC8C["nodeIndex"] == _0x9D02) {
                  var _0x98A6 = _0xAC8C["nodeStr"];
                  var _0x9522 = /\[I:vskip.[^\[]*\]/g;
                  var _0xAECC = /\[I:vskip(.[^\[]*)\]/;
                  var _0x9882 = _0x98A6["match"](_0x9522);
                  if (_0x9882 != null) {
                      for (var _0x957C = 0; _0x957C < _0x9882["length"]; _0x957C++) {
                          var _0xAEA8 = _0x9882[_0x957C] + _0xAC8C["barLineStr"];
                          if (_0x98A6["indexOf"](_0xAEA8) > -1) {
                              $("#barHeightBotInput")["val"](_0x9882[_0x957C]["replace"](_0xAECC, function(_0x94FE, _0x9510) {
                                  return _0x9510["trim"]()
                              }))
                          } else {
                              $("#barHeightTopInput")["val"](_0x9882[_0x957C]["replace"](_0xAECC, function(_0x94FE, _0x9510) {
                                  return _0x9510["trim"]()
                              }))
                          }
                      }
                      ;break
                  }
              }
          }
      }
  }
  ;if (_0x9A7A == "") {
      var _0xAEDE = $("svg[type=\'rectnode\'],svg[type=\'rectbar\']");
      if (_0xAEDE["length"] > 0) {
          _0x9A7A = parseInt(_0xAEDE[0]["getBBox"]()["width"] / scale)
      }
  }
  ;var _0xAEBA = parseInt($(_0xAEDE[0])["find"]("rect")["attr"]("x"));
  if (_0xAEBA < 50) {
      _0x9A7A = _0x9A7A - parseInt(58 / scale)
  }
  ;$("#barWidthInput")["val"](_0x9A7A);
  $("#barWidthInput")["attr"]("oldWidth", _0x9A7A)
}
function switchRestShow(_0x9CDE) {
  if (_0x9CDE == "hide") {
      var _0xC1EC = $(".selected_text[type^=\'r\']");
      var _0x9EC4 = $(_0xC1EC)["attr"]("istart");
      var _0x98DC = syms[_0x9EC4];
      if (_0x98DC) {
          var _0x961E = $("#source")["val"]();
          var _0xB69A = _0x961E["substring"](_0x98DC["istart"], _0x98DC["iend"]);
          var _0xB640 = _0x961E["substring"](0, _0x98DC["istart"]) + _0xB69A["replace"]("z", "x") + _0x961E["substring"](_0x98DC["iend"]);
          $("#source")["val"](_0xB640);
          src_change();
          doLog()
      }
  }
}
function eqs(_0x9CDE, _0xA2EA) {
  var _0xA2D8 = _0x9CDE["split"](",");
  if (_0xA2D8["indexOf"](_0xA2EA) > -1) {
      return true
  }
  ;return false
}
function midiNoteToFrequency(_0x9C06) {
  return Math["pow"](2, ((_0x9C06 - 69) / 12)) * 440
}
function getFirstNoteSeq() {
  for (var _0x9558 = 0; _0x9558 < syms["length"]; _0x9558++) {
      var _0x98DC = syms[_0x9558];
      if (_0x98DC) {
          if (_0x98DC["type"] && (_0x98DC["type"] == 0 || _0x98DC["type"] == 8 || _0x98DC["type"] == 10)) {
              return _0x98DC["istart"]
          }
      }
  }
  ;return -1
}
function switchSpeedShow(_0x99A2) {
  var _0x961E = $("#source")["val"]();
  if (_0x99A2 == "show") {
      _0x961E = _0x961E["replace"](/%%hiddenspeed.*\n/g, "")
  } else {
      if (_0x99A2 = "hide") {
          _0x961E = _0x961E["replace"](/%%hiddenspeed.*\n/g, "");
          _0x961E = "%%hiddenspeed\x0A" + _0x961E
      }
  }
  ;$("#source")["val"](_0x961E);
  doLog();
  src_change()
}
function play_one_note(_0xB7DE, _0x96E4, _0xB7F0, _0xB802, _0xA26C, _0xB814) {
  var _0xB7CC = toFloat(_0x96E4) / toFloat(_0xB7F0) / toFloat(_0xB802) * 60;
  if (_0xA26C && _0xA26C > 0) {
      _0xB7CC = _0xA26C
  }
  ;var _0xB7BA = [];
  var _0x9C72 = new Float32Array(7);
  _0x9C72[0] = -1;
  _0x9C72[1] = 0;
  _0x9C72[2] = _0xB814 || 0;
  _0x9C72[3] = _0xB7DE;
  _0x9C72[4] = _0xB7CC;
  _0x9C72[5] = 1;
  _0x9C72[6] = 0;
  _0xB7BA[0] = _0x9C72;
  play_one(_0xB7BA)
}
function getMidStr(_0x98DC) {
  var _0xABFC = _0x98DC["prev"];
  if (_0xABFC && (_0xABFC["type"] == 8 || _0xABFC["type"] == 0 || _0xABFC["type"] == 10)) {
      var _0xABEA = _0xABFC["iend"];
      if (!_0xABEA) {
          return ""
      }
      ;var _0xABC6 = _0x98DC["istart"];
      var _0xABD8 = $("#source")["val"]()["substring"](_0xABEA, _0xABC6);
      return _0xABD8
  }
  ;return ""
}
function mypit2mid(_0x98DC, _0x9558) {
  if (user["pitNoteData"] == null) {
      user["pitNoteData"] = getNoteData()
  }
  ;if (_0x98DC && _0x98DC["istart"]) {
      for (var _0x9558 = 0; _0x9558 < user["pitNoteData"]["length"]; _0x9558++) {
          var _0x9AF8 = user["pitNoteData"][_0x9558];
          if (_0x9AF8[0] == _0x98DC["istart"]) {
              return _0x9AF8[3]
          }
      }
  }
  ;return 0;
  var _0xB796 = new Int8Array(1);
  var _0xB74E = [0];
  var _0xB760 = [0];
  for (var _0x957C = 0; _0x957C < 128; _0x957C++) {
      _0xB760[_0x957C] = 0
  }
  ;var _0xB784;
  var _0xA710 = new Uint8Array([0, 2, 4, 5, 7, 9, 11]);
  if (!_0x98DC || !_0x98DC["notes"]) {
      return -1
  }
  ;var _0x9C06 = _0x98DC["notes"][_0x9558]
    , _0xB772 = _0x9C06["apit"] + 19
    , _0x9546 = _0x9C06["acc"];
  if (_0xB796[_0x98DC["v"]]) {
      _0xB772 += _0xB796[_0x98DC["v"]]
  }
  ;if (_0x9546 == 0) {} else {
      if (_0x9546) {
          if (_0x9546 == 3) {
              _0x9546 = 0
          } else {
              if (_0x9C06["micro_n"]) {
                  _0x9546 = (_0x9546 < 0 ? -_0x9C06["micro_n"] : _0x9C06["micro_n"]) / _0x9C06["micro_d"] * 2
              }
          }
          ;_0xB760[_0xB772] = _0x9546
      } else {
          _0x9546 = _0xB760[_0xB772]
      }
  }
  ;_0xB772 = (_0xB772 / 7 | 0) * 12 + _0xA710[_0xB772 % 7] + _0x9546;
  if (typeof _0x98DC["octave"] != "undefined") {
      _0xB772 = _0xB772 + _0x98DC["octave"] * 12
  }
  ;if (!_0xB784 || _0x9546 | 0 != _0x9546) {
      return _0xB772
  }
  ;return _0xB772 + _0xB784[_0xB772 % 12]
}
function getStaffOriKey() {
  return keyTransfer[staffOriKSF]
}
function getStaffKey() {
  if (staffKSF == 9999) {
      return keyTransfer[staffOriKSF]
  }
  ;if (staffKSF != 9999) {
      return keyTransfer[staffKSF]
  }
}
function getStaffKeyByKeyTransfer(_0xB274) {
  for (var _0x9D02 in keyTransfer) {
      if (keyTransfer[_0x9D02]["code"] == _0xB274) {
          return keyTransfer[_0x9D02]["value"]
      }
  }
  ;return ""
}
function getNodeSeq() {
  var _0xAEF0 = getNoteData();
  var _0x9AD4 = new Array();
  for (var _0x9558 = 0; _0x9558 < _0xAEF0["length"]; _0x9558++) {
      var _0xA6EC = new Object();
      var _0x9AF8 = _0xAEF0[_0x9558];
      var _0x9EC4 = _0x9AF8[0];
      var _0xA2C6 = parseFloat(_0x9AF8[1]["toFixed"](4));
      var _0xA26C = parseFloat(_0x9AF8[4]["toFixed"](4));
      _0xA6EC["time"] = _0xA2C6;
      _0xA6EC["pitch"] = _0x9AF8[3];
      _0xA6EC["dur"] = _0xA26C;
      _0xA6EC["scoretype"] = checkScorePitch(_0x9EC4);
      _0xA6EC["node_index"] = getNodeIndexByIstart(_0x9EC4);
      _0x9AD4["push"](_0xA6EC)
  }
  ;console["log"](_0x9AD4);
  return JSON["stringify"](_0x9AD4)
}
function getNodeIndexByIstart(_0x9EC4) {
  var _0x961E = $("#source")["val"]();
  var _0x9708 = getNodesInfo(_0x961E);
  for (var _0x9558 = 0; _0x9558 < _0x9708["length"]; _0x9558++) {
      var _0x96F6 = _0x9708[_0x9558];
      if (_0x96F6["type"] == "note") {
          var _0xA596 = _0x96F6["nodes"];
          for (var _0x96D2 = 0; _0x96D2 < _0xA596["length"]; _0x96D2++) {
              var _0xAC8C = _0xA596[_0x96D2];
              if (_0x9EC4 >= _0xAC8C["startSeq"] && _0x9EC4 < _0xAC8C["endSeq"]) {
                  return _0xAC8C["nodeIndex"]
              }
          }
      }
  }
}
var pytbData = [{
  "linefirst": 0,
  "linelast": 0,
  "node_index": 0,
  "notes": [["c", 1], ["A", 1], ["z", 1]],
  "repeat": 0,
  "starttime": "6.0"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 1,
  "notes": [["c", 1], ["A", 1], ["z", 1]],
  "repeat": 0,
  "starttime": "7.4"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 2,
  "notes": [["G", 1], ["F", 1], ["G", 1]],
  "repeat": 0,
  "starttime": "9.1"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 3,
  "notes": [["F", 2], ["z", 1]],
  "repeat": 0,
  "starttime": "10.5"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 4,
  "notes": [["G", 1], ["G", 1], ["A", 1]],
  "repeat": 0,
  "starttime": "11.9"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 5,
  "notes": [["B", 2], ["G", 1]],
  "repeat": 0,
  "starttime": "13.4"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 6,
  "notes": [["A", 1], ["A", 1], ["B", 1]],
  "repeat": 0,
  "starttime": "14.7"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 7,
  "notes": [["c", 2], ["A", 1]],
  "repeat": 0,
  "starttime": "16.2"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 8,
  "notes": [["c", 2], ["A", 1]],
  "repeat": 0,
  "starttime": "17.7"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 9,
  "notes": [["c", 2], ["A", 1]],
  "repeat": 0,
  "starttime": "19.1"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 10,
  "notes": [["B", 1], ["A", 1], ["G", 1]],
  "repeat": 0,
  "starttime": "20.5"
}, {
  "linefirst": 0,
  "linelast": 1,
  "node_index": 11,
  "notes": [["F", 2], ["z", 1]],
  "repeat": 0,
  "starttime": "22.0"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 0,
  "notes": [["c", 1], ["A", 1], ["z", 1]],
  "repeat": 1,
  "starttime": "29.1"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 1,
  "notes": [["c", 1], ["A", 1], ["z", 1]],
  "repeat": 1,
  "starttime": "30.5"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 2,
  "notes": [["G", 1], ["F", 1], ["G", 1]],
  "repeat": 1,
  "starttime": "31.9"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 3,
  "notes": [["F", 2], ["z", 1]],
  "repeat": 1,
  "starttime": "33.4"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 4,
  "notes": [["G", 1], ["G", 1], ["A", 1]],
  "repeat": 1,
  "starttime": "34.8"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 5,
  "notes": [["B", 2], ["G", 1]],
  "repeat": 1,
  "starttime": "36.3"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 6,
  "notes": [["A", 1], ["A", 1], ["B", 1]],
  "repeat": 1,
  "starttime": "37.7"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 7,
  "notes": [["c", 2], ["A", 1]],
  "repeat": 1,
  "starttime": "39.2"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 8,
  "notes": [["c", 2], ["A", 1]],
  "repeat": 1,
  "starttime": "40.6"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 9,
  "notes": [["c", 2], ["A", 1]],
  "repeat": 1,
  "starttime": "42.0"
}, {
  "linefirst": 0,
  "linelast": 0,
  "node_index": 10,
  "notes": [["B", 1], ["A", 1], ["G", 1]],
  "repeat": 1,
  "starttime": "43.4"
}, {
  "linefirst": 0,
  "linelast": 1,
  "node_index": 11,
  "notes": [["F", 2], ["z", 1]],
  "repeat": 1,
  "starttime": "44.8"
}];
function checkIs8va(_0x98DC) {
  if (_0x98DC["notes"]) {}
}
function getTransposeByShift() {
  var _0x961E = $("#source")["val"]();
  var _0xB34C = /K:.*shift=([_^]*[cdefgab]{1,2})([_^cdefgab]{1,2})/;
  var _0xAC8C = _0xB34C["exec"](_0x961E);
  if (_0xAC8C) {
      var _0xB33A = _0xAC8C[1];
      var _0x9E10 = "";
      var _0xB328 = _0xAC8C[2];
      var _0xA8AE = "";
      for (var _0x9DFE in keyTransfer) {
          var _0x9AF8 = keyTransfer[_0x9DFE];
          if (_0x9AF8["code"] == _0xB33A) {
              _0x9E10 = _0x9AF8["value"]
          }
          ;if (_0x9AF8["code"] == _0xB328) {
              _0xA8AE = _0x9AF8["value"]
          }
      }
      ;return getFreCharge(_0x9E10, _0xA8AE)
  }
  ;return 0
}

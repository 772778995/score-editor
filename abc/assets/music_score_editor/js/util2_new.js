/* util2 */

function checkGramm() {
    var _0xD9EE = $("#source")["val"]();
    if (!checkMeter(_0xD9EE)) {
        return false
    }
    ;if (!checkTempo(_0xD9EE)) {
        return false
    }
    ;if (!checkMargin(_0xD9EE)) {
        return false
    }
    ;if (!checkV(_0xD9EE)) {
        return false
    }
    ;if (!checkRepeat(_0xD9EE)) {
        return false
    }
    ;return true
}
function checkRepeat(_0xD9EE) {
    if (_0xD9EE["indexOf"]("::") > -1) {
        window["top"]["alert"]("\u4e0d\u5141\u8bb8\u51fa\u73b0::\u8fd9\u6837\u7684\u53cd\u590d\u6807\u8bb0\uff0c\u8bf7\u7528:|:\u66ff\u6362");
        return false
    }
    ;return true
}
function checkMeter(_0xD9EE) {
    var _0xDD96 = /M:(.*)/;
    var _0xDA36 = _0xD9EE["match"](_0xDD96);
    if (_0xDA36 == null) {
        window["top"]["alert"]("\u672a\u8bbe\u7f6e\u62cd\u53f7");
        return false
    } else {
        if (_0xDA36[0]["indexOf"]("none") > -1) {
            window["top"]["alert"]("\u62cd\u53f7\u4e0d\u80fd\u8bbe\u7f6e\u4e3anone");
            return false
        }
        ;if (_0xDA36[1]["replace"](/\s/g, "") == "") {
            window["top"]["alert"]("\u62cd\u53f7\u4e0d\u80fd\u4e3a\u7a7a\u503c");
            return false
        }
    }
    ;return true
}
function checkTempo(_0xD9EE) {
    var _0xDDCC = /Q:(.*)/;
    var _0xDA36 = _0xD9EE["match"](_0xDDCC);
    if (_0xDA36 == null || _0xDA36["length"] == 0) {
        window["top"]["alert"]("\u672a\u8bbe\u7f6e\u901f\u5ea6");
        return false
    } else {
        if (_0xDA36[1]["replace"](/\s/g, "") == "") {
            window["top"]["alert"]("\u901f\u5ea6\u4e0d\u80fd\u4e3a\u7a7a\u503c");
            return false
        }
        ;var _0xDDBA = _0xDA36[1]["replace"](/\".*\"/, "");
        if (_0xDDBA["indexOf"](":") > -1 || /[a-zA-Z]/["test"](_0xDDBA)) {
            window["top"]["alert"]("\u901f\u5ea6\u8bbe\u7f6e\u4e0d\u6b63\u786e");
            return false
        }
    }
    ;return true
}
function checkMargin(_0xD9EE) {
    var _0xDD60 = /%%leftmargin/g;
    var _0xDD72 = /%%rightmargin/g;
    var _0xDD4E = _0xD9EE["match"](_0xDD60);
    if (_0xDD4E != null && _0xDD4E["length"] > 1) {
        window["top"]["alert"]("\u591a\u6b21\u8bbe\u7f6e\u4e86\u5de6\u8fb9\u8ddd\u7684\u503c(leftmargin)");
        return false
    }
    ;var _0xDD84 = _0xD9EE["match"](_0xDD72);
    if (_0xDD84 != null && _0xDD84["length"] > 1) {
        window["top"]["alert"]("\u591a\u6b21\u8bbe\u7f6e\u4e86\u53f3\u8fb9\u8ddd\u7684\u503c(rightmargin)");
        return false
    }
    ;return true
}
function checkV(_0xD9EE) {
    var _0xDDCC = /V:(.*)/g;
    var _0xDA36 = _0xD9EE["match"](_0xDDCC);
    if (_0xDA36 == null) {
        window["top"]["alert"]("\u672a\u8bbe\u7f6eV:\u6807\u7b7e\uff0c\u8bf7\u81f3\u5c11\u8bbe\u7f6e\u4e00\u4e2aV:\u6807\u7b7e");
        return false
    }
    ;return true
}
function checkDur(_0xD9EE) {}
function zoomSvg(_0xF9B6) {
    user["jpEqualBars"] = false;
    var _0xD9EE = $("#source")["val"]();
    var _0xF9EC = "%%linebreak @";
    var _0xF134 = "";
    if (_0xD9EE["indexOf"]("linebreak") > -1) {
        var _0xF9DA = /%%linebreak(.*)/;
        var _0xDA36 = _0xD9EE["match"](_0xF9DA);
        if (_0xDA36 != null) {
            var _0xF992 = _0xDA36[1]["replace"](/\s/g, "");
            if (_0xF992 != "") {
                var _0xF9EC = "%%linebreak";
                var _0xF9A4 = new RegExp("\\" + _0xF992,"g");
                _0xF134 = _0xD9EE["replace"](_0xF9DA, _0xF9EC)
            } else {
                _0xF134 = _0xD9EE
            }
        }
    } else {
        _0xF134 = _0xF9EC + "\x0A" + _0xD9EE
    }
    ;$("#source")["val"](_0xF134);
    src_change();
    var _0xF9FE = 500;
    var _0xF9C8 = setInterval(function() {
        user["jpEqualBars"] = false;
        var _0xFA10 = getSvgTotalHeight();
        if (_0xFA10 <= _0xF9B6) {
            clearInterval(_0xF9C8);
            scale = scale + 0.05;
            resetBarsPerLine();
            src_change(resetJqEqualBars);
            setTimeout(function() {
                var _0xFA10 = getSvgTotalHeight();
                if (_0xFA10 > _0xF9B6) {
                    user["jpEqualBars"] = false;
                    scale = scale - 0.05;
                    src_change(resetJqEqualBars)
                }
            }, _0xF9FE)
        } else {
            scale = scale - 0.1;
            src_change(resetJqEqualBars)
        }
    }, _0xF9FE)
}
function getTransformsTranslate(_0xF0EC) {
    if (_0xF0EC && _0xF0EC != "") {
        var _0xE420 = /translate\((.[^\(]*)\)/;
        var _0xF0DA = _0xF0EC["match"](_0xE420);
        if (_0xF0DA != null) {
            var _0xF0C8 = _0xF0DA[1]["replace"](/\s/g, "");
            var _0xF0FE = _0xF0C8["split"](",");
            sx = _0xF0FE[0];
            sy = _0xF0FE[1];
            var _0xE5E2 = new Object();
            _0xE5E2["x"] = sx;
            _0xE5E2["y"] = sy;
            return _0xE5E2
        }
    }
    ;return null
}
function getTransformsScale(_0xF0EC) {
    if (_0xF0EC && _0xF0EC != "") {
        var _0xE420 = /scale\((.[^\(]*)\)/;
        var _0xF0DA = _0xF0EC["match"](_0xE420);
        if (_0xF0DA != null) {
            var _0xF0C8 = _0xF0DA[1]["replace"](/\s/g, "");
            return _0xF0C8
        }
    }
    ;return ""
}
var lastNumStaffY = -1;
function numStaffDrag(_0xF16A) {
    if (!user["numStaffCanDrag"]) {
        return
    }
    ;if (lastNumStaffY == -1) {
        lastNumStaffY = _0xF16A["offsetY"]
    }
    ;if ((_0xF16A["offsetY"] - lastNumStaffY) > 10) {
        console["log"]("\u5f80\u4e0b\u79fb\u52a8");
        var _0xD9EE = $("#source")["val"]();
        var _0xDDA8 = -1;
        var _0xF17C = $(".selected_text[type=\'note\']");
        var _0xF18E = "";
        if (_0xF17C["length"] > 0) {
            _0xDDA8 = $(_0xF17C)["attr"]("istart");
            var _0xDD2A = syms[_0xDDA8];
            if (_0xDD2A) {
                _0xF18E = _0xD9EE["substring"](_0xDD2A["istart"], _0xDD2A["iend"])
            }
        }
        ;if (_0xDDA8 == -1) {
            return
        }
        ;var _0xDD2A = syms[_0xDDA8];
        if (_0xF18E == "") {
            return
        }
        ;var _0xE5F4 = updownnote(_0xF18E, -1);
        var _0xF134 = _0xD9EE["substring"](0, _0xDD2A["istart"]) + _0xE5F4 + _0xD9EE["substring"](_0xDD2A["iend"]);
        $("#source")["val"](_0xF134);
        doLog();
        src_change();
        lastNumStaffY = _0xF16A["offsetY"]
    } else {
        if ((_0xF16A["offsetY"] - lastNumStaffY) < -10) {
            console["log"]("\u5f80\u4e0a\u79fb\u52a8");
            var _0xD9EE = $("#source")["val"]();
            var _0xDDA8 = -1;
            var _0xF17C = $(".selected_text[type=\'note\']");
            var _0xF18E = "";
            if (_0xF17C["length"] > 0) {
                _0xDDA8 = $(_0xF17C)["attr"]("istart");
                var _0xDD2A = syms[_0xDDA8];
                if (_0xDD2A) {
                    _0xF18E = _0xD9EE["substring"](_0xDD2A["istart"], _0xDD2A["iend"])
                }
            }
            ;if (_0xDDA8 == -1) {
                return
            }
            ;var _0xDD2A = syms[_0xDDA8];
            if (_0xF18E == "") {
                return
            }
            ;var _0xE5F4 = updownnote(_0xF18E, 1);
            var _0xF134 = _0xD9EE["substring"](0, _0xDD2A["istart"]) + _0xE5F4 + _0xD9EE["substring"](_0xDD2A["iend"]);
            $("#source")["val"](_0xF134);
            doLog();
            src_change();
            lastNumStaffY = _0xF16A["offsetY"]
        }
    }
}
function getStaffCount() {
    var _0xD9EE = $("#source")["val"]();
    var _0xE9F6 = /V:\s*\d{1,2}/g;
    var _0xEBA6 = /V:\s*(\d{1,2})/;
    var _0xDA36 = _0xD9EE["match"](_0xE9F6);
    var _0xDA48 = 1;
    if (_0xDA36 != null) {
        for (var _0xDCE2 = 0; _0xDCE2 < _0xDA36["length"]; _0xDCE2++) {
            var _0xE822 = _0xDA36[_0xDCE2];
            var _0xDD06 = _0xE822["match"](_0xEBA6)[1];
            if (parseInt(_0xDD06) > _0xDA48) {
                _0xDA48 = _0xDD06
            }
        }
    }
    ;return _0xDA48
}
function addNewPartStaff(_0xDA00) {
    var _0xD9EE = $("#source")["val"]();
    var _0xDA7E = /.*%V1line0end/;
    var _0xDA36 = _0xD9EE["match"](_0xDA7E);
    var _0xDA5A = "";
    if (_0xDA36 != null) {
        _0xDA5A += "V:" + _0xDA00 + "\x0A";
        var _0xDA12 = _0xDA36[0];
        var _0xDA6C = _0xDA12["replace"]("||", "|");
        var _0xD9DC = _0xDA6C["split"]("|");
        var _0xDA48 = _0xD9DC["length"];
        var _0xDAA2 = "";
        var _0xDA90 = null;
        if ($("#isR")["is"](":checked")) {
            _0xDA90 = new Object();
            _0xDA90["top"] = parseInt($("#weakBarTop")["val"]());
            _0xDA90["bot"] = parseInt($("#weakBarBot")["val"]())
        }
        ;if (_0xDA90 != null) {
            _0xDAA2 = genWeakBarRestNotes(_0xDA90);
            if (_0xDAA2 != "") {
                _0xDAA2 += "|"
            }
        }
        ;var _0xDA24 = _0xDAA2 + genNodesByCount(_0xDA48);
        _0xDA5A += _0xDA24 + "%V" + _0xDA00 + "line0end\x0A"
    }
    ;return _0xDA5A
}
function getStaffInfo(_0xED56) {
    var _0xD9EE = $("#source")["val"]();
    if (_0xD9EE == "") {
        return
    }
    ;var _0xEDE6 = new Object();
    _0xEDE6["vocalCount"] = 1;
    _0xEDE6["barCount"] = 0;
    var _0xEE76 = /V:\s*\d{1,2}.*/g;
    var _0xEE88 = /V:\s*(\d{1,2})/;
    var _0xED0E = / nm=\"(.[^\"]*)\"/;
    var _0xED44 = / snm=\"(.[^\"]*)\"/;
    var _0xEBCA = /treble|bass|alto|tenor/;
    var _0xEE52 = _0xD9EE["match"](_0xEE76);
    var _0xEE40 = new Array();
    if (_0xEE52 != null) {
        for (var _0xDCE2 = 0; _0xDCE2 < _0xEE52["length"]; _0xDCE2++) {
            var _0xEEAC = _0xEE52[_0xDCE2];
            var _0xEE9A = _0xEEAC["match"](_0xEE88)[1];
            var _0xEE64 = new Object();
            _0xEE64["seq"] = _0xEE9A;
            _0xEE64["nm"] = "";
            _0xEE64["snm"] = "";
            _0xEE64["clef"] = "treble";
            var _0xE696 = syms["find"](function(_0xDEEC) {
                if (_0xDEEC && _0xDEEC["p_v"]) {
                    return _0xDEEC["p_v"]["v"] == _0xDCE2
                }
            });
            if (_0xE696) {
                _0xEE64["midi"] = _0xE696["p_v"]["instr"]
            }
            ;var _0xEBB8 = _0xEBCA["exec"](_0xEEAC);
            if (_0xEBB8) {
                _0xEE64["clef"] = _0xEBB8[0]
            }
            ;var _0xEBDC = _0xEE40["find"](function(_0xDEEC, _0xDA00, _0xE552) {
                return _0xDEEC["seq"] == _0xEE9A
            });
            if (_0xEBDC) {
                console["log"]("\u5df2\u7ecf\u5b58\u5728\uff1a", _0xEBDC)
            }
            ;if (_0xEEAC["indexOf"]("perc stafflines=1") > -1) {
                _0xEE64["rhythm"] = 1
            }
            ;var _0xECFC = _0xED0E["exec"](_0xEEAC);
            if (_0xECFC) {
                if (_0xEBDC && !_0xEBDC["nm"]) {
                    _0xEBDC["nm"] = _0xECFC[1]
                } else {
                    _0xEE64["nm"] = _0xECFC[1]
                }
            }
            ;var _0xED32 = _0xED44["exec"](_0xEEAC);
            if (_0xED32) {
                if (_0xEBDC && !_0xEBDC["snm"]) {
                    _0xEBDC["snm"] = _0xED32[1]
                } else {
                    _0xEE64["snm"] = _0xED32[1]
                }
            }
            ;if (!_0xEBDC) {
                _0xEE40["push"](_0xEE64)
            }
        }
        ;_0xEDE6["vocalCount"] = _0xEE40["length"]
    }
    ;_0xEDE6["vocalArr"] = _0xEE40;
    if (!syms) {
        return
    }
    ;for (var _0xDCE2 = 0; _0xDCE2 < syms["length"]; _0xDCE2++) {
        if (syms[_0xDCE2]) {
            if (syms[_0xDCE2]["bar_num"] > _0xEDE6["barCount"]) {
                _0xEDE6["barCount"] = syms[_0xDCE2]["bar_num"] - 1
            }
            ;if (!_0xEDE6["wmeasure"] && syms[_0xDCE2]["type"] == 8 || syms[_0xDCE2]["type"] == 10) {
                _0xEDE6["wmeasure"] = syms[_0xDCE2]["my_wmeasure"]
            }
        }
    }
    ;_0xEDE6["lineBarNum"] = -1;
    var _0xEC48 = /%%barsperstaff\s*(\d{1,2})/;
    var _0xEC36 = _0xD9EE["match"](_0xEC48);
    if (_0xEC36 != null) {
        _0xEDE6["lineBarNum"] = _0xEC36[1]
    }
    ;_0xEDE6["hasWeakNode"] = has_weak_node;
    _0xEDE6["weakNodeVal"] = weak_node_dur;
    if (_0xEDE6["hasWeakNode"] && _0xEDE6["weakNodeVal"] > 0) {
        _0xEDE6["weakNode"] = new Object();
        var _0xDA6C = decimalsToFractional(weak_node_dur / 1536);
        _0xEDE6["weakNode"]["top"] = _0xDA6C["split"]("/")[0];
        _0xEDE6["weakNode"]["bot"] = _0xDA6C["split"]("/")[1]
    }
    ;_0xEDE6["lineHeight"] = -1;
    var _0xEC6C = /%%staffsep\s*(\d{1,3})/;
    var _0xEC5A = _0xD9EE["match"](_0xEC6C);
    if (_0xEC5A != null) {
        _0xEDE6["lineHeight"] = _0xEC5A[1]
    }
    ;_0xEDE6["meter"] = null;
    var _0xECD8 = /M:\s*(\d{1,2}\/\d{1,2})/;
    var _0xECC6 = _0xD9EE["match"](_0xECD8);
    if (_0xECC6 != null) {
        _0xEDE6["meter"] = new Object();
        var _0xE270 = _0xECC6[1]["split"]("/")[0];
        var _0xE078 = _0xECC6[1]["split"]("/")[1];
        _0xEDE6["meter"]["top"] = _0xE270;
        _0xEDE6["meter"]["bot"] = _0xE078
    }
    ;_0xEDE6["isFreeMeasure"] = false;
    var _0xEC24 = /!invisible!M:.*/;
    var _0xEC12 = _0xD9EE["match"](_0xEC24);
    if (_0xEC24 != null) {
        _0xEDE6["isFreeMeasure"] = true
    }
    ;_0xEDE6["speedDesc"] = "";
    var _0xEC00 = /Q:.*\"(.[^\"\n]*)\"/;
    var _0xEBEE = _0xD9EE["match"](_0xEC00);
    if (_0xEBEE != null) {
        _0xEDE6["speedDesc"] = _0xEBEE[1];
        var _0xED7A = /Q:.*/;
        var _0xED68 = _0xD9EE["match"](_0xED7A);
        if (_0xED68 != null) {
            var _0xED8C = _0xED68[0];
            if (_0xED8C["indexOf"]("=") < _0xED8C["indexOf"]("\"")) {
                _0xEDE6["speedDescPos"] = "after";
                $("input[name=\'spdpos\'][value=\'after\']")["attr"]("checked", true)
            } else {
                if (_0xED8C["indexOf"]("=") > _0xED8C["indexOf"]("\"")) {
                    _0xEDE6["speedDescPos"] = "before";
                    $("input[name=\'spdpos\'][value=\'before\']")["attr"]("checked", true)
                }
            }
        }
    }
    ;_0xEDE6["speed"] = null;
    var _0xEDB0 = /Q:.*(\d{1,2}\/\d{1,2}\=\d{1,3})/;
    var _0xED9E = _0xD9EE["match"](_0xEDB0);
    if (_0xED9E != null) {
        var _0xEDC2 = _0xED9E[1];
        var _0xECEA = _0xEDC2["split"]("=")[0];
        var _0xEDD4 = _0xEDC2["split"]("=")[1];
        _0xEDE6["speed"] = new Object();
        _0xEDE6["speed"]["meter"] = new Object();
        _0xEDE6["speed"]["meter"]["top"] = _0xECEA["split"]("/")[0];
        _0xEDE6["speed"]["meter"]["bot"] = _0xECEA["split"]("/")[1];
        _0xEDE6["speed"]["val"] = _0xEDD4
    }
    ;_0xEDE6["titleFontSize"] = null;
    var _0xEE2E = /%%titlefont.*(\d{2})/;
    var _0xEE1C = _0xD9EE["match"](_0xEE2E);
    if (_0xEE1C != null) {
        _0xEDE6["titleFontSize"] = _0xEE1C[1]
    }
    ;_0xEDE6["titleFontColor"] = null;
    var _0xEE0A = /%%titlecolor\s*(.*)/;
    var _0xEDF8 = _0xD9EE["match"](_0xEE0A);
    if (_0xEDF8 != null) {
        _0xEDE6["titleFontColor"] = _0xEDF8[1]
    }
    ;_0xEDE6["lyricFontSize"] = null;
    var _0xECB4 = /%%vocalfont.*(\d{2})/;
    var _0xECA2 = _0xD9EE["match"](_0xECB4);
    if (_0xECA2 != null) {
        _0xEDE6["lyricFontSize"] = _0xECA2[1]
    }
    ;_0xEDE6["lyricFontColor"] = null;
    var _0xEC90 = /%%lyriccolor\s*(.*)/;
    var _0xEC7E = _0xD9EE["match"](_0xEC90);
    if (_0xEC7E != null) {
        _0xEDE6["lyricFontColor"] = _0xEC7E[1]
    }
    ;var _0xED20 = /V:.*perc/;
    _0xEDE6["isRhythmStaff"] = false;
    if (_0xEDE6["vocalCount"] == 1) {
        if (_0xED20["test"](_0xD9EE)) {
            _0xEDE6["isRhythmStaff"] = true
        }
    }
    ;if (getStaffKey()) {
        _0xEDE6["key"] = getStaffKey()["value"]
    }
    ;return _0xEDE6
}
function getLinesInfo(_0xD9EE) {
    var _0xDC2E = _0xD9EE["split"]("\x0A");
    var _0xE98A = new Array();
    var _0xE966 = 0;
    var _0xE978 = -1;
    var _0xE942 = -1;
    var _0xE9AE = -1;
    var _0xE9E4 = -1;
    var _0xDE5C = new Map();
    var _0xE954 = -1;
    var _0xE9C0 = /(%%score)|(%%staves)/;
    var _0xE9F6 = /V:\s*(\d{1,2})/;
    var _0xE99C = /M:\s*C\|/;
    for (var _0xDCE2 = 0, _0xDE26 = _0xDC2E["length"]; _0xDCE2 < _0xDE26; _0xDCE2++) {
        var _0xDE4A = _0xDC2E[_0xDCE2];
        var _0xE9D2 = _0xDE4A["replace"](/\[\d+/, "")["replace"](/\[\"/, "")["replace"](/\[.[^\[^\]]*\]/g, "")["replace"](/\".[^\"]*\"/g, "");
        var _0xDE38 = new Object();
        if (_0xE9C0["test"](_0xE9D2)) {
            _0xE942 = -1;
            _0xDE38["v"] = _0xE942;
            _0xDE38["type"] = "score"
        } else {
            if (_0xE9F6["test"](_0xE9D2)) {
                _0xE9AE = parseInt(_0xE9F6["exec"](_0xE9D2)[1]) - 1;
                _0xE942 = -1;
                _0xDE38["v"] = _0xE942;
                _0xDE38["type"] = "v";
                _0xDE38["vNum"] = _0xE9AE
            } else {
                if (_0xE99C["test"](_0xDE4A)) {
                    _0xDE38["v"] = -1;
                    _0xDE38["type"] = "other"
                } else {
                    if (_0xE9D2["indexOf"]("|") > -1 || _0xE9D2["indexOf"]("::") > -1 || _0xE9D2["indexOf"]("S:") == 0 || _0xE9D2["indexOf"]("w:") == 0) {
                        if (_0xE9AE == -1) {
                            _0xE9AE = 0
                        }
                        ;_0xDE38["v"] = _0xE9AE;
                        _0xDE38["vLineIndex"] = _0xE9E4;
                        if (_0xE9D2["indexOf"]("w") == 0) {
                            _0xDE38["type"] = "w";
                            if (_0xE954 > -1) {
                                _0xE98A[_0xE954]["lyricLineNums"]["push"](_0xDCE2)
                            }
                        } else {
                            if (_0xE9D2["indexOf"]("S:") == 0) {
                                _0xDE38["type"] = "S"
                            } else {
                                if (_0xE9D2["indexOf"]("N:") == 0) {
                                    _0xDE38["type"] = "N"
                                } else {
                                    _0xDE38["type"] = "note";
                                    _0xE954 = _0xDCE2;
                                    if (_0xDE38["type"] == "note") {
                                        if (_0xDE5C["get"]("vLineIndex" + _0xDE38["v"]) == null) {
                                            _0xDE5C["set"]("vLineIndex" + _0xDE38["v"], -1)
                                        }
                                        ;_0xE9E4 = _0xDE5C["get"]("vLineIndex" + _0xDE38["v"]);
                                        _0xE9E4++;
                                        _0xDE5C["set"]("vLineIndex" + _0xDE38["v"], _0xE9E4)
                                    }
                                    ;_0xDE38["vLineIndex"] = _0xE9E4
                                }
                            }
                        }
                    } else {
                        if (_0xE9D2["indexOf"]("%%") == 0) {
                            _0xDE38["v"] = -1;
                            _0xDE38["type"] = "zs"
                        } else {
                            if (_0xE9D2["indexOf"]("S:") == 0) {
                                _0xDE38["type"] = "S";
                                _0xDE38["vLineIndex"] = _0xE9E4
                            } else {
                                _0xDE38["v"] = _0xE9AE;
                                _0xDE38["type"] = "other"
                            }
                        }
                    }
                }
            }
        }
        ;_0xDE38["lineStr"] = _0xDE4A;
        _0xDE38["index"] = _0xDCE2;
        _0xDE38["startSeq"] = _0xE966;
        _0xDE38["endSeq"] = _0xE966 + _0xDE4A["length"] + 1;
        _0xDE38["lyricLineNums"] = [];
        _0xE966 += _0xDE4A["length"] + 1;
        _0xE98A["push"](_0xDE38)
    }
    ;return _0xE98A
}
function getNodesInfo(_0xD9EE) {
    var _0xDC2E = getLinesInfo(_0xD9EE);
    var _0xEAAA = false;
    var _0xDE80 = /(\|[1-9\.]+)|(\|\[[1-9\.]+)|(:\|\|:)|(:\|:)|(:\|)|(::)|(\|:)|(\|\|)|(\|\])|(\|)/g;
    var _0xEA86 = /(\|)/g;
    var _0xE420 = null;
    var _0xDFD6 = 0;
    var _0xEA3E = 0;
    var _0xEA74 = 0;
    var _0xEA62 = -1;
    var _0xDE5C = new Map();
    var _0xEA50 = new Map();
    var _0xE978 = -1;
    for (var _0xDCE2 = 0; _0xDCE2 < _0xDC2E["length"]; _0xDCE2++) {
        var _0xDFD6 = 0;
        var _0xDA12 = _0xDC2E[_0xDCE2];
        var _0xEABC = _0xDA12["type"];
        if (_0xEABC == "note" && !_0xEAAA) {
            _0xEAAA = true
        }
        ;if (_0xEAAA && (_0xEABC == "note" || _0xEABC == "w" || _0xEABC == "N" || _0xEABC == "S")) {
            _0xDA12["nodes"] = new Array();
            var _0xE9E4 = _0xDA12["vLineIndex"];
            if (_0xEA62 != _0xE9E4 || _0xDA12["v"] != _0xE978) {
                _0xEA74 = 0
            }
            ;var _0xDE4A = _0xDA12["lineStr"];
            var _0xDCF4 = _0xDA12["index"];
            var _0xE6BA = _0xDA12["startSeq"];
            var _0xDE14 = 0;
            var _0xE50A = _0xDA12["v"];
            var _0xDE6E = "";
            if (_0xEABC == "note") {
                _0xE420 = _0xDE80
            } else {
                _0xE420 = _0xEA86
            }
            ;while (_0xDE6E = _0xE420["exec"](_0xDE4A)) {
                if (_0xEA50["get"]("globalNodeIndexMap" + _0xE50A) == null) {
                    _0xEA50["set"]("globalNodeIndexMap" + _0xE50A, 0)
                }
                ;var _0xEA98 = new Object();
                _0xEA98["nodeStr"] = _0xDE4A["substring"](_0xDE14, _0xDE6E["index"]) + _0xDE6E[0];
                if (_0xEA98["nodeStr"]["trim"]() == "|" || _0xEA98["nodeStr"]["trim"]() == "||" || _0xEA98["nodeStr"]["trim"]() == "|:" || _0xEA98["nodeStr"]["trim"]() == ":|" || _0xEA98["nodeStr"]["trim"]() == ":|:" || _0xEA98["nodeStr"]["trim"]() == ":||:" || _0xEA98["nodeStr"]["trim"]() == "[M:C|]") {
                    continue
                }
                ;_0xEA98["nodeIndex"] = _0xEA50["get"]("globalNodeIndexMap" + _0xE50A) + (_0xDFD6++);
                if (_0xEA62 == _0xE9E4 && _0xDA12["v"] == _0xE978) {
                    _0xEA98["nodeIndex"] = _0xEA98["nodeIndex"] - _0xEA74
                }
                ;_0xEA98["startSeq"] = _0xE6BA + _0xDE14;
                _0xEA98["lineIndex"] = _0xDCF4;
                _0xEA98["v"] = _0xE50A;
                _0xEA98["br"] = false;
                _0xEA98["preStr"] = "";
                if (_0xEA98["nodeStr"]["indexOf"]("w:") === 0 || _0xEA98["nodeStr"]["indexOf"]("N:") === 0 || _0xEA98["nodeStr"]["indexOf"]("S:") === 0) {
                    _0xEA98["preStr"] = _0xEA98["nodeStr"]["substr"](0, 2)
                }
                ;if (_0xEA98["nodeStr"]["indexOf"]("$") == 0) {
                    _0xEA98["preStr"] = _0xEA98["nodeStr"]["substr"](0, 1);
                    _0xEA98["br"] = true
                }
                ;_0xEA98["endSeq"] = _0xEA98["startSeq"] + _0xEA98["nodeStr"]["length"];
                if (_0xEABC == "note") {
                    _0xEA98["barLineStr"] = _0xDE6E[0]
                }
                ;_0xDE14 = _0xDE6E["index"] + _0xDE6E[0]["length"];
                if (_0xDA12["nodes"]["length"] == 0) {
                    _0xEA98["isLineFirstNode"] = true
                }
                ;_0xDA12["nodes"]["push"](_0xEA98);
                if (_0xEABC == "note") {
                    _0xEA74++
                }
            }
            ;var _0xEA2C = _0xD9EE["substring"](_0xE6BA + _0xDE14, _0xDA12["endSeq"]);
            if (_0xDA12["nodes"]["length"] > 0 && _0xEA2C["indexOf"]("$") > -1) {
                _0xDA12["nodes"][_0xDA12["nodes"]["length"] - 1]["nextBr"] = true
            }
            ;if (_0xEABC == "note") {
                _0xEA3E = _0xEA50["get"]("globalNodeIndexMap" + _0xE50A);
                _0xEA3E += _0xEA74;
                _0xEA50["set"]("globalNodeIndexMap" + _0xE50A, _0xEA3E)
            }
            ;_0xEA62 = _0xE9E4;
            _0xE978 = _0xDA12["v"]
        }
    }
    ;return _0xDC2E
}
function getCharsInfo(_0xD9EE) {
    var _0xDC2E = getNodesInfo(_0xD9EE);
    var _0xE6CC = false;
    for (var _0xDCE2 = 0; _0xDCE2 < _0xDC2E["length"]; _0xDCE2++) {
        var _0xDA12 = _0xDC2E[_0xDCE2];
        if (_0xDA12["type"] == "note" && !_0xE6CC) {
            _0xE6CC = true
        }
        ;if (_0xE6CC) {
            var _0xE6BA = _0xDA12["startSeq"]
        }
    }
}
function replaceNodeContentToRestWithMeter(_0xF110, _0xE8A0) {
    if (_0xF110["replace"](/\s/g, "") != "") {
        var _0xF20C = _0xF110 + "";
        var _0xF3BC = _0xE8A0["replace"]("[M:", "")["replace"]("]", "");
        if (_0xF3BC == "C|") {
            _0xF3BC = "2/2"
        } else {
            if (_0xF3BC == "C") {
                _0xF3BC = "4/4"
            }
        }
        ;var _0xF3AA = new Object();
        _0xF3AA["top"] = _0xF3BC["split"]("/")[0];
        _0xF3AA["bot"] = _0xF3BC["split"]("/")[1];
        var _0xF3CE = genNodesByCount(1, _0xF3AA)["replace"]("|", "");
        console["log"]("newNodeStr:", _0xF3CE);
        _0xF110 = _0xF110["replace"](/\".[^\[]*\"/g, "");
        _0xF110 = _0xF110["replace"](/\s/g, "");
        var _0xF3F2 = /\[.[^\[]*\]/g;
        var _0xDE6E = "";
        var _0xF3E0 = "";
        var _0xDE14 = 0;
        while (_0xDE6E = _0xF3F2["exec"](_0xF110)) {
            console["log"](_0xDE6E, _0xDE6E[0]);
            var _0xDA6C = _0xDE6E[0];
            if (_0xDA6C["indexOf"](":") > -1) {
                if (_0xDA6C["indexOf"]("M") > -1) {
                    return _0xF20C
                } else {
                    _0xF3E0 += _0xDE6E[0]
                }
            }
        }
        ;if (_0xF3E0 != "") {
            _0xF3E0 += _0xF3CE;
            return _0xF3E0
        }
        ;return _0xF3CE
    }
}
function toStaff() {
    var _0xD9EE = $("#source")["val"]();
    var _0xF95C = new Array();
    var _0xF94A = "";
    var _0xDA7E = "";
    for (var _0xDCE2 = 0, _0xDE26 = syms["length"]; _0xDCE2 < _0xDE26; _0xDCE2++) {
        var _0xE8E8 = syms[_0xDCE2];
        if (_0xE8E8) {
            if (_0xE8E8["v"] == 0) {
                _0xF94A += _0xD9EE["substring"](_0xE8E8["istart"], _0xE8E8["iend"])
            } else {
                if (_0xE8E8["v"] == 1) {
                    _0xDA7E += _0xD9EE["substring"](_0xE8E8["istart"], _0xE8E8["iend"])
                }
            }
            ;console["log"]("str:", _0xD9EE["substring"](_0xE8E8["istart"], _0xE8E8["iend"]), "  istatt-iend:", _0xE8E8["istart"], _0xE8E8["iend"], "  st:", _0xE8E8["st"], "  v:", _0xE8E8["v"], "  bar_num:", _0xE8E8["my_bar_num"], " line:", _0xE8E8["my_line"])
        }
    }
    ;console["log"]("v0:", _0xF94A);
    console["log"]("v1:", _0xDA7E)
}
function getNoteInfoByIstart(_0xDDA8, _0xE50A) {
    if (!_0xE50A) {
        _0xE50A = 0
    }
    ;var _0xDD2A = syms[_0xDDA8];
    var _0xE5E2 = new Object();
    if (_0xDD2A) {
        console["log"](_0xDD2A["my_bar_num"]);
        var _0xDEB6 = _0xDD2A["my_bar_num"];
        var _0xE50A = _0xDD2A["v"];
        var _0xEB82 = 0;
        var _0xEB70 = 0;
        var _0xE930 = 0;
        var _0xE8FA = 0;
        for (var _0xDCE2 = 0, _0xDE26 = syms["length"]; _0xDCE2 < _0xDE26; _0xDCE2++) {
            var _0xE8E8 = syms[_0xDCE2];
            if (_0xE8E8) {
                if ((_0xE8E8["type"] == 8 || _0xE8E8["type"] == 10) && _0xE8E8["my_bar_num"] == _0xDEB6 && _0xE8E8["v"] == _0xE50A) {
                    if (_0xE8E8["istart"] == _0xDDA8 && _0xDCE2 == _0xE8E8["istart"]) {
                        _0xEB70 = _0xEB82 + 0;
                        _0xE5E2["stime"] = _0xEB70;
                        _0xE8FA = 1
                    }
                    ;if (_0xDCE2 == _0xE8E8["istart"]) {
                        if (_0xE8FA == 0) {
                            _0xE930++
                        }
                        ;_0xEB82 += _0xE8E8["dur"]
                    }
                }
            }
        }
        ;_0xE5E2["noteInNodeSeq"] = _0xE930;
        _0xE5E2["barNum"] = _0xDD2A["my_bar_num"];
        if (has_weak_node) {
            _0xE5E2["barNum"]++
        }
        ;_0xE5E2["totalTime"] = _0xEB82;
        _0xE5E2["present"] = _0xE5E2["stime"] / _0xE5E2["totalTime"];
        var _0xEB5E = getNoteData();
        var _0xEB4C = new Array();
        var _0xEB3A = 0;
        if (_0xEB5E != null) {
            for (var _0xDCE2 = 0, _0xDE26 = _0xEB5E["length"]; _0xDCE2 < _0xDE26; _0xDCE2++) {
                if (_0xEB5E[_0xDCE2][0] == _0xDDA8) {
                    _0xEB4C["push"](_0xEB3A++)
                }
            }
        }
        ;if (_0xEB3A == 0) {
            _0xEB4C["push"](0)
        }
        ;_0xE5E2["fields"] = _0xEB4C
    }
    ;return _0xE5E2
}
function getIstartByNoteInfo(_0xE91E) {
    var _0xE8FA = 0;
    var _0xE930 = 0;
    var _0xE90C = _0xE91E["barNum"];
    if (has_weak_node) {
        _0xE90C--
    }
    ;for (var _0xDCE2 = 0, _0xDE26 = syms["length"]; _0xDCE2 < _0xDE26; _0xDCE2++) {
        var _0xE8E8 = syms[_0xDCE2];
        if (_0xE8E8) {
            if ((_0xE8E8["type"] == 8 || _0xE8E8["type"] == 10) && _0xE8E8["my_bar_num"] == _0xE90C && _0xE8E8["v"] == _0xE91E["v"]) {
                if (_0xE930 == _0xE91E["noteInNodeSeq"]) {
                    return _0xE8E8
                }
                ;if (_0xDCE2 == _0xE8E8["istart"]) {
                    if (_0xE8FA == 0) {
                        _0xE930++
                    }
                }
            }
        }
    }
}
function testgetIstartByNoteInfo(_0xDEB6, _0xE50A, _0xF914) {
    var _0xE91E = new Object();
    _0xE91E["noteInNodeSeq"] = _0xF914;
    _0xE91E["barNum"] = _0xDEB6;
    _0xE91E["v"] = _0xE50A;
    var _0xDD2A = getIstartByNoteInfo(_0xE91E);
    return _0xDD2A
}
var copyNodeInfo = new Map();
function copyNodes() {
    copyNodeInfo = new Map();
    var _0xDEA4 = $("svg[type=\'rectbar\'],svg[type=\'rectnode\']");
    var _0xD9EE = $("#source")["val"]();
    var _0xDE80 = /(\|[1-9\.]+)|(\|\[[1-9\.]+)|(:\|\|:)|(:\|:)|(:\|)|(::)|(\|:)|(\|\|)|(\|\])|(\|)/g;
    if (_0xDEA4["length"] > 0) {
        var _0xDDF0 = new Array();
        $["each"]($(_0xDEA4), function(_0xDCE2, _0xDEEC) {
            var _0xDEC8 = new Object();
            var _0xDEDA = $(_0xDEEC)["attr"]("id");
            var _0xDEB6 = _0xDEDA["replace"]("mysvgbar", "")["replace"]("mysvgnode", "");
            if (_0xDEB6["indexOf"]("_") > -1) {
                _0xDEC8["v"] = parseInt(_0xDEB6["split"]("_")[0]);
                _0xDEC8["barNum"] = parseInt(_0xDEB6["split"]("_")[1])
            } else {
                _0xDEC8["barNum"] = parseInt(_0xDEB6);
                _0xDEC8["v"] = -1
            }
            ;_0xDDF0["push"](_0xDEC8)
        });
        if (_0xDDF0["length"] > 0) {
            var _0xDC2E = getLinesInfo(_0xD9EE);
            var _0xDE92 = 0;
            var _0xDA5A = "";
            var _0xDE5C = new Map();
            for (var _0xDCE2 = 0, _0xDE26 = _0xDC2E["length"]; _0xDCE2 < _0xDE26; _0xDCE2++) {
                var _0xDE38 = _0xDC2E[_0xDCE2];
                if (_0xDE38["type"] == "note") {
                    if (_0xDE5C["get"]("key" + _0xDE38["v"]) == null) {
                        _0xDE5C["set"]("key" + _0xDE38["v"], 0)
                    }
                    ;_0xDE92 = _0xDE5C["get"]("key" + _0xDE38["v"]);
                    var _0xDE6E = "";
                    var _0xDE14 = 0;
                    var _0xDE4A = _0xDE38["lineStr"];
                    while (_0xDE6E = _0xDE80["exec"](_0xDE4A)) {
                        for (var _0xDE02 = 0; _0xDE02 < _0xDDF0["length"]; _0xDE02++) {
                            var _0xDDDE = _0xDDF0[_0xDE02];
                            if (_0xDDDE["barNum"] == _0xDE92) {
                                if (_0xDDDE["v"] != -1) {
                                    if (_0xDDDE["v"] == _0xDE38["v"]) {
                                        if (copyNodeInfo["get"]("v" + _0xDDDE["v"]) == null) {
                                            copyNodeInfo["set"]("v" + _0xDDDE["v"], "")
                                        }
                                        ;copyNodeInfo["set"]("v" + _0xDDDE["v"], copyNodeInfo["get"]("v" + _0xDDDE["v"]) + _0xDE38["lineStr"]["substring"](_0xDE14, _0xDE6E["index"]) + _0xDE6E[0])
                                    }
                                } else {}
                            }
                        }
                        ;_0xDE92++;
                        _0xDE14 = _0xDE6E["index"] + _0xDE6E[0]["length"]
                    }
                    ;_0xDE5C["set"]("key" + _0xDE38["v"], _0xDE92)
                }
            }
        }
    }
}
function pasteNode() {
    if (copyNodeInfo == null) {
        return
    }
    ;var _0xF1C4 = copyNodeInfo["size"];
    var _0xDEA4 = $("svg[type=\'rectbar\'],svg[type=\'rectnode\']");
    var _0xF1A0 = new Array();
    if (_0xDEA4["length"] > 0) {
        var _0xF21E = new Array();
        $["each"]($(_0xDEA4), function(_0xDCE2, _0xDEEC) {
            var _0xF254 = new Object();
            var _0xDEDA = $(_0xDEEC)["attr"]("id");
            var _0xDEB6 = _0xDEDA["replace"]("mysvgbar", "")["replace"]("mysvgnode", "");
            if (_0xDEB6["indexOf"]("_") > -1) {
                _0xF254["v"] = parseInt(_0xDEB6["split"]("_")[0]);
                _0xF254["barNum"] = parseInt(_0xDEB6["split"]("_")[1])
            } else {
                _0xF254["barNum"] = parseInt(_0xDEB6);
                _0xF254["v"] = -1
            }
            ;_0xF21E["push"](_0xF254)
        });
        var _0xD9EE = $("#source")["val"]();
        var _0xF1E8 = getNodesInfo(_0xD9EE);
        var _0xDA5A = "";
        var _0xF1D6 = false;
        var _0xDE80 = /(\|[1-9\.]+)|(\|\[[1-9\.]+)|(:\|\|:)|(:\|:)|(:\|)|(::)|(\|:)|(\|\|)|(\|\])|(\|)/g;
        var _0xF242 = new Map();
        for (var _0xDCE2 = 0, _0xDE26 = _0xF1E8["length"]; _0xDCE2 < _0xDE26; _0xDCE2++) {
            var _0xDE38 = _0xF1E8[_0xDCE2];
            if (_0xDE38["type"] == "note") {
                var _0xDE4A = _0xDE38["lineStr"];
                var _0xDE6E = "";
                var _0xDE14 = 0;
                var _0xF1FA = "";
                var _0xDC64 = _0xDE38["nodes"];
                for (var _0xDCAC = 0; _0xDCAC < _0xDC64["length"]; _0xDCAC++) {
                    _0xDE6E = _0xDC64[_0xDCAC];
                    _0xF1D6 = false;
                    for (var _0xDE02 = 0; _0xDE02 < _0xF21E["length"]; _0xDE02++) {
                        var _0xF230 = _0xF21E[_0xDE02];
                        if (_0xF230["barNum"] == _0xDE6E["nodeIndex"] && _0xF230["v"] == _0xDE38["v"]) {
                            if (_0xF242["get"]("v" + _0xF230["v"])) {
                                _0xF1D6 = true;
                                continue
                            }
                            ;var _0xF1B2 = copyNodeInfo["get"]("v" + _0xF230["v"]);
                            if (!_0xF1B2 && _0xF1C4 == 1) {
                                _0xF1B2 = copyNodeInfo["get"](copyNodeInfo["keys"]()["next"]()["value"])
                            }
                            ;if (!_0xF1D6) {
                                var _0xF20C = _0xDE6E["nodeStr"];
                                if (_0xF20C["indexOf"]("$") > -1) {
                                    if (_0xF1B2["indexOf"]("$") < 0) {
                                        _0xF1FA += "$" + _0xF1B2
                                    } else {
                                        _0xF1FA += _0xF1B2["replace"]("$", "")
                                    }
                                } else {
                                    _0xF1FA += _0xF1B2["replace"]("$", "")
                                }
                                ;_0xF1D6 = true;
                                _0xF242["set"]("v" + _0xF230["v"], true)
                            }
                        }
                    }
                    ;if (!_0xF1D6) {
                        _0xF1FA += _0xDE6E["nodeStr"]
                    }
                    ;_0xDE14 = _0xDE6E["endSeq"]
                }
                ;if (_0xDE14 != _0xDE38["endSeq"]) {
                    _0xF1FA += _0xD9EE["substring"](_0xDE14, _0xDE38["endSeq"])
                }
                ;_0xDA5A += _0xF1FA + "\x0A"
            } else {
                if (_0xDE38["v"] != -1 && _0xDE38["type"] == "note") {
                    _0xDA5A += _0xDE38["lineStr"]["replace"](/\$/g, "") + "\x0A"
                } else {
                    _0xDA5A += _0xDE38["lineStr"] + "\x0A"
                }
            }
        }
        ;_0xDA5A = replaceBlankLine(_0xDA5A);
        $("#source")["val"](_0xDA5A);
        src_change();
        doLog()
    }
}
function copyNote() {
    hiddenMenu();
    user["copyNoteInfo"]["s"] = new Array();
    user["copyNoteInfo"]["copyNoteStr"] = "";
    user["copyNoteInfo"]["dur"] = 0;
    var _0xDF34 = $(".selected_text[type*=\'HD\'],.selected_text[type^=\'r\'],.selected_text[type=\'note\']");
    if (_0xDF34["length"] > 0) {
        if (_0xDF34["length"] == 1) {
            var _0xDDA8 = $(_0xDF34[0])["attr"]("istart");
            var _0xDD2A = syms[_0xDDA8];
            if (_0xDD2A) {
                var _0xD9EE = $("#source")["val"]();
                var _0xDF22 = _0xD9EE["substring"](_0xDD2A["istart"], _0xDD2A["iend"]);
                user["copyNoteInfo"]["s"] = _0xDD2A;
                user["copyNoteInfo"]["copyNoteStr"] = _0xDF22;
                user["copyNoteInfo"]["copyChordStr"] = ""
            }
        } else {
            if (_0xDF34["length"] > 1) {
                var _0xDF46 = $(_0xDF34[0])["attr"]("istart");
                var _0xDEFE = $(_0xDF34[_0xDF34["length"] - 1])["attr"]("istart");
                var _0xDF10 = syms[_0xDEFE];
                for (var _0xDCE2 = _0xDF46; _0xDCE2 <= _0xDEFE; _0xDCE2++) {
                    var _0xDD2A = syms[_0xDCE2];
                    if (_0xDD2A && (_0xDD2A["type"] == 8 || _0xDD2A["type"] == 10)) {
                        user["copyNoteInfo"]["dur"] += _0xDD2A["dur_orig"]
                    }
                }
                ;if (_0xDF10) {
                    var _0xD9EE = $("#source")["val"]();
                    var _0xDF22 = _0xD9EE["substring"](_0xDF46, _0xDF10["iend"]);
                    user["copyNoteInfo"]["copyNoteStr"] = _0xDF22;
                    user["copyNoteInfo"]["copyChordStr"] = ""
                }
            }
        }
    }
}
function pasteNote() {
    hiddenMenu();
    var _0xDF34 = $(".selected_text[type*=\'HD\'],.selected_text[type^=\'r\'],.selected_text[type=\'note\']");
    if (_0xDF34["length"] == 1) {
        var _0xDDA8 = $(_0xDF34[0])["attr"]("istart");
        var _0xDD2A = syms[_0xDDA8];
        if (_0xDD2A) {
            var _0xD9EE = $("#source")["val"]();
            if (user["copyNoteInfo"]["copyNoteStr"] != "") {
                user["pasteNote"] = true;
                var _0xE91E = genNoteAndDur(user["copyNoteInfo"]["copyNoteStr"], _0xDD2A);
                _0xE91E["note"] = user["copyNoteInfo"]["copyNoteStr"]["replace"](/\d/g, "")["replace"](/[\/]/g, "");
                user["pasteNote"] = false;
                if (!_0xE91E) {
                    return
                }
                ;replaceNote("source", _0xDD2A["istart"], _0xDD2A["iend"], _0xE91E)
            }
        }
    } else {
        if (_0xDF34["length"] > 1) {
            var _0xDDA8 = $(_0xDF34[0])["attr"]("istart");
            var _0xDD2A = syms[_0xDDA8];
            if (_0xDD2A) {
                if (user["copyNoteInfo"]["dur"] > _0xDD2A["dur"]) {
                    window["top"]["alert"]("\u5f53\u524d\u590d\u5236\u7684\u97f3\u7b26\u65f6\u503c\u5927\u4e8e\u9009\u4e2d\u7684\u97f3\u7b26\u65f6\u95f4\uff0c\u65e0\u6cd5\u5b8c\u6210\u7c98\u8d34\u64cd\u4f5c\u3002");
                    return
                }
                ;var _0xD9EE = $("#source")["val"]();
                if (user["copyNoteInfo"]["copyNoteStr"] != "") {
                    user["pasteNote"] = true;
                    var _0xE91E = genNoteAndDur(user["copyNoteInfo"]["copyNoteStr"], _0xDD2A);
                    _0xE91E["note"] = user["copyNoteInfo"]["copyNoteStr"]["replace"](/\d/g, "")["replace"](/[\/]/g, "");
                    user["pasteNote"] = false;
                    if (!_0xE91E) {
                        return
                    }
                    ;replaceNote("source", _0xDD2A["istart"], _0xDD2A["iend"], _0xE91E)
                }
            }
        }
    }
}
function getDurStrByNoteDur(_0xE810, _0xE834) {
    var _0xE7FE = parseInt(_0xE810) / parseInt(_0xE834);
    var _0xE822 = decimalsToFractional(_0xE7FE);
    _0xE822 = _0xE822["replace"]("/1", "");
    _0xE822 = _0xE822["replace"]("/2", "/");
    _0xE822 = _0xE822["replace"]("/4", "//");
    _0xE822 = _0xE822["replace"]("/8", "///");
    _0xE822 = _0xE822["replace"]("/16", "////");
    if (_0xE7FE < 1) {
        _0xE822 = _0xE822["replace"]("1/", "/")
    }
    ;if (_0xE822 == "1") {
        _0xE822 = ""
    }
    ;return _0xE822
}
function renderStaffNodeBySt(_0xF33E, _0xF386) {
    var _0xE564 = getStaffNodeCoor(scale, false, 0);
    for (var _0xDCE2 = 0; _0xDCE2 < _0xF33E["length"]; _0xDCE2++) {
        var _0xDA00 = _0xF33E[_0xDCE2]["bar_num"];
        var _0xF2F6 = _0xF33E[_0xDCE2]["color"];
        var _0xF374 = _0xF33E[_0xDCE2]["stroke"];
        if (_0xF2F6 == "") {
            _0xF2F6 = "blue"
        }
        ;if (_0xDA00 > (_0xE564["length"] - 1)) {
            return
        }
        ;for (var _0xDE02 = 0; _0xDE02 < _0xE564["length"]; _0xDE02++) {
            var _0xF308 = _0xE564[_0xDE02];
            if (_0xF308["v"] == _0xF33E[_0xDCE2]["v"] && _0xF308["node_index"] == _0xF33E[_0xDCE2]["bar_num"]) {
                var _0xF362 = _0xF308["nodeline_start"];
                var _0xF350 = _0xF308["nodeline_end"];
                var _0xDCAC = bar_offset_x * scale + _0xF362[0];
                var _0xDCBE = _0xF362[1];
                var _0xF398 = _0xF350[0] - _0xF362[0];
                var _0xF32C = _0xF350[3] - _0xF362[1];
                var _0xF31A = $("svg.music")[_0xF308["line"]];
                $("#mysvg" + _0xF386 + _0xF308["v"] + "_" + _0xDA00)["remove"]();
                if (_0xF374) {
                    $(_0xF31A)["prepend"]("<svg id=\"mysvg" + _0xF386 + _0xF308["v"] + "_" + _0xDA00 + "\" barIndex=\"" + _0xDA00 + "\" type=\"rect" + _0xF386 + "\"><rect x=\"" + _0xDCAC + "\" y=\"" + _0xDCBE + "\" width=\"" + _0xF398 + "\" height=\"" + _0xF32C + "\" stroke=\"red\" stroke-width=\"3\" fill=\"" + _0xF2F6 + "\" fill-opacity=\"0\"></rect></svg>")
                } else {
                    $(_0xF31A)["prepend"]("<svg id=\"mysvg" + _0xF386 + _0xF308["v"] + "_" + _0xDA00 + "\" barIndex=\"" + _0xDA00 + "\" type=\"rect" + _0xF386 + "\"><rect x=\"" + _0xDCAC + "\" y=\"" + _0xDCBE + "\" width=\"" + _0xF398 + "\" height=\"" + _0xF32C + "\" fill=\"" + _0xF2F6 + "\" fill-opacity=\"0.3\"></rect></svg>")
                }
            }
        }
    }
}
function autoNodeLine() {
    try {
        var _0xDC88 = getStartPos(document["getElementById"]("source"));
        var _0xD9EE = $("#source")["val"]();
        var _0xDC76 = _0xD9EE["substr"](0, _0xDC88);
        var _0xDC1C = findLineNumByIndex(_0xD9EE, _0xDC88);
        var _0xDC2E = _0xDC76["split"]("\x0A");
        var _0xDBF8 = _0xDC2E[_0xDC2E["length"] - 1];
        var _0xDBD4 = "";
        if (_0xDC1C < _0xD9EE["split"]("\x0A")["length"] - 1) {
            _0xDBD4 = "\x0A"
        }
        ;var _0xDC40 = $["trim"](getLastM("source")["split"](":")[1]);
        var _0xDBE6 = $("#L")["val"]();
        var _0xDC9A = toFloat(_0xDC40) / toFloat(_0xDBE6);
        var _0xDC64 = _0xDBF8["split"]("|");
        var _0xDC0A = _0xDC64[_0xDC64["length"] - 1];
        var _0xDC52 = calNodeLen(_0xDC0A);
        var _0xDCAC = get("M:")["split"]("/")[1];
        var _0xDCBE = get("L:")["split"]("/")[1];
        var _0xDCD0 = parseInt(_0xDCBE) / parseInt(_0xDCAC);
        if (parseInt($("#M")["val"]()["split"]("/")[0]) <= 4) {
            if (_0xDC52 % _0xDCD0 == 0) {
                $("#source")["val"](_0xDC76 + " " + _0xDBD4 + _0xD9EE["substr"](_0xDC88 + 1))
            }
        } else {
            if (parseInt(n) == 6 || parseInt(n) == 9) {
                console["log"]("nodeLen------", _0xDC52);
                if (_0xDC52 / 3) {}
            }
        }
        ;if (_0xDC52 >= _0xDC9A) {
            $("#source")["val"](_0xDC76 + "| " + _0xDBD4 + _0xD9EE["substr"](_0xDC88 + 1))
        }
    } catch (e) {
        console["log"](e)
    }
}
function autoNodeLine2(_0xDCF4) {
    try {
        var _0xDC88 = 0;
        var _0xD9EE = $("#source")["val"]();
        var _0xDC2E = _0xD9EE["split"]("\x0A");
        for (var _0xDCE2 = 0; _0xDCE2 < _0xDC2E["length"]; _0xDCE2++) {
            var _0xDA12 = _0xDC2E[_0xDCE2];
            if (_0xDCE2 != (_0xDC2E["length"] - 1)) {
                _0xDC88 += _0xDA12["length"] + 1
            } else {
                _0xDC88 += _0xDA12["length"]
            }
            ;if (_0xDCE2 == _0xDCF4) {
                break
            }
        }
        ;var _0xDC76 = _0xD9EE["substr"](0, _0xDC88);
        var _0xDA00 = _0xDC2E["length"] - 1;
        if (_0xDCF4) {
            _0xDA00 = _0xDCF4
        }
        ;var _0xDBF8 = _0xDC2E[_0xDA00];
        var _0xDC40 = $["trim"](getLastM("source")["split"](":")[1]);
        var _0xDBE6 = $("#L")["val"]();
        var _0xDC9A = toFloat(_0xDC40) / toFloat(_0xDBE6);
        var _0xDC64 = _0xDBF8["split"]("|");
        var _0xDC0A = _0xDC64[_0xDC64["length"] - 1];
        var _0xDC52 = calNodeLen(_0xDC0A);
        var _0xDD06 = $("#M")["val"]()["split"]("/")[0];
        var _0xDCAC = $("#M")["val"]()["split"]("/")[1];
        var _0xDCBE = $("#L")["val"]()["split"]("/")[1];
        var _0xDCD0 = parseInt(_0xDCBE) / parseInt(_0xDCAC);
        if (parseInt(_0xDD06) <= 4) {
            if (_0xDC52 % _0xDCD0 == 0) {
                if (_0xDCF4 != (_0xDC2E["length"] - 1)) {
                    $("#source")["val"](_0xDC76["substring"](0, _0xDC76["length"] - 1) + " \x0A" + _0xD9EE["substr"](_0xDC88))
                } else {
                    $("#source")["val"](_0xDC76 + " " + _0xD9EE["substr"](_0xDC88 + 1))
                }
            }
        } else {
            if (parseInt(_0xDD06) == 6 || parseInt(_0xDD06) == 9) {
                console["log"]("nodeLen------", _0xDC52);
                if (_0xDC52 / 3) {}
            }
        }
        ;if (_0xDC52 >= _0xDC9A) {
            if (_0xDCF4 != (_0xDC2E["length"] - 1)) {
                $("#source")["val"](_0xDC76["substring"](0, _0xDC76["length"] - 1) + "| \x0A" + _0xD9EE["substr"](_0xDC88))
            } else {
                $("#source")["val"](_0xDC76 + "| " + _0xD9EE["substr"](_0xDC88 + 1))
            }
        }
    } catch (e) {
        console["log"](e)
    }
}
function delNodes(_0xDFE8) {
    var _0xDC2E = getNodesInfo($("#source")["val"]());
    var _0xDA5A = "";
    for (var _0xDCE2 = 0; _0xDCE2 < _0xDC2E["length"]; _0xDCE2++) {
        var _0xDA12 = _0xDC2E[_0xDCE2];
        var _0xDE4A = _0xDA12["lineStr"];
        if (_0xDA12["nodes"]) {
            var _0xDC64 = _0xDA12["nodes"];
            for (var _0xDE02 = 0; _0xDE02 < _0xDC64["length"]; _0xDE02++) {
                var _0xDE6E = _0xDC64[_0xDE02];
                var _0xDFFA = false;
                for (var _0xDFA0 = 0; _0xDFA0 < _0xDFE8["length"]; _0xDFA0++) {
                    var _0xDFD6 = _0xDFE8[_0xDFA0];
                    if (_0xDE6E["nodeIndex"] == _0xDFD6) {
                        _0xDFFA = true;
                        break
                    }
                }
                ;if (_0xDFFA) {
                    _0xDA5A += _0xDE6E["preStr"]
                } else {
                    _0xDA5A += _0xDE6E["nodeStr"]
                }
            }
            ;_0xDA5A += "\x0A"
        } else {
            _0xDA5A += _0xDE4A + "\x0A"
        }
    }
    ;_0xDA5A = replaceBlankLine(_0xDA5A);
    var _0xDFB2 = getNodesInfo(_0xDA5A);
    var _0xE00C = 0;
    var _0xDFC4 = "";
    for (var _0xDCE2 = 0; _0xDCE2 < _0xDFB2["length"]; _0xDCE2++) {
        var _0xDA12 = _0xDFB2[_0xDCE2];
        var _0xDE4A = _0xDA12["lineStr"];
        if (_0xDA12["type"] == "note" || _0xDA12["type"] == "w") {
            _0xE00C++
        }
        ;if (_0xE00C == 1 && _0xDA12["type"] == "w") {} else {
            _0xDFC4 += _0xDE4A + "\x0A"
        }
    }
    ;$("#source")["val"](_0xDFC4);
    src_change();
    doLog()
}
function insertNodeByIndex(_0xDFD6) {
    var _0xE8A0 = null;
    for (var _0xDCE2 = 0; _0xDCE2 < syms["length"]; _0xDCE2++) {
        if (syms[_0xDCE2]) {
            var _0xDD2A = syms[_0xDCE2];
            if ((_0xDD2A["type"] == 8 || _0xDD2A["type"] == 10) && _0xDD2A["my_bar_num"] == _0xDFD6) {
                _0xE8A0 = _0xDD2A["my_meter"][0];
                break
            }
        }
    }
    ;var _0xF110 = "";
    if (_0xE8A0 != null) {
        _0xF110 = genNodesByCount(1, _0xE8A0)
    }
    ;if (_0xF110 == "") {
        return
    }
    ;var _0xDC2E = getNodesInfo($("#source")["val"]());
    var _0xDA5A = "";
    for (var _0xDCE2 = 0; _0xDCE2 < _0xDC2E["length"]; _0xDCE2++) {
        var _0xDA12 = _0xDC2E[_0xDCE2];
        var _0xDE4A = _0xDA12["lineStr"];
        if (_0xDA12["nodes"]) {
            var _0xDC64 = _0xDA12["nodes"];
            for (var _0xDE02 = 0; _0xDE02 < _0xDC64["length"]; _0xDE02++) {
                var _0xDE6E = _0xDC64[_0xDE02];
                if (_0xDE6E["nodeIndex"] == _0xDFD6) {
                    _0xDA5A += _0xF110 + _0xDE6E["nodeStr"]
                } else {
                    _0xDA5A += _0xDE6E["nodeStr"]
                }
            }
            ;_0xDA5A += "\x0A"
        } else {
            _0xDA5A += _0xDE4A + "\x0A"
        }
    }
    ;$("#source")["val"](_0xDA5A);
    src_change();
    doLog()
}
function reBr(_0xED56) {
    var _0xD9EE = $("#" + _0xED56)["val"]();
    if (_0xD9EE["indexOf"]("%%linebreak") < 0 && _0xD9EE["indexOf"]("%%breakline") < 0) {
        return _0xD9EE
    }
    ;var _0xDC2E = getNodesInfo(_0xD9EE);
    var _0xF2AE = new Array();
    for (var _0xDCE2 = 0; _0xDCE2 < _0xDC2E["length"]; _0xDCE2++) {
        var _0xDE38 = _0xDC2E[_0xDCE2];
        if (_0xDE38["v"] == 0 && _0xDE38["type"] == "note") {
            var _0xDC64 = _0xDE38["nodes"];
            var _0xDE4A = _0xDE38["lineStr"];
            var _0xDFD6 = 0;
            if (_0xDC64) {
                for (var _0xDE02 = 0; _0xDE02 < _0xDC64["length"]; _0xDE02++) {
                    var _0xDE6E = _0xDC64[_0xDE02];
                    _0xDFD6 = _0xDE6E["nodeIndex"];
                    if (_0xDE6E["nodeStr"] && _0xDE6E["nodeStr"]["indexOf"]("$") > -1) {
                        _0xF2AE["push"](_0xDE6E["nodeIndex"])
                    }
                }
            }
            ;var _0xF2E4 = _0xDE4A["split"]("|");
            if (_0xF2E4["length"] == 1 && _0xDE4A["indexOf"]("::") > -1) {
                _0xF2E4 = _0xDE4A["split"]("::")
            }
            ;if (_0xF2E4["length"] > 0) {
                var _0xF2C0 = _0xF2E4[_0xF2E4["length"] - 1];
                if (_0xF2C0["replace"](/\s|\||\]|\:/g, "")["replace"](/\[?[0-9.]{1,2}/, "")["indexOf"]("$") == 0) {
                    _0xF2AE["push"](_0xDFD6 + 1)
                }
            }
        }
    }
    ;var _0xF134 = "";
    for (var _0xDCE2 = 0; _0xDCE2 < _0xDC2E["length"]; _0xDCE2++) {
        var _0xDE38 = _0xDC2E[_0xDCE2];
        if (_0xDE38["v"] != 0 && _0xDE38["type"] == "note") {
            var _0xDC64 = _0xDE38["nodes"];
            var _0xF2D2 = -1;
            if (_0xDC64) {
                for (var _0xDE02 = 0; _0xDE02 < _0xDC64["length"]; _0xDE02++) {
                    var _0xDE6E = _0xDC64[_0xDE02];
                    _0xF2D2 = _0xDE6E["endSeq"];
                    if (_0xF2AE["indexOf"](_0xDE6E["nodeIndex"] + 1) > -1) {
                        _0xF134 = _0xF134 + _0xDE6E["nodeStr"]["replace"](/\$/g, "") + "$"
                    } else {
                        _0xF134 = _0xF134 + _0xDE6E["nodeStr"]["replace"](/\$/g, "")
                    }
                }
            }
            ;if (_0xF2D2 != _0xDE38["endSeq"]) {
                _0xF134 += _0xD9EE["substring"](_0xF2D2, _0xDE38["endSeq"])
            } else {
                _0xF134 += "\x0A"
            }
        } else {
            _0xF134 = _0xF134 + _0xDE38["lineStr"] + "\x0A"
        }
    }
    ;return _0xF134["replaceAll"](/[$]+/, "$")
}
function getChordGnbj(_0xDF7C, _0xDF22, _0xE0C0) {
    if (!_0xE0C0) {
        _0xE0C0 = ""
    }
    ;var _0xE726 = /[a-gA-G]/g;
    var _0xDA36 = _0xDF22["match"](_0xE726);
    var _0xE714 = 0;
    if (_0xDA36 != null) {
        _0xE714 = _0xDA36["length"]
    }
    ;var _0xE702 = -1
      , _0xE6F0 = -1;
    for (var _0xDCE2 = 0; _0xDCE2 < 7; _0xDCE2++) {
        var _0xE150 = _0xDCE2;
        var _0xE738 = "yuanwei";
        var _0xE74A = "zhuangwei1";
        var _0xE75C = "zhuangwei2";
        var _0xE76E = "zhuangwei3";
        if (_0xE0C0 != "") {
            _0xE738 += "-" + _0xE0C0;
            _0xE74A += "-" + _0xE0C0;
            _0xE75C += "-" + _0xE0C0;
            _0xE76E += "-" + _0xE0C0
        }
        ;var _0xDA5A = "";
        if (_0xE714 == 3) {
            _0xDA5A = gen37ChordString(3, _0xE738, _0xE150, _0xDF7C);
            if (_0xDA5A == _0xDF22) {
                _0xE6F0 = "3";
                _0xE702 = _0xDCE2;
                break
            }
            ;_0xDA5A = gen37ChordString(3, _0xE74A, _0xE150, _0xDF7C);
            if (_0xDA5A == _0xDF22) {
                _0xE6F0 = "3";
                _0xE702 = _0xDCE2;
                break
            }
            ;_0xDA5A = gen37ChordString(3, _0xE75C, _0xE150, _0xDF7C);
            if (_0xDA5A == _0xDF22) {
                _0xE6F0 = "3";
                _0xE702 = _0xDCE2;
                break
            }
        } else {
            if (_0xE714 == 4) {
                _0xDA5A = gen37ChordString(7, _0xE738, _0xE150, _0xDF7C);
                if (_0xDA5A == _0xDF22) {
                    _0xE6F0 = "7";
                    _0xE702 = _0xDCE2;
                    break
                }
                ;_0xDA5A = gen37ChordString(7, _0xE74A, _0xE150, _0xDF7C);
                if (_0xDA5A == _0xDF22) {
                    _0xE6F0 = "7";
                    _0xE702 = _0xDCE2;
                    break
                }
                ;_0xDA5A = gen37ChordString(7, _0xE75C, _0xE150, _0xDF7C);
                if (_0xDA5A == _0xDF22) {
                    _0xE6F0 = "7";
                    _0xE702 = _0xDCE2;
                    break
                }
                ;_0xDA5A = gen37ChordString(7, _0xE76E, _0xE150, _0xDF7C);
                if (_0xDA5A == _0xDF22) {
                    _0xE6F0 = "7";
                    _0xE702 = _0xDCE2;
                    break
                }
            }
        }
    }
    ;var _0xE6DE = null;
    switch (_0xE0C0) {
    case "":
        ;
    case "hsdd":
        if (_0xE6F0 == "7") {
            _0xE6DE = ["fmt:T/7", "fmt:S\u2161/7", "fmt:DT\u2162/7", "fmt:S/7", "fmt:D/7", "fmt:TS\u2165/7", "fmt:D\u2166/7"]
        } else {
            _0xE6DE = ["T", "S\u2161", "DT\u2162", "S", "D", "TS\u2165", "D\u2166"]
        }
        ;break;
    case "zrxd":
        ;
    case "hsxd":
        if (_0xE6F0 == "7") {
            _0xE6DE = ["fmt:t/7", "fmt:s\u2161/7", "fmt:dt\u2162/7", "fmt:s/7", "fmt:d/7", "fmt:ts\u2165/7", "fmt:d\u2166/7"]
        } else {
            _0xE6DE = ["t", "s\u2161", "dt\u2162", "s", "d", "ts\u2165", "d\u2166"]
        }
        ;break
    }
    ;if (null == _0xE6DE || _0xE702 == -1 || _0xE6F0 == -1) {
        return ""
    }
    ;return _0xE6DE[_0xE702]
}
function showProperties(_0xEABC, _0xF16A, _0xF620) {
    if (!user["editorAnnot"]) {
        return
    }
    ;if (_0xEABC == "deco" && selectDecoInfo != null && ($(selectDecoInfo)["attr"]("type") == "slur" || $(selectDecoInfo)["attr"]("type") == "tie")) {
        return
    }
    ;$("#layoutPanel")["hide"]();
    $("#panelName")["removeClass"]("active");
    console["log"]("showProperties:", _0xEABC, _0xF16A);
    $(".panel-body")["css"]("display", "none");
    if (_0xEABC == "lyric") {
        $("#panelName")["html"]("\u6b4c\u8bcd\u5c5e\u6027");
        var _0xD9EE = $("#source")["val"]();
        var _0xDDA8 = $(selectGchInfo)["attr"]("istart");
        var _0xEB94 = $(selectGchInfo)["attr"]("lyric_istart");
        var _0xF70A = $(selectGchInfo)["attr"]("lyric_iend");
        $("#editorLyricIstart")["val"](_0xEB94);
        $("#editorLyricIend")["val"](_0xF70A);
        var _0xF82A = _0xD9EE["substring"](_0xEB94, _0xF70A);
        var _0xE420 = /\[[se]\.lb\.[^\]]*\]/;
        var _0xF60E = "";
        if (_0xE420["test"](_0xF82A)) {
            _0xF60E = _0xE420["exec"](_0xF82A)[0];
            _0xF82A = _0xF82A["replace"](_0xE420, "");
            $("#lyricBgColor")["val"](_0xF60E)
        }
        ;var _0xEB16 = "";
        var _0xF872 = "";
        var _0xF644 = "";
        var _0xF5FC = "";
        if (_0xF82A["indexOf"]("[R]") == 0) {
            _0xF5FC = "[R]";
            _0xF82A = _0xF82A["replace"]("[R]", "")
        } else {
            if (_0xF82A["indexOf"]("[L]") == 0) {
                _0xF5FC = "[L]";
                _0xF82A = _0xF82A["replace"]("[L]", "")
            }
        }
        ;var _0xF860 = /\[\^(.[^\[]*)\]/;
        var _0xF632 = /\[\_(.[^\[]*)\]/;
        if (_0xF82A["indexOf"]("fmt:") > -1) {
            var _0xF67A = /fmt:(.[^\/]*\/.*)/;
            var _0xDA36 = _0xF82A["match"](_0xF67A);
            if (_0xDA36 != null) {
                _0xF82A = _0xDA36[1];
                if (_0xF82A["indexOf"]("/") > -1) {
                    _0xEB16 = _0xF82A["substring"](0, _0xF82A["indexOf"]("/"));
                    var _0xF818 = _0xF82A["substring"](_0xF82A["indexOf"]("/") + 1);
                    var _0xF7BE = /\((.[^\)]*)\)/;
                    if (_0xF7BE["test"](_0xF818)) {
                        var _0xDE6E = _0xF7BE["exec"](_0xF818);
                        _0xF644 = _0xDE6E[1];
                        _0xF872 = _0xF818["replace"](_0xDE6E[0], "");
                        if (_0xF7BE["test"](_0xF872)) {
                            var _0xF83C = _0xF7BE["exec"](_0xF872);
                            _0xF872 = _0xF83C[1]
                        }
                    } else {
                        _0xF644 = _0xF818["substring"](0, 1);
                        _0xF872 = _0xF818["substring"](1)
                    }
                }
            } else {
                _0xF82A = _0xF82A["replace"]("fmt:", "");
                _0xEB16 = _0xF82A["substring"](0, 1);
                _0xF644 = _0xF82A["substring"](1, 2);
                _0xF872 = _0xF82A["substring"](2)
            }
        } else {
            if (_0xF860["test"](_0xF82A) || _0xF632["test"](_0xF82A)) {
                if (_0xF860["test"](_0xF82A)) {
                    var _0xDE6E = _0xF860["exec"](_0xF82A);
                    _0xF872 = _0xDE6E[1];
                    _0xF82A = _0xF82A["replace"](_0xDE6E[0], "")
                }
                ;if (_0xF632["test"](_0xF82A)) {
                    var _0xDE6E = _0xF632["exec"](_0xF82A);
                    _0xF644 = _0xDE6E[1];
                    _0xF82A = _0xF82A["replace"](_0xDE6E[0], "")
                }
                ;_0xEB16 = _0xF82A
            } else {
                _0xEB16 = _0xF82A
            }
        }
        ;if ("[R]" == _0xF5FC) {
            $("input[name=\'lyricAlign\'][value=\'right\']")["prop"]("checked", "checked")
        } else {
            if ("[L]" == _0xF5FC) {
                $("input[name=\'lyricAlign\'][value=\'left\']")["prop"]("checked", "checked")
            } else {
                $("input[name=\'lyricAlign\'][value=\'center\']")["prop"]("checked", "checked")
            }
        }
        ;$("#lyricText")["val"](_0xEB16);
        $("#lyricTextUp")["val"](_0xF872);
        $("#lyricTextDown")["val"](_0xF644);
        $(".panel-body.lyricpropertyes")["show"]()
    } else {
        if (_0xEABC == "chordinput") {
            $("#panelName")["html"]("\u548c\u5f26\u6807\u8bb0");
            $(".panel-body.chordinput")["show"]();
            $(".chordinput")["css"]("background-color", "");
            if (selectGchInfo) {
                var _0xDDA8 = $(selectGchInfo)["attr"]("gch_istart");
                var _0xDD2A = syms[_0xDDA8];
                if (_0xDD2A) {
                    $("#editorChordIstart")["val"](_0xDD2A["istart"]);
                    var _0xEB16 = getGch(_0xDD2A, "my_chord:");
                    var _0xF6E6 = getGchInfo(_0xDD2A, _0xEB16["replace"]("_", ""));
                    $("#chordText")["val"](_0xF6E6["chordText"]);
                    $("#leftUpText")["val"](_0xF6E6["leftUpText"]);
                    $("#rightUpText")["val"](_0xF6E6["rightUpText"]);
                    $("#rightDownText")["val"](_0xF6E6["rightDownText"]);
                    $("#chordText2")["val"](_0xF6E6["chordText2"]);
                    console["log"](_0xDD2A)
                }
            }
            ;return
        } else {
            if (_0xEABC == "nodeline") {
                $("#panelName")["html"]("\u5c0f\u8282\u7ebf\u5c5e\u6027");
                var _0xDDA8 = $("rect[selected=\'selected\']")["attr"]("istart");
                var _0xDD2A = syms[_0xDDA8];
                if (_0xDD2A) {
                    var _0xD9EE = $("#source")["val"]();
                    var _0xF72E = _0xD9EE["substring"](_0xDD2A["istart"], _0xDD2A["iend"]);
                    if (_0xDD2A["bar_dotted"]) {
                        _0xF72E = "." + _0xF72E
                    }
                    ;$("#nodelineType")["val"](_0xF72E)
                }
                ;$(".panel-body.nodeline")["show"]()
            } else {
                if (_0xEABC == "tempo") {
                    $("#panelName")["html"]("\u901f\u5ea6\u5c5e\u6027");
                    $(".panel-body.speed")["show"]()
                } else {
                    if (_0xEABC == "staff") {
                        $("#panelName")["html"]("\u8c31\u4f8b\u5c5e\u6027");
                        $("#panelName")["click"]();
                        $(".panel-body.staff")["show"]()
                    } else {
                        if (_0xEABC == "text") {
                            $("#panelName")["html"]("\u6587\u672c\u5c5e\u6027");
                            $(".panel-body.text")["show"]()
                        } else {
                            if (_0xEABC == "slur") {
                                $("input[name=\'slurdirect\']")["prop"]("checked", false);
                                setSlurInfo();
                                $("#panelName")["html"]("\u8fde\u97f3\u7ebf\u5c5e\u6027");
                                $(".panel-body.slur")["show"]()
                            } else {
                                if (_0xEABC == "note") {
                                    $("#panelName")["html"]("\u97f3\u7b26\u5c5e\u6027");
                                    $(".panel-body.note")["show"]();
                                    $("input[name=\'stemdirect\']")["prop"]("checked", false);
                                    var _0xDDA8 = $(_0xF16A["target"])["attr"]("istart");
                                    var _0xDD2A = syms[_0xDDA8];
                                    if (_0xDD2A) {
                                        var _0xF788 = $(_0xF620)["attr"]("y");
                                        var _0xF776 = $(_0xF620)["parents"]("svg")["find"]("text[type=\'hd\']." + _0xDDA8 + ",text[type=\'Hd\']." + _0xDDA8 + ",text[type=\'HD\']." + _0xDDA8 + ",text[type=\'note\'][istart=\'" + _0xDDA8 + "\']")["sort"](function(_0xF8A8, _0xF8BA) {
                                            return $(_0xF8BA)["attr"]("y") - $(_0xF8A8)["attr"]("y")
                                        });
                                        var _0xF84E = -1;
                                        for (var _0xDCE2 = 0; _0xDCE2 < _0xF776["length"]; _0xDCE2++) {
                                            if (parseFloat(_0xF788) == parseFloat($(_0xF776[_0xDCE2])["attr"]("y"))) {
                                                _0xF84E = _0xDCE2
                                            }
                                        }
                                        ;if (_0xDD2A["type"] == 8 && _0xDD2A["notes"] && _0xF84E != -1 && _0xDD2A["notes"]["length"] > _0xF84E) {
                                            var _0xF740 = mypit2mid(_0xDD2A, _0xF84E);
                                            if (user["playNoteChangMing"]) {
                                                genNoteChangMing(_0xDD2A["istart"], $("#source")["val"]())
                                            } else {
                                                play_note(_0xF740, _0xDD2A["dur"])
                                            }
                                        }
                                        ;getNoteBgColor(_0xDD2A);
                                        var _0xF752 = getNoteSplText(_0xDD2A);
                                        var _0xF764 = getNoteSplTextMidi(_0xDD2A);
                                        $("#noteJpText")["val"](_0xF752);
                                        $("#noteJpTextMidi")["val"](_0xF764);
                                        if (_0xDD2A["my_key"]) {
                                            switchJiTaChord(_0xDD2A["my_key"]);
                                            swithchJianPu(_0xDD2A["my_key"])
                                        }
                                        ;if (_0xDD2A["type"] == 8 && !_0xF16A["ctrlKey"]) {
                                            var _0xF806 = _0xDD2A["dur"];
                                            var _0xF7F4 = $(".operator_sc[dur=\'" + _0xF806 + "\']");
                                            if (_0xF7F4["length"] > 0) {
                                                $(".operator_sc[dur=\'" + _0xF806 + "\']")["click"]()
                                            } else {
                                                var _0xF71C = 0;
                                                $["each"]($(".operator_sc[dur]"), function(_0xDCE2, _0xDEEC) {
                                                    var _0xF8CC = parseInt($(_0xDEEC)["attr"]("dur"));
                                                    if (_0xF8CC <= _0xF806 && _0xF8CC > _0xF71C) {
                                                        _0xF71C = _0xF8CC
                                                    }
                                                });
                                                console["log"]("matchDur:", _0xF71C);
                                                $(".operator_sc[dur=\'" + _0xF71C + "\']")["click"]();
                                                var _0xF7E2 = _0xF806 - _0xF71C;
                                                var _0xF7D0 = _0xF7E2 / _0xF71C;
                                                if (_0xF7D0 == 0.5) {
                                                    $(".dotstatus[value=\'3/\']")["click"]()
                                                } else {
                                                    if (_0xF7D0 == 0.75) {
                                                        $(".dotstatus [value=\'7//\']")["click"]()
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    ;$("#noteVol")["val"](1);
                                    var _0xF896 = getGch(_0xDD2A, "vol:");
                                    if (_0xF896 != "") {
                                        var _0xE606 = getGchInfo(_0xDD2A, _0xF896);
                                        var _0xF884 = _0xE606["text"]["replace"]("vol:", "");
                                        $("#noteVol")["val"](_0xF884)
                                    }
                                    ;$(".stemdir")["show"]();
                                    $(".notemove")["show"]();
                                    if (musicType == 2) {
                                        $(".stemdir")["hide"]();
                                        $(".notemove")["hide"]()
                                    }
                                } else {
                                    if (_0xEABC == "deco") {
                                        $("#panelName")["html"]("\u5c5e\u6027");
                                        $("input[type=\"radio\"][name=\"decodirect\"]")["prop"]("checked", "");
                                        var _0xDDA8 = $(selectDecoInfo)["attr"]("istart");
                                        if (!_0xDDA8) {
                                            _0xDDA8 = $(selectDecoInfo)["attr"]("start")
                                        }
                                        ;var _0xDD2A = syms[_0xDDA8];
                                        var _0xF656 = getA_ddInfo(_0xDD2A, $(selectDecoInfo)["attr"]("type"));
                                        if (_0xF656["length"] > 0) {
                                            var _0xF524 = _0xF656[0];
                                            $("#deconame")["val"](_0xF524["name"]);
                                            var _0xF668 = _0xDD2A["fermatatime"];
                                            if (!_0xF668) {
                                                _0xF668 = 1
                                            }
                                            ;$("#fermatatimeInput")["val"](_0xF668);
                                            $("#fermatatimediv")["show"]()
                                        } else {
                                            $("#fermatatimediv")["hide"]()
                                        }
                                        ;$(".panel-body.deco")["show"]()
                                    } else {
                                        if (_0xEABC == "gch") {
                                            $("#panelName")["html"]("\u5c5e\u6027");
                                            $(".panel-body.gch")["show"]();
                                            $("input[type=\"radio\"][name=\"gchdirect\"]")["prop"]("checked", "");
                                            $("#gchText")["val"]($(selectGchInfo)["html"]());
                                            $("#gchText")["attr"]("ori_val", $(selectGchInfo)["html"]());
                                            var _0xDDA8 = $(selectGchInfo)["attr"]("istart");
                                            $("#zsistart")["val"](_0xDDA8);
                                            var _0xDD2A = syms[_0xDDA8];
                                            if (_0xDD2A) {
                                                var _0xF6F8 = getGch(_0xDD2A, $(selectGchInfo)["html"]());
                                                if (!_0xF6F8) {
                                                    return
                                                }
                                                ;getGchCoorInfo(_0xF6F8);
                                                var _0xF6B0 = "14";
                                                if (_0xF6F8 && _0xF6F8["indexOf"]("[font-size:") > -1) {
                                                    var _0xF68C = /\[(font-size:.*)\]/["exec"](_0xF6F8);
                                                    if (_0xF68C != null) {
                                                        _0xF6B0 = /\[font-size:(.*)\]/["exec"](_0xF6F8)[1]
                                                    }
                                                }
                                                ;if (_0xF6B0 && _0xF6B0 != "") {
                                                    $("#gchfontsize")["val"](_0xF6B0)
                                                }
                                                ;var _0xF6C2 = _0xDD2A["a_gch"];
                                                var _0xF5A2 = "^";
                                                var _0xF69E = "";
                                                if (_0xF6C2) {
                                                    for (var _0xDCE2 = 0; _0xDCE2 < _0xF6C2["length"]; _0xDCE2++) {
                                                        if (_0xF6C2[_0xDCE2]["text"]["replace"](/[_^]/, "") == _0xF6F8["replace"](/[_^]/, "")) {
                                                            _0xF5A2 = _0xF6C2[_0xDCE2]["type"];
                                                            _0xF69E = _0xF6C2[_0xDCE2]["fonttype"]
                                                        }
                                                    }
                                                }
                                                ;if (_0xF5A2 == "" || _0xF5A2 == "g") {
                                                    _0xF5A2 = "^"
                                                }
                                                ;$("input[name=\'gchdirect\'][value=\'" + _0xF5A2 + "\']")["prop"]("checked", "checked");
                                                if (_0xF69E == "\u2206") {
                                                    $("input[name=\'gchfonttype\'][value=\'\u2206\']")["each"](function(_0xDCE2, _0xDEEC) {
                                                        $(this)["prop"]("checked", "checked")
                                                    })
                                                } else {
                                                    $("input[name=\'gchfonttype\'][value=\'\']")["each"](function(_0xDCE2, _0xDEEC) {
                                                        $(this)["prop"]("checked", "checked")
                                                    })
                                                }
                                            }
                                            ;var _0xF6D4 = $(selectGchInfo)["attr"]("gch_istart");
                                            $("rect[istart=\'" + _0xF6D4 + "\']")["remove"]();
                                            $(selectGchInfo)["attr"]("ori_x", $(selectGchInfo)["attr"]("x"));
                                            $(selectGchInfo)["attr"]("ori_y", $(selectGchInfo)["attr"]("y"));
                                            var _0xF79A = $(selectGchInfo)["parent"]();
                                            var _0xF7AC = $(_0xF79A)["parent"]();
                                            $(_0xF7AC)["append"](_0xF79A);
                                            if (!content_vue["attrPanelShow"]) {
                                                content_vue["attrPanelShow"] = !content_vue["attrPanelShow"];
                                                setTimeout(function() {
                                                    $("text[gch_istart=" + _0xF6D4 + "]")["attr"]("selected", "selected")["css"]("color", "red");
                                                    selectGchInfo = $("text[gch_istart=" + _0xF6D4 + "]")
                                                }, 500)
                                            }
                                            ;return true
                                        } else {
                                            if (_0xEABC == "rest") {
                                                $("#panelName")["html"]("\u4f11\u6b62\u7b26\u5c5e\u6027");
                                                $("input[type=\"radio\"][name=\"restsh\"]")["prop"]("checked", "");
                                                $(".panel-body.rest")["show"]()
                                            } else {
                                                if (_0xEABC == "bar") {
                                                    $("#panelName")["html"]("\u5c0f\u8282\u5c5e\u6027");
                                                    $("#barBgColorInput")["val"]("000000");
                                                    $("#barBgColorInput")["css"]("background-color", "rgb(0, 0, 0)");
                                                    $("input[name=\'barrestsh\']")["prop"]("checked", false);
                                                    getNodeBgColor();
                                                    getNodeWidth();
                                                    getNodeHeight();
                                                    getNodeDur();
                                                    $(".panel-body.bar")["show"]()
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
        }
    }
    ;if (_0xEABC == "staff") {
        $("#layoutPanel")["show"]();
        $("#panelName")["addClass"]("active");
        return
    }
    ;_0xF16A = _0xF16A || window["event"];
    if (_0xF16A && _0xF16A["stopPropagation"]) {
        _0xF16A["stopPropagation"]()
    } else {
        window["event"]["cancelBubble"] = true
    }
}
function setDecoStemDirect(_0xF590) {
    var _0xF524 = $("[cat=\'decos\'][selected=\'selected\'],.selected_text[cat=\'decos\']");
    var _0xF57E = $(_0xF524)["attr"]("type");
    var _0xF56C = "";
    if ($(_0xF524)["hasClass"]("fng")) {
        _0xF56C = _0xF57E + "";
        _0xF57E = "fng"
    }
    ;var _0xF56C = $(_0xF524);
    var _0xDDA8 = parseInt($(_0xF524)["attr"]("istart"));
    var _0xDD2A = syms[_0xDDA8];
    var _0xF55A = -1;
    var _0xF536 = -1;
    if (_0xDD2A) {
        var _0xE552 = getA_ddInfo(_0xDD2A, _0xF57E);
        if (_0xE552["length"] == 1) {
            var _0xF548 = _0xE552[0];
            _0xF55A = _0xF548["istart"];
            _0xF536 = _0xF548["iend"]
        } else {
            if (_0xE552["length"] > 1) {
                for (var _0xDCE2 = 0; _0xDCE2 < _0xE552["length"]; _0xDCE2++) {
                    var _0xF548 = _0xE552[_0xDCE2];
                    if (_0xF548["str"] == _0xF56C) {
                        _0xF55A = _0xF548["istart"];
                        _0xF536 = _0xF548["iend"]
                    }
                }
            }
        }
    }
    ;var _0xF5C6 = "up";
    if (_0xF590 == "up") {
        _0xF5C6 = "down"
    }
    ;var _0xF5A2 = "[I:pos type " + _0xF590 + "]";
    var _0xF5D8 = "[I:pos type " + _0xF5C6 + "]";
    var _0xF500 = "[I:pos type auto]";
    switch (_0xF57E) {
    case "p":
        ;
    case "pp":
        ;
    case "ppp":
        ;
    case "pppp":
        ;
    case "f":
        ;
    case "ff":
        ;
    case "fff":
        ;
    case "ffff":
        ;
    case "mp":
        ;
    case "mf":
        ;
    case "sf":
        ;
    case "sfz":
        ;
    case "sfp":
        ;
    case "fp":
        ;
    case "fz":
        ;
    case "rit":
        ;
    case "accel":
        _0xF5A2 = _0xF5A2["replace"]("type", "vol");
        _0xF5D8 = _0xF5D8["replace"]("type", "vol");
        _0xF500 = _0xF500["replace"]("type", "vol");
        break;
    case "dnb":
        ;
    case "invertedturn":
        ;
    case "hld":
        ;
    case "marcato":
        ;
    case "accent":
        ;
    case "stc":
        ;
    case "emb":
        ;
    case "opend":
        ;
    case "umrd":
        ;
    case "lmrd":
        ;
    case "0":
        ;
    case "1":
        ;
    case "2":
        ;
    case "3":
        ;
    case "4":
        ;
    case "5":
        ;
    case "img":
        _0xF5A2 = _0xF5A2["replace"]("type", "orn");
        _0xF5D8 = _0xF5D8["replace"]("type", "orn");
        _0xF500 = _0xF500["replace"]("type", "orn");
        break;
    case "jq":
        ;
    case "jr":
        _0xDDA8 = $(_0xF524)["attr"]("start");
        _0xF5A2 = _0xF5A2["replace"]("type", "dyn");
        _0xF5D8 = _0xF5D8["replace"]("type", "dyn");
        _0xF500 = _0xF500["replace"]("type", "dyn");
        break;
    case "slur":
        break
    }
    ;var _0xD9EE = $("#source")["val"]();
    var _0xF134 = "";
    if (_0xF57E["indexOf"]("wedge") == 0) {
        _0xDDA8 = $(_0xF524)["attr"]("istart");
        _0xDD2A = syms[_0xDDA8];
        if (_0xDD2A) {
            var _0xF512 = getA_ddInfo(_0xDD2A, _0xF57E);
            if (_0xF590 == "up") {
                _0xF134 = replaceLast(_0xD9EE["substring"](0, _0xDD2A["istart"]), "!" + _0xF57E + "!", "") + "!wedgeup!" + _0xD9EE["substring"](_0xDD2A["istart"])
            } else {
                if (_0xF590 == "down") {
                    _0xF134 = replaceLast(_0xD9EE["substring"](0, _0xDD2A["istart"]), "!" + _0xF57E + "!", "") + "!wedgedown!" + _0xD9EE["substring"](_0xDD2A["istart"])
                } else {
                    if (_0xF590 == "auto") {
                        _0xF134 = replaceLast(_0xD9EE["substring"](0, _0xDD2A["istart"]), "!" + _0xF57E + "!", "") + "!wedge!" + _0xD9EE["substring"](_0xDD2A["istart"])
                    }
                }
            }
        }
    } else {
        var _0xF5B4 = -1;
        for (var _0xDCE2 = _0xDDA8 - 1; _0xDCE2 > 0; _0xDCE2--) {
            var _0xDD2A = syms[_0xDCE2];
            if (_0xDD2A) {
                _0xF5B4 = _0xDD2A["istart"]
            }
        }
        ;var _0xF5EA = _0xD9EE["substring"](_0xF5B4, _0xDDA8);
        _0xF5EA = _0xF5EA["replace"](_0xF5D8, "")["replace"](_0xF5A2, "")["replace"](_0xF500, "");
        _0xF134 = _0xD9EE["substring"](0, _0xF5B4) + _0xF5EA + _0xF5A2 + _0xD9EE["substring"](_0xDDA8)
    }
    ;$("#source")["val"](_0xF134);
    src_change();
    doLog()
}
function getF3ChordString(_0xE150, _0xDF7C) {
    return f3_chord[_0xDF7C][_0xE150]
}
function gen37ChordString(_0xE09C, _0xE0AE, _0xE150, _0xDF7C) {
    if ("f3" == _0xE09C) {
        var _0xE294 = getF3ChordString(_0xE150, _0xDF7C);
        var _0xE12C = getModeChangeNote(_0xDF7C);
        return _0xE294
    }
    ;var _0xE078 = 40;
    var _0xE270 = 60;
    var _0xE1F2 = ["C,,", "D,,", "E,,", "F,,", "G,,", "A,,", "B,,", "C,", "D,", "E,", "F,", "G,", "A,", "B,", "C", "D", "E", "F", "G", "A", "B"];
    var _0xE24C = [36, 38, 40, 41, 53, 45, 47, 48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71];
    var _0xE25E = -1;
    if (_0xDF7C != "") {
        _0xE25E = _0xE1F2["indexOf"](_0xDF7C["substring"](0, 1) + ",")
    }
    ;var _0xE0C0 = "";
    if (_0xE0AE["split"]("-")["length"] > 1) {
        _0xE0C0 = _0xE0AE["split"]("-")[1]
    }
    ;var _0xE0E4 = "";
    var _0xE0F6 = "_";
    if (_0xE0C0 == "hsdd") {
        _0xE0E4 = _0xE1F2[_0xE25E + 5]["replace"](",", "");
        var _0xE13E = getModeChangeNote(_0xDF7C);
        if (_0xE13E["type"] == "up" && _0xE13E["val"]["indexOf"](_0xE0E4) > -1) {
            _0xE0F6 = "="
        } else {
            if (_0xE13E["type"] == "down" && _0xE13E["val"]["indexOf"](_0xE0E4) > -1) {
                _0xE0F6 = "__"
            }
        }
    }
    ;if (_0xE0C0 == "zrxd") {
        _0xE25E -= 2
    }
    ;var _0xE108 = "";
    var _0xE11A = "^";
    if (_0xE0C0 == "hsxd") {
        _0xE25E -= 2;
        _0xE108 = _0xE1F2[_0xE25E + 6]["replace"](",", "");
        var _0xE13E = getModeChangeNote(_0xDF7C);
        if (_0xE13E["type"] == "up" && _0xE13E["val"]["indexOf"](_0xE108) > -1) {
            _0xE0F6 = "^^"
        } else {
            if (_0xE13E["type"] == "down" && _0xE13E["val"]["indexOf"](_0xE108) > -1) {
                _0xE0F6 = "="
            }
        }
    }
    ;_0xE25E += parseInt(_0xE150);
    var _0xE174 = 0;
    var _0xE198 = 0;
    var _0xE1BC = 0;
    if (_0xE0AE["indexOf"]("yuanwei") == 0) {} else {
        if (_0xE0AE["indexOf"]("zhuangwei1") == 0) {
            _0xE174 = 7
        } else {
            if (_0xE0AE["indexOf"]("zhuangwei2") == 0) {
                _0xE174 = 7;
                _0xE198 = 7
            } else {
                if (_0xE0AE["indexOf"]("zhuangwei3") == 0) {
                    _0xE174 = 7;
                    _0xE198 = 7;
                    _0xE1BC = 7
                }
            }
        }
    }
    ;while ((_0xE25E + 6) > 20 || (_0xE25E + _0xE174) > 20 || (_0xE25E + _0xE198 + 2) > 20 || (_0xE25E + _0xE1BC + 4) > 20) {
        _0xE25E -= 7
    }
    ;var _0xE162 = _0xE1F2[_0xE25E + _0xE174];
    var _0xE186 = _0xE1F2[_0xE25E + _0xE198 + 2];
    var _0xE1AA = _0xE1F2[_0xE25E + _0xE1BC + 4];
    var _0xE1CE = "";
    var _0xE1E0 = 3;
    var _0xE204 = _0xE24C[_0xE25E + _0xE174];
    var _0xE216 = _0xE24C[_0xE25E + _0xE198 + 2];
    var _0xE228 = _0xE24C[_0xE25E + _0xE1BC + 4];
    var _0xE23A = _0xE24C[_0xE25E + 6];
    var _0xE282 = _0xE204 + _0xE216 + _0xE228;
    if (_0xE09C == 7) {
        _0xE1E0 = 4;
        _0xE282 += _0xE23A
    }
    ;var _0xE066 = _0xE282 / _0xE1E0;
    var _0xE0D2 = "";
    if (_0xE066 > _0xE270) {
        _0xE0D2 = ","
    } else {
        var _0xE08A = _0xE066 - 12;
        if ((_0xE08A - _0xE078) >= (_0xE270 - _0xE066)) {
            _0xE0D2 = ","
        }
    }
    ;if (_0xE09C == 7) {
        _0xE1CE = _0xE1F2[_0xE25E + 6] + _0xE0D2
    }
    ;var _0xDA5A = "";
    if (_0xE0AE["indexOf"]("yuanwei") == 0) {
        _0xDA5A = _0xE162 + _0xE0D2 + _0xE186 + _0xE0D2 + _0xE1AA + _0xE0D2 + _0xE1CE
    } else {
        if (_0xE0AE["indexOf"]("zhuangwei1") == 0) {
            _0xDA5A = _0xE186 + _0xE0D2 + _0xE1AA + _0xE0D2 + _0xE1CE + _0xE162 + _0xE0D2
        } else {
            if (_0xE0AE["indexOf"]("zhuangwei2") == 0) {
                _0xDA5A = _0xE1AA + _0xE0D2 + _0xE1CE + _0xE162 + _0xE0D2 + _0xE186 + _0xE0D2
            } else {
                if (_0xE0AE["indexOf"]("zhuangwei3") == 0) {
                    _0xDA5A = _0xE1CE + _0xE162 + _0xE0D2 + _0xE186 + _0xE0D2 + _0xE1AA + _0xE0D2
                }
            }
        }
    }
    ;if (_0xE0E4 != "") {
        _0xDA5A = _0xDA5A["replace"](_0xE0E4, _0xE0F6 + _0xE0E4)
    }
    ;if (_0xE108 != "") {
        _0xDA5A = _0xDA5A["replace"](_0xE108, _0xE11A + _0xE108)
    }
    ;return _0xDA5A
}
function test37(_0xE0C0, _0xDF7C) {
    $["each"]($("#chordLevel option"), function(_0xDE02, _0xF902) {
        var _0xE552 = [];
        var _0xE150 = parseInt($(_0xF902)["attr"]("level")) - 1;
        var _0xE738 = "yuanwei";
        var _0xE74A = "zhuangwei1";
        var _0xE75C = "zhuangwei2";
        var _0xE76E = "zhuangwei3";
        if (_0xE0C0 != "") {
            _0xE738 += "-" + _0xE0C0;
            _0xE74A += "-" + _0xE0C0;
            _0xE75C += "-" + _0xE0C0;
            _0xE76E += "-" + _0xE0C0
        }
        ;_0xE552["push"](gen37ChordString(3, _0xE738, _0xE150, _0xDF7C));
        _0xE552["push"](gen37ChordString(3, _0xE74A, _0xE150, _0xDF7C));
        _0xE552["push"](gen37ChordString(3, _0xE75C, _0xE150, _0xDF7C));
        _0xE552["push"](gen37ChordString(7, _0xE738, _0xE150, _0xDF7C));
        _0xE552["push"](gen37ChordString(7, _0xE74A, _0xE150, _0xDF7C));
        _0xE552["push"](gen37ChordString(7, _0xE75C, _0xE150, _0xDF7C));
        _0xE552["push"](gen37ChordString(7, _0xE76E, _0xE150, _0xDF7C));
        console["log"](_0xE552[0] + "\x0A" + _0xE552[1] + "\x0A" + _0xE552[2] + "\x0A" + _0xE552[3] + "\x0A" + _0xE552[4] + "\x0A" + _0xE552[5] + "\x0A" + _0xE552[6] + "\x0A" + $(_0xF902)["attr"]("type") + "\u7ea7**********************")
    });
    console["log"]("----------------------------")
}
function getChordLyric(_0xDF7C, _0xDF22, _0xE0C0) {
    if (!_0xE0C0) {
        _0xE0C0 = ""
    }
    ;console["log"]("noteStr", _0xDF22);
    var _0xE780 = ["\u2160", "\u2161", "\u2162", "\u2163", "\u2164", "\u2165", "\u2166"];
    var _0xE726 = /[a-gA-G]/g;
    var _0xDA36 = _0xDF22["match"](_0xE726);
    var _0xE714 = 0;
    if (_0xDA36 != null) {
        _0xE714 = _0xDA36["length"]
    }
    ;for (var _0xDCE2 = 0; _0xDCE2 < 7; _0xDCE2++) {
        var _0xE150 = _0xDCE2;
        var _0xE738 = "yuanwei";
        var _0xE74A = "zhuangwei1";
        var _0xE75C = "zhuangwei2";
        var _0xE76E = "zhuangwei3";
        if (_0xE0C0 != "") {
            _0xE738 += "-" + _0xE0C0;
            _0xE74A += "-" + _0xE0C0;
            _0xE75C += "-" + _0xE0C0;
            _0xE76E += "-" + _0xE0C0
        }
        ;var _0xDA5A = "";
        if (_0xE714 == 3) {
            _0xDA5A = gen37ChordString(3, _0xE738, _0xE150, _0xDF7C);
            if (_0xDA5A == _0xDF22) {
                return _0xE780[_0xDCE2] + chordCategorySetting[3][_0xE738["split"]("-")[0]]
            }
            ;_0xDA5A = gen37ChordString(3, _0xE74A, _0xE150, _0xDF7C);
            if (_0xDA5A == _0xDF22) {
                return _0xE780[_0xDCE2] + chordCategorySetting[3][_0xE74A["split"]("-")[0]]
            }
            ;_0xDA5A = gen37ChordString(3, _0xE75C, _0xE150, _0xDF7C);
            if (_0xDA5A == _0xDF22) {
                return _0xE780[_0xDCE2] + chordCategorySetting[3][_0xE75C["split"]("-")[0]]
            }
        } else {
            if (_0xE714 == 4) {
                _0xDA5A = gen37ChordString(7, _0xE738, _0xE150, _0xDF7C);
                if (_0xDA5A == _0xDF22) {
                    return _0xE780[_0xDCE2] + chordCategorySetting[7][_0xE738["split"]("-")[0]]
                }
                ;_0xDA5A = gen37ChordString(7, _0xE74A, _0xE150, _0xDF7C);
                if (_0xDA5A == _0xDF22) {
                    return _0xE780[_0xDCE2] + chordCategorySetting[7][_0xE74A["split"]("-")[0]]
                }
                ;_0xDA5A = gen37ChordString(7, _0xE75C, _0xE150, _0xDF7C);
                if (_0xDA5A == _0xDF22) {
                    return _0xE780[_0xDCE2] + chordCategorySetting[7][_0xE75C["split"]("-")[0]]
                }
                ;_0xDA5A = gen37ChordString(7, _0xE76E, _0xE150, _0xDF7C);
                if (_0xDA5A == _0xDF22) {
                    return _0xE780[_0xDCE2] + chordCategorySetting[7][_0xE76E["split"]("-")[0]]
                }
            }
        }
    }
}
function noteDurMove(_0xF122) {
    if ($(".selected_text")["length"] > 0 || $(".select_text_g")["length"] > 0) {
        var _0xDDA8 = -1;
        if ($(".selected_text")["length"] > 0) {
            _0xDDA8 = $(".selected_text")["attr"]("istart")
        } else {
            if ($(".select_text_g")["length"] > 0) {
                _0xDDA8 = $("g[istart]")["attr"]("istart")
            }
        }
        ;if (_0xDDA8 == -1) {
            return false
        }
        ;var _0xDD2A = syms[_0xDDA8];
        var _0xD9EE = $("#source")["val"]();
        update_note_index = 0;
        update_note_istart = _0xDDA8;
        var _0xE40E = _0xD9EE["substring"](_0xDD2A["istart"], _0xDD2A["iend"]);
        var _0xF146 = _0xDD2A["dur"];
        if (_0xF122 == -1) {
            _0xF146 = _0xF146 / 2
        } else {
            if (_0xF122 == 1) {
                _0xF146 = _0xF146 * 2
            }
        }
        ;var _0xE834 = _0xDD2A["my_ulen"];
        if (!_0xE834) {
            _0xE834 = _0xDD2A["p_v"]["ulen"]
        }
        ;var _0xF158 = _0xE40E["replace"](/[\/\d]/g, "") + getDurStrByNoteDur(_0xF146, _0xE834);
        console["log"]("newNoteStr:", _0xF158);
        var _0xF134 = _0xD9EE["substring"](0, _0xDD2A["istart"]) + _0xF158 + _0xD9EE["substring"](_0xDD2A["iend"]);
        $("#source")["val"](_0xF134);
        src_change();
        doLog();
        return true
    }
}
function getStandData_Test() {
    var _0xEEBE = ["do", "re", "mi", "fa", "sol", "la", "si"];
    var _0xEEE2 = getNoteData();
    if (_0xEEE2 == undefined || _0xEEE2["length"] == 0) {
        return ""
    }
    ;var _0xE552 = [];
    var _0xEED0 = editSplnum["delay"]["time"];
    _0xEEE2["forEach"](function(_0xDEEC) {
        if (_0xDEEC[1] >= _0xEED0 && _0xDEEC[0] > -1) {
            var _0xEF06 = {};
            _0xEF06["time"] = (_0xDEEC[1] - _0xEED0)["toFixed"](6);
            _0xEF06["pitch"] = _0xDEEC[3];
            _0xEF06["dur"] = _0xDEEC[4];
            var _0xDDA8 = _0xDEEC[0];
            var _0xDD2A = syms[_0xDDA8];
            if (_0xDD2A) {
                var _0xEEF4 = _0xDD2A["a_dd"];
                if (_0xEEF4 != null) {
                    for (var _0xDCE2 = 0; _0xDCE2 < _0xEEF4["length"]; _0xDCE2++) {
                        var _0xE792 = _0xEEF4[_0xDCE2];
                        if (_0xEEBE["indexOf"](_0xE792["glyph"]) > -1) {
                            _0xEF06["lyric"] = _0xE792["glyph"];
                            break
                        }
                    }
                }
            }
            ;_0xE552["push"](_0xEF06)
        }
    });
    return JSON["stringify"](_0xE552)
}
function getStandData_Test3() {
    var _0xEEBE = ["doe", "ray", "me", "far", "sew", "la", "sea"];
    var _0xEEE2 = getNoteData();
    if (_0xEEE2 == undefined || _0xEEE2["length"] == 0) {
        return ""
    }
    ;var _0xE552 = [];
    var _0xE822 = "";
    var _0xEED0 = editSplnum["delay"]["time"];
    _0xEEE2["forEach"](function(_0xDEEC) {
        if (_0xDEEC[1] >= _0xEED0 && _0xDEEC[0] > -1) {
            var _0xEF06 = {};
            _0xEF06["time"] = (_0xDEEC[1] - _0xEED0)["toFixed"](6);
            _0xEF06["pitch"] = _0xDEEC[3];
            _0xEF06["dur"] = _0xDEEC[4];
            var _0xDDA8 = _0xDEEC[0];
            var _0xDD2A = syms[_0xDDA8];
            if (_0xDD2A) {
                var _0xEEF4 = _0xDD2A["a_dd"];
                if (_0xEEF4 != null) {
                    for (var _0xDCE2 = 0; _0xDCE2 < _0xEEF4["length"]; _0xDCE2++) {
                        var _0xE792 = _0xEEF4[_0xDCE2];
                        if (_0xEEBE["indexOf"](_0xE792["glyph"]) > -1) {
                            _0xEF06["lyric"] = _0xE792["glyph"];
                            _0xE822 += _0xE792["glyph"] + " ";
                            break
                        }
                    }
                }
            }
            ;_0xE552["push"](_0xEF06)
        }
    });
    return _0xE822
}
function getStandDataWithLyric_Test2() {
    var _0xEEBE = ["do", "re", "mi", "fa", "sol", "la", "si"];
    var _0xEEE2 = getNoteData();
    if (_0xEEE2 == undefined || _0xEEE2["length"] == 0) {
        return ""
    }
    ;var _0xE552 = [];
    var _0xEED0 = editSplnum["delay"]["time"];
    _0xEEE2["forEach"](function(_0xDEEC) {
        if (_0xDEEC[1] >= _0xEED0 && _0xDEEC[0] > -1) {
            var _0xEF06 = {};
            _0xEF06["time"] = (_0xDEEC[1] - _0xEED0)["toFixed"](6);
            _0xEF06["pitch"] = _0xDEEC[3];
            _0xEF06["dur"] = _0xDEEC[4];
            var _0xDDA8 = _0xDEEC[0];
            var _0xDD2A = syms[_0xDDA8];
            if (_0xDD2A) {
                var _0xEF18 = _0xDD2A["a_ly"];
                if (_0xEF18 != null) {
                    for (var _0xDCE2 = 0; _0xDCE2 < _0xEF18["length"]; _0xDCE2++) {
                        var _0xDD18 = _0xEF18[_0xDCE2];
                        if (_0xDD18) {
                            _0xEF06["lyric"] = _0xDD18["t"]["replace"](/\[.*\]/, "")["replace"](/\d/g, "")["replace"](/\./, "");
                            break
                        }
                    }
                }
            }
            ;_0xE552["push"](_0xEF06)
        }
    });
    return JSON["stringify"](_0xE552)
}
function playOneNoteByIstart(_0xF29C) {
    _0xF29C = $["extend"]({
        sourceId: "source",
        istart: "",
        noteData: null
    }, _0xF29C);
    var _0xDDA8 = _0xF29C["istart"];
    var _0xE6A8 = _0xF29C["noteData"];
    if (_0xE6A8 == null) {
        _0xE6A8 = getNoteData()
    }
    ;var _0xF266 = $("#" + _0xF29C["sourceId"])["val"]();
    var _0xF278 = getL(_0xF266);
    var _0xE2CA = getStaffInfo(_0xF29C["sourceId"]);
    var _0xE696;
    var _0xF28A;
    for (var _0xDCE2 = 0, _0xDE26 = _0xE6A8["length"]; _0xDCE2 < _0xDE26; _0xDCE2++) {
        _0xE696 = _0xE6A8[_0xDCE2];
        if (_0xE696[0] == _0xDDA8) {
            _0xF28A = _0xE696[3];
            play_one_note(_0xF28A, _0xF278, _0xE2CA["speed"]["meter"]["top"] + "/" + _0xE2CA["speed"]["meter"]["bot"], _0xE2CA["speed"]["val"], null, _0xE696[2]);
            break
        }
    }
    ;if (!_0xF28A) {
        console["error"]("\u5355\u97f3\u64ad\u653e\u5931\u8d25\uff0c\u627e\u4e0d\u5230\u5bf9\u5e94\u7684\u6570\u636e\uff0c\u53ef\u80fd\u662f\u4f11\u6b62\u7b26", _0xF29C)
    }
}
function checkScorePitch(_0xDDA8) {
    var _0xDD2A = syms[_0xDDA8];
    if (!_0xDD2A) {
        return "none"
    }
    ;if (!_0xDD2A["a_ly"]) {
        return "none"
    }
    ;if (_0xDD2A["a_stk"]) {
        return "rhythm,whole,feeling"
    }
    ;if (_0xDD2A["is_ext"] || _0xDD2A["is_ext2"]) {
        return "rhythm,whole,feeling"
    }
    ;return "all"
}
function genChangMingAbc(_0xD9EE, _0xE50A, _0xE35A) {
    if (!_0xE50A) {
        _0xE50A = 0
    }
    ;var _0xE49E = -1;
    var _0xE300 = getNoteData();
    var _0xDC76 = "";
    var _0xE48C = "";
    var _0xE3D8 = "w:";
    var _0xE432 = ["", "doe", "ray", "me", "far", "sew", "la", "sea"];
    var _0xE324 = -2;
    var _0xE51C = /x[0-9]{1,2}/;
    if (_0xE300 != null) {
        var _0xE390 = "";
        var _0xE3A2 = -1;
        var _0xE348 = 0;
        var _0xE37E = -1;
        for (var _0xDCE2 = 0; _0xDCE2 < _0xE300["length"]; _0xDCE2++) {
            var _0xDDA8 = _0xE300[_0xDCE2][0];
            var _0xE3FC = _0xE300[_0xDCE2][3];
            var _0xDD2A = syms[_0xDDA8];
            if (!_0xDD2A && _0xE3FC == 0) {
                if (_0xE49E == -1) {
                    continue
                } else {
                    var _0xE52E = null;
                    for (var _0xDCAC = 0; _0xDCAC < x_syms["length"]; _0xDCAC++) {
                        if (x_syms[_0xDCAC]["istart"] == _0xDDA8) {
                            _0xE52E = x_syms[_0xDCAC]
                        }
                    }
                    ;if (_0xE52E && _0xE52E["v"] != _0xE50A) {
                        continue
                    }
                    ;var _0xDE6E = _0xE51C["exec"](_0xD9EE["substring"](_0xDDA8));
                    if (_0xDE6E && _0xDE6E["length"] > 0) {
                        var _0xE540 = _0xDE6E[0];
                        if (_0xE52E["prev"] && _0xE52E["prev"]["type"] == 6) {
                            _0xE48C += _0xD9EE["substring"](_0xE52E["prev"]["istart"], _0xE52E["prev"]["iend"])
                        }
                        ;_0xE48C += _0xE540;
                        if (_0xE52E["next"] && _0xE52E["next"]["type"] == 0) {
                            _0xE48C += "|"
                        }
                    }
                }
                ;continue
            }
            ;if (_0xDD2A && _0xDD2A["v"] != _0xE50A) {
                continue
            }
            ;if (_0xE37E == _0xDDA8) {
                continue
            }
            ;if (_0xDD2A) {
                if (_0xE49E == -1) {
                    _0xE49E = _0xDDA8;
                    if (_0xDD2A["grace"]) {
                        _0xDC76 = _0xD9EE["substring"](0, _0xE49E);
                        _0xDC76 = _0xD9EE["substring"](0, _0xDC76["lastIndexOf"]("{"))
                    } else {
                        _0xDC76 = _0xD9EE["substring"](0, _0xE49E)
                    }
                    ;if (has_weak_node && _0xDD2A) {
                        var _0xE2EE = 1536 * _0xDD2A["my_meter"][0]["top"] / _0xDD2A["my_meter"][0]["bot"] - weak_node_dur;
                        var _0xE3B4 = getDurStrByNoteDur(_0xE2EE, _0xDD2A["my_ulen"]);
                        _0xDC76 = _0xDC76 + "z" + _0xE3B4
                    }
                }
            }
            ;if (_0xDD2A) {
                if (_0xDD2A["grace"]) {
                    continue
                }
                ;var _0xE312 = false;
                var _0xDF22 = _0xD9EE["substring"](_0xDD2A["istart"], _0xDD2A["iend"]);
                if (_0xE312) {
                    var _0xE336 = _0xDD2A;
                    var _0xE3EA = _0xDD2A["next"];
                    while (_0xE3EA) {
                        if (_0xE3EA["type"] == 0) {
                            if (_0xE3EA["next"] && _0xE3EA["next"]["ti2"]) {
                                _0xE3EA = _0xE3EA["next"];
                                continue
                            } else {
                                _0xE336 = _0xE3EA["prev"];
                                break
                            }
                        }
                        ;if (_0xE3EA["type"] == 10) {
                            _0xE336 = null;
                            break
                        }
                        ;if (_0xE3EA["type"] == 8) {
                            if (_0xE3EA["a_ly"]) {
                                _0xE336 = _0xE3EA["prev"];
                                break
                            }
                        }
                        ;_0xE3EA = _0xE3EA["next"]
                    }
                    ;if (_0xE336 != null) {
                        _0xE324 = _0xE336["istart"]
                    }
                }
                ;var _0xE3B4 = "";
                if (_0xDD2A["in_tuplet"]) {
                    var _0xE4F8 = _0xD9EE["substring"](_0xDD2A["istart"] - 2, _0xDD2A["istart"]);
                    if (/\(\d/["exec"](_0xE4F8)) {
                        _0xDF22 = _0xE4F8 + _0xDF22
                    }
                } else {
                    if (_0xDF22["indexOf"]("-") > -1) {} else {
                        _0xDF22 = _0xDF22["replace"](/[\{\}\(\)]/g, "")["replace"](/\d/g, "")["replace"](/[/]/g, "");
                        _0xE3B4 = getDurStrByNoteDur(_0xDD2A["dur"], _0xDD2A["my_ulen"]);
                        if (_0xE3B4 == "1") {
                            _0xE3B4 = ""
                        }
                    }
                }
                ;if (_0xE35A) {
                    _0xDF22 = _0xDF22["replace"](/[a-gA-G]/, "B")
                }
                ;_0xDF22 = _0xDF22 + _0xE3B4;
                if (_0xDD2A["type"] == 8 || _0xDD2A["type"] == 10) {
                    if (_0xE390 != "" && _0xE390 != _0xDD2A["my_key"]) {
                        _0xE48C += "[K:" + _0xDD2A["my_key"] + "]"
                    }
                    ;if (_0xE3A2 != -1 && _0xE3A2 != _0xDD2A["my_tempo"]) {
                        var _0xE47A = decimalsToFractional(_0xDD2A["my_tempo_notes"][0] / 1536);
                        _0xE48C += "[Q:" + _0xE47A + "=" + _0xDD2A["my_tempo"] + "]"
                    }
                }
                ;if (_0xDD2A["prev"] && _0xDD2A["prev"]["type"] == 6 && _0xDD2A["time"] != 0) {
                    _0xE48C += _0xD9EE["substring"](_0xDD2A["prev"]["istart"], _0xDD2A["prev"]["iend"])
                }
                ;var _0xE40E = _0xDF22 + "";
                if (_0xE324 == _0xDD2A["istart"]) {
                    _0xDF22 = _0xD9EE["substring"](_0xDD2A["istart"], _0xDD2A["iend"]);
                    var _0xE4D4 = _0xDF22["replace"](/[\{\}\(\)]/g, "")["replace"](/\d/g, "")["replace"](/[/]/g, "");
                    var _0xE4C2 = getDurStrByNoteDur(_0xDD2A["dur"] - 24, _0xDD2A["my_ulen"]);
                    var _0xE456 = "z";
                    var _0xE444 = getDurStrByNoteDur(24, _0xDD2A["my_ulen"]);
                    _0xDF22 = _0xE4D4 + _0xE4C2 + _0xE456 + _0xE444
                }
                ;_0xE48C += _0xDF22;
                if (_0xDD2A["next"] && _0xDD2A["next"]["type"] == 0) {
                    _0xE48C += "|"
                }
                ;var _0xE4B0 = "";
                if (_0xDD2A["tie_s"]) {
                    var _0xE4E6 = _0xDD2A["tie_s"];
                    while (_0xE4E6) {
                        _0xE48C += _0xD9EE["substring"](_0xE4E6["istart"], _0xE4E6["iend"])["replace"](/[\{\}\(\)]/g, "");
                        if (_0xE4E6["next"] && _0xE4E6["next"]["type"] == 0) {
                            _0xE48C += "|"
                        }
                        ;_0xE4B0 += "* ";
                        _0xE37E = _0xE4E6["istart"];
                        _0xE4E6 = _0xE4E6["tie_s"]
                    }
                }
                ;if (_0xDD2A["type"] == 8) {
                    if (_0xDD2A["slur_istart"]) {
                        _0xE3D8 += "* "
                    } else {
                        var _0xE468 = _0xDD2A["my_key"];
                        var _0xE36C = _0xDD2A["my_k_sf"];
                        var _0xE420 = /[h-yH-Y]/;
                        if (_0xE420["test"](_0xE40E)) {
                            var _0xE3C6 = "da";
                            _0xE3D8 += _0xE3C6 + " " + _0xE4B0
                        } else {
                            var _0xDA48 = "";
                            if (isFixedMode) {
                                var _0xDAC6 = getStaffKey();
                                if (_0xDAC6) {
                                    _0xDA48 = getFixedCMByShiftKey(_0xDAC6["value"], _0xDD2A["notes"][0]["midi"])
                                }
                            } else {
                                _0xDA48 = getSimpleNameByKAndStaff(keyTransfer[_0xE36C]["value"], _0xE40E["replaceAll"](/[\/0-9\(\)\-]/, ""), _0xD9EE)
                            }
                            ;var _0xE3C6 = _0xE432[parseInt((_0xDA48 + "")["replaceAll"](/[\,\=\^\_\']/, ""))];
                            if (_0xE35A) {
                                _0xE3C6 = "da"
                            }
                            ;_0xE3D8 += _0xE3C6 + " " + _0xE4B0
                        }
                    }
                } else {
                    if (_0xDD2A["type"] == 10) {
                        var _0xE468 = _0xDD2A["my_key"];
                        var _0xE36C = _0xDD2A["my_k_sf"];
                        var _0xE420 = /[h-yH-Y]/;
                        if (_0xE420["test"](_0xE40E)) {
                            var _0xE3C6 = "da";
                            _0xE3D8 += _0xE3C6 + " " + _0xE4B0
                        }
                    }
                }
                ;if (_0xDD2A["type"] == 8 || _0xDD2A["type"] == 10) {
                    _0xE390 = _0xDD2A["my_key"];
                    _0xE3A2 = _0xDD2A["my_tempo"]
                }
            }
        }
    }
    ;var _0xDA5A = _0xDC76["replace"](/w:.*\n/g, "")["replaceAll"](/\(/, "") + _0xE48C["replaceAll"](/[mhn]/g, "B") + "\x0A" + _0xE3D8 + "\x0A";
    return _0xDA5A
}
function checkBreathByLyric(_0xDD2A) {
    if (_0xDD2A["a_ly"]) {
        var _0xDD18 = _0xDD2A["a_ly"][0];
        if (_0xDD18) {
            var _0xDD3C = _0xDD18["t"];
            if (_0xDD3C["length"] > 1) {
                _0xDD3C = _0xDD3C["substr"](_0xDD3C["length"] - 1, 1)
            }
            ;if (_0xDD3C["indexOf"](",") > -1 || _0xDD3C["indexOf"]("\uff0c") > -1 || _0xDD3C["indexOf"](".") > -1 || _0xDD3C["indexOf"]("\u3002") > -1 || _0xDD3C["indexOf"](";") > -1 || _0xDD3C["indexOf"]("\uff1b") > -1 || _0xDD3C["indexOf"]("\uff01") > -1 || _0xDD3C["indexOf"]("!") > -1) {
                return true
            }
        }
    }
    ;return false
}
function genChangMing() {
    var _0xD9EE = $("#source")["val"]();
    var _0xE2CA = getStaffInfo();
    if (_0xD9EE["indexOf"]("perc stafflines=1") > -1) {
        console["log"]("\u8282\u594f\u8c31\u4e0d\u80fd\u751f\u6210\u5531\u540d");
        return
    }
    ;var _0xE2B8 = $("#groupid")["val"]();
    if (_0xE2CA["vocalCount"] > 1) {
        console["log"]("\u5927\u4e8e\u4e00\u4e2a\u58f0\u90e8\u7684\uff0c\u6bcf\u4e2a\u58f0\u90e8\u751f\u6210\u4e00\u4e2a");
        for (var _0xDCE2 = 0; _0xDCE2 < _0xE2CA["vocalCount"]; _0xDCE2++) {
            var _0xE2A6 = genChangMingAbc(_0xD9EE, _0xDCE2);
            var _0xE2DC = genNewStaffByV(_0xE2A6, _0xDCE2);
            console["log"]("voiceContent:", _0xE2DC);
            sendChangMingContent2Server(_0xE2DC, "", _0xE2B8, null, _0xDCE2)
        }
        ;return
    }
    ;var _0xD9EE = genChangMingAbc(_0xD9EE, 0);
    console["log"](_0xD9EE);
    sendChangMingContent2Server(_0xD9EE, "", _0xE2B8, null, 0)
}
function getRhythmChangMing() {
    var _0xD9EE = $("#source")["val"]();
    var _0xE2B8 = $("#groupid")["val"]();
    var _0xD9EE = genChangMingAbc(_0xD9EE, 0, true);
    console["log"](_0xD9EE);
    sendChangMingContent2Server(_0xD9EE, "", _0xE2B8, null, 0)
}
function sendChangMingContent2Server(_0xD9EE, _0xE606, _0xE2B8, _0xF494, _0xF4DC, _0xF4A6) {
    if (!_0xF4DC) {
        _0xF4DC = "0"
    }
    ;var _0xF4B8 = window["document"]["location"]["pathname"];
    var _0xF4CA = _0xF4B8["substring"](0, _0xF4B8["substr"](1)["indexOf"]("/") + 1);
    if (_0xF494) {
        _0xF4CA = _0xF494
    }
    ;var _0xF06E = genChangMingMp3PytbData(_0xF4DC);
    $["ajax"]({
        url: _0xF4CA + "/genChangMing?tmp=" + new Date()["getTime"]() + _0xF4DC,
        type: "POST",
        async: true,
        data: {
            "abcContent": _0xD9EE,
            "info": _0xE606,
            "groupId": _0xE2B8,
            "pytbData": JSON["stringify"](_0xF06E),
            "staffTypeId": _0xF4DC,
            "callbackUrl": _0xF4A6
        },
        success: function(_0xE564) {
            if (_0xE564 && _0xE564["indexOf"]("\u5931\u8d25") > -1) {
                window["top"]["alert"](_0xE564)
            }
        },
        error: function(_0xE64E) {
            console["log"](_0xE64E)
        }
    })
}
function genNoteChangMing(_0xDDA8, _0xD9EE) {
    var _0xDC2E = getLinesInfo(_0xD9EE);
    var _0xDC76 = "";
    for (var _0xDCE2 = 0; _0xDCE2 < _0xDC2E["length"]; _0xDCE2++) {
        var _0xDA12 = _0xDC2E[_0xDCE2];
        if (_0xDA12["type"] == "note") {
            break
        }
        ;_0xDC76 += _0xDA12["lineStr"] + "\x0A"
    }
    ;var _0xDD2A = syms[_0xDDA8];
    var _0xE432 = ["", "doe", "ray", "me", "far", "sew", "la", "sea"];
    var _0xDF22 = _0xD9EE["substring"](_0xDD2A["istart"], _0xDD2A["iend"]);
    _0xDF22 = _0xDF22["replace"](/[\{\}\(\)]/g, "")["replace"](/\d/g, "")["replace"](/[/]/g, "");
    lenStr = getDurStrByNoteDur(_0xDD2A["dur_orig"], _0xDD2A["my_ulen"]);
    var _0xE468 = _0xDD2A["my_key"];
    var _0xE36C = _0xDD2A["my_k_sf"];
    var _0xDA48 = getSimpleNameByKAndStaff(keyTransfer[_0xE36C]["value"], _0xDF22["replaceAll"](/[\/0-9\(\)\-]/, ""), _0xD9EE);
    var _0xE3C6 = _0xE432[parseInt((_0xDA48 + "")["replaceAll"](/[\,\=\^\_\']/, ""))];
    _0xDC76 = _0xDC76 + "\x0A" + "z//" + _0xDF22 + lenStr + "z//\x0Aw:" + _0xE3C6;
    var _0xE2A6 = replaceBlankLine(_0xDC76);
    console["log"](_0xE2A6);
    var _0xE606 = "";
    _0xE606 += _0xDF22;
    _0xE606 += "_" + _0xDD2A["dur_orig"];
    _0xE606 += "_" + _0xDD2A["my_k_sf"];
    _0xE606 += "_" + _0xDD2A["my_tempo"];
    console["log"]("info", _0xE606);
    var _0xE618 = "https://file.ixzds.com/file/findByAttachName?time=" + (new Date())["getTime"]();
    $["ajax"]({
        url: _0xE618,
        dataType: "json",
        type: "POST",
        async: false,
        data: {
            "ATTACHNAME": _0xE606
        },
        success: function(_0xE564) {
            console["log"](_0xE564);
            if (_0xE564["code"] == 0) {
                sendChangMingContent2Server(_0xE2A6, _0xE606)
            } else {
                if (_0xE564["code"] == 1) {
                    var _0xE63C = _0xE564["data"][0]["ATTACHURL"];
                    var _0xE62A = new Audio(_0xE63C);
                    _0xE62A["play"]()
                }
            }
        },
        error: function(_0xE64E) {
            console["log"](_0xE64E)
        }
    })
}
function getStandJsonDataByPytb(_0xF06E) {
    var _0xDA5A = new Object();
    var _0xE6A8 = getNoteData();
    var _0xEF2A = new Map();
    var _0xEF4E = 0;
    for (var _0xDCE2 = 0; _0xDCE2 < _0xE6A8["length"]; _0xDCE2++) {
        var _0xDEEC = _0xE6A8[_0xDCE2];
        var _0xDDA8 = _0xDEEC[0];
        var _0xDD2A = syms[_0xDDA8];
        if (_0xDD2A) {
            _0xDEEC["node_index"] = _0xDD2A["my_node_index"]
        }
    }
    ;var _0xF026 = -1;
    for (var _0xDCE2 = 0; _0xDCE2 < _0xF06E["length"]; _0xDCE2++) {
        var _0xDEEC = _0xF06E[_0xDCE2];
        _0xDEEC["notes"] = new Array();
        var _0xEFCC = 0;
        var _0xDFD6 = _0xDEEC["node_index"];
        var _0xE37E = -2;
        var _0xF038 = 0;
        for (var _0xDE02 = 0; _0xDE02 < _0xE6A8["length"]; _0xDE02++) {
            var _0xE696 = _0xE6A8[_0xDE02];
            if (_0xE696["node_index"] == _0xDFD6) {
                var _0xE5E2 = new Object();
                _0xE5E2["istart"] = _0xE696[0];
                if (_0xE37E != _0xE5E2["istart"]) {
                    var _0xDD2A = syms[_0xE696[0]];
                    if (_0xEFCC == 0) {
                        var _0xF05C = _0xDD2A["prev"];
                        while (_0xF05C) {
                            if ((_0xF05C["type"] == 8 || _0xF05C["type"] == 10)) {
                                var _0xF0B6 = new Object();
                                _0xF0B6["istart"] = _0xF05C["istart"];
                                _0xF0B6["sdur"] = _0xF05C["dur"];
                                _0xF038 += _0xF0B6["sdur"];
                                _0xF0B6["pitch"] = 0;
                                _0xF0B6["scoretype"] = "none";
                                _0xF0B6["lyric"] = [];
                                _0xDEEC["notes"]["push"](_0xF0B6);
                                _0xF05C = _0xF05C["perv"]
                            } else {
                                break
                            }
                        }
                    }
                    ;_0xE5E2["sdur"] = _0xDD2A["dur"];
                    if (_0xDD2A["tie_s"]) {
                        var _0xF092 = _0xDD2A["tie_s"];
                        while (_0xF092) {
                            _0xE5E2["sdur"] += _0xF092["dur"];
                            if (_0xF092["tie_s"]) {
                                _0xF092 = _0xF092["tie_s"]
                            } else {
                                _0xF092 = null
                            }
                        }
                    }
                    ;_0xF038 += _0xE5E2["sdur"];
                    _0xE5E2["pitch"] = _0xE696[3];
                    if (_0xDD2A["my_meter"] && _0xDD2A["my_meter"]["length"] > 0) {
                        _0xE5E2["meter"] = _0xDD2A["my_meter"][0]["top"] + "/" + _0xDD2A["my_meter"][0]["bot"]
                    }
                    ;_0xE5E2["scoretype"] = checkScorePitch(_0xE5E2["istart"]);
                    _0xE5E2["lyric"] = getLyric(_0xDD2A);
                    if (_0xE5E2["lyric"]["length"] > _0xEF4E) {
                        _0xEF4E = _0xE5E2["lyric"]["length"]
                    }
                    ;var _0xEFBA = false;
                    for (var _0xDCAC = 0; _0xDCAC < _0xDEEC["notes"]["length"]; _0xDCAC++) {
                        var _0xDD06 = _0xDEEC["notes"][_0xDCAC];
                        if (_0xDD06["istart"] == _0xE5E2["istart"]) {
                            _0xEFBA = true
                        }
                    }
                    ;if (!_0xEFBA) {
                        _0xDEEC["notes"]["push"](_0xE5E2)
                    }
                }
                ;_0xDEEC["noteDurSum"] = _0xF038;
                _0xE37E = _0xE5E2["istart"];
                _0xEFCC++
            }
        }
        ;if (_0xDCE2 > 0) {
            var _0xEFF0 = _0xF06E[_0xDCE2 - 1];
            _0xEFF0["nodeDur"] = parseFloat(_0xDEEC["starttime"]) - _0xF026;
            if (_0xDCE2 > 2) {
                var _0xF04A = _0xF06E[_0xDCE2 - 2];
                if (_0xEFF0["nodeDur"] > (_0xF04A["nodeDur"] * 2)) {
                    if (_0xEFF0["noteDurSum"] >= (_0xF04A["noteDurSum"] * 2)) {} else {
                        for (var _0xDCAC = _0xDCE2 - 2; _0xDCAC > 0; _0xDCAC--) {
                            var _0xF0A4 = _0xF06E[_0xDCAC];
                            if (_0xF0A4["noteDurSum"] == _0xEFF0["noteDurSum"]) {
                                _0xEFF0["nodeDur"] = _0xF0A4["nodeDur"] - 0;
                                break
                            }
                        }
                    }
                }
            }
            ;if (_0xDCE2 == _0xF06E["length"] - 1) {
                _0xF06E[_0xDCE2]["nodeDur"] = _0xEFF0["nodeDur"]
            }
            ;var _0xF002 = parseFloat(_0xEFF0["starttime"]);
            var _0xEFA8 = 0;
            var _0xEF60 = new Array();
            var _0xEF72 = "";
            for (var _0xDFA0 = 0; _0xDFA0 < _0xEFF0["notes"]["length"]; _0xDFA0++) {
                var _0xE696 = _0xEFF0["notes"][_0xDFA0];
                _0xEFA8 += _0xE696["sdur"];
                var _0xE660 = _0xEF2A["get"]("key" + _0xE696["istart"]);
                if (!_0xE660) {
                    _0xE660 = 0
                }
                ;_0xE696["currlyric"] = "";
                if (_0xE696["lyric"]["length"] > 0) {
                    if (_0xE696["lyric"]["length"] > _0xE660) {
                        _0xE696["currlyric"] = _0xE696["lyric"][_0xE660++]
                    } else {
                        if (_0xEF4E > _0xE696["lyric"]["length"]) {
                            _0xE696["currlyric"] = _0xE696["lyric"][_0xE696["lyric"]["length"] - 1]
                        } else {
                            _0xE696["currlyric"] = _0xE696["lyric"][_0xE696["lyric"]["length"] - 1]
                        }
                    }
                }
                ;_0xEF2A["set"]("key" + _0xE696["istart"], _0xE660);
                if (_0xE696["pitch"] != 0 && !_0xE696["currlyric"] && _0xEF60 != "") {
                    _0xE696["scoretype"] = _0xEF72;
                    _0xE696["currlyric"] = _0xEF60 + "-"
                }
                ;_0xEF72 = _0xE696["scoretype"];
                _0xEF60 = _0xE696["currlyric"]
            }
            ;_0xEF60 = new Array();
            _0xEF72 = "";
            if (_0xDCE2 == _0xF06E["length"] - 1) {
                var _0xEFF0 = _0xF06E[_0xDCE2];
                _0xEFA8 = 0;
                _0xF002 = parseFloat(_0xEFF0["starttime"]);
                for (var _0xDFA0 = 0; _0xDFA0 < _0xEFF0["notes"]["length"]; _0xDFA0++) {
                    var _0xE696 = _0xEFF0["notes"][_0xDFA0];
                    _0xEFA8 += _0xE696["sdur"];
                    _0xE696["dur"] = _0xE696["sdur"] / _0xEFF0["noteDurSum"] * _0xEFF0["nodeDur"];
                    var _0xE660 = _0xEF2A["get"]("key" + _0xE696["istart"]);
                    if (!_0xE660) {
                        _0xE660 = 0
                    }
                    ;_0xE696["currlyric"] = "";
                    if (_0xE696["lyric"]["length"] > 0) {
                        if (_0xE696["lyric"]["length"] > _0xE660) {
                            _0xE696["currlyric"] = _0xE696["lyric"][_0xE660++]
                        } else {
                            _0xE696["currlyric"] = _0xE696["lyric"][_0xE696["lyric"]["length"] - 1]
                        }
                    }
                    ;_0xEF2A["set"]("key" + _0xE696["istart"], _0xE660);
                    if (_0xE696["pitch"] != 0 && !_0xE696["currlyric"] && _0xEF60 != "") {
                        _0xE696["scoretype"] = _0xEF72;
                        _0xE696["currlyric"] = _0xEF60 + "-"
                    }
                    ;_0xEF72 = _0xE696["scoretype"];
                    _0xEF60 = _0xE696["currlyric"]
                }
            }
        }
        ;_0xF026 = parseFloat(_0xDEEC["starttime"])
    }
    ;var _0xF080 = new Array();
    for (var _0xDCE2 = 0; _0xDCE2 < _0xF06E["length"]; _0xDCE2++) {
        var _0xDEEC = _0xF06E[_0xDCE2];
        for (var _0xDE02 = 0; _0xDE02 < _0xDEEC["notes"]["length"]; _0xDE02++) {
            var _0xE696 = _0xDEEC["notes"][_0xDE02];
            _0xF080["push"](_0xE696)
        }
    }
    ;_0xDA5A["noteData"] = _0xF080;
    var _0xF014 = 0;
    var _0xEDE6 = getStaffInfo("source");
    var _0xEFDE = new Object();
    _0xEFDE["speed"] = _0xEDE6["speed"]["meter"]["top"] + "/" + _0xEDE6["speed"]["meter"]["bot"] + "=" + _0xEDE6["speed"]["val"];
    for (var _0xDCE2 = 0; _0xDCE2 < _0xDA5A["noteData"]["length"]; _0xDCE2++) {
        var _0xE564 = _0xDA5A["noteData"][_0xDCE2];
        if (_0xDCE2 == 0) {
            _0xE564["startTime"] = 0
        } else {
            _0xE564["startTime"] = _0xF014
        }
        ;_0xE564["dur"] = durToTime(_0xE564["sdur"], _0xEFDE["speed"]);
        _0xF014 += getNoteDurTime(_0xE564["istart"])
    }
    ;_0xDA5A["nodeData"] = _0xF06E;
    console["log"](JSON["stringify"](_0xDA5A["noteData"]));
    return _0xDA5A["noteData"]
}
function getNoteDurTime(_0xDDA8) {
    var _0xE1F2 = getNoteData();
    var _0xEB28 = 0;
    for (var _0xDCE2 = 0; _0xDCE2 < _0xE1F2["length"]; _0xDCE2++) {
        if (_0xE1F2[_0xDCE2][0] == _0xDDA8) {
            _0xEB28 += _0xE1F2[_0xDCE2][4];
            if (_0xE1F2[_0xDCE2 + 1] && _0xE1F2[_0xDCE2 + 1][0] == _0xDDA8) {
                continue
            } else {
                break
            }
        }
    }
    ;return _0xEB28
}
function resetStaffByPytb(_0xF06E) {
    var _0xDA5A = new Object();
    var _0xE6A8 = getNoteData();
    var _0xEF2A = new Map();
    var _0xEF4E = 0;
    for (var _0xDCE2 = 0; _0xDCE2 < _0xE6A8["length"]; _0xDCE2++) {
        var _0xDEEC = _0xE6A8[_0xDCE2];
        var _0xDDA8 = _0xDEEC[0];
        var _0xDD2A = syms[_0xDDA8];
        if (_0xDD2A) {
            _0xDEEC["node_index"] = _0xDD2A["my_node_index"]
        }
    }
    ;var _0xF026 = -1;
    for (var _0xDCE2 = 0; _0xDCE2 < _0xF06E["length"]; _0xDCE2++) {
        var _0xDEEC = _0xF06E[_0xDCE2];
        _0xDEEC["notes"] = new Array();
        var _0xEFCC = 0;
        var _0xDFD6 = _0xDEEC["node_index"];
        var _0xE37E = -2;
        var _0xF038 = 0;
        for (var _0xDE02 = 0; _0xDE02 < _0xE6A8["length"]; _0xDE02++) {
            var _0xE696 = _0xE6A8[_0xDE02];
            if (_0xE696["node_index"] == _0xDFD6) {
                var _0xE5E2 = new Object();
                _0xE5E2["istart"] = _0xE696[0];
                if (_0xE37E != _0xE5E2["istart"]) {
                    var _0xDD2A = syms[_0xE696[0]];
                    var _0xF428 = false;
                    for (var _0xDCAC = 0; _0xDCAC < _0xDEEC["notes"]["length"]; _0xDCAC++) {
                        var _0xF404 = _0xDEEC["notes"][_0xDCAC];
                        if (_0xF404["istart"] == _0xDD2A["istart"]) {
                            _0xF428 = true
                        }
                    }
                    ;if (_0xF428) {
                        continue
                    }
                    ;if (_0xEFCC == 0) {
                        var _0xF05C = _0xDD2A["prev"];
                        while (_0xF05C) {
                            if ((_0xF05C["type"] == 8 || _0xF05C["type"] == 10)) {
                                var _0xF0B6 = new Object();
                                _0xF0B6["istart"] = _0xF05C["istart"];
                                _0xF0B6["sdur"] = _0xF05C["dur"];
                                _0xF038 += _0xF0B6["sdur"];
                                _0xF0B6["pitch"] = 0;
                                _0xF0B6["scoretype"] = "none";
                                _0xF0B6["lyric"] = [];
                                var _0xF416 = false;
                                for (var _0xDCAC = 0; _0xDCAC < _0xDEEC["notes"]["length"]; _0xDCAC++) {
                                    var _0xF404 = _0xDEEC["notes"][_0xDCAC];
                                    if (_0xF404["istart"] == _0xF0B6["istart"]) {
                                        _0xF416 = true;
                                        break
                                    }
                                }
                                ;if (!_0xF416) {
                                    _0xDEEC["notes"]["push"](_0xF0B6)
                                }
                                ;_0xF05C = _0xF05C["perv"]
                            } else {
                                break
                            }
                        }
                    }
                    ;_0xE5E2["sdur"] = _0xDD2A["dur"];
                    if (_0xDD2A["tie_s"]) {
                        var _0xF092 = _0xDD2A["tie_s"];
                        while (_0xF092) {
                            _0xE5E2["sdur"] += _0xF092["dur"];
                            if (_0xF092["tie_s"]) {
                                _0xF092 = _0xF092["tie_s"]
                            } else {
                                _0xF092 = null
                            }
                        }
                    }
                    ;_0xF038 += _0xE5E2["sdur"];
                    _0xE5E2["pitch"] = _0xE696[3];
                    _0xE5E2["meter"] = _0xDD2A["my_meter"][0]["top"] + "/" + _0xDD2A["my_meter"][0]["bot"];
                    _0xE5E2["scoretype"] = checkScorePitch(_0xE5E2["istart"]);
                    _0xE5E2["lyric"] = getLyric(_0xDD2A);
                    if (_0xE5E2["lyric"]["length"] > _0xEF4E) {
                        _0xEF4E = _0xE5E2["lyric"]["length"]
                    }
                    ;var _0xF416 = false;
                    if (!_0xF416) {
                        _0xDEEC["notes"]["push"](_0xE5E2)
                    }
                }
                ;_0xDEEC["noteDurSum"] = _0xF038;
                _0xE37E = _0xE5E2["istart"];
                _0xEFCC++
            }
        }
        ;if (_0xDCE2 > 0) {
            var _0xEFF0 = _0xF06E[_0xDCE2 - 1];
            _0xEFF0["nodeDur"] = parseFloat(_0xDEEC["starttime"]) - _0xF026;
            if (_0xDCE2 > 2) {
                var _0xF04A = _0xF06E[_0xDCE2 - 2];
                if (_0xEFF0["nodeDur"] > (_0xF04A["nodeDur"] * 2)) {
                    if (_0xEFF0["noteDurSum"] >= (_0xF04A["noteDurSum"] * 2)) {} else {
                        for (var _0xDCAC = _0xDCE2 - 2; _0xDCAC > 0; _0xDCAC--) {
                            var _0xF0A4 = _0xF06E[_0xDCAC];
                            if (_0xF0A4["noteDurSum"] == _0xEFF0["noteDurSum"]) {
                                _0xEFF0["nodeDur"] = _0xF0A4["nodeDur"] - 0;
                                break
                            }
                        }
                    }
                }
            }
            ;if (_0xDCE2 == _0xF06E["length"] - 1) {
                _0xF06E[_0xDCE2]["nodeDur"] = _0xEFF0["nodeDur"]
            }
            ;var _0xF002 = parseFloat(_0xEFF0["starttime"]);
            var _0xEFA8 = 0;
            var _0xEF60 = new Array();
            var _0xEF72 = "";
            for (var _0xDFA0 = 0; _0xDFA0 < _0xEFF0["notes"]["length"]; _0xDFA0++) {
                var _0xE696 = _0xEFF0["notes"][_0xDFA0];
                _0xE696["startTime"] = _0xF002 + _0xEFA8 / _0xEFF0["noteDurSum"] * _0xEFF0["nodeDur"];
                _0xEFA8 += _0xE696["sdur"];
                _0xE696["dur"] = _0xE696["sdur"] / _0xEFF0["noteDurSum"] * _0xEFF0["nodeDur"];
                var _0xE660 = _0xEF2A["get"]("key" + _0xE696["istart"]);
                if (!_0xE660) {
                    _0xE660 = 0
                }
                ;_0xE696["currlyric"] = "";
                if (_0xE696["lyric"]["length"] > 0) {
                    if (_0xE696["lyric"]["length"] > _0xE660) {
                        _0xE696["currlyric"] = _0xE696["lyric"][_0xE660++]
                    } else {
                        if (_0xEF4E > _0xE696["lyric"]["length"]) {
                            _0xE696["currlyric"] = _0xE696["lyric"][_0xE696["lyric"]["length"] - 1]
                        } else {
                            _0xE696["currlyric"] = _0xE696["lyric"][_0xE696["lyric"]["length"] - 1]
                        }
                    }
                }
                ;_0xEF2A["set"]("key" + _0xE696["istart"], _0xE660);
                if (_0xE696["pitch"] != 0 && !_0xE696["currlyric"] && _0xEF60 != "") {
                    _0xE696["scoretype"] = _0xEF72;
                    _0xE696["currlyric"] = _0xEF60 + "-"
                }
                ;_0xEF72 = _0xE696["scoretype"];
                _0xEF60 = _0xE696["currlyric"]
            }
            ;_0xEF60 = new Array();
            _0xEF72 = "";
            if (_0xDCE2 == _0xF06E["length"] - 1) {
                var _0xEFF0 = _0xF06E[_0xDCE2];
                _0xEFA8 = 0;
                _0xF002 = parseFloat(_0xEFF0["starttime"]);
                for (var _0xDFA0 = 0; _0xDFA0 < _0xEFF0["notes"]["length"]; _0xDFA0++) {
                    var _0xE696 = _0xEFF0["notes"][_0xDFA0];
                    _0xE696["startTime"] = _0xF002 + _0xEFA8 / _0xEFF0["noteDurSum"] * _0xEFF0["nodeDur"];
                    _0xEFA8 += _0xE696["sdur"];
                    _0xE696["dur"] = _0xE696["sdur"] / _0xEFF0["noteDurSum"] * _0xEFF0["nodeDur"];
                    var _0xE660 = _0xEF2A["get"]("key" + _0xE696["istart"]);
                    if (!_0xE660) {
                        _0xE660 = 0
                    }
                    ;_0xE696["currlyric"] = "";
                    if (_0xE696["lyric"]["length"] > 0) {
                        if (_0xE696["lyric"]["length"] > _0xE660) {
                            _0xE696["currlyric"] = _0xE696["lyric"][_0xE660++]
                        } else {
                            _0xE696["currlyric"] = _0xE696["lyric"][_0xE696["lyric"]["length"] - 1]
                        }
                    }
                    ;_0xEF2A["set"]("key" + _0xE696["istart"], _0xE660);
                    if (_0xE696["pitch"] != 0 && !_0xE696["currlyric"] && _0xEF60 != "") {
                        _0xE696["scoretype"] = _0xEF72;
                        _0xE696["currlyric"] = _0xEF60 + "-"
                    }
                    ;_0xEF72 = _0xE696["scoretype"];
                    _0xEF60 = _0xE696["currlyric"]
                }
            }
        }
        ;_0xF026 = parseFloat(_0xDEEC["starttime"])
    }
    ;var _0xF080 = new Array();
    for (var _0xDCE2 = 0; _0xDCE2 < _0xF06E["length"]; _0xDCE2++) {
        var _0xDEEC = _0xF06E[_0xDCE2];
        for (var _0xDE02 = 0; _0xDE02 < _0xDEEC["notes"]["length"]; _0xDE02++) {
            var _0xE696 = _0xDEEC["notes"][_0xDE02];
            _0xF080["push"](_0xE696)
        }
    }
    ;_0xDA5A["noteData"] = _0xF080;
    _0xDA5A["nodeData"] = _0xF06E;
    console["log"](JSON["stringify"](_0xDA5A["noteData"]));
    return _0xDA5A["noteData"];
    return _0xDA5A
}
function getLyric(_0xDD2A) {
    var _0xE552 = new Array();
    var _0xEA08 = _0xDD2A["a_ly"];
    if (_0xEA08) {
        for (var _0xDCE2 = 0; _0xDCE2 < _0xEA08["length"]; _0xDCE2++) {
            var _0xDD18 = _0xEA08[_0xDCE2];
            if (!_0xDD18) {
                _0xE552["push"]("");
                continue
            }
            ;var _0xDD3C = _0xDD18["t"];
            _0xDD3C = _0xDD3C["replace"](/(\[R\])|[1-9.\[\]\!.。,，！'‘\(\)\（\）?？“”"]/g, "");
            var _0xEA1A = toZhongWen(_0xDD3C);
            if (_0xEA1A) {
                _0xDD3C = _0xEA1A[_0xDD3C]
            }
            ;_0xE552["push"](_0xDD3C)
        }
    }
    ;return _0xE552
}
function toZhongWen(_0xF980) {
    var _0xF96E = [{
        "Yi": "\u4f9d"
    }, {
        "yi": "\u4f9d"
    }, {
        "ya": "\u5440"
    }, {
        "o": "\u5662"
    }, {
        "lei": "\u54a7"
    }, {
        "ye": "\u8036"
    }, {
        "na": "\u90a3"
    }, {
        "mei": "\u9ea6"
    }, {
        "la": "\u62c9"
    }, {
        "bang": "\u90a6"
    }, {
        "do": "\u549a"
    }, {
        "bo": "\u6ce2"
    }, {
        "lo": "\u54af"
    }, {
        "sei": "\u585e"
    }, {
        "Be": "\u5457"
    }, {
        "be": "\u5457"
    }, {
        "chi": "\u7ed9"
    }, {
        "nei": "\u5185"
    }, {
        "ma": "\u561b"
    }];
    return _0xF96E["find"](function(_0xE294, _0xDA00) {
        return _0xE294[_0xF980]
    })
}
function tmpMethod() {
    var _0xE552 = [{
        "time": "7.200000",
        "pitch": 67,
        "dur": 0.8999999761581421,
        "scoretype": "all"
    }, {
        "time": "8.100000",
        "pitch": 67,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "8.400000",
        "pitch": 67,
        "dur": 0.44999998807907104,
        "scoretype": "all"
    }, {
        "time": "8.850000",
        "pitch": 67,
        "dur": 0.15000000596046448,
        "scoretype": "all"
    }, {
        "time": "9.000000",
        "pitch": 62,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "9.300000",
        "pitch": 64,
        "dur": 0.15000000596046448,
        "scoretype": "all"
    }, {
        "time": "9.450000",
        "pitch": 66,
        "dur": 0.15000000596046448,
        "scoretype": "all"
    }, {
        "time": "9.600000",
        "pitch": 67,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "10.200000",
        "pitch": 67,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "10.800000",
        "pitch": 0,
        "dur": 0.30000001192092896,
        "scoretype": "none"
    }, {
        "time": "11.100000",
        "pitch": 71,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "11.400000",
        "pitch": 67,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "11.700000",
        "pitch": 69,
        "dur": 0.15000000596046448,
        "scoretype": "all"
    }, {
        "time": "11.850000",
        "pitch": 71,
        "dur": 0.15000000596046448,
        "scoretype": "all"
    }, {
        "time": "12.000000",
        "pitch": 74,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "12.600000",
        "pitch": 74,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "13.200000",
        "pitch": 71,
        "dur": 0.44999998807907104,
        "scoretype": "all"
    }, {
        "time": "13.650000",
        "pitch": 71,
        "dur": 0.15000000596046448,
        "scoretype": "all"
    }, {
        "time": "13.800000",
        "pitch": 67,
        "dur": 0.44999998807907104,
        "scoretype": "all"
    }, {
        "time": "14.250000",
        "pitch": 71,
        "dur": 0.15000000596046448,
        "scoretype": "all"
    }, {
        "time": "14.400000",
        "pitch": 74,
        "dur": 0.44999998807907104,
        "scoretype": "all"
    }, {
        "time": "14.850000",
        "pitch": 71,
        "dur": 0.15000000596046448,
        "scoretype": "all"
    }, {
        "time": "15.000000",
        "pitch": 69,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "15.600000",
        "pitch": 69,
        "dur": 1.2000000476837158,
        "scoretype": "all"
    }, {
        "time": "16.799999",
        "pitch": 76,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "17.400000",
        "pitch": 74,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "18.000000",
        "pitch": 69,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "18.600000",
        "pitch": 71,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "19.200001",
        "pitch": 74,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "19.500000",
        "pitch": 71,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "19.799999",
        "pitch": 0,
        "dur": 0.30000001192092896,
        "scoretype": "none"
    }, {
        "time": "20.100000",
        "pitch": 74,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "20.400000",
        "pitch": 71,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "20.700001",
        "pitch": 69,
        "dur": 0.15000000596046448,
        "scoretype": "all"
    }, {
        "time": "20.850000",
        "pitch": 71,
        "dur": 0.15000000596046448,
        "scoretype": "all"
    }, {
        "time": "21.000000",
        "pitch": 67,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "21.600000",
        "pitch": 71,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "22.200001",
        "pitch": 0,
        "dur": 0.6000000238418579,
        "scoretype": "none"
    }, {
        "time": "22.799999",
        "pitch": 62,
        "dur": 0.44999998807907104,
        "scoretype": "all"
    }, {
        "time": "23.250000",
        "pitch": 64,
        "dur": 0.15000000596046448,
        "scoretype": "all"
    }, {
        "time": "23.400000",
        "pitch": 67,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "23.700001",
        "pitch": 67,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "24.000000",
        "pitch": 71,
        "dur": 0.44999998807907104,
        "scoretype": "all"
    }, {
        "time": "24.450001",
        "pitch": 71,
        "dur": 0.15000000596046448,
        "scoretype": "all"
    }, {
        "time": "24.600000",
        "pitch": 74,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "24.900000",
        "pitch": 74,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "25.200001",
        "pitch": 69,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "25.500000",
        "pitch": 69,
        "dur": 0.15000000596046448,
        "scoretype": "all"
    }, {
        "time": "25.650000",
        "pitch": 69,
        "dur": 0.15000000596046448,
        "scoretype": "all"
    }, {
        "time": "25.799999",
        "pitch": 64,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "26.400000",
        "pitch": 69,
        "dur": 0.8999999761581421,
        "scoretype": "all"
    }, {
        "time": "27.299999",
        "pitch": 62,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "27.600000",
        "pitch": 67,
        "dur": 0.8999999761581421,
        "scoretype": "all"
    }, {
        "time": "28.500000",
        "pitch": 67,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "28.799999",
        "pitch": 71,
        "dur": 0.8999999761581421,
        "scoretype": "all"
    }, {
        "time": "29.700001",
        "pitch": 71,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "30.000000",
        "pitch": 74,
        "dur": 1.2000000476837158,
        "scoretype": "all"
    }, {
        "time": "31.200001",
        "pitch": 67,
        "dur": 0.44999998807907104,
        "scoretype": "all"
    }, {
        "time": "31.650000",
        "pitch": 71,
        "dur": 0.15000000596046448,
        "scoretype": "all"
    }, {
        "time": "31.799999",
        "pitch": 74,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "32.099998",
        "pitch": 74,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "32.400002",
        "pitch": 76,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "33.000000",
        "pitch": 74,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "33.599998",
        "pitch": 71,
        "dur": 0.44999998807907104,
        "scoretype": "all"
    }, {
        "time": "34.049999",
        "pitch": 67,
        "dur": 0.15000000596046448,
        "scoretype": "all"
    }, {
        "time": "34.200001",
        "pitch": 74,
        "dur": 0.20000000298023224,
        "scoretype": "all"
    }, {
        "time": "34.400002",
        "pitch": 74,
        "dur": 0.20000000298023224,
        "scoretype": "all"
    }, {
        "time": "34.599998",
        "pitch": 74,
        "dur": 0.20000000298023224,
        "scoretype": "all"
    }, {
        "time": "34.799999",
        "pitch": 71,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "35.099998",
        "pitch": 0,
        "dur": 0.30000001192092896,
        "scoretype": "none"
    }, {
        "time": "35.400002",
        "pitch": 67,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "35.700001",
        "pitch": 0,
        "dur": 0.30000001192092896,
        "scoretype": "none"
    }, {
        "time": "36.000000",
        "pitch": 62,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "36.599998",
        "pitch": 67,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "37.200001",
        "pitch": 71,
        "dur": 0.44999998807907104,
        "scoretype": "all"
    }, {
        "time": "37.650002",
        "pitch": 67,
        "dur": 0.15000000596046448,
        "scoretype": "all"
    }, {
        "time": "37.799999",
        "pitch": 74,
        "dur": 0.20000000298023224,
        "scoretype": "all"
    }, {
        "time": "38.000000",
        "pitch": 74,
        "dur": 0.20000000298023224,
        "scoretype": "all"
    }, {
        "time": "38.200001",
        "pitch": 74,
        "dur": 0.20000000298023224,
        "scoretype": "all"
    }, {
        "time": "38.400002",
        "pitch": 71,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "38.700001",
        "pitch": 0,
        "dur": 0.30000001192092896,
        "scoretype": "none"
    }, {
        "time": "39.000000",
        "pitch": 67,
        "dur": 0.30000001192092896,
        "scoretype": "all"
    }, {
        "time": "39.299999",
        "pitch": 0,
        "dur": 0.30000001192092896,
        "scoretype": "none"
    }, {
        "time": "39.599998",
        "pitch": 62,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "40.200001",
        "pitch": 67,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "40.799999",
        "pitch": 62,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "41.400002",
        "pitch": 67,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "42.000000",
        "pitch": 62,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "42.599998",
        "pitch": 67,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "43.200001",
        "pitch": 67,
        "dur": 0.6000000238418579,
        "scoretype": "all"
    }, {
        "time": "43.799999",
        "pitch": 0,
        "dur": 0.6000000238418579,
        "scoretype": "none"
    }];
    var _0xF938 = [];
    for (var _0xDCE2 = 0; _0xDCE2 < _0xE552["length"]; _0xDCE2++) {
        var _0xF926 = _0xE552[_0xDCE2];
        _0xF926["time"] = parseFloat(_0xF926["time"]) - 7.2;
        _0xF938["push"](_0xF926)
    }
    ;console["log"](JSON["stringify"](_0xF938))
}
function getNoteCoors() {
    var _0xE01E = new Map();
    for (var _0xDCE2 = 0; _0xDCE2 < syms["length"]; _0xDCE2++) {
        if (syms[_0xDCE2]) {
            var _0xDD2A = syms[_0xDCE2];
            if (_0xDD2A["type"] == 8) {
                var _0xDC1C = _0xDD2A["my_line"];
                var _0xE50A = _0xDD2A["v"];
                var _0xE5E2 = new Object();
                var _0xEAF2 = [];
                if (_0xE01E["get"]("line_" + _0xDC1C + "_" + _0xE50A) != null) {
                    _0xE5E2 = _0xE01E["get"]("line_" + _0xDC1C + "_" + _0xE50A);
                    _0xEAF2 = _0xE5E2["points"]
                }
                ;var _0xEAE0 = [];
                var _0xEB16 = $("text[type*=\'HD\'][istart=\'" + _0xDD2A["istart"] + "\'],text[type=\'x\'][istart=\'" + _0xDD2A["istart"] + "\']");
                if (!_0xE5E2["svg"]) {
                    var _0xEB04 = $(_0xEB16)["parents"]("svg");
                    _0xE5E2["svg"] = _0xEB04
                }
                ;var _0xDCAC = parseFloat($(_0xEB16)["attr"]("x"));
                var _0xEACE = $(_0xEB16)[0]["getBoundingClientRect"]();
                _0xDCAC = _0xDCAC + _0xEACE["width"] / 2 / scale;
                var _0xDCBE = parseFloat($(_0xEB16)["attr"]("y"));
                _0xEAE0["push"](_0xDCAC);
                _0xEAE0["push"](_0xDCBE);
                _0xEAF2["push"](_0xEAE0);
                _0xE5E2["points"] = _0xEAF2;
                _0xE01E["set"]("line_" + _0xDC1C + "_" + _0xE50A, _0xE5E2)
            }
        }
    }
    ;return _0xE01E
}
function drawXuanLv() {
    var _0xE01E = getNoteCoors();
    _0xE01E["forEach"](function(_0xE030, _0xDF7C) {
        drawXuanLvPath($(_0xE030["svg"])["children"]("g"), _0xE030["points"])
    })
}
function delXuanLv() {
    $("path[type=\'XL\']")["remove"]()
}
function getStandJsonData(_0xEF84) {
    if (!_0xEF84) {
        _0xEF84 = 0
    }
    ;var _0xE6A8 = getNoteData();
    var _0xE552 = new Array();
    var _0xEF2A = new Map();
    var _0xEF60 = new Array();
    var _0xEF72 = "";
    var _0xEF3C = 0;
    var _0xEF4E = 0;
    for (var _0xDCE2 = 0; _0xDCE2 < _0xE6A8["length"]; _0xDCE2++) {
        var _0xE696 = new Object();
        var _0xE564 = _0xE6A8[_0xDCE2];
        var _0xDDA8 = _0xE564[0];
        var _0xEF96 = parseFloat(_0xE564[1]["toFixed"](4)) + _0xEF84;
        var _0xE810 = parseFloat(_0xE564[4]["toFixed"](4));
        var _0xDD2A = syms[_0xDDA8];
        _0xE696["istart"] = _0xDDA8;
        _0xE696["startTime"] = _0xEF96;
        _0xE696["time"] = _0xEF96;
        _0xE696["pitch"] = _0xE564[3];
        _0xE696["dur"] = _0xE810;
        _0xE696["sdur"] = _0xDD2A["dur"];
        _0xE696["scoretype"] = checkScorePitch(_0xDDA8);
        _0xE696["lyric"] = getLyric(_0xDD2A);
        if (_0xE696["lyric"]["length"] > _0xEF4E) {
            _0xEF4E = _0xE696["lyric"]["length"]
        }
        ;var _0xE660 = _0xEF2A["get"]("key" + _0xE696["istart"]);
        if (!_0xE660) {
            _0xE660 = 0
        }
        ;_0xE696["currlyric"] = "";
        if (_0xE696["lyric"]["length"] > 0) {
            if (_0xE696["lyric"]["length"] > _0xE660) {
                _0xE696["currlyric"] = _0xE696["lyric"][_0xE660++]
            } else {
                if (_0xEF4E > _0xE696["lyric"]["length"]) {
                    _0xE696["currlyric"] = ""
                } else {
                    _0xE696["currlyric"] = _0xE696["lyric"][_0xE696["lyric"]["length"] - 1]
                }
            }
        }
        ;_0xEF2A["set"]("key" + _0xE696["istart"], _0xE660);
        if (_0xE696["pitch"] != 0 && !_0xE696["currlyric"] && _0xEF60 != "" && _0xDD2A["my_bar_num"] == _0xEF3C) {
            _0xE696["scoretype"] = _0xEF72;
            _0xE696["currlyric"] = _0xEF60 + "-"
        }
        ;_0xEF3C = _0xDD2A["my_bar_num"];
        _0xEF72 = _0xE696["scoretype"];
        _0xEF60 = _0xE696["currlyric"];
        _0xE552["push"](_0xE696)
    }
    ;console["log"](_0xE552);
    return JSON["stringify"](_0xE552)
}
function saveasjson() {
    var _0xEDE6 = getStaffInfo("source");
    var _0xE5E2 = new Object();
    _0xE5E2["meter"] = _0xEDE6["meter"]["top"] + "/" + _0xEDE6["meter"]["bot"];
    _0xE5E2["speed"] = _0xEDE6["speed"]["meter"]["top"] + "/" + _0xEDE6["speed"]["meter"]["bot"] + "=" + _0xEDE6["speed"]["val"];
    _0xE5E2["data"] = getStandJsonData();
    var _0xF44C = "";
    var _0xDD2A = srcidx == 0 ? "source" : "src1"
      , _0xF470 = JSON["stringify"](_0xE5E2)
      , _0xF482 = "data:text/plain;charset=utf-8," + encodeURIComponent(_0xF470)
      , _0xF43A = document["createElement"]("a");
    var _0xF45E = new RegExp("T:.*(?=\\n)");
    var _0xF0DA = _0xF45E["exec"]($("#source")["val"]());
    if (_0xF0DA) {
        _0xF44C += "" + _0xF0DA[0]["replace"]("T:", "")["trim"]()
    }
    ;_0xF44C += ".txt";
    elt_ref["s" + srcidx]["value"] = _0xF43A["download"] = abc_fname[srcidx] = _0xF44C;
    _0xF43A["innerHTML"] = "Hidden Link";
    _0xF43A["href"] = _0xF482;
    _0xF43A["target"] = "_blank";
    _0xF43A["onclick"] = destroyClickedElement;
    _0xF43A["style"]["display"] = "none";
    document["body"]["appendChild"](_0xF43A);
    _0xF43A["click"]()
}
function saveasjsonByPytb() {
    var _0xEDE6 = getStaffInfo("source");
    var _0xE5E2 = new Object();
    _0xE5E2["meter"] = _0xEDE6["meter"]["top"] + "/" + _0xEDE6["meter"]["bot"];
    _0xE5E2["speed"] = _0xEDE6["speed"]["meter"]["top"] + "/" + _0xEDE6["speed"]["meter"]["bot"] + "=" + _0xEDE6["speed"]["val"];
    _0xE5E2["data"] = resetStaffByPytb(JSON["parse"]($("#nodelinedata")["val"]()));
    var _0xF44C = "";
    var _0xDD2A = srcidx == 0 ? "source" : "src1"
      , _0xF470 = JSON["stringify"](_0xE5E2)
      , _0xF482 = "data:text/plain;charset=utf-8," + encodeURIComponent(_0xF470)
      , _0xF43A = document["createElement"]("a");
    var _0xF45E = new RegExp("T:.*(?=\\n)");
    var _0xF0DA = _0xF45E["exec"]($("#source")["val"]());
    if (_0xF0DA) {
        _0xF44C += "" + _0xF0DA[0]["replace"]("T:", "")["trim"]()
    }
    ;_0xF44C += ".txt";
    elt_ref["s" + srcidx]["value"] = _0xF43A["download"] = abc_fname[srcidx] = _0xF44C;
    _0xF43A["innerHTML"] = "Hidden Link";
    _0xF43A["href"] = _0xF482;
    _0xF43A["target"] = "_blank";
    _0xF43A["onclick"] = destroyClickedElement;
    _0xF43A["style"]["display"] = "none";
    document["body"]["appendChild"](_0xF43A);
    _0xF43A["click"]()
}
function genChangMingMp3PytbData(_0xE50A) {
    if (!_0xE50A) {
        _0xE50A = 0
    }
    ;try {
        notDoTie = true;
        genChangMingFlag = true;
        clearNoteData();
        var _0xE576 = getNoteData();
        notDoTie = false;
        genChangMingFlag = false;
        var _0xE5AC = -1;
        var _0xE5D0 = 0;
        var _0xE552 = [];
        var _0xE5BE = 0;
        for (var _0xDF7C in syms) {
            var _0xDD2A = syms[_0xDF7C];
            if (_0xDD2A["grace"]) {
                continue
            }
            ;if (_0xE5AC != _0xDD2A["my_node_index"]) {
                _0xE5D0 = 0
            }
            ;if (_0xDD2A["v"] == _0xE50A) {
                _0xE5D0 += _0xDD2A["dur"]
            }
        }
        ;var _0xE59A = -1;
        var _0xE588 = -1;
        for (var _0xDCE2 = 0; _0xDCE2 < _0xE576["length"]; _0xDCE2++) {
            var _0xE564 = _0xE576[_0xDCE2];
            var _0xDD2A = syms[_0xE564[0]];
            if (!_0xDD2A) {
                continue
            }
            ;if (_0xDD2A["v"] != _0xE50A) {
                continue
            }
            ;if (_0xDD2A["grace"]) {
                continue
            }
            ;if (_0xDD2A["invis"] && _0xDD2A["my_note_str"]["indexOf"]("x") == 0) {
                continue
            }
            ;if (_0xE5AC != _0xDD2A["my_node_index"]) {
                if (_0xE59A == -1) {
                    _0xE59A = _0xE564[1]
                }
                ;if (_0xE588 == -1) {
                    _0xE588 = _0xDD2A["my_node_index"]
                }
                ;var _0xE5E2 = new Object();
                _0xE5E2["node_index"] = _0xDD2A["my_node_index"] - _0xE588;
                _0xE5E2["starttime"] = _0xE564[1] - _0xE59A;
                _0xE552["push"](_0xE5E2);
                _0xE5AC = _0xDD2A["my_node_index"]
            }
        }
        ;return _0xE552
    } catch (e) {
        console["log"](e);
        notDoTie = false;
        genChangMingFlag = false
    }
}
function getDPI() {
    const _0xE7DA = document["createElement"]("div");
    _0xE7DA["style"]["cssText"] = "height: 1in; left: -100%; position: absolute; top: -100%; width: 1in;";
    document["body"]["appendChild"](_0xE7DA);
    const _0xE7C8 = window["devicePixelRatio"] || 1
      , _0xE7EC = _0xE7DA["offsetWidth"] * _0xE7C8;
    return _0xE7EC
}
function getDurTimeBySpeed(_0xE858, _0xE810) {
    var _0xE86A = {
        "1/64": 24,
        "1/32": 48,
        "1/16": 96,
        "1/8": 192,
        "1/4": 384,
        "1/2": 768,
        "1/1": 1536
    };
    var _0xE87C = _0xE858["split"]("=")[0];
    var _0xE88E = 60 / _0xE858["split"]("=")[1];
    var _0xE846 = _0xE88E / _0xE86A[_0xE87C];
    return _0xE846 * _0xE810
}
function get2N(_0xE030) {
    var _0xDD06 = 2;
    for (var _0xDCE2 = 0; _0xDCE2 < 9999; _0xDCE2++) {
        if (_0xE030 == Math["pow"](2, _0xDCE2)) {
            return _0xDCE2
        } else {
            if (Math["pow"](2, _0xDCE2) > _0xE030) {
                break
            }
        }
    }
    ;return -1
}
function getNodeFirstNote(_0xDE6E) {
    for (var _0xDA00 in syms) {
        var _0xDD2A = syms[_0xDA00];
        if (_0xDD2A["type"] == 8 || _0xDD2A["type"] == 10) {
            return _0xDD2A
        }
    }
    ;return null
}
function genNewStaffByV(_0xD9EE, _0xE50A) {
    var _0xDC2E = getLinesInfo(_0xD9EE);
    var _0xE5F4 = "";
    for (var _0xDCE2 = 0; _0xDCE2 < _0xDC2E["length"]; _0xDCE2++) {
        var _0xDE38 = _0xDC2E[_0xDCE2];
        if (_0xDE38["type"] == "note" && _0xDE38["v"] == _0xE50A) {
            _0xE5F4 += _0xDE38["lineStr"] + "\x0A"
        } else {
            if (_0xDE38["type"] == "note" && _0xDE38["v"] != _0xE50A) {
                continue
            } else {
                if (_0xDE38["type"] == "S" || _0xDE38["type"] == "s" || (_0xDE38["type"] == "v" && _0xDE38["vNum"] != _0xE50A) || _0xDE38["type"] == "score") {
                    continue
                } else {
                    _0xE5F4 += _0xDE38["lineStr"] + "\x0A"
                }
            }
        }
    }
    ;_0xE5F4 = replaceBlankLine(_0xE5F4);
    return _0xE5F4
}
function getFirstNoteMeter() {
    for (var _0xDCE2 in syms) {
        console["log"](_0xDCE2);
        var _0xDD2A = syms[_0xDCE2];
        if (_0xDD2A["type"] == 8 || _0xDD2A["type"] == 10) {
            var _0xE8A0 = _0xDD2A["my_meter"][_0xDD2A["my_meter"]["length"] - 1];
            return _0xE8A0
        }
    }
    ;return null
}
function setCountDownInfo() {
    var _0xE8A0 = getFirstNoteMeter();
    var _0xF4EE = _0xE8A0["top"];
    var _0xEDE6 = getStaffInfo("source");
    var _0xEDC2 = _0xEDE6["speed"]["meter"]["top"] + "/" + _0xEDE6["speed"]["meter"]["bot"] + "=" + _0xEDE6["speed"]["val"];
    var _0xEF96 = getDurTimeBySpeed(_0xEDC2, _0xEDE6["wmeasure"]);
    if (_0xF4EE <= 2) {
        user["delay"]["preNodeNum"] = 2;
        user["delay"]["firstBeatNum"] = _0xF4EE
    } else {
        user["delay"]["preNodeNum"] = 1;
        user["delay"]["firstBeatNum"] = _0xF4EE
    }
    ;user["delay"]["time"] = _0xEF96 * user["delay"]["preNodeNum"];
    $("#countdown")["html"](user["delay"]["preNodeNum"] * user["delay"]["firstBeatNum"])
}
function getAllLyricWithTimeSeq() {
    var _0xE6A8 = getNoteData();
    var _0xE684 = [];
    for (var _0xDCE2 = 0; _0xDCE2 < _0xE6A8["length"]; _0xDCE2++) {
        var _0xE696 = _0xE6A8[_0xDCE2];
        var _0xDDA8 = _0xE696[0];
        var _0xDD2A = syms[_0xDDA8];
        if (_0xDD2A && _0xDD2A["a_ly"]) {
            var _0xE3C6 = new Object();
            _0xE3C6["istart"] = _0xDD2A["istart"];
            if (_0xDD2A["a_ly"]["length"] > 1) {
                var _0xE660 = 0;
                for (var _0xDE02 = 0; _0xDE02 < _0xE684["length"]; _0xDE02++) {
                    var _0xE672 = _0xE684[_0xDE02];
                    if (_0xE672["istart"] == _0xDD2A["istart"]) {
                        _0xE660++
                    }
                }
                ;if (_0xE660 < _0xDD2A["a_ly"]["length"]) {
                    _0xE3C6["word"] = _0xDD2A["a_ly"][_0xE660]["t"]
                } else {
                    _0xE3C6["word"] = _0xDD2A["a_ly"][0]["t"]
                }
            } else {
                _0xE3C6["word"] = _0xDD2A["a_ly"][0]["t"]
            }
            ;_0xE3C6["time"] = _0xE696[1];
            _0xE684["push"](_0xE3C6)
        }
    }
    ;return _0xE684
}
var tft = 0;
function speakLyric() {
    tft = new Date()["getTime"]();
    var _0xF8F0 = getAllLyricWithTimeSeq();
    console["log"](_0xF8F0);
    if (_0xF8F0 != null && _0xF8F0["length"] > 0) {
        var _0xF8DE = _0xF8F0[0]["time"];
        for (var _0xDCE2 = 0; _0xDCE2 < _0xF8F0["length"]; _0xDCE2++) {
            console["log"]("---:", (_0xF8F0[_0xDCE2]["time"] - _0xF8DE) * 1000);
            setTimeout(function(_0xE3C6) {
                speek(_0xE3C6["word"])
            }, (_0xF8F0[_0xDCE2]["time"] - _0xF8DE) * 1000, _0xF8F0[_0xDCE2])
        }
    }
}
function speek(_0xEB16) {
    var _0xE054 = new SpeechSynthesisUtterance();
    _0xE054["lang"] = "zh-CN";
    _0xE054["text"] = _0xEB16;
    speechSynthesis["speak"](_0xE054)
}
function getNoteInfoByLyricIstart(_0xEB94) {
    var _0xE3C6 = syms[_0xEB94];
    if (_0xE3C6) {
        return syms[_0xE3C6["parentIstart"]]
    }
    ;return null
}
function encryptText(_0xE054, _0xDF7C) {
    var _0xDF8E = CryptoJS["enc"]["Utf8"]["parse"](_0xDF7C);
    var _0xE042 = CryptoJS["DES"]["encrypt"](_0xE054, _0xDF8E, {
        mode: CryptoJS["mode"]["ECB"],
        padding: CryptoJS["pad"]["Pkcs7"]
    });
    return _0xE042["toString"]()
}
function decryptText(_0xDF58, _0xDF7C) {
    var _0xDF8E = CryptoJS["enc"]["Utf8"]["parse"](_0xDF7C);
    var _0xDF6A = CryptoJS["DES"]["decrypt"]({
        ciphertext: CryptoJS["enc"]["Base64"]["parse"](_0xDF58)
    }, _0xDF8E, {
        mode: CryptoJS["mode"]["ECB"],
        padding: CryptoJS["pad"]["Pkcs7"]
    });
    return _0xDF6A["toString"](CryptoJS["enc"]["Utf8"])
}
function getFixedCMByShiftKey(_0xDF7C, _0xE8C4) {
    var _0xDAC6 = getModeChangeNote(_0xDF7C);
    var _0xE8D6 = _0xDAC6["type"];
    var _0xDF22 = findNoteByIndex(_0xE8C4);
    if (/[_^]/["test"](_0xDF22)) {
        if (_0xDAC6["val"]["indexOf"](_0xDF22["toUpperCase"]()) > -1) {
            _0xDF22 = _0xDF22["replace"](/[_^]/, "")
        }
    }
    ;var _0xE8B2 = note2number(_0xDF22);
    return _0xE8B2
}
function getCmInfo(_0xDD2A) {
    if (_0xDD2A["a_dd"]) {
        for (var _0xDCE2 = 0; _0xDCE2 < _0xDD2A["a_dd"]["length"]; _0xDCE2++) {
            var _0xE792 = _0xDD2A["a_dd"][_0xDCE2];
            if (_0xE792["func"] == 6) {
                _0xE792["pos"] = "^"
            }
        }
    }
    ;var _0xE792 = new Object();
    _0xE792["func"] = 6;
    _0xE792["glyph"] = "dao";
    _0xE792["h"] = 18;
    _0xE792["name"] = "dao";
    _0xE792["wl"] = 4;
    _0xE792["wr"] = 4;
    _0xE792["pos"] = "_";
    var _0xDF7C = $("#K")["val"]();
    var _0xD9EE = document["getElementById"]("source")["value"];
    var _0xDA36 = _0xD9EE["match"](/K\:(.*)/);
    if (_0xDA36 != null) {
        _0xDF7C = _0xDA36[1]["replace"](/\s/g, "")
    }
    ;if (currentKey != "" && currentKey["indexOf"]("shift=cc") < 0) {
        _0xDF7C = currentKey
    }
    ;if (isFixedMode && _0xD9EE["indexOf"]("shift=") > -1) {
        var _0xE7A4 = currentKey["split"]("shift=")[1]["match"](/[_^]?[a-g][,]?/g);
        if (_0xE7A4) {
            var _0xE7B6 = _0xE7A4[1];
            _0xDF7C = getStaffKeyByKeyTransfer(_0xE7B6)
        }
    } else {
        if (_0xDF7C["indexOf"]("shift") > -1) {
            _0xDF7C = _0xDF7C["split"]("shift")[0]["trim"]()
        }
    }
    ;var _0xE432 = ["", "do", "re", "mi", "fa", "sol", "la", "si"];
    var _0xD9EE = source_val;
    if (_0xDD2A["notes"]["length"] > 1) {
        return null
    }
    ;var _0xE5E2 = new Object();
    if (isFixedMode) {
        var _0xDF22 = getFixedCMByShiftKey(_0xDF7C, _0xDD2A["notes"][0]["midi"]);
        _0xE5E2["num"] = _0xDF22
    } else {
        _0xE5E2["staff"] = _0xD9EE["substring"](_0xDD2A["istart"], _0xDD2A["iend"]);
        _0xE5E2["num"] = getSimpleNameByKAndStaff(_0xDF7C, _0xE5E2["staff"]["replaceAll"](/[\/0-9]/, "")["replaceAll"](/[\(\)]/g, "")["replaceAll"](/\-/g, ""), _0xD9EE)
    }
    ;if (_0xE5E2["num"]) {
        if (_0xDD2A["p_v"]["id"] && _0xDD2A["p_v"]["id"] == "99") {
            _0xE5E2["lty"] = ""
        } else {
            _0xE5E2["lty"] = _0xE432[parseInt(_0xE5E2["num"]["replaceAll"](/[\,\=\^\_\']/, ""))]
        }
        ;_0xE5E2["v"] = _0xDD2A["v"];
        _0xE792["name"] = _0xE5E2["lty"];
        _0xE792["glyph"] = _0xE5E2["lty"];
        _0xE792["iscm"] = 1
    }
    ;return _0xE792
}
function adjustJPPosition() {
    if (musicType == 2) {
        var _0xDB8C = 0;
        var _0xDBC2 = /translate\(.[^\(]*\)/;
        var _0xDAC6 = $("g[type=\'key\']:first");
        var _0xDAD8 = $(_0xDAC6)["attr"]("transform");
        var _0xDAEA = getTransformsTranslate(_0xDAD8);
        var _0xDAFC = parseFloat(_0xDAEA["x"]);
        var _0xDB0E = $("g[type=\'meter\']:first");
        var _0xDB20 = $(_0xDB0E)["attr"]("transform");
        var _0xDB32 = getTransformsTranslate(_0xDB20);
        var _0xDB44 = parseFloat(_0xDB32["x"]);
        var _0xDB9E = $("text[type=\'tempo\']:first");
        var _0xDBB0 = parseFloat($(_0xDB9E)["attr"]("x"));
        var _0xDB56 = _0xDAFC < _0xDB44 ? (_0xDAFC < _0xDBB0 ? _0xDAFC : _0xDBB0) : (_0xDB44 < _0xDBB0 ? _0xDB44 : _0xDBB0);
        var _0xDAB4 = parseFloat($("text[type=\'note\']:first")["attr"]("x"));
        _0xDB8C = _0xDAB4 - _0xDB56;
        var _0xDB68 = _0xDAD8["replace"](_0xDBC2, "translate(" + (parseFloat(_0xDAEA["x"]) + _0xDB8C) + "," + _0xDAEA["y"] + ")");
        $(_0xDAC6)["attr"]("transform", _0xDB68);
        var _0xDB7A = _0xDB20["replace"](_0xDBC2, "translate(" + (parseFloat(_0xDB32["x"]) + _0xDB8C) + "," + _0xDB32["y"] + ")");
        $(_0xDB0E)["attr"]("transform", _0xDB7A);
        $(_0xDB9E)["attr"]("x", _0xDBB0 + _0xDB8C)
    }
}

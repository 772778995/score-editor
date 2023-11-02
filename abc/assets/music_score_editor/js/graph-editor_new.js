/* graph-editor */

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
    "Treble Clef": "%%staffsep 60\x0A%%sysstaffsep 60\x0A%%pagewidth 1500\x0A%%contbarnb 1\x0A%%leftmargin 2\x0A%%rightmargin 10\x0A%%titlefont Microsoft-YaHei 28\x0A%%stretchlast 0.7\x0AI:abc-charset utf-8\x0AX: 1\x0AT: \u6807\u9898\x0AC: \u4f5c\u66f2\x0AQ: 1/4=88\x0AM: 4/4\x0AL: 1/8\x0AK: C\x0AV:1 treble\x0A%%MIDI program 0\x0A",
    "Bass Clef": "%%staffsep 60\x0A%%sysstaffsep 60\x0A%%pagewidth 1500\x0A%%contbarnb 1\x0A%%leftmargin 2\x0A%%rightmargin 10\x0A%%titlefont Microsoft-YaHei 28\x0A%%stretchlast 0.7\x0AI:abc-charset utf-8\x0AX: 1\x0AT: \u6807\u9898\x0AC: \u4f5c\u66f2\x0AQ: 1/4=88\x0AM: 4/4\x0AL: 1/8\x0AK: C\x0AV:1 bass\x0A%%MIDI program 0\x0A",
    "Grand Clef": "%%staffsep 60\x0A%%sysstaffsep 60\x0A%%contbarnb 1\x0A%%leftmargin 2\x0A%%rightmargin 10\x0A%%titlefont Microsoft-YaHei 28\x0A%%stretchlast 0.7\x0AI:abc-charset utf-8\x0AX: 1\x0AT: \u6807\u9898\x0AC: \u4f5c\u66f2\x0AQ: 1/4=88\x0AM: 4/4\x0AL: 1/8\x0AK: C\x0A%%MIDI program 0\x0AV:1 treble\x0A\x0AV:2 bass\x0A",
    "SATB": "%%staffsep 60\x0A%%sysstaffsep 60\x0A%%contbarnb 1\x0A%%leftmargin 2\x0A%%rightmargin 10\x0A%%titlefont Microsoft-YaHei 28\x0A%%stretchlast 0.7\x0AI:abc-charset utf-8\x0AX: 1\x0AT: \u6807\u9898\x0AC: \u4f5c\u66f2\x0AQ: 1/4=88\x0AM: 4/4\x0AL: 1/8\x0AK: C\x0A%%MIDI program 0\x0AV:1 treble\x0A\x0AV:2 bass\x0A"
};
var deco_params = {
    jr: {
        start: "!>(!",
        end: "!>)!"
    },
    jq: {
        start: "!<(!",
        end: "!<)!"
    },
    k_slur: {
        start: "!slur(!",
        end: "!slur)!"
    },
    dnb: {
        start: "v"
    },
    upb: {
        start: "u"
    },
    accent: {
        start: "!>!"
    },
    stc: {
        start: "."
    },
    emb: {
        start: "!tenuto!"
    },
    lmrd: {
        start: "!mordent!"
    },
    opend: {
        start: "!open!"
    },
    dplus: {
        start: "!plus!"
    },
    sgno: {
        start: "!segno!"
    },
    brth: {
        start: "!breath!"
    },
    sphr: {
        start: "!shortphrase!"
    },
    "D.C. al Fine": {
        start: "!D.C.alfine!"
    },
    "D.S. al Fine": {
        start: "!D.S.alfine!"
    },
    "Fine": {
        start: "!fine!"
    },
    pedoff: {
        start: "!ped-up!"
    },
    slur: {
        start: "(",
        end: ")"
    },
    "8va": {
        start: "!8va(!",
        end: "!8va)!"
    },
    "8vb": {
        start: "!8vb(!",
        end: "!8vb)!"
    },
    "15ma": {
        start: "!15ma(!",
        end: "!15ma)!"
    },
    "15mb": {
        start: "!15mb(!",
        end: "!15mb)!"
    },
    tubrn: {
        start: "(\\d{1,2}"
    }
};
var tubrn_rules = {
    "3": "/2",
    "4": "/4",
    "5": "/4",
    "6": "/4",
    "7": "/4",
    "8": "/8",
    "9": "/8"
};
graph_update = true;
var graphEditor = {
    isPlayNote: true,
    pianoImpro: null
};
var fixedLen = false;
var chordNote = "";
var chordNoteLyric = "";
function followMouse(_0x64A7) {
    if (rest) {
        return
    }
    ;var _0x8C27 = _0x64A7["target"];
    var _0xA7ED = _0x8C27["tagName"];
    if (_0xA7ED != "svg") {
        _0x8C27 = $(_0x8C27)["parents"]("svg")
    }
    ;var _0xA83C = document["getElementById"]("use_black");
    if ($(_0x64A7["target"])["parents"]("svg")["attr"]("id") != $(_0xA83C)["parents"]("svg")["attr"]("id")) {
        $("#use_black")["remove"]();
        _0xA83C = null
    }
    ;if (!_0xA83C) {
        _0xA83C = document["createElementNS"](svgns, "use");
        _0xA83C["setAttribute"]("id", "use_black");
        _0xA83C["setAttributeNS"](xlinkns, "href", currShape);
        _0xA83C["setAttribute"]("x", -10);
        _0xA83C["setAttribute"]("y", -10);
        if ($(_0x8C27)["find"](".g")["length"] > 0) {
            $(_0x8C27)["find"](".g")["append"]($(_0xA83C))
        }
    }
    ;$("use[type=\'demo_hl\']")["remove"]();
    $(".editor_rect")["removeClass"]("editor_rect");
    editSvgLineIndex = $(_0xA83C)["parents"]("svg")["attr"]("id");
    var _0xA88B = findNearInfo($(_0xA83C)["parents"]("svg"), _0x64A7["offsetX"] / scale, _0x64A7["offsetY"] / scale);
    if (_0xA88B) {
        cen = syms[_0xA88B["istart"]]
    } else {
        cen = null
    }
    ;if (isSelectDeco) {
        if (selectDecoType == "nodeline") {
            moveingRenderBar(_0x64A7)
        }
        ;if (selectDecoType == "linkclef") {
            movingRenderStaff(_0x64A7)
        }
        ;return
    }
    ;var _0x8C76 = getYinfo($(_0xA83C)["parents"]("svg"), _0x64A7["offsetY"] / scale);
    if (_0xA88B && _0x8C76) {
        _0xA83C["setAttribute"]("x", parseFloat(_0xA88B["x"]));
        _0xA83C["setAttribute"]("y", parseFloat(_0x8C76["y"]));
        var _0x8AEB = _0x8C76["num"];
        if (_0x8AEB != 0) {
            draw_short_line(_0x8AEB, parseFloat(_0xA88B["x"]), _0x8C76, _0x8C27)
        }
        ;cen["mouse_pos"] = _0x8C76["mouse_pos"]
    } else {
        console["log"]("\u672a\u627e\u5230\u4efb\u4f55\u97f3\u7b26" + new Date())
    }
    ;rest = true;
    setTimeout(function() {
        rest = false
    }, 66)
}
function draw_short_line(_0x8AEB, _0x6409, _0x8C76, _0x8C27) {
    if (_0x8AEB != 0) {
        var _0x8B3A = _0x6409 + 4;
        var _0x8B89 = parseFloat(_0x8C76["staffY"]);
        if (_0x8AEB > 0) {
            _0x8B89 -= 24;
            for (var _0x5E7B = 0; _0x5E7B < _0x8AEB; _0x5E7B++) {
                _0x8B89 -= 6;
                var _0x8BD8 = document["createElementNS"](svgns, "use");
                _0x8BD8["setAttributeNS"](xlinkns, "href", "#my_hl");
                _0x8BD8["setAttribute"]("type", "demo_hl");
                $(_0x8C27)["find"](".g")["append"]($(_0x8BD8));
                _0x8BD8["setAttribute"]("x", _0x8B3A);
                _0x8BD8["setAttribute"]("y", _0x8B89)
            }
        } else {
            for (var _0x5E7B = 0; _0x5E7B > _0x8AEB; _0x5E7B--) {
                _0x8B89 += 6;
                var _0x8BD8 = document["createElementNS"](svgns, "use");
                _0x8BD8["setAttributeNS"](xlinkns, "href", "#my_hl");
                _0x8BD8["setAttribute"]("type", "demo_hl");
                $(_0x8C27)["find"](".g")["append"]($(_0x8BD8));
                _0x8BD8["setAttribute"]("x", _0x8B3A);
                _0x8BD8["setAttribute"]("y", _0x8B89)
            }
        }
    }
}
function findNearInfo(_0x90C8, _0x6409, _0x6458) {
    var _0xA123 = "";
    var _0xA085 = $(".editorv.selected");
    if (_0xA085["length"] > 0) {
        _0xA123 = "[v=\'" + (parseInt($(_0xA085)["attr"]("value")) - 1) + "\']"
    }
    ;var _0x9E0D = 9999;
    var _0x9EFA = 9999;
    var _0x9F49 = null;
    var _0x9E5C = "rect[type=\'rest\']" + _0xA123 + ",rect[type=\'note\']" + _0xA123 + "";
    if (musicType == 2) {
        _0x9E5C = "rect[type=\'splnum_note\'],rect[type=\'splnum_rest\'],rect[type=\'splnum_chord\']"
    }
    ;var _0xA0D4 = $(dragObj)["attr"]("value");
    if (_0xA0D4 && _0xA0D4["indexOf"]("[K:") == 0) {
        _0x9E5C += ",rect[type=\'bar\']" + _0xA123 + ",rect[type=\'clef\']"
    }
    ;if ($(dragObj)["attr"]("type") == "all") {
        if (musicType == 2) {
            _0x9E5C += ",rect[type=\'splnum_bar\']" + _0xA123 + ",rect[type=\'clef\']"
        } else {
            _0x9E5C += ",rect[type=\'bar\']" + _0xA123 + ",rect[type=\'clef\']"
        }
    }
    ;if (dragObj != null) {
        console["log"]($(dragObj)["attr"]("type"));
        if ($(dragObj)["attr"]("type") == "linkclef") {
            return
        }
        ;if (musicType == 0) {
            if ($(dragObj)["attr"]("type") == "nodeline") {
                return;
                _0x9E5C = "rect[type=\'bar\']"
            }
        } else {
            if ($(dragObj)["attr"]("type") == "nodeline") {
                return;
                _0x9E5C = "rect[type=\'splnum_bar\']"
            }
        }
    }
    ;$(_0x90C8)["find"](_0x9E5C)["each"](function(_0x5E7B, _0x6BC0) {
        var _0xA2AE = parseFloat($(this)["attr"]("x"));
        var _0xA2FD = parseFloat($(this)["attr"]("y"));
        var _0x9743 = parseFloat($(this)["attr"]("height"));
        var _0x9C33 = parseFloat($(this)["attr"]("width"));
        if (musicType == 2) {
            if ($(_0x6BC0)["attr"]("type") != "splnum_bar") {
                var _0x9656 = $(_0x6BC0)["parent"]();
                var _0x96A5 = $(_0x9656)["attr"]("transform");
                var _0x92F1 = getTransformsTranslate(_0x96A5);
                _0xA2AE = _0xA2AE + parseFloat(_0x92F1["x"]);
                _0xA2FD = _0xA2FD + parseFloat(_0x92F1["y"])
            }
        }
        ;if (_0x6409 >= _0xA2AE && _0x6409 <= (_0xA2AE + _0x9C33) && _0x6458 >= _0xA2FD && _0x6458 <= (_0xA2FD + _0x9743)) {
            _0x9EFA = _0xA172;
            _0x9F49 = $(this)
        } else {
            var _0xA1C1 = Math["abs"](parseFloat(_0xA2AE) - _0x6409);
            var _0xA210 = Math["abs"](parseFloat(_0xA2FD) - _0x6458);
            if (_0xA1C1 > 50) {
                return
            }
            ;if (_0xA210 > 50) {
                if (_0x6458 < _0xA2FD) {
                    return
                } else {
                    if (_0x6458 > _0xA2FD && (_0x6458 - (_0xA2FD + parseFloat(_0x9743))) > 30) {
                        return
                    }
                }
            }
            ;var _0xA172 = 0;
            if (_0x6458 > (parseFloat(_0xA2FD) + parseFloat(_0x9743))) {
                var _0xA25F = Math["abs"](_0x6458 - (parseFloat(_0xA2FD) + parseFloat(_0x9743)));
                _0xA172 = Math["sqrt"](Math["pow"](_0xA1C1, 2) + Math["pow"](_0xA25F, 2))
            } else {
                _0xA172 = Math["sqrt"](Math["pow"](_0xA1C1, 2) + Math["pow"](_0xA210, 2))
            }
            ;if (_0xA172 < 30) {
                if (_0xA172 < _0x9EFA) {
                    _0x9EFA = _0xA172;
                    _0x9F49 = $(this)
                }
            }
        }
    });
    var _0x9EAB = false;
    if (_0x9F49 != null) {
        var _0xA036 = $(_0x9F49)["attr"]("istart");
        var _0x6681 = syms[_0xA036];
        if (_0x6681 && _0x6681["dur"] == _0x6681["my_wmeasure"]) {
            _0x9EAB = true
        }
    }
    ;if (_0x9F49 != null) {
        $(".editor_rect")["removeClass"]("editor_rect");
        $("rect[type=\'rest\'],rect[type=\'note\']")["css"]("fill-opacity", "0");
        $(_0x9F49)["addClass"]("editor_rect");
        var _0x93DE = new Object();
        var _0x8334 = $(_0x9F49)["prev"]();
        while ($(_0x8334)["attr"]("type") == "dot") {
            _0x8334 = $(_0x8334)["prev"]()
        }
        ;if ($(_0x8334)["is"]("g")) {
            _0x8334 = $(_0x8334)["find"]("text")
        }
        ;var _0x6409 = $(_0x8334)["attr"]("x");
        _0x93DE["x"] = _0x6409;
        _0x93DE["istart"] = $(_0x9F49)["attr"]("istart");
        return _0x93DE
    } else {
        console["log"]("\u672a\u627e\u5230\u9644\u8fd1\u7684", _0x6409, _0x6458);
        var _0x79A3 = getMouseNode($(_0x90C8)["attr"]("index"), _0x6409 * scale, _0x6458 * scale);
        if (_0x79A3 == null) {
            return
        }
        ;var _0x5FB7 = getNodesInfo($("#source")["val"]());
        var _0x9F98 = getNodeContent(_0x5FB7, _0x79A3["node_index"], _0x79A3["v"]);
        _0x9F98 = _0x9F98["replace"](/\[.[^\]]*\]/, "")["replace"](/[,'$|]/g, "")["replace"](/\d/g, "")["replace"](/\s/g, "");
        if (_0x9F98 == "z") {
            var _0x93DE = new Object();
            var _0x6409 = _0x79A3["nodeline_start"][0] / scale;
            if (_0x6409 == 0) {
                var _0x9DBE = $(_0x90C8)["find"]("text[type=\'bclef\'],text[type=\'tclef\']")[0];
                if (_0x9DBE) {
                    _0x6409 += parseFloat($(_0x9DBE)["attr"]("x")) + 40
                } else {
                    _0x6409 += 60
                }
            } else {
                _0x6409 += 20
            }
            ;_0x93DE["x"] = _0x6409;
            var _0x9FE7 = _0x79A3["node_index"];
            if (has_weak_node) {
                _0x9FE7--
            }
            ;_0x93DE["istart"] = getRestIstart(_0x9FE7, _0x79A3["v"]);
            console["log"]("obj.istart:", _0x93DE["istart"]);
            return _0x93DE
        }
    }
}
function getMouseNode(_0xD147, _0x6409, _0x6458) {
    var _0xD05A = getStaffNodeCoor(scale, false, 0);
    var _0xC854 = new Array();
    for (var _0x5E7B = 0; _0x5E7B < _0xD05A["length"]; _0x5E7B++) {
        var _0xD00B = _0xD05A[_0x5E7B];
        var _0xD234 = _0xD00B["nodeline_start"][0];
        var _0xD0A9 = _0xD00B["nodeline_end"][0];
        var _0xD283 = _0xD00B["nodeline_start"][1];
        var _0xD0F8 = _0xD00B["nodeline_start"][3];
        if (_0x6409 >= _0xD234 && _0x6409 < _0xD0A9 && _0xD147 == _0xD00B["line"]) {
            _0xC854["push"](_0xD00B)
        }
    }
    ;if (_0xC854["length"] == 1) {
        return _0xC854[0]
    } else {
        if (_0xC854["length"] > 1) {
            for (var _0x5E7B = 0; _0x5E7B < _0xC854["length"]; _0x5E7B++) {
                var _0xD00B = _0xC854[_0x5E7B];
                var _0x66D0 = _0xD00B["nodeline_start"][1];
                var _0x6594 = _0xD00B["nodeline_start"][3];
                if ((_0x5E7B + 1) < _0xC854["length"]) {
                    var _0xD1E5 = _0xC854[_0x5E7B + 1]["nodeline_start"][1];
                    var _0xD196 = _0xC854[_0x5E7B + 1]["nodeline_start"][3];
                    _0x6594 = _0x6594 + (_0xD1E5 - _0x6594) / 2
                } else {
                    return _0xC854[_0x5E7B]
                }
                ;if (_0x6458 < _0x6594) {
                    return _0xC854[_0x5E7B]
                }
            }
        }
    }
    ;return null
}
function getNodeContent(_0x5FB7, _0x9FE7, _0xA6B1) {
    for (var _0x5E7B = 0; _0x5E7B < _0x5FB7["length"]; _0x5E7B++) {
        var _0x69E6 = _0x5FB7[_0x5E7B];
        if (_0x69E6["type"] == "note") {
            var _0xD7C2 = _0x69E6["nodes"];
            for (var _0x5ECA = 0; _0x5ECA < _0xD7C2["length"]; _0x5ECA++) {
                var _0x79A3 = _0xD7C2[_0x5ECA];
                if (_0x79A3["nodeIndex"] == _0x9FE7 && _0x79A3["v"] == _0xA6B1) {
                    return _0x79A3["nodeStr"]
                }
            }
        }
    }
    ;return ""
}
function getRestIstart(_0x9FE7, _0xA6B1) {
    console["log"]("nodeIndex:", _0x9FE7, _0xA6B1);
    for (var _0x5E7B = 0; _0x5E7B < syms["length"]; _0x5E7B++) {
        var _0x6681 = syms[_0x5E7B];
        if (_0x6681 && _0x6681["type"] == 10) {
            if (_0x6681["my_wmeasure"] == _0x6681["dur"] && _0x6681["my_bar_num"] == _0x9FE7 && _0x6681["v"] == _0xA6B1) {
                return _0x6681["istart"]
            }
        }
    }
    ;return -1
}
var lastStaffY = -1;
function getYinfo(_0x90C8, _0x6458) {
    var _0x7377 = /translate\((.[^\(]*)\)/;
    var _0xDB27 = 9999;
    var _0xDCB2 = null;
    var _0xDB76 = null;
    var _0x93DE = new Object();
    $(_0x90C8)["find"]("g[type=\'staff\']")["each"](function(_0x6BC0) {
        var _0x92A2 = $(this)["attr"]("transform");
        var _0x772B = _0x7377["exec"](_0x92A2)[1];
        var _0xDC63 = _0x772B["replace"]("s", "")["split"](",")[1];
        _0xDC63 = parseFloat(_0xDC63);
        var _0xDBC5 = Math["abs"](_0xDC63 - _0x6458);
        var _0xDC14 = Math["abs"]((_0xDC63 - 24) - _0x6458);
        var _0xA172 = _0xDBC5;
        if (_0xDC14 < _0xDBC5) {
            _0xA172 = _0xDC14
        }
        ;if (_0xA172 < _0xDB27) {
            _0xDB27 = _0xA172;
            _0xDCB2 = $(this);
            _0xDB76 = _0xDC63
        }
    });
    _0x93DE["staffY"] = _0xDB76;
    var _0xDD01 = _0xDB76 - _0x6458;
    _0x93DE["mouse_pos"] = parseInt(_0xDD01 / 3);
    _0x93DE["y"] = _0xDB76 - parseInt(_0xDD01 / 3) * 3;
    if (_0xDD01 > 0) {
        if (_0xDD01 >= 24) {
            _0x93DE["num"] = parseInt((_0xDD01 - 24) / 6)
        } else {
            _0x93DE["num"] = 0
        }
    } else {
        _0x93DE["num"] = parseInt(_0xDD01 / 6)
    }
    ;if (cen == null) {
        console["log"]("cen is null");
        return null
    }
    ;if ($(_0xDCB2)["attr"]("st") != cen["st"]) {
        return null
    }
    ;return _0x93DE
}
function getStaffBotLineY(_0x90C8, _0x6458) {
    var _0x7377 = /translate\((.[^\(]*)\)/;
    var _0xDB76 = null;
    var _0xDB27 = 9999;
    $(_0x90C8)["find"]("g[type=\'staff\']")["each"](function(_0x6BC0) {
        var _0x92A2 = $(this)["attr"]("transform");
        var _0x772B = _0x7377["exec"](_0x92A2)[1];
        var _0xDC63 = _0x772B["replace"]("s", "")["split"](",")[1];
        _0xDC63 = parseFloat(_0xDC63);
        var _0xDBC5 = Math["abs"](_0xDC63 - _0x6458);
        var _0xDC14 = Math["abs"]((_0xDC63 - 24) - _0x6458);
        var _0xA172 = _0xDBC5;
        if (_0xDC14 < _0xDBC5) {
            _0xA172 = _0xDC14
        }
        ;if (_0xA172 < _0xDB27) {
            _0xDB27 = _0xA172;
            _0xDB76 = _0xDC63
        }
    });
    return _0xDB76
}
function genClickNote(_0x64A7, _0xB17E) {
    if (cen == null) {
        return
    }
    ;hasAddBlank = false;
    var _0xB2BA = getNewNote(cen);
    var _0xAFF3 = _0xB2BA["note"];
    if (_0xB17E) {
        _0xAFF3 = _0xB17E
    }
    ;if (rest_status == "selected") {
        _0xAFF3 = "z"
    }
    ;if (chordNote != "") {
        _0xAFF3 = chordNote
    }
    ;var _0xB26B = genNoteAndDur(_0xAFF3, cen);
    if (!_0xB26B) {
        return
    }
    ;_0xB26B["note"] = _0xAFF3;
    var _0xB1CD = _0xB26B["noteStr"];
    editSplnum["noteUpdate"]["line"] = 0;
    if (cen["in_tuplet"]) {
        _0xB26B["note_dur"] = cen["dur_orig"];
        _0xB26B["noteStr"] = _0xB26B["oriNoteStr"];
        _0xB26B["del_s"] = [];
        _0xB26B["update_dur_s"] = null;
        replaceNote("source", cen["istart"], cen["iend"], _0xB26B)
    } else {
        if (cen["type"] == 10) {
            if (graphEditor["pianoImpro"] && graphEditor["pianoImpro"]["isEditLyric"]) {
                editSplnum["noteUpdate"]["active"] = true;
                editSplnum["noteUpdate"]["istart"] = _0xB26B["noteStr"][0] == " " ? (cen["istart"] + 1) : cen["istart"]
            }
            ;replaceNote("source", cen["istart"], cen["iend"], _0xB26B)
        } else {
            if (cen["type"] == 8) {
                var _0xB21C = cen["dur"];
                if (cen["tie_s"]) {
                    _0xB21C += cen["tie_s"]["dur"]
                }
                ;if (_0xB21C == durSetting) {
                    var _0xAE68 = genChordNote(cen, _0xAFF3, durSetting);
                    if (rest_status == "" && chordNote == "") {
                        _0xB26B["noteStr"] = _0xAE68["chordNoteStr"]
                    }
                    ;if (graphEditor["pianoImpro"] && graphEditor["pianoImpro"]["isEditLyric"]) {
                        editSplnum["noteUpdate"]["active"] = true;
                        editSplnum["noteUpdate"]["istart"] = _0xB26B["noteStr"][0] == " " ? (cen["istart"] + 1) : cen["istart"]
                    }
                    ;replaceNote("source", cen["istart"], cen["iend"], _0xB26B)
                } else {
                    _0xB26B["note_dur"] = durSetting;
                    if (graphEditor["pianoImpro"] && graphEditor["pianoImpro"]["isEditLyric"]) {
                        editSplnum["noteUpdate"]["active"] = true;
                        editSplnum["noteUpdate"]["istart"] = _0xB26B["noteStr"][0] == " " ? (cen["istart"] + 1) : cen["istart"]
                    }
                    ;replaceNote("source", cen["istart"], cen["iend"], _0xB26B)
                }
            }
        }
    }
    ;if (rest_status == "selected") {
        cen = null;
        return
    }
    ;var _0xB358 = new Array();
    if (_0xAFF3["indexOf"]("[") > -1) {
        var _0x8247 = _0xAFF3["match"](/[=_^]{0,1}[a-gA-G][,']{0,1}/g);
        for (var _0x5E7B = 0; _0x5E7B < _0x8247["length"]; _0x5E7B++) {
            var _0xB309 = new Object();
            _0xB309["pitch"] = findIndexByNote(_0x8247[_0x5E7B]);
            _0xB309["dur"] = durSetting;
            _0xB309["time"] = 0;
            _0xB358["push"](_0xB309)
        }
        ;play_notes(_0xB358);
        cen = null;
        return
    }
    ;var _0xB309 = new Object();
    _0xB309["pitch"] = _0xB2BA["note_seq"];
    _0xB309["dur"] = durSetting;
    _0xB309["time"] = 0;
    _0xB358["push"](_0xB309);
    if (_0xAFF3 && _0xAFF3["indexOf"]("z") == -1) {
        play_notes(_0xB358)
    }
    ;cen = null
}
function getNewNote(cen) {
    var _0x62CD = cen["mouse_pos"];
    var _0x8247 = cen["notes"];
    var _0xD5E8 = 0;
    if (_0x8247) {
        var _0xD54A = _0x8247[0];
        var _0xD599 = _0xD54A["opit"];
        var _0xD637 = _0xD54A["pit"];
        if (_0xD599) {
            if (_0xD599 - _0xD637 == 7) {
                _0xD5E8 = 12
            } else {
                if (_0xD599 - _0xD637 == -7) {
                    _0xD5E8 = -12
                } else {
                    if (_0xD599 - _0xD637 == 14) {
                        _0xD5E8 = 24
                    } else {
                        if (_0xD599 - _0xD637 == -14) {
                            _0xD5E8 = -24
                        }
                    }
                }
            }
        }
    }
    ;if (cen["octave"]) {
        _0xD5E8 -= cen["octave"] * 12
    }
    ;var _0xD45D = cen["clef_type"];
    var _0x93DE = new Object();
    var _0xAFF3 = "";
    var _0xD4FB = -1;
    if (_0xD45D == "t") {
        var _0xD6D5 = [1, 2, 2, 2, 1, 2, 2];
        var _0xD724 = [2, 2, 1, 2, 2, 2, 1];
        var _0xD773 = 64;
        var _0xB17E = parseInt(_0x62CD / 7);
        var _0xA6B1 = _0x62CD % 7;
        var _0x84BF = 0;
        if (_0x62CD >= 0) {
            _0x84BF = _0xB17E * 12 + getArrSum(_0xD6D5, _0xA6B1)
        } else {
            if (_0x62CD < 0) {
                _0x84BF = _0xB17E * 12 - getArrSum(_0xD724, Math["abs"](_0xA6B1))
            }
        }
        ;_0xD4FB = _0xD773 + _0x84BF
    } else {
        if (_0xD45D == "b") {
            var _0xD321 = [2, 2, 1, 2, 2, 1, 2];
            var _0xD370 = [2, 1, 2, 2, 1, 2, 2];
            var _0xD3BF = 43;
            var _0xB17E = parseInt(_0x62CD / 7);
            var _0xA6B1 = _0x62CD % 7;
            var _0x84BF = 0;
            if (_0x62CD >= 0) {
                _0x84BF = _0xB17E * 12 + getArrSum(_0xD321, _0xA6B1)
            } else {
                if (_0x62CD < 0) {
                    _0x84BF = _0xB17E * 12 - getArrSum(_0xD370, Math["abs"](_0xA6B1))
                }
            }
            ;_0xD4FB = _0xD3BF + _0x84BF
        } else {
            if (_0xD45D === "p") {
                _0xD4FB = 71;
                _0xD5E8 = 0
            } else {
                if (_0xD45D == "c") {
                    var _0xD40E = 0;
                    for (var _0x5E7B = cen["istart"]; _0x5E7B > 0; _0x5E7B--) {
                        var _0xD4AC = syms[_0x5E7B];
                        if (_0xD4AC && _0xD4AC["type"] == 1) {
                            if (_0xD4AC["clef_type"] == "c") {
                                _0xD40E = _0xD4AC["clef_line"];
                                break
                            }
                        }
                    }
                    ;if (_0xD40E == 3) {
                        var _0xD6D5 = [2, 2, 2, 1, 2, 2, 1];
                        var _0xD724 = [1, 2, 2, 1, 2, 2, 2];
                        var _0xD2D2 = 53;
                        var _0xB17E = parseInt(_0x62CD / 7);
                        var _0xA6B1 = _0x62CD % 7;
                        var _0x84BF = 0;
                        if (_0x62CD >= 0) {
                            _0x84BF = _0xB17E * 12 + getArrSum(_0xD6D5, _0xA6B1)
                        } else {
                            if (_0x62CD < 0) {
                                _0x84BF = _0xB17E * 12 - getArrSum(_0xD724, Math["abs"](_0xA6B1))
                            }
                        }
                        ;_0xD4FB = _0xD2D2 + _0x84BF
                    } else {
                        if (_0xD40E == 4) {
                            var _0xD6D5 = [2, 1, 2, 2, 2, 1, 2];
                            var _0xD724 = [2, 1, 2, 2, 2, 1, 2];
                            var _0xD2D2 = 50;
                            var _0xB17E = parseInt(_0x62CD / 7);
                            var _0xA6B1 = _0x62CD % 7;
                            var _0x84BF = 0;
                            if (_0x62CD >= 0) {
                                _0x84BF = _0xB17E * 12 + getArrSum(_0xD6D5, _0xA6B1)
                            } else {
                                if (_0x62CD < 0) {
                                    _0x84BF = _0xB17E * 12 - getArrSum(_0xD724, Math["abs"](_0xA6B1))
                                }
                            }
                            ;_0xD4FB = _0xD2D2 + _0x84BF
                        }
                    }
                }
            }
        }
    }
    ;var _0xD686 = getTransposeByShift();
    _0xAFF3 = findStandNoteByIndex(_0xD4FB + _0xD5E8 - _0xD686);
    _0x93DE["note"] = _0xAFF3;
    _0x93DE["note_seq"] = _0xD4FB + _0xD5E8;
    return _0x93DE
}
function genChordNote(cen, _0xAFF3) {
    var _0xAE68 = new Object();
    var _0x5D8E = $("#source")["val"]();
    var _0x772B = _0x5D8E["substring"](cen["istart"], cen["iend"]);
    var _0xAFA4 = "";
    var _0xB12F = cen["p_v"]["ulen"];
    var _0xAF06 = cen["dur"];
    if (cen["tie_s"]) {
        var _0xB042 = cen["tie_s"];
        var _0xB091 = _0x5D8E["substring"](_0xB042["istart"], _0xB042["iend"]);
        if (_0xB091["indexOf"]("[") > -1) {
            _0xB091 = _0xB091["replace"]("[", "")["replace"]("]", "")
        }
        ;var _0xAF55 = _0xB091 + _0xAFF3 + getLenStr(_0xB12F, _0xB042["dur"]);
        _0xAE68["tie_str"] = "[" + _0xAF55 + "]"
    }
    ;if (_0x772B["indexOf"]("[") > -1) {
        var _0xAEB7 = /\[(.[^\[]*)\]/;
        var _0x9792 = _0x772B["match"](_0xAEB7);
        if (_0x9792[1] != _0x772B["replace"]("[", "")["replace"]("]", "")) {
            _0xAFA4 = "[" + _0x9792[1] + _0xAFF3 + "]" + getLenStr(_0xB12F, _0xAF06)
        } else {
            _0xAFA4 = "[" + _0x772B["replace"]("[", "")["replace"]("]", "") + _0xAFF3 + getLenStr(_0xB12F, _0xAF06) + "]"
        }
    } else {
        var _0xB0E0 = "";
        if (cen["tie_s"]) {
            _0xB0E0 = "-"
        }
        ;_0xAFA4 = "[" + _0x772B + _0xAFF3 + getLenStr(_0xB12F, _0xAF06) + _0xB0E0 + "]"
    }
    ;_0xAE68["chordNoteStr"] = _0xAFA4;
    return _0xAE68
}
function genNoteAndDur(_0xAFF3, cen, _0xBB5E, _0xBB0F, _0xBA22) {
    if (!cen || !cen["p_v"]) {
        return
    }
    ;durSetting = durSetting - 0;
    var _0x93DE = new Object();
    var _0xB7F9 = 384;
    var _0x5D8E = $("#source")["val"]();
    var _0xB848 = beatSum(cen);
    var _0xB897 = "";
    var _0x8296 = _0x5D8E["substring"](cen["istart"], cen["iend"]);
    if (_0xB848 != 0 && parseInt(_0xB848) == _0xB848) {
        if (_0x5D8E["substr"](cen["istart"] - 1, 1) != " ") {
            _0xB897 = " ";
            hasAddBlank = true
        }
    }
    ;var _0xB21C = cen["dur"];
    if (user["pasteNote"]) {
        _0xB21C = cen["dur"]
    }
    ;var _0xB8E6 = new Array();
    var _0xBBFC = null;
    var _0xB12F = cen["p_v"]["ulen"];
    _0x93DE["ulen"] = _0xB12F;
    _0x93DE["note_dur"] = durSetting;
    var _0xB984 = durSetting;
    if (user["pasteNote"]) {
        if (user["copyNoteInfo"]["dur"]) {
            durSetting = user["copyNoteInfo"]["dur"]
        } else {
            durSetting = user["copyNoteInfo"]["s"]["dur"]
        }
        ;_0x93DE["note_dur"] = durSetting
    }
    ;if (!_0xBB5E && graph_update && midiInStatus == false && !user["pasteNote"] && !_0xBA22) {
        _0xB897 = "";
        _0x93DE["noteStr"] = _0x8296["replace"](/[a-gA-G_^=,']*/, _0xAFF3);
        _0x93DE["del_s"] = _0xB8E6;
        _0x93DE["update_dur_s"] = _0xBBFC;
        return _0x93DE
    }
    ;var _0xB9D3 = parseInt(durSetting) + 0;
    var _0xBBAD = /([\/0-9]+)/g;
    if (_0xBB5E) {
        durSetting = _0xBB0F;
        fixedLen = true
    }
    ;if (cen["grace"]) {
        var _0x8296 = _0xAFF3 + (!fixedLen ? getLenStr(_0xB12F, durSetting) : "");
        if (user["pasteNote"]) {
            _0x8296 = _0xAFF3
        }
        ;_0x93DE["oriNoteStr"] = _0x8296;
        _0x93DE["noteStr"] = _0x8296
    } else {
        if (cen["in_tuplet"]) {
            var _0x8296 = _0xAFF3 + (!fixedLen ? getLenStr(_0xB12F, cen["dur_orig"]) : "");
            if (user["pasteNote"]) {
                _0x8296 = _0xAFF3
            }
            ;_0x93DE["oriNoteStr"] = _0x8296;
            _0x93DE["noteStr"] = _0x8296
        } else {
            if (_0xB21C == durSetting) {
                var _0x8296 = _0xAFF3 + (!fixedLen ? getLenStr(_0xB12F, durSetting) : "");
                if (user["pasteNote"]) {
                    _0x8296 = _0xAFF3
                } else {
                    if (cen["notes"]["length"] > 0) {
                        if ($(".selected_text")["length"] > 0 && cen["notes"]["length"] > 1) {
                            var _0xBC4B = parseInt($(".selected_text")["attr"]("update_index"));
                            if (isNaN(_0xBC4B)) {} else {
                                var _0xBA71 = _0x5D8E["substring"](cen["istart"], cen["iend"]);
                                var _0x81A9 = str2notes(_0xBA71["replace"](/[\[\]]/g, ""));
                                console["log"]("\u5f53\u524d\u4fee\u6539\u7684\u97f3\u7b26\u662f\uff1a", _0x81A9[_0xBC4B]);
                                var _0xBC9A = _0x81A9[_0xBC4B]["note"];
                                _0x8296 = _0xBA71["replace"](_0xBC9A, _0x8296)
                            }
                        }
                    }
                }
                ;_0x93DE["oriNoteStr"] = _0x8296;
                _0x93DE["noteStr"] = _0xB897 + _0x8296
            } else {
                if (_0xB21C < durSetting) {
                    var _0xB935 = durSetting - _0xB21C;
                    var _0x80BC = cen["next"];
                    while (_0x80BC) {
                        if (_0x80BC["type"] != 8 && _0x80BC["type"] != 10) {
                            if (_0x80BC["type"] == 0) {
                                _0x93DE["del_nodeline"] = 1;
                                _0x93DE["dur_nodeline_behind"] = _0xB935
                            }
                            ;_0xB8E6["push"](abc["clone"](_0x80BC, 2));
                            _0x80BC = _0x80BC["next"];
                            if (_0x80BC == null) {
                                for (var _0x5E7B = cen["istart"] + 1, _0xAB03 = syms["length"]; _0x5E7B < _0xAB03; _0x5E7B++) {
                                    var _0xB17E = syms[_0x5E7B];
                                    if (_0xB17E) {
                                        if (_0xB17E["v"] == cen["v"] && (_0xB17E["type"] == 8 || _0xB17E["type"] == 10)) {
                                            _0x80BC = _0xB17E;
                                            break
                                        }
                                    }
                                }
                            }
                            ;continue
                        }
                        ;if ((_0x80BC["type"] == 8 || _0x80BC["type"] == 10) && _0x80BC["dur"] <= _0xB935) {
                            _0xB935 = _0xB935 - _0x80BC["dur"];
                            if (_0xB935 <= 0) {
                                if (_0xB935 == 0) {
                                    _0xB8E6["push"](abc["clone"](_0x80BC, 2))
                                } else {
                                    if (_0xB935 < 0) {
                                        _0xBBFC = _0x80BC;
                                        _0xBBFC["dur"] = _0x80BC["dur"] - _0xB935;
                                        _0xBBFC["dur_orig"] = _0xBBFC["dur"];
                                        _0xBBFC["notes"]["forEach"](function(_0x6BC0, _0x5E7B) {
                                            _0xBBFC["notes"][_0x5E7B]["dur"] = _0xBBFC["dur"]
                                        });
                                        var _0xBCE9 = _0x5D8E["substring"](_0xBBFC["istart"], _0xBBFC["iend"]);
                                        _0xBCE9 = _0xBCE9["replace"](_0xBBAD, "");
                                        _0xBBFC["restStr"] = _0xBCE9 + getDurStrByNoteDur(_0xBBFC["dur"], _0xB12F)
                                    }
                                }
                                ;break
                            }
                            ;_0xB8E6["push"](abc["clone"](_0x80BC, 2));
                            _0x80BC = _0x80BC["next"]
                        } else {
                            _0xBBFC = _0x80BC;
                            _0xBBFC["dur"] = _0x80BC["dur"] - _0xB935;
                            _0xBBFC["dur_orig"] = _0xBBFC["dur"];
                            _0xBBFC["notes"]["forEach"](function(_0x6BC0, _0x5E7B) {
                                _0xBBFC["notes"][_0x5E7B]["dur"] = _0xBBFC["dur"]
                            });
                            var _0xBCE9 = _0x5D8E["substring"](_0xBBFC["istart"], _0xBBFC["iend"]);
                            _0xBCE9 = _0xBCE9["replace"](_0xBBAD, "");
                            _0xBBFC["restStr"] = _0xBCE9 + getDurStrByNoteDur(_0xBBFC["dur"], _0xB12F);
                            break
                        }
                    }
                    ;var _0x8296 = _0xAFF3 + (!fixedLen ? getLenStr(_0xB12F, durSetting) : "");
                    if (user["pasteNote"]) {
                        _0x8296 = _0xAFF3
                    }
                    ;_0x93DE["oriNoteStr"] = _0x8296;
                    _0x93DE["noteStr"] = _0xB897 + _0x8296
                } else {
                    var _0xB935 = _0xB21C - durSetting;
                    var _0xBAC0 = "";
                    if (_0xB935 >= durSetting) {
                        if (dot_selected_value != "") {
                            _0xBAC0 += "z," + getLenStr(_0xB12F, durSettingNotDot * 2 - durSetting);
                            _0xB935 = _0xB935 - (durSettingNotDot * 2 - durSetting);
                            for (var _0x5E7B = 2; _0x5E7B < 20; _0x5E7B = _0x5E7B * 2) {
                                if (_0xB935 > 0) {
                                    if ((_0xB935 - durSettingNotDot * _0x5E7B) > 0) {
                                        _0xBAC0 += "z," + getLenStr(_0xB12F, durSettingNotDot * _0x5E7B)
                                    } else {
                                        _0xBAC0 += "z," + getLenStr(_0xB12F, _0xB935);
                                        _0xB935 = 0;
                                        break
                                    }
                                    ;_0xB935 = _0xB935 - durSettingNotDot * _0x5E7B
                                } else {
                                    break
                                }
                            }
                        } else {
                            _0xBAC0 += "z," + getLenStr(_0xB12F, durSetting);
                            _0xB935 = _0xB935 - durSetting;
                            for (var _0x5E7B = 2; _0x5E7B < 20; _0x5E7B = _0x5E7B * 2) {
                                if (_0xB935 > 0) {
                                    if ((_0xB935 - durSetting * _0x5E7B) > 0) {
                                        _0xBAC0 += "z," + getLenStr(_0xB12F, durSetting * _0x5E7B)
                                    } else {
                                        _0xBAC0 += "z," + getLenStr(_0xB12F, _0xB935);
                                        _0xB935 = 0;
                                        break
                                    }
                                    ;_0xB935 = _0xB935 - durSetting * _0x5E7B
                                } else {
                                    break
                                }
                            }
                        }
                    } else {
                        _0xBAC0 += "z," + getLenStr(_0xB12F, _0xB935)
                    }
                    ;var _0x8296 = _0xAFF3 + (!fixedLen ? getLenStr(_0xB12F, durSetting) : "");
                    if (user["pasteNote"]) {
                        _0x8296 = _0xAFF3
                    }
                    ;_0x93DE["oriNoteStr"] = _0x8296;
                    _0x93DE["noteStr"] = _0xB897 + _0x8296 + _0xBAC0
                }
            }
        }
    }
    ;if (_0xBB5E) {
        fixedLen = false
    }
    ;durSetting = _0xB9D3;
    _0x93DE["del_s"] = _0xB8E6;
    _0x93DE["update_dur_s"] = _0xBBFC;
    if (user["pasteNote"]) {
        durSetting = _0xB984
    }
    ;return _0x93DE
}
function genRestStrByDur(_0xB12F, _0xB21C, _0xC62B) {
    return "z," + getDurStrByNoteDur(_0xB21C, _0xB12F);
    if (1 == 1) {
        return
    }
    ;var _0xC58D = _0xC62B;
    var _0xB935 = _0xB21C - _0xC58D;
    var _0xBAC0 = "";
    if (_0xB935 >= _0xC58D) {
        var _0xC5DC = getLenStr(_0xB12F, _0xC58D);
        _0xBAC0 += "z" + _0xC5DC;
        var _0x6997 = 0;
        for (var _0x5E7B = 2; _0x5E7B < 20; _0x5E7B = _0x5E7B * 2) {
            if (_0xB935 > 0) {
                _0xBAC0 += "z" + getLenStr(_0xB12F, _0xC58D * _0x5E7B);
                _0xB935 = _0xB935 - _0xC58D * _0x5E7B * 2
            }
        }
    } else {
        if (_0xB935 == 0) {
            _0xB935 = _0xB21C
        }
        ;_0xBAC0 += "z" + getLenStr(_0xB12F, _0xB935)
    }
    ;return _0xBAC0
}
function beatSum(cen) {
    var _0x6632 = 0;
    for (var _0x5E7B = cen["istart"] - 1; _0x5E7B > 0; _0x5E7B--) {
        if (syms[_0x5E7B] && syms[_0x5E7B]["type"] == 0) {
            break
        }
        ;if (!syms[_0x5E7B]) {
            continue
        }
        ;if (syms[_0x5E7B]["type"] == 8 || syms[_0x5E7B]["type"] == 10) {
            var _0x6681 = syms[_0x5E7B];
            if (_0x6681["in_tuplet"]) {
                _0x6632 += _0x6681["dur"]
            } else {
                _0x6632 += _0x6681["dur_orig"]
            }
        }
    }
    ;var _0x65E3 = cen["my_meter"];
    if (_0x65E3 != null && _0x65E3["length"] > 0) {
        var _0x66D0 = _0x65E3[0]["top"];
        var _0x6594 = _0x65E3[0]["bot"];
        if ((_0x66D0 % 3 == 0) && _0x6594 == 8) {
            return _0x6632 / 576
        }
    }
    ;return _0x6632 / 384
}
function getLastMeter(_0x622F) {
    var _0x93DE = new Object();
    _0x93DE["wmeasure"] = 768;
    _0x93DE["beat"] = 2;
    _0x93DE["perBeat"] = 384;
    for (var _0x5E7B = _0x622F; _0x5E7B > 0; _0x5E7B--) {
        if (!syms[_0x5E7B]) {
            continue
        }
        ;if (syms[_0x5E7B]["type"] == 6) {
            _0x93DE["wmeasure"] = syms[_0x5E7B]["wmeasure"];
            _0x93DE["beat"] = syms[_0x5E7B]["a_meter"][0]["top"]
        }
    }
    ;return _0x93DE
}
function getLenStr(_0xB12F, _0xAB03) {
    if (_0xAB03 == 0) {
        return ""
    }
    ;return getDurStrByNoteDur(_0xAB03, _0xB12F)
}
function replaceNote(_0xF64F, _0x622F, _0x7F31, _0xB26B) {
    if (update_note_istart < _0x622F || update_note_istart > _0x7F31) {
        update_note_istart = -99999
    }
    ;var _0x8296 = _0xB26B["noteStr"];
    var _0x5D8E = $("#" + _0xF64F)["val"]();
    var _0xB8E6 = _0xB26B["del_s"];
    var _0xF69E = _0xB26B["update_dur_s"];
    var _0xF562 = "";
    var _0xF6ED = "";
    if (_0xB8E6["length"] > 0) {
        for (var _0x5E7B = _0xB8E6["length"] - 1; _0x5E7B >= 0; _0x5E7B--) {
            var _0x6681 = _0xB8E6[_0x5E7B];
            if (_0x6681["type"] == 8) {
                if (graphEditor["pianoImpro"] && typeof (graphEditor["pianoImpro"]["noteUpdate"]) == "function") {
                    _0x5D8E = graphEditor["pianoImpro"]["noteUpdate"](_0x6681["istart"], "")
                }
            }
        }
        ;_0xB8E6["forEach"](function(_0x6681) {
            if (_0x6681["type"] == 0) {
                _0xF562 = _0x5D8E["substring"](_0x6681["istart"], _0x6681["iend"]);
                if (_0x5D8E["substr"](_0x6681["iend"], 1) == "$") {
                    _0xF562 += "$"
                }
            }
            ;_0x7F31 = _0x6681["iend"]
        })
    }
    ;if (_0xF69E != null) {
        _0x7F31 = _0xF69E["iend"]
    }
    ;if (_0xF562 != "" && _0xB26B["dur_nodeline_behind"]) {
        var _0xD811 = syms[_0x622F]["my_wmeasure"];
        _0x8296 = getNoteStr_(_0xD811, _0xB26B);
        _0xF6ED = _0xB26B["note"] + getLenStr(_0xB26B["ulen"], _0xB26B["dur_nodeline_behind"]);
        if (_0xF69E != null) {
            _0xF6ED += _0xF69E["restStr"]
        }
    } else {
        if (_0xF69E != null) {
            _0xF6ED += _0xF69E["restStr"]
        }
    }
    ;_0x5D8E = _0x5D8E["substr"](0, _0x622F) + _0x8296 + _0xF562 + _0xF6ED + _0x5D8E["substr"](_0x7F31);
    _0x5D8E = replaceBlankLine(_0x5D8E);
    $("#" + _0xF64F)["val"](_0x5D8E);
    doLog();
    if (musicType == 2) {
        hasTempo = false;
        render()
    } else {
        render()
    }
    ;if (chordNote != "" && (!graphEditor["pianoImpro"] || !graphEditor["pianoImpro"]["isOpen"])) {
        setTimeout(function() {
            if (hasAddBlank) {
                _0x622F = parseInt(_0x622F) + 1
            }
            ;var _0x6681 = syms[_0x622F];
            updateLyrics(_0x6681, [chordNoteLyric])
        }, 100)
    }
    ;if (user["midiInput"]) {
        var _0xF5B1 = $("svg ." + _0x622F);
        if (_0xF5B1["length"] > 0) {
            _0xF5B1[0]["scrollIntoView"]()
        }
    }
    ;if ($("#micInput")["hasClass"]("menu-pressed")) {
        var _0xF600 = syms[_0x622F];
        if (_0xF600) {
            console["log"]("micInput:", _0x622F);
            var _0xF5B1 = $("svg ." + _0xF600["istart"] + "[x]");
            if (_0xF5B1["length"] > 0) {
                var _0x6409 = parseInt($($(_0xF5B1)[0])["attr"]("x")) * scale;
                var _0x8D14 = $(".right-top-content")["width"]();
                if (_0x6409 > _0x8D14 / 2) {
                    $(".right-top-content")["stop"]()["animate"]({
                        scrollLeft: _0x6409 - _0x8D14 / 2 + "px"
                    }, 1000)
                }
            }
        }
    }
    ;if (_0xF69E != null && graphEditor["pianoImpro"] && typeof (graphEditor["pianoImpro"]["noteUpdate"]) == "function") {
        if (!syms[_0x622F]) {
            return
        }
        ;var _0x80BC = syms[_0x622F]["next"];
        var _0x5DDD = 20;
        while (_0x80BC && _0x5DDD > 0) {
            if (_0x80BC["type"] == 10) {
                graphEditor["pianoImpro"]["noteUpdate"](_0x80BC["istart"])
            } else {
                if (_0x80BC["type"] == 0) {
                    _0x80BC = null;
                    _0x5DDD = 0;
                    break
                }
            }
            ;_0x80BC = _0x80BC["next"];
            _0x5DDD--
        }
    }
}
function getNoteStr_(_0xD811, _0xB26B) {
    var _0xAF06 = _0xB26B["note_dur"] - _0xB26B["dur_nodeline_behind"];
    var _0xC854 = new Array();
    while (_0xAF06 > _0xD811) {
        var _0x772B = _0xB26B["note"] + getLenStr(_0xB26B["ulen"], _0xD811) + "- ";
        _0xC854["push"](_0x772B);
        _0xAF06 = _0xAF06 - _0xD811
    }
    ;if (_0xAF06 > 0) {
        var _0x772B = _0xB26B["note"] + getLenStr(_0xB26B["ulen"], _0xAF06) + "- ";
        _0xC854["push"](_0x772B)
    }
    ;var _0xACDD = "";
    if (_0xC854["length"] > 0) {
        for (var _0x5E7B = _0xC854["length"]; _0x5E7B > 0; _0x5E7B--) {
            if (_0x5E7B > 1) {
                _0xACDD += _0xC854[_0x5E7B - 1] + "|"
            } else {
                _0xACDD += _0xC854[_0x5E7B - 1]
            }
        }
    }
    ;return _0xACDD
}
function getArrSum(_0xC854, _0xB3F6) {
    var _0xC8A3 = 0;
    for (var _0x5E7B = 0; _0x5E7B < _0xB3F6; _0x5E7B++) {
        _0xC8A3 += _0xC854[_0x5E7B]
    }
    ;return _0xC8A3
}
function play_note(_0xF426, _0xAF06) {
    var _0xB358 = new Array();
    var _0xB309 = new Object();
    _0xB309["pitch"] = _0xF426;
    _0xB309["dur"] = _0xAF06;
    _0xB309["time"] = 0;
    _0xB358["push"](_0xB309);
    if (_0xF426 != -1) {
        play_notes(_0xB358)
    }
}
function play_notes(_0x8247) {
    if (!graphEditor["isPlayNote"]) {
        return
    }
    ;var _0xF4C4 = 768;
    for (var _0x5E7B = 0; _0x5E7B < syms["length"]; _0x5E7B++) {
        if (syms[_0x5E7B]) {
            var _0x6681 = syms[_0x5E7B];
            if (_0x6681["tempo"]) {
                var _0x951A = 0;
                var _0xB17E = _0x6681["tempo_notes"]["length"];
                for (j = 0; j < _0xB17E; j++) {
                    _0x951A += _0x6681["tempo_notes"][j]
                }
                ;_0xF4C4 = _0x951A * _0x6681["tempo"] / 60;
                break
            }
        }
    }
    ;var _0xF475 = new Array();
    var _0xF513 = 0;
    for (var _0x5E7B = 0; _0x5E7B < _0x8247["length"]; _0x5E7B++) {
        var _0xAFF3 = new Float32Array(7);
        _0xAFF3[0] = -1;
        _0xAFF3[1] = _0x8247[_0x5E7B]["time"];
        _0xAFF3[2] = 0;
        _0xAFF3[3] = _0x8247[_0x5E7B]["pitch"];
        _0xAFF3[4] = parseInt(_0x8247[_0x5E7B]["dur"]) / _0xF4C4;
        _0xAFF3[5] = 1;
        _0xAFF3[6] = 0;
        _0xF475["push"](_0xAFF3)
    }
    ;if (typeof (doPlayNotes) == "function") {
        doPlayNotes(_0xF475)
    } else {
        play["abcplay"]["play"](0, _0xF475["length"], _0xF475)
    }
}
var delObj = null;
var svgArr = new Array();
var clickTimeMill = -1;
function graphMouseDownHandle(_0xDE3D) {
    if ($("rect[type=\'startpoint\']")["length"]) {
        src_change();
        return
    }
    ;$("rect[type!=\'bg_rect\']")["css"]("fill-opacity", "0");
    $("rect[type=\'splplaceholder\']")["css"]("fill-opacity", "");
    $("rect[recttype=\'movedragger\']")["remove"]();
    var _0x71EC = document["getElementById"]("source");
    if (window["getSelection"]) {
        if (_0x71EC["selectionStart"] != undefined && _0x71EC["selectionEnd"] != undefined) {
            if (_0x71EC["selectionStart"] != _0x71EC["selectionEnd"]) {
                _0x71EC["blur"]();
                _0x71EC["focus"]();
                _0x71EC["selectionStart"] = 0;
                _0x71EC["selectionEnd"] = 0
            }
        }
    }
    ;clickTimeMill = new Date()["getTime"]();
    if (_0xDE3D["path"]) {
        var _0xDF79 = $(_0xDE3D["path"][0])["attr"]("type");
        if (_0xDF79 == "brace" || _0xDF79 == "bracket") {
            $(".selected_text")["removeClass"]("selected_text");
            $("rect[dragtype=\"linkclef\"]")["remove"]();
            return
        }
    }
    ;$("#ctxMenu")["hide"]();
    $("[cat=\"decos\"]")["removeAttr"]("selected");
    $("[cat=\"decos\"]")["removeClass"]("selected_path");
    $("text[type=\"zs\"]")["removeAttr"]("selected");
    $("text[type=\"zs\"]")["css"]("color", "");
    $("rect[type=\"bar\"][selected=\"selected\"]")["css"]("fill-opacity", "0")["removeAttr"]("selected");
    console["log"]("dragDecoFlag:", dragDecoFlag);
    if (!dragDecoFlag) {
        $("rect[dragtype]")["remove"]()
    }
    ;$("[cat=\'decos\']")["css"]("color", "")["removeAttr"]("fill");
    $("text[type=\'hd\'],text[type=\'HD\']")["css"]("color", "");
    $("g[style]")["css"]("color", "");
    $(".editor-div")["blur"]();
    if (!_0xDE3D["ctrlKey"] && _0xDE3D["button"] != 2) {
        $(".selected_text")["removeClass"]("selected_text");
        $(".select_text_g")["removeClass"]("select_text_g");
        $("text[type=\"lyric\"]")["removeAttr"]("selected");
        $("text[type=\"lyric\"]")["each"](function(_0x5E7B, _0x6BC0) {
            var _0xE017 = $(_0x6BC0)["attr"]("style");
            if (_0xE017["indexOf"]("color: rgb(") < 0) {
                $(_0x6BC0)["css"]("color", "")
            }
        })
    }
    ;selectDecoInfo = null;
    selectGchInfo = null;
    console["log"]("graphMouseDownHandle");
    if (_0xDE3D["button"] == 2) {
        return
    }
    ;if ($("g[type=\'gcolor\']")["length"] > 0) {
        $("g[type=\'gcolor\']")["removeAttr"]("style")
    }
    ;$("svg[type=\'rectnode\']")["remove"]();
    $("#nodeMenu")["hide"]();
    var _0xDDEE = _0xDE3D["target"]
      , _0xDD50 = _0xDDEE["getAttribute"]("class");
    var _0x8C27 = _0xDE3D["target"];
    if (_0x8C27 == null) {
        return
    }
    ;if (_0x8C27["tagName"]["toLowerCase"]() != "svg") {
        var _0x938F = $(_0x8C27)["parents"]("svg");
        _0x8C27 = _0x938F[_0x938F["length"] - 1]
    } else {
        _0x8C27 = $(_0x8C27);
        if (_0x8C27["length"] > 1) {
            return
        }
    }
    ;if (_0xDE3D["touches"]) {
        _0xDE3D["offsetX"] = _0xDE3D["touches"][0]["pageX"] - $(_0x8C27)["offset"]()["left"];
        _0xDE3D["offsetY"] = _0xDE3D["touches"][0]["pageY"] - $(_0x8C27)["offset"]()["top"]
    }
    ;findNearNote(_0xDE3D, _0x8C27, _0xDE3D["offsetX"] / scale, _0xDE3D["offsetY"] / scale);
    if (select_note_info == null) {
        return
    }
    ;cen = syms[$(select_note_info["click_obj"])["attr"]("istart")];
    svgArr = $("#target")["find"]("svg");
    editSvgLineIndex = $(_0x8C27)["attr"]("id");
    if (select_note_info["click_obj"] == null || $(select_note_info["click_obj"])["attr"]("cat") == "decos") {
        if ($(select_note_info["click_obj"])["length"] > 0) {
            selectDecoInfo = select_note_info["click_obj"];
            _0xDE8C = true
        } else {
            var _0xDE8C = findNearDeco(_0xDE3D, _0x8C27, _0xDE3D["offsetX"] / scale, _0xDE3D["offsetY"] / scale);
            if (dragDecoFlag) {
                return
            }
        }
        ;if (_0xDE8C) {
            showProperties("deco", _0xDE3D);
            $(selectDecoInfo)["addClass"]("selected_text");
            var _0x6C0F = $(selectDecoInfo)[0]["getBBox"]();
            var _0x622F = $(selectDecoInfo)["attr"]("start");
            if (!_0x622F) {
                _0x622F = $(selectDecoInfo)["attr"]("istart")
            }
            ;$("rect[type=\'" + $(selectDecoInfo)["attr"]("type") + "\'][istart=\'" + _0x622F + "\']")["remove"]();
            var _0x8DB2 = 0
              , _0x8D63 = 0;
            if ($(selectDecoInfo)["attr"]("type") == "stc") {
                _0x8DB2 = 5;
                _0x8D63 = 5
            }
            ;var _0xDD9F = drawDecoRect(_0x6C0F["x"], _0x6C0F["y"], _0x6C0F["width"] + _0x8DB2, _0x6C0F["height"] + _0x8D63, _0x622F, $(selectDecoInfo)["attr"]("type"));
            $(selectDecoInfo)["parent"]()["append"](_0xDD9F);
            return
        }
        ;var _0xDEDB = findNearObjByType(_0xDE3D, _0x8C27, _0xDE3D["offsetX"] / scale, _0xDE3D["offsetY"] / scale, "zs");
        if (_0xDEDB) {
            var _0x75EF = $(event["target"]);
            if (event["target"]["tagName"] == "rect" && event["target"]["tagName"] == "text") {
                var _0x622F = $(_0x75EF)["attr"]("istart");
                selectGchInfo = $("text[type=\'zs\'][gch_istart=\'" + _0x622F + "\']");
                $(selectGchInfo)["attr"]("selected", "selected");
                $(selectGchInfo)["attr"]("my_chord", "my_chord");
                $(selectGchInfo)["css"]("color", "red");
                showProperties("chordinput", event);
                select_note_info = null;
                event["preventDefault"]();
                event["stopPropagation"]();
                return
            }
            ;showProperties("gch", _0xDE3D);
            event["preventDefault"]();
            event["stopPropagation"]();
            return false
        }
        ;var _0xDF2A = findNearObjByType(_0xDE3D, _0x8C27, _0xDE3D["offsetX"] / scale, _0xDE3D["offsetY"] / scale, "lyric");
        if (_0xDF2A) {
            showProperties("lyric", _0xDE3D);
            return
        }
        ;var _0x5D8E = $("#source")["val"]();
        if (musicType == 2) {
            selectSimpleNode(_0x8C27, _0xDE3D, scale, true);
            return
        }
        ;var _0xDFC8 = getStaffBotLineY(_0x8C27, _0xDE3D["offsetY"] / scale);
        var _0xDD01 = _0xDFC8 - _0xDE3D["offsetY"] / scale;
        if (_0xDD01 > 0 && _0xDD01 <= 24) {
            console["log"]("\u672a\u9009\u4e2d\u97f3\u7b26\uff0c\u4e14\u70b9\u51fb\u5728\u4e94\u7ebf\u5185");
            selectNode(_0x8C27, _0xDE3D, scale, true);
            showProperties("bar", _0xDE3D)
        }
    } else {
        if ($(select_note_info["click_obj"])["attr"]("cat") == "decos") {
            if (selectDecoInfo == null) {
                selectDecoInfo = $(select_note_info["click_obj"])
            }
            ;showProperties("deco", _0xDE3D);
            return
        } else {
            if ($(select_note_info["click_obj"])["attr"]("type") == "zs") {
                selectGchInfo = $(select_note_info["click_obj"]);
                showProperties("gch", _0xDE3D);
                return
            } else {
                if ($(select_note_info["click_obj"])["attr"]("type") == "lyric") {
                    selectGchInfo = $(select_note_info["click_obj"]);
                    showProperties("lyric", _0xDE3D);
                    return
                }
            }
        }
    }
}
function moveingRenderBar(_0x64A7) {
    console["log"]("\u5728\u79fb\u52a8\u5c0f\u8282\u7c7b\u7684\u88c5\u9970\u97f3", _0x64A7);
    var _0x75EF = _0x64A7["target"];
    if (_0x75EF["tagName"] == "svg") {
        var _0x8C27 = _0x75EF;
        selectBar(_0x8C27, _0x64A7, scale, false)
    }
}
function movingRenderStaff(_0x64A7) {
    console["log"]("\u5728\u79fb\u52a8\u8fde\u8c31\u53f7", _0x64A7);
    var _0x75EF = _0x64A7["target"];
    if (musicType == 0 || musicType == 1) {
        if (_0x75EF["tagName"] == "svg") {
            var _0x8C27 = _0x75EF;
            $(_0x8C27)["find"]("g[type=\'staff\']")["find"]("path")["css"]("stroke", "black");
            selectStaff(_0x8C27, _0x64A7)
        }
    } else {
        if (musicType == 2) {
            console["log"](_0x64A7["target"]);
            if (_0x75EF["tagName"] == "svg") {
                var _0x8C27 = _0x75EF;
                $(_0x8C27)["find"]("g[type=\'bar_datas\']")["find"]("text")["css"]("stroke", "black");
                selectStaff(_0x8C27, _0x64A7)
            }
        }
    }
}
function selectStaff(_0x8C27, _0x64A7) {
    var _0xFD19 = _0x64A7["offsetY"];
    var _0xA172 = 99999;
    var _0xC4EF = -1;
    if (musicType == 0 || musicType == 1) {
        $(_0x8C27)["find"]("g[type=\'staff\']")["each"](function(_0x5E7B, _0x6BC0) {
            var _0x96A5 = $(_0x6BC0)["attr"]("transform");
            if (_0x96A5) {
                var _0x92F1 = getTransformsTranslate(_0x96A5);
                if (_0xFD19 < _0x92F1["y"] * scale && _0xFD19 > ((_0x92F1["y"] - 24) * scale)) {
                    _0xC4EF = $(_0x6BC0)["attr"]("st");
                    return false
                }
            }
        })
    } else {
        if (musicType == 2) {
            $(_0x8C27)["find"]("g[type=\'bar_datas\']")["each"](function(_0x5E7B, _0x6BC0) {
                var _0x96A5 = $(_0x6BC0)["attr"]("transform");
                if (_0x96A5) {
                    var _0x92F1 = getTransformsTranslate(_0x96A5);
                    console["log"]("-----", _0xFD19, _0x92F1["y"], _0x92F1["y"] * scale, ((parseFloat(_0x92F1["y"]) + 24) * scale));
                    if (_0xFD19 > _0x92F1["y"] * scale && _0xFD19 <= ((parseFloat(_0x92F1["y"]) + 24) * scale)) {
                        _0xC4EF = $(_0x6BC0)["attr"]("st");
                        return false
                    }
                }
            })
        }
    }
    ;if (_0xC4EF != -1) {
        if (musicType == 0 || musicType == 1) {
            $(_0x8C27)["find"]("g[type=\'staff\'][st=\'" + _0xC4EF + "\']")["find"]("path")["css"]("stroke", "red")["addClass"]("select_staff")
        } else {
            $(_0x8C27)["find"]("g[type=\'bar_datas\'][st=\'" + _0xC4EF + "\']")["find"]("text")["css"]("stroke", "red")["addClass"]("select_staff")
        }
        ;selectedStaffNum = _0xC4EF
    }
}
function findNearNote(_0x64A7, _0x90C8, _0x6409, _0x6458) {
    console["log"]("findnearnote...");
    select_note_info = new Object();
    delObj = new Object();
    var _0xA34C = null;
    $(_0x90C8)["find"]("text")["each"](function(_0x5E7B, _0x6BC0) {
        var _0x9A59 = $(this)["attr"]("x");
        var _0x9AA8 = $(this)["attr"]("y");
        var _0xA526 = 1;
        if (musicType == 2) {
            var _0x9656 = $(_0x6BC0)["parent"]();
            var _0x96A5 = $(_0x9656)["attr"]("transform");
            if (_0x96A5) {
                var _0x92F1 = getTransformsTranslate(_0x96A5);
                if (_0x92F1 != null) {
                    if (_0x9A59) {
                        _0x9A59 = parseFloat(_0x9A59) + parseFloat(_0x92F1["x"])
                    }
                    ;if (_0x9AA8) {
                        _0x9AA8 = parseFloat(_0x9AA8) + parseFloat(_0x92F1["y"])
                    }
                }
                ;if ($(_0x9656)["attr"]("isgrace") == "1") {
                    _0xA526 = getTransformsScale(_0x96A5)
                }
            }
            ;if ($(_0x9656)["hasClass"]("jpchord")) {
                var _0xA4D7 = $(_0x9656)["parent"]();
                var _0xA575 = $(_0xA4D7)["attr"]("transform");
                if (_0xA575) {
                    var _0xA5C4 = getTransformsTranslate(_0xA575);
                    if (_0xA5C4 != null) {
                        if (_0x9A59) {
                            _0x9A59 = parseFloat(_0x9A59) + parseFloat(_0xA5C4["x"])
                        }
                        ;if (_0x9AA8) {
                            _0x9AA8 = parseFloat(_0x9AA8) + parseFloat(_0xA5C4["y"])
                        }
                    }
                }
            }
        }
        ;if (!_0x9A59 || !_0x9AA8) {
            var _0x92A2 = $(_0x6BC0)["attr"]("transform");
            if (_0x92A2 && _0x92A2 != "") {
                var _0x7377 = /translate\((.[^\(]*)\)/;
                var _0x7328 = _0x92A2["match"](_0x7377);
                if (_0x7328 != null) {
                    var _0x94CB = _0x7328[1]["replace"](/\s/g, "");
                    var _0x947C = _0x94CB["split"](",");
                    _0x9A59 = _0x947C[0];
                    _0x9AA8 = _0x947C[1]
                }
            } else {
                return
            }
        }
        ;var _0x9CD1 = parseFloat(_0x9A59) * _0xA526;
        var _0x9D20 = parseFloat(_0x9AA8);
        if (musicType == 0) {
            if (_0x6409 >= _0x9CD1 - 3 && _0x6409 <= (_0x9CD1 + 6) && _0x6458 <= _0x9D20 + 3 && _0x6458 >= (_0x9D20 - 6)) {
                _0xA34C = $(this);
                if ($(_0xA34C)["attr"]("type") == "ghd") {} else {
                    $(_0xA34C)["attr"]("x", _0x9A59);
                    $(_0xA34C)["attr"]("y", _0x9AA8)
                }
            }
        } else {
            if (_0x6409 >= _0x9CD1 - 3 && _0x6409 <= (_0x9CD1 + 16) && _0x6458 <= _0x9D20 + 3 && _0x6458 >= (_0x9D20 - 16)) {
                _0xA34C = $(this)
            }
        }
    });
    $(_0x90C8)["find"]("text:not([type=\'title\'])")["css"]("fill", "");
    if (_0xA34C != null) {
        var _0x63BA = $(_0xA34C)["attr"]("type");
        if (_0x63BA && ($(_0xA34C)["attr"]("type")["indexOf"]("acc") == 0 || (eq("meter", _0x63BA)))) {
            var _0xA39B = $(_0xA34C)["attr"]("istart");
            $("text[istart=\'" + _0xA39B + "\']")["addClass"]("selected_text");
            clearFocus()
        } else {
            if (_0x63BA && _0x63BA == "tempo") {
                $(_0xA34C)["find"]("tspan")["addClass"]("selected_text");
                clearFocus();
                showProperties("tempo", _0x64A7)
            } else {
                if (_0x63BA && (_0x63BA["toLowerCase"]() == "hd" || _0x63BA == "note")) {
                    showProperties("note", _0x64A7, _0xA34C)
                } else {
                    if (_0x63BA && _0x63BA["indexOf"]("r") == 0) {
                        showProperties("rest", _0x64A7)
                    }
                }
                ;$(_0xA34C)["addClass"]("selected_text");
                addHelpAssessant($($(_0xA34C))["attr"]("istart"));
                clearFocus()
            }
        }
    }
    ;delObj["click_obj"] = _0xA34C;
    select_note_info["click_obj"] = _0xA34C;
    var _0x622F = $(select_note_info["click_obj"])["attr"]("istart");
    if (_0x622F != "") {
        var _0xA439 = $(select_note_info["click_obj"])["attr"]("y");
        var _0xA3EA = $(select_note_info["click_obj"])["parents"]("svg")["find"]("text[type=\'hd\']." + _0x622F + ",text[type=\'Hd\']." + _0x622F + ",text[type=\'HD\']." + _0x622F + ",text[type=\'note\'][istart=\'" + _0x622F + "\']")["sort"](function(_0x8699, _0x86E8) {
            return $(_0x86E8)["attr"]("y") - $(_0x8699)["attr"]("y")
        });
        var _0xA488 = -1;
        for (var _0x5E7B = 0; _0x5E7B < _0xA3EA["length"]; _0x5E7B++) {
            if (parseFloat(_0xA439) == parseFloat($(_0xA3EA[_0x5E7B])["attr"]("y"))) {
                _0xA488 = _0x5E7B
            }
        }
        ;$(select_note_info["click_obj"])["attr"]("ori_y", _0xA439);
        $(select_note_info["click_obj"])["attr"]("update_index", _0xA488)
    }
}
function findNearObjByType(_0x64A7, _0x90C8, _0x6409, _0x6458, _0xA79E) {
    var _0x942D = false;
    var _0x9E5C = "text[type=\'" + _0xA79E + "\']";
    if (_0xA79E == "use") {
        _0x9E5C = "use[cat=\'decos\']"
    }
    ;$(_0x90C8)["find"](_0x9E5C)["each"](function(_0x5E7B, _0x6BC0) {
        if (!_0x942D) {
            var _0x9A59 = $(this)["attr"]("x");
            var _0x9AA8 = $(this)["attr"]("y");
            var _0x9CD1 = parseFloat(_0x9A59);
            var _0x9D20 = parseFloat(_0x9AA8);
            var _0x96A5 = $(_0x6BC0)["parent"]()["attr"]("transform");
            var _0x92F1 = getTransformsTranslate(_0x96A5);
            if (_0x92F1 != null) {
                _0x9CD1 = _0x9CD1 + parseFloat(_0x92F1["x"]);
                _0x9D20 = _0x9D20 + parseFloat(_0x92F1["y"])
            }
            ;var _0x6C0F = $(this)[0]["getBBox"]();
            var _0x9C33 = 0
              , _0x9743 = 0;
            if (_0x6C0F) {
                _0x9C33 = _0x6C0F["width"];
                _0x9743 = _0x6C0F["height"]
            }
            ;if (_0x6409 >= _0x9CD1 && _0x6409 <= (_0x9CD1 + Math["abs"](_0x9C33)) && _0x6458 <= _0x9D20 && _0x6458 >= (_0x9D20 - _0x9743)) {
                $(_0x6BC0)["css"]("color", "red");
                $(_0x6BC0)["attr"]("fill", "red");
                $(_0x6BC0)["attr"]("selected", "selected");
                selectGchInfo = $(this);
                _0x942D = true;
                return true
            }
        }
    });
    return _0x942D
}
function findNearDeco(_0x64A7, _0x90C8, _0x6409, _0x6458) {
    var _0x942D = false;
    $(_0x90C8)["find"]("[cat=\'decos\']")["each"](function(_0x5E7B, _0x6BC0) {
        if (!_0x942D) {
            var _0x63BA = $(_0x6BC0)["attr"]("type");
            var _0x9A59 = $(this)["attr"]("x");
            var _0x9AA8 = $(this)["attr"]("y");
            if (_0x63BA && (_0x63BA == "invertedturn" || _0x63BA == "tubrn" || _0x63BA == "wedge" || _0x63BA == "accent" || (musicType == 2 && _0x63BA == "upb") || (musicType == 2 && _0x63BA["indexOf"]("inst_") == 0) || (musicType == 2 && _0x63BA == "sldrd2") || (musicType == 2 && _0x63BA == "sldrd_spl") || (musicType == 2 && _0x63BA == "sldru_spl") || (musicType == 2 && _0x63BA == "dnb") || (musicType == 2 && _0x63BA == "tenutoup") || (musicType == 2 && _0x63BA == "opend") || (musicType == 2 && _0x63BA == "dplus") || (musicType == 2 && _0x63BA == "snap") || (musicType == 2 && _0x63BA == "trl") || (musicType == 2 && _0x63BA == "rit") || (musicType == 2 && _0x63BA == "accel") || (musicType == 2 && _0x63BA == "sphr") || (musicType == 2 && _0x63BA == "kew1") || (musicType == 2 && _0x63BA == "kew2") || (musicType == 2 && _0x63BA == "kew3") || (musicType == 2 && _0x63BA == "kew4") || (musicType == 2 && _0x63BA == "kew5") || (musicType == 2 && _0x63BA == "kew6") || (musicType == 2 && _0x63BA == "kew7") || (musicType == 2 && _0x63BA == "kew8") || (musicType == 2 && _0x63BA == "img"))) {
                var _0x92A2 = $(_0x6BC0)["parent"]()["attr"]("transform");
                if (_0x92A2 && _0x92A2 != "") {
                    var _0x7377 = /translate\((.[^\(]*)\)/;
                    var _0x7328 = _0x92A2["match"](_0x7377);
                    if (_0x7328 != null) {
                        var _0x94CB = _0x7328[1]["replace"](/\s/g, "");
                        var _0x947C = _0x94CB["split"](",");
                        _0x9A59 = parseFloat(_0x947C[0]) + parseFloat(_0x9A59);
                        _0x9AA8 = parseFloat(_0x947C[1]) + parseFloat(_0x9AA8)
                    }
                }
            }
            ;var _0x9CD1 = parseFloat(_0x9A59);
            var _0x9D20 = parseFloat(_0x9AA8);
            if (_0x63BA == "img") {
                _0x9CD1 = _0x9CD1 - 5
            }
            ;var _0x6C0F = $(this)[0]["getBBox"]();
            var _0x9C33 = 0
              , _0x9743 = 0;
            if (_0x6C0F) {
                _0x9C33 = _0x6C0F["width"];
                _0x9743 = _0x6C0F["height"]
            }
            ;if (musicType != 2 && _0x63BA == "accent") {
                _0x9D20 += _0x9743
            }
            ;if (musicType != 2 && _0x63BA == "wedge") {}
            ;if (_0x63BA == "slur" || _0x63BA == "tie") {
                var _0x9B46 = $(this)["parents"]("svg")["offset"]()["top"] + $("#target")["scrollTop"]();
                var _0x9AF7 = $(this)["parents"]("svg")["offset"]()["left"];
                var _0x9656 = $(_0x6BC0)["parent"]();
                var _0x96A5 = $(_0x9656)["attr"]("transform");
                var _0x92F1 = getTransformsTranslate(_0x96A5);
                console["log"](_0x92F1);
                var _0x6C5E = this["getBoundingClientRect"]();
                var _0x6C0F = $(this)[0]["getBBox"]();
                var _0x9A0A, _0x996C, _0x99BB;
                var _0x631C = 8;
                _0x9CD1 = (_0x6C5E["x"] - _0x9AF7) / scale;
                _0x9D20 = (_0x6C5E["y"] - _0x9B46) / scale;
                if (_0x6409 >= _0x9CD1 && _0x6409 <= (_0x9CD1 + _0x6C0F["width"]) && _0x6458 >= _0x9D20 && _0x6458 <= (_0x9D20 + _0x6C0F["height"])) {
                    console["log"]("\u70b9\u51fb\u8fde\u53e5\u7ebf\u91cc\u9762", _0x64A7["target"]);
                    var _0x9BE4 = _0x64A7["target"];
                    var _0x85AC = $(_0x9BE4)["attr"]("dragtype");
                    var _0x9B95 = $(_0x9BE4)["attr"]("pos");
                    if (_0x85AC == "slur" && _0x9B95 == "mid") {
                        return
                    }
                    ;selectDecoInfo = $(this);
                    if ($(selectDecoInfo)["hasClass"]("selected_path")) {
                        showProperties("slur", _0x64A7);
                        return
                    }
                    ;console["log"]($(selectDecoInfo)["attr"]("d"));
                    var _0x8E01 = $(selectDecoInfo)["attr"]("d");
                    var _0x97E1 = getPathInfo(_0x8E01);
                    var _0x75EF = $(selectDecoInfo)["attr"]("id");
                    $(_0x6BC0)["addClass"]("selected_path");
                    $(_0x6BC0)["attr"]("selected", "selected");
                    _0x9A0A = drawRect(_0x63BA, _0x6C0F["x"] - _0x631C, _0x97E1["start"]["y"], _0x631C, "start", $(selectDecoInfo)["attr"]("start"), _0x75EF);
                    _0x996C = drawRect(_0x63BA, _0x6C0F["x"] + _0x6C0F["width"], parseFloat(_0x97E1["start"]["y"]) + parseFloat(_0x97E1["end"]["y"]), _0x631C, "end", $(selectDecoInfo)["attr"]("end"), _0x75EF);
                    $(selectDecoInfo)["parent"]()["append"](_0x9A0A);
                    $(selectDecoInfo)["parent"]()["append"](_0x996C);
                    setPathInfo(selectDecoInfo[0], _0x97E1);
                    $(selectDecoInfo)["parent"]()["parent"]()["append"]($(selectDecoInfo)["parent"]());
                    _0x942D = true;
                    showProperties("slur", _0x64A7);
                    return true
                }
            } else {
                if (_0x63BA == "jq" || _0x63BA == "jr") {
                    var _0x9A59 = $(this)["attr"]("x");
                    var _0x9AA8 = $(this)["attr"]("y");
                    if (!_0x9A59 || !_0x9AA8) {
                        var _0x92A2 = $(_0x6BC0)["attr"]("transform");
                        if (_0x92A2 && _0x92A2 != "") {
                            var _0x7377 = /translate\((.[^\(]*)\)/;
                            var _0x7328 = _0x92A2["match"](_0x7377);
                            if (_0x7328 != null) {
                                var _0x94CB = _0x7328[1]["replace"](/\s/g, "");
                                var _0x947C = _0x94CB["split"](",");
                                _0x9A59 = _0x947C[0];
                                _0x9AA8 = _0x947C[1]
                            }
                        }
                        ;var _0x98CE, _0x991D;
                        var _0x951A = $(_0x6BC0)["attr"]("d");
                        var _0x7377 = /m(.[^l]*)l/;
                        var _0x9792 = _0x951A["match"](_0x7377);
                        if (_0x9792["length"] != null) {
                            var _0x94CB = _0x9792[1]["replace"](/\s+/, " ");
                            var _0x947C = _0x94CB["split"](" ");
                            _0x98CE = _0x947C[0];
                            _0x991D = _0x947C[1]
                        }
                        ;var _0x9C82 = _0x951A["match"](/l(.[^l]*)l/);
                        var _0x987F, _0x9830;
                        if (_0x9C82 != null) {
                            var _0x94CB = _0x9C82[1]["replace"](/\s+/, " ");
                            var _0x947C = _0x94CB["split"](" ");
                            _0x987F = parseFloat(_0x947C[0]);
                            _0x9830 = Math["abs"](parseFloat(_0x947C[1]))
                        }
                        ;if (!_0x9A59) {
                            _0x9A59 = _0x98CE
                        } else {
                            _0x9A59 = parseFloat(_0x9A59) + parseFloat(_0x98CE)
                        }
                        ;if (!_0x9AA8) {
                            _0x9AA8 = _0x991D
                        } else {
                            _0x9AA8 = parseFloat(_0x9AA8) + parseFloat(_0x991D)
                        }
                    }
                    ;if ($(this)["attr"]("type")) {
                        console["log"]($(this)["attr"]("type"))
                    }
                    ;var _0x9CD1 = parseFloat(_0x9A59);
                    var _0x9D20 = parseFloat(_0x9AA8);
                    if (_0x987F < 0) {
                        _0x9CD1 = _0x9CD1 + _0x987F
                    }
                    ;if (_0x6409 >= _0x9CD1 && _0x6409 <= (_0x9CD1 + Math["abs"](_0x987F)) && _0x6458 <= _0x9D20 && _0x6458 >= (_0x9D20 - _0x9830 * 2)) {
                        selectDecoInfo = $(this);
                        if ($(selectDecoInfo)["attr"]("selected") === "selected") {
                            return
                        }
                        ;$(selectDecoInfo)["addClass"]("selected_path");
                        $(selectDecoInfo)["attr"]("selected", "selected");
                        var _0x9607 = $(selectDecoInfo)["attr"]("d");
                        var _0x95B8 = getDinfo(_0x9607);
                        if (_0x95B8 != null) {
                            var _0x631C = 8;
                            var _0x9A0A, _0x996C;
                            if (_0x95B8["lines"][0]["x"] > 0) {
                                _0x9A0A = drawRect(_0x63BA, _0x95B8["m"]["x"] - _0x631C, _0x95B8["m"]["y"] - 8, _0x631C, "start", $(selectDecoInfo)["attr"]("start"));
                                _0x996C = drawRect(_0x63BA, _0x95B8["m"]["x"] + _0x95B8["lines"][0]["x"], _0x95B8["m"]["y"] - 8, _0x631C, "end", $(selectDecoInfo)["attr"]("end"))
                            } else {
                                _0x9A0A = drawRect(_0x63BA, _0x95B8["m"]["x"], _0x95B8["m"]["y"] - 8, _0x631C, "end", $(selectDecoInfo)["attr"]("end"));
                                _0x996C = drawRect(_0x63BA, _0x95B8["m"]["x"] + _0x95B8["lines"][0]["x"] - _0x631C, _0x95B8["m"]["y"] - 8, _0x631C, "start", $(selectDecoInfo)["attr"]("start"))
                            }
                            ;$(selectDecoInfo)["parent"]()["append"](_0x9A0A);
                            $(selectDecoInfo)["parent"]()["append"](_0x996C)
                        }
                        ;_0x942D = true;
                        return true
                    }
                } else {
                    if (_0x63BA == "8va" || _0x63BA == "8vb" || _0x63BA == "15ma" || _0x63BA == "15mb") {
                        var _0x9B46 = $(this)["parents"]("svg")["offset"]()["top"] + $("#target")["scrollTop"]();
                        var _0x9AF7 = $(this)["parents"]("svg")["offset"]()["left"];
                        var _0x6C5E = this["getBoundingClientRect"]();
                        var _0x6C0F = $(this)[0]["getBBox"]();
                        console["log"]("box===", _0x6C5E);
                        console["log"]("bbox===", _0x6C0F);
                        console["log"]("x:", _0x6409, "  y:", _0x6458);
                        var _0x9A0A, _0x996C;
                        var _0x631C = 8;
                        _0x9CD1 = (_0x6C5E["x"] - _0x9AF7) / scale;
                        _0x9D20 = (_0x6C5E["y"] - _0x9B46) / scale;
                        console["log"]("wx:", _0x9CD1, "  wy:", _0x9D20);
                        if (_0x6409 >= _0x9CD1 && _0x6409 <= (_0x9CD1 + _0x6C0F["width"]) && _0x6458 >= _0x9D20 && _0x6458 <= (_0x9D20 + _0x6C0F["height"])) {
                            console["log"]("\u70b9\u51fb\u9ad88/15\u5ea6\u91cc\u9762");
                            selectDecoInfo = $(this);
                            if ($(selectDecoInfo)["hasClass"]("selected_path")) {
                                return
                            }
                            ;$(_0x6BC0)["addClass"]("selected_path");
                            $(_0x6BC0)["attr"]("selected", "selected");
                            _0x9A0A = drawRect(_0x63BA, _0x6C0F["x"] - 2 * _0x631C, _0x6C0F["y"], _0x631C, "start", $(selectDecoInfo)["attr"]("start"));
                            var _0x9569 = $("path[type=\'8va\'][start=\'" + $(selectDecoInfo)["attr"]("start") + "\']");
                            $["each"](_0x9569, function(_0x5E7B, _0x9D6F) {
                                $(_0x9D6F)["addClass"]("selected_path")
                            });
                            var _0x96F4 = false;
                            _0x996C = drawRect(_0x63BA, _0x6C0F["x"] + _0x6C0F["width"] + _0x631C, _0x6C0F["y"], _0x631C, "end", $(selectDecoInfo)["attr"]("end"));
                            $(selectDecoInfo)["parent"]()["append"](_0x9A0A);
                            $(selectDecoInfo)["parent"]()["append"](_0x996C);
                            $(selectDecoInfo)["parent"]()["parent"]()["append"]($(selectDecoInfo)["parent"]());
                            _0x942D = true;
                            return true
                        }
                    } else {
                        if (_0x63BA == "stc") {
                            if (_0x6409 >= _0x9CD1 - 3 && _0x6409 <= (_0x9CD1 + Math["abs"](_0x9C33)) && _0x6458 >= _0x9D20 - 5 && _0x6458 <= (_0x9D20 + _0x9743)) {
                                _0x9C33 = 5;
                                _0x9743 = 5;
                                $(_0x6BC0)["css"]("color", "red");
                                $(_0x6BC0)["attr"]("fill", "red");
                                $(_0x6BC0)["attr"]("selected", "selected");
                                selectDecoInfo = $(this);
                                _0x942D = true
                            }
                        } else {
                            if (_0x63BA == "emb") {
                                if (_0x6409 >= _0x9CD1 - 3 && _0x6409 <= (_0x9CD1 + Math["abs"](_0x9C33)) && _0x6458 >= _0x9D20 && _0x6458 <= (_0x9D20 + _0x9743)) {
                                    _0x9743 = 5;
                                    selectDecoInfo = $(this);
                                    _0x942D = true
                                }
                            } else {
                                if (musicType == 2 && _0x63BA == "wedge") {
                                    if (_0x6409 >= _0x9CD1 - 3 && _0x6409 <= (_0x9CD1 + Math["abs"](_0x9C33)) && _0x6458 >= _0x9D20 - _0x9743 && _0x6458 <= _0x9D20) {
                                        selectDecoInfo = $(this);
                                        _0x942D = true
                                    }
                                } else {
                                    if (_0x63BA == "invertedturn") {
                                        if (_0x6409 >= _0x9CD1 - 3 && _0x6409 <= (_0x9CD1 + Math["abs"](_0x9C33)) && _0x6458 >= _0x9D20 && _0x6458 <= (_0x9D20 + _0x9743)) {
                                            console["log"](_0x6BC0);
                                            $(_0x6BC0)["css"]("color", "red");
                                            $(_0x6BC0)["attr"]("fill", "red");
                                            $(_0x6BC0)["attr"]("selected", "selected");
                                            selectDecoInfo = $(this);
                                            _0x942D = true;
                                            return true
                                        }
                                    } else {
                                        if (_0x6409 >= _0x9CD1 - 3 && _0x6409 <= (_0x9CD1 + Math["abs"](_0x9C33)) && _0x6458 <= _0x9D20 && _0x6458 >= (_0x9D20 - _0x9743)) {
                                            console["log"](_0x6BC0);
                                            $(_0x6BC0)["css"]("color", "red");
                                            $(_0x6BC0)["attr"]("fill", "red");
                                            $(_0x6BC0)["attr"]("selected", "selected");
                                            selectDecoInfo = $(this);
                                            _0x942D = true;
                                            return true
                                        } else {
                                            if (_0x6409 >= _0x9CD1 - 3 && _0x6409 <= (_0x9CD1 + Math["abs"](_0x9C33)) && _0x6458 >= _0x9D20 && _0x6458 <= (_0x9D20 + _0x9743)) {
                                                selectDecoInfo = $(this);
                                                _0x942D = true;
                                                return true
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
    return _0x942D
}
var dragDecoRect = false;
var decoRectMouseDownTime;
function drawDecoRect(_0x6409, _0x6458, _0x8D14, _0x8CC5, _0x622F, _0x63BA) {
    var _0x627E = "http://www.w3.org/2000/svg";
    var _0x636B = document["createElementNS"](_0x627E, "rect");
    _0x636B["setAttribute"]("x", _0x6409);
    _0x636B["setAttribute"]("y", _0x6458);
    _0x636B["setAttribute"]("width", _0x8D14);
    _0x636B["setAttribute"]("height", _0x8CC5);
    _0x636B["setAttribute"]("istart", _0x622F);
    _0x636B["setAttribute"]("type", _0x63BA);
    _0x636B["setAttribute"]("recttype", "movedragger");
    _0x636B["setAttribute"]("fill", "red");
    _0x636B["setAttribute"]("style", "opacity:0.3");
    if (_0x63BA == "tubrn") {
        for (var _0x5E7B = _0x622F; _0x5E7B < syms["length"]; _0x5E7B++) {
            var _0x6681 = syms[_0x5E7B];
            if (_0x6681) {
                if (_0x6681["in_tuplet"]) {
                    $("rect[type=\'note\'][istart=\'" + _0x5E7B + "\']")["remove"]()
                } else {
                    break
                }
            }
        }
    }
    ;_0x636B["addEventListener"]("mousedown", function(_0x64A7) {
        if (user["mode"] == "editor") {
            decoRectMouseDownTime = new Date()["getTime"]();
            dragDecoRect = true;
            _0x64A7["preventDefault"]();
            _0x64A7["stopPropagation"]();
            return false
        }
        ;decoRectDrag = true
    });
    _0x636B["addEventListener"]("mousemove", function(_0x64A7) {
        if (user["mode"] == "editor") {
            if (dragDecoRect) {
                var _0x63BA = $(event["target"])["attr"]("type");
                var _0x8DB2 = 0;
                var _0x8D63 = 0;
                var _0x90C8 = $(_0x64A7["target"])["parents"]("g")[0];
                var _0x92A2 = $(_0x90C8)["attr"]("transform");
                var _0x8FDB = getTransformsTranslate(_0x92A2);
                if (_0x8FDB == null) {
                    _0x8FDB = new Object();
                    _0x8FDB["x"] = 0;
                    _0x8FDB["y"] = 0
                }
                ;$(event["target"])["attr"]("x", _0x64A7["offsetX"] / scale - parseInt(_0x8FDB["x"]) - ($(_0x64A7["target"])[0]["getBBox"]()["width"] / 2));
                if (_0x63BA == "accent") {
                    if (musicType == 2) {
                        _0x8D63 = 7 * scale;
                        $(event["target"])["attr"]("y", (_0x64A7["offsetY"] / scale - parseInt(_0x8FDB["y"]) - 3 - _0x8D63))
                    } else {
                        _0x8D63 = $(_0x64A7["target"])[0]["getBBox"]()["height"];
                        $(event["target"])["attr"]("y", -(_0x64A7["offsetY"] / scale - parseInt(_0x8FDB["y"]) - 18 + _0x8D63))
                    }
                } else {
                    if (_0x63BA == "invertedturn") {
                        if (musicType == 2) {
                            _0x8D63 = 15 * scale;
                            $(event["target"])["attr"]("y", (_0x64A7["offsetY"] / scale - parseInt(_0x8FDB["y"]) - 3 - _0x8D63))
                        } else {
                            _0x8D63 = $(_0x64A7["target"])[0]["getBBox"]()["height"];
                            $(event["target"])["attr"]("y", -(_0x64A7["offsetY"] / scale - parseInt(_0x8FDB["y"]) - 28 + _0x8D63))
                        }
                    } else {
                        if (_0x63BA == "8vb") {
                            _0x8D63 = $(_0x64A7["target"])[0]["getBBox"]()["height"] - 15;
                            $(event["target"])["attr"]("y", _0x64A7["offsetY"] / scale - parseInt(_0x8FDB["y"]) - 3 - _0x8D63)
                        } else {
                            if (_0x63BA == "img") {
                                $(event["target"])["attr"]("y", _0x64A7["offsetY"] / scale - parseInt(_0x8FDB["y"]) - 3 - _0x8D63)
                            } else {
                                $(event["target"])["attr"]("y", _0x64A7["offsetY"] / scale - parseInt(_0x8FDB["y"]) - 3 - _0x8D63)
                            }
                        }
                    }
                }
                ;$(event["target"])["attr"]("style", "opacity:0");
                var _0x622F = $(event["target"])["attr"]("istart");
                var _0x9204 = $("[cat=\'decos\'][start=\'" + _0x622F + "\'][type=\'" + _0x63BA + "\'],[cat=\'decos\'][istart=\'" + _0x622F + "\'][type=\'" + _0x63BA + "\']");
                if (_0x63BA == "tubrn") {
                    var _0x9117 = $("path[cat=\'decos\'][istart=\'" + _0x622F + "\']");
                    var _0x7377 = /m(.[^v]*)v/;
                    var _0x91B5 = /m(.[^l]*)l/;
                    for (var _0x5E7B = 0; _0x5E7B < _0x9117["length"]; _0x5E7B++) {
                        var _0x8E01 = $(_0x9117[_0x5E7B])["attr"]("d");
                        var _0x79A3 = _0x7377["exec"](_0x8E01);
                        if (_0x79A3) {
                            var _0x9166 = _0x79A3[1];
                            var _0x6409 = _0x9166["split"](" ")[0];
                            var _0x6458 = _0x9166["split"](" ")[1];
                            var _0x8DB2 = _0x9117[_0x5E7B]["getBBox"]()["width"] / 2;
                            var _0x8E50 = parseInt($(event["target"])["attr"]("x")) - _0x8DB2;
                            var _0x8E9F = parseInt($(event["target"])["attr"]("y")) + $(_0x64A7["target"])[0]["getBBox"]()["height"];
                            _0x8E01 = "m" + (_0x8E50 - _0x8FDB["x"]) + " " + (_0x8E9F) + "v" + _0x8E01["replace"](_0x79A3[0], "");
                            $(_0x9117[_0x5E7B])["attr"]("d", _0x8E01);
                            var _0x902A = $(_0x9117[_0x5E7B])["attr"]("orix");
                            var _0x9079 = $(_0x9117[_0x5E7B])["attr"]("oriy");
                            if (!_0x902A) {
                                _0x902A = _0x6409;
                                _0x9079 = _0x6458;
                                $(_0x9117[_0x5E7B])["attr"]("orix", _0x6409);
                                $(_0x9117[_0x5E7B])["attr"]("oriy", _0x6458)
                            }
                            ;$(_0x9117[_0x5E7B])["attr"]("disx", _0x8E50 - parseInt(_0x902A));
                            $(_0x9117[_0x5E7B])["attr"]("disy", _0x8E9F - parseInt(_0x9079))
                        } else {
                            if (_0x79A3 = _0x91B5["exec"](_0x8E01)) {
                                var _0x9166 = _0x79A3[1];
                                var _0x6409 = _0x9166["split"](" ")[0];
                                var _0x6458 = _0x9166["split"](" ")[1];
                                var _0x8DB2 = _0x9117[_0x5E7B]["getBBox"]()["width"] / 2;
                                var _0x8E50 = parseInt($(event["target"])["attr"]("x")) - _0x8DB2;
                                var _0x8E9F = parseInt($(event["target"])["attr"]("y")) + 6 * scale;
                                _0x8E01 = "m" + (_0x8E50 - _0x8FDB["x"]) + " " + (_0x8E9F) + "l" + _0x8E01["replace"](_0x79A3[0], "");
                                $(_0x9117[_0x5E7B])["attr"]("d", _0x8E01);
                                var _0x902A = $(_0x9117[_0x5E7B])["attr"]("orix");
                                var _0x9079 = $(_0x9117[_0x5E7B])["attr"]("oriy");
                                if (!_0x902A) {
                                    _0x902A = _0x6409;
                                    _0x9079 = _0x6458;
                                    $(_0x9117[_0x5E7B])["attr"]("orix", _0x6409);
                                    $(_0x9117[_0x5E7B])["attr"]("oriy", _0x6458)
                                }
                                ;$(_0x9117[_0x5E7B])["attr"]("disx", _0x8E50 - parseInt(_0x902A));
                                $(_0x9117[_0x5E7B])["attr"]("disy", _0x8E9F - parseInt(_0x9079))
                            }
                        }
                    }
                }
                ;if (_0x9204[0]["tagName"]["toLowerCase"]() == "path") {
                    if (_0x63BA == "jq" || _0x63BA == "jr") {
                        var _0x8E01 = $(_0x9204)["attr"]("d");
                        var _0x7377 = /m(.[^l]*)l/;
                        var _0x79A3 = _0x7377["exec"](_0x8E01);
                        if (_0x79A3) {
                            var _0x9166 = _0x79A3[1];
                            var _0x6409 = _0x9166["split"](" ")[0];
                            var _0x6458 = _0x9166["split"](" ")[1];
                            var _0x8DB2 = 0;
                            if (_0x63BA == "jq") {
                                _0x8DB2 = $(_0x64A7["target"])[0]["getBBox"]()["width"]
                            }
                            ;var _0x8E50 = parseInt($(event["target"])["attr"]("x")) + _0x8DB2;
                            var _0x8E9F = parseInt($(event["target"])["attr"]("y")) + $(_0x64A7["target"])[0]["getBBox"]()["height"];
                            _0x8E01 = "m" + _0x8E50 + " " + _0x8E9F + "l" + _0x8E01["replace"](_0x79A3[0], "");
                            $(_0x9204)["attr"]("d", _0x8E01);
                            var _0x902A = $(_0x9204)["attr"]("orix");
                            var _0x9079 = $(_0x9204)["attr"]("oriy");
                            if (!_0x902A) {
                                _0x902A = _0x6409;
                                _0x9079 = _0x6458;
                                $(_0x9204)["attr"]("orix", _0x6409);
                                $(_0x9204)["attr"]("oriy", _0x6458)
                            }
                            ;$(_0x9204)["attr"]("disx", _0x8E50 - parseInt(_0x902A));
                            $(_0x9204)["attr"]("disy", _0x8E9F - parseInt(_0x9079))
                        }
                        ;$("rect[dragtype]")["remove"]()
                    } else {
                        if (_0x63BA == "slur") {
                            var _0x8E01 = $(_0x9204)["attr"]("d");
                            var _0x7377 = /M(.[^c]*)c/;
                            var _0x79A3 = _0x7377["exec"](_0x8E01);
                            if (_0x79A3) {
                                var _0x9166 = _0x79A3[1];
                                var _0x6409 = _0x9166["split"](" ")[0];
                                var _0x6458 = _0x9166["split"](" ")[1];
                                var _0x8DB2 = 0;
                                var _0x8E50 = parseInt($(event["target"])["attr"]("x")) + _0x8DB2;
                                var _0x8E9F = parseInt($(event["target"])["attr"]("y")) + $(_0x64A7["target"])[0]["getBBox"]()["height"];
                                _0x8E01 = "M" + _0x8E50 + " " + _0x8E9F + "c" + _0x8E01["replace"](_0x79A3[0], "");
                                $(_0x9204)["attr"]("d", _0x8E01);
                                var _0x902A = $(_0x9204)["attr"]("orix");
                                var _0x9079 = $(_0x9204)["attr"]("oriy");
                                if (!_0x902A) {
                                    _0x902A = _0x6409;
                                    _0x9079 = _0x6458;
                                    $(_0x9204)["attr"]("orix", _0x6409);
                                    $(_0x9204)["attr"]("oriy", _0x6458)
                                }
                                ;$(_0x9204)["attr"]("disx", _0x8E50 - parseInt(_0x902A));
                                $(_0x9204)["attr"]("disy", _0x8E9F - parseInt(_0x9079))
                            }
                            ;$("rect[dragtype]")["remove"]()
                        }
                    }
                } else {
                    if (_0x9204[0]["tagName"]["toLowerCase"]() == "g") {
                        if (_0x63BA == "8va" || _0x63BA == "8vb" || _0x63BA == "15ma" || _0x63BA == "15mb") {
                            $(_0x9204)["find"]("rect")["remove"]();
                            var _0x9253 = $(_0x9204)["attr"]("transform");
                            var _0x92F1 = getTransformsTranslate(_0x92A2);
                            if (!_0x92F1) {
                                _0x92F1 = new Object();
                                _0x92F1["x"] = 0;
                                _0x92F1["y"] = 0
                            }
                            ;var _0x902A = parseInt($(_0x9204)["find"]("text")["attr"]("x"));
                            var _0x9079 = parseInt($(_0x9204)["find"]("text")["attr"]("y"));
                            if (!_0x902A) {
                                $(_0x9204)["attr"]("orix", 0);
                                $(_0x9204)["attr"]("oriy", 0)
                            }
                            ;if (_0x63BA == "8va") {
                                _0x8D63 = $(_0x64A7["target"])[0]["getBBox"]()["height"]
                            } else {}
                            ;var _0x8F3D = parseInt($(event["target"])["attr"]("x")) - _0x902A + _0x8DB2;
                            var _0x8F8C = parseInt($(event["target"])["attr"]("y")) - _0x9079 + _0x8D63;
                            $(_0x9204)["attr"]("x", _0x8F3D);
                            $(_0x9204)["attr"]("y", _0x8F8C);
                            var _0x8EEE = "translate(" + _0x8F3D + "," + _0x8F8C + ")";
                            $(_0x9204)["attr"]("disx", _0x8F3D);
                            $(_0x9204)["attr"]("disy", _0x8F8C);
                            $(_0x9204[0])["attr"]("transform", _0x8EEE);
                            $("rect[dragtype]")["remove"]()
                        }
                    } else {
                        switch (_0x63BA) {
                        case "hld":
                            _0x8D63 = 5 * scale;
                            break;
                        case "coda":
                            _0x8DB2 = 0;
                            _0x8D63 = 14 * scale;
                            break;
                        case "accent":
                            if (musicType == "2") {
                                _0x8D63 += 3 * scale
                            } else {
                                _0x8D63 += -5 * scale
                            }
                            ;break;
                        case "crescword":
                            _0x8DB2 = 7;
                            _0x8D63 = 12 * scale;
                            break;
                        case "dimword":
                            _0x8DB2 = 5;
                            _0x8D63 = 12 * scale;
                            break;
                        case "kew1":
                            ;
                        case "kew2":
                            ;
                        case "kew3":
                            ;
                        case "kew4":
                            ;
                        case "kew5":
                            ;
                        case "kew6":
                            ;
                        case "kew7":
                            ;
                        case "kew8":
                            _0x8DB2 = $(_0x9204)[0]["getBBox"]()["width"] / 2 - 2;
                            _0x8D63 = 25 * scale;
                            break;
                        case "inst_lingu":
                            ;
                        case "inst_pengl":
                            ;
                        case "inst_shac":
                            ;
                        case "inst_shanjt":
                            ;
                        case "inst_shoul":
                            ;
                        case "inst_shuanxt":
                            ;
                        case "inst_xiangb":
                            ;
                        case "inst_xiaojg":
                            ;
                        case "inst_feizg":
                            _0x8DB2 = $(_0x9204)[0]["getBBox"]()["width"] / 2;
                            _0x8D63 = 32 * scale;
                            break;
                        case "invertedturn":
                            if (musicType == 2) {
                                _0x8DB2 = $(_0x9204)[0]["getBBox"]()["width"] / 2 - 5
                            } else {
                                _0x8DB2 = $(_0x9204)[0]["getBBox"]()["width"] / 2
                            }
                            ;_0x8D63 = 15 * scale;
                            break;
                        case "img":
                            _0x8DB2 = $(_0x9204)[0]["getBBox"]()["width"] / 2;
                            _0x8D63 = 20 * scale;
                            break;
                        default:
                            _0x8DB2 = $(_0x9204)[0]["getBBox"]()["width"] / 2;
                            _0x8D63 = 7 * scale
                        }
                        ;var _0x902A = $(_0x9204)["attr"]("orix");
                        var _0x9079 = $(_0x9204)["attr"]("oriy");
                        if (!_0x902A) {
                            $(_0x9204)["attr"]("orix", $(_0x9204)["attr"]("x"));
                            $(_0x9204)["attr"]("oriy", $(_0x9204)["attr"]("y"))
                        }
                        ;var _0x8F3D = parseInt($(event["target"])["attr"]("x")) + _0x8DB2;
                        var _0x8F8C = parseInt($(event["target"])["attr"]("y")) + _0x8D63;
                        $(_0x9204)["attr"]("x", _0x8F3D);
                        $(_0x9204)["attr"]("y", _0x8F8C);
                        $(_0x9204)["attr"]("disx", _0x8F3D - parseInt(_0x902A));
                        $(_0x9204)["attr"]("disy", _0x8F8C - parseInt(_0x9079))
                    }
                }
            }
            ;_0x64A7["preventDefault"]();
            _0x64A7["stopPropagation"]();
            return false
        }
    });
    _0x636B["addEventListener"]("mouseup", function(_0x64A7) {
        if (user["mode"] == "editor") {
            dragDecoRect = false;
            var _0x9340 = new Date()["getTime"]();
            if ((_0x9340 - decoRectMouseDownTime) < 200) {
                return
            }
            ;var _0x938F = $(this)["parents"]("svg");
            var _0x8C27 = _0x938F[_0x938F["length"] - 1];
            var _0x6409 = parseInt((parseInt($(this)["attr"]("x"))));
            var _0x6458 = parseInt((parseInt($(this)["attr"]("y"))) - 15);
            var _0x622F = $(this)["attr"]("istart");
            var _0x63BA = $(this)["attr"]("type");
            var _0x9204 = $("[cat=\'decos\'][type=\'" + _0x63BA + "\'][start=\'" + _0x622F + "\'],[cat=\'decos\'][type=\'" + _0x63BA + "\'][istart=\'" + _0x622F + "\']");
            if (_0x9204["length"] > 0) {
                updateDecoPosInfo(_0x9204)
            }
            ;_0x64A7["preventDefault"]();
            _0x64A7["stopPropagation"]();
            return false
        }
        ;decoRectDrag = false
    });
    return _0x636B
}
function updateDecoPosInfo(_0x93DE) {
    var _0x63BA = $(_0x93DE)["attr"]("type");
    var _0x106F9 = $(_0x93DE)["attr"]("disx");
    var _0x10748 = $(_0x93DE)["attr"]("disy");
    if (!_0x106F9 || !_0x10748) {
        return
    }
    ;var _0x622F = $(_0x93DE)["attr"]("istart") ? $(_0x93DE)["attr"]("istart") : $(_0x93DE)["attr"]("start");
    switch (_0x63BA) {
    case "jq":
        ;
    case "jr":
        ;
    case "8va":
        ;
    case "8vb":
        ;
    case "15ma":
        ;
    case "15mb":
        if (_0x63BA == "jq") {
            _0x63BA = "cresc"
        } else {
            if (_0x63BA == "jr") {
                _0x63BA = "dim"
            }
        }
        ;_0x622F = $(_0x93DE)["attr"]("end");
        break;
    case "D.C.":
        break
    }
    ;var _0x6681 = syms[_0x622F];
    if (!_0x6681) {
        return
    }
    ;var _0x5D8E = $("#source")["val"]();
    var _0x76DC = _0x6681["a_gch"];
    var _0x10797;
    if (_0x76DC != null) {
        for (var _0x5E7B = 0; _0x5E7B < _0x76DC["length"]; _0x5E7B++) {
            var _0x9656 = _0x76DC[_0x5E7B];
            if (_0x9656["text"]["indexOf"]("gchtype") > -1) {
                var _0x10835 = JSON["parse"](_0x9656["text"]["replace"](/\'/g, "\""));
                if (_0x10835["gchtype"] == _0x63BA) {
                    _0x10797 = _0x9656;
                    break
                }
            }
        }
    }
    ;if (_0x10797) {
        var _0x108D3 = _0x5D8E["substring"](_0x10797["istart"], _0x10797["iend"]);
        var _0x10884 = JSON["parse"](_0x108D3["replace"](/\"/g, "")["replace"](/\'/g, "\""));
        var _0x107E6 = "\"{\'gchtype\':\'" + _0x63BA + "\',\'x\':" + (_0x10884["x"] + parseInt(_0x106F9)) + ",\'y\':" + (_0x10884["y"] - parseInt(_0x10748)) + "}\"";
        _0x5D8E = _0x5D8E["substring"](0, _0x10797["istart"]) + _0x107E6 + _0x5D8E["substring"](_0x10797["iend"])
    } else {
        var _0x107E6 = "\"{\'gchtype\':\'" + _0x63BA + "\',\'x\':" + parseInt(_0x106F9) + ",\'y\':" + (-parseInt(_0x10748)) + "}\"";
        _0x5D8E = _0x5D8E["substring"](0, _0x622F) + _0x107E6 + _0x5D8E["substring"](_0x622F)
    }
    ;$("#source")["val"](_0x5D8E);
    doLog();
    src_change()
}
function drawRect(_0x63BA, _0x6409, _0x6458, _0x631C, _0x62CD, _0x622F, _0x75EF) {
    var _0x627E = "http://www.w3.org/2000/svg";
    var _0x636B = document["createElementNS"](_0x627E, "rect");
    _0x636B["setAttribute"]("dragtype", _0x63BA);
    _0x636B["setAttribute"]("type", _0x62CD);
    if (_0x75EF) {
        _0x636B["setAttribute"]("target", _0x75EF)
    }
    ;_0x636B["setAttribute"]("x", _0x6409);
    _0x636B["setAttribute"]("y", _0x6458);
    _0x636B["setAttribute"]("inity", _0x6458);
    _0x636B["setAttribute"]("width", _0x631C);
    _0x636B["setAttribute"]("height", _0x631C);
    _0x636B["setAttribute"]("stroke", "red");
    _0x636B["setAttribute"]("stroke-width", 1);
    _0x636B["setAttribute"]("fill", "white");
    _0x636B["setAttribute"]("pos", _0x62CD);
    _0x636B["setAttribute"]("istart", _0x622F);
    if (deco_params[_0x63BA]) {
        _0x636B["setAttribute"]("str", deco_params[_0x63BA][_0x62CD])
    }
    ;_0x636B["addEventListener"]("mousedown", function(_0x64A7) {
        $(this)["attr"]("selected", "selected");
        dragDecoFlag = true;
        rectMouseDownTime = new Date()["getTime"]();
        $(document)["off"]("mouseup")["on"]("mouseup", function(_0x64A7) {
            console["log"]("mouseup", "  dragDecoFlag:", dragDecoFlag);
            var _0x6545 = new Date()["getTime"]();
            if (rectMouseDownTime > 0 && _0x6545 - rectMouseDownTime < 100) {
                dragDecoFlag = false;
                return
            }
            ;rectMouseDownTime = -1;
            if (dragDecoFlag) {
                if (_0x63BA == "linkclef") {
                    var _0x64F6 = $("rect[selected=\'selected\']");
                    updateLinkClef(_0x64F6);
                    return
                }
                ;if (_0x63BA == "slur" && _0x62CD == "mid") {
                    var _0x64F6 = $("rect[selected=\'selected\']");
                    updateDecoPosY(_0x64F6);
                    return
                } else {
                    var _0x64F6 = $("rect[selected=\'selected\']");
                    updateDecoPos(_0x64F6);
                    return
                }
            }
        })
    });
    _0x636B["addEventListener"]("mouseup", function(_0x64A7) {
        var _0x6545 = new Date()["getTime"]();
        if (_0x6545 - rectMouseDownTime < 100) {
            return
        }
        ;if (_0x63BA == "linkclef") {
            updateLinkClef(this);
            return
        }
        ;if (_0x63BA == "slur" && _0x62CD == "mid") {
            updateDecoPosY(this)
        } else {
            updateDecoPos(this)
        }
    });
    return _0x636B
}
function updateLinkClef(_0x64F6, _0x10A0F) {
    console["log"]("1111");
    $(_0x64F6)["removeAttr"]("selected");
    dragDecoFlag = false;
    var _0x7ADF = $("rect[dragtype=\"linkclef\"][pos=\"start\"]");
    var _0x10C87 = parseFloat($(_0x7ADF)["attr"]("y"));
    var _0x8CC5 = parseFloat($(_0x7ADF)["height"]());
    var _0x7867 = $("rect[dragtype=\"linkclef\"][pos=\"end\"]");
    var _0x10AFC = parseFloat($(_0x7867)["attr"]("y"));
    var _0x8C27 = $(_0x7ADF)["parents"]("svg");
    var _0x10B9A = [];
    if (musicType == 0 || musicType == 1) {
        $(_0x8C27)["find"]("g[type=\"staff\"]")["each"](function(_0x5E7B, _0x6BC0) {
            var _0x10D25 = $(_0x6BC0)["attr"]("transform");
            var _0x92F1 = getTransformsTranslate(_0x10D25);
            var _0x10CD6 = parseFloat(_0x92F1["y"]) - 24;
            _0x10B9A["push"](_0x10CD6)
        })
    } else {
        if (musicType == 2) {
            $(_0x8C27)["find"]("g[type=\"bar_datas\"]")["each"](function(_0x5E7B, _0x6BC0) {
                var _0x10D25 = $(_0x6BC0)["attr"]("transform");
                var _0x92F1 = getTransformsTranslate(_0x10D25);
                var _0x10CD6 = parseFloat(_0x92F1["y"]) - 24;
                if (_0x10B9A["indexOf"](_0x10CD6) < 0) {
                    _0x10B9A["push"](_0x10CD6)
                }
            })
        }
    }
    ;_0x10B9A["sort"](function(_0x8699, _0x86E8) {
        return _0x8699 - _0x86E8
    });
    console["log"]("startTop:", _0x10C87, "   endTop:", _0x10AFC, _0x10B9A);
    var _0x10C38 = 0;
    var _0x10AAD = 0;
    var _0x10B4B = -1;
    var _0x63BA = $(_0x64F6)["attr"]("istart");
    for (var _0x5E7B = 0; _0x5E7B < _0x10B9A["length"]; _0x5E7B++) {
        if (_0x10C87 > _0x10B4B) {
            _0x10C38 = _0x5E7B
        }
        ;if (_0x63BA == "brace") {
            if (_0x10AFC > _0x10B4B) {
                _0x10AAD = _0x5E7B
            }
        } else {
            if (_0x63BA == "bracket") {
                if (_0x10AFC > _0x10B9A[_0x5E7B]) {
                    _0x10AAD = _0x5E7B
                }
            }
        }
        ;_0x10B4B = _0x10B9A[_0x5E7B] + 24
    }
    ;if (musicType == 0 || musicType == 1) {} else {}
    ;console["log"]("startSt:", _0x10C38, "   endSt:", _0x10AAD);
    $("rect[dragtype=\"linkclef\"]")["remove"]();
    if ($(".select_staff")["length"] > 0) {
        var _0x5D8E = $("#source")["val"]();
        var _0x5FB7 = getLinesInfo($("#source")["val"]());
        var _0xB3A7 = "";
        var _0x10BE9 = "";
        var _0x10A5E = "";
        if (_0x63BA == "brace") {
            _0x10BE9 = "{";
            _0x10A5E = "}"
        } else {
            if (_0x63BA == "bracket") {
                _0x10BE9 = "[";
                _0x10A5E = "]"
            } else {
                if (_0x63BA == "none") {}
            }
        }
        ;var _0x6A35 = "";
        for (var _0x5E7B = 0; _0x5E7B < _0x5FB7["length"]; _0x5E7B++) {
            var _0x69E6 = _0x5FB7[_0x5E7B];
            var _0x6006 = _0x69E6["lineStr"];
            if (_0x6006["indexOf"]("%%score") > -1 || _0x6006["indexOf"]("%%staves") > -1) {
                var _0x7A41 = _0x6006["match"](/%%score|%%staves/)[0];
                clefReg = /\s*\(.[^\(]*\)\s*\|{0,1}|\s*\d\s*\|{0,1}/g;
                _0x6006 = _0x6006["replace"](_0x10BE9, "")["replace"](_0x10A5E, "");
                var _0xB3F6 = 0;
                var _0xB445 = 0;
                var _0xABF0 = "";
                while (node = clefReg["exec"](_0x6006)) {
                    console["log"](node);
                    _0xABF0 += _0x6006["substring"](_0xB445, node["index"]);
                    if (_0xB3F6 == _0x10C38) {
                        _0xABF0 += _0x10BE9
                    }
                    ;_0xABF0 += node[0] + "|";
                    if (_0xB3F6 == _0x10AAD) {
                        _0xABF0 = _0xABF0["substring"](0, _0xABF0["length"] - 1);
                        _0xABF0 += _0x10A5E;
                        _0xABF0 = _0xABF0["replace"](/\|\s*\|/, "|")
                    }
                    ;_0xB445 = node["index"] + node[0]["length"];
                    _0xB3F6++
                }
                ;if (_0xB445 < _0x6006["length"]) {
                    _0xABF0 += _0x6006["substr"](_0xB445)
                }
                ;_0x6A35 += _0xABF0 + "\x0A"
            } else {
                _0x6A35 += _0x6006 + "\x0A"
            }
        }
        ;$("#source")["val"](_0x6A35);
        src_change();
        doLog()
    }
}
var rectMouseDownTime = -1;
function addSlurDragRect(_0x63BA, _0x6409, _0x6458, _0x631C, _0x62CD, _0x622F) {
    var _0x627E = "http://www.w3.org/2000/svg";
    var _0x636B = document["createElementNS"](_0x627E, "rect");
    _0x636B["setAttribute"]("dragtype", _0x63BA);
    _0x636B["setAttribute"]("x", _0x6409);
    _0x636B["setAttribute"]("y", _0x6458);
    _0x636B["setAttribute"]("width", _0x631C);
    _0x636B["setAttribute"]("height", _0x631C);
    _0x636B["setAttribute"]("stroke", "red");
    _0x636B["setAttribute"]("stroke-width", 1);
    _0x636B["setAttribute"]("fill", "black");
    _0x636B["setAttribute"]("pos", _0x62CD);
    _0x636B["setAttribute"]("istart", _0x622F);
    _0x636B["setAttribute"]("str", deco_params[_0x63BA][_0x62CD]);
    _0x636B["addEventListener"]("mousedown", function(_0x64A7) {
        $(this)["attr"]("selected", "selected");
        dragDecoFlag = true;
        rectMouseDownTime = new Date()["getTime"]();
        $(document)["off"]("mouseup")["on"]("mouseup", function(_0x64A7) {
            if (dragDecoFlag) {
                var _0x64F6 = $("rect[selected=\'selected\']");
                updateDecoPos(_0x64F6);
                return
            }
        })
    });
    _0x636B["addEventListener"]("mouseup", function() {
        var _0x6545 = new Date()["getTime"]();
        if (rectMouseDownTime > 0 && _0x6545 - rectMouseDownTime < 100) {
            return
        }
        ;rectMouseDownTime = -1;
        dragDecoFlag = false;
        updateDecoPos(this)
    });
    return _0x636B
}
function updateDecoPos(_0x64F6) {
    $(_0x64F6)["removeAttr"]("selected");
    dragDecoFlag = false;
    if (nearDecoNote != null) {
        var _0x104D0 = $(_0x64F6)["attr"]("dragtype");
        var _0x622F = $(_0x64F6)["attr"]("istart");
        var _0x105BD = nearDecoNote["istart"];
        var _0x1051F = syms[_0x105BD];
        if ("8va" == _0x104D0 || "8vb" == _0x104D0 || "15ma" == _0x104D0 || "15mb" == _0x104D0) {
            if (_0x1051F["next"]) {
                _0x105BD = _0x1051F["next"]["istart"]
            }
        }
        ;if (_0x622F != _0x105BD) {
            var _0x772B = $(_0x64F6)["attr"]("str");
            var _0x5D8E = $("#source")["val"]();
            var _0xC364 = "";
            var _0x1060C = false;
            var _0x1065B = -1;
            if (_0x104D0 == "k_slur" && _0x622F == -1) {
                if (_0x622F == -1) {
                    var _0x1056E = syms[_0x105BD]["next"];
                    if (_0x1056E) {
                        var _0x6A35 = _0x5D8E["substring"](0, _0x1056E["istart"]) + _0x772B + _0x5D8E["substring"](_0x1056E["istart"]);
                        $("#source")["val"](_0x6A35);
                        src_change();
                        doLog();
                        return
                    }
                }
            }
            ;if (eq("k_slur,slur", _0x104D0) && $(_0x64F6)["attr"]("pos") == "end") {
                _0x1060C = true;
                var _0x6681 = syms[_0x622F];
                _0x1065B = _0x6681["iend"];
                _0xC364 = _0x5D8E["substring"](0, _0x6681["iend"])
            } else {
                _0xC364 = _0x5D8E["substring"](0, _0x622F);
                if (_0x104D0 == "k_slur") {
                    var _0xB445 = _0xC364["lastIndexOf"]("!slur(");
                    _0xC364 = _0xC364["substring"](0, _0xB445) + _0xC364["substring"](_0xB445)["replace"](/\!slur\([^\!]*\!/, "")
                }
            }
            ;if (!_0x772B) {
                return
            }
            ;var _0x106AA = _0x772B["replace"]("(", "\\(")["replace"](")", "\\)");
            var _0x7377 = new RegExp("([^~]*)(" + _0x106AA + ")");
            _0xC364 = _0xC364["replace"](_0x7377, "$1");
            var _0x6A35 = "";
            if (parseInt(_0x622F) < parseInt(_0x105BD)) {
                if (_0x1060C) {
                    var _0x6681 = syms[_0x105BD];
                    if (_0x104D0 == "k_slur") {
                        _0x6A35 = _0xC364 + _0x5D8E["substring"](_0x1065B, _0x6681["iend"])["replace"](_0x772B, "") + _0x772B + _0x5D8E["substr"](_0x6681["iend"])
                    } else {
                        _0x6A35 = _0xC364 + _0x5D8E["substring"](_0x1065B, _0x6681["iend"]) + _0x772B + _0x5D8E["substr"](_0x6681["iend"])
                    }
                } else {
                    _0x6A35 = _0xC364 + _0x5D8E["substring"](_0x622F, _0x105BD) + _0x772B + _0x5D8E["substr"](_0x105BD)
                }
            } else {
                if (_0x1060C) {
                    var _0x6681 = syms[_0x105BD];
                    _0x6A35 = _0xC364["substring"](0, _0x6681["iend"]) + _0x772B + _0xC364["substring"](_0x6681["iend"], _0x622F) + _0x5D8E["substr"](_0x622F)["replace"](_0x772B, "")
                } else {
                    _0x6A35 = _0xC364["substring"](0, _0x105BD) + _0x772B + _0xC364["substring"](_0x105BD, _0x622F) + _0x5D8E["substr"](_0x622F)
                }
            }
            ;$("#source")["val"](_0x6A35);
            src_change();
            doLog()
        }
    }
}
var lastSlurHeight = 1;
function updateDecoPosY(_0x64F6) {
    console["log"]("updateDecoPosY-----", moveSlurHeight);
    $(_0x64F6)["removeAttr"]("selected");
    dragDecoFlag = false;
    moveSlurHeight = parseInt(moveSlurHeight * 10) / 10;
    if (Math["abs"](moveSlurHeight - lastSlurHeight) > 0.3) {
        var _0x622F = $(_0x64F6)["attr"]("istart");
        var _0x5D8E = $("#source")["val"]();
        var _0x10971 = "\"sh:" + moveSlurHeight + "\"";
        var _0x6681 = syms[_0x622F];
        var _0x76DC = _0x6681["a_gch"];
        var _0x6A35 = "";
        if (_0x76DC != null) {
            for (var _0x5E7B = 0; _0x5E7B < _0x76DC["length"]; _0x5E7B++) {
                var _0x10922 = _0x76DC[_0x5E7B];
                var _0x109C0 = _0x10922["text"];
                if (_0x109C0["indexOf"]("sh:") == 0) {
                    _0x6A35 = _0x5D8E["substring"](0, _0x10922["istart"])
                }
            }
        }
        ;if (_0x6A35 == "") {
            _0x6A35 = _0x5D8E["substring"](0, _0x622F) + _0x10971 + _0x5D8E["substring"](_0x622F)
        } else {
            _0x6A35 = _0x6A35 + _0x10971 + _0x5D8E["substring"](_0x622F)
        }
        ;$("#source")["val"](_0x6A35);
        src_change();
        doLog()
    }
}
function findNearNoteWithSelectedDeco(_0x90C8, _0x6409, _0x6458, _0x63BA, _0xA6B1, _0x64A7) {
    var _0x9E0D = 9999;
    var _0x9EFA = 9999;
    var _0x9F49 = null;
    var _0xA123 = "";
    var _0xA662 = 0;
    var _0xA613 = _0x64A7["target"]["tagName"];
    if (_0xA613["toUpperCase"]() == "SVG") {
        _0xA662 = $(_0x64A7["target"])["offset"]()["top"]
    } else {
        _0xA662 = $($(_0x64A7["target"])["parents"]("svg")[0])["offset"]()["top"]
    }
    ;_0x6458 = _0xA662 + _0x6458;
    console["log"]("parentY:", _0xA662, "x:", _0x6409, "y:", _0x6458);
    if (_0x63BA == "slur" || _0x63BA == "jq" || _0x63BA == "jr" || _0x63BA == "8va" || _0x63BA == "8vb" || _0x63BA == "15ma" || _0x63BA == "15mb") {
        _0xA123 = "[v=\'" + _0xA6B1 + "\']"
    }
    ;var _0xA700 = "";
    if (_0x63BA == "8va" || _0x63BA == "8vb" || _0x63BA == "15ma" || _0x63BA == "15mb") {
        _0xA700 = ",rect[type=\'bar\']" + _0xA123
    }
    ;$("#target")["find"]("rect[type=\'rest\']" + _0xA123 + ",rect[type=\'note\']" + _0xA123 + ",rect[type=\'splnum_note\']" + _0xA123 + ",rect[type=\'splnum_rest\']" + _0xA123 + _0xA700)["each"](function(_0x5E7B, _0x6BC0) {
        var _0xA2AE = $(this)["attr"]("x");
        var _0xA2FD = $(this)["attr"]("y");
        var _0xA74F = $($(this)["parents"]("svg")[0])["offset"]()["top"];
        if (_0xA2FD) {
            _0xA2FD = parseFloat(_0xA2FD);
            _0xA2FD = _0xA2FD + _0xA74F
        }
        ;if (musicType == 2) {
            var _0x9656 = $(_0x6BC0)["parent"]();
            var _0x96A5 = $(_0x9656)["attr"]("transform");
            var _0x92F1 = getTransformsTranslate(_0x96A5);
            _0xA2AE = parseFloat(_0xA2AE) + parseFloat(_0x92F1["x"]);
            _0xA2FD = parseFloat(_0xA2FD) + parseFloat(_0x92F1["y"])
        }
        ;var _0x9743 = $(this)["attr"]("height");
        var _0xA1C1 = Math["abs"](parseFloat(_0xA2AE) - _0x6409);
        var _0xA210 = Math["abs"](_0xA2FD - _0x6458);
        if (_0xA1C1 > 30) {
            return
        }
        ;var _0xA172 = 0;
        if (_0x6458 > (parseFloat(_0xA2FD) + parseFloat(_0x9743))) {
            var _0xA25F = Math["abs"](_0x6458 - (parseFloat(_0xA2FD) + parseFloat(_0x9743)));
            _0xA172 = Math["sqrt"](Math["pow"](_0xA1C1, 2) + Math["pow"](_0xA25F, 2));
            console["log"]("\u4e0b")
        } else {
            _0xA172 = Math["sqrt"](Math["pow"](_0xA1C1, 2) + Math["pow"](_0xA210, 2));
            console["log"]("\u4e0a")
        }
        ;console["log"]("istart:", $(this)["attr"]("istart"), " currParentY:", _0xA74F, " y:", _0x6458, " iy:", _0xA2FD, " dis:", _0xA172);
        if (_0xA172 < 60) {
            if (_0xA172 < _0x9EFA) {
                _0x9EFA = _0xA172;
                _0x9F49 = $(this)
            }
        }
    });
    if (_0x9F49 != null) {
        $(".editor_rect")["removeClass"]("editor_rect");
        $("rect[type=\'rest\'],rect[type=\'note\'],rect[type=\'splnum_note\'],rect[type=\'splnum_rest\']")["css"]("fill-opacity", "0");
        $(_0x9F49)["addClass"]("editor_rect");
        var _0x93DE = new Object();
        var _0x8334 = $(_0x9F49)["prev"]();
        while ($(_0x8334)["attr"]("type") == "dot") {
            _0x8334 = $(_0x8334)["prev"]()
        }
        ;if ($(_0x8334)["is"]("g")) {
            _0x8334 = $(_0x8334)["find"]("text")
        }
        ;var _0x6409 = $(_0x8334)["attr"]("x");
        _0x93DE["x"] = _0x6409;
        _0x93DE["istart"] = $(_0x9F49)["attr"]("istart");
        return _0x93DE
    }
}
function getDinfo(_0x8E01) {
    var _0x93DE = new Object;
    var _0xCDE2 = /m(.[^l]*)l/;
    var _0xCD44 = _0x8E01["match"](_0xCDE2);
    var _0xCD93 = new Object();
    if (_0xCD44 != null) {
        var _0x94CB = _0xCD44[1];
        _0x94CB = _0x94CB["replace"](/\s+/, " ");
        _0xCD93["x"] = parseFloat(_0x94CB["split"](" ")[0]);
        _0xCD93["y"] = parseFloat(_0x94CB["split"](" ")[1])
    }
    ;_0x93DE["m"] = _0xCD93;
    var _0xCCF5 = /l(.[^l]*)/g;
    var _0xCCA6 = _0x8E01["match"](_0xCCF5);
    var _0xCC57 = new Array();
    if (_0xCCA6 != null) {
        for (var _0x5E7B = 0, _0xAB03 = _0xCCA6["length"]; _0x5E7B < _0xAB03; _0x5E7B++) {
            var _0x6006 = _0xCCA6[_0x5E7B];
            _0x6006 = _0x6006["replace"](/\s+/, " ");
            var _0x947C = _0x6006["split"](" ");
            var _0xAB52 = new Object();
            _0xAB52["x"] = parseFloat(_0x947C[0]["replace"]("l", ""));
            _0xAB52["y"] = parseFloat(_0x947C[1]);
            _0xCC57["push"](_0xAB52)
        }
    }
    ;_0x93DE["lines"] = _0xCC57;
    return _0x93DE
}
function delSelNote() {
    if ($("text.selected_text[type=\'mytext\']")["length"] > 0) {
        var _0x8421 = $("text.selected_text[type=\'mytext\']");
        delMyTextInfo($(_0x8421)["attr"]("id"));
        $(_0x8421)["remove"]();
        return
    }
    ;if ($("rect[type=\'bar\'][selected=\'selected\'],rect[type=\'splnum_bar\'][selected=\'selected\']")["length"] > 0) {
        var _0x8470 = $("rect[type=\'bar\'][selected=\'selected\'],rect[type=\'splnum_bar\'][selected=\'selected\']");
        if (_0x8470["length"] > 1) {
            _0x8470 = _0x8470[_0x8470["length"] - 1]
        }
        ;var _0x622F = $(_0x8470)["attr"]("istart");
        var _0x6681 = syms[_0x622F];
        if (_0x6681) {
            var _0x7F80 = checkBarIsInLineFirst(_0x8470);
            if (_0x7F80) {
                var _0x7FCF = true;
                var _0x81F8 = 0;
                var _0x85FB = new Array();
                var _0x8334 = _0x6681["ts_prev"];
                while (_0x8334) {
                    if (_0x8334["type"] != 0) {
                        break
                    }
                    ;if (_0x8334["ts_prev"] && _0x8334["ts_prev"]["type"] == 0) {
                        _0x8334 = _0x8334["ts_prev"]
                    } else {
                        break
                    }
                }
                ;var _0x7DF5 = null;
                if (_0x8334["type"] == 0) {
                    _0x7DF5 = _0x8334
                } else {
                    _0x7DF5 = _0x6681
                }
                ;console["log"](_0x7DF5);
                if (_0x7DF5) {
                    for (var _0x5E7B = 0; _0x5E7B < _0x7DF5["istart"]; _0x5E7B++) {
                        if (syms[_0x5E7B] && (syms[_0x5E7B]["type"] == 8 || syms[_0x5E7B]["type"] == 10)) {
                            _0x7FCF = false
                        }
                    }
                }
                ;if (_0x7FCF) {
                    var _0x5D8E = $("#source")["val"]();
                    var _0x6A35 = _0x5D8E["substring"](0, _0x7DF5["istart"]);
                    var _0x801E = abc["clone"](_0x7DF5, 2);
                    var _0x80BC = _0x7DF5["ts_next"];
                    while (_0x80BC && _0x80BC["type"] == 0) {
                        _0x6A35 += _0x5D8E["substring"](_0x801E["iend"], _0x80BC["istart"]);
                        _0x801E = abc["clone"](_0x80BC, 2);
                        _0x80BC = _0x80BC["ts_next"]
                    }
                    ;_0x6A35 += _0x5D8E["substring"](_0x801E["iend"]);
                    $("#source")["val"](_0x6A35);
                    doLog();
                    src_change();
                    return
                } else {
                    var _0x5D8E = $("#source")["val"]();
                    var _0x6A35 = _0x5D8E["substring"](0, _0x7DF5["istart"]) + "|";
                    var _0x801E = abc["clone"](_0x7DF5, 2);
                    var _0x80BC = _0x7DF5["ts_next"];
                    while (_0x80BC && _0x80BC["type"] == 0) {
                        _0x6A35 += _0x5D8E["substring"](_0x801E["iend"], _0x80BC["istart"]) + "|";
                        _0x801E = abc["clone"](_0x80BC, 2);
                        _0x80BC = _0x80BC["ts_next"]
                    }
                    ;_0x6A35 += _0x5D8E["substring"](_0x801E["iend"]);
                    $("#source")["val"](_0x6A35);
                    doLog();
                    src_change();
                    return
                }
            }
        }
        ;console["log"]("\u4e0d\u5141\u8bb8\u5220\u9664\u8fd9\u4e2a\u5c0f\u8282\u7ebf");
        return
    }
    ;if ($("text[type=\'zs\'][selected=\'selected\']")["length"] > 0) {
        var _0x7EE2 = $("text[type=\'zs\'][selected=\'selected\']")["attr"]("gch_istart");
        var _0x7E93 = $("text[type=\'zs\'][selected=\'selected\']")["attr"]("gch_iend");
        var _0x5D8E = $("#source")["val"]();
        _0x5D8E = _0x5D8E["substring"](0, _0x7EE2) + _0x5D8E["substring"](_0x7E93);
        $("#source")["val"](_0x5D8E);
        doLog();
        src_change();
        return
    }
    ;if ($(".selected_text[type=\"bracket\"]")["length"] > 0 || $(".selected_text[type=\"brace\"]")["length"] > 0) {
        var _0x7D08 = "";
        var _0x7CB9 = "";
        if ($(".selected_text[type=\"bracket\"]")["length"] > 0) {
            _0x7D08 = "[";
            _0x7CB9 = "]"
        } else {
            if ($(".selected_text[type=\"brace\"]")["length"] > 0) {
                _0x7D08 = "{";
                _0x7CB9 = "}"
            }
        }
        ;var _0x5D8E = $("#source")["val"]();
        var _0x5FB7 = getLinesInfo(_0x5D8E);
        var _0x6A35 = "";
        for (var _0x5E7B = 0; _0x5E7B < _0x5FB7["length"]; _0x5E7B++) {
            var _0x69E6 = _0x5FB7[_0x5E7B];
            var _0x6006 = _0x69E6["lineStr"];
            if (_0x6006["indexOf"]("%%score") > -1 || _0x6006["indexOf"]("%%staves") > -1) {
                _0x6006 = _0x6006["replace"](_0x7D08, "")["replace"](_0x7CB9, "")
            }
            ;_0x6A35 += _0x6006 + "\x0A"
        }
        ;$("#source")["val"](_0x6A35);
        src_change(doLog);
        return
    }
    ;if ($("text[type=\'lyric\'][selected=\'selected\']")["length"] > 0) {
        var _0x83D2 = $("text[type=\'lyric\'][selected=\'selected\']");
        var _0x622F = $(_0x83D2)["attr"]("lyric_istart");
        var _0x7F31 = $(_0x83D2)["attr"]("lyric_iend");
        var _0x5D8E = $("#source")["val"]();
        _0x5D8E = _0x5D8E["substring"](0, _0x622F) + "*" + _0x5D8E["substring"](_0x7F31);
        $("#source")["val"](_0x5D8E);
        doLog();
        src_change();
        return
    }
    ;if (selectDecoInfo != null) {
        delSelectDeco();
        return
    }
    ;if ($("rect[type=\'startpoint\']")["length"] > 0) {
        var _0x75EF = $("rect[type=\'startpoint\']")["attr"]("target");
        var _0x85AC = $("#" + _0x75EF)["attr"]("type");
        if (_0x85AC == "bracketgch") {
            var _0x84BF = $("#" + _0x75EF)["attr"]("seq");
            var _0x850E = $("#" + _0x75EF)["attr"]("subtype");
            delBracketGch(_0x84BF, _0x850E)
        } else {
            delCuntomSlur()
        }
        ;return
    }
    ;if (delObj == null) {
        if (typeof (window["top"]["swAutoAlert"]) == "function") {
            window["top"]["swAutoAlert"]("\u8bf7\u9009\u4e2d\u9700\u5220\u9664\u7684\u97f3\u7b26")
        } else {
            window["top"]["alert"]("\u8bf7\u9009\u4e2d\u9700\u5220\u9664\u7684\u97f3\u7b26")
        }
        ;return
    }
    ;if (delObj["click_obj"] == null) {
        return
    }
    ;var _0x622F = $(delObj["click_obj"])["attr"]("istart");
    if (!_0x622F) {
        return
    }
    ;cen = syms[_0x622F];
    if (cen["type"] == 14) {
        var _0x5D8E = $("#source")["val"]();
        _0x5D8E = "%%hiddenspeed\x0A" + _0x5D8E;
        $("#source")["val"](_0x5D8E);
        src_change();
        doLog();
        return
    }
    ;var _0x8247 = cen["notes"];
    if (!_0x8247) {
        return
    }
    ;var _0x5D8E = $("#source")["val"]();
    if (_0x8247["length"] == 1) {
        var _0x772B = _0x5D8E["substring"](cen["istart"], cen["iend"]);
        if (_0x772B["indexOf"](":") > -1) {
            if (_0x772B["indexOf"]("M:") > -1) {} else {
                _0x5D8E = _0x5D8E["substr"](0, cen["istart"]) + _0x5D8E["substr"](cen["iend"])
            }
            ;$("#source")["val"](_0x5D8E);
            src_change();
            return
        }
        ;var _0x864A = _0x772B["replace"](/[\[\]\_\^\=\,\']/g, "")["replace"](/[a-gA-G]/, "z,");
        if (cen["type"] == 10) {} else {
            if (cen["grace"]) {
                var _0x8383 = -1;
                var _0x815A = -1;
                for (var _0x5E7B = cen["istart"] - 1; _0x5E7B > 0; _0x5E7B--) {
                    var _0x7C6A = _0x5D8E["charAt"](_0x5E7B);
                    if (_0x7C6A != " ") {
                        _0x8383 = _0x5E7B;
                        break
                    }
                }
                ;for (var _0x5E7B = cen["iend"] + 1; _0x5E7B < syms["length"]; _0x5E7B++) {
                    var _0x7C6A = _0x5D8E["charAt"](_0x5E7B);
                    if (_0x7C6A != " ") {
                        _0x815A = _0x5E7B;
                        break
                    }
                }
                ;var _0x7DA6 = _0x5D8E["substring"](_0x8383, _0x815A);
                var _0x8296 = _0x5D8E["substring"](cen["istart"], cen["iend"]);
                if (_0x7DA6["replace"](/\s/, "")["replace"](/[\{\}]/g, "") == _0x8296) {
                    var _0x71EC = _0x7DA6["replace"](/\{.*\}/, "");
                    if (cen["sl2"]) {
                        var _0x82E5 = -1
                          , _0x810B = -1;
                        for (var _0x5E7B = _0x8383; _0x5E7B > _0x8383 - 5; _0x5E7B--) {
                            var _0x7C6A = _0x5D8E["charAt"](_0x5E7B);
                            if (_0x7C6A == "(") {
                                _0x82E5 = _0x5E7B;
                                break
                            }
                        }
                        ;for (_0x5E7B = _0x815A; _0x5E7B < _0x815A + 5; _0x5E7B++) {
                            var _0x7C6A = _0x5D8E["charAt"](_0x5E7B);
                            if (_0x7C6A == ")") {
                                _0x810B = _0x5E7B
                            }
                        }
                        ;var _0x855D = _0x5D8E["substring"](_0x82E5 + 1, _0x810B);
                        _0x5D8E = _0x5D8E["substr"](0, _0x82E5) + _0x855D["replace"](/\{.*\}/, "") + _0x5D8E["substr"](_0x810B + 1)
                    } else {
                        _0x5D8E = _0x5D8E["substr"](0, _0x8383) + _0x71EC + _0x5D8E["substr"](_0x815A)
                    }
                } else {
                    _0x5D8E = _0x5D8E["substr"](0, cen["istart"]) + _0x5D8E["substr"](cen["iend"])
                }
            } else {
                _0x5D8E = _0x5D8E["substr"](0, cen["istart"]) + _0x864A + _0x5D8E["substr"](cen["iend"])
            }
        }
        ;$("#source")["val"](_0x5D8E);
        src_change();
        doLog()
    } else {
        if (_0x8247["length"] > 1) {
            var _0x772B = _0x5D8E["substring"](cen["istart"], cen["iend"]);
            var _0x81A9 = str2notes(_0x772B);
            var _0x806D = "";
            var _0x79F2 = $(delObj["click_obj"])["parents"]("svg")["find"]("text[type=\'hd\']." + _0x622F + ",text[type=\'Hd\']." + _0x622F + ",text[type=\'HD\']." + _0x622F + ",text[type=\'note\'][istart=\'" + _0x622F + "\']")["sort"](function(_0x8699, _0x86E8) {
                return $(_0x86E8)["attr"]("y") - $(_0x8699)["attr"]("y")
            });
            var _0x7D57 = $(delObj["click_obj"])["attr"]("y");
            var _0x7E44 = false;
            for (var _0x5E7B = 0; _0x5E7B < _0x79F2["length"]; _0x5E7B++) {
                if (_0x7D57 == $(_0x79F2[_0x5E7B])["attr"]("y") && !_0x7E44) {
                    _0x7E44 = true
                } else {
                    _0x806D += _0x81A9[_0x5E7B]["note"]
                }
            }
            ;var _0x7328 = 0;
            if (_0x8247["length"] == 2) {
                _0x7328 = 1
            }
            ;_0x806D = _0x772B["substring"](0, _0x772B["indexOf"]("[") + 1 - _0x7328) + _0x806D + _0x772B["substring"](_0x772B["indexOf"]("]") + _0x7328);
            _0x5D8E = _0x5D8E["substr"](0, cen["istart"]) + _0x806D + _0x5D8E["substr"](cen["iend"]);
            $("#source")["val"](_0x5D8E);
            src_change();
            doLog()
        }
    }
}
function delCuntomSlur() {
    var _0x75EF = $("rect[type=\'startpoint\']")["attr"]("target");
    var _0x74B3 = $("path[id=\'" + _0x75EF + "\']");
    var _0x7551 = $(_0x74B3)["attr"]("ss_istart");
    var _0x7464 = $(_0x74B3)["attr"]("es_istart");
    var _0x7502 = syms[_0x7551];
    var _0x7415 = syms[_0x7464];
    var _0x75A0 = "\"" + getGch(_0x7502, "(slur-") + "\"";
    var _0x73C6 = "\"" + getGch(_0x7415, ")slur-") + "\"";
    var _0x5D8E = $("#source")["val"]();
    _0x5D8E = _0x5D8E["replace"](_0x75A0, "")["replace"](_0x73C6, "");
    $("#source")["val"](_0x5D8E);
    doLog();
    src_change()
}
function delSelectDeco() {
    var _0x63BA = $(selectDecoInfo)["attr"]("type");
    var _0x5D8E = $("#source")["val"]();
    var _0x6A35 = "";
    if (_0x63BA["indexOf"]("sd8") == 0) {
        var _0x622F = $(selectDecoInfo)["attr"]("istart");
        var _0x7A41 = _0x5D8E["substring"](0, _0x622F);
        _0x7A41 = replaceLast(_0x7A41, "!showsd8!", "");
        var _0x7BCC = _0x5D8E["substring"](_0x622F);
        _0x6A35 = _0x7A41 + _0x7BCC
    } else {
        if (_0x63BA == "tie") {
            var _0x7ADF = $(selectDecoInfo)["attr"]("start");
            var _0x7867 = $(selectDecoInfo)["attr"]("end");
            var _0x7A41 = _0x5D8E["substring"](0, _0x7ADF);
            var _0x7954 = _0x5D8E["substring"](_0x7ADF, _0x7867)["replace"]("-", "");
            var _0x7BCC = _0x5D8E["substring"](_0x7867);
            _0x6A35 = _0x7A41 + _0x7954 + _0x7BCC
        } else {
            if (eqs("jq,jr,slur,8va,8vb,15ma,15mb", _0x63BA)) {
                var _0x7A41, _0x7954, _0x7BCC;
                var _0x7B7D = deco_params[_0x63BA]["start"];
                var _0x7905 = deco_params[_0x63BA]["end"];
                var _0x7A90 = $(selectDecoInfo)["attr"]("start");
                var _0x7818 = $(selectDecoInfo)["attr"]("end");
                _0x7B7D = _0x7B7D["replace"]("(", "\\(")["replace"](")", "\\)");
                _0x7905 = _0x7905["replace"]("(", "\\(")["replace"](")", "\\)");
                var _0x7C1B = -1;
                if (parseInt(_0x7818) < parseInt(_0x7A90)) {
                    _0x7C1B = _0x7A90 + 0;
                    _0x7A90 = _0x7818 + 0;
                    _0x7818 = _0x7C1B
                }
                ;var _0x7B2E = new RegExp("([\\s\\S]*)(" + _0x7B7D + ")");
                var _0x78B6 = new RegExp("(.*)(" + _0x7905 + ")");
                _0x7A41 = _0x5D8E["substring"](0, _0x7A90);
                var _0x79A3 = _0x7B2E["exec"](_0x7A41);
                _0x7A41 = _0x7A41["replace"](_0x7B2E, "$1");
                _0x7954 = _0x5D8E["substring"](_0x7A90, _0x7818);
                if (_0x63BA == "slur") {
                    _0x7BCC = _0x5D8E["substr"](_0x7818)["replace"](")", "")
                } else {
                    _0x7954 = _0x7954["replace"](_0x78B6, "$1");
                    _0x7BCC = _0x5D8E["substr"](_0x7818)
                }
                ;_0x6A35 = _0x7A41 + _0x7954 + _0x7BCC;
                switch (_0x63BA) {
                case "jq":
                    _0x63BA = "cresc";
                    break;
                case "jr":
                    _0x63BA = "dim";
                    break
                }
                ;_0x6A35 = delDecoPosInfo(_0x6A35, syms[_0x7818], _0x63BA)
            } else {
                if (eqs("0,1,2,3,4,5", _0x63BA)) {
                    var _0x622F = $(selectDecoInfo)["attr"]("istart");
                    var _0x6681 = syms[_0x622F];
                    if (_0x6681) {
                        var _0x77C9 = getA_ddInfo(_0x6681, "fng");
                        for (var _0x5E7B = 0; _0x5E7B < _0x77C9["length"]; _0x5E7B++) {
                            var _0x777A = _0x77C9[_0x5E7B];
                            if (_0x777A["str"] == _0x63BA) {
                                _0x6A35 = _0x5D8E["substring"](0, _0x777A["istart"]) + _0x5D8E["substring"](_0x777A["iend"]);
                                _0x6A35 = delDecoPosInfo(_0x6A35, syms[_0x622F], _0x63BA);
                                break
                            }
                        }
                    }
                } else {
                    if (_0x63BA == "tubrn") {
                        var _0x622F = $(selectDecoInfo)["attr"]("istart");
                        var _0x79F2 = deco_params[_0x63BA];
                        var _0x772B = "";
                        if (_0x79F2) {
                            _0x772B = deco_params[_0x63BA]["start"]
                        }
                        ;_0x772B = _0x772B["replace"]("(", "\\(")["replace"](")", "\\)")["replace"](/\./g, "\\.");
                        var _0x7B2E = new RegExp("(.*)" + _0x772B);
                        var _0x7A41;
                        _0x7A41 = _0x5D8E["substring"](0, _0x622F);
                        _0x7A41 = _0x7A41["replace"](_0x7B2E, "$1");
                        _0x6A35 = _0x7A41 + _0x5D8E["substring"](_0x622F);
                        _0x6A35 = delDecoPosInfo(_0x6A35, syms[_0x622F], _0x63BA)
                    } else {
                        if (abc2svg["diag"] && abc2svg["diag"]["cd"][_0x63BA]) {
                            var _0x622F = $(selectDecoInfo)["attr"]("istart");
                            var _0x6681 = syms[_0x622F];
                            var _0x76DC = _0x6681["a_gch"];
                            if (_0x76DC) {
                                for (var _0x5E7B = 0; _0x5E7B < _0x76DC["length"]; _0x5E7B++) {
                                    if (_0x76DC[_0x5E7B]["text"] == _0x63BA) {
                                        _0x6A35 = _0x5D8E["substring"](0, _0x76DC[_0x5E7B]["istart"]) + _0x5D8E["substring"](_0x76DC[_0x5E7B]["iend"]);
                                        _0x6A35 = delDecoPosInfo(_0x6A35, syms[_0x622F], _0x63BA)
                                    }
                                }
                            }
                        } else {
                            var _0x622F = $(selectDecoInfo)["attr"]("istart");
                            var _0x6681 = syms[_0x622F];
                            if (_0x6681) {
                                var _0x77C9 = getA_ddInfo(_0x6681, _0x63BA);
                                if (_0x77C9["length"] > 0) {
                                    var _0x777A = _0x77C9[0];
                                    _0x6A35 = _0x5D8E["substring"](0, _0x777A["istart"]) + _0x5D8E["substring"](_0x777A["iend"]);
                                    _0x6A35 = delDecoPosInfo(_0x6A35, syms[_0x622F], _0x63BA)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    ;if (_0x6A35 == "") {
        return
    }
    ;$("#source")["val"](_0x6A35);
    doLog();
    src_change();
    return
}
function delDecoPosInfo(_0x772B, _0x6681, _0x63BA) {
    var _0x768D = getDecoPos(_0x6681["istart"], _0x63BA);
    if (_0x768D) {
        var _0x763E = _0x6681["a_gch"];
        for (var _0x5E7B = 0; _0x5E7B < _0x763E["length"]; _0x5E7B++) {
            var _0x76DC = _0x763E[_0x5E7B];
            if (_0x76DC["text"]["indexOf"]("{\'gchtype\':") > -1) {
                _0x772B = _0x772B["replace"]("\"" + _0x76DC["text"] + "\"", "")
            }
        }
    }
    ;return _0x772B
}
var d_reg = /m(.*)v/;
function graphMouseMoveHandle(_0x64A7) {
    var _0xE066 = new Date()["getTime"]();
    if ((_0xE066 - clickTimeMill) < 200) {
        return
    }
    ;var _0x5D8E = $("#source")["val"]();
    if (musicType == "2") {
        var _0xC4EF = getSelectText("source");
        if (_0xC4EF == "") {
            var _0xE3CB = $(".selected_text[type=\'note\']");
            if (_0xE3CB["length"] > 0) {
                var _0xE1A2 = $(_0xE3CB)["attr"]("istart");
                var _0x6681 = syms[_0xE1A2];
                if (_0x6681) {
                    _0xC4EF = _0x5D8E["substring"](_0x6681["istart"], _0x6681["iend"])
                }
            }
        }
        ;if (_0xC4EF != "" && dragNumNoteFlag) {
            try {
                numStaffDrag(_0x64A7)
            } catch (_0x64A7) {
                console["log"](_0x64A7)
            }
        }
        ;return
    }
    ;if (select_note_info == null || select_note_info["click_obj"] == null) {
        return
    }
    ;if (rest) {
        return
    }
    ;if ($(select_note_info["click_obj"])["attr"]("type")) {
        if ($(select_note_info["click_obj"])["attr"]("type")["indexOf"]("r") == 0) {
            return
        }
    }
    ;var _0x8C27 = _0x64A7["target"];
    if (_0x8C27["tagName"]["toLowerCase"]() == "rect") {
        _0x8C27 = $(_0x8C27)["parents"]("svg")
    } else {
        _0x8C27 = $(_0x8C27)
    }
    ;if (_0x64A7["touches"]) {
        _0x64A7["offsetX"] = _0x64A7["touches"][0]["pageX"] - _0x8C27["offset"]()["left"];
        _0x64A7["offsetY"] = _0x64A7["touches"][0]["pageY"] - _0x8C27["offset"]()["top"]
    }
    ;var _0x8C76 = getYinfo($(select_note_info["click_obj"])["parents"]("svg"), _0x64A7["offsetY"] / scale);
    console["log"](_0x8C76);
    if (_0x8C76 == null || !_0x8C76) {
        return
    }
    ;if (!_0x8C76 || _0x8C76 == null || _0x8C76 == undefined) {
        return
    }
    ;var _0x622F = $(select_note_info["click_obj"])["attr"]("istart");
    if (syms[_0x622F] && syms[_0x622F]["type"] == 14) {
        return
    }
    ;$("use[type=\'demo_hl\']")["remove"]();
    $(select_note_info["click_obj"])[0]["setAttribute"]("y", _0x8C76["y"]);
    var _0x7D57 = $(select_note_info["click_obj"])["attr"]("y");
    var _0x74B3 = $("path[type=\'stem\'][istart=\'" + _0x622F + "\']");
    cen = syms[_0x622F];
    if (!cen) {
        return
    }
    ;if (cen && cen["notes"] && cen["notes"]["length"] == 1) {
        if (_0x74B3["length"] > 0) {
            var _0x951A = $(_0x74B3)["attr"]("d");
            var _0xE32D = /m(.*)v/;
            var _0xE2DE = _0x951A["match"](_0xE32D);
            var _0xE28F = _0xE2DE[1];
            var _0xE1F1 = _0xE28F["split"](" ");
            var _0xE37C = _0x951A["replace"](_0xE28F, _0xE1F1[0] + " " + _0x7D57);
            $(_0x74B3)["attr"]("d", _0xE37C)
        }
        ;var _0xE0B5 = $("text[type^=\'flu\'][istart=\'" + _0x622F + "\'],text[type^=\'fld\'][istart=\'" + _0x622F + "\']");
        if (_0xE0B5["length"] > 0) {
            var _0xE104 = $(_0xE0B5)["attr"]("ori_y");
            if (!_0xE104) {
                $(_0xE0B5)["attr"]("ori_y", $(_0xE0B5)["attr"]("y"))
            }
            ;var _0xA439 = parseFloat($(select_note_info["click_obj"])["attr"]("ori_y"));
            var _0xE240 = parseFloat(_0x7D57) - _0xA439;
            var _0xE153 = parseFloat($(_0xE0B5)["attr"]("ori_y"));
            $(_0xE0B5)["attr"]("y", _0xE153 + _0xE240)
        }
    }
    ;cen["mouse_pos"] = _0x8C76["mouse_pos"];
    var _0xE41A = $(cen)["attr"]("x");
    if (_0x8C76) {
        var _0x8AEB = _0x8C76["num"];
        console["log"]("lineNum:", _0x8AEB);
        if (_0x8AEB != 0) {
            draw_short_line(_0x8AEB, parseFloat($(select_note_info["click_obj"])["attr"]("x")), _0x8C76, $(_0x8C27)["parents"]("svg"))
        }
    }
    ;console["log"]("graphMouseMoveHandle-end:", (new Date())["getTime"]());
    rest = true;
    setTimeout(function() {
        rest = false
    }, 33)
}
var note_reg = /(\^){0,2}(\_){0,2}(\=){0,1}[A-Ya-y][\,\'\/|1-9]*/g;
var staff_order = ["c", "d", "e", "f", "g", "a", "b"];
function str2notes(_0x772B) {
    var _0x8247 = _0x772B["match"](note_reg);
    var _0x101BA = new Array();
    if (_0x8247 != null) {
        for (var _0x5E7B = 0; _0x5E7B < _0x8247["length"]; _0x5E7B++) {
            var _0xAFF3 = _0x8247[_0x5E7B];
            var _0xB3F6 = findIndexByNote(_0xAFF3["replace"](/\d/, ""));
            var _0x93DE = new Object();
            _0x93DE["note"] = _0xAFF3;
            _0x93DE["index"] = _0xB3F6;
            _0x101BA["push"](_0x93DE)
        }
    }
    ;return _0x101BA["sort"](function(_0x8699, _0x86E8) {
        return _0x8699["index"] - _0x86E8["index"]
    })
}
function synStem(_0x6681, _0x10432, _0x102F6) {
    if (_0x6681["beam_st"] && _0x6681["beam_end"]) {
        if ($(_0x10432)["length"] > 0) {
            var _0x951A = $(_0x10432)["attr"]("d");
            var _0x7328 = d_reg["exec"](_0x951A);
            if (_0x7328 != null) {
                if (_0x6681["notes"]["length"] == 0) {
                    var _0x103E3 = _0x7328[1];
                    var _0x10345 = _0x7328[1];
                    var _0x947C = _0x10345["split"](" ");
                    var _0x10394 = 0;
                    if (_0x947C["length"] > 0) {
                        _0x10394 = parseFloat(_0x947C[1]) - _0x102F6
                    }
                    ;_0x951A = _0x951A["replace"](_0x103E3, _0x947C[0] + " " + _0x10394)
                } else {}
            }
            ;$(_0x10432)[0]["setAttribute"]("d", _0x951A)
        }
    }
}
function synTail(_0x6681, _0x10481, _0x102F6) {
    if ($(_0x10481)["length"] > 0) {
        $(_0x10481)[0]["setAttribute"]("y", parseFloat($(_0x10481)["attr"]("y")) - _0x102F6)
    }
}
function graphMouseUpHandle(_0x64A7) {
    var _0xE066 = new Date()["getTime"]();
    if ((_0xE066 - clickTimeMill) < 200) {
        select_note_info = null;
        return
    }
    ;console["log"]("graphMouseUpHandle:", select_note_info);
    if (select_note_info != null && cen != null) {
        if (cen["type"] == 0) {
            return
        }
        ;var _0x8247 = cen["notes"];
        var _0x5D8E = $("#source")["val"]();
        var _0x622F = $(select_note_info["click_obj"])["attr"]("istart");
        var _0xA439 = $(select_note_info["click_obj"])["attr"]("ori_y");
        var _0xE469 = $(select_note_info["click_obj"])["attr"]("y");
        if (_0xA439 && _0xA439 == _0xE469) {
            select_note_info = null;
            return
        }
        ;if (_0x8247 && _0x8247["length"] == 1) {
            var _0xB2BA = getNewNote(cen);
            console["log"]("noteobj:", _0xB2BA["note"]);
            var _0xAFF3 = _0xB2BA["note"];
            var _0xB26B = genNoteAndDur(_0xAFF3, cen);
            _0xB26B["note"] = _0xAFF3;
            update_note_istart = _0x622F;
            update_note_index = 0;
            console["log"]("2:graphMouseMoveHandle-start:", (new Date())["getTime"]());
            replaceNote("source", cen["istart"], cen["iend"], _0xB26B)
        } else {
            var _0xA488 = $(select_note_info["click_obj"])["attr"]("update_index");
            if (!_0xA488) {
                select_note_info = null;
                return
            }
            ;var _0xB2BA = getNewNote(cen);
            var _0xAFF3 = _0xB2BA["note"];
            update_note_istart = _0x622F;
            var _0x772B = _0x5D8E["substring"](cen["istart"], cen["iend"]);
            var _0x81A9 = str2notes(_0x772B);
            var _0xAB03 = "";
            if (_0x81A9[0] != "") {
                _0xAB03 = _0x81A9[0]["note"]["replace"](/[a-zA-Z]/g, "")["replace"](/[\,\'\=\^\_]/g, "")
            }
            ;var _0x806D = "";
            for (var _0x5E7B = 0; _0x5E7B < _0x81A9["length"]; _0x5E7B++) {
                if (_0x5E7B != parseInt(_0xA488)) {
                    _0x806D += _0x81A9[_0x5E7B]["note"]
                } else {
                    _0x806D += _0xAFF3 + _0xAB03
                }
            }
            ;var _0xE4B8 = str2notes(_0x806D);
            _0x806D = "";
            for (var _0x5E7B = 0; _0x5E7B < _0xE4B8["length"]; _0x5E7B++) {
                _0x806D += _0xE4B8[_0x5E7B]["note"]
            }
            ;_0x806D = _0x772B["substring"](0, _0x772B["indexOf"]("[") + 1) + _0x806D + _0x772B["substring"](_0x772B["indexOf"]("]"));
            _0x5D8E = _0x5D8E["substr"](0, cen["istart"]) + _0x806D + _0x5D8E["substr"](cen["iend"]);
            if (_0x806D != _0x772B) {
                $("#source")["val"](_0x5D8E);
                doLog();
                render()
            }
        }
    }
    ;select_note_info = null
}
function restoreRest() {
    if ($(".reststatus")["hasClass"]("selected")) {
        $(".reststatus")["click"]()
    }
}
function restoreChord() {
    if ($(".chord.selected")["length"] > 0) {
        $(".chord.selected")["click"]()
    }
}
var dragObj = null;
function initDecoDrag() {
    var _0xE5F4 = false;
    var _0xE5A5 = false;
    var _0xE643 = null;
    var _0xE556 = ".cmenu";
    $(_0xE556)["attr"]("draggable", false);
    $(_0xE556)["off"]("touchstart")["on"]("touchstart", _0xE507);
    $(_0xE556)["off"]("mousedown")["mousedown"](_0xE507);
    function _0xE507(_0x64A7) {
        if ($("rect[type=\'startpoint\']")["length"] > 0) {
            src_change()
        }
        ;if ($("#graphEditorMenuInsert")["hasClass"]("menu-pressed")) {
            graph_update = true;
            draw_editor = false;
            $("#use_black")["remove"]();
            if ($("#graphEditorMenuInsert")) {
                $("#graphEditorMenuInsert")["removeClass"]("menu-pressed")
            }
            ;if ($("#graphEditorMenuUpdate")) {
                $("#graphEditorMenuUpdate")["addClass"]("menu-pressed")
            }
            ;$("#selectedStatus")["removeClass"]("menu-pressed")
        }
        ;var _0xE730 = _0x64A7["touches"] ? _0x64A7["touches"][0]["pageX"] : _0x64A7["pageX"];
        var _0xE77F = _0x64A7["touches"] ? _0x64A7["touches"][0]["pageY"] : _0x64A7["pageY"];
        var _0xE6E1 = _0x64A7["touches"] ? "touchmove" : "mousemove";
        var _0x7867 = _0x64A7["touches"] ? "touchend" : "mouseup";
        var $that = $(this);
        dragObj = this;
        var _0xE7CE = $that["attr"]("src");
        _0xE643 = setTimeout(function() {
            isSelectDeco = true;
            var _0xE9F7 = {
                left: $("#target")["offset"]()["left"],
                top: $("#target")["offset"]()["top"],
                width: $("#target")["width"](),
                height: $("#target")["height"]()
            };
            var _0xE90A = true;
            var _0xE8BB = "<img draggable=\"false\" ondragstart=\"return false;\" src=\"_src\" class=\"drag-note-img\" style=\"top:_top;left:_left;\"/>";
            var _0xE86C = $that["attr"]("data-code");
            var _0x63BA = $that["attr"]("data-type");
            var _0xE9A8 = $that["attr"]("data-music-type");
            var _0xA0D4 = $that["attr"]("value");
            var _0xEA95 = $that["attr"]("value2");
            var _0xAF06 = $that["attr"]("dur");
            var _0xE959 = $that["attr"]("data-know-id");
            var _0xEA46 = $that["attr"]("position");
            var _0xA978 = $that["attr"]("type");
            console["log"]("----------", _0xA978);
            selectDecoType = _0xA978;
            var _0xE81D = $that["attr"]("class");
            if (typeof (draw_editor) != undefined) {
                draw_editor = true
            }
            ;_0xE8BB = _0xE8BB["replace"]("_top", _0xE77F + "px")["replace"]("_left", _0xE730 + "px")["replace"]("_src", _0xE7CE);
            $(".drag-note-img")["remove"]();
            $("body")["append"](_0xE8BB);
            if (_0x64A7 && _0x64A7["stopPropagation"]) {
                _0x64A7["stopPropagation"]()
            } else {
                window["event"]["cancelBubble"] = true
            }
            ;$(document)["off"](_0xE6E1)["on"](_0xE6E1, function(_0x64A7) {
                _0xE730 = _0x64A7["touches"] ? _0x64A7["touches"][0]["pageX"] : _0x64A7["pageX"];
                _0xE77F = _0x64A7["touches"] ? _0x64A7["touches"][0]["pageY"] : _0x64A7["pageY"];
                if (_0xE90A) {
                    $(".drag-note-img")["css"]({
                        top: _0xE77F,
                        left: _0xE730
                    });
                    if (_0xE730 > _0xE9F7["left"] && _0xE730 < _0xE9F7["left"] + _0xE9F7["width"] && _0xE77F > _0xE9F7["top"] && _0xE77F < _0xE9F7["top"] + _0xE9F7["height"]) {
                        _0xE5F4 = false;
                        _0xE5A5 = true;
                        if (_0x64A7["touches"]) {
                            var _0xEAE4 = $("svg");
                            for (var _0x5E7B = 0; _0x5E7B < _0xEAE4["length"]; _0x5E7B++) {
                                var _0x6BC0 = _0xEAE4["eq"](_0x5E7B);
                                if (_0xE730 > _0x6BC0["offset"]()["left"] && _0xE77F > _0x6BC0["offset"]()["top"] && _0xE730 < _0x6BC0["offset"]()["left"] + _0x6BC0["width"]() && _0xE77F < _0x6BC0["offset"]()["top"] + _0x6BC0["height"]()) {
                                    _0x64A7["target"] = _0x6BC0[0];
                                    break
                                }
                            }
                            ;var _0x8C27 = _0x64A7["target"];
                            _0x64A7["offsetX"] = _0x64A7["touches"][0]["pageX"] - $(_0x8C27)["offset"]()["left"];
                            _0x64A7["offsetY"] = _0x64A7["touches"][0]["pageY"] - $(_0x8C27)["offset"]()["top"];
                            console["log"]("decoType:", _0xA978);
                            if (_0xA978 == "linkclef") {
                                movingRenderStaff(_0x64A7)
                            } else {
                                if (_0xA978 == "nodeline") {
                                    moveingRenderBar(_0x64A7)
                                } else {
                                    mousemovehandler(_0x64A7)
                                }
                            }
                        }
                    }
                }
            })["off"](_0x7867)["on"](_0x7867, function(_0x64A7) {
                _0xE90A = false;
                if (!isSelectDeco) {
                    return
                }
                ;$(".drag-note-img")["remove"]();
                console["log"]("---end");
                dragObj = null;
                console["log"]("value:", _0xA0D4, "position", _0xEA46);
                genNoteDeco(_0xA0D4, _0xEA95, _0xEA46, _0xA978, $that);
                isSelectDeco = false;
                selectDecoType = "";
                if (!$("#graphEditorMenu")["hasClass"]("menu-pressed")) {
                    draw_editor = false
                }
            })
        }, 200)
    }
    $(_0xE556)["off"]("mouseup")["mouseup"](function() {
        if (_0xE643 != null) {
            clearTimeout(_0xE643)
        }
        ;if (typeof (draw_editor) != undefined) {
            draw_editor = false
        }
    })["off"]("touchend")["on"]("touchend", function() {
        if (_0xE643 != null) {
            clearTimeout(_0xE643)
        }
    })
}
function selectBar(_0x8C27, _0xDE3D, _0xCA7D, _0xFB3F) {
    if (graphEditor["pianoImpro"] && graphEditor["pianoImpro"]["isOpen"]) {
        return
    }
    ;var _0x6409 = _0xDE3D["offsetX"];
    var _0x6458 = _0xDE3D["offsetY"];
    var _0x8AEB = $(_0x8C27)["attr"]("index");
    var _0xDA89 = getClickBarIndex(_0x6409, _0x6458, _0xCA7D, _0x8AEB);
    if (_0xDA89 == -1) {
        return
    }
    ;var _0xC854 = new Array();
    if (user["isShift"]) {
        if (lastSelectBarIndex != -1) {
            var _0xFBDD = -1;
            if (lastSelectBarIndex > _0xDA89) {
                _0xFBDD = lastSelectBarIndex + 0;
                lastSelectBarIndex = _0xDA89;
                _0xDA89 = _0xFBDD
            }
            ;for (var _0x5E7B = lastSelectBarIndex; _0x5E7B <= _0xDA89; _0x5E7B++) {
                var _0x86E8 = new Object();
                _0x86E8["bar_num"] = _0x5E7B;
                _0x86E8["color"] = "red";
                _0x86E8["stroke"] = "red";
                _0xC854["push"](_0x86E8)
            }
        }
    } else {
        var _0x86E8 = new Object();
        _0x86E8["bar_num"] = _0xDA89;
        _0x86E8["color"] = "red";
        _0x86E8["stroke"] = "red";
        _0xC854["push"](_0x86E8)
    }
    ;lastSelectBarIndex = _0xDA89;
    $("svg[type=\'rectbar\']")["remove"]();
    renderByBarIndex(_0xC854, "bar");
    $("#mysvgbar" + _0xDA89)["attr"]("barIndex", _0xDA89);
    if (!$("#mysvgbar" + _0xDA89)["offset"]()) {
        return
    }
    ;var _0x66D0 = $("#mysvgbar" + _0xDA89)["offset"]()["top"];
    var _0xCE31 = $("#mysvgbar" + _0xDA89)["offset"]()["left"];
    var _0xFAF0 = getSelectBarContent(_0xDA89, 0);
    var _0xFAA1 = getPreBarInfo(_0xDA89, 0);
    if (_0xFAF0 == null) {
        return
    }
    ;if (_0xFAF0["indexOf"]("$") > -1 || (_0xFAA1 && _0xFAA1["nextBr"])) {
        $("#btnAddBr")["html"]("\u53d6\u6d88\u6362\u884c")
    } else {
        $("#btnAddBr")["html"]("\u6362\u884c")
    }
    ;if (_0xDA89 == 0) {
        $("#btnAddBr")["hide"]();
        $("#changeInstrBtn")["show"]();
        var _0xFB8E = getStaffInfo();
        if (_0xFB8E["vocalCount"] > 1) {
            $("#delStaff")["show"]()
        } else {
            $("#delStaff")["hide"]()
        }
    } else {
        $("#changeInstrBtn")["hide"]();
        $("#btnAddBr")["show"]();
        $("#delStaff")["hide"]()
    }
    ;var _0x70B0 = $(".abc-content")["offset"]()["top"];
    var _0x7061 = $(".abc-content")["offset"]()["left"];
    if (_0xFB3F) {
        $("#nodeMenu")["css"]("position", "absolute")["css"]("top", _0x66D0 - _0x70B0 - $("#nodeMenu")["height"]())["css"]("left", _0xCE31 - _0x7061);
        $("#nodeMenu")["attr"]("barIndex", _0xDA89)
    }
}
function selectNode(_0x8C27, _0xDE3D, _0xCA7D, _0xFB3F) {
    if (graphEditor["pianoImpro"] && graphEditor["pianoImpro"]["isOpen"]) {
        return
    }
    ;var _0x6409 = _0xDE3D["offsetX"];
    var _0x6458 = _0xDE3D["offsetY"];
    var _0x8AEB = $(_0x8C27)["attr"]("index");
    var _0xFC7B = getClickNodeInfo(_0x6409, _0x6458, _0xCA7D, _0x8AEB);
    if (_0xFC7B == null) {
        return
    }
    ;var _0xDA89 = _0xFC7B["node_index"];
    var _0xFC2C = _0xFC7B["v"];
    var _0xFCCA = $(_0x8C27)["find"]("g[type=\'staff\']")["length"];
    var _0xC854 = new Array();
    if (_0xDE3D["shiftKey"]) {
        if (lastSelectBarIndex != -1) {
            var _0xFBDD = -1;
            if (lastSelectBarIndex > _0xDA89) {
                _0xFBDD = lastSelectBarIndex + 0;
                lastSelectBarIndex = _0xDA89;
                _0xDA89 = _0xFBDD
            }
            ;for (var _0x5E7B = lastSelectBarIndex; _0x5E7B <= _0xDA89; _0x5E7B++) {
                if (_0xFC2C == lastSelectNodeV) {
                    var _0x86E8 = new Object();
                    _0x86E8["bar_num"] = _0x5E7B;
                    _0x86E8["color"] = "red";
                    _0x86E8["stroke"] = "red";
                    _0x86E8["v"] = _0xFC2C;
                    _0xC854["push"](_0x86E8)
                } else {
                    selectBar(_0x8C27, _0xDE3D, _0xCA7D, _0xFB3F);
                    return
                }
            }
        }
    } else {
        var _0x86E8 = new Object();
        _0x86E8["bar_num"] = _0xFC7B["node_index"];
        _0x86E8["v"] = _0xFC7B["v"];
        _0x86E8["color"] = "red";
        _0x86E8["stroke"] = "red";
        _0xC854["push"](_0x86E8)
    }
    ;lastSelectBarIndex = _0xDA89;
    lastSelectNodeV = _0xFC2C;
    $("svg[type=\'rectbar\']")["remove"]();
    renderStaffNodeBySt(_0xC854, "node");
    $("#mysvgnode" + _0xFC2C + "_" + _0xDA89)["attr"]("barIndex", _0xDA89);
    var _0x66D0 = $("#mysvgnode" + _0xFC2C + "_" + _0xDA89)["offset"]()["top"];
    var _0xCE31 = $("#mysvgnode" + _0xFC2C + "_" + _0xDA89)["offset"]()["left"];
    var _0xFAF0 = getSelectBarContent(_0xDA89, 0);
    var _0xFAA1 = getPreBarInfo(_0xDA89, 0);
    if (_0xFAF0 == null) {
        return
    }
    ;if (_0xFAF0["indexOf"]("$") > -1 || (_0xFAA1 && _0xFAA1["nextBr"])) {
        $("#btnAddBr")["html"]("\u53d6\u6d88\u6362\u884c");
        $("#notebr")["prop"]("checked", true)
    } else {
        $("#btnAddBr")["html"]("\u6362\u884c");
        $("#notebr")["prop"]("checked", false)
    }
    ;if (_0xDA89 == 0) {
        $("#btnAddBr")["hide"]();
        var _0xFB8E = getStaffInfo();
        $("#changeInstrBtn")["show"]();
        if (_0xFB8E["vocalCount"] > 1) {
            $("#delStaff")["show"]()
        } else {
            $("#delStaff")["hide"]()
        }
    } else {
        $("#changeInstrBtn")["hide"]();
        $("#btnAddBr")["show"]();
        $("#delStaff")["hide"]()
    }
    ;var _0x70B0 = $(".abc-content")["offset"]()["top"];
    var _0x7061 = $(".abc-content")["offset"]()["left"];
    if (_0xFB3F) {
        $("#nodeMenu")["css"]("position", "absolute")["css"]("top", _0x66D0 - _0x70B0 - $("#nodeMenu")["height"]())["css"]("left", _0xCE31 - _0x7061)["show"]();
        $("#nodeMenu")["attr"]("barIndex", _0xDA89)
    }
}
function getSelectNodeContent(_0xDA89, _0xA6B1) {
    var _0x7377 = new RegExp(".*%V" + _0xA6B1 + "end");
    var _0xDAD8 = $("#source")["val"]()["match"](_0x7377)
}
var lastSelectBarIndex = -1;
var lastSelectNodeV = -1;
function getClickBarIndex(_0x6409, _0x6458, _0xCA7D, _0x8AEB) {
    var _0xC8F2 = getBarLineCoor(_0xCA7D);
    for (var _0x5E7B = 0; _0x5E7B < _0xC8F2["length"]; _0x5E7B++) {
        if (_0xC8F2[_0x5E7B]["line"] == parseInt(_0x8AEB)) {
            var _0xCACC = _0xC8F2[_0x5E7B]["barline_start"][0];
            var _0xCB6A = _0xC8F2[_0x5E7B]["barline_start"][1];
            var _0xCB1B = _0xC8F2[_0x5E7B]["barline_start"][2];
            var _0xCBB9 = _0xC8F2[_0x5E7B]["barline_start"][3];
            var _0xC941 = _0xC8F2[_0x5E7B]["barline_end"][0];
            var _0xC9DF = _0xC8F2[_0x5E7B]["barline_end"][1];
            var _0xC990 = _0xC8F2[_0x5E7B]["barline_end"][2];
            var _0xCA2E = _0xC8F2[_0x5E7B]["barline_end"][3];
            if (_0x6409 >= _0xCACC && _0x6409 <= _0xC941 && _0x6458 >= _0xCB6A && _0x6458 <= _0xCBB9) {
                return _0x5E7B
            }
        }
    }
    ;return -1
}
function getClickNodeInfo(_0x6409, _0x6458, _0xCA7D, _0x8AEB) {
    var _0xCC08 = getStaffNodeCoor(_0xCA7D);
    for (var _0x5E7B = 0; _0x5E7B < _0xCC08["length"]; _0x5E7B++) {
        if (_0xCC08[_0x5E7B]["line"] == parseInt(_0x8AEB)) {
            var _0xCACC = _0xCC08[_0x5E7B]["nodeline_start"][0];
            var _0xCB6A = _0xCC08[_0x5E7B]["nodeline_start"][1];
            var _0xCB1B = _0xCC08[_0x5E7B]["nodeline_start"][2];
            var _0xCBB9 = _0xCC08[_0x5E7B]["nodeline_start"][3];
            var _0xC941 = _0xCC08[_0x5E7B]["nodeline_end"][0];
            var _0xC9DF = _0xCC08[_0x5E7B]["nodeline_end"][1];
            var _0xC990 = _0xCC08[_0x5E7B]["nodeline_end"][2];
            var _0xCA2E = _0xCC08[_0x5E7B]["nodeline_end"][3];
            if (_0x6409 >= _0xCACC && _0x6409 <= _0xC941 && _0x6458 >= _0xCB6A && _0x6458 <= _0xCBB9) {
                return _0xCC08[_0x5E7B]
            }
        }
    }
    ;return null
}
function setBarsPerstaffWithLineBreak() {
    var _0x5CF0 = $("#nodeMenu")["attr"]("barIndex")
}
function genTremlo(_0x6681, _0x680C) {
    var _0x5D8E = $("#source")["val"]();
    var _0xC3B3 = _0x6681["prev"];
    var _0x80BC = _0x6681["next"];
    var _0xC718 = "";
    var _0xC364 = "";
    var _0xC805 = "";
    var _0x6A35 = "";
    if (_0xC3B3) {
        _0xC364 = _0x5D8E["substring"](0, _0xC3B3["iend"]);
        _0x6A35 = _0xC364;
        _0xC718 = _0x5D8E["substring"](_0xC3B3["iend"], _0x6681["istart"]);
        _0xC718 = _0xC718["replace"](/\![/]*\-\!/, "");
        _0x6A35 += _0xC718;
        var _0xC6C9 = _0x5D8E["substring"](_0x6681["istart"], _0x6681["iend"]);
        _0xC6C9 = _0xC6C9["replace"](/\d/g, "")["replace"](/[\/]/g, "");
        var _0xC67A = getDurStrByNoteDur(_0x6681["dur"] * 2, _0x6681["my_ulen"]);
        if (_0xC67A == "1") {
            _0xC67A = ""
        }
        ;_0xC6C9 = _0xC6C9 + _0xC67A;
        _0x6A35 += _0x680C + _0xC6C9;
        var _0xC7B6 = _0x5D8E["substring"](_0x80BC["istart"], _0x80BC["iend"]);
        _0xC7B6 = _0xC7B6["replace"](/\d/g, "")["replace"](/[\/]/g, "");
        var _0xC767 = _0xC67A;
        _0xC7B6 = _0xC7B6 + _0xC67A;
        _0x6A35 += _0x5D8E["substring"](_0x6681["iend"], _0x80BC["istart"]);
        _0x6A35 += _0xC7B6;
        _0x6A35 += _0x5D8E["substring"](_0x80BC["iend"]);
        $("#source")["val"](_0x6A35);
        doLog();
        src_change()
    }
}
function genNoteDeco(_0x680C, _0xADCA, _0x62CD, _0xA978, _0xC13B) {
    console["log"]("cen", cen);
    var _0xC402 = $("svg[type=\'rectbar\']");
    if (_0xC402["length"] > 0) {
        console["log"]("\u8fd9\u91cc\u62d6\u52a8\u7684\u662f\u5c0f\u8282\u7c7b\u578b\u7684----\u9009\u4e2d\u7684\u5c0f\u8282\u5e8f\u53f7\uff1a", $(_0xC402)["attr"]("barIndex"));
        genBarDeco(_0x680C, _0xADCA, _0x62CD, _0xA978, $(_0xC402)["attr"]("barIndex"));
        return
    }
    ;if (_0x680C == "\"(slur\"") {
        if (cen == null || !cen["istart"]) {
            return
        }
        ;console["log"]("\u81ea\u5b9a\u4e49\u8fde\u97f3\u7ebf");
        var _0x84BF = customSlur["size"];
        var _0xC0EC = -1;
        customSlur["forEach"](function(_0xA0D4, _0xAA16) {
            _0xC0EC = parseInt(_0xAA16["replace"]("slur", ""))
        });
        _0x84BF = _0xC0EC + 1;
        var _0x7ADF = "\"(slur-" + _0x84BF + "[sx:0,sy:0,c1x:0,c1y:0,c2x:0,c2y:0]\"";
        var _0x7867 = "\")slur-" + _0x84BF + "[x:0,y:0]\"";
        var _0x5D8E = $("#source")["val"]();
        _0x5D8E = _0x5D8E["substring"](0, cen["istart"]) + _0x7ADF + _0x5D8E["substring"](cen["istart"], cen["iend"]) + _0x7867 + _0x5D8E["substring"](cen["iend"]);
        $("#source")["val"](_0x5D8E);
        doLog();
        src_change();
        return
    }
    ;if (_0x680C == "\"[-num-\"" || _0x680C == "\"_[-num-\"") {
        console["log"]("\u81ea\u5b9a\u4e49\u6807\u6ce8");
        var _0x84BF = bracketGch["size"];
        while (bracketGch["get"]("bracketgch" + _0x84BF) != null) {
            _0x84BF++
        }
        ;var _0x7ADF = "\"[-" + _0x84BF + "-\u6587\u5b57\"";
        var _0x7867 = "\"" + _0x84BF + "-]\"";
        if (_0x680C == "\"_[-num-\"") {
            _0x7ADF = "\"_[-" + _0x84BF + "-\u6587\u5b57\""
        }
        ;var _0x5D8E = $("#source")["val"]();
        _0x5D8E = _0x5D8E["substring"](0, cen["istart"]) + _0x7ADF + _0x5D8E["substring"](cen["istart"], cen["iend"]) + _0x7867 + _0x5D8E["substring"](cen["iend"]);
        $("#source")["val"](_0x5D8E);
        doLog();
        src_change();
        return
    }
    ;if (_0x680C == "\"[~num~\"" || _0x680C == "\"_[~num~\"") {
        console["log"]("\u81ea\u5b9a\u4e49\u6807\u6ce8");
        var _0x84BF = waveGch["size"];
        while (waveGch["get"]("wavegch" + _0x84BF) != null) {
            _0x84BF++
        }
        ;var _0x7ADF = "\"[~" + _0x84BF + "~\u6587\u5b57\"";
        var _0x7867 = "\"" + _0x84BF + "~]\"";
        if (_0x680C == "\"_[~num~\"") {
            _0x7ADF = "\"_[~" + _0x84BF + "~\u6587\u5b57\""
        }
        ;var _0x5D8E = $("#source")["val"]();
        _0x5D8E = _0x5D8E["substring"](0, cen["istart"]) + _0x7ADF + _0x5D8E["substring"](cen["istart"], cen["iend"]) + _0x7867 + _0x5D8E["substring"](cen["iend"]);
        $("#source")["val"](_0x5D8E);
        doLog();
        src_change();
        return
    }
    ;if (_0xA978 == "linkclef") {
        if ($(".select_staff")["length"] > 0) {
            $("g[type=\'staff\']")["find"]("path")["css"]("stroke", "black");
            genLinkClef(_0x680C)
        }
        ;return
    }
    ;if (cen == null) {
        return
    }
    ;if (_0x680C == "!/-!" || _0x680C == "!//-!" || _0x680C == "!///-!") {
        if (!cen["next"]) {
            return
        }
        ;if (cen["next"] && cen["next"]["type"] != 8) {
            return
        }
        ;genTremlo(cen, _0x680C);
        return
    }
    ;if (_0x680C == "arp_link") {
        setArpLink("source");
        return
    }
    ;if (_0xA978 == "spl") {
        dragSplNum = true;
        updateNextNote(_0x680C, cen["istart"], chordInput, true);
        dragSplNum = false;
        lastMidiReplaceNoteIstart = -1;
        lastMidiReplaceNoteV = -1;
        return
    }
    ;var _0x5D8E = $("#source")["val"]();
    if (_0x62CD == "rhythm") {
        var _0xAB03 = $(_0xC13B)["attr"]("len");
        if (_0xAB03) {
            _0xAB03 = parseInt(_0xAB03)
        } else {
            _0xAB03 = 2
        }
        ;var _0xB26B = null;
        var _0xBD38 = cen["my_bar_num"];
        var _0xBD87 = cen["dur"];
        var _0x80BC = cen["next"];
        while (_0x80BC) {
            if (_0xBD38 == _0x80BC["my_bar_num"]) {
                _0xBD87 += _0x80BC["dur"];
                _0x80BC = _0x80BC["next"]
            } else {
                break
            }
        }
        ;if (_0xBD87 < 192 * _0xAB03) {
            var _0xC3B3 = cen["prev"];
            var _0xC09D = abc["clone"](cen);
            while (_0xC3B3) {
                if (_0xBD38 != _0xC3B3["my_bar_num"]) {
                    break
                }
                ;_0xBD87 += _0xC3B3["dur"];
                _0xC09D = abc["clone"](_0xC3B3);
                if (_0xBD87 >= 192 * _0xAB03) {
                    break
                }
                ;_0xC3B3 = _0xC3B3["prev"]
            }
            ;_0xB26B = genNoteAndDur(_0x680C, _0xC09D, true, 192 * _0xAB03);
            replaceNote("source", _0xC09D["istart"], _0xC09D["iend"], _0xB26B)
        } else {
            _0xB26B = genNoteAndDur(_0x680C, cen, true, 192 * _0xAB03);
            replaceNote("source", cen["istart"], cen["iend"], _0xB26B)
        }
        ;return
    }
    ;if (_0x680C["indexOf"]("[K:") == 0 && cen["type"] == 1) {
        var _0xB3A7 = _0x5D8E["substring"](cen["istart"], cen["iend"]);
        var _0xBEC3 = /(treble)|(bass)|(alto)|(tenor)/;
        if (_0xBEC3["test"](_0xB3A7)) {
            _0xB3A7 = _0xB3A7["replace"](_0xBEC3, _0x680C["replace"]("[K:", "")["replace"]("]", ""))
        } else {
            _0xB3A7 = _0xB3A7 + " " + _0x680C["replace"]("[K:", "")["replace"]("]", "")
        }
        ;var _0x6A35 = _0x5D8E["substring"](0, cen["istart"]) + _0xB3A7 + _0x5D8E["substring"](cen["iend"]);
        $("#source")["val"](_0x6A35);
        src_change();
        doLog();
        return
    }
    ;var _0x5D8E = $("#source")["val"]();
    if (_0xA978 == "lyric") {
        updateLyrics(cen, [_0x680C]);
        return
    }
    ;if (_0x680C == "{}" || _0x680C == "{/}") {
        var _0xC4EF = _0x5D8E["substring"](cen["istart"], cen["iend"]);
        if ("before" == _0x62CD) {
            if (_0xA978 == "syy") {
                _0x680C = _0x680C["replace"]("}", "") + _0xC4EF["replace"](/\d/g, "")["replace"](/\//g, "") + _0xC4EF["replace"](/\d/g, "")["replace"](/\//g, "") + "}" + _0xC4EF
            } else {
                if (/\d+/["test"](_0xA978)) {
                    var _0xBFB0 = getDurStrByNoteDur(1536 / parseInt(_0xA978), cen["my_ulen"]);
                    if (_0xBFB0 == "1") {
                        _0xBFB0 = ""
                    }
                    ;_0x680C = _0x680C["replace"]("}", "") + _0xC4EF["replace"](/\d/g, "")["replace"](/\//g, "") + _0xBFB0 + "}" + _0xC4EF
                }
            }
        } else {
            if ("after" == _0x62CD) {
                if (_0xA978 == "syy") {
                    _0x680C = "(" + _0xC4EF + "{" + _0xC4EF["replace"](/\d/g, "")["replace"](/[\/\)]/g, "") + _0xC4EF["replace"](/\d/g, "")["replace"](/[\/\)]/g, "") + "})"
                } else {
                    if (/\d+/["test"](_0xA978)) {
                        var _0xBFB0 = getDurStrByNoteDur(1536 / parseInt(_0xA978), cen["my_ulen"]);
                        if (_0xBFB0 == "1") {
                            _0xBFB0 = ""
                        }
                        ;_0x680C = "(" + _0xC4EF + "{" + _0xC4EF["replace"](/\d/g, "")["replace"](/[\/\)]/g, "") + _0xBFB0 + "})"
                    }
                }
            }
        }
        ;_0x5D8E = _0x5D8E["substring"](0, cen["istart"]) + _0x680C + _0x5D8E["substring"](cen["iend"]);
        $("#source")["val"](_0x5D8E);
        if (musicType == 2) {
            src_change()
        } else {
            render()
        }
        ;doLog();
        return
    }
    ;var _0xC4A0 = /\((\d)/;
    if (_0xC4A0["test"](_0x680C)) {
        var _0x9792 = _0x680C["match"](_0xC4A0);
        var _0xB17E = _0x9792[1];
        console["log"](cen);
        var _0xBDD6 = cen["dur"];
        var _0x8296 = _0x5D8E["substring"](cen["istart"], cen["iend"]);
        var _0xC18A = _0xBDD6 / 2;
        var _0xC1D9 = "";
        var _0xB12F = cen["my_ulen"];
        if (_0xC18A > _0xB12F) {
            var _0x86E8 = parseInt(_0xC18A / _0xB12F);
            if (_0x86E8 != 1) {
                _0xC1D9 = _0x86E8 + ""
            }
        } else {
            if (_0xC18A < _0xB12F) {
                var _0x86E8 = parseInt(_0xB12F / _0xC18A);
                if (_0x86E8 > 1) {
                    for (var _0x5E7B = 1; _0x5E7B < _0x86E8; _0x5E7B = _0x5E7B * 2) {
                        _0xC1D9 += "/"
                    }
                }
            }
        }
        ;if (/\d{1,}|\/{1,}/["test"](_0x8296)) {
            _0x8296 = _0x8296["replace"](/\d{1,}|\/{1,}/, _0xC1D9)
        } else {
            _0x8296 = _0x8296 + _0xC1D9
        }
        ;for (var _0x5E7B = 0; _0x5E7B < _0xB17E - 1; _0x5E7B++) {
            _0x8296 += "z" + _0xC1D9
        }
        ;var _0x6A35 = _0x5D8E["substring"](0, cen["istart"]) + _0x680C + _0x8296 + " " + _0x5D8E["substring"](cen["iend"]);
        $("#source")["val"](_0x6A35);
        if (musicType == 2) {
            src_change()
        } else {
            render()
        }
        ;doLog();
        return
    }
    ;if (_0x680C == "!~(!note!~)!") {
        var _0xC4EF = _0x5D8E["substring"](cen["istart"], cen["iend"]);
        _0x680C = _0x680C["replace"]("note", _0xC4EF);
        _0x5D8E = _0x5D8E["substring"](0, cen["istart"]) + _0x680C + _0x5D8E["substring"](cen["iend"]);
        $("#source")["val"](_0x5D8E);
        if (musicType == 2) {
            src_change()
        } else {
            render()
        }
        ;doLog();
        return
    }
    ;if (_0x680C == "(note)") {
        var _0x80BC = cen["next"];
        var _0xBE25 = cen["istart"];
        var _0xC2C6 = -1;
        for (var _0x5E7B = _0xBE25 + 1; _0x5E7B < syms["length"]; _0x5E7B++) {
            _0x80BC = syms[_0x5E7B];
            if (_0x80BC) {
                if (_0x80BC["type"] == 8 || _0x80BC["type"] == 10) {
                    if (_0x80BC["v"] == cen["v"]) {
                        _0xC2C6 = _0x80BC["iend"];
                        break
                    }
                }
            }
        }
        ;if (_0xC2C6 == -1) {
            return
        }
        ;var _0xC4EF = _0x5D8E["substring"](cen["istart"], _0xC2C6);
        _0x680C = _0x680C["replace"]("note", _0xC4EF);
        _0x5D8E = _0x5D8E["substring"](0, cen["istart"]) + _0x680C + _0x5D8E["substring"](_0xC2C6);
        $("#source")["val"](_0x5D8E);
        if (musicType == 2) {
            src_change()
        } else {
            render()
        }
        ;doLog();
        return
    }
    ;if (_0x680C == "3/" || _0x680C == "7//") {
        var _0xBF61 = 1;
        if (_0x680C == "3/") {
            _0xBF61 = 1.5
        } else {
            if (_0x680C == "7//") {
                _0xBF61 = 1.75
            }
        }
        ;genDotInfo(cen, _0xBF61);
        return;
        var _0xC451 = _0x5D8E["substring"](cen["istart"], cen["iend"]);
        var _0xB26B = new Object();
        var _0xC315 = cen["dur"];
        var _0xBF12 = /([\/0-9]+)/g;
        var _0x9792 = _0xC451["match"](_0xBF12);
        if (_0x9792 != null) {
            var _0xC53E = _0x9792[0];
            var _0xBFFF = _0xC53E["indexOf"]("/");
            var _0xC04E = /\d/["test"](_0xC53E);
            if (_0xBFFF > 0 && !_0xC04E) {
                _0xC451 = _0xC451["substring"](0, _0xBFFF) + _0x680C + _0xC451["substring"](_0xBFFF)
            } else {
                if (_0xBFFF == -1 && _0xC04E) {
                    var _0xB17E = parseInt(_0xC53E);
                    var _0xC277 = 1;
                    if (_0x680C == "7//") {
                        _0xC277 = 7 / 4
                    } else {
                        if (_0x680C == "3/") {
                            _0xC277 = 3 / 2
                        }
                    }
                    ;var _0xC228 = _0xB17E * _0xC277;
                    _0xC228 = decimalsToFractional(_0xC228) + "";
                    _0xC228 = _0xC228["replace"]("/4", "//")["replace"]("/2", "/")["replace"]("/1", "");
                    _0xC451 = _0xC451["replace"](/\d/g, _0xC228)
                }
            }
        } else {
            _0xC451 += _0x680C
        }
        ;_0x5D8E = _0x5D8E["substring"](0, cen["istart"]) + _0xC451 + _0x5D8E["substring"](cen["iend"]);
        $("#source")["val"](_0x5D8E);
        if (musicType == 2) {
            src_change()
        } else {
            render()
        }
        ;doLog();
        return
    }
    ;if (cen["type"] == 0) {
        if (!_0x62CD) {
            _0x5D8E = _0x5D8E["substring"](0, cen["istart"]) + _0x680C + _0x5D8E["substring"](cen["iend"])
        } else {
            if (_0x62CD == "after") {
                if (_0x680C["indexOf"]("[M:") > -1) {
                    var _0x8873 = _0x680C;
                    _0x5D8E = dragMeter(_0x5D8E, cen, _0x8873)
                } else {
                    _0x5D8E = _0x5D8E["substring"](0, cen["iend"]) + _0x680C + _0x5D8E["substring"](cen["iend"])
                }
            } else {
                if (_0x62CD == "before") {
                    _0x5D8E = _0x5D8E["substring"](0, cen["istart"]) + _0x680C + _0x5D8E["substring"](cen["istart"])
                }
            }
        }
    } else {
        if (_0x62CD == "before") {
            if ("^" == _0x680C || "^^" == _0x680C || "_" == _0x680C || "__" == _0x680C || "=" == _0x680C) {
                if (cen["notes"]["length"] > 1) {
                    return
                }
            }
            ;if ("^" == _0x680C || "^^" == _0x680C || "_" == _0x680C || "__" == _0x680C || "=" == _0x680C) {
                var _0xBE74 = _0x5D8E["substring"](cen["istart"], cen["iend"]);
                _0xBE74 = _0xBE74["replace"](/[\^\_\=]/g, "");
                _0x5D8E = _0x5D8E["substring"](0, cen["istart"]) + _0x680C + _0xBE74 + _0x5D8E["substring"](cen["iend"])
            } else {
                if (_0x680C["indexOf"]("[M:") > -1) {
                    var _0x8873 = _0x680C;
                    _0x5D8E = dragMeter(_0x5D8E, cen, _0x8873)
                } else {
                    if (_0x680C == "\".up\"" || _0x680C == "\".down\"") {
                        if (hasGch(cen, ".up") && _0x680C == "\".up\"") {
                            return
                        }
                        ;if (hasGch(cen, ".down") && _0x680C == "\".down\"") {
                            return
                        }
                        ;if (hasGch(cen, ".up") && _0x680C == "\".down\"") {
                            var _0xC364 = _0x5D8E["substring"](0, cen["istart"]);
                            var _0xB445 = _0xC364["lastIndexOf"]("\".up\"");
                            _0x5D8E = _0xC364["substring"](0, _0xB445) + _0xC364["substring"](_0xB445)["replace"]("\".up\"", "") + _0x680C + _0x5D8E["substring"](cen["istart"]);
                            $("#source")["val"](_0x5D8E);
                            if (musicType == 2) {
                                src_change()
                            } else {
                                render()
                            }
                            ;doLog();
                            return
                        } else {
                            if (hasGch(cen, ".down") && _0x680C == "\".up\"") {
                                var _0xC364 = _0x5D8E["substring"](0, cen["istart"]);
                                var _0xB445 = _0xC364["lastIndexOf"]("\".down\"");
                                _0x5D8E = _0xC364["substring"](0, _0xB445) + _0xC364["substring"](_0xB445)["replace"]("\".down\"", "") + _0x680C + _0x5D8E["substring"](cen["istart"]);
                                $("#source")["val"](_0x5D8E);
                                if (musicType == 2) {
                                    src_change()
                                } else {
                                    render()
                                }
                                ;doLog();
                                return
                            }
                        }
                    }
                    ;var _0x7954 = getMidStr(cen);
                    if (_0x7954["indexOf"](_0x680C) < 0) {
                        _0x5D8E = _0x5D8E["substring"](0, cen["istart"]) + _0x680C + _0x5D8E["substring"](cen["istart"])
                    }
                    ;if (_0xA978 == "pgt") {
                        if (_0x5D8E["indexOf"]("%%diagram") < 0) {
                            _0x5D8E = "%%diagram 1\x0A" + _0x5D8E
                        }
                    }
                }
            }
        } else {
            if (_0x62CD == "surround") {
                _0x5D8E = _0x5D8E["substring"](0, cen["istart"]) + _0x680C + _0x5D8E["substring"](cen["istart"], cen["iend"]) + _0xADCA + _0x5D8E["substring"](cen["iend"])
            } else {
                if (_0x62CD == "after") {
                    _0x5D8E = _0x5D8E["substring"](0, cen["iend"]) + _0x680C + _0x5D8E["substring"](cen["iend"])
                }
            }
        }
    }
    ;$("#source")["val"](_0x5D8E);
    if (musicType == 2) {
        src_change()
    } else {
        render()
    }
    ;doLog()
}
function dragMeter(_0x5D8E, _0x685B, _0x8873) {
    var _0x8786 = new Array();
    var _0x8737 = new Array();
    var _0x8A4D = new Object();
    _0x8A4D["v"] = _0x685B["v"];
    _0x8A4D["istart"] = _0x685B["istart"];
    _0x8A4D["iend"] = _0x685B["iend"];
    _0x8A4D["isLineEnd"] = false;
    if (_0x685B["next"] == null) {
        _0x8A4D["isLineEnd"] = true
    }
    ;_0x8786["push"](_0x685B["istart"]);
    _0x8737["push"](_0x685B["iend"]);
    var _0x89AF = new Array();
    _0x89AF["push"](_0x8A4D);
    var _0x6A35 = "";
    var _0x87D5 = _0x685B["v"];
    var _0x8960 = _0x685B["ts_prev"];
    while (_0x8960) {
        if (_0x8960["type"] == 0 && _0x87D5 != _0x8960["v"]) {
            _0x87D5 = _0x8960["v"];
            _0x8786["push"](_0x8960["istart"]);
            _0x8737["push"](_0x8960["iend"]);
            var _0x89FE = new Object();
            _0x89FE["v"] = _0x8960["v"];
            _0x89FE["istart"] = _0x8960["istart"];
            _0x89FE["iend"] = _0x8960["iend"];
            _0x89FE["isLineEnd"] = _0x8A4D["isLineEnd"];
            _0x89AF["push"](_0x89FE);
            _0x8960 = _0x8960["ts_prev"]
        } else {
            break
        }
    }
    ;_0x87D5 = _0x685B["v"];
    var _0x8911 = _0x685B["ts_next"];
    while (_0x8911) {
        if (_0x8911["type"] == 0 && _0x87D5 != _0x8911["v"]) {
            _0x87D5 = _0x8911["v"];
            _0x8786["push"](_0x8911["istart"]);
            _0x8737["push"](_0x8911["iend"]);
            var _0x89FE = new Object();
            _0x89FE["v"] = _0x8911["v"];
            _0x89FE["istart"] = _0x8911["istart"];
            _0x89FE["iend"] = _0x8911["iend"];
            _0x89FE["isLineEnd"] = _0x8A4D["isLineEnd"];
            _0x89AF["push"](_0x89FE);
            _0x8911 = _0x8911["ts_next"]
        } else {
            break
        }
    }
    ;_0x8786["sort"](function(_0x8699, _0x86E8) {
        return _0x8699 - _0x86E8
    });
    _0x8737["sort"](function(_0x8699, _0x86E8) {
        return _0x8699 - _0x86E8
    });
    _0x89AF["sort"](function(_0x8699, _0x86E8) {
        return _0x86E8["istart"] - _0x8699["istart"]
    });
    var _0x8824 = 0;
    _0x6A35 = _0x5D8E;
    for (var _0x5E7B = 0; _0x5E7B < _0x89AF["length"]; _0x5E7B++) {
        var _0x89FE = _0x89AF[_0x5E7B];
        var _0x8A9C = _0x89FE["istart"];
        var _0x88C2 = _0x8873;
        if (_0x8873["indexOf"]("M:C|") > -1) {
            _0x88C2 = "[M:2/2]"
        } else {
            if (_0x8873["indexOf"]("M:C") > -1) {
                _0x88C2 = "[M:4/4]"
            }
        }
        ;_0x6A35 = resetBarStrByMeter(_0x89FE, _0x88C2, _0x6A35)
    }
    ;return _0x6A35
}
function getDragBarInfo(_0x685B) {
    var _0x8786 = new Array();
    var _0x8737 = new Array();
    var _0x8A4D = new Object();
    _0x8A4D["v"] = _0x685B["v"];
    _0x8A4D["istart"] = _0x685B["istart"];
    _0x8A4D["iend"] = _0x685B["iend"];
    _0x8786["push"](_0x685B["istart"]);
    _0x8737["push"](_0x685B["iend"]);
    var _0x89AF = new Array();
    _0x89AF["push"](_0x8A4D);
    var _0x6A35 = "";
    var _0x87D5 = _0x685B["v"];
    var _0x8960 = _0x685B["ts_prev"];
    while (_0x8960) {
        if (_0x8960["type"] == 0 && _0x87D5 != _0x8960["v"]) {
            _0x87D5 = _0x8960["v"];
            _0x8786["push"](_0x8960["istart"]);
            _0x8737["push"](_0x8960["iend"]);
            var _0x89FE = new Object();
            _0x89FE["v"] = _0x8960["v"];
            _0x89FE["istart"] = _0x8960["istart"];
            _0x89FE["iend"] = _0x8960["iend"];
            _0x89AF["push"](_0x89FE);
            _0x8960 = _0x8960["ts_prev"]
        } else {
            break
        }
    }
    ;_0x87D5 = _0x685B["v"];
    var _0x8911 = _0x685B["ts_next"];
    while (_0x8911) {
        if (_0x8911["type"] == 0 && _0x87D5 != _0x8911["v"]) {
            _0x87D5 = _0x8911["v"];
            _0x8786["push"](_0x8911["istart"]);
            _0x8737["push"](_0x8911["iend"]);
            var _0x89FE = new Object();
            _0x89FE["v"] = _0x8911["v"];
            _0x89FE["istart"] = _0x8911["istart"];
            _0x89FE["iend"] = _0x8911["iend"];
            _0x89AF["push"](_0x89FE);
            _0x8911 = _0x8911["ts_next"]
        } else {
            break
        }
    }
    ;_0x8786["sort"](function(_0x8699, _0x86E8) {
        return _0x8699 - _0x86E8
    });
    _0x8737["sort"](function(_0x8699, _0x86E8) {
        return _0x8699 - _0x86E8
    });
    _0x89AF["sort"](function(_0x8699, _0x86E8) {
        return _0x86E8["istart"] - _0x8699["istart"]
    });
    return _0x89AF
}
function resetBarStrByMeter(_0x89FE, _0xF8C7, _0x5D8E) {
    var _0x5FB7 = getLinesInfo(_0x5D8E);
    console["log"]("vo:", _0x89FE);
    console["log"]("lines:", _0x5FB7);
    var _0x622F = _0x89FE["istart"];
    var _0x7F31 = _0x89FE["iend"];
    var _0xACDD = "";
    var _0x5DDD = 0;
    var _0xF916 = "";
    var _0xF878 = /linebreak (.)/;
    var _0xF829 = "";
    if (_0xF878["test"](_0x5D8E)) {
        _0xF829 = _0xF878["exec"](_0x5D8E)[1]
    }
    ;var _0xF965 = /(:\|\|:)|(:\|:)|(:\|)|(::)|(\|:)|(\|\|)|(\|\])|(\|)/g;
    var _0xF73C = new Array();
    for (var _0x5E7B = 0; _0x5E7B < _0x5FB7["length"]; _0x5E7B++) {
        var _0x69E6 = _0x5FB7[_0x5E7B];
        var _0x6006 = _0x69E6["lineStr"];
        if (_0x69E6["v"] == _0x89FE["v"] && _0x69E6["type"] == "note") {
            if (_0xF73C[_0x89FE["v"]]) {
                _0xACDD += _0x6006 + "\x0A";
                continue
            }
            ;_0xF73C[_0x89FE["v"]] = false;
            var _0xFA03 = _0x69E6["startSeq"];
            var _0xF7DA = _0x69E6["endSeq"];
            if (_0xF7DA > _0x7F31) {
                var _0x772B = "";
                if (_0xFA03 < _0x622F) {
                    if (_0x89FE["isLineEnd"] && _0x5DDD == 0 && _0x5D8E["indexOf"]("linebreak") < 0) {
                        _0xF916 = _0xF8C7
                    } else {
                        if (_0x89FE["isLineEnd"] && _0x5DDD == 0 && _0xF829 != "") {
                            _0x7F31 += 1
                        }
                        ;_0x772B = _0x6006["substring"](_0x7F31 - _0xFA03);
                        _0x772B = _0x772B["replace"](":||:", ":|:")["replace"]("::", ":|:");
                        var _0x79A3 = "";
                        var _0xF9B4 = "";
                        var _0xB445 = 0;
                        var _0xFA52 = "";
                        while (_0x79A3 = _0xF965["exec"](_0x772B)) {
                            _0xF9B4 = _0x772B["substring"](_0xB445, _0x79A3["index"]);
                            var _0xF78B = replaceNodeContentToRestWithMeter(_0xF9B4, _0xF8C7);
                            if (_0xF9B4["indexOf"]("$") > -1) {
                                _0xF78B = "$" + _0xF78B
                            }
                            ;if (_0xF78B == _0xF9B4) {
                                _0xF73C[_0x89FE["v"]] = true;
                                _0xFA52 += _0xF78B + _0x772B["substring"](_0x79A3["index"]);
                                break
                            }
                            ;_0xFA52 += _0xF78B + _0x79A3[0];
                            _0xB445 = _0x79A3["index"] + _0x79A3[0]["length"]
                        }
                        ;if (_0xFA52["trim"]()["indexOf"]("$") == 0) {
                            _0x6006 = _0x6006["substring"](0, _0x7F31 - _0xFA03) + "$" + _0xF8C7 + _0xFA52["substring"](_0xFA52["indexOf"]("$") + 1)
                        } else {
                            _0x6006 = _0x6006["substring"](0, _0x7F31 - _0xFA03) + _0xF8C7 + _0xFA52
                        }
                    }
                    ;_0x5DDD++
                } else {
                    _0x772B = _0x69E6["lineStr"];
                    _0x772B = _0x772B["replace"](":||:", ":|:")["replace"]("::", ":|:");
                    var _0x79A3 = "";
                    var _0xF9B4 = "";
                    var _0xB445 = 0;
                    var _0xFA52 = "";
                    while (_0x79A3 = _0xF965["exec"](_0x772B)) {
                        _0xF9B4 += _0x772B["substring"](_0xB445, _0x79A3["index"]);
                        _0xFA52 += replaceNodeContentToRestWithMeter(_0xF9B4, _0xF8C7) + _0x79A3[0]
                    }
                    ;_0x6006 = _0x6006["substring"](0, _0x7F31 - _0xFA03) + _0xF8C7 + _0xFA52;
                    if (_0xF916 != "") {
                        _0xFA52 = _0xF916 + _0xFA52;
                        _0xF916 = ""
                    }
                    ;_0x6006 = _0xFA52
                }
            }
        }
        ;_0xACDD += _0x6006 + "\x0A"
    }
    ;console["log"]("result:", _0xACDD);
    return _0xACDD
}
var moveSlurHeight = 1;
function moveDeco(_0x64A7) {
    $(".editor_rect")["removeClass"]("editor_rect");
    var _0x636B = $("rect[selected=\'selected\']");
    var _0x622F = $(_0x636B)["attr"]("istart");
    var _0xA6B1 = 0;
    if (syms[_0x622F]) {
        _0xA6B1 = syms[_0x622F]["v"]
    }
    ;var _0x63BA = $(_0x636B)["attr"]("dragtype");
    var _0x62CD = $(_0x636B)["attr"]("pos");
    if (_0x63BA == "linkclef") {
        var _0xEC6F = $(_0x636B)["parents"]("g")[0];
        var _0x92A2 = $(_0xEC6F)["attr"]("transform");
        var _0x92F1 = getTransformsTranslate(_0x92A2);
        var _0xEB82 = 0;
        if (_0x92F1 != null) {
            _0xEB82 = parseFloat(_0x64A7["offsetY"] / scale - _0x92F1["y"])
        } else {
            _0xEB82 = parseFloat(_0x64A7["offsetY"] / scale)
        }
        ;var _0xEB33 = -1;
        var _0x62CD = $(_0x636B)["attr"]("pos");
        if (_0x62CD == "start") {
            _0xEB33 = $("rect[dragtype=\"linkclef\"][pos=\"end\"]")["attr"]("inity");
            if (_0xEB82 > _0xEB33) {
                return
            }
        }
        ;if (_0x62CD == "end") {
            _0xEB33 = $("rect[dragtype=\"linkclef\"][pos=\"start\"]")["attr"]("inity");
            if (_0xEB82 < _0xEB33) {
                return
            }
        }
        ;var _0x75EF = _0x64A7["target"];
        if (_0x75EF["tagName"] == "svg") {
            var _0x8C27 = _0x75EF;
            $(_0x8C27)["find"]("g[type=\'staff\']")["find"]("path")["css"]("stroke", "black");
            selectStaff(_0x8C27, _0x64A7)
        } else {
            _0x75EF = $(_0x64A7["target"])["parents"]("svg");
            var _0x8C27 = _0x75EF;
            $(_0x8C27)["find"]("g[type=\'staff\']")["find"]("path")["css"]("stroke", "black");
            selectStaff(_0x8C27, _0x64A7)
        }
        ;selectStaff(_0x8C27, _0x64A7);
        $(_0x636B)["attr"]("y", _0xEB82);
        return
    }
    ;if (_0x63BA == "slur" && _0x62CD == "mid") {
        var _0xECBE = $(_0x636B)["parents"]("g")[0];
        var _0x92A2 = $(_0xECBE)["attr"]("transform");
        var _0x92F1 = getTransformsTranslate(_0x92A2);
        var _0xEB82 = parseFloat(_0x64A7["offsetY"] / scale - _0x92F1["y"]);
        var _0xEBD1 = parseFloat($(_0x636B)["attr"]("y"));
        var _0xEC20 = Math["abs"](_0xEB82 - _0xEBD1) / _0xEBD1;
        console["log"]("present:", _0xEC20);
        moveSlurHeight = _0xEC20 * 100;
        if (moveSlurHeight > 3) {
            moveSlurHeight = 3
        } else {
            if (moveSlurHeight < 1) {
                moveSlurHeight = 1
            }
        }
        ;$(_0x636B)["attr"]("y", _0xEB82);
        return
    }
    ;if (_0x63BA == "k_slur") {
        $(_0x636B)["attr"]("x", _0x64A7["offsetX"])
    } else {
        $(_0x636B)["attr"]("x", _0x64A7["offsetX"] / scale)
    }
    ;var _0x79F2 = $(_0x636B)["parents"]("svg")[0];
    nearDecoNote = findNearNoteWithSelectedDeco(_0x79F2, _0x64A7["offsetX"] / scale, _0x64A7["offsetY"] / scale, _0x63BA, _0xA6B1, _0x64A7);
    console["log"]("---", nearDecoNote);
    var _0x622F = $(_0x636B)["attr"]("istart")
}
var lastMidiReplaceNoteIstart = -1;
var lastMidiReplaceNoteV = -1;
var midiInStatus = false;
function updateNextNote(_0x1108A, _0xF426, chordInput, _0x110D9) {
    if (!graph_update) {
        return
    }
    ;console["log"]("notestr:", _0x1108A);
    var _0x111C6 = $(".selected_text")["length"];
    if (dragSplNum) {
        _0x111C6 = 1
    }
    ;if (!dragSplNum && _0x111C6 == 0 && lastMidiReplaceNoteIstart == -1) {
        var _0x11215 = null;
        for (var _0x5E7B = 0; _0x5E7B < syms["length"]; _0x5E7B++) {
            var _0x6681 = syms[_0x5E7B];
            if (_0x6681) {
                if (_0x6681["type"] == 10 || _0x6681["type"] == 8) {
                    _0x11215 = _0x6681;
                    break
                }
            }
        }
        ;if (_0x11215 != null) {
            $("text[istart=\'" + _0x6681["istart"] + "\']")["addClass"]("selected_text")
        }
        ;_0x111C6 = $(".selected_text")["length"]
    }
    ;if (_0x111C6 > 0 || lastMidiReplaceNoteIstart != -1) {
        midiInStatus = true;
        if (_0x111C6 > 0) {
            lastMidiReplaceNoteIstart = -1;
            lastMidiReplaceNoteV = -1
        }
        ;var _0x11177 = -1;
        if (lastMidiReplaceNoteIstart > 0) {
            if (!syms[lastMidiReplaceNoteIstart]) {
                return
            }
            ;var _0x80BC = syms[lastMidiReplaceNoteIstart]["next"];
            while (_0x80BC) {
                if (_0x80BC["type"] == 8 || _0x80BC["type"] == 10) {
                    _0x11177 = _0x80BC["istart"];
                    break
                } else {
                    _0x80BC = _0x80BC["next"];
                    if (_0x80BC == null) {
                        break
                    }
                }
            }
            ;if (_0x11177 === -1) {
                var _0x1103B = syms[lastMidiReplaceNoteIstart]["my_line"] + 1;
                for (var _0x5E7B = 0, _0xAB03 = syms["length"]; _0x5E7B < _0xAB03; _0x5E7B++) {
                    var _0x11128 = syms[_0x5E7B];
                    if (_0x11128 && _0x11128["v"] == lastMidiReplaceNoteV && _0x11128["my_line"] == _0x1103B && (_0x11128["type"] == 8 || _0x11128["type"] == 10)) {
                        _0x11177 = _0x11128["istart"];
                        break
                    }
                }
            }
        } else {
            _0x11177 = $($(".selected_text")[$(".selected_text")["length"] - 1])["attr"]("istart");
            if (dragSplNum) {
                _0x11177 = _0xF426
            }
        }
        ;if (_0x11177 === -1) {
            console["log"]("\u6ca1\u6709\u4e86----");
            if (graphEditor["pianoImpro"] && graphEditor["pianoImpro"]["isOpen"]) {
                return
            }
            ;appendNodes(1);
            setTimeout(function() {
                updateNextNote(_0x1108A, _0xF426)
            }, 500);
            midiInStatus = false;
            return
        }
        ;var _0x6681 = syms[_0x11177];
        if (_0x6681) {
            lastMidiReplaceNoteIstart = _0x11177;
            lastMidiReplaceNoteV = _0x6681["v"];
            var _0xB26B = genNoteAndDur(_0x1108A, _0x6681);
            console["log"]("noteInfo:", _0xB26B);
            if (_0xB26B["noteStr"]["startWith"](" ")) {
                lastMidiReplaceNoteIstart++
            }
            ;_0xB26B["note"] = _0x1108A;
            var _0xB1CD = _0xB26B["noteStr"];
            midiInStatus = false;
            if (_0x6681["type"] == 10) {
                replaceNote("source", _0x6681["istart"], _0x6681["iend"], _0xB26B)
            } else {
                if (_0x6681["type"] == 8) {
                    var _0xB21C = _0x6681["dur"];
                    if (_0x6681["tie_s"]) {
                        _0xB21C += _0x6681["tie_s"]["dur"]
                    }
                    ;if (_0xB21C == durSetting) {
                        var _0xAE68 = genChordNote(_0x6681, _0x1108A, durSetting);
                        if (rest_status == "" && chordNote == "" && chordInput) {
                            _0xB26B["noteStr"] = _0xAE68["chordNoteStr"]
                        }
                        ;replaceNote("source", _0x6681["istart"], _0x6681["iend"], _0xB26B)
                    } else {
                        _0xB26B["note_dur"] = durSetting;
                        replaceNote("source", _0x6681["istart"], _0x6681["iend"], _0xB26B)
                    }
                }
            }
        }
        ;if (chordInput) {
            $("rect[istart=\'" + _0x11177 + "\']")["css"]("fill-opacity", "0.4")["click"]();
            $("text[istart=\'" + _0x11177 + "\']")["addClass"]("selected_text");
            clearFocus();
            return _0x11177
        }
        ;if (!syms[_0x11177]) {
            _0x11177++
        }
        ;if (!_0x110D9) {
            update_note_istart = -1;
            if (!syms[_0x11177]) {
                return
            }
            ;var _0x11128 = syms[_0x11177]["next"];
            if (_0x11128) {
                while (_0x11128["type"] != 8 && _0x11128["type"] != 10) {
                    _0x11128 = _0x11128["next"];
                    if (!_0x11128) {
                        break
                    }
                }
                ;if (_0x11128) {
                    $("rect[istart=\'" + _0x11128["istart"] + "\']")["css"]("fill-opacity", "0.4")["click"]();
                    $("text[istart=\'" + _0x11128["istart"] + "\']")["addClass"]("selected_text");
                    if (showHelpNote) {
                        addHelpAssessant(_0x11128["istart"])
                    }
                    ;clearFocus()
                }
            }
        }
    } else {
        console["log"]("\u6ca1\u6709\u9009\u4e2d\u97f3\u7b26");
        window["top"]["alert"]("\u8bf7\u9009\u4e2d1\u4e2a\u97f3\u7b26\u5f00\u59cb\u8f93\u5165")
    }
    ;return _0x11177
}
function showLyricInput() {
    var _0xFEA4 = new Array();
    var _0x70B0 = $("#target")["offset"]()["top"];
    var _0x7061 = $("#target")["offset"]()["left"];
    $("svg")["find"]("rect[type=\'note\'],rect[type=\'splnum_note\']")["each"](function(_0x5E7B, _0x6BC0) {
        var _0x622F = $(_0x6BC0)["attr"]("istart");
        var _0x6681 = syms[_0x622F];
        var _0x6C5E = this["getBoundingClientRect"]();
        var _0x6F25 = _0x6681["a_ly"];
        var _0xFF42 = "";
        if (_0x6F25) {
            for (var _0x5E7B = 0, _0xAB03 = _0x6F25["length"]; _0x5E7B < _0xAB03; _0x5E7B++) {
                var _0x1002F = _0x6F25[_0x5E7B];
                if (!_0x1002F) {
                    _0xFF42 += "<br>";
                    continue
                }
                ;if (_0x5E7B > 0) {
                    _0xFF42 += "<br>"
                }
                ;_0xFF42 += _0x1002F["t"]
            }
        }
        ;var _0x6D9A = document["createElement"]("div");
        $(_0x6D9A)["css"]("z-index", 2)["css"]("position", "absolute")["css"]("background-color", "white");
        $(_0x6D9A)["attr"]("contenteditable", "true");
        $(_0x6D9A)["addClass"]("editor-div");
        $(_0x6D9A)["attr"]("istart", _0x622F);
        $(_0x6D9A)["attr"]("line", _0x6681["my_line"]);
        $(_0x6D9A)["attr"]("v", _0x6681["v"]);
        $(_0x6D9A)["html"](_0xFF42);
        $(_0x6D9A)["on"]("keyup", function(_0x64A7) {
            _0x64A7["preventDefault"]()
        });
        $(_0x6D9A)[0]["addEventListener"]("paste", function(_0xDE3D) {
            clipdata = _0xDE3D["clipboardData"] || window["clipboardData"];
            clipdataContent = clipdata["getData"]("text/plain");
            console["log"]("\u7c98\u8d34\u5185\u5bb9\uff1a", clipdataContent);
            if (clipdataContent != "") {
                var _0x7377 = /\[(.[^\[]*)\]/g;
                var _0x631C = null;
                var _0x7A41 = "";
                var _0xB445 = 0;
                var _0x100CD = new Array();
                while (_0x631C = _0x7377["exec"](clipdataContent)) {
                    console["log"](_0x631C, _0x631C[0], _0x631C["index"]);
                    _0x7A41 = clipdataContent["substring"](_0xB445, _0x631C["index"]);
                    if (_0x7A41 != "") {
                        var _0x1007E = _0x7A41["split"]("");
                        for (var _0x5E7B = 0; _0x5E7B < _0x1007E["length"]; _0x5E7B++) {
                            _0x100CD["push"](_0x1007E[_0x5E7B])
                        }
                    }
                    ;_0x100CD["push"](_0x631C[1]);
                    _0xB445 = _0x631C["index"] + _0x631C[0]["length"]
                }
                ;if (_0xB445 < clipdataContent["length"]) {
                    var _0x7BCC = clipdataContent["substring"](_0xB445, clipdataContent["length"]);
                    if (_0x7BCC != "") {
                        var _0x1007E = _0x7BCC["split"]("");
                        for (var _0x5E7B = 0; _0x5E7B < _0x1007E["length"]; _0x5E7B++) {
                            _0x100CD["push"](_0x1007E[_0x5E7B])
                        }
                    }
                }
                ;console["log"]($(this)["attr"]("istart"));
                var _0x622F = $(this)["attr"]("istart");
                var _0xA6B1 = $(this)["attr"]("v");
                var _0x1011C = 0;
                for (var _0x5ECA = parseInt(_0x622F), _0x1016B = syms["length"]; _0x5ECA < _0x1016B; _0x5ECA++) {
                    if (syms[_0x5ECA] && syms[_0x5ECA]["v"] == _0xA6B1) {
                        var _0x7A90 = syms[_0x5ECA]["istart"];
                        if (_0x7A90 && $(".editor-div[istart=" + _0x7A90 + "]")["length"] > 0) {
                            if (_0x1011C < _0x100CD["length"]) {
                                $(".editor-div[istart=" + _0x7A90 + "]")["html"](_0x100CD[_0x1011C++])
                            } else {
                                break
                            }
                        }
                    }
                }
            }
            ;_0xDE3D["preventDefault"]()
        });
        var _0xFFE0 = new Object();
        _0xFFE0["lineNum"] = _0x6681["my_line"];
        _0xFFE0["v"] = _0x6681["v"];
        _0xFFE0["top"] = parseFloat(_0x6C5E["top"]) + parseFloat(_0x6C5E["height"]) + $("#target")["scrollTop"]();
        var _0xFF91 = _0xFEA4["find"](function(_0x6BC0) {
            return _0x6BC0["lineNum"] == _0x6681["my_line"] && _0x6BC0["v"] == _0x6681["v"]
        });
        if (_0xFF91 == null) {
            _0xFEA4["push"](_0xFFE0)
        } else {
            if (_0xFF91["top"] < _0xFFE0["top"]) {
                _0xFF91["top"] = _0xFFE0["top"]
            }
        }
        ;$(_0x6D9A)["css"]({
            left: _0x6C5E["left"] + 10 - _0x7061,
            "min-width": 40,
            "min-height": 30
        })["show"]();
        $("#target")["append"]($(_0x6D9A))
    });
    var _0xFEF3 = 0;
    if (musicType == 2) {
        _0xFEF3 = 20
    }
    ;$(".editor-div")["each"](function(_0x5E7B, _0x6BC0) {
        var _0x69E6 = $(_0x6BC0)["attr"]("line");
        var _0xA6B1 = $(_0x6BC0)["attr"]("v");
        var _0xFF91 = _0xFEA4["find"](function(_0x6BC0) {
            return _0x6BC0["lineNum"] == _0x69E6 && _0x6BC0["v"] == _0xA6B1
        });
        $(_0x6BC0)["css"]({
            top: _0xFF91["top"] + 20 - _0x70B0 + _0xFEF3
        })
    })
}
function genLyric() {
    var _0xB5D0 = 0
      , _0xB494 = [];
    var _0xB581 = new Array();
    var _0xB532 = getLineIndexArr();
    $(".editor-div")["each"](function(_0x5E7B, _0x6BC0) {
        var _0x6F25 = new Object();
        _0x6F25["str"] = $(_0x6BC0)["html"]()["replaceAll"]("<div><br></div>", "<br>")["replaceAll"]("<div>", "<br>")["replaceAll"]("</div>", "");
        _0x6F25["istart"] = parseInt($(_0x6BC0)["attr"]("istart"));
        _0x6F25["line"] = getLineIndex(_0xB532, _0x6F25["istart"]);
        _0x6F25["update"] = false;
        var _0x6681 = syms[_0x6F25["istart"]];
        if (_0x6681["a_ly"]) {
            var _0xB70C = "";
            for (var _0x5ECA = 0; _0x5ECA < _0x6681["a_ly"]["length"]; _0x5ECA++) {
                var _0xB75B = _0x6681["a_ly"][_0x5ECA];
                if (!_0xB75B) {
                    _0xB70C += "<br><br>";
                    continue
                }
                ;var _0xB7AA = _0xB75B["t"];
                if (_0x5ECA == 0) {
                    _0xB70C = _0xB7AA
                } else {
                    _0xB70C += "<br>" + _0xB7AA
                }
                ;if (_0xB7AA != _0x6F25["str"]) {
                    _0x6F25["update"] = true
                }
            }
        } else {
            _0x6F25["update"] = true
        }
        ;if (_0xB494["indexOf"](_0x6F25["line"]) == -1) {
            _0xB494["push"](_0x6F25["line"])
        }
        ;_0xB581["push"](_0x6F25);
        if (_0x6F25["str"] && _0x6F25["str"]["split"]("<br>")["length"] > _0xB5D0) {
            _0xB5D0 = _0x6F25["str"]["split"]("<br>")["length"]
        }
    });
    if (!_0xB581 || _0xB581["length"] <= 0) {
        return
    }
    ;_0xB581["sort"](function(_0x8699, _0x86E8) {
        return _0x86E8["line"] == _0x8699["line"] ? _0x86E8["istart"] - _0x8699["istart"] : _0x86E8["line"] - _0x8699["line"]
    });
    var _0x69E6 = _0xB581[0]["line"];
    var _0xB66E = [];
    _0xB66E["push"]([]);
    for (var _0x5E7B = 0, _0xAB03 = _0xB581["length"]; _0x5E7B < _0xAB03; _0x5E7B++) {
        if (_0x69E6 != _0xB581[_0x5E7B]["line"]) {
            _0xB66E["push"]([]);
            _0x69E6 = _0xB581[_0x5E7B]["line"]
        }
        ;_0xB66E[_0xB66E["length"] - 1]["push"](_0xB581[_0x5E7B])
    }
    ;var _0xB61F;
    for (var _0x5ECA = 0, _0xB4E3 = _0xB66E["length"]; _0x5ECA < _0xB4E3; _0x5ECA++) {
        _0xB61F = _0xB66E[_0x5ECA];
        for (var _0x6997 = _0xB5D0 - 1; _0x6997 >= 0; _0x6997--) {
            for (var _0x5E7B = 0, _0xAB03 = _0xB61F["length"]; _0x5E7B < _0xAB03; _0x5E7B++) {
                if (graphEditor["pianoImpro"] && typeof (graphEditor["pianoImpro"]["noteUpdate"]) == "function") {
                    var _0x772B = _0xB61F[_0x5E7B]["str"];
                    var _0xB6BD = _0x772B["split"]("<br>");
                    if (!_0xB61F[_0x5E7B]["update"]) {
                        continue
                    }
                    ;if (_0x6997 < _0xB6BD["length"] && _0xB6BD[_0x6997]) {
                        graphEditor["pianoImpro"]["noteUpdate"](_0xB61F[_0x5E7B]["istart"], _0xB6BD[_0x6997], _0x6997)
                    } else {
                        graphEditor["pianoImpro"]["noteUpdate"](_0xB61F[_0x5E7B]["istart"], "*", _0x6997)
                    }
                }
            }
        }
    }
    ;$(".lyric")["removeClass"]("menu-pressed");
    var _0x5D8E = $("#source")["val"]();
    _0x5D8E = replaceBlankLine(_0x5D8E);
    $("#source")["val"](_0x5D8E);
    src_change();
    doLog()
}
function getLineIndex(_0xC854, _0x622F) {
    if (!_0xC854 || _0xC854["length"] <= 0 || !_0x622F) {
        return 0
    }
    ;var _0xCE31 = 0;
    var _0xCECF = _0xC854["length"];
    var _0xCE80 = 0;
    var _0x5DDD = _0xC854["length"];
    while (_0xCE31 < _0xCECF && _0x5DDD > 0) {
        _0xCE80 = _0xCE31 + parseInt((_0xCECF - _0xCE31) / 2);
        if (_0x622F >= _0xC854[_0xCE80]["start"] && _0x622F <= _0xC854[_0xCE80]["end"]) {
            break
        } else {
            if (_0x622F < _0xC854[_0xCE80]["start"]) {
                _0xCECF = _0xCE80
            } else {
                if (_0x622F > _0xC854[_0xCE80]["end"]) {
                    _0xCE31 = _0xCE80
                }
            }
        }
        ;_0x5DDD--
    }
    ;return _0xCE80
}
function getLineIndexArr() {
    var _0xCF1E = $("#source")["val"]();
    var _0x5FB7 = _0xCF1E["split"]("\x0A");
    var _0x69E6 = "";
    var _0x7ADF = 0;
    var _0xB532 = [];
    var _0xCF6D = false
      , _0xCFBC = false;
    for (var _0x5E7B = 0, _0xAB03 = _0x5FB7["length"]; _0x5E7B < _0xAB03; _0x5E7B++) {
        if (_0x69E6["indexOf"]("w:") == -1 && _0x69E6["replaceAll"](/\".*\"/g, "")["replace"](/\[.[^\]]*\]/, "")["replace"](/\{.[^\}]*\}/, "")["indexOf"]("|") > -1) {
            _0xCFBC = true
        } else {
            _0xCFBC = false
        }
        ;_0x69E6 = _0x5FB7[_0x5E7B];
        var _0x93DE = {
            start: _0x7ADF,
            end: _0x7ADF + _0x69E6["length"]
        };
        if (_0xCF6D && _0xCFBC) {
            _0xB532[_0xB532["length"] - 1]["end"] = _0x93DE["end"]
        } else {
            _0xB532["push"](_0x93DE)
        }
        ;_0x7ADF = _0x93DE["end"] + 1;
        _0xCF6D = _0xCFBC
    }
    ;return _0xB532
}
function enabledEditor(_0x93DE) {
    user["clickAddText"] = false;
    $("#target")["css"]("cursor", "default");
    if ($(_0x93DE)["hasClass"]("menu-pressed")) {
        $(_0x93DE)["removeClass"]("menu-pressed");
        graph_update = true;
        draw_editor = false;
        $("#graphEditorMenuInsert")["remove"]("menu-pressed");
        $("#graphEditorMenuUpdate")["addClass"]("menu-pressed")
    } else {
        if ($("#insertWord")["hasClass"]("menu-pressed")) {
            $("#insertWord")["removeClass"]("menu-pressed")
        }
        ;$(_0x93DE)["addClass"]("menu-pressed");
        $("#graphEditorMenu")["removeClass"]("menu-pressed");
        graph_update = false;
        draw_editor = false;
        $("#graphEditorMenuInsert")["removeClass"]("menu-pressed");
        $("#graphEditorMenuUpdate")["removeClass"]("menu-pressed")
    }
}
function showSpeedDiv() {
    $("#QC_div .modal-content")["css"]("left", ($(window)["width"]() - $("#Q_div .modal-content")["width"]()) / 2);
    $("#speedtype")["val"]("node");
    $("#QC_div")["modal"]()
}
function addNodeSpeed() {
    var _0x5CF0 = $("#nodeMenu")["attr"]("barIndex");
    if (!_0x5CF0) {
        return
    }
    ;_0x5CF0 = parseInt(_0x5CF0);
    var _0x5D8E = $("#source")["val"]();
    if (_0x5CF0 == 0) {
        var _0x61E0 = /Q:.*(\d\/\d=\d{1,3})/;
        var _0x60F3 = $("#selectSpeedImg2")["attr"]("speed");
        var _0x6142 = $("#NOTE_Q_V")["val"]();
        var _0x6191 = _0x5D8E["match"](_0x61E0);
        if (_0x6191 != null) {
            var _0x60A4 = _0x6191[0]["replace"](_0x6191[1], _0x60F3 + "=" + _0x6142);
            _0x5D8E = _0x5D8E["replace"](_0x6191[0], _0x60A4);
            $("#source")["val"](_0x5D8E);
            src_change();
            doLog();
            return
        }
    }
    ;var _0x5FB7 = getLinesInfo(_0x5D8E);
    var _0x5F68 = "";
    var _0x5DDD = 0;
    if (_0x5FB7 != null) {
        for (var _0x5E7B = 0; _0x5E7B < _0x5FB7["length"]; _0x5E7B++) {
            if (_0x5FB7[_0x5E7B]["type"] == "note") {
                var _0x6006 = _0x5FB7[_0x5E7B]["lineStr"];
                _0x5F68 = _0x6006["replace"](/%V1line\d+(end)?/, "");
                var _0x5E2C = _0x6006["match"](/\$?%V1line\d+(end)?/);
                var _0x5F19 = "";
                if (_0x5E2C != null) {
                    _0x5F19 = _0x5E2C[0]
                }
                ;var _0x5D3F = getBarsArray(_0x5F68, false);
                var _0x6055 = "";
                for (var _0x5ECA = 0; _0x5ECA < _0x5D3F["length"]; _0x5ECA++) {
                    _0x6055 += _0x5D3F[_0x5ECA]["replace"](/\[Q:.[^\[]*\]/, "");
                    if (_0x5DDD == _0x5CF0 - 1) {
                        var _0x60F3 = $("#selectSpeedImg2")["attr"]("speed");
                        var _0x6142 = $("#NOTE_Q_V")["val"]();
                        _0x6055 += "[Q: " + _0x60F3 + "=" + _0x6142 + "]"
                    }
                    ;_0x5DDD++
                }
                ;_0x5D8E = _0x5D8E["replace"](_0x6006, _0x6055 + _0x5F19);
                if (_0x5DDD > _0x5CF0) {
                    break
                }
            }
        }
        ;$("#source")["val"](_0x5D8E);
        src_change();
        doLog()
    }
}
function showNodeBgColorPicker() {
    $("#nodecolorselecter")["val"]("000000");
    $("#nodecolorselecter")["click"]()
}
function setNodeBgColor() {
    var _0x5CF0 = $("#nodeMenu")["attr"]("barIndex");
    if (!_0x5CF0) {
        return
    }
    ;_0x5CF0 = parseInt(_0x5CF0);
    var _0x5D8E = $("#source")["val"]();
    var _0x5FB7 = getNodesInfo(_0x5D8E);
    var _0x5F68 = "";
    var _0x5DDD = 0;
    var _0x68F9 = /\"-mb-.[^(]*\"/;
    var _0x6AD3 = new Array();
    var _0x6948 = /mysvgbar([\d]+)/;
    $("svg[type=rectbar],svg[type=rectnode]")["each"](function(_0x5E7B, _0x6BC0) {
        var _0x6B22 = $(_0x6BC0)["attr"]("id");
        var _0x63BA = $(_0x6BC0)["attr"]("type");
        if (_0x63BA == "rectnode") {
            var _0x5CF0 = $(_0x6BC0)["attr"]("barIndex");
            _0x6AD3["push"](_0x5CF0)
        } else {
            var _0x6B71 = _0x6B22["match"](_0x6948);
            if (_0x6B71 != null) {
                _0x6AD3["push"](_0x6B71[1])
            }
        }
    });
    if (_0x5FB7 != null) {
        var _0x6A35 = "";
        for (var _0x5E7B = 0; _0x5E7B < _0x5FB7["length"]; _0x5E7B++) {
            var _0xAB52 = _0x5FB7[_0x5E7B];
            if (_0xAB52["type"] == "note") {
                var _0x6055 = "";
                var _0xD7C2 = _0xAB52["nodes"];
                for (var _0x5ECA = 0; _0x5ECA < _0xD7C2["length"]; _0x5ECA++) {
                    var _0x79A3 = _0xD7C2[_0x5ECA];
                    var _0x68AA = _0x79A3["nodeStr"];
                    for (var _0x6997 = 0; _0x6997 < _0x6AD3["length"]; _0x6997++) {
                        if (_0x79A3["nodeIndex"] == _0x6AD3[_0x6997]) {
                            $(".nodecolorli")["css"]("background-color", $("#nodecolorselecter")["val"]());
                            var _0xFD68 = $(".nodecolorli")["css"]("background-color");
                            _0x68AA = _0x68AA["replace"](_0x68F9, "");
                            _0x68AA = _0x68AA["substring"](0, _0x68AA["indexOf"]("|")) + "\"-mb-" + _0xFD68 + "\"" + _0x68AA["substring"](_0x68AA["indexOf"]("|"))
                        }
                    }
                    ;_0x6055 += _0x68AA;
                    _0x6A35 += _0x6055
                }
            } else {
                _0x6A35 += _0xAB52["lineStr"] + "\x0A"
            }
        }
        ;$("#source")["val"](_0x6A35);
        src_change();
        doLog()
    }
}
function setNodeBgColor(_0xFD68) {
    var _0x5CF0 = $("#nodeMenu")["attr"]("barIndex");
    if (!_0x5CF0) {
        return
    }
    ;_0x5CF0 = parseInt(_0x5CF0);
    var _0x5D8E = $("#source")["val"]();
    var _0x5FB7 = getNodesInfo(_0x5D8E);
    var _0x5F68 = "";
    var _0x5DDD = 0;
    var _0x68F9 = /\"-mb-.[^)]*\"/;
    var _0x6AD3 = new Array();
    var _0x6948 = /mysvgbar([\d]+)/;
    $("svg[type=\'rectbar\'],svg[type=\'rectnode\']")["each"](function(_0x5E7B, _0x6BC0) {
        var _0x6B22 = $(_0x6BC0)["attr"]("id");
        var _0x63BA = $(_0x6BC0)["attr"]("type");
        if (_0x63BA == "rectnode") {
            var _0x9FE7 = parseInt($(_0x6BC0)["attr"]("barindex"));
            if (_0x9FE7 == undefined) {
                _0x9FE7 = parseInt($(_0x6BC0)["attr"]("barIndex"))
            }
            ;_0x6AD3["push"](_0x9FE7)
        } else {
            var _0x6B71 = _0x6B22["match"](_0x6948);
            if (_0x6B71 != null) {
                _0x6AD3["push"](_0x6B71[1])
            }
        }
    });
    if (_0x6AD3["length"] == 0) {
        window["top"]["swAutoAlert"]("\u672a\u9009\u62e9\u5c0f\u8282");
        return
    }
    ;if (_0x5FB7 != null) {
        var _0x6A35 = "";
        for (var _0x5E7B = 0; _0x5E7B < _0x5FB7["length"]; _0x5E7B++) {
            var _0xAB52 = _0x5FB7[_0x5E7B];
            if (_0xAB52["type"] == "note") {
                var _0x6055 = "";
                var _0xD7C2 = _0xAB52["nodes"];
                var _0xFDB7 = -1;
                for (var _0x5ECA = 0; _0x5ECA < _0xD7C2["length"]; _0x5ECA++) {
                    var _0x79A3 = _0xD7C2[_0x5ECA];
                    var _0x68AA = _0x79A3["nodeStr"];
                    for (var _0x6997 = 0; _0x6997 < _0x6AD3["length"]; _0x6997++) {
                        if (_0x79A3["nodeIndex"] == _0x6AD3[_0x6997]) {
                            _0x68AA = _0x68AA["replace"](_0x68F9, "");
                            _0x68AA = _0x68AA["replace"](/(\"-mb).*(\)\")/g, "");
                            _0x68AA = _0x68AA["substring"](0, _0x68AA["indexOf"](_0x79A3["barLineStr"])) + "\"-mb-" + colorRGB(_0xFD68) + "\"" + _0x68AA["substring"](_0x68AA["indexOf"](_0x79A3["barLineStr"]))
                        }
                    }
                    ;_0x6055 += _0x68AA;
                    _0xFDB7 = _0x79A3["endSeq"]
                }
                ;_0x6A35 += _0x6055 + _0x5D8E["substring"](_0xFDB7, _0xAB52["endSeq"])
            } else {
                _0x6A35 += _0xAB52["lineStr"] + "\x0A"
            }
        }
        ;$("#source")["val"](_0x6A35);
        src_change();
        doLog()
    }
}
function clearNodeBgColor() {
    var _0x5CF0 = $("#nodeMenu")["attr"]("barIndex");
    if (!_0x5CF0) {
        return
    }
    ;_0x5CF0 = parseInt(_0x5CF0);
    var _0x5D8E = $("#source")["val"]();
    var _0x5FB7 = getNodesInfo(_0x5D8E);
    var _0x5F68 = "";
    var _0x5DDD = 0;
    var _0x68F9 = /\"-mb-.[^\)]*\)\"/;
    var _0x6AD3 = new Array();
    var _0x6948 = /mysvgbar([\d]+)/;
    $("svg[type=rectbar],svg[type=rectnode]")["each"](function(_0x5E7B, _0x6BC0) {
        var _0x6B22 = $(_0x6BC0)["attr"]("id");
        var _0x63BA = $(_0x6BC0)["attr"]("type");
        if (_0x63BA == "rectnode") {
            var _0x5CF0 = $(_0x6BC0)["attr"]("barIndex");
            if (typeof (_0x5CF0) == "undefined") {
                _0x5CF0 = $(_0x6BC0)["attr"]("barindex")
            }
            ;_0x6AD3["push"](_0x5CF0)
        } else {
            var _0x6B71 = _0x6B22["match"](_0x6948);
            if (_0x6B71 != null) {
                _0x6AD3["push"](_0x6B71[1])
            }
        }
    });
    var _0x6A35 = "";
    if (_0x5FB7 != null) {
        for (var _0x5E7B = 0; _0x5E7B < _0x5FB7["length"]; _0x5E7B++) {
            var _0x69E6 = _0x5FB7[_0x5E7B];
            _0x5F68 = _0x69E6["lineStr"];
            if (_0x69E6["type"] == "note") {
                var _0x5D3F = _0x69E6["nodes"];
                var _0x6055 = "";
                for (var _0x5ECA = 0; _0x5ECA < _0x5D3F["length"]; _0x5ECA++) {
                    var _0x685B = _0x5D3F[_0x5ECA];
                    var _0x68AA = _0x685B["nodeStr"];
                    for (var _0x6997 = 0; _0x6997 < _0x6AD3["length"]; _0x6997++) {
                        if (_0x685B["nodeIndex"] == _0x6AD3[_0x6997]) {
                            _0x68AA = _0x68AA["replace"](_0x68F9, "");
                            break
                        }
                    }
                    ;_0x6055 += _0x68AA
                }
                ;var _0x6A84 = "";
                if (_0x5D3F["length"] > 0 && _0x5D3F[_0x5D3F["length"] - 1]["endSeq"] < _0x69E6["endSeq"]) {
                    _0x6A84 = _0x5D8E["substring"](_0x5D3F[_0x5D3F["length"] - 1]["endSeq"], _0x69E6["endSeq"])["replace"]("\x0A", "")
                }
                ;_0x6A35 += _0x6055 + _0x6A84 + "\x0A"
            } else {
                _0x6A35 += _0x5F68 + "\x0A"
            }
        }
        ;$("#source")["val"](_0x6A35);
        doLog();
        src_change()
    }
}
function showKeyDiv() {
    $("#K_div .modal-content")["css"]("left", ($(window)["width"]() - $("#K_div .modal-content")["width"]()) / 2);
    $("#K_div")["modal"]()
}
function changeNodeKey() {
    var _0x680C = $(".keyChoice.selected")["attr"]("value");
    if (!_0x680C) {
        return
    }
    ;console["log"]("selected key:", _0x680C);
    var _0x5CF0 = $("#nodeMenu")["attr"]("barIndex");
    if (!_0x5CF0) {
        return
    }
    ;_0x5CF0 = parseInt(_0x5CF0);
    var _0x5D8E = $("#source")["val"]();
    if (_0x5CF0 == 0) {
        var _0x676E = /K:\s*[CDEFGABb#]{1,2}/;
        var _0x671F = _0x5D8E["match"](_0x676E);
        if (_0x671F != null) {
            var _0x67BD = _0x671F[0]["replace"](_0x671F[0], _0x680C["replace"]("[", "")["replace"]("]", ""));
            _0x5D8E = _0x5D8E["replace"](_0x671F[0], _0x67BD);
            $("#source")["val"](_0x5D8E);
            src_change();
            doLog();
            return
        }
    }
    ;var _0x5FB7 = _0x5D8E["match"](/.*%V1line\d+(end)?/g);
    var _0x5F68 = "";
    var _0x5DDD = 0;
    if (_0x5FB7 != null) {
        for (var _0x5E7B = 0; _0x5E7B < _0x5FB7["length"]; _0x5E7B++) {
            _0x5F68 = _0x5FB7[_0x5E7B]["replace"](/%V1line\d+(end)?/, "");
            var _0x5E2C = _0x5FB7[_0x5E7B]["match"](/\$?%V1line\d+(end)?/);
            var _0x5F19 = "";
            if (_0x5E2C != null) {
                _0x5F19 = _0x5E2C[0]
            }
            ;var _0x5D3F = getBarsArray(_0x5F68, false);
            var _0x6055 = "";
            for (var _0x5ECA = 0; _0x5ECA < _0x5D3F["length"]; _0x5ECA++) {
                _0x6055 += _0x5D3F[_0x5ECA];
                if (_0x5DDD == _0x5CF0 - 1) {
                    _0x6055 += _0x680C
                }
                ;_0x5DDD++
            }
            ;_0x5D8E = _0x5D8E["replace"](_0x5FB7[_0x5E7B], _0x6055 + _0x5F19);
            if (_0x5DDD > _0x5CF0) {
                break
            }
        }
        ;$("#source")["val"](_0x5D8E);
        src_change();
        doLog()
    }
}
function showMeterDiv() {
    $("#M_div .modal-content")["css"]("left", ($(window)["width"]() - $("#M_div .modal-content")["width"]()) / 2);
    $("#M_div")["modal"]()
}
function changeNodeMeter() {}
function switchRhythm(_0x93DE) {
    var _0x5D8E = switchRhythmContent(_0x93DE);
    $("#source")["val"](_0x5D8E);
    src_change();
    doLog()
}
function switchRhythmContent(_0x93DE) {
    var _0x10258 = $(_0x93DE)["attr"]("staffnum");
    var _0x5D8E = $("#source")["val"]();
    var _0x102A7 = new RegExp("V:\\s*" + _0x10258 + ".*","g");
    var _0x10209 = new Array();
    var _0x9792 = _0x5D8E["match"](_0x102A7);
    if (_0x9792 != null) {
        var _0x772B = _0x9792[0];
        if ($(_0x93DE)["is"](":checked")) {
            $("#tone" + _0x10258)["val"](115);
            _0x5D8E = _0x5D8E["replace"](_0x772B, _0x772B["replaceAll"](" perc stafflines=1", "") + " perc stafflines=1")
        } else {
            $("#tone" + _0x10258)["val"](0);
            _0x5D8E = _0x5D8E["replace"](_0x772B, _0x772B["replaceAll"](" perc stafflines=1", ""))
        }
    }
    ;return _0x5D8E
}
function genBarDeco(_0x680C, _0xADCA, _0x62CD, _0xA978, _0x5CF0) {
    var _0xAC8E = _0x5CF0;
    var _0x5D8E = $("#source")["val"]();
    var _0xACDD = "";
    var _0xA8DA = "";
    var _0x8824 = 0;
    var _0xA9C7 = false;
    if ((_0x680C == "|:" || _0x680C == "!coda!" || _0x680C == "!segno!") && parseInt(_0x5CF0) == 0) {
        var _0x5FB7 = getNodesInfo(_0x5D8E);
        var _0xACDD = "";
        for (var _0x6409 = 0; _0x6409 < _0x5FB7["length"]; _0x6409++) {
            var _0xAB52 = _0x5FB7[_0x6409];
            var _0x6006 = _0xAB52["lineStr"];
            if (_0xAB52["type"] == "note" && _0xAB52["nodes"][0]["nodeIndex"] == 0) {
                _0x6006 = _0x680C + _0x6006
            }
            ;_0xACDD += _0x6006 + "\x0A"
        }
        ;$("#source")["val"](_0xACDD);
        doLog();
        src_change();
        return
    }
    ;if (_0x680C["indexOf"]("[M:") > -1) {
        if (_0x5CF0 == 0) {
            var _0x8873 = _0x680C;
            _0x8873 = _0x8873["replace"](/[\[\]]/g, "")["replace"](/M:/, "")["replace"](/\s/g, "");
            $("#M_type")["val"]("1");
            if (_0x8873 == "C|") {
                _0x8873 = "2/2";
                $("#M_type")["val"]("C|")
            } else {
                if (_0x8873 == "C") {
                    _0x8873 = "4/4";
                    $("#M_type")["val"]("C")
                }
            }
            ;$("#M_mol")["val"](_0x8873["split"]("/")[0]);
            $("#M_den")["val"](_0x8873["split"]("/")[1]);
            setMValue();
            genInitStaff();
            return
        } else {
            var _0x5FB7 = getNodesInfo(_0x5D8E);
            var _0xACDD = "";
            for (var _0x5E7B = 0, _0xAB03 = _0x5FB7["length"]; _0x5E7B < _0xAB03; _0x5E7B++) {
                var _0xAB52 = _0x5FB7[_0x5E7B];
                var _0x6006 = _0xAB52["lineStr"];
                var _0xABF0 = "";
                var _0xAAB4 = -1;
                var _0xAD7B = 99999;
                if (_0xAB52["type"] == "note") {
                    for (var _0x5ECA = 0; _0x5ECA < _0xAB52["nodes"]["length"]; _0x5ECA++) {
                        var _0x79A3 = _0xAB52["nodes"][_0x5ECA];
                        if (_0x79A3["nodeIndex"] >= _0x5CF0 && _0x79A3["nodeIndex"] < _0xAD7B) {
                            if (_0x79A3["nodeStr"]["indexOf"]("[M:") > -1 && _0xAD7B == 99999) {
                                _0xAD7B = _0x79A3["ondeIndex"];
                                _0xABF0 += _0x79A3["nodeStr"];
                                continue
                            }
                            ;var _0xAC3F = replaceNodeContentToRestWithMeter(_0x79A3["nodeStr"], _0x680C);
                            if (_0x79A3["nodeIndex"] == _0x5CF0) {
                                _0xAC3F = _0x680C + _0xAC3F
                            }
                            ;if (_0x79A3["nodeStr"]["indexOf"]("$") > -1) {
                                _0xAC3F = _0x79A3["nodeStr"]["substring"](0, _0x79A3["nodeStr"]["indexOf"]("$") + 1) + _0xAC3F
                            }
                            ;_0xABF0 += _0xAC3F + _0x79A3["barLineStr"]
                        } else {
                            _0xABF0 += _0x79A3["nodeStr"]
                        }
                        ;_0xAAB4 = _0x79A3["endSeq"]
                    }
                    ;_0xABF0 += _0x5D8E["substring"](_0xAAB4, _0xAB52["endSeq"]);
                    _0xACDD += _0xABF0
                } else {
                    _0xACDD += _0x6006 + "\x0A"
                }
            }
            ;$("#source")["val"](_0xACDD);
            src_change();
            doLog();
            return
        }
    }
    ;if (_0x680C["indexOf"]("K:") > -1 && _0x5CF0 == 0) {
        var _0xAA65 = _0x680C["replace"](/[\[\]]/g, "");
        var _0xAA16 = _0xAA65["replace"](/K\:/, "")["replace"](/\s/g, "");
        $("#K")["val"](_0xAA16);
        $("#K")["change"]();
        return
    }
    ;var _0xAD2C = $("svg[type=\'rectbar\']");
    var _0x5D8E = $("#source")["val"]();
    if (_0x62CD == "preReplace" || _0x62CD == "preInsert") {
        _0x5CF0--
    }
    ;if (_0xAD2C["length"] > 0) {
        var _0x5FB7 = getNodesInfo(_0x5D8E);
        var _0xACDD = "";
        for (var _0x5E7B = 0, _0xAB03 = _0x5FB7["length"]; _0x5E7B < _0xAB03; _0x5E7B++) {
            var _0xAB52 = _0x5FB7[_0x5E7B];
            var _0x6006 = _0xAB52["lineStr"];
            var _0xABF0 = "";
            var _0xAAB4 = -1;
            if (_0xAB52["type"] == "note") {
                var _0xABA1 = false;
                for (var _0x5ECA = 0; _0x5ECA < _0xAB52["nodes"]["length"]; _0x5ECA++) {
                    var _0x79A3 = _0xAB52["nodes"][_0x5ECA];
                    if (_0x79A3["nodeIndex"] == _0x5CF0) {
                        _0xABA1 = true;
                        if (_0x62CD == "afterReplace" || _0x62CD == "preReplace") {
                            var _0xA929 = _0x79A3["barLineStr"]["replace"](/./g, function(_0x8699) {
                                return "\\" + _0x8699
                            });
                            var _0x7377 = new RegExp("(.*)" + _0xA929);
                            _0xABF0 += _0x79A3["nodeStr"]["replace"](_0x7377, function(_0xAE19, _0x60F3) {
                                return _0x60F3 + _0x680C
                            })
                        } else {
                            if (_0x62CD == "beforeInsert") {
                                if (_0x79A3["nodeStr"]["trim"]()["indexOf"]("$") == 0) {
                                    _0xABF0 += "$" + _0x680C + _0x79A3["nodeStr"]["substring"](_0x79A3["nodeStr"]["indexOf"]("$") + 1)
                                } else {
                                    _0xABF0 += _0x680C + _0x79A3["nodeStr"]
                                }
                            } else {
                                if (_0x62CD == "preInsert" || _0x62CD == "afterInsert") {
                                    var _0xA929 = _0x79A3["barLineStr"]["replace"](/./g, function(_0x8699) {
                                        return "\\" + _0x8699
                                    });
                                    var _0x7377 = new RegExp("(.*)" + _0xA929);
                                    _0xABF0 += _0x79A3["nodeStr"]["replace"](_0x7377, function(_0xAE19, _0x60F3) {
                                        return _0x60F3 + _0x680C + _0x79A3["barLineStr"]
                                    })
                                }
                            }
                        }
                    } else {
                        _0xABF0 += _0x79A3["nodeStr"]
                    }
                    ;_0xAAB4 = _0x79A3["endSeq"]
                }
                ;_0xABF0 += _0x5D8E["substring"](_0xAAB4, _0xAB52["endSeq"]);
                _0xACDD += _0xABF0 + "\x0A"
            } else {
                _0xACDD += _0xAB52["lineStr"] + "\x0A"
            }
        }
        ;_0xACDD = replaceBlankLine(_0xACDD);
        $("#source")["val"](_0xACDD);
        src_change();
        doLog();
        return
    }
}
function selectSimpleNode(_0x8C27, _0xDE3D, _0xCA7D, _0xFB3F) {
    if (graphEditor["pianoImpro"] && graphEditor["pianoImpro"]["isOpen"]) {
        return
    }
    ;var _0x6409 = _0xDE3D["offsetX"];
    var _0x6458 = _0xDE3D["offsetY"];
    var _0x8AEB = $(_0x8C27)["attr"]("index");
    var _0xFC7B = getClickNodeInfo(_0x6409, _0x6458, _0xCA7D, _0x8AEB);
    if (_0xFC7B == null) {
        return
    }
    ;var _0xDA89 = _0xFC7B["node_index"];
    var _0xFC2C = _0xFC7B["v"];
    var _0xFCCA = $(_0x8C27)["find"]("g[type=\'staff\']")["length"];
    var _0xC854 = new Array();
    if (_0xDE3D["shiftKey"]) {
        if (lastSelectBarIndex != -1) {
            var _0xFBDD = -1;
            if (lastSelectBarIndex > _0xDA89) {
                _0xFBDD = lastSelectBarIndex + 0;
                lastSelectBarIndex = _0xDA89;
                _0xDA89 = _0xFBDD
            }
            ;for (var _0x5E7B = lastSelectBarIndex; _0x5E7B <= _0xDA89; _0x5E7B++) {
                if (_0xFC2C == lastSelectNodeV) {
                    var _0x86E8 = new Object();
                    _0x86E8["bar_num"] = _0x5E7B;
                    _0x86E8["color"] = "red";
                    _0x86E8["stroke"] = "red";
                    _0x86E8["v"] = _0xFC2C;
                    _0xC854["push"](_0x86E8)
                } else {
                    selectBar(_0x8C27, _0xDE3D, _0xCA7D, _0xFB3F);
                    return
                }
            }
        }
    } else {
        var _0x86E8 = new Object();
        _0x86E8["bar_num"] = _0xFC7B["node_index"];
        _0x86E8["v"] = _0xFC7B["v"];
        _0x86E8["color"] = "red";
        _0x86E8["stroke"] = "red";
        _0xC854["push"](_0x86E8)
    }
    ;lastSelectBarIndex = _0xDA89;
    lastSelectNodeV = _0xFC2C;
    $("svg[type=\'rectbar\']")["remove"]();
    renderStaffNodeBySt(_0xC854, "node");
    showProperties("bar", _0xDE3D);
    $("#mysvgnode" + _0xFC2C + "_" + _0xDA89)["attr"]("barIndex", _0xDA89);
    var _0x66D0 = $("#mysvgnode" + _0xFC2C + "_" + _0xDA89)["offset"]()["top"];
    var _0xCE31 = $("#mysvgnode" + _0xFC2C + "_" + _0xDA89)["offset"]()["left"];
    var _0xFAF0 = getSelectBarContent(_0xDA89, 0);
    var _0xFAA1 = getPreBarInfo(_0xDA89, 0);
    if (_0xFAF0 == null) {
        return
    }
    ;if (_0xFAF0["indexOf"]("$") > -1 || (_0xFAA1 && _0xFAA1["nextBr"])) {
        $("#btnAddBr")["html"]("\u53d6\u6d88\u6362\u884c")
    } else {
        $("#btnAddBr")["html"]("\u6362\u884c")
    }
    ;if (_0xDA89 == 0) {
        $("#btnAddBr")["hide"]();
        var _0xFB8E = getStaffInfo();
        if (_0xFB8E["vocalCount"] > 1) {
            $("#delStaff")["show"]()
        } else {
            $("#delStaff")["hide"]()
        }
    } else {
        $("#btnAddBr")["show"]();
        $("#delStaff")["hide"]()
    }
    ;var _0x70B0 = $(".abc-content")["offset"]()["top"];
    var _0x7061 = $(".abc-content")["offset"]()["left"];
    if (_0xFB3F) {
        $("#nodeMenu")["css"]("position", "absolute")["css"]("top", _0x66D0 - _0x70B0 - $("#nodeMenu")["height"]())["css"]("left", _0xCE31 - _0x7061)["show"]();
        $("#nodeMenu")["attr"]("barIndex", _0xDA89)
    }
}
function genLinkClef(_0x63BA) {
    var _0x5D8E = $("#source")["val"]();
    var _0x5FB7 = getLinesInfo($("#source")["val"]());
    var _0xB3A7 = "";
    if (musicType == 2) {
        _0x63BA = "bracket"
    }
    ;if (_0x63BA == "brace") {
        _0xB3A7 = "{NUM}"
    } else {
        if (_0x63BA == "bracket") {
            _0xB3A7 = "[NUM]"
        } else {
            if (_0x63BA == "none") {}
        }
    }
    ;var _0x6A35 = "";
    for (var _0x5E7B = 0; _0x5E7B < _0x5FB7["length"]; _0x5E7B++) {
        var _0x69E6 = _0x5FB7[_0x5E7B];
        var _0x6006 = _0x69E6["lineStr"];
        if (_0x6006["indexOf"]("%%score") > -1 || _0x6006["indexOf"]("%%staves") > -1) {
            var _0x7A41 = _0x6006["match"](/%%score|%%staves/)[0];
            clefReg = /\s*\(.[^\(]*\)\s*\|{0,1}|\s*\d\s*\|{0,1}/g;
            var _0xB3F6 = 0;
            var _0xB445 = 0;
            var _0xABF0 = "";
            while (node = clefReg["exec"](_0x6006)) {
                console["log"](node);
                _0xABF0 += _0x6006["substring"](_0xB445, node["index"]);
                if (_0xB3F6 == selectedStaffNum) {
                    _0xABF0 += _0xB3A7["replace"]("NUM", node[0])
                } else {
                    _0xABF0 += node[0]
                }
                ;_0xB445 = node["index"] + node[0]["length"];
                _0xB3F6++
            }
            ;if (_0xB445 < _0x6006["length"]) {
                _0xABF0 += _0x6006["substr"](_0xB445)
            }
            ;_0x6A35 += _0xABF0 + "\x0A"
        } else {
            _0x6A35 += _0x6006 + "\x0A"
        }
    }
    ;$("#source")["val"](_0x6A35);
    src_change();
    doLog()
}
function createLyricEditor(_0x719D) {
    console["log"](user["showLyricEditor"]);
    if (!user["editorAnnot"]) {
        return
    }
    ;var _0x714E = $(".selected_text[type*=\'HD\'],.selected_text[type^=\'r\'],.selected_text[type=\'note\']");
    var _0x7061 = $("#target")["offset"]()["left"];
    var _0x70B0 = $("#target")["offset"]()["top"];
    var _0x622F = parseInt($(_0x714E)["attr"]("istart"));
    if (user["showLyricEditor"]) {
        user["showLyricEditor"] = false;
        _0x622F = lastEditLyricIstart;
        var _0x6CAD = syms[_0x622F];
        for (var _0x5E7B = _0x622F + 1; _0x5E7B < syms["length"]; _0x5E7B++) {
            var _0x6681 = syms[_0x5E7B];
            if (_0x6681) {
                if ((_0x6681["type"] == 8 || _0x6681["type"] == 10) && _0x6681["v"] == _0x6CAD["v"]) {
                    _0x622F = _0x6681["istart"];
                    $(_0x714E)["removeClass"]("selected_text");
                    $("text[istart=" + _0x622F + "]")["addClass"]("selected_text");
                    _0x714E = $(".selected_text[type*=\'HD\'],.selected_text[type^=\'r\'],.selected_text[type=\'note\']");
                    break
                }
            }
        }
    }
    ;lastEditLyricIstart = _0x622F;
    if (_0x714E["length"] > 0) {
        _0x622F = $(_0x714E)["attr"]("istart");
        var _0x6681 = syms[_0x622F];
        if (_0x6681) {
            var _0x636B = $("rect[istart=" + _0x622F + "]");
            var _0x6D9A = document["createElement"]("div");
            $(_0x6D9A)["css"]("z-index", 99999)["css"]("position", "absolute")["css"]("background-color", "white");
            $(_0x6D9A)["attr"]("contenteditable", "true");
            $(_0x6D9A)["addClass"]("editor-div");
            $(_0x6D9A)["attr"]("sistart", _0x622F);
            $(_0x6D9A)["attr"]("line", _0x6681["my_line"]);
            $(_0x6D9A)["attr"]("v", _0x6681["v"]);
            $(_0x6D9A)["on"]("keyup", function(_0x64A7) {
                _0x64A7["preventDefault"]()
            });
            var _0x6E87 = false;
            $(_0x6D9A)["focus"](function(_0x64A7) {
                console["log"]("\u805a\u7126");
                _0x6E87 = true
            });
            $(_0x6D9A)["blur"](function(_0x64A7) {
                console["log"]("\u5931\u7126", _0x64A7);
                _0x6E87 = false;
                var _0x728A = this;
                setTimeout(function() {
                    if (_0x6E87) {
                        return
                    }
                    ;var _0x680C = $(_0x728A)["html"]();
                    var _0x7328 = null;
                    var _0x7377 = /\<div(([\s\S])*?)\<\/div\>/g;
                    var _0x72D9 = [];
                    var _0x5DDD = 0;
                    while (_0x7328 = _0x7377["exec"](_0x680C)) {
                        if (_0x5DDD == 0) {
                            if (_0x7328["index"] != 0) {
                                _0x72D9["push"](_0x680C["substring"](0, _0x7328["index"]))
                            }
                        }
                        ;_0x72D9["push"](_0x7328[1]["replaceAll"]("<br>", "")["replace"](">", "")["replace"](/\s/g, ""));
                        _0x5DDD++
                    }
                    ;if (_0x5DDD == 0) {
                        _0x72D9["push"](_0x680C["replace"](/\s/g, "")["replaceAll"]("<br>", ""))
                    }
                    ;while (_0x72D9[_0x72D9["length"] - 1] == "") {
                        _0x72D9["splice"](_0x72D9["length"] - 1, 1)
                    }
                    ;updateLyrics(_0x6681, _0x72D9);
                    $(_0x728A)["remove"]()
                }, 50)
            });
            var _0x6C0F = $(_0x636B)[0]["getBBox"]();
            var _0x6C5E = $(_0x636B)[0]["getBoundingClientRect"]();
            var _0x6E38 = 0;
            var _0x6DE9 = 30;
            var _0x7012 = -1;
            if (_0x6681["a_ly"]) {
                for (var _0x6409 = 0; _0x6409 < _0x6681["a_ly"]["length"]; _0x6409++) {
                    if (_0x6681["a_ly"][_0x6409]) {
                        var _0x6FC3 = _0x6681["a_ly"][_0x6409]["istart"];
                        var _0x70FF = $("rect[type=\'lyrics\'][istart=\'" + _0x6FC3 + "\']");
                        _0x6C5E = $(_0x70FF)[0]["getBoundingClientRect"]();
                        _0x6E38 = _0x6C5E["top"] - _0x70B0 - _0x6409 * 25;
                        _0x6DE9 = _0x6681["a_ly"]["length"] * 25;
                        break
                    }
                }
            } else {
                _0x6E38 = _0x6C5E["top"] - _0x70B0 + parseFloat(_0x6C5E["height"])
            }
            ;$(_0x6D9A)["css"]({
                left: _0x6C5E["left"] - _0x7061,
                top: _0x6E38,
                "min-width": 40,
                "min-height": _0x6DE9
            })["show"]();
            if (_0x6681["a_ly"]) {
                var _0x723B = [];
                var _0x6ED6 = [];
                var _0x6D4B = [];
                var _0x6CFC = "";
                for (var _0x5E7B = 0; _0x5E7B < _0x6681["a_ly"]["length"]; _0x5E7B++) {
                    var _0x6F25 = _0x6681["a_ly"][_0x5E7B];
                    if (_0x6F25) {
                        var _0x71EC = _0x6F25["t"];
                        var _0x6FC3 = _0x6F25["istart"];
                        var _0x6F74 = _0x6F25["iend"];
                        _0x723B["push"](_0x71EC);
                        _0x6ED6["push"](_0x6FC3);
                        _0x6D4B["push"](_0x6F74);
                        if (_0x5E7B < _0x6681["a_ly"]["length"]) {
                            _0x6CFC += "<div>" + _0x71EC + "</div>"
                        } else {
                            _0x6CFC += _0x71EC
                        }
                    } else {
                        _0x6CFC += "<div><br></div>"
                    }
                }
                ;$(_0x6D9A)["attr"]("lyistart", _0x6ED6["join"](","));
                $(_0x6D9A)["attr"]("lyiend", _0x6D4B["join"](","));
                $(_0x6D9A)["attr"]("word", _0x723B["join"](","));
                $(_0x6D9A)["html"](_0x6CFC)
            }
            ;$("#target")["append"]($(_0x6D9A));
            $(_0x6D9A)["focus"]()
        }
    }
}
function updateLyrics(_0x6681, _0xB581) {
    var _0x5FB7 = getNodesInfo($("#source")["val"]());
    var _0x10F4E = -1;
    var _0x10F9D = -1;
    for (var _0x5E7B = 0; _0x5E7B < _0x5FB7["length"]; _0x5E7B++) {
        var _0xAB52 = _0x5FB7[_0x5E7B];
        if (_0x6681["istart"] >= _0xAB52["startSeq"] && _0x6681["iend"] <= _0xAB52["endSeq"]) {
            _0x10F4E = _0xAB52["index"];
            for (var _0x5ECA = 0; _0x5ECA < _0xAB52["nodes"]["length"]; _0x5ECA++) {
                var _0x79A3 = _0xAB52["nodes"][_0x5ECA];
                if (_0x6681["istart"] >= _0x79A3["startSeq"] && _0x6681["iend"] <= _0x79A3["endSeq"]) {
                    _0x10F9D = _0x5ECA;
                    break
                }
            }
            ;break
        }
    }
    ;var _0x10E12 = _0x5FB7[_0x10F4E]["lyricLineNums"];
    var _0x10FEC = [];
    var _0xFA03 = _0x5FB7[_0x10F4E]["startSeq"];
    var _0xF7DA = _0x5FB7[_0x10F4E]["endSeq"];
    var _0x10EFF = new Map();
    var _0x10E61 = _0xB581["length"] > _0x10E12["length"] ? _0xB581["length"] : _0x10E12["length"];
    for (var _0x5ECA = 0; _0x5ECA < _0x10E61; _0x5ECA++) {
        var _0x10EB0 = _0x10EFF["get"]("lyric" + _0x5ECA);
        if (_0x10EB0 == null) {
            _0x10EB0 = "w:"
        }
        ;var _0x10DC3 = [];
        for (var _0x5E7B = _0xFA03; _0x5E7B <= _0xF7DA; _0x5E7B++) {
            var _0x10D74 = syms[_0x5E7B];
            if (_0x10D74) {
                if ((_0x10D74["type"] == 8 && !_0x10D74["grace"]) || _0x10D74["type"] == 10) {
                    if (_0x10DC3["indexOf"](_0x10D74["istart"]) > -1) {
                        continue
                    }
                    ;if (_0x10D74["type"] == 10) {
                        var _0x5D8E = $("#source")["val"]();
                        var _0x8296 = _0x5D8E["substring"](_0x10D74["istart"], _0x10D74["iend"]);
                        if (_0x8296["indexOf"](",") < 0) {
                            continue
                        }
                    }
                    ;_0x10DC3["push"](_0x10D74["istart"]);
                    var _0x6F25 = "*";
                    if (_0x10D74["a_ly"] && _0x10D74["a_ly"][_0x5ECA]) {
                        _0x6F25 = _0x10D74["a_ly"][_0x5ECA]["t"]
                    }
                    ;if (_0x10D74["istart"] == _0x6681["istart"]) {
                        var _0x71EC = _0xB581[_0x5ECA];
                        if (!_0x71EC || _0x71EC == "") {
                            _0x71EC = "*"
                        }
                        ;_0x10EB0 += " " + _0x71EC
                    } else {
                        _0x10EB0 += " " + _0x6F25
                    }
                } else {
                    if (_0x10D74["type"] == 0) {
                        _0x10EB0 += "|"
                    }
                }
            }
        }
        ;_0x10EFF["set"]("lyric" + _0x5ECA, _0x10EB0)
    }
    ;var _0xACDD = "";
    var _0x5DDD = 0;
    for (var _0x5E7B = 0; _0x5E7B < _0x5FB7["length"]; _0x5E7B++) {
        if (_0x10E12["indexOf"](_0x5E7B) > -1) {
            continue
        }
        ;var _0xAB52 = _0x5FB7[_0x5E7B];
        var _0x6006 = _0xAB52["lineStr"];
        _0xACDD += _0x6006 + "\x0A";
        if (_0x5E7B < _0x10F4E && _0xAB52["type"] == "note") {
            if (_0x5FB7[_0x5E7B + 1] && _0x5FB7[_0x5E7B + 1]["type"] != "lyric") {
                _0xACDD += "w:\x0A"
            }
        }
        ;if (_0x5E7B == _0x10F4E) {
            for (var _0x5ECA = 0; _0x5ECA < _0x10E61; _0x5ECA++) {
                _0xACDD += _0x10EFF["get"]("lyric" + _0x5ECA) + "\x0A"
            }
        }
    }
    ;_0xACDD = replaceBlankLine(_0xACDD);
    $("#source")["val"](_0xACDD);
    src_change(createLyricEditor);
    doLog()
}
function editCurrNoteLyric() {
    hiddenMenu();
    createLyricEditor()
}
function editorCurrNoteAnnot() {
    hiddenMenu();
    var _0x714E = $(".selected_text[type*=\'HD\'],.selected_text[type^=\'r\']");
    if (_0x714E["length"] == 0) {
        window["top"]["swAutoAlert"]("\u672a\u9009\u4e2d\u97f3\u7b26");
        return
    }
    ;var _0x622F = $(_0x714E)["attr"]("istart");
    editorAnnot(_0x622F)
}
function getPathInfo(_0x772B) {
    var _0x93DE = new Object();
    var _0x97E1 = new Object();
    var _0xCDE2 = /M(.[^c]*)c/;
    var _0xD9EB = _0xCDE2["exec"](_0x772B);
    var _0x7ADF = new Object();
    _0x7ADF["x"] = parseFloat(_0xD9EB[1]["split"](" ")[0]);
    _0x7ADF["y"] = parseFloat(_0xD9EB[1]["split"](" ")[1]);
    _0x93DE["start"] = _0x7ADF;
    var _0xD94D = /c(.[^v]*)v/;
    var _0xD860 = _0xD94D["exec"](_0x772B);
    var _0xD99C = _0xD860[1]["replace"](/\s+/, " ")["replace"]("\x0A", "")["replace"]("\x09", "");
    var _0xDA3A = _0xD99C["split"](" ");
    var _0xD8AF = new Object();
    _0xD8AF["x"] = parseFloat(_0xDA3A[0]);
    _0xD8AF["y"] = parseFloat(_0xDA3A[1]);
    _0x93DE["control1"] = _0xD8AF;
    var _0xD8FE = new Object();
    _0xD8FE["x"] = parseFloat(_0xDA3A[2]);
    _0xD8FE["y"] = parseFloat(_0xDA3A[3]);
    _0x93DE["control2"] = _0xD8FE;
    var _0x7867 = new Object();
    _0x7867["x"] = parseFloat(_0xDA3A[4]);
    _0x7867["y"] = parseFloat(_0xDA3A[5]);
    _0x93DE["end"] = _0x7867;
    console["log"](_0x93DE);
    return _0x93DE
}
function setPathInfo(_0x74B3, _0x97E1) {
    var _0xFE55 = _0x97E1["start"];
    var _0xD8AF = _0x97E1["control1"];
    var _0xD8FE = _0x97E1["control2"];
    var _0xFE06 = _0x97E1["end"];
    _0x74B3["setAttribute"]("ori_start_x", _0xFE55["x"]);
    _0x74B3["setAttribute"]("ori_start_y", _0xFE55["y"]);
    _0x74B3["setAttribute"]("ori_end_x", _0xFE06["x"]);
    _0x74B3["setAttribute"]("ori_end_y", _0xFE06["y"]);
    _0x74B3["setAttribute"]("ori_control1_x", _0xD8AF["x"]);
    _0x74B3["setAttribute"]("ori_control1_y", _0xD8AF["y"]);
    _0x74B3["setAttribute"]("ori_control2_x", _0xD8FE["x"]);
    _0x74B3["setAttribute"]("ori_control2_y", _0xD8FE["y"])
}
function pathxy(_0xF1AE, _0xF2EA, _0xF1FD, _0xF339, _0xEEE7, _0x9743, _0xF15F, _0xEF36) {
    var _0xA1C1, _0xA210, _0xEF85, _0xED0D = 0.3, _0xED5C = 0.45;
    _0xA210 = _0xF339 - _0xF2EA;
    if (_0xA210 < 0) {
        _0xA210 = -_0xA210
    }
    ;_0xA1C1 = _0xF1FD - _0xF1AE;
    if (_0xA1C1 > 40. && _0xA210 / _0xA1C1 < 0.7) {
        _0xED0D = 0.3 + 0.002 * (_0xA1C1 - 40.);
        if (_0xED0D > 0.7) {
            _0xED0D = 0.7
        }
    }
    ;var _0xEFD4 = 0.5 * (_0xF1AE + _0xF1FD)
      , _0xF023 = 0.5 * (_0xF2EA + _0xF339)
      , _0xF24C = _0xEFD4 + _0xED0D * (_0xF1AE - _0xEFD4)
      , _0xF388 = _0xF023 + _0xED0D * (_0xF2EA - _0xF023) + _0x9743;
    _0xF24C = _0xF1AE + _0xED5C * (_0xF24C - _0xF1AE);
    _0xF388 = _0xF2EA + _0xED5C * (_0xF388 - _0xF2EA);
    var _0xF29B = _0xEFD4 + _0xED0D * (_0xF1FD - _0xEFD4)
      , _0xF3D7 = _0xF023 + _0xED0D * (_0xF339 - _0xF023) + _0x9743;
    _0xF29B = _0xF1FD + _0xED5C * (_0xF29B - _0xF1FD);
    _0xF3D7 = _0xF339 + _0xED5C * (_0xF3D7 - _0xF339);
    _0xA1C1 = 0.03 * (_0xF1FD - _0xF1AE);
    _0xA210 = 2 * _0xEEE7;
    _0xEF85 = 0.2 + 0.001 * (_0xF1FD - _0xF1AE);
    if (_0xEF85 > 0.6) {
        _0xEF85 = 0.6
    }
    ;_0xEF85 *= _0xEEE7;
    var _0xF072 = "";
    _0xF072 += "M" + abc["sx"](_0xF1AE) + "  " + abc["sy"](_0xF2EA);
    var _0xF0C1 = 1;
    var _0xEDAB = ((_0xF2EA - _0xF388) / _0xF0C1)["toFixed"](2);
    var _0x71EC = _0xF15F && radianHei ? radianHei : 0;
    if (_0xF15F && _0xEDAB > 0) {
        _0xEDAB = -_0xEDAB - _0x71EC
    }
    ;var _0xEE49 = ((_0xF2EA - _0xF3D7) / _0xF0C1)["toFixed"](2);
    if (_0xF15F && _0xEE49 > 0) {
        _0xEE49 = -_0xEE49 - _0x71EC
    }
    ;var _0xEDFA = ((_0xF339 + _0xEF85 - _0xF3D7 - _0xA210) / _0xF0C1)["toFixed"](2);
    if (_0xF15F && _0xEDFA > 0) {
        _0xEDFA = -_0xEDFA - _0x71EC
    }
    ;var _0xEE98 = ((_0xF339 + _0xEF85 - _0xF388 - _0xA210) / _0xF0C1)["toFixed"](2);
    if (_0xF15F && _0xEE98 > 0) {
        _0xEE98 = -_0xEE98 - _0x71EC
    }
    ;var _0xF110 = new Object();
    _0xF110["scale"] = 1;
    var _0xF0C1 = 1;
    _0xF072 += "c" + ((_0xF24C - _0xF1AE) / _0xF110["scale"])["toFixed"](1) + " " + ((_0xF2EA - _0xF388) / _0xF0C1)["toFixed"](1) + " " + ((_0xF29B - _0xF1AE) / _0xF110["scale"])["toFixed"](1) + " " + ((_0xF2EA - _0xF3D7) / _0xF0C1)["toFixed"](1) + " " + ((_0xF1FD - _0xF1AE) / _0xF110["scale"])["toFixed"](1) + " " + ((_0xF2EA - _0xF339) / _0xF0C1)["toFixed"](1);
    if (!_0xEF36) {
        _0xF072 += "\x0A\x09v" + (-_0xEF85)["toFixed"](1) + "c" + ((_0xF29B - _0xA1C1 - _0xF1FD) / _0xF110["scale"])["toFixed"](1) + " " + ((_0xF339 + _0xEF85 - _0xF3D7 - _0xA210) / _0xF0C1)["toFixed"](1) + " " + ((_0xF24C + _0xA1C1 - _0xF1FD) / _0xF110["scale"])["toFixed"](1) + " " + ((_0xF339 + _0xEF85 - _0xF388 - _0xA210) / _0xF0C1)["toFixed"](1) + " " + ((_0xF1AE - _0xF1FD) / _0xF110["scale"])["toFixed"](1) + " " + ((_0xF339 + _0xEF85 - _0xF2EA) / _0xF0C1)["toFixed"](1)
    }
    ;_0xF072 += "\"/>\x0A";
    console["log"](_0xF072)
}

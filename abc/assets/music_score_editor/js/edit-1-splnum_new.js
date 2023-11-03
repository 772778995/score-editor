/* edit-1-splnum */

window["onerror"] = function(_0x1B6AF, _0x1B70C, _0x1B652) {
    if (_0x1B6AF == "Uncaught EvalError: Possible side-effect in debug-evaluate") {
        return false
    }
    ;if (typeof _0x1B6AF == "string") {
        window["top"]["alert"]("window error: " + _0x1B6AF + "\x0AURL: " + _0x1B70C + "\x0ALine: " + _0x1B652)
    } else {
        if (typeof _0x1B6AF == "object") {
            window["top"]["alert"]("window error: " + _0x1B6AF["type"] + " " + _0x1B6AF["target"]["src"])
        } else {
            window["top"]["alert"]("window error: " + _0x1B6AF)
        }
    }
    ;return false
}
;
var dragRect = false;
var global_volume = 3;
var svg_selected = false;
var select_position = -1;
var laststopPt = 0;
var log = [];
var dellog = [];
var vols = new Array();
var x_syms = [];
var abc_images, abc_fname = ["noname.abc", ""], abc, syms = [], srcend, elt_ref = {}, selx = [0, 0], selx_sav = [], play = {}, pop, texts = {
    bad_nb: "Bad line number",
    fn: "File name: ",
    load: "Please, load the included file "
}, jsdir = document["currentScript"] ? document["currentScript"]["src"]["match"](/.*\//) : function() {
    var _0x1B769 = document["getElementsByTagName"]("script");
    return _0x1B769[_0x1B769["length"] - 1]["src"]["match"](/.*\//) || ""
}();
if (typeof jsdir != "undefined" && !jsdir) {
    jsdir = "/ixzdscommon/abc/js/"
}
;var drawParam = {
    curNoteLineY: 0
};
var lastKeyMap = {}
  , beamIns = null
  , drawIns = null;
if (typeof CheckBeamIns == "function") {
    beamIns = new CheckBeamIns()
}
;if (typeof DrawUtil == "function") {
    drawIns = new DrawUtil()
}
;var line0X = -1;
var line1X = -1;
var user = {
    read_file: function(_0x1B7C6) {
        elt_ref["s" + srcidx]["style"]["display"] = "inline";
        return elt_ref["src1"]["value"]
    },
    errmsg: function(_0x1B6AF, _0x1B880, _0x1B823) {
        _0x1B6AF = clean_txt(_0x1B6AF);
        if (_0x1B880) {
            elt_ref["diverr"]["innerHTML"] += "<b onclick=\"gotoabc(" + _0x1B880 + "," + _0x1B823 + ")\" style=\"cursor: pointer; display: inline-block\">" + _0x1B6AF + "</b><br/>\x0A"
        } else {
            elt_ref["diverr"]["innerHTML"] += _0x1B6AF + "<br/>\x0A"
        }
    },
    my_img_out: function(_0x1B8DD) {
        abc_images += _0x1B8DD
    },
    anno_stop: function(_0x1BC7F, _0x1BB0B, _0x1BB68, _0x1BD96, _0x1BDF3, _0x1BD39, _0x1B997, _0x1BAAE, _0x1BBC5) {
        if (["beam", "slur", "tuplet"]["indexOf"](_0x1BC7F) >= 0) {
            return
        }
        ;if (!_0x1BAAE["clef_auto"]) {
            syms[_0x1BB0B] = _0x1BAAE
        }
        ;srcend[_0x1BB0B] = _0x1BB68;
        if (this["singleRect"] && user["syncRect"] == "single") {
            singleRect2(_0x1BC7F, _0x1BB0B, _0x1BB68, _0x1BD96, _0x1BDF3, _0x1BD39, _0x1B997, _0x1BAAE, _0x1BBC5)
        }
        ;var _0x1B93A = " ondblclick = \'editorAnnot(" + _0x1BB0B + ")\'";
        if (_0x1BC7F == "bar" || _0x1BC7F == "splnum_bar") {
            _0x1B93A = " onclick=\'clickBar(" + _0x1BB0B + ",event)\'"
        }
        ;if (_0x1BC7F == "my_chord") {
            _0x1B93A = ""
        }
        ;if (2 != musicType || (0 != musicType && _0x1BC7F == "tempo") || _0x1BC7F == "lyrics") {
            if (_0x1BAAE["xin"]) {
                _0x1BD96 += _0x1BAAE["xin"]
            }
            ;abc["out_svg"]("<rect pathistart=\"" + _0x1BAAE["istart"] + "\" " + _0x1B93A + " type=\"" + _0x1BC7F + "\" v=\"" + _0x1BAAE["v"] + "\" istart=\"" + _0x1BB0B + "\" class=\"abcr _" + _0x1BB0B + "_\" x=\"");
            if (0 != musicType && _0x1BC7F == "tempo") {
                _0x1BD96 = abc["sh"](tempoMgL + 10 + _0x1BD39);
                abc["out_sxsy"](_0x1BD96, "\" y=\"", _0x1BDF3 + (typeof tempoMgB == "undefined" ? 0 : tempoMgB))
            } else {
                abc["out_sxsy"](_0x1BD96, "\" y=\"", _0x1BDF3)
            }
            ;if (_0x1BAAE["a_gch"]) {
                for (var _0x1B9F4 = 0; _0x1B9F4 < _0x1BAAE["a_gch"]["length"]; _0x1B9F4++) {
                    var _0x1BC22 = _0x1BAAE["a_gch"][_0x1B9F4]["text"];
                    var _0x1BCDC = /url\((.*)\)/;
                    if (_0x1BCDC["test"](_0x1BC22)) {
                        var _0x1BA51 = _0x1BC22["match"](_0x1BCDC);
                        if (_0x1BA51 != null) {
                            var _0x1B70C = _0x1BA51[1];
                            abc["out_svg"]("\" onclick=\"window.open(\'" + _0x1B70C + "\')");
                            abc["out_svg"]("\" style=\"cursor: pointer;")
                        }
                    }
                }
            }
            ;if (_0x1BC7F == "tempo") {
                if (Q_url != "") {
                    abc["out_svg"]("\" onclick=\"window.open(\'" + Q_url + "\')");
                    abc["out_svg"]("\" style=\"cursor: pointer;");
                    Q_url = ""
                }
            }
            ;if (_0x1BC7F == "meter") {
                if (M_url != "") {
                    abc["out_svg"]("\" onclick=\"window.open(\'" + M_url + "\')");
                    abc["out_svg"]("\" style=\"cursor: pointer;");
                    M_url = ""
                }
            }
            ;if (_0x1BC7F == "clef") {
                if (_0x1BAAE["clef_type"] == "t") {
                    if (treble_url != "") {
                        abc["out_svg"]("\" onclick=\"window.open(\'" + treble_url + "\')");
                        abc["out_svg"]("\" style=\"cursor: pointer;");
                        treble_url = ""
                    }
                } else {
                    if (_0x1BAAE["clef_type"] == "b") {
                        if (bass_url != "") {
                            abc["out_svg"]("\" onclick=\"window.open(\'" + bass_url + "\')");
                            abc["out_svg"]("\" style=\"cursor: pointer;");
                            bass_url = ""
                        }
                    } else {
                        if (_0x1BAAE["clef_type"] == "c") {
                            if (_0x1BAAE["clef_small"]) {
                                if (tenor_url != "") {
                                    abc["out_svg"]("\" onclick=\"window.open(\'" + tenor_url + "\')");
                                    abc["out_svg"]("\" style=\"cursor: pointer;");
                                    tenor_url = ""
                                }
                            } else {
                                if (alto_url != "") {
                                    abc["out_svg"]("\" onclick=\"window.open(\'" + alto_url + "\')");
                                    abc["out_svg"]("\" style=\"cursor: pointer;");
                                    alto_url = ""
                                }
                            }
                        }
                    }
                }
            }
            ;abc["out_svg"]("\" width=\"" + _0x1BD39["toFixed"](2) + "\" height=\"" + abc["sh"](_0x1B997)["toFixed"](2) + "\"/>\x0A")
        }
        ;if (this["showSplNumber"]) {
            this["showSplNumber"]["apply"](this, arguments)
        }
    },
    page_format: true,
    abcPlayWay: 1,
    abcLoadCball: null,
    endplayCball: null,
    setselCball: null,
    startplayCball: null,
    isScrollIntoView: true,
    clickNoteScrollIntoView: true,
    isSmoothScrolling: false,
    currScrollIndex: 0,
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
        countDownNum: 0
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
        backSize: 0
    },
    showNoteInfo: false,
    showNoteInfoCallback: null,
    editorStaff: false,
    pageSet: {
        isLeftRight: false
    },
    editorPage: false,
    noteUpdate: {
        active: false,
        istart: 0,
        lyric: null,
        line: 0,
        isNext: false,
        isClearPrevNote: false,
        prevNoteIstart: -1
    },
    loopJump: {
        isOpen: false,
        jump: [],
        time: 0.5
    },
    prevJump: {
        isOpen: false,
        jump: [],
        lastSvgNode: null
    },
    midiInput: false,
    tmpTransposition: 0,
    tmpInstru: -1,
    tmpInstruLoading: false,
    lastTmpInstru: 0,
    tmpSpeed: 1,
    render: true,
    isEmptyClean: true,
    svgClickCball: null,
    svgClickHandle: null,
    editorAnnot: false,
    mode: "editor",
    smallVersion: false,
    lastEditLyricIstart: -1,
    showLyricEditor: false,
    numStaffCanDrag: false,
    numStaffiIndent: -10,
    defaultMusicType: 0,
    srcChangeCount: 0,
    copyNoteInfo: {
        dur: 0,
        s: null,
        copyNoteStr: ""
    },
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
    showHq: false
}
  , srcidx = 0;
var editSplnum = user;
function storage(_0x2023F, _0x1E5E9, _0x21A39) {
    try {
        _0x2023F = _0x2023F ? localStorage : sessionStorage;
        if (!_0x2023F) {
            return
        }
        ;if (_0x21A39) {
            _0x2023F["setItem"](_0x1E5E9, _0x21A39)
        } else {
            if (_0x21A39 === 0) {
                _0x2023F["removeItem"](_0x1E5E9)
            } else {
                return _0x2023F["getItem"](_0x1E5E9)
            }
        }
    } catch (e) {}
}
function clean_txt(_0x205E1) {
    return _0x205E1["replace"](/<|>|&.*?;|&/g, function(_0x1B823) {
        switch (_0x1B823) {
        case "<":
            return "&lt;";
        case ">":
            return "&gt;";
        case "&":
            return "&amp;"
        }
        ;return _0x1B823
    })
}
function loadlang(_0x247A2, _0x247FF) {
    abc2svg["loadjs"]("edit-" + _0x247A2 + ".js", function() {
        loadtxt()
    });
    abc2svg["loadjs"]("err-" + _0x247A2 + ".js");
    if (!_0x247FF) {
        storage(true, "lang", _0x247A2 == "en" ? 0 : _0x247A2)
    }
}
function popshow(_0x25D6E, _0x25DCB) {
    var _0x2063E = document["getElementById"](_0x25D6E);
    if (pop) {
        if (pop == _0x2063E) {
            _0x25DCB = false
        } else {
            pop["style"]["visibility"] = "hidden"
        }
    }
    ;_0x2063E["style"]["visibility"] = _0x25DCB ? "visible" : "hidden";
    pop = _0x25DCB ? _0x2063E : null
}
function loadtune() {
    var _0x2485C = document["getElementById"]("abcfile")["files"];
    if (_0x2485C && _0x2485C["length"]) {
        abc_fname[srcidx] = _0x2485C[0]["name"];
        var _0x215DD = new FileReader;
        _0x215DD["onloadend"] = function(_0x2069B) {
            var _0x220C3 = _0x2069B["target"]["result"];
            if (_0x220C3["indexOf"]("K:") < 0) {
                _0x220C3 = decryptText(_0x220C3)
            }
            ;var _0x1B9F4, _0x1D0D7, _0x248B9, _0x1BAAE = srcidx == 0 ? "source" : "src1";
            if (_0x220C3["indexOf"]("%%linebreak") < 0) {
                _0x220C3 = addLineBreak(_0x220C3)
            }
            ;elt_ref[_0x1BAAE]["value"] = _0x220C3;
            elt_ref["s" + srcidx]["value"] = abc_fname[srcidx];
            src_change()
        }
        ;
        _0x215DD["readAsText"](_0x2485C[0], "UTF-8")
    }
}
function selsrc(_0x24517) {
    console["log"]("function selsrc");
    if (_0x24517 == srcidx) {
        return
    }
    ;var _0x26ADF = srcidx ? "src" + srcidx : "source"
      , _0x1C5F1 = _0x24517 ? "src" + _0x24517 : "source";
    elt_ref[_0x26ADF]["style"]["display"] = "none";
    elt_ref[_0x1C5F1]["style"]["display"] = "inline";
    elt_ref["s" + srcidx]["style"]["backgroundColor"] = "#ffd0d0";
    elt_ref["s" + _0x24517]["style"]["backgroundColor"] = "#80ff80";
    srcidx = _0x24517
}
function render(_0x25E85) {
    var _0x1B9F4, _0x1D0D7, _0x220C3 = document["getElementById"]("source")["value"];
    play["a_pe"] = null;
    if (!_0x220C3) {
        _0x220C3 = document["getElementById"]("source")["value"];
        elt_ref["source"]["value"] = _0x220C3
    }
    ;if (!_0x220C3) {
        return
    }
    ;_0x1B9F4 = _0x220C3["indexOf"]("%%abc-include ");
    if (_0x1B9F4 >= 0) {
        var _0x248B9 = elt_ref["s1"];
        if (!_0x248B9["value"]) {
            _0x248B9["style"]["display"] = "inline";
            _0x1D0D7 = _0x220C3["indexOf"]("\x0A", _0x1B9F4);
            _0x248B9["value"] = _0x220C3["slice"](_0x1B9F4 + 14, _0x1D0D7);
            selsrc(1);
            window["top"]["alert"](texts["load"] + _0x248B9["value"]);
            return
        }
    }
    ;elt_ref["diverr"]["innerHTML"] = "";
    _0x220C3 = null;
    render2(_0x25E85)
}
var tmpstr = "";
var renderTimeout = -1;
function render2(_0x25E85) {
    $("#nodeMenu")["hide"]();
    var _0x25FF9 = (new Date)["getTime"]();
    var _0x220C3 = $("#source")["val"]();
    if (!abc2svg["modules"]["load"](_0x220C3 + elt_ref["src1"]["value"], render2)) {
        _0x220C3 = null;
        return
    }
    ;hasTempo = false;
    lastMeter = "";
    lastTone = "";
    lastKeyMap = {};
    sameLineDim = {};
    user["img_out"] = user["my_img_out"];
    user["get_abcmodel"] = null;
    if (typeof showSplNumber == "function") {
        user["showSplNumber"] = showSplNumber
    }
    ;if (typeof singleRect == "function") {
        user["singleRect"] = singleRect2
    }
    ;abc = new abc2svg["Abc"](user);
    abc_images = "";
    abc["tosvg"]("edit", "%%bgcolor white");
    srcend = [];
    syms = [];
    try {
        abc["tosvg"](abc_fname[0], _0x220C3)
    } catch (e) {
        window["top"]["alert"](e["message"] + "\x0Aabc2svg tosvg bug - stack:\x0A" + e["stack"]);
        return
    }
    ;abc2svg["abc_end"]();
    try {
        var _0x25F3F = new Array();
        var _0x26056 = (new Date)["getTime"]();
        if (user["render"]) {
            if (editSvgLineIndex != -1) {
                $("#target")["html"](abc_images)
            } else {
                $("#target")["html"](abc_images)
            }
        }
        ;clearTimeout(renderTimeout);
        renderSuccess();
        if (_0x25E85) {
            _0x25E85()
        }
        ;barVoiceNumArr = [];
        abc_images = null;
        var _0x25F9C = (new Date)["getTime"]();
        console["log"]("\u89e3\u6790\u65f6\u957f\uff1a", (_0x25F9C - _0x25FF9));
        var _0x25EE2 = (new Date)["getTime"]();
        console["log"]("\u6e32\u67d3\u65f6\u957f\uff1a", (_0x25EE2 - _0x26056));
        if (user["abcLoadCball"]) {
            user["abcLoadCball"]()
        }
        ;if (user["horizontal"]["open"]) {
            $(user["horizontal"]["scrollClass"])["css"]({
                width: "100%",
                overflow: "auto",
                'box-sizing': "border-box"
            })
        }
    } catch (e) {
        window["top"]["alert"](e["message"] + "\x0Aabc2svg image bug - abort");
        return
    }
    ;document["getElementById"]("er")["style"]["display"] = elt_ref["diverr"]["innerHTML"] ? "inline" : "none";
    reselect();
    if (_0x220C3["indexOf"]("hidefirstmeter") > -1) {
        for (var _0x1B9F4 = 0; _0x1B9F4 < 16; _0x1B9F4++) {
            $(".staff_meter" + _0x1B9F4)["first"]()["hide"]()
        }
        ;$(".spl_meter")["first"]()["hide"]();
        $(".spl_meter_mode")["first"]()["hide"]()
    }
    ;_0x220C3 = null
}
function gotoabc(_0x1B880, _0x1B823) {
    var _0x1BAAE = elt_ref["source"]
      , _0x24517 = 0;
    selsrc(0);
    while (--_0x1B880 >= 0) {
        _0x24517 = _0x1BAAE["value"]["indexOf"]("\x0A", _0x24517) + 1;
        if (_0x24517 <= 0) {
            window["top"]["alert"](texts["bad_nb"]);
            _0x24517 = _0x1BAAE["value"]["length"] - 1;
            _0x1B823 = 0;
            break
        }
    }
    ;_0x1B823 = Number(_0x1B823) + _0x24517;
    _0x1BAAE["focus"]();
    _0x1BAAE["setSelectionRange"](_0x1B823, srcend[_0x1B823] || _0x1B823 + 1)
}
function findLineNumByIndex(_0x220C3, _0x1C138) {
    var _0x22120 = _0x220C3["split"]("\x0A");
    var _0x22066 = 0;
    for (var _0x1B9F4 = 0; _0x1B9F4 < _0x22120["length"]; _0x1B9F4++) {
        _0x22066 += _0x22120[_0x1B9F4]["length"] + 1;
        if (_0x22066 > _0x1C138) {
            return _0x1B9F4
        }
    }
    ;return 0
}
var firstv = 0;
function getPt(_0x23CBC) {
    var _0x23C5F = getNoteData();
    if (_0x23C5F != null) {
        for (var _0x1B9F4 = 0; _0x1B9F4 < _0x23C5F["length"]; _0x1B9F4++) {
            var _0x23C02 = _0x23C5F[_0x1B9F4];
            if (_0x23C02[0] == _0x23CBC) {
                return _0x23C02[1]
            }
        }
    }
    ;return 0
}
function svgMouseDown(_0x2069B) {
    if (user["clickAddText"]) {
        console["log"](_0x2069B["target"]);
        if ($(_0x2069B["target"])["attr"]("type") == "mytext") {
            return false
        }
        ;addEditorText(_0x2069B);
        return false
    }
    ;if ($(_0x2069B["target"])["attr"]("type") == "bar" || $(_0x2069B["target"])["attr"]("type") == "splnum_bar") {
        return
    }
    ;console["log"]("-----svgMouseDown");
    if (graph_update) {
        graphMouseDownHandle(_0x2069B);
        if ($(".selected_text")["length"] > 0 || $(".selected_path")["length"] > 0) {
            if (musicType == 2) {
                var _0x1EF5B = getSelectText("source");
                if (_0x1EF5B == "") {
                    var _0x26F98 = $(".selected_text[type=\'note\']");
                    if (_0x26F98["length"] > 0) {
                        var _0x2351B = $(_0x26F98)["attr"]("istart");
                        var _0x1BAAE = syms[_0x2351B];
                        if (_0x1BAAE) {
                            var _0x220C3 = $("#source")["val"]();
                            _0x1EF5B = _0x220C3["substring"](_0x1BAAE["istart"], _0x1BAAE["iend"])
                        }
                    }
                }
                ;if (_0x1EF5B != "") {
                    dragNumNoteFlag = true
                }
            }
            ;return false
        } else {
            return
        }
    }
}
function svgMouseMove(_0x2069B) {
    if (graph_update) {
        graphMouseMoveHandle(_0x2069B);
        return false
    }
    ;if (musicType == "2") {
        var _0x1EF5B = getSelectText("source");
        if (_0x1EF5B != "" && dragNumNoteFlag) {
            try {
                numStaffDrag(_0x2069B)
            } catch (e) {
                console["log"](e)
            }
        }
        ;return
    }
}
function svgMouseUp(_0x2069B) {
    console["log"]("-----svgMouseUp");
    if (graph_update) {
        graphMouseUpHandle(_0x2069B);
        return
    }
}
function svgsel(_0x2069B) {
    typeof (user["svgClickCball"]) == "function" && user["svgClickCball"](_0x2069B);
    if (graph_update) {
        return
    }
    ;if (draw_editor) {
        return
    }
    ;if (user["showNoteInfo"]) {
        var _0x23F47 = _0x2069B["target"];
        if (_0x23F47["tagName"]["toLowerCase"]() == "rect") {
            _0x23F47 = $(_0x23F47)["parents"]("svg")
        }
        ;var _0x1BC7F = findNearElement(_0x23F47, _0x2069B["offsetX"] / scale, _0x2069B["offsetY"] / scale);
        console["log"]("type:", _0x1BC7F);
        if (typeof (user["showNoteInfoCallback"]) == "function") {
            user["showNoteInfoCallback"](_0x1BC7F)
        }
        ;return
    }
    ;if (typeof user["getNote"] == "function") {
        user["getNote"](_0x2069B)
    }
    ;if (user["svgselBan"]) {
        return false
    }
    ;var _0x2197F = _0x2069B["target"]
      , _0x218C5 = _0x2197F["getAttribute"]("class")
      , _0x21922 = document["getElementById"]("ctxMenu");
    if (!user["isCtrl"] && Number(getAbcistart(_0x218C5)) != selx[0] && (user["isEmptyClean"] || _0x218C5 && _0x218C5["substr"](0, 4) == "abcr")) {
        clearOldSelect()
    }
    ;svg_selected = true;
    if (user["changePianoBoard"]) {
        setTimeout(function() {
            changePianoBoard("source", getKByPos("source"))
        }, 500)
    }
    ;if (user["findPosition"]) {
        findPosition(_0x2069B, _0x2197F)
    }
    ;play["loop"] = false;
    _0x2069B["stopImmediatePropagation"]();
    _0x2069B["preventDefault"]();
    if (_0x21922 && _0x21922["style"]["display"] == "block") {
        _0x21922["style"]["display"] = "none";
        return false
    }
    ;if (play["playing"] && !play["stop"]) {
        play["stop"] = -1;
        play["abcplay"]["stop"]();
        return false
    }
    ;select_position = -1;
    if (_0x218C5 && _0x218C5["substr"](0, 4) == "abcr") {
        setsel(0, Number(getAbcistart(_0x218C5)));
        select_position = Number(getAbcistart(_0x218C5));
        laststop = select_position;
        play["stop"] = 0;
        var _0x26FF5 = document["getElementById"]("source");
        var _0x1B652 = findLineNumByIndex($("#source")["val"](), Number(getAbcistart(_0x218C5)));
        _0x26FF5["scrollTop"] = (_0x1B652 * _0x26FF5["scrollHeight"]) / $("#source")["val"]()["split"]("\x0A")["length"] - 10
    } else {
        setsel(0, 0)
    }
    ;if (user["noteClick"]) {
        user["noteClick"](select_position)
    }
    ;setsel(1, 0);
    try {
        if (user["lightoperator"]) {
            lightoperator()
        }
        ;getSelectNotePosition("source");
        var _0x263F8 = getSelectText("source");
        var _0x27052 = /V:\s*1/;
        var _0x270AF = /V:\s*2/;
        if (_0x27052["test"](_0x263F8)) {
            currInputVoice = 1
        } else {
            if (_0x270AF["test"](_0x263F8)) {
                currInputVoice = 2
            }
        }
    } catch (e) {
        console["log"](e)
    }
    ;if (!$(_0x2069B["target"])["find"](".menu-box")["length"] > 0 && typeof content_vue != "undefined") {
        content_vue["menuActive"] = ""
    }
    ;typeof (user["svgClickHandle"]) == "function" && user["svgClickHandle"](_0x2069B)
}
function setsel(_0x24517, _0x21A39, seltxt) {
    if (!user["isCtrl"]) {
        firstv = _0x21A39
    }
    ;var _0x1B9F4, _0x24CB8, _0x1BAAE, _0x26CB0 = selx[_0x24517];
    if (_0x21A39 == _0x26CB0) {
        if (user["setselCball"] && _0x21A39 > 0) {
            _0x1BAAE = elt_ref["source"];
            user["setselCball"](_0x1BAAE, _0x21A39, true)
        }
        ;if (user["isSelect2play"]) {
            return
        }
    }
    ;if (_0x26CB0) {}
    ;if (_0x21A39) {
        _0x24CB8 = document["getElementsByClassName"]("_" + _0x21A39 + "_");
        if (_0x24CB8[0] && _0x24CB8[0]["style"]) {
            _0x24CB8[0]["style"]["fillOpacity"] = 0.4
        }
    }
    ;selx[_0x24517] = _0x21A39;
    if (_0x24517 != 0 || seltxt || !_0x21A39) {
        return
    }
    ;_0x1BAAE = elt_ref["source"];
    selsrc(0);
    if (firstv < srcend[_0x21A39]) {
        _0x1BAAE["setSelectionRange"](firstv, srcend[_0x21A39])
    } else {
        _0x1BAAE["setSelectionRange"](_0x21A39, srcend[firstv])
    }
    ;_0x1BAAE["blur"]();
    _0x1BAAE["focus"]();
    if (user["setselCball"] && _0x21A39 > 0) {
        user["setselCball"](_0x1BAAE, _0x21A39)
    }
}
function setselAll(_0x1C24F, _0x26D0D) {
    $("rect")["css"]("fill-opacity", "0.4");
    return;
    console["log"]("idx:", idx, "  v:", v, "seltxt:", seltxt);
    if (!user["isCtrl"]) {
        firstv = v
    }
    ;var _0x1B9F4, _0x24CB8, _0x1BAAE, _0x26CB0 = selx[idx];
    if (v == _0x26CB0) {
        if (user["setselCball"] && v > 0) {
            _0x1BAAE = elt_ref["source"];
            user["setselCball"](_0x1BAAE, v, true)
        }
        ;if (user["isSelect2play"]) {
            return
        }
    }
    ;if (_0x26CB0) {}
    ;if (v) {
        _0x24CB8 = document["getElementsByClassName"]("_" + v + "_");
        _0x1B9F4 = _0x24CB8["length"];
        while (--_0x1B9F4 >= 0) {
            _0x24CB8[_0x1B9F4]["style"]["fillOpacity"] = 0.4
        }
    }
    ;selx[idx] = v;
    if (idx != 0 || seltxt || !v) {
        return
    }
    ;_0x1BAAE = elt_ref["source"];
    selsrc(0);
    if (firstv < srcend[v]) {
        _0x1BAAE["setSelectionRange"](firstv, srcend[v])
    } else {
        _0x1BAAE["setSelectionRange"](v, srcend[firstv])
    }
    ;_0x1BAAE["blur"]();
    _0x1BAAE["focus"]();
    if (user["setselCball"] && v > 0) {
        user["setselCball"](_0x1BAAE, v)
    }
}
function clearOldSelect() {
    $(".abcr")["css"]("fill-opacity", "0")
}
function reselect(_0x2069B) {
    var _0x263F8 = getSelectText("source");
    if (_0x263F8 != "") {
        seltxt()
    }
}
function seltxt(_0x2069B) {
    if (svg_selected) {
        svg_selected = false;
        return
    }
    ;if (!user["isCtrl"] && user["isEmptyClean"]) {
        clearOldSelect()
    }
    ;var _0x1BAAE, _0x24CB8, _0x2063E = 0, _0x2197F = elt_ref["source"], _0x1BB0B = _0x2197F["selectionStart"], _0x23E30 = _0x2197F["selectionEnd"];
    if (_0x1BB0B == _0x23E30) {
        return
    }
    ;play["loop"] = false;
    if (srcend) {
        srcend["forEach"](function(_0x26B3C, _0x26B99) {
            if (!_0x1BAAE) {
                if (_0x26B99 >= _0x1BB0B) {
                    _0x1BAAE = _0x26B99
                }
            } else {
                if (_0x26B3C <= _0x23E30) {
                    _0x2063E = _0x26B99
                }
            }
        })
    }
    ;if (!_0x1BAAE) {
        return
    }
    ;if (user["isSelect2play"]) {
        if (selx[0] != _0x1BAAE) {
            setsel(0, _0x1BAAE, true)
        }
        ;if (selx[1] != _0x2063E) {
            setsel(1, _0x2063E)
        }
    } else {
        if (_0x1BAAE == getFirstSyms()["istart"] && _0x2063E == syms["length"] - 1) {
            setselAll(_0x1BAAE, _0x2063E)
        } else {
            setsel(1, _0x1BAAE);
            for (var _0x1B9F4 = _0x1BAAE; _0x1B9F4 <= _0x2063E; _0x1B9F4++) {
                setsel(1, _0x1B9F4)
            }
        }
    }
    ;_0x24CB8 = document["getElementsByClassName"]("_" + _0x1BAAE + "_");
    if (_0x24CB8[0] && user["isScrollIntoView"] && user["clickNoteScrollIntoView"]) {
        _0x24CB8[0]["scrollIntoView"]()
    }
}
function getFirstSyms() {
    for (var _0x1B9F4 = 0, _0x1D191 = syms["length"]; _0x1B9F4 < _0x1D191; _0x1B9F4++) {
        if (syms[_0x1B9F4]) {
            return syms[_0x1B9F4]
        }
    }
    ;return
}
function saveas() {
    var _0x2696B = document["title"]["replace"]("\u7cfb\u7edf", "");
    var _0x1BAAE = srcidx == 0 ? "source" : "src1"
      , _0x24400 = elt_ref[_0x1BAAE]["value"]
      , _0x26A25 = "data:text/plain;charset=utf-8," + encryptText(_0x24400)
      , _0x2690E = document["createElement"]("a");
    var _0x269C8 = new RegExp("T:.*(?=\\n)");
    var _0x1E646 = _0x269C8["exec"](_0x24400);
    if (_0x1E646) {
        _0x2696B += "_" + _0x1E646[0]["replace"]("T:", "")["trim"]()
    }
    ;_0x2696B += ".xzds";
    elt_ref["s" + srcidx]["value"] = _0x2690E["download"] = abc_fname[srcidx] = _0x2696B;
    _0x2690E["innerHTML"] = "Hidden Link";
    _0x2690E["href"] = _0x26A25;
    _0x2690E["target"] = "_blank";
    _0x2690E["onclick"] = destroyClickedElement;
    _0x2690E["style"]["display"] = "none";
    document["body"]["appendChild"](_0x2690E);
    _0x2690E["click"]()
}
function destroyClickedElement(_0x2069B) {
    document["body"]["removeChild"](_0x2069B["target"])
}
function setfont() {
    var _0x21AF3 = document["getElementById"]("fontsize")["value"]["toString"]();
    elt_ref["source"]["style"]["fontSize"] = elt_ref["src1"]["style"]["fontSize"] = _0x21AF3 + "px";
    storage(true, "fontsz", _0x21AF3 == "14" ? 0 : _0x21AF3)
}
function set_sfu(_0x21A39) {
    play["abcplay"]["set_sfu"](_0x21A39);
    storage(true, "sfu", _0x21A39 == "Scc1t2" ? 0 : _0x21A39)
}
function set_speed(_0x26BF6) {
    var _0x26C53 = document["getElementById"]("spvl")
      , _0x21A39 = Math["pow"](3, (_0x26BF6 - 10) * 0.1);
    play["abcplay"]["set_speed"](_0x21A39);
    _0x26C53["innerHTML"] = _0x21A39
}
function set_vol(_0x21A39) {
    play["abcplay"]["set_vol"](_0x21A39);
    storage(true, "volume", _0x21A39 == 0.7 ? 0 : _0x21A39["toFixed"](2))
}
var cnt = 0
  , timeEnd = 0
  , currTime = 0;
var lastLightLine = -1;
var lastPage = -1;
var currPage = -1;
var nextPage = -1;
var isPageLeft = true;
function resetPageSeq() {
    if (pageSeq) {
        for (var _0x1B9F4 = 0; _0x1B9F4 < pageSeq["length"]; _0x1B9F4++) {
            pageSeq[_0x1B9F4]["pass"] = false
        }
    }
}
var pobj = new Object();
function notehlight(_0x1B9F4, _0x24F43, _0x25171, _0x24BFE, _0x251CE, _0x24D72, _0x250B7, _0x25114) {
    if (!pobj["abcStartTime"]) {
        pobj["abcStartTime"] = new Date()["getTime"]()
    }
    ;if (syms === undefined) {
        return
    }
    ;var _0x1CD92;
    if (_0x24BFE) {
        _0x1CD92 = syms[_0x24BFE]
    } else {
        _0x1CD92 = syms[_0x1B9F4]
    }
    ;if (_0x24F43 && user["syncRect"] == "single") {
        $(_0x251CE)["find"]("rect[acttime]")["css"]("fillOpacity", 0)
    }
    ;if (user["showsc"] && sc) {}
    ;if (typeof content_vue != "undefined") {
        if (content_vue["keyboardShow"]) {
            if (_0x1CD92 && _0x1CD92["notes"]) {
                for (var _0x1C5F1 = 0; _0x1C5F1 < _0x1CD92["notes"]["length"]; _0x1C5F1++) {
                    if (_0x24F43) {
                        var _0x24FFD = $("div[midiseq=\'" + _0x1CD92["notes"][_0x1C5F1]["midi"] + "\']")["attr"]("style");
                        _0x24FFD += "background:url(\'\') !important;" + "background-color:blue !important;";
                        $("div[midiseq=\'" + _0x1CD92["notes"][_0x1C5F1]["midi"] + "\']")["attr"]("style", _0x24FFD)
                    } else {
                        var _0x24FFD = $("div[midiseq=\'" + _0x1CD92["notes"][_0x1C5F1]["midi"] + "\']")["attr"]("style");
                        if (_0x24FFD) {
                            _0x24FFD = _0x24FFD["replace"]("background:url(\'\') !important;", "")["replace"]("background-color:blue !important;", "");
                            $("div[midiseq=\'" + _0x1CD92["notes"][_0x1C5F1]["midi"] + "\']")["attr"]("style", _0x24FFD)
                        }
                    }
                }
            }
        }
    }
    ;if (_0x24F43 && _0x1CD92 && _0x1CD92["hasOwnProperty"]("my_line") && (_0x1CD92["type"] == 10 || _0x1CD92["type"] == 8) && typeof pageSeq != "undefined" && user["pageSet"]["isLeftRight"]) {
        if (lastLightLine != _0x1CD92["my_line"]) {
            lastLightLine = _0x1CD92["my_line"];
            var _0x24E2C = user["pageSet"]["isLeftRight"];
            for (var _0x1E5E9 = 0, _0x1D191 = pageSeq["length"]; _0x1E5E9 < _0x1D191; _0x1E5E9++) {
                var _0x2505A = pageSeq[_0x1E5E9];
                if (_0x1E5E9 == 0) {
                    isPageLeft = true
                } else {
                    if (_0x2505A["pn"] != pageSeq[_0x1E5E9 - 1]["pn"]) {
                        isPageLeft = !isPageLeft
                    }
                }
                ;if (_0x2505A["line"] == _0x1CD92["my_line"] && _0x2505A["pass"] == false) {
                    _0x2505A["pass"] = true;
                    if (currPage == _0x2505A["pn"]) {
                        break
                    }
                    ;$(".pagediv")["css"]({
                        "opacity": "0",
                        "position": "absolute"
                    });
                    var $currPage = $("#page" + _0x2505A["pn"]);
                    $currPage["css"]("display", _0x24E2C ? "inline-block" : "block");
                    if (_0x24E2C) {
                        $("#target")["css"]("position", "relative");
                        $currPage["css"]({
                            'position': "absolute",
                            'top': 0,
                            'left': isPageLeft ? 0 : "50%",
                            'opacity': 1,
                            'transition': "opacity 1s"
                        })
                    }
                    ;currPage = _0x2505A["pn"];
                    nextPage = null;
                    if (_0x24E2C) {
                        for (var _0x1B880 = _0x1E5E9 + 1, _0x1D191 = pageSeq["length"]; _0x1B880 < _0x1D191; _0x1B880++) {
                            if (pageSeq[_0x1B880]["pn"] != currPage) {
                                nextPage = pageSeq[_0x1B880]["pn"];
                                break
                            }
                        }
                    } else {
                        nextPage = pageSeq[_0x1E5E9 + 1] && pageSeq[_0x1E5E9 + 1]["pn"]
                    }
                    ;if (nextPage) {
                        var $nextPage = $("#page" + nextPage);
                        $nextPage["css"]("display", _0x24E2C ? "inline-block" : "block");
                        if (_0x24E2C) {
                            $nextPage["css"]({
                                'position': "absolute",
                                'top': 0,
                                'left': !isPageLeft ? 0 : "50%",
                                'opacity': 1,
                                'transition': "opacity 1s"
                            })
                        }
                        ;console["log"](_0x2505A, $nextPage);
                        break
                    } else {
                        $("#page" + pageSeq[_0x1E5E9 - 1]["pn"])["css"]({
                            'position': "absolute",
                            'top': 0,
                            'left': !isPageLeft ? 0 : "50%",
                            'opacity': 1,
                            'transition': "opacity 1s"
                        })
                    }
                }
            }
        }
    }
    ;var _0x24FA0 = _0x1B9F4;
    if (_0x24BFE !== undefined) {
        _0x24FA0 = _0x24BFE
    }
    ;if (user["showInstrLoading"]) {
        $(".loading,.loading-box")["remove"]()
    }
    ;if ($("#countdown")["length"] > 0 && user["delay"]["time"] > _0x25171 && _0x1B9F4 == -1) {
        if (_0x24F43) {
            $("#countdown")["show"]()
        }
        ;if (!_0x24F43) {
            var _0x24B44 = parseInt($("#countdown")["html"]());
            _0x24B44--;
            $("#countdown")["html"](_0x24B44);
            if (_0x24B44 < 1) {
                $("#countdown")["hide"]()
            }
            ;console["log"]("countdown====", _0x1CD92)
        }
    }
    ;if (user["errorcheck"] && user["errorcheckStartTime"] == -1 && _0x24F43) {
        user["errorcheckStartTime"] = (new Date)["getTime"]()
    }
    ;laststop = _0x24FA0;
    laststopPt = _0x25171;
    if (play["stop"]) {
        if (_0x24F43) {
            if (play["stop"] < 0) {
                play["stop"] = _0x24FA0;
                play["pt"] = _0x25171
            }
            ;return
        }
        ;if (_0x1B9F4 == selx[1]) {
            return
        }
    }
    ;if (cnt == 0) {
        timeEnd = new Date()["getTime"]()
    }
    ;if (_0x24F43 && user["syncRect"] == "single") {
        if (cnt > 0) {
            currTime = new Date()["getTime"]()
        }
    }
    ;if (user["syncRect"] == "single") {}
    ;cnt++;
    var _0x24CB8, _0x24BA1;
    if (user["syncRect"]) {
        if (/^\d+/["test"](_0x1B9F4)) {
            _0x24CB8 = document["getElementsByClassName"](_0x1B9F4)
        } else {
            if (_0x1B9F4 != -1) {
                if (_0x251CE !== undefined) {
                    _0x24CB8 = $(_0x251CE)["find"]("." + _0x1B9F4)
                } else {
                    _0x24CB8 = document["querySelectorAll"]("." + _0x1B9F4)
                }
            } else {
                _0x24CB8 = new Array()
            }
        }
    } else {
        if (_0x251CE !== undefined) {
            _0x24CB8 = $(_0x251CE)["find"]("._" + _0x1B9F4 + "_")
        } else {
            _0x24CB8 = document["getElementsByClassName"]("_" + _0x1B9F4 + "_")
        }
    }
    ;var _0x24D15 = _0x24CB8["length"];
    if ((animation && !user["isOnlyNoteLight"]) || (user["syncRect"] == "single" && (currTime - timeEnd) > 100)) {
        if (_0x24D15 > 0) {
            if (musicType == 1 || musicType == 2) {
                for (var _0x1BD96 = 0; _0x1BD96 < _0x24CB8["length"]; _0x1BD96++) {
                    _0x24BA1 = _0x24CB8[_0x1BD96];
                    if (!play["stop"]) {
                        if (_0x24BA1["tagName"] === "rect") {
                            if (_0x24F43) {
                                if (!_0x24D72) {
                                    _0x24BA1["style"]["fillOpacity"] = 0.4
                                }
                            } else {
                                _0x24BA1["style"]["fillOpacity"] = 0
                            }
                        }
                    }
                    ;if (_0x24F43) {
                        _0x24BA1["classList"]["add"]("note-light")
                    } else {
                        _0x24BA1["classList"]["remove"]("note-light")
                    }
                }
            } else {
                _0x24BA1 = _0x24CB8[0];
                if (!play["stop"]) {
                    if (_0x24BA1["tagName"] === "rect") {
                        if (_0x24F43) {
                            if (!_0x24D72) {
                                _0x24BA1["style"]["fillOpacity"] = 0.4
                            }
                        } else {
                            _0x24BA1["style"]["fillOpacity"] = 0
                        }
                    }
                }
                ;if (_0x24F43) {
                    _0x24BA1["classList"]["add"]("note-light")
                } else {
                    _0x24BA1["classList"]["remove"]("note-light")
                }
            }
        }
    }
    ;timeEnd = currTime;
    if (user["isScrollIntoView"] && !user["pageSet"]["isLeftRight"] && _0x24F43 && _0x24D15 > 0) {
        _0x24BA1 = _0x24CB8[0];
        var _0x24D72 = {
            behavior: "auto",
            block: "start",
            inline: "nearest"
        };
        var _0x24E89 = user["prevJump"]["isOpen"] ? false : true;
        if (user["loopJump"]["isOpen"] && user["loopJump"]["time"] > 0 && user["loopJump"]["jump"] && user["loopJump"]["jump"]["length"] > 0) {
            if ((_0x25171 >= user["loopJump"]["jump"][0]["jumpTime"] && _0x25171 - user["loopJump"]["jump"][0]["jumpTime"] < 4) || _0x24FA0 == user["loopJump"]["jump"][0]["jumpSeq"]) {
                var _0x25459 = document["getElementsByClassName"]("_" + user["loopJump"]["jump"][0]["jumpToSeq"] + "_");
                if (_0x25459["length"] > 0) {
                    _0x24BA1 = _0x25459[0];
                    user["loopJump"]["jump"][0]["isJump"] = true;
                    _0x24E89 = true
                }
            }
            ;if ((user["loopJump"]["jump"][0]["isJump"] && _0x24FA0 == user["loopJump"]["jump"][0]["jumpToSeq"]) || _0x25171 - user["loopJump"]["jump"][0]["jumpTime"] > 4) {
                user["loopJump"]["jump"]["splice"](0, 1);
                if (user["errorcheck"]) {
                    $("svg text")["removeClass"]("errcheck-red errcheck-yellow errcheck-green")
                }
            }
        }
        ;var _0x25288 = _0x24BA1["parentNode"];
        if (_0x25288["parentNode"] && _0x25288["tagName"]["toUpperCase"]() == "G") {
            _0x25288 = _0x25288["parentNode"]
        }
        ;if (_0x25288["parentNode"] && _0x25288["tagName"]["toUpperCase"]() != "SVG") {
            _0x25288 = _0x25288["parentNode"]
        }
        ;if (user["prevJump"]["isOpen"] && user["prevJump"]["jump"][_0x24FA0]) {
            _0x24E89 = true;
            _0x25288 = _0x25288["nextElementSibling"];
            _0x24D72["behavior"] = "smooth";
            _0x24D72["block"] = "center"
        }
        ;if (user["prevJump"]["isOpen"] && user["prevJump"]["lastSvgNode"] != _0x25288) {
            if (user["prevJump"]["lastSvgNode"] && user["prevJump"]["lastSvgNode"]["nextElementSibling"] != _0x25288) {
                _0x24D72["behavior"] = "auto"
            }
            ;user["prevJump"]["lastSvgNode"] = _0x25288
        } else {
            if (user["prevJump"]["isOpen"] && user["prevJump"]["lastSvgNode"] == _0x25288) {
                _0x24E89 = false
            }
        }
        ;if (_0x24E89 && _0x25288) {
            var _0x254B6 = window["innerHeight"] || document["documentElement"]["clientHeight"] || document["body"]["offsetHeight"];
            if (_0x254B6 < _0x25288["height"]["animVal"]["value"] + 50) {
                _0x24D72["block"] = "end"
            }
            ;if (user["isSmoothScrolling"]) {
                var _0x25342 = $(_0x25288)["index"]();
                if (_0x25342 >= 0 && user["currScrollIndex"] != _0x25342) {
                    if (!user["$drightObj"]) {
                        user["$drightObj"] = $("#dright")
                    }
                    ;user["$musicSvg"] = $(".music:eq(" + _0x25342 + ")")[0];
                    const {top, height} = user["$musicSvg"]["getBoundingClientRect"]();
                    user["svgScrollTop"] = user["$drightObj"][0]["scrollTop"] - (((window["innerHeight"] - $(".sing-tool-box")["outerHeight"]()) / 2) - (top + height / 2));
                    if (user["svgScrollTop"] > height) {
                        user["$drightObj"]["stop"](true, true)["animate"]({
                            scrollTop: user["svgScrollTop"]
                        }, 800)
                    }
                    ;user["currScrollIndex"] = _0x25342
                }
            } else {
                _0x25288["scrollIntoView"](_0x24D72)
            }
        }
    }
    ;if (user["horizontal"]["open"]) {
        if (_0x24FA0 > 0 && _0x24F43 && syms[_0x24FA0] && !syms[_0x24FA0]["grace"]) {
            var $note = $("._" + _0x24FA0 + "_");
            var _0x25513 = $("#target")["width"]();
            var _0x24EE6 = $note["eq"](0)["attr"]("x") * scale - $(user["horizontal"]["scrollClass"])["scrollLeft"]();
            var _0x24DCF = true;
            user["horizontal"]["isDoOffset"] = true;
            if (_0x24EE6 || _0x24EE6 === 0) {
                if (_0x24EE6 < 0) {
                    if (user["horizontal"]["canNoAniScroll"]) {
                        user["horizontal"]["canScroll"] = true;
                        user["horizontal"]["lastOffsetLeft"] = user["horizontal"]["lastOffsetLeft"] + _0x24EE6 - _0x25513 / 2
                    }
                    ;_0x24DCF = false
                } else {
                    if ($(user["horizontal"]["scrollClass"])["scrollLeft"]() + (_0x24EE6 - _0x25513 / 2) < user["horizontal"]["lastOffsetLeft"]) {
                        user["horizontal"]["isDoOffset"] = false
                    } else {
                        user["horizontal"]["lastOffsetLeft"] = $(user["horizontal"]["scrollClass"])["scrollLeft"]() + (_0x24EE6 - _0x25513 / 2) + _0x25513 / 5
                    }
                }
                ;if (user["horizontal"]["isDoOffset"] && user["horizontal"]["canScroll"]) {
                    $(user["horizontal"]["scrollClass"])["stop"]()["animate"]({
                        scrollLeft: user["horizontal"]["lastOffsetLeft"] + "px"
                    }, _0x24DCF ? 1000 : 0);
                    if (user["scCanvasMove"]) {
                        if ($(".scrolldemo")["length"] == 0) {
                            var _0x2539F = $(".music")["width"]();
                            var _0x2522B = "<div class=\'scrolldemo\' style=\'width: 100%; overflow: auto; box-sizing: border-box; margin-left: 0px;height:0.1px;\'></div>";
                            $(user["horizontal"]["scrollClass"])["parent"]()["append"]($(_0x2522B));
                            var _0x24C5B = "<div class=\'demosub\' style=\'width:" + _0x2539F + "px;height:0.1px;\'></div>";
                            $(".scrolldemo")["append"](_0x24C5B)
                        }
                        ;var _0x24AE7 = $(".scrolldemo")["scrollLeft"]();
                        $(".scrolldemo")["scrollLeft"](user["horizontal"]["lastOffsetLeft"]);
                        var _0x24A8A = $(".scrolldemo")["scrollLeft"]();
                        var _0x252E5 = _0x24A8A - _0x24AE7;
                        if (user["horizontal"]["lastCanvasLeft"] > user["horizontal"]["lastOffsetLeft"]) {
                            user["horizontal"]["backSize"] += parseInt(user["horizontal"]["lastCanvasLeft"]) - parseInt(user["horizontal"]["lastOffsetLeft"])
                        }
                        ;$(".freq-box-ri")["each"](function() {
                            console["log"]("user.horizontal.canScroll:", user["horizontal"]["canScroll"]);
                            if (!user["horizontal"]["lastCanvasLeft"] != user["horizontal"]["lastOffsetLeft"] && user["horizontal"]["isDoOffset"]) {
                                var _0x255CD = (-user["horizontal"]["lastOffsetLeft"] - user["horizontal"]["backSize"]);
                                var _0x25570 = $(this)["scrollLeft"]() + _0x252E5;
                                $(this)["stop"]()["animate"]({
                                    scrollLeft: _0x25570 + "px"
                                }, 1000)
                            }
                        });
                        user["horizontal"]["lastCanvasLeft"] = user["horizontal"]["lastOffsetLeft"]
                    }
                    ;user["horizontal"]["canScroll"] = false;
                    if (!_0x24DCF) {
                        user["horizontal"]["canNoAniScroll"] = false;
                        setTimeout(function() {
                            user["horizontal"]["canNoAniScroll"] = true
                        })
                    }
                    ;setTimeout(function() {
                        user["horizontal"]["canScroll"] = true
                    }, 1000)
                }
            }
        }
    }
    ;if (user["notehlightCball"]) {
        typeof (user["notehlightCball"]) == "function" && user["notehlightCball"](_0x24FA0, _0x24F43, _0x25171, _0x24BA1, _0x250B7)
    }
}
function endplay() {
    if (play["loop"]) {
        play["abcplay"]["play"](play["si"], play["ei"], play["a_pe"]);
        return
    }
    ;if (user["syncRect"] == "single") {
        $(".abcr")["css"]({
            'fill-opacity': 0
        })
    }
    ;play["playing"] = false;
    try {
        endplaycallbck()
    } catch (e) {}
    ;if (user["endplayCball"]) {
        user["endplayCball"]()
    }
    ;user["horizontal"]["lastOffsetLeft"] = 0;
    if (user["pageSet"]["isLeftRight"]) {
        $(".pagediv")["css"]({
            'transition': "null"
        });
        currPage = -1;
        nextPage = -1;
        lastLightLine = -1
    }
    ;if (user["isSmoothScrolling"]) {
        document["getElementById"]("dright")["scrollTop"] = 0;
        user["currScrollIndex"] = 0;
        user["$drightObj"] = null
    }
}
function play_stop() {
    if (play["playing"]) {
        if (!play["stop"]) {
            play["stop"] = -1;
            play["abcplay"]["stop"]()
        }
        ;return
    }
}
function play_one(_0x23C02) {
    if (user["abcPlayWay"] != null) {
        var _0x24FFD = play["abcplay"]["get_outputs"]();
        if (_0x24FFD && _0x24FFD["length"] > 1) {
            play["abcplay"]["set_output"](_0x24FFD[user["abcPlayWay"]])
        } else {
            play["abcplay"]["set_output"](_0x24FFD[0])
        }
    }
    ;set_vol(global_volume);
    play["abcplay"]["play"](0, 1, _0x23C02)
}
function play_arr(_0x20527) {
    var _0x256E4 = new Array();
    var _0x2579E = 0;
    for (var _0x1B9F4 = 0; _0x1B9F4 < _0x20527["length"]; _0x1B9F4++) {
        var _0x25741 = new Float32Array(7);
        _0x25741[0] = _0x20527[_0x1B9F4][0];
        _0x25741[1] = _0x20527[_0x1B9F4][1];
        _0x25741[2] = _0x20527[_0x1B9F4][2];
        _0x25741[3] = _0x20527[_0x1B9F4][3];
        _0x25741[4] = _0x20527[_0x1B9F4][4];
        _0x25741[5] = _0x20527[_0x1B9F4][5];
        _0x25741[6] = _0x20527[_0x1B9F4][6];
        _0x256E4["push"](_0x25741)
    }
    ;play["abcplay"]["play"](0, _0x256E4["length"], _0x256E4)
}
function playGloAE(_0x25D11) {
    if (glo_a_e == null) {
        getGloAE()
    }
    ;for (var _0x1B9F4 = 0; _0x1B9F4 < glo_a_e["length"]; _0x1B9F4++) {
        glo_a_e[_0x1B9F4][3] += _0x25D11
    }
    ;play["abcplay"]["play"](0, glo_a_e["length"], glo_a_e)
}
function disableVoiceVolByV(_0x206F8) {
    if (glo_a_e != null) {
        for (var _0x1B9F4 = 0; _0x1B9F4 < glo_a_e["length"]; _0x1B9F4++) {
            if (_0x206F8["indexOf"](glo_a_e[_0x1B9F4][6]) > -1) {
                glo_a_e[_0x1B9F4][5] = 0
            }
        }
    }
}
function resetIndex(_0x26455) {
    if (_0x26455 == 0) {
        return
    }
    ;if (glo_a_e != null) {
        for (var _0x1B9F4 = 0; _0x1B9F4 < glo_a_e["length"]; _0x1B9F4++) {
            glo_a_e[_0x1B9F4][0] += _0x26455
        }
    }
}
function resetIndexPlus(_0x268B1) {
    var _0x236EC = getNoteData();
    if (glo_a_e != null && _0x236EC) {
        var _0x2673D = 0, currTime = -1, _0x267F7, _0x26683 = -1, _0x266E0;
        var _0x2650F;
        for (var _0x1B9F4 = 0, _0x265C9 = glo_a_e["length"]; _0x1B9F4 < _0x265C9; _0x1B9F4++) {
            _0x2650F = glo_a_e[_0x1B9F4];
            if (_0x2650F[0] == -1) {
                continue
            }
            ;if (_0x268B1 && _0x268B1["length"] > 0) {
                if (_0x268B1["indexOf"](_0x2650F[6]) <= -1) {
                    _0x2650F[0] = 0;
                    continue
                }
            }
            ;for (var _0x1D0D7 = _0x2673D, _0x26626 = _0x236EC["length"]; _0x1D0D7 < _0x26626; _0x1D0D7++) {
                _0x267F7 = _0x236EC[_0x1D0D7];
                if (_0x267F7[0] == -1) {
                    continue
                }
                ;var _0x2656C = _0x2650F[1]["toFixed"](2);
                _0x2656C = _0x2656C["substring"](0, _0x2656C["length"] - 1);
                var _0x264B2 = _0x2650F[4]["toFixed"](2);
                _0x264B2 = _0x264B2["substring"](0, _0x264B2["length"] - 1);
                var _0x26854 = _0x267F7[1]["toFixed"](2);
                _0x26854 = _0x26854["substring"](0, _0x26854["length"] - 1);
                var _0x2679A = _0x267F7[4]["toFixed"](2);
                _0x2679A = _0x2679A["substring"](0, _0x2679A["length"] - 1);
                if (_0x2650F[0] != -1 && _0x2656C == _0x26854 && (_0x2650F[3] == _0x267F7[3] || Math["abs"](_0x2650F[3] - _0x267F7[3]) == 12) && _0x264B2 == _0x2679A) {
                    if (_0x1D0D7 < _0x26683 || _0x1D0D7 == _0x26683 && _0x2650F[6] != _0x266E0) {
                        continue
                    }
                    ;glo_a_e[_0x1B9F4][0] = _0x267F7[0];
                    _0x26683 = _0x1D0D7;
                    _0x266E0 = _0x2650F[6];
                    break
                } else {
                    if (_0x2650F[0] != -1 && _0x2656C == _0x26854) {
                        glo_a_e[_0x1B9F4][0] = 0
                    } else {
                        if (_0x2656C - 0 < _0x26854 - 0) {
                            break
                        }
                    }
                }
            }
        }
    }
}
function replaceHtml(_0x26284, _0x262E1) {
    var _0x2639B = typeof _0x26284 === "string" ? document["getElementById"](_0x26284) : _0x26284;
    var _0x2633E = _0x2639B["cloneNode"](false);
    _0x2633E["innerHTML"] = _0x262E1;
    _0x2639B["parentNode"]["replaceChild"](_0x2633E, _0x2639B);
    return _0x2633E
}
function resetAllVoiceVol() {
    glo_a_e = JSON["parse"](JSON["stringify"](init_glo_a_e))
}
function play_tune(_0x25A86) {
    if (play["playing"]) {
        if (!play["stop"]) {
            play["stop"] = -1;
            play["abcplay"]["stop"]()
        }
        ;return
    } else {
        $(".abcr")["css"]("fill-opacity", 0)
    }
    ;function _0x25912(_0x259CC) {
        var _0x25B9D = play["a_pe"];
        for (_0x1B9F4 = 0; _0x1B9F4 < _0x25B9D["length"]; _0x1B9F4++) {
            _0x1BAAE = _0x25B9D[_0x1B9F4][0];
            if (_0x259CC == _0x1BAAE) {
                return _0x1B9F4
            }
        }
    }
    function _0x258B5(_0x259CC, _0x25171) {
        var _0x1B9F4, _0x1BAAE, _0x25A29, _0x25CB4 = 1e6, _0x25B9D = play["a_pe"], _0x25AE3 = 0, _0x25C57;
        _0x1B9F4 = _0x25B9D["length"];
        while (--_0x1B9F4 > 0) {
            _0x1BAAE = _0x25B9D[_0x1B9F4][0];
            _0x25C57 = _0x25B9D[_0x1B9F4][1];
            if (_0x1BAAE < _0x259CC) {
                continue
            }
            ;if (_0x1BAAE == _0x259CC && _0x25C57 == _0x25171) {
                _0x25AE3 = _0x1B9F4;
                break
            }
            ;if (_0x1BAAE < _0x25CB4) {
                _0x25AE3 = _0x1B9F4;
                _0x25CB4 = _0x1BAAE
            }
        }
        ;if (_0x25AE3 < _0x25B9D["length"]) {
            _0x25A29 = _0x25B9D[_0x25AE3][1];
            while (--_0x25AE3 >= 0) {
                if (_0x25B9D[_0x25AE3][1] != _0x25A29) {
                    break
                }
            }
        }
        ;return _0x25AE3 + 1
    }
    function _0x25858(_0x259CC) {
        var _0x1B9F4, _0x1BAAE, _0x25A29, _0x25BFA = 0, _0x25B9D = play["a_pe"], _0x25AE3 = 0;
        if (_0x259CC <= _0x25B9D[0][0]) {
            return 0
        }
        ;var _0x25B40 = _0x25B9D[_0x25B9D["length"] - 1][0];
        for (var _0x1B9F4 = 0; _0x1B9F4 < _0x25B9D["length"]; _0x1B9F4++) {
            if (_0x25B40 < _0x25B9D[_0x1B9F4][0]) {
                _0x25B40 = _0x25B9D[_0x1B9F4][0]
            }
        }
        ;if (_0x259CC >= _0x25B40) {
            return _0x25B9D["length"]
        }
        ;for (_0x1B9F4 = 0; _0x1B9F4 < _0x25B9D["length"]; _0x1B9F4++) {
            _0x1BAAE = _0x25B9D[_0x1B9F4][0];
            if (_0x1BAAE > _0x259CC) {
                continue
            }
            ;if (_0x1BAAE == _0x259CC) {
                _0x25AE3 = _0x1B9F4;
                break
            }
            ;if (_0x1BAAE > _0x25BFA) {
                _0x25AE3 = _0x1B9F4;
                _0x25BFA = _0x1BAAE
            }
        }
        ;if (_0x25AE3 > 0) {
            _0x25A29 = _0x25B9D[_0x25AE3++][1];
            for (; _0x25AE3 < _0x25B9D["length"]; _0x25AE3++) {
                if (_0x25B9D[_0x25AE3][1] != _0x25A29) {
                    break
                }
            }
        }
        ;return _0x25AE3
    }
    function _0x2596F(_0x259CC, _0x257FB) {
        pobj["playStartTime"] = new Date()["getTime"]();
        selx_sav[0] = selx[0];
        selx_sav[1] = selx[1];
        setsel(0, 0);
        setsel(1, 0);
        play["stop"] = 0;
        if (user["abcPlayWay"] != null) {
            var _0x24FFD = play["abcplay"]["get_outputs"]();
            if (_0x24FFD && _0x24FFD["length"] > 1) {
                play["abcplay"]["set_output"](_0x24FFD[user["abcPlayWay"]])
            } else {
                play["abcplay"]["set_output"](_0x24FFD[0])
            }
        }
        ;play["abcplay"]["play"](_0x259CC, _0x257FB, play["a_pe"])
    }
    var abc, _0x1B9F4, _0x259CC, _0x257FB, _0x2197F, _0x25A29, _0x1BAAE = $("#source")["val"](), _0x21922 = document["getElementById"]("ctxMenu");
    _0x21922["style"]["display"] = "none";
    play["playing"] = true;
    getBeatAndSpeed(_0x1BAAE, function(_0x23062, _0x2334A) {
        user["oneBeatTime"] = _0x2334A
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
            abc["tosvg"](abc_fname[0], _0x1BAAE)
        } catch (e) {
            window["top"]["alert"](e["message"] + "\x0Aabc2svg tosvg bug - stack:\x0A" + e["stack"]);
            play["playing"] = false;
            play["a_pe"] = null;
            return
        }
        ;play["a_pe"] = play["abcplay"]["clear"]();
        play["si"] = play["ei"] = play["stop"] = 0;
        play["loop"] = false
    }
    ;if (_0x25A86 < 0) {
        initVol = 1;
        splitVol = 0;
        play["loop"] = false;
        play["si"] = 0;
        if (play["a_pe"] == null) {
            window["top"]["alert"]("\u8c31\u5b50\u5185\u5bb9\u4e3a\u7a7a");
            return
        }
        ;play["ei"] = play["a_pe"]["length"];
        _0x2596F(play["si"], play["ei"]);
        return
    }
    ;if (_0x25A86 == 2 && play["loop"]) {
        _0x2596F(play["si"], play["ei"]);
        return
    }
    ;if (_0x25A86 == 3) {
        if (play["stop"] > 0) {
            _0x2596F(_0x258B5(play["stop"], play["pt"]), play["ei"])
        } else {
            if (play["ei"] == 0) {
                _0x2596F(_0x258B5(laststop, laststopPt), play["a_pe"]["length"])
            } else {
                _0x2596F(_0x258B5(laststop, laststopPt), play["ei"])
            }
        }
        ;return
    }
    ;if (_0x25A86 == 4) {
        _0x259CC = _0x25912(selx[0]);
        _0x257FB = _0x25858(selx[1]);
        if (_0x259CC == play["a_pe"]["length"]) {
            _0x259CC = _0x259CC - 1
        }
        ;if (_0x257FB == 0) {
            _0x257FB = _0x259CC + 1
        }
        ;_0x2596F(_0x259CC, _0x257FB);
        return
    }
    ;if (_0x25A86 != 0 && selx[0] && selx[1]) {
        _0x259CC = _0x258B5(selx[0]);
        _0x257FB = _0x25858(selx[1])
    } else {
        if (_0x25A86 != 0 && selx[0]) {
            _0x259CC = _0x258B5(selx[0]);
            _0x1B9F4 = _0x1BAAE["indexOf"]("\x0AX:", selx[0]);
            _0x257FB = _0x1B9F4 < 0 ? play["a_pe"]["length"] : _0x25858(_0x1B9F4)
        } else {
            if (_0x25A86 != 0 && selx[1]) {
                _0x1B9F4 = _0x1BAAE["lastIndexOf"]("\x0AX:", selx[1]);
                _0x259CC = _0x1B9F4 < 0 ? 0 : _0x258B5(_0x1B9F4);
                _0x257FB = _0x25858(selx[1])
            } else {
                _0x1B9F4 = _0x2197F ? Number(_0x2197F[0]["getAttribute"]("class")["slice"](6, -1)) : 0;
                _0x259CC = _0x257FB = 0;
                if (_0x1BAAE[0] == "X" && _0x1BAAE[1] == ":") {
                    _0x259CC = 1
                }
                ;while (1) {
                    _0x257FB = _0x1BAAE["indexOf"]("\x0AX:", _0x257FB);
                    if (_0x257FB < 0 || _0x257FB > _0x1B9F4) {
                        break
                    }
                    ;_0x259CC = _0x1BAAE["indexOf"]("\x0AK:", ++_0x257FB);
                    if (_0x259CC < 0) {
                        break
                    }
                    ;_0x257FB = _0x259CC
                }
                ;if (_0x259CC <= 0) {
                    play["playing"] = false;
                    return
                }
                ;_0x259CC = _0x258B5(_0x259CC);
                _0x257FB = _0x257FB < 0 ? play["a_pe"]["length"] : _0x25858(_0x257FB)
            }
        }
    }
    ;if (_0x25A86 != 3) {
        play["si"] = _0x259CC;
        play["ei"] = _0x257FB;
        play["loop"] = _0x25A86 == 2
    }
    ;_0x2596F(_0x259CC, _0x257FB)
}
function edit_init() {
    if (typeof abc2svg != "object" || !abc2svg["modules"]) {
        setTimeout(edit_init, 500);
        return
    }
    ;abc2svg["loadjs"] = function(_0x1B7C6, _0x2180B, _0x217AE) {
        if (!/:\/\//["test"](_0x1B7C6) && !jsdir) {
            setTimeout(function() {
                abc2svg["loadjs"](_0x1B7C6, _0x2180B, _0x217AE)
            }, 50);
            return
        }
        ;try {
            var _0x21868 = document["getElementsByTagName"]("script");
            for (var _0x1B9F4 in _0x21868) {
                if (_0x21868[_0x1B9F4] && _0x21868[_0x1B9F4]["src"] && _0x21868[_0x1B9F4]["src"]["indexOf"](_0x1B7C6) > -1) {
                    return typeof (_0x2180B) == "function" && _0x2180B()
                }
            }
        } catch (_0x2063E) {
            return typeof (_0x217AE) == "function" && _0x217AE(_0x2063E)
        }
        ;if (_0x1B7C6["indexOf"]("222.js") > -1) {
            return true
        }
        ;var _0x1BAAE = document["createElement"]("script");
        if (/:\/\//["test"](_0x1B7C6)) {
            _0x1BAAE["src"] = _0x1B7C6
        } else {
            _0x1BAAE["src"] = jsdir + _0x1B7C6
        }
        ;_0x1BAAE["type"] = "text/javascript";
        if (_0x2180B) {
            _0x1BAAE["onload"] = _0x2180B
        }
        ;_0x1BAAE["onerror"] = _0x217AE || function() {
            window["top"]["alert"]("error loading " + _0x1B7C6)
        }
        ;
        document["head"]["appendChild"](_0x1BAAE)
    }
    ;
    abc2svg["abc_end"] = function() {}
    ;
    function _0x21751() {
        var _0x21A39 = storage(true, "fontsz");
        if (_0x21A39) {
            elt_ref["source"]["style"]["fontSize"] = elt_ref["src1"]["style"]["fontSize"] = _0x21A39 + "px";
            document["getElementById"]("fontsize")["value"] = Number(_0x21A39)
        }
        ;_0x21A39 = storage(true, "lang");
        if (_0x21A39) {
            loadlang(_0x21A39, true)
        }
    }
    var _0x1CC1E = ["diverr", "source", "src1", "s0", "s1", "target"];
    for (var _0x1B9F4 = 0; _0x1B9F4 < _0x1CC1E["length"]; _0x1B9F4++) {
        var _0x2063E = _0x1CC1E[_0x1B9F4];
        elt_ref[_0x2063E] = document["getElementById"](_0x2063E)
    }
    ;var _0x216F4 = document["getElementById"]("saveas");
    if (_0x216F4 != null) {
        _0x216F4["onclick"] = saveas
    }
    ;if (elt_ref["s0"] != null) {
        elt_ref["s0"]["onclick"] = function() {
            selsrc(0)
        }
    }
    ;if (elt_ref["s1"] != null) {
        elt_ref["s1"]["onclick"] = function() {
            selsrc(1)
        }
    }
    ;if (!elt_ref["target"]) {
        return
    }
    ;elt_ref["target"]["onclick"] = svgsel;
    elt_ref["target"]["onmousedown"] = svgMouseDown;
    elt_ref["target"]["onmousemove"] = svgMouseMove;
    elt_ref["target"]["onmouseup"] = svgMouseUp;
    elt_ref["target"]["ontouchstart"] = svgMouseDown;
    elt_ref["target"]["ontouchmove"] = svgMouseMove;
    elt_ref["target"]["ontouchend"] = svgMouseUp;
    elt_ref["source"]["onselect"] = seltxt;
    window["onbeforeprint"] = function() {
        selx_sav[0] = selx[0];
        selx_sav[1] = selx[1];
        setsel(0, 0);
        setsel(1, 0)
    }
    ;
    window["onafterprint"] = function() {
        setsel(0, selx_sav[0]);
        setsel(1, selx_sav[1])
    }
    ;
    abc2svg["loadjs"]("ixzds-plus.js", loadJsSuccess);
    dynLoadJsNum++;
    abc2svg["loadjs"]("util2.js", loadJsSuccess);
    dynLoadJsNum++;
    abc2svg["loadjs"]("drawpath.js", loadJsSuccess);
    dynLoadJsNum++;
    if (window["AudioContext"] || window["webkitAudioContext"] || navigator["requestMIDIAccess"] || window["msAudioContext"] || window["mozAudioContext"]) {
        var _0x2163A = false;
        var _0x21697 = document["querySelectorAll"]("script");
        for (var _0x1B9F4 = 0; _0x1B9F4 < _0x21697["length"]; _0x1B9F4++) {
            if (_0x21697[_0x1B9F4]["src"]["indexOf"]("play-1") != -1) {
                _0x2163A = true;
                break
            }
        }
        ;if (_0x2163A) {
            play["abcplay"] = AbcPlay({
                onend: endplay,
                onnote: notehlight
            })
        } else {
            abc2svg["loadjs"]("play-1.js?v=1.1", function() {
                play["abcplay"] = AbcPlay({
                    onend: endplay,
                    onnote: notehlight
                })
            })
        }
        ;if (user["isOncontextmenu"]) {
            var _0x2063E = elt_ref["target"];
            _0x2063E["oncontextmenu"] = function(_0x2069B) {
                if (document["getElementById"]("selectdiv") != null) {
                    document["getElementById"]("selectdiv")["style"]["display"] = "none"
                }
                ;var _0x1BD96, _0x1BDF3, _0x2197F = _0x2069B["target"], _0x218C5 = _0x2197F["getAttribute"]("class");
                _0x2069B["stopImmediatePropagation"]();
                _0x2069B["preventDefault"]();
                if (_0x218C5 && _0x218C5["substr"](0, 4) == "abcr") {
                    setsel(1, Number(getAbcistart(_0x218C5)))
                }
                ;while (_0x2197F["tagName"] && _0x2197F["tagName"] != "svg") {
                    _0x2197F = _0x2197F["parentNode"]
                }
                ;play["svg"] = _0x2197F;
                var _0x21922 = document["getElementById"]("ctxMenu");
                _0x21922["style"]["display"] = "block";
                _0x1BD96 = _0x2069B["pageX"] + elt_ref["target"]["parentNode"]["scrollLeft"];
                _0x1BDF3 = _0x2069B["pageY"];
                _0x21922["style"]["left"] = _0x1BD96 + 5 + "px";
                _0x21922["style"]["top"] = _0x1BDF3 + 20 + "px";
                var _0x1C24F = $(_0x2069B["target"])["attr"]("istart");
                $(_0x21922)["attr"]("istart", _0x1C24F);
                if (_0x1C24F) {
                    if ($(".selected_text")["length"] == 0) {
                        var _0x219DC = $("text[type*=\'HD\'][istart=\'" + _0x1C24F + "\'],text[type^=\'r\'][istart=\'" + _0x1C24F + "\']")["addClass"]("selected_text")
                    }
                    ;$("rect[istart=\'" + _0x1C24F + "\']")["css"]("fill-opacity", "0")
                }
                ;if ($(".selected_text")["length"] > 0) {
                    $(".noterelli")["show"]()
                } else {
                    $(".noterelli")["hide"]()
                }
                ;return false
            }
        }
    }
    ;_0x21751()
}
function getAbcistart(_0x218C5) {
    if (_0x218C5 != null) {
        var _0x22EEE = _0x218C5["match"](/[0-9]+/g);
        if (!_0x22EEE) {
            return 0
        }
        ;return _0x22EEE[0]
    }
}
function drag_over(_0x2069B) {
    _0x2069B["stopImmediatePropagation"]();
    _0x2069B["preventDefault"]()
}
function dropped(_0x2069B) {
    _0x2069B["stopImmediatePropagation"]();
    _0x2069B["preventDefault"]();
    var _0x21580 = _0x2069B["dataTransfer"]["getData"]("text");
    if (_0x21580) {
        _0x2069B["target"]["value"] = _0x21580;
        src_change();
        return
    }
    ;_0x21580 = _0x2069B["dataTransfer"]["files"];
    if (_0x21580["length"] != 0) {
        var _0x215DD = new FileReader;
        _0x215DD["onload"] = function(_0x2069B) {
            $("#source")["val"](_0x2069B["target"]["result"]);
            src_change()
        }
        ;
        _0x215DD["readAsText"](_0x21580[0], "UTF-8");
        return
    }
}
function getNoteData() {
    if (user["isFixedNoteData"] && user["noteData"]) {
        return user["noteData"]
    }
    ;isGetNoteData = true;
    var abc, _0x1BAAE = $("#source")["val"]();
    user["img_out"] = null;
    user["get_abcmodel"] = play["abcplay"]["add"];
    abc = new abc2svg["Abc"](user);
    try {
        initVol = 1;
        splitVol = 0;
        abc["tosvg"](abc_fname[0], _0x1BAAE);
        isGetNoteData = false
    } catch (e) {
        window["top"]["alert"](e["message"] + "\x0Aabc2svg tosvg bug - stack:\x0A" + e["stack"]);
        play["playing"] = false;
        play["a_pe"] = null;
        isGetNoteData = false;
        return
    }
    ;var _0x236EC = play["abcplay"]["clear"]();
    if (user["isFixedNoteData"]) {
        user["noteData"] = _0x236EC
    }
    ;isGetNoteData = false;
    return _0x236EC
}
function clearNoteData() {
    user["noteData"] = null
}
function getAllNoteIndex() {
    var _0x22F4B = getNoteData();
    var _0x22FA8 = new Array();
    for (var _0x1B9F4 = 0; _0x1B9F4 < _0x22F4B["length"]; _0x1B9F4++) {
        _0x22FA8["push"](_0x22F4B[_0x1B9F4][0])
    }
    ;return _0x22FA8
}
function showFirstBarSeq() {
    $["each"]($("svg"), function(_0x1B9F4, _0x1F35A) {
        $["each"]($(_0x1F35A)["find"]("g text[type=\'measure\']"), function(_0x1D0D7, _0x26D6A) {
            if (_0x1D0D7 > 0) {
                $(_0x26D6A)["remove"]()
            }
        })
    })
}
var timer;
var reLoadTimes = 0;
function src_change(_0x25E85) {
    if (loadSuccessNum < dynLoadJsNum) {
        reLoadTimes++;
        if (reLoadTimes > 10) {
            return
        }
        ;setTimeout(function() {
            src_change(_0x25E85)
        }, 100);
        return
    }
    ;$("#target")["css"]("cursor", "default");
    $("#insertWord")["removeClass"]("menu-pressed");
    var _0x220C3 = $("#source")["val"]();
    if (_0x220C3 == "") {
        return
    }
    ;if (user["srcChangeCount"] == 0) {
        user["defaultMusicType"] = musicType
    }
    ;user["pitNoteData"] = null;
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
    ;showBeat = false;
    showKew = false;
    showSD = false;
    isInFirstNode = true;
    firstNodeNotes = new Array();
    renderStaffMeterCount = 0;
    if (!elt_ref["source"]) {
        return
    }
    ;var _0x26E81 = new Array();
    var _0x26F3B = /V\s*:\s*([0-9]*)/g;
    var _0x1BA51 = _0x220C3["match"](_0x26F3B);
    isStave = false;
    notAutoSFBarSeq = -1;
    if (_0x1BA51 != null && _0x1BA51["length"] > 0) {
        for (var _0x1B9F4 = 0; _0x1B9F4 < _0x1BA51["length"]; _0x1B9F4++) {
            var _0x1B8DD = _0x1BA51[_0x1B9F4];
            var _0x26EDE = _0x1B8DD["match"](/V\s*:\s*([0-9]*)/)[1];
            if (_0x26E81["indexOf"](_0x26EDE) < 0) {
                _0x26E81["push"](_0x26EDE)
            }
        }
    }
    ;if (_0x26E81["length"] > 1) {
        isStave = true
    } else {
        if (_0x26E81["length"] == 1) {
            if (_0x26E81[0] == "9") {
                isStave = true
            }
        }
    }
    ;if (!isStave && musicType == 2) {
        if (false) {
            var _0x220C3 = $("#source")["val"]();
            if (_0x220C3["indexOf"]("%%indent") > -1) {
                var _0x26E24 = firstMeterWidth;
                _0x220C3 = _0x220C3["replace"](/\%\%indent.*/, "%%indent " + _0x26E24);
                $("#source")["val"](_0x220C3)
            } else {
                $("#source")["val"]("%%indent " + firstMeterWidth + "\x0A" + $("#source")["val"]())
            }
        }
    } else {
        $("#source")["val"]($("#source")["val"]()["replaceAll"]("%%indent .*\x0A", ""))
    }
    ;play_stop();
    play["playing"] = false;
    if (!play["playing"]) {
        timer = setTimeout(render, 100, _0x25E85)
    }
    ;if (elt_ref["source"] && $("#source")["val"]() != "" && $("#source")["val"]()["indexOf"]("showfirstmeasure") > -1) {
        setTimeout(showFirstBarSeq, 100)
    }
    ;getVoiceVol("source")
}
function getVoiceVol(_0x24400) {
    var _0x220C3 = $("#" + _0x24400)["val"]();
    if (!_0x220C3) {
        return
    }
    ;var _0x24346 = /%%voicevol\((.*)\)/;
    var _0x1BA51 = _0x220C3["match"](_0x24346);
    if (_0x1BA51 != null) {
        var _0x1B8DD = _0x1BA51[1];
        var _0x2445D = _0x1B8DD["split"](",");
        vols = new Array();
        for (var _0x1D0D7 = 0; _0x1D0D7 < _0x2445D["length"]; _0x1D0D7++) {
            var _0x243A3 = _0x2445D[_0x1D0D7];
            var _0x21A39 = _0x243A3["split"]("=")[0];
            var _0x244BA = _0x243A3["split"]("=")[1];
            var _0x20584 = new Object();
            _0x20584["v"] = _0x21A39;
            _0x20584["vol"] = _0x244BA;
            vols["push"](_0x20584)
        }
    }
}
setTimeout(edit_init, 200);
function getBeatAndSpeed(_0x220C3, _0x1B7C6) {
    var _0x23233 = new RegExp("Q:.*(?=\\n)");
    var _0x231D6 = new RegExp("M:.*(?=\\n)");
    var _0x2311C = _0x23233["exec"](_0x220C3);
    var _0x1E646 = _0x231D6["exec"](_0x220C3);
    var _0x23179;
    if (!_0x1E646) {
        return typeof _0x1B7C6 == "function" && _0x1B7C6()
    }
    ;var _0x230BF = _0x1E646[0]["replace"](new RegExp("M\\s*:","g"), "");
    if (_0x230BF["indexOf"]("C|") > -1) {
        _0x230BF = "2/2"
    } else {
        if (_0x230BF["indexOf"]("C") > -1) {
            _0x230BF = "4/4"
        } else {
            if (_0x230BF["split"]("/")["length"] > 2) {
                _0x230BF = _0x230BF["trim"]()["split"](" ")[0]
            }
        }
    }
    ;_0x230BF = _0x230BF["replaceAll"](" ", "");
    var _0x23062 = _0x230BF["split"]("/")[0];
    if (!_0x2311C) {
        _0x23179 = ["1/" + _0x230BF["split"]("/")[1], "120"]
    } else {
        _0x23179 = _0x2311C[0]["replace"]("Q:", "")["split"]("=");
        if (_0x23179 && _0x23179["length"] > 0 && _0x23179[0]["indexOf"]("\"") > -1) {
            qAsplit = _0x23179[0]["split"]("\"");
            _0x23179[0] = qAsplit[qAsplit["length"] - 1]
        }
    }
    ;var _0x2334A = 0;
    if (_0x23179["length"] > 0) {
        var _0x23290 = _0x23179[1];
        var _0x20527 = _0x23179[0]["split"]("/");
        var _0x1EC73 = eval(_0x23179[0]);
        var _0x232ED = _0x23290 * _0x230BF["split"]("/")[1] / _0x20527[1];
        _0x2334A = 60 / _0x232ED
    } else {
        _0x2334A = 60 / _0x23179[0]
    }
    ;var _0x23005 = _0x23179[1];
    return typeof _0x1B7C6 == "function" && _0x1B7C6(_0x23062, _0x2334A, _0x23005, _0x230BF)
}
function getSubSvg(_0x23F47, _0x1C138) {
    var _0x23EEA = "";
    var _0x23E8D = "";
    for (var _0x1B9F4 = 0; _0x1B9F4 < _0x1C138; _0x1B9F4++) {
        var _0x1BB0B = _0x23F47["indexOf"]("</svg>");
        _0x23F47 = _0x23F47["substr"](_0x1BB0B + 6)
    }
    ;var _0x23E30 = _0x23F47["indexOf"]("</svg>");
    return _0x23F47["substring"](0, _0x23E30 + 6)
}
function getClickNoteInfo(_0x1C24F) {
    return syms[_0x1C24F]
}
function findNearElement(_0x22294, _0x1BD96, _0x1BDF3) {
    var _0x2217D = 9999;
    var _0x221DA = 9999;
    var _0x22237 = null;
    if ($(_0x22294)["is"]("text")) {
        var _0x1BC7F = $(_0x22294)["attr"]("type");
        if (_0x1BC7F == "title" || _0x1BC7F == "composer") {
            _0x22237 = $(_0x22294);
            var _0x20584 = new Object();
            _0x20584["type"] = _0x1BC7F;
            _0x20584["text"] = $(_0x22294)["text"]();
            return _0x20584
        }
    }
    ;$(_0x22294)["find"]("text,use,path")["each"](function(_0x1B9F4, _0x1F35A) {
        var _0x224C2 = $(this)["attr"]("x");
        var _0x2251F = $(this)["attr"]("y");
        if (!_0x224C2) {
            _0x224C2 = 0
        }
        ;if (!_0x2251F) {
            _0x2251F = 0
        }
        ;_0x224C2 = parseFloat(_0x224C2);
        _0x2251F = parseFloat(_0x2251F);
        var _0x222F1 = $(_0x1F35A)[0]["getBBox"]();
        var _0x226F0 = $(_0x1F35A)[0]["getBoundingClientRect"]();
        var _0x1FFB4 = _0x222F1["height"];
        var _0x2297B = _0x222F1["width"];
        if ($(_0x1F35A)["is"]("path") && !_0x224C2) {
            var _0x2234E = $(_0x1F35A)["attr"]("d");
            if (_0x2234E && _0x2234E != "") {
                var _0x22636 = /m(\d*[.]\d*\s*\d*[.]\d*)/i;
                var _0x22693 = _0x2234E["match"](_0x22636);
                if (_0x22693 != null && _0x22693["length"] > 0) {
                    var _0x225D9 = _0x22693[1]["replace"](/\s+/, " ");
                    _0x224C2 = parseFloat(_0x225D9["split"](" ")[0]);
                    _0x2251F = parseFloat(_0x225D9["split"](" ")[1])
                }
            }
        }
        ;var _0x1EC73 = $(this)["parent"]();
        var _0x1F0CF = 0;
        var _0x1F12C = 0;
        var _0x227AA = 1;
        if ($(_0x1EC73)["is"]("g")) {
            var _0x228C1 = $(_0x1EC73)["attr"]("transform");
            if (_0x228C1 && _0x228C1 != "") {
                var _0x2291E = /translate\((.[^\(]*)\)/;
                var _0x2274D = /scale\((.[^\(]*)\)/;
                var _0x22807 = _0x228C1["match"](_0x2291E);
                if (_0x22807 != null && _0x22807["length"] > 0) {
                    var _0x22864 = _0x22807[1];
                    _0x1F0CF = parseFloat(_0x22864["split"](",")[0]);
                    _0x1F12C = parseFloat(_0x22864["split"](",")[1])
                }
                ;var _0x2257C = _0x228C1["match"](_0x2274D);
                if (_0x2257C != null && _0x2257C["length"] > 0) {
                    _0x227AA = parseFloat(_0x2257C[1]);
                    _0x2297B = parseFloat(_0x2297B) / _0x227AA;
                    _0x1FFB4 = parseFloat(_0x1FFB4) / _0x227AA
                }
            }
            ;if ($(_0x1EC73)["attr"]("type") == "staff") {
                _0x1FFB4 = -_0x1FFB4
            }
        }
        ;var _0x1BC7F = $(_0x1F35A)["attr"]("type");
        if (_0x1BC7F && _0x1BC7F["toLowerCase"]() == "hd") {
            if (parseFloat(_0x1FFB4) > 0) {
                _0x1FFB4 = parseFloat(_0x1FFB4) - 20
            }
        }
        ;if ($(_0x1F35A)["is"]("path")) {
            if (_0x1BD96 >= _0x224C2 + _0x1F0CF && _0x1BD96 <= parseFloat(_0x224C2) + parseFloat(_0x2297B) + _0x1F0CF && _0x1BDF3 >= parseFloat(_0x2251F) + _0x1F12C && _0x1BDF3 <= Math["abs"](_0x2251F) + parseFloat(_0x1FFB4) + _0x1F12C) {
                _0x22237 = $(this);
                return false
            }
        } else {
            if (_0x1BD96 >= _0x224C2 + _0x1F0CF && _0x1BD96 <= parseFloat(_0x224C2) + parseFloat(_0x2297B) + _0x1F0CF && _0x1BDF3 <= parseFloat(_0x2251F) + _0x1F12C && _0x1BDF3 >= Math["abs"](_0x2251F) - parseFloat(_0x1FFB4) + _0x1F12C) {
                _0x22237 = $(this);
                return false
            }
        }
        ;var _0x1FE40 = Math["abs"](parseFloat(_0x224C2 + _0x1F0CF) - _0x1BD96);
        if (_0x1FE40 > 30) {
            return
        }
        ;if (_0x1FE9D > 30) {
            return
        }
        ;var _0x1FE9D = Math["abs"](parseFloat(_0x2251F + _0x1F12C) - _0x1BDF3);
        var _0x22465 = Math["abs"](parseFloat(_0x2251F) + parseFloat(_0x1FFB4) - _0x1BDF3);
        var _0x223AB = Math["sqrt"](Math["pow"](_0x1FE40, 2) + Math["pow"](_0x1FE9D, 2));
        var _0x22408 = Math["sqrt"](Math["pow"](_0x1FE40, 2) + Math["pow"](_0x22465, 2));
        if (_0x22408 < _0x223AB) {
            _0x223AB = _0x22408
        }
        ;if (_0x223AB < 50) {
            if (_0x223AB < _0x221DA) {
                _0x221DA = _0x223AB;
                _0x22237 = $(this)
            }
        }
    });
    var _0x20584 = new Object();
    _0x20584["type"] = null;
    _0x20584["text"] = "";
    _0x20584["parenttype"] = "";
    if (_0x22237 != null && _0x22237["length"] > 0) {
        console["log"](_0x22237[0]["outerHTML"]);
        _0x20584["type"] = $(_0x22237)["attr"]("type");
        if ($(_0x22237)["is"]("text")) {
            _0x20584["text"] = $(_0x22237)["text"]()
        }
        ;if ($(_0x22237)["attr"]("parenttype")) {
            _0x20584["parenttype"] = $(_0x22237)["attr"]("parenttype")
        }
        ;_0x20584["html"] = _0x22237[0]["outerHTML"]
    }
    ;return _0x20584
}
var singleRect2 = function(_0x1BC7F, _0x1BB0B, _0x1BB68, _0x1BD96, _0x1BDF3, _0x1BD39, _0x1B997, _0x1BAAE, _0x1BBC5) {
    if ("note" != _0x1BC7F && "rest" != _0x1BC7F) {
        return
    }
    ;var _0x1F813 = 2, _0x1F8CD, _0x1F870, _0x1F7B6;
    _0x1F870 = _0x1BAAE["x"] - 4.5 - 2;
    let _0x1F987 = abc["get_staff_tb"]();
    let _0x1F9E4 = _0x1F987["length"];
    var _0x1F92A = 0;
    var _0x1F6FC = -1;
    var _0x1F69F = 0;
    for (var _0x1B9F4 = 0; _0x1B9F4 < _0x1F987["length"]; _0x1B9F4++) {
        if (_0x1F987[_0x1B9F4]["y"] != 0) {
            if (_0x1F6FC == -1) {
                _0x1F6FC = _0x1B9F4
            }
            ;_0x1F92A++;
            _0x1F69F = _0x1B9F4
        }
    }
    ;if (_0x1F92A == 1) {
        _0x1F8CD = (_0x1F987[_0x1F6FC])["y"] + _0x1F987[_0x1F6FC]["topbar"] * _0x1F987[_0x1F6FC]["staffscale"] + 15;
        _0x1F7B6 = _0x1F987[_0x1F6FC]["topbar"] * _0x1F987[_0x1F6FC]["staffscale"] + 30;
        if (_0x1BAAE["my_line"] == 0 && musicType == 2) {
            _0x1F7B6 = _0x1F7B6 + 15
        }
    } else {
        _0x1F8CD = (abc["get_staff_tb"]()[_0x1F6FC])["y"] + _0x1F987[_0x1F6FC]["topbar"] * _0x1F987[_0x1F6FC]["staffscale"] + 15;
        _0x1F7B6 = _0x1F987[_0x1F6FC]["y"] + _0x1F987[_0x1F6FC]["topbar"] * _0x1F987[_0x1F6FC]["staffscale"] - (_0x1F987[_0x1F69F]["y"] + _0x1F987[_0x1F69F]["botbar"] * _0x1F987[_0x1F69F]["staffscale"]) + 30;
        if (_0x1BAAE["my_line"] == 0 && musicType == 2) {
            _0x1F7B6 = _0x1F7B6 + 15
        }
    }
    ;var _0x1F759 = getValidNext(_0x1BAAE, _0x1BAAE["ts_next"]);
    var _0x1FA41 = _0x1F759["time"] - _0x1BAAE["time"];
    var _0x1F813 = 2, _0x1F8CD, _0x1F870, _0x1F7B6;
    var _0x1DD8E = getMeter(_0x1BAAE["p_v"]["meter"]["a_meter"][0]);
    var _0x1DCD4 = $("#source")["val"]();
    var _0x1BF67 = _0x1DCD4["slice"](_0x1BB0B, _0x1BB68);
    if (_0x1DD8E && _0x1DD8E["bot"] < 4) {
        _0x1DD8E["bot"] = 4;
        _0x1DD8E["top"] = (4 / _0x1DD8E["bot"]) * _0x1DD8E["top"]
    }
    ;var _0x1B880 = getTag(_0x1DCD4, "L");
    var _0x1F4CE = _0x1BAAE["my_wmeasure"] / parseInt(_0x1BAAE["my_meter"][0]["top"]);
    _0x1BAAE["beat_time"] = _0x1F4CE;
    _0x1BAAE["time_inter"] = _0x1FA41;
    _0x1BAAE["single_count"] = 0;
    if (_0x1FA41 > _0x1F4CE) {
        var _0x1F642 = isMinXWithSameTime(_0x1BAAE);
        if (!_0x1F642) {
            return
        }
        ;if (_0x1F642) {
            var _0x1F588 = removeSingleLine(_0x1BAAE);
            if (_0x1F588) {
                drawSingleLine(_0x1F870, _0x1F8CD, _0x1F813, _0x1F7B6, _0x1BAAE, _0x1BC7F, 0, _0x1BAAE["time"], _0x1F4CE)
            }
        }
        ;var _0x1F52B = 0;
        var _0x1F5E5 = _0x1FA41 + 0;
        while (_0x1FA41 > _0x1F4CE) {
            _0x1FA41 = _0x1FA41 - _0x1F4CE;
            _0x1F52B++
        }
        ;var _0x1FA9E = _0x1F759["x"] - _0x1BAAE["x"];
        var _0x1FAFB = _0x1FA9E / (_0x1F52B + 1);
        _0x1BAAE["single_count"] = _0x1F52B;
        for (var _0x1B9F4 = 1; _0x1B9F4 <= _0x1F52B; _0x1B9F4++) {
            drawSingleLine(_0x1F870 + _0x1FAFB * (_0x1B9F4), _0x1F8CD, _0x1F813, _0x1F7B6, _0x1BAAE, _0x1BC7F, _0x1B9F4, _0x1BAAE["time"] + (_0x1F5E5 / (_0x1F52B + 1)) * _0x1B9F4, _0x1F5E5 / (_0x1F52B + 1))
        }
        ;console["log"]("s.istart:", _0x1BAAE["istart"], "  next.istart:", _0x1F759["istart"]);
        console["log"]("\u65f6\u95f4\u95f4\u9694\uff1a", _0x1FA41);
        console["log"]("\u9700\u8981\u52a0\u753b" + _0x1F52B + "\u6761\u7ebf,\u95f4\u8ddd\uff1a", _0x1FAFB)
    } else {
        if (_0x1FA41 > 0) {
            if (isMinXWithSameTime(_0x1BAAE)) {
                var _0x1F588 = removeSingleLine(_0x1BAAE);
                if (_0x1F588) {
                    drawSingleLine(_0x1F870, _0x1F8CD, _0x1F813, _0x1F7B6, _0x1BAAE, _0x1BC7F, 0, _0x1BAAE["time"], _0x1BAAE["dur"])
                }
            }
        } else {
            if (_0x1FA41 == 0 && _0x1F759["type"] == 10) {
                var _0x1F588 = removeSingleLine(_0x1BAAE);
                if (_0x1F588) {
                    drawSingleLine(_0x1F870, _0x1F8CD, _0x1F813, _0x1F7B6, _0x1BAAE, _0x1BC7F, 0, _0x1BAAE["time"], _0x1BAAE["dur"])
                }
            }
        }
    }
};
function isMinXWithSameTime(_0x1BAAE) {
    for (var _0x1B9F4 = 0; _0x1B9F4 < syms["length"]; _0x1B9F4++) {
        var _0x245D1 = syms[_0x1B9F4];
        if (_0x245D1 && _0x1BAAE["type"] == 10 && _0x1BAAE["time"] == _0x245D1["time"] && _0x1BAAE["istart"] != _0x245D1["istart"] && (_0x245D1["type"] == 10 || _0x245D1["type"] == 8)) {
            if (_0x1BAAE["x"] < _0x245D1["x"]) {
                return true
            }
            ;return false
        }
    }
    ;return true
}
function removeSingleLine(_0x1BAAE) {
    var _0x24346 = new RegExp("<rect time=\"" + _0x1BAAE["time"] + "\".[^<]*/>","g");
    var _0x25E28 = abc["get_svg"]();
    var _0x1BA51 = _0x25E28["match"](_0x24346);
    if (_0x1BA51 != null) {
        for (var _0x1B9F4 = 0; _0x1B9F4 < _0x1BA51["length"]; _0x1B9F4++) {
            _0x25E28 = _0x25E28["replace"](_0x1BA51[_0x1B9F4], "")
        }
        ;abc["set_svg"](_0x25E28)
    }
    ;return true
}
function getValidNext(_0x1BAAE, _0x1F759) {
    if (_0x1F759["invis"] || (_0x1F759 && _0x1F759["type"] != 10 && _0x1F759["type"] != 8 && _0x1F759["type"] != 0)) {
        while (_0x1F759["ts_next"]) {
            _0x1F759 = _0x1F759["ts_next"];
            if (_0x1F759["invis"]) {
                continue
            }
            ;if (_0x1F759["type"] == 10 || _0x1F759["type"] == 8 || _0x1F759["type"] == 0) {
                break
            }
        }
    }
    ;if (_0x1F759["time"] - _0x1BAAE["time"] == 0 && _0x1F759["type"] == 10) {
        _0x1F759 = _0x1F759["ts_next"];
        return getValidNext(_0x1BAAE, _0x1F759)
    }
    ;return _0x1F759
}
function drawSingleLine(_0x1F870, _0x1F8CD, _0x1F813, _0x1F7B6, _0x1BAAE, _0x1BC7F, _0x211DE, _0x21352, _0x2123B) {
    _0x1F813 = 2;
    var _0x212F5 = "";
    if (_0x1BAAE["tie_s"]) {
        var _0x21298 = _0x1BAAE["tie_s"]["istart"];
        _0x212F5 = " tie=\"1\" "
    }
    ;abc["out_svg"]("<rect time=\"" + _0x1BAAE["time"] + "\" acttime=\"" + _0x21352 + "\" dur=\"" + _0x2123B + "\" " + _0x212F5 + "style=\"fill-opacity:0;fill:#0083d0;\" data-syncrect=\"1\"  data-type=\"" + ((_0x1BAAE["nflags"] == 0 && _0x1BAAE["dots"] == 1) ? "dot" : "") + "\" class=\"abcr _" + _0x1BAAE["istart"] + "_single s" + _0x211DE + "\" x=\"");
    abc["out_sxsy"](_0x1F870, "\" y=\"", _0x1F8CD);
    abc["out_svg"]("\" width=\"" + _0x1F813["toFixed"](2) + "\" height=\"" + abc["sh"](_0x1F7B6)["toFixed"](2) + "\"/>\x0A")
}
function renderSuccess() {
    renderTimeout = setTimeout(function() {
        var $events = $("svg text[type=\'title\']")["data"]("events");
        $("svg text[type=\'title\']")["on"]("dblclick", function() {
            if (!user["editorStaff"]) {
                return false
            }
            ;var _0x261CA = this["getBoundingClientRect"]();
            var _0x26227 = document["createElement"]("textarea");
            $(_0x26227)["css"]("z-index", 2)["css"]("position", "absolute");
            $("body")["append"]($(_0x26227));
            var $self = $(this);
            $(_0x26227)["val"](getAllTitle())["css"]({
                left: _0x261CA["left"],
                top: _0x261CA["top"],
                width: _0x261CA["width"] < 200 ? 200 : _0x261CA["width"],
                height: _0x261CA["height"] < 80 ? 80 : _0x261CA["height"]
            })["show"]()["focus"]()["on"]("blur", function() {
                $self["text"]($(this)["val"]());
                $("#T")["val"]($(this)["val"]());
                set("T:", $(this)["val"]());
                $(this)["css"]("display", "none");
                src_change()
            })
        });
        $("svg text[type=\'composer\']")["on"]("dblclick", function() {
            if (!user["editorStaff"]) {
                return false
            }
            ;var _0x261CA = this["getBoundingClientRect"]();
            var _0x26227 = document["createElement"]("textarea");
            $(_0x26227)["css"]("z-index", 2)["css"]("position", "absolute");
            $("body")["append"]($(_0x26227));
            var $self = $(this);
            $(_0x26227)["val"]($("#C")["val"]())["css"]({
                left: _0x261CA["left"] - 100,
                top: _0x261CA["top"] - 50,
                width: _0x261CA["width"] + 100,
                height: _0x261CA["height"] + 80
            })["show"]()["focus"]()["on"]("blur", function() {
                $("#C")["val"]($(this)["val"]());
                set("C:", $(this)["val"]());
                src_change();
                $(this)["remove"]()
            })
        });
        $("path[type=\'decos\']")["click"](function(_0x2063E) {
            console["log"](_0x2063E["x"]);
            _0x2063E["preventDefault"]();
            _0x2063E["stopPropagation"]()
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
                standVsyms = getStandVsyms()
            }
        } catch (err) {
            console["log"](err)
        } finally {
            try {
                bgBar = new Array()
            } catch (e) {
                console["log"](e)
            }
        }
    }, 100);
    if (user["noteUpdate"]["active"]) {
        user["noteUpdate"]["active"] = false;
        if (graphEditor["pianoImpro"] && typeof (graphEditor["pianoImpro"]["noteUpdate"]) == "function") {
            graphEditor["pianoImpro"]["noteUpdate"](user["noteUpdate"]["istart"], user["noteUpdate"]["lyric"], user["noteUpdate"]["line"], true, false, user["noteUpdate"]["clearLyric"])
        }
        ;if (user["noteUpdate"]["isNext"]) {
            var _0x260B3 = syms[user["noteUpdate"]["istart"]];
            var _0x1F52B = 20;
            while (_0x1F52B > 0 && _0x260B3 && _0x260B3["next"] && (_0x260B3["next"]["type"] == 8 || _0x260B3["next"]["type"] == 10)) {
                _0x260B3 = _0x260B3["next"];
                graphEditor["pianoImpro"]["noteUpdate"](_0x260B3["istart"], user["noteUpdate"]["lyric"], user["noteUpdate"]["line"], true);
                _0x1F52B--
            }
        }
        ;user["noteUpdate"]["isNext"] = false;
        user["noteUpdate"]["lyric"] = null;
        user["noteUpdate"]["line"] = 0;
        user["noteUpdate"]["clearLyric"] = false
    } else {
        if (user["noteUpdate"]["isClearPrevNote"]) {
            var abc = $("#source")["val"]();
            if (user["noteUpdate"]["prevNoteIstart"] > -1) {
                var _0x2468B = abc[user["noteUpdate"]["prevNoteIstart"]];
                if (_0x2468B == "." || _0x2468B == "(") {
                    abc = abc["substring"](0, user["noteUpdate"]["prevNoteIstart"]) + abc["substring"](user["noteUpdate"]["prevNoteIstart"] + 1, abc["length"]);
                    $("#source")["val"](abc);
                    src_change()
                }
            }
            ;user["noteUpdate"]["isClearPrevNote"] = false;
            user["noteUpdate"]["prevNoteIstart"] = -1
        }
    }
    ;if ($("#editorvDiv")["length"] > 0) {
        if ($("#source")["val"]()["indexOf"]("%%voicecombine") > -1) {
            $("#editorvDiv")["css"]("display", "")
        } else {
            $("#editorvDiv")["css"]("display", "none")
        }
    }
}
function editorAnnot(_0x1BB0B) {
    console["log"]("editorAnnot----------");
    if (!user["editorAnnot"]) {
        return
    }
    ;if ($("rect[type=\'lyrics\'][istart=\'" + _0x1BB0B + "\']")["length"] > 0) {
        for (var _0x1B9F4 = 0; _0x1B9F4 < syms["length"]; _0x1B9F4++) {
            var _0x1CD92 = syms[_0x1B9F4];
            if (_0x1CD92) {
                if (_0x1CD92["a_ly"]) {
                    var _0x21C67 = _0x1CD92["a_ly"];
                    for (var _0x1D0D7 = 0; _0x1D0D7 < _0x21C67["length"]; _0x1D0D7++) {
                        var _0x21C0A = _0x21C67[_0x1D0D7];
                        if (_0x21C0A && _0x21C0A["istart"] == _0x1BB0B) {
                            $("text[istart=\'" + _0x1CD92["istart"] + "\']")["addClass"]("selected_text");
                            createLyricEditor();
                            return
                        }
                    }
                }
            }
        }
        ;return
    }
    ;console["log"]("--------type:", syms[_0x1BB0B]["type"]);
    if (syms[_0x1BB0B]["type"] == 14) {
        var _0x1BAAE = syms[_0x1BB0B];
        if (_0x1BAAE["tempo_str1"]) {
            $("#speedDescInput")["val"](_0x1BAAE["tempo_str1"])
        }
        ;$("#speedDescInput")["attr"]("istart", _0x1BB0B);
        $("#CHANGE_SPEED_div .modal-content")["css"]("left", ($(window)["width"]() - $("#CHANGE_SPEED_div .modal-content")["width"]()) / 2);
        $("#CHANGE_SPEED_div")["modal"]("toggle");
        return
    }
    ;var _0x21BAD = false;
    if (syms[_0x1BB0B]["type"] == 8 || syms[_0x1BB0B]["type"] == 10) {
        _0x21BAD = true
    }
    ;if (!_0x21BAD) {
        return
    }
    ;$("#zsistart")["val"](_0x1BB0B);
    var _0x1BAAE = syms[_0x1BB0B];
    var _0x21B50 = _0x1BAAE["a_gch"];
    var _0x1B8DD = "";
    var _0x21CC4 = "";
    var _0x21A96 = "";
    if (_0x21B50) {
        for (var _0x1B9F4 = 0; _0x1B9F4 < _0x21B50["length"]; _0x1B9F4++) {
            _0x1B8DD += _0x21B50[_0x1B9F4]["text"];
            _0x21CC4 = _0x21B50[_0x1B9F4]["type"];
            _0x21A96 = _0x21B50[_0x1B9F4]["fonttype"];
            if (_0x1B9F4 != _0x21B50["length"] - 1) {
                _0x1B8DD += "\x0A"
            }
        }
    }
    ;if (_0x1B8DD["indexOf"]("[font-size:") > -1) {
        var _0x1D761 = /\[(font-size:.*)\]/["exec"](_0x1B8DD);
        var _0x21AF3 = "";
        if (_0x1D761 != null) {
            _0x21AF3 = /\[font-size:(.*)\]/["exec"](_0x1B8DD)[1];
            _0x1B8DD = _0x1B8DD["replace"](/\[(font-size:.*)\]/, "")
        }
        ;_0x1B8DD = _0x1B8DD["replace"](/\[(font-size:.*)\]/, "")
    }
    ;_0x1B8DD = getGchCoorInfo(_0x1B8DD);
    if (_0x21AF3 && _0x21AF3 != "") {
        $("#annofontsize")["val"](_0x21AF3)
    }
    ;$("input[name=\'zspos\'][value=\'" + _0x21CC4 + "\']")["prop"]("checked", "checked");
    if (_0x21A96 == "\u2206") {
        $("input[name=\'fonttype\'][value=\'\u2206\']")["prop"]("checked", "checked")
    } else {
        $("input[name=\'fonttype\'][value=\'\']")["prop"]("checked", "checked")
    }
    ;$("#zsInput")["val"](_0x1B8DD);
    var _0x1C24F = _0x1BAAE["istart"];
    $("text[type=\'zs\'][istart=\'" + _0x1C24F + "\']")["addClass"]("selected_text");
    $("#ZS_EDIT_div .modal-content")["css"]("left", ($(window)["width"]() - $("#ZS_EDIT_div .modal-content")["width"]()) / 2);
    $("#ZS_EDIT_div")["modal"]()
}
function getGchCoorInfo(_0x1B8DD) {
    var _0x22DD7 = "";
    $("#xoffset")["val"]("");
    $("#yoffset")["val"]("");
    $("#gchcoor")["val"]("");
    if (xcoorGchReg["test"](_0x1B8DD) || ycoorGchReg["test"](_0x1B8DD)) {
        var _0x23578 = xcoorGchReg["exec"](_0x1B8DD);
        var _0x23632 = ycoorGchReg["exec"](_0x1B8DD);
        var _0x235D5 = 0;
        var _0x2368F = 0;
        if (_0x23578 != null) {
            _0x22DD7 = _0x23578[0];
            _0x235D5 = parseInt(_0x23578[1]);
            $("#xoffset")["val"](_0x235D5);
            _0x1B8DD = _0x1B8DD["replace"](xcoorGchReg, "")
        }
        ;if (_0x23632 != null) {
            _0x22DD7 = _0x23632[0];
            _0x2368F = parseInt(_0x23632[1]);
            $("#yoffset")["val"](_0x2368F);
            _0x1B8DD = _0x1B8DD["replace"](ycoorGchReg, "")
        }
        ;$("#gchcoor")["val"](_0x22DD7)
    }
    ;return _0x1B8DD
}
function saveZs() {
    var _0x1C24F = $("#zsistart")["val"]();
    var _0x22009 = $("#zsInput")["val"]();
    var _0x21A96 = $("input[name=\'fonttype\']:checked")["val"]();
    var _0x21CC4 = $("input[name=\'zspos\']:checked")["val"]();
    var _0x20527 = _0x22009["split"]("\x0A");
    if (_0x1C24F != "") {
        _0x1C24F = parseInt(_0x1C24F);
        var _0x1BAAE = syms[_0x1C24F];
        if (!_0x1BAAE) {
            return
        }
        ;var _0x1B8DD = "";
        var _0x21AF3 = $("#annofontsize")["val"]();
        var _0x22DD7 = genGchCoorStr();
        for (var _0x1B9F4 = 0; _0x1B9F4 < _0x20527["length"]; _0x1B9F4++) {
            if (_0x20527[_0x1B9F4] != "") {
                _0x1B8DD += "\"";
                _0x1B8DD += _0x21CC4 + _0x21A96;
                if (_0x21AF3 != "14") {
                    _0x1B8DD += "[font-size:" + _0x21AF3 + "]"
                }
                ;_0x1B8DD += _0x20527[_0x1B9F4] + _0x22DD7 + "\""
            }
        }
        ;var _0x220C3 = $("#source")["val"]();
        _0x220C3 = _0x220C3["substring"](0, _0x1BAAE["istart"]) + _0x1B8DD + _0x220C3["substring"](_0x1BAAE["istart"]);
        var _0x21B50 = _0x1BAAE["a_gch"];
        if (_0x21B50 != null) {
            for (var _0x1B9F4 = _0x21B50["length"] - 1; _0x1B9F4 >= 0; _0x1B9F4--) {
                var _0x26A82 = _0x21B50[_0x1B9F4];
                _0x220C3 = _0x220C3["substring"](0, _0x26A82["istart"]) + _0x220C3["substring"](_0x26A82["iend"])
            }
        }
        ;$("#source")["val"](_0x220C3);
        src_change();
        doLog()
    }
}
function genGchCoorStr() {
    var _0x22E34 = $("#xoffset")["val"]();
    var _0x22E91 = $("#yoffset")["val"]();
    var _0x22DD7 = "";
    if (_0x22E34 != "") {
        _0x22DD7 = "{x:" + _0x22E34
    }
    ;if (_0x22E91 != "") {
        if (_0x22DD7 != "") {
            _0x22DD7 += ",y:" + _0x22E91
        } else {
            _0x22DD7 = "{y:" + _0x22E91
        }
    }
    ;if (_0x22DD7 != "") {
        _0x22DD7 += "}"
    }
    ;return _0x22DD7
}
function renderMyText() {
    var _0x220C3 = $("#source")["val"]();
    var _0x24346 = /%%beginmytext([\n\r\s\S]*)%%endmytext/;
    var _0x1BA51 = _0x220C3["match"](_0x24346);
    if (_0x1BA51 != null) {
        var _0x22120 = _0x1BA51[1]["split"]("\x0A");
        if (_0x22120 != null && _0x22120["length"] > 0) {
            for (var _0x1B9F4 = 0; _0x1B9F4 < _0x22120["length"]; _0x1B9F4++) {
                var _0x1B652 = _0x22120[_0x1B9F4];
                if (_0x1B652["replace"](/\s/g, "") != "") {
                    var _0x20584 = JSON["parse"](_0x1B652);
                    console["log"](_0x20584);
                    var _0x23F47 = $("svg[index=\'" + _0x20584["svgIndex"] + "\']");
                    addText2Svg(_0x20584["x"] * 1.4 / scale, _0x20584["y"], _0x23F47, _0x20584["text"])
                }
            }
        }
    }
}
function clickBar(_0x1C24F, _0x2063E) {
    if (typeof isGetBarInfo != "undefined") {
        svgsel(_0x2063E);
        return false
    }
    ;if (graph_update) {
        $("rect[selected=\'selected\']")["css"]("fill-opacity", "0")["removeAttr"]("selected");
        $("svg[type=\'rectnode\']")["remove"]();
        $("#nodeMenu")["hide"]();
        $("rect[istart=\'" + _0x1C24F + "\']")["css"]("fill-opacity", "0.3")["attr"]("selected", "selected");
        $("rect[istart=\'" + _0x1C24F + "\']")["addClass"]("selected_text");
        showProperties("nodeline", _0x2063E);
        console["log"](_0x1C24F);
        _0x2063E["preventDefault"]();
        _0x2063E["stopPropagation"]();
        return false
    }
}
var loadSuccessNum = 0;
var dynLoadJsNum = 0;
function loadJsSuccess() {
    loadSuccessNum++
}

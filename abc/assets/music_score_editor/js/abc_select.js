
/* abc select */

;;(function(w, d, e) {
    "use strict";
    var _0x1131E = function(_0x113FA, _0x113CE) {
        this["selectedCball"] = _0x113FA ? _0x113FA : null;
        this["isOk"] = true;
        this["fill"] = 0.85;
        this["color"] = "#fff";
        this["isOpen"] = false;
        this["first"] = null;
        this["end"] = null;
        this["barlineArr"] = [];
        this["parentSelector"] = _0x113CE || null;
        this["isSelNote"] = true;
        this["$notes"] = null
    };
    _0x1131E["prototype"] = {
        open: function() {
            if (this["isOpen"]) {
                this["close"]();
                return
            }
            ;this["isOpen"] = true;
            var _0x11426 = getBarLineCoor(scale, 0, 9);
            if (!_0x11426) {
                return
            }
            ;this["barlineArr"] = [];
            var _0x11586 = $(".nobrk svg");
            var _0x11502;
            if (this["isSelNote"]) {
                var _0x115B2 = this;
                this["$notes"] = $("svg rect[type=\'note\'], svg rect[type=\'rest\'],svg rect[type=\'splnum_note\'], svg rect[type=\'splnum_rest\']");
                this["$notes"]["each"](function() {
                    $(this)["css"]({
                        'fill-opacity': _0x115B2["fill"],
                        'fill': _0x115B2["color"]
                    })
                })
            } else {
                for (var _0x114D6 = 0; _0x114D6 < _0x11426["length"]; _0x114D6++) {
                    _0x11502 = _0x11426[_0x114D6];
                    var _0x1152E = _0x11502["barline_start"];
                    var _0x11452 = _0x11502["barline_end"];
                    var _0x1155A = _0x11586[_0x11502["line"]];
                    var _0x1147E = _0x1155A["height"]["animVal"]["value"];
                    var _0x115DE = _0x11452[0] - _0x1152E[0];
                    var _0x1160A = 0;
                    if (_0x11502["line"] == 0) {
                        _0x1160A = _0x1152E[1] - 20;
                        _0x1147E = _0x1147E - _0x1160A
                    }
                    ;var _0x114AA = "<svg class=\"svg-staff\"><rect data-idx=\"" + _0x114D6 + "\" x=\"" + _0x1152E[0] + "\" y=\"" + _0x1160A + "\" width=\"" + _0x115DE + "\" height=\"" + _0x1147E + "\" fill=\"" + this["color"] + "\" fill-opacity=\"" + this["fill"] + "\"></rect></svg>";
                    $(_0x1155A)["append"](_0x114AA)
                }
            }
            ;this["initMoveEvent"](true);
            this["initMoveEvent"](false)
        },
        reBuild: function() {
            console["log"]("reBuild-");
            this["initMoveEvent"](true);
            this["initMoveEvent"](false)
        },
        getEvt: function(_0x11636, _0x11662) {
            if (!_0x11662 && _0x11636["changedTouches"] && _0x11636["changedTouches"]["length"] > 0) {
                return (_0x11636["changedTouches"])[0]
            }
            ;return _0x11636
        },
        getPageXy: function(_0x11636, _0x11662) {
            var _0x11636 = this["getEvt"](_0x11636, _0x11662);
            var _0x1168E = this["parentSelector"] ? $(this["parentSelector"])[0]["scrollTop"] : 0;
            return {
                x: _0x11636["pageX"],
                y: _0x11636["pageY"] + _0x1168E
            }
        },
        initMoveEvent: function(_0x11662) {
            var _0x115B2 = this;
            var _0x11796 = this["fill"];
            var _0x1197A = _0x11662 ? "mousedown" : "touchstart";
            var _0x118CA = _0x11662 ? "mousemove" : "touchmove";
            var _0x1176A = _0x11662 ? "mouseup" : "touchend";
            var _0x1194E, _0x11452;
            var _0x117C2 = false;
            _0x115B2["isPc"] = true;
            var _0x11922 = {};
            var _0x118F6 = new Array();
            var _0x11872, _0x1189E, _0x1181A, _0x11846;
            var _0x117EE;
            var _0x1168E = this["parentSelector"] ? $(this["parentSelector"])[0]["scrollTop"] : 0;
            this["$notes"] = $("svg rect[type=\'note\'], svg rect[type=\'rest\'],svg rect[type=\'splnum_note\'], svg rect[type=\'splnum_rest\']");
            if (this["isSelNote"]) {
                this["$notes"]["each"](function(_0x119A6, _0x119FE) {
                    var _0x11A2A = $(this)["offset"]();
                    var _0x119D2 = $(this)["attr"]("istart");
                    $(this)["attr"]("node-index", _0x119A6);
                    _0x118F6["push"]({
                        x1: _0x11A2A["left"],
                        y1: _0x11A2A["top"] + _0x1168E,
                        x2: _0x11A2A["left"] + $(this)["outerWidth"]() + 2,
                        y2: _0x11A2A["top"] + $(this)["outerHeight"]() + _0x1168E,
                        istart: _0x119D2,
                        index: _0x119A6
                    })
                })
            } else {
                $(".svg-staff rect")["each"](function(_0x119A6, _0x119FE) {
                    var _0x11A2A = $(this)["offset"]();
                    _0x118F6["push"]({
                        x1: _0x11A2A["left"],
                        y1: _0x11A2A["top"] + _0x1168E,
                        x2: _0x11A2A["left"] + $(this)["outerWidth"]() + 2,
                        y2: _0x11A2A["top"] + $(this)["outerHeight"]() + _0x1168E
                    })
                })
            }
            ;var _0x1173E = null
              , _0x11712 = null
              , _0x116E6 = 0;
            if (this["isSelNote"]) {
                var $tnotes = this["$notes"];
                $tnotes["off"]("click")["on"]("click", function(_0x11636) {
                    if (_0x11636["shiftKey"]) {
                        $tnotes["css"]({
                            "fill-opacity": _0x11796,
                            "fill": _0x115B2["color"]
                        });
                        if (_0x116E6++ == 0) {
                            _0x1173E = $(this)["attr"]("node-index") - 0;
                            console["log"]("that.cStart:", _0x1173E);
                            $("rect[node-index=\'" + _0x1173E + "\']")["css"]({
                                "fill-opacity": 0.2,
                                "fill": "#0F84F5"
                            })
                        } else {
                            _0x11712 = $(this)["attr"]("node-index") - 0;
                            console["log"]("that.cEnd:", _0x11712);
                            if (_0x115B2["selectedCball"] && _0x11712 !== null) {
                                var _0x11AAE = _0x1173E > _0x11712 ? _0x11712 : _0x1173E;
                                var _0x11A82 = _0x11712 > _0x1173E ? _0x11712 : _0x1173E;
                                for (var _0x11A56 = _0x11AAE; _0x11A56 <= _0x11A82; _0x11A56++) {
                                    $("rect[node-index=\'" + _0x11A56 + "\']")["css"]({
                                        "fill-opacity": 0.2,
                                        "fill": "#0F84F5"
                                    })
                                }
                                ;_0x115B2["selectedCball"](Number(_0x11AAE), Number(_0x11A82));
                                _0x1173E = null;
                                _0x116E6 = 0
                            }
                        }
                    }
                })
            } else {
                $(".svg-staff rect")["off"]("click")["on"]("click", function(_0x11636) {
                    if (_0x11636["shiftKey"]) {
                        if (_0x116E6++ == 0) {
                            _0x1173E = $(this)["attr"]("data-idx");
                            $(".svg-staff rect")["attr"]("fill-opacity", _0x11796)["attr"]("fill", _0x115B2["color"]);
                            $(".svg-staff rect[data-idx=\'" + _0x1173E + "\']")["attr"]("fill-opacity", 0.2)["attr"]("fill", "#0F84F5")
                        } else {
                            _0x11712 = $(this)["attr"]("data-idx");
                            console["log"]("that.cEnd:", _0x11712);
                            if (_0x115B2["selectedCball"] && _0x11712 !== null) {
                                var _0x11AAE = _0x1173E > _0x11712 ? _0x11712 : _0x1173E;
                                var _0x11A82 = _0x11712 > _0x1173E ? _0x11712 : _0x1173E;
                                for (var _0x11A56 = _0x11AAE; _0x11A56 <= _0x11A82; _0x11A56++) {
                                    $(".svg-staff rect[data-idx=\'" + _0x11A56 + "\']")["not"]("[type=\"bar\"]")["attr"]("fill-opacity", 0.2)["attr"]("fill", "#0F84F5")
                                }
                                ;_0x115B2["selectedCball"](Number(_0x11AAE), Number(_0x11A82));
                                _0x1173E = null;
                                _0x116E6 = 0
                            }
                        }
                    }
                })
            }
            ;if (this["isSelNote"]) {
                return
            }
            ;$(".svg-staff rect")["off"](_0x1197A)["on"](_0x1197A, function(_0x11636) {
                _0x11636["preventDefault"]();
                _0x11636["stopPropagation"]();
                _0x117C2 = true;
                _0x1194E = null;
                _0x11452 = null;
                _0x115B2["first"] = null;
                _0x115B2["end"] = null;
                $(".svg-staff rect[fill-opacity=\'0\']")["attr"]("fill-opacity", _0x11796)
            })["off"](_0x118CA)["on"](_0x118CA, function(_0x11636) {
                _0x11636["preventDefault"]();
                _0x11636["stopPropagation"]();
                if (!_0x117C2) {
                    return
                }
                ;_0x11636 = _0x115B2["getEvt"](_0x11636, _0x11662);
                var _0x11B06 = _0x115B2["getPageXy"](_0x11636, _0x11662);
                var _0x11ADA = $(this)["attr"]("data-idx");
                if (!_0x1194E) {
                    _0x1194E = _0x11ADA
                } else {
                    var _0x11A2A;
                    for (var _0x114D6 = 0; _0x114D6 < _0x118F6["length"]; _0x114D6++) {
                        _0x11A2A = _0x118F6[_0x114D6];
                        if (_0x11A2A["x1"] <= _0x11B06["x"] && _0x11B06["x"] <= _0x11A2A["x2"] && _0x11A2A["y1"] <= _0x11B06["y"] && _0x11B06["y"] <= _0x11A2A["y2"]) {
                            _0x11ADA = _0x114D6
                        }
                    }
                }
                ;if (!_0x11452 || _0x11452 != _0x11ADA) {
                    $(".svg-staff rect")["attr"]("fill-opacity", _0x11796)["attr"]("fill", _0x115B2["color"]);
                    var _0x11AAE = _0x1194E < _0x11ADA ? _0x1194E : _0x11ADA;
                    var _0x11A82 = _0x1194E > _0x11ADA ? _0x1194E : _0x11ADA;
                    for (var _0x11A56 = _0x11AAE; _0x11A56 <= _0x11A82; _0x11A56++) {
                        $(".svg-staff rect[data-idx=\'" + _0x11A56 + "\']")["attr"]("fill-opacity", 0.2)["attr"]("fill", "#0F84F5")
                    }
                }
                ;_0x11452 = _0x11ADA
            })["off"](_0x1176A)["on"](_0x1176A, function(_0x11636) {
                _0x11636["preventDefault"]();
                _0x11636["stopPropagation"]();
                _0x117C2 = false;
                _0x115B2["first"] = parseInt(_0x1194E < _0x11452 ? _0x1194E : _0x11452);
                _0x115B2["end"] = parseInt(_0x1194E > _0x11452 ? _0x1194E : _0x11452);
                console["log"]("that.first: ", _0x115B2["first"]);
                console["log"]("that.end: ", _0x115B2["end"]);
                if (_0x115B2["selectedCball"]) {
                    _0x115B2["selectedCball"](_0x115B2["first"], _0x115B2["end"])
                }
            })
        },
        close: function() {
            this["isOpen"] = false;
            this["first"] = null;
            this["end"] = null;
            $(".svg-staff")["remove"]()
        },
        getSeq: function(_0x11B32, _0x11B5E) {
            var _0x115B2 = this;
            var _0x11C92, _0x11C66;
            var _0x11C3A = all_s(true);
            var _0x11502;
            var _0x11B8A = 0;
            var _0x11BE2 = null;
            var _0x11C0E = _0x11C3A["length"];
            for (var _0x114D6 = 0; _0x114D6 < _0x11C0E; _0x114D6++) {
                _0x11502 = _0x11C3A[_0x114D6];
                var _0x11BB6 = (_0x11502["type"] == "4" || _0x11502["type"] == "8" || _0x11502["type"] == "10");
                if (!_0x11BB6) {
                    continue
                }
                ;if (_0x11BE2 != null && _0x11502["bar_index"] != _0x11BE2) {
                    _0x11B8A++
                }
                ;if (!_0x11C92 && _0x11B8A == _0x115B2["first"]) {
                    _0x11C92 = _0x11502["istart"]
                }
                ;if (_0x11B8A == _0x115B2["end"] && _0x11502["beam_end"]) {
                    _0x11C66 = _0x11502["istart"]
                }
                ;_0x11BE2 = _0x11502["bar_index"]
            }
            ;if (typeof _0x11B5E == "function" && _0x11C92 && _0x11C66) {
                _0x11B5E(_0x11C92, _0x11C66)
            }
        },
        getSeqByTime: function(_0x11B32, _0x11B5E) {
            var _0x115B2 = this;
            getAbcParams(_0x11B32, function(_0x11CBE, _0x11DF2) {
                var _0x11D42 = _0x11CBE * _0x11DF2;
                var _0x11D16 = _0x115B2["first"] * _0x11D42;
                var _0x11CEA = (_0x115B2["end"] + 1) * _0x11D42;
                var _0x11C92, _0x11C66;
                var _0x11D6E;
                var _0x11D9A = getNoteData();
                for (var _0x114D6 = 0; _0x114D6 < _0x11D9A["length"]; _0x114D6++) {
                    _0x11D6E = _0x11D9A[_0x114D6];
                    if (_0x11D6E[6] != 0) {
                        continue
                    }
                    ;var _0x11DC6 = _0x11D6E[0];
                    var _0x11E1E = _0x11D6E[1];
                    if (!_0x11C92 && _0x11E1E >= _0x11D16) {
                        _0x11C92 = _0x11DC6
                    }
                    ;if (_0x11E1E < _0x11CEA) {
                        _0x11C66 = _0x11DC6
                    }
                }
                ;if (typeof _0x11B5E == "function") {
                    console["log"]("seqStart: " + _0x11C92 + "," + _0x11C66);
                    _0x11B5E(_0x11C92, _0x11C66)
                }
            })
        }
    };
    w["AbcSel"] = _0x1131E
}(window, document))

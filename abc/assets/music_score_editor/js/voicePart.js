/* voice part */

;;(function(_0x113A2, _0x1134A, _0x11376) {
    "use strict";
    var _0x11E4A = function(_0x11B32, _0x11E76, _0x11EFA, _0x11ECE) {
        this["abcContent"] = _0x11B32;
        this["isShowList"] = false;
        this["isSelPart"] = false;
        this["option"] = {
            txtId: "source"
        };
        if (_0x11ECE && typeof _0x11ECE == "object") {
            for (var _0x11EA2 in _0x11ECE) {
                this["option"][_0x11EA2] = _0x11ECE[_0x11EA2]
            }
        }
        ;if (typeof _0x11EFA == "function") {
            this["partClickCball"] = _0x11EFA
        }
        ;this["initPart"](this["abcContent"]);
        if (typeof _0x11E76 == "function") {
            var _0x11F26 = this["partList"]["length"];
            _0x11E76(_0x11F26 > 2 ? this["partList"] : null)
        }
    };
    _0x11E4A["prototype"] = {
        initPart: function(_0x12002) {
            var _0x12212 = new RegExp("%%staves.*(?=\\n)");
            var _0x12296 = _0x12212["exec"](_0x12002);
            if (!_0x12296) {
                _0x12212 = new RegExp("%%score.*(?=\\n)");
                _0x12296 = _0x12212["exec"](_0x12002)
            }
            ;if (_0x12296) {
                _0x12296 = "\x0A" + _0x12296[0]
            }
            ;var _0x120B2 = _0x12296 && _0x12296["indexOf"]("|") != -1;
            var _0x11F52 = this["getTitleContent"](_0x12002, true);
            var _0x1202E = _0x12002["split"]("\x0A");
            var _0x11F7E = _0x11F52["split"]("\x0A");
            if (!_0x1202E || _0x1202E["length"] == 0 || !_0x11F7E || _0x11F7E["length"] == 0) {
                return
            }
            ;var _0x1223E = new RegExp("V:\\s*[0-9]*");
            var _0x117C2 = false;
            var _0x121BA = {};
            var _0x12162 = {};
            var _0x1210A;
            var _0x11FAA = _0x11F7E[_0x11F7E["length"] - 1];
            var _0x1205A = {};
            for (var _0x114D6 = 0; _0x114D6 < _0x1202E["length"]; _0x114D6++) {
                var _0x11502 = _0x1202E[_0x114D6];
                if (!_0x117C2) {
                    if (_0x11FAA == _0x11502) {
                        _0x117C2 = true;
                        continue
                    }
                }
                ;var _0x11FD6 = _0x1223E["exec"](_0x11502);
                if (_0x11FD6 && _0x11FD6["length"] > 0) {
                    var _0x121E6 = this["replaceAll"](_0x11FD6[0], " ", "");
                    if (_0x121BA[_0x121E6]) {
                        if (_0x11502["indexOf"]("V:") != -1) {
                            if (_0x1205A[_0x11502]) {
                                _0x1210A = _0x121E6;
                                continue
                            }
                            ;_0x1205A[_0x11502] = true
                        }
                        ;_0x121BA[_0x121E6] += "\x0A" + _0x11502
                    } else {
                        _0x1205A[_0x11502] = true;
                        _0x121BA[_0x121E6] = _0x11502
                    }
                    ;_0x1210A = _0x121E6;
                    _0x12162[_0x121E6] = _0x121BA[_0x121E6]
                } else {
                    if (_0x1210A) {
                        _0x121BA[_0x1210A] += "\x0A" + _0x11502;
                        if (_0x11502["indexOf"]("##MIDI") != -1) {
                            _0x12162[_0x1210A] = _0x121BA[_0x1210A]
                        }
                    }
                }
            }
            ;var _0x12086 = "";
            var _0x11ADA = 1;
            this["partList"] = [];
            var _0x120DE = false;
            for (var _0x11EA2 in _0x121BA) {
                _0x12086 += "\x0A" + [_0x121BA[_0x11EA2]];
                var _0x1226A = new RegExp(" nm=\"[^\"]*\"");
                var _0x12136 = _0x1226A["exec"](_0x12162[_0x11EA2]["replaceAll"]("\xA0", " "));
                if (_0x12136) {
                    _0x12136 = _0x12136[0]["substring"](_0x12136[0]["indexOf"]("\"") + 1, _0x12136[0]["length"] - 1)["toString"]()["trim"]()
                }
                ;if (_0x12136 && _0x12136 == "\u94a2\u7434") {
                    _0x120DE = true
                }
                ;this["partList"]["push"]({
                    "head": _0x12162[_0x11EA2],
                    "body": _0x121BA[_0x11EA2],
                    "name": _0x12136 ? _0x12136 : (_0x120DE ? "\u94a2\u7434" : "\u7b2c" + _0x11ADA + "\u58f0\u90e8"),
                    "abc": _0x11F52 + "\x0A" + [_0x121BA[_0x11EA2]],
                    "selected": false,
                    "voice": true
                });
                _0x11ADA++
            }
            ;if (this["partList"]["length"] <= 1) {
                this["partList"]["push"]({
                    "isAll": true,
                    "name": "\u6df7\u58f0",
                    "abc": this["abcContent"],
                    "selected": true
                });
                return
            }
            ;if (this["partList"]["length"] > 0) {
                var _0x1218E = "";
                for (var _0x114D6 = 1; _0x114D6 <= this["partList"]["length"]; _0x114D6++) {
                    _0x1218E += (_0x120B2 ? "|" : "") + _0x114D6 + " "
                }
                ;if (_0x120B2) {
                    _0x1218E = _0x1218E["substring"](1)
                }
                ;if (_0x12002["indexOf"]("%%staves") != -1) {
                    _0x1218E = "\x0A%%staves [" + _0x1218E + "]"
                } else {
                    _0x1218E = "\x0A%%score [" + _0x1218E + "]"
                }
                ;_0x12086 = _0x11F52 + (_0x12296 ? _0x12296 : _0x1218E) + _0x12086;
                if (this["partList"]["length"] > 0) {
                    this["partList"]["push"]({
                        "isAll": true,
                        "name": "\u6df7\u58f0",
                        "abc": this["abcContent"],
                        "selected": true,
                        "voice": true
                    })
                }
            }
        },
        getTitleContent: function(_0x12002) {
            _0x12002 = this["replaceAll"](_0x12002, /w:.[^\n]*\n/g, "");
            var _0x122EE = _0x12002["split"]("\x0A");
            var _0x1231A = "";
            if (_0x122EE != null) {
                var _0x12346 = null;
                var _0x11FD6 = new Array();
                for (var _0x114D6 = 0; _0x114D6 < _0x122EE["length"]; _0x114D6++) {
                    var _0x122C2 = this["replaceAll"](_0x122EE[_0x114D6], /\".*\"/g, "")["replace"](/\{.[^\}]*\}/, "")["replace"](/^\s+|\s+$/gm, "");
                    if (_0x122C2["indexOf"]("%%score") == 0 || _0x122C2["indexOf"]("%%staves") == 0) {
                        continue
                    }
                    ;if (_0x122C2["indexOf"]("V:") >= 0) {
                        _0x12346 = _0x114D6;
                        continue
                    }
                    ;if (_0x122C2["indexOf"]("|") < 0) {
                        if (_0x12346 != null && _0x122C2["indexOf"]("%%MIDI") != -1) {
                            continue
                        }
                        ;_0x11FD6["push"](_0x122EE[_0x114D6])
                    } else {
                        break
                    }
                }
            }
            ;return _0x11FD6["join"]("\x0A")["trim"]()
        },
        replaceAll: function(_0x1231A, _0x12372, _0x1239E) {
            return _0x1231A["replace"](new RegExp(_0x12372,"gm"), _0x1239E)
        },
        getHidePart2json: function(_0x11B32) {
            var _0x12212 = new RegExp("%%staves.*(?=\\n)","g");
            var _0x12296 = _0x11B32["match"](_0x12212);
            if (!_0x12296) {
                _0x12212 = new RegExp("%%score.*(?=\\n)","g");
                _0x12296 = _0x11B32["match"](_0x12212)
            }
            ;if (!_0x12296 || _0x12296["length"] == 0) {
                return null
            }
            ;_0x12212 = new RegExp("[1-9]d*","g");
            var _0x123CA = false;
            var _0x12422 = 0;
            for (var _0x114D6 = 0; _0x114D6 < _0x12296["length"]; _0x114D6++) {
                var _0x11C3A = _0x12296[_0x114D6]["match"](_0x12212);
                if (!_0x11C3A || _0x11C3A["length"] == 0) {
                    continue
                }
                ;if (_0x12422 == 0) {
                    _0x12422 = _0x11C3A["length"];
                    continue
                }
                ;if (_0x12422 != _0x11C3A["length"]) {
                    _0x123CA = true;
                    break
                }
            }
            ;if (!_0x123CA) {
                return null
            }
            ;var _0x1244E = null;
            for (var _0x114D6 = 0; _0x114D6 < _0x12296["length"]; _0x114D6++) {
                var _0x11C3A = _0x12296[_0x114D6]["match"](_0x12212);
                if (!_0x11C3A || _0x11C3A["length"] == 0) {
                    continue
                }
                ;if (_0x1244E == null) {
                    _0x1244E = _0x11C3A;
                    continue
                }
                ;if (_0x1244E["length"] < _0x11C3A["length"]) {
                    _0x1244E = _0x11C3A
                }
            }
            ;var _0x1247A = _0x1244E["join"]("");
            var _0x123F6 = {};
            for (var _0x114D6 = 0; _0x114D6 < _0x12296["length"]; _0x114D6++) {
                var _0x11C3A = _0x12296[_0x114D6]["match"](_0x12212);
                if (!_0x11C3A || _0x11C3A["length"] == 0) {
                    continue
                }
                ;var _0x124A6 = _0x1247A["replace"](_0x11C3A["join"](""), "");
                if (_0x124A6) {
                    var _0x124D2 = _0x124A6["split"]("");
                    for (var _0x11A56 = 0; _0x11A56 < _0x124D2["length"]; _0x11A56++) {
                        _0x123F6[_0x124D2[_0x11A56]] = true
                    }
                }
            }
            ;return _0x123F6
        },
        isOnlyPartExceptHide: function(_0x124FE, _0x12556) {
            var _0x12582 = "";
            var _0x12212 = new RegExp("[1-9]d*","g");
            var _0x11C3A = _0x12556["match"](_0x12212);
            if (!_0x11C3A || _0x11C3A["length"] == 0) {
                return false
            }
            ;var _0x1252A = 0;
            for (var _0x114D6 = 0; _0x114D6 < _0x11C3A["length"]; _0x114D6++) {
                if (_0x124FE == null || !_0x124FE[_0x11C3A[_0x114D6]]) {
                    _0x1252A++
                }
            }
            ;return _0x1252A <= 1
        },
        partClick: function(_0x124A6) {
            var _0x12002 = this["abcContent"];
            var _0x125AE = $("#" + (this["option"]["txtId"] ? this["option"]["txtId"] : "source"))["val"]();
            if (_0x125AE) {
                var _0x12606 = getAbcKeyValue(_0x125AE, "Q:");
                var _0x125DA = getAbcKeyValue(_0x125AE, "K:");
                if (_0x12606) {
                    _0x12002 = setAbcKeyValue(_0x12002, "Q:", _0x12606)
                }
                ;if (_0x125DA) {
                    _0x12002 = setAbcKeyValue(_0x12002, "K:", _0x125DA)
                }
            }
            ;_0x124A6["selected"] = !_0x124A6["selected"];
            this["isSelPart"] = false;
            if (_0x124A6["isAll"]) {
                for (var _0x114D6 = 0; _0x114D6 < this["partList"]["length"]; _0x114D6++) {
                    this["partList"][_0x114D6]["selected"] = this["partList"][_0x114D6]["isAll"] ? true : false
                }
            } else {
                var _0x12212 = new RegExp("%%staves.*(?=\\n)","g");
                var _0x12296 = _0x12002["match"](_0x12212);
                if (!_0x12296) {
                    _0x12212 = new RegExp("%%score.*(?=\\n)","g");
                    _0x12296 = _0x12002["match"](_0x12212)
                }
                ;var _0x124FE = this["getHidePart2json"](_0x12002);
                var _0x126B6 = new Array();
                var _0x1268A = 0;
                var _0x127BE = "";
                for (var _0x114D6 = 0; _0x114D6 < this["partList"]["length"]; _0x114D6++) {
                    if (this["partList"][_0x114D6]["isAll"]) {
                        this["partList"][_0x114D6]["selected"] = false
                    }
                    ;if (this["partList"][_0x114D6]["selected"]) {
                        _0x127BE += " " + (_0x114D6 + 1);
                        _0x126B6["push"](_0x114D6 + 1);
                        _0x1268A++
                    }
                }
                ;if (_0x126B6["length"] <= 0) {
                    if (this["partClickCball"]) {
                        this["partClickCball"](_0x12002)
                    }
                    ;return
                }
                ;var _0x12792 = _0x126B6["join"](" ");
                if (!_0x12296) {
                    if (_0x126B6["length"] > 1) {
                        _0x12002 = "%%score [" + _0x12792 + "]\x0A" + _0x12002
                    } else {
                        if (_0x126B6["length"] == 1) {
                            _0x12002 = "%%score " + _0x12792 + "\x0A" + _0x12002
                        }
                    }
                } else {
                    var _0x1273A, _0x1270E;
                    for (var _0x114D6 = 0; _0x114D6 < _0x12296["length"]; _0x114D6++) {
                        _0x1273A = _0x12296[_0x114D6];
                        var _0x120B2 = _0x1273A["indexOf"]("|") != -1;
                        if (_0x126B6["length"] == 1) {
                            _0x1270E = "%%score " + _0x12792;
                            _0x12002 = _0x12002["replace"](_0x12296[_0x114D6], _0x1270E);
                            continue
                        }
                        ;var _0x126E2 = _0x1273A["indexOf"]("%%score") != -1 ? "%%score " : "%%staves ";
                        var _0x1265E;
                        var _0x124D2 = new Array();
                        var _0x12766 = new Array();
                        var _0x11FD6 = _0x1273A["replace"](_0x126E2, "")["replaceAll"](" ", "")["split"]("");
                        for (var _0x11A56 = 0; _0x11A56 < _0x11FD6["length"]; _0x11A56++) {
                            var _0x124A6 = _0x11FD6[_0x11A56];
                            if ("[]{}"["indexOf"](_0x124A6) == -1) {
                                if (_0x124A6 == "|" && _0x12766["length"] == 0) {
                                    continue
                                }
                                ;if (_0x12792["indexOf"](_0x124A6) != -1) {
                                    _0x12766["push"](_0x124A6)
                                }
                                ;continue
                            }
                            ;if (!_0x1265E) {
                                _0x1265E = _0x124A6;
                                continue
                            }
                            ;if (_0x12766["length"] == 0) {
                                _0x1265E = null;
                                continue
                            }
                            ;var _0x12632 = this["isOnlyPartExceptHide"](_0x124FE, _0x12766["join"](" "));
                            if (_0x12632) {
                                _0x124D2 = _0x124D2["concat"](_0x12766)
                            } else {
                                if (_0x12766[_0x12766["length"] - 1] == "|") {
                                    _0x12766["pop"]()
                                }
                                ;_0x124D2["push"](_0x1265E);
                                _0x124D2 = _0x124D2["concat"](_0x12766);
                                _0x124D2["push"](_0x124A6)
                            }
                            ;_0x1265E = null;
                            _0x12766 = new Array()
                        }
                        ;if (_0x124D2["length"] == 0) {
                            _0x124D2 = _0x12766
                        }
                        ;_0x1270E = _0x126E2 + " " + _0x124D2["join"](" ");
                        console["log"]("stavesNew", _0x1270E);
                        _0x12002 = _0x12002["replace"](_0x12296[_0x114D6], _0x1270E)
                    }
                }
                ;this["isSelPart"] = true;
                $("#" + (this["option"]["txtId"] ? this["option"]["txtId"] : "source"))["val"](_0x12002);
                _0x12002 = replaceBlankNote(_0x12002)
            }
            ;if (this["partClickCball"]) {
                this["partClickCball"](_0x12002)
            }
        }
    };
    _0x113A2["VoicePart"] = _0x11E4A
}(window, document))

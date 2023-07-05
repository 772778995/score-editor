/* play 1 */

var play_index = 0;
var curr_play_time = 0;
var initVol = 1;
var splitVol = 0;
var glo_a_e = null;
var init_glo_a_e = null;
var invisibleM = null;
var staffL = null;
var actionContextDelay = 0;
var notDoTie = false;
var lastV = 0;
var vCount = 0;
var pageNum = 1;
var pageSize = 500;
var pageSeq = new Array();
function AbcPlay(_0x18337) {
    var _0x182C5 = _0x18337, _0x18279 = ToAudio(), _0x1829F, _0x18383, _0x182EB, _0x18253 = {
        get_outputs: function() {
            var _0x1841B, _0x18441 = [];
            if (_0x18383) {
                _0x1841B = _0x18383["get_outputs"]();
                if (_0x1841B) {
                    _0x18441 = _0x1841B
                }
            }
            ;if (_0x1829F) {
                _0x1841B = _0x1829F["get_outputs"]();
                if (_0x1841B) {
                    _0x18441 = _0x18441["concat"](_0x1841B)
                }
            }
            ;return _0x18441
        },
        set_output: _0x183CF,
        clear: _0x18279["clear"],
        add: _0x18279["add"],
        set_sft: _0x183F5,
        set_sfu: function(_0x18467) {
            if (_0x18467 == undefined) {
                return _0x182C5["sfu"]
            }
            ;_0x182C5["sfu"] = _0x18467
        },
        set_speed: function(_0x18467) {
            if (_0x18467 == undefined) {
                return _0x182C5["speed"]
            }
            ;_0x182C5["new_speed"] = _0x18467
        },
        get_speed: function() {
            return _0x182C5["speed"]
        },
        set_vol: function(_0x18467) {
            if (_0x18467 == undefined) {
                return _0x182C5["gain"]
            }
            ;_0x182C5["gain"] = _0x18467;
            if (_0x182EB && _0x182EB["set_vol"]) {
                _0x182EB["set_vol"](_0x18467)
            }
        },
        play: _0x183A9,
        load_instr: function(_0x1848D) {
            _0x1835D(_0x1848D)
        },
        stop: _0x183F5
    };
    function _0x183F5() {}
    function _0x183A9(_0x184FF, _0x184D9, _0x184B3) {
        var _0x1841B, _0x18525 = _0x18253["get_outputs"]();
        if (_0x18525["length"] == 1) {
            _0x1841B = 0
        } else {
            _0x1841B = -1;
            if (typeof (user["abcPlayWay"]) != "undefined") {
                res = user["abcPlayWay"]
            } else {
                res = window["prompt"]("Use \x0A0: " + _0x18525[0] + "\x0A1: " + _0x18525[1] + "?", "0")
            }
            ;if (res) {
                _0x1841B = Number(res);
                if (isNaN(_0x1841B) || _0x1841B < 0 || _0x1841B >= _0x18525["length"]) {
                    _0x1841B = -1
                }
            }
            ;if (!res || _0x1841B < 0) {
                if (_0x182C5["onend"]) {
                    _0x182C5["onend"]()
                }
                ;return
            }
        }
        ;_0x183CF(_0x18525[_0x1841B]);
        _0x18253["play"](_0x184FF, _0x184D9, _0x184B3)
    }
    function _0x183CF(_0x1854B) {
        _0x182EB = _0x1854B == "sf2" ? _0x1829F : _0x18383;
        if (!_0x182EB) {
            return
        }
        ;_0x18253["play"] = _0x182EB["play"];
        _0x18253["stop"] = _0x182EB["stop"];
        if (_0x182EB["set_output"]) {
            _0x182EB["set_output"](_0x1854B)
        }
    }
    _0x182C5["gain"] = 0.8;
    _0x182C5["speed"] = 1;
    (function _0x18311() {
        try {
            if (!localStorage) {
                return
            }
        } catch (e) {
            return
        }
        ;var _0x18467 = localStorage["getItem"]("sfu");
        if (_0x18467) {
            _0x182C5["sfu"] = _0x18467
        }
        ;_0x18467 = localStorage["getItem"]("volume");
        if (_0x18467) {
            _0x182C5["gain"] = Number(_0x18467)
        }
    }
    )();
    if (typeof Midi5 == "function") {
        _0x18383 = Midi5(_0x182C5)
    }
    ;if (typeof Audio5 == "function") {
        _0x1829F = Audio5(_0x182C5)
    }
    ;function _0x1835D() {
        _0x1829F["load_instr"](115)
    }
    return _0x18253
}
function ToAudio() {
    var _0x19DEF = abc2svg["C"], _0x1965D = new Uint8Array([0, 2, 4, 5, 7, 9, 11]), _0x184B3, _0x19E15, _0x19DC9, _0x19E3B;
    return {
        clear: function() {
            var _0x19E61 = _0x184B3;
            _0x184B3 = null;
            return _0x19E61
        },
        add: function(_0x17E51, _0x1B2DD) {
            var _0x1A911 = [], _0x19F6B = [], _0x1A9CF, _0x1B057, _0x17E9D, _0x190DF, _0x18FAF, _0x18F89, _0x18467, _0x1B0EF, _0x1ADAB, _0x1ACA1, _0x1ACED, _0x1ADF7, _0x1AD5F, _0x1AD39, _0x1ADD1, _0x1ACC7, _0x1AD13, _0x1AE1D, _0x1AD85, _0x1B21F, _0x1848D = [], _0x18D9B = _0x17E51;
            function _0x1AFE5() {
                var _0x18467, _0x1B705, _0x18D9B, _0x1B6DF;
                _0x1B057 = _0x1B2DD[0]["temper"];
                _0x1B21F = new Int8Array(_0x1B2DD["length"]);
                for (_0x18467 = 0; _0x18467 < _0x1B2DD["length"]; _0x18467++) {
                    _0x1B705 = _0x1B2DD[_0x18467];
                    _0x1B6DF = _0x1B705["instr"] || 0;
                    if (_0x1B705["midictl"]) {
                        if (_0x1B705["midictl"][32]) {
                            _0x1B6DF += _0x1B705["midictl"][32] * 128
                        }
                        ;if (_0x1B705["midictl"][0]) {
                            _0x1B6DF += _0x1B705["midictl"][0] * 128 * 128
                        }
                    }
                    ;_0x1848D[_0x18467] = _0x1B6DF;
                    _0x18D9B = _0x1B705["clef"];
                    _0x1B21F[_0x18467] = !_0x18D9B["clef_octave"] || _0x18D9B["clef_oct_transp"] ? 0 : _0x18D9B["clef_octave"];
                    _0x1A911[_0x18467] = new Float32Array(70);
                    _0x19F6B[_0x18467] = new Float32Array(70);
                    _0x1B705["key"]["v"] = _0x18467;
                    _0x1A8EB(_0x1B705["key"])
                }
            }
            function _0x1A8EB(_0x18D9B) {
                var _0x17E9D, _0x1B6B9;
                if (_0x18D9B["k_bagpipe"]) {
                    _0x1B6B9 = new Float32Array([2.37, 1.49, 1.53, 2.35, 1.19, 1.51, 1.55])
                } else {
                    _0x1B6B9 = new Float32Array(7);
                    switch (_0x18D9B["k_sf"]) {
                    case 7:
                        _0x1B6B9[6] = 1;
                    case 6:
                        _0x1B6B9[2] = 1;
                    case 5:
                        _0x1B6B9[5] = 1;
                    case 4:
                        _0x1B6B9[1] = 1;
                    case 3:
                        _0x1B6B9[4] = 1;
                    case 2:
                        _0x1B6B9[0] = 1;
                    case 1:
                        _0x1B6B9[3] = 1;
                        break;
                    case -7:
                        _0x1B6B9[3] = -1;
                    case -6:
                        _0x1B6B9[0] = -1;
                    case -5:
                        _0x1B6B9[4] = -1;
                    case -4:
                        _0x1B6B9[1] = -1;
                    case -3:
                        _0x1B6B9[5] = -1;
                    case -2:
                        _0x1B6B9[2] = -1;
                    case -1:
                        _0x1B6B9[6] = -1;
                        break
                    }
                }
                ;for (_0x17E9D = 0; _0x17E9D < 10; _0x17E9D++) {
                    _0x1A911[_0x18D9B["v"]]["set"](_0x1B6B9, _0x17E9D * 7)
                }
                ;_0x19F6B[_0x18D9B["v"]]["set"](_0x1A911[_0x18D9B["v"]])
            }
            function _0x1AC09(_0x18D9B, _0x17E9D) {
                var _0x1B34F = _0x18D9B["notes"][_0x17E9D]
                  , _0x196F5 = _0x1B34F["apit"] + 19
                  , _0x18869 = _0x1B34F["acc"];
                if (_0x1B21F[_0x18D9B["v"]]) {
                    _0x196F5 += _0x1B21F[_0x18D9B["v"]]
                }
                ;if (_0x18869 == 0) {} else {
                    if (_0x18869) {
                        if (_0x18869 == 3) {
                            _0x18869 = 0
                        } else {
                            if (_0x1B34F["micro_n"]) {
                                _0x18869 = (_0x18869 < 0 ? -_0x1B34F["micro_n"] : _0x1B34F["micro_n"]) / _0x1B34F["micro_d"] * 2
                            }
                        }
                        ;_0x1A9CF[_0x196F5] = _0x18869
                    } else {
                        _0x18869 = _0x1A9CF[_0x196F5]
                    }
                }
                ;_0x196F5 = (_0x196F5 / 7 | 0) * 12 + _0x1965D[_0x196F5 % 7] + _0x18869;
                if (typeof _0x18D9B["octave"] != "undefined") {
                    _0x196F5 = _0x196F5 + _0x18D9B["octave"] * 12
                }
                ;if (!_0x1B057 || _0x18869 | 0 != _0x18869) {
                    return _0x196F5
                }
                ;return _0x196F5 + _0x1B057[_0x196F5 % 12]
            }
            function _0x1A2D5(_0x18D9B, _0x1B34F, _0x18F89) {
                if (notDoTie) {
                    return _0x18F89
                }
                ;var _0x190DF, _0x1B329 = _0x18D9B["time"] + _0x18D9B["dur"], _0x1B375 = _0x1B34F["apit"], _0x196F5 = _0x1B375 + 19, _0x18869 = _0x1B34F["acc"];
                if (_0x1B21F[_0x18D9B["v"]]) {
                    _0x196F5 += _0x1B21F[_0x18D9B["v"]]
                }
                ;for (_0x18D9B = _0x18D9B["next"]; ; _0x18D9B = _0x18D9B["next"]) {
                    if (!_0x18D9B) {
                        return _0x18F89
                    }
                    ;if (_0x18D9B == _0x1ACA1) {
                        var _0x18467 = _0x18D9B["v"];
                        _0x18D9B = _0x1ACED["ts_next"];
                        while (_0x18D9B && _0x18D9B["v"] != _0x18467) {
                            _0x18D9B = _0x18D9B["ts_next"]
                        }
                        ;if (!_0x18D9B) {
                            return _0x18F89
                        }
                        ;_0x1B329 = _0x18D9B["time"]
                    }
                    ;if (_0x18D9B["time"] != _0x1B329) {
                        return _0x18F89
                    }
                    ;if (_0x18D9B["type"] == _0x19DEF["NOTE"]) {
                        break
                    }
                }
                ;_0x190DF = _0x18D9B["notes"]["length"];
                for (_0x17E9D = 0; _0x17E9D < _0x190DF; _0x17E9D++) {
                    _0x1B34F = _0x18D9B["notes"][_0x17E9D];
                    if (_0x1B34F["apit"] == _0x1B375) {
                        _0x18F89 += _0x18D9B["dur"] / _0x19E3B;
                        _0x1B34F["ti2"] = true;
                        return _0x1B34F["tie_ty"] ? _0x1A2D5(_0x18D9B, _0x1B34F, _0x18F89) : _0x18F89
                    }
                }
                ;return _0x18F89
            }
            function _0x1A7E1(_0x18D9B) {
                _0x18D9B["v"];
                var _0x1B39B = 0;
                var _0x1B3C1 = elt_ref["source"]["value"]["substring"](_0x18D9B["istart"], _0x18D9B["next"]["istart"]);
                var _0x1B3E7;
                if (_0x1B3C1["indexOf"](")") > -1) {
                    _0x1B3E7 = "right"
                } else {
                    _0x1B3E7 = "left"
                }
                ;if (_0x1B3E7 == "right") {}
                ;var _0x18FD5, _0x17E9D, _0x190DF, _0x18DC1, _0x18F89, _0x1AEB5, _0x1B40D = _0x18D9B["next"];
                if (_0x18D9B["sappo"]) {
                    _0x18F89 = _0x18D9B["extra"]["dur"] / 4;
                    if (_0x18D9B["repeat_times"] == 1) {
                        if (_0x1B3E7 == "left") {
                            _0x1B40D["time"] += _0x18F89;
                            _0x1B40D["dur"] -= _0x18F89;
                            if (syms[_0x1B40D["istart"]]) {
                                syms[_0x1B40D["istart"]]["grace_time"] = _0x18F89
                            }
                            ;_0x1B40D["grace_time"] = _0x18F89;
                            if (_0x1B40D["dur"] <= 0) {
                                _0x1B40D["time"] -= _0x18F89 / 2;
                                _0x1B40D["dur"] = _0x18F89 / 2;
                                if (syms[_0x1B40D["istart"]]) {
                                    syms[_0x1B40D["istart"]]["grace_time"] = _0x18F89 / 2
                                }
                                ;_0x1B40D["grace_time"] = _0x18F89 / 2
                            }
                        } else {}
                    }
                } else {
                    if ((!_0x1B40D || _0x1B40D["type"] != _0x19DEF["NOTE"]) && _0x18D9B["prev"] && _0x18D9B["prev"]["type"] == _0x19DEF["NOTE"]) {
                        if (_0x18D9B["extra"]["next"] && _0x18D9B["extra"]["next"]["grace"]) {
                            _0x18F89 = _0x18D9B["extra"]["dur"];
                            _0x18D9B["prev"]["dur"] = _0x18D9B["prev"]["dur"] - _0x18F89 * 2
                        } else {
                            _0x18F89 = _0x18D9B["extra"]["dur"] / 2;
                            _0x18D9B["prev"]["dur"] = _0x18D9B["prev"]["dur"] - _0x18F89
                        }
                    } else {
                        _0x1B40D["ts_prev"]["ts_next"] = _0x1B40D["ts_next"];
                        _0x1B40D["ts_next"]["ts_prev"] = _0x1B40D["ts_prev"];
                        for (_0x1AEB5 = _0x1B40D["ts_next"]; _0x1AEB5; _0x1AEB5 = _0x1AEB5["ts_next"]) {
                            if (_0x1AEB5["time"] != _0x1B40D["time"]) {
                                _0x1B40D["ts_next"] = _0x1AEB5;
                                _0x1B40D["ts_prev"] = _0x1AEB5["ts_prev"];
                                _0x1B40D["ts_prev"]["ts_next"] = _0x1B40D;
                                _0x1AEB5["ts_prev"] = _0x1B40D;
                                break
                            }
                        }
                        ;if (_0x18D9B["extra"]["next"] && _0x18D9B["extra"]["next"]["grace"]) {
                            _0x18F89 = _0x18D9B["extra"]["dur"]
                        } else {
                            _0x18F89 = _0x18D9B["extra"]["dur"] / 2
                        }
                        ;if (_0x1B3E7 == "left") {
                            if (_0x18D9B["repeat_times"] == 1) {
                                _0x1B40D["time"] += _0x18F89;
                                _0x1B40D["dur"] = _0x1B40D["dur"] - _0x18F89;
                                if (syms[_0x1B40D["istart"]]) {
                                    syms[_0x1B40D["istart"]]["grace_time"] = _0x18F89
                                }
                                ;_0x1B40D["grace_time"] = _0x18F89;
                                if (_0x1B40D["dur"] <= 0) {
                                    _0x1B40D["time"] -= _0x18F89 / 2;
                                    _0x1B40D["dur"] = _0x18F89 / 2;
                                    if (syms[_0x1B40D["istart"]]) {
                                        syms[_0x1B40D["istart"]]["grace_time"] = _0x18F89 / 2
                                    }
                                    ;_0x1B40D["grace_time"] = _0x18F89 / 2
                                }
                            }
                        } else {
                            if (_0x1B3E7 == "right") {}
                        }
                    }
                }
                ;_0x190DF = 0;
                for (_0x18FD5 = _0x18D9B["extra"]; _0x18FD5; _0x18FD5 = _0x18FD5["next"]) {
                    if (_0x18FD5["type"] == _0x19DEF["NOTE"]) {
                        _0x190DF++
                    }
                }
                ;_0x18F89 /= _0x190DF * _0x19E3B;
                if (_0x1B3E7 == "left") {
                    _0x18DC1 = _0x19E15
                } else {
                    if (_0x1B3E7 == "right") {
                        if (_0x18D9B["extra"]["next"] && _0x18D9B["extra"]["next"]["grace"]) {
                            _0x18DC1 = _0x19E15 - _0x18F89 * 2
                        } else {
                            _0x18DC1 = _0x19E15 - _0x18F89
                        }
                    } else {
                        if (_0x1B3E7 == "short") {
                            _0x18DC1 = _0x19E15
                        }
                    }
                }
                ;for (_0x18FD5 = _0x18D9B["extra"]; _0x18FD5; _0x18FD5 = _0x18FD5["next"]) {
                    if (_0x18FD5["type"] != _0x19DEF["NOTE"]) {
                        continue
                    }
                    ;_0x1A807(_0x18FD5, _0x18DC1 + _0x1A5F3 / _0x19E3B, _0x18F89);
                    _0x18DC1 += _0x18F89
                }
            }
            function _0x1A82D() {
                if (invisibleM == null) {
                    var _0x19955 = elt_ref["source"]["value"];
                    var _0x1AC7B = /\!invisible\!(M.*)/;
                    var _0x199C7 = _0x1AC7B["exec"](_0x19955);
                    if (_0x199C7 != null) {
                        var _0x1B66D = _0x199C7[1];
                        invisibleM = new Object();
                        var _0x1B693 = _0x1B66D["replace"]("M:", "")["replace"](/\s/g, "");
                        if (_0x1B693 == "C") {
                            invisibleM["bot"] = 4;
                            invisibleM["top"] = 4
                        } else {
                            if (_0x1B693 == "C|") {
                                invisibleM["bot"] = 2;
                                invisibleM["top"] = 2
                            } else {
                                invisibleM["bot"] = _0x1B693["split"]("/")[1];
                                invisibleM["top"] = _0x1B693["split"]("/")[0]
                            }
                        }
                    }
                    ;_0x199C7 = null;
                    _0x19955 = null
                }
                ;return invisibleM
            }
            function _0x1A853() {
                if (staffL == null) {
                    var _0x19955 = elt_ref["source"]["value"];
                    var _0x1AC7B = /L:(.*)/;
                    var _0x199C7 = _0x1AC7B["exec"](_0x19955);
                    if (_0x199C7 != null) {
                        var _0x1B66D = _0x199C7[1];
                        staffL = new Object();
                        staffL["bot"] = _0x1B66D["split"]("/")[1];
                        staffL["top"] = _0x1B66D["split"]("/")[0]
                    }
                    ;_0x199C7 = null;
                    _0x19955 = null
                }
                ;return staffL
            }
            function _0x1A807(_0x18D9B, _0x18DC1, _0x18F89) {
                if (_0x18D9B["v"] != lastV) {
                    vCount++
                }
                ;lastV = _0x18D9B["v"];
                if (_0x18D9B["p_v"]["meter"]["a_meter"]["length"] == 0) {
                    var _0x1B433 = _0x1A82D();
                    _0x18D9B["p_v"]["meter"]["a_meter"]["push"](_0x1B433);
                    if (_0x1B433 != null) {
                        _0x18D9B["p_v"]["meter"]["wmeasure"] = _0x1A853()["bot"] / _0x1B433["bot"] * _0x1B433["top"] * _0x18D9B["p_v"]["ulen"]
                    }
                }
                ;if (_0x18D9B["v"] == _0x1B0EF && _0x18D9B["p_v"]["meter"]["a_meter"]["length"] > 0) {
                    if (_0x18D9B["grace"]) {} else {
                        if (!_0x18D9B["gliss"] && !_0x18D9B["mordent"]) {
                            if (_0x18D9B["in_tuplet"]) {
                                var _0x19B1D = getSTop(_0x18D9B);
                                _0x1AB25 += _0x18D9B["dur"] / _0x18D9B["p_v"]["meter"]["wmeasure"] * _0x19B1D
                            } else {
                                if (_0x18D9B["p_v"]["meter"]["a_meter"][0] != null) {
                                    var _0x19B1D = getSTop(_0x18D9B);
                                    _0x1AB25 += _0x18D9B["dur_orig"] / _0x18D9B["p_v"]["meter"]["wmeasure"] * _0x19B1D
                                }
                            }
                        }
                    }
                }
                ;if (!_0x18D9B["tie_ty"]) {
                    lty_seq["push"](_0x18D9B)
                }
                ;var _0x1B517 = 0;
                for (var _0x17E9D = 0; _0x17E9D <= _0x18D9B["nhd"]; _0x17E9D++) {
                    var _0x1B34F = _0x18D9B["notes"][_0x17E9D];
                    if (_0x1B34F["ti2"]) {
                        continue
                    }
                    ;var _0x1B47F = new Array();
                    var _0x1B5D5 = new Array();
                    var _0x1B563 = _0x1AC09(_0x18D9B, _0x17E9D);
                    var _0x1B647 = null;
                    if (_0x18D9B["a_dd"]) {
                        _0x1B647 = getA_dd(_0x18D9B, "inst_")
                    }
                    ;if (_0x1B647 != null && _0x1B647["length"] > 0) {
                        for (var _0x18739 = 0; _0x18739 < _0x1B647["length"]; _0x18739++) {
                            var _0x1B621 = _0x1B647[_0x18739];
                            var _0x1B589 = inst_info[_0x1B621];
                            if (_0x1B589) {
                                var _0x1B459 = _0x1B589["inst_code"];
                                var _0x1B5AF = _0x1B589["pitch"];
                                inst = _0x1B459;
                                if (_0x1B5AF != -1) {
                                    _0x1B563 = _0x1B5AF
                                } else {
                                    _0x1B563 = 68
                                }
                                ;_0x1B47F["push"](_0x1B459);
                                _0x1B5D5["push"](_0x1B563)
                            }
                        }
                    }
                    ;if (_0x18D9B["arpeggio_time"] && _0x18D9B["arpeggio_time"] != 0) {
                        var _0x1B53D = false;
                        var _0x1B4A5 = false;
                        if (_0x18D9B["a_gch"]) {
                            for (var _0x18739 = 0; _0x18739 < _0x18D9B["a_gch"]["length"]; _0x18739++) {
                                if (_0x18D9B["a_gch"][_0x18739]["text"]["indexOf"]("(arp") > -1 || _0x18D9B["a_gch"][_0x18739]["text"]["indexOf"]("arp)")) {
                                    for (var _0x17EE9 = 0; _0x17EE9 < arp_links["length"]; _0x17EE9++) {
                                        if (arp_links[_0x17EE9]["s1"] && arp_links[_0x17EE9]["s2"]) {
                                            if (arp_links[_0x17EE9]["s1"]["istart"] == _0x18D9B["istart"] || arp_links[_0x17EE9]["s2"]["istart"] == _0x18D9B["istart"]) {
                                                _0x1B53D = true;
                                                if (arp_links[_0x17EE9]["s1"]["istart"] == _0x18D9B["istart"]) {
                                                    if (arp_links[_0x17EE9]["s1"]["notes"][0]["pit"] < arp_links[_0x17EE9]["s2"]["notes"][0]["pit"]) {
                                                        _0x1B4A5 = true
                                                    } else {
                                                        _0x1B517 = arp_links[_0x17EE9]["s1"]["notes"]["length"] * _0x18D9B["arpeggio_time"]
                                                    }
                                                }
                                                ;if (arp_links[_0x17EE9]["s2"]["istart"] == _0x18D9B["istart"]) {
                                                    if (arp_links[_0x17EE9]["s2"]["notes"][0]["pit"] < arp_links[_0x17EE9]["s1"]["notes"][0]["pit"]) {
                                                        _0x1B4A5 = true
                                                    } else {
                                                        _0x1B517 = arp_links[_0x17EE9]["s2"]["notes"]["length"] * _0x18D9B["arpeggio_time"]
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        ;if (_0x1B53D) {
                            var _0x1B5FB = _0x1B517;
                            if (_0x1B4A5) {
                                _0x184B3["push"](new Float32Array([_0x18D9B["istart"], _0x18DC1, _0x18D9B["my_midi_program"] ? _0x18D9B["my_midi_program"] : _0x1848D[_0x18D9B["v"]], _0x1AC09(_0x18D9B, _0x17E9D), _0x1B34F["tie_ty"] ? _0x1A2D5(_0x18D9B, _0x1B34F, _0x18F89) : _0x18F89, getVoiceVolumn(_0x18D9B["v"]), _0x18D9B["v"]]));
                                if (_0x1B47F != null) {
                                    for (var _0x191C3 = 0; _0x191C3 < _0x1B47F["length"]; _0x191C3++) {
                                        _0x184B3["push"](new Float32Array([_0x18D9B["istart"], _0x18DC1, _0x1B47F[_0x191C3], _0x1B5D5[_0x191C3], _0x1B34F["tie_ty"] ? _0x1A2D5(_0x18D9B, _0x1B34F, _0x18F89) : _0x18F89, getVoiceVolumn(_0x18D9B["v"]), _0x18D9B["v"]]))
                                    }
                                }
                                ;_0x18DC1 += _0x18D9B["arpeggio_time"];
                                _0x18F89 -= _0x18D9B["arpeggio_time"];
                                _0x1B517 += _0x18D9B["arpeggio_time"]
                            } else {
                                if (_0x17E9D == 0) {
                                    _0x18DC1 = _0x18DC1 + _0x1B5FB
                                }
                                ;_0x184B3["push"](new Float32Array([_0x18D9B["istart"], _0x18DC1, _0x18D9B["my_midi_program"] ? _0x18D9B["my_midi_program"] : _0x1848D[_0x18D9B["v"]], _0x1AC09(_0x18D9B, _0x17E9D), _0x1B34F["tie_ty"] ? _0x1A2D5(_0x18D9B, _0x1B34F, _0x18F89) : _0x18F89, getVoiceVolumn(_0x18D9B["v"]), _0x18D9B["v"]]));
                                if (_0x1B47F != null) {
                                    for (var _0x191C3 = 0; _0x191C3 < _0x1B47F["length"]; _0x191C3++) {
                                        _0x184B3["push"](new Float32Array([_0x18D9B["istart"], _0x18DC1, _0x1B47F[_0x191C3], _0x1B5D5[_0x191C3], _0x1B34F["tie_ty"] ? _0x1A2D5(_0x18D9B, _0x1B34F, _0x18F89) : _0x18F89, getVoiceVolumn(_0x18D9B["v"]), _0x18D9B["v"]]))
                                    }
                                }
                                ;_0x18DC1 += _0x18D9B["arpeggio_time"];
                                _0x18F89 -= _0x18D9B["arpeggio_time"]
                            }
                        } else {
                            _0x184B3["push"](new Float32Array([_0x18D9B["istart"], _0x18DC1, _0x18D9B["my_midi_program"] ? _0x18D9B["my_midi_program"] : _0x1848D[_0x18D9B["v"]], _0x1AC09(_0x18D9B, _0x17E9D), _0x1B34F["tie_ty"] ? _0x1A2D5(_0x18D9B, _0x1B34F, _0x18F89) : _0x18F89, getVoiceVolumn(_0x18D9B["v"]), _0x18D9B["v"]]));
                            if (_0x1B47F != null) {
                                for (var _0x191C3 = 0; _0x191C3 < _0x1B47F["length"]; _0x191C3++) {
                                    _0x184B3["push"](new Float32Array([_0x18D9B["istart"], _0x18DC1, _0x1B47F[_0x191C3], _0x1B5D5[_0x191C3], _0x1B34F["tie_ty"] ? _0x1A2D5(_0x18D9B, _0x1B34F, _0x18F89) : _0x18F89, getVoiceVolumn(_0x18D9B["v"]), _0x18D9B["v"]]))
                                }
                            }
                            ;_0x18DC1 += _0x18D9B["arpeggio_time"];
                            _0x18F89 -= _0x18D9B["arpeggio_time"]
                        }
                    } else {
                        var _0x1B4F1 = "";
                        var _0x1B4CB = 115;
                        if (_0x18D9B["a_gch"]) {
                            _0x1B4F1 = getNoteSplText(_0x18D9B);
                            _0x1B4CB = getNoteSplTextMidi(_0x18D9B)
                        }
                        ;if (_0x1B4CB == "") {
                            _0x1B4CB = 115
                        }
                        ;if (_0x1B4F1 != "") {
                            _0x184B3["push"](new Float32Array([_0x18D9B["istart"], _0x18DC1, _0x1B4CB, _0x1AC09(_0x18D9B, _0x17E9D), _0x1B34F["tie_ty"] ? _0x1A2D5(_0x18D9B, _0x1B34F, _0x18F89) : _0x18F89, getVoiceVolumn(_0x18D9B["v"]), _0x18D9B["v"]]))
                        } else {
                            _0x184B3["push"](new Float32Array([_0x18D9B["istart"], _0x18DC1, _0x18D9B["my_midi_program"] ? _0x18D9B["my_midi_program"] : _0x1848D[_0x18D9B["v"]], _0x1AC09(_0x18D9B, _0x17E9D), _0x1B34F["tie_ty"] ? _0x1A2D5(_0x18D9B, _0x1B34F, _0x18F89) : _0x18F89, getVoiceVolumn(_0x18D9B["v"]), _0x18D9B["v"]]));
                            if (_0x1B47F != null) {
                                for (var _0x191C3 = 0; _0x191C3 < _0x1B47F["length"]; _0x191C3++) {
                                    _0x184B3["push"](new Float32Array([_0x18D9B["istart"], _0x18DC1, _0x1B47F[_0x191C3], _0x1B5D5[_0x191C3], _0x1B34F["tie_ty"] ? _0x1A2D5(_0x18D9B, _0x1B34F, _0x18F89) : _0x18F89, getVoiceVolumn(_0x18D9B["v"]), _0x18D9B["v"]]))
                                }
                            }
                        }
                    }
                }
            }
            _0x1AFE5();
            if (!_0x184B3) {
                _0x184B3 = [];
                _0x19DC9 = rep_st_t = _0x19E15 = 0;
                _0x19E3B = _0x19DEF["BLEN"] / 4 * 120 / 60
            } else {
                if (_0x18D9B["time"] < _0x19DC9) {
                    _0x19DC9 = rep_st_t = _0x18D9B["time"]
                }
            }
            ;var _0x1A0E7 = "!D.C.!";
            var _0x1A10D = "!D.C._end!";
            var _0x1A17F = "!D.C.alfine!";
            var _0x1A1A5 = "!D.C.alfine_end!";
            var _0x1A321 = "!D.S.!";
            var _0x1A3B9 = "!D.S.1!";
            var _0x1A405 = "!D.S.2!";
            var _0x1A3DF = "!D.S.1.2!";
            var _0x1A42B = "!D.S.3!";
            var _0x1A347 = "!D.S._end!";
            var _0x1A477 = "!D.S.alfine!";
            var _0x1A49D = "!D.S.alfine_end!";
            var _0x1A6FD = "!fine!";
            var _0x1A723 = "!fine_end!";
            var _0x1AF27 = "!segno!";
            var _0x19F91 = "!coda!";
            var _0x1AC7B = new RegExp("(" + _0x1A0E7 + "|" + _0x1A10D + "|" + _0x1A17F + "|" + _0x1A1A5 + "|" + _0x1A321 + "|" + _0x1A3B9 + "|" + _0x1A405 + "|" + _0x1A42B + "|" + _0x1A347 + "|" + _0x1A477 + "|" + _0x1A49D + ")");
            var _0x19955 = elt_ref["source"]["value"];
            var _0x1A263 = "";
            var _0x1A451 = 0;
            var _0x1A133 = 0;
            var _0x1A1CB = 0;
            var _0x1A36D = 0;
            var _0x1A4C3 = 0;
            var _0x1AF4D = 0;
            var _0x1A749 = 0;
            var _0x1A23D = 0;
            var _0x1A003 = 0;
            var _0x1A5F3 = 0;
            fermata_dur_array = new Array();
            fermataMap = new Map();
            if (_0x19955["match"](_0x1AC7B)) {
                _0x1A263 = _0x19955["match"](_0x1AC7B)[1]
            }
            ;bar_seq = new Array();
            emptyBarCountArr = new Array();
            bar_seq_nometer = new Array();
            lty_seq = new Array();
            var _0x19EF9 = 0;
            var _0x19FB7 = new Array();
            var _0x1B00B = false;
            var _0x1AB25 = 0;
            var _0x1A075 = -1;
            var _0x1B031 = 0;
            var _0x1A5A7 = 0;
            var _0x1A63F = new Array();
            var _0x1A665 = new Array();
            var _0x1B0C9 = 0;
            var _0x1B1D3 = false;
            s_list = new Array();
            var _0x1A9F5 = get_max_field();
            var _0x1A95D;
            pageSeq = new Array();
            var _0x1AB71 = 0;
            var _0x1A8C5 = -1;
            var _0x1A619 = 0;
            var _0x1AE43 = "";
            while (_0x18D9B) {
                _0x1A619 = 0;
                _0x1A5F3 = fermataMap["get"]("fermata" + _0x18D9B["v"]);
                if (!_0x1A5F3) {
                    _0x1A5F3 = 0
                }
                ;if (!_0x1B0EF && _0x1B0EF != 0) {
                    _0x1B0EF = _0x18D9B["v"]
                }
                ;if (_0x18D9B["type"] == 8 || _0x18D9B["type"] == 10) {
                    _0x1AB71++
                }
                ;var _0x19A85 = getPageByS(_0x18D9B);
                if (_0x19A85 != null) {
                    pageSeq["push"](_0x19A85)
                }
                ;if (first_bar_beat == -1 && _0x18D9B["p_v"]["meter"]["a_meter"]["length"] > 0 && _0x18D9B["p_v"]["meter"]["a_meter"][0] != null) {
                    first_bar_beat = _0x18D9B["p_v"]["meter"]["a_meter"][0]["top"]
                }
                ;_0x18D9B["repeat_times"] = (_0x18D9B["repeat_times"] || 0) + 1;
                var _0x1A89F = false;
                if (_0x1A075 != -1 && _0x18D9B["field"] && (_0x18D9B["field"] + "")["indexOf"](_0x1A075) > -1) {
                    _0x1A89F = true
                }
                ;if (!_0x18D9B["field"]) {
                    _0x18D9B["field"] = _0x1A075
                }
                ;if (_0x1AE43 == "ds" || _0x1AE43 == "dc") {
                    _0x18D9B["field"] = -1
                }
                ;if (_0x18D9B["field"] != -1 && _0x1A36D > 0 && !_0x1A89F) {
                    if (_0x18D9B["type"] == _0x19DEF["BAR"]) {
                        if (check_deco(_0x18D9B, "D.S.") || check_deco(_0x18D9B, "D.S._end") || check_deco(_0x18D9B, "D.S.1") || check_deco(_0x18D9B, "D.S.2") || check_deco(_0x18D9B, "D.S.1.2") || check_deco(_0x18D9B, "D.S.2.3") || check_deco(_0x18D9B, "D.S.3")) {
                            _0x1A36D--;
                            if (_0x18D9B["text"]) {
                                if (eq("1,2,3,4,5,6,7,8,9", _0x18D9B["text"][0]["replace"]("\\[", ""))) {
                                    _0x1A075 = _0x18D9B["text"]
                                }
                            }
                            ;_0x18D9B = _0x18D9B["ts_next"];
                            if (_0x18D9B && _0x18D9B["time"]) {
                                _0x19DC9 = _0x18D9B["time"]
                            }
                            ;continue
                        }
                    } else {
                        if (!_0x18D9B["dcs"]) {
                            _0x18D9B = _0x18D9B["ts_next"];
                            if (_0x18D9B && _0x18D9B["time"]) {
                                _0x19DC9 = _0x18D9B["time"]
                            }
                            ;continue
                        }
                    }
                }
                ;if (_0x18D9B["field"] != -1 && _0x18D9B["field"]["indexOf"](_0x1B031) < 0) {
                    if (_0x18D9B["type"] == _0x19DEF["BAR"]) {} else {
                        if (!_0x18D9B["dcs"]) {
                            _0x18D9B = _0x18D9B["ts_next"];
                            if (_0x18D9B && _0x18D9B["time"]) {
                                _0x19DC9 = _0x18D9B["time"]
                            }
                            ;continue
                        }
                    }
                }
                ;if (!_0x18D9B["hasOwnProperty"]("bar_index")) {
                    _0x18D9B["bar_index"] = _0x19EF9
                }
                ;if (_0x18D9B["v"] > 0 && _0x18D9B["type"] == _0x19DEF["BAR"]) {
                    _0x18D9B["bar_index"]--
                }
                ;if (_0x1B00B) {
                    if (_0x18D9B["type"] == _0x19DEF["NOTE"] || _0x18D9B["type"] == _0x19DEF["REST"] || _0x18D9B["type"] == _0x19DEF["GRACE"]) {
                        _0x18D9B = _0x18D9B["ts_next"];
                        _0x19DC9 = _0x18D9B["time"];
                        continue
                    }
                }
                ;if (_0x19FB7["indexOf"](_0x18D9B["istart"]) > -1) {
                    if (_0x1A003 % 2 == 0) {
                        _0x1B00B = true
                    } else {
                        _0x1B00B = false
                    }
                }
                ;if (_0x18D9B["tempo"]) {
                    _0x18F89 = 0;
                    _0x190DF = _0x18D9B["tempo_notes"]["length"];
                    for (_0x17E9D = 0; _0x17E9D < _0x190DF; _0x17E9D++) {
                        _0x18F89 += _0x18D9B["tempo_notes"][_0x17E9D]
                    }
                    ;_0x19E3B = _0x18F89 * _0x18D9B["tempo"] / 60
                }
                ;_0x18FAF = _0x18D9B["time"] - _0x19DC9;
                if (_0x18FAF > 0) {
                    _0x19E15 += _0x18FAF / _0x19E3B;
                    _0x19DC9 = _0x18D9B["time"]
                }
                ;if (_0x18D9B == _0x1ACA1) {
                    if (_0x1ACED) {
                        _0x18D9B = _0x1ACED;
                        _0x19DC9 = _0x18D9B["time"]
                    }
                }
                ;_0x1A9CF = _0x19F6B[_0x18D9B["v"]];
                initVol = initVol + splitVol;
                if (_0x18D9B["a_dd"]) {
                    var _0x1AC2F = _0x18D9B["a_dd"]["find"](function(_0x1B303) {
                        return _0x1B303["name"] == "<(" || _0x1B303["name"] == ">("
                    });
                    if (_0x1AC2F != null) {
                        var _0x1ABBD = _0x18D9B["next"];
                        var _0x1A029 = 1;
                        while (_0x1ABBD) {
                            if (_0x1ABBD["a_dd"]) {
                                var _0x1AC55 = _0x1ABBD["a_dd"]["find"](function(_0x1B303) {
                                    return _0x1B303["name"] == "<)" || _0x1B303["name"] == ">)"
                                });
                                if (_0x1AC55 != null) {
                                    break
                                }
                            }
                            ;if (_0x1ABBD["type"] == _0x19DEF["NOTE"]) {
                                _0x1A029++
                            }
                            ;_0x1ABBD = _0x1ABBD["next"]
                        }
                        ;if (_0x1AC2F["name"] == "<(") {
                            initVol = 0.5;
                            splitVol = 0.5 / _0x1A029
                        } else {
                            if (_0x1AC2F["name"] == ">(") {
                                initVol = 1;
                                splitVol = -0.5 / _0x1A029
                            }
                        }
                    }
                    ;var _0x1AC55 = _0x18D9B["a_dd"]["find"](function(_0x1B303) {
                        return _0x1B303["name"] == "<)" || _0x1B303["name"] == ">)"
                    });
                    if (_0x1AC55 != null) {
                        initVol = 1;
                        splitVol = 0
                    }
                    ;var _0x1ABE3 = _0x18D9B["a_dd"]["find"](function(_0x1B303) {
                        return _0x1B303["glyph"] == "pf"
                    });
                    if (_0x1ABE3 != null) {
                        if (_0x1ABE3["name"] == "ppp") {
                            initVol = 0.2
                        } else {
                            if (_0x1ABE3["name"] == "pp") {
                                initVol = 0.4
                            } else {
                                if (_0x1ABE3["name"] == "p") {
                                    initVol = 0.6
                                } else {
                                    if (_0x1ABE3["name"] == "mp") {
                                        initVol = 0.8
                                    } else {
                                        if (_0x1ABE3["name"] == "mf") {
                                            initVol = 1.0
                                        } else {
                                            if (_0x1ABE3["name"] == "f") {
                                                initVol = 1.2
                                            } else {
                                                if (_0x1ABE3["name"] == "ff") {
                                                    initVol = 1.4
                                                } else {
                                                    if (_0x1ABE3["name"] == "fff") {
                                                        initVol = 1.6
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
                ;s_list["push"](_0x18D9B);
                switch (_0x18D9B["type"]) {
                case _0x19DEF["BAR"]:
                    if (_0x18D9B["v"] != _0x1B0EF) {
                        break
                    }
                    ;if (_0x18D9B["bar_type"] == ":|") {
                        _0x1AE43 = ""
                    }
                    ;var _0x1A76F = false;
                    var _0x1AF73 = false;
                    var _0x1A159 = false;
                    var _0x1A1F1 = false;
                    var _0x1A393 = false;
                    var _0x1A4E9 = false;
                    var _0x19FDD = false;
                    if (check_deco(_0x18D9B, "fine") || check_deco(_0x18D9B, "fine_end")) {
                        if (_0x18D9B["bar_type"] != ":|]" && _0x1A23D > 0) {
                            _0x1A749++;
                            _0x1A76F = true
                        }
                    }
                    ;if (check_deco(_0x18D9B, "segno") || check_deco(_0x18D9B, "segno1") || check_deco(_0x18D9B, "segno12") || check_deco(_0x18D9B, "segno123")) {
                        _0x1AF4D++;
                        _0x1AF73 = true
                    }
                    ;if (check_deco(_0x18D9B, "D.C.") || check_deco(_0x18D9B, "D.C._end")) {
                        if (_0x18D9B["bar_type"][0] != ":") {
                            _0x1A133++;
                            _0x1A23D++;
                            _0x1AE43 = "dc"
                        }
                        ;_0x1A159 = true
                    }
                    ;if (check_deco(_0x18D9B, "D.C.alfine") || check_deco(_0x18D9B, "D.C.alfine_end")) {
                        if (_0x18D9B["bar_type"][0] != ":") {
                            _0x1A1CB++;
                            _0x1A23D++;
                            _0x1AE43 = "dc"
                        }
                        ;_0x1A1F1 = true
                    }
                    ;if ((_0x1A8C5 == -1 || _0x1A8C5 == 0) && (check_deco(_0x18D9B, "D.S.") || check_deco(_0x18D9B, "D.S._end") || check_deco(_0x18D9B, "D.S.1") || check_deco(_0x18D9B, "D.S.2") || check_deco(_0x18D9B, "D.S.1.2") || check_deco(_0x18D9B, "D.S.2.3") || check_deco(_0x18D9B, "D.S.3"))) {
                        if (_0x18D9B["bar_type"][0] != ":") {
                            var _0x1AA1B = 1;
                            if (_0x18D9B["a_dd"]) {
                                for (var _0x17E9D = 0; _0x17E9D < _0x18D9B["a_dd"]["length"]; _0x17E9D++) {
                                    if (_0x18D9B["a_dd"][_0x17E9D]["name"] != "D.S." && _0x18D9B["a_dd"][_0x17E9D]["name"]["indexOf"]("D.S.") == 0) {
                                        var _0x1AFBF = _0x18D9B["a_dd"][_0x17E9D]["name"]["replace"]("D.S.", "");
                                        var _0x1AF99 = _0x1AFBF["split"](".");
                                        for (var _0x18739 = 1; _0x18739 < _0x1AF99["length"]; _0x18739++) {
                                            if (_0x1AF99[_0x18739] != "") {
                                                _0x1AA1B++
                                            }
                                        }
                                        ;break
                                    }
                                }
                            }
                            ;if (!_0x18D9B["ds_exec"]) {
                                _0x18D9B["ds_exec"] = 0
                            }
                            ;if (_0x18D9B["ds_exec"] <= _0x1AA1B) {
                                if (_0x18D9B["ds_exec"] == _0x1AA1B) {
                                    _0x1A36D = 0;
                                    _0x1A23D = 0;
                                    _0x1AE43 = ""
                                } else {
                                    _0x1AE43 = "ds";
                                    _0x1A36D = 1;
                                    _0x1A23D = 1
                                }
                                ;_0x18D9B["ds_exec"]++;
                                _0x1A393 = true
                            }
                        }
                    }
                    ;if (check_deco(_0x18D9B, "D.S.alfine") || check_deco(_0x18D9B, "D.S.alfine_end")) {
                        if (_0x18D9B["bar_type"][0] != ":") {
                            _0x1A4C3++;
                            _0x1A23D++;
                            _0x1AE43 = "ds"
                        }
                        ;_0x1A4E9 = true
                    }
                    ;if (check_deco(_0x18D9B, "coda") && (_0x1A8C5 == -1 || _0x1A8C5 == 0)) {
                        if (_0x19FB7["length"] > 0) {
                            if (_0x19FB7[_0x19FB7["length"] - 1] != _0x18D9B["istart"]) {
                                _0x1A003++;
                                _0x19FB7["push"](_0x18D9B["istart"])
                            }
                        } else {
                            _0x1A003++;
                            _0x19FB7["push"](_0x18D9B["istart"])
                        }
                        ;_0x19FDD = true
                    }
                    ;if (_0x18D9B["repeat_times"] == 1 && _0x18D9B["bar_type"]["length"] > 0 && _0x18D9B["bar_type"][1] == ":") {
                        _0x1A8C5 = 1
                    }
                    ;if (_0x1A8C5 == 1 && (_0x18D9B["bar_type"] == ":|" || _0x18D9B["bar_type"] == "::")) {
                        _0x1A8C5 = 0
                    }
                    ;if (_0x18D9B["v"] == _0x1B0EF) {
                        var _0x19F1F = new Object();
                        var _0x19ED3 = false;
                        _0x19F1F["istart"] = _0x18D9B["istart"];
                        _0x19F1F["beat"] = Math["round"](_0x1AB25 * 100) / 100;
                        _0x19F1F["beat_time"] = _0x19E15;
                        _0x1AB25 = 0;
                        var _0x1AE69 = _0x18D9B["istart"];
                        var _0x19871;
                        for (var _0x17E9D = 0, _0x19F45 = bar_seq["length"]; _0x17E9D < _0x19F45; _0x17E9D++) {
                            _0x19871 = bar_seq[_0x17E9D];
                            if (_0x19871["istart"] == _0x1AE69) {
                                _0x19ED3 = true;
                                _0x19F1F["node_index"] = _0x19871["node_index"];
                                break
                            }
                        }
                        ;if (!_0x19ED3) {
                            if (_0x1AB71 > 0) {
                                _0x19F1F["node_index"] = _0x19EF9++
                            } else {
                                _0x19F1F["node_index"] = _0x19EF9
                            }
                        }
                        ;bar_seq_nometer["push"](_0x19F1F);
                        if (_0x19F1F["beat"] > 0) {
                            if (!_0x19ED3) {
                                _0x19F1F["node_index"] = _0x19F1F["node_index"] - emptyBarCountArr["length"]
                            }
                            ;bar_seq["push"](_0x19F1F)
                        } else {
                            if (_0x18D9B["bar_type"] == "||" && _0x18D9B["bar_type_orig"] == ":|") {} else {
                                if (emptyBarCountArr["indexOf"](_0x19EF9) < 0 && _0x19F1F["node_index"] > 0) {
                                    emptyBarCountArr["push"](_0x19EF9)
                                }
                            }
                        }
                    }
                    ;var _0x1A937 = "";
                    if (_0x18D9B["bar_type"] == "|]" || _0x18D9B["bar_type"] == "||]") {
                        if (check_deco(_0x18D9B, "D.C.alfine") || check_deco(_0x18D9B, "D.C.alfine_end") || (_0x18D9B["next"] && _0x18D9B["repeat_times"] == 1)) {} else {
                            if (_0x1A075 != "" && _0x1A075 != -1) {
                                var _0x1A68B = _0x1A075["split"](".");
                                if (_0x1A68B != null) {
                                    for (var _0x18739 = 0, _0x1A6D7 = _0x1A68B["length"]; _0x18739 < _0x1A6D7; _0x18739++) {
                                        if ($["trim"](_0x1A68B[_0x18739]) != "") {
                                            _0x1A937 = _0x1A68B[_0x18739]
                                        }
                                    }
                                }
                            }
                            ;if (_0x1B031 == parseInt(_0x1A937) || _0x1AE43 == "ds" || _0x1AE43 == "dc") {
                                addRhythm(_0x184B3, user["delay"]["time"], user["delay"]["preNodeNum"], user["delay"]["firstBeatNum"], user["delay"]["onlyPreNode"], user["delay"]["onlyBeat"]);
                                return
                            }
                        }
                    }
                    ;if (_0x18D9B["bar_type"] == "||" || _0x18D9B["bar_type"] == "|]" || _0x18D9B["bar_type"] == "||]" || _0x18D9B["bar_type"] == ":|]" || _0x18D9B["bar_type"] == ":|" || _0x18D9B["bar_type"] == "|:") {
                        _0x1A075 = -1
                    }
                    ;if (_0x18D9B["bar_type"][0] == ":") {
                        if (_0x1B031 != 0) {
                            _0x1A5A7++;
                            _0x1A63F["splice"](_0x1A63F["indexOf"](_0x1B031 + ""), 1);
                            if (_0x1A5A7 >= _0x1A9F5) {
                                _0x1A63F = new Array();
                                _0x1A665 = new Array();
                                _0x1A5A7 = 0;
                                _0x1B031 = 0
                            }
                        }
                        ;if (_0x1A63F["length"] <= 1) {
                            _0x18D9B["bar_type_orig"] = _0x18D9B["bar_type"] + "";
                            if (_0x1A63F["length"] == 1) {
                                if (_0x18D9B["text"] && _0x18D9B["text"] != "") {} else {
                                    _0x18D9B["bar_type"] = "|" + _0x18D9B["bar_type"]["slice"](1)
                                }
                            } else {
                                _0x18D9B["bar_type"] = "|" + _0x18D9B["bar_type"]["slice"](1)
                            }
                        }
                        ;_0x1ACED = _0x18D9B;
                        if (!_0x1ACA1) {
                            _0x1ACA1 = _0x18D9B
                        }
                        ;if (_0x1ADAB) {
                            _0x18D9B = _0x1ADAB;
                            for (_0x18467 = 0,
                            voiceTbLen = _0x1B2DD["length"]; _0x18467 < voiceTbLen; _0x18467++) {
                                _0x19F6B[_0x18467]["set"](_0x1AD5F[_0x18467]);
                                _0x1B21F[_0x18467] = _0x1ADF7[_0x18467]
                            }
                            ;_0x19E3B = _0x1AD39
                        } else {
                            _0x18D9B = _0x17E51;
                            _0x1AFE5()
                        }
                        ;_0x19DC9 = _0x18D9B["time"];
                        if (_0x1A63F["length"] == 0) {
                            _0x1ACA1 = null
                        }
                        ;if (_0x1A159 || _0x1A1F1 || _0x1A393 || _0x1A4E9 || _0x1AF73 || _0x19FDD) {} else {
                            break
                        }
                        ;continue
                    }
                    ;if (_0x18D9B["bar_type"] == "|]" && _0x1A937 != "") {
                        if (_0x1B031 != _0x1A937) {
                            if (_0x18D9B["ts_next"]) {
                                _0x18D9B = _0x18D9B["ts_next"];
                                continue
                            }
                            ;if (_0x1B031 != 0) {
                                _0x1A5A7++;
                                _0x1A63F["splice"](_0x1A63F["indexOf"](_0x1B031 + ""), 1);
                                if (_0x1A5A7 >= _0x1A9F5) {
                                    _0x1A63F = new Array();
                                    _0x1A665 = new Array();
                                    _0x1A5A7 = 0;
                                    _0x1B031 = 0
                                }
                            }
                            ;_0x1ACED = _0x18D9B;
                            if (!_0x1ACA1) {
                                _0x1ACA1 = _0x18D9B
                            }
                            ;if (_0x1ADAB) {
                                _0x18D9B = _0x1ADAB;
                                for (_0x18467 = 0; _0x18467 < _0x1B2DD["length"]; _0x18467++) {
                                    _0x19F6B[_0x18467]["set"](_0x1AD5F[_0x18467]);
                                    _0x1B21F[_0x18467] = _0x1ADF7[_0x18467]
                                }
                                ;_0x19E3B = _0x1AD39
                            } else {
                                _0x18D9B = _0x17E51;
                                _0x1AFE5()
                            }
                            ;_0x19DC9 = _0x18D9B["time"];
                            if (_0x1A63F["length"] == 0) {
                                _0x1ACA1 = null
                            }
                            ;if (_0x1A159 || _0x1A1F1 || _0x1A393 || _0x1A4E9 || _0x1AF73 || _0x19FDD) {} else {
                                break
                            }
                        }
                    }
                    ;if (!_0x18D9B["invis"]) {
                        for (_0x18467 = 0; _0x18467 < _0x1B2DD["length"]; _0x18467++) {
                            _0x19F6B[_0x18467]["set"](_0x1A911[_0x18467])
                        }
                    }
                    ;if (_0x18D9B["type"] == _0x19DEF["BAR"] && _0x18D9B["bar_type"][_0x18D9B["bar_type"]["length"] - 1] == ":") {
                        _0x1AE43 = "bar";
                        if (_0x1B031 != 0 && _0x1B031 > _0x1A5A7) {
                            _0x1A5A7++;
                            _0x1A63F["splice"](_0x1A63F["indexOf"](_0x1B031 + ""), 1);
                            if (_0x1A5A7 >= _0x1A9F5) {
                                _0x1A63F = new Array();
                                _0x1A665 = new Array();
                                _0x1A5A7 = 0;
                                _0x1B031 = 0
                            }
                        }
                        ;_0x1ADAB = _0x18D9B;
                        _0x1ACA1 = null;
                        for (_0x18467 = 0; _0x18467 < _0x1B2DD["length"]; _0x18467++) {
                            if (!_0x1AD5F) {
                                _0x1AD5F = []
                            }
                            ;if (!_0x1AD5F[_0x18467]) {
                                _0x1AD5F[_0x18467] = new Float32Array(70)
                            }
                            ;_0x1AD5F[_0x18467]["set"](_0x19F6B[_0x18467]);
                            if (!_0x1ADF7) {
                                _0x1ADF7 = []
                            }
                            ;_0x1ADF7[_0x18467] = _0x1B21F[_0x18467]
                        }
                        ;_0x1AD39 = _0x19E3B;
                        if (_0x1A159 || _0x1A1F1 || _0x1A393 || _0x1A4E9 || _0x1AF73 || _0x19FDD) {} else {
                            break
                        }
                    } else {
                        if (_0x18D9B["text"]) {
                            if (eq("1,2,3,4,5,6,7,8,9", _0x18D9B["text"][0]["replace"]("\\[", ""))) {
                                _0x1A075 = _0x18D9B["text"];
                                if (_0x1A665["indexOf"](_0x1A075) < 0) {
                                    _0x1A665["push"](_0x1A075);
                                    _0x1A63F = _0x1A63F["concat"](_0x1A075["split"]("."));
                                    _0x1A63F = unique(_0x1A63F["filter"](Boolean));
                                    _0x1A63F["sort"](function(_0x18869, _0x1888F) {
                                        return parseInt(_0x18869) - parseInt(_0x1888F)
                                    })
                                }
                                ;if (_0x1A5A7 == _0x1B031) {
                                    if (_0x1A5A7 == 0) {
                                        if (_0x1A075["replace"]("\\[", "")["indexOf"]("1") != 0) {
                                            var _0x1AB97 = /\d+/;
                                            var _0x1A6B1 = _0x1AB97["exec"](_0x1A075)[0];
                                            _0x1B031 = parseInt(_0x1A6B1) - 1;
                                            _0x1A5A7 = parseInt(_0x1A6B1) - 1
                                        }
                                    }
                                    ;_0x1B031++
                                }
                            }
                        }
                    }
                    ;if (_0x1A159 || _0x1A1F1 || _0x1A393 || _0x1A4E9) {
                        _0x18D9B["dcs"] = 1;
                        if (_0x1A23D == 1) {
                            if (_0x1A1F1) {
                                var _0x1A795 = _0x19955["indexOf"](_0x1A6FD);
                                if (_0x1A795 == -1) {
                                    _0x1A795 = _0x19955["indexOf"](_0x1A723)
                                }
                                ;if (_0x1A795 < 0) {
                                    break
                                }
                            }
                            ;if (_0x1A393 || _0x1A4E9) {
                                if (_0x1AF4D <= 0) {
                                    break
                                }
                            }
                            ;_0x1AD13 = _0x18D9B;
                            if (!_0x1ACC7) {
                                _0x1ACC7 = _0x18D9B
                            }
                            ;if (_0x1ADD1) {
                                _0x18D9B = _0x1ADD1;
                                for (_0x18467 = 0; _0x18467 < _0x1B2DD["length"]; _0x18467++) {
                                    _0x19F6B[_0x18467]["set"](_0x1AD85[_0x18467]);
                                    _0x1B21F[_0x18467] = _0x1AE1D[_0x18467]
                                }
                                ;_0x19E3B = _0x1AD39
                            } else {
                                _0x18D9B = _0x17E51;
                                _0x1AFE5()
                            }
                            ;_0x19DC9 = _0x18D9B["time"]
                        }
                    }
                    ;if (_0x1A76F) {
                        var _0x1A217 = _0x19955["indexOf"](_0x1A17F);
                        if (_0x1A217 == -1) {
                            _0x1A217 = _0x19955["indexOf"](_0x1A1A5)
                        }
                        ;var _0x1A795 = _0x19955["indexOf"](_0x1A6FD);
                        if (_0x1A795 == -1) {
                            _0x1A795 = _0x19955["indexOf"](_0x1A723)
                        }
                        ;var _0x1A50F = _0x19955["indexOf"](_0x1A477);
                        if (_0x1A50F == -1) {
                            _0x1A50F = _0x19955["indexOf"](_0x1A49D)
                        }
                        ;if ((_0x1A217 > -1 && _0x1A217 > _0x1A795) || (_0x1A50F > -1 && _0x1A50F > _0x1A795)) {
                            if (_0x1A749 >= 1) {
                                _0x18D9B = _0x1AD13;
                                if (_0x18D9B) {
                                    _0x19DC9 = _0x18D9B["time"]
                                }
                            } else {
                                if (!_0x1ACC7) {
                                    _0x1ACC7 = _0x18D9B
                                }
                            }
                        } else {
                            if ((_0x1A217 > -1 && _0x1A217 < _0x1A795) || (_0x1A50F > -1 && _0x1A50F < _0x1A795)) {
                                console["log"]("fine\u5728\u540e\u9762")
                            }
                        }
                    }
                    ;if (_0x1AF73 && _0x1AF4D == 1) {
                        _0x1ADD1 = _0x18D9B;
                        for (_0x18467 = 0; _0x18467 < _0x1B2DD["length"]; _0x18467++) {
                            if (!_0x1AD85) {
                                _0x1AD85 = []
                            }
                            ;if (!_0x1AD85[_0x18467]) {
                                _0x1AD85[_0x18467] = new Float32Array(70)
                            }
                            ;_0x1AD85[_0x18467]["set"](_0x19F6B[_0x18467]);
                            if (!_0x1AE1D) {
                                _0x1AE1D = []
                            }
                            ;_0x1AE1D[_0x18467] = _0x1B21F[_0x18467]
                        }
                        ;_0x1AD39 = _0x19E3B
                    }
                    ;break;
                case _0x19DEF["CLEF"]:
                    _0x1B21F[_0x18D9B["v"]] = !_0x18D9B["clef_octave"] || _0x18D9B["clef_oct_transp"] ? 0 : _0x18D9B["clef_octave"];
                    break;
                case _0x19DEF["GRACE"]:
                    _0x1A7E1(_0x18D9B);
                    break;
                case _0x19DEF["KEY"]:
                    _0x1A8EB(_0x18D9B);
                    break;
                case _0x19DEF["METER"]:
                    try {
                        _0x18D9B["next"]["p_v"]["meter"] = _0x18D9B
                    } catch (e) {}
                    ;break;
                case _0x19DEF["REST"]:
                    if (_0x18D9B["v"] == _0x1B0EF && _0x18D9B["p_v"]["meter"]["a_meter"]["length"] > 0 && _0x18D9B["p_v"]["meter"]["a_meter"][0] != null) {
                        var _0x19B1D = getSTop(_0x18D9B);
                        _0x1AB25 += _0x18D9B["dur"] / _0x18D9B["p_v"]["meter"]["wmeasure"] * _0x19B1D
                    }
                    ;
                case _0x19DEF["NOTE"]:
                    if (check_deco(_0x18D9B, "fermata")) {
                        if (elt_ref["source"]["value"]["indexOf"]("V:9") > -1) {} else {
                            var _0x19A5F = syms[_0x18D9B["istart"]];
                            if (_0x19A5F["fermatatime"]) {
                                _0x1A619 = _0x18D9B["dur"] * (parseFloat(_0x19A5F["fermatatime"]) - 1);
                                _0x18D9B["dur"] = _0x18D9B["dur"] * parseFloat(_0x19A5F["fermatatime"]);
                                _0x18D9B["dur_orig"] = _0x18D9B["dur_orig"] * parseFloat(_0x19A5F["fermatatime"])
                            }
                        }
                    }
                    ;_0x18F89 = _0x18D9B["dur"];
                    if (_0x18D9B["a_ly"]) {
                        for (var _0x17E9D = 0; _0x17E9D < _0x18D9B["a_ly"]["length"]; _0x17E9D++) {}
                    }
                    ;if (_0x18D9B["next"] && _0x18D9B["next"]["type"] == _0x19DEF["GRACE"]) {
                        _0x18FAF = 0;
                        if (_0x18D9B["next"]["sappo"]) {
                            _0x18FAF = _0x19DEF["BLEN"] / 16
                        } else {
                            if (!_0x18D9B["next"]["next"] || _0x18D9B["next"]["next"]["type"] != _0x19DEF["NOTE"]) {
                                _0x18FAF = _0x18F89 / 2
                            }
                        }
                    }
                    ;if (_0x18D9B["next"] && _0x18D9B["next"]["a_dd"]) {
                        for (var _0x17E9D = 0; _0x17E9D < _0x18D9B["next"]["a_dd"]["length"]; _0x17E9D++) {
                            if (_0x18D9B["next"]["a_dd"][_0x17E9D]["name"] == "uppermordent" || _0x18D9B["next"]["a_dd"][_0x17E9D]["name"] == "mordent") {
                                _0x18D9B["tie_ty"] = null;
                                for (var _0x17EE9 = 0; _0x17EE9 <= _0x18D9B["nhd"]; _0x17EE9++) {
                                    _0x18D9B["notes"][_0x17EE9]["tie_ty"] = null
                                }
                            }
                        }
                    }
                    ;if (_0x18D9B["next"] && _0x18D9B["next"]["type"] == _0x19DEF["GRACE"]) {
                        _0x18D9B["tie_ty"] = null;
                        for (var _0x17EE9 = 0; _0x17EE9 <= _0x18D9B["nhd"]; _0x17EE9++) {
                            _0x18D9B["notes"][_0x17EE9]["tie_ty"] = null
                        }
                    }
                    ;_0x18F89 /= _0x19E3B;
                    _0x18D9B["pdur"] = _0x18F89;
                    if (syms[_0x18D9B["istart"]]) {
                        syms[_0x18D9B["istart"]]["pdur"] = _0x18F89
                    }
                    ;if (_0x18D9B["type"] == _0x19DEF["NOTE"]) {
                        var _0x1AA41 = "";
                        var _0x1B245 = "";
                        var _0x1A2FB = "";
                        if (_0x18D9B["a_dd"]) {
                            for (var _0x17E9D = 0; _0x17E9D < _0x18D9B["a_dd"]["length"]; _0x17E9D++) {
                                if (_0x18D9B["a_dd"][_0x17E9D]["name"] == "uppermordent") {
                                    _0x1AA41 = "uppermordent";
                                    continue
                                }
                                ;if (_0x18D9B["a_dd"][_0x17E9D]["name"] == "mordent") {
                                    _0x1AA41 = "mordent";
                                    continue
                                }
                                ;if (_0x18D9B["a_dd"][_0x17E9D]["name"] == "trill") {
                                    _0x1B245 = "trill";
                                    continue
                                }
                                ;if (_0x18D9B["a_dd"][_0x17E9D]["name"] == "dot") {
                                    _0x1A2FB = true;
                                    _0x18D9B["dotNote"] = 1;
                                    if (_0x18D9B["istart"] && syms[_0x18D9B["istart"]]) {
                                        syms[_0x18D9B["istart"]]["dotNote"] = 1
                                    }
                                }
                            }
                        }
                        ;if (_0x1AA41 != "") {
                            var _0x1B0A3 = _0x19E15 + _0x1A5F3 / _0x19E3B + 0;
                            var _0x1AE8F = abc["clone"](_0x18D9B, 2);
                            _0x1AE8F["dur"] = _0x1AE8F["dur_orig"] / 8;
                            _0x1AE8F["notes"][0]["dur"] = _0x1AE8F["dur"];
                            _0x1AE8F["tie_ty"] = null;
                            _0x1AE8F["notes"][0]["tie_ty"] = null;
                            _0x1AE8F["mordent"] = 1;
                            _0x1AE8F["trill"] = 1;
                            _0x1A807(_0x1AE8F, _0x1B0A3, _0x1AE8F["dur"] / _0x19E3B);
                            var _0x1AEB5 = abc["clone"](_0x18D9B, 2);
                            _0x1AEB5["dur"] = _0x1AEB5["dur_orig"] / 8;
                            _0x1AEB5["notes"][0]["dur"] = _0x1AEB5["dur"];
                            _0x1AEB5["tie_ty"] = null;
                            _0x1AEB5["notes"][0]["tie_ty"] = null;
                            _0x1AEB5["mordent"] = 1;
                            _0x1AEB5["trill"] = 1;
                            if (_0x1AA41 == "uppermordent") {
                                _0x1AEB5["notes"][0]["apit"] = parseInt(_0x1AEB5["notes"][0]["apit"]) + 1;
                                _0x1AEB5["notes"][0]["pit"] = parseInt(_0x1AEB5["notes"][0]["pit"]) + 1
                            } else {
                                if (_0x1AA41 == "mordent") {
                                    _0x1AEB5["notes"][0]["apit"] = parseInt(_0x1AEB5["notes"][0]["apit"]) - 1;
                                    _0x1AEB5["notes"][0]["pit"] = parseInt(_0x1AEB5["notes"][0]["pit"]) - 1
                                }
                            }
                            ;_0x1B0A3 = _0x1B0A3 + _0x1AE8F["dur"] / _0x19E3B;
                            _0x1A807(_0x1AEB5, _0x1B0A3, _0x1AEB5["dur"] / _0x19E3B);
                            _0x1B0A3 = _0x1B0A3 + _0x1AEB5["dur"] / _0x19E3B;
                            _0x18D9B["dur"] = _0x18D9B["dur_orig"] - _0x1AE8F["dur"] - _0x1AEB5["dur"];
                            _0x18D9B["notes"][0]["dur"] = _0x18D9B["dur"];
                            _0x18F89 = _0x18D9B["dur"] / _0x19E3B;
                            _0x18D9B["trill"] = 1;
                            _0x1A807(_0x18D9B, _0x1B0A3, _0x18F89);
                            break
                        }
                        ;if (_0x1B1D3) {
                            _0x1B245 = "trill"
                        }
                        ;if (_0x1B245 != "") {
                            var _0x1B13B = _0x18D9B["dur"] / _0x19E3B;
                            var _0x1B291 = _0x18D9B["p_v"]["ulen"] / _0x19E3B;
                            var _0x1B187 = 0;
                            var _0x1B1AD = _0x1B291 / 4;
                            if (_0x1B1AD < 0.0625) {
                                _0x1B1AD = 0.0625
                            }
                            ;if (_0x1B1AD > 0.125) {
                                _0x1B1AD = 0.125
                            }
                            ;var _0x1B115 = 0;
                            if (_0x18D9B["tie_ty"]) {
                                _0x1B1D3 = true
                            }
                            ;if (_0x1B13B >= 0.125) {
                                var _0x1B1F9 = parseInt(_0x1B13B / _0x1B1AD);
                                var _0x1B161 = _0x19E3B * _0x1B1AD;
                                var _0x1B0A3 = _0x19E15 + _0x1A5F3 / _0x19E3B;
                                while (_0x18D9B["dur"] > 0) {
                                    var _0x1AE8F = abc["clone"](_0x18D9B, 2);
                                    _0x1AE8F["dur"] = _0x1B161;
                                    _0x1AE8F["notes"][0]["dur"] = _0x1AE8F["dur"];
                                    if ((_0x18D9B["dur"] - _0x1B161) > 0) {
                                        _0x1AE8F["tie_ty"] = null;
                                        _0x1AE8F["notes"][0]["tie_ty"] = null
                                    }
                                    ;if (_0x1B187 % 2 == 1) {
                                        _0x1AE8F["notes"][0]["apit"] = parseInt(_0x1AE8F["notes"][0]["apit"]) + 1;
                                        _0x1AE8F["notes"][0]["pit"] = parseInt(_0x1AE8F["notes"][0]["pit"]) + 1
                                    }
                                    ;_0x1AE8F["trill"] = 1;
                                    _0x1A807(_0x1AE8F, _0x1B0A3, _0x1AE8F["dur"] / _0x19E3B);
                                    _0x18D9B["dur"] = _0x18D9B["dur"] - _0x1B161;
                                    _0x1B161 = parseInt(_0x19E3B * _0x1B1AD);
                                    _0x1B187++;
                                    _0x1B0A3 = _0x1B0A3 + _0x1AE8F["dur"] / _0x19E3B
                                }
                                ;if (!_0x18D9B["tie_ty"]) {
                                    _0x1B1D3 = false
                                }
                                ;_0x18D9B["dur"] = _0x18D9B["dur_orig"];
                                break
                            }
                        }
                        ;var _0x1A879 = false;
                        if (_0x18D9B["notes"][0]["a_dcn"] && _0x18D9B["notes"][0]["a_dcn"]["length"] > 0) {
                            var _0x1B0A3 = _0x19E15 + _0x1A5F3 / _0x19E3B;
                            for (var _0x17E9D = 0; _0x17E9D < _0x18D9B["notes"][0]["a_dcn"]["length"]; _0x17E9D++) {
                                var _0x1854B = _0x18D9B["notes"][0]["a_dcn"][_0x17E9D];
                                if (_0x1854B == "~(") {
                                    var _0x1A09B = _0x18D9B["notes"][0]["pit"];
                                    var _0x1A04F = _0x18D9B["dur"];
                                    var _0x1A0C1 = _0x1AC09(_0x18D9B, 0);
                                    var _0x1A9A9 = _0x1A0C1;
                                    var _0x1AAD9 = _0x18D9B["next"];
                                    var _0x1A983 = _0x18D9B;
                                    var _0x1AA8D = 0;
                                    while (_0x1AAD9) {
                                        if (_0x1AAD9["type"] == 8) {
                                            break
                                        }
                                        ;_0x1AAD9 = _0x1AAD9["next"]
                                    }
                                    ;if (_0x1AAD9) {
                                        var _0x1AAB3 = _0x1AAD9["notes"][0]["pit"];
                                        var _0x1AAFF = _0x1AC09(_0x1AAD9, 0);
                                        var _0x19EAD = 0;
                                        if (_0x1A0C1 != _0x1AAFF) {
                                            var _0x1A289 = _0x1AAFF - _0x1A0C1;
                                            var _0x19E87 = Math["abs"](_0x1A289);
                                            var _0x1A2AF = _0x1A289 / _0x19E87;
                                            for (var _0x18739 = 0; _0x18739 < _0x19E87; _0x18739++) {
                                                var _0x1AE8F = abc["clone"](_0x1A983, 5);
                                                if (_0x18739 == 0) {
                                                    _0x1AE8F["dur"] = _0x1AE8F["dur"] / _0x19E87;
                                                    _0x1AE8F["notes"][0]["dur"] = _0x1AE8F["dur"]
                                                }
                                                ;if (_0x18739 > 0) {
                                                    if (!_0x1A983["notes"][0]["acc"] || _0x1A983["notes"][0]["acc"] == 0) {
                                                        if (_0x1A2AF > 0) {
                                                            _0x1AE8F["notes"][0]["acc"] = 1
                                                        } else {
                                                            _0x1AE8F["notes"][0]["acc"] = -1
                                                        }
                                                        ;var _0x1AEB5 = abc["clone"](_0x1A983, 5);
                                                        _0x1AEB5["notes"][0]["apit"] += _0x1A2AF;
                                                        _0x1AEB5["notes"][0]["pit"] += _0x1A2AF;
                                                        if (_0x1AC09(_0x1AE8F, 0) == _0x1AC09(_0x1AEB5, 0)) {
                                                            _0x1AE8F["notes"][0]["acc"] = 0;
                                                            _0x1AE8F["notes"][0]["apit"] += _0x1A2AF;
                                                            _0x1AE8F["notes"][0]["pit"] += _0x1A2AF;
                                                            _0x19EAD++
                                                        } else {}
                                                    } else {
                                                        _0x1AE8F["notes"][0]["acc"] = 0;
                                                        _0x1AE8F["notes"][0]["apit"] += _0x1A2AF;
                                                        _0x1AE8F["notes"][0]["pit"] += _0x1A2AF;
                                                        _0x19EAD++
                                                    }
                                                    ;_0x1AE8F["gliss"] = 1
                                                }
                                                ;_0x1A807(_0x1AE8F, _0x1B0A3, _0x1AE8F["dur"] / _0x19E3B);
                                                _0x1B0A3 = _0x1B0A3 + _0x1AE8F["dur"] / _0x19E3B;
                                                _0x1A9A9 = _0x1AC09(_0x1AE8F, 0);
                                                _0x1A983 = _0x1AE8F
                                            }
                                        }
                                        ;_0x1A879 = true
                                    }
                                }
                            }
                        }
                        ;if (_0x1A879) {
                            break
                        }
                        ;if (check_deco(_0x18D9B, "turn") || check_deco(_0x18D9B, "invertedturn")) {
                            var _0x1B07D = _0x18D9B["dur"];
                            var _0x1B2B7 = _0x18D9B["p_v"]["ulen"];
                            var _0x1B26B = 0;
                            if (_0x1B07D > _0x1B2B7) {
                                _0x1B26B = _0x1B2B7 / 4
                            } else {
                                _0x1B26B = _0x1B07D / 4
                            }
                            ;var _0x1AE8F = abc["clone"](_0x18D9B, 2);
                            _0x1AE8F["dur"] = _0x1B26B;
                            _0x1AE8F["notes"][0]["dur"] = _0x1AE8F["dur"];
                            _0x1AE8F["tie_ty"] = null;
                            _0x1AE8F["notes"][0]["tie_ty"] = null;
                            if (check_deco(_0x18D9B, "turn")) {
                                _0x1AE8F["notes"][0]["apit"] += 1;
                                _0x1AE8F["notes"][0]["pit"] += 1
                            } else {
                                if (check_deco(_0x18D9B, "invertedturn")) {
                                    _0x1AE8F["notes"][0]["apit"] -= 1;
                                    _0x1AE8F["notes"][0]["pit"] -= 1
                                }
                            }
                            ;_0x1A807(_0x1AE8F, _0x19E15 + _0x1A5F3 / _0x19E3B, _0x1AE8F["dur"] / _0x19E3B);
                            var _0x1AEB5 = abc["clone"](_0x18D9B, 2);
                            _0x1AEB5["dur"] = _0x1B26B;
                            _0x1AEB5["notes"][0]["dur"] = _0x1AEB5["dur"];
                            _0x1AEB5["tie_ty"] = null;
                            _0x1AEB5["notes"][0]["tie_ty"] = null;
                            _0x1A807(_0x1AEB5, _0x19E15 + _0x1A5F3 / _0x19E3B + _0x1AE8F["dur"] / _0x19E3B, _0x1AEB5["dur"] / _0x19E3B);
                            var _0x1AEDB = abc["clone"](_0x18D9B, 2);
                            _0x1AEDB["dur"] = _0x1B26B;
                            _0x1AEDB["notes"][0]["dur"] = _0x1AEDB["dur"];
                            _0x1AEDB["tie_ty"] = null;
                            _0x1AEDB["notes"][0]["tie_ty"] = null;
                            if (check_deco(_0x18D9B, "turn")) {
                                _0x1AEDB["notes"][0]["apit"] -= 1;
                                _0x1AEDB["notes"][0]["pit"] -= 1
                            } else {
                                if (check_deco(_0x18D9B, "invertedturn")) {
                                    _0x1AEDB["notes"][0]["apit"] += 1;
                                    _0x1AEDB["notes"][0]["pit"] += 1
                                }
                            }
                            ;_0x1A807(_0x1AEDB, _0x19E15 + _0x1A5F3 / _0x19E3B + (_0x1AE8F["dur"] / _0x19E3B) * 2, _0x1AEDB["dur"] / _0x19E3B);
                            var _0x1AF01 = abc["clone"](_0x18D9B, 2);
                            _0x1AF01["dur"] = _0x18D9B["dur"] - _0x1B26B * 3;
                            _0x1AF01["notes"][0]["dur"] = _0x1AF01["dur"];
                            _0x1A807(_0x1AF01, _0x19E15 + _0x1A5F3 / _0x19E3B + (_0x1AE8F["dur"] / _0x19E3B) * 3, _0x1AF01["dur"] / _0x19E3B);
                            break
                        }
                        ;if (check_deco(_0x18D9B, "arpeggio") || check_deco(_0x18D9B, "arpeggioup") || check_deco(_0x18D9B, "arpeggiodown")) {
                            _0x18D9B["arpeggio_time"] = _0x18F89 / 4;
                            if (_0x18D9B["arpeggio_time"] > 0.0875) {
                                _0x18D9B["arpeggio_time"] = 0.0875
                            }
                            ;if (check_deco(_0x18D9B, "arpeggiodown")) {
                                _0x18D9B["notes"]["sort"](function(_0x18869, _0x1888F) {
                                    return _0x1888F["pit"] - _0x18869["pit"]
                                })
                            } else {
                                _0x18D9B["notes"]["sort"](function(_0x18869, _0x1888F) {
                                    return _0x18869["pit"] - _0x1888F["pit"]
                                })
                            }
                        }
                        ;if (_0x18D9B["trem1"]) {
                            var _0x1A55B = 48;
                            var _0x1A535 = 96;
                            var _0x1A581 = 192;
                            var _0x1AA67 = 0;
                            switch (_0x18D9B["ntrem"]) {
                            case 1:
                                _0x1AA67 = _0x1A581;
                                break;
                            case 2:
                                _0x1AA67 = _0x1A535;
                                break;
                            case 3:
                                _0x1AA67 = _0x1A55B;
                                break
                            }
                            ;if (_0x18D9B["trem_type"]) {
                                var _0x1B0A3 = 0;
                                var _0x1AAD9 = _0x18D9B["next"];
                                while (_0x1AAD9 && _0x1AAD9["type"] != _0x19DEF["NOTE"]) {
                                    _0x1AAD9 = _0x1AAD9["next"]
                                }
                                ;if (_0x1AAD9) {
                                    _0x1AAD9["ignore"] = true;
                                    while (_0x18D9B["dur"] > 0) {
                                        var _0x1AE8F = abc["clone"](_0x18D9B, 1);
                                        _0x1AE8F["dur"] = _0x1AA67;
                                        _0x1AE8F["notes"]["forEach"](function(_0x1B303) {
                                            _0x1B303["dur"] = _0x1AA67
                                        });
                                        _0x18D9B["dur"] -= _0x1AA67;
                                        _0x1A807(_0x1AE8F, _0x19E15 + _0x1B0A3 + _0x1A5F3 / _0x19E3B, _0x1AE8F["dur"] / _0x19E3B);
                                        _0x1B0A3 += _0x1AE8F["dur"] / _0x19E3B;
                                        var _0x1AEB5 = abc["clone"](_0x1AAD9, 5);
                                        _0x1AEB5["dur"] = _0x1AA67;
                                        _0x1AEB5["notes"]["forEach"](function(_0x1B303) {
                                            _0x1B303["dur"] = _0x1AA67
                                        });
                                        _0x1AAD9["dur"] -= _0x1AA67;
                                        _0x1A807(_0x1AAD9, _0x19E15 + _0x1B0A3 + _0x1A5F3 / _0x19E3B, _0x1AEB5["dur"] / _0x19E3B);
                                        _0x1B0A3 += _0x1AEB5["dur"] / _0x19E3B
                                    }
                                }
                            } else {
                                var _0x1B0A3 = 0;
                                while (_0x18D9B["dur"] >= _0x1AA67) {
                                    var _0x1AE8F = abc["clone"](_0x18D9B, 2);
                                    _0x1AE8F["dur"] = _0x1AA67;
                                    _0x1AE8F["notes"]["forEach"](function(_0x1B303) {
                                        _0x1B303["dur"] = _0x1AA67
                                    });
                                    _0x18D9B["dur"] -= _0x1AA67;
                                    _0x18D9B["notes"]["forEach"](function(_0x1B303) {
                                        _0x1B303["dur"] -= _0x1AA67
                                    });
                                    _0x1A807(_0x1AE8F, _0x19E15 + _0x1B0A3 + _0x1A5F3 / _0x19E3B, _0x1AE8F["dur"] / _0x19E3B);
                                    _0x1B0A3 += _0x1AE8F["dur"] / _0x19E3B
                                }
                                ;if (_0x18D9B["dur"] <= 0) {
                                    break
                                }
                            }
                        }
                        ;if (!_0x18D9B["ignore"]) {
                            var _0x1AB4B = elt_ref["source"]["value"]["substring"](_0x18D9B["istart"], _0x18D9B["iend"]);
                            _0x1AB4B = _0x1AB4B["replaceAll"]("/", "")["replaceAll"](",", "")["replaceAll"]("\'", "")["replace"](/\d/g, "");
                            if (abc["isExtend2Char"](_0x1AB4B)) {
                                var _0x1A5CD = abc["getExtendObject"](_0x1AB4B);
                                if (_0x18D9B["v"] == _0x1B0EF && _0x18D9B["p_v"]["meter"]["a_meter"]["length"] > 0) {
                                    if (_0x18D9B["grace"]) {} else {
                                        if (!_0x18D9B["gliss"] && !_0x18D9B["mordent"]) {
                                            if (_0x18D9B["in_tuplet"]) {
                                                var _0x19B1D = getSTop(_0x18D9B);
                                                _0x1AB25 += _0x18D9B["dur"] / _0x18D9B["p_v"]["meter"]["wmeasure"] * _0x19B1D
                                            } else {
                                                var _0x19B1D = getSTop(_0x18D9B);
                                                _0x1AB25 += _0x18D9B["dur_orig"] / _0x18D9B["p_v"]["meter"]["wmeasure"] * _0x19B1D
                                            }
                                        }
                                    }
                                }
                                ;_0x184B3["push"](new Float32Array([_0x18D9B["istart"], _0x19E15 + _0x1A5F3 / _0x19E3B, _0x1A5CD["instr"], _0x1A5CD["pitch"], _0x18F89, 1, _0x18D9B["v"]]))
                            } else {
                                var _0x1933F = 0;
                                if (_0x18D9B["ts_prev"] && _0x18D9B["ts_prev"]["grace_time"] && _0x18D9B["v"] > _0x18D9B["ts_prev"]["v"]) {
                                    _0x1933F = _0x18D9B["ts_prev"]["grace_time"] / _0x19E3B
                                }
                                ;_0x1A807(_0x18D9B, _0x19E15 + _0x1A5F3 / _0x19E3B - _0x1933F, _0x18F89)
                            }
                        }
                    } else {
                        var _0x1AB4B = elt_ref["source"]["value"]["substring"](_0x18D9B["istart"], _0x18D9B["iend"]);
                        _0x1AB4B = _0x1AB4B["replaceAll"]("/", "")["replaceAll"](",", "")["replaceAll"]("\'", "")["replace"](/\d/g, "");
                        if (abc["isExtendChar"](_0x1AB4B)) {
                            var _0x1A5CD = abc["getExtendObject"](_0x1AB4B);
                            _0x184B3["push"](new Float32Array([_0x18D9B["istart"], _0x19E15 + _0x1A5F3 / _0x19E3B, _0x1A5CD["instr"], _0x1A5CD["pitch"], _0x18F89, 1, _0x18D9B["v"]]))
                        } else {
                            _0x184B3["push"](new Float32Array([_0x18D9B["istart"], _0x19E15 + _0x1A5F3 / _0x19E3B, 0, 0, _0x18F89, 0, _0x18D9B["v"]]))
                        }
                    }
                    ;if (_0x1A619 > 0) {
                        var _0x1A7BB = fermataMap["get"]("fermate" + _0x18D9B["v"]);
                        if (!_0x1A7BB) {
                            _0x1A7BB = 0
                        }
                        ;_0x1A5F3 = _0x1A7BB + _0x1A619;
                        fermataMap["set"]("fermata" + _0x18D9B["v"], _0x1A5F3)
                    }
                    ;break;
                case _0x19DEF["STAVES"]:
                    _0x1B0EF = _0x18D9B["sy"]["top_voice"];
                    break
                }
                ;if (_0x18D9B) {
                    _0x18D9B = _0x18D9B["ts_next"]
                }
            }
            ;addRhythm(_0x184B3, user["delay"]["time"], user["delay"]["preNodeNum"], user["delay"]["firstBeatNum"], user["delay"]["onlyPreNode"], user["delay"]["onlyBeat"])
        }
    }
}
var lastSLineNum = -1;
function getPageByS(_0x18D9B) {
    if (!_0x18D9B || !_0x18D9B["istart"]) {
        return null
    }
    ;var _0x19A5F = syms[_0x18D9B["istart"]];
    if (_0x19A5F && (lastSLineNum != _0x19A5F["my_line"]) && (_0x18D9B["type"] == 10 || _0x18D9B["type"] == 8)) {
        lastSLineNum = _0x19A5F["my_line"];
        var _0x19AAB = new Object();
        var _0x19AD1 = $("._" + _0x18D9B["istart"] + "_");
        var _0x19AF7 = $(_0x19AD1)["parents"]("svg")[0];
        var _0x19A85 = $(_0x19AF7)["attr"]("page");
        _0x19AAB["pn"] = _0x19A85;
        _0x19AAB["line"] = _0x19A5F["my_line"];
        _0x19AAB["pass"] = false;
        return _0x19AAB
    }
    ;return null
}
function addRhythm(_0x184B3, _0x18655, _0x1881D, _0x186C7, _0x187D1, _0x187AB) {
    if (glo_a_e == null) {
        glo_a_e = JSON["parse"](JSON["stringify"](_0x184B3));
        init_glo_a_e = JSON["parse"](JSON["stringify"](_0x184B3))
    }
    ;if (!playMetro) {
        return
    }
    ;var _0x1875F = 0;
    var _0x186ED = -1;
    var _0x186A1 = -1;
    var _0x1867B = -1;
    var _0x18713 = -1;
    if (bar_seq != null) {
        for (var _0x17E9D = 0; _0x17E9D < bar_seq["length"]; _0x17E9D++) {
            var _0x185BD = bar_seq[_0x17E9D]["beat"];
            var _0x18609 = bar_seq[_0x17E9D]["beat_time"] + 0;
            var _0x18597 = _0x18609 - _0x1875F;
            if (_0x186A1 == -1) {
                _0x186A1 = _0x18597
            }
            ;if (_0x1867B == -1) {
                _0x1867B = _0x185BD
            }
            ;var _0x185E3 = parseInt(_0x185BD / 1);
            var _0x187F7 = _0x18597 / _0x185BD;
            if (_0x18713 == -1) {
                _0x18713 = _0x187F7
            }
            ;if (_0x185E3 > 0) {
                if (_0x17E9D == bar_seq["length"] - 1) {
                    for (var _0x17EE9 = 0; _0x17EE9 < Math["round"](_0x185E3 * 100) / 100; _0x17EE9++) {
                        var _0x1862F = _0x1875F + _0x187F7 * _0x17EE9;
                        var _0x18785 = new Float32Array(7);
                        _0x18785[0] = -1;
                        if (_0x1862F < 0) {
                            _0x18785[1] = 0
                        } else {
                            _0x18785[1] = _0x1862F
                        }
                        ;_0x18785[2] = 115;
                        _0x18785[3] = 71;
                        _0x18785[4] = _0x187F7;
                        _0x18785[5] = user["delay"]["beatVolume"] || 1;
                        _0x18785[6] = 9;
                        if (_0x187D1 == 0) {
                            _0x184B3["push"](_0x18785)
                        }
                    }
                } else {
                    for (var _0x17EE9 = 0; _0x17EE9 < Math["round"](_0x185E3 * 100) / 100; _0x17EE9++) {
                        var _0x1862F = _0x18609 - _0x187F7 * (_0x17EE9 + 1);
                        var _0x18785 = new Float32Array(7);
                        _0x18785[0] = -1;
                        _0x18785[1] = _0x1862F;
                        _0x18785[2] = 115;
                        _0x18785[3] = 71;
                        _0x18785[4] = _0x187F7;
                        _0x18785[5] = user["delay"]["beatVolume"] || 1;
                        _0x18785[6] = 9;
                        if (_0x187D1 == 0) {
                            _0x184B3["push"](_0x18785)
                        }
                    }
                }
            }
            ;_0x1875F = _0x18609
        }
        ;_0x184B3["sort"](function(_0x18869, _0x1888F) {
            return _0x18869[1] - _0x1888F[1]
        });
        var _0x18843 = 0;
        if (_0x18655 && _0x18655 > 0) {
            for (var _0x17E9D = 0; _0x17E9D < _0x184B3["length"]; _0x17E9D++) {
                if (_0x186ED == -1) {
                    if (_0x184B3[_0x17E9D][0] == -1) {
                        _0x186ED = _0x184B3[_0x17E9D][1] + 0
                    }
                }
                ;_0x184B3[_0x17E9D][1] += _0x18655
            }
            ;if (_0x1881D && _0x1881D > 0) {
                for (var _0x17E9D = 0; _0x17E9D < _0x1881D; _0x17E9D++) {
                    for (var _0x18739 = 0; _0x18739 < _0x186C7; _0x18739++) {
                        var _0x18785 = new Float32Array(7);
                        _0x18785[0] = -1;
                        _0x18785[1] = _0x18843;
                        _0x18785[2] = 115;
                        _0x18785[3] = 71;
                        _0x18785[4] = _0x18713;
                        _0x18785[5] = 1;
                        _0x18785[6] = 9;
                        _0x184B3["unshift"](_0x18785);
                        _0x18843 += _0x18713
                    }
                }
            }
            ;var _0x18571 = Math["ceil"](_0x1867B);
            if (_0x18571 < _0x186C7) {
                for (var _0x18739 = _0x18571; _0x18739 < _0x186C7; _0x18739++) {
                    var _0x18785 = new Float32Array(7);
                    _0x18785[0] = -1;
                    _0x18785[1] = _0x18843 + _0x18713 * (_0x18739 - _0x18571);
                    _0x18785[2] = 115;
                    _0x18785[3] = 71;
                    _0x18785[4] = _0x18713;
                    _0x18785[5] = 1;
                    _0x18785[6] = 9;
                    _0x184B3["unshift"](_0x18785)
                }
            }
            ;if (_0x186ED != 0 && _0x186ED != -1) {
                var _0x18785 = new Float32Array(7);
                _0x18785[0] = -1;
                _0x18785[1] = _0x18843 + _0x18713 * (_0x186C7 - _0x18571);
                _0x18785[2] = 115;
                _0x18785[3] = 71;
                _0x18785[4] = _0x18713;
                _0x18785[5] = 1;
                _0x18785[6] = 9;
                _0x184B3["unshift"](_0x18785)
            }
            ;_0x184B3["sort"](function(_0x18869, _0x1888F) {
                return _0x18869[1] - _0x1888F[1]
            })
        }
    }
    ;if (_0x187AB == 1) {
        for (var _0x17E9D = 0; _0x17E9D < _0x184B3["length"]; _0x17E9D++) {
            if (_0x184B3[_0x17E9D][0] != -1) {
                _0x184B3[_0x17E9D][5] = 0
            }
            ;if (_0x184B3[_0x17E9D][0] != -1 && _0x184B3[_0x17E9D][2] == 115) {
                _0x184B3[_0x17E9D][5] = user["delay"]["beatVolume"] || 1
            }
        }
    } else {
        for (var _0x17E9D = 0; _0x17E9D < _0x184B3["length"]; _0x17E9D++) {
            if (_0x184B3[_0x17E9D][0] != -1 && _0x184B3[_0x17E9D][2] == 115) {
                _0x184B3[_0x17E9D][5] = user["delay"]["beatVolume"] || 1
            }
        }
    }
    ;return _0x184B3
}
var fermata_dur_array = new Array();
var fermataMap = new Map();
function getFermataDur(_0x18467) {
    for (var _0x17E9D = 0; _0x17E9D < fermata_dur_array["length"]; _0x17E9D++) {
        var _0x19A39 = fermata_dur_array[_0x17E9D];
        if (_0x19A39["v"] == _0x18467) {
            return _0x19A39["dur"]
        }
    }
    ;return 0
}
function removeFermata(_0x18467) {
    for (var _0x17E9D = 0; _0x17E9D < fermata_dur_array["length"]; _0x17E9D++) {
        var _0x19A39 = fermata_dur_array[_0x17E9D];
        if (_0x19A39["v"] == _0x18467) {
            fermata_dur_array["splice"](_0x17E9D, 1)
        }
    }
}
if (typeof module == "object" && typeof exports == "object") {
    exports["ToAudio"] = ToAudio
}
;var abcsf2 = [];
var bar_seq, bar_seq_nometer, emptyBarCountArr;
var lty_seq;
var s_list;
var first_bar_beat = -1;
var outputDev = null;
var playMetro = false;
var chordCount = 0;
function get_max_field() {
    var _0x199A1 = /\|{0,1}\[([1-9\.]*)/g;
    var _0x199C7 = elt_ref["source"]["value"]["replace"](/%%(score|staves).*/, "")["match"](_0x199A1);
    var _0x199ED = 0;
    if (_0x199C7 != null) {
        for (var _0x17E9D = 0; _0x17E9D < _0x199C7["length"]; _0x17E9D++) {
            var _0x18E33 = _0x199C7[_0x17E9D]["replace"]("|", "")["replace"]("[", "")["replace"](/\s/g, "");
            _0x18E33 = _0x18E33["replace"]("$", "");
            if (_0x18E33["indexOf"](".") > -1) {
                var _0x19A13 = _0x18E33["split"](".");
                for (var _0x17EE9 = 0; _0x17EE9 < _0x19A13["length"]; _0x17EE9++) {
                    if (parseInt(_0x19A13[_0x17EE9]) > _0x199ED) {
                        _0x199ED = parseInt(_0x19A13[_0x17EE9])
                    }
                }
            } else {
                if (parseInt(_0x18E33) > _0x199ED) {
                    _0x199ED = parseInt(_0x18E33)
                }
            }
        }
    }
    ;_0x199A1 = /\|\s*([1-9\.]*)/g;
    var _0x199C7 = elt_ref["source"]["value"]["replace"](/%%(score|staves).*/, "")["match"](_0x199A1);
    if (_0x199C7 != null) {
        for (var _0x17E9D = 0; _0x17E9D < _0x199C7["length"]; _0x17E9D++) {
            var _0x18E33 = _0x199C7[_0x17E9D]["replace"]("|", "")["replace"]("[", "")["replace"](/\s/g, "");
            _0x18E33 = _0x18E33["replace"]("$", "");
            if (_0x18E33["indexOf"](".") > -1) {
                var _0x19A13 = _0x18E33["split"](".");
                for (var _0x17EE9 = 0; _0x17EE9 < _0x19A13["length"]; _0x17EE9++) {
                    if (parseInt(_0x19A13[_0x17EE9]) > _0x199ED) {
                        _0x199ED = parseInt(_0x19A13[_0x17EE9])
                    }
                }
            } else {
                if (parseInt(_0x18E33) > _0x199ED) {
                    _0x199ED = parseInt(_0x18E33)
                }
            }
        }
    }
    ;return _0x199ED
}
function all_s(_0x18901) {
    getNoteData();
    if (_0x18901) {
        return s_list
    }
    ;var _0x188DB = new Array();
    var _0x188B5 = new Array();
    if (s_list != null) {
        for (var _0x17E9D = 0; _0x17E9D < s_list["length"]; _0x17E9D++) {
            if (_0x188B5["indexOf"](s_list[_0x17E9D]["istart"]) < 0) {
                _0x188DB["push"](s_list[_0x17E9D])
            }
            ;_0x188B5["push"](s_list[_0x17E9D]["istart"])
        }
    }
    ;return _0x188DB["sort"](function(_0x18869, _0x1888F) {
        return _0x18869["istart"] - _0x1888F["istart"]
    })
}
function Audio5(_0x18337) {
    var _0x182C5 = _0x18337, _0x18B3B = _0x182C5["onend"] || function() {}
    , _0x18B61 = _0x182C5["onnote"] || function() {}
    , _0x18999 = _0x182C5["errmsg"] || alert, _0x18927, _0x189E5, _0x18B87 = [], _0x18C1F = [], _0x18D29 = 0, _0x189BF, _0x18A57, _0x18C91;
    var _0x1894D = [];
    function _0x18A7D() {
        var _0x18ECB = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
          , _0x18D75 = _0x18ECB["length"];
        for (var _0x17E9D = 0; _0x17E9D < _0x18D75; _0x17E9D++) {
            _0x1894D[_0x18ECB[_0x17E9D]] = _0x17E9D
        }
        ;_0x1894D["="] = 0
    }
    function _0x18973(_0x18D9B) {
        var _0x17E9D, _0x18DC1, _0x18D4F, _0x18869, _0x18D75 = _0x18D9B["length"], _0x17EE9 = 0;
        _0x18D4F = _0x18D75 * 3 / 4;
        if (_0x18D9B[_0x18D75 - 1] == "=") {
            if (_0x18D9B[_0x18D75 - 2] == "=") {
                _0x18D4F--
            }
            ;_0x18D4F--;
            _0x18D75 -= 4
        }
        ;_0x18869 = new Uint8Array(_0x18D4F);
        for (_0x17E9D = 0; _0x17E9D < _0x18D75; _0x17E9D += 4) {
            _0x18DC1 = (_0x1894D[_0x18D9B[_0x17E9D]] << 18) + (_0x1894D[_0x18D9B[_0x17E9D + 1]] << 12) + (_0x1894D[_0x18D9B[_0x17E9D + 2]] << 6) + _0x1894D[_0x18D9B[_0x17E9D + 3]];
            _0x18869[_0x17EE9++] = _0x18DC1 >> 16 & 255;
            _0x18869[_0x17EE9++] = _0x18DC1 >> 8 & 255;
            _0x18869[_0x17EE9++] = _0x18DC1 & 255
        }
        ;if (_0x18D75 != _0x18D9B["length"]) {
            _0x18DC1 = (_0x1894D[_0x18D9B[_0x17E9D]] << 18) + (_0x1894D[_0x18D9B[_0x17E9D + 1]] << 12) + (_0x1894D[_0x18D9B[_0x17E9D + 2]] << 6) + _0x1894D[_0x18D9B[_0x17E9D + 3]];
            _0x18869[_0x17EE9++] = _0x18DC1 >> 16 & 255;
            if (_0x17EE9 < _0x18D4F) {
                _0x18869[_0x17EE9++] = _0x18DC1 >> 8 & 255
            }
        }
        ;return _0x18869
    }
    function _0x18C45(_0x1888F, _0x18D9B) {
        var _0x17E9D, _0x190DF, _0x18869 = _0x1888F["getChannelData"](0);
        for (_0x17E9D = 0,
        len = _0x18D9B["length"]; _0x17E9D < len; _0x17E9D++) {
            _0x18869[_0x17E9D] = _0x18D9B[_0x17E9D] / 196608
        }
    }
    function _0x18C6B(_0x17B33, _0x1848D) {
        var _0x17E9D, _0x19683, _0x19611, _0x19021, _0x17DDF, _0x17D47, _0x19637 = _0x17B33["getInstruments"]()[0]["info"];
        _0x18C1F[_0x1848D] = [];
        for (_0x17E9D = 0; _0x17E9D < _0x19637["length"]; _0x17E9D++) {
            _0x19611 = _0x19637[_0x17E9D]["generator"];
            if (!_0x19611["sampleID"]) {
                continue
            }
            ;_0x19683 = _0x19611["sampleID"]["amount"];
            _0x17DDF = _0x17B33["sampleHeader"][_0x19683]["sampleRate"];
            _0x17D47 = _0x17B33["sample"][_0x19683];
            _0x19021 = {
                attack: Math["pow"](2, (_0x19611["attackVolEnv"] ? _0x19611["attackVolEnv"]["amount"] : -12e3) / 1200),
                hold: Math["pow"](2, (_0x19611["holdVolEnv"] ? _0x19611["holdVolEnv"]["amount"] : -12e3) / 1200),
                decay: Math["pow"](2, (_0x19611["decayVolEnv"] ? _0x19611["decayVolEnv"]["amount"] : -12e3) / 1200) / 3,
                sustain: _0x19611["sustainVolEnv"] ? _0x19611["sustainVolEnv"]["amount"] / 1e3 : 0,
                buffer: _0x18927["createBuffer"](1, _0x17D47["length"], _0x17DDF)
            };
            _0x19021["hold"] += _0x19021["attack"];
            _0x19021["decay"] += _0x19021["hold"];
            if (_0x19021["sustain"] >= 0.4) {
                _0x19021["sustain"] = 0.01
            } else {
                _0x19021["sustain"] = 1 - _0x19021["sustain"] / 0.4
            }
            ;_0x18C45(_0x19021["buffer"], _0x17D47);
            if (_0x19611["sampleModes"] && _0x19611["sampleModes"]["amount"] & 1) {
                _0x19021["loopStart"] = _0x17B33["sampleHeader"][_0x19683]["startLoop"] / _0x17DDF;
                _0x19021["loopEnd"] = _0x17B33["sampleHeader"][_0x19683]["endLoop"] / _0x17DDF
            }
            ;var _0x1965D = (_0x19611["scaleTuning"] ? _0x19611["scaleTuning"]["amount"] : 100) / 100
              , _0x196A9 = (_0x19611["coarseTune"] ? _0x19611["coarseTune"]["amount"] : 0) + (_0x19611["fineTune"] ? _0x19611["fineTune"]["amount"] : 0) / 100 + _0x17B33["sampleHeader"][_0x19683]["pitchCorrection"] / 100 - (_0x19611["overridingRootKey"] ? _0x19611["overridingRootKey"]["amount"] : _0x17B33["sampleHeader"][_0x19683]["originalPitch"]);
            for (j = _0x19611["keyRange"]["lo"]; j <= _0x19611["keyRange"]["hi"]; j++) {
                _0x18C1F[_0x1848D][j] = Math["pow"](Math["pow"](2, 1 / 12), (j + _0x196A9) * _0x1965D);
                _0x18B87[_0x1848D][j] = _0x19021
            }
        }
    }
    function _0x18AC9(_0x18F3D) {
        var _0x18F17 = false;
        $["ajax"]({
            type: "GET",
            cache: false,
            url: _0x18F3D,
            data: "",
            async: false,
            success: function() {
                _0x18F17 = true
            },
            error: function() {}
        });
        return _0x18F17
    }
    function _0x1835D(_0x1848D) {
        if (_0x1848D == 222) {
            return
        }
        ;_0x18D29++;
        var _0x18EF1 = _0x182C5["sfu"] + "/" + _0x1848D + ".js";
        if (user["smallVersion"]) {
            if (!_0x18AC9("js/" + _0x18EF1)) {
                _0x18EF1 = "/abc/js/" + _0x18EF1
            }
        }
        ;abc2svg["loadjs"](_0x18EF1, function() {
            var _0x17B33 = new sf2["Parser"](_0x18973(abcsf2[_0x1848D]));
            _0x17B33["parse"]();
            _0x18C6B(_0x17B33, _0x1848D);
            _0x18D29--
        }, function() {
            _0x18999("could not find the instrument " + (_0x1848D / 128 | 0)["toString"]() + "-" + (_0x1848D % 128)["toString"]());
            _0x18D29--
        })
    }
    function _0x18AA3(_0x184B3) {
        if (user["showInstrLoading"]) {
            maskFullTxt("\u6b63\u5728\u52a0\u8f7d\u97f3\u8272\u6587\u4ef6...")
        }
        ;var _0x17E9D, _0x18DE7, _0x1848D;
        for (_0x17E9D = _0x189BF; ; _0x17E9D++) {
            _0x18DE7 = _0x184B3[_0x17E9D];
            if (!_0x18DE7 || _0x189BF >= _0x18A57) {
                break
            }
            ;_0x1848D = _0x18DE7[2];
            if (!_0x18B87[_0x1848D]) {
                _0x18B87[_0x1848D] = [];
                _0x1835D(_0x1848D)
            }
        }
    }
    function _0x18A31(_0x17FA7) {
        var _0x18E7F = "C,C,D,D,E,F,F,G,G,A,A,B"["split"](",");
        var _0x18EA5 = "0,1,0,1,0,0,1,0,1,0,1,0"["split"](",");
        var _0x17E9D = Math["floor"](_0x17FA7 / 12) - 1;
        var _0x17EE9 = _0x17FA7 - (_0x17E9D + 1) * 12;
        return {
            "key": _0x18E7F[_0x17EE9] + _0x17E9D,
            "up": _0x18EA5[_0x17EE9]
        }
    }
    function _0x18A0B(_0x18DE7) {
        var _0x184FF = _0x18DE7[0];
        var _0x18E0D = _0x18DE7[3] | 0;
        var _0x18D9B = syms[_0x184FF];
        var _0x18E33 = elt_ref["source"]["value"]["substring"](_0x18D9B["istart"], _0x18D9B["iend"]);
        var _0x17FA7 = getSimpleNameByKAndStaff(_0x18D9B["my_key"], _0x18E33["replace"](/[\/\d\(\)]/g, ""), $("#source")["val"]());
        var _0x18E59 = 0;
        if (_0x17FA7["indexOf"]("_") > -1) {
            _0x18E59 = -1
        } else {
            if (_0x17FA7["indexOf"]("=") > -1) {
                _0x18E59 = 0
            } else {
                if (_0x17FA7["indexOf"]("^") > -1) {
                    _0x18E59 = 1
                }
            }
        }
        ;_0x17FA7 = _0x17FA7["replaceAll"]("_", "")["replaceAll"]("\\^", "")["replaceAll"]("=", "");
        return {
            "key": _0x17FA7,
            "up": _0x18E59,
            "keysign": _0x18D9B["my_key"]
        }
    }
    function _0x18AEF(_0x18DE7, _0x18DC1, _0x18F89, _0x18FFB) {
        if (_0x18927["baseLatency"] && _0x18927["baseLatency"] > 0.03) {
            console["log"]("\u64ad\u653e\u5ef6\u8fdf\u592a\u591a\u4e86", _0x18927["baseLatency"], _0x18927["outputLatency"])
        }
        ;var _0x18FD5, _0x19047, _0x1848D = _0x18DE7[2], _0x17FA7 = _0x18DE7[3] | 0;
        if (user["tmpInstru"] != -1) {
            _0x1848D = user["tmpInstru"];
            if (!_0x18B87[_0x1848D]) {
                _0x18B87[_0x1848D] = [];
                _0x1835D(_0x1848D)
            }
            ;if (!_0x18B87[_0x1848D][_0x17FA7]) {
                if (!user["tmpInstruLoading"]) {
                    maskFullTxt("\u6b63\u5728\u66f4\u6362\u97f3\u8272...")
                }
                ;user["tmpInstruLoading"] = true;
                _0x1848D = user["lastTmpInstru"]
            } else {
                $(".loading,.loading-box")["remove"]();
                user["tmpInstruLoading"] = false
            }
        }
        ;user["lastTmpInstru"] = _0x1848D;
        if (user["tmpTransposition"] != 0) {
            _0x17FA7 = _0x17FA7 + user["tmpTransposition"]
        }
        ;if (_0x1848D == 222) {
            var _0x18F63 = _0x18A0B(_0x18DE7);
            console["log"](_0x18F63);
            CM["sampler"]["play"](_0x18F63["keysign"], _0x18F63["key"], _0x18F63["up"], CM["sampler"]["getCurrentTime"]() + _0x18DC1 - _0x18927["currentTime"], _0x18F89, user["timeouts"]);
            return
        }
        ;var _0x19021 = _0x18B87[_0x1848D][_0x17FA7]
          , _0x19093 = _0x18DE7[5]
          , _0x1841B = _0x18927["createBufferSource"]();
        if (_0x18DE7[6] != 0) {
            _0x19093 = _0x19093 * 0.5
        } else {
            if (_0x18DE7[6] == 0 && vCount > 1) {
                _0x19093 = _0x19093 * 0.5
            }
        }
        ;if (syms[_0x18DE7[0]] && syms[_0x18DE7[0]]["dotNote"]) {
            _0x18F89 = _0x18F89 / 2
        }
        ;if (!_0x19021) {
            return
        }
        ;_0x1841B["buffer"] = _0x19021["buffer"];
        if (_0x19021["loopStart"]) {
            _0x1841B["loop"] = true;
            _0x1841B["loopStart"] = _0x19021["loopStart"];
            _0x1841B["loopEnd"] = _0x19021["loopEnd"]
        }
        ;if (_0x1841B["detune"]) {
            var _0x18FAF = _0x18DE7[3] * 100 % 100;
            if (_0x18FAF) {
                _0x1841B["detune"]["value"] = _0x18FAF
            }
        }
        ;_0x1841B["playbackRate"]["value"] = _0x18C1F[_0x1848D][_0x17FA7];
        _0x18FD5 = _0x18927["createGain"]();
        if (_0x19021["hold"] < 0.002) {
            _0x18FD5["gain"]["setValueAtTime"](_0x19093, _0x18DC1);
            _0x18FD5["gain"]["linearRampToValueAtTime"](_0x19093, _0x18DC1 + 0.05)
        } else {
            if (_0x19021["attack"] < 0.002) {
                _0x18FD5["gain"]["setValueAtTime"](_0x19093, _0x18DC1);
                _0x18FD5["gain"]["linearRampToValueAtTime"](_0x19093, _0x18DC1 + 0.05)
            } else {
                _0x18FD5["gain"]["setValueAtTime"](_0x19093, _0x18DC1);
                _0x18FD5["gain"]["linearRampToValueAtTime"](_0x19093, _0x18DC1 + _0x19021["attack"])
            }
            ;_0x18FD5["gain"]["setValueAtTime"](_0x19093, _0x18DC1 + _0x19021["hold"])
        }
        ;_0x18FD5["gain"]["exponentialRampToValueAtTime"](_0x19093, _0x18DC1 + _0x19021["decay"]);
        _0x18FD5["gain"]["linearRampToValueAtTime"](_0x19093 * 0.4, _0x18DC1 + _0x18F89 * 1);
        _0x1841B["connect"](_0x18FD5);
        _0x18FD5["connect"](_0x189E5);
        _0x1841B["start"](_0x18DC1);
        var _0x1906D = 0;
        if (_0x18927["hasOwnProperty"]("getOutputTimestamp") && _0x18927["getOutputTimestamp"]()["contextTime"]) {
            _0x1906D = _0x18927["currentTime"] - _0x18927["getOutputTimestamp"]()["contextTime"]
        }
        ;actionContextDelay = _0x1906D;
        if (_0x18927["baseLatency"] && _0x18927["baseLatency"] && _0x18927["baseLatency"] > actionContextDelay) {
            actionContextDelay = _0x18927["baseLatency"]
        }
        ;if (_0x18927["outputLatency"] && _0x18927["outputLatency"] && _0x18927["outputLatency"] > actionContextDelay) {
            actionContextDelay = _0x18927["outputLatency"]
        }
        ;console["log"]("timeDur:", _0x1906D);
        if (_0x1906D > 0.06) {
            console["log"]("delay\u592a\u591a")
        }
        ;_0x18FD5["gain"]["linearRampToValueAtTime"](0.1, _0x18DC1 + _0x18F89 + 0.01);
        _0x1841B["stop"](_0x18DC1 + _0x18F89 + 0.01)
    }
    function _0x18BD3(_0x184B3) {
        console["log"]("isStave:", isStave);
        var _0x18DC1, _0x18DE7, _0x19319, _0x193B1, _0x19047, _0x18F89;
        _0x18DE7 = _0x184B3[_0x189BF];
        if (!_0x18DE7 || _0x189BF >= _0x18A57) {
            _0x18B3B();
            return
        }
        ;if (_0x182C5["new_speed"]) {
            _0x18C91 = _0x18927["currentTime"] - (_0x18927["currentTime"] - _0x18C91) * _0x182C5["speed"] / _0x182C5["new_speed"];
            _0x182C5["speed"] = _0x182C5["new_speed"];
            _0x182C5["new_speed"] = 0
        }
        ;_0x18DC1 = _0x18DE7[1] / _0x182C5["speed"];
        _0x193B1 = _0x18DC1 + 3;
        var _0x1938B = -1;
        var _0x19151;
        while (1) {
            var _0x1925B = null;
            if (syms !== undefined) {
                _0x1925B = syms[_0x18DE7[0]]
            }
            ;if (_0x1925B && _0x1925B["hasOwnProperty"]("my_line")) {
                if (_0x1938B != _0x1925B["my_line"]) {
                    _0x1938B = _0x1925B["my_line"];
                    _0x19151 = $("._" + _0x1925B["istart"] + "_")["parents"]("svg")[0];
                    if (!_0x19151) {
                        _0x19151 = $("._" + _0x1925B["istart"] + "_0")["parents"]("svg")[0]
                    }
                }
            }
            ;if (user["timeouts"]["length"] > 100) {
                user["timeouts"]["splice"](0, 80)
            }
            ;_0x18F89 = _0x18DE7[4] / _0x182C5["speed"];
            var _0x18FFB = -1;
            if (_0x189BF < _0x184B3["length"] - 1) {
                var _0x19423 = null;
                for (var _0x17E9D = 1; _0x17E9D < _0x184B3["length"] - _0x189BF - 1; _0x17E9D++) {
                    if (_0x184B3[_0x189BF + _0x17E9D][6] == _0x18DE7[6]) {
                        _0x19423 = _0x184B3[_0x189BF + _0x17E9D];
                        break
                    }
                }
                ;if (_0x19423 != null && _0x19423[5] == 0 && _0x18DE7[5] != 0) {
                    _0x18FFB = _0x19423[5];
                    _0x18F89 += _0x19423[4] / _0x182C5["speed"] * 0.01
                }
            }
            ;if (_0x18DE7[5] != 0) {
                _0x18AEF(_0x18DE7, _0x18DC1 + _0x18C91, _0x18F89, _0x18FFB)
            }
            ;var _0x17E9D = _0x18DE7[0];
            play_index = _0x17E9D;
            var _0x1912B = _0x18DE7[1];
            curr_play_time = _0x18DE7[1];
            _0x19047 = (_0x18DC1 + _0x18C91 - _0x18927["currentTime"]) * 1e3;
            var _0x19105 = 5;
            if (user["notehlightDelay"] && user["notehlightDelay"] > 0) {
                _0x19105 = user["notehlightDelay"]
            }
            ;var _0x192F3 = 0;
            var _0x190B9 = _0x18DE7[0];
            if (user["syncRect"]) {
                var _0x192A7 = _0x18DE7[4];
                var _0x193FD = _0x184B3[_0x189BF + 1];
                var _0x1952D = 1;
                var _0x19235 = true;
                while (_0x193FD && (_0x189BF + _0x1952D) < _0x18A57 && _0x193FD[0] != -1 && _0x193FD[0] == _0x190B9) {
                    _0x192A7 += _0x193FD[4];
                    _0x1952D++;
                    _0x193FD = _0x184B3[_0x189BF + _0x1952D]
                }
                ;if (_0x189BF > 0) {
                    var _0x19365 = _0x184B3[_0x189BF - 1];
                    if (_0x19365[0] == _0x190B9 && _0x19365[0] != -1) {
                        _0x19235 = false
                    }
                }
                ;if (_0x19235) {
                    var _0x19495 = $(_0x19151)["find"]("._" + _0x190B9 + "_single");
                    var _0x1920F = _0x19495["length"];
                    if (syms[_0x190B9] && syms[_0x190B9]["tie_s"]) {
                        _0x192F3 = getNoteTime(syms[_0x190B9], syms[_0x190B9]["dur"])
                    }
                    ;if (_0x1920F > 0) {
                        var _0x19553 = $(_0x19495[0])["attr"]("time");
                        _0x19495 = $(_0x19151)["find"]("rect[time=\'" + _0x19553 + "\']");
                        var _0x18207 = $(_0x19495[0])["attr"]("data-type");
                        var _0x192CD = syms[_0x190B9];
                        var _0x195EB = getNoteTime(_0x192CD, _0x192CD["my_wmeasure"] / parseInt(_0x192CD["my_meter"][0]["top"]));
                        if (_0x18207 == "dot") {
                            var _0x1933F = 0;
                            if (syms[_0x190B9]["grace_time"]) {
                                _0x1933F = syms[_0x190B9]["grace_time"]
                            }
                            ;console["log"]("dot---grace_time:", _0x1933F);
                            var _0x19449 = getNoteTime(_0x192CD, _0x192CD["time_inter"] - _0x1933F);
                            for (var _0x190DF = 0; _0x190DF < _0x19495["length"]; _0x190DF++) {
                                _0x17E9D = "_" + _0x18DE7[0] + "_single.s" + _0x190DF;
                                if (_0x19449 >= _0x195EB) {
                                    var _0x194BB = _0x19047 + _0x195EB * 1e3 * _0x190DF;
                                    var _0x1946F = _0x195EB * 1e3;
                                    console["log"]("istart:", _0x18DE7[0], "singleStartTime:", _0x194BB, "   singleDur:", _0x1946F);
                                    var _0x194E1 = setTimeout(_0x18B61, _0x194BB, _0x17E9D, true, _0x1912B, _0x190B9, _0x19151);
                                    user["timeouts"]["push"](_0x194E1);
                                    var _0x19507 = setTimeout(_0x18B61, _0x194BB + _0x1946F, _0x17E9D, false, _0x1912B, _0x190B9, _0x19151);
                                    user["timeouts"]["push"](_0x19507);
                                    _0x19449 = _0x19449 - _0x195EB
                                } else {
                                    if (_0x19449 > 0) {
                                        var _0x194BB = _0x19047 + _0x195EB * 1e3 * _0x190DF;
                                        var _0x1946F = _0x19449 * 1e3;
                                        console["log"]("istart:", _0x18DE7[0], "singleStartTime:", _0x194BB, "   singleDur:", _0x1946F);
                                        var _0x194E1 = setTimeout(_0x18B61, _0x194BB, _0x17E9D, true, _0x1912B, _0x190B9, _0x19151);
                                        user["timeouts"]["push"](_0x194E1);
                                        var _0x19507 = setTimeout(_0x18B61, _0x194BB + _0x1946F, _0x17E9D, false, _0x1912B, _0x190B9, _0x19151);
                                        user["timeouts"]["push"](_0x19507)
                                    }
                                }
                            }
                        } else {
                            var _0x1933F = syms[_0x190B9]["grace_time"];
                            console["log"]("grace_time:", _0x1933F);
                            var _0x19281 = (_0x192A7 * 1e3) / _0x19495["length"];
                            var _0x19579 = getNoteTime(syms[_0x190B9], syms[_0x190B9]["time_inter"]) * 1e3;
                            if (_0x19281 > _0x19579) {
                                _0x19281 = _0x19579
                            }
                            ;if (syms[_0x190B9]["tie_s"]) {
                                _0x19281 = (_0x192F3 * 1e3) / _0x19495["length"]
                            }
                            ;if (_0x19281 > _0x195EB * 1e3) {
                                _0x19281 = _0x195EB * 1e3
                            }
                            ;for (var _0x190DF = 0; _0x190DF < _0x19495["length"]; _0x190DF++) {
                                _0x17E9D = "_" + _0x18DE7[0] + "_single.s" + _0x190DF;
                                var _0x194BB = _0x19047 + _0x19281 * _0x190DF;
                                var _0x1946F = _0x19281;
                                var _0x194E1 = setTimeout(_0x18B61, _0x194BB, _0x17E9D, true, _0x1912B, _0x190B9, _0x19151);
                                user["timeouts"]["push"](_0x194E1);
                                var _0x19507 = setTimeout(_0x18B61, _0x194BB + _0x1946F, _0x17E9D, false, _0x1912B, _0x190B9, _0x19151);
                                user["timeouts"]["push"](_0x19507)
                            }
                        }
                        ;_0x19553 = null;
                        _0x18207 = null;
                        _0x192CD = null;
                        _0x195EB = null
                    } else {
                        if (_0x18DE7[0] == -1) {
                            var _0x19177 = setTimeout(_0x18B61, _0x19047, _0x17E9D, true, _0x1912B, _0x190B9, _0x19151);
                            user["timeouts"]["push"](_0x19177);
                            var _0x1919D = setTimeout(_0x18B61, _0x19047 + _0x18F89 * 1e3 - _0x19105, _0x17E9D, false, _0x1912B, _0x190B9, _0x19151);
                            user["timeouts"]["push"](_0x1919D)
                        }
                    }
                    ;handleTie(_0x190B9, _0x19047, _0x18B61, _0x1912B)
                }
            } else {
                var _0x18D9B = syms[_0x190B9];
                if (_0x18D9B && _0x18D9B["tie_s"]) {
                    _0x18D03(_0x18D9B, _0x18B61, _0x19047, actionContextDelay, _0x17E9D, _0x1912B, _0x190B9, _0x19151, _0x19105)
                } else {
                    var _0x19177 = setTimeout(_0x18B61, _0x19047 + actionContextDelay * 1000, _0x17E9D, true, _0x1912B, _0x190B9, _0x19151);
                    user["timeouts"]["push"](_0x19177);
                    var _0x1919D = setTimeout(_0x18B61, (_0x19047 + actionContextDelay * 1000 + _0x18F89 * 1e3 - _0x19105), _0x17E9D, false, _0x1912B, _0x190B9, _0x19151);
                    user["timeouts"]["push"](_0x1919D)
                }
            }
            ;var _0x193D7 = syms[_0x18DE7[0]];
            if (!user["syncRect"] && musicType != 0 && _0x193D7) {
                _0x18CDD(_0x17E9D, _0x19047, _0x193D7["pdur"])
            }
            ;_0x18DE7 = _0x184B3[++_0x189BF];
            if (!_0x18DE7 || _0x189BF >= _0x18A57) {
                var _0x195C5 = setTimeout(_0x18B3B, (_0x18DC1 + _0x18C91 - _0x18927["currentTime"] + _0x18F89) * 1e3);
                user["timeouts"]["push"](_0x195C5);
                return
            }
            ;_0x18DC1 = _0x18DE7[1] / _0x182C5["speed"];
            _0x18FFB = null;
            _0x192F3 = null;
            _0x1912B = null;
            _0x17E9D = null;
            _0x19105 = null;
            _0x192F3 = null;
            if (_0x18DC1 > _0x193B1) {
                break
            }
        }
        ;var _0x1959F = setTimeout(_0x18BD3, ((_0x18DC1 + _0x18C91 - _0x18927["currentTime"]) * 1e3 - 300), _0x184B3);
        user["timeouts"]["push"](_0x1959F)
    }
    function _0x18D03(_0x18D9B, _0x18B61, _0x19047, actionContextDelay, _0x17E9D, _0x1912B, _0x190B9, _0x19151, _0x19105) {
        var _0x19177 = setTimeout(_0x18B61, _0x19047 + actionContextDelay * 1000, _0x17E9D, true, _0x1912B, _0x190B9, _0x19151);
        user["timeouts"]["push"](_0x19177);
        var _0x1984B = (_0x19047 + actionContextDelay * 1000 + _0x18D9B["pdur"] * 1e3 - _0x19105);
        var _0x1919D = setTimeout(_0x18B61, _0x1984B, _0x17E9D, false, _0x1912B, _0x190B9, _0x19151);
        user["timeouts"]["push"](_0x1919D);
        _0x18CDD(_0x17E9D, _0x19047, _0x18D9B["pdur"]);
        if (_0x18D9B["tie_s"]) {
            _0x18D03(_0x18D9B["tie_s"], _0x18B61, _0x1984B, actionContextDelay, _0x18D9B["tie_s"]["istart"], _0x1912B, _0x18D9B["tie_s"]["istart"], _0x19151, _0x19105)
        }
    }
    function _0x18B15(_0x18D9B, _0x18B61, _0x19047, actionContextDelay, _0x17E9D, _0x1912B, _0x190B9, _0x19151, _0x19105) {
        if (_0x18D9B["dur"] < 768) {
            var _0x19177 = setTimeout(_0x18B61, _0x19047 + actionContextDelay * 1000, _0x17E9D, true, _0x1912B, _0x190B9, _0x19151);
            user["timeouts"]["push"](_0x19177);
            var _0x1919D = setTimeout(_0x18B61, (_0x19047 + actionContextDelay * 1000 + _0x18F89 * 1e3 - _0x19105), _0x17E9D, false, _0x1912B, _0x190B9, _0x19151);
            user["timeouts"]["push"](_0x1919D)
        } else {
            var _0x190DF = parseInt(_0x18D9B["dur"] / 384);
            var _0x18F89 = _0x18D9B["pdur"];
            var _0x18843 = 0;
            for (var _0x191C3 = 0; _0x191C3 < _0x190DF - 1; _0x191C3++) {
                var _0x19177 = setTimeout(_0x18B61, _0x19047 + actionContextDelay * 1000 + _0x18843 * 1e3, _0x17E9D, true, _0x1912B, _0x190B9, _0x19151, null, null, _0x191C3);
                user["timeouts"]["push"](_0x19177);
                var _0x1919D = setTimeout(_0x18B61, (_0x19047 + actionContextDelay * 1000 + (_0x18F89 / _0x190DF + _0x18843) * 1e3 - _0x19105), _0x17E9D, false, _0x1912B, _0x190B9, _0x19151, null, null, _0x191C3);
                user["timeouts"]["push"](_0x1919D);
                _0x18843 += _0x18F89 / _0x190DF
            }
        }
    }
    function _0x18CDD(_0x180FD, _0x19047, _0x196CF) {
        var _0x19767 = _0x19047;
        var _0x19741 = 0;
        var _0x1971B = document["querySelectorAll"](".rt_" + _0x180FD + "[data-chordindex=\"0\"][data-index]");
        if (_0x1971B && _0x1971B["length"]) {
            _0x19741 = (_0x196CF * 1e3) / (_0x1971B["length"] + 1);
            for (var _0x196F5 = 0; _0x196F5 < _0x1971B["length"]; _0x196F5++) {
                (function(_0x1841B, _0x17E9D, _0x19047, _0x196CF) {
                    var _0x18DC1 = _0x19047 + _0x196CF * (_0x17E9D + 1);
                    var _0x19825 = _0x1841B["getAttribute"]("data-origindex");
                    var _0x197FF = _0x1841B["getAttribute"]("data-index");
                    var _0x1978D = "_" + _0x19825 + "_" + _0x197FF;
                    var _0x197B3 = setTimeout(_0x18BAD, _0x18DC1, _0x1978D, true);
                    user["timeouts"]["push"](_0x197B3);
                    var _0x197D9 = setTimeout(_0x18BAD, _0x18DC1 + _0x196CF, _0x1978D, false);
                    user["timeouts"]["push"](_0x197D9)
                }
                )(_0x1971B[_0x196F5], _0x196F5, _0x19767, _0x19741)
            }
        }
    }
    function _0x18CB7(_0x180FD, _0x19047, _0x196CF) {
        var _0x19767 = _0x19047;
        var _0x19741 = 0;
        var _0x1971B = document["querySelectorAll"]("._" + _0x180FD + "_single");
        if (_0x1971B && _0x1971B["length"]) {
            _0x19741 = (_0x196CF * 1e3);
            for (var _0x196F5 = 0; _0x196F5 < _0x1971B["length"]; _0x196F5++) {
                (function(_0x1841B, _0x17E9D, _0x19047, _0x196CF) {
                    var _0x18DC1 = _0x19047 + _0x196CF * _0x17E9D;
                    var _0x1978D = "_" + _0x180FD + "_single.s" + _0x17E9D;
                    var _0x197B3 = setTimeout(_0x18BAD, _0x18DC1, _0x1978D, true);
                    user["timeouts"]["push"](_0x197B3);
                    var _0x197D9 = setTimeout(_0x18BAD, _0x18DC1 + _0x196CF, _0x1978D, false);
                    user["timeouts"]["push"](_0x197D9)
                }
                )(_0x1971B[_0x196F5], _0x196F5, _0x19767, _0x19741)
            }
        }
    }
    function _0x18BAD(_0x17E9D, _0x191E9) {
        if (animation) {
            $("." + _0x17E9D)["css"]("fill-opacity", _0x191E9 ? 0.4 : 0)
        }
    }
    function _0x18BF9(_0x184B3) {
        chordCount = 0;
        try {
            if (_0x18A57 == 0) {
                _0x18B3B();
                return
            }
            ;if (_0x18D29 != 0) {
                setTimeout(_0x18BF9, 500, _0x184B3);
                return
            }
            ;if (user["startplayCball"]) {
                typeof (user["startplayCball"]) == "function" && user["startplayCball"]()
            }
            ;_0x189E5["connect"](_0x18927["destination"]);
            _0x18C91 = _0x18927["currentTime"] + 0.2 - _0x184B3[_0x189BF][1] / _0x182C5["speed"];
            if (user["playTimeout"] && user["playTimeout"] > 0) {
                _0x18C91 += user["playTimeout"] - 0.1
            }
            ;_0x18BD3(_0x184B3);
            try {
                typeof (playcallback) == "function" && playcallback()
            } catch (e) {
                console["log"](e)
            }
        } catch (e) {
            console["log"](e)
        }
    }
    _0x18A7D();
    if (!_0x182C5["sfu"]) {
        _0x182C5["sfu"] = "Scc1t2"
    }
    ;return {
        get_outputs: function() {
            return window["AudioContext"] || window["webkitAudioContext"] ? ["sf2"] : null
        },
        play: function(_0x184FF, _0x184D9, _0x184B3) {
            invisibleM = null;
            staffL = null;
            if (!_0x184B3 || _0x184FF >= _0x184B3["length"]) {
                _0x18B3B();
                return
            }
            ;if (!_0x189E5) {
                _0x18927 = _0x182C5["ac"];
                if (!_0x18927) {
                    _0x182C5["ac"] = _0x18927 = new (window["AudioContext"] || window["webkitAudioContext"])
                }
                ;_0x18927["onstatechange"] = function() {
                    console["log"]("statechange:", _0x18927["state"])
                }
                ;
                _0x189E5 = _0x18927["createGain"]();
                _0x189E5["gain"]["value"] = _0x182C5["gain"]
            }
            ;_0x18A57 = _0x184D9;
            _0x189BF = _0x184FF;
            _0x18AA3(_0x184B3);
            _0x18BF9(_0x184B3)
        },
        stop: function() {
            _0x18A57 = 0;
            if (_0x189E5) {
                _0x189E5["disconnect"]();
                _0x189E5 = null;
                clearAllTimeout();
                _0x18B3B();
                play["playing"] = 0
            }
        },
        set_vol: function(_0x18467) {
            if (_0x189E5) {
                _0x189E5["gain"]["value"] = _0x18467
            }
        },
        load_instr: function(_0x1848D) {
            _0x1835D(_0x1848D);
            console["log"]("load_instr")
        }
    }
}
(function(_0x17A4F, _0x17A29) {
    if (typeof exports === "object") {
        _0x17A4F["sf2"] = exports;
        _0x17A29(exports)
    } else {
        if (typeof define === "function" && define["amd"]) {
            define(["exports"], function(_0x17A75) {
                _0x17A4F["sf2"] = _0x17A75;
                return _0x17A4F["sf2"],
                _0x17A29(_0x17A75)
            })
        } else {
            _0x17A4F["sf2"] = {};
            _0x17A29(_0x17A4F["sf2"])
        }
    }
}
)(this, function(_0x17A75) {
    "use strict";
    var _0x17A9B = _0x17A75;
    _0x17A9B["Parser"] = function(_0x17AC1, _0x17AE7) {
        _0x17AE7 = _0x17AE7 || {};
        this["input"] = _0x17AC1;
        this["parserOptions"] = _0x17AE7["parserOptions"]
    }
    ;
    _0x17A9B["Parser"]["prototype"]["parse"] = function() {
        var _0x17B33 = new _0x17A9B["Riff"]["Parser"](this["input"],this["parserOptions"]), _0x17B0D;
        _0x17B33["parse"]();
        if (_0x17B33["chunkList"]["length"] !== 1) {
            throw new Error("wrong chunk length")
        }
        ;_0x17B0D = _0x17B33["getChunk"](0);
        if (_0x17B0D === null) {
            throw new Error("chunk not found")
        }
        ;this["parseRiffChunk"](_0x17B0D);
        this["input"] = null
    }
    ;
    _0x17A9B["Parser"]["prototype"]["parseRiffChunk"] = function(_0x17B0D) {
        var _0x17B33, _0x17B59 = this["input"], _0x17B7F = _0x17B0D["offset"], _0x17BA5;
        if (_0x17B0D["type"] !== "RIFF") {
            throw new Error("invalid chunk type:" + _0x17B0D["type"])
        }
        ;_0x17BA5 = String["fromCharCode"](_0x17B59[_0x17B7F++], _0x17B59[_0x17B7F++], _0x17B59[_0x17B7F++], _0x17B59[_0x17B7F++]);
        if (_0x17BA5 !== "sfbk") {
            throw new Error("invalid signature:" + _0x17BA5)
        }
        ;_0x17B33 = new _0x17A9B["Riff"]["Parser"](_0x17B59,{
            index: _0x17B7F,
            length: _0x17B0D["size"] - 4
        });
        _0x17B33["parse"]();
        if (_0x17B33["getNumberOfChunks"]() !== 3) {
            throw new Error("invalid sfbk structure")
        }
        ;this["parseInfoList"](_0x17B33["getChunk"](0));
        this["parseSdtaList"](_0x17B33["getChunk"](1));
        this["parsePdtaList"](_0x17B33["getChunk"](2))
    }
    ;
    _0x17A9B["Parser"]["prototype"]["parseInfoList"] = function(_0x17B0D) {
        var _0x17B33, _0x17B59 = this["input"], _0x17B7F = _0x17B0D["offset"], _0x17BA5;
        if (_0x17B0D["type"] !== "LIST") {
            throw new Error("invalid chunk type:" + _0x17B0D["type"])
        }
        ;_0x17BA5 = String["fromCharCode"](_0x17B59[_0x17B7F++], _0x17B59[_0x17B7F++], _0x17B59[_0x17B7F++], _0x17B59[_0x17B7F++]);
        if (_0x17BA5 !== "INFO") {
            throw new Error("invalid signature:" + _0x17BA5)
        }
        ;_0x17B33 = new _0x17A9B["Riff"]["Parser"](_0x17B59,{
            index: _0x17B7F,
            length: _0x17B0D["size"] - 4
        });
        _0x17B33["parse"]()
    }
    ;
    _0x17A9B["Parser"]["prototype"]["parseSdtaList"] = function(_0x17B0D) {
        var _0x17B33, _0x17B59 = this["input"], _0x17B7F = _0x17B0D["offset"], _0x17BA5;
        if (_0x17B0D["type"] !== "LIST") {
            throw new Error("invalid chunk type:" + _0x17B0D["type"])
        }
        ;_0x17BA5 = String["fromCharCode"](_0x17B59[_0x17B7F++], _0x17B59[_0x17B7F++], _0x17B59[_0x17B7F++], _0x17B59[_0x17B7F++]);
        if (_0x17BA5 !== "sdta") {
            throw new Error("invalid signature:" + _0x17BA5)
        }
        ;_0x17B33 = new _0x17A9B["Riff"]["Parser"](_0x17B59,{
            index: _0x17B7F,
            length: _0x17B0D["size"] - 4
        });
        _0x17B33["parse"]();
        if (_0x17B33["chunkList"]["length"] < 1) {
            throw new Error("TODO")
        }
        ;this["samplingData"] = _0x17B33["getChunk"](0)
    }
    ;
    _0x17A9B["Parser"]["prototype"]["parsePdtaList"] = function(_0x17B0D) {
        var _0x17B33, _0x17B59 = this["input"], _0x17B7F = _0x17B0D["offset"], _0x17BA5;
        if (_0x17B0D["type"] !== "LIST") {
            throw new Error("invalid chunk type:" + _0x17B0D["type"])
        }
        ;_0x17BA5 = String["fromCharCode"](_0x17B59[_0x17B7F++], _0x17B59[_0x17B7F++], _0x17B59[_0x17B7F++], _0x17B59[_0x17B7F++]);
        if (_0x17BA5 !== "pdta") {
            throw new Error("invalid signature:" + _0x17BA5)
        }
        ;_0x17B33 = new _0x17A9B["Riff"]["Parser"](_0x17B59,{
            index: _0x17B7F,
            length: _0x17B0D["size"] - 4
        });
        _0x17B33["parse"]();
        if (_0x17B33["getNumberOfChunks"]() !== 9) {
            throw new Error("invalid pdta chunk")
        }
        ;this["parsePhdr"](_0x17B33["getChunk"](0));
        this["parsePbag"](_0x17B33["getChunk"](1));
        this["parsePmod"](_0x17B33["getChunk"](2));
        this["parsePgen"](_0x17B33["getChunk"](3));
        this["parseInst"](_0x17B33["getChunk"](4));
        this["parseIbag"](_0x17B33["getChunk"](5));
        this["parseImod"](_0x17B33["getChunk"](6));
        this["parseIgen"](_0x17B33["getChunk"](7));
        this["parseShdr"](_0x17B33["getChunk"](8))
    }
    ;
    _0x17A9B["Parser"]["prototype"]["parsePhdr"] = function(_0x17B0D) {
        var _0x17B59 = this["input"]
          , _0x17B7F = _0x17B0D["offset"]
          , _0x17BCB = this["presetHeader"] = []
          , _0x17BF1 = _0x17B0D["offset"] + _0x17B0D["size"];
        if (_0x17B0D["type"] !== "phdr") {
            throw new Error("invalid chunk type:" + _0x17B0D["type"])
        }
        ;while (_0x17B7F < _0x17BF1) {
            _0x17BCB["push"]({
                presetName: String["fromCharCode"]["apply"](null, _0x17B59["subarray"](_0x17B7F, _0x17B7F += 20)),
                preset: _0x17B59[_0x17B7F++] | _0x17B59[_0x17B7F++] << 8,
                bank: _0x17B59[_0x17B7F++] | _0x17B59[_0x17B7F++] << 8,
                presetBagIndex: _0x17B59[_0x17B7F++] | _0x17B59[_0x17B7F++] << 8,
                library: (_0x17B59[_0x17B7F++] | _0x17B59[_0x17B7F++] << 8 | _0x17B59[_0x17B7F++] << 16 | _0x17B59[_0x17B7F++] << 24) >>> 0,
                genre: (_0x17B59[_0x17B7F++] | _0x17B59[_0x17B7F++] << 8 | _0x17B59[_0x17B7F++] << 16 | _0x17B59[_0x17B7F++] << 24) >>> 0,
                morphology: (_0x17B59[_0x17B7F++] | _0x17B59[_0x17B7F++] << 8 | _0x17B59[_0x17B7F++] << 16 | _0x17B59[_0x17B7F++] << 24) >>> 0
            })
        }
    }
    ;
    _0x17A9B["Parser"]["prototype"]["parsePbag"] = function(_0x17B0D) {
        var _0x17B59 = this["input"]
          , _0x17B7F = _0x17B0D["offset"]
          , _0x17C17 = this["presetZone"] = []
          , _0x17BF1 = _0x17B0D["offset"] + _0x17B0D["size"];
        if (_0x17B0D["type"] !== "pbag") {
            throw new Error("invalid chunk type:" + _0x17B0D["type"])
        }
        ;while (_0x17B7F < _0x17BF1) {
            _0x17C17["push"]({
                presetGeneratorIndex: _0x17B59[_0x17B7F++] | _0x17B59[_0x17B7F++] << 8,
                presetModulatorIndex: _0x17B59[_0x17B7F++] | _0x17B59[_0x17B7F++] << 8
            })
        }
    }
    ;
    _0x17A9B["Parser"]["prototype"]["parsePmod"] = function(_0x17B0D) {
        if (_0x17B0D["type"] !== "pmod") {
            throw new Error("invalid chunk type:" + _0x17B0D["type"])
        }
        ;this["presetZoneModulator"] = this["parseModulator"](_0x17B0D)
    }
    ;
    _0x17A9B["Parser"]["prototype"]["parsePgen"] = function(_0x17B0D) {
        if (_0x17B0D["type"] !== "pgen") {
            throw new Error("invalid chunk type:" + _0x17B0D["type"])
        }
        ;this["presetZoneGenerator"] = this["parseGenerator"](_0x17B0D)
    }
    ;
    _0x17A9B["Parser"]["prototype"]["parseInst"] = function(_0x17B0D) {
        var _0x17B59 = this["input"]
          , _0x17B7F = _0x17B0D["offset"]
          , _0x17C3D = this["instrument"] = []
          , _0x17BF1 = _0x17B0D["offset"] + _0x17B0D["size"];
        if (_0x17B0D["type"] !== "inst") {
            throw new Error("invalid chunk type:" + _0x17B0D["type"])
        }
        ;while (_0x17B7F < _0x17BF1) {
            _0x17C3D["push"]({
                instrumentName: String["fromCharCode"]["apply"](null, _0x17B59["subarray"](_0x17B7F, _0x17B7F += 20)),
                instrumentBagIndex: _0x17B59[_0x17B7F++] | _0x17B59[_0x17B7F++] << 8
            })
        }
    }
    ;
    _0x17A9B["Parser"]["prototype"]["parseIbag"] = function(_0x17B0D) {
        var _0x17B59 = this["input"]
          , _0x17B7F = _0x17B0D["offset"]
          , _0x17C63 = this["instrumentZone"] = []
          , _0x17BF1 = _0x17B0D["offset"] + _0x17B0D["size"];
        if (_0x17B0D["type"] !== "ibag") {
            throw new Error("invalid chunk type:" + _0x17B0D["type"])
        }
        ;while (_0x17B7F < _0x17BF1) {
            _0x17C63["push"]({
                instrumentGeneratorIndex: _0x17B59[_0x17B7F++] | _0x17B59[_0x17B7F++] << 8,
                instrumentModulatorIndex: _0x17B59[_0x17B7F++] | _0x17B59[_0x17B7F++] << 8
            })
        }
    }
    ;
    _0x17A9B["Parser"]["prototype"]["parseImod"] = function(_0x17B0D) {
        if (_0x17B0D["type"] !== "imod") {
            throw new Error("invalid chunk type:" + _0x17B0D["type"])
        }
        ;this["instrumentZoneModulator"] = this["parseModulator"](_0x17B0D)
    }
    ;
    _0x17A9B["Parser"]["prototype"]["parseIgen"] = function(_0x17B0D) {
        if (_0x17B0D["type"] !== "igen") {
            throw new Error("invalid chunk type:" + _0x17B0D["type"])
        }
        ;this["instrumentZoneGenerator"] = this["parseGenerator"](_0x17B0D)
    }
    ;
    _0x17A9B["Parser"]["prototype"]["parseShdr"] = function(_0x17B0D) {
        var _0x17B59 = this["input"], _0x17B7F = _0x17B0D["offset"], _0x17E05 = this["sample"] = [], _0x17D6D = this["sampleHeader"] = [], _0x17BF1 = _0x17B0D["offset"] + _0x17B0D["size"], _0x17DB9, _0x17E51, _0x17CAF, _0x17E77, _0x17CD5, _0x17DDF, _0x17CFB, _0x17D21, _0x17D93, _0x17E2B;
        if (_0x17B0D["type"] !== "shdr") {
            throw new Error("invalid chunk type:" + _0x17B0D["type"])
        }
        ;while (_0x17B7F < _0x17BF1) {
            _0x17DB9 = String["fromCharCode"]["apply"](null, _0x17B59["subarray"](_0x17B7F, _0x17B7F += 20));
            _0x17E51 = _0x17B59[_0x17B7F++] << 0 | _0x17B59[_0x17B7F++] << 8 | _0x17B59[_0x17B7F++] << 16 | _0x17B59[_0x17B7F++] << 24;
            _0x17CAF = _0x17B59[_0x17B7F++] << 0 | _0x17B59[_0x17B7F++] << 8 | _0x17B59[_0x17B7F++] << 16 | _0x17B59[_0x17B7F++] << 24;
            _0x17E77 = _0x17B59[_0x17B7F++] << 0 | _0x17B59[_0x17B7F++] << 8 | _0x17B59[_0x17B7F++] << 16 | _0x17B59[_0x17B7F++] << 24;
            _0x17CD5 = _0x17B59[_0x17B7F++] << 0 | _0x17B59[_0x17B7F++] << 8 | _0x17B59[_0x17B7F++] << 16 | _0x17B59[_0x17B7F++] << 24;
            _0x17DDF = _0x17B59[_0x17B7F++] << 0 | _0x17B59[_0x17B7F++] << 8 | _0x17B59[_0x17B7F++] << 16 | _0x17B59[_0x17B7F++] << 24;
            _0x17CFB = _0x17B59[_0x17B7F++];
            _0x17D21 = _0x17B59[_0x17B7F++] << 24 >> 24;
            _0x17D93 = _0x17B59[_0x17B7F++] | _0x17B59[_0x17B7F++] << 8;
            _0x17E2B = _0x17B59[_0x17B7F++] | _0x17B59[_0x17B7F++] << 8;
            var _0x17D47 = new Int16Array(new Uint8Array(_0x17B59["subarray"](this["samplingData"]["offset"] + _0x17E51 * 2, this["samplingData"]["offset"] + _0x17CAF * 2))["buffer"]);
            _0x17E77 -= _0x17E51;
            _0x17CD5 -= _0x17E51;
            if (_0x17DDF > 0) {
                var _0x17C89 = this["adjustSampleData"](_0x17D47, _0x17DDF);
                _0x17D47 = _0x17C89["sample"];
                _0x17DDF *= _0x17C89["multiply"];
                _0x17E77 *= _0x17C89["multiply"];
                _0x17CD5 *= _0x17C89["multiply"]
            }
            ;_0x17E05["push"](_0x17D47);
            _0x17D6D["push"]({
                sampleName: _0x17DB9,
                startLoop: _0x17E77,
                endLoop: _0x17CD5,
                sampleRate: _0x17DDF,
                originalPitch: _0x17CFB,
                pitchCorrection: _0x17D21,
                sampleLink: _0x17D93,
                sampleType: _0x17E2B
            })
        }
    }
    ;
    _0x17A9B["Parser"]["prototype"]["adjustSampleData"] = function(_0x17D47, _0x17DDF) {
        var _0x17F35, _0x17E9D, _0x17EC3, _0x17EE9, _0x17F0F = 1;
        while (_0x17DDF < 22050) {
            var _0x17F5B = _0x17D47["length"];
            _0x17F35 = new Int16Array(_0x17F5B * 2);
            for (_0x17E9D = _0x17EE9 = 0,
            _0x17EC3 = _0x17F5B; _0x17E9D < _0x17EC3; ++_0x17E9D) {
                _0x17F35[_0x17EE9++] = _0x17D47[_0x17E9D];
                _0x17F35[_0x17EE9++] = _0x17D47[_0x17E9D]
            }
            ;_0x17D47 = _0x17F35;
            _0x17F0F *= 2;
            _0x17DDF *= 2
        }
        ;return {
            sample: _0x17D47,
            multiply: _0x17F0F
        }
    }
    ;
    _0x17A9B["Parser"]["prototype"]["parseModulator"] = function(_0x17B0D) {
        var _0x17B59 = this["input"], _0x17B7F = _0x17B0D["offset"], _0x17BF1 = _0x17B0D["offset"] + _0x17B0D["size"], _0x17F81, _0x17FA7, _0x17FCD = [];
        while (_0x17B7F < _0x17BF1) {
            _0x17B7F += 2;
            _0x17F81 = _0x17B59[_0x17B7F++] | _0x17B59[_0x17B7F++] << 8;
            _0x17FA7 = _0x17A9B["Parser"]["GeneratorEnumeratorTable"][_0x17F81];
            if (_0x17FA7 === undefined) {
                _0x17FCD["push"]({
                    type: _0x17FA7,
                    value: {
                        code: _0x17F81,
                        amount: _0x17B59[_0x17B7F] | _0x17B59[_0x17B7F + 1] << 8 << 16 >> 16,
                        lo: _0x17B59[_0x17B7F++],
                        hi: _0x17B59[_0x17B7F++]
                    }
                })
            } else {
                switch (_0x17FA7) {
                case "keyRange":
                    ;
                case "velRange":
                    ;
                case "keynum":
                    ;
                case "velocity":
                    _0x17FCD["push"]({
                        type: _0x17FA7,
                        value: {
                            lo: _0x17B59[_0x17B7F++],
                            hi: _0x17B59[_0x17B7F++]
                        }
                    });
                    break;
                default:
                    _0x17FCD["push"]({
                        type: _0x17FA7,
                        value: {
                            amount: _0x17B59[_0x17B7F++] | _0x17B59[_0x17B7F++] << 8 << 16 >> 16
                        }
                    });
                    break
                }
            }
            ;_0x17B7F += 2;
            _0x17B7F += 2
        }
        ;return _0x17FCD
    }
    ;
    _0x17A9B["Parser"]["prototype"]["parseGenerator"] = function(_0x17B0D) {
        var _0x17B59 = this["input"], _0x17B7F = _0x17B0D["offset"], _0x17BF1 = _0x17B0D["offset"] + _0x17B0D["size"], _0x17F81, _0x17FA7, _0x17FCD = [];
        while (_0x17B7F < _0x17BF1) {
            _0x17F81 = _0x17B59[_0x17B7F++] | _0x17B59[_0x17B7F++] << 8;
            _0x17FA7 = _0x17A9B["Parser"]["GeneratorEnumeratorTable"][_0x17F81];
            if (_0x17FA7 === undefined) {
                _0x17FCD["push"]({
                    type: _0x17FA7,
                    value: {
                        code: _0x17F81,
                        amount: _0x17B59[_0x17B7F] | _0x17B59[_0x17B7F + 1] << 8 << 16 >> 16,
                        lo: _0x17B59[_0x17B7F++],
                        hi: _0x17B59[_0x17B7F++]
                    }
                });
                continue
            }
            ;switch (_0x17FA7) {
            case "keynum":
                ;
            case "keyRange":
                ;
            case "velRange":
                ;
            case "velocity":
                _0x17FCD["push"]({
                    type: _0x17FA7,
                    value: {
                        lo: _0x17B59[_0x17B7F++],
                        hi: _0x17B59[_0x17B7F++]
                    }
                });
                break;
            default:
                _0x17FCD["push"]({
                    type: _0x17FA7,
                    value: {
                        amount: _0x17B59[_0x17B7F++] | _0x17B59[_0x17B7F++] << 8 << 16 >> 16
                    }
                });
                break
            }
        }
        ;return _0x17FCD
    }
    ;
    _0x17A9B["Parser"]["prototype"]["getInstruments"] = function() {
        var _0x17C3D = this["instrument"], _0x180B1 = this["instrumentZone"], _0x17FCD = [], _0x17FF3, _0x18019, _0x180D7, _0x1803F, _0x18065, _0x17E9D, _0x17EC3, _0x17EE9, _0x1808B;
        for (_0x17E9D = 0,
        _0x17EC3 = _0x17C3D["length"]; _0x17E9D < _0x17EC3; ++_0x17E9D) {
            _0x17FF3 = _0x17C3D[_0x17E9D]["instrumentBagIndex"];
            _0x18019 = _0x17C3D[_0x17E9D + 1] ? _0x17C3D[_0x17E9D + 1]["instrumentBagIndex"] : _0x180B1["length"];
            _0x180D7 = [];
            for (_0x17EE9 = _0x17FF3,
            _0x1808B = _0x18019; _0x17EE9 < _0x1808B; ++_0x17EE9) {
                _0x1803F = this["createInstrumentGenerator_"](_0x180B1, _0x17EE9);
                _0x18065 = this["createInstrumentModulator_"](_0x180B1, _0x17EE9);
                _0x180D7["push"]({
                    generator: _0x1803F["generator"],
                    modulator: _0x18065["modulator"]
                })
            }
            ;_0x17FCD["push"]({
                name: _0x17C3D[_0x17E9D]["instrumentName"],
                info: _0x180D7
            })
        }
        ;return _0x17FCD
    }
    ;
    _0x17A9B["Parser"]["prototype"]["createInstrumentGenerator_"] = function(_0x180B1, _0x180FD) {
        var _0x18123 = this["createBagModGen_"](_0x180B1, _0x180B1[_0x180FD]["instrumentGeneratorIndex"], _0x180B1[_0x180FD + 1] ? _0x180B1[_0x180FD + 1]["instrumentGeneratorIndex"] : this["instrumentZoneGenerator"]["length"], this["instrumentZoneGenerator"]);
        return {
            generator: _0x18123["modgen"]
        }
    }
    ;
    _0x17A9B["Parser"]["prototype"]["createInstrumentModulator_"] = function(_0x180B1, _0x180FD) {
        var _0x18123 = this["createBagModGen_"](_0x180B1, _0x180B1[_0x180FD]["presetModulatorIndex"], _0x180B1[_0x180FD + 1] ? _0x180B1[_0x180FD + 1]["instrumentModulatorIndex"] : this["instrumentZoneModulator"]["length"], this["instrumentZoneModulator"]);
        return {
            modulator: _0x18123["modgen"]
        }
    }
    ;
    _0x17A9B["Parser"]["prototype"]["createBagModGen_"] = function(_0x180B1, _0x1816F, _0x18149, _0x181BB) {
        var _0x18123 = {
            unknown: [],
            keyRange: {
                hi: 127,
                lo: 0
            }
        };
        var _0x18195, _0x17E9D, _0x17EC3;
        for (_0x17E9D = _0x1816F,
        _0x17EC3 = _0x18149; _0x17E9D < _0x17EC3; ++_0x17E9D) {
            _0x18195 = _0x181BB[_0x17E9D];
            if (_0x18195["type"] === "unknown") {
                _0x18123["unknown"]["push"](_0x18195["value"])
            } else {
                _0x18123[_0x18195["type"]] = _0x18195["value"]
            }
        }
        ;return {
            modgen: _0x18123
        }
    }
    ;
    _0x17A9B["Parser"]["GeneratorEnumeratorTable"] = ["startAddrsOffset", "endAddrsOffset", "startloopAddrsOffset", "endloopAddrsOffset", "startAddrsCoarseOffset", "modLfoToPitch", "vibLfoToPitch", "modEnvToPitch", "initialFilterFc", "initialFilterQ", "modLfoToFilterFc", "modEnvToFilterFc", "endAddrsCoarseOffset", "modLfoToVolume", undefined, "chorusEffectsSend", "reverbEffectsSend", "pan", undefined, undefined, undefined, "delayModLFO", "freqModLFO", "delayVibLFO", "freqVibLFO", "delayModEnv", "attackModEnv", "holdModEnv", "decayModEnv", "sustainModEnv", "releaseModEnv", "keynumToModEnvHold", "keynumToModEnvDecay", "delayVolEnv", "attackVolEnv", "holdVolEnv", "decayVolEnv", "sustainVolEnv", "releaseVolEnv", "keynumToVolEnvHold", "keynumToVolEnvDecay", "instrument", undefined, "keyRange", "velRange", "startloopAddrsCoarseOffset", "keynum", "velocity", "initialAttenuation", undefined, "endloopAddrsCoarseOffset", "coarseTune", "fineTune", "sampleID", "sampleModes", undefined, "scaleTuning", "exclusiveClass", "overridingRootKey"];
    _0x17A9B["Riff"] = {};
    _0x17A9B["Riff"]["Parser"] = function(_0x17AC1, _0x17AE7) {
        _0x17AE7 = _0x17AE7 || {};
        this["input"] = _0x17AC1;
        this["ip"] = _0x17AE7["index"] || 0;
        this["length"] = _0x17AE7["length"] || _0x17AC1["length"] - this["ip"];
        this["offset"] = this["ip"];
        this["padding"] = _0x17AE7["padding"] !== undefined ? _0x17AE7["padding"] : true;
        this["bigEndian"] = _0x17AE7["bigEndian"] !== undefined ? _0x17AE7["bigEndian"] : false
    }
    ;
    _0x17A9B["Riff"]["Chunk"] = function(_0x18207, _0x17BF1, _0x181E1) {
        this["type"] = _0x18207;
        this["size"] = _0x17BF1;
        this["offset"] = _0x181E1
    }
    ;
    _0x17A9B["Riff"]["Parser"]["prototype"]["parse"] = function() {
        var _0x1822D = this["length"] + this["offset"];
        this["chunkList"] = [];
        while (this["ip"] < _0x1822D) {
            this["parseChunk"]()
        }
    }
    ;
    _0x17A9B["Riff"]["Parser"]["prototype"]["parseChunk"] = function() {
        var _0x17AC1 = this["input"], _0x17B7F = this["ip"], _0x17BF1;
        this["chunkList"]["push"](new _0x17A9B["Riff"]["Chunk"](String["fromCharCode"](_0x17AC1[_0x17B7F++], _0x17AC1[_0x17B7F++], _0x17AC1[_0x17B7F++], _0x17AC1[_0x17B7F++]),_0x17BF1 = this["bigEndian"] ? _0x17AC1[_0x17B7F++] << 24 | _0x17AC1[_0x17B7F++] << 16 | _0x17AC1[_0x17B7F++] << 8 | _0x17AC1[_0x17B7F++] : _0x17AC1[_0x17B7F++] | _0x17AC1[_0x17B7F++] << 8 | _0x17AC1[_0x17B7F++] << 16 | _0x17AC1[_0x17B7F++] << 24,_0x17B7F));
        _0x17B7F += _0x17BF1;
        if ((this["padding"] && _0x17B7F - this["offset"] & 1) === 1) {
            _0x17B7F++
        }
        ;this["ip"] = _0x17B7F
    }
    ;
    _0x17A9B["Riff"]["Parser"]["prototype"]["getChunk"] = function(_0x180FD) {
        var _0x17B0D = this["chunkList"][_0x180FD];
        if (_0x17B0D === undefined) {
            return null
        }
        ;return _0x17B0D
    }
    ;
    _0x17A9B["Riff"]["Parser"]["prototype"]["getNumberOfChunks"] = function() {
        return this["chunkList"]["length"]
    }
    ;
    return _0x17A9B
});
function Midi5(_0x18337) {
    var _0x182C5 = _0x18337, _0x18B3B = _0x182C5["onend"] || function() {}
    , _0x18B61 = _0x182C5["onnote"] || function() {}
    , _0x19C01, _0x19C27 = [], _0x189BF, _0x18A57, _0x18C91;
    function _0x18AEF(_0x18DE7, _0x18DC1, _0x18F89) {
        var _0x18739 = _0x18DE7[3] | 0
          , _0x17E9D = _0x18DE7[2]
          , _0x19C4D = _0x18DE7[6] & 15;
        if (_0x17E9D != _0x19C27[_0x19C4D]) {
            _0x19C27[_0x19C4D] = _0x17E9D;
            if (_0x182C5["gain"] != 0) {
                _0x19C01["send"](new Uint8Array([176 + _0x19C4D, 0, _0x17E9D >> 14 & 127, 176 + _0x19C4D, 32, _0x17E9D >> 7 & 127, 192 + _0x19C4D, _0x17E9D & 127]))
            }
        }
        ;var _0x189E5 = _0x18337["gain"] < 2 ? 1 : _0x18337["gain"] - 1;
        console["log"]("\u97f3\u91cf\uff1a", _0x189E5);
        if (_0x182C5["gain"] != 0) {
            _0x19C01["send"](new Uint8Array([144 + _0x19C4D, _0x18739, 128 * (_0x189E5) / 10 * _0x18DE7[5]]), _0x18DC1);
            _0x19C01["send"](new Uint8Array([128 + _0x19C4D, _0x18739, 64]), _0x18DC1 + _0x18F89 - 20)
        }
    }
    function _0x18BD3(_0x184B3) {
        var _0x18DC1, _0x18DE7, _0x19319, _0x193B1, _0x19047, _0x18F89;
        _0x18DE7 = _0x184B3[_0x189BF];
        if (!_0x19C01 || _0x189BF >= _0x18A57 || !_0x18DE7) {
            _0x18B3B();
            return
        }
        ;if (_0x182C5["new_speed"]) {
            _0x18C91 = window - performance["now"]() - (window["performance"]["now"]() - _0x18C91) * _0x182C5["speed"] / _0x182C5["new_speed"];
            _0x182C5["speed"] = _0x182C5["new_speed"];
            _0x182C5["new_speed"] = 0
        }
        ;_0x18DC1 = _0x18DE7[1] / _0x182C5["speed"] * 1e3;
        _0x193B1 = _0x18DC1 + 3e3;
        while (1) {
            if (user["timeouts"]["length"] > 100) {
                user["timeouts"]["splice"](0, 80)
            }
            ;_0x18F89 = _0x18DE7[4] / _0x182C5["speed"] * 1e3;
            if (_0x18DE7[5] != 0) {
                _0x18AEF(_0x18DE7, _0x18DC1 + _0x18C91, _0x18F89)
            }
            ;_0x19047 = _0x18DC1 + _0x18C91 - window["performance"]["now"]();
            var _0x1912B = _0x18DE7[1];
            var _0x190B9 = _0x18DE7[0];
            var _0x19177 = setTimeout(_0x18B61, _0x19047, _0x18DE7[0], true, _0x1912B, _0x190B9);
            user["timeouts"]["push"](_0x19177);
            var _0x1919D = setTimeout(_0x18B61, _0x19047 + _0x18F89, _0x18DE7[0], false, _0x1912B, _0x190B9);
            user["timeouts"]["push"](_0x1919D);
            _0x18DE7 = _0x184B3[++_0x189BF];
            if (!_0x18DE7 || _0x189BF >= _0x18A57) {
                var _0x195C5 = setTimeout(_0x18B3B, _0x18DC1 + _0x18C91 - window["performance"]["now"]() + _0x18F89);
                user["timeouts"]["push"](_0x195C5);
                return
            }
            ;_0x18DC1 = _0x18DE7[1] / _0x182C5["speed"] * 1e3;
            if (_0x18DC1 > _0x193B1) {
                break
            }
        }
        ;var _0x1959F = setTimeout(_0x18BD3, _0x18DC1 + _0x18C91 - window["performance"]["now"]() - 300, _0x184B3);
        user["timeouts"]["push"](_0x1959F)
    }
    return {
        get_outputs: function() {
            if (Midi5["ma"]) {
                if (outputDev == null) {
                    _0x19C01 = Midi5["ma"]["outputs"]["values"]()["next"]()["value"]
                } else {
                    var _0x18441 = Midi5["ma"]["outputs"]["values"]();
                    for (var _0x17FCD = _0x18441["next"](); _0x17FCD && !_0x17FCD["done"]; _0x17FCD = _0x18441["next"]()) {
                        if (_0x17FCD["value"]["name"] == outputDev) {
                            _0x19C01 = _0x17FCD["value"];
                            if (_0x19C01["name"]["indexOf"]("xzds") > -1) {
                                global_volume = 6;
                                set_vol(global_volume)
                            }
                        }
                    }
                }
            }
            ;if (user["isBanOutput"]) {
                _0x19C01 = null
            }
            ;if (_0x19C01) {
                return [_0x19C01["name"]]
            }
        },
        set_output: function(_0x1854B) {},
        play: function(_0x184FF, _0x184D9, _0x184B3) {
            invisibleM = null;
            staffL = null;
            if (!_0x184B3 || _0x184FF >= _0x184B3["length"]) {
                _0x18B3B();
                return
            }
            ;_0x18A57 = _0x184D9;
            _0x189BF = _0x184FF;
            _0x18C91 = window["performance"]["now"]() + 200 - _0x184B3[_0x189BF][1] * _0x182C5["speed"] * 1e3;
            if (user["startplayCball"]) {
                typeof (user["startplayCball"]) == "function" && user["startplayCball"]()
            }
            ;if (user["playTimeout"] && user["playTimeout"] > 0) {
                _0x18C91 += user["playTimeout"] * 1000 - 0.1 * 1000
            }
            ;_0x18BD3(_0x184B3)
        },
        stop: function() {
            _0x18A57 = 0;
            if (_0x19C01 && _0x19C01["clear"]) {
                _0x19C01["clear"]()
            }
            ;clearAllTimeout();
            _0x18B3B()
        }
    }
}
function changeInstr(_0x19871) {
    play_tune(0);
    setTimeout(function() {
        if (play["a_pe"] != null) {
            for (var _0x17E9D = 0; _0x17E9D < play["a_pe"]["length"]; _0x17E9D++) {
                play["a_pe"][_0x17E9D][2] = _0x19871
            }
        }
        ;play_tune(3)
    }, 10)
}
function getGloAE() {
    getNoteData();
    return glo_a_e
}
function changeSpeed(_0x198BD) {
    play_tune(0);
    var _0x180FD = 0;
    var _0x19897 = curr_play_time;
    setTimeout(function() {
        if (play["a_pe"] != null) {
            for (var _0x17E9D = 0; _0x17E9D < play["a_pe"]["length"]; _0x17E9D++) {
                if (play["a_pe"][_0x17E9D][1] > curr_play_time) {
                    var _0x196CF = play["a_pe"][_0x17E9D][4];
                    var _0x198E3 = _0x196CF / _0x198BD;
                    var _0x18843 = play["a_pe"][_0x17E9D][1];
                    var _0x19909 = _0x19897 + (_0x18843 - _0x19897) / _0x198BD;
                    play["a_pe"][_0x17E9D][1] = _0x19909;
                    play["a_pe"][_0x17E9D][4] = _0x198E3
                }
            }
        }
        ;play_tune(3)
    }, 10)
}
function handleTie(_0x184FF, _0x19047, _0x18B61, _0x1912B) {
    if (syms[_0x184FF] && syms[_0x184FF]["tie_s"]) {
        var _0x192F3 = getNoteTime(syms[_0x184FF], syms[_0x184FF]["dur"]);
        var _0x19B8F = syms[_0x184FF]["tie_s"];
        var _0x19B69 = _0x19B8F["istart"];
        var _0x19BB5 = getNoteTime(syms[_0x19B69], syms[_0x19B69]["time_inter"]);
        console["log"]("\u8fde\u97f3\u7ebf\u540e\u97f3\u7b26:", _0x19B69, " \u65f6\u503c\uff1a", syms[_0x19B69]["dur"]);
        var _0x19BDB = document["getElementsByClassName"]("_" + _0x19B69 + "_single");
        if (_0x19BDB && _0x19BDB["length"] > 0) {
            var _0x19553 = $(_0x19BDB[0])["attr"]("time");
            singleRectArr = $("rect[time=\'" + _0x19553 + "\']");
            var _0x18207 = $(_0x19BDB[0])["attr"]("data-type");
            if (_0x18207 == "dot") {
                var _0x192CD = syms[_0x19B69];
                var _0x195EB = getNoteTime(_0x192CD, _0x192CD["my_wmeasure"] / parseInt(_0x192CD["my_meter"][0]["top"]));
                console["log"]("unitDur:", _0x195EB);
                var _0x19449 = getNoteTime(_0x192CD, _0x192CD["dur"]);
                for (var _0x190DF = 0; _0x190DF < singleRectArr["length"]; _0x190DF++) {
                    i = "_" + _0x19B69 + "_single.s" + _0x190DF;
                    if (_0x19449 >= _0x195EB) {
                        var _0x194BB = _0x19047 + _0x192F3 * 1e3 + _0x195EB * 1e3 * _0x190DF;
                        var _0x1946F = _0x195EB * 1e3;
                        console["log"]("singleStartTime:", _0x194BB, "   singleDur:", _0x1946F);
                        var _0x194E1 = setTimeout(_0x18B61, _0x194BB, i, true, _0x1912B, _0x184FF);
                        user["timeouts"]["push"](_0x194E1);
                        var _0x19507 = setTimeout(_0x18B61, _0x194BB + _0x1946F, i, false, _0x1912B, _0x184FF);
                        user["timeouts"]["push"](_0x19507);
                        _0x19449 = _0x19449 - _0x195EB
                    } else {
                        if (_0x19449 > 0) {
                            var _0x194BB = _0x19047 + _0x192F3 * 1e3 + _0x195EB * 1e3 * _0x190DF;
                            var _0x1946F = _0x19449 * 1e3;
                            console["log"]("singleStartTime:", _0x194BB, "   singleDur:", _0x1946F);
                            var _0x194E1 = setTimeout(_0x18B61, _0x194BB, i, true, _0x1912B, _0x184FF);
                            user["timeouts"]["push"](_0x194E1);
                            var _0x19507 = setTimeout(_0x18B61, _0x194BB + _0x1946F, i, false, _0x1912B, _0x184FF);
                            user["timeouts"]["push"](_0x19507)
                        }
                    }
                }
            } else {
                var _0x19281 = (_0x19BB5 * 1e3) / _0x19BDB["length"];
                for (var _0x190DF = 0; _0x190DF < _0x19BDB["length"]; _0x190DF++) {
                    i = "_" + _0x19B69 + "_single.s" + _0x190DF;
                    var _0x194BB = _0x19047 + _0x192F3 * 1e3 + _0x19281 * _0x190DF;
                    var _0x1946F = _0x19281;
                    console["log"]("  tie_istart:", _0x19B69, "  currDurSec:", _0x192F3, " singleStartTime:", _0x194BB, "  singleDur:", _0x1946F);
                    var _0x194E1 = setTimeout(_0x18B61, _0x194BB, i, true, _0x1912B, _0x184FF);
                    user["timeouts"]["push"](_0x194E1);
                    var _0x19507 = setTimeout(_0x18B61, _0x194BB + _0x1946F, i, false, _0x1912B, _0x184FF);
                    user["timeouts"]["push"](_0x19507)
                }
            }
        }
        ;if (syms[_0x19B69] && syms[_0x19B69]["tie_s"]) {
            handleTie(_0x19B69, _0x19047 + _0x192F3 * 1e3, _0x18B61, _0x1912B)
        }
        ;_0x192F3 = null;
        _0x19B8F = null;
        _0x19B69 = null;
        _0x19BB5 = null;
        _0x19BDB = null
    }
}
function getNoteTime(_0x18D9B, _0x196CF) {
    if (!_0x18D9B["my_tempo"]) {
        _0x18D9B["my_tempo"] = 120;
        _0x18D9B["my_tempo_notes"] = new Array();
        _0x18D9B["my_tempo_notes"]["push"](192)
    }
    ;if (_0x196CF) {
        return _0x196CF / _0x18D9B["my_tempo_notes"][0] * 60 / _0x18D9B["my_tempo"]
    }
    ;if (_0x18D9B["time_inter"] == 0) {
        return _0x18D9B["dur"] / _0x18D9B["my_tempo_notes"][0] * 60 / _0x18D9B["my_tempo"]
    } else {
        return _0x18D9B["time_inter"] / _0x18D9B["my_tempo_notes"][0] * 60 / _0x18D9B["my_tempo"]
    }
}
function changeVolumn(_0x18467, _0x1992F) {
    if (play["a_pe"] != null) {
        for (var _0x17E9D = 0; _0x17E9D < play["a_pe"]["length"]; _0x17E9D++) {
            if (play["a_pe"][_0x17E9D][6] == _0x18467 && play["a_pe"][_0x17E9D][3] != 0) {
                play["a_pe"][_0x17E9D][5] = _0x1992F
            }
        }
    }
}
function pageArray(_0x19D31, pageSize, _0x19D0B) {
    var _0x181E1 = (_0x19D31 - 1) * pageSize;
    return (_0x181E1 + pageSize >= _0x19D0B["length"]) ? _0x19D0B["slice"](_0x181E1, _0x19D0B["length"]) : _0x19D0B["slice"](_0x181E1, _0x181E1 + pageSize)
}
function getVoiceVolumn(_0x18467) {
    if (vols) {
        for (var _0x17E9D = 0; _0x17E9D < vols["length"]; _0x17E9D++) {
            if (vols[_0x17E9D]["v"] == _0x18467) {
                return vols[_0x17E9D]["vol"]
            }
        }
    }
    ;return 1
}
function playOneNote(_0x184FF, _0x19D57, _0x196CF, _0x19DA3) {
    var _0x19D7D = [];
    var _0x18785 = new Float32Array(7);
    _0x18785[0] = _0x184FF;
    _0x18785[1] = 0;
    _0x18785[2] = _0x19D57;
    _0x18785[3] = _0x19DA3;
    _0x18785[4] = _0x196CF;
    _0x18785[5] = 1;
    _0x18785[6] = 0;
    _0x19D7D[0] = _0x18785;
    play_one(_0x19D7D)
}
function checkGracePos(_0x18D9B) {
    if (_0x18D9B["grace"]) {
        var _0x18A57 = _0x18D9B["iend"];
        var _0x19955 = $("#source")["val"]();
        var _0x1997B = _0x19955["substring"](_0x18A57, _0x18A57 + 2);
        if (_0x1997B["replace"](/\s/g, "")["indexOf"]("})") > -1) {
            return "right"
        }
        ;return "left"
    }
    ;return null
}
function getSTop(_0x18D9B) {
    var _0x19B1D = _0x18D9B["p_v"]["meter"]["a_meter"][_0x18D9B["p_v"]["meter"]["a_meter"]["length"] - 1]["top"];
    if (_0x19B1D == "C" && _0x18D9B["p_v"]["meter"]["a_meter"]["length"] > 1) {
        var _0x19B43 = _0x18D9B["p_v"]["meter"]["a_meter"][1]["top"];
        if (_0x19B43 == "|") {
            _0x19B1D = 2
        }
        ;return _0x19B1D
    }
    ;if (_0x19B1D == "C") {
        _0x19B1D = 4
    }
    ;return _0x19B1D
}
function clearAllTimeout() {
    for (var _0x17E9D = 0; _0x17E9D < user["timeouts"]["length"]; _0x17E9D++) {
        clearTimeout(user["timeouts"][_0x17E9D])
    }
    ;user["timeouts"] = new Array()
}
function onMIDISuccess(_0x19C99) {
    var _0x19CBF = _0x19C99["inputs"]["values"]();
    for (var _0x17AC1 = _0x19CBF["next"](); _0x17AC1 && !_0x17AC1["done"]; _0x17AC1 = _0x19CBF["next"]()) {
        var _0x19CE5 = _0x17AC1["value"];
        if (_0x19CE5 != null) {
            Midi5["ma"] = _0x19C99;
            break
        }
    }
}
function onMIDIFailure(_0x19C73) {}
if (navigator["requestMIDIAccess"]) {
    navigator["requestMIDIAccess"]()["then"](onMIDISuccess, onMIDIFailure)
}

/* upload */

host = "/file/";
g_dirname = "";
g_object_name = "";
g_object_name_type = "";
now = timestamp = Date["parse"](new Date()) / 1000;
var policyText = {
    "expiration": "2099-01-01T12:00:00.000Z",
    "conditions": [["content-length-range", 0, 1048576000]]
};
function check_object_radio() {
    var _0x24C8E = document["getElementsByName"]("myradio");
    for (var _0x24C6F = 0; _0x24C6F < _0x24C8E["length"]; _0x24C6F++) {
        if (_0x24C8E[_0x24C6F]["checked"]) {
            g_object_name_type = _0x24C8E[_0x24C6F]["value"];
            break
        }
    }
}
function get_dirname() {
    var _0x24CAD = new Date();
    dir = document["getElementById"]("dirname")["value"];
    if (uploader["options"] && uploader["options"]["isUseDefaultPath"]) {
        dir = "files/" + _0x24CAD["getFullYear"]() + "/" + (_0x24CAD["getMonth"]() + 1) + "/" + _0x24CAD["getDate"]()
    }
    ;if (dir != "" && dir["indexOf"]("/") != dir["length"] - 1) {
        dir = dir + "/"
    }
    ;g_dirname = dir
}
function random_string(_0x24CEB) {
    console["log"]("random_string");
    len = _0x24CEB || 32;
    var _0x24CCC = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
    var _0x24D0A = _0x24CCC["length"];
    var _0x24D29 = "";
    for (var _0x24C6F = 0; _0x24C6F < _0x24CEB; _0x24C6F++) {
        _0x24D29 += _0x24CCC["charAt"](Math["floor"](Math["random"]() * _0x24D0A))
    }
    ;console["log"]("pwd", _0x24D29);
    return _0x24D29
}
function get_suffix(_0x24C50) {
    pos = _0x24C50["lastIndexOf"](".");
    suffix = "";
    if (pos != -1) {
        suffix = _0x24C50["substring"](pos)
    }
    ;return suffix
}
function calculate_object_name(_0x24C50) {
    if (g_object_name_type == "local_name") {
        g_object_name += _0x24C50
    } else {
        suffix = get_suffix(_0x24C50);
        g_object_name = g_dirname + random_string(10) + suffix
    }
    ;return ""
}
function get_uploaded_object_name(_0x24C50) {
    if (g_object_name_type == "local_name") {
        tmp_name = g_object_name;
        tmp_name = tmp_name["replace"]("${filename}", _0x24C50);
        return tmp_name
    } else {
        return g_object_name
    }
}
function set_upload_param(_0x24B77, _0x24C50, _0x24D67, _0x24D48) {
    g_object_name = g_dirname;
    if (_0x24C50 != "") {
        suffix = get_suffix(_0x24C50);
        calculate_object_name(_0x24C50)
    }
    ;new_multipart_params = {
        'key': g_object_name,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid,
        'success_action_status': "200",
        'signature': signature
    };
    if (_0x24D48) {
        new_multipart_params = Object["assign"](new_multipart_params, _0x24D48)
    }
    ;_0x24B77["setOption"]({
        'url': host,
        'multipart_params': new_multipart_params
    });
    if (_0x24B77["options"] && _0x24B77["options"]["startCb"] && typeof _0x24B77["options"]["startCb"] == "function") {
        _0x24B77["options"]["startCb"]()
    }
    ;_0x24B77["start"]()
}
var uploader = new plupload["Uploader"]({
    runtimes: "html5,flash,silverlight,html4",
    browse_button: "selectfiles",
    container: document["getElementById"]("container"),
    flash_swf_url: "lib/plupload-2.1.2/js/Moxie.swf",
    silverlight_xap_url: "lib/plupload-2.1.2/js/Moxie.xap",
    url: "http://oss.aliyuncs.com", // 阿里云 OSS
    init: {
        PostInit: function() {
            document["getElementById"]("ossfile")["innerHTML"] = "";
            document["getElementById"]("postfiles")["onclick"] = function() {
                console["log"]("PostInit");
                set_upload_param(uploader, "", false);
                return false
            }
        },
        FilesAdded: function(_0x24B77, _0x24B58) {
            console["log"]("FilesAdded");
            if (uploader["options"] && uploader["options"]["isUploadNow"]) {
                set_upload_param(uploader, "", false)
            }
            ;plupload["each"](_0x24B58, function(_0x24B96) {
                document["getElementById"]("ossfile")["innerHTML"] += "<div id=\"" + _0x24B96["id"] + "\">" + _0x24B96["name"] + " (" + plupload["formatSize"](_0x24B96["size"]) + ")<b style=\"display:inherit;\"></b>" + "<div class=\"progress\"><div class=\"progress-bar\" style=\"width: 0%\"></div></div>" + "</div>"
            })
        },
        BeforeUpload: function(_0x24B77, _0x24B96) {
            console["log"]("BeforeUpload");
            check_object_radio();
            get_dirname();
            set_upload_param(_0x24B77, _0x24B96["name"], true);
            _0x24B96["path"] = "/" + g_object_name
        },
        UploadProgress: function(_0x24B77, _0x24B96) {
            if (uploader["options"] && uploader["options"]["progressCb"] && typeof uploader["options"]["progressCb"] == "function") {
                uploader["options"]["progressCb"](_0x24B77, _0x24B96)
            }
            ;var _0x24BB5 = document["getElementById"](_0x24B96["id"]);
            _0x24BB5["getElementsByTagName"]("b")[0]["innerHTML"] = "<span>" + _0x24B96["percent"] + "%</span>";
            var _0x24BD4 = _0x24BB5["getElementsByTagName"]("div")[0];
            var _0x24BF3 = _0x24BD4["getElementsByTagName"]("div")[0];
            _0x24BF3["style"]["width"] = 2 * _0x24B96["percent"] + "px";
            _0x24BF3["setAttribute"]("aria-valuenow", _0x24B96["percent"])
        },
        FileUploaded: function(_0x24B77, _0x24B96, _0x24C12) {
            if (_0x24C12["status"] == 200) {
                document["getElementById"](_0x24B96["id"])["getElementsByTagName"]("b")[0]["innerHTML"] = "\u4e0a\u4f20\u6210\u529f";
                if (uploader["options"] && uploader["options"]["sucessCb"] && typeof uploader["options"]["sucessCb"] == "function") {
                    uploader["options"]["sucessCb"](_0x24B77, _0x24B96, _0x24C12)
                }
            } else {
                document["getElementById"](_0x24B96["id"])["getElementsByTagName"]("b")[0]["innerHTML"] = _0x24C12["response"];
                if (uploader["options"] && uploader["options"]["failCb"] && typeof uploader["options"]["failCb"] == "function") {
                    uploader["options"]["failCb"](_0x24B77, _0x24B96, _0x24C12)
                }
            }
        },
        Error: function(_0x24B77, _0x24C31) {
            document["getElementById"]("console")["appendChild"](document["createTextNode"]("\x0AError xml:" + _0x24C31["response"]));
            if (uploader["options"] && uploader["options"]["failCb"] && typeof uploader["options"]["failCb"] == "function") {
                uploader["options"]["failCb"](_0x24B77, _0x24C31)
            }
        }
    }
});
uploader["prototype"] = {
    constructor: this,
    options: {
        isUploadNow: false,
        progressCb: function() {},
        startCb: function() {},
        sucessCb: function() {},
        failCb: function() {}
    }
};
var policyBase64 = Base64["encode"](JSON["stringify"](policyText));
message = policyBase64;
accessid = "B8AF6VmQ43QO6Hl6";
accesskey = "EdpVswzSMV82I2EDtl4KG8J52hgzbF";
var bytes = Crypto["HMAC"](Crypto["SHA1"], message, accesskey, {
    asBytes: true
});
var signature = Crypto["util"]["bytesToBase64"](bytes);
uploader["init"]()

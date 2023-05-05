// abc2svg - ABC to SVG translator
// @source: https://chiselapp.com/user/moinejf/repository/abc2svg
// Copyright (C) 2014-2019 Jean-Francois Moine - LGPL3+
//page.js-module to generate one SVG image per page
abc2svg.page = {
    img_out: function(page, p) {
        var cur_img_out = user.img_out;
        page.user_out(p);
        if (user.img_out != cur_img_out) {
            page.user_out = user.img_out;
            if (cur_img_out == page.img_out_sav) {
                user.img_out = abc2svg.page.img_in.bind(page.abc);
                page.img_out_sav = user.img_out
            } else {
                user.img_out = cur_img_out
            }
        }
    },
    abc_end: function(of) {
        var page = this.page
        if (page.h) {
            abc2svg.page.img_out(page, page.head.replace("pagenum",page.pn) + page.style + page.hf + page.out + '</svg>');
            abc2svg.page.img_out(page, '</div>');
            page.h = 0;
            page.out = ''
        }
        of()
    },
    svg_head: function(cfmt) {
        return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"\n\
 xmlns:xlink="http://www.w3.org/1999/xlink"\n\
 color="black" class="music" stroke-width=".7"\n\
 page="pagenum"\
 width="' + cfmt.pagewidth.toFixed(0) + 'px" height="' + cfmt.pageheight.toFixed(0) + 'px"' + (cfmt.bgcolor ? (' style="background-color: ' + cfmt.bgcolor + '"') : '') + '>\n'
    },
    svg_out: function(abc, page) {
        var h, o_font, cfmt = abc.cfmt();
        function header_footer(o_font, str) {
            var c, i, k, t, n_font, c_font = o_font,
            nl = 1,
            j = 0,
            r = ["", "", ""]
            if (str[0] == '"') str = str.slice(1, -1);
            if (str.indexOf('\t') < 0) str = '\t' + str
            for (i = 0; i < str.length; i++) {
                c = str[i]
                switch (c) {
                case '>':
                    r[j] += "&gt;"
                    continue
                case '<':
                    r[j] += "&lt;"
                    continue
                case '&':
                    for (k = i + 1; k < i + 8; k++) {
                        if (!str[k] || str[k] == '&' || str[k] == ';') break
                    }
                    r[j] += str[k] == ';' ? "&": "&amp;"
                    continue
                case '\t':
                    if (j < 2) j++
                    continue
                case '\\':
                    if (c_font != o_font) {
                        r[j] += "</tspan>"
                    }
                    for (j = 0; j < 3; j++) r[j] += '\n';
                    nl++;
                    j = 0;
                    i++
                    continue
                default:
                    r[j] += c
                    continue
                case '$':
                    break
                }
                c = str[++i]
                switch (c) {
                case 'd':
                    break
                case 'D':
                    r[j] += new Date().toUTCString();
                    break
                case 'F':
                    r[j] += abc.get_fname();
                    break
                case 'I':
                    c = str[++i]
                case 'T':
                    t = abc.info()[c]
                    if (t) r[j] += t.split('\n', 1)[0]
                    break
                case 'P':
                case 'Q':
                    t = c == 'P' ? page.pn: page.pna
                    switch (str[i + 1]) {
                    case '0':
                        i++
                        if (! (t & 1)) r[j] += t
                        break
                    case '1':
                        i++
                        if (t & 1) r[j] += t
                        break
                    default:
                        r[j] += t
                        break
                    }
                    break
                case 'V':
                    r[j] += "abc2svg-" + abc2svg.version
                    break
                default:
                    if (c == '0') n_font = o_font
                    else if (c >= '1' && c < '9') n_font = abc.get_font("u" + c)
                    else break
                    if (n_font == c_font) break
                    if (c_font != o_font) r[j] += "</tspan>";
                    c_font = n_font
                    if (c_font == o_font) break;
                    r[j] += '<tspan class="' + font_class(n_font) + '">'
                    break
                }
            }
            if (c_font != o_font) r[j] += "</tspan>";
            r[4] = nl
            return r
        }

        function font_class(font) {
            if (font.class) return 'f' + font.fid + cfmt.fullsvg + ' ' + font.class
            return 'f' + font.fid + cfmt.fullsvg
        }

        function gen_hf(up, font, str) {
            var a, i, j, k, x, y, y0, s, fh = font.size * 1.1,
            pos = ['">', '" text-anchor="middle">', '" text-anchor="end">']
            if (str[0] == '-') {
                if (page.pn == 1) return 0;
                str = str.slice(1)
            }
            a = header_footer(font, str);
            if (up) y0 = page.hbase + fh
            else y0 = cfmt.pageheight - page.topmargin - fh * a[4]
            for (i = 0; i < 3; i++) {
                str = a[i]
                if (!str) continue
                if (i == 0) x = cfmt.leftmargin
                else if (i == 1) x = cfmt.pagewidth / 2
                else x = cfmt.pagewidth - cfmt.rightmargin;
                x += page.gutter;
                y = y0;
                k = 0
                while (1) {
                    j = str.indexOf('\n', k);
                    if (j >= 0) s = str.slice(k, j)
                    else s = str.slice(k);
                    if (s) page.hf += '<text class="' + font_class(font) + '" style="font-size:16px;" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + pos[i] + s + '</text>\n'
                    if (j < 0) break;
                    k = j + 1;
                    y += fh
                }
            }
            return fh * a[4]
        }
        
            
            
        var style = ' style="display:inline-block;line-height: 0;break-before: page;padding: 0px 50px;" ';
//        if(page.pn==0 || page.pn==1){
//        	style = ' style="display:block;" ';
//        }
        abc2svg.page.img_out(abc.page, '<div class="pagediv" ' + style + ' id="page'+(page.pn + 1)+'">');
        page.hbase = page.topmargin;
        page.hmax = cfmt.pageheight - page.topmargin - page.botmargin;
        page.pn++;
        page.pna++;
        page.gutter = -page.gutter;
        page.hf = ''
        if (page.header) {
            h = gen_hf(true, abc.get_font("header"), page.header);
            page.hmax -= h;
            page.hbase += h
        }
        if (page.footer) page.hmax -= gen_hf(false, abc.get_font("footer"), page.footer);
        page.h = page.hb = 0;
        page.out = ''
    },
    img_in: function(p) {
        var h, i, page = this.page

        function blkcpy(page) {
            var b, h, i
            if (!page.blk || !page.blk.length) {
                page.blk = null
                return
            }
            h = page.hb
            for (i = 0; i < page.blk.length; i++) {
                b = page.blk[i];
                b.p = b.p.replace("pagenum",page.pn);
                page.out += b.p.replace(/<svg(.|\n)*?>/, '<g transform="translate(' + page.gutter.toFixed(1) + ', ' + (h + page.hbase).toFixed(1) + ')">').replace('</svg>', '</g>\n');
                h += b.h
            }
            page.blk = null;
            page.h = h
        }

        function get_style(p, page) {
            var i, sty = p.match(/<style.*?>((.|\n)*?)<\/style>/);
            if (!sty) return p;
            sty = sty[1].split('\n');
            if (!page.style) page.style = '<style type="text/css">\n</style>\n'
            for (i = 0; i < sty.length; i++) {
                if (page.style.indexOf(sty[i]) < 0) page.style = page.style.replace('</style>\n', sty[i] + '\n</style>\n')
            }
            return p.replace(/<style(.|\n)*?\/style>\n/, '')
        }
        switch (p.slice(0, 4)) {
        case "<div":
            if (p.indexOf('newpage') > 0 || (page.oneperpage && this.info().X) || page.h == 0) {
                if (page.h) {
                    abc2svg.page.img_out(page, page.head.replace("pagenum",page.pn) + page.style + page.hf + page.out + '</svg>');
                    abc2svg.page.img_out(page, '</div>')
                }
                abc2svg.page.svg_out(this, page);
                if (!this.cfmt().fullsvg) page.style = ''
            }
            page.blk = [];
            page.hb = page.h
            break
        case "<svg":
            h = Number(p.match(/height="(\d+)px"/)[1]);
            if (h + page.h >= page.hmax) {
                if (!page.out) blkcpy(page);
                abc2svg.page.img_out(page, page.head.replace("pagenum",page.pn) + page.style + page.hf + page.out + '</svg>');
                abc2svg.page.img_out(page, '</div>');
                abc2svg.page.svg_out(this, page);
                page.h = page.hb = this.cfmt().topspace;
                if (page.blk) blkcpy(page);
                if (!this.cfmt().fullsvg) page.style = ''
            }
            p = get_style(p, page);
            if (page.blk) {
                page.blk.push({
                    p: p,
                    h: h
                })
            } else {
                page.out += p.replace(/<svg(.|\n)*?>/, '<g transform="translate(' + page.gutter.toFixed(1) + ', ' + (page.h + page.hbase).toFixed(1) + ')">').replace('</svg>', '</g>\n')
            }
            page.h += h
            break
        case "</di":
            blkcpy(page);
            page.out += '\n'
            break
        }
    },
    set_fmt: function(of, cmd, parm) {
        var v, cfmt = this.cfmt(),
        page = this.page
        if (cmd == "pageheight") {
            v = this.get_unit(parm);
            if (isNaN(v)) {
            	if(errs){
            		this.syntax(1, errs.bad_val, '%%' + cmd);
            	}
                return
            }
            cfmt.pageheight = v
            if (!page && user.img_out && abc2svg.abc_end) {
                this.page = page = {
                    abc: this,
                    topmargin: 38,
                    botmargin: 38,
                    gutter: 0,
                    h: 0,
                    pn: 0,
                    pna: 0,
                    out: '',
                    head: abc2svg.page.svg_head(cfmt),
                    user_out: user.img_out
                }
                if (cfmt.header) {
                    page.header = cfmt.header;
                    cfmt.header = null
                }
                if (cfmt.footer) {
                    page.footer = cfmt.footer;
                    cfmt.footer = null
                }
                if (cfmt.botmargin) {
                    v = this.get_unit(cfmt.botmargin);
                    if (!isNaN(v)) page.botmargin = v
                }
                if (cfmt.topmargin) {
                    v = this.get_unit(cfmt.topmargin);
                    if (!isNaN(v)) page.topmargin = v
                }
                if (cfmt.gutter) {
                    v = this.get_unit(cfmt.gutter);
                    if (!isNaN(v)) page.gutter = (page.pn & 1) ? v: -v
                }
                if (cfmt.oneperpage) page.oneperpage = this.get_bool(cfmt.oneperpage);
                user.img_out = abc2svg.page.img_in.bind(this);
                page.img_out_sav = user.img_out;
                abc2svg.abc_end = abc2svg.page.abc_end.bind(this, abc2svg.abc_end)
            }
            return
        }
        if (page) {
            switch (cmd) {
            case "header":
            case "footer":
                page[cmd] = parm
                return
            case "newpage":
                if (!parm) break;
                v = Number(parm);
                if (isNaN(v)) {
                    this.syntax(1, errs.bad_val, '%%' + cmd);
                    return;
                }
                page.pn = v - 1;
                return;
            case "gutter":
            case "botmargin":
            case "topmargin":
                v = this.get_unit(parm);
                if (isNaN(v)) {
                    this.syntax(1, errs.bad_val, '%%' + cmd);
                    return;
                }
                page[cmd] = v
                if (cmd == "gutter" && !(page.pn & 1)) page.gutter = -page.gutter
                return
            case "oneperpage":
                page[cmd] = this.get_bool(parm);
                return;
            }
        }
        of(cmd, parm);
        if (page) {
            switch (cmd) {
            case "pagewidth":
            case "bgcolor":
                page.head = abc2svg.page.svg_head(cfmt);
                break;
            }
        }
    },
    set_hooks: function(abc) {
        abc.set_format = abc2svg.page.set_fmt.bind(abc, abc.set_format)
    }
}
//abc2svg.modules.hooks.push(abc2svg.page.set_hooks);
abc2svg.modules.hooks.push(
			[ "set_format", "abc2svg.page.set_fmt" ]
		);
abc2svg.modules.pageheight.loaded = true
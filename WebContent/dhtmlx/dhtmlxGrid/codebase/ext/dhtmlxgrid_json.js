//v.3.5 build 120822
/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
To use this component please contact sales@dhtmlx.com to obtain license
*/
dhtmlXGridObject.prototype._process_json_row = function (a, b) {
    a._attrs = b;
    for (var f = 0; f < a.childNodes.length; f++) a.childNodes[f]._attrs = {};
    if (b.userdata)
        for (var h in b.userdata) this.setUserData(a.idd, h, b.userdata[h]);
    for (var b = this._c_order ? this._swapColumns(b.data) : b.data, d = 0; d < b.length; d++)
        if (typeof b[d] == "object" && b[d] != null) {
            a.childNodes[d]._attrs = b[d];
            if (b[d].type) a.childNodes[d]._cellType = b[d].type;
            b[d] = b[d].value
        }
    this._fillRow(a, b);
    return a
};
dhtmlXGridObject.prototype._process_js_row = function (a, b) {
    a._attrs = b;
    for (var f = 0; f < a.childNodes.length; f++) a.childNodes[f]._attrs = {};
    if (b.userdata)
        for (var h in b.userdata) this.setUserData(a.idd, h, b.userdata[h]);
    for (var d = [], c = 0; c < this.columnIds.length; c++) {
    	// paddy, begin
    	// To support js array in 2nd level or more.
    	var columnId = this.columnIds[c];
    	var strArrayOfColumnId = columnId.split(".");
    	var digB;
    	if (strArrayOfColumnId.length > 0) {
    		digB = b[strArrayOfColumnId[0]];
    	}
    	
    	for (var arrayIndex = 1; arrayIndex < strArrayOfColumnId.length; arrayIndex++) {
    		if (typeof digB == "object" && digB != null) {
    		    digB = digB[strArrayOfColumnId[arrayIndex]];
    		}
    	}
    	
    	d[c] = digB;
        // d[c] = b[this.columnIds[c]];
        
    	// paddy, end
        
        if (typeof d[c] == "object" && d[c] != null) {
            a.childNodes[c]._attrs = d[c]; 
            if (d[c].type) a.childNodes[c]._cellType = d[c].type;
            
            // paddy, begin
            if (Object.prototype.toString.call(d[c]) === "[object Array]") {
            	d[c] = d[c].toString();
            } else {
            	d[c] = d[c].value;
            }
            // paddy, end
        }!d[c] && d[c] !== 0 && (d[c] = "")
    }
    this._fillRow(a, d);
    return a
};
dhtmlXGridObject.prototype.updateFromJSON = function (a, b, f, h) {
    typeof b == "undefined" && (b = !0);
    this._refresh_mode = [!0, b, f];
    this.load(a, h, "json")
};
dhtmlXGridObject.prototype._refreshFromJSON = function (a) {
    this._f_rowsBuffer && this.filterBy(0, "");
    reset = !1;
    if (window.eXcell_tree) eXcell_tree.prototype.setValueX = eXcell_tree.prototype.setValue, eXcell_tree.prototype.setValue = function (a) {
        var b = this.grid._h2.get[this.cell.parentNode.idd];
        b && this.cell.parentNode.valTag ? this.setLabel(a) : this.setValueX(a)
    };
    var b = this.cellType._dhx_find("tree"),
        f = a.parent || 0,
        h = {};
    this._refresh_mode[2] && (b != -1 ? this._h2.forEachChild(f, function (a) {
        h[a.id] = !0
    }, this) : this.forEachRow(function (a) {
        h[a] = !0
    }));
    for (var d = a.rows, c = 0; c < d.length; c++) {
        var g = d[c],
            e = g.id;
        h[e] = !1;
        if (this.rowsAr[e] && this.rowsAr[e].tagName != "TR") this._h2 ? this._h2.get[e].buff.data = g : this.rowsBuffer[this.getRowIndex(e)].data = g, this.rowsAr[e] = g;
        else if (this.rowsAr[e]) this._process_json_row(this.rowsAr[e], g, -1), this._postRowProcessing(this.rowsAr[e], !0);
        else if (this._refresh_mode[1]) {
            var l = {
                idd: e,
                data: g,
                _parser: this._process_json_row,
                _locator: this._get_json_data
            }, j = this.rowsBuffer.length;
            this._refresh_mode[1] == "top" ? (this.rowsBuffer.unshift(l),
                j = 0) : this.rowsBuffer.push(l);
            if (this._h2) reset = !0, this._h2.add(e, f).buff = this.rowsBuffer[this.rowsBuffer.length - 1];
            this.rowsAr[e] = g;
            g = this.render_row(j);
            this._insertRowAt(g, j ? -1 : 0)
        }
    }
    if (this._refresh_mode[2])
        for (e in h) h[e] && this.rowsAr[e] && this.deleteRow(e);
    this._refresh_mode = null;
    if (window.eXcell_tree) eXcell_tree.prototype.setValue = eXcell_tree.prototype.setValueX;
    reset && this._renderSort();
    if (this._f_rowsBuffer) this._f_rowsBuffer = null, this.filterByAll()
};
dhtmlXGridObject.prototype._process_js = function (a) {
    return this._process_json(a, "js")
};
dhtmlXGridObject.prototype._process_json = function (a, b) {
    this._parsing = !0;
    try {
        if (a && a.xmlDoc) eval("dhtmlx.temp=" + a.xmlDoc.responseText + ";"), a = dhtmlx.temp;
        else if (typeof a == "string") eval("dhtmlx.temp=" + a + ";"), a = dhtmlx.temp
    } catch (f) {
        dhtmlxError.throwError("LoadXML", "Incorrect JSON", [a.xmlDoc || a, this]), a = {
            rows: []
        }
    }
    if (this._refresh_mode) return this._refreshFromJSON(a);
    var h = parseInt(a.pos || 0),
        d = parseInt(a.total_count || 0),
        c = !1;
    d && (this.rowsBuffer[d - 1] || (this.rowsBuffer.length && (c = !0), this.rowsBuffer[d - 1] =
        null), d < this.rowsBuffer.length && (this.rowsBuffer.splice(d, this.rowsBuffer.length - d), c = !0));
    for (var g in a) g != "rows" && this.setUserData("", g, a[g]);
    if (b == "js" && a.collections)
        for (var e in a.collections) {
            var l = this.getColIndexById(e),
                j = a.collections[e];
            if (l !== window.undefined)
                if (this.cellType[l] == "clist") {
                    colplaindata = [];
                    for (var k = 0; k < j.length; k++) colplaindata.push(j[k].label);
                    this.registerCList(l, colplaindata)
                } else
                    for (var o = this.getCombo(l), k = 0; k < j.length; k++) o.put(j[k].value, j[k].label)
        }
    if (this.isTreeGrid()) return this._process_tree_json(a,
        null, null, b);
    if (b == "js") {
        if (a.data) a = a.data;
        for (var i = 0; i < a.length; i++)
            if (!this.rowsBuffer[i + h]) {
                var n = a[i],
                    m = n.id || i + 1;
                this.rowsBuffer[i + h] = {
                    idd: m,
                    data: n,
                    _parser: this._process_js_row,
                    _locator: this._get_js_data
                };
                this.rowsAr[m] = a[i]
            }
    } else
        for (i = 0; i < a.rows.length; i++)
            if (!this.rowsBuffer[i + h]) m = a.rows[i].id, this.rowsBuffer[i + h] = {
                idd: m,
                data: a.rows[i],
                _parser: this._process_json_row,
                _locator: this._get_json_data
            }, this.rowsAr[m] = a.rows[i]; if (c && this._srnd) {
        var p = this.objBox.scrollTop;
        this._reset_view();
        this.objBox.scrollTop =
            p
    } else this.render_dataset();
    this._parsing = !1
};
dhtmlXGridObject.prototype._get_json_data = function (a, b) {
    return typeof a.data[b] == "object" ? a.data[b].value : a.data[b]
};
dhtmlXGridObject.prototype._process_tree_json = function (a, b, f, h) {
    this._parsing = !0;
    var d = !1;
    if (!b) {
        this.render_row = this.render_row_tree;
        d = !0;
        b = a;
        f = b.parent || 0;
        f == "0" && (f = 0);
        if (!this._h2) this._h2 = new dhtmlxHierarchy;
        if (this._fake) this._fake._h2 = this._h2
    }
    if (h == "js") {
        if (b.data && !f) a = b.data;
        if (b.rows) b = b.rows;
        for (var c = 0; c < b.length; c++) {
            var g = b[c].id,
                e = this._h2.add(g, f);
            e.buff = {
                idd: g,
                data: b[c],
                _parser: this._process_js_row,
                _locator: this._get_js_data
            };
            if (b[c].open) e.state = "minus";
            this.rowsAr[g] = e.buff;
            this._process_tree_json(b[c],
                b[c], g, h)
        }
    } else if (b.rows)
        for (c = 0; c < b.rows.length; c++) {
            g = b.rows[c].id;
            e = this._h2.add(g, f);
            e.buff = {
                idd: g,
                data: b.rows[c],
                _parser: this._process_json_row,
                _locator: this._get_json_data
            };
            if (b.rows[c].open) e.state = "minus";
            this.rowsAr[g] = e.buff;
            this._process_tree_json(b.rows[c], b.rows[c], g, h)
        }
    if (d) f != 0 && this._h2.change(f, "state", "minus"), this._updateTGRState(this._h2.get[f]), this._h2_to_buff(), f != 0 && (this._srnd || this.pagingOn) ? this._renderSort() : this.render_dataset(), this._slowParse === !1 && this.forEachRow(function (a) {
        this.render_row_tree(0,
            a)
    }), this._parsing = !1
};

// v.3.5 build 120822

/*
 * Copyright DHTMLX LTD. http://www.dhtmlx.com To use this component please
 * contact sales@dhtmlx.com to obtain license
 */
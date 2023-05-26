; /*FB_PKG_DELIM*/

"use strict";
(function() {
    var a = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || typeof global !== "undefined" && global;
    if (typeof a.AbortController !== "undefined") return;
    var b = function() {
            function a() {
                this.__listeners = new Map()
            }
            a.prototype = Object.create(Object.prototype);
            a.prototype.addEventListener = function(a, b, c) {
                if (arguments.length < 2) throw new TypeError("TypeError: Failed to execute 'addEventListener' on 'CustomEventTarget': 2 arguments required, but only " + arguments.length + " present.");
                var d = this.__listeners,
                    e = a.toString();
                d.has(e) || d.set(e, new Map());
                var f = d.get(e);
                f.has(b) || f.set(b, c)
            };
            a.prototype.removeEventListener = function(a, b, c) {
                if (arguments.length < 2) throw new TypeError("TypeError: Failed to execute 'addEventListener' on 'CustomEventTarget': 2 arguments required, but only " + arguments.length + " present.");
                var d = this.__listeners,
                    e = a.toString();
                if (d.has(e)) {
                    var f = d.get(e);
                    f.has(b) && f["delete"](b)
                }
            };
            a.prototype.dispatchEvent = function(a) {
                if (!(a instanceof Event)) throw new TypeError("Failed to execute 'dispatchEvent' on 'CustomEventTarget': parameter 1 is not of type 'Event'.");
                var b = a.type,
                    c = this.__listeners;
                c = c.get(b);
                if (c)
                    for (var b = c.entries(), d = Array.isArray(b), e = 0, b = d ? b : b[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                        var f;
                        if (d) {
                            if (e >= b.length) break;
                            f = b[e++]
                        } else {
                            e = b.next();
                            if (e.done) break;
                            f = e.value
                        }
                        f = f;
                        var g = f[0];
                        f = f[1];
                        try {
                            typeof g === "function" ? g.call(this, a) : g && typeof g.handleEvent === "function" && g.handleEvent(a)
                        } catch (a) {
                            setTimeout(function() {
                                throw a
                            })
                        }
                        f && f.once && c["delete"](g)
                    }
                return !0
            };
            return a
        }(),
        c = {};
    a.AbortSignal = function() {
        function a(a) {
            if (a !== c) throw new TypeError("Illegal constructor.");
            b.call(this);
            this._aborted = !1
        }
        a.prototype = Object.create(b.prototype);
        a.prototype.constructor = a;
        Object.defineProperty(a.prototype, "onabort", {
            get: function() {
                return this._onabort
            },
            set: function(a) {
                var b = this._onabort;
                b && this.removeEventListener("abort", b);
                this._onabort = a;
                this.addEventListener("abort", a)
            }
        });
        Object.defineProperty(a.prototype, "aborted", {
            get: function() {
                return this._aborted
            }
        });
        return a
    }();
    a.AbortController = function() {
        function a() {
            this._signal = new AbortSignal(c)
        }
        a.prototype = Object.create(Object.prototype);
        Object.defineProperty(a.prototype, "signal", {
            get: function() {
                return this._signal
            }
        });
        a.prototype.abort = function() {
            var a = this.signal;
            a.aborted || (a._aborted = !0, a.dispatchEvent(new Event("abort")))
        };
        return a
    }()
})();



"use strict";
(function() {
    if (!Array.prototype.flat) {
        var a = function b(a) {
            return a < 1 ? Array.prototype.slice.call(this) : Array.prototype.reduce.call(this, function(c, d) {
                Array.isArray(d) ? c.push.apply(c, b.call(d, a - 1)) : c.push(d);
                return c
            }, [])
        };
        Array.prototype.flat = function() {
            return a.call(this, isNaN(arguments[0]) ? 1 : Number(arguments[0]))
        }
    }
    if (!Array.prototype.flatMap) {
        var b = function(a, b) {
            var c = [];
            if (typeof b !== "function") throw new TypeError("Callback function must be callable.");
            for (var d = 0; d < a.length; d++) {
                var e = b.call(a, a[d], d, a);
                Array.isArray(e) ? c.push.apply(c, e) : c.push(e)
            }
            return c
        };
        Array.prototype.flatMap = function(a) {
            var c = arguments[1] || this;
            return b(c, a)
        }
    }
})();


(function() {
    "use strict";
    var a = Array.prototype.indexOf;
    Array.prototype.includes || (Array.prototype.includes = function(d) {
        "use strict";
        if (d !== void 0 && Array.isArray(this) && !Number.isNaN(d)) return a.apply(this, arguments) !== -1;
        var e = Object(this),
            f = e.length ? b(e.length) : 0;
        if (f === 0) return !1;
        var g = arguments.length > 1 ? c(arguments[1]) : 0,
            h = g < 0 ? Math.max(f + g, 0) : g,
            i = Number.isNaN(d);
        while (h < f) {
            var j = e[h];
            if (j === d || i && Number.isNaN(j)) return !0;
            h++
        }
        return !1
    });

    function b(a) {
        return Math.min(Math.max(c(a), 0), Number.MAX_SAFE_INTEGER)
    }

    function c(a) {
        a = Number(a);
        return Number.isFinite(a) && a !== 0 ? d(a) * Math.floor(Math.abs(a)) : a
    }

    function d(a) {
        return a >= 0 ? 1 : -1
    }
    if (!Array.prototype.values) {
        var e = typeof Symbol === "function" ? Symbol.iterator : "@@iterator",
            f = function() {
                function a(a) {
                    this.$1 = void 0;
                    this.$2 = 0;
                    if (a == null) throw new TypeError("Cannot convert undefined or null to object");
                    this.$1 = Object(a)
                }
                var b = a.prototype;
                b.next = function() {
                    if (this.$1 == null || this.$2 >= this.$1.length) {
                        this.$1 = void 0;
                        return {
                            value: void 0,
                            done: !0
                        }
                    }
                    var a = this.$1[this.$2];
                    this.$2++;
                    return {
                        value: a,
                        done: !1
                    }
                };
                b[e] = function() {
                    return this
                };
                return a
            }();
        Array.prototype.values = function() {
            return new f(this)
        }
    }
    Array.prototype[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] || (Array.prototype[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = Array.prototype.values)
})();
(function(a) {
    var b = {},
        c = function(a, b) {
            if (!a && !b) return null;
            var c = {};
            typeof a !== "undefined" && (c.type = a);
            typeof b !== "undefined" && (c.signature = b);
            return c
        },
        d = function(a, b) {
            return c(a && /^[A-Z]/.test(a) ? a : void 0, b && (b.params && b.params.length || b.returns) ? "function(" + (b.params ? b.params.map(function(a) {
                return /\?/.test(a) ? "?" + a.replace("?", "") : a
            }).join(",") : "") + ")" + (b.returns ? ":" + b.returns : "") : void 0)
        },
        e = function(a, b, c) {
            return a
        },
        f = function(a, b, c) {
            "sourcemeta" in __transform_includes && (a.__SMmeta = b);
            if ("typechecks" in __transform_includes) {
                b = d(b ? b.name : void 0, c);
                b && __w(a, b)
            }
            return a
        },
        g = function(a, b, c) {
            return c.apply(a, b)
        },
        h = function(a, b, c, d) {
            d && d.params && __t.apply(a, d.params);
            c = c.apply(a, b);
            d && d.returns && __t([c, d.returns]);
            return c
        };
    h = function(a, c, d, e, f) {
        if (f) {
            f.callId || (f.callId = f.module + ":" + (f.line || 0) + ":" + (f.column || 0));
            e = f.callId;
            b[e] = (b[e] || 0) + 1
        }
        return d.apply(a, c)
    };
    typeof __transform_includes === "undefined" ? (a.__annotator = e, a.__bodyWrapper = g) : (a.__annotator = f, "codeusage" in __transform_includes ? (a.__annotator = e, a.__bodyWrapper = h, a.__bodyWrapper.getCodeUsage = function() {
        return b
    }, a.__bodyWrapper.clearCodeUsage = function() {
        b = {}
    }) : "typechecks" in __transform_includes ? a.__bodyWrapper = g : a.__bodyWrapper = g)
})(typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof this !== "undefined" ? this : typeof self !== "undefined" ? self : {});
(function(a) {
    a.__t = function(a) {
        return a[0]
    }, a.__w = function(a) {
        return a
    }
})(typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof this !== "undefined" ? this : typeof self !== "undefined" ? self : {});
self.__DEV__ = self.__DEV__ || 0, self.emptyFunction = function() {};



(function(a, b) {
    var c = "keys",
        d = "values",
        e = "entries",
        f = function() {
            var a = h(Array),
                b;
            a || (b = function() {
                "use strict";

                function a(a, b) {
                    this.$1 = a, this.$2 = b, this.$3 = 0
                }
                var b = a.prototype;
                b.next = function() {
                    if (this.$1 == null) return {
                        value: void 0,
                        done: !0
                    };
                    var a = this.$1,
                        b = this.$1.length,
                        f = this.$3,
                        g = this.$2;
                    if (f >= b) {
                        this.$1 = void 0;
                        return {
                            value: void 0,
                            done: !0
                        }
                    }
                    this.$3 = f + 1;
                    if (g === c) return {
                        value: f,
                        done: !1
                    };
                    else if (g === d) return {
                        value: a[f],
                        done: !1
                    };
                    else if (g === e) return {
                        value: [f, a[f]],
                        done: !1
                    }
                };
                b[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = function() {
                    return this
                };
                return a
            }());
            return {
                keys: a ? function(a) {
                    return a.keys()
                } : function(a) {
                    return new b(a, c)
                },
                values: a ? function(a) {
                    return a.values()
                } : function(a) {
                    return new b(a, d)
                },
                entries: a ? function(a) {
                    return a.entries()
                } : function(a) {
                    return new b(a, e)
                }
            }
        }(),
        g = function() {
            var a = h(String),
                b;
            a || (b = function() {
                "use strict";

                function a(a) {
                    this.$1 = a, this.$2 = 0
                }
                var b = a.prototype;
                b.next = function() {
                    if (this.$1 == null) return {
                        value: void 0,
                        done: !0
                    };
                    var a = this.$2,
                        b = this.$1,
                        c = b.length;
                    if (a >= c) {
                        this.$1 = void 0;
                        return {
                            value: void 0,
                            done: !0
                        }
                    }
                    var d = b.charCodeAt(a);
                    if (d < 55296 || d > 56319 || a + 1 === c) d = b[a];
                    else {
                        c = b.charCodeAt(a + 1);
                        c < 56320 || c > 57343 ? d = b[a] : d = b[a] + b[a + 1]
                    }
                    this.$2 = a + d.length;
                    return {
                        value: d,
                        done: !1
                    }
                };
                b[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = function() {
                    return this
                };
                return a
            }());
            return {
                keys: function() {
                    throw TypeError("Strings default iterator doesn't implement keys.")
                },
                values: a ? function(a) {
                    return a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]()
                } : function(a) {
                    return new b(a)
                },
                entries: function() {
                    throw TypeError("Strings default iterator doesn't implement entries.")
                }
            }
        }();

    function h(a) {
        return typeof a.prototype[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] === "function" && typeof a.prototype.values === "function" && typeof a.prototype.keys === "function" && typeof a.prototype.entries === "function"
    }
    var i = function() {
            "use strict";

            function a(a, b) {
                this.$1 = a, this.$2 = b, this.$3 = Object.keys(a), this.$4 = 0
            }
            var b = a.prototype;
            b.next = function() {
                var a = this.$3.length,
                    b = this.$4,
                    f = this.$2,
                    g = this.$3[b];
                if (b >= a) {
                    this.$1 = void 0;
                    return {
                        value: void 0,
                        done: !0
                    }
                }
                this.$4 = b + 1;
                if (f === c) return {
                    value: g,
                    done: !1
                };
                else if (f === d) return {
                    value: this.$1[g],
                    done: !1
                };
                else if (f === e) return {
                    value: [g, this.$1[g]],
                    done: !1
                }
            };
            b[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = function() {
                return this
            };
            return a
        }(),
        j = {
            keys: function(a) {
                return new i(a, c)
            },
            values: function(a) {
                return new i(a, d)
            },
            entries: function(a) {
                return new i(a, e)
            }
        };

    function k(a, b) {
        if (typeof a === "string") return g[b || d](a);
        else if (Array.isArray(a)) return f[b || d](a);
        else if (a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]) return a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();
        else return j[b || e](a)
    }
    Object.assign(k, {
        KIND_KEYS: c,
        KIND_VALUES: d,
        KIND_ENTRIES: e,
        keys: function(a) {
            return k(a, c)
        },
        values: function(a) {
            return k(a, d)
        },
        entries: function(a) {
            return k(a, e)
        },
        generic: j.entries
    });
    a.FB_enumerate = k
})(typeof global === "object" ? global : typeof this === "object" ? this : typeof window === "object" ? window : typeof self === "object" ? self : {});





"use strict";
(function() {
    if (typeof Element === "undefined" || Element.prototype.scroll) return;

    function a(a, b) {
        b === void 0 && (b = !1);
        if (a.length === 0) return;
        var c = a[0],
            d = a[1];
        c = Number(c) || 0;
        d = Number(d) || 0;
        if (a.length === 1) {
            a = a[0];
            if (a == null) return;
            c = a.left;
            d = a.top;
            c !== void 0 && (c = Number(c) || 0);
            d !== void 0 && (d = Number(d) || 0)
        }
        c !== void 0 && (this.scrollLeft = (b ? this.scrollLeft : 0) + c);
        d !== void 0 && (this.scrollTop = (b ? this.scrollTop : 0) + d)
    }
    Element.prototype.scroll = Element.prototype.scrollTo = function() {
        a.call(this, arguments)
    };
    Element.prototype.scrollBy = function() {
        a.call(this, arguments, !0)
    }
})();


(function() {
    function a() {
        if (typeof JSON !== "object" || typeof JSON.stringify !== "function") return !1;
        if (typeof navigator === "undefined" || !navigator.userAgent) return !0;
        var a = navigator.userAgent;
        if (a.indexOf("Firefox/") > -1) return !(parseInt(a.match(/Firefox\/([0-9]+)/)[1], 10) >= 62);
        else if (a.indexOf("Edg/") > -1) return !(parseInt(a.match(/Edg\/([0-9]+)/)[1], 10) >= 79);
        else if (a.indexOf("Chrome/") > -1) return !(parseInt(a.match(/Chrome\/([0-9]+)/)[1], 10) >= 66);
        else if (a.indexOf("CriOS/") > -1) return !(parseInt(a.match(/CriOS\/([0-9]+)/)[1], 10) >= 66);
        else if (a.indexOf("Safari/") > -1 && a.indexOf("Version/") > -1) return !(parseInt(a.match(/Version\/([0-9]+)/)[1], 10) >= 12);
        return !0
    }

    function b() {
        return JSON.stringify(["\u2028\u2029"]) === '["\\u2028\\u2029"]'
    }
    a() && !b() && (JSON.stringify = function(a) {
        var b = /\u2028/g,
            c = /\u2029/g;
        return function(d, e, f) {
            d = a.call(this, d, e, f);
            d && (-1 < d.indexOf("\u2028") && (d = d.replace(b, "\\u2028")), -1 < d.indexOf("\u2029") && (d = d.replace(c, "\\u2029")));
            return d
        }
    }(JSON.stringify))
})();


(function() {
    var a = Object.prototype.hasOwnProperty;
    Object.entries = function(b) {
        if (b == null) throw new TypeError("Object.entries called on non-object");
        var c = [];
        for (var d in b) a.call(b, d) && c.push([d, b[d]]);
        return c
    };
    typeof Object.fromEntries !== "function" && (Object.fromEntries = function(a) {
        var b = {};
        for (var a = a, c = Array.isArray(a), d = 0, a = c ? a : a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
            var e;
            if (c) {
                if (d >= a.length) break;
                e = a[d++]
            } else {
                d = a.next();
                if (d.done) break;
                e = d.value
            }
            e = e;
            var f = e[0];
            e = e[1];
            b[f] = e
        }
        return b
    });
    Object.values = function(b) {
        if (b == null) throw new TypeError("Object.values called on non-object");
        var c = [];
        for (var d in b) a.call(b, d) && c.push(b[d]);
        return c
    }
})();


(function(a) {
    a.__m = function(a, b) {
        a.__SMmeta = b;
        return a
    }
})(typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof this !== "undefined" ? this : typeof self !== "undefined" ? self : {});


String.prototype.contains || (String.prototype.contains = String.prototype.includes);
String.prototype.padStart || (String.prototype.padStart = function(a, b) {
    a = a >> 0;
    b = String(b || " ");
    if (this.length > a) return String(this);
    else {
        a = a - this.length;
        a > b.length && (b += b.repeat(a / b.length));
        return b.slice(0, a) + String(this)
    }
}), String.prototype.padEnd || (String.prototype.padEnd = function(a, b) {
    a = a >> 0;
    b = String(b || " ");
    if (this.length > a) return String(this);
    else {
        a = a - this.length;
        a > b.length && (b += b.repeat(a / b.length));
        return String(this) + b.slice(0, a)
    }
});
if (!String.prototype.matchAll) {
    var MAX_CALLS_TO_EXEC = 250;
    String.prototype.matchAll = function(a) {
        if (!a.global) throw new TypeError("String.prototype.matchAll called with a non-global RegExp argument");
        var b = String(this),
            c = [],
            d, e = 0;
        while ((d = a.exec(b)) && e++ < MAX_CALLS_TO_EXEC) c.push(d);
        return c
    }
}
String.prototype.trimLeft || (String.prototype.trimLeft = function() {
    return this.replace(/^\s+/, "")
}), String.prototype.trimRight || (String.prototype.trimRight = function() {
    return this.replace(/\s+$/, "")
});





"use strict";
(function(a) {
    function a() {
        if (typeof URL !== "function") return !1;
        if (typeof URL.createObjectURL !== "function" || typeof URL.revokeObjectURL !== "function") return !1;
        return typeof File !== "function" || typeof Blob !== "function" ? !1 : !0
    }
    if (!a()) return;
    var b = {},
        c = URL.createObjectURL,
        d = URL.revokeObjectURL;
    URL.createObjectURL = function(a) {
        var d = null,
            e = 0;
        a instanceof File ? (d = "File", e = a.size) : a instanceof Blob ? (d = "Blob", e = a.size) : typeof MediaSource === "function" && a instanceof MediaSource && (d = "MediaSource", e = 0);
        a = c.call(URL, a);
        d !== null && (b[a] = {
            type: d,
            size: e
        });
        return a
    };
    URL.revokeObjectURL = function(a) {
        d.call(URL, a), delete b[a]
    };
    URL._fbRegisteredObjectURL = function() {
        return Object.values(b)
    }
})(this);
(function(a) {
    var b = a.babelHelpers = {},
        c = Object.prototype.hasOwnProperty;
    typeof Symbol !== "undefined" && !(typeof Symbol === "function" ? Symbol.asyncIterator : "@@asyncIterator") && (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"));

    function d(a) {
        this.wrapped = a
    }

    function e(a) {
        var b, c;

        function e(a, d) {
            return new Promise(function(e, g) {
                e = {
                    key: a,
                    arg: d,
                    resolve: e,
                    reject: g,
                    next: null
                };
                c ? c = c.next = e : (b = c = e, f(a, d))
            })
        }

        function f(b, c) {
            try {
                var e = a[b](c);
                c = e.value;
                var h = c instanceof d;
                Promise.resolve(h ? c.wrapped : c).then(function(a) {
                    if (h) {
                        f(b === "return" ? "return" : "next", a);
                        return
                    }
                    g(e.done ? "return" : "normal", a)
                }, function(a) {
                    f("throw", a)
                })
            } catch (a) {
                g("throw", a)
            }
        }

        function g(a, d) {
            switch (a) {
                case "return":
                    b.resolve({
                        value: d,
                        done: !0
                    });
                    break;
                case "throw":
                    b.reject(d);
                    break;
                default:
                    b.resolve({
                        value: d,
                        done: !1
                    });
                    break
            }
            b = b.next;
            b ? f(b.key, b.arg) : c = null
        }
        this._invoke = e;
        typeof a["return"] !== "function" && (this["return"] = void 0)
    }
    typeof Symbol === "function" && (typeof Symbol === "function" ? Symbol.asyncIterator : "@@asyncIterator") && (e.prototype[typeof Symbol === "function" ? Symbol.asyncIterator : "@@asyncIterator"] = function() {
        return this
    });
    e.prototype.next = function(a) {
        return this._invoke("next", a)
    };
    e.prototype["throw"] = function(a) {
        return this._invoke("throw", a)
    };
    e.prototype["return"] = function(a) {
        return this._invoke("return", a)
    };
    b.createClass = function() {
        function a(a, b) {
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                d.enumerable = d.enumerable || !1;
                d.configurable = !0;
                "value" in d && (d.writable = !0);
                Object.defineProperty(a, d.key, d)
            }
        }
        return function(b, c, d) {
            c && a(b.prototype, c);
            d && a(b, d);
            return b
        }
    }();
    b.inheritsLoose = function(a, b) {
        Object.assign(a, b);
        a.prototype = Object.create(b && b.prototype);
        a.prototype.constructor = a;
        a.__superConstructor__ = b;
        return b
    };
    b.wrapNativeSuper = function(a) {
        var c = typeof Map === "function" ? new Map() : void 0;
        b.wrapNativeSuper = function(a) {
            if (a === null) return null;
            if (typeof a !== "function") throw new TypeError("Super expression must either be null or a function");
            if (c !== void 0) {
                if (c.has(a)) return c.get(a);
                c.set(a, d)
            }
            b.inheritsLoose(d, a);

            function d() {
                a.apply(this, arguments)
            }
            return d
        };
        return b.wrapNativeSuper(a)
    };
    b.assertThisInitialized = function(a) {
        if (a === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return a
    };
    b._extends = Object.assign;
    b["extends"] = b._extends;
    b.construct = function(a, b) {
        return new(Function.prototype.bind.apply(a, [null].concat(b)))()
    };
    b.objectWithoutPropertiesLoose = function(a, b) {
        var d = {};
        for (var e in a) {
            if (!c.call(a, e) || b.indexOf(e) >= 0) continue;
            d[e] = a[e]
        }
        return d
    };
    b.taggedTemplateLiteralLoose = function(a, b) {
        b || (b = a.slice(0));
        a.raw = b;
        return a
    };
    b.bind = Function.prototype.bind;
    b.wrapAsyncGenerator = function(a) {
        return function() {
            return new e(a.apply(this, arguments))
        }
    };
    b.awaitAsyncGenerator = function(a) {
        return new d(a)
    };
    b.asyncIterator = function(a) {
        var b;
        if (typeof Symbol !== "undefined") {
            if (typeof Symbol === "function" ? Symbol.asyncIterator : "@@asyncIterator") {
                b = a[Symbol.asyncIterator];
                if (b != null) return b.call(a)
            }
            if (typeof Symbol === "function" ? Symbol.iterator : "@@iterator") {
                b = a[Symbol.iterator];
                if (b != null) return b.call(a)
            }
        }
        throw new TypeError("Object is not async iterable")
    };
    b.asyncGeneratorDelegate = function(a, b) {
        var c = {},
            d = !1;

        function e(c, e) {
            d = !0;
            e = new Promise(function(b) {
                b(a[c](e))
            });
            return {
                done: !1,
                value: b(e)
            }
        }
        typeof Symbol === "function" && (typeof Symbol === "function" ? Symbol.iterator : "@@iterator") && (c[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = function() {
            return this
        });
        c.next = function(a) {
            if (d) {
                d = !1;
                return a
            }
            return e("next", a)
        };
        typeof a["throw"] === "function" && (c["throw"] = function(a) {
            if (d) {
                d = !1;
                throw a
            }
            return e("throw", a)
        });
        typeof a["return"] === "function" && (c["return"] = function(a) {
            if (d) {
                d = !1;
                return a
            }
            return e("return", a)
        });
        return c
    }
})(typeof global === "undefined" ? self : global);

(function(a) {
    if (a.require != null) return;
    var b = null,
        c = null,
        d = [],
        e = {},
        f = {},
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 1,
        m = 2,
        n = 4,
        o = 8,
        p = 16,
        aa = 32,
        ba = 64,
        ca = {},
        q = {},
        r = Object.prototype.hasOwnProperty,
        s = Object.prototype.toString;

    function t(a) {
        a = Array.prototype.slice.call(a);
        var b = {},
            c, d, f, g;
        while (a.length) {
            d = a.shift();
            if (b[d]) continue;
            b[d] = !0;
            f = e[d];
            if (!f || T(f)) continue;
            if (f.dependencies)
                for (c = 0; c < f.dependencies.length; c++) g = f.dependencies[c], T(g) || a.push(g.id)
        }
        for (d in b) r.call(b, d) && a.push(d);
        b = [];
        for (c = 0; c < a.length; c++) {
            d = a[c];
            var h = d;
            f = e[d];
            d = f ? f.dependencies : null;
            if (!f || !d) h += " is not defined";
            else if (T(f)) h += " is ready";
            else {
                f = [];
                for (var i = 0; i < d.length; i++) g = d[i], T(g) || f.push(g.id);
                h += " is waiting for " + f.join(", ")
            }
            b.push(h)
        }
        return b.join("\n")
    }

    function u(b) {
        var a = new Error(b);
        a.name = "ModuleError";
        a.messageFormat = b;
        for (var c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), e = 1; e < c; e++) d[e - 1] = arguments[e];
        a.messageParams = d.map(function(a) {
            return String(a)
        });
        a.taalOpcodes = [2, 2];
        return a
    }
    $ = a.Env || {};
    var v = !!$.gk_nonjs_deps_in_require,
        w = !!$.gk_require_when_ready_in_order,
        x = !!$.profile_require_factories,
        y = a.performance || {},
        z;
    if (y.now && y.timing && y.timing.navigationStart) {
        var A = y.timing.navigationStart;
        z = function() {
            return y.now() + A
        }
    } else z = function() {
        return Date.now()
    };
    var B = 0;

    function C(a) {
        B++;
        var b = e[a];
        (!b || b.exports == null && !b.factoryFinished) && (H(a), b = e[a]);
        b && b.refcount-- === 1 && (e[a] = null);
        return b
    }

    function D(a) {
        return a.defaultExport !== q ? a.defaultExport : a.exports
    }

    function E(a) {
        a = C(a);
        if (a) return D(a)
    }

    function F(a) {
        a = C(a);
        if (a) return a.defaultExport !== q ? a.defaultExport : null
    }

    function G(a) {
        a = C(a);
        if (a) return a.exports
    }

    function da(a) {
        a.factoryLength === -1 && (a.factoryLength = a.factory.length);
        return a.factoryLength
    }

    function H(d) {
        var g = a.ErrorGuard;
        if (g && !g.inGuard()) return g.applyWithGuard(H, null, [d]);
        g = e[d];
        if (!g) {
            var h = 'Requiring unknown module "%s"';
            throw u(h, d)
        }
        a.__onBeforeModuleFactory == null ? void 0 : a.__onBeforeModuleFactory(g);
        var i, j;
        if (g.hasError)
            if (g.error == null) throw u('Requiring module "%s" which threw an exception', d);
            else {
                h = I(g.error);
                J(h, {
                    messageFormat: 'Requiring module "%s" which threw an exception',
                    messageParams: [d]
                });
                throw h
            }
        if (!T(g)) throw u('Requiring module "%s" with unresolved dependencies: %s', d, t([d]));
        L(g);
        h = g.exports = {};
        var k = g.factory,
            l = g.dependencies;
        if (s.call(k) === "[object Function]" && l != null) {
            var n = l.length,
                p, q;
            try {
                try {
                    wa(g)
                } catch (a) {
                    K(a, d)
                }
                var v = [],
                    w = n;
                if (g.special & o) {
                    var y = g.special & aa ? c : b;
                    v = y.slice(0);
                    v[y.length - 2] = g;
                    v[y.length - 1] = h;
                    w += v.length
                }
                if (g.special & m) {
                    y = da(g);
                    w = Math.min(n + v.length, y)
                }
                for (h = 0; h < n; h++) {
                    y = l[h];
                    v.length < w && v.push(E.call(null, y.id))
                }
                var A;
                x && (A = z());
                f[g.id].factoryRun = !0;
                try {
                    y = g.context != null ? g.context : a;
                    p = k.apply(y, v)
                } catch (a) {
                    K(a, d)
                } finally {
                    if (x) {
                        w = z();
                        l = f[g.id];
                        l.factoryTime = w - (A || 0);
                        l.factoryEnd = w;
                        l.factoryStart = A;
                        if (k.__SMmeta)
                            for (n in k.__SMmeta) Object.prototype.hasOwnProperty.call(k.__SMmeta, n) && (l[n] = k.__SMmeta[n])
                    }
                }
            } catch (a) {
                g.hasError = !0;
                g.error = a;
                g.exports = null;
                throw a
            } finally {}
            p && (g.exports = p);
            var B;
            g.special & ba ? g.exports != null && r.call(g.exports, "default") && (g.defaultExport = B = g.exports["default"]) : g.defaultExport = B = g.exports;
            if (typeof B === "function") {
                h = B.__superConstructor__;
                if (!B.displayName || h && h.displayName === B.displayName) try {
                    B.displayName = (B.name || "(anonymous)") + " [from " + d + "]"
                } catch (a) {}
            }
            g.factoryFinished = !0
        } else g.exports = k;
        y = "__isRequired__" + d;
        v = e[y];
        v && !T(v) && R(y, ca);
        a.__onAfterModuleFactory == null ? void 0 : a.__onAfterModuleFactory(g)
    }

    function I(b) {
        if (a.getErrorSafe != null) return a.getErrorSafe(b);
        return b != null && typeof b === "object" && typeof b.message === "string" ? b : u("Non-error thrown: %s", String(b))
    }

    function J(b, c) {
        var d = a.ErrorSerializer;
        d && d.aggregateError(b, c)
    }

    function K(a, b) {
        a = I(a);
        J(a, {
            messageFormat: 'Module "%s"',
            messageParams: [b],
            forcedKey: b.startsWith("__") ? null : b
        });
        throw a
    }

    function ea() {
        return B
    }

    function fa() {
        var a = {};
        for (var b in f) Object.prototype.hasOwnProperty.call(f, b) && (a[b] = f[b]);
        return a
    }

    function L(a) {
        if (a.nonJSDeps) return;
        a.nonJSDeps = !0;
        a.dependencies && a.dependencies.forEach(L)
    }
    var M = !!(a != null && a.document != null && "createElement" in a.document),
        N = $.use_fbt_virtual_modules === !0 && M,
        ga = "$fbt_virtual",
        O = {},
        P = null,
        Q = 6e4;

    function ha(a, b) {
        !(a in e) && !(a in O) && (O[a] = {
            injectTime: z(),
            hash: b ? b.dataset.bootloaderHash || b.dataset.bootloaderHashClient : null
        }), P || (P = setTimeout(Z()(ia, "_checkFbtVirtualModuleTimeout"), Q))
    }

    function ia() {
        P = null;
        N || S.apply(null, [
            ["FBLogger"],
            function(a) {
                a("binary_transparency", "invalid_vmod_use").mustfix("_checkFbtVirtualModuleTimeout timeout queued when USE_FBT_VIRTUAL_MODULES is false!")
            }
        ]);
        a.__translationFetchTracker == null && (a.__translationFetchTracker = {});
        var b = a.__translationFetchTracker,
            c = z(),
            d = {};
        for (var e in O) {
            var f = O[e],
                g = f.hash;
            f = f.injectTime;
            if (c - f <= Q) continue;
            f = g == null || !(g in b) || b[g] === "fetched";
            if (f) {
                f = g != null ? g : "unknown";
                d[f] = d[f] || [];
                d[f].push(e);
                delete O[e]
            } else g != null && b[g] === "failed" && delete O[e]
        }
        Object.keys(O).length > 0 && (P = setTimeout(Z()(ia, "_checkFbtVirtualModuleTimeout"), Q));
        Object.keys(d).length > 0 && S.apply(null, [
            ["FBLogger"],
            function(a) {
                for (var b in d) a("binary_transparency", "vmod_timeout").warn("The following virtual modules in resource %s are taking over %sms to be defined: %s...", b, Q, d[b].join(",").slice(0, 300))
            }
        ])
    }
    var ja = ["fbt", "fbs", "errorDesc", "adsErrorDesc", "codedError", "errorSummary"];

    function ka(a, b, c) {
        if (!N) return;
        if (ja.indexOf(a) !== -1) return;
        for (var d = 0; d < b.length; d++)
            if (ja.indexOf(b[d]) !== -1) {
                var e = a + ga;
                b.push(e);
                ha(e, c);
                break
            }
    }

    function R(b, c, e, g, h, i, l, m) {
        c === void 0 ? (c = [], e = b, b = oa()) : e === void 0 && (e = c, s.call(b) === "[object Array]" ? (c = b, b = oa(c.join(","))) : c = []);
        var n = {
                cancel: na.bind(this, b)
            },
            o = la(b);
        if (!c && !e && i) {
            o.refcount += i;
            return n
        }
        N && (b in O && delete O[b], Array.isArray(c) && ka(b, c, m));
        f[b] = {
            id: b,
            dependencies: c,
            meta: l,
            category: g,
            defined: x ? z() : null,
            factoryTime: null,
            factoryStart: null,
            factoryEnd: null,
            factoryRun: !1
        };
        if (o.dependencies && o.reload !== !0) {
            b.indexOf(":") != -1 ? k++ : j++;
            return n
        }
        i && (o.refcount += i);
        m = c.map(la);
        o.factory = e;
        o.dependencies = m;
        o.context = h;
        o.special = g;
        (o.nonJSDeps || va(o)) && (o.nonJSDeps = !1, L(o));
        U(o);
        if (d.length > 0) {
            var p = d;
            d = [];
            l = a.ScheduleJSWork ? a.ScheduleJSWork : ya;
            l(function() {
                if (w) {
                    for (var a = 0; a < p.length; a++) E.call(null, p[a].id);
                    p.length = 0
                } else
                    while (p.length > 0) E.call(null, p.pop().id)
            })()
        }
        return n
    }

    function la(a) {
        var b = e[a];
        if (b) return b;
        b = new ma(a, 0);
        e[a] = b;
        return b
    }

    function ma(a, b, c) {
        this.id = a, this.refcount = b, this.exports = c || null, this.defaultExport = c || q, this.factory = void 0, this.factoryLength = -1, this.factoryFinished = !1, this.dependencies = void 0, this.depPosition = 0, this.context = void 0, this.special = 0, this.hasError = !1, this.error = null, this.ranRecursiveSideEffects = !1, this.sideEffectDependencyException = null, this.nextDepWaitingHead = null, this.nextDepWaitingNext = null, this.tarjanGeneration = -1, this.tarjanLow = 0, this.tarjanIndex = 0, this.tarjanOnStack = !1, this.nonJSDeps = !1
    }

    function na(a) {
        if (!e[a]) return;
        var b = e[a];
        e[a] = null;
        if (b.dependencies)
            for (a = 0; a < b.dependencies.length; a++) {
                var c = b.dependencies[a];
                c.refcount-- === 1 && na(c.id)
            }
    }

    function S(a, b, c) {
        var d = "__requireLazy__x__" + g++;
        return R("__requireLazy__" + d, a, Z()(b, "requireLazy", {
            propagationType: 0
        }), l | p, c, 1)
    }

    function oa(a) {
        return "__mod__" + (a != null ? a + "__" : "") + g++
    }

    function pa(a, b, c) {
        c.tarjanGeneration != h && (c.tarjanGeneration = h, c.tarjanLow = c.tarjanIndex = i++, c.tarjanOnStack = !0, b.push(c));
        if (c.dependencies != null)
            for (var d = c.depPosition; d < c.dependencies.length; d++) {
                var e = c.dependencies[d];
                e.tarjanGeneration != h ? (pa(a, b, e), c.tarjanLow = Math.min(c.tarjanLow, e.tarjanLow)) : e.tarjanOnStack && (c.tarjanLow = Math.min(c.tarjanLow, e.tarjanIndex))
            }
        if (c.tarjanLow == c.tarjanIndex) {
            e = [];
            do {
                d = b.pop();
                d.tarjanOnStack = !1;
                e.push(d);
                if (c == b[0] && d != c && d.dependencies != null)
                    for (var f = d.depPosition; f < d.dependencies.length; f++) {
                        var g = d.dependencies[f];
                        !T(g) && a.indexOf(g) == -1 && b.indexOf(g) == -1 && e.indexOf(g) == -1 && a.push(g)
                    }
            } while (d != c)
        }
    }

    function qa(a) {
        var b = a.dependencies;
        if (!b) throw u("Called _replaceCycleLinkWithSCCDeps on an undefined module");
        h++;
        pa(b, [], a);
        a.depPosition++;
        U(a)
    }

    function ra(a, b) {
        var c = b;
        while (!0) {
            if (c.dependencies && c.depPosition != c.dependencies.length) c = c.dependencies[c.depPosition];
            else break;
            if (c == a) {
                qa(a);
                return
            }
        }
        a.nextDepWaitingNext = b.nextDepWaitingHead;
        b.nextDepWaitingHead = a
    }

    function T(a) {
        return a.dependencies != null && a.depPosition >= a.dependencies.length
    }

    function sa(a) {
        a.depPosition++, U(a)
    }

    function ta(a) {
        var b = a.nextDepWaitingHead;
        a.nextDepWaitingHead = null;
        while (b != null) {
            var c = b;
            c.nonJSDeps && L(a);
            b = c.nextDepWaitingNext;
            c.nextDepWaitingNext = null;
            var d = !e[c.id];
            d || sa(c)
        }
    }

    function ua(a) {
        return a.special & l
    }

    function va(a) {
        return a.special & p
    }

    function U(a) {
        while (a.dependencies != null && a.depPosition < a.dependencies.length) {
            var b = a.dependencies[a.depPosition],
                c = T(b);
            if (!c && a != b) {
                ra(a, b);
                return
            }
            a.depPosition++
        }
        ua(a) && d.push(a);
        a.nextDepWaitingHead !== null && ta(a)
    }

    function wa(a) {
        if (a.sideEffectDependencyException != null) throw a.sideEffectDependencyException;
        if (a.ranRecursiveSideEffects) return;
        a.ranRecursiveSideEffects = !0;
        var b = a.dependencies;
        if (b)
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    wa(d)
                } catch (b) {
                    a.sideEffectDependencyException = b;
                    throw b
                }
                if (d.special & n) try {
                    E.call(null, d.id)
                } catch (b) {
                    a.sideEffectDependencyException = b;
                    throw b
                }
            }
    }

    function V(a, b) {
        e[a] = new ma(a, 0, b), f[a] = {
            id: a,
            dependencies: [],
            category: 0,
            factoryLengthAccessTime: null,
            factoryTime: null,
            factoryStart: null,
            factoryEnd: null,
            factoryRun: !1
        }
    }
    V("module", 0);
    V("exports", 0);
    V("define", R);
    V("global", a);
    V("require", E);
    V("requireInterop", E);
    V("importDefault", F);
    V("importNamespace", G);
    V("requireDynamic", xa);
    V("requireLazy", S);
    V("requireWeak", W);
    V("ifRequired", X);
    V("ifRequireable", Y);
    b = [E.call(null, "global"), E.call(null, "require"), E.call(null, "requireDynamic"), E.call(null, "requireLazy"), E.call(null, "requireInterop"), null];
    c = [E.call(null, "global"), E.call(null, "require"), E.call(null, "importDefault"), E.call(null, "importNamespace"), E.call(null, "requireLazy"), E.call(null, "requireInterop"), null];
    R.amd = {};
    a.define = R;
    a.require = E;
    a.requireInterop = E;
    a.importDefault = F;
    a.importNamespace = G;
    a.requireDynamic = xa;
    a.requireLazy = S;
    a.__onBeforeModuleFactory = null;
    a.__onAfterModuleFactory = null;

    function xa(a, b) {
        throw new ReferenceError("requireDynamic is not defined")
    }

    function W(a, b) {
        X.call(null, a, function(a) {
            b(a)
        }, function() {
            R("__requireWeak__" + a + "__" + g++, ["__isRequired__" + a], Z()(function() {
                return b(D(e[a]))
            }, "requireWeak"), l, null, 1)
        })
    }

    function X(a, b, c) {
        a = e[a];
        if (a && a.factoryFinished) {
            if (typeof b === "function") return b(D(a))
        } else if (typeof c === "function") return c()
    }

    function Y(a, b, c) {
        if (v !== !0) return X.call(null, a, b, c);
        var d = e[a];
        if (d && d.nonJSDeps && T(d)) {
            if (typeof b === "function") return b(E.call(null, a))
        } else if (typeof c === "function") return c()
    }
    $ = {
        getDupCount: function() {
            return [j, k]
        },
        getModules: function() {
            var a = {};
            for (var b in e) e[b] && Object.prototype.hasOwnProperty.call(e, b) && (a[b] = e[b]);
            return a
        },
        modulesMap: e,
        debugUnresolvedDependencies: t
    };

    function ya(a) {
        return a
    }

    function Z() {
        var b = a.TimeSlice && a.TimeSlice.guard ? a.TimeSlice.guard : ya;
        return function() {
            return b.apply(void 0, arguments)
        }
    }
    V("__getTotalRequireCalls", ea);
    V("__getModuleTimeDetails", fa);
    V("__debug", $);
    a.__d = function(a, b, c, d, e) {
        Z()(function() {
            R(a, b, c, (d || m) | o, null, null, null, e)
        }, "define " + a, {
            root: !0
        })()
    };

    function $(a, b) {
        return !0
    }
    if (a.__d_stub) {
        for (M = 0; M < a.__d_stub.length; M++) a.__d.apply(null, a.__d_stub[M]);
        delete a.__d_stub
    }
    if (a.__rl_stub) {
        for (W = 0; W < a.__rl_stub.length; W++) S.apply(null, a.__rl_stub[W]);
        delete a.__rl_stub
    }
    Y = function() {};
    a.$RefreshReg$ = Y;
    a.$RefreshSig$ = function() {
        return function(a) {
            return a
        }
    }
})(typeof this !== "undefined" ? this : typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {});
(function(a) {
    var b = a.performance;
    b && b.setResourceTimingBufferSize && (b.setResourceTimingBufferSize(1e5), b.onresourcetimingbufferfull = function() {
        a.__isresourcetimingbufferfull = !0
    }, b.setResourceTimingBufferSize = function() {})
})(typeof this === "object" ? this : typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : {});

__d("fb-error-lite", [], (function(a, b, c, d, e, f) {
    "use strict";
    var g = {
        PREVIOUS_FILE: 1,
        PREVIOUS_FRAME: 2,
        PREVIOUS_DIR: 3,
        FORCED_KEY: 4
    };

    function a(a) {
        var b = new Error(a);
        if (b.stack === void 0) try {
            throw b
        } catch (a) {}
        b.messageFormat = a;
        for (var c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), e = 1; e < c; e++) d[e - 1] = arguments[e];
        b.messageParams = d.map(function(a) {
            return String(a)
        });
        b.taalOpcodes = [g.PREVIOUS_FRAME];
        return b
    }
    b = {
        err: a,
        TAALOpcode: g
    };
    f["default"] = b
}), 66);
__d("$-core", ["fb-error-lite"], (function(a, b, c, d, e, f, g) {
    function a(a) {
        return h(a, typeof a === "string" ? document.getElementById(a) : a)
    }

    function b(a) {
        return h(a, typeof a === "string" ? document.getElementById(a) : a)
    }

    function h(a, b) {
        if (!b) {
            a = c("fb-error-lite").err('Tried to get element with id of "%s" but it is not present on the page', String(a));
            a.taalOpcodes = a.taalOpcodes || [];
            a.taalOpcodes = [c("fb-error-lite").TAALOpcode.PREVIOUS_FILE];
            throw a
        }
        return b
    }
    a.fromIDOrElement = b;
    g["default"] = a
}), 98);
__d("$", ["$-core"], (function(a, b, c, d, e, f, g) {
    g["default"] = c("$-core")
}), 98);
__d("Env", [], (function(a, b, c, d, e, f) {
    b = {
        ajaxpipe_token: null,
        compat_iframe_token: null,
        iframeKey: "",
        iframeTarget: "",
        iframeToken: "",
        isCQuick: !1,
        jssp_header_sent: !1,
        jssp_targeting_enabled: !1,
        start: Date.now(),
        nocatch: !1,
        useTrustedTypes: !1,
        isTrustedTypesReportOnly: !1,
        enableDefaultTrustedTypesPolicy: !1,
        ig_server_override: "",
        ig_mqtt_wss_endpoint: "",
        ig_mqtt_polling_endpoint: "",
        scheduledCSSJSScheduler: !1
    };
    a.Env && Object.assign(b, a.Env);
    a.Env = b;
    c = b;
    f["default"] = c
}), 66);
__d("sprintf", [], (function(a, b, c, d, e, f) {
    function a(a) {
        for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
        var e = 0;
        return a.replace(/%s/g, function() {
            return String(c[e++])
        })
    }
    f["default"] = a
}), 66);
__d("invariant", ["Env", "fb-error-lite", "sprintf"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a, b) {
        if (!a) {
            var d = b;
            for (var e = arguments.length, f = new Array(e > 2 ? e - 2 : 0), g = 2; g < e; g++) f[g - 2] = arguments[g];
            if (typeof d === "number") {
                var i = h(d, f),
                    j = i.message,
                    k = i.decoderLink;
                d = j;
                f.unshift(k)
            } else if (d === void 0) {
                d = "Invariant: ";
                for (var l = 0; l < f.length; l++) d += "%s,"
            }
            var m = d,
                n = new Error(m);
            n.name = "Invariant Violation";
            n.messageFormat = d;
            n.messageParams = f.map(function(a) {
                return String(a)
            });
            n.taalOpcodes = [c("fb-error-lite").TAALOpcode.PREVIOUS_FRAME];
            n.stack;
            throw n
        }
    }

    function h(a, b) {
        var d = "Minified invariant #" + a + "; %s";
        b.length > 0 && (d += " Params: " + b.map(function(a) {
            return "%s"
        }).join(", "));
        a = c("Env").show_invariant_decoder === !0 ? "visit " + i(a, b) + " to see the full message." : "";
        return {
            message: d,
            decoderLink: a
        }
    }

    function i(a, b) {
        a = "https://www.internalfb.com/intern/invariant/" + a + "/";
        b.length > 0 && (a += "?" + b.map(function(a, b) {
            return "args[" + b + "]=" + encodeURIComponent(String(a))
        }).join("&"));
        return a
    }
    g["default"] = a
}), 98);
__d("CSSCore", ["invariant"], (function(a, b, c, d, e, f, g, h) {
    function i(a, b) {
        var c = a;
        while (c.parentNode) c = c.parentNode;
        if (c instanceof Element) {
            c = c.querySelectorAll(b);
            return Array.prototype.indexOf.call(c, a) !== -1
        }
        return !1
    }

    function j(a, b) {
        /\s/.test(b) && h(0, 11794, b);
        b && (a.classList ? a.classList.add(b) : l(a, b) || (a.className = a.className + " " + b));
        return a
    }

    function k(a, b) {
        /\s/.test(b) && h(0, 11795, b);
        b && (a.classList ? a.classList.remove(b) : l(a, b) && (a.className = a.className.replace(new RegExp("(^|\\s)" + b + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "")));
        return a
    }

    function a(a, b, c) {
        return (c ? j : k)(a, b)
    }

    function l(a, b) {
        /\s/.test(b) && h(0, 442);
        return a.classList ? !!b && a.classList.contains(b) : (" " + a.className + " ").indexOf(" " + b + " ") > -1
    }

    function b(a, b) {
        var c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector || function(b) {
            return i(a, b)
        };
        return c.call(a, b)
    }
    g.addClass = j;
    g.removeClass = k;
    g.conditionClass = a;
    g.hasClass = l;
    g.matchesSelector = b
}), 98);
__d("CSS", ["$", "CSSCore"], (function(a, b, c, d, e, f, g) {
    var h = typeof window != "undefined" ? window.CSS : null,
        i = "hidden_elem";
    h = h && h.supports.bind(h);

    function a(a, b) {
        c("$").fromIDOrElement(a).className = b || "";
        return a
    }

    function j(a, b) {
        return a instanceof Document || a instanceof Text ? !1 : d("CSSCore").hasClass(c("$").fromIDOrElement(a), b)
    }

    function b(a, b) {
        return a instanceof Document || a instanceof Text ? !1 : d("CSSCore").matchesSelector(c("$").fromIDOrElement(a), b)
    }

    function k(a, b) {
        return d("CSSCore").addClass(c("$").fromIDOrElement(a), b)
    }

    function l(a, b) {
        return d("CSSCore").removeClass(c("$").fromIDOrElement(a), b)
    }

    function m(a, b, e) {
        return d("CSSCore").conditionClass(c("$").fromIDOrElement(a), b, !!e)
    }

    function n(a, b) {
        return m(a, b, !j(a, b))
    }

    function e(a) {
        return !j(a, i)
    }

    function f(a) {
        return k(a, i)
    }

    function o(a) {
        return l(a, i)
    }

    function p(a) {
        return n(a, i)
    }

    function q(a, b) {
        return m(a, i, !b)
    }
    g.supports = h;
    g.setClass = a;
    g.hasClass = j;
    g.matchesSelector = b;
    g.addClass = k;
    g.removeClass = l;
    g.conditionClass = m;
    g.toggleClass = n;
    g.shown = e;
    g.hide = f;
    g.show = o;
    g.toggle = p;
    g.conditionShow = q
}), 98);
__d("cx", [], (function(a, b, c, d, e, f) {
    function a(a) {
        throw new Error("cx: Unexpected class transformation.")
    }
    f["default"] = a
}), 66);
__d("PluginContinueAsButton", ["cx", "CSS"], (function(a, b, c, d, e, f, g, h) {
    function a(a) {
        a.clientHeight > 18 && d("CSS").addClass(a, "_4lqf")
    }
    g.resize = a
}), 98);
__d("ArbiterToken", ["invariant"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    a = function() {
        function a(a, b) {
            this.unsubscribe = function() {
                for (var a = 0; a < this.$2.length; a++) this.$2[a].remove();
                this.$2.length = 0
            }, this.$1 = a, this.$2 = b
        }
        var b = a.prototype;
        b.isForArbiterInstance = function(a) {
            this.$1 || h(0, 2506);
            return this.$1 === a
        };
        return a
    }();
    g["default"] = a
}), 98);
__d("performance", [], (function(a, b, c, d, e, f) {
    "use strict";
    b = a.performance || a.msPerformance || a.webkitPerformance || {};
    c = b;
    f["default"] = c
}), 66);
__d("performanceNow", ["performance"], (function(a, b, c, d, e, f, g) {
    if (c("performance").now) b = function() {
        return c("performance").now()
    };
    else {
        d = a._cstart;
        e = Date.now();
        var h = typeof d === "number" && d < e ? d : e,
            i = 0;
        b = function() {
            var a = Date.now(),
                b = a - h;
            b < i && (h -= i - b, b = a - h);
            i = b;
            return b
        }
    }
    f = b;
    g["default"] = f
}), 98);
__d("performanceNowSinceAppStart", ["performanceNow"], (function(a, b, c, d, e, f, g) {
    g["default"] = c("performanceNow")
}), 98);
__d("removeFromArray", [], (function(a, b, c, d, e, f) {
    function a(a, b) {
        b = a.indexOf(b);
        b !== -1 && a.splice(b, 1)
    }
    f["default"] = a
}), 66);
__d("fb-error", ["performanceNowSinceAppStart", "removeFromArray"], (function(a, b, c, d, e, f) {
    "use strict";
    var g = {
        PREVIOUS_FILE: 1,
        PREVIOUS_FRAME: 2,
        PREVIOUS_DIR: 3,
        FORCED_KEY: 4
    };

    function h(b) {
        var a = new Error(b);
        if (a.stack === void 0) try {
            throw a
        } catch (a) {}
        a.messageFormat = b;
        for (var c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), e = 1; e < c; e++) d[e - 1] = arguments[e];
        a.messageParams = d.map(function(a) {
            return String(a)
        });
        a.taalOpcodes = [g.PREVIOUS_FRAME];
        return a
    }
    var i = !1,
        j = {
            errorListener: function(b) {
                var c = a.console,
                    d = c[b.type] ? b.type : "error";
                if (b.type === "fatal" || d === "error" && !i) {
                    d = b.message;
                    c.error("ErrorUtils caught an error:\n\n" + d + "\n\nSubsequent non-fatal errors won't be logged; see https://fburl.com/debugjs.");
                    i = !0
                }
            }
        },
        k = {
            access_token: null
        },
        l = 6,
        m = 6e4,
        n = 10 * m,
        o = new Map(),
        p = 0;

    function q() {
        var a = b("performanceNowSinceAppStart")();
        if (a > p + m) {
            var c = a - n;
            for (var d = o, e = Array.isArray(d), f = 0, d = e ? d : d[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var g;
                if (e) {
                    if (f >= d.length) break;
                    g = d[f++]
                } else {
                    f = d.next();
                    if (f.done) break;
                    g = f.value
                }
                g = g;
                var h = g[0];
                g = g[1];
                g.lastAccessed < c && o["delete"](h)
            }
            p = a
        }
    }

    function r(a) {
        q();
        var c = b("performanceNowSinceAppStart")(),
            d = o.get(a);
        if (d == null) {
            o.set(a, {
                dropped: 0,
                logged: [c],
                lastAccessed: c
            });
            return 1
        }
        a = d.dropped;
        var e = d.logged;
        d.lastAccessed = c;
        while (e[0] < c - m) e.shift();
        if (e.length < l) {
            d.dropped = 0;
            e.push(c);
            return a + 1
        } else {
            d.dropped++;
            return null
        }
    }
    var s = {
            shouldLog: function(a) {
                return r(a.hash)
            }
        },
        t = "RE_EXN_ID";

    function u(a) {
        var b = null;
        a == null || typeof a !== "object" ? b = h("Non-object thrown: %s", String(a)) : Object.prototype.hasOwnProperty.call(a, t) ? b = h("Rescript exception thrown: %s", JSON.stringify(a)) : typeof a.message !== "string" ? b = h("Non-error thrown: %s, keys: %s", String(a), JSON.stringify(Object.keys(a).sort())) : Object.isExtensible && !Object.isExtensible(a) && (b = h("Non-extensible thrown: %s", String(a.message)));
        if (b != null) {
            b.taalOpcodes = b.taalOpcodes || [];
            b.taalOpcodes.push(g.PREVIOUS_FRAME);
            return b
        }
        return a
    }
    var aa = typeof window === "undefined" ? "<self.onerror>" : "<window.onerror>",
        v;

    function ba(a) {
        var b = a.error != null ? u(a.error) : h(a.message || "");
        b.fileName == null && a.filename != null && (b.fileName = a.filename);
        b.line == null && a.lineno != null && (b.line = a.lineno);
        b.column == null && a.colno != null && (b.column = a.colno);
        b.guardList = [aa];
        b.loggingSource = "ONERROR";
        (a = v) === null || a === void 0 ? void 0 : a.reportError(b)
    }
    var w = {
            setup: function(b) {
                if (typeof a.addEventListener !== "function") return;
                if (v != null) return;
                v = b;
                a.addEventListener("error", ba)
            }
        },
        x = [],
        y = {
            pushGuard: function(a) {
                x.unshift(a)
            },
            popGuard: function() {
                x.shift()
            },
            inGuard: function() {
                return x.length !== 0
            },
            cloneGuardList: function() {
                return x.map(function(a) {
                    return a.name
                })
            },
            findDeferredSource: function() {
                for (var a = 0; a < x.length; a++) {
                    var b = x[a];
                    if (b.deferredSource != null) return b.deferredSource
                }
            }
        };

    function ca(a) {
        if (a.type != null) return a.type;
        if (a.loggingSource == "GUARDED" || a.loggingSource == "ERROR_BOUNDARY") return "fatal";
        if (a.name == "SyntaxError") return "fatal";
        if (a.loggingSource == "ONERROR" && a.message.indexOf("ResizeObserver loop") >= 0) return "warn";
        return a.stack != null && a.stack.indexOf("chrome-extension://") >= 0 ? "warn" : "error"
    }
    var z = [],
        A = function() {
            function a() {
                this.metadata = [].concat(z)
            }
            var b = a.prototype;
            b.addEntries = function() {
                var a;
                (a = this.metadata).push.apply(a, arguments);
                return this
            };
            b.addEntry = function(a, b, c) {
                this.metadata.push([a, b, c]);
                return this
            };
            b.isEmpty = function() {
                return this.metadata.length === 0
            };
            b.clearEntries = function() {
                this.metadata = []
            };
            b.format = function() {
                var a = [];
                this.metadata.forEach(function(b) {
                    if (b && b.length) {
                        b = b.map(function(a) {
                            return a != null ? String(a).replace(/:/g, "_") : ""
                        }).join(":");
                        a.push(b)
                    }
                });
                return a
            };
            b.getAll = function() {
                return this.metadata
            };
            a.addGlobalMetadata = function(a, b, c) {
                z.push([a, b, c])
            };
            a.getGlobalMetadata = function() {
                return z
            };
            a.unsetGlobalMetadata = function(a, b) {
                z = z.filter(function(c) {
                    return !(Array.isArray(c) && c[0] === a && c[1] === b)
                })
            };
            return a
        }(),
        B = {
            debug: 1,
            info: 2,
            warn: 3,
            error: 4,
            fatal: 5
        };

    function c(a, b) {
        if (Object.isFrozen(a)) return;
        b.type && ((!a.type || B[a.type] > B[b.type]) && (a.type = b.type));
        var c = b.metadata;
        if (c != null) {
            var d;
            d = (d = a.metadata) !== null && d !== void 0 ? d : new A();
            c != null && d.addEntries.apply(d, c.getAll());
            a.metadata = d
        }
        b.project != null && (a.project = b.project);
        b.errorName != null && (a.errorName = b.errorName);
        b.componentStack != null && (a.componentStack = b.componentStack);
        b.deferredSource != null && (a.deferredSource = b.deferredSource);
        b.blameModule != null && (a.blameModule = b.blameModule);
        b.loggingSource != null && (a.loggingSource = b.loggingSource);
        d = (c = a.messageFormat) !== null && c !== void 0 ? c : a.message;
        c = (c = a.messageParams) !== null && c !== void 0 ? c : [];
        if (d !== b.messageFormat && b.messageFormat != null) {
            var e;
            d += " [Caught in: " + b.messageFormat + "]";
            c.push.apply(c, (e = b.messageParams) !== null && e !== void 0 ? e : [])
        }
        a.messageFormat = d;
        a.messageParams = c;
        e = b.forcedKey;
        d = a.forcedKey;
        c = e != null && d != null ? e + "_" + d : e !== null && e !== void 0 ? e : d;
        a.forcedKey = c
    }

    function d(a) {
        var b;
        return da((b = a.messageFormat) !== null && b !== void 0 ? b : a.message, a.messageParams || [])
    }

    function da(a, b) {
        var c = 0;
        a = a.replace(/%s/g, function() {
            return c < b.length ? b[c++] : "NOPARAM"
        });
        c < b.length && (a += " PARAMS" + JSON.stringify(b.slice(c)));
        return a
    }

    function f(a) {
        return (a !== null && a !== void 0 ? a : []).map(function(a) {
            return String(a)
        })
    }
    var C = {
            aggregateError: c,
            toReadableMessage: d,
            toStringParams: f
        },
        ea = 5,
        D = [];

    function E(a) {
        D.push(a), D.length > ea && D.shift()
    }

    function F(a) {
        var b = a.getAllResponseHeaders();
        if (b != null && b.indexOf("X-FB-Debug") >= 0) {
            b = a.getResponseHeader("X-FB-Debug");
            b && E(b)
        }
    }

    function fa() {
        return D
    }
    var G = {
            add: E,
            addFromXHR: F,
            getAll: fa
        },
        ga = "abcdefghijklmnopqrstuvwxyz012345";

    function H() {
        var a = 0;
        for (var b = arguments.length, c = new Array(b), d = 0; d < b; d++) c[d] = arguments[d];
        for (var e = 0; e < c.length; e++) {
            var f = c[e];
            if (f != null) {
                var g = f.length;
                for (var h = 0; h < g; h++) a = (a << 5) - a + f.charCodeAt(h)
            }
        }
        var i = "";
        for (var j = 0; j < 6; j++) i = ga.charAt(a & 31) + i, a >>= 5;
        return i
    }
    var I = [/\(([^\s\)\()]+):(\d+):(\d+)\)$/, /@([^\s\)\()]+):(\d+):(\d+)$/, /^([^\s\)\()]+):(\d+):(\d+)$/, /^at ([^\s\)\()]+):(\d+):(\d+)$/],
        ha = /^\w+:\s.*?\n/g;
    Error.stackTraceLimit != null && Error.stackTraceLimit < 80 && (Error.stackTraceLimit = 80);

    function ia(a) {
        var b = a.name,
            c = a.message;
        a = a.stack;
        if (a == null) return null;
        if (b != null && c != null && c !== "") {
            var d = b + ": " + c + "\n";
            if (a.startsWith(d)) return a.substr(d.length);
            if (a === b + ": " + c) return null
        }
        if (b != null) {
            d = b + "\n";
            if (a.startsWith(d)) return a.substr(d.length)
        }
        if (c != null && c !== "") {
            b = ": " + c + "\n";
            d = a.indexOf(b);
            c = a.substring(0, d);
            if (/^\w+$/.test(c)) return a.substring(d + b.length)
        }
        return a.replace(ha, "")
    }

    function J(a) {
        a = a.trim();
        var b;
        a;
        var c, d, e;
        if (a.includes("charset=utf-8;base64,")) b = "<inlined-file>";
        else {
            var f;
            for (var g = 0; g < I.length; g++) {
                var h = I[g];
                f = a.match(h);
                if (f != null) break
            }
            f != null && f.length === 4 ? (c = f[1], d = parseInt(f[2], 10), e = parseInt(f[3], 10), b = a.substring(0, a.length - f[0].length)) : b = a;
            b = b.replace(/^at /, "").trim()
        }
        h = {
            identifier: b,
            script: c,
            line: d,
            column: e
        };
        h.text = K(h);
        return h
    }

    function ja(a) {
        return a == null || a === "" ? [] : a.split(/\n\n/)[0].split("\n").map(J)
    }

    function ka(a) {
        a = ia(a);
        return ja(a)
    }

    function la(a) {
        if (a == null || a === "") return null;
        a = a.split("\n");
        a.splice(0, 1);
        return a.map(function(a) {
            return a.trim()
        })
    }

    function K(a) {
        var b = a.identifier,
            c = a.script,
            d = a.line;
        a = a.column;
        b = "    at " + (b !== null && b !== void 0 ? b : "<unknown>");
        c != null && d != null && a != null && (b += " (" + c + ":" + d + ":" + a + ")");
        return b
    }

    function L(c) {
        var d, e, f, h, i, j, k = ka(c);
        d = (d = c.taalOpcodes) !== null && d !== void 0 ? d : [];
        var l = c.framesToPop;
        if (l != null) {
            l = Math.min(l, k.length);
            while (l-- > 0) d.unshift(g.PREVIOUS_FRAME)
        }
        l = (l = c.messageFormat) !== null && l !== void 0 ? l : c.message;
        e = ((e = c.messageParams) !== null && e !== void 0 ? e : []).map(function(a) {
            return String(a)
        });
        var m = la(c.componentStack),
            n = m == null ? null : m.map(J),
            o = c.metadata ? c.metadata.format() : new A().format();
        o.length === 0 && (o = void 0);
        var p = k.map(function(a) {
            return a.text
        }).join("\n");
        f = (f = c.errorName) !== null && f !== void 0 ? f : c.name;
        var q = ca(c),
            r = c.loggingSource,
            s = c.project;
        h = (h = c.lineNumber) !== null && h !== void 0 ? h : c.line;
        i = (i = c.columnNumber) !== null && i !== void 0 ? i : c.column;
        j = (j = c.fileName) !== null && j !== void 0 ? j : c.sourceURL;
        var t = k.length > 0;
        t && h == null && (h = k[0].line);
        t && i == null && (i = k[0].column);
        t && j == null && (j = k[0].script);
        n = {
            blameModule: c.blameModule,
            column: i == null ? null : String(i),
            clientTime: Math.floor(Date.now() / 1e3),
            componentStackFrames: n,
            deferredSource: c.deferredSource != null ? L(c.deferredSource) : null,
            extra: (t = c.extra) !== null && t !== void 0 ? t : {},
            fbtrace_id: c.fbtrace_id,
            guardList: (i = c.guardList) !== null && i !== void 0 ? i : [],
            hash: H(f, p, q, s, r),
            isNormalizedError: !0,
            line: h == null ? null : String(h),
            loggingSource: r,
            message: C.toReadableMessage(c),
            messageFormat: l,
            messageParams: e,
            metadata: o,
            name: f,
            page_time: Math.floor(b("performanceNowSinceAppStart")()),
            project: s,
            reactComponentStack: m,
            script: j,
            serverHash: c.serverHash,
            stack: p,
            stackFrames: k,
            type: q,
            xFBDebug: G.getAll()
        };
        c.forcedKey != null && (n.forcedKey = c.forcedKey);
        d.length > 0 && (n.taalOpcodes = d);
        t = a.location;
        t && (n.windowLocationURL = t.href);
        for (i in n) n[i] == null && delete n[i];
        return n
    }

    function ma(a) {
        return a != null && typeof a === "object" && a.isNormalizedError === !0 ? a : null
    }
    var M = {
            formatStackFrame: K,
            normalizeError: L,
            ifNormalizedError: ma
        },
        na = "<global.react>",
        N = [],
        O = [],
        P = 50,
        Q = !1,
        R = {
            history: O,
            addListener: function(a, b) {
                b === void 0 && (b = !1), N.push(a), b || O.forEach(function(b) {
                    return a(b, (b = b.loggingSource) !== null && b !== void 0 ? b : "DEPRECATED")
                })
            },
            unshiftListener: function(a) {
                N.unshift(a)
            },
            removeListener: function(a) {
                b("removeFromArray")(N, a)
            },
            reportError: function(a) {
                a = M.normalizeError(a);
                R.reportNormalizedError(a)
            },
            reportNormalizedError: function(b) {
                if (Q) return !1;
                var a = y.cloneGuardList();
                b.componentStackFrames && a.unshift(na);
                a.length > 0 && (b.guardList = a);
                if (b.deferredSource == null) {
                    a = y.findDeferredSource();
                    a != null && (b.deferredSource = M.normalizeError(a))
                }
                O.length > P && O.splice(P / 2, 1);
                O.push(b);
                Q = !0;
                for (a = 0; a < N.length; a++) try {
                    var c;
                    N[a](b, (c = b.loggingSource) !== null && c !== void 0 ? c : "DEPRECATED")
                } catch (a) {}
                Q = !1;
                return !0
            }
        };
    R.addListener(j.errorListener);
    var oa = "<anonymous guard>",
        S = !1,
        T = {
            applyWithGuard: function(a, b, c, d) {
                y.pushGuard({
                    name: ((d === null || d === void 0 ? void 0 : d.name) != null ? d.name : null) || (a.name ? "func_name:" + a.name : null) || oa,
                    deferredSource: d === null || d === void 0 ? void 0 : d.deferredSource
                });
                if (S) try {
                    return a.apply(b, c)
                } finally {
                    y.popGuard()
                }
                try {
                    return Function.prototype.apply.call(a, b, c)
                } catch (h) {
                    try {
                        b = d !== null && d !== void 0 ? d : babelHelpers["extends"]({}, null);
                        var e = b.deferredSource,
                            f = b.onError;
                        b = b.onNormalizedError;
                        var g = u(h);
                        e = {
                            deferredSource: e,
                            loggingSource: "GUARDED",
                            project: (e = d === null || d === void 0 ? void 0 : d.project) !== null && e !== void 0 ? e : "ErrorGuard",
                            type: d === null || d === void 0 ? void 0 : d.errorType
                        };
                        C.aggregateError(g, e);
                        d = M.normalizeError(g);
                        g == null && a && (d.extra[a.toString().substring(0, 100)] = "function", c != null && c.length && (d.extra[Array.from(c).toString().substring(0, 100)] = "args"));
                        d.guardList = y.cloneGuardList();
                        f && f(g);
                        b && b(d);
                        R.reportNormalizedError(d)
                    } catch (a) {}
                } finally {
                    y.popGuard()
                }
            },
            guard: function(a, b) {
                function c() {
                    for (var c = arguments.length, d = new Array(c), e = 0; e < c; e++) d[e] = arguments[e];
                    return T.applyWithGuard(a, this, d, b)
                }
                a.__SMmeta && (c.__SMmeta = a.__SMmeta);
                return c
            },
            inGuard: function() {
                return y.inGuard()
            },
            skipGuardGlobal: function(a) {
                S = a
            }
        },
        U = 1024,
        V = [],
        W = 0;

    function X(a) {
        return String(a)
    }

    function Y(a) {
        return a == null ? null : String(a)
    }

    function pa(a, b) {
        var c = {};
        b && b.forEach(function(a) {
            c[a] = !0
        });
        Object.keys(a).forEach(function(b) {
            a[b] ? c[b] = !0 : c[b] && delete c[b]
        });
        return Object.keys(c)
    }

    function Z(a) {
        return (a !== null && a !== void 0 ? a : []).map(function(a) {
            return {
                column: Y(a.column),
                identifier: a.identifier,
                line: Y(a.line),
                script: a.script
            }
        })
    }

    function qa(a) {
        a = String(a);
        return a.length > U ? a.substring(0, U - 3) + "..." : a
    }

    function ra(a, b) {
        var c;
        c = {
            appId: Y(b.appId),
            cavalry_lid: b.cavalry_lid,
            access_token: k.access_token,
            ancestor_hash: a.hash,
            bundle_variant: (c = b.bundle_variant) !== null && c !== void 0 ? c : null,
            clientTime: X(a.clientTime),
            column: a.column,
            componentStackFrames: Z(a.componentStackFrames),
            events: a.events,
            extra: pa(a.extra, b.extra),
            forcedKey: a.forcedKey,
            frontend_env: (c = b.frontend_env) !== null && c !== void 0 ? c : null,
            guardList: a.guardList,
            line: a.line,
            loggingFramework: b.loggingFramework,
            messageFormat: qa(a.messageFormat),
            messageParams: a.messageParams.map(qa),
            name: a.name,
            sample_weight: Y(b.sample_weight),
            script: a.script,
            site_category: b.site_category,
            stackFrames: Z(a.stackFrames),
            type: a.type,
            page_time: Y(a.page_time),
            project: a.project,
            push_phase: b.push_phase,
            report_source: b.report_source,
            report_source_ref: b.report_source_ref,
            rollout_hash: (c = b.rollout_hash) !== null && c !== void 0 ? c : null,
            script_path: b.script_path,
            server_revision: Y(b.server_revision),
            spin: Y(b.spin),
            svn_rev: String(b.client_revision),
            additional_client_revisions: Array.from((c = b.additional_client_revisions) !== null && c !== void 0 ? c : []).map(X),
            taalOpcodes: a.taalOpcodes == null ? null : a.taalOpcodes.map(function(a) {
                return a
            }),
            web_session_id: b.web_session_id,
            version: "3",
            xFBDebug: a.xFBDebug
        };
        b = a.blameModule;
        var d = a.deferredSource;
        b != null && (c.blameModule = String(b));
        d && d.stackFrames && (c.deferredSource = {
            stackFrames: Z(d.stackFrames)
        });
        a.metadata && (c.metadata = a.metadata);
        a.loadingUrls && (c.loadingUrls = a.loadingUrls);
        a.serverHash != null && (c.serverHash = a.serverHash);
        a.windowLocationURL != null && (c.windowLocationURL = a.windowLocationURL);
        a.loggingSource != null && (c.loggingSource = a.loggingSource);
        return c
    }

    function sa(a, b, c) {
        var d;
        W++;
        if (b.sample_weight === 0) return !1;
        var e = s.shouldLog(a);
        if (e == null) return !1;
        if ((d = b.projectBlocklist) !== null && d !== void 0 && d.includes(a.project)) return !1;
        d = ra(a, b);
        Object.assign(d, {
            ancestors: V.slice(),
            clientWeight: X(e),
            page_position: X(W)
        });
        V.length < 15 && V.push(a.hash);
        c(d);
        return !0
    }
    var ta = {
            createErrorPayload: ra,
            postError: sa
        },
        $ = null,
        ua = !1;

    function va(a) {
        if ($ == null) return;
        var b = $,
            c = a.reason,
            d;
        if (c != null && typeof c === "object" && (c.name == null || c.name === "" || c.message == null || c.message === "")) try {
            d = h("UnhandledRejection: %s", JSON.stringify(c)), d.loggingSource = "ONUNHANDLEDREJECTION"
        } catch (a) {
            d = h("UnhandledRejection: (circular) %s", Object.keys(c).join(",")), d.loggingSource = "ONUNHANDLEDREJECTION"
        } else d = u(c), d.loggingSource || (d.loggingSource = "ONUNHANDLEDREJECTION");
        try {
            c = a.promise;
            d.stack = String(d.stack || "") + (c != null && typeof c.settledStack === "string" ? "\n(<promise_settled_stack_below>)\n" + c.settledStack : "") + (c != null && typeof c.createdStack === "string" ? "\n(<promise_created_stack_below>)\n" + c.createdStack : "")
        } catch (a) {}
        b.reportError(d);
        a.preventDefault()
    }

    function wa(b) {
        $ = b, typeof a.addEventListener === "function" && !ua && (ua = !0, a.addEventListener("unhandledrejection", va))
    }
    var xa = {
        onunhandledrejection: va,
        setup: wa
    };
    c = {
        preSetup: function(a) {
            (a == null || a.ignoreOnError !== !0) && w.setup(R), (a == null || a.ignoreOnUnahndledRejection !== !0) && xa.setup(R)
        },
        setup: function(a, b) {
            R.addListener(function(c) {
                ta.postError(c, a, b)
            })
        }
    };
    var ya = function() {
        function a(a) {
            this.project = a, this.events = [], this.metadata = new A(), this.taalOpcodes = []
        }
        var b = a.prototype;
        b.$1 = function(b, c) {
            var d = String(c),
                e = this.events,
                f = this.project,
                h = this.metadata,
                i = this.blameModule,
                j = this.forcedKey,
                k = this.error,
                l;
            for (var m = arguments.length, n = new Array(m > 2 ? m - 2 : 0), o = 2; o < m; o++) n[o - 2] = arguments[o];
            if (this.normalizedError) {
                var p = {
                    message: this.normalizedError.messageFormat + " [Caught in: " + d + "]",
                    params: [].concat(this.normalizedError.messageParams, n),
                    forcedKey: j
                };
                l = babelHelpers["extends"]({}, this.normalizedError, {
                    message: p.message,
                    messageFormat: p.message,
                    messageParams: C.toStringParams(p.params),
                    project: f,
                    type: b,
                    loggingSource: "FBLOGGER"
                })
            } else if (k) this.taalOpcodes.length > 0 && new a("fblogger").blameToPreviousFrame().blameToPreviousFrame().warn("Blame helpers do not work with catching"), C.aggregateError(k, {
                messageFormat: d,
                messageParams: C.toStringParams(n),
                errorName: k.name,
                forcedKey: j,
                project: f,
                type: b,
                loggingSource: "FBLOGGER"
            }), l = M.normalizeError(k);
            else {
                k = new Error(d);
                if (k.stack === void 0) try {
                    throw k
                } catch (a) {}
                k.messageFormat = d;
                k.messageParams = C.toStringParams(n);
                k.blameModule = i;
                k.forcedKey = j;
                k.project = f;
                k.type = b;
                k.loggingSource = "FBLOGGER";
                k.taalOpcodes = [g.PREVIOUS_FRAME, g.PREVIOUS_FRAME].concat(this.taalOpcodes);
                l = M.normalizeError(k);
                l.name = "FBLogger"
            }
            if (!h.isEmpty())
                if (l.metadata == null) l.metadata = h.format();
                else {
                    var q = l.metadata.concat(h.format()),
                        r = new Set(q);
                    l.metadata = Array.from(r.values())
                }
            if (e.length > 0)
                if (l.events != null) {
                    var s;
                    (s = l.events).push.apply(s, e)
                } else l.events = e;
            R.reportNormalizedError(l);
            return k
        };
        b.fatal = function(a) {
            for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
            this.$1.apply(this, ["fatal", a].concat(c))
        };
        b.mustfix = function(a) {
            for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
            this.$1.apply(this, ["error", a].concat(c))
        };
        b.warn = function(a) {
            for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
            this.$1.apply(this, ["warn", a].concat(c))
        };
        b.info = function(a) {
            for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
            this.$1.apply(this, ["info", a].concat(c))
        };
        b.debug = function(a) {};
        b.mustfixThrow = function(a) {
            for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
            var e = this.$1.apply(this, ["error", a].concat(c));
            e || (e = h("mustfixThrow does not support catchingNormalizedError"), e.taalOpcodes = e.taalOpcodes || [], e.taalOpcodes.push(g.PREVIOUS_FRAME));
            try {
                e.message = C.toReadableMessage(e)
            } catch (a) {}
            throw e
        };
        b.catching = function(b) {
            !(b instanceof Error) ? new a("fblogger").blameToPreviousFrame().warn("Catching non-Error object is not supported"): this.error = b;
            return this
        };
        b.catchingNormalizedError = function(a) {
            this.normalizedError = a;
            return this
        };
        b.event = function(a) {
            this.events.push(a);
            return this
        };
        b.blameToModule = function(a) {
            this.blameModule = a;
            return this
        };
        b.blameToPreviousFile = function() {
            this.taalOpcodes.push(g.PREVIOUS_FILE);
            return this
        };
        b.blameToPreviousFrame = function() {
            this.taalOpcodes.push(g.PREVIOUS_FRAME);
            return this
        };
        b.blameToPreviousDirectory = function() {
            this.taalOpcodes.push(g.PREVIOUS_DIR);
            return this
        };
        b.addToCategoryKey = function(a) {
            this.forcedKey = a;
            return this
        };
        b.addMetadata = function(a, b, c) {
            this.metadata.addEntry(a, b, c);
            return this
        };
        return a
    }();
    d = function(a, b) {
        var c = new ya(a);
        return b != null ? c.event(a + "." + b) : c
    };
    d.addGlobalMetadata = function(a, b, c) {
        A.addGlobalMetadata(a, b, c)
    };
    f = {
        blameToPreviousFile: function(a) {
            var b;
            a.taalOpcodes = (b = a.taalOpcodes) !== null && b !== void 0 ? b : [];
            a.taalOpcodes.push(g.PREVIOUS_FILE);
            return a
        },
        blameToPreviousFrame: function(a) {
            var b;
            a.taalOpcodes = (b = a.taalOpcodes) !== null && b !== void 0 ? b : [];
            a.taalOpcodes.push(g.PREVIOUS_FRAME);
            return a
        },
        blameToPreviousDirectory: function(a) {
            var b;
            a.taalOpcodes = (b = a.taalOpcodes) !== null && b !== void 0 ? b : [];
            a.taalOpcodes.push(g.PREVIOUS_DIR);
            return a
        }
    };
    F = {
        err: h,
        ErrorBrowserConsole: j,
        ErrorDynamicData: k,
        ErrorFilter: s,
        ErrorGlobalEventHandler: w,
        ErrorGuard: T,
        ErrorGuardState: y,
        ErrorMetadata: A,
        ErrorNormalizeUtils: M,
        ErrorPoster: ta,
        ErrorPubSub: R,
        ErrorSerializer: C,
        ErrorSetup: c,
        ErrorXFBDebug: G,
        FBLogger: d,
        getErrorSafe: u,
        getSimpleHash: H,
        TAAL: f,
        TAALOpcode: g
    };
    e.exports = F
}), null);
__d("ErrorGuard", ["fb-error"], (function(a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = c("fb-error").ErrorGuard
}), 98);
__d("CallbackDependencyManager", ["ErrorGuard"], (function(a, b, c, d, e, f) {
    var g;
    a = function() {
        "use strict";

        function a() {
            this.$1 = new Map(), this.$2 = new Map(), this.$3 = 1, this.$4 = new Map()
        }
        var c = a.prototype;
        c.$5 = function(a, b) {
            var c = 0,
                d = new Set();
            for (var e = 0, f = b.length; e < f; e++) d.add(b[e]);
            for (b = d.keys(), e = Array.isArray(b), f = 0, b = e ? b : b[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                if (e) {
                    if (f >= b.length) break;
                    d = b[f++]
                } else {
                    f = b.next();
                    if (f.done) break;
                    d = f.value
                }
                d = d;
                if (this.$4.get(d)) continue;
                c++;
                var g = this.$1.get(d);
                g === void 0 && (g = new Map(), this.$1.set(d, g));
                g.set(a, (g.get(a) || 0) + 1)
            }
            return c
        };
        c.$6 = function(a) {
            a = this.$1.get(a);
            if (!a) return;
            for (var c = a.entries(), d = Array.isArray(c), e = 0, c = d ? c : c[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var f;
                if (d) {
                    if (e >= c.length) break;
                    f = c[e++]
                } else {
                    e = c.next();
                    if (e.done) break;
                    f = e.value
                }
                f = f;
                var h = f[0];
                f = f[1] - 1;
                a.set(h, f);
                f <= 0 && a["delete"](h);
                f = this.$2.get(h);
                if (f !== void 0) {
                    f.$7--;
                    if (f.$7 <= 0) {
                        f = f.$8;
                        this.$2["delete"](h);
                        (g || (g = b("ErrorGuard"))).applyWithGuard(f, null, [])
                    }
                }
            }
        };
        c.addDependenciesToExistingCallback = function(a, b) {
            var c = this.$2.get(a);
            if (!c) return null;
            b = this.$5(a, b);
            c.$7 += b;
            return a
        };
        c.isPersistentDependencySatisfied = function(a) {
            return !!this.$4.get(a)
        };
        c.satisfyPersistentDependency = function(a) {
            this.$4.set(a, 1), this.$6(a)
        };
        c.satisfyNonPersistentDependency = function(a) {
            var b = this.$4.get(a) === 1;
            b || this.$4.set(a, 1);
            this.$6(a);
            b || this.$4["delete"](a)
        };
        c.registerCallback = function(a, c) {
            var d = this.$3;
            this.$3++;
            c = this.$5(d, c);
            if (c === 0) {
                (g || (g = b("ErrorGuard"))).applyWithGuard(a, null, []);
                return null
            }
            this.$2.set(d, {
                $8: a,
                $7: c
            });
            return d
        };
        return a
    }();
    e.exports = a
}), null);
__d("EventSubscription", [], (function(a, b, c, d, e, f) {
    "use strict";
    a = function(a) {
        var b = this;
        this.remove = function() {
            b.subscriber && (b.subscriber.removeSubscription(b), b.subscriber = null)
        };
        this.subscriber = a
    };
    f["default"] = a
}), 66);
__d("EmitterSubscription", ["EventSubscription"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = function(a) {
        babelHelpers.inheritsLoose(b, a);

        function b(b, c, d) {
            b = a.call(this, b) || this;
            b.listener = c;
            b.context = d;
            return b
        }
        return b
    }(c("EventSubscription"));
    g["default"] = a
}), 98);
__d("EventSubscriptionVendor", ["invariant"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = function() {
        function a() {
            this.$1 = {}
        }
        var b = a.prototype;
        b.addSubscription = function(a, b) {
            b.subscriber === this || g(0, 2828);
            this.$1[a] || (this.$1[a] = []);
            var c = this.$1[a].length;
            this.$1[a].push(b);
            b.eventType = a;
            b.key = c;
            return b
        };
        b.removeAllSubscriptions = function(a) {
            a === void 0 ? this.$1 = {} : delete this.$1[a]
        };
        b.removeSubscription = function(a) {
            var b = a.eventType;
            a = a.key;
            b = this.$1[b];
            b && delete b[a]
        };
        b.getSubscriptionsForType = function(a) {
            return this.$1[a]
        };
        return a
    }();
    e.exports = a
}), null);
__d("emptyFunction", [], (function(a, b, c, d, e, f) {
    function a(a) {
        return function() {
            return a
        }
    }
    b = function() {};
    b.thatReturns = a;
    b.thatReturnsFalse = a(!1);
    b.thatReturnsTrue = a(!0);
    b.thatReturnsNull = a(null);
    b.thatReturnsThis = function() {
        return this
    };
    b.thatReturnsArgument = function(a) {
        return a
    };
    c = b;
    f["default"] = c
}), 66);
__d("FBLogger", ["fb-error"], (function(a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = c("fb-error").FBLogger
}), 98);
__d("unrecoverableViolation", ["FBLogger"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a, b, d, e) {
        d = d === void 0 ? {} : d;
        d = d.error;
        b = c("FBLogger")(b);
        d ? b = b.catching(d) : b = b.blameToPreviousFrame();
        for (d = 0; d < ((f = e == null ? void 0 : e.blameToPreviousFrame) != null ? f : 0); ++d) {
            var f;
            b = b.blameToPreviousFrame()
        }
        f = e == null ? void 0 : e.categoryKey;
        f != null && (b = b.addToCategoryKey(f));
        return b.mustfixThrow(a)
    }
    g["default"] = a
}), 98);
__d("BaseEventEmitter", ["EmitterSubscription", "ErrorGuard", "EventSubscriptionVendor", "emptyFunction", "unrecoverableViolation"], (function(a, b, c, d, e, f) {
    var g;
    a = function() {
        "use strict";

        function a() {
            this.$2 = new(b("EventSubscriptionVendor"))(), this.$1 = null
        }
        var c = a.prototype;
        c.addListener = function(a, c, d) {
            return this.$2.addSubscription(a, new(b("EmitterSubscription"))(this.$2, c, d))
        };
        c.removeListener = function(a) {
            this.$2.removeSubscription(a)
        };
        c.once = function(a, b, c) {
            var d = this;
            return this.addListener(a, function() {
                d.removeCurrentListener(), b.apply(c, arguments)
            })
        };
        c.removeAllListeners = function(a) {
            this.$2.removeAllSubscriptions(a)
        };
        c.removeCurrentListener = function() {
            if (!this.$1) throw b("unrecoverableViolation")("Not in an emitting cycle; there is no current subscription", "emitter");
            this.$2.removeSubscription(this.$1)
        };
        c.listeners = function(a) {
            a = this.$2.getSubscriptionsForType(a);
            return a ? a.filter(b("emptyFunction").thatReturnsTrue).map(function(a) {
                return a.listener
            }) : []
        };
        c.emit = function(a) {
            var b = this.$2.getSubscriptionsForType(a);
            if (b) {
                var c = Object.keys(b),
                    d;
                for (var e = 0; e < c.length; e++) {
                    var f = c[e],
                        g = b[f];
                    if (g) {
                        this.$1 = g;
                        if (d == null) {
                            d = [g, a];
                            for (var h = 0, i = arguments.length <= 1 ? 0 : arguments.length - 1; h < i; h++) d[h + 2] = h + 1 < 1 || arguments.length <= h + 1 ? void 0 : arguments[h + 1]
                        } else d[0] = g;
                        this.__emitToSubscription.apply(this, d)
                    }
                }
                this.$1 = null
            }
        };
        c.__emitToSubscription = function(a, c) {
            for (var d = arguments.length, e = new Array(d > 2 ? d - 2 : 0), f = 2; f < d; f++) e[f - 2] = arguments[f];
            (g || (g = b("ErrorGuard"))).applyWithGuard(a.listener, a.context, e, {
                name: "EventEmitter " + c + " event"
            })
        };
        return a
    }();
    e.exports = a
}), null);
__d("EventEmitter", ["BaseEventEmitter"], (function(a, b, c, d, e, f, g) {
    a = function(a) {
        babelHelpers.inheritsLoose(b, a);

        function b() {
            return a.apply(this, arguments) || this
        }
        return b
    }(c("BaseEventEmitter"));
    g["default"] = a
}), 98);
__d("EventEmitterWithHolding", [], (function(a, b, c, d, e, f) {
    "use strict";
    a = function() {
        function a(a, b) {
            this.$2 = a, this.$3 = b, this.$1 = null, this.$5 = [], this.$4 = 0
        }
        var b = a.prototype;
        b.addListener = function(a, b, c) {
            return this.$2.addListener(a, b, c)
        };
        b.once = function(a, b, c) {
            return this.$2.once(a, b, c)
        };
        b.addRetroactiveListener = function(a, b, c) {
            var d = this.$2.addListener(a, b, c),
                e = this.$5;
            e.push(!1);
            this.$4++;
            this.$3.emitToListener(a, b, c);
            this.$4--;
            e[e.length - 1] && d.remove();
            e.pop();
            return d
        };
        b.removeAllListeners = function(a) {
            this.$2.removeAllListeners(a)
        };
        b.removeCurrentListener = function() {
            if (this.$4) {
                var a = this.$5;
                a[a.length - 1] = !0
            } else this.$2.removeCurrentListener()
        };
        b.listeners = function(a) {
            return this.$2.listeners(a)
        };
        b.emit = function(a) {
            var b;
            for (var c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), e = 1; e < c; e++) d[e - 1] = arguments[e];
            (b = this.$2).emit.apply(b, [a].concat(d))
        };
        b.emitAndHold = function(a) {
            var b, c;
            for (var d = arguments.length, e = new Array(d > 1 ? d - 1 : 0), f = 1; f < d; f++) e[f - 1] = arguments[f];
            this.$1 = (b = this.$3).holdEvent.apply(b, [a].concat(e));
            (c = this.$2).emit.apply(c, [a].concat(e));
            this.$1 = null
        };
        b.releaseCurrentEvent = function() {
            this.$1 != null ? this.$3.releaseEvent(this.$1) : this.$4 > 0 && this.$3.releaseCurrentEvent()
        };
        b.releaseHeldEventType = function(a) {
            this.$3.releaseEventType(a)
        };
        return a
    }();
    f["default"] = a
}), 66);
__d("EventHolder", ["invariant"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    a = function() {
        function a() {
            this.$1 = {}, this.$2 = []
        }
        var b = a.prototype;
        b.holdEvent = function(a) {
            this.$1[a] = this.$1[a] || [];
            var b = this.$1[a],
                c = {
                    eventType: a,
                    index: b.length
                };
            for (var d = arguments.length, e = new Array(d > 1 ? d - 1 : 0), f = 1; f < d; f++) e[f - 1] = arguments[f];
            b.push(e);
            return c
        };
        b.emitToListener = function(a, b, c) {
            var d = this,
                e = this.$1[a];
            if (!e) return;
            e.forEach(function(e, f) {
                if (!e) return;
                d.$2.push({
                    eventType: a,
                    index: f
                });
                b.apply(c, e);
                d.$2.pop()
            })
        };
        b.releaseCurrentEvent = function() {
            this.$2.length || h(0, 1764), this.releaseEvent(this.$2[this.$2.length - 1])
        };
        b.releaseEvent = function(a) {
            delete this.$1[a.eventType][a.index]
        };
        b.releaseEventType = function(a) {
            this.$1[a] = []
        };
        return a
    }();
    g["default"] = a
}), 98);
__d("Arbiter", ["invariant", "ArbiterToken", "CallbackDependencyManager", "ErrorGuard", "EventEmitter", "EventEmitterWithHolding", "EventHolder"], (function(a, b, c, d, e, f, g, h) {
    "use strict";

    function i(a) {
        return Array.isArray(a) ? a : [a]
    }

    function j(a) {
        return a instanceof k || a === k ? a : k
    }
    var k = function() {
            function a() {
                var a = new(c("EventEmitter"))();
                this.$3 = new l();
                this.$2 = new(c("EventEmitterWithHolding"))(a, this.$3);
                this.$1 = new(c("CallbackDependencyManager"))();
                this.$4 = []
            }
            var b = a.prototype;
            b.subscribe = function(a, b, d) {
                var e = this;
                a = i(a);
                a.forEach(function(a) {
                    a && typeof a === "string" || h(0, 1966, a)
                });
                typeof b === "function" || h(0, 1967, b);
                d = d || "all";
                d === "new" || d === "all" || h(0, 1968, d);
                a = a.map(function(a) {
                    var c = function(c) {
                        return e.$5(b, a, c)
                    };
                    c.__SMmeta = b.__SMmeta;
                    if (d === "new") return e.$2.addListener(a, c);
                    e.$4.push({});
                    c = e.$2.addRetroactiveListener(a, c);
                    e.$4.pop();
                    return c
                });
                return new(c("ArbiterToken"))(this, a)
            };
            b.$5 = function(a, b, d) {
                var e = this.$4[this.$4.length - 1];
                if (e[b] === !1) return;
                a = c("ErrorGuard").applyWithGuard(a, null, [b, d]);
                a === !1 && this.$2.releaseCurrentEvent();
                e[b] = a
            };
            b.unsubscribeCurrentSubscription = function() {
                this.$2.removeCurrentListener()
            };
            b.releaseCurrentPersistentEvent = function() {
                this.$2.releaseCurrentEvent()
            };
            b.subscribeOnce = function(a, b, c) {
                var d = this;
                a = this.subscribe(a, function(a, c) {
                    d.unsubscribeCurrentSubscription();
                    return b(a, c)
                }, c);
                return a
            };
            b.unsubscribe = function(a) {
                a.isForArbiterInstance(this) || h(0, 1969), a.unsubscribe()
            };
            b.inform = function(a, b, c) {
                var d = Array.isArray(a);
                a = i(a);
                c = c || "event";
                var e = c === "state" || c === "persistent";
                this.$4.push({});
                for (var f = 0; f < a.length; f++) {
                    var g = a[f];
                    g || h(0, 1970, g);
                    this.$3.setHoldingBehavior(g, c);
                    this.$2.emitAndHold(g, b);
                    this.$6(g, b, e)
                }
                g = this.$4.pop();
                return d ? g : g[a[0]]
            };
            b.query = function(a) {
                var b = this.$3.getHoldingBehavior(a);
                !b || b === "state" || h(0, 1971, a);
                b = null;
                this.$3.emitToListener(a, function(a) {
                    b = a
                });
                return b
            };
            b.registerCallback = function(a, b) {
                if (typeof a === "function") return this.$1.registerCallback(a, b);
                else return this.$1.addDependenciesToExistingCallback(a, b)
            };
            b.$6 = function(a, b, c) {
                if (b === null) return;
                c ? this.$1.satisfyPersistentDependency(a) : this.$1.satisfyNonPersistentDependency(a)
            };
            a.subscribe = function(b, c, d) {
                return a.prototype.subscribe.apply(j(this), arguments)
            };
            a.unsubscribeCurrentSubscription = function() {
                return a.prototype.unsubscribeCurrentSubscription.apply(j(this))
            };
            a.releaseCurrentPersistentEvent = function() {
                return a.prototype.releaseCurrentPersistentEvent.apply(j(this))
            };
            a.subscribeOnce = function(b, c, d) {
                return a.prototype.subscribeOnce.apply(j(this), arguments)
            };
            a.unsubscribe = function(b) {
                return a.prototype.unsubscribe.apply(j(this), arguments)
            };
            a.inform = function(b, c, d) {
                return a.prototype.inform.apply(j(this), arguments)
            };
            a.informSingle = function(b, c, d) {
                return a.prototype.inform.apply(j(this), arguments)
            };
            a.query = function(b) {
                return a.prototype.query.apply(j(this), arguments)
            };
            a.registerCallback = function(b, c) {
                return a.prototype.registerCallback.apply(j(this), arguments)
            };
            a.$6 = function(b, c, d) {
                return a.prototype.$6.apply(j(this), arguments)
            };
            a.$5 = function(b, c, d) {
                return a.prototype.$5.apply(j(this), arguments)
            };
            return a
        }(),
        l = function(b) {
            babelHelpers.inheritsLoose(a, b);

            function a() {
                var a;
                a = b.call(this) || this;
                a.$ArbiterEventHolder1 = {};
                return a
            }
            var c = a.prototype;
            c.setHoldingBehavior = function(a, b) {
                this.$ArbiterEventHolder1[a] = b
            };
            c.getHoldingBehavior = function(a) {
                return this.$ArbiterEventHolder1[a]
            };
            c.holdEvent = function(a) {
                var c = this.$ArbiterEventHolder1[a];
                c !== "persistent" && this.$ArbiterEventHolder2(a);
                if (c !== "event") {
                    var d;
                    for (var e = arguments.length, f = new Array(e > 1 ? e - 1 : 0), g = 1; g < e; g++) f[g - 1] = arguments[g];
                    return (d = b.prototype.holdEvent).call.apply(d, [this, a].concat(f))
                }
                return void 0
            };
            c.$ArbiterEventHolder2 = function(a) {
                this.emitToListener(a, this.releaseCurrentEvent, this)
            };
            c.releaseEvent = function(a) {
                a && b.prototype.releaseEvent.call(this, a)
            };
            return a
        }(c("EventHolder"));
    k.call(k);
    a = k;
    g["default"] = a
}), 98);
__d("DOMEvent", ["invariant"], (function(a, b, c, d, e, f, g, h) {
    a = function() {
        function a(a) {
            this.event = a || window.event, typeof this.event.srcElement !== "unknown" || h(0, 5798), this.target = this.event.target || this.event.srcElement
        }
        var b = a.prototype;
        b.preventDefault = function() {
            var a = this.event;
            a.preventDefault ? (a.preventDefault(), "defaultPrevented" in a || (a.defaultPrevented = !0)) : a.returnValue = !1;
            return this
        };
        b.isDefaultPrevented = function() {
            var a = this.event;
            return "defaultPrevented" in a ? a.defaultPrevented : a.returnValue === !1
        };
        b.stopPropagation = function() {
            var a = this.event;
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0;
            return this
        };
        b.kill = function() {
            this.stopPropagation().preventDefault();
            return this
        };
        a.killThenCall = function(b) {
            return function(c) {
                new a(c).kill();
                return b()
            }
        };
        return a
    }();
    g["default"] = a
}), 98);
__d("isNode", [], (function(a, b, c, d, e, f) {
    function a(a) {
        var b;
        b = a != null ? (b = a.ownerDocument) != null ? b : a : document;
        b = (b = b.defaultView) != null ? b : window;
        return !!(a != null && (typeof b.Node === "function" ? a instanceof b.Node : typeof a === "object" && typeof a.nodeType === "number" && typeof a.nodeName === "string"))
    }
    f["default"] = a
}), 66);
__d("isTextNode", ["isNode"], (function(a, b, c, d, e, f, g) {
    function a(a) {
        return c("isNode")(a) && a.nodeType == 3
    }
    g["default"] = a
}), 98);
__d("containsNode", ["isTextNode"], (function(a, b, c, d, e, f, g) {
    function h(a, b) {
        if (!a || !b) return !1;
        else if (a === b) return !0;
        else if (c("isTextNode")(a)) return !1;
        else if (c("isTextNode")(b)) return h(a, b.parentNode);
        else if ("contains" in a) return a.contains(b);
        else if (a.compareDocumentPosition) return !!(a.compareDocumentPosition(b) & 16);
        else return !1
    }
    g["default"] = h
}), 98);
__d("createArrayFromMixed", ["invariant"], (function(a, b, c, d, e, f, g, h) {
    function i(a) {
        var b = a.length;
        !Array.isArray(a) && (typeof a === "object" || typeof a === "function") || h(0, 3914);
        typeof b === "number" || h(0, 3915);
        b === 0 || b - 1 in a || h(0, 3916);
        typeof a.callee !== "function" || h(0, 3917);
        if (a.hasOwnProperty) try {
            return Array.prototype.slice.call(a)
        } catch (a) {}
        var c = Array(b);
        for (var d = 0; d < b; d++) c[d] = a[d];
        return c
    }

    function j(a) {
        return !!a && (typeof a === "object" || typeof a === "function") && "length" in a && !("setInterval" in a) && typeof a.nodeType !== "number" && (Array.isArray(a) || "callee" in a || "item" in a)
    }

    function a(a) {
        if (!j(a)) return [a];
        else if (Array.isArray(a)) return a.slice();
        else return i(a)
    }
    g["default"] = a
}), 98);
__d("createObjectFrom", [], (function(a, b, c, d, e, f) {
    function g(a, b) {
        if (b === void 0) return g(a, !0);
        var c = {};
        if (Array.isArray(b))
            for (var d = a.length - 1; d >= 0; d--) c[a[d]] = b[d];
        else
            for (d = a.length - 1; d >= 0; d--) c[a[d]] = b;
        return c
    }
    f["default"] = g
}), 66);
__d("ge", [], (function(a, b, c, d, e, f) {
    function a(a, b, c) {
        if (typeof a !== "string") return a;
        else if (!b) return document.getElementById(a);
        else return g(a, b, c)
    }

    function g(a, b, c) {
        var d;
        if (h(b) == a) return b;
        else if (b.getElementsByTagName) {
            c = b.getElementsByTagName(c || "*");
            for (d = 0; d < c.length; d++)
                if (h(c[d]) == a) return c[d]
        } else {
            c = b.childNodes;
            for (d = 0; d < c.length; d++) {
                b = g(a, c[d]);
                if (b) return b
            }
        }
        return null
    }

    function h(a) {
        return a.getAttribute ? a.getAttribute("id") : null
    }
    f["default"] = a
}), 66);
__d("ifRequired", [], (function(a, b, c, d, e, f) {
    function a(a, b, c) {
        var e;
        d && d.call(null, [a], function(a) {
            e = a
        });
        if (e && b) return b(e);
        else if (!e && c) return c()
    }
    f["default"] = a
}), 66);
__d("isElementNode", ["isNode"], (function(a, b, c, d, e, f) {
    function a(a) {
        return b("isNode")(a) && a.nodeType == 1
    }
    e.exports = a
}), null);
__d("DOMQuery", ["CSS", "FBLogger", "containsNode", "createArrayFromMixed", "createObjectFrom", "ge", "ifRequired", "isElementNode", "isNode"], (function(a, b, c, d, e, f, g) {
    var h = /^\.-?[_a-zA-Z]+[\w-]*$/;

    function i(a, b) {
        return a.hasAttribute ? a.hasAttribute(b) : a.getAttribute(b) !== null
    }

    function a(a, b) {
        a = j(a, b);
        return a[0]
    }

    function b(a, b, c) {
        b = j(a, b);
        a = j(a, c);
        b.length === 1 && a.length === 1 && b[0] === a[0] ? c = b : c = b.concat(a);
        return c[0]
    }

    function j(a, b) {
        if (!a || !a.getElementsByTagName) return [];
        b = b.split(" ");
        var e = [a];
        for (var f = 0; f < b.length; f++) {
            if (e.length === 0) break;
            if (b[f] === "") continue;
            var g = b[f],
                j = b[f],
                k = [],
                l = !1;
            if (g.charAt(0) == "^")
                if (f === 0) l = !0, g = g.slice(1);
                else return [];
            g = g.replace(/\[(?:[^=\]]*=(?:\"[^\"]*\"|\'[^\']*\'))?|[.#]/g, " $&");
            g = g.split(" ");
            var m = g[0] || "*",
                n = m == "*",
                o = g[1] && g[1].charAt(0) == "#";
            if (o) {
                o = c("ge")(g[1].slice(1), a, m);
                if (o && (n || o.tagName.toLowerCase() == m))
                    for (var p = 0; p < e.length; p++)
                        if (l && c("containsNode")(o, e[p])) {
                            k = [o];
                            break
                        } else if (document == e[p] || c("containsNode")(e[p], o) && e[p] !== o) {
                    k = [o];
                    break
                }
            } else {
                o = [];
                p = e.length;
                var q, r = !l && j.indexOf("[") < 0 && document.querySelectorAll;
                for (var s = 0; s < p; s++) {
                    if (l) {
                        q = [];
                        var t = e[s].parentNode;
                        while (c("isElementNode")(t))(n || t.tagName.toLowerCase() == m) && q.push(t), t = t.parentNode
                    } else r ? h.test(j) ? q = e[s].getElementsByClassName(j.substring(1)) : q = e[s].querySelectorAll(j) : q = e[s].getElementsByTagName(m);
                    t = q.length;
                    for (var u = 0; u < t; u++) o.push(q[u])
                }
                if (!r)
                    for (q = 1; q < g.length; q++) {
                        t = g[q];
                        u = t.charAt(0) == ".";
                        n = t.substring(1);
                        for (s = 0; s < o.length; s++) {
                            p = o[s];
                            if (!p || p.nodeType !== 1) continue;
                            if (u) {
                                d("CSS").hasClass(p, n) || delete o[s];
                                continue
                            } else {
                                j = t.slice(1, t.length - 1);
                                m = j.indexOf("=");
                                if (m < 0) {
                                    if (!i(p, j)) {
                                        delete o[s];
                                        continue
                                    }
                                } else {
                                    r = j.substr(0, m);
                                    j = j.substr(m + 1);
                                    j = j.slice(1, j.length - 1);
                                    if (p.getAttribute(r) != j) {
                                        delete o[s];
                                        continue
                                    }
                                }
                            }
                        }
                    }
                for (s = 0; s < o.length; s++)
                    if (o[s]) {
                        k.push(o[s]);
                        if (l) break
                    }
            }
            e = k
        }
        return e
    }

    function e() {
        var a = window.getSelection;
        if (a) return a() + "";
        else {
            a = document.selection;
            if (a) return a.createRange().text
        }
        return null
    }

    function f(a, b) {
        (typeof a === "string" || typeof b === "string") && c("FBLogger")("dom_query").info("Support for node IDs is deprecated. Use containsNode(ge(<id1>), ge(<id2>)) instead");
        return c("containsNode")(c("ge")(a), c("ge")(b))
    }

    function k() {
        var a = c("ifRequired")("Quickling", function(a) {
            return a.isActive() ? c("ge")("content") : null
        });
        return a || document.body
    }

    function l(a, b) {
        b = c("createArrayFromMixed")(b).join("|").toUpperCase().split("|");
        b = c("createObjectFrom")(b);
        return c("isNode")(a) && a.nodeName in b
    }

    function m(a) {
        return l(a, ["input", "textarea"]) || a.contentEditable === "true"
    }
    g.find = a;
    g.findPushSafe = b;
    g.scry = j;
    g.getSelection = e;
    g.contains = f;
    g.getRootElement = k;
    g.isNodeOfType = l;
    g.isInputNode = m
}), 98);
__d("$InternalEnum", [], (function(a, b, c, d, e, f) {
    "use strict";
    var g = Object.prototype.hasOwnProperty,
        h = typeof WeakMap === "function" ? new WeakMap() : new Map();

    function i(a) {
        var b = h.get(a);
        if (b !== void 0) return b;
        var c = new Map();
        Object.getOwnPropertyNames(a).forEach(function(b) {
            c.set(a[b], b)
        });
        try {
            h.set(a, c)
        } catch (a) {}
        return c
    }
    var j = Object.freeze(Object.defineProperties(Object.create(null), {
        isValid: {
            value: function(a) {
                return i(this).has(a)
            }
        },
        cast: {
            value: function(a) {
                return this.isValid(a) ? a : void 0
            }
        },
        members: {
            value: function() {
                return i(this).keys()
            }
        },
        getName: {
            value: function(a) {
                return i(this).get(a)
            }
        }
    }));

    function a(a) {
        var b = Object.create(j);
        for (var c in a) g.call(a, c) && Object.defineProperty(b, c, {
            value: a[c]
        });
        return Object.freeze(b)
    }
    var k = Object.freeze(Object.defineProperties(Object.create(null), {
        isValid: {
            value: function(a) {
                return typeof a === "string" ? g.call(this, a) : !1
            }
        },
        cast: {
            value: j.cast
        },
        members: {
            value: function() {
                return Object.getOwnPropertyNames(this).values()
            }
        },
        getName: {
            value: function(a) {
                return a
            }
        }
    }));
    a.Mirrored = function(a) {
        var b = Object.create(k);
        for (var c = 0, d = a.length; c < d; ++c) Object.defineProperty(b, a[c], {
            value: a[c]
        });
        return Object.freeze(b)
    };
    Object.freeze(a.Mirrored);
    e.exports = Object.freeze(a)
}), null);
__d("QPLE2ESessionMarkers", ["$InternalEnum"], (function(a, b, c, d, e, f) {
    a = b("$InternalEnum")({
        NONE: "none",
        START: "start",
        END: "end"
    });
    c = a;
    f["default"] = c
}), 66);
__d("objectValues", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        return Object.values(a)
    }
    f["default"] = a
}), 66);
__d("BootloaderEvents", ["Arbiter", "objectValues"], (function(a, b, c, d, e, f, g) {
    var h = "bootloader/bootload",
        i = "hasteResponse/handle",
        j = "bootloader/defer_timeout",
        k = "bootloader/resource_in_longtail_bt_manifest",
        l = new(c("Arbiter"))(),
        m = new Set(),
        n = new Set();

    function o(a, b) {
        return "haste_response_ef:" + a + ":" + ((a = b) != null ? a : "<unknown>")
    }

    function a(a) {
        var b = new Map();
        for (var a = c("objectValues")(a), d = Array.isArray(a), e = 0, a = d ? a : a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
            var f;
            if (d) {
                if (e >= a.length) break;
                f = a[e++]
            } else {
                e = a.next();
                if (e.done) break;
                f = e.value
            }
            f = f;
            for (var f = f, g = Array.isArray(f), h = 0, f = g ? f : f[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var i;
                if (g) {
                    if (h >= f.length) break;
                    i = f[h++]
                } else {
                    h = f.next();
                    if (h.done) break;
                    i = h.value
                }
                i = i;
                var j = i[0];
                i = i[1];
                b.set(j, i)
            }
        }
        return b
    }

    function b() {
        return {
            blocking: new Map(),
            nonblocking: new Map(),
            "default": new Map()
        }
    }

    function d(a) {
        m.add(a)
    }

    function e(a) {
        m["delete"](a), l.inform(h, a, "persistent")
    }

    function f(a, b) {
        n.add(o(a, b))
    }

    function p(a, b, c) {
        l.inform(o(a, b), c, "persistent")
    }

    function q(a) {
        l.inform(j, a, "persistent")
    }

    function r(a) {
        return l.subscribe(h, function(b, c) {
            return a(c)
        })
    }

    function s(a) {
        return l.subscribe(j, function(b, c) {
            return a(c)
        })
    }

    function t() {
        return new Set(m)
    }

    function u(a) {
        l.inform(i, a, "persistent")
    }

    function v(a) {
        return l.subscribe(i, function(b, c) {
            b = o(c.source, c.sourceDetail);
            if (n.has(b)) {
                l.subscribe(b, function(b, d) {
                    return a(babelHelpers["extends"]({}, c, {
                        efData: d
                    }))
                });
                return
            }
            a(c)
        })
    }

    function w(a) {
        return l.subscribe(k, a)
    }
    var x = !1;

    function y() {
        if (x) return;
        x = !0;
        l.inform(k, null, "persistent")
    }
    g.flattenResourceMapSet = a;
    g.newResourceMapSet = b;
    g.notifyBootloadStart = d;
    g.notifyBootload = e;
    g.notifyHasteResponseEFStart = f;
    g.notifyHasteResponseEF = p;
    g.notifyDeferTimeout = q;
    g.onBootload = r;
    g.onDeferTimeout = s;
    g.getActiveBootloads = t;
    g.notifyHasteResponse = u;
    g.onHasteResponse = v;
    g.onResourceInLongTailBTManifest = w;
    g.notifyResourceInLongTailBTManifest = y
}), 98);
__d("performanceAbsoluteNow", ["performance"], (function(a, b, c, d, e, f, g) {
    var h = function() {
        return Date.now()
    };

    function a(a) {
        h = a
    }
    if (c("performance").now && c("performance").timing && c("performance").timing.navigationStart) {
        var i = c("performance").timing.navigationStart;
        b = function() {
            return c("performance").now() + i
        }
    } else b = function() {
        return h()
    };
    b.setFallback = a;
    d = b;
    g["default"] = d
}), 98);
__d("BootloaderEventsManager", ["CallbackDependencyManager", "performanceAbsoluteNow"], (function(a, b, c, d, e, f) {
    var g;
    a = function() {
        "use strict";

        function a() {
            this.$1 = new(b("CallbackDependencyManager"))(), this.$2 = new Map()
        }
        var c = a.prototype;
        c.rsrcDone = function(a) {
            return a
        };
        c.bootload = function(a) {
            return "bl:" + a.join(",")
        };
        c.tierOne = function(a) {
            return "t1:" + a
        };
        c.tierTwoStart = function(a) {
            return "t2s:" + a
        };
        c.tierTwo = function(a) {
            return "t2:" + a
        };
        c.tierThreeStart = function(a) {
            return "t3s:" + a
        };
        c.tierThree = function(a) {
            return "t3:" + a
        };
        c.tierOneLog = function(a) {
            return "t1l:" + a
        };
        c.tierTwoLog = function(a) {
            return "t2l:" + a
        };
        c.tierThreeLog = function(a) {
            return "t3l:" + a
        };
        c.beDone = function(a) {
            return "beDone:" + a
        };
        c.notify = function(a) {
            this.$2.set(a, (g || (g = b("performanceAbsoluteNow")))()), this.$1.satisfyPersistentDependency(a)
        };
        c.getEventTime = function(a) {
            return this.$2.get(a)
        };
        c.registerCallback = function(a, b) {
            this.$1.registerCallback(a, b)
        };
        c.isPersistentDependencySatisfied = function(a) {
            return this.$1.isPersistentDependencySatisfied(a)
        };
        return a
    }();
    e.exports = a
}), null);
__d("BootloaderRetryTracker", ["ErrorGuard", "performanceAbsoluteNow"], (function(a, b, c, d, e, f, g) {
    "use strict";
    b = function() {
        function b(a) {
            this.$2 = [], this.$3 = new Map(), this.$1 = a, this.$4 = this.$1.retries.length > 0
        }
        var d = b.prototype;
        d.getAllRetryAttempts_FOR_DEBUG_ONLY = function() {
            return this.$3
        };
        d.getNumRetriesForSource = function(a) {
            return (a = this.$3.get(a)) != null ? a : 0
        };
        d.maybeScheduleRetry = function(b, d, e) {
            var f = this,
                g = this.getNumRetriesForSource(b);
            if (!this.$5() || g >= this.$1.retries.length) {
                e();
                return
            }
            this.$2.push(c("performanceAbsoluteNow")());
            this.$3.set(b, g + 1);
            a.setTimeout(function() {
                f.$5() ? d() : e()
            }, this.$1.retries[g])
        };
        d.$5 = function() {
            if (!this.$4) return !1;
            var a = this.$2.length;
            if (a < this.$1.abortNum) return !0;
            a = this.$2[a - 1] - this.$2[a - this.$1.abortNum];
            a < this.$1.abortTime && (c("ErrorGuard").applyWithGuard(this.$1.abortCallback, null, []), this.$4 = !1);
            return this.$4
        };
        return b
    }();
    g["default"] = b
}), 98);
__d("BitMap", [], (function(a, b, c, d, e, f) {
    var g = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
    a = function() {
        function a() {
            this.$1 = [], this.$2 = null
        }
        var b = a.prototype;
        b.set = function(a) {
            this.$2 != null && !this.$1[a] && (this.$2 = null);
            this.$1[a] = 1;
            return this
        };
        b.toString = function() {
            var a = [];
            for (var b = 0; b < this.$1.length; b++) a.push(this.$1[b] ? 1 : 0);
            return a.length ? i(a.join("")) : ""
        };
        b.toCompressedString = function() {
            if (this.$1.length === 0) return "";
            if (this.$2 != null) return this.$2;
            var a = [],
                b = 1,
                c = this.$1[0] || 0,
                d = c.toString(2);
            for (var e = 1; e < this.$1.length; e++) {
                var f = this.$1[e] || 0;
                f === c ? b++ : (a.push(h(b)), c = f, b = 1)
            }
            b && a.push(h(b));
            return this.$2 = i(d + a.join(""))
        };
        return a
    }();

    function h(a) {
        a = a.toString(2);
        var b = "0".repeat(a.length - 1);
        return b + a
    }

    function i(a) {
        a = (a + "00000").match(/[01]{6}/g);
        var b = "";
        for (var c = 0; a != null && c < a.length; c++) b += g[parseInt(a[c], 2)];
        return b
    }
    f["default"] = a
}), 66);
__d("CSRBitMap", ["BitMap"], (function(a, b, c, d, e, f, g) {
    var h = new(c("BitMap"))();

    function a(a) {
        h.set(a)
    }

    function b() {
        return h.toCompressedString()
    }
    g.add = a;
    g.toCompressedString = b
}), 98);
__d("CSRIndexUtil", ["invariant"], (function(a, b, c, d, e, f, g, h) {
    b = 0;

    function a(a) {
        a.substr(0, 1) === ":" || h(0, 21456, a);
        return a.substr(1).split(",").map(function(a) {
            return parseInt(a, 10)
        })
    }
    g.UNKNOWN_RESOURCE_INDEX = b;
    g.parseCSRIndexes = a
}), 98);
__d("isFacebookURI", [], (function(a, b, c, d, e, f) {
    var g = null,
        h = ["http", "https"];

    function a(a) {
        g || (g = new RegExp("(^|\\.)facebook\\.com$", "i"));
        if (a.isEmpty() && a.toString() !== "#") return !1;
        return !a.getDomain() && !a.getProtocol() ? !0 : h.indexOf(a.getProtocol()) !== -1 && g.test(a.getDomain())
    }
    a.setRegex = function(a) {
        g = a
    };
    f["default"] = a
}), 66);
__d("isMessengerDotComURI", [], (function(a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)messenger\\.com$", "i"),
        h = ["https"];

    function a(a) {
        if (a.isEmpty() && a.toString() !== "#") return !1;
        return !a.getDomain() && !a.getProtocol() ? !1 : h.indexOf(a.getProtocol()) !== -1 && g.test(a.getDomain())
    }
    f["default"] = a
}), 66);
__d("isWorkDotMetaDotComURI", [], (function(a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)work\\.meta\\.com$", "i"),
        h = ["https"];

    function a(a) {
        if (a.isEmpty() && a.toString() !== "#") return !1;
        return !a.getDomain() && !a.getProtocol() ? !1 : h.indexOf(a.getProtocol()) !== -1 && g.test(a.getDomain())
    }
    f["default"] = a
}), 66);
__d("isWorkplaceDotComURI", [], (function(a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)workplace\\.com$", "i");

    function a(a) {
        return a.getProtocol() === "https" && g.test(a.getDomain())
    }
    f["default"] = a
}), 66);
__d("BlueCompatBroker", ["Env", "URI", "isCometAltpayJsSdkIframeAllowedDomain", "isFacebookURI", "isMessengerDotComURI", "isWorkDotMetaDotComURI", "isWorkplaceDotComURI"], (function(a, b, c, d, e, f) {
    "use strict";
    var g, h, i, j = new Map(),
        k = !1,
        l = function(a) {
            a = new(g || (g = b("URI")))(a);
            return b("isFacebookURI")(a) || b("isWorkplaceDotComURI")(a) || b("isMessengerDotComURI")(a) || b("isWorkDotMetaDotComURI")(a)
        },
        m = {
            dispatch: function(a) {
                var b = m.getMessageEventString(a, "compatAction");
                if (b != null) {
                    b = j.get(b);
                    b && b(a)
                }
            },
            getMessageEventString: function(a, b) {
                a = a.data;
                if (typeof a === "object") {
                    a = a == null ? void 0 : a[b];
                    if (typeof a === "string") return a
                }
                return ""
            },
            init: function(a) {
                a === void 0 && (a = "");
                if (!k) {
                    document.body && (document.body.style.overflow = "auto");
                    var c = b("isCometAltpayJsSdkIframeAllowedDomain")() ? "https://secure.facebook.com/" : document.referrer,
                        d = c.indexOf("/", 8);
                    c = c.substring(0, d);
                    if (l(c)) {
                        d = new MessageChannel();
                        a = a !== "" ? a : (h || (h = b("Env"))).iframeKey;
                        i = d.port1;
                        i.onmessage = m.dispatch;
                        window.parent.postMessage({
                            compatAction: "CompatSetup",
                            iframeKey: a
                        }, c + "/", [d.port2])
                    }
                    try {
                        window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__
                    } catch (a) {}
                    k = !0
                }
            },
            register: function(a, b) {
                j.set(a, b)
            },
            clear: function(a) {
                j["delete"](a)
            },
            sendMessage: function(a) {
                k || m.init(), i && i.postMessage(babelHelpers["extends"]({}, a))
            }
        };
    e.exports = m
}), null);
__d("MessengerEnvironment", ["CurrentEnvironment"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = babelHelpers["extends"]({}, c("CurrentEnvironment"), {
        messengerui: !1,
        roomschatui: !1,
        setMessengerUI: function(a) {
            h.messengerui = a
        },
        setRoomsChatUI: function(a) {
            h.roomschatui = a
        }
    });
    a = h;
    g["default"] = a
}), 98);
__d("areEqual", [], (function(a, b, c, d, e, f) {
    var g = [],
        h = [];

    function a(a, b) {
        var c = g.length ? g.pop() : [],
            d = h.length ? h.pop() : [];
        a = i(a, b, c, d);
        c.length = 0;
        d.length = 0;
        g.push(c);
        h.push(d);
        return a
    }

    function i(a, b, c, d) {
        if (a === b) return a !== 0 || 1 / a == 1 / b;
        if (a == null || b == null) return !1;
        if (typeof a !== "object" || typeof b !== "object") return !1;
        var e = Object.prototype.toString,
            f = e.call(a);
        if (f != e.call(b)) return !1;
        switch (f) {
            case "[object String]":
                return a == String(b);
            case "[object Number]":
                return isNaN(a) || isNaN(b) ? !1 : a == Number(b);
            case "[object Date]":
            case "[object Boolean]":
                return +a == +b;
            case "[object RegExp]":
                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase
        }
        e = c.length;
        while (e--)
            if (c[e] == a) return d[e] == b;
        c.push(a);
        d.push(b);
        try {
            e = 0;
            if (f === "[object Array]") {
                e = a.length;
                if (e !== b.length) return !1;
                while (e--)
                    if (!i(a[e], b[e], c, d)) return !1
            } else if (a instanceof Set) {
                if (a.size !== b.size) return !1;
                f = Array.from(b.values());
                for (var e = a, g = Array.isArray(e), h = 0, e = g ? e : e[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                    var j;
                    if (g) {
                        if (h >= e.length) break;
                        j = e[h++]
                    } else {
                        h = e.next();
                        if (h.done) break;
                        j = h.value
                    }
                    j = j;
                    var k = !1;
                    for (var l = 0; l < f.length; l++) {
                        var m = f[l];
                        if (i(j, m, c, d)) {
                            k = !0;
                            f.splice(l, 1);
                            break
                        }
                    }
                    if (k === !1) return !1
                }
                return !0
            } else if (a instanceof Map) {
                if (a.size !== b.size) return !1;
                m = Array.from(b);
                for (j = a, l = Array.isArray(j), k = 0, j = l ? j : j[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                    if (l) {
                        if (k >= j.length) break;
                        h = j[k++]
                    } else {
                        k = j.next();
                        if (k.done) break;
                        h = k.value
                    }
                    g = h;
                    e = !1;
                    for (f = 0; f < m.length; f++) {
                        h = m[f];
                        if (i(g, h, c, d)) {
                            e = !0;
                            m.splice(f, 1);
                            break
                        }
                    }
                    if (e === !1) return !1
                }
                return !0
            } else {
                if (a.constructor !== b.constructor) return !1;
                if (Object.prototype.hasOwnProperty.call(a, "valueOf") && Object.prototype.hasOwnProperty.call(b, "valueOf")) return a.valueOf() == b.valueOf();
                h = Object.keys(a);
                if (h.length != Object.keys(b).length) return !1;
                for (f = 0; f < h.length; f++) {
                    if (h[f] === "_owner") continue;
                    if (!Object.prototype.hasOwnProperty.call(b, h[f]) || !i(a[h[f]], b[h[f]], c, d)) return !1
                }
            }
            return !0
        } finally {
            c.pop(), d.pop()
        }
    }
    f["default"] = a
}), 66);
__d("SimpleHook", [], (function(a, b, c, d, e, f) {
    "use strict";
    a = function() {
        function a() {
            this.__callbacks = [], this.call = this.$2
        }
        var b = a.prototype;
        b.hasCallback = function(a) {
            var b = this.__callbacks;
            return b.length > 0 && (a == null || b.some(function(b) {
                return b === a || b.$1 === a
            }))
        };
        b.add = function(a, b) {
            var c = this,
                d;
            if ((b == null ? void 0 : b.once) === !0) {
                b = function() {
                    c.remove(d), a.apply(null, arguments)
                };
                b.$1 = a;
                d = b
            } else d = a;
            this.__callbacks.push(d);
            return d
        };
        b.removeLast = function() {
            return this.__callbacks.pop()
        };
        b.remove = function(a) {
            return this.removeIf(function(b) {
                return b === a
            })
        };
        b.removeIf = function(a) {
            var b = this.__callbacks;
            this.__callbacks = b.filter(function(b) {
                return !a(b)
            });
            return b.length > this.__callbacks.length
        };
        b.clear = function() {
            this.__callbacks = []
        };
        b.$2 = function() {
            var a = this.__callbacks;
            for (var b = 0, c = a.length; b < c; ++b) {
                var d = a[b];
                d.apply(null, arguments)
            }
        };
        return a
    }();
    f.SimpleHook = a
}), 66);
__d("BanzaiLazyQueue", ["SimpleHook"], (function(a, b, c, d, e, f, g) {
    var h = [],
        i = new(d("SimpleHook").SimpleHook)();
    a = {
        onQueue: i,
        queuePost: function(a, b, c) {
            h.push([a, b, c]), i.call(a, b, c)
        },
        flushQueue: function() {
            var a = h;
            h = [];
            return a
        }
    };
    f.exports = a
}), 34);
__d("ExecutionEnvironment", [], (function(a, b, c, d, e, f) {
    "use strict";
    b = !!(a !== void 0 && a.document && a.document.createElement);
    c = typeof WorkerGlobalScope === "function";
    d = {
        canUseDOM: b,
        canUseEventListeners: b && !!(a.addEventListener || a.attachEvent),
        canUseViewport: b && !!window.screen,
        canUseWorkers: typeof Worker !== "undefined",
        isInBrowser: b || c,
        isInWorker: c
    };
    e = d;
    f["default"] = e
}), 66);
__d("gkx", ["invariant", "BanzaiLazyQueue", "ExecutionEnvironment", "emptyFunction"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = {},
        j = {};

    function k(a) {
        var b = i[a];
        b != null || h(0, 11797, a);
        j[a] || (j[a] = !0, (c("ExecutionEnvironment").canUseDOM || c("ExecutionEnvironment").isInWorker) && d("BanzaiLazyQueue").queuePost("gk2_exposure", {
            identifier: a,
            hash: b.hash
        }));
        return b.result
    }
    k.add = function(a, b) {
        for (var c in a) b && b.entry++, !(c in i) ? i[c] = a[c] : b && b.dup_entry++
    };
    k.addLoggedInternal = function(a) {
        k.add(a);
        for (a in a) j[a] = !0
    };
    a = c("emptyFunction");
    k.getGKs = function() {
        return null
    };
    k.getLogged = function() {
        return Object.keys(j).map(function(a) {
            return {
                identifier: a,
                hash: i[a].hash
            }
        })
    };
    k.setPass = a;
    k.setFail = a;
    k.clear = a;
    b = k;
    g["default"] = b
}), 98);
__d("isCdnURI", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        if (a.getProtocol() !== "http" && a.getProtocol() !== "https") return !1;
        var b = Number(a.getPort());
        if (!!b && b !== 80 && b !== 443) return !1;
        return a.isSubdomainOfDomain("fbcdn.net") ? !0 : !1
    }
    f["default"] = a
}), 66);
__d("BlueCompatRouter", ["BlueCompatBroker", "Env", "MessengerEnvironment", "URI", "areEqual", "gkx", "isCdnURI"], (function(a, b, c, d, e, f, g) {
    "use strict";
    b = function(b, c) {
        var d, e = a.__fbNativeClearTimeout || window.clearTimeout,
            f = a.__fbNativeSetTimeout || window.setTimeout;
        return function() {
            var a = this,
                g = arguments,
                h = function() {
                    d = null, b.apply(a, g)
                };
            e(d);
            d = f(h, c)
        }
    };
    var h = {
            convertUri: function(a) {
                if (a == null || a === "") return new(c("URI"))();
                a = new(c("URI"))(a);
                if (a.getDomain().endsWith("messenger.com")) return a.setDomain(a.getDomain().replace(/messenger\.com/i, "facebook.com")).setPath("/messages" + a.getPath());
                else return a
            },
            goFragment: function(a) {
                if (c("Env").isCQuick) {
                    a = h.convertUri(a);
                    if (a.getFragment()) {
                        var b = c("URI").getRequestURI(!1, !1);
                        if (c("areEqual")(new(c("URI"))(b).setFragment("").getQualifiedURI(), new(c("URI"))(a).setFragment("").getQualifiedURI())) return !0
                    }
                }
                return !1
            },
            go: function(a, b) {
                if (c("Env").isCQuick) {
                    var d = new(c("URI"))(a);
                    a = h.convertUri(a);
                    var e = a.getQualifiedURI();
                    if (c("isCdnURI")(a) || e.getPath().startsWith("/compat")) return !1;
                    a = function() {
                        if (c("MessengerEnvironment").messengerui && e.getPath().startsWith("/messages")) return [!1, "/messages"];
                        if (d.getPath().startsWith("/settings") && e.getPath().startsWith("/settings") && (c("gkx")("1224637") || e.getSubdomain() !== d.getSubdomain())) {
                            var a = e.getQueryData().tab;
                            return a != null ? [!1, "/settings/" + a] : [!1, "/settings"]
                        }
                        if (d.getPath().startsWith("/games") && e.getPath().startsWith("/games")) return [!1, "/games/web"];
                        if (d.getPath().startsWith("/notes") && e.getPath().startsWith("/notes")) return [!1, "/notes"];
                        if (d.getPath().startsWith("/latest/posts") && e.getPath().startsWith("/latest/posts")) return [!1, "/business"];
                        if (/\/[A-Za-z\-0-9]+\/settings/.test(d.getPath())) return [!1, "/pages/settings"];
                        return /\/[A-Za-z\-0-9]+\/insights/.test(d.getPath()) ? [!1, "/insights"] : [!0, ""]
                    }();
                    var f = a[0];
                    a = a[1];
                    i({
                        compatAction: "route",
                        maintainKey: a,
                        replace: b,
                        uri: String(e)
                    });
                    return f
                }
                return !1
            },
            startChat: function(a, b) {
                return h.sendMessage({
                    compatAction: "startchat",
                    tabId: a,
                    isPage: b
                })
            },
            chatListener: function(a, b, c) {
                a.addEventListener("click", function(a) {
                    a.preventDefault(), h.startChat(b, c)
                })
            },
            sendMessage: function(a) {
                if (c("Env").isCQuick) {
                    c("BlueCompatBroker").init();
                    c("BlueCompatBroker").sendMessage(a);
                    return !0
                }
                return !1
            }
        },
        i = b(h.sendMessage, 250);
    d = h;
    g["default"] = d
}), 98);
__d("BaseDeserializePHPQueryData", [], (function(a, b, c, d, e, f) {
    "use strict";
    var g = /^([-_\w]+)((?:\[[-_\w]*\])+)=?(.*)/;

    function h(a) {
        return a === "hasOwnProperty" || a === "__proto__" ? "\ud83d\udf56" : a
    }

    function a(a, b) {
        if (a == null || a === "") return {};
        var c = {};
        a = a.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
        a = a.split("&");
        var d = Object.prototype.hasOwnProperty;
        for (var e = 0, f = a.length; e < f; e++) {
            var i = a[e].match(g);
            if (!i) {
                var j = a[e].indexOf("=");
                if (j === -1) c[b(a[e])] = null;
                else {
                    var k = a[e].substring(0, j);
                    j = a[e].substring(j + 1);
                    c[b(k)] = b(j)
                }
            } else {
                k = i[2].split(/\]\[|\[|\]/).slice(0, -1);
                j = i[1];
                i = b(i[3] || "");
                k[0] = j;
                j = c;
                for (var l = 0; l < k.length - 1; l++) {
                    var m = h(k[l]);
                    if (m) {
                        if (!d.call(j, m)) {
                            var n = k[l + 1] && !k[l + 1].match(/^\d{1,3}$/) ? {} : [];
                            j[m] = n;
                            if (j[m] !== n) return c
                        }
                        j = j[m]
                    } else k[l + 1] && !k[l + 1].match(/^\d{1,3}$/) ? j.push({}) : j.push([]), j = j[j.length - 1]
                }
                j instanceof Array && k[k.length - 1] === "" ? j.push(i) : j[h(k[k.length - 1])] = i
            }
        }
        return c
    }
    f.deserialize = a
}), 66);
__d("flattenPHPQueryData", ["invariant"], (function(a, b, c, d, e, f, g, h) {
    function a(a) {
        return i(a, "", {})
    }

    function i(a, b, c) {
        if (a == null) c[b] = void 0;
        else if (typeof a === "object") {
            typeof a.appendChild !== "function" || h(0, 2616);
            for (var d in a) d !== "$$typeof" && Object.prototype.hasOwnProperty.call(a, d) && a[d] !== void 0 && i(a[d], b ? b + "[" + d + "]" : d, c)
        } else c[b] = a;
        return c
    }
    g["default"] = a
}), 98);
__d("PHPQuerySerializer", ["BaseDeserializePHPQueryData", "flattenPHPQueryData"], (function(a, b, c, d, e, f, g) {
    function a(a) {
        var b = [];
        a = c("flattenPHPQueryData")(a);
        for (var d in a)
            if (Object.prototype.hasOwnProperty.call(a, d)) {
                var e = h(d);
                a[d] === void 0 ? b.push(e) : b.push(e + "=" + h(String(a[d])))
            }
        return b.join("&")
    }

    function h(a) {
        return encodeURIComponent(a).replace(/%5D/g, "]").replace(/%5B/g, "[")
    }

    function b(a) {
        return d("BaseDeserializePHPQueryData").deserialize(a, i)
    }

    function i(a) {
        try {
            return decodeURIComponent(a.replace(/\+/g, " "))
        } catch (b) {
            return a
        }
    }
    e = {
        decodeComponent: i,
        deserialize: b,
        encodeComponent: h,
        serialize: a
    };
    f.exports = e
}), 34);
__d("PHPQuerySerializerNoEncoding", ["BaseDeserializePHPQueryData", "flattenPHPQueryData"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a) {
        var b = [];
        a = c("flattenPHPQueryData")(a);
        for (var d in a)
            if (Object.prototype.hasOwnProperty.call(a, d)) {
                var e = h(d);
                a[d] === void 0 ? b.push(e) : b.push(e + "=" + h(String(a[d])))
            }
        return b.join("&")
    }

    function h(a) {
        return a
    }

    function b(a) {
        return d("BaseDeserializePHPQueryData").deserialize(a, i)
    }

    function i(a) {
        return a
    }
    e = {
        decodeComponent: i,
        deserialize: b,
        encodeComponent: h,
        serialize: a
    };
    f = e;
    g["default"] = f
}), 98);
__d("PHPStrictQuerySerializer", ["PHPQuerySerializer", "flattenPHPQueryData"], (function(a, b, c, d, e, f, g) {
    function a(a) {
        var b = [];
        a = c("flattenPHPQueryData")(a);
        for (var d in a)
            if (Object.prototype.hasOwnProperty.call(a, d)) {
                var e = h(d);
                a[d] === void 0 ? b.push(e) : b.push(e + "=" + h(String(a[d])))
            }
        return b.join("&")
    }

    function h(a) {
        return encodeURIComponent(a)
    }
    g.serialize = a;
    g.encodeComponent = h;
    g.deserialize = d("PHPQuerySerializer").deserialize;
    g.decodeComponent = d("PHPQuerySerializer").decodeComponent
}), 98);
__d("URIRFC3986", [], (function(a, b, c, d, e, f) {
    var g = new RegExp("^([^:/?#]+:)?(//([^\\\\/?#@]*@)?(\\[[A-Fa-f0-9:.]+\\]|[^\\/?#:]*)(:[0-9]*)?)?([^?#]*)(\\?[^#]*)?(#.*)?");

    function a(a) {
        if (a.trim() === "") return null;
        a = a.match(g);
        if (a == null) return null;
        var b = a[2] ? a[2].substr(2) : null,
            c = a[1] ? a[1].substr(0, a[1].length - 1) : null;
        a = {
            uri: a[0] ? a[0] : null,
            scheme: c,
            authority: b,
            userinfo: a[3] ? a[3].substr(0, a[3].length - 1) : null,
            host: a[2] ? a[4] : null,
            port: a[5] ? a[5].substr(1) ? parseInt(a[5].substr(1), 10) : null : null,
            path: a[6] ? a[6] : null,
            query: a[7] ? a[7].substr(1) : null,
            fragment: a[8] ? a[8].substr(1) : null,
            isGenericURI: b === null && !!c
        };
        return a
    }
    f.parse = a
}), 66);
__d("URISchemes", ["createObjectFrom"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = c("createObjectFrom")(["about", "accountscenter", "aidemos", "aistudio", "apk", "blob", "cmms", "fb", "fba", "fbatwork", "fb-ama", "fb-internal", "fb-workchat", "fb-workchat-secure", "fb-messenger", "fb-messenger-public", "fb-messenger-group-thread", "fb-page-messages", "fb-pma", "fbcf", "fbconnect", "fbinternal", "fbmobilehome", "fbrpc", "file", "flipper", "ftp", "gtalk", "http", "https", "mailto", "wss", "ms-app", "intent", "itms", "itms-apps", "itms-services", "lasso", "market", "svn+ssh", "fbstaging", "tel", "sms", "pebblejs", "sftp", "whatsapp", "moments", "flash", "fblite", "chrome-extension", "webcal", "instagram", "iglite", "fb124024574287414", "fb124024574287414rc", "fb124024574287414master", "fb1576585912599779", "fb929757330408142", "designpack", "fbpixelcloud", "fbapi20130214", "fb1196383223757595", "tbauth", "oculus", "oculus.store", "oculus.feed", "oculusstore", "socialplatform", "odh", "com.oculus.rd", "aria", "skype", "ms-windows-store", "callto", "messenger", "workchat", "fb236786383180508", "fb1775440806014337", "data", "fb-mk", "munki", "origami-file", "fb-nimble-vrsrecorder", "fb-nimble-monohandtrackingvis", "together", "togetherbl", "horizonlauncher", "venues", "whatsapp-consumer", "whatsapp-smb", "fb-ide-opener", "fb-vscode", "fb-vscode-insiders", "editor", "spark-studio", "spark-simulator", "arstudio", "manifold", "origami-internal", "origami-public", "stella", "mwa", "mattermost", "logaggregator", "workrooms", "pcoip", "cinema", "home", "oculus360photos", "systemux"]);

    function a(a) {
        return a == null || a === "" ? !0 : Object.prototype.hasOwnProperty.call(h, a.toLowerCase())
    }
    g.isAllowed = a
}), 98);
__d("isSameOrigin", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a, b) {
        return !a.getProtocol() || !a.getDomain() || !b.getProtocol() || !b.getDomain() ? !1 : a.getOrigin() === b.getOrigin()
    }
    f["default"] = a
}), 66);
__d("setHostSubdomain", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a, b) {
        a = a.split(".");
        a.length < 3 ? a.unshift(b) : a[0] = b;
        return a.join(".")
    }
    f["default"] = a
}), 66);
__d("URIAbstractBase", ["invariant", "FBLogger", "PHPStrictQuerySerializer", "URIRFC3986", "URISchemes", "isSameOrigin", "setHostSubdomain"], (function(a, b, c, d, e, f, g) {
    var h, i, j = new RegExp("[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]"),
        k = new RegExp("^(?:[^/]*:|[\\x00-\\x1f]*/[\\x00-\\x1f]*/)"),
        l = [];
    a = function() {
        "use strict";
        a.parse = function(c, d, e, f) {
            if (!d) return !0;
            if (d instanceof a) {
                c.setProtocol(d.getProtocol());
                c.setDomain(d.getDomain());
                c.setPort(d.getPort());
                c.setPath(d.getPath());
                c.setQueryData(f.deserialize(f.serialize(d.getQueryData())));
                c.setFragment(d.getFragment());
                c.setIsGeneric(d.getIsGeneric());
                c.setForceFragmentSeparator(d.getForceFragmentSeparator());
                c.setOriginalRawQuery(d.getOriginalRawQuery());
                c.setQueryParamModified(!1);
                return !0
            }
            d = d.toString().trim();
            var g = (h || (h = b("URIRFC3986"))).parse(d) || {
                fragment: null,
                scheme: null,
                query: null
            };
            if (!e && !(i || (i = b("URISchemes"))).isAllowed(g.scheme)) return !1;
            c.setProtocol(g.scheme || "");
            if (!e && j.test(g.host || "")) return !1;
            c.setDomain(g.host || "");
            c.setPort(g.port || "");
            c.setPath(g.path || "");
            if (e) c.setQueryData(f.deserialize(g.query || "") || {});
            else try {
                c.setQueryData(f.deserialize(g.query || "") || {})
            } catch (a) {
                return !1
            }
            c.setFragment(g.fragment || "");
            g.fragment === "" && c.setForceFragmentSeparator(!0);
            c.setIsGeneric(g.isGenericURI || !1);
            c.setOriginalRawQuery(g.query);
            c.setQueryParamModified(!1);
            if (g.userinfo !== null) {
                if (e) throw new Error("URI.parse: invalid URI (userinfo is not allowed in a URI): " + d);
                return !1
            }
            if (!c.getDomain() && c.getPath().indexOf("\\") !== -1) {
                if (e) throw new Error("URI.parse: invalid URI (no domain but multiple back-slashes): " + d);
                return !1
            }
            if (!c.getProtocol() && k.test(d)) {
                if (e) throw new Error("URI.parse: invalid URI (unsafe protocol-relative URLs): " + d + "'");
                return !1
            }
            if (c.getDomain() && c.getPath() && !c.getPath().startsWith("/")) {
                if (e) throw new Error("URI.parse: invalid URI (domain and path where path lacks leading slash): " + d);
                return !1
            }
            c.getProtocol() && !c.getIsGeneric() && !c.getDomain() && c.getPath() !== "" && b("FBLogger")("uri").warn('URI.parse: invalid URI (protocol "' + c.getProtocol() + '" with no domain)');
            return !0
        };
        a.tryParse = function(b, c) {
            var d = new a(null, c);
            return a.parse(d, b, !1, c) ? d : null
        };
        a.isValid = function(b, c) {
            return !!a.tryParse(b, c)
        };

        function a(b, c) {
            c || g(0, 2966), this.$9 = c, this.$7 = "", this.$1 = "", this.$6 = "", this.$5 = "", this.$3 = "", this.$4 = !1, this.$8 = {}, this.$2 = !1, a.parse(this, b, !0, c), this.$11 = !1
        }
        var c = a.prototype;
        c.setProtocol = function(a) {
            (i || (i = b("URISchemes"))).isAllowed(a) || g(0, 11793, a);
            this.$7 = a;
            return this
        };
        c.getProtocol = function() {
            return (this.$7 || "").toLowerCase()
        };
        c.setSecure = function(a) {
            return this.setProtocol(a ? "https" : "http")
        };
        c.isSecure = function() {
            return this.getProtocol() === "https"
        };
        c.setDomain = function(a) {
            if (j.test(a)) throw new Error("URI.setDomain: unsafe domain specified: " + a + " for url " + this.toString());
            this.$1 = a;
            return this
        };
        c.getDomain = function() {
            return this.$1
        };
        c.setPort = function(a) {
            this.$6 = a;
            return this
        };
        c.getPort = function() {
            return this.$6
        };
        c.setPath = function(a) {
            this.$5 = a;
            return this
        };
        c.getPath = function() {
            return this.$5
        };
        c.addQueryData = function(a, b) {
            Object.prototype.toString.call(a) === "[object Object]" ? Object.assign(this.$8, a) : this.$8[a] = b;
            this.$11 = !0;
            return this
        };
        c.setQueryData = function(a) {
            this.$8 = a;
            this.$11 = !0;
            return this
        };
        c.getQueryData = function() {
            return this.$8
        };
        c.setQueryString = function(a) {
            return this.setQueryData(this.$9.deserialize(a))
        };
        c.getQueryString = function(a, b, c) {
            a === void 0 && (a = !1);
            b === void 0 && (b = function() {
                return !1
            });
            c === void 0 && (c = null);
            return this.$12(!1, a, b, c)
        };
        c.$12 = function(a, b, c, d) {
            a === void 0 && (a = !1);
            b === void 0 && (b = !1);
            c === void 0 && (c = function() {
                return !1
            });
            d === void 0 && (d = null);
            if (!this.$11 && (b || c(this.getDomain()))) {
                return (b = this.$10) != null ? b : ""
            }
            return (a && d ? d : this.$9).serialize(this.getQueryData())
        };
        c.removeQueryData = function(a) {
            Array.isArray(a) || (a = [a]);
            for (var b = 0, c = a.length; b < c; ++b) delete this.$8[a[b]];
            this.$11 = !0;
            return this
        };
        c.setFragment = function(a) {
            this.$3 = a;
            this.setForceFragmentSeparator(!1);
            return this
        };
        c.getFragment = function() {
            return this.$3
        };
        c.setForceFragmentSeparator = function(a) {
            this.$2 = a;
            return this
        };
        c.getForceFragmentSeparator = function() {
            return this.$2
        };
        c.setIsGeneric = function(a) {
            this.$4 = a;
            return this
        };
        c.getIsGeneric = function() {
            return this.$4
        };
        c.getOriginalRawQuery = function() {
            return this.$10
        };
        c.setOriginalRawQuery = function(a) {
            this.$10 = a;
            return this
        };
        c.setQueryParamModified = function(a) {
            this.$11 = a;
            return this
        };
        c.isEmpty = function() {
            return !(this.getPath() || this.getProtocol() || this.getDomain() || this.getPort() || Object.keys(this.getQueryData()).length > 0 || this.getFragment())
        };
        c.toString = function(a, b) {
            a === void 0 && (a = function() {
                return !1
            });
            b === void 0 && (b = null);
            return this.$13(!1, !1, a, b)
        };
        c.toStringRawQuery = function(a, b) {
            a === void 0 && (a = function() {
                return !1
            });
            b === void 0 && (b = null);
            return this.$13(!0, !1, a, b)
        };
        c.toStringPreserveQuery = function(a, b) {
            a === void 0 && (a = function() {
                return !1
            });
            b === void 0 && (b = null);
            return this.$13(!1, !0, a, b)
        };
        c.toStringStrictQueryEncoding = function(a) {
            a === void 0 && (a = function() {
                return !1
            });
            return this.$13(!0, !1, a, b("PHPStrictQuerySerializer"))
        };
        c.$13 = function(a, b, c, d) {
            a === void 0 && (a = !1);
            b === void 0 && (b = !1);
            c === void 0 && (c = function() {
                return !1
            });
            d === void 0 && (d = null);
            var e = this;
            for (var f = 0; f < l.length; f++) e = l[f](e);
            return e.$14(a, b, c, d)
        };
        c.$14 = function(a, b, c, d) {
            a === void 0 && (a = !1);
            b === void 0 && (b = !1);
            c === void 0 && (c = function() {
                return !1
            });
            d === void 0 && (d = null);
            var e = "",
                f = this.getProtocol();
            f && (e += f + ":" + (this.getIsGeneric() ? "" : "//"));
            f = this.getDomain();
            f && (e += f);
            f = this.getPort();
            f && (e += ":" + f);
            f = this.getPath();
            f ? e += f : e && (e += "/");
            f = this.$12(a, b, c, d);
            f && (e += "?" + f);
            a = this.getFragment();
            a ? e += "#" + a : this.getForceFragmentSeparator() && (e += "#");
            return e
        };
        a.registerFilter = function(a) {
            l.push(a)
        };
        c.getOrigin = function() {
            var a = this.getPort();
            return this.getProtocol() + "://" + this.getDomain() + (a ? ":" + a : "")
        };
        c.isSameOrigin = function(a) {
            return b("isSameOrigin")(this, a)
        };
        c.getQualifiedURIBase = function() {
            return new a(this, this.$9).qualify()
        };
        c.qualify = function() {
            if (!this.getDomain()) {
                var b = new a(window.location.href, this.$9);
                this.setProtocol(b.getProtocol()).setDomain(b.getDomain()).setPort(b.getPort())
            }
            return this
        };
        c.setSubdomain = function(a) {
            var c = this.qualify();
            c = c.getDomain();
            return this.setDomain(b("setHostSubdomain")(c, a))
        };
        c.getSubdomain = function() {
            if (!this.getDomain()) return "";
            var a = this.getDomain().split(".");
            if (a.length <= 2) return "";
            else return a[0]
        };
        c.isSubdomainOfDomain = function(b) {
            var c = this.getDomain();
            return a.isDomainSubdomainOfDomain(c, b, this.$9)
        };
        a.isDomainSubdomainOfDomain = function(b, c, d) {
            if (c === "" || b === "") return !1;
            if (b.endsWith(c)) {
                var e = b.length,
                    f = c.length,
                    g = e - f - 1;
                if (e === f || b[g] === ".") {
                    e = new a(null, d);
                    e.setDomain(c);
                    return a.isValid(e, d)
                }
            }
            return !1
        };
        return a
    }();
    e.exports = a
}), null);
__d("err", ["fb-error"], (function(a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = c("fb-error").err
}), 98);
__d("URIBase", ["ExecutionEnvironment", "PHPQuerySerializerNoEncoding", "URIAbstractBase", "UriNeedRawQuerySVChecker", "err"], (function(a, b, c, d, e, f, g) {
    function h(a, b, d, e) {
        try {
            return c("URIAbstractBase").parse(a, b, d, e)
        } catch (a) {
            throw new Error(c("err")(a.message))
        }
    }
    a = function(a) {
        babelHelpers.inheritsLoose(b, a);
        b.tryParse = function(a, c) {
            var d = new b(null, c);
            return h(d, a, !1, c) ? d : null
        };
        b.isValid = function(a, c) {
            return !!b.tryParse(a, c)
        };

        function b(b, c) {
            var d;
            d = a.call(this, b, c) || this;
            d.$URIBase1 = c;
            h(babelHelpers.assertThisInitialized(d), b, !0, c);
            return d
        }
        var d = b.prototype;
        d.setDomain = function(b) {
            try {
                a.prototype.setDomain.call(this, b)
            } catch (a) {
                throw new Error(c("err")(a.message))
            }
            return this
        };
        d.getQualifiedURIBase = function() {
            return new b(this, this.$URIBase1).qualify()
        };
        d.qualify = function() {
            if (!this.getDomain()) {
                var a = (typeof window !== "undefined" ? window : self).location.href;
                c("ExecutionEnvironment").isInWorker && a && a.startsWith("blob:") && (a = a.substring(5, a.length));
                a = new b(a, this.$URIBase1);
                this.setProtocol(a.getProtocol()).setDomain(a.getDomain()).setPort(a.getPort())
            }
            return this
        };
        d.isSubdomainOfDomain = function(a) {
            var c = this.getDomain();
            return b.isDomainSubdomainOfDomain(c, a, this.$URIBase1)
        };
        b.isDomainSubdomainOfDomain = function(a, c, d) {
            if (c === "" || a === "") return !1;
            if (a.endsWith(c)) {
                var e = a.length,
                    f = c.length,
                    g = e - f - 1;
                if (e === f || a[g] === ".") {
                    e = new b(null, d);
                    e.setDomain(c);
                    return b.isValid(e, d)
                }
            }
            return !1
        };
        d.toString = function() {
            return a.prototype.toString.call(this, c("UriNeedRawQuerySVChecker").isDomainNeedRawQuery, c("PHPQuerySerializerNoEncoding"))
        };
        d.toStringRawQuery = function() {
            return a.prototype.toStringRawQuery.call(this, c("UriNeedRawQuerySVChecker").isDomainNeedRawQuery, c("PHPQuerySerializerNoEncoding"))
        };
        d.toStringPreserveQuery = function() {
            return a.prototype.toStringPreserveQuery.call(this, c("UriNeedRawQuerySVChecker").isDomainNeedRawQuery, c("PHPQuerySerializerNoEncoding"))
        };
        d.toStringStrictQueryEncoding = function() {
            return a.prototype.toStringStrictQueryEncoding.call(this, c("UriNeedRawQuerySVChecker").isDomainNeedRawQuery)
        };
        d.getQueryString = function(b) {
            b === void 0 && (b = !1);
            return a.prototype.getQueryString.call(this, b, c("UriNeedRawQuerySVChecker").isDomainNeedRawQuery, c("PHPQuerySerializerNoEncoding"))
        };
        return b
    }(c("URIAbstractBase"));
    g["default"] = a
}), 98);
__d("UriNeedRawQuerySVChecker", ["PHPQuerySerializer", "URIBase", "UriNeedRawQuerySVConfig"], (function(a, b, c, d, e, f) {
    "use strict";
    var g, h, i = ["http", "https"];

    function a(a) {
        if (a == null) return !1;
        a = a instanceof(g || (g = b("URIBase"))) ? a : (g || (g = b("URIBase"))).tryParse(a, h || (h = b("PHPQuerySerializer")));
        if (a == null) return !1;
        var c = a.getProtocol();
        return !i.includes(c) ? !1 : j(a.getDomain())
    }

    function j(a) {
        return a != null && b("UriNeedRawQuerySVConfig").uris.some(function(c) {
            return (g || (g = b("URIBase"))).isDomainSubdomainOfDomain(a, c, h || (h = b("PHPQuerySerializer")))
        })
    }
    e.exports = {
        isUriNeedRawQuery: a,
        isDomainNeedRawQuery: j
    }
}), null);
__d("memoize", ["invariant"], (function(a, b, c, d, e, f, g, h) {
    function a(a) {
        var b = a,
            c;
        return function() {
            arguments.length && h(0, 4494);
            b && (c = b(), b = null);
            return c
        }
    }
    g["default"] = a
}), 98);
__d("memoizeStringOnly", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        var b = {};
        return function(c) {
            Object.prototype.hasOwnProperty.call(b, c) || (b[c] = a.call(this, c));
            return b[c]
        }
    }
    f["default"] = a
}), 66);
__d("unexpectedUseInComet", ["FBLogger", "gkx"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a) {
        if (!c("gkx")("708253")) return;
        a = a + " called unexpectedly. This is not supported in Comet!";
        var b = c("FBLogger")("comet_infra").blameToPreviousFrame().blameToPreviousFrame();
        b.mustfix(a)
    }
    g["default"] = a
}), 98);
__d("unqualifyURI", [], (function(a, b, c, d, e, f) {
    function a(a) {
        return a.setProtocol("").setDomain("").setPort("")
    }
    f["default"] = a
}), 66);
__d("URI", ["Env", "FBLogger", "PHPQuerySerializer", "PHPQuerySerializerNoEncoding", "ReloadPage", "URIBase", "UriNeedRawQuerySVChecker", "ifRequired", "isFacebookURI", "memoize", "memoizeStringOnly", "unexpectedUseInComet", "unqualifyURI"], (function(a, b, c, d, e, f, g) {
    var h = c("memoize")(function() {
        return new j(window.location.href)
    });

    function i() {
        return c("ifRequired")("PageTransitions", function(a) {
            if (a.isInitialized()) return a
        })
    }
    var j = function(e) {
        babelHelpers.inheritsLoose(b, e);

        function b(a) {
            var b;
            d("UriNeedRawQuerySVChecker").isUriNeedRawQuery(a) ? b = e.call(this, a, c("PHPQuerySerializerNoEncoding")) || this : b = e.call(this, a || "", d("PHPQuerySerializer")) || this;
            return babelHelpers.assertThisInitialized(b)
        }
        var f = b.prototype;
        f.setPath = function(a) {
            this.path = a;
            return e.prototype.setPath.call(this, a)
        };
        f.getPath = function() {
            var a = e.prototype.getPath.call(this);
            return a ? a.replace(/^\/+/, "/") : a
        };
        f.setProtocol = function(a) {
            this.protocol = a;
            return e.prototype.setProtocol.call(this, a)
        };
        f.setDomain = function(a) {
            this.domain = a;
            return e.prototype.setDomain.call(this, a)
        };
        f.setPort = function(a) {
            this.port = a;
            return e.prototype.setPort.call(this, a)
        };
        f.setFragment = function(a) {
            this.fragment = a;
            return e.prototype.setFragment.call(this, a)
        };
        f.stripTrailingSlash = function() {
            this.setPath(this.getPath().replace(/\/$/, ""));
            return this
        };
        f.addTrailingSlash = function() {
            var a = this.getPath();
            a.length > 0 && a[a.length - 1] !== "/" && this.setPath(a + "/");
            return this
        };
        f.valueOf = function() {
            return this.toString()
        };
        f.getRegisteredDomain = function() {
            if (!this.getDomain()) return "";
            if (!c("isFacebookURI")(this)) return null;
            var a = this.getDomain().split("."),
                b = a.indexOf("facebook");
            b === -1 && (b = a.indexOf("workplace"));
            return a.slice(b).join(".")
        };
        f.getUnqualifiedURI = function() {
            return c("unqualifyURI")(new b(this))
        };
        f.getQualifiedURI = function() {
            return new b(this).qualify()
        };
        f.isSameOrigin = function(a) {
            a = a;
            a == null ? a = h() : a instanceof b || (a = new b(a.toString()));
            return e.prototype.isSameOrigin.call(this, a)
        };
        b.goURIOnNewWindow = function(a) {
            b.goURIOnWindow(a, window.open("", "_blank"), !0)
        };
        b.goURIOnWindow = function(a, c, d, e) {
            d === void 0 && (d = !1), e === void 0 && (e = !1), b.goURIOnWindowWithReference(a, c, d, e)
        };
        b.goURIOnWindowWithReference = function(e, f, g, h) {
            g === void 0 && (g = !1);
            h === void 0 && (h = !1);
            e = new b(e);
            g = g;
            var i = !f || f === window;
            if (c("Env").isCQuick && c("isFacebookURI")(e) && i) {
                i = {
                    cquick: c("Env").iframeKey,
                    ctarget: c("Env").iframeTarget,
                    cquick_token: c("Env").iframeToken
                };
                e.addQueryData(i);
                g = !1
            }
            i = e.toString();
            e = f ? f : window;
            f = window.location.href === i && e === window;
            !g && a.PageTransitions ? a.PageTransitions.go(i, h) : f ? d("ReloadPage").now() : h ? e.location.replace(i) : e.location.href = i;
            return e
        };
        f.go = function(a, d) {
            c("unexpectedUseInComet")("uri.go"), b.go(this, a, d)
        };
        b.tryParseURI = function(a) {
            a = c("URIBase").tryParse(a, d("PHPQuerySerializer"));
            return a ? new b(a) : null
        };
        b.isValidURI = function(a) {
            return c("URIBase").isValid(a, d("PHPQuerySerializer"))
        };
        b.getRequestURI = function(a, c) {
            a === void 0 && (a = !0);
            c === void 0 && (c = !1);
            if (a) {
                a = i();
                if (a) return a.getCurrentURI(!!c).getQualifiedURI()
            }
            return new b(window.location.href)
        };
        b.getMostRecentURI = function() {
            var a = i();
            return a ? a.getMostRecentURI().getQualifiedURI() : new b(window.location.href)
        };
        b.getNextURI = function() {
            var a = i();
            return a ? a.getNextURI().getQualifiedURI() : new b(window.location.href)
        };
        b.encodeComponent = function(a) {
            return encodeURIComponent(a).replace(/%5D/g, "]").replace(/%5B/g, "[")
        };
        b.decodeComponent = function(a) {
            return decodeURIComponent(a.replace(/\+/g, " "))
        };
        b.normalize = function(a) {
            return a != null && typeof a === "string" ? this.normalizeString(a) : new b(a).toString()
        };
        return b
    }(c("URIBase"));
    j.go = function(a, b, d) {
        c("unexpectedUseInComet")("URI.go"), j.goURIOnWindow(a, window, b, d)
    };
    j.normalizeString = c("memoizeStringOnly")(function(a) {
        return new j(a).toString()
    });
    j.expression = /(((\w+):\/\/)([^\/:]*)(:(\d+))?)?([^#?]*)(\?([^#]*))?(#(.*))?/;
    j.arrayQueryExpression = /^(\w+)((?:\[\w*\])+)=?(.*)/;
    g["default"] = j
}), 98);
__d("isCometAltpayJsSdkIframeAllowedDomain", ["CometAltpayJsSdkIframeAllowedDomains", "URI"], (function(a, b, c, d, e, f, g) {
    "use strict";
    b = Object.freeze(c("CometAltpayJsSdkIframeAllowedDomains"));
    var h = Object.freeze(b.allowed_domains);

    function a() {
        var a = new(c("URI"))(window.location.href);
        if (h == null || h.length <= 0) return !1;
        var b = h.some(function(b) {
            b = new(c("URI"))(b);
            return b == null ? !1 : a.isSameOrigin(b)
        });
        return b ? !0 : !1
    }
    g["default"] = a
}), 98);
__d("ReloadPage", ["BlueCompatRouter", "Env"], (function(a, b, c, d, e, f) {
    var g;

    function h(c) {
        !(g || (g = b("Env"))).isCQuick ? a.window.location.reload(c) : b("BlueCompatRouter").sendMessage({
            compatAction: "reload"
        })
    }

    function c(b) {
        a.setTimeout(h, b)
    }
    f.now = h;
    f.delay = c
}), 66);
__d("isInternalFBURI", [], (function(a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)internalfb\\.com$", "i");

    function a(a) {
        return g.test(a.getDomain())
    }
    f["default"] = a
}), 66);
__d("XControllerURIBuilder", ["invariant", "URI", "gkx", "isInternalFBURI"], (function(a, b, c, d, e, f, g, h) {
    a = function() {
        function a(a, b) {
            this.$1 = {}, this.$2 = a, this.$3 = b
        }
        var b = a.prototype;
        b.setInt = function(a, b) {
            return this.__setParam(a, "Int", b)
        };
        b.setFBID = function(a, b) {
            return this.__setParam(a, "FBID", b)
        };
        b.setFloat = function(a, b) {
            return this.__setParam(a, "Float", b)
        };
        b.setString = function(a, b) {
            return this.__setParam(a, "String", b)
        };
        b.setExists = function(a, b) {
            b === !1 && (b = void 0);
            return this.__setParam(a, "Exists", b)
        };
        b.setBool = function(a, b) {
            return this.__setParam(a, "Bool", b)
        };
        b.setBoolVector = function(a, b) {
            return this.__setParam(a, "BoolVector", b)
        };
        b.setEnum = function(a, b) {
            return this.__setParam(a, "Enum", b)
        };
        b.setPath = function(a, b) {
            return this.__setParam(a, "Path", b)
        };
        b.setIntVector = function(a, b) {
            return this.__setParam(a, "IntVector", b)
        };
        b.setIntKeyset = function(a, b) {
            return this.__setParam(a, "IntKeyset", b)
        };
        b.setIntSet = function(a, b) {
            return this.__setParam(a, "IntSet", b.join(","))
        };
        b.setFloatVector = function(a, b) {
            return this.__setParam(a, "FloatVector", b)
        };
        b.setFloatSet = function(a, b) {
            return this.__setParam(a, "FloatSet", b.join(","))
        };
        b.setStringVector = function(a, b) {
            return this.__setParam(a, "StringVector", b)
        };
        b.setStringKeyset = function(a, b) {
            return this.__setParam(a, "StringKeyset", b)
        };
        b.setStringSet = function(a, b) {
            return this.__setParam(a, "StringSet", b)
        };
        b.setFBIDVector = function(a, b) {
            return this.__setParam(a, "FBIDVector", b)
        };
        b.setFBIDSet = function(a, b) {
            return this.__setParam(a, "FBIDSet", b)
        };
        b.setFBIDKeyset = function(a, b) {
            return this.__setParam(a, "FBIDKeyset", b)
        };
        b.setEnumVector = function(a, b) {
            return this.__setParam(a, "EnumVector", b)
        };
        b.setEnumSet = function(a, b) {
            return this.__setParam(a, "EnumSet", b)
        };
        b.setEnumKeyset = function(a, b) {
            return this.__setParam(a, "EnumKeyset", b)
        };
        b.setIntToIntMap = function(a, b) {
            return this.__setParam(a, "IntToIntMap", b)
        };
        b.setIntToFloatMap = function(a, b) {
            return this.__setParam(a, "IntToFloatMap", b)
        };
        b.setIntToStringMap = function(a, b) {
            return this.__setParam(a, "IntToStringMap", b)
        };
        b.setIntToBoolMap = function(a, b) {
            return this.__setParam(a, "IntToBoolMap", b)
        };
        b.setStringToIntMap = function(a, b) {
            return this.__setParam(a, "StringToIntMap", b)
        };
        b.setStringToFloatMap = function(a, b) {
            return this.__setParam(a, "StringToFloatMap", b)
        };
        b.setStringToStringMap = function(a, b) {
            return this.__setParam(a, "StringToStringMap", b)
        };
        b.setStringToNullableStringMap = function(a, b) {
            return this.__setParam(a, "StringToNullableStringMap", b)
        };
        b.setStringToBoolMap = function(a, b) {
            return this.__setParam(a, "StringToBoolMap", b)
        };
        b.setStringToEnumMap = function(a, b) {
            return this.__setParam(a, "StringToEnumMap", b)
        };
        b.setEnumToStringVectorMap = function(a, b) {
            return this.__setParam(a, "EnumToStringVectorMap", b)
        };
        b.setEnumToStringMap = function(a, b) {
            return this.__setParam(a, "EnumToStringMap", b)
        };
        b.setEnumToBoolMap = function(a, b) {
            return this.__setParam(a, "EnumToBoolMap", b)
        };
        b.setEnumToEnumMap = function(a, b) {
            return this.__setParam(a, "EnumToEnumMap", b)
        };
        b.setEnumToIntMap = function(a, b) {
            return this.__setParam(a, "EnumToIntMap", b)
        };
        b.setEnumToFBIDVectorMap = function(a, b) {
            return this.__setParam(a, "EnumToFBIDVectorMap", b)
        };
        b.setStringToIntDict = function(a, b) {
            return this.__setParam(a, "StringToIntDict", b)
        };
        b.setStringToNullableIntDict = function(a, b) {
            return this.__setParam(a, "StringToNullableIntDict", b)
        };
        b.setStringToFloatDict = function(a, b) {
            return this.__setParam(a, "StringToFloatDict", b)
        };
        b.setStringToStringKeysetDict = function(a, b) {
            return this.__setParam(a, "StringToStringKeysetDict", b)
        };
        b.setStringToNullableFloatDict = function(a, b) {
            return this.__setParam(a, "StringToNullableFloatDict", b)
        };
        b.setStringToStringDict = function(a, b) {
            return this.__setParam(a, "StringToStringDict", b)
        };
        b.setStringToNullableStringDict = function(a, b) {
            return this.__setParam(a, "StringToNullableStringDict", b)
        };
        b.setStringToBoolDict = function(a, b) {
            return this.__setParam(a, "StringToBoolDict", b)
        };
        b.setStringToEnumDict = function(a, b) {
            return this.__setParam(a, "StringToEnumDict", b)
        };
        b.setEnumToIntDict = function(a, b) {
            return this.__setParam(a, "EnumToIntDict", b)
        };
        b.setEnumToStringDict = function(a, b) {
            return this.__setParam(a, "EnumToStringDict", b)
        };
        b.setHackType = function(a, b) {
            return this.__setParam(a, "HackType", b)
        };
        b.setTypeAssert = function(a, b) {
            return this.__setParam(a, "TypeAssert", b)
        };
        b.__validateRequiredParamsExistence = function() {
            for (var a in this.$3) !this.$3[a].required || Object.prototype.hasOwnProperty.call(this.$1, a) || h(0, 903, a)
        };
        b.setParams = function(a) {
            for (var b in a) {
                this.__assertParamExists(b);
                var c = this.$3[b].type;
                this.__setParam(b, c, a[b])
            }
            return this
        };
        b.__assertParamExists = function(a) {
            a in this.$3 || h(0, 37339, a)
        };
        b.__setParam = function(a, b, c) {
            this.__assertParamExists(a);
            var d = this.$3[a].type,
                e = {
                    StringOrPFBID: "String",
                    IntOrPFBID: "Int",
                    FBIDOrPFBID: "FBID",
                    PaymentLegacyAdAccountID: "Int"
                };
            e = e[d];
            d === b || e === b || h(0, 37340, a, b, d);
            this.__setParamInt(a, c);
            return this
        };
        b.__setParamInt = function(a, b) {
            this.$1[a] = b
        };
        b.getRequest_LEGACY_UNTYPED = function(a) {
            return a.setReplaceTransportMarkers().setURI(this.getURI())
        };
        b.setPreviousActorIsPageVoice = function(a) {
            this.__setParamInt("paipv", a ? 1 : 0);
            return this
        };
        b.getURI = function() {
            this.__validateRequiredParamsExistence();
            var a = {},
                b = "",
                d = /^(.*)?\{(\?)?(\*)?(.+?)\}(.*)?$/,
                e = this.$2.split("/"),
                f = !1;
            for (var g = 0; g < e.length; g++) {
                var i = e[g];
                if (i === "") continue;
                var j = d.exec(i);
                if (!j) b += "/" + i;
                else {
                    i = j[2] === "?";
                    var k = j[4],
                        l = this.$3[k];
                    l || h(0, 11837, k, this.$2);
                    if (i && f) continue;
                    if (this.$1[k] == null && i) {
                        f = !0;
                        continue
                    }
                    i = this.$1[k] != null ? this.$1[k] : l.defaultValue;
                    i != null || h(0, 907, k);
                    l = j[1] ? j[1] : "";
                    j = j[5] ? j[5] : "";
                    b += "/" + l + i + j;
                    a[k] = !0
                }
            }
            this.$2.slice(-1) === "/" && (b += "/");
            b === "" && (b = "/");
            l = new(c("URI"))(b);
            for (i in this.$1) {
                j = this.$1[i];
                if (!a[i] && j != null) {
                    k = this.$3[i];
                    l.addQueryData(i, k && k.type === "Exists" ? null : j)
                }
            }
            return l
        };
        b.getLookasideURI = function() {
            var a = "lookaside.facebook.com";
            c("isInternalFBURI")(c("URI").getRequestURI()) ? a = "lookaside.internalfb.com" : c("gkx")("996940") && (a = "lookaside.internmc.facebook.com");
            return this.getURI().setDomain(a).setProtocol("https")
        };
        a.create = function(b, c) {
            return function() {
                return new a(b, c)
            }
        };
        return a
    }();
    a.prototype.getRequest = function(a) {
        return this.getRequest_LEGACY_UNTYPED(a)
    };
    g["default"] = a
}), 98);
__d("XRequest", ["invariant"], (function(a, b, c, d, e, f, g) {
    var h = function a(b, c, d) {
        var e;
        switch (b) {
            case "Bool":
                e = c && c !== "false" && c !== "0" || !1;
                break;
            case "Int":
                e = c.toString();
                /-?\d+/.test(e) || g(0, 11839, c);
                break;
            case "Float":
                e = parseFloat(c, 10);
                isNaN(e) && g(0, 11840, c);
                break;
            case "FBID":
                e = c.toString();
                for (var f = 0; f < e.length; ++f) {
                    var h = e.charCodeAt(f);
                    48 <= h && h <= 57 || g(0, 11841, c)
                }
                break;
            case "String":
                e = c.toString();
                break;
            case "Enum":
                d === 0 ? e = a("Int", c, null) : d === 1 ? e = a("String", c, null) : d === 2 ? e = c : g(0, 5044, d);
                break;
            default:
                if (h = /^Nullable(\w+)$/.exec(b)) c === null ? e = null : e = a(h[1], c, d);
                else if (f = /^(\w+)Vector$/.exec(b)) {
                    !Array.isArray(c) ? (e = c.toString(), e = e === "" ? [] : e.split(",")) : e = c;
                    var i = f[1];
                    typeof i === "string" || g(0, 5045);
                    e = e.map(function(b) {
                        return a(i, b, d && d.member)
                    })
                } else if (h = /^(\w+)(Set|Keyset)$/.exec(b)) !Array.isArray(c) ? (e = c.toString(), e = e === "" ? [] : e.split(",")) : e = c, e = e.reduce(function(a, b) {
                    a[b] = b;
                    return a
                }, {}), i = h[1], typeof i === "string" || g(0, 5045), e = Object.keys(e).map(function(b) {
                    return a(i, e[b], d && d.member)
                });
                else if (f = /^(\w+)To(\w+)Map$/.exec(b)) {
                    e = {};
                    var j = f[1],
                        k = f[2];
                    typeof j === "string" && typeof k === "string" || g(0, 5045);
                    Object.keys(c).forEach(function(b) {
                        e[a(j, b, d && d.key)] = a(k, c[b], d && d.value)
                    })
                } else g(0, 11842, b)
        }
        return e
    };
    a = function() {
        function a(a, b, c) {
            var d = this;
            this.$1 = b;
            this.$2 = babelHelpers["extends"]({}, c.getQueryData());
            b = a.split("/").filter(function(a) {
                return a
            });
            a = c.getPath().split("/").filter(function(a) {
                return a
            });
            var e;
            for (var f = 0; f < b.length; ++f) {
                var h = /^\{(\?)?(\*)?(\w+)\}$/.exec(b[f]);
                if (!h) {
                    b[f] === a[f] || g(0, 5047, c.getPath());
                    continue
                }
                var i = !!h[1],
                    j = !!h[2];
                !j || f === b.length - 1 || g(0, 11843, e);
                e = h[3];
                Object.prototype.hasOwnProperty.call(this.$1, e) || g(0, 11844, e);
                this.$1[e].required ? i && g(0, 5050, e) : i || g(0, 5057, e);
                a[f] && (this.$2[e] = j ? a.slice(f).join("/") : a[f])
            }
            Object.keys(this.$1).forEach(function(a) {
                !d.$1[a].required || Object.prototype.hasOwnProperty.call(d.$2, a) || g(0, 5051)
            })
        }
        var b = a.prototype;
        b.getExists = function(a) {
            return this.$2[a] !== void 0
        };
        b.getBool = function(a) {
            return this.$3(a, "Bool")
        };
        b.getInt = function(a) {
            return this.$3(a, "Int")
        };
        b.getFloat = function(a) {
            return this.$3(a, "Float")
        };
        b.getFBID = function(a) {
            return this.$3(a, "FBID")
        };
        b.getString = function(a) {
            return this.$3(a, "String")
        };
        b.getEnum = function(a) {
            return this.$3(a, "Enum")
        };
        b.getOptionalInt = function(a) {
            return this.$4(a, "Int")
        };
        b.getOptionalFloat = function(a) {
            return this.$4(a, "Float")
        };
        b.getOptionalFBID = function(a) {
            return this.$4(a, "FBID")
        };
        b.getOptionalString = function(a) {
            return this.$4(a, "String")
        };
        b.getOptionalEnum = function(a) {
            return this.$4(a, "Enum")
        };
        b.getIntVector = function(a) {
            return this.$3(a, "IntVector")
        };
        b.getFloatVector = function(a) {
            return this.$3(a, "FloatVector")
        };
        b.getFBIDVector = function(a) {
            return this.$3(a, "FBIDVector")
        };
        b.getStringVector = function(a) {
            return this.$3(a, "StringVector")
        };
        b.getEnumVector = function(a) {
            return this.$3(a, "EnumVector")
        };
        b.getOptionalIntVector = function(a) {
            return this.$4(a, "IntVector")
        };
        b.getOptionalFloatVector = function(a) {
            return this.$4(a, "FloatVector")
        };
        b.getOptionalFBIDVector = function(a) {
            return this.$4(a, "FBIDVector")
        };
        b.getOptionalStringVector = function(a) {
            return this.$4(a, "StringVector")
        };
        b.getOptionalEnumVector = function(a) {
            return this.$4(a, "EnumVector")
        };
        b.getIntSet = function(a) {
            return this.$3(a, "IntSet")
        };
        b.getFBIDSet = function(a) {
            return this.$3(a, "FBIDSet")
        };
        b.getFBIDKeyset = function(a) {
            return this.$3(a, "FBIDKeyset")
        };
        b.getStringSet = function(a) {
            return this.$3(a, "StringSet")
        };
        b.getEnumKeyset = function(a) {
            return this.$3(a, "EnumKeyset")
        };
        b.getOptionalIntSet = function(a) {
            return this.$4(a, "IntSet")
        };
        b.getOptionalFBIDSet = function(a) {
            return this.$4(a, "FBIDSet")
        };
        b.getOptionalFBIDKeyset = function(a) {
            return this.$4(a, "FBIDKeyset")
        };
        b.getOptionalStringSet = function(a) {
            return this.$4(a, "StringSet")
        };
        b.getEnumToBoolMap = function(a) {
            return this.$3(a, "EnumToBoolMap")
        };
        b.getEnumToEnumMap = function(a) {
            return this.$3(a, "EnumToEnumMap")
        };
        b.getEnumToFloatMap = function(a) {
            return this.$3(a, "EnumToFloatMap")
        };
        b.getEnumToIntMap = function(a) {
            return this.$3(a, "EnumToIntMap")
        };
        b.getEnumToStringMap = function(a) {
            return this.$3(a, "EnumToStringMap")
        };
        b.getIntToBoolMap = function(a) {
            return this.$3(a, "IntToBoolMap")
        };
        b.getIntToEnumMap = function(a) {
            return this.$3(a, "IntToEnumMap")
        };
        b.getIntToFloatMap = function(a) {
            return this.$3(a, "IntToFloatMap")
        };
        b.getIntToIntMap = function(a) {
            return this.$3(a, "IntToIntMap")
        };
        b.getIntToStringMap = function(a) {
            return this.$3(a, "IntToStringMap")
        };
        b.getStringToBoolMap = function(a) {
            return this.$3(a, "StringToBoolMap")
        };
        b.getStringToEnumMap = function(a) {
            return this.$3(a, "StringToEnumMap")
        };
        b.getStringToFloatMap = function(a) {
            return this.$3(a, "StringToFloatMap")
        };
        b.getStringToIntMap = function(a) {
            return this.$3(a, "StringToIntMap")
        };
        b.getStringToStringMap = function(a) {
            return this.$3(a, "StringToStringMap")
        };
        b.getOptionalEnumToBoolMap = function(a) {
            return this.$4(a, "EnumToBoolMap")
        };
        b.getOptionalEnumToEnumMap = function(a) {
            return this.$4(a, "EnumToEnumMap")
        };
        b.getOptionalEnumToFloatMap = function(a) {
            return this.$4(a, "EnumToFloatMap")
        };
        b.getOptionalEnumToIntMap = function(a) {
            return this.$4(a, "EnumToIntMap")
        };
        b.getOptionalEnumToStringMap = function(a) {
            return this.$4(a, "EnumToStringMap")
        };
        b.getOptionalIntToBoolMap = function(a) {
            return this.$4(a, "IntToBoolMap")
        };
        b.getOptionalIntToEnumMap = function(a) {
            return this.$4(a, "IntToEnumMap")
        };
        b.getOptionalIntToFloatMap = function(a) {
            return this.$4(a, "IntToFloatMap")
        };
        b.getOptionalIntToIntMap = function(a) {
            return this.$4(a, "IntToIntMap")
        };
        b.getOptionalIntToStringMap = function(a) {
            return this.$4(a, "IntToStringMap")
        };
        b.getOptionalStringToBoolMap = function(a) {
            return this.$4(a, "StringToBoolMap")
        };
        b.getOptionalStringToEnumMap = function(a) {
            return this.$4(a, "StringToEnumMap")
        };
        b.getOptionalStringToFloatMap = function(a) {
            return this.$4(a, "StringToFloatMap")
        };
        b.getOptionalStringToIntMap = function(a) {
            return this.$4(a, "StringToIntMap")
        };
        b.getOptionalStringToStringMap = function(a) {
            return this.$4(a, "StringToStringMap")
        };
        b.getEnumToNullableEnumMap = function(a) {
            return this.$3(a, "EnumToNullableEnumMap")
        };
        b.getEnumToNullableFloatMap = function(a) {
            return this.$3(a, "EnumToNullableFloatMap")
        };
        b.getEnumToNullableIntMap = function(a) {
            return this.$3(a, "EnumToNullableIntMap")
        };
        b.getEnumToNullableStringMap = function(a) {
            return this.$3(a, "EnumToNullableStringMap")
        };
        b.getIntToNullableEnumMap = function(a) {
            return this.$3(a, "IntToNullableEnumMap")
        };
        b.getIntToNullableFloatMap = function(a) {
            return this.$3(a, "IntToNullableFloatMap")
        };
        b.getIntToNullableIntMap = function(a) {
            return this.$3(a, "IntToNullableIntMap")
        };
        b.getIntToNullableStringMap = function(a) {
            return this.$3(a, "IntToNullableStringMap")
        };
        b.getStringToNullableEnumMap = function(a) {
            return this.$3(a, "StringToNullableEnumMap")
        };
        b.getStringToNullableFloatMap = function(a) {
            return this.$3(a, "StringToNullableFloatMap")
        };
        b.getStringToNullableIntMap = function(a) {
            return this.$3(a, "StringToNullableIntMap")
        };
        b.getStringToNullableStringMap = function(a) {
            return this.$3(a, "StringToNullableStringMap")
        };
        b.getOptionalEnumToNullableEnumMap = function(a) {
            return this.$4(a, "EnumToNullableEnumMap")
        };
        b.getOptionalEnumToNullableFloatMap = function(a) {
            return this.$4(a, "EnumToNullableFloatMap")
        };
        b.getOptionalEnumToNullableIntMap = function(a) {
            return this.$4(a, "EnumToNullableIntMap")
        };
        b.getOptionalEnumToNullableStringMap = function(a) {
            return this.$4(a, "EnumToNullableStringMap")
        };
        b.getOptionalIntToNullableEnumMap = function(a) {
            return this.$4(a, "IntToNullableEnumMap")
        };
        b.getOptionalIntToNullableFloatMap = function(a) {
            return this.$4(a, "IntToNullableFloatMap")
        };
        b.getOptionalIntToNullableIntMap = function(a) {
            return this.$4(a, "IntToNullableIntMap")
        };
        b.getOptionalIntToNullableStringMap = function(a) {
            return this.$4(a, "IntToNullableStringMap")
        };
        b.getOptionalStringToNullableEnumMap = function(a) {
            return this.$4(a, "StringToNullableEnumMap")
        };
        b.getOptionalStringToNullableFloatMap = function(a) {
            return this.$4(a, "StringToNullableFloatMap")
        };
        b.getOptionalStringToNullableIntMap = function(a) {
            return this.$4(a, "StringToNullableIntMap")
        };
        b.getOptionalStringToNullableStringMap = function(a) {
            return this.$4(a, "StringToNullableStringMap")
        };
        b.$3 = function(a, b) {
            this.$5(a, b);
            var c = this.$1[a];
            if (!Object.prototype.hasOwnProperty.call(this.$2, a) && c.defaultValue != null) {
                c.required && g(0, 5052);
                return h(b, c.defaultValue, c.enumType)
            }
            c.required || b === "Bool" || c.defaultValue != null || g(0, 11845, b, a, b, a);
            return h(b, this.$2[a], c.enumType)
        };
        b.$4 = function(a, b) {
            this.$5(a, b);
            var c = this.$1[a];
            c.required && g(0, 11846, b, a, b, a);
            c.defaultValue && g(0, 5052);
            return Object.prototype.hasOwnProperty.call(this.$2, a) ? h(b, this.$2[a], c.enumType) : null
        };
        b.$5 = function(a, b) {
            Object.prototype.hasOwnProperty.call(this.$1, a) || g(0, 37317, a), this.$1[a].type === b || g(0, 11848, a, b, this.$1[a].type)
        };
        return a
    }();
    f["default"] = a
}), 66);
__d("XController", ["XControllerURIBuilder", "XRequest"], (function(a, b, c, d, e, f, g) {
    a = function() {
        function a(a, b) {
            this.$1 = a, this.$2 = b
        }
        var b = a.prototype;
        b.getURIBuilder = function(a) {
            var b = this,
                d = new(c("XControllerURIBuilder"))(this.$1, this.$2);
            if (a) {
                var e = this.getRequest(a);
                Object.keys(this.$2).forEach(function(a) {
                    var c = b.$2[a],
                        f = "";
                    !c.required && !Object.prototype.hasOwnProperty.call(c, "defaultValue") && (f = "Optional");
                    f = "get" + f + c.type;
                    f = e[f](a);
                    if (f == null || Object.prototype.hasOwnProperty.call(c, "defaultValue") && f === c.defaultValue) return;
                    c = "set" + c.type;
                    d[c](a, f)
                })
            }
            return d
        };
        b.getRequest = function(a) {
            return new(c("XRequest"))(this.$1, this.$2, a)
        };
        a.create = function(b, c) {
            return new a(b, c)
        };
        return a
    }();
    g["default"] = a
}), 98);
__d("XHeartbeatController", ["XController"], (function(a, b, c, d, e, f) {
    e.exports = b("XController").create("/nw/", {})
}), null);
__d("requireCond", [], (function(a, b, c, d, e, f) {
    function a(a, b, c) {
        throw new Error("Cannot use raw untransformed requireCond.")
    }
    b = a;
    f["default"] = b
}), 66);
__d("clearTimeout", ["cr:806696"], (function(a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = b("cr:806696")
}), 98);
__d("getSameOriginTransport", ["ExecutionEnvironment", "err"], (function(a, b, c, d, e, f, g) {
    function b() {
        if (!c("ExecutionEnvironment").canUseDOM && !c("ExecutionEnvironment").isInWorker) throw c("err")("getSameOriginTransport: %s", "Same origin transport unavailable in the server environment.");
        try {
            return new a.XMLHttpRequest()
        } catch (a) {
            throw c("err")("getSameOriginTransport: %s", a.message)
        }
    }
    g["default"] = b
}), 98);
__d("killswitch", ["KSConfig"], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        return b("KSConfig").killed.has(a)
    }
    e.exports = a
}), null);
__d("setTimeout", ["cr:807042"], (function(a, b, c, d, e, f, g) {
    g["default"] = b("cr:807042")
}), 98);
__d("NetworkHeartbeat", ["XHeartbeatController", "clearTimeout", "getSameOriginTransport", "killswitch", "setTimeout"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = c("XHeartbeatController").getURIBuilder().getURI().toString(),
        i = 6400,
        j = 100,
        k = null,
        l = 0,
        m = null,
        n = c("killswitch")("DISABLE_HEARTBEAT_POLLING");

    function o(a, b) {
        m = c("getSameOriginTransport")(), m.open("GET", h, !0), m.onload = function() {
            m && m.status === 204 && (n = !0), q(a)
        }, m.onerror = function() {
            r(a, b)
        }, m.ontimeout = function() {
            r(a, b)
        }, m.send()
    }

    function p() {
        m = null, j = 100, l = 0, c("clearTimeout")(k)
    }

    function q(a) {
        p(), a()
    }

    function r(a, b) {
        k = c("setTimeout")(function() {
            s(a, b, void 0, !0)
        }, j), l++, j < i && (j = Math.min(j * Math.pow(2, l), i)), b()
    }

    function s(a, b, c, d) {
        c === void 0 && (c = function() {
            return !0
        }), d === void 0 && (d = !1), n || (d || m == null && c()) && o(a, b)
    }

    function a() {
        return m != null
    }
    g.maybeStartHeartbeat = s;
    g.isHeartbeatPending = a
}), 98);
__d("NetworkStatusImpl", ["FBLogger", "NetworkHeartbeat", "performanceNow"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h, i = [],
        j = typeof window !== "undefined" ? window : self,
        k = j == null ? void 0 : (h = j.navigator) == null ? void 0 : h.onLine,
        l = 2,
        m = 5e3,
        n = [],
        o = [],
        p = 0,
        q = !0,
        r = !1,
        s = function() {
            w(q, !0)
        },
        t = function() {
            w(r, !0)
        };

    function u() {
        var a = i.slice();
        a.forEach(function(a) {
            a({
                online: k
            })
        })
    }

    function v(a) {
        a = i.indexOf(a);
        a > -1 && i.splice(a, 1)
    }

    function w(a, b) {
        b === void 0 && (b = !1);
        var e = k === a;
        b = !b && a === q && d("NetworkHeartbeat").isHeartbeatPending();
        if (e || b) return;
        k = a;
        c("FBLogger")("NetworkStatus").warn("Network switched to " + (a ? "online" : "offline"));
        k || d("NetworkHeartbeat").maybeStartHeartbeat(s, t);
        u()
    }

    function x() {
        var a = c("performanceNow")();
        n = n.filter(function(b) {
            return y(b.startTime, a)
        });
        o = o.filter(function(b) {
            return y(b.startTime, a)
        });
        return o.length / n.length < l
    }
    var y = function(a, b) {
        return a > b - m
    };

    function a() {
        return k
    }

    function b(a) {
        i.push(a);
        var b = !1;
        return {
            remove: function() {
                b || (b = !0, v(a))
            }
        }
    }

    function e() {
        var a = c("performanceNow")();
        n.push({
            startTime: a
        });
        d("NetworkHeartbeat").maybeStartHeartbeat(s, t, x)
    }

    function f() {
        var a = c("performanceNow")();
        o.push({
            startTime: a
        });
        y(p, a) || (o = o.filter(function(b) {
            return y(b.startTime, a)
        }), p = a)
    }
    j.addEventListener("online", function() {
        w(q)
    });
    j.addEventListener("offline", function() {
        w(r)
    });
    g.isOnline = a;
    g.onChange = b;
    g.reportError = e;
    g.reportSuccess = f
}), 98);
__d("NetworkStatusSham", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a() {
        return !0
    }

    function b(a) {
        return {
            remove: function() {}
        }
    }

    function c() {
        return
    }

    function d() {
        return
    }
    f.isOnline = a;
    f.onChange = b;
    f.reportError = c;
    f.reportSuccess = d
}), 66);
__d("NetworkStatus", ["NetworkStatusImpl", "NetworkStatusSham", "gkx"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = c("gkx")("708253") && c("gkx")("1263340") ? d("NetworkStatusImpl") : d("NetworkStatusSham");
    b = a;
    g["default"] = b
}), 98);
__d("CircularBuffer", ["unrecoverableViolation"], (function(a, b, c, d, e, f, g) {
    a = function() {
        function a(a) {
            if (a <= 0) throw c("unrecoverableViolation")("Buffer size should be a positive integer", "comet_infra");
            this.$1 = a;
            this.$2 = 0;
            this.$3 = [];
            this.$4 = []
        }
        var b = a.prototype;
        b.write = function(a) {
            var b = this;
            this.$3.length < this.$1 ? this.$3.push(a) : (this.$4.forEach(function(a) {
                return a(b.$3[b.$2])
            }), this.$3[this.$2] = a, this.$2++, this.$2 %= this.$1);
            return this
        };
        b.onEvict = function(a) {
            this.$4.push(a);
            return this
        };
        b.read = function() {
            return this.$3.slice(this.$2).concat(this.$3.slice(0, this.$2))
        };
        b.expand = function(a) {
            if (a > this.$1) {
                var b = this.read();
                this.$2 = 0;
                this.$3 = b;
                this.$1 = a
            }
            return this
        };
        b.dropFirst = function(a) {
            if (a <= this.$1) {
                var b = this.read();
                this.$2 = 0;
                b.splice(0, a);
                this.$3 = b
            }
            return this
        };
        b.clear = function() {
            this.$2 = 0;
            this.$3 = [];
            return this
        };
        b.currentSize = function() {
            return this.$3.length
        };
        return a
    }();
    g["default"] = a
}), 98);
__d("ResourceTypes", [], (function(a, b, c, d, e, f) {
    "use strict";
    a = {
        JS: "js",
        CSS: "css",
        XHR: "xhr"
    };
    b = a;
    f["default"] = b
}), 66);
__d("TimingAnnotations", [], (function(a, b, c, d, e, f) {
    a = function() {
        function a() {}
        var b = a.prototype;
        b.addStringAnnotation = function(a, b) {
            return this
        };
        b.addSetAnnotation = function(a, b) {
            return this
        };
        b.addSetElement = function(a, b) {
            return this
        };
        b.registerOnBeforeSend = function(a) {
            return this
        };
        b.addVectorAnnotation = function(a, b) {
            return this
        };
        b.addVectorElement = function(a, b) {
            return this
        };
        return a
    }();
    b = function() {
        function a() {
            this.$1 = null, this.$2 = null, this.$3 = null, this.$4 = []
        }
        var b = a.prototype;
        b.addStringAnnotation = function(a, b) {
            this.$2 = this.$2 || new Map();
            this.$2.set(a, b);
            return this
        };
        b.addSetAnnotation = function(a, b) {
            var c = this.$1 || new Map(),
                d = c.get(a) || new Set();
            b.forEach(function(a) {
                return d.add(a)
            });
            c.set(a, d);
            this.$1 = c;
            return this
        };
        b.addSetElement = function(a, b) {
            var c = this.$1 || new Map(),
                d = c.get(a) || new Set();
            d.add(b);
            c.set(a, d);
            this.$1 = c;
            return this
        };
        b.addVectorAnnotation = function(a, b) {
            this.$3 = this.$3 || new Map();
            this.$3.set(a, b);
            return this
        };
        b.addVectorElement = function(a, b) {
            var c = this.$3 = this.$3 || new Map(),
                d = this.$3.get(a) || [];
            d.push(b);
            c.set(a, d);
            return this
        };
        b.registerOnBeforeSend = function(a) {
            this.$4.push(a);
            return this
        };
        b.prepareToSend = function() {
            var a = this;
            this.$4.forEach(function(b) {
                return b(a)
            });
            this.$4 = [];
            var b = {};
            if (this.$1 != null)
                for (var c = this.$1, d = Array.isArray(c), e = 0, c = d ? c : c[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                    var f;
                    if (d) {
                        if (e >= c.length) break;
                        f = c[e++]
                    } else {
                        e = c.next();
                        if (e.done) break;
                        f = e.value
                    }
                    f = f;
                    var g = f[0];
                    f = f[1];
                    b[g] = Array.from(f.values())
                }
            g = {};
            if (this.$2 != null)
                for (f = this.$2, e = Array.isArray(f), d = 0, f = e ? f : f[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                    if (e) {
                        if (d >= f.length) break;
                        c = f[d++]
                    } else {
                        d = f.next();
                        if (d.done) break;
                        c = d.value
                    }
                    c = c;
                    var h = c[0];
                    c = c[1];
                    g[h] = c
                }
            h = {};
            if (this.$3 != null)
                for (c = this.$3, d = Array.isArray(c), e = 0, c = d ? c : c[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                    if (d) {
                        if (e >= c.length) break;
                        f = c[e++]
                    } else {
                        e = c.next();
                        if (e.done) break;
                        f = e.value
                    }
                    f = f;
                    var i = f[0];
                    f = f[1];
                    h[i] = f
                }
            return {
                setProps: b,
                stringProps: g,
                vectorProps: h
            }
        };
        a.combine = function(a, b) {
            var c;
            a != null && b != null ? (a.stringProps = babelHelpers["extends"]({}, b.stringProps, a.stringProps), a.setProps = babelHelpers["extends"]({}, b.setProps, a.setProps), c = a) : a != null ? c = a : b != null && (c = b);
            return c
        };
        return a
    }();
    b.EmptyTimingAnnotations = a;
    b.EmptyTraceTimingAnnotations = a;
    b.TraceTimingAnnotations = b;
    f["default"] = b
}), 66);
__d("ResourceTimingsStore", ["CircularBuffer", "ResourceTypes", "TimingAnnotations", "URI", "performanceAbsoluteNow"], (function(a, b, c, d, e, f) {
    "use strict";
    var g, h, i = 1e3,
        j = new(b("TimingAnnotations").EmptyTimingAnnotations)(),
        k = {},
        l = {};
    Object.keys(b("ResourceTypes")).forEach(function(a) {
        a = b("ResourceTypes")[a];
        var c = new(b("CircularBuffer"))(i),
            d = new Map();
        c.onEvict(function(a) {
            d["delete"](a)
        });
        k[a] = {
            idx: 1,
            entries: c
        };
        l[a] = d
    });

    function m(a, c, d) {
        var e;
        switch (a) {
            case "css":
            case "js":
                var f = n.parseMakeHasteURL(c);
                f = f == null ? "unknown_resource" : f[0];
                e = d + "_" + f;
                break;
            case "xhr":
                f = new(g || (g = b("URI")))(c).getQualifiedURI();
                c = f.getDomain() + f.getPath();
                e = d + "_" + c;
                break;
            default:
                a, e = "never here"
        }
        return e
    }
    var n = {
        getUID: function(a, b) {
            var c = k[a],
                d = m(a, b, c.idx);
            c.entries.write(d);
            l[a].set(d, {
                uri: b,
                uid: d
            });
            c.idx++;
            return d
        },
        updateURI: function(a, b, c) {
            a = l[a].get(b);
            a != null && (a.uri = c)
        },
        getMapFor: function(a) {
            return l[a]
        },
        parseMakeHasteURL: function(a) {
            a = a.match(/\/rsrc\.php\/.*\/([^\?]+)/);
            if (!a) return null;
            a = a[1];
            var b = "",
                c = a.match(/\.(\w+)$/);
            c && (b = c[1]);
            return [a, b]
        },
        measureRequestSent: function(a, c) {
            a = l[a];
            a = a.get(c);
            if (a == null || a.requestSent != null) return;
            else a.requestSent = (h || (h = b("performanceAbsoluteNow")))()
        },
        measureResponseReceived: function(a, c) {
            a = l[a];
            a = a.get(c);
            if (a == null || a.requestSent == null || a.responseReceived != null) return;
            else a.responseReceived = (h || (h = b("performanceAbsoluteNow")))()
        },
        annotate: function(a, c) {
            a = l[a];
            a = a.get(c);
            if (!a) return j;
            else {
                c = a.annotations;
                if (c != null) return c;
                else {
                    c = new(b("TimingAnnotations"))();
                    a.annotations = c;
                    return c
                }
            }
        },
        getAnnotationsFor: function(a, b) {
            a = l[a];
            a = a.get(b);
            if (!a) return null;
            else {
                b = a.annotations;
                return b != null ? b.prepareToSend() : null
            }
        }
    };
    e.exports = n
}), null);
__d("TimeSlice", ["cr:1126"], (function(a, b, c, d, e, f, g) {
    g["default"] = b("cr:1126")
}), 98);
__d("clearInterval", ["cr:1003267"], (function(a, b, c, d, e, f, g) {
    g["default"] = b("cr:1003267")
}), 98);
__d("isEmpty", ["invariant"], (function(a, b, c, d, e, f, g, h) {
    "use strict";

    function a(a) {
        if (Array.isArray(a)) return a.length === 0;
        else if (typeof a === "object") {
            if (a) {
                !i(a) || a.size === void 0 || h(0, 1445);
                for (var b in a) return !1
            }
            return !0
        } else return !a
    }

    function i(a) {
        return typeof Symbol === "undefined" ? !1 : a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] != null
    }
    g["default"] = a
}), 98);
__d("nullthrows", [], (function(a, b, c, d, e, f) {
    function a(a, b) {
        b === void 0 && (b = "Got unexpected null or undefined");
        if (a != null) return a;
        a = new Error(b);
        a.framesToPop = 1;
        throw a
    }
    f["default"] = a
}), 66);
__d("setIntervalAcrossTransitions", ["cr:896462"], (function(a, b, c, d, e, f, g) {
    g["default"] = b("cr:896462")
}), 98);
__d("CSSLoader", ["CSSLoaderConfig", "NetworkStatus", "ResourceTimingsStore", "TimeSlice", "clearInterval", "ifRequired", "isEmpty", "nullthrows", "setIntervalAcrossTransitions"], (function(a, b, c, d, e, f) {
    var g, h = 20,
        i = b("CSSLoaderConfig").timeout,
        j = b("CSSLoaderConfig").loadEventSupported,
        k, l = [],
        m, n = new Map();

    function o(a) {
        if (k) return;
        k = !0;
        var b = document.createElement("link");
        b.onload = function() {
            j = !0, b.parentNode && b.parentNode.removeChild(b)
        };
        b.rel = "stylesheet";
        b.href = "data:text/css;base64,";
        a.appendChild(b)
    }

    function p() {
        var a = [],
            c = [];
        if (Date.now() >= m) {
            for (var d = n.values(), e = Array.isArray(d), f = 0, d = e ? d : d[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var h;
                if (e) {
                    if (f >= d.length) break;
                    h = d[f++]
                } else {
                    f = d.next();
                    if (f.done) break;
                    h = f.value
                }
                h = h;
                c.push(h.signal);
                a.push(h.error)
            }
            n.clear()
        } else
            for (h = n, f = Array.isArray(h), e = 0, h = f ? h : h[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                if (f) {
                    if (e >= h.length) break;
                    d = h[e++]
                } else {
                    e = h.next();
                    if (e.done) break;
                    d = e.value
                }
                d = d;
                var j = d[0];
                d = d[1];
                var k = d.signal,
                    l = window.getComputedStyle ? getComputedStyle(k) : k.currentStyle;
                l && parseInt(l.height, 10) > 1 && (a.push(d.load), c.push(k), n["delete"](j))
            }
        for (l = 0; l < c.length; l++) {
            d = b("nullthrows")(c[l].parentNode);
            d.removeChild(c[l])
        }
        if (!(g || (g = b("isEmpty")))(a)) {
            for (l = 0; l < a.length; l++) a[l]();
            m = Date.now() + i
        }
        return n.size === 0
    }

    function q(a, c, d, e) {
        var f = document.createElement("meta");
        f.id = "bootloader_" + a.replace(/[^a-z0-9]/gi, "_");
        c.appendChild(f);
        c = n.size !== 0;
        m = Date.now() + i;
        n.set(a, {
            signal: f,
            load: d,
            error: e
        });
        if (!c) var g = b("setIntervalAcrossTransitions")(function() {
            p() && b("clearInterval")(g)
        }, h)
    }

    function r(a, c, d, e, f, g) {
        var h = b("ResourceTimingsStore").getUID("css", c);
        b("ResourceTimingsStore").annotate("css", h).addStringAnnotation("name", a).addStringAnnotation("source", c).addStringAnnotation("caller", "CSSLoader.loadStyleSheet");
        b("ifRequired")("TimeSliceInteraction", function(b) {
            b.informGlobally("CSSLoader.loadStyleSheet").addStringAnnotation("source", c).addStringAnnotation("name", a)
        });
        b("ResourceTimingsStore").measureRequestSent("css", h);
        var i = function() {
                b("ResourceTimingsStore").measureResponseReceived("css", h), e()
            },
            k = b("TimeSlice").getGuardedContinuation("CSSLoader link.onresponse");
        !g ? q(a, d, i, f) : j !== !0 ? (q(a, d, i, f), j === void 0 && o(d)) : (g.onload = k.bind(void 0, function() {
            g.onload = g.onerror = null, i()
        }), g.onerror = k.bind(void 0, function() {
            g.onload = g.onerror = null, f()
        }))
    }
    a = {
        loadStyleSheet: function(a, c, d, e, f, g) {
            var h = document;
            if ("createStyleSheet" in h) {
                var i;
                for (var j = 0; j < l.length; j++)
                    if (l[j].imports.length < 31) {
                        i = j;
                        break
                    }
                if (i === void 0) {
                    try {
                        l.push(h.createStyleSheet())
                    } catch (a) {
                        b("NetworkStatus").reportError();
                        g();
                        return
                    }
                    i = l.length - 1
                }
                b("NetworkStatus").reportSuccess();
                l[i].addImport(c);
                r(a, c, d, f, g, null);
                return
            }
            j = h.createElement("link");
            j.rel = "stylesheet";
            j.type = "text/css";
            j.href = c;
            e && (j.crossOrigin = "anonymous");
            r(a, c, d, f, g, j);
            d.appendChild(j)
        },
        setupEventListeners: function(a, b, c, d, e, f) {
            r(a, b, c, d, e, f)
        }
    };
    e.exports = a
}), null);
__d("ClientConsistencyEventEmitter", ["BaseEventEmitter"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = new(c("BaseEventEmitter"))();
    b = a;
    g["default"] = b
}), 98);
__d("requireWeak", [], (function(a, b, c, d, e, f) {
    function a(a, b) {
        d && d.call(null, [a], b)
    }
    f["default"] = a
}), 66);
__d("ClientConsistency", ["ClientConsistencyEventEmitter", "SiteData", "requireWeak"], (function(a, b, c, d, e, f) {
    "use strict";
    var g = b("SiteData").client_revision,
        h = !1,
        i, j = {},
        k = new Set(),
        l = new Set(),
        m = function(a) {
            j = {};
            var c = Object.keys(a).sort().reverse();
            i === "multiple_revs" && (i = void 0);
            var d = function() {
                if (f) {
                    if (g >= e.length) return "break";
                    h = e[g++]
                } else {
                    g = e.next();
                    if (g.done) return "break";
                    h = g.value
                }
                var c = h,
                    d = Number(c);
                c = (c = a[d]) != null ? c : [];
                if (c.length === 0) {
                    n(d);
                    return "break"
                }
                c.forEach(function(a) {
                    var c;
                    j[a] = Math.max((c = j[a]) != null ? c : 0, d);
                    if (l.has(a)) return;
                    l.add(a);
                    b("requireWeak").call(null, a, function() {
                        if (!j[a]) return;
                        n(j[a])
                    })
                })
            };
            for (var e = c, f = Array.isArray(e), g = 0, e = f ? e : e[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var h;
                c = d();
                if (c === "break") break
            }
        },
        n = function(a) {
            a > 0 && i == null && (i = "multiple_revs"), a === 2 && b("ClientConsistencyEventEmitter").emit("softRefresh", "multiple_revs"), a === 3 && b("ClientConsistencyEventEmitter").emit("hardRefresh", "multiple_revs")
        },
        o = function(a) {
            var b = a.actions;
            a = a.rev;
            if (a === g) return;
            i === "multiple_revs" && (i = void 0);
            b != null && m(b)
        };
    a = {
        init: function() {
            if (h) return;
            b("ClientConsistencyEventEmitter").addListener("newEntry", function(a) {
                o(a)
            });
            b("ClientConsistencyEventEmitter").addListener("softRefresh", function(a) {
                i = a
            });
            b("ClientConsistencyEventEmitter").addListener("hardRefresh", function(a) {
                i = a
            });
            h = !0
        },
        addAdditionalRevision: function(a) {
            a !== g && (k.add(a), b("ClientConsistencyEventEmitter").emit("newRevision", a))
        },
        getAdditionalRevisions: function() {
            return k
        },
        getPendingRefresh: function() {
            return i
        }
    };
    e.exports = a
}), null);
__d("ErrorPubSub", ["fb-error"], (function(a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = c("fb-error").ErrorPubSub
}), 98);
__d("JSResourceEvents", ["performanceAbsoluteNow"], (function(a, b, c, d, e, f, g) {
    var h = 50,
        i = new Map();

    function a(a, b, d) {
        a = a;
        b = (b = b) != null ? b : "";
        var e = i.get(a);
        e || i.set(a, e = new Map());
        a = e.get(b);
        a || e.set(b, a = new Map());
        e = a.get(d);
        e || a.set(d, e = [0, []]);
        e[1][e[0]++ % h] = c("performanceAbsoluteNow")()
    }

    function j(a, b, c) {
        var d = i.get(a);
        if (!d) return [];
        var e = [];
        for (var d = d, g = Array.isArray(d), h = 0, d = g ? d : d[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
            var j;
            if (g) {
                if (h >= d.length) break;
                j = d[h++]
            } else {
                h = d.next();
                if (h.done) break;
                j = h.value
            }
            j = j;
            var k = j[0];
            j = j[1];
            for (var j = j, l = Array.isArray(j), m = 0, j = l ? j : j[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var n;
                if (l) {
                    if (m >= j.length) break;
                    n = j[m++]
                } else {
                    m = j.next();
                    if (m.done) break;
                    n = m.value
                }
                n = n;
                var o = n[0];
                n = n[1];
                for (var n = n[1], p = Array.isArray(n), q = 0, n = p ? n : n[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                    var r;
                    if (p) {
                        if (q >= n.length) break;
                        r = n[q++]
                    } else {
                        q = n.next();
                        if (q.done) break;
                        r = q.value
                    }
                    r = r;
                    r >= b && r <= c && e.push({
                        module: a,
                        ref: k || null,
                        type: o,
                        time: r
                    })
                }
            }
        }
        return e.sort(function(a, b) {
            return a.time - b.time
        })
    }

    function b(a, b) {
        var c = new Map();
        for (var d = i.keys(), e = Array.isArray(d), f = 0, d = e ? d : d[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
            var g;
            if (e) {
                if (f >= d.length) break;
                g = d[f++]
            } else {
                f = d.next();
                if (f.done) break;
                g = f.value
            }
            g = g;
            var h = j(g, a, b);
            h.length && c.set(g, h)
        }
        return c
    }
    g.notify = a;
    g.getEvents = j;
    g.getAllModuleEvents = b
}), 98);
__d("Promise", ["cr:6640"], (function(a, b, c, d, e, f) {
    "use strict";
    var g = (c = b("cr:6640")) != null ? c : a.Promise;
    g.allSettled || (g.allSettled = function(a) {
        var b;
        if ((typeof Symbol === "function" ? Symbol.iterator : "@@iterator") in a) b = Array.from(a);
        else return g.reject(new TypeError("Promise.allSettled must be passed an iterable."));
        var c = Array(b.length);
        a = function(a, d) {
            var e = b[a];
            d = typeof e === "object" && e !== null && typeof e.then === "function";
            c[a] = d ? new g(function(a, b) {
                e.then(function(b) {
                    a({
                        status: "fulfilled",
                        value: b
                    })
                }, function(b) {
                    a({
                        status: "rejected",
                        reason: b
                    })
                })
            }) : g.resolve({
                status: "fulfilled",
                value: e
            })
        };
        for (var d = 0, e = b.length; d < e; ++d) a(d, e);
        return g.all(c)
    });
    g.prototype["finally"] || (g.prototype["finally"] = function(a) {
        return this.then(function(b) {
            return g.resolve(a()).then(function() {
                return b
            })
        }, function(b) {
            return g.resolve(a()).then(function() {
                throw b
            })
        })
    });
    e.exports = g
}), null);
__d("PromiseAnnotate", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a, b) {
        a.displayName = b;
        return a
    }

    function b(a) {
        a = a.displayName;
        if (typeof a === "string") return a;
        else return null
    }
    f.setDisplayName = a;
    f.getDisplayName = b
}), 66);
__d("ifRequireable", ["ifRequired"], (function(a, b, c, d, e, f, g) {
    function a(a, b, d) {
        return c("ifRequired").call(null, a, b, d)
    }
    g["default"] = a
}), 98);
__d("JSResourceReferenceImpl", ["JSResourceEvents", "Promise", "PromiseAnnotate", "ifRequireable", "ifRequired"], (function(a, b, c, d, e, f, g) {
    var h = function(a) {
            return a
        },
        i = [],
        j = null;

    function k(a) {
        j ? a(j) : i.push(a)
    }
    var l = "JSResource: unknown caller";
    a = function() {
        a.setBootloader = function(a) {
            j = a;
            for (a = 0; a < i.length; a++) {
                var b = i[a];
                b(j)
            }
            i = []
        };

        function a(a) {
            this.$1 = a
        }
        var e = a.prototype;
        e.getModuleId = function() {
            var a = this.$1;
            return a
        };
        e.getModuleIdAsRef = function() {
            return this.$1
        };
        e.load = function() {
            var a = this,
                c = this.$2;
            d("JSResourceEvents").notify(this.$1, c, "LOADED");
            var e = new(b("Promise"))(function(b) {
                k(function(e) {
                    return e.loadModules([a.getModuleIdAsRef()], function(e) {
                        d("JSResourceEvents").notify(a.$1, c, "PROMISE_RESOLVED"), b(e)
                    }, (e = a.$2) != null ? e : l)
                })
            });
            d("PromiseAnnotate").setDisplayName(e, "Bootload(" + this.getModuleId() + ")");
            return e
        };
        e.preload = function() {
            var a, b = this,
                c = (a = this.$2) != null ? a : l;
            k(function(a) {
                return a.loadModules([b.getModuleIdAsRef()], function() {}, "preload: " + c)
            })
        };
        e.equals = function(a) {
            return this === a || this.$1 == a.$1
        };
        e.getModuleIfRequireable = function() {
            d("JSResourceEvents").notify(this.$1, this.$2, "ACCESSED");
            return c("ifRequireable").call(null, this.$1, h)
        };
        e.getModuleIfRequired = function() {
            d("JSResourceEvents").notify(this.$1, this.$2, "ACCESSED");
            return c("ifRequired").call(null, this.$1, h)
        };
        e.__setRef = function(a) {
            this.$2 = a;
            d("JSResourceEvents").notify(this.$1, this.$2, "CREATED");
            return this
        };
        a.loadAll = function(a, b) {
            var c = {},
                e = !1;
            for (var f = a, g = Array.isArray(f), h = 0, f = g ? f : f[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var i;
                if (g) {
                    if (h >= f.length) break;
                    i = f[h++]
                } else {
                    h = f.next();
                    if (h.done) break;
                    i = h.value
                }
                i = i;
                var j = i.$2;
                j && (e = !0, c[j] = !0);
                d("JSResourceEvents").notify(i.$1, j, "LOADED")
            }
            k(function(d) {
                return d.loadModules(a.map(function(a) {
                    return a.getModuleId()
                }), b, e ? Object.keys(c).join(":") : "JSResource: unknown caller")
            })
        };
        return a
    }();
    g["default"] = a
}), 98);
__d("MakeHasteTranslationsMap", ["invariant"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = {};

    function a(a) {
        Object.assign(i, a)
    }

    function b(a) {
        a in i || h(0, 62571, a);
        return i[a]
    }
    g.setBatch = a;
    g.get = b
}), 98);
__d("MakeHasteTranslations", ["BootloaderConfig", "BootloaderRetryTracker", "ExecutionEnvironment", "FBLogger", "MakeHasteTranslationsMap", "Promise", "TimeSlice", "err", "fb-error", "getSameOriginTransport"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = new(c("BootloaderRetryTracker"))({
        retries: (f = c("BootloaderConfig").translationRetries) != null ? f : c("BootloaderConfig").jsRetries,
        abortNum: (f = c("BootloaderConfig").translationRetryAbortNum) != null ? f : c("BootloaderConfig").jsRetryAbortNum,
        abortTime: (f = c("BootloaderConfig").translationRetryAbortTime) != null ? f : c("BootloaderConfig").jsRetryAbortTime,
        abortCallback: function() {
            c("FBLogger")("binary_transparency").warn("Translations retry abort")
        }
    });

    function i() {
        a.__translationFetchTracker || (a.__translationFetchTracker = {});
        return a.__translationFetchTracker
    }

    function j(a) {
        a = JSON.parse(a);
        if (a != null && typeof a === "object" && typeof a.translations === "object" && Array.isArray(a.virtual_modules)) return a;
        throw c("err")("Invalid response shape")
    }

    function k(a) {
        return new(b("Promise"))(function(b, d) {
            var e = c("TimeSlice").getGuardedContinuation("MakeHasteTranslationsFetcher genSendRequest"),
                f = c("getSameOriginTransport")();
            f.open("GET", a, !0);
            f.onreadystatechange = function(g) {
                if (f.readyState !== 4) return;
                e(function() {
                    c("fb-error").ErrorXFBDebug.addFromXHR(f);
                    try {
                        if (f.status !== 200) throw c("err")("Received non-200 response");
                        b(j(f.responseText))
                    } catch (e) {
                        h.maybeScheduleRetry(a, function() {
                            return b(k(a))
                        }, function() {
                            return d(c("err")("Error processing response. XHR Error: %s, XHR status: %s, Response Text: %s", e.toString(), f.status, f.responseText.length > 300 ? f.responseText.slice(0, 300) + "..." : f.responseText))
                        })
                    }
                })
            };
            f.send()
        })
    }
    var l = "data:application/json;base64";

    function m(a) {
        if (!a.includes(l)) throw c("err")("Invalid data uri mime type");
        a = a.split(",");
        a[0];
        a = a[1];
        if (a == null) throw c("err")("Data uri contains no contents");
        return j(atob(a))
    }

    function n(e, f) {
        var g = i();
        if (!c("ExecutionEnvironment").canUseDOM || g[e] === "fetching" || g[e] === "fetched") return;
        b("Promise").resolve().then(function() {
            g[e] = "fetching";
            return f.includes(l) ? m(f) : k(f)
        }).then(function(b) {
            d("MakeHasteTranslationsMap").setBatch(b.translations), b.virtual_modules.forEach(function(b) {
                return a.define(b, {})
            }), g[e] = "fetched"
        })["catch"](function(a) {
            g[e] = "failed", c("FBLogger")("binary_transparency", "translation_download_error").catching(a).warn("Unable to download and process translation map. Url: %s", f)
        })
    }

    function e(a) {
        a = Object.entries(a);
        for (var b = 0; b < a.length; b++) {
            var c = a[b],
                d = c[0];
            c = c[1];
            n(d, c)
        }
    }
    g.genFetchAndProcessTranslations = n;
    g.fetchTranslationsForEarlyFlush = e
}), 98);
__d("RequireDeferredFactoryEvent", ["$InternalEnum"], (function(a, b, c, d, e, f) {
    a = b("$InternalEnum")({
        SUPPORT_DATA: "sd",
        CSS: "css"
    });
    c = a;
    f["default"] = c
}), 66);
__d("getErrorSafe", ["fb-error"], (function(a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = c("fb-error").getErrorSafe
}), 98);
__d("promiseDone", ["ErrorPubSub", "emptyFunction", "getErrorSafe"], (function(a, b, c, d, e, f, g) {
    function a(a, b, d) {
        var e = arguments.length > 1 ? a.then(b, d) : a;
        e.then(c("emptyFunction"), function(a) {
            a = c("getErrorSafe")(a);
            a.loggingSource = "PROMISE_DONE";
            c("ErrorPubSub").reportError(a)
        })
    }
    g["default"] = a
}), 98);
__d("RequireDeferredReference", ["CallbackDependencyManager", "Promise", "RequireDeferredFactoryEvent", "ifRequireable", "ifRequired", "performanceNow", "promiseDone", "requireWeak"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = 1;
    d = 2;
    e = 16;
    var h = a | d | e,
        i = null;

    function j() {
        i == null && (i = new(c("CallbackDependencyManager"))());
        return i
    }

    function k(a, b) {
        return a + ":" + b
    }
    var l = new Set();
    f = function() {
        function a(a) {
            this.$1 = a
        }
        var d = a.prototype;
        d.getModuleId = function() {
            var a = this.$1;
            return a
        };
        d.getModuleIdAsRef = function() {
            return this.$1
        };
        d.preload = function() {};
        d.getModuleIfRequired = function() {
            return c("ifRequired").call(null, this.$1, function(a) {
                return a
            })
        };
        d.getModuleIfRequireable = function() {
            return c("ifRequireable").call(null, this.$1, function(a) {
                return a
            })
        };
        d.$2 = function(a) {
            var b = this,
                d = c("ifRequireable")("InteractionTracingMetrics", function(a) {
                    return a.currentInteractionLogger().addRequireDeferred(b.getModuleId(), c("performanceNow")())
                }),
                e = !1,
                f = function(b, f) {
                    d == null ? void 0 : d(c("performanceNow")(), f), e || a(b)
                };
            c("ifRequireable").call(null, this.$1, function(a) {
                return f(a, !0)
            }, function() {
                c("requireWeak").call(null, b.$1, function(a) {
                    return f(a, !1)
                })
            });
            return {
                remove: function() {
                    e = !0
                }
            }
        };
        d.load = function() {
            var a = this;
            return new(b("Promise"))(function(b) {
                return a.$2(b)
            })
        };
        d.__setRef = function(a) {
            return this
        };
        d.onReadyImmediately = function(a) {
            return this.$2(a)
        };
        d.onReady = function(a) {
            var d = !1,
                e = this.$2(function(e) {
                    c("promiseDone")(b("Promise").resolve().then(function() {
                        d || a(e)
                    }))
                });
            return {
                remove: function() {
                    d = !0, e.remove()
                }
            }
        };
        d.loadImmediately = function(a) {
            return this.$2(a)
        };
        a.getRDModuleName_DO_NOT_USE = function(a) {
            return "rd:" + a
        };
        a.unblock = function(d, e) {
            var f = j(),
                g = function() {
                    var g = d[i];
                    l.has(g) || (l.add(g), f.registerCallback(function() {
                        define(a.getRDModuleName_DO_NOT_USE(g), [g], function() {
                            b.call(null, g)
                        }, h)
                    }, Array.from(c("RequireDeferredFactoryEvent").members(), function(a) {
                        return k(g, a)
                    })));
                    f.satisfyPersistentDependency(k(g, e))
                };
            for (var i = 0; i < d.length; i++) g()
        };
        return a
    }();
    g["default"] = f
}), 98);
__d("ResourceHasher", ["invariant"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = 0;

    function a(a) {
        return "async:" + a
    }

    function b() {
        return "ejs:" + i++
    }

    function c(a) {
        typeof a === "string" || h(0, 19551, a);
        return a
    }
    g.getAsyncHash = a;
    g.createExternalJSHash = b;
    g.getValidResourceHash = c
}), 98);
__d("TrustedTypesPolicyName", ["$InternalEnum"], (function(a, b, c, d, e, f) {
    a = b("$InternalEnum")({
        DEFAULT: "default",
        NOOP_DO_NOT_USE: "noop-do-not-use",
        UNSAFE_FUNCTION_DO_NOT_USE: "unsafe-function-do-not-use",
        DDS_INLINE_STYLE: "dds-inline-style",
        GHL_PLUS_HTML: "ghl-plus-html",
        LINK_TAG_HTML: "link-tag-html",
        BOOTLOADER_DATA_URI: "bootloader-data-uri",
        OC_URI_SCRIPT_URL: "oc-uri-script-urls",
        FB_URI_SCRIPT_URL: "fb-uri-script-urls",
        META_URI_SCRIPT_URL: "meta-uri-script-urls",
        RL_TEALIUM_CDN_URI: "rl-tealium-cdn-uri",
        SAME_ORIGIN_SCRIPT_URL: "same-origin-script-urls",
        WEB_WORKER_URL: "web-worker-url",
        YOUTUBE_IFRAME_URL: "youtube-iframe-uri",
        IORG_WEB_WORKER_POLICY: "iorg-web-worker-policy",
        BIG_PIPE_MARKUP: "big-pipe-markup",
        GOOGLE_ANALYTICS_URL: "google-analytics-url",
        FBQ_SCRIPT_URL: "fbq-script-url",
        DOM_IE_FIX: "dom-ie-fix",
        OZ_PLAYER_XML: "oz-player-xml"
    });
    c = a;
    f["default"] = c
}), 66);
__d("TrustedTypesUtils", ["FBLogger"], (function(a, b, c, d, e, f, g) {
    var h = typeof window !== "undefined";
    f = function(a) {
        return a
    };

    function a(a) {
        var b = h && typeof window.origin !== "undefined" ? window.origin : "undefined";
        c("FBLogger")("saf_web_trusted_types_rollout", b).blameToPreviousFrame().blameToPreviousFrame().warn(a);
        return a
    }

    function b(a) {
        c("FBLogger")("saf_web").info("[Trusted-Types][%s]: %s", h && typeof window.origin !== "undefined" ? window.origin : "undefined", a)
    }

    function i(a) {
        c("FBLogger")("saf_web").warn("[Trusted-Types][%s]: %s", h && typeof window.origin !== "undefined" ? window.origin : "undefined", a)
    }

    function d(a) {
        c("FBLogger")("saf_web").mustfix("[Trusted-Types][%s]: %s", h && typeof window.origin !== "undefined" ? window.origin : "undefined", a)
    }

    function e(a, b) {
        i("String '" + a.toString().slice(0, 15) + "' is flowing to DOM XSS sink. Default Trusted Type policy was executed and removed dangerous elements. " + ("Returned string is: '" + b.toString().slice(0, 15) + "' If this is breaking your feature, post in ") + "Security Infra group.")
    }
    g.isBrowser = h;
    g.noop = f;
    g.noopAndLog = a;
    g.logInfo = b;
    g.logWarning = i;
    g.logError = d;
    g.logDefaultPolicySanitization = e
}), 98);
__d("TrustedTypes", ["Env", "TrustedTypesUtils"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a() {
        return d("TrustedTypesUtils").isBrowser && typeof window.trustedTypes !== "undefined"
    }
    var h = a() ? window.trustedTypes : null,
        i = new Map(),
        j = {
            createHTML: d("TrustedTypesUtils").noop,
            createScriptURL: d("TrustedTypesUtils").noop,
            createScript: d("TrustedTypesUtils").noop
        };

    function k(a, b) {
        return function(e) {
            for (var f = arguments.length, g = new Array(f > 1 ? f - 1 : 0), h = 1; h < f; h++) g[h - 1] = arguments[h];
            if (c("Env").isTrustedTypesReportOnly) try {
                return b.apply(void 0, [e].concat(g))
            } catch (b) {
                d("TrustedTypesUtils").logError("Exception in policy " + a + ": " + b.message + ", returning original string.");
                return a === "default" ? !1 : e
            }
            return b.apply(void 0, [e].concat(g))
        }
    }

    function l(a, b) {
        if (h == null || !c("Env").useTrustedTypes) return j;
        var e = i.get(a);
        if (e != null) {
            d("TrustedTypesUtils").logWarning("A policy with name " + a + " already exists, returning existing policy.");
            return e
        }
        try {
            e = h.createPolicy(a, b);
            b = {
                createHTML: k(a, e.createHTML.bind(e)),
                createScriptURL: k(a, e.createScriptURL.bind(e)),
                createScript: k(a, e.createScript.bind(e))
            };
            i.set(a, b);
            return b
        } catch (a) {
            d("TrustedTypesUtils").logError("Error creating Trusted Types policy: " + a)
        }
        return j
    }

    function b() {
        return i.get("default")
    }

    function e(a) {
        return (a = h == null ? void 0 : h.isHTML(a)) != null ? a : !1
    }

    function f(a) {
        return (a = h == null ? void 0 : h.isScriptURL(a)) != null ? a : !1
    }

    function m(a) {
        return (a = h == null ? void 0 : h.isScript(a)) != null ? a : !1
    }

    function n(a) {
        if (h == null || !c("Env").useTrustedTypes) return;
        if (!c("Env").enableDefaultTrustedTypesPolicy) return;
        l("default", {
            createHTML: a.createHTML,
            createScriptURL: a.createScriptURL,
            createScript: a.createScript
        })
    }
    a = {
        isSupportedNatively: a,
        isHTML: e,
        isScript: m,
        isScriptURL: f,
        createPolicy: l,
        getDefaultPolicy: b,
        createDefaultPolicy: n
    };
    g["default"] = a
}), 98);
__d("TrustedTypesBootloaderDataURIScriptURLPolicy", ["TrustedTypes"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = {
        createScriptURL: function(a) {
            return a
        }
    };
    b = c("TrustedTypes").createPolicy("bootloader-data-uri", a);
    d = b;
    g["default"] = d
}), 98);
__d("isExternalFBURI", [], (function(a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)externalfb\\.com$", "i");

    function a(a) {
        return g.test(a.getDomain())
    }
    f["default"] = a
}), 66);
__d("isFacebookDotNetURI", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        if (a.getProtocol() !== "http" && a.getProtocol() !== "https") return !1;
        var b = Number(a.getPort());
        if (!!b && b !== 80 && b !== 443) return !1;
        return a.isSubdomainOfDomain("facebook.net") ? !0 : !1
    }
    f["default"] = a
}), 66);
__d("isInstagramCDNURI", [], (function(a, b, c, d, e, f) {
    var g = null;

    function a(a) {
        if (a.isEmpty() && a.toString() !== "#") return !1;
        if (!a.getDomain() && !a.getProtocol()) return !1;
        if (a.getProtocol() !== "https") return !1;
        g || (g = new RegExp("^static\\.cdninstagram\\.com$", "i"));
        return g.test(a.getDomain())
    }
    f["default"] = a
}), 66);
__d("isInstagramURI", [], (function(a, b, c, d, e, f) {
    var g = null;

    function a(a) {
        if (a.isEmpty() && a.toString() !== "#") return !1;
        if (!a.getDomain() && !a.getProtocol()) return !1;
        if (a.getProtocol() !== "https") return !1;
        g || (g = new RegExp("(^|\\.)instagram\\.com$", "i"));
        return g.test(a.getDomain())
    }
    f["default"] = a
}), 66);
__d("isInternURI", [], (function(a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)intern(mc)?\\.facebook\\.com$", "i");

    function a(a) {
        return g.test(a.getDomain())
    }
    f["default"] = a
}), 66);
__d("isOculusDotComURI", [], (function(a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)oculus\\.com$", "i"),
        h = ["https"];

    function a(a) {
        if (a.isEmpty() && a.toString() !== "#") return !1;
        return !a.getDomain() && !a.getProtocol() ? !1 : h.indexOf(a.getProtocol()) !== -1 && g.test(a.getDomain())
    }
    f["default"] = a
}), 66);
__d("TrustedTypesMetaURIScriptURLPolicy", ["TrustedTypes", "URI", "err", "isCdnURI", "isExternalFBURI", "isFacebookDotNetURI", "isFacebookURI", "isInstagramCDNURI", "isInstagramURI", "isInternURI", "isInternalFBURI", "isOculusDotComURI"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = {
        createScriptURL: function(a) {
            var b = c("URI").tryParseURI(a);
            if (b != null && (c("isFacebookURI")(b) || c("isCdnURI")(b) || c("isFacebookDotNetURI")(b) || c("isExternalFBURI")(b) || c("isOculusDotComURI")(b) || c("isInstagramCDNURI")(b) || c("isInstagramURI")(b) || c("isInternURI")(b) || c("isInternalFBURI")(b))) return a;
            throw c("err")("Violated policy TrustedTypesMetaURIScriptURLPolicy: " + a + " is not a Meta URI.")
        }
    };
    b = c("TrustedTypes").createPolicy("meta-uri-script-urls", a);
    d = b;
    g["default"] = d
}), 98);
__d("setTimeoutAcrossTransitions", ["cr:986633"], (function(a, b, c, d, e, f, g) {
    g["default"] = b("cr:986633")
}), 98);
__d("Bootloader", ["invariant", "BootloaderConfig", "BootloaderEndpoint", "BootloaderEvents", "BootloaderEventsManager", "BootloaderRetryTracker", "CSRBitMap", "CSRIndexUtil", "CSSLoader", "CSSLoaderConfig", "ClientConsistency", "ErrorPubSub", "ExecutionEnvironment", "FBLogger", "JSResourceReferenceImpl", "MakeHasteTranslations", "NetworkStatus", "RequireDeferredReference", "ResourceHasher", "ResourceTimingsStore", "SiteData", "TimeSlice", "TrustedTypesBootloaderDataURIScriptURLPolicy", "TrustedTypesMetaURIScriptURLPolicy", "cr:696703", "err", "fb-error", "ifRequireable", "ifRequired", "nullthrows", "performanceAbsoluteNow", "performanceNow", "setTimeoutAcrossTransitions"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = function() {},
        j = new Set(),
        k = !!c("BootloaderConfig").deferBootloads;
    k && !a.__comet_ssr_is_server_env_DO_NOT_USE && c("setTimeoutAcrossTransitions")(function() {
        $.undeferBootloads(!0)
    }, 15e3);
    var l = [],
        m = new Map(),
        n = new Map(),
        o = new Map(),
        p = new Map(),
        q = new Map(),
        r = null,
        s = new Map(),
        t = new Map(),
        u = new Map(),
        v = new Map(),
        w = new Set(),
        x = !1,
        y = new Set(),
        z = !1,
        A = new(c("BootloaderEventsManager"))(),
        B = new(c("BootloaderRetryTracker"))({
            retries: c("BootloaderConfig").jsRetries,
            abortNum: c("BootloaderConfig").jsRetryAbortNum,
            abortTime: c("BootloaderConfig").jsRetryAbortTime,
            abortCallback: function() {
                c("FBLogger")("bootloader", "js_retry_abort").info("JS retry abort")
            }
        });
    c("ErrorPubSub").unshiftListener(function(a) {
        var b = [];
        for (var c = n, d = Array.isArray(c), e = 0, c = d ? c : c[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
            var f;
            if (d) {
                if (e >= c.length) break;
                f = c[e++]
            } else {
                e = c.next();
                if (e.done) break;
                f = e.value
            }
            f = f;
            var g = f[0];
            f[1];
            if (o.has(g)) continue;
            f = F(g);
            if (f.type === "csr" || f.type === "async") continue;
            b.push(f.src)
        }
        a.loadingUrls = b
    });

    function C(a) {
        if (k || !z) return !1;
        for (var b = 0; b < a.length; b++) {
            var c, d = a[b];
            d = q.get(d);
            if (!d) return !1;
            d = [d.r, ((c = d.rdfds) == null ? void 0 : c.r) || [], ((c = d.rds) == null ? void 0 : c.r) || []];
            for (c = 0; c < d.length; c++) {
                var e = d[c];
                for (var e = e, f = Array.isArray(e), g = 0, e = f ? e : e[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                    var h;
                    if (f) {
                        if (g >= e.length) break;
                        h = e[g++]
                    } else {
                        g = e.next();
                        if (g.done) break;
                        h = g.value
                    }
                    h = h;
                    if (!s.has(h)) return !1
                }
            }
        }
        return !0
    }

    function D(a) {
        var b = q.get(a);
        if (!b) throw c("fb-error").TAAL.blameToPreviousFile(c("err")("Bootloader: %s is not in the component map", a));
        return b
    }

    function E(a) {
        var b = D(a);
        b.be && (delete b.be, $.done(d("ResourceHasher").getAsyncHash(a)))
    }

    function F(a) {
        var b = s.get(a);
        if (!b) throw c("fb-error").TAAL.blameToPreviousFile(c("err")("No resource entry for hash: %s", a));
        return b
    }

    function G(a, b) {
        var c = d("ResourceHasher").getAsyncHash(a);
        if (!s.has(c)) s.set(c, {
            type: "async",
            module: a,
            blocking: !!b
        });
        else {
            a = F(c);
            a.type === "async" || h(0, 21557);
            a.blocking && !b && (a.blocking = !1)
        }
        return c
    }

    function H() {
        r || (r = document.head || document.getElementsByTagName("head")[0] || document.body);
        return r
    }

    function I(a) {
        if (c("ExecutionEnvironment").isInWorker) {
            a(null);
            return
        }
        var b = document.createDocumentFragment();
        a(b);
        H().appendChild(b)
    }

    function J(a, b) {
        if (c("ExecutionEnvironment").isInWorker) return;
        b = c("nullthrows")(b);
        var d = void 0;
        switch (a.type) {
            case "async":
                return;
            case "css":
                d = "style";
                break;
            case "js":
                d = "script";
                break;
            default:
                d = a.type, h(0, 3721)
        }
        if (a.d === 1) return;
        var e = document.createElement("link");
        e.href = a.src;
        e.rel = "preload";
        e.as = d;
        a.nc || (e.crossOrigin = "anonymous");
        b.appendChild(e)
    }

    function K(a, b, d) {
        var e = c("performanceAbsoluteNow")(),
            f = b.src,
            g = c("ResourceTimingsStore").getUID("js", f);
        c("ResourceTimingsStore").annotate("js", g).addStringAnnotation("name", a).addStringAnnotation("source", f);
        c("ResourceTimingsStore").measureRequestSent("js", g);
        c("nullthrows")(self.bl_worker_import_wrapper)(f).then(function() {
            var b = B.getNumRetriesForSource(f);
            b > 0 && c("FBLogger")("bootloader").info("JS retry success [%s] at %s | time: %s | retries: %s", a, f, c("performanceAbsoluteNow")() - e, b);
            c("ResourceTimingsStore").measureResponseReceived("js", g);
            d()
        })["catch"](function(h) {
            c("ResourceTimingsStore").measureResponseReceived("js", g);
            var i = c("performanceAbsoluteNow")();
            B.maybeScheduleRetry(f, function() {
                K(a, b, d)
            }, function() {
                p.set(a, i), c("FBLogger")("bootloader").catching(h).warn("JS loading error [%s] at %s | time: %s | retries: %s | concurrency: %s", a, f, i - e, B.getNumRetriesForSource(f), n.size - o.size), c("NetworkStatus").reportError(), d()
            })
        })
    }

    function L(a, b, d, e) {
        if (c("ExecutionEnvironment").isInWorker) {
            K(a, b, d);
            return
        }
        e = c("nullthrows")(e);
        var f = document.createElement("script");
        b.d ? f.src = c("TrustedTypesBootloaderDataURIScriptURLPolicy").createScriptURL(b.src) : f.src = c("TrustedTypesMetaURIScriptURLPolicy").createScriptURL(b.src);
        f.async = !0;
        b.nc || (f.crossOrigin = "anonymous");
        b.m != null && (f.dataset.btmanifest = b.m);
        b.tsrc != null && (f.dataset.tsrc = b.tsrc);
        f.dataset.bootloaderHashClient = a;
        M(f, a, b, d);
        e.appendChild(f);
        return
    }

    function M(a, b, d, e) {
        var f = a.src,
            g = c("performanceAbsoluteNow")(),
            h = c("TimeSlice").getGuardedContinuation("Bootloader script.onresponse"),
            i = c("ResourceTimingsStore").getUID("js", f);
        c("ResourceTimingsStore").annotate("js", i).addStringAnnotation("name", b).addStringAnnotation("source", f);
        c("ifRequireable")("TimeSliceInteraction", function(a) {
            a.informGlobally("bootloader._loadJS").addStringAnnotation("source", f).addStringAnnotation("name", b)
        });
        c("ResourceTimingsStore").measureRequestSent("js", i);
        a.onload = h.bind(void 0, function() {
            var a = B.getNumRetriesForSource(f);
            a > 0 && c("FBLogger")("bootloader").info("JS retry success [%s] at %s | time: %s | retries: %s", b, f, c("performanceAbsoluteNow")() - g, a);
            c("ResourceTimingsStore").measureResponseReceived("js", i);
            e()
        });
        a.onerror = h.bind(void 0, function() {
            c("ResourceTimingsStore").measureResponseReceived("js", i);
            var h = c("performanceAbsoluteNow")();
            B.maybeScheduleRetry(f, function() {
                var c = a.parentNode;
                c && (c.removeChild(a), L(b, d, e, c))
            }, function() {
                p.set(b, h), c("FBLogger")("bootloader").warn("JS loading error [%s] at %s | time: %s | retries: %s | concurrency: %s", b, f, h - g, B.getNumRetriesForSource(f), n.size - o.size), c("NetworkStatus").reportError(), e()
            })
        })
    }

    function N(a, b, d) {
        return function() {
            c("FBLogger")("bootloader").warn("CSS timeout [%s] at %s | concurrency: %s", a, b.src, n.size - o.size), p.set(a, c("performanceAbsoluteNow")()), c("NetworkStatus").reportError(), d()
        }
    }

    function O(a, b) {
        var c = a.replace(/\/y[a-zA-Z0-9_-]\//, "/");
        if (c.includes("/intern/rsrc.php") || c.includes("/intern/rsrc-translations.php")) return c.replace(/(!)(.+)(\.(?:css|js)(?:$|\?))/, function(a, c, d, e) {
            return c + d.split(",").filter(function(a, c) {
                return !b.has(c)
            }).join(",") + e
        });
        else if (c.includes("/rsrc.php") || c.includes("/rsrc-translations.php")) return c.replace(/(.*\/)([^.]+)(\.)/, function(a, c, d, e) {
            return c + d.match(/.{1,11}/g).filter(function(a, c) {
                return !b.has(c)
            }).join("") + e
        });
        else return a
    }

    function P(a, b, e) {
        if (n.has(a)) return;
        n.set(a, c("performanceAbsoluteNow")());
        if ((b.type === "js" || b.type === "css") && b.p != null && b.d !== 1 && c("BootloaderConfig").hypStep4) {
            var f = d("CSRIndexUtil").parseCSRIndexes(b.p),
                g = new Set(),
                i = 0;
            f.forEach(function(b, c) {
                b !== d("CSRIndexUtil").UNKNOWN_RESOURCE_INDEX && t.get(b) !== a && g.add(c), b > i && (i = b)
            });
            i > c("BootloaderConfig").btCutoffIndex && d("BootloaderEvents").notifyResourceInLongTailBTManifest();
            if (g.size === f.length) return;
            else g.size > 0 && (b.src = O(b.src, g), b.type === "js" && b.tsrc != null && b.tsrc.trim() !== "" && (b.tsrc = O(b.tsrc, g)))
        }
        b.type === "js" && b.tsrc != null && b.tsrc.trim() !== "" && d("MakeHasteTranslations").genFetchAndProcessTranslations(a, b.tsrc);
        J(b, e);
        switch (b.type) {
            case "js":
                L(a, b, function() {
                    return $.done(a)
                }, e);
                break;
            case "css":
                f = function() {
                    return $.done(a)
                };
                if (c("ExecutionEnvironment").isInWorker) {
                    f();
                    break
                }
                c("CSSLoader").loadStyleSheet(a, b.src, c("nullthrows")(e), !b.nc, f, N(a, b, f));
                break;
            case "async":
                c("BootloaderEndpoint").load(b.module, b.blocking, a);
                break;
            default:
                b.type, h(0, 3721)
        }
    }

    function Q(a, c, e, f) {
        var g = new Map(),
            i = (f = f) != null ? f : d("BootloaderEvents").newResourceMapSet();
        f = [];
        var j = [],
            k = [];
        for (var a = W(a), l = Array.isArray(a), m = 0, a = l ? a : a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
            var o;
            if (l) {
                if (m >= a.length) break;
                o = a[m++]
            } else {
                m = a.next();
                if (m.done) break;
                o = m.value
            }
            o = o;
            var p = o[0];
            o = o[1];
            var q = void 0;
            switch (o.type) {
                case "css":
                    q = o.nonblocking ? "nonblocking" : "blocking";
                    break;
                case "js":
                    q = "default";
                    break;
                case "async":
                    q = o.blocking ? "blocking" : "nonblocking";
                    break;
                default:
                    o.type, h(0, 3721)
            }
            i[q].set(p, o);
            var r = A.rsrcDone(p);
            k.push(r);
            q !== "nonblocking" && (j.push(r), q === "blocking" && f.push(r));
            n.has(p) || g.set(p, o)
        }
        var s, t;
        !b("cr:696703") ? s = t = function(a) {
            return a()
        } : (t = b("cr:696703").scheduleLoggingPriCallback, s = b("cr:696703").getUserBlockingRunAtCurrentPriCallbackScheduler_DO_NOT_USE());
        var u = c.onBlocking,
            v = c.onAll,
            w = c.onLog;
        u && A.registerCallback(function() {
            s(u)
        }, f);
        v && A.registerCallback(function() {
            s(v)
        }, j);
        w && A.registerCallback(function() {
            t(function() {
                return w(i)
            })
        }, k);
        for (q = g, r = Array.isArray(q), p = 0, q = r ? q : q[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
            if (r) {
                if (p >= q.length) break;
                o = q[p++]
            } else {
                p = q.next();
                if (p.done) break;
                o = p.value
            }
            m = o;
            l = m[0];
            a = m[1];
            P(l, a, e)
        }
    }

    function R(a, b, e) {
        s.set(a, b);
        if (b.type === "async" || b.type === "csr") return;
        var f = b.p;
        if (f)
            for (var f = d("CSRIndexUtil").parseCSRIndexes(f), g = Array.isArray(f), h = 0, f = g ? f : f[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var i;
                if (g) {
                    if (h >= f.length) break;
                    i = f[h++]
                } else {
                    h = f.next();
                    if (h.done) break;
                    i = h.value
                }
                i = i;
                if (i === d("CSRIndexUtil").UNKNOWN_RESOURCE_INDEX) continue;
                (!t.has(i) || e) && t.set(i, a);
                (c("BootloaderConfig").phdOn ? b.c == 2 : b.c) && d("CSRBitMap").add(i)
            }
    }

    function S(a, b) {
        var e = A.bootload(b);
        if (w.has(e)) return [e, null];
        w.add(e);
        var f = c("performanceAbsoluteNow")();
        b = {
            ref: a,
            components: b,
            timesliceContext: c("TimeSlice").getContext(),
            startTime: (a = m.get(e)) != null ? a : f,
            fetchStartTime: f,
            callbackStart: 0,
            callbackEnd: 0,
            tierOne: d("BootloaderEvents").newResourceMapSet(),
            tierTwo: d("BootloaderEvents").newResourceMapSet(),
            tierThree: d("BootloaderEvents").newResourceMapSet(),
            beRequests: new Map()
        };
        d("BootloaderEvents").notifyBootloadStart(b);
        return [e, b]
    }

    function T(a) {
        return c("ifRequired").call(null, a, function() {
            return !0
        }, function() {
            return !1
        })
    }

    function U(a) {
        return c("ifRequireable").call(null, a, function() {
            return !0
        }, function() {
            return !1
        })
    }

    function V(a, b, d, f) {
        v.has(a) || v.set(a, {
            firstBootloadStart: c("performanceAbsoluteNow")(),
            logData: new Set()
        });
        f && c("nullthrows")(v.get(a)).logData.add(f);
        var g = D(a),
            h = g.r,
            i = g.rdfds,
            j = g.rds;
        g = g.be;
        g = U(a) ? null : G(a, g);
        g == null && A.notify(A.beDone(a));
        Q(g != null ? [g].concat(h) : h, {
            onAll: function() {
                return A.notify(A.tierOne(a))
            },
            onLog: function() {
                return A.notify(A.tierOneLog(a))
            }
        }, d, f == null ? void 0 : f.tierOne);
        var k = (i == null ? void 0 : i.m) || [];
        Q((i == null ? void 0 : i.r) || [], {
            onBlocking: function() {
                return c("RequireDeferredReference").unblock(k, "css")
            },
            onAll: function() {
                return A.registerCallback(function() {
                    A.notify(A.tierTwoStart(a)), e.call(null, k.map(c("RequireDeferredReference").getRDModuleName_DO_NOT_USE), function() {
                        return A.notify(A.tierTwo(a))
                    })
                }, [A.tierOne(a), b])
            },
            onLog: function() {
                return A.notify(A.tierTwoLog(a))
            }
        }, d, f == null ? void 0 : f.tierTwo);
        var l = (j == null ? void 0 : j.m) || [];
        Q((j == null ? void 0 : j.r) || [], {
            onBlocking: function() {
                return c("RequireDeferredReference").unblock(l, "css")
            },
            onAll: function() {
                return A.registerCallback(function() {
                    A.notify(A.tierThreeStart(a)), e.call(null, l.map(c("RequireDeferredReference").getRDModuleName_DO_NOT_USE), function() {
                        return A.notify(A.tierThree(a))
                    })
                }, [A.tierTwo(a)])
            },
            onLog: function() {
                return A.notify(A.tierThreeLog(a))
            }
        }, d, f == null ? void 0 : f.tierThree)
    }

    function W(a) {
        var b = new Map();
        for (var e = 0; e < a.length; e++) {
            var f = a[e],
                g = s.get(f);
            if (!g) {
                c("FBLogger")("bootloader").mustfix("Unable to resolve resource %s.", f);
                continue
            }
            var i = void 0;
            if (g.type === "csr") i = d("CSRIndexUtil").parseCSRIndexes(g.src);
            else if (g.p) i = d("CSRIndexUtil").parseCSRIndexes(g.p), i.includes(d("CSRIndexUtil").UNKNOWN_RESOURCE_INDEX) && b.set(f, g), i = i.filter(function(a) {
                return a !== d("CSRIndexUtil").UNKNOWN_RESOURCE_INDEX
            });
            else {
                b.set(f, g);
                continue
            }
            for (f = i, g = Array.isArray(f), i = 0, f = g ? f : f[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var j;
                if (g) {
                    if (i >= f.length) break;
                    j = f[i++]
                } else {
                    i = f.next();
                    if (i.done) break;
                    j = i.value
                }
                j = j;
                var k = t.get(j);
                if (k == null) {
                    var l = JSON.stringify(a.map(function(a) {
                        var b = F(a),
                            c;
                        b.type === "js" || b.type === "css" ? c = b.d ? "" : b.src.split("?")[0] : c = b.src;
                        return JSON.stringify(babelHelpers["extends"]({
                            hash: a,
                            rev: u.get(a)
                        }, b, {
                            src: c,
                            tsrc: null
                        }))
                    }));
                    throw c("FBLogger")("bootloader", "missing-index-map").mustfixThrow("No hash for rsrcIndex " + j + " (rev: " + c("SiteData").client_revision + ", cohort: " + c("SiteData").pkg_cohort + "). " + l)
                }
                j = F(k);
                j.type !== "csr" || h(0, 20056, k);
                b.set(k, j)
            }
        }
        return b.entries()
    }

    function X(a) {
        var b, e = a.getAttribute("data-bootloader-hash");
        if (e == null) return;
        var f = d("ResourceHasher").getValidResourceHash(e);
        if (a.id) {
            if (y.has(a.id)) return;
            y.add(a.id)
        }
        e = a.tagName == "SCRIPT" ? {
            src: a.src,
            type: "js"
        } : {
            src: a.href,
            type: "css"
        };
        a.crossOrigin == null && (e.nc = 1);
        e.type === "js" && a.dataset.tsrc != null && a.dataset.tsrc.trim() !== "" && (e.tsrc = a.dataset.tsrc, d("MakeHasteTranslations").genFetchAndProcessTranslations(f, e.tsrc));
        e.type === "css" && a.getAttribute("data-nonblocking") && (e.nonblocking = 1);
        var g = a.getAttribute("data-c");
        g == "1" ? e.c = 1 : g == "2" && (e.c = 2);
        e.p = a.getAttribute("data-p");
        g = a.getAttribute("data-btmanifest");
        g != null && (e.m = g);
        s.has(f) && !c("BootloaderConfig").silentDups && c("FBLogger")("bootloader").warn("Duplicate resource [%s]: %s", f, e.src);
        R(f, e, !0);
        n.set(f, c("performanceAbsoluteNow")());
        g = function() {
            return $.done(f)
        };
        b = e.type === "js" ? !a.getAttribute("async") : ((b = a.parentNode) == null ? void 0 : b.tagName) === "HEAD";
        b || window._btldr && window._btldr[f] ? g() : e.type === "js" ? M(a, f, e, g) : c("CSSLoader").setupEventListeners(f, e.src, H(), g, N(f, e, g), c("CSSLoaderConfig").forcePollForBootloader === !0 ? null : a)
    }

    function Y() {
        if (x) return;
        x = !0;
        if (!c("ExecutionEnvironment").canUseDOM || c("ExecutionEnvironment").isInWorker) return;
        Array.from(document.getElementsByTagName("link")).forEach(function(a) {
            return X(a)
        });
        Array.from(document.getElementsByTagName("script")).forEach(function(a) {
            return X(a)
        })
    }

    function Z() {
        z = !0;
        var a = l;
        l = [];
        a.forEach(function(a) {
            var b = a[0],
                c = a[1],
                d = a[2];
            a = a[3];
            a(function() {
                $.loadModules.apply($, [b, c, d])
            })
        })
    }
    var $ = {
        loadModules: function(a, b, f) {
            b === void 0 && (b = i);
            f === void 0 && (f = "loadModules: unknown caller");
            var g = a,
                h = !1,
                j = function() {
                    h || b.apply(void 0, arguments)
                };
            a = {
                remove: function() {
                    h = !0
                }
            };
            if (c("BootloaderConfig").fastPathForAlreadyRequired && g.every(function(a) {
                    return U(a)
                })) {
                e.call(null, g, function() {
                    j.apply(void 0, arguments)
                });
                return a
            }
            if (!C(g)) {
                var k = "Deferred: Bootloader.loadModules";
                k = c("TimeSlice").getGuardedContinuation(k);
                l.push([g, j, f, k]);
                k = A.bootload(g);
                m.set(k, (k = m.get(k)) != null ? k : c("performanceAbsoluteNow")());
                return a
            }
            k = S(f, g);
            var n = k[0],
                o = k[1];
            A.registerCallback(e.bind(null, g, function() {
                o && (o.callbackStart = c("performanceAbsoluteNow")()), j.apply(void 0, arguments), o && (o.callbackEnd = c("performanceAbsoluteNow")()), A.notify(n)
            }), g.map(function(a) {
                return A.tierOne(a)
            }));
            I(function(b) {
                for (var c = 0; c < g.length; c++) {
                    var a = g[c];
                    V(a, n, b, o)
                }
            });
            if (o) {
                k = new Set([n]);
                for (var p = 0; p < g.length; p++) {
                    var q = g[p];
                    k.add(A.beDone(q));
                    k.add(A.tierThree(q));
                    k.add(A.tierOneLog(q));
                    k.add(A.tierTwoLog(q));
                    k.add(A.tierThreeLog(q))
                }
                A.registerCallback(function() {
                    return d("BootloaderEvents").notifyBootload(o)
                }, Array.from(k));
                c("ifRequireable")("TimeSliceInteraction", function(a) {
                    a.informGlobally("Bootloader.loadResources").addSetAnnotation("requested_hashes", Array.from(d("BootloaderEvents").flattenResourceMapSet(o.tierOne).keys())).addSetAnnotation("rdfd_requested_hashes", Array.from(d("BootloaderEvents").flattenResourceMapSet(o.tierTwo).keys())).addSetAnnotation("rd_requested_hashes", Array.from(d("BootloaderEvents").flattenResourceMapSet(o.tierThree).keys())).addStringAnnotation("bootloader_reference", f).addSetAnnotation("requested_components", g)
                })
            }
            return a
        },
        loadResources: function(a, b) {
            Y(), I(function(c) {
                var e;
                return Q(a.map(function(a) {
                    return d("ResourceHasher").getValidResourceHash(a)
                }), (e = b) != null ? e : Object.freeze({}), c)
            })
        },
        requestJSResource_UNSAFE_NEEDS_REVIEW_BY_SECURITY_AND_XFN: function(a) {
            var b = d("ResourceHasher").createExternalJSHash();
            R(b, {
                type: "js",
                src: a,
                nc: 1
            }, !1);
            $.loadResources([b])
        },
        done: function(a) {
            o.set(a, c("performanceAbsoluteNow")()), A.notify(A.rsrcDone(a))
        },
        beDone: function(a, b, c) {
            for (var d = (d = (d = v.get(a)) == null ? void 0 : d.logData) != null ? d : [], e = Array.isArray(d), f = 0, d = e ? d : d[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var d, g;
                if (e) {
                    if (f >= d.length) break;
                    g = d[f++]
                } else {
                    f = d.next();
                    if (f.done) break;
                    g = f.value
                }
                g = g;
                g.beRequests.set(b, c)
            }
            A.notify(A.beDone(a))
        },
        handlePayload: function(a, b) {
            for (var e = (e = a.rsrcTags) != null ? e : [], f = Array.isArray(e), g = 0, e = f ? e : e[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var e, h;
                if (f) {
                    if (g >= e.length) break;
                    h = e[g++]
                } else {
                    g = e.next();
                    if (g.done) break;
                    h = g.value
                }
                h = h;
                X(document.getElementById(h))
            }
            $.setResourceMap((h = a.rsrcMap) != null ? h : {}, a.sotUpgrades, a.consistency.rev, b);
            g = a.csrUpgrade != null ? d("CSRIndexUtil").parseCSRIndexes(a.csrUpgrade) : [];
            f = g.find(function(a) {
                return !t.has(a)
            });
            g.length && a.consistency.rev !== c("SiteData").client_revision ? c("FBLogger")("bootloader", "csr-mismatch").warn("CSR upgrades included on mismatched rev " + a.consistency.rev + " (client rev: " + c("SiteData").client_revision + ", cohort: " + c("SiteData").pkg_cohort + ").") : f != null && x ? c("FBLogger")("bootloader", "missing-csr-upgrade").warn("CSR upgrades included unknown rsrcIndex " + f + " (client rev: " + c("SiteData").client_revision + ", cohort: " + c("SiteData").pkg_cohort + ").") : g.forEach(d("CSRBitMap").add);
            a.compMap && $.enableBootload(a.compMap, b)
        },
        enableBootload: function(a, b) {
            for (var c in a) b && b.comp++, !q.has(c) ? (q.set(c, a[c]), j.has(c) && (j["delete"](c), E(c))) : b && b.dup_comp++;
            Y();
            k || Z()
        },
        undeferBootloads: function(a) {
            a === void 0 && (a = !1);
            if (window.location.search.indexOf("&__deferBootloads=") !== -1) return;
            a && k && d("BootloaderEvents").notifyDeferTimeout({
                componentMapSize: q.size,
                pending: l.map(function(a) {
                    var b = a[0];
                    a[1];
                    var c = a[2];
                    a[3];
                    return {
                        components: b,
                        ref: c
                    }
                }),
                time: c("performanceNow")()
            });
            k = !1;
            q.size && Z()
        },
        markComponentsAsImmediate: function(a) {
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                q.has(c) ? E(c) : j.add(c)
            }
        },
        setResourceMap: function(a, b, e, f) {
            var g = !1;
            for (var h in a) {
                f && f.rsrc++;
                h = d("ResourceHasher").getValidResourceHash(h);
                e != null && u.set(h, e);
                var i = a[h],
                    j = s.get(h);
                !j ? (i.type === "js" && (g = !0), R(h, i, !1)) : (f && f.dup_rsrc++, (j.type === "js" && i.type === "js" || j.type === "css" && i.type === "css") && (i.d && !j.d && (i.type === "js" && (g = !0), j.src = i.src, j.d = 1)))
            }
            g && e != null && c("ClientConsistency").addAdditionalRevision(e);
            if (b)
                for (i = b, j = Array.isArray(i), h = 0, i = j ? i : i[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                    if (j) {
                        if (h >= i.length) break;
                        a = i[h++]
                    } else {
                        h = i.next();
                        if (h.done) break;
                        a = h.value
                    }
                    f = a;
                    g = s.get(f);
                    g && R(f, g, !0)
                }
        },
        getURLToHashMap: function() {
            var a = new Map();
            for (var b = s, c = Array.isArray(b), d = 0, b = c ? b : b[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var e;
                if (c) {
                    if (d >= b.length) break;
                    e = b[d++]
                } else {
                    d = b.next();
                    if (d.done) break;
                    e = d.value
                }
                e = e;
                var f = e[0];
                e = e[1];
                if (e.type === "async" || e.type === "csr") continue;
                a.set(e.src, f)
            }
            return a
        },
        loadPredictedResourceMap: function(a, b, c) {
            $.setResourceMap(a, null, c), $.loadResources(Object.keys(a), b)
        },
        getCSSResources: function(a) {
            var b = [];
            for (var a = W(a), c = Array.isArray(a), d = 0, a = c ? a : a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var e;
                if (c) {
                    if (d >= a.length) break;
                    e = a[d++]
                } else {
                    d = a.next();
                    if (d.done) break;
                    e = d.value
                }
                e = e;
                var f = e[0];
                e = e[1];
                e.type === "css" && b.push(f)
            }
            return b
        },
        getBootloadPendingComponents: function() {
            var a = new Map();
            for (var b = v, c = Array.isArray(b), d = 0, b = c ? b : b[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var e;
                if (c) {
                    if (d >= b.length) break;
                    e = b[d++]
                } else {
                    d = b.next();
                    if (d.done) break;
                    e = d.value
                }
                e = e;
                var f = e[0];
                e = e[1];
                T(f) || a.set(f, e.firstBootloadStart)
            }
            return a
        },
        getBootloadedComponents: function() {
            var a = new Map();
            for (var b = v, c = Array.isArray(b), d = 0, b = c ? b : b[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var e;
                if (c) {
                    if (d >= b.length) break;
                    e = b[d++]
                } else {
                    d = b.next();
                    if (d.done) break;
                    e = d.value
                }
                e = e;
                var f = e[0];
                e = e[1];
                a.set(f, e.firstBootloadStart)
            }
            return a
        },
        notifyManuallyLoadedResources: function(a) {
            for (var b in a) {
                b = d("ResourceHasher").getValidResourceHash(b);
                var e = a[b];
                (e.type === "js" || e.type === "css") && (s.has(b) && !c("BootloaderConfig").silentDups && c("FBLogger")("bootloader").warn("Duplicate manual resource [%s]: %s", b, e.src), R(b, e, !0), n.set(b, c("performanceAbsoluteNow")()), $.done(b))
            }
        },
        getResourceState: function(a) {
            return {
                loadStart: n.get(a),
                loadEnd: o.get(a),
                loadError: p.get(a)
            }
        },
        getComponentTiming: function(a) {
            var b;
            return {
                tierTwoStart: (b = A.getEventTime(A.tierTwoStart(a))) != null ? b : 0,
                tierTwoEnd: (b = A.getEventTime(A.tierTwo(a))) != null ? b : 0,
                tierThreeStart: (b = A.getEventTime(A.tierThreeStart(a))) != null ? b : 0,
                tierThreeEnd: (b = A.getEventTime(A.tierThree(a))) != null ? b : 0
            }
        },
        getLoadedResourceCount: function() {
            return o.size
        },
        getErrorCount: function() {
            return p.size
        },
        forceFlush: function() {
            c("BootloaderEndpoint").forceFlush()
        },
        __debug: {
            componentMap: q,
            requested: n,
            resources: s,
            riMap: t,
            retries: B.getAllRetryAttempts_FOR_DEBUG_ONLY(),
            errors: p,
            loaded: o,
            bootloaded: v,
            queuedToMarkAsImmediate: j,
            _resolveCSRs: W,
            revMap: u,
            isPersistentDependencySatisfied: function(a) {
                return A.isPersistentDependencySatisfied(a)
            },
            _getQueuedLoadModules: function() {
                return l
            },
            _dequeueLoadModules: function(a) {
                a = l.splice(a, 1);
                if (!a.length) return;
                a = a[0];
                var b = a[0],
                    c = a[1],
                    d = a[2];
                a = a[3];
                var e = k,
                    f = z;
                k = !1;
                z = !0;
                a(function() {
                    $.loadModules.apply($, [b, c, d])
                });
                k = e;
                z = f
            }
        }
    };
    c("JSResourceReferenceImpl").setBootloader($);
    f = $;
    g["default"] = f
}), 98);
__d("CSRFGuard", [], (function(a, b, c, d, e, f) {
    "use strict";
    c = "for (;;);";
    var g = /^for ?\(;;\);/;
    d = c.length;

    function a(a) {
        return !!a.match(g)
    }

    function b(a) {
        var b = a.match(g);
        return b ? a.substr(b[0].length) : b
    }
    f.regex = g;
    f.length = d;
    f.exists = a;
    f.clean = b
}), 66);
/**
 * License: https://www.facebook.com/legal/license/Ga6vBwdwgUx/
 */
__d("ImmediateImplementation", ["ImmediateImplementationExperiments"], (function(a, b, c, d, e, f) {
    (function(c, d) {
        "use strict";
        var e = 1,
            g = {},
            h = {},
            i = h,
            j = !1,
            k = c.document,
            l, m, n, o = "setImmediate$" + Math.random() + "$";

        function p() {
            var a = c.event;
            return !a ? !1 : a.isTrusted && ["change", "click", "contextmenu", "dblclick", "mouseup", "pointerup", "reset", "submit", "touchend"].includes(a.type) || a.type === "message" && a.source === c && typeof a.data === "string" && a.data.indexOf(o) === 0
        }

        function q(a) {
            var b = a[0];
            a = Array.prototype.slice.call(a, 1);
            g[e] = function() {
                b.apply(void 0, a)
            };
            i = i.next = {
                handle: e++
            };
            return i.handle
        }

        function r() {
            var a, b;
            while (!j && (a = h.next)) {
                h = a;
                if (b = g[a.handle]) {
                    j = !0;
                    try {
                        b(), j = !1
                    } finally {
                        s(a.handle), j && (j = !1, h.next && l(r))
                    }
                }
            }
        }

        function s(a) {
            delete g[a]
        }

        function d() {
            if (c.postMessage && !c.importScripts) {
                var a = !0,
                    b = function b() {
                        a = !1, c.removeEventListener ? c.removeEventListener("message", b, !1) : c.detachEvent("onmessage", b)
                    };
                if (c.addEventListener) c.addEventListener("message", b, !1);
                else if (c.attachEvent) c.attachEvent("onmessage", b);
                else return !1;
                c.postMessage("", "*");
                return a
            }
        }

        function t() {
            var a = function(a) {
                a.source === c && typeof a.data === "string" && a.data.indexOf(o) === 0 && r()
            };
            c.addEventListener ? c.addEventListener("message", a, !1) : c.attachEvent("onmessage", a);
            l = function() {
                var a = q(arguments);
                c.originalPostMessage ? c.originalPostMessage(o + a, "*") : c.postMessage(o + a, "*");
                return a
            };
            m = l
        }

        function u() {
            var a = new MessageChannel(),
                b = !1;
            a.port1.onmessage = function(a) {
                b = !1, r()
            };
            l = function() {
                var c = q(arguments);
                b || (a.port2.postMessage(c), b = !0);
                return c
            };
            n = l
        }

        function v() {
            var a = k.documentElement;
            l = function() {
                var b = q(arguments),
                    c = k.createElement("script");
                c.onreadystatechange = function() {
                    c.onreadystatechange = null, a.removeChild(c), c = null, r()
                };
                a.appendChild(c);
                return b
            }
        }

        function w() {
            l = function() {
                setTimeout(r, 0);
                return q(arguments)
            }
        }
        d() ? c.MessageChannel && b("ImmediateImplementationExperiments").prefer_message_channel ? (t(), u(), l = function() {
            if (p()) return m.apply(null, arguments);
            else return n.apply(null, arguments)
        }) : t() : c.MessageChannel ? u() : k && k.createElement && "onreadystatechange" in k.createElement("script") ? v() : w();
        f.setImmediate = l;
        f.clearImmediate = s
    })(typeof self === "undefined" ? typeof a === "undefined" ? this : a : self)
}), null);
__d("clearImmediatePolyfill", ["ImmediateImplementation"], (function(a, b, c, d, e, f) {
    c = a.clearImmediate || b("ImmediateImplementation").clearImmediate;
    f["default"] = c
}), 66);
__d("clearImmediate", ["clearImmediatePolyfill"], (function(a, b, c, d, e, f, g) {
    function a(a) {
        c("clearImmediatePolyfill")(a)
    }
    g["default"] = a
}), 98);
__d("CurrentAdAccount", ["CurrentAdAccountInitialData"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = {
        getID: function() {
            return c("CurrentAdAccountInitialData").AD_ACCOUNT_ID
        }
    };
    b = a;
    g["default"] = b
}), 98);
__d("CurrentCommunity", ["CurrentCommunityInitialData"], (function(a, b, c, d, e, f) {
    a = {
        getID: function() {
            return b("CurrentCommunityInitialData").COMMUNITY_ID || "0"
        },
        getName: function() {
            return b("CurrentCommunityInitialData").COMMUNITY_NAME || ""
        }
    };
    c = a;
    f["default"] = c
}), 66);
__d("DTSG", ["invariant", "DTSGInitialData"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = d("DTSGInitialData").token || null;

    function a() {
        return i
    }

    function b(a) {
        i = a
    }

    function c() {
        h(0, 5809)
    }
    g.getToken = a;
    g.setToken = b;
    g.refresh = c
}), 98);
__d("DTSGUtils", ["SprinkleConfig", "isCdnURI", "isFacebookURI", "isMessengerDotComURI", "isOculusDotComURI", "isWorkplaceDotComURI"], (function(a, b, c, d, e, f) {
    "use strict";
    a = {
        getNumericValue: function(a) {
            var c = 0;
            for (var d = 0; d < a.length; d++) c += a.charCodeAt(d);
            d = c.toString();
            return b("SprinkleConfig").should_randomize ? d : b("SprinkleConfig").version + d
        },
        shouldAppendToken: function(a) {
            return !b("isCdnURI")(a) && !a.isSubdomainOfDomain("fbsbx.com") && (b("isFacebookURI")(a) || b("isMessengerDotComURI")(a) || b("isWorkplaceDotComURI")(a) || b("isOculusDotComURI")(a) || a.isSubdomainOfDomain("freebasics.com") || a.isSubdomainOfDomain("discoverapp.com"))
        }
    };
    e.exports = a
}), null);
__d("DTSG_ASYNC", ["DTSGInitData"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = c("DTSGInitData").async_get_token || null;

    function a() {
        return h
    }

    function b(a) {
        h = a
    }
    g.getToken = a;
    g.setToken = b
}), 98);
__d("replaceTransportMarkers", ["BanzaiLazyQueue", "ge", "memoize"], (function(a, b, c, d, e, f, g) {
    var h = new Set();

    function i(a, e, f) {
        var g = f !== void 0 ? e[f] : e,
            j;
        if (Array.isArray(g))
            for (j = 0; j < g.length; j++) i(a, g, j);
        else if (g && typeof g === "object")
            if (g.__m) g.__lazy ? e[f] = c("memoize")(b.bind(null, g.__m)) : e[f] = b.call(null, g.__m);
            else if (g.__jsr) e[f] = new(b.call(null, "JSResourceReferenceImpl"))(g.__jsr).__setRef("replaceTransportMarkers");
        else if (g.__dr) e[f] = new(b.call(null, "RequireDeferredReference"))(g.__dr).__setRef("replaceTransportMarkers");
        else if (g.__rc) g.__rc[0] === null ? e[f] = null : e[f] = b.call(null, g.__rc[0]), g.__rc[1] && (h.has(g.__rc[1]) || (h.add(g.__rc[1]), d("BanzaiLazyQueue").queuePost("require_cond_exposure_logging", {
            identifier: g.__rc[1]
        })));
        else if (g.__e) e[f] = c("ge")(g.__e);
        else if (g.__rel) e[f] = a.relativeTo;
        else if (g.__bigPipeContext) e[f] = a.bigPipeContext;
        else if (g.__bbox) e[f] = g.__bbox;
        else {
            for (j in g) i(a, g, j);
            if (g.__map) e[f] = new Map(g.__map);
            else if (g.__set) e[f] = new Set(g.__set);
            else if (g.__imm) {
                j = g.__imm;
                a = j.method;
                g = j.value;
                e[f] = b.call(null, "immutable")[a](g)
            }
        }
    }
    g["default"] = i
}), 98);
__d("ServerJSDefine", ["BitMap", "replaceTransportMarkers"], (function(a, b, c, d, e, f, g) {
    var h = 2,
        i = 8,
        j = new(c("BitMap"))(),
        k = {
            getLoadedModuleHash: function() {
                return j.toCompressedString()
            },
            getModuleNameAndHash: function(a) {
                a = a.split("@");
                return {
                    hash: a[1],
                    name: a[0]
                }
            },
            handleDefine: function(a, b, d, e, g) {
                e >= 0 && j.set(e), define(a, b, function(h, i, j, k, b) {
                    h = {
                        data: d
                    };
                    c("replaceTransportMarkers")({
                        relativeTo: g
                    }, h);
                    if (e === -42) {
                        i = d != null && typeof d === "object" && d.__throw8367__;
                        throw new Error(a + ": " + (typeof i === "string" ? i : ""))
                    }
                    b.exports = h.data
                }, h | i)
            },
            handleDefines: function(a, b) {
                a.forEach(function(a) {
                    var c;
                    b != null ? c = [].concat(a, [b]) : c = [].concat(a, [null]);
                    k.handleDefine.apply(null, c)
                })
            }
        };
    a = k;
    g["default"] = a
}), 98);
__d("StaticSiteData", [], (function(a, b, c, d, e, f) {
    a = Object.freeze({
        hs_key: "__hs",
        connection_class_server_guess_key: "__ccg",
        dpr_key: "dpr",
        spin_rev_key: "__spin_r",
        spin_time_key: "__spin_t",
        spin_branch_key: "__spin_b",
        spin_mhenv_key: "__spin_dev_mhenv",
        lite_iframe_locale_override_key: "__ltif_locale",
        weblite_key: "__wblt",
        weblite_iframe_key: "__wbltif",
        kite_key: "__ktif",
        kite_legacy_key: "_ktif",
        haste_session_id_key: "__hsi",
        jsmod_key: "__dyn",
        csr_key: "__csr",
        comet_key: "__comet_req"
    });
    f["default"] = a
}), 66);
/**
 * License: https://www.facebook.com/legal/license/A4tfXiHOGrs/
 */
__d("Alea", [], (function(a, b, c, d, e, f) {
    function g() {
        var a = 4022871197,
            b = function(b) {
                b = b.toString();
                for (var c = 0; c < b.length; c++) {
                    a += b.charCodeAt(c);
                    var d = .02519603282416938 * a;
                    a = d >>> 0;
                    d -= a;
                    d *= a;
                    a = d >>> 0;
                    d -= a;
                    a += d * 4294967296
                }
                return (a >>> 0) * 23283064365386963e-26
            };
        b.version = "Mash 0.9";
        return b
    }

    function a() {
        var a = 0,
            b = 0,
            c = 0,
            d = 1;
        for (var e = arguments.length, f = new Array(e), h = 0; h < e; h++) f[h] = arguments[h];
        var i = f.length > 0 ? f : [new Date()],
            j = g();
        a = j(" ");
        b = j(" ");
        c = j(" ");
        for (var k = 0; k < i.length; k++) a -= j(i[k]), a < 0 && (a += 1), b -= j(i[k]), b < 0 && (b += 1), c -= j(i[k]), c < 0 && (c += 1);
        j = null;
        var l = function() {
            var e = 2091639 * a + d * 23283064365386963e-26;
            a = b;
            b = c;
            c = e - (d = e | 0);
            return c
        };
        l.version = "Alea 0.9";
        l.args = i;
        return l
    }
    f["default"] = a
}), 66);
__d("Random", ["Alea", "ServerNonce"], (function(a, b, c, d, e, f) {
    "use strict";
    var g = 4294967296,
        h = b("ServerNonce").ServerNonce,
        i;

    function j() {
        i == null && (i = b("Alea")(h));
        return i
    }
    var k = {
        random: function() {
            var b = typeof Uint32Array === "function" ? new Uint32Array(1) : null,
                c = a.crypto || a.msCrypto;
            if (b != null) try {
                var d = c == null ? void 0 : c.getRandomValues;
                if (typeof d === "function") {
                    var e = d.bind(c);
                    return function() {
                        try {
                            e(b)
                        } catch (a) {
                            return j()()
                        }
                        return b[0] / g
                    }
                }
            } catch (a) {}
            return j()
        }(),
        uint32: function() {
            return Math.floor(k.random() * g)
        },
        coinflip: function(a) {
            function b(b) {
                return a.apply(this, arguments)
            }
            b.toString = function() {
                return a.toString()
            };
            return b
        }(function(a) {
            if (a === 0) return !1;
            return a <= 1 ? !0 : k.random() * a <= 1
        })
    };
    e.exports = k
}), null);
__d("WebSessionDefaultTimeoutMs", [], (function(a, b, c, d, e, f) {
    "use strict";
    a = 35e3;
    f["default"] = a
}), 66);
__d("CookieConsent", ["CookieConsentIFrameConfig", "InitialCookieConsent"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = new Set(c("InitialCookieConsent").initialConsent),
        i = c("InitialCookieConsent").shouldShowCookieBanner,
        j = {
            setConsented: function() {
                h.add(1), i = !1
            },
            hasConsent: function(a) {
                return h.has(a)
            },
            shouldShowCookieBanner: function() {
                return i
            },
            isFirstPartyStorageAllowed: function() {
                return !c("InitialCookieConsent").noCookies && j.hasConsent(1)
            },
            isThirdPartyEmbedAllowed: function() {
                return !c("InitialCookieConsent").noCookies && j.hasConsent(2)
            },
            isThirdPartyIframeAllowed: function(a) {
                if (!j.isFirstPartyStorageAllowed()) return !1;
                return c("CookieConsentIFrameConfig").allowlisted_iframes.includes(a.id) ? !0 : j.hasConsent(2)
            }
        };
    a = j;
    g["default"] = a
}), 98);
__d("isQuotaExceededError", [], (function(a, b, c, d, e, f) {
    "use strict";

    function g(b) {
        return Boolean(b instanceof a.DOMException && (b.code === 22 || b.code === 1014 || b.name === "QuotaExceededError" || b.name === "NS_ERROR_DOM_QUOTA_REACHED"))
    }

    function b(a, b) {
        return Boolean(g(b) && a && a.length !== 0)
    }
    f.isQuotaExceededError = g;
    f.isStorageQuotaExceededError = b
}), 66);
__d("WebStorage", ["CookieConsent", "FBLogger", "err", "isQuotaExceededError"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = {},
        i = {},
        j = "localStorage",
        k = "sessionStorage",
        l = !1,
        m = typeof window !== "undefined" ? window : self;

    function n(a, b, d) {
        if (!c("CookieConsent").isFirstPartyStorageAllowed()) {
            l || (c("FBLogger")("web_storage").warn("Failed to get %s because of missing cookie consent", d.toString()), l = !0);
            return null
        }
        Object.prototype.hasOwnProperty.call(a, d) || (a[d] = b(d));
        return a[d]
    }

    function o(a) {
        try {
            return m[a]
        } catch (a) {
            c("FBLogger")("web_storage").warn("Failed to get storage for read %s", a.message)
        }
        return null
    }

    function p(a) {
        var b = null;
        try {
            b = m[a];
            if (b != null && typeof b.setItem === "function" && typeof b.removeItem === "function") {
                var e = "__test__" + Date.now();
                b.setItem(e, "");
                b.removeItem(e)
            } else return null
        } catch (e) {
            if (d("isQuotaExceededError").isStorageQuotaExceededError(b, e) === !1) {
                c("FBLogger")("web_storage").catching(e).warn("Failed to get WebStorage of type `%s`", a);
                return null
            }
        }
        return b
    }

    function q(a) {
        var b = null;
        try {
            b = m[a];
            if (b != null && typeof b.setItem === "function" && typeof b.removeItem === "function") {
                a = "__test__" + Date.now();
                b.setItem(a, "");
                b.removeItem(a)
            }
        } catch (a) {
            if (d("isQuotaExceededError").isStorageQuotaExceededError(b, a) === !0) return !0
        }
        return !1
    }

    function r(a) {
        var b = [];
        for (var c = 0; c < a.length; c++) b.push(a.key(c) || "");
        return b
    }

    function s(a, b, d) {
        if (a == null) return new Error("storage cannot be null");
        var e = null;
        try {
            a.setItem(b, d)
        } catch (g) {
            var f = r(a).map(function(b) {
                var c = (a.getItem(b) || "").length;
                return b + "(" + c + ")"
            });
            e = c("err")("%sStorage quota exceeded while setting %s(%s). Items(length) follows: %s", g.name ? g.name + ": " : "", b, d.length, f.join())
        }
        return e
    }
    a = {
        getLocalStorage: function() {
            return n(h, p, j)
        },
        getAllowlistedKeyFromLocalStorage: function(a) {
            var b;
            return (b = n(i, o, j)) == null ? void 0 : b.getItem(a)
        },
        getSessionStorage: function() {
            return n(h, p, k)
        },
        getAllowlistedKeyFromSessionStorage: function(a) {
            var b;
            return (b = n(i, o, k)) == null ? void 0 : b.getItem(a)
        },
        getLocalStorageForRead: function() {
            return n(i, o, j)
        },
        getSessionStorageForRead: function() {
            return n(i, o, k)
        },
        isLocalStorageQuotaExceeded: function() {
            return q(j)
        },
        isSessionStorageQuotaExceeded: function() {
            return q(k)
        },
        setItemGuarded: s,
        setAllowlistedKeyToLocalStorage: function(a, b, c) {
            return s(a, b, c)
        },
        clearCaches: function() {
            h = {}, i = {}
        }
    };
    b = a;
    g["default"] = b
}), 98);
__d("WebSession", ["FBLogger", "Random", "WebSessionDefaultTimeoutMs", "WebStorage"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = 36,
        i = 6,
        j = Math.pow(h, i);

    function k(a) {
        return a == null || Number.isFinite(a) === !1 || a <= 0 ? null : a
    }

    function l(a) {
        if (a == null) return null;
        var b = parseInt(a, 10);
        if ("" + b !== a) {
            c("FBLogger")("web_session").warn("Expected the web session expiry time to parse as an integer. Found `%s`.", String(a));
            return null
        }
        return k(b)
    }

    function m(a) {
        if (a == null) return null;
        if (a.length !== i) {
            c("FBLogger")("web_session").warn("Expected the web session id to be a %d character string. It was %d character(s). Received `%s`.", i, a.length, a);
            return null
        }
        if (/^[a-z0-9]+$/.test(a) === !1) {
            c("FBLogger")("web_session").warn("Expected the web session ID to be a base-%d encoded string. Received `%s`.", h, a);
            return null
        }
        return a
    }

    function n(a) {
        if (a == null) return null;
        if (typeof a !== "string" && a instanceof String === !1) {
            c("FBLogger")("web_session").warn("A non-string value was passed to `coerceSession`. This should be impossible according to this method's Flow type. The value was `%s`.", a);
            return null
        }
        a = a.split(":");
        var b = a[0];
        a = a[1];
        a = l(a);
        b = m(b);
        return a == null || b == null ? null : {
            expiryTime: a,
            id: b
        }
    }

    function o() {
        var a = Math.floor(d("Random").random() * j);
        a = a.toString(h);
        return "0".repeat(i - a.length) + a
    }
    var p = null;

    function q() {
        p == null && (p = o());
        return p
    }

    function r(a) {
        a === void 0 && (a = Date.now());
        var b = c("WebStorage").getLocalStorageForRead();
        if (b == null) return null;
        try {
            b = n(b.getItem("Session"));
            return b && a < b.expiryTime ? b : null
        } catch (a) {
            return null
        }
    }

    function s() {
        var a = c("WebStorage").getSessionStorageForRead();
        if (a == null) return null;
        a = m(a.getItem("TabId"));
        if (a == null) {
            var b = c("WebStorage").getSessionStorage();
            if (b == null) return null;
            var d = o();
            c("WebStorage").setItemGuarded(b, "TabId", d);
            return d
        }
        return a
    }

    function a(a) {
        if (a !== void 0 && k(a) == null) {
            c("FBLogger")("web_session").warn("`WebSession.extend()` was passed an invalid target expiry time `%s`.", a);
            return
        }
        var b = Date.now();
        a = (a = a) != null ? a : b + c("WebSessionDefaultTimeoutMs");
        var d = r(b);
        if (d && d.expiryTime >= a || a <= b) return;
        b = c("WebStorage").getLocalStorage();
        if (b != null) {
            d = d == null ? o() : d.id;
            c("WebStorage").setItemGuarded(b, "Session", d + ":" + a)
        }
    }

    function t() {
        var a;
        return (a = r()) == null ? void 0 : a.id
    }

    function b() {
        var a, b, c = q();
        a = (a = t()) != null ? a : "";
        b = (b = s()) != null ? b : "";
        return a + ":" + b + ":" + c
    }

    function e() {
        return q()
    }
    g.extend = a;
    g.getSessionId = t;
    g.getId = b;
    g.getPageId_DO_NOT_USE = e
}), 98);
__d("asyncParams", [], (function(a, b, c, d, e, f) {
    var g = {};

    function a(a, b) {
        g[a] = b
    }

    function b() {
        return g
    }
    f.add = a;
    f.get = b
}), 66);
__d("isSocialPlugin", ["CSSCore", "ExecutionEnvironment"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a() {
        return !c("ExecutionEnvironment").canUseDOM ? !1 : !!document.body && d("CSSCore").hasClass(document.body, "plugin")
    }
    g["default"] = a
}), 98);
__d("uniqueRequestID", [], (function(a, b, c, d, e, f) {
    var g = 36,
        h = 1;

    function a() {
        return (h++).toString(g)
    }
    f["default"] = a
}), 66);
__d("getAsyncParams", ["CSRBitMap", "CometPersistQueryParams", "CurrentAdAccount", "CurrentBusinessUser", "CurrentCommunity", "CurrentUserInitialData", "DTSG", "DTSGUtils", "DTSG_ASYNC", "Env", "ISB", "JSErrorLoggingConfig", "LSD", "ServerJSDefine", "SiteData", "SprinkleConfig", "StaticSiteData", "WebConnectionClassServerGuess", "WebSession", "asyncParams", "isSocialPlugin", "requireWeak", "uniqueRequestID"], (function(a, b, c, d, e, f, g) {
    var h = {
            locale: !0,
            cxobfus: !0,
            js_debug: !0,
            cquick: !0,
            cquick_token: !0,
            wdplevel: !0,
            prod_graphql: !0,
            sri: !0
        },
        i = {
            ctarget: !0
        };

    function a(a, b) {
        var e;
        b === void 0 && (b = !1);
        var f = babelHelpers["extends"]({}, d("asyncParams").get(), (e = {
            __user: c("CurrentUserInitialData").USER_ID,
            __a: 1,
            __req: c("uniqueRequestID")()
        }, e[c("StaticSiteData").hs_key] = c("SiteData").haste_session, e[c("StaticSiteData").dpr_key] = c("SiteData").pr, e[c("StaticSiteData").connection_class_server_guess_key] = c("WebConnectionClassServerGuess").connectionClass, e.__rev = c("SiteData").client_revision, e.__s = d("WebSession").getId(), e[c("StaticSiteData").haste_session_id_key] = c("SiteData").hsi, e));
        b || (f[c("StaticSiteData").jsmod_key] = c("ServerJSDefine").getLoadedModuleHash(), f[c("StaticSiteData").csr_key] = d("CSRBitMap").toCompressedString());
        if (!c("SiteData").wbloks_env && (c("SiteData").comet_env != null && c("SiteData").comet_env !== 0 || c("SiteData").is_comet)) {
            f[c("StaticSiteData").comet_key] = (e = c("SiteData").comet_env) != null ? e : 1
        }
        Object.entries(c("CometPersistQueryParams").relative).forEach(function(a) {
            var b = a[0];
            a = a[1];
            a != null && (f[b] = String(a))
        });
        typeof window !== "undefined" && ((b = window) == null ? void 0 : b.location) != null && window.location.search.slice(1).split("&").forEach(function(a) {
            a = a.split("=");
            var b = a[0];
            a = a[1];
            (b.substr(0, 4) === "tfc_" || b.substr(0, 4) === "tfi_" || b.substr(0, 3) === "mh_" || h[b] > -1 || i[b] > -1) && (i[b] > -1 ? f[b] = decodeURIComponent(a) : f[b] = a)
        });
        c("Env").isCQuick && !f.cquick && (f.cquick = c("Env").iframeKey, f.ctarget = c("Env").iframeTarget, f.cquick_token = c("Env").iframeToken);
        if (a == "POST") {
            e = d("DTSG").getCachedToken ? d("DTSG").getCachedToken() : d("DTSG").getToken();
            e && (f.fb_dtsg = e, c("SprinkleConfig").param_name && (f[c("SprinkleConfig").param_name] = c("DTSGUtils").getNumericValue(e)));
            c("LSD").token && (f.lsd = c("LSD").token, c("SprinkleConfig").param_name && !e && (f[c("SprinkleConfig").param_name] = c("DTSGUtils").getNumericValue(c("LSD").token)))
        }
        if (a == "GET") {
            b = d("DTSG_ASYNC").getCachedToken ? d("DTSG_ASYNC").getCachedToken() : d("DTSG_ASYNC").getToken();
            b && (f.fb_dtsg_ag = b, c("SprinkleConfig").param_name && (f[c("SprinkleConfig").param_name] = c("DTSGUtils").getNumericValue(b)))
        }
        c("ISB").token && (f.fb_isb = c("ISB").token);
        c("CurrentCommunity").getID() !== "0" && (f.__cid = c("CurrentCommunity").getID());
        c("CurrentAdAccount").getID() != null && (f.__aaid = c("CurrentAdAccount").getID());
        c("CurrentBusinessUser").business_id != null && (f.__bid = c("CurrentBusinessUser").business_id);
        c("isSocialPlugin")() && (f.__sp = 1);
        c("SiteData").spin && (f[c("StaticSiteData").spin_rev_key] = c("SiteData")[c("StaticSiteData").spin_rev_key], f[c("StaticSiteData").spin_branch_key] = c("SiteData")[c("StaticSiteData").spin_branch_key], f[c("StaticSiteData").spin_time_key] = c("SiteData")[c("StaticSiteData").spin_time_key], c("SiteData")[c("StaticSiteData").spin_mhenv_key] && (f[c("StaticSiteData").spin_mhenv_key] = c("SiteData")[c("StaticSiteData").spin_mhenv_key]));
        d("JSErrorLoggingConfig").sampleWeight != null && d("JSErrorLoggingConfig").sampleWeightKey != null && (f[d("JSErrorLoggingConfig").sampleWeightKey] = d("JSErrorLoggingConfig").sampleWeight);
        c("requireWeak")("QPLUserFlow", function(a) {
            a = a.getActiveFlowIDs();
            a.length > 0 && (f.qpl_active_flow_ids = a.sort().join(","))
        });
        return f
    }
    g["default"] = a
}), 98);
__d("setImmediatePolyfill", ["invariant", "ImmediateImplementation", "PromiseUsePolyfillSetImmediateGK"], (function(a, b, c, d, e, f, g) {
    var h = a.setImmediate;
    if (b("PromiseUsePolyfillSetImmediateGK").www_always_use_polyfill_setimmediate || !h) {
        d = b("ImmediateImplementation");
        h = d.setImmediate
    }

    function c(a) {
        typeof a === "function" || g(0, 5912);
        for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
        return h.apply(void 0, [a].concat(c))
    }
    e.exports = c
}), null);
__d("setImmediateAcrossTransitions", ["TimeSlice", "setImmediatePolyfill"], (function(a, b, c, d, e, f, g) {
    function a(a) {
        var b = c("TimeSlice").guard(a, "setImmediate", {
            propagationType: c("TimeSlice").PropagationType.CONTINUATION,
            registerCallStack: !0
        });
        for (var d = arguments.length, e = new Array(d > 1 ? d - 1 : 0), f = 1; f < d; f++) e[f - 1] = arguments[f];
        return c("setImmediatePolyfill").apply(void 0, [b].concat(e))
    }
    g["default"] = a
}), 98);
__d("BootloaderEndpoint", ["Bootloader", "BootloaderEndpointConfig", "CSRFGuard", "FBLogger", "HasteResponse", "TimeSlice", "clearImmediate", "fb-error", "getAsyncParams", "getSameOriginTransport", "performanceAbsoluteNow", "setImmediateAcrossTransitions"], (function(a, b, c, d, e, f) {
    "use strict";
    var g, h = b("fb-error").ErrorXFBDebug,
        i = b("BootloaderEndpointConfig").endpointURI,
        j = 0,
        k = null,
        l = null,
        m = new Map(),
        n = new Map();

    function o(a) {
        return Array.from(a.keys()).join(",")
    }

    function p(a, c) {
        var d = {};
        a.size && (d.modules = o(a));
        c.size && (d.nb_modules = o(c));
        a = Object.entries(babelHelpers["extends"]({}, d, b("getAsyncParams")("GET"))).map(function(a) {
            var b = a[0];
            a = a[1];
            return encodeURIComponent(b) + "=" + encodeURIComponent(String(a))
        }).join("&");
        return i + (i.includes("?") ? "&" : "?") + a
    }

    function q(a, c) {
        if (a.size === 0 && c.size === 0) return;
        var d = p(a, c),
            e = b("getSameOriginTransport")(),
            f = j++,
            i = (g || (g = b("performanceAbsoluteNow")))();
        e.open("GET", d, !0);
        var k = b("TimeSlice").getGuardedContinuation("Bootloader _requestHastePayload");
        e.onreadystatechange = function() {
            if (e.readyState !== 4) return;
            k(function() {
                h.addFromXHR(e);
                var g = e.status === 200 ? JSON.parse(b("CSRFGuard").clean(e.responseText)) : null;
                if (g == null) {
                    b("FBLogger")("bootloader").warn('Invalid bootloader response %d, blocking mods: %s; non-blocking mods: %s; "%s"', e.status, o(a), o(c), e.responseText.substr(0, 256));
                    return
                }
                if (g.error) b("FBLogger")("bootloader").warn("Non-fatal error from bootloader endpoint, blocking mods: %s; non-blocking mods: %s", o(a), o(c));
                else if (g.__error) {
                    b("FBLogger")("bootloader").warn("Fatal error from bootloader endpoint, blocking mods: %s; non-blocking mods: %s", o(a), o(c));
                    return
                }
                b("TimeSlice").guard(function() {
                    return r(d, g, a, c, f, i)
                }, "Bootloader receiveEndpointData", {
                    propagationType: b("TimeSlice").PropagationType.CONTINUATION
                })()
            })
        };
        e.send()
    }

    function r(a, c, d, e, f, h) {
        var i = (g || (g = b("performanceAbsoluteNow")))(),
            j = c.serverGenTime,
            k = c.hrp;
        if (k == null) {
            c = c;
            b("FBLogger")("be_null_hrp").mustfix("Found null hrp, blocking mods: %s; non-blocking mods: %s; response error: %s", o(d), o(e), c.error + ", summary: " + c.errorSummary + ", description: " + c.errorDescription);
            k = c
        }
        b("HasteResponse").handle(k, {
            source: "bootloader_endpoint",
            sourceDetail: JSON.stringify({
                b: Array.from(d.keys()),
                n: Array.from(e.keys())
            }),
            onBlocking: function() {
                var a = [d, e];
                for (var c = 0; c < a.length; c++) {
                    var f = a[c];
                    for (var f = f.values(), g = Array.isArray(f), h = 0, f = g ? f : f[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                        var i;
                        if (g) {
                            if (h >= f.length) break;
                            i = f[h++]
                        } else {
                            h = f.next();
                            if (h.done) break;
                            i = h.value
                        }
                        i = i;
                        b("Bootloader").done(i)
                    }
                }
            },
            onLog: function(c) {
                var g = [d, e];
                for (var k = 0; k < g.length; k++) {
                    var l = g[k];
                    for (var l = l.keys(), m = Array.isArray(l), n = 0, l = m ? l : l[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                        var o;
                        if (m) {
                            if (n >= l.length) break;
                            o = l[n++]
                        } else {
                            n = l.next();
                            if (n.done) break;
                            o = n.value
                        }
                        o = o;
                        b("Bootloader").beDone(o, f, babelHelpers["extends"]({
                            requestStart: h,
                            responseStart: i,
                            serverGenTime: j,
                            uri: a
                        }, c))
                    }
                }
            }
        })
    }

    function s() {
        var a = m,
            c = n;
        b("clearImmediate")(l);
        l = null;
        k = null;
        m = new Map();
        n = new Map();
        q(a, c)
    }

    function t() {
        var a = b("BootloaderEndpointConfig").maxBatchSize;
        return a <= 0 ? !1 : m.size + n.size >= a
    }
    a = {
        load: function(a, c, d) {
            (c ? m : n).set(a, d);
            if (b("BootloaderEndpointConfig").debugNoBatching || t()) {
                s();
                return
            }
            if (l != null) return;
            k = b("TimeSlice").getGuardedContinuation("Schedule async batch request: Bootloader._loadResources");
            l = b("setImmediateAcrossTransitions")(function() {
                k && k(function() {
                    return s()
                })
            })
        },
        forceFlush: function() {
            k && k(function() {
                return s()
            })
        }
    };
    e.exports = a
}), null);
__d("MetaConfigMap", [], (function(a, b, c, d, e, f) {
    "use strict";
    var g = {};
    a = {
        add: function(a, b) {
            for (var c in a) b && b.entry++, !(c in g) ? g[c] = a[c] : b && b.dup_entry++
        },
        get: function(a) {
            return g[a]
        }
    };
    b = a;
    f["default"] = b
}), 66);
__d("QPLHasteSupportDataStorage", [], (function(a, b, c, d, e, f) {
    "use strict";
    var g = {};
    a = {
        add: function(a, b) {
            Object.keys(a).forEach(function(c) {
                b && b.entry++;
                if (g[c] == null) {
                    var d = a[c];
                    g[c] = d
                } else b && b.dup_entry++
            })
        },
        get: function(a) {
            return g[a]
        }
    };
    f["default"] = a
}), 66);
__d("bx", ["unrecoverableViolation"], (function(a, b, c, d, e, f, g) {
    var h = {};

    function a(a) {
        var b = h[a];
        if (!b) throw c("unrecoverableViolation")("bx" + ('(...): Unknown file path "' + a + '"'), "staticresources");
        return b
    }
    a.add = function(a, b) {
        var c = !1;
        for (c in a) b && b.entry++, !(c in h) ? (a[c].loggingID = c, h[c] = a[c]) : b && b.dup_entry++
    };
    a.getURL = function(a) {
        return a.uri
    };
    g["default"] = a
}), 98);
__d("recoverableViolation", ["FBLogger"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a, b, d, e) {
        d = d === void 0 ? {} : d;
        d = d.error;
        b = c("FBLogger")(b);
        d ? b = b.catching(d) : b = b.blameToPreviousFrame();
        d = e == null ? void 0 : e.categoryKey;
        d != null && (b = b.addToCategoryKey(d));
        e = (d = e == null ? void 0 : e.trackOnly) != null ? d : !1;
        e ? b.debug(a) : b.mustfix(a);
        return null
    }
    g["default"] = a
}), 98);
__d("getFalcoLogPolicy_DO_NOT_USE", ["recoverableViolation"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = {
            r: 1
        },
        i = {};

    function a(a) {
        var b = i[a];
        if (b == null) {
            c("recoverableViolation")("Failed to find a Haste-supplied log policy for the Falco event ' +\n        'identified by token `" + a + "`. Failing open (ie. with a sampling rate of 1.0).", "staticresources");
            return h
        }
        return b
    }
    a.add = function(a, b) {
        Object.keys(a).forEach(function(c) {
            b && b.entry++, i[c] == null ? i[c] = a[c] : b && b.dup_entry++
        })
    };
    g["default"] = a
}), 98);
__d("ix", ["invariant", "nullthrows"], (function(a, b, c, d, e, f, g, h) {
    var i = {},
        j = new Set();

    function b(b) {
        var d = i[b];
        !d && h(0, 11798, b);
        a.__flight_execution_mode_DO_NOT_USE === "flight" && d.sprited === 1 && j.add(c("nullthrows")(d.origPath, "origPath should be defined on the server in react flight"));
        return d
    }
    b.add = function(a, b) {
        var c = !1;
        for (c in a) b && b.entry++, !(c in i) ? (a[c].loggingID = c, i[c] = a[c]) : b && b.dup_entry++
    };
    b.getUsedPaths_ONLY_FOR_REACT_FLIGHT = function() {
        a.__flight_execution_mode_DO_NOT_USE === "flight" || h(0, 34547);
        return Array.from(j)
    };
    b.getAllPaths = function() {
        var a = new Set();
        Object.values(i).map(function(a) {
            if ((a == null ? void 0 : a.sprited) === 0) return a.uri;
            else if ((a == null ? void 0 : a.sprited) === 1) return a._spi;
            else if ((a == null ? void 0 : a.sprited) === 2) return a.spi
        }).forEach(function(b) {
            return b != null && a.add(b)
        });
        return a
    };
    g["default"] = b
}), 98);
__d("justknobx", ["invariant"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = {};
    a = {
        getBool: function(a) {
            h(0, 47459)
        },
        getInt: function(a) {
            h(0, 47459)
        },
        _: function(a) {
            var b = i[a];
            b != null || h(0, 47458, a);
            return b.r
        },
        add: function(a, b) {
            for (var c in a) b && b.entry++, !(c in i) ? i[c] = a[c] : b && b.dup_entry++
        }
    };
    b = a;
    g["default"] = b
}), 98);
__d("qex", ["invariant", "BanzaiLazyQueue"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = {},
        j = {};
    a = {
        _: function(a) {
            var b = i[a];
            b != null || h(0, 11799, a);
            var c = b.r;
            b = b.l;
            b != null && !j[a] && (j[a] = !0, d("BanzaiLazyQueue").queuePost("qex", {
                l: b
            }));
            return c
        },
        add: function(a, b) {
            for (var c in a) b && b.entry++, !(c in i) ? i[c] = a[c] : b && b.dup_entry++
        }
    };
    b = a;
    g["default"] = b
}), 98);
__d("HasteSupportData", ["ix", "MetaConfigMap", "QPLHasteSupportDataStorage", "bx", "getFalcoLogPolicy_DO_NOT_USE", "gkx", "justknobx", "qex"], (function(a, b, c, d, e, f, g, h) {
    "use strict";

    function a(a, b) {
        var d = a.bxData,
            e = a.clpData,
            f = a.gkxData,
            g = a.ixData,
            i = a.metaconfigData,
            j = a.qexData,
            k = a.qplData;
        a = a.justknobxData;
        d != null && c("bx").add(d, b);
        e != null && c("getFalcoLogPolicy_DO_NOT_USE").add(e, b);
        f != null && c("gkx").add(f, b);
        g != null && h.add(g, b);
        i != null && c("MetaConfigMap").add(i, b);
        j != null && c("qex").add(j, b);
        k != null && c("QPLHasteSupportDataStorage").add(k, b);
        a != null && c("justknobx").add(a, b)
    }
    g.handle = a
}), 98);
__d("Parent", ["CSS"], (function(a, b, c, d, e, f, g) {
    function a(a, b) {
        b = b.toUpperCase();
        a = i(a, function(a) {
            return a.nodeName === b
        });
        return a instanceof Element ? a : null
    }

    function b(a, b) {
        a = i(a, function(a) {
            return a instanceof Element && d("CSS").hasClass(a, b)
        });
        return a instanceof Element ? a : null
    }

    function c(a, b) {
        a = a;
        if (typeof a.matches === "function") {
            while (a && a !== document && !a.matches(b)) a = a.parentNode;
            return a instanceof Element ? a : null
        } else if (typeof a.msMatchesSelector === "function") {
            while (a && a !== document && !a.msMatchesSelector(b)) a = a.parentNode;
            return a instanceof Element ? a : null
        } else return h(a, b)
    }

    function h(a, b) {
        a = a;
        var c = a;
        while (c.parentNode) c = c.parentNode;
        if (!(c instanceof Element) && !(c instanceof Document)) return null;
        c = c.querySelectorAll(b);
        while (a) {
            if (Array.prototype.indexOf.call(c, a) !== -1) return a instanceof Element ? a : null;
            a = a.parentNode
        }
        return a instanceof Element ? a : null
    }

    function e(a, b) {
        a = i(a, function(a) {
            return a instanceof Element && !!a.getAttribute(b)
        });
        return a instanceof Element ? a : null
    }

    function i(a, b) {
        a = a;
        while (a) {
            if (b(a)) return a;
            a = a.parentNode
        }
        return null
    }
    g.byTag = a;
    g.byClass = b;
    g.bySelector = c;
    g.bySelector_SLOW = h;
    g.byAttribute = e;
    g.find = i
}), 98);
__d("ContextualComponent", ["Parent"], (function(a, b, c, d, e, f, g) {
    a = function() {
        a.forNode = function(b) {
            return a.$1.get(b) || null
        };
        a.closestToNode = function(b) {
            b = d("Parent").find(b, function(b) {
                return !!a.forNode(b)
            });
            return b ? a.forNode(b) : null
        };
        a.register = function(b) {
            return new a(b)
        };

        function a(a) {
            var b = a.element,
                c = a.isRoot;
            a = a.parent;
            this.$2 = c;
            this.$3 = b;
            this.$4 = a;
            this.$5 = new Set();
            this.$6 = [];
            this.$7 = [];
            this.$8()
        }
        var b = a.prototype;
        b.onCleanup = function(a) {
            this.$6.push(a)
        };
        b.onUnmount = function(a) {
            this.$7.push(a)
        };
        b.cleanup = function() {
            this.$5.forEach(function(a) {
                return a.cleanup()
            }), this.$6.forEach(function(a) {
                return a()
            }), this.$6 = []
        };
        b.unmount = function() {
            this.cleanup();
            this.$5.forEach(function(a) {
                return a.unmount()
            });
            this.$7.forEach(function(a) {
                return a()
            });
            this.$7 = [];
            var b = this.$4;
            b && (a.$1["delete"](this.$3), b.$9(this))
        };
        b.reinitialize = function() {
            var b = this.$4;
            b && (b.$9(this), this.$4 = void 0);
            a.$1["delete"](this.$3);
            this.$8()
        };
        b.$8 = function() {
            if (!this.$2 && !this.$4) {
                var b = a.closestToNode(this.$3);
                b && (this.$4 = b)
            }
            this.$4 && this.$4.$10(this);
            a.$1.set(this.$3, this)
        };
        b.$10 = function(a) {
            this.$5.add(a)
        };
        b.$9 = function(a) {
            this.$5["delete"](a)
        };
        return a
    }();
    a.$1 = new Map();
    g["default"] = a
}), 98);
__d("__debug", [], (function(a, b, c, d, e, f) {
    a = {};
    f["default"] = a
}), 66);
__d("ServerJS", ["ContextualComponent", "ErrorGuard", "ServerJSDefine", "__debug", "err", "ge", "replaceTransportMarkers"], (function(a, b, c, d, e, f) {
    var g, h = 1,
        i = 2,
        j = 16,
        k = 0;
    a = function() {
        "use strict";

        function a() {
            this.$2 = {}, this.$1 = null, this.$4 = {}, this.$3 = void 0
        }
        var c = a.prototype;
        c.handle = function(a, b) {
            return this.$5(a, b, m)
        };
        c.handleWithCustomApplyEach = function(a, b, c) {
            this.$5(b, c, a)
        };
        c.$5 = function(a, c, d) {
            this.$3 = c;
            if (a.__guard != null) throw b("err")("ServerJS.handle called on data that has already been handled");
            a.__guard = !0;
            d(a.define || [], this.$6, this);
            d(a.markup || [], this.$7, this);
            d(a.elements || [], this.$8, this);
            this.$9(a.contexts || []);
            d(a.instances || [], this.$10, this);
            var e = d(a.pre_display_requires || [], this.$11, this);
            e = e.concat(d(a.require || [], this.$11, this));
            return {
                cancel: function() {
                    e.forEach(function(a) {
                        a && a.cancel()
                    })
                }
            }
        };
        c.handlePartial = function(a, b) {
            var c = this;
            (a.instances || []).forEach(function(a) {
                p(c.$2, a)
            });
            (a.markup || []).forEach(function(a) {
                o(c.$2, a)
            });
            (a.elements || []).forEach(function(a) {
                o(c.$2, a)
            });
            return this.handle(a, b)
        };
        c.setRelativeTo = function(a) {
            this.$1 = a;
            return this
        };
        c.cleanup = function(a) {
            var c = Object.keys(this.$2);
            a ? d.call(null, c, a.guard(function() {}, "SeverJS Cleanup requireLazy", {
                propagationType: a.PropagationType.ORPHAN
            })) : d.call(null, c, function() {});
            this.$2 = {};

            function f(c) {
                var d = this.$4[c],
                    a = d[0],
                    f = d[1];
                d = d[2];
                delete this.$4[c];
                f = f ? 'JS::call("' + a + '", "' + f + '", ...)' : 'JS::requireModule("' + a + '")';
                a = b("__debug").debugUnresolvedDependencies([a, c]);
                throw l(b("err")("%s did not fire because it has missing dependencies.\n%s", f, a), d)
            }
            for (a in this.$4)(g || (g = b("ErrorGuard"))).applyWithGuard(f, this, [a], {
                name: "ServerJS:cleanup id: " + a,
                project: "ServerJSCleanup"
            })
        };
        c.$6 = function(a, c, d, e) {
            return (g || (g = b("ErrorGuard"))).applyWithGuard(b("ServerJSDefine").handleDefine, b("ServerJSDefine"), [a, c, d, e, this.$1], {
                name: "JS::define"
            })
        };
        c.$11 = function(a, c, d, e) {
            return (g || (g = b("ErrorGuard"))).applyWithGuard(this.$12, this, [a, c, d, e], {
                name: c != null ? "JS::call" : "JS::requireModule"
            })
        };
        c.$12 = function(a, c, d, e) {
            var f = this;
            a = b("ServerJSDefine").getModuleNameAndHash(a);
            var m = a.name,
                n = a.hash,
                o;
            typeof c === "object" ? a = c : (a = d, o = c);
            d = [m].concat(a || []);
            var p;
            o != null ? p = "__call__" + m + "." + o : e != null ? p = "__call__" + m : p = "__requireModule__" + m;
            p += "__" + k++;
            this.$4[p] = [m, o, n];
            var q = this.$3 && this.$3.bigPipeContext,
                r = (g || (g = b("ErrorGuard"))).guard(function(a) {
                    a = b.call(null, m);
                    delete f.$4[p];
                    e && b("replaceTransportMarkers")({
                        relativeTo: f.$1,
                        bigPipeContext: q
                    }, e);
                    if (o != null) {
                        if (!a[o]) throw l(b("err")('Module %s has no method "%s"', m, o), n)
                    } else if (e != null && typeof a !== "function") throw l(b("err")("Module %s is not a function but was called with args", m), n);
                    var c = o != null ? a[o] : e != null && typeof a === "function" ? a : null;
                    c != null && (c.apply(a, e || []), r.__SMmeta = c.__SMmeta || {}, r.__SMmeta.module = r.__SMmeta.module || m, r.__SMmeta.name = r.__SMmeta.name || o)
                }, {
                    name: o != null ? "JS::call('" + m + "', '" + o + "', ...)" : e != null ? "JS::call('" + m + "', ...)" : "JS::requireModule('" + m + "')"
                });
            c = define(p, d, r, h | j | i, this, 1, this.$3);
            return c
        };
        c.$10 = function(a, c, d, e) {
            (g || (g = b("ErrorGuard"))).applyWithGuard(this.$13, this, [a, c, d, e], {
                name: "JS::instance"
            })
        };
        c.$13 = function(a, c, d, e) {
            var f = this,
                g = null;
            a = b("ServerJSDefine").getModuleNameAndHash(a);
            var h = a.name;
            a = a.hash;
            if (c) {
                var k = this.$3 && this.$3.bigPipeContext;
                g = function() {
                    var a = b.call(null, c[0]);
                    b("replaceTransportMarkers")({
                        relativeTo: f.$1,
                        bigPipeContext: k
                    }, d);
                    var e = Object.create(a.prototype);
                    a.apply(e, d);
                    return e
                }
            }
            define(h, c, g, i | j, null, e)
        };
        c.$7 = function(a, c, d) {
            (g || (g = b("ErrorGuard"))).applyWithGuard(this.$14, this, [a, c, d], {
                name: "JS::markup"
            })
        };
        c.$14 = function(a, c, d) {
            a = b("ServerJSDefine").getModuleNameAndHash(a);
            var e = a.name,
                f = a.hash;
            define(e, ["HTML"], function(a) {
                try {
                    return a.replaceJSONWrapper(c).getRootNode()
                } catch (a) {
                    throw l(a, f)
                }
            }, j, null, d)
        };
        c.$8 = function(a, c, d, e) {
            (g || (g = b("ErrorGuard"))).applyWithGuard(this.$15, this, [a, c, d, e], {
                name: "JS::element"
            })
        };
        c.$15 = function(a, c, d, e) {
            a = b("ServerJSDefine").getModuleNameAndHash(a);
            var f = a.name,
                g = a.hash;
            if (c === null && d != null) {
                define(f, null, null, j, null, d);
                return
            }
            a = [];
            var i = j;
            d = d || 0;
            e != null && (a.push(e), i |= h, d++);
            define(f, a, function(a) {
                a = b("ge")(c, a);
                if (!a) {
                    var d = "";
                    throw l(b("err")('Could not find element "%s"%s', c, d), g)
                }
                return a
            }, i, null, d)
        };
        c.$9 = function(a) {
            (g || (g = b("ErrorGuard"))).applyWithGuard(this.$16, this, [a], {
                name: "ContextualComponents"
            })
        };
        c.$16 = function(a) {
            var c = this,
                d = this.$3 && this.$3.bigPipeContext;
            a.map(function(a) {
                b("replaceTransportMarkers")({
                    relativeTo: c.$1,
                    bigPipeContext: d
                }, a);
                var e = a[0];
                return [a, n(e)]
            }).sort(function(a, b) {
                return a[1] - b[1]
            }).forEach(function(a) {
                a = a[0];
                var c = a[0];
                a = a[1];
                b("ContextualComponent").register({
                    element: c,
                    isRoot: a
                })
            })
        };
        return a
    }();

    function l(a, b) {
        a.serverHash = b;
        return a
    }

    function m(a, b, c) {
        return a.map(function(a) {
            return b.apply(c, a)
        })
    }

    function n(a) {
        var b = 0;
        a = a;
        while (a) a = a.parentElement, b++;
        return b
    }

    function o(c, a) {
        var d = b("ServerJSDefine").getModuleNameAndHash(a[0]);
        d = d.name;
        d in c || (a[2] = (a[2] || 0) + 1);
        c[d] = !0
    }

    function p(c, a) {
        var d = b("ServerJSDefine").getModuleNameAndHash(a[0]);
        d = d.name;
        d in c || (a[3] = (a[3] || 0) + 1);
        c[d] = !0
    }
    e.exports = a
}), null);
__d("HasteResponse", ["Bootloader", "BootloaderEvents", "ClientConsistencyEventEmitter", "HasteSupportData", "ServerJS", "TimeSlice", "__debug", "fb-error", "performanceAbsoluteNow"], (function(a, b, c, d, e, f) {
    "use strict";
    var g, h = b("fb-error").getSimpleHash,
        i = new Set(),
        j = {
            handleSRPayload: function(a, c) {
                var d = a.hsdp;
                a = a.hblp;
                d && b("HasteSupportData").handle(d, c == null ? void 0 : c.hsdp);
                a && b("Bootloader").handlePayload(a, c == null ? void 0 : c.hblp);
                (a == null ? void 0 : a.consistency) != null && b("ClientConsistencyEventEmitter").emit("newEntry", a.consistency)
            },
            handle: function(a, c) {
                var d = a.jsmods,
                    e = a.allResources;
                a = a.hsrp;
                var f = c.source,
                    k = c.sourceDetail,
                    l = c.onBlocking,
                    m = c.onLog;
                c = c.onAll;
                var n = (g || (g = b("performanceAbsoluteNow")))(),
                    o;
                if (k == null) o = !0;
                else {
                    var p = h(f, k);
                    i.has(p) ? o = !1 : (o = !0, i.add(p))
                }
                var q = {
                    hsdp: {
                        entry: 0,
                        dup_entry: 0
                    },
                    hblp: {
                        rsrc: 0,
                        dup_rsrc: 0,
                        comp: 0,
                        dup_comp: 0
                    },
                    sjsp: {
                        define: 0,
                        dup_user_define: 0,
                        dup_system_define: 0,
                        require: 0
                    }
                };
                a && j.handleSRPayload(a, q);
                var r = 0,
                    s = 0;
                b("Bootloader").loadResources((p = e) != null ? p : [], {
                    onBlocking: function() {
                        q.sjsp.require += ((d == null ? void 0 : d.require) || []).length;
                        q.sjsp.define += ((d == null ? void 0 : d.define) || []).length;
                        var a = b("__debug").getDupCount(),
                            c = a[0];
                        a = a[1];
                        q.sjsp.dup_user_define -= c;
                        q.sjsp.dup_system_define -= a;
                        r = (g || (g = b("performanceAbsoluteNow")))();
                        new(b("ServerJS"))().handle(d || {});
                        s = g();
                        var e = b("__debug").getDupCount();
                        c = e[0];
                        a = e[1];
                        q.sjsp.dup_user_define += c;
                        q.sjsp.dup_system_define += a;
                        l == null ? void 0 : l()
                    },
                    onAll: c,
                    onLog: function(a) {
                        a = {
                            source: f,
                            sourceDetail: k,
                            isFirstIdentical: o,
                            timesliceContext: b("TimeSlice").getContext(),
                            startTime: n,
                            logTime: (g || (g = b("performanceAbsoluteNow")))(),
                            jsmodsStart: r,
                            jsmodsEnd: s,
                            rsrcs: a,
                            payloadStats: q
                        };
                        m == null ? void 0 : m(a);
                        b("BootloaderEvents").notifyHasteResponse(a)
                    }
                })
            }
        };
    e.exports = j
}), null);
__d("OdsWebBatchFalcoEvent", ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1838142");
    b = d("FalcoLoggerInternal").create("ods_web_batch", a);
    e = b;
    g["default"] = e
}), 98);
__d("FalcoConsentChecker", [], (function(a, b, c, d, e, f) {
    "use strict";

    function g(a, b, c, d) {
        var e;
        switch (typeof d) {
            case "string":
                e = a[String(d)];
                return !e ? !1 : e <= b;
            case "number":
                return g(a, b, c, c[Number(d)]);
            default:
                e = !1;
                if (Array.isArray(d)) {
                    var f = d[0];
                    for (var h = 1; h < d.length; h++) {
                        e = g(a, b, c, d[h]);
                        if (e) {
                            if (f === "or") return !0
                        } else if (f === "and") return !1
                    }
                }
                return e
        }
    }
    f["default"] = g
}), 66);
__d("FalcoUtils", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        if (a) {
            var b = a.fbIdentity,
                c = a.appScopedIdentity;
            a = a.claim;
            var d = "";
            if (b) {
                var e = b.accountId;
                b = b.actorId;
                d = e + "^#" + b + "^#"
            } else c !== void 0 && (d = "^#^#" + c);
            return d + "^#" + a
        }
        return ""
    }
    f.identityToString = a
}), 66);
__d("FBJSON", [], (function(a, b, c, d, e, f) {
    a = JSON.parse;
    b = JSON.stringify;
    f.parse = a;
    f.stringify = b
}), 66);
__d("Run", ["cr:925100"], (function(a, b, c, d, e, f, g) {
    "use strict";
    g.__domContentCallback = (a = b("cr:925100")).__domContentCallback;
    g.__onloadCallback = a.__onloadCallback;
    g.__removeHook = a.__removeHook;
    g.onAfterLoad = a.onAfterLoad;
    g.onAfterUnload = a.onAfterUnload;
    g.onBeforeUnload = a.onBeforeUnload;
    g.maybeOnBeforeUnload = a.maybeOnBeforeUnload;
    g.onCleanupOrLeave = a.onCleanupOrLeave;
    g.onLeave = a.onLeave;
    g.onLoad = a.onLoad;
    g.onUnload = a.onUnload
}), 98);
__d("pageID", ["WebSession"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = d("WebSession").getPageId_DO_NOT_USE();
    g["default"] = a
}), 98);
__d("WebStorageMutex", ["WebStorage", "clearTimeout", "pageID", "setTimeout"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = null,
        i = !1,
        j = c("pageID");

    function k() {
        i || (i = !0, h = c("WebStorage").getLocalStorage());
        return h
    }
    a = function() {
        function a(a) {
            this.name = a
        }
        a.testSetPageID = function(a) {
            j = a
        };
        var b = a.prototype;
        b.$2 = function() {
            var a, b = k();
            if (!b) return j;
            b = b.getItem("mutex_" + this.name);
            b = ((a = b) != null ? a : "").split(":");
            return b && parseInt(b[1], 10) >= Date.now() ? b[0] : null
        };
        b.$3 = function(a) {
            var b = k();
            if (!b) return;
            a = a == null ? 1e3 : a;
            a = Date.now() + a;
            c("WebStorage").setItemGuarded(b, "mutex_" + this.name, j + ":" + a)
        };
        b.hasLock = function() {
            return this.$2() === j
        };
        b.lock = function(a, b, d) {
            var e = this;
            this.$1 && c("clearTimeout")(this.$1);
            j === (this.$2() || j) && this.$3(d);
            this.$1 = c("setTimeout")(function() {
                e.$1 = null;
                var c = e.hasLock() ? a : b;
                c && c(e)
            }, 0)
        };
        b.unlock = function() {
            this.$1 && c("clearTimeout")(this.$1);
            var a = k();
            a && this.hasLock() && a.removeItem("mutex_" + this.name)
        };
        return a
    }();
    g["default"] = a
}), 98);
__d("guid", [], (function(a, b, c, d, e, f) {
    function a() {
        return "f" + (Math.random() * (1 << 30)).toString(16).replace(".", "")
    }
    f["default"] = a
}), 66);
__d("TimerStorage", [], (function(a, b, c, d, e, f) {
    a = {
        ANIMATION_FRAME: "ANIMATION_FRAME",
        IDLE_CALLBACK: "IDLE_CALLBACK",
        IMMEDIATE: "IMMEDIATE",
        INTERVAL: "INTERVAL",
        TIMEOUT: "TIMEOUT"
    };
    var g = {};
    Object.keys(a).forEach(function(a) {
        return g[a] = {}
    });
    b = babelHelpers["extends"]({}, a, {
        set: function(a, b) {
            g[a][b] = !0
        },
        unset: function(a, b) {
            delete g[a][b]
        },
        clearAll: function(a, b) {
            Object.keys(g[a]).forEach(b), g[a] = {}
        },
        getStorages: function() {
            return {}
        }
    });
    c = b;
    f["default"] = c
}), 66);
__d("nativeRequestAnimationFrame", [], (function(a, b, c, d, e, f) {
    b = a.__fbNativeRequestAnimationFrame || a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame;
    c = b;
    f["default"] = c
}), 66);
__d("requestAnimationFramePolyfill", ["nativeRequestAnimationFrame", "performanceNow"], (function(a, b, c, d, e, f, g) {
    var h = 0;
    b = c("nativeRequestAnimationFrame") || function(b) {
        var d = c("performanceNow")(),
            e = Math.max(0, 16 - (d - h));
        h = d + e;
        return a.setTimeout(function() {
            b(c("performanceNow")())
        }, e)
    };
    d = b;
    g["default"] = d
}), 98);
__d("requestAnimationFrameAcrossTransitions", ["TimeSlice", "requestAnimationFramePolyfill"], (function(a, b, c, d, e, f, g) {
    function a(a) {
        a = c("TimeSlice").guard(a, "requestAnimationFrame", {
            propagationType: c("TimeSlice").PropagationType.CONTINUATION
        });
        return c("requestAnimationFramePolyfill")(a)
    }
    g["default"] = a
}), 98);
__d("requestAnimationFrame", ["TimeSlice", "TimerStorage", "requestAnimationFrameAcrossTransitions"], (function(a, b, c, d, e, f, g) {
    function a(a) {
        function b(b) {
            c("TimerStorage").unset(c("TimerStorage").ANIMATION_FRAME, d), a(b)
        }
        c("TimeSlice").copyGuardForWrapper(a, b);
        b.__originalCallback = a;
        var d = c("requestAnimationFrameAcrossTransitions")(b);
        c("TimerStorage").set(c("TimerStorage").ANIMATION_FRAME, d);
        return d
    }
    g["default"] = a
}), 98);
__d("PersistedQueue", ["AnalyticsCoreData", "BaseEventEmitter", "ExecutionEnvironment", "FBJSON", "Run", "WebStorage", "WebStorageMutex", "err", "guid", "nullthrows", "performanceAbsoluteNow", "requestAnimationFrame"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = 24 * 60 * 60 * 1e3,
        i = 30 * 1e3,
        j = new(c("BaseEventEmitter"))(),
        k;

    function l(a) {
        a === void 0 && (a = !1);
        if (k === void 0) {
            var b;
            if (((b = c("AnalyticsCoreData").queue_activation_experiment) != null ? b : !1) && a) try {
                return c("WebStorage").getLocalStorageForRead()
            } catch (a) {
                return null
            }
            b = "check_quota";
            try {
                a = c("WebStorage").getLocalStorage();
                a ? (a.setItem(b, b), a.removeItem(b), k = a) : k = null
            } catch (a) {
                k = null
            }
        }
        return k
    }

    function m(a) {
        var b = a.prev,
            c = a.next;
        c && (c.prev = b);
        b && (b.next = c);
        a.next = null;
        a.prev = null
    }

    function n(a) {
        return {
            item: a,
            next: null,
            prev: null
        }
    }

    function o(a, b) {
        return a + "^$" + ((a = b == null ? void 0 : b.queueNameSuffix) != null ? a : "")
    }
    var p = {},
        q = {},
        r = {},
        s = !1;
    a = function() {
        function a(a, b) {
            var d, e = this;
            this.$7 = 0;
            this.$3 = a;
            this.$5 = (d = b == null ? void 0 : b.queueNameSuffix) != null ? d : "";
            this.$4 = o(a, b);
            this.$11 = this.$4 + "^$" + c("guid")();
            this.$13 = !1;
            if (b) {
                this.$8 = (d = b.max_age_in_ms) != null ? d : h;
                this.$12 = b.migrate
            } else this.$8 = h;
            this.$9 = [j.addListener("active", function() {
                (e.$10 != null || !e.$13) && (e.$13 = !0, e.$10 = null, e.$14())
            }), j.addListener("inactive", function() {
                e.$10 == null && (e.$10 = Date.now(), e.$15())
            })];
            (c("ExecutionEnvironment").canUseDOM || c("ExecutionEnvironment").isInWorker) && c("requestAnimationFrame")(function() {
                return e.$14()
            })
        }
        var b = a.prototype;
        b.isActive = function() {
            var a = this.$10;
            if (a == null) return !0;
            if (Date.now() - a > i) {
                this.$10 = null;
                j.emit("active", null);
                return !0
            }
            return !1
        };
        b.$14 = function() {
            this.$16(), this.$17()
        };
        b.$15 = function() {
            this.$18()
        };
        b.getFullName = function() {
            return this.$4
        };
        b.getQueueNameSuffix = function() {
            return this.$5
        };
        a.isQueueActivateExperiment = function() {
            return s
        };
        a.setOnQueueActivateExperiment = function() {
            s = !0
        };
        a.create = function(b, d) {
            var e = o(b, d);
            if (e in p) throw c("err")("Duplicate queue created: " + b);
            d = new a(b, d);
            p[e] = d;
            r[b] ? r[b].push(d) : r[b] = [d];
            e = q[b];
            e && d.setHandler(e);
            return d
        };
        a.setHandler = function(a, b) {
            if (r[a]) {
                var c = r[a];
                for (var c = c, d = Array.isArray(c), e = 0, c = d ? c : c[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                    var f;
                    if (d) {
                        if (e >= c.length) break;
                        f = c[e++]
                    } else {
                        e = c.next();
                        if (e.done) break;
                        f = e.value
                    }
                    f = f;
                    f.setHandler(b)
                }
            }
            q[a] = b
        };
        b.destroy = function() {
            this.$9.forEach(function(a) {
                return a.remove()
            })
        };
        a.destroy = function(a, b) {
            a = o(a, b);
            p[a].destroy();
            delete p[a]
        };
        b.setHandler = function(a) {
            this.$6 = a;
            this.$17();
            return this
        };
        b.$17 = function() {
            this.$7 > 0 && this.$6 && this.$6(this)
        };
        b.length = function() {
            return this.$7
        };
        b.enumeratedLength = function() {
            return this.$19().length
        };
        a.isPersistenceAllowed = function() {
            var a = l();
            return !a ? !1 : !0
        };
        a.getSuffixesForKey = function(a) {
            var b = [];
            try {
                var c = l(!0);
                if (!c) return b;
                a = a + "^$";
                for (var d = 0; d < c.length; d++) {
                    var e = c.key(d);
                    if (typeof e === "string" && e.startsWith(a)) {
                        e = e.split("^$");
                        if (e.length > 2) {
                            e = e[1];
                            b.push(e)
                        } else b.push("")
                    }
                }
            } catch (a) {}
            return b
        };
        b.$16 = function() {
            var b = this;
            if (this.$5 === "") {
                this.$20();
                return
            }
            var a = l(!0);
            if (!a) return;
            var e = this.$4 + "^$",
                f = new(c("WebStorageMutex"))(e),
                g = this.$12;
            f.lock(function(f) {
                var h = Date.now() - b.$8;
                try {
                    for (var i = 0; i < a.length; i++) {
                        var j = a.key(i);
                        if (typeof j === "string" && j.startsWith(e)) {
                            var k = a.getItem(j);
                            a.removeItem(j);
                            if (k != null && k.startsWith("{")) {
                                j = d("FBJSON").parse(c("nullthrows")(k));
                                if (j.ts > h) try {
                                    for (var k = j.items, j = Array.isArray(k), l = 0, k = j ? k : k[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                                        var m;
                                        if (j) {
                                            if (l >= k.length) break;
                                            m = k[l++]
                                        } else {
                                            l = k.next();
                                            if (l.done) break;
                                            m = l.value
                                        }
                                        m = m;
                                        m = g != null ? g(m) : m;
                                        b.$21(m)
                                    }
                                } catch (a) {}
                            }
                        }
                    }
                } catch (a) {}
                f.unlock()
            })
        };
        b.$20 = function() {
            var b = this,
                a = l(!0);
            if (!a) return;
            var e = this.$4,
                f = new(c("WebStorageMutex"))(e),
                g = this.$12;
            f.lock(function(f) {
                var h = Date.now() - b.$8;
                try {
                    for (var i = 0; i < a.length; i++) {
                        var j = a.key(i);
                        if (typeof j === "string" && j.startsWith(e)) {
                            var k = j.split("^$");
                            if (k.length <= 2 || k[1] === "") {
                                k = a.getItem(j);
                                a.removeItem(j);
                                if (k != null && k.startsWith("{")) {
                                    j = d("FBJSON").parse(c("nullthrows")(k));
                                    if (j.ts > h) try {
                                        for (var k = j.items, j = Array.isArray(k), l = 0, k = j ? k : k[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                                            var m;
                                            if (j) {
                                                if (l >= k.length) break;
                                                m = k[l++]
                                            } else {
                                                l = k.next();
                                                if (l.done) break;
                                                m = l.value
                                            }
                                            m = m;
                                            m = g != null ? g(m) : m;
                                            b.$21(m)
                                        }
                                    } catch (a) {}
                                }
                            }
                        }
                    }
                } catch (a) {}
                f.unlock()
            })
        };
        b.$18 = function() {
            var a = l();
            if (!a) return;
            var b = this.$19();
            if (b.length === 0) {
                a.getItem(this.$11) != null && a.removeItem(this.$11);
                return
            }
            c("WebStorage").setItemGuarded(a, this.$11, d("FBJSON").stringify({
                items: b.map(function(a) {
                    return a
                }),
                ts: c("performanceAbsoluteNow")()
            }))
        };
        b.$19 = function() {
            var a = this.$1,
                b = [];
            if (!a) return b;
            do b.push(a.item); while (a = a.prev);
            return b.reverse()
        };
        b.markItemAsCompleted = function(a) {
            var b = a.prev;
            m(a);
            this.$1 === a && (this.$1 = b);
            this.$7--;
            this.isActive() || this.$18()
        };
        b.markItemAsFailed = function(a) {
            m(a);
            var b = this.$2;
            if (b) {
                var c = b.prev;
                c && (c.next = a, a.prev = c);
                a.next = b;
                b.prev = a
            }
            this.$2 = a;
            this.isActive() && this.$17()
        };
        b.markItem = function(a, b) {
            b ? this.markItemAsCompleted(a) : this.markItemAsFailed(a)
        };
        b.$21 = function(a) {
            a = n(a);
            var b = this.$1;
            b && (b.next = a, a.prev = b);
            this.$1 = a;
            this.$2 || (this.$2 = a);
            this.$7++
        };
        b.wrapAndEnqueueItem = function(a) {
            this.$21(a), this.isActive() ? this.$17() : this.$18()
        };
        b.dequeueItem = function() {
            if (this.$10 != null) return null;
            var a = this.$2;
            if (!a) return null;
            this.$2 = a.next;
            return a
        };
        return a
    }();
    a.eventEmitter = j;
    if (c("ExecutionEnvironment").canUseDOM) {
        var t = d("Run").maybeOnBeforeUnload(function() {
            j.emit("inactive", null), t == null ? void 0 : t.remove()
        }, !1);
        if (!t) var u = d("Run").onUnload(function() {
            j.emit("inactive", null), u.remove()
        })
    }
    g["default"] = a
}), 98);
__d("ServerTime", ["ServerTimeData"], (function(a, b, c, d, e, f, g) {
    var h, i = 0;
    f = 0;
    var j = null;
    h = (h = (typeof window !== "undefined" ? window : self).performance) == null ? void 0 : h.timing;
    if (h) {
        var k = h.requestStart;
        h = h.domLoading;
        if (k && h) {
            var l = c("ServerTimeData").timeOfResponseStart - c("ServerTimeData").timeOfRequestStart;
            k = h - k - l;
            f = k / 2;
            l = h - c("ServerTimeData").timeOfResponseStart - f;
            h = Math.max(50, k * .8);
            Math.abs(l) > h && (i = l, j = Date.now())
        }
    } else d(c("ServerTimeData").serverTime);

    function a() {
        return Date.now() - i
    }

    function b() {
        return i
    }

    function d(a) {
        a = Date.now() - a;
        Math.abs(i - a) > 6e4 && (i = a, j = Date.now())
    }

    function e() {
        return j === null ? null : Date.now() - j
    }
    f = a;
    k = b;
    g.getMillis = a;
    g.getOffsetMillis = b;
    g.update = d;
    g.getMillisSinceLastUpdate = e;
    g.get = f;
    g.getSkew = k
}), 98);
__d("FalcoLoggerInternal", ["AnalyticsCoreData", "BaseEventEmitter", "FBLogger", "FalcoConsentChecker", "FalcoUtils", "ODS", "PersistedQueue", "Promise", "Random", "ServerTime", "nullthrows", "performanceAbsoluteNow"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = 500 * 1024 * .6,
        i = "ods_web_batch",
        j = new Map();

    function k(a) {
        "rate" in a && (a.policy = {
            r: a.rate
        });
        var b = a.extra;
        typeof b !== "string" && (a.extra = JSON.stringify(b));
        return a
    }

    function a(a, b) {
        var d;
        d = (d = c("PersistedQueue").getSuffixesForKey(a)) != null ? d : [];
        d.push(b);
        for (var d = d, e = Array.isArray(d), f = 0, d = e ? d : d[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
            var g;
            if (e) {
                if (f >= d.length) break;
                g = d[f++]
            } else {
                f = d.next();
                if (f.done) break;
                g = f.value
            }
            g = g;
            var h = a + "^$" + g;
            if (j.has(h)) continue;
            g = c("PersistedQueue").create(a, {
                migrate: k,
                queueNameSuffix: g
            });
            j.set(h, g)
        }
        return c("nullthrows")(j.get(a + "^$" + b))
    }
    f = d("FalcoUtils").identityToString(c("AnalyticsCoreData").identity);
    var l = a("falco_queue_log", f),
        m = a("falco_queue_immediately", f),
        n = a("falco_queue_critical", f),
        o = new(c("BaseEventEmitter"))();

    function p(a, b) {
        d("ODS").bumpEntityKey(1344, "falco.fabric.www." + c("AnalyticsCoreData").push_phase, a, b)
    }

    function q(a, b, c, e) {
        if (a === i) return;
        d("ODS").bumpEntityKey(1344, "falco.event." + a, b, c);
        e && p(b, c)
    }
    var r = {};

    function s(a, b) {
        var d = c("Random").coinflip(b.r);
        b = b.c;
        b != null && c("AnalyticsCoreData").consents != null && (d = d && t(b, c("AnalyticsCoreData").consents, a));
        return d
    }

    function t(a, b, d) {
        var e = r[a];
        e == null && (e = r[a] = JSON.parse(a));
        return c("FalcoConsentChecker")(b, d, e, e[0])
    }

    function u() {
        return c("performanceAbsoluteNow")() - d("ServerTime").getOffsetMillis()
    }

    function v(a, b, d, e, f, g) {
        if (c("AnalyticsCoreData").enable_observer) {
            a = babelHelpers["extends"]({
                name: a,
                time: b,
                sampled: d,
                getData: f,
                policy: e
            }, g && {
                getPrivacyContext: g
            });
            o.emit("event", a)
        }
    }

    function w(a, b, d, e, f, g) {
        f = JSON.stringify(f);
        if (f.length > h) {
            q(a, "js.drop.oversized_message", 1, !0);
            c("FBLogger")("falco", "oversized_message:" + a).warn('Dropping event "%s" due to exceeding the max size %s at %s', a, h, f.length);
            return
        }
        g.wrapAndEnqueueItem({
            name: a,
            policy: b,
            time: d,
            extra: f,
            privacyContext: e
        });
        q(a, "js.event.write_to_queue", 1, !0)
    }

    function x(a, b, c, d, e) {
        try {
            var f = u(),
                g = s(f, b);
            if (g) {
                var h = d(),
                    i = c && c();
                w(a, b, f, i, h, e)
            }
            v(a, f, g, b, d, c)
        } catch (a) {
            z(a)
        }
    }

    function y(a, c, d, e, f) {
        try {
            var g = u(),
                h = s(g, c);
            if (h) {
                var i = e(),
                    j = b("Promise").resolve(d && d());
                return b("Promise").all([i, j]).then(function(b) {
                    var d = b[0],
                        e = b[1];
                    w(a, c, g, e, d, f);
                    v(a, g, h, c, function() {
                        return d
                    }, e && function() {
                        return e
                    })
                })
            } else {
                v(a, g, h, c, e, d);
                return b("Promise").resolve()
            }
        } catch (a) {
            return b("Promise").reject(a)
        }
    }

    function z(a) {
        var b = c("FBLogger")("falco");
        a instanceof Error ? b.catching(a).warn("Error while attempting to log to Falco") : b.warn("Caught non-error while attempting to log to Falco: %s", JSON.stringify(a))
    }

    function e(a, b) {
        return {
            log: function(c, d) {
                x(a, b, d, c, l)
            },
            logAsync: function(c, d) {
                y(a, b, d, c, l)["catch"](z)
            },
            logImmediately: function(c, d) {
                x(a, b, d, c, m)
            },
            logCritical: function(c, d) {
                x(a, b, d, c, n)
            },
            logRealtimeEvent: function(c, d) {
                x(a, b, d, c, n)
            }
        }
    }
    g.observable = o;
    g.create = e
}), 98);
__d("ODS", ["ExecutionEnvironment", "OdsWebBatchFalcoEvent", "Random", "Run", "clearTimeout", "gkx", "setTimeout", "unrecoverableViolation"], (function(a, b, c, d, e, f, g) {
    var h, i = c("ExecutionEnvironment").canUseDOM || c("ExecutionEnvironment").isInWorker,
        j = {};

    function k(a, b, c, d, e) {
        var f;
        d === void 0 && (d = 1);
        e === void 0 && (e = 1);
        var g = (f = j[b]) != null ? f : null;
        if (g != null && g <= 0) return;
        h = h || {};
        var i = h[a] || (h[a] = {}),
            k = i[b] || (i[b] = {}),
            l = k[c] || (k[c] = [0, null]),
            n = Number(d),
            o = Number(e);
        g > 0 && (n /= g, o /= g);
        if (!isFinite(n) || !isFinite(o)) return;
        l[0] += n;
        if (arguments.length >= 5) {
            var p = l[1];
            p == null && (p = 0);
            l[1] = p + o
        }
        m()
    }
    var l;

    function m() {
        if (l != null) return;
        l = c("setTimeout")(function() {
            n()
        }, c("gkx")("708253") ? 13e3 / 2 : 5e3)
    }

    function a(a, b) {
        if (!i) return;
        j[a] = d("Random").random() < b ? b : 0
    }

    function b(a, b, c, d) {
        d === void 0 && (d = 1);
        if (!i) return;
        k(a, b, c, d)
    }

    function e(a, b, c, d, e) {
        d === void 0 && (d = 1);
        e === void 0 && (e = 1);
        if (!i) return;
        k(a, b, c, d, e)
    }

    function n(a) {
        a === void 0 && (a = "normal");
        if (!i) return;
        c("clearTimeout")(l);
        l = null;
        if (h == null) return;
        var b = h;
        h = null;

        function d() {
            return {
                batch: b
            }
        }
        a === "critical" ? c("OdsWebBatchFalcoEvent").logCritical(d) : c("OdsWebBatchFalcoEvent").log(d)
    }
    i && d("Run").onUnload(function() {
        n("critical")
    });
    g.setEntitySample = a;
    g.bumpEntityKey = b;
    g.bumpFraction = e;
    g.flush = n
}), 98);
__d("PerfFalcoEvent", ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1744178");
    b = d("FalcoLoggerInternal").create("perf", a);
    e = b;
    g["default"] = e
}), 98);
__d("CurrentLocale", ["IntlCurrentLocale"], (function(a, b, c, d, e, f, g) {
    a = {
        get: function() {
            return c("IntlCurrentLocale").code
        }
    };
    b = a;
    g["default"] = b
}), 98);
__d("Locale", ["SiteData"], (function(a, b, c, d, e, f) {
    function a() {
        return b("SiteData").is_rtl
    }
    e.exports = {
        isRTL: a
    }
}), null);
__d("PerfXSharedFields", ["CurrentLocale", "Locale", "SiteData"], (function(a, b, c, d, e, f, g) {
    var h = typeof window !== "undefined" ? window : self,
        i = {
            addCommonValues: function(a) {
                var b = h == null ? void 0 : h.navigator;
                try {
                    b && b.hardwareConcurrency !== void 0 && (a.num_cores = b.hardwareConcurrency), b && b.deviceMemory && (a.ram_gb = b.deviceMemory), b && b.connection && (typeof b.connection.downlink === "number" && (a.downlink_megabits = b.connection.downlink), typeof b.connection.effectiveType === "string" && (a.effective_connection_type = b.connection.effectiveType), typeof b.connection.rtt === "number" && (a.rtt_ms = b.connection.rtt))
                } catch (a) {
                    if (a.message !== "can't access dead object") throw a
                }
                a.client_push_phase = c("SiteData").push_phase;
                a.client_revision = c("SiteData").client_revision;
                c("SiteData").server_revision != null && (a.server_revision = c("SiteData").server_revision);
                a.locale = c("CurrentLocale").get();
                a.isRTL = Number(c("Locale").isRTL());
                return a
            },
            getCommonData: function() {
                var a = {};
                i.addCommonValues(a);
                return a
            }
        };
    a = i;
    g["default"] = a
}), 98);
__d("QPLEvent", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        return a.i
    }

    function b(a) {
        return (a = a.r) != null ? a : 0
    }

    function c(a) {
        return (a = a.m) != null ? a : 1
    }
    f.getMarkerId = a;
    f.getSampleRate = b;
    f.getSamplingMethod = c
}), 66);
__d("QPLTimestamp", [], (function(a, b, c, d, e, f) {
    "use strict";

    function g(a) {
        if (a === 0) return "0";
        a = a.toFixed(6).split(".", 2);
        var b = a[0];
        a = a[1];
        return b === "0" ? a.replace(/^0+/, "") : b + a
    }

    function a(a, b) {
        b = b - a;
        return g(b)
    }
    f.timestampToSerializedNanoseconds = g;
    f.calculateDurationAsNanoseconds = a
}), 66);
__d("crc32", [], (function(a, b, c, d, e, f) {
    function b(a) {
        var b = -1;
        for (var c = 0, d = a.length; c < d; c++) b = b >>> 8 ^ g[(b ^ a.charCodeAt(c)) & 255];
        return ~b
    }
    var g = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
    a.Int32Array !== void 0 && (g = new Int32Array(g));
    f["default"] = b
}), 66);
__d("QPLUtils", ["crc32"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function h(a) {
        return c("crc32")(a) >>> 0
    }

    function a(a) {
        return a != null ? h(a) : 0
    }
    g.unsignedCrc32 = h;
    g.deriveInstanceKey = a
}), 98);
__d("QuickPerformanceLoggerTypes", [], (function(a, b, c, d, e, f) {
    "use strict";
    a = 1;
    b = 3;
    f.EVENT_BASED_SAMPLING = a;
    f.USER_BASED_SAMPLING = b
}), 66);
__d("uuidv4", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a() {
        var a;
        a = (a = self) == null ? void 0 : (a = a.crypto) == null ? void 0 : a.randomUUID;
        return typeof a === "function" ? self.crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
            var b = Math.random() * 16 | 0;
            a = a === "x" ? b : b & 3 | 8;
            return a.toString(16)
        })
    }
    f["default"] = a
}), 66);
__d("QPLCore", ["QPLEvent", "QPLTimestamp", "QPLUtils", "QuickPerformanceLoggerTypes", "uuidv4"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function h(a, b, c, d) {
        var e = b[a];
        if (!e || Object.entries(e).length === 0) return null;
        var f = {};
        Object.keys(e).forEach(function(a) {
            var b = e[a];
            b == null || b.length === 0 ? delete e[a] : d ? f[a] = d(b) : f[a] = b
        });
        return b = {}, b[a] = babelHelpers["extends"]({}, c && c[a], f), b
    }

    function i(a, b) {
        if (a == null) return b;
        var c = babelHelpers["extends"]({}, b, h("string", a, b), h("int", a, b, Math.trunc), h("double", a, b), h("bool", a, b), h("string_array", a, b), h("int_array", a, b, function(a) {
            return a.map(Math.trunc)
        }), h("double_array", a, b), h("bool_array", a, b));
        Object.keys(c).forEach(function(a) {
            var b = c[a];
            (b == null || Object.entries(b).length === 0) && delete c[a]
        });
        return Object.entries(c).length !== 0 ? c : null
    }

    function j(a, b) {
        var c = {};
        b.trackedForLoss === !0 && (c.tracked_for_loss = !0);
        typeof b.absoluteTimeOrigin === "number" && (c.absolute_time_origin_ns = d("QPLTimestamp").timestampToSerializedNanoseconds(b.absoluteTimeOrigin));
        b = babelHelpers["extends"]({}, a, c);
        return b
    }

    function k(a, b) {
        if (!b) return a;
        var c = {};
        b.string && (c.annotations = b.string);
        b["int"] && (c.annotations_int = b["int"]);
        b["double"] && (c.annotations_double = b["double"]);
        b.bool && (c.annotations_bool = b.bool);
        b.string_array && (c.annotations_string_array = b.string_array);
        b.int_array && (c.annotations_int_array = b.int_array);
        b.double_array && (c.annotations_double_array = b.double_array);
        b.bool_array && (c.annotations_bool_array = b.bool_array);
        return babelHelpers["extends"]({}, a, c)
    }
    var l = new Map([
        [d("QuickPerformanceLoggerTypes").EVENT_BASED_SAMPLING, "random_sampling"],
        [d("QuickPerformanceLoggerTypes").USER_BASED_SAMPLING, "per_user"]
    ]);

    function m(a, b) {
        if (a === 0) return !1;
        if (a <= 1) return !0;
        return typeof b === "string" ? d("QPLUtils").unsignedCrc32(b) % a === 0 : Math.random() * a <= 1
    }
    a = function() {
        function a(a) {
            this.$2 = 1;
            this.$3 = 100;
            this.$4 = new Map();
            this.$5 = new Map();
            this.$6 = null;
            this.$8 = new Map();
            this.activeMarkers = new Map();
            this.$1 = a;
            this.$7 = a.logger;
            this.$5 = (a = a.listenersWithMarker) != null ? a : new Map();
            this.$9 = new Map()
        }
        var b = a.prototype;
        b.getMarker = function(a, b) {
            a = this.$10(d("QPLEvent").getMarkerId(a));
            if (!a) return null;
            a = a.get(b);
            return !a ? null : a
        };
        b.$10 = function(a) {
            return this.activeMarkers.get(a)
        };
        b.addMarker = function(a, b, c) {
            var d = this.activeMarkers.get(a);
            d || (d = new Map(), this.activeMarkers.set(a, d));
            d.set(b, c)
        };
        b.deleteMarker = function(a, b) {
            (a = this.activeMarkers.get(a)) == null ? void 0 : a["delete"](b)
        };
        b.markerStart = function(a, b, c, e) {
            b === void 0 && (b = 0);
            c === void 0 && (c = this.currentTimestamp());
            e = e === void 0 ? {} : e;
            var f = e.cancelExisting;
            f = f === void 0 ? !1 : f;
            var g = e.cancelOnUnload;
            g = g === void 0 ? !1 : g;
            var h = e.trackedForLoss;
            h = h === void 0 ? !1 : h;
            var i = e.type;
            i = i === void 0 ? 1 : i;
            var j = e.samplingBasis;
            j = j === void 0 ? null : j;
            var k = e.qplInternalDoNotUseAbsoluteTimeOrigin;
            e = e.timeoutMS;
            e = e === void 0 ? null : e;
            var l = this.getMarker(a, b);
            if (l) {
                l = Math.round(c - l.timestamp);
                f && (this.markerAnnotate(a, {
                    string: {
                        cancel_type: "DUPLICATE_EVENT"
                    },
                    "int": {
                        time_between_markers_ms: l
                    }
                }, {
                    instanceKey: b
                }), this.markerEnd(a, 4, b, c))
            }
            f = this.$11(a, j);
            l = f[0];
            j = f[1];
            f = f[2];
            var m = {
                event: a,
                passesSampling: l,
                timestamp: c,
                sampleRate: j,
                samplingMethod: f,
                points: [],
                cancelOnUnload: g,
                trackedForLoss: h,
                type: i
            };
            typeof k === "number" && (m.absoluteTimeOrigin = k);
            this.$4.forEach(function(d) {
                d.onMarkerStart && d.onMarkerStart(a, b, c)
            });
            this.$5.forEach(function(d) {
                d.onMarkerStartWithMarker(a, b, c, m)
            });
            l && (this.addMarker(d("QPLEvent").getMarkerId(a), b, m), e != null && this.$12(a, b, e));
            l && h === !0 && this.$13({
                marker_id: 27787271,
                action_id: 0,
                sample_rate: 1,
                annotations_int: {
                    tracked_marker_id: d("QPLEvent").getMarkerId(a)
                },
                marker_type: 1
            });
            l && this.$4.forEach(function(d) {
                d.onMarkerStarted && d.onMarkerStarted(a, b, c)
            })
        };
        b.$14 = function(a, b) {
            var c = this.$9.get(a);
            c == null ? void 0 : c["delete"](b);
            (c == null ? void 0 : c.size) === 0 && this.$9["delete"](a)
        };
        b.$15 = function(a, b, c) {
            this.$9.has(a) || this.$9.set(a, new Map());
            a = this.$9.get(a);
            a == null ? void 0 : a.set(b, c)
        };
        b.$16 = function(a, b) {
            var c, d;
            c = (c = this.$9.get(a)) == null ? void 0 : c.get(b);
            if (!c) return;
            if (!((d = this.$1.runtimeAbstractionLayer) == null ? void 0 : d.clearTimeout)) return;
            this.$1.runtimeAbstractionLayer.clearTimeout(c);
            this.$14(a, b)
        };
        b.$12 = function(a, b, c) {
            var e, f = this,
                g = d("QPLEvent").getMarkerId(a);
            this.$16(g, b);
            if (!((e = this.$1.runtimeAbstractionLayer) == null ? void 0 : e.setTimeout)) return;
            e = (e = this.$1.runtimeAbstractionLayer) == null ? void 0 : e.setTimeout(function() {
                f.$4.forEach(function(c) {
                    c.onTimeoutEvent != null && c.onTimeoutEvent({
                        event: a,
                        instanceKey: b
                    })
                }), f.$14(g, b), f.markerEnd(a, 113, b)
            }, c);
            this.$15(g, b, e)
        };
        b.markerAnnotate = function(a, b, c) {
            c = c === void 0 ? {} : c;
            c = c.instanceKey;
            var d = c === void 0 ? 0 : c;
            this.$4.forEach(function(c) {
                Object.keys(b).forEach(function(e) {
                    var f = b[e];
                    if (!f) return;
                    Object.keys(f).forEach(function(b) {
                        c.onAnnotation && c.onAnnotation(a, d, b, f[b])
                    })
                })
            });
            c = this.getMarker(a, d);
            if (!c) return;
            c.annotations = i(b, c.annotations)
        };
        b.markerPoint = function(a, b, c) {
            c = c === void 0 ? {} : c;
            var d = c.instanceKey,
                e = d === void 0 ? 0 : d,
                f = c.data;
            d = c.timestamp;
            var g = d === void 0 ? this.currentTimestamp() : d;
            this.$4.forEach(function(c) {
                c.onMarkerPoint && c.onMarkerPoint(a, e, b, f, g)
            });
            c = this.getMarker(a, e);
            if (!c) return;
            d = {
                name: b,
                timeSinceStart: Math.trunc(g - c.timestamp)
            };
            var h = i(f);
            h && (d.data = h);
            c.points.push(d)
        };
        b.markerEnd = function(a, b, c, e) {
            c === void 0 && (c = 0);
            e === void 0 && (e = this.currentTimestamp());
            var f = this.getMarker(a, c);
            if (!f) {
                this.$4.forEach(function(d) {
                    var f = {
                        durationMs: 0
                    };
                    d.onMarkerEnd && d.onMarkerEnd(b, a, c, e, f)
                });
                return
            }
            var g = {
                marker_id: d("QPLEvent").getMarkerId(a),
                action_id: b,
                instance_id: c,
                sample_rate: f.sampleRate,
                method: l.get(f.samplingMethod),
                duration_ns: d("QPLTimestamp").calculateDurationAsNanoseconds(f.timestamp, e),
                points: f.points,
                metadata: {
                    application_analytics: {
                        time_since_qpl_module_init: e - this.$1.moduleLoadTimestamp
                    }
                },
                marker_type: f.type,
                flags: 1,
                unique_marker_id_debug_only: f.uniqueMarkerDebugId
            };
            g = k(g, f.annotations);
            var h = j(g, f);
            this.$4.forEach(function(d) {
                var g = {
                    durationMs: f ? e - f.timestamp : 0,
                    logData: h
                };
                d.onMarkerEnd && d.onMarkerEnd(b, a, c, e, g)
            });
            f.passesSampling && (f.timestampIsApproximate !== !0 && this.$13(h), this.$6 === d("QPLEvent").getMarkerId(a) && this.$1.onDebuggingIdEnded && this.$1.onDebuggingIdEnded(), this.$16(d("QPLEvent").getMarkerId(a), c));
            this.deleteMarker(d("QPLEvent").getMarkerId(a), c)
        };
        b.markerDrop = function(a, b) {
            b === void 0 && (b = 0);
            this.deleteMarker(d("QPLEvent").getMarkerId(a), b);
            var c = this.currentTimestamp();
            this.$4.forEach(function(d) {
                d.onMarkerDrop && d.onMarkerDrop(a, b, c)
            })
        };
        b.markEvent = function(a, b, c, e) {
            e = e === void 0 ? {} : e;
            var f = e.timestamp,
                g = f === void 0 ? this.currentTimestamp() : f,
                h = e.annotations;
            this.$4.forEach(function(b) {
                b.onMarkEvent && b.onMarkEvent({
                    event: a,
                    timestamp: g,
                    annotations: h
                })
            });
            if ((f = this.$1.quickLogConfigHelper) == null ? void 0 : f.isKillswitchOn()) return;
            e = this.$11(a);
            f = e[0];
            var j = e[1];
            e = e[2];
            if (!f) return;
            f = i(typeof h === "function" ? h() : h);
            j = {
                marker_id: d("QPLEvent").getMarkerId(a),
                action_id: 0,
                instance_id: 0,
                sample_rate: j,
                method: l.get(e),
                da_type: b,
                da_level: c,
                metadata: {
                    application_analytics: {
                        time_since_qpl_module_init: g - this.$1.moduleLoadTimestamp
                    }
                },
                marker_type: 1,
                flags: 1
            };
            this.$13(k(j, f))
        };
        b.dropAllMarkers = function() {
            this.activeMarkers.clear()
        };
        b.setAlwaysOnSampleRate = function(a, b) {
            this.$8.set(a, b)
        };
        b.setDefaultSampleRate = function(a) {
            this.$3 = a
        };
        b.currentTimestamp = function() {
            return this.$1.performanceNow()
        };
        b.enableDebug = function(a) {
            this.$6 = a
        };
        b.disableDebug = function() {
            this.$6 = null
        };
        b.addListener = function(a) {
            var b = this,
                c = this.$2++;
            this.$4.set(c, a);
            return {
                dispose: function() {
                    b.$4["delete"](c)
                }
            }
        };
        b.$11 = function(a, b) {
            if (this.$1.unsampleAllEvents && this.$1.unsampleAllEvents() || this.$6 === d("QPLEvent").getMarkerId(a)) return [!0, 1, d("QuickPerformanceLoggerTypes").EVENT_BASED_SAMPLING];
            var c = d("QPLEvent").getSampleRate(a),
                e = d("QPLEvent").getSamplingMethod(a);
            if (this.$8.get(a) == null && c !== 0 && e === d("QuickPerformanceLoggerTypes").USER_BASED_SAMPLING) {
                var f;
                return [!0, (f = c) != null ? f : 1, d("QuickPerformanceLoggerTypes").USER_BASED_SAMPLING]
            }
            f = (a = (f = this.$8.get(a)) != null ? f : c) != null ? a : this.$3;
            a = (c = e) != null ? c : d("QuickPerformanceLoggerTypes").EVENT_BASED_SAMPLING;
            e = m(f, b);
            return [e, f, a]
        };
        b.$13 = function(a) {
            this.$4.forEach(function(b) {
                b.onUploadEvent && b.onUploadEvent(a)
            });
            var b = this.$1.decorateEventBeforeUpload ? this.$1.decorateEventBeforeUpload(a) : a;
            this.$1.sendEvent(a, b)
        };
        b.getActiveMarkerIds = function(a) {
            var b = a.type,
                c = new Set();
            this.activeMarkers.forEach(function(a, d) {
                a.forEach(function(a) {
                    if (a.type === b) {
                        c.add(d);
                        return
                    }
                })
            });
            return Array.from(c)
        };
        b.forEachMarkerInstance = function(a, b) {
            a = this.$10(a);
            if (!a) return;
            for (var a = a.entries(), c = Array.isArray(a), d = 0, a = c ? a : a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var e;
                if (c) {
                    if (d >= a.length) break;
                    e = a[d++]
                } else {
                    d = a.next();
                    if (d.done) break;
                    e = d.value
                }
                e = e;
                var f = e[0];
                e = e[1];
                b(f, e.event)
            }
        };
        b.getMarkerStartTs = function(a, b) {
            b = b === void 0 ? {} : b;
            b = b.instanceKey;
            b = b === void 0 ? 0 : b;
            a = this.getMarker(a, b);
            if (!a) return;
            return a.timestamp
        };
        b.markerLogDebugPoints = function(a, b) {
            b = b === void 0 ? {} : b;
            b = b.instanceKey;
            b = b === void 0 ? 0 : b;
            var e = d("QPLEvent").getMarkerId(a);
            e = this.getMarker(a, b);
            if (!e) return;
            a = c("uuidv4")();
            e.uniqueMarkerDebugId = a
        };
        return a
    }();
    a.normalizeAnnotations = i;
    g["default"] = a
}), 98);
__d("DateConsts", [], (function(a, b, c, d, e, f) {
    var g = 1e3;
    c = 60;
    d = 60;
    e = 24;
    var h = 7,
        i = 12,
        j = 1e3,
        k = 30.43,
        l = 4.333,
        m = 365.242,
        n = c * d,
        o = n * e,
        p = o * h,
        q = o * m,
        r = g * c,
        s = r * d,
        t = g * o,
        u = t * h,
        v = t * m,
        w = {
            SUNDAY: 0,
            MONDAY: 1,
            TUESDAY: 2,
            WEDNESDAY: 3,
            THURSDAY: 4,
            FRIDAY: 5,
            SATURDAY: 6
        };
    Object.freeze(w);

    function a(a, b) {
        return new Date(a, b, 0).getDate()
    }

    function b() {
        return Date.now() / g
    }
    var x = {
        instantRange: {
            since: -864e10,
            until: 864e10 + 1
        }
    };
    f.MS_PER_SEC = g;
    f.SEC_PER_MIN = c;
    f.MIN_PER_HOUR = d;
    f.HOUR_PER_DAY = e;
    f.DAYS_PER_WEEK = h;
    f.MONTHS_PER_YEAR = i;
    f.US_PER_MS = j;
    f.AVG_DAYS_PER_MONTH = k;
    f.AVG_WEEKS_PER_MONTH = l;
    f.AVG_DAYS_PER_YEAR = m;
    f.SEC_PER_HOUR = n;
    f.SEC_PER_DAY = o;
    f.SEC_PER_WEEK = p;
    f.SEC_PER_YEAR = q;
    f.MS_PER_MIN = r;
    f.MS_PER_HOUR = s;
    f.MS_PER_DAY = t;
    f.MS_PER_WEEK = u;
    f.MS_PER_YEAR = v;
    f.DAYS = w;
    f.getDaysInMonth = a;
    f.getCurrentTimeInSeconds = b;
    f["private"] = x
}), 66);
__d("CookieStore", ["CookieCoreLoggingConfig", "FBLogger", "Random", "gkx", "performanceNow"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = window.I_AM_CORE_COOKIE_INFRASTRUCTURE_AND_NEED_TO_ACCESS_COOKIES != null ? window.I_AM_CORE_COOKIE_INFRASTRUCTURE_AND_NEED_TO_ACCESS_COOKIES() : null,
        i = {
            set: function(a) {
                document.cookie = a
            },
            get: function() {
                return document.cookie
            }
        };

    function j() {
        return h != null ? h : i
    }

    function k(a, b, c, d, e, f, g, h) {
        return b + "=" + encodeURIComponent(c) + "; " + (f !== 0 && f !== void 0 && f !== null ? "expires=" + new Date(a + f).toUTCString() + "; " : "") + "path=" + d + "; domain=" + e + (g ? "; secure" : "") + (h ? "; SameSite=" + h : "")
    }

    function l(a, b, c) {
        return a + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=" + b + "; domain=" + c
    }

    function m() {
        if (c("CookieCoreLoggingConfig").sampleRate > 0) {
            var a = c("performanceNow")(),
                b = j().get();
            a = c("performanceNow")() - a;
            var d = a > c("CookieCoreLoggingConfig").maximumIgnorableStallMs && c("Random").coinflip(1 / c("CookieCoreLoggingConfig").sampleRate);
            d && c("FBLogger")("cookie_infra").addMetadata("COOKIE_INFRA", "WALL_TIME", String(a)).warn("Cookie read exceeded %s milliseconds.", c("CookieCoreLoggingConfig").maximumIgnorableStallMs);
            return b
        } else return j().get()
    }
    var n = function() {
            function a() {
                this.$1 = 0
            }
            var b = a.prototype;
            b.setCookie = function(a, b, c, d, e, f, g, h) {
                j().set(k(a, b, c, d, e, f, g, h))
            };
            b.clearCookie = function(a, b, c) {
                j().set(l(a, b, c))
            };
            b.getCookie = function(a) {
                var b;
                this.$1++;
                b = (b = m()) == null ? void 0 : b.match("(?:^|;\\s*)" + a + "=(.*?)(?:;|$)");
                return b ? decodeURIComponent(b[1]) : null
            };
            return a
        }(),
        o = 10 * 1e3,
        p = function() {
            function a() {
                this.$1 = {}, this.$2 = 0, this.$3 = 0, this.$4 = 0
            }
            var b = a.prototype;
            b.setCookie = function(a, b, c, d, e, f, g, h) {
                j().set(k(a, b, c, d, e, f, g, h)), this.$1[b] = {
                    value: c,
                    updated: a
                }
            };
            b.clearCookie = function(a, b, c) {
                j().set(l(a, b, c)), this.$1[a] = {
                    value: null,
                    updated: Date.now()
                }
            };
            b.getCookie = function(a) {
                a = this.$5(a);
                a = a.cookie;
                return a
            };
            b.$5 = function(a) {
                var b = Date.now(),
                    c = this.$1[a];
                if (!c) {
                    if (this.$2 + o < b) {
                        this.$6();
                        return {
                            cookie: this.$5(a).cookie,
                            hit: !1
                        }
                    }
                    this.$3++;
                    return {
                        cookie: null,
                        hit: !0
                    }
                }
                if (c.updated + o < b) {
                    this.$6();
                    return {
                        cookie: this.$5(a).cookie,
                        hit: !1
                    }
                }
                this.$3++;
                return {
                    cookie: c.value,
                    hit: !0
                }
            };
            b.$6 = function() {
                var a;
                this.$4++;
                a = (a = (a = m()) == null ? void 0 : a.split(";")) != null ? a : [];
                this.$2 = Date.now();
                this.$1 = {};
                for (var a = a, b = Array.isArray(a), c = 0, a = b ? a : a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                    var d;
                    if (b) {
                        if (c >= a.length) break;
                        d = a[c++]
                    } else {
                        c = a.next();
                        if (c.done) break;
                        d = c.value
                    }
                    d = d;
                    d = d.match("\\s*([^=]+)=(.*)");
                    if (!d) continue;
                    this.$1[d[1]] = {
                        value: decodeURIComponent(d[2]),
                        updated: this.$2
                    }
                }
            };
            return a
        }();

    function a() {
        return c("gkx")("676837") ? new p() : new n()
    }
    g.newCookieStore = a;
    g.CookieCacheForTest = p;
    g.CookieStoreSlowForTest = n
}), 98);
__d("CookieCore", ["CookieCoreConfig", "CookieDomain", "CookieStore"], (function(a, b, c, d, e, f, g) {
    var h = /_js_(.*)/,
        i;

    function j() {
        i || (i = d("CookieStore").newCookieStore());
        return i
    }

    function k() {
        return "." + c("CookieDomain").domain
    }

    function l(a) {
        return window.self !== window.top ? !1 : !0
    }

    function m(a, b) {
        if (!r(a)) return;
        n(a, b, t(a), u(a), s(a), v(a))
    }

    function a(a, b, c) {
        if (!r(a)) return;
        n(a, b, t(a), u(a), s(a), v(a), c)
    }

    function n(a, b, c, d, e, f, g) {
        var h = Date.now();
        if (c != null)
            if (c > h) c -= h;
            else if (c === 1) {
            o(a, d, g);
            return
        }
        j().setCookie(h, a, b, d, (h = g) != null ? h : k(), c, e, f)
    }

    function b(a, b) {
        if (!l(a)) return;
        m(a, b)
    }

    function e(a, b, c, d, e, f) {
        if (!l(a)) return;
        n(a, b, c, d, e, null, f)
    }

    function o(a, b, c) {
        b === void 0 && (b = "/");
        b = b || "/";
        j().clearCookie(a, b, (a = c) != null ? a : k())
    }

    function f(a) {
        return !r(a) ? null : j().getCookie(a)
    }

    function p(a) {
        return {
            insecure: a.i || !1,
            path: a.p || "/",
            ttlSeconds: a.t || 0,
            sameSite: a.s || "None"
        }
    }

    function q(a) {
        if (c("CookieCoreConfig")[a] !== void 0) return p(c("CookieCoreConfig")[a]);
        a = a.match(h);
        return a && a.length > 1 ? q(a[1]) : null
    }

    function r(a) {
        return q(a) !== null
    }

    function s(a) {
        a = q(a);
        return a == null ? !0 : !a.insecure
    }

    function t(a) {
        a = q(a);
        return a == null ? null : a.ttlSeconds * 1e3
    }

    function u(a) {
        a = q(a);
        return a == null ? "/" : a.path
    }

    function v(a) {
        a = q(a);
        return a == null || a.sameSite == null ? null : a.sameSite
    }
    g.set = m;
    g.setWithDomain_FOR_MESSENGER_LS_ONLY = a;
    g.setWithoutChecks = n;
    g.setIfFirstPartyContext = b;
    g.setWithoutChecksIfFirstPartyContext = e;
    g.clear = o;
    g.get = f
}), 98);
__d("Cookie", ["Bootloader", "CookieConsent", "CookieCore", "InitialCookieConsent"], (function(a, b, c, d, e, f, g) {
    function h(a) {
        if (!c("CookieConsent").hasConsent(1)) {
            c("Bootloader").loadModules(["ODS"], function(b) {
                b.bumpEntityKey(798, "defer_cookies", "set." + a)
            }, "Cookie");
            return !1
        }
        return !0
    }

    function i() {
        return !c("InitialCookieConsent").noCookies
    }

    function a(a, b) {
        if (!i() || !h(a)) return;
        d("CookieCore").set(a, b)
    }

    function b(a, b) {
        if (!i()) return;
        d("CookieCore").set(a, b)
    }

    function e(a, b, c, e, f, g) {
        if (!i() || !h(a)) return;
        d("CookieCore").setWithoutChecks(a, b, c, e, f, null, g)
    }
    f = {
        clear: d("CookieCore").clear,
        get: d("CookieCore").get,
        set: a,
        setIfFirstPartyContext: d("CookieCore").setIfFirstPartyContext,
        setWithoutCheckingUserConsent_DANGEROUS: b,
        setWithoutChecks: e,
        setWithoutChecksIfFirstPartyContext: d("CookieCore").setWithoutChecksIfFirstPartyContext
    };
    g["default"] = f
}), 98);
__d("USIDFlag", ["$InternalEnum"], (function(a, b, c, d, e, f) {
    a = b("$InternalEnum")({
        HTTP_HEADER_SESSION: "HH",
        LOCAL_STORAGE_FAILURE: "LSF",
        SERVER_GENERATED_SESSION: "SGS",
        SERVER_PARSE_FAILURE: "SPF",
        SESSION_STORAGE_FAILURE: "SSF",
        UNKNOWN_VERSION_FAILURE: "UVF",
        UNKOWN_DATA_FAILURE: "UDF"
    });
    c = a;
    f["default"] = c
}), 66);
__d("USIDUtils", ["Cookie", "Random", "WebStorage"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = 4294967295,
        i = 36,
        j = "usidt",
        k = "usida",
        l = 1,
        m = 6;

    function a() {
        var a = [];
        c("WebStorage").isLocalStorageQuotaExceeded() && a.push("LSF");
        c("WebStorage").isSessionStorageQuotaExceeded() && a.push("SSF");
        return a
    }

    function n(a) {
        var b = Math.floor(Date.now() / 1e3),
            c = Math.floor(d("Random").random() * h);
        a = a + Number(b & h).toString(i) + c.toString(i);
        return a
    }

    function o(a, b, c) {
        if (a == null) return {
            ver: l,
            id: n(c)
        };
        a = a.getItem(b);
        if (a == null) return {
            ver: l,
            id: n(c)
        };
        b = JSON.parse(a);
        return b.ver !== l ? {
            ver: l,
            id: n(c)
        } : b
    }

    function p(a, b, d) {
        if (a == null) return;
        c("WebStorage").setItemGuarded(a, b, JSON.stringify(d))
    }

    function q(a, b) {
        if (c("Cookie") == null) return {
            ver: l,
            id: n(b)
        };
        a = c("Cookie").get(a);
        if (a == null || a == "") return {
            ver: l,
            id: n(b)
        };
        var d;
        try {
            d = JSON.parse(a)
        } catch (b) {
            d = JSON.parse(atob(a))
        }
        return d.ver !== l ? {
            ver: l,
            id: n(b)
        } : d
    }

    function r(a, b) {
        if (c("Cookie") == null) return;
        c("Cookie").set(a, btoa(JSON.stringify(b)))
    }

    function b() {
        var a = o(c("WebStorage").getSessionStorageForRead(), j, "T");
        return a.id
    }

    function e(a) {
        p(c("WebStorage").getSessionStorage(), j, {
            ver: l,
            id: a
        })
    }

    function s() {
        var a, b = q(k, "A");
        return {
            id: b.id,
            time: (a = b.time) != null ? a : 0,
            startTime: (a = b.startTime) != null ? a : 0
        }
    }

    function f(a) {
        r(k, {
            ver: l,
            id: a.id,
            time: a.time
        });
        var b = s();
        return b.id === a.id && b.time === a.time
    }
    g.VERSION = m;
    g.getFlags = a;
    g.generateId = n;
    g.getExistingTabId = b;
    g.writeTabId = e;
    g.getExistingActivityInfo = s;
    g.writeActivityInfo = f
}), 98);
__d("USIDCore", ["DateConsts", "USIDUtils", "asyncParams"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = 30,
        i = d("DateConsts").MIN_PER_HOUR * 5,
        j = 2,
        k = "__usid";

    function l() {
        return Math.floor(Date.now() / d("DateConsts").MS_PER_SEC)
    }
    a = function() {
        function a(a, b, c, e, f, g) {
            this.$1 = a;
            this.$2 = b;
            this.$3 = c;
            this.$8 = e;
            this.$9 = f;
            this.$4 = g.activityTrigger;
            this.$5 = ((b = g.activityTimeoutInMin) != null ? b : h) * 60;
            this.$6 = ((c = g.activityMaxTimeInMin) != null ? c : i) * 60;
            this.$7 = ((e = g.activityCacheTimeoutInMin) != null ? e : j) * 60;
            this.$10 = 0;
            d("USIDUtils").writeTabId(a);
            this.triggerActivity()
        }
        var b = a.prototype;
        b.getFlags = function() {
            return this.$9
        };
        b.getRequestVersion = function() {
            return this.$8
        };
        b.getSessionVersion = function() {
            return d("USIDUtils").VERSION
        };
        b.getTabId = function() {
            return this.$1
        };
        b.getPageId = function() {
            return this.$2
        };
        b.getTransitionId = function() {
            return this.$3
        };
        b.getActivityId = function() {
            var a = this.$11();
            return a.id
        };
        b.getActivityTimeOut = function() {
            var a = d("USIDUtils").getExistingActivityInfo(),
                b = l();
            return this.$5 - (b - a.time)
        };
        b.getActivityMaxTime = function() {
            var a = d("USIDUtils").getExistingActivityInfo(),
                b = l();
            return this.$6 - (b - a.startTime)
        };
        b.getSessionID = function() {
            return this.getTabId() + ":" + this.getPageId() + ":" + this.getTransitionId() + "-" + this.getActivityId()
        };
        b.serializeForRequest = function() {
            this.$4 === "request" && this.triggerActivity();
            return this.$12()
        };
        b.$12 = function() {
            var a = this.getSessionVersion(),
                b = this.getSessionID(),
                c = this.getRequestVersion(),
                d = this.getFlags().join(",");
            return a + "-" + b + "-RV=" + c + ":F=" + d
        };
        b.contextData = function() {
            return {
                usid_override: ""
            }
        };
        b.$11 = function() {
            var a = d("USIDUtils").getExistingActivityInfo(),
                b = this.$13(a);
            b && this.$14(a);
            return a
        };
        b.$14 = function(a) {
            a = d("USIDUtils").writeActivityInfo(a);
            a && d("asyncParams").add(k, this.$12())
        };
        b.$13 = function(a) {
            var b = l();
            if (b - a.time > this.$5) {
                a.id = d("USIDUtils").generateId("A");
                a.time = b;
                a.startTime = b;
                return !0
            }
            return !1
        };
        b.triggerActivity = function() {
            var a = l();
            if (a - this.$10 > this.$7) {
                var b = this.$11();
                b.time = a;
                this.$14(b);
                this.$10 = a
            }
        };
        b.nextTransition = function() {
            this.triggerActivity(), this.$3++
        };
        return a
    }();
    g["default"] = a
}), 98);
__d("USID", ["USIDCore", "USIDMetadata", "USIDUtils"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = null,
        i = function(a) {
            if (h != null) return h;
            var b = d("USIDUtils").getExistingTabId(),
                e = c("USIDMetadata").page_id,
                f = c("USIDMetadata").transition_id,
                g = c("USIDMetadata").version,
                i = d("USIDUtils").getFlags();
            h = new(c("USIDCore"))(b, e, f, g, i, a);
            return h
        };
    a = function() {
        return i({
            activityTrigger: "request"
        })
    };
    b = {
        init: i,
        get: a
    };
    g["default"] = b
}), 98);
__d("performanceNavigationStart", ["performance"], (function(a, b, c, d, e, f) {
    var g, h = typeof window !== "undefined" ? window : self;
    if ((g || (g = b("performance"))).now)
        if ((g || (g = b("performance"))).timing && (g || (g = b("performance"))).timing.navigationStart) a = function() {
            return (g || (g = b("performance"))).timing.navigationStart
        };
        else {
            if (typeof h._cstart === "number") a = function() {
                return h._cstart
            };
            else {
                var i = Date.now();
                a = function() {
                    return i
                }
            }
            a.isPolyfilled = !0
        }
    else a = function() {
        return 0
    }, a.isPolyfilled = !0;
    e.exports = a
}), null);
__d("QuickPerformanceLogger", ["Arbiter", "Bootloader", "Env", "FBLogger", "PerfFalcoEvent", "PerfXSharedFields", "Promise", "QPLCore", "QPLEvent", "Run", "USID", "WebStorage", "cr:1984081", "cr:686", "gkx", "performanceAbsoluteNow", "performanceNavigationStart", "performanceNow"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = typeof window !== "undefined" ? window : self;

    function i(a) {
        var b = c("PerfXSharedFields").getCommonData();
        b = {
            memory_stats: {
                total_mem: b.ram_gb != null ? b.ram_gb * 1073741824 : null
            },
            network_stats: {
                downlink_megabits: b.downlink_megabits,
                network_subtype: b.effective_connection_type,
                rtt_ms: b.rtt_ms
            },
            sitedata_info: {
                client_push_phase: b.client_push_phase,
                client_revision: b.client_revision,
                server_revision: b.server_revision
            },
            locale_info: {
                locale: b.locale,
                isRTL: b.isRTL
            }
        };
        c("gkx")("1224637") && (b.workplace_info = {
            is_gemini: c("gkx")("1217157")
        });
        if (c("gkx")("3752") && typeof h.__sapienzMetadataCallback__ === "function") {
            var d = h.__sapienzMetadataCallback__();
            b.sapienz = {
                request_id: String(d.requestId),
                config_name: String(d.configName)
            }
        }
        c("gkx")("4075") && (b.usid = {
            usid_override: c("USID").get().serializeForRequest()
        });
        return babelHelpers["extends"]({}, a, {
            metadata: babelHelpers["extends"]({}, a.metadata, b)
        })
    }

    function j(a, b, c) {
        return {
            i: a,
            m: c,
            r: b
        }
    }

    function k(a, d) {
        return new(b("Promise"))(function() {
            var b = d || a;
            typeof h.__je2e_recordQPLMarker === "function" && h.__je2e_recordQPLMarker(b);
            c("Env").enable_qplinspector === !0 && c("Bootloader").loadModules(["QPLInspector"], function(a) {
                a.appendLog(b)
            }, "QuickPerformanceLogger");
            c("gkx")("1554827") || c("gkx")("708253") || c("gkx")("3831") ? c("PerfFalcoEvent").logImmediately(function() {
                return b
            }) : c("gkx")("2772") ? c("PerfFalcoEvent").logCritical(function() {
                return b
            }) : c("PerfFalcoEvent").log(function() {
                return b
            })
        })
    }

    function l(a) {
        a = babelHelpers["extends"]({}, a, {
            config_type: c("gkx")("8126") ? "alpha_beta" : "prod"
        });
        return i(a)
    }

    function m() {
        return c("Env").enable_qplinspector === !0 || typeof h.__je2e_recordQPLMarker === "function" || c("gkx")("1738486")
    }

    function n() {
        c("Arbiter").inform("qpl_debugger_finished")
    }
    var o = c("performanceAbsoluteNow")();
    typeof h.__je2e_felabsTracePlugin_setQplInit === "function" && h.__je2e_felabsTracePlugin_setQplInit(c("performanceNow")());
    var p = {
            debug: function(a, b, c) {},
            warn: function(a) {
                c("FBLogger")("qpl").blameToPreviousDirectory().warn(a)
            }
        },
        q = "qpl";
    a = function(a) {
        babelHelpers.inheritsLoose(e, a);

        function e() {
            var b;
            b = a.call(this, {
                decorateEventBeforeUpload: l,
                unsampleAllEvents: m,
                onDebuggingIdEnded: n,
                performanceNow: c("performanceAbsoluteNow"),
                moduleLoadTimestamp: o,
                logger: p,
                sendEvent: k,
                runtimeAbstractionLayer: {
                    setTimeout: h.setTimeout,
                    clearTimeout: h.clearTimeout
                },
                debugLoggingEnabled: c("Env").qpl_debug_logging
            }) || this;
            var e = c("gkx")("2772") ? c("gkx")("1393") ? function(a) {
                return d("Run").onBeforeUnload(a, !1)
            } : d("Run").onBeforeUnload : d("Run").onUnload;
            e(function() {
                b.$QuickPerformanceLogger1(), b.$QuickPerformanceLogger2(706, {
                    respectUnloadPolicy: !0,
                    timestamp: b.currentTimestamp()
                })
            });
            b.$QuickPerformanceLogger3();
            b.initQplFlipperPlugin();
            b.initQplSapienzPlugin();
            return b
        }
        var f = e.prototype;
        f.$QuickPerformanceLogger3 = function() {
            var a = this,
                b = c("WebStorage").getSessionStorageForRead();
            if (!b) {
                this.$QuickPerformanceLogger4("_loadSavedState", "sessionStorage is not available");
                return
            }
            var d = b.getItem(q);
            if (d == null) return;
            b.removeItem(q);
            b = JSON.parse(d);
            if (b == null) {
                this.$QuickPerformanceLogger4("_loadSavedState", "Saved state failed to deserialize");
                return
            }
            if (b.markers == null || b.markers.length === 0) {
                this.$QuickPerformanceLogger4("_loadSavedState", "No saved markers found");
                return
            }
            b.markers.forEach(function(b) {
                var c = b[0],
                    d = b[1];
                b = b[2];
                a.addMarker(c, d, b);
                a.$QuickPerformanceLogger4("_loadSavedState", "Marker " + c + " (instanceKey: " + d + ") resumed")
            })
        };
        f.$QuickPerformanceLogger1 = function() {
            var a = this,
                b = [];
            this.activeMarkers.forEach(function(a, c) {
                a.forEach(function(a, d) {
                    a.resumeAfterNavigation === !0 && (delete a.resumeAfterNavigation, b.push([c, d, a]))
                })
            });
            if (b.length > 0) {
                var d = {
                        markers: b
                    },
                    e = c("WebStorage").getSessionStorage();
                e = c("WebStorage").setItemGuarded(e, q, JSON.stringify(d));
                e && (b.forEach(function(b) {
                    var c = b[0],
                        d = b[1];
                    b = b[2];
                    c = j(c, b.sampleRate, b.samplingMethod);
                    a.markerEnd(c, 96, d)
                }), this.$QuickPerformanceLogger4("_storeSavedState", "Failed to store saved state: " + e.message), c("FBLogger")("qpl").catching(e).warn("Failed to store QPL state: " + JSON.stringify(d, null, 2)));
                b.forEach(function(b) {
                    var c = b[0];
                    b = b[1];
                    a.deleteMarker(c, b)
                })
            }
        };
        f.markerStoreBeforeNavigation = function(a, b) {
            b = b === void 0 ? {} : b;
            b = b.instanceKey;
            b = b === void 0 ? 0 : b;
            var c = d("QPLEvent").getMarkerId(a);
            a = this.getMarker(a, b);
            if (!a) {
                this.$QuickPerformanceLogger4("markerStoreBeforeNavigation", "Failed to set marker to store on page unload. Could not find marker " + c + ", instancekey=" + b);
                return
            }
            a.resumeAfterNavigation = !0;
            this.$QuickPerformanceLogger4("markerStoreBeforeNavigation", "Set marker " + c + " to store on page unload, instancekey=" + b)
        };
        f.markerStartFromNavStart = function(a, b, d) {
            b === void 0 && (b = 0);
            d = d === void 0 ? {} : d;
            var e = d.cancelExisting;
            e = e === void 0 ? !1 : e;
            var f = d.cancelOnUnload;
            f = f === void 0 ? !1 : f;
            var g = d.trackedForLoss;
            g = g === void 0 ? !1 : g;
            var h = d.type;
            h = h === void 0 ? 1 : h;
            d = d.qplInternalDoNotUseConvertToTimeOnServer;
            var i = c("performanceNavigationStart")();
            d = typeof d === "function" ? d(i) : void 0;
            this.markerStart(a, b, i, {
                cancelExisting: e,
                cancelOnUnload: f,
                trackedForLoss: g,
                type: h,
                qplInternalDoNotUseAbsoluteTimeOrigin: d
            });
            if (c("performanceNavigationStart").isPolyfilled) {
                i = this.getMarker(a, b);
                i && (i.timestampIsApproximate = !0)
            }
        };
        f.$QuickPerformanceLogger2 = function(a, b) {
            var c = this;
            b = b === void 0 ? {} : b;
            var d = b.timestamp,
                e = b.respectUnloadPolicy;
            this.activeMarkers.forEach(function(b, f) {
                b.forEach(function(b, g) {
                    if (!e || b.cancelOnUnload === !0) {
                        b = j(f, b.sampleRate, b.samplingMethod);
                        c.markerEnd(b, a, g, d)
                    }
                })
            })
        };
        f.$QuickPerformanceLogger4 = function(a, b, c) {
            p.debug(a, b, c)
        };
        f.initQplFlipperPlugin = function() {
            b("cr:686") != null && this.addListener(b("cr:686").qplFlipperPlugin.listener())
        };
        f.initQplSapienzPlugin = function() {
            b("cr:1984081") != null && this.addListener(b("cr:1984081").getQplSapienzListener())
        };
        return e
    }(c("QPLCore"));
    e = new a();
    f.exports = e
}), 34);
__d("QPLE2E", ["QuickPerformanceLogger"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = function() {
        function a() {}
        var b = a.prototype;
        b.logPoint = function(a, b, d, e) {
            var f, g;
            e === void 0 && (e = {});
            f = (f = e.timestamp) != null ? f : c("QuickPerformanceLogger").currentTimestamp();
            var h = babelHelpers["extends"]({}, e.pointData);
            g = (g = e.action) != null ? g : 12524;
            e.secondaryOrder != void 0 && (h.string || (h.string = {}), h.string.qpl_e2e__secondary_order = e.secondaryOrder);
            if (e.sessionMarker && e.sessionMarker !== "none") {
                var i;
                h.bool || (h.bool = {});
                h.bool = babelHelpers["extends"]({}, h.bool, (i = {}, i.qpl_e2e__session_marker_start_point = e.sessionMarker === "start", i.qpl_e2e__session_marker_end_point = e.sessionMarker === "end", i))
            }
            c("QuickPerformanceLogger").markerStart(a, void 0, f, {
                samplingBasis: d
            });
            c("QuickPerformanceLogger").markerPoint(a, b, {
                data: h,
                timestamp: f * 2
            });
            e.annotations && c("QuickPerformanceLogger").markerAnnotate(a, e.annotations);
            c("QuickPerformanceLogger").markerAnnotate(a, {
                string: (i = {}, i.join_id = d, i.qpl_join__source = "client", i),
                bool: (b = {}, b.qpl_e2e__align_points = !0, b)
            });
            c("QuickPerformanceLogger").markerEnd(a, g, void 0, f)
        };
        return a
    }();
    b = new a();
    g["default"] = b
}), 98);
__d("qpl", ["QPLHasteSupportDataStorage", "recoverableViolation"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = {};
    a = {
        _: function(a, b) {
            var d = h[b];
            if (d == null) {
                var e = c("QPLHasteSupportDataStorage").get(b);
                e == null ? (c("recoverableViolation")("Failed to find a Haste-supplied config for the QPL event " + ("identified by token `" + b + "`."), "staticresources"), d = {
                    i: a
                }) : d = babelHelpers["extends"]({
                    i: a
                }, e);
                h[b] = d
            }
            return d
        }
    };
    b = a;
    g["default"] = b
}), 98);
__d("PlatformOAuthDialogLoginFunnelLogger", ["FBLogger", "QPLE2E", "URI", "qpl"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = 1;
    a = function(a, b, d, e, f, g) {
        e === void 0 && (e = !0);
        if (null == d || "" === d || e && (null == b || "" === b || 0 === b)) {
            c("FBLogger")("platform_login_web_funnel_client_js").mustfix("\nerror: null_required_field\naction: " + a + "\nloggerId: " + String(d) + "\ncbt: " + String(b) + "\n        ");
            return
        }
        e = "number" !== typeof b ? parseInt(b, 10) : b;
        b = Date.now() - (isNaN(e) ? 0 : e);
        var l = i(),
            m = j();
        l = {
            string: {
                logger_id: d
            },
            "int": {
                first_paint_time: l,
                response_start_time: m,
                cbt_delta: b
            }
        };
        m = {
            "int": {
                client_funnel_version: h,
                cbt: e
            },
            string: {},
            bool: {
                duo_like_passwordless_user: g
            }
        };
        m.string.gdp_type = f;
        if (a === "client_logged_out_init_impression") {
            b = k();
            m.string.login_uri = b
        }
        c("QPLE2E").logPoint(c("qpl")._(195562276, "891"), a, d, {
            pointData: l,
            annotations: m
        })
    };
    var i = function() {
            if (l()) {
                var a = window.performance.getEntriesByType("paint").filter(function(a) {
                    return "first-paint" === a.name
                });
                if (null == a || 0 < !a.length) return null;
                a = a[0].startTime + a[0].duration;
                return a
            }
            return null
        },
        j = function() {
            if (l()) {
                var a = window.performance.getEntriesByType("navigation");
                return null == a || 0 < !a.length ? null : a[0].responseStart
            }
            return null
        },
        k = function() {
            return c("URI").getRequestURI().setQueryString("").toString()
        },
        l = function() {
            return window.performance && typeof window.performance.getEntriesByType === "function"
        };
    g.CLIENT_FUNNEL_VERSION = h;
    g.log = a
}), 98);
__d("StrSet", [], (function(a, b, c, d, e, f) {
    a = function() {
        function a(a) {
            this.$2 = {}, this.$1 = 0, a && this.addAll(a)
        }
        var b = a.prototype;
        b.add = function(a) {
            Object.prototype.hasOwnProperty.call(this.$2, a) || (this.$2[a] = !0, this.$1++);
            return this
        };
        b.addAll = function(a) {
            a.forEach(this.add, this);
            return this
        };
        b.remove = function(a) {
            Object.prototype.hasOwnProperty.call(this.$2, a) && (delete this.$2[a], this.$1--);
            return this
        };
        b.removeAll = function(a) {
            a.forEach(this.remove, this);
            return this
        };
        b.toArray = function() {
            return Object.keys(this.$2)
        };
        b.toMap = function(a) {
            var b = {};
            Object.keys(this.$2).forEach(function(c) {
                b[c] = typeof a === "function" ? a(c) : a || !0
            });
            return b
        };
        b.contains = function(a) {
            return Object.prototype.hasOwnProperty.call(this.$2, a)
        };
        b.count = function() {
            return this.$1
        };
        b.clear = function() {
            this.$2 = {};
            this.$1 = 0;
            return this
        };
        b.clone = function() {
            return new a(this)
        };
        b.forEach = function(a, b) {
            Object.keys(this.$2).forEach(a, b)
        };
        b.map = function(a, b) {
            return Object.keys(this.$2).map(a, b)
        };
        b.some = function(a, b) {
            return Object.keys(this.$2).some(a, b)
        };
        b.every = function(a, b) {
            return Object.keys(this.$2).every(a, b)
        };
        b.filter = function(b, c) {
            return new a(Object.keys(this.$2).filter(b, c))
        };
        b.union = function(a) {
            return this.clone().addAll(a)
        };
        b.intersect = function(a) {
            return this.filter(function(b) {
                return a.contains(b)
            })
        };
        b.difference = function(a) {
            var b = this;
            return a.filter(function(a) {
                return !b.contains(a)
            })
        };
        b.equals = function(a) {
            var b = function(a, b) {
                    return a === b ? 0 : a < b ? -1 : 1
                },
                c = this.toArray();
            a = a.toArray();
            if (c.length !== a.length) return !1;
            var d = c.length;
            c = c.sort(b);
            a = a.sort(b);
            while (d--)
                if (c[d] !== a[d]) return !1;
            return !0
        };
        return a
    }();
    f["default"] = a
}), 66);
__d("getObjectValues", [], (function(a, b, c, d, e, f) {
    function a(a) {
        var b = [];
        for (var c in a) b.push(a[c]);
        return b
    }
    f["default"] = a
}), 66);
__d("PlatformVersioning", ["invariant", "PlatformVersions", "StrSet", "getObjectValues"], (function(a, b, c, d, e, f, g) {
    var h = new(b("StrSet"))(b("getObjectValues")(b("PlatformVersions").versions)),
        i = location.pathname;
    i = i.substring(1, i.indexOf("/", 1));
    var j = h.contains(i) ? i : b("PlatformVersions").versions.UNVERSIONED;

    function k(a, c) {
        if (c == b("PlatformVersions").versions.UNVERSIONED) return a;
        h.contains(c) || g(0, 3769);
        a = a.indexOf("/") !== 0 ? "/" + a : a;
        return "/" + c + a
    }

    function a() {
        return b("PlatformVersions").LATEST
    }

    function c(a) {
        return a.setPath(k(a.getPath(), j))
    }

    function d(a) {
        return k(a, j)
    }

    function e(a) {
        return h.contains(a.substring(1, a.indexOf("/", 1))) ? a.substring(a.indexOf("/", 1)) : a
    }
    i = {
        addVersionToPath: k,
        getLatestVersion: a,
        versionAwareURI: c,
        versionAwarePath: d,
        getUnversionedPath: e
    };
    a = i;
    f["default"] = a
}), 66);
__d("PlatformWidgetEndpoint", ["PlatformVersioning"], (function(a, b, c, d, e, f) {
    function a(a, c) {
        return b("PlatformVersioning").versionAwarePath("/dialog/" + a + (c ? "/" + c : ""))
    }

    function c(a, c) {
        return b("PlatformVersioning").versionAwarePath("/plugins/" + a + (c ? "/" + c : ""))
    }

    function d(a) {
        return /^\/plugins\//.test(b("PlatformVersioning").getUnversionedPath(a))
    }

    function f(a) {
        return /^\/dialog\//.test(b("PlatformVersioning").getUnversionedPath(a))
    }
    a = {
        dialog: a,
        plugins: c,
        isPluginEndpoint: d,
        isDialogEndpoint: f
    };
    e.exports = a
}), null);
__d("ArbiterFrame", [], (function(a, b, c, d, e, f) {
    a = {
        inform: function(a, b, c) {
            var d = parent.frames,
                e = d.length,
                f;
            b.crossFrame = !0;
            for (var g = 0; g < e; g++) {
                f = d[g];
                try {
                    if (!f || f == window) continue;
                    f.require ? f.require("Arbiter").inform(a, b, c) : f.ServerJSAsyncLoader && f.ServerJSAsyncLoader.wakeUp(a, b, c)
                } catch (a) {}
            }
        }
    };
    e.exports = a
}), null);
__d("Plugin", ["Arbiter", "ArbiterFrame"], (function(a, b, c, d, e, f) {
    var g = {
        CONNECT: "platform/plugins/connect",
        DISCONNECT: "platform/plugins/disconnect",
        ERROR: "platform/plugins/error",
        RELOAD: "platform/plugins/reload",
        DIALOG: "platform/plugins/dialog",
        connect: function(a, c) {
            a = {
                identifier: a,
                href: a,
                story_fbid: c
            };
            b("Arbiter").inform(g.CONNECT, a);
            b("ArbiterFrame").inform(g.CONNECT, a)
        },
        disconnect: function(a, c) {
            a = {
                identifier: a,
                href: a,
                story_fbid: c
            };
            b("Arbiter").inform(g.DISCONNECT, a);
            b("ArbiterFrame").inform(g.DISCONNECT, a)
        },
        error: function(a, c) {
            b("Arbiter").inform(g.ERROR, {
                action: a,
                content: c
            })
        },
        reload: function(a) {
            b("Arbiter").inform(g.RELOAD, {
                reloadUrl: a || ""
            }), b("ArbiterFrame").inform(g.RELOAD, {
                reloadUrl: a || ""
            })
        },
        reloadOtherPlugins: function(a, c) {
            b("ArbiterFrame").inform(g.RELOAD, {
                reloadUrl: "",
                reload: a || "",
                identifier: c || ""
            })
        }
    };
    e.exports = g
}), null);
__d("dedupString", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        var b;
        return Object.keys((b = {}, b[a] = 0, b))[0]
    }
    f["default"] = a
}), 66);
__d("passiveEventListenerUtil", [], (function(a, b, c, d, e, f) {
    "use strict";
    b = !1;
    try {
        c = Object.defineProperty({}, "passive", {
            get: function() {
                b = !0
            }
        });
        window.addEventListener("test", null, c)
    } catch (a) {}
    var g = b;

    function a(a) {
        return g ? a : typeof a === "boolean" ? a : a.capture || !1
    }
    f.isPassiveEventListenerSupported = g;
    f.makeEventOptions = a
}), 66);
__d("wrapFunction", [], (function(a, b, c, d, e, f) {
    var g = {};

    function a(a, b, c) {
        var d = b in g ? g[b](a, c) : a;
        return function() {
            for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++) b[c] = arguments[c];
            return d.apply(this, b)
        }
    }
    a.setWrapper = function(a, b) {
        g[b] = a
    };
    f["default"] = a
}), 66);
__d("DOMEventListener", ["invariant", "dedupString", "emptyFunction", "passiveEventListenerUtil", "wrapFunction"], (function(a, b, c, d, e, f, g) {
    var h = b("passiveEventListenerUtil").isPassiveEventListenerSupported,
        i, j;
    window.addEventListener ? (i = function(a, c, d, e) {
        e === void 0 && (e = !1), d.wrapper = b("wrapFunction")(d, "entry", b("dedupString")("DOMEventListener.add " + c)), a.addEventListener(c, d.wrapper, h ? e : !1)
    }, j = function(a, b, c, d) {
        d === void 0 && (d = !1), a.removeEventListener(b, c.wrapper, h ? d : !1)
    }) : window.attachEvent ? (i = function(a, c, d, e) {
        e === void 0, d.wrapper = b("wrapFunction")(d, "entry", "DOMEventListener.add " + c), a.attachEvent || g(0, 2798), a.attachEvent("on" + c, d.wrapper)
    }, j = function(a, b, c, d) {
        d === void 0, a.detachEvent || g(0, 2799), a.detachEvent("on" + b, c.wrapper)
    }) : j = i = b("emptyFunction");
    a = {
        add: function(a, b, c, d) {
            d === void 0 && (d = !1);
            i(a, b, c, d);
            return {
                remove: function() {
                    j(a, b, c, d)
                }
            }
        },
        remove: j
    };
    e.exports = a
}), null);
__d("Log", [], (function(a, b, c, d, e, f) {
    "use strict";
    var g = -1;
    b = {
        DEBUG: 3,
        INFO: 2,
        WARNING: 1,
        ERROR: 0
    };
    c = function(a, b, c) {
        for (var d = arguments.length, e = new Array(d > 3 ? d - 3 : 0), f = 3; f < d; f++) e[f - 3] = arguments[f];
        var h = 0,
            i = c.replace(/%s/g, function() {
                return String(e[h++])
            }),
            j = window.console;
        j && g >= b && j[a in j ? a : "log"](i)
    };

    function a(a) {
        g = a
    }
    d = c.bind(null, "debug", b.DEBUG);
    e = c.bind(null, "info", b.INFO);
    var h = c.bind(null, "warn", b.WARNING),
        i = c.bind(null, "error", b.ERROR);
    f.Level = b;
    f.log = c;
    f.setLevel = a;
    f.debug = d;
    f.info = e;
    f.warn = h;
    f.error = i
}), 66);
__d("VersionRange", ["invariant"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = /\./,
        j = /\|\|/,
        k = /\s+\-\s+/,
        l = /^(<=|<|=|>=|~>|~|>|)?\s*(.+)/,
        m = /^(\d*)(.*)/;

    function n(a, b) {
        a = a.split(j);
        if (a.length > 1) return a.some(function(a) {
            return E.contains(a, b)
        });
        else return o(a[0].trim(), b)
    }

    function o(a, b) {
        a = a.split(k);
        a.length > 0 && a.length <= 2 || h(0, 11800);
        if (a.length === 1) return p(a[0], b);
        else {
            var c = a[0];
            a = a[1];
            y(c) && y(a) || h(0, 11801);
            return p(">=" + c, b) && p("<=" + a, b)
        }
    }

    function p(a, b) {
        a = a.trim();
        if (a === "") return !0;
        b = b.split(i);
        a = w(a);
        var c = a.modifier;
        a = a.rangeComponents;
        switch (c) {
            case "<":
                return q(b, a);
            case "<=":
                return r(b, a);
            case ">=":
                return t(b, a);
            case ">":
                return u(b, a);
            case "~":
            case "~>":
                return v(b, a);
            default:
                return s(b, a)
        }
    }

    function q(a, b) {
        return D(a, b) === -1
    }

    function r(a, b) {
        a = D(a, b);
        return a === -1 || a === 0
    }

    function s(a, b) {
        return D(a, b) === 0
    }

    function t(a, b) {
        a = D(a, b);
        return a === 1 || a === 0
    }

    function u(a, b) {
        return D(a, b) === 1
    }

    function v(a, b) {
        var c = b.slice();
        b = b.slice();
        b.length > 1 && b.pop();
        var d = b.length - 1,
            e = parseInt(b[d], 10);
        x(e) && (b[d] = e + 1 + "");
        return t(a, c) && q(a, b)
    }

    function w(a) {
        a = a.split(i);
        var b = a[0].match(l);
        b || h(0, 3074);
        return {
            modifier: b[1],
            rangeComponents: [b[2]].concat(a.slice(1))
        }
    }

    function x(a) {
        return !isNaN(a) && isFinite(a)
    }

    function y(a) {
        return !w(a).modifier
    }

    function z(a, b) {
        for (var c = a.length; c < b; c++) a[c] = "0"
    }

    function A(a, b) {
        a = a.slice();
        b = b.slice();
        z(a, b.length);
        for (var c = 0; c < b.length; c++) {
            var d = b[c].match(/^[x*]$/i);
            if (d) {
                b[c] = a[c] = "0";
                if (d[0] === "*" && c === b.length - 1)
                    for (d = c; d < a.length; d++) a[d] = "0"
            }
        }
        z(b, a.length);
        return [a, b]
    }

    function B(a, b) {
        var c = a.match(m),
            d = b.match(m);
        c = c && c[1];
        d = d && d[1];
        c = parseInt(c, 10);
        d = parseInt(d, 10);
        if (x(c) && x(d) && c !== d) return C(c, d);
        else return C(a, b)
    }

    function C(a, b) {
        typeof a === typeof b || h(0, 11802);
        if (typeof a === "string" && typeof b === "string")
            if (a > b) return 1;
            else if (a < b) return -1;
        else return 0;
        if (typeof a === "number" && typeof b === "number")
            if (a > b) return 1;
            else if (a < b) return -1;
        else return 0;
        typeof a === typeof b || h(0, 11802);
        return 0
    }

    function D(a, b) {
        a = A(a, b);
        b = a[0];
        a = a[1];
        for (var c = 0; c < a.length; c++) {
            var d = B(b[c], a[c]);
            if (d) return d
        }
        return 0
    }
    var E = {
        contains: function(a, b) {
            return n(a.trim(), b.trim())
        }
    };
    a = E;
    g["default"] = a
}), 98);
__d("UserAgent", ["UserAgentData", "VersionRange", "memoizeStringOnly"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function h(a, b, d, e) {
        if (a === d) return !0;
        if (!d.startsWith(a)) return !1;
        d = d.slice(a.length);
        if (b != null) {
            d = e ? e(d) : d;
            return c("VersionRange").contains(d, b)
        }
        return !1
    }

    function i(a) {
        return c("UserAgentData").platformName === "Windows" ? a.replace(/^\s*NT/, "") : a
    }
    a = {
        isBrowser: c("memoizeStringOnly")(function(a) {
            return h(c("UserAgentData").browserName, c("UserAgentData").browserFullVersion, a)
        }),
        isBrowserArchitecture: c("memoizeStringOnly")(function(a) {
            return h(c("UserAgentData").browserArchitecture, null, a)
        }),
        isDevice: c("memoizeStringOnly")(function(a) {
            return h(c("UserAgentData").deviceName, null, a)
        }),
        isEngine: c("memoizeStringOnly")(function(a) {
            return h(c("UserAgentData").engineName, c("UserAgentData").engineVersion, a)
        }),
        isPlatform: c("memoizeStringOnly")(function(a) {
            return h(c("UserAgentData").platformName, c("UserAgentData").platformFullVersion, a, i)
        }),
        isPlatformArchitecture: c("memoizeStringOnly")(function(a) {
            return h(c("UserAgentData").platformArchitecture, null, a)
        })
    };
    b = a;
    g["default"] = b
}), 98);
__d("PluginDOMEventListener", ["DOMEventListener", "Log", "UserAgent", "promiseDone"], (function(a, b, c, d, e, f, g) {
    var h = !c("UserAgent").isBrowser("Safari < 12") && typeof document.hasStorageAccess === "function",
        i = !h,
        j = !1;
    !i && h && c("promiseDone")(document.hasStorageAccess(), function(a) {
        d("Log").debug("hasStorageAccess=%s", a), i = a
    }, function(a) {
        return d("Log").warn("Storage access check failed: %s", a)
    });

    function a(a, b, e, f) {
        f === void 0 && (f = !1);
        if (!h || i || j) return d("DOMEventListener").add.apply(this, arguments);
        else {
            var g = function() {
                var a = this;
                for (var b = arguments.length, f = new Array(b), g = 0; g < b; g++) f[g] = arguments[g];
                if (i || j) return e.apply(this, f);
                else {
                    var h = document.requestStorageAccess().then(function(b) {
                        d("Log").debug("Storage access request granted.");
                        i = !0;
                        return e.apply(a, f)
                    }, function(b) {
                        d("Log").warn("Storage access request denied.");
                        j = !0;
                        return e.apply(a, f)
                    });
                    c("promiseDone")(h)
                }
            };
            return d("DOMEventListener").add.call(null, a, b, g, f)
        }
    }
    g.add = a;
    g.remove = d("DOMEventListener").remove
}), 98);
__d("Banzai", ["cr:1642797"], (function(a, b, c, d, e, f, g) {
    g["default"] = b("cr:1642797")
}), 98);
__d("JstlMigrationFalcoEvent", ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1814852");
    b = d("FalcoLoggerInternal").create("jstl_migration", a);
    e = b;
    g["default"] = e
}), 98);
__d("getDataWithLoggerOptions", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a, b) {
        return babelHelpers["extends"]({}, a, {
            __options: babelHelpers["extends"]({
                event_time: Date.now() / 1e3
            }, b)
        })
    }
    f["default"] = a
}), 66);
__d("GeneratedLoggerUtils", ["invariant", "Banzai", "JstlMigrationFalcoEvent", "getDataWithLoggerOptions"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = window.location.search.indexOf("showlog") > -1;

    function a(a, c, d, e) {
        var f = b("getDataWithLoggerOptions")(c, e);
        c = a.split(":")[0];
        var g = a.split(":")[1];
        c == "logger" ? b("JstlMigrationFalcoEvent").log(function() {
            return {
                logger_config_name: g,
                payload: f
            }
        }) : b("Banzai").post(a, f, d);
        h
    }
    c = {
        log: a,
        serializeVector: function(a) {
            if (!a) return a;
            if (Array.isArray(a)) return a;
            if (a.toArray) {
                var b = a;
                return b.toArray()
            }
            if (typeof a === "object" && a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]) return Array.from(a);
            g(0, 3874, a)
        },
        serializeMap: function(a) {
            if (!a) return a;
            if (a.toJS) {
                var b = a;
                return b.toJS()
            }
            if (typeof a === "object" && a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]) {
                b = a;
                var c = {};
                for (var b = b, d = Array.isArray(b), e = 0, b = d ? b : b[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                    var f;
                    if (d) {
                        if (e >= b.length) break;
                        f = b[e++]
                    } else {
                        e = b.next();
                        if (e.done) break;
                        f = e.value
                    }
                    f = f;
                    c[f[0]] = f[1]
                }
                return c
            }
            if (Object.prototype.toString.call(a) === "[object Object]") return a;
            g(0, 3875, a)
        },
        checkExtraDataFieldNames: function(a, b) {
            Object.keys(a).forEach(function(a) {
                Object.prototype.hasOwnProperty.call(b, a) && g(0, 3876, a)
            })
        },
        warnForInvalidFieldNames: function(a, b, c, d) {},
        throwIfNull: function(a, b) {
            a || g(0, 3877, b);
            return a
        }
    };
    e.exports = c
}), null);
__d("PluginLoginButtonEventsTypedLogger", ["Banzai", "GeneratedLoggerUtils"], (function(a, b, c, d, e, f) {
    "use strict";
    a = function() {
        function a() {
            this.$1 = {}
        }
        var c = a.prototype;
        c.log = function(a) {
            b("GeneratedLoggerUtils").log("logger:PluginLoginButtonEventsLoggerConfig", this.$1, b("Banzai").BASIC, a)
        };
        c.logVital = function(a) {
            b("GeneratedLoggerUtils").log("logger:PluginLoginButtonEventsLoggerConfig", this.$1, b("Banzai").VITAL, a)
        };
        c.logImmediately = function(a) {
            b("GeneratedLoggerUtils").log("logger:PluginLoginButtonEventsLoggerConfig", this.$1, {
                signal: !0
            }, a)
        };
        c.clear = function() {
            this.$1 = {};
            return this
        };
        c.getData = function() {
            return babelHelpers["extends"]({}, this.$1)
        };
        c.updateData = function(a) {
            this.$1 = babelHelpers["extends"]({}, this.$1, a);
            return this
        };
        c.setAppID = function(a) {
            this.$1.app_id = a;
            return this
        };
        c.setAutoLogoutLink = function(a) {
            this.$1.auto_logout_link = a;
            return this
        };
        c.setButtonType = function(a) {
            this.$1.button_type = a;
            return this
        };
        c.setEvent = function(a) {
            this.$1.event = a;
            return this
        };
        c.setIsContinueAsToggled = function(a) {
            this.$1.is_continue_as_toggled = a;
            return this
        };
        c.setIsLegacy = function(a) {
            this.$1.is_legacy = a;
            return this
        };
        c.setIsTosed = function(a) {
            this.$1.is_tosed = a;
            return this
        };
        c.setLayout = function(a) {
            this.$1.layout = a;
            return this
        };
        c.setLoggerID = function(a) {
            this.$1.logger_id = a;
            return this
        };
        c.setShowFaces = function(a) {
            this.$1.show_faces = a;
            return this
        };
        c.setSize = function(a) {
            this.$1.size = a;
            return this
        };
        c.setUseContinueAs = function(a) {
            this.$1.use_continue_as = a;
            return this
        };
        c.setWidth = function(a) {
            this.$1.width = a;
            return this
        };
        return a
    }();
    c = {
        app_id: !0,
        auto_logout_link: !0,
        button_type: !0,
        event: !0,
        is_continue_as_toggled: !0,
        is_legacy: !0,
        is_tosed: !0,
        layout: !0,
        logger_id: !0,
        show_faces: !0,
        size: !0,
        use_continue_as: !0,
        width: !0
    };
    f["default"] = a
}), 66);
__d("PlatformDialog", ["cx", "CSS", "DOMEvent", "DOMEventListener"], (function(a, b, c, d, e, f, g) {
    var h;
    a = function() {
        "use strict";
        a.getInstance = function() {
            return h
        };

        function a(a, c, d) {
            var e = this;
            h = this;
            this.$1 = a;
            this.$2 = c;
            this.$3 = !1;
            b("DOMEventListener").add(this.$1, "submit", function(c) {
                if (e.$3) {
                    new(b("DOMEvent"))(c).kill();
                    return
                }
                e.$3 = !0;
                d && b("CSS").addClass(a, "_32qa")
            })
        }
        var c = a.prototype;
        c.getForm = function() {
            return this.$1
        };
        c.getDisplay = function() {
            return this.$2
        };
        c.hasBeenSubmitted = function() {
            return this.$3
        };
        return a
    }();
    a.RESPONSE = "platform/dialog/response";
    e.exports = a
}), null);
__d("PluginReturn", ["invariant", "Arbiter", "Log", "PlatformDialog", "PlatformWidgetEndpoint", "Plugin", "URI"], (function(a, b, c, d, e, f, g) {
    var h;
    b("Arbiter").subscribe(b("PlatformDialog").RESPONSE, function(a, c) {
        if (c.error_code) {
            b("Log").debug("Plugin Return Error (%s): %s", c.error_code, c.error_message || c.error_description);
            return
        }
        b("Plugin").reload(c.plugin_reload)
    });
    var i = {
        auto: function() {
            b("Arbiter").subscribe(b("Plugin").RELOAD, function(a, b) {
                a = typeof b === "object" ? b.reloadUrl : b;
                i.reload(a)
            })
        },
        syncPlugins: function() {
            b("Arbiter").subscribe(b("Plugin").RELOAD, function(a, b) {
                b.crossFrame && i.reload(b.reloadUrl, b.reload, b.identifier)
            })
        },
        reload: function(a, c, d) {
            d = (h || (h = b("URI"))).getRequestURI().removeQueryData("ret").removeQueryData("act").removeQueryData("hash").addQueryData("reload", c).addQueryData("id", d);
            if (a) {
                var c = new(h || (h = b("URI")))(a);
                b("PlatformWidgetEndpoint").isPluginEndpoint(c.getPath()) || g(0, 1120);
                d.setPath(c.getPath()).addQueryData(c.getQueryData())
            }
            window.location.replace(d.toString())
        }
    };
    e.exports = i
}), null);
__d("DataStore", ["DataStoreConfig", "gkx", "isEmpty"], (function(a, b, c, d, e, f) {
    "use strict";
    var g, h = b("DataStoreConfig").expandoKey,
        i = b("DataStoreConfig").useExpando,
        j = b("gkx")("1073500") && window.WeakMap ? new window.WeakMap() : null,
        k = {},
        l = 1;

    function m(a) {
        if (typeof a === "string") return "str_" + a;
        else {
            var b;
            return "elem_" + ((b = a.__FB_TOKEN) != null ? b : a.__FB_TOKEN = [l++])[0]
        }
    }

    function n(a) {
        if (j != null && typeof a === "object") {
            j.get(a) === void 0 && j.set(a, {});
            return j.get(a)
        } else if (i && typeof a === "object") return a[h] || (a[h] = {});
        a = m(a);
        return k[a] || (k[a] = {})
    }
    var o = {
        set: function(a, b, c) {
            if (!a) throw new TypeError("DataStore.set: namespace is required, got " + typeof a);
            var d = n(a);
            d[b] = c;
            return a
        },
        get: function(a, b, c) {
            if (!a) throw new TypeError("DataStore.get: namespace is required, got " + typeof a);
            var d = n(a),
                e = d[b];
            if (e === void 0 && a.getAttribute != null)
                if (a.hasAttribute != null && !a.hasAttribute("data-" + b)) e = void 0;
                else {
                    a = a.getAttribute("data-" + b);
                    e = a === null ? void 0 : a
                }
            c !== void 0 && e === void 0 && (e = d[b] = c);
            return e
        },
        remove: function(a, c) {
            if (!a) throw new TypeError("DataStore.remove: namespace is required, got " + typeof a);
            var d = n(a),
                e = d[c];
            delete d[c];
            (g || (g = b("isEmpty")))(d) && o.purge(a);
            return e
        },
        purge: function(a) {
            if (j != null && typeof a === "object") return j["delete"](a);
            else i && typeof a === "object" ? delete a[h] : delete k[m(a)]
        },
        _storage: k
    };
    e.exports = o
}), null);
__d("EventProfiler", ["cr:708886"], (function(a, b, c, d, e, f, g) {
    g["default"] = b("cr:708886")
}), 98);
__d("Scroll", [], (function(a, b, c, d, e, f) {
    function g(a, b) {
        return !!b && (a === b.documentElement || a === b.body)
    }

    function a(a) {
        var b;
        if (a == null) return 0;
        var c = a.ownerDocument;
        return g(a, c) ? (c == null ? void 0 : (b = c.body) == null ? void 0 : b.scrollTop) || (c == null ? void 0 : (b = c.documentElement) == null ? void 0 : b.scrollTop) || 0 : a.scrollTop || 0
    }

    function b(a, b) {
        if (a == null) return;
        var c = a.ownerDocument;
        g(a, c) ? ((c == null ? void 0 : c.body) && (c.body.scrollTop = b || 0), (c == null ? void 0 : c.documentElement) && (c.documentElement.scrollTop = b || 0)) : a.scrollTop = b || 0
    }

    function c(a) {
        var b, c = a.ownerDocument;
        return g(a, c) ? (c == null ? void 0 : (b = c.body) == null ? void 0 : b.scrollLeft) || (c == null ? void 0 : (b = c.documentElement) == null ? void 0 : b.scrollLeft) || 0 : a.scrollLeft || 0
    }

    function d(a, b) {
        var c = a.ownerDocument;
        g(a, c) ? ((c == null ? void 0 : c.body) && (c.body.scrollLeft = b || 0), (c == null ? void 0 : c.documentElement) && (c.documentElement.scrollLeft = b || 0)) : a.scrollLeft = b || 0
    }
    f.getTop = a;
    f.setTop = b;
    f.getLeft = c;
    f.setLeft = d
}), 66);
__d("FlowMigrationUtilsForLegacyFiles", ["FBLogger"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = "flow_typing_for_legacy_code";

    function a(a) {
        c("FBLogger")(h).blameToPreviousFile().event(h + ".bad_call").mustfix(a);
        return new Error("[" + h + "] " + a)
    }
    g.invariantViolation = a
}), 98);
__d("getDocumentScrollElement", ["FlowMigrationUtilsForLegacyFiles"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = typeof navigator !== "undefined" && navigator.userAgent.indexOf("AppleWebKit") > -1;

    function a(a) {
        a = a || document;
        if (a.scrollingElement) return a.scrollingElement;
        a = !h && a.compatMode === "CSS1Compat" ? a.documentElement : a.body;
        a || d("FlowMigrationUtilsForLegacyFiles").invariantViolation("null result in getDocumentScrollElement");
        return a
    }
    g["default"] = a
}), 98);
__d("Event", ["$", "Arbiter", "DOMEvent", "DOMEventListener", "DOMQuery", "DataStore", "ErrorGuard", "EventProfiler", "ExecutionEnvironment", "FBLogger", "Parent", "Scroll", "TimeSlice", "UserAgent", "dedupString", "fb-error", "getDocumentScrollElement", "getObjectValues"], (function(a, b, c, d, e, f) {
    var g, h = b("fb-error").TAAL,
        i = "Event.listeners";
    Event.prototype || (Event.prototype = {});

    function j(a) {
        (a.type === "click" || a.type === "mouseover" || a.type === "keydown") && b("Arbiter").inform("Event/stop", {
            event: a
        })
    }
    var k = function() {
        "use strict";

        function a(a, b, c) {
            this.cancelBubble = !1, this.target = a, this.type = b, this.data = c
        }
        var c = a.prototype;
        c.getData = function() {
            this.data = this.data || {};
            return this.data
        };
        c.stop = function() {
            return Event.stop(this)
        };
        c.prevent = function() {
            return Event.prevent(this)
        };
        c.isDefaultPrevented = function() {
            return Event.isDefaultPrevented(this)
        };
        c.kill = function() {
            return Event.kill(this)
        };
        c.getTarget = function() {
            return new(b("DOMEvent"))(this).target || null
        };
        return a
    }();

    function l(a) {
        if (a instanceof k) return a;
        a || (!window.addEventListener && document.createEventObject ? a = window.event ? document.createEventObject(window.event) : {} : a = {});
        if (!a._inherits_from_prototype)
            for (var b in Event.prototype) try {
                a[b] = Event.prototype[b]
            } catch (a) {}
        return a
    }
    Object.assign(Event.prototype, {
        _inherits_from_prototype: !0,
        getRelatedTarget: function() {
            var a = this.relatedTarget || (this.fromElement === this.srcElement ? this.toElement : this.fromElement);
            return a && a.nodeType ? a : null
        },
        getModifiers: function() {
            var a = {
                control: !!this.ctrlKey,
                shift: !!this.shiftKey,
                alt: !!this.altKey,
                meta: !!this.metaKey
            };
            a.access = b("UserAgent").isPlatform("Mac OS X") ? a.control : a.alt;
            a.any = a.control || a.shift || a.alt || a.meta;
            return a
        },
        isRightClick: function() {
            return this.which ? this.which === 3 : this.button && this.button === 2
        },
        isMiddleClick: function() {
            return this.which ? this.which === 2 : this.button && this.button === 4
        },
        isDefaultRequested: function() {
            return this.getModifiers().any || this.isMiddleClick() || this.isRightClick()
        }
    }, k.prototype);
    c = {
        listen: function(a, c, d, e, f) {
            typeof d === "function" && (d = b("TimeSlice").guard(d, b("dedupString")("Event.js " + c + " handler")));
            !f || typeof f === "boolean" ? f = {
                passive: !1
            } : f = {
                passive: f.passive || !1
            };
            if (!b("ExecutionEnvironment").canUseDOM) return new t(a, d, null, c, e, null, f);
            typeof a === "string" && (a = b("$")(a));
            typeof e === "undefined" && (e = Event.Priority.NORMAL);
            if (typeof c === "object") {
                var g = {};
                for (var j in c) g[j] = Event.listen(a, j, c[j], e, f);
                return g
            }
            if (c.match(/^on/i)) throw new TypeError("Bad event name `" + c + "': use `click', not `onclick'.");
            if (!a) {
                j = h.blameToPreviousFrame(new Error("Cannot listen to an undefined element."));
                b("FBLogger")("event").catching(j).mustfix("Tried to listen to element of type %s", c);
                throw j
            }
            if (a.nodeName == "LABEL" && c == "click") {
                g = a.getElementsByTagName("input");
                a = g.length == 1 ? g[0] : a
            } else if (a === window && c === "scroll") {
                j = b("getDocumentScrollElement")();
                j !== document.documentElement && j !== document.body && (a = j)
            }
            g = b("DataStore").get(a, i, {});
            j = n[c];
            j && (c = j.base, j.wrap && (d = j.wrap(d)));
            p(a, g, c, f);
            j = g[c];
            e in j || (j[e] = []);
            var k = j[e].length;
            d = new t(a, d, g, c, e, k, f);
            j[e][k] = d;
            j.numHandlers++;
            f.passive || (j.numNonPassiveHandlers++, o(a, g[c], c));
            return d
        },
        stop: function(a) {
            var c = new(b("DOMEvent"))(a).stopPropagation();
            j(c.event);
            return a
        },
        prevent: function(a) {
            new(b("DOMEvent"))(a).preventDefault();
            return a
        },
        isDefaultPrevented: function(a) {
            return new(b("DOMEvent"))(a).isDefaultPrevented(a)
        },
        kill: function(a) {
            a = new(b("DOMEvent"))(a).kill();
            j(a.event);
            return !1
        },
        getKeyCode: function(a) {
            a = new(b("DOMEvent"))(a).event;
            if (!a) return !1;
            switch (a.keyCode) {
                case 63232:
                    return 38;
                case 63233:
                    return 40;
                case 63234:
                    return 37;
                case 63235:
                    return 39;
                case 63272:
                case 63273:
                case 63275:
                    return null;
                case 63276:
                    return 33;
                case 63277:
                    return 34
            }
            if (a.shiftKey) switch (a.keyCode) {
                case 33:
                case 34:
                case 37:
                case 38:
                case 39:
                case 40:
                    return null
            }
            return a.keyCode
        },
        getPriorities: function() {
            if (!m) {
                var a = b("getObjectValues")(Event.Priority);
                a.sort(function(a, b) {
                    return a - b
                });
                m = a
            }
            return m
        },
        fire: function(a, b, c) {
            c = new k(a, b, c);
            var d;
            do {
                var e = Event.__getHandler(a, b);
                e && (d = e(c));
                a = a.parentNode
            } while (a && d !== !1 && !c.cancelBubble);
            return d !== !1
        },
        __fire: function(a, b, c) {
            a = Event.__getHandler(a, b);
            if (a) return a(l(c))
        },
        __getHandler: function(a, c) {
            var d = b("DataStore").get(a, i);
            return d && d[c] ? d[c].domHandler : a["on" + c]
        },
        getPosition: function(a) {
            a = new(b("DOMEvent"))(a).event;
            var c = b("getDocumentScrollElement")(),
                d = a.clientX + b("Scroll").getLeft(c);
            a = a.clientY + b("Scroll").getTop(c);
            return {
                x: d,
                y: a
            }
        }
    };
    Object.assign(Event, c);
    var m = null;
    d = function(a) {
        return function(c) {
            if (!b("DOMQuery").contains(this, c.getRelatedTarget())) return a.call(this, c)
        }
    };
    var n;
    !window.navigator.msPointerEnabled ? n = {
        mouseenter: {
            base: "mouseover",
            wrap: d
        },
        mouseleave: {
            base: "mouseout",
            wrap: d
        }
    } : n = {
        mousedown: {
            base: "MSPointerDown"
        },
        mousemove: {
            base: "MSPointerMove"
        },
        mouseup: {
            base: "MSPointerUp"
        },
        mouseover: {
            base: "MSPointerOver"
        },
        mouseout: {
            base: "MSPointerOut"
        },
        mouseenter: {
            base: "MSPointerOver",
            wrap: d
        },
        mouseleave: {
            base: "MSPointerOut",
            wrap: d
        }
    };
    if (b("UserAgent").isBrowser("Firefox < 52")) {
        f = function(a, b) {
            b = l(b);
            var c = b.getTarget();
            while (c) Event.__fire(c, a, b), c = c.parentNode
        };
        document.documentElement.addEventListener("focus", f.bind(null, "focusin"), !0);
        document.documentElement.addEventListener("blur", f.bind(null, "focusout"), !0)
    }
    var o = function(a, c, d) {
            var e = c.numNonPassiveHandlers == 0;
            e != c.options.passive && (c.domHandlerRemover.remove(), c.options.passive = e, c.domHandlerRemover = b("DOMEventListener").add(a, d, c.domHandler, {
                passive: e
            }))
        },
        p = function(a, c, d, e) {
            if (d in c) return;
            var f = b("TimeSlice").guard(s.bind(a, d), b("dedupString")("Event listenHandler " + d));
            c[d] = {
                numHandlers: 0,
                numNonPassiveHandlers: 0,
                domHandlerRemover: b("DOMEventListener").add(a, d, f, e),
                domHandler: f,
                options: e
            };
            c = "on" + d;
            if (a[c]) {
                f = a === document.documentElement ? Event.Priority._BUBBLE : Event.Priority.TRADITIONAL;
                var g = a[c];
                a[c] = null;
                Event.listen(a, d, g, f, e)
            }
        };

    function q(a) {
        return !a.href.endsWith("#") ? !1 : a.href === document.location.href || a.href === document.location.href + "#"
    }

    function r(a, b) {
        return a.nodeName === "INPUT" && a.type === b
    }
    var s = b("EventProfiler").__wrapEventListenHandler(function(a, c) {
        c = l(c);
        if (!b("DataStore").get(this, i)) throw new Error("Bad listenHandler context.");
        var d = b("DataStore").get(this, i)[a];
        if (!d) throw new Error("No registered handlers for `" + a + "'.");
        if (a == "click" || a == "contextmenu" || a == "mousedown" && c.which == 2) {
            a = c.getTarget();
            var e = b("Parent").byTag(a, "a");
            e instanceof HTMLAnchorElement && e.href && q(e) && !r(a, "file") && !r(a, "submit") && c.prevent()
        }
        e = Event.getPriorities();
        for (a = 0; a < e.length; a++) {
            var f = e[a];
            if (f in d) {
                f = d[f];
                for (var g = 0; g < f.length; g++) {
                    if (!f[g]) continue;
                    var h = f[g].fire(this, c);
                    if (h === !1) return c.kill();
                    else c.cancelBubble && c.stop()
                }
            }
        }
        return c.returnValue
    });
    Event.Priority = {
        URGENT: -20,
        TRADITIONAL: -10,
        NORMAL: 0,
        _BUBBLE: 1e3
    };
    var t = function() {
        "use strict";

        function a(a, b, c, d, e, f, g) {
            this.$1 = a, this.$2 = b, this.$3 = c, this.$7 = d, this.$6 = e, this.$4 = f, this.$5 = g
        }
        var c = a.prototype;
        c.isRemoved = function() {
            return !this.$3
        };
        c.remove = function() {
            if (b("ExecutionEnvironment").canUseDOM) {
                if (this.isRemoved()) {
                    b("FBLogger")("Event").warn("Event handler has already been removed");
                    return
                }
                var a = this.$3[this.$7];
                a.numHandlers <= 1 ? (a.domHandlerRemover.remove(), delete this.$3[this.$7]) : (delete a[this.$6][this.$4], a.numHandlers--, this.$5.passive || (a.numNonPassiveHandlers--, o(this.$1, this.$3[this.$7], this.$7)));
                this.$3 = null
            }
        };
        c.fire = function(a, c) {
            return b("ExecutionEnvironment").canUseDOM ? (g || (g = b("ErrorGuard"))).applyWithGuard(this.$2, a, [c], {
                name: "eventhandler:" + c.type + ":" + (typeof a.name == "string" ? a.name : a.id)
            }) : !0
        };
        return a
    }();
    a.$E = Event.$E = l;
    e.exports = Event
}), null);
__d("FbtResultBase", [], (function(a, b, c, d, e, f) {
    "use strict";
    var g = function() {
        function a(a, b) {
            this.$1 = a, this.__errorListener = b, this.$3 = !1, this.$2 = null
        }
        var b = a.prototype;
        b.flattenToArray = function() {
            return a.flattenToArray(this.$1)
        };
        b.getContents = function() {
            return this.$1
        };
        b.toString = function() {
            if (Object.isFrozen(this)) return this.$4();
            if (this.$3) return "<<Reentering fbt.toString() is forbidden>>";
            this.$3 = !0;
            try {
                return this.$4()
            } finally {
                this.$3 = !1
            }
        };
        b.$4 = function() {
            if (this.$2 != null) return this.$2;
            var b = "",
                c = this.flattenToArray();
            for (var d = 0; d < c.length; ++d) {
                var e = c[d];
                if (typeof e === "string" || e instanceof a) b += e.toString();
                else {
                    var f;
                    (f = this.__errorListener) == null ? void 0 : f.onStringSerializationError == null ? void 0 : f.onStringSerializationError(e)
                }
            }
            Object.isFrozen(this) || (this.$2 = b);
            return b
        };
        b.toJSON = function() {
            return this.toString()
        };
        a.flattenToArray = function(b) {
            var c = [];
            for (var d = 0; d < b.length; ++d) {
                var e = b[d];
                Array.isArray(e) ? c.push.apply(c, a.flattenToArray(e)) : e instanceof a ? c.push.apply(c, e.flattenToArray()) : c.push(e)
            }
            return c
        };
        return a
    }();
    ["anchor", "big", "blink", "bold", "charAt", "charCodeAt", "codePointAt", "contains", "endsWith", "fixed", "fontcolor", "fontsize", "includes", "indexOf", "italics", "lastIndexOf", "link", "localeCompare", "match", "normalize", "repeat", "replace", "search", "slice", "small", "split", "startsWith", "strike", "sub", "substr", "substring", "sup", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toUpperCase", "trim", "trimLeft", "trimRight"].forEach(function(a) {
        g.prototype[a] = function() {
            var b;
            (b = this.__errorListener) == null ? void 0 : b.onStringMethodUsed == null ? void 0 : b.onStringMethodUsed(a);
            for (var c = arguments.length, d = new Array(c), e = 0; e < c; e++) d[e] = arguments[e];
            return String.prototype[a].apply(this, d)
        }
    });
    e.exports = g
}), null);
__d("TrustedTypesNoOpPolicy_DO_NOT_USE", ["TrustedTypes", "TrustedTypesUtils"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = {
        createScriptURL: d("TrustedTypesUtils").noop,
        createHTML: d("TrustedTypesUtils").noop,
        createScript: d("TrustedTypesUtils").noop
    };
    b = c("TrustedTypes").createPolicy("noop-do-not-use", a);
    e = b;
    g["default"] = e
}), 98);
__d("TrustedTypesLinkTagHTMLPolicy", ["TrustedTypes", "err"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = {
        createHTML: function(a) {
            if (a === "<link />") return a;
            throw c("err")("Violating Trusted Type policies. Only works for '<link />' strings.")
        }
    };
    b = c("TrustedTypes").createPolicy("link-tag-html", a);
    d = b;
    g["default"] = d
}), 98);
__d("getMarkupWrap", ["invariant", "ExecutionEnvironment", "TrustedTypesLinkTagHTMLPolicy"], (function(a, b, c, d, e, f, g, h) {
    var i = c("ExecutionEnvironment").canUseDOM ? document.createElement("div") : null,
        j = {};
    b = [1, '<select multiple="true">', "</select>"];
    d = [1, "<table>", "</table>"];
    e = [3, "<table><tbody><tr>", "</tr></tbody></table>"];
    var k = [1, '<svg xmlns="http://www.w3.org/2000/svg">', "</svg>"],
        l = {
            "*": [1, "?<div>", "</div>"],
            area: [1, "<map>", "</map>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            param: [1, "<object>", "</object>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            optgroup: b,
            option: b,
            caption: d,
            colgroup: d,
            tbody: d,
            tfoot: d,
            thead: d,
            td: e,
            th: e
        };
    f = ["circle", "clipPath", "defs", "ellipse", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "text", "tspan"];
    f.forEach(function(a) {
        l[a] = k, j[a] = !0
    });

    function a(a) {
        a = a;
        !i && h(0, 144);
        Object.prototype.hasOwnProperty.call(l, a) || (a = "*");
        Object.prototype.hasOwnProperty.call(j, a) || (a === "*" ? i.innerHTML = c("TrustedTypesLinkTagHTMLPolicy").createHTML("<link />") : i.innerHTML = "<" + a + "></" + a + ">", j[a] = !i.firstChild);
        return j[a] ? l[a] : null
    }
    g["default"] = a
}), 98);
__d("createNodesFromMarkup", ["invariant", "ExecutionEnvironment", "TrustedTypesNoOpPolicy_DO_NOT_USE", "getMarkupWrap"], (function(a, b, c, d, e, f, g, h) {
    var i = c("ExecutionEnvironment").canUseDOM ? document.createElement("div") : null,
        j = /^\s*<(\w+)/;

    function k(a) {
        a = a.match(j);
        return a && a[1].toLowerCase()
    }

    function a(a, b) {
        var d = i;
        !i && h(0, 5001);
        var e = k(a);
        e = e && c("getMarkupWrap")(e);
        if (e) {
            d.innerHTML = e[1] + a + e[2];
            e = e[0];
            while (e--) d = d.lastChild
        } else d.innerHTML = c("TrustedTypesNoOpPolicy_DO_NOT_USE").createHTML(a);
        e = d.getElementsByTagName("script");
        e.length && (b || h(0, 5002), Array.from(e).forEach(b));
        a = Array.from(d.childNodes);
        while (d.lastChild) d.removeChild(d.lastChild);
        return a
    }
    g["default"] = a
}), 98);
__d("evalGlobal", [], (function(a, b, c, d, e, f) {
    function a(a) {
        if (typeof a !== "string") throw new TypeError("JS sent to evalGlobal is not a string. Only strings are permitted.");
        if (!a) return;
        var b = document.createElement("script");
        try {
            b.appendChild(document.createTextNode(a))
        } catch (c) {
            b.text = a
        }
        a = document.getElementsByTagName("head")[0] || document.documentElement;
        a.appendChild(b);
        a.removeChild(b)
    }
    f["default"] = a
}), 66);
__d("HTML", ["invariant", "Bootloader", "FBLogger", "createNodesFromMarkup", "emptyFunction", "evalGlobal"], (function(a, b, c, d, e, f, g) {
    var h = /(<(\w+)[^>]*?)\/>/g,
        i = {
            abbr: !0,
            area: !0,
            br: !0,
            col: !0,
            embed: !0,
            hr: !0,
            img: !0,
            input: !0,
            link: !0,
            meta: !0,
            param: !0
        };
    a = function() {
        "use strict";

        function a(c) {
            c && typeof c.__html === "string" && (c = c.__html);
            if (!(this instanceof a)) return c instanceof a ? c : new a(c);
            if (c) {
                var d = typeof c;
                d === "string" || g(0, 277, d)
            }
            this._markup = c || "";
            this._defer = !1;
            this._nodes = null;
            this._inlineJS = b("emptyFunction");
            this._rootNode = null;
            this._hasInlineJs = !1
        }
        var c = a.prototype;
        c.toString = function() {
            return this._markup
        };
        c.getContent = function() {
            return this._markup
        };
        c.getNodes = function() {
            this._fillCache();
            return this._nodes
        };
        c.getRootNode = function() {
            this._rootNode && g(0, 278);
            var a = this.getNodes();
            if (a.length === 1) this._rootNode = a[0];
            else {
                var b = document.createDocumentFragment();
                for (var c = 0; c < a.length; c++) b.appendChild(a[c]);
                this._rootNode = b
            }
            return this._rootNode
        };
        c.getAction = function() {
            var a = this;
            this._fillCache();
            var b = function() {
                a._inlineJS()
            };
            return this._defer ? function() {
                setTimeout(b, 0)
            } : b
        };
        c._fillCache = function() {
            if (this._nodes !== null) return;
            if (!this._markup) {
                this._nodes = [];
                return
            }
            var a = this._markup.replace(h, function(a, b, c) {
                    return i[c.toLowerCase()] ? a : b + "></" + c + ">"
                }),
                c = null;
            a = b("createNodesFromMarkup")(a, function(a) {
                b("FBLogger")("staticresources").warn("HTML: encountered script node while parsing, hasSrc=%s, type=%s", Boolean(a.src), a.type == null || a.type === "" ? "<unknown>" : a.type), a.type !== "application/ld+json" && a.type !== "application/json" && (c = c || [], c.push(a.src ? b("Bootloader").requestJSResource_UNSAFE_NEEDS_REVIEW_BY_SECURITY_AND_XFN.bind(b("Bootloader"), a.src) : b("evalGlobal").bind(null, a.innerHTML)), a.parentNode.removeChild(a))
            });
            c && (this._hasInlineJs = !0, this._inlineJS = function() {
                for (var a = 0; a < c.length; a++) c[a]()
            });
            this._nodes = a
        };
        c.setDeferred = function(a) {
            this._defer = !!a;
            return this
        };
        c.hasInlineJs = function() {
            return this._hasInlineJs
        };
        a.isHTML = function(b) {
            return !!b && (b instanceof a || b.__html !== void 0)
        };
        a.replaceJSONWrapper = function(b) {
            return b && b.__html !== void 0 ? new a(b.__html) : b
        };
        return a
    }();
    e.exports = a
}), null);
__d("TrustedTypesIEFixDOMPolicy", ["TrustedTypes"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = {
        createHTML: function(a) {
            return a
        }
    };
    b = c("TrustedTypes").createPolicy("dom-ie-fix", a);
    d = b;
    g["default"] = d
}), 98);
__d("UserAgent_DEPRECATED", [], (function(a, b, c, d, e, f) {
    var g = !1,
        h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w;

    function x() {
        if (g) return;
        g = !0;
        var a = navigator.userAgent,
            b = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(a),
            c = /(Mac OS X)|(Windows)|(Linux)/.exec(a);
        s = /\b(iPhone|iP[ao]d)/.exec(a);
        t = /\b(iP[ao]d)/.exec(a);
        q = /Android/i.exec(a);
        u = /FBAN\/\w+;/i.exec(a);
        v = /FBAN\/mLite;/i.exec(a);
        w = /Mobile/i.exec(a);
        r = !!/Win64/.exec(a);
        if (b) {
            h = b[1] ? parseFloat(b[1]) : b[5] ? parseFloat(b[5]) : NaN;
            h && document && document.documentMode && (h = document.documentMode);
            var d = /(?:Trident\/(\d+.\d+))/.exec(a);
            m = d ? parseFloat(d[1]) + 4 : h;
            i = b[2] ? parseFloat(b[2]) : NaN;
            j = b[3] ? parseFloat(b[3]) : NaN;
            k = b[4] ? parseFloat(b[4]) : NaN;
            k ? (b = /(?:Chrome\/(\d+\.\d+))/.exec(a), l = b && b[1] ? parseFloat(b[1]) : NaN) : l = NaN
        } else h = i = j = l = k = NaN;
        if (c) {
            if (c[1]) {
                d = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(a);
                n = d ? parseFloat(d[1].replace("_", ".")) : !0
            } else n = !1;
            o = !!c[2];
            p = !!c[3]
        } else n = o = p = !1
    }

    function y() {
        return x() || h
    }

    function a() {
        return x() || m > h
    }

    function b() {
        return y() && r
    }

    function c() {
        return x() || i
    }

    function d() {
        return x() || j
    }

    function z() {
        return x() || k
    }

    function e() {
        return z()
    }

    function A() {
        return x() || l
    }

    function B() {
        return x() || o
    }

    function C() {
        return x() || n
    }

    function D() {
        return x() || p
    }

    function E() {
        return x() || s
    }

    function F() {
        return x() || s || t || q || w
    }

    function G() {
        return x() || v != null ? null : u
    }

    function H() {
        return x() || q
    }

    function I() {
        return x() || t
    }
    f.ie = y;
    f.ieCompatibilityMode = a;
    f.ie64 = b;
    f.firefox = c;
    f.opera = d;
    f.webkit = z;
    f.safari = e;
    f.chrome = A;
    f.windows = B;
    f.osx = C;
    f.linux = D;
    f.iphone = E;
    f.mobile = F;
    f.nativeApp = G;
    f.android = H;
    f.ipad = I
}), 66);
__d("isScalar", [], (function(a, b, c, d, e, f) {
    function a(a) {
        return /string|number|boolean/.test(typeof a)
    }
    f["default"] = a
}), 66);
__d("DOM", ["$", "DOMQuery", "Event", "FBLogger", "FbtResultBase", "HTML", "TrustedTypesIEFixDOMPolicy", "UserAgent_DEPRECATED", "createArrayFromMixed", "fb-error", "isNode", "isScalar", "isTextNode"], (function(a, b, c, d, e, f, g) {
    a = function(a, b, c) {
        a = document.createElement(a);
        b && h.setAttributes(a, b);
        c != null && h.setContent(a, c);
        return a
    };
    var h = {
        find: d("DOMQuery").find,
        findPushSafe: d("DOMQuery").findPushSafe,
        scry: d("DOMQuery").scry,
        getSelection: d("DOMQuery").getSelection,
        contains: d("DOMQuery").contains,
        getRootElement: d("DOMQuery").getRootElement,
        isNodeOfType: d("DOMQuery").isNodeOfType,
        isInputNode: d("DOMQuery").isInputNode,
        create: a,
        setAttributes: function(a, b) {
            b.type && (a.type = b.type);
            for (var d in b) {
                var e = b[d],
                    f = /^on/i.test(d);
                f && typeof e !== "function" && c("FBLogger")("dom").warn("Handlers passed to DOM.setAttributes must be functions. Handler passed for %s was %s", d, typeof e);
                if (d == "type") continue;
                else d == "style" ? typeof e === "string" ? a.style.cssText = e : Object.assign(a.style, e) : f ? c("Event").listen(a, d.substr(2), e) : d in a ? a[d] = e : a.setAttribute && a.setAttribute(d, e)
            }
        },
        prependContent: function(a, b) {
            if (!a) throw c("fb-error").TAAL.blameToPreviousFile(new Error("reference element is not a node"));
            return j(b, a, function(b) {
                a.firstChild ? a.insertBefore(b, a.firstChild) : a.appendChild(b)
            })
        },
        insertAfter: function(a, b) {
            if (!a || !a.parentNode) throw c("fb-error").TAAL.blameToPreviousFile(new Error("reference element does not have a parent"));
            var d = a.parentNode;
            return j(b, d, function(b) {
                a.nextSibling ? d.insertBefore(b, a.nextSibling) : d.appendChild(b)
            })
        },
        insertBefore: function(a, b) {
            if (!a || !a.parentNode) throw c("fb-error").TAAL.blameToPreviousFile(new Error("reference element does not have a parent"));
            var d = a.parentNode;
            return j(b, d, function(b) {
                d.insertBefore(b, a)
            })
        },
        setContent: function(a, b) {
            if (!a) throw c("fb-error").TAAL.blameToPreviousFile(new Error("reference element is not a node"));
            while (a.firstChild) i(a.firstChild);
            return h.appendContent(a, b)
        },
        appendContent: function(a, b) {
            if (!a) throw c("fb-error").TAAL.blameToPreviousFile(new Error("reference element is not a node"));
            return j(b, a, function(b) {
                a.appendChild(b)
            })
        },
        replace: function(a, b) {
            if (!a || !a.parentNode) throw c("fb-error").TAAL.blameToPreviousFile(new Error("reference element does not have a parent"));
            var d = a.parentNode;
            return j(b, d, function(b) {
                d.replaceChild(b, a)
            })
        },
        remove: function(a) {
            i(typeof a === "string" ? c("$")(a) : a)
        },
        empty: function(a) {
            a = typeof a === "string" ? c("$")(a) : a;
            while (a.firstChild) i(a.firstChild)
        }
    };

    function i(a) {
        a.parentNode && a.parentNode.removeChild(a)
    }

    function j(a, b, e) {
        a = c("HTML").replaceJSONWrapper(a);
        if (a instanceof c("HTML") && b.firstChild === null && -1 === a.toString().indexOf("<script")) {
            var f = d("UserAgent_DEPRECATED").ie();
            if (!f || f > 7 && !d("DOMQuery").isNodeOfType(b, ["table", "tbody", "thead", "tfoot", "tr", "select", "fieldset"])) {
                var g = f ? '<em style="display:none;">&nbsp;</em>' : "";
                b.innerHTML = c("TrustedTypesIEFixDOMPolicy").createHTML(g + a);
                f && b.removeChild(b.firstChild);
                return Array.from(b.childNodes)
            }
        } else if (c("isTextNode")(b)) {
            b.data = a;
            return [a]
        }
        g = document.createDocumentFragment();
        var h;
        f = [];
        b = [];
        var i = !1;
        a = c("createArrayFromMixed")(a);
        a.length === 1 && a[0] instanceof c("FbtResultBase") && (a = a[0].getContents());
        for (var j = 0; j < a.length; j++) {
            h = c("HTML").replaceJSONWrapper(a[j]);
            if (h instanceof c("HTML")) {
                b.push(h.getAction());
                var k = h.getNodes();
                !i && h.hasInlineJs() && (c("FBLogger")("staticresources").warn("DOM: adding HTML which contains inline JS"), i = !0);
                for (var l = 0; l < k.length; l++) f.push(k[l]), g.appendChild(k[l])
            } else if (c("isScalar")(h) || h instanceof c("FbtResultBase")) {
                l = document.createTextNode(h);
                f.push(l);
                g.appendChild(l)
            } else c("isNode")(h) ? (f.push(h), g.appendChild(h)) : (Array.isArray(h) && c("FBLogger")("dom").warn("Nest arrays not supported"), h !== null && c("FBLogger")("dom").warn("No way to set content %s", h))
        }
        e(g);
        b.forEach(function(a) {
            a()
        });
        return f
    }
    b = h;
    g["default"] = b
}), 98);
__d("camelize", [], (function(a, b, c, d, e, f) {
    var g = /-(.)/g;

    function a(a) {
        return a.replace(g, function(a, b) {
            return b.toUpperCase()
        })
    }
    f["default"] = a
}), 66);
__d("getOpacityStyleName", [], (function(a, b, c, d, e, f) {
    var g = !1,
        h = null;

    function a() {
        if (!g) {
            if (document.body && "opacity" in document.body.style) h = "opacity";
            else {
                var a = document.createElement("div");
                a.style.filter = "alpha(opacity=100)";
                a.style.filter && (h = "filter")
            }
            g = !0
        }
        return h
    }
    f["default"] = a
}), 66);
__d("hyphenate", [], (function(a, b, c, d, e, f) {
    var g = /([A-Z])/g;

    function a(a) {
        return a.replace(g, "-$1").toLowerCase()
    }
    f["default"] = a
}), 66);
__d("getStyleProperty", ["camelize", "hyphenate"], (function(a, b, c, d, e, f, g) {
    function h(a) {
        return a == null ? "" : String(a)
    }

    function a(a, b) {
        var d;
        if (window.getComputedStyle) {
            d = window.getComputedStyle(a, null);
            if (d) return h(d.getPropertyValue(c("hyphenate")(b)))
        }
        if (document.defaultView && document.defaultView.getComputedStyle) {
            d = document.defaultView.getComputedStyle(a, null);
            if (d) return h(d.getPropertyValue(c("hyphenate")(b)));
            if (b === "display") return "none"
        }
        return a.currentStyle ? b === "float" ? h(a.currentStyle.cssFloat || a.currentStyle.styleFloat) : h(a.currentStyle[c("camelize")(b)]) : h(a.style && a.style[c("camelize")(b)])
    }
    g["default"] = a
}), 98);
__d("StyleCore", ["invariant", "camelize", "containsNode", "err", "getOpacityStyleName", "getStyleProperty", "hyphenate"], (function(a, b, c, d, e, f, g, h) {
    function i(a, b) {
        a = o.get(a, b);
        return a === "auto" || a === "scroll"
    }
    var j = new RegExp("\\s*([^\\s:]+)\\s*:\\s*([^;('\"]*(?:(?:\\([^)]*\\)|\"[^\"]*\"|'[^']*')[^;(?:'\"]*)*)(?:;|$)", "g");

    function k(a) {
        var b = {};
        a.replace(j, function(a, c, d) {
            b[c] = d;
            return d
        });
        return b
    }

    function l(a) {
        var b = "";
        for (var c in a) a[c] && (b += c + ":" + a[c] + ";");
        return b
    }

    function m(a) {
        return a !== "" ? "alpha(opacity=" + a * 100 + ")" : ""
    }

    function n(a, b, d) {
        switch (c("hyphenate")(b)) {
            case "font-weight":
            case "line-height":
            case "opacity":
            case "z-index":
            case "animation-iteration-count":
            case "-webkit-animation-iteration-count":
                break;
            case "width":
            case "height":
                var e = parseInt(d, 10) < 0;
                e && h(0, 11849, a, b, d);
            default:
                isNaN(d) || !d || d === "0" || h(0, 11850, a, b, d, d + "px");
                break
        }
    }
    var o = {
        set: function(a, b, d) {
            n("Style.set", b, d);
            if (a == null) return;
            a = a.style;
            switch (b) {
                case "opacity":
                    c("getOpacityStyleName")() === "filter" ? a.filter = m(d) : a.opacity = d;
                    break;
                case "float":
                    a.cssFloat = a.styleFloat = d || "";
                    break;
                default:
                    try {
                        a[c("camelize")(b)] = d
                    } catch (a) {
                        throw c("err")('Style.set: "%s" argument is invalid: %s', b, d)
                    }
            }
        },
        apply: function(a, b) {
            var d;
            for (d in b) n("Style.apply", d, b[d]);
            "opacity" in b && c("getOpacityStyleName")() === "filter" && (b.filter = m(b.opacity), delete b.opacity);
            var e = k(a.style.cssText);
            for (d in b) {
                var f = b[d];
                delete b[d];
                var g = c("hyphenate")(d);
                for (var h in e)(h === g || h.indexOf(g + "-") === 0) && delete e[h];
                b[g] = f
            }
            Object.assign(e, b);
            a.style.cssText = l(e)
        },
        get: c("getStyleProperty"),
        getFloat: function(a, b) {
            return parseFloat(o.get(a, b), 10)
        },
        getOpacity: function(a) {
            if (c("getOpacityStyleName")() === "filter") {
                var b = o.get(a, "filter");
                if (b) {
                    b = /(\d+(?:\.\d+)?)/.exec(b);
                    if (b) return parseFloat(b.pop()) / 100
                }
            }
            return o.getFloat(a, "opacity") || 1
        },
        isFixed: function(a) {
            while (c("containsNode")(document.body, a)) {
                if (o.get(a, "position") === "fixed") return !0;
                a = a.parentNode
            }
            return !1
        },
        getScrollParent: function(a) {
            if (!a) return null;
            while (a && a !== document.body) {
                if (i(a, "overflow") || i(a, "overflowY") || i(a, "overflowX")) return a;
                a = a.parentNode
            }
            return window
        }
    };
    a = o;
    g["default"] = a
}), 98);
__d("Style", ["$", "StyleCore"], (function(a, b, c, d, e, f, g) {
    a = babelHelpers["extends"]({}, c("StyleCore"), {
        get: function(a, b) {
            typeof a === "string" && (a = c("$")(a));
            return c("StyleCore").get(a, b)
        },
        getFloat: function(a, b) {
            typeof a === "string" && (a = c("$")(a));
            return c("StyleCore").getFloat(a, b)
        }
    });
    b = a;
    g["default"] = b
}), 98);
__d("DOMDimensions", ["Style", "getDocumentScrollElement"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a) {
        var b = a ? a.offsetHeight : 0;
        a = a ? a.offsetWidth : 0;
        return {
            height: b,
            width: a
        }
    }

    function b(a) {
        a = c("getDocumentScrollElement")(a);
        var b = a.scrollWidth || 0;
        a = a.scrollHeight || 0;
        return {
            width: b,
            height: a
        }
    }

    function d(a, b, d, e, f) {
        var g;
        switch (b) {
            case "left":
            case "right":
            case "top":
            case "bottom":
                g = [b];
                break;
            case "width":
                g = ["left", "right"];
                break;
            case "height":
                g = ["top", "bottom"];
                break;
            default:
                throw Error("Invalid plane: " + b)
        }
        b = function(b, d) {
            var e = 0;
            for (var f = 0; f < g.length; f++) e += parseFloat(c("Style").get(a, b + "-" + g[f] + d)) || 0;
            return e
        };
        return (d ? b("padding", "") : 0) + (e ? b("border", "-width") : 0) + (f ? b("margin", "") : 0)
    }
    g.getElementDimensions = a;
    g.getDocumentDimensions = b;
    g.measureElementBox = d
}), 98);
__d("Queue", [], (function(a, b, c, d, e, f) {
    var g = {};
    a = function() {
        function a(a) {
            this._timeout = null, this._interval = (a == null ? void 0 : a.interval) || 0, this._processor = a == null ? void 0 : a.processor, this._queue = [], this._stopped = !0
        }
        var b = a.prototype;
        b._dispatch = function(a) {
            var b = this;
            a === void 0;
            if (this._stopped || this._queue.length === 0) return;
            a = this._processor;
            if (a == null) {
                this._stopped = !0;
                throw new Error("No processor available")
            }
            var c = this._interval;
            if (c != null) a.call(this, this._queue.shift()), this._timeout = setTimeout(function() {
                return b._dispatch()
            }, c);
            else
                while (this._queue.length) a.call(this, this._queue.shift())
        };
        b.enqueue = function(a) {
            this._processor && !this._stopped ? this._processor(a) : this._queue.push(a);
            return this
        };
        b.start = function(a) {
            a && (this._processor = a);
            this._stopped = !1;
            this._dispatch();
            return this
        };
        b.isStarted = function() {
            return !this._stopped
        };
        b.dispatch = function() {
            this._dispatch(!0)
        };
        b.stop = function(a) {
            this._stopped = !0;
            a && this._timeout != null && clearTimeout(this._timeout);
            return this
        };
        b.merge = function(a, b) {
            if (b) {
                (b = this._queue).unshift.apply(b, a._queue)
            } else {
                (b = this._queue).push.apply(b, a._queue)
            }
            a._queue = [];
            this._dispatch();
            return this
        };
        b.getLength = function() {
            return this._queue.length
        };
        a.get = function(b, c) {
            var d;
            b in g ? d = g[b] : d = g[b] = new a(c);
            return d
        };
        a.exists = function(a) {
            return a in g
        };
        a.remove = function(a) {
            return delete g[a]
        };
        return a
    }();
    f["default"] = a
}), 66);
__d("isInIframe", [], (function(a, b, c, d, e, f) {
    var g = typeof window !== "undefined" && window.top != null && window != window.top;

    function a() {
        return g
    }
    f["default"] = a
}), 66);
__d("resolveWindow", [], (function(a, b, c, d, e, f) {
    function a(a) {
        if (a == null) return null;
        var b = window;
        a = a.split(".");
        try {
            for (var c = 0; c < a.length; c++) {
                var d = a[c],
                    e = /^frames\[[\'\"]?([a-zA-Z0-9\-_]+)[\'\"]?\]$/.exec(d);
                if (e) b = b.frames[e[1]];
                else if (d === "opener" || d === "parent" || d === "top") b = b[d];
                else return null
            }
        } catch (a) {
            return null
        }
        return b
    }
    f["default"] = a
}), 66);
__d("QueryString", [], (function(a, b, c, d, e, f) {
    function g(a) {
        var b = [];
        Object.keys(a).sort().forEach(function(c) {
            var d = a[c];
            if (d === void 0) return;
            if (d === null) {
                b.push(c);
                return
            }
            b.push(encodeURIComponent(c) + "=" + encodeURIComponent(String(d)))
        });
        return b.join("&")
    }

    function a(a, b) {
        b === void 0 && (b = !1);
        var c = {};
        if (a === "") return c;
        a = a.split("&");
        for (var d = 0; d < a.length; d++) {
            var e = a[d].split("=", 2),
                f = decodeURIComponent(e[0]);
            if (b && Object.prototype.hasOwnProperty.call(c, f)) throw new URIError("Duplicate key: " + f);
            c[f] = e.length === 2 ? decodeURIComponent(e[1]) : null
        }
        return c
    }

    function b(a, b) {
        return a + (a.indexOf("?") !== -1 ? "&" : "?") + (typeof b === "string" ? b : g(b))
    }
    c = {
        encode: g,
        decode: a,
        appendToUrl: b
    };
    f["default"] = c
}), 66);
__d("ObservableMixin", [], (function(a, b, c, d, e, f) {
    function a() {
        this.__observableEvents = {}
    }
    a.prototype = {
        inform: function(a) {
            var b = Array.prototype.slice.call(arguments, 1),
                c = Array.prototype.slice.call(this.getSubscribers(a));
            for (var d = 0; d < c.length; d++) {
                if (c[d] === null) continue;
                try {
                    c[d].apply(this, b)
                } catch (a) {
                    window.setTimeout(function() {
                        throw a
                    }, 0)
                }
            }
            return this
        },
        getSubscribers: function(a) {
            return this.__observableEvents[a] || (this.__observableEvents[a] = [])
        },
        clearSubscribers: function(a) {
            a && (this.__observableEvents[a] = []);
            return this
        },
        subscribe: function(a, b) {
            a = this.getSubscribers(a);
            a.push(b);
            return this
        },
        unsubscribe: function(a, b) {
            a = this.getSubscribers(a);
            for (var c = 0; c < a.length; c++)
                if (a[c] === b) {
                    a.splice(c, 1);
                    break
                }
            return this
        }
    };
    e.exports = a
}), null);
__d("ManagedError", [], (function(a, b, c, d, e, f) {
    a = function(a) {
        babelHelpers.inheritsLoose(b, a);

        function b(b, c) {
            var d;
            d = a.call(this, b !== null && b !== void 0 ? b : "") || this;
            b !== null && b !== void 0 ? d.message = b : d.message = "";
            d.innerError = c;
            return d
        }
        return b
    }(babelHelpers.wrapNativeSuper(Error));
    f["default"] = a
}), 66);
__d("AssertionError", ["ManagedError"], (function(a, b, c, d, e, f, g) {
    a = function(a) {
        babelHelpers.inheritsLoose(b, a);

        function b(b) {
            return a.call(this, b) || this
        }
        return b
    }(c("ManagedError"));
    g["default"] = a
}), 98);
__d("Assert", ["AssertionError", "sprintf"], (function(a, b, c, d, e, f, g) {
    function h(a, b) {
        if (typeof a !== "boolean" || a === !1) throw new(c("AssertionError"))(b);
        return a
    }

    function i(a, b, d) {
        var e;
        if (b === void 0) e = "undefined";
        else if (b === null) e = "null";
        else {
            var f = Object.prototype.toString.call(b);
            f = /\s(\w*)/.exec(f);
            e = f == null ? typeof f : f[1].toLowerCase()
        }
        h(a.indexOf(e) !== -1, (f = d) != null ? f : c("sprintf")("Expression is of type %s, not %s", e, a));
        return b
    }

    function a(a, b, c) {
        h(b instanceof a, (a = c) != null ? a : "Expression not instance of type");
        return b
    }

    function j(a, b) {
        k["is" + a] = b, k["maybe" + a] = function(a, c) {
            return a == null ? a : b(a, c)
        }
    }
    b = function(a, b) {
        return a
    };
    var k = {
        isInstanceOf: a,
        isTrue: h,
        isTruthy: function(a, b) {
            return h(!!a, b)
        },
        isBoolean: b,
        isFunction: b,
        isNumber: b,
        isObject: b,
        isString: b,
        isUndefined: b,
        maybeObject: b,
        maybeNumber: b,
        maybeFunction: b
    };
    ["Boolean", "Function", "Number", "Object", "String", "Undefined"].forEach(function(a) {
        j(a, i.bind(null, a.toLowerCase()))
    });
    d = k;
    g["default"] = d
}), 98);
__d("Type", ["Assert"], (function(a, b, c, d, e, f) {
    function g() {
        var a = this.__mixins;
        if (a)
            for (var b = 0; b < a.length; b++) a[b].apply(this, arguments)
    }

    function h(a, b) {
        if (b instanceof a) return !0;
        if (b instanceof g)
            for (var c = 0; c < b.__mixins.length; c++)
                if (b.__mixins[c] == a) return !0;
        return !1
    }

    function i(a, b) {
        var c = a.prototype;
        Array.isArray(b) || (b = [b]);
        for (a = 0; a < b.length; a++) {
            var d = b[a];
            typeof d === "function" && (c.__mixins.push(d), d = d.prototype);
            Object.keys(d).forEach(function(a) {
                c[a] = d[a]
            })
        }
    }

    function j(a, c, d) {
        var e = c && Object.prototype.hasOwnProperty.call(c, "constructor") ? c.constructor : function() {
            this.parent.apply(this, arguments)
        };
        b("Assert").isFunction(e);
        if (a && a.prototype instanceof g === !1) throw new Error("parent type does not inherit from Type");
        a = a || g;

        function f() {}
        f.prototype = a.prototype;
        e.prototype = new f();
        c && Object.assign(e.prototype, c);
        e.prototype.constructor = e;
        e.parent = a;
        e.prototype.__mixins = a.prototype.__mixins ? Array.prototype.slice.call(a.prototype.__mixins) : [];
        d && i(e, d);
        e.prototype.parent = function() {
            this.parent = a.prototype.parent, a.apply(this, arguments)
        };
        e.prototype.parentCall = function(b) {
            return a.prototype[b].apply(this, Array.prototype.slice.call(arguments, 1))
        };
        e.extend = function(a, b) {
            return j(this, a, b)
        };
        return e
    }
    Object.assign(g.prototype, {
        instanceOf: function(a) {
            return h(a, this)
        }
    });
    Object.assign(g, {
        extend: function(a, b) {
            return typeof a === "function" ? j.apply(null, arguments) : j(null, a, b)
        },
        instanceOf: h
    });
    e.exports = g
}), null);
__d("sdk.Model", ["ObservableMixin", "Type"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = c("Type").extend({
        constructor: function(a) {
            this.parent();
            var b = {},
                c = this;
            Object.keys(a).forEach(function(d) {
                b[d] = a[d], c["set" + d] = function(a) {
                    if (a === b[d]) return c;
                    b[d] = a;
                    c.inform(d + ".change", a);
                    return c
                }, c["get" + d] = function() {
                    return b[d]
                }
            })
        }
    }, c("ObservableMixin"));
    b = a;
    g["default"] = b
}), 98);
__d("sdk.Runtime", ["JSSDKRuntimeConfig", "sdk.Model"], (function(a, b, c, d, e, f, g) {
    var h = {
            UNKNOWN: 0,
            PAGETAB: 1,
            CANVAS: 2,
            PLATFORM: 4
        },
        i = new(c("sdk.Model"))({
            AccessToken: "",
            AutoLogAppEvents: !1,
            ClientID: "",
            CookieUserID: "",
            EnforceHttps: !1,
            Environment: h.UNKNOWN,
            FamilyLoginLoaded: !1,
            GraphDomain: "",
            Initialized: !1,
            IsSPIN: Boolean(d("JSSDKRuntimeConfig").isSPIN),
            IsVersioned: !1,
            KidDirectedSite: void 0,
            Locale: d("JSSDKRuntimeConfig").locale,
            LoggedIntoFacebook: void 0,
            LoginStatus: void 0,
            Revision: d("JSSDKRuntimeConfig").revision,
            Rtl: d("JSSDKRuntimeConfig").rtl,
            Scope: void 0,
            SDKAB: d("JSSDKRuntimeConfig").sdkab,
            SDKUrl: d("JSSDKRuntimeConfig").sdkurl,
            SDKNS: d("JSSDKRuntimeConfig").sdkns,
            ShouldLoadFamilyLogin: !1,
            UseCookie: !1,
            UseLocalStorage: !0,
            UserID: "",
            Version: void 0
        });
    Object.assign(i, {
        ENVIRONMENTS: h,
        isEnvironment: function(a) {
            var b = this.getEnvironment();
            return (a | b) === b
        },
        isCanvasEnvironment: function() {
            return this.isEnvironment(h.CANVAS) || this.isEnvironment(h.PAGETAB)
        }
    });
    (function() {
        var a = /app_runner/.test(window.name) ? h.PAGETAB : /iframe_canvas/.test(window.name) ? h.CANVAS : h.UNKNOWN;
        (a | h.PAGETAB) === a && (a |= h.CANVAS);
        i.setEnvironment(a)
    })();
    a = i;
    g["default"] = a
}), 98);
__d("UrlMap", ["invariant", "UrlMapConfig", "sdk.Runtime"], (function(a, b, c, d, e, f, g, h) {
    function a(a) {
        var b = "https";
        if (a === "graph_domain") {
            var e = c("sdk.Runtime").getGraphDomain();
            e ? a = "graph_".concat(e) : a = "graph"
        }
        if (a in d("UrlMapConfig")) return b + "://" + d("UrlMapConfig")[a];
        a in d("UrlMapConfig") || h(0, 2511, a);
        return ""
    }
    g.resolve = a
}), 98);
__d("sdk.Scribe", ["QueryString", "UrlMap", "sdk.Runtime"], (function(a, b, c, d, e, f, g) {
    var h = {};

    function a(a, b, e) {
        e === void 0 && (e = !1);
        if (a === "jssdk_error") {
            var f = JSON.stringify(b);
            if (Object.prototype.hasOwnProperty.call(h, f)) return;
            else h[f] = !0
        }
        if (b.extra != null && typeof b.extra === "object") {
            f = b.extra;
            f.revision = c("sdk.Runtime").getRevision()
        }
        f = new Image();
        var g = d("UrlMap").resolve("www") + "/platform/scribe_endpoint.php/";
        e || (f.crossOrigin = "anonymous");
        f.src = c("QueryString").appendToUrl(g, {
            c: a,
            m: JSON.stringify(babelHelpers["extends"]({}, b, {
                isSPIN: c("sdk.Runtime").getIsSPIN()
            }))
        })
    }
    g.log = a
}), 98);
__d("XD", ["Arbiter", "DOM", "DOMDimensions", "Log", "PHPQuerySerializer", "Queue", "URI", "isFacebookURI", "isInIframe", "resolveWindow", "sdk.Scribe"], (function(a, b, c, d, e, f, g) {
    var h = {
        _callbacks: [],
        _opts: {
            autoResize: !1,
            allowShrink: !0,
            channelUrl: null,
            hideOverflow: !1,
            resizeTimeout: 1e3,
            resizeWidth: !1
        },
        _lastResizeAckId: 0,
        _resizeCount: 0,
        _resizeTimestamp: 0,
        _shrinker: null,
        _forcedMinWidth: 100,
        init: function(a) {
            var b = this;
            this._opts = babelHelpers["extends"]({}, this._opts, a);
            this._opts.autoResize && this._startResizeMonitor();
            c("Arbiter").subscribe("Connect.Unsafe.resize.ack", function(a, c) {
                c.id || (c.id = b._resizeCount), c.id > b._lastResizeAckId && (b._lastResizeAckId = c.id)
            })
        },
        getQueue: function() {
            this._queue || (this._queue = new(c("Queue"))());
            return this._queue
        },
        setChannelUrl: function(a) {
            var b = this;
            this.getQueue().start(function(c) {
                return b.send(c, a)
            })
        },
        send: function(a, b) {
            a === void 0 && (a = null);
            b === void 0 && (b = null);
            b = b || this._opts.channelUrl;
            if (!b) {
                this.getQueue().enqueue(a);
                return
            }
            var e = {};
            b = new(c("URI"))(b);
            Object.assign(e, a, d("PHPQuerySerializer").deserialize(b.getFragment()));
            b = new(c("URI"))(e.origin);
            if (b.getDomain() === "") {
                d("Log").error("No valid domain for XD message target.");
                return
            }
            var f = b.getOrigin();
            if (typeof e.relation !== "string") {
                d("Log").error("No relation specified to resolve XD target window.");
                return
            }
            var g = c("resolveWindow")(e.relation.replace(/^parent\./, "")),
                h = 1;
            b = function b() {
                try {
                    g.postMessage(d("PHPQuerySerializer").serialize(e), f)
                } catch (c) {
                    --h ? window.setTimeout(b, 200) : d("sdk.Scribe").log("jssdk_error", {
                        error: "POST_MESSAGE",
                        extra: {
                            message: c.message + ", html/js/modules/XD.js:139",
                            ancestor_origins: JSON.stringify(location.ancestorOrigins),
                            referrer: document.referrer,
                            data: a
                        }
                    })
                }
            };
            b()
        },
        _computeSize: function() {
            var a = d("DOMDimensions").getDocumentDimensions(),
                b = 0;
            if (this._opts.resizeWidth) {
                var e = document.body;
                if (e != null) {
                    if (e.clientWidth < e.scrollWidth) b = a.width;
                    else {
                        e = e.lastElementChild;
                        if (e != null && e instanceof HTMLElement) {
                            e = e;
                            e = e.offsetLeft + e.offsetWidth;
                            e > b && (b = e)
                        }
                    }
                    b = Math.max(b, h._forcedMinWidth)
                } else b = h._forcedMinWidth
            }
            a.width = b;
            this._opts.allowShrink && (this._shrinker || (this._shrinker = c("DOM").create("div")), c("DOM").appendContent(document.body, this._shrinker), a.height = Math.max(this._shrinker.offsetTop, 0));
            return a
        },
        _startResizeMonitor: function() {
            var a, b = this,
                d;
            a = (a = document.documentElement) != null ? a : {};
            if (this._opts.hideOverflow) {
                a.style.overflow = "hidden";
                ((a = document.body) != null ? a : {}).style.overflow = "hidden"
            }
            a = function() {
                var a = b._computeSize(),
                    e = Date.now();
                if (!d || b._opts.allowShrink && d.width != a.width || !b._opts.allowShrink && d.width < a.width || b._opts.allowShrink && d.height != a.height || !b._opts.allowShrink && d.height < a.height) {
                    d = a;
                    b._resizeCount++;
                    b._resizeTimestamp = e;
                    e = {
                        type: "resize",
                        height: a.height,
                        ackData: {
                            id: b._resizeCount
                        },
                        width: 0
                    };
                    a.width && a.width != 0 && (e.width = a.width);
                    try {
                        if (c("isFacebookURI")(new(c("URI"))(document.referrer)) && c("isInIframe")() && window.name && window.parent.location && window.parent.location.toString && c("isFacebookURI")(new(c("URI"))(window.parent.location))) {
                            a = window.parent.document.getElementsByTagName("iframe");
                            for (var f = 0; f < a.length; f++) a[f].name == window.name && (b._opts.resizeWidth && (a[f].style.width = e.width + "px"), a[f].style.height = e.height + "px")
                        }
                        b.send(e)
                    } catch (a) {
                        b.send(e)
                    }
                }
            };
            a();
            window.setInterval(a, this._opts.resizeTimeout)
        }
    };
    b = babelHelpers["extends"]({}, h);
    a.UnverifiedXD = b;
    a.XD = h;
    g.XD = h;
    g.UnverifiedXD = b
}), 98);
__d("UnverifiedXD", ["XD"], (function(a, b, c, d, e, f, g) {
    g["default"] = d("XD").UnverifiedXD
}), 98);
__d("XOAuthErrorController", ["XController"], (function(a, b, c, d, e, f) {
    e.exports = b("XController").create("/oauth/error/", {
        error_code: {
            type: "Enum",
            enumType: 1
        },
        encrypted_query_string: {
            type: "String"
        },
        display: {
            type: "Enum",
            enumType: 1
        }
    })
}), null);
__d("sdk.UA", [], (function(a, b, c, d, e, f) {
    a = navigator.userAgent;
    var g = {
            iphone: /\b(iPhone|iP[ao]d)/.test(a),
            ipad: /\b(iP[ao]d)/.test(a),
            android: /Android/i.test(a),
            nativeApp: /FBAN\/\w+;/i.test(a) && !/FBAN\/mLite;/.test(a),
            nativeAndroidApp: /FB_IAB\/\w+;/i.test(a),
            nativeInstagramApp: /Instagram/i.test(a),
            nativeMessengeriOSApp: /MessengerForiOS/i.test(a),
            nativeMessengerAndroidApp: /Orca\-Android/i.test(a),
            ucBrowser: /UCBrowser/i.test(a)
        },
        h = /Mobile/i.test(a),
        i = {
            ie: NaN,
            firefox: NaN,
            chrome: NaN,
            webkit: NaN,
            osx: NaN,
            edge: NaN,
            operaMini: NaN,
            ucWeb: NaN
        };
    b = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(a);
    if (b) {
        i.ie = b[1] ? parseFloat(b[1]) : b[4] ? parseFloat(b[4]) : NaN;
        i.firefox = b[2] || "";
        i.webkit = b[3] || "";
        if (b[3]) {
            c = /(?:Chrome\/(\d+\.\d+))/.exec(a);
            i.chrome = c ? c[1] : "";
            d = /(?:Edge\/(\d+\.\d+))/.exec(a);
            i.edge = d ? d[1] : ""
        }
    }
    e = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(a);
    e && (i.osx = e[1]);
    b = /(?:Opera Mini\/(\d+(?:\.\d+)?))/.exec(a);
    b && (i.operaMini = b[1]);
    c = /(?:UCWEB\/(\d+(?:\.\d+))?)/.exec(a);
    c && (i.ucWeb = c[1] || "2.0");

    function j(a) {
        return String(a).split(".").map(function(a) {
            return parseFloat(a)
        })
    }
    var k = {};
    Object.keys(i).map(function(a) {
        var b = function() {
            return parseFloat(i[a])
        };
        b.getVersionParts = function() {
            return j(i[a])
        };
        k[a] = b
    });
    Object.keys(g).map(function(a) {
        k[a] = function() {
            return g[a]
        }
    });
    k.mobile = function() {
        return g.iphone || g.ipad || g.android || h
    };
    k.mTouch = function() {
        return g.android || g.iphone || g.ipad
    };
    k.facebookInAppBrowser = function() {
        return g.nativeApp || g.nativeAndroidApp
    };
    k.inAppBrowser = function() {
        return g.nativeApp || g.nativeAndroidApp || g.nativeInstagramApp
    };
    k.mBasic = function() {
        return !!(i.ucWeb || i.operaMini)
    };
    k.instagram = function() {
        return g.nativeInstagramApp
    };
    k.messenger = function() {
        return g.nativeMessengeriOSApp || g.nativeMessengerAndroidApp
    };
    k.isSupportedIABVersion = function(a) {
        if (!k.facebookInAppBrowser()) return !1;
        var b = /(?:FBAV\/(\d+(\.\d+)+))/.exec(navigator.userAgent);
        if (b) {
            b = parseFloat(b[1]);
            if (b >= a) return !0
        }
        return !1
    };
    d = k;
    f["default"] = d
}), 66);
__d("buildPopupFeatureString", ["sdk.UA"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a) {
        var b = a.dims.screenX,
            d = a.dims.screenY,
            e = a.dims.outerWidth,
            f = a.dims.outerHeight,
            g = c("sdk.UA").mobile() ? null : a.size.width,
            h = c("sdk.UA").mobile() ? null : a.size.height;
        b = b < 0 ? a.dims.screenWidth + b : b;
        a = [];
        g != null && (a.push("width=" + g), a.push("left=" + (b + (e - g) / 2)));
        h != null && (a.push("height=" + h), a.push("top=" + (d + (f - h) / 2.5)));
        a.push("scrollbars=1");
        a.push("toolbar=0");
        (!c("sdk.UA").chrome() || c("sdk.UA").chrome() < 59) && a.push("location=1");
        return a.join(",")
    }
    g["default"] = a
}), 98);
__d("PluginLoginButton", ["Arbiter", "DOMEvent", "DOMQuery", "FBLogger", "PlatformOAuthDialogLoginFunnelLogger", "PlatformWidgetEndpoint", "Plugin", "PluginDOMEventListener", "PluginLoginButtonEventsTypedLogger", "PluginReturn", "URI", "UnverifiedXD", "XOAuthErrorController", "buildPopupFeatureString", "isFacebookURI", "sdk.UA"], (function(a, b, c, d, e, f, g) {
    var h = {},
        i = null,
        j = null;

    function k(a) {
        window.parent.location.replace(a)
    }

    function l(a, b, d, e, f) {
        new(c("PluginLoginButtonEventsTypedLogger"))().setEvent("logout_click").setAppID(b).setLoggerID(d).setIsLegacy(e).setLayout(f).logVital(), a.submit()
    }

    function a(a, b) {
        d("PluginDOMEventListener").add(a, "click", k.bind(null, b))
    }

    function b(a, b, c, e) {
        b = l.bind(null, d("DOMQuery").find(a, "^form"), b, c, e);
        d("PluginDOMEventListener").add(a, "click", b)
    }

    function e(a, b, e, f, g, h, i, j, k, l, n, o, p, q, r, s, t, u, v) {
        f = function(a, b) {
            if (l) {
                a = d("PlatformWidgetEndpoint").plugins("login_button");
                d("PluginReturn").reload(a + (b.crossFrame ? "" : "?ret=perms"))
            }
        };
        c("Arbiter").subscribe(d("Plugin").RELOAD, f);
        c("Arbiter").subscribe("Connect.Unsafe.loginReload", f);
        m(a, function(a) {
            new(c("DOMEvent"))(a).kill();
            a = {
                scope: e,
                response_type: "none",
                ref: h,
                auth_type: i,
                default_audience: j,
                locale: k,
                method: "permissions.oauth",
                display: "popup",
                logger_id: n,
                force_confirmation: q,
                messenger_page_id: r,
                reset_messenger_state: s,
                config_id: v
            };
            c("Arbiter").subscribe("Connect.Unsafe.loginComplete", function() {
                new(c("PluginLoginButtonEventsTypedLogger"))().setEvent("login_complete").setAppID(b).setLoggerID(n).setIsLegacy(o).setLayout(p).setUseContinueAs(t).setIsContinueAsToggled(u).logVital(), d("PlatformOAuthDialogLoginFunnelLogger").log("client_login_end", null, n, !1)
            });
            c("UnverifiedXD").send({
                type: "login_button_dialog_open",
                params: JSON.stringify(a)
            });
            new(c("PluginLoginButtonEventsTypedLogger"))().setEvent("click").setAppID(b).setLoggerID(n).setIsLegacy(o).setLayout(p).setUseContinueAs(t).setIsContinueAsToggled(u).logVital();
            d("PlatformOAuthDialogLoginFunnelLogger").log("client_login_start", null, n, !1)
        })
    }

    function f(a, b, e, f, g, k, l, n, o, p, q, r, s, t, u, v, w, x, y) {
        f = function(a, b) {
            if (p) {
                a = d("PlatformWidgetEndpoint").plugins("login_button");
                d("PluginReturn").reload(a + (b.crossFrame ? "" : "?ret=perms"))
            }
        };
        c("Arbiter").subscribe(d("Plugin").RELOAD, f);
        c("Arbiter").subscribe("Connect.Unsafe.loginReload", f);
        var z = {
            url: "dialog/oauth",
            size: {
                width: c("sdk.UA").mobile() ? null : 600,
                height: c("sdk.UA").mobile() ? null : 679
            },
            client_id: b,
            response_type: "token,signed_request",
            method: "permissions.oauth",
            display: "popup",
            sdk: "joey",
            app_id: b,
            scope: e,
            ref: k,
            auth_type: l,
            default_audience: n,
            locale: o,
            logger_id: q,
            version: g,
            force_confirmation: t,
            messenger_page_id: u,
            reset_messenger_state: v,
            config_id: y
        };
        c("Arbiter").subscribe("Connect.Unsafe.loginButtonStateInit", function(a, b) {
            j = b.call;
            if (j != null) {
                a = function() {
                    c("FBLogger")("plugin_login_button_lbsi").info(b.call.url)
                };
                var d = !1;
                try {
                    d = c("isFacebookURI")(new(c("URI"))(b.call.url)), d || a()
                } catch (b) {
                    a()
                }
                d || (j.url = c("XOAuthErrorController").getURIBuilder().setEnum("error_code", "PLATFORM__INVALID_URL").getURI().toString())
            }
        });
        c("UnverifiedXD").send({
            type: "login_button_prepare_call",
            params: JSON.stringify(z)
        });
        c("Arbiter").subscribe("Connect.Unsafe.loginComplete", function(a, e) {
            h[e.frame_name] != null && typeof h[e.frame_name].close === "function" && (h[e.frame_name].close(), delete h[e.frame_name]), e.status === "connected" ? j = null : c("UnverifiedXD").send({
                type: "login_button_prepare_call",
                params: JSON.stringify(z)
            }), new(c("PluginLoginButtonEventsTypedLogger"))().setEvent("login_complete").setAppID(b).setLoggerID(q).setIsLegacy(r).setLayout(s).setUseContinueAs(w).setIsContinueAsToggled(x).logVital(), d("PlatformOAuthDialogLoginFunnelLogger").log("client_login_end", null, q, !1)
        });
        m(a, function(a) {
            new(c("DOMEvent"))(a).kill();
            if (j == null) c("UnverifiedXD").send({
                type: "login_button_connected",
                params: "{}"
            });
            else if (h[j.id] != null && !h[j.id].closed) h[j.id].focus();
            else {
                a = Date.now();
                j.url = j.url.replace(/cbt=\d+/, "cbt=" + a);
                a = window.open(j.url, j.id, c("buildPopupFeatureString")(j));
                c("UnverifiedXD").send({
                    type: "login_button_click",
                    params: JSON.stringify({
                        popup: a != null,
                        call: j
                    })
                });
                if (a != null) {
                    h[j.id] = a;
                    var e = j.id;
                    i = window.setInterval(function() {
                        h[e] != null && h[e].closed && (c("UnverifiedXD").send({
                            type: "login_button_popup_closed",
                            params: "{}"
                        }), delete h[e], window.clearInterval(i))
                    }, 100)
                }
                new(c("PluginLoginButtonEventsTypedLogger"))().setEvent("click").setAppID(b).setLoggerID(q).setIsLegacy(r).setLayout(s).setUseContinueAs(w).setIsContinueAsToggled(x).logVital();
                d("PlatformOAuthDialogLoginFunnelLogger").log("client_login_start", null, q, !1)
            }
        })
    }

    function m(a, b) {
        d("PluginDOMEventListener").add(a, "click", b), d("PluginDOMEventListener").add(a, "keydown", function(a) {
            a = new(c("DOMEvent"))(a);
            var d = a.event.which || a.event.keyCode;
            (d === 32 || d === 13) && b(a)
        })
    }
    g.redirect = k;
    g.submit = l;
    g.registration = a;
    g.logout = b;
    g.oauth = e;
    g.oauth_new = f;
    g.action = m
}), 98);
__d("MessengerWebPluginAnonymousTypedLogger", ["Banzai", "GeneratedLoggerUtils"], (function(a, b, c, d, e, f) {
    "use strict";
    a = function() {
        function a() {
            this.$1 = {}
        }
        var c = a.prototype;
        c.log = function(a) {
            b("GeneratedLoggerUtils").log("logger:MessengerWebPluginAnonymousLoggerConfig", this.$1, b("Banzai").BASIC, a)
        };
        c.logVital = function(a) {
            b("GeneratedLoggerUtils").log("logger:MessengerWebPluginAnonymousLoggerConfig", this.$1, b("Banzai").VITAL, a)
        };
        c.logImmediately = function(a) {
            b("GeneratedLoggerUtils").log("logger:MessengerWebPluginAnonymousLoggerConfig", this.$1, {
                signal: !0
            }, a)
        };
        c.clear = function() {
            this.$1 = {};
            return this
        };
        c.getData = function() {
            return babelHelpers["extends"]({}, this.$1)
        };
        c.updateData = function(a) {
            this.$1 = babelHelpers["extends"]({}, this.$1, a);
            return this
        };
        c.setAppID = function(a) {
            this.$1.app_id = a;
            return this
        };
        c.setCallsite = function(a) {
            this.$1.callsite = a;
            return this
        };
        c.setClientFbid = function(a) {
            this.$1.client_fbid = a;
            return this
        };
        c.setDebugData = function(a) {
            this.$1.debug_data = a;
            return this
        };
        c.setDeltaType = function(a) {
            this.$1.delta_type = a;
            return this
        };
        c.setDeviceParam = function(a) {
            this.$1.device_param = a;
            return this
        };
        c.setDomainSource = function(a) {
            this.$1.domain_source = a;
            return this
        };
        c.setDuration = function(a) {
            this.$1.duration = a;
            return this
        };
        c.setEvent = function(a) {
            this.$1.event = a;
            return this
        };
        c.setEventTimestamp = function(a) {
            this.$1.event_timestamp = a;
            return this
        };
        c.setExceptionMessage = function(a) {
            this.$1.exception_message = a;
            return this
        };
        c.setExceptionStacktrace = function(a) {
            this.$1.exception_stacktrace = a;
            return this
        };
        c.setExceptionType = function(a) {
            this.$1.exception_type = a;
            return this
        };
        c.setGateway = function(a) {
            this.$1.gateway = a;
            return this
        };
        c.setIsUserLoggedIn = function(a) {
            this.$1.is_user_logged_in = a;
            return this
        };
        c.setNewEventName = function(a) {
            this.$1.new_event_name = a;
            return this
        };
        c.setOtherFields = function(a) {
            this.$1.other_fields = b("GeneratedLoggerUtils").serializeMap(a);
            return this
        };
        c.setPageID = function(a) {
            this.$1.page_id = a;
            return this
        };
        c.setPluginExtra = function(a) {
            this.$1.plugin_extra = b("GeneratedLoggerUtils").serializeMap(a);
            return this
        };
        c.setPluginInterface = function(a) {
            this.$1.plugin_interface = a;
            return this
        };
        c.setPluginName = function(a) {
            this.$1.plugin_name = a;
            return this
        };
        c.setRefererURI = function(a) {
            this.$1.referer_uri = a;
            return this
        };
        c.setRequestHeaders = function(a) {
            this.$1.request_headers = a;
            return this
        };
        c.setRequestID = function(a) {
            this.$1.request_id = a;
            return this
        };
        c.setRequestParam = function(a) {
            this.$1.request_param = a;
            return this
        };
        c.setTabName = function(a) {
            this.$1.tab_name = a;
            return this
        };
        c.setUpgradeLoggedInUserID = function(a) {
            this.$1.upgrade_logged_in_user_id = a;
            return this
        };
        c.setUpstreamEvent = function(a) {
            this.$1.upstream_event = a;
            return this
        };
        c.setWhitelistedDomains = function(a) {
            this.$1.whitelisted_domains = a;
            return this
        };
        return a
    }();
    c = {
        app_id: !0,
        callsite: !0,
        client_fbid: !0,
        debug_data: !0,
        delta_type: !0,
        device_param: !0,
        domain_source: !0,
        duration: !0,
        event: !0,
        event_timestamp: !0,
        exception_message: !0,
        exception_stacktrace: !0,
        exception_type: !0,
        gateway: !0,
        is_user_logged_in: !0,
        new_event_name: !0,
        other_fields: !0,
        page_id: !0,
        plugin_extra: !0,
        plugin_interface: !0,
        plugin_name: !0,
        referer_uri: !0,
        request_headers: !0,
        request_id: !0,
        request_param: !0,
        tab_name: !0,
        upgrade_logged_in_user_id: !0,
        upstream_event: !0,
        whitelisted_domains: !0
    };
    f["default"] = a
}), 66);
__d("PluginLoggedOutUserTypedLogger", ["Banzai", "GeneratedLoggerUtils", "nullthrows"], (function(a, b, c, d, e, f) {
    "use strict";
    a = function() {
        function a() {
            this.$1 = {}
        }
        var c = a.prototype;
        c.log = function(a) {
            b("GeneratedLoggerUtils").log("logger:PluginLoggedOutUserLoggerConfig", this.$1, b("Banzai").BASIC, a)
        };
        c.logVital = function(a) {
            b("GeneratedLoggerUtils").log("logger:PluginLoggedOutUserLoggerConfig", this.$1, b("Banzai").VITAL, a)
        };
        c.logImmediately = function(a) {
            b("GeneratedLoggerUtils").log("logger:PluginLoggedOutUserLoggerConfig", this.$1, {
                signal: !0
            }, a)
        };
        c.clear = function() {
            this.$1 = {};
            return this
        };
        c.getData = function() {
            return babelHelpers["extends"]({}, this.$1)
        };
        c.updateData = function(a) {
            this.$1 = babelHelpers["extends"]({}, this.$1, a);
            return this
        };
        c.setHref = function(a) {
            this.$1.href = a;
            return this
        };
        c.setIsSDK = function(a) {
            this.$1.is_sdk = a;
            return this
        };
        c.setPluginAppID = function(a) {
            this.$1.plugin_app_id = a;
            return this
        };
        c.setPluginName = function(a) {
            this.$1.plugin_name = a;
            return this
        };
        c.setRefererURL = function(a) {
            this.$1.referer_url = a;
            return this
        };
        c.updateExtraData = function(a) {
            a = b("nullthrows")(b("GeneratedLoggerUtils").serializeMap(a));
            b("GeneratedLoggerUtils").checkExtraDataFieldNames(a, g);
            this.$1 = babelHelpers["extends"]({}, this.$1, a);
            return this
        };
        c.addToExtraData = function(a, b) {
            var c = {};
            c[a] = b;
            return this.updateExtraData(c)
        };
        return a
    }();
    var g = {
        href: !0,
        is_sdk: !0,
        plugin_app_id: !0,
        plugin_name: !0,
        referer_url: !0
    };
    f["default"] = a
}), 66);
__d("BanzaiLogger", ["Banzai"], (function(a, b, c, d, e, f, g) {
    function h(a) {
        return {
            log: function(b, d) {
                c("Banzai").post("logger:" + b, d, a)
            },
            create: h
        }
    }
    a = h();
    b = a;
    g["default"] = b
}), 98);
__d("MNCommerceLogger", ["BanzaiLogger", "ODS"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = c("BanzaiLogger").create({
        signal: !0
    });

    function i(a) {
        switch (a) {
            case "devx_upsell_learn_more_clicked":
                return "devx.upsell.learn_more.clicked";
            default:
                return a
        }
    }

    function a(a, b, c) {
        d("ODS").bumpEntityKey(2966, "messenger_commerce", i(a)), h.log("MessengerCommerceLoggerConfig", {
            brand_app_id: b,
            user_fbid: c,
            event: a
        })
    }

    function b(a, b, c, e) {
        h.log("MessengerCommerceLoggerConfig", {
            brand_app_id: a,
            page_id: b,
            user_fbid: c,
            event: e
        }), d("ODS").bumpEntityKey(2966, "messenger_commerce", "auth." + e + ".all")
    }
    g.logClick = a;
    g.logAuthEvent = b
}), 98);
__d("PluginMessage", ["Arbiter", "CSS", "DOM", "DOMEventListener", "MNCommerceLogger", "UnverifiedXD"], (function(a, b, c, d, e, f, g) {
    var h = "platform/plugins/checkbox_connect/access_token";

    function a() {
        d("DOMEventListener").add(window, "message", function(a) {
            if (/\.facebook\.com$/.test(a.origin) && i().test(a.data)) {
                a = JSON.parse(a.data.substring(24));
                "type" in a && (a.type === "send_to_messenger" ? j(a) : a.type === "messenger_checkbox" ? k(a) : a.type === "customer_chat" && m(a))
            }
        })
    }

    function i() {
        return new RegExp("^SOCIALPLUGIN_AUTH_POPUP:")
    }

    function j(a) {
        var b = document.getElementById("send-to-messenger-connect-button"),
            e = document.getElementById("send-to-messenger-disconnect-button"),
            f = document.getElementById("send-to-messenger-identity"),
            g = document.getElementById("send-to-messenger-profile-photo"),
            h = document.getElementById("send-to-messenger-profile-name");
        b != null && e != null && f != null && g != null && h != null && (a.can_personalize === !0 && a.connected === !0 ? (d("CSS").show(b), d("CSS").hide(e), l(g, a.profile_photo), l(h, a.profile_name), d("CSS").show(f), d("MNCommerceLogger").logAuthEvent(String(a.app_id), String(a.page_id), String(a.user_id), "send_to_messenger_opt_in_client_event"), c("UnverifiedXD").send({
            type: "sdk_event",
            event: "send_to_messenger",
            data: JSON.stringify({
                event: "opt_in",
                ref: String(a.ref)
            })
        })) : (d("CSS").hide(b), d("CSS").show(e), d("CSS").hide(f)))
    }

    function k(a) {
        var b = document.getElementById("plugin-MN-commerce-identity"),
            e = document.getElementById("plugin-MN-commerce-identity-profile-picture"),
            f = document.getElementById("plugin-MN-commerce-identity-profile-name"),
            g = document.getElementById("web-plugin-checkbox-form");
        b != null && e != null && f != null && g != null && (a.can_personalize === !0 ? (l(e, a.profile_photo), l(f, a.profile_name), d("CSS").show(b), l(g, a.checkbox), a.access_token != null && c("Arbiter").inform(h, a.access_token)) : d("CSS").hide(b))
    }

    function l(a, b) {
        var d = document.createElement("div");
        c("DOM").setContent(d, b);
        b = d.firstChild;
        b != null && a.replaceWith(b)
    }

    function m(a) {
        var b = window.require("Arbiter");
        "ArbiterData" in a ? b.inform(a.ArbiterEvent, a.ArbiterData) : b.inform(a.ArbiterEvent)
    }
    g.MESSENGER_CHECKBOX_ACCESS_TOKEN_LOGIN_ARBITER = h;
    g.listen = a
}), 98);
__d("ArbiterMixin", ["Arbiter", "guid"], (function(a, b, c, d, e, f, g) {
    var h = "arbiter$" + c("guid")(),
        i = Object.prototype.hasOwnProperty;
    a = {
        _getArbiterInstance: function() {
            return i.call(this, h) ? this[h] : this[h] = new(c("Arbiter"))()
        },
        inform: function(a, b, c) {
            return this._getArbiterInstance().inform(a, b, c)
        },
        subscribe: function(a, b, c) {
            return this._getArbiterInstance().subscribe(a, b, c)
        },
        subscribeOnce: function(a, b, c) {
            return this._getArbiterInstance().subscribeOnce(a, b, c)
        },
        unsubscribe: function(a) {
            this._getArbiterInstance().unsubscribe(a)
        },
        unsubscribeCurrentSubscription: function() {
            this._getArbiterInstance().unsubscribeCurrentSubscription()
        },
        releaseCurrentPersistentEvent: function() {
            this._getArbiterInstance().releaseCurrentPersistentEvent()
        },
        registerCallback: function(a, b) {
            return this._getArbiterInstance().registerCallback(a, b)
        },
        query: function(a) {
            return this._getArbiterInstance().query(a)
        }
    };
    b = a;
    g["default"] = b
}), 98);
__d("BehaviorsMixin", [], (function(a, b, c, d, e, f) {
    var g = function() {
            function a(a) {
                this.$1 = a, this.$2 = !1
            }
            var b = a.prototype;
            b.enable = function() {
                this.$2 || (this.$2 = !0, this.$1.enable())
            };
            b.disable = function() {
                this.$2 && (this.$2 = !1, this.$1.disable())
            };
            return a
        }(),
        h = 1;

    function i(a) {
        a.__BEHAVIOR_ID || (a.__BEHAVIOR_ID = h++);
        return a.__BEHAVIOR_ID
    }
    a = {
        enableBehavior: function(a) {
            this._behaviors || (this._behaviors = {});
            var b = i(a);
            this._behaviors[b] || (this._behaviors[b] = new g(new a(this)));
            this._behaviors[b].enable();
            return this
        },
        disableBehavior: function(a) {
            if (this._behaviors) {
                a = i(a);
                this._behaviors[a] && this._behaviors[a].disable()
            }
            return this
        },
        enableBehaviors: function(a) {
            a.forEach(this.enableBehavior, this);
            return this
        },
        destroyBehaviors: function() {
            if (this._behaviors) {
                for (var a in this._behaviors) this._behaviors[a].disable();
                this._behaviors = {}
            }
        },
        hasBehavior: function(a) {
            return this._behaviors && i(a) in this._behaviors
        }
    };
    b = a;
    f["default"] = b
}), 66);
__d("React", ["cr:1108857", "cr:1294158", "gkx"], (function(a, b, c, d, e, f) {
    c = b("cr:1294158");
    var g = c.useSyncExternalStore;

    function a(a, b, c) {
        return g(b, c)
    }
    b("gkx")("4166") && (c.useMutableSource = a, c.unstable_useMutableSource = a);
    e.exports = c
}), null);
/**
 * License: https://www.facebook.com/legal/license/V9vdYColc4k/
 */
__d("react-0.0.0", ["React"], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        return a && typeof a === "object" && "default" in a ? a["default"] : a
    }
    var g = a(b("React"));
    d = {};
    var h = {
        exports: d
    };

    function i() {
        h.exports = g
    }
    var j = !1;

    function k() {
        j || (j = !0, i());
        return h.exports
    }

    function c(a) {
        switch (a) {
            case void 0:
                return k()
        }
    }
    e.exports = c
}), null);
__d("react", ["react-0.0.0"], (function(a, b, c, d, e, f) {
    e.exports = b("react-0.0.0")()
}), null);
__d("BootloadedReact", ["Bootloader", "react"], (function(a, b, c, d, e, f, g) {
    var h = d("react"),
        i = d("react").useLayoutEffect,
        j = function(a) {
            c("Bootloader").loadModules(["ReactDOM"], a, "BootloadedReact")
        };

    function a(a, b, c) {
        j(function(d) {
            if (c != null) return d.render(h.jsx(k, {
                onRender: c,
                children: a
            }), b, "BootloadedReact.js");
            else d.render(a, b, "BootloadedReact.js")
        })
    }

    function b(a) {
        j(function(b) {
            b.unmountComponentAtNode(a)
        })
    }

    function k(a) {
        var b = a.onRender;
        i(function() {
            b()
        }, [b]);
        return a.children
    }
    g.render = a;
    g.unmountComponentAtNode = b
}), 98);
__d("uniqueID", [], (function(a, b, c, d, e, f) {
    var g = "js_",
        h = 36,
        i = 0;

    function a(a, b) {
        a === void 0 && (a = g);
        b === void 0 && (b = !1);
        return b ? a : a + (i++).toString(h)
    }
    f["default"] = a
}), 66);
__d("getOrCreateDOMID", ["uniqueID"], (function(a, b, c, d, e, f, g) {
    function a(a) {
        a.id || (a.id = c("uniqueID")());
        return a.id
    }
    g["default"] = a
}), 98);
__d("ContextualThing", ["CSS", "containsNode", "ge", "getOrCreateDOMID"], (function(a, b, c, d, e, f, g) {
    function a(a, b) {
        a.setAttribute("data-ownerid", c("getOrCreateDOMID")(b))
    }

    function b(a, b) {
        b = b;
        while (b) {
            if (c("containsNode")(a, b)) return !0;
            b = h(b)
        }
        return !1
    }

    function h(a) {
        a = a;
        var b;
        while (a) {
            if (a.getAttribute && (b = a.getAttribute("data-ownerid"))) return c("ge")(b);
            a = a.parentNode
        }
        return null
    }

    function e(a, b) {
        a = a;
        var e;
        while (a && !d("CSS").hasClass(a, b)) a.getAttribute && (e = a.getAttribute("data-ownerid")) ? a = c("ge")(e) : a = a.parentNode;
        return a
    }
    g.register = a;
    g.containsIncludingLayers = b;
    g.getContext = h;
    g.parentByClass = e
}), 98);
__d("getElementText", ["isElementNode", "isTextNode"], (function(a, b, c, d, e, f, g) {
    var h = null;

    function a(a) {
        if (c("isTextNode")(a)) return a.data;
        else if (c("isElementNode")(a)) {
            if (h === null) {
                var b = document.createElement("div");
                h = b.textContent != null ? "textContent" : "innerText"
            }
            return a[h]
        } else return ""
    }
    g["default"] = a
}), 98);
__d("isContentEditable", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        a = a;
        while (a instanceof HTMLElement) {
            if (a.contentEditable === "true" || a.contentEditable === "plaintext-only") return !0;
            a = a.parentElement
        }
        return !1
    }
    f["default"] = a
}), 66);
__d("isElementInteractive", ["isContentEditable"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = new Set(["EMBED", "INPUT", "OBJECT", "SELECT", "TEXTAREA"]),
        i = new Set(["button", "checkbox", "radio", "submit"]);

    function a(a) {
        if (!a instanceof HTMLElement) return !1;
        var b = c("isContentEditable")(a),
            d = h.has(a.nodeName);
        a = a instanceof HTMLInputElement && i.has(a.type);
        return (b || d) && !a
    }
    g["default"] = a
}), 98);
__d("KeyEventController", ["Bootloader", "DOMQuery", "Event", "Run", "emptyFunction", "getElementText", "isContentEditable", "isElementInteractive", "isEmpty"], (function(a, b, c, d, e, f, g) {
    var h = null,
        i = {
            BACKSPACE: [8],
            TAB: [9],
            RETURN: [13],
            ALT: [18],
            ESCAPE: [27],
            LEFT: [37, 63234],
            UP: [38, 63232],
            RIGHT: [39, 63235],
            DOWN: [40, 63233],
            NUMPAD_ADD: [43],
            NUMPAD_SUBSTRACT: [45],
            DELETE: [46],
            COMMA: [188],
            PERIOD: [190],
            SLASH: [191],
            "`": [192],
            "[": [219],
            "]": [221],
            PAGE_UP: [33],
            PAGE_DOWN: [34],
            END: [35],
            HOME: [36],
            SPACE: [32],
            KP_DOT: [46, 110],
            "-": [189],
            "=": [187],
            FORWARD_SLASH: [191]
        },
        j = (a = {}, a[8] = 1, a[9] = 1, a[13] = 1, a[27] = 1, a[32] = 1, a[37] = 1, a[63234] = 1, a[38] = 1, a[63232] = 1, a[39] = 1, a[63235] = 1, a[40] = 1, a[63233] = 1, a[46] = 1, a);
    b = function() {
        function a() {
            var a = this;
            this.handlers = {};
            ["keyup", "keydown", "keypress"].forEach(function(b) {
                return document.addEventListener(b, a.onkeyevent.bind(a, "on" + b))
            })
        }
        var b = a.prototype;
        b.mapKey = function(a) {
            a = a;
            if (/^[0-9]$/.test(a + "")) {
                typeof a !== "number" && (a = a.charCodeAt(0) - 48);
                return [48 + a, 96 + a]
            }
            a += "";
            var b = i[a.toUpperCase()];
            return b ? b : [a.toUpperCase().charCodeAt(0)]
        };
        b.onkeyevent = function(a, b) {
            var d = b;
            d = c("Event").$E(d);
            b = this.handlers[d.keyCode] || this.handlers[d.which];
            if (b)
                for (var e = 0; e < b.length; e++) {
                    var f = b[e].callback,
                        g = b[e].filter;
                    try {
                        if (!g || g(d, a)) {
                            g = function() {
                                var b = f(d, a),
                                    e = d.which || d.keyCode;
                                c("Bootloader").loadModules(["KeyEventTypedLogger"], function(a) {
                                    new a().setAction("key_shortcut").setKey(d.key || "").setKeyChar(String.fromCharCode(e)).setKeyCode(e).addToExtraData("is_trusted", d.isTrusted).log()
                                }, "KeyEventController");
                                if (b === !1) return {
                                    v: c("Event").kill(d)
                                }
                            }();
                            if (typeof g === "object") return g.v
                        }
                    } catch (a) {}
                }
            return !0
        };
        b.resetHandlers = function() {
            for (var a in this.handlers)
                if (Object.prototype.hasOwnProperty.call(this.handlers, a)) {
                    var b = this.handlers[a].filter(function(a) {
                        return a.preserve()
                    });
                    b.length ? this.handlers[a] = b : delete this.handlers[a]
                }
        };
        a.getInstance = function() {
            return h || (h = new a())
        };
        a.defaultFilter = function(b, d) {
            b = c("Event").$E(b);
            return a.filterEventTypes(b, d) && a.filterEventTargets(b, d) && a.filterEventModifiers(b, d)
        };
        a.filterEventTypes = function(a, b) {
            return b === "onkeydown" ? !0 : !1
        };
        a.filterEventTargets = function(a, b) {
            b = a.getTarget();
            return !c("isElementInteractive")(b) || a.keyCode in j && (d("DOMQuery").isNodeOfType(b, ["input", "textarea"]) && b.value.length === 0 || c("isContentEditable")(b) && c("getElementText")(b).length === 0)
        };
        a.filterEventModifiers = function(a, b) {
            return a.ctrlKey || a.altKey || a.metaKey || a.repeat ? !1 : !0
        };
        a.registerKeyAcrossTransitions = function(b, d, e, f) {
            e === void 0 && (e = a.defaultFilter);
            f === void 0 && (f = !1);
            return a.registerKey(b, d, e, f, c("emptyFunction").thatReturnsTrue)
        };
        a.registerKey = function(b, e, f, g, h) {
            f === void 0 && (f = a.defaultFilter);
            g === void 0 && (g = !1);
            h === void 0 && (h = c("emptyFunction").thatReturnsFalse);
            b = b;
            var i = a.getInstance(),
                j = b == null ? [] : i.mapKey(b);
            c("isEmpty")(i.handlers) && d("Run").onLeave(i.resetHandlers.bind(i));
            var k = {};
            for (var l = 0; l < j.length; l++) {
                b = "" + j[l];
                (!i.handlers[b] || g) && (i.handlers[b] = []);
                var m = {
                    callback: e,
                    filter: f,
                    preserve: h
                };
                k[b] = m;
                i.handlers[b].push(m)
            }
            return {
                remove: function() {
                    for (var a in k) {
                        if (i.handlers[a] && i.handlers[a].length) {
                            var b = i.handlers[a].indexOf(k[a]);
                            b >= 0 && i.handlers[a].splice(b, 1)
                        }
                        delete k[a]
                    }
                }
            }
        };
        a.registerKeyForButtonCallback = function(b, c) {
            return a.registerKey(b, function() {
                c.click();
                return !1
            })
        };
        return a
    }();
    g["default"] = b
}), 98);
__d("KeyStatus", ["Event", "ExecutionEnvironment"], (function(a, b, c, d, e, f, g) {
    var h = null,
        i = null;

    function j() {
        i || (i = c("Event").listen(window, "blur", function() {
            h = null, k()
        }))
    }

    function k() {
        i && (i.remove(), i = null)
    }

    function a(a) {
        h = c("Event").getKeyCode(a), j()
    }

    function b() {
        h = null, k()
    }
    if (c("ExecutionEnvironment").canUseDOM) {
        f = document.documentElement;
        if (f)
            if (f.addEventListener) f.addEventListener("keydown", a, !0), f.addEventListener("keyup", b, !0);
            else if (f.attachEvent) {
            f = f.attachEvent;
            f("onkeydown", a);
            f("onkeyup", b)
        }
    }

    function d() {
        return !!h
    }

    function e() {
        return h
    }
    g.isKeyDown = d;
    g.getKeyDownCode = e
}), 98);
__d("isValidReactElement", [], (function(a, b, c, d, e, f) {
    var g = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 60103;

    function a(a) {
        return !!(typeof a === "object" && a !== null && a.$$typeof === g)
    }
    f["default"] = a
}), 66);
__d("mixin", [], (function(a, b, c, d, e, f) {
    function a() {
        var a = function() {},
            b = 0,
            c;
        while (b < 0 || arguments.length <= b ? void 0 : arguments[b]) {
            c = b < 0 || arguments.length <= b ? void 0 : arguments[b];
            for (var d in c) Object.prototype.hasOwnProperty.call(c, d) && (a.prototype[d] = c[d]);
            b += 1
        }
        return a
    }
    f["default"] = a
}), 66);
__d("setImmediate", ["TimeSlice", "TimerStorage", "setImmediateAcrossTransitions"], (function(a, b, c, d, e, f, g) {
    function a(a) {
        var b, d = function() {
            c("TimerStorage").unset(c("TimerStorage").IMMEDIATE, b);
            for (var d = arguments.length, e = new Array(d), f = 0; f < d; f++) e[f] = arguments[f];
            Function.prototype.apply.call(a, this, e)
        };
        c("TimeSlice").copyGuardForWrapper(a, d);
        for (var e = arguments.length, f = new Array(e > 1 ? e - 1 : 0), g = 1; g < e; g++) f[g - 1] = arguments[g];
        b = c("setImmediateAcrossTransitions").apply(void 0, [d].concat(f));
        c("TimerStorage").set(c("TimerStorage").IMMEDIATE, b);
        return b
    }
    g["default"] = a
}), 98);
__d("Layer", ["invariant", "ArbiterMixin", "BehaviorsMixin", "BootloadedReact", "CSS", "ContextualThing", "DOM", "DataStore", "Event", "FBLogger", "HTML", "KeyEventController", "KeyStatus", "Parent", "Style", "ge", "isNode", "isValidReactElement", "mixin", "removeFromArray", "setImmediate"], (function(a, b, c, d, e, f, g, h) {
    b("KeyStatus");
    var i = [],
        j = function(b) {
            babelHelpers.inheritsLoose(a, b);

            function a(a, d) {
                var e;
                e = b.call(this) || this;
                e._config = a || {};
                if (d) {
                    e._configure(e._config, d);
                    a = e._config.addedBehaviors || [];
                    e.enableBehaviors(e._getDefaultBehaviors().concat(a))
                } else c("FBLogger")("layer").warn("The markup param wasn't provided to the Layer constructor");
                return e
            }
            var e = a.prototype;
            e.init = function(a) {
                this._configure(this._config, a);
                a = this._config.addedBehaviors || [];
                this.enableBehaviors(this._getDefaultBehaviors().concat(a));
                this._initialized = !0;
                return this
            };
            e._configure = function(a, b) {
                var e = this;
                if (b) {
                    var f = c("isNode")(b),
                        g = typeof b === "string" || c("HTML").isHTML(b);
                    this.containsReactComponent = c("isValidReactElement")(b);
                    !f && !g && !this.containsReactComponent && c("FBLogger")("layer").warn("Layer must be init with HTML, DOM node or React instance");
                    if (g) b = c("HTML")(b).getRootNode();
                    else if (this.containsReactComponent) {
                        f = document.createElement("div");
                        var h = !0;
                        d("BootloadedReact").render(b, f, function() {
                            e.inform("reactshow"), h || e.updatePosition()
                        });
                        h = !1;
                        b = this._reactContainer = f
                    }
                }
                this._root = this._buildWrapper(a, b);
                a.attributes && c("DOM").setAttributes(this._root, a.attributes);
                a.classNames && a.classNames.forEach(d("CSS").addClass.bind(null, this._root));
                d("CSS").addClass(this._root, "uiLayer");
                a.causalElement && (this._causalElement = c("ge")(a.causalElement));
                a.permanent && (this._permanent = a.permanent);
                a.isStrictlyControlled && (this._isStrictlyControlled = a.isStrictlyControlled);
                d("DataStore").set(this._root, "layer", this)
            };
            e._getDefaultBehaviors = function() {
                return []
            };
            e.getCausalElement = function() {
                return this._causalElement
            };
            e.setCausalElement = function(a) {
                this._causalElement = a;
                return this
            };
            e.getInsertParent = function() {
                return this._insertParent || document.body
            };
            e.getRoot = function() {
                this._root || (this._destroyed ? c("FBLogger")("layer").warn("No root node for this Layer. It has either not yet been set or the Layer has been destroyed.  This layer has been destroyed.") : c("FBLogger")("layer").warn("No root node for this Layer. It has probably not been set."));
                return this._root
            };
            e.getContentRoot = function() {
                return this.getRoot()
            };
            e._buildWrapper = function(a, b) {
                return b
            };
            e.setInsertParent = function(a) {
                a && (this._shown && a !== this.getInsertParent() && (c("DOM").appendContent(a, this.getRoot()), this.updatePosition()), this._insertParent = a);
                return this
            };
            e.showAfterDelay = function(a) {
                window.setTimeout(this.show.bind(this), a)
            };
            e.show = function() {
                var b = this;
                if (this._shown) return this;
                var e = this.getRoot();
                e != null || h(0, 5142);
                this.inform("beforeshow");
                c("Style").set(e, "visibility", "hidden");
                c("Style").set(e, "overflow", "hidden");
                d("CSS").show(e);
                c("DOM").appendContent(this.getInsertParent(), e);
                this.updatePosition() !== !1 ? (this._shown = !0, this.inform("show"), a.inform("show", this), this._permanent || window.setTimeout(function() {
                    b._shown && i.push(b)
                }, 0)) : d("CSS").hide(e);
                c("Style").set(e, "visibility", "");
                c("Style").set(e, "overflow", "");
                c("Style").set(e, "opacity", "1");
                this.inform("aftershow");
                return this
            };
            e.hide = function(a) {
                if (this._isStrictlyControlled) {
                    this._shown && this.inform("runhide", a);
                    return this
                }
                return this._hide()
            };
            e._hide = function() {
                if (this._hiding || !this._shown || this.inform("beforehide") === !1) return this;
                this._hiding = !0;
                this.inform("starthide") !== !1 && this.finishHide();
                return this
            };
            e.conditionShow = function(a) {
                return a ? this.show() : this._hide()
            };
            e.finishHide = function() {
                if (this._shown) {
                    this._permanent || c("removeFromArray")(i, this);
                    this._hiding = !1;
                    this._shown = !1;
                    var b = this.getRoot();
                    b != null || h(0, 5143);
                    d("CSS").hide(b);
                    this.inform("hide");
                    a.inform("hide", this)
                }
            };
            e.isShown = function() {
                return this._shown
            };
            e.updatePosition = function() {
                return !0
            };
            e.destroy = function() {
                this.containsReactComponent && d("BootloadedReact").unmountComponentAtNode(this._reactContainer);
                this.finishHide();
                var b = this.getRoot();
                c("DOM").remove(b);
                this.destroyBehaviors();
                this.inform("destroy");
                a.inform("destroy", this);
                d("DataStore").remove(b, "layer");
                this._root = this._causalElement = null;
                this._destroyed = !0
            };
            a.init = function(a, b) {
                a.init(b)
            };
            a.initAndShow = function(a, b) {
                a.init(b).show()
            };
            a.show = function(a) {
                a.show()
            };
            a.showAfterDelay = function(a, b) {
                a.showAfterDelay(b)
            };
            a.getTopmostLayer = function() {
                return i[i.length - 1]
            };
            a.informBlur = function(a) {
                k = null;
                l = null;
                var b = i.length;
                if (!b) return;
                while (b--) {
                    var c = i[b],
                        e = c.getContentRoot();
                    e != null || h(0, 5144);
                    if (d("ContextualThing").containsIncludingLayers(e, a)) return;
                    if (c.inform("blur", {
                            target: a
                        }) === !1 || c.isShown()) return
                }
            };
            return a
        }(c("mixin")(c("ArbiterMixin"), c("BehaviorsMixin")));
    Object.assign(j, c("ArbiterMixin"));
    Object.assign(j.prototype, {
        _destroyed: !1,
        _initialized: !1,
        _root: null,
        _shown: !1,
        _hiding: !1,
        _causalElement: null,
        _reactContainer: null
    });
    c("Event").listen(document.documentElement, "keydown", function(a) {
        if (c("KeyEventController").filterEventTargets(a, "keydown"))
            for (var b = i.length - 1; b >= 0; b--)
                if (i[b].inform("key", a) === !1) return !1;
        return !0
    }, c("Event").Priority.URGENT);
    var k;
    c("Event").listen(document.documentElement, "mousedown", function(a) {
        k = a.getTarget()
    });
    var l;
    c("Event").listen(document.documentElement, "mouseup", function(a) {
        l = a.getTarget(), c("setImmediate")(function() {
            k = null, l = null
        })
    });
    c("Event").listen(document.documentElement, "click", function(a) {
        var b = k,
            e = l;
        k = null;
        l = null;
        var f = i.length;
        if (!f) return;
        f = a.getTarget();
        if (f !== e || f !== b) return;
        if (!c("DOM").contains(document.documentElement, f)) return;
        if (f.offsetWidth != null && !f.offsetWidth) return;
        if (d("Parent").byClass(f, "generic_dialog")) return;
        j.informBlur(f)
    });
    g["default"] = j
}), 98);
__d("isTruthy", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        return a != null && Boolean(a)
    }
    f["default"] = a
}), 66);
__d("Popup", ["isTruthy"], (function(a, b, c, d, e, f, g) {
    function a(a, b, d, e) {
        var f = [];
        c("isTruthy")(b) && f.push("width=" + b);
        c("isTruthy")(d) && f.push("height=" + d);
        var g = document.body;
        if (g != null && b != null && b !== 0 && d != null && d !== 0) {
            var h = "screenX" in window ? window.screenX : window.screenLeft,
                i = "screenY" in window ? window.screenY : window.screenTop,
                j = "outerWidth" in window ? window.outerWidth : g.clientWidth;
            g = "outerHeight" in window ? window.outerHeight : g.clientHeight - 22;
            h = Math.floor(h + (j - b) / 2);
            j = Math.floor(i + (g - d) / 2.5);
            f.push("left=" + h);
            f.push("top=" + j)
        }
        f.push("scrollbars");
        return window.open(a, e != null && e !== "" ? e : "_blank", f.join(","))
    }
    g.open = a
}), 98);
__d("getViewportDimensions", ["UserAgent"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = function() {
        var a = null;
        return function() {
            var b = document.body;
            if (b == null) return null;
            (a == null || !b.contains(a)) && (a = document.createElement("div"), a.style.left = Number.MAX_SAFE_INTEGER + "px", a.style.width = "100%", a.style.height = "100%", a.style.position = "fixed", b.appendChild(a));
            return a
        }
    }();

    function i() {
        var a;
        document.documentElement && (a = document.documentElement.clientWidth);
        a == null && document.body && (a = document.body.clientWidth);
        return a || 0
    }

    function j() {
        var a;
        document.documentElement && (a = document.documentElement.clientHeight);
        a == null && document.body && (a = document.body.clientHeight);
        return a || 0
    }

    function k() {
        return {
            width: window.innerWidth || i(),
            height: window.innerHeight || j()
        }
    }
    k.withoutScrollbars = function() {
        return c("UserAgent").isPlatform("Android") ? k() : {
            width: i(),
            height: j()
        }
    };
    k.layout = function() {
        var a, b = h();
        return {
            width: (a = b == null ? void 0 : b.clientWidth) != null ? a : i(),
            height: (a = b == null ? void 0 : b.clientHeight) != null ? a : j()
        }
    };
    g["default"] = k
}), 98);
__d("isFalsey", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        return a == null || !Boolean(a)
    }
    f["default"] = a
}), 66);
__d("PopupWindow", ["DOMDimensions", "DOMQuery", "FlowMigrationUtilsForLegacyFiles", "Layer", "Popup", "getViewportDimensions", "isFalsey"], (function(a, b, c, d, e, f, g) {
    var h = {
        allowShrink: !0,
        strategy: "vector",
        timeout: 100,
        widthElement: null
    };

    function b(a) {
        Object.assign(h, a), window.setInterval(i, h.timeout)
    }

    function i() {
        var a = c("getViewportDimensions")(),
            b = j(),
            e = c("Layer").getTopmostLayer();
        if (e) {
            e = (e = e.getRoot()) == null ? void 0 : e.firstChild;
            e || d("FlowMigrationUtilsForLegacyFiles").invariantViolation("topMostLayer.getRoot().firstChild is null.");
            var f = d("DOMDimensions").getElementDimensions(e);
            f.height += d("DOMDimensions").measureElementBox(e, "height", !0, !0, !0);
            f.width += d("DOMDimensions").measureElementBox(e, "width", !0, !0, !0);
            b.height = Math.max(b.height, f.height);
            b.width = Math.max(b.width, f.width)
        }
        e = b.height - a.height;
        f = b.width - a.width;
        f < 0 && c("isFalsey")(h.widthElement) && (f = 0);
        f = f > 1 ? f : 0;
        c("isFalsey")(h.allowShrink) && e < 0 && (e = 0);
        if (e || f) try {
            window.console && window.console.firebug, window.resizeBy(f, e), f && window.moveBy(f / -2, 0)
        } catch (a) {}
    }

    function j() {
        var b = d("DOMDimensions").getDocumentDimensions();
        if (h.strategy === "offsetHeight") {
            var e = document.body;
            if (!e) d("FlowMigrationUtilsForLegacyFiles").invariantViolation("document.body is null.");
            else {
                b.height = (e = e.offsetHeight) != null ? e : 0
            }
        }
        if (c("isFalsey")(h.widthElement) && typeof h.widthElement === "string") {
            e = d("DOMQuery").scry(document.body, h.widthElement)[0];
            e && (b.width = d("DOMDimensions").getElementDimensions(e).width)
        }
        e = a.Dialog;
        e && e.max_bottom && e.max_bottom > b.height && (b.height = e.max_bottom);
        return b
    }

    function e(a, b, c, e) {
        return d("Popup").open(a, c, b, e)
    }
    g._opts = h;
    g.init = b;
    g._resizeCheck = i;
    g._getDocumentSize = j;
    g.open = e
}), 98);
__d("PluginOptin", ["DOMEvent", "DOMEventListener", "MessengerWebPluginAnonymousTypedLogger", "PlatformWidgetEndpoint", "PluginLoggedOutUserTypedLogger", "PluginMessage", "PopupWindow", "URI", "UserAgent_DEPRECATED"], (function(a, b, c, d, e, f, g) {
    var h = {
            "default": {
                width: 450,
                height: 410
            },
            large: {
                width: 475,
                height: 605
            }
        },
        i = function() {
            function a(a, b) {
                this.return_params = c("URI").getRequestURI().getQueryData(), this.login_params = {}, this.optin_params = {}, this.plugin = a, this.api_key = b, this.size = "default", this.addReturnParams({
                    ret: "optin"
                }), delete this.return_params.hash
            }
            var b = a.prototype;
            b.addReturnParams = function(a) {
                Object.assign(this.return_params, a);
                return this
            };
            b.addLoginParams = function(a) {
                Object.assign(this.login_params, a);
                return this
            };
            b.addOptinParams = function(a) {
                Object.assign(this.optin_params, a);
                return this
            };
            b.setSize = function(a) {
                this.size = a ? a : "default";
                return this
            };
            b.start = function() {
                var a = this.api_key || 127760087237610;
                c("URI").getRequestURI().getQueryData().kid_directed_site && (this.login_params.kid_directed_site = !0);
                this.login_params.referrer = document.referrer;
                var b = new(c("URI"))(c("PlatformWidgetEndpoint").dialog("plugin.optin")).addQueryData(this.optin_params).addQueryData({
                        app_id: a,
                        secure: c("URI").getRequestURI().isSecure(),
                        social_plugin: this.plugin,
                        return_params: JSON.stringify(this.return_params),
                        login_params: JSON.stringify(this.login_params)
                    }),
                    e = d("UserAgent_DEPRECATED").mobile() !== null;
                e ? b.setSubdomain("m") : b.addQueryData({
                    display: "popup"
                });
                this.return_params.act !== null && this.return_params.act === "send" && new(c("PluginLoggedOutUserTypedLogger"))().setPluginAppID(a).setPluginName(this.return_params.act).setHref(this.return_params.href).logVital();
                a = h[this.size];
                b = this.transformSocialPluginToFacebookDomainPopupURI(b, c("URI").getRequestURI().getDomain(), e);
                this.popup = d("PopupWindow").open(b.toString(), a.height, a.width, "fbPluginAuthenticationPopupWindow");
                this.plugin === "customer_chat" && this.login_params.chat_plugin_upgrade != null && this.login_params.chat_plugin_upgrade === !0 && new(c("MessengerWebPluginAnonymousTypedLogger"))().setPageID(this.login_params.page_id).setClientFbid(this.login_params.guest_id).setRequestID(this.login_params.request_id).setNewEventName("upgrade_plugin_optin_popup_opened").log();
                d("PluginMessage").listen();
                return this
            };
            b.transformSocialPluginToFacebookDomainPopupURI = function(a, b, c) {
                b = b.split(".");
                if (b[0] !== "socialplugin") return a;
                b[b.length - 1] = "com";
                b[0] = c ? "m" : "www";
                return a.setDomain(b.join(".")).setProtocol("https")
            };
            return a
        }();
    i.starter = function(a, b, c, d) {
        a = new i(a);
        a.addReturnParams(b || {});
        a.addLoginParams(c || {});
        a.addOptinParams(d || {});
        return a.start.bind(a)
    };
    i.listen = function(a, b, d, e, f) {
        c("DOMEventListener").add(a, "click", function(a) {
            new(c("DOMEvent"))(a).kill(), i.starter(b, d, e, f)()
        })
    };
    g["default"] = i
}), 98);
__d("BanzaiConsts", [], (function(a, b, c, d, e, f) {
    a = {
        SEND: "Banzai:SEND",
        OK: "Banzai:OK",
        ERROR: "Banzai:ERROR",
        SHUTDOWN: "Banzai:SHUTDOWN",
        BASIC: "basic",
        VITAL: "vital",
        BASIC_WAIT: 6e4,
        BASIC_WAIT_COMET: 2e3,
        VITAL_WAIT: 1e3,
        BATCH_SIZE_LIMIT: 64e3,
        EXPIRY: 864e5,
        BATCH_TIMEOUT: 1e4,
        LAST_STORAGE_FLUSH: "banzai:last_storage_flush",
        STORAGE_FLUSH_INTERVAL: 12 * 60 * 6e4,
        POST_READY: 0,
        POST_INFLIGHT: 1,
        POST_SENT: 2
    };
    b = a;
    f["default"] = b
}), 66);
__d("CurrentUser", ["Cookie", "CurrentUserInitialData"], (function(a, b, c, d, e, f) {
    var g, h = {
        getID: function() {
            return (g || (g = b("CurrentUserInitialData"))).USER_ID
        },
        getAccountID: function() {
            return (g || (g = b("CurrentUserInitialData"))).ACCOUNT_ID
        },
        getPossiblyNonFacebookUserID: function() {
            var a;
            return (a = (g || (g = b("CurrentUserInitialData"))).NON_FACEBOOK_USER_ID) != null ? a : this.getID()
        },
        getEIMU: function() {
            var a;
            return (a = (g || (g = b("CurrentUserInitialData"))).IG_USER_EIMU) != null ? a : "0"
        },
        getEmployeeWorkUserID: function() {
            return (g || (g = b("CurrentUserInitialData"))).WORK_USER_ID
        },
        getName: function() {
            return (g || (g = b("CurrentUserInitialData"))).NAME
        },
        getShortName: function() {
            return (g || (g = b("CurrentUserInitialData"))).SHORT_NAME
        },
        getEPOU: function() {
            var a;
            return (a = (g || (g = b("CurrentUserInitialData"))).EPOU_ID) != null ? a : "0"
        },
        isLoggedIn: function() {
            return h.getPossiblyNonFacebookUserID() !== "0"
        },
        isLoggedInNow: function() {
            var a;
            if (!h.isLoggedIn()) return !1;
            if ((g || (g = b("CurrentUserInitialData"))).IS_INTERN_SITE) return !0;
            if ((g || (g = b("CurrentUserInitialData"))).IS_WORK_USER || (g || (g = b("CurrentUserInitialData"))).IS_WORKROOMS_USER || (g || (g = b("CurrentUserInitialData"))).IS_WORK_MESSENGER_CALL_GUEST_USER || (g || (g = b("CurrentUserInitialData"))).IS_TOGETHER_APP_USER || (g || (g = b("CurrentUserInitialData"))).IS_ENTERPRISE_USER || (g || (g = b("CurrentUserInitialData"))).IS_INSTAGRAM_USER) return !0;
            if ((g || (g = b("CurrentUserInitialData"))).ORIGINAL_USER_ID != null && (g || (g = b("CurrentUserInitialData"))).ORIGINAL_USER_ID != "") return (g || (g = b("CurrentUserInitialData"))).ORIGINAL_USER_ID === b("Cookie").get("c_user");
            return (g || (g = b("CurrentUserInitialData"))).IS_BUSINESS_DOMAIN === !0 ? (g || (g = b("CurrentUserInitialData"))).USER_ID == b("Cookie").get("c_user") : (g || (g = b("CurrentUserInitialData"))).USER_ID === ((a = b("Cookie").get("i_user")) != null ? a : b("Cookie").get("c_user"))
        },
        isEmployee: function() {
            return !!(g || (g = b("CurrentUserInitialData"))).IS_EMPLOYEE
        },
        isTestUser: function() {
            return !!(g || (g = b("CurrentUserInitialData"))).IS_TEST_USER
        },
        hasWorkUser: function() {
            return !!(g || (g = b("CurrentUserInitialData"))).HAS_WORK_USER
        },
        isWorkUser: function() {
            return !!(g || (g = b("CurrentUserInitialData"))).IS_WORK_USER
        },
        isWorkroomsUser: function() {
            return !!(g || (g = b("CurrentUserInitialData"))).IS_WORKROOMS_USER
        },
        isGray: function() {
            return !!(g || (g = b("CurrentUserInitialData"))).IS_GRAY
        },
        isUnderage: function() {
            return !!(g || (g = b("CurrentUserInitialData"))).IS_UNDERAGE
        },
        isMessengerOnlyUser: function() {
            return !!(g || (g = b("CurrentUserInitialData"))).IS_MESSENGER_ONLY_USER
        },
        isDeactivatedAllowedOnMessenger: function() {
            return !!(g || (g = b("CurrentUserInitialData"))).IS_DEACTIVATED_ALLOWED_ON_MESSENGER
        },
        isMessengerCallGuestUser: function() {
            return !!(g || (g = b("CurrentUserInitialData"))).IS_MESSENGER_CALL_GUEST_USER
        },
        isBusinessPersonAccount: function() {
            return (g || (g = b("CurrentUserInitialData"))).IS_BUSINESS_PERSON_ACCOUNT
        },
        hasSecondaryBusinessPerson: function() {
            return (g || (g = b("CurrentUserInitialData"))).HAS_SECONDARY_BUSINESS_PERSON
        },
        getAppID: function() {
            return (g || (g = b("CurrentUserInitialData"))).APP_ID
        },
        isFacebookWorkAccount: function() {
            return (g || (g = b("CurrentUserInitialData"))).IS_FACEBOOK_WORK_ACCOUNT
        }
    };
    e.exports = h
}), null);
__d("BanzaiUtils", ["BanzaiConsts", "CurrentUser", "FBLogger", "WebSession", "performanceAbsoluteNow"], (function(a, b, c, d, e, f) {
    "use strict";
    var g, h, i = {
        canSend: function(a) {
            return a[2] >= (g || (g = b("performanceAbsoluteNow")))() - (h || (h = b("BanzaiConsts"))).EXPIRY
        },
        filterPost: function(a, c, d, e) {
            if (e.overlimit) return !0;
            if (!e.sendMinimumOnePost && a[4] + e.currentSize > (h || (h = b("BanzaiConsts"))).BATCH_SIZE_LIMIT) return !0;
            var f = a.__meta;
            if (f.status != null && f.status >= (h || (h = b("BanzaiConsts"))).POST_SENT || !i.canSend(a)) return !1;
            if (f.status != null && f.status >= (h || (h = b("BanzaiConsts"))).POST_INFLIGHT) return !0;
            var g = f.compress != null ? f.compress : !0,
                j = (f.webSessionId != null ? f.webSessionId : "null") + (f.userID != null ? f.userID : "null") + (f.appID != null ? f.appID : "null") + (g ? "compress" : ""),
                k = e.wadMap.get(j);
            k || (k = {
                app_id: f.appID,
                needs_compression: g,
                posts: [],
                user: f.userID,
                webSessionId: f.webSessionId
            }, e.wadMap.set(j, k), c.push(k));
            f.status = (h || (h = b("BanzaiConsts"))).POST_INFLIGHT;
            Array.isArray(k.posts) ? k.posts.push(a) : b("FBLogger")("banzai").mustfix("Posts were a string instead of array");
            d.push(a);
            e.currentSize += a[4];
            e.currentSize >= (h || (h = b("BanzaiConsts"))).BATCH_SIZE_LIMIT && (e.overlimit = !0);
            return e.keepRetryable && Boolean(f.retry)
        },
        resetPostStatus: function(a) {
            a.__meta.status = (h || (h = b("BanzaiConsts"))).POST_READY
        },
        retryPost: function(a, c, d) {
            var e = a;
            e.__meta.status = (h || (h = b("BanzaiConsts"))).POST_READY;
            e[3] = (e[3] || 0) + 1;
            e.__meta.retry !== !0 && c >= 400 && c < 600 && d.push(a)
        },
        wrapData: function(a, c, d, e, f) {
            d = [a, c, d, 0, (a = f) != null ? a : c ? JSON.stringify(c).length : 0];
            d.__meta = {
                appID: b("CurrentUser").getAppID(),
                retry: e === !0,
                status: (h || (h = b("BanzaiConsts"))).POST_READY,
                userID: b("CurrentUser").getPossiblyNonFacebookUserID(),
                webSessionId: b("WebSession").getId()
            };
            return d
        }
    };
    e.exports = i
}), null);
__d("BigPipeInstance", [], (function(a, b, c, d, e, f) {
    "use strict";
    var g = null;
    a = {
        Events: {
            init: "BigPipe/init",
            tti: "tti_bigpipe",
            displayed: "all_pagelets_displayed",
            loaded: "all_pagelets_loaded"
        },
        setCurrentInstance_DO_NOT_USE: function(a) {
            g = a
        },
        getCurrentInstance: function() {
            return g
        }
    };
    e.exports = a
}), null);
__d("EventEmitterWithValidation", ["BaseEventEmitter"], (function(a, b, c, d, e, f) {
    "use strict";
    a = function(a) {
        babelHelpers.inheritsLoose(b, a);

        function b(b, c) {
            var d;
            d = a.call(this) || this;
            d.$EventEmitterWithValidation1 = Object.keys(b);
            d.$EventEmitterWithValidation2 = Boolean(c);
            return d
        }
        var c = b.prototype;
        c.emit = function(b) {
            if (this.$EventEmitterWithValidation1.indexOf(b) === -1) {
                if (this.$EventEmitterWithValidation2) return;
                throw new TypeError(g(b, this.$EventEmitterWithValidation1))
            }
            return a.prototype.emit.apply(this, arguments)
        };
        return b
    }(b("BaseEventEmitter"));

    function g(a, b) {
        a = 'Unknown event type "' + a + '". ';
        a += "Known event types: " + b.join(", ") + ".";
        return a
    }
    e.exports = a
}), null);
__d("mixInEventEmitter", ["invariant", "EventEmitterWithHolding", "EventEmitterWithValidation", "EventHolder"], (function(a, b, c, d, e, f, g, h) {
    "use strict";

    function a(a, b, c) {
        b || h(0, 3159);
        var d = a.prototype || a;
        d.__eventEmitter && h(0, 3160);
        a = a.constructor;
        a && (a === Object || a === Function || h(0, 3161));
        d.__types = babelHelpers["extends"]({}, d.__types, b);
        d.__ignoreUnknownEvents = Boolean(c);
        Object.assign(d, i)
    }
    var i = {
        emit: function(a, b, c, d, e, f, g) {
            return this.__getEventEmitter().emit(a, b, c, d, e, f, g)
        },
        emitAndHold: function(a, b, c, d, e, f, g) {
            return this.__getEventEmitter().emitAndHold(a, b, c, d, e, f, g)
        },
        addListener: function(a, b, c) {
            return this.__getEventEmitter().addListener(a, b, c)
        },
        once: function(a, b, c) {
            return this.__getEventEmitter().once(a, b, c)
        },
        addRetroactiveListener: function(a, b, c) {
            return this.__getEventEmitter().addRetroactiveListener(a, b, c)
        },
        listeners: function(a) {
            return this.__getEventEmitter().listeners(a)
        },
        removeAllListeners: function() {
            this.__getEventEmitter().removeAllListeners()
        },
        removeCurrentListener: function() {
            this.__getEventEmitter().removeCurrentListener()
        },
        releaseHeldEventType: function(a) {
            this.__getEventEmitter().releaseHeldEventType(a)
        },
        __getEventEmitter: function() {
            if (!this.__eventEmitter) {
                var a = new(c("EventEmitterWithValidation"))(this.__types, this.__ignoreUnknownEvents),
                    b = new(c("EventHolder"))();
                this.__eventEmitter = new(c("EventEmitterWithHolding"))(a, b)
            }
            return this.__eventEmitter
        }
    };
    g["default"] = a
}), 98);
__d("NavigationMetricsCore", ["mixInEventEmitter", "pageID"], (function(a, b, c, d, e, f, g) {
    var h = {
            NAVIGATION_DONE: "NAVIGATION_DONE",
            EVENT_OCCURRED: "EVENT_OCCURRED"
        },
        i = {
            tti: "tti",
            e2e: "e2e",
            all_pagelets_loaded: "all_pagelets_loaded",
            all_pagelets_displayed: "all_pagelets_displayed"
        },
        j = 0,
        k = {},
        l = function() {
            function a() {
                this.eventTimings = {
                    tti: null,
                    e2e: null,
                    all_pagelets_loaded: null,
                    all_pagelets_displayed: null
                }, this.lid = c("pageID") + ":" + j++, this.extras = {}
            }
            var b = a.prototype;
            b.getLID = function() {
                return this.lid
            };
            b.setRequestStart = function(a) {
                this.start = a;
                return this
            };
            b.setTTI = function(a) {
                this.eventTimings.tti = a;
                this.$1(i.tti, a);
                return this
            };
            b.setE2E = function(a) {
                this.eventTimings.e2e = a;
                this.$1(i.e2e, a);
                return this
            };
            b.setExtra = function(a, b) {
                this.extras[a] = b;
                return this
            };
            b.setDisplayDone = function(a) {
                this.eventTimings.all_pagelets_displayed = a;
                this.setExtra("all_pagelets_displayed", a);
                this.$1(i.all_pagelets_displayed, a);
                return this
            };
            b.setAllPageletsLoaded = function(a) {
                this.eventTimings.all_pagelets_loaded = a;
                this.setExtra("all_pagelets_loaded", a);
                this.$1(i.all_pagelets_loaded, a);
                return this
            };
            b.setServerLID = function(a) {
                this.serverLID = a;
                return this
            };
            b.$1 = function(a, b) {
                var c = {};
                k != null && this.serverLID != null && k[this.serverLID] != null && (c = k[this.serverLID]);
                c = babelHelpers["extends"]({}, c, {
                    event: a,
                    timestamp: b
                });
                m.emitAndHold(h.EVENT_OCCURRED, this.serverLID, c);
                return this
            };
            b.doneNavigation = function() {
                var a = babelHelpers["extends"]({
                    start: this.start,
                    extras: this.extras
                }, this.eventTimings);
                if (this.serverLID && k[this.serverLID]) {
                    var b = this.serverLID;
                    Object.assign(a, k[b]);
                    delete k[b]
                }
                m.emitAndHold(h.NAVIGATION_DONE, this.lid, a)
            };
            return a
        }(),
        m = {
            Events: h,
            postPagelet: function(a, b, c) {},
            siteInit: function(a) {
                a(l)
            },
            setPage: function(a) {
                if (!a.serverLID) return;
                k[a.serverLID] = {
                    page: a.page,
                    pageType: a.page_type,
                    pageURI: a.page_uri,
                    serverLID: a.serverLID
                }
            },
            getFullPageLoadLid: function() {
                throw new Error("getFullPageLoadLid is not implemented on this site")
            }
        };
    c("mixInEventEmitter")(m, h);
    a = m;
    g["default"] = a
}), 98);
__d("PageEvents", [], (function(a, b, c, d, e, f) {
    a = Object.freeze({
        NATIVE_ONLOAD: "onload/onload",
        BIGPIPE_ONLOAD: "onload/onload_callback",
        AJAXPIPE_ONLOAD: "ajaxpipe/onload_callback",
        NATIVE_DOMREADY: "onload/dom_content_ready",
        BIGPIPE_DOMREADY: "onload/domcontent_callback",
        AJAXPIPE_DOMREADY: "ajaxpipe/domcontent_callback",
        NATIVE_ONBEFOREUNLOAD: "onload/beforeunload",
        NATIVE_ONUNLOAD: "onload/unload",
        AJAXPIPE_ONUNLOAD: "onload/exit",
        AJAXPIPE_SEND: "ajaxpipe/send",
        AJAXPIPE_FIRST_RESPONSE: "ajaxpipe/first_response",
        AJAXPIPE_ONBEFORECLEARCANVAS: "ajaxpipe/onbeforeclearcanvas"
    });
    f["default"] = a
}), 66);
__d("NavigationMetrics", ["Arbiter", "BigPipeInstance", "NavigationMetricsCore", "PageEvents", "performance"], (function(a, b, c, d, e, f, g) {
    var h = "0";
    c("NavigationMetricsCore").getFullPageLoadLid = function() {
        return h
    };
    c("NavigationMetricsCore").siteInit(function(a) {
        var b = new a(),
            e = !0;
        c("Arbiter").subscribe(d("BigPipeInstance").Events.init, function(f, g) {
            var i = e ? b : new a();
            e && (h = g.lid);
            e = !1;
            i.setServerLID(g.lid);
            f = g.arbiter;
            f.subscribe(d("BigPipeInstance").Events.tti, function(a, b) {
                a = b.ts;
                i.setTTI(a)
            });
            f.subscribe(c("PageEvents").AJAXPIPE_SEND, function(a, b) {
                a = b.ts;
                i.setRequestStart(a)
            });
            f.subscribe(c("PageEvents").AJAXPIPE_ONLOAD, function(a, b) {
                a = b.ts;
                i.setE2E(a).doneNavigation()
            });
            f.subscribe(d("BigPipeInstance").Events.displayed, function(a, b) {
                a = b.ts;
                i.setDisplayDone(a)
            });
            f.subscribe(d("BigPipeInstance").Events.loaded, function(a, b) {
                a = b.ts;
                i.setAllPageletsLoaded(a)
            })
        });
        c("Arbiter").subscribe(c("PageEvents").BIGPIPE_ONLOAD, function(a, d) {
            a = d.ts;
            e = !1;
            b.setRequestStart(c("performance").timing && c("performance").timing.navigationStart).setE2E(a).doneNavigation()
        })
    });
    g["default"] = c("NavigationMetricsCore")
}), 98);
__d("cancelIdleCallback", ["cr:692209"], (function(a, b, c, d, e, f, g) {
    g["default"] = b("cr:692209")
}), 98);
__d("IdleCallbackImplementation", ["performanceNow", "requestAnimationFramePolyfill"], (function(a, b, c, d, e, f, g) {
    var h = [],
        i = 0,
        j = 0,
        k = -1,
        l = !1,
        m = 1e3 / 60,
        n = 2;

    function o(a) {
        return a
    }

    function p(a) {
        return a
    }

    function b(b, c) {
        var d = j++;
        h[d] = b;
        r();
        if (c != null && c.timeout > 0) {
            var e = o(d);
            a.setTimeout(function() {
                return x(e)
            }, c.timeout)
        }
        return o(d)
    }

    function q(a) {
        a = p(a);
        h[a] = null
    }

    function r() {
        l || (l = !0, c("requestAnimationFramePolyfill")(function(a) {
            l = !1, t(c("performanceNow")() - a)
        }))
    }

    function s(a) {
        var b = m - n;
        if (a < b) return b - a;
        a = a % m;
        if (a > b || a < n) return 0;
        else return b - a
    }

    function t(a) {
        var b = c("performanceNow")();
        if (b > k) {
            a = s(a);
            if (a > 0) {
                b = b + a;
                w(b);
                k = b
            }
        }
        u() && r()
    }

    function u() {
        return i < h.length
    }

    function v() {
        while (u()) {
            var a = h[i];
            i++;
            if (a) return a
        }
        return null
    }

    function w(a) {
        var b;
        while (c("performanceNow")() < a && (b = v())) b(new y(a))
    }

    function x(a) {
        var b = p(a);
        b = h[b];
        b && (q(a), b(new y(null)))
    }
    var y = function() {
        function a(a) {
            this.didTimeout = a == null, this.$1 = a
        }
        var b = a.prototype;
        b.timeRemaining = function() {
            var a = this.$1;
            if (a != null) {
                var b = c("performanceNow")();
                if (b < a) return a - b
            }
            return 0
        };
        return a
    }();
    g.requestIdleCallback = b;
    g.cancelIdleCallback = q
}), 98);
__d("requestIdleCallbackAcrossTransitions", ["IdleCallbackImplementation", "TimeSlice"], (function(a, b, c, d, e, f, g) {
    var h = a.requestIdleCallback || d("IdleCallbackImplementation").requestIdleCallback;

    function b(b, d) {
        b = c("TimeSlice").guard(b, "requestIdleCallback", {
            propagationType: c("TimeSlice").PropagationType.CONTINUATION,
            registerCallStack: !0
        });
        return h.call(a, b, d)
    }
    g["default"] = b
}), 98);
__d("SetIdleTimeoutAcrossTransitions", ["NavigationMetrics", "cancelIdleCallback", "clearTimeout", "nullthrows", "requestIdleCallbackAcrossTransitions", "setTimeoutAcrossTransitions"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = !1,
        i = new Map();

    function b(a, b) {
        if (h) {
            var d = c("setTimeoutAcrossTransitions")(function() {
                var b = c("requestIdleCallbackAcrossTransitions")(function() {
                    a(), i["delete"](b)
                });
                i.set(d, b)
            }, b);
            return d
        } else return c("setTimeoutAcrossTransitions")(a, b)
    }

    function d(a) {
        c("clearTimeout")(a), i.has(a) && (c("cancelIdleCallback")(c("nullthrows")(i.get(a))), i["delete"](a))
    }
    c("NavigationMetrics").addRetroactiveListener(c("NavigationMetrics").Events.EVENT_OCCURRED, function(b, c) {
        c.event === "all_pagelets_loaded" && (h = !!a.requestIdleCallback)
    });
    g.start = b;
    g.clear = d
}), 98);
__d("BanzaiStorage", ["BanzaiConsts", "BanzaiUtils", "CurrentUser", "FBJSON", "SetIdleTimeoutAcrossTransitions", "WebSession", "WebStorage", "WebStorageMutex", "isInIframe", "performanceAbsoluteNow"], (function(a, b, c, d, e, f) {
    "use strict";
    var g, h, i, j = "bz:",
        k = b("isInIframe")(),
        l, m = !1,
        n = null;

    function o() {
        var a = "check_quota";
        try {
            var b = p();
            if (!b) return !1;
            b.setItem(a, a);
            b.removeItem(a);
            return !0
        } catch (a) {
            return !1
        }
    }

    function p() {
        m || (m = !0, l = (g || (g = b("WebStorage"))).getLocalStorage());
        return l
    }
    a = {
        flush: function(a) {
            if (k) return;
            var c = p();
            if (c) {
                n == null && (n = parseInt(c.getItem((h || (h = b("BanzaiConsts"))).LAST_STORAGE_FLUSH), 10));
                var d = n && (i || (i = b("performanceAbsoluteNow")))() - n >= (h || (h = b("BanzaiConsts"))).STORAGE_FLUSH_INTERVAL;
                d && a();
                (d || !n) && (n = (i || (i = b("performanceAbsoluteNow")))(), (g || (g = b("WebStorage"))).setItemGuarded(c, (h || (h = b("BanzaiConsts"))).LAST_STORAGE_FLUSH, n.toString()))
            }
        },
        restore: function(a) {
            if (k) return;
            var c = p();
            if (!c) return;
            var d = function(d) {
                var e = [];
                for (var f = 0; f < c.length; f++) {
                    var g = c.key(f);
                    typeof g === "string" && g.indexOf(j) === 0 && g.indexOf("bz:__") !== 0 && e.push(g)
                }
                e.forEach(function(d) {
                    var e = c.getItem(d);
                    c.removeItem(d);
                    if (e == null || e === "") return;
                    d = b("FBJSON").parse(e);
                    d.forEach(function(c) {
                        if (!c) return;
                        var d = c.__meta = c.pop(),
                            e = b("BanzaiUtils").canSend(c);
                        if (!e) return;
                        e = b("CurrentUser").getPossiblyNonFacebookUserID();
                        (d.userID === e || e === "0") && (b("BanzaiUtils").resetPostStatus(c), a(c))
                    })
                });
                d && d.unlock()
            };
            o() ? new(b("WebStorageMutex"))("banzai").lock(d) : b("SetIdleTimeoutAcrossTransitions").start(d, 0)
        },
        store: function(a) {
            if (k) return;
            var c = p(),
                d = a.filter(function(a) {
                    return a.__meta.status !== (h || (h = b("BanzaiConsts"))).POST_SENT
                });
            if (!c || d.length <= 0) return;
            d = d.map(function(a) {
                return [a[0], a[1], a[2], a[3] || 0, a[4], a.__meta]
            });
            a.splice(0, a.length);
            (g || (g = b("WebStorage"))).setItemGuarded(c, j + b("WebSession").getId() + "." + (i || (i = b("performanceAbsoluteNow")))(), b("FBJSON").stringify(d))
        }
    };
    e.exports = a
}), null);
__d("getCrossOriginTransport", ["invariant", "ExecutionEnvironment", "err"], (function(a, b, c, d, e, f, g) {
    function h() {
        if (!b("ExecutionEnvironment").canUseDOM) throw b("err")("getCrossOriginTransport: %s", "Cross origin transport unavailable in the server environment.");
        try {
            var a = new XMLHttpRequest();
            !("withCredentials" in a) && typeof XDomainRequest !== "undefined" && (a = new XDomainRequest());
            return a
        } catch (a) {
            throw b("err")("getCrossOriginTransport: %s", a.message)
        }
    }
    h.withCredentials = function() {
        var a = h();
        "withCredentials" in a || g(0, 5150);
        var b = a.open;
        a.open = function() {
            b.apply(this, arguments), this.withCredentials = !0
        };
        return a
    };
    e.exports = h
}), null);
__d("ZeroRewrites", ["URI", "ZeroRewriteRules", "getCrossOriginTransport", "getSameOriginTransport", "isFacebookURI"], (function(a, b, c, d, e, f) {
    var g, h = {
        rewriteURI: function(a) {
            if (!b("isFacebookURI")(a) || h._isWhitelisted(a)) return a;
            var c = h._getRewrittenSubdomain(a);
            c !== null && c !== void 0 && (a = a.setSubdomain(c));
            return a
        },
        getTransportBuilderForURI: function(a) {
            return h.isRewritten(a) ? b("getCrossOriginTransport").withCredentials : b("getSameOriginTransport")
        },
        isRewriteSafe: function(a) {
            if (Object.keys(b("ZeroRewriteRules").rewrite_rules).length === 0 || !b("isFacebookURI")(a)) return !1;
            var c = h._getCurrentURI().getDomain(),
                d = new(g || (g = b("URI")))(a).qualify().getDomain();
            return c === d || h.isRewritten(a)
        },
        isRewritten: function(a) {
            a = a.getQualifiedURI();
            if (Object.keys(b("ZeroRewriteRules").rewrite_rules).length === 0 || !b("isFacebookURI")(a) || h._isWhitelisted(a)) return !1;
            var c = a.getSubdomain(),
                d = h._getCurrentURI(),
                e = h._getRewrittenSubdomain(d);
            return a.getDomain() !== d.getDomain() && c === e
        },
        _isWhitelisted: function(a) {
            a = a.getPath();
            a.endsWith("/") || (a += "/");
            return b("ZeroRewriteRules").whitelist && b("ZeroRewriteRules").whitelist[a] === 1
        },
        _getRewrittenSubdomain: function(a) {
            a = a.getQualifiedURI().getSubdomain();
            return b("ZeroRewriteRules").rewrite_rules[a]
        },
        _getCurrentURI: function() {
            return new(g || (g = b("URI")))("/").qualify()
        }
    };
    e.exports = h
}), null);
__d("LowerDomainRegex", [], (function(a, b, c, d, e, f) {
    "use strict";
    a = /(^|\.)(facebook|facebookcorewwwi|facebookwkhpilnemxj7asaniu7vnjjbiltxjqhye3mhbshg7kx5tfyd|workplace|bulletin|www.novi)\..*/;
    b = /\.(facebook\.(sg|net)|facebookcorewwwi\.(?:test)?onion|facebookwkhpilnemxj7asaniu7vnjjbiltxjqhye3mhbshg7kx5tfyd\.onion|workplace\.com|novi\.com|bulletin\.com)$/;
    f.domainRegex = a;
    f.hostnameRegex = b
}), 66);
__d("lowerFacebookDomain", ["LowerDomainRegex"], (function(a, b, c, d, e, f, g) {
    b = window.location.hostname.match(d("LowerDomainRegex").hostnameRegex);
    var h = b ? b[1] : "facebook.com";
    a.setDomain = function(a) {
        h = a
    };
    a.isValidDocumentDomain = function() {
        return document.domain == h
    };

    function a() {
        document.domain = h
    }
    c = a;
    g["default"] = c
}), 98);
__d("once", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        var b = g(a);
        for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        return b
    }

    function g(a) {
        var b = a,
            c;
        a = function() {
            if (b) {
                for (var a = arguments.length, d = new Array(a), e = 0; e < a; e++) d[e] = arguments[e];
                c = b.apply(this, d);
                b = null
            }
            return c
        };
        return a
    }
    f["default"] = a
}), 66);
__d("BanzaiAdapter", ["invariant", "Arbiter", "BanzaiConfig", "BanzaiConsts", "BanzaiStorage", "QueryString", "Run", "StaticSiteData", "TimeSlice", "URI", "UserAgent", "ZeroRewrites", "getAsyncParams", "isInIframe", "lowerFacebookDomain", "once"], (function(a, b, c, d, e, f, g, h) {
    var i = [],
        j = new(c("Arbiter"))(),
        k = c("isInIframe")(),
        l = "/ajax/bz",
        m = "POST",
        n = {
            config: c("BanzaiConfig"),
            useBeacon: !0,
            getEndPointUrl: function(a) {
                a = c("getAsyncParams")(m);
                delete a[c("StaticSiteData").csr_key];
                a = c("QueryString").appendToUrl(l, a);
                a.length <= 2e3 || h(0, 21850, a);
                return a
            },
            getStorage: function() {
                return c("BanzaiStorage")
            },
            getTopLevel: function() {
                return k && c("lowerFacebookDomain").isValidDocumentDomain() ? window.top : null
            },
            inform: function(a) {
                j.inform(a)
            },
            subscribe: function(a, b) {
                return j.subscribe(a, b)
            },
            wrapInTimeSlice: function(a, b) {
                return c("TimeSlice").guard(function() {
                    a()
                }, b, {
                    propagationType: c("TimeSlice").PropagationType.ORPHAN
                })
            },
            cleanup: function() {
                var a = i;
                i = [];
                a.forEach(function(a) {
                    a.readyState < 4 && a.abort()
                })
            },
            preferredCompressionMethod: c("once")(function() {
                return "snappy_base64"
            }),
            readyToSend: function() {
                return c("UserAgent").isBrowser("IE <= 8") || navigator.onLine
            },
            send: function(a, b, e, f) {
                var g = n.getEndPointUrl(!1);
                g = d("ZeroRewrites").rewriteURI(new(c("URI"))(g));
                var h = d("ZeroRewrites").getTransportBuilderForURI(g)();
                h.open(m, g.toString(), !0);
                h.onreadystatechange = function() {
                    if (h.readyState >= 4) {
                        var a = i.indexOf(h);
                        a >= 0 && i.splice(a, 1);
                        try {
                            a = h.status
                        } catch (b) {
                            a = 0
                        }
                        a == 200 ? (b && b(), f || n.inform(c("BanzaiConsts").OK)) : (e && e(a), f || n.inform(c("BanzaiConsts").ERROR))
                    }
                };
                i.push(h);
                h.send(a, !1)
            },
            setHooks: function(a) {},
            setUnloadHook: function(a) {
                d("Run").onAfterUnload(a._unload)
            },
            onUnload: function(a) {
                d("Run").onAfterUnload(a)
            },
            isOkToSendViaBeacon: function() {
                return !0
            }
        };
    a = n;
    g["default"] = a
}), 98);
/**
 * License: https://www.facebook.com/legal/license/WRsJ32R7YJG/
 */
__d("SnappyCompress", [], (function(a, b, c, d, e, f) {
    "use strict";

    function g() {
        return typeof process === "object" && (typeof process.versions === "object" && typeof process.versions.node !== "undefined") ? !0 : !1
    }

    function h(a) {
        return a instanceof Uint8Array && (!g() || !Buffer.isBuffer(a))
    }

    function i(a) {
        return a instanceof ArrayBuffer
    }

    function j(a) {
        return !g() ? !1 : Buffer.isBuffer(a)
    }
    var k = "Argument compressed must be type of ArrayBuffer, Buffer, or Uint8Array";

    function a(a) {
        if (!h(a) && !i(a) && !j(a)) throw new TypeError(k);
        var b = !1,
            c = !1;
        h(a) ? b = !0 : i(a) && (c = !0, a = new Uint8Array(a));
        a = new A(a);
        var d = a.readUncompressedLength();
        if (d === -1) throw new Error("Invalid Snappy bitstream");
        if (b) {
            b = new Uint8Array(d);
            if (!a.uncompressToBuffer(b)) throw new Error("Invalid Snappy bitstream")
        } else if (c) {
            b = new ArrayBuffer(d);
            c = new Uint8Array(b);
            if (!a.uncompressToBuffer(c)) throw new Error("Invalid Snappy bitstream")
        } else {
            b = Buffer.alloc(d);
            if (!a.uncompressToBuffer(b)) throw new Error("Invalid Snappy bitstream")
        }
        return b
    }

    function b(a) {
        if (!h(a) && !i(a) && !j(a)) throw new TypeError(k);
        var b = !1,
            c = !1;
        h(a) ? b = !0 : i(a) && (c = !0, a = new Uint8Array(a));
        a = new x(a);
        var d = a.maxCompressedLength(),
            e, f, g;
        b ? (e = new Uint8Array(d), g = a.compressToBuffer(e)) : c ? (e = new ArrayBuffer(d), f = new Uint8Array(e), g = a.compressToBuffer(f)) : (e = Buffer.alloc(d), g = a.compressToBuffer(e));
        if (!e.slice) {
            f = new Uint8Array(Array.prototype.slice.call(e, 0, g));
            if (b) return f;
            else if (c) return f.buffer;
            else throw new Error("not implemented")
        }
        return e.slice(0, g)
    }
    c = 16;
    var l = 1 << c,
        m = 14,
        n = new Array(m + 1);

    function o(a, b) {
        return a * 506832829 >>> b
    }

    function p(a, b) {
        return a[b] + (a[b + 1] << 8) + (a[b + 2] << 16) + (a[b + 3] << 24)
    }

    function q(a, b, c) {
        return a[b] === a[c] && a[b + 1] === a[c + 1] && a[b + 2] === a[c + 2] && a[b + 3] === a[c + 3]
    }

    function r(a, b, c, d, e) {
        var f;
        for (f = 0; f < e; f++) c[d + f] = a[b + f]
    }

    function s(a, b, c, d, e) {
        c <= 60 ? (d[e] = c - 1 << 2, e += 1) : c < 256 ? (d[e] = 60 << 2, d[e + 1] = c - 1, e += 2) : (d[e] = 61 << 2, d[e + 1] = c - 1 & 255, d[e + 2] = c - 1 >>> 8, e += 3);
        r(a, b, d, e, c);
        return e + c
    }

    function t(a, b, c, d) {
        if (d < 12 && c < 2048) {
            a[b] = 1 + (d - 4 << 2) + (c >>> 8 << 5);
            a[b + 1] = c & 255;
            return b + 2
        } else {
            a[b] = 2 + (d - 1 << 2);
            a[b + 1] = c & 255;
            a[b + 2] = c >>> 8;
            return b + 3
        }
    }

    function u(a, b, c, d) {
        while (d >= 68) b = t(a, b, c, 64), d -= 64;
        d > 64 && (b = t(a, b, c, 60), d -= 60);
        return t(a, b, c, d)
    }

    function v(a, b, c, d, e) {
        var f = 1;
        while (1 << f <= c && f <= m) f += 1;
        f -= 1;
        var g = 32 - f;
        typeof n[f] === "undefined" && (n[f] = new Uint16Array(1 << f));
        f = n[f];
        var h;
        for (h = 0; h < f.length; h++) f[h] = 0;
        h = b + c;
        var i = b,
            j = b,
            k, l, r, t, v, w = !0,
            x = 15;
        if (c >= x) {
            c = h - x;
            b += 1;
            x = o(p(a, b), g);
            while (w) {
                t = 32;
                l = b;
                do {
                    b = l;
                    k = x;
                    v = t >>> 5;
                    t += 1;
                    l = b + v;
                    if (b > c) {
                        w = !1;
                        break
                    }
                    x = o(p(a, l), g);
                    r = i + f[k];
                    f[k] = b - i
                } while (!q(a, b, r));
                if (!w) break;
                e = s(a, j, b - j, d, e);
                do {
                    v = b;
                    k = 4;
                    while (b + k < h && a[b + k] === a[r + k]) k += 1;
                    b += k;
                    l = v - r;
                    e = u(d, e, l, k);
                    j = b;
                    if (b >= c) {
                        w = !1;
                        break
                    }
                    t = o(p(a, b - 1), g);
                    f[t] = b - 1 - i;
                    v = o(p(a, b), g);
                    r = i + f[v];
                    f[v] = b - i
                } while (q(a, b, r));
                if (!w) break;
                b += 1;
                x = o(p(a, b), g)
            }
        }
        j < h && (e = s(a, j, h - j, d, e));
        return e
    }

    function w(a, b, c) {
        do b[c] = a & 127, a = a >>> 7, a > 0 && (b[c] += 128), c += 1; while (a > 0);
        return c
    }

    function x(a) {
        this.array = a
    }
    x.prototype.maxCompressedLength = function() {
        var a = this.array.length;
        return 32 + a + Math.floor(a / 6)
    };
    x.prototype.compressToBuffer = function(a) {
        var b = this.array,
            c = b.length,
            d = 0,
            e = 0,
            f;
        e = w(c, a, e);
        while (d < c) f = Math.min(c - d, l), e = v(b, d, f, a, e), d += f;
        return e
    };
    var y = [0, 255, 65535, 16777215, 4294967295];

    function r(a, b, c, d, e) {
        var f;
        for (f = 0; f < e; f++) c[d + f] = a[b + f]
    }

    function z(a, b, c, d) {
        var e;
        for (e = 0; e < d; e++) a[b + e] = a[b - c + e]
    }

    function A(a) {
        this.array = a, this.pos = 0
    }
    A.prototype.readUncompressedLength = function() {
        var a = 0,
            b = 0,
            c, d;
        while (b < 32 && this.pos < this.array.length) {
            c = this.array[this.pos];
            this.pos += 1;
            d = c & 127;
            if (d << b >>> b !== d) return -1;
            a |= d << b;
            if (c < 128) return a;
            b += 7
        }
        return -1
    };
    A.prototype.uncompressToBuffer = function(a) {
        var b = this.array,
            c = b.length,
            d = this.pos,
            e = 0,
            f, g, h, i;
        while (d < b.length) {
            f = b[d];
            d += 1;
            if ((f & 3) === 0) {
                g = (f >>> 2) + 1;
                if (g > 60) {
                    if (d + 3 >= c) return !1;
                    h = g - 60;
                    g = b[d] + (b[d + 1] << 8) + (b[d + 2] << 16) + (b[d + 3] << 24);
                    g = (g & y[h]) + 1;
                    d += h
                }
                if (d + g > c) return !1;
                r(b, d, a, e, g);
                d += g;
                e += g
            } else {
                switch (f & 3) {
                    case 1:
                        g = (f >>> 2 & 7) + 4;
                        i = b[d] + (f >>> 5 << 8);
                        d += 1;
                        break;
                    case 2:
                        if (d + 1 >= c) return !1;
                        g = (f >>> 2) + 1;
                        i = b[d] + (b[d + 1] << 8);
                        d += 2;
                        break;
                    case 3:
                        if (d + 3 >= c) return !1;
                        g = (f >>> 2) + 1;
                        i = b[d] + (b[d + 1] << 8) + (b[d + 2] << 16) + (b[d + 3] << 24);
                        d += 4;
                        break;
                    default:
                        break
                }
                if (i === 0 || i > e) return !1;
                z(a, e, i, g);
                e += g
            }
        }
        return !0
    };
    e.exports.uncompress = a;
    e.exports.compress = b
}), null);
__d("SnappyCompressUtil", ["SnappyCompress"], (function(a, b, c, d, e, f) {
    "use strict";
    var g = {
        compressUint8ArrayToSnappy: function(c) {
            if (c == null) return null;
            var d = null;
            try {
                d = b("SnappyCompress").compress(c)
            } catch (a) {
                return null
            }
            c = "";
            for (var e = 0; e < d.length; e++) c += String.fromCharCode(d[e]);
            return a.btoa(c)
        },
        compressStringToSnappy: function(b) {
            if (a.Uint8Array === void 0 || a.btoa === void 0) return null;
            var c = new a.Uint8Array(b.length);
            for (var d = 0; d < b.length; d++) {
                var e = b.charCodeAt(d);
                if (e > 127) return null;
                c[d] = e
            }
            return g.compressUint8ArrayToSnappy(c)
        },
        compressStringToSnappyBinary: function(c) {
            if (a.Uint8Array === void 0) return null;
            var d = null;
            if (a.TextEncoder !== void 0) d = new TextEncoder().encode(c);
            else {
                d = new a.Uint8Array(c.length);
                for (var e = 0; e < c.length; e++) {
                    var f = c.charCodeAt(e);
                    if (f > 127) return null;
                    d[e] = f
                }
            }
            f = null;
            try {
                f = b("SnappyCompress").compress(d)
            } catch (a) {
                return null
            }
            return f
        }
    };
    e.exports = g
}), null);
__d("BanzaiCompressionUtils", ["FBLogger", "Promise", "SnappyCompressUtil", "once", "performanceNow"], (function(a, b, c, d, e, f) {
    "use strict";
    var g, h = b("once")(function() {
            if (a.CompressionStream == null) return !1;
            if (a.Response == null) return !1;
            try {
                new a.CompressionStream("deflate")
            } catch (a) {
                return !1
            }
            return !0
        }),
        i = {
            compressWad: function(a, c) {
                if (a.needs_compression !== !0) {
                    delete a.needs_compression;
                    return
                }
                if (c === "deflate") {
                    i.compressWad(a, "snappy");
                    return
                }
                var d = (g || (g = b("performanceNow")))(),
                    e = JSON.stringify(a.posts),
                    f;
                switch (c) {
                    case "snappy":
                        f = b("SnappyCompressUtil").compressStringToSnappyBinary(e);
                        break;
                    case "snappy_base64":
                        f = b("SnappyCompressUtil").compressStringToSnappy(e);
                        break;
                    default:
                        break
                }
                f != null && f.length < e.length ? (a.posts = f, a.compression = c, a.snappy_ms = Math.ceil((g || (g = b("performanceNow")))() - d), a.snappy_ms < 0 && b("FBLogger")("BanzaiCompressionUtils").warn("Expected positive snappy_ms but got %s", a.snappy_ms)) : a.compression = "";
                delete a.needs_compression
            },
            compressWadAsync: function(c, d) {
                if (d !== "deflate") {
                    i.compressWad(c, "snappy");
                    return b("Promise").resolve()
                }
                if (!h()) return i.compressWadAsync(c, "snappy");
                var e = (g || (g = b("performanceNow")))(),
                    f = JSON.stringify(c.posts),
                    j = new Response(f).body;
                if (!j) {
                    c.compression = "";
                    delete c.needs_compression;
                    return b("Promise").resolve()
                }
                j = j.pipeThrough(new a.CompressionStream("deflate"));
                return new Response(j).arrayBuffer().then(function(a) {
                    a.byteLength < f.length ? (c.posts = new Uint8Array(a), c.compression = d, c.snappy_ms = Math.ceil((g || (g = b("performanceNow")))() - e), c.snappy_ms < 0 && b("FBLogger")("BanzaiCompressionUtils").warn("Expected positive snappy_ms but got %s", c.snappy_ms)) : c.compression = "", delete c.needs_compression
                })["catch"](function() {
                    c.compression = "", delete c.needs_compression
                })
            },
            outOfBandsPosts: function(a) {
                var b = 0,
                    c = {};
                for (var d = 0; d < a.length; d++) {
                    var e = a[d],
                        f = e.compression === "snappy" || e.compression === "deflate";
                    if (f) {
                        f = new Blob([e.posts], {
                            type: "application/octet-stream"
                        });
                        e.posts = String(b);
                        c["post_" + String(b)] = f;
                        b++
                    }
                }
                return c
            }
        };
    e.exports = i
}), null);
__d("Visibility", ["BaseEventEmitter", "ExecutionEnvironment", "TimeSlice"], (function(a, b, c, d, e, f, g) {
    var h, i;
    c("ExecutionEnvironment").canUseDOM && (document.hidden !== void 0 ? (h = "hidden", i = "visibilitychange") : document.mozHidden !== void 0 ? (h = "mozHidden", i = "mozvisibilitychange") : document.msHidden !== void 0 ? (h = "msHidden", i = "msvisibilitychange") : document.webkitHidden !== void 0 && (h = "webkitHidden", i = "webkitvisibilitychange"));
    a = function(a) {
        babelHelpers.inheritsLoose(b, a);

        function b() {
            var b, c;
            for (var d = arguments.length, e = new Array(d), f = 0; f < d; f++) e[f] = arguments[f];
            return (b = c = a.call.apply(a, [this].concat(e)) || this, c.HIDDEN = "hidden", c.VISIBLE = "visible", c.hiddenKey = h, c.hiddenEvent = i, b) || babelHelpers.assertThisInitialized(c)
        }
        var d = b.prototype;
        d.isHidden = function() {
            return h ? document[h] : !1
        };
        d.isSupported = function() {
            return c("ExecutionEnvironment").canUseDOM && document.addEventListener && i !== void 0
        };
        return b
    }(c("BaseEventEmitter"));
    var j = new a();
    j.isSupported() && document.addEventListener(j.hiddenEvent, c("TimeSlice").guard(function(a) {
        j.emit(j.isHidden() ? j.HIDDEN : j.VISIBLE, {
            changeTime: a.timeStamp
        })
    }, "visibility change"));
    b = j;
    g["default"] = b
}), 98);
__d("BanzaiBase", ["BanzaiAdapter", "BanzaiCompressionUtils", "BanzaiConsts", "BanzaiLazyQueue", "BanzaiUtils", "CurrentUser", "ErrorGuard", "ExecutionEnvironment", "FBLogger", "NavigationMetrics", "SetIdleTimeoutAcrossTransitions", "Visibility", "WebSession", "performanceAbsoluteNow"], (function(a, b, c, d, e, f) {
    var g, h, i, j, k, l = [],
        m = null,
        n = {
            _clearPostBuffer: function() {
                l = []
            },
            _flushLazyQueue: function() {
                b("BanzaiLazyQueue").flushQueue().forEach(function(a) {
                    return n.post.apply(n, a)
                })
            },
            _gatherWadsAndPostsFromBuffer: function(a, c, d, e, f) {
                var g = {
                    currentSize: 0,
                    keepRetryable: d,
                    overlimit: !1,
                    sendMinimumOnePost: f,
                    wadMap: new Map()
                };
                d = e.filter(function(d, e) {
                    return b("BanzaiUtils").filterPost(d, a, c, g)
                });
                g.overlimit && d.length && n._schedule(0);
                return d
            },
            _getEventTime: function() {
                return (g || (g = b("performanceAbsoluteNow")))()
            },
            _getWebSessionId: function() {
                return b("WebSession").getId()
            },
            _getPostBuffer: function() {
                return l
            },
            _getUserId: function() {
                return b("CurrentUser").getPossiblyNonFacebookUserID()
            },
            _getAppId: function() {
                return b("CurrentUser").getAppID()
            },
            _initialize: function() {
                b("ExecutionEnvironment").canUseDOM && (n.adapter.useBeacon && b("Visibility").isSupported() ? (b("Visibility").addListener(b("Visibility").HIDDEN, function() {
                    n._getPostBuffer().length > 0 && (n._tryToSendViaBeacon() || n._store(!1))
                }), n.isEnabled("enable_client_logging_clear_on_visible") && b("Visibility").addListener(b("Visibility").VISIBLE, function() {
                    n._tryToSendViaBeacon() || n._restore(!1)
                })) : n.adapter.setHooks(n), n.adapter.setUnloadHook(n), b("NavigationMetrics").addListener(b("NavigationMetrics").Events.NAVIGATION_DONE, function(a, c) {
                    if (c.pageType !== "normal") return;
                    n._restore(!1);
                    b("NavigationMetrics").removeCurrentListener()
                }))
            },
            _sendBeacon: function(b, c) {
                return a.navigator.sendBeacon(b, c)
            },
            _prepForTransit: function(a) {
                var c = new FormData();
                c.append("ts", String(Date.now()));
                var d = b("BanzaiCompressionUtils").outOfBandsPosts(a);
                Object.keys(d).forEach(function(a) {
                    c.append(a, d[a])
                });
                c.append("q", JSON.stringify(a));
                return c
            },
            _prepWadForTransit: function(a) {
                b("BanzaiCompressionUtils").compressWad(a, b("BanzaiAdapter").preferredCompressionMethod())
            },
            _processCallbacksAndSendViaBeacon: function() {
                var a = [],
                    c = [],
                    d = [];
                n._gatherWadsAndPostsFromBuffer(c, d, !0, a, !1);
                if (c.length > 0) {
                    c[0].send_method = "beacon";
                    c.map(n._prepWadForTransit);
                    d = n._prepForTransit(c);
                    a = b("BanzaiAdapter").getEndPointUrl(!0);
                    c = n._sendBeacon(a, d);
                    c || b("FBLogger")("banzai").warn("Error sending beacon")
                }
            },
            _restore: function(a) {
                a = b("BanzaiAdapter").getStorage();
                var c = function(a) {
                    l.push(a)
                };
                (h || (h = b("ErrorGuard"))).applyWithGuard(a.restore, a, [c]);
                n._schedule(b("BanzaiAdapter").config.RESTORE_WAIT || (i || (i = b("BanzaiConsts"))).VITAL_WAIT)
            },
            _schedule: function(a) {
                var c = n._getEventTime() + a;
                if (!k || c < k) {
                    k = c;
                    b("SetIdleTimeoutAcrossTransitions").clear(j);
                    j = b("SetIdleTimeoutAcrossTransitions").start(b("BanzaiAdapter").wrapInTimeSlice(n._sendWithCallbacks, "Banzai.send"), a);
                    return !0
                }
                return !1
            },
            _sendWithCallbacks: function(a, c) {
                k = null;
                n._schedule(n.BASIC.delay);
                if (!b("BanzaiAdapter").readyToSend()) {
                    c && c();
                    return
                }
                if (n.isEnabled("flush_storage_periodically")) {
                    var d = b("BanzaiAdapter").getStorage(),
                        e = function() {
                            n._restore(!1)
                        };
                    (h || (h = b("ErrorGuard"))).applyWithGuard(d.flush, d, [e])
                }
                b("BanzaiAdapter").inform((i || (i = b("BanzaiConsts"))).SEND);
                d = [];
                var f = [];
                l = n._gatherWadsAndPostsFromBuffer(d, f, !0, l, !0);
                if (d.length <= 0) {
                    b("BanzaiAdapter").inform((i || (i = b("BanzaiConsts"))).OK);
                    a && a();
                    return
                }
                d[0].trigger = m;
                m = null;
                d[0].send_method = "ajax";
                d.map(n._prepWadForTransit);
                b("BanzaiAdapter").send(n._prepForTransit(d), function() {
                    f.forEach(function(a) {
                        a = a;
                        a.__meta.status = (i || (i = b("BanzaiConsts"))).POST_SENT;
                        a.__meta.callback && a.__meta.callback()
                    }), a && a()
                }, function(a) {
                    f.forEach(function(c) {
                        b("BanzaiUtils").retryPost(c, a, l)
                    }), c && c()
                })
            },
            _store: function(a) {
                a = b("BanzaiAdapter").getStorage();
                (h || (h = b("ErrorGuard"))).applyWithGuard(a.store, a, [l])
            },
            _testState: function() {
                return {
                    postBuffer: l,
                    triggerRoute: m
                }
            },
            _tryToSendViaBeacon: function() {
                if (!(navigator && navigator.sendBeacon && b("BanzaiAdapter").isOkToSendViaBeacon())) return !1;
                var a = [],
                    c = [];
                l = n._gatherWadsAndPostsFromBuffer(a, c, !1, l, !1);
                if (a.length <= 0) return !1;
                a[0].send_method = "beacon";
                a.map(n._prepWadForTransit);
                a = n._prepForTransit(a);
                var d = b("BanzaiAdapter").getEndPointUrl(!0);
                d = n._sendBeacon(d, a);
                if (!d) {
                    c.forEach(function(a) {
                        l.push(a)
                    });
                    return !1
                }
                return !0
            },
            _unload: function() {
                if (b("BanzaiAdapter").config.disabled) return;
                n._flushLazyQueue();
                navigator && navigator.sendBeacon && b("BanzaiAdapter").isOkToSendViaBeacon() && n._processCallbacksAndSendViaBeacon();
                b("BanzaiAdapter").cleanup();
                b("BanzaiAdapter").inform((i || (i = b("BanzaiConsts"))).SHUTDOWN);
                l.length > 0 && ((!n.adapter.useBeacon || !n._tryToSendViaBeacon()) && n._store(!1))
            },
            BASIC: {
                delay: b("BanzaiAdapter").config.MAX_WAIT || (i || (i = b("BanzaiConsts"))).BASIC_WAIT
            },
            BASIC_WAIT: (i || (i = b("BanzaiConsts"))).BASIC_WAIT,
            ERROR: i.ERROR,
            OK: i.OK,
            SEND: i.SEND,
            SHUTDOWN: i.SHUTDOWN,
            VITAL: {
                delay: b("BanzaiAdapter").config.MIN_WAIT || (i || (i = b("BanzaiConsts"))).VITAL_WAIT
            },
            VITAL_WAIT: i.VITAL_WAIT,
            adapter: b("BanzaiAdapter"),
            canUseNavigatorBeacon: function() {
                return Boolean(navigator && navigator.sendBeacon && b("BanzaiAdapter").isOkToSendViaBeacon())
            },
            flush: function(a, c) {
                b("SetIdleTimeoutAcrossTransitions").clear(j), n._sendWithCallbacks(a, c)
            },
            isEnabled: function(a) {
                return Boolean(b("BanzaiAdapter").config.gks && b("BanzaiAdapter").config.gks[a] && !b("BanzaiAdapter").config.disabled)
            },
            post: function(a, c, d) {
                a || b("FBLogger")("banzai").mustfix("Banzai.post called without specifying a route");
                n._flushLazyQueue();
                var e = a.split(":");
                if ((b("BanzaiAdapter").config.known_routes || []).indexOf(e[0]) === -1) {
                    b("BanzaiAdapter").config.should_log_unknown_routes === !0 && b("FBLogger")("banzai").blameToPreviousFrame().mustfix("Attempted to post to invalid Banzai route '" + a + "'. This call site should be cleaned up.");
                    if (b("BanzaiAdapter").config.should_drop_unknown_routes === !0) return
                }
                var f = "";
                try {
                    var g;
                    f = (g = JSON.stringify(c)) != null ? g : ""
                } catch (c) {
                    b("FBLogger")("banzai").catching(c).addToCategoryKey(a).mustfix("Could not JSON.stringify banzai data for route %s", a);
                    return
                }
                var h = d == null ? void 0 : d.retry;
                if (b("BanzaiAdapter").config.disabled) return;
                if (!b("ExecutionEnvironment").canUseDOM && !b("ExecutionEnvironment").isInWorker) return;
                var j = n.adapter.getTopLevel();
                if (j) {
                    var k;
                    try {
                        k = j.require("Banzai")
                    } catch (a) {
                        k = null
                    }
                    if (k) {
                        k.post.apply(k, arguments);
                        return
                    }
                }
                var o = b("BanzaiAdapter").config.blacklist;
                if (o && (o.indexOf && (typeof o.indexOf == "function" && o.indexOf(a) != -1))) return;
                var p = f.length,
                    q = b("BanzaiUtils").wrapData(a, c, n._getEventTime(), h, p),
                    r = q;
                (d == null ? void 0 : d.callback) && (r.__meta.callback = d == null ? void 0 : d.callback);
                (d == null ? void 0 : d.compress) != null && (r.__meta.compress = d == null ? void 0 : d.compress);
                var s = d == null ? void 0 : d.delay;
                s == null && (s = (i || (i = b("BanzaiConsts"))).BASIC_WAIT);
                if (d == null ? void 0 : d.signal) {
                    r.__meta.status = (i || (i = b("BanzaiConsts"))).POST_INFLIGHT;
                    var t = [{
                        user: n._getUserId(),
                        webSessionId: n._getWebSessionId(),
                        app_id: n._getAppId(),
                        posts: [q],
                        trigger: a
                    }];
                    b("BanzaiAdapter").send(n._prepForTransit(t), function() {
                        r.__meta.status = (i || (i = b("BanzaiConsts"))).POST_SENT, r.__meta.callback && r.__meta.callback()
                    }, function(a) {
                        b("BanzaiUtils").retryPost(q, a, l)
                    }, !0);
                    if (!h) return
                }
                l.push(q);
                (n._schedule(s) || !m) && (m = a)
            },
            subscribe: b("BanzaiAdapter").subscribe
        };
    n._initialize();
    e.exports = n
}), null);
__d("ErrorSetup", ["fb-error"], (function(a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = c("fb-error").ErrorSetup
}), 98);
__d("JavascriptWebErrorFalcoEvent", ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1828905");
    b = d("FalcoLoggerInternal").create("javascript_web_error", a);
    e = b;
    g["default"] = e
}), 98);
__d("ErrorTransport", ["JavascriptWebErrorFalcoEvent"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a) {
        c("JavascriptWebErrorFalcoEvent").log(function() {
            return a
        })
    }
    g.log = a
}), 98);
__d("SubscriptionList", ["recoverableViolation"], (function(a, b, c, d, e, f, g) {
    a = function() {
        function a(a, b) {
            this.$1 = [], this.$2 = a, this.$3 = b
        }
        var b = a.prototype;
        b.add = function(a) {
            var b = this,
                d = {
                    callback: a
                };
            this.$1.push(d);
            this.$2 && this.$1.length === 1 && this.$2();
            return {
                remove: function() {
                    var a = b.$1.indexOf(d);
                    if (a === -1) {
                        c("recoverableViolation")("SubscriptionList: Callback already removed.", "SubscriptionList");
                        return
                    }
                    b.$1.splice(a, 1);
                    b.$3 && b.$1.length === 0 && b.$3()
                }
            }
        };
        b.getCallbacks = function() {
            return this.$1.map(function(a) {
                return a.callback
            })
        };
        b.fireCallbacks = function(a) {
            this.getCallbacks().forEach(function(b) {
                b(a)
            })
        };
        return a
    }();
    g["default"] = a
}), 98);
__d("ScriptPath", ["ErrorGuard", "SubscriptionList", "TimeSlice", "WebStorage", "isInIframe"], (function(a, b, c, d, e, f) {
    "use strict";
    var g, h, i = "sp_pi",
        j = 1e3 * 30,
        k = null,
        l = null,
        m = new(b("SubscriptionList"))(),
        n = null,
        o = [],
        p = b("TimeSlice").guard(function(a, c) {
            m.getCallbacks().forEach(function(d) {
                (g || (g = b("ErrorGuard"))).applyWithGuard(function() {
                    d({
                        source: k,
                        dest: l,
                        cause: a,
                        extraData: c
                    })
                }, null, [])
            })
        }, "ScriptPath Notifying callbacks", {
            propagationType: b("TimeSlice").PropagationType.ORPHAN
        });

    function q() {
        return l ? l.scriptPath : void 0
    }

    function r() {
        var a = (h || (h = b("WebStorage"))).getSessionStorage();
        if (!a || b("isInIframe")()) return;
        h.setItemGuarded(a, i, JSON.stringify({
            pageInfo: l,
            clickPoint: n,
            time: Date.now()
        }))
    }

    function a() {
        var a = (h || (h = b("WebStorage"))).getSessionStorageForRead();
        if (!a) return;
        var c = a.getItem(i);
        if (c) {
            c = JSON.parse(c);
            c && (c.time < Date.now() - j && (a = (h || (h = b("WebStorage"))).getSessionStorage(), a && a.removeItem(i)), l = c.pageInfo, n = c.clickPoint, l && (l.restored = !0))
        }
    }
    a();
    c = {
        set: function(a, b, c) {
            k = l, l = {
                scriptPath: a,
                categoryToken: b,
                extraData: c || {}
            }, o = [], window._script_path = a, p()
        },
        openOverlayView: function(a, b, c) {
            if (!a) return;
            var d = o.length;
            (d === 0 || o[d - 1] !== a) && (k = babelHelpers["extends"]({}, l), l && (l.topViewEndpoint = a), c && c.replaceTopOverlay && d > 0 ? (o[d - 1] = a, p("replace_overlay_view", b)) : (o.push(a), p("open_overlay_view", b)))
        },
        closeOverlayView: function(a, b) {
            a = o.lastIndexOf(a);
            if (a === -1) return;
            k = babelHelpers["extends"]({}, l);
            l && (a > 0 ? l.topViewEndpoint = o[a - 1] : l.topViewEndpoint = null);
            o = o.slice(0, a);
            p("close_overlay_view", b)
        },
        setClickPointInfo: function(a) {
            n = a, r()
        },
        getClickPointInfo: function() {
            return n
        },
        getScriptPath: q,
        getCategoryToken: function() {
            return l ? l.categoryToken : void 0
        },
        getEarlyFlushPage: function() {
            var a;
            return (a = l) == null ? void 0 : (a = a.extraData) == null ? void 0 : a.ef_page
        },
        getTopViewEndpoint: function() {
            var a = o.length;
            return a > 0 ? o[a - 1] : q()
        },
        getPageInfo: function() {
            return l
        },
        getSourcePageInfo: function() {
            return k
        },
        subscribe: function(a) {
            return m.add(b("TimeSlice").guard(a, "ScriptPath.subscribe"))
        },
        shutdown: function() {
            r()
        }
    };
    e.exports = c
}), null);
__d("ErrorLogging", ["ClientConsistency", "Env", "ErrorGuard", "ErrorSetup", "ErrorTransport", "JSErrorLoggingConfig", "ScriptPath", "SiteData", "WebSession", "setTimeout"], (function(a, b, c, d, e, f, g) {
    "use strict";
    c("ErrorGuard").skipGuardGlobal(c("Env").nocatch), d("JSErrorLoggingConfig").sampleWeight != null && c("setTimeout")(function() {
        c("ErrorSetup").setup({
            additional_client_revisions: c("ClientConsistency").getAdditionalRevisions(),
            appId: d("JSErrorLoggingConfig").appId,
            client_revision: c("SiteData").client_revision,
            extra: d("JSErrorLoggingConfig").extra,
            loggingFramework: c("SiteData").haste_site === "mobile" ? "mobile" : "blue",
            server_revision: c("SiteData").server_revision,
            spin: c("SiteData").spin,
            projectBlocklist: d("JSErrorLoggingConfig").projectBlocklist,
            push_phase: c("SiteData").push_phase,
            report_source: d("JSErrorLoggingConfig").report_source,
            report_source_ref: d("JSErrorLoggingConfig").report_source_ref,
            sample_weight: d("JSErrorLoggingConfig").sampleWeight,
            script_path: c("ScriptPath").getScriptPath(),
            web_session_id: d("WebSession").getId()
        }, d("ErrorTransport").log)
    }, 0), c("ErrorSetup").preSetup()
}), 34);
__d("ErrorGuardState", ["fb-error"], (function(a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = c("fb-error").ErrorGuardState
}), 98);
__d("ErrorNormalizeUtils", ["fb-error"], (function(a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = c("fb-error").ErrorNormalizeUtils
}), 98);
__d("ErrorSerializer", ["fb-error"], (function(a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = c("fb-error").ErrorSerializer
}), 98);
__d("ErrorUtils", ["ErrorGuard", "ErrorGuardState", "ErrorNormalizeUtils", "ErrorPubSub", "ErrorSerializer", "getErrorSafe"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h, i, j;
    h || b("ErrorGuardState");
    b("ErrorNormalizeUtils");
    i || (i = b("ErrorPubSub"));
    b("getErrorSafe");
    j || (j = b("ErrorGuard"));
    b("ErrorSerializer");
    a.getErrorSafe = c("getErrorSafe");
    a.ErrorGuard = c("ErrorGuard");
    a.ErrorSerializer = c("ErrorSerializer");
    d = {
        history: c("ErrorPubSub").history,
        applyWithGuard: function(a, b, d, e, f, g) {
            return c("ErrorGuard").applyWithGuard(a, b, (a = d) != null ? a : [], {
                name: f,
                onNormalizedError: e,
                deferredSource: g == null ? void 0 : g.deferredSource
            })
        },
        guard: function(a, b, d) {
            a = c("ErrorGuard").guard(a, b != null ? {
                name: b
            } : null);
            d != null && (a = a.bind(d));
            return a
        },
        normalizeError: function(a) {
            var b;
            return (b = c("ErrorNormalizeUtils").ifNormalizedError(a)) != null ? b : c("ErrorNormalizeUtils").normalizeError(c("getErrorSafe")(a))
        }
    };
    a.ErrorUtils = d;
    e = d;
    typeof __t === "function" && __t.setHandler && __t.setHandler(c("ErrorPubSub").reportError);
    g["default"] = e
}), 99);
__d("EventProfilerAdsSessionProvider", ["AdsInterfacesSessionConfig"], (function(a, b, c, d, e, f, g) {
    "use strict";
    g.sessionID = c("AdsInterfacesSessionConfig").sessionID
}), 98);
__d("EventProfilerSampler", ["EventConfig"], (function(a, b, c, d, e, f) {
    "use strict";
    var g = b("EventConfig").sampling || {},
        h = {
            canSample: function(a) {
                return !!g[a]
            },
            getEventSampleWeights: function(a) {
                a.__samplingWeights == null && (a.__samplingWeights = {
                    event: i(h.getEventWeight(a))
                });
                return a.__samplingWeights
            },
            getEventWeight: function(a) {
                a = a.type in g ? g[a.type] : 1;
                return a * g.__eventDefault
            },
            getEventInteractionIDs: function(a, b) {
                return []
            }
        };

    function i(a) {
        if (a === 0) return 0;
        var b = g.__min || 1;
        a = Math.round(Math.max(b, a));
        return Math.random() * a < 1 ? a : 0
    }
    e.exports = h
}), null);
__d("getParentClassesForEventProfiler", ["cx"], (function(a, b, c, d, e, f, g, h) {
    "use strict";

    function i(a) {
        if (!a || !(a instanceof HTMLElement)) return "";
        var b = a.id,
            c = a.nodeName,
            d = a.getAttribute("class");
        c = c ? c.replace(/^#/, "") : "unknown";
        b = b ? "#" + b : "";
        d = d ? " " + d.replace(/\s+/g, " ").trim() : "";
        if (a.getAttribute("rel") === "theater") {
            a = "_342u";
            d = d.length ? d + " " + a : a
        }
        return ":" + c + b + d
    }

    function a(a) {
        var b = [];
        while (a && a instanceof HTMLElement) b.push(i(a)), a = a.parentElement;
        b.reverse();
        return b
    }
    g["default"] = a
}), 98);
__d("EventProfilerImpl", ["Bootloader", "EventProfilerAdsSessionProvider", "EventProfilerSampler", "ScriptPath", "TimeSlice", "UserAgent", "getParentClassesForEventProfiler", "performanceAbsoluteNow", "requestAnimationFrameAcrossTransitions", "setTimeoutAcrossTransitions", "uniqueID"], (function(a, b, c, d, e, f) {
    var g, h = {},
        i = {},
        j = {},
        k = !1,
        l = 0,
        m = new Set(["click", "keydown", "mousewheel", "scroll"]),
        n = null,
        o = null;
    c = {
        __wrapEventListenHandler: function(a) {
            return function(c, d) {
                var e = this;
                if (!b("EventProfilerSampler").canSample(c)) return a.call(this, c, d);
                var f = {
                        event: 0
                    },
                    s = (g || (g = b("performanceAbsoluteNow")))();
                d.id = d.id || b("uniqueID")();
                var t = d.id,
                    u, v = j[t],
                    w = null;
                i[t] === void 0 && !v ? (w = b("getParentClassesForEventProfiler")(d.target), f = r(d), o != null && o.beforeHandlers(t, c), u = a.call(this, c, d), j[t] = b("TimeSlice").getGuardedContinuation("Event Bubble Continuation")) : (f = r(d), u = v(function() {
                    j[t] = b("TimeSlice").getGuardedContinuation("Event Bubble Continuation");
                    return a.call(e, c, d)
                }));
                v = g();
                if (i[t] === void 0) {
                    w = w;
                    var x = q(d);
                    x = x || s;
                    var y = Math.max(s - x, 0),
                        z = null;
                    b("UserAgent").isBrowser("Chrome") && (z = !!d.cancelable);
                    var A = z && (!!d.deliberateSync || b("UserAgent").isBrowser("Chrome < 51"));
                    i[t] = {
                        event_name: c,
                        event_start_ms: Math.round(x),
                        main_thread_wait_ms: Math.round(y),
                        event_handlers_runtime_ms: 0,
                        script_path: b("ScriptPath").getScriptPath() || "<unknown>",
                        request_animation_frame_wait_ms: 0,
                        set_timeout_wait_ms: 0
                    };
                    h[t] = {
                        event_target_raw: w,
                        weight: f.event,
                        cancelable: !!z,
                        deliberate_sync: !!A,
                        ad_account_id: n,
                        event_end_ms: 0
                    };
                    y = b("EventProfilerAdsSessionProvider").sessionID;
                    y && (h[t].ads_session_id = y);
                    var B = !1;
                    m.has(c) && (!k && l < x && (k = !0, B = !0), h[t].is_first_in_frame = B, h[t].is_first_overlapping = B);
                    b("requestAnimationFrameAcrossTransitions")(function() {
                        var a = (g || (g = b("performanceAbsoluteNow")))();
                        i[t].request_animation_frame_wait_ms = Math.round(a - h[t].event_end_ms);
                        delete h[t].event_end_ms;
                        var d = !1;

                        function e() {
                            if (d) return;
                            d = !0;
                            var e = (g || (g = b("performanceAbsoluteNow")))();
                            i[t].set_timeout_wait_ms = Math.round(e - a);
                            p(t, s, e);
                            m.has(c) && B && (k = !1, l = e);
                            e = j[t];
                            e && delete j[t];
                            delete i[t];
                            delete h[t]
                        }
                        b("requestAnimationFrameAcrossTransitions")(e);
                        b("setTimeoutAcrossTransitions")(e, 0)
                    })
                }
                i[t].event_handlers_runtime_ms += v - s;
                h[t].event_end_ms = v;
                o != null && o.afterEachHandler(t, i[t]);
                return u
            }
        },
        setCurrentAdAccountId: function(a) {
            n = a
        },
        setAdsConfig: function(a) {
            o = a
        }
    };

    function p(a, c, d) {
        c = i[a];
        c.event_handlers_runtime_ms = Math.round(c.event_handlers_runtime_ms);
        var e = babelHelpers["extends"]({}, i[a], h[a]);
        o != null && o.beforeLog(a, e);
        e.weight && b("Bootloader").loadModules(["WebSpeedInteractionsTypedLogger", "PerfXSharedFields"], function(a, b) {
            b.addCommonValues(e), new a().updateData(e).log()
        }, "EventProfilerImpl")
    }
    var q = function() {
        function b(a) {
            return null
        }
        if (!a.performance || !a.performance.now || !a.performance.timing || !a.performance.timing.navigationStart) return b;
        var c = a.performance.timing.navigationStart,
            d = a.CustomEvent && (typeof a.CustomEvent === "function" || a.CustomEvent.toString().indexOf("CustomEventConstructor") > -1);
        d = d ? new a.CustomEvent("test").timeStamp : a.document.createEvent("KeyboardEvent").timeStamp;
        return d && d <= a.performance.now() ? function(a) {
            return a.timeStamp + c
        } : b
    }();

    function r(a) {
        return o != null ? o.getEventSampleWeights(a) : b("EventProfilerSampler").getEventSampleWeights(a)
    }
    e.exports = c
}), null);
__d("Base64", [], (function(a, b, c, d, e, f) {
    var g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    function h(a) {
        a = a.charCodeAt(0) << 16 | a.charCodeAt(1) << 8 | a.charCodeAt(2);
        return String.fromCharCode(g.charCodeAt(a >>> 18), g.charCodeAt(a >>> 12 & 63), g.charCodeAt(a >>> 6 & 63), g.charCodeAt(a & 63))
    }
    var i = ">___?456789:;<=_______\0\x01\x02\x03\x04\x05\x06\x07\b\t\n\v\f\r\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19______\x1a\x1b\x1c\x1d\x1e\x1f !\"#$%&'()*+,-./0123";

    function j(a) {
        a = i.charCodeAt(a.charCodeAt(0) - 43) << 18 | i.charCodeAt(a.charCodeAt(1) - 43) << 12 | i.charCodeAt(a.charCodeAt(2) - 43) << 6 | i.charCodeAt(a.charCodeAt(3) - 43);
        return String.fromCharCode(a >>> 16, a >>> 8 & 255, a & 255)
    }
    var k = {
        encode: function(a) {
            a = unescape(encodeURI(a));
            var b = (a.length + 2) % 3;
            a = (a + "\0\0".slice(b)).replace(/[\s\S]{3}/g, h);
            return a.slice(0, a.length + b - 2) + "==".slice(b)
        },
        decode: function(a) {
            a = a.replace(/[^A-Za-z0-9+\/]/g, "");
            var b = a.length + 3 & 3;
            a = (a + "AAA".slice(b)).replace(/..../g, j);
            a = a.slice(0, a.length + b - 3);
            try {
                return decodeURIComponent(escape(a))
            } catch (a) {
                throw new Error("Not valid UTF-8")
            }
        },
        encodeObject: function(a) {
            return k.encode(JSON.stringify(a))
        },
        decodeObject: function(a) {
            return JSON.parse(k.decode(a))
        },
        encodeNums: function(a) {
            return String.fromCharCode.apply(String, a.map(function(a) {
                return g.charCodeAt((a | -(a > 63 ? 1 : 0)) & -(a > 0 ? 1 : 0) & 63)
            }))
        }
    };
    a = k;
    f["default"] = a
}), 66);
__d("AsyncDOM", ["CSS", "DOM", "FBLogger"], (function(a, b, c, d, e, f) {
    a = {
        invoke: function(a, c) {
            for (var d = 0; d < a.length; ++d) {
                var e = a[d],
                    f = e[0],
                    g = e[1],
                    h = e[2];
                e = e[3];
                h = h && c || null;
                g && (h = b("DOM").scry(h || document.documentElement, g)[0]);
                h || b("FBLogger")("async_dom").warn("Could not find relativeTo element for %s AsyncDOM operation based on selector: %s", f, g);
                switch (f) {
                    case "hide":
                        b("CSS").hide(h);
                        break;
                    case "show":
                        b("CSS").show(h);
                        break;
                    case "setContent":
                        b("DOM").setContent(h, e);
                        break;
                    case "appendContent":
                        b("DOM").appendContent(h, e);
                        break;
                    case "prependContent":
                        b("DOM").prependContent(h, e);
                        break;
                    case "insertAfter":
                        b("DOM").insertAfter(h, e);
                        break;
                    case "insertBefore":
                        b("DOM").insertBefore(h, e);
                        break;
                    case "remove":
                        b("DOM").remove(h);
                        break;
                    case "replace":
                        b("DOM").replace(h, e);
                        break;
                    default:
                        b("FBLogger")("async_dom").warn("Received invalid command %s for AsyncDOM operation", f)
                }
            }
        }
    };
    e.exports = a
}), null);
__d("AsyncResponse", ["invariant", "Bootloader", "FBLogger", "HTML"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    a = function() {
        function a(a, b) {
            this.error = 0, this.errorSummary = null, this.errorDescription = null, this.onload = null, this.replay = !1, this.payload = b, this.request = a, this.silentError = !1, this.transientError = !1, this.blockedAction = !1, this.is_last = !0, this.responseHeaders = null
        }
        var b = a.prototype;
        b.getRequest = function() {
            return this.request
        };
        b.getPayload = function() {
            return this.payload
        };
        b.toError = function() {
            this.error !== 0 || h(0, 5599);
            var a = this.errorSummary || "",
                b = this.getErrorDescriptionString() || "",
                c = new Error(a.toString() + ": " + b);
            Object.assign(c, {
                code: this.error,
                description: this.errorDescription || "",
                descriptionString: b,
                response: this,
                summary: a,
                isSilent: this.silentError,
                isTransient: this.transientError
            });
            return c
        };
        b.getError = function() {
            return this.error
        };
        b.getErrorSummary = function() {
            return this.errorSummary
        };
        b.setErrorSummary = function(a) {
            a = a === void 0 ? null : a;
            this.errorSummary = a;
            return this
        };
        b.getErrorDescription = function() {
            return this.errorDescription
        };
        b.getErrorDescriptionString = function() {
            var a = this.getErrorDescription();
            if (a == null) return null;
            if (c("HTML").isHTML(a)) {
                var b = new(c("HTML"))(a);
                return b.getRootNode().textContent
            }
            return a.toString()
        };
        b.getErrorIsWarning = function() {
            return !!this.errorIsWarning
        };
        b.isSilent = function() {
            return !!this.silentError
        };
        b.isTransient = function() {
            return !!this.transientError
        };
        b.isBlockedAction = function() {
            return !!this.blockedAction
        };
        b.getResponseHeader = function(a) {
            var b = this.responseHeaders;
            if (!b) return null;
            b = b.replace(/^\n/, "");
            a = a.toLowerCase();
            b = b.split("\r\n");
            for (var c = 0; c < b.length; ++c) {
                var d = b[c],
                    e = d.indexOf(": ");
                if (e <= 0) continue;
                var f = d.substring(0, e).toLowerCase();
                if (f === a) return d.substring(e + 2)
            }
            return null
        };
        a.defaultErrorHandler = function(b) {
            try {
                !b.silentError ? a.verboseErrorHandler(b) : c("FBLogger")("async_response").catching(b.toError()).warn("default error handler called")
            } catch (a) {
                alert(b)
            }
        };
        a.verboseErrorHandler = function(a, b) {
            c("Bootloader").loadModules(["ExceptionDialog"], function(c) {
                return c.showAsyncError(a, b)
            }, "AsyncResponse")
        };
        return a
    }();
    g["default"] = a
}), 98);
__d("Deferred", ["Promise"], (function(a, b, c, d, e, f) {
    "use strict";
    b("Promise").resolve();
    a = function() {
        function a(a) {
            var c = this;
            a = a || b("Promise");
            this.$1 = !1;
            this.$2 = new a(function(a, b) {
                c.$3 = a, c.$4 = b
            })
        }
        var c = a.prototype;
        c.getPromise = function() {
            return this.$2
        };
        c.resolve = function(a) {
            this.$1 = !0, this.$3(a)
        };
        c.reject = function(a) {
            this.$1 = !0, this.$4(a)
        };
        c.isSettled = function() {
            return this.$1
        };
        return a
    }();
    f["default"] = a
}), 66);
__d("FetchStreamConfig", [], (function(a, b, c, d, e, f) {
    a = Object.freeze({
        delim: "/*<!-- fetch-stream -->*/"
    });
    f["default"] = a
}), 66);
__d("asyncToGeneratorRuntime", ["Promise"], (function(a, b, c, d, e, f) {
    "use strict";

    function g(a, c, d, e, f, g, h) {
        try {
            var i = a[g](h),
                j = i.value
        } catch (a) {
            d(a);
            return
        }
        i.done ? c(j) : b("Promise").resolve(j).then(e, f)
    }

    function a(a) {
        return function() {
            var c = this,
                d = arguments;
            return new(b("Promise"))(function(b, e) {
                var f = a.apply(c, d);

                function h(a) {
                    g(f, b, e, h, i, "next", a)
                }

                function i(a) {
                    g(f, b, e, h, i, "throw", a)
                }
                h(void 0)
            })
        }
    }
    f.asyncToGenerator = a
}), 66);
__d("regeneratorRuntime", ["Promise"], (function(a, b, c, d, e, f) {
    "use strict";
    var g = Object.prototype.hasOwnProperty,
        h = typeof Symbol === "function" && (typeof Symbol === "function" ? Symbol.iterator : "@@iterator") || "@@iterator",
        i = e.exports;

    function j(a, b, c, d) {
        b = Object.create((b || q).prototype);
        d = new z(d || []);
        b._invoke = w(a, c, d);
        return b
    }
    i.wrap = j;

    function k(a, b, c) {
        try {
            return {
                type: "normal",
                arg: a.call(b, c)
            }
        } catch (a) {
            return {
                type: "throw",
                arg: a
            }
        }
    }
    var l = "suspendedStart",
        m = "suspendedYield",
        n = "executing",
        o = "completed",
        p = {};

    function q() {}

    function r() {}

    function s() {}
    var t = s.prototype = q.prototype;
    r.prototype = t.constructor = s;
    s.constructor = r;
    r.displayName = "GeneratorFunction";

    function a(a) {
        ["next", "throw", "return"].forEach(function(b) {
            a[b] = function(a) {
                return this._invoke(b, a)
            }
        })
    }
    i.isGeneratorFunction = function(a) {
        a = typeof a === "function" && a.constructor;
        return a ? a === r || (a.displayName || a.name) === "GeneratorFunction" : !1
    };
    i.mark = function(a) {
        Object.setPrototypeOf ? Object.setPrototypeOf(a, s) : Object.assign(a, s);
        a.prototype = Object.create(t);
        return a
    };
    i.awrap = function(a) {
        return new u(a)
    };

    function u(a) {
        this.arg = a
    }

    function v(a) {
        function c(c, f) {
            var g = a[c](f);
            c = g.value;
            return c instanceof u ? b("Promise").resolve(c.arg).then(d, e) : b("Promise").resolve(c).then(function(a) {
                g.value = a;
                return g
            })
        }
        typeof process === "object" && process.domain && (c = process.domain.bind(c));
        var d = c.bind(a, "next"),
            e = c.bind(a, "throw");
        c.bind(a, "return");
        var f;

        function g(a, d) {
            var e = f ? f.then(function() {
                return c(a, d)
            }) : new(b("Promise"))(function(b) {
                b(c(a, d))
            });
            f = e["catch"](function(a) {});
            return e
        }
        this._invoke = g
    }
    a(v.prototype);
    i.async = function(a, b, c, d) {
        var e = new v(j(a, b, c, d));
        return i.isGeneratorFunction(b) ? e : e.next().then(function(a) {
            return a.done ? a.value : e.next()
        })
    };

    function w(a, b, c) {
        var d = l;
        return function(e, f) {
            if (d === n) throw new Error("Generator is already running");
            if (d === o) {
                if (e === "throw") throw f;
                return B()
            }
            while (!0) {
                var g = c.delegate;
                if (g) {
                    if (e === "return" || e === "throw" && g.iterator[e] === void 0) {
                        c.delegate = null;
                        var h = g.iterator["return"];
                        if (h) {
                            h = k(h, g.iterator, f);
                            if (h.type === "throw") {
                                e = "throw";
                                f = h.arg;
                                continue
                            }
                        }
                        if (e === "return") continue
                    }
                    h = k(g.iterator[e], g.iterator, f);
                    if (h.type === "throw") {
                        c.delegate = null;
                        e = "throw";
                        f = h.arg;
                        continue
                    }
                    e = "next";
                    f = void 0;
                    var i = h.arg;
                    if (i.done) c[g.resultName] = i.value, c.next = g.nextLoc;
                    else {
                        d = m;
                        return i
                    }
                    c.delegate = null
                }
                if (e === "next") d === m ? c.sent = f : c.sent = void 0;
                else if (e === "throw") {
                    if (d === l) {
                        d = o;
                        throw f
                    }
                    c.dispatchException(f) && (e = "next", f = void 0)
                } else e === "return" && c.abrupt("return", f);
                d = n;
                h = k(a, b, c);
                if (h.type === "normal") {
                    d = c.done ? o : m;
                    var i = {
                        value: h.arg,
                        done: c.done
                    };
                    if (h.arg === p) c.delegate && e === "next" && (f = void 0);
                    else return i
                } else h.type === "throw" && (d = o, e = "throw", f = h.arg)
            }
        }
    }
    a(t);
    t[h] = function() {
        return this
    };
    t.toString = function() {
        return "[object Generator]"
    };

    function x(a) {
        var b = {
            tryLoc: a[0]
        };
        1 in a && (b.catchLoc = a[1]);
        2 in a && (b.finallyLoc = a[2], b.afterLoc = a[3]);
        this.tryEntries.push(b)
    }

    function y(a) {
        var b = a.completion || {};
        b.type = "normal";
        delete b.arg;
        a.completion = b
    }

    function z(a) {
        this.tryEntries = [{
            tryLoc: "root"
        }], a.forEach(x, this), this.reset(!0)
    }
    i.keys = function(a) {
        var b = [];
        for (var c in a) b.push(c);
        b.reverse();
        return function c() {
            while (b.length) {
                var d = b.pop();
                if (d in a) {
                    c.value = d;
                    c.done = !1;
                    return c
                }
            }
            c.done = !0;
            return c
        }
    };

    function A(a) {
        if (a) {
            var b = a[h];
            if (b) return b.call(a);
            if (typeof a.next === "function") return a;
            if (!isNaN(a.length)) {
                var c = -1;
                b = function b() {
                    while (++c < a.length)
                        if (g.call(a, c)) {
                            b.value = a[c];
                            b.done = !1;
                            return b
                        }
                    b.value = void 0;
                    b.done = !0;
                    return b
                };
                return b.next = b
            }
        }
        return {
            next: B
        }
    }
    i.values = A;

    function B() {
        return {
            value: void 0,
            done: !0
        }
    }
    z.prototype = {
        constructor: z,
        reset: function(a) {
            this.prev = 0;
            this.next = 0;
            this.sent = void 0;
            this.done = !1;
            this.delegate = null;
            this.tryEntries.forEach(y);
            if (!a)
                for (a in this) a.charAt(0) === "t" && g.call(this, a) && !isNaN(+a.slice(1)) && (this[a] = void 0)
        },
        stop: function() {
            this.done = !0;
            var a = this.tryEntries[0];
            a = a.completion;
            if (a.type === "throw") throw a.arg;
            return this.rval
        },
        dispatchException: function(a) {
            if (this.done) throw a;
            var b = this;

            function c(c, d) {
                f.type = "throw";
                f.arg = a;
                b.next = c;
                return !!d
            }
            for (var d = this.tryEntries.length - 1; d >= 0; --d) {
                var e = this.tryEntries[d],
                    f = e.completion;
                if (e.tryLoc === "root") return c("end");
                if (e.tryLoc <= this.prev) {
                    var h = g.call(e, "catchLoc"),
                        i = g.call(e, "finallyLoc");
                    if (h && i) {
                        if (this.prev < e.catchLoc) return c(e.catchLoc, !0);
                        else if (this.prev < e.finallyLoc) return c(e.finallyLoc)
                    } else if (h) {
                        if (this.prev < e.catchLoc) return c(e.catchLoc, !0)
                    } else if (i) {
                        if (this.prev < e.finallyLoc) return c(e.finallyLoc)
                    } else throw new Error("try statement without catch or finally")
                }
            }
        },
        abrupt: function(a, b) {
            for (var c = this.tryEntries.length - 1; c >= 0; --c) {
                var d = this.tryEntries[c];
                if (d.tryLoc <= this.prev && g.call(d, "finallyLoc") && this.prev < d.finallyLoc) {
                    var e = d;
                    break
                }
            }
            e && (a === "break" || a === "continue") && e.tryLoc <= b && b <= e.finallyLoc && (e = null);
            d = e ? e.completion : {};
            d.type = a;
            d.arg = b;
            e ? this.next = e.finallyLoc : this.complete(d);
            return p
        },
        complete: function(a, b) {
            if (a.type === "throw") throw a.arg;
            a.type === "break" || a.type === "continue" ? this.next = a.arg : a.type === "return" ? (this.rval = a.arg, this.next = "end") : a.type === "normal" && b && (this.next = b)
        },
        finish: function(a) {
            for (var b = this.tryEntries.length - 1; b >= 0; --b) {
                var c = this.tryEntries[b];
                if (c.finallyLoc === a) {
                    this.complete(c.completion, c.afterLoc);
                    y(c);
                    return p
                }
            }
        },
        "catch": function(a) {
            for (var b = this.tryEntries.length - 1; b >= 0; --b) {
                var c = this.tryEntries[b];
                if (c.tryLoc === a) {
                    var d = c.completion;
                    if (d.type === "throw") {
                        var e = d.arg;
                        y(c)
                    }
                    return e
                }
            }
            throw new Error("illegal catch attempt")
        },
        delegateYield: function(a, b, c) {
            this.delegate = {
                iterator: A(a),
                resultName: b,
                nextLoc: c
            };
            return p
        }
    }
}), null);
__d("StreamBlockReader", ["Promise", "regeneratorRuntime"], (function(a, b, c, d, e, f) {
    a = function() {
        function a(a) {
            var c = this;
            if (!a.getReader) throw new Error("No getReader method found on given object");
            this.$3 = a.getReader();
            this.$1 = "";
            this.$2 = null;
            this.$4 = !1;
            this.$5 = "utf-8";
            this.$6 = "";
            this.$9 = !1;
            this.$8 = function() {
                return b("Promise").reject("Sorry, you are somehow using this too early.")
            };
            this.$7 = new(b("Promise"))(function(a, b) {
                c.$8 = a
            })
        }
        var c = a.prototype;
        c.changeEncoding = function(a) {
            if (this.$2) throw new Error("Decoder already in use, encoding cannot be changed");
            this.$5 = a
        };
        c.$10 = function() {
            if (!self.TextDecoder) throw new Error("TextDecoder is not supported here");
            this.$2 || (this.$2 = new self.TextDecoder(this.$5));
            return this.$2
        };
        c.$11 = function() {
            if (this.$9) throw new Error("Something else is already reading from this reader");
            this.$9 = !0
        };
        c.$12 = function() {
            this.$9 = !1
        };
        c.isDone = function() {
            return this.$4
        };
        c.$13 = function() {
            var a, c, d, e;
            return b("regeneratorRuntime").async(function(f) {
                while (1) switch (f.prev = f.next) {
                    case 0:
                        if (!(this.$6 !== "")) {
                            f.next = 4;
                            break
                        }
                        a = this.$6;
                        this.$6 = "";
                        return f.abrupt("return", a);
                    case 4:
                        if (!this.isDone()) {
                            f.next = 6;
                            break
                        }
                        throw new Error("You cannot read from a stream that is done");
                    case 6:
                        f.next = 8;
                        return b("regeneratorRuntime").awrap(this.$3.read());
                    case 8:
                        c = f.sent;
                        d = c.done;
                        e = c.value;
                        this.$4 = d;
                        d && this.$8();
                        return f.abrupt("return", e ? this.$10().decode(e, {
                            stream: !d
                        }) : "");
                    case 14:
                    case "end":
                        return f.stop()
                }
            }, null, this)
        };
        c.readNextBlock = function() {
            var a;
            return b("regeneratorRuntime").async(function(b) {
                while (1) switch (b.prev = b.next) {
                    case 0:
                        this.$11();
                        a = this.$13();
                        this.$12();
                        return b.abrupt("return", a);
                    case 4:
                    case "end":
                        return b.stop()
                }
            }, null, this)
        };
        c.readUntilStringOrEnd = function(a) {
            return b("regeneratorRuntime").async(function(c) {
                while (1) switch (c.prev = c.next) {
                    case 0:
                        c.next = 2;
                        return b("regeneratorRuntime").awrap(this.readUntilOneOfStringOrEnd_DO_NOT_USE([a]));
                    case 2:
                        return c.abrupt("return", c.sent);
                    case 3:
                    case "end":
                        return c.stop()
                }
            }, null, this)
        };
        c.readUntilStringOrThrow = function(a) {
            var c, d, e;
            return b("regeneratorRuntime").async(function(f) {
                while (1) switch (f.prev = f.next) {
                    case 0:
                        if (a) {
                            f.next = 2;
                            break
                        }
                        throw new Error("cannot read empty string");
                    case 2:
                        this.$11(), c = "", d = 0;
                    case 5:
                        if (this.isDone()) {
                            f.next = 23;
                            break
                        }
                        f.t0 = c;
                        f.next = 9;
                        return b("regeneratorRuntime").awrap(this.$13());
                    case 9:
                        c = f.t0 += f.sent;
                        if (!(c.length < a.length)) {
                            f.next = 12;
                            break
                        }
                        return f.abrupt("continue", 5);
                    case 12:
                        e = c.substring(d).indexOf(a);
                        if (!(e !== -1)) {
                            f.next = 20;
                            break
                        }
                        e += d;
                        this.$6 = c.substring(e + a.length);
                        this.$12();
                        return f.abrupt("return", c.substring(0, e));
                    case 20:
                        d = c.length - a.length + 1;
                    case 21:
                        f.next = 5;
                        break;
                    case 23:
                        this.$6 = c;
                        this.$12();
                        throw new Error("Breakpoint not found");
                    case 26:
                    case "end":
                        return f.stop()
                }
            }, null, this)
        };
        c.readUntilOneOfStringOrEnd_DO_NOT_USE = function(a) {
            var c, d, e, f;
            return b("regeneratorRuntime").async(function(g) {
                while (1) switch (g.prev = g.next) {
                    case 0:
                        this.$11(), c = "";
                    case 2:
                        if (this.isDone()) {
                            g.next = 20;
                            break
                        }
                        g.t0 = c;
                        g.next = 6;
                        return b("regeneratorRuntime").awrap(this.$13());
                    case 6:
                        c = g.t0 += g.sent, d = 0;
                    case 8:
                        if (!(d < a.length)) {
                            g.next = 18;
                            break
                        }
                        e = a[d];
                        f = c.indexOf(e);
                        if (!(f !== -1)) {
                            g.next = 15;
                            break
                        }
                        this.$6 = c.substring(f + e.length);
                        this.$12();
                        return g.abrupt("return", c.substring(0, f));
                    case 15:
                        d++;
                        g.next = 8;
                        break;
                    case 18:
                        g.next = 2;
                        break;
                    case 20:
                        this.$12();
                        return g.abrupt("return", c);
                    case 22:
                    case "end":
                        return g.stop()
                }
            }, null, this)
        };
        c.waitUntilDone = function() {
            return b("regeneratorRuntime").async(function(a) {
                while (1) switch (a.prev = a.next) {
                    case 0:
                        return a.abrupt("return", this.$7);
                    case 1:
                    case "end":
                        return a.stop()
                }
            }, null, this)
        };
        return a
    }();
    f["default"] = a
}), 66);
__d("FetchStreamTransport", ["ArbiterMixin", "FetchStreamConfig", "StreamBlockReader", "TimeSlice", "URI", "asyncToGeneratorRuntime", "mixin", "nullthrows"], (function(a, b, c, d, e, f, g) {
    var h = 0;
    a = function(a) {
        babelHelpers.inheritsLoose(d, a);

        function d(b) {
            var c;
            if (!self.ReadableStream || !self.fetch || !Request || !TextDecoder) throw new Error("fetch stream transport is not supported here");
            c = a.call(this) || this;
            c.$FetchStreamTransport6 = null;
            c.$FetchStreamTransport1 = b;
            c.$FetchStreamTransport3 = !1;
            c.$FetchStreamTransport4 = !1;
            c.$FetchStreamTransport5 = !1;
            c.$FetchStreamTransport2 = ++h;
            return babelHelpers.assertThisInitialized(c) || babelHelpers.assertThisInitialized(c)
        }
        var e = d.prototype;
        e.hasFinished = function() {
            return this.$FetchStreamTransport5
        };
        e.getRequestURI = function() {
            return new(c("URI"))(this.$FetchStreamTransport1).addQueryData({
                __a: 1,
                __adt: this.$FetchStreamTransport2,
                __req: "fetchstream_" + this.$FetchStreamTransport2,
                ajaxpipe_fetch_stream: 1
            })
        };
        e.send = function() {
            if (this.$FetchStreamTransport3) throw new Error("FetchStreamTransport instances cannot be re-used.");
            this.$FetchStreamTransport3 = !0;
            var a = new Request(this.getRequestURI().toString(), {
                mode: "same-origin",
                credentials: "include"
            });
            this.$FetchStreamTransport6 = c("TimeSlice").getGuardedContinuation("FetchStreamTransport: waiting on first response");
            a = self.fetch(a, {
                redirect: "follow"
            });
            this.$FetchStreamTransport7(a)
        };
        e.$FetchStreamTransport7 = function() {
            var a = b("asyncToGeneratorRuntime").asyncToGenerator(function*(a) {
                var b = this,
                    d;
                try {
                    d = (yield a)
                } catch (a) {
                    this.abort()
                }
                if (!d || !d.body || !d.ok) {
                    this.abort();
                    return
                }
                var e = new(c("StreamBlockReader"))(d.body);
                a = function*() {
                    var a = (yield e.readUntilStringOrEnd(c("FetchStreamConfig").delim));
                    if (b.$FetchStreamTransport4) return "break";
                    c("nullthrows")(b.$FetchStreamTransport6)(function() {
                        var d = JSON.parse(a);
                        e.isDone() || d.finished ? b.$FetchStreamTransport5 = !0 : b.$FetchStreamTransport6 = c("TimeSlice").getGuardedContinuation("FetchStreamTransport: waiting on next response");
                        b.inform("response", d.content)
                    })
                };
                while (!this.$FetchStreamTransport5 && !this.$FetchStreamTransport4) {
                    var f = (yield* a());
                    if (f === "break") break
                }
            });

            function d(b) {
                return a.apply(this, arguments)
            }
            return d
        }();
        e.abort = function() {
            var a = this;
            if (this.$FetchStreamTransport4 || this.$FetchStreamTransport5) return;
            this.$FetchStreamTransport4 = !0;
            this.$FetchStreamTransport5 = !0;
            if (this.$FetchStreamTransport6) {
                var b = this.$FetchStreamTransport6;
                b(function() {
                    a.inform("abort")
                })
            } else this.inform("abort")
        };
        return d
    }(c("mixin")(c("ArbiterMixin")));
    g["default"] = a
}), 98);
__d("HTTPErrors", ["emptyFunction"], (function(a, b, c, d, e, f, g) {
    function a(a) {
        return {
            summary: "HTTP Error",
            description: "Unknown HTTP error #" + a
        }
    }
    b = {
        get: a,
        getAll: c("emptyFunction").thatReturns(new Map())
    };
    d = b;
    g["default"] = d
}), 98);
__d("JSONPTransport", ["ArbiterMixin", "DOM", "HTML", "TimeSlice", "URI", "mixin", "setTimeout"], (function(a, b, c, d, e, f, g) {
    var h = {},
        i = 2;

    function j(a) {
        delete h[a]
    }
    a = function(a) {
        babelHelpers.inheritsLoose(b, a);

        function b(b) {
            var c;
            c = a.call(this) || this;
            c.$JSONPTransport3 = !1;
            c.$JSONPTransport7 = b;
            h[c.getID()] = babelHelpers.assertThisInitialized(c);
            return c
        }
        var d = b.prototype;
        d.getID = function() {
            return this.$JSONPTransport4 || (this.$JSONPTransport4 = i++)
        };
        d.hasFinished = function() {
            return !(this.getID() in h)
        };
        d.getRequestURI = function() {
            return new(c("URI"))(this.$JSONPTransport7).addQueryData({
                __a: 1,
                __adt: this.getID(),
                __req: "jsonp_" + this.getID()
            })
        };
        d.getTransportFrame = function() {
            if (this.$JSONPTransport5) return this.$JSONPTransport5;
            var a = "transport_frame_" + this.getID();
            a = c("HTML")('<iframe class="hidden_elem" name="' + a + '" src="javascript:void(0)" />');
            return this.$JSONPTransport5 = c("DOM").appendContent(document.body, a)[0]
        };
        d.send = function() {
            var a = this;
            this.getTransportFrame().onload = function() {
                return a.$JSONPTransport8()
            };
            this.getTransportFrame().src = this.getRequestURI().toString();
            this.$JSONPTransport2 = c("TimeSlice").getGuardedContinuation("JSONPTransport: waiting for first response")
        };
        d.handleResponse = function(a) {
            var b = this;
            this.$JSONPTransport2 == null ? void 0 : this.$JSONPTransport2(function() {
                b.inform("response", a), b.hasFinished() ? c("setTimeout")(function() {
                    return b.$JSONPTransport9()
                }, 0) : b.$JSONPTransport2 = c("TimeSlice").getGuardedContinuation("JSONPTransport: waiting for next response")
            })
        };
        d.abort = function() {
            if (this.$JSONPTransport1) return;
            this.$JSONPTransport1 = !0;
            this.$JSONPTransport9();
            j(this.getID());
            this.inform("abort")
        };
        d.$JSONPTransport8 = function() {
            this.$JSONPTransport3 || this.abort()
        };
        d.$JSONPTransport9 = function() {
            this.$JSONPTransport5 && (c("DOM").remove(this.$JSONPTransport5), this.$JSONPTransport5 = null)
        };
        return b
    }(c("mixin")(c("ArbiterMixin")));
    a.respond = function(a, b, c) {
        var d = h[a];
        if (d) {
            d.$JSONPTransport3 = !0;
            c || j(a);
            b;
            if (typeof b === "string") c = JSON.parse(b);
            else {
                c = JSON.parse((a = JSON.stringify(b)) != null ? a : "null")
            }
            d.handleResponse(c)
        }
    };
    a.respond = c("TimeSlice").guard(a.respond, "JSONPTransport.respond", {
        root: !0
    });
    g["default"] = a
}), 98);
__d("SessionName", ["SessionNameConfig"], (function(a, b, c, d, e, f) {
    e.exports = {
        getName: function() {
            return b("SessionNameConfig").seed
        }
    }
}), null);
__d("bind", [], (function(a, b, c, d, e, f) {
    function a(a, b) {
        var c = Array.prototype.slice.call(arguments, 2);
        if (typeof b !== "string") return Function.prototype.bind.apply(b, [a].concat(c));

        function d() {
            var d = c.concat(Array.prototype.slice.call(arguments));
            if (a[b]) return a[b].apply(a, d)
        }
        d.toString = function() {
            return "bound lazily: " + a[b]
        };
        return d
    }
    e.exports = a
}), null);
__d("errorCode", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        throw new Error('errorCode("' + a + '"): This should not happen. Oh noes!')
    }
    f["default"] = a
}), 66);
__d("executeAfter", [], (function(a, b, c, d, e, f) {
    function a(a, b, c) {
        return function() {
            a.apply(c || this, arguments), b.apply(c || this, arguments)
        }
    }
    e.exports = a
}), null);
__d("FbtErrorListenerWWW", ["FBLogger", "killswitch"], (function(a, b, c, d, e, f, g) {
    a = function() {
        function a(a) {
            this.$1 = a.hash, this.$2 = a.translation
        }
        var b = a.prototype;
        b.onStringSerializationError = function(a) {
            var b = "Context not logged.";
            if (!c("killswitch")("JS_RELIABILITY_FBT_LOGGING")) try {
                var d = JSON.stringify(a);
                d != null && (b = d.substr(0, 250))
            } catch (a) {
                b = a.message
            }
            d = (a == null ? void 0 : (d = a.constructor) == null ? void 0 : d.name) || "";
            c("FBLogger")("fbt").blameToPreviousDirectory().blameToPreviousDirectory().mustfix('Converting to a string will drop content data. Hash="%s" Translation="%s" Content="%s" (type=%s,%s)', this.$1, this.$2, b, typeof a, d)
        };
        b.onStringMethodUsed = function(a) {
            c("FBLogger")("fbt").blameToPreviousDirectory().blameToPreviousDirectory().mustfix("Error using fbt string. Used method %s on Fbt string. Fbt string is designed to be immutable and should not be manipulated.", a)
        };
        return a
    }();
    g["default"] = a
}), 98);
__d("FbtReactUtil", [], (function(a, b, c, d, e, f) {
    a = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 60103;
    var g = !1;
    b = {
        REACT_ELEMENT_TYPE: a,
        injectReactShim: function(a) {
            var b = {
                validated: !0
            };
            g ? Object.defineProperty(a, "_store", {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: b
            }) : a._store = b
        }
    };
    e.exports = b
}), null);
__d("FbtResult", ["FbtReactUtil", "FbtResultBase"], (function(a, b, c, d, e, f) {
    var g = function(a) {
        return a.content
    };
    a = function(a) {
        "use strict";
        babelHelpers.inheritsLoose(c, a);

        function c(c, d) {
            d = a.call(this, c, d) || this;
            d.$$typeof = b("FbtReactUtil").REACT_ELEMENT_TYPE;
            d.key = null;
            d.ref = null;
            d.type = g;
            d.props = {
                content: c
            };
            return d
        }
        c.get = function(a) {
            return new c(a.contents, a.errorListener)
        };
        return c
    }(b("FbtResultBase"));
    e.exports = a
}), null);
__d("FbtPureStringResult", ["FbtResult"], (function(a, b, c, d, e, f) {
    a = function(a) {
        "use strict";
        babelHelpers.inheritsLoose(b, a);

        function b() {
            return a.apply(this, arguments) || this
        }
        return b
    }(b("FbtResult"));
    e.exports = a
}), null);
__d("getFbsResult", ["FbtPureStringResult"], (function(a, b, c, d, e, f) {
    function a(a) {
        return new(b("FbtPureStringResult"))(a.contents, a.errorListener)
    }
    e.exports = a
}), null);
__d("InlineFbtResult", ["cr:1183579"], (function(a, b, c, d, e, f, g) {
    g["default"] = b("cr:1183579")
}), 98);
__d("TransAppInlineMode", [], (function(a, b, c, d, e, f) {
    a = Object.freeze({
        STRING_MANAGER: "STRING_MANAGER",
        TRANSLATION: "TRANSLATION",
        APPROVE: "APPROVE",
        REPORT: "REPORT",
        NO_INLINE: "NO_INLINE"
    });
    f["default"] = a
}), 66);
__d("getUnwrappedFbt", ["FbtResultGK"], (function(a, b, c, d, e, f) {
    function a(a) {
        a = a.contents;
        var c = b("FbtResultGK").inlineMode,
            d = b("FbtResultGK").shouldReturnFbtResult;
        if (!d && c !== "REPORT") return (a == null ? void 0 : a.length) === 1 && typeof a[0] === "string" ? a[0] : a
    }
    e.exports = a
}), null);
__d("getFbtResult", ["FbtResult", "FbtResultGK", "InlineFbtResult", "getUnwrappedFbt", "gkx", "recoverableViolation"], (function(a, b, c, d, e, f, g) {
    if (c("gkx")("708253") && c("FbtResultGK").inlineMode === "TRANSLATION") {
        c("recoverableViolation")("TransAppInlineMode=TRANSLATION should not happen on Comet yet. " + ("[inlineMode=" + ((b = c("FbtResultGK").inlineMode) != null ? b : "") + "]") + ("[runtime_site_is_comet=" + String(c("gkx")("708253")) + "]"), "internationalization")
    }

    function a(a) {
        var b = c("getUnwrappedFbt")(a);
        if (b != null) return b;
        b = a.contents;
        var d = a.patternString,
            e = a.patternHash;
        return c("FbtResultGK").inlineMode != null && c("FbtResultGK").inlineMode !== "NO_INLINE" ? new(c("InlineFbtResult"))(b, c("FbtResultGK").inlineMode, d, e) : c("FbtResult").get(a)
    }
    g["default"] = a
}), 98);
__d("getTranslatedInput", ["Env", "ExecutionEnvironment", "FBLogger", "MakeHasteTranslationsMap"], (function(a, b, c, d, e, f, g) {
    b = "JHASH";
    var h = new RegExp("__" + b + "__(.+?)__" + b + "__"),
        i = !!c("Env").use_fbt_virtual_modules;

    function a(a) {
        var b = a.table;
        if (i && c("ExecutionEnvironment").canUseDOM) {
            if (typeof b === "string") {
                var e = b.match(h);
                if (e != null) return babelHelpers["extends"]({}, a, {
                    table: d("MakeHasteTranslationsMap").get(e[1])
                })
            }
            c("FBLogger")("binary_transparency", "inlined_translations").warn("Found inlined translated contents in client_fetch_translations experiment! Input: %s", JSON.stringify(b))
        }
        return a
    }
    g["default"] = a
}), 98);
__d("requireDeferred", ["RequireDeferredReference"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = {};

    function i(a, b) {
        h[a] = b
    }

    function j(a) {
        return h[a]
    }

    function a(a) {
        var b = j(a);
        if (b) return b;
        b = new(c("RequireDeferredReference"))(a);
        i(a, b);
        return b
    }
    g["default"] = a
}), 98);
__d("translationOverrideListener", ["requireDeferred"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = c("requireDeferred")("IntlQtEventFalcoEvent").__setRef("translationOverrideListener");

    function a(a) {
        h.onReady(function(b) {
            return b.log(function() {
                return {
                    hash: a
                }
            })
        })
    }
    g["default"] = a
}), 98);
__d("FbtEnv", ["FbtErrorListenerWWW", "FbtHooks", "IntlViewerContext", "getFbsResult", "getFbtResult", "getTranslatedInput", "promiseDone", "requireDeferred", "translationOverrideListener"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h, i = c("requireDeferred")("FbtLogging").__setRef("FbtEnv"),
        j = !1;

    function a() {
        if (j) return;
        j = !0;
        (h || (h = b("FbtHooks"))).register({
            errorListener: function(a) {
                return new(c("FbtErrorListenerWWW"))(a)
            },
            getFbsResult: c("getFbsResult"),
            getFbtResult: c("getFbtResult"),
            getTranslatedInput: c("getTranslatedInput"),
            onTranslationOverride: c("translationOverrideListener"),
            getViewerContext: function() {
                return c("IntlViewerContext")
            },
            logImpression: function(a) {
                return c("promiseDone")(i.load().then(function(b) {
                    return b.logImpression == null ? void 0 : b.logImpression(a)
                }))
            }
        })
    }
    g.setupOnce = a
}), 98);
__d("FbtHooksImpl", [], (function(a, b, c, d, e, f) {
    var g = {};
    a = {
        getErrorListener: function(a) {
            return g.errorListener == null ? void 0 : g.errorListener(a)
        },
        logImpression: function(a) {
            g.logImpression == null ? void 0 : g.logImpression(a)
        },
        onTranslationOverride: function(a) {
            g.onTranslationOverride == null ? void 0 : g.onTranslationOverride(a)
        },
        getFbsResult: function(a) {
            return g.getFbsResult(a)
        },
        getFbtResult: function(a) {
            return g.getFbtResult(a)
        },
        getTranslatedInput: function(a) {
            var b;
            return (b = g.getTranslatedInput == null ? void 0 : g.getTranslatedInput(a)) != null ? b : a
        },
        getViewerContext: function() {
            return g.getViewerContext()
        },
        register: function(a) {
            Object.assign(g, a)
        }
    };
    e.exports = a
}), null);
__d("FbtHooks", ["FbtEnv", "FbtHooksImpl"], (function(a, b, c, d, e, f) {
    e.exports = b("FbtHooksImpl"), b("FbtEnv").setupOnce()
}), null);
__d("FbtTable", ["invariant"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = {
        ARG: {
            INDEX: 0,
            SUBSTITUTION: 1
        },
        access: function(a, b, c) {
            if (c >= b.length) {
                typeof a === "string" || Array.isArray(a) || g(0, 21388, JSON.stringify(a));
                return a
            }
            var d = b[c];
            d = d[h.ARG.INDEX];
            if (d == null) return h.access(a, b, c + 1);
            typeof a !== "string" && !Array.isArray(a) || g(0, 20954, typeof a);
            for (var e = 0; e < d.length; ++e) {
                var f = a[d[e]];
                if (f == null) continue;
                f = h.access(f, b, c + 1);
                if (f != null) return f
            }
            return null
        }
    };
    e.exports = h
}), null);
__d("FbtTableAccessor", [], (function(a, b, c, d, e, f) {
    "use strict";
    a = {
        getEnumResult: function(a) {
            return [
                [a], null
            ]
        },
        getGenderResult: function(a, b, c) {
            return [a, b]
        },
        getNumberResult: function(a, b, c) {
            return [a, b]
        },
        getSubstitution: function(a) {
            return [null, a]
        },
        getPronounResult: function(a) {
            return [
                [a, "*"], null
            ]
        }
    };
    e.exports = a
}), null);
__d("GenderConst", [], (function(a, b, c, d, e, f) {
    e.exports = {
        NOT_A_PERSON: 0,
        FEMALE_SINGULAR: 1,
        MALE_SINGULAR: 2,
        FEMALE_SINGULAR_GUESS: 3,
        MALE_SINGULAR_GUESS: 4,
        MIXED_UNKNOWN: 5,
        NEUTER_SINGULAR: 6,
        UNKNOWN_SINGULAR: 7,
        FEMALE_PLURAL: 8,
        MALE_PLURAL: 9,
        NEUTER_PLURAL: 10,
        UNKNOWN_PLURAL: 11
    }
}), null);
__d("FbtNumberType", ["IntlNumberTypeProps"], (function(a, b, c, d, e, f, g) {
    g["default"] = c("IntlNumberTypeProps").module
}), 98);
__d("IntlNumberType", ["FbtNumberType"], (function(a, b, c, d, e, f, g) {
    a = function(a) {
        return c("FbtNumberType")
    };
    g.get = a
}), 98);
__d("IntlVariations", [], (function(a, b, c, d, e, f) {
    e.exports = {
        BITMASK_NUMBER: 28,
        BITMASK_GENDER: 3,
        NUMBER_ZERO: 16,
        NUMBER_ONE: 4,
        NUMBER_TWO: 8,
        NUMBER_FEW: 20,
        NUMBER_MANY: 12,
        NUMBER_OTHER: 24,
        GENDER_MALE: 1,
        GENDER_FEMALE: 2,
        GENDER_UNKNOWN: 3
    }
}), null);
__d("IntlVariationResolverImpl", ["invariant", "FbtHooks", "IntlNumberType", "IntlVariations"], (function(a, b, c, d, e, f, g) {
    var h, i = "_1";
    a = {
        EXACTLY_ONE: i,
        getNumberVariations: function(a) {
            var c = b("IntlNumberType").get((h || (h = b("FbtHooks"))).getViewerContext().locale).getVariation(a);
            c & b("IntlVariations").BITMASK_NUMBER || g(0, 11647, c, typeof c);
            return a === 1 ? [i, c, "*"] : [c, "*"]
        },
        getGenderVariations: function(a) {
            a & b("IntlVariations").BITMASK_GENDER || g(0, 11648, a, typeof a);
            return [a, "*"]
        }
    };
    e.exports = a
}), null);
__d("IntlVariationResolver", ["IntlVariationHoldout", "IntlVariationResolverImpl"], (function(a, b, c, d, e, f, g) {
    a = {
        getNumberVariations: function(a) {
            return d("IntlVariationResolverImpl").getNumberVariations(a)
        },
        getGenderVariations: function(a) {
            return d("IntlVariationHoldout").disable_variation ? ["*"] : d("IntlVariationResolverImpl").getGenderVariations(a)
        }
    };
    b = a;
    g["default"] = b
}), 98);
__d("NumberFormatConsts", ["NumberFormatConfig"], (function(a, b, c, d, e, f) {
    a = {
        get: function(a) {
            return b("NumberFormatConfig")
        }
    };
    e.exports = a
}), null);
__d("escapeRegex", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        return a.replace(/([.?*+\^$\[\]\\(){}|\-])/g, "\\$1")
    }
    e.exports = a
}), null);
__d("intlNumUtils", ["FbtHooks", "NumberFormatConsts", "escapeRegex"], (function(a, b, c, d, e, f) {
    var g, h = 3;
    f = ["\u0433\u0440\u043d.", "\u0434\u0435\u043d.", "\u043b\u0432.", "\u043c\u0430\u043d.", "\u0564\u0580.", "\u062c.\u0645.", "\u062f.\u0625.", "\u062f.\u0627.", "\u062f.\u0628.", "\u062f.\u062a.", "\u062f.\u062c.", "\u062f.\u0639.", "\u062f.\u0643.", "\u062f.\u0644.", "\u062f.\u0645.", "\u0631.\u0633.", "\u0631.\u0639.", "\u0631.\u0642.", "\u0631.\u064a.", "\u0644.\u0633.", "\u0644.\u0644.", "\u0783.", "B/.", "Bs.", "Fr.", "kr.", "L.", "p.", "S/."];
    var i = {};

    function j(a) {
        i[a] || (i[a] = new RegExp(a, "i"));
        return i[a]
    }
    var k = j(f.reduce(function(a, c, d) {
        return a + (d ? "|" : "") + "(" + b("escapeRegex")(c) + ")"
    }, ""));

    function l(a, c, d, e, f, g, i) {
        d === void 0 && (d = "");
        e === void 0 && (e = ".");
        f === void 0 && (f = 0);
        g === void 0 && (g = {
            primaryGroupSize: h,
            secondaryGroupSize: h
        });
        var k = g.primaryGroupSize || h;
        g = g.secondaryGroupSize || k;
        i = i && i.digits;
        var l;
        c == null ? l = a.toString() : typeof a === "string" ? l = r(a, c) : l = p(a, c);
        a = l.split(".");
        c = a[0];
        l = a[1];
        if (Math.abs(parseInt(c, 10)).toString().length >= f) {
            a = "$1" + d + "$2$3";
            f = "(\\d)(\\d{" + (k - 0) + "})($|\\D)";
            k = c.replace(j(f), a);
            if (k != c) {
                c = k;
                f = "(\\d)(\\d{" + (g - 0) + "})(" + b("escapeRegex")(d) + ")";
                g = j(f);
                while ((k = c.replace(g, a)) != c) c = k
            }
        }
        i != null && (c = m(c, i), l = l && m(l, i));
        d = c;
        l && (d += e + l);
        return d
    }

    function m(a, b) {
        var c = "";
        for (var d = 0; d < a.length; ++d) {
            var e = b[a.charCodeAt(d) - 48];
            c += e !== void 0 ? e : a[d]
        }
        return c
    }

    function a(a, c) {
        var d = b("NumberFormatConsts").get((g || (g = b("FbtHooks"))).getViewerContext().locale);
        return l(a, c, "", d.decimalSeparator, d.minDigitsForThousandsSeparator, d.standardDecimalPatternInfo, d.numberingSystemData)
    }

    function n(a, c) {
        var d = b("NumberFormatConsts").get((g || (g = b("FbtHooks"))).getViewerContext().locale);
        return l(a, c, d.numberDelimiter, d.decimalSeparator, d.minDigitsForThousandsSeparator, d.standardDecimalPatternInfo, d.numberingSystemData)
    }

    function o(a) {
        return a && Math.floor(Math.log10(Math.abs(a)))
    }

    function c(a, b, c) {
        var d = o(a),
            e = a;
        d < c && (e = a * Math.pow(10, -d + c));
        a = Math.pow(10, o(e) - c + 1);
        e = Math.round(e / a) * a;
        if (d < c) {
            e /= Math.pow(10, -d + c);
            if (b == null) return n(e, c - d - 1)
        }
        return n(e, b)
    }

    function p(a, b) {
        b = b == null ? 0 : b;
        var c = Math.pow(10, b);
        a = (Math.round(a * c) / c).toString();
        if (!b) return a;
        if (a.indexOf("e-") !== -1) return a;
        c = a.indexOf(".");
        var d;
        c === -1 ? (a += ".", d = b) : d = b - (a.length - c - 1);
        for (b = 0, c = d; b < c; b++) a += "0";
        return a
    }
    var q = function(a, b) {
        a = a;
        for (var c = 0; c < b; c++) a += "0";
        return a
    };

    function r(a, b) {
        var c = a.indexOf("."),
            d = c === -1 ? a : a.slice(0, c);
        a = c === -1 ? "" : a.slice(c + 1);
        return b != null ? d + "." + q(a.slice(0, b), b - a.length) : d
    }

    function s(a, c, d) {
        d === void 0 && (d = "");
        var e = u(),
            f = a;
        e && (f = a.split("").map(function(a) {
            return e[a] || a
        }).join("").trim());
        f = f.replace(/^[^\d]*\-/, "\x02");
        f = f.replace(k, "");
        a = b("escapeRegex")(c);
        c = b("escapeRegex")(d);
        d = j("^[^\\d]*\\d.*" + a + ".*\\d[^\\d]*$");
        if (!d.test(f)) {
            d = j("(^[^\\d]*)" + a + "(\\d*[^\\d]*$)");
            if (d.test(f)) {
                f = f.replace(d, "$1\x01$2");
                return t(f)
            }
            d = j("^[^\\d]*[\\d " + b("escapeRegex")(c) + "]*[^\\d]*$");
            d.test(f) || (f = "");
            return t(f)
        }
        d = j("(^[^\\d]*[\\d " + c + "]*)" + a + "(\\d*[^\\d]*$)");
        f = d.test(f) ? f.replace(d, "$1\x01$2") : "";
        return t(f)
    }

    function t(a) {
        a = a.replace(/[^0-9\u0001\u0002]/g, "").replace("\x01", ".").replace("\x02", "-");
        var b = Number(a);
        return a === "" || isNaN(b) ? null : b
    }

    function u() {
        var a = b("NumberFormatConsts").get((g || (g = b("FbtHooks"))).getViewerContext().locale),
            c = {};
        a = a.numberingSystemData && a.numberingSystemData.digits;
        if (a == null) return null;
        for (var d = 0; d < a.length; d++) c[a.charAt(d)] = d.toString();
        return c
    }

    function d(a) {
        var c = b("NumberFormatConsts").get((g || (g = b("FbtHooks"))).getViewerContext().locale);
        return s(a, c.decimalSeparator || ".", c.numberDelimiter)
    }
    var v = {
        formatNumber: a,
        formatNumberRaw: l,
        formatNumberWithThousandDelimiters: n,
        formatNumberWithLimitedSigFig: c,
        parseNumber: d,
        parseNumberRaw: s,
        truncateLongNumber: r,
        getFloatString: function(a, b, c) {
            a = String(a);
            a = a.split(".");
            b = v.getIntegerString(a[0], b);
            return a.length === 1 ? b : b + c + a[1]
        },
        getIntegerString: function(a, b) {
            b = b;
            b === "" && (b = ",");
            a = String(a);
            var c = /(\d+)(\d{3})/;
            while (c.test(a)) a = a.replace(c, "$1" + b + "$2");
            return a
        }
    };
    e.exports = v
}), null);
__d("IntlPhonologicalRewrites", ["IntlPhonologicalRules"], (function(a, b, c, d, e, f) {
    "use strict";
    a = {
        get: function(a) {
            return b("IntlPhonologicalRules")
        }
    };
    e.exports = a
}), null);
__d("IntlRedundantStops", [], (function(a, b, c, d, e, f) {
    a = Object.freeze({
        equivalencies: {
            ".": ["\u0964", "\u104b", "\u3002"],
            "\u2026": ["\u0e2f", "\u0eaf", "\u1801"],
            "!": ["\uff01"],
            "?": ["\uff1f"]
        },
        redundancies: {
            "?": ["?", ".", "!", "\u2026"],
            "!": ["!", "?", "."],
            ".": [".", "!"],
            "\u2026": ["\u2026", ".", "!"]
        }
    });
    f["default"] = a
}), 66);
__d("IntlPunctuation", ["FbtHooks", "IntlPhonologicalRewrites", "IntlRedundantStops"], (function(a, b, c, d, e, f, g) {
    d = "[.!?\u3002\uff01\uff1f\u0964\u2026\u0eaf\u1801\u0e2f\uff0e]";
    var h = {};

    function i(a) {
        var b;
        b = (b = a) != null ? b : "";
        var c = h[b];
        c == null && (c = h[b] = j(a));
        return c
    }

    function j(a) {
        var b = [];
        a = c("IntlPhonologicalRewrites").get(a);
        for (var d in a.patterns) {
            var e = a.patterns[d];
            for (var f in a.meta) {
                var g = new RegExp(f.slice(1, -1), "g"),
                    h = a.meta[f];
                d = d.replace(g, h);
                e = e.replace(g, h)
            }
            e === "javascript" && (e = function(a) {
                return a.slice(1).toLowerCase()
            });
            b.push([new RegExp(d.slice(1, -1), "g"), e])
        }
        return b
    }

    function a(a) {
        var b = i(c("FbtHooks").getViewerContext().locale);
        a = a;
        for (var d = 0; d < b.length; d++) {
            var e = b[d],
                f = e[0];
            e = e[1];
            a = a.replace(f, e)
        }
        return a.replace(/\x01/g, "")
    }
    var k = new Map();
    for (e in c("IntlRedundantStops").equivalencies)
        for (var f = [e].concat(c("IntlRedundantStops").equivalencies[e]), l = Array.isArray(f), m = 0, f = l ? f : f[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
            var n;
            if (l) {
                if (m >= f.length) break;
                n = f[m++]
            } else {
                m = f.next();
                if (m.done) break;
                n = m.value
            }
            n = n;
            k.set(n, e)
        }
    var o = new Map();
    for (n in c("IntlRedundantStops").redundancies) o.set(n, new Set(c("IntlRedundantStops").redundancies[n]));

    function p(a, b) {
        a = k.get(a);
        b = k.get(b);
        return ((a = o.get(a)) == null ? void 0 : a.has(b)) === !0
    }

    function b(a, b) {
        return p(a[a.length - 1], b) ? "" : b
    }
    g.PUNCT_CHAR_CLASS = d;
    g.applyPhonologicalRules = a;
    g.dedupeStops = b
}), 98);
__d("substituteTokens", ["invariant", "IntlPunctuation"], (function(a, b, c, d, e, f, g, h) {
    b = Object.prototype.hasOwnProperty;
    var i = new RegExp("\\{([^}]+)\\}(" + d("IntlPunctuation").PUNCT_CHAR_CLASS + "*)", "g");

    function j(a) {
        return a
    }

    function a(a, b) {
        if (b == null) return a;
        typeof b === "object" || h(0, 6041, a);
        var c = [],
            e = [];
        a = a.replace(i, function(a, f, g) {
            a = b[f];
            if (a != null && typeof a === "object") {
                c.push(a);
                e.push(f);
                return "\x17" + g
            } else if (a === null) return "";
            return String(a) + d("IntlPunctuation").dedupeStops(String(a), g)
        }).split("\x17").map(d("IntlPunctuation").applyPhonologicalRules);
        if (a.length === 1) return a[0];
        var f = a[0] !== "" ? [a[0]] : [];
        for (var g = 0; g < c.length; g++) f.push(j(c[g])), a[g + 1] !== "" && f.push(a[g + 1]);
        return f
    }
    f.exports = a
}), 34);
__d("fbt", ["invariant", "FbtEnv", "FbtHooks", "FbtQTOverrides", "FbtResultBase", "FbtTable", "FbtTableAccessor", "GenderConst", "IntlVariationResolver", "intlNumUtils", "substituteTokens"], (function(a, b, c, d, e, f, g) {
    var h;
    b("FbtEnv").setupOnce();
    var i = b("FbtQTOverrides").overrides,
        j = b("IntlVariationResolver").getGenderVariations,
        k = b("IntlVariationResolver").getNumberVariations,
        l = Object.prototype.hasOwnProperty,
        m = !1,
        n = b("FbtTable").ARG,
        o = {
            number: 0,
            gender: 1
        },
        p = {
            object: 0,
            possessive: 1,
            reflexive: 2,
            subject: 3
        },
        q = {};

    function a(a, c, d) {
        if (((d == null ? void 0 : d.hk) || (d == null ? void 0 : d.ehk)) && m) return {
            text: a,
            fbt: !0,
            hashKey: d.hk
        };
        a = (h || (h = b("FbtHooks"))).getTranslatedInput({
            table: a,
            args: c,
            options: d
        });
        c = a.args;
        a = a.table;
        var e = {};
        if (a.__vcg != null) {
            c = c || [];
            var f = (h || (h = b("FbtHooks"))).getViewerContext();
            f = f.GENDER;
            var k = j(f);
            c.unshift(b("FbtTableAccessor").getGenderResult(k, null, f))
        }
        c && (typeof a !== "string" && (a = b("FbtTable").access(a, c, 0)), e = r(c), a !== null || g(0, 479));
        var l;
        if (Array.isArray(a)) {
            k = a[0];
            l = a[1];
            f = "1_" + l;
            i[f] != null && i[f] !== "" && (k = i[f], (h || (h = b("FbtHooks"))).onTranslationOverride(l));
            (h || (h = b("FbtHooks"))).logImpression(l)
        } else if (typeof a === "string") k = a;
        else throw new Error("Table access did not result in string: " + (a === void 0 ? "undefined" : JSON.stringify(a)) + ", Type: " + typeof a);
        c = q[k];
        f = s(e);
        if (c && !f) return c;
        else {
            a = b("substituteTokens")(k, e);
            c = this._wrapContent(a, k, l, d == null ? void 0 : d.eo);
            f || (q[k] = c);
            return c
        }
    }

    function r(a) {
        var b = {};
        a.forEach(function(a) {
            a = a[n.SUBSTITUTION];
            if (!a) return;
            for (var c in a) l.call(a, c) && (b[c] == null || g(0, 56656, c), b[c] = a[c])
        });
        return b
    }

    function s(a) {
        for (a in a) return !0;
        return !1
    }

    function c(a, c) {
        return b("FbtTableAccessor").getEnumResult(a)
    }

    function d(a) {
        return b("FbtTableAccessor").getGenderResult(j(a), null, a)
    }

    function f(a, c, d) {
        var e;
        e = (e = {}, e[a] = c, e);
        if (d)
            if (d[0] === o.number) {
                var f = d.length > 1 ? d[1] : c;
                typeof f === "number" || g(0, 484);
                var h = k(f);
                typeof c === "number" && (e[a] = b("intlNumUtils").formatNumberWithThousandDelimiters(c));
                return b("FbtTableAccessor").getNumberResult(h, e, f)
            } else if (d[0] === o.gender) {
            a = d[1];
            a != null || g(0, 485);
            return b("FbtTableAccessor").getGenderResult(j(a), e, a)
        } else g(0, 486);
        else return b("FbtTableAccessor").getSubstitution(e)
    }

    function t(a, b, c) {
        return this._param(a, b, c)
    }

    function u(a, c, d) {
        var e = k(a),
            f = {};
        c && (typeof d === "number" ? f[c] = b("intlNumUtils").formatNumberWithThousandDelimiters(d) : f[c] = d || b("intlNumUtils").formatNumberWithThousandDelimiters(a));
        return b("FbtTableAccessor").getNumberResult(e, f, a)
    }

    function v(a, c, d) {
        c !== b("GenderConst").NOT_A_PERSON || !d || !d.human || g(0, 11835);
        d = w(a, c);
        return b("FbtTableAccessor").getPronounResult(d)
    }

    function w(a, c) {
        switch (c) {
            case b("GenderConst").NOT_A_PERSON:
                return a === p.object || a === p.reflexive ? b("GenderConst").NOT_A_PERSON : b("GenderConst").UNKNOWN_PLURAL;
            case b("GenderConst").FEMALE_SINGULAR:
            case b("GenderConst").FEMALE_SINGULAR_GUESS:
                return b("GenderConst").FEMALE_SINGULAR;
            case b("GenderConst").MALE_SINGULAR:
            case b("GenderConst").MALE_SINGULAR_GUESS:
                return b("GenderConst").MALE_SINGULAR;
            case b("GenderConst").MIXED_UNKNOWN:
            case b("GenderConst").FEMALE_PLURAL:
            case b("GenderConst").MALE_PLURAL:
            case b("GenderConst").NEUTER_PLURAL:
            case b("GenderConst").UNKNOWN_PLURAL:
                return b("GenderConst").UNKNOWN_PLURAL;
            case b("GenderConst").NEUTER_SINGULAR:
            case b("GenderConst").UNKNOWN_SINGULAR:
                return a === p.reflexive ? b("GenderConst").NOT_A_PERSON : b("GenderConst").UNKNOWN_PLURAL
        }
        return b("GenderConst").NOT_A_PERSON
    }

    function x(a, c, d) {
        var e = j(d),
            f = {};
        f[a] = c;
        return b("FbtTableAccessor").getGenderResult(e, f, d)
    }

    function y(a, c, d, e) {
        a = typeof a === "string" ? [a] : a;
        var f = (h || (h = b("FbtHooks"))).getErrorListener({
            translation: c,
            hash: d
        });
        a = h.getFbtResult({
            contents: a,
            errorListener: f,
            extraOptions: e,
            patternHash: d,
            patternString: c
        });
        return a
    }

    function z() {
        m = !0
    }

    function A() {
        m = !1
    }

    function B(a) {
        return a instanceof b("FbtResultBase")
    }
    var C = function() {};
    C._ = a;
    C._enum = c;
    C._implicitParam = t;
    C._name = x;
    C._param = f;
    C._plural = u;
    C._pronoun = v;
    C._subject = d;
    C._wrapContent = y;
    C.disableJsonExportMode = A;
    C.enableJsonExportMode = z;
    C.isFbtInstance = B;
    C._getCachedFbt = void 0;
    e.exports = C
}), null);
__d("BDHeaderConfig", [], (function(a, b, c, d, e, f) {
    "use strict";
    a = "198387";
    f.ASBD_ID = a
}), 66);
__d("getAsyncHeaders", ["BDHeaderConfig", "LSD", "ZeroCategoryHeader", "isFacebookURI"], (function(a, b, c, d, e, f, g) {
    function a(a) {
        var b = {},
            d = c("isFacebookURI")(a);
        d && c("ZeroCategoryHeader").value && (b[c("ZeroCategoryHeader").header] = c("ZeroCategoryHeader").value);
        d = h(a);
        d && (b["X-FB-LSD"] = d);
        d = i(a);
        d && (b["X-ASBD-ID"] = d);
        return b
    }

    function h(a) {
        return j(a) ? null : c("LSD").token
    }

    function i(a) {
        return j(a) ? null : d("BDHeaderConfig").ASBD_ID
    }

    function j(a) {
        return !a.toString().startsWith("/") && a.getOrigin() !== document.location.origin
    }
    g["default"] = a
}), 98);
__d("goURI", ["URI"], (function(a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = c("URI").go
}), 98);
__d("isBulletinDotComURI", [], (function(a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)bulletin\\.com$", "i"),
        h = ["https"];

    function a(a) {
        if (a.isEmpty() && a.toString() !== "#") return !1;
        return !a.getDomain() && !a.getProtocol() ? !1 : h.indexOf(a.getProtocol()) !== -1 && g.test(a.getDomain())
    }
    f["default"] = a
}), 66);
__d("isHorizonDotMetaDotComURI", [], (function(a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)horizon\\.meta\\.com$", "i"),
        h = ["https"];

    function a(a) {
        if (a.isEmpty() && a.toString() !== "#") return !1;
        return !a.getDomain() && !a.getProtocol() ? !1 : h.indexOf(a.getProtocol()) !== -1 && g.test(a.getDomain())
    }
    f["default"] = a
}), 66);
__d("isSparkDotMetaDotComURI", [], (function(a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)spark\\.meta\\.com$", "i"),
        h = ["https"];

    function a(a) {
        if (a.isEmpty() && a.toString() !== "#") return !1;
        return !a.getDomain() && !a.getProtocol() ? !1 : h.indexOf(a.getProtocol()) !== -1 && g.test(a.getDomain())
    }
    f["default"] = a
}), 66);
__d("isWorkroomsDotComURI", [], (function(a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)workrooms\\.com$", "i"),
        h = ["https"];

    function a(a) {
        if (a.isEmpty() && a.toString() !== "#") return !1;
        return !a.getDomain() && !a.getProtocol() ? !1 : h.indexOf(a.getProtocol()) !== -1 && g.test(a.getDomain())
    }
    f["default"] = a
}), 66);
__d("uriIsRelativePath", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        return !a.getProtocol() && !a.getDomain() && !a.getPort() && a.toString() !== ""
    }
    f["default"] = a
}), 66);
__d("AsyncRequest", ["errorCode", "fbt", "invariant", "Arbiter", "AsyncDOM", "AsyncRequestConfig", "AsyncResponse", "Bootloader", "CSS", "DTSG", "DTSG_ASYNC", "Deferred", "Env", "ErrorGuard", "Event", "FBLogger", "FetchStreamTransport", "HTTPErrors", "HasteResponse", "PHPQuerySerializer", "Parent", "Promise", "ResourceTimingsStore", "ResourceTypes", "ScriptPath", "ServerJS", "SessionName", "TimeSlice", "URI", "UserAgent_DEPRECATED", "ZeroRewrites", "bind", "clearTimeout", "emptyFunction", "executeAfter", "fb-error", "ge", "getAsyncHeaders", "getAsyncParams", "gkx", "goURI", "isBulletinDotComURI", "isEmpty", "isFacebookURI", "isHorizonDotMetaDotComURI", "isInternalFBURI", "isMessengerDotComURI", "isSparkDotMetaDotComURI", "isWorkDotMetaDotComURI", "isWorkplaceDotComURI", "isWorkroomsDotComURI", "killswitch", "performanceAbsoluteNow", "promiseDone", "replaceTransportMarkers", "setTimeout", "setTimeoutAcrossTransitions", "uriIsRelativePath"], (function(a, b, c, d, e, f, g, h, i, j) {
    "use strict";
    f = 19e3;
    h = 500;
    var k = 1006,
        l = 1004,
        m = 1010,
        n = new Set([h, m, l, k]);

    function o() {
        try {
            return !window.domready
        } catch (a) {
            return !0
        }
    }

    function p(a) {
        return "onprogress" in a
    }

    function q(a) {
        return "upload" in a && "onprogress" in a.upload
    }

    function r(a) {
        return "withCredentials" in a
    }

    function s(a) {
        return a.status in {
            0: 1,
            12029: 1,
            12030: 1,
            12031: 1,
            12152: 1
        }
    }

    function t(a) {
        a = !a || typeof a === "function";
        a || c("FBLogger")("asyncresponse").mustfix("AsyncRequest response handlers must be functions. Pass a function, or use bind() to build one.");
        return a
    }
    var u = 2,
        v = u,
        w = !1;
    c("Arbiter").subscribe("page_transition", function(a, b) {
        !w ? v = b.id : w = !1
    });
    var x = "for (;;);",
        y = x.length,
        z = function() {
            function a(b) {
                var e = this;
                this._allowIrrelevantRequests = !1;
                this._delayPreDisplayJS = !1;
                this._shouldReplaceTransportMarkers = !1;
                this._dispatchErrorResponse = function(a, b) {
                    var d = a.getError();
                    e.clearStatusIndicator();
                    if (!e._isRelevant() || d === m) {
                        e.abort();
                        return
                    }
                    if (e._isServerDialogErrorCode(d)) {
                        var f = d == 1357008 || d == 1357007;
                        e.interceptHandler(a);
                        d == 1357041 ? e._solveQuicksandChallenge(a) : d == 1357007 ? e._displayServerDialog(a, f, !0) : e._displayServerDialog(a, f)
                    } else if (e.initialHandler(a) !== !1) {
                        c("clearTimeout")(e.timer);
                        try {
                            b(a)
                        } catch (b) {
                            e.finallyHandler(a);
                            throw b
                        }
                        e.finallyHandler(a)
                    }
                };
                this._onStateChange = function() {
                    var b = e.transport;
                    if (!b) return;
                    try {
                        a._inflightCount--;
                        d("ResourceTimingsStore").measureResponseReceived(c("ResourceTypes").XHR, e.resourceTimingStoreUID);
                        try {
                            b.getResponseHeader("X-FB-Debug") && (e._xFbServer = b.getResponseHeader("X-FB-Debug"), c("fb-error").ErrorXFBDebug.add(e._xFbServer))
                        } catch (a) {}
                        if (b.status >= 200 && b.status < 300) a.lastSuccessTime = Date.now(), e._handleXHRResponse(b);
                        else if (d("UserAgent_DEPRECATED").webkit() && typeof b.status === "undefined") e._invokeErrorHandler(1002);
                        else if (c("AsyncRequestConfig").retryOnNetworkError && s(b) && e.remainingRetries > 0 && !e._requestTimeout) {
                            e.remainingRetries--;
                            delete e.transport;
                            e.send(!0);
                            return
                        } else e._invokeErrorHandler();
                        e.getOption("asynchronous_DEPRECATED") !== !1 && delete e.transport
                    } catch (a) {
                        if (o()) return;
                        delete e.transport;
                        e.remainingRetries > 0 ? (e.remainingRetries--, e.send(!0)) : (e.getOption("suppressErrorAlerts") || c("FBLogger")("AsyncRequest").catching(a).mustfix("AsyncRequest exception when attempting to handle a state change"), e._invokeErrorHandler(1007))
                    }
                };
                this._handleTimeout = function() {
                    e.continuation.last(function() {
                        e._requestTimeout = !0;
                        var a = e.timeoutHandler;
                        e.abandon();
                        a && a(e);
                        c("setTimeout")(function() {
                            c("Arbiter").inform("AsyncRequest/timeout", {
                                request: e
                            })
                        }, 0)
                    })
                };
                this.continuation = c("TimeSlice").getPlaceholderReusableContinuation();
                this.transport = null;
                this.method = "POST";
                this.uri = "";
                this.timeout = null;
                this.timer = null;
                this.initialHandler = c("emptyFunction");
                this.handler = null;
                this.uploadProgressHandler = null;
                this.errorHandler = c("AsyncResponse").defaultErrorHandler;
                this.transportErrorHandler = null;
                this.timeoutHandler = null;
                this.interceptHandler = c("emptyFunction");
                this.finallyHandler = c("emptyFunction");
                this.abortHandler = c("emptyFunction");
                this.serverDialogCancelHandler = null;
                this.relativeTo = null;
                this.statusElement = null;
                this.statusClass = "";
                this.data = {};
                this.headers = {};
                this.file = null;
                this.context = {};
                this.readOnly = !1;
                this.writeRequiredParams = [];
                this.remainingRetries = 0;
                this.userActionID = "-";
                this.resourceTimingStoreUID = d("ResourceTimingsStore").getUID(c("ResourceTypes").XHR, b != null ? b.toString() : "");
                this.flushedResponseTextParseIndex = 0;
                this.option = {
                    asynchronous_DEPRECATED: !0,
                    suppressErrorHandlerWarning: !1,
                    suppressEvaluation: !1,
                    suppressErrorAlerts: !1,
                    retries: 0,
                    bundle: !1,
                    useIframeTransport: !1,
                    handleErrorAfterUnload: !1,
                    useFetchWithIframeFallback: !1
                };
                this.transportErrorHandler = c("bind")(this, "errorHandler");
                b !== void 0 && this.setURI(b);
                this.setAllowCrossPageTransition(c("AsyncRequestConfig").asyncRequestsSurviveTransitionsDefault || !1)
            }
            var f = a.prototype;
            f._dispatchResponse = function(a) {
                this.clearStatusIndicator();
                if (!this._isRelevant()) {
                    this._invokeErrorHandler(m);
                    return
                }
                if (this.initialHandler(a) === !1) return;
                c("clearTimeout")(this.timer);
                var b, d = this.getHandler();
                if (d) try {
                    b = this._shouldSuppressJS(d(a))
                } catch (b) {
                    a.is_last && this.finallyHandler(a);
                    throw b
                }
                b || this._handleJSResponse(a);
                a.is_last && this.finallyHandler(a)
            };
            f._shouldSuppressJS = function(b) {
                return b === a.suppressOnloadToken
            };
            f._handlePreDisplayServerJS = function(a, b) {
                var d = !1,
                    e = [],
                    f = function() {
                        if (d) {
                            c("FBLogger")("AsyncResponse").warn("registerToBlockDisplayUntilDone_DONOTUSE called after AsyncResponse display started. This is a no-op.");
                            return function() {}
                        }
                        var a, b = new(c("Deferred"))();
                        e.push(b.getPromise());
                        return c("TimeSlice").guard(function() {
                            a && c("clearTimeout")(a), b.resolve()
                        }, "AsyncRequestDisplayBlockingEvent", {
                            propagationType: c("TimeSlice").PropagationType.EXECUTION
                        })
                    };
                a.handle(b, {
                    bigPipeContext: {
                        registerToBlockDisplayUntilDone_DONOTUSE: f
                    }
                });
                d = !0;
                return e
            };
            f._hasEvalDomOp = function(a) {
                return a && a.length ? a.some(function(a) {
                    return a[0] === "eval"
                }) : !1
            };
            f._handleJSResponse = function(a) {
                var b = this.getRelativeTo(),
                    e = a.domops,
                    f = a.dtsgToken,
                    g = a.dtsgAsyncGetToken,
                    h = a.jsmods,
                    i = a.savedServerJSInstance;
                i && i instanceof c("ServerJS") ? i = i : i = new(c("ServerJS"))();
                i.setRelativeTo(b);
                if (h) {
                    var j = {
                        define: h.define,
                        instances: h.instances,
                        markup: h.markup
                    };
                    delete h.define;
                    delete h.instances;
                    delete h.markup;
                    this._hasEvalDomOp(e) && (j.elements = h.elements, delete h.elements);
                    i.handle(j)
                }
                j = new(c("URI"))(this.uri);
                (!j.getDomain() && !j.getProtocol() || document.location.origin === j.getOrigin()) && (f && d("DTSG").setToken(f), g && d("DTSG_ASYNC").setToken(g));
                e && c("ErrorGuard").applyWithGuard(function() {
                    return d("AsyncDOM").invoke(e, b)
                }, null, [], {
                    errorType: "warn"
                });
                h && i.handle(h);
                this._handleJSRegisters(a, "onload");
                this._handleJSRegisters(a, "onafterload")
            };
            f._handleJSRegisters = function(a, b) {
                a = a[b];
                if (a)
                    for (b = 0; b < a.length; b++) {
                        var d = null,
                            e = a[b],
                            f = e.match(/^\"caller:([^\"]+?)\";(.*)/);
                        f != null && (d = f[1], e = f[2]);
                        c("ErrorGuard").applyWithGuard(new Function(e), this, []);
                        c("FBLogger")("comet_infra").info("Detected dynamic new Function(...) call in AsyncRequest._handleJSRegisters(...).", new(c("URI"))(this.uri).getPath(), d)
                    }
            };
            f.invokeResponseHandler = function(a) {
                var e = this;
                if (typeof a.redirect !== "undefined") {
                    c("setTimeout")(function() {
                        e.setURI(a.redirect, !0).send()
                    }, 0);
                    return
                }
                if (a.bootloadOnly !== void 0) {
                    var f = typeof a.bootloadOnly === "string" ? JSON.parse(a.bootloadOnly) : a.bootloadOnly,
                        g = function(a) {
                            c("TimeSlice").guard(function() {
                                c("Bootloader").loadPredictedResourceMap(a)
                            }, "Bootloader.loadPredictedResourceMap", {
                                root: !0
                            })()
                        };
                    for (f of f) g(f);
                    return
                }
                if (!this.handler && !this.errorHandler && !this.transportErrorHandler && !this.preBootloadHandler && this.initialHandler === c("emptyFunction") && this.finallyHandler === c("emptyFunction")) return;
                var h = a.asyncResponse;
                if (typeof h !== "undefined") {
                    if (!this._isRelevant()) {
                        this._invokeErrorHandler(m);
                        return
                    }
                    h.updateScriptPath && c("ScriptPath").set(h.updateScriptPath.path, h.updateScriptPath.token, h.updateScriptPath.extra_info);
                    h.lid && (this._responseTime = Date.now(), this.lid = h.lid);
                    d("HasteResponse").handleSRPayload((g = h.hsrp) != null ? g : {});
                    var i, j;
                    if (h.getError() && !h.getErrorIsWarning()) {
                        f = this.getErrorHandler().bind(this);
                        i = c("ErrorGuard").guard(this._dispatchErrorResponse, {
                            name: "AsyncRequest#_dispatchErrorResponse for " + this.getURI()
                        });
                        i = i.bind(this, h, f);
                        j = "error"
                    } else {
                        i = c("ErrorGuard").guard(this._dispatchResponse.bind(this), {
                            name: "AsyncRequest#_dispatchResponse for " + this.getURI()
                        });
                        i = i.bind(this, h);
                        j = "response";
                        g = h.domops;
                        if (!this._delayPreDisplayJS && h.jsmods && h.jsmods.pre_display_requires && !this._hasEvalDomOp(g) && !c("killswitch")("ASYNC_REQUEST_EARLY_RENDERING_OF_PREDISPLAY_PRIORITY_JS")) {
                            f = h.jsmods;
                            g = {
                                define: f.define,
                                instances: f.instances,
                                markup: f.markup
                            };
                            delete f.define;
                            delete f.instances;
                            delete f.markup;
                            g.pre_display_requires = f.pre_display_requires;
                            delete f.pre_display_requires;
                            f = new(c("ServerJS"))();
                            f.setRelativeTo(this.getRelativeTo());
                            h.savedServerJSInstance = f;
                            var k = this._handlePreDisplayServerJS(f, g);
                            if (k && k.length) {
                                var l = i;
                                i = function() {
                                    c("promiseDone")(b("Promise").all(k).then(l))
                                }
                            }
                        }
                    }
                    var n = c("performanceAbsoluteNow")();
                    i = c("executeAfter")(i, function() {
                        c("Arbiter").inform("AsyncRequest/" + j, {
                            request: e,
                            response: h,
                            ts: n
                        })
                    });
                    this.preBootloadHandler && this.preBootloadHandler(h);
                    c("Bootloader").loadResources((f = h.allResources) != null ? f : [], {
                        onAll: c("AsyncRequestConfig").immediateDispatch ? i : function() {
                            c("setTimeout")(i, 0)
                        }
                    })
                } else typeof a.transportError !== "undefined" ? this._xFbServer ? this._invokeErrorHandler(1008) : this._invokeErrorHandler(1012) : this._invokeErrorHandler(1007)
            };
            f._invokeErrorHandler = function(a) {
                var b = this,
                    d = this.transport;
                if (!d) return;
                var e;
                if (this.responseText === "") e = 1002;
                else if (this._requestAborted) e = 1011;
                else {
                    try {
                        e = a || d.status || l
                    } catch (a) {
                        e = 1005
                    }!1 === navigator.onLine && (e = k)
                }
                var f, g;
                a = !0;
                if (e === k) g = i._("No Network Connection"), f = i._("Your browser appears to be offline. Please check your internet connection and try again.");
                else if (e >= 300 && e <= 399) {
                    g = i._("Redirection");
                    f = i._("Your access to Facebook was redirected or blocked by a third party at this time, please contact your ISP or reload.");
                    var h = d.getResponseHeader("Location");
                    h && c("goURI")(h, !0);
                    a = !0
                } else g = i._("Oops"), f = i._("Something went wrong. We're working on getting this fixed as soon as we can. You may be able to try again.");
                var j = new(c("AsyncResponse"))(this, d);
                Object.assign(j, {
                    error: e,
                    errorSummary: g,
                    errorDescription: f,
                    silentError: a
                });
                c("setTimeout")(function() {
                    c("Arbiter").inform("AsyncRequest/error", {
                        request: b,
                        response: j
                    })
                }, 0);
                if (o() && !this.getOption("handleErrorAfterUnload")) return;
                if (!this.transportErrorHandler) {
                    c("FBLogger")("asyncresponse").mustfix("Async request to %s failed with a %d error, but there was no error handler available to deal with it.", this.getURI(), e);
                    return
                }
                h = this.getTransportErrorHandler().bind(this);
                !(this.getOption("suppressErrorAlerts") || n.has(e)) ? c("FBLogger")("asyncresponse").addToCategoryKey(String(e)).mustfix("Async request failed with error %s: %s when requesting %s", e, f.toString(), this.getURI()): n.has(e) && c("FBLogger")("asyncresponse").addToCategoryKey(String(e)).warn("Async request failed with error %s: %s when requesting %s", e, f.toString(), this.getURI());
                c("ErrorGuard").applyWithGuard(this._dispatchErrorResponse, this, [j, h])
            };
            f._isServerDialogErrorCode = function(a) {
                return a == 1357008 || a == 1357007 || a == 1357041 || a == 1442002 || a == 1357001
            };
            f._solveQuicksandChallenge = function(a) {
                var b = this,
                    d = a.getPayload();
                c("Bootloader").loadModules(["QuickSandSolver"], function(a) {
                    a.solveAndSendRequestBack(b, d)
                }, "AsyncRequest")
            };
            f._displayServerDialog = function(a, b, d) {
                var e = this;
                d === void 0 && (d = !1);
                var f = a.getPayload();
                if (f.__dialog !== void 0) {
                    this._displayServerLegacyDialog(a, b);
                    return
                }
                b = f.__dialogx;
                new(c("ServerJS"))().handle(b);
                if (f.__should_use_mwa_reauth === !0) {
                    c("Bootloader").loadModules(["MWADeveloperReauthBarrier"], function(b) {
                        b.registerRequest(f.__dialogID, e, a)
                    }, "AsyncRequest");
                    return
                }
                c("Bootloader").loadModules(["ConfirmationDialog"], function(b) {
                    b.setupConfirmation(a, e, d)
                }, "AsyncRequest")
            };
            f._displayServerLegacyDialog = function(a, b) {
                var d = this,
                    e = a.getPayload().__dialog;
                if (c("gkx")("708253")) {
                    var f;
                    c("FBLogger")("comet_infra").addMetadata("COMET_INFRA", "ERROR_CODE", a.getError().toString()).addMetadata("COMET_INFRA", "ERROR_URL", (f = (f = a.request) == null ? void 0 : f.getURI()) != null ? f : "unknown").mustfix("AsyncRequest._displayServerLegacyDialog called in Comet")
                }
                c("Bootloader").loadModules(["Dialog"], function(c) {
                    c = new c(e);
                    b && c.setHandler(d._displayConfirmationHandler.bind(d, c));
                    c.setCancelHandler(function() {
                        var b = d.getServerDialogCancelHandler();
                        try {
                            b && b(a)
                        } catch (a) {
                            throw a
                        } finally {
                            d.finallyHandler(a)
                        }
                    }).setCausalElement(d.relativeTo).show()
                }, "AsyncRequest")
            };
            f._displayConfirmationHandler = function(a) {
                this.data.confirmed = 1, Object.assign(this.data, a.getFormData()), this.send()
            };
            f._setJSONPTransport = function(a) {
                a.subscribe("response", this._handleJSONPResponse.bind(this)), a.subscribe("abort", this._handleJSONPAbort.bind(this)), this.transport = a
            };
            f._handleJSONPResponse = function(a, b) {
                a = this.transport;
                if (!a) return;
                b.bootloadOnly || (this.is_first = this.is_first === void 0);
                b = this._interpretResponse(b);
                b.asyncResponse && (b.asyncResponse.is_first = this.is_first, b.asyncResponse.is_last = a.hasFinished());
                this.invokeResponseHandler(b);
                a.hasFinished() && delete this.transport
            };
            f._handleJSONPAbort = function() {
                this._invokeErrorHandler(), delete this.transport
            };
            f._handleXHRResponse = function(a) {
                var b;
                if (this.getOption("suppressEvaluation")) b = {
                    asyncResponse: new(c("AsyncResponse"))(this, a)
                };
                else try {
                    this._handleFlushedResponse();
                    a = a.responseText;
                    a = this._filterOutFlushedText(a);
                    a = this._unshieldResponseText(a);
                    a = JSON.parse(a);
                    b = this._interpretResponse(a)
                } catch (a) {
                    b = a.message, c("FBLogger")("async_request").catching(a).warn("Failed to handle response")
                }
                this.invokeResponseHandler(b)
            };
            f._handleFlushedResponse = function() {
                var a = this.flushedResponseHandler,
                    b = this.transport;
                if (a && b) {
                    var c = b.responseText.indexOf(x);
                    c = c === -1 ? b.responseText.length : c;
                    a(b.responseText.substring(this.flushedResponseTextParseIndex, c));
                    this.flushedResponseTextParseIndex = c
                }
            };
            f._unshieldResponseText = function(a) {
                if (a.length <= y) throw new Error("Response too short on async");
                var b = 0;
                while (a.charAt(b) == " " || a.charAt(b) == "\n") b++;
                b && a.substring(b, b + y) == x;
                return a.substring(b + y)
            };
            f._filterOutFlushedText = function(a) {
                if (!this.flushedResponseHandler) return a;
                var b = a.indexOf(x);
                return b < 0 ? a : a.substr(b)
            };
            f._interpretResponse = function(a) {
                if (a.redirect) return {
                    redirect: a.redirect
                };
                if (a.bootloadOnly) return {
                    bootloadOnly: a.bootloadOnly
                };
                var b = a.error && this._isServerDialogErrorCode(a.error);
                this._shouldReplaceTransportMarkers && a.payload && !b && c("replaceTransportMarkers")({
                    relativeTo: this.getRelativeTo(),
                    bigPipeContext: null
                }, a.payload);
                b = new(c("AsyncResponse"))(this);
                if (a.__ar != 1) c("FBLogger")("AsyncRequest").warn("AsyncRequest to endpoint %s returned a JSON response, but it is not properly formatted. The endpoint needs to provide a response using the AsyncResponse class in PHP.", this.getURI()), b.payload = a;
                else {
                    Object.assign(b, a);
                    a = this.transport;
                    a && a.getAllResponseHeaders !== void 0 && (b.responseHeaders = a.getAllResponseHeaders())
                }
                return {
                    asyncResponse: b
                }
            };
            f._isMultiplexable = function() {
                if (this.getOption("useIframeTransport") || this.getOption("useFetchWithIframeFallback")) {
                    c("FBLogger")("AsyncRequest").mustfix("You cannot bundle AsyncRequest that uses iframe transport.");
                    return !1
                }
                if (!c("isFacebookURI")(new(c("URI"))(this.uri))) {
                    c("FBLogger")("AsyncRequest").mustfix("You can not bundle AsyncRequest sent to non-facebook URIs.  Uri: %s", this.getURI());
                    return !1
                }
                if (!this.getOption("asynchronous_DEPRECATED")) {
                    c("FBLogger")("AsyncRequest").mustfix("We cannot bundle synchronous AsyncRequests");
                    return !1
                }
                return !0
            };
            f.handleResponse = function(a) {
                a = this._interpretResponse(a);
                this.invokeResponseHandler(a)
            };
            f.setMethod = function(a) {
                this.method = a.toString().toUpperCase();
                return this
            };
            f.getMethod = function() {
                return this.method
            };
            f.setData = function(a) {
                this.data = a;
                return this
            };
            f.setRequestHeader = function(a, b) {
                this.headers[a] = b;
                return this
            };
            f.setRawData = function(a) {
                this.rawData = a;
                return this
            };
            f.getData = function() {
                return this.data
            };
            f.setContextData = function(a, b, c) {
                c = c === void 0 ? !0 : c;
                c && (this.context["_log_" + a] = b);
                return this
            };
            f._setUserActionID = function() {
                this.userActionID = (d("SessionName").getName() || "-") + "/-"
            };
            f.setURI = function(a, b) {
                b === void 0 && (b = !1);
                typeof a === "string" && a.match(/^\/?u_\d+_\d+/) && c("FBLogger")("asyncrequest").warn("Invalid URI %s", a);
                var e = new(c("URI"))(a);
                if ((this.getOption("useIframeTransport") || this.getOption("useFetchWithIframeFallback")) && !c("isFacebookURI")(e)) {
                    b && j(0, 45284);
                    return this
                }
                if (!this._allowCrossOrigin && !this.getOption("useIframeTransport") && !this.getOption("useFetchWithIframeFallback") && !e.isSameOrigin() && !c("uriIsRelativePath")(e)) {
                    b && j(0, 45285);
                    return this
                }
                this._setUserActionID();
                if (!a || e.isEmpty()) {
                    c("FBLogger")("async_request").mustfix("URI cannot be empty");
                    return this
                }
                this.uri = d("ZeroRewrites").rewriteURI(e);
                return this
            };
            f.getURI = function() {
                return this.uri.toString()
            };
            f.delayPreDisplayJS = function(a) {
                a === void 0 && (a = !0);
                this._delayPreDisplayJS = a;
                return this
            };
            f.setInitialHandler = function(a) {
                this.initialHandler = a;
                return this
            };
            f.setPayloadHandler = function(a) {
                this.setHandler(function(b) {
                    a(b.payload)
                });
                return this
            };
            f.setHandler = function(a) {
                t(a) && (this.handler = a);
                return this
            };
            f.setFlushedResponseHandler = function(a) {
                t(a) && (this.flushedResponseHandler = a);
                return this
            };
            f.getHandler = function() {
                return this.handler || c("emptyFunction")
            };
            f.setProgressHandler = function(a) {
                t(a) && (this.progressHandler = a);
                return this
            };
            f.setUploadProgressHandler = function(a) {
                t(a) && (this.uploadProgressHandler = a);
                return this
            };
            f.setErrorHandler = function(a) {
                t(a) && (this.errorHandler = a);
                return this
            };
            f.setTransportErrorHandler = function(a) {
                this.transportErrorHandler = a;
                return this
            };
            f.getErrorHandler = function() {
                return this.errorHandler || c("emptyFunction")
            };
            f.getTransportErrorHandler = function() {
                return this.transportErrorHandler || c("emptyFunction")
            };
            f.setTimeoutHandler = function(a, b) {
                t(b) && (this.timeout = a, this.timeoutHandler = b);
                return this
            };
            f.resetTimeout = function(a) {
                if (!(this.timeoutHandler === null))
                    if (a === null) this.timeout = null, c("clearTimeout")(this.timer), this.timer = null;
                    else {
                        var b = !this._allowCrossPageTransition;
                        this.timeout = a;
                        c("clearTimeout")(this.timer);
                        b ? this.timer = c("setTimeout")(this._handleTimeout.bind(this), this.timeout) : this.timer = c("setTimeoutAcrossTransitions")(this._handleTimeout.bind(this), this.timeout)
                    }
                return this
            };
            f.setNewSerial = function() {
                this.id = ++u;
                return this
            };
            f.setInterceptHandler = function(a) {
                this.interceptHandler = a;
                return this
            };
            f.setFinallyHandler = function(a) {
                this.finallyHandler = a;
                return this
            };
            f.setAbortHandler = function(a) {
                this.abortHandler = a;
                return this
            };
            f.getServerDialogCancelHandler = function() {
                return this.serverDialogCancelHandler
            };
            f.setServerDialogCancelHandler = function(a) {
                this.serverDialogCancelHandler = a;
                return this
            };
            f.setPreBootloadHandler = function(a) {
                this.preBootloadHandler = a;
                return this
            };
            f.setReadOnly = function(a) {
                typeof a !== "boolean" || (this.readOnly = a);
                return this
            };
            f.getReadOnly = function() {
                return this.readOnly
            };
            f.setRelativeTo = function(a) {
                this.relativeTo = a;
                return this
            };
            f.getRelativeTo = function() {
                return this.relativeTo
            };
            f.setStatusClass = function(a) {
                this.statusClass = a;
                return this
            };
            f.setStatusElement = function(a) {
                this.statusElement = a;
                return this
            };
            f.getStatusElement = function() {
                return c("ge")(this.statusElement)
            };
            f._isRelevant = function() {
                if (this._allowCrossPageTransition) return !0;
                return !this.id ? !0 : this.id > v
            };
            f.clearStatusIndicator = function() {
                var a = this.getStatusElement();
                a && (d("CSS").removeClass(a, "async_saving"), d("CSS").removeClass(a, this.statusClass))
            };
            f._addStatusIndicator = function() {
                var a = this.getStatusElement();
                a && (d("CSS").addClass(a, "async_saving"), d("CSS").addClass(a, this.statusClass))
            };
            f.specifiesWriteRequiredParams = function() {
                var a = this;
                return this.writeRequiredParams.every(function(b) {
                    a.data[b] = a.data[b] || c("Env")[b] || (c("ge")(b) || {}).value;
                    return a.data[b] !== void 0 ? !0 : !1
                })
            };
            f.setOption = function(a, b) {
                typeof this.option[a] !== "undefined" && (this.option[a] = b);
                return this
            };
            f.getOption = function(a) {
                typeof this.option[a] === "undefined";
                return this.option[a]
            };
            f.abort = function() {
                var a = this;
                this.continuation.last(function() {
                    var b = a.transport;
                    if (b) {
                        var d = a.getTransportErrorHandler();
                        a.setOption("suppressErrorAlerts", !0);
                        a.setTransportErrorHandler(c("emptyFunction"));
                        a._requestAborted = !0;
                        b.abort();
                        a.setTransportErrorHandler(d)
                    }
                    a.abortHandler();
                    C.unschedule(a)
                })
            };
            f.abandon = function() {
                var a = this;
                this.continuation.last(function() {
                    c("clearTimeout")(a.timer);
                    a.setOption("suppressErrorAlerts", !0).setHandler(c("emptyFunction")).setErrorHandler(c("emptyFunction")).setTransportErrorHandler(c("emptyFunction")).setProgressHandler(c("emptyFunction")).setUploadProgressHandler(c("emptyFunction"));
                    var b = a.transport;
                    b && (a._requestAborted = !0, p(b) && delete b.onprogress, q(b) && delete b.upload.onprogress, b.abort());
                    a.abortHandler();
                    C.unschedule(a)
                })
            };
            f.setNectarModuleDataSafe = function(a) {
                var b = this.setNectarModuleData;
                b && b.call(this, a);
                return this
            };
            f.setAllowCrossPageTransition = function(a) {
                this._allowCrossPageTransition = !!a;
                this.timer && this.resetTimeout(this.timeout);
                return this
            };
            f.getAllowIrrelevantRequests = function() {
                return this._allowIrrelevantRequests
            };
            f.setAllowIrrelevantRequests = function(a) {
                this._allowIrrelevantRequests = a;
                return this
            };
            f.setAllowCrossOrigin = function(a) {
                this._allowCrossOrigin = a;
                return this
            };
            f.setAllowCredentials = function(a) {
                this._allowCredentials = a;
                return this
            };
            f.setIsBackgroundRequest = function(a) {
                this._isBackgroundRequest = a;
                return this
            };
            f.setReplaceTransportMarkers = function(a) {
                a === void 0 && (a = !0);
                this._shouldReplaceTransportMarkers = a;
                return this
            };
            f.sendAndReturnAbortHandler = function() {
                var a = this;
                this.send();
                return function() {
                    return a.abort()
                }
            };
            f.send = function(b) {
                var f = this;
                b = b || !1;
                if (!this.uri) return !1;
                this.errorHandler || !this.getOption("suppressErrorHandlerWarning");
                (this.getOption("useIframeTransport") || this.getOption("useFetchWithIframeFallback")) && this.method != "GET" && this.setMethod("GET");
                this.timeoutHandler !== null && (this.getOption("useIframeTransport") || this.getOption("useFetchWithIframeFallback"));
                if (!this.getReadOnly()) {
                    this.specifiesWriteRequiredParams();
                    if (this.method != "POST") return !1
                }
                if (document.location.search.toString().includes(this.uri.toString())) return !1;
                if (this.uri.toString().includes("/../") || this.uri.toString().includes("\\../") || this.uri.toString().includes("/..\\") || this.uri.toString().includes("\\..\\")) return !1;
                Object.assign(this.data, c("getAsyncParams")(this.method));
                c("isEmpty")(this.context) || (Object.assign(this.data, this.context), this.data.ajax_log = 1);
                c("Env").force_param && Object.assign(this.data, c("Env").force_param);
                this._setUserActionID();
                if (this.getOption("bundle") && this._isMultiplexable()) {
                    C.schedule(this);
                    return !0
                }
                this.setNewSerial();
                this.getOption("asynchronous_DEPRECATED") || this.uri.addQueryData({
                    __sjax: 1
                });
                c("Arbiter").inform("AsyncRequest/send", {
                    request: this,
                    ts: c("performanceAbsoluteNow")()
                });
                var g, h;
                this.method == "GET" && this.uri.addQueryData({
                    fb_dtsg_ag: d("DTSG_ASYNC").getToken()
                });
                this.method == "GET" || this.rawData ? (g = this.uri.addQueryData(this.data).toString(), h = this.rawData || "") : (this._allowCrossOrigin && this.uri.addQueryData({
                    __a: 1
                }), g = this.uri.toString(), h = d("PHPQuerySerializer").serialize(this.data));
                if (this.transport) return !1;
                if (this.getOption("useFetchWithIframeFallback")) try {
                    var i = new(c("FetchStreamTransport"))(this.uri);
                    this._setJSONPTransport(i);
                    this._markRequestSent();
                    i.send();
                    this.setOption("useIframeTransport", !1);
                    return !0
                } catch (a) {
                    this.setOption("useFetchWithIframeFallback", !1), this.setOption("useIframeTransport", !0)
                }
                if (this.getOption("useIframeTransport")) {
                    e(["JSONPTransport"], function(a) {
                        a = new a(f.uri);
                        f._setJSONPTransport(a);
                        f._markRequestSent();
                        a.send()
                    });
                    return !0
                }
                this.flushedResponseHandler && (this.flushedResponseTextParseIndex = 0);
                var j = d("ZeroRewrites").getTransportBuilderForURI(this.uri)();
                if (!j) return !1;
                this.schedule("AsyncRequest.send");
                j.onreadystatechange = function() {
                    var a = f.transport;
                    a && a.readyState >= 2 && a.readyState <= 3 && f._handleFlushedResponse();
                    j.readyState === 4 && f.continuation.last(f._onStateChange)
                };
                this.progressHandler && p(j) && (j.onprogress = function() {
                    for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++) b[c] = arguments[c];
                    f.continuation(function() {
                        f.progressHandler && f.progressHandler.apply(f, b)
                    })
                });
                this.uploadProgressHandler && q(j) && (j.upload.onprogress = function() {
                    for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++) b[c] = arguments[c];
                    f.continuation(function() {
                        f.uploadProgressHandler && f.uploadProgressHandler.apply(f, b)
                    })
                });
                b || (this.remainingRetries = this.getOption("retries"));
                this.transport = j;
                try {
                    j.open(this.method, g, c("gkx")("1857581") ? !0 : this.getOption("asynchronous_DEPRECATED"))
                } catch (a) {
                    return !1
                }
                if (!this.uri.isSameOrigin() && !c("uriIsRelativePath")(this.uri) && !this.getOption("useIframeTransport") && !this.getOption("useFetchWithIframeFallback")) {
                    if (!r(j)) return !1;
                    this._canSendCredentials() && (j.withCredentials = !0)
                }
                this.method == "POST" && !this.rawData && j.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                this._isBackgroundRequest && j.setRequestHeader("X_FB_BACKGROUND_STATE", "1");
                var k = c("getAsyncHeaders")(this.uri);
                Object.keys(k).forEach(function(a) {
                    j && j.setRequestHeader(a, k[a])
                });
                c("Arbiter").inform("AsyncRequest/will_send", {
                    request: this
                });
                if (j)
                    for (i in this.headers) Object.prototype.hasOwnProperty.call(this.headers, i) && j.setRequestHeader(i, this.headers[i]);
                this._addStatusIndicator();
                this._markRequestSent();
                j.send(h);
                this.timeout !== null && this.resetTimeout(this.timeout);
                a._inflightCount++;
                return !0
            };
            f.schedule = function(a) {
                this.continuation = c("TimeSlice").getReusableContinuation(a)
            };
            f._canSendCredentials = function() {
                if (this._allowCredentials === !1) return !1;
                var a = new(c("URI"))(this.uri);
                return c("isBulletinDotComURI")(a) || c("isFacebookURI")(a) || c("isInternalFBURI")(a) || c("isMessengerDotComURI")(a) || c("isWorkplaceDotComURI")(a) || c("isWorkroomsDotComURI")(a) || c("isWorkDotMetaDotComURI")(a) || c("isHorizonDotMetaDotComURI")(a) || c("isSparkDotMetaDotComURI")(a)
            };
            f._markRequestSent = function() {
                var a = new(c("URI"))(this.getURI()).getQualifiedURI().toString();
                d("ResourceTimingsStore").updateURI(c("ResourceTypes").XHR, this.resourceTimingStoreUID, a);
                d("ResourceTimingsStore").annotate(c("ResourceTypes").XHR, this.resourceTimingStoreUID).addStringAnnotation("uri", a);
                d("ResourceTimingsStore").measureRequestSent(c("ResourceTypes").XHR, this.resourceTimingStoreUID)
            };
            f.promisePayload = function(a) {
                return this.exec().then(function(a) {
                    return a.payload
                }, function(a) {
                    throw a.toError()
                })
            };
            f.exec = function(a) {
                var d = this;
                if (this.getHandler() !== c("emptyFunction") || this.getErrorHandler() !== c("AsyncResponse").defaultErrorHandler) throw new Error("exec is an async function and does not allow previously set handlers");
                return new(b("Promise"))(function(b, c) {
                    d.setHandler(b).setErrorHandler(c).send(a)
                })
            };
            a.bootstrap = function(b, e, f) {
                var g = "GET",
                    h = !0,
                    i = {};
                (f || e && e.rel == "async-post") && (g = "POST", h = !1, b && (b = new(c("URI"))(b), i = b.getQueryData(), b.setQueryData({})));
                f = d("Parent").byClass(e, "stat_elem") || e;
                if (f && d("CSS").hasClass(f, "async_saving")) return !1;
                b = new a(b).setReadOnly(h).setMethod(g).setData(i).setNectarModuleDataSafe(e).setRelativeTo(e);
                e && (b.setHandler(function(a) {
                    c("Event").fire(e, "success", {
                        response: a
                    })
                }), b.setErrorHandler(function(a) {
                    c("Event").fire(e, "error", {
                        response: a
                    }) !== !1 && c("AsyncResponse").defaultErrorHandler(a)
                }));
                if (f instanceof HTMLElement) {
                    b.setStatusElement(f);
                    h = f.getAttribute("data-status-class");
                    h && b.setStatusClass(h)
                }
                b.send();
                return !1
            };
            a.bootstrap_UNSAFE_LET_ANYONE_IMPERSONATE_THE_USER_FOR_THESE_WRITES = function(b, c, d) {
                a.bootstrap(b, c, d)
            };
            a.post = function(b, c) {
                new a(b).setReadOnly(!1).setMethod("POST").setData(c).send();
                return !1
            };
            a.post_UNSAFE_LET_ANYONE_IMPERSONATE_THE_USER_FOR_THESE_WRITES = function(b, c) {
                a.post(b, c)
            };
            a.getLastID = function() {
                return u
            };
            a.ignoreUpdate = function() {
                w = !0
            };
            a.getInflightCount = function() {
                return this._inflightCount
            };
            return a
        }();
    z._inflightCount = 0;
    var A, B = [],
        C = function() {
            function a() {
                this._requests = []
            }
            var b = a.prototype;
            b.add = function(a) {
                this._requests.push(a)
            };
            b.remove = function(a) {
                var b = this._requests,
                    c = this._requestsSent;
                for (var d = 0, e = b.length; d < e; d++) b[d] === a && (c ? b[d] = null : b.splice(d, 1))
            };
            b.send = function() {
                this._requestsSent && j(0, 4390);
                this._requestsSent = !0;
                this._wrapperRequest = null;
                var a = this._requests;
                if (!a.length) return;
                var b;
                if (a.length === 1) b = a[0];
                else {
                    a = a.filter(Boolean).map(function(a) {
                        return [a.uri.getPath(), d("PHPQuerySerializer").serialize(a.data)]
                    });
                    b = this._wrapperRequest = new z("/ajax/proxy.php").setAllowCrossPageTransition(!0).setData({
                        data: a
                    }).setHandler(this._handler.bind(this)).setTransportErrorHandler(this._transportErrorHandler.bind(this))
                }
                b && b.setOption("bundle", !1).send()
            };
            b._handler = function(a) {
                var b = this,
                    c = a.getPayload().responses;
                if (c.length !== this._requests.length) return;
                a = function(a) {
                    var d = b._requests[a];
                    if (!d) return "continue";
                    var e = d.uri.getPath();
                    b._wrapperRequest && (d.id = b._wrapperRequest.id);
                    if (c[a][0] !== e) {
                        d.continuation.last(function() {
                            d.invokeResponseHandler({
                                transportError: "Wrong response order in bundled request to " + e
                            })
                        });
                        return "continue"
                    }
                    d.continuation.last(function() {
                        d.handleResponse(c[a][1])
                    })
                };
                for (var d = 0; d < this._requests.length; d++) {
                    var e = a(d);
                    if (e === "continue") continue
                }
                B.splice(B.indexOf(this, 1))
            };
            b._transportErrorHandler = function(a) {
                var b = this,
                    c = {
                        transportError: a.errorDescription
                    };
                a = this._requests.filter(Boolean).map(function(a) {
                    b._wrapperRequest && (a.id = b._wrapperRequest.id);
                    a.invokeResponseHandler(c);
                    return a.uri.getPath()
                })
            };
            a.schedule = function(b) {
                b.schedule("AsyncMultiplex.schedule");
                A || (A = new a(), B.push(A), c("TimeSlice").guard(function() {
                    c("setTimeoutAcrossTransitions")(function() {
                        A && (A.send(), A = null)
                    }, 0)
                }, "AsyncMultiplex.schedule", {
                    propagationType: c("TimeSlice").PropagationType.ORPHAN
                })());
                A.add(b);
                return A
            };
            a.unschedule = function(a) {
                B.forEach(function(b) {
                    b.remove(a)
                })
            };
            return a
        }();
    z.suppressOnloadToken = {};
    a.AsyncRequest = z;
    g["default"] = z
}), 98);
__d("CometLruCache", ["recoverableViolation"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = function() {
        function a(a) {
            this.$1 = a, a <= 0 && c("recoverableViolation")("CometLruCache: Unable to create instance of cache with zero or negative capacity.", "CometLruCache"), this.$2 = new Map()
        }
        var b = a.prototype;
        b.set = function(a, b) {
            this.$2["delete"](a);
            this.$2.set(a, b);
            if (this.$2.size > this.$1) {
                a = this.$2.keys().next();
                a.done || this.$2["delete"](a.value)
            }
        };
        b.get = function(a) {
            var b = this.$2.get(a);
            b != null && (this.$2["delete"](a), this.$2.set(a, b));
            return b
        };
        b.has = function(a) {
            return this.$2.has(a)
        };
        b["delete"] = function(a) {
            this.$2["delete"](a)
        };
        b.size = function() {
            return this.$2.size
        };
        b.capacity = function() {
            return this.$1 - this.$2.size
        };
        b.clear = function() {
            this.$2.clear()
        };
        return a
    }();

    function a(a) {
        return new h(a)
    }
    g.create = a
}), 98);
__d("ConstUriUtils", ["CometLruCache", "ExecutionEnvironment", "FBLogger", "PHPQuerySerializer", "PHPQuerySerializerNoEncoding", "URIRFC3986", "URISchemes", "UriNeedRawQuerySVConfig", "isSameOrigin", "recoverableViolation"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = d("CometLruCache").create(5e3),
        i = new RegExp("(^|\\.)facebook\\.com$", "i"),
        j = new RegExp("^(?:[^/]*:|[\\x00-\\x1f]*/[\\x00-\\x1f]*/)"),
        k = new RegExp("[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]"),
        l = c("UriNeedRawQuerySVConfig").uris.map(function(a) {
            return {
                domain: a,
                valid: r(a)
            }
        }),
        m = [];

    function n(a, b) {
        var d = {};
        if (a != null)
            for (var a = a.entries(), e = Array.isArray(a), f = 0, a = e ? a : a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                var g;
                if (e) {
                    if (f >= a.length) break;
                    g = a[f++]
                } else {
                    f = a.next();
                    if (f.done) break;
                    g = f.value
                }
                g = g;
                d[g[0]] = g[1]
            } else c("FBLogger")("ConstUriUtils").warn("Passed a null query map in, this means poor client side flow coverage or client/server boundary type issue.");
        return b.serialize(d)
    }

    function o(a, b, d) {
        var e = c("PHPQuerySerializer");
        if (["http", "https"].includes(b) && p(a)) {
            if (a.includes("doubleclick.net") && d != null && !d.startsWith("http")) return e;
            e = c("PHPQuerySerializerNoEncoding")
        }
        return e
    }

    function p(a) {
        return a != null && l.some(function(b) {
            return b.valid && q(a, b.domain)
        })
    }

    function q(a, b) {
        if (b === "" || a === "") return !1;
        if (a.endsWith(b)) {
            b = a.length - b.length - 1;
            if (b === -1 || a[b] === ".") return !0
        }
        return !1
    }

    function r(a) {
        return !k.test(a)
    }

    function s(a, b) {
        var c = b.protocol != null && b.protocol !== "" ? b.protocol : a.getProtocol();
        c = b.domain != null ? o(b.domain, c) : a.getSerializer();
        c = {
            domain: a.getDomain(),
            fragment: a.getFragment(),
            fragmentSeparator: a.hasFragmentSeparator(),
            isGeneric: a.isGeneric(),
            originalRawQuery: a.getOriginalRawQuery(),
            path: a.getPath(),
            port: a.getPort(),
            protocol: a.getProtocol(),
            queryParams: a.getQueryParams(),
            serializer: c,
            subdomain: a.getSubdomain()
        };
        a = babelHelpers["extends"]({}, c, b);
        c = b.queryParams != null && b.queryParams.size !== 0;
        return x.getUribyObject(a, c)
    }

    function t(a, b, c, d) {
        c === void 0 && (c = !1);
        var e = a.protocol !== "" ? a.protocol + ":" + (a.isGeneric ? "" : "//") : "",
            f = a.domain !== "" ? a.domain : "",
            g = a.port !== "" ? ":" + a.port : "",
            h = a.path !== "" ? a.path : e !== "" && e !== "mailto:" || f !== "" || g !== "" ? "/" : "";
        c = u(f, a.originalRawQuery, a.queryParams, b, c, (b = d) != null ? b : a.serializer);
        d = c.length > 0 ? "?" : "";
        b = a.fragment !== "" ? "#" + a.fragment : "";
        a = a.fragment === "" && a.fragmentSeparator ? "#" : "";
        return "" + e + f + g + h + d + c + a + b
    }

    function u(a, b, c, d, e, f) {
        e === void 0 && (e = !1);
        if (!d && (e || p(a))) {
            return (d = b) != null ? d : ""
        }
        return n(c, f)
    }

    function v(a) {
        var b = a.trim();
        b = d("URIRFC3986").parse(b) || {
            fragment: null,
            host: null,
            isGenericURI: !1,
            query: null,
            scheme: null,
            userinfo: null
        };
        var c = b.host || "",
            e = c.split(".");
        e = e.length >= 3 ? e[0] : "";
        var f = o(c, b.scheme || "", b.query),
            g = f.deserialize(b.query || "") || {};
        g = new Map(Object.entries(g));
        g = w({
            domain: c,
            fragment: b.fragment || "",
            fragmentSeparator: b.fragment === "",
            isGeneric: b.isGenericURI,
            originalRawQuery: b.query,
            path: b.path || "",
            port: b.port != null ? String(b.port) : "",
            protocol: (b.scheme || "").toLowerCase(),
            queryParams: g,
            serializer: f,
            subdomain: e,
            userInfo: (c = b == null ? void 0 : b.userinfo) != null ? c : ""
        }, a);
        return g
    }

    function w(a, b) {
        var c = {
                components: babelHelpers["extends"]({}, a),
                error: "",
                valid: !0
            },
            e = c.components;
        if (!d("URISchemes").isAllowed(a.protocol)) {
            c.valid = !1;
            c.error = 'The URI protocol "' + String(a.protocol) + '" is not allowed.';
            return c
        }
        if (!r(a.domain || "")) {
            c.valid = !1;
            c.error = "This is an unsafe domain " + String(a.domain);
            return c
        }
        e.port = a.port != null && String(a.port) || "";
        if (Boolean(a.userInfo)) {
            c.valid = !1;
            c.error = "Invalid URI: (userinfo is not allowed in a URI " + String(a.userInfo) + ")";
            return c
        }
        a = b != null && b !== "" ? b : t(e, !1);
        if (e.domain === "" && e.path.indexOf("\\") !== -1) {
            c.valid = !1;
            c.error = "Invalid URI: (no domain but multiple back-slashes " + a + ")";
            return c
        }
        if (!e.protocol && j.test(a)) {
            c.valid = !1;
            c.error = "Invalid URI: (unsafe protocol-relative URI " + a + ")";
            return c
        }
        if (e.domain !== "" && e.path !== "" && !e.path.startsWith("/")) {
            c.valid = !1;
            c.error = "Invalid URI: (domain and pathwhere path lacks leading slash " + a + ")";
            return c
        }
        return c
    }
    var x = function() {
        function a(a) {
            this.queryParams = new Map(), this.domain = a.domain, this.fragment = a.fragment, this.fragmentSeparator = Boolean(a.fragmentSeparator), this.isGenericProtocol = Boolean(a.isGeneric), this.path = a.path, this.originalRawQuery = a.originalRawQuery, this.port = a.port, this.protocol = a.protocol, this.queryParams = a.queryParams, this.serializer = a.serializer, this.subdomain = a.subdomain
        }
        var b = a.prototype;
        b.addQueryParam = function(a, b) {
            if (Boolean(a)) {
                var c = this.getQueryParams();
                c.set(a, b);
                return s(this, {
                    queryParams: c
                })
            }
            return this
        };
        b.addQueryParams = function(a) {
            if (a.size > 0) {
                var b = this.getQueryParams();
                a.forEach(function(a, c) {
                    b.set(c, a)
                });
                return s(this, {
                    queryParams: b
                })
            }
            return this
        };
        b.addQueryParamString = function(a) {
            if (Boolean(a)) {
                a = a.startsWith("?") ? a.slice(1) : a;
                var b = this.getQueryParams();
                a.split("&").map(function(a) {
                    a = a.split("=");
                    var c = a[0];
                    a = a[1];
                    b.set(c, a)
                });
                return s(this, {
                    queryParams: b
                })
            }
            return this
        };
        b.addTrailingSlash = function() {
            var a = this.getPath();
            return a.length > 0 && a[a.length - 1] !== "/" ? this.setPath(a + "/") : this
        };
        b.getDomain = function() {
            return this.domain
        };
        b.getFragment = function() {
            return this.fragment
        };
        b.getOrigin = function() {
            var a = this.getPort();
            return this.getProtocol() + "://" + this.getDomain() + (a ? ":" + a : "")
        };
        b.getOriginalRawQuery = function() {
            return this.originalRawQuery
        };
        b.getPath = function() {
            return this.path
        };
        b.getPort = function() {
            return this.port
        };
        b.getProtocol = function() {
            return this.protocol.toLowerCase()
        };
        b.getQualifiedUri = function() {
            if (!this.getDomain()) {
                var b = (typeof window !== "undefined" ? window : self).location.href;
                c("ExecutionEnvironment").isInWorker && b && b.startsWith("blob:") && (b = b.substring(5, b.length));
                b = b.slice(0, b.indexOf("/", b.indexOf(":") + 3));
                return a.getUri(b + this.toString())
            }
            return this
        };
        b.getQueryParam = function(a) {
            a = this.queryParams.get(a);
            if (typeof a === "string") return a;
            else {
                a = JSON.stringify(a);
                return a == null ? a : JSON.parse(a)
            }
        };
        b.getQueryData = function() {
            return Object.fromEntries(this.getQueryParams())
        };
        b.getQueryParams = function() {
            return new Map(JSON.parse(JSON.stringify(Array.from(this.queryParams))))
        };
        b.getQueryString = function(a) {
            a === void 0 && (a = !1);
            return u(this.domain, this.originalRawQuery, this.queryParams, !1, a, this.serializer)
        };
        b.getRegisteredDomain = function() {
            if (!this.getDomain()) return "";
            if (!this.isFacebookUri()) return null;
            var a = this.getDomain().split("."),
                b = a.indexOf("facebook");
            b === -1 && (b = a.indexOf("workplace"));
            return a.slice(b).join(".")
        };
        b.getSerializer = function() {
            return this.serializer
        };
        b.getSubdomain = function() {
            return this.subdomain
        };
        b.getUnqualifiedUri = function() {
            if (this.getDomain()) {
                var b = this.toString();
                return a.getUri(b.slice(b.indexOf("/", b.indexOf(":") + 3)))
            }
            return this
        };
        a.getUri = function(b) {
            b = b.trim();
            var d = h.get(b);
            if (d == null) {
                var e = v(b);
                if (e.valid) d = new a(e.components), h.set(b, d);
                else {
                    c("FBLogger")("ConstUriUtils").blameToPreviousFrame().warn(e.error);
                    return null
                }
            }
            return d
        };
        a.getUribyObject = function(b, d) {
            var e = t(b, d),
                f = h.get(e);
            if (f == null) {
                d && (b.originalRawQuery = n(b.queryParams, b.serializer));
                d = w(b);
                if (d.valid) f = new a(d.components), h.set(e, f);
                else {
                    c("recoverableViolation")(d.error, "ConstUri");
                    return null
                }
            }
            return f
        };
        b.hasFragmentSeparator = function() {
            return this.fragmentSeparator
        };
        b.isEmpty = function() {
            return !(this.getPath() || this.getProtocol() || this.getDomain() || this.getPort() || this.queryParams.size > 0 || this.getFragment())
        };
        b.isFacebookUri = function() {
            var a = this.toString();
            if (a === "") return !1;
            return !this.getDomain() && !this.getProtocol() ? !0 : ["https", "http"].indexOf(this.getProtocol()) !== -1 && i.test(this.getDomain())
        };
        b.isGeneric = function() {
            return this.isGenericProtocol
        };
        b.isSameOrigin = function(a) {
            return c("isSameOrigin")(this, a)
        };
        b.isSubdomainOfDomain = function(b) {
            var c = a.getUri(b);
            return c != null && q(this.domain, b)
        };
        b.isSecure = function() {
            return this.getProtocol() === "https"
        };
        b.removeQueryParams = function(a) {
            if (Array.isArray(a) && a.length > 0) {
                var b = this.getQueryParams();
                a.map(function(a) {
                    return b["delete"](a)
                });
                return s(this, {
                    queryParams: b
                })
            }
            return this
        };
        b.removeQueryParam = function(a) {
            if (Boolean(a)) {
                var b = this.getQueryParams();
                b["delete"](a);
                return s(this, {
                    queryParams: b
                })
            }
            return this
        };
        b.replaceQueryParam = function(a, b) {
            if (Boolean(a)) {
                var c = this.getQueryParams();
                c.set(a, b);
                return s(this, {
                    queryParams: c
                })
            }
            return this
        };
        b.replaceQueryParams = function(a) {
            return s(this, {
                queryParams: a
            })
        };
        b.replaceQueryParamString = function(a) {
            if (a != null) {
                a = a.startsWith("?") ? a.slice(1) : a;
                var b = this.getQueryParams();
                a.split("&").map(function(a) {
                    a = a.split("=");
                    var c = a[0];
                    a = a[1];
                    b.set(c, a)
                });
                return s(this, {
                    queryParams: b
                })
            }
            return this
        };
        b.setDomain = function(a) {
            if (Boolean(a)) {
                var b = a.split(".");
                b = b.length >= 3 ? b[0] : "";
                return s(this, {
                    domain: a,
                    subdomain: b
                })
            }
            return this
        };
        b.setFragment = function(a) {
            return a === "#" ? s(this, {
                fragment: "",
                fragmentSeparator: !0
            }) : s(this, {
                fragment: a,
                fragmentSeparator: a !== ""
            })
        };
        b.setPath = function(a) {
            return a != null ? s(this, {
                path: a
            }) : this
        };
        b.setPort = function(a) {
            return Boolean(a) ? s(this, {
                port: a
            }) : this
        };
        b.setProtocol = function(a) {
            return Boolean(a) ? s(this, {
                protocol: a
            }) : this
        };
        b.setSecure = function(a) {
            return this.setProtocol(a ? "https" : "http")
        };
        b.setSubDomain = function(a) {
            if (Boolean(a)) {
                var b = this.domain.split(".");
                b.length >= 3 ? b[0] = a : b.unshift(a);
                return s(this, {
                    domain: b.join("."),
                    subdomain: a
                })
            }
            return this
        };
        b.stripTrailingSlash = function() {
            return this.setPath(this.getPath().replace(/\/$/, ""))
        };
        a.$1 = function(a) {
            a = a;
            for (var b = 0; b < m.length; b++) {
                var c = m[b];
                a = c(a)
            }
            return a
        };
        b.$2 = function(b, c) {
            c === void 0 && (c = !1);
            return t({
                domain: a.$1(this.domain),
                fragment: this.fragment,
                fragmentSeparator: this.fragmentSeparator,
                isGeneric: this.isGenericProtocol,
                originalRawQuery: this.originalRawQuery,
                path: this.path,
                port: this.port,
                protocol: this.protocol,
                queryParams: this.queryParams,
                serializer: b,
                subdomain: this.subdomain,
                userInfo: ""
            }, !1, c)
        };
        b.toStringRawQuery = function() {
            this.rawStringValue == null && (this.rawStringValue = this.$2(c("PHPQuerySerializerNoEncoding")));
            return this.rawStringValue
        };
        b.toString = function() {
            this.stringValue == null && (this.stringValue = this.$2(this.serializer));
            return this.stringValue
        };
        b.toStringPreserveQuery = function() {
            return this.$2(this.serializer, !0)
        };
        a.isValidUri = function(b) {
            var c = h.get(b);
            if (c != null) return !0;
            c = v(b);
            if (c.valid) {
                h.set(b, new a(c.components));
                return !0
            }
            return !1
        };
        return a
    }();

    function a(a) {
        if (a instanceof x) return a;
        else return null
    }

    function b(a) {
        m.push(a)
    }
    e = x.getUri;
    f = x.isValidUri;
    g.isSubdomainOfDomain = q;
    g.isConstUri = a;
    g.registerDomainFilter = b;
    g.getUri = e;
    g.isValidUri = f
}), 98);
__d("routeBuilderUtils", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        a = a.split("/");
        return a.filter(function(a) {
            return a !== ""
        }).map(function(a) {
            var b = a.split(/{|}/);
            if (b.length < 3) return {
                isToken: !1,
                part: a
            };
            else {
                a = b[0];
                var c = b[1];
                b = b[2];
                var d = c[0] === "?",
                    e = c[d ? 1 : 0] === "*";
                c = c.substring((d ? 1 : 0) + (e ? 1 : 0));
                return {
                    isToken: !0,
                    optional: d,
                    catchAll: e,
                    prefix: a,
                    suffix: b,
                    token: c
                }
            }
        })
    }
    f.getPathParts = a
}), 66);
__d("jsRouteBuilder", ["ConstUriUtils", "FBLogger", "routeBuilderUtils"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = "#";

    function a(a, b, e, f, g) {
        g === void 0 && (g = !1);
        var i = d("routeBuilderUtils").getPathParts(a);

        function j(j) {
            try {
                var k = f != null ? babelHelpers["extends"]({}, f, j) : (j = j) != null ? j : {},
                    l = {};
                j = "";
                var m = !1;
                j = i.reduce(function(a, c) {
                    if (!c.isToken) return a + "/" + c.part;
                    else {
                        var d, e = c.optional,
                            f = c.prefix,
                            g = c.suffix;
                        c = c.token;
                        if (e && m) return a;
                        d = (d = k[c]) != null ? d : b[c];
                        if (d == null && e) {
                            m = !0;
                            return a
                        }
                        if (d == null) throw new Error("Missing required template parameter: " + c);
                        if (d === "") throw new Error("Required template parameter is an empty string: " + c);
                        l[c] = !0;
                        return a + "/" + f + d + g
                    }
                }, "");
                a.slice(-1) === "/" && (j += "/");
                j === "" && (j = "/");
                var n = d("ConstUriUtils").getUri(j);
                for (var o in k) {
                    var p = k[o];
                    !l[o] && p != null && n != null && (e != null && e.has(o) ? p !== !1 && (n = n.addQueryParam(o, null)) : n = n.addQueryParam(o, p))
                }
                return [n, j]
            } catch (b) {
                p = b == null ? void 0 : b.message;
                o = c("FBLogger")("JSRouteBuilder").blameToPreviousFrame().blameToPreviousFrame();
                g && (o = o.blameToPreviousFrame());
                o.mustfix("Failed building URI for base path: %s message: %s", a, p);
                return [null, h]
            }
        }
        return {
            buildUri: function(a) {
                a = (a = j(a)[0]) != null ? a : d("ConstUriUtils").getUri(h);
                if (a == null) throw new Error("Not even the fallback URL parsed validly!");
                return a
            },
            buildUriNullable: function(a) {
                return j(a)[0]
            },
            buildURL: function(a) {
                a = j(a);
                var b = a[0];
                a = a[1];
                return (b = b == null ? void 0 : b.toString()) != null ? b : a
            },
            buildURLStringDEPRECATED: function(a) {
                a = j(a);
                var b = a[0];
                a = a[1];
                return (b = b == null ? void 0 : b.toString()) != null ? b : a
            }
        }
    }
    g["default"] = a
}), 98);
__d("XLynxAsyncCallbackControllerRouteBuilder", ["jsRouteBuilder"], (function(a, b, c, d, e, f, g) {
    a = c("jsRouteBuilder")("/si/linkclick/ajax_callback/", Object.freeze({}), void 0);
    b = a;
    g["default"] = b
}), 98);
__d("FBLynxLogging", ["AsyncRequest", "ODS", "XLynxAsyncCallbackControllerRouteBuilder"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a) {
        var b = c("XLynxAsyncCallbackControllerRouteBuilder").buildURL({});
        new(c("AsyncRequest"))(b).setData({
            lynx_uri: a
        }).setErrorHandler(function(a) {
            a = a.getError();
            d("ODS").bumpEntityKey(3861, "linkshim", "click_log.post.fail." + a)
        }).setTransportErrorHandler(function(a) {
            a = a.getError();
            d("ODS").bumpEntityKey(3861, "linkshim", "click_log.post.transport_fail." + a)
        }).send()
    }
    g.log = a
}), 98);
__d("isLinkshimURI", ["isBulletinDotComURI", "isFacebookURI", "isMessengerDotComURI"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a) {
        var b = a.getPath();
        return (b === "/l.php" || b.indexOf("/si/ajax/l/") === 0 || b.indexOf("/l/") === 0 || b.indexOf("l/") === 0) && (c("isFacebookURI")(a) || c("isMessengerDotComURI")(a) || c("isBulletinDotComURI")(a)) ? !0 : !1
    }
    g["default"] = a
}), 98);
__d("FBLynxBase", ["$", "FBLynxLogging", "LinkshimHandlerConfig", "URI", "isLinkshimURI"], (function(a, b, c, d, e, f) {
    "use strict";
    var g;

    function h(a) {
        if (!b("isLinkshimURI")(a)) return null;
        a = a.getQueryData().u;
        return !a ? null : a
    }
    var i = {
        logAsyncClick: function(a) {
            i.swapLinkWithUnshimmedLink(a);
            a = a.getAttribute("data-lynx-uri");
            if (!a) return;
            b("FBLynxLogging").log(a)
        },
        originReferrerPolicyClick: function(a) {
            var c = b("$")("meta_referrer");
            c.content = b("LinkshimHandlerConfig").switched_meta_referrer_policy;
            i.logAsyncClick(a);
            setTimeout(function() {
                c.content = b("LinkshimHandlerConfig").default_meta_referrer_policy
            }, 100)
        },
        swapLinkWithUnshimmedLink: function(a) {
            var c = a.href,
                d = h(new(g || (g = b("URI")))(c));
            if (!d) return;
            a.setAttribute("data-lynx-uri", c);
            a.href = d
        },
        revertSwapIfLynxURIPresent: function(a) {
            var b = a.getAttribute("data-lynx-uri");
            if (!b) return;
            a.removeAttribute("data-lynx-uri");
            a.href = b
        }
    };
    e.exports = i
}), null);
__d("FBLynx", ["Base64", "Event", "FBLynxBase", "LinkshimHandlerConfig", "Parent", "URI"], (function(a, b, c, d, e, f) {
    "use strict";
    var g, h = (g || (g = b("URI"))).goURIOnWindow,
        i = {
            alreadySetup: !1,
            setupDelegation: function(a) {
                a === void 0 && (a = !1);
                if (!document.documentElement) return;
                if (document.body == null) {
                    if (a) return;
                    window.setTimeout(function() {
                        i.setupDelegation(!0)
                    }, 100);
                    return
                }
                if (i.alreadySetup) return;
                i.alreadySetup = !0;
                var c = function(a) {
                    var c = i.getMaybeLynxLink(a.target);
                    if (!c) return;
                    var d = c[0];
                    c = c[1];
                    var e = c,
                        f = new(g || (g = b("URI")))(c.href),
                        j;
                    if (b("LinkshimHandlerConfig").ghl_param_link_shim && d !== "hover" && (c.dataset && c.dataset.attributes)) {
                        j = b("Base64").decodeObject(c.dataset.attributes);
                        if (j && j.open_link) {
                            var k;
                            for (k in j) k !== "open_link" && f.addQueryData(k, j[k]);
                            k = c.cloneNode(!0);
                            k.href = f.toString();
                            e = k
                        }
                    }
                    switch (d) {
                        case "async":
                        case "asynclazy":
                            b("FBLynxBase").logAsyncClick(e);
                            break;
                        case "origin":
                            b("FBLynxBase").originReferrerPolicyClick(e);
                            break;
                        case "hover":
                            i.hoverClick(e);
                            break
                    }
                    b("LinkshimHandlerConfig").ghl_param_link_shim && d !== "hover" && j && j.open_link && (a.preventDefault(), h(f, window.open("", e.target), !0))
                };
                b("Event").listen(document.body, "click", c);
                b("LinkshimHandlerConfig").middle_click_requires_event && b("Event").listen(document.body, "mouseup", function(a) {
                    a.button == 1 && c(a)
                });
                b("Event").listen(document.body, "mouseover", function(a) {
                    a = i.getMaybeLynxLink(a.target);
                    if (!a) return;
                    var b = a[0];
                    a = a[1];
                    switch (b) {
                        case "async":
                        case "asynclazy":
                        case "origin":
                        case "hover":
                            i.mouseover(a);
                            break
                    }
                });
                b("Event").listen(document.body, "contextmenu", function(a) {
                    a = i.getMaybeLynxLink(a.target);
                    if (!a) return;
                    var b = a[0];
                    a = a[1];
                    switch (b) {
                        case "async":
                        case "hover":
                        case "origin":
                            i.contextmenu(a);
                            break;
                        case "asynclazy":
                            break
                    }
                })
            },
            getMaybeLynxLink: function(a) {
                a = b("Parent").byAttribute(a, "data-lynx-mode");
                if (a instanceof HTMLAnchorElement) {
                    var c = a.getAttribute("data-lynx-mode");
                    switch (c) {
                        case "async":
                        case "asynclazy":
                        case "hover":
                        case "origin":
                            return [c, a];
                        default:
                            return null
                    }
                }
                return null
            },
            hoverClick: function(a) {
                b("FBLynxBase").revertSwapIfLynxURIPresent(a)
            },
            mouseover: function(a) {
                b("FBLynxBase").swapLinkWithUnshimmedLink(a)
            },
            contextmenu: function(a) {
                b("FBLynxBase").revertSwapIfLynxURIPresent(a)
            }
        };
    e.exports = i
}), null);
__d("FalcoAppUniverse", ["$InternalEnum"], (function(a, b, c, d, e, f) {
    a = b("$InternalEnum")({
        FACEBOOK: 1,
        INSTAGRAM: 2
    });
    c = a;
    f["default"] = c
}), 66);
__d("requireDeferredForDisplay", ["requireDeferred"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a) {
        return c("requireDeferred").call(null, a)
    }
    g["default"] = a
}), 98);
__d("FalcoLoggerTransports", ["AnalyticsCoreData", "Banzai", "ExecutionEnvironment", "FBLogger", "FalcoAppUniverse", "FalcoUtils", "ODS", "PersistedQueue", "Queue", "WebSession", "performanceAbsoluteNow", "promiseDone", "requireDeferredForDisplay", "uuidv4"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = c("requireDeferredForDisplay")("TransportSelectingClientSingletonConditional").__setRef("FalcoLoggerTransports"),
        i = 5 * 1024,
        j = (b = c("AnalyticsCoreData").max_delay_br_queue) != null ? b : 60 * 1e3,
        k = (e = c("AnalyticsCoreData").max_delay_br_queue_immediate) != null ? e : 1e3,
        l = "falco:",
        m = new(c("Queue"))(),
        n = 5e3,
        o = 6e4,
        p = c("uuidv4")(),
        q = "ods_web_batch",
        r = new Map(),
        s = new Set(),
        t = new Set(),
        u = (f = c("FalcoAppUniverse").cast(c("AnalyticsCoreData").app_universe)) != null ? f : 1,
        v = [],
        w = 0,
        x, y = !1,
        z = !1,
        A = !1,
        B = !0,
        C = !1,
        D = Date.now() - o,
        E = 1;
    W();
    for (e = (b = c("AnalyticsCoreData").stateful_events_list_for_br) != null ? b : [], f = Array.isArray(e), b = 0, e = f ? e : e[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
        var F;
        if (f) {
            if (b >= e.length) break;
            F = e[b++]
        } else {
            b = e.next();
            if (b.done) break;
            F = b.value
        }
        F = F;
        s.add(F)
    }
    for (b = (F = c("AnalyticsCoreData").stateless_non_fb_events_for_br) != null ? F : [], f = Array.isArray(b), e = 0, b = f ? b : b[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
        if (f) {
            if (e >= b.length) break;
            F = b[e++]
        } else {
            e = b.next();
            if (e.done) break;
            F = e.value
        }
        F = F;
        t.add(F)
    }

    function G() {
        return c("AnalyticsCoreData").enable_bladerunner && !c("ExecutionEnvironment").isInWorker
    }

    function H(a, b) {
        P(b.item.name, "js.br.add_to_batch", 1, !0);
        var c = b.item.extra.length;
        w + c > i && (clearTimeout(x), I());
        v.push([a, b]);
        w += c
    }

    function I() {
        x = null;
        y = !1;
        var a = v;
        N("js.br.send_batch", a.map(function(a) {
            return a[1].item
        }));
        if (!C) {
            O("js.br.init_not_complete.log", a.length);
            var b = function() {
                var b = a[c],
                    d = b[0],
                    e = b[1];
                P(e.item.name, "js.br.banzai_fallback_for_init_not_complete", 1, !0);
                ((b = e.item.logImmediate) != null ? b : !1) ? Q.logImmediately([e.item], function(a) {
                    return d.markItem(e, a)
                }): Q.log([e.item], function(a) {
                    return d.markItem(e, a)
                })
            };
            for (var c = 0; c < a.length; c++) b()
        } else m.enqueue(function(b) {
            return b.log(a.map(function(a) {
                return a[1].item
            }), function(b) {
                if (!b) {
                    O("js.br.banzai_fallback", a.length);
                    var c = function() {
                        var c = a[d],
                            b = c[0],
                            e = c[1];
                        P(e.item.name, "js.br.banzai_fallback_for_failure", 1, !0);
                        ((c = e.item.logImmediate) != null ? c : !1) ? Q.logImmediately([e.item], function(a) {
                            return b.markItem(e, a)
                        }): Q.log([e.item], function(a) {
                            return b.markItem(e, a)
                        })
                    };
                    for (var d = 0; d < a.length; d++) c();
                    return
                }
                for (c = 0; c < a.length; c++) {
                    var e = a[c],
                        f = e[0];
                    e = e[1];
                    P(e.item.name, "js.br.success_callback.batch.send_batch", 1, !0);
                    f.markItem(e, b)
                }
            })
        });
        v = [];
        w = 0
    }

    function J(a) {
        return {
            events: a.map(function(a) {
                return {
                    name: a.name,
                    extra: a.extra,
                    rate: a.policy.r,
                    time: a.time / 1e3,
                    tag: 0,
                    shouldAddState: a.shouldAddState,
                    identity: L(a.identity)
                }
            })
        }
    }

    function K(a) {
        var b;
        a = {
            deviceId: c("AnalyticsCoreData").device_id,
            familyDeviceId: null,
            osBuildNumber: null,
            sessionId: a,
            appId: c("AnalyticsCoreData").app_id,
            appVersion: null,
            bundleId: null,
            consentState: null,
            identity: null,
            pushPhase: c("AnalyticsCoreData").push_phase
        };
        ((b = (b = c("AnalyticsCoreData").stateful_events_list_for_br) == null ? void 0 : b.length) != null ? b : 0) > 0 && (a.ambientState = c("AnalyticsCoreData").state_for_br);
        a.identity = L(c("AnalyticsCoreData").identity);
        return Object.freeze(a)
    }

    function L(a) {
        try {
            if (u === 2) {
                var b = a == null ? void 0 : a.appScopedIdentity;
                if (b !== void 0) return {
                    appScopedIdentity: {
                        uid: b,
                        identifier: "",
                        claims: []
                    }
                }
            } else {
                b = a == null ? void 0 : a.fbIdentity;
                if (b !== void 0) return {
                    facebookIdentity: {
                        actorId: b.actorId,
                        accountId: b.accountId,
                        claims: []
                    }
                }
            }
        } catch (a) {
            d("ODS").bumpEntityKey(1344, "js.br.identity.propogation", "exception.while.generating.identity", 1)
        }
        return null
    }

    function M(a, b) {
        for (var e = 0; e < a.length; e++) {
            var f, g = a[e];
            P(g.name, "js.banzai.posting_event", 1, !1);
            f = (f = {}, f.e = g.extra, f.r = g.policy.r, f.d = c("AnalyticsCoreData").device_id, f.s = d("WebSession").getId(), f.t = g.time, f);
            g.privacyContext && (f.p = g.privacyContext);
            var h = g.identity;
            h && (f.id = h);
            c("Banzai").post(l + g.name, f, b)
        }
        N("planes.banzai.write_to_transport", a)
    }

    function N(a, b) {
        var c = 0;
        for (var d = 0; d < b.length; d++) {
            var e = b[d];
            e.name !== q && (c += 1)
        }
        c > 0 && O(a, c)
    }

    function O(a, b) {
        var e = "falco.fabric.www." + c("AnalyticsCoreData").push_phase;
        d("ODS").bumpEntityKey(1344, e, a, b)
    }

    function P(a, b, c, e) {
        if (a === q) return !1;
        d("ODS").bumpEntityKey(1344, "falco.event." + a, b, c);
        e && O(b, c);
        return !0
    }
    var Q = {
        log: function(a, b) {
            N("js.banzai.post.log", a), M(a, c("Banzai").BASIC), b(!0)
        },
        logImmediately: function(a, b) {
            N("js.banzai.post.log_immediately", a), M(a, c("Banzai").VITAL), b(!0)
        },
        logCritical: function(a, b) {
            N("js.banzai.post.log_critical", a), M(a, {
                signal: !0,
                retry: !0
            }), b(!0)
        }
    };

    function R(a) {
        W();
        var b = S(a, "banzai_data_loss", "log"),
            d = S(a, "banzai_data_loss", "logImmediately"),
            e = S(a, "banzai_data_loss", "logCritical"),
            f = S(a, "bladerunner_data_loss", "");
        O("js.br_data_loss.posted." + a, 1);
        if (C && B) try {
            m.enqueue(function(b) {
                return b.log([f], function(b) {
                    if (!b) {
                        O("js.br.transport_failure." + a, 1);
                        Q.logCritical([f], function(b) {
                            O("js.br.failure_fallback_success_callback." + a, 1)
                        });
                        return
                    }
                    O("js.br.success_callback." + a, 1)
                })
            })
        } catch (b) {
            O("js.br.error_enqueueing." + a, 1), Q.logCritical([f], function(b) {
                O("js.br.enqueuing_fallback_success_callback." + a, 1)
            })
        } else B || O("js.br.failed." + a, 1), C || O("js.br.init_not_complete." + a, 1), Q.logCritical([f], function(b) {
            O("js.br.init_fallback_success_callback." + a, 1)
        });
        M([b], c("Banzai").BASIC);
        M([d], c("Banzai").VITAL);
        M([e], {
            signal: !0,
            retry: !0
        })
    }

    function S(a, b, d) {
        return {
            name: b,
            time: c("performanceAbsoluteNow")(),
            policy: {
                r: 1
            },
            extra: JSON.stringify({
                event_index: a,
                falco_js_connection_id: p,
                logging_mode: d,
                logging_flow_flag: "original_flow"
            })
        }
    }

    function T() {
        D + n < Date.now() && (R(E), D = Date.now(), E++)
    }

    function U() {
        window.setTimeout(function() {
            T(), E <= 40 && U()
        }, o)
    }

    function V(a) {
        m.start(function(b) {
            return b({
                log: function(d, b) {
                    N("planes.bladerunner.write_to_transport", d);
                    var e = JSON.stringify(J(d));
                    a ? c("AnalyticsCoreData").enable_ack ? c("promiseDone")(a.amendWithAck(e), function(a) {
                        N("planes.bladerunner.ack_received" + a.toString(), d), b(a)
                    }, function() {
                        N("planes.bladerunner.ack_failure", d), b(!1)
                    }) : (a.amendWithoutAck(e), N("planes.bladerunner.write_without_ack", d)) : (N("planes.bladerunner.request_stream_null", d), b(!1))
                },
                logImmediately: function(b, a) {
                    this.log(b, a)
                },
                logCritical: function(b, a) {
                    this.log(b, a)
                }
            })
        })
    }

    function W() {
        if (z) return;
        C = !1;
        if (!G()) return;
        h.onReady(function(a) {
            if (!a) {
                B = !1;
                m.start(function(a) {
                    return a(Q)
                });
                return
            }
            a = a;
            var b = {
                onTermination: function(a) {
                    a.message === "Stream closed" ? (m.stop(!0), z = !1) : (B = !1, u === 2 && (d("ODS").bumpEntityKey(1344, "falco.ig.br.experiment", "exception.when.br.stream.is.rejected", 1), c("FBLogger")("ig_web", "br_stream_rejected").catching(a).warn("BladeRunner stream is rejected")), m.start(function(a) {
                        return a(Q)
                    }))
                },
                onFlowStatus: function() {}
            };
            c("promiseDone")(a.requestStream({
                method: "Falco"
            }, JSON.stringify(K(d("WebSession").getId())), b, {
                requestId: ""
            }).then(function(b) {
                a = b, V(a), C = !0
            })["catch"](function(a) {
                m.stop(!0), z = !1
            }))
        });
        z = !0
    }

    function X(a) {
        var b = a.name;
        if (!G() || !B) {
            u !== 1 && P(b, "js.use_bladerunner.failed.non_fb_event.br_not_enabled", 1, !0);
            return !1
        }
        if (s.has(b)) {
            a.shouldAddState = !0;
            return !0
        }
        if (u !== 1 && !t.has(b)) {
            P(b, "js.use_bladerunner.failed.non_fb_event.event_not_in_list", 1, !0);
            return !1
        }
        a.policy.s !== 1 && u !== 1 && P(b, "js.use_bladerunner.failed.non_fb_event.policy_not_stateless", 1, !0);
        return a.policy.s === 1
    }

    function Y(a) {
        if (a === "") return null;
        if (r.has(a)) return r.get(a);
        else {
            var b = {
                    claim: ""
                },
                c = a.split("^#");
            if (c.length >= 4) {
                var d = c[0],
                    e = c[1],
                    f = c[2];
                c = c[3];
                f !== "" ? b = {
                    appScopedIdentity: f,
                    claim: c
                } : d !== "" && (b = {
                    fbIdentity: {
                        accountId: d,
                        actorId: e
                    },
                    claim: c
                });
                r.set(a, b)
            }
            return b
        }
    }

    function a() {
        if (A) return;
        A = !0;
        c("PersistedQueue").setHandler("falco_queue_log", function(b) {
            var c, d = b.getQueueNameSuffix(),
                e = Y(d);
            while (c = b.dequeueItem())(function(c) {
                X(c.item) ? (P(c.item.name, "js.use_bladerunner.log", 1, !0), W(), x == null && (x = setTimeout(I, j)), e && !a(d) && (c.item.identity = e), H(b, c)) : (P(c.item.name, "js.use_banzai.log", 1, !0), e && (c.item.identity = e), Q.log([c.item], function(a) {
                    return b.markItem(c, a)
                }))
            })(c)
        });
        c("PersistedQueue").setHandler("falco_queue_immediately", function(b) {
            var d, e = b.getQueueNameSuffix(),
                f = Y(e);
            while (d = b.dequeueItem())(function(d) {
                X(d.item) ? (P(d.item.name, "js.use_bladerunner.log_immediately", 1, !0), W(), (x == null || !y) && (clearTimeout(x), x = setTimeout(I, k), y = !0), d.item.logImmediate = !0, H(b, d), c("PersistedQueue").isPersistenceAllowed() || (P(d.item.name, "js.br.send_immediately_no_persistence", 1, !0), I()), f && !a(e) && (d.item.identity = f)) : (P(d.item.name, "js.use_banzai.log_immediately", 1, !0), f && (d.item.identity = f), Q.logImmediately([d.item], function(a) {
                    return b.markItem(d, a)
                }))
            })(d)
        });
        c("PersistedQueue").setHandler("falco_queue_critical", function(b) {
            var c, d = b.getQueueNameSuffix(),
                e = Y(d);
            while (c = b.dequeueItem())(function(c) {
                var f = c.item;
                X(f) ? (P(f.name, "js.use_bladerunner.log_critical", 1, !0), W(), !C ? (P(f.name, "js.br.init_not_complete.logCritical", 1, !0), e && (f.identity = e), Q.logCritical([f], function(a) {
                    return b.markItem(c, a)
                })) : (e && !a(d) && (f.identity = e), m.enqueue(function(a) {
                    return a.logCritical([f], function(a) {
                        if (!a) {
                            O("js.br.banzai_fallback.critical", 1);
                            P(c.item.name, "js.br.banzai_fallback_for_failure.critical", 1, !0);
                            !f.identity && e && (f.identity = e);
                            Q.logCritical([f], function(a) {
                                return b.markItem(c, a)
                            });
                            return
                        }
                        P(c.item.name, "js.br.success_callback.batch.critical", 1, !0);
                        b.markItem(c, a)
                    })
                }), a(d) || P(c.item.name, "js.bladerunner.identity.mismatch", 1, !0))) : (e && (f.identity = e), P(f.name, "js.use_banzai.log_critical", 1, !0), Q.logCritical([f], function(a) {
                    return b.markItem(c, a)
                }))
            })(c)
        });
        c("AnalyticsCoreData").enable_dataloss_timer && (W(), T(), U());

        function a(a) {
            try {
                var b = d("FalcoUtils").identityToString(c("AnalyticsCoreData").identity);
                return a === b
            } catch (a) {
                d("ODS").bumpEntityKey(1344, "js.br.identity.check", "exception.when.comparing.with.current.user.identity", 1);
                return !0
            }
        }
    }
    g.attach = a
}), 98);
__d("FbtImpressionsBatchFalcoEvent", ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1743619");
    b = d("FalcoLoggerInternal").create("fbt_impressions_batch", a);
    e = b;
    g["default"] = e
}), 98);
__d("mapObject", [], (function(a, b, c, d, e, f) {
    "use strict";

    function g(a, b, c) {
        if (!a) return null;
        var d = {};
        Object.keys(a).forEach(function(e) {
            d[e] = b.call(c, a[e], e, a)
        });
        return d
    }

    function a(a, b, c) {
        return g(a, b, c)
    }

    function b(a, b, c) {
        return g(a, b, c)
    }

    function c(a, b, c) {
        return g(a, b, c)
    }
    g.untyped = a;
    g.shape = b;
    g.self = c;
    f["default"] = g
}), 66);
__d("BanzaiFbtBatchLogger", ["ExecutionEnvironment", "FbtImpressionsBatchFalcoEvent", "clearTimeout", "mapObject", "setTimeoutAcrossTransitions"], (function(a, b, c, d, e, f) {
    var g;
    a = 100;
    var h = 1e4,
        i = function() {
            return {
                h: {},
                s: new Set()
            }
        },
        j = function() {
            return {}
        },
        k = j(),
        l = 0,
        m = {
            _getBatch: function() {
                return j()
            },
            MAX_BATCH_SIZE: a,
            POST_INTERVAL: h,
            postTimeout: null,
            _resetBatch: function() {
                k = j(), l = 0
            },
            log: function(a) {
                var c = a.hash,
                    d = a.sample_rate;
                a = a.script_path;
                d = d + "|" + String(a);
                k[d] == null ? (k[d] = i(), k[d].s.add(c), l += 1) : k[d].s.has(c) ? (k[d].s["delete"](c), k[d].h[c] = 2) : k[d].h[c] != null ? k[d].h[c] += 1 : (k[d].s.add(c), l += 1);
                l === 1 && m.postTimeout == null && (b("ExecutionEnvironment").canUseDOM && (m.postTimeout = b("setTimeoutAcrossTransitions")(function() {
                    m.postBatch()
                }, h)));
                l === m.MAX_BATCH_SIZE && (b("clearTimeout")(m.postTimeout), m.postTimeout = null, m.postBatch())
            },
            postBatch: function() {
                if (l === 0) return;
                var a = {
                    e: (g || (g = b("mapObject")))(k, function(a) {
                        return {
                            h: a.h,
                            s: Array.from(a.s)
                        }
                    })
                };
                b("FbtImpressionsBatchFalcoEvent").log(function() {
                    return a
                });
                b("clearTimeout")(m.postTimeout);
                m.postTimeout = null;
                m._resetBatch()
            }
        };
    e.exports = m
}), null);
__d("FbtLoggerImpl", ["BanzaiFbtBatchLogger", "ScriptPath"], (function(a, b, c, d, e, f, g) {
    function a(a) {
        d("BanzaiFbtBatchLogger").log({
            hash: a,
            sample_rate: 1,
            script_path: d("ScriptPath").getScriptPath()
        })
    }
    g.logImpression = a
}), 98);
__d("InlineFbtResultImpl", ["cx", "FbtHooks", "FbtReactUtil", "FbtResultBase"], (function(a, b, c, d, e, f, g, h) {
    function i(a, b, c, e) {
        var f = "_4qba";
        e != null && e != "" && (b === "TRANSLATION" ? f = "_4qbb" : b === "APPROVE" ? f = "_4qbc" : b === "REPORT" && (f = "_4qbd"));
        return {
            $$typeof: d("FbtReactUtil").REACT_ELEMENT_TYPE,
            type: "em",
            key: null,
            ref: null,
            props: {
                className: f,
                "data-intl-hash": e,
                "data-intl-translation": c,
                "data-intl-trid": "",
                children: a,
                suppressHydrationWarning: !0
            },
            _owner: null
        }
    }
    var j = function(a) {
        return i(a.content, a.inlineMode, a.translation, a.hash)
    };
    a = function(a) {
        babelHelpers.inheritsLoose(b, a);

        function b(b, e, f, g) {
            var h;
            h = a.call(this, b, c("FbtHooks").getErrorListener({
                translation: f,
                hash: g
            })) || this;
            h.$$typeof = d("FbtReactUtil").REACT_ELEMENT_TYPE;
            h.key = null;
            h.ref = null;
            h.type = j;
            h.props = {
                content: b,
                inlineMode: e,
                translation: f,
                hash: g
            };
            return h
        }
        return b
    }(c("FbtResultBase"));
    g["default"] = a
}), 98);
__d("PluginBundleInit", ["DOM"], (function(a, b, c, d, e, f, g) {
    function a() {
        var a = document.getElementById("jsbundle-loader");
        a && c("DOM").remove(a)
    }
    g.init = a
}), 98);
__d("SecurePostMessage", ["invariant"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = "*";
    a = {
        sendMessageToSpecificOrigin: function(a, b, c, d) {
            c !== h || g(0, 21157), a.postMessage(b, c, d)
        },
        sendMessageForCurrentOrigin: function(a, b) {
            a.postMessage(b)
        },
        sendMessageAllowAnyOrigin_UNSAFE: function(a, b, c) {
            a.postMessage(b, h, c)
        }
    };
    e.exports = a
}), null);
__d("PluginXDReady", ["Arbiter", "Log", "SecurePostMessage", "UnverifiedXD"], (function(a, b, c, d, e, f, g) {
    b = {
        handleMessage: function(a) {
            d("Log").debug("PluginXDReady at " + window.name + " handleMessage " + JSON.stringify(a));
            if (!a.method) return;
            try {
                c("Arbiter").inform("Connect.Unsafe." + a.method, JSON.parse(a.params), "persistent")
            } catch (a) {}
        }
    };
    window.addEventListener("message", function(a) {
        d("Log").debug("PluginXDReady at " + window.name + " received message " + JSON.stringify(a.data.message));
        if (a.data.xdArbiterSyn) d("SecurePostMessage").sendMessageAllowAnyOrigin_UNSAFE(a.source, {
            xdArbiterAck: !0
        });
        else if (a.data.xdArbiterHandleMessage) {
            if (!a.data.message.method) return;
            try {
                c("Arbiter").inform("Connect.Unsafe." + a.data.message.method, JSON.parse(a.data.message.params), "persistent")
            } catch (a) {}
        }
    }, !1);
    a.XdArbiter = b;
    c("UnverifiedXD").send({
        xd_action: "plugin_ready",
        name: window.name
    });
    e = null;
    g["default"] = e
}), 98);
__d("PromiseImpl", ["ErrorPubSub", "TimeSlice", "err", "setImmediateAcrossTransitions", "setTimeoutAcrossTransitions"], (function(a, b, c, d, e, f) {
    "use strict";
    var g;

    function h() {}
    var i = null,
        j = {};

    function k(a) {
        try {
            return a.then
        } catch (a) {
            i = a;
            return j
        }
    }

    function l(a, b) {
        try {
            return a(b)
        } catch (a) {
            i = a;
            return j
        }
    }

    function m(a, b, c) {
        try {
            a(b, c)
        } catch (a) {
            i = a;
            return j
        }
    }

    function n(a) {
        if (typeof this !== "object") throw new TypeError("Promises must be constructed via new");
        if (typeof a !== "function") throw new TypeError("not a function");
        this._state = 0;
        this._value = null;
        this._deferreds = [];
        if (a === h) return;
        u(a, this)
    }
    n._noop = h;
    n.prototype.then = function(a, b) {
        if (this.constructor !== n) return o(this, a, b);
        var c = new n(h);
        p(this, new t(a, b, c));
        return c
    };

    function o(a, b, c) {
        return new a.constructor(function(d, e) {
            var f = new n(h);
            f.then(d, e);
            p(a, new t(b, c, f))
        })
    }

    function p(a, c) {
        while (a._state === 3) a = a._value;
        if (a._state === 0) {
            a._deferreds.push(c);
            return
        }
        b("setImmediateAcrossTransitions")(function() {
            var b = a._state === 1 ? c.onFulfilled : c.onRejected;
            if (b === null) {
                c.continuation(function() {});
                a._state === 1 ? q(c.promise, a._value) : r(c.promise, a._value);
                return
            }
            b = l(c.continuation.bind(null, b), a._value);
            b === j ? r(c.promise, i) : q(c.promise, b)
        })
    }

    function q(a, b) {
        if (b === a) return r(a, new TypeError("A promise cannot be resolved with itself."));
        if (b && (typeof b === "object" || typeof b === "function")) {
            var c = k(b);
            if (c === j) return r(a, i);
            if (c === a.then && b instanceof n) {
                a._state = 3;
                a._value = b;
                s(a);
                return
            } else if (typeof c === "function") {
                u(c.bind(b), a);
                return
            }
        }
        a._state = 1;
        a._value = b;
        s(a)
    }

    function r(a, b) {
        a._state = 2, a._value = b, s(a)
    }

    function s(a) {
        for (var b = 0; b < a._deferreds.length; b++) p(a, a._deferreds[b]);
        a._deferreds = null
    }

    function t(a, c, d) {
        this.onFulfilled = typeof a === "function" ? a : null, this.onRejected = typeof c === "function" ? c : null, this.continuation = b("TimeSlice").getGuardedContinuation("Promise Handler"), this.promise = d
    }

    function u(a, b) {
        var c = !1;
        a = m(a, function(a) {
            if (c) return;
            c = !0;
            q(b, a)
        }, function(a) {
            if (c) return;
            c = !0;
            r(b, a)
        });
        !c && a === j && (c = !0, r(b, i))
    }
    var v = B(!0),
        w = B(!1),
        x = B(null),
        y = B(void 0),
        z = B(0),
        A = B("");

    function B(a) {
        var b = new n(n._noop);
        b._state = 1;
        b._value = a;
        return b
    }
    n.resolve = function(a) {
        if (a instanceof n) return a;
        if (a === null) return x;
        if (a === void 0) return y;
        if (a === !0) return v;
        if (a === !1) return w;
        if (a === 0) return z;
        if (a === "") return A;
        if (typeof a === "object" || typeof a === "function") try {
            var b = a.then;
            if (typeof b === "function") return new n(b.bind(a))
        } catch (a) {
            return new n(function(b, c) {
                c(a)
            })
        }
        return B(a)
    };
    n.all = function(a) {
        Array.isArray(a) || (a = [n.reject(new TypeError("Promise.all must be passed an array."))]);
        var b = Array.prototype.slice.call(a);
        return new n(function(a, c) {
            if (b.length === 0) return a([]);
            var d = b.length;

            function e(f, g) {
                if (g && (typeof g === "object" || typeof g === "function"))
                    if (g instanceof n && g.then === n.prototype.then) {
                        while (g._state === 3) g = g._value;
                        if (g._state === 1) return e(f, g._value);
                        g._state === 2 && c(g._value);
                        g.then(function(a) {
                            e(f, a)
                        }, c);
                        return
                    } else {
                        var h = g.then;
                        if (typeof h === "function") {
                            h = new n(h.bind(g));
                            h.then(function(a) {
                                e(f, a)
                            }, c);
                            return
                        }
                    }
                b[f] = g;
                --d === 0 && a(b)
            }
            for (var f = 0; f < b.length; f++) e(f, b[f])
        })
    };
    n.reject = function(a) {
        return new n(function(b, c) {
            c(a)
        })
    };
    n.race = function(a) {
        return new n(function(b, c) {
            a.forEach(function(a) {
                n.resolve(a).then(b, c)
            })
        })
    };
    n.prototype["catch"] = function(a) {
        return this.then(null, a)
    };
    n.prototype.done = function(a, c) {
        (g || (g = b("ErrorPubSub"))).reportError(b("err")("Promise.done is deprecated. Please use promiseDone."));
        var d = new Error("Promise.done"),
            e = arguments.length ? this.then.apply(this, arguments) : this;
        e.then(null, function(a) {
            b("setTimeoutAcrossTransitions")(function() {
                if (a instanceof Error) throw a;
                else {
                    d.message = "" + a;
                    throw d
                }
            }, 0)
        })
    };
    e.exports = n
}), null);
__d("createCancelableFunction", ["emptyFunction"], (function(a, b, c, d, e, f, g) {
    function a(a) {
        var b = a;
        a = function() {
            for (var a = arguments.length, c = new Array(a), d = 0; d < a; d++) c[d] = arguments[d];
            return b.apply(this, c)
        };
        a.cancel = function() {
            b = c("emptyFunction")
        };
        return a
    }
    g["default"] = a
}), 98);
__d("RunBlue", ["Arbiter", "BigPipeInstance", "ContextualComponent", "ExecutionEnvironment", "PageEvents", "TimeSlice", "createCancelableFunction", "emptyFunction", "performanceAbsoluteNow", "recoverableViolation"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = "onunloadhooks",
        i = "onafterunloadhooks";

    function b(b) {
        var d = a.PageHooks;
        if (window.domready && d) {
            d.runHook(b, "domreadyhooks:late");
            return {
                remove: c("emptyFunction")
            }
        } else return o("domreadyhooks", b)
    }

    function e(b) {
        var c = a.PageHooks;
        if (window.loaded && c) {
            var d = a.setTimeout(function() {
                c.runHook(b, "onloadhooks:late")
            }, 0);
            return {
                remove: function() {
                    return a.clearTimeout(d)
                }
            }
        } else return o("onloadhooks", b)
    }

    function f(a, b) {
        b = b === void 0 ? !window.loading_page_chrome : b;
        return b ? o("onbeforeleavehooks", a) : o("onbeforeunloadhooks", a)
    }

    function j(a, b) {
        window.onunload || (window.onunload = c("TimeSlice").guard(function() {
            c("Arbiter").inform(c("PageEvents").NATIVE_ONUNLOAD, !0, "state")
        }, "window.onunload"));
        return o(a, b)
    }

    function k(a) {
        return j(h, a)
    }

    function l(a) {
        return j(i, a)
    }

    function m(a) {
        return o("onleavehooks", a)
    }

    function n(a, b) {
        var d = c("createCancelableFunction")(b);
        b = function() {
            d(), d.cancel()
        };
        a = c("ContextualComponent").closestToNode(a);
        a && a.onCleanup(b);
        window.onleavehooks = (window.onleavehooks || []).concat(b);
        return {
            remove: function() {
                d.cancel()
            }
        }
    }

    function o(a, b) {
        var d;
        d = (d = b) != null ? d : c("emptyFunction");
        b || c("recoverableViolation")("Undefined handler is not allowed", "web_speed");
        var e = c("createCancelableFunction")(d);
        window[a] = (window[a] || []).concat(e);
        return {
            remove: function() {
                e.cancel()
            }
        }
    }

    function p(a) {
        window[a] = []
    }
    var q = c("TimeSlice").guard(function() {
        c("Arbiter").inform(c("PageEvents").NATIVE_DOMREADY, !0, "state")
    }, "DOMContentLoaded");
    a._domcontentready = q;

    function r() {
        var b = document,
            d = window;
        if (b.addEventListener) {
            var e = /AppleWebKit.(\d+)/.exec(navigator.userAgent);
            if (e && e[1] < 525) var f = a.setInterval(function() {
                /loaded|complete/.test(b.readyState) && (q(), a.clearInterval(f))
            }, 10);
            else b.addEventListener("DOMContentLoaded", q, !0)
        } else {
            e = d.location.protocol === "https:" ? "//:" : "javascript:void(0)";
            b.write('<script onreadystatechange="if (this.readyState==\'complete\') {this.parentNode.removeChild(this);_domcontentready();}" defer="defer" src="' + e + '"></');
            b.write("script>")
        }
        var g = d.onload;
        d.onload = c("TimeSlice").guard(function() {
            g && g(), c("Arbiter").inform(c("PageEvents").NATIVE_ONLOAD, !0, "state")
        }, "window.onload");
        d.onbeforeunload = c("TimeSlice").guard(function(a) {
            var b = {};
            c("Arbiter").inform(c("PageEvents").NATIVE_ONBEFOREUNLOAD, b, "state");
            b.warn || c("Arbiter").inform(c("PageEvents").AJAXPIPE_ONUNLOAD, {
                transition_type: "normal"
            });
            if (b.warn !== void 0) {
                b = b.warn.body != null ? b.warn.body : b.warn;
                a && (a.returnValue = b);
                return b
            } else return
        }, "window.onbeforeunload")
    }

    function s() {
        var a, b = c("performanceAbsoluteNow")();
        ((a = window.console) == null ? void 0 : a.timeStamp) && window.console.timeStamp('perf_trace {"name": "e2e", "parent": "PageEvents.BIGPIPE_ONLOAD"}');
        c("Arbiter").inform(c("PageEvents").BIGPIPE_ONLOAD, {
            ts: b
        }, "state")
    }
    var t = c("Arbiter").registerCallback(function() {
            d("BigPipeInstance").getCurrentInstance() ? c("Arbiter").subscribeOnce(d("BigPipeInstance").Events.displayed, s) : s()
        }, [c("PageEvents").NATIVE_ONLOAD]),
        u = c("Arbiter").registerCallback(function() {
            var a = {
                timeTriggered: Date.now()
            };
            c("Arbiter").inform(c("PageEvents").BIGPIPE_DOMREADY, a, "state")
        }, [c("PageEvents").NATIVE_DOMREADY]);
    c("ExecutionEnvironment").canUseDOM && r();

    function v() {
        return {
            remove: function() {}
        }
    }
    g.onLoad = b;
    g.onAfterLoad = e;
    g.onBeforeUnload = f;
    g.onUnload = k;
    g.onAfterUnload = l;
    g.onLeave = m;
    g.onCleanupOrLeave = n;
    g.__removeHook = p;
    g.__onloadCallback = t;
    g.__domContentCallback = u;
    g.maybeOnBeforeUnload = v
}), 98);
__d("IntervalTrackingBoundedBuffer", ["CircularBuffer", "ErrorPubSub"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = 5e3;
    a = function() {
        function a(a) {
            var b = this;
            this.$6 = 0;
            if (a != null) {
                if (a <= 0) throw new Error("Size for a buffer must be greater than zero.")
            } else a = h;
            this.$4 = a;
            this.$1 = new(c("CircularBuffer"))(a);
            this.$1.onEvict(function() {
                b.$6++
            });
            this.$2 = [];
            this.$3 = 1;
            this.$5 = 0
        }
        var b = a.prototype;
        b.open = function() {
            var a = this,
                b = this.$3++,
                c = !1,
                d, e = this.$5,
                f = {
                    id: b,
                    startIdx: e,
                    hasOverflown: function() {
                        return f.getOverflowSize() > 0
                    },
                    getOverflowSize: function() {
                        return d != null ? d : Math.max(a.$6 - e, 0)
                    },
                    close: function() {
                        if (c) return [];
                        else {
                            c = !0;
                            d = a.$6 - e;
                            return a.$7(b)
                        }
                    }
                };
            this.$2.push(f);
            return f
        };
        b.pushElement = function(a) {
            this.$2.length > 0 && (this.$1.write(a), this.$5++);
            return this
        };
        b.isActive = function() {
            return this.$2.length > 0
        };
        b.$8 = function(a) {
            return Math.max(a - this.$6, 0)
        };
        b.$7 = function(a) {
            var b, d, e, f;
            for (var g = 0; g < this.$2.length; g++) {
                var h = this.$2[g],
                    i = h.startIdx;
                h = h.id;
                h === a ? (e = g, f = i) : (d == null || i < d) && (d = i);
                (b == null || i < b) && (b = i)
            }
            if (e == null || b == null || f == null) {
                c("ErrorPubSub").reportError(new Error("messed up state inside IntervalTrackingBoundedBuffer"));
                return []
            }
            this.$2.splice(e, 1);
            h = this.$8(f);
            i = this.$1.read().slice(h);
            g = this.$8(d == null ? this.$5 : d) - this.$8(b);
            g > 0 && (this.$1.dropFirst(g), this.$6 += g);
            return i
        };
        return a
    }();
    g["default"] = a
}), 98);
__d("WorkerUtils", [], (function(a, b, c, d, e, f) {
    "use strict";

    function b() {
        try {
            return "WorkerGlobalScope" in a && a instanceof a.WorkerGlobalScope
        } catch (a) {
            return !1
        }
    }

    function c() {
        try {
            return "SharedWorkerGlobalScope" in a && a instanceof a.SharedWorkerGlobalScope
        } catch (a) {
            return !1
        }
    }

    function d() {
        return "SharedWorker" in a && typeof a.SharedWorker === "function"
    }
    f.isWorkerContext = b;
    f.isSharedWorkerContext = c;
    f.isSharedWorkerSupported = d
}), 66);
__d("getReusableTimeSliceContinuation", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a, b, c) {
        var d = !1,
            e = a.getGuardedContinuation(c),
            f = function(b) {
                e(function() {
                    d || (e = a.getGuardedContinuation(c)), b()
                })
            };
        f.last = function(a) {
            var b = e;
            g();
            b(a)
        };
        f[b] = {};

        function g() {
            d = !0, e = function(a) {
                a()
            }
        }
        return f
    }
    f["default"] = a
}), 66);
__d("TimeSliceImpl", ["invariant", "Env", "ErrorGuard", "FBLogger", "IntervalTrackingBoundedBuffer", "WorkerUtils", "getReusableTimeSliceContinuation", "performanceAbsoluteNow", "wrapFunction"], (function(a, b, c, d, e, f, g) {
    var h, i, j, k, l = [],
        m = [],
        n = "key" + Math.random(),
        o = 1,
        p = !1;
    c = (h || (h = b("Env"))).timesliceBufferSize;
    c == null && (c = 5e3);
    var q = new(b("IntervalTrackingBoundedBuffer"))(c),
        r = [],
        s = [],
        t = [];

    function u() {
        return v(r)
    }

    function v(a) {
        return a.length > 0 ? a[a.length - 1] : null
    }

    function w(a, c) {
        var d = {};
        (i || (i = b("ErrorGuard"))).applyWithGuard(z, null, [a, c, d]);
        i.applyWithGuard(A, null, [a, c, d]);
        r.push(a);
        s.push(c);
        t.push(d)
    }

    function x(a, b, c) {
        l.forEach(function(d) {
            var e = d.onNewContextCreated(u(), b, c);
            a[d.getBeforeID()] = e
        })
    }

    function y(a, b, c) {
        m.forEach(function(d) {
            d.onAfterContextEnded(a, b[d.getBeforeID()], c[d.getBeforeID()], a.meta)
        })
    }

    function z(a, b, c) {
        l.forEach(function(d) {
            var e = d.onBeforeContextStarted(a, b[d.getBeforeID()], a.meta);
            c[d.getBeforeID()] = e
        })
    }

    function A(a, b, c) {
        l.forEach(function(d) {
            var e = d.onAfterContextStarted(a, b[d.getBeforeID()], c[d.getBeforeID()], a.meta);
            c[d.getBeforeID()] = e
        })
    }

    function B() {
        var a = u(),
            c = v(s),
            d = v(t);
        if (a == null || c == null || d == null) {
            b("FBLogger")("TimeSlice").mustfix("popped too many times off the timeslice stack");
            p = !1;
            return
        }(i || (i = b("ErrorGuard"))).applyWithGuard(y, null, [a, c, d]);
        p = !a.isRoot;
        r.pop();
        s.pop();
        t.pop()
    }
    var C = {
        PropagationType: {
            CONTINUATION: 0,
            EXECUTION: 1,
            ORPHAN: 2
        },
        guard: function(a, c, d) {
            typeof a === "function" || g(0, 3725);
            typeof c === "string" || g(0, 3726);
            var e = D(d);
            if (a[n]) return a;
            var f;
            p && (f = u());
            var h = {},
                l = 0;
            d = function() {
                var d = (j || (j = b("performanceAbsoluteNow")))(),
                    g = o++,
                    m = {
                        contextID: g,
                        name: c,
                        isRoot: !p,
                        executionNumber: l++,
                        meta: e,
                        absBeginTimeMs: d
                    };
                w(m, h);
                if (f != null) {
                    var n = !!e.isContinuation;
                    f.isRoot ? (m.indirectParentID = f.contextID, m.isEdgeContinuation = n) : (m.indirectParentID = f.indirectParentID, m.isEdgeContinuation = !!(n && f.isEdgeContinuation))
                }
                var r = (k || (k = b("WorkerUtils"))).isWorkerContext();
                p = !0;
                try {
                    for (var s = arguments.length, t = new Array(s), v = 0; v < s; v++) t[v] = arguments[v];
                    if (!m.isRoot || r) return a.apply(this, t);
                    else return (i || (i = b("ErrorGuard"))).applyWithGuard(a, this, t, {
                        name: "TimeSlice" + (c ? ": " + c : "")
                    })
                } finally {
                    var x = u();
                    if (x == null) b("FBLogger")("TimeSlice").mustfix("timeslice stack misaligned, not logging the block"), p = !1;
                    else {
                        var y = x.isRoot,
                            z = x.contextID,
                            A = x.indirectParentID,
                            C = x.isEdgeContinuation,
                            D = (j || (j = b("performanceAbsoluteNow")))();
                        x.absEndTimeMs = D;
                        if (y && d != null) {
                            var E = {
                                begin: d,
                                end: D,
                                id: z,
                                indirectParentID: A,
                                representsExecution: !0,
                                isEdgeContinuation: f && C,
                                guard: c
                            };
                            if (a.__SMmeta != null) {
                                var F = a.__SMmeta.name,
                                    G = a.__SMmeta.module;
                                F != null && (E.name = F);
                                G != null && (E.module = G)
                            }
                            q.pushElement(E)
                        }
                        B()
                    }
                }
            };
            d[n] = {};
            (i || (i = b("ErrorGuard"))).applyWithGuard(x, null, [h, c, e]);
            return d
        },
        copyGuardForWrapper: function(a, b) {
            a && a[n] && (b[n] = a[n]);
            return b
        },
        getContext: function() {
            return u()
        },
        getGuardedContinuation: function(a) {
            function b(a) {
                for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
                return a.apply(this, c)
            }
            return C.guard(b, a, {
                propagationType: C.PropagationType.CONTINUATION
            })
        },
        getReusableContinuation: function(a) {
            return b("getReusableTimeSliceContinuation")(C, n, a)
        },
        getPlaceholderReusableContinuation: function() {
            var a = function(a) {
                return a()
            };
            a.last = a;
            return a
        },
        getGuardNameStack: function() {
            return r.map(function(a) {
                return a.name
            })
        },
        registerExecutionContextObserver: function(a) {
            var b = !1;
            for (var c = 0; c < l.length; c++)
                if (l[c].getBeforeID() > a.getBeforeID()) {
                    l.splice(c, 0, a);
                    b = !0;
                    break
                }
            b || l.push(a);
            for (c = 0; c < m.length; c++)
                if (m[c].getAfterID() > a.getAfterID()) {
                    m.splice(c, 0, a);
                    return
                }
            m.push(a)
        },
        catchUpOnDemandExecutionContextObservers: function(a) {
            for (var b = 0; b < r.length; b++) {
                var c = r[b],
                    d = s[b],
                    e = t[b] || {};
                d = a.onBeforeContextStartedWhileEnabled(c, d[a.getBeforeID()], c.meta);
                e[a.getBeforeID()] = d;
                t[b] = e
            }
        },
        getBuffer: function() {
            return q
        }
    };

    function D(a) {
        var b = {};
        a && a.propagateCounterAttribution !== void 0 && (b.propagateCounterAttribution = a.propagateCounterAttribution);
        a && a.root !== void 0 && (b.root = a.root);
        switch (a && a.propagationType) {
            case C.PropagationType.CONTINUATION:
                b.isContinuation = !0;
                b.extendsExecution = !0;
                break;
            case C.PropagationType.ORPHAN:
                b.isContinuation = !1;
                b.extendsExecution = !1;
                break;
            case C.PropagationType.EXECUTION:
            default:
                b.isContinuation = !1, b.extendsExecution = !0
        }
        return b
    }
    b("wrapFunction").setWrapper(function(a, b) {
        return C.guard(a, b, {
            registerCallStack: !0
        })
    }, "entry");
    a.TimeSlice = C;
    e.exports = C
}), 6);
__d("TimeSliceSham", ["Env", "ErrorGuard", "IntervalTrackingBoundedBuffer"], (function(a, b, c, d, e, f) {
    var g, h;
    c = (g || b("Env")).timesliceBufferSize;
    c == null && (c = 5e3);
    var i = new(b("IntervalTrackingBoundedBuffer"))(c),
        j = {
            PropagationType: {
                CONTINUATION: 0,
                EXECUTION: 1,
                ORPHAN: 2
            },
            guard: function(a, c) {
                return (h || (h = b("ErrorGuard"))).guard(a, {
                    name: "TimeSlice" + (c ? ": " + c : "")
                })
            },
            copyGuardForWrapper: function(a, b) {
                return a
            },
            checkCoverage: function() {},
            setLogging: function(a, b) {},
            getContext: function() {
                return null
            },
            getGuardedContinuation: function(a) {
                function a(a) {
                    for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
                    return a.apply(this, c)
                }
                return a
            },
            getReusableContinuation: function(a) {
                return j.getPlaceholderReusableContinuation()
            },
            getPlaceholderReusableContinuation: function() {
                var a = function(a) {
                    return a()
                };
                a.last = a;
                return a
            },
            getGuardNameStack: function() {
                return []
            },
            registerExecutionContextObserver: function(a) {},
            catchUpOnDemandExecutionContextObservers: function(a) {},
            getBuffer: function() {
                return i
            }
        };
    a.TimeSlice = j;
    e.exports = j
}), 6);
__d("cancelIdleCallbackBlue", ["IdleCallbackImplementation"], (function(a, b, c, d, e, f, g) {
    var h = (c = a.cancelIdleCallback) != null ? c : d("IdleCallbackImplementation").cancelIdleCallback;

    function b(a) {
        h(a)
    }
    g["default"] = b
}), 98);
__d("clearIntervalBlue", [], (function(a, b, c, d, e, f) {
    var g = a.__fbNativeClearTimeout || a.clearTimeout;

    function b(a) {
        g(a)
    }
    f["default"] = b
}), 66);
__d("clearTimeoutBlue", [], (function(a, b, c, d, e, f) {
    var g = a.__fbNativeClearTimeout || a.clearTimeout;

    function b(a) {
        g(a)
    }
    f["default"] = b
}), 66);
__d("legacy:bootloader", ["Bootloader"], (function(a, b, c, d, e, f) {
    a.Bootloader = b("Bootloader")
}), 3);
__d("isAdsExcelAddinURI", [], (function(a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)fbaddins\\.com$", "i"),
        h = ["https"];

    function a(a) {
        if (a.isEmpty() && a.toString() !== "#") return !1;
        return !a.getDomain() && !a.getProtocol() ? !1 : h.indexOf(a.getProtocol()) !== -1 && g.test(a.getDomain())
    }
    f["default"] = a
}), 66);
__d("isValidAsyncSignalURI", [], (function(a, b, c, d, e, f) {
    var g = new RegExp("((^|\\.)instagram\\.com$)|((^|\\.)wit\\.ai$)|((^|\\.)accountkit\\.com$)", "i"),
        h = ["https"];

    function a(a) {
        if (a.isEmpty() && a.toString() !== "#") return !1;
        return !a.getDomain() && !a.getProtocol() ? !1 : h.includes(a.getProtocol()) && g.test(a.getDomain())
    }
    f["default"] = a
}), 66);
__d("AsyncSignal", ["ErrorGuard", "Promise", "QueryString", "Run", "TimeSlice", "TrackingConfig", "URI", "ZeroRewrites", "getAsyncParams", "isAdsExcelAddinURI", "isFacebookURI", "isMessengerDotComURI", "isValidAsyncSignalURI", "isWorkplaceDotComURI", "memoize", "promiseDone"], (function(a, b, c, d, e, f) {
    var g, h, i;

    function a(a, c) {
        this.data = c || {}, this.uri = a.toString(), b("TrackingConfig").domain && this.uri.charAt(0) == "/" && (this.uri = b("TrackingConfig").domain + this.uri)
    }
    a.prototype.setHandler = function(a) {
        this.handler = a;
        return this
    };
    a.prototype.setTimeout = function(a) {
        this.timeout = a;
        return this
    };
    a.prototype.send = function() {
        b("TimeSlice").guard(this._send.bind(this), "AsyncSignal send", {
            propagationType: b("TimeSlice").PropagationType.ORPHAN
        })()
    };
    a.prototype._send = function() {
        var a = this.handler,
            c = this.data;
        c.asyncSignal = (Math.random() * 1e4 | 0) + 1;
        var d = b("ZeroRewrites").rewriteURI(new(g || (g = b("URI")))(this.uri));
        d = b("isFacebookURI")(d) || b("isMessengerDotComURI")(d) || b("isAdsExcelAddinURI")(d) || b("isWorkplaceDotComURI")(d) || b("isValidAsyncSignalURI")(d);
        if (d) Object.assign(c, b("getAsyncParams")("POST"));
        else throw new Error("'" + this.uri + "' is an external URL, you should not send async signals to offsite links.");
        var e = b("QueryString").appendToUrl(this.uri, c);
        i || (i = new(b("Promise"))(function(a) {
            b("Run").onAfterLoad(a)
        }));
        d = i.then(function() {
            return new(b("Promise"))(function(a, b) {
                var c = new Image();
                c.onload = a;
                c.onerror = c.onabort = b;
                c.src = e
            })
        });
        if (a) {
            var f = !1,
                j = b("memoize")(function() {
                    (h || (h = b("ErrorGuard"))).applyWithGuard(a, null, [f])
                });
            b("promiseDone")(d.then(function() {
                f = !0, j()
            }, j));
            this.timeout && setTimeout(j, this.timeout)
        }
        return this
    };
    e.exports = a
}), null);
__d("LinkshimAsyncLink", ["$", "AsyncSignal", "DOM", "LinkshimHandlerConfig", "UserAgent_DEPRECATED"], (function(a, b, c, d, e, f, g) {
    function h(a, b) {
        var e = d("UserAgent_DEPRECATED").ie() <= 8;
        if (e) {
            var f = c("DOM").create("wbr", {}, null);
            c("DOM").appendContent(a, f)
        }
        a.href = b;
        e && c("DOM").remove(f)
    }

    function a(a, b, d) {
        var e = c("$")("meta_referrer");
        e.content = c("LinkshimHandlerConfig").switched_meta_referrer_policy;
        h(a, b);
        setTimeout(function() {
            e.content = c("LinkshimHandlerConfig").default_meta_referrer_policy, new(c("AsyncSignal"))(d, {}).send()
        }, 100)
    }
    g.swap = h;
    g.referrer_log = a
}), 98);
__d("legacy:dom-asynclinkshim", ["LinkshimAsyncLink"], (function(a, b, c, d, e, f) {
    a.LinkshimAsyncLink = b("LinkshimAsyncLink")
}), 3);
__d("lowerDomain", ["LowerDomainRegex", "lowerFacebookDomain"], (function(a, b, c, d, e, f, g) {
    ((a = document.domain) != null ? a : "").toLowerCase().match(d("LowerDomainRegex").domainRegex) && c("lowerFacebookDomain")()
}), 34);
__d("markJSEnabled", [], (function(a, b, c, d, e, f) {
    a = document.documentElement;
    a.className = a.className.replace("no_js", "")
}), null);
__d("requestIdleCallbackBlue", ["TimeSlice", "TimerStorage", "requestIdleCallbackAcrossTransitions"], (function(a, b, c, d, e, f, g) {
    function b(b, d) {
        var e;

        function f(a) {
            c("TimerStorage").unset(c("TimerStorage").IDLE_CALLBACK, e), b(a)
        }
        c("TimeSlice").copyGuardForWrapper(b, f);
        e = c("requestIdleCallbackAcrossTransitions").call(a, f, d);
        c("TimerStorage").set(c("TimerStorage").IDLE_CALLBACK, e);
        return e
    }
    g["default"] = b
}), 98);
__d("setIntervalAcrossTransitionsBlue", ["TimeSlice"], (function(a, b, c, d, e, f, g) {
    var h = a.__fbNativeSetInterval || a.setInterval;

    function b(b, d) {
        var e = c("TimeSlice").guard(b, "setInterval");
        for (var f = arguments.length, g = new Array(f > 2 ? f - 2 : 0), i = 2; i < f; i++) g[i - 2] = arguments[i];
        return Function.prototype.apply.call(h, a, [e, d].concat(g))
    }
    g["default"] = b
}), 98);
__d("setTimeoutAcrossTransitionsBlue", ["TimeSlice"], (function(a, b, c, d, e, f, g) {
    var h = a.__fbNativeSetTimeout || a.setTimeout;

    function b(b, d) {
        var e = c("TimeSlice").guard(b, "setTimeout", {
            propagationType: c("TimeSlice").PropagationType.CONTINUATION,
            registerCallStack: !0
        });
        for (var f = arguments.length, g = new Array(f > 2 ? f - 2 : 0), i = 2; i < f; i++) g[i - 2] = arguments[i];
        return Function.prototype.apply.call(h, a, [e, d].concat(g))
    }
    g["default"] = b
}), 98);
__d("setTimeoutBlue", ["TimeSlice", "TimerStorage", "setTimeoutAcrossTransitions"], (function(a, b, c, d, e, f, g) {
    function a(a, b) {
        var d, e = function() {
            c("TimerStorage").unset(c("TimerStorage").TIMEOUT, d);
            for (var b = arguments.length, e = new Array(b), f = 0; f < b; f++) e[f] = arguments[f];
            Function.prototype.apply.call(a, this, e)
        };
        c("TimeSlice").copyGuardForWrapper(a, e);
        for (var f = arguments.length, g = new Array(f > 2 ? f - 2 : 0), h = 2; h < f; h++) g[h - 2] = arguments[h];
        d = c("setTimeoutAcrossTransitions").apply(void 0, [e, b].concat(g));
        c("TimerStorage").set(c("TimerStorage").TIMEOUT, d);
        return d
    }
    g["default"] = a
}), 98);

__d("getOffsetParent", ["Style"], (function(a, b, c, d, e, f) {
    function g(a) {
        a = a.parentNode;
        if (!a || a === document.documentElement) return document.documentElement;
        return b("Style").get(a, "position") !== "static" ? a : a === document.body ? document.documentElement : g(a)
    }
    e.exports = g
}), null);
__d("PluginResize", ["Locale", "Log", "UnverifiedXD", "getOffsetParent", "getStyleProperty"], (function(a, b, c, d, e, f) {
    function g(a) {
        a = a || document.body;
        var c = 0,
            d = b("getOffsetParent")(a);
        b("Locale").isRTL() && d ? c = d.offsetWidth - a.offsetLeft - a.offsetWidth : b("Locale").isRTL() || (c = a.offsetLeft);
        return h(a) + c
    }

    function h(a) {
        return Math.ceil(parseFloat(b("getStyleProperty")(a, "width"))) || a.offsetWidth
    }

    function i(a) {
        a = a || document.body;
        return a.offsetHeight + a.offsetTop
    }

    function j(a, b, c) {
        this.calcWidth = a || g, this.calcHeight = b || i, this.width = void 0, this.height = void 0, this.event = c || "resize"
    }
    Object.assign(j.prototype, {
        resize: function() {
            var a = this.calcWidth(),
                c = this.calcHeight();
            (a !== this.width || c !== this.height) && (b("Log").debug("Resizing Plugin: (%s, %s, %s, %s)", a, c, this.event), this.width = a, this.height = c, b("UnverifiedXD").send({
                type: this.event,
                width: a,
                height: c
            }));
            return this
        },
        auto: function(a) {
            setInterval(this.resize.bind(this), a || 250);
            return this
        }
    });
    j.auto = function(a, b, c) {
        return new j(g.bind(null, a), i.bind(null, a), b).resize().auto(c)
    };
    j.autoHeight = function(a, b, c, d) {
        return new j(function() {
            return a
        }, i.bind(null, b), c).resize().auto(d)
    };
    j.getElementWidth = h;
    e.exports = j
}), null);
__d("DOMControl", ["$", "DataStore"], (function(a, b, c, d, e, f) {
    a = function() {
        "use strict";

        function a(a) {
            this.root = b("$").fromIDOrElement(a), this.updating = !1, b("DataStore").set(a, "DOMControl", this)
        }
        var c = a.prototype;
        c.getRoot = function() {
            return this.root
        };
        c.beginUpdate = function() {
            if (this.updating) return !1;
            this.updating = !0;
            return !0
        };
        c.endUpdate = function() {
            this.updating = !1
        };
        c.update = function(a) {
            if (!this.beginUpdate()) return this;
            this.onupdate(a);
            this.endUpdate()
        };
        c.onupdate = function(a) {};
        a.getInstance = function(a) {
            return b("DataStore").get(a, "DOMControl")
        };
        return a
    }();
    e.exports = a
}), null);
__d("Input", ["CSS", "DOMControl", "DOMQuery"], (function(a, b, c, d, e, f, g) {
    function h(a) {
        return !/\S/.test(a || "")
    }

    function i(a) {
        return h(a.value)
    }

    function a(a) {
        return i(a) ? "" : a.value
    }

    function b(a) {
        return a.value
    }

    function e(a, b) {
        a.value = b || "";
        b = c("DOMControl").getInstance(a);
        b && b.resetHeight && b.resetHeight()
    }

    function f(a, b) {
        b || (b = ""), a.setAttribute("aria-label", b), a.setAttribute("placeholder", b)
    }

    function j(a) {
        a.value = "", a.style.height = ""
    }

    function k(a, b) {
        d("CSS").conditionClass(a, "enter_submit", b)
    }

    function l(a) {
        return d("CSS").hasClass(a, "enter_submit")
    }

    function m(a, b) {
        b > 0 ? a.setAttribute("maxlength", b.toString()) : a.removeAttribute("maxlength")
    }
    g.isWhiteSpaceOnly = h;
    g.isEmpty = i;
    g.getValue = a;
    g.getValueRaw = b;
    g.setValue = e;
    g.setPlaceholder = f;
    g.reset = j;
    g.setSubmitOnEnter = k;
    g.getSubmitOnEnter = l;
    g.setMaxLength = m
}), 98);
__d("normalizeBoundingClientRect", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a, b) {
        a = a.ownerDocument.documentElement;
        var c = a ? a.clientLeft : 0;
        a = a ? a.clientTop : 0;
        var d = Math.round(b.left) - c;
        c = Math.round(b.right) - c;
        var e = Math.round(b.top) - a;
        b = Math.round(b.bottom) - a;
        return {
            left: d,
            right: c,
            top: e,
            bottom: b,
            width: c - d,
            height: b - e
        }
    }
    f["default"] = a
}), 66);
__d("getElementRect", ["containsNode", "normalizeBoundingClientRect"], (function(a, b, c, d, e, f, g) {
    function a(a) {
        var b;
        b = a == null ? void 0 : (b = a.ownerDocument) == null ? void 0 : b.documentElement;
        return !a || !("getBoundingClientRect" in a) || !c("containsNode")(b, a) ? {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: 0,
            height: 0
        } : c("normalizeBoundingClientRect")(a, a.getBoundingClientRect())
    }
    g["default"] = a
}), 98);
__d("getElementPosition", ["getElementRect"], (function(a, b, c, d, e, f, g) {
    function a(a) {
        a = c("getElementRect")(a);
        return {
            x: a.left,
            y: a.top,
            width: a.right - a.left,
            height: a.bottom - a.top
        }
    }
    g["default"] = a
}), 98);
__d("Form", ["DOM", "DOMQuery", "DTSG", "DTSGUtils", "DataStore", "Input", "LSD", "PHPQuerySerializer", "Random", "SprinkleConfig", "URI", "getElementPosition", "isFacebookURI", "isNode"], (function(a, b, c, d, e, f) {
    var g, h, i = "FileList" in window,
        j = "FormData" in window;

    function k(a) {
        var c = {};
        (g || (g = b("PHPQuerySerializer"))).serialize(a).split("&").forEach(function(a) {
            if (a) {
                a = /^([^=]*)(?:=(.*))?$/.exec(a);
                var d = (h || (h = b("URI"))).decodeComponent(a[1]),
                    e = a[2] !== void 0;
                e = e ? (h || (h = b("URI"))).decodeComponent(a[2]) : null;
                c[d] = e
            }
        });
        return c
    }
    var l = {
        getInputs: function(a) {
            a === void 0 && (a = document);
            return [].concat(b("DOMQuery").scry(a, "input"), b("DOMQuery").scry(a, "select"), b("DOMQuery").scry(a, "textarea"), b("DOMQuery").scry(a, "button"))
        },
        getInputsByName: function(a) {
            var b = {};
            l.getInputs(a).forEach(function(a) {
                var c = b[a.name];
                b[a.name] = typeof c === "undefined" ? a : [a].concat(c)
            });
            return b
        },
        getSelectValue: function(a) {
            return a.options[a.selectedIndex].value
        },
        setSelectValue: function(a, b) {
            for (var c = 0; c < a.options.length; ++c)
                if (a.options[c].value == b) {
                    a.selectedIndex = c;
                    break
                }
        },
        getRadioValue: function(a) {
            for (var b = 0; b < a.length; b++)
                if (a[b].checked) return a[b].value;
            return null
        },
        getElements: function(a) {
            return a.tagName == "FORM" && a.elements != a ? Array.from(a.elements) : l.getInputs(a)
        },
        getAttribute: function(a, b) {
            return (a.getAttributeNode(b) || {}).value || null
        },
        setDisabled: function(a, c) {
            l.getElements(a).forEach(function(a) {
                if (a.disabled !== void 0) {
                    var d = b("DataStore").get(a, "origDisabledState");
                    c ? (d === void 0 && b("DataStore").set(a, "origDisabledState", a.disabled), a.disabled = c) : d === !1 && (a.disabled = !1)
                }
            })
        },
        forEachValue: function(a, c, d) {
            l.getElements(a).forEach(function(a) {
                if (!a.name || a.disabled) return;
                if (a.type === "submit") return;
                if (a.type === "reset" || a.type === "button" || a.type === "image") return;
                if ((a.type === "radio" || a.type === "checkbox") && !a.checked) return;
                if (a.nodeName === "SELECT") {
                    for (var c = 0, e = a.options.length; c < e; c++) {
                        var f = a.options[c];
                        f.selected && d("select", a.name, f.value)
                    }
                    return
                }
                if (a.type === "file") {
                    if (i) {
                        f = a.files;
                        for (c = 0; c < f.length; c++) d("file", a.name, f.item(c))
                    }
                    return
                }
                d(a.type, a.name, b("Input").getValue(a))
            }), c && c.name && c.type === "submit" && b("DOMQuery").contains(a, c) && b("DOMQuery").isNodeOfType(c, ["input", "button"]) && d("submit", c.name, c.value)
        },
        createFormData: function(a, c) {
            if (!j) return null;
            var d = new FormData();
            if (a)
                if (b("isNode")(a)) l.forEachValue(a, c, function(a, b, c) {
                    d.append(b, c)
                });
                else {
                    c = k(a);
                    for (a in c) c[a] == null ? d.append(a, "") : d.append(a, c[a])
                }
            return d
        },
        serialize: function(a, b) {
            var c = {};
            l.forEachValue(a, b, function(a, b, d) {
                if (a === "file") return;
                l._serializeHelper(c, b, d)
            });
            return l._serializeFix(c)
        },
        _serializeHelper: function(a, b, c) {
            var d = Object.prototype.hasOwnProperty,
                e = /([^\]]+)\[([^\]]*)\](.*)/.exec(b);
            if (e) {
                if (!a[e[1]] || !d.call(a, e[1])) {
                    a[e[1]] = d = {};
                    if (a[e[1]] !== d) return
                }
                d = 0;
                if (e[2] === "")
                    while (a[e[1]][d] !== void 0) d++;
                else d = e[2];
                e[3] === "" ? a[e[1]][d] = c : l._serializeHelper(a[e[1]], d.concat(e[3]), c)
            } else a[b] = c
        },
        _serializeFix: function(a) {
            for (var b in a) a[b] instanceof Object && (a[b] = l._serializeFix(a[b]));
            b = Object.keys(a);
            if (b.length === 0 || b.some(isNaN)) return a;
            b.sort(function(a, b) {
                return a - b
            });
            var c = 0,
                d = b.every(function(a) {
                    return +a === c++
                });
            return d ? b.map(function(b) {
                return a[b]
            }) : a
        },
        post: function(a, c, d, e) {
            e === void 0 && (e = !0);
            a = new(h || (h = b("URI")))(a);
            var f = document.createElement("form");
            f.action = a.toString();
            f.method = "POST";
            f.style.display = "none";
            var g = !b("isFacebookURI")(a);
            if (d) {
                if (g) {
                    f.rel = "noopener";
                    if (d === "_blank") {
                        d = btoa(b("Random").uint32());
                        var i = window.open("about:blank", d);
                        i !== void 0 && (i.opener = null)
                    }
                }
                f.target = d
            }
            if (e && (!g && a.getSubdomain() !== "apps")) {
                i = b("DTSG").getToken();
                i && (c.fb_dtsg = i, b("SprinkleConfig").param_name && (c[b("SprinkleConfig").param_name] = b("DTSGUtils").getNumericValue(i)));
                b("LSD").token && (c.lsd = b("LSD").token, b("SprinkleConfig").param_name && !i && (c[b("SprinkleConfig").param_name] = b("DTSGUtils").getNumericValue(b("LSD").token)))
            }
            l.createHiddenInputs(c, f);
            b("DOMQuery").getRootElement().appendChild(f);
            f.submit();
            return !1
        },
        post_UNSAFE_LET_ANYONE_IMPERSONATE_THE_USER_FOR_THESE_WRITES: function(a, b, c) {
            l.post(a, b, c)
        },
        createHiddenInputs: function(a, c, d, e) {
            e === void 0 && (e = !1);
            d = d || {};
            a = k(a);
            for (var f in a) {
                if (a[f] === null) continue;
                if (d[f] && e) d[f].value = a[f];
                else {
                    var g = b("DOM").create("input", {
                        type: "hidden",
                        name: f,
                        value: a[f]
                    });
                    d[f] = g;
                    c.appendChild(g)
                }
            }
            return d
        },
        getFirstElement: function(a, c) {
            c === void 0 && (c = ['input[type="text"]', "textarea", 'input[type="password"]', 'input[type="button"]', 'input[type="submit"]']);
            var d = [];
            for (var e = 0; e < c.length; e++) {
                d = b("DOMQuery").scry(a, c[e]);
                for (var f = 0; f < d.length; f++) {
                    var g = d[f];
                    try {
                        var h = b("getElementPosition")(g);
                        if (h.y > 0 && h.x > 0) return g
                    } catch (a) {}
                }
            }
            return null
        },
        focusFirst: function(a) {
            a = l.getFirstElement(a);
            if (a) {
                a.focus();
                return !0
            }
            return !1
        }
    };
    e.exports = l
}), null);
__d("areJSONRepresentationsEqual", [], (function(a, b, c, d, e, f) {
    function a(a, b) {
        return JSON.stringify(a) == JSON.stringify(b)
    }
    f["default"] = a
}), 66);
__d("UIForm", ["ArbiterMixin", "BehaviorsMixin", "DOM", "Event", "Form", "Run", "areJSONRepresentationsEqual", "mixin"], (function(a, b, c, d, e, f) {
    c = function(a) {
        "use strict";
        babelHelpers.inheritsLoose(c, a);

        function c(c, d, e, f, g) {
            var h;
            h = a.call(this) || this;
            h._root = c;
            h.controller = c;
            h._message = d;
            f && (h._confirm_dialog = f, f.subscribe("confirm", h._handleDialogConfirm.bind(babelHelpers.assertThisInitialized(h))), b("DOM").prependContent(h._root, b("DOM").create("input", {
                type: "hidden",
                name: "confirmed",
                value: "true"
            })));
            b("Run").onAfterLoad(function() {
                h._originalState = b("Form").serialize(h._root)
            });
            h._forceDirty = e;
            h._confirmed = !1;
            h._submitted = !1;
            b("Event").listen(h._root, "submit", h._handleSubmit.bind(babelHelpers.assertThisInitialized(h)));
            g && g.length && h.enableBehaviors(g);
            c = !0;
            b("Run").onBeforeUnload(h.checkUnsaved.bind(babelHelpers.assertThisInitialized(h)), c);
            return h
        }
        var d = c.prototype;
        d.getRoot = function() {
            return this._root
        };
        d._handleSubmit = function() {
            if (this._confirm_dialog && !this._confirmed) {
                this._confirm_dialog.show();
                return !1
            }
            if (this.inform("submit") === !1) return !1;
            this._submitted = !0;
            return !0
        };
        d._handleDialogConfirm = function() {
            this._confirmed = !0, this._confirm_dialog.hide(), this._root.getAttribute("ajaxify") ? b("Event").fire(this._root, "submit") : this._handleSubmit() && this._root.submit()
        };
        d.reset = function() {
            this.inform("reset"), this._submitted = !1, this._confirmed = !1
        };
        d.isDirty = function() {
            if (this._submitted || !b("DOM").contains(document.body, this._root)) return !1;
            if (this._forceDirty) return !0;
            if (!this._originalState) return !1;
            var a = b("Form").serialize(this._root);
            return !b("areJSONRepresentationsEqual")(a, this._originalState)
        };
        d.checkUnsaved = function() {
            return this.isDirty() ? this._message : null
        };
        return c
    }(b("mixin")(b("ArbiterMixin"), b("BehaviorsMixin")));
    e.exports = a.UIForm || c
}), null);
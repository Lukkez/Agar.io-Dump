(function(n) {
 function za(a) {
  var b = h.sockets[a];
  b.onopen = b.onclose = b.onmessage = b.onerror = function() {};
  for (var d = 0; d < b.events.length; ++d) y(b.events[d][1]);
  b.events = null;
  try {
   b.close()
  } catch (c) {}
  h.sockets[a] = null
 }

 function Aa(a) {
  ma || 0 > a.timeRemaining() || (Ba = a, ib(), n.requestIdleCallback(Aa))
 }

 function P(a) {
  var b = 4 * a.length + 1,
   d = z(b);
  Ca(a, d, b);
  return d
 }

 function Da() {
  ma || (jb(), setTimeout(Da, 1E3))
 }

 function kb(a) {
  eval.call(null, a)
 }

 function u(a, b) {
  a || K("Assertion failed: " + b)
 }

 function Ea(a) {
  var b = c["_" + a];
  if (!b) try {
   b = eval("_" + a)
  } catch (d) {}
  u(b, "Cannot call unknown function " + a + " (perhaps LLVM optimizations or closure removed it?)");
  return b
 }

 function Fa(a, b, d) {
  d = d || "i8";
  "*" === d.charAt(d.length - 1) && (d = "i32");
  switch (d) {
   case "i1":
    t[a >> 0] = b;
    break;
   case "i8":
    t[a >> 0] = b;
    break;
   case "i16":
    L[a >> 1] = b;
    break;
   case "i32":
    p[a >> 2] = b;
    break;
   case "i64":
    na = [b >>> 0, (Q = b, 1 <= +oa(Q) ? 0 < Q ? (lb(+pa(Q / 4294967296), 4294967295) | 0) >>> 0 : ~~+qa((Q - +(~~Q >>> 0)) / 4294967296) >>> 0 : 0)];
    p[a >> 2] = na[0];
    p[a + 4 >> 2] = na[1];
    break;
   case "float":
    ba[a >> 2] = b;
    break;
   case "double":
    ca[a >>
     3] = b;
    break;
   default:
    K("invalid type for setValue: " + d)
  }
 }

 function Ga(a, b) {
  b = b || "i8";
  "*" === b.charAt(b.length - 1) && (b = "i32");
  switch (b) {
   case "i1":
    return t[a >> 0];
   case "i8":
    return t[a >> 0];
   case "i16":
    return L[a >> 1];
   case "i32":
    return p[a >> 2];
   case "i64":
    return p[a >> 2];
   case "float":
    return ba[a >> 2];
   case "double":
    return ca[a >> 3];
   default:
    K("invalid type for setValue: " + b)
  }
  return null
 }

 function E(a, b, d, c) {
  var g, e;
  "number" === typeof a ? (g = !0, e = a) : (g = !1, e = a.length);
  var l = "string" === typeof b ? b : null;
  d = 4 == d ? c : [z, k.ba, k.Da, k.D][void 0 === d ? 2 : d](Math.max(e, l ? 1 : b.length));
  if (g) {
   c = d;
   u(0 == (d & 3));
   for (a = d + (e & -4); c < a; c += 4) p[c >> 2] = 0;
   for (a = d + e; c < a;) t[c++ >> 0] = 0;
   return d
  }
  if ("i8" === l) return a.subarray || a.slice ? v.set(a, d) : v.set(new Uint8Array(a), d), d;
  c = 0;
  for (var q, f; c < e;) {
   var h = a[c];
   "function" === typeof h && (h = k.Gb(h));
   g = l || b[c];
   0 === g ? c++ : ("i64" == g && (g = "i32"), Fa(d + c, h, g), f !== g && (q = k.ya(g), f = g), c += q)
  }
  return d
 }

 function C(a, b) {
  if (0 === b || !a) return "";
  for (var d = 0, r, g = 0;;) {
   r = v[a + g >> 0];
   d |= r;
   if (0 == r && !b) break;
   g++;
   if (b && g == b) break
  }
  b || (b = g);
  r = "";
  if (128 > d) {
   for (; 0 < b;) d = String.fromCharCode.apply(String, v.subarray(a, a + Math.min(b, 1024))), r = r ? r + d : d, a += 1024, b -= 1024;
   return r
  }
  return c.UTF8ToString(a)
 }

 function Ha(a, b) {
  for (var d, c, g, e, l, q, f = "";;) {
   d = a[b++];
   if (!d) return f;
   d & 128 ? (c = a[b++] & 63, 192 == (d & 224) ? f += String.fromCharCode((d & 31) << 6 | c) : (g = a[b++] & 63, 224 == (d & 240) ? d = (d & 15) << 12 | c << 6 | g : (e = a[b++] & 63, 240 == (d & 248) ? d = (d & 7) << 18 | c << 12 | g << 6 | e : (l = a[b++] & 63, 248 == (d & 252) ? d = (d & 3) << 24 | c << 18 | g << 12 | e << 6 | l : (q = a[b++] & 63, d = (d & 1) << 30 | c << 24 | g << 18 | e << 12 | l << 6 | q))), 65536 > d ? f += String.fromCharCode(d) : (d -= 65536, f += String.fromCharCode(55296 | d >> 10, 56320 | d & 1023)))) : f += String.fromCharCode(d)
  }
 }

 function G(a) {
  return Ha(v, a)
 }

 function ra(a, b, d, c) {
  if (!(0 < c)) return 0;
  var g = d;
  c = d + c - 1;
  for (var e = 0; e < a.length; ++e) {
   var l = a.charCodeAt(e);
   55296 <= l && 57343 >= l && (l = 65536 + ((l & 1023) << 10) | a.charCodeAt(++e) & 1023);
   if (127 >= l) {
    if (d >= c) break;
    b[d++] = l
   } else {
    if (2047 >= l) {
     if (d + 1 >= c) break;
     b[d++] = 192 | l >> 6
    } else {
     if (65535 >= l) {
      if (d + 2 >= c) break;
      b[d++] = 224 | l >> 12
     } else {
      if (2097151 >= l) {
       if (d + 3 >= c) break;
       b[d++] = 240 | l >> 18
      } else {
       if (67108863 >= l) {
        if (d + 4 >= c) break;
        b[d++] = 248 | l >> 24
       } else {
        if (d + 5 >= c) break;
        b[d++] = 252 | l >> 30;
        b[d++] = 128 | l >> 24 & 63
       }
       b[d++] = 128 | l >> 18 & 63
      }
      b[d++] = 128 | l >> 12 & 63
     }
     b[d++] = 128 | l >> 6 & 63
    }
    b[d++] = 128 | l & 63
   }
  }
  b[d] = 0;
  return d - g
 }

 function Ca(a, b, d) {
  return ra(a, v, b, d)
 }

 function Ia(a) {
  for (var b = 0, d = 0; d < a.length; ++d) {
   var c = a.charCodeAt(d);
   55296 <= c && 57343 >= c && (c = 65536 + ((c & 1023) << 10) | a.charCodeAt(++d) & 1023);
   127 >= c ? ++b : b = 2047 >= c ? b + 2 : 65535 >= c ? b + 3 : 2097151 >= c ? b + 4 : 67108863 >= c ? b + 5 : b + 6
  }
  return b
 }

 function mb(a) {
  function b(d, c, r) {
   c = c || Infinity;
   var g = "",
    e = [],
    l;
   if ("N" === a[q]) {
    q++;
    "K" === a[q] && q++;
    for (l = [];
     "E" !== a[q];)
     if ("S" === a[q]) {
      q++;
      var m = a.indexOf("_", q);
      l.push(h[a.substring(q, m) || 0] || "?");
      q = m + 1
     } else if ("C" === a[q]) l.push(l[l.length - 1]), q += 2;
    else {
     var m = parseInt(a.substr(q)),
      k = m.toString().length;
     if (!m || !k) {
      q--;
      break
     }
     var p = a.substr(q + k, m);
     l.push(p);
     h.push(p);
     q += k + m
    }
    q++;
    l = l.join("::");
    c--;
    if (0 === c) return d ? [l] : l
   } else if (("K" === a[q] || n && "L" === a[q]) && q++, m = parseInt(a.substr(q))) k = m.toString().length, l = a.substr(q + k, m), q += k + m;
   n = !1;
   "I" === a[q] ? (q++, m = b(!0), k = b(!0, 1, !0), g += k[0] + " " + l + "<" + m.join(", ") + ">") : g = l;
   a: for (; q < a.length && 0 < c--;)
    if (l = a[q++], l in f) e.push(f[l]);
    else switch (l) {
     case "P":
      e.push(b(!0, 1, !0)[0] + "*");
      break;
     case "R":
      e.push(b(!0, 1, !0)[0] + "&");
      break;
     case "L":
      q++;
      m = a.indexOf("E", q) - q;
      e.push(a.substr(q, m));
      q += m + 2;
      break;
     case "A":
      m = parseInt(a.substr(q));
      q += m.toString().length;
      if ("_" !== a[q]) throw "?";
      q++;
      e.push(b(!0, 1, !0)[0] + " [" + m + "]");
      break;
     case "E":
      break a;
     default:
      g += "?" + l;
      break a
    }
    r || 1 !== e.length || "void" !== e[0] || (e = []);
   return d ? (g && e.push(g + "?"), e) : g + ("(" + e.join(", ") + ")")
  }
  var d = !!c._10c97f83;
  if (d) try {
   var r = z(a.length);
   sa(a.substr(1), r);
   var g = z(4),
    e = c._10c97f83(r, 0, 0, g);
   if (0 === Ga(g, "i32") && e) return C(e)
  } catch (l) {} finally {
   r && y(r), g && y(g), e && y(e)
  }
  var q = 3,
   f = {
    v: "void",
    b: "bool",
    c: "char",
    s: "short",
    i: "int",
    l: "long",
    f: "float",
    d: "double",
    w: "wchar_t",
    a: "signed char",
    h: "unsigned char",
    t: "unsigned short",
    j: "unsigned int",
    m: "unsigned long",
    x: "long long",
    y: "unsigned long long",
    z: "..."
   },
   h = [],
   n = !0,
   r = a;
  try {
   if ("Object._2d2d9ef8" == a || "_2d2d9ef8" == a) return "main()";
   "number" === typeof a && (a = C(a));
   if ("_" !== a[0] || "_" !== a[1] || "Z" !== a[2]) return a;
   switch (a[3]) {
    case "n":
     return "operator new()";
    case "d":
     return "operator delete()"
   }
   r = b()
  } catch (p) {
   r += "?"
  }
  0 <= r.indexOf("?") && !d && k.K("warning: a problem occurred in builtin C++ name demangling; build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");
  return r
 }

 function nb(a) {
  return a.replace(/_5f2b43da[\w\d_]+/g, function(a) {
   var d = mb(a);
   return a === d ? a : a + " [" + d + "]"
  })
 }

 function ta() {
  var a = nb,
   b;
  a: {
   b = Error();
   if (!b.stack) {
    try {
     throw Error(0);
    } catch (d) {
     b = d
    }
    if (!b.stack) {
     b = "(no stack trace available)";
     break a
    }
   }
   b = b.stack.toString()
  }
  return a(b)
 }

 function ob(a) {
  0 < a % 4096 && (a += 4096 - a % 4096);
  return a
 }

 function R(a) {
  for (; 0 < a.length;) {
   var b = a.shift();
   if ("function" == typeof b) b();
   else {
    var d = b.n;
    "number" === typeof d ? void 0 === b.A ? k.C("v", d) : k.C("vi", d, [b.A]) : d(void 0 === b.A ? null : b.A)
   }
  }
 }

 function Ka(a) {
  ua.unshift(a)
 }

 function La(a) {
  Ma.unshift(a)
 }

 function T(a, b, d) {
  d = Array(0 < d ? d : Ia(a) + 1);
  a = ra(a, d, 0, d.length);
  b && (d.length = a);
  return d
 }

 function sa(a, b, d) {
  a = T(a, d);
  for (d = 0; d < a.length;) t[b + d >> 0] = a[d], d += 1
 }

 function da(a, b) {
  for (var d = 0; d < a.length; d++) t[b++ >> 0] = a[d]
 }

 function Na(a, b, d) {
  for (var c = 0; c < a.length; ++c) t[b++ >> 0] = a.charCodeAt(c);
  d || (t[b >> 0] = 0)
 }

 function Oa() {
  H++;
  c.monitorRunDependencies && c.monitorRunDependencies(H)
 }

 function Pa() {
  H--;
  c.monitorRunDependencies && c.monitorRunDependencies(H);
  if (0 == H && (null !== va && (clearInterval(va), va = null), U)) {
   var a = U;
   U = null;
   a()
  }
 }

 function V() {
  return !!V.o
 }

 function W() {
  var a = w.X;
  if (!a) return (f.setTempRet0(0), 0) | 0;
  var b = w.p[a],
   d = b.type;
  if (!d) return (f.setTempRet0(0), a) | 0;
  var r = Array.prototype.slice.call(arguments);
  c._4d72c8f5(d);
  W.buffer || (W.buffer = z(4));
  p[W.buffer >> 2] = a;
  for (var a = W.buffer, g = 0; g < r.length; g++)
   if (r[g] && c._1b40f68d(r[g], d, a)) return a = p[a >> 2], b.sa = a, (f.setTempRet0(r[g]), a) | 0;
  a = p[a >> 2];
  return (f.setTempRet0(d), a) | 0
 }

 function X(a) {
  return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400)
 }

 function ea(a, b) {
  for (var d = 0, c = 0; c <= b; d += a[c++]);
  return d
 }

 function Y(a, b) {
  for (var d = new Date(a.getTime()); 0 < b;) {
   var c = d.getMonth(),
    g = (X(d.getFullYear()) ? fa : ga)[c];
   if (b > g - d.getDate()) b -= g - d.getDate() + 1, d.setDate(1), 11 > c ? d.setMonth(c + 1) : (d.setMonth(0), d.setFullYear(d.getFullYear() + 1));
   else {
    d.setDate(d.getDate() + b);
    break
   }
  }
  return d
 }

 function Qa(a, b, d, c) {
  function g(a, b, d) {
   for (a = "number" === typeof a ? a.toString() : a || ""; a.length < b;) a = d[0] + a;
   return a
  }

  function e(a, b) {
   return g(a, b, "0")
  }

  function l(a, b) {
   function d(a) {
    return 0 > a ? -1 : 0 < a ? 1 : 0
   }
   var c;
   0 === (c = d(a.getFullYear() - b.getFullYear())) && 0 === (c = d(a.getMonth() - b.getMonth())) && (c = d(a.getDate() - b.getDate()));
   return c
  }

  function q(a) {
   switch (a.getDay()) {
    case 0:
     return new Date(a.getFullYear() - 1, 11, 29);
    case 1:
     return a;
    case 2:
     return new Date(a.getFullYear(), 0, 3);
    case 3:
     return new Date(a.getFullYear(), 0, 2);
    case 4:
     return new Date(a.getFullYear(), 0, 1);
    case 5:
     return new Date(a.getFullYear() - 1, 11, 31);
    case 6:
     return new Date(a.getFullYear() - 1, 11, 30)
   }
  }

  function f(a) {
   a = Y(new Date(a.k + 1900, 0, 1), a.fa);
   var b = q(new Date(a.getFullYear() + 1, 0, 4));
   return 0 >= l(q(new Date(a.getFullYear(), 0, 4)), a) ? 0 >= l(b, a) ? a.getFullYear() + 1 : a.getFullYear() : a.getFullYear() - 1
  }
  var h = p[c + 40 >> 2];
  c = {
   ib: p[c >> 2],
   hb: p[c + 4 >> 2],
   J: p[c + 8 >> 2],
   B: p[c + 12 >> 2],
   r: p[c + 16 >> 2],
   k: p[c + 20 >> 2],
   Ea: p[c + 24 >> 2],
   fa: p[c + 28 >> 2],
   Vb: p[c + 32 >> 2],
   gb: p[c + 36 >> 2],
   jb: h ? C(h) : ""
  };
  d = C(d);
  var h = {
    "%c": "%a %b %d %H:%M:%S %Y",
    "%D": "%m/%d/%y",
    "%F": "%Y-%m-%d",
    "%h": "%b",
    "%r": "%I:%M:%S %p",
    "%R": "%H:%M",
    "%T": "%H:%M:%S",
    "%x": "%m/%d/%y",
    "%X": "%H:%M:%S"
   },
   k;
  for (k in h) d = d.replace(new RegExp(k, "g"), h[k]);
  var n = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
   Ja = "January February March April May June July August September October November December".split(" "),
   h = {
    "%a": function(a) {
     return n[a.Ea].substring(0, 3)
    },
    "%A": function(a) {
     return n[a.Ea]
    },
    "%b": function(a) {
     return Ja[a.r].substring(0, 3)
    },
    "%B": function(a) {
     return Ja[a.r]
    },
    "%C": function(a) {
     return e((a.k + 1900) / 100 | 0, 2)
    },
    "%d": function(a) {
     return e(a.B, 2)
    },
    "%e": function(a) {
     return g(a.B, 2, " ")
    },
    "%g": function(a) {
     return f(a).toString().substring(2)
    },
    "%G": function(a) {
     return f(a)
    },
    "%H": function(a) {
     return e(a.J, 2)
    },
    "%I": function(a) {
     return e(13 > a.J ? a.J : a.J - 12, 2)
    },
    "%j": function(a) {
     return e(a.B + ea(X(a.k + 1900) ? fa : ga, a.r - 1), 3)
    },
    "%m": function(a) {
     return e(a.r + 1, 2)
    },
    "%M": function(a) {
     return e(a.hb, 2)
    },
    "%n": function() {
     return "\n"
    },
    "%p": function(a) {
     return 0 < a.J && 13 > a.J ? "AM" : "PM"
    },
    "%S": function(a) {
     return e(a.ib, 2)
    },
    "%t": function() {
     return "\t"
    },
    "%u": function(a) {
     return (new Date(a.k + 1900, a.r + 1, a.B, 0, 0, 0, 0)).getDay() || 7
    },
    "%U": function(a) {
     var b = new Date(a.k + 1900, 0, 1),
      d = 0 === b.getDay() ? b : Y(b, 7 - b.getDay());
     a = new Date(a.k + 1900, a.r, a.B);
     return 0 > l(d, a) ? e(Math.ceil((31 - d.getDate() + (ea(X(a.getFullYear()) ? fa : ga, a.getMonth() - 1) - 31) + a.getDate()) / 7), 2) : 0 === l(d, b) ? "01" : "00"
    },
    "%V": function(a) {
     var b = q(new Date(a.k + 1900, 0, 4)),
      d = q(new Date(a.k + 1901, 0, 4)),
      c = Y(new Date(a.k + 1900, 0, 1), a.fa);
     return 0 > l(c, b) ? "53" : 0 >= l(d, c) ? "01" : e(Math.ceil((b.getFullYear() < a.k + 1900 ? a.fa + 32 - b.getDate() : a.fa + 1 - b.getDate()) / 7), 2)
    },
    "%w": function(a) {
     return (new Date(a.k + 1900, a.r + 1, a.B, 0, 0, 0, 0)).getDay()
    },
    "%W": function(a) {
     var b = new Date(a.k, 0, 1),
      d = 1 === b.getDay() ? b :
      Y(b, 0 === b.getDay() ? 1 : 7 - b.getDay() + 1);
     a = new Date(a.k + 1900, a.r, a.B);
     return 0 > l(d, a) ? e(Math.ceil((31 - d.getDate() + (ea(X(a.getFullYear()) ? fa : ga, a.getMonth() - 1) - 31) + a.getDate()) / 7), 2) : 0 === l(d, b) ? "01" : "00"
    },
    "%y": function(a) {
     return (a.k + 1900).toString().substring(2)
    },
    "%Y": function(a) {
     return a.k + 1900
    },
    "%z": function(a) {
     a = a.gb;
     var b = 0 <= a;
     a = Math.abs(a) / 60;
     return (b ? "+" : "-") + String("0000" + (a / 60 * 100 + a % 60)).slice(-4)
    },
    "%Z": function(a) {
     return a.jb
    },
    "%%": function() {
     return "%"
    }
   };
  for (k in h) 0 <= d.indexOf(k) && (d = d.replace(new RegExp(k,
   "g"), h[k](c)));
  k = T(d, !1);
  if (k.length > b) return 0;
  da(k, a);
  return k.length - 1
 }

 function ha(a, b) {
  e.g.qa = a;
  e.g.ea = b;
  if (!e.g.n) return 1;
  if (0 == a) e.g.q = function() {
   setTimeout(e.g.aa, b)
  }, e.g.method = "timeout";
  else if (1 == a) e.g.q = function() {
   e.requestAnimationFrame(e.g.aa)
  }, e.g.method = "rAF";
  else if (2 == a) {
   if (!n.setImmediate) {
    var d = [];
    n.addEventListener("message", function(a) {
     a.source === n && "_bdadd5a" === a.data && (a.stopPropagation(), d.shift()())
    }, !0);
    n.setImmediate = function(a) {
     d.push(a);
     n.postMessage("_bdadd5a", "*")
    }
   }
   e.g.q = function() {
    n.setImmediate(e.g.aa)
   };
   e.g.method = "immediate"
  }
  return 0
 }

 function Ra(a, b, d, r, g) {
  c.noExitRuntime = !0;
  u(!e.g.n, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
  e.g.n = a;
  e.g.A = r;
  var m = e.g.M;
  e.g.aa = function() {
   if (!A)
    if (0 < e.g.Ca.length) {
     var b = Date.now(),
      d = e.g.Ca.shift();
     d.n(d.A);
     if (e.g.Z) {
      var g = e.g.Z,
       f = 0 == g % 1 ? g - 1 : Math.floor(g);
      e.g.Z = d.xb ? f : (8 * g + (f + .5)) / 9
     }
     console.log('main loop blocker "' +
      d.name + '" took ' + (Date.now() - b) + " ms");
     e.g.kb();
     setTimeout(e.g.aa, 0)
    } else m < e.g.M || (e.g.ja = e.g.ja + 1 | 0, 1 == e.g.qa && 1 < e.g.ea && 0 != e.g.ja % e.g.ea ? e.g.q() : ("timeout" === e.g.method && c.ia && (c.P("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!"), e.g.method = ""), e.g.$a(function() {
     "undefined" !== typeof r ? k.C("vi", a, [r]) : k.C("v", a)
    }), m < e.g.M || ("object" === typeof SDL && SDL.audio && SDL.audio.Xa && SDL.audio.Xa(), e.g.q())))
  };
  g || (b && 0 < b ? ha(0, 1E3 / b) : ha(1, 1), e.g.q());
  if (d) throw "SimulateInfiniteLoop";
 }

 function M() {
  M.actual || ("undefined" !== typeof dateNow ? M.actual = dateNow : "object" === typeof self && self.performance && "function" === typeof self.performance.now ? M.actual = function() {
   return self.performance.now()
  } : "object" === typeof performance && "function" === typeof performance.now ? M.actual = function() {
   return performance.now()
  } : M.actual = Date.now);
  return M.actual()
 }

 function z(a) {
  return k.D(a + 8) + 8 & 4294967288
 }

 function Sa(a) {
  c._505cfb22 && (p[c._505cfb22() >> 2] = a);
  return a
 }

 function ia(a) {
  var b = ia;
  b.o || (B = ob(B), b.o = !0, u(k.D), b.Ma = k.D, k.D = function() {
   K("cannot dynamically allocate, sbrk now has control")
  });
  var d = B;
  return 0 == a || b.Ma(a) ? d : 4294967295
 }

 function S(a) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + a + ")";
  this.status = a
 }

 function wa(a) {
  function b() {
   if (!c.calledRun && (c.calledRun = !0, !A)) {
    Z || (Z = !0, R(ja));
    R(Ta);
    if (c.onRuntimeInitialized) c.onRuntimeInitialized();
    c._2d2d9ef8 && Ua && c.callMain(a);
    if (c.postRun)
     for ("function" == typeof c.postRun && (c.postRun = [c.postRun]); c.postRun.length;) La(c.postRun.shift());
    R(Ma)
   }
  }
  a = a || c.arguments;
  null === Va && (Va = Date.now());
  if (!(0 < H)) {
   if (c.preRun)
    for ("function" == typeof c.preRun && (c.preRun = [c.preRun]); c.preRun.length;) Ka(c.preRun.shift());
   R(ua);
   0 < H || c.calledRun || (c.setStatus ? (c.setStatus("Running..."), setTimeout(function() {
    setTimeout(function() {
     c.setStatus("")
    }, 1);
    b()
   }, 1)) : b())
  }
 }

 function Wa(a, b) {
  if (!b || !c.noExitRuntime) {
   if (!c.noExitRuntime && (A = !0, D = pb, R(Xa), c.onExit)) c.onExit(a);
   throw new S(a);
  }
 }

 function K(a) {
  void 0 !== a ? (c.print(a), c.P(a), a = JSON.stringify(a)) : a = "";
  A = !0;
  var b = "abort(" + a + ") at " + ta() + "\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";
  Ya && Ya.forEach(function(d) {
   b = d(b, a)
  });
  throw b;
 }
 arguments = [];
 var h = {
   e: [],
   images: [],
   sockets: []
  },
  ma = !1,
  qb = function() {
   function a() {
    if (!b) {
     b = !0;
     var a = document.body,
      d = document.body.firstChild,
      e = document.getElementById("fontdetectHelper") || document.createElement("div");
     e.id = "fontdetectHelper";
     c = document.createElement("span");
     c.innerText = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
     e.appendChild(c);
     a.insertBefore(e, d);
     e.style.position = "absolute";
     e.style.visibility = "hidden";
     e.style.top = "-200px";
     e.style.left = "-100000px";
     e.style.width = "100000px";
     e.style.height = "200px";
     e.style.fontSize = "100px"
    }
   }
   var b = !1,
    d = ["serif", "sans-serif", "monospace", "cursive", "fantasy"],
    c = null;
   return {
    Nb: function(d, c, e, r) {
     if (d) {
      var f = r && r.Va ? r.Va : 100,
       h = r && r.Wa ? r.Wa : 2E3;
      if (c || e) {
       if (b || a(), this.W(d)) return void(c && c(d));
       var k = this,
        n = (new Date).getTime(),
        p = setInterval(function() {
         if (k.W(d)) return clearInterval(p), void c(d);
         (new Date).getTime() - n > h && (clearInterval(p), e && e(d))
        }, f)
      }
     }
    },
    W: function(e) {
     var m = 0,
      l = 0;
     b || a();
     for (var q = 0; q < d.length; ++q) {
      if (c.style.fontFamily = '"' + e + '",' + d[q], m = c.offsetWidth, 0 < q && m != l) return !1;
      l = m
     }
     return !0
    },
    $b: function(a) {
     a = (a instanceof Element ? n.getComputedStyle(a).getPropertyValue("font-family") : n.o ? $(a).yb("font-family") : "").split(",");
     for (var b = a.shift(); b;) {
      for (var b = b.replace(/^\s*['"]?\s*([^'"]*)\s*['"]?\s*$/, "$1"), c = 0; c < d.length; c++)
       if (b == d[c]) return b;
      if (this.W(b)) return b;
      b = a.shift()
     }
     return null
    }
   }
  }(),
  xa = !1,
  Ba = null;
 "undefined" == typeof c && (c = {});
 c.postRun = c.preRun || [];
 c.postRun.push(function() {
  "requestIdleCallback" in n && n.requestIdleCallback(Aa)
 });
 var c = c || {};
 c.postRun = c.postRun || [];
 c.postRun.push(function() {
  console.log("postRun");
  n.core = {
   connect: function(a) {
    a = P(a);
    rb(a);
    y(a)
   },
   sendNick: function(a) {
    a = P(a);
    sb(a);
    y(a)
   },
   sendSpectate: function() {
    tb()
   },
   setTarget: function(a, b) {
    ub(a, b)
   },
   playerZoom: function(a) {
    vb(a)
   },
   split: function() {
    wb()
   },
   eject: function() {
    xb()
   },
   specialOn: function() {
    yb()
   },
   specialOff: function() {
    zb()
   },
   registerSkin: function(a, b, d, c, e) {
    a = a ? P(a.toLowerCase()) : 0;
    b = b ? P(b) : 0;
    d = P(d);
    Ab(a, b, d, c, e | 0);
    y(a);
    y(b);
    y(d)
   },
   proxyMobileData: function(a) {
    var b = z(a.length);
    v.set(a, b);
    Bb(b, a.length);
    y(b)
   },
   setFadeout: function(a) {
    Cb(a)
   },
   setShowMass: function(a) {
    Db(a)
   },
   setDarkTheme: function(a) {
    Eb(a)
   },
   setNames: function(a) {
    Fb(a)
   },
   setColors: function(a) {
    Gb(!a)
   },
   setSkins: function(a) {
    Hb(a)
   },
   setAcid: function(a) {
    Ib(a)
   },
   sendCaptchaResponse: function(a) {
    a = P(a);
    Jb(a);
    y(a)
   },
   destroy: function() {
    delete n.core;
    ma = !0;
    try {
     Kb()
    } catch (a) {}
    for (var b = 0; b < h.sockets.length; ++b) null != h.sockets[b] && za(b)
   }
  };
  setTimeout(Da, 1E3);
  if (n.MC && n.MC.onAgarioCoreLoaded) n.MC.onAgarioCoreLoaded()
 });
 c.noExitRuntime = !0;
 c.print = function(a) {
  console.log(a)
 };
 c.printErr = function(a) {
  console.error(a)
 };
 c.setStatus = function(a) {
  console.log(a)
 };
 c.totalDependencies = 0;
 c.monitorRunDependencies = function(a) {
  console.log(a + " dependencies left")
 };
 c.setStatus("Downloading agario.core.js...");
 c || (c = eval("(function() { try { return Module || {} } catch(e) { return {} } })()"));
 var ka = {},
  I;
 for (I in c) c.hasOwnProperty(I) && (ka[I] = c[I]);
 c.read = function(a) {
  var b = new XMLHttpRequest;
  b.open("GET.html", a, !1);
  b.send(null);
  return b.responseText
 };
 "undefined" != typeof arguments && (c.arguments = arguments);
 "undefined" !== typeof console ? (c.print || (c.print = function(a) {
  console.log(a)
 }), c.printErr || (c.printErr = function(a) {
  console.log(a)
 })) : c.print || (c.print = function() {});
 "undefined" === typeof c.setWindowTitle && (c.setWindowTitle = function(a) {
  document.title = a
 });
 !c.load && c.read && (c.load = function(a) {
  kb(c.read(a))
 });
 c.print || (c.print = function() {});
 c.printErr || (c.printErr = c.print);
 c.arguments || (c.arguments = []);
 c.thisProgram || (c.thisProgram = "./this.program");
 c.print = c.print;
 c.P = c.printErr;
 c.preRun = [];
 c.postRun = [];
 for (I in ka) ka.hasOwnProperty(I) && (c[I] = ka[I]);
 var k = {
  eb: function(a) {
   Za = a
  },
  Qa: function() {
   return Za
  },
  pa: function() {
   return D
  },
  da: function(a) {
   D = a
  },
  ya: function(a) {
   switch (a) {
    case "i1":
    case "i8":
     return 1;
    case "i16":
     return 2;
    case "i32":
     return 4;
    case "i64":
     return 8;
    case "float":
     return 4;
    case "double":
     return 8;
    default:
     return "*" === a[a.length - 1] ? k.u : "i" === a[0] ? (a = parseInt(a.substr(1)), u(0 === a % 8), a / 8) : 0
   }
  },
  Pa: function(a) {
   return Math.max(k.ya(a), k.u)
  },
  ob: 16,
  Pb: function(a, b) {
   "double" === b || "i64" === b ? a & 7 && (u(4 === (a & 7)), a += 4) : u(0 === (a & 3));
   return a
  },
  Db: function(a, b, d) {
   return d || "i64" != a && "double" != a ? a ? Math.min(b || (a ? k.Pa(a) : 0), k.u) : Math.min(b, 8) : 8
  },
  C: function(a, b, d) {
   return d && d.length ? (d.splice || (d = Array.prototype.slice.call(d)), d.splice(0, 0, b), c["dynCall_" + a].apply(null, d)) : c["dynCall_" + a].call(null, b)
  },
  T: [],
  Ha: function(a) {
   for (var b = 0; b < k.T.length; b++)
    if (!k.T[b]) return k.T[b] = a, 2 * (1 + b);
   throw "Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.";
  },
  Ya: function(a) {
   k.T[(a - 2) / 2] = null
  },
  K: function(a) {
   k.K.o || (k.K.o = {});
   k.K.o[a] || (k.K.o[a] = 1, c.P(a))
  },
  ka: {},
  Fb: function(a, b) {
   u(b);
   k.ka[b] || (k.ka[b] = {});
   var d = k.ka[b];
   d[a] || (d[a] = function() {
    return k.C(b, a, arguments)
   });
   return d[a]
  },
  Eb: function() {
   throw "You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work";
  },
  ba: function(a) {
   var b = D;
   D = D + a | 0;
   D = D + 15 & -16;
   return b
  },
  Da: function(a) {
   var b = N;
   N = N + a | 0;
   N = N + 15 & -16;
   return b
  },
  D: function(a) {
   var b = B;
   B = B + a | 0;
   B = B + 15 & -16;
   if (a = B >= O) K("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + O + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which adjusts the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 "), a = !0;
   return a ? (B = b, 0) : b
  },
  ha: function(a, b) {
   return Math.ceil(a / (b ? b : 16)) * (b ? b : 16)
  },
  Kb: function(a, b, d) {
   return d ? +(a >>> 0) + 4294967296 * +(b >>> 0) : +(a >>> 0) + 4294967296 * +(b | 0)
  },
  ga: 8,
  u: 4,
  pb: 0
 };
 c.Runtime = k;
 k.addFunction = k.Ha;
 k.removeFunction = k.Ya;
 var A = !1,
  Q, na, Za, $a, ab;
 (function() {
  function a(a) {
   a = a.toString().match(c).slice(1);
   return {
    arguments: a[0],
    body: a[1],
    returnValue: a[2]
   }
  }
  var b = {
    stackSave: function() {
     k.pa()
    },
    stackRestore: function() {
     k.da()
    },
    arrayToC: function(a) {
     var b = k.ba(a.length);
     da(a, b);
     return b
    },
    stringToC: function(a) {
     var b = 0;
     null !== a && void 0 !== a && 0 !== a && (b = k.ba((a.length << 2) + 1), sa(a, b));
     return b
    }
   },
   d = {
    string: b.stringToC,
    array: b.arrayToC
   };
  ab = function(a, b, c, e, r) {
   a = Ea(a);
   var g = [],
    m = 0;
   if (e)
    for (var f = 0; f < e.length; f++) {
     var h = d[c[f]];
     h ? (0 === m && (m = k.pa()), g[f] = h(e[f])) : g[f] = e[f]
    }
   c = a.apply(null, g);
   "string" === b && (c = C(c));
   if (0 !== m) {
    if (r && r.async) {
     EmterpreterAsync.rb.push(function() {
      k.da(m)
     });
     return
    }
    k.da(m)
   }
   return c
  };
  var c = /^function\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/,
   e = {},
   m;
  for (m in b) b.hasOwnProperty(m) && (e[m] = a(b[m]));
  $a = function(b, d, c) {
   c = c || [];
   var r = Ea(b);
   b = c.every(function(a) {
    return "number" === a
   });
   var m = "string" !== d;
   if (m && b) return r;
   var f = c.map(function(a, b) {
    return "$" + b
   });
   d = "(function(" + f.join(",") + ") {";
   var h = c.length;
   if (!b) {
    d += "var stack = " + e.stackSave.body + ";";
    for (var k = 0; k < h; k++) {
     var n = f[k],
      p = c[k];
     "number" !== p && (p = e[p + "ToC"], d += "var " + p.arguments + " = " + n + ";", d += p.body + ";", d += n + "=" + p.returnValue + ";")
    }
   }
   c = a(function() {
    return r
   }).returnValue;
   d += "var ret = " + c + "(" + f.join(",") + ");";
   m || (c = a(function() {
    return C
   }).returnValue, d += "ret = " + c + "(ret);");
   b || (d += e.stackRestore.body.replace("()", "(stack)") + ";");
   return eval(d + "return ret})")
  }
 })();
 c.ccall = ab;
 c.cwrap = $a;
 c.setValue = Fa;
 c.getValue = Ga;
 c.ALLOC_NORMAL = 0;
 c.ALLOC_STACK = 1;
 c.ALLOC_STATIC = 2;
 c.ALLOC_DYNAMIC = 3;
 c.ALLOC_NONE = 4;
 c.allocate = E;
 c.getMemory = function(a) {
  return bb ? "undefined" !== typeof ia && !ia.o || !Z ? k.D(a) : z(a) : k.Da(a)
 };
 c.Pointer_stringify = C;
 c.AsciiToString = function(a) {
  for (var b = "";;) {
   var d = t[a++ >> 0];
   if (!d) return b;
   b += String.fromCharCode(d)
  }
 };
 c.stringToAscii = function(a, b) {
  return Na(a, b, !1)
 };
 c.UTF8ArrayToString = Ha;
 c.UTF8ToString = G;
 c.stringToUTF8Array = ra;
 c.stringToUTF8 = Ca;
 c.lengthBytesUTF8 = Ia;
 c.UTF16ToString = function(a) {
  for (var b = 0, d = "";;) {
   var c = L[a + 2 * b >> 1];
   if (0 == c) return d;
   ++b;
   d += String.fromCharCode(c)
  }
 };
 c.stringToUTF16 = function(a, b, d) {
  void 0 === d && (d = 2147483647);
  if (2 > d) return 0;
  d -= 2;
  var c = b;
  d = d < 2 * a.length ? d / 2 : a.length;
  for (var e = 0; e < d; ++e) L[b >> 1] = a.charCodeAt(e), b += 2;
  L[b >> 1] = 0;
  return b - c
 };
 c.lengthBytesUTF16 = function(a) {
  return 2 * a.length
 };
 c.UTF32ToString = function(a) {
  for (var b = 0, d = "";;) {
   var c = p[a + 4 * b >> 2];
   if (0 == c) return d;
   ++b;
   65536 <= c ? (c = c - 65536, d += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023)) : d += String.fromCharCode(c)
  }
 };
 c.stringToUTF32 = function(a, b, d) {
  void 0 === d && (d = 2147483647);
  if (4 > d) return 0;
  var c = b;
  d = c + d - 4;
  for (var e = 0; e < a.length; ++e) {
   var m = a.charCodeAt(e);
   if (55296 <= m && 57343 >= m) var l = a.charCodeAt(++e),
    m = 65536 + ((m & 1023) << 10) | l & 1023;
   p[b >> 2] = m;
   b += 4;
   if (b + 4 > d) break
  }
  p[b >> 2] = 0;
  return b - c
 };
 c.lengthBytesUTF32 = function(a) {
  for (var b = 0, c = 0; c < a.length; ++c) {
   var e = a.charCodeAt(c);
   55296 <= e && 57343 >= e && ++c;
   b += 4
  }
  return b
 };
 c.stackTrace = ta;
 for (var t, v, L, cb, p, aa, ba, ca, db = 0, N = 0, bb = !1, eb = 0, D = 0, ya = 0, fb = 0, B = 0, gb = c.TOTAL_STACK || 5242880, O = c.TOTAL_MEMORY || 33554432, F = 65536; F < O || F < 2 * gb;) F = 16777216 > F ? 2 * F : F + 16777216;
 F !== O && (O = F);
 u("undefined" !== typeof Int32Array && "undefined" !== typeof Float64Array && !!(new Int32Array(1)).subarray && !!(new Int32Array(1)).set, "JS engine does not provide full typed array support");
 var x;
 x = new ArrayBuffer(O);
 t = new Int8Array(x);
 L = new Int16Array(x);
 p = new Int32Array(x);
 v = new Uint8Array(x);
 cb = new Uint16Array(x);
 aa = new Uint32Array(x);
 ba = new Float32Array(x);
 ca = new Float64Array(x);
 p[0] = 255;
 u(255 === v[0] && 0 === v[3], "Typed arrays 2 must be run on a little-endian system");
 c.HEAP = void 0;
 c.buffer = x;
 c.HEAP8 = t;
 c.HEAP16 = L;
 c.HEAP32 = p;
 c.HEAPU8 = v;
 c.HEAPU16 = cb;
 c.HEAPU32 = aa;
 c.HEAPF32 = ba;
 c.HEAPF64 = ca;
 var ua = [],
  ja = [],
  Ta = [],
  Xa = [],
  Ma = [],
  Z = !1;
 c.addOnPreRun = Ka;
 c.addOnInit = function(a) {
  ja.unshift(a)
 };
 c.addOnPreMain = function(a) {
  Ta.unshift(a)
 };
 c.addOnExit = function(a) {
  Xa.unshift(a)
 };
 c.addOnPostRun = La;
 c.intArrayFromString = T;
 c.intArrayToString = function(a) {
  for (var b = [], c = 0; c < a.length; c++) {
   var e = a[c];
   255 < e && (e &= 255);
   b.push(String.fromCharCode(e))
  }
  return b.join("")
 };
 c.writeStringToMemory = sa;
 c.writeArrayToMemory = da;
 c.writeAsciiToMemory = Na;
 Math.imul && -5 === Math.imul(4294967295, 5) || (Math.imul = function(a, b) {
  var c = a & 65535,
   e = b & 65535;
  return c * e + ((a >>> 16) * e + c * (b >>> 16) << 16) | 0
 });
 Math.Jb = Math.imul;
 Math.clz32 || (Math.clz32 = function(a) {
  a = a >>> 0;
  for (var b = 0; 32 > b; b++)
   if (a & 1 << 31 - b) return b;
  return 32
 });
 Math.wb = Math.clz32;
 var oa = Math.abs,
  Lb = Math.cos,
  Mb = Math.sin,
  Nb = Math.atan2,
  qa = Math.ceil,
  pa = Math.floor,
  Ob = Math.pow,
  lb = Math.min,
  H = 0,
  va = null,
  U = null;
 c.addRunDependency = Oa;
 c.removeRunDependency = Pa;
 c.preloadedImages = {};
 c.preloadedAudios = {};
 var J = [function(a, b) {
   return a % b
  }, function() {
   if (n.MC && n.MC.onDisconnect) n.MC.onDisconnect()
  }, function() {
   n.MC && n.MC.doLogin && n.MC.doLogin()
  }, function() {
   n.MC && n.MC.corePendingReload && n.MC.corePendingReload()
  }, function() {
   n.logout && n.logout()
  }, function(a, b) {
   var c = v.subarray(a, a + b);
   if (n.MC && n.MC.onMobileData) n.MC.onMobileData(c)
  }, function(a) {
   n.MC && n.MC.updateServerVersion && n.MC.updateServerVersion(G(a))
  }, function(a) {
   h.e[a] = null
  }, function() {
   for (var a = document.createElement("canvas").getContext("2d"), b = 0; b < h.e.length; ++b)
    if (null == h.e[b]) return h.e[b] = a, b;
   h.e.push(a);
   return h.e.length - 1
  }, function(a, b, c) {
   a = h.e[a].canvas;
   a.width = b;
   a.height = c
  }, function(a, b, c) {
   a = h.e[a].canvas;
   p[b >> 2] = a.width;
   p[c >> 2] = a.height
  }, function(a) {
   h.e[a].save()
  }, function(a) {
   h.e[a].restore()
  }, function(a) {
   h.e[a].fill()
  }, function(a) {
   h.e[a].stroke()
  }, function(a) {
   h.e[a].clip()
  }, function(a) {
   h.e[a].beginPath()
  }, function(a) {
   h.e[a].closePath()
  }, function(a, b, c, e, g) {
   h.e[a].clearRect(b, c, e, g)
  }, function(a, b, c, e, g) {
   h.e[a].fillRect(b, c, e, g)
  }, function(a, b, c, e) {
   h.e[a].fillStyle = "rgb(" + b + "," + c + "," + e + ")"
  }, function(a, b, c, e) {
   h.e[a].strokeStyle = "rgb(" + b + "," + c + "," + e + ")"
  }, function(a, b) {
   h.e[a].globalAlpha = b
  }, function(a, b, c) {
   h.e[a].moveTo(b, c)
  }, function(a, b, c) {
   h.e[a].lineTo(b, c)
  }, function(a, b, c, e, g, m, l) {
   h.e[a].arc(b, c, e, g, m, l)
  }, function(a, b, c) {
   h.e[a].scale(b, c)
  }, function(a, b, c) {
   h.e[a].translate(b, c)
  }, function(a, b) {
   h.e[a].lineWidth = b
  }, function(a, b, c, e) {
   h.e[a].drawImage(h.e[b].canvas, c, e)
  }, function(a, b, c, e, g, m) {
   b = h.e[b].canvas;
   h.e[a].drawImage(b, 0, 0, b.width, b.height, c, e, g, m)
  }, function(a, b, c, e, g, m) {
   b = h.images[b];
   b.complete && h.e[a].drawImage(b, 0, 0, b.width, b.height, c, e, g, m)
  }, function(a, b, c, e) {
   h.e[a].fillText(G(b), c, e)
  }, function(a, b, c, e) {
   h.e[a].strokeText(G(b), c, e)
  }, function(a, b) {
   return h.e[a].measureText(G(b)).width
  }, function(a, b) {
   h.e[a].font = ~~b + "px Ubuntu"
  }, function(a) {
   h.e[a].lineCap = "butt"
  }, function(a) {
   h.e[a].lineCap = "round"
  }, function(a) {
   h.e[a].lineCap = "square"
  }, function(a) {
   h.e[a].lineJoin = "round"
  }, function(a) {
   h.e[a].lineJoin = "bevel"
  }, function(a) {
   h.e[a].lineJoin = "miter"
  }, function(a) {
   h.e[a].textBaseline = "top"
  }, function(a) {
   h.e[a].textBaseline = "hanging"
  }, function(a) {
   h.e[a].textBaseline = "middle"
  }, function(a) {
   h.e[a].textBaseline = "alphabetic"
  }, function(a) {
   h.e[a].textBaseline = "ideographic"
  }, function(a) {
   h.e[a].textBaseline = "bottom"
  }, function(a) {
   a = document.getElementById(G(a));
   if (null == a) return -1;
   a = a.getContext("2d");
   for (var b = 0; b < h.e.length; ++b)
    if (null == h.e[b]) return h.e[b] = a, b;
   h.e.push(a);
   return h.e.length - 1
  }, function() {
   xa || (xa = qb.W("Ubuntu"));
   return xa
  }, function(a) {
   var b = new Image;
   b.src = G(a);
   for (a = 0; a < h.images.length; ++a)
    if (null == h.images[a]) return h.images[a] = b, a;
   h.images.push(b);
   return h.images.length - 1
  }, function(a, b, c, e) {
   a = h.images[a];
   v[b >> 0] = (a.complete && 0 < a.width) | 0;
   p[c >> 2] = a.width;
   p[e >> 2] = a.height
  }, function(a) {
   var b = new WebSocket(G(a));
   b.binaryType = "arraybuffer";
   b.events = [];
   b.onopen = function() {
    b.events.push([2, 0, 0]);
    la()
   };
   b.onerror = function() {
    b.events.push([3, 0, 0]);
    la()
   };
   b.onclose = function() {
    b.events.push([4, 0, 0]);
    la()
   };
   b.onmessage = function(a) {
    a = new Uint8Array(a.data);
    var c = z(a.length);
    da(a, c);
    b.events.push([1, c, a.length]);
    la()
   };
   for (a = 0; a < h.sockets.length; ++a)
    if (null == h.sockets[a]) return h.sockets[a] = b, a;
   h.sockets.push(b);
   return h.sockets.length - 1
  }, function(a) {
   za(a)
  }, function(a, b, c) {
   a = h.sockets[a];
   if (1 != a.readyState) return 0;
   a.send(t.subarray(b, b + c));
   return 1
  }, function(a, b, c) {
   a = h.sockets[a];
   if (0 == a.events.length) return 0;
   a = a.events.shift();
   aa[b >> 2] = a[1];
   p[c >> 2] = a[2];
   return a[0]
  }, function() {
   return 2 <= Ba.timeRemaining()
  }, function() {
   return Math.random()
  }, function() {
   if (n.MC && n.MC.onPlayerSpawn) n.MC.onPlayerSpawn()
  }, function(a, b, c, e, g, m) {
   if (n.MC && n.MC.onPlayerDeath) n.MC.onPlayerDeath(a, b, c, e, g, m)
  }],
  db = 8,
  N = db + 24336;
 ja.push({
  n: function() {
   Pb()
  }
 }, {
  n: function() {
   Qb()
  }
 }, {
  n: function() {
   Rb()
  }
 }, {
  n: function() {
   Sb()
  }
 }, {
  n: function() {
   Tb()
  }
 });
 E([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 240, 63, 0, 0, 0, 0, 0, 0, 0, 0, 172, 14, 0, 0, 204, 73, 0, 0, 224, 2, 0, 0, 0, 0, 0, 0, 132, 14, 0, 0, 217, 73, 0, 0, 132, 14, 0, 0, 230, 73, 0, 0, 172, 14, 0, 0, 243, 73, 0, 0, 232, 2, 0, 0, 0, 0, 0, 0, 172, 14, 0, 0, 20, 74, 0, 0, 240, 2, 0, 0, 0, 0, 0, 0, 172, 14, 0, 0, 54, 74, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 172, 14, 0, 0, 91, 74, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 132, 14, 0, 0, 11, 86, 0, 0, 132, 14, 0, 0, 29, 86, 0, 0, 172, 14, 0, 0, 111, 86, 0, 0, 48, 10, 0, 0, 0, 0, 0, 0, 212, 14, 0, 0, 133, 86, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 96, 9, 0, 0, 2, 0, 0, 0, 212, 14, 0, 0, 151, 86, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 104, 9, 0, 0, 2, 0, 0, 0, 212, 14, 0, 0, 185, 86, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 104, 9, 0, 0, 2, 0, 0, 0, 212, 14, 0, 0, 220, 86, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 104, 9, 0, 0, 2, 0, 0, 0, 172, 14, 0, 0, 255, 86, 0, 0, 176, 3, 0, 0, 0, 0, 0, 0, 172, 14, 0, 0, 33, 87, 0, 0, 176, 3, 0, 0, 0, 0, 0, 0, 212, 14, 0, 0, 68, 87, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 104, 9, 0, 0, 2, 0, 0, 0, 172, 14, 0, 0, 102, 87, 0, 0, 64, 3, 0, 0, 0, 0, 0, 0, 172, 14, 0, 0, 124, 87, 0, 0, 64, 3, 0, 0, 0, 0, 0, 0, 172, 14, 0, 0, 144, 87, 0, 0, 64, 3, 0, 0, 0, 0, 0, 0, 212, 14, 0, 0, 164, 87, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 96, 9, 0, 0, 2, 0, 0, 0, 172, 14, 0, 0, 182, 87, 0, 0, 64, 3, 0, 0, 0, 0, 0, 0, 172, 14, 0, 0, 203, 87, 0, 0, 64, 3, 0, 0, 0, 0, 0, 0, 212, 14, 0, 0, 224, 87, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 112, 9, 0, 0, 0, 0, 0, 0, 212, 14, 0, 0, 36, 88, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 136, 9, 0, 0, 0, 0, 0, 0, 212, 14, 0, 0, 104, 88, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 160, 9, 0, 0, 0, 0, 0, 0, 212, 14, 0, 0, 172, 88, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 184, 9, 0, 0, 0, 0, 0, 0, 212, 14, 0, 0, 240, 88, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 208, 9, 0, 0, 2, 0, 0, 0, 216, 9, 0, 0, 0, 8, 0, 0, 212, 14, 0, 0, 53, 89, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 208, 9, 0, 0, 2, 0, 0, 0, 224, 9, 0, 0, 0, 8, 0, 0, 212, 14, 0, 0, 122, 89, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 232, 9, 0, 0, 0, 8, 0, 0, 212, 14, 0, 0, 191, 89, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 232, 9, 0, 0, 0, 8, 0, 0, 212, 14, 0, 0, 4, 90, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 240, 9, 0, 0, 2, 0, 0, 0, 212, 14, 0, 0, 32, 90, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 240, 9, 0, 0, 2, 0, 0, 0, 212, 14, 0, 0, 60, 90, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 240, 9, 0, 0, 2, 0, 0, 0, 212, 14, 0, 0, 88, 90, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 240, 9, 0, 0, 2, 0, 0, 0, 212, 14, 0, 0, 116, 90, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 248, 9, 0, 0, 0, 0, 0, 0, 212, 14, 0, 0, 186, 90, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 212, 14, 0, 0, 0, 91, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 8, 10, 0, 0, 0, 0, 0, 0, 212, 14, 0, 0, 70, 91, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 16, 10, 0, 0, 0, 0, 0, 0, 212, 14, 0, 0, 140, 91, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 24, 10, 0, 0, 2, 0, 0, 0, 212, 14, 0, 0, 161, 91, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 64, 3, 0, 0, 2, 0, 0, 0, 24, 10, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 132, 14, 0, 0, 216, 94, 0, 0, 132, 14, 0, 0, 193, 94, 0, 0, 212, 14, 0, 0, 171, 94, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 40, 10, 0, 0, 0, 0, 0, 0, 212, 14, 0, 0, 124, 94, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 40, 10, 0, 0, 0, 0, 0, 0, 212, 14, 0, 0, 102, 94, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 32, 10, 0, 0, 0, 0, 0, 0, 212, 14, 0, 0, 55, 94, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 32, 10, 0, 0, 0, 0, 0, 0, 132, 14, 0, 0, 36, 94, 0, 0, 132, 14, 0, 0, 2, 94, 0, 0, 132, 14, 0, 0, 224, 93, 0, 0, 132, 14, 0, 0, 203, 93, 0, 0, 132, 14, 0, 0, 182, 93, 0, 0, 132, 14, 0, 0, 157, 93, 0, 0, 132, 14, 0, 0, 132, 93, 0, 0, 132, 14, 0, 0, 107, 93, 0, 0, 132, 14, 0, 0, 82, 93, 0, 0, 132, 14, 0, 0, 58, 93, 0, 0, 132, 14, 0, 0, 77, 94, 0, 0, 132, 14, 0, 0, 146, 94, 0, 0, 132, 14, 0, 0, 237, 94, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 6, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 9, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 10, 0, 0, 0, 11, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 12, 0, 0, 0, 4, 0, 0, 0, 6, 0, 0, 0, 13, 0, 0, 0, 14, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 15, 0, 0, 0, 5, 0, 0, 0, 8, 0, 0, 0, 16, 0, 0, 0, 17, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 18, 0, 0, 0, 6, 0, 0, 0, 10, 0, 0, 0, 19, 0, 0, 0, 20, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 21, 0, 0, 0, 7, 0, 0, 0, 12, 0, 0, 0, 22, 0, 0, 0, 23, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 24, 0, 0, 0, 8, 0, 0, 0, 14, 0, 0, 0, 25, 0, 0, 0, 26, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 27, 0, 0, 0, 9, 0, 0, 0, 16, 0, 0, 0, 28, 0, 0, 0, 29, 0, 0, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 30, 0, 0, 0, 10, 0, 0, 0, 18, 0, 0, 0, 31, 0, 0, 0, 32, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 33, 0, 0, 0, 11, 0, 0, 0, 20, 0, 0, 0, 34, 0, 0, 0, 35, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 36, 0, 0, 0, 12, 0, 0, 0, 22, 0, 0, 0, 37, 0, 0, 0, 38, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 39, 0, 0, 0, 13, 0, 0, 0, 24, 0, 0, 0, 40, 0, 0, 0, 41, 0, 0, 0, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 42, 0, 0, 0, 14, 0, 0, 0, 26, 0, 0, 0, 43, 0, 0, 0, 44, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 45, 0, 0, 0, 15, 0, 0, 0, 28, 0, 0, 0, 46, 0, 0, 0, 47, 0, 0, 0, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 48, 0, 0, 0, 16, 0, 0, 0, 30, 0, 0, 0, 49, 0, 0, 0, 50, 0, 0, 0, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51, 0, 0, 0, 52, 0, 0, 0, 56, 0, 0, 0, 248, 255, 255, 255, 0, 0, 0, 0, 53, 0, 0, 0, 54, 0, 0, 0, 192, 255, 255, 255, 192, 255, 255, 255, 0, 0, 0, 0, 55, 0, 0, 0, 56, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 0, 0, 0, 58, 0, 0, 0, 192, 255, 255, 255, 192, 255, 255, 255, 0, 0, 0, 0, 59, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 61, 0, 0, 0, 62, 0, 0, 0, 32, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 17, 0, 0, 0, 18, 0, 0, 0, 2, 0, 0, 0, 19, 0, 0, 0, 20, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 248, 12, 0, 0, 196, 13, 0, 0, 52, 13, 0, 0, 72, 13, 0, 0, 0, 14, 0, 0, 20, 14, 0, 0, 236, 13, 0, 0, 216, 13, 0, 0, 32, 13, 0, 0, 12, 13, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 0, 0, 0, 64, 0, 0, 0, 56, 0, 0, 0, 248, 255, 255, 255, 0, 0, 0, 0, 65, 0, 0, 0, 66, 0, 0, 0, 192, 255, 255, 255, 192, 255, 255, 255, 0, 0, 0, 0, 67, 0, 0, 0, 68, 0, 0, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 0, 0, 0, 70, 0, 0, 0, 200, 255, 255, 255, 200, 255, 255, 255, 0, 0, 0, 0, 71, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 35, 69, 103, 137, 171, 205, 239, 254, 220, 186, 152, 118, 84, 50, 16, 240, 225, 210, 195, 0, 0, 0, 0, 208, 2, 0, 0, 73, 0, 0, 0, 74, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 75, 0, 0, 0, 76, 0, 0, 0, 77, 0, 0, 0, 78, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 16, 3, 0, 0, 75, 0, 0, 0, 79, 0, 0, 0, 77, 0, 0, 0, 78, 0, 0, 0, 4, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 32, 3, 0, 0, 75, 0, 0, 0, 80, 0, 0, 0, 77, 0, 0, 0, 78, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 192, 3, 0, 0, 192, 4, 0, 0, 192, 5, 0, 0, 192, 6, 0, 0, 192, 7, 0, 0, 192, 8, 0, 0, 192, 9, 0, 0, 192, 10, 0, 0, 192, 11, 0, 0, 192, 12, 0, 0, 192, 13, 0, 0, 192, 14, 0, 0, 192, 15, 0, 0, 192, 16, 0, 0, 192, 17, 0, 0, 192, 18, 0, 0, 192, 19, 0, 0, 192, 20, 0, 0, 192, 21, 0, 0, 192, 22, 0, 0, 192, 23, 0, 0, 192, 24, 0, 0, 192, 25, 0, 0, 192, 26, 0, 0, 192, 27, 0, 0, 192, 28, 0, 0, 192, 29, 0, 0, 192, 30, 0, 0, 192, 31, 0, 0, 192, 0, 0, 0, 179, 1, 0, 0, 195, 2, 0, 0, 195, 3, 0, 0, 195, 4, 0, 0, 195, 5, 0, 0, 195, 6, 0, 0, 195, 7, 0, 0, 195, 8, 0, 0, 195, 9, 0, 0, 195, 10, 0, 0, 195, 11, 0, 0, 195, 12, 0, 0, 195, 13, 0, 0, 211, 14, 0, 0, 195, 15, 0, 0, 195, 0, 0, 12, 187, 1, 0, 12, 195, 2, 0, 12, 195, 3, 0, 12, 195, 4, 0, 12, 211, 128, 51, 0, 0, 104, 24, 0, 0, 104, 18, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 100, 0, 0, 0, 232, 3, 0, 0, 16, 39, 0, 0, 160, 134, 1, 0, 64, 66, 15, 0, 128, 150, 152, 0, 0, 225, 245, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 6, 0, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 9, 0, 0, 0, 10, 0, 0, 0, 11, 0, 0, 0, 12, 0, 0, 0, 13, 0, 0, 0, 14, 0, 0, 0, 15, 0, 0, 0, 16, 0, 0, 0, 17, 0, 0, 0, 18, 0, 0, 0, 19, 0, 0, 0, 20, 0, 0, 0, 21, 0, 0, 0, 22, 0, 0, 0, 23, 0, 0, 0, 24, 0, 0, 0, 25, 0, 0, 0, 26, 0, 0, 0, 27, 0, 0, 0, 28, 0, 0, 0, 29, 0, 0, 0, 30, 0, 0, 0, 31, 0, 0, 0, 32, 0, 0, 0, 33, 0, 0, 0, 34, 0, 0, 0, 35, 0, 0, 0, 36, 0, 0, 0, 37, 0, 0, 0, 38, 0, 0, 0, 39, 0, 0, 0, 40, 0, 0, 0, 41, 0, 0, 0, 42, 0, 0, 0, 43, 0, 0, 0, 44, 0, 0, 0, 45, 0, 0, 0, 46, 0, 0, 0, 47, 0, 0, 0, 48, 0, 0, 0, 49, 0, 0, 0, 50, 0, 0, 0, 51, 0, 0, 0, 52, 0, 0, 0, 53, 0, 0, 0, 54, 0, 0, 0, 55, 0, 0, 0, 56, 0, 0, 0, 57, 0, 0, 0, 58, 0, 0, 0, 59, 0, 0, 0, 60, 0, 0, 0, 61, 0, 0, 0, 62, 0, 0, 0, 63, 0, 0, 0, 64, 0, 0, 0, 65, 0, 0, 0, 66, 0, 0, 0, 67, 0, 0, 0, 68, 0, 0, 0, 69, 0, 0, 0, 70, 0, 0, 0, 71, 0, 0, 0, 72, 0, 0, 0, 73, 0, 0, 0, 74, 0, 0, 0, 75, 0, 0, 0, 76, 0, 0, 0, 77, 0, 0, 0, 78, 0, 0, 0, 79, 0, 0, 0, 80, 0, 0, 0, 81, 0, 0, 0, 82, 0, 0, 0, 83, 0, 0, 0, 84, 0, 0, 0, 85, 0, 0, 0, 86, 0, 0, 0, 87, 0, 0, 0, 88, 0, 0, 0, 89, 0, 0, 0, 90, 0, 0, 0, 91, 0, 0, 0, 92, 0, 0, 0, 93, 0, 0, 0, 94, 0, 0, 0, 95, 0, 0, 0, 96, 0, 0, 0, 65, 0, 0, 0, 66, 0, 0, 0, 67, 0, 0, 0, 68, 0, 0, 0, 69, 0, 0, 0, 70, 0, 0, 0, 71, 0, 0, 0, 72, 0, 0, 0, 73, 0, 0, 0, 74, 0, 0, 0, 75, 0, 0, 0, 76, 0, 0, 0, 77, 0, 0, 0, 78, 0, 0, 0, 79, 0, 0, 0, 80, 0, 0, 0, 81, 0, 0, 0, 82, 0, 0, 0, 83, 0, 0, 0, 84, 0, 0, 0, 85, 0, 0, 0, 86, 0, 0, 0, 87, 0, 0, 0, 88, 0, 0, 0, 89, 0, 0, 0, 90, 0, 0, 0, 123, 0, 0, 0, 124, 0, 0, 0, 125, 0, 0, 0, 126, 0, 0, 0, 127], "i8", 4, k.ga);
 E([1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 6, 0, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 9, 0, 0, 0, 10, 0, 0, 0, 11, 0, 0, 0, 12, 0, 0, 0, 13, 0, 0, 0, 14, 0, 0, 0, 15, 0, 0, 0, 16, 0, 0, 0, 17, 0, 0, 0, 18, 0, 0, 0, 19, 0, 0, 0, 20, 0, 0, 0, 21, 0, 0, 0, 22, 0, 0, 0, 23, 0, 0, 0, 24, 0, 0, 0, 25, 0, 0, 0, 26, 0, 0, 0, 27, 0, 0, 0, 28, 0, 0, 0, 29, 0, 0, 0, 30, 0, 0, 0, 31, 0, 0, 0, 32, 0, 0, 0, 33, 0, 0, 0, 34, 0, 0, 0, 35, 0, 0, 0, 36, 0, 0, 0, 37, 0, 0, 0, 38, 0, 0, 0, 39, 0, 0, 0, 40, 0, 0, 0, 41, 0, 0, 0, 42, 0, 0, 0, 43, 0, 0, 0, 44, 0, 0, 0, 45, 0, 0, 0, 46, 0, 0, 0, 47, 0, 0, 0, 48, 0, 0, 0, 49, 0, 0, 0, 50, 0, 0, 0, 51, 0, 0, 0, 52, 0, 0, 0, 53, 0, 0, 0, 54, 0, 0, 0, 55, 0, 0, 0, 56, 0, 0, 0, 57, 0, 0, 0, 58, 0, 0, 0, 59, 0, 0, 0, 60, 0, 0, 0, 61, 0, 0, 0, 62, 0, 0, 0, 63, 0, 0, 0, 64, 0, 0, 0, 97, 0, 0, 0, 98, 0, 0, 0, 99, 0, 0, 0, 100, 0, 0, 0, 101, 0, 0, 0, 102, 0, 0, 0, 103, 0, 0, 0, 104, 0, 0, 0, 105, 0, 0, 0, 106, 0, 0, 0, 107, 0, 0, 0, 108, 0, 0, 0, 109, 0, 0, 0, 110, 0, 0, 0, 111, 0, 0, 0, 112, 0, 0, 0, 113, 0, 0, 0, 114, 0, 0, 0, 115, 0, 0, 0, 116, 0, 0, 0, 117, 0, 0, 0, 118, 0, 0, 0, 119, 0, 0, 0, 120, 0, 0, 0, 121, 0, 0, 0, 122, 0, 0, 0, 91, 0, 0, 0, 92, 0, 0, 0, 93, 0, 0, 0, 94, 0, 0, 0, 95, 0, 0, 0, 96, 0, 0, 0, 97, 0, 0, 0, 98, 0, 0, 0, 99, 0, 0, 0, 100, 0, 0, 0, 101, 0, 0, 0, 102, 0, 0, 0, 103, 0, 0, 0, 104, 0, 0, 0, 105, 0, 0, 0, 106, 0, 0, 0, 107, 0, 0, 0, 108, 0, 0, 0, 109, 0, 0, 0, 110, 0, 0, 0, 111, 0, 0, 0, 112, 0, 0, 0, 113, 0, 0, 0, 114, 0, 0, 0, 115, 0, 0, 0, 116, 0, 0, 0, 117, 0, 0, 0, 118, 0, 0, 0, 119, 0, 0, 0, 120, 0, 0, 0, 121, 0, 0, 0, 122, 0, 0, 0, 123, 0, 0, 0, 124, 0, 0, 0, 125, 0, 0, 0, 126, 0, 0, 0, 127, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 7, 0, 0, 0, 11, 0, 0, 0, 13, 0, 0, 0, 17, 0, 0, 0, 19, 0, 0, 0, 23, 0, 0, 0, 29, 0, 0, 0, 31, 0, 0, 0, 37, 0, 0, 0, 41, 0, 0, 0, 43, 0, 0, 0, 47, 0, 0, 0, 53, 0, 0, 0, 59, 0, 0, 0, 61, 0, 0, 0, 67, 0, 0, 0, 71, 0, 0, 0, 73, 0, 0, 0, 79, 0, 0, 0, 83, 0, 0, 0, 89, 0, 0, 0, 97, 0, 0, 0, 101, 0, 0, 0, 103, 0, 0, 0, 107, 0, 0, 0, 109, 0, 0, 0, 113, 0, 0, 0, 127, 0, 0, 0, 131, 0, 0, 0, 137, 0, 0, 0, 139, 0, 0, 0, 149, 0, 0, 0, 151, 0, 0, 0, 157, 0, 0, 0, 163, 0, 0, 0, 167, 0, 0, 0, 173, 0, 0, 0, 179, 0, 0, 0, 181, 0, 0, 0, 191, 0, 0, 0, 193, 0, 0, 0, 197, 0, 0, 0, 199, 0, 0, 0, 211, 0, 0, 0, 1, 0, 0, 0, 11, 0, 0, 0, 13, 0, 0, 0, 17, 0, 0, 0, 19, 0, 0, 0, 23, 0, 0, 0, 29, 0, 0, 0, 31, 0, 0, 0, 37, 0, 0, 0, 41, 0, 0, 0, 43, 0, 0, 0, 47, 0, 0, 0, 53, 0, 0, 0, 59, 0, 0, 0, 61, 0, 0, 0, 67, 0, 0, 0, 71, 0, 0, 0, 73, 0, 0, 0, 79, 0, 0, 0, 83, 0, 0, 0, 89, 0, 0, 0, 97, 0, 0, 0, 101, 0, 0, 0, 103, 0, 0, 0, 107, 0, 0, 0, 109, 0, 0, 0, 113, 0, 0, 0, 121, 0, 0, 0, 127, 0, 0, 0, 131, 0, 0, 0, 137, 0, 0, 0, 139, 0, 0, 0, 143, 0, 0, 0, 149, 0, 0, 0, 151, 0, 0, 0, 157, 0, 0, 0, 163, 0, 0, 0, 167, 0, 0, 0, 169, 0, 0, 0, 173, 0, 0, 0, 179, 0, 0, 0, 181, 0, 0, 0, 187, 0, 0, 0, 191, 0, 0, 0, 193, 0, 0, 0, 197, 0, 0, 0, 199, 0, 0, 0, 209, 0, 0, 0, 0, 0, 0, 0, 56, 3, 0, 0, 81, 0, 0, 0, 82, 0, 0, 0, 32, 0, 0, 0, 1, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 17, 0, 0, 0, 18, 0, 0, 0, 2, 0, 0, 0, 22, 0, 0, 0, 20, 0, 0, 0, 4, 0, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 48, 3, 0, 0, 83, 0, 0, 0, 84, 0, 0, 0, 0, 0, 0, 0, 32, 4, 0, 0, 85, 0, 0, 0, 86, 0, 0, 0, 87, 0, 0, 0, 1, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 4, 0, 0, 88, 0, 0, 0, 89, 0, 0, 0, 87, 0, 0, 0, 2, 0, 0, 0, 7, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 4, 0, 0, 90, 0, 0, 0, 91, 0, 0, 0, 87, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 6, 0, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 9, 0, 0, 0, 10, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 160, 4, 0, 0, 92, 0, 0, 0, 93, 0, 0, 0, 87, 0, 0, 0, 12, 0, 0, 0, 13, 0, 0, 0, 14, 0, 0, 0, 15, 0, 0, 0, 16, 0, 0, 0, 17, 0, 0, 0, 18, 0, 0, 0, 19, 0, 0, 0, 20, 0, 0, 0, 21, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 192, 4, 0, 0, 94, 0, 0, 0, 95, 0, 0, 0, 87, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 23, 0, 0, 0, 5, 0, 0, 0, 24, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 224, 4, 0, 0, 96, 0, 0, 0, 97, 0, 0, 0, 87, 0, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 25, 0, 0, 0, 9, 0, 0, 0, 26, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 98, 0, 0, 0, 99, 0, 0, 0, 87, 0, 0, 0, 23, 0, 0, 0, 27, 0, 0, 0, 28, 0, 0, 0, 29, 0, 0, 0, 30, 0, 0, 0, 31, 0, 0, 0, 1, 0, 0, 0, 248, 255, 255, 255, 0, 5, 0, 0, 24, 0, 0, 0, 25, 0, 0, 0, 26, 0, 0, 0, 27, 0, 0, 0, 28, 0, 0, 0, 29, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 5, 0, 0, 100, 0, 0, 0, 101, 0, 0, 0, 87, 0, 0, 0, 31, 0, 0, 0, 32, 0, 0, 0, 33, 0, 0, 0, 34, 0, 0, 0, 35, 0, 0, 0, 36, 0, 0, 0, 2, 0, 0, 0, 248, 255, 255, 255, 40, 5, 0, 0, 32, 0, 0, 0, 33, 0, 0, 0, 34, 0, 0, 0, 35, 0, 0, 0, 36, 0, 0, 0, 37, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 5, 0, 0, 102, 0, 0, 0, 103, 0, 0, 0, 87, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 5, 0, 0, 104, 0, 0, 0, 105, 0, 0, 0, 87, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 144, 5, 0, 0, 106, 0, 0, 0, 107, 0, 0, 0, 87, 0, 0, 0, 39, 0, 0, 0, 40, 0, 0, 0, 33, 0, 0, 0, 34, 0, 0, 0, 35, 0, 0, 0, 36, 0, 0, 0, 41, 0, 0, 0, 37, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 176, 5, 0, 0, 108, 0, 0, 0, 109, 0, 0, 0, 87, 0, 0, 0, 42, 0, 0, 0, 43, 0, 0, 0, 39, 0, 0, 0, 40, 0, 0, 0, 41, 0, 0, 0, 42, 0, 0, 0, 44, 0, 0, 0, 43, 0, 0, 0, 44, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 208, 5, 0, 0, 110, 0, 0, 0, 111, 0, 0, 0, 87, 0, 0, 0, 45, 0, 0, 0, 46, 0, 0, 0, 45, 0, 0, 0, 46, 0, 0, 0, 47, 0, 0, 0, 48, 0, 0, 0, 47, 0, 0, 0, 49, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 240, 5, 0, 0, 112, 0, 0, 0, 113, 0, 0, 0, 87, 0, 0, 0, 48, 0, 0, 0, 49, 0, 0, 0, 51, 0, 0, 0, 52, 0, 0, 0, 53, 0, 0, 0, 54, 0, 0, 0, 50, 0, 0, 0, 55, 0, 0, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 6, 0, 0, 114, 0, 0, 0, 115, 0, 0, 0, 87, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 6, 0, 0, 116, 0, 0, 0, 117, 0, 0, 0, 87, 0, 0, 0, 5, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 6, 0, 0, 118, 0, 0, 0, 119, 0, 0, 0, 87, 0, 0, 0, 1, 0, 0, 0, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 6, 0, 0, 120, 0, 0, 0, 121, 0, 0, 0, 87, 0, 0, 0, 2, 0, 0, 0, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 144, 6, 0, 0, 122, 0, 0, 0, 123, 0, 0, 0, 87, 0, 0, 0, 8, 0, 0, 0, 6, 0, 0, 0, 57, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 176, 6, 0, 0, 124, 0, 0, 0, 125, 0, 0, 0, 87, 0, 0, 0, 9, 0, 0, 0, 7, 0, 0, 0, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 4, 0, 0, 126, 0, 0, 0, 127, 0, 0, 0, 87, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 4, 0, 0, 128, 0, 0, 0, 129, 0, 0, 0, 87, 0, 0, 0, 6, 0, 0, 0, 10, 0, 0, 0, 7, 0, 0, 0, 11, 0, 0, 0, 8, 0, 0, 0, 1, 0, 0, 0, 12, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 240, 3, 0, 0, 130, 0, 0, 0, 131, 0, 0, 0, 87, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 12, 0, 0, 0, 51, 0, 0, 0, 52, 0, 0, 0, 13, 0, 0, 0, 53, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 4, 0, 0, 132, 0, 0, 0, 133, 0, 0, 0, 87, 0, 0, 0, 54, 0, 0, 0, 55, 0, 0, 0, 59, 0, 0, 0, 60, 0, 0, 0, 61, 0, 0, 0, 0, 0, 0, 0, 112, 4, 0, 0, 134, 0, 0, 0, 135, 0, 0, 0, 87, 0, 0, 0, 56, 0, 0, 0, 57, 0, 0, 0, 62, 0, 0, 0, 63, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 64, 3, 0, 0, 136, 0, 0, 0, 137, 0, 0, 0, 87, 0, 0, 0, 0, 0, 0, 0, 80, 3, 0, 0, 136, 0, 0, 0, 138, 0, 0, 0, 87, 0, 0, 0, 13, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 9, 0, 0, 0, 14, 0, 0, 0, 10, 0, 0, 0, 15, 0, 0, 0, 11, 0, 0, 0, 5, 0, 0, 0, 16, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 112, 3, 0, 0, 136, 0, 0, 0, 139, 0, 0, 0, 87, 0, 0, 0, 5, 0, 0, 0, 6, 0, 0, 0, 15, 0, 0, 0, 58, 0, 0, 0, 59, 0, 0, 0, 16, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 144, 3, 0, 0, 136, 0, 0, 0, 140, 0, 0, 0, 87, 0, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 17, 0, 0, 0, 61, 0, 0, 0, 62, 0, 0, 0, 18, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 176, 3, 0, 0, 136, 0, 0, 0, 141, 0, 0, 0, 87, 0, 0, 0, 9, 0, 0, 0, 10, 0, 0, 0, 19, 0, 0, 0, 64, 0, 0, 0, 65, 0, 0, 0, 20, 0, 0, 0, 66, 0, 0, 0, 0, 0, 0, 0, 208, 3, 0, 0, 136, 0, 0, 0, 142, 0, 0, 0, 87, 0, 0, 0, 9, 0, 0, 0, 10, 0, 0, 0, 19, 0, 0, 0, 64, 0, 0, 0, 65, 0, 0, 0, 20, 0, 0, 0, 66, 0, 0, 0, 0, 0, 0, 0, 224, 3, 0, 0, 136, 0, 0, 0, 143, 0, 0, 0, 87, 0, 0, 0, 9, 0, 0, 0, 10, 0, 0, 0, 19, 0, 0, 0, 64, 0, 0, 0, 65, 0, 0, 0, 20, 0, 0, 0, 66, 0, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 72, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 77, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 83, 0, 0, 0, 37, 0, 0, 0, 109, 0, 0, 0, 47, 0, 0, 0, 37, 0, 0, 0, 100, 0, 0, 0, 47, 0, 0, 0, 37, 0, 0, 0, 121, 0, 0, 0, 37, 0, 0, 0, 89, 0, 0, 0, 45, 0, 0, 0, 37, 0, 0, 0, 109, 0, 0, 0, 45, 0, 0, 0, 37, 0, 0, 0, 100, 0, 0, 0, 37, 0, 0, 0, 73, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 77, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 83, 0, 0, 0, 32, 0, 0, 0, 37, 0, 0, 0, 112, 0, 0, 0, 37, 0, 0, 0, 72, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 77, 0, 0, 0, 37, 0, 0, 0, 72, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 77, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 116, 0, 0, 0, 114, 0, 0, 0, 117, 0, 0, 0, 101, 0, 0, 0, 0, 0, 0, 0, 102, 0, 0, 0, 97, 0, 0, 0, 108, 0, 0, 0, 115, 0, 0, 0, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 0, 0, 0, 117, 0, 0, 0, 110, 0, 0, 0, 100, 0, 0, 0, 97, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 77, 0, 0, 0, 111, 0, 0, 0, 110, 0, 0, 0, 100, 0, 0, 0, 97, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 84, 0, 0, 0, 117, 0, 0, 0, 101, 0, 0, 0, 115, 0, 0, 0, 100, 0, 0, 0, 97, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 101, 0, 0, 0, 100, 0, 0, 0, 110, 0, 0, 0, 101, 0, 0, 0, 115, 0, 0, 0, 100, 0, 0, 0, 97, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 84, 0, 0, 0, 104, 0, 0, 0, 117, 0, 0, 0, 114, 0, 0, 0, 115, 0, 0, 0, 100, 0, 0, 0, 97, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 70, 0, 0, 0, 114, 0, 0, 0, 105, 0, 0, 0, 100, 0, 0, 0, 97, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 83, 0, 0, 0, 97, 0, 0, 0, 116, 0, 0, 0, 117, 0, 0, 0, 114, 0, 0, 0, 100, 0, 0, 0, 97, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 83, 0, 0, 0, 117, 0, 0, 0, 110, 0, 0, 0, 0, 0, 0, 0, 77, 0, 0, 0, 111, 0, 0, 0, 110, 0, 0, 0, 0, 0, 0, 0, 84, 0, 0, 0, 117, 0, 0, 0, 101, 0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 101, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 84, 0, 0, 0, 104, 0, 0, 0, 117, 0, 0, 0, 0, 0, 0, 0, 70, 0, 0, 0, 114, 0, 0, 0, 105, 0, 0, 0, 0, 0, 0, 0, 83, 0, 0, 0, 97, 0, 0, 0, 116, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 74, 0, 0, 0, 97, 0, 0, 0, 110, 0, 0, 0, 117, 0, 0, 0, 97, 0, 0, 0, 114, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 70, 0, 0, 0, 101, 0, 0, 0, 98, 0, 0, 0, 114, 0, 0, 0, 117, 0, 0, 0, 97, 0, 0, 0, 114, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 77, 0, 0, 0, 97, 0, 0, 0, 114, 0, 0, 0, 99, 0, 0, 0, 104, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 112, 0, 0, 0, 114, 0, 0, 0, 105, 0, 0, 0, 108, 0, 0, 0, 0, 0, 0, 0, 77, 0, 0, 0, 97, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 74, 0, 0, 0, 117, 0, 0, 0, 110, 0, 0, 0, 101, 0, 0, 0, 0, 0, 0, 0, 74, 0, 0, 0, 117, 0, 0, 0, 108, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 117, 0, 0, 0, 103, 0, 0, 0, 117, 0, 0, 0, 115, 0, 0, 0, 116, 0, 0, 0, 0, 0, 0, 0, 83, 0, 0, 0, 101, 0, 0, 0, 112, 0, 0, 0, 116, 0, 0, 0, 101, 0, 0, 0, 109, 0, 0, 0, 98, 0, 0, 0, 101, 0, 0, 0, 114, 0, 0, 0, 0, 0, 0, 0, 79, 0, 0, 0, 99, 0, 0, 0, 116, 0, 0, 0, 111, 0, 0, 0, 98, 0, 0, 0, 101, 0, 0, 0, 114, 0, 0, 0, 0, 0, 0, 0, 78, 0, 0, 0, 111, 0, 0, 0, 118, 0, 0, 0, 101, 0, 0, 0, 109, 0, 0, 0, 98, 0, 0, 0, 101, 0, 0, 0, 114, 0, 0, 0, 0, 0, 0, 0, 68, 0, 0, 0, 101, 0, 0, 0, 99, 0, 0, 0, 101, 0, 0, 0, 109, 0, 0, 0, 98, 0, 0, 0, 101, 0, 0, 0, 114, 0, 0, 0, 0, 0, 0, 0, 74, 0, 0, 0, 97, 0, 0, 0, 110, 0, 0, 0, 0, 0, 0, 0, 70, 0, 0, 0, 101, 0, 0, 0, 98, 0, 0, 0, 0, 0, 0, 0, 77, 0, 0, 0, 97, 0, 0, 0, 114, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 112, 0, 0, 0, 114, 0, 0, 0, 0, 0, 0, 0, 74, 0, 0, 0, 117, 0, 0, 0, 110, 0, 0, 0, 0, 0, 0, 0, 74, 0, 0, 0, 117, 0, 0, 0, 108, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 117, 0, 0, 0, 103, 0, 0, 0, 0, 0, 0, 0, 83, 0, 0, 0, 101, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 79, 0, 0, 0, 99, 0, 0, 0, 116, 0, 0, 0, 0, 0, 0, 0, 78, 0, 0, 0, 111, 0, 0, 0, 118, 0, 0, 0, 0, 0, 0, 0, 68, 0, 0, 0, 101, 0, 0, 0, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 77, 0, 0, 0, 0, 0, 0, 0, 80, 0, 0, 0, 77, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 109, 0, 0, 0, 47, 0, 0, 0, 37, 0, 0, 0, 100, 0, 0, 0, 47, 0, 0, 0, 37, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 72, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 77, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 97, 0, 0, 0, 32, 0, 0, 0, 37, 0, 0, 0, 98, 0, 0, 0, 32, 0, 0, 0, 37, 0, 0, 0, 100, 0, 0, 0, 32, 0, 0, 0, 37, 0, 0, 0, 72, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 77, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 83, 0, 0, 0, 32, 0, 0, 0, 37, 0, 0, 0, 89, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 73, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 77, 0, 0, 0, 58, 0, 0, 0, 37, 0, 0, 0, 83, 0, 0, 0, 32, 0, 0, 0, 37, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 3, 32, 2, 32, 2, 32, 2, 32, 2, 32, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 96, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 8, 216, 8, 216, 8, 216, 8, 216, 8, 216, 8, 216, 8, 216, 8, 216, 8, 216, 8, 216, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 8, 213, 8, 213, 8, 213, 8, 213, 8, 213, 8, 213, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 8, 197, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 4, 192, 8, 214, 8, 214, 8, 214, 8, 214, 8, 214, 8, 214, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 8, 198, 4, 192, 4, 192, 4, 192, 4, 192, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 115, 116, 97, 116, 115, 71, 114, 97, 112, 104, 0, 123, 32, 114, 101, 116, 117, 114, 110, 32, 36, 48, 32, 37, 32, 36, 49, 59, 32, 125, 0, 37, 100, 0, 0, 0, 1, 0, 0, 1, 101, 56, 98, 48, 53, 98, 52, 50, 102, 48, 57, 49, 56, 101, 56, 98, 54, 53, 101, 51, 98, 55, 97, 55, 53, 99, 52, 102, 53, 100, 54, 55, 0, 58, 0, 123, 32, 105, 102, 40, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 32, 38, 38, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 111, 110, 68, 105, 115, 99, 111, 110, 110, 101, 99, 116, 39, 93, 41, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 111, 110, 68, 105, 115, 99, 111, 110, 110, 101, 99, 116, 39, 93, 40, 41, 59, 32, 125, 0, 123, 32, 105, 102, 40, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 32, 38, 38, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 100, 111, 76, 111, 103, 105, 110, 39, 93, 41, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 100, 111, 76, 111, 103, 105, 110, 39, 93, 40, 41, 59, 32, 125, 0, 123, 32, 105, 102, 40, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 32, 38, 38, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 99, 111, 114, 101, 80, 101, 110, 100, 105, 110, 103, 82, 101, 108, 111, 97, 100, 39, 93, 41, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 99, 111, 114, 101, 80, 101, 110, 100, 105, 110, 103, 82, 101, 108, 111, 97, 100, 39, 93, 40, 41, 59, 32, 125, 0, 123, 32, 105, 102, 40, 119, 105, 110, 100, 111, 119, 91, 39, 108, 111, 103, 111, 117, 116, 39, 93, 41, 32, 119, 105, 110, 100, 111, 119, 91, 39, 108, 111, 103, 111, 117, 116, 39, 93, 40, 41, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 98, 117, 102, 102, 101, 114, 32, 61, 32, 72, 69, 65, 80, 85, 56, 46, 115, 117, 98, 97, 114, 114, 97, 121, 40, 36, 48, 44, 32, 36, 48, 32, 43, 32, 36, 49, 41, 59, 32, 105, 102, 40, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 32, 38, 38, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 111, 110, 77, 111, 98, 105, 108, 101, 68, 97, 116, 97, 39, 93, 41, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 111, 110, 77, 111, 98, 105, 108, 101, 68, 97, 116, 97, 39, 93, 40, 98, 117, 102, 102, 101, 114, 41, 59, 32, 125, 0, 123, 32, 105, 102, 40, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 32, 38, 38, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 117, 112, 100, 97, 116, 101, 83, 101, 114, 118, 101, 114, 86, 101, 114, 115, 105, 111, 110, 39, 93, 41, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 117, 112, 100, 97, 116, 101, 83, 101, 114, 118, 101, 114, 86, 101, 114, 115, 105, 111, 110, 39, 93, 40, 85, 84, 70, 56, 84, 111, 83, 116, 114, 105, 110, 103, 40, 36, 48, 41, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 32, 61, 32, 110, 117, 108, 108, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 99, 116, 120, 32, 61, 32, 100, 111, 99, 117, 109, 101, 110, 116, 46, 99, 114, 101, 97, 116, 101, 69, 108, 101, 109, 101, 110, 116, 40, 39, 99, 97, 110, 118, 97, 115, 39, 41, 46, 103, 101, 116, 67, 111, 110, 116, 101, 120, 116, 40, 39, 50, 100, 39, 41, 59, 32, 102, 111, 114, 40, 118, 97, 114, 32, 105, 32, 61, 32, 48, 59, 32, 105, 32, 60, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 46, 108, 101, 110, 103, 116, 104, 59, 32, 43, 43, 105, 41, 123, 32, 105, 102, 40, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 105, 93, 32, 33, 61, 32, 110, 117, 108, 108, 41, 32, 99, 111, 110, 116, 105, 110, 117, 101, 59, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 105, 93, 32, 61, 32, 99, 116, 120, 59, 32, 114, 101, 116, 117, 114, 110, 32, 105, 59, 32, 125, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 46, 112, 117, 115, 104, 40, 99, 116, 120, 41, 59, 32, 114, 101, 116, 117, 114, 110, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 46, 108, 101, 110, 103, 116, 104, 32, 45, 32, 49, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 99, 97, 110, 118, 97, 115, 32, 61, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 99, 97, 110, 118, 97, 115, 59, 32, 99, 97, 110, 118, 97, 115, 46, 119, 105, 100, 116, 104, 32, 61, 32, 36, 49, 59, 32, 99, 97, 110, 118, 97, 115, 46, 104, 101, 105, 103, 104, 116, 32, 61, 32, 36, 50, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 99, 97, 110, 118, 97, 115, 32, 61, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 99, 97, 110, 118, 97, 115, 59, 32, 72, 69, 65, 80, 51, 50, 91, 36, 49, 32, 62, 62, 32, 50, 93, 32, 61, 32, 99, 97, 110, 118, 97, 115, 46, 119, 105, 100, 116, 104, 59, 32, 72, 69, 65, 80, 51, 50, 91, 36, 50, 32, 62, 62, 32, 50, 93, 32, 61, 32, 99, 97, 110, 118, 97, 115, 46, 104, 101, 105, 103, 104, 116, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 115, 97, 118, 101, 40, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 114, 101, 115, 116, 111, 114, 101, 40, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 102, 105, 108, 108, 40, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 115, 116, 114, 111, 107, 101, 40, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 99, 108, 105, 112, 40, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 98, 101, 103, 105, 110, 80, 97, 116, 104, 40, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 99, 108, 111, 115, 101, 80, 97, 116, 104, 40, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 99, 108, 101, 97, 114, 82, 101, 99, 116, 40, 36, 49, 44, 32, 36, 50, 44, 32, 36, 51, 44, 32, 36, 52, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 102, 105, 108, 108, 82, 101, 99, 116, 40, 36, 49, 44, 32, 36, 50, 44, 32, 36, 51, 44, 32, 36, 52, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 102, 105, 108, 108, 83, 116, 121, 108, 101, 32, 61, 32, 39, 114, 103, 98, 40, 39, 32, 43, 32, 36, 49, 32, 43, 32, 39, 44, 39, 32, 43, 32, 36, 50, 32, 43, 32, 39, 44, 39, 32, 43, 32, 36, 51, 32, 43, 32, 39, 41, 39, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 115, 116, 114, 111, 107, 101, 83, 116, 121, 108, 101, 32, 61, 32, 39, 114, 103, 98, 40, 39, 32, 43, 32, 36, 49, 32, 43, 32, 39, 44, 39, 32, 43, 32, 36, 50, 32, 43, 32, 39, 44, 39, 32, 43, 32, 36, 51, 32, 43, 32, 39, 41, 39, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 103, 108, 111, 98, 97, 108, 65, 108, 112, 104, 97, 32, 61, 32, 36, 49, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 109, 111, 118, 101, 84, 111, 40, 36, 49, 44, 32, 36, 50, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 108, 105, 110, 101, 84, 111, 40, 36, 49, 44, 32, 36, 50, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 97, 114, 99, 40, 36, 49, 44, 32, 36, 50, 44, 32, 36, 51, 44, 32, 36, 52, 44, 32, 36, 53, 44, 32, 36, 54, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 115, 99, 97, 108, 101, 40, 36, 49, 44, 32, 36, 50, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 116, 114, 97, 110, 115, 108, 97, 116, 101, 40, 36, 49, 44, 32, 36, 50, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 108, 105, 110, 101, 87, 105, 100, 116, 104, 32, 61, 32, 36, 49, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 100, 114, 97, 119, 73, 109, 97, 103, 101, 40, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 49, 93, 46, 99, 97, 110, 118, 97, 115, 44, 32, 36, 50, 44, 32, 36, 51, 41, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 99, 97, 110, 118, 97, 115, 32, 61, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 49, 93, 46, 99, 97, 110, 118, 97, 115, 59, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 100, 114, 97, 119, 73, 109, 97, 103, 101, 40, 99, 97, 110, 118, 97, 115, 44, 32, 48, 44, 32, 48, 44, 32, 99, 97, 110, 118, 97, 115, 46, 119, 105, 100, 116, 104, 44, 32, 99, 97, 110, 118, 97, 115, 46, 104, 101, 105, 103, 104, 116, 44, 32, 36, 50, 44, 32, 36, 51, 44, 32, 36, 52, 44, 32, 36, 53, 41, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 105, 109, 103, 32, 61, 32, 99, 112, 53, 46, 105, 109, 97, 103, 101, 115, 91, 36, 49, 93, 59, 32, 105, 102, 40, 33, 105, 109, 103, 46, 99, 111, 109, 112, 108, 101, 116, 101, 41, 32, 114, 101, 116, 117, 114, 110, 59, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 100, 114, 97, 119, 73, 109, 97, 103, 101, 40, 105, 109, 103, 44, 32, 48, 44, 32, 48, 44, 32, 105, 109, 103, 46, 119, 105, 100, 116, 104, 44, 32, 105, 109, 103, 46, 104, 101, 105, 103, 104, 116, 44, 32, 36, 50, 44, 32, 36, 51, 44, 32, 36, 52, 44, 32, 36, 53, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 102, 105, 108, 108, 84, 101, 120, 116, 40, 85, 84, 70, 56, 84, 111, 83, 116, 114, 105, 110, 103, 40, 36, 49, 41, 44, 32, 36, 50, 44, 32, 36, 51, 41, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 115, 116, 114, 111, 107, 101, 84, 101, 120, 116, 40, 85, 84, 70, 56, 84, 111, 83, 116, 114, 105, 110, 103, 40, 36, 49, 41, 44, 32, 36, 50, 44, 32, 36, 51, 41, 59, 32, 125, 0, 123, 32, 114, 101, 116, 117, 114, 110, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 109, 101, 97, 115, 117, 114, 101, 84, 101, 120, 116, 40, 85, 84, 70, 56, 84, 111, 83, 116, 114, 105, 110, 103, 40, 36, 49, 41, 41, 46, 119, 105, 100, 116, 104, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 102, 111, 110, 116, 32, 61, 32, 126, 126, 40, 36, 49, 41, 32, 43, 32, 34, 112, 120, 32, 85, 98, 117, 110, 116, 117, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 108, 105, 110, 101, 67, 97, 112, 32, 61, 32, 34, 98, 117, 116, 116, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 108, 105, 110, 101, 67, 97, 112, 32, 61, 32, 34, 114, 111, 117, 110, 100, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 108, 105, 110, 101, 67, 97, 112, 32, 61, 32, 34, 115, 113, 117, 97, 114, 101, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 108, 105, 110, 101, 74, 111, 105, 110, 32, 61, 32, 34, 114, 111, 117, 110, 100, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 108, 105, 110, 101, 74, 111, 105, 110, 32, 61, 32, 34, 98, 101, 118, 101, 108, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 108, 105, 110, 101, 74, 111, 105, 110, 32, 61, 32, 34, 109, 105, 116, 101, 114, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 116, 101, 120, 116, 66, 97, 115, 101, 108, 105, 110, 101, 32, 61, 32, 34, 116, 111, 112, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 116, 101, 120, 116, 66, 97, 115, 101, 108, 105, 110, 101, 32, 61, 32, 34, 104, 97, 110, 103, 105, 110, 103, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 116, 101, 120, 116, 66, 97, 115, 101, 108, 105, 110, 101, 32, 61, 32, 34, 109, 105, 100, 100, 108, 101, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 116, 101, 120, 116, 66, 97, 115, 101, 108, 105, 110, 101, 32, 61, 32, 34, 97, 108, 112], "i8", 4, k.ga + 6244);
 E([104, 97, 98, 101, 116, 105, 99, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 116, 101, 120, 116, 66, 97, 115, 101, 108, 105, 110, 101, 32, 61, 32, 34, 105, 100, 101, 111, 103, 114, 97, 112, 104, 105, 99, 34, 59, 32, 125, 0, 123, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 36, 48, 93, 46, 116, 101, 120, 116, 66, 97, 115, 101, 108, 105, 110, 101, 32, 61, 32, 34, 98, 111, 116, 116, 111, 109, 34, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 101, 108, 101, 109, 32, 61, 32, 100, 111, 99, 117, 109, 101, 110, 116, 46, 103, 101, 116, 69, 108, 101, 109, 101, 110, 116, 66, 121, 73, 100, 40, 85, 84, 70, 56, 84, 111, 83, 116, 114, 105, 110, 103, 40, 36, 48, 41, 41, 59, 32, 105, 102, 40, 101, 108, 101, 109, 32, 61, 61, 32, 110, 117, 108, 108, 41, 32, 114, 101, 116, 117, 114, 110, 32, 45, 49, 59, 32, 118, 97, 114, 32, 99, 116, 120, 32, 61, 32, 101, 108, 101, 109, 46, 103, 101, 116, 67, 111, 110, 116, 101, 120, 116, 40, 39, 50, 100, 39, 41, 59, 32, 102, 111, 114, 40, 118, 97, 114, 32, 105, 32, 61, 32, 48, 59, 32, 105, 32, 60, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 46, 108, 101, 110, 103, 116, 104, 59, 32, 43, 43, 105, 41, 123, 32, 105, 102, 40, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 105, 93, 32, 33, 61, 32, 110, 117, 108, 108, 41, 32, 99, 111, 110, 116, 105, 110, 117, 101, 59, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 91, 105, 93, 32, 61, 32, 99, 116, 120, 59, 32, 114, 101, 116, 117, 114, 110, 32, 105, 59, 32, 125, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 46, 112, 117, 115, 104, 40, 99, 116, 120, 41, 59, 32, 114, 101, 116, 117, 114, 110, 32, 99, 112, 53, 46, 99, 111, 110, 116, 101, 120, 116, 115, 46, 108, 101, 110, 103, 116, 104, 32, 45, 32, 49, 59, 32, 125, 0, 123, 32, 105, 102, 40, 33, 104, 97, 118, 101, 70, 111, 110, 116, 115, 76, 111, 97, 100, 101, 100, 41, 32, 104, 97, 118, 101, 70, 111, 110, 116, 115, 76, 111, 97, 100, 101, 100, 32, 61, 32, 70, 111, 110, 116, 68, 101, 116, 101, 99, 116, 46, 105, 115, 70, 111, 110, 116, 76, 111, 97, 100, 101, 100, 40, 34, 85, 98, 117, 110, 116, 117, 34, 41, 59, 32, 114, 101, 116, 117, 114, 110, 32, 104, 97, 118, 101, 70, 111, 110, 116, 115, 76, 111, 97, 100, 101, 100, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 105, 109, 103, 32, 61, 32, 110, 101, 119, 32, 73, 109, 97, 103, 101, 40, 41, 59, 32, 105, 109, 103, 46, 115, 114, 99, 32, 61, 32, 85, 84, 70, 56, 84, 111, 83, 116, 114, 105, 110, 103, 40, 36, 48, 41, 59, 32, 102, 111, 114, 40, 118, 97, 114, 32, 105, 32, 61, 32, 48, 59, 32, 105, 32, 60, 32, 99, 112, 53, 46, 105, 109, 97, 103, 101, 115, 46, 108, 101, 110, 103, 116, 104, 59, 32, 43, 43, 105, 41, 123, 32, 105, 102, 40, 99, 112, 53, 46, 105, 109, 97, 103, 101, 115, 91, 105, 93, 32, 33, 61, 32, 110, 117, 108, 108, 41, 32, 99, 111, 110, 116, 105, 110, 117, 101, 59, 32, 99, 112, 53, 46, 105, 109, 97, 103, 101, 115, 91, 105, 93, 32, 61, 32, 105, 109, 103, 59, 32, 114, 101, 116, 117, 114, 110, 32, 105, 59, 32, 125, 32, 99, 112, 53, 46, 105, 109, 97, 103, 101, 115, 46, 112, 117, 115, 104, 40, 105, 109, 103, 41, 59, 32, 114, 101, 116, 117, 114, 110, 32, 99, 112, 53, 46, 105, 109, 97, 103, 101, 115, 46, 108, 101, 110, 103, 116, 104, 32, 45, 32, 49, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 105, 32, 61, 32, 99, 112, 53, 46, 105, 109, 97, 103, 101, 115, 91, 36, 48, 93, 59, 32, 72, 69, 65, 80, 85, 56, 91, 36, 49, 32, 62, 62, 32, 48, 93, 32, 61, 32, 40, 105, 46, 99, 111, 109, 112, 108, 101, 116, 101, 32, 38, 38, 32, 105, 46, 119, 105, 100, 116, 104, 32, 62, 32, 48, 41, 124, 48, 59, 32, 72, 69, 65, 80, 51, 50, 91, 36, 50, 32, 62, 62, 32, 50, 93, 32, 61, 32, 105, 46, 119, 105, 100, 116, 104, 59, 32, 72, 69, 65, 80, 51, 50, 91, 36, 51, 32, 62, 62, 32, 50, 93, 32, 61, 32, 105, 46, 104, 101, 105, 103, 104, 116, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 119, 115, 32, 61, 32, 110, 101, 119, 32, 87, 101, 98, 83, 111, 99, 107, 101, 116, 40, 85, 84, 70, 56, 84, 111, 83, 116, 114, 105, 110, 103, 40, 36, 48, 41, 41, 59, 32, 119, 115, 46, 98, 105, 110, 97, 114, 121, 84, 121, 112, 101, 32, 61, 32, 34, 97, 114, 114, 97, 121, 98, 117, 102, 102, 101, 114, 34, 59, 32, 119, 115, 46, 101, 118, 101, 110, 116, 115, 32, 61, 32, 91, 93, 59, 32, 119, 115, 46, 111, 110, 111, 112, 101, 110, 32, 61, 32, 102, 117, 110, 99, 116, 105, 111, 110, 40, 41, 123, 32, 119, 115, 46, 101, 118, 101, 110, 116, 115, 46, 112, 117, 115, 104, 40, 91, 50, 44, 32, 48, 44, 32, 48, 93, 41, 59, 32, 95, 99, 112, 53, 95, 99, 104, 101, 99, 107, 95, 119, 115, 40, 41, 59, 32, 125, 59, 32, 119, 115, 46, 111, 110, 101, 114, 114, 111, 114, 32, 61, 32, 102, 117, 110, 99, 116, 105, 111, 110, 40, 41, 123, 32, 119, 115, 46, 101, 118, 101, 110, 116, 115, 46, 112, 117, 115, 104, 40, 91, 51, 44, 32, 48, 44, 32, 48, 93, 41, 59, 32, 95, 99, 112, 53, 95, 99, 104, 101, 99, 107, 95, 119, 115, 40, 41, 59, 32, 125, 59, 32, 119, 115, 46, 111, 110, 99, 108, 111, 115, 101, 32, 61, 32, 102, 117, 110, 99, 116, 105, 111, 110, 40, 41, 123, 32, 119, 115, 46, 101, 118, 101, 110, 116, 115, 46, 112, 117, 115, 104, 40, 91, 52, 44, 32, 48, 44, 32, 48, 93, 41, 59, 32, 95, 99, 112, 53, 95, 99, 104, 101, 99, 107, 95, 119, 115, 40, 41, 59, 32, 125, 59, 32, 119, 115, 46, 111, 110, 109, 101, 115, 115, 97, 103, 101, 32, 61, 32, 102, 117, 110, 99, 116, 105, 111, 110, 40, 101, 41, 123, 32, 118, 97, 114, 32, 118, 105, 101, 119, 32, 61, 32, 110, 101, 119, 32, 85, 105, 110, 116, 56, 65, 114, 114, 97, 121, 40, 101, 46, 100, 97, 116, 97, 41, 59, 32, 118, 97, 114, 32, 112, 116, 114, 32, 61, 32, 95, 109, 97, 108, 108, 111, 99, 40, 118, 105, 101, 119, 46, 108, 101, 110, 103, 116, 104, 41, 59, 32, 119, 114, 105, 116, 101, 65, 114, 114, 97, 121, 84, 111, 77, 101, 109, 111, 114, 121, 40, 118, 105, 101, 119, 44, 32, 112, 116, 114, 41, 59, 32, 119, 115, 46, 101, 118, 101, 110, 116, 115, 46, 112, 117, 115, 104, 40, 91, 49, 44, 32, 112, 116, 114, 44, 32, 118, 105, 101, 119, 46, 108, 101, 110, 103, 116, 104, 93, 41, 59, 32, 95, 99, 112, 53, 95, 99, 104, 101, 99, 107, 95, 119, 115, 40, 41, 59, 32, 125, 59, 32, 102, 111, 114, 40, 118, 97, 114, 32, 105, 32, 61, 32, 48, 59, 32, 105, 32, 60, 32, 99, 112, 53, 46, 115, 111, 99, 107, 101, 116, 115, 46, 108, 101, 110, 103, 116, 104, 59, 32, 43, 43, 105, 41, 123, 32, 105, 102, 40, 99, 112, 53, 46, 115, 111, 99, 107, 101, 116, 115, 91, 105, 93, 32, 33, 61, 32, 110, 117, 108, 108, 41, 32, 99, 111, 110, 116, 105, 110, 117, 101, 59, 32, 99, 112, 53, 46, 115, 111, 99, 107, 101, 116, 115, 91, 105, 93, 32, 61, 32, 119, 115, 59, 32, 114, 101, 116, 117, 114, 110, 32, 105, 59, 32, 125, 32, 99, 112, 53, 46, 115, 111, 99, 107, 101, 116, 115, 46, 112, 117, 115, 104, 40, 119, 115, 41, 59, 32, 114, 101, 116, 117, 114, 110, 32, 99, 112, 53, 46, 115, 111, 99, 107, 101, 116, 115, 46, 108, 101, 110, 103, 116, 104, 32, 45, 32, 49, 59, 32, 125, 0, 123, 32, 99, 112, 53, 95, 100, 101, 115, 116, 114, 111, 121, 95, 119, 115, 40, 36, 48, 41, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 119, 32, 61, 32, 99, 112, 53, 46, 115, 111, 99, 107, 101, 116, 115, 91, 36, 48, 93, 59, 32, 105, 102, 40, 119, 46, 114, 101, 97, 100, 121, 83, 116, 97, 116, 101, 32, 33, 61, 32, 49, 41, 32, 114, 101, 116, 117, 114, 110, 32, 48, 59, 32, 119, 46, 115, 101, 110, 100, 40, 72, 69, 65, 80, 56, 46, 115, 117, 98, 97, 114, 114, 97, 121, 40, 36, 49, 44, 32, 36, 49, 32, 43, 32, 36, 50, 41, 41, 59, 32, 114, 101, 116, 117, 114, 110, 32, 49, 59, 32, 125, 0, 123, 32, 118, 97, 114, 32, 119, 32, 61, 32, 99, 112, 53, 46, 115, 111, 99, 107, 101, 116, 115, 91, 36, 48, 93, 59, 32, 105, 102, 40, 119, 46, 101, 118, 101, 110, 116, 115, 46, 108, 101, 110, 103, 116, 104, 32, 61, 61, 32, 48, 41, 32, 114, 101, 116, 117, 114, 110, 32, 48, 59, 32, 118, 97, 114, 32, 101, 32, 61, 32, 119, 46, 101, 118, 101, 110, 116, 115, 46, 115, 104, 105, 102, 116, 40, 41, 59, 32, 72, 69, 65, 80, 85, 51, 50, 91, 36, 49, 32, 62, 62, 32, 50, 93, 32, 61, 32, 101, 91, 49, 93, 59, 32, 72, 69, 65, 80, 51, 50, 91, 36, 50, 32, 62, 62, 32, 50, 93, 32, 61, 32, 101, 91, 50, 93, 59, 32, 114, 101, 116, 117, 114, 110, 32, 101, 91, 48, 93, 59, 32, 125, 0, 123, 32, 114, 101, 116, 117, 114, 110, 32, 105, 100, 108, 101, 68, 101, 97, 100, 108, 105, 110, 101, 91, 39, 116, 105, 109, 101, 82, 101, 109, 97, 105, 110, 105, 110, 103, 39, 93, 40, 41, 32, 62, 61, 32, 50, 59, 32, 125, 0, 123, 32, 114, 101, 116, 117, 114, 110, 32, 77, 97, 116, 104, 46, 114, 97, 110, 100, 111, 109, 40, 41, 59, 32, 125, 0, 123, 32, 105, 102, 40, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 32, 38, 38, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 111, 110, 80, 108, 97, 121, 101, 114, 83, 112, 97, 119, 110, 39, 93, 41, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 111, 110, 80, 108, 97, 121, 101, 114, 83, 112, 97, 119, 110, 39, 93, 40, 41, 59, 32, 125, 0, 123, 32, 105, 102, 40, 33, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 32, 124, 124, 32, 33, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 111, 110, 80, 108, 97, 121, 101, 114, 68, 101, 97, 116, 104, 39, 93, 41, 32, 114, 101, 116, 117, 114, 110, 59, 32, 119, 105, 110, 100, 111, 119, 91, 39, 77, 67, 39, 93, 91, 39, 111, 110, 80, 108, 97, 121, 101, 114, 68, 101, 97, 116, 104, 39, 93, 40, 36, 48, 44, 32, 36, 49, 44, 32, 36, 50, 44, 32, 36, 51, 44, 32, 36, 52, 44, 32, 36, 53, 41, 59, 32, 125, 0, 83, 99, 111, 114, 101, 58, 32, 37, 100, 0, 89, 111, 117, 114, 32, 99, 111, 109, 112, 117, 116, 101, 114, 32, 105, 115, 32, 114, 117, 110, 110, 105, 110, 103, 32, 115, 108, 111, 119, 0, 112, 108, 101, 97, 115, 101, 32, 99, 108, 111, 115, 101, 32, 111, 116, 104, 101, 114, 32, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 115, 32, 111, 114, 32, 116, 97, 98, 115, 32, 105, 110, 32, 121, 111, 117, 114, 32, 98, 114, 111, 119, 115, 101, 114, 32, 116, 111, 32, 105, 109, 112, 114, 111, 118, 101, 32, 103, 97, 109, 101, 32, 112, 101, 114, 102, 111, 114, 109, 97, 110, 99, 101, 46, 0, 1, 1, 0, 67, 111, 110, 110, 101, 99, 116, 105, 110, 103, 0, 73, 102, 32, 121, 111, 117, 32, 99, 97, 110, 110, 111, 116, 32, 99, 111, 110, 110, 101, 99, 116, 32, 116, 111, 32, 116, 104, 101, 32, 115, 101, 114, 118, 101, 114, 115, 44, 32, 99, 104, 101, 99, 107, 32, 105, 102, 32, 121, 111, 117, 32, 104, 97, 118, 101, 0, 115, 111, 109, 101, 32, 97, 110, 116, 105, 32, 118, 105, 114, 117, 115, 32, 111, 114, 32, 102, 105, 114, 101, 119, 97, 108, 108, 32, 98, 108, 111, 99, 107, 105, 110, 103, 32, 116, 104, 101, 32, 99, 111, 110, 110, 101, 99, 116, 105, 111, 110, 46, 0, 76, 101, 97, 100, 101, 114, 98, 111, 97, 114, 100, 0, 46, 32, 0, 65, 110, 32, 117, 110, 110, 97, 109, 101, 100, 32, 99, 101, 108, 108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 105, 109, 103, 47, 98, 97, 99, 107, 103, 114, 111, 117, 110, 100, 46, 112, 110, 103, 0, 99, 97, 110, 118, 97, 115, 0, 83, 116, 57, 98, 97, 100, 95, 97, 108, 108, 111, 99, 0, 83, 116, 57, 101, 120, 99, 101, 112, 116, 105, 111, 110, 0, 83, 116, 57, 116, 121, 112, 101, 95, 105, 110, 102, 111, 0, 78, 49, 48, 95, 95, 99, 120, 120, 97, 98, 105, 118, 49, 49, 54, 95, 95, 115, 104, 105, 109, 95, 116, 121, 112, 101, 95, 105, 110, 102, 111, 69, 0, 78, 49, 48, 95, 95, 99, 120, 120, 97, 98, 105, 118, 49, 49, 55, 95, 95, 99, 108, 97, 115, 115, 95, 116, 121, 112, 101, 95, 105, 110, 102, 111, 69, 0, 78, 49, 48, 95, 95, 99, 120, 120, 97, 98, 105, 118, 49, 50, 48, 95, 95, 115, 105, 95, 99, 108, 97, 115, 115, 95, 116, 121, 112, 101, 95, 105, 110, 102, 111, 69, 0, 78, 49, 48, 95, 95, 99, 120, 120, 97, 98, 105, 118, 49, 50, 49, 95, 95, 118, 109, 105, 95, 99, 108, 97, 115, 115, 95, 116, 121, 112, 101, 95, 105, 110, 102, 111, 69, 0, 33, 34, 98, 97, 115, 105, 99, 95, 115, 116, 114, 105, 110, 103, 32, 108, 101, 110, 103, 116, 104, 95, 101, 114, 114, 111, 114, 34, 0, 47, 85, 115, 101, 114, 115, 47, 98, 111, 98, 47, 115, 114, 99, 47, 101, 109, 115, 100, 107, 95, 112, 111, 114, 116, 97, 98, 108, 101, 47, 101, 109, 115, 99, 114, 105, 112, 116, 101, 110, 47, 49, 46, 51, 53, 46, 48, 47, 115, 121, 115, 116, 101, 109, 47, 105, 110, 99, 108, 117, 100, 101, 47, 108, 105, 98, 99, 120, 120, 47, 115, 116, 114, 105, 110, 103, 0, 95, 95, 116, 104, 114, 111, 119, 95, 108, 101, 110, 103, 116, 104, 95, 101, 114, 114, 111, 114, 0, 33, 34, 118, 101, 99, 116, 111, 114, 32, 108, 101, 110, 103, 116, 104, 95, 101, 114, 114, 111, 114, 34, 0, 47, 85, 115, 101, 114, 115, 47, 98, 111, 98, 47, 115, 114, 99, 47, 101, 109, 115, 100, 107, 95, 112, 111, 114, 116, 97, 98, 108, 101, 47, 101, 109, 115, 99, 114, 105, 112, 116, 101, 110, 47, 49, 46, 51, 53, 46, 48, 47, 115, 121, 115, 116, 101, 109, 47, 105, 110, 99, 108, 117, 100, 101, 47, 108, 105, 98, 99, 120, 120, 47, 118, 101, 99, 116, 111, 114, 0, 115, 116, 100, 58, 58, 98, 97, 100, 95, 97, 108, 108, 111, 99, 0, 84, 33, 34, 25, 13, 1, 2, 3, 17, 75, 28, 12, 16, 4, 11, 29, 18, 30, 39, 104, 110, 111, 112, 113, 98, 32, 5, 6, 15, 19, 20, 21, 26, 8, 22, 7, 40, 36, 23, 24, 9, 10, 14, 27, 31, 37, 35, 131, 130, 125, 38, 42, 43, 60, 61, 62, 63, 67, 71, 74, 77, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102, 103, 105, 106, 107, 108, 114, 115, 116, 121, 122, 123, 124, 0, 73, 108, 108, 101, 103, 97, 108, 32, 98, 121, 116, 101, 32, 115, 101, 113, 117, 101, 110, 99, 101, 0, 68, 111, 109, 97, 105, 110, 32, 101, 114, 114, 111, 114, 0, 82, 101, 115, 117, 108, 116, 32, 110, 111, 116, 32, 114, 101, 112, 114, 101, 115, 101, 110, 116, 97, 98, 108, 101, 0, 78, 111, 116, 32, 97, 32, 116, 116, 121, 0, 80, 101, 114, 109, 105, 115, 115, 105, 111, 110, 32, 100, 101, 110, 105, 101, 100, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 110, 111, 116, 32, 112, 101, 114, 109, 105, 116, 116, 101, 100, 0, 78, 111, 32, 115, 117, 99, 104, 32, 102, 105, 108, 101, 32, 111, 114, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121, 0, 78, 111, 32, 115, 117, 99, 104, 32, 112, 114, 111, 99, 101, 115, 115, 0, 70, 105, 108, 101, 32, 101, 120, 105, 115, 116, 115, 0, 86, 97, 108, 117, 101, 32, 116, 111, 111, 32, 108, 97, 114, 103, 101, 32, 102, 111, 114, 32, 100, 97, 116, 97, 32, 116, 121, 112, 101, 0, 78, 111, 32, 115, 112, 97, 99, 101, 32, 108, 101, 102, 116, 32, 111, 110, 32, 100, 101, 118, 105, 99, 101, 0, 79, 117, 116, 32, 111, 102, 32, 109, 101, 109, 111, 114, 121, 0, 82, 101, 115, 111, 117, 114, 99, 101, 32, 98, 117, 115, 121, 0, 73, 110, 116, 101, 114, 114, 117, 112, 116, 101, 100, 32, 115, 121, 115, 116, 101, 109, 32, 99, 97, 108, 108, 0, 82, 101, 115, 111, 117, 114, 99, 101, 32, 116, 101, 109, 112, 111, 114, 97, 114, 105, 108, 121, 32, 117, 110, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 73, 110, 118, 97, 108, 105, 100, 32, 115, 101, 101, 107, 0, 67, 114, 111, 115, 115, 45, 100, 101, 118, 105, 99, 101, 32, 108, 105, 110, 107, 0, 82, 101, 97, 100, 45, 111, 110, 108, 121, 32, 102, 105, 108, 101, 32, 115, 121, 115, 116, 101, 109, 0, 68, 105, 114, 101, 99, 116, 111, 114, 121, 32, 110, 111, 116, 32, 101, 109, 112, 116, 121, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 114, 101, 115, 101, 116, 32, 98, 121, 32, 112, 101, 101, 114, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 116, 105, 109, 101, 100, 32, 111, 117, 116, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 114, 101, 102, 117, 115, 101, 100, 0, 72, 111, 115, 116, 32, 105, 115, 32, 100, 111, 119, 110, 0, 72, 111, 115, 116, 32, 105, 115, 32, 117, 110, 114, 101, 97, 99, 104, 97, 98, 108, 101, 0, 65, 100, 100, 114, 101, 115, 115, 32, 105, 110, 32, 117, 115, 101, 0, 66, 114, 111, 107, 101, 110, 32, 112, 105, 112, 101, 0, 73, 47, 79, 32, 101, 114, 114, 111, 114, 0, 78, 111, 32, 115, 117, 99, 104, 32, 100, 101, 118, 105, 99, 101, 32, 111, 114, 32, 97, 100, 100, 114, 101, 115, 115, 0, 66, 108, 111, 99, 107, 32, 100, 101, 118, 105, 99, 101, 32, 114, 101, 113, 117, 105, 114, 101, 100, 0, 78, 111, 32, 115, 117, 99, 104, 32, 100, 101, 118, 105, 99, 101, 0, 78, 111, 116, 32, 97, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121, 0, 73, 115, 32, 97, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121, 0, 84, 101, 120, 116, 32, 102, 105, 108, 101, 32, 98, 117, 115, 121, 0, 69, 120, 101, 99, 32, 102, 111, 114, 109, 97, 116, 32, 101, 114, 114, 111, 114, 0, 73, 110, 118, 97, 108, 105, 100, 32, 97, 114, 103, 117, 109, 101, 110, 116, 0, 65, 114, 103, 117, 109, 101, 110, 116, 32, 108, 105, 115, 116, 32, 116, 111, 111, 32, 108, 111, 110, 103, 0, 83, 121, 109, 98, 111, 108, 105, 99, 32, 108, 105, 110, 107, 32, 108, 111, 111, 112, 0, 70, 105, 108, 101, 110, 97, 109, 101, 32, 116, 111, 111, 32, 108, 111, 110, 103, 0, 84, 111, 111, 32, 109, 97, 110, 121, 32, 111, 112, 101, 110, 32, 102, 105, 108, 101, 115, 32, 105, 110, 32, 115, 121, 115, 116, 101, 109, 0, 78, 111, 32, 102, 105, 108, 101, 32, 100, 101, 115, 99, 114, 105, 112, 116, 111, 114, 115, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 66, 97, 100, 32, 102, 105, 108, 101, 32, 100, 101, 115, 99, 114, 105, 112, 116, 111, 114, 0, 78, 111, 32, 99, 104, 105, 108, 100, 32, 112, 114, 111, 99, 101, 115, 115, 0, 66, 97, 100, 32, 97, 100, 100, 114, 101, 115, 115, 0, 70, 105, 108, 101, 32, 116, 111, 111, 32, 108, 97, 114, 103, 101, 0, 84, 111, 111, 32, 109, 97, 110, 121, 32, 108, 105, 110, 107, 115, 0, 78, 111, 32, 108, 111, 99, 107, 115, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 82, 101, 115, 111, 117, 114, 99, 101, 32, 100, 101, 97, 100, 108, 111, 99, 107, 32, 119, 111, 117, 108, 100, 32, 111, 99, 99, 117, 114, 0, 83, 116, 97, 116, 101, 32, 110, 111, 116, 32, 114, 101, 99, 111, 118, 101, 114, 97, 98, 108, 101, 0, 80, 114, 101, 118, 105, 111, 117, 115, 32, 111, 119, 110, 101, 114, 32, 100, 105, 101, 100, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 99, 97, 110, 99, 101, 108, 101, 100, 0, 70, 117, 110, 99, 116, 105, 111, 110, 32, 110, 111, 116, 32, 105, 109, 112, 108, 101, 109, 101, 110, 116, 101, 100, 0, 78, 111, 32, 109, 101, 115, 115, 97, 103, 101, 32, 111, 102, 32, 100, 101, 115, 105, 114, 101, 100, 32, 116, 121, 112, 101, 0, 73, 100, 101, 110, 116, 105, 102, 105, 101, 114, 32, 114, 101, 109, 111, 118, 101, 100, 0, 68, 101, 118, 105, 99, 101, 32, 110, 111, 116, 32, 97, 32, 115, 116, 114, 101, 97, 109, 0, 78, 111, 32, 100, 97, 116, 97, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 68, 101, 118, 105, 99, 101, 32, 116, 105, 109, 101, 111, 117, 116, 0, 79, 117, 116, 32, 111, 102, 32, 115, 116, 114, 101, 97, 109, 115, 32, 114, 101, 115, 111, 117, 114, 99, 101, 115, 0, 76, 105, 110, 107, 32, 104, 97, 115, 32, 98, 101, 101, 110, 32, 115, 101, 118, 101, 114, 101, 100, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 101, 114, 114, 111, 114, 0, 66, 97, 100, 32, 109, 101, 115, 115, 97, 103, 101, 0, 70, 105, 108, 101, 32, 100, 101, 115, 99, 114, 105, 112, 116, 111, 114, 32, 105, 110, 32, 98, 97, 100, 32, 115, 116, 97, 116, 101, 0, 78, 111, 116, 32, 97, 32, 115, 111, 99, 107, 101, 116, 0, 68, 101, 115, 116, 105, 110, 97, 116, 105, 111, 110, 32, 97, 100, 100, 114, 101, 115, 115, 32, 114, 101, 113, 117, 105, 114, 101, 100, 0, 77, 101, 115, 115, 97, 103, 101, 32, 116, 111, 111, 32, 108, 97, 114, 103, 101, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 119, 114, 111, 110, 103, 32, 116, 121, 112, 101, 32, 102, 111, 114, 32, 115, 111, 99, 107, 101, 116, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 110, 111, 116, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 83, 111, 99, 107, 101, 116, 32, 116, 121, 112, 101, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 78, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 102, 97, 109, 105, 108, 121, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 65, 100, 100, 114, 101, 115, 115, 32, 102, 97, 109, 105, 108, 121, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 32, 98, 121, 32, 112, 114, 111, 116, 111, 99, 111, 108, 0, 65, 100, 100, 114, 101, 115, 115, 32, 110, 111, 116, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 78, 101, 116, 119, 111, 114, 107, 32, 105, 115, 32, 100, 111, 119, 110, 0, 78, 101, 116, 119, 111, 114, 107, 32, 117, 110, 114, 101, 97, 99, 104, 97, 98, 108, 101, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 114, 101, 115, 101, 116, 32, 98, 121, 32, 110, 101, 116, 119, 111, 114, 107, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 97, 98, 111, 114, 116, 101, 100, 0, 78, 111, 32, 98, 117, 102, 102, 101, 114, 32, 115, 112, 97, 99, 101, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 83, 111, 99, 107, 101, 116, 32, 105, 115, 32, 99, 111, 110, 110, 101, 99, 116, 101, 100, 0, 83, 111, 99, 107, 101, 116, 32, 110, 111, 116, 32, 99, 111, 110, 110, 101, 99, 116, 101, 100, 0, 67, 97, 110, 110, 111, 116, 32, 115, 101, 110, 100, 32, 97, 102, 116, 101, 114, 32, 115, 111, 99, 107, 101, 116, 32, 115, 104, 117, 116, 100, 111, 119, 110, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 97, 108, 114, 101, 97, 100, 121, 32, 105, 110, 32, 112, 114, 111, 103, 114, 101, 115, 115, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 105, 110, 32, 112, 114, 111, 103, 114, 101, 115, 115, 0, 83, 116, 97, 108, 101, 32, 102, 105, 108, 101, 32, 104, 97, 110, 100, 108, 101, 0, 82, 101, 109, 111, 116, 101, 32, 73, 47, 79, 32, 101, 114, 114, 111, 114, 0, 81, 117, 111, 116, 97, 32, 101, 120, 99, 101, 101, 100, 101, 100, 0, 78, 111, 32, 109, 101, 100, 105, 117, 109, 32, 102, 111, 117, 110, 100, 0, 87, 114, 111, 110, 103, 32, 109, 101, 100, 105, 117, 109, 32, 116, 121, 112, 101, 0, 78, 111, 32, 101, 114, 114, 111, 114, 32, 105, 110, 102, 111, 114, 109, 97, 116, 105, 111, 110, 0, 0, 105, 110, 102, 105, 110, 105, 116, 121, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 255, 255, 255, 255, 255, 255, 255, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 255, 255, 255, 255, 255, 255, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 1, 2, 4, 7, 3, 6, 5, 0, 80, 79, 83, 73, 88, 0, 17, 0, 10, 0, 17, 17, 17, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 15, 10, 17, 17, 17, 3, 10, 7, 0, 1, 19, 9, 11, 11, 0, 0, 9, 6, 11, 0, 0, 11, 0, 6, 17, 0, 0, 0, 17, 17, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 10, 10, 17, 17, 17, 0, 10, 0, 0, 2, 0, 9, 11, 0, 0, 0, 9, 0, 11, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 12, 0, 0, 0, 0, 9, 12, 0, 0, 0, 0, 0, 12, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 4, 13, 0, 0, 0, 0, 9, 14, 0, 0, 0, 0, 0, 14, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 15, 0, 0, 0, 0, 9, 16, 0, 0, 0, 0, 0, 16, 0, 0, 16, 0, 0, 18, 0, 0, 0, 18, 18, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 18, 18, 18, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 9, 11, 0, 0, 0, 0, 0, 11, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 12, 0, 0, 0, 0, 9, 12, 0, 0, 0, 0, 0, 12, 0, 0, 12, 0, 0, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 45, 43, 32, 32, 32, 48, 88, 48, 120, 0, 40, 110, 117, 108, 108, 41, 0, 45, 48, 88, 43, 48, 88, 32, 48, 88, 45, 48, 120, 43, 48, 120, 32, 48, 120, 0, 105, 110, 102, 0, 73, 78, 70, 0, 110, 97, 110, 0, 78, 65, 78, 0, 46, 0, 37, 108, 108, 117, 0, 78, 83, 116, 51, 95, 95, 49, 56, 105, 111, 115, 95, 98, 97, 115, 101, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 53, 98, 97, 115, 105, 99, 95, 115, 116, 114, 101, 97, 109, 98, 117, 102, 73, 99, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 99, 69, 69, 69, 69, 0, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 65, 66, 67, 68, 69, 70, 120, 88, 43, 45, 112, 80, 105, 73, 110, 78, 0, 78, 83, 116, 51, 95, 95, 49, 54, 108, 111, 99, 97, 108, 101, 53, 102, 97, 99, 101, 116, 69, 0, 78, 83, 116, 51, 95, 95, 49, 53, 99, 116, 121, 112, 101, 73, 119, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 99, 111, 100, 101, 99, 118, 116, 73, 99, 99, 49, 49, 95, 95, 109, 98, 115, 116, 97, 116, 101, 95, 116, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 99, 111, 100, 101, 99, 118, 116, 73, 68, 115, 99, 49, 49, 95, 95, 109, 98, 115, 116, 97, 116, 101, 95, 116, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 99, 111, 100, 101, 99, 118, 116, 73, 68, 105, 99, 49, 49, 95, 95, 109, 98, 115, 116, 97, 116, 101, 95, 116, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 54, 95, 95, 110, 97, 114, 114, 111, 119, 95, 116, 111, 95, 117, 116, 102, 56, 73, 76, 106, 51, 50, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 55, 95, 95, 119, 105, 100, 101, 110, 95, 102, 114, 111, 109, 95, 117, 116, 102, 56, 73, 76, 106, 51, 50, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 99, 111, 100, 101, 99, 118, 116, 73, 119, 99, 49, 49, 95, 95, 109, 98, 115, 116, 97, 116, 101, 95, 116, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 54, 108, 111, 99, 97, 108, 101, 53, 95, 95, 105, 109, 112, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 99, 111, 108, 108, 97, 116, 101, 73, 99, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 99, 111, 108, 108, 97, 116, 101, 73, 119, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 53, 99, 116, 121, 112, 101, 73, 99, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 56, 110, 117, 109, 112, 117, 110, 99, 116, 73, 99, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 56, 110, 117, 109, 112, 117, 110, 99, 116, 73, 119, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 110, 117, 109, 95, 103, 101, 116, 73, 99, 78, 83, 95, 49, 57, 105, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 99, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 99, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 110, 117, 109, 95, 103, 101, 116, 73, 119, 78, 83, 95, 49, 57, 105, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 119, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 119, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 110, 117, 109, 95, 112, 117, 116, 73, 99, 78, 83, 95, 49, 57, 111, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 99, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 99, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 55, 110, 117, 109, 95, 112, 117, 116, 73, 119, 78, 83, 95, 49, 57, 111, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 119, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 119, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 56, 116, 105, 109, 101, 95, 103, 101, 116, 73, 99, 78, 83, 95, 49, 57, 105, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 99, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 99, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 56, 116, 105, 109, 101, 95, 103, 101, 116, 73, 119, 78, 83, 95, 49, 57, 105, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 119, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 119, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 56, 116, 105, 109, 101, 95, 112, 117, 116, 73, 99, 78, 83, 95, 49, 57, 111, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 99, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 99, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 56, 116, 105, 109, 101, 95, 112, 117, 116, 73, 119, 78, 83, 95, 49, 57, 111, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 119, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 119, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 48, 109, 111, 110, 101, 121, 112, 117, 110, 99, 116, 73, 99, 76, 98, 48, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 48, 109, 111, 110, 101, 121, 112, 117, 110, 99, 116, 73, 99, 76, 98, 49, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 48, 109, 111, 110, 101, 121, 112, 117, 110, 99, 116, 73, 119, 76, 98, 48, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 48, 109, 111, 110, 101, 121, 112, 117, 110, 99, 116, 73, 119, 76, 98, 49, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 57, 109, 111, 110, 101, 121, 95, 103, 101, 116, 73, 99, 78, 83, 95, 49, 57, 105, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 99, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 99, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 57, 109, 111, 110, 101, 121, 95, 103, 101, 116, 73, 119, 78, 83, 95, 49, 57, 105, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 119, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 119, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 57, 109, 111, 110, 101, 121, 95, 112, 117, 116, 73, 99, 78, 83, 95, 49, 57, 111, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 99, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 99, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 57, 109, 111, 110, 101, 121, 95, 112, 117, 116, 73, 119, 78, 83, 95, 49, 57, 111, 115, 116, 114, 101, 97, 109, 98, 117, 102, 95, 105, 116, 101, 114, 97, 116, 111, 114, 73, 119, 78, 83, 95, 49, 49, 99, 104, 97, 114, 95, 116, 114, 97, 105, 116, 115, 73, 119, 69, 69, 69, 69, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 56, 109, 101, 115, 115, 97, 103, 101, 115, 73, 99, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 56, 109, 101, 115, 115, 97, 103, 101, 115, 73, 119, 69, 69, 0, 37, 112, 0, 67, 0, 37, 0, 0, 0, 0, 0, 108, 0, 108, 108, 0, 0, 76, 0, 37, 112, 0, 0, 0, 0, 37, 72, 58, 37, 77, 58, 37, 83, 37, 109, 47, 37, 100, 47, 37, 121, 37, 89, 45, 37, 109, 45, 37, 100, 37, 73, 58, 37, 77, 58, 37, 83, 32, 37, 112, 37, 72, 58, 37, 77, 37, 72, 58, 37, 77, 58, 37, 83, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 37, 76, 102, 0, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 37, 46, 48, 76, 102, 0, 116, 114, 117, 101, 0, 102, 97, 108, 115, 101, 0, 83, 117, 110, 100, 97, 121, 0, 77, 111, 110, 100, 97, 121, 0, 84, 117, 101, 115, 100, 97, 121, 0, 87, 101, 100, 110, 101, 115, 100, 97, 121, 0, 84, 104, 117, 114, 115, 100, 97, 121, 0, 70, 114, 105, 100, 97, 121, 0, 83, 97, 116, 117, 114, 100, 97, 121, 0, 83, 117, 110, 0, 77, 111, 110, 0, 84, 117, 101, 0, 87, 101, 100, 0, 84, 104, 117, 0, 70, 114, 105, 0, 83, 97, 116, 0, 74, 97, 110, 117, 97, 114, 121, 0, 70, 101, 98, 114, 117, 97, 114, 121, 0, 77, 97, 114, 99, 104, 0, 65, 112, 114, 105, 108, 0, 77, 97, 121, 0, 74, 117, 110, 101, 0, 74, 117, 108, 121, 0, 65, 117, 103, 117, 115, 116, 0, 83, 101, 112, 116, 101, 109, 98, 101, 114, 0, 79, 99, 116, 111, 98, 101, 114, 0, 78, 111, 118, 101, 109, 98, 101, 114, 0, 68, 101, 99, 101, 109, 98, 101, 114, 0, 74, 97, 110, 0, 70, 101, 98, 0, 77, 97, 114, 0, 65, 112, 114, 0, 74, 117, 110, 0, 74, 117, 108, 0, 65, 117, 103, 0, 83, 101, 112, 0, 79, 99, 116, 0, 78, 111, 118, 0, 68, 101, 99, 0, 65, 77, 0, 80, 77, 0, 37, 109, 47, 37, 100, 47, 37, 121, 0, 37, 72, 58, 37, 77, 58, 37, 83, 0, 37, 97, 32, 37, 98, 32, 37, 100, 32, 37, 72, 58, 37, 77, 58, 37, 83, 32, 37, 89, 0, 37, 73, 58, 37, 77, 58, 37, 83, 32, 37, 112, 0, 78, 83, 116, 51, 95, 95, 49, 49, 51, 109, 101, 115, 115, 97, 103, 101, 115, 95, 98, 97, 115, 101, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 49, 95, 95, 109, 111, 110, 101, 121, 95, 112, 117, 116, 73, 119, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 49, 95, 95, 109, 111, 110, 101, 121, 95, 112, 117, 116, 73, 99, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 49, 95, 95, 109, 111, 110, 101, 121, 95, 103, 101, 116, 73, 119, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 49, 95, 95, 109, 111, 110, 101, 121, 95, 103, 101, 116, 73, 99, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 48, 109, 111, 110, 101, 121, 95, 98, 97, 115, 101, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 48, 95, 95, 116, 105, 109, 101, 95, 112, 117, 116, 69, 0, 78, 83, 116, 51, 95, 95, 49, 50, 48, 95, 95, 116, 105, 109, 101, 95, 103, 101, 116, 95, 99, 95, 115, 116, 111, 114, 97, 103, 101, 73, 119, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 50, 48, 95, 95, 116, 105, 109, 101, 95, 103, 101, 116, 95, 99, 95, 115, 116, 111, 114, 97, 103, 101, 73, 99, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 57, 116, 105, 109, 101, 95, 98, 97, 115, 101, 69, 0, 78, 83, 116, 51, 95, 95, 49, 57, 95, 95, 110, 117, 109, 95, 112, 117, 116, 73, 119, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 52, 95, 95, 110, 117, 109, 95, 112, 117, 116, 95, 98, 97, 115, 101, 69, 0, 78, 83, 116, 51, 95, 95, 49, 57, 95, 95, 110, 117, 109, 95, 112, 117, 116, 73, 99, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 57, 95, 95, 110, 117, 109, 95, 103, 101, 116, 73, 119, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 52, 95, 95, 110, 117, 109, 95, 103, 101, 116, 95, 98, 97, 115, 101, 69, 0, 78, 83, 116, 51, 95, 95, 49, 57, 95, 95, 110, 117, 109, 95, 103, 101, 116, 73, 99, 69, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 50, 99, 111, 100, 101, 99, 118, 116, 95, 98, 97, 115, 101, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 48, 99, 116, 121, 112, 101, 95, 98, 97, 115, 101, 69, 0, 78, 83, 116, 51, 95, 95, 49, 49, 52, 95, 95, 115, 104, 97, 114, 101, 100, 95, 99, 111, 117, 110, 116, 69, 0], "i8", 4, k.ga + 16484);
 var hb = k.ha(E(12, "i8", 2), 8);
 u(0 == hb % 8);
 c._51a118dd = Ub;
 var Vb = oa,
  Wb = pa,
  w = {
   X: 0,
   vb: [],
   p: {},
   La: function(a) {
    if (!a || w.p[a]) return a;
    for (var b in w.p)
     if (w.p[b].sa === a) return b;
    return a
   },
   qb: function(a) {
    a && w.p[a].R++
   },
   zb: function(a) {
    if (a) {
     var b = w.p[a];
     u(0 < b.R);
     b.R--;
     0 === b.R && (b.ua && k.C("vi", b.ua, [a]), delete w.p[a], _59c60be6(a))
    }
   },
   Ka: function(a) {
    a && (w.p[a].R = 0)
   }
  };
 c._4edc0a70 = Xb;
 var Yb = qa,
  fa = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  ga = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  Zb = oa,
  $b = pa,
  e = {
   g: {
    q: null,
    method: "",
    M: 0,
    n: null,
    A: 0,
    qa: 0,
    ea: 0,
    ja: 0,
    Ca: [],
    pause: function() {
     e.g.q = null;
     e.g.M++
    },
    resume: function() {
     e.g.M++;
     var a = e.g.qa,
      b = e.g.ea,
      c = e.g.n;
     e.g.n = null;
     Ra(c, 0, !1, e.g.A, !0);
     ha(a, b);
     e.g.q()
    },
    kb: function() {
     if (c.setStatus) {
      var a = c.statusMessage || "Please wait...",
       b = e.g.Z,
       d = e.g.Cb;
      b ? b < d ? c.setStatus(a + " (" + (d - b) + "/" + d + ")") : c.setStatus(a) : c.setStatus("")
     }
    },
    $a: function(a) {
     if (!(A || c.preMainLoop && !1 === c.preMainLoop())) {
      try {
       a()
      } catch (b) {
       if (b instanceof S) return;
       b && "object" === typeof b && b.stack && c.P("exception thrown: " + [b, b.stack]);
       throw b;
      }
      c.postMainLoop && c.postMainLoop()
     }
    }
   },
   ma: !1,
   na: !1,
   Ua: [],
   workers: [],
   Sa: function() {
    function a() {
     e.na = document.pointerLockElement === d || document.mozPointerLockElement === d || document.webkitPointerLockElement === d || document.msPointerLockElement === d
    }
    c.preloadPlugins || (c.preloadPlugins = []);
    if (!e.Ta) {
     e.Ta = !0;
     try {
      e.V = !0
     } catch (b) {
      e.V = !1, console.log("warning: no blob constructor, cannot create blobs with mimetypes")
     }
     e.BlobBuilder = "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : e.V ? null : console.log("warning: no BlobBuilder");
     e.S = "undefined" != typeof n ? n.URL ? n.URL : n.webkitURL : void 0;
     c.Ba || "undefined" !== typeof e.S || (console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."), c.Ba = !0);
     c.preloadPlugins.push({
      canHandle: function(a) {
       return !c.Ba && /\.(jpg|jpeg|png|bmp)$/i.test(a)
      },
      handle: function(a, b, d, l) {
       var f = null;
       if (e.V) try {
        f = new Blob([a], {
         type: e.la(b)
        }), f.size !== a.length && (f = new Blob([(new Uint8Array(a)).buffer], {
         type: e.la(b)
        }))
       } catch (h) {
        k.K("Blob constructor present but fails: " + h + "; falling back to blob builder")
       }
       f || (f = new e.BlobBuilder, f.append((new Uint8Array(a)).buffer), f = f.getBlob());
       var n = e.S.createObjectURL(f),
        p = new Image;
       p.onload = function() {
        u(p.complete, "Image " + b + " could not be decoded");
        var f = document.createElement("canvas");
        f.width = p.width;
        f.height = p.height;
        f.getContext("2d").drawImage(p, 0, 0);
        c.preloadedImages[b] = f;
        e.S.revokeObjectURL(n);
        d && d(a)
       };
       p.onerror = function() {
        console.log("Image " + n + " could not be decoded");
        l && l()
       };
       p.src = n
      }
     });
     c.preloadPlugins.push({
      canHandle: function(a) {
       return !c.Mb && a.substr(-4) in {
        ".ogg": 1,
        ".wav": 1,
        ".mp3": 1
       }
      },
      handle: function(a, b, d, f) {
       function h(e) {
        n || (n = !0, c.preloadedAudios[b] = e, d && d(a))
       }

       function k() {
        n || (n = !0, c.preloadedAudios[b] = new Audio, f && f())
       }
       var n = !1;
       if (e.V) {
        try {
         var p = new Blob([a], {
          type: e.la(b)
         })
        } catch (u) {
         return k()
        }
        var p = e.S.createObjectURL(p),
         t = new Audio;
        t.addEventListener("canplaythrough", function() {
         h(t)
        }, !1);
        t.onerror = function() {
         if (!n) {
          console.log("warning: browser could not fully decode audio " + b + ", trying slower base64 approach");
          for (var c = "", d = 0, e = 0, f = 0; f < a.length; f++)
           for (d = d << 8 | a[f], e += 8; 6 <= e;) var l = d >> e - 6 & 63,
            e = e - 6,
            c = c + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [l];
          2 == e ? (c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(d & 3) << 4], c += "==") : 4 == e && (c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(d & 15) << 2], c += "=");
          t.src = "data:audio/x-" + b.substr(-3) + ";base64," + c;
          h(t)
         }
        };
        t.src = p;
        e.ab(function() {
         h(t)
        }, 1E4)
       } else return k()
      }
     });
     var d = c.canvas;
     d && (d.oa = d.requestPointerLock || d.mozRequestPointerLock || d.webkitRequestPointerLock || d.msRequestPointerLock || function() {}, d.va = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || document.msExitPointerLock || function() {}, d.va = d.va.bind(document), document.addEventListener("pointerlockchange", a, !1), document.addEventListener("mozpointerlockchange", a, !1), document.addEventListener("webkitpointerlockchange", a, !1), document.addEventListener("mspointerlockchange", a, !1), c.elementPointerLock && d.addEventListener("click", function(a) {
      !e.na && d.oa && (d.oa(), a.preventDefault())
     }, !1))
    }
   },
   createContext: function(a, b, d, f) {
    if (b && c.ia && a == c.canvas) return c.ia;
    var g, m;
    if (b) {
     m = {
      antialias: !1,
      alpha: !1
     };
     if (f)
      for (var l in f) m[l] = f[l];
     if (m = GL.createContext(a, m)) g = GL.getContext(m).nb;
     a.style.backgroundColor = "black"
    } else g = a.getContext("2d");
    if (!g) return null;
    d && (b || u("undefined" === typeof GLctx, "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"), c.ia = g, b && GL.Lb(m), c.Xb = b, e.Ua.forEach(function(a) {
     a()
    }), e.Sa());
    return g
   },
   Ab: function() {},
   xa: !1,
   Y: void 0,
   I: void 0,
   $: function(a, b, d) {
    function f() {
     e.ma = !1;
     var a = g.parentNode;
     (document.webkitFullScreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.mozFullscreenElement || document.fullScreenElement || document.fullscreenElement || document.msFullScreenElement || document.msFullscreenElement || document.webkitCurrentFullScreenElement) === a ? (g.ta = document.cancelFullScreen || document.mozCancelFullScreen || document.webkitCancelFullScreen || document.msExitFullscreen || document.exitFullscreen || function() {}, g.ta = g.ta.bind(document), e.Y && g.oa(), e.ma = !0, e.I && e.cb()) : (a.parentNode.insertBefore(g, a), a.parentNode.removeChild(a), e.I && e.fb());
     if (c.onFullScreen) c.onFullScreen(e.ma);
     e.Fa(g)
    }
    e.Y = a;
    e.I = b;
    e.Ga = d;
    "undefined" === typeof e.Y && (e.Y = !0);
    "undefined" === typeof e.I && (e.I = !1);
    "undefined" === typeof e.Ga && (e.Ga = null);
    var g = c.canvas;
    e.xa || (e.xa = !0, document.addEventListener("fullscreenchange", f, !1), document.addEventListener("mozfullscreenchange", f, !1), document.addEventListener("webkitfullscreenchange", f, !1), document.addEventListener("MSFullscreenChange", f, !1));
    var m = document.createElement("div");
    g.parentNode.insertBefore(m, g);
    m.appendChild(g);
    m.$ = m.requestFullScreen || m.mozRequestFullScreen || m.msRequestFullscreen || (m.webkitRequestFullScreen ? function() {
     m.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
    } : null);
    d ? m.$({
     Yb: d
    }) : m.$()
   },
   H: 0,
   wa: function(a) {
    var b = Date.now();
    if (0 === e.H) e.H = b + 1E3 / 60;
    else
     for (; b + 2 >= e.H;) e.H += 1E3 / 60;
    b = Math.max(e.H - b, 0);
    setTimeout(a, b)
   },
   requestAnimationFrame: function(a) {
    "undefined" === typeof n ? e.wa(a) : (n.requestAnimationFrame || (n.requestAnimationFrame = n.requestAnimationFrame || n.mozRequestAnimationFrame || n.webkitRequestAnimationFrame || n.msRequestAnimationFrame || n.oRequestAnimationFrame || e.wa), n.requestAnimationFrame(a))
   },
   Sb: function(a) {
    return function() {
     if (!A) return a.apply(null, arguments)
    }
   },
   L: !0,
   Q: [],
   Ob: function() {
    e.L = !1
   },
   Rb: function() {
    e.L = !0;
    if (0 < e.Q.length) {
     var a = e.Q;
     e.Q = [];
     a.forEach(function(a) {
      a()
     })
    }
   },
   Tb: function(a) {
    return e.requestAnimationFrame(function() {
     A || (e.L ? a() : e.Q.push(a))
    })
   },
   ab: function(a, b) {
    c.noExitRuntime = !0;
    return setTimeout(function() {
     A || (e.L ? a() : e.Q.push(a))
    }, b)
   },
   Ub: function(a, b) {
    c.noExitRuntime = !0;
    return setInterval(function() {
     A || e.L && a()
    }, b)
   },
   la: function(a) {
    return {
     jpg: "image/jpeg",
     jpeg: "image/jpeg",
     png: "image/png",
     bmp: "image/bmp",
     ogg: "audio/ogg",
     wav: "audio/wav",
     mp3: "audio/mpeg"
    }[a.substr(a.lastIndexOf(".") + 1)]
   },
   U: function(a) {
    n.U || (n.U = navigator.getUserMedia || navigator.mozGetUserMedia);
    n.U(a)
   },
   Na: function(a) {
    return a.movementX || a.mozMovementX || a.webkitMovementX || 0
   },
   Oa: function(a) {
    return a.movementY || a.mozMovementY || a.webkitMovementY || 0
   },
   Hb: function(a) {
    var b = 0;
    switch (a.type) {
     case "DOMMouseScroll":
      b = a.detail;
      break;
     case "mousewheel":
      b = a.wheelDelta;
      break;
     case "wheel":
      b = a.deltaY;
      break;
     default:
      throw "unrecognized mouse wheel event: " + a.type;
    }
    return b
   },
   F: 0,
   G: 0,
   N: 0,
   O: 0,
   touches: {},
   za: {},
   tb: function(a) {
    if (e.na) "mousemove" != a.type && "mozMovementX" in a ? e.N = e.O = 0 : (e.N = e.Na(a), e.O = e.Oa(a)), "undefined" != typeof SDL ? (e.F = SDL.F + e.N, e.G = SDL.G + e.O) : (e.F += e.N, e.G += e.O);
    else {
     var b = c.canvas.getBoundingClientRect(),
      d = c.canvas.width,
      f = c.canvas.height,
      g = "undefined" !== typeof n.scrollX ? n.scrollX : n.pageXOffset,
      m = "undefined" !== typeof n.scrollY ? n.scrollY : n.pageYOffset;
     if ("touchstart" === a.type || "touchend" === a.type || "touchmove" === a.type) {
      var l = a.Wb;
      if (void 0 !== l)
       if (g = l.pageX - (g + b.left), m = l.pageY - (m + b.top), g *= d / b.width, m *= f / b.height, b = {
         x: g,
         y: m
        }, "touchstart" === a.type) e.za[l.identifier] = b, e.touches[l.identifier] = b;
       else if ("touchend" === a.type || "touchmove" === a.type)(a = e.touches[l.identifier]) || (a = b), e.za[l.identifier] = a, e.touches[l.identifier] = b
     } else l = a.pageX - (g + b.left), a = a.pageY - (m + b.top), l *= d / b.width, a *= f / b.height, e.N = l - e.F, e.O = a - e.G, e.F = l, e.G = a
    }
   },
   mb: function(a, b, c) {
    var e = new XMLHttpRequest;
    e.open("GET.html", a, !0);
    e.responseType = "arraybuffer";
    e.onload = function() {
     200 == e.status || 0 == e.status && e.response ? b(e.response) : c()
    };
    e.onerror = c;
    e.send(null)
   },
   sb: function(a, b, c, f) {
    e.mb(a, function(c) {
     u(c, 'Loading data file "' + a + '" failed (no arrayBuffer).');
     b(new Uint8Array(c));
     f || Pa()
    }, function() {
     if (c) c();
     else throw 'Loading data file "' + a + '" failed.';
    });
    f || Oa()
   },
   Za: [],
   ra: function() {
    var a = c.canvas;
    e.Za.forEach(function(b) {
     b(a.width, a.height)
    })
   },
   bb: function(a, b, d) {
    e.Fa(c.canvas, a, b);
    d || e.ra()
   },
   bc: 0,
   ac: 0,
   cb: function() {
    if ("undefined" != typeof SDL) {
     var a = aa[SDL.screen + 0 * k.u >> 2];
     p[SDL.screen + 0 * k.u >> 2] = a | 8388608
    }
    e.ra()
   },
   fb: function() {
    if ("undefined" != typeof SDL) {
     var a = aa[SDL.screen + 0 * k.u >> 2];
     p[SDL.screen + 0 * k.u >> 2] = a & -8388609
    }
    e.ra()
   },
   Fa: function(a, b, d) {
    b && d ? (a.lb = b, a.Ra = d) : (b = a.lb, d = a.Ra);
    var f = b,
     g = d;
    c.forcedAspectRatio && 0 < c.forcedAspectRatio && (f / g < c.forcedAspectRatio ? f = Math.round(g * c.forcedAspectRatio) : g = Math.round(f / c.forcedAspectRatio));
    if ((document.webkitFullScreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.mozFullscreenElement || document.fullScreenElement || document.fullscreenElement || document.msFullScreenElement || document.msFullscreenElement || document.webkitCurrentFullScreenElement) === a.parentNode && "undefined" != typeof screen) var m = Math.min(screen.width / f, screen.height / g),
     f = Math.round(f * m),
     g = Math.round(g * m);
    e.I ? (a.width != f && (a.width = f), a.height != g && (a.height = g), "undefined" != typeof a.style && (a.style.removeProperty("width"), a.style.removeProperty("height"))) : (a.width != b && (a.width = b), a.height != d && (a.height = d), "undefined" != typeof a.style && (f != b || g != d ? (a.style.setProperty("width", f + "px", "important"), a.style.setProperty("height", g + "px", "important")) : (a.style.removeProperty("width"), a.style.removeProperty("height"))))
   },
   Zb: {},
   Aa: 0,
   Ib: function() {
    var a = e.Aa;
    e.Aa++;
    return a
   }
  };
 c._ef979e9 = z;
 var ac = Mb;
 c._1f5fc56a = bc;
 var cc = qa;
 c._15b6f24d = dc;
 c._140832cf = ec;
 var fc = Lb,
  gc = Ob;
 c._102e492d = hc;
 c._22bcfc20 = ic;
 var jc = Nb;
 c.requestFullScreen = function(a, b, c) {
  e.$(a, b, c)
 };
 c.requestAnimationFrame = function(a) {
  e.requestAnimationFrame(a)
 };
 c.setCanvasSize = function(a, b, c) {
  e.bb(a, b, c)
 };
 c.pauseMainLoop = function() {
  e.g.pause()
 };
 c.resumeMainLoop = function() {
  e.g.resume()
 };
 c.getUserMedia = function() {
  e.U()
 };
 c.createContext = function(a, b, c, f) {
  return e.createContext(a, b, c, f)
 };
 eb = D = k.ha(N);
 bb = !0;
 ya = eb + gb;
 fb = B = k.ha(ya);
 u(fb < O, "TOTAL_MEMORY not big enough for stack");
 var kc = E([8, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 7, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0], "i8", 3);
 c.Ia = {
  Math: Math,
  Int8Array: Int8Array,
  Int16Array: Int16Array,
  Int32Array: Int32Array,
  Uint8Array: Uint8Array,
  Uint16Array: Uint16Array,
  Uint32Array: Uint32Array,
  Float32Array: Float32Array,
  Float64Array: Float64Array,
  NaN: NaN,
  Infinity: Infinity
 };
 c.Ja = {
  abort: K,
  assert: u,
  invoke_iiiiiiii: function(a, b, d, e, g, m, l, h) {
   try {
    return c.dynCall_iiiiiiii(a, b, d, e, g, m, l, h)
   } catch (k) {
    if ("number" !== typeof k && "longjmp" !== k) throw k;
    f.setThrew(1, 0)
   }
  },
  invoke_iiii: function(a, b, d, e) {
   try {
    return c.dynCall_iiii(a, b, d, e)
   } catch (g) {
    if ("number" !== typeof g && "longjmp" !== g) throw g;
    f.setThrew(1, 0)
   }
  },
  invoke_viiiii: function(a, b, d, e, g, m) {
   try {
    c.dynCall_viiiii(a, b, d, e, g, m)
   } catch (l) {
    if ("number" !== typeof l && "longjmp" !== l) throw l;
    f.setThrew(1, 0)
   }
  },
  invoke_iiiiiid: function(a, b, d, e, g, m, l) {
   try {
    return c.dynCall_iiiiiid(a, b, d, e, g, m, l)
   } catch (h) {
    if ("number" !== typeof h && "longjmp" !== h) throw h;
    f.setThrew(1, 0)
   }
  },
  invoke_vi: function(a, b) {
   try {
    c.dynCall_vi(a, b)
   } catch (d) {
    if ("number" !== typeof d && "longjmp" !== d) throw d;
    f.setThrew(1, 0)
   }
  },
  invoke_vii: function(a, b, d) {
   try {
    c.dynCall_vii(a, b, d)
   } catch (e) {
    if ("number" !== typeof e && "longjmp" !== e) throw e;
    f.setThrew(1, 0)
   }
  },
  invoke_iiiiiii: function(a, b, d, e, g, m, l) {
   try {
    return c.dynCall_iiiiiii(a, b, d, e, g, m, l)
   } catch (h) {
    if ("number" !== typeof h && "longjmp" !== h) throw h;
    f.setThrew(1, 0)
   }
  },
  invoke_iiiiid: function(a, b, d, e, g, m) {
   try {
    return c.dynCall_iiiiid(a, b, d, e, g, m)
   } catch (l) {
    if ("number" !== typeof l && "longjmp" !== l) throw l;
    f.setThrew(1, 0)
   }
  },
  invoke_ii: function(a, b) {
   try {
    return c.dynCall_ii(a, b)
   } catch (d) {
    if ("number" !== typeof d && "longjmp" !== d) throw d;
    f.setThrew(1, 0)
   }
  },
  invoke_viii: function(a, b, d, e) {
   try {
    c.dynCall_viii(a, b, d, e)
   } catch (g) {
    if ("number" !== typeof g && "longjmp" !== g) throw g;
    f.setThrew(1, 0)
   }
  },
  invoke_v: function(a) {
   try {
    c.dynCall_v(a)
   } catch (b) {
    if ("number" !== typeof b && "longjmp" !== b) throw b;
    f.setThrew(1, 0)
   }
  },
  invoke_iiiiiiiii: function(a, b, d, e, g, m, l, h, k) {
   try {
    return c.dynCall_iiiiiiiii(a, b, d, e, g, m, l, h, k)
   } catch (n) {
    if ("number" !== typeof n && "longjmp" !== n) throw n;
    f.setThrew(1, 0)
   }
  },
  invoke_iiiii: function(a, b, d, e, g) {
   try {
    return c.dynCall_iiiii(a, b, d, e, g)
   } catch (m) {
    if ("number" !== typeof m && "longjmp" !== m) throw m;
    f.setThrew(1, 0)
   }
  },
  invoke_viiiiii: function(a, b, d, e, g, m, l) {
   try {
    c.dynCall_viiiiii(a, b, d, e, g, m, l)
   } catch (h) {
    if ("number" !== typeof h && "longjmp" !== h) throw h;
    f.setThrew(1, 0)
   }
  },
  invoke_iii: function(a, b, d) {
   try {
    return c.dynCall_iii(a, b, d)
   } catch (e) {
    if ("number" !== typeof e && "longjmp" !== e) throw e;
    f.setThrew(1, 0)
   }
  },
  invoke_iiiiii: function(a, b, d, e, g, m) {
   try {
    return c.dynCall_iiiiii(a, b, d, e, g, m)
   } catch (h) {
    if ("number" !== typeof h && "longjmp" !== h) throw h;
    f.setThrew(1, 0)
   }
  },
  invoke_viiii: function(a, b, d, e, g) {
   try {
    c.dynCall_viiii(a, b, d, e, g)
   } catch (h) {
    if ("number" !== typeof h && "longjmp" !== h) throw h;
    f.setThrew(1, 0)
   }
  },
  _5a38fcec: Zb,
  _51c14244: function() {
   return 0
  },
  _1d84487e: ac,
  _6208c818: gc,
  _74bc5b26: function(a) {
   return t[a >> 0] ? 0 : t[a >> 0] = 1
  },
  _92af845: jc,
  _53af8949: ha,
  _414ff42f: function(a, b, c, e) {
   A = !0;
   throw "Assertion failed: " + C(a) + ", at: " + [b ? C(b) : "unknown filename", c, e ? C(e) : "unknown function"] + " at " + ta();
  },
  _19df4f55: function(a) {
   return z(a)
  },
  _2387a73c: V,
  _493ebe56: $b,
  _1b94723e: X,
  _4dd610a3: function() {},
  _71b40523: Y,
  _4a4f7367: function(a, b, c, e) {
   return Qa(a, b, c, e)
  },
  _7e12abc0: Sa,
  _263003f3: Vb,
  _8913ce8: Yb,
  _73eeb032: function(a, b, c) {
   v.set(v.subarray(b, b + c), a);
   return a
  },
  _40da5778: function(a) {
   w.X || (w.X = a);
   w.Ka(w.La(a));
   throw a + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
  },
  _125ee6ee: W,
  _756e01d4: function(a) {
   switch (a) {
    case 30:
     return 4096;
    case 85:
     return F / 4096;
    case 132:
    case 133:
    case 12:
    case 137:
    case 138:
    case 15:
    case 235:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 149:
    case 13:
    case 10:
    case 236:
    case 153:
    case 9:
    case 21:
    case 22:
    case 159:
    case 154:
    case 14:
    case 77:
    case 78:
    case 139:
    case 80:
    case 81:
    case 82:
    case 68:
    case 67:
    case 164:
    case 11:
    case 29:
    case 47:
    case 48:
    case 95:
    case 52:
    case 51:
    case 46:
     return 200809;
    case 79:
     return 0;
    case 27:
    case 246:
    case 127:
    case 128:
    case 23:
    case 24:
    case 160:
    case 161:
    case 181:
    case 182:
    case 242:
    case 183:
    case 184:
    case 243:
    case 244:
    case 245:
    case 165:
    case 178:
    case 179:
    case 49:
    case 50:
    case 168:
    case 169:
    case 175:
    case 170:
    case 171:
    case 172:
    case 97:
    case 76:
    case 32:
    case 173:
    case 35:
     return -1;
    case 176:
    case 177:
    case 7:
    case 155:
    case 8:
    case 157:
    case 125:
    case 126:
    case 92:
    case 93:
    case 129:
    case 130:
    case 131:
    case 94:
    case 91:
     return 1;
    case 74:
    case 60:
    case 69:
    case 70:
    case 4:
     return 1024;
    case 31:
    case 42:
    case 72:
     return 32;
    case 87:
    case 26:
    case 33:
     return 2147483647;
    case 34:
    case 1:
     return 47839;
    case 38:
    case 36:
     return 99;
    case 43:
    case 37:
     return 2048;
    case 0:
     return 2097152;
    case 3:
     return 65536;
    case 28:
     return 32768;
    case 44:
     return 32767;
    case 75:
     return 16384;
    case 39:
     return 1E3;
    case 89:
     return 700;
    case 71:
     return 256;
    case 40:
     return 255;
    case 2:
     return 100;
    case 180:
     return 64;
    case 25:
     return 20;
    case 5:
     return 16;
    case 6:
     return 6;
    case 73:
     return 4;
    case 84:
     return "object" === typeof navigator ? navigator.hardwareConcurrency || 1 : 1
   }
   Sa(22);
   return -1
  },
  _1f58dc45: Qa,
  _6be03341: ea,
  _7bf6f910: function(a) {
   c.noExitRuntime = !1;
   c.exit(a)
  },
  _6b556217: fc,
  _17381bf: function() {
   return 0
  },
  _2da00ace: function() {},
  _1f155cb2: Wb,
  _2f23cb3: ia,
  _28ad37be: function() {
   c.noExitRuntime = !0;
   throw "SimulateInfiniteLoop";
  },
  _21a3656d: function() {
   return 0
  },
  _6de9375b: Ra,
  _7360e130: M,
  _6e0598fc: function(a, b, c) {
   w.p[a] = {
    Qb: a,
    sa: a,
    type: b,
    ua: c,
    R: 0
   };
   w.X = a;
   "uncaught_exception" in V ? V.o++ : V.o = 1;
   throw a + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
  },
  _1091f94b: function() {
   c.abort()
  },
  _25c111e2: function(a) {
   var b = Date.now() / 1E3 | 0;
   a && (p[a >> 2] = b);
   return b
  },
  _5f87d46b: function() {},
  _11eed497: cc,
  _3c6f96d1: function(a, b, c, e, f, h, l, k) {
   return J[a](b, c, e, f, h, l, k)
  },
  _285396d3: function(a,
   b, c, e, f, h, l) {
   return J[a](b, c, e, f, h, l)
  },
  _4716751f: function(a, b, c, e, f, h) {
   return J[a](b, c, e, f, h)
  },
  _5a69b39c: function(a, b, c, e, f) {
   return J[a](b, c, e, f)
  },
  _4b7111f8: function(a, b, c, e) {
   return J[a](b, c, e)
  },
  _23d5967d: function(a, b, c) {
   return J[a](b, c)
  },
  _11188f6c: function(a, b) {
   return J[a](b)
  },
  _5859e891: function(a) {
   return J[a]()
  },
  STACKTOP: D,
  STACK_MAX: ya,
  tempDoublePtr: hb,
  ABORT: A,
  cttz_i8: kc
 };
 var f = (function(global, env, buffer) {
  "use asm";
  var a = new global.Int8Array(buffer);
  var b = new global.Int16Array(buffer);
  var c = new global.Int32Array(buffer);
  var d = new global.Uint8Array(buffer);
  var e = new global.Uint16Array(buffer);
  var f = new global.Uint32Array(buffer);
  var g = new global.Float32Array(buffer);
  var h = new global.Float64Array(buffer);
  var i = env.STACKTOP | 0;
  var j = env.STACK_MAX | 0;
  var k = env.tempDoublePtr | 0;
  var l = env.ABORT | 0;
  var m = env.cttz_i8 | 0;
  var n = 0;
  var o = 0;
  var p = 0;
  var q = 0;
  var r = global.NaN,
   s = global.Infinity;
  var t = 0,
   u = 0,
   v = 0,
   w = 0,
   x = 0.0,
   y = 0,
   z = 0,
   A = 0,
   B = 0.0;
  var C = 0;
  var D = 0;
  var E = 0;
  var F = 0;
  var G = 0;
  var H = 0;
  var I = 0;
  var J = 0;
  var K = 0;
  var L = 0;
  var M = global.Math.floor;
  var N = global.Math.abs;
  var O = global.Math.sqrt;
  var P = global.Math.pow;
  var Q = global.Math.cos;
  var R = global.Math.sin;
  var S = global.Math.tan;
  var T = global.Math.acos;
  var U = global.Math.asin;
  var V = global.Math.atan;
  var W = global.Math.atan2;
  var X = global.Math.exp;
  var Y = global.Math.log;
  var Z = global.Math.ceil;
  var _ = global.Math.imul;
  var $ = global.Math.min;
  var aa = global.Math.clz32;
  var ba = env.abort;
  var ca = env.assert;
  var da = env.invoke_iiiiiiii;
  var ea = env.invoke_iiii;
  var fa = env.invoke_viiiii;
  var ga = env.invoke_iiiiiid;
  var ha = env.invoke_vi;
  var ia = env.invoke_vii;
  var ja = env.invoke_iiiiiii;
  var ka = env.invoke_iiiiid;
  var la = env.invoke_ii;
  var ma = env.invoke_viii;
  var na = env.invoke_v;
  var oa = env.invoke_iiiiiiiii;
  var pa = env.invoke_iiiii;
  var qa = env.invoke_viiiiii;
  var ra = env.invoke_iii;
  var sa = env.invoke_iiiiii;
  var ta = env.invoke_viiii;
  var ua = env._5a38fcec;
  var va = env._51c14244;
  var wa = env._1d84487e;
  var xa = env._6208c818;
  var ya = env._74bc5b26;
  var za = env._92af845;
  var Aa = env._53af8949;
  var Ba = env._414ff42f;
  var Ca = env._19df4f55;
  var Da = env._2387a73c;
  var Ea = env._493ebe56;
  var Fa = env._1b94723e;
  var Ga = env._4dd610a3;
  var Ha = env._71b40523;
  var Ia = env._4a4f7367;
  var Ja = env._7e12abc0;
  var Ka = env._263003f3;
  var La = env._8913ce8;
  var Ma = env._73eeb032;
  var Na = env._40da5778;
  var Oa = env._125ee6ee;
  var Pa = env._756e01d4;
  var Qa = env._1f58dc45;
  var Ra = env._6be03341;
  var Sa = env._7bf6f910;
  var Ta = env._6b556217;
  var Ua = env._17381bf;
  var Va = env._2da00ace;
  var Wa = env._1f155cb2;
  var Xa = env._2f23cb3;
  var Ya = env._28ad37be;
  var Za = env._21a3656d;
  var _a = env._6de9375b;
  var $a = env._7360e130;
  var ab = env._6e0598fc;
  var bb = env._1091f94b;
  var cb = env._25c111e2;
  var db = env._5f87d46b;
  var eb = env._11eed497;
  var fb = env._3c6f96d1;
  var gb = env._285396d3;
  var hb = env._4716751f;
  var ib = env._5a69b39c;
  var jb = env._4b7111f8;
  var kb = env._23d5967d;
  var lb = env._11188f6c;
  var mb = env._5859e891;
  var nb = 0.0;

  function ql(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0;
   y = i;
   i = i + 320 | 0;
   v = y;
   r = y + 208 | 0;
   x = y + 32 | 0;
   s = y + 28 | 0;
   w = y + 16 | 0;
   u = y + 12 | 0;
   o = y + 48 | 0;
   q = y + 8 | 0;
   p = y + 4 | 0;
   c[x >> 2] = 0;
   c[x + 4 >> 2] = 0;
   c[x + 8 >> 2] = 0;
   t = Xj(f) | 0;
   c[s >> 2] = t;
   s = Qo(s, 9328) | 0;
   Ab[c[(c[s >> 2] | 0) + 48 >> 2] & 7](s, 22094, 22120, r) | 0;
   gs(t) | 0;
   c[w >> 2] = 0;
   c[w + 4 >> 2] = 0;
   c[w + 8 >> 2] = 0;
   if (!(a[w >> 0] & 1)) b = 10;
   else b = (c[w >> 2] & -2) + -1 | 0;
   yj(w, b, 0);
   s = w + 8 | 0;
   t = w + 1 | 0;
   b = (a[w >> 0] & 1) == 0 ? t : c[s >> 2] | 0;
   c[u >> 2] = b;
   c[q >> 2] = o;
   c[p >> 2] = 0;
   n = w + 4 | 0;
   j = c[d >> 2] | 0;
   a: while (1) {
    if (j) {
     f = c[j + 12 >> 2] | 0;
     if ((f | 0) == (c[j + 16 >> 2] | 0)) f = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
     else f = c[f >> 2] | 0;
     if ((f | 0) == -1) {
      c[d >> 2] = 0;
      f = 0;
      l = 1
     } else {
      f = j;
      l = 0
     }
    } else {
     f = 0;
     l = 1
    }
    j = c[e >> 2] | 0;
    do
     if (j) {
      k = c[j + 12 >> 2] | 0;
      if ((k | 0) == (c[j + 16 >> 2] | 0)) k = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
      else k = c[k >> 2] | 0;
      if ((k | 0) != -1)
       if (l) break;
       else break a;
      else {
       c[e >> 2] = 0;
       z = 16;
       break
      }
     } else z = 16;
    while (0);
    if ((z | 0) == 16) {
     z = 0;
     if (l) {
      j = 0;
      break
     } else j = 0
    }
    k = a[w >> 0] | 0;
    k = (k & 1) == 0 ? (k & 255) >>> 1 : c[n >> 2] | 0;
    if ((c[u >> 2] | 0) == (b + k | 0)) {
     yj(w, k << 1, 0);
     if (!(a[w >> 0] & 1)) b = 10;
     else b = (c[w >> 2] & -2) + -1 | 0;
     yj(w, b, 0);
     b = (a[w >> 0] & 1) == 0 ? t : c[s >> 2] | 0;
     c[u >> 2] = b + k
    }
    l = f + 12 | 0;
    k = c[l >> 2] | 0;
    m = f + 16 | 0;
    if ((k | 0) == (c[m >> 2] | 0)) k = wb[c[(c[f >> 2] | 0) + 36 >> 2] & 127](f) | 0;
    else k = c[k >> 2] | 0;
    if (rl(k, 16, b, u, p, 0, x, o, q, r) | 0) break;
    j = c[l >> 2] | 0;
    if ((j | 0) == (c[m >> 2] | 0)) {
     wb[c[(c[f >> 2] | 0) + 40 >> 2] & 127](f) | 0;
     j = f;
     continue
    } else {
     c[l >> 2] = j + 4;
     j = f;
     continue
    }
   }
   yj(w, (c[u >> 2] | 0) - b | 0, 0);
   t = (a[w >> 0] & 1) == 0 ? t : c[s >> 2] | 0;
   u = dl() | 0;
   c[v >> 2] = h;
   if ((Mq(t, u, 23478, v) | 0) != 1) c[g >> 2] = 4;
   if (f) {
    b = c[f + 12 >> 2] | 0;
    if ((b | 0) == (c[f + 16 >> 2] | 0)) b = wb[c[(c[f >> 2] | 0) + 36 >> 2] & 127](f) | 0;
    else b = c[b >> 2] | 0;
    if ((b | 0) == -1) {
     c[d >> 2] = 0;
     f = 1
    } else f = 0
   } else f = 1;
   do
    if (j) {
     b = c[j + 12 >> 2] | 0;
     if ((b | 0) == (c[j + 16 >> 2] | 0)) b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
     else b = c[b >> 2] | 0;
     if ((b | 0) != -1)
      if (f) break;
      else {
       z = 45;
       break
      } else {
      c[e >> 2] = 0;
      z = 43;
      break
     }
    } else z = 43;
   while (0);
   if ((z | 0) == 43 ? f : 0) z = 45;
   if ((z | 0) == 45) c[g >> 2] = c[g >> 2] | 2;
   z = c[d >> 2] | 0;
   uj(w);
   uj(x);
   i = y;
   return z | 0
  }

  function rl(b, d, e, f, g, h, i, j, k, l) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   i = i | 0;
   j = j | 0;
   k = k | 0;
   l = l | 0;
   var m = 0,
    n = 0,
    o = 0,
    p = 0;
   o = c[f >> 2] | 0;
   p = (o | 0) == (e | 0);
   do
    if (p) {
     m = (c[l + 96 >> 2] | 0) == (b | 0);
     if (!m ? (c[l + 100 >> 2] | 0) != (b | 0) : 0) {
      n = 5;
      break
     }
     c[f >> 2] = e + 1;
     a[e >> 0] = m ? 43 : 45;
     c[g >> 2] = 0;
     m = 0
    } else n = 5;
   while (0);
   a: do
    if ((n | 0) == 5) {
     n = a[i >> 0] | 0;
     if ((b | 0) == (h | 0) ? (((n & 1) == 0 ? (n & 255) >>> 1 : c[i + 4 >> 2] | 0) | 0) != 0 : 0) {
      m = c[k >> 2] | 0;
      if ((m - j | 0) >= 160) {
       m = 0;
       break
      }
      f = c[g >> 2] | 0;
      c[k >> 2] = m + 4;
      c[m >> 2] = f;
      c[g >> 2] = 0;
      m = 0;
      break
     }
     h = l + 104 | 0;
     m = l;
     while (1) {
      if ((c[m >> 2] | 0) == (b | 0)) break;
      m = m + 4 | 0;
      if ((m | 0) == (h | 0)) {
       m = h;
       break
      }
     }
     m = m - l | 0;
     h = m >> 2;
     if ((m | 0) > 92) m = -1;
     else {
      switch (d | 0) {
       case 10:
       case 8:
        {
         if ((h | 0) >= (d | 0)) {
          m = -1;
          break a
         }
         break
        }
       case 16:
        {
         if ((m | 0) >= 88) {
          if (p) {
           m = -1;
           break a
          }
          if ((o - e | 0) >= 3) {
           m = -1;
           break a
          }
          if ((a[o + -1 >> 0] | 0) != 48) {
           m = -1;
           break a
          }
          c[g >> 2] = 0;
          m = a[22094 + h >> 0] | 0;
          c[f >> 2] = o + 1;
          a[o >> 0] = m;
          m = 0;
          break a
         }
         break
        }
       default:
        {}
      }
      m = a[22094 + h >> 0] | 0;
      c[f >> 2] = o + 1;
      a[o >> 0] = m;
      c[g >> 2] = (c[g >> 2] | 0) + 1;
      m = 0
     }
    }
   while (0);
   return m | 0
  }

  function sl(b, d, e, f) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    j = 0;
   g = i;
   i = i + 16 | 0;
   h = g;
   d = Xj(d) | 0;
   c[h >> 2] = d;
   j = Qo(h, 9336) | 0;
   Ab[c[(c[j >> 2] | 0) + 32 >> 2] & 7](j, 22094, 22120, e) | 0;
   e = Qo(h, 9476) | 0;
   a[f >> 0] = wb[c[(c[e >> 2] | 0) + 16 >> 2] & 127](e) | 0;
   tb[c[(c[e >> 2] | 0) + 20 >> 2] & 127](b, e);
   gs(d) | 0;
   i = g;
   return
  }

  function tl(b, d, e, f, g) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0;
   h = i;
   i = i + 16 | 0;
   j = h;
   d = Xj(d) | 0;
   c[j >> 2] = d;
   k = Qo(j, 9336) | 0;
   Ab[c[(c[k >> 2] | 0) + 32 >> 2] & 7](k, 22094, 22126, e) | 0;
   e = Qo(j, 9476) | 0;
   a[f >> 0] = wb[c[(c[e >> 2] | 0) + 12 >> 2] & 127](e) | 0;
   a[g >> 0] = wb[c[(c[e >> 2] | 0) + 16 >> 2] & 127](e) | 0;
   tb[c[(c[e >> 2] | 0) + 20 >> 2] & 127](b, e);
   gs(d) | 0;
   i = h;
   return
  }

  function ul(b, e, f, g, h, i, j, k, l, m, n, o) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   i = i | 0;
   j = j | 0;
   k = k | 0;
   l = l | 0;
   m = m | 0;
   n = n | 0;
   o = o | 0;
   var p = 0,
    q = 0;
   a: do
    if (b << 24 >> 24 == i << 24 >> 24)
     if (a[e >> 0] | 0) {
      a[e >> 0] = 0;
      f = c[h >> 2] | 0;
      c[h >> 2] = f + 1;
      a[f >> 0] = 46;
      h = a[k >> 0] | 0;
      if ((((h & 1) == 0 ? (h & 255) >>> 1 : c[k + 4 >> 2] | 0) | 0) != 0 ? (p = c[m >> 2] | 0, (p - l | 0) < 160) : 0) {
       h = c[n >> 2] | 0;
       c[m >> 2] = p + 4;
       c[p >> 2] = h;
       p = 0
      } else p = 0
     } else p = -1;
   else {
    if (b << 24 >> 24 == j << 24 >> 24 ? (j = a[k >> 0] | 0, (((j & 1) == 0 ? (j & 255) >>> 1 : c[k + 4 >> 2] | 0) | 0) != 0) : 0) {
     if (!(a[e >> 0] | 0)) {
      p = -1;
      break
     }
     p = c[m >> 2] | 0;
     if ((p - l | 0) >= 160) {
      p = 0;
      break
     }
     h = c[n >> 2] | 0;
     c[m >> 2] = p + 4;
     c[p >> 2] = h;
     c[n >> 2] = 0;
     p = 0;
     break
    }
    i = o + 32 | 0;
    p = o;
    while (1) {
     if ((a[p >> 0] | 0) == b << 24 >> 24) break;
     p = p + 1 | 0;
     if ((p | 0) == (i | 0)) {
      p = i;
      break
     }
    }
    i = p - o | 0;
    if ((i | 0) > 31) p = -1;
    else {
     j = a[22094 + i >> 0] | 0;
     switch (i | 0) {
      case 24:
      case 25:
       {
        p = c[h >> 2] | 0;
        if ((p | 0) != (g | 0) ? (d[p + -1 >> 0] & 95 | 0) != (d[f >> 0] & 127 | 0) : 0) {
         p = -1;
         break a
        }
        c[h >> 2] = p + 1;a[p >> 0] = j;p = 0;
        break a
       }
      case 23:
      case 22:
       {
        a[f >> 0] = 80;p = c[h >> 2] | 0;c[h >> 2] = p + 1;a[p >> 0] = j;p = 0;
        break a
       }
      default:
       {
        p = j & 95;
        if ((((p | 0) == (a[f >> 0] | 0) ? (a[f >> 0] = p | 128, (a[e >> 0] | 0) != 0) : 0) ? (a[e >> 0] = 0, f = a[k >> 0] | 0, (((f & 1) == 0 ? (f & 255) >>> 1 : c[k + 4 >> 2] | 0) | 0) != 0) : 0) ? (q = c[m >> 2] | 0, (q - l | 0) < 160) : 0) {
         f = c[n >> 2] | 0;
         c[m >> 2] = q + 4;
         c[q >> 2] = f
        }
        m = c[h >> 2] | 0;c[h >> 2] = m + 1;a[m >> 0] = j;
        if ((i | 0) > 21) {
         p = 0;
         break a
        }
        c[n >> 2] = (c[n >> 2] | 0) + 1;p = 0;
        break a
       }
     }
    }
   }
   while (0);
   return p | 0
  }

  function vl(a, b, d, e) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0;
   f = i;
   i = i + 16 | 0;
   g = f;
   b = Xj(b) | 0;
   c[g >> 2] = b;
   h = Qo(g, 9328) | 0;
   Ab[c[(c[h >> 2] | 0) + 48 >> 2] & 7](h, 22094, 22120, d) | 0;
   d = Qo(g, 9484) | 0;
   c[e >> 2] = wb[c[(c[d >> 2] | 0) + 16 >> 2] & 127](d) | 0;
   tb[c[(c[d >> 2] | 0) + 20 >> 2] & 127](a, d);
   gs(b) | 0;
   i = f;
   return
  }

  function wl(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    j = 0;
   g = i;
   i = i + 16 | 0;
   h = g;
   b = Xj(b) | 0;
   c[h >> 2] = b;
   j = Qo(h, 9328) | 0;
   Ab[c[(c[j >> 2] | 0) + 48 >> 2] & 7](j, 22094, 22126, d) | 0;
   d = Qo(h, 9484) | 0;
   c[e >> 2] = wb[c[(c[d >> 2] | 0) + 12 >> 2] & 127](d) | 0;
   c[f >> 2] = wb[c[(c[d >> 2] | 0) + 16 >> 2] & 127](d) | 0;
   tb[c[(c[d >> 2] | 0) + 20 >> 2] & 127](a, d);
   gs(b) | 0;
   i = g;
   return
  }

  function xl(b, e, f, g, h, i, j, k, l, m, n, o) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   i = i | 0;
   j = j | 0;
   k = k | 0;
   l = l | 0;
   m = m | 0;
   n = n | 0;
   o = o | 0;
   var p = 0,
    q = 0;
   a: do
    if ((b | 0) == (i | 0))
     if (a[e >> 0] | 0) {
      a[e >> 0] = 0;
      f = c[h >> 2] | 0;
      c[h >> 2] = f + 1;
      a[f >> 0] = 46;
      h = a[k >> 0] | 0;
      if ((((h & 1) == 0 ? (h & 255) >>> 1 : c[k + 4 >> 2] | 0) | 0) != 0 ? (p = c[m >> 2] | 0, (p - l | 0) < 160) : 0) {
       h = c[n >> 2] | 0;
       c[m >> 2] = p + 4;
       c[p >> 2] = h;
       p = 0
      } else p = 0
     } else p = -1;
   else {
    if ((b | 0) == (j | 0) ? (j = a[k >> 0] | 0, (((j & 1) == 0 ? (j & 255) >>> 1 : c[k + 4 >> 2] | 0) | 0) != 0) : 0) {
     if (!(a[e >> 0] | 0)) {
      p = -1;
      break
     }
     p = c[m >> 2] | 0;
     if ((p - l | 0) >= 160) {
      p = 0;
      break
     }
     h = c[n >> 2] | 0;
     c[m >> 2] = p + 4;
     c[p >> 2] = h;
     c[n >> 2] = 0;
     p = 0;
     break
    }
    i = o + 128 | 0;
    p = o;
    while (1) {
     if ((c[p >> 2] | 0) == (b | 0)) break;
     p = p + 4 | 0;
     if ((p | 0) == (i | 0)) {
      p = i;
      break
     }
    }
    i = p - o | 0;
    p = i >> 2;
    if ((i | 0) <= 124) {
     j = a[22094 + p >> 0] | 0;
     switch (p | 0) {
      case 24:
      case 25:
       {
        p = c[h >> 2] | 0;
        if ((p | 0) != (g | 0) ? (d[p + -1 >> 0] & 95 | 0) != (d[f >> 0] & 127 | 0) : 0) {
         p = -1;
         break a
        }
        c[h >> 2] = p + 1;a[p >> 0] = j;p = 0;
        break a
       }
      case 23:
      case 22:
       {
        a[f >> 0] = 80;
        break
       }
      default:
       {
        p = j & 95;
        if ((((p | 0) == (a[f >> 0] | 0) ? (a[f >> 0] = p | 128, (a[e >> 0] | 0) != 0) : 0) ? (a[e >> 0] = 0, f = a[k >> 0] | 0, (((f & 1) == 0 ? (f & 255) >>> 1 : c[k + 4 >> 2] | 0) | 0) != 0) : 0) ? (q = c[m >> 2] | 0, (q - l | 0) < 160) : 0) {
         f = c[n >> 2] | 0;
         c[m >> 2] = q + 4;
         c[q >> 2] = f
        }
       }
     }
     m = c[h >> 2] | 0;
     c[h >> 2] = m + 1;
     a[m >> 0] = j;
     if ((i | 0) > 84) p = 0;
     else {
      c[n >> 2] = (c[n >> 2] | 0) + 1;
      p = 0
     }
    } else p = -1
   }
   while (0);
   return p | 0
  }

  function yl(a) {
   a = a | 0;
   return
  }

  function zl(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Al(b, d, e, f, g) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0;
   n = i;
   i = i + 32 | 0;
   h = n + 20 | 0;
   j = n + 16 | 0;
   k = n + 12 | 0;
   m = n;
   if (!(c[e + 4 >> 2] & 1)) {
    m = c[(c[b >> 2] | 0) + 24 >> 2] | 0;
    c[j >> 2] = c[d >> 2];
    c[h >> 2] = c[j >> 2];
    h = Db[m & 31](b, h, e, f, g & 1) | 0
   } else {
    j = Xj(e) | 0;
    c[k >> 2] = j;
    h = Qo(k, 9476) | 0;
    gs(j) | 0;
    j = c[h >> 2] | 0;
    if (g) tb[c[j + 24 >> 2] & 127](m, h);
    else tb[c[j + 28 >> 2] & 127](m, h);
    f = a[m >> 0] | 0;
    l = (f & 1) == 0;
    h = m + 1 | 0;
    g = m + 8 | 0;
    b = l ? h : m + 1 | 0;
    h = l ? h : c[m + 8 >> 2] | 0;
    l = m + 4 | 0;
    e = (f & 1) == 0;
    if ((h | 0) != ((e ? b : c[g >> 2] | 0) + (e ? (f & 255) >>> 1 : c[l >> 2] | 0) | 0))
     do {
      j = a[h >> 0] | 0;
      k = c[d >> 2] | 0;
      do
       if (k) {
        e = k + 24 | 0;
        f = c[e >> 2] | 0;
        if ((f | 0) != (c[k + 28 >> 2] | 0)) {
         c[e >> 2] = f + 1;
         a[f >> 0] = j;
         break
        }
        if ((Cb[c[(c[k >> 2] | 0) + 52 >> 2] & 15](k, j & 255) | 0) == -1) c[d >> 2] = 0
       }
      while (0);
      h = h + 1 | 0;
      f = a[m >> 0] | 0;
      e = (f & 1) == 0
     } while ((h | 0) != ((e ? b : c[g >> 2] | 0) + (e ? (f & 255) >>> 1 : c[l >> 2] | 0) | 0));
    h = c[d >> 2] | 0;
    uj(m)
   }
   i = n;
   return h | 0
  }

  function Bl(b, d, e, f, g) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0;
   h = i;
   i = i + 64 | 0;
   k = h;
   o = h + 56 | 0;
   q = h + 44 | 0;
   j = h + 20 | 0;
   m = h + 16 | 0;
   b = h + 12 | 0;
   n = h + 8 | 0;
   l = h + 4 | 0;
   a[o >> 0] = a[23483] | 0;
   a[o + 1 >> 0] = a[23484] | 0;
   a[o + 2 >> 0] = a[23485] | 0;
   a[o + 3 >> 0] = a[23486] | 0;
   a[o + 4 >> 0] = a[23487] | 0;
   a[o + 5 >> 0] = a[23488] | 0;
   Cl(o + 1 | 0, 23489, 1, c[e + 4 >> 2] | 0);
   p = dl() | 0;
   c[k >> 2] = g;
   o = q + (Xq(q, 12, p, o, k) | 0) | 0;
   p = Dl(q, o, e) | 0;
   g = Xj(e) | 0;
   c[n >> 2] = g;
   El(q, p, o, j, m, b, n);
   gs(g) | 0;
   c[l >> 2] = c[d >> 2];
   g = c[m >> 2] | 0;
   b = c[b >> 2] | 0;
   c[k >> 2] = c[l >> 2];
   b = ng(k, j, g, b, e, f) | 0;
   i = h;
   return b | 0
  }

  function Cl(b, c, d, e) {
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0;
   if (e & 2048) {
    a[b >> 0] = 43;
    b = b + 1 | 0
   }
   if (e & 512) {
    a[b >> 0] = 35;
    b = b + 1 | 0
   }
   f = a[c >> 0] | 0;
   if (f << 24 >> 24) {
    g = c;
    while (1) {
     g = g + 1 | 0;
     c = b + 1 | 0;
     a[b >> 0] = f;
     f = a[g >> 0] | 0;
     if (!(f << 24 >> 24)) {
      b = c;
      break
     } else b = c
    }
   }
   a: do switch (e & 74 | 0) {
     case 64:
      {
       a[b >> 0] = 111;
       break
      }
     case 8:
      if (!(e & 16384)) {
       a[b >> 0] = 120;
       break a
      } else {
       a[b >> 0] = 88;
       break a
      }
     default:
      if (d) {
       a[b >> 0] = 100;
       break a
      } else {
       a[b >> 0] = 117;
       break a
      }
    }
    while (0);
    return
  }

  function Dl(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0;
   a: do switch (c[e + 4 >> 2] & 176 | 0) {
     case 16:
      {
       e = a[b >> 0] | 0;
       switch (e << 24 >> 24) {
        case 43:
        case 45:
         {
          d = b + 1 | 0;
          break a
         }
        default:
         {}
       }
       if ((d - b | 0) > 1 & e << 24 >> 24 == 48) {
        switch (a[b + 1 >> 0] | 0) {
         case 88:
         case 120:
          break;
         default:
          {
           f = 7;
           break a
          }
        }
        d = b + 2 | 0
       } else f = 7;
       break
      }
     case 32:
      break;
     default:
      f = 7
    }
    while (0);
    if ((f | 0) == 7) d = b;
   return d | 0
  }

  function El(b, d, e, f, g, h, j) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0;
   t = i;
   i = i + 16 | 0;
   s = t;
   r = Qo(j, 9336) | 0;
   m = Qo(j, 9476) | 0;
   tb[c[(c[m >> 2] | 0) + 20 >> 2] & 127](s, m);
   p = a[s >> 0] | 0;
   q = s + 4 | 0;
   if (((p & 1) == 0 ? (p & 255) >>> 1 : c[q >> 2] | 0) | 0) {
    c[h >> 2] = f;
    j = a[b >> 0] | 0;
    switch (j << 24 >> 24) {
     case 43:
     case 45:
      {
       p = Cb[c[(c[r >> 2] | 0) + 28 >> 2] & 15](r, j) | 0;k = c[h >> 2] | 0;c[h >> 2] = k + 1;a[k >> 0] = p;k = b + 1 | 0;
       break
      }
     default:
      k = b
    }
    a: do
     if ((e - k | 0) > 1 ? (a[k >> 0] | 0) == 48 : 0) {
      j = k + 1 | 0;
      switch (a[j >> 0] | 0) {
       case 88:
       case 120:
        break;
       default:
        break a
      }
      p = Cb[c[(c[r >> 2] | 0) + 28 >> 2] & 15](r, 48) | 0;
      o = c[h >> 2] | 0;
      c[h >> 2] = o + 1;
      a[o >> 0] = p;
      o = Cb[c[(c[r >> 2] | 0) + 28 >> 2] & 15](r, a[j >> 0] | 0) | 0;
      p = c[h >> 2] | 0;
      c[h >> 2] = p + 1;
      a[p >> 0] = o;
      k = k + 2 | 0
     }
    while (0);
    if ((k | 0) != (e | 0) ? (n = e + -1 | 0, k >>> 0 < n >>> 0) : 0) {
     l = k;
     j = n;
     do {
      p = a[l >> 0] | 0;
      a[l >> 0] = a[j >> 0] | 0;
      a[j >> 0] = p;
      l = l + 1 | 0;
      j = j + -1 | 0
     } while (l >>> 0 < j >>> 0)
    }
    m = wb[c[(c[m >> 2] | 0) + 16 >> 2] & 127](m) | 0;
    n = s + 8 | 0;
    o = s + 1 | 0;
    if (k >>> 0 < e >>> 0) {
     j = 0;
     l = 0;
     p = k;
     while (1) {
      u = a[((a[s >> 0] & 1) == 0 ? o : c[n >> 2] | 0) + l >> 0] | 0;
      if (u << 24 >> 24 != 0 & (j | 0) == (u << 24 >> 24 | 0)) {
       u = c[h >> 2] | 0;
       c[h >> 2] = u + 1;
       a[u >> 0] = m;
       u = a[s >> 0] | 0;
       j = 0;
       l = (l >>> 0 < (((u & 1) == 0 ? (u & 255) >>> 1 : c[q >> 2] | 0) + -1 | 0) >>> 0 & 1) + l | 0
      }
      v = Cb[c[(c[r >> 2] | 0) + 28 >> 2] & 15](r, a[p >> 0] | 0) | 0;
      u = c[h >> 2] | 0;
      c[h >> 2] = u + 1;
      a[u >> 0] = v;
      p = p + 1 | 0;
      if (p >>> 0 >= e >>> 0) break;
      else j = j + 1 | 0
     }
    }
    j = f + (k - b) | 0;
    k = c[h >> 2] | 0;
    if ((j | 0) != (k | 0)) {
     k = k + -1 | 0;
     if (j >>> 0 < k >>> 0)
      do {
       v = a[j >> 0] | 0;
       a[j >> 0] = a[k >> 0] | 0;
       a[k >> 0] = v;
       j = j + 1 | 0;
       k = k + -1 | 0
      } while (j >>> 0 < k >>> 0);
     j = c[h >> 2] | 0
    }
   } else {
    Ab[c[(c[r >> 2] | 0) + 32 >> 2] & 7](r, b, e, f) | 0;
    j = f + (e - b) | 0;
    c[h >> 2] = j
   }
   c[g >> 2] = (d | 0) == (e | 0) ? j : f + (d - b) | 0;
   uj(s);
   i = t;
   return
  }

  function Fl(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0;
   h = i;
   i = i + 96 | 0;
   k = h + 8 | 0;
   o = h;
   p = h + 74 | 0;
   j = h + 32 | 0;
   m = h + 28 | 0;
   a = h + 24 | 0;
   n = h + 20 | 0;
   l = h + 16 | 0;
   q = o;
   c[q >> 2] = 37;
   c[q + 4 >> 2] = 0;
   Cl(o + 1 | 0, 23491, 1, c[d + 4 >> 2] | 0);
   q = dl() | 0;
   r = k;
   c[r >> 2] = f;
   c[r + 4 >> 2] = g;
   f = p + (Xq(p, 22, q, o, k) | 0) | 0;
   o = Dl(p, f, d) | 0;
   g = Xj(d) | 0;
   c[n >> 2] = g;
   El(p, o, f, j, m, a, n);
   gs(g) | 0;
   c[l >> 2] = c[b >> 2];
   b = c[m >> 2] | 0;
   a = c[a >> 2] | 0;
   c[k >> 2] = c[l >> 2];
   a = ng(k, j, b, a, d, e) | 0;
   i = h;
   return a | 0
  }

  function Gl(b, d, e, f, g) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0;
   h = i;
   i = i + 64 | 0;
   k = h;
   o = h + 56 | 0;
   q = h + 44 | 0;
   j = h + 20 | 0;
   m = h + 16 | 0;
   b = h + 12 | 0;
   n = h + 8 | 0;
   l = h + 4 | 0;
   a[o >> 0] = a[23483] | 0;
   a[o + 1 >> 0] = a[23484] | 0;
   a[o + 2 >> 0] = a[23485] | 0;
   a[o + 3 >> 0] = a[23486] | 0;
   a[o + 4 >> 0] = a[23487] | 0;
   a[o + 5 >> 0] = a[23488] | 0;
   Cl(o + 1 | 0, 23489, 0, c[e + 4 >> 2] | 0);
   p = dl() | 0;
   c[k >> 2] = g;
   o = q + (Xq(q, 12, p, o, k) | 0) | 0;
   p = Dl(q, o, e) | 0;
   g = Xj(e) | 0;
   c[n >> 2] = g;
   El(q, p, o, j, m, b, n);
   gs(g) | 0;
   c[l >> 2] = c[d >> 2];
   g = c[m >> 2] | 0;
   b = c[b >> 2] | 0;
   c[k >> 2] = c[l >> 2];
   b = ng(k, j, g, b, e, f) | 0;
   i = h;
   return b | 0
  }

  function Hl(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0;
   h = i;
   i = i + 112 | 0;
   k = h + 8 | 0;
   o = h;
   p = h + 75 | 0;
   j = h + 32 | 0;
   m = h + 28 | 0;
   a = h + 24 | 0;
   n = h + 20 | 0;
   l = h + 16 | 0;
   q = o;
   c[q >> 2] = 37;
   c[q + 4 >> 2] = 0;
   Cl(o + 1 | 0, 23491, 0, c[d + 4 >> 2] | 0);
   q = dl() | 0;
   r = k;
   c[r >> 2] = f;
   c[r + 4 >> 2] = g;
   f = p + (Xq(p, 23, q, o, k) | 0) | 0;
   o = Dl(p, f, d) | 0;
   g = Xj(d) | 0;
   c[n >> 2] = g;
   El(p, o, f, j, m, a, n);
   gs(g) | 0;
   c[l >> 2] = c[b >> 2];
   b = c[m >> 2] | 0;
   a = c[a >> 2] | 0;
   c[k >> 2] = c[l >> 2];
   a = ng(k, j, b, a, d, e) | 0;
   i = h;
   return a | 0
  }

  function Il(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = +f;
   var g = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0;
   v = i;
   i = i + 160 | 0;
   p = v + 68 | 0;
   l = v + 32 | 0;
   j = v + 24 | 0;
   g = v + 8 | 0;
   k = v;
   n = v + 72 | 0;
   m = v + 64 | 0;
   o = v + 102 | 0;
   u = v + 60 | 0;
   s = v + 56 | 0;
   q = v + 52 | 0;
   r = v + 48 | 0;
   B = k;
   c[B >> 2] = 37;
   c[B + 4 >> 2] = 0;
   B = Jl(k + 1 | 0, 23494, c[d + 4 >> 2] | 0) | 0;
   c[m >> 2] = n;
   a = dl() | 0;
   if (B) {
    c[g >> 2] = c[d + 8 >> 2];
    h[g + 8 >> 3] = f;
    a = Xq(n, 30, a, k, g) | 0
   } else {
    h[j >> 3] = f;
    a = Xq(n, 30, a, k, j) | 0
   }
   if ((a | 0) > 29) {
    g = dl() | 0;
    c[l >> 2] = c[d + 8 >> 2];
    h[l + 8 >> 3] = f;
    g = Yq(m, g, k, l) | 0;
    a = c[m >> 2] | 0;
    if (!a) Rh();
    else {
     w = a;
     z = a;
     t = g
    }
   } else {
    w = c[m >> 2] | 0;
    z = 0;
    t = a
   }
   g = w + t | 0;
   j = Dl(w, g, d) | 0;
   if ((w | 0) != (n | 0)) {
    a = jj(t << 1) | 0;
    if (!a) Rh();
    else {
     x = w;
     y = a;
     A = a
    }
   } else {
    x = n;
    y = 0;
    A = o
   }
   B = Xj(d) | 0;
   c[q >> 2] = B;
   Kl(x, j, g, A, u, s, q);
   gs(B) | 0;
   c[r >> 2] = c[b >> 2];
   b = c[u >> 2] | 0;
   B = c[s >> 2] | 0;
   c[p >> 2] = c[r >> 2];
   B = ng(p, A, b, B, d, e) | 0;
   kj(y);
   kj(z);
   i = v;
   return B | 0
  }

  function Jl(b, c, d) {
   b = b | 0;
   c = c | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0;
   if (d & 2048) {
    a[b >> 0] = 43;
    b = b + 1 | 0
   }
   if (d & 1024) {
    a[b >> 0] = 35;
    b = b + 1 | 0
   }
   h = d & 260;
   f = d >>> 14;
   i = (h | 0) == 260;
   if (i) g = 0;
   else {
    a[b >> 0] = 46;
    a[b + 1 >> 0] = 42;
    b = b + 2 | 0;
    g = 1
   }
   d = a[c >> 0] | 0;
   if (d << 24 >> 24) {
    e = b;
    while (1) {
     c = c + 1 | 0;
     b = e + 1 | 0;
     a[e >> 0] = d;
     d = a[c >> 0] | 0;
     if (!(d << 24 >> 24)) break;
     else e = b
    }
   }
   a: do switch (h | 0) {
     case 4:
      if (!(f & 1)) {
       a[b >> 0] = 102;
       break a
      } else {
       a[b >> 0] = 70;
       break a
      }
     case 256:
      if (!(f & 1)) {
       a[b >> 0] = 101;
       break a
      } else {
       a[b >> 0] = 69;
       break a
      }
     default:
      {
       d = (f & 1 | 0) != 0;
       if (i)
        if (d) {
         a[b >> 0] = 65;
         break a
        } else {
         a[b >> 0] = 97;
         break a
        } else if (d) {
        a[b >> 0] = 71;
        break a
       } else {
        a[b >> 0] = 103;
        break a
       }
      }
    }
    while (0);
    return g | 0
  }

  function Kl(b, d, e, f, g, h, j) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0;
   x = i;
   i = i + 16 | 0;
   w = x;
   v = Qo(j, 9336) | 0;
   t = Qo(j, 9476) | 0;
   tb[c[(c[t >> 2] | 0) + 20 >> 2] & 127](w, t);
   c[h >> 2] = f;
   j = a[b >> 0] | 0;
   switch (j << 24 >> 24) {
    case 43:
    case 45:
     {
      u = Cb[c[(c[v >> 2] | 0) + 28 >> 2] & 15](v, j) | 0;m = c[h >> 2] | 0;c[h >> 2] = m + 1;a[m >> 0] = u;m = b + 1 | 0;
      break
     }
    default:
     m = b
   }
   u = e;
   a: do
    if ((u - m | 0) > 1 ? (a[m >> 0] | 0) == 48 : 0) {
     j = m + 1 | 0;
     switch (a[j >> 0] | 0) {
      case 88:
      case 120:
       break;
      default:
       {
        n = 4;
        break a
       }
     }
     s = Cb[c[(c[v >> 2] | 0) + 28 >> 2] & 15](v, 48) | 0;
     r = c[h >> 2] | 0;
     c[h >> 2] = r + 1;
     a[r >> 0] = s;
     m = m + 2 | 0;
     r = Cb[c[(c[v >> 2] | 0) + 28 >> 2] & 15](v, a[j >> 0] | 0) | 0;
     s = c[h >> 2] | 0;
     c[h >> 2] = s + 1;
     a[s >> 0] = r;
     if (m >>> 0 < e >>> 0) {
      j = m;
      while (1) {
       s = a[j >> 0] | 0;
       if (!(ii(s, dl() | 0) | 0)) {
        s = m;
        break a
       }
       j = j + 1 | 0;
       if (j >>> 0 >= e >>> 0) {
        s = m;
        break
       }
      }
     } else {
      s = m;
      j = m
     }
    } else n = 4;
   while (0);
   b: do
    if ((n | 0) == 4)
     if (m >>> 0 < e >>> 0) {
      j = m;
      while (1) {
       s = a[j >> 0] | 0;
       if (!(hi(s, dl() | 0) | 0)) {
        s = m;
        break b
       }
       j = j + 1 | 0;
       if (j >>> 0 >= e >>> 0) {
        s = m;
        break
       }
      }
     } else {
      s = m;
      j = m
     }
   while (0);
   q = a[w >> 0] | 0;
   r = w + 4 | 0;
   if (((q & 1) == 0 ? (q & 255) >>> 1 : c[r >> 2] | 0) | 0) {
    if ((s | 0) != (j | 0) ? (l = j + -1 | 0, s >>> 0 < l >>> 0) : 0) {
     m = s;
     do {
      q = a[m >> 0] | 0;
      a[m >> 0] = a[l >> 0] | 0;
      a[l >> 0] = q;
      m = m + 1 | 0;
      l = l + -1 | 0
     } while (m >>> 0 < l >>> 0)
    }
    n = wb[c[(c[t >> 2] | 0) + 16 >> 2] & 127](t) | 0;
    o = w + 8 | 0;
    p = w + 1 | 0;
    if (s >>> 0 < j >>> 0) {
     l = 0;
     m = 0;
     q = s;
     while (1) {
      y = a[((a[w >> 0] & 1) == 0 ? p : c[o >> 2] | 0) + m >> 0] | 0;
      if (y << 24 >> 24 > 0 & (l | 0) == (y << 24 >> 24 | 0)) {
       y = c[h >> 2] | 0;
       c[h >> 2] = y + 1;
       a[y >> 0] = n;
       y = a[w >> 0] | 0;
       l = 0;
       m = (m >>> 0 < (((y & 1) == 0 ? (y & 255) >>> 1 : c[r >> 2] | 0) + -1 | 0) >>> 0 & 1) + m | 0
      }
      z = Cb[c[(c[v >> 2] | 0) + 28 >> 2] & 15](v, a[q >> 0] | 0) | 0;
      y = c[h >> 2] | 0;
      c[h >> 2] = y + 1;
      a[y >> 0] = z;
      q = q + 1 | 0;
      if (q >>> 0 >= j >>> 0) break;
      else l = l + 1 | 0
     }
    }
    l = f + (s - b) | 0;
    m = c[h >> 2] | 0;
    if ((l | 0) != (m | 0) ? (k = m + -1 | 0, l >>> 0 < k >>> 0) : 0) {
     do {
      z = a[l >> 0] | 0;
      a[l >> 0] = a[k >> 0] | 0;
      a[k >> 0] = z;
      l = l + 1 | 0;
      k = k + -1 | 0
     } while (l >>> 0 < k >>> 0);
     l = v
    } else l = v
   } else {
    Ab[c[(c[v >> 2] | 0) + 32 >> 2] & 7](v, s, j, c[h >> 2] | 0) | 0;
    c[h >> 2] = (c[h >> 2] | 0) + (j - s);
    l = v
   }
   c: do
    if (j >>> 0 < e >>> 0) {
     while (1) {
      k = a[j >> 0] | 0;
      if (k << 24 >> 24 == 46) break;
      y = Cb[c[(c[l >> 2] | 0) + 28 >> 2] & 15](v, k) | 0;
      z = c[h >> 2] | 0;
      c[h >> 2] = z + 1;
      a[z >> 0] = y;
      j = j + 1 | 0;
      if (j >>> 0 >= e >>> 0) break c
     }
     y = wb[c[(c[t >> 2] | 0) + 12 >> 2] & 127](t) | 0;
     z = c[h >> 2] | 0;
     c[h >> 2] = z + 1;
     a[z >> 0] = y;
     j = j + 1 | 0
    }
   while (0);
   Ab[c[(c[v >> 2] | 0) + 32 >> 2] & 7](v, j, e, c[h >> 2] | 0) | 0;
   z = (c[h >> 2] | 0) + (u - j) | 0;
   c[h >> 2] = z;
   c[g >> 2] = (d | 0) == (e | 0) ? z : f + (d - b) | 0;
   uj(w);
   i = x;
   return
  }

  function Ll(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = +f;
   var g = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0;
   x = i;
   i = i + 176 | 0;
   r = x + 76 | 0;
   n = x + 48 | 0;
   m = x + 32 | 0;
   j = x + 24 | 0;
   g = x + 8 | 0;
   l = x;
   p = x + 80 | 0;
   o = x + 72 | 0;
   q = x + 110 | 0;
   w = x + 68 | 0;
   u = x + 64 | 0;
   s = x + 60 | 0;
   t = x + 56 | 0;
   k = l;
   c[k >> 2] = 37;
   c[k + 4 >> 2] = 0;
   k = Jl(l + 1 | 0, 23495, c[d + 4 >> 2] | 0) | 0;
   c[o >> 2] = p;
   a = dl() | 0;
   if (k) {
    c[g >> 2] = c[d + 8 >> 2];
    h[g + 8 >> 3] = f;
    a = Xq(p, 30, a, l, g) | 0
   } else {
    h[j >> 3] = f;
    a = Xq(p, 30, a, l, j) | 0
   }
   if ((a | 0) > 29) {
    a = dl() | 0;
    if (k) {
     c[m >> 2] = c[d + 8 >> 2];
     h[m + 8 >> 3] = f;
     g = Yq(o, a, l, m) | 0
    } else {
     h[n >> 3] = f;
     g = Yq(o, a, l, n) | 0
    }
    a = c[o >> 2] | 0;
    if (!a) Rh();
    else {
     y = a;
     B = a;
     v = g
    }
   } else {
    y = c[o >> 2] | 0;
    B = 0;
    v = a
   }
   g = y + v | 0;
   j = Dl(y, g, d) | 0;
   if ((y | 0) != (p | 0)) {
    a = jj(v << 1) | 0;
    if (!a) Rh();
    else {
     z = y;
     A = a;
     C = a
    }
   } else {
    z = p;
    A = 0;
    C = q
   }
   y = Xj(d) | 0;
   c[s >> 2] = y;
   Kl(z, j, g, C, w, u, s);
   gs(y) | 0;
   c[t >> 2] = c[b >> 2];
   z = c[w >> 2] | 0;
   b = c[u >> 2] | 0;
   c[r >> 2] = c[t >> 2];
   C = ng(r, C, z, b, d, e) | 0;
   kj(A);
   kj(B);
   i = x;
   return C | 0
  }

  function Ml(b, d, e, f, g) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0;
   h = i;
   i = i + 80 | 0;
   m = h;
   b = h + 70 | 0;
   j = h + 12 | 0;
   k = h + 32 | 0;
   o = h + 8 | 0;
   n = h + 4 | 0;
   a[b >> 0] = a[23497] | 0;
   a[b + 1 >> 0] = a[23498] | 0;
   a[b + 2 >> 0] = a[23499] | 0;
   a[b + 3 >> 0] = a[23500] | 0;
   a[b + 4 >> 0] = a[23501] | 0;
   a[b + 5 >> 0] = a[23502] | 0;
   l = dl() | 0;
   c[m >> 2] = g;
   b = Xq(j, 20, l, b, m) | 0;
   l = j + b | 0;
   g = Dl(j, l, e) | 0;
   p = Xj(e) | 0;
   c[o >> 2] = p;
   o = Qo(o, 9336) | 0;
   gs(p) | 0;
   Ab[c[(c[o >> 2] | 0) + 32 >> 2] & 7](o, j, l, k) | 0;
   b = k + b | 0;
   c[n >> 2] = c[d >> 2];
   c[m >> 2] = c[n >> 2];
   b = ng(m, k, (g | 0) == (l | 0) ? b : k + (g - j) | 0, b, e, f) | 0;
   i = h;
   return b | 0
  }

  function Nl(a) {
   a = a | 0;
   return
  }

  function Ol(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Pl(b, d, e, f, g) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   m = i;
   i = i + 32 | 0;
   h = m + 20 | 0;
   j = m + 16 | 0;
   k = m + 12 | 0;
   l = m;
   if (!(c[e + 4 >> 2] & 1)) {
    l = c[(c[b >> 2] | 0) + 24 >> 2] | 0;
    c[j >> 2] = c[d >> 2];
    c[h >> 2] = c[j >> 2];
    h = Db[l & 31](b, h, e, f, g & 1) | 0
   } else {
    j = Xj(e) | 0;
    c[k >> 2] = j;
    h = Qo(k, 9484) | 0;
    gs(j) | 0;
    j = c[h >> 2] | 0;
    if (g) tb[c[j + 24 >> 2] & 127](l, h);
    else tb[c[j + 28 >> 2] & 127](l, h);
    f = a[l >> 0] | 0;
    e = (f & 1) == 0;
    h = l + 4 | 0;
    g = l + 8 | 0;
    b = e ? h : l + 4 | 0;
    h = e ? h : c[l + 8 >> 2] | 0;
    e = (f & 1) == 0;
    if ((h | 0) != ((e ? b : c[g >> 2] | 0) + ((e ? (f & 255) >>> 1 : c[b >> 2] | 0) << 2) | 0))
     do {
      j = c[h >> 2] | 0;
      k = c[d >> 2] | 0;
      if (k) {
       e = k + 24 | 0;
       f = c[e >> 2] | 0;
       if ((f | 0) == (c[k + 28 >> 2] | 0)) j = Cb[c[(c[k >> 2] | 0) + 52 >> 2] & 15](k, j) | 0;
       else {
        c[e >> 2] = f + 4;
        c[f >> 2] = j
       }
       if ((j | 0) == -1) c[d >> 2] = 0
      }
      h = h + 4 | 0;
      f = a[l >> 0] | 0;
      e = (f & 1) == 0
     } while ((h | 0) != ((e ? b : c[g >> 2] | 0) + ((e ? (f & 255) >>> 1 : c[b >> 2] | 0) << 2) | 0));
    h = c[d >> 2] | 0;
    Jj(l)
   }
   i = m;
   return h | 0
  }

  function Ql(b, d, e, f, g) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0;
   h = i;
   i = i + 128 | 0;
   k = h;
   o = h + 116 | 0;
   q = h + 104 | 0;
   j = h + 20 | 0;
   m = h + 16 | 0;
   b = h + 12 | 0;
   n = h + 8 | 0;
   l = h + 4 | 0;
   a[o >> 0] = a[23483] | 0;
   a[o + 1 >> 0] = a[23484] | 0;
   a[o + 2 >> 0] = a[23485] | 0;
   a[o + 3 >> 0] = a[23486] | 0;
   a[o + 4 >> 0] = a[23487] | 0;
   a[o + 5 >> 0] = a[23488] | 0;
   Cl(o + 1 | 0, 23489, 1, c[e + 4 >> 2] | 0);
   p = dl() | 0;
   c[k >> 2] = g;
   o = q + (Xq(q, 12, p, o, k) | 0) | 0;
   p = Dl(q, o, e) | 0;
   g = Xj(e) | 0;
   c[n >> 2] = g;
   Rl(q, p, o, j, m, b, n);
   gs(g) | 0;
   c[l >> 2] = c[d >> 2];
   g = c[m >> 2] | 0;
   b = c[b >> 2] | 0;
   c[k >> 2] = c[l >> 2];
   b = Zq(k, j, g, b, e, f) | 0;
   i = h;
   return b | 0
  }

  function Rl(b, d, e, f, g, h, j) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0;
   t = i;
   i = i + 16 | 0;
   s = t;
   r = Qo(j, 9328) | 0;
   m = Qo(j, 9484) | 0;
   tb[c[(c[m >> 2] | 0) + 20 >> 2] & 127](s, m);
   p = a[s >> 0] | 0;
   q = s + 4 | 0;
   if (((p & 1) == 0 ? (p & 255) >>> 1 : c[q >> 2] | 0) | 0) {
    c[h >> 2] = f;
    j = a[b >> 0] | 0;
    switch (j << 24 >> 24) {
     case 43:
     case 45:
      {
       p = Cb[c[(c[r >> 2] | 0) + 44 >> 2] & 15](r, j) | 0;k = c[h >> 2] | 0;c[h >> 2] = k + 4;c[k >> 2] = p;k = b + 1 | 0;
       break
      }
     default:
      k = b
    }
    a: do
     if ((e - k | 0) > 1 ? (a[k >> 0] | 0) == 48 : 0) {
      j = k + 1 | 0;
      switch (a[j >> 0] | 0) {
       case 88:
       case 120:
        break;
       default:
        break a
      }
      p = Cb[c[(c[r >> 2] | 0) + 44 >> 2] & 15](r, 48) | 0;
      o = c[h >> 2] | 0;
      c[h >> 2] = o + 4;
      c[o >> 2] = p;
      o = Cb[c[(c[r >> 2] | 0) + 44 >> 2] & 15](r, a[j >> 0] | 0) | 0;
      p = c[h >> 2] | 0;
      c[h >> 2] = p + 4;
      c[p >> 2] = o;
      k = k + 2 | 0
     }
    while (0);
    if ((k | 0) != (e | 0) ? (n = e + -1 | 0, k >>> 0 < n >>> 0) : 0) {
     l = k;
     j = n;
     do {
      p = a[l >> 0] | 0;
      a[l >> 0] = a[j >> 0] | 0;
      a[j >> 0] = p;
      l = l + 1 | 0;
      j = j + -1 | 0
     } while (l >>> 0 < j >>> 0)
    }
    m = wb[c[(c[m >> 2] | 0) + 16 >> 2] & 127](m) | 0;
    n = s + 8 | 0;
    o = s + 1 | 0;
    if (k >>> 0 < e >>> 0) {
     j = 0;
     l = 0;
     p = k;
     while (1) {
      u = a[((a[s >> 0] & 1) == 0 ? o : c[n >> 2] | 0) + l >> 0] | 0;
      if (u << 24 >> 24 != 0 & (j | 0) == (u << 24 >> 24 | 0)) {
       u = c[h >> 2] | 0;
       c[h >> 2] = u + 4;
       c[u >> 2] = m;
       u = a[s >> 0] | 0;
       j = 0;
       l = (l >>> 0 < (((u & 1) == 0 ? (u & 255) >>> 1 : c[q >> 2] | 0) + -1 | 0) >>> 0 & 1) + l | 0
      }
      v = Cb[c[(c[r >> 2] | 0) + 44 >> 2] & 15](r, a[p >> 0] | 0) | 0;
      u = c[h >> 2] | 0;
      c[h >> 2] = u + 4;
      c[u >> 2] = v;
      p = p + 1 | 0;
      if (p >>> 0 >= e >>> 0) break;
      else j = j + 1 | 0
     }
    }
    j = f + (k - b << 2) | 0;
    l = c[h >> 2] | 0;
    if ((j | 0) != (l | 0)) {
     k = l + -4 | 0;
     if (j >>> 0 < k >>> 0) {
      do {
       v = c[j >> 2] | 0;
       c[j >> 2] = c[k >> 2];
       c[k >> 2] = v;
       j = j + 4 | 0;
       k = k + -4 | 0
      } while (j >>> 0 < k >>> 0);
      j = l
     } else j = l
    }
   } else {
    Ab[c[(c[r >> 2] | 0) + 48 >> 2] & 7](r, b, e, f) | 0;
    j = f + (e - b << 2) | 0;
    c[h >> 2] = j
   }
   c[g >> 2] = (d | 0) == (e | 0) ? j : f + (d - b << 2) | 0;
   uj(s);
   i = t;
   return
  }

  function Sl(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0;
   h = i;
   i = i + 224 | 0;
   k = h + 8 | 0;
   o = h;
   p = h + 196 | 0;
   j = h + 32 | 0;
   m = h + 28 | 0;
   a = h + 24 | 0;
   n = h + 20 | 0;
   l = h + 16 | 0;
   q = o;
   c[q >> 2] = 37;
   c[q + 4 >> 2] = 0;
   Cl(o + 1 | 0, 23491, 1, c[d + 4 >> 2] | 0);
   q = dl() | 0;
   r = k;
   c[r >> 2] = f;
   c[r + 4 >> 2] = g;
   f = p + (Xq(p, 22, q, o, k) | 0) | 0;
   o = Dl(p, f, d) | 0;
   g = Xj(d) | 0;
   c[n >> 2] = g;
   Rl(p, o, f, j, m, a, n);
   gs(g) | 0;
   c[l >> 2] = c[b >> 2];
   b = c[m >> 2] | 0;
   a = c[a >> 2] | 0;
   c[k >> 2] = c[l >> 2];
   a = Zq(k, j, b, a, d, e) | 0;
   i = h;
   return a | 0
  }

  function Tl(b, d, e, f, g) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0;
   h = i;
   i = i + 128 | 0;
   k = h;
   o = h + 116 | 0;
   q = h + 104 | 0;
   j = h + 20 | 0;
   m = h + 16 | 0;
   b = h + 12 | 0;
   n = h + 8 | 0;
   l = h + 4 | 0;
   a[o >> 0] = a[23483] | 0;
   a[o + 1 >> 0] = a[23484] | 0;
   a[o + 2 >> 0] = a[23485] | 0;
   a[o + 3 >> 0] = a[23486] | 0;
   a[o + 4 >> 0] = a[23487] | 0;
   a[o + 5 >> 0] = a[23488] | 0;
   Cl(o + 1 | 0, 23489, 0, c[e + 4 >> 2] | 0);
   p = dl() | 0;
   c[k >> 2] = g;
   o = q + (Xq(q, 12, p, o, k) | 0) | 0;
   p = Dl(q, o, e) | 0;
   g = Xj(e) | 0;
   c[n >> 2] = g;
   Rl(q, p, o, j, m, b, n);
   gs(g) | 0;
   c[l >> 2] = c[d >> 2];
   g = c[m >> 2] | 0;
   b = c[b >> 2] | 0;
   c[k >> 2] = c[l >> 2];
   b = Zq(k, j, g, b, e, f) | 0;
   i = h;
   return b | 0
  }

  function Ul(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0;
   h = i;
   i = i + 240 | 0;
   k = h + 8 | 0;
   o = h;
   p = h + 204 | 0;
   j = h + 32 | 0;
   m = h + 28 | 0;
   a = h + 24 | 0;
   n = h + 20 | 0;
   l = h + 16 | 0;
   q = o;
   c[q >> 2] = 37;
   c[q + 4 >> 2] = 0;
   Cl(o + 1 | 0, 23491, 0, c[d + 4 >> 2] | 0);
   q = dl() | 0;
   r = k;
   c[r >> 2] = f;
   c[r + 4 >> 2] = g;
   f = p + (Xq(p, 23, q, o, k) | 0) | 0;
   o = Dl(p, f, d) | 0;
   g = Xj(d) | 0;
   c[n >> 2] = g;
   Rl(p, o, f, j, m, a, n);
   gs(g) | 0;
   c[l >> 2] = c[b >> 2];
   b = c[m >> 2] | 0;
   a = c[a >> 2] | 0;
   c[k >> 2] = c[l >> 2];
   a = Zq(k, j, b, a, d, e) | 0;
   i = h;
   return a | 0
  }

  function Vl(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = +f;
   var g = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0;
   y = i;
   i = i + 336 | 0;
   p = y + 296 | 0;
   l = y + 32 | 0;
   j = y + 24 | 0;
   g = y + 8 | 0;
   k = y;
   n = y + 300 | 0;
   m = y + 64 | 0;
   o = y + 68 | 0;
   u = y + 60 | 0;
   s = y + 56 | 0;
   q = y + 52 | 0;
   r = y + 48 | 0;
   B = k;
   c[B >> 2] = 37;
   c[B + 4 >> 2] = 0;
   B = Jl(k + 1 | 0, 23494, c[d + 4 >> 2] | 0) | 0;
   c[m >> 2] = n;
   a = dl() | 0;
   if (B) {
    c[g >> 2] = c[d + 8 >> 2];
    h[g + 8 >> 3] = f;
    a = Xq(n, 30, a, k, g) | 0
   } else {
    h[j >> 3] = f;
    a = Xq(n, 30, a, k, j) | 0
   }
   if ((a | 0) > 29) {
    g = dl() | 0;
    c[l >> 2] = c[d + 8 >> 2];
    h[l + 8 >> 3] = f;
    g = Yq(m, g, k, l) | 0;
    a = c[m >> 2] | 0;
    if (!a) Rh();
    else {
     v = a;
     A = a;
     t = g
    }
   } else {
    v = c[m >> 2] | 0;
    A = 0;
    t = a
   }
   g = v + t | 0;
   j = Dl(v, g, d) | 0;
   if ((v | 0) != (n | 0)) {
    a = jj(t << 3) | 0;
    if (!a) Rh();
    else {
     w = v;
     z = a;
     x = a
    }
   } else {
    w = n;
    z = 0;
    x = o
   }
   B = Xj(d) | 0;
   c[q >> 2] = B;
   Wl(w, j, g, x, u, s, q);
   gs(B) | 0;
   c[r >> 2] = c[b >> 2];
   B = c[u >> 2] | 0;
   a = c[s >> 2] | 0;
   c[p >> 2] = c[r >> 2];
   a = Zq(p, x, B, a, d, e) | 0;
   c[b >> 2] = a;
   if (z) kj(z);
   kj(A);
   i = y;
   return a | 0
  }

  function Wl(b, d, e, f, g, h, j) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0;
   w = i;
   i = i + 16 | 0;
   v = w;
   u = Qo(j, 9328) | 0;
   s = Qo(j, 9484) | 0;
   tb[c[(c[s >> 2] | 0) + 20 >> 2] & 127](v, s);
   c[h >> 2] = f;
   j = a[b >> 0] | 0;
   switch (j << 24 >> 24) {
    case 43:
    case 45:
     {
      t = Cb[c[(c[u >> 2] | 0) + 44 >> 2] & 15](u, j) | 0;l = c[h >> 2] | 0;c[h >> 2] = l + 4;c[l >> 2] = t;l = b + 1 | 0;
      break
     }
    default:
     l = b
   }
   t = e;
   a: do
    if ((t - l | 0) > 1 ? (a[l >> 0] | 0) == 48 : 0) {
     j = l + 1 | 0;
     switch (a[j >> 0] | 0) {
      case 88:
      case 120:
       break;
      default:
       {
        m = 4;
        break a
       }
     }
     r = Cb[c[(c[u >> 2] | 0) + 44 >> 2] & 15](u, 48) | 0;
     q = c[h >> 2] | 0;
     c[h >> 2] = q + 4;
     c[q >> 2] = r;
     l = l + 2 | 0;
     q = Cb[c[(c[u >> 2] | 0) + 44 >> 2] & 15](u, a[j >> 0] | 0) | 0;
     r = c[h >> 2] | 0;
     c[h >> 2] = r + 4;
     c[r >> 2] = q;
     if (l >>> 0 < e >>> 0) {
      j = l;
      while (1) {
       r = a[j >> 0] | 0;
       if (!(ii(r, dl() | 0) | 0)) {
        r = l;
        break a
       }
       j = j + 1 | 0;
       if (j >>> 0 >= e >>> 0) {
        r = l;
        break
       }
      }
     } else {
      r = l;
      j = l
     }
    } else m = 4;
   while (0);
   b: do
    if ((m | 0) == 4)
     if (l >>> 0 < e >>> 0) {
      j = l;
      while (1) {
       r = a[j >> 0] | 0;
       if (!(hi(r, dl() | 0) | 0)) {
        r = l;
        break b
       }
       j = j + 1 | 0;
       if (j >>> 0 >= e >>> 0) {
        r = l;
        break
       }
      }
     } else {
      r = l;
      j = l
     }
   while (0);
   p = a[v >> 0] | 0;
   q = v + 4 | 0;
   if (((p & 1) == 0 ? (p & 255) >>> 1 : c[q >> 2] | 0) | 0) {
    if ((r | 0) != (j | 0) ? (k = j + -1 | 0, r >>> 0 < k >>> 0) : 0) {
     l = r;
     do {
      p = a[l >> 0] | 0;
      a[l >> 0] = a[k >> 0] | 0;
      a[k >> 0] = p;
      l = l + 1 | 0;
      k = k + -1 | 0
     } while (l >>> 0 < k >>> 0)
    }
    m = wb[c[(c[s >> 2] | 0) + 16 >> 2] & 127](s) | 0;
    n = v + 8 | 0;
    o = v + 1 | 0;
    if (r >>> 0 < j >>> 0) {
     k = 0;
     l = 0;
     p = r;
     while (1) {
      x = a[((a[v >> 0] & 1) == 0 ? o : c[n >> 2] | 0) + l >> 0] | 0;
      if (x << 24 >> 24 > 0 & (k | 0) == (x << 24 >> 24 | 0)) {
       x = c[h >> 2] | 0;
       c[h >> 2] = x + 4;
       c[x >> 2] = m;
       x = a[v >> 0] | 0;
       k = 0;
       l = (l >>> 0 < (((x & 1) == 0 ? (x & 255) >>> 1 : c[q >> 2] | 0) + -1 | 0) >>> 0 & 1) + l | 0
      }
      y = Cb[c[(c[u >> 2] | 0) + 44 >> 2] & 15](u, a[p >> 0] | 0) | 0;
      x = c[h >> 2] | 0;
      c[h >> 2] = x + 4;
      c[x >> 2] = y;
      p = p + 1 | 0;
      if (p >>> 0 >= j >>> 0) break;
      else k = k + 1 | 0
     }
    }
    k = f + (r - b << 2) | 0;
    m = c[h >> 2] | 0;
    if ((k | 0) != (m | 0)) {
     l = m + -4 | 0;
     if (k >>> 0 < l >>> 0) {
      do {
       y = c[k >> 2] | 0;
       c[k >> 2] = c[l >> 2];
       c[l >> 2] = y;
       k = k + 4 | 0;
       l = l + -4 | 0
      } while (k >>> 0 < l >>> 0);
      l = u;
      k = m
     } else {
      l = u;
      k = m
     }
    } else l = u
   } else {
    Ab[c[(c[u >> 2] | 0) + 48 >> 2] & 7](u, r, j, c[h >> 2] | 0) | 0;
    k = (c[h >> 2] | 0) + (j - r << 2) | 0;
    c[h >> 2] = k;
    l = u
   }
   c: do
    if (j >>> 0 < e >>> 0) {
     while (1) {
      k = a[j >> 0] | 0;
      if (k << 24 >> 24 == 46) break;
      x = Cb[c[(c[l >> 2] | 0) + 44 >> 2] & 15](u, k) | 0;
      y = c[h >> 2] | 0;
      k = y + 4 | 0;
      c[h >> 2] = k;
      c[y >> 2] = x;
      j = j + 1 | 0;
      if (j >>> 0 >= e >>> 0) break c
     }
     x = wb[c[(c[s >> 2] | 0) + 12 >> 2] & 127](s) | 0;
     y = c[h >> 2] | 0;
     k = y + 4 | 0;
     c[h >> 2] = k;
     c[y >> 2] = x;
     j = j + 1 | 0
    }
   while (0);
   Ab[c[(c[u >> 2] | 0) + 48 >> 2] & 7](u, j, e, k) | 0;
   y = (c[h >> 2] | 0) + (t - j << 2) | 0;
   c[h >> 2] = y;
   c[g >> 2] = (d | 0) == (e | 0) ? y : f + (d - b << 2) | 0;
   uj(v);
   i = w;
   return
  }

  function Xl(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = +f;
   var g = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0;
   A = i;
   i = i + 352 | 0;
   r = A + 304 | 0;
   n = A + 48 | 0;
   m = A + 32 | 0;
   j = A + 24 | 0;
   g = A + 8 | 0;
   l = A;
   p = A + 308 | 0;
   o = A + 72 | 0;
   q = A + 76 | 0;
   w = A + 68 | 0;
   u = A + 64 | 0;
   s = A + 60 | 0;
   t = A + 56 | 0;
   k = l;
   c[k >> 2] = 37;
   c[k + 4 >> 2] = 0;
   k = Jl(l + 1 | 0, 23495, c[d + 4 >> 2] | 0) | 0;
   c[o >> 2] = p;
   a = dl() | 0;
   if (k) {
    c[g >> 2] = c[d + 8 >> 2];
    h[g + 8 >> 3] = f;
    a = Xq(p, 30, a, l, g) | 0
   } else {
    h[j >> 3] = f;
    a = Xq(p, 30, a, l, j) | 0
   }
   if ((a | 0) > 29) {
    a = dl() | 0;
    if (k) {
     c[m >> 2] = c[d + 8 >> 2];
     h[m + 8 >> 3] = f;
     g = Yq(o, a, l, m) | 0
    } else {
     h[n >> 3] = f;
     g = Yq(o, a, l, n) | 0
    }
    a = c[o >> 2] | 0;
    if (!a) Rh();
    else {
     x = a;
     C = a;
     v = g
    }
   } else {
    x = c[o >> 2] | 0;
    C = 0;
    v = a
   }
   g = x + v | 0;
   j = Dl(x, g, d) | 0;
   if ((x | 0) != (p | 0)) {
    a = jj(v << 3) | 0;
    if (!a) Rh();
    else {
     y = x;
     B = a;
     z = a
    }
   } else {
    y = p;
    B = 0;
    z = q
   }
   a = Xj(d) | 0;
   c[s >> 2] = a;
   Wl(y, j, g, z, w, u, s);
   gs(a) | 0;
   c[t >> 2] = c[b >> 2];
   y = c[w >> 2] | 0;
   a = c[u >> 2] | 0;
   c[r >> 2] = c[t >> 2];
   a = Zq(r, z, y, a, d, e) | 0;
   c[b >> 2] = a;
   if (B) kj(B);
   kj(C);
   i = A;
   return a | 0
  }

  function Yl(b, d, e, f, g) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0;
   h = i;
   i = i + 192 | 0;
   m = h;
   b = h + 180 | 0;
   j = h + 160 | 0;
   k = h + 12 | 0;
   o = h + 8 | 0;
   n = h + 4 | 0;
   a[b >> 0] = a[23497] | 0;
   a[b + 1 >> 0] = a[23498] | 0;
   a[b + 2 >> 0] = a[23499] | 0;
   a[b + 3 >> 0] = a[23500] | 0;
   a[b + 4 >> 0] = a[23501] | 0;
   a[b + 5 >> 0] = a[23502] | 0;
   l = dl() | 0;
   c[m >> 2] = g;
   b = Xq(j, 20, l, b, m) | 0;
   l = j + b | 0;
   g = Dl(j, l, e) | 0;
   p = Xj(e) | 0;
   c[o >> 2] = p;
   o = Qo(o, 9328) | 0;
   gs(p) | 0;
   Ab[c[(c[o >> 2] | 0) + 48 >> 2] & 7](o, j, l, k) | 0;
   b = k + (b << 2) | 0;
   c[n >> 2] = c[d >> 2];
   c[m >> 2] = c[n >> 2];
   b = Zq(m, k, (g | 0) == (l | 0) ? b : k + (g - j << 2) | 0, b, e, f) | 0;
   i = h;
   return b | 0
  }

  function Zl(e, f, g, h, j, k, l, m) {
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   k = k | 0;
   l = l | 0;
   m = m | 0;
   var n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0;
   B = i;
   i = i + 32 | 0;
   u = B + 16 | 0;
   t = B + 12 | 0;
   x = B + 8 | 0;
   v = B + 4 | 0;
   w = B;
   y = Xj(h) | 0;
   c[x >> 2] = y;
   x = Qo(x, 9336) | 0;
   gs(y) | 0;
   c[j >> 2] = 0;
   y = x + 8 | 0;
   n = c[f >> 2] | 0;
   a: do
    if ((l | 0) != (m | 0)) {
     b: while (1) {
      o = n;
      if (n) {
       if ((c[n + 12 >> 2] | 0) == (c[n + 16 >> 2] | 0) ? (wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0) == -1 : 0) {
        c[f >> 2] = 0;
        n = 0;
        o = 0
       }
      } else n = 0;
      r = (n | 0) == 0;
      q = c[g >> 2] | 0;
      p = q;
      do
       if (q) {
        if ((c[q + 12 >> 2] | 0) == (c[q + 16 >> 2] | 0) ? (wb[c[(c[q >> 2] | 0) + 36 >> 2] & 127](q) | 0) == -1 : 0) {
         c[g >> 2] = 0;
         p = 0;
         A = 11;
         break
        }
        if (!r) {
         A = 12;
         break b
        }
       } else A = 11;
      while (0);
      if ((A | 0) == 11) {
       A = 0;
       if (r) {
        A = 12;
        break
       } else q = 0
      }
      c: do
       if ((pb[c[(c[x >> 2] | 0) + 36 >> 2] & 31](x, a[l >> 0] | 0, 0) | 0) << 24 >> 24 == 37) {
        q = l + 1 | 0;
        if ((q | 0) == (m | 0)) {
         A = 15;
         break b
        }
        s = pb[c[(c[x >> 2] | 0) + 36 >> 2] & 31](x, a[q >> 0] | 0, 0) | 0;
        switch (s << 24 >> 24) {
         case 48:
         case 69:
          {
           r = l + 2 | 0;
           if ((r | 0) == (m | 0)) {
            A = 18;
            break b
           }
           l = q;q = pb[c[(c[x >> 2] | 0) + 36 >> 2] & 31](x, a[r >> 0] | 0, 0) | 0;n = s;
           break
          }
         default:
          {
           q = s;n = 0
          }
        }
        s = c[(c[e >> 2] | 0) + 36 >> 2] | 0;
        c[v >> 2] = o;
        c[w >> 2] = p;
        c[t >> 2] = c[v >> 2];
        c[u >> 2] = c[w >> 2];
        c[f >> 2] = zb[s & 15](e, t, u, h, j, k, q, n) | 0;
        l = l + 2 | 0
       } else {
        o = a[l >> 0] | 0;
        if (o << 24 >> 24 > -1 ? (z = c[y >> 2] | 0, (b[z + (o << 24 >> 24 << 1) >> 1] & 8192) != 0) : 0) {
         do {
          l = l + 1 | 0;
          if ((l | 0) == (m | 0)) {
           l = m;
           break
          }
          o = a[l >> 0] | 0;
          if (o << 24 >> 24 <= -1) break
         } while ((b[z + (o << 24 >> 24 << 1) >> 1] & 8192) != 0);
         o = q;
         while (1) {
          if (n) {
           if ((c[n + 12 >> 2] | 0) == (c[n + 16 >> 2] | 0) ? (wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0) == -1 : 0) {
            c[f >> 2] = 0;
            n = 0
           }
          } else n = 0;
          p = (n | 0) == 0;
          do
           if (q) {
            if ((c[q + 12 >> 2] | 0) != (c[q + 16 >> 2] | 0))
             if (p) {
              s = o;
              break
             } else break c;
            if ((wb[c[(c[q >> 2] | 0) + 36 >> 2] & 127](q) | 0) != -1)
             if (p ^ (o | 0) == 0) {
              s = o;
              q = o;
              break
             } else break c;
            else {
             c[g >> 2] = 0;
             o = 0;
             A = 37;
             break
            }
           } else A = 37;
          while (0);
          if ((A | 0) == 37) {
           A = 0;
           if (p) break c;
           else {
            s = o;
            q = 0
           }
          }
          p = n + 12 | 0;
          o = c[p >> 2] | 0;
          r = n + 16 | 0;
          if ((o | 0) == (c[r >> 2] | 0)) o = wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0;
          else o = d[o >> 0] | 0;
          if ((o & 255) << 24 >> 24 <= -1) break c;
          if (!(b[(c[y >> 2] | 0) + (o << 24 >> 24 << 1) >> 1] & 8192)) break c;
          o = c[p >> 2] | 0;
          if ((o | 0) == (c[r >> 2] | 0)) {
           wb[c[(c[n >> 2] | 0) + 40 >> 2] & 127](n) | 0;
           o = s;
           continue
          } else {
           c[p >> 2] = o + 1;
           o = s;
           continue
          }
         }
        }
        p = n + 12 | 0;
        o = c[p >> 2] | 0;
        q = n + 16 | 0;
        if ((o | 0) == (c[q >> 2] | 0)) o = wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0;
        else o = d[o >> 0] | 0;
        s = Cb[c[(c[x >> 2] | 0) + 12 >> 2] & 15](x, o & 255) | 0;
        if (s << 24 >> 24 != (Cb[c[(c[x >> 2] | 0) + 12 >> 2] & 15](x, a[l >> 0] | 0) | 0) << 24 >> 24) {
         A = 55;
         break b
        }
        o = c[p >> 2] | 0;
        if ((o | 0) == (c[q >> 2] | 0)) wb[c[(c[n >> 2] | 0) + 40 >> 2] & 127](n) | 0;
        else c[p >> 2] = o + 1;
        l = l + 1 | 0
       }
      while (0);
      n = c[f >> 2] | 0;
      if (!((l | 0) != (m | 0) & (c[j >> 2] | 0) == 0)) break a
     }
     if ((A | 0) == 12) {
      c[j >> 2] = 4;
      break
     } else if ((A | 0) == 15) {
      c[j >> 2] = 4;
      break
     } else if ((A | 0) == 18) {
      c[j >> 2] = 4;
      break
     } else if ((A | 0) == 55) {
      c[j >> 2] = 4;
      n = c[f >> 2] | 0;
      break
     }
    }
   while (0);
   if (n) {
    if ((c[n + 12 >> 2] | 0) == (c[n + 16 >> 2] | 0) ? (wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0) == -1 : 0) {
     c[f >> 2] = 0;
     n = 0
    }
   } else n = 0;
   l = (n | 0) == 0;
   o = c[g >> 2] | 0;
   do
    if (o) {
     if ((c[o + 12 >> 2] | 0) == (c[o + 16 >> 2] | 0) ? (wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0) == -1 : 0) {
      c[g >> 2] = 0;
      A = 65;
      break
     }
     if (!l) A = 66
    } else A = 65;
   while (0);
   if ((A | 0) == 65 ? l : 0) A = 66;
   if ((A | 0) == 66) c[j >> 2] = c[j >> 2] | 2;
   i = B;
   return n | 0
  }

  function _l(a) {
   a = a | 0;
   return
  }

  function $l(a) {
   a = a | 0;
   mh(a);
   return
  }

  function am(a) {
   a = a | 0;
   return 2
  }

  function bm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Zl(a, k, j, e, f, g, 23503, 23511) | 0;
   i = h;
   return a | 0
  }

  function cm(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0;
   j = i;
   i = i + 16 | 0;
   k = j + 12 | 0;
   l = j + 8 | 0;
   n = j + 4 | 0;
   m = j;
   o = b + 8 | 0;
   o = wb[c[(c[o >> 2] | 0) + 20 >> 2] & 127](o) | 0;
   c[n >> 2] = c[d >> 2];
   c[m >> 2] = c[e >> 2];
   e = a[o >> 0] | 0;
   p = (e & 1) == 0;
   d = p ? o + 1 | 0 : c[o + 8 >> 2] | 0;
   e = d + (p ? (e & 255) >>> 1 : c[o + 4 >> 2] | 0) | 0;
   c[l >> 2] = c[n >> 2];
   c[k >> 2] = c[m >> 2];
   b = Zl(b, l, k, f, g, h, d, e) | 0;
   i = j;
   return b | 0
  }

  function dm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 8 | 0;
   m = h + 4 | 0;
   k = h;
   l = Xj(e) | 0;
   c[m >> 2] = l;
   e = Qo(m, 9336) | 0;
   gs(l) | 0;
   c[k >> 2] = c[d >> 2];
   c[j >> 2] = c[k >> 2];
   em(a, g + 24 | 0, b, j, f, e);
   i = h;
   return c[b >> 2] | 0
  }

  function em(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 4 | 0;
   k = h;
   a = a + 8 | 0;
   a = wb[c[c[a >> 2] >> 2] & 127](a) | 0;
   c[k >> 2] = c[e >> 2];
   c[j >> 2] = c[k >> 2];
   g = (Cq(d, j, a, a + 168 | 0, g, f, 0) | 0) - a | 0;
   if ((g | 0) < 168) c[b >> 2] = ((g | 0) / 12 | 0 | 0) % 7 | 0;
   i = h;
   return
  }

  function fm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 8 | 0;
   m = h + 4 | 0;
   k = h;
   l = Xj(e) | 0;
   c[m >> 2] = l;
   e = Qo(m, 9336) | 0;
   gs(l) | 0;
   c[k >> 2] = c[d >> 2];
   c[j >> 2] = c[k >> 2];
   gm(a, g + 16 | 0, b, j, f, e);
   i = h;
   return c[b >> 2] | 0
  }

  function gm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 4 | 0;
   k = h;
   a = a + 8 | 0;
   a = wb[c[(c[a >> 2] | 0) + 4 >> 2] & 127](a) | 0;
   c[k >> 2] = c[e >> 2];
   c[j >> 2] = c[k >> 2];
   g = (Cq(d, j, a, a + 288 | 0, g, f, 0) | 0) - a | 0;
   if ((g | 0) < 288) c[b >> 2] = ((g | 0) / 12 | 0 | 0) % 12 | 0;
   i = h;
   return
  }

  function hm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 8 | 0;
   m = h + 4 | 0;
   k = h;
   l = Xj(e) | 0;
   c[m >> 2] = l;
   e = Qo(m, 9336) | 0;
   gs(l) | 0;
   c[k >> 2] = c[d >> 2];
   c[j >> 2] = c[k >> 2];
   im(a, g + 20 | 0, b, j, f, e);
   i = h;
   return c[b >> 2] | 0
  }

  function im(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = _q(d, a, f, g, 4) | 0;
   if (!(c[f >> 2] & 4)) {
    if ((a | 0) < 69) a = a + 2e3 | 0;
    else a = (a + -69 | 0) >>> 0 < 31 ? a + 1900 | 0 : a;
    c[b >> 2] = a + -1900
   }
   i = h;
   return
  }

  function jm(b, d, e, f, g, h, j, k) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   k = k | 0;
   var l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0,
    F = 0,
    G = 0,
    H = 0,
    I = 0,
    J = 0,
    K = 0,
    L = 0,
    M = 0,
    N = 0,
    O = 0,
    P = 0,
    Q = 0,
    R = 0,
    S = 0,
    T = 0,
    U = 0;
   S = i;
   i = i + 144 | 0;
   l = S + 132 | 0;
   k = S + 116 | 0;
   L = S + 128 | 0;
   w = S + 124 | 0;
   H = S + 120 | 0;
   M = S + 112 | 0;
   N = S + 108 | 0;
   O = S + 104 | 0;
   P = S + 100 | 0;
   Q = S + 96 | 0;
   R = S + 92 | 0;
   m = S + 88 | 0;
   n = S + 84 | 0;
   o = S + 80 | 0;
   p = S + 76 | 0;
   q = S + 72 | 0;
   r = S + 68 | 0;
   s = S + 64 | 0;
   t = S + 60 | 0;
   u = S + 56 | 0;
   v = S + 52 | 0;
   x = S + 48 | 0;
   y = S + 44 | 0;
   z = S + 40 | 0;
   A = S + 36 | 0;
   B = S + 32 | 0;
   C = S + 28 | 0;
   D = S + 24 | 0;
   E = S + 20 | 0;
   F = S + 16 | 0;
   G = S + 12 | 0;
   I = S + 8 | 0;
   J = S + 4 | 0;
   K = S;
   c[g >> 2] = 0;
   U = Xj(f) | 0;
   c[L >> 2] = U;
   L = Qo(L, 9336) | 0;
   gs(U) | 0;
   do switch (j << 24 >> 24 | 0) {
    case 65:
    case 97:
     {
      c[w >> 2] = c[e >> 2];c[l >> 2] = c[w >> 2];em(b, h + 24 | 0, d, l, g, L);T = 26;
      break
     }
    case 104:
    case 66:
    case 98:
     {
      c[H >> 2] = c[e >> 2];c[l >> 2] = c[H >> 2];gm(b, h + 16 | 0, d, l, g, L);T = 26;
      break
     }
    case 99:
     {
      T = b + 8 | 0;T = wb[c[(c[T >> 2] | 0) + 12 >> 2] & 127](T) | 0;c[M >> 2] = c[d >> 2];c[N >> 2] = c[e >> 2];e = a[T >> 0] | 0;j = (e & 1) == 0;U = j ? T + 1 | 0 : c[T + 8 >> 2] | 0;T = U + (j ? (e & 255) >>> 1 : c[T + 4 >> 2] | 0) | 0;c[k >> 2] = c[M >> 2];c[l >> 2] = c[N >> 2];c[d >> 2] = Zl(b, k, l, f, g, h, U, T) | 0;T = 26;
      break
     }
    case 101:
    case 100:
     {
      c[O >> 2] = c[e >> 2];c[l >> 2] = c[O >> 2];km(b, h + 12 | 0, d, l, g, L);T = 26;
      break
     }
    case 68:
     {
      c[P >> 2] = c[d >> 2];c[Q >> 2] = c[e >> 2];c[k >> 2] = c[P >> 2];c[l >> 2] = c[Q >> 2];c[d >> 2] = Zl(b, k, l, f, g, h, 23511, 23519) | 0;T = 26;
      break
     }
    case 70:
     {
      c[R >> 2] = c[d >> 2];c[m >> 2] = c[e >> 2];c[k >> 2] = c[R >> 2];c[l >> 2] = c[m >> 2];c[d >> 2] = Zl(b, k, l, f, g, h, 23519, 23527) | 0;T = 26;
      break
     }
    case 72:
     {
      c[n >> 2] = c[e >> 2];c[l >> 2] = c[n >> 2];lm(b, h + 8 | 0, d, l, g, L);T = 26;
      break
     }
    case 73:
     {
      c[o >> 2] = c[e >> 2];c[l >> 2] = c[o >> 2];mm(b, h + 8 | 0, d, l, g, L);T = 26;
      break
     }
    case 106:
     {
      c[p >> 2] = c[e >> 2];c[l >> 2] = c[p >> 2];nm(b, h + 28 | 0, d, l, g, L);T = 26;
      break
     }
    case 109:
     {
      c[q >> 2] = c[e >> 2];c[l >> 2] = c[q >> 2];om(b, h + 16 | 0, d, l, g, L);T = 26;
      break
     }
    case 77:
     {
      c[r >> 2] = c[e >> 2];c[l >> 2] = c[r >> 2];pm(b, h + 4 | 0, d, l, g, L);T = 26;
      break
     }
    case 116:
    case 110:
     {
      c[s >> 2] = c[e >> 2];c[l >> 2] = c[s >> 2];qm(b, d, l, g, L);T = 26;
      break
     }
    case 112:
     {
      c[t >> 2] = c[e >> 2];c[l >> 2] = c[t >> 2];rm(b, h + 8 | 0, d, l, g, L);T = 26;
      break
     }
    case 114:
     {
      c[u >> 2] = c[d >> 2];c[v >> 2] = c[e >> 2];c[k >> 2] = c[u >> 2];c[l >> 2] = c[v >> 2];c[d >> 2] = Zl(b, k, l, f, g, h, 23527, 23538) | 0;T = 26;
      break
     }
    case 82:
     {
      c[x >> 2] = c[d >> 2];c[y >> 2] = c[e >> 2];c[k >> 2] = c[x >> 2];c[l >> 2] = c[y >> 2];c[d >> 2] = Zl(b, k, l, f, g, h, 23538, 23543) | 0;T = 26;
      break
     }
    case 83:
     {
      c[z >> 2] = c[e >> 2];c[l >> 2] = c[z >> 2];sm(b, h, d, l, g, L);T = 26;
      break
     }
    case 84:
     {
      c[A >> 2] = c[d >> 2];c[B >> 2] = c[e >> 2];c[k >> 2] = c[A >> 2];c[l >> 2] = c[B >> 2];c[d >> 2] = Zl(b, k, l, f, g, h, 23543, 23551) | 0;T = 26;
      break
     }
    case 119:
     {
      c[C >> 2] = c[e >> 2];c[l >> 2] = c[C >> 2];tm(b, h + 24 | 0, d, l, g, L);T = 26;
      break
     }
    case 120:
     {
      U = c[(c[b >> 2] | 0) + 20 >> 2] | 0;c[D >> 2] = c[d >> 2];c[E >> 2] = c[e >> 2];c[k >> 2] = c[D >> 2];c[l >> 2] = c[E >> 2];k = ub[U & 63](b, k, l, f, g, h) | 0;
      break
     }
    case 88:
     {
      T = b + 8 | 0;T = wb[c[(c[T >> 2] | 0) + 24 >> 2] & 127](T) | 0;c[F >> 2] = c[d >> 2];c[G >> 2] = c[e >> 2];e = a[T >> 0] | 0;j = (e & 1) == 0;U = j ? T + 1 | 0 : c[T + 8 >> 2] | 0;T = U + (j ? (e & 255) >>> 1 : c[T + 4 >> 2] | 0) | 0;c[k >> 2] = c[F >> 2];c[l >> 2] = c[G >> 2];c[d >> 2] = Zl(b, k, l, f, g, h, U, T) | 0;T = 26;
      break
     }
    case 121:
     {
      c[I >> 2] = c[e >> 2];c[l >> 2] = c[I >> 2];im(b, h + 20 | 0, d, l, g, L);T = 26;
      break
     }
    case 89:
     {
      c[J >> 2] = c[e >> 2];c[l >> 2] = c[J >> 2];um(b, h + 20 | 0, d, l, g, L);T = 26;
      break
     }
    case 37:
     {
      c[K >> 2] = c[e >> 2];c[l >> 2] = c[K >> 2];vm(b, d, l, g, L);T = 26;
      break
     }
    default:
     {
      c[g >> 2] = c[g >> 2] | 4;T = 26
     }
   }
   while (0);
   if ((T | 0) == 26) k = c[d >> 2] | 0;
   i = S;
   return k | 0
  }

  function km(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = _q(d, a, f, g, 2) | 0;
   g = c[f >> 2] | 0;
   if ((a + -1 | 0) >>> 0 < 31 & (g & 4 | 0) == 0) c[b >> 2] = a;
   else c[f >> 2] = g | 4;
   i = h;
   return
  }

  function lm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = _q(d, a, f, g, 2) | 0;
   g = c[f >> 2] | 0;
   if ((a | 0) < 24 & (g & 4 | 0) == 0) c[b >> 2] = a;
   else c[f >> 2] = g | 4;
   i = h;
   return
  }

  function mm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = _q(d, a, f, g, 2) | 0;
   g = c[f >> 2] | 0;
   if ((a + -1 | 0) >>> 0 < 12 & (g & 4 | 0) == 0) c[b >> 2] = a;
   else c[f >> 2] = g | 4;
   i = h;
   return
  }

  function nm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = _q(d, a, f, g, 3) | 0;
   g = c[f >> 2] | 0;
   if ((a | 0) < 366 & (g & 4 | 0) == 0) c[b >> 2] = a;
   else c[f >> 2] = g | 4;
   i = h;
   return
  }

  function om(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = _q(d, a, f, g, 2) | 0;
   g = c[f >> 2] | 0;
   if ((a | 0) < 13 & (g & 4 | 0) == 0) c[b >> 2] = a + -1;
   else c[f >> 2] = g | 4;
   i = h;
   return
  }

  function pm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = _q(d, a, f, g, 2) | 0;
   g = c[f >> 2] | 0;
   if ((a | 0) < 60 & (g & 4 | 0) == 0) c[b >> 2] = a;
   else c[f >> 2] = g | 4;
   i = h;
   return
  }

  function qm(a, e, f, g, h) {
   a = a | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var i = 0,
    j = 0,
    k = 0;
   j = h + 8 | 0;
   a: while (1) {
    h = c[e >> 2] | 0;
    do
     if (h) {
      if ((c[h + 12 >> 2] | 0) == (c[h + 16 >> 2] | 0))
       if ((wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0) == -1) {
        c[e >> 2] = 0;
        h = 0;
        break
       } else {
        h = c[e >> 2] | 0;
        break
       }
     } else h = 0;
    while (0);
    h = (h | 0) == 0;
    a = c[f >> 2] | 0;
    do
     if (a) {
      if ((c[a + 12 >> 2] | 0) != (c[a + 16 >> 2] | 0))
       if (h) break;
       else break a;
      if ((wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0) != -1)
       if (h) break;
       else break a;
      else {
       c[f >> 2] = 0;
       k = 12;
       break
      }
     } else k = 12;
    while (0);
    if ((k | 0) == 12) {
     k = 0;
     if (h) {
      a = 0;
      break
     } else a = 0
    }
    h = c[e >> 2] | 0;
    i = c[h + 12 >> 2] | 0;
    if ((i | 0) == (c[h + 16 >> 2] | 0)) h = wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0;
    else h = d[i >> 0] | 0;
    if ((h & 255) << 24 >> 24 <= -1) break;
    if (!(b[(c[j >> 2] | 0) + (h << 24 >> 24 << 1) >> 1] & 8192)) break;
    h = c[e >> 2] | 0;
    a = h + 12 | 0;
    i = c[a >> 2] | 0;
    if ((i | 0) == (c[h + 16 >> 2] | 0)) {
     wb[c[(c[h >> 2] | 0) + 40 >> 2] & 127](h) | 0;
     continue
    } else {
     c[a >> 2] = i + 1;
     continue
    }
   }
   h = c[e >> 2] | 0;
   do
    if (h) {
     if ((c[h + 12 >> 2] | 0) == (c[h + 16 >> 2] | 0))
      if ((wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0) == -1) {
       c[e >> 2] = 0;
       h = 0;
       break
      } else {
       h = c[e >> 2] | 0;
       break
      }
    } else h = 0;
   while (0);
   h = (h | 0) == 0;
   do
    if (a) {
     if ((c[a + 12 >> 2] | 0) == (c[a + 16 >> 2] | 0) ? (wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0) == -1 : 0) {
      c[f >> 2] = 0;
      k = 32;
      break
     }
     if (!h) k = 33
    } else k = 32;
   while (0);
   if ((k | 0) == 32 ? h : 0) k = 33;
   if ((k | 0) == 33) c[g >> 2] = c[g >> 2] | 2;
   return
  }

  function rm(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0;
   n = i;
   i = i + 16 | 0;
   k = n + 4 | 0;
   l = n;
   m = b + 8 | 0;
   m = wb[c[(c[m >> 2] | 0) + 8 >> 2] & 127](m) | 0;
   b = a[m >> 0] | 0;
   if (!(b & 1)) j = (b & 255) >>> 1;
   else j = c[m + 4 >> 2] | 0;
   b = a[m + 12 >> 0] | 0;
   if (!(b & 1)) b = (b & 255) >>> 1;
   else b = c[m + 16 >> 2] | 0;
   do
    if ((j | 0) != (0 - b | 0)) {
     c[l >> 2] = c[f >> 2];
     c[k >> 2] = c[l >> 2];
     b = Cq(e, k, m, m + 24 | 0, h, g, 0) | 0;
     j = c[d >> 2] | 0;
     if ((b | 0) == (m | 0) & (j | 0) == 12) {
      c[d >> 2] = 0;
      break
     }
     if ((j | 0) < 12 & (b - m | 0) == 12) c[d >> 2] = j + 12
    } else c[g >> 2] = c[g >> 2] | 4;
   while (0);
   i = n;
   return
  }

  function sm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = _q(d, a, f, g, 2) | 0;
   g = c[f >> 2] | 0;
   if ((a | 0) < 61 & (g & 4 | 0) == 0) c[b >> 2] = a;
   else c[f >> 2] = g | 4;
   i = h;
   return
  }

  function tm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = _q(d, a, f, g, 1) | 0;
   g = c[f >> 2] | 0;
   if ((a | 0) < 7 & (g & 4 | 0) == 0) c[b >> 2] = a;
   else c[f >> 2] = g | 4;
   i = h;
   return
  }

  function um(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = _q(d, a, f, g, 4) | 0;
   if (!(c[f >> 2] & 4)) c[b >> 2] = a + -1900;
   i = h;
   return
  }

  function vm(a, b, e, f, g) {
   a = a | 0;
   b = b | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    i = 0,
    j = 0;
   a = c[b >> 2] | 0;
   do
    if (a) {
     if ((c[a + 12 >> 2] | 0) == (c[a + 16 >> 2] | 0))
      if ((wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0) == -1) {
       c[b >> 2] = 0;
       a = 0;
       break
      } else {
       a = c[b >> 2] | 0;
       break
      }
    } else a = 0;
   while (0);
   h = (a | 0) == 0;
   a = c[e >> 2] | 0;
   do
    if (a) {
     if ((c[a + 12 >> 2] | 0) == (c[a + 16 >> 2] | 0) ? (wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0) == -1 : 0) {
      c[e >> 2] = 0;
      j = 11;
      break
     }
     if (h) {
      i = a;
      j = 13
     } else j = 12
    } else j = 11;
   while (0);
   if ((j | 0) == 11)
    if (h) j = 12;
    else {
     i = 0;
     j = 13
    }
   a: do
    if ((j | 0) == 12) c[f >> 2] = c[f >> 2] | 6;
    else
   if ((j | 0) == 13) {
    a = c[b >> 2] | 0;
    h = c[a + 12 >> 2] | 0;
    if ((h | 0) == (c[a + 16 >> 2] | 0)) a = wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0;
    else a = d[h >> 0] | 0;
    if ((pb[c[(c[g >> 2] | 0) + 36 >> 2] & 31](g, a & 255, 0) | 0) << 24 >> 24 != 37) {
     c[f >> 2] = c[f >> 2] | 4;
     break
    }
    a = c[b >> 2] | 0;
    h = a + 12 | 0;
    g = c[h >> 2] | 0;
    if ((g | 0) == (c[a + 16 >> 2] | 0)) {
     wb[c[(c[a >> 2] | 0) + 40 >> 2] & 127](a) | 0;
     a = c[b >> 2] | 0;
     if (!a) a = 0;
     else j = 21
    } else {
     c[h >> 2] = g + 1;
     j = 21
    }
    do
     if ((j | 0) == 21)
      if ((c[a + 12 >> 2] | 0) == (c[a + 16 >> 2] | 0))
       if ((wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0) == -1) {
        c[b >> 2] = 0;
        a = 0;
        break
       } else {
        a = c[b >> 2] | 0;
        break
       }
    while (0);
    a = (a | 0) == 0;
    do
     if (i) {
      if ((c[i + 12 >> 2] | 0) == (c[i + 16 >> 2] | 0) ? (wb[c[(c[i >> 2] | 0) + 36 >> 2] & 127](i) | 0) == -1 : 0) {
       c[e >> 2] = 0;
       j = 30;
       break
      }
      if (a) break a
     } else j = 30;
    while (0);
    if ((j | 0) == 30 ? !a : 0) break;
    c[f >> 2] = c[f >> 2] | 2
   }
   while (0);
   return
  }

  function wm(a, b, d, e, f, g, h, j) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0;
   w = i;
   i = i + 32 | 0;
   r = w + 16 | 0;
   q = w + 12 | 0;
   u = w + 8 | 0;
   s = w + 4 | 0;
   t = w;
   k = Xj(e) | 0;
   c[u >> 2] = k;
   u = Qo(u, 9328) | 0;
   gs(k) | 0;
   c[f >> 2] = 0;
   k = c[b >> 2] | 0;
   a: do
    if ((h | 0) != (j | 0)) {
     b: while (1) {
      m = k;
      if (k) {
       l = c[k + 12 >> 2] | 0;
       if ((l | 0) == (c[k + 16 >> 2] | 0)) l = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
       else l = c[l >> 2] | 0;
       if ((l | 0) == -1) {
        c[b >> 2] = 0;
        k = 0;
        o = 1;
        p = 0
       } else {
        o = 0;
        p = m
       }
      } else {
       k = 0;
       o = 1;
       p = m
      }
      n = c[d >> 2] | 0;
      l = n;
      do
       if (n) {
        m = c[n + 12 >> 2] | 0;
        if ((m | 0) == (c[n + 16 >> 2] | 0)) m = wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0;
        else m = c[m >> 2] | 0;
        if ((m | 0) != -1)
         if (o) break;
         else {
          v = 16;
          break b
         } else {
         c[d >> 2] = 0;
         l = 0;
         v = 14;
         break
        }
       } else v = 14;
      while (0);
      if ((v | 0) == 14) {
       v = 0;
       if (o) {
        v = 16;
        break
       } else n = 0
      }
      c: do
       if ((pb[c[(c[u >> 2] | 0) + 52 >> 2] & 31](u, c[h >> 2] | 0, 0) | 0) << 24 >> 24 == 37) {
        m = h + 4 | 0;
        if ((m | 0) == (j | 0)) {
         v = 19;
         break b
        }
        o = pb[c[(c[u >> 2] | 0) + 52 >> 2] & 31](u, c[m >> 2] | 0, 0) | 0;
        switch (o << 24 >> 24) {
         case 48:
         case 69:
          {
           n = h + 8 | 0;
           if ((n | 0) == (j | 0)) {
            v = 22;
            break b
           }
           h = m;m = pb[c[(c[u >> 2] | 0) + 52 >> 2] & 31](u, c[n >> 2] | 0, 0) | 0;k = o;
           break
          }
         default:
          {
           m = o;k = 0
          }
        }
        o = c[(c[a >> 2] | 0) + 36 >> 2] | 0;
        c[s >> 2] = p;
        c[t >> 2] = l;
        c[q >> 2] = c[s >> 2];
        c[r >> 2] = c[t >> 2];
        c[b >> 2] = zb[o & 15](a, q, r, e, f, g, m, k) | 0;
        h = h + 8 | 0
       } else {
        if (!(pb[c[(c[u >> 2] | 0) + 12 >> 2] & 31](u, 8192, c[h >> 2] | 0) | 0)) {
         m = k + 12 | 0;
         l = c[m >> 2] | 0;
         n = k + 16 | 0;
         if ((l | 0) == (c[n >> 2] | 0)) l = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
         else l = c[l >> 2] | 0;
         p = Cb[c[(c[u >> 2] | 0) + 28 >> 2] & 15](u, l) | 0;
         if ((p | 0) != (Cb[c[(c[u >> 2] | 0) + 28 >> 2] & 15](u, c[h >> 2] | 0) | 0)) {
          v = 59;
          break b
         }
         l = c[m >> 2] | 0;
         if ((l | 0) == (c[n >> 2] | 0)) wb[c[(c[k >> 2] | 0) + 40 >> 2] & 127](k) | 0;
         else c[m >> 2] = l + 4;
         h = h + 4 | 0;
         break
        }
        do {
         h = h + 4 | 0;
         if ((h | 0) == (j | 0)) {
          h = j;
          break
         }
        } while (pb[c[(c[u >> 2] | 0) + 12 >> 2] & 31](u, 8192, c[h >> 2] | 0) | 0);
        l = n;
        o = n;
        while (1) {
         if (k) {
          m = c[k + 12 >> 2] | 0;
          if ((m | 0) == (c[k + 16 >> 2] | 0)) m = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
          else m = c[m >> 2] | 0;
          if ((m | 0) == -1) {
           c[b >> 2] = 0;
           n = 1;
           k = 0
          } else n = 0
         } else {
          n = 1;
          k = 0
         }
         do
          if (o) {
           m = c[o + 12 >> 2] | 0;
           if ((m | 0) == (c[o + 16 >> 2] | 0)) m = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
           else m = c[m >> 2] | 0;
           if ((m | 0) != -1)
            if (n ^ (l | 0) == 0) {
             p = l;
             o = l;
             break
            } else break c;
           else {
            c[d >> 2] = 0;
            l = 0;
            v = 42;
            break
           }
          } else v = 42;
         while (0);
         if ((v | 0) == 42) {
          v = 0;
          if (n) break c;
          else {
           p = l;
           o = 0
          }
         }
         m = k + 12 | 0;
         l = c[m >> 2] | 0;
         n = k + 16 | 0;
         if ((l | 0) == (c[n >> 2] | 0)) l = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
         else l = c[l >> 2] | 0;
         if (!(pb[c[(c[u >> 2] | 0) + 12 >> 2] & 31](u, 8192, l) | 0)) break c;
         l = c[m >> 2] | 0;
         if ((l | 0) == (c[n >> 2] | 0)) {
          wb[c[(c[k >> 2] | 0) + 40 >> 2] & 127](k) | 0;
          l = p;
          continue
         } else {
          c[m >> 2] = l + 4;
          l = p;
          continue
         }
        }
       }
      while (0);
      k = c[b >> 2] | 0;
      if (!((h | 0) != (j | 0) & (c[f >> 2] | 0) == 0)) break a
     }
     if ((v | 0) == 16) {
      c[f >> 2] = 4;
      break
     } else if ((v | 0) == 19) {
      c[f >> 2] = 4;
      break
     } else if ((v | 0) == 22) {
      c[f >> 2] = 4;
      break
     } else if ((v | 0) == 59) {
      c[f >> 2] = 4;
      k = c[b >> 2] | 0;
      break
     }
    }
   while (0);
   if (k) {
    h = c[k + 12 >> 2] | 0;
    if ((h | 0) == (c[k + 16 >> 2] | 0)) h = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
    else h = c[h >> 2] | 0;
    if ((h | 0) == -1) {
     c[b >> 2] = 0;
     k = 0;
     m = 1
    } else m = 0
   } else {
    k = 0;
    m = 1
   }
   h = c[d >> 2] | 0;
   do
    if (h) {
     l = c[h + 12 >> 2] | 0;
     if ((l | 0) == (c[h + 16 >> 2] | 0)) h = wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0;
     else h = c[l >> 2] | 0;
     if ((h | 0) != -1)
      if (m) break;
      else {
       v = 74;
       break
      } else {
      c[d >> 2] = 0;
      v = 72;
      break
     }
    } else v = 72;
   while (0);
   if ((v | 0) == 72 ? m : 0) v = 74;
   if ((v | 0) == 74) c[f >> 2] = c[f >> 2] | 2;
   i = w;
   return k | 0
  }

  function xm(a) {
   a = a | 0;
   return
  }

  function ym(a) {
   a = a | 0;
   mh(a);
   return
  }

  function zm(a) {
   a = a | 0;
   return 2
  }

  function Am(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = wm(a, k, j, e, f, g, 9904, 9936) | 0;
   i = h;
   return a | 0
  }

  function Bm(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0;
   j = i;
   i = i + 16 | 0;
   k = j + 12 | 0;
   l = j + 8 | 0;
   n = j + 4 | 0;
   m = j;
   q = b + 8 | 0;
   q = wb[c[(c[q >> 2] | 0) + 20 >> 2] & 127](q) | 0;
   c[n >> 2] = c[d >> 2];
   c[m >> 2] = c[e >> 2];
   o = a[q >> 0] | 0;
   p = (o & 1) == 0;
   e = q + 4 | 0;
   d = p ? e : c[q + 8 >> 2] | 0;
   e = d + ((p ? (o & 255) >>> 1 : c[e >> 2] | 0) << 2) | 0;
   c[l >> 2] = c[n >> 2];
   c[k >> 2] = c[m >> 2];
   b = wm(b, l, k, f, g, h, d, e) | 0;
   i = j;
   return b | 0
  }

  function Cm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 8 | 0;
   m = h + 4 | 0;
   k = h;
   l = Xj(e) | 0;
   c[m >> 2] = l;
   e = Qo(m, 9328) | 0;
   gs(l) | 0;
   c[k >> 2] = c[d >> 2];
   c[j >> 2] = c[k >> 2];
   Dm(a, g + 24 | 0, b, j, f, e);
   i = h;
   return c[b >> 2] | 0
  }

  function Dm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 4 | 0;
   k = h;
   a = a + 8 | 0;
   a = wb[c[c[a >> 2] >> 2] & 127](a) | 0;
   c[k >> 2] = c[e >> 2];
   c[j >> 2] = c[k >> 2];
   g = (Nq(d, j, a, a + 168 | 0, g, f, 0) | 0) - a | 0;
   if ((g | 0) < 168) c[b >> 2] = ((g | 0) / 12 | 0 | 0) % 7 | 0;
   i = h;
   return
  }

  function Em(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 8 | 0;
   m = h + 4 | 0;
   k = h;
   l = Xj(e) | 0;
   c[m >> 2] = l;
   e = Qo(m, 9328) | 0;
   gs(l) | 0;
   c[k >> 2] = c[d >> 2];
   c[j >> 2] = c[k >> 2];
   Fm(a, g + 16 | 0, b, j, f, e);
   i = h;
   return c[b >> 2] | 0
  }

  function Fm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 4 | 0;
   k = h;
   a = a + 8 | 0;
   a = wb[c[(c[a >> 2] | 0) + 4 >> 2] & 127](a) | 0;
   c[k >> 2] = c[e >> 2];
   c[j >> 2] = c[k >> 2];
   g = (Nq(d, j, a, a + 288 | 0, g, f, 0) | 0) - a | 0;
   if ((g | 0) < 288) c[b >> 2] = ((g | 0) / 12 | 0 | 0) % 12 | 0;
   i = h;
   return
  }

  function Gm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 8 | 0;
   m = h + 4 | 0;
   k = h;
   l = Xj(e) | 0;
   c[m >> 2] = l;
   e = Qo(m, 9328) | 0;
   gs(l) | 0;
   c[k >> 2] = c[d >> 2];
   c[j >> 2] = c[k >> 2];
   Hm(a, g + 20 | 0, b, j, f, e);
   i = h;
   return c[b >> 2] | 0
  }

  function Hm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = $q(d, a, f, g, 4) | 0;
   if (!(c[f >> 2] & 4)) {
    if ((a | 0) < 69) a = a + 2e3 | 0;
    else a = (a + -69 | 0) >>> 0 < 31 ? a + 1900 | 0 : a;
    c[b >> 2] = a + -1900
   }
   i = h;
   return
  }

  function Im(b, d, e, f, g, h, j, k) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   k = k | 0;
   var l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0,
    F = 0,
    G = 0,
    H = 0,
    I = 0,
    J = 0,
    K = 0,
    L = 0,
    M = 0,
    N = 0,
    O = 0,
    P = 0,
    Q = 0,
    R = 0,
    S = 0,
    T = 0,
    U = 0;
   S = i;
   i = i + 144 | 0;
   l = S + 132 | 0;
   k = S + 116 | 0;
   L = S + 128 | 0;
   w = S + 124 | 0;
   H = S + 120 | 0;
   M = S + 112 | 0;
   N = S + 108 | 0;
   O = S + 104 | 0;
   P = S + 100 | 0;
   Q = S + 96 | 0;
   R = S + 92 | 0;
   m = S + 88 | 0;
   n = S + 84 | 0;
   o = S + 80 | 0;
   p = S + 76 | 0;
   q = S + 72 | 0;
   r = S + 68 | 0;
   s = S + 64 | 0;
   t = S + 60 | 0;
   u = S + 56 | 0;
   v = S + 52 | 0;
   x = S + 48 | 0;
   y = S + 44 | 0;
   z = S + 40 | 0;
   A = S + 36 | 0;
   B = S + 32 | 0;
   C = S + 28 | 0;
   D = S + 24 | 0;
   E = S + 20 | 0;
   F = S + 16 | 0;
   G = S + 12 | 0;
   I = S + 8 | 0;
   J = S + 4 | 0;
   K = S;
   c[g >> 2] = 0;
   U = Xj(f) | 0;
   c[L >> 2] = U;
   L = Qo(L, 9328) | 0;
   gs(U) | 0;
   do switch (j << 24 >> 24 | 0) {
    case 65:
    case 97:
     {
      c[w >> 2] = c[e >> 2];c[l >> 2] = c[w >> 2];Dm(b, h + 24 | 0, d, l, g, L);T = 26;
      break
     }
    case 104:
    case 66:
    case 98:
     {
      c[H >> 2] = c[e >> 2];c[l >> 2] = c[H >> 2];Fm(b, h + 16 | 0, d, l, g, L);T = 26;
      break
     }
    case 99:
     {
      U = b + 8 | 0;U = wb[c[(c[U >> 2] | 0) + 12 >> 2] & 127](U) | 0;c[M >> 2] = c[d >> 2];c[N >> 2] = c[e >> 2];e = a[U >> 0] | 0;j = (e & 1) == 0;T = U + 4 | 0;U = j ? T : c[U + 8 >> 2] | 0;T = U + ((j ? (e & 255) >>> 1 : c[T >> 2] | 0) << 2) | 0;c[k >> 2] = c[M >> 2];c[l >> 2] = c[N >> 2];c[d >> 2] = wm(b, k, l, f, g, h, U, T) | 0;T = 26;
      break
     }
    case 101:
    case 100:
     {
      c[O >> 2] = c[e >> 2];c[l >> 2] = c[O >> 2];Jm(b, h + 12 | 0, d, l, g, L);T = 26;
      break
     }
    case 68:
     {
      c[P >> 2] = c[d >> 2];c[Q >> 2] = c[e >> 2];c[k >> 2] = c[P >> 2];c[l >> 2] = c[Q >> 2];c[d >> 2] = wm(b, k, l, f, g, h, 9936, 9968) | 0;T = 26;
      break
     }
    case 70:
     {
      c[R >> 2] = c[d >> 2];c[m >> 2] = c[e >> 2];c[k >> 2] = c[R >> 2];c[l >> 2] = c[m >> 2];c[d >> 2] = wm(b, k, l, f, g, h, 9968, 1e4) | 0;T = 26;
      break
     }
    case 72:
     {
      c[n >> 2] = c[e >> 2];c[l >> 2] = c[n >> 2];Km(b, h + 8 | 0, d, l, g, L);T = 26;
      break
     }
    case 73:
     {
      c[o >> 2] = c[e >> 2];c[l >> 2] = c[o >> 2];Lm(b, h + 8 | 0, d, l, g, L);T = 26;
      break
     }
    case 106:
     {
      c[p >> 2] = c[e >> 2];c[l >> 2] = c[p >> 2];Mm(b, h + 28 | 0, d, l, g, L);T = 26;
      break
     }
    case 109:
     {
      c[q >> 2] = c[e >> 2];c[l >> 2] = c[q >> 2];Nm(b, h + 16 | 0, d, l, g, L);T = 26;
      break
     }
    case 77:
     {
      c[r >> 2] = c[e >> 2];c[l >> 2] = c[r >> 2];Om(b, h + 4 | 0, d, l, g, L);T = 26;
      break
     }
    case 116:
    case 110:
     {
      c[s >> 2] = c[e >> 2];c[l >> 2] = c[s >> 2];Pm(b, d, l, g, L);T = 26;
      break
     }
    case 112:
     {
      c[t >> 2] = c[e >> 2];c[l >> 2] = c[t >> 2];Qm(b, h + 8 | 0, d, l, g, L);T = 26;
      break
     }
    case 114:
     {
      c[u >> 2] = c[d >> 2];c[v >> 2] = c[e >> 2];c[k >> 2] = c[u >> 2];c[l >> 2] = c[v >> 2];c[d >> 2] = wm(b, k, l, f, g, h, 1e4, 10044) | 0;T = 26;
      break
     }
    case 82:
     {
      c[x >> 2] = c[d >> 2];c[y >> 2] = c[e >> 2];c[k >> 2] = c[x >> 2];c[l >> 2] = c[y >> 2];c[d >> 2] = wm(b, k, l, f, g, h, 10044, 10064) | 0;T = 26;
      break
     }
    case 83:
     {
      c[z >> 2] = c[e >> 2];c[l >> 2] = c[z >> 2];Rm(b, h, d, l, g, L);T = 26;
      break
     }
    case 84:
     {
      c[A >> 2] = c[d >> 2];c[B >> 2] = c[e >> 2];c[k >> 2] = c[A >> 2];c[l >> 2] = c[B >> 2];c[d >> 2] = wm(b, k, l, f, g, h, 10064, 10096) | 0;T = 26;
      break
     }
    case 119:
     {
      c[C >> 2] = c[e >> 2];c[l >> 2] = c[C >> 2];Sm(b, h + 24 | 0, d, l, g, L);T = 26;
      break
     }
    case 120:
     {
      U = c[(c[b >> 2] | 0) + 20 >> 2] | 0;c[D >> 2] = c[d >> 2];c[E >> 2] = c[e >> 2];c[k >> 2] = c[D >> 2];c[l >> 2] = c[E >> 2];k = ub[U & 63](b, k, l, f, g, h) | 0;
      break
     }
    case 88:
     {
      U = b + 8 | 0;U = wb[c[(c[U >> 2] | 0) + 24 >> 2] & 127](U) | 0;c[F >> 2] = c[d >> 2];c[G >> 2] = c[e >> 2];e = a[U >> 0] | 0;j = (e & 1) == 0;T = U + 4 | 0;U = j ? T : c[U + 8 >> 2] | 0;T = U + ((j ? (e & 255) >>> 1 : c[T >> 2] | 0) << 2) | 0;c[k >> 2] = c[F >> 2];c[l >> 2] = c[G >> 2];c[d >> 2] = wm(b, k, l, f, g, h, U, T) | 0;T = 26;
      break
     }
    case 121:
     {
      c[I >> 2] = c[e >> 2];c[l >> 2] = c[I >> 2];Hm(b, h + 20 | 0, d, l, g, L);T = 26;
      break
     }
    case 89:
     {
      c[J >> 2] = c[e >> 2];c[l >> 2] = c[J >> 2];Tm(b, h + 20 | 0, d, l, g, L);T = 26;
      break
     }
    case 37:
     {
      c[K >> 2] = c[e >> 2];c[l >> 2] = c[K >> 2];Um(b, d, l, g, L);T = 26;
      break
     }
    default:
     {
      c[g >> 2] = c[g >> 2] | 4;T = 26
     }
   }
   while (0);
   if ((T | 0) == 26) k = c[d >> 2] | 0;
   i = S;
   return k | 0
  }

  function Jm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = $q(d, a, f, g, 2) | 0;
   g = c[f >> 2] | 0;
   if ((a + -1 | 0) >>> 0 < 31 & (g & 4 | 0) == 0) c[b >> 2] = a;
   else c[f >> 2] = g | 4;
   i = h;
   return
  }

  function Km(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = $q(d, a, f, g, 2) | 0;
   g = c[f >> 2] | 0;
   if ((a | 0) < 24 & (g & 4 | 0) == 0) c[b >> 2] = a;
   else c[f >> 2] = g | 4;
   i = h;
   return
  }

  function Lm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = $q(d, a, f, g, 2) | 0;
   g = c[f >> 2] | 0;
   if ((a + -1 | 0) >>> 0 < 12 & (g & 4 | 0) == 0) c[b >> 2] = a;
   else c[f >> 2] = g | 4;
   i = h;
   return
  }

  function Mm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = $q(d, a, f, g, 3) | 0;
   g = c[f >> 2] | 0;
   if ((a | 0) < 366 & (g & 4 | 0) == 0) c[b >> 2] = a;
   else c[f >> 2] = g | 4;
   i = h;
   return
  }

  function Nm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = $q(d, a, f, g, 2) | 0;
   g = c[f >> 2] | 0;
   if ((a | 0) < 13 & (g & 4 | 0) == 0) c[b >> 2] = a + -1;
   else c[f >> 2] = g | 4;
   i = h;
   return
  }

  function Om(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = $q(d, a, f, g, 2) | 0;
   g = c[f >> 2] | 0;
   if ((a | 0) < 60 & (g & 4 | 0) == 0) c[b >> 2] = a;
   else c[f >> 2] = g | 4;
   i = h;
   return
  }

  function Pm(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    i = 0;
   a: while (1) {
    a = c[b >> 2] | 0;
    do
     if (a) {
      g = c[a + 12 >> 2] | 0;
      if ((g | 0) == (c[a + 16 >> 2] | 0)) a = wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0;
      else a = c[g >> 2] | 0;
      if ((a | 0) == -1) {
       c[b >> 2] = 0;
       h = 1;
       break
      } else {
       h = (c[b >> 2] | 0) == 0;
       break
      }
     } else h = 1;
    while (0);
    g = c[d >> 2] | 0;
    do
     if (g) {
      a = c[g + 12 >> 2] | 0;
      if ((a | 0) == (c[g + 16 >> 2] | 0)) a = wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0;
      else a = c[a >> 2] | 0;
      if ((a | 0) != -1)
       if (h) {
        h = g;
        break
       } else {
        h = g;
        break a
       } else {
       c[d >> 2] = 0;
       i = 15;
       break
      }
     } else i = 15;
    while (0);
    if ((i | 0) == 15) {
     i = 0;
     if (h) {
      h = 0;
      break
     } else h = 0
    }
    a = c[b >> 2] | 0;
    g = c[a + 12 >> 2] | 0;
    if ((g | 0) == (c[a + 16 >> 2] | 0)) a = wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0;
    else a = c[g >> 2] | 0;
    if (!(pb[c[(c[f >> 2] | 0) + 12 >> 2] & 31](f, 8192, a) | 0)) break;
    a = c[b >> 2] | 0;
    g = a + 12 | 0;
    h = c[g >> 2] | 0;
    if ((h | 0) == (c[a + 16 >> 2] | 0)) {
     wb[c[(c[a >> 2] | 0) + 40 >> 2] & 127](a) | 0;
     continue
    } else {
     c[g >> 2] = h + 4;
     continue
    }
   }
   a = c[b >> 2] | 0;
   do
    if (a) {
     g = c[a + 12 >> 2] | 0;
     if ((g | 0) == (c[a + 16 >> 2] | 0)) a = wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0;
     else a = c[g >> 2] | 0;
     if ((a | 0) == -1) {
      c[b >> 2] = 0;
      g = 1;
      break
     } else {
      g = (c[b >> 2] | 0) == 0;
      break
     }
    } else g = 1;
   while (0);
   do
    if (h) {
     a = c[h + 12 >> 2] | 0;
     if ((a | 0) == (c[h + 16 >> 2] | 0)) a = wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0;
     else a = c[a >> 2] | 0;
     if ((a | 0) != -1)
      if (g) break;
      else {
       i = 39;
       break
      } else {
      c[d >> 2] = 0;
      i = 37;
      break
     }
    } else i = 37;
   while (0);
   if ((i | 0) == 37 ? g : 0) i = 39;
   if ((i | 0) == 39) c[e >> 2] = c[e >> 2] | 2;
   return
  }

  function Qm(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0;
   n = i;
   i = i + 16 | 0;
   k = n + 4 | 0;
   l = n;
   m = b + 8 | 0;
   m = wb[c[(c[m >> 2] | 0) + 8 >> 2] & 127](m) | 0;
   b = a[m >> 0] | 0;
   if (!(b & 1)) j = (b & 255) >>> 1;
   else j = c[m + 4 >> 2] | 0;
   b = a[m + 12 >> 0] | 0;
   if (!(b & 1)) b = (b & 255) >>> 1;
   else b = c[m + 16 >> 2] | 0;
   do
    if ((j | 0) != (0 - b | 0)) {
     c[l >> 2] = c[f >> 2];
     c[k >> 2] = c[l >> 2];
     b = Nq(e, k, m, m + 24 | 0, h, g, 0) | 0;
     j = c[d >> 2] | 0;
     if ((b | 0) == (m | 0) & (j | 0) == 12) {
      c[d >> 2] = 0;
      break
     }
     if ((j | 0) < 12 & (b - m | 0) == 12) c[d >> 2] = j + 12
    } else c[g >> 2] = c[g >> 2] | 4;
   while (0);
   i = n;
   return
  }

  function Rm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = $q(d, a, f, g, 2) | 0;
   g = c[f >> 2] | 0;
   if ((a | 0) < 61 & (g & 4 | 0) == 0) c[b >> 2] = a;
   else c[f >> 2] = g | 4;
   i = h;
   return
  }

  function Sm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = $q(d, a, f, g, 1) | 0;
   g = c[f >> 2] | 0;
   if ((a | 0) < 7 & (g & 4 | 0) == 0) c[b >> 2] = a;
   else c[f >> 2] = g | 4;
   i = h;
   return
  }

  function Tm(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   h = i;
   i = i + 16 | 0;
   a = h + 4 | 0;
   j = h;
   c[j >> 2] = c[e >> 2];
   c[a >> 2] = c[j >> 2];
   a = $q(d, a, f, g, 4) | 0;
   if (!(c[f >> 2] & 4)) c[b >> 2] = a + -1900;
   i = h;
   return
  }

  function Um(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    i = 0,
    j = 0;
   a = c[b >> 2] | 0;
   do
    if (a) {
     g = c[a + 12 >> 2] | 0;
     if ((g | 0) == (c[a + 16 >> 2] | 0)) a = wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0;
     else a = c[g >> 2] | 0;
     if ((a | 0) == -1) {
      c[b >> 2] = 0;
      h = 1;
      break
     } else {
      h = (c[b >> 2] | 0) == 0;
      break
     }
    } else h = 1;
   while (0);
   g = c[d >> 2] | 0;
   do
    if (g) {
     a = c[g + 12 >> 2] | 0;
     if ((a | 0) == (c[g + 16 >> 2] | 0)) a = wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0;
     else a = c[a >> 2] | 0;
     if ((a | 0) != -1)
      if (h) {
       i = g;
       j = 17;
       break
      } else {
       j = 16;
       break
      } else {
      c[d >> 2] = 0;
      j = 14;
      break
     }
    } else j = 14;
   while (0);
   if ((j | 0) == 14)
    if (h) j = 16;
    else {
     i = 0;
     j = 17
    }
   a: do
    if ((j | 0) == 16) c[e >> 2] = c[e >> 2] | 6;
    else
   if ((j | 0) == 17) {
    a = c[b >> 2] | 0;
    g = c[a + 12 >> 2] | 0;
    if ((g | 0) == (c[a + 16 >> 2] | 0)) a = wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0;
    else a = c[g >> 2] | 0;
    if ((pb[c[(c[f >> 2] | 0) + 52 >> 2] & 31](f, a, 0) | 0) << 24 >> 24 != 37) {
     c[e >> 2] = c[e >> 2] | 4;
     break
    }
    a = c[b >> 2] | 0;
    g = a + 12 | 0;
    h = c[g >> 2] | 0;
    if ((h | 0) == (c[a + 16 >> 2] | 0)) {
     wb[c[(c[a >> 2] | 0) + 40 >> 2] & 127](a) | 0;
     a = c[b >> 2] | 0;
     if (!a) g = 1;
     else j = 25
    } else {
     c[g >> 2] = h + 4;
     j = 25
    }
    do
     if ((j | 0) == 25) {
      g = c[a + 12 >> 2] | 0;
      if ((g | 0) == (c[a + 16 >> 2] | 0)) a = wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0;
      else a = c[g >> 2] | 0;
      if ((a | 0) == -1) {
       c[b >> 2] = 0;
       g = 1;
       break
      } else {
       g = (c[b >> 2] | 0) == 0;
       break
      }
     }
    while (0);
    do
     if (i) {
      a = c[i + 12 >> 2] | 0;
      if ((a | 0) == (c[i + 16 >> 2] | 0)) a = wb[c[(c[i >> 2] | 0) + 36 >> 2] & 127](i) | 0;
      else a = c[a >> 2] | 0;
      if ((a | 0) != -1)
       if (g) break a;
       else break;
      else {
       c[d >> 2] = 0;
       j = 37;
       break
      }
     } else j = 37;
    while (0);
    if ((j | 0) == 37 ? !g : 0) break;
    c[e >> 2] = c[e >> 2] | 2
   }
   while (0);
   return
  }

  function Vm(a) {
   a = a | 0;
   Wm(a + 8 | 0);
   return
  }

  function Wm(a) {
   a = a | 0;
   var b = 0;
   b = c[a >> 2] | 0;
   if ((b | 0) != (dl() | 0)) gi(c[a >> 2] | 0);
   return
  }

  function Xm(a) {
   a = a | 0;
   Wm(a + 8 | 0);
   mh(a);
   return
  }

  function Ym(b, d, e, f, g, h, j) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0;
   l = i;
   i = i + 112 | 0;
   k = l + 4 | 0;
   e = l;
   c[e >> 2] = k + 100;
   Zm(b + 8 | 0, k, e, g, h, j);
   j = c[e >> 2] | 0;
   e = c[d >> 2] | 0;
   if ((k | 0) != (j | 0))
    do {
     h = a[k >> 0] | 0;
     do
      if (e) {
       f = e + 24 | 0;
       g = c[f >> 2] | 0;
       if ((g | 0) == (c[e + 28 >> 2] | 0)) {
        d = (Cb[c[(c[e >> 2] | 0) + 52 >> 2] & 15](e, h & 255) | 0) == -1;
        e = d ? 0 : e;
        break
       } else {
        c[f >> 2] = g + 1;
        a[g >> 0] = h;
        break
       }
      } else e = 0;
     while (0);
     k = k + 1 | 0
    } while ((k | 0) != (j | 0));
   i = l;
   return e | 0
  }

  function Zm(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0;
   m = i;
   i = i + 16 | 0;
   l = m;
   a[l >> 0] = 37;
   j = l + 1 | 0;
   a[j >> 0] = g;
   k = l + 2 | 0;
   a[k >> 0] = h;
   a[l + 3 >> 0] = 0;
   if (h << 24 >> 24) {
    a[j >> 0] = h;
    a[k >> 0] = g
   }
   c[e >> 2] = d + (Ia(d | 0, (c[e >> 2] | 0) - d | 0, l | 0, f | 0, c[b >> 2] | 0) | 0);
   i = m;
   return
  }

  function _m(a) {
   a = a | 0;
   Wm(a + 8 | 0);
   return
  }

  function $m(a) {
   a = a | 0;
   Wm(a + 8 | 0);
   mh(a);
   return
  }

  function an(a, b, d, e, f, g, h) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0;
   j = i;
   i = i + 416 | 0;
   e = j + 8 | 0;
   d = j;
   c[d >> 2] = e + 400;
   bn(a + 8 | 0, e, d, f, g, h);
   a = c[d >> 2] | 0;
   d = c[b >> 2] | 0;
   if ((e | 0) != (a | 0)) {
    h = e;
    do {
     e = c[h >> 2] | 0;
     if (!d) d = 0;
     else {
      f = d + 24 | 0;
      g = c[f >> 2] | 0;
      if ((g | 0) == (c[d + 28 >> 2] | 0)) e = Cb[c[(c[d >> 2] | 0) + 52 >> 2] & 15](d, e) | 0;
      else {
       c[f >> 2] = g + 4;
       c[g >> 2] = e
      }
      d = (e | 0) == -1 ? 0 : d
     }
     h = h + 4 | 0
    } while ((h | 0) != (a | 0))
   }
   i = j;
   return d | 0
  }

  function bn(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 128 | 0;
   l = h + 16 | 0;
   m = h + 12 | 0;
   j = h;
   k = h + 8 | 0;
   c[m >> 2] = l + 100;
   Zm(a, l, m, e, f, g);
   f = j;
   c[f >> 2] = 0;
   c[f + 4 >> 2] = 0;
   c[k >> 2] = l;
   f = (c[d >> 2] | 0) - b >> 2;
   e = ki(c[a >> 2] | 0) | 0;
   f = xi(b, k, f, j) | 0;
   if (e) ki(e) | 0;
   c[d >> 2] = b + (f << 2);
   i = h;
   return
  }

  function cn(a) {
   a = a | 0;
   return
  }

  function dn(a) {
   a = a | 0;
   mh(a);
   return
  }

  function en(a) {
   a = a | 0;
   return 127
  }

  function fn(a) {
   a = a | 0;
   return 127
  }

  function gn(a, b) {
   a = a | 0;
   b = b | 0;
   c[a >> 2] = 0;
   c[a + 4 >> 2] = 0;
   c[a + 8 >> 2] = 0;
   return
  }

  function hn(a, b) {
   a = a | 0;
   b = b | 0;
   c[a >> 2] = 0;
   c[a + 4 >> 2] = 0;
   c[a + 8 >> 2] = 0;
   return
  }

  function jn(a, b) {
   a = a | 0;
   b = b | 0;
   c[a >> 2] = 0;
   c[a + 4 >> 2] = 0;
   c[a + 8 >> 2] = 0;
   return
  }

  function kn(a, b) {
   a = a | 0;
   b = b | 0;
   tj(a, 1, 45);
   return
  }

  function ln(a) {
   a = a | 0;
   return 0
  }

  function mn(b, c) {
   b = b | 0;
   c = c | 0;
   a[b >> 0] = 2;
   a[b + 1 >> 0] = 3;
   a[b + 2 >> 0] = 0;
   a[b + 3 >> 0] = 4;
   return
  }

  function nn(b, c) {
   b = b | 0;
   c = c | 0;
   a[b >> 0] = 2;
   a[b + 1 >> 0] = 3;
   a[b + 2 >> 0] = 0;
   a[b + 3 >> 0] = 4;
   return
  }

  function on(a) {
   a = a | 0;
   return
  }

  function pn(a) {
   a = a | 0;
   mh(a);
   return
  }

  function qn(a) {
   a = a | 0;
   return 127
  }

  function rn(a) {
   a = a | 0;
   return 127
  }

  function sn(a, b) {
   a = a | 0;
   b = b | 0;
   c[a >> 2] = 0;
   c[a + 4 >> 2] = 0;
   c[a + 8 >> 2] = 0;
   return
  }

  function tn(a, b) {
   a = a | 0;
   b = b | 0;
   c[a >> 2] = 0;
   c[a + 4 >> 2] = 0;
   c[a + 8 >> 2] = 0;
   return
  }

  function un(a, b) {
   a = a | 0;
   b = b | 0;
   c[a >> 2] = 0;
   c[a + 4 >> 2] = 0;
   c[a + 8 >> 2] = 0;
   return
  }

  function vn(a, b) {
   a = a | 0;
   b = b | 0;
   tj(a, 1, 45);
   return
  }

  function wn(a) {
   a = a | 0;
   return 0
  }

  function xn(b, c) {
   b = b | 0;
   c = c | 0;
   a[b >> 0] = 2;
   a[b + 1 >> 0] = 3;
   a[b + 2 >> 0] = 0;
   a[b + 3 >> 0] = 4;
   return
  }

  function yn(b, c) {
   b = b | 0;
   c = c | 0;
   a[b >> 0] = 2;
   a[b + 1 >> 0] = 3;
   a[b + 2 >> 0] = 0;
   a[b + 3 >> 0] = 4;
   return
  }

  function zn(a) {
   a = a | 0;
   return
  }

  function An(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Bn(a) {
   a = a | 0;
   return 2147483647
  }

  function Cn(a) {
   a = a | 0;
   return 2147483647
  }

  function Dn(a, b) {
   a = a | 0;
   b = b | 0;
   c[a >> 2] = 0;
   c[a + 4 >> 2] = 0;
   c[a + 8 >> 2] = 0;
   return
  }

  function En(a, b) {
   a = a | 0;
   b = b | 0;
   c[a >> 2] = 0;
   c[a + 4 >> 2] = 0;
   c[a + 8 >> 2] = 0;
   return
  }

  function Fn(a, b) {
   a = a | 0;
   b = b | 0;
   c[a >> 2] = 0;
   c[a + 4 >> 2] = 0;
   c[a + 8 >> 2] = 0;
   return
  }

  function Gn(a, b) {
   a = a | 0;
   b = b | 0;
   Ij(a, 1, 45);
   return
  }

  function Hn(a) {
   a = a | 0;
   return 0
  }

  function In(b, c) {
   b = b | 0;
   c = c | 0;
   a[b >> 0] = 2;
   a[b + 1 >> 0] = 3;
   a[b + 2 >> 0] = 0;
   a[b + 3 >> 0] = 4;
   return
  }

  function Jn(b, c) {
   b = b | 0;
   c = c | 0;
   a[b >> 0] = 2;
   a[b + 1 >> 0] = 3;
   a[b + 2 >> 0] = 0;
   a[b + 3 >> 0] = 4;
   return
  }

  function Kn(a) {
   a = a | 0;
   return
  }

  function Ln(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Mn(a) {
   a = a | 0;
   return 2147483647
  }

  function Nn(a) {
   a = a | 0;
   return 2147483647
  }

  function On(a, b) {
   a = a | 0;
   b = b | 0;
   c[a >> 2] = 0;
   c[a + 4 >> 2] = 0;
   c[a + 8 >> 2] = 0;
   return
  }

  function Pn(a, b) {
   a = a | 0;
   b = b | 0;
   c[a >> 2] = 0;
   c[a + 4 >> 2] = 0;
   c[a + 8 >> 2] = 0;
   return
  }

  function Qn(a, b) {
   a = a | 0;
   b = b | 0;
   c[a >> 2] = 0;
   c[a + 4 >> 2] = 0;
   c[a + 8 >> 2] = 0;
   return
  }

  function Rn(a, b) {
   a = a | 0;
   b = b | 0;
   Ij(a, 1, 45);
   return
  }

  function Sn(a) {
   a = a | 0;
   return 0
  }

  function Tn(b, c) {
   b = b | 0;
   c = c | 0;
   a[b >> 0] = 2;
   a[b + 1 >> 0] = 3;
   a[b + 2 >> 0] = 0;
   a[b + 3 >> 0] = 4;
   return
  }

  function Un(b, c) {
   b = b | 0;
   c = c | 0;
   a[b >> 0] = 2;
   a[b + 1 >> 0] = 3;
   a[b + 2 >> 0] = 0;
   a[b + 3 >> 0] = 4;
   return
  }

  function Vn(a) {
   a = a | 0;
   return
  }

  function Wn(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Xn(b, d, e, f, g, h, j) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0;
   E = i;
   i = i + 240 | 0;
   x = E + 24 | 0;
   y = E;
   u = E + 136 | 0;
   D = E + 16 | 0;
   v = E + 12 | 0;
   A = E + 8 | 0;
   k = E + 134 | 0;
   s = E + 4 | 0;
   w = E + 124 | 0;
   c[D >> 2] = u;
   C = D + 4 | 0;
   c[C >> 2] = 144;
   c[A >> 2] = Xj(g) | 0;
   b = Qo(A, 9336) | 0;
   a[k >> 0] = 0;
   c[s >> 2] = c[e >> 2];
   t = c[g + 4 >> 2] | 0;
   c[x >> 2] = c[s >> 2];
   if (Zn(d, x, f, A, t, h, k, b, D, v, u + 100 | 0) | 0) {
    Ab[c[(c[b >> 2] | 0) + 32 >> 2] & 7](b, 23551, 23561, w) | 0;
    f = c[v >> 2] | 0;
    g = c[D >> 2] | 0;
    b = f - g | 0;
    if ((b | 0) > 98) {
     b = jj(b + 2 | 0) | 0;
     if (!b) Rh();
     else {
      z = b;
      l = b
     }
    } else {
     z = 0;
     l = x
    }
    if (!(a[k >> 0] | 0)) b = l;
    else {
     a[l >> 0] = 45;
     b = l + 1 | 0
    }
    t = w + 10 | 0;
    u = w;
    if (g >>> 0 < f >>> 0) {
     k = w + 1 | 0;
     l = k + 1 | 0;
     m = l + 1 | 0;
     n = m + 1 | 0;
     o = n + 1 | 0;
     p = o + 1 | 0;
     q = p + 1 | 0;
     r = q + 1 | 0;
     s = r + 1 | 0;
     do {
      f = a[g >> 0] | 0;
      if ((a[w >> 0] | 0) != f << 24 >> 24)
       if ((a[k >> 0] | 0) != f << 24 >> 24)
        if ((a[l >> 0] | 0) != f << 24 >> 24)
         if ((a[m >> 0] | 0) != f << 24 >> 24)
          if ((a[n >> 0] | 0) != f << 24 >> 24)
           if ((a[o >> 0] | 0) != f << 24 >> 24)
            if ((a[p >> 0] | 0) != f << 24 >> 24)
             if ((a[q >> 0] | 0) != f << 24 >> 24)
              if ((a[r >> 0] | 0) == f << 24 >> 24) f = r;
              else f = (a[s >> 0] | 0) == f << 24 >> 24 ? s : t;
      else f = q;
      else f = p;
      else f = o;
      else f = n;
      else f = m;
      else f = l;
      else f = k;
      else f = w;
      a[b >> 0] = a[23551 + (f - u) >> 0] | 0;
      g = g + 1 | 0;
      b = b + 1 | 0
     } while (g >>> 0 < (c[v >> 2] | 0) >>> 0)
    }
    a[b >> 0] = 0;
    c[y >> 2] = j;
    Li(x, 23562, y) | 0;
    if (z) kj(z)
   }
   b = c[d >> 2] | 0;
   do
    if (b) {
     if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0))
      if ((wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1) {
       c[d >> 2] = 0;
       b = 0;
       break
      } else {
       b = c[d >> 2] | 0;
       break
      }
    } else b = 0;
   while (0);
   b = (b | 0) == 0;
   f = c[e >> 2] | 0;
   do
    if (f) {
     if ((c[f + 12 >> 2] | 0) == (c[f + 16 >> 2] | 0) ? (wb[c[(c[f >> 2] | 0) + 36 >> 2] & 127](f) | 0) == -1 : 0) {
      c[e >> 2] = 0;
      B = 25;
      break
     }
     if (!b) B = 26
    } else B = 25;
   while (0);
   if ((B | 0) == 25 ? b : 0) B = 26;
   if ((B | 0) == 26) c[h >> 2] = c[h >> 2] | 2;
   f = c[d >> 2] | 0;
   gs(c[A >> 2] | 0) | 0;
   b = c[D >> 2] | 0;
   c[D >> 2] = 0;
   if (b) sb[c[C >> 2] & 255](b);
   i = E;
   return f | 0
  }

  function Yn(a) {
   a = a | 0;
   return
  }

  function Zn(e, f, g, h, j, k, l, m, n, o, p) {
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   k = k | 0;
   l = l | 0;
   m = m | 0;
   n = n | 0;
   o = o | 0;
   p = p | 0;
   var q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0,
    F = 0,
    G = 0,
    H = 0,
    I = 0,
    J = 0,
    K = 0,
    L = 0,
    M = 0,
    N = 0,
    O = 0,
    P = 0,
    Q = 0,
    R = 0,
    S = 0,
    T = 0,
    U = 0,
    V = 0,
    W = 0,
    X = 0,
    Y = 0,
    Z = 0,
    _ = 0,
    $ = 0,
    aa = 0,
    ba = 0,
    ca = 0;
   ca = i;
   i = i + 512 | 0;
   O = ca + 88 | 0;
   t = ca + 96 | 0;
   ba = ca + 80 | 0;
   T = ca + 72 | 0;
   S = ca + 68 | 0;
   U = ca + 500 | 0;
   Q = ca + 497 | 0;
   P = ca + 496 | 0;
   aa = ca + 56 | 0;
   _ = ca + 44 | 0;
   Y = ca + 32 | 0;
   $ = ca + 20 | 0;
   Z = ca + 8 | 0;
   R = ca + 4 | 0;
   W = ca;
   c[O >> 2] = p;
   c[ba >> 2] = t;
   X = ba + 4 | 0;
   c[X >> 2] = 144;
   c[T >> 2] = t;
   c[S >> 2] = t + 400;
   c[aa >> 2] = 0;
   c[aa + 4 >> 2] = 0;
   c[aa + 8 >> 2] = 0;
   c[_ >> 2] = 0;
   c[_ + 4 >> 2] = 0;
   c[_ + 8 >> 2] = 0;
   c[Y >> 2] = 0;
   c[Y + 4 >> 2] = 0;
   c[Y + 8 >> 2] = 0;
   c[$ >> 2] = 0;
   c[$ + 4 >> 2] = 0;
   c[$ + 8 >> 2] = 0;
   c[Z >> 2] = 0;
   c[Z + 4 >> 2] = 0;
   c[Z + 8 >> 2] = 0;
   $n(g, h, U, Q, P, aa, _, Y, $, R);
   c[o >> 2] = c[n >> 2];
   H = m + 8 | 0;
   I = Y + 4 | 0;
   J = $ + 4 | 0;
   K = $ + 8 | 0;
   L = $ + 1 | 0;
   M = Y + 8 | 0;
   N = Y + 1 | 0;
   x = (j & 512 | 0) != 0;
   y = _ + 8 | 0;
   z = _ + 1 | 0;
   A = _ + 4 | 0;
   B = Z + 4 | 0;
   C = Z + 8 | 0;
   D = Z + 1 | 0;
   E = U + 3 | 0;
   F = aa + 4 | 0;
   G = 0;
   s = 0;
   a: while (1) {
    p = c[e >> 2] | 0;
    do
     if (p) {
      if ((c[p + 12 >> 2] | 0) == (c[p + 16 >> 2] | 0))
       if ((wb[c[(c[p >> 2] | 0) + 36 >> 2] & 127](p) | 0) == -1) {
        c[e >> 2] = 0;
        p = 0;
        break
       } else {
        p = c[e >> 2] | 0;
        break
       }
     } else p = 0;
    while (0);
    p = (p | 0) == 0;
    m = c[f >> 2] | 0;
    do
     if (m) {
      if ((c[m + 12 >> 2] | 0) != (c[m + 16 >> 2] | 0))
       if (p) break;
       else {
        V = 202;
        break a
       }
      if ((wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) != -1)
       if (p) break;
       else {
        V = 202;
        break a
       } else {
       c[f >> 2] = 0;
       V = 12;
       break
      }
     } else V = 12;
    while (0);
    if ((V | 0) == 12) {
     V = 0;
     if (p) {
      V = 202;
      break
     } else m = 0
    }
    b: do switch (a[U + G >> 0] | 0) {
      case 1:
       {
        if ((G | 0) != 3) {
         p = c[e >> 2] | 0;
         g = c[p + 12 >> 2] | 0;
         if ((g | 0) == (c[p + 16 >> 2] | 0)) p = wb[c[(c[p >> 2] | 0) + 36 >> 2] & 127](p) | 0;
         else p = d[g >> 0] | 0;
         if ((p & 255) << 24 >> 24 <= -1) {
          V = 26;
          break a
         }
         if (!(b[(c[H >> 2] | 0) + (p << 24 >> 24 << 1) >> 1] & 8192)) {
          V = 26;
          break a
         }
         p = c[e >> 2] | 0;
         g = p + 12 | 0;
         h = c[g >> 2] | 0;
         if ((h | 0) == (c[p + 16 >> 2] | 0)) p = wb[c[(c[p >> 2] | 0) + 40 >> 2] & 127](p) | 0;
         else {
          c[g >> 2] = h + 1;
          p = d[h >> 0] | 0
         }
         Cj(Z, p & 255);
         p = m;
         g = m;
         V = 28
        }
        break
       }
      case 0:
       {
        if ((G | 0) != 3) {
         p = m;
         g = m;
         V = 28
        }
        break
       }
      case 3:
       {
        h = a[Y >> 0] | 0;p = (h & 1) == 0 ? (h & 255) >>> 1 : c[I >> 2] | 0;g = a[$ >> 0] | 0;g = (g & 1) == 0 ? (g & 255) >>> 1 : c[J >> 2] | 0;
        if ((p | 0) != (0 - g | 0)) {
         j = (p | 0) == 0;
         q = c[e >> 2] | 0;
         r = c[q + 12 >> 2] | 0;
         p = c[q + 16 >> 2] | 0;
         m = (r | 0) == (p | 0);
         if (j | (g | 0) == 0) {
          if (m) p = wb[c[(c[q >> 2] | 0) + 36 >> 2] & 127](q) | 0;
          else p = d[r >> 0] | 0;
          p = p & 255;
          if (j) {
           if (p << 24 >> 24 != (a[((a[$ >> 0] & 1) == 0 ? L : c[K >> 2] | 0) >> 0] | 0)) break b;
           p = c[e >> 2] | 0;
           m = p + 12 | 0;
           g = c[m >> 2] | 0;
           if ((g | 0) == (c[p + 16 >> 2] | 0)) wb[c[(c[p >> 2] | 0) + 40 >> 2] & 127](p) | 0;
           else c[m >> 2] = g + 1;
           a[l >> 0] = 1;
           w = a[$ >> 0] | 0;
           s = ((w & 1) == 0 ? (w & 255) >>> 1 : c[J >> 2] | 0) >>> 0 > 1 ? $ : s;
           break b
          }
          if (p << 24 >> 24 != (a[((a[Y >> 0] & 1) == 0 ? N : c[M >> 2] | 0) >> 0] | 0)) {
           a[l >> 0] = 1;
           break b
          }
          p = c[e >> 2] | 0;
          m = p + 12 | 0;
          g = c[m >> 2] | 0;
          if ((g | 0) == (c[p + 16 >> 2] | 0)) wb[c[(c[p >> 2] | 0) + 40 >> 2] & 127](p) | 0;
          else c[m >> 2] = g + 1;
          w = a[Y >> 0] | 0;
          s = ((w & 1) == 0 ? (w & 255) >>> 1 : c[I >> 2] | 0) >>> 0 > 1 ? Y : s;
          break b
         }
         if (m) {
          j = wb[c[(c[q >> 2] | 0) + 36 >> 2] & 127](q) | 0;
          p = c[e >> 2] | 0;
          h = a[Y >> 0] | 0;
          q = p;
          g = c[p + 12 >> 2] | 0;
          p = c[p + 16 >> 2] | 0
         } else {
          j = d[r >> 0] | 0;
          g = r
         }
         m = q + 12 | 0;
         p = (g | 0) == (p | 0);
         if ((j & 255) << 24 >> 24 == (a[((h & 1) == 0 ? N : c[M >> 2] | 0) >> 0] | 0)) {
          if (p) wb[c[(c[q >> 2] | 0) + 40 >> 2] & 127](q) | 0;
          else c[m >> 2] = g + 1;
          w = a[Y >> 0] | 0;
          s = ((w & 1) == 0 ? (w & 255) >>> 1 : c[I >> 2] | 0) >>> 0 > 1 ? Y : s;
          break b
         }
         if (p) p = wb[c[(c[q >> 2] | 0) + 36 >> 2] & 127](q) | 0;
         else p = d[g >> 0] | 0;
         if ((p & 255) << 24 >> 24 != (a[((a[$ >> 0] & 1) == 0 ? L : c[K >> 2] | 0) >> 0] | 0)) {
          V = 82;
          break a
         }
         p = c[e >> 2] | 0;
         m = p + 12 | 0;
         g = c[m >> 2] | 0;
         if ((g | 0) == (c[p + 16 >> 2] | 0)) wb[c[(c[p >> 2] | 0) + 40 >> 2] & 127](p) | 0;
         else c[m >> 2] = g + 1;
         a[l >> 0] = 1;
         w = a[$ >> 0] | 0;
         s = ((w & 1) == 0 ? (w & 255) >>> 1 : c[J >> 2] | 0) >>> 0 > 1 ? $ : s
        }
        break
       }
      case 2:
       {
        if (!(G >>> 0 < 2 | (s | 0) != 0) ? !(x | (G | 0) == 2 & (a[E >> 0] | 0) != 0) : 0) {
         s = 0;
         break b
        }
        v = a[_ >> 0] | 0;p = (v & 1) == 0;w = c[y >> 2] | 0;h = p ? z : w;u = h;c: do
         if ((G | 0) != 0 ? (d[U + (G + -1) >> 0] | 0) < 2 : 0) {
          r = p ? (v & 255) >>> 1 : c[A >> 2] | 0;
          j = h + r | 0;
          q = c[H >> 2] | 0;
          d: do
           if (!r) g = u;
           else {
            r = h;
            g = u;
            do {
             p = a[r >> 0] | 0;
             if (p << 24 >> 24 <= -1) break d;
             if (!(b[q + (p << 24 >> 24 << 1) >> 1] & 8192)) break d;
             r = r + 1 | 0;
             g = r
            } while ((r | 0) != (j | 0))
           }
          while (0);
          j = g - u | 0;
          q = a[Z >> 0] | 0;
          p = (q & 1) == 0;
          q = p ? (q & 255) >>> 1 : c[B >> 2] | 0;
          if (q >>> 0 >= j >>> 0) {
           p = p ? D : c[C >> 2] | 0;
           r = p + q | 0;
           if ((g | 0) != (u | 0)) {
            p = p + (q - j) | 0;
            while (1) {
             if ((a[p >> 0] | 0) != (a[h >> 0] | 0)) {
              g = u;
              break c
             }
             p = p + 1 | 0;
             if ((p | 0) == (r | 0)) break;
             else h = h + 1 | 0
            }
           }
          } else g = u
         } else g = u;while (0);p = (v & 1) == 0;p = (p ? z : w) + (p ? (v & 255) >>> 1 : c[A >> 2] | 0) | 0;e: do
         if ((g | 0) != (p | 0)) {
          j = m;
          h = m;
          p = g;
          while (1) {
           m = c[e >> 2] | 0;
           do
            if (m) {
             if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0))
              if ((wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1) {
               c[e >> 2] = 0;
               m = 0;
               break
              } else {
               m = c[e >> 2] | 0;
               break
              }
            } else m = 0;
           while (0);
           g = (m | 0) == 0;
           do
            if (h) {
             if ((c[h + 12 >> 2] | 0) != (c[h + 16 >> 2] | 0))
              if (g) {
               m = j;
               q = h;
               break
              } else break e;
             if ((wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0) != -1)
              if (g ^ (j | 0) == 0) {
               m = j;
               q = j;
               break
              } else break e;
             else {
              c[f >> 2] = 0;
              m = 0;
              V = 107;
              break
             }
            } else {
             m = j;
             V = 107
            }
           while (0);
           if ((V | 0) == 107) {
            V = 0;
            if (g) break e;
            else q = 0
           }
           g = c[e >> 2] | 0;
           h = c[g + 12 >> 2] | 0;
           if ((h | 0) == (c[g + 16 >> 2] | 0)) g = wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0;
           else g = d[h >> 0] | 0;
           if ((g & 255) << 24 >> 24 != (a[p >> 0] | 0)) break e;
           g = c[e >> 2] | 0;
           h = g + 12 | 0;
           j = c[h >> 2] | 0;
           if ((j | 0) == (c[g + 16 >> 2] | 0)) wb[c[(c[g >> 2] | 0) + 40 >> 2] & 127](g) | 0;
           else c[h >> 2] = j + 1;
           p = p + 1 | 0;
           g = a[_ >> 0] | 0;
           w = (g & 1) == 0;
           g = (w ? z : c[y >> 2] | 0) + (w ? (g & 255) >>> 1 : c[A >> 2] | 0) | 0;
           if ((p | 0) == (g | 0)) {
            p = g;
            break
           } else {
            j = m;
            h = q
           }
          }
         }while (0);
        if (x ? (w = a[_ >> 0] | 0, v = (w & 1) == 0, (p | 0) != ((v ? z : c[y >> 2] | 0) + (v ? (w & 255) >>> 1 : c[A >> 2] | 0) | 0)) : 0) {
         V = 119;
         break a
        }
        break
       }
      case 4:
       {
        r = a[P >> 0] | 0;j = m;h = m;p = 0;f: while (1) {
         m = c[e >> 2] | 0;
         do
          if (m) {
           if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0))
            if ((wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1) {
             c[e >> 2] = 0;
             m = 0;
             break
            } else {
             m = c[e >> 2] | 0;
             break
            }
          } else m = 0;
         while (0);
         g = (m | 0) == 0;
         do
          if (h) {
           if ((c[h + 12 >> 2] | 0) != (c[h + 16 >> 2] | 0))
            if (g) {
             m = j;
             q = h;
             break
            } else {
             m = j;
             break f
            }
           if ((wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0) != -1)
            if (g ^ (j | 0) == 0) {
             m = j;
             q = j;
             break
            } else {
             m = j;
             break f
            } else {
            c[f >> 2] = 0;
            m = 0;
            V = 130;
            break
           }
          } else {
           m = j;
           V = 130
          }
         while (0);
         if ((V | 0) == 130) {
          V = 0;
          if (g) break;
          else q = 0
         }
         g = c[e >> 2] | 0;
         h = c[g + 12 >> 2] | 0;
         if ((h | 0) == (c[g + 16 >> 2] | 0)) g = wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0;
         else g = d[h >> 0] | 0;
         h = g & 255;
         if (h << 24 >> 24 > -1 ? (b[(c[H >> 2] | 0) + (g << 24 >> 24 << 1) >> 1] & 2048) != 0 : 0) {
          g = c[o >> 2] | 0;
          if ((g | 0) == (c[O >> 2] | 0)) {
           ar(n, o, O);
           g = c[o >> 2] | 0
          }
          c[o >> 2] = g + 1;
          a[g >> 0] = h;
          p = p + 1 | 0
         } else {
          w = a[aa >> 0] | 0;
          if (!(h << 24 >> 24 == r << 24 >> 24 & ((p | 0) != 0 ? (((w & 1) == 0 ? (w & 255) >>> 1 : c[F >> 2] | 0) | 0) != 0 : 0))) break;
          if ((t | 0) == (c[S >> 2] | 0)) {
           br(ba, T, S);
           t = c[T >> 2] | 0
          }
          w = t + 4 | 0;
          c[T >> 2] = w;
          c[t >> 2] = p;
          t = w;
          p = 0
         }
         g = c[e >> 2] | 0;
         h = g + 12 | 0;
         j = c[h >> 2] | 0;
         if ((j | 0) == (c[g + 16 >> 2] | 0)) {
          wb[c[(c[g >> 2] | 0) + 40 >> 2] & 127](g) | 0;
          j = m;
          h = q;
          continue
         } else {
          c[h >> 2] = j + 1;
          j = m;
          h = q;
          continue
         }
        }
        if ((p | 0) != 0 ? (c[ba >> 2] | 0) != (t | 0) : 0) {
         if ((t | 0) == (c[S >> 2] | 0)) {
          br(ba, T, S);
          t = c[T >> 2] | 0
         }
         w = t + 4 | 0;
         c[T >> 2] = w;
         c[t >> 2] = p;
         t = w
        }
        q = c[R >> 2] | 0;
        if ((q | 0) > 0) {
         p = c[e >> 2] | 0;
         do
          if (p) {
           if ((c[p + 12 >> 2] | 0) == (c[p + 16 >> 2] | 0))
            if ((wb[c[(c[p >> 2] | 0) + 36 >> 2] & 127](p) | 0) == -1) {
             c[e >> 2] = 0;
             p = 0;
             break
            } else {
             p = c[e >> 2] | 0;
             break
            }
          } else p = 0;
         while (0);
         p = (p | 0) == 0;
         do
          if (m) {
           if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0) ? (wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1 : 0) {
            c[f >> 2] = 0;
            V = 162;
            break
           }
           if (p) h = m;
           else {
            V = 167;
            break a
           }
          } else V = 162;
         while (0);
         if ((V | 0) == 162) {
          V = 0;
          if (p) {
           V = 167;
           break a
          } else h = 0
         }
         p = c[e >> 2] | 0;
         m = c[p + 12 >> 2] | 0;
         if ((m | 0) == (c[p + 16 >> 2] | 0)) p = wb[c[(c[p >> 2] | 0) + 36 >> 2] & 127](p) | 0;
         else p = d[m >> 0] | 0;
         if ((p & 255) << 24 >> 24 != (a[Q >> 0] | 0)) {
          V = 167;
          break a
         }
         p = c[e >> 2] | 0;
         m = p + 12 | 0;
         g = c[m >> 2] | 0;
         if ((g | 0) == (c[p + 16 >> 2] | 0)) wb[c[(c[p >> 2] | 0) + 40 >> 2] & 127](p) | 0;
         else c[m >> 2] = g + 1;
         if ((q | 0) > 0) {
          j = h;
          g = h;
          while (1) {
           p = c[e >> 2] | 0;
           do
            if (p) {
             if ((c[p + 12 >> 2] | 0) == (c[p + 16 >> 2] | 0))
              if ((wb[c[(c[p >> 2] | 0) + 36 >> 2] & 127](p) | 0) == -1) {
               c[e >> 2] = 0;
               p = 0;
               break
              } else {
               p = c[e >> 2] | 0;
               break
              }
            } else p = 0;
           while (0);
           m = (p | 0) == 0;
           do
            if (g) {
             if ((c[g + 12 >> 2] | 0) != (c[g + 16 >> 2] | 0))
              if (m) {
               p = j;
               r = g;
               break
              } else {
               V = 189;
               break a
              }
             if ((wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0) != -1)
              if (m ^ (j | 0) == 0) {
               p = j;
               r = j;
               break
              } else {
               V = 189;
               break a
              } else {
              c[f >> 2] = 0;
              p = 0;
              V = 182;
              break
             }
            } else {
             p = j;
             V = 182
            }
           while (0);
           if ((V | 0) == 182) {
            V = 0;
            if (m) {
             V = 189;
             break a
            } else r = 0
           }
           m = c[e >> 2] | 0;
           g = c[m + 12 >> 2] | 0;
           if ((g | 0) == (c[m + 16 >> 2] | 0)) m = wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0;
           else m = d[g >> 0] | 0;
           if ((m & 255) << 24 >> 24 <= -1) {
            V = 189;
            break a
           }
           if (!(b[(c[H >> 2] | 0) + (m << 24 >> 24 << 1) >> 1] & 2048)) {
            V = 189;
            break a
           }
           if ((c[o >> 2] | 0) == (c[O >> 2] | 0)) ar(n, o, O);
           m = c[e >> 2] | 0;
           g = c[m + 12 >> 2] | 0;
           if ((g | 0) == (c[m + 16 >> 2] | 0)) m = wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0;
           else m = d[g >> 0] | 0;
           g = c[o >> 2] | 0;
           c[o >> 2] = g + 1;
           a[g >> 0] = m;
           m = q;
           q = q + -1 | 0;
           c[R >> 2] = q;
           g = c[e >> 2] | 0;
           h = g + 12 | 0;
           j = c[h >> 2] | 0;
           if ((j | 0) == (c[g + 16 >> 2] | 0)) wb[c[(c[g >> 2] | 0) + 40 >> 2] & 127](g) | 0;
           else c[h >> 2] = j + 1;
           if ((m | 0) <= 1) break;
           else {
            j = p;
            g = r
           }
          }
         }
        }
        if ((c[o >> 2] | 0) == (c[n >> 2] | 0)) {
         V = 200;
         break a
        }
        break
       }
      default:
       {}
     }
     while (0);
     g: do
      if ((V | 0) == 28)
       while (1) {
        V = 0;
        m = c[e >> 2] | 0;
        do
         if (m) {
          if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0))
           if ((wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1) {
            c[e >> 2] = 0;
            m = 0;
            break
           } else {
            m = c[e >> 2] | 0;
            break
           }
         } else m = 0;
        while (0);
        m = (m | 0) == 0;
        do
         if (g) {
          if ((c[g + 12 >> 2] | 0) != (c[g + 16 >> 2] | 0))
           if (m) {
            j = p;
            h = g;
            break
           } else break g;
          if ((wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0) != -1)
           if (m ^ (p | 0) == 0) {
            j = p;
            h = p;
            break
           } else break g;
          else {
           c[f >> 2] = 0;
           p = 0;
           V = 38;
           break
          }
         } else V = 38;
        while (0);
        if ((V | 0) == 38) {
         V = 0;
         if (m) break g;
         else {
          j = p;
          h = 0
         }
        }
        p = c[e >> 2] | 0;
        m = c[p + 12 >> 2] | 0;
        if ((m | 0) == (c[p + 16 >> 2] | 0)) p = wb[c[(c[p >> 2] | 0) + 36 >> 2] & 127](p) | 0;
        else p = d[m >> 0] | 0;
        if ((p & 255) << 24 >> 24 <= -1) break g;
        if (!(b[(c[H >> 2] | 0) + (p << 24 >> 24 << 1) >> 1] & 8192)) break g;
        p = c[e >> 2] | 0;
        m = p + 12 | 0;
        g = c[m >> 2] | 0;
        if ((g | 0) == (c[p + 16 >> 2] | 0)) p = wb[c[(c[p >> 2] | 0) + 40 >> 2] & 127](p) | 0;
        else {
         c[m >> 2] = g + 1;
         p = d[g >> 0] | 0
        }
        Cj(Z, p & 255);
        p = j;
        g = h;
        V = 28
       }
      while (0);
    G = G + 1 | 0;
    if (G >>> 0 >= 4) {
     V = 202;
     break
    }
   }
   h: do
    if ((V | 0) == 26) {
     c[k >> 2] = c[k >> 2] | 4;
     m = 0
    } else
   if ((V | 0) == 82) {
    c[k >> 2] = c[k >> 2] | 4;
    m = 0
   } else if ((V | 0) == 119) {
    c[k >> 2] = c[k >> 2] | 4;
    m = 0
   } else if ((V | 0) == 167) {
    c[k >> 2] = c[k >> 2] | 4;
    m = 0
   } else if ((V | 0) == 189) {
    c[k >> 2] = c[k >> 2] | 4;
    m = 0
   } else if ((V | 0) == 200) {
    c[k >> 2] = c[k >> 2] | 4;
    m = 0
   } else if ((V | 0) == 202) {
    i: do
     if (s) {
      j = s + 1 | 0;
      q = s + 8 | 0;
      r = s + 4 | 0;
      g = 1;
      j: while (1) {
       p = a[s >> 0] | 0;
       if (!(p & 1)) p = (p & 255) >>> 1;
       else p = c[r >> 2] | 0;
       if (g >>> 0 >= p >>> 0) break i;
       p = c[e >> 2] | 0;
       do
        if (p) {
         if ((c[p + 12 >> 2] | 0) == (c[p + 16 >> 2] | 0))
          if ((wb[c[(c[p >> 2] | 0) + 36 >> 2] & 127](p) | 0) == -1) {
           c[e >> 2] = 0;
           p = 0;
           break
          } else {
           p = c[e >> 2] | 0;
           break
          }
        } else p = 0;
       while (0);
       p = (p | 0) == 0;
       m = c[f >> 2] | 0;
       do
        if (m) {
         if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0) ? (wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1 : 0) {
          c[f >> 2] = 0;
          V = 218;
          break
         }
         if (!p) break j
        } else V = 218;
       while (0);
       if ((V | 0) == 218 ? (V = 0, p) : 0) break;
       p = c[e >> 2] | 0;
       m = c[p + 12 >> 2] | 0;
       if ((m | 0) == (c[p + 16 >> 2] | 0)) p = wb[c[(c[p >> 2] | 0) + 36 >> 2] & 127](p) | 0;
       else p = d[m >> 0] | 0;
       if (!(a[s >> 0] & 1)) m = j;
       else m = c[q >> 2] | 0;
       if ((p & 255) << 24 >> 24 != (a[m + g >> 0] | 0)) break;
       p = g + 1 | 0;
       m = c[e >> 2] | 0;
       g = m + 12 | 0;
       h = c[g >> 2] | 0;
       if ((h | 0) == (c[m + 16 >> 2] | 0)) {
        wb[c[(c[m >> 2] | 0) + 40 >> 2] & 127](m) | 0;
        g = p;
        continue
       } else {
        c[g >> 2] = h + 1;
        g = p;
        continue
       }
      }
      c[k >> 2] = c[k >> 2] | 4;
      m = 0;
      break h
     }while (0);p = c[ba >> 2] | 0;
    if ((p | 0) != (t | 0) ? (c[W >> 2] = 0, ao(aa, p, t, W), (c[W >> 2] | 0) != 0) : 0) {
     c[k >> 2] = c[k >> 2] | 4;
     m = 0
    } else m = 1
   }
   while (0);
   uj(Z);
   uj($);
   uj(Y);
   uj(_);
   uj(aa);
   p = c[ba >> 2] | 0;
   c[ba >> 2] = 0;
   if (p) sb[c[X >> 2] & 255](p);
   i = ca;
   return m | 0
  }

  function _n(b, d, e, f, g, h, j) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0;
   s = i;
   i = i + 144 | 0;
   v = s + 24 | 0;
   t = s + 32 | 0;
   r = s + 16 | 0;
   l = s + 8 | 0;
   u = s + 4 | 0;
   k = s + 28 | 0;
   m = s;
   c[r >> 2] = t;
   q = r + 4 | 0;
   c[q >> 2] = 144;
   o = Xj(g) | 0;
   c[u >> 2] = o;
   b = Qo(u, 9336) | 0;
   a[k >> 0] = 0;
   n = c[e >> 2] | 0;
   c[m >> 2] = n;
   g = c[g + 4 >> 2] | 0;
   c[v >> 2] = c[m >> 2];
   m = n;
   if (Zn(d, v, f, u, g, h, k, b, r, l, t + 100 | 0) | 0) {
    if (!(a[j >> 0] & 1)) {
     a[j + 1 >> 0] = 0;
     a[j >> 0] = 0
    } else {
     a[c[j + 8 >> 2] >> 0] = 0;
     c[j + 4 >> 2] = 0
    }
    if (a[k >> 0] | 0) Cj(j, Cb[c[(c[b >> 2] | 0) + 28 >> 2] & 15](b, 45) | 0);
    k = Cb[c[(c[b >> 2] | 0) + 28 >> 2] & 15](b, 48) | 0;
    b = c[r >> 2] | 0;
    f = c[l >> 2] | 0;
    g = f + -1 | 0;
    a: do
     if (b >>> 0 < g >>> 0)
      do {
       if ((a[b >> 0] | 0) != k << 24 >> 24) break a;
       b = b + 1 | 0
      } while (b >>> 0 < g >>> 0);
    while (0);
    cr(j, b, f) | 0
   }
   b = c[d >> 2] | 0;
   do
    if (b) {
     if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0))
      if ((wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1) {
       c[d >> 2] = 0;
       b = 0;
       break
      } else {
       b = c[d >> 2] | 0;
       break
      }
    } else b = 0;
   while (0);
   b = (b | 0) == 0;
   do
    if (n) {
     if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0) ? (wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1 : 0) {
      c[e >> 2] = 0;
      p = 21;
      break
     }
     if (!b) p = 22
    } else p = 21;
   while (0);
   if ((p | 0) == 21 ? b : 0) p = 22;
   if ((p | 0) == 22) c[h >> 2] = c[h >> 2] | 2;
   g = c[d >> 2] | 0;
   gs(o) | 0;
   b = c[r >> 2] | 0;
   c[r >> 2] = 0;
   if (b) sb[c[q >> 2] & 255](b);
   i = s;
   return g | 0
  }

  function $n(b, d, e, f, g, h, j, k, l, m) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   k = k | 0;
   l = l | 0;
   m = m | 0;
   var n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0;
   x = i;
   i = i + 112 | 0;
   n = x + 100 | 0;
   o = x + 88 | 0;
   p = x + 76 | 0;
   q = x + 64 | 0;
   r = x + 52 | 0;
   s = x + 48 | 0;
   t = x + 36 | 0;
   u = x + 24 | 0;
   v = x + 12 | 0;
   w = x;
   if (b) {
    b = Qo(d, 8944) | 0;
    tb[c[(c[b >> 2] | 0) + 44 >> 2] & 127](n, b);
    w = c[n >> 2] | 0;
    a[e >> 0] = w;
    a[e + 1 >> 0] = w >> 8;
    a[e + 2 >> 0] = w >> 16;
    a[e + 3 >> 0] = w >> 24;
    tb[c[(c[b >> 2] | 0) + 32 >> 2] & 127](o, b);
    if (!(a[l >> 0] & 1)) {
     a[l + 1 >> 0] = 0;
     a[l >> 0] = 0
    } else {
     a[c[l + 8 >> 2] >> 0] = 0;
     c[l + 4 >> 2] = 0
    }
    Aj(l, 0);
    c[l >> 2] = c[o >> 2];
    c[l + 4 >> 2] = c[o + 4 >> 2];
    c[l + 8 >> 2] = c[o + 8 >> 2];
    c[o >> 2] = 0;
    c[o + 4 >> 2] = 0;
    c[o + 8 >> 2] = 0;
    uj(o);
    tb[c[(c[b >> 2] | 0) + 28 >> 2] & 127](p, b);
    if (!(a[k >> 0] & 1)) {
     a[k + 1 >> 0] = 0;
     a[k >> 0] = 0
    } else {
     a[c[k + 8 >> 2] >> 0] = 0;
     c[k + 4 >> 2] = 0
    }
    Aj(k, 0);
    c[k >> 2] = c[p >> 2];
    c[k + 4 >> 2] = c[p + 4 >> 2];
    c[k + 8 >> 2] = c[p + 8 >> 2];
    c[p >> 2] = 0;
    c[p + 4 >> 2] = 0;
    c[p + 8 >> 2] = 0;
    uj(p);
    a[f >> 0] = wb[c[(c[b >> 2] | 0) + 12 >> 2] & 127](b) | 0;
    a[g >> 0] = wb[c[(c[b >> 2] | 0) + 16 >> 2] & 127](b) | 0;
    tb[c[(c[b >> 2] | 0) + 20 >> 2] & 127](q, b);
    if (!(a[h >> 0] & 1)) {
     a[h + 1 >> 0] = 0;
     a[h >> 0] = 0
    } else {
     a[c[h + 8 >> 2] >> 0] = 0;
     c[h + 4 >> 2] = 0
    }
    Aj(h, 0);
    c[h >> 2] = c[q >> 2];
    c[h + 4 >> 2] = c[q + 4 >> 2];
    c[h + 8 >> 2] = c[q + 8 >> 2];
    c[q >> 2] = 0;
    c[q + 4 >> 2] = 0;
    c[q + 8 >> 2] = 0;
    uj(q);
    tb[c[(c[b >> 2] | 0) + 24 >> 2] & 127](r, b);
    if (!(a[j >> 0] & 1)) {
     a[j + 1 >> 0] = 0;
     a[j >> 0] = 0
    } else {
     a[c[j + 8 >> 2] >> 0] = 0;
     c[j + 4 >> 2] = 0
    }
    Aj(j, 0);
    c[j >> 2] = c[r >> 2];
    c[j + 4 >> 2] = c[r + 4 >> 2];
    c[j + 8 >> 2] = c[r + 8 >> 2];
    c[r >> 2] = 0;
    c[r + 4 >> 2] = 0;
    c[r + 8 >> 2] = 0;
    uj(r);
    b = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0
   } else {
    b = Qo(d, 8880) | 0;
    tb[c[(c[b >> 2] | 0) + 44 >> 2] & 127](s, b);
    s = c[s >> 2] | 0;
    a[e >> 0] = s;
    a[e + 1 >> 0] = s >> 8;
    a[e + 2 >> 0] = s >> 16;
    a[e + 3 >> 0] = s >> 24;
    tb[c[(c[b >> 2] | 0) + 32 >> 2] & 127](t, b);
    if (!(a[l >> 0] & 1)) {
     a[l + 1 >> 0] = 0;
     a[l >> 0] = 0
    } else {
     a[c[l + 8 >> 2] >> 0] = 0;
     c[l + 4 >> 2] = 0
    }
    Aj(l, 0);
    c[l >> 2] = c[t >> 2];
    c[l + 4 >> 2] = c[t + 4 >> 2];
    c[l + 8 >> 2] = c[t + 8 >> 2];
    c[t >> 2] = 0;
    c[t + 4 >> 2] = 0;
    c[t + 8 >> 2] = 0;
    uj(t);
    tb[c[(c[b >> 2] | 0) + 28 >> 2] & 127](u, b);
    if (!(a[k >> 0] & 1)) {
     a[k + 1 >> 0] = 0;
     a[k >> 0] = 0
    } else {
     a[c[k + 8 >> 2] >> 0] = 0;
     c[k + 4 >> 2] = 0
    }
    Aj(k, 0);
    c[k >> 2] = c[u >> 2];
    c[k + 4 >> 2] = c[u + 4 >> 2];
    c[k + 8 >> 2] = c[u + 8 >> 2];
    c[u >> 2] = 0;
    c[u + 4 >> 2] = 0;
    c[u + 8 >> 2] = 0;
    uj(u);
    a[f >> 0] = wb[c[(c[b >> 2] | 0) + 12 >> 2] & 127](b) | 0;
    a[g >> 0] = wb[c[(c[b >> 2] | 0) + 16 >> 2] & 127](b) | 0;
    tb[c[(c[b >> 2] | 0) + 20 >> 2] & 127](v, b);
    if (!(a[h >> 0] & 1)) {
     a[h + 1 >> 0] = 0;
     a[h >> 0] = 0
    } else {
     a[c[h + 8 >> 2] >> 0] = 0;
     c[h + 4 >> 2] = 0
    }
    Aj(h, 0);
    c[h >> 2] = c[v >> 2];
    c[h + 4 >> 2] = c[v + 4 >> 2];
    c[h + 8 >> 2] = c[v + 8 >> 2];
    c[v >> 2] = 0;
    c[v + 4 >> 2] = 0;
    c[v + 8 >> 2] = 0;
    uj(v);
    tb[c[(c[b >> 2] | 0) + 24 >> 2] & 127](w, b);
    if (!(a[j >> 0] & 1)) {
     a[j + 1 >> 0] = 0;
     a[j >> 0] = 0
    } else {
     a[c[j + 8 >> 2] >> 0] = 0;
     c[j + 4 >> 2] = 0
    }
    Aj(j, 0);
    c[j >> 2] = c[w >> 2];
    c[j + 4 >> 2] = c[w + 4 >> 2];
    c[j + 8 >> 2] = c[w + 8 >> 2];
    c[w >> 2] = 0;
    c[w + 4 >> 2] = 0;
    c[w + 8 >> 2] = 0;
    uj(w);
    b = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0
   }
   c[m >> 2] = b;
   i = x;
   return
  }

  function ao(b, d, e, f) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    i = 0,
    j = 0;
   g = a[b >> 0] | 0;
   i = b + 4 | 0;
   h = c[i >> 2] | 0;
   a: do
    if (((g & 1) == 0 ? (g & 255) >>> 1 : h) | 0) {
     if ((d | 0) != (e | 0)) {
      g = e + -4 | 0;
      if (g >>> 0 > d >>> 0) {
       h = d;
       do {
        j = c[h >> 2] | 0;
        c[h >> 2] = c[g >> 2];
        c[g >> 2] = j;
        h = h + 4 | 0;
        g = g + -4 | 0
       } while (h >>> 0 < g >>> 0)
      }
      g = a[b >> 0] | 0;
      h = c[i >> 2] | 0
     }
     j = (g & 1) == 0;
     i = j ? b + 1 | 0 : c[b + 8 >> 2] | 0;
     e = e + -4 | 0;
     b = i + (j ? (g & 255) >>> 1 : h) | 0;
     h = a[i >> 0] | 0;
     g = h << 24 >> 24 < 1 | h << 24 >> 24 == 127;
     b: do
      if (e >>> 0 > d >>> 0) {
       while (1) {
        if (!g ? (h << 24 >> 24 | 0) != (c[d >> 2] | 0) : 0) break;
        i = (b - i | 0) > 1 ? i + 1 | 0 : i;
        d = d + 4 | 0;
        h = a[i >> 0] | 0;
        g = h << 24 >> 24 < 1 | h << 24 >> 24 == 127;
        if (d >>> 0 >= e >>> 0) break b
       }
       c[f >> 2] = 4;
       break a
      }
     while (0);
     if (!g ? ((c[e >> 2] | 0) + -1 | 0) >>> 0 >= h << 24 >> 24 >>> 0 : 0) c[f >> 2] = 4
    }
   while (0);
   return
  }

  function bo(a) {
   a = a | 0;
   return
  }

  function co(a) {
   a = a | 0;
   mh(a);
   return
  }

  function eo(b, d, e, f, g, h, j) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0;
   E = i;
   i = i + 576 | 0;
   v = E + 424 | 0;
   y = E;
   u = E + 24 | 0;
   D = E + 16 | 0;
   w = E + 12 | 0;
   A = E + 8 | 0;
   k = E + 464 | 0;
   s = E + 4 | 0;
   x = E + 468 | 0;
   c[D >> 2] = u;
   C = D + 4 | 0;
   c[C >> 2] = 144;
   c[A >> 2] = Xj(g) | 0;
   b = Qo(A, 9328) | 0;
   a[k >> 0] = 0;
   c[s >> 2] = c[e >> 2];
   t = c[g + 4 >> 2] | 0;
   c[v >> 2] = c[s >> 2];
   if (fo(d, v, f, A, t, h, k, b, D, w, u + 400 | 0) | 0) {
    Ab[c[(c[b >> 2] | 0) + 48 >> 2] & 7](b, 23566, 23576, v) | 0;
    f = c[w >> 2] | 0;
    g = c[D >> 2] | 0;
    b = f - g | 0;
    if ((b | 0) > 392) {
     b = jj((b >> 2) + 2 | 0) | 0;
     if (!b) Rh();
     else {
      z = b;
      l = b
     }
    } else {
     z = 0;
     l = x
    }
    if (!(a[k >> 0] | 0)) b = l;
    else {
     a[l >> 0] = 45;
     b = l + 1 | 0
    }
    t = v + 40 | 0;
    u = v;
    if (g >>> 0 < f >>> 0) {
     k = v + 4 | 0;
     l = k + 4 | 0;
     m = l + 4 | 0;
     n = m + 4 | 0;
     o = n + 4 | 0;
     p = o + 4 | 0;
     q = p + 4 | 0;
     r = q + 4 | 0;
     s = r + 4 | 0;
     do {
      f = c[g >> 2] | 0;
      if ((c[v >> 2] | 0) != (f | 0))
       if ((c[k >> 2] | 0) != (f | 0))
        if ((c[l >> 2] | 0) != (f | 0))
         if ((c[m >> 2] | 0) != (f | 0))
          if ((c[n >> 2] | 0) != (f | 0))
           if ((c[o >> 2] | 0) != (f | 0))
            if ((c[p >> 2] | 0) != (f | 0))
             if ((c[q >> 2] | 0) != (f | 0))
              if ((c[r >> 2] | 0) == (f | 0)) f = r;
              else f = (c[s >> 2] | 0) == (f | 0) ? s : t;
      else f = q;
      else f = p;
      else f = o;
      else f = n;
      else f = m;
      else f = l;
      else f = k;
      else f = v;
      a[b >> 0] = a[23566 + (f - u >> 2) >> 0] | 0;
      g = g + 4 | 0;
      b = b + 1 | 0
     } while (g >>> 0 < (c[w >> 2] | 0) >>> 0)
    }
    a[b >> 0] = 0;
    c[y >> 2] = j;
    Li(x, 23562, y) | 0;
    if (z) kj(z)
   }
   b = c[d >> 2] | 0;
   do
    if (b) {
     f = c[b + 12 >> 2] | 0;
     if ((f | 0) == (c[b + 16 >> 2] | 0)) b = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
     else b = c[f >> 2] | 0;
     if ((b | 0) == -1) {
      c[d >> 2] = 0;
      g = 1;
      break
     } else {
      g = (c[d >> 2] | 0) == 0;
      break
     }
    } else g = 1;
   while (0);
   b = c[e >> 2] | 0;
   do
    if (b) {
     f = c[b + 12 >> 2] | 0;
     if ((f | 0) == (c[b + 16 >> 2] | 0)) b = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
     else b = c[f >> 2] | 0;
     if ((b | 0) != -1)
      if (g) break;
      else {
       B = 30;
       break
      } else {
      c[e >> 2] = 0;
      B = 28;
      break
     }
    } else B = 28;
   while (0);
   if ((B | 0) == 28 ? g : 0) B = 30;
   if ((B | 0) == 30) c[h >> 2] = c[h >> 2] | 2;
   f = c[d >> 2] | 0;
   gs(c[A >> 2] | 0) | 0;
   b = c[D >> 2] | 0;
   c[D >> 2] = 0;
   if (b) sb[c[C >> 2] & 255](b);
   i = E;
   return f | 0
  }

  function fo(b, e, f, g, h, j, k, l, m, n, o) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   k = k | 0;
   l = l | 0;
   m = m | 0;
   n = n | 0;
   o = o | 0;
   var p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0,
    F = 0,
    G = 0,
    H = 0,
    I = 0,
    J = 0,
    K = 0,
    L = 0,
    M = 0,
    N = 0,
    O = 0,
    P = 0,
    Q = 0,
    R = 0,
    S = 0,
    T = 0,
    U = 0,
    V = 0,
    W = 0,
    X = 0,
    Y = 0,
    Z = 0;
   Z = i;
   i = i + 512 | 0;
   J = Z + 96 | 0;
   s = Z + 104 | 0;
   Y = Z + 88 | 0;
   O = Z + 80 | 0;
   N = Z + 76 | 0;
   P = Z + 504 | 0;
   L = Z + 72 | 0;
   K = Z + 68 | 0;
   X = Z + 56 | 0;
   V = Z + 44 | 0;
   T = Z + 32 | 0;
   W = Z + 20 | 0;
   U = Z + 8 | 0;
   M = Z + 4 | 0;
   R = Z;
   c[J >> 2] = o;
   c[Y >> 2] = s;
   S = Y + 4 | 0;
   c[S >> 2] = 144;
   c[O >> 2] = s;
   c[N >> 2] = s + 400;
   c[X >> 2] = 0;
   c[X + 4 >> 2] = 0;
   c[X + 8 >> 2] = 0;
   c[V >> 2] = 0;
   c[V + 4 >> 2] = 0;
   c[V + 8 >> 2] = 0;
   c[T >> 2] = 0;
   c[T + 4 >> 2] = 0;
   c[T + 8 >> 2] = 0;
   c[W >> 2] = 0;
   c[W + 4 >> 2] = 0;
   c[W + 8 >> 2] = 0;
   c[U >> 2] = 0;
   c[U + 4 >> 2] = 0;
   c[U + 8 >> 2] = 0;
   ho(f, g, P, L, K, X, V, T, W, M);
   c[n >> 2] = c[m >> 2];
   F = T + 4 | 0;
   G = W + 4 | 0;
   H = W + 8 | 0;
   I = T + 8 | 0;
   x = (h & 512 | 0) != 0;
   y = V + 8 | 0;
   z = V + 4 | 0;
   A = U + 4 | 0;
   B = U + 8 | 0;
   C = P + 3 | 0;
   D = X + 4 | 0;
   E = 0;
   r = 0;
   a: while (1) {
    o = c[b >> 2] | 0;
    do
     if (o) {
      f = c[o + 12 >> 2] | 0;
      if ((f | 0) == (c[o + 16 >> 2] | 0)) o = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
      else o = c[f >> 2] | 0;
      if ((o | 0) == -1) {
       c[b >> 2] = 0;
       g = 1;
       break
      } else {
       g = (c[b >> 2] | 0) == 0;
       break
      }
     } else g = 1;
    while (0);
    f = c[e >> 2] | 0;
    do
     if (f) {
      o = c[f + 12 >> 2] | 0;
      if ((o | 0) == (c[f + 16 >> 2] | 0)) o = wb[c[(c[f >> 2] | 0) + 36 >> 2] & 127](f) | 0;
      else o = c[o >> 2] | 0;
      if ((o | 0) != -1)
       if (g) {
        w = f;
        break
       } else {
        Q = 217;
        break a
       } else {
       c[e >> 2] = 0;
       Q = 15;
       break
      }
     } else Q = 15;
    while (0);
    if ((Q | 0) == 15) {
     Q = 0;
     if (g) {
      Q = 217;
      break
     } else w = 0
    }
    b: do switch (a[P + E >> 0] | 0) {
      case 1:
       {
        if ((E | 0) != 3) {
         o = c[b >> 2] | 0;
         f = c[o + 12 >> 2] | 0;
         if ((f | 0) == (c[o + 16 >> 2] | 0)) o = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
         else o = c[f >> 2] | 0;
         if (!(pb[c[(c[l >> 2] | 0) + 12 >> 2] & 31](l, 8192, o) | 0)) {
          Q = 28;
          break a
         }
         o = c[b >> 2] | 0;
         f = o + 12 | 0;
         g = c[f >> 2] | 0;
         if ((g | 0) == (c[o + 16 >> 2] | 0)) o = wb[c[(c[o >> 2] | 0) + 40 >> 2] & 127](o) | 0;
         else {
          c[f >> 2] = g + 4;
          o = c[g >> 2] | 0
         }
         Nj(U, o);
         o = w;
         h = w;
         Q = 30
        }
        break
       }
      case 0:
       {
        if ((E | 0) != 3) {
         o = w;
         h = w;
         Q = 30
        }
        break
       }
      case 3:
       {
        p = a[T >> 0] | 0;o = (p & 1) == 0 ? (p & 255) >>> 1 : c[F >> 2] | 0;g = a[W >> 0] | 0;g = (g & 1) == 0 ? (g & 255) >>> 1 : c[G >> 2] | 0;
        if ((o | 0) != (0 - g | 0)) {
         h = (o | 0) == 0;
         q = c[b >> 2] | 0;
         t = c[q + 12 >> 2] | 0;
         o = c[q + 16 >> 2] | 0;
         f = (t | 0) == (o | 0);
         if (h | (g | 0) == 0) {
          if (f) o = wb[c[(c[q >> 2] | 0) + 36 >> 2] & 127](q) | 0;
          else o = c[t >> 2] | 0;
          if (h) {
           if ((o | 0) != (c[((a[W >> 0] & 1) == 0 ? G : c[H >> 2] | 0) >> 2] | 0)) break b;
           o = c[b >> 2] | 0;
           f = o + 12 | 0;
           g = c[f >> 2] | 0;
           if ((g | 0) == (c[o + 16 >> 2] | 0)) wb[c[(c[o >> 2] | 0) + 40 >> 2] & 127](o) | 0;
           else c[f >> 2] = g + 4;
           a[k >> 0] = 1;
           w = a[W >> 0] | 0;
           r = ((w & 1) == 0 ? (w & 255) >>> 1 : c[G >> 2] | 0) >>> 0 > 1 ? W : r;
           break b
          }
          if ((o | 0) != (c[((a[T >> 0] & 1) == 0 ? F : c[I >> 2] | 0) >> 2] | 0)) {
           a[k >> 0] = 1;
           break b
          }
          o = c[b >> 2] | 0;
          f = o + 12 | 0;
          g = c[f >> 2] | 0;
          if ((g | 0) == (c[o + 16 >> 2] | 0)) wb[c[(c[o >> 2] | 0) + 40 >> 2] & 127](o) | 0;
          else c[f >> 2] = g + 4;
          w = a[T >> 0] | 0;
          r = ((w & 1) == 0 ? (w & 255) >>> 1 : c[F >> 2] | 0) >>> 0 > 1 ? T : r;
          break b
         }
         if (f) {
          h = wb[c[(c[q >> 2] | 0) + 36 >> 2] & 127](q) | 0;
          o = c[b >> 2] | 0;
          p = a[T >> 0] | 0;
          q = o;
          g = c[o + 12 >> 2] | 0;
          o = c[o + 16 >> 2] | 0
         } else {
          h = c[t >> 2] | 0;
          g = t
         }
         f = q + 12 | 0;
         o = (g | 0) == (o | 0);
         if ((h | 0) == (c[((p & 1) == 0 ? F : c[I >> 2] | 0) >> 2] | 0)) {
          if (o) wb[c[(c[q >> 2] | 0) + 40 >> 2] & 127](q) | 0;
          else c[f >> 2] = g + 4;
          w = a[T >> 0] | 0;
          r = ((w & 1) == 0 ? (w & 255) >>> 1 : c[F >> 2] | 0) >>> 0 > 1 ? T : r;
          break b
         }
         if (o) o = wb[c[(c[q >> 2] | 0) + 36 >> 2] & 127](q) | 0;
         else o = c[g >> 2] | 0;
         if ((o | 0) != (c[((a[W >> 0] & 1) == 0 ? G : c[H >> 2] | 0) >> 2] | 0)) {
          Q = 86;
          break a
         }
         o = c[b >> 2] | 0;
         f = o + 12 | 0;
         g = c[f >> 2] | 0;
         if ((g | 0) == (c[o + 16 >> 2] | 0)) wb[c[(c[o >> 2] | 0) + 40 >> 2] & 127](o) | 0;
         else c[f >> 2] = g + 4;
         a[k >> 0] = 1;
         w = a[W >> 0] | 0;
         r = ((w & 1) == 0 ? (w & 255) >>> 1 : c[G >> 2] | 0) >>> 0 > 1 ? W : r
        }
        break
       }
      case 2:
       {
        if (!(E >>> 0 < 2 | (r | 0) != 0) ? !(x | (E | 0) == 2 & (a[C >> 0] | 0) != 0) : 0) {
         r = 0;
         break b
        }
        h = a[V >> 0] | 0;g = c[y >> 2] | 0;f = (h & 1) == 0 ? z : g;o = f;c: do
         if ((E | 0) != 0 ? (d[P + (E + -1) >> 0] | 0) < 2 : 0) {
          v = (h & 1) == 0;
          d: do
           if ((f | 0) != ((v ? z : g) + ((v ? (h & 255) >>> 1 : c[z >> 2] | 0) << 2) | 0)) {
            h = f;
            while (1) {
             if (!(pb[c[(c[l >> 2] | 0) + 12 >> 2] & 31](l, 8192, c[h >> 2] | 0) | 0)) break;
             h = h + 4 | 0;
             o = h;
             f = a[V >> 0] | 0;
             g = c[y >> 2] | 0;
             v = (f & 1) == 0;
             if ((h | 0) == ((v ? z : g) + ((v ? (f & 255) >>> 1 : c[z >> 2] | 0) << 2) | 0)) {
              h = f;
              break d
             }
            }
            h = a[V >> 0] | 0;
            g = c[y >> 2] | 0
           }
          while (0);
          q = (h & 1) == 0 ? z : g;
          f = q;
          t = o - f >> 2;
          u = a[U >> 0] | 0;
          p = (u & 1) == 0;
          u = p ? (u & 255) >>> 1 : c[A >> 2] | 0;
          if (u >>> 0 >= t >>> 0) {
           p = p ? A : c[B >> 2] | 0;
           v = p + (u << 2) | 0;
           if (!t) f = o;
           else {
            p = p + (u - t << 2) | 0;
            while (1) {
             if ((c[p >> 2] | 0) != (c[q >> 2] | 0)) break c;
             p = p + 4 | 0;
             if ((p | 0) == (v | 0)) {
              f = o;
              break
             } else q = q + 4 | 0
            }
           }
          }
         } else f = o;while (0);o = (h & 1) == 0;o = (o ? z : g) + ((o ? (h & 255) >>> 1 : c[z >> 2] | 0) << 2) | 0;e: do
         if ((f | 0) != (o | 0)) {
          p = w;
          h = w;
          o = f;
          while (1) {
           f = c[b >> 2] | 0;
           do
            if (f) {
             g = c[f + 12 >> 2] | 0;
             if ((g | 0) == (c[f + 16 >> 2] | 0)) f = wb[c[(c[f >> 2] | 0) + 36 >> 2] & 127](f) | 0;
             else f = c[g >> 2] | 0;
             if ((f | 0) == -1) {
              c[b >> 2] = 0;
              g = 1;
              break
             } else {
              g = (c[b >> 2] | 0) == 0;
              break
             }
            } else g = 1;
           while (0);
           do
            if (h) {
             f = c[h + 12 >> 2] | 0;
             if ((f | 0) == (c[h + 16 >> 2] | 0)) f = wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0;
             else f = c[f >> 2] | 0;
             if ((f | 0) != -1)
              if (g ^ (p | 0) == 0) {
               f = p;
               q = p;
               break
              } else break e;
             else {
              c[e >> 2] = 0;
              f = 0;
              Q = 114;
              break
             }
            } else {
             f = p;
             Q = 114
            }
           while (0);
           if ((Q | 0) == 114) {
            Q = 0;
            if (g) break e;
            else q = 0
           }
           g = c[b >> 2] | 0;
           h = c[g + 12 >> 2] | 0;
           if ((h | 0) == (c[g + 16 >> 2] | 0)) g = wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0;
           else g = c[h >> 2] | 0;
           if ((g | 0) != (c[o >> 2] | 0)) break e;
           g = c[b >> 2] | 0;
           h = g + 12 | 0;
           p = c[h >> 2] | 0;
           if ((p | 0) == (c[g + 16 >> 2] | 0)) wb[c[(c[g >> 2] | 0) + 40 >> 2] & 127](g) | 0;
           else c[h >> 2] = p + 4;
           o = o + 4 | 0;
           g = a[V >> 0] | 0;
           w = (g & 1) == 0;
           g = (w ? z : c[y >> 2] | 0) + ((w ? (g & 255) >>> 1 : c[z >> 2] | 0) << 2) | 0;
           if ((o | 0) == (g | 0)) {
            o = g;
            break
           } else {
            p = f;
            h = q
           }
          }
         }while (0);
        if (x ? (w = a[V >> 0] | 0, v = (w & 1) == 0, (o | 0) != ((v ? z : c[y >> 2] | 0) + ((v ? (w & 255) >>> 1 : c[z >> 2] | 0) << 2) | 0)) : 0) {
         Q = 126;
         break a
        }
        break
       }
      case 4:
       {
        t = c[K >> 2] | 0;h = w;p = w;o = 0;f: while (1) {
         f = c[b >> 2] | 0;
         do
          if (f) {
           g = c[f + 12 >> 2] | 0;
           if ((g | 0) == (c[f + 16 >> 2] | 0)) f = wb[c[(c[f >> 2] | 0) + 36 >> 2] & 127](f) | 0;
           else f = c[g >> 2] | 0;
           if ((f | 0) == -1) {
            c[b >> 2] = 0;
            g = 1;
            break
           } else {
            g = (c[b >> 2] | 0) == 0;
            break
           }
          } else g = 1;
         while (0);
         do
          if (p) {
           f = c[p + 12 >> 2] | 0;
           if ((f | 0) == (c[p + 16 >> 2] | 0)) f = wb[c[(c[p >> 2] | 0) + 36 >> 2] & 127](p) | 0;
           else f = c[f >> 2] | 0;
           if ((f | 0) != -1)
            if (g ^ (h | 0) == 0) {
             f = h;
             q = h;
             break
            } else break f;
           else {
            c[e >> 2] = 0;
            f = 0;
            Q = 140;
            break
           }
          } else {
           f = h;
           Q = 140
          }
         while (0);
         if ((Q | 0) == 140) {
          Q = 0;
          if (g) {
           h = f;
           break
          } else q = 0
         }
         g = c[b >> 2] | 0;
         h = c[g + 12 >> 2] | 0;
         if ((h | 0) == (c[g + 16 >> 2] | 0)) h = wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0;
         else h = c[h >> 2] | 0;
         if (pb[c[(c[l >> 2] | 0) + 12 >> 2] & 31](l, 2048, h) | 0) {
          g = c[n >> 2] | 0;
          if ((g | 0) == (c[J >> 2] | 0)) {
           dr(m, n, J);
           g = c[n >> 2] | 0
          }
          c[n >> 2] = g + 4;
          c[g >> 2] = h;
          o = o + 1 | 0
         } else {
          w = a[X >> 0] | 0;
          if (!((h | 0) == (t | 0) & ((o | 0) != 0 ? (((w & 1) == 0 ? (w & 255) >>> 1 : c[D >> 2] | 0) | 0) != 0 : 0))) {
           h = f;
           break
          }
          if ((s | 0) == (c[N >> 2] | 0)) {
           br(Y, O, N);
           s = c[O >> 2] | 0
          }
          w = s + 4 | 0;
          c[O >> 2] = w;
          c[s >> 2] = o;
          s = w;
          o = 0
         }
         g = c[b >> 2] | 0;
         h = g + 12 | 0;
         p = c[h >> 2] | 0;
         if ((p | 0) == (c[g + 16 >> 2] | 0)) {
          wb[c[(c[g >> 2] | 0) + 40 >> 2] & 127](g) | 0;
          h = f;
          p = q;
          continue
         } else {
          c[h >> 2] = p + 4;
          h = f;
          p = q;
          continue
         }
        }
        if ((o | 0) != 0 ? (c[Y >> 2] | 0) != (s | 0) : 0) {
         if ((s | 0) == (c[N >> 2] | 0)) {
          br(Y, O, N);
          s = c[O >> 2] | 0
         }
         w = s + 4 | 0;
         c[O >> 2] = w;
         c[s >> 2] = o;
         s = w
        }
        q = c[M >> 2] | 0;
        if ((q | 0) > 0) {
         o = c[b >> 2] | 0;
         do
          if (o) {
           f = c[o + 12 >> 2] | 0;
           if ((f | 0) == (c[o + 16 >> 2] | 0)) o = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
           else o = c[f >> 2] | 0;
           if ((o | 0) == -1) {
            c[b >> 2] = 0;
            f = 1;
            break
           } else {
            f = (c[b >> 2] | 0) == 0;
            break
           }
          } else f = 1;
         while (0);
         do
          if (h) {
           o = c[h + 12 >> 2] | 0;
           if ((o | 0) == (c[h + 16 >> 2] | 0)) o = wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0;
           else o = c[o >> 2] | 0;
           if ((o | 0) != -1)
            if (f) break;
            else {
             Q = 180;
             break a
            } else {
            c[e >> 2] = 0;
            Q = 174;
            break
           }
          } else Q = 174;
         while (0);
         if ((Q | 0) == 174) {
          Q = 0;
          if (f) {
           Q = 180;
           break a
          } else h = 0
         }
         o = c[b >> 2] | 0;
         f = c[o + 12 >> 2] | 0;
         if ((f | 0) == (c[o + 16 >> 2] | 0)) o = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
         else o = c[f >> 2] | 0;
         if ((o | 0) != (c[L >> 2] | 0)) {
          Q = 180;
          break a
         }
         o = c[b >> 2] | 0;
         f = o + 12 | 0;
         g = c[f >> 2] | 0;
         if ((g | 0) == (c[o + 16 >> 2] | 0)) wb[c[(c[o >> 2] | 0) + 40 >> 2] & 127](o) | 0;
         else c[f >> 2] = g + 4;
         if ((q | 0) > 0) {
          p = h;
          g = h;
          t = q;
          while (1) {
           o = c[b >> 2] | 0;
           do
            if (o) {
             f = c[o + 12 >> 2] | 0;
             if ((f | 0) == (c[o + 16 >> 2] | 0)) o = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
             else o = c[f >> 2] | 0;
             if ((o | 0) == -1) {
              c[b >> 2] = 0;
              f = 1;
              break
             } else {
              f = (c[b >> 2] | 0) == 0;
              break
             }
            } else f = 1;
           while (0);
           do
            if (g) {
             o = c[g + 12 >> 2] | 0;
             if ((o | 0) == (c[g + 16 >> 2] | 0)) o = wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0;
             else o = c[o >> 2] | 0;
             if ((o | 0) != -1)
              if (f ^ (p | 0) == 0) {
               o = p;
               q = p;
               break
              } else {
               Q = 204;
               break a
              } else {
              c[e >> 2] = 0;
              o = 0;
              Q = 198;
              break
             }
            } else {
             o = p;
             Q = 198
            }
           while (0);
           if ((Q | 0) == 198) {
            Q = 0;
            if (f) {
             Q = 204;
             break a
            } else q = 0
           }
           f = c[b >> 2] | 0;
           g = c[f + 12 >> 2] | 0;
           if ((g | 0) == (c[f + 16 >> 2] | 0)) f = wb[c[(c[f >> 2] | 0) + 36 >> 2] & 127](f) | 0;
           else f = c[g >> 2] | 0;
           if (!(pb[c[(c[l >> 2] | 0) + 12 >> 2] & 31](l, 2048, f) | 0)) {
            Q = 204;
            break a
           }
           if ((c[n >> 2] | 0) == (c[J >> 2] | 0)) dr(m, n, J);
           f = c[b >> 2] | 0;
           g = c[f + 12 >> 2] | 0;
           if ((g | 0) == (c[f + 16 >> 2] | 0)) f = wb[c[(c[f >> 2] | 0) + 36 >> 2] & 127](f) | 0;
           else f = c[g >> 2] | 0;
           g = c[n >> 2] | 0;
           c[n >> 2] = g + 4;
           c[g >> 2] = f;
           f = t;
           t = t + -1 | 0;
           c[M >> 2] = t;
           g = c[b >> 2] | 0;
           h = g + 12 | 0;
           p = c[h >> 2] | 0;
           if ((p | 0) == (c[g + 16 >> 2] | 0)) wb[c[(c[g >> 2] | 0) + 40 >> 2] & 127](g) | 0;
           else c[h >> 2] = p + 4;
           if ((f | 0) <= 1) break;
           else {
            p = o;
            g = q
           }
          }
         }
        }
        if ((c[n >> 2] | 0) == (c[m >> 2] | 0)) {
         Q = 215;
         break a
        }
        break
       }
      default:
       {}
     }
     while (0);
     g: do
      if ((Q | 0) == 30)
       while (1) {
        Q = 0;
        f = c[b >> 2] | 0;
        do
         if (f) {
          g = c[f + 12 >> 2] | 0;
          if ((g | 0) == (c[f + 16 >> 2] | 0)) f = wb[c[(c[f >> 2] | 0) + 36 >> 2] & 127](f) | 0;
          else f = c[g >> 2] | 0;
          if ((f | 0) == -1) {
           c[b >> 2] = 0;
           g = 1;
           break
          } else {
           g = (c[b >> 2] | 0) == 0;
           break
          }
         } else g = 1;
        while (0);
        do
         if (h) {
          f = c[h + 12 >> 2] | 0;
          if ((f | 0) == (c[h + 16 >> 2] | 0)) f = wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0;
          else f = c[f >> 2] | 0;
          if ((f | 0) != -1)
           if (g ^ (o | 0) == 0) {
            p = o;
            h = o;
            break
           } else break g;
          else {
           c[e >> 2] = 0;
           o = 0;
           Q = 43;
           break
          }
         } else Q = 43;
        while (0);
        if ((Q | 0) == 43) {
         Q = 0;
         if (g) break g;
         else {
          p = o;
          h = 0
         }
        }
        o = c[b >> 2] | 0;
        f = c[o + 12 >> 2] | 0;
        if ((f | 0) == (c[o + 16 >> 2] | 0)) o = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
        else o = c[f >> 2] | 0;
        if (!(pb[c[(c[l >> 2] | 0) + 12 >> 2] & 31](l, 8192, o) | 0)) break g;
        o = c[b >> 2] | 0;
        f = o + 12 | 0;
        g = c[f >> 2] | 0;
        if ((g | 0) == (c[o + 16 >> 2] | 0)) o = wb[c[(c[o >> 2] | 0) + 40 >> 2] & 127](o) | 0;
        else {
         c[f >> 2] = g + 4;
         o = c[g >> 2] | 0
        }
        Nj(U, o);
        o = p;
        Q = 30
       }
      while (0);
    E = E + 1 | 0;
    if (E >>> 0 >= 4) {
     Q = 217;
     break
    }
   }
   h: do
    if ((Q | 0) == 28) {
     c[j >> 2] = c[j >> 2] | 4;
     f = 0
    } else
   if ((Q | 0) == 86) {
    c[j >> 2] = c[j >> 2] | 4;
    f = 0
   } else if ((Q | 0) == 126) {
    c[j >> 2] = c[j >> 2] | 4;
    f = 0
   } else if ((Q | 0) == 180) {
    c[j >> 2] = c[j >> 2] | 4;
    f = 0
   } else if ((Q | 0) == 204) {
    c[j >> 2] = c[j >> 2] | 4;
    f = 0
   } else if ((Q | 0) == 215) {
    c[j >> 2] = c[j >> 2] | 4;
    f = 0
   } else if ((Q | 0) == 217) {
    i: do
     if (r) {
      p = r + 4 | 0;
      q = r + 8 | 0;
      h = 1;
      j: while (1) {
       o = a[r >> 0] | 0;
       if (!(o & 1)) o = (o & 255) >>> 1;
       else o = c[p >> 2] | 0;
       if (h >>> 0 >= o >>> 0) break i;
       o = c[b >> 2] | 0;
       do
        if (o) {
         f = c[o + 12 >> 2] | 0;
         if ((f | 0) == (c[o + 16 >> 2] | 0)) o = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
         else o = c[f >> 2] | 0;
         if ((o | 0) == -1) {
          c[b >> 2] = 0;
          g = 1;
          break
         } else {
          g = (c[b >> 2] | 0) == 0;
          break
         }
        } else g = 1;
       while (0);
       o = c[e >> 2] | 0;
       do
        if (o) {
         f = c[o + 12 >> 2] | 0;
         if ((f | 0) == (c[o + 16 >> 2] | 0)) o = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
         else o = c[f >> 2] | 0;
         if ((o | 0) != -1)
          if (g) break;
          else break j;
         else {
          c[e >> 2] = 0;
          Q = 236;
          break
         }
        } else Q = 236;
       while (0);
       if ((Q | 0) == 236 ? (Q = 0, g) : 0) break;
       o = c[b >> 2] | 0;
       f = c[o + 12 >> 2] | 0;
       if ((f | 0) == (c[o + 16 >> 2] | 0)) o = wb[c[(c[o >> 2] | 0) + 36 >> 2] & 127](o) | 0;
       else o = c[f >> 2] | 0;
       if (!(a[r >> 0] & 1)) f = p;
       else f = c[q >> 2] | 0;
       if ((o | 0) != (c[f + (h << 2) >> 2] | 0)) break;
       o = h + 1 | 0;
       f = c[b >> 2] | 0;
       g = f + 12 | 0;
       h = c[g >> 2] | 0;
       if ((h | 0) == (c[f + 16 >> 2] | 0)) {
        wb[c[(c[f >> 2] | 0) + 40 >> 2] & 127](f) | 0;
        h = o;
        continue
       } else {
        c[g >> 2] = h + 4;
        h = o;
        continue
       }
      }
      c[j >> 2] = c[j >> 2] | 4;
      f = 0;
      break h
     }while (0);o = c[Y >> 2] | 0;
    if ((o | 0) != (s | 0) ? (c[R >> 2] = 0, ao(X, o, s, R), (c[R >> 2] | 0) != 0) : 0) {
     c[j >> 2] = c[j >> 2] | 4;
     f = 0
    } else f = 1
   }
   while (0);
   Jj(U);
   Jj(W);
   Jj(T);
   Jj(V);
   uj(X);
   o = c[Y >> 2] | 0;
   c[Y >> 2] = 0;
   if (o) sb[c[S >> 2] & 255](o);
   i = Z;
   return f | 0
  }

  function go(b, d, e, f, g, h, j) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0;
   s = i;
   i = i + 432 | 0;
   v = s + 424 | 0;
   t = s + 24 | 0;
   r = s + 16 | 0;
   l = s + 8 | 0;
   u = s + 4 | 0;
   k = s + 428 | 0;
   m = s;
   c[r >> 2] = t;
   q = r + 4 | 0;
   c[q >> 2] = 144;
   o = Xj(g) | 0;
   c[u >> 2] = o;
   b = Qo(u, 9328) | 0;
   a[k >> 0] = 0;
   n = c[e >> 2] | 0;
   c[m >> 2] = n;
   g = c[g + 4 >> 2] | 0;
   c[v >> 2] = c[m >> 2];
   m = n;
   if (fo(d, v, f, u, g, h, k, b, r, l, t + 400 | 0) | 0) {
    if (!(a[j >> 0] & 1)) a[j >> 0] = 0;
    else c[c[j + 8 >> 2] >> 2] = 0;
    c[j + 4 >> 2] = 0;
    if (a[k >> 0] | 0) Nj(j, Cb[c[(c[b >> 2] | 0) + 44 >> 2] & 15](b, 45) | 0);
    k = Cb[c[(c[b >> 2] | 0) + 44 >> 2] & 15](b, 48) | 0;
    b = c[r >> 2] | 0;
    f = c[l >> 2] | 0;
    g = f + -4 | 0;
    a: do
     if (b >>> 0 < g >>> 0)
      do {
       if ((c[b >> 2] | 0) != (k | 0)) break a;
       b = b + 4 | 0
      } while (b >>> 0 < g >>> 0);
    while (0);
    er(j, b, f) | 0
   }
   b = c[d >> 2] | 0;
   do
    if (b) {
     g = c[b + 12 >> 2] | 0;
     if ((g | 0) == (c[b + 16 >> 2] | 0)) b = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
     else b = c[g >> 2] | 0;
     if ((b | 0) == -1) {
      c[d >> 2] = 0;
      g = 1;
      break
     } else {
      g = (c[d >> 2] | 0) == 0;
      break
     }
    } else g = 1;
   while (0);
   do
    if (n) {
     b = c[m + 12 >> 2] | 0;
     if ((b | 0) == (c[m + 16 >> 2] | 0)) b = wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](m) | 0;
     else b = c[b >> 2] | 0;
     if ((b | 0) != -1)
      if (g) break;
      else {
       p = 26;
       break
      } else {
      c[e >> 2] = 0;
      p = 24;
      break
     }
    } else p = 24;
   while (0);
   if ((p | 0) == 24 ? g : 0) p = 26;
   if ((p | 0) == 26) c[h >> 2] = c[h >> 2] | 2;
   g = c[d >> 2] | 0;
   gs(o) | 0;
   b = c[r >> 2] | 0;
   c[r >> 2] = 0;
   if (b) sb[c[q >> 2] & 255](b);
   i = s;
   return g | 0
  }

  function ho(b, d, e, f, g, h, j, k, l, m) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   k = k | 0;
   l = l | 0;
   m = m | 0;
   var n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0;
   x = i;
   i = i + 112 | 0;
   n = x + 100 | 0;
   o = x + 88 | 0;
   p = x + 76 | 0;
   q = x + 64 | 0;
   r = x + 52 | 0;
   s = x + 48 | 0;
   t = x + 36 | 0;
   u = x + 24 | 0;
   v = x + 12 | 0;
   w = x;
   if (b) {
    b = Qo(d, 9072) | 0;
    tb[c[(c[b >> 2] | 0) + 44 >> 2] & 127](n, b);
    w = c[n >> 2] | 0;
    a[e >> 0] = w;
    a[e + 1 >> 0] = w >> 8;
    a[e + 2 >> 0] = w >> 16;
    a[e + 3 >> 0] = w >> 24;
    tb[c[(c[b >> 2] | 0) + 32 >> 2] & 127](o, b);
    if (!(a[l >> 0] & 1)) a[l >> 0] = 0;
    else c[c[l + 8 >> 2] >> 2] = 0;
    c[l + 4 >> 2] = 0;
    Mj(l, 0);
    c[l >> 2] = c[o >> 2];
    c[l + 4 >> 2] = c[o + 4 >> 2];
    c[l + 8 >> 2] = c[o + 8 >> 2];
    c[o >> 2] = 0;
    c[o + 4 >> 2] = 0;
    c[o + 8 >> 2] = 0;
    Jj(o);
    tb[c[(c[b >> 2] | 0) + 28 >> 2] & 127](p, b);
    if (!(a[k >> 0] & 1)) a[k >> 0] = 0;
    else c[c[k + 8 >> 2] >> 2] = 0;
    c[k + 4 >> 2] = 0;
    Mj(k, 0);
    c[k >> 2] = c[p >> 2];
    c[k + 4 >> 2] = c[p + 4 >> 2];
    c[k + 8 >> 2] = c[p + 8 >> 2];
    c[p >> 2] = 0;
    c[p + 4 >> 2] = 0;
    c[p + 8 >> 2] = 0;
    Jj(p);
    c[f >> 2] = wb[c[(c[b >> 2] | 0) + 12 >> 2] & 127](b) | 0;
    c[g >> 2] = wb[c[(c[b >> 2] | 0) + 16 >> 2] & 127](b) | 0;
    tb[c[(c[b >> 2] | 0) + 20 >> 2] & 127](q, b);
    if (!(a[h >> 0] & 1)) {
     a[h + 1 >> 0] = 0;
     a[h >> 0] = 0
    } else {
     a[c[h + 8 >> 2] >> 0] = 0;
     c[h + 4 >> 2] = 0
    }
    Aj(h, 0);
    c[h >> 2] = c[q >> 2];
    c[h + 4 >> 2] = c[q + 4 >> 2];
    c[h + 8 >> 2] = c[q + 8 >> 2];
    c[q >> 2] = 0;
    c[q + 4 >> 2] = 0;
    c[q + 8 >> 2] = 0;
    uj(q);
    tb[c[(c[b >> 2] | 0) + 24 >> 2] & 127](r, b);
    if (!(a[j >> 0] & 1)) a[j >> 0] = 0;
    else c[c[j + 8 >> 2] >> 2] = 0;
    c[j + 4 >> 2] = 0;
    Mj(j, 0);
    c[j >> 2] = c[r >> 2];
    c[j + 4 >> 2] = c[r + 4 >> 2];
    c[j + 8 >> 2] = c[r + 8 >> 2];
    c[r >> 2] = 0;
    c[r + 4 >> 2] = 0;
    c[r + 8 >> 2] = 0;
    Jj(r);
    b = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0
   } else {
    b = Qo(d, 9008) | 0;
    tb[c[(c[b >> 2] | 0) + 44 >> 2] & 127](s, b);
    s = c[s >> 2] | 0;
    a[e >> 0] = s;
    a[e + 1 >> 0] = s >> 8;
    a[e + 2 >> 0] = s >> 16;
    a[e + 3 >> 0] = s >> 24;
    tb[c[(c[b >> 2] | 0) + 32 >> 2] & 127](t, b);
    if (!(a[l >> 0] & 1)) a[l >> 0] = 0;
    else c[c[l + 8 >> 2] >> 2] = 0;
    c[l + 4 >> 2] = 0;
    Mj(l, 0);
    c[l >> 2] = c[t >> 2];
    c[l + 4 >> 2] = c[t + 4 >> 2];
    c[l + 8 >> 2] = c[t + 8 >> 2];
    c[t >> 2] = 0;
    c[t + 4 >> 2] = 0;
    c[t + 8 >> 2] = 0;
    Jj(t);
    tb[c[(c[b >> 2] | 0) + 28 >> 2] & 127](u, b);
    if (!(a[k >> 0] & 1)) a[k >> 0] = 0;
    else c[c[k + 8 >> 2] >> 2] = 0;
    c[k + 4 >> 2] = 0;
    Mj(k, 0);
    c[k >> 2] = c[u >> 2];
    c[k + 4 >> 2] = c[u + 4 >> 2];
    c[k + 8 >> 2] = c[u + 8 >> 2];
    c[u >> 2] = 0;
    c[u + 4 >> 2] = 0;
    c[u + 8 >> 2] = 0;
    Jj(u);
    c[f >> 2] = wb[c[(c[b >> 2] | 0) + 12 >> 2] & 127](b) | 0;
    c[g >> 2] = wb[c[(c[b >> 2] | 0) + 16 >> 2] & 127](b) | 0;
    tb[c[(c[b >> 2] | 0) + 20 >> 2] & 127](v, b);
    if (!(a[h >> 0] & 1)) {
     a[h + 1 >> 0] = 0;
     a[h >> 0] = 0
    } else {
     a[c[h + 8 >> 2] >> 0] = 0;
     c[h + 4 >> 2] = 0
    }
    Aj(h, 0);
    c[h >> 2] = c[v >> 2];
    c[h + 4 >> 2] = c[v + 4 >> 2];
    c[h + 8 >> 2] = c[v + 8 >> 2];
    c[v >> 2] = 0;
    c[v + 4 >> 2] = 0;
    c[v + 8 >> 2] = 0;
    uj(v);
    tb[c[(c[b >> 2] | 0) + 24 >> 2] & 127](w, b);
    if (!(a[j >> 0] & 1)) a[j >> 0] = 0;
    else c[c[j + 8 >> 2] >> 2] = 0;
    c[j + 4 >> 2] = 0;
    Mj(j, 0);
    c[j >> 2] = c[w >> 2];
    c[j + 4 >> 2] = c[w + 4 >> 2];
    c[j + 8 >> 2] = c[w + 8 >> 2];
    c[w >> 2] = 0;
    c[w + 4 >> 2] = 0;
    c[w + 8 >> 2] = 0;
    Jj(w);
    b = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0
   }
   c[m >> 2] = b;
   i = x;
   return
  }

  function io(a) {
   a = a | 0;
   return
  }

  function jo(a) {
   a = a | 0;
   mh(a);
   return
  }

  function ko(b, d, e, f, g, j) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   j = +j;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0,
    F = 0,
    G = 0,
    H = 0;
   F = i;
   i = i + 384 | 0;
   q = F + 8 | 0;
   l = F;
   b = F + 284 | 0;
   m = F + 72 | 0;
   k = F + 184 | 0;
   A = F + 68 | 0;
   w = F + 80 | 0;
   u = F + 77 | 0;
   t = F + 76 | 0;
   D = F + 56 | 0;
   C = F + 44 | 0;
   E = F + 32 | 0;
   o = F + 28 | 0;
   p = F + 84 | 0;
   s = F + 24 | 0;
   v = F + 20 | 0;
   r = F + 16 | 0;
   c[m >> 2] = b;
   h[q >> 3] = j;
   b = Ki(b, 100, 23577, q) | 0;
   if (b >>> 0 > 99) {
    b = dl() | 0;
    h[l >> 3] = j;
    b = Yq(m, b, 23577, l) | 0;
    k = c[m >> 2] | 0;
    if (!k) Rh();
    l = jj(b) | 0;
    if (!l) Rh();
    else {
     G = l;
     H = k;
     z = l;
     y = b
    }
   } else {
    G = 0;
    H = 0;
    z = k;
    y = b
   }
   b = Xj(f) | 0;
   c[A >> 2] = b;
   n = Qo(A, 9336) | 0;
   l = c[m >> 2] | 0;
   Ab[c[(c[n >> 2] | 0) + 32 >> 2] & 7](n, l, l + y | 0, z) | 0;
   if (!y) m = 0;
   else m = (a[c[m >> 2] >> 0] | 0) == 45;
   c[D >> 2] = 0;
   c[D + 4 >> 2] = 0;
   c[D + 8 >> 2] = 0;
   c[C >> 2] = 0;
   c[C + 4 >> 2] = 0;
   c[C + 8 >> 2] = 0;
   c[E >> 2] = 0;
   c[E + 4 >> 2] = 0;
   c[E + 8 >> 2] = 0;
   lo(e, m, A, w, u, t, D, C, E, o);
   l = c[o >> 2] | 0;
   if ((y | 0) > (l | 0)) {
    e = a[E >> 0] | 0;
    k = a[C >> 0] | 0;
    k = (y - l << 1 | 1) + l + ((e & 1) == 0 ? (e & 255) >>> 1 : c[E + 4 >> 2] | 0) + ((k & 1) == 0 ? (k & 255) >>> 1 : c[C + 4 >> 2] | 0) | 0
   } else {
    e = a[E >> 0] | 0;
    k = a[C >> 0] | 0;
    k = l + 2 + ((e & 1) == 0 ? (e & 255) >>> 1 : c[E + 4 >> 2] | 0) + ((k & 1) == 0 ? (k & 255) >>> 1 : c[C + 4 >> 2] | 0) | 0
   }
   if (k >>> 0 > 100) {
    k = jj(k) | 0;
    if (!k) Rh();
    else {
     B = k;
     x = k
    }
   } else {
    B = 0;
    x = p
   }
   mo(x, s, v, c[f + 4 >> 2] | 0, z, z + y | 0, n, m, w, a[u >> 0] | 0, a[t >> 0] | 0, D, C, E, l);
   c[r >> 2] = c[d >> 2];
   z = c[s >> 2] | 0;
   k = c[v >> 2] | 0;
   c[q >> 2] = c[r >> 2];
   k = ng(q, x, z, k, f, g) | 0;
   if (B) {
    kj(B);
    b = c[A >> 2] | 0
   }
   uj(E);
   uj(C);
   uj(D);
   gs(b) | 0;
   if (G) kj(G);
   if (H) kj(H);
   i = F;
   return k | 0
  }

  function lo(b, d, e, f, g, h, j, k, l, m) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   k = k | 0;
   l = l | 0;
   m = m | 0;
   var n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0;
   z = i;
   i = i + 112 | 0;
   n = z + 108 | 0;
   o = z + 96 | 0;
   p = z + 92 | 0;
   q = z + 80 | 0;
   x = z + 68 | 0;
   y = z + 56 | 0;
   r = z + 52 | 0;
   s = z + 40 | 0;
   t = z + 36 | 0;
   u = z + 24 | 0;
   v = z + 12 | 0;
   w = z;
   if (b) {
    e = Qo(e, 8944) | 0;
    b = c[e >> 2] | 0;
    if (d) {
     tb[c[b + 44 >> 2] & 127](n, e);
     d = c[n >> 2] | 0;
     a[f >> 0] = d;
     a[f + 1 >> 0] = d >> 8;
     a[f + 2 >> 0] = d >> 16;
     a[f + 3 >> 0] = d >> 24;
     tb[c[(c[e >> 2] | 0) + 32 >> 2] & 127](o, e);
     if (!(a[l >> 0] & 1)) {
      a[l + 1 >> 0] = 0;
      a[l >> 0] = 0
     } else {
      a[c[l + 8 >> 2] >> 0] = 0;
      c[l + 4 >> 2] = 0
     }
     Aj(l, 0);
     c[l >> 2] = c[o >> 2];
     c[l + 4 >> 2] = c[o + 4 >> 2];
     c[l + 8 >> 2] = c[o + 8 >> 2];
     c[o >> 2] = 0;
     c[o + 4 >> 2] = 0;
     c[o + 8 >> 2] = 0;
     uj(o);
     b = e
    } else {
     tb[c[b + 40 >> 2] & 127](p, e);
     d = c[p >> 2] | 0;
     a[f >> 0] = d;
     a[f + 1 >> 0] = d >> 8;
     a[f + 2 >> 0] = d >> 16;
     a[f + 3 >> 0] = d >> 24;
     tb[c[(c[e >> 2] | 0) + 28 >> 2] & 127](q, e);
     if (!(a[l >> 0] & 1)) {
      a[l + 1 >> 0] = 0;
      a[l >> 0] = 0
     } else {
      a[c[l + 8 >> 2] >> 0] = 0;
      c[l + 4 >> 2] = 0
     }
     Aj(l, 0);
     c[l >> 2] = c[q >> 2];
     c[l + 4 >> 2] = c[q + 4 >> 2];
     c[l + 8 >> 2] = c[q + 8 >> 2];
     c[q >> 2] = 0;
     c[q + 4 >> 2] = 0;
     c[q + 8 >> 2] = 0;
     uj(q);
     b = e
    }
    a[g >> 0] = wb[c[(c[e >> 2] | 0) + 12 >> 2] & 127](e) | 0;
    a[h >> 0] = wb[c[(c[e >> 2] | 0) + 16 >> 2] & 127](e) | 0;
    tb[c[(c[b >> 2] | 0) + 20 >> 2] & 127](x, e);
    if (!(a[j >> 0] & 1)) {
     a[j + 1 >> 0] = 0;
     a[j >> 0] = 0
    } else {
     a[c[j + 8 >> 2] >> 0] = 0;
     c[j + 4 >> 2] = 0
    }
    Aj(j, 0);
    c[j >> 2] = c[x >> 2];
    c[j + 4 >> 2] = c[x + 4 >> 2];
    c[j + 8 >> 2] = c[x + 8 >> 2];
    c[x >> 2] = 0;
    c[x + 4 >> 2] = 0;
    c[x + 8 >> 2] = 0;
    uj(x);
    tb[c[(c[b >> 2] | 0) + 24 >> 2] & 127](y, e);
    if (!(a[k >> 0] & 1)) {
     a[k + 1 >> 0] = 0;
     a[k >> 0] = 0
    } else {
     a[c[k + 8 >> 2] >> 0] = 0;
     c[k + 4 >> 2] = 0
    }
    Aj(k, 0);
    c[k >> 2] = c[y >> 2];
    c[k + 4 >> 2] = c[y + 4 >> 2];
    c[k + 8 >> 2] = c[y + 8 >> 2];
    c[y >> 2] = 0;
    c[y + 4 >> 2] = 0;
    c[y + 8 >> 2] = 0;
    uj(y);
    b = wb[c[(c[e >> 2] | 0) + 36 >> 2] & 127](e) | 0
   } else {
    e = Qo(e, 8880) | 0;
    b = c[e >> 2] | 0;
    if (d) {
     tb[c[b + 44 >> 2] & 127](r, e);
     d = c[r >> 2] | 0;
     a[f >> 0] = d;
     a[f + 1 >> 0] = d >> 8;
     a[f + 2 >> 0] = d >> 16;
     a[f + 3 >> 0] = d >> 24;
     tb[c[(c[e >> 2] | 0) + 32 >> 2] & 127](s, e);
     if (!(a[l >> 0] & 1)) {
      a[l + 1 >> 0] = 0;
      a[l >> 0] = 0
     } else {
      a[c[l + 8 >> 2] >> 0] = 0;
      c[l + 4 >> 2] = 0
     }
     Aj(l, 0);
     c[l >> 2] = c[s >> 2];
     c[l + 4 >> 2] = c[s + 4 >> 2];
     c[l + 8 >> 2] = c[s + 8 >> 2];
     c[s >> 2] = 0;
     c[s + 4 >> 2] = 0;
     c[s + 8 >> 2] = 0;
     uj(s);
     b = e
    } else {
     tb[c[b + 40 >> 2] & 127](t, e);
     d = c[t >> 2] | 0;
     a[f >> 0] = d;
     a[f + 1 >> 0] = d >> 8;
     a[f + 2 >> 0] = d >> 16;
     a[f + 3 >> 0] = d >> 24;
     tb[c[(c[e >> 2] | 0) + 28 >> 2] & 127](u, e);
     if (!(a[l >> 0] & 1)) {
      a[l + 1 >> 0] = 0;
      a[l >> 0] = 0
     } else {
      a[c[l + 8 >> 2] >> 0] = 0;
      c[l + 4 >> 2] = 0
     }
     Aj(l, 0);
     c[l >> 2] = c[u >> 2];
     c[l + 4 >> 2] = c[u + 4 >> 2];
     c[l + 8 >> 2] = c[u + 8 >> 2];
     c[u >> 2] = 0;
     c[u + 4 >> 2] = 0;
     c[u + 8 >> 2] = 0;
     uj(u);
     b = e
    }
    a[g >> 0] = wb[c[(c[e >> 2] | 0) + 12 >> 2] & 127](e) | 0;
    a[h >> 0] = wb[c[(c[e >> 2] | 0) + 16 >> 2] & 127](e) | 0;
    tb[c[(c[b >> 2] | 0) + 20 >> 2] & 127](v, e);
    if (!(a[j >> 0] & 1)) {
     a[j + 1 >> 0] = 0;
     a[j >> 0] = 0
    } else {
     a[c[j + 8 >> 2] >> 0] = 0;
     c[j + 4 >> 2] = 0
    }
    Aj(j, 0);
    c[j >> 2] = c[v >> 2];
    c[j + 4 >> 2] = c[v + 4 >> 2];
    c[j + 8 >> 2] = c[v + 8 >> 2];
    c[v >> 2] = 0;
    c[v + 4 >> 2] = 0;
    c[v + 8 >> 2] = 0;
    uj(v);
    tb[c[(c[b >> 2] | 0) + 24 >> 2] & 127](w, e);
    if (!(a[k >> 0] & 1)) {
     a[k + 1 >> 0] = 0;
     a[k >> 0] = 0
    } else {
     a[c[k + 8 >> 2] >> 0] = 0;
     c[k + 4 >> 2] = 0
    }
    Aj(k, 0);
    c[k >> 2] = c[w >> 2];
    c[k + 4 >> 2] = c[w + 4 >> 2];
    c[k + 8 >> 2] = c[w + 8 >> 2];
    c[w >> 2] = 0;
    c[w + 4 >> 2] = 0;
    c[w + 8 >> 2] = 0;
    uj(w);
    b = wb[c[(c[e >> 2] | 0) + 36 >> 2] & 127](e) | 0
   }
   c[m >> 2] = b;
   i = z;
   return
  }

  function mo(d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   i = i | 0;
   j = j | 0;
   k = k | 0;
   l = l | 0;
   m = m | 0;
   n = n | 0;
   o = o | 0;
   p = p | 0;
   q = q | 0;
   r = r | 0;
   var s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0,
    F = 0,
    G = 0,
    H = 0,
    I = 0,
    J = 0,
    K = 0,
    L = 0,
    M = 0,
    N = 0,
    O = 0,
    P = 0;
   c[f >> 2] = d;
   N = q + 4 | 0;
   O = q + 8 | 0;
   P = q + 1 | 0;
   H = p + 4 | 0;
   I = (g & 512 | 0) == 0;
   J = p + 8 | 0;
   K = p + 1 | 0;
   L = j + 8 | 0;
   M = (r | 0) > 0;
   A = o + 4 | 0;
   B = o + 8 | 0;
   C = o + 1 | 0;
   D = r + 1 | 0;
   F = -2 - r - ((r | 0) < 0 ? ~r : -1) | 0;
   G = (r | 0) > 0;
   z = 0;
   do {
    switch (a[l + z >> 0] | 0) {
     case 0:
      {
       c[e >> 2] = c[f >> 2];
       break
      }
     case 1:
      {
       c[e >> 2] = c[f >> 2];x = Cb[c[(c[j >> 2] | 0) + 28 >> 2] & 15](j, 32) | 0;y = c[f >> 2] | 0;c[f >> 2] = y + 1;a[y >> 0] = x;
       break
      }
     case 3:
      {
       y = a[q >> 0] | 0;s = (y & 1) == 0;
       if ((s ? (y & 255) >>> 1 : c[N >> 2] | 0) | 0) {
        x = a[(s ? P : c[O >> 2] | 0) >> 0] | 0;
        y = c[f >> 2] | 0;
        c[f >> 2] = y + 1;
        a[y >> 0] = x
       }
       break
      }
     case 2:
      {
       u = a[p >> 0] | 0;s = (u & 1) == 0;u = s ? (u & 255) >>> 1 : c[H >> 2] | 0;
       if (!(I | (u | 0) == 0)) {
        t = s ? K : c[J >> 2] | 0;
        v = t + u | 0;
        s = c[f >> 2] | 0;
        if (u)
         do {
          a[s >> 0] = a[t >> 0] | 0;
          t = t + 1 | 0;
          s = s + 1 | 0
         } while ((t | 0) != (v | 0));
        c[f >> 2] = s
       }
       break
      }
     case 4:
      {
       s = c[f >> 2] | 0;h = k ? h + 1 | 0 : h;w = h;v = c[L >> 2] | 0;a: do
        if (h >>> 0 < i >>> 0) {
         t = h;
         do {
          u = a[t >> 0] | 0;
          if (u << 24 >> 24 <= -1) break a;
          if (!(b[v + (u << 24 >> 24 << 1) >> 1] & 2048)) break a;
          t = t + 1 | 0
         } while (t >>> 0 < i >>> 0)
        } else t = h;while (0);u = t;
       if (M) {
        x = -2 - u - ~(u >>> 0 > w >>> 0 ? w : u) | 0;
        x = F >>> 0 > x >>> 0 ? F : x;
        if (t >>> 0 > h >>> 0 & G) {
         u = t;
         w = r;
         while (1) {
          u = u + -1 | 0;
          y = a[u >> 0] | 0;
          v = c[f >> 2] | 0;
          c[f >> 2] = v + 1;
          a[v >> 0] = y;
          v = (w | 0) > 1;
          if (!(u >>> 0 > h >>> 0 & v)) break;
          else w = w + -1 | 0
         }
        } else v = G;
        y = D + x | 0;
        u = t + (x + 1) | 0;
        if (v) w = Cb[c[(c[j >> 2] | 0) + 28 >> 2] & 15](j, 48) | 0;
        else w = 0;
        t = c[f >> 2] | 0;
        c[f >> 2] = t + 1;
        if ((y | 0) > 0) {
         v = y;
         while (1) {
          a[t >> 0] = w;
          t = c[f >> 2] | 0;
          c[f >> 2] = t + 1;
          if ((v | 0) > 1) v = v + -1 | 0;
          else break
         }
        }
        a[t >> 0] = m
       } else u = t;
       if ((u | 0) != (h | 0)) {
        y = a[o >> 0] | 0;
        t = (y & 1) == 0;
        if (!((t ? (y & 255) >>> 1 : c[A >> 2] | 0) | 0)) t = -1;
        else t = a[(t ? C : c[B >> 2] | 0) >> 0] | 0;
        if ((u | 0) != (h | 0)) {
         v = 0;
         w = 0;
         while (1) {
          if ((w | 0) == (t | 0)) {
           y = c[f >> 2] | 0;
           c[f >> 2] = y + 1;
           a[y >> 0] = n;
           v = v + 1 | 0;
           y = a[o >> 0] | 0;
           t = (y & 1) == 0;
           if (v >>> 0 < (t ? (y & 255) >>> 1 : c[A >> 2] | 0) >>> 0) {
            t = a[(t ? C : c[B >> 2] | 0) + v >> 0] | 0;
            t = t << 24 >> 24 == 127 ? -1 : t << 24 >> 24;
            w = 0
           } else {
            t = w;
            w = 0
           }
          }
          u = u + -1 | 0;
          x = a[u >> 0] | 0;
          y = c[f >> 2] | 0;
          c[f >> 2] = y + 1;
          a[y >> 0] = x;
          if ((u | 0) == (h | 0)) break;
          else w = w + 1 | 0
         }
        }
       } else {
        x = Cb[c[(c[j >> 2] | 0) + 28 >> 2] & 15](j, 48) | 0;
        y = c[f >> 2] | 0;
        c[f >> 2] = y + 1;
        a[y >> 0] = x
       }
       t = c[f >> 2] | 0;
       if ((s | 0) != (t | 0) ? (E = t + -1 | 0, s >>> 0 < E >>> 0) : 0) {
        t = E;
        do {
         y = a[s >> 0] | 0;
         a[s >> 0] = a[t >> 0] | 0;
         a[t >> 0] = y;
         s = s + 1 | 0;
         t = t + -1 | 0
        } while (s >>> 0 < t >>> 0)
       }
       break
      }
     default:
      {}
    }
    z = z + 1 | 0
   } while ((z | 0) != 4);
   t = a[q >> 0] | 0;
   h = (t & 1) == 0;
   t = h ? (t & 255) >>> 1 : c[N >> 2] | 0;
   if (t >>> 0 > 1) {
    s = h ? P : c[O >> 2] | 0;
    u = s + t | 0;
    h = c[f >> 2] | 0;
    if ((t | 0) != 1) {
     s = s + 1 | 0;
     do {
      a[h >> 0] = a[s >> 0] | 0;
      h = h + 1 | 0;
      s = s + 1 | 0
     } while ((s | 0) != (u | 0))
    }
    c[f >> 2] = h
   }
   switch (g & 176 | 0) {
    case 32:
     {
      c[e >> 2] = c[f >> 2];
      break
     }
    case 16:
     break;
    default:
     c[e >> 2] = d
   }
   return
  }

  function no(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0;
   D = i;
   i = i + 176 | 0;
   p = D + 56 | 0;
   y = D + 52 | 0;
   w = D + 64 | 0;
   u = D + 61 | 0;
   t = D + 60 | 0;
   B = D + 40 | 0;
   A = D + 28 | 0;
   C = D + 16 | 0;
   l = D + 12 | 0;
   o = D + 68 | 0;
   s = D + 8 | 0;
   v = D + 4 | 0;
   q = D;
   b = Xj(f) | 0;
   c[y >> 2] = b;
   r = Qo(y, 9336) | 0;
   n = a[h >> 0] | 0;
   j = (n & 1) == 0;
   k = h + 4 | 0;
   if (!((j ? (n & 255) >>> 1 : c[k >> 2] | 0) | 0)) n = 0;
   else {
    n = a[(j ? h + 1 | 0 : c[h + 8 >> 2] | 0) >> 0] | 0;
    n = n << 24 >> 24 == (Cb[c[(c[r >> 2] | 0) + 28 >> 2] & 15](r, 45) | 0) << 24 >> 24
   }
   c[B >> 2] = 0;
   c[B + 4 >> 2] = 0;
   c[B + 8 >> 2] = 0;
   c[A >> 2] = 0;
   c[A + 4 >> 2] = 0;
   c[A + 8 >> 2] = 0;
   c[C >> 2] = 0;
   c[C + 4 >> 2] = 0;
   c[C + 8 >> 2] = 0;
   lo(e, n, y, w, u, t, B, A, C, l);
   m = a[h >> 0] | 0;
   e = c[k >> 2] | 0;
   j = (m & 1) == 0 ? (m & 255) >>> 1 : e;
   k = c[l >> 2] | 0;
   if ((j | 0) > (k | 0)) {
    E = a[C >> 0] | 0;
    l = a[A >> 0] | 0;
    j = (j - k << 1 | 1) + k + ((E & 1) == 0 ? (E & 255) >>> 1 : c[C + 4 >> 2] | 0) + ((l & 1) == 0 ? (l & 255) >>> 1 : c[A + 4 >> 2] | 0) | 0
   } else {
    E = a[C >> 0] | 0;
    j = a[A >> 0] | 0;
    j = k + 2 + ((E & 1) == 0 ? (E & 255) >>> 1 : c[C + 4 >> 2] | 0) + ((j & 1) == 0 ? (j & 255) >>> 1 : c[A + 4 >> 2] | 0) | 0
   }
   if (j >>> 0 > 100) {
    j = jj(j) | 0;
    if (!j) Rh();
    else {
     z = j;
     x = j
    }
   } else {
    z = 0;
    x = o
   }
   E = (m & 1) == 0;
   j = E ? h + 1 | 0 : c[h + 8 >> 2] | 0;
   mo(x, s, v, c[f + 4 >> 2] | 0, j, j + (E ? (m & 255) >>> 1 : e) | 0, r, n, w, a[u >> 0] | 0, a[t >> 0] | 0, B, A, C, k);
   c[q >> 2] = c[d >> 2];
   E = c[s >> 2] | 0;
   j = c[v >> 2] | 0;
   c[p >> 2] = c[q >> 2];
   j = ng(p, x, E, j, f, g) | 0;
   if (z) {
    kj(z);
    b = c[y >> 2] | 0
   }
   uj(C);
   uj(A);
   uj(B);
   gs(b) | 0;
   i = D;
   return j | 0
  }

  function oo(a) {
   a = a | 0;
   return
  }

  function po(a) {
   a = a | 0;
   mh(a);
   return
  }

  function qo(b, d, e, f, g, j) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   j = +j;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0,
    F = 0,
    G = 0,
    H = 0;
   F = i;
   i = i + 992 | 0;
   q = F + 8 | 0;
   l = F;
   b = F + 888 | 0;
   m = F + 880 | 0;
   k = F + 480 | 0;
   A = F + 76 | 0;
   w = F + 884 | 0;
   u = F + 72 | 0;
   t = F + 68 | 0;
   D = F + 56 | 0;
   C = F + 44 | 0;
   E = F + 32 | 0;
   o = F + 28 | 0;
   p = F + 80 | 0;
   s = F + 24 | 0;
   v = F + 20 | 0;
   r = F + 16 | 0;
   c[m >> 2] = b;
   h[q >> 3] = j;
   b = Ki(b, 100, 23577, q) | 0;
   if (b >>> 0 > 99) {
    b = dl() | 0;
    h[l >> 3] = j;
    b = Yq(m, b, 23577, l) | 0;
    k = c[m >> 2] | 0;
    if (!k) Rh();
    l = jj(b << 2) | 0;
    if (!l) Rh();
    else {
     G = l;
     H = k;
     z = l;
     y = b
    }
   } else {
    G = 0;
    H = 0;
    z = k;
    y = b
   }
   b = Xj(f) | 0;
   c[A >> 2] = b;
   n = Qo(A, 9328) | 0;
   l = c[m >> 2] | 0;
   Ab[c[(c[n >> 2] | 0) + 48 >> 2] & 7](n, l, l + y | 0, z) | 0;
   if (!y) m = 0;
   else m = (a[c[m >> 2] >> 0] | 0) == 45;
   c[D >> 2] = 0;
   c[D + 4 >> 2] = 0;
   c[D + 8 >> 2] = 0;
   c[C >> 2] = 0;
   c[C + 4 >> 2] = 0;
   c[C + 8 >> 2] = 0;
   c[E >> 2] = 0;
   c[E + 4 >> 2] = 0;
   c[E + 8 >> 2] = 0;
   ro(e, m, A, w, u, t, D, C, E, o);
   l = c[o >> 2] | 0;
   if ((y | 0) > (l | 0)) {
    e = a[E >> 0] | 0;
    k = a[C >> 0] | 0;
    k = (y - l << 1 | 1) + l + ((e & 1) == 0 ? (e & 255) >>> 1 : c[E + 4 >> 2] | 0) + ((k & 1) == 0 ? (k & 255) >>> 1 : c[C + 4 >> 2] | 0) | 0
   } else {
    e = a[E >> 0] | 0;
    k = a[C >> 0] | 0;
    k = l + 2 + ((e & 1) == 0 ? (e & 255) >>> 1 : c[E + 4 >> 2] | 0) + ((k & 1) == 0 ? (k & 255) >>> 1 : c[C + 4 >> 2] | 0) | 0
   }
   if (k >>> 0 > 100) {
    k = jj(k << 2) | 0;
    if (!k) Rh();
    else {
     B = k;
     x = k
    }
   } else {
    B = 0;
    x = p
   }
   so(x, s, v, c[f + 4 >> 2] | 0, z, z + (y << 2) | 0, n, m, w, c[u >> 2] | 0, c[t >> 2] | 0, D, C, E, l);
   c[r >> 2] = c[d >> 2];
   z = c[s >> 2] | 0;
   k = c[v >> 2] | 0;
   c[q >> 2] = c[r >> 2];
   k = Zq(q, x, z, k, f, g) | 0;
   if (B) {
    kj(B);
    b = c[A >> 2] | 0
   }
   Jj(E);
   Jj(C);
   uj(D);
   gs(b) | 0;
   if (G) kj(G);
   if (H) kj(H);
   i = F;
   return k | 0
  }

  function ro(b, d, e, f, g, h, j, k, l, m) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   k = k | 0;
   l = l | 0;
   m = m | 0;
   var n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0;
   z = i;
   i = i + 112 | 0;
   n = z + 108 | 0;
   o = z + 96 | 0;
   r = z + 92 | 0;
   s = z + 80 | 0;
   t = z + 68 | 0;
   u = z + 56 | 0;
   v = z + 52 | 0;
   w = z + 40 | 0;
   x = z + 36 | 0;
   y = z + 24 | 0;
   p = z + 12 | 0;
   q = z;
   if (b) {
    b = Qo(e, 9072) | 0;
    e = c[b >> 2] | 0;
    if (d) {
     tb[c[e + 44 >> 2] & 127](n, b);
     d = c[n >> 2] | 0;
     a[f >> 0] = d;
     a[f + 1 >> 0] = d >> 8;
     a[f + 2 >> 0] = d >> 16;
     a[f + 3 >> 0] = d >> 24;
     tb[c[(c[b >> 2] | 0) + 32 >> 2] & 127](o, b);
     if (!(a[l >> 0] & 1)) a[l >> 0] = 0;
     else c[c[l + 8 >> 2] >> 2] = 0;
     c[l + 4 >> 2] = 0;
     Mj(l, 0);
     c[l >> 2] = c[o >> 2];
     c[l + 4 >> 2] = c[o + 4 >> 2];
     c[l + 8 >> 2] = c[o + 8 >> 2];
     c[o >> 2] = 0;
     c[o + 4 >> 2] = 0;
     c[o + 8 >> 2] = 0;
     Jj(o)
    } else {
     tb[c[e + 40 >> 2] & 127](r, b);
     d = c[r >> 2] | 0;
     a[f >> 0] = d;
     a[f + 1 >> 0] = d >> 8;
     a[f + 2 >> 0] = d >> 16;
     a[f + 3 >> 0] = d >> 24;
     tb[c[(c[b >> 2] | 0) + 28 >> 2] & 127](s, b);
     if (!(a[l >> 0] & 1)) a[l >> 0] = 0;
     else c[c[l + 8 >> 2] >> 2] = 0;
     c[l + 4 >> 2] = 0;
     Mj(l, 0);
     c[l >> 2] = c[s >> 2];
     c[l + 4 >> 2] = c[s + 4 >> 2];
     c[l + 8 >> 2] = c[s + 8 >> 2];
     c[s >> 2] = 0;
     c[s + 4 >> 2] = 0;
     c[s + 8 >> 2] = 0;
     Jj(s)
    }
    c[g >> 2] = wb[c[(c[b >> 2] | 0) + 12 >> 2] & 127](b) | 0;
    c[h >> 2] = wb[c[(c[b >> 2] | 0) + 16 >> 2] & 127](b) | 0;
    tb[c[(c[b >> 2] | 0) + 20 >> 2] & 127](t, b);
    if (!(a[j >> 0] & 1)) {
     a[j + 1 >> 0] = 0;
     a[j >> 0] = 0
    } else {
     a[c[j + 8 >> 2] >> 0] = 0;
     c[j + 4 >> 2] = 0
    }
    Aj(j, 0);
    c[j >> 2] = c[t >> 2];
    c[j + 4 >> 2] = c[t + 4 >> 2];
    c[j + 8 >> 2] = c[t + 8 >> 2];
    c[t >> 2] = 0;
    c[t + 4 >> 2] = 0;
    c[t + 8 >> 2] = 0;
    uj(t);
    tb[c[(c[b >> 2] | 0) + 24 >> 2] & 127](u, b);
    if (!(a[k >> 0] & 1)) a[k >> 0] = 0;
    else c[c[k + 8 >> 2] >> 2] = 0;
    c[k + 4 >> 2] = 0;
    Mj(k, 0);
    c[k >> 2] = c[u >> 2];
    c[k + 4 >> 2] = c[u + 4 >> 2];
    c[k + 8 >> 2] = c[u + 8 >> 2];
    c[u >> 2] = 0;
    c[u + 4 >> 2] = 0;
    c[u + 8 >> 2] = 0;
    Jj(u);
    b = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0
   } else {
    b = Qo(e, 9008) | 0;
    e = c[b >> 2] | 0;
    if (d) {
     tb[c[e + 44 >> 2] & 127](v, b);
     d = c[v >> 2] | 0;
     a[f >> 0] = d;
     a[f + 1 >> 0] = d >> 8;
     a[f + 2 >> 0] = d >> 16;
     a[f + 3 >> 0] = d >> 24;
     tb[c[(c[b >> 2] | 0) + 32 >> 2] & 127](w, b);
     if (!(a[l >> 0] & 1)) a[l >> 0] = 0;
     else c[c[l + 8 >> 2] >> 2] = 0;
     c[l + 4 >> 2] = 0;
     Mj(l, 0);
     c[l >> 2] = c[w >> 2];
     c[l + 4 >> 2] = c[w + 4 >> 2];
     c[l + 8 >> 2] = c[w + 8 >> 2];
     c[w >> 2] = 0;
     c[w + 4 >> 2] = 0;
     c[w + 8 >> 2] = 0;
     Jj(w)
    } else {
     tb[c[e + 40 >> 2] & 127](x, b);
     d = c[x >> 2] | 0;
     a[f >> 0] = d;
     a[f + 1 >> 0] = d >> 8;
     a[f + 2 >> 0] = d >> 16;
     a[f + 3 >> 0] = d >> 24;
     tb[c[(c[b >> 2] | 0) + 28 >> 2] & 127](y, b);
     if (!(a[l >> 0] & 1)) a[l >> 0] = 0;
     else c[c[l + 8 >> 2] >> 2] = 0;
     c[l + 4 >> 2] = 0;
     Mj(l, 0);
     c[l >> 2] = c[y >> 2];
     c[l + 4 >> 2] = c[y + 4 >> 2];
     c[l + 8 >> 2] = c[y + 8 >> 2];
     c[y >> 2] = 0;
     c[y + 4 >> 2] = 0;
     c[y + 8 >> 2] = 0;
     Jj(y)
    }
    c[g >> 2] = wb[c[(c[b >> 2] | 0) + 12 >> 2] & 127](b) | 0;
    c[h >> 2] = wb[c[(c[b >> 2] | 0) + 16 >> 2] & 127](b) | 0;
    tb[c[(c[b >> 2] | 0) + 20 >> 2] & 127](p, b);
    if (!(a[j >> 0] & 1)) {
     a[j + 1 >> 0] = 0;
     a[j >> 0] = 0
    } else {
     a[c[j + 8 >> 2] >> 0] = 0;
     c[j + 4 >> 2] = 0
    }
    Aj(j, 0);
    c[j >> 2] = c[p >> 2];
    c[j + 4 >> 2] = c[p + 4 >> 2];
    c[j + 8 >> 2] = c[p + 8 >> 2];
    c[p >> 2] = 0;
    c[p + 4 >> 2] = 0;
    c[p + 8 >> 2] = 0;
    uj(p);
    tb[c[(c[b >> 2] | 0) + 24 >> 2] & 127](q, b);
    if (!(a[k >> 0] & 1)) a[k >> 0] = 0;
    else c[c[k + 8 >> 2] >> 2] = 0;
    c[k + 4 >> 2] = 0;
    Mj(k, 0);
    c[k >> 2] = c[q >> 2];
    c[k + 4 >> 2] = c[q + 4 >> 2];
    c[k + 8 >> 2] = c[q + 8 >> 2];
    c[q >> 2] = 0;
    c[q + 4 >> 2] = 0;
    c[q + 8 >> 2] = 0;
    Jj(q);
    b = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0
   }
   c[m >> 2] = b;
   i = z;
   return
  }

  function so(b, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   i = i | 0;
   j = j | 0;
   k = k | 0;
   l = l | 0;
   m = m | 0;
   n = n | 0;
   o = o | 0;
   p = p | 0;
   q = q | 0;
   var r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0,
    F = 0,
    G = 0,
    H = 0,
    I = 0,
    J = 0,
    K = 0;
   c[e >> 2] = b;
   J = p + 4 | 0;
   K = p + 8 | 0;
   C = o + 4 | 0;
   D = (f & 512 | 0) == 0;
   E = o + 8 | 0;
   F = (q | 0) > 0;
   G = n + 4 | 0;
   H = n + 8 | 0;
   I = n + 1 | 0;
   A = (q | 0) > 0;
   z = 0;
   do {
    switch (a[k + z >> 0] | 0) {
     case 0:
      {
       c[d >> 2] = c[e >> 2];
       break
      }
     case 1:
      {
       c[d >> 2] = c[e >> 2];x = Cb[c[(c[i >> 2] | 0) + 44 >> 2] & 15](i, 32) | 0;y = c[e >> 2] | 0;c[e >> 2] = y + 4;c[y >> 2] = x;
       break
      }
     case 3:
      {
       y = a[p >> 0] | 0;r = (y & 1) == 0;
       if ((r ? (y & 255) >>> 1 : c[J >> 2] | 0) | 0) {
        x = c[(r ? J : c[K >> 2] | 0) >> 2] | 0;
        y = c[e >> 2] | 0;
        c[e >> 2] = y + 4;
        c[y >> 2] = x
       }
       break
      }
     case 2:
      {
       v = a[o >> 0] | 0;r = (v & 1) == 0;v = r ? (v & 255) >>> 1 : c[C >> 2] | 0;
       if (!(D | (v | 0) == 0)) {
        r = r ? C : c[E >> 2] | 0;
        t = r + (v << 2) | 0;
        u = c[e >> 2] | 0;
        if (v) {
         s = u;
         while (1) {
          c[s >> 2] = c[r >> 2];
          r = r + 4 | 0;
          if ((r | 0) == (t | 0)) break;
          else s = s + 4 | 0
         }
        }
        c[e >> 2] = u + (v << 2)
       }
       break
      }
     case 4:
      {
       r = c[e >> 2] | 0;g = j ? g + 4 | 0 : g;a: do
        if (g >>> 0 < h >>> 0) {
         s = g;
         do {
          if (!(pb[c[(c[i >> 2] | 0) + 12 >> 2] & 31](i, 2048, c[s >> 2] | 0) | 0)) break a;
          s = s + 4 | 0
         } while (s >>> 0 < h >>> 0)
        } else s = g;while (0);
       if (F) {
        if (s >>> 0 > g >>> 0 & A) {
         v = c[e >> 2] | 0;
         u = q;
         while (1) {
          s = s + -4 | 0;
          t = v + 4 | 0;
          c[v >> 2] = c[s >> 2];
          w = u + -1 | 0;
          u = (u | 0) > 1;
          if (s >>> 0 > g >>> 0 & u) {
           v = t;
           u = w
          } else {
           v = w;
           break
          }
         }
         c[e >> 2] = t;
         t = v
        } else {
         u = A;
         t = q
        }
        if (u) w = Cb[c[(c[i >> 2] | 0) + 44 >> 2] & 15](i, 48) | 0;
        else w = 0;
        x = c[e >> 2] | 0;
        u = t + ((t | 0) < 0 ? ~t : -1) | 0;
        if ((t | 0) > 0) {
         v = x;
         while (1) {
          c[v >> 2] = w;
          if ((t | 0) > 1) {
           v = v + 4 | 0;
           t = t + -1 | 0
          } else break
         }
        }
        c[e >> 2] = x + (u + 2 << 2);
        c[x + (u + 1 << 2) >> 2] = l
       }
       if ((s | 0) == (g | 0)) {
        x = Cb[c[(c[i >> 2] | 0) + 44 >> 2] & 15](i, 48) | 0;
        y = c[e >> 2] | 0;
        s = y + 4 | 0;
        c[e >> 2] = s;
        c[y >> 2] = x
       } else {
        x = a[n >> 0] | 0;
        t = (x & 1) == 0;
        y = c[G >> 2] | 0;
        if (!((t ? (x & 255) >>> 1 : y) | 0)) t = -1;
        else t = a[(t ? I : c[H >> 2] | 0) >> 0] | 0;
        if ((s | 0) != (g | 0)) {
         w = 0;
         x = 0;
         while (1) {
          u = c[e >> 2] | 0;
          if ((x | 0) == (t | 0)) {
           v = u + 4 | 0;
           c[e >> 2] = v;
           c[u >> 2] = m;
           w = w + 1 | 0;
           u = a[n >> 0] | 0;
           t = (u & 1) == 0;
           if (w >>> 0 < (t ? (u & 255) >>> 1 : y) >>> 0) {
            t = a[(t ? I : c[H >> 2] | 0) + w >> 0] | 0;
            u = v;
            t = t << 24 >> 24 == 127 ? -1 : t << 24 >> 24;
            v = 0
           } else {
            u = v;
            t = x;
            v = 0
           }
          } else v = x;
          s = s + -4 | 0;
          x = c[s >> 2] | 0;
          c[e >> 2] = u + 4;
          c[u >> 2] = x;
          if ((s | 0) == (g | 0)) break;
          else x = v + 1 | 0
         }
        }
        s = c[e >> 2] | 0
       }
       if ((r | 0) != (s | 0) ? (B = s + -4 | 0, r >>> 0 < B >>> 0) : 0) {
        s = B;
        do {
         y = c[r >> 2] | 0;
         c[r >> 2] = c[s >> 2];
         c[s >> 2] = y;
         r = r + 4 | 0;
         s = s + -4 | 0
        } while (r >>> 0 < s >>> 0)
       }
       break
      }
     default:
      {}
    }
    z = z + 1 | 0
   } while ((z | 0) != 4);
   r = a[p >> 0] | 0;
   g = (r & 1) == 0;
   r = g ? (r & 255) >>> 1 : c[J >> 2] | 0;
   if (r >>> 0 > 1) {
    s = g ? J : c[K >> 2] | 0;
    g = s + 4 | 0;
    s = s + (r << 2) | 0;
    t = c[e >> 2] | 0;
    u = s - g | 0;
    if ((r | 0) != 1) {
     r = t;
     while (1) {
      c[r >> 2] = c[g >> 2];
      g = g + 4 | 0;
      if ((g | 0) == (s | 0)) break;
      else r = r + 4 | 0
     }
    }
    c[e >> 2] = t + (u >>> 2 << 2)
   }
   switch (f & 176 | 0) {
    case 32:
     {
      c[d >> 2] = c[e >> 2];
      break
     }
    case 16:
     break;
    default:
     c[d >> 2] = b
   }
   return
  }

  function to(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0,
    F = 0;
   E = i;
   i = i + 480 | 0;
   p = E + 468 | 0;
   z = E + 464 | 0;
   x = E + 472 | 0;
   v = E + 56 | 0;
   u = E + 52 | 0;
   C = E + 40 | 0;
   B = E + 28 | 0;
   D = E + 16 | 0;
   k = E + 12 | 0;
   o = E + 64 | 0;
   t = E + 8 | 0;
   w = E + 4 | 0;
   q = E;
   b = Xj(f) | 0;
   c[z >> 2] = b;
   r = Qo(z, 9328) | 0;
   n = a[h >> 0] | 0;
   j = (n & 1) == 0;
   s = h + 4 | 0;
   if (!((j ? (n & 255) >>> 1 : c[s >> 2] | 0) | 0)) n = 0;
   else {
    n = c[(j ? s : c[h + 8 >> 2] | 0) >> 2] | 0;
    n = (n | 0) == (Cb[c[(c[r >> 2] | 0) + 44 >> 2] & 15](r, 45) | 0)
   }
   c[C >> 2] = 0;
   c[C + 4 >> 2] = 0;
   c[C + 8 >> 2] = 0;
   c[B >> 2] = 0;
   c[B + 4 >> 2] = 0;
   c[B + 8 >> 2] = 0;
   c[D >> 2] = 0;
   c[D + 4 >> 2] = 0;
   c[D + 8 >> 2] = 0;
   ro(e, n, z, x, v, u, C, B, D, k);
   l = a[h >> 0] | 0;
   m = c[s >> 2] | 0;
   j = (l & 1) == 0 ? (l & 255) >>> 1 : m;
   e = c[k >> 2] | 0;
   if ((j | 0) > (e | 0)) {
    F = a[D >> 0] | 0;
    k = a[B >> 0] | 0;
    j = (j - e << 1 | 1) + e + ((F & 1) == 0 ? (F & 255) >>> 1 : c[D + 4 >> 2] | 0) + ((k & 1) == 0 ? (k & 255) >>> 1 : c[B + 4 >> 2] | 0) | 0
   } else {
    F = a[D >> 0] | 0;
    j = a[B >> 0] | 0;
    j = e + 2 + ((F & 1) == 0 ? (F & 255) >>> 1 : c[D + 4 >> 2] | 0) + ((j & 1) == 0 ? (j & 255) >>> 1 : c[B + 4 >> 2] | 0) | 0
   }
   if (j >>> 0 > 100) {
    j = jj(j << 2) | 0;
    if (!j) Rh();
    else {
     A = j;
     y = j
    }
   } else {
    A = 0;
    y = o
   }
   F = (l & 1) == 0;
   j = F ? s : c[h + 8 >> 2] | 0;
   so(y, t, w, c[f + 4 >> 2] | 0, j, j + ((F ? (l & 255) >>> 1 : m) << 2) | 0, r, n, x, c[v >> 2] | 0, c[u >> 2] | 0, C, B, D, e);
   c[q >> 2] = c[d >> 2];
   F = c[t >> 2] | 0;
   j = c[w >> 2] | 0;
   c[p >> 2] = c[q >> 2];
   j = Zq(p, y, F, j, f, g) | 0;
   if (A) {
    kj(A);
    b = c[z >> 2] | 0
   }
   Jj(D);
   Jj(B);
   uj(C);
   gs(b) | 0;
   i = E;
   return j | 0
  }

  function uo(a) {
   a = a | 0;
   return
  }

  function vo(a) {
   a = a | 0;
   mh(a);
   return
  }

  function wo(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   b = fi((a[d >> 0] & 1) == 0 ? d + 1 | 0 : c[d + 8 >> 2] | 0, 1) | 0;
   return b >>> ((b | 0) != (-1 | 0) & 1) | 0
  }

  function xo(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0;
   k = i;
   i = i + 16 | 0;
   j = k;
   c[j >> 2] = 0;
   c[j + 4 >> 2] = 0;
   c[j + 8 >> 2] = 0;
   l = a[h >> 0] | 0;
   m = (l & 1) == 0;
   d = m ? h + 1 | 0 : c[h + 8 >> 2] | 0;
   l = m ? (l & 255) >>> 1 : c[h + 4 >> 2] | 0;
   h = d + l | 0;
   if ((l | 0) > 0)
    do {
     Cj(j, a[d >> 0] | 0);
     d = d + 1 | 0
    } while (d >>> 0 < h >>> 0);
   d = ei((e | 0) == -1 ? -1 : e << 1, f, g, (a[j >> 0] & 1) == 0 ? j + 1 | 0 : c[j + 8 >> 2] | 0) | 0;
   c[b >> 2] = 0;
   c[b + 4 >> 2] = 0;
   c[b + 8 >> 2] = 0;
   m = Xi(d) | 0;
   h = d + m | 0;
   if ((m | 0) > 0)
    do {
     Cj(b, a[d >> 0] | 0);
     d = d + 1 | 0
    } while (d >>> 0 < h >>> 0);
   uj(j);
   i = k;
   return
  }

  function yo(a, b) {
   a = a | 0;
   b = b | 0;
   return
  }

  function zo(a) {
   a = a | 0;
   return
  }

  function Ao(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Bo(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   b = fi((a[d >> 0] & 1) == 0 ? d + 1 | 0 : c[d + 8 >> 2] | 0, 1) | 0;
   return b >>> ((b | 0) != (-1 | 0) & 1) | 0
  }

  function Co(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0;
   s = i;
   i = i + 176 | 0;
   n = s + 168 | 0;
   o = s + 40 | 0;
   q = s + 32 | 0;
   p = s + 28 | 0;
   r = s + 16 | 0;
   l = s + 8 | 0;
   m = s;
   c[r >> 2] = 0;
   c[r + 4 >> 2] = 0;
   c[r + 8 >> 2] = 0;
   c[l + 4 >> 2] = 0;
   c[l >> 2] = 9812;
   k = a[h >> 0] | 0;
   t = (k & 1) == 0;
   j = h + 4 | 0;
   d = t ? j : c[h + 8 >> 2] | 0;
   h = t ? (k & 255) >>> 1 : c[j >> 2] | 0;
   j = d + (h << 2) | 0;
   k = o + 32 | 0;
   if ((h | 0) > 0)
    do {
     c[p >> 2] = d;
     h = zb[c[(c[l >> 2] | 0) + 12 >> 2] & 15](l, n, d, j, p, o, k, q) | 0;
     if (o >>> 0 < (c[q >> 2] | 0) >>> 0) {
      d = o;
      do {
       Cj(r, a[d >> 0] | 0);
       d = d + 1 | 0
      } while (d >>> 0 < (c[q >> 2] | 0) >>> 0)
     }
     d = c[p >> 2] | 0
    } while ((h | 0) != 2 & d >>> 0 < j >>> 0);
   d = ei((e | 0) == -1 ? -1 : e << 1, f, g, (a[r >> 0] & 1) == 0 ? r + 1 | 0 : c[r + 8 >> 2] | 0) | 0;
   c[b >> 2] = 0;
   c[b + 4 >> 2] = 0;
   c[b + 8 >> 2] = 0;
   c[m + 4 >> 2] = 0;
   c[m >> 2] = 9860;
   t = Xi(d) | 0;
   j = d + t | 0;
   k = j;
   l = o + 128 | 0;
   if ((t | 0) > 0)
    do {
     c[p >> 2] = d;
     h = zb[c[(c[m >> 2] | 0) + 16 >> 2] & 15](m, n, d, (k - d | 0) > 32 ? d + 32 | 0 : j, p, o, l, q) | 0;
     if (o >>> 0 < (c[q >> 2] | 0) >>> 0) {
      d = o;
      do {
       Nj(b, c[d >> 2] | 0);
       d = d + 4 | 0
      } while (d >>> 0 < (c[q >> 2] | 0) >>> 0)
     }
     d = c[p >> 2] | 0
    } while ((h | 0) != 2 & d >>> 0 < j >>> 0);
   uj(r);
   i = s;
   return
  }

  function Do(a, b) {
   a = a | 0;
   b = b | 0;
   return
  }

  function Eo(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0;
   c[a + 4 >> 2] = b + -1;
   c[a >> 2] = 9312;
   d = a + 8 | 0;
   fr(d, 28);
   sj(a + 144 | 0, 23481, 1);
   d = c[d >> 2] | 0;
   e = a + 12 | 0;
   b = c[e >> 2] | 0;
   if ((b | 0) != (d | 0)) {
    do b = b + -4 | 0; while ((b | 0) != (d | 0));
    c[e >> 2] = b
   }
   c[439] = 0;
   c[438] = 8240;
   gr(a, 1752);
   c[441] = 0;
   c[440] = 8280;
   hr(a, 1760);
   fp(1768, 0, 0, 1);
   ir(a, 1768);
   c[447] = 0;
   c[446] = 9600;
   jr(a, 1784);
   c[449] = 0;
   c[448] = 9668;
   kr(a, 1792);
   c[451] = 0;
   c[450] = 9420;
   c[452] = dl() | 0;
   lr(a, 1800);
   c[455] = 0;
   c[454] = 9716;
   mr(a, 1816);
   c[457] = 0;
   c[456] = 9764;
   nr(a, 1824);
   Yp(1832, 1);
   or(a, 1832);
   Zp(1856, 1);
   pr(a, 1856);
   c[473] = 0;
   c[472] = 8320;
   qr(a, 1888);
   c[475] = 0;
   c[474] = 8392;
   rr(a, 1896);
   c[477] = 0;
   c[476] = 8464;
   sr(a, 1904);
   c[479] = 0;
   c[478] = 8524;
   tr(a, 1912);
   c[481] = 0;
   c[480] = 8832;
   ur(a, 1920);
   c[483] = 0;
   c[482] = 8896;
   vr(a, 1928);
   c[485] = 0;
   c[484] = 8960;
   wr(a, 1936);
   c[487] = 0;
   c[486] = 9024;
   xr(a, 1944);
   c[489] = 0;
   c[488] = 9088;
   yr(a, 1952);
   c[491] = 0;
   c[490] = 9124;
   zr(a, 1960);
   c[493] = 0;
   c[492] = 9160;
   Ar(a, 1968);
   c[495] = 0;
   c[494] = 9196;
   Br(a, 1976);
   c[497] = 0;
   c[496] = 8584;
   c[498] = 8632;
   Cr(a, 1984);
   c[501] = 0;
   c[500] = 8676;
   c[502] = 8724;
   Dr(a, 2e3);
   c[505] = 0;
   c[504] = 9580;
   c[506] = dl() | 0;
   c[504] = 8768;
   Er(a, 2016);
   c[509] = 0;
   c[508] = 9580;
   c[510] = dl() | 0;
   c[508] = 8800;
   Fr(a, 2032);
   c[513] = 0;
   c[512] = 9232;
   Gr(a, 2048);
   c[515] = 0;
   c[514] = 9272;
   Hr(a, 2056);
   return
  }

  function Fo() {
   if ((a[2064] | 0) == 0 ? (ya(2064) | 0) != 0 : 0) {
    Jo() | 0;
    c[2525] = 10096;
    Ga(2064)
   }
   return c[2525] | 0
  }

  function Go(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0;
   fs(b);
   f = a + 8 | 0;
   e = c[f >> 2] | 0;
   if ((c[a + 12 >> 2] | 0) - e >> 2 >>> 0 <= d >>> 0) {
    Ir(f, d + 1 | 0);
    e = c[f >> 2] | 0
   }
   a = c[e + (d << 2) >> 2] | 0;
   if (a) {
    gs(a) | 0;
    e = c[f >> 2] | 0
   }
   c[e + (d << 2) >> 2] = b;
   return
  }

  function Ho(a) {
   a = a | 0;
   var b = 0,
    d = 0,
    e = 0,
    f = 0;
   c[a >> 2] = 9312;
   e = a + 8 | 0;
   f = a + 12 | 0;
   b = c[e >> 2] | 0;
   if ((c[f >> 2] | 0) != (b | 0)) {
    d = 0;
    do {
     b = c[b + (d << 2) >> 2] | 0;
     if (b) gs(b) | 0;
     d = d + 1 | 0;
     b = c[e >> 2] | 0
    } while (d >>> 0 < (c[f >> 2] | 0) - b >> 2 >>> 0)
   }
   uj(a + 144 | 0);
   Jr(e);
   return
  }

  function Io(a) {
   a = a | 0;
   Ho(a);
   mh(a);
   return
  }

  function Jo() {
   Eo(2072, 1);
   c[2524] = 2072;
   return 10096
  }

  function Ko() {
   var a = 0;
   a = c[(Fo() | 0) >> 2] | 0;
   c[2526] = a;
   fs(a);
   return 10104
  }

  function Lo() {
   if ((a[2232] | 0) == 0 ? (ya(2232) | 0) != 0 : 0) {
    Ko() | 0;
    c[2527] = 10104;
    Ga(2232)
   }
   return c[2527] | 0
  }

  function Mo(a) {
   a = a | 0;
   var b = 0;
   b = c[(Lo() | 0) >> 2] | 0;
   c[a >> 2] = b;
   fs(b);
   return
  }

  function No(a, b) {
   a = a | 0;
   b = b | 0;
   b = c[b >> 2] | 0;
   c[a >> 2] = b;
   fs(b);
   return
  }

  function Oo(a) {
   a = a | 0;
   gs(c[a >> 2] | 0) | 0;
   return
  }

  function Po(a) {
   a = a | 0;
   var b = 0,
    d = 0;
   d = i;
   i = i + 16 | 0;
   b = d;
   if ((c[a >> 2] | 0) != -1) {
    c[b >> 2] = a;
    c[b + 4 >> 2] = 145;
    c[b + 8 >> 2] = 0;
    hs(a, b, 146)
   }
   i = d;
   return (c[a + 4 >> 2] | 0) + -1 | 0
  }

  function Qo(a, b) {
   a = a | 0;
   b = b | 0;
   a = c[a >> 2] | 0;
   b = Po(b) | 0;
   return c[(c[a + 8 >> 2] | 0) + (b << 2) >> 2] | 0
  }

  function Ro(a) {
   a = a | 0;
   mh(a);
   return
  }

  function So(a) {
   a = a | 0;
   if (a) sb[c[(c[a >> 2] | 0) + 4 >> 2] & 255](a);
   return
  }

  function To(a) {
   a = a | 0;
   var b = 0;
   b = c[2331] | 0;
   c[2331] = b + 1;
   c[a + 4 >> 2] = b + 1;
   return
  }

  function Uo(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Vo(a, d, e) {
   a = a | 0;
   d = d | 0;
   e = e | 0;
   if (e >>> 0 < 128) e = (b[(c[(Uh() | 0) >> 2] | 0) + (e << 1) >> 1] & d) << 16 >> 16 != 0;
   else e = 0;
   return e | 0
  }

  function Wo(a, d, f, g) {
   a = a | 0;
   d = d | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    i = 0;
   i = (f - d | 0) >>> 2;
   if ((d | 0) != (f | 0)) {
    h = d;
    while (1) {
     a = c[h >> 2] | 0;
     if (a >>> 0 < 128) a = e[(c[(Uh() | 0) >> 2] | 0) + (a << 1) >> 1] | 0;
     else a = 0;
     b[g >> 1] = a;
     h = h + 4 | 0;
     if ((h | 0) == (f | 0)) break;
     else g = g + 2 | 0
    }
   }
   return d + (i << 2) | 0
  }

  function Xo(a, d, e, f) {
   a = a | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   a: do
    if ((e | 0) == (f | 0)) e = f;
    else
     while (1) {
      a = c[e >> 2] | 0;
      if (a >>> 0 < 128 ? (b[(c[(Uh() | 0) >> 2] | 0) + (a << 1) >> 1] & d) << 16 >> 16 != 0 : 0) break a;
      e = e + 4 | 0;
      if ((e | 0) == (f | 0)) {
       e = f;
       break
      }
     }
    while (0);
   return e | 0
  }

  function Yo(a, d, e, f) {
   a = a | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   a: do
    if ((e | 0) == (f | 0)) e = f;
    else
     while (1) {
      a = c[e >> 2] | 0;
      if (a >>> 0 >= 128) break a;
      if (!((b[(c[(Uh() | 0) >> 2] | 0) + (a << 1) >> 1] & d) << 16 >> 16)) break a;
      e = e + 4 | 0;
      if ((e | 0) == (f | 0)) {
       e = f;
       break
      }
     }
    while (0);
   return e | 0
  }

  function Zo(a, b) {
   a = a | 0;
   b = b | 0;
   if (b >>> 0 < 128) b = c[(c[(Wh() | 0) >> 2] | 0) + (b << 2) >> 2] | 0;
   return b | 0
  }

  function _o(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0;
   f = (d - b | 0) >>> 2;
   if ((b | 0) != (d | 0)) {
    e = b;
    do {
     a = c[e >> 2] | 0;
     if (a >>> 0 < 128) a = c[(c[(Wh() | 0) >> 2] | 0) + (a << 2) >> 2] | 0;
     c[e >> 2] = a;
     e = e + 4 | 0
    } while ((e | 0) != (d | 0))
   }
   return b + (f << 2) | 0
  }

  function $o(a, b) {
   a = a | 0;
   b = b | 0;
   if (b >>> 0 < 128) b = c[(c[(Vh() | 0) >> 2] | 0) + (b << 2) >> 2] | 0;
   return b | 0
  }

  function ap(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0;
   f = (d - b | 0) >>> 2;
   if ((b | 0) != (d | 0)) {
    e = b;
    do {
     a = c[e >> 2] | 0;
     if (a >>> 0 < 128) a = c[(c[(Vh() | 0) >> 2] | 0) + (a << 2) >> 2] | 0;
     c[e >> 2] = a;
     e = e + 4 | 0
    } while ((e | 0) != (d | 0))
   }
   return b + (f << 2) | 0
  }

  function bp(a, b) {
   a = a | 0;
   b = b | 0;
   return b << 24 >> 24 | 0
  }

  function cp(b, d, e, f) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   if ((d | 0) != (e | 0))
    while (1) {
     c[f >> 2] = a[d >> 0];
     d = d + 1 | 0;
     if ((d | 0) == (e | 0)) break;
     else f = f + 4 | 0
    }
   return e | 0
  }

  function dp(a, b, c) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   return (b >>> 0 < 128 ? b & 255 : c) | 0
  }

  function ep(b, d, e, f, g) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    i = 0;
   i = (e - d | 0) >>> 2;
   if ((d | 0) != (e | 0)) {
    h = d;
    b = g;
    while (1) {
     g = c[h >> 2] | 0;
     a[b >> 0] = g >>> 0 < 128 ? g & 255 : f;
     h = h + 4 | 0;
     if ((h | 0) == (e | 0)) break;
     else b = b + 1 | 0
    }
   }
   return d + (i << 2) | 0
  }

  function fp(b, d, e, f) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   c[b + 4 >> 2] = f + -1;
   c[b >> 2] = 9352;
   f = b + 8 | 0;
   c[f >> 2] = d;
   a[b + 12 >> 0] = e & 1;
   if (!d) c[f >> 2] = c[(Uh() | 0) >> 2];
   return
  }

  function gp(b) {
   b = b | 0;
   var d = 0;
   c[b >> 2] = 9352;
   d = c[b + 8 >> 2] | 0;
   if ((d | 0) != 0 ? (a[b + 12 >> 0] | 0) != 0 : 0) nh(d);
   return
  }

  function hp(a) {
   a = a | 0;
   gp(a);
   mh(a);
   return
  }

  function ip(a, b) {
   a = a | 0;
   b = b | 0;
   if (b << 24 >> 24 > -1) b = c[(c[(Wh() | 0) >> 2] | 0) + ((b & 255) << 2) >> 2] & 255;
   return b | 0
  }

  function jp(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   if ((d | 0) != (e | 0)) {
    b = d;
    do {
     d = a[b >> 0] | 0;
     if (d << 24 >> 24 > -1) d = c[(c[(Wh() | 0) >> 2] | 0) + (d << 24 >> 24 << 2) >> 2] & 255;
     a[b >> 0] = d;
     b = b + 1 | 0
    } while ((b | 0) != (e | 0))
   }
   return e | 0
  }

  function kp(a, b) {
   a = a | 0;
   b = b | 0;
   if (b << 24 >> 24 > -1) b = c[(c[(Vh() | 0) >> 2] | 0) + (b << 24 >> 24 << 2) >> 2] & 255;
   return b | 0
  }

  function lp(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   if ((d | 0) != (e | 0)) {
    b = d;
    do {
     d = a[b >> 0] | 0;
     if (d << 24 >> 24 > -1) d = c[(c[(Vh() | 0) >> 2] | 0) + (d << 24 >> 24 << 2) >> 2] & 255;
     a[b >> 0] = d;
     b = b + 1 | 0
    } while ((b | 0) != (e | 0))
   }
   return e | 0
  }

  function mp(a, b) {
   a = a | 0;
   b = b | 0;
   return b | 0
  }

  function np(b, c, d, e) {
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   if ((c | 0) != (d | 0))
    while (1) {
     a[e >> 0] = a[c >> 0] | 0;
     c = c + 1 | 0;
     if ((c | 0) == (d | 0)) break;
     else e = e + 1 | 0
    }
   return d | 0
  }

  function op(a, b, c) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   return (b << 24 >> 24 > -1 ? b : c) | 0
  }

  function pp(b, c, d, e, f) {
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   if ((c | 0) != (d | 0))
    while (1) {
     b = a[c >> 0] | 0;
     a[f >> 0] = b << 24 >> 24 > -1 ? b : e;
     c = c + 1 | 0;
     if ((c | 0) == (d | 0)) break;
     else f = f + 1 | 0
    }
   return d | 0
  }

  function qp(a) {
   a = a | 0;
   mh(a);
   return
  }

  function rp(a, b, d, e, f, g, h, i) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   i = i | 0;
   c[f >> 2] = d;
   c[i >> 2] = g;
   return 3
  }

  function sp(a, b, d, e, f, g, h, i) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   i = i | 0;
   c[f >> 2] = d;
   c[i >> 2] = g;
   return 3
  }

  function tp(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   c[f >> 2] = d;
   return 3
  }

  function up(a) {
   a = a | 0;
   return 1
  }

  function vp(a) {
   a = a | 0;
   return 1
  }

  function wp(a, b, c, d, e) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   a = d - c | 0;
   return (a >>> 0 < e >>> 0 ? a : e) | 0
  }

  function xp(a) {
   a = a | 0;
   return 1
  }

  function yp(a) {
   a = a | 0;
   Bq(a);
   mh(a);
   return
  }

  function zp(b, d, e, f, g, h, j, k) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   k = k | 0;
   var l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0;
   s = i;
   i = i + 16 | 0;
   q = s;
   o = s + 8 | 0;
   a: do
    if ((e | 0) == (f | 0)) l = f;
    else {
     l = e;
     while (1) {
      if (!(c[l >> 2] | 0)) break a;
      l = l + 4 | 0;
      if ((l | 0) == (f | 0)) {
       l = f;
       break
      }
     }
    }
   while (0);
   c[k >> 2] = h;
   c[g >> 2] = e;
   n = j;
   p = b + 8 | 0;
   b: do
    if ((h | 0) == (j | 0) | (e | 0) == (f | 0)) r = 29;
    else {
     c: while (1) {
      t = d;
      m = c[t + 4 >> 2] | 0;
      b = q;
      c[b >> 2] = c[t >> 2];
      c[b + 4 >> 2] = m;
      b = ki(c[p >> 2] | 0) | 0;
      m = Ai(h, g, l - e >> 2, n - h | 0, d) | 0;
      if (b) ki(b) | 0;
      switch (m | 0) {
       case 0:
        {
         e = 1;
         break b
        }
       case -1:
        break c;
       default:
        {}
      }
      h = (c[k >> 2] | 0) + m | 0;
      c[k >> 2] = h;
      if ((h | 0) == (j | 0)) {
       r = 15;
       break
      }
      if ((l | 0) == (f | 0)) {
       e = c[g >> 2] | 0;
       l = f
      } else {
       e = ki(c[p >> 2] | 0) | 0;
       h = zi(o, 0, d) | 0;
       if (e) ki(e) | 0;
       if ((h | 0) == -1) {
        e = 2;
        break b
       }
       if (h >>> 0 > (n - (c[k >> 2] | 0) | 0) >>> 0) {
        e = 1;
        break b
       }
       if (h) {
        e = o;
        while (1) {
         m = a[e >> 0] | 0;
         t = c[k >> 2] | 0;
         c[k >> 2] = t + 1;
         a[t >> 0] = m;
         h = h + -1 | 0;
         if (!h) break;
         else e = e + 1 | 0
        }
       }
       e = (c[g >> 2] | 0) + 4 | 0;
       c[g >> 2] = e;
       d: do
        if ((e | 0) == (f | 0)) l = f;
        else {
         l = e;
         while (1) {
          if (!(c[l >> 2] | 0)) break d;
          l = l + 4 | 0;
          if ((l | 0) == (f | 0)) {
           l = f;
           break
          }
         }
        }
       while (0);
       h = c[k >> 2] | 0
      }
      if ((h | 0) == (j | 0) | (e | 0) == (f | 0)) {
       r = 29;
       break b
      }
     }
     if ((r | 0) == 15) {
      e = c[g >> 2] | 0;
      r = 29;
      break
     }
     c[k >> 2] = h;e: do
      if ((e | 0) != (c[g >> 2] | 0))
       do {
        t = c[e >> 2] | 0;
        l = ki(c[p >> 2] | 0) | 0;
        h = zi(h, t, q) | 0;
        if (l) ki(l) | 0;
        if ((h | 0) == -1) break e;
        h = (c[k >> 2] | 0) + h | 0;
        c[k >> 2] = h;
        e = e + 4 | 0
       } while ((e | 0) != (c[g >> 2] | 0));while (0);c[g >> 2] = e;e = 2
    }
   while (0);
   if ((r | 0) == 29) e = (e | 0) != (f | 0) & 1;
   i = s;
   return e | 0
  }

  function Ap(b, d, e, f, g, h, j, k) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   k = k | 0;
   var l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0;
   s = i;
   i = i + 16 | 0;
   q = s;
   a: do
    if ((e | 0) == (f | 0)) l = f;
    else {
     l = e;
     while (1) {
      if (!(a[l >> 0] | 0)) break a;
      l = l + 1 | 0;
      if ((l | 0) == (f | 0)) {
       l = f;
       break
      }
     }
    }
   while (0);
   c[k >> 2] = h;
   c[g >> 2] = e;
   o = j;
   p = b + 8 | 0;
   b: do
    if ((h | 0) == (j | 0) | (e | 0) == (f | 0)) r = 29;
    else {
     c: while (1) {
      n = d;
      m = c[n + 4 >> 2] | 0;
      b = q;
      c[b >> 2] = c[n >> 2];
      c[b + 4 >> 2] = m;
      b = l;
      m = ki(c[p >> 2] | 0) | 0;
      n = wi(h, g, b - e | 0, o - h >> 2, d) | 0;
      if (m) ki(m) | 0;
      switch (n | 0) {
       case 0:
        {
         e = 2;
         break b
        }
       case -1:
        break c;
       default:
        {}
      }
      h = (c[k >> 2] | 0) + (n << 2) | 0;
      c[k >> 2] = h;
      if ((h | 0) == (j | 0)) {
       r = 19;
       break
      }
      e = c[g >> 2] | 0;
      if ((l | 0) == (f | 0)) l = f;
      else {
       l = ki(c[p >> 2] | 0) | 0;
       e = ui(h, e, 1, d) | 0;
       if (l) ki(l) | 0;
       if (e) {
        e = 2;
        break b
       }
       c[k >> 2] = (c[k >> 2] | 0) + 4;
       e = (c[g >> 2] | 0) + 1 | 0;
       c[g >> 2] = e;
       d: do
        if ((e | 0) == (f | 0)) l = f;
        else {
         l = e;
         while (1) {
          if (!(a[l >> 0] | 0)) break d;
          l = l + 1 | 0;
          if ((l | 0) == (f | 0)) {
           l = f;
           break
          }
         }
        }
       while (0);
       h = c[k >> 2] | 0
      }
      if ((h | 0) == (j | 0) | (e | 0) == (f | 0)) {
       r = 29;
       break b
      }
     }
     if ((r | 0) == 19) {
      e = c[g >> 2] | 0;
      r = 29;
      break
     }
     c[k >> 2] = h;e: do
      if ((e | 0) != (c[g >> 2] | 0)) {
       f: while (1) {
        l = ki(c[p >> 2] | 0) | 0;
        h = ui(h, e, b - e | 0, q) | 0;
        if (l) ki(l) | 0;
        switch (h | 0) {
         case -1:
          {
           r = 13;
           break f
          }
         case -2:
          {
           r = 14;
           break f
          }
         case 0:
          {
           e = e + 1 | 0;
           break
          }
         default:
          e = e + h | 0
        }
        h = (c[k >> 2] | 0) + 4 | 0;
        c[k >> 2] = h;
        if ((e | 0) == (c[g >> 2] | 0)) break e
       }
       if ((r | 0) == 13) {
        c[g >> 2] = e;
        e = 2;
        break b
       } else if ((r | 0) == 14) {
        c[g >> 2] = e;
        e = 1;
        break b
       }
      }while (0);c[g >> 2] = e;e = (e | 0) != (f | 0) & 1
    }
   while (0);
   if ((r | 0) == 29) e = (e | 0) != (f | 0) & 1;
   i = s;
   return e | 0
  }

  function Bp(b, d, e, f, g) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0;
   j = i;
   i = i + 16 | 0;
   h = j;
   c[g >> 2] = e;
   e = ki(c[b + 8 >> 2] | 0) | 0;
   b = zi(h, 0, d) | 0;
   if (e) ki(e) | 0;
   switch (b | 0) {
    case 0:
    case -1:
     {
      h = 2;
      break
     }
    default:
     {
      b = b + -1 | 0;
      if (b >>> 0 <= (f - (c[g >> 2] | 0) | 0) >>> 0)
       if (!b) h = 0;
       else
        while (1) {
         d = a[h >> 0] | 0;
         f = c[g >> 2] | 0;
         c[g >> 2] = f + 1;
         a[f >> 0] = d;
         b = b + -1 | 0;
         if (!b) {
          h = 0;
          break
         } else h = h + 1 | 0
        } else h = 1
     }
   }
   i = j;
   return h | 0
  }

  function Cp(a) {
   a = a | 0;
   var b = 0,
    d = 0;
   a = a + 8 | 0;
   b = ki(c[a >> 2] | 0) | 0;
   d = yi(0, 0, 4) | 0;
   if (b) ki(b) | 0;
   if (!d) {
    a = c[a >> 2] | 0;
    if (a) {
     a = ki(a) | 0;
     if (!a) a = 0;
     else {
      ki(a) | 0;
      a = 0
     }
    } else a = 1
   } else a = -1;
   return a | 0
  }

  function Dp(a) {
   a = a | 0;
   return 0
  }

  function Ep(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0;
   k = e;
   j = a + 8 | 0;
   a: do
    if ((d | 0) == (e | 0) | (f | 0) == 0) a = 0;
    else {
     a = 0;
     i = 0;
     while (1) {
      h = ki(c[j >> 2] | 0) | 0;
      g = ti(d, k - d | 0, b) | 0;
      if (h) ki(h) | 0;
      switch (g | 0) {
       case -2:
       case -1:
        break a;
       case 0:
        {
         d = d + 1 | 0;g = 1;
         break
        }
       default:
        d = d + g | 0
      }
      a = g + a | 0;
      i = i + 1 | 0;
      if ((d | 0) == (e | 0) | i >>> 0 >= f >>> 0) break a
     }
    }
   while (0);
   return a | 0
  }

  function Fp(a) {
   a = a | 0;
   a = c[a + 8 >> 2] | 0;
   if (a) {
    a = ki(a) | 0;
    if (!a) a = 4;
    else {
     ki(a) | 0;
     a = 4
    }
   } else a = 1;
   return a | 0
  }

  function Gp(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Hp(a, b, d, e, f, g, h, j) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0;
   a = i;
   i = i + 16 | 0;
   k = a + 4 | 0;
   b = a;
   c[k >> 2] = d;
   c[b >> 2] = g;
   h = Lr(d, e, k, g, h, b, 1114111, 0) | 0;
   c[f >> 2] = c[k >> 2];
   c[j >> 2] = c[b >> 2];
   i = a;
   return h | 0
  }

  function Ip(a, b, d, e, f, g, h, j) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0;
   a = i;
   i = i + 16 | 0;
   k = a + 4 | 0;
   b = a;
   c[k >> 2] = d;
   c[b >> 2] = g;
   h = Mr(d, e, k, g, h, b, 1114111, 0) | 0;
   c[f >> 2] = c[k >> 2];
   c[j >> 2] = c[b >> 2];
   i = a;
   return h | 0
  }

  function Jp(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   c[f >> 2] = d;
   return 3
  }

  function Kp(a) {
   a = a | 0;
   return 0
  }

  function Lp(a) {
   a = a | 0;
   return 0
  }

  function Mp(a, b, c, d, e) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   return Nr(c, d, e, 1114111, 0) | 0
  }

  function Np(a) {
   a = a | 0;
   return 4
  }

  function Op(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Pp(a, b, d, e, f, g, h, j) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0;
   a = i;
   i = i + 16 | 0;
   k = a + 4 | 0;
   b = a;
   c[k >> 2] = d;
   c[b >> 2] = g;
   h = Or(d, e, k, g, h, b, 1114111, 0) | 0;
   c[f >> 2] = c[k >> 2];
   c[j >> 2] = c[b >> 2];
   i = a;
   return h | 0
  }

  function Qp(a, b, d, e, f, g, h, j) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0;
   a = i;
   i = i + 16 | 0;
   k = a + 4 | 0;
   b = a;
   c[k >> 2] = d;
   c[b >> 2] = g;
   h = Pr(d, e, k, g, h, b, 1114111, 0) | 0;
   c[f >> 2] = c[k >> 2];
   c[j >> 2] = c[b >> 2];
   i = a;
   return h | 0
  }

  function Rp(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   c[f >> 2] = d;
   return 3
  }

  function Sp(a) {
   a = a | 0;
   return 0
  }

  function Tp(a) {
   a = a | 0;
   return 0
  }

  function Up(a, b, c, d, e) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   return Qr(c, d, e, 1114111, 0) | 0
  }

  function Vp(a) {
   a = a | 0;
   return 4
  }

  function Wp(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Xp(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Yp(b, d) {
   b = b | 0;
   d = d | 0;
   c[b + 4 >> 2] = d + -1;
   c[b >> 2] = 9500;
   a[b + 8 >> 0] = 46;
   a[b + 9 >> 0] = 44;
   b = b + 12 | 0;
   c[b >> 2] = 0;
   c[b + 4 >> 2] = 0;
   c[b + 8 >> 2] = 0;
   return
  }

  function Zp(a, b) {
   a = a | 0;
   b = b | 0;
   c[a + 4 >> 2] = b + -1;
   c[a >> 2] = 9540;
   c[a + 8 >> 2] = 46;
   c[a + 12 >> 2] = 44;
   a = a + 16 | 0;
   c[a >> 2] = 0;
   c[a + 4 >> 2] = 0;
   c[a + 8 >> 2] = 0;
   return
  }

  function _p(a) {
   a = a | 0;
   c[a >> 2] = 9500;
   uj(a + 12 | 0);
   return
  }

  function $p(a) {
   a = a | 0;
   _p(a);
   mh(a);
   return
  }

  function aq(a) {
   a = a | 0;
   c[a >> 2] = 9540;
   uj(a + 16 | 0);
   return
  }

  function bq(a) {
   a = a | 0;
   aq(a);
   mh(a);
   return
  }

  function cq(b) {
   b = b | 0;
   return a[b + 8 >> 0] | 0
  }

  function dq(a) {
   a = a | 0;
   return c[a + 8 >> 2] | 0
  }

  function eq(b) {
   b = b | 0;
   return a[b + 9 >> 0] | 0
  }

  function fq(a) {
   a = a | 0;
   return c[a + 12 >> 2] | 0
  }

  function gq(a, b) {
   a = a | 0;
   b = b | 0;
   rj(a, b + 12 | 0);
   return
  }

  function hq(a, b) {
   a = a | 0;
   b = b | 0;
   rj(a, b + 16 | 0);
   return
  }

  function iq(a, b) {
   a = a | 0;
   b = b | 0;
   sj(a, 23583, 4);
   return
  }

  function jq(a, b) {
   a = a | 0;
   b = b | 0;
   Hj(a, 10112, Yi(10112) | 0);
   return
  }

  function kq(a, b) {
   a = a | 0;
   b = b | 0;
   sj(a, 23588, 5);
   return
  }

  function lq(a, b) {
   a = a | 0;
   b = b | 0;
   Hj(a, 10132, Yi(10132) | 0);
   return
  }

  function mq(a) {
   a = a | 0;
   switch (c[a + 4 >> 2] & 74 | 0) {
    case 64:
     {
      a = 8;
      break
     }
    case 8:
     {
      a = 16;
      break
     }
    case 0:
     {
      a = 0;
      break
     }
    default:
     a = 10
   }
   return a | 0
  }

  function nq(b) {
   b = b | 0;
   if ((a[2240] | 0) == 0 ? (ya(2240) | 0) != 0 : 0) {
    if ((a[2248] | 0) == 0 ? (ya(2248) | 0) != 0 : 0) {
     b = 10156;
     do {
      c[b >> 2] = 0;
      c[b + 4 >> 2] = 0;
      c[b + 8 >> 2] = 0;
      b = b + 12 | 0
     } while ((b | 0) != 10324);
     Ga(2248)
    }
    wj(10156, 23594) | 0;
    wj(10168, 23601) | 0;
    wj(10180, 23608) | 0;
    wj(10192, 23616) | 0;
    wj(10204, 23626) | 0;
    wj(10216, 23635) | 0;
    wj(10228, 23642) | 0;
    wj(10240, 23651) | 0;
    wj(10252, 23655) | 0;
    wj(10264, 23659) | 0;
    wj(10276, 23663) | 0;
    wj(10288, 23667) | 0;
    wj(10300, 23671) | 0;
    wj(10312, 23675) | 0;
    c[2581] = 10156;
    Ga(2240)
   }
   return c[2581] | 0
  }

  function oq(b) {
   b = b | 0;
   if ((a[2256] | 0) == 0 ? (ya(2256) | 0) != 0 : 0) {
    if ((a[2264] | 0) == 0 ? (ya(2264) | 0) != 0 : 0) {
     b = 10328;
     do {
      c[b >> 2] = 0;
      c[b + 4 >> 2] = 0;
      c[b + 8 >> 2] = 0;
      b = b + 12 | 0
     } while ((b | 0) != 10496);
     Ga(2264)
    }
    Kj(10328, 10496) | 0;
    Kj(10340, 10524) | 0;
    Kj(10352, 10552) | 0;
    Kj(10364, 10584) | 0;
    Kj(10376, 10624) | 0;
    Kj(10388, 10660) | 0;
    Kj(10400, 10688) | 0;
    Kj(10412, 10724) | 0;
    Kj(10424, 10740) | 0;
    Kj(10436, 10756) | 0;
    Kj(10448, 10772) | 0;
    Kj(10460, 10788) | 0;
    Kj(10472, 10804) | 0;
    Kj(10484, 10820) | 0;
    c[2709] = 10328;
    Ga(2256)
   }
   return c[2709] | 0
  }

  function pq(b) {
   b = b | 0;
   if ((a[2272] | 0) == 0 ? (ya(2272) | 0) != 0 : 0) {
    if ((a[2280] | 0) == 0 ? (ya(2280) | 0) != 0 : 0) {
     b = 10840;
     do {
      c[b >> 2] = 0;
      c[b + 4 >> 2] = 0;
      c[b + 8 >> 2] = 0;
      b = b + 12 | 0
     } while ((b | 0) != 11128);
     Ga(2280)
    }
    wj(10840, 23679) | 0;
    wj(10852, 23687) | 0;
    wj(10864, 23696) | 0;
    wj(10876, 23702) | 0;
    wj(10888, 23708) | 0;
    wj(10900, 23712) | 0;
    wj(10912, 23717) | 0;
    wj(10924, 23722) | 0;
    wj(10936, 23729) | 0;
    wj(10948, 23739) | 0;
    wj(10960, 23747) | 0;
    wj(10972, 23756) | 0;
    wj(10984, 23765) | 0;
    wj(10996, 23769) | 0;
    wj(11008, 23773) | 0;
    wj(11020, 23777) | 0;
    wj(11032, 23708) | 0;
    wj(11044, 23781) | 0;
    wj(11056, 23785) | 0;
    wj(11068, 23789) | 0;
    wj(11080, 23793) | 0;
    wj(11092, 23797) | 0;
    wj(11104, 23801) | 0;
    wj(11116, 23805) | 0;
    c[2782] = 10840;
    Ga(2272)
   }
   return c[2782] | 0
  }

  function qq(b) {
   b = b | 0;
   if ((a[2288] | 0) == 0 ? (ya(2288) | 0) != 0 : 0) {
    if ((a[2296] | 0) == 0 ? (ya(2296) | 0) != 0 : 0) {
     b = 11132;
     do {
      c[b >> 2] = 0;
      c[b + 4 >> 2] = 0;
      c[b + 8 >> 2] = 0;
      b = b + 12 | 0
     } while ((b | 0) != 11420);
     Ga(2296)
    }
    Kj(11132, 11420) | 0;
    Kj(11144, 11452) | 0;
    Kj(11156, 11488) | 0;
    Kj(11168, 11512) | 0;
    Kj(11180, 11536) | 0;
    Kj(11192, 11552) | 0;
    Kj(11204, 11572) | 0;
    Kj(11216, 11592) | 0;
    Kj(11228, 11620) | 0;
    Kj(11240, 11660) | 0;
    Kj(11252, 11692) | 0;
    Kj(11264, 11728) | 0;
    Kj(11276, 11764) | 0;
    Kj(11288, 11780) | 0;
    Kj(11300, 11796) | 0;
    Kj(11312, 11812) | 0;
    Kj(11324, 11536) | 0;
    Kj(11336, 11828) | 0;
    Kj(11348, 11844) | 0;
    Kj(11360, 11860) | 0;
    Kj(11372, 11876) | 0;
    Kj(11384, 11892) | 0;
    Kj(11396, 11908) | 0;
    Kj(11408, 11924) | 0;
    c[2985] = 11132;
    Ga(2288)
   }
   return c[2985] | 0
  }

  function rq(b) {
   b = b | 0;
   if ((a[2304] | 0) == 0 ? (ya(2304) | 0) != 0 : 0) {
    if ((a[2312] | 0) == 0 ? (ya(2312) | 0) != 0 : 0) {
     b = 11944;
     do {
      c[b >> 2] = 0;
      c[b + 4 >> 2] = 0;
      c[b + 8 >> 2] = 0;
      b = b + 12 | 0
     } while ((b | 0) != 12232);
     Ga(2312)
    }
    wj(11944, 23809) | 0;
    wj(11956, 23812) | 0;
    c[3058] = 11944;
    Ga(2304)
   }
   return c[3058] | 0
  }

  function sq(b) {
   b = b | 0;
   if ((a[2320] | 0) == 0 ? (ya(2320) | 0) != 0 : 0) {
    if ((a[2328] | 0) == 0 ? (ya(2328) | 0) != 0 : 0) {
     b = 12236;
     do {
      c[b >> 2] = 0;
      c[b + 4 >> 2] = 0;
      c[b + 8 >> 2] = 0;
      b = b + 12 | 0
     } while ((b | 0) != 12524);
     Ga(2328)
    }
    Kj(12236, 12524) | 0;
    Kj(12248, 12536) | 0;
    c[3137] = 12236;
    Ga(2320)
   }
   return c[3137] | 0
  }

  function tq(b) {
   b = b | 0;
   if ((a[2336] | 0) == 0 ? (ya(2336) | 0) != 0 : 0) {
    sj(12552, 23815, 8);
    Ga(2336)
   }
   return 12552
  }

  function uq(b) {
   b = b | 0;
   if ((a[2344] | 0) == 0 ? (ya(2344) | 0) != 0 : 0) {
    Hj(12600, 12564, Yi(12564) | 0);
    Ga(2344)
   }
   return 12600
  }

  function vq(b) {
   b = b | 0;
   if ((a[2352] | 0) == 0 ? (ya(2352) | 0) != 0 : 0) {
    sj(12612, 23824, 8);
    Ga(2352)
   }
   return 12612
  }

  function wq(b) {
   b = b | 0;
   if ((a[2360] | 0) == 0 ? (ya(2360) | 0) != 0 : 0) {
    Hj(12660, 12624, Yi(12624) | 0);
    Ga(2360)
   }
   return 12660
  }

  function xq(b) {
   b = b | 0;
   if ((a[2368] | 0) == 0 ? (ya(2368) | 0) != 0 : 0) {
    sj(12672, 23833, 20);
    Ga(2368)
   }
   return 12672
  }

  function yq(b) {
   b = b | 0;
   if ((a[2376] | 0) == 0 ? (ya(2376) | 0) != 0 : 0) {
    Hj(12768, 12684, Yi(12684) | 0);
    Ga(2376)
   }
   return 12768
  }

  function zq(b) {
   b = b | 0;
   if ((a[2384] | 0) == 0 ? (ya(2384) | 0) != 0 : 0) {
    sj(12780, 23854, 11);
    Ga(2384)
   }
   return 12780
  }

  function Aq(b) {
   b = b | 0;
   if ((a[2392] | 0) == 0 ? (ya(2392) | 0) != 0 : 0) {
    Hj(12840, 12792, Yi(12792) | 0);
    Ga(2392)
   }
   return 12840
  }

  function Bq(a) {
   a = a | 0;
   var b = 0;
   c[a >> 2] = 9420;
   a = a + 8 | 0;
   b = c[a >> 2] | 0;
   if ((b | 0) != (dl() | 0)) gi(c[a >> 2] | 0);
   return
  }

  function Fb(a) {
   a = a | 0;
   var b = 0;
   b = i;
   i = i + a | 0;
   i = i + 15 & -16;
   return b | 0
  }

  function Gb() {
   return i | 0
  }

  function Hb(a) {
   a = a | 0;
   i = a
  }

  function Ib(a, b) {
   a = a | 0;
   b = b | 0;
   i = a;
   j = b
  }

  function Jb(a, b) {
   a = a | 0;
   b = b | 0;
   if (!n) {
    n = a;
    o = b
   }
  }

  function Kb(b) {
   b = b | 0;
   a[k >> 0] = a[b >> 0];
   a[k + 1 >> 0] = a[b + 1 >> 0];
   a[k + 2 >> 0] = a[b + 2 >> 0];
   a[k + 3 >> 0] = a[b + 3 >> 0]
  }

  function Lb(b) {
   b = b | 0;
   a[k >> 0] = a[b >> 0];
   a[k + 1 >> 0] = a[b + 1 >> 0];
   a[k + 2 >> 0] = a[b + 2 >> 0];
   a[k + 3 >> 0] = a[b + 3 >> 0];
   a[k + 4 >> 0] = a[b + 4 >> 0];
   a[k + 5 >> 0] = a[b + 5 >> 0];
   a[k + 6 >> 0] = a[b + 6 >> 0];
   a[k + 7 >> 0] = a[b + 7 >> 0]
  }

  function Mb(a) {
   a = a | 0;
   C = a
  }

  function Nb() {
   return C | 0
  }

  function Ob(b, d) {
   b = b | 0;
   d = +d;
   var e = 0,
    f = 0.0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   m = i;
   i = i + 16 | 0;
   l = m;
   e = c[b + 48 >> 2] | 0;
   if (a[e + 34 >> 0] | 0) {
    i = m;
    return
   }
   j = c[e + 528 >> 2] | 0;
   k = c[e + 532 >> 2] | 0;
   if ((j | 0) == (k | 0)) {
    i = m;
    return
   }
   if (!(a[b + 52 >> 0] | 0)) {
    e = j;
    d = 0.0
   } else {
    e = b + 32 | 0;
    h[e >> 3] = +h[e >> 3] + d;
    e = j;
    d = 0.0
   }
   do {
    f = +g[(c[e >> 2] | 0) + 16 >> 2];
    d = d + +(~~+M(+(f * f / 100.0)) | 0);
    e = e + 4 | 0
   } while ((e | 0) != (k | 0));
   f = d;
   g[l >> 2] = f;
   e = b + 60 | 0;
   j = c[e >> 2] | 0;
   if (j >>> 0 < (c[b + 64 >> 2] | 0) >>> 0) {
    g[j >> 2] = f;
    c[e >> 2] = j + 4
   } else Rb(b + 56 | 0, l);
   b = b + 24 | 0;
   f = +h[b >> 3];
   h[b >> 3] = d < f ? f : d;
   i = m;
   return
  }

  function Pb(b) {
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0;
   g = b + 52 | 0;
   a[g >> 0] = 0;
   e = c[b + 48 >> 2] | 0;
   d = c[e + 36 >> 2] | 0;
   e = c[e + 40 >> 2] | 0;
   if ((d | 0) == (e | 0)) return;
   else f = 0;
   while (1) {
    f = f + 1 | 0;
    i = d;
    d = d + 16 | 0;
    if (c[i >> 2] & 1) break;
    if ((d | 0) == (e | 0)) {
     h = 8;
     break
    }
   }
   if ((h | 0) == 8) return;
   if (!f) return;
   a[g >> 0] = 1;
   d = b + 44 | 0;
   e = c[d >> 2] | 0;
   if (!e) {
    c[d >> 2] = f;
    return
   } else {
    c[d >> 2] = (f | 0) < (e | 0) ? f : e;
    return
   }
  }

  function Qb(a) {
   a = a | 0;
   var b = 0,
    d = 0.0,
    e = 0.0,
    f = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0.0;
   r = i;
   i = i + 16 | 0;
   q = r + 4 | 0;
   p = r;
   m = c[654] | 0;
   if ((c[m >> 2] | 0) == -1) {
    i = r;
    return
   }
   Ne(m, q, p);
   Ve(m, 0.0, 0.0, +(c[q >> 2] | 0), +(c[p >> 2] | 0));
   n = a + 60 | 0;
   f = c[n >> 2] | 0;
   o = a + 56 | 0;
   b = c[o >> 2] | 0;
   if (f - b >> 2 >>> 0 < 2) {
    i = r;
    return
   }
   if ((b | 0) == (f | 0)) d = 200.0;
   else {
    d = 200.0;
    do {
     e = +g[b >> 2];
     d = e < d ? d : e;
     b = b + 4 | 0
    } while ((b | 0) != (f | 0))
   }
   df(m, 3.0);
   mf(m, 1);
   nf(m, 0);
   f = a + 48 | 0;
   Ye(m, (c[f >> 2] | 0) + 572 | 0);
   Xe(m, (c[f >> 2] | 0) + 572 | 0);
   Te(m);
   e = +(c[p >> 2] | 0);
   _e(m, 0.0, e - +g[c[o >> 2] >> 2] / d * (e + -10.0) + 10.0);
   f = c[n >> 2] | 0;
   a = c[o >> 2] | 0;
   b = f - a | 0;
   if ((b | 0) > 4) {
    h = c[q >> 2] | 0;
    b = b >> 2;
    l = 1;
    do {
     k = (_(h, l) | 0) / (b + -1 | 0) | 0;
     h = f - a >> 2;
     b = 0;
     j = -20;
     e = 0.0;
     do {
      f = j + l | 0;
      if ((f | 0) > -1 & (f | 0) < (h | 0)) {
       b = b + 1 | 0;
       e = e + +g[a + (f << 2) >> 2]
      }
      j = j + 1 | 0
     } while ((j | 0) != 21);
     s = +(c[p >> 2] | 0);
     $e(m, +(k | 0), s - e / +(b | 0) / d * (s + -10.0) + 10.0);
     f = c[n >> 2] | 0;
     a = c[o >> 2] | 0;
     b = f - a >> 2;
     h = c[q >> 2] | 0;
     k = (b >>> 0) / (h >>> 0) | 0;
     l = ((k | 0) < 1 ? 1 : k) + l | 0
    } while ((l | 0) < (b | 0))
   }
   Re(m);
   Ze(m, .5);
   $e(m, +(c[q >> 2] | 0), +(c[p >> 2] | 0));
   $e(m, 0.0, +(c[p >> 2] | 0));
   Qe(m);
   Ze(m, 1.0);
   i = r;
   return
  }

  function Rb(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   i = a + 4 | 0;
   j = c[a >> 2] | 0;
   k = j;
   e = ((c[i >> 2] | 0) - k >> 2) + 1 | 0;
   if (e >>> 0 > 1073741823) jh(a);
   l = a + 8 | 0;
   f = j;
   d = (c[l >> 2] | 0) - f | 0;
   if (d >> 2 >>> 0 < 536870911) {
    d = d >> 1;
    d = d >>> 0 < e >>> 0 ? e : d;
    f = (c[i >> 2] | 0) - f | 0;
    e = f >> 2;
    if (!d) {
     h = 0;
     g = 0;
     d = f
    } else m = 6
   } else {
    f = (c[i >> 2] | 0) - f | 0;
    d = 1073741823;
    e = f >> 2;
    m = 6
   }
   if ((m | 0) == 6) {
    h = d;
    g = kh(d << 2) | 0;
    d = f
   }
   c[g + (e << 2) >> 2] = c[b >> 2];
   ns(g | 0, j | 0, d | 0) | 0;
   c[a >> 2] = g;
   c[i >> 2] = g + (e + 1 << 2);
   c[l >> 2] = g + (h << 2);
   if (!k) return;
   mh(k);
   return
  }

  function Sb() {
   c[654] = pf(13696) | 0;
   return
  }

  function Tb(b) {
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    j = 0.0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0.0,
    q = 0.0;
   o = i;
   i = i + 32 | 0;
   k = o;
   j = +g[b + 16 >> 2];
   d = ~~+M(+j);
   if (!(a[b + 224 >> 0] | 0)) {
    p = +(c[914] | 0) / 1080.0;
    q = +(c[913] | 0) / 1920.0;
    p = +h[25] * (p < q ? q : p);
    q = +h[19];
    p = q < p ? q : p;
    d = ~~(+(d | 0) * (p > 1.0 ? 1.0 : p));
    e = j <= 20.0 ? 5 : 10
   } else e = 30;
   l = (d | 0) < (e | 0) ? e : d;
   m = b + 228 | 0;
   n = b + 232 | 0;
   d = c[n >> 2] | 0;
   f = c[m >> 2] | 0;
   e = f;
   if (((d - e | 0) / 28 | 0) >>> 0 > l >>> 0) {
    do d = d + -28 | 0; while (((d - e | 0) / 28 | 0) >>> 0 > l >>> 0);
    c[n >> 2] = d
   }
   do
    if ((d | 0) == (f | 0)) {
     c[k >> 2] = c[b >> 2];
     c[k + 4 >> 2] = c[b + 8 >> 2];
     c[k + 8 >> 2] = c[b + 12 >> 2];
     g[k + 12 >> 2] = 0.0;
     g[k + 16 >> 2] = 0.0;
     g[k + 20 >> 2] = j;
     g[k + 24 >> 2] = +Bf() + -.5;
     d = c[n >> 2] | 0;
     if (d >>> 0 < (c[b + 236 >> 2] | 0) >>> 0) {
      c[d >> 2] = c[k >> 2];
      c[d + 4 >> 2] = c[k + 4 >> 2];
      c[d + 8 >> 2] = c[k + 8 >> 2];
      c[d + 12 >> 2] = c[k + 12 >> 2];
      c[d + 16 >> 2] = c[k + 16 >> 2];
      c[d + 20 >> 2] = c[k + 20 >> 2];
      c[d + 24 >> 2] = c[k + 24 >> 2];
      d = (c[n >> 2] | 0) + 28 | 0;
      c[n >> 2] = d;
      break
     } else {
      ec(m, k);
      d = c[n >> 2] | 0;
      break
     }
    }
   while (0);
   if (((d - (c[m >> 2] | 0) | 0) / 28 | 0) >>> 0 >= l >>> 0) {
    i = o;
    return
   }
   f = b + 236 | 0;
   do {
    e = d + -28 | 0;
    if ((d | 0) == (c[f >> 2] | 0)) {
     fc(m, e);
     d = c[n >> 2] | 0
    } else {
     c[d >> 2] = c[e >> 2];
     c[d + 4 >> 2] = c[e + 4 >> 2];
     c[d + 8 >> 2] = c[e + 8 >> 2];
     c[d + 12 >> 2] = c[e + 12 >> 2];
     c[d + 16 >> 2] = c[e + 16 >> 2];
     c[d + 20 >> 2] = c[e + 20 >> 2];
     c[d + 24 >> 2] = c[e + 24 >> 2];
     d = (c[n >> 2] | 0) + 28 | 0;
     c[n >> 2] = d
    }
   } while (((d - (c[m >> 2] | 0) | 0) / 28 | 0) >>> 0 < l >>> 0);
   i = o;
   return
  }

  function Ub(b, d, e, f, i) {
   b = b | 0;
   d = +d;
   e = +e;
   f = +f;
   i = i | 0;
   var j = 0,
    k = 0;
   j = c[657] | 0;
   if ((c[656] | 0) == (j | 0)) {
    c[655] = (c[655] | 0) + 1;
    k = kh(240) | 0;
    c[k >> 2] = b;
    a[k + 4 >> 0] = 0;
    g[k + 8 >> 2] = d;
    g[k + 12 >> 2] = e;
    g[k + 16 >> 2] = f;
    g[k + 20 >> 2] = d;
    g[k + 24 >> 2] = e;
    g[k + 28 >> 2] = f;
    g[k + 32 >> 2] = d;
    g[k + 36 >> 2] = e;
    g[k + 40 >> 2] = f;
    g[k + 44 >> 2] = 0.0;
    g[k + 48 >> 2] = 0.0;
    b = k + 56 | 0;
    j = k + 80 | 0;
    c[b >> 2] = 0;
    c[b + 4 >> 2] = 0;
    c[b + 8 >> 2] = 0;
    c[b + 12 >> 2] = 0;
    c[b + 16 >> 2] = 0;
    c[b + 20 >> 2] = 0;
    a[j >> 0] = a[i >> 0] | 0;
    a[j + 1 >> 0] = a[i + 1 >> 0] | 0;
    a[j + 2 >> 0] = a[i + 2 >> 0] | 0;
    j = k + 84 | 0;
    c[j >> 2] = 0;
    c[j + 4 >> 2] = 0;
    c[j + 8 >> 2] = 0;
    c[k + 96 >> 2] = -1;
    j = k + 100 | 0;
    c[j >> 2] = 0;
    c[j + 4 >> 2] = 0;
    c[j + 8 >> 2] = 0;
    c[j + 12 >> 2] = 0;
    c[j + 16 >> 2] = 0;
    h[k + 120 >> 3] = 1.0;
    h[k + 128 >> 3] = .1;
    a[k + 136 >> 0] = -1;
    a[k + 137 >> 0] = -1;
    a[k + 138 >> 0] = -1;
    a[k + 139 >> 0] = 0;
    a[k + 140 >> 0] = 0;
    a[k + 141 >> 0] = 0;
    a[k + 142 >> 0] = 1;
    a[k + 143 >> 0] = 1;
    a[k + 144 >> 0] = 0;
    c[k + 148 >> 2] = 0;
    c[k + 152 >> 2] = 0;
    c[k + 160 >> 2] = -1;
    j = k + 164 | 0;
    c[j >> 2] = 0;
    c[j + 4 >> 2] = 0;
    c[j + 8 >> 2] = 0;
    c[j + 12 >> 2] = 0;
    c[j + 16 >> 2] = 0;
    h[k + 184 >> 3] = 1.0;
    h[k + 192 >> 3] = .1;
    a[k + 200 >> 0] = -1;
    a[k + 201 >> 0] = -1;
    a[k + 202 >> 0] = -1;
    a[k + 203 >> 0] = 0;
    a[k + 204 >> 0] = 0;
    a[k + 205 >> 0] = 0;
    a[k + 206 >> 0] = 1;
    a[k + 207 >> 0] = 1;
    a[k + 208 >> 0] = 0;
    c[k + 212 >> 2] = 0;
    c[k + 216 >> 2] = 0;
    a[k + 224 >> 0] = 0;
    a[k + 225 >> 0] = 0;
    a[k + 226 >> 0] = 1;
    j = k + 227 | 0;
    i = j + 13 | 0;
    do {
     a[j >> 0] = 0;
     j = j + 1 | 0
    } while ((j | 0) < (i | 0));
    Tb(k);
    b = k;
    return b | 0
   } else {
    j = j + -4 | 0;
    k = c[j >> 2] | 0;
    c[657] = j;
    c[k >> 2] = b;
    a[k + 4 >> 0] = 0;
    g[k + 8 >> 2] = d;
    g[k + 12 >> 2] = e;
    g[k + 16 >> 2] = f;
    g[k + 20 >> 2] = d;
    g[k + 24 >> 2] = e;
    g[k + 28 >> 2] = f;
    g[k + 32 >> 2] = d;
    g[k + 36 >> 2] = e;
    g[k + 40 >> 2] = f;
    g[k + 44 >> 2] = 0.0;
    g[k + 48 >> 2] = 0.0;
    b = k + 56 | 0;
    j = k + 80 | 0;
    c[b >> 2] = 0;
    c[b + 4 >> 2] = 0;
    c[b + 8 >> 2] = 0;
    c[b + 12 >> 2] = 0;
    c[b + 16 >> 2] = 0;
    c[b + 20 >> 2] = 0;
    a[j >> 0] = a[i >> 0] | 0;
    a[j + 1 >> 0] = a[i + 1 >> 0] | 0;
    a[j + 2 >> 0] = a[i + 2 >> 0] | 0;
    j = k + 84 | 0;
    c[j >> 2] = 0;
    c[j + 4 >> 2] = 0;
    c[j + 8 >> 2] = 0;
    c[k + 96 >> 2] = -1;
    j = k + 100 | 0;
    c[j >> 2] = 0;
    c[j + 4 >> 2] = 0;
    c[j + 8 >> 2] = 0;
    c[j + 12 >> 2] = 0;
    c[j + 16 >> 2] = 0;
    h[k + 120 >> 3] = 1.0;
    h[k + 128 >> 3] = .1;
    a[k + 136 >> 0] = -1;
    a[k + 137 >> 0] = -1;
    a[k + 138 >> 0] = -1;
    a[k + 139 >> 0] = 0;
    a[k + 140 >> 0] = 0;
    a[k + 141 >> 0] = 0;
    a[k + 142 >> 0] = 1;
    a[k + 143 >> 0] = 1;
    a[k + 144 >> 0] = 0;
    c[k + 148 >> 2] = 0;
    c[k + 152 >> 2] = 0;
    c[k + 160 >> 2] = -1;
    j = k + 164 | 0;
    c[j >> 2] = 0;
    c[j + 4 >> 2] = 0;
    c[j + 8 >> 2] = 0;
    c[j + 12 >> 2] = 0;
    c[j + 16 >> 2] = 0;
    h[k + 184 >> 3] = 1.0;
    h[k + 192 >> 3] = .1;
    a[k + 200 >> 0] = -1;
    a[k + 201 >> 0] = -1;
    a[k + 202 >> 0] = -1;
    a[k + 203 >> 0] = 0;
    a[k + 204 >> 0] = 0;
    a[k + 205 >> 0] = 0;
    a[k + 206 >> 0] = 1;
    a[k + 207 >> 0] = 1;
    a[k + 208 >> 0] = 0;
    c[k + 212 >> 2] = 0;
    c[k + 216 >> 2] = 0;
    a[k + 224 >> 0] = 0;
    a[k + 225 >> 0] = 0;
    a[k + 226 >> 0] = 1;
    j = k + 227 | 0;
    i = j + 13 | 0;
    do {
     a[j >> 0] = 0;
     j = j + 1 | 0
    } while ((j | 0) < (i | 0));
    Tb(k);
    b = k;
    return b | 0
   }
   return 0
  }

  function Vb(a) {
   a = a | 0;
   var b = 0,
    d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    j = 0;
   j = i;
   i = i + 16 | 0;
   g = j;
   c[g >> 2] = a;
   h = a;
   if ((c[657] | 0) - (c[656] | 0) >> 2 >>> 0 > 500) {
    c[655] = (c[655] | 0) + -1;
    if (!a) {
     i = j;
     return
    }
    b = c[a + 228 >> 2] | 0;
    d = b;
    if (b) {
     e = a + 232 | 0;
     f = c[e >> 2] | 0;
     if ((f | 0) != (b | 0)) c[e >> 2] = f + (~(((f + -28 - d | 0) >>> 0) / 28 | 0) * 28 | 0);
     mh(b)
    }
    uj(a + 164 | 0);
    Le(a + 160 | 0);
    uj(a + 100 | 0);
    Le(a + 96 | 0);
    uj(a + 84 | 0);
    mh(a);
    i = j;
    return
   }
   b = c[a + 228 >> 2] | 0;
   d = b;
   if (b) {
    e = a + 232 | 0;
    f = c[e >> 2] | 0;
    if ((f | 0) != (b | 0)) c[e >> 2] = f + (~(((f + -28 - d | 0) >>> 0) / 28 | 0) * 28 | 0);
    mh(b)
   }
   uj(a + 164 | 0);
   Le(a + 160 | 0);
   uj(a + 100 | 0);
   Le(a + 96 | 0);
   uj(a + 84 | 0);
   b = c[657] | 0;
   if ((b | 0) == (c[658] | 0)) {
    gc(2624, g);
    i = j;
    return
   } else {
    c[b >> 2] = h;
    c[657] = (c[657] | 0) + 4;
    i = j;
    return
   }
  }

  function Wb(b) {
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0;
   d = b + 4 | 0;
   if (a[d >> 0] | 0) return;
   a[d >> 0] = 1;
   d = c[131] | 0;
   e = c[132] | 0;
   f = c[b >> 2] | 0;
   a: do
    if ((d | 0) == (e | 0)) {
     h = d;
     k = 5
    } else {
     g = d;
     do {
      if ((c[g >> 2] | 0) == (f | 0)) {
       h = g;
       k = 5;
       break a
      }
      g = g + 4 | 0
     } while ((g | 0) != (e | 0))
    }
   while (0);
   if (((k | 0) == 5 ? (h | 0) != (e | 0) : 0) ? (j = d + ((h - d >> 2) + 1 << 2) | 0, i = e - j | 0, ps(h | 0, j | 0, i | 0) | 0, i = h + (i >> 2 << 2) | 0, j = c[132] | 0, (j | 0) != (i | 0)) : 0) c[132] = j + (~((j + -4 - i | 0) >>> 2) << 2);
   e = c[134] | 0;
   f = c[135] | 0;
   b: do
    if ((e | 0) == (f | 0)) d = e;
    else {
     d = e;
     do {
      if ((c[d >> 2] | 0) == (b | 0)) break b;
      d = d + 4 | 0
     } while ((d | 0) != (f | 0));
     return
    }
   while (0);
   if ((d | 0) == (f | 0)) return;
   b = e + ((d - e >> 2) + 1 << 2) | 0;
   e = f - b | 0;
   ps(d | 0, b | 0, e | 0) | 0;
   d = d + (e >> 2 << 2) | 0;
   e = c[135] | 0;
   if ((e | 0) == (d | 0)) return;
   c[135] = e + (~((e + -4 - d | 0) >>> 2) << 2);
   return
  }

  function Xb(b) {
   b = b | 0;
   var d = 0.0,
    e = 0,
    f = 0.0,
    j = 0.0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0.0,
    q = 0.0,
    r = 0,
    s = 0.0,
    t = 0,
    u = 0,
    v = 0,
    w = 0.0,
    x = 0,
    y = 0,
    z = 0.0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0,
    F = 0,
    G = 0.0;
   F = i;
   i = i + 48 | 0;
   C = F + 40 | 0;
   D = F + 32 | 0;
   E = F + 24 | 0;
   y = F;
   A = b + 228 | 0;
   e = c[A >> 2] | 0;
   o = (c[b + 232 >> 2] | 0) - e | 0;
   B = (o | 0) / 28 | 0;
   o = (o | 0) > 0;
   if (o) {
    m = B + -1 | 0;
    n = b + 225 | 0;
    l = 0;
    do {
     f = +g[e + (((m + l | 0) % (B | 0) | 0) * 28 | 0) + 24 >> 2];
     k = l;
     l = l + 1 | 0;
     j = +g[e + (((l | 0) % (B | 0) | 0) * 28 | 0) + 24 >> 2];
     d = +Bf() + -.5;
     e = c[A >> 2] | 0;
     k = e + (k * 28 | 0) + 24 | 0;
     d = (+g[k >> 2] + d * ((a[n >> 0] | 0) != 0 ? 3.0 : 1.0)) * .7;
     if (!(d > 10.0)) {
      if (d < -10.0) d = -10.0
     } else d = 10.0;
     g[k >> 2] = (f + j + d * 8.0) / 10.0
    } while ((l | 0) < (B | 0))
   }
   x = b + 224 | 0;
   if (!(a[x >> 0] | 0)) w = +kb(0, +(+((c[b >> 2] | 0) >>> 0) / 1.0e3 + +h[85] / 1.0e4), 6.283185307179586);
   else w = 0.0;
   if (!o) {
    z = 0.0;
    b = b + 44 | 0;
    g[b >> 2] = z;
    i = F;
    return
   }
   m = B + -1 | 0;
   n = b + 16 | 0;
   o = y + 16 | 0;
   r = b + 225 | 0;
   s = 6.283185307179586 / +(B | 0);
   t = b + 8 | 0;
   u = b + 12 | 0;
   e = c[A >> 2] | 0;
   f = +g[n >> 2];
   v = 0;
   d = 0.0;
   while (1) {
    j = +g[e + (v * 28 | 0) + 20 >> 2];
    p = +g[e + (((m + v | 0) % (B | 0) | 0) * 28 | 0) + 20 >> 2];
    l = v;
    v = v + 1 | 0;
    q = +g[e + (((v | 0) % (B | 0) | 0) * 28 | 0) + 20 >> 2];
    do
     if (!(f <= 20.0) ? f * +h[19] > 20.0 : 0) {
      h[C >> 3] = 5.0;
      G = +g[e + (l * 28 | 0) + 4 >> 2];
      h[D >> 3] = G;
      f = +g[e + (l * 28 | 0) + 8 >> 2];
      h[E >> 3] = f;
      e = kh(20) | 0;
      c[e >> 2] = 2644;
      c[e + 4 >> 2] = b;
      c[e + 8 >> 2] = D;
      c[e + 12 >> 2] = E;
      c[e + 16 >> 2] = C;
      c[o >> 2] = e;
      e = hc(212, G, f, 10.0, 10.0, y) | 0;
      k = c[o >> 2] | 0;
      if ((k | 0) != (y | 0)) {
       if (k) sb[c[(c[k >> 2] | 0) + 20 >> 2] & 255](k)
      } else sb[c[(c[y >> 2] | 0) + 16 >> 2] & 255](y);
      if ((!e ? (z = +h[D >> 3], !(z < +h[13])) : 0) ? (G = +h[E >> 3], !(G < +h[14] | z > +h[15] | G > +h[16])) : 0) {
       e = c[A >> 2] | 0;
       break
      }
      e = c[A >> 2] | 0;
      k = e + (l * 28 | 0) + 24 | 0;
      f = +g[k >> 2];
      if (f > 0.0) {
       g[k >> 2] = 0.0;
       f = 0.0
      }
      g[k >> 2] = f + -1.0
     }
    while (0);
    f = j + +g[e + (l * 28 | 0) + 24 >> 2];
    f = f < 0.0 ? 0.0 : f;
    if (!(a[r >> 0] | 0)) {
     G = +g[n >> 2];
     j = G;
     f = (f * 12.0 + G) / 13.0
    } else {
     G = +g[n >> 2];
     j = G;
     f = (f * 19.0 + G) / 20.0
    }
    G = (p + q + f * 8.0) / 10.0;
    g[e + (l * 28 | 0) + 20 >> 2] = G;
    G = (l & 1 | 0) == 0 & (a[x >> 0] | 0) != 0 ? G + 5.0 : G;
    p = w + +(l | 0) * s;
    f = +Q(+p);
    p = +R(+p);
    g[e + (l * 28 | 0) + 12 >> 2] = f;
    g[e + (l * 28 | 0) + 16 >> 2] = p;
    q = G;
    g[e + (l * 28 | 0) + 4 >> 2] = f * q + +g[t >> 2];
    g[e + (l * 28 | 0) + 8 >> 2] = p * q + +g[u >> 2];
    d = d < G ? G : d;
    if ((v | 0) >= (B | 0)) break;
    else f = j
   }
   b = b + 44 | 0;
   g[b >> 2] = d;
   i = F;
   return
  }

  function Yb(a) {
   a = a | 0;
   var b = 0.0,
    d = 0.0,
    e = 0.0,
    f = 0.0,
    i = 0.0,
    j = 0.0,
    k = 0.0;
   f = +g[a + 8 >> 2];
   j = +g[a + 16 >> 2];
   k = +h[17];
   b = +h[19];
   i = +((c[913] | 0) / 2 | 0 | 0) / b;
   if (f + j + 40.0 < k - i) {
    a = 0;
    return a | 0
   }
   d = +g[a + 12 >> 2];
   e = +h[18];
   b = +((c[914] | 0) / 2 | 0 | 0) / b;
   if (j + d + 40.0 < e - b) {
    a = 0;
    return a | 0
   }
   if (f - j + -40.0 > k + i) {
    a = 0;
    return a | 0
   }
   a = !(d - j + -40.0 > e + b);
   return a | 0
  }

  function Zb(a) {
   a = a | 0;
   var b = 0.0;
   b = (+h[85] - +h[a + 64 >> 3]) / 100.0;
   return +(b < 0.0 ? 0.0 : b > 1.0 ? 1.0 : b)
  }

  function _b(a) {
   a = a | 0;
   var b = 0.0,
    c = 0.0,
    d = 0,
    e = 0.0;
   e = (+h[85] - +h[a + 64 >> 3]) / 100.0;
   e = e < 0.0 ? 0.0 : e > 1.0 ? 1.0 : e;
   c = +g[a + 20 >> 2];
   g[a + 8 >> 2] = c + e * (+g[a + 32 >> 2] - c);
   c = +g[a + 24 >> 2];
   g[a + 12 >> 2] = c + e * (+g[a + 36 >> 2] - c);
   c = +g[a + 40 >> 2];
   b = +g[a + 28 >> 2];
   b = b + e * (c - b);
   d = +N(+(b - c)) < .01;
   g[a + 16 >> 2] = d ? c : b;
   return
  }

  function $b(b) {
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    i = 0.0,
    j = 0.0,
    k = 0.0,
    l = 0.0,
    m = 0,
    n = 0,
    o = 0.0,
    p = 0.0;
   f = c[b + 232 >> 2] | 0;
   m = c[b + 228 >> 2] | 0;
   n = (f - m | 0) / 28 | 0;
   if (n >>> 0 < 6) {
    m = 1;
    n = b + 226 | 0;
    m = m & 1;
    a[n >> 0] = m;
    return
   }
   if ((a[b + 224 >> 0] | 0) == 0 ? (a[b + 225 >> 0] | 0) == 0 : 0) e = +h[19] < .4;
   else e = 0;
   d = b + 226 | 0;
   if (e | (a[d >> 0] | 0) == 0) {
    m = e;
    n = d;
    m = m & 1;
    a[n >> 0] = m;
    return
   }
   if ((f | 0) == (m | 0)) {
    m = 0;
    n = d;
    m = m & 1;
    a[n >> 0] = m;
    return
   }
   j = +(n >>> 0);
   k = +g[b + 16 >> 2];
   l = +g[b + 8 >> 2];
   i = +g[b + 12 >> 2];
   e = 0;
   do {
    o = +(e >>> 0) * 6.283185307179586 / j;
    p = +Q(+o);
    g[m + (e * 28 | 0) + 12 >> 2] = p;
    o = +R(+o);
    g[m + (e * 28 | 0) + 16 >> 2] = o;
    g[m + (e * 28 | 0) + 20 >> 2] = k;
    g[m + (e * 28 | 0) + 4 >> 2] = l + k * p;
    g[m + (e * 28 | 0) + 8 >> 2] = i + o * k;
    g[m + (e * 28 | 0) + 24 >> 2] = 0.0;
    e = e + 1 | 0
   } while (e >>> 0 < n >>> 0);
   e = 0;
   n = e & 1;
   a[d >> 0] = n;
   return
  }

  function ac(b, e) {
   b = b | 0;
   e = e | 0;
   var f = 0,
    j = 0,
    k = 0,
    l = 0.0,
    m = 0.0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0.0,
    z = 0;
   x = i;
   i = i + 16 | 0;
   s = x + 3 | 0;
   p = x;
   j = b + 72 | 0;
   c[j >> 2] = (c[j >> 2] | 0) + 1;
   j = b + 64 | 0;
   y = (+h[85] - +h[j >> 3]) / 100.0;
   y = y < 0.0 ? 0.0 : y > 1.0 ? 1.0 : y;
   l = +g[b + 20 >> 2];
   v = b + 8 | 0;
   g[v >> 2] = l + y * (+g[b + 32 >> 2] - l);
   l = +g[b + 24 >> 2];
   w = b + 12 | 0;
   g[w >> 2] = l + y * (+g[b + 36 >> 2] - l);
   l = +g[b + 40 >> 2];
   m = +g[b + 28 >> 2];
   m = m + y * (l - m);
   f = b + 16 | 0;
   t = +N(+(m - l)) < .01;
   g[f >> 2] = t ? l : m;
   t = (a[b + 226 >> 0] | 0) != 0;
   if ((a[13735] | 0) != 0 ? (a[596] | a[b + 225 >> 0]) << 24 >> 24 == 0 : 0) u = c[b + 76 >> 2] | 0;
   else u = 0;
   Oe(e);
   l = +h[85];
   h[b + 56 >> 3] = l;
   if (a[b + 4 >> 0] | 0) {
    y = (l - +h[j >> 3]) / 100.0;
    Ze(e, y < 0.0 ? 1.0 : y > 1.0 ? 0.0 : 1.0 - y)
   }
   df(e, 10.0);
   mf(e, 1);
   r = b + 224 | 0;
   nf(e, (a[r >> 0] | 0) != 0 ? 2 : 0);
   if (!(a[13733] | 0)) {
    if ((u | 0) != 0 ? (c[u + 12 >> 2] & 2 | 0) != 0 : 0) {
     ps(s | 0, u + 20 | 0, 3) | 0;
     j = s
    } else {
     j = b + 80 | 0;
     a[s >> 0] = a[j >> 0] | 0;
     a[s + 1 >> 0] = a[j + 1 >> 0] | 0;
     a[s + 2 >> 0] = a[j + 2 >> 0] | 0;
     j = s
    }
    o = ~~(+(d[s + 1 >> 0] | 0) * .9) & 255;
    q = ~~(+(d[s + 2 >> 0] | 0) * .9) & 255;
    a[p >> 0] = ~~(+(d[j >> 0] | 0) * .9);
    a[p + 1 >> 0] = o;
    a[p + 2 >> 0] = q
   } else {
    a[s >> 0] = -1;
    a[s + 1 >> 0] = -1;
    a[s + 2 >> 0] = -1;
    a[p >> 0] = -86;
    a[p + 1 >> 0] = -86;
    a[p + 2 >> 0] = -86
   }
   do
    if (t) {
     r = !(+g[f >> 2] <= 20.0);
     Te(e);
     af(e, +g[v >> 2], +g[w >> 2], +g[f >> 2] + 5.0, 0.0, 6.283185307179586, 0);
     Ue(e);
     if (r) {
      Xe(e, p);
      Qe(e);
      Te(e);
      af(e, +g[v >> 2], +g[w >> 2], +g[f >> 2] + -5.0, 0.0, 6.283185307179586, 0);
      Ue(e);
      Xe(e, s);
      Qe(e);
      break
     } else {
      Xe(e, s);
      Qe(e);
      break
     }
    } else {
     Te(e);
     o = b + 232 | 0;
     q = b + 228 | 0;
     j = c[q >> 2] | 0;
     k = (c[o >> 2] | 0) - j | 0;
     n = (k | 0) / 28 | 0;
     a: do
      if ((k | 0) >= 0) {
       k = 0;
       while (1) {
        z = (k | 0) % (n | 0) | 0;
        l = +g[j + (z * 28 | 0) + 20 >> 2] + 5.0;
        l = (k & 1 | 0) == 0 & (a[r >> 0] | 0) != 0 ? l + 5.0 : l;
        m = +g[v >> 2] + +g[j + (z * 28 | 0) + 12 >> 2] * l;
        l = +g[j + (z * 28 | 0) + 16 >> 2] * l + +g[w >> 2];
        if (!k) _e(e, m, l);
        else $e(e, m, l);
        if ((k | 0) >= (n | 0)) break a;
        j = c[q >> 2] | 0;
        k = k + 1 | 0
       }
      }
     while (0);
     Ue(e);
     Xe(e, +g[f >> 2] <= 20.0 & (a[13733] | 0) == 0 ? s : p);
     Qe(e);
     if (!(+g[f >> 2] <= 20.0)) {
      Te(e);
      j = c[q >> 2] | 0;
      z = (c[o >> 2] | 0) - j | 0;
      n = (z | 0) / 28 | 0;
      b: do
       if ((z | 0) >= 0) {
        k = 0;
        while (1) {
         z = (k | 0) % (n | 0) | 0;
         l = +g[j + (z * 28 | 0) + 20 >> 2] + -5.0;
         l = (k & 1 | 0) == 0 & (a[r >> 0] | 0) != 0 ? l + 5.0 : l;
         m = +g[v >> 2] + +g[j + (z * 28 | 0) + 12 >> 2] * l;
         l = +g[j + (z * 28 | 0) + 16 >> 2] * l + +g[w >> 2];
         if (!k) _e(e, m, l);
         else $e(e, m, l);
         if ((k | 0) >= (n | 0)) break b;
         j = c[q >> 2] | 0;
         k = k + 1 | 0
        }
       }
      while (0);
      Ue(e);
      Xe(e, s);
      Qe(e)
     }
    }
   while (0);
   do
    if (u) {
     n = u + 16 | 0;
     j = c[n >> 2] | 0;
     if (!j) {
      j = kh(16) | 0;
      if (!(a[u >> 0] & 1)) k = u + 1 | 0;
      else k = c[u + 8 >> 2] | 0;
      rf(j, k);
      c[n >> 2] = j
     }
     k = j + 4 | 0;
     if ((a[k >> 0] | 0) == 0 ? (sf(j), (a[k >> 0] | 0) == 0) : 0) break;
     Oe(e);
     Se(e);
     if (!t) {
      z = b + 44 | 0;
      f = +g[f >> 2] < +g[z >> 2] ? z : f
     }
     l = +g[f >> 2];
     f = c[n >> 2] | 0;
     if (!f) {
      f = kh(16) | 0;
      if (!(a[u >> 0] & 1)) j = u + 1 | 0;
      else j = c[u + 8 >> 2] | 0;
      rf(f, j);
      c[n >> 2] = f
     }
     y = l * 2.0 + -10.0;
     gf(e, f, +g[v >> 2] - l + 5.0, +g[w >> 2] - l + 5.0, y, y);
     Pe(e)
    }
   while (0);
   if ((a[b + 227 >> 0] | 0) == 0 ? ((((c[b >> 2] | 0) + (c[21] | 0) | 0) >>> 0) % 10 | 0 | 0) != 0 : 0) {
    Pe(e);
    i = x;
    return
   }
   bc(b, e);
   Pe(e);
   i = x;
   return
  }

  function bc(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    j = 0.0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0.0,
    t = 0,
    u = 0,
    v = 0;
   v = i;
   i = i + 48 | 0;
   q = v;
   r = v + 16 | 0;
   t = v + 4 | 0;
   a[b + 227 >> 0] = 1;
   p = b + 225 | 0;
   if ((a[13735] | 0) != 0 ? (a[596] | a[p >> 0]) << 24 >> 24 == 0 : 0) l = c[b + 76 >> 2] | 0;
   else l = 0;
   f = c[b >> 2] | 0;
   e = c[131] | 0;
   k = c[132] | 0;
   a: do
    if ((e | 0) != (k | 0))
     while (1) {
      if ((c[e >> 2] | 0) == (f | 0)) break a;
      e = e + 4 | 0;
      if ((e | 0) == (k | 0)) {
       e = k;
       break
      }
     }
    while (0);
   n = (e | 0) != (k | 0);
   m = ~~+g[b + 12 >> 2];
   s = +(c[914] | 0) / 1080.0;
   j = +(c[913] | 0) / 1920.0;
   s = +Z(+(+h[25] * (s < j ? j : s) * 10.0)) / 10.0;
   g[b + 48 >> 2] = s;
   do
    if (n | (a[13732] | 0) != 0) {
     e = a[b + 84 >> 0] | 0;
     if (!(e & 1)) e = (e & 255) >>> 1;
     else e = c[b + 88 >> 2] | 0;
     if (e) {
      if ((l | 0) != 0 ? (c[l + 12 >> 2] & 1 | 0) != 0 : 0) {
       o = m;
       break
      }
      k = b + 96 | 0;
      e = ~~(+g[b + 16 >> 2] * .3);
      j = (e | 0) < 24 ? 24.0 : +(e | 0);
      e = b + 112 | 0;
      if (!(+h[e >> 3] == j)) {
       a[b + 143 >> 0] = 1;
       h[e >> 3] = j
      }
      e = b + 120 | 0;
      if (!(+h[e >> 3] == s)) {
       a[b + 143 >> 0] = 1;
       h[e >> 3] = s
      }
      tf(k) | 0;
      e = ~~(+(c[b + 148 >> 2] | 0) / s);
      tf(k) | 0;
      f = ~~(+(c[b + 152 >> 2] | 0) / s);
      if (!d) e = (f | 0) / 2 | 0;
      else {
       l = tf(k) | 0;
       o = (f | 0) / 2 | 0;
       ff(d, l, +M(+(+g[b + 8 >> 2] - +((e | 0) / 2 | 0 | 0))), +M(+(+(m - o | 0))), +(e | 0), +(f | 0));
       e = o
      }
      o = m + 5 + e | 0
     } else o = m
    } else o = m;
   while (0);
   if (!(a[13730] | 0)) {
    i = v;
    return
   }
   e = b + 16 | 0;
   j = +g[e >> 2];
   if (j <= 20.0) {
    i = v;
    return
   }
   if (!n) {
    if ((c[134] | 0) != (c[135] | 0)) {
     i = v;
     return
    }
    if ((a[b + 224 >> 0] | 0) != 0 ? (a[p >> 0] | 0) == 0 : 0) {
     i = v;
     return
    }
   }
   c[q >> 2] = ~~+M(+(j * j / 100.0));
   Ki(r, 32, 13727, q) | 0;
   n = b + 160 | 0;
   e = ~~(+g[e >> 2] * .3);
   j = (e | 0) < 24 ? 12.0 : +((e | 0) / 2 | 0 | 0);
   e = b + 176 | 0;
   if (!(+h[e >> 3] == j)) {
    a[b + 207 >> 0] = 1;
    h[e >> 3] = j
   }
   sj(t, r, Xi(r) | 0);
   m = b + 164 | 0;
   l = a[t >> 0] | 0;
   k = (l & 1) == 0;
   l = k ? (l & 255) >>> 1 : c[t + 4 >> 2] | 0;
   r = a[m >> 0] | 0;
   e = (r & 1) == 0;
   b: do
    if ((l | 0) == ((e ? (r & 255) >>> 1 : c[b + 168 >> 2] | 0) | 0)) {
     f = k ? t + 1 | 0 : c[t + 8 >> 2] | 0;
     e = e ? m + 1 | 0 : c[b + 172 >> 2] | 0;
     if (!k)
      if (!(Vi(f, e, l) | 0)) break;
      else {
       u = 35;
       break
      }
     if (l)
      while (1) {
       if ((a[f >> 0] | 0) != (a[e >> 0] | 0)) {
        u = 35;
        break b
       }
       l = l + -1 | 0;
       if (!l) break;
       else {
        f = f + 1 | 0;
        e = e + 1 | 0
       }
      }
    } else u = 35;
   while (0);
   if ((u | 0) == 35) {
    a[b + 207 >> 0] = 1;
    vj(m, t) | 0
   }
   uj(t);
   e = b + 184 | 0;
   if (!(+h[e >> 3] == s)) {
    a[b + 207 >> 0] = 1;
    h[e >> 3] = s
   }
   tf(n) | 0;
   f = ~~(+(c[b + 212 >> 2] | 0) / s);
   tf(n) | 0;
   e = ~~(+(c[b + 216 >> 2] | 0) / s);
   if (!d) {
    i = v;
    return
   }
   u = tf(n) | 0;
   ff(d, u, +M(+(+g[b + 8 >> 2] - +((f | 0) / 2 | 0 | 0))), +M(+(+(o - ((e | 0) / 2 | 0) | 0))), +(f | 0), +(e | 0));
   i = v;
   return
  }

  function cc(a, b, c, d) {
   a = a | 0;
   b = +b;
   c = +c;
   d = +d;
   var e = 0,
    f = 0.0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0.0,
    n = 0,
    o = 0.0,
    p = 0,
    q = 0.0,
    r = 0.0,
    s = 0,
    t = 0.0;
   f = +h[85];
   e = a + 64 | 0;
   t = (f - +h[e >> 3]) / 100.0;
   t = t < 0.0 ? 0.0 : t > 1.0 ? 1.0 : t;
   k = a + 32 | 0;
   p = a + 20 | 0;
   q = +g[p >> 2];
   q = q + t * (+g[k >> 2] - q);
   g[a + 8 >> 2] = q;
   j = a + 36 | 0;
   n = a + 24 | 0;
   o = +g[n >> 2];
   o = o + t * (+g[j >> 2] - o);
   g[a + 12 >> 2] = o;
   i = a + 40 | 0;
   r = +g[i >> 2];
   l = a + 28 | 0;
   m = +g[l >> 2];
   m = m + t * (r - m);
   s = +N(+(m - r)) < .01;
   m = s ? r : m;
   g[a + 16 >> 2] = m;
   g[p >> 2] = q;
   g[n >> 2] = o;
   g[l >> 2] = m;
   g[k >> 2] = b;
   g[j >> 2] = c;
   g[i >> 2] = d;
   h[e >> 3] = f;
   return
  }

  function dc() {
   c[656] = 0;
   c[657] = 0;
   c[658] = 0;
   return
  }

  function ec(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   i = a + 4 | 0;
   j = c[a >> 2] | 0;
   k = j;
   e = (((c[i >> 2] | 0) - k | 0) / 28 | 0) + 1 | 0;
   if (e >>> 0 > 153391689) jh(a);
   l = a + 8 | 0;
   f = j;
   d = ((c[l >> 2] | 0) - f | 0) / 28 | 0;
   if (d >>> 0 < 76695844) {
    d = d << 1;
    d = d >>> 0 < e >>> 0 ? e : d;
    f = (c[i >> 2] | 0) - f | 0;
    e = (f | 0) / 28 | 0;
    if (!d) {
     h = 0;
     g = 0;
     d = f
    } else m = 6
   } else {
    f = (c[i >> 2] | 0) - f | 0;
    d = 153391689;
    e = (f | 0) / 28 | 0;
    m = 6
   }
   if ((m | 0) == 6) {
    h = d;
    g = kh(d * 28 | 0) | 0;
    d = f
   }
   m = g + (e * 28 | 0) | 0;
   c[m >> 2] = c[b >> 2];
   c[m + 4 >> 2] = c[b + 4 >> 2];
   c[m + 8 >> 2] = c[b + 8 >> 2];
   c[m + 12 >> 2] = c[b + 12 >> 2];
   c[m + 16 >> 2] = c[b + 16 >> 2];
   c[m + 20 >> 2] = c[b + 20 >> 2];
   c[m + 24 >> 2] = c[b + 24 >> 2];
   m = g + ((((d | 0) / -28 | 0) + e | 0) * 28 | 0) | 0;
   ns(m | 0, j | 0, d | 0) | 0;
   c[a >> 2] = m;
   c[i >> 2] = g + ((e + 1 | 0) * 28 | 0);
   c[l >> 2] = g + (h * 28 | 0);
   if (!k) return;
   mh(k);
   return
  }

  function fc(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   i = a + 4 | 0;
   j = c[a >> 2] | 0;
   k = j;
   e = (((c[i >> 2] | 0) - k | 0) / 28 | 0) + 1 | 0;
   if (e >>> 0 > 153391689) jh(a);
   l = a + 8 | 0;
   f = j;
   d = ((c[l >> 2] | 0) - f | 0) / 28 | 0;
   if (d >>> 0 < 76695844) {
    d = d << 1;
    d = d >>> 0 < e >>> 0 ? e : d;
    f = (c[i >> 2] | 0) - f | 0;
    e = (f | 0) / 28 | 0;
    if (!d) {
     h = 0;
     g = 0;
     d = f
    } else m = 6
   } else {
    f = (c[i >> 2] | 0) - f | 0;
    d = 153391689;
    e = (f | 0) / 28 | 0;
    m = 6
   }
   if ((m | 0) == 6) {
    h = d;
    g = kh(d * 28 | 0) | 0;
    d = f
   }
   m = g + (e * 28 | 0) | 0;
   c[m >> 2] = c[b >> 2];
   c[m + 4 >> 2] = c[b + 4 >> 2];
   c[m + 8 >> 2] = c[b + 8 >> 2];
   c[m + 12 >> 2] = c[b + 12 >> 2];
   c[m + 16 >> 2] = c[b + 16 >> 2];
   c[m + 20 >> 2] = c[b + 20 >> 2];
   c[m + 24 >> 2] = c[b + 24 >> 2];
   m = g + ((((d | 0) / -28 | 0) + e | 0) * 28 | 0) | 0;
   ns(m | 0, j | 0, d | 0) | 0;
   c[a >> 2] = m;
   c[i >> 2] = g + ((e + 1 | 0) * 28 | 0);
   c[l >> 2] = g + (h * 28 | 0);
   if (!k) return;
   mh(k);
   return
  }

  function gc(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   i = a + 4 | 0;
   j = c[a >> 2] | 0;
   k = j;
   e = ((c[i >> 2] | 0) - k >> 2) + 1 | 0;
   if (e >>> 0 > 1073741823) jh(a);
   l = a + 8 | 0;
   f = j;
   d = (c[l >> 2] | 0) - f | 0;
   if (d >> 2 >>> 0 < 536870911) {
    d = d >> 1;
    d = d >>> 0 < e >>> 0 ? e : d;
    f = (c[i >> 2] | 0) - f | 0;
    e = f >> 2;
    if (!d) {
     h = 0;
     g = 0;
     d = f
    } else m = 6
   } else {
    f = (c[i >> 2] | 0) - f | 0;
    d = 1073741823;
    e = f >> 2;
    m = 6
   }
   if ((m | 0) == 6) {
    h = d;
    g = kh(d << 2) | 0;
    d = f
   }
   c[g + (e << 2) >> 2] = c[b >> 2];
   ns(g | 0, j | 0, d | 0) | 0;
   c[a >> 2] = g;
   c[i >> 2] = g + (e + 1 << 2);
   c[l >> 2] = g + (h << 2);
   if (!k) return;
   mh(k);
   return
  }

  function hc(a, b, d, e, f, h) {
   a = a | 0;
   b = +b;
   d = +d;
   e = +e;
   f = +f;
   h = h | 0;
   var j = 0,
    k = 0.0,
    l = 0,
    m = 0.0,
    n = 0,
    o = 0.0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0;
   v = i;
   i = i + 16 | 0;
   u = v;
   m = +g[a >> 2];
   k = (b - m) / 50.0;
   if (!(k <= 0.0)) {
    t = ~~k >>> 0;
    j = c[a + 8 >> 2] | 0;
    j = t >>> 0 < j >>> 0 ? t : j + -1 | 0
   } else j = 0;
   o = +g[a + 4 >> 2];
   k = (d - o) / 50.0;
   if (!(k <= 0.0)) {
    s = ~~k >>> 0;
    t = c[a + 12 >> 2] | 0;
    t = s >>> 0 < t >>> 0 ? s : t + -1 | 0
   } else t = 0;
   k = (b + e - m) / 50.0;
   if (!(k <= 0.0)) {
    r = ~~k >>> 0;
    s = c[a + 8 >> 2] | 0;
    s = r >>> 0 < s >>> 0 ? r : s + -1 | 0
   } else s = 0;
   k = (d + f - o) / 50.0;
   if (!(k <= 0.0)) {
    r = ~~k >>> 0;
    q = c[a + 12 >> 2] | 0;
    q = r >>> 0 < q >>> 0 ? r : q + -1 | 0
   } else q = 0;
   if (j >>> 0 > s >>> 0) {
    u = 0;
    i = v;
    return u | 0
   }
   r = a + 8 | 0;
   p = a + 16 | 0;
   n = h + 16 | 0;
   if (t >>> 0 > q >>> 0) {
    do j = j + 1 | 0; while (j >>> 0 <= s >>> 0);
    j = 0;
    i = v;
    return j | 0
   }
   a: while (1) {
    l = t;
    do {
     h = (_(c[r >> 2] | 0, l) | 0) + j | 0;
     w = c[p >> 2] | 0;
     a = c[w + (h * 12 | 0) >> 2] | 0;
     h = c[w + (h * 12 | 0) + 4 >> 2] | 0;
     if ((a | 0) != (h | 0))
      do {
       c[u >> 2] = c[a >> 2];
       w = c[n >> 2] | 0;
       a = a + 4 | 0;
       if (Cb[c[(c[w >> 2] | 0) + 24 >> 2] & 15](w, u) | 0) {
        j = 1;
        a = 18;
        break a
       }
      } while ((a | 0) != (h | 0));
     l = l + 1 | 0
    } while (l >>> 0 <= q >>> 0);
    j = j + 1 | 0;
    if (j >>> 0 > s >>> 0) {
     j = 0;
     a = 18;
     break
    }
   }
   if ((a | 0) == 18) {
    i = v;
    return j | 0
   }
   return 0
  }

  function ic(a) {
   a = a | 0;
   return
  }

  function jc(a) {
   a = a | 0;
   mh(a);
   return
  }

  function kc(a) {
   a = a | 0;
   var b = 0,
    d = 0;
   b = kh(20) | 0;
   d = a + 4 | 0;
   c[b >> 2] = 2644;
   a = b + 4 | 0;
   c[a >> 2] = c[d >> 2];
   c[a + 4 >> 2] = c[d + 4 >> 2];
   c[a + 8 >> 2] = c[d + 8 >> 2];
   c[a + 12 >> 2] = c[d + 12 >> 2];
   return b | 0
  }

  function lc(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0;
   d = a + 4 | 0;
   c[b >> 2] = 2644;
   a = b + 4 | 0;
   c[a >> 2] = c[d >> 2];
   c[a + 4 >> 2] = c[d + 4 >> 2];
   c[a + 8 >> 2] = c[d + 8 >> 2];
   c[a + 12 >> 2] = c[d + 12 >> 2];
   return
  }

  function mc(a) {
   a = a | 0;
   return
  }

  function nc(a) {
   a = a | 0;
   mh(a);
   return
  }

  function oc(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0.0,
    e = 0.0;
   b = c[b >> 2] | 0;
   if ((c[b >> 2] | 0) != (c[c[a + 4 >> 2] >> 2] | 0) ? (e = +h[c[a + 8 >> 2] >> 3] - +g[b + 4 >> 2], d = +h[c[a + 12 >> 2] >> 3] - +g[b + 8 >> 2], e * e + d * d < 25.0) : 0) {
    a = 1;
    return a | 0
   }
   a = 0;
   return a | 0
  }

  function pc(b) {
   b = b | 0;
   a[13730] = b & 1;
   return
  }

  function qc(b) {
   b = b | 0;
   a[13731] = b & 1;
   return
  }

  function rc(b) {
   b = b | 0;
   a[13732] = b & 1;
   return
  }

  function sc(b) {
   b = b | 0;
   a[13733] = b & 1;
   return
  }

  function tc(b) {
   b = b | 0;
   a[13735] = b & 1;
   return
  }

  function uc(b) {
   b = b | 0;
   a[13734] = b & 1;
   return
  }

  function vc(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    j = 0,
    k = 0,
    l = 0;
   l = i;
   i = i + 32 | 0;
   k = l;
   c[a >> 2] = b;
   c[a + 4 >> 2] = 0;
   h[a + 8 >> 3] = 0.0;
   c[a + 16 >> 2] = 673720360;
   j = a + 60 | 0;
   g = a + 64 | 0;
   b = a + 20 | 0;
   d = b + 48 | 0;
   do {
    c[b >> 2] = 0;
    b = b + 4 | 0
   } while ((b | 0) < (d | 0));
   f = kh(6144) | 0;
   c[g >> 2] = f;
   c[j >> 2] = f;
   e = f + 6144 | 0;
   c[a + 68 >> 2] = e;
   b = 256;
   d = f;
   while (1) {
    c[d + 16 >> 2] = 0;
    b = b + -1 | 0;
    if (!b) break;
    else d = d + 24 | 0
   }
   c[g >> 2] = e;
   b = k + 16 | 0;
   c[b >> 2] = k;
   c[k >> 2] = 2680;
   c[k + 4 >> 2] = a;
   Gc(k, f + 384 | 0);
   b = c[b >> 2] | 0;
   if ((b | 0) != (k | 0)) {
    if (b) sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
   } else sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
   g = (c[j >> 2] | 0) + 408 | 0;
   b = k + 16 | 0;
   c[b >> 2] = k;
   c[k >> 2] = 2716;
   c[k + 4 >> 2] = a;
   Gc(k, g);
   b = c[b >> 2] | 0;
   if ((b | 0) != (k | 0)) {
    if (b) sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
   } else sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
   g = (c[j >> 2] | 0) + 432 | 0;
   b = k + 16 | 0;
   c[b >> 2] = k;
   c[k >> 2] = 2752;
   c[k + 4 >> 2] = a;
   Gc(k, g);
   b = c[b >> 2] | 0;
   if ((b | 0) != (k | 0)) {
    if (b) sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
   } else sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
   g = (c[j >> 2] | 0) + 480 | 0;
   b = k + 16 | 0;
   c[b >> 2] = k;
   c[k >> 2] = 2788;
   c[k + 4 >> 2] = a;
   Gc(k, g);
   b = c[b >> 2] | 0;
   if ((b | 0) != (k | 0)) {
    if (b) sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
   } else sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
   g = (c[j >> 2] | 0) + 768 | 0;
   b = k + 16 | 0;
   c[b >> 2] = k;
   c[k >> 2] = 2824;
   c[k + 4 >> 2] = a;
   Gc(k, g);
   b = c[b >> 2] | 0;
   if ((b | 0) != (k | 0)) {
    if (b) sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
   } else sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
   g = (c[j >> 2] | 0) + 1176 | 0;
   b = k + 16 | 0;
   c[b >> 2] = k;
   c[k >> 2] = 2860;
   c[k + 4 >> 2] = a;
   Gc(k, g);
   b = c[b >> 2] | 0;
   if ((b | 0) != (k | 0)) {
    if (b) sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
   } else sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
   g = (c[j >> 2] | 0) + 1200 | 0;
   b = k + 16 | 0;
   c[b >> 2] = k;
   c[k >> 2] = 2896;
   c[k + 4 >> 2] = a;
   Gc(k, g);
   b = c[b >> 2] | 0;
   if ((b | 0) != (k | 0)) {
    if (b) sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
   } else sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
   g = (c[j >> 2] | 0) + 1536 | 0;
   b = k + 16 | 0;
   c[b >> 2] = k;
   c[k >> 2] = 2932;
   c[k + 4 >> 2] = a;
   Gc(k, g);
   b = c[b >> 2] | 0;
   if ((b | 0) != (k | 0)) {
    if (b) sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
   } else sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
   g = (c[j >> 2] | 0) + 2448 | 0;
   b = k + 16 | 0;
   c[b >> 2] = k;
   c[k >> 2] = 2968;
   Gc(k, g);
   b = c[b >> 2] | 0;
   if ((b | 0) != (k | 0)) {
    if (b) sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
   } else sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
   g = (c[j >> 2] | 0) + 2472 | 0;
   b = k + 16 | 0;
   c[b >> 2] = k;
   c[k >> 2] = 3004;
   Gc(k, g);
   b = c[b >> 2] | 0;
   if ((b | 0) != (k | 0)) {
    if (b) sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
   } else sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
   g = (c[j >> 2] | 0) + 2496 | 0;
   b = k + 16 | 0;
   c[b >> 2] = k;
   c[k >> 2] = 3040;
   Gc(k, g);
   b = c[b >> 2] | 0;
   if ((b | 0) != (k | 0)) {
    if (b) sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
   } else sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
   g = (c[j >> 2] | 0) + 5784 | 0;
   b = k + 16 | 0;
   c[b >> 2] = k;
   c[k >> 2] = 3076;
   c[k + 4 >> 2] = a;
   Gc(k, g);
   b = c[b >> 2] | 0;
   if ((b | 0) != (k | 0)) {
    if (b) sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
   } else sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
   g = (c[j >> 2] | 0) + 6120 | 0;
   b = k + 16 | 0;
   c[b >> 2] = k;
   c[k >> 2] = 3112;
   c[k + 4 >> 2] = a;
   Gc(k, g);
   b = c[b >> 2] | 0;
   if ((b | 0) != (k | 0)) {
    if (b) sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
   } else sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
   g = (c[j >> 2] | 0) + 2688 | 0;
   b = k + 16 | 0;
   c[b >> 2] = k;
   c[k >> 2] = 3148;
   c[k + 4 >> 2] = a;
   Gc(k, g);
   b = c[b >> 2] | 0;
   if ((b | 0) != (k | 0)) {
    if (b) sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b)
   } else sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
   j = (c[j >> 2] | 0) + 3072 | 0;
   b = k + 16 | 0;
   c[b >> 2] = k;
   c[k >> 2] = 3184;
   Gc(k, j);
   b = c[b >> 2] | 0;
   if ((b | 0) == (k | 0)) {
    sb[c[(c[b >> 2] | 0) + 16 >> 2] & 255](b);
    i = l;
    return
   }
   if (!b) {
    i = l;
    return
   }
   sb[c[(c[b >> 2] | 0) + 20 >> 2] & 255](b);
   i = l;
   return
  }

  function wc(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   k = i;
   i = i + 48 | 0;
   j = k + 36 | 0;
   h = k + 24 | 0;
   f = k + 12 | 0;
   g = k;
   if (!(a[d >> 0] & 1)) b = d + 1 | 0;
   else b = c[d + 8 >> 2] | 0;
   b = Si(b, 0, 10) | 0;
   d = C;
   sj(j, 13736, 32);
   c[f >> 2] = 0;
   c[f + 4 >> 2] = 0;
   c[f + 8 >> 2] = 0;
   l = a[j >> 0] | 0;
   m = (l & 1) == 0;
   l = m ? (l & 255) >>> 1 : c[j + 4 >> 2] | 0;
   Gj(f, m ? j + 1 | 0 : c[j + 8 >> 2] | 0, l, l + 1 | 0);
   Dj(f, 13769, 1) | 0;
   Qj(g, b ^ -418311532, d ^ 418311531);
   d = a[g >> 0] | 0;
   b = (d & 1) == 0;
   d = Dj(f, b ? g + 1 | 0 : c[g + 8 >> 2] | 0, b ? (d & 255) >>> 1 : c[g + 4 >> 2] | 0) | 0;
   c[h >> 2] = c[d >> 2];
   c[h + 4 >> 2] = c[d + 4 >> 2];
   c[h + 8 >> 2] = c[d + 8 >> 2];
   c[d >> 2] = 0;
   c[d + 4 >> 2] = 0;
   c[d + 8 >> 2] = 0;
   uj(g);
   uj(f);
   d = a[h >> 0] | 0;
   g = (d & 1) == 0;
   bh(g ? h + 1 | 0 : c[h + 8 >> 2] | 0, g ? (d & 255) >>> 1 : c[h + 4 >> 2] | 0, e);
   uj(h);
   uj(j);
   i = k;
   return
  }

  function xc(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0;
   t = i;
   i = i + 16 | 0;
   r = t;
   c[r >> 2] = 0;
   c[r + 4 >> 2] = 0;
   c[r + 8 >> 2] = 0;
   o = r + 4 | 0;
   s = r + 8 | 0;
   p = r + 12 | 0;
   n = kh(1) | 0;
   j = n + 1 | 0;
   a[n >> 0] = 105;
   c[o >> 2] = n;
   c[s >> 2] = j;
   c[p >> 2] = j;
   j = n;
   k = c[s >> 2] | 0;
   l = k - j | 0;
   m = kh(2) | 0;
   a[m + l >> 0] = 1;
   j = k - j | 0;
   k = m + (l - j) | 0;
   ns(k | 0, n | 0, j | 0) | 0;
   c[o >> 2] = k;
   c[s >> 2] = m + (l + 1);
   c[p >> 2] = m + 2;
   mh(n);
   while (1) {
    k = a[d >> 0] | 0;
    e = c[s >> 2] | 0;
    if ((e | 0) == (c[p >> 2] | 0)) {
     l = c[o >> 2] | 0;
     m = l;
     f = e - m + 1 | 0;
     if ((f | 0) < 0) {
      q = 5;
      break
     }
     n = l;
     e = e - n | 0;
     if (e >>> 0 < 1073741823) {
      e = e << 1;
      e = e >>> 0 < f >>> 0 ? f : e;
      g = c[s >> 2] | 0;
      f = g - n | 0;
      if (!e) {
       j = 0;
       h = 0;
       e = g
      } else q = 9
     } else {
      f = c[s >> 2] | 0;
      e = 2147483647;
      g = f;
      f = f - n | 0;
      q = 9
     }
     if ((q | 0) == 9) {
      q = 0;
      j = e;
      h = kh(e) | 0;
      e = g
     }
     a[h + f >> 0] = k;
     k = e - n | 0;
     n = h + (f - k) | 0;
     ns(n | 0, l | 0, k | 0) | 0;
     c[o >> 2] = n;
     c[s >> 2] = h + (f + 1);
     c[p >> 2] = h + j;
     if (m) mh(m)
    } else {
     a[e >> 0] = k;
     c[s >> 2] = (c[s >> 2] | 0) + 1
    }
    if (!(a[d >> 0] | 0)) break;
    else d = d + 1 | 0
   }
   if ((q | 0) == 5) jh(o);
   e = c[b + 4 >> 2] | 0;
   d = r + 4 | 0;
   if (e) {
    r = c[d >> 2] | 0;
    wf(e, r, (c[s >> 2] | 0) - r | 0)
   }
   d = c[d >> 2] | 0;
   if (!d) {
    i = t;
    return
   }
   if ((c[s >> 2] | 0) != (d | 0)) c[s >> 2] = d;
   mh(d);
   i = t;
   return
  }

  function yc(b) {
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0.0,
    g = 0,
    j = 0,
    k = 0,
    l = 0.0,
    m = 0.0,
    n = 0.0;
   k = i;
   i = i + 16 | 0;
   j = k;
   d = c[b >> 2] | 0;
   f = +h[d + 672 >> 3];
   e = b + 8 | 0;
   if (!(f - +h[e >> 3] > 15.0)) {
    i = k;
    return
   }
   h[e >> 3] = f;
   m = +Cg(d + 576 | 0);
   f = +Dg((c[b >> 2] | 0) + 576 | 0);
   g = c[b >> 2] | 0;
   n = +h[g + 96 >> 3];
   m = m < n ? n : m;
   n = +h[g + 104 >> 3];
   f = f < n ? n : f;
   n = +h[g + 112 >> 3];
   l = +h[g + 120 >> 3];
   c[j >> 2] = 0;
   c[j + 4 >> 2] = 0;
   c[j + 8 >> 2] = 0;
   g = j + 8 | 0;
   d = kh(1) | 0;
   e = d + 1 | 0;
   a[d >> 0] = 16;
   c[j + 4 >> 2] = d;
   c[g >> 2] = e;
   c[j + 12 >> 2] = e;
   Hc(j, ~~(n < m ? n : m));
   Hc(j, ~~(l < f ? l : f));
   Hc(j, c[b + 16 >> 2] | 0);
   e = c[b + 4 >> 2] | 0;
   d = j + 4 | 0;
   if (e) {
    j = c[d >> 2] | 0;
    wf(e, j, (c[g >> 2] | 0) - j | 0)
   }
   d = c[d >> 2] | 0;
   if (!d) {
    i = k;
    return
   }
   if ((c[g >> 2] | 0) != (d | 0)) c[g >> 2] = d;
   mh(d);
   i = k;
   return
  }

  function zc(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0;
   d = a + 4 | 0;
   if (c[d >> 2] | 0) return;
   e = kh(4) | 0;
   uf(e, b);
   a = c[d >> 2] | 0;
   c[d >> 2] = e;
   if (!a) return;
   vf(a);
   mh(a);
   return
  }

  function Ac(a) {
   a = a | 0;
   var b = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0;
   o = i;
   i = i + 32 | 0;
   n = o + 8 | 0;
   l = o + 4 | 0;
   m = o;
   f = a + 4 | 0;
   b = c[f >> 2] | 0;
   if (!b) {
    n = 0;
    i = o;
    return n | 0
   }
   h = n + 4 | 0;
   j = n + 8 | 0;
   k = a + 60 | 0;
   a: while (1) {
    switch (xf(b, l, m) | 0) {
     case 3:
      {
       e = 5;
       break a
      }
     case 4:
      {
       e = 6;
       break a
      }
     case 0:
      {
       b = 0;e = 12;
       break a
      }
     case 2:
      {
       Bc(a);
       break
      }
     case 1:
      {
       b = c[l >> 2] | 0;e = c[m >> 2] | 0;
       if ((e | 0) != 0 ? (c[n >> 2] = b, c[h >> 2] = e, c[j >> 2] = 1, g = c[(c[k >> 2] | 0) + ((d[b >> 0] | 0) * 24 | 0) + 16 >> 2] | 0, (g | 0) != 0) : 0) {
        tb[c[(c[g >> 2] | 0) + 24 >> 2] & 127](g, n);
        b = c[l >> 2] | 0
       }
       kj(b);
       break
      }
     default:
      {}
    }
    b = c[f >> 2] | 0
   }
   if ((e | 0) == 5) {
    mb(1);
    n = 1;
    i = o;
    return n | 0
   } else if ((e | 0) == 6) {
    mb(1);
    n = 1;
    i = o;
    return n | 0
   } else if ((e | 0) == 12) {
    i = o;
    return b | 0
   }
   return 0
  }

  function Bc(b) {
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    j = 0;
   h = i;
   i = i + 32 | 0;
   j = h + 16 | 0;
   g = h;
   c[j >> 2] = 0;
   c[j + 4 >> 2] = 0;
   c[j + 8 >> 2] = 0;
   e = j + 8 | 0;
   d = kh(1) | 0;
   f = d + 1 | 0;
   a[d >> 0] = -2;
   c[j + 4 >> 2] = d;
   c[e >> 2] = f;
   c[j + 12 >> 2] = f;
   Hc(j, 6);
   f = b + 4 | 0;
   d = c[f >> 2] | 0;
   b = j + 4 | 0;
   if (d) {
    j = c[b >> 2] | 0;
    wf(d, j, (c[e >> 2] | 0) - j | 0)
   }
   b = c[b >> 2] | 0;
   if (b) {
    if ((c[e >> 2] | 0) != (b | 0)) c[e >> 2] = b;
    mh(b)
   };
   c[g >> 2] = 0;
   c[g + 4 >> 2] = 0;
   c[g + 8 >> 2] = 0;
   e = g + 8 | 0;
   b = kh(1) | 0;
   d = b + 1 | 0;
   a[b >> 0] = -1;
   c[g + 4 >> 2] = b;
   c[e >> 2] = d;
   c[g + 12 >> 2] = d;
   Hc(g, Ic() | 0);
   d = c[f >> 2] | 0;
   b = g + 4 | 0;
   if (d) {
    j = c[b >> 2] | 0;
    wf(d, j, (c[e >> 2] | 0) - j | 0)
   }
   b = c[b >> 2] | 0;
   if (!b) {
    mb(2);
    i = h;
    return
   }
   if ((c[e >> 2] | 0) != (b | 0)) c[e >> 2] = b;
   mh(b);
   mb(2);
   i = h;
   return
  }

  function Cc(b, e) {
   b = b | 0;
   e = e | 0;
   var f = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0,
    F = 0,
    G = 0,
    H = 0,
    I = 0,
    J = 0,
    K = 0,
    L = 0,
    M = 0,
    N = 0,
    O = 0,
    P = 0,
    S = 0.0,
    T = 0.0,
    U = 0.0,
    V = 0.0;
   P = i;
   i = i + 80 | 0;
   E = P + 64 | 0;
   F = P + 60 | 0;
   K = P + 72 | 0;
   M = P + 48 | 0;
   G = P + 36 | 0;
   L = P + 24 | 0;
   H = P + 12 | 0;
   I = P;
   f = c[b >> 2] | 0;
   h[f + 672 >> 3] = +$a();
   f = b + 33 | 0;
   if (!(a[f >> 0] | 0)) {
    a[f >> 0] = 1;
    f = b + 32 | 0;
    if ((a[f >> 0] | 0) != 0 ? (a[f >> 0] = 0, a[b + 34 >> 0] = 1, a[E >> 0] = 1, j = c[b + 4 >> 2] | 0, (j | 0) != 0) : 0) wf(j, E, 1);
    f = b + 35 | 0;
    if (a[f >> 0] | 0) {
     j = b + 20 | 0;
     Ec(b, j);
     if (!(a[j >> 0] & 1)) {
      a[j + 1 >> 0] = 0;
      a[j >> 0] = 0
     } else {
      a[c[b + 28 >> 2] >> 0] = 0;
      c[b + 24 >> 2] = 0
     }
     a[f >> 0] = 0
    }
   }
   O = e + 8 | 0;
   f = c[O >> 2] | 0;
   D = f + 1 | 0;
   c[O >> 2] = D;
   j = c[e >> 2] | 0;
   v = a[j + f >> 0] | 0;
   f = f + 2 | 0;
   c[O >> 2] = f;
   v = d[j + D >> 0] << 8 | v & 255;
   a: do
    if (!v) f = 0;
    else {
     t = f;
     k = 0;
     f = 0;
     while (1) {
      u = c[b >> 2] | 0;
      p = t + 1 | 0;
      c[O >> 2] = p;
      r = d[j + t >> 0] | 0;
      s = t + 2 | 0;
      c[O >> 2] = s;
      r = d[j + p >> 0] << 8 | r;
      p = t + 3 | 0;
      c[O >> 2] = p;
      s = r | d[j + s >> 0] << 16;
      r = t + 4 | 0;
      c[O >> 2] = r;
      p = s | d[j + p >> 0] << 24;
      s = u + 556 | 0;
      n = c[s >> 2] | 0;
      b: do
       if (n) {
        o = n + -1 | 0;
        m = (o & n | 0) == 0;
        if (m) q = p & o;
        else q = (p >>> 0) % (n >>> 0) | 0;
        l = c[(c[u + 552 >> 2] | 0) + (q << 2) >> 2] | 0;
        if (l) {
         if (m)
          do {
           l = c[l >> 2] | 0;
           if (!l) {
            q = 0;
            break b
           }
           if ((c[l + 4 >> 2] & o | 0) != (q | 0)) {
            q = 0;
            break b
           }
          } while ((c[l + 8 >> 2] | 0) != (p | 0));
         else
          do {
           l = c[l >> 2] | 0;
           if (!l) {
            q = 0;
            break b
           }
           if ((((c[l + 4 >> 2] | 0) >>> 0) % (n >>> 0) | 0 | 0) != (q | 0)) {
            q = 0;
            break b
           }
          } while ((c[l + 8 >> 2] | 0) != (p | 0));
         q = c[l + 12 >> 2] | 0
        } else q = 0
       } else q = 0;
      while (0);
      p = t + 5 | 0;
      c[O >> 2] = p;
      D = d[j + r >> 0] | 0;
      m = t + 6 | 0;
      c[O >> 2] = m;
      D = d[j + p >> 0] << 8 | D;
      p = t + 7 | 0;
      c[O >> 2] = p;
      m = D | d[j + m >> 0] << 16;
      c[O >> 2] = t + 8;
      p = m | d[j + p >> 0] << 24;
      m = c[s >> 2] | 0;
      c: do
       if (m) {
        n = m + -1 | 0;
        l = (n & m | 0) == 0;
        if (l) o = p & n;
        else o = (p >>> 0) % (m >>> 0) | 0;
        j = c[(c[u + 552 >> 2] | 0) + (o << 2) >> 2] | 0;
        if (j) {
         if (l)
          do {
           j = c[j >> 2] | 0;
           if (!j) break c;
           if ((c[j + 4 >> 2] & n | 0) != (o | 0)) break c
          } while ((c[j + 8 >> 2] | 0) != (p | 0));
         else
          do {
           j = c[j >> 2] | 0;
           if (!j) break c;
           if ((((c[j + 4 >> 2] | 0) >>> 0) % (m >>> 0) | 0 | 0) != (o | 0)) break c
          } while ((c[j + 8 >> 2] | 0) != (p | 0));
         m = c[j + 12 >> 2] | 0;
         if (!((q | 0) == 0 | (m | 0) == 0)) {
          j = c[u + 528 >> 2] | 0;
          l = c[u + 532 >> 2] | 0;
          d: do
           if ((j | 0) != (l | 0))
            while (1) {
             if ((c[j >> 2] | 0) == (m | 0)) break d;
             j = j + 4 | 0;
             if ((j | 0) == (l | 0)) {
              j = l;
              break
             }
            }
           while (0);
          U = +g[q + 12 >> 2];
          V = +g[q + 8 >> 2];
          T = +W(+(+g[m + 12 >> 2] - U), +(+g[m + 8 >> 2] - V));
          S = +g[q + 16 >> 2] - +g[m + 16 >> 2] * .5;
          cc(m, V + +Q(+T) * S, U + +R(+T) * S, 5.0);
          Wb(m);
          Kf(c[b >> 2] | 0, q, m);
          f = f | (j | 0) != (l | 0)
         }
        }
       }
      while (0);
      k = k + 1 | 0;
      if ((k | 0) >= (v | 0)) break a;
      t = c[O >> 2] | 0;
      j = c[e >> 2] | 0
     }
    }
   while (0);
   u = K + 1 | 0;
   v = K + 2 | 0;
   w = L + 4 | 0;
   x = M + 4 | 0;
   y = b + 34 | 0;
   z = e + 4 | 0;
   A = L + 1 | 0;
   B = L + 8 | 0;
   C = M + 1 | 0;
   D = M + 8 | 0;
   while (1) {
    k = c[O >> 2] | 0;
    t = k + 1 | 0;
    c[O >> 2] = t;
    m = c[e >> 2] | 0;
    j = d[m + k >> 0] | 0;
    l = k + 2 | 0;
    c[O >> 2] = l;
    j = d[m + t >> 0] << 8 | j;
    t = k + 3 | 0;
    c[O >> 2] = t;
    l = j | d[m + l >> 0] << 16;
    j = k + 4 | 0;
    c[O >> 2] = j;
    t = l | d[m + t >> 0] << 24;
    l = k + 5 | 0;
    c[O >> 2] = l;
    j = a[m + j >> 0] | 0;
    if (!t) break;
    q = k + 6 | 0;
    c[O >> 2] = q;
    r = d[m + l >> 0] << 8 | j & 255;
    p = k + 7 | 0;
    c[O >> 2] = p;
    q = r | d[m + q >> 0] << 16;
    r = k + 8 | 0;
    c[O >> 2] = r;
    p = q | d[m + p >> 0] << 24;
    q = k + 9 | 0;
    c[O >> 2] = q;
    r = d[m + r >> 0] | 0;
    j = k + 10 | 0;
    c[O >> 2] = j;
    r = d[m + q >> 0] << 8 | r;
    q = k + 11 | 0;
    c[O >> 2] = q;
    j = r | d[m + j >> 0] << 16;
    r = k + 12 | 0;
    c[O >> 2] = r;
    q = j | d[m + q >> 0] << 24;
    j = k + 13 | 0;
    c[O >> 2] = j;
    r = a[m + r >> 0] | 0;
    s = k + 14 | 0;
    c[O >> 2] = s;
    r = (d[m + j >> 0] << 8 | r & 255) & 65535;
    j = k + 15 | 0;
    c[O >> 2] = j;
    s = d[m + s >> 0] | 0;
    if (s & 128) {
     j = k + 16 | 0;
     c[O >> 2] = j
    }
    o = (s & 2 | 0) != 0;
    k = (s & 8 | 0) == 0;
    a[K >> 0] = 0;
    a[u >> 0] = 0;
    a[v >> 0] = 0;
    if (o) {
     l = j + 1 | 0;
     c[O >> 2] = l;
     a[K >> 0] = a[m + j >> 0] | 0;
     n = j + 2 | 0;
     c[O >> 2] = n;
     a[u >> 0] = a[m + l >> 0] | 0;
     j = j + 3 | 0;
     c[O >> 2] = j;
     a[v >> 0] = a[m + n >> 0] | 0
    };
    c[M >> 2] = 0;
    c[M + 4 >> 2] = 0;
    c[M + 8 >> 2] = 0;
    if (s & 4) {
     c[G >> 2] = 0;
     c[G + 4 >> 2] = 0;
     c[G + 8 >> 2] = 0;
     if ((j | 0) < (c[z >> 2] | 0)) {
      c[O >> 2] = j + 1;
      j = a[m + j >> 0] | 0;
      e: do
       if (j << 24 >> 24)
        do {
         Cj(G, j);
         j = c[O >> 2] | 0;
         if ((j | 0) >= (c[z >> 2] | 0)) break e;
         n = c[e >> 2] | 0;
         c[O >> 2] = j + 1;
         j = a[n + j >> 0] | 0
        } while (j << 24 >> 24 != 0);
      while (0);
      if (a[M >> 0] & 1) {
       a[c[D >> 2] >> 0] = 0;
       c[x >> 2] = 0
      } else N = 58
     } else N = 58;
     if ((N | 0) == 58) {
      N = 0;
      a[C >> 0] = 0;
      a[M >> 0] = 0
     }
     Aj(M, 0);
     c[M >> 2] = c[G >> 2];
     c[M + 4 >> 2] = c[G + 4 >> 2];
     c[M + 8 >> 2] = c[G + 8 >> 2];
     c[G >> 2] = 0;
     c[G + 4 >> 2] = 0;
     c[G + 8 >> 2] = 0;
     uj(G)
    };
    c[L >> 2] = 0;
    c[L + 4 >> 2] = 0;
    c[L + 8 >> 2] = 0;
    if (!k) {
     c[H >> 2] = 0;
     c[H + 4 >> 2] = 0;
     c[H + 8 >> 2] = 0;
     j = c[O >> 2] | 0;
     if ((j | 0) < (c[z >> 2] | 0)) {
      do {
       c[O >> 2] = j + 1;
       j = a[(c[e >> 2] | 0) + j >> 0] | 0;
       if (!(j << 24 >> 24)) break;
       Cj(H, j);
       j = c[O >> 2] | 0
      } while ((j | 0) < (c[z >> 2] | 0));
      if (a[L >> 0] & 1) {
       a[c[B >> 2] >> 0] = 0;
       c[w >> 2] = 0
      } else N = 66
     } else N = 66;
     if ((N | 0) == 66) {
      N = 0;
      a[A >> 0] = 0;
      a[L >> 0] = 0
     }
     Aj(L, 0);
     c[L >> 2] = c[H >> 2];
     c[L + 4 >> 2] = c[H + 4 >> 2];
     c[L + 8 >> 2] = c[H + 8 >> 2];
     c[H >> 2] = 0;
     c[H + 4 >> 2] = 0;
     c[H + 8 >> 2] = 0;
     uj(H)
    }
    j = c[b >> 2] | 0;
    l = c[j + 556 >> 2] | 0;
    f: do
     if (l) {
      m = l + -1 | 0;
      k = (m & l | 0) == 0;
      if (k) n = m & t;
      else n = (t >>> 0) % (l >>> 0) | 0;
      j = c[(c[j + 552 >> 2] | 0) + (n << 2) >> 2] | 0;
      if (j) {
       if (k)
        do {
         j = c[j >> 2] | 0;
         if (!j) {
          N = 81;
          break f
         }
         if ((c[j + 4 >> 2] & m | 0) != (n | 0)) {
          N = 81;
          break f
         }
        } while ((c[j + 8 >> 2] | 0) != (t | 0));
       else
        do {
         j = c[j >> 2] | 0;
         if (!j) {
          N = 81;
          break f
         }
         if ((((c[j + 4 >> 2] | 0) >>> 0) % (l >>> 0) | 0 | 0) != (n | 0)) {
          N = 81;
          break f
         }
        } while ((c[j + 8 >> 2] | 0) != (t | 0));
       j = c[j + 12 >> 2] | 0;
       if (j) {
        if (!(a[j + 4 >> 0] | 0)) {
         cc(j, +(p | 0), +(q | 0), +(r << 16 >> 16));
         if (o) {
          q = j + 80 | 0;
          a[q >> 0] = a[K >> 0] | 0;
          a[q + 1 >> 0] = a[K + 1 >> 0] | 0;
          a[q + 2 >> 0] = a[K + 2 >> 0] | 0;
          q = j;
          N = 101
         } else {
          q = j;
          N = 101
         }
        }
       } else N = 81
      } else N = 81
     } else N = 81;
    while (0);
    if ((N | 0) == 81) {
     N = 0;
     q = Ub(t, +(p | 0), +(q | 0), +(r << 16 >> 16), K) | 0;
     l = c[b >> 2] | 0;
     c[F >> 2] = q;
     j = l + 544 | 0;
     k = c[j >> 2] | 0;
     if ((k | 0) == (c[l + 548 >> 2] | 0)) gc(l + 540 | 0, F);
     else {
      c[k >> 2] = q;
      c[j >> 2] = (c[j >> 2] | 0) + 4
     }
     o = l + 552 | 0;
     p = c[q >> 2] | 0;
     l = c[l + 556 >> 2] | 0;
     g: do
      if (l) {
       m = l + -1 | 0;
       k = (m & l | 0) == 0;
       if (k) n = m & p;
       else n = (p >>> 0) % (l >>> 0) | 0;
       j = c[(c[o >> 2] | 0) + (n << 2) >> 2] | 0;
       if (j)
        if (k)
         do {
          j = c[j >> 2] | 0;
          if (!j) {
           N = 96;
           break g
          }
          if ((c[j + 4 >> 2] & m | 0) != (n | 0)) {
           N = 96;
           break g
          }
         } while ((c[j + 8 >> 2] | 0) != (p | 0));
        else
         do {
          j = c[j >> 2] | 0;
          if (!j) {
           N = 96;
           break g
          }
          if ((((c[j + 4 >> 2] | 0) >>> 0) % (l >>> 0) | 0 | 0) != (n | 0)) {
           N = 96;
           break g
          }
         } while ((c[j + 8 >> 2] | 0) != (p | 0));
       else N = 96
      } else N = 96;
     while (0);
     if ((N | 0) == 96) {
      j = kh(16) | 0;
      c[j + 8 >> 2] = p;
      c[j + 12 >> 2] = 0;
      Jc(E, o, j);
      j = c[E >> 2] | 0
     }
     c[j + 12 >> 2] = q;
     N = 101
    }
    h: do
     if ((N | 0) == 101) {
      N = 0;
      a[q + 224 >> 0] = s & 1;
      a[q + 225 >> 0] = s >>> 4 & 1;
      j = a[L >> 0] | 0;
      k = c[w >> 2] | 0;
      if (((j & 1) == 0 ? (j & 255) >>> 1 : k) | 0) {
       Kc(q, L);
       j = a[L >> 0] | 0;
       k = c[w >> 2] | 0
      }
      if (!((((j & 1) == 0 ? (j & 255) >>> 1 : k) | 0) == 0 ? (s = a[M >> 0] | 0, (((s & 1) == 0 ? (s & 255) >>> 1 : c[x >> 2] | 0) | 0) == 0) : 0)) N = 105;
      do
       if ((N | 0) == 105) {
        N = 0;
        rj(I, L);
        j = Eg(I) | 0;
        uj(I);
        if (!j) {
         j = Fg(M) | 0;
         if (!j) break
        }
        c[q + 76 >> 2] = j
       }
      while (0);
      n = c[b >> 2] | 0;
      j = c[n + 516 >> 2] | 0;
      k = c[n + 520 >> 2] | 0;
      i: do
       if ((j | 0) != (k | 0))
        while (1) {
         if ((c[j >> 2] | 0) == (t | 0)) break i;
         j = j + 4 | 0;
         if ((j | 0) == (k | 0)) break h
        }
       while (0);
      if ((j | 0) != (k | 0)) {
       j = c[n + 528 >> 2] | 0;
       k = n + 532 | 0;
       l = c[k >> 2] | 0;
       m = (j | 0) == (l | 0);
       j: do
        if (m) {
         J = j;
         N = 115
        } else
         do {
          if ((c[j >> 2] | 0) == (q | 0)) {
           J = j;
           N = 115;
           break j
          }
          j = j + 4 | 0
         } while ((j | 0) != (l | 0));
       while (0);
       if ((N | 0) == 115 ? (N = 0, (J | 0) != (l | 0)) : 0) break;
       c[E >> 2] = q;
       if (m) {
        t = n + 572 | 0;
        s = q + 80 | 0;
        a[t >> 0] = a[s >> 0] | 0;
        a[t + 1 >> 0] = a[s + 1 >> 0] | 0;
        a[t + 2 >> 0] = a[s + 2 >> 0] | 0
       }
       if ((l | 0) == (c[n + 536 >> 2] | 0)) gc(n + 528 | 0, E);
       else {
        c[l >> 2] = q;
        c[k >> 2] = (c[k >> 2] | 0) + 4
       }
       if (m) {
        V = +g[q + 12 >> 2];
        t = c[b >> 2] | 0;
        h[t + 128 >> 3] = 0.0;
        h[t + 136 >> 3] = V;
        h[t + 144 >> 3] = 1.0;
        a[y >> 0] = 0;
        If(c[b >> 2] | 0)
       }
      }
     }
    while (0);
    uj(L);
    uj(M)
   }
   k = k + 6 | 0;
   c[O >> 2] = k;
   r = d[m + l >> 0] << 8 | j & 255;
   k: do
    if (r) {
     l = m;
     q = 0;
     while (1) {
      n = k + 1 | 0;
      c[O >> 2] = n;
      N = d[l + k >> 0] | 0;
      p = k + 2 | 0;
      c[O >> 2] = p;
      N = d[l + n >> 0] << 8 | N;
      n = k + 3 | 0;
      c[O >> 2] = n;
      p = N | d[l + p >> 0] << 16;
      c[O >> 2] = k + 4;
      n = p | d[l + n >> 0] << 24;
      p = c[b >> 2] | 0;
      l = c[p + 556 >> 2] | 0;
      l: do
       if (l) {
        m = l + -1 | 0;
        k = (m & l | 0) == 0;
        if (k) o = m & n;
        else o = (n >>> 0) % (l >>> 0) | 0;
        j = c[(c[p + 552 >> 2] | 0) + (o << 2) >> 2] | 0;
        if (j) {
         if (k)
          do {
           j = c[j >> 2] | 0;
           if (!j) break l;
           if ((c[j + 4 >> 2] & m | 0) != (o | 0)) break l
          } while ((c[j + 8 >> 2] | 0) != (n | 0));
         else
          do {
           j = c[j >> 2] | 0;
           if (!j) break l;
           if ((((c[j + 4 >> 2] | 0) >>> 0) % (l >>> 0) | 0 | 0) != (o | 0)) break l
          } while ((c[j + 8 >> 2] | 0) != (n | 0));
         l = c[j + 12 >> 2] | 0;
         if (l) {
          j = c[p + 528 >> 2] | 0;
          k = c[p + 532 >> 2] | 0;
          m: do
           if ((j | 0) != (k | 0))
            while (1) {
             if ((c[j >> 2] | 0) == (l | 0)) break m;
             j = j + 4 | 0;
             if ((j | 0) == (k | 0)) {
              j = k;
              break
             }
            }
           while (0);
          Wb(l);
          f = f | (j | 0) != (k | 0)
         }
        }
       }
      while (0);
      j = q + 1 | 0;
      if ((j | 0) >= (r | 0)) break k;
      k = c[O >> 2] | 0;
      l = c[e >> 2] | 0;
      q = j
     }
    }
   while (0);
   if (!f) {
    i = P;
    return
   }
   f = c[b >> 2] | 0;
   if ((c[f + 528 >> 2] | 0) != (c[f + 532 >> 2] | 0)) {
    i = P;
    return
   }
   Jf(f);
   i = P;
   return
  }

  function Dc(b) {
   b = b | 0;
   var d = 0,
    e = 0;
   e = i;
   i = i + 16 | 0;
   d = e;
   if (!(a[b + 33 >> 0] | 0)) {
    a[b + 32 >> 0] = 1;
    i = e;
    return
   }
   a[b + 34 >> 0] = 1;
   a[d >> 0] = 1;
   b = c[b + 4 >> 2] | 0;
   if (b) wf(b, d, 1);
   i = e;
   return
  }

  function Ec(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    j = 0;
   g = i;
   i = i + 16 | 0;
   e = g;
   if (!(a[b + 33 >> 0] | 0)) {
    vj(b + 20 | 0, d) | 0;
    a[b + 35 >> 0] = 1;
    i = g;
    return
   };
   c[e >> 2] = 0;
   c[e + 4 >> 2] = 0;
   c[e + 8 >> 2] = 0;
   f = e + 8 | 0;
   j = kh(1) | 0;
   h = j + 1 | 0;
   a[j >> 0] = 0;
   c[e + 4 >> 2] = j;
   c[f >> 2] = h;
   c[e + 12 >> 2] = h;
   Lc(e, d);
   b = c[b + 4 >> 2] | 0;
   d = e + 4 | 0;
   if (b) {
    j = c[d >> 2] | 0;
    wf(b, j, (c[f >> 2] | 0) - j | 0)
   }
   d = c[d >> 2] | 0;
   if (!d) {
    i = g;
    return
   }
   if ((c[f >> 2] | 0) != (d | 0)) c[f >> 2] = d;
   mh(d);
   i = g;
   return
  }

  function Fc(a, b) {
   a = a | 0;
   b = b | 0;
   return
  }

  function Gc(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0;
   l = i;
   i = i + 16 | 0;
   k = l;
   e = a + 16 | 0;
   f = c[e >> 2] | 0;
   d = f;
   g = b + 16 | 0;
   h = c[g >> 2] | 0;
   j = (h | 0) == (b | 0);
   if ((f | 0) == (a | 0)) {
    d = c[(c[f >> 2] | 0) + 12 >> 2] | 0;
    if (j) {
     tb[d & 127](f, k);
     j = c[e >> 2] | 0;
     sb[c[(c[j >> 2] | 0) + 16 >> 2] & 255](j);
     c[e >> 2] = 0;
     j = c[g >> 2] | 0;
     tb[c[(c[j >> 2] | 0) + 12 >> 2] & 127](j, f);
     j = c[g >> 2] | 0;
     sb[c[(c[j >> 2] | 0) + 16 >> 2] & 255](j);
     c[g >> 2] = 0;
     c[e >> 2] = a;
     tb[c[(c[k >> 2] | 0) + 12 >> 2] & 127](k, h);
     sb[c[(c[k >> 2] | 0) + 16 >> 2] & 255](k);
     c[g >> 2] = b;
     i = l;
     return
    } else {
     tb[d & 127](f, b);
     a = c[e >> 2] | 0;
     sb[c[(c[a >> 2] | 0) + 16 >> 2] & 255](a);
     a = b + 16 | 0;
     c[e >> 2] = c[a >> 2];
     c[a >> 2] = b;
     i = l;
     return
    }
   } else if (j) {
    tb[c[(c[b >> 2] | 0) + 12 >> 2] & 127](b, a);
    k = c[g >> 2] | 0;
    sb[c[(c[k >> 2] | 0) + 16 >> 2] & 255](k);
    c[g >> 2] = c[e >> 2];
    c[e >> 2] = a;
    i = l;
    return
   } else {
    c[e >> 2] = h;
    c[g >> 2] = d;
    i = l;
    return
   }
  }

  function Hc(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0;
   n = b + 4 | 0;
   j = d & 255;
   o = b + 8 | 0;
   e = c[o >> 2] | 0;
   m = b + 12 | 0;
   b = c[m >> 2] | 0;
   if (e >>> 0 >= b >>> 0) {
    l = c[n >> 2] | 0;
    k = l;
    e = e - k + 1 | 0;
    if ((e | 0) < 0) jh(n);
    i = l;
    b = b - i | 0;
    if (b >>> 0 < 1073741823) {
     b = b << 1;
     b = b >>> 0 < e >>> 0 ? e : b;
     f = c[o >> 2] | 0;
     e = f - i | 0;
     if (!b) {
      h = 0;
      g = 0
     } else p = 8
    } else {
     e = c[o >> 2] | 0;
     b = 2147483647;
     f = e;
     e = e - i | 0;
     p = 8
    }
    if ((p | 0) == 8) {
     h = b;
     g = kh(b) | 0
    }
    a[g + e >> 0] = j;
    b = g + (e + 1) | 0;
    i = f - i | 0;
    j = g + (e - i) | 0;
    ns(j | 0, l | 0, i | 0) | 0;
    c[n >> 2] = j;
    c[o >> 2] = b;
    c[m >> 2] = g + h;
    if (k) {
     mh(k);
     b = c[o >> 2] | 0
    }
   } else {
    a[e >> 0] = j;
    b = (c[o >> 2] | 0) + 1 | 0;
    c[o >> 2] = b
   }
   i = d >>> 8 & 255;
   e = c[m >> 2] | 0;
   if (b >>> 0 >= e >>> 0) {
    k = c[n >> 2] | 0;
    l = k;
    f = b - l + 1 | 0;
    if ((f | 0) < 0) jh(n);
    j = k;
    b = e - j | 0;
    if (b >>> 0 < 1073741823) {
     b = b << 1;
     b = b >>> 0 < f >>> 0 ? f : b;
     f = c[o >> 2] | 0;
     e = f - j | 0;
     if (!b) {
      h = 0;
      g = 0
     } else p = 18
    } else {
     e = c[o >> 2] | 0;
     b = 2147483647;
     f = e;
     e = e - j | 0;
     p = 18
    }
    if ((p | 0) == 18) {
     h = b;
     g = kh(b) | 0
    }
    a[g + e >> 0] = i;
    b = g + (e + 1) | 0;
    i = f - j | 0;
    j = g + (e - i) | 0;
    ns(j | 0, k | 0, i | 0) | 0;
    c[n >> 2] = j;
    c[o >> 2] = b;
    c[m >> 2] = g + h;
    if (l) {
     mh(l);
     b = c[o >> 2] | 0
    }
   } else {
    a[b >> 0] = i;
    b = (c[o >> 2] | 0) + 1 | 0;
    c[o >> 2] = b
   }
   j = d >>> 16 & 255;
   e = c[m >> 2] | 0;
   if (b >>> 0 >= e >>> 0) {
    k = c[n >> 2] | 0;
    l = k;
    f = b - l + 1 | 0;
    if ((f | 0) < 0) jh(n);
    i = k;
    b = e - i | 0;
    if (b >>> 0 < 1073741823) {
     b = b << 1;
     b = b >>> 0 < f >>> 0 ? f : b;
     e = c[o >> 2] | 0;
     f = e - i | 0;
     if (!b) {
      h = 0;
      g = 0
     } else p = 28
    } else {
     f = c[o >> 2] | 0;
     b = 2147483647;
     e = f;
     f = f - i | 0;
     p = 28
    }
    if ((p | 0) == 28) {
     h = b;
     g = kh(b) | 0
    }
    a[g + f >> 0] = j;
    b = g + (f + 1) | 0;
    i = e - i | 0;
    j = g + (f - i) | 0;
    ns(j | 0, k | 0, i | 0) | 0;
    c[n >> 2] = j;
    c[o >> 2] = b;
    c[m >> 2] = g + h;
    if (l) {
     mh(l);
     b = c[o >> 2] | 0
    }
   } else {
    a[b >> 0] = j;
    b = (c[o >> 2] | 0) + 1 | 0;
    c[o >> 2] = b
   }
   j = d >>> 24 & 255;
   e = c[m >> 2] | 0;
   if (b >>> 0 < e >>> 0) {
    a[b >> 0] = j;
    c[o >> 2] = (c[o >> 2] | 0) + 1;
    return
   }
   k = c[n >> 2] | 0;
   l = k;
   f = b - l + 1 | 0;
   if ((f | 0) < 0) jh(n);
   i = k;
   b = e - i | 0;
   if (b >>> 0 < 1073741823) {
    b = b << 1;
    b = b >>> 0 < f >>> 0 ? f : b;
    f = c[o >> 2] | 0;
    e = f - i | 0;
    if (!b) {
     h = 0;
     g = 0;
     b = f
    } else p = 38
   } else {
    e = c[o >> 2] | 0;
    b = 2147483647;
    f = e;
    e = e - i | 0;
    p = 38
   }
   if ((p | 0) == 38) {
    h = b;
    g = kh(b) | 0;
    b = f
   }
   a[g + e >> 0] = j;
   d = b - i | 0;
   p = g + (e - d) | 0;
   ns(p | 0, k | 0, d | 0) | 0;
   c[n >> 2] = p;
   c[o >> 2] = g + (e + 1);
   c[m >> 2] = g + h;
   if (!l) return;
   mh(l);
   return
  }

  function Ic() {
   var a = 0,
    b = 0,
    d = 0;
   d = i;
   i = i + 16 | 0;
   b = d;
   c[b >> 2] = -1572214434;
   a = Oc() | 0;
   i = d;
   return c[b >> 2] ^ a | 0
  }

  function Jc(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    h = 0,
    i = 0,
    j = 0.0,
    k = 0.0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0;
   m = c[e + 8 >> 2] | 0;
   q = e + 4 | 0;
   c[q >> 2] = m;
   o = d + 4 | 0;
   p = c[o >> 2] | 0;
   n = (p | 0) == 0;
   a: do
    if (!n) {
     l = p + -1 | 0;
     i = (l & p | 0) == 0;
     if (i) h = l & m;
     else h = (m >>> 0) % (p >>> 0) | 0;
     f = c[(c[d >> 2] | 0) + (h << 2) >> 2] | 0;
     if (f)
      if (i) {
       while (1) {
        f = c[f >> 2] | 0;
        if (!f) break a;
        if ((c[f + 4 >> 2] & l | 0) != (h | 0)) break a;
        if ((c[f + 8 >> 2] | 0) == (m | 0)) {
         h = 0;
         break
        }
       }
       d = f;
       c[b >> 2] = d;
       b = b + 4 | 0;
       a[b >> 0] = h;
       return
      } else {
       while (1) {
        f = c[f >> 2] | 0;
        if (!f) break a;
        if ((((c[f + 4 >> 2] | 0) >>> 0) % (p >>> 0) | 0 | 0) != (h | 0)) break a;
        if ((c[f + 8 >> 2] | 0) == (m | 0)) {
         h = 0;
         break
        }
       }
       d = f;
       c[b >> 2] = d;
       b = b + 4 | 0;
       a[b >> 0] = h;
       return
      }
    } else h = 0;
   while (0);
   m = d + 12 | 0;
   j = +(((c[m >> 2] | 0) + 1 | 0) >>> 0);
   k = +g[d + 16 >> 2];
   do
    if (n | j > +(p >>> 0) * k) {
     if (p >>> 0 > 2) f = (p + -1 & p | 0) == 0;
     else f = 0;
     i = (f & 1 | p << 1) ^ 1;
     f = ~~+Z(+(j / k)) >>> 0;
     Mc(d, i >>> 0 < f >>> 0 ? f : i);
     i = c[o >> 2] | 0;
     f = c[q >> 2] | 0;
     h = i + -1 | 0;
     if (!(h & i)) {
      l = i;
      h = h & f;
      break
     } else {
      l = i;
      h = (f >>> 0) % (i >>> 0) | 0;
      break
     }
    } else l = p;
   while (0);
   f = c[(c[d >> 2] | 0) + (h << 2) >> 2] | 0;
   if (!f) {
    f = d + 8 | 0;
    c[e >> 2] = c[f >> 2];
    c[f >> 2] = e;
    c[(c[d >> 2] | 0) + (h << 2) >> 2] = f;
    f = c[e >> 2] | 0;
    if (f) {
     f = c[f + 4 >> 2] | 0;
     h = l + -1 | 0;
     if (!(h & l)) f = f & h;
     else f = (f >>> 0) % (l >>> 0) | 0;
     c[(c[d >> 2] | 0) + (f << 2) >> 2] = e
    }
   } else {
    c[e >> 2] = c[f >> 2];
    c[f >> 2] = e
   }
   c[m >> 2] = (c[m >> 2] | 0) + 1;
   d = 1;
   c[b >> 2] = e;
   b = b + 4 | 0;
   a[b >> 0] = d;
   return
  }

  function Kc(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0;
   vj(b + 84 | 0, d) | 0;
   i = b + 100 | 0;
   h = a[d >> 0] | 0;
   g = (h & 1) == 0;
   h = g ? (h & 255) >>> 1 : c[d + 4 >> 2] | 0;
   f = a[i >> 0] | 0;
   e = (f & 1) == 0;
   a: do
    if ((h | 0) == ((e ? (f & 255) >>> 1 : c[b + 104 >> 2] | 0) | 0)) {
     f = g ? d + 1 | 0 : c[d + 8 >> 2] | 0;
     e = e ? i + 1 | 0 : c[b + 108 >> 2] | 0;
     if (!g) {
      if (Vi(f, e, h) | 0) break;
      return
     }
     if (!h) return;
     while (1) {
      if ((a[f >> 0] | 0) != (a[e >> 0] | 0)) break a;
      h = h + -1 | 0;
      if (!h) break;
      else {
       f = f + 1 | 0;
       e = e + 1 | 0
      }
     }
     return
    }
   while (0);
   a[b + 143 >> 0] = 1;
   vj(i, d) | 0;
   return
  }

  function Lc(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0;
   m = a[d >> 0] | 0;
   n = (m & 1) == 0;
   e = n ? d + 1 | 0 : c[d + 8 >> 2] | 0;
   m = n ? (m & 255) >>> 1 : c[d + 4 >> 2] | 0;
   n = e + m | 0;
   o = b + 4 | 0;
   p = b + 8 | 0;
   q = b + 12 | 0;
   a: do
    if (m) {
     b: while (1) {
      j = a[e >> 0] | 0;
      do
       if (j << 24 >> 24) {
        d = c[p >> 2] | 0;
        if ((d | 0) != (c[q >> 2] | 0)) {
         a[d >> 0] = j;
         c[p >> 2] = (c[p >> 2] | 0) + 1;
         break
        }
        k = c[o >> 2] | 0;
        l = k;
        f = d - l + 1 | 0;
        if ((f | 0) < 0) break b;
        m = k;
        d = d - m | 0;
        if (d >>> 0 < 1073741823) {
         d = d << 1;
         d = d >>> 0 < f >>> 0 ? f : d;
         g = c[p >> 2] | 0;
         f = g - m | 0;
         if (!d) {
          i = 0;
          h = 0;
          d = g
         } else r = 11
        } else {
         f = c[p >> 2] | 0;
         d = 2147483647;
         g = f;
         f = f - m | 0;
         r = 11
        }
        if ((r | 0) == 11) {
         r = 0;
         i = d;
         h = kh(d) | 0;
         d = g
        }
        a[h + f >> 0] = j;
        j = d - m | 0;
        m = h + (f - j) | 0;
        ns(m | 0, k | 0, j | 0) | 0;
        c[o >> 2] = m;
        c[p >> 2] = h + (f + 1);
        c[q >> 2] = h + i;
        if (l) mh(l)
       }
      while (0);
      e = e + 1 | 0;
      if ((e | 0) == (n | 0)) break a
     }
     jh(o)
    }
   while (0);
   d = c[p >> 2] | 0;
   if ((d | 0) != (c[q >> 2] | 0)) {
    a[d >> 0] = 0;
    c[p >> 2] = (c[p >> 2] | 0) + 1;
    return
   }
   i = c[b + 4 >> 2] | 0;
   j = i;
   e = d - j + 1 | 0;
   if ((e | 0) < 0) jh(o);
   k = i;
   d = d - k | 0;
   if (d >>> 0 < 1073741823) {
    d = d << 1;
    d = d >>> 0 < e >>> 0 ? e : d;
    f = c[p >> 2] | 0;
    e = f - k | 0;
    if (!d) {
     h = 0;
     g = 0;
     d = f
    } else r = 22
   } else {
    e = c[p >> 2] | 0;
    d = 2147483647;
    f = e;
    e = e - k | 0;
    r = 22
   }
   if ((r | 0) == 22) {
    h = d;
    g = kh(d) | 0;
    d = f
   }
   a[g + e >> 0] = 0;
   b = d - k | 0;
   r = g + (e - b) | 0;
   ns(r | 0, i | 0, b | 0) | 0;
   c[o >> 2] = r;
   c[p >> 2] = g + (e + 1);
   c[q >> 2] = g + h;
   if (!j) return;
   mh(j);
   return
  }

  function Mc(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0;
   if ((b | 0) != 1) {
    if (b + -1 & b) b = pj(b) | 0
   } else b = 2;
   f = c[a + 4 >> 2] | 0;
   if (b >>> 0 > f >>> 0) {
    Nc(a, b);
    return
   }
   if (b >>> 0 >= f >>> 0) return;
   if (f >>> 0 > 2) e = (f + -1 & f | 0) == 0;
   else e = 0;
   d = ~~+Z(+(+((c[a + 12 >> 2] | 0) >>> 0) / +g[a + 16 >> 2])) >>> 0;
   if (e) d = 1 << 32 - (aa(d + -1 | 0) | 0);
   else d = pj(d) | 0;
   b = b >>> 0 < d >>> 0 ? d : b;
   if (b >>> 0 >= f >>> 0) return;
   Nc(a, b);
   return
  }

  function Nc(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   e = a + 4 | 0;
   if (!b) {
    d = c[a >> 2] | 0;
    c[a >> 2] = 0;
    if (d) mh(d);
    c[e >> 2] = 0;
    return
   }
   m = kh(b << 2) | 0;
   d = c[a >> 2] | 0;
   c[a >> 2] = m;
   if (d) mh(d);
   c[e >> 2] = b;
   d = 0;
   do {
    c[(c[a >> 2] | 0) + (d << 2) >> 2] = 0;
    d = d + 1 | 0
   } while ((d | 0) != (b | 0));
   e = a + 8 | 0;
   g = c[e >> 2] | 0;
   if (!g) return;
   d = c[g + 4 >> 2] | 0;
   l = b + -1 | 0;
   m = (l & b | 0) == 0;
   if (m) f = d & l;
   else f = (d >>> 0) % (b >>> 0) | 0;
   c[(c[a >> 2] | 0) + (f << 2) >> 2] = e;
   d = c[g >> 2] | 0;
   if (!d) return;
   else {
    h = g;
    e = g
   }
   a: while (1) {
    j = h;
    k = e;
    b: while (1) {
     c: do
      if (m)
       while (1) {
        i = c[d + 4 >> 2] & l;
        if ((i | 0) == (f | 0)) {
         e = d;
         break c
        }
        e = (c[a >> 2] | 0) + (i << 2) | 0;
        if (!(c[e >> 2] | 0)) {
         f = i;
         g = d;
         d = k;
         break b
        }
        h = d + 8 | 0;
        e = d;
        while (1) {
         g = c[e >> 2] | 0;
         if (!g) break;
         if ((c[h >> 2] | 0) == (c[g + 8 >> 2] | 0)) e = g;
         else break
        }
        c[k >> 2] = g;
        c[e >> 2] = c[c[(c[a >> 2] | 0) + (i << 2) >> 2] >> 2];
        c[c[(c[a >> 2] | 0) + (i << 2) >> 2] >> 2] = d;
        d = c[j >> 2] | 0;
        if (!d) {
         d = 30;
         break a
        }
       } else
        while (1) {
         i = ((c[d + 4 >> 2] | 0) >>> 0) % (b >>> 0) | 0;
         if ((i | 0) == (f | 0)) {
          e = d;
          break c
         }
         e = (c[a >> 2] | 0) + (i << 2) | 0;
         if (!(c[e >> 2] | 0)) {
          f = i;
          g = d;
          d = k;
          break b
         }
         h = d + 8 | 0;
         e = d;
         while (1) {
          g = c[e >> 2] | 0;
          if (!g) break;
          if ((c[h >> 2] | 0) == (c[g + 8 >> 2] | 0)) e = g;
          else break
         }
         c[k >> 2] = g;
         c[e >> 2] = c[c[(c[a >> 2] | 0) + (i << 2) >> 2] >> 2];
         c[c[(c[a >> 2] | 0) + (i << 2) >> 2] >> 2] = d;
         d = c[j >> 2] | 0;
         if (!d) {
          d = 30;
          break a
         }
        }
      while (0);d = c[e >> 2] | 0;
     if (!d) {
      d = 30;
      break a
     } else {
      j = e;
      k = e
     }
    }
    c[e >> 2] = d;
    d = c[g >> 2] | 0;
    if (!d) {
     d = 30;
     break
    } else {
     h = g;
     e = g
    }
   }
   if ((d | 0) == 30) return
  }

  function Oc() {
   var a = 0,
    b = 0,
    d = 0;
   d = i;
   i = i + 16 | 0;
   b = d;
   c[b >> 2] = 434438708;
   a = Pc() | 0;
   i = d;
   return c[b >> 2] ^ a | 0
  }

  function Pc() {
   var a = 0,
    b = 0,
    d = 0;
   d = i;
   i = i + 16 | 0;
   b = d;
   c[b >> 2] = 358201327;
   a = Qc() | 0;
   i = d;
   return c[b >> 2] ^ a | 0
  }

  function Qc() {
   var a = 0,
    b = 0,
    d = 0;
   d = i;
   i = i + 16 | 0;
   b = d;
   c[b >> 2] = 69763106;
   a = Rc() | 0;
   i = d;
   return c[b >> 2] ^ a | 0
  }

  function Rc() {
   var a = 0,
    b = 0,
    d = 0;
   d = i;
   i = i + 16 | 0;
   b = d;
   c[b >> 2] = -149128412;
   a = Sc() | 0;
   i = d;
   return c[b >> 2] ^ a | 0
  }

  function Sc() {
   var a = 0,
    b = 0,
    d = 0;
   d = i;
   i = i + 16 | 0;
   b = d;
   c[b >> 2] = -2043178416;
   a = Tc() | 0;
   i = d;
   return c[b >> 2] ^ a | 0
  }

  function Tc() {
   var a = 0,
    b = 0,
    d = 0;
   d = i;
   i = i + 16 | 0;
   b = d;
   c[b >> 2] = -1570315271;
   a = Uc() | 0;
   i = d;
   return c[b >> 2] ^ a | 0
  }

  function Uc() {
   var a = 0,
    b = 0,
    d = 0;
   d = i;
   i = i + 16 | 0;
   b = d;
   c[b >> 2] = -98893391;
   a = Vc() | 0;
   i = d;
   return c[b >> 2] ^ a | 0
  }

  function Vc() {
   var a = 0,
    b = 0,
    d = 0;
   d = i;
   i = i + 16 | 0;
   b = d;
   c[b >> 2] = 1397265867;
   a = Wc() | 0;
   i = d;
   return c[b >> 2] ^ a | 0
  }

  function Wc() {
   var a = 0,
    b = 0,
    d = 0;
   d = i;
   i = i + 16 | 0;
   b = d;
   c[b >> 2] = -250404039;
   a = Xc() | 0;
   i = d;
   return c[b >> 2] ^ a | 0
  }

  function Xc() {
   var a = 0,
    b = 0,
    d = 0;
   d = i;
   i = i + 16 | 0;
   b = d;
   c[b >> 2] = 603949436;
   a = Yc() | 0;
   i = d;
   return c[b >> 2] ^ a | 0
  }

  function Yc() {
   var a = 0,
    b = 0;
   b = i;
   i = i + 16 | 0;
   a = b;
   c[a >> 2] = -489264269;
   i = b;
   return c[a >> 2] ^ 132682226 | 0
  }

  function Zc(a) {
   a = a | 0;
   return
  }

  function _c(a) {
   a = a | 0;
   mh(a);
   return
  }

  function $c(a) {
   a = a | 0;
   a = kh(8) | 0;
   c[a >> 2] = 3184;
   return a | 0
  }

  function ad(a, b) {
   a = a | 0;
   b = b | 0;
   c[b >> 2] = 3184;
   return
  }

  function bd(a) {
   a = a | 0;
   return
  }

  function cd(a) {
   a = a | 0;
   mh(a);
   return
  }

  function dd(a, b) {
   a = a | 0;
   b = b | 0;
   mb(3);
   return
  }

  function ed(a) {
   a = a | 0;
   mh(a);
   return
  }

  function fd(a) {
   a = a | 0;
   var b = 0;
   b = kh(8) | 0;
   c[b >> 2] = 3148;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return b | 0
  }

  function gd(a, b) {
   a = a | 0;
   b = b | 0;
   c[b >> 2] = 3148;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return
  }

  function hd(a) {
   a = a | 0;
   return
  }

  function id(a) {
   a = a | 0;
   mh(a);
   return
  }

  function jd(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0;
   v = i;
   i = i + 64 | 0;
   u = v + 28 | 0;
   r = v + 40 | 0;
   g = v + 16 | 0;
   t = v;
   q = c[b + 4 >> 2] | 0;
   c[u >> 2] = 0;
   c[u + 4 >> 2] = 0;
   c[u + 8 >> 2] = 0;
   e = d + 8 | 0;
   b = c[e >> 2] | 0;
   f = d + 4 | 0;
   a: do
    if ((b | 0) < (c[f >> 2] | 0))
     do {
      c[e >> 2] = b + 1;
      b = a[(c[d >> 2] | 0) + b >> 0] | 0;
      if (!(b << 24 >> 24)) break a;
      Cj(u, b);
      b = c[e >> 2] | 0
     } while ((b | 0) < (c[f >> 2] | 0));
   while (0);
   rj(g, u);
   wc(0, g, r);
   uj(g);
   n = t;
   c[n >> 2] = 0;
   c[n + 4 >> 2] = 0;
   n = t + 4 | 0;
   p = t + 8 | 0;
   o = t + 12 | 0;
   b = kh(1) | 0;
   g = b + 1 | 0;
   e = g;
   a[b >> 0] = 113;
   c[n >> 2] = b;
   c[p >> 2] = e;
   c[o >> 2] = e;
   e = g;
   b = 0;
   while (1) {
    m = r + b | 0;
    if ((e | 0) == (g | 0)) {
     j = c[n >> 2] | 0;
     k = j;
     f = g - k + 1 | 0;
     if ((f | 0) < 0) {
      s = 9;
      break
     }
     l = j;
     e = g - l | 0;
     if (e >>> 0 < 1073741823) {
      e = e << 1;
      e = e >>> 0 < f >>> 0 ? f : e;
      g = c[p >> 2] | 0;
      f = g - l | 0;
      if (!e) {
       h = 0;
       d = 0;
       e = g
      } else s = 13
     } else {
      f = c[p >> 2] | 0;
      e = 2147483647;
      g = f;
      f = f - l | 0;
      s = 13
     }
     if ((s | 0) == 13) {
      s = 0;
      h = e;
      d = kh(e) | 0;
      e = g
     }
     a[d + f >> 0] = a[m >> 0] | 0;
     l = e - l | 0;
     m = d + (f - l) | 0;
     ns(m | 0, j | 0, l | 0) | 0;
     c[n >> 2] = m;
     c[p >> 2] = d + (f + 1);
     c[o >> 2] = d + h;
     if (k) mh(k)
    } else {
     a[e >> 0] = a[m >> 0] | 0;
     c[p >> 2] = (c[p >> 2] | 0) + 1
    }
    b = b + 1 | 0;
    if ((b | 0) == 20) break;
    e = c[p >> 2] | 0;
    g = c[o >> 2] | 0
   }
   if ((s | 0) == 9) jh(n);
   e = c[q + 4 >> 2] | 0;
   b = t + 4 | 0;
   if (e) {
    t = c[b >> 2] | 0;
    wf(e, t, (c[p >> 2] | 0) - t | 0)
   }
   b = c[b >> 2] | 0;
   if (!b) {
    uj(u);
    i = v;
    return
   }
   if ((c[p >> 2] | 0) != (b | 0)) c[p >> 2] = b;
   mh(b);
   uj(u);
   i = v;
   return
  }

  function kd(a) {
   a = a | 0;
   mh(a);
   return
  }

  function ld(a) {
   a = a | 0;
   var b = 0;
   b = kh(8) | 0;
   c[b >> 2] = 3112;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return b | 0
  }

  function md(a, b) {
   a = a | 0;
   b = b | 0;
   c[b >> 2] = 3112;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return
  }

  function nd(a) {
   a = a | 0;
   return
  }

  function od(a) {
   a = a | 0;
   mh(a);
   return
  }

  function pd(a, b) {
   a = a | 0;
   b = b | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0;
   j = i;
   i = i + 16 | 0;
   h = j;
   e = c[a + 4 >> 2] | 0;
   m = b + 8 | 0;
   k = c[m >> 2] | 0;
   a = k + 1 | 0;
   c[m >> 2] = a;
   l = c[b >> 2] | 0;
   n = d[l + k >> 0] | 0;
   f = k + 2 | 0;
   c[m >> 2] = f;
   n = (d[l + a >> 0] | 0) << 8 | n;
   a = k + 3 | 0;
   c[m >> 2] = a;
   f = n | (d[l + f >> 0] | 0) << 16;
   k = k + 4 | 0;
   c[m >> 2] = k;
   a = f | (d[l + a >> 0] | 0) << 24;
   f = lh(a) | 0;
   a = Tf(l + k | 0, f, (c[b + 4 >> 2] | 0) - k | 0, a) | 0;
   if ((a | 0) < 0) {
    nh(f);
    i = j;
    return
   }
   if ((a | 0) != 0 ? (c[h >> 2] = f, c[h + 4 >> 2] = a, c[h + 8 >> 2] = 1, g = c[(c[e + 60 >> 2] | 0) + ((d[f >> 0] | 0) * 24 | 0) + 16 >> 2] | 0, (g | 0) != 0) : 0) tb[c[(c[g >> 2] | 0) + 24 >> 2] & 127](g, h);
   nh(f);
   i = j;
   return
  }

  function qd(a) {
   a = a | 0;
   mh(a);
   return
  }

  function rd(a) {
   a = a | 0;
   var b = 0;
   b = kh(8) | 0;
   c[b >> 2] = 3076;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return b | 0
  }

  function sd(a, b) {
   a = a | 0;
   b = b | 0;
   c[b >> 2] = 3076;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return
  }

  function td(a) {
   a = a | 0;
   return
  }

  function ud(a) {
   a = a | 0;
   mh(a);
   return
  }

  function vd(a, b) {
   a = a | 0;
   b = b | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0;
   a = c[a + 4 >> 2] | 0;
   g = b + 8 | 0;
   h = c[g >> 2] | 0;
   j = h + 1 | 0;
   c[g >> 2] = j;
   e = c[b >> 2] | 0;
   i = d[e + h >> 0] | 0;
   f = h + 2 | 0;
   c[g >> 2] = f;
   i = (d[e + j >> 0] | 0) << 8 | i;
   b = h + 3 | 0;
   c[g >> 2] = b;
   f = i | (d[e + f >> 0] | 0) << 16;
   c[g >> 2] = h + 4;
   c[a + 16 >> 2] = f | (d[e + b >> 0] | 0) << 24;
   return
  }

  function wd(a) {
   a = a | 0;
   mh(a);
   return
  }

  function xd(a) {
   a = a | 0;
   a = kh(8) | 0;
   c[a >> 2] = 3040;
   return a | 0
  }

  function yd(a, b) {
   a = a | 0;
   b = b | 0;
   c[b >> 2] = 3040;
   return
  }

  function zd(a) {
   a = a | 0;
   return
  }

  function Ad(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Bd(a, b) {
   a = a | 0;
   b = b | 0;
   mb(4);
   return
  }

  function Cd(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Dd(a) {
   a = a | 0;
   a = kh(8) | 0;
   c[a >> 2] = 3004;
   return a | 0
  }

  function Ed(a, b) {
   a = a | 0;
   b = b | 0;
   c[b >> 2] = 3004;
   return
  }

  function Fd(a) {
   a = a | 0;
   return
  }

  function Gd(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Hd(a, b) {
   a = a | 0;
   b = b | 0;
   return
  }

  function Id(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Jd(a) {
   a = a | 0;
   a = kh(8) | 0;
   c[a >> 2] = 2968;
   return a | 0
  }

  function Kd(a, b) {
   a = a | 0;
   b = b | 0;
   c[b >> 2] = 2968;
   return
  }

  function Ld(a) {
   a = a | 0;
   return
  }

  function Md(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Nd(a, b) {
   a = a | 0;
   b = b | 0;
   a = c[b + 8 >> 2] | 0;
   kb(5, (c[b >> 2] | 0) + a | 0, (c[b + 4 >> 2] | 0) - a | 0) | 0;
   return
  }

  function Od(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Pd(a) {
   a = a | 0;
   var b = 0;
   b = kh(8) | 0;
   c[b >> 2] = 2932;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return b | 0
  }

  function Qd(a, b) {
   a = a | 0;
   b = b | 0;
   c[b >> 2] = 2932;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return
  }

  function Rd(a) {
   a = a | 0;
   return
  }

  function Sd(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Td(b, e) {
   b = b | 0;
   e = e | 0;
   var f = 0,
    g = 0.0,
    j = 0.0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0.0,
    r = 0.0,
    s = 0.0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    D = 0,
    E = 0;
   p = i;
   i = i + 16 | 0;
   o = p;
   m = c[b + 4 >> 2] | 0;
   n = e + 8 | 0;
   D = c[n >> 2] | 0;
   l = D + 1 | 0;
   c[n >> 2] = l;
   w = c[e >> 2] | 0;
   t = d[w + D >> 0] | 0;
   E = D + 2 | 0;
   c[n >> 2] = E;
   l = os(d[w + l >> 0] | 0 | 0, 0, 8) | 0;
   f = C;
   v = D + 3 | 0;
   c[n >> 2] = v;
   E = os(d[w + E >> 0] | 0 | 0, 0, 16) | 0;
   f = f | C;
   y = D + 4 | 0;
   c[n >> 2] = y;
   v = os(d[w + v >> 0] | 0 | 0, 0, 24) | 0;
   f = f | C;
   z = D + 5 | 0;
   c[n >> 2] = z;
   y = d[w + y >> 0] | 0;
   x = D + 6 | 0;
   c[n >> 2] = x;
   z = os(d[w + z >> 0] | 0 | 0, 0, 40) | 0;
   B = C;
   b = D + 7 | 0;
   c[n >> 2] = b;
   x = os(d[w + x >> 0] | 0 | 0, 0, 48) | 0;
   A = C;
   u = D + 8 | 0;
   c[n >> 2] = u;
   b = os(d[w + b >> 0] | 0 | 0, 0, 56) | 0;
   A = f | y | B | A | C;
   c[k >> 2] = l | t | E | v | z | x | b;
   c[k + 4 >> 2] = A;
   q = +h[k >> 3];
   A = D + 9 | 0;
   c[n >> 2] = A;
   u = d[w + u >> 0] | 0;
   b = D + 10 | 0;
   c[n >> 2] = b;
   A = os(d[w + A >> 0] | 0 | 0, 0, 8) | 0;
   x = C;
   z = D + 11 | 0;
   c[n >> 2] = z;
   b = os(d[w + b >> 0] | 0 | 0, 0, 16) | 0;
   x = x | C;
   v = D + 12 | 0;
   c[n >> 2] = v;
   z = os(d[w + z >> 0] | 0 | 0, 0, 24) | 0;
   x = x | C;
   E = D + 13 | 0;
   c[n >> 2] = E;
   v = d[w + v >> 0] | 0;
   t = D + 14 | 0;
   c[n >> 2] = t;
   E = os(d[w + E >> 0] | 0 | 0, 0, 40) | 0;
   l = C;
   B = D + 15 | 0;
   c[n >> 2] = B;
   t = os(d[w + t >> 0] | 0 | 0, 0, 48) | 0;
   y = C;
   f = D + 16 | 0;
   c[n >> 2] = f;
   B = os(d[w + B >> 0] | 0 | 0, 0, 56) | 0;
   y = x | v | l | y | C;
   c[k >> 2] = A | u | b | z | E | t | B;
   c[k + 4 >> 2] = y;
   s = +h[k >> 3];
   y = D + 17 | 0;
   c[n >> 2] = y;
   B = c[e >> 2] | 0;
   f = d[B + f >> 0] | 0;
   t = D + 18 | 0;
   c[n >> 2] = t;
   y = os(d[B + y >> 0] | 0 | 0, 0, 8) | 0;
   E = C;
   z = D + 19 | 0;
   c[n >> 2] = z;
   t = os(d[B + t >> 0] | 0 | 0, 0, 16) | 0;
   E = E | C;
   b = D + 20 | 0;
   c[n >> 2] = b;
   z = os(d[B + z >> 0] | 0 | 0, 0, 24) | 0;
   E = E | C;
   u = D + 21 | 0;
   c[n >> 2] = u;
   b = d[B + b >> 0] | 0;
   A = D + 22 | 0;
   c[n >> 2] = A;
   u = os(d[B + u >> 0] | 0 | 0, 0, 40) | 0;
   l = C;
   v = D + 23 | 0;
   c[n >> 2] = v;
   A = os(d[B + A >> 0] | 0 | 0, 0, 48) | 0;
   x = C;
   w = D + 24 | 0;
   c[n >> 2] = w;
   v = os(d[B + v >> 0] | 0 | 0, 0, 56) | 0;
   x = E | b | l | x | C;
   c[k >> 2] = y | f | t | z | u | A | v;
   c[k + 4 >> 2] = x;
   g = +h[k >> 3];
   x = D + 25 | 0;
   c[n >> 2] = x;
   w = d[B + w >> 0] | 0;
   v = D + 26 | 0;
   c[n >> 2] = v;
   x = os(d[B + x >> 0] | 0 | 0, 0, 8) | 0;
   A = C;
   u = D + 27 | 0;
   c[n >> 2] = u;
   v = os(d[B + v >> 0] | 0 | 0, 0, 16) | 0;
   A = A | C;
   z = D + 28 | 0;
   c[n >> 2] = z;
   u = os(d[B + u >> 0] | 0 | 0, 0, 24) | 0;
   A = A | C;
   t = D + 29 | 0;
   c[n >> 2] = t;
   z = d[B + z >> 0] | 0;
   f = D + 30 | 0;
   c[n >> 2] = f;
   t = os(d[B + t >> 0] | 0 | 0, 0, 40) | 0;
   y = C;
   l = D + 31 | 0;
   c[n >> 2] = l;
   f = os(d[B + f >> 0] | 0 | 0, 0, 48) | 0;
   b = C;
   c[n >> 2] = D + 32;
   l = os(d[B + l >> 0] | 0 | 0, 0, 56) | 0;
   b = A | z | y | b | C;
   c[k >> 2] = x | w | v | u | t | f | l;
   c[k + 4 >> 2] = b;
   j = +h[k >> 3];
   b = q > g;
   r = b ? g : q;
   g = b ? q : g;
   b = s > j;
   q = b ? j : s;
   j = b ? s : j;
   b = c[m >> 2] | 0;
   h[b + 96 >> 3] = r;
   h[b + 104 >> 3] = q;
   h[b + 112 >> 3] = g;
   h[b + 120 >> 3] = j;
   g = (r + g) * .5;
   j = (q + j) * .5;
   h[b + 152 >> 3] = g;
   h[b + 160 >> 3] = j;
   h[b + 168 >> 3] = 1.0;
   b = c[m >> 2] | 0;
   if ((c[b + 528 >> 2] | 0) == (c[b + 532 >> 2] | 0)) {
    h[b + 128 >> 3] = g;
    h[b + 136 >> 3] = j;
    h[b + 144 >> 3] = 1.0
   }
   l = e + 4 | 0;
   f = c[l >> 2] | 0;
   b = c[n >> 2] | 0;
   if ((f | 0) <= (b | 0)) {
    i = p;
    return
   }
   c[n >> 2] = b + 1;
   D = d[(c[e >> 2] | 0) + b >> 0] | 0;
   b = b + 4 | 0;
   c[n >> 2] = b;
   E = c[m >> 2] | 0;
   a[E + 588 >> 0] = D & 1;
   a[E + 589 >> 0] = D >>> 2 & 1;
   a[E + 590 >> 0] = D >>> 3 & 1;
   c[o >> 2] = 0;
   c[o + 4 >> 2] = 0;
   c[o + 8 >> 2] = 0;
   if ((b | 0) < (f | 0)) {
    do {
     c[n >> 2] = b + 1;
     b = a[(c[e >> 2] | 0) + b >> 0] | 0;
     if (!(b << 24 >> 24)) break;
     Cj(o, b);
     b = c[n >> 2] | 0
    } while ((b | 0) < (c[l >> 2] | 0));
    b = (a[o >> 0] & 1) == 0;
    f = c[o + 8 >> 2] | 0
   } else {
    b = 1;
    f = 0
   }
   lb(6, (b ? o + 1 | 0 : f) | 0) | 0;
   uj(o);
   i = p;
   return
  }

  function Ud(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Vd(a) {
   a = a | 0;
   var b = 0;
   b = kh(8) | 0;
   c[b >> 2] = 2896;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return b | 0
  }

  function Wd(a, b) {
   a = a | 0;
   b = b | 0;
   c[b >> 2] = 2896;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return
  }

  function Xd(a) {
   a = a | 0;
   return
  }

  function Yd(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Zd(a, b) {
   a = a | 0;
   b = b | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0;
   q = i;
   i = i + 16 | 0;
   p = q;
   k = c[a + 4 >> 2] | 0;
   l = b + 8 | 0;
   f = c[l >> 2] | 0;
   m = f + 1 | 0;
   c[l >> 2] = m;
   g = c[b >> 2] | 0;
   a = d[g + f >> 0] | 0;
   n = f + 2 | 0;
   c[l >> 2] = n;
   a = (d[g + m >> 0] | 0) << 8 | a;
   m = f + 3 | 0;
   c[l >> 2] = m;
   n = a | (d[g + n >> 0] | 0) << 16;
   f = f + 4 | 0;
   c[l >> 2] = f;
   m = n | (d[g + m >> 0] | 0) << 24;
   n = k + 48 | 0;
   a = c[n >> 2] | 0;
   o = k + 52 | 0;
   e = c[o >> 2] | 0;
   if ((e | 0) != (a | 0)) {
    a = e + (~((e + -4 - a | 0) >>> 2) << 2) | 0;
    c[o >> 2] = a
   }
   if ((m | 0) <= 0) {
    b = c[k >> 2] | 0;
    b = b + 592 | 0;
    Pb(b);
    b = c[k >> 2] | 0;
    b = b + 72 | 0;
    dg(b);
    i = q;
    return
   }
   j = k + 56 | 0;
   h = g;
   g = 0;
   while (1) {
    e = f + 1 | 0;
    c[l >> 2] = e;
    s = d[h + f >> 0] | 0;
    r = f + 2 | 0;
    c[l >> 2] = r;
    s = (d[h + e >> 0] | 0) << 8 | s;
    e = f + 3 | 0;
    c[l >> 2] = e;
    r = s | (d[h + r >> 0] | 0) << 16;
    c[l >> 2] = f + 4;
    e = r | (d[h + e >> 0] | 0) << 24;
    c[p >> 2] = e;
    if (a >>> 0 < (c[j >> 2] | 0) >>> 0) {
     c[a >> 2] = e;
     c[o >> 2] = a + 4
    } else Rb(n, p);
    e = g + 1 | 0;
    if ((e | 0) == (m | 0)) break;
    f = c[l >> 2] | 0;
    h = c[b >> 2] | 0;
    a = c[o >> 2] | 0;
    g = e
   }
   s = c[k >> 2] | 0;
   s = s + 592 | 0;
   Pb(s);
   s = c[k >> 2] | 0;
   s = s + 72 | 0;
   dg(s);
   i = q;
   return
  }

  function _d(a) {
   a = a | 0;
   mh(a);
   return
  }

  function $d(a) {
   a = a | 0;
   var b = 0;
   b = kh(8) | 0;
   c[b >> 2] = 2860;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return b | 0
  }

  function ae(a, b) {
   a = a | 0;
   b = b | 0;
   c[b >> 2] = 2860;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return
  }

  function be(a) {
   a = a | 0;
   return
  }

  function ce(a) {
   a = a | 0;
   mh(a);
   return
  }

  function de(b, e) {
   b = b | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0;
   t = i;
   i = i + 16 | 0;
   r = t;
   m = c[b + 4 >> 2] | 0;
   if (a[(c[m >> 2] | 0) + 588 >> 0] | 0) {
    i = t;
    return
   }
   q = e + 8 | 0;
   p = c[q >> 2] | 0;
   n = p + 1 | 0;
   c[q >> 2] = n;
   o = c[e >> 2] | 0;
   b = d[o + p >> 0] | 0;
   f = p + 2 | 0;
   c[q >> 2] = f;
   b = d[o + n >> 0] << 8 | b;
   n = p + 3 | 0;
   c[q >> 2] = n;
   f = b | d[o + f >> 0] << 16;
   c[q >> 2] = p + 4;
   n = f | d[o + n >> 0] << 24;
   o = m + 36 | 0;
   f = c[o >> 2] | 0;
   p = m + 40 | 0;
   b = c[p >> 2] | 0;
   if ((b | 0) != (f | 0))
    do {
     c[p >> 2] = b + -16;
     uj(b + -12 | 0);
     b = c[p >> 2] | 0
    } while ((b | 0) != (f | 0));
   if ((n | 0) > 0) {
    h = r + 4 | 0;
    j = e + 4 | 0;
    k = m + 44 | 0;
    l = 0;
    do {
     b = c[q >> 2] | 0;
     u = b + 1 | 0;
     c[q >> 2] = u;
     f = c[e >> 2] | 0;
     g = d[f + b >> 0] | 0;
     v = b + 2 | 0;
     c[q >> 2] = v;
     g = d[f + u >> 0] << 8 | g;
     u = b + 3 | 0;
     c[q >> 2] = u;
     v = g | d[f + v >> 0] << 16;
     g = b + 4 | 0;
     c[q >> 2] = g;
     c[r >> 2] = v | d[f + u >> 0] << 24;
     c[h >> 2] = 0;
     c[h + 4 >> 2] = 0;
     c[h + 8 >> 2] = 0;
     a: do
      if ((g | 0) < (c[j >> 2] | 0) ? (c[q >> 2] = b + 5, s = a[f + g >> 0] | 0, s << 24 >> 24 != 0) : 0) {
       b = s;
       do {
        Cj(h, b);
        b = c[q >> 2] | 0;
        if ((b | 0) >= (c[j >> 2] | 0)) break a;
        v = c[e >> 2] | 0;
        c[q >> 2] = b + 1;
        b = a[v + b >> 0] | 0
       } while (b << 24 >> 24 != 0)
      }
     while (0);
     b = c[p >> 2] | 0;
     if (b >>> 0 < (c[k >> 2] | 0) >>> 0) {
      c[b >> 2] = c[r >> 2];
      v = b + 4 | 0;
      c[v >> 2] = c[h >> 2];
      c[v + 4 >> 2] = c[h + 4 >> 2];
      c[v + 8 >> 2] = c[h + 8 >> 2];
      c[h >> 2] = 0;
      c[h + 4 >> 2] = 0;
      c[h + 8 >> 2] = 0;
      c[b >> 2] = c[r >> 2];
      c[p >> 2] = (c[p >> 2] | 0) + 16
     } else ee(o, r);
     uj(h);
     l = l + 1 | 0
    } while ((l | 0) != (n | 0))
   }
   Pb((c[m >> 2] | 0) + 592 | 0);
   dg((c[m >> 2] | 0) + 72 | 0);
   i = t;
   return
  }

  function ee(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   k = a + 4 | 0;
   d = c[a >> 2] | 0;
   f = ((c[k >> 2] | 0) - d >> 4) + 1 | 0;
   if (f >>> 0 > 268435455) jh(a);
   l = a + 8 | 0;
   e = (c[l >> 2] | 0) - d | 0;
   if (e >> 4 >>> 0 < 134217727) {
    e = e >> 3;
    e = e >>> 0 < f >>> 0 ? f : e;
    d = (c[k >> 2] | 0) - d >> 4;
    if (!e) {
     g = 0;
     h = 0
    } else i = 6
   } else {
    e = 268435455;
    d = (c[k >> 2] | 0) - d >> 4;
    i = 6
   }
   if ((i | 0) == 6) {
    g = e;
    h = kh(e << 4) | 0
   }
   f = h + (d << 4) | 0;
   e = f;
   j = h + (g << 4) | 0;
   i = c[b >> 2] | 0;
   g = h + (d << 4) + 4 | 0;
   b = b + 4 | 0;
   c[g >> 2] = c[b >> 2];
   c[g + 4 >> 2] = c[b + 4 >> 2];
   c[g + 8 >> 2] = c[b + 8 >> 2];
   c[b >> 2] = 0;
   c[b + 4 >> 2] = 0;
   c[b + 8 >> 2] = 0;
   c[f >> 2] = i;
   b = h + (d + 1 << 4) | 0;
   i = c[a >> 2] | 0;
   d = c[k >> 2] | 0;
   if ((d | 0) == (i | 0)) {
    g = a;
    h = k;
    f = i
   } else {
    do {
     g = d;
     d = d + -16 | 0;
     h = f + -16 | 0;
     c[h >> 2] = c[d >> 2];
     m = f + -12 | 0;
     g = g + -12 | 0;
     c[m >> 2] = c[g >> 2];
     c[m + 4 >> 2] = c[g + 4 >> 2];
     c[m + 8 >> 2] = c[g + 8 >> 2];
     c[g >> 2] = 0;
     c[g + 4 >> 2] = 0;
     c[g + 8 >> 2] = 0;
     c[h >> 2] = c[d >> 2];
     f = e + -16 | 0;
     e = f
    } while ((d | 0) != (i | 0));
    d = e;
    g = a;
    h = k;
    e = d;
    f = c[a >> 2] | 0;
    d = c[k >> 2] | 0
   }
   c[g >> 2] = e;
   c[h >> 2] = b;
   c[l >> 2] = j;
   e = f;
   if ((d | 0) != (e | 0))
    do {
     uj(d + -12 | 0);
     d = d + -16 | 0
    } while ((d | 0) != (e | 0));
   if (!f) return;
   mh(f);
   return
  }

  function fe(a) {
   a = a | 0;
   mh(a);
   return
  }

  function ge(a) {
   a = a | 0;
   var b = 0;
   b = kh(8) | 0;
   c[b >> 2] = 2824;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return b | 0
  }

  function he(a, b) {
   a = a | 0;
   b = b | 0;
   c[b >> 2] = 2824;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return
  }

  function ie(a) {
   a = a | 0;
   return
  }

  function je(a) {
   a = a | 0;
   mh(a);
   return
  }

  function ke(a, b) {
   a = a | 0;
   b = b | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0;
   h = i;
   i = i + 16 | 0;
   g = h;
   f = c[c[a + 4 >> 2] >> 2] | 0;
   j = b + 8 | 0;
   k = c[j >> 2] | 0;
   a = k + 1 | 0;
   c[j >> 2] = a;
   b = c[b >> 2] | 0;
   l = d[b + k >> 0] | 0;
   e = k + 2 | 0;
   c[j >> 2] = e;
   l = (d[b + a >> 0] | 0) << 8 | l;
   a = k + 3 | 0;
   c[j >> 2] = a;
   e = l | (d[b + e >> 0] | 0) << 16;
   c[j >> 2] = k + 4;
   a = e | (d[b + a >> 0] | 0) << 24;
   c[g >> 2] = a;
   b = f + 520 | 0;
   e = c[b >> 2] | 0;
   if ((e | 0) == (c[f + 524 >> 2] | 0)) {
    le(f + 516 | 0, g);
    i = h;
    return
   } else {
    c[e >> 2] = a;
    c[b >> 2] = e + 4;
    i = h;
    return
   }
  }

  function le(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   i = a + 4 | 0;
   j = c[a >> 2] | 0;
   k = j;
   e = ((c[i >> 2] | 0) - k >> 2) + 1 | 0;
   if (e >>> 0 > 1073741823) jh(a);
   l = a + 8 | 0;
   f = j;
   d = (c[l >> 2] | 0) - f | 0;
   if (d >> 2 >>> 0 < 536870911) {
    d = d >> 1;
    d = d >>> 0 < e >>> 0 ? e : d;
    f = (c[i >> 2] | 0) - f | 0;
    e = f >> 2;
    if (!d) {
     h = 0;
     g = 0;
     d = f
    } else m = 6
   } else {
    f = (c[i >> 2] | 0) - f | 0;
    d = 1073741823;
    e = f >> 2;
    m = 6
   }
   if ((m | 0) == 6) {
    h = d;
    g = kh(d << 2) | 0;
    d = f
   }
   c[g + (e << 2) >> 2] = c[b >> 2];
   ns(g | 0, j | 0, d | 0) | 0;
   c[a >> 2] = g;
   c[i >> 2] = g + (e + 1 << 2);
   c[l >> 2] = g + (h << 2);
   if (!k) return;
   mh(k);
   return
  }

  function me(a) {
   a = a | 0;
   mh(a);
   return
  }

  function ne(a) {
   a = a | 0;
   var b = 0;
   b = kh(8) | 0;
   c[b >> 2] = 2788;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return b | 0
  }

  function oe(a, b) {
   a = a | 0;
   b = b | 0;
   c[b >> 2] = 2788;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return
  }

  function pe(a) {
   a = a | 0;
   return
  }

  function qe(a) {
   a = a | 0;
   mh(a);
   return
  }

  function re(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0;
   e = c[c[a + 4 >> 2] >> 2] | 0;
   b = c[e + 528 >> 2] | 0;
   a = e + 532 | 0;
   d = c[a >> 2] | 0;
   if ((d | 0) != (b | 0)) c[a >> 2] = d + (~((d + -4 - b | 0) >>> 2) << 2);
   d = c[e + 516 >> 2] | 0;
   b = e + 520 | 0;
   a = c[b >> 2] | 0;
   if ((a | 0) == (d | 0)) return;
   c[b >> 2] = a + (~((a + -4 - d | 0) >>> 2) << 2);
   return
  }

  function se(a) {
   a = a | 0;
   mh(a);
   return
  }

  function te(a) {
   a = a | 0;
   var b = 0;
   b = kh(8) | 0;
   c[b >> 2] = 2752;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return b | 0
  }

  function ue(a, b) {
   a = a | 0;
   b = b | 0;
   c[b >> 2] = 2752;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return
  }

  function ve(a) {
   a = a | 0;
   return
  }

  function we(a) {
   a = a | 0;
   mh(a);
   return
  }

  function xe(a, b) {
   a = a | 0;
   b = b | 0;
   a = c[a + 4 >> 2] | 0;
   gh((c[a >> 2] | 0) + 512 | 0);
   a = a + 16 | 0;
   c[a >> 2] = ah(a, 4, 255) | 0;
   return
  }

  function ye(a) {
   a = a | 0;
   mh(a);
   return
  }

  function ze(a) {
   a = a | 0;
   var b = 0;
   b = kh(8) | 0;
   c[b >> 2] = 2716;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return b | 0
  }

  function Ae(a, b) {
   a = a | 0;
   b = b | 0;
   c[b >> 2] = 2716;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return
  }

  function Be(a) {
   a = a | 0;
   return
  }

  function Ce(a) {
   a = a | 0;
   mh(a);
   return
  }

  function De(a, b) {
   a = a | 0;
   b = b | 0;
   var e = 0.0,
    f = 0.0,
    i = 0.0,
    j = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0;
   a = c[c[a + 4 >> 2] >> 2] | 0;
   m = b + 8 | 0;
   n = c[m >> 2] | 0;
   p = n + 1 | 0;
   c[m >> 2] = p;
   j = c[b >> 2] | 0;
   o = d[j + n >> 0] | 0;
   l = n + 2 | 0;
   c[m >> 2] = l;
   o = (d[j + p >> 0] | 0) << 8 | o;
   b = n + 3 | 0;
   c[m >> 2] = b;
   l = o | (d[j + l >> 0] | 0) << 16;
   o = n + 4 | 0;
   c[m >> 2] = o;
   i = (c[k >> 2] = l | (d[j + b >> 0] | 0) << 24, +g[k >> 2]);
   b = n + 5 | 0;
   c[m >> 2] = b;
   o = d[j + o >> 0] | 0;
   l = n + 6 | 0;
   c[m >> 2] = l;
   o = (d[j + b >> 0] | 0) << 8 | o;
   b = n + 7 | 0;
   c[m >> 2] = b;
   l = o | (d[j + l >> 0] | 0) << 16;
   o = n + 8 | 0;
   c[m >> 2] = o;
   f = (c[k >> 2] = l | (d[j + b >> 0] | 0) << 24, +g[k >> 2]);
   b = n + 9 | 0;
   c[m >> 2] = b;
   o = d[j + o >> 0] | 0;
   l = n + 10 | 0;
   c[m >> 2] = l;
   o = (d[j + b >> 0] | 0) << 8 | o;
   b = n + 11 | 0;
   c[m >> 2] = b;
   l = o | (d[j + l >> 0] | 0) << 16;
   c[m >> 2] = n + 12;
   e = (c[k >> 2] = l | (d[j + b >> 0] | 0) << 24, +g[k >> 2]);
   h[a + 152 >> 3] = i;
   h[a + 160 >> 3] = f;
   h[a + 168 >> 3] = e;
   return
  }

  function Ee(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Fe(a) {
   a = a | 0;
   var b = 0;
   b = kh(8) | 0;
   c[b >> 2] = 2680;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return b | 0
  }

  function Ge(a, b) {
   a = a | 0;
   b = b | 0;
   c[b >> 2] = 2680;
   c[b + 4 >> 2] = c[a + 4 >> 2];
   return
  }

  function He(a) {
   a = a | 0;
   return
  }

  function Ie(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Je(a, b) {
   a = a | 0;
   b = b | 0;
   Cc(c[a + 4 >> 2] | 0, b);
   return
  }

  function Ke(a) {
   a = a | 0;
   var b = 0;
   b = c[a >> 2] | 0;
   if ((b | 0) != -1) {
    lb(7, b | 0) | 0;
    c[803] = (c[803] | 0) + -1;
    c[a >> 2] = -1
   }
   c[a >> 2] = mb(8) | 0;
   c[803] = (c[803] | 0) + 1;
   return
  }

  function Le(a) {
   a = a | 0;
   var b = 0;
   b = c[a >> 2] | 0;
   if ((b | 0) == -1) return;
   lb(7, b | 0) | 0;
   c[803] = (c[803] | 0) + -1;
   c[a >> 2] = -1;
   return
  }

  function Me(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   jb(9, c[a >> 2] | 0, b | 0, d | 0) | 0;
   return
  }

  function Ne(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   jb(10, c[a >> 2] | 0, b | 0, d | 0) | 0;
   return
  }

  function Oe(a) {
   a = a | 0;
   lb(11, c[a >> 2] | 0) | 0;
   return
  }

  function Pe(a) {
   a = a | 0;
   lb(12, c[a >> 2] | 0) | 0;
   return
  }

  function Qe(a) {
   a = a | 0;
   lb(13, c[a >> 2] | 0) | 0;
   return
  }

  function Re(a) {
   a = a | 0;
   lb(14, c[a >> 2] | 0) | 0;
   return
  }

  function Se(a) {
   a = a | 0;
   lb(15, c[a >> 2] | 0) | 0;
   return
  }

  function Te(a) {
   a = a | 0;
   lb(16, c[a >> 2] | 0) | 0;
   return
  }

  function Ue(a) {
   a = a | 0;
   lb(17, c[a >> 2] | 0) | 0;
   return
  }

  function Ve(a, b, d, e, f) {
   a = a | 0;
   b = +b;
   d = +d;
   e = +e;
   f = +f;
   hb(18, c[a >> 2] | 0, +b, +d, +e, +f) | 0;
   return
  }

  function We(a, b, d, e, f) {
   a = a | 0;
   b = +b;
   d = +d;
   e = +e;
   f = +f;
   hb(19, c[a >> 2] | 0, +b, +d, +e, +f) | 0;
   return
  }

  function Xe(a, b) {
   a = a | 0;
   b = b | 0;
   ib(20, c[a >> 2] | 0, d[b >> 0] | 0 | 0, d[b + 1 >> 0] | 0 | 0, d[b + 2 >> 0] | 0 | 0) | 0;
   return
  }

  function Ye(a, b) {
   a = a | 0;
   b = b | 0;
   ib(21, c[a >> 2] | 0, d[b >> 0] | 0 | 0, d[b + 1 >> 0] | 0 | 0, d[b + 2 >> 0] | 0 | 0) | 0;
   return
  }

  function Ze(a, b) {
   a = a | 0;
   b = +b;
   kb(22, c[a >> 2] | 0, +b) | 0;
   return
  }

  function _e(a, b, d) {
   a = a | 0;
   b = +b;
   d = +d;
   jb(23, c[a >> 2] | 0, +b, +d) | 0;
   return
  }

  function $e(a, b, d) {
   a = a | 0;
   b = +b;
   d = +d;
   jb(24, c[a >> 2] | 0, +b, +d) | 0;
   return
  }

  function af(a, b, d, e, f, g, h) {
   a = a | 0;
   b = +b;
   d = +d;
   e = +e;
   f = +f;
   g = +g;
   h = h | 0;
   fb(25, c[a >> 2] | 0, +b, +d, +e, +f, +g, h & 1 | 0) | 0;
   return
  }

  function bf(a, b, d) {
   a = a | 0;
   b = +b;
   d = +d;
   jb(26, c[a >> 2] | 0, +b, +d) | 0;
   return
  }

  function cf(a, b, d) {
   a = a | 0;
   b = +b;
   d = +d;
   jb(27, c[a >> 2] | 0, +b, +d) | 0;
   return
  }

  function df(a, b) {
   a = a | 0;
   b = +b;
   kb(28, c[a >> 2] | 0, +b) | 0;
   return
  }

  function ef(a, b, d, e) {
   a = a | 0;
   b = b | 0;
   d = +d;
   e = +e;
   b = c[b >> 2] | 0;
   if ((b | 0) == -1) return;
   ib(29, c[a >> 2] | 0, b | 0, +d, +e) | 0;
   return
  }

  function ff(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = +d;
   e = +e;
   f = +f;
   g = +g;
   b = c[b >> 2] | 0;
   if ((b | 0) == -1) return;
   gb(30, c[a >> 2] | 0, b | 0, +d, +e, +f, +g) | 0;
   return
  }

  function gf(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = +d;
   e = +e;
   f = +f;
   g = +g;
   gb(31, c[a >> 2] | 0, c[b >> 2] | 0, +d, +e, +f, +g) | 0;
   return
  }

  function hf(a, b, d, e) {
   a = a | 0;
   b = b | 0;
   d = +d;
   e = +e;
   ib(32, c[a >> 2] | 0, b | 0, +d, +e) | 0;
   return
  }

  function jf(a, b, d, e) {
   a = a | 0;
   b = b | 0;
   d = +d;
   e = +e;
   ib(33, c[a >> 2] | 0, b | 0, +d, +e) | 0;
   return
  }

  function kf(a, b) {
   a = a | 0;
   b = b | 0;
   return +(+kb(34, c[a >> 2] | 0, b | 0))
  }

  function lf(a, b) {
   a = a | 0;
   b = +b;
   kb(35, c[a >> 2] | 0, +b) | 0;
   return
  }

  function mf(a, b) {
   a = a | 0;
   b = b | 0;
   switch (b | 0) {
    case 0:
     {
      lb(36, c[a >> 2] | 0) | 0;
      return
     }
    case 1:
     {
      lb(37, c[a >> 2] | 0) | 0;
      return
     }
    case 2:
     {
      lb(38, c[a >> 2] | 0) | 0;
      return
     }
    default:
     return
   }
  }

  function nf(a, b) {
   a = a | 0;
   b = b | 0;
   switch (b | 0) {
    case 0:
     {
      lb(39, c[a >> 2] | 0) | 0;
      return
     }
    case 1:
     {
      lb(40, c[a >> 2] | 0) | 0;
      return
     }
    case 2:
     {
      lb(41, c[a >> 2] | 0) | 0;
      return
     }
    default:
     return
   }
  }

  function of(a, b) {
   a = a | 0;
   b = b | 0;
   switch (b | 0) {
    case 0:
     {
      lb(42, c[a >> 2] | 0) | 0;
      return
     }
    case 1:
     {
      lb(43, c[a >> 2] | 0) | 0;
      return
     }
    case 2:
     {
      lb(44, c[a >> 2] | 0) | 0;
      return
     }
    case 3:
     {
      lb(45, c[a >> 2] | 0) | 0;
      return
     }
    case 4:
     {
      lb(46, c[a >> 2] | 0) | 0;
      return
     }
    case 5:
     {
      lb(47, c[a >> 2] | 0) | 0;
      return
     }
    default:
     return
   }
  }

  function pf(a) {
   a = a | 0;
   var b = 0;
   b = kh(4) | 0;
   c[b >> 2] = lb(48, a | 0) | 0;
   return b | 0
  }

  function qf() {
   return (mb(49) | 0) != 0 | 0
  }

  function rf(b, d) {
   b = b | 0;
   d = d | 0;
   a[b + 4 >> 0] = 0;
   c[b + 8 >> 2] = 0;
   c[b + 12 >> 2] = 0;
   c[b >> 2] = lb(50, d | 0) | 0;
   c[804] = (c[804] | 0) + 1;
   return
  }

  function sf(a) {
   a = a | 0;
   ib(51, c[a >> 2] | 0, a + 4 | 0, a + 8 | 0, a + 12 | 0) | 0;
   return
  }

  function tf(b) {
   b = b | 0;
   var d = 0,
    e = 0.0,
    f = 0.0,
    g = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0.0,
    r = 0.0;
   d = b + 47 | 0;
   if (!(a[d >> 0] | 0)) return b | 0;
   if (!(qf() | 0)) return b | 0;
   a[d >> 0] = 0;
   d = b + 48 | 0;
   if (!(a[d >> 0] | 0)) {
    a[d >> 0] = 1;
    Ke(b);
    d = b
   } else d = b;
   n = b + 16 | 0;
   lf(d, +h[n >> 3]);
   m = b + 32 | 0;
   q = +h[n >> 3];
   e = +h[m >> 3] * q * 2.0;
   g = b + 4 | 0;
   i = b + 12 | 0;
   j = g + 1 | 0;
   r = +kf(d, (a[g >> 0] & 1) == 0 ? j : c[i >> 2] | 0) + e * 2.0;
   l = b + 24 | 0;
   f = +h[l >> 3];
   p = ~~(r * f);
   c[b + 52 >> 2] = p;
   o = ~~((+(~~(q * .4) | 0) + +h[n >> 3]) * f);
   k = b + 56 | 0;
   c[k >> 2] = o;
   Me(d, p, o);
   of(d, 2);
   lf(d, +h[n >> 3] * +h[l >> 3]);
   Ze(d, 1.0);
   df(d, +h[n >> 3] * +h[m >> 3] * +h[l >> 3]);
   Ye(d, b + 43 | 0);
   Xe(d, b + 40 | 0);
   e = +(~~(e * +h[l >> 3]) | 0);
   f = +((c[k >> 2] | 0) / 2 | 0 | 0);
   if (a[b + 46 >> 0] | 0) jf(d, (a[g >> 0] & 1) == 0 ? j : c[i >> 2] | 0, e, f);
   hf(d, (a[g >> 0] & 1) == 0 ? j : c[i >> 2] | 0, e, f);
   return b | 0
  }

  function uf(a, b) {
   a = a | 0;
   b = b | 0;
   c[a >> 2] = lb(52, b | 0) | 0;
   return
  }

  function vf(a) {
   a = a | 0;
   lb(53, c[a >> 2] | 0) | 0;
   return
  }

  function wf(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   jb(54, c[a >> 2] | 0, b | 0, d | 0) | 0;
   return
  }

  function xf(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   return jb(55, c[a >> 2] | 0, b | 0, d | 0) | 0
  }

  function yf(a) {
   a = a | 0;
   c[805] = a;
   return
  }

  function zf() {
   var a = 0;
   a = c[805] | 0;
   if (!a) return;
   yb[a & 3]();
   return
  }

  function Af() {
   return (mb(56) | 0) != 0 | 0
  }

  function Bf() {
   return +(+mb(57))
  }

  function Cf(a) {
   a = a | 0;
   c[806] = a;
   return
  }

  function Df() {
   var a = 0;
   a = c[806] | 0;
   if (!a) return;
   yb[a & 3]();
   return
  }

  function Ef() {
   Sa(0);
   return
  }

  function Ff() {
   var d = 0,
    e = 0,
    f = 0,
    i = 0.0;
   if (!(c[3] | 0)) return;
   d = c[164] | 0;
   e = d;
   if (d) {
    f = c[165] | 0;
    if ((f | 0) != (d | 0)) c[165] = f + (~((f + -4 - e | 0) >>> 2) << 2);
    mh(d)
   }
   Nf(520);
   Of(80);
   Pf(8);
   vc(8, 8);
   Mf(80, 8);
   a[520] = 1;
   d = 524;
   e = d + 52 | 0;
   do {
    c[d >> 2] = 0;
    d = d + 4 | 0
   } while ((d | 0) < (e | 0));
   g[144] = 1.0;
   c[146] = 8;
   c[150] = 0;
   c[151] = 0;
   c[152] = 0;
   c[153] = 0;
   c[154] = 0;
   c[156] = 0;
   c[157] = 0;
   c[158] = 0;
   c[159] = 0;
   c[160] = 0;
   c[161] = 0;
   c[147] = 0;
   c[148] = 0;
   b[298] = 0;
   a[598] = 0;
   c[162] = 8;
   a[652] = 0;
   c[164] = 0;
   c[165] = 0;
   c[166] = 0;
   h[84] = +$a();
   h[85] = 0.0;
   a[696] = 0;
   i = +$a();
   h[85] = i;
   h[86] = i;
   return
  }

  function Gf(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0.0,
    f = 0,
    g = 0.0;
   d = i;
   i = i + 16 | 0;
   g = +$a();
   h[a + 672 >> 3] = g;
   f = a + 680 | 0;
   e = g - +h[f >> 3];
   h[f >> 3] = g;
   Qf(c[a + 540 >> 2] | 0, c[a + 544 >> 2] | 0, d);
   yc(a);
   Uf(a + 72 | 0, b);
   dh(a + 512 | 0);
   Ob(a + 592 | 0, e);
   i = d;
   return
  }

  function Hf(a) {
   a = a | 0;
   return
  }

  function If(b) {
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    i = 0,
    j = 0;
   e = b + 592 | 0;
   f = b + 648 | 0;
   g = c[f >> 2] | 0;
   i = g;
   d = b + 652 | 0;
   if (g) {
    j = c[d >> 2] | 0;
    if ((j | 0) != (g | 0)) c[d >> 2] = j + (~((j + -4 - i | 0) >>> 2) << 2);
    mh(g)
   }
   j = b + 616 | 0;
   c[e >> 2] = 0;
   c[e + 4 >> 2] = 0;
   c[e + 8 >> 2] = 0;
   c[e + 12 >> 2] = 0;
   c[e + 16 >> 2] = 0;
   c[j >> 2] = 0;
   c[j + 4 >> 2] = 0;
   c[j + 8 >> 2] = 0;
   c[j + 12 >> 2] = 0;
   c[j + 16 >> 2] = 0;
   c[j + 20 >> 2] = 0;
   c[b + 640 >> 2] = b;
   a[b + 644 >> 0] = 0;
   c[f >> 2] = 0;
   c[d >> 2] = 0;
   c[b + 656 >> 2] = 0;
   h[e >> 3] = +h[b + 672 >> 3];
   a[b + 688 >> 0] = 1;
   mb(58);
   return
  }

  function Jf(b) {
   b = b | 0;
   var d = 0,
    e = 0.0;
   gg(b + 72 | 0);
   d = b + 592 | 0;
   Qb(d);
   e = +h[b + 672 >> 3];
   h[b + 600 >> 3] = e;
   a[b + 688 >> 0] = 0;
   gb(59, c[b + 608 >> 2] | 0, +(+h[b + 616 >> 3]), +(e - +h[d >> 3]), +(+h[b + 624 >> 3]), c[b + 632 >> 2] | 0, c[b + 636 >> 2] | 0) | 0;
   return
  }

  function Kf(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0;
   e = c[a + 528 >> 2] | 0;
   j = c[a + 532 >> 2] | 0;
   h = (e | 0) == (j | 0);
   a: do
    if (h) f = e;
    else {
     f = e;
     do {
      if ((c[f >> 2] | 0) == (b | 0)) break a;
      f = f + 4 | 0
     } while ((f | 0) != (j | 0));
     return
    }
   while (0);
   if ((f | 0) == (j | 0)) return;
   b: do
    if (h) {
     i = e;
     k = 8
    } else
     do {
      if ((c[e >> 2] | 0) == (d | 0)) {
       i = e;
       k = 8;
       break b
      }
      e = e + 4 | 0
     } while ((e | 0) != (j | 0));
   while (0);
   if ((k | 0) == 8 ? (i | 0) != (j | 0) : 0) return;
   if (!(+g[d + 16 >> 2] <= 20.0)) {
    k = a + 632 | 0;
    c[k >> 2] = (c[k >> 2] | 0) + 1;
    return
   } else {
    k = a + 608 | 0;
    c[k >> 2] = (c[k >> 2] | 0) + 1;
    return
   }
  }

  function Lf() {
   var d = 0,
    e = 0,
    f = 0.0;
   vc(8, 8);
   Mf(80, 8);
   a[520] = 1;
   d = 524;
   e = d + 52 | 0;
   do {
    c[d >> 2] = 0;
    d = d + 4 | 0
   } while ((d | 0) < (e | 0));
   g[144] = 1.0;
   c[146] = 8;
   c[150] = 0;
   c[151] = 0;
   c[152] = 0;
   c[153] = 0;
   c[154] = 0;
   c[156] = 0;
   c[157] = 0;
   c[158] = 0;
   c[159] = 0;
   c[160] = 0;
   c[161] = 0;
   c[147] = 0;
   c[148] = 0;
   b[298] = 0;
   a[598] = 0;
   c[162] = 8;
   a[652] = 0;
   c[164] = 0;
   c[165] = 0;
   c[166] = 0;
   h[84] = +$a();
   h[85] = 0.0;
   a[696] = 0;
   f = +$a();
   h[85] = f;
   h[86] = f;
   return
  }

  function Mf(d, e) {
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0;
   c[d >> 2] = e;
   c[d + 4 >> 2] = 0;
   c[d + 8 >> 2] = 0;
   c[d + 12 >> 2] = 0;
   a[d + 16 >> 0] = 1;
   a[d + 17 >> 0] = 1;
   e = d + 72 | 0;
   f = d + 24 | 0;
   g = f + 48 | 0;
   do {
    c[f >> 2] = 0;
    f = f + 4 | 0
   } while ((f | 0) < (g | 0));
   h[e >> 3] = 1.0;
   f = d + 80 | 0;
   c[f >> 2] = 0;
   c[f + 4 >> 2] = 0;
   c[f + 8 >> 2] = 0;
   c[f + 12 >> 2] = 0;
   h[d + 96 >> 3] = 1.0;
   h[d + 104 >> 3] = 1.0;
   h[d + 112 >> 3] = 1.0;
   h[d + 120 >> 3] = 1.0;
   c[d + 128 >> 2] = 0;
   f = d + 148 | 0;
   c[d + 164 >> 2] = 0;
   c[d + 168 >> 2] = 0;
   g = d + 172 | 0;
   c[f >> 2] = 0;
   c[f + 4 >> 2] = 0;
   c[f + 8 >> 2] = 0;
   b[f + 12 >> 1] = 0;
   c[g >> 2] = -1;
   Ke(g);
   g = d + 176 | 0;
   c[g >> 2] = -1;
   Ke(g);
   c[d + 184 >> 2] = -1;
   g = d + 188 | 0;
   c[g >> 2] = 0;
   c[g + 4 >> 2] = 0;
   c[g + 8 >> 2] = 0;
   c[g + 12 >> 2] = 0;
   c[g + 16 >> 2] = 0;
   h[d + 208 >> 3] = 1.0;
   h[d + 216 >> 3] = .2;
   a[d + 224 >> 0] = -1;
   a[d + 225 >> 0] = -1;
   a[d + 226 >> 0] = -1;
   a[d + 227 >> 0] = 0;
   a[d + 228 >> 0] = 0;
   a[d + 229 >> 0] = 0;
   a[d + 230 >> 0] = 1;
   a[d + 231 >> 0] = 1;
   a[d + 232 >> 0] = 0;
   c[d + 236 >> 2] = 0;
   c[d + 240 >> 2] = 0;
   c[d + 248 >> 2] = -1;
   g = d + 252 | 0;
   c[g >> 2] = 0;
   c[g + 4 >> 2] = 0;
   c[g + 8 >> 2] = 0;
   c[g + 12 >> 2] = 0;
   c[g + 16 >> 2] = 0;
   h[d + 272 >> 3] = 1.0;
   h[d + 280 >> 3] = .2;
   a[d + 288 >> 0] = -1;
   a[d + 289 >> 0] = -1;
   a[d + 290 >> 0] = -1;
   a[d + 291 >> 0] = 0;
   a[d + 292 >> 0] = 0;
   a[d + 293 >> 0] = 0;
   a[d + 294 >> 0] = 1;
   a[d + 295 >> 0] = 1;
   a[d + 296 >> 0] = 0;
   c[d + 300 >> 2] = 0;
   c[d + 304 >> 2] = 0;
   c[d + 312 >> 2] = -1;
   g = d + 316 | 0;
   c[g >> 2] = 0;
   c[g + 4 >> 2] = 0;
   c[g + 8 >> 2] = 0;
   c[g + 12 >> 2] = 0;
   c[g + 16 >> 2] = 0;
   h[d + 336 >> 3] = 1.0;
   h[d + 344 >> 3] = .2;
   a[d + 352 >> 0] = -1;
   a[d + 353 >> 0] = -1;
   a[d + 354 >> 0] = -1;
   a[d + 355 >> 0] = 0;
   a[d + 356 >> 0] = 0;
   a[d + 357 >> 0] = 0;
   a[d + 358 >> 0] = 1;
   a[d + 359 >> 0] = 1;
   a[d + 360 >> 0] = 0;
   c[d + 364 >> 2] = 0;
   c[d + 368 >> 2] = 0;
   c[d + 376 >> 2] = -1;
   g = d + 380 | 0;
   c[g >> 2] = 0;
   c[g + 4 >> 2] = 0;
   c[g + 8 >> 2] = 0;
   c[g + 12 >> 2] = 0;
   c[g + 16 >> 2] = 0;
   h[d + 400 >> 3] = 1.0;
   h[d + 408 >> 3] = .2;
   a[d + 416 >> 0] = -1;
   a[d + 417 >> 0] = -1;
   a[d + 418 >> 0] = -1;
   a[d + 419 >> 0] = 0;
   a[d + 420 >> 0] = 0;
   a[d + 421 >> 0] = 0;
   a[d + 422 >> 0] = 1;
   a[d + 423 >> 0] = 1;
   a[d + 424 >> 0] = 0;
   c[d + 428 >> 2] = 0;
   c[d + 432 >> 2] = 0;
   return
  }

  function Nf(a) {
   a = a | 0;
   var b = 0,
    d = 0,
    e = 0,
    f = 0;
   gh(a);
   b = c[a + 48 >> 2] | 0;
   if (b)
    do {
     f = b;
     b = c[b >> 2] | 0;
     mh(f)
    } while ((b | 0) != 0);
   f = a + 40 | 0;
   b = c[f >> 2] | 0;
   c[f >> 2] = 0;
   if (b) mh(b);
   f = c[a + 28 >> 2] | 0;
   b = f;
   if (f) {
    d = a + 32 | 0;
    e = c[d >> 2] | 0;
    if ((e | 0) != (f | 0)) c[d >> 2] = e + (~((e + -4 - b | 0) >>> 2) << 2);
    mh(f)
   }
   b = c[a + 16 >> 2] | 0;
   d = b;
   if (b) {
    e = a + 20 | 0;
    f = c[e >> 2] | 0;
    if ((f | 0) != (b | 0)) c[e >> 2] = f + (~((f + -4 - d | 0) >>> 2) << 2);
    mh(b)
   }
   e = c[a + 4 >> 2] | 0;
   if (!e) return;
   b = a + 8 | 0;
   d = c[b >> 2] | 0;
   if ((d | 0) != (e | 0)) c[b >> 2] = d + (~((d + -4 - e | 0) >>> 2) << 2);
   mh(e);
   return
  }

  function Of(a) {
   a = a | 0;
   var b = 0,
    d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0;
   uj(a + 380 | 0);
   Le(a + 376 | 0);
   uj(a + 316 | 0);
   Le(a + 312 | 0);
   uj(a + 252 | 0);
   Le(a + 248 | 0);
   uj(a + 188 | 0);
   Le(a + 184 | 0);
   Le(a + 176 | 0);
   Le(a + 172 | 0);
   h = a + 148 | 0;
   b = c[h >> 2] | 0;
   if (!b) return;
   g = a + 152 | 0;
   a = c[g >> 2] | 0;
   if ((a | 0) != (b | 0)) {
    do {
     d = a + -12 | 0;
     c[g >> 2] = d;
     e = c[d >> 2] | 0;
     f = e;
     if (!e) a = d;
     else {
      a = a + -8 | 0;
      d = c[a >> 2] | 0;
      if ((d | 0) != (e | 0)) c[a >> 2] = d + (~((d + -4 - f | 0) >>> 2) << 2);
      mh(e);
      a = c[g >> 2] | 0
     }
    } while ((a | 0) != (b | 0));
    b = c[h >> 2] | 0
   }
   mh(b);
   return
  }

  function Pf(a) {
   a = a | 0;
   var b = 0,
    d = 0,
    e = 0,
    f = 0,
    g = 0;
   e = a + 60 | 0;
   b = c[e >> 2] | 0;
   if (b) {
    f = a + 64 | 0;
    d = c[f >> 2] | 0;
    if ((d | 0) != (b | 0)) {
     do {
      g = d + -24 | 0;
      c[f >> 2] = g;
      d = c[d + -8 >> 2] | 0;
      if ((d | 0) != (g | 0)) {
       if (d) sb[c[(c[d >> 2] | 0) + 20 >> 2] & 255](d)
      } else sb[c[(c[d >> 2] | 0) + 16 >> 2] & 255](d);
      d = c[f >> 2] | 0
     } while ((d | 0) != (b | 0));
     b = c[e >> 2] | 0
    }
    mh(b)
   }
   b = c[a + 48 >> 2] | 0;
   d = b;
   if (b) {
    e = a + 52 | 0;
    f = c[e >> 2] | 0;
    if ((f | 0) != (b | 0)) c[e >> 2] = f + (~((f + -4 - d | 0) >>> 2) << 2);
    mh(b)
   }
   e = a + 36 | 0;
   b = c[e >> 2] | 0;
   if (b) {
    f = a + 40 | 0;
    d = c[f >> 2] | 0;
    if ((d | 0) != (b | 0)) {
     do {
      c[f >> 2] = d + -16;
      uj(d + -12 | 0);
      d = c[f >> 2] | 0
     } while ((d | 0) != (b | 0));
     b = c[e >> 2] | 0
    }
    mh(b)
   }
   uj(a + 20 | 0);
   g = a + 4 | 0;
   b = c[g >> 2] | 0;
   c[g >> 2] = 0;
   if (!b) return;
   vf(b);
   mh(b);
   return
  }

  function Qf(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    h = 0.0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0.0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0.0;
   p = b;
   a: while (1) {
    r = p;
    b = p + -4 | 0;
    b: while (1) {
     q = a;
     f = r - q | 0;
     i = f >> 2;
     switch (i | 0) {
      case 2:
       {
        f = a;a = b;e = b;u = 4;
        break a
       }
      case 3:
       {
        l = a;i = b;j = b;u = 6;
        break a
       }
      case 4:
       {
        n = b;o = b;u = 14;
        break a
       }
      case 5:
       {
        u = 26;
        break a
       }
      case 1:
      case 0:
       {
        u = 86;
        break a
       }
      default:
       {}
     }
     if ((f | 0) < 124) {
      u = 28;
      break a
     }
     e = (i | 0) / 2 | 0;
     o = a + (e << 2) | 0;
     do
      if ((f | 0) <= 3996) {
       f = c[o >> 2] | 0;
       j = c[a >> 2] | 0;
       m = +g[f + 16 >> 2];
       h = +g[j + 16 >> 2];
       i = c[b >> 2] | 0;
       e = +g[i + 16 >> 2] < m;
       if (!(m < h)) {
        if (!e) {
         e = 0;
         break
        }
        c[o >> 2] = i;
        c[b >> 2] = f;
        e = c[o >> 2] | 0;
        f = c[a >> 2] | 0;
        if (!(+g[e + 16 >> 2] < +g[f + 16 >> 2])) {
         e = 1;
         break
        }
        c[a >> 2] = e;
        c[o >> 2] = f;
        e = 2;
        break
       }
       if (e) {
        c[a >> 2] = i;
        c[b >> 2] = j;
        e = 1;
        break
       }
       c[a >> 2] = f;
       c[o >> 2] = j;
       e = c[b >> 2] | 0;
       if (+g[e + 16 >> 2] < h) {
        c[o >> 2] = e;
        c[b >> 2] = j;
        e = 2
       } else e = 1
      } else {
       n = (i | 0) / 4 | 0;
       e = Rf(a, a + (n << 2) | 0, o, a + (n + e << 2) | 0, b, d) | 0
      }
     while (0);
     j = c[a >> 2] | 0;
     m = +g[j + 16 >> 2];
     h = +g[(c[o >> 2] | 0) + 16 >> 2];
     do
      if (m < h) i = b;
      else {
       i = b;
       while (1) {
        i = i + -4 | 0;
        if ((a | 0) == (i | 0)) break;
        f = c[i >> 2] | 0;
        if (+g[f + 16 >> 2] < h) {
         u = 68;
         break
        }
       }
       if ((u | 0) == 68) {
        u = 0;
        c[a >> 2] = f;
        c[i >> 2] = j;
        e = e + 1 | 0;
        break
       }
       e = a + 4 | 0;
       q = c[b >> 2] | 0;
       j = q;
       if (!(m < +g[q + 16 >> 2])) {
        if ((e | 0) == (b | 0)) {
         u = 86;
         break a
        } else i = a;
        while (1) {
         f = c[e >> 2] | 0;
         if (m < +g[f + 16 >> 2]) break;
         f = e + 4 | 0;
         if ((f | 0) == (b | 0)) {
          u = 86;
          break a
         } else {
          i = e;
          e = f
         }
        }
        c[e >> 2] = j;
        c[b >> 2] = f;
        e = i + 8 | 0
       }
       if ((e | 0) == (b | 0)) {
        u = 86;
        break a
       } else i = b;
       while (1) {
        h = +g[(c[a >> 2] | 0) + 16 >> 2];
        j = e;
        while (1) {
         f = c[j >> 2] | 0;
         e = j + 4 | 0;
         if (h < +g[f + 16 >> 2]) break;
         else j = e
        }
        k = f;
        f = i;
        while (1) {
         i = f + -4 | 0;
         f = c[i >> 2] | 0;
         if (h < +g[f + 16 >> 2]) f = i;
         else break
        }
        if (j >>> 0 >= i >>> 0) {
         a = j;
         continue b
        }
        c[j >> 2] = f;
        c[i >> 2] = k
       }
      }
     while (0);
     f = a + 4 | 0;
     c: do
      if (f >>> 0 < i >>> 0)
       while (1) {
        h = +g[(c[o >> 2] | 0) + 16 >> 2];
        k = f;
        while (1) {
         j = c[k >> 2] | 0;
         f = k + 4 | 0;
         if (+g[j + 16 >> 2] < h) k = f;
         else {
          n = k;
          break
         }
        }
        do {
         i = i + -4 | 0;
         k = c[i >> 2] | 0
        } while (!(+g[k + 16 >> 2] < h));
        l = i;
        i = k;
        if (n >>> 0 > l >>> 0) {
         i = n;
         f = o;
         break c
        }
        c[n >> 2] = i;
        c[l >> 2] = j;
        i = l;
        o = (o | 0) == (n | 0) ? l : o;
        e = e + 1 | 0
       } else {
        i = f;
        f = o
       }
      while (0);
     if ((i | 0) != (f | 0) ? (s = c[f >> 2] | 0, t = c[i >> 2] | 0, +g[s + 16 >> 2] < +g[t + 16 >> 2]) : 0) {
      c[i >> 2] = s;
      c[f >> 2] = t;
      e = e + 1 | 0
     }
     if (!e) {
      e = Sf(a, i, d) | 0;
      f = i + 4 | 0;
      if (Sf(f, p, d) | 0) {
       u = 81;
       break
      }
      if (e) {
       a = f;
       continue
      }
     }
     o = i;
     if ((o - q | 0) >= (r - o | 0)) {
      b = i;
      u = 85;
      break
     }
     Qf(a, i, d);
     a = i + 4 | 0
    }
    if ((u | 0) == 81) {
     u = 0;
     if (e) {
      u = 86;
      break
     } else {
      p = i;
      continue
     }
    } else if ((u | 0) == 85) {
     u = 0;
     Qf(b + 4 | 0, p, d);
     p = b;
     continue
    }
   }
   if ((u | 0) == 4) {
    b = c[a >> 2] | 0;
    a = c[f >> 2] | 0;
    if (!(+g[b + 16 >> 2] < +g[a + 16 >> 2])) return;
    c[f >> 2] = b;
    c[e >> 2] = a;
    return
   } else if ((u | 0) == 6) {
    k = l + 4 | 0;
    a = c[k >> 2] | 0;
    f = c[l >> 2] | 0;
    m = +g[a + 16 >> 2];
    h = +g[f + 16 >> 2];
    e = c[i >> 2] | 0;
    b = +g[e + 16 >> 2] < m;
    if (!(m < h)) {
     if (!b) return;
     c[k >> 2] = e;
     c[j >> 2] = a;
     b = c[k >> 2] | 0;
     a = c[l >> 2] | 0;
     if (!(+g[b + 16 >> 2] < +g[a + 16 >> 2])) return;
     c[l >> 2] = b;
     c[k >> 2] = a;
     return
    }
    if (b) {
     c[l >> 2] = e;
     c[j >> 2] = f;
     return
    }
    c[l >> 2] = a;
    c[k >> 2] = f;
    b = c[i >> 2] | 0;
    if (!(+g[b + 16 >> 2] < h)) return;
    c[k >> 2] = b;
    c[j >> 2] = f;
    return
   } else if ((u | 0) == 14) {
    q = a + 4 | 0;
    p = a + 8 | 0;
    j = c[q >> 2] | 0;
    f = c[a >> 2] | 0;
    v = +g[j + 16 >> 2];
    h = +g[f + 16 >> 2];
    b = c[p >> 2] | 0;
    m = +g[b + 16 >> 2];
    i = m < v;
    e = j;
    k = b;
    l = f;
    do
     if (v < h) {
      if (i) {
       c[a >> 2] = k;
       c[p >> 2] = l;
       e = l;
       break
      }
      c[a >> 2] = e;
      c[q >> 2] = l;
      if (m < h) {
       c[q >> 2] = k;
       c[p >> 2] = l;
       e = l
      } else {
       f = b;
       e = k
      }
     } else if (i) {
     c[q >> 2] = k;
     c[p >> 2] = e;
     if (+g[b + 16 >> 2] < h) {
      c[a >> 2] = b;
      c[q >> 2] = l;
      f = j;
      e = j
     } else f = j
    } else {
     f = b;
     e = k
    }
    while (0);
    b = c[n >> 2] | 0;
    if (!(+g[b + 16 >> 2] < +g[f + 16 >> 2])) return;
    c[p >> 2] = b;
    c[o >> 2] = e;
    e = c[p >> 2] | 0;
    b = c[q >> 2] | 0;
    if (!(+g[e + 16 >> 2] < +g[b + 16 >> 2])) return;
    c[q >> 2] = e;
    c[p >> 2] = b;
    b = c[a >> 2] | 0;
    if (!(+g[e + 16 >> 2] < +g[b + 16 >> 2])) return;
    c[a >> 2] = e;
    c[q >> 2] = b;
    return
   } else if ((u | 0) == 26) {
    Rf(a, a + 4 | 0, a + 8 | 0, a + 12 | 0, b, d) | 0;
    return
   } else if ((u | 0) == 28) {
    b = a + 8 | 0;
    l = a + 4 | 0;
    n = c[l >> 2] | 0;
    o = c[a >> 2] | 0;
    v = +g[n + 16 >> 2];
    h = +g[o + 16 >> 2];
    e = c[b >> 2] | 0;
    m = +g[e + 16 >> 2];
    f = m < v;
    i = n;
    j = e;
    k = o;
    do
     if (v < h) {
      if (f) {
       c[a >> 2] = j;
       c[b >> 2] = k;
       e = o;
       break
      }
      c[a >> 2] = i;
      c[l >> 2] = k;
      if (m < h) {
       c[l >> 2] = j;
       c[b >> 2] = k;
       e = o
      }
     } else if (f) {
     c[l >> 2] = j;
     c[b >> 2] = i;
     if (m < h) {
      c[a >> 2] = j;
      c[l >> 2] = k;
      e = n
     } else e = n
    } while (0);
    f = a + 12 | 0;
    if ((f | 0) == (p | 0)) return;
    while (1) {
     i = c[f >> 2] | 0;
     h = +g[i + 16 >> 2];
     if (h < +g[e + 16 >> 2]) {
      e = f;
      while (1) {
       c[e >> 2] = c[b >> 2];
       if ((b | 0) == (a | 0)) break;
       e = b + -4 | 0;
       if (h < +g[(c[e >> 2] | 0) + 16 >> 2]) {
        u = b;
        b = e;
        e = u
       } else break
      }
      c[b >> 2] = i
     }
     b = f + 4 | 0;
     if ((b | 0) == (p | 0)) break;
     u = f;
     e = c[f >> 2] | 0;
     f = b;
     b = u
    }
    return
   } else if ((u | 0) == 86) return
  }

  function Rf(a, b, d, e, f, h) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   h = h | 0;
   var i = 0,
    j = 0,
    k = 0,
    l = 0.0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0.0;
   j = c[b >> 2] | 0;
   m = c[a >> 2] | 0;
   q = +g[j + 16 >> 2];
   l = +g[m + 16 >> 2];
   k = c[d >> 2] | 0;
   h = +g[k + 16 >> 2] < q;
   n = j;
   i = k;
   o = m;
   do
    if (q < l) {
     if (h) {
      c[a >> 2] = i;
      c[d >> 2] = o;
      p = 1;
      j = m;
      i = o;
      break
     }
     c[a >> 2] = n;
     c[b >> 2] = o;
     h = c[d >> 2] | 0;
     i = h;
     if (+g[h + 16 >> 2] < l) {
      c[b >> 2] = i;
      c[d >> 2] = o;
      p = 2;
      j = m;
      i = o
     } else {
      p = 1;
      j = h
     }
    } else if (h) {
    c[b >> 2] = i;
    c[d >> 2] = n;
    h = c[b >> 2] | 0;
    i = c[a >> 2] | 0;
    if (+g[h + 16 >> 2] < +g[i + 16 >> 2]) {
     c[a >> 2] = h;
     c[b >> 2] = i;
     i = c[d >> 2] | 0;
     p = 2;
     j = i
    } else {
     p = 1;
     i = n
    }
   } else {
    p = 0;
    j = k
   }
   while (0);
   h = c[e >> 2] | 0;
   if (+g[h + 16 >> 2] < +g[j + 16 >> 2]) {
    c[d >> 2] = h;
    c[e >> 2] = i;
    h = p + 1 | 0;
    i = c[d >> 2] | 0;
    j = c[b >> 2] | 0;
    if (+g[i + 16 >> 2] < +g[j + 16 >> 2]) {
     c[b >> 2] = i;
     c[d >> 2] = j;
     h = c[b >> 2] | 0;
     i = c[a >> 2] | 0;
     if (+g[h + 16 >> 2] < +g[i + 16 >> 2]) {
      c[a >> 2] = h;
      c[b >> 2] = i;
      j = p + 3 | 0
     } else j = p + 2 | 0
    } else j = h
   } else j = p;
   h = c[f >> 2] | 0;
   i = c[e >> 2] | 0;
   if (!(+g[h + 16 >> 2] < +g[i + 16 >> 2])) {
    b = j;
    return b | 0
   }
   c[e >> 2] = h;
   c[f >> 2] = i;
   h = c[e >> 2] | 0;
   i = c[d >> 2] | 0;
   if (!(+g[h + 16 >> 2] < +g[i + 16 >> 2])) {
    b = j + 1 | 0;
    return b | 0
   }
   c[d >> 2] = h;
   c[e >> 2] = i;
   h = c[d >> 2] | 0;
   i = c[b >> 2] | 0;
   if (!(+g[h + 16 >> 2] < +g[i + 16 >> 2])) {
    b = j + 2 | 0;
    return b | 0
   }
   c[b >> 2] = h;
   c[d >> 2] = i;
   h = c[b >> 2] | 0;
   i = c[a >> 2] | 0;
   if (!(+g[h + 16 >> 2] < +g[i + 16 >> 2])) {
    b = j + 3 | 0;
    return b | 0
   }
   c[a >> 2] = h;
   c[b >> 2] = i;
   b = j + 4 | 0;
   return b | 0
  }

  function Sf(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    h = 0,
    i = 0.0,
    j = 0,
    k = 0,
    l = 0.0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0.0;
   switch (b - a >> 2 | 0) {
    case 2:
     {
      d = b + -4 | 0;e = c[d >> 2] | 0;f = c[a >> 2] | 0;
      if (!(+g[e + 16 >> 2] < +g[f + 16 >> 2])) {
       a = 1;
       return a | 0
      }
      c[a >> 2] = e;c[d >> 2] = f;a = 1;
      return a | 0
     }
    case 3:
     {
      k = a + 4 | 0;h = b + -4 | 0;e = c[k >> 2] | 0;j = c[a >> 2] | 0;l = +g[e + 16 >> 2];i = +g[j + 16 >> 2];f = c[h >> 2] | 0;d = +g[f + 16 >> 2] < l;
      if (!(l < i)) {
       if (!d) {
        a = 1;
        return a | 0
       }
       c[k >> 2] = f;
       c[h >> 2] = e;
       d = c[k >> 2] | 0;
       e = c[a >> 2] | 0;
       if (!(+g[d + 16 >> 2] < +g[e + 16 >> 2])) {
        a = 1;
        return a | 0
       }
       c[a >> 2] = d;
       c[k >> 2] = e;
       a = 1;
       return a | 0
      }
      if (d) {
       c[a >> 2] = f;
       c[h >> 2] = j;
       a = 1;
       return a | 0
      }
      c[a >> 2] = e;c[k >> 2] = j;d = c[h >> 2] | 0;
      if (!(+g[d + 16 >> 2] < i)) {
       a = 1;
       return a | 0
      }
      c[k >> 2] = d;c[h >> 2] = j;a = 1;
      return a | 0
     }
    case 4:
     {
      p = a + 4 | 0;o = a + 8 | 0;n = b + -4 | 0;j = c[p >> 2] | 0;f = c[a >> 2] | 0;q = +g[j + 16 >> 2];i = +g[f + 16 >> 2];d = c[o >> 2] | 0;l = +g[d + 16 >> 2];h = l < q;e = j;k = d;m = f;do
       if (q < i) {
        if (h) {
         c[a >> 2] = k;
         c[o >> 2] = m;
         e = m;
         break
        }
        c[a >> 2] = e;
        c[p >> 2] = m;
        if (l < i) {
         c[p >> 2] = k;
         c[o >> 2] = m;
         e = m
        } else {
         f = d;
         e = k
        }
       } else if (h) {
       c[p >> 2] = k;
       c[o >> 2] = e;
       if (+g[d + 16 >> 2] < i) {
        c[a >> 2] = d;
        c[p >> 2] = m;
        f = j;
        e = j
       } else f = j
      } else {
       f = d;
       e = k
      }
      while (0);d = c[n >> 2] | 0;
      if (!(+g[d + 16 >> 2] < +g[f + 16 >> 2])) {
       a = 1;
       return a | 0
      }
      c[o >> 2] = d;c[n >> 2] = e;e = c[o >> 2] | 0;d = c[p >> 2] | 0;
      if (!(+g[e + 16 >> 2] < +g[d + 16 >> 2])) {
       a = 1;
       return a | 0
      }
      c[p >> 2] = e;c[o >> 2] = d;d = c[a >> 2] | 0;
      if (!(+g[e + 16 >> 2] < +g[d + 16 >> 2])) {
       a = 1;
       return a | 0
      }
      c[a >> 2] = e;c[p >> 2] = d;a = 1;
      return a | 0
     }
    case 5:
     {
      Rf(a, a + 4 | 0, a + 8 | 0, a + 12 | 0, b + -4 | 0, d) | 0;a = 1;
      return a | 0
     }
    case 1:
    case 0:
     {
      a = 1;
      return a | 0
     }
    default:
     {
      f = a + 8 | 0;n = a + 4 | 0;o = c[n >> 2] | 0;e = c[a >> 2] | 0;q = +g[o + 16 >> 2];i = +g[e + 16 >> 2];d = c[f >> 2] | 0;l = +g[d + 16 >> 2];h = l < q;j = o;k = d;m = e;do
       if (q < i) {
        if (h) {
         c[a >> 2] = k;
         c[f >> 2] = m;
         break
        }
        c[a >> 2] = j;
        c[n >> 2] = m;
        if (l < i) {
         c[n >> 2] = k;
         c[f >> 2] = m
        } else e = d
       } else if (h) {
       c[n >> 2] = k;
       c[f >> 2] = j;
       if (+g[d + 16 >> 2] < i) {
        c[a >> 2] = d;
        c[n >> 2] = m;
        e = o
       } else e = o
      } else e = d;
      while (0);d = a + 12 | 0;
      if ((d | 0) == (b | 0)) {
       a = 1;
       return a | 0
      } else {
       j = e;
       e = 0
      }
      while (1) {
       h = c[d >> 2] | 0;
       k = h;
       if (+g[h + 16 >> 2] < +g[j + 16 >> 2]) {
        j = h + 16 | 0;
        h = d;
        while (1) {
         c[h >> 2] = c[f >> 2];
         if ((f | 0) == (a | 0)) break;
         h = f + -4 | 0;
         if (+g[j >> 2] < +g[(c[h >> 2] | 0) + 16 >> 2]) {
          o = f;
          f = h;
          h = o
         } else break
        }
        c[f >> 2] = k;
        e = e + 1 | 0;
        if ((e | 0) == 8) break
       }
       f = d + 4 | 0;
       if ((f | 0) == (b | 0)) {
        d = 1;
        p = 42;
        break
       }
       o = d;
       j = c[d >> 2] | 0;
       d = f;
       f = o
      }
      if ((p | 0) == 42) return d | 0;a = (d + 4 | 0) == (b | 0);
      return a | 0
     }
   }
   return 0
  }

  function Tf(b, e, f, g) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0;
   x = b + f | 0;
   y = e + g | 0;
   if (!g) {
    if ((f | 0) == 1) g = (a[b >> 0] | 0) != 0;
    else g = 1;
    z = g << 31 >> 31;
    return z | 0
   }
   u = e + (g + -12) | 0;
   v = b + (f + -8) | 0;
   w = e + (g + -8) | 0;
   r = e + (g + -5) | 0;
   s = w;
   t = b + (f + -5) | 0;
   q = b + (f + -15) | 0;
   g = b;
   f = e;
   a: while (1) {
    i = g + 1 | 0;
    o = d[g >> 0] | 0;
    h = o >>> 4;
    if ((h | 0) == 15) {
     h = 15;
     while (1) {
      j = i + 1 | 0;
      p = a[i >> 0] | 0;
      h = (p & 255) + h | 0;
      if (p << 24 >> 24 == -1 & j >>> 0 < q >>> 0) {
       g = i;
       i = j
      } else break
     }
     if ((h | 0) < 0) {
      g = j;
      break
     }
     if ((g + (h + 2) | 0) >>> 0 < j >>> 0) {
      g = j;
      break
     } else {
      g = i;
      k = j
     }
    } else k = i;
    j = f + h | 0;
    p = h + 1 | 0;
    i = g + p | 0;
    if (j >>> 0 > u >>> 0 | i >>> 0 > v >>> 0) {
     g = k;
     z = 11;
     break
    } else l = f;
    while (1) {
     m = k;
     B = m;
     B = d[B >> 0] | d[B + 1 >> 0] << 8 | d[B + 2 >> 0] << 16 | d[B + 3 >> 0] << 24;
     m = m + 4 | 0;
     m = d[m >> 0] | d[m + 1 >> 0] << 8 | d[m + 2 >> 0] << 16 | d[m + 3 >> 0] << 24;
     n = l;
     A = n;
     a[A >> 0] = B;
     a[A + 1 >> 0] = B >> 8;
     a[A + 2 >> 0] = B >> 16;
     a[A + 3 >> 0] = B >> 24;
     n = n + 4 | 0;
     a[n >> 0] = m;
     a[n + 1 >> 0] = m >> 8;
     a[n + 2 >> 0] = m >> 16;
     a[n + 3 >> 0] = m >> 24;
     l = l + 8 | 0;
     if (l >>> 0 >= j >>> 0) break;
     else k = k + 8 | 0
    }
    l = h - ((d[i >> 0] | d[i + 1 >> 0] << 8) & 65535) | 0;
    n = f + l | 0;
    m = h + 3 | 0;
    g = g + m | 0;
    if (n >>> 0 < e >>> 0) break;
    i = o & 15;
    if ((i | 0) == 15) {
     k = g;
     i = 15;
     while (1) {
      if (k >>> 0 > t >>> 0) {
       g = k;
       break a
      }
      g = k + 1 | 0;
      B = a[k >> 0] | 0;
      i = (B & 255) + i | 0;
      if (B << 24 >> 24 == -1) k = g;
      else break
     }
     if ((i + h | 0) < (h | 0)) break
    }
    k = h + 4 | 0;
    o = f + (k + i) | 0;
    i = j - n | 0;
    if ((i | 0) < 8) {
     B = c[3228 + (i << 2) >> 2] | 0;
     a[j >> 0] = a[n >> 0] | 0;
     a[f + p >> 0] = a[f + (l + 1) >> 0] | 0;
     a[f + (h + 2) >> 0] = a[f + (l + 2) >> 0] | 0;
     a[f + m >> 0] = a[f + (l + 3) >> 0] | 0;
     A = (c[3260 + (i << 2) >> 2] | 0) + l | 0;
     p = f + A | 0;
     k = f + k | 0;
     p = d[p >> 0] | d[p + 1 >> 0] << 8 | d[p + 2 >> 0] << 16 | d[p + 3 >> 0] << 24;
     a[k >> 0] = p;
     a[k + 1 >> 0] = p >> 8;
     a[k + 2 >> 0] = p >> 16;
     a[k + 3 >> 0] = p >> 24;
     k = A - B | 0
    } else {
     B = n;
     p = B;
     p = d[p >> 0] | d[p + 1 >> 0] << 8 | d[p + 2 >> 0] << 16 | d[p + 3 >> 0] << 24;
     B = B + 4 | 0;
     B = d[B >> 0] | d[B + 1 >> 0] << 8 | d[B + 2 >> 0] << 16 | d[B + 3 >> 0] << 24;
     k = j;
     A = k;
     a[A >> 0] = p;
     a[A + 1 >> 0] = p >> 8;
     a[A + 2 >> 0] = p >> 16;
     a[A + 3 >> 0] = p >> 24;
     k = k + 4 | 0;
     a[k >> 0] = B;
     a[k + 1 >> 0] = B >> 8;
     a[k + 2 >> 0] = B >> 16;
     a[k + 3 >> 0] = B >> 24;
     k = l + 8 | 0
    }
    i = f + k | 0;
    h = f + (h + 8) | 0;
    if (o >>> 0 <= u >>> 0) {
     f = h;
     h = i;
     while (1) {
      A = h;
      n = A;
      n = d[n >> 0] | d[n + 1 >> 0] << 8 | d[n + 2 >> 0] << 16 | d[n + 3 >> 0] << 24;
      A = A + 4 | 0;
      A = d[A >> 0] | d[A + 1 >> 0] << 8 | d[A + 2 >> 0] << 16 | d[A + 3 >> 0] << 24;
      B = f;
      p = B;
      a[p >> 0] = n;
      a[p + 1 >> 0] = n >> 8;
      a[p + 2 >> 0] = n >> 16;
      a[p + 3 >> 0] = n >> 24;
      B = B + 4 | 0;
      a[B >> 0] = A;
      a[B + 1 >> 0] = A >> 8;
      a[B + 2 >> 0] = A >> 16;
      a[B + 3 >> 0] = A >> 24;
      f = f + 8 | 0;
      if (f >>> 0 < o >>> 0) h = h + 8 | 0;
      else {
       f = o;
       continue a
      }
     }
    }
    if (o >>> 0 > r >>> 0) break;
    if (h >>> 0 < w >>> 0) {
     j = h;
     while (1) {
      A = i;
      n = A;
      n = d[n >> 0] | d[n + 1 >> 0] << 8 | d[n + 2 >> 0] << 16 | d[n + 3 >> 0] << 24;
      A = A + 4 | 0;
      A = d[A >> 0] | d[A + 1 >> 0] << 8 | d[A + 2 >> 0] << 16 | d[A + 3 >> 0] << 24;
      B = j;
      p = B;
      a[p >> 0] = n;
      a[p + 1 >> 0] = n >> 8;
      a[p + 2 >> 0] = n >> 16;
      a[p + 3 >> 0] = n >> 24;
      B = B + 4 | 0;
      a[B >> 0] = A;
      a[B + 1 >> 0] = A >> 8;
      a[B + 2 >> 0] = A >> 16;
      a[B + 3 >> 0] = A >> 24;
      j = j + 8 | 0;
      if (j >>> 0 >= w >>> 0) break;
      else i = i + 8 | 0
     }
     f = f + (s - h + k) | 0;
     h = w
    } else f = i;
    if (h >>> 0 < o >>> 0) i = f;
    else {
     f = o;
     continue
    }
    while (1) {
     f = h + 1 | 0;
     a[h >> 0] = a[i >> 0] | 0;
     if ((f | 0) == (o | 0)) {
      f = o;
      continue a
     } else {
      i = i + 1 | 0;
      h = f
     }
    }
   }
   if ((z | 0) == 11)
    if (!(j >>> 0 > y >>> 0 | (i | 0) != (x | 0))) {
     ns(f | 0, g | 0, h | 0) | 0;
     B = j - e | 0;
     return B | 0
    }
   B = b + -1 - g | 0;
   return B | 0
  }

  function Uf(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    j = 0,
    k = 0,
    l = 0.0,
    m = 0.0;
   k = i;
   i = i + 16 | 0;
   j = k + 4 | 0;
   g = k;
   e = k + 8 | 0;
   f = b + 4 | 0;
   c[f >> 2] = (c[f >> 2] | 0) + 1;
   f = b + 8 | 0;
   c[f >> 2] = (c[f >> 2] | 0) + 1;
   Vf(b);
   Wf(b);
   if (!(a[13734] | 0)) Xf(b, d);
   else {
    f = (a[13731] | 0) == 0;
    a[e >> 0] = f ? -14 : 17;
    a[e + 1 >> 0] = f ? -5 : 17;
    a[e + 2 >> 0] = f ? -1 : 17;
    Xe(d, e);
    Ze(d, .05);
    We(d, 0.0, 0.0, +(c[913] | 0), +(c[914] | 0));
    Ze(d, 1.0)
   }
   Oe(d);
   cf(d, +((c[913] | 0) / 2 | 0 | 0), +((c[914] | 0) / 2 | 0 | 0));
   l = +h[b + 72 >> 3];
   bf(d, l, l);
   cf(d, - +h[b + 56 >> 3], - +h[b + 64 >> 3]);
   f = c[b >> 2] | 0;
   e = c[f + 540 >> 2] | 0;
   f = c[f + 544 >> 2] | 0;
   if ((e | 0) != (f | 0))
    do {
     ac(c[e >> 2] | 0, d);
     e = e + 4 | 0
    } while ((e | 0) != (f | 0));
   Pe(d);
   do
    if (a[b + 160 >> 0] | 0) {
     if ((a[13732] | 0) == 0 ? (a[(c[b >> 2] | 0) + 588 >> 0] | 0) == 0 : 0) break;
     e = b + 172 | 0;
     Ne(e, j, g);
     f = c[913] | 0;
     l = +(f | 0) / 1920.0;
     m = +(c[914] | 0) / 1080.0;
     g = ~~((m < l ? m : l) * 10.0);
     ef(d, e, +(f - (c[j >> 2] | 0) - g | 0), +(g | 0))
    }
   while (0);
   Yf(b, d);
   Zf(b, d);
   _f(b, d);
   $f(b, d);
   a[b + 17 >> 0] = 1;
   i = k;
   return
  }

  function Vf(b) {
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    j = 0.0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0;
   y = i;
   i = i + 16 | 0;
   x = y;
   d = b + 17 | 0;
   if (!(a[d >> 0] | 0)) {
    i = y;
    return
   }
   a[d >> 0] = 0;
   w = b + 132 | 0;
   ig(w, +h[b + 24 >> 3], +h[b + 32 >> 3], +h[b + 40 >> 3], +h[b + 48 >> 3]);
   q = b + 128 | 0;
   c[q >> 2] = 0;
   r = c[b >> 2] | 0;
   d = c[r + 540 >> 2] | 0;
   r = c[r + 544 >> 2] | 0;
   if ((d | 0) == (r | 0)) {
    i = y;
    return
   }
   s = b + 140 | 0;
   t = b + 136 | 0;
   u = b + 144 | 0;
   v = b + 148 | 0;
   do {
    e = c[d >> 2] | 0;
    Tb(e);
    $b(e);
    if (Yb(e) | 0 ? (a[e + 226 >> 0] | 0) == 0 : 0) {
     p = e + 228 | 0;
     k = c[p >> 2] | 0;
     n = e + 232 | 0;
     o = c[n >> 2] | 0;
     if ((k | 0) == (o | 0)) {
      f = k;
      e = k
     } else {
      do {
       c[x >> 2] = k;
       j = (+g[k + 4 >> 2] - +g[w >> 2]) / 50.0;
       if (!(j <= 0.0)) {
        m = ~~j >>> 0;
        f = c[s >> 2] | 0;
        f = m >>> 0 < f >>> 0 ? m : f + -1 | 0
       } else f = 0;
       j = (+g[k + 8 >> 2] - +g[t >> 2]) / 50.0;
       if (!(j <= 0.0)) {
        m = ~~j >>> 0;
        e = c[u >> 2] | 0;
        e = m >>> 0 < e >>> 0 ? m : e + -1 | 0
       } else e = 0;
       e = (_(c[s >> 2] | 0, e) | 0) + f | 0;
       f = c[v >> 2] | 0;
       l = f + (e * 12 | 0) + 4 | 0;
       m = c[l >> 2] | 0;
       if ((m | 0) == (c[f + (e * 12 | 0) + 8 >> 2] | 0)) jg(f + (e * 12 | 0) | 0, x);
       else {
        c[m >> 2] = k;
        c[l >> 2] = (c[l >> 2] | 0) + 4
       }
       k = k + 28 | 0
      } while ((k | 0) != (o | 0));
      f = c[n >> 2] | 0;
      e = c[p >> 2] | 0
     }
     c[q >> 2] = (c[q >> 2] | 0) + ((f - e | 0) / 28 | 0)
    }
    d = d + 4 | 0
   } while ((d | 0) != (r | 0));
   f = c[b >> 2] | 0;
   d = c[f + 540 >> 2] | 0;
   f = c[f + 544 >> 2] | 0;
   if ((d | 0) == (f | 0)) {
    i = y;
    return
   }
   do {
    e = c[d >> 2] | 0;
    if (Yb(e) | 0 ? (a[e + 226 >> 0] | 0) == 0 : 0) Xb(e);
    d = d + 4 | 0
   } while ((d | 0) != (f | 0));
   i = y;
   return
  }

  function Wf(b) {
   b = b | 0;
   var d = 0.0,
    e = 0.0,
    f = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0.0,
    o = 0.0;
   i = c[b >> 2] | 0;
   k = c[i + 528 >> 2] | 0;
   m = c[i + 532 >> 2] | 0;
   l = (k | 0) == (m | 0);
   if (l) d = +h[b + 96 >> 3] * +h[b + 112 >> 3];
   else {
    f = k;
    d = 0.0;
    do {
     d = d + +g[(c[f >> 2] | 0) + 16 >> 2];
     f = f + 4 | 0
    } while ((f | 0) != (m | 0));
    d = 64.0 / d;
    d = +P(+(d > 1.0 ? 1.0 : d), .4);
    d = d * +h[b + 112 >> 3]
   }
   if (a[13734] | 0) d = d * (+R(+(+h[i + 672 >> 3] * 3.141592653589793 / 3.0e3)) * .05 + 1.05);
   h[b + 120 >> 3] = d;
   f = b + 16 | 0;
   if (!(a[f >> 0] | 0)) {
    j = b + 104 | 0;
    d = (d + +h[j >> 3] * 9.0) / 10.0;
    h[j >> 3] = d;
    f = b + 72 | 0
   } else {
    a[f >> 0] = 0;
    j = b + 104 | 0;
    h[j >> 3] = d;
    f = b + 72 | 0;
    h[f >> 3] = d;
    h[b + 96 >> 3] = d
   }
   e = +(c[914] | 0) / 1080.0;
   n = +(c[913] | 0) / 1920.0;
   i = b + 56 | 0;
   h[f >> 3] = d * (e < n ? n : e);
   if (l) {
    h[i >> 3] = (+h[i >> 3] * 29.0 + +h[b + 80 >> 3]) / 30.0;
    m = b + 64 | 0;
    h[m >> 3] = (+h[m >> 3] * 29.0 + +h[b + 88 >> 3]) / 30.0;
    return
   } else {
    f = k;
    e = 0.0;
    d = 0.0
   }
   do {
    l = c[f >> 2] | 0;
    _b(l);
    e = e + +g[l + 8 >> 2];
    d = d + +g[l + 12 >> 2];
    f = f + 4 | 0
   } while ((f | 0) != (m | 0));
   m = c[b >> 2] | 0;
   n = +h[j >> 3];
   o = +((c[m + 532 >> 2] | 0) - (c[m + 528 >> 2] | 0) >> 2 >>> 0);
   h[i >> 3] = (e / o + +h[i >> 3] * 2.0) / 3.0;
   m = b + 64 | 0;
   h[m >> 3] = (d / o + +h[m >> 3] * 2.0) / 3.0;
   m = b + 80 | 0;
   c[m >> 2] = c[i >> 2];
   c[m + 4 >> 2] = c[i + 4 >> 2];
   c[m + 8 >> 2] = c[i + 8 >> 2];
   c[m + 12 >> 2] = c[i + 12 >> 2];
   h[b + 96 >> 3] = n * 1.1;
   return
  }

  function Xf(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0.0,
    j = 0,
    k = 0,
    l = 0,
    m = 0.0,
    n = 0.0;
   l = i;
   i = i + 16 | 0;
   e = l + 3 | 0;
   f = l;
   k = b + 72 | 0;
   g = +h[k >> 3] * .2;
   if (g < .01) {
    i = l;
    return
   }
   Oe(d);
   j = (a[13731] | 0) == 0;
   a[e >> 0] = j ? -14 : 17;
   a[e + 1 >> 0] = j ? -5 : 17;
   a[e + 2 >> 0] = j ? -1 : 17;
   Xe(d, e);
   We(d, 0.0, 0.0, +(c[913] | 0), +(c[914] | 0));
   j = (a[13731] | 0) == 0 ? 0 : -86;
   a[f >> 0] = j;
   a[f + 1 >> 0] = j;
   a[f + 2 >> 0] = j;
   Ye(d, f);
   Ze(d, g);
   g = +h[k >> 3];
   f = ~~(+(c[913] | 0) / g);
   j = ~~(+(c[914] | 0) / g);
   Te(d);
   e = (~~(+((f | 0) / 2 | 0 | 0) - +h[b + 56 >> 3]) | 0) % 50 | 0;
   if ((e | 0) < (f | 0)) {
    g = +(j | 0);
    do {
     n = +(e | 0);
     _e(d, n * +h[k >> 3] + -.5, 0.0);
     m = +h[k >> 3];
     $e(d, n * m + -.5, g * m);
     e = e + 50 | 0
    } while ((e | 0) < (f | 0))
   }
   e = (~~(+((j | 0) / 2 | 0 | 0) - +h[b + 64 >> 3]) | 0) % 50 | 0;
   if ((e | 0) < (j | 0)) {
    g = +(f | 0);
    do {
     m = +(e | 0);
     _e(d, 0.0, m * +h[k >> 3] + -.5);
     n = +h[k >> 3];
     $e(d, g * n, m * n + -.5);
     e = e + 50 | 0
    } while ((e | 0) < (j | 0))
   }
   Re(d);
   Pe(d);
   i = l;
   return
  }

  function Yf(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0.0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0.0;
   p = i;
   i = i + 144 | 0;
   f = p;
   j = p + 16 | 0;
   n = p + 4 | 0;
   m = c[b >> 2] | 0;
   e = ~~+h[m + 616 >> 3];
   if ((a[m + 34 >> 0] | 0) != 0 | (e | 0) == 0) {
    i = p;
    return
   }
   c[f >> 2] = e;
   Ki(j, 128, 18575, f) | 0;
   m = b + 184 | 0;
   g = +(c[913] | 0) / 1920.0;
   q = +(c[914] | 0) / 1080.0;
   g = +(~~((q < g ? q : g) * 24.0) | 0);
   e = b + 200 | 0;
   if (!(+h[e >> 3] == g)) {
    a[b + 231 >> 0] = 1;
    h[e >> 3] = g
   }
   sj(n, j, Xi(j) | 0);
   l = b + 188 | 0;
   k = a[n >> 0] | 0;
   j = (k & 1) == 0;
   k = j ? (k & 255) >>> 1 : c[n + 4 >> 2] | 0;
   f = a[l >> 0] | 0;
   e = (f & 1) == 0;
   a: do
    if ((k | 0) == ((e ? (f & 255) >>> 1 : c[b + 192 >> 2] | 0) | 0)) {
     f = j ? n + 1 | 0 : c[n + 8 >> 2] | 0;
     e = e ? l + 1 | 0 : c[b + 196 >> 2] | 0;
     if (!j)
      if (!(Vi(f, e, k) | 0)) break;
      else {
       o = 10;
       break
      }
     if (k)
      while (1) {
       if ((a[f >> 0] | 0) != (a[e >> 0] | 0)) {
        o = 10;
        break a
       }
       k = k + -1 | 0;
       if (!k) break;
       else {
        f = f + 1 | 0;
        e = e + 1 | 0
       }
      }
    } else o = 10;
   while (0);
   if ((o | 0) == 10) {
    a[b + 231 >> 0] = 1;
    vj(l, n) | 0
   }
   uj(n);
   b = tf(m) | 0;
   q = +(c[913] | 0) / 1920.0;
   o = c[914] | 0;
   g = +(o | 0) / 1080.0;
   q = g < q ? g : q;
   ef(d, b, +(~~(q * 10.0) | 0), +(o - ~~(q * 40.0) | 0));
   i = p;
   return
  }

  function Zf(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0.0,
    n = 0.0,
    o = 0;
   l = i;
   i = i + 48 | 0;
   e = l + 35 | 0;
   f = l + 32 | 0;
   j = l + 20 | 0;
   k = l + 8 | 0;
   h = l + 4 | 0;
   g = l;
   if (!(a[b + 161 >> 0] | 0)) {
    i = l;
    return
   }
   o = b + 176 | 0;
   m = +(c[913] | 0) * .6 / 200.0;
   Me(o, ~~(m * 200.0), ~~(m * 20.0));
   bf(o, m, m);
   Ze(o, .4);
   a[e >> 0] = 0;
   a[e + 1 >> 0] = 0;
   a[e + 2 >> 0] = 0;
   Xe(o, e);
   We(o, 0.0, 0.0, 200.0, 20.0);
   Ze(o, 1.0);
   a[f >> 0] = -1;
   a[f + 1 >> 0] = -1;
   a[f + 2 >> 0] = -1;
   Xe(o, f);
   sj(j, 18585, 29);
   lf(o, 4.0);
   b = j + 8 | 0;
   f = j + 1 | 0;
   m = +(~~(100.0 - +kf(o, (a[j >> 0] & 1) == 0 ? f : c[b >> 2] | 0) * .5) | 0);
   hf(o, (a[j >> 0] & 1) == 0 ? f : c[b >> 2] | 0, m, 7.0);
   sj(k, 18615, 84);
   lf(o, 4.0);
   b = k + 8 | 0;
   f = k + 1 | 0;
   m = +(~~(100.0 - +kf(o, (a[k >> 0] & 1) == 0 ? f : c[b >> 2] | 0) * .5) | 0);
   hf(o, (a[k >> 0] & 1) == 0 ? f : c[b >> 2] | 0, m, 14.0);
   uj(k);
   uj(j);
   Ne(o, h, g);
   k = c[913] | 0;
   b = c[914] | 0;
   m = +(k | 0) / 1920.0;
   n = +(b | 0) / 1080.0;
   ef(d, o, +((k - (c[h >> 2] | 0) | 0) / 2 | 0 | 0), +(b - (c[g >> 2] | 0) - ~~((n < m ? n : m) * 20.0) | 0));
   i = l;
   return
  }

  function _f(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0.0,
    f = 0,
    g = 0,
    j = 0.0,
    k = 0.0,
    l = 0.0,
    m = 0,
    n = 0;
   n = i;
   i = i + 16 | 0;
   m = n;
   do
    if ((a[18700] | 0) == 0 ? (f = c[b >> 2] | 0, (a[f + 33 >> 0] | 0) != 0) : 0) {
     if ((c[f + 528 >> 2] | 0) == (c[f + 532 >> 2] | 0) ? (a[f + 34 >> 0] | 0) == 0 : 0) {
      g = 6;
      break
     }
     a[18701] = 0;
     l = +h[88] + -.05;
     h[88] = l;
     if (l < 0.0) {
      h[88] = 0.0;
      a[18702] = 0
     }
    } else g = 6;
   while (0);
   do
    if ((g | 0) == 6) {
     e = +h[88] + ((a[18702] | 0) != 0 ? .016666666666666666 : .05);
     h[88] = e;
     if (e > 1.0) {
      h[88] = 1.0;
      a[18702] = 0;
      e = 1.0
     }
     if (a[18701] | 0) {
      if (!(a[3296] | 0)) {
       sf(3292);
       if (!(a[3296] | 0)) break;
       e = +h[88]
      }
      Ze(d, e);
      f = a[3296] | 0;
      if (!(f << 24 >> 24)) {
       sf(3292);
       f = a[3296] | 0;
       e = +(c[825] | 0);
       if (!(f << 24 >> 24)) {
        sf(3292);
        f = a[3296] | 0
       }
      } else e = +(c[825] | 0);
      j = +(c[826] | 0);
      l = +(c[913] | 0);
      b = c[914] | 0;
      k = +(b | 0);
      f = f << 24 >> 24 == 0;
      if (e / j < l / k) {
       if (f) {
        sf(3292);
        e = +(c[826] | 0) * +(c[913] | 0);
        if (!(a[3296] | 0)) sf(3292)
       } else e = j * l;
       b = c[914] | 0;
       j = e / +(c[825] | 0);
       e = l
      } else {
       if (f) {
        sf(3292);
        f = c[914] | 0;
        e = +(c[825] | 0) * +(f | 0);
        if (!(a[3296] | 0)) {
         sf(3292);
         f = c[914] | 0
        }
       } else {
        e = +(c[825] | 0) * k;
        f = b
       }
       b = f;
       j = +(f | 0);
       e = e / +(c[826] | 0)
      }
      gf(d, 3292, (+(c[913] | 0) - e) * .5, (+(b | 0) - j) * .5, e, j)
     }
    }
   while (0);
   Ze(d, +h[88] * .5);
   a[m >> 0] = 0;
   a[m + 1 >> 0] = 0;
   a[m + 2 >> 0] = 0;
   Xe(d, m);
   We(d, 0.0, 0.0, +(c[913] | 0), +(c[914] | 0));
   Ze(d, 1.0);
   i = n;
   return
  }

  function $f(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0.0,
    f = 0,
    g = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0.0;
   v = i;
   i = i + 48 | 0;
   t = v + 24 | 0;
   r = v + 12 | 0;
   s = v;
   if (a[(c[b >> 2] | 0) + 33 >> 0] | 0) {
    i = v;
    return
   }
   sj(t, 18703, 10);
   p = b + 248 | 0;
   e = +(c[913] | 0) / 1920.0;
   w = +(c[914] | 0) / 1080.0;
   e = +(~~((w < e ? w : e) * 72.0) | 0);
   f = b + 264 | 0;
   if (!(+h[f >> 3] == e)) {
    a[b + 295 >> 0] = 1;
    h[f >> 3] = e
   }
   o = b + 252 | 0;
   k = a[t >> 0] | 0;
   j = (k & 1) == 0;
   m = t + 4 | 0;
   k = j ? (k & 255) >>> 1 : c[m >> 2] | 0;
   q = a[o >> 0] | 0;
   f = (q & 1) == 0;
   n = b + 256 | 0;
   a: do
    if ((k | 0) == ((f ? (q & 255) >>> 1 : c[n >> 2] | 0) | 0)) {
     g = j ? t + 1 | 0 : c[t + 8 >> 2] | 0;
     f = f ? o + 1 | 0 : c[b + 260 >> 2] | 0;
     if (!j)
      if (!(Vi(g, f, k) | 0)) break;
      else {
       u = 10;
       break
      }
     if (k)
      while (1) {
       if ((a[g >> 0] | 0) != (a[f >> 0] | 0)) {
        u = 10;
        break a
       }
       k = k + -1 | 0;
       if (!k) break;
       else {
        g = g + 1 | 0;
        f = f + 1 | 0
       }
      }
    } else u = 10;
   while (0);
   if ((u | 0) == 10) {
    a[b + 295 >> 0] = 1;
    vj(o, t) | 0
   }
   tf(p) | 0;
   l = c[b + 300 >> 2] | 0;
   tf(p) | 0;
   q = c[b + 304 >> 2] | 0;
   f = (~~(+h[(c[b >> 2] | 0) + 672 >> 3] / 300.0) | 0) % 6 | 0;
   f = (f | 0) > 3 ? 6 - f | 0 : f;
   if ((f | 0) > 0) {
    g = 0;
    do {
     Bj(t, 22020) | 0;
     g = g + 1 | 0
    } while ((g | 0) != (f | 0))
   }
   j = a[t >> 0] | 0;
   k = (j & 1) == 0;
   j = k ? (j & 255) >>> 1 : c[m >> 2] | 0;
   m = a[o >> 0] | 0;
   f = (m & 1) == 0;
   b: do
    if ((j | 0) == ((f ? (m & 255) >>> 1 : c[n >> 2] | 0) | 0)) {
     g = k ? t + 1 | 0 : c[t + 8 >> 2] | 0;
     f = f ? o + 1 | 0 : c[b + 260 >> 2] | 0;
     if (!k)
      if (!(Vi(g, f, j) | 0)) break;
      else {
       u = 19;
       break
      }
     if (j)
      while (1) {
       if ((a[g >> 0] | 0) != (a[f >> 0] | 0)) {
        u = 19;
        break b
       }
       j = j + -1 | 0;
       if (!j) break;
       else {
        g = g + 1 | 0;
        f = f + 1 | 0
       }
      }
    } else u = 19;
   while (0);
   if ((u | 0) == 19) {
    a[b + 295 >> 0] = 1;
    vj(o, t) | 0
   }
   n = tf(p) | 0;
   ef(d, n, +(((c[913] | 0) - l | 0) / 2 | 0 | 0), +(((c[914] | 0) - q | 0) / 2 | 0 | 0));
   n = b + 312 | 0;
   e = +(c[913] | 0) / 1920.0;
   w = +(c[914] | 0) / 1080.0;
   e = +(~~((w < e ? w : e) * 16.0) | 0);
   f = b + 328 | 0;
   if (!(+h[f >> 3] == e)) {
    a[b + 359 >> 0] = 1;
    h[f >> 3] = e
   }
   m = b + 376 | 0;
   f = b + 392 | 0;
   if (!(+h[f >> 3] == e)) {
    a[b + 423 >> 0] = 1;
    h[f >> 3] = e
   }
   sj(r, 18714, 55);
   l = b + 316 | 0;
   k = a[r >> 0] | 0;
   j = (k & 1) == 0;
   k = j ? (k & 255) >>> 1 : c[r + 4 >> 2] | 0;
   p = a[l >> 0] | 0;
   f = (p & 1) == 0;
   c: do
    if ((k | 0) == ((f ? (p & 255) >>> 1 : c[b + 320 >> 2] | 0) | 0)) {
     g = j ? r + 1 | 0 : c[r + 8 >> 2] | 0;
     f = f ? l + 1 | 0 : c[b + 324 >> 2] | 0;
     if (!j)
      if (!(Vi(g, f, k) | 0)) break;
      else {
       u = 30;
       break
      }
     if (k)
      while (1) {
       if ((a[g >> 0] | 0) != (a[f >> 0] | 0)) {
        u = 30;
        break c
       }
       k = k + -1 | 0;
       if (!k) break;
       else {
        g = g + 1 | 0;
        f = f + 1 | 0
       }
      }
    } else u = 30;
   while (0);
   if ((u | 0) == 30) {
    a[b + 359 >> 0] = 1;
    vj(l, r) | 0
   }
   uj(r);
   sj(s, 18770, 52);
   l = b + 380 | 0;
   k = a[s >> 0] | 0;
   j = (k & 1) == 0;
   k = j ? (k & 255) >>> 1 : c[s + 4 >> 2] | 0;
   r = a[l >> 0] | 0;
   f = (r & 1) == 0;
   d: do
    if ((k | 0) == ((f ? (r & 255) >>> 1 : c[b + 384 >> 2] | 0) | 0)) {
     g = j ? s + 1 | 0 : c[s + 8 >> 2] | 0;
     f = f ? l + 1 | 0 : c[b + 388 >> 2] | 0;
     if (!j)
      if (!(Vi(g, f, k) | 0)) break;
      else {
       u = 37;
       break
      }
     if (k)
      while (1) {
       if ((a[g >> 0] | 0) != (a[f >> 0] | 0)) {
        u = 37;
        break d
       }
       k = k + -1 | 0;
       if (!k) break;
       else {
        g = g + 1 | 0;
        f = f + 1 | 0
       }
      }
    } else u = 37;
   while (0);
   if ((u | 0) == 37) {
    a[b + 423 >> 0] = 1;
    vj(l, s) | 0
   }
   uj(s);
   u = tf(n) | 0;
   s = c[913] | 0;
   tf(n) | 0;
   r = c[914] | 0;
   w = +(c[913] | 0) / 1920.0;
   e = +(r | 0) / 1080.0;
   ef(d, u, +((s - (c[b + 364 >> 2] | 0) | 0) / 2 | 0 | 0), +(~~((e < w ? e : w) * 88.0) + ((r - q | 0) / 2 | 0) | 0));
   r = tf(m) | 0;
   s = c[913] | 0;
   tf(m) | 0;
   u = c[914] | 0;
   w = +(c[913] | 0) / 1920.0;
   e = +(u | 0) / 1080.0;
   ef(d, r, +((s - (c[b + 428 >> 2] | 0) | 0) / 2 | 0 | 0), +(~~((e < w ? e : w) * 108.0) + ((u - q | 0) / 2 | 0) | 0));
   uj(t);
   i = v;
   return
  }

  function ag(b) {
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0;
   f = b + 8 | 0;
   d = c[f >> 2] | 0;
   c[b + 12 >> 2] = d;
   c[f >> 2] = 0;
   if (!(a[(c[b >> 2] | 0) + 688 >> 0] | 0)) return;
   f = b + 164 | 0;
   if ((d | 0) < 20) {
    e = c[f >> 2] | 0;
    c[f >> 2] = e + 1;
    if ((e | 0) > 4 ? (c[b + 168 >> 2] | 0) == 0 : 0) a[b + 161 >> 0] = 1
   } else c[f >> 2] = 0;
   e = b + 161 | 0;
   if (!(a[e >> 0] | 0)) return;
   d = b + 168 | 0;
   b = c[d >> 2] | 0;
   c[d >> 2] = b + 1;
   if ((b | 0) <= 9) return;
   a[e >> 0] = 0;
   c[d >> 2] = -1;
   c[f >> 2] = 0;
   return
  }

  function bg(a) {
   a = a | 0;
   var b = 0,
    d = 0;
   if (!(Af() | 0)) return;
   Vf(a);
   if (!(Af() | 0)) return;
   b = c[a >> 2] | 0;
   a = c[b + 540 >> 2] | 0;
   b = c[b + 544 >> 2] | 0;
   if ((a | 0) == (b | 0)) return;
   do {
    d = c[a >> 2] | 0;
    _b(d);
    bc(d, 0);
    a = a + 4 | 0
   } while (!((a | 0) == (b | 0) | (Af() | 0) ^ 1));
   return
  }

  function cg(a) {
   a = a | 0;
   dg(a);
   return
  }

  function dg(b) {
   b = b | 0;
   var d = 0,
    e = 0.0,
    f = 0.0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0,
    F = 0,
    G = 0,
    H = 0,
    I = 0,
    J = 0,
    K = 0,
    L = 0,
    M = 0,
    N = 0,
    O = 0,
    P = 0,
    Q = 0;
   P = i;
   i = i + 224 | 0;
   G = P + 192 | 0;
   d = P + 213 | 0;
   h = P + 210 | 0;
   j = P + 36 | 0;
   L = P + 24 | 0;
   I = P + 207 | 0;
   J = P + 204 | 0;
   M = P + 48 | 0;
   K = P + 12 | 0;
   N = P;
   if (!(qf() | 0)) {
    i = P;
    return
   }
   l = b + 160 | 0;
   a[l >> 0] = 1;
   O = b + 172 | 0;
   k = c[b >> 2] | 0;
   H = k + 36 | 0;
   m = k + 48 | 0;
   n = k + 52 | 0;
   if ((c[m >> 2] | 0) == (c[n >> 2] | 0)) e = +((((c[k + 40 >> 2] | 0) - (c[H >> 2] | 0) >> 4) * 24 | 0) + 60 | 0);
   else e = 240.0;
   f = +(c[913] | 0) * .1 / 200.0;
   Me(O, ~~(f * 200.0), ~~(e * f));
   bf(O, f, f);
   Ze(O, .4);
   a[d >> 0] = 0;
   a[d + 1 >> 0] = 0;
   a[d + 2 >> 0] = 0;
   Xe(O, d);
   We(O, 0.0, 0.0, 200.0, e);
   Ze(O, 1.0);
   a[h >> 0] = -1;
   a[h + 1 >> 0] = -1;
   a[h + 2 >> 0] = -1;
   Xe(O, h);
   sj(j, 18823, 11);
   lf(O, 30.0);
   d = j + 8 | 0;
   F = j + 1 | 0;
   f = +(~~(100.0 - +kf(O, (a[j >> 0] & 1) == 0 ? F : c[d >> 2] | 0) * .5) | 0);
   hf(O, (a[j >> 0] & 1) == 0 ? F : c[d >> 2] | 0, f, 40.0);
   uj(j);
   d = c[m >> 2] | 0;
   if ((d | 0) != (c[n >> 2] | 0)) {
    e = 0.0;
    h = 0;
    do {
     f = e;
     e = e + +g[d + (h << 2) >> 2] * 3.141592653589793 * 2.0;
     if ((a[712] | 0) == 0 ? (ya(712) | 0) != 0 : 0) {
      a[18854] = 51;
      a[18855] = 51;
      a[18856] = 51;
      a[18857] = -1;
      a[18858] = 51;
      a[18859] = 51;
      a[18860] = 51;
      a[18861] = -1;
      a[18862] = 51;
      a[18863] = 51;
      a[18864] = 51;
      a[18865] = -1;
      Ga(712)
     }
     h = h + 1 | 0;
     Xe(O, 18854 + (h * 3 | 0) | 0);
     Te(O);
     _e(O, 100.0, 140.0);
     af(O, 100.0, 140.0, 80.0, f, e, 0);
     Qe(O);
     d = c[m >> 2] | 0
    } while (h >>> 0 < (c[n >> 2] | 0) - d >> 2 >>> 0);
    i = P;
    return
   }
   F = k + 40 | 0;
   if ((c[H >> 2] | 0) == (c[F >> 2] | 0)) {
    a[l >> 0] = 0;
    i = P;
    return
   }
   lf(O, 20.0);
   d = c[H >> 2] | 0;
   if ((c[F >> 2] | 0) == (d | 0)) {
    i = P;
    return
   }
   k = J + 1 | 0;
   l = J + 2 | 0;
   m = M + 64 | 0;
   n = M + 8 | 0;
   o = M + 12 | 0;
   p = M + 64 | 0;
   q = M + 4 | 0;
   r = M + 64 | 0;
   s = M + 136 | 0;
   t = M + 140 | 0;
   u = M + 44 | 0;
   v = M + 60 | 0;
   w = M + 8 | 0;
   x = L + 4 | 0;
   y = K + 8 | 0;
   z = K + 1 | 0;
   A = K + 4 | 0;
   B = N + 8 | 0;
   C = N + 1 | 0;
   D = I + 1 | 0;
   E = I + 2 | 0;
   j = 0;
   do {
    rj(L, d + (j << 4) + 4 | 0);
    if (!(c[(c[H >> 2] | 0) + (j << 4) >> 2] & 1)) {
     a[J >> 0] = -1;
     a[k >> 0] = -1;
     a[l >> 0] = -1;
     Xe(O, J)
    } else {
     h = c[b >> 2] | 0;
     d = c[h + 528 >> 2] | 0;
     if ((d | 0) != (c[h + 532 >> 2] | 0)) vj(L, (c[d >> 2] | 0) + 84 | 0) | 0;
     a[I >> 0] = -1;
     a[D >> 0] = -86;
     a[E >> 0] = -86;
     Xe(O, I)
    }
    c[n >> 2] = 3340;
    c[M >> 2] = 3380;
    c[p >> 2] = 3400;
    c[q >> 2] = 0;
    Yj(r, o);
    c[s >> 2] = 0;
    c[t >> 2] = -1;
    c[M >> 2] = 3320;
    c[m >> 2] = 3360;
    c[n >> 2] = 3340;
    $j(o);
    c[o >> 2] = 3416;
    c[u >> 2] = 0;
    c[u + 4 >> 2] = 0;
    c[u + 8 >> 2] = 0;
    c[u + 12 >> 2] = 0;
    c[v >> 2] = 24;
    c[G >> 2] = 0;
    c[G + 4 >> 2] = 0;
    c[G + 8 >> 2] = 0;
    kg(o, G);
    uj(G);
    d = j;
    j = j + 1 | 0;
    lg(xk(w, j) | 0, 18835, 2) | 0;
    h = a[L >> 0] | 0;
    if ((a[13732] | 0) == 0 ? 1 : (((h & 1) == 0 ? (h & 255) >>> 1 : c[x >> 2] | 0) | 0) == 0) sj(K, 18838, 15);
    else rj(K, L);
    h = a[K >> 0] | 0;
    Q = (h & 1) == 0;
    lg(w, Q ? z : c[y >> 2] | 0, Q ? (h & 255) >>> 1 : c[A >> 2] | 0) | 0;
    uj(K);
    mg(N, o);
    h = ~~+kf(O, (a[N >> 0] & 1) == 0 ? C : c[B >> 2] | 0);
    d = (d * 24 | 0) + 70 | 0;
    if ((h | 0) > 195) hf(O, (a[N >> 0] & 1) == 0 ? C : c[B >> 2] | 0, 10.0, +(d | 0));
    else hf(O, (a[N >> 0] & 1) == 0 ? C : c[B >> 2] | 0, +((200 - h | 0) / 2 | 0 | 0), +(d | 0));
    uj(N);
    c[M >> 2] = 3320;
    c[p >> 2] = 3360;
    c[w >> 2] = 3340;
    c[o >> 2] = 3416;
    uj(u);
    Zj(o);
    Uj(p);
    uj(L);
    d = c[H >> 2] | 0
   } while (j >>> 0 < (c[F >> 2] | 0) - d >> 4 >>> 0);
   i = P;
   return
  }

  function eg(a, b) {
   a = a | 0;
   b = +b;
   var c = 0,
    d = 0.0;
   c = a + 112 | 0;
   d = +h[c >> 3] * +P(.9, +b);
   d = d < 1.0 ? 1.0 : d;
   h[c >> 3] = d;
   b = 4.0 / +h[a + 72 >> 3];
   if (!(d > b)) return;
   h[c >> 3] = b;
   return
  }

  function fg(b) {
   b = b | 0;
   a[18700] = b & 1;
   return
  }

  function gg(b) {
   b = b | 0;
   a[18702] = 1;
   return
  }

  function hg() {
   rf(3292, 18866);
   return
  }

  function ig(a, b, d, e, f) {
   a = a | 0;
   b = +b;
   d = +d;
   e = +e;
   f = +f;
   var h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0;
   g[a >> 2] = b;
   g[a + 4 >> 2] = d;
   n = ~~((e - b) / 50.0) >>> 0;
   c[a + 8 >> 2] = n;
   p = ~~((f - d) / 50.0) >>> 0;
   c[a + 12 >> 2] = p;
   p = _(n, p) | 0;
   n = a + 16 | 0;
   o = a + 20 | 0;
   i = c[o >> 2] | 0;
   h = c[n >> 2] | 0;
   if (((i - h | 0) / 12 | 0) >>> 0 > p >>> 0) {
    h = i;
    while (1) {
     i = h + -12 | 0;
     do {
      j = h + -12 | 0;
      c[o >> 2] = j;
      k = c[j >> 2] | 0;
      l = k;
      if (!k) h = j;
      else {
       h = h + -8 | 0;
       j = c[h >> 2] | 0;
       if ((j | 0) != (k | 0)) c[h >> 2] = j + (~((j + -4 - l | 0) >>> 2) << 2);
       mh(k);
       h = c[o >> 2] | 0
      }
     } while ((h | 0) != (i | 0));
     h = c[n >> 2] | 0;
     if (((i - h | 0) / 12 | 0) >>> 0 > p >>> 0) h = i;
     else break
    }
   }
   if ((h | 0) != (i | 0)) {
    k = h;
    do {
     j = c[k >> 2] | 0;
     l = k + 4 | 0;
     m = c[l >> 2] | 0;
     if ((m | 0) != (j | 0)) c[l >> 2] = m + (~((m + -4 - j | 0) >>> 2) << 2);
     k = k + 12 | 0
    } while ((k | 0) != (i | 0))
   }
   if (((i - h | 0) / 12 | 0) >>> 0 >= p >>> 0) return;
   j = a + 24 | 0;
   do
    if (i >>> 0 < (c[j >> 2] | 0) >>> 0) {
     c[i >> 2] = 0;
     c[i + 4 >> 2] = 0;
     c[i + 8 >> 2] = 0;
     i = i + 12 | 0;
     c[o >> 2] = i
    } else {
     Bg(n);
     i = c[o >> 2] | 0;
     h = c[n >> 2] | 0
    }
   while (((i - h | 0) / 12 | 0) >>> 0 < p >>> 0);
   return
  }

  function jg(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   i = a + 4 | 0;
   j = c[a >> 2] | 0;
   k = j;
   e = ((c[i >> 2] | 0) - k >> 2) + 1 | 0;
   if (e >>> 0 > 1073741823) jh(a);
   l = a + 8 | 0;
   f = j;
   d = (c[l >> 2] | 0) - f | 0;
   if (d >> 2 >>> 0 < 536870911) {
    d = d >> 1;
    d = d >>> 0 < e >>> 0 ? e : d;
    f = (c[i >> 2] | 0) - f | 0;
    e = f >> 2;
    if (!d) {
     h = 0;
     g = 0;
     d = f
    } else m = 6
   } else {
    f = (c[i >> 2] | 0) - f | 0;
    d = 1073741823;
    e = f >> 2;
    m = 6
   }
   if ((m | 0) == 6) {
    h = d;
    g = kh(d << 2) | 0;
    d = f
   }
   c[g + (e << 2) >> 2] = c[b >> 2];
   ns(g | 0, j | 0, d | 0) | 0;
   c[a >> 2] = g;
   c[i >> 2] = g + (e + 1 << 2);
   c[l >> 2] = g + (h << 2);
   if (!k) return;
   mh(k);
   return
  }

  function kg(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0;
   i = b + 32 | 0;
   vj(i, d) | 0;
   h = b + 44 | 0;
   c[h >> 2] = 0;
   j = b + 48 | 0;
   g = c[j >> 2] | 0;
   if (g & 8) {
    d = a[i >> 0] | 0;
    if (!(d & 1)) {
     d = ((d & 255) >>> 1) + (i + 1) | 0;
     c[h >> 2] = d;
     e = i + 1 | 0;
     f = i + 1 | 0
    } else {
     d = (c[b + 40 >> 2] | 0) + (c[b + 36 >> 2] | 0) | 0;
     c[h >> 2] = d;
     f = c[b + 40 >> 2] | 0;
     e = f
    }
    c[b + 8 >> 2] = e;
    c[b + 12 >> 2] = f;
    c[b + 16 >> 2] = d
   }
   if (!(g & 16)) return;
   d = a[i >> 0] | 0;
   if (!(d & 1)) {
    g = (d & 255) >>> 1;
    c[h >> 2] = i + 1 + g;
    d = 10;
    h = g
   } else {
    g = c[b + 36 >> 2] | 0;
    c[h >> 2] = (c[b + 40 >> 2] | 0) + g;
    d = (c[i >> 2] & -2) + -1 | 0;
    h = g
   }
   yj(i, d, 0);
   d = a[i >> 0] | 0;
   if (!(d & 1)) {
    g = i + 1 | 0;
    f = (d & 255) >>> 1;
    e = i + 1 | 0
   } else {
    e = c[b + 40 >> 2] | 0;
    g = e;
    f = c[b + 36 >> 2] | 0
   }
   d = b + 24 | 0;
   c[d >> 2] = e;
   c[b + 20 >> 2] = e;
   c[b + 28 >> 2] = g + f;
   if (!(c[j >> 2] & 3)) return;
   c[d >> 2] = e + h;
   return
  }

  function lg(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0;
   n = i;
   i = i + 32 | 0;
   j = n + 16 | 0;
   m = n + 8 | 0;
   k = n;
   vk(m, b);
   if (!(a[m >> 0] | 0)) {
    wk(m);
    i = n;
    return b | 0
   }
   f = c[(c[b >> 2] | 0) + -12 >> 2] | 0;
   c[k >> 2] = c[b + (f + 24) >> 2];
   l = b + f | 0;
   g = d + e | 0;
   h = (c[b + (f + 4) >> 2] & 176 | 0) == 32 ? g : d;
   f = b + (f + 76) | 0;
   e = c[f >> 2] | 0;
   if ((e | 0) == -1) {
    c[j >> 2] = Xj(l) | 0;
    e = Qo(j, 9336) | 0;
    e = Cb[c[(c[e >> 2] | 0) + 28 >> 2] & 15](e, 32) | 0;
    Oo(j);
    e = e << 24 >> 24;
    c[f >> 2] = e
   }
   c[j >> 2] = c[k >> 2];
   if (ng(j, d, h, g, l, e & 255) | 0) {
    wk(m);
    i = n;
    return b | 0
   }
   d = c[(c[b >> 2] | 0) + -12 >> 2] | 0;
   Tj(b + d | 0, c[b + (d + 16) >> 2] | 5);
   wk(m);
   i = n;
   return b | 0
  }

  function mg(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0;
   e = c[d + 48 >> 2] | 0;
   if (e & 16) {
    e = d + 44 | 0;
    f = c[e >> 2] | 0;
    g = c[d + 24 >> 2] | 0;
    if (f >>> 0 < g >>> 0) c[e >> 2] = g;
    else g = f;
    f = c[d + 20 >> 2] | 0;
    h = g - f | 0;
    if (h >>> 0 > 4294967279) ih(b);
    if (h >>> 0 < 11) {
     a[b >> 0] = h << 1;
     e = b + 1 | 0
    } else {
     d = h + 16 & -16;
     e = kh(d) | 0;
     c[b + 8 >> 2] = e;
     c[b >> 2] = d | 1;
     c[b + 4 >> 2] = h
    }
    if ((f | 0) != (g | 0)) {
     d = e;
     while (1) {
      a[d >> 0] = a[f >> 0] | 0;
      f = f + 1 | 0;
      if ((f | 0) == (g | 0)) break;
      else d = d + 1 | 0
     }
     e = e + h | 0
    }
    a[e >> 0] = 0;
    return
   }
   if (!(e & 8)) {
    c[b >> 2] = 0;
    c[b + 4 >> 2] = 0;
    c[b + 8 >> 2] = 0;
    return
   }
   f = c[d + 8 >> 2] | 0;
   d = c[d + 16 >> 2] | 0;
   h = d - f | 0;
   if (h >>> 0 > 4294967279) ih(b);
   if (h >>> 0 < 11) {
    a[b >> 0] = h << 1;
    e = b + 1 | 0
   } else {
    g = h + 16 & -16;
    e = kh(g) | 0;
    c[b + 8 >> 2] = e;
    c[b >> 2] = g | 1;
    c[b + 4 >> 2] = h
   }
   if ((f | 0) != (d | 0)) {
    g = e;
    while (1) {
     a[g >> 0] = a[f >> 0] | 0;
     f = f + 1 | 0;
     if ((f | 0) == (d | 0)) break;
     else g = g + 1 | 0
    }
    e = e + h | 0
   }
   a[e >> 0] = 0;
   return
  }

  function ng(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0;
   o = i;
   i = i + 16 | 0;
   m = o;
   n = c[b >> 2] | 0;
   if (!n) {
    e = 0;
    i = o;
    return e | 0
   }
   p = d;
   k = f - p | 0;
   l = g + 12 | 0;
   j = c[l >> 2] | 0;
   k = (j | 0) > (k | 0) ? j - k | 0 : 0;
   j = e;
   g = j - p | 0;
   if ((g | 0) > 0 ? (pb[c[(c[n >> 2] | 0) + 48 >> 2] & 31](n, d, g) | 0) != (g | 0) : 0) {
    c[b >> 2] = 0;
    p = 0;
    i = o;
    return p | 0
   }
   do
    if ((k | 0) > 0) {
     tj(m, k, h);
     if ((pb[c[(c[n >> 2] | 0) + 48 >> 2] & 31](n, (a[m >> 0] & 1) == 0 ? m + 1 | 0 : c[m + 8 >> 2] | 0, k) | 0) == (k | 0)) {
      uj(m);
      break
     }
     c[b >> 2] = 0;
     uj(m);
     p = 0;
     i = o;
     return p | 0
    }
   while (0);
   f = f - j | 0;
   if ((f | 0) > 0 ? (pb[c[(c[n >> 2] | 0) + 48 >> 2] & 31](n, e, f) | 0) != (f | 0) : 0) {
    c[b >> 2] = 0;
    p = 0;
    i = o;
    return p | 0
   }
   c[l >> 2] = 0;
   p = n;
   i = o;
   return p | 0
  }

  function og(a) {
   a = a | 0;
   c[a >> 2] = 3416;
   uj(a + 32 | 0);
   Zj(a);
   return
  }

  function pg(a) {
   a = a | 0;
   c[a >> 2] = 3416;
   uj(a + 32 | 0);
   Zj(a);
   mh(a);
   return
  }

  function qg(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   i = d + 44 | 0;
   j = c[i >> 2] | 0;
   l = d + 24 | 0;
   m = c[l >> 2] | 0;
   if (j >>> 0 < m >>> 0) {
    c[i >> 2] = m;
    j = m
   }
   k = j;
   i = h & 24;
   if (!i) {
    d = b;
    c[d >> 2] = 0;
    c[d + 4 >> 2] = 0;
    d = b + 8 | 0;
    c[d >> 2] = -1;
    c[d + 4 >> 2] = -1;
    return
   }
   if ((g | 0) == 1 & (i | 0) == 24) {
    d = b;
    c[d >> 2] = 0;
    c[d + 4 >> 2] = 0;
    d = b + 8 | 0;
    c[d >> 2] = -1;
    c[d + 4 >> 2] = -1;
    return
   }
   a: do switch (g | 0) {
     case 0:
      {
       i = 0;g = 0;
       break
      }
     case 1:
      if (!(h & 8)) {
       g = m - (c[d + 20 >> 2] | 0) | 0;
       i = g;
       g = ((g | 0) < 0) << 31 >> 31;
       break a
      } else {
       g = (c[d + 12 >> 2] | 0) - (c[d + 8 >> 2] | 0) | 0;
       i = g;
       g = ((g | 0) < 0) << 31 >> 31;
       break a
      }
     case 2:
      {
       i = d + 32 | 0;
       if (!(a[i >> 0] & 1)) i = i + 1 | 0;
       else i = c[d + 40 >> 2] | 0;g = j - i | 0;i = g;g = ((g | 0) < 0) << 31 >> 31;
       break
      }
     default:
      {
       d = b;c[d >> 2] = 0;c[d + 4 >> 2] = 0;d = b + 8 | 0;c[d >> 2] = -1;c[d + 4 >> 2] = -1;
       return
      }
    }
    while (0);
    g = ms(i | 0, g | 0, e | 0, f | 0) | 0;
   e = C;
   if ((e | 0) >= 0) {
    i = d + 32 | 0;
    if (!(a[i >> 0] & 1)) i = i + 1 | 0;
    else i = c[d + 40 >> 2] | 0;
    f = j - i | 0;
    j = ((f | 0) < 0) << 31 >> 31;
    if (!((j | 0) < (e | 0) | (j | 0) == (e | 0) & f >>> 0 < g >>> 0)) {
     i = h & 8;
     if (!((g | 0) == 0 & (e | 0) == 0)) {
      if ((i | 0) != 0 ? (c[d + 12 >> 2] | 0) == 0 : 0) {
       d = b;
       c[d >> 2] = 0;
       c[d + 4 >> 2] = 0;
       d = b + 8 | 0;
       c[d >> 2] = -1;
       c[d + 4 >> 2] = -1;
       return
      }
      if ((h & 16 | 0) != 0 & (m | 0) == 0) {
       d = b;
       c[d >> 2] = 0;
       c[d + 4 >> 2] = 0;
       d = b + 8 | 0;
       c[d >> 2] = -1;
       c[d + 4 >> 2] = -1;
       return
      }
     }
     if (i) {
      c[d + 12 >> 2] = (c[d + 8 >> 2] | 0) + g;
      c[d + 16 >> 2] = k
     }
     if (h & 16) c[l >> 2] = (c[d + 20 >> 2] | 0) + g;
     d = b;
     c[d >> 2] = 0;
     c[d + 4 >> 2] = 0;
     d = b + 8 | 0;
     c[d >> 2] = g;
     c[d + 4 >> 2] = e;
     return
    }
   }
   d = b;
   c[d >> 2] = 0;
   c[d + 4 >> 2] = 0;
   d = b + 8 | 0;
   c[d >> 2] = -1;
   c[d + 4 >> 2] = -1;
   return
  }

  function rg(a, b, d, e) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   d = d + 8 | 0;
   Bb[c[(c[b >> 2] | 0) + 16 >> 2] & 7](a, b, c[d >> 2] | 0, c[d + 4 >> 2] | 0, 0, e);
   return
  }

  function sg(a) {
   a = a | 0;
   var b = 0,
    e = 0,
    f = 0,
    g = 0;
   b = a + 44 | 0;
   e = c[b >> 2] | 0;
   f = c[a + 24 >> 2] | 0;
   if (e >>> 0 < f >>> 0) {
    c[b >> 2] = f;
    e = f
   }
   if (!(c[a + 48 >> 2] & 8)) {
    a = -1;
    return a | 0
   }
   g = a + 16 | 0;
   b = c[g >> 2] | 0;
   f = a + 12 | 0;
   if (b >>> 0 < e >>> 0) {
    f = c[f >> 2] | 0;
    c[g >> 2] = e;
    b = e
   } else f = c[f >> 2] | 0;
   if (f >>> 0 >= b >>> 0) {
    a = -1;
    return a | 0
   }
   a = d[f >> 0] | 0;
   return a | 0
  }

  function tg(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0;
   f = b + 44 | 0;
   e = c[f >> 2] | 0;
   g = c[b + 24 >> 2] | 0;
   if (e >>> 0 < g >>> 0) {
    c[f >> 2] = g;
    e = g
   }
   j = b + 8 | 0;
   f = c[j >> 2] | 0;
   k = b + 12 | 0;
   h = c[k >> 2] | 0;
   i = f;
   if (f >>> 0 >= h >>> 0) {
    b = -1;
    return b | 0
   }
   if ((d | 0) == -1) {
    c[j >> 2] = f;
    c[k >> 2] = h + -1;
    c[b + 16 >> 2] = e;
    b = 0;
    return b | 0
   }
   if (!(c[b + 48 >> 2] & 16)) {
    g = d & 255;
    f = h + -1 | 0;
    if (g << 24 >> 24 != (a[f >> 0] | 0)) {
     b = -1;
     return b | 0
    }
   } else {
    g = d & 255;
    f = h + -1 | 0
   }
   c[j >> 2] = i;
   c[k >> 2] = f;
   c[b + 16 >> 2] = e;
   a[f >> 0] = g;
   b = d;
   return b | 0
  }

  function ug(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0;
   t = i;
   i = i + 16 | 0;
   o = t;
   if ((d | 0) == -1) {
    b = 0;
    i = t;
    return b | 0
   }
   p = b + 12 | 0;
   q = b + 8 | 0;
   r = (c[p >> 2] | 0) - (c[q >> 2] | 0) | 0;
   s = b + 24 | 0;
   l = c[s >> 2] | 0;
   n = b + 28 | 0;
   e = c[n >> 2] | 0;
   if ((l | 0) == (e | 0)) {
    k = b + 48 | 0;
    if (!(c[k >> 2] & 16)) {
     b = -1;
     i = t;
     return b | 0
    }
    h = b + 20 | 0;
    j = c[h >> 2] | 0;
    g = b + 44 | 0;
    m = (c[g >> 2] | 0) - j | 0;
    f = b + 32 | 0;
    Cj(f, 0);
    if (!(a[f >> 0] & 1)) e = 10;
    else e = (c[f >> 2] & -2) + -1 | 0;
    yj(f, e, 0);
    e = a[f >> 0] | 0;
    if (!(e & 1)) {
     f = f + 1 | 0;
     e = (e & 255) >>> 1
    } else {
     f = c[b + 40 >> 2] | 0;
     e = c[b + 36 >> 2] | 0
    }
    e = f + e | 0;
    c[h >> 2] = f;
    c[n >> 2] = e;
    l = f + (l - j) | 0;
    c[s >> 2] = l;
    f = f + m | 0;
    c[g >> 2] = f;
    j = e
   } else {
    f = b + 44 | 0;
    k = b + 48 | 0;
    g = f;
    f = c[f >> 2] | 0;
    j = e
   }
   h = l + 1 | 0;
   c[o >> 2] = h;
   f = c[(h >>> 0 < f >>> 0 ? g : o) >> 2] | 0;
   c[g >> 2] = f;
   if (c[k >> 2] & 8) {
    e = b + 32 | 0;
    if (!(a[e >> 0] & 1)) e = e + 1 | 0;
    else e = c[b + 40 >> 2] | 0;
    c[q >> 2] = e;
    c[p >> 2] = e + r;
    c[b + 16 >> 2] = f
   }
   if ((l | 0) == (j | 0)) {
    b = Cb[c[(c[b >> 2] | 0) + 52 >> 2] & 15](b, d & 255) | 0;
    i = t;
    return b | 0
   } else {
    c[s >> 2] = h;
    a[l >> 0] = d;
    b = d & 255;
    i = t;
    return b | 0
   }
   return 0
  }

  function vg(a) {
   a = a | 0;
   var b = 0,
    d = 0;
   c[a >> 2] = 3320;
   b = a + 64 | 0;
   c[b >> 2] = 3360;
   c[a + 8 >> 2] = 3340;
   d = a + 12 | 0;
   c[d >> 2] = 3416;
   uj(a + 44 | 0);
   Zj(d);
   Uj(b);
   return
  }

  function wg(a) {
   a = a | 0;
   var b = 0,
    d = 0;
   c[a >> 2] = 3320;
   b = a + 64 | 0;
   c[b >> 2] = 3360;
   c[a + 8 >> 2] = 3340;
   d = a + 12 | 0;
   c[d >> 2] = 3416;
   uj(a + 44 | 0);
   Zj(d);
   Uj(b);
   mh(a);
   return
  }

  function xg(a) {
   a = a | 0;
   var b = 0,
    d = 0;
   d = a + -8 | 0;
   c[d >> 2] = 3320;
   a = d + 64 | 0;
   c[a >> 2] = 3360;
   c[d + 8 >> 2] = 3340;
   b = d + 12 | 0;
   c[b >> 2] = 3416;
   uj(d + 44 | 0);
   Zj(b);
   Uj(a);
   return
  }

  function yg(a) {
   a = a | 0;
   var b = 0,
    d = 0;
   a = a + -8 | 0;
   c[a >> 2] = 3320;
   b = a + 64 | 0;
   c[b >> 2] = 3360;
   c[a + 8 >> 2] = 3340;
   d = a + 12 | 0;
   c[d >> 2] = 3416;
   uj(a + 44 | 0);
   Zj(d);
   Uj(b);
   mh(a);
   return
  }

  function zg(a) {
   a = a | 0;
   var b = 0,
    d = 0,
    e = 0;
   e = c[(c[a >> 2] | 0) + -12 >> 2] | 0;
   c[a + e >> 2] = 3320;
   b = a + (e + 64) | 0;
   c[b >> 2] = 3360;
   c[a + (e + 8) >> 2] = 3340;
   d = a + (e + 12) | 0;
   c[d >> 2] = 3416;
   uj(a + (e + 44) | 0);
   Zj(d);
   Uj(b);
   return
  }

  function Ag(a) {
   a = a | 0;
   var b = 0,
    d = 0,
    e = 0,
    f = 0;
   f = c[(c[a >> 2] | 0) + -12 >> 2] | 0;
   b = a + f | 0;
   c[b >> 2] = 3320;
   d = a + (f + 64) | 0;
   c[d >> 2] = 3360;
   c[a + (f + 8) >> 2] = 3340;
   e = a + (f + 12) | 0;
   c[e >> 2] = 3416;
   uj(a + (f + 44) | 0);
   Zj(e);
   Uj(d);
   mh(b);
   return
  }

  function Bg(a) {
   a = a | 0;
   var b = 0,
    d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0;
   m = a + 4 | 0;
   l = c[a >> 2] | 0;
   d = (((c[m >> 2] | 0) - l | 0) / 12 | 0) + 1 | 0;
   if (d >>> 0 > 357913941) jh(a);
   n = a + 8 | 0;
   i = l;
   b = ((c[n >> 2] | 0) - i | 0) / 12 | 0;
   if (b >>> 0 < 178956970) {
    e = b << 1;
    d = e >>> 0 < d >>> 0 ? d : e;
    e = c[m >> 2] | 0;
    b = e;
    f = (b - i | 0) / 12 | 0;
    if (!d) {
     h = 0;
     j = 0
    } else g = 6
   } else {
    e = c[m >> 2] | 0;
    b = e;
    d = 357913941;
    f = (b - i | 0) / 12 | 0;
    g = 6
   }
   if ((g | 0) == 6) {
    h = d;
    j = kh(d * 12 | 0) | 0
   }
   d = j + (f * 12 | 0) | 0;
   g = d;
   k = j + (h * 12 | 0) | 0;
   c[d >> 2] = 0;
   c[j + (f * 12 | 0) + 4 >> 2] = 0;
   c[j + (f * 12 | 0) + 8 >> 2] = 0;
   h = j + ((f + 1 | 0) * 12 | 0) | 0;
   if ((e | 0) == (l | 0)) {
    e = a;
    f = m;
    d = g
   } else {
    b = g;
    do {
     j = d + -12 | 0;
     i = e;
     e = e + -12 | 0;
     c[j >> 2] = 0;
     g = d + -8 | 0;
     c[g >> 2] = 0;
     c[d + -4 >> 2] = 0;
     c[j >> 2] = c[e >> 2];
     j = i + -8 | 0;
     c[g >> 2] = c[j >> 2];
     i = i + -4 | 0;
     c[d + -4 >> 2] = c[i >> 2];
     c[i >> 2] = 0;
     c[j >> 2] = 0;
     c[e >> 2] = 0;
     d = b + -12 | 0;
     b = d
    } while ((e | 0) != (l | 0));
    e = a;
    f = m;
    d = b;
    i = c[a >> 2] | 0;
    b = c[m >> 2] | 0
   }
   c[e >> 2] = d;
   c[f >> 2] = h;
   c[n >> 2] = k;
   h = i;
   if ((b | 0) != (h | 0))
    do {
     d = b;
     b = b + -12 | 0;
     f = c[b >> 2] | 0;
     g = f;
     if (f) {
      d = d + -8 | 0;
      e = c[d >> 2] | 0;
      if ((e | 0) != (f | 0)) c[d >> 2] = e + (~((e + -4 - g | 0) >>> 2) << 2);
      mh(f)
     }
    } while ((b | 0) != (h | 0));
   if (!i) return;
   mh(i);
   return
  }

  function Cg(a) {
   a = a | 0;
   var b = 0;
   b = c[a >> 2] | 0;
   return +(+((c[a + 4 >> 2] | 0) - ((c[913] | 0) / 2 | 0) | 0) / +h[b + 144 >> 3] + +h[b + 128 >> 3])
  }

  function Dg(a) {
   a = a | 0;
   var b = 0;
   b = c[a >> 2] | 0;
   return +(+((c[a + 8 >> 2] | 0) - ((c[914] | 0) / 2 | 0) | 0) / +h[b + 144 >> 3] + +h[b + 136 >> 3])
  }

  function Eg(b) {
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0;
   f = a[b >> 0] | 0;
   d = (f & 1) == 0;
   if (d) e = (f & 255) >>> 1;
   else e = c[b + 4 >> 2] | 0;
   if (!e) {
    b = 0;
    return b | 0
   }
   if (d) {
    e = b + 1 | 0;
    f = ((f & 255) >>> 1) + (b + 1) | 0;
    d = b + 1 | 0
   } else {
    d = c[b + 8 >> 2] | 0;
    e = d;
    f = d + (c[b + 4 >> 2] | 0) | 0
   }
   if ((e | 0) != (f | 0))
    while (1) {
     g = a[e >> 0] | 0;
     a[d >> 0] = (g + -65 & 255) < 26 ? (g & 255) + 32 & 255 : g;
     e = e + 1 | 0;
     if ((e | 0) == (f | 0)) break;
     else d = d + 1 | 0
    }
   d = Hg(3612, b) | 0;
   if (!d) {
    g = 0;
    return g | 0
   }
   g = c[d + 20 >> 2] | 0;
   return g | 0
  }

  function Fg(b) {
   b = b | 0;
   var d = 0;
   d = a[b >> 0] | 0;
   if (!(((d & 1) == 0 ? (d & 255) >>> 1 : c[b + 4 >> 2] | 0) | 0)) {
    d = 0;
    return d | 0
   }
   b = Hg(3632, b) | 0;
   if (!b) {
    d = 0;
    return d | 0
   }
   d = c[b + 20 >> 2] | 0;
   return d | 0
  }

  function Gg(b, d, e, f, g) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   m = i;
   i = i + 32 | 0;
   j = m + 24 | 0;
   h = m + 12 | 0;
   k = m;
   l = kh(24) | 0;
   sj(l, e, Xi(e) | 0);
   c[l + 12 >> 2] = f;
   c[l + 16 >> 2] = 0;
   a[l + 20 >> 0] = g >>> 16;
   a[l + 21 >> 0] = g >>> 8;
   a[l + 22 >> 0] = g;
   if (b) {
    sj(h, b, Xi(b) | 0);
    g = Hg(3612, h) | 0;
    if (!g) {
     g = kh(24) | 0;
     b = g + 8 | 0;
     c[b >> 2] = c[h >> 2];
     c[b + 4 >> 2] = c[h + 4 >> 2];
     c[b + 8 >> 2] = c[h + 8 >> 2];
     c[h >> 2] = 0;
     c[h + 4 >> 2] = 0;
     c[h + 8 >> 2] = 0;
     c[g + 20 >> 2] = 0;
     Ig(j, 3612, g);
     g = c[j >> 2] | 0
    }
    c[g + 20 >> 2] = l;
    uj(h)
   }
   if (!d) {
    i = m;
    return
   }
   sj(k, d, Xi(d) | 0);
   g = Hg(3632, k) | 0;
   if (!g) {
    g = kh(24) | 0;
    d = g + 8 | 0;
    c[d >> 2] = c[k >> 2];
    c[d + 4 >> 2] = c[k + 4 >> 2];
    c[d + 8 >> 2] = c[k + 8 >> 2];
    c[k >> 2] = 0;
    c[k + 4 >> 2] = 0;
    c[k + 8 >> 2] = 0;
    c[g + 20 >> 2] = 0;
    Ig(j, 3632, g);
    g = c[j >> 2] | 0
   }
   c[g + 20 >> 2] = l;
   uj(k);
   i = m;
   return
  }

  function Hg(b, e) {
   b = b | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0;
   m = a[e >> 0] | 0;
   l = (m & 1) == 0;
   n = l ? e + 1 | 0 : c[e + 8 >> 2] | 0;
   m = l ? (m & 255) >>> 1 : c[e + 4 >> 2] | 0;
   if (m >>> 0 > 3) {
    f = m;
    g = n;
    e = m;
    while (1) {
     l = _(d[g >> 0] | d[g + 1 >> 0] << 8 | d[g + 2 >> 0] << 16 | d[g + 3 >> 0] << 24, 1540483477) | 0;
     e = (_(l >>> 24 ^ l, 1540483477) | 0) ^ (_(e, 1540483477) | 0);
     f = f + -4 | 0;
     if (f >>> 0 <= 3) break;
     else g = g + 4 | 0
    }
    f = m + -4 | 0;
    g = f & -4;
    f = f - g | 0;
    g = n + (g + 4) | 0
   } else {
    f = m;
    g = n;
    e = m
   }
   switch (f | 0) {
    case 3:
     {
      h = d[g + 2 >> 0] << 16 ^ e;k = 6;
      break
     }
    case 2:
     {
      h = e;k = 6;
      break
     }
    case 1:
     {
      i = e;k = 7;
      break
     }
    default:
     j = e
   }
   if ((k | 0) == 6) {
    i = d[g + 1 >> 0] << 8 ^ h;
    k = 7
   }
   if ((k | 0) == 7) j = _(d[g >> 0] ^ i, 1540483477) | 0;
   e = _(j >>> 13 ^ j, 1540483477) | 0;
   e = e >>> 15 ^ e;
   i = c[b + 4 >> 2] | 0;
   if (!i) {
    n = 0;
    return n | 0
   }
   j = i + -1 | 0;
   f = (j & i | 0) == 0;
   if (f) l = e & j;
   else l = (e >>> 0) % (i >>> 0) | 0;
   e = c[(c[b >> 2] | 0) + (l << 2) >> 2] | 0;
   if (!e) {
    n = 0;
    return n | 0
   }
   e = c[e >> 2] | 0;
   if (!e) {
    n = 0;
    return n | 0
   }
   k = (m | 0) == 0;
   if (f) {
    a: while (1) {
     if ((c[e + 4 >> 2] & j | 0) != (l | 0)) {
      e = 0;
      k = 31;
      break
     }
     f = e + 8 | 0;
     b = a[f >> 0] | 0;
     g = (b & 1) == 0;
     b: do
      if (((g ? (b & 255) >>> 1 : c[e + 12 >> 2] | 0) | 0) == (m | 0)) {
       f = g ? f + 1 | 0 : c[e + 16 >> 2] | 0;
       if (!g)
        if (!(Vi(f, n, m) | 0)) {
         k = 31;
         break a
        } else break;
       if (k) {
        k = 31;
        break a
       } else {
        h = m;
        g = n
       }
       while (1) {
        if ((a[f >> 0] | 0) != (a[g >> 0] | 0)) break b;
        h = h + -1 | 0;
        if (!h) {
         k = 31;
         break a
        } else {
         f = f + 1 | 0;
         g = g + 1 | 0
        }
       }
      }
     while (0);
     e = c[e >> 2] | 0;
     if (!e) {
      e = 0;
      k = 31;
      break
     }
    }
    if ((k | 0) == 31) return e | 0
   } else {
    c: while (1) {
     if ((((c[e + 4 >> 2] | 0) >>> 0) % (i >>> 0) | 0 | 0) != (l | 0)) {
      e = 0;
      k = 31;
      break
     }
     f = e + 8 | 0;
     b = a[f >> 0] | 0;
     g = (b & 1) == 0;
     d: do
      if (((g ? (b & 255) >>> 1 : c[e + 12 >> 2] | 0) | 0) == (m | 0)) {
       f = g ? f + 1 | 0 : c[e + 16 >> 2] | 0;
       if (!g)
        if (!(Vi(f, n, m) | 0)) {
         k = 31;
         break c
        } else break;
       if (k) {
        k = 31;
        break c
       } else {
        h = m;
        g = n
       }
       while (1) {
        if ((a[f >> 0] | 0) != (a[g >> 0] | 0)) break d;
        h = h + -1 | 0;
        if (!h) {
         k = 31;
         break c
        } else {
         f = f + 1 | 0;
         g = g + 1 | 0
        }
       }
      }
     while (0);
     e = c[e >> 2] | 0;
     if (!e) {
      e = 0;
      k = 31;
      break
     }
    }
    if ((k | 0) == 31) return e | 0
   }
   return 0
  }

  function Ig(b, e, f) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   var h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0.0,
    m = 0.0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0;
   w = f + 8 | 0;
   v = a[w >> 0] | 0;
   u = (v & 1) == 0;
   w = u ? w + 1 | 0 : c[f + 16 >> 2] | 0;
   v = u ? (v & 255) >>> 1 : c[f + 12 >> 2] | 0;
   if (v >>> 0 > 3) {
    j = v;
    k = w;
    i = v;
    while (1) {
     u = _(d[k >> 0] | d[k + 1 >> 0] << 8 | d[k + 2 >> 0] << 16 | d[k + 3 >> 0] << 24, 1540483477) | 0;
     i = (_(u >>> 24 ^ u, 1540483477) | 0) ^ (_(i, 1540483477) | 0);
     j = j + -4 | 0;
     if (j >>> 0 <= 3) break;
     else k = k + 4 | 0
    }
    j = v + -4 | 0;
    k = j & -4;
    j = j - k | 0;
    k = w + (k + 4) | 0
   } else {
    j = v;
    k = w;
    i = v
   }
   switch (j | 0) {
    case 3:
     {
      i = d[k + 2 >> 0] << 16 ^ i;n = 6;
      break
     }
    case 2:
     {
      n = 6;
      break
     }
    case 1:
     {
      n = 7;
      break
     }
    default:
     {}
   }
   if ((n | 0) == 6) {
    i = d[k + 1 >> 0] << 8 ^ i;
    n = 7
   }
   if ((n | 0) == 7) i = _(d[k >> 0] ^ i, 1540483477) | 0;
   i = _(i >>> 13 ^ i, 1540483477) | 0;
   i = i >>> 15 ^ i;
   u = f + 4 | 0;
   c[u >> 2] = i;
   t = e + 4 | 0;
   k = c[t >> 2] | 0;
   s = (k | 0) == 0;
   a: do
    if (!s) {
     q = k + -1 | 0;
     r = (q & k | 0) == 0;
     if (r) i = i & q;
     else i = (i >>> 0) % (k >>> 0) | 0;
     j = c[(c[e >> 2] | 0) + (i << 2) >> 2] | 0;
     if ((j | 0) != 0 ? (h = c[j >> 2] | 0, (h | 0) != 0) : 0) {
      p = (v | 0) == 0;
      b: while (1) {
       j = c[h + 4 >> 2] | 0;
       if (r) j = j & q;
       else j = (j >>> 0) % (k >>> 0) | 0;
       if ((j | 0) != (i | 0)) break a;
       j = h + 8 | 0;
       o = a[j >> 0] | 0;
       n = (o & 1) == 0;
       c: do
        if (((n ? (o & 255) >>> 1 : c[h + 12 >> 2] | 0) | 0) == (v | 0)) {
         j = n ? j + 1 | 0 : c[h + 16 >> 2] | 0;
         if (!n)
          if (!(Vi(j, w, v) | 0)) {
           i = 0;
           n = 40;
           break b
          } else break;
         if (p) {
          i = 0;
          n = 40;
          break b
         } else {
          o = v;
          n = w
         }
         while (1) {
          if ((a[j >> 0] | 0) != (a[n >> 0] | 0)) break c;
          o = o + -1 | 0;
          if (!o) {
           i = 0;
           n = 40;
           break b
          } else {
           j = j + 1 | 0;
           n = n + 1 | 0
          }
         }
        }
       while (0);
       h = c[h >> 2] | 0;
       if (!h) break a
      }
      if ((n | 0) == 40) {
       e = h;
       c[b >> 2] = e;
       b = b + 4 | 0;
       a[b >> 0] = i;
       return
      }
     }
    } else i = 0;
   while (0);
   n = e + 12 | 0;
   l = +(((c[n >> 2] | 0) + 1 | 0) >>> 0);
   m = +g[e + 16 >> 2];
   do
    if (s | l > +(k >>> 0) * m) {
     if (k >>> 0 > 2) h = (k + -1 & k | 0) == 0;
     else h = 0;
     j = (h & 1 | k << 1) ^ 1;
     h = ~~+Z(+(l / m)) >>> 0;
     Jg(e, j >>> 0 < h >>> 0 ? h : j);
     j = c[t >> 2] | 0;
     h = c[u >> 2] | 0;
     i = j + -1 | 0;
     if (!(i & j)) {
      k = j;
      i = i & h;
      break
     } else {
      k = j;
      i = (h >>> 0) % (j >>> 0) | 0;
      break
     }
    }
   while (0);
   h = c[(c[e >> 2] | 0) + (i << 2) >> 2] | 0;
   if (!h) {
    h = e + 8 | 0;
    c[f >> 2] = c[h >> 2];
    c[h >> 2] = f;
    c[(c[e >> 2] | 0) + (i << 2) >> 2] = h;
    h = c[f >> 2] | 0;
    if (h) {
     h = c[h + 4 >> 2] | 0;
     i = k + -1 | 0;
     if (!(i & k)) h = h & i;
     else h = (h >>> 0) % (k >>> 0) | 0;
     c[(c[e >> 2] | 0) + (h << 2) >> 2] = f
    }
   } else {
    c[f >> 2] = c[h >> 2];
    c[h >> 2] = f
   }
   c[n >> 2] = (c[n >> 2] | 0) + 1;
   e = 1;
   c[b >> 2] = f;
   b = b + 4 | 0;
   a[b >> 0] = e;
   return
  }

  function Jg(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0;
   if ((b | 0) != 1) {
    if (b + -1 & b) b = pj(b) | 0
   } else b = 2;
   f = c[a + 4 >> 2] | 0;
   if (b >>> 0 > f >>> 0) {
    Kg(a, b);
    return
   }
   if (b >>> 0 >= f >>> 0) return;
   if (f >>> 0 > 2) e = (f + -1 & f | 0) == 0;
   else e = 0;
   d = ~~+Z(+(+((c[a + 12 >> 2] | 0) >>> 0) / +g[a + 16 >> 2])) >>> 0;
   if (e) d = 1 << 32 - (aa(d + -1 | 0) | 0);
   else d = pj(d) | 0;
   b = b >>> 0 < d >>> 0 ? d : b;
   if (b >>> 0 >= f >>> 0) return;
   Kg(a, b);
   return
  }

  function Kg(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0;
   f = b + 4 | 0;
   if (!d) {
    e = c[b >> 2] | 0;
    c[b >> 2] = 0;
    if (e) mh(e);
    c[f >> 2] = 0;
    return
   }
   t = kh(d << 2) | 0;
   e = c[b >> 2] | 0;
   c[b >> 2] = t;
   if (e) mh(e);
   c[f >> 2] = d;
   e = 0;
   do {
    c[(c[b >> 2] | 0) + (e << 2) >> 2] = 0;
    e = e + 1 | 0
   } while ((e | 0) != (d | 0));
   f = b + 8 | 0;
   h = c[f >> 2] | 0;
   if (!h) return;
   e = c[h + 4 >> 2] | 0;
   s = d + -1 | 0;
   t = (s & d | 0) == 0;
   if (t) g = e & s;
   else g = (e >>> 0) % (d >>> 0) | 0;
   c[(c[b >> 2] | 0) + (g << 2) >> 2] = f;
   e = c[h >> 2] | 0;
   if (!e) return;
   else {
    j = h;
    i = e;
    r = g;
    f = h
   }
   a: while (1) {
    e = i;
    b: while (1) {
     while (1) {
      g = c[e + 4 >> 2] | 0;
      if (t) h = g & s;
      else h = (g >>> 0) % (d >>> 0) | 0;
      if ((h | 0) == (r | 0)) {
       f = e;
       break
      }
      g = (c[b >> 2] | 0) + (h << 2) | 0;
      if (!(c[g >> 2] | 0)) break b;
      g = c[e >> 2] | 0;
      c: do
       if (!g) g = e;
       else {
        o = e + 8 | 0;
        q = a[o >> 0] | 0;
        n = (q & 1) == 0;
        q = n ? (q & 255) >>> 1 : c[e + 12 >> 2] | 0;
        m = e + 16 | 0;
        o = o + 1 | 0;
        p = (q | 0) == 0;
        if (n) n = e;
        else {
         l = e;
         while (1) {
          i = g + 8 | 0;
          p = a[i >> 0] | 0;
          k = (p & 1) == 0;
          if ((q | 0) != ((k ? (p & 255) >>> 1 : c[g + 12 >> 2] | 0) | 0)) {
           g = l;
           break c
          }
          if (Vi(c[m >> 2] | 0, k ? i + 1 | 0 : c[g + 16 >> 2] | 0, q) | 0) {
           g = l;
           break c
          }
          i = c[g >> 2] | 0;
          if (!i) break c;
          else {
           l = g;
           g = i
          }
         }
        }
        while (1) {
         i = g + 8 | 0;
         m = a[i >> 0] | 0;
         k = (m & 1) == 0;
         if ((q | 0) != ((k ? (m & 255) >>> 1 : c[g + 12 >> 2] | 0) | 0)) {
          g = n;
          break c
         }
         if (!p) {
          l = q;
          m = o;
          i = k ? i + 1 | 0 : c[g + 16 >> 2] | 0;
          while (1) {
           if ((a[m >> 0] | 0) != (a[i >> 0] | 0)) {
            g = n;
            break c
           }
           l = l + -1 | 0;
           if (!l) break;
           else {
            m = m + 1 | 0;
            i = i + 1 | 0
           }
          }
         }
         i = c[g >> 2] | 0;
         if (!i) break;
         else {
          n = g;
          g = i
         }
        }
       }
      while (0);
      c[f >> 2] = c[g >> 2];
      c[g >> 2] = c[c[(c[b >> 2] | 0) + (h << 2) >> 2] >> 2];
      c[c[(c[b >> 2] | 0) + (h << 2) >> 2] >> 2] = e;
      e = c[j >> 2] | 0;
      if (!e) {
       e = 35;
       break a
      }
     }
     e = c[f >> 2] | 0;
     if (!e) {
      e = 35;
      break a
     } else j = f
    }
    c[g >> 2] = f;
    f = c[e >> 2] | 0;
    if (!f) {
     e = 35;
     break
    } else {
     j = e;
     i = f;
     r = h;
     f = e
    }
   }
   if ((e | 0) == 35) return
  }

  function Lg() {
   var b = 0,
    d = 0,
    e = 0;
   e = i;
   i = i + 16 | 0;
   b = e + 4 | 0;
   d = e;
   Ne(c[915] | 0, b, d);
   b = c[b >> 2] | 0;
   d = c[d >> 2] | 0;
   if (!((b | 0) == (c[913] | 0) & (d | 0) == (c[914] | 0))) {
    c[913] = b;
    c[914] = d;
    cg(80)
   }
   if (a[13734] | 0) {
    d = c[915] | 0;
    Gf(8, d);
    i = e;
    return
   }
   Ve(c[915] | 0, 0.0, 0.0, +(c[913] | 0), +(c[914] | 0));
   d = c[915] | 0;
   Gf(8, d);
   i = e;
   return
  }

  function Mg() {
   bg(80);
   fh(520);
   return
  }

  function Ng() {
   if (!(Ac(8) | 0)) return;
   Ff();
   return
  }

  function Og() {
   _a(1, 0, 0);
   Cf(2);
   yf(3);
   Ya();
   return 0
  }

  function Pg(a) {
   a = a | 0;
   Ff();
   zc(8, a);
   return
  }

  function Qg(a) {
   a = a | 0;
   var b = 0,
    c = 0;
   b = i;
   i = i + 16 | 0;
   c = b;
   sj(c, a, Xi(a) | 0);
   Ec(8, c);
   uj(c);
   i = b;
   return
  }

  function Rg(a, b) {
   a = a | 0;
   b = b | 0;
   c[147] = a;
   c[148] = b;
   return
  }

  function Sg() {
   var b = 0,
    d = 0,
    e = 0;
   e = i;
   i = i + 16 | 0;
   b = e;
   a[b >> 0] = 17;
   d = c[3] | 0;
   if (!d) {
    i = e;
    return
   }
   wf(d, b, 1);
   i = e;
   return
  }

  function Tg() {
   var b = 0,
    d = 0,
    e = 0;
   e = i;
   i = i + 16 | 0;
   b = e;
   a[b >> 0] = 21;
   d = c[3] | 0;
   if (!d) {
    i = e;
    return
   }
   wf(d, b, 1);
   i = e;
   return
  }

  function Ug() {
   var b = 0,
    d = 0,
    e = 0;
   e = i;
   i = i + 16 | 0;
   b = e;
   a[b >> 0] = 18;
   d = c[3] | 0;
   if (!d) {
    i = e;
    return
   }
   wf(d, b, 1);
   i = e;
   return
  }

  function Vg() {
   var b = 0,
    d = 0,
    e = 0;
   e = i;
   i = i + 16 | 0;
   b = e;
   a[b >> 0] = 19;
   d = c[3] | 0;
   if (!d) {
    i = e;
    return
   }
   wf(d, b, 1);
   i = e;
   return
  }

  function Wg(a) {
   a = +a;
   eg(80, a);
   return
  }

  function Xg() {
   Dc(8);
   return
  }

  function Yg(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0;
   e = d + 1 | 0;
   f = lh((d | 0) < -1 ? -1 : e) | 0;
   a[f >> 0] = 102;
   ns(f + 1 | 0, b | 0, d | 0) | 0;
   b = c[3] | 0;
   if (!b) {
    nh(f);
    return
   }
   wf(b, f, e);
   nh(f);
   return
  }

  function Zg() {
   ag(80);
   dh(520);
   return
  }

  function _g(a) {
   a = a | 0;
   xc(8, a);
   return
  }

  function $g() {
   c[915] = pf(18885) | 0;
   return
  }

  function ah(a, b, c) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0;
   c = c ^ b;
   if ((b | 0) > 3) {
    f = b + -4 | 0;
    g = f & -4;
    h = g + 4 | 0;
    e = a;
    while (1) {
     j = _(d[e >> 0] | d[e + 1 >> 0] << 8 | d[e + 2 >> 0] << 16 | d[e + 3 >> 0] << 24, 1540483477) | 0;
     c = (_(j >>> 24 ^ j, 1540483477) | 0) ^ (_(c, 1540483477) | 0);
     b = b + -4 | 0;
     if ((b | 0) <= 3) break;
     else e = e + 4 | 0
    }
    b = f - g | 0;
    a = a + h | 0
   }
   switch (b | 0) {
    case 3:
     {
      c = (d[a + 2 >> 0] | 0) << 16 ^ c;i = 7;
      break
     }
    case 2:
     {
      i = 7;
      break
     }
    case 1:
     break;
    default:
     {
      j = c;i = j >>> 13;j = i ^ j;j = _(j, 1540483477) | 0;i = j >>> 15;j = i ^ j;
      return j | 0
     }
   }
   if ((i | 0) == 7) c = (d[a + 1 >> 0] | 0) << 8 ^ c;
   j = _((d[a >> 0] | 0) ^ c, 1540483477) | 0;
   i = j >>> 13;
   j = i ^ j;
   j = _(j, 1540483477) | 0;
   i = j >>> 15;
   j = i ^ j;
   return j | 0
  }

  function bh(b, e, f) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0;
   o = i;
   i = i + 352 | 0;
   n = o;
   m = o + 24 | 0;
   c[n >> 2] = c[916];
   c[n + 4 >> 2] = c[917];
   c[n + 8 >> 2] = c[918];
   c[n + 12 >> 2] = c[919];
   c[n + 16 >> 2] = c[920];
   k = e + -64 | 0;
   if ((e | 0) < 64) {
    l = m;
    g = 0
   } else {
    g = 0;
    do {
     h = g;
     j = 0;
     while (1) {
      c[m + (j << 2) >> 2] = (d[b + (h | 2) >> 0] | 0) << 8 | (d[b + (h | 3) >> 0] | 0) | (d[b + (h | 1) >> 0] | 0) << 16 | (d[b + h >> 0] | 0) << 24;
      j = j + 1 | 0;
      if ((j | 0) == 16) break;
      else h = h + 4 | 0
     }
     g = g + 64 | 0;
     ch(n, m)
    } while ((g | 0) <= (k | 0));
    l = m
   }
   k = e - g | 0;
   h = m;
   j = h + 64 | 0;
   do {
    c[h >> 2] = 0;
    h = h + 4 | 0
   } while ((h | 0) < (j | 0));
   if ((k | 0) > 0) {
    h = 0;
    do {
     j = m + (h >> 2 << 2) | 0;
     c[j >> 2] = (d[b + (h + g) >> 0] | 0) << (h << 3 & 24 ^ 24) | c[j >> 2];
     h = h + 1 | 0
    } while ((h | 0) != (k | 0));
    g = k
   } else g = 0;
   b = m + (g >> 2 << 2) | 0;
   c[b >> 2] = c[b >> 2] | 128 << (g << 3 & 24 ^ 24);
   if ((k | 0) > 55) {
    ch(n, l);
    h = m;
    j = h + 64 | 0;
    do {
     c[h >> 2] = 0;
     h = h + 4 | 0
    } while ((h | 0) < (j | 0))
   }
   c[m + 60 >> 2] = e << 3;
   ch(n, l);
   g = 19;
   h = 20;
   while (1) {
    a[f + g >> 0] = (c[n + (g >> 2 << 2) >> 2] | 0) >>> (0 - h << 3 & 24);
    if ((g | 0) > 0) {
     h = g;
     g = g + -1 | 0
    } else break
   }
   i = o;
   return
  }

  function ch(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0;
   k = a + 4 | 0;
   l = a + 8 | 0;
   m = a + 12 | 0;
   n = a + 16 | 0;
   h = c[a >> 2] | 0;
   g = c[k >> 2] | 0;
   e = c[l >> 2] | 0;
   d = c[m >> 2] | 0;
   f = c[n >> 2] | 0;
   i = 0;
   while (1) {
    f = f + 1518500249 + (g & e | d & ~g) + (h >>> 27 | h << 5) + (c[b + (i << 2) >> 2] | 0) | 0;
    g = g >>> 2 | g << 30;
    i = i + 1 | 0;
    if ((i | 0) == 16) break;
    else {
     o = e;
     j = h;
     h = f;
     e = g;
     f = d;
     d = o;
     g = j
    }
   }
   j = c[b + 32 >> 2] ^ c[b + 52 >> 2] ^ c[b + 8 >> 2] ^ c[b >> 2];
   j = j >>> 31 | j << 1;
   c[b + 64 >> 2] = j;
   j = d + 1518500249 + (h & g | e & ~h) + (f >>> 27 | f << 5) + j | 0;
   o = h >>> 2 | h << 30;
   i = c[b + 36 >> 2] ^ c[b + 56 >> 2] ^ c[b + 12 >> 2] ^ c[b + 4 >> 2];
   i = i >>> 31 | i << 1;
   c[b + 68 >> 2] = i;
   i = e + 1518500249 + (f & o | g & ~f) + (j >>> 27 | j << 5) + i | 0;
   d = f >>> 2 | f << 30;
   h = c[b + 40 >> 2] ^ c[b + 60 >> 2] ^ c[b + 16 >> 2] ^ c[b + 8 >> 2];
   h = h >>> 31 | h << 1;
   c[b + 72 >> 2] = h;
   h = g + 1518500249 + (j & d | o & ~j) + (i >>> 27 | i << 5) + h | 0;
   e = j >>> 2 | j << 30;
   j = c[b + 44 >> 2] ^ c[b + 64 >> 2] ^ c[b + 20 >> 2] ^ c[b + 12 >> 2];
   j = j >>> 31 | j << 1;
   c[b + 76 >> 2] = j;
   j = o + 1518500249 + (i & e | d & ~i) + (h >>> 27 | h << 5) + j | 0;
   g = i >>> 2 | i << 30;
   i = 20;
   while (1) {
    f = c[b + (i + -8 << 2) >> 2] ^ c[b + (i + -3 << 2) >> 2] ^ c[b + (i + -14 << 2) >> 2] ^ c[b + (i + -16 << 2) >> 2];
    f = f >>> 31 | f << 1;
    c[b + (i << 2) >> 2] = f;
    f = d + 1859775393 + (g ^ e ^ h) + (j >>> 27 | j << 5) + f | 0;
    d = h >>> 2 | h << 30;
    i = i + 1 | 0;
    if ((i | 0) == 40) {
     i = f;
     h = 40;
     break
    } else {
     o = g;
     h = j;
     j = f;
     g = d;
     d = e;
     e = o
    }
   }
   while (1) {
    f = c[b + (h + -8 << 2) >> 2] ^ c[b + (h + -3 << 2) >> 2] ^ c[b + (h + -14 << 2) >> 2] ^ c[b + (h + -16 << 2) >> 2];
    f = f >>> 31 | f << 1;
    c[b + (h << 2) >> 2] = f;
    f = e + -1894007588 + (j & (d | g) | d & g) + (i >>> 27 | i << 5) + f | 0;
    e = j >>> 2 | j << 30;
    h = h + 1 | 0;
    if ((h | 0) == 60) {
     j = i;
     i = 60;
     break
    } else {
     o = d;
     j = i;
     i = f;
     d = e;
     e = g;
     g = o
    }
   }
   while (1) {
    h = c[b + (i + -8 << 2) >> 2] ^ c[b + (i + -3 << 2) >> 2] ^ c[b + (i + -14 << 2) >> 2] ^ c[b + (i + -16 << 2) >> 2];
    h = h >>> 31 | h << 1;
    c[b + (i << 2) >> 2] = h;
    h = g + -899497514 + (e ^ d ^ j) + (f >>> 27 | f << 5) + h | 0;
    g = j >>> 2 | j << 30;
    i = i + 1 | 0;
    if ((i | 0) == 80) break;
    else {
     o = e;
     j = f;
     f = h;
     e = g;
     g = d;
     d = o
    }
   }
   c[a >> 2] = (c[a >> 2] | 0) + h;
   c[k >> 2] = (c[k >> 2] | 0) + f;
   c[l >> 2] = (c[l >> 2] | 0) + g;
   c[m >> 2] = (c[m >> 2] | 0) + e;
   c[n >> 2] = (c[n >> 2] | 0) + d;
   return
  }

  function dh(b) {
   b = b | 0;
   if (a[b >> 0] | 0) eh(b);
   a[b >> 0] = 1;
   return
  }

  function eh(b) {
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0;
   t = i;
   i = i + 16 | 0;
   k = t;
   a[b >> 0] = 0;
   l = b + 32 | 0;
   e = c[l >> 2] | 0;
   n = b + 28 | 0;
   d = c[n >> 2] | 0;
   if ((e | 0) == (d | 0)) {
    i = t;
    return
   }
   o = b + 40 | 0;
   p = b + 16 | 0;
   q = b + 20 | 0;
   r = b + 4 | 0;
   j = b + 8 | 0;
   b = 0;
   do {
    h = c[d + (b << 2) >> 2] | 0;
    do
     if (a[h + 4 >> 0] | 0) {
      if (!(+Zb(h) >= 1.0)) {
       e = c[l >> 2] | 0;
       break
      }
      c[k >> 2] = c[h >> 2];
      hh(o, k) | 0;
      f = c[p >> 2] | 0;
      g = c[q >> 2] | 0;
      d = (f | 0) == (g | 0);
      a: do
       if (d) {
        m = f;
        s = 9
       } else {
        e = f;
        do {
         if ((c[e >> 2] | 0) == (h | 0)) {
          m = e;
          s = 9;
          break a
         }
         e = e + 4 | 0
        } while ((e | 0) != (g | 0))
       }
      while (0);
      if ((s | 0) == 9 ? (s = 0, (m | 0) != (g | 0)) : 0) {
       b: do
        if (d) d = f;
        else {
         d = f;
         while (1) {
          if ((c[d >> 2] | 0) == (h | 0)) break b;
          d = d + 4 | 0;
          if ((d | 0) == (g | 0)) {
           d = g;
           break
          }
         }
        }while (0);f = f + ((d - f >> 2) + 1 << 2) | 0;e = g - f | 0;ps(d | 0, f | 0, e | 0) | 0;d = d + (e >> 2 << 2) | 0;e = c[q >> 2] | 0;
       if ((e | 0) != (d | 0)) c[q >> 2] = e + (~((e + -4 - d | 0) >>> 2) << 2);f = c[r >> 2] | 0;g = c[j >> 2] | 0;e = c[h >> 2] | 0;c: do
        if ((f | 0) == (g | 0)) d = f;
        else {
         d = f;
         while (1) {
          if ((c[d >> 2] | 0) == (e | 0)) break c;
          d = d + 4 | 0;
          if ((d | 0) == (g | 0)) {
           d = g;
           break
          }
         }
        }while (0);f = f + ((d - f >> 2) + 1 << 2) | 0;e = g - f | 0;ps(d | 0, f | 0, e | 0) | 0;d = d + (e >> 2 << 2) | 0;e = c[j >> 2] | 0;
       if ((e | 0) != (d | 0)) c[j >> 2] = e + (~((e + -4 - d | 0) >>> 2) << 2)
      }
      Vb(h);
      c[(c[n >> 2] | 0) + (b << 2) >> 2] = c[(c[l >> 2] | 0) + -4 >> 2];
      e = (c[l >> 2] | 0) + -4 | 0;
      c[l >> 2] = e;
      b = b + -1 | 0
     }
    while (0);
    b = b + 1 | 0;
    d = c[n >> 2] | 0
   } while (b >>> 0 < e - d >> 2 >>> 0);
   i = t;
   return
  }

  function fh(b) {
   b = b | 0;
   if (!(a[b >> 0] | 0)) return;
   eh(b);
   return
  }

  function gh(a) {
   a = a | 0;
   var b = 0,
    d = 0,
    e = 0,
    f = 0;
   d = a + 28 | 0;
   b = c[d >> 2] | 0;
   f = a + 32 | 0;
   e = c[f >> 2] | 0;
   if ((b | 0) != (e | 0)) {
    do {
     Vb(c[b >> 2] | 0);
     b = b + 4 | 0
    } while ((b | 0) != (e | 0));
    b = c[d >> 2] | 0;
    d = c[f >> 2] | 0;
    if ((d | 0) != (b | 0)) c[f >> 2] = d + (~((d + -4 - b | 0) >>> 2) << 2)
   }
   f = a + 52 | 0;
   if (c[f >> 2] | 0) {
    d = a + 48 | 0;
    b = c[d >> 2] | 0;
    if (b)
     do {
      e = b;
      b = c[b >> 2] | 0;
      mh(e)
     } while ((b | 0) != 0);
    c[d >> 2] = 0;
    b = c[a + 44 >> 2] | 0;
    if (b) {
     d = a + 40 | 0;
     e = 0;
     do {
      c[(c[d >> 2] | 0) + (e << 2) >> 2] = 0;
      e = e + 1 | 0
     } while ((e | 0) != (b | 0))
    }
    c[f >> 2] = 0
   }
   b = c[a + 16 >> 2] | 0;
   d = a + 20 | 0;
   e = c[d >> 2] | 0;
   if ((e | 0) != (b | 0)) c[d >> 2] = e + (~((e + -4 - b | 0) >>> 2) << 2);
   e = c[a + 4 >> 2] | 0;
   b = a + 8 | 0;
   d = c[b >> 2] | 0;
   if ((d | 0) == (e | 0)) return;
   c[b >> 2] = d + (~((d + -4 - e | 0) >>> 2) << 2);
   return
  }

  function hh(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   f = c[b >> 2] | 0;
   l = c[a + 4 >> 2] | 0;
   if (!l) {
    a = 0;
    return a | 0
   }
   e = l + -1 | 0;
   d = (e & l | 0) == 0;
   if (d) g = e & f;
   else g = (f >>> 0) % (l >>> 0) | 0;
   b = c[(c[a >> 2] | 0) + (g << 2) >> 2] | 0;
   if (!b) {
    a = 0;
    return a | 0
   }
   a: do
    if (d) {
     while (1) {
      b = c[b >> 2] | 0;
      if (!b) {
       b = 0;
       j = 37;
       break
      }
      if ((c[b + 4 >> 2] & e | 0) != (g | 0)) {
       b = 0;
       j = 37;
       break
      }
      if ((c[b + 8 >> 2] | 0) == (f | 0)) {
       m = b;
       break a
      }
     }
     if ((j | 0) == 37) return b | 0
    } else {
     while (1) {
      b = c[b >> 2] | 0;
      if (!b) {
       b = 0;
       j = 37;
       break
      }
      if ((((c[b + 4 >> 2] | 0) >>> 0) % (l >>> 0) | 0 | 0) != (g | 0)) {
       b = 0;
       j = 37;
       break
      }
      if ((c[b + 8 >> 2] | 0) == (f | 0)) {
       m = b;
       break a
      }
     }
     if ((j | 0) == 37) return b | 0
    }
   while (0);
   b = c[m + 4 >> 2] | 0;
   g = l + -1 | 0;
   h = (g & l | 0) == 0;
   if (h) i = g & b;
   else i = (b >>> 0) % (l >>> 0) | 0;
   e = (c[a >> 2] | 0) + (i << 2) | 0;
   d = c[e >> 2] | 0;
   while (1) {
    b = c[d >> 2] | 0;
    if ((b | 0) == (m | 0)) {
     f = d;
     break
    } else d = b
   }
   if ((f | 0) != (a + 8 | 0)) {
    b = c[f + 4 >> 2] | 0;
    if (h) b = b & g;
    else b = (b >>> 0) % (l >>> 0) | 0;
    if ((b | 0) == (i | 0)) k = m;
    else j = 24
   } else j = 24;
   do
    if ((j | 0) == 24) {
     b = c[m >> 2] | 0;
     if (b) {
      b = c[b + 4 >> 2] | 0;
      if (h) b = b & g;
      else b = (b >>> 0) % (l >>> 0) | 0;
      if ((b | 0) == (i | 0)) {
       k = m;
       break
      }
     }
     c[e >> 2] = 0;
     k = m
    }
   while (0);
   d = c[k >> 2] | 0;
   b = d;
   if (d) {
    d = c[d + 4 >> 2] | 0;
    if (h) d = d & g;
    else d = (d >>> 0) % (l >>> 0) | 0;
    if ((d | 0) != (i | 0)) {
     c[(c[a >> 2] | 0) + (d << 2) >> 2] = f;
     b = c[m >> 2] | 0
    }
   }
   c[f >> 2] = b;
   c[k >> 2] = 0;
   a = a + 12 | 0;
   c[a >> 2] = (c[a >> 2] | 0) + -1;
   mh(m);
   a = 1;
   return a | 0
  }

  function ih(a) {
   a = a | 0;
   Ba(19073, 19102, 1164, 19179)
  }

  function jh(a) {
   a = a | 0;
   Ba(19200, 19223, 303, 19179)
  }

  function kh(a) {
   a = a | 0;
   var b = 0,
    d = 0;
   b = (a | 0) == 0 ? 1 : a;
   a = jj(b) | 0;
   a: do
    if (!a) {
     while (1) {
      a = sh() | 0;
      if (!a) break;
      yb[a & 3]();
      a = jj(b) | 0;
      if (a) {
       d = a;
       break a
      }
     }
     b = Ca(4) | 0;
     c[b >> 2] = 3692;
     ab(b | 0, 720, 73)
    } else d = a;
   while (0);
   return d | 0
  }

  function lh(a) {
   a = a | 0;
   return kh(a) | 0
  }

  function mh(a) {
   a = a | 0;
   kj(a);
   return
  }

  function nh(a) {
   a = a | 0;
   mh(a);
   return
  }

  function oh(a) {
   a = a | 0;
   c[a >> 2] = 3692;
   return
  }

  function ph(a) {
   a = a | 0;
   return
  }

  function qh(a) {
   a = a | 0;
   mh(a);
   return
  }

  function rh(a) {
   a = a | 0;
   return 19300
  }

  function sh() {
   var a = 0;
   a = c[926] | 0;
   c[926] = a + 0;
   return a | 0
  }

  function th(a) {
   a = a | 0;
   return
  }

  function uh(a) {
   a = a | 0;
   return
  }

  function vh(a) {
   a = a | 0;
   return
  }

  function wh(a) {
   a = a | 0;
   return
  }

  function xh(a) {
   a = a | 0;
   return
  }

  function yh(a) {
   a = a | 0;
   mh(a);
   return
  }

  function zh(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Ah(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Bh(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0;
   h = i;
   i = i + 64 | 0;
   g = h;
   if ((a | 0) != (b | 0))
    if ((b | 0) != 0 ? (f = Hh(b, 752, 768, 0) | 0, (f | 0) != 0) : 0) {
     b = g;
     e = b + 56 | 0;
     do {
      c[b >> 2] = 0;
      b = b + 4 | 0
     } while ((b | 0) < (e | 0));
     c[g >> 2] = f;
     c[g + 8 >> 2] = a;
     c[g + 12 >> 2] = -1;
     c[g + 48 >> 2] = 1;
     Eb[c[(c[f >> 2] | 0) + 28 >> 2] & 7](f, g, c[d >> 2] | 0, 1);
     if ((c[g + 24 >> 2] | 0) == 1) {
      c[d >> 2] = c[g + 16 >> 2];
      b = 1
     } else b = 0
    } else b = 0;
   else b = 1;
   i = h;
   return b | 0
  }

  function Ch(b, d, e, f) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0;
   b = d + 16 | 0;
   g = c[b >> 2] | 0;
   do
    if (g) {
     if ((g | 0) != (e | 0)) {
      f = d + 36 | 0;
      c[f >> 2] = (c[f >> 2] | 0) + 1;
      c[d + 24 >> 2] = 2;
      a[d + 54 >> 0] = 1;
      break
     }
     b = d + 24 | 0;
     if ((c[b >> 2] | 0) == 2) c[b >> 2] = f
    } else {
     c[b >> 2] = e;
     c[d + 24 >> 2] = f;
     c[d + 36 >> 2] = 1
    }
   while (0);
   return
  }

  function Dh(a, b, d, e) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   if ((a | 0) == (c[b + 8 >> 2] | 0)) Ch(0, b, d, e);
   return
  }

  function Eh(a, b, d, e) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   if ((a | 0) == (c[b + 8 >> 2] | 0)) Ch(0, b, d, e);
   else {
    a = c[a + 8 >> 2] | 0;
    Eb[c[(c[a >> 2] | 0) + 28 >> 2] & 7](a, b, d, e)
   }
   return
  }

  function Fh(a, b, d, e) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0;
   g = c[a + 4 >> 2] | 0;
   f = g >> 8;
   if (g & 1) f = c[(c[d >> 2] | 0) + f >> 2] | 0;
   a = c[a >> 2] | 0;
   Eb[c[(c[a >> 2] | 0) + 28 >> 2] & 7](a, b, d + f | 0, (g & 2 | 0) != 0 ? e : 2);
   return
  }

  function Gh(b, d, e, f) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0;
   a: do
    if ((b | 0) != (c[d + 8 >> 2] | 0)) {
     h = c[b + 12 >> 2] | 0;
     g = b + 16 + (h << 3) | 0;
     Fh(b + 16 | 0, d, e, f);
     if ((h | 0) > 1) {
      h = d + 54 | 0;
      b = b + 24 | 0;
      do {
       Fh(b, d, e, f);
       if (a[h >> 0] | 0) break a;
       b = b + 8 | 0
      } while (b >>> 0 < g >>> 0)
     }
    } else Ch(0, d, e, f);
   while (0);
   return
  }

  function Hh(d, e, f, g) {
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0;
   r = i;
   i = i + 64 | 0;
   q = r;
   p = c[d >> 2] | 0;
   o = d + (c[p + -8 >> 2] | 0) | 0;
   p = c[p + -4 >> 2] | 0;
   c[q >> 2] = f;
   c[q + 4 >> 2] = d;
   c[q + 8 >> 2] = e;
   c[q + 12 >> 2] = g;
   g = q + 16 | 0;
   d = q + 20 | 0;
   e = q + 24 | 0;
   h = q + 28 | 0;
   j = q + 32 | 0;
   k = q + 40 | 0;
   l = (p | 0) == (f | 0);
   m = g;
   n = m + 36 | 0;
   do {
    c[m >> 2] = 0;
    m = m + 4 | 0
   } while ((m | 0) < (n | 0));
   b[g + 36 >> 1] = 0;
   a[g + 38 >> 0] = 0;
   a: do
    if (l) {
     c[q + 48 >> 2] = 1;
     Bb[c[(c[f >> 2] | 0) + 20 >> 2] & 7](f, q, o, o, 1, 0);
     g = (c[e >> 2] | 0) == 1 ? o : 0
    } else {
     qb[c[(c[p >> 2] | 0) + 24 >> 2] & 3](p, q, o, 1, 0);
     switch (c[q + 36 >> 2] | 0) {
      case 0:
       {
        g = (c[k >> 2] | 0) == 1 & (c[h >> 2] | 0) == 1 & (c[j >> 2] | 0) == 1 ? c[d >> 2] | 0 : 0;
        break a
       }
      case 1:
       break;
      default:
       {
        g = 0;
        break a
       }
     }
     if ((c[e >> 2] | 0) != 1 ? !((c[k >> 2] | 0) == 0 & (c[h >> 2] | 0) == 1 & (c[j >> 2] | 0) == 1) : 0) {
      g = 0;
      break
     }
     g = c[g >> 2] | 0
    }
   while (0);
   i = r;
   return g | 0
  }

  function Ih(b, d, e, f, g) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   a[d + 53 >> 0] = 1;
   do
    if ((c[d + 4 >> 2] | 0) == (f | 0)) {
     a[d + 52 >> 0] = 1;
     f = d + 16 | 0;
     b = c[f >> 2] | 0;
     if (!b) {
      c[f >> 2] = e;
      c[d + 24 >> 2] = g;
      c[d + 36 >> 2] = 1;
      if (!((g | 0) == 1 ? (c[d + 48 >> 2] | 0) == 1 : 0)) break;
      a[d + 54 >> 0] = 1;
      break
     }
     if ((b | 0) != (e | 0)) {
      g = d + 36 | 0;
      c[g >> 2] = (c[g >> 2] | 0) + 1;
      a[d + 54 >> 0] = 1;
      break
     }
     b = d + 24 | 0;
     f = c[b >> 2] | 0;
     if ((f | 0) == 2) {
      c[b >> 2] = g;
      f = g
     }
     if ((f | 0) == 1 ? (c[d + 48 >> 2] | 0) == 1 : 0) a[d + 54 >> 0] = 1
    }
   while (0);
   return
  }

  function Jh(b, d, e, f, g) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0;
   a: do
    if ((b | 0) == (c[d + 8 >> 2] | 0)) {
     if ((c[d + 4 >> 2] | 0) == (e | 0) ? (h = d + 28 | 0, (c[h >> 2] | 0) != 1) : 0) c[h >> 2] = f
    } else {
     if ((b | 0) != (c[d >> 2] | 0)) {
      q = c[b + 12 >> 2] | 0;
      j = b + 16 + (q << 3) | 0;
      Lh(b + 16 | 0, d, e, f, g);
      h = b + 24 | 0;
      if ((q | 0) <= 1) break;
      i = c[b + 8 >> 2] | 0;
      if ((i & 2 | 0) == 0 ? (k = d + 36 | 0, (c[k >> 2] | 0) != 1) : 0) {
       if (!(i & 1)) {
        i = d + 54 | 0;
        while (1) {
         if (a[i >> 0] | 0) break a;
         if ((c[k >> 2] | 0) == 1) break a;
         Lh(h, d, e, f, g);
         h = h + 8 | 0;
         if (h >>> 0 >= j >>> 0) break a
        }
       }
       i = d + 24 | 0;
       b = d + 54 | 0;
       while (1) {
        if (a[b >> 0] | 0) break a;
        if ((c[k >> 2] | 0) == 1 ? (c[i >> 2] | 0) == 1 : 0) break a;
        Lh(h, d, e, f, g);
        h = h + 8 | 0;
        if (h >>> 0 >= j >>> 0) break a
       }
      }
      i = d + 54 | 0;
      while (1) {
       if (a[i >> 0] | 0) break a;
       Lh(h, d, e, f, g);
       h = h + 8 | 0;
       if (h >>> 0 >= j >>> 0) break a
      }
     }
     if ((c[d + 16 >> 2] | 0) != (e | 0) ? (p = d + 20 | 0, (c[p >> 2] | 0) != (e | 0)) : 0) {
      c[d + 32 >> 2] = f;
      m = d + 44 | 0;
      if ((c[m >> 2] | 0) == 4) break;
      i = c[b + 12 >> 2] | 0;
      j = b + 16 + (i << 3) | 0;
      k = d + 52 | 0;
      f = d + 53 | 0;
      n = d + 54 | 0;
      l = b + 8 | 0;
      o = d + 24 | 0;
      b: do
       if ((i | 0) > 0) {
        i = 0;
        h = 0;
        b = b + 16 | 0;
        while (1) {
         a[k >> 0] = 0;
         a[f >> 0] = 0;
         Kh(b, d, e, e, 1, g);
         if (a[n >> 0] | 0) {
          q = 20;
          break b
         }
         do
          if (a[f >> 0] | 0) {
           if (!(a[k >> 0] | 0))
            if (!(c[l >> 2] & 1)) {
             h = 1;
             q = 20;
             break b
            } else {
             h = 1;
             break
            }
           if ((c[o >> 2] | 0) == 1) break b;
           if (!(c[l >> 2] & 2)) break b;
           else {
            i = 1;
            h = 1
           }
          }
         while (0);
         b = b + 8 | 0;
         if (b >>> 0 >= j >>> 0) {
          q = 20;
          break
         }
        }
       } else {
        i = 0;
        h = 0;
        q = 20
       }
      while (0);
      do
       if ((q | 0) == 20) {
        if ((!i ? (c[p >> 2] = e, e = d + 40 | 0, c[e >> 2] = (c[e >> 2] | 0) + 1, (c[d + 36 >> 2] | 0) == 1) : 0) ? (c[o >> 2] | 0) == 2 : 0) {
         a[n >> 0] = 1;
         if (h) break
        } else q = 24;
        if ((q | 0) == 24 ? h : 0) break;
        c[m >> 2] = 4;
        break a
       }
      while (0);
      c[m >> 2] = 3;
      break
     }
     if ((f | 0) == 1) c[d + 32 >> 2] = 1
    }
   while (0);
   return
  }

  function Kh(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    i = 0;
   i = c[a + 4 >> 2] | 0;
   h = i >> 8;
   if (i & 1) h = c[(c[e >> 2] | 0) + h >> 2] | 0;
   a = c[a >> 2] | 0;
   Bb[c[(c[a >> 2] | 0) + 20 >> 2] & 7](a, b, d, e + h | 0, (i & 2 | 0) != 0 ? f : 2, g);
   return
  }

  function Lh(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0;
   h = c[a + 4 >> 2] | 0;
   g = h >> 8;
   if (h & 1) g = c[(c[d >> 2] | 0) + g >> 2] | 0;
   a = c[a >> 2] | 0;
   qb[c[(c[a >> 2] | 0) + 24 >> 2] & 3](a, b, d + g | 0, (h & 2 | 0) != 0 ? e : 2, f);
   return
  }

  function Mh(b, d, e, f, g) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    i = 0,
    j = 0,
    k = 0;
   a: do
    if ((b | 0) == (c[d + 8 >> 2] | 0)) {
     if ((c[d + 4 >> 2] | 0) == (e | 0) ? (h = d + 28 | 0, (c[h >> 2] | 0) != 1) : 0) c[h >> 2] = f
    } else {
     if ((b | 0) != (c[d >> 2] | 0)) {
      j = c[b + 8 >> 2] | 0;
      qb[c[(c[j >> 2] | 0) + 24 >> 2] & 3](j, d, e, f, g);
      break
     }
     if ((c[d + 16 >> 2] | 0) != (e | 0) ? (i = d + 20 | 0, (c[i >> 2] | 0) != (e | 0)) : 0) {
      c[d + 32 >> 2] = f;
      f = d + 44 | 0;
      if ((c[f >> 2] | 0) == 4) break;
      h = d + 52 | 0;
      a[h >> 0] = 0;
      k = d + 53 | 0;
      a[k >> 0] = 0;
      b = c[b + 8 >> 2] | 0;
      Bb[c[(c[b >> 2] | 0) + 20 >> 2] & 7](b, d, e, e, 1, g);
      if (a[k >> 0] | 0) {
       if (!(a[h >> 0] | 0)) {
        h = 1;
        j = 13
       }
      } else {
       h = 0;
       j = 13
      }
      do
       if ((j | 0) == 13) {
        c[i >> 2] = e;
        k = d + 40 | 0;
        c[k >> 2] = (c[k >> 2] | 0) + 1;
        if ((c[d + 36 >> 2] | 0) == 1 ? (c[d + 24 >> 2] | 0) == 2 : 0) {
         a[d + 54 >> 0] = 1;
         if (h) break
        } else j = 16;
        if ((j | 0) == 16 ? h : 0) break;
        c[f >> 2] = 4;
        break a
       }
      while (0);
      c[f >> 2] = 3;
      break
     }
     if ((f | 0) == 1) c[d + 32 >> 2] = 1
    }
   while (0);
   return
  }

  function Nh(b, d, e, f, g) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    i = 0;
   do
    if ((b | 0) == (c[d + 8 >> 2] | 0)) {
     if ((c[d + 4 >> 2] | 0) == (e | 0) ? (i = d + 28 | 0, (c[i >> 2] | 0) != 1) : 0) c[i >> 2] = f
    } else if ((b | 0) == (c[d >> 2] | 0)) {
    if ((c[d + 16 >> 2] | 0) != (e | 0) ? (h = d + 20 | 0, (c[h >> 2] | 0) != (e | 0)) : 0) {
     c[d + 32 >> 2] = f;
     c[h >> 2] = e;
     g = d + 40 | 0;
     c[g >> 2] = (c[g >> 2] | 0) + 1;
     if ((c[d + 36 >> 2] | 0) == 1 ? (c[d + 24 >> 2] | 0) == 2 : 0) a[d + 54 >> 0] = 1;
     c[d + 44 >> 2] = 4;
     break
    }
    if ((f | 0) == 1) c[d + 32 >> 2] = 1
   } while (0);
   return
  }

  function Oh(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0;
   if ((b | 0) == (c[d + 8 >> 2] | 0)) Ih(0, d, e, f, g);
   else {
    m = d + 52 | 0;
    n = a[m >> 0] | 0;
    o = d + 53 | 0;
    p = a[o >> 0] | 0;
    l = c[b + 12 >> 2] | 0;
    i = b + 16 + (l << 3) | 0;
    a[m >> 0] = 0;
    a[o >> 0] = 0;
    Kh(b + 16 | 0, d, e, f, g, h);
    a: do
     if ((l | 0) > 1) {
      j = d + 24 | 0;
      k = b + 8 | 0;
      l = d + 54 | 0;
      b = b + 24 | 0;
      do {
       if (a[l >> 0] | 0) break a;
       if (!(a[m >> 0] | 0)) {
        if ((a[o >> 0] | 0) != 0 ? (c[k >> 2] & 1 | 0) == 0 : 0) break a
       } else {
        if ((c[j >> 2] | 0) == 1) break a;
        if (!(c[k >> 2] & 2)) break a
       }
       a[m >> 0] = 0;
       a[o >> 0] = 0;
       Kh(b, d, e, f, g, h);
       b = b + 8 | 0
      } while (b >>> 0 < i >>> 0)
     }
    while (0);
    a[m >> 0] = n;
    a[o >> 0] = p
   }
   return
  }

  function Ph(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   if ((a | 0) == (c[b + 8 >> 2] | 0)) Ih(0, b, d, e, f);
   else {
    a = c[a + 8 >> 2] | 0;
    Bb[c[(c[a >> 2] | 0) + 20 >> 2] & 7](a, b, d, e, f, g)
   }
   return
  }

  function Qh(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   if ((a | 0) == (c[b + 8 >> 2] | 0)) Ih(0, b, d, e, f);
   return
  }

  function Rh() {
   var a = 0;
   a = Ca(4) | 0;
   oh(a);
   ab(a | 0, 720, 73)
  }

  function Sh(a, b, c, d) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   a = Si(a, b, c) | 0;
   return a | 0
  }

  function Th(a, b, c, d) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   a = Ti(a, b, c) | 0;
   return a | 0
  }

  function Uh() {
   return 4032
  }

  function Vh() {
   return 4036
  }

  function Wh() {
   return 4040
  }

  function Xh(a) {
   a = a | 0;
   return ((a | 0) == 32 | (a + -9 | 0) >>> 0 < 5) & 1 | 0
  }

  function Yh(a) {
   a = a | 0;
   if ((a + -48 | 0) >>> 0 < 10) a = 1;
   else a = ((a | 32) + -97 | 0) >>> 0 < 6;
   return a & 1 | 0
  }

  function Zh() {
   var a = 0;
   if (!0) a = 4044;
   else a = c[(Ua() | 0) + 60 >> 2] | 0;
   return a | 0
  }

  function _h(b) {
   b = b | 0;
   var c = 0,
    e = 0;
   c = 0;
   while (1) {
    if ((d[19315 + c >> 0] | 0) == (b | 0)) {
     e = 2;
     break
    }
    c = c + 1 | 0;
    if ((c | 0) == 87) {
     c = 87;
     b = 19403;
     e = 5;
     break
    }
   }
   if ((e | 0) == 2)
    if (!c) b = 19403;
    else {
     b = 19403;
     e = 5
    }
   if ((e | 0) == 5)
    while (1) {
     e = b;
     while (1) {
      b = e + 1 | 0;
      if (!(a[e >> 0] | 0)) break;
      else e = b
     }
     c = c + -1 | 0;
     if (!c) break;
     else e = 5
    }
   return b | 0
  }

  function $h(b, e, f) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   var g = 0.0,
    h = 0,
    j = 0.0,
    k = 0,
    l = 0,
    m = 0.0,
    n = 0,
    o = 0,
    p = 0,
    q = 0.0,
    t = 0.0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    D = 0,
    E = 0,
    F = 0,
    G = 0,
    H = 0,
    I = 0,
    J = 0,
    K = 0,
    L = 0,
    M = 0.0;
   L = i;
   i = i + 512 | 0;
   H = L;
   switch (e | 0) {
    case 0:
     {
      K = 24;J = -149;A = 4;
      break
     }
    case 1:
     {
      K = 53;J = -1074;A = 4;
      break
     }
    case 2:
     {
      K = 53;J = -1074;A = 4;
      break
     }
    default:
     g = 0.0
   }
   a: do
    if ((A | 0) == 4) {
     E = b + 4 | 0;
     D = b + 100 | 0;
     do {
      e = c[E >> 2] | 0;
      if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
       c[E >> 2] = e + 1;
       e = d[e >> 0] | 0
      } else e = ci(b) | 0
     } while ((Xh(e) | 0) != 0);
     b: do switch (e | 0) {
       case 43:
       case 45:
        {
         h = 1 - (((e | 0) == 45 & 1) << 1) | 0;e = c[E >> 2] | 0;
         if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
          c[E >> 2] = e + 1;
          e = d[e >> 0] | 0;
          I = h;
          break b
         } else {
          e = ci(b) | 0;
          I = h;
          break b
         }
        }
       default:
        I = 1
      }
      while (0);
      h = e;
     e = 0;
     do {
      if ((h | 32 | 0) != (a[21207 + e >> 0] | 0)) break;
      do
       if (e >>> 0 < 7) {
        h = c[E >> 2] | 0;
        if (h >>> 0 < (c[D >> 2] | 0) >>> 0) {
         c[E >> 2] = h + 1;
         h = d[h >> 0] | 0;
         break
        } else {
         h = ci(b) | 0;
         break
        }
       }
      while (0);
      e = e + 1 | 0
     } while (e >>> 0 < 8);
     c: do switch (e | 0) {
       case 8:
        break;
       case 3:
        {
         A = 23;
         break
        }
       default:
        {
         k = (f | 0) != 0;
         if (k & e >>> 0 > 3)
          if ((e | 0) == 8) break c;
          else {
           A = 23;
           break c
          }
         d: do
          if (!e) {
           e = 0;
           do {
            if ((h | 32 | 0) != (a[22012 + e >> 0] | 0)) break d;
            do
             if (e >>> 0 < 2) {
              h = c[E >> 2] | 0;
              if (h >>> 0 < (c[D >> 2] | 0) >>> 0) {
               c[E >> 2] = h + 1;
               h = d[h >> 0] | 0;
               break
              } else {
               h = ci(b) | 0;
               break
              }
             }
            while (0);
            e = e + 1 | 0
           } while (e >>> 0 < 3)
          }while (0);
         switch (e | 0) {
          case 3:
           {
            e = c[E >> 2] | 0;
            if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
             c[E >> 2] = e + 1;
             e = d[e >> 0] | 0
            } else e = ci(b) | 0;
            if ((e | 0) == 40) e = 1;
            else {
             if (!(c[D >> 2] | 0)) {
              g = r;
              break a
             }
             c[E >> 2] = (c[E >> 2] | 0) + -1;
             g = r;
             break a
            }
            while (1) {
             h = c[E >> 2] | 0;
             if (h >>> 0 < (c[D >> 2] | 0) >>> 0) {
              c[E >> 2] = h + 1;
              h = d[h >> 0] | 0
             } else h = ci(b) | 0;
             if (!((h + -48 | 0) >>> 0 < 10 | (h + -65 | 0) >>> 0 < 26) ? !((h | 0) == 95 | (h + -97 | 0) >>> 0 < 26) : 0) break;
             e = e + 1 | 0
            }
            if ((h | 0) == 41) {
             g = r;
             break a
            }
            h = (c[D >> 2] | 0) == 0;
            if (!h) c[E >> 2] = (c[E >> 2] | 0) + -1;
            if (!k) {
             c[(Zh() | 0) >> 2] = 22;
             bi(b, 0);
             g = 0.0;
             break a
            }
            if (!e) {
             g = r;
             break a
            }
            while (1) {
             e = e + -1 | 0;
             if (!h) c[E >> 2] = (c[E >> 2] | 0) + -1;
             if (!e) {
              g = r;
              break a
             }
            }
           }
          case 0:
           {
            do
             if ((h | 0) == 48) {
              e = c[E >> 2] | 0;
              if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
               c[E >> 2] = e + 1;
               e = d[e >> 0] | 0
              } else e = ci(b) | 0;
              if ((e | 32 | 0) != 120) {
               if (!(c[D >> 2] | 0)) {
                e = 48;
                break
               }
               c[E >> 2] = (c[E >> 2] | 0) + -1;
               e = 48;
               break
              }
              e = c[E >> 2] | 0;
              if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
               c[E >> 2] = e + 1;
               e = d[e >> 0] | 0;
               k = 0
              } else {
               e = ci(b) | 0;
               k = 0
              }
              e: while (1) {
               switch (e | 0) {
                case 46:
                 {
                  A = 74;
                  break e
                 }
                case 48:
                 break;
                default:
                 {
                  y = 0;l = 0;x = 0;h = 0;n = k;o = 0;w = 0;m = 1.0;k = 0;g = 0.0;
                  break e
                 }
               }
               e = c[E >> 2] | 0;
               if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
                c[E >> 2] = e + 1;
                e = d[e >> 0] | 0;
                k = 1;
                continue
               } else {
                e = ci(b) | 0;
                k = 1;
                continue
               }
              }
              if ((A | 0) == 74) {
               e = c[E >> 2] | 0;
               if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
                c[E >> 2] = e + 1;
                e = d[e >> 0] | 0
               } else e = ci(b) | 0;
               if ((e | 0) == 48) {
                k = 0;
                h = 0;
                do {
                 e = c[E >> 2] | 0;
                 if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
                  c[E >> 2] = e + 1;
                  e = d[e >> 0] | 0
                 } else e = ci(b) | 0;
                 k = ms(k | 0, h | 0, -1, -1) | 0;
                 h = C
                } while ((e | 0) == 48);
                y = 0;
                l = 0;
                x = k;
                n = 1;
                o = 1;
                w = 0;
                m = 1.0;
                k = 0;
                g = 0.0
               } else {
                y = 0;
                l = 0;
                x = 0;
                h = 0;
                n = k;
                o = 1;
                w = 0;
                m = 1.0;
                k = 0;
                g = 0.0
               }
              }
              while (1) {
               u = e + -48 | 0;
               p = e | 32;
               if (u >>> 0 >= 10) {
                v = (e | 0) == 46;
                if (!(v | (p + -97 | 0) >>> 0 < 6)) {
                 p = x;
                 u = y;
                 break
                }
                if (v)
                 if (!o) {
                  v = l;
                  h = y;
                  u = y;
                  o = 1;
                  p = w;
                  j = m
                 } else {
                  p = x;
                  u = y;
                  e = 46;
                  break
                 } else A = 86
               } else A = 86;
               if ((A | 0) == 86) {
                A = 0;
                e = (e | 0) > 57 ? p + -87 | 0 : u;
                do
                 if (!((y | 0) < 0 | (y | 0) == 0 & l >>> 0 < 8)) {
                  if ((y | 0) < 0 | (y | 0) == 0 & l >>> 0 < 14) {
                   t = m * .0625;
                   p = w;
                   j = t;
                   g = g + t * +(e | 0);
                   break
                  }
                  if ((w | 0) != 0 | (e | 0) == 0) {
                   p = w;
                   j = m
                  } else {
                   p = 1;
                   j = m;
                   g = g + m * .5
                  }
                 } else {
                  p = w;
                  j = m;
                  k = e + (k << 4) | 0
                 }
                while (0);
                l = ms(l | 0, y | 0, 1, 0) | 0;
                v = x;
                u = C;
                n = 1
               }
               e = c[E >> 2] | 0;
               if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
                c[E >> 2] = e + 1;
                y = u;
                x = v;
                e = d[e >> 0] | 0;
                w = p;
                m = j;
                continue
               } else {
                y = u;
                x = v;
                e = ci(b) | 0;
                w = p;
                m = j;
                continue
               }
              }
              if (!n) {
               e = (c[D >> 2] | 0) == 0;
               if (!e) c[E >> 2] = (c[E >> 2] | 0) + -1;
               if (f) {
                if (!e ? (z = c[E >> 2] | 0, c[E >> 2] = z + -1, (o | 0) != 0) : 0) c[E >> 2] = z + -2
               } else bi(b, 0);
               g = +(I | 0) * 0.0;
               break a
              }
              n = (o | 0) == 0;
              o = n ? l : p;
              n = n ? u : h;
              if ((u | 0) < 0 | (u | 0) == 0 & l >>> 0 < 8) {
               h = u;
               do {
                k = k << 4;
                l = ms(l | 0, h | 0, 1, 0) | 0;
                h = C
               } while ((h | 0) < 0 | (h | 0) == 0 & l >>> 0 < 8)
              }
              if ((e | 32 | 0) == 112) {
               h = aj(b, f) | 0;
               e = C;
               if ((h | 0) == 0 & (e | 0) == -2147483648) {
                if (!f) {
                 bi(b, 0);
                 g = 0.0;
                 break a
                }
                if (!(c[D >> 2] | 0)) {
                 h = 0;
                 e = 0
                } else {
                 c[E >> 2] = (c[E >> 2] | 0) + -1;
                 h = 0;
                 e = 0
                }
               }
              } else if (!(c[D >> 2] | 0)) {
               h = 0;
               e = 0
              } else {
               c[E >> 2] = (c[E >> 2] | 0) + -1;
               h = 0;
               e = 0
              }
              H = os(o | 0, n | 0, 2) | 0;
              H = ms(H | 0, C | 0, -32, -1) | 0;
              e = ms(H | 0, C | 0, h | 0, e | 0) | 0;
              h = C;
              if (!k) {
               g = +(I | 0) * 0.0;
               break a
              }
              if ((h | 0) > 0 | (h | 0) == 0 & e >>> 0 > (0 - J | 0) >>> 0) {
               c[(Zh() | 0) >> 2] = 34;
               g = +(I | 0) * 1797693134862315708145274.0e284 * 1797693134862315708145274.0e284;
               break a
              }
              H = J + -106 | 0;
              G = ((H | 0) < 0) << 31 >> 31;
              if ((h | 0) < (G | 0) | (h | 0) == (G | 0) & e >>> 0 < H >>> 0) {
               c[(Zh() | 0) >> 2] = 34;
               g = +(I | 0) * 2.2250738585072014e-308 * 2.2250738585072014e-308;
               break a
              }
              if ((k | 0) > -1) {
               do {
                G = !(g >= .5);
                H = G & 1 | k << 1;
                k = H ^ 1;
                g = g + (G ? g : g + -1.0);
                e = ms(e | 0, h | 0, -1, -1) | 0;
                h = C
               } while ((H | 0) > -1);
               l = e;
               m = g
              } else {
               l = e;
               m = g
              }
              e = js(32, 0, J | 0, ((J | 0) < 0) << 31 >> 31 | 0) | 0;
              e = ms(l | 0, h | 0, e | 0, C | 0) | 0;
              J = C;
              if (0 > (J | 0) | 0 == (J | 0) & K >>> 0 > e >>> 0)
               if ((e | 0) < 0) {
                e = 0;
                A = 127
               } else A = 125;
              else {
               e = K;
               A = 125
              }
              if ((A | 0) == 125)
               if ((e | 0) < 53) A = 127;
               else {
                h = e;
                j = +(I | 0);
                g = 0.0
               }
              if ((A | 0) == 127) {
               g = +(I | 0);
               h = e;
               j = g;
               g = +mi(+ri(1.0, 84 - e | 0), g)
              }
              K = (k & 1 | 0) == 0 & (m != 0.0 & (h | 0) < 32);
              g = j * (K ? 0.0 : m) + (g + j * +(((K & 1) + k | 0) >>> 0)) - g;
              if (!(g != 0.0)) c[(Zh() | 0) >> 2] = 34;
              g = +si(g, l);
              break a
             } else e = h;
            while (0);
            F = J + K | 0;G = 0 - F | 0;k = 0;f: while (1) {
             switch (e | 0) {
              case 46:
               {
                A = 138;
                break f
               }
              case 48:
               break;
              default:
               {
                h = 0;p = 0;o = 0;
                break f
               }
             }
             e = c[E >> 2] | 0;
             if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
              c[E >> 2] = e + 1;
              e = d[e >> 0] | 0;
              k = 1;
              continue
             } else {
              e = ci(b) | 0;
              k = 1;
              continue
             }
            }
            if ((A | 0) == 138) {
             e = c[E >> 2] | 0;
             if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
              c[E >> 2] = e + 1;
              e = d[e >> 0] | 0
             } else e = ci(b) | 0;
             if ((e | 0) == 48) {
              h = 0;
              e = 0;
              while (1) {
               h = ms(h | 0, e | 0, -1, -1) | 0;
               k = C;
               e = c[E >> 2] | 0;
               if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
                c[E >> 2] = e + 1;
                e = d[e >> 0] | 0
               } else e = ci(b) | 0;
               if ((e | 0) == 48) e = k;
               else {
                p = k;
                k = 1;
                o = 1;
                break
               }
              }
             } else {
              h = 0;
              p = 0;
              o = 1
             }
            }
            c[H >> 2] = 0;n = e + -48 | 0;l = (e | 0) == 46;g: do
             if (l | n >>> 0 < 10) {
              B = H + 496 | 0;
              y = 0;
              v = 0;
              w = l;
              A = p;
              u = k;
              z = o;
              k = 0;
              l = 0;
              o = 0;
              h: while (1) {
               do
                if (w)
                 if (!z) {
                  h = y;
                  p = v;
                  z = 1
                 } else {
                  p = A;
                  e = y;
                  n = v;
                  break h
                 } else {
                w = ms(y | 0, v | 0, 1, 0) | 0;
                v = C;
                x = (e | 0) != 48;
                if ((l | 0) >= 125) {
                 if (!x) {
                  p = A;
                  y = w;
                  break
                 }
                 c[B >> 2] = c[B >> 2] | 1;
                 p = A;
                 y = w;
                 break
                }
                p = H + (l << 2) | 0;
                if (k) n = e + -48 + ((c[p >> 2] | 0) * 10 | 0) | 0;
                c[p >> 2] = n;
                k = k + 1 | 0;
                n = (k | 0) == 9;
                p = A;
                y = w;
                u = 1;
                k = n ? 0 : k;
                l = (n & 1) + l | 0;
                o = x ? w : o
               } while (0);
               e = c[E >> 2] | 0;
               if (e >>> 0 < (c[D >> 2] | 0) >>> 0) {
                c[E >> 2] = e + 1;
                e = d[e >> 0] | 0
               } else e = ci(b) | 0;
               n = e + -48 | 0;
               w = (e | 0) == 46;
               if (!(w | n >>> 0 < 10)) {
                n = z;
                A = 161;
                break g
               } else A = p
              }
              u = (u | 0) != 0;
              A = 169
             } else {
              y = 0;
              v = 0;
              u = k;
              n = o;
              k = 0;
              l = 0;
              o = 0;
              A = 161
             }while (0);do
             if ((A | 0) == 161) {
              B = (n | 0) == 0;
              h = B ? y : h;
              p = B ? v : p;
              u = (u | 0) != 0;
              if (!((e | 32 | 0) == 101 & u))
               if ((e | 0) > -1) {
                e = y;
                n = v;
                A = 169;
                break
               } else {
                e = y;
                n = v;
                A = 171;
                break
               }
              n = aj(b, f) | 0;
              e = C;
              if ((n | 0) == 0 & (e | 0) == -2147483648) {
               if (!f) {
                bi(b, 0);
                g = 0.0;
                break
               }
               if (!(c[D >> 2] | 0)) {
                n = 0;
                e = 0
               } else {
                c[E >> 2] = (c[E >> 2] | 0) + -1;
                n = 0;
                e = 0
               }
              }
              h = ms(n | 0, e | 0, h | 0, p | 0) | 0;
              u = y;
              p = C;
              n = v;
              A = 173
             }
            while (0);
            if ((A | 0) == 169)
             if (c[D >> 2] | 0) {
              c[E >> 2] = (c[E >> 2] | 0) + -1;
              if (u) {
               u = e;
               A = 173
              } else A = 172
             } else A = 171;if ((A | 0) == 171)
             if (u) {
              u = e;
              A = 173
             } else A = 172;do
             if ((A | 0) == 172) {
              c[(Zh() | 0) >> 2] = 22;
              bi(b, 0);
              g = 0.0
             } else if ((A | 0) == 173) {
             e = c[H >> 2] | 0;
             if (!e) {
              g = +(I | 0) * 0.0;
              break
             }
             if (((n | 0) < 0 | (n | 0) == 0 & u >>> 0 < 10) & ((h | 0) == (u | 0) & (p | 0) == (n | 0)) ? K >>> 0 > 30 | (e >>> K | 0) == 0 : 0) {
              g = +(I | 0) * +(e >>> 0);
              break
             }
             b = (J | 0) / -2 | 0;
             E = ((b | 0) < 0) << 31 >> 31;
             if ((p | 0) > (E | 0) | (p | 0) == (E | 0) & h >>> 0 > b >>> 0) {
              c[(Zh() | 0) >> 2] = 34;
              g = +(I | 0) * 1797693134862315708145274.0e284 * 1797693134862315708145274.0e284;
              break
             }
             b = J + -106 | 0;
             E = ((b | 0) < 0) << 31 >> 31;
             if ((p | 0) < (E | 0) | (p | 0) == (E | 0) & h >>> 0 < b >>> 0) {
              c[(Zh() | 0) >> 2] = 34;
              g = +(I | 0) * 2.2250738585072014e-308 * 2.2250738585072014e-308;
              break
             }
             if (k) {
              if ((k | 0) < 9) {
               n = H + (l << 2) | 0;
               e = c[n >> 2] | 0;
               do {
                e = e * 10 | 0;
                k = k + 1 | 0
               } while ((k | 0) != 9);
               c[n >> 2] = e
              }
              l = l + 1 | 0
             }
             if ((o | 0) < 9 ? (o | 0) <= (h | 0) & (h | 0) < 18 : 0) {
              if ((h | 0) == 9) {
               g = +(I | 0) * +((c[H >> 2] | 0) >>> 0);
               break
              }
              if ((h | 0) < 9) {
               g = +(I | 0) * +((c[H >> 2] | 0) >>> 0) / +(c[4048 + (8 - h << 2) >> 2] | 0);
               break
              }
              b = K + 27 + (_(h, -3) | 0) | 0;
              e = c[H >> 2] | 0;
              if ((b | 0) > 30 | (e >>> b | 0) == 0) {
               g = +(I | 0) * +(e >>> 0) * +(c[4048 + (h + -10 << 2) >> 2] | 0);
               break
              }
             }
             e = (h | 0) % 9 | 0;
             if (!e) {
              k = 0;
              e = 0
             } else {
              u = (h | 0) > -1 ? e : e + 9 | 0;
              n = c[4048 + (8 - u << 2) >> 2] | 0;
              if (l) {
               o = 1e9 / (n | 0) | 0;
               k = 0;
               e = 0;
               p = 0;
               do {
                D = H + (p << 2) | 0;
                E = c[D >> 2] | 0;
                b = ((E >>> 0) / (n >>> 0) | 0) + e | 0;
                c[D >> 2] = b;
                e = _((E >>> 0) % (n >>> 0) | 0, o) | 0;
                b = (p | 0) == (k | 0) & (b | 0) == 0;
                p = p + 1 | 0;
                h = b ? h + -9 | 0 : h;
                k = b ? p & 127 : k
               } while ((p | 0) != (l | 0));
               if (e) {
                c[H + (l << 2) >> 2] = e;
                l = l + 1 | 0
               }
              } else {
               k = 0;
               l = 0
              }
              e = 0;
              h = 9 - u + h | 0
             }
             i: while (1) {
              v = (h | 0) < 18;
              w = (h | 0) == 18;
              x = H + (k << 2) | 0;
              do {
               if (!v) {
                if (!w) break i;
                if ((c[x >> 2] | 0) >>> 0 >= 9007199) {
                 h = 18;
                 break i
                }
               }
               n = 0;
               o = l + 127 | 0;
               while (1) {
                u = o & 127;
                p = H + (u << 2) | 0;
                o = os(c[p >> 2] | 0, 0, 29) | 0;
                o = ms(o | 0, C | 0, n | 0, 0) | 0;
                n = C;
                if (n >>> 0 > 0 | (n | 0) == 0 & o >>> 0 > 1e9) {
                 b = ws(o | 0, n | 0, 1e9, 0) | 0;
                 o = xs(o | 0, n | 0, 1e9, 0) | 0;
                 n = b
                } else n = 0;
                c[p >> 2] = o;
                b = (u | 0) == (k | 0);
                l = (u | 0) != (l + 127 & 127 | 0) | b ? l : (o | 0) == 0 ? u : l;
                if (b) break;
                else o = u + -1 | 0
               }
               e = e + -29 | 0
              } while ((n | 0) == 0);
              k = k + 127 & 127;
              if ((k | 0) == (l | 0)) {
               b = l + 127 & 127;
               l = H + ((l + 126 & 127) << 2) | 0;
               c[l >> 2] = c[l >> 2] | c[H + (b << 2) >> 2];
               l = b
              }
              c[H + (k << 2) >> 2] = n;
              h = h + 9 | 0
             }
             j: while (1) {
              y = l + 1 & 127;
              x = H + ((l + 127 & 127) << 2) | 0;
              while (1) {
               v = (h | 0) == 18;
               w = (h | 0) > 27 ? 9 : 1;
               u = v ^ 1;
               while (1) {
                o = k & 127;
                p = (o | 0) == (l | 0);
                do
                 if (!p) {
                  n = c[H + (o << 2) >> 2] | 0;
                  if (n >>> 0 < 9007199) {
                   A = 219;
                   break
                  }
                  if (n >>> 0 > 9007199) break;
                  n = k + 1 & 127;
                  if ((n | 0) == (l | 0)) {
                   A = 219;
                   break
                  }
                  n = c[H + (n << 2) >> 2] | 0;
                  if (n >>> 0 < 254740991) {
                   A = 219;
                   break
                  }
                  if (!(n >>> 0 > 254740991 | u)) {
                   h = o;
                   break j
                  }
                 } else A = 219;
                while (0);
                if ((A | 0) == 219 ? (A = 0, v) : 0) {
                 A = 220;
                 break j
                }
                e = e + w | 0;
                if ((k | 0) == (l | 0)) k = l;
                else break
               }
               u = (1 << w) + -1 | 0;
               v = 1e9 >>> w;
               o = k;
               n = 0;
               p = k;
               while (1) {
                E = H + (p << 2) | 0;
                b = c[E >> 2] | 0;
                k = (b >>> w) + n | 0;
                c[E >> 2] = k;
                n = _(b & u, v) | 0;
                k = (p | 0) == (o | 0) & (k | 0) == 0;
                p = p + 1 & 127;
                h = k ? h + -9 | 0 : h;
                k = k ? p : o;
                if ((p | 0) == (l | 0)) break;
                else o = k
               }
               if (!n) continue;
               if ((y | 0) != (k | 0)) break;
               c[x >> 2] = c[x >> 2] | 1
              }
              c[H + (l << 2) >> 2] = n;
              l = y
             }
             if ((A | 0) == 220)
              if (p) {
               c[H + (y + -1 << 2) >> 2] = 0;
               h = l;
               l = y
              } else h = o;
             g = +((c[H + (h << 2) >> 2] | 0) >>> 0);
             h = k + 1 & 127;
             if ((h | 0) == (l | 0)) {
              l = k + 2 & 127;
              c[H + (l + -1 << 2) >> 2] = 0
             }
             t = +(I | 0);
             j = t * (g * 1.0e9 + +((c[H + (h << 2) >> 2] | 0) >>> 0));
             v = e + 53 | 0;
             p = v - J | 0;
             u = (p | 0) < (K | 0);
             h = u & 1;
             o = u ? ((p | 0) < 0 ? 0 : p) : K;
             if ((o | 0) < 53) {
              M = +mi(+ri(1.0, 105 - o | 0), j);
              m = +oi(j, +ri(1.0, 53 - o | 0));
              q = M;
              g = m;
              m = M + (j - m)
             } else {
              q = 0.0;
              g = 0.0;
              m = j
             }
             n = k + 2 & 127;
             do
              if ((n | 0) == (l | 0)) j = g;
              else {
               n = c[H + (n << 2) >> 2] | 0;
               do
                if (n >>> 0 >= 5e8) {
                 if (n >>> 0 > 5e8) {
                  g = t * .75 + g;
                  break
                 }
                 if ((k + 3 & 127 | 0) == (l | 0)) {
                  g = t * .5 + g;
                  break
                 } else {
                  g = t * .75 + g;
                  break
                 }
                } else {
                 if ((n | 0) == 0 ? (k + 3 & 127 | 0) == (l | 0) : 0) break;
                 g = t * .25 + g
                }
               while (0);
               if ((53 - o | 0) <= 1) {
                j = g;
                break
               }
               if (+oi(g, 1.0) != 0.0) {
                j = g;
                break
               }
               j = g + 1.0
              }
             while (0);
             g = m + j - q;
             do
              if ((v & 2147483647 | 0) > (-2 - F | 0)) {
               if (+N(+g) >= 9007199254740992.0) {
                h = u & (o | 0) == (p | 0) ? 0 : h;
                e = e + 1 | 0;
                g = g * .5
               }
               if ((e + 50 | 0) <= (G | 0) ? !(j != 0.0 & (h | 0) != 0) : 0) break;
               c[(Zh() | 0) >> 2] = 34
              }
             while (0);
             g = +si(g, e)
            } while (0);
            break a
           }
          default:
           {
            if (c[D >> 2] | 0) c[E >> 2] = (c[E >> 2] | 0) + -1;c[(Zh() | 0) >> 2] = 22;bi(b, 0);g = 0.0;
            break a
           }
         }
        }
      }
      while (0);
      if ((A | 0) == 23) {
       h = (c[D >> 2] | 0) == 0;
       if (!h) c[E >> 2] = (c[E >> 2] | 0) + -1;
       if ((f | 0) != 0 & e >>> 0 > 3)
        do {
         if (!h) c[E >> 2] = (c[E >> 2] | 0) + -1;
         e = e + -1 | 0
        } while (e >>> 0 > 3)
      }
     g = +(I | 0) * s
    }
   while (0);
   i = L;
   return +g
  }

  function ai(b, e, f, g, h) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0;
   a: do
    if (e >>> 0 > 36) {
     c[(Zh() | 0) >> 2] = 22;
     h = 0;
     g = 0
    } else {
     r = b + 4 | 0;
     q = b + 100 | 0;
     do {
      i = c[r >> 2] | 0;
      if (i >>> 0 < (c[q >> 2] | 0) >>> 0) {
       c[r >> 2] = i + 1;
       i = d[i >> 0] | 0
      } else i = ci(b) | 0
     } while ((Xh(i) | 0) != 0);
     b: do switch (i | 0) {
       case 43:
       case 45:
        {
         j = ((i | 0) == 45) << 31 >> 31;i = c[r >> 2] | 0;
         if (i >>> 0 < (c[q >> 2] | 0) >>> 0) {
          c[r >> 2] = i + 1;
          i = d[i >> 0] | 0;
          p = j;
          break b
         } else {
          i = ci(b) | 0;
          p = j;
          break b
         }
        }
       default:
        p = 0
      }
      while (0);
      j = (e | 0) == 0;
     do
      if ((e & -17 | 0) == 0 & (i | 0) == 48) {
       i = c[r >> 2] | 0;
       if (i >>> 0 < (c[q >> 2] | 0) >>> 0) {
        c[r >> 2] = i + 1;
        i = d[i >> 0] | 0
       } else i = ci(b) | 0;
       if ((i | 32 | 0) != 120)
        if (j) {
         e = 8;
         n = 46;
         break
        } else {
         n = 32;
         break
        }
       e = c[r >> 2] | 0;
       if (e >>> 0 < (c[q >> 2] | 0) >>> 0) {
        c[r >> 2] = e + 1;
        i = d[e >> 0] | 0
       } else i = ci(b) | 0;
       if ((d[21216 + (i + 1) >> 0] | 0) > 15) {
        g = (c[q >> 2] | 0) == 0;
        if (!g) c[r >> 2] = (c[r >> 2] | 0) + -1;
        if (!f) {
         bi(b, 0);
         h = 0;
         g = 0;
         break a
        }
        if (g) {
         h = 0;
         g = 0;
         break a
        }
        c[r >> 2] = (c[r >> 2] | 0) + -1;
        h = 0;
        g = 0;
        break a
       } else {
        e = 16;
        n = 46
       }
      } else {
       e = j ? 10 : e;
       if ((d[21216 + (i + 1) >> 0] | 0) >>> 0 < e >>> 0) n = 32;
       else {
        if (c[q >> 2] | 0) c[r >> 2] = (c[r >> 2] | 0) + -1;
        bi(b, 0);
        c[(Zh() | 0) >> 2] = 22;
        h = 0;
        g = 0;
        break a
       }
      }
     while (0);
     if ((n | 0) == 32)
      if ((e | 0) == 10) {
       e = i + -48 | 0;
       if (e >>> 0 < 10) {
        i = 0;
        while (1) {
         j = (i * 10 | 0) + e | 0;
         e = c[r >> 2] | 0;
         if (e >>> 0 < (c[q >> 2] | 0) >>> 0) {
          c[r >> 2] = e + 1;
          i = d[e >> 0] | 0
         } else i = ci(b) | 0;
         e = i + -48 | 0;
         if (!(e >>> 0 < 10 & j >>> 0 < 429496729)) {
          e = j;
          break
         } else i = j
        }
        j = 0
       } else {
        e = 0;
        j = 0
       }
       f = i + -48 | 0;
       if (f >>> 0 < 10) {
        while (1) {
         k = vs(e | 0, j | 0, 10, 0) | 0;
         l = C;
         m = ((f | 0) < 0) << 31 >> 31;
         o = ~m;
         if (l >>> 0 > o >>> 0 | (l | 0) == (o | 0) & k >>> 0 > ~f >>> 0) {
          k = e;
          break
         }
         e = ms(k | 0, l | 0, f | 0, m | 0) | 0;
         j = C;
         i = c[r >> 2] | 0;
         if (i >>> 0 < (c[q >> 2] | 0) >>> 0) {
          c[r >> 2] = i + 1;
          i = d[i >> 0] | 0
         } else i = ci(b) | 0;
         f = i + -48 | 0;
         if (!(f >>> 0 < 10 & (j >>> 0 < 429496729 | (j | 0) == 429496729 & e >>> 0 < 2576980378))) {
          k = e;
          break
         }
        }
        if (f >>> 0 > 9) {
         i = k;
         e = p
        } else {
         e = 10;
         n = 72
        }
       } else {
        i = e;
        e = p
       }
      } else n = 46;
     c: do
      if ((n | 0) == 46) {
       if (!(e + -1 & e)) {
        n = a[21473 + ((e * 23 | 0) >>> 5 & 7) >> 0] | 0;
        j = a[21216 + (i + 1) >> 0] | 0;
        f = j & 255;
        if (f >>> 0 < e >>> 0) {
         i = 0;
         while (1) {
          k = f | i << n;
          i = c[r >> 2] | 0;
          if (i >>> 0 < (c[q >> 2] | 0) >>> 0) {
           c[r >> 2] = i + 1;
           i = d[i >> 0] | 0
          } else i = ci(b) | 0;
          j = a[21216 + (i + 1) >> 0] | 0;
          f = j & 255;
          if (!(k >>> 0 < 134217728 & f >>> 0 < e >>> 0)) break;
          else i = k
         }
         f = 0
        } else {
         f = 0;
         k = 0
        }
        l = ls(-1, -1, n | 0) | 0;
        m = C;
        if ((j & 255) >>> 0 >= e >>> 0 | (f >>> 0 > m >>> 0 | (f | 0) == (m | 0) & k >>> 0 > l >>> 0)) {
         j = f;
         n = 72;
         break
        } else i = f;
        while (1) {
         k = os(k | 0, i | 0, n | 0) | 0;
         f = C;
         k = j & 255 | k;
         i = c[r >> 2] | 0;
         if (i >>> 0 < (c[q >> 2] | 0) >>> 0) {
          c[r >> 2] = i + 1;
          i = d[i >> 0] | 0
         } else i = ci(b) | 0;
         j = a[21216 + (i + 1) >> 0] | 0;
         if ((j & 255) >>> 0 >= e >>> 0 | (f >>> 0 > m >>> 0 | (f | 0) == (m | 0) & k >>> 0 > l >>> 0)) {
          j = f;
          n = 72;
          break c
         } else i = f
        }
       }
       j = a[21216 + (i + 1) >> 0] | 0;
       f = j & 255;
       if (f >>> 0 < e >>> 0) {
        i = 0;
        while (1) {
         k = f + (_(i, e) | 0) | 0;
         i = c[r >> 2] | 0;
         if (i >>> 0 < (c[q >> 2] | 0) >>> 0) {
          c[r >> 2] = i + 1;
          i = d[i >> 0] | 0
         } else i = ci(b) | 0;
         j = a[21216 + (i + 1) >> 0] | 0;
         f = j & 255;
         if (!(k >>> 0 < 119304647 & f >>> 0 < e >>> 0)) break;
         else i = k
        }
        f = 0
       } else {
        k = 0;
        f = 0
       }
       if ((j & 255) >>> 0 < e >>> 0) {
        n = ws(-1, -1, e | 0, 0) | 0;
        o = C;
        m = f;
        while (1) {
         if (m >>> 0 > o >>> 0 | (m | 0) == (o | 0) & k >>> 0 > n >>> 0) {
          j = m;
          n = 72;
          break c
         }
         f = vs(k | 0, m | 0, e | 0, 0) | 0;
         l = C;
         j = j & 255;
         if (l >>> 0 > 4294967295 | (l | 0) == -1 & f >>> 0 > ~j >>> 0) {
          j = m;
          n = 72;
          break c
         }
         k = ms(j | 0, 0, f | 0, l | 0) | 0;
         f = C;
         i = c[r >> 2] | 0;
         if (i >>> 0 < (c[q >> 2] | 0) >>> 0) {
          c[r >> 2] = i + 1;
          i = d[i >> 0] | 0
         } else i = ci(b) | 0;
         j = a[21216 + (i + 1) >> 0] | 0;
         if ((j & 255) >>> 0 >= e >>> 0) {
          j = f;
          n = 72;
          break
         } else m = f
        }
       } else {
        j = f;
        n = 72
       }
      }
     while (0);
     if ((n | 0) == 72)
      if ((d[21216 + (i + 1) >> 0] | 0) >>> 0 < e >>> 0) {
       do {
        i = c[r >> 2] | 0;
        if (i >>> 0 < (c[q >> 2] | 0) >>> 0) {
         c[r >> 2] = i + 1;
         i = d[i >> 0] | 0
        } else i = ci(b) | 0
       } while ((d[21216 + (i + 1) >> 0] | 0) >>> 0 < e >>> 0);
       c[(Zh() | 0) >> 2] = 34;
       j = h;
       i = g;
       e = (g & 1 | 0) == 0 & 0 == 0 ? p : 0
      } else {
       i = k;
       e = p
      }
     if (c[q >> 2] | 0) c[r >> 2] = (c[r >> 2] | 0) + -1;
     if (!(j >>> 0 < h >>> 0 | (j | 0) == (h | 0) & i >>> 0 < g >>> 0)) {
      if (!((g & 1 | 0) != 0 | 0 != 0 | (e | 0) != 0)) {
       c[(Zh() | 0) >> 2] = 34;
       g = ms(g | 0, h | 0, -1, -1) | 0;
       h = C;
       break
      }
      if (j >>> 0 > h >>> 0 | (j | 0) == (h | 0) & i >>> 0 > g >>> 0) {
       c[(Zh() | 0) >> 2] = 34;
       break
      }
     }
     g = ((e | 0) < 0) << 31 >> 31;
     g = js(i ^ e | 0, j ^ g | 0, e | 0, g | 0) | 0;
     h = C
    }
   while (0);
   C = h;
   return g | 0
  }

  function bi(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0;
   c[a + 104 >> 2] = b;
   d = c[a + 4 >> 2] | 0;
   e = c[a + 8 >> 2] | 0;
   f = e - d | 0;
   c[a + 108 >> 2] = f;
   if ((b | 0) != 0 & (f | 0) > (b | 0)) c[a + 100 >> 2] = d + b;
   else c[a + 100 >> 2] = e;
   return
  }

  function ci(b) {
   b = b | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0;
   f = b + 104 | 0;
   i = c[f >> 2] | 0;
   if ((i | 0) != 0 ? (c[b + 108 >> 2] | 0) >= (i | 0) : 0) j = 4;
   else {
    e = Ii(b) | 0;
    if ((e | 0) >= 0) {
     h = c[f >> 2] | 0;
     f = b + 8 | 0;
     if (h) {
      g = c[f >> 2] | 0;
      i = c[b + 4 >> 2] | 0;
      f = g;
      h = h - (c[b + 108 >> 2] | 0) + -1 | 0;
      if ((f - i | 0) > (h | 0)) c[b + 100 >> 2] = i + h;
      else j = 9
     } else {
      g = c[f >> 2] | 0;
      f = g;
      j = 9
     }
     if ((j | 0) == 9) c[b + 100 >> 2] = f;
     f = c[b + 4 >> 2] | 0;
     if (g) {
      b = b + 108 | 0;
      c[b >> 2] = g + 1 - f + (c[b >> 2] | 0)
     }
     f = f + -1 | 0;
     if ((d[f >> 0] | 0 | 0) != (e | 0)) a[f >> 0] = e
    } else j = 4
   }
   if ((j | 0) == 4) {
    c[b + 100 >> 2] = 0;
    e = -1
   }
   return e | 0
  }

  function di(a) {
   a = a | 0;
   return 0
  }

  function ei(a, b, c, d) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   return d | 0
  }

  function fi(a, b) {
   a = a | 0;
   b = b | 0;
   return -1 | 0
  }

  function gi(a) {
   a = a | 0;
   kj(a);
   return
  }

  function hi(a, b) {
   a = a | 0;
   b = b | 0;
   return (a + -48 | 0) >>> 0 < 10 | 0
  }

  function ii(a, b) {
   a = a | 0;
   b = b | 0;
   return Yh(a) | 0
  }

  function ji(b, c, d) {
   b = b | 0;
   c = c | 0;
   d = d | 0;
   if (((a[c >> 0] | 0) != 0 ? (Wi(c, 23481) | 0) != 0 : 0) ? (Wi(c, 21482) | 0) != 0 : 0) d = 0;
   else if (!d) d = lj(1, 4) | 0;
   return d | 0
  }

  function ki(a) {
   a = a | 0;
   var b = 0,
    d = 0;
   b = (Ua() | 0) + 176 | 0;
   d = c[b >> 2] | 0;
   if (a) c[b >> 2] = a;
   return d | 0
  }

  function li(a, b) {
   a = +a;
   b = +b;
   var d = 0,
    e = 0;
   h[k >> 3] = a;
   e = c[k >> 2] | 0;
   d = c[k + 4 >> 2] | 0;
   h[k >> 3] = b;
   d = c[k + 4 >> 2] & -2147483648 | d & 2147483647;
   c[k >> 2] = e;
   c[k + 4 >> 2] = d;
   return +(+h[k >> 3])
  }

  function mi(a, b) {
   a = +a;
   b = +b;
   return +(+li(a, b))
  }

  function ni(a, b) {
   a = +a;
   b = +b;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    i = 0,
    j = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0;
   h[k >> 3] = a;
   d = c[k >> 2] | 0;
   m = c[k + 4 >> 2] | 0;
   h[k >> 3] = b;
   n = c[k >> 2] | 0;
   o = c[k + 4 >> 2] | 0;
   e = ls(d | 0, m | 0, 52) | 0;
   e = e & 2047;
   j = ls(n | 0, o | 0, 52) | 0;
   j = j & 2047;
   p = m & -2147483648;
   i = os(n | 0, o | 0, 1) | 0;
   l = C;
   a: do
    if (!((i | 0) == 0 & (l | 0) == 0) ? (g = o & 2147483647, !(g >>> 0 > 2146435072 | (g | 0) == 2146435072 & n >>> 0 > 0 | (e | 0) == 2047)) : 0) {
     f = os(d | 0, m | 0, 1) | 0;
     g = C;
     if (!(g >>> 0 > l >>> 0 | (g | 0) == (l | 0) & f >>> 0 > i >>> 0)) return +((f | 0) == (i | 0) & (g | 0) == (l | 0) ? a * 0.0 : a);
     if (!e) {
      e = os(d | 0, m | 0, 12) | 0;
      f = C;
      if ((f | 0) > -1 | (f | 0) == -1 & e >>> 0 > 4294967295) {
       g = e;
       e = 0;
       do {
        e = e + -1 | 0;
        g = os(g | 0, f | 0, 1) | 0;
        f = C
       } while ((f | 0) > -1 | (f | 0) == -1 & g >>> 0 > 4294967295)
      } else e = 0;
      d = os(d | 0, m | 0, 1 - e | 0) | 0;
      f = C
     } else f = m & 1048575 | 1048576;
     if (!j) {
      g = os(n | 0, o | 0, 12) | 0;
      i = C;
      if ((i | 0) > -1 | (i | 0) == -1 & g >>> 0 > 4294967295) {
       j = 0;
       do {
        j = j + -1 | 0;
        g = os(g | 0, i | 0, 1) | 0;
        i = C
       } while ((i | 0) > -1 | (i | 0) == -1 & g >>> 0 > 4294967295)
      } else j = 0;
      n = os(n | 0, o | 0, 1 - j | 0) | 0;
      m = C
     } else m = o & 1048575 | 1048576;
     l = js(d | 0, f | 0, n | 0, m | 0) | 0;
     i = C;
     g = (i | 0) > -1 | (i | 0) == -1 & l >>> 0 > 4294967295;
     b: do
      if ((e | 0) > (j | 0)) {
       while (1) {
        if (g)
         if ((d | 0) == (n | 0) & (f | 0) == (m | 0)) break;
         else {
          d = l;
          f = i
         }
        d = os(d | 0, f | 0, 1) | 0;
        f = C;
        e = e + -1 | 0;
        l = js(d | 0, f | 0, n | 0, m | 0) | 0;
        i = C;
        g = (i | 0) > -1 | (i | 0) == -1 & l >>> 0 > 4294967295;
        if ((e | 0) <= (j | 0)) break b
       }
       b = a * 0.0;
       break a
      }
     while (0);
     if (g)
      if ((d | 0) == (n | 0) & (f | 0) == (m | 0)) {
       b = a * 0.0;
       break
      } else {
       f = i;
       d = l
      }
     if (f >>> 0 < 1048576 | (f | 0) == 1048576 & d >>> 0 < 0)
      do {
       d = os(d | 0, f | 0, 1) | 0;
       f = C;
       e = e + -1 | 0
      } while (f >>> 0 < 1048576 | (f | 0) == 1048576 & d >>> 0 < 0);
     if ((e | 0) > 0) {
      o = ms(d | 0, f | 0, 0, -1048576) | 0;
      d = C;
      e = os(e | 0, 0, 52) | 0;
      d = d | C;
      e = o | e
     } else {
      e = ls(d | 0, f | 0, 1 - e | 0) | 0;
      d = C
     }
     c[k >> 2] = e;
     c[k + 4 >> 2] = d | p;
     b = +h[k >> 3]
    } else q = 3;
   while (0);
   if ((q | 0) == 3) {
    b = a * b;
    b = b / b
   }
   return +b
  }

  function oi(a, b) {
   a = +a;
   b = +b;
   return +(+ni(a, b))
  }

  function pi(a, b) {
   a = +a;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0;
   h[k >> 3] = a;
   d = c[k >> 2] | 0;
   e = c[k + 4 >> 2] | 0;
   f = ls(d | 0, e | 0, 52) | 0;
   f = f & 2047;
   switch (f | 0) {
    case 0:
     {
      if (a != 0.0) {
       a = +pi(a * 18446744073709551616.0, b);
       d = (c[b >> 2] | 0) + -64 | 0
      } else d = 0;c[b >> 2] = d;
      break
     }
    case 2047:
     break;
    default:
     {
      c[b >> 2] = f + -1022;c[k >> 2] = d;c[k + 4 >> 2] = e & -2146435073 | 1071644672;a = +h[k >> 3]
     }
   }
   return +a
  }

  function qi(a, b) {
   a = +a;
   b = b | 0;
   return +(+pi(a, b))
  }

  function ri(a, b) {
   a = +a;
   b = b | 0;
   var d = 0;
   if ((b | 0) > 1023) {
    a = a * 8988465674311579538646525.0e283;
    d = b + -1023 | 0;
    if ((d | 0) > 1023) {
     d = b + -2046 | 0;
     d = (d | 0) > 1023 ? 1023 : d;
     a = a * 8988465674311579538646525.0e283
    }
   } else if ((b | 0) < -1022) {
    a = a * 2.2250738585072014e-308;
    d = b + 1022 | 0;
    if ((d | 0) < -1022) {
     d = b + 2044 | 0;
     d = (d | 0) < -1022 ? -1022 : d;
     a = a * 2.2250738585072014e-308
    }
   } else d = b;
   d = os(d + 1023 | 0, 0, 52) | 0;
   b = C;
   c[k >> 2] = d;
   c[k + 4 >> 2] = b;
   return +(a * +h[k >> 3])
  }

  function si(a, b) {
   a = +a;
   b = b | 0;
   return +(+ri(a, b))
  }

  function ti(a, b, c) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   return ui(0, a, b, (c | 0) != 0 ? c : 4080) | 0
  }

  function ui(b, d, e, f) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   l = i;
   i = i + 16 | 0;
   g = l;
   j = (f | 0) == 0 ? 4084 : f;
   f = c[j >> 2] | 0;
   a: do
    if (!d)
     if (!f) f = 0;
     else k = 15;
   else {
    h = (b | 0) == 0 ? g : b;
    if (!e) f = -2;
    else {
     if (!f) {
      f = a[d >> 0] | 0;
      g = f & 255;
      if (f << 24 >> 24 > -1) {
       c[h >> 2] = g;
       f = f << 24 >> 24 != 0 & 1;
       break
      }
      f = g + -194 | 0;
      if (f >>> 0 > 50) {
       k = 15;
       break
      }
      f = c[3828 + (f << 2) >> 2] | 0;
      g = e + -1 | 0;
      if (g) {
       d = d + 1 | 0;
       k = 9
      }
     } else {
      g = e;
      k = 9
     }
     b: do
      if ((k | 0) == 9) {
       b = a[d >> 0] | 0;
       m = (b & 255) >>> 3;
       if ((m + -16 | m + (f >> 26)) >>> 0 > 7) {
        k = 15;
        break a
       }
       while (1) {
        d = d + 1 | 0;
        f = (b & 255) + -128 | f << 6;
        g = g + -1 | 0;
        if ((f | 0) >= 0) break;
        if (!g) break b;
        b = a[d >> 0] | 0;
        if ((b & -64) << 24 >> 24 != -128) {
         k = 15;
         break a
        }
       }
       c[j >> 2] = 0;
       c[h >> 2] = f;
       f = e - g | 0;
       break a
      }
     while (0);
     c[j >> 2] = f;
     f = -2
    }
   }
   while (0);
   if ((k | 0) == 15) {
    c[j >> 2] = 0;
    c[(Zh() | 0) >> 2] = 84;
    f = -1
   }
   i = l;
   return f | 0
  }

  function vi(a) {
   a = a | 0;
   if (!a) a = 1;
   else a = (c[a >> 2] | 0) == 0;
   return a & 1 | 0
  }

  function wi(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0;
   o = i;
   i = i + 1040 | 0;
   l = o + 8 | 0;
   n = o;
   k = c[b >> 2] | 0;
   c[n >> 2] = k;
   m = (a | 0) != 0;
   e = m ? e : 256;
   a = m ? a : l;
   g = k;
   a: do
    if ((e | 0) != 0 & (k | 0) != 0) {
     j = e;
     k = g;
     e = 0;
     while (1) {
      g = d >>> 2;
      h = g >>> 0 >= j >>> 0;
      if (!(d >>> 0 > 131 | h)) {
       g = k;
       break a
      }
      g = h ? j : g;
      d = d - g | 0;
      g = xi(a, n, g, f) | 0;
      if ((g | 0) == -1) {
       e = d;
       break
      }
      p = (a | 0) == (l | 0);
      k = p ? 0 : g;
      h = j - k | 0;
      a = p ? a : a + (g << 2) | 0;
      e = g + e | 0;
      g = c[n >> 2] | 0;
      if ((j | 0) != (k | 0) & (g | 0) != 0) {
       j = h;
       k = g
      } else {
       j = h;
       break a
      }
     }
     d = e;
     j = 0;
     g = c[n >> 2] | 0;
     e = -1
    } else {
     j = e;
     e = 0
    }
   while (0);
   b: do
    if ((g | 0) != 0 ? (j | 0) != 0 & (d | 0) != 0 : 0) {
     h = g;
     g = a;
     while (1) {
      a = ui(g, h, d, f) | 0;
      if ((a + 2 | 0) >>> 0 < 3) break;
      h = (c[n >> 2] | 0) + a | 0;
      c[n >> 2] = h;
      j = j + -1 | 0;
      e = e + 1 | 0;
      if (!((j | 0) != 0 & (d | 0) != (a | 0))) break b;
      else {
       d = d - a | 0;
       g = g + 4 | 0
      }
     }
     switch (a | 0) {
      case -1:
       {
        e = -1;
        break b
       }
      case 0:
       {
        c[n >> 2] = 0;
        break b
       }
      default:
       {
        c[f >> 2] = 0;
        break b
       }
     }
    }
   while (0);
   if (m) c[b >> 2] = c[n >> 2];
   i = o;
   return e | 0
  }

  function xi(b, e, f, g) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = c[e >> 2] | 0;
   if ((g | 0) != 0 ? (i = c[g >> 2] | 0, (i | 0) != 0) : 0)
    if (!b) {
     g = f;
     j = h;
     m = 16
    } else {
     c[g >> 2] = 0;
     l = b;
     g = f;
     k = i;
     m = 37
    } else if (!b) {
    g = f;
    m = 7
   } else {
    i = b;
    g = f;
    m = 6
   }
   a: while (1)
    if ((m | 0) == 6) {
     if (!g) {
      m = 26;
      break
     } else b = i;
     while (1) {
      i = a[h >> 0] | 0;
      do
       if (((i & 255) + -1 | 0) >>> 0 < 127 ? g >>> 0 > 4 & (h & 3 | 0) == 0 : 0) {
        j = h;
        while (1) {
         h = c[j >> 2] | 0;
         if ((h + -16843009 | h) & -2139062144) {
          i = h;
          h = j;
          m = 32;
          break
         }
         c[b >> 2] = h & 255;
         c[b + 4 >> 2] = d[j + 1 >> 0];
         c[b + 8 >> 2] = d[j + 2 >> 0];
         h = j + 4 | 0;
         i = b + 16 | 0;
         c[b + 12 >> 2] = d[j + 3 >> 0];
         g = g + -4 | 0;
         if (g >>> 0 > 4) {
          b = i;
          j = h
         } else {
          m = 31;
          break
         }
        }
        if ((m | 0) == 31) {
         b = i;
         i = a[h >> 0] | 0;
         break
        } else if ((m | 0) == 32) {
         i = i & 255;
         break
        }
       }
      while (0);
      i = i & 255;
      if ((i + -1 | 0) >>> 0 >= 127) break;
      h = h + 1 | 0;
      c[b >> 2] = i;
      g = g + -1 | 0;
      if (!g) {
       m = 26;
       break a
      } else b = b + 4 | 0
     }
     i = i + -194 | 0;
     if (i >>> 0 > 50) {
      m = 48;
      break
     }
     l = b;
     k = c[3828 + (i << 2) >> 2] | 0;
     h = h + 1 | 0;
     m = 37;
     continue
    } else
   if ((m | 0) == 7) {
    i = a[h >> 0] | 0;
    if (((i & 255) + -1 | 0) >>> 0 < 127 ? (h & 3 | 0) == 0 : 0) {
     i = c[h >> 2] | 0;
     if (!((i + -16843009 | i) & -2139062144))
      do {
       h = h + 4 | 0;
       g = g + -4 | 0;
       i = c[h >> 2] | 0
      } while (((i + -16843009 | i) & -2139062144 | 0) == 0);
     i = i & 255
    }
    i = i & 255;
    if ((i + -1 | 0) >>> 0 < 127) {
     g = g + -1 | 0;
     h = h + 1 | 0;
     m = 7;
     continue
    }
    i = i + -194 | 0;
    if (i >>> 0 > 50) {
     m = 48;
     break
    }
    i = c[3828 + (i << 2) >> 2] | 0;
    j = h + 1 | 0;
    m = 16;
    continue
   } else if ((m | 0) == 16) {
    m = (d[j >> 0] | 0) >>> 3;
    if ((m + -16 | m + (i >> 26)) >>> 0 > 7) {
     m = 17;
     break
    }
    h = j + 1 | 0;
    if (i & 33554432) {
     if ((a[h >> 0] & -64) << 24 >> 24 != -128) {
      m = 20;
      break
     }
     h = j + 2 | 0;
     if (i & 524288) {
      if ((a[h >> 0] & -64) << 24 >> 24 != -128) {
       m = 23;
       break
      }
      h = j + 3 | 0
     }
    }
    g = g + -1 | 0;
    m = 7;
    continue
   } else if ((m | 0) == 37) {
    i = d[h >> 0] | 0;
    m = i >>> 3;
    if ((m + -16 | m + (k >> 26)) >>> 0 > 7) {
     m = 38;
     break
    }
    j = h + 1 | 0;
    b = i + -128 | k << 6;
    if ((b | 0) < 0) {
     i = d[j >> 0] | 0;
     if ((i & 192 | 0) != 128) {
      m = 41;
      break
     }
     j = h + 2 | 0;
     b = i + -128 | b << 6;
     if ((b | 0) < 0) {
      i = d[j >> 0] | 0;
      if ((i & 192 | 0) != 128) {
       m = 44;
       break
      }
      b = i + -128 | b << 6;
      h = h + 3 | 0
     } else h = j
    } else h = j;
    c[l >> 2] = b;
    i = l + 4 | 0;
    g = g + -1 | 0;
    m = 6;
    continue
   }
   if ((m | 0) == 17) {
    h = j + -1 | 0;
    m = 47
   } else if ((m | 0) == 20) {
    h = j + -1 | 0;
    m = 47
   } else if ((m | 0) == 23) {
    h = j + -1 | 0;
    m = 47
   } else if ((m | 0) == 26) c[e >> 2] = h;
   else if ((m | 0) == 38) {
    b = l;
    i = k;
    h = h + -1 | 0;
    m = 47
   } else if ((m | 0) == 41) {
    g = l;
    f = h + -1 | 0;
    m = 52
   } else if ((m | 0) == 44) {
    g = l;
    f = h + -1 | 0;
    m = 52
   }
   if ((m | 0) == 47)
    if (!i) m = 48;
    else {
     g = b;
     f = h;
     m = 52
    }
   if ((m | 0) == 48)
    if (!(a[h >> 0] | 0)) {
     if (b) {
      c[b >> 2] = 0;
      c[e >> 2] = 0
     }
     f = f - g | 0
    } else {
     g = b;
     f = h;
     m = 52
    }
   if ((m | 0) == 52) {
    c[(Zh() | 0) >> 2] = 84;
    if (!g) f = -1;
    else {
     c[e >> 2] = f;
     f = -1
    }
   }
   return f | 0
  }

  function yi(b, e, f) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    j = 0,
    k = 0;
   k = i;
   i = i + 16 | 0;
   g = k;
   a: do
    if (!e) g = 0;
    else {
     do
      if (f) {
       j = (b | 0) == 0 ? g : b;
       g = a[e >> 0] | 0;
       b = g & 255;
       if (g << 24 >> 24 > -1) {
        c[j >> 2] = b;
        g = g << 24 >> 24 != 0 & 1;
        break a
       }
       g = b + -194 | 0;
       if (g >>> 0 <= 50) {
        b = e + 1 | 0;
        h = c[3828 + (g << 2) >> 2] | 0;
        if (f >>> 0 < 4 ? (h & -2147483648 >>> ((f * 6 | 0) + -6 | 0) | 0) != 0 : 0) break;
        g = d[b >> 0] | 0;
        f = g >>> 3;
        if ((f + -16 | f + (h >> 26)) >>> 0 <= 7) {
         g = g + -128 | h << 6;
         if ((g | 0) >= 0) {
          c[j >> 2] = g;
          g = 2;
          break a
         }
         b = d[e + 2 >> 0] | 0;
         if ((b & 192 | 0) == 128) {
          b = b + -128 | g << 6;
          if ((b | 0) >= 0) {
           c[j >> 2] = b;
           g = 3;
           break a
          }
          g = d[e + 3 >> 0] | 0;
          if ((g & 192 | 0) == 128) {
           c[j >> 2] = g + -128 | b << 6;
           g = 4;
           break a
          }
         }
        }
       }
      }
     while (0);
     c[(Zh() | 0) >> 2] = 84;
     g = -1
    }
   while (0);
   i = k;
   return g | 0
  }

  function zi(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   do
    if (b) {
     if (d >>> 0 < 128) {
      a[b >> 0] = d;
      b = 1;
      break
     }
     if (d >>> 0 < 2048) {
      a[b >> 0] = d >>> 6 | 192;
      a[b + 1 >> 0] = d & 63 | 128;
      b = 2;
      break
     }
     if (d >>> 0 < 55296 | (d & -8192 | 0) == 57344) {
      a[b >> 0] = d >>> 12 | 224;
      a[b + 1 >> 0] = d >>> 6 & 63 | 128;
      a[b + 2 >> 0] = d & 63 | 128;
      b = 3;
      break
     }
     if ((d + -65536 | 0) >>> 0 < 1048576) {
      a[b >> 0] = d >>> 18 | 240;
      a[b + 1 >> 0] = d >>> 12 & 63 | 128;
      a[b + 2 >> 0] = d >>> 6 & 63 | 128;
      a[b + 3 >> 0] = d & 63 | 128;
      b = 4;
      break
     } else {
      c[(Zh() | 0) >> 2] = 84;
      b = -1;
      break
     }
    } else b = 1;
   while (0);
   return b | 0
  }

  function Ai(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0;
   m = i;
   i = i + 272 | 0;
   j = m + 8 | 0;
   l = m;
   h = c[b >> 2] | 0;
   c[l >> 2] = h;
   k = (a | 0) != 0;
   f = k ? e : 256;
   e = k ? a : j;
   a = h;
   a: do
    if ((f | 0) != 0 & (h | 0) != 0) {
     h = f;
     g = a;
     f = 0;
     while (1) {
      a = d >>> 0 >= h >>> 0;
      if (!(a | d >>> 0 > 32)) {
       a = g;
       break a
      }
      a = a ? h : d;
      d = d - a | 0;
      a = Bi(e, l, a, 0) | 0;
      if ((a | 0) == -1) {
       f = d;
       break
      }
      o = (e | 0) == (j | 0);
      n = o ? 0 : a;
      g = h - n | 0;
      e = o ? e : e + a | 0;
      f = a + f | 0;
      a = c[l >> 2] | 0;
      if ((h | 0) != (n | 0) & (a | 0) != 0) {
       h = g;
       g = a
      } else {
       h = g;
       break a
      }
     }
     d = f;
     h = 0;
     a = c[l >> 2] | 0;
     f = -1
    } else {
     h = f;
     f = 0
    }
   while (0);
   b: do
    if ((a | 0) != 0 ? (h | 0) != 0 & (d | 0) != 0 : 0) {
     g = a;
     a = e;
     while (1) {
      e = zi(a, c[g >> 2] | 0, 0) | 0;
      if ((e + 1 | 0) >>> 0 < 2) break;
      g = (c[l >> 2] | 0) + 4 | 0;
      c[l >> 2] = g;
      d = d + -1 | 0;
      f = f + 1 | 0;
      if (!((h | 0) != (e | 0) & (d | 0) != 0)) break b;
      else {
       h = h - e | 0;
       a = a + e | 0
      }
     }
     if (!e) c[l >> 2] = 0;
     else f = -1
    }
   while (0);
   if (k) c[b >> 2] = c[l >> 2];
   i = m;
   return f | 0
  }

  function Bi(b, d, e, f) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    j = 0,
    k = 0;
   k = i;
   i = i + 16 | 0;
   j = k;
   a: do
    if (!b) {
     b = c[d >> 2] | 0;
     f = c[b >> 2] | 0;
     if (!f) e = 0;
     else {
      e = 0;
      do {
       if (f >>> 0 > 127) {
        f = zi(j, f, 0) | 0;
        if ((f | 0) == -1) {
         e = -1;
         break a
        }
       } else f = 1;
       e = f + e | 0;
       b = b + 4 | 0;
       f = c[b >> 2] | 0
      } while ((f | 0) != 0)
     }
    } else {
     b: do
      if (e >>> 0 > 3) {
       f = e;
       g = c[d >> 2] | 0;
       while (1) {
        h = c[g >> 2] | 0;
        if ((h + -1 | 0) >>> 0 > 126) {
         if (!h) break;
         h = zi(b, h, 0) | 0;
         if ((h | 0) == -1) {
          e = -1;
          break a
         }
         b = b + h | 0;
         f = f - h | 0
        } else {
         a[b >> 0] = h;
         b = b + 1 | 0;
         f = f + -1 | 0;
         g = c[d >> 2] | 0
        }
        g = g + 4 | 0;
        c[d >> 2] = g;
        if (f >>> 0 <= 3) break b
       }
       a[b >> 0] = 0;
       c[d >> 2] = 0;
       e = e - f | 0;
       break a
      } else f = e;while (0);
     if (f) {
      g = c[d >> 2] | 0;
      while (1) {
       h = c[g >> 2] | 0;
       if ((h + -1 | 0) >>> 0 > 126) {
        if (!h) {
         g = 19;
         break
        }
        h = zi(j, h, 0) | 0;
        if ((h | 0) == -1) {
         e = -1;
         break a
        }
        if (f >>> 0 < h >>> 0) {
         g = 22;
         break
        }
        zi(b, c[g >> 2] | 0, 0) | 0;
        b = b + h | 0;
        f = f - h | 0
       } else {
        a[b >> 0] = h;
        b = b + 1 | 0;
        f = f + -1 | 0;
        g = c[d >> 2] | 0
       }
       g = g + 4 | 0;
       c[d >> 2] = g;
       if (!f) break a
      }
      if ((g | 0) == 19) {
       a[b >> 0] = 0;
       c[d >> 2] = 0;
       e = e - f | 0;
       break
      } else if ((g | 0) == 22) {
       e = e - f | 0;
       break
      }
     }
    }
   while (0);
   i = k;
   return e | 0
  }

  function Ci(a, b) {
   a = a | 0;
   b = b | 0;
   if (!a) a = 0;
   else a = zi(a, b, 0) | 0;
   return a | 0
  }

  function Di(a) {
   a = a | 0;
   return 0
  }

  function Ei(a) {
   a = a | 0;
   return
  }

  function Fi(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0;
   e = a + 84 | 0;
   g = c[e >> 2] | 0;
   h = d + 256 | 0;
   f = Ui(g, 0, h) | 0;
   f = (f | 0) == 0 ? h : f - g | 0;
   d = f >>> 0 < d >>> 0 ? f : d;
   ns(b | 0, g | 0, d | 0) | 0;
   c[a + 4 >> 2] = g + d;
   b = g + f | 0;
   c[a + 8 >> 2] = b;
   c[e >> 2] = b;
   return d | 0
  }

  function Gi(b) {
   b = b | 0;
   var d = 0,
    e = 0;
   d = b + 74 | 0;
   e = a[d >> 0] | 0;
   a[d >> 0] = e + 255 | e;
   d = b + 20 | 0;
   e = b + 44 | 0;
   if ((c[d >> 2] | 0) >>> 0 > (c[e >> 2] | 0) >>> 0) pb[c[b + 36 >> 2] & 31](b, 0, 0) | 0;
   c[b + 16 >> 2] = 0;
   c[b + 28 >> 2] = 0;
   c[d >> 2] = 0;
   d = c[b >> 2] | 0;
   if (d & 20)
    if (!(d & 4)) d = -1;
    else {
     c[b >> 2] = d | 32;
     d = -1
    } else {
    d = c[e >> 2] | 0;
    c[b + 8 >> 2] = d;
    c[b + 4 >> 2] = d;
    d = 0
   }
   return d | 0
  }

  function Hi(b) {
   b = b | 0;
   var d = 0,
    e = 0;
   d = b + 74 | 0;
   e = a[d >> 0] | 0;
   a[d >> 0] = e + 255 | e;
   d = c[b >> 2] | 0;
   if (!(d & 8)) {
    c[b + 8 >> 2] = 0;
    c[b + 4 >> 2] = 0;
    d = c[b + 44 >> 2] | 0;
    c[b + 28 >> 2] = d;
    c[b + 20 >> 2] = d;
    c[b + 16 >> 2] = d + (c[b + 48 >> 2] | 0);
    d = 0
   } else {
    c[b >> 2] = d | 32;
    d = -1
   }
   return d | 0
  }

  function Ii(a) {
   a = a | 0;
   var b = 0,
    e = 0;
   e = i;
   i = i + 16 | 0;
   b = e;
   if ((c[a + 8 >> 2] | 0) == 0 ? (Gi(a) | 0) != 0 : 0) b = -1;
   else if ((pb[c[a + 32 >> 2] & 31](a, b, 1) | 0) == 1) b = d[b >> 0] | 0;
   else b = -1;
   i = e;
   return b | 0
  }

  function Ji(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0,
    i = 0;
   f = e + 16 | 0;
   g = c[f >> 2] | 0;
   if (!g)
    if (!(Hi(e) | 0)) {
     g = c[f >> 2] | 0;
     h = 4
    } else f = 0;
   else h = 4;
   a: do
    if ((h | 0) == 4) {
     i = e + 20 | 0;
     h = c[i >> 2] | 0;
     if ((g - h | 0) >>> 0 < d >>> 0) {
      f = pb[c[e + 36 >> 2] & 31](e, b, d) | 0;
      break
     }
     b: do
      if ((a[e + 75 >> 0] | 0) > -1) {
       f = d;
       while (1) {
        if (!f) {
         g = h;
         f = 0;
         break b
        }
        g = f + -1 | 0;
        if ((a[b + g >> 0] | 0) == 10) break;
        else f = g
       }
       if ((pb[c[e + 36 >> 2] & 31](e, b, f) | 0) >>> 0 < f >>> 0) break a;
       d = d - f | 0;
       b = b + f | 0;
       g = c[i >> 2] | 0
      } else {
       g = h;
       f = 0
      }
     while (0);
     ns(g | 0, b | 0, d | 0) | 0;
     c[i >> 2] = (c[i >> 2] | 0) + d;
     f = f + d | 0
    }
   while (0);
   return f | 0
  }

  function Ki(a, b, d, e) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0;
   f = i;
   i = i + 16 | 0;
   g = f;
   c[g >> 2] = e;
   e = Pi(a, b, d, g) | 0;
   i = f;
   return e | 0
  }

  function Li(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0;
   e = i;
   i = i + 16 | 0;
   f = e;
   c[f >> 2] = d;
   d = Qi(a, b, f) | 0;
   i = e;
   return d | 0
  }

  function Mi(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    j = 0;
   j = i;
   i = i + 16 | 0;
   e = j;
   f = jj(240) | 0;
   do
    if (f) {
     c[e >> 2] = c[d >> 2];
     e = Pi(f, 240, b, e) | 0;
     if (e >>> 0 < 240) {
      b = mj(f, e + 1 | 0) | 0;
      c[a >> 2] = (b | 0) != 0 ? b : f;
      break
     }
     kj(f);
     if ((e | 0) >= 0 ? (h = e + 1 | 0, g = jj(h) | 0, c[a >> 2] = g, (g | 0) != 0) : 0) e = Pi(g, h, b, d) | 0;
     else e = -1
    } else e = -1;
   while (0);
   i = j;
   return e | 0
  }

  function Ni(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0;
   s = i;
   i = i + 224 | 0;
   o = s + 80 | 0;
   r = s + 96 | 0;
   q = s;
   p = s + 136 | 0;
   f = r;
   g = f + 40 | 0;
   do {
    c[f >> 2] = 0;
    f = f + 4 | 0
   } while ((f | 0) < (g | 0));
   c[o >> 2] = c[e >> 2];
   if ((bj(0, d, o, q, r) | 0) < 0) e = -1;
   else {
    if ((c[b + 76 >> 2] | 0) > -1) m = Di(b) | 0;
    else m = 0;
    e = c[b >> 2] | 0;
    n = e & 32;
    if ((a[b + 74 >> 0] | 0) < 1) c[b >> 2] = e & -33;
    e = b + 48 | 0;
    if (!(c[e >> 2] | 0)) {
     g = b + 44 | 0;
     h = c[g >> 2] | 0;
     c[g >> 2] = p;
     j = b + 28 | 0;
     c[j >> 2] = p;
     k = b + 20 | 0;
     c[k >> 2] = p;
     c[e >> 2] = 80;
     l = b + 16 | 0;
     c[l >> 2] = p + 80;
     f = bj(b, d, o, q, r) | 0;
     if (h) {
      pb[c[b + 36 >> 2] & 31](b, 0, 0) | 0;
      f = (c[k >> 2] | 0) == 0 ? -1 : f;
      c[g >> 2] = h;
      c[e >> 2] = 0;
      c[l >> 2] = 0;
      c[j >> 2] = 0;
      c[k >> 2] = 0
     }
    } else f = bj(b, d, o, q, r) | 0;
    e = c[b >> 2] | 0;
    c[b >> 2] = e | n;
    if (m) Ei(b);
    e = (e & 32 | 0) == 0 ? f : -1
   }
   i = s;
   return e | 0
  }

  function Oi(e, f, j) {
   e = e | 0;
   f = f | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0.0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    D = 0,
    E = 0,
    F = 0,
    G = 0,
    H = 0,
    I = 0,
    J = 0,
    K = 0,
    L = 0,
    M = 0,
    N = 0,
    O = 0,
    P = 0,
    Q = 0;
   P = i;
   i = i + 304 | 0;
   H = P + 16 | 0;
   J = P + 8 | 0;
   I = P + 33 | 0;
   K = P;
   y = P + 32 | 0;
   if ((c[e + 76 >> 2] | 0) > -1) O = Di(e) | 0;
   else O = 0;
   k = a[f >> 0] | 0;
   a: do
    if (k << 24 >> 24) {
     L = e + 4 | 0;
     M = e + 100 | 0;
     G = e + 108 | 0;
     z = e + 8 | 0;
     A = I + 10 | 0;
     B = I + 33 | 0;
     D = J + 4 | 0;
     E = I + 46 | 0;
     F = I + 94 | 0;
     m = k;
     k = 0;
     n = f;
     s = 0;
     l = 0;
     f = 0;
     b: while (1) {
      c: do
       if (!(Xh(m & 255) | 0)) {
        m = (a[n >> 0] | 0) == 37;
        d: do
         if (m) {
          q = n + 1 | 0;
          o = a[q >> 0] | 0;
          e: do switch (o << 24 >> 24) {
            case 37:
             break d;
            case 42:
             {
              x = 0;o = n + 2 | 0;
              break
             }
            default:
             {
              o = (o & 255) + -48 | 0;
              if (o >>> 0 < 10 ? (a[n + 2 >> 0] | 0) == 36 : 0) {
               c[H >> 2] = c[j >> 2];
               while (1) {
                x = (c[H >> 2] | 0) + (4 - 1) & ~(4 - 1);
                m = c[x >> 2] | 0;
                c[H >> 2] = x + 4;
                if (o >>> 0 > 1) o = o + -1 | 0;
                else break
               }
               x = m;
               o = n + 3 | 0;
               break e
              }
              o = (c[j >> 2] | 0) + (4 - 1) & ~(4 - 1);x = c[o >> 2] | 0;c[j >> 2] = o + 4;o = q
             }
           }
           while (0);
           m = a[o >> 0] | 0;
          n = m & 255;
          if ((n + -48 | 0) >>> 0 < 10) {
           m = 0;
           while (1) {
            q = (m * 10 | 0) + -48 + n | 0;
            o = o + 1 | 0;
            m = a[o >> 0] | 0;
            n = m & 255;
            if ((n + -48 | 0) >>> 0 >= 10) break;
            else m = q
           }
          } else q = 0;
          if (m << 24 >> 24 == 109) {
           o = o + 1 | 0;
           r = a[o >> 0] | 0;
           m = (x | 0) != 0 & 1;
           l = 0;
           f = 0
          } else {
           r = m;
           m = 0
          }
          n = o + 1 | 0;
          switch (r & 255 | 0) {
           case 104:
            {
             w = (a[n >> 0] | 0) == 104;n = w ? o + 2 | 0 : n;o = w ? -2 : -1;
             break
            }
           case 108:
            {
             w = (a[n >> 0] | 0) == 108;n = w ? o + 2 | 0 : n;o = w ? 3 : 1;
             break
            }
           case 106:
            {
             o = 3;
             break
            }
           case 116:
           case 122:
            {
             o = 1;
             break
            }
           case 76:
            {
             o = 2;
             break
            }
           case 110:
           case 112:
           case 67:
           case 83:
           case 91:
           case 99:
           case 115:
           case 88:
           case 71:
           case 70:
           case 69:
           case 65:
           case 103:
           case 102:
           case 101:
           case 97:
           case 120:
           case 117:
           case 111:
           case 105:
           case 100:
            {
             n = o;o = 0;
             break
            }
           default:
            {
             N = 152;
             break b
            }
          }
          r = d[n >> 0] | 0;
          t = (r & 47 | 0) == 3;
          r = t ? r | 32 : r;
          t = t ? 1 : o;
          switch (r | 0) {
           case 99:
            {
             w = s;v = (q | 0) < 1 ? 1 : q;
             break
            }
           case 91:
            {
             w = s;v = q;
             break
            }
           case 110:
            {
             if (!x) {
              o = s;
              break c
             }
             switch (t | 0) {
              case -2:
               {
                a[x >> 0] = s;o = s;
                break c
               }
              case -1:
               {
                b[x >> 1] = s;o = s;
                break c
               }
              case 0:
               {
                c[x >> 2] = s;o = s;
                break c
               }
              case 1:
               {
                c[x >> 2] = s;o = s;
                break c
               }
              case 3:
               {
                o = x;c[o >> 2] = s;c[o + 4 >> 2] = ((s | 0) < 0) << 31 >> 31;o = s;
                break c
               }
              default:
               {
                o = s;
                break c
               }
             }
            }
           default:
            {
             bi(e, 0);do {
              o = c[L >> 2] | 0;
              if (o >>> 0 < (c[M >> 2] | 0) >>> 0) {
               c[L >> 2] = o + 1;
               o = d[o >> 0] | 0
              } else o = ci(e) | 0
             } while ((Xh(o) | 0) != 0);o = c[L >> 2] | 0;
             if (c[M >> 2] | 0) {
              o = o + -1 | 0;
              c[L >> 2] = o
             }
             w = (c[G >> 2] | 0) + s + o - (c[z >> 2] | 0) | 0;v = q
            }
          }
          bi(e, v);
          o = c[L >> 2] | 0;
          q = c[M >> 2] | 0;
          if (o >>> 0 < q >>> 0) c[L >> 2] = o + 1;
          else {
           if ((ci(e) | 0) < 0) {
            N = 152;
            break b
           }
           q = c[M >> 2] | 0
          }
          if (q) c[L >> 2] = (c[L >> 2] | 0) + -1;
          f: do switch (r | 0) {
            case 91:
            case 99:
            case 115:
             {
              u = (r | 0) == 99;g: do
               if ((r & 239 | 0) == 99) {
                ks(I | 0, -1, 257) | 0;
                a[I >> 0] = 0;
                if ((r | 0) == 115) {
                 a[B >> 0] = 0;
                 a[A >> 0] = 0;
                 a[A + 1 >> 0] = 0;
                 a[A + 2 >> 0] = 0;
                 a[A + 3 >> 0] = 0;
                 a[A + 4 >> 0] = 0
                }
               } else {
                Q = n + 1 | 0;
                s = (a[Q >> 0] | 0) == 94;
                o = s & 1;
                r = s ? Q : n;
                n = s ? n + 2 | 0 : Q;
                ks(I | 0, s & 1 | 0, 257) | 0;
                a[I >> 0] = 0;
                switch (a[n >> 0] | 0) {
                 case 45:
                  {
                   s = (o ^ 1) & 255;a[E >> 0] = s;n = r + 2 | 0;
                   break
                  }
                 case 93:
                  {
                   s = (o ^ 1) & 255;a[F >> 0] = s;n = r + 2 | 0;
                   break
                  }
                 default:
                  s = (o ^ 1) & 255
                }
                while (1) {
                 o = a[n >> 0] | 0;
                 h: do switch (o << 24 >> 24) {
                   case 0:
                    {
                     N = 152;
                     break b
                    }
                   case 93:
                    break g;
                   case 45:
                    {
                     r = n + 1 | 0;o = a[r >> 0] | 0;
                     switch (o << 24 >> 24) {
                      case 93:
                      case 0:
                       {
                        o = 45;
                        break h
                       }
                      default:
                       {}
                     }
                     n = a[n + -1 >> 0] | 0;
                     if ((n & 255) < (o & 255)) {
                      n = n & 255;
                      do {
                       n = n + 1 | 0;
                       a[I + n >> 0] = s;
                       o = a[r >> 0] | 0
                      } while ((n | 0) < (o & 255 | 0));
                      n = r
                     } else n = r;
                     break
                    }
                   default:
                    {}
                  }
                  while (0);
                  a[I + ((o & 255) + 1) >> 0] = s;
                 n = n + 1 | 0
                }
               }while (0);r = u ? v + 1 | 0 : 31;s = (t | 0) == 1;t = (m | 0) != 0;i: do
               if (s) {
                if (t) {
                 f = jj(r << 2) | 0;
                 if (!f) {
                  l = 0;
                  N = 152;
                  break b
                 }
                } else f = x;
                c[J >> 2] = 0;
                c[D >> 2] = 0;
                l = 0;
                j: while (1) {
                 q = (f | 0) == 0;
                 do {
                  k: while (1) {
                   o = c[L >> 2] | 0;
                   if (o >>> 0 < (c[M >> 2] | 0) >>> 0) {
                    c[L >> 2] = o + 1;
                    o = d[o >> 0] | 0
                   } else o = ci(e) | 0;
                   if (!(a[I + (o + 1) >> 0] | 0)) break j;
                   a[y >> 0] = o;
                   switch (ui(K, y, 1, J) | 0) {
                    case -1:
                     {
                      l = 0;N = 152;
                      break b
                     }
                    case -2:
                     break;
                    default:
                     break k
                   }
                  }
                  if (!q) {
                   c[f + (l << 2) >> 2] = c[K >> 2];
                   l = l + 1 | 0
                  }
                 } while (!(t & (l | 0) == (r | 0)));
                 l = r << 1 | 1;
                 o = mj(f, l << 2) | 0;
                 if (!o) {
                  l = 0;
                  N = 152;
                  break b
                 }
                 Q = r;
                 r = l;
                 f = o;
                 l = Q
                }
                if (!(vi(J) | 0)) {
                 l = 0;
                 N = 152;
                 break b
                } else {
                 q = l;
                 l = 0
                }
               } else {
                if (t) {
                 l = jj(r) | 0;
                 if (!l) {
                  l = 0;
                  f = 0;
                  N = 152;
                  break b
                 } else o = 0;
                 while (1) {
                  do {
                   f = c[L >> 2] | 0;
                   if (f >>> 0 < (c[M >> 2] | 0) >>> 0) {
                    c[L >> 2] = f + 1;
                    f = d[f >> 0] | 0
                   } else f = ci(e) | 0;
                   if (!(a[I + (f + 1) >> 0] | 0)) {
                    q = o;
                    f = 0;
                    break i
                   }
                   a[l + o >> 0] = f;
                   o = o + 1 | 0
                  } while ((o | 0) != (r | 0));
                  f = r << 1 | 1;
                  o = mj(l, f) | 0;
                  if (!o) {
                   f = 0;
                   N = 152;
                   break b
                  } else {
                   Q = r;
                   r = f;
                   l = o;
                   o = Q
                  }
                 }
                }
                if (!x) {
                 l = q;
                 while (1) {
                  f = c[L >> 2] | 0;
                  if (f >>> 0 < l >>> 0) {
                   c[L >> 2] = f + 1;
                   f = d[f >> 0] | 0
                  } else f = ci(e) | 0;
                  if (!(a[I + (f + 1) >> 0] | 0)) {
                   q = 0;
                   l = 0;
                   f = 0;
                   break i
                  }
                  l = c[M >> 2] | 0
                 }
                } else {
                 l = 0;
                 while (1) {
                  f = c[L >> 2] | 0;
                  if (f >>> 0 < q >>> 0) {
                   c[L >> 2] = f + 1;
                   f = d[f >> 0] | 0
                  } else f = ci(e) | 0;
                  if (!(a[I + (f + 1) >> 0] | 0)) {
                   q = l;
                   l = x;
                   f = 0;
                   break i
                  }
                  a[x + l >> 0] = f;
                  q = c[M >> 2] | 0;
                  l = l + 1 | 0
                 }
                }
               }while (0);o = c[L >> 2] | 0;
              if (c[M >> 2] | 0) {
               o = o + -1 | 0;
               c[L >> 2] = o
              }
              o = o - (c[z >> 2] | 0) + (c[G >> 2] | 0) | 0;
              if (!o) break b;
              if (!((o | 0) == (v | 0) | u ^ 1)) break b;do
               if (t)
                if (s) {
                 c[x >> 2] = f;
                 break
                } else {
                 c[x >> 2] = l;
                 break
                }
              while (0);
              if (!u) {
               if (f) c[f + (q << 2) >> 2] = 0;
               if (!l) {
                l = 0;
                break f
               }
               a[l + q >> 0] = 0
              }
              break
             }
            case 120:
            case 88:
            case 112:
             {
              o = 16;N = 134;
              break
             }
            case 111:
             {
              o = 8;N = 134;
              break
             }
            case 117:
            case 100:
             {
              o = 10;N = 134;
              break
             }
            case 105:
             {
              o = 0;N = 134;
              break
             }
            case 71:
            case 103:
            case 70:
            case 102:
            case 69:
            case 101:
            case 65:
            case 97:
             {
              p = +$h(e, t, 0);
              if ((c[G >> 2] | 0) == ((c[z >> 2] | 0) - (c[L >> 2] | 0) | 0)) break b;
              if (x) switch (t | 0) {
               case 0:
                {
                 g[x >> 2] = p;
                 break f
                }
               case 1:
                {
                 h[x >> 3] = p;
                 break f
                }
               case 2:
                {
                 h[x >> 3] = p;
                 break f
                }
               default:
                break f
              }
              break
             }
            default:
             {}
           }
           while (0);
           l: do
            if ((N | 0) == 134) {
             N = 0;
             o = ai(e, o, 0, -1, -1) | 0;
             if ((c[G >> 2] | 0) == ((c[z >> 2] | 0) - (c[L >> 2] | 0) | 0)) break b;
             if ((x | 0) != 0 & (r | 0) == 112) {
              c[x >> 2] = o;
              break
             }
             if (x) switch (t | 0) {
              case -2:
               {
                a[x >> 0] = o;
                break l
               }
              case -1:
               {
                b[x >> 1] = o;
                break l
               }
              case 0:
               {
                c[x >> 2] = o;
                break l
               }
              case 1:
               {
                c[x >> 2] = o;
                break l
               }
              case 3:
               {
                Q = x;c[Q >> 2] = o;c[Q + 4 >> 2] = C;
                break l
               }
              default:
               break l
             }
            }
          while (0);
          k = ((x | 0) != 0 & 1) + k | 0;
          o = (c[G >> 2] | 0) + w + (c[L >> 2] | 0) - (c[z >> 2] | 0) | 0;
          break c
         }
        while (0);
        n = n + (m & 1) | 0;
        bi(e, 0);
        m = c[L >> 2] | 0;
        if (m >>> 0 < (c[M >> 2] | 0) >>> 0) {
         c[L >> 2] = m + 1;
         m = d[m >> 0] | 0
        } else m = ci(e) | 0;
        if ((m | 0) != (d[n >> 0] | 0)) {
         N = 21;
         break b
        }
        o = s + 1 | 0
       } else {
        while (1) {
         m = n + 1 | 0;
         if (!(Xh(d[m >> 0] | 0) | 0)) break;
         else n = m
        }
        bi(e, 0);
        do {
         m = c[L >> 2] | 0;
         if (m >>> 0 < (c[M >> 2] | 0) >>> 0) {
          c[L >> 2] = m + 1;
          m = d[m >> 0] | 0
         } else m = ci(e) | 0
        } while ((Xh(m) | 0) != 0);
        m = c[L >> 2] | 0;
        if (c[M >> 2] | 0) {
         m = m + -1 | 0;
         c[L >> 2] = m
        }
        o = (c[G >> 2] | 0) + s + m - (c[z >> 2] | 0) | 0
       }while (0);n = n + 1 | 0;m = a[n >> 0] | 0;
      if (!(m << 24 >> 24)) break a;
      else s = o
     }
     if ((N | 0) == 21) {
      if (c[M >> 2] | 0) c[L >> 2] = (c[L >> 2] | 0) + -1;
      if ((k | 0) != 0 | (m | 0) > -1) break;
      else {
       k = 0;
       N = 153
      }
     } else if ((N | 0) == 152)
      if (!k) {
       k = m;
       N = 153
      }
     if ((N | 0) == 153) {
      m = k;
      k = -1
     }
     if (m) {
      kj(l);
      kj(f)
     }
    } else k = 0;
   while (0);
   if (O) Ei(e);
   i = P;
   return k | 0
  }

  function Pi(b, d, e, f) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0;
   n = i;
   i = i + 128 | 0;
   g = n + 112 | 0;
   m = n;
   h = m;
   j = 4088;
   k = h + 112 | 0;
   do {
    c[h >> 2] = c[j >> 2];
    h = h + 4 | 0;
    j = j + 4 | 0
   } while ((h | 0) < (k | 0));
   if ((d + -1 | 0) >>> 0 > 2147483646)
    if (!d) {
     d = 1;
     l = 4
    } else {
     c[(Zh() | 0) >> 2] = 75;
     d = -1
    } else {
    g = b;
    l = 4
   }
   if ((l | 0) == 4) {
    l = -2 - g | 0;
    l = d >>> 0 > l >>> 0 ? l : d;
    c[m + 48 >> 2] = l;
    b = m + 20 | 0;
    c[b >> 2] = g;
    c[m + 44 >> 2] = g;
    d = g + l | 0;
    g = m + 16 | 0;
    c[g >> 2] = d;
    c[m + 28 >> 2] = d;
    d = Ni(m, e, f) | 0;
    if (l) {
     e = c[b >> 2] | 0;
     a[e + (((e | 0) == (c[g >> 2] | 0)) << 31 >> 31) >> 0] = 0
    }
   }
   i = n;
   return d | 0
  }

  function Qi(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0;
   g = i;
   i = i + 112 | 0;
   e = g;
   f = e;
   h = f + 112 | 0;
   do {
    c[f >> 2] = 0;
    f = f + 4 | 0
   } while ((f | 0) < (h | 0));
   c[e + 32 >> 2] = 17;
   c[e + 44 >> 2] = a;
   c[e + 76 >> 2] = -1;
   c[e + 84 >> 2] = a;
   h = Oi(e, b, d) | 0;
   i = g;
   return h | 0
  }

  function Ri(a, b, c) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   return +(+dj(a, b, 2))
  }

  function Si(a, b, c) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   a = ej(a, b, c, -1, -1) | 0;
   return a | 0
  }

  function Ti(a, b, c) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   a = ej(a, b, c, 0, -2147483648) | 0;
   return a | 0
  }

  function Ui(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0,
    i = 0;
   h = d & 255;
   f = (e | 0) != 0;
   a: do
    if (f & (b & 3 | 0) != 0) {
     g = d & 255;
     while (1) {
      if ((a[b >> 0] | 0) == g << 24 >> 24) {
       i = 6;
       break a
      }
      b = b + 1 | 0;
      e = e + -1 | 0;
      f = (e | 0) != 0;
      if (!(f & (b & 3 | 0) != 0)) {
       i = 5;
       break
      }
     }
    } else i = 5;
   while (0);
   if ((i | 0) == 5)
    if (f) i = 6;
    else e = 0;
   b: do
    if ((i | 0) == 6) {
     g = d & 255;
     if ((a[b >> 0] | 0) != g << 24 >> 24) {
      f = _(h, 16843009) | 0;
      c: do
       if (e >>> 0 > 3)
        while (1) {
         h = c[b >> 2] ^ f;
         if ((h & -2139062144 ^ -2139062144) & h + -16843009) break;
         b = b + 4 | 0;
         e = e + -4 | 0;
         if (e >>> 0 <= 3) {
          i = 11;
          break c
         }
        } else i = 11;
      while (0);
      if ((i | 0) == 11)
       if (!e) {
        e = 0;
        break
       }
      while (1) {
       if ((a[b >> 0] | 0) == g << 24 >> 24) break b;
       b = b + 1 | 0;
       e = e + -1 | 0;
       if (!e) {
        e = 0;
        break
       }
      }
     }
    }
   while (0);
   return ((e | 0) != 0 ? b : 0) | 0
  }

  function Vi(b, c, d) {
   b = b | 0;
   c = c | 0;
   d = d | 0;
   var e = 0,
    f = 0;
   a: do
    if (!d) d = 0;
    else {
     f = d;
     e = b;
     while (1) {
      b = a[e >> 0] | 0;
      d = a[c >> 0] | 0;
      if (b << 24 >> 24 != d << 24 >> 24) break;
      f = f + -1 | 0;
      if (!f) {
       d = 0;
       break a
      } else {
       e = e + 1 | 0;
       c = c + 1 | 0
      }
     }
     d = (b & 255) - (d & 255) | 0
    }
   while (0);
   return d | 0
  }

  function Wi(b, c) {
   b = b | 0;
   c = c | 0;
   var d = 0,
    e = 0;
   e = a[b >> 0] | 0;
   d = a[c >> 0] | 0;
   if (e << 24 >> 24 == 0 ? 1 : e << 24 >> 24 != d << 24 >> 24) c = e;
   else {
    do {
     b = b + 1 | 0;
     c = c + 1 | 0;
     e = a[b >> 0] | 0;
     d = a[c >> 0] | 0
    } while (!(e << 24 >> 24 == 0 ? 1 : e << 24 >> 24 != d << 24 >> 24));
    c = e
   }
   return (c & 255) - (d & 255) | 0
  }

  function Xi(b) {
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0;
   f = b;
   a: do
    if (!(f & 3)) e = 4;
    else {
     d = b;
     b = f;
     while (1) {
      if (!(a[d >> 0] | 0)) break a;
      d = d + 1 | 0;
      b = d;
      if (!(b & 3)) {
       b = d;
       e = 4;
       break
      }
     }
    }
   while (0);
   if ((e | 0) == 4) {
    while (1) {
     d = c[b >> 2] | 0;
     if (!((d & -2139062144 ^ -2139062144) & d + -16843009)) b = b + 4 | 0;
     else break
    }
    if ((d & 255) << 24 >> 24)
     do b = b + 1 | 0; while ((a[b >> 0] | 0) != 0)
   }
   return b - f | 0
  }

  function Yi(a) {
   a = a | 0;
   var b = 0;
   b = a;
   while (1)
    if (!(c[b >> 2] | 0)) break;
    else b = b + 4 | 0;
   return b - a >> 2 | 0
  }

  function Zi(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0;
   if (d) {
    e = a;
    while (1) {
     d = d + -1 | 0;
     c[e >> 2] = c[b >> 2];
     if (!d) break;
     else {
      b = b + 4 | 0;
      e = e + 4 | 0
     }
    }
   }
   return a | 0
  }

  function _i(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0;
   e = (d | 0) == 0;
   if (a - b >> 2 >>> 0 < d >>> 0) {
    if (!e)
     do {
      d = d + -1 | 0;
      c[a + (d << 2) >> 2] = c[b + (d << 2) >> 2]
     } while ((d | 0) != 0)
   } else if (!e) {
    e = b;
    b = a;
    while (1) {
     d = d + -1 | 0;
     c[b >> 2] = c[e >> 2];
     if (!d) break;
     else {
      e = e + 4 | 0;
      b = b + 4 | 0
     }
    }
   }
   return a | 0
  }

  function $i(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0;
   if (d) {
    e = a;
    while (1) {
     d = d + -1 | 0;
     c[e >> 2] = b;
     if (!d) break;
     else e = e + 4 | 0
    }
   }
   return a | 0
  }

  function aj(a, b) {
   a = a | 0;
   b = b | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0;
   i = a + 4 | 0;
   e = c[i >> 2] | 0;
   j = a + 100 | 0;
   if (e >>> 0 < (c[j >> 2] | 0) >>> 0) {
    c[i >> 2] = e + 1;
    e = d[e >> 0] | 0
   } else e = ci(a) | 0;
   switch (e | 0) {
    case 43:
    case 45:
     {
      f = (e | 0) == 45 & 1;e = c[i >> 2] | 0;
      if (e >>> 0 < (c[j >> 2] | 0) >>> 0) {
       c[i >> 2] = e + 1;
       e = d[e >> 0] | 0
      } else e = ci(a) | 0;
      if ((b | 0) != 0 & (e + -48 | 0) >>> 0 > 9 ? (c[j >> 2] | 0) != 0 : 0) {
       c[i >> 2] = (c[i >> 2] | 0) + -1;
       h = f
      } else h = f;
      break
     }
    default:
     h = 0
   }
   if ((e + -48 | 0) >>> 0 > 9)
    if (!(c[j >> 2] | 0)) {
     f = -2147483648;
     e = 0
    } else {
     c[i >> 2] = (c[i >> 2] | 0) + -1;
     f = -2147483648;
     e = 0
    } else {
    f = 0;
    do {
     f = e + -48 + (f * 10 | 0) | 0;
     e = c[i >> 2] | 0;
     if (e >>> 0 < (c[j >> 2] | 0) >>> 0) {
      c[i >> 2] = e + 1;
      e = d[e >> 0] | 0
     } else e = ci(a) | 0
    } while ((e + -48 | 0) >>> 0 < 10 & (f | 0) < 214748364);
    b = ((f | 0) < 0) << 31 >> 31;
    if ((e + -48 | 0) >>> 0 < 10) {
     do {
      b = vs(f | 0, b | 0, 10, 0) | 0;
      f = C;
      e = ms(e | 0, ((e | 0) < 0) << 31 >> 31 | 0, -48, -1) | 0;
      f = ms(e | 0, C | 0, b | 0, f | 0) | 0;
      b = C;
      e = c[i >> 2] | 0;
      if (e >>> 0 < (c[j >> 2] | 0) >>> 0) {
       c[i >> 2] = e + 1;
       e = d[e >> 0] | 0
      } else e = ci(a) | 0
     } while ((e + -48 | 0) >>> 0 < 10 & ((b | 0) < 21474836 | (b | 0) == 21474836 & f >>> 0 < 2061584302));
     g = f
    } else g = f;
    if ((e + -48 | 0) >>> 0 < 10)
     do {
      e = c[i >> 2] | 0;
      if (e >>> 0 < (c[j >> 2] | 0) >>> 0) {
       c[i >> 2] = e + 1;
       e = d[e >> 0] | 0
      } else e = ci(a) | 0
     } while ((e + -48 | 0) >>> 0 < 10);
    if (c[j >> 2] | 0) c[i >> 2] = (c[i >> 2] | 0) + -1;
    a = (h | 0) != 0;
    e = js(0, 0, g | 0, b | 0) | 0;
    f = a ? C : b;
    e = a ? e : g
   }
   C = f;
   return e | 0
  }

  function bj(e, f, g, j, l) {
   e = e | 0;
   f = f | 0;
   g = g | 0;
   j = j | 0;
   l = l | 0;
   var m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0.0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0.0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    D = 0,
    E = 0,
    F = 0,
    G = 0,
    H = 0,
    I = 0,
    J = 0,
    K = 0,
    L = 0,
    M = 0,
    N = 0,
    O = 0,
    P = 0,
    Q = 0,
    R = 0,
    S = 0,
    T = 0,
    U = 0,
    V = 0,
    W = 0,
    X = 0,
    Y = 0,
    Z = 0,
    $ = 0,
    aa = 0,
    ba = 0,
    ca = 0,
    da = 0,
    ea = 0,
    fa = 0,
    ga = 0,
    ha = 0;
   ha = i;
   i = i + 624 | 0;
   ca = ha + 24 | 0;
   ea = ha + 16 | 0;
   da = ha + 588 | 0;
   Y = ha + 576 | 0;
   ba = ha;
   V = ha + 536 | 0;
   ga = ha + 8 | 0;
   fa = ha + 528 | 0;
   M = (e | 0) != 0;
   N = V + 40 | 0;
   U = N;
   V = V + 39 | 0;
   W = ga + 4 | 0;
   X = Y + 12 | 0;
   Y = Y + 11 | 0;
   Z = da;
   $ = X;
   aa = $ - Z | 0;
   O = -2 - Z | 0;
   P = $ + 2 | 0;
   Q = ca + 288 | 0;
   R = da + 9 | 0;
   S = R;
   T = da + 8 | 0;
   m = 0;
   w = f;
   n = 0;
   f = 0;
   a: while (1) {
    do
     if ((m | 0) > -1)
      if ((n | 0) > (2147483647 - m | 0)) {
       c[(Zh() | 0) >> 2] = 75;
       m = -1;
       break
      } else {
       m = n + m | 0;
       break
      }
    while (0);
    n = a[w >> 0] | 0;
    if (!(n << 24 >> 24)) {
     L = 245;
     break
    } else o = w;
    b: while (1) {
     switch (n << 24 >> 24) {
      case 37:
       {
        n = o;L = 9;
        break b
       }
      case 0:
       {
        n = o;
        break b
       }
      default:
       {}
     }
     K = o + 1 | 0;
     n = a[K >> 0] | 0;
     o = K
    }
    c: do
     if ((L | 0) == 9)
      while (1) {
       L = 0;
       if ((a[n + 1 >> 0] | 0) != 37) break c;
       o = o + 1 | 0;
       n = n + 2 | 0;
       if ((a[n >> 0] | 0) == 37) L = 9;
       else break
      }
     while (0);
    y = o - w | 0;
    if (M ? (c[e >> 2] & 32 | 0) == 0 : 0) Ji(w, y, e) | 0;
    if ((o | 0) != (w | 0)) {
     w = n;
     n = y;
     continue
    }
    r = n + 1 | 0;
    o = a[r >> 0] | 0;
    p = (o << 24 >> 24) + -48 | 0;
    if (p >>> 0 < 10) {
     K = (a[n + 2 >> 0] | 0) == 36;
     r = K ? n + 3 | 0 : r;
     o = a[r >> 0] | 0;
     u = K ? p : -1;
     f = K ? 1 : f
    } else u = -1;
    n = o << 24 >> 24;
    d: do
     if ((n & -32 | 0) == 32) {
      p = 0;
      while (1) {
       if (!(1 << n + -32 & 75913)) {
        s = p;
        n = r;
        break d
       }
       p = 1 << (o << 24 >> 24) + -32 | p;
       r = r + 1 | 0;
       o = a[r >> 0] | 0;
       n = o << 24 >> 24;
       if ((n & -32 | 0) != 32) {
        s = p;
        n = r;
        break
       }
      }
     } else {
      s = 0;
      n = r
     }
    while (0);
    do
     if (o << 24 >> 24 == 42) {
      p = n + 1 | 0;
      o = (a[p >> 0] | 0) + -48 | 0;
      if (o >>> 0 < 10 ? (a[n + 2 >> 0] | 0) == 36 : 0) {
       c[l + (o << 2) >> 2] = 10;
       f = 1;
       n = n + 3 | 0;
       o = c[j + ((a[p >> 0] | 0) + -48 << 3) >> 2] | 0
      } else {
       if (f) {
        m = -1;
        break a
       }
       if (!M) {
        x = s;
        n = p;
        f = 0;
        K = 0;
        break
       }
       f = (c[g >> 2] | 0) + (4 - 1) & ~(4 - 1);
       o = c[f >> 2] | 0;
       c[g >> 2] = f + 4;
       f = 0;
       n = p
      }
      if ((o | 0) < 0) {
       x = s | 8192;
       K = 0 - o | 0
      } else {
       x = s;
       K = o
      }
     } else {
      p = (o << 24 >> 24) + -48 | 0;
      if (p >>> 0 < 10) {
       o = 0;
       do {
        o = (o * 10 | 0) + p | 0;
        n = n + 1 | 0;
        p = (a[n >> 0] | 0) + -48 | 0
       } while (p >>> 0 < 10);
       if ((o | 0) < 0) {
        m = -1;
        break a
       } else {
        x = s;
        K = o
       }
      } else {
       x = s;
       K = 0
      }
     }
    while (0);
    e: do
     if ((a[n >> 0] | 0) == 46) {
      p = n + 1 | 0;
      o = a[p >> 0] | 0;
      if (o << 24 >> 24 != 42) {
       r = (o << 24 >> 24) + -48 | 0;
       if (r >>> 0 < 10) {
        n = p;
        o = 0
       } else {
        n = p;
        r = 0;
        break
       }
       while (1) {
        o = (o * 10 | 0) + r | 0;
        n = n + 1 | 0;
        r = (a[n >> 0] | 0) + -48 | 0;
        if (r >>> 0 >= 10) {
         r = o;
         break e
        }
       }
      }
      p = n + 2 | 0;
      o = (a[p >> 0] | 0) + -48 | 0;
      if (o >>> 0 < 10 ? (a[n + 3 >> 0] | 0) == 36 : 0) {
       c[l + (o << 2) >> 2] = 10;
       n = n + 4 | 0;
       r = c[j + ((a[p >> 0] | 0) + -48 << 3) >> 2] | 0;
       break
      }
      if (f) {
       m = -1;
       break a
      }
      if (M) {
       n = (c[g >> 2] | 0) + (4 - 1) & ~(4 - 1);
       r = c[n >> 2] | 0;
       c[g >> 2] = n + 4;
       n = p
      } else {
       n = p;
       r = 0
      }
     } else r = -1;
    while (0);
    t = 0;
    while (1) {
     o = (a[n >> 0] | 0) + -65 | 0;
     if (o >>> 0 > 57) {
      m = -1;
      break a
     }
     p = n + 1 | 0;
     o = a[21488 + (t * 58 | 0) + o >> 0] | 0;
     s = o & 255;
     if ((s + -1 | 0) >>> 0 < 8) {
      n = p;
      t = s
     } else {
      J = p;
      break
     }
    }
    if (!(o << 24 >> 24)) {
     m = -1;
     break
    }
    p = (u | 0) > -1;
    do
     if (o << 24 >> 24 == 19)
      if (p) {
       m = -1;
       break a
      } else L = 52;
    else {
     if (p) {
      c[l + (u << 2) >> 2] = s;
      H = j + (u << 3) | 0;
      I = c[H + 4 >> 2] | 0;
      L = ba;
      c[L >> 2] = c[H >> 2];
      c[L + 4 >> 2] = I;
      L = 52;
      break
     }
     if (!M) {
      m = 0;
      break a
     }
     gj(ba, s, g)
    } while (0);
    if ((L | 0) == 52 ? (L = 0, !M) : 0) {
     w = J;
     n = y;
     continue
    }
    u = a[n >> 0] | 0;
    u = (t | 0) != 0 & (u & 15 | 0) == 3 ? u & -33 : u;
    p = x & -65537;
    I = (x & 8192 | 0) == 0 ? x : p;
    f: do switch (u | 0) {
      case 110:
       switch (t | 0) {
        case 0:
         {
          c[c[ba >> 2] >> 2] = m;w = J;n = y;
          continue a
         }
        case 1:
         {
          c[c[ba >> 2] >> 2] = m;w = J;n = y;
          continue a
         }
        case 2:
         {
          w = c[ba >> 2] | 0;c[w >> 2] = m;c[w + 4 >> 2] = ((m | 0) < 0) << 31 >> 31;w = J;n = y;
          continue a
         }
        case 3:
         {
          b[c[ba >> 2] >> 1] = m;w = J;n = y;
          continue a
         }
        case 4:
         {
          a[c[ba >> 2] >> 0] = m;w = J;n = y;
          continue a
         }
        case 6:
         {
          c[c[ba >> 2] >> 2] = m;w = J;n = y;
          continue a
         }
        case 7:
         {
          w = c[ba >> 2] | 0;c[w >> 2] = m;c[w + 4 >> 2] = ((m | 0) < 0) << 31 >> 31;w = J;n = y;
          continue a
         }
        default:
         {
          w = J;n = y;
          continue a
         }
       }
      case 112:
       {
        t = I | 8;r = r >>> 0 > 8 ? r : 8;u = 120;L = 64;
        break
       }
      case 88:
      case 120:
       {
        t = I;L = 64;
        break
       }
      case 111:
       {
        p = ba;o = c[p >> 2] | 0;p = c[p + 4 >> 2] | 0;
        if ((o | 0) == 0 & (p | 0) == 0) n = N;
        else {
         n = N;
         do {
          n = n + -1 | 0;
          a[n >> 0] = o & 7 | 48;
          o = ls(o | 0, p | 0, 3) | 0;
          p = C
         } while (!((o | 0) == 0 & (p | 0) == 0))
        }
        if (!(I & 8)) {
         o = I;
         t = 0;
         s = 21968;
         L = 77
        } else {
         t = U - n + 1 | 0;
         o = I;
         r = (r | 0) < (t | 0) ? t : r;
         t = 0;
         s = 21968;
         L = 77
        }
        break
       }
      case 105:
      case 100:
       {
        o = ba;n = c[o >> 2] | 0;o = c[o + 4 >> 2] | 0;
        if ((o | 0) < 0) {
         n = js(0, 0, n | 0, o | 0) | 0;
         o = C;
         p = ba;
         c[p >> 2] = n;
         c[p + 4 >> 2] = o;
         p = 1;
         s = 21968;
         L = 76;
         break f
        }
        if (!(I & 2048)) {
         s = I & 1;
         p = s;
         s = (s | 0) == 0 ? 21968 : 21970;
         L = 76
        } else {
         p = 1;
         s = 21969;
         L = 76
        }
        break
       }
      case 117:
       {
        o = ba;n = c[o >> 2] | 0;o = c[o + 4 >> 2] | 0;p = 0;s = 21968;L = 76;
        break
       }
      case 99:
       {
        a[V >> 0] = c[ba >> 2];w = V;o = 1;t = 0;u = 21968;n = N;
        break
       }
      case 109:
       {
        n = _h(c[(Zh() | 0) >> 2] | 0) | 0;L = 82;
        break
       }
      case 115:
       {
        n = c[ba >> 2] | 0;n = (n | 0) != 0 ? n : 21978;L = 82;
        break
       }
      case 67:
       {
        c[ga >> 2] = c[ba >> 2];c[W >> 2] = 0;c[ba >> 2] = ga;r = -1;L = 86;
        break
       }
      case 83:
       {
        if (!r) {
         ij(e, 32, K, 0, I);
         n = 0;
         L = 98
        } else L = 86;
        break
       }
      case 65:
      case 71:
      case 70:
      case 69:
      case 97:
      case 103:
      case 102:
      case 101:
       {
        q = +h[ba >> 3];c[ea >> 2] = 0;h[k >> 3] = q;
        if ((c[k + 4 >> 2] | 0) >= 0)
         if (!(I & 2048)) {
          H = I & 1;
          G = H;
          H = (H | 0) == 0 ? 21986 : 21991
         } else {
          G = 1;
          H = 21988
         } else {
         q = -q;
         G = 1;
         H = 21985
        }
        h[k >> 3] = q;F = c[k + 4 >> 2] & 2146435072;do
         if (F >>> 0 < 2146435072 | (F | 0) == 2146435072 & 0 < 0) {
          v = +qi(q, ea) * 2.0;
          o = v != 0.0;
          if (o) c[ea >> 2] = (c[ea >> 2] | 0) + -1;
          D = u | 32;
          if ((D | 0) == 97) {
           w = u & 32;
           y = (w | 0) == 0 ? H : H + 9 | 0;
           x = G | 2;
           n = 12 - r | 0;
           do
            if (!(r >>> 0 > 11 | (n | 0) == 0)) {
             q = 8.0;
             do {
              n = n + -1 | 0;
              q = q * 16.0
             } while ((n | 0) != 0);
             if ((a[y >> 0] | 0) == 45) {
              q = -(q + (-v - q));
              break
             } else {
              q = v + q - q;
              break
             }
            } else q = v;
           while (0);
           o = c[ea >> 2] | 0;
           n = (o | 0) < 0 ? 0 - o | 0 : o;
           n = hj(n, ((n | 0) < 0) << 31 >> 31, X) | 0;
           if ((n | 0) == (X | 0)) {
            a[Y >> 0] = 48;
            n = Y
           }
           a[n + -1 >> 0] = (o >> 31 & 2) + 43;
           t = n + -2 | 0;
           a[t >> 0] = u + 15;
           s = (r | 0) < 1;
           p = (I & 8 | 0) == 0;
           o = da;
           while (1) {
            H = ~~q;
            n = o + 1 | 0;
            a[o >> 0] = d[21952 + H >> 0] | w;
            q = (q - +(H | 0)) * 16.0;
            do
             if ((n - Z | 0) == 1) {
              if (p & (s & q == 0.0)) break;
              a[n >> 0] = 46;
              n = o + 2 | 0
             }
            while (0);
            if (!(q != 0.0)) break;
            else o = n
           }
           r = (r | 0) != 0 & (O + n | 0) < (r | 0) ? P + r - t | 0 : aa - t + n | 0;
           p = r + x | 0;
           ij(e, 32, K, p, I);
           if (!(c[e >> 2] & 32)) Ji(y, x, e) | 0;
           ij(e, 48, K, p, I ^ 65536);
           n = n - Z | 0;
           if (!(c[e >> 2] & 32)) Ji(da, n, e) | 0;
           o = $ - t | 0;
           ij(e, 48, r - (n + o) | 0, 0, 0);
           if (!(c[e >> 2] & 32)) Ji(t, o, e) | 0;
           ij(e, 32, K, p, I ^ 8192);
           n = (p | 0) < (K | 0) ? K : p;
           break
          }
          n = (r | 0) < 0 ? 6 : r;
          if (o) {
           o = (c[ea >> 2] | 0) + -28 | 0;
           c[ea >> 2] = o;
           q = v * 268435456.0
          } else {
           q = v;
           o = c[ea >> 2] | 0
          }
          F = (o | 0) < 0 ? ca : Q;
          E = F;
          o = F;
          do {
           B = ~~q >>> 0;
           c[o >> 2] = B;
           o = o + 4 | 0;
           q = (q - +(B >>> 0)) * 1.0e9
          } while (q != 0.0);
          p = o;
          o = c[ea >> 2] | 0;
          if ((o | 0) > 0) {
           s = F;
           while (1) {
            t = (o | 0) > 29 ? 29 : o;
            r = p + -4 | 0;
            do
             if (r >>> 0 < s >>> 0) r = s;
             else {
              o = 0;
              do {
               B = os(c[r >> 2] | 0, 0, t | 0) | 0;
               B = ms(B | 0, C | 0, o | 0, 0) | 0;
               o = C;
               A = xs(B | 0, o | 0, 1e9, 0) | 0;
               c[r >> 2] = A;
               o = ws(B | 0, o | 0, 1e9, 0) | 0;
               r = r + -4 | 0
              } while (r >>> 0 >= s >>> 0);
              if (!o) {
               r = s;
               break
              }
              r = s + -4 | 0;
              c[r >> 2] = o
             }
            while (0); while (1) {
             if (p >>> 0 <= r >>> 0) break;
             o = p + -4 | 0;
             if (!(c[o >> 2] | 0)) p = o;
             else break
            }
            o = (c[ea >> 2] | 0) - t | 0;
            c[ea >> 2] = o;
            if ((o | 0) > 0) s = r;
            else break
           }
          } else r = F;
          if ((o | 0) < 0) {
           y = ((n + 25 | 0) / 9 | 0) + 1 | 0;
           z = (D | 0) == 102;
           w = r;
           while (1) {
            x = 0 - o | 0;
            x = (x | 0) > 9 ? 9 : x;
            do
             if (w >>> 0 < p >>> 0) {
              o = (1 << x) + -1 | 0;
              s = 1e9 >>> x;
              r = 0;
              t = w;
              do {
               B = c[t >> 2] | 0;
               c[t >> 2] = (B >>> x) + r;
               r = _(B & o, s) | 0;
               t = t + 4 | 0
              } while (t >>> 0 < p >>> 0);
              o = (c[w >> 2] | 0) == 0 ? w + 4 | 0 : w;
              if (!r) {
               r = o;
               break
              }
              c[p >> 2] = r;
              r = o;
              p = p + 4 | 0
             } else r = (c[w >> 2] | 0) == 0 ? w + 4 | 0 : w;
            while (0);
            o = z ? F : r;
            p = (p - o >> 2 | 0) > (y | 0) ? o + (y << 2) | 0 : p;
            o = (c[ea >> 2] | 0) + x | 0;
            c[ea >> 2] = o;
            if ((o | 0) >= 0) {
             w = r;
             break
            } else w = r
           }
          } else w = r;
          do
           if (w >>> 0 < p >>> 0) {
            o = (E - w >> 2) * 9 | 0;
            s = c[w >> 2] | 0;
            if (s >>> 0 < 10) break;
            else r = 10;
            do {
             r = r * 10 | 0;
             o = o + 1 | 0
            } while (s >>> 0 >= r >>> 0)
           } else o = 0;
          while (0);
          A = (D | 0) == 103;
          B = (n | 0) != 0;
          r = n - ((D | 0) != 102 ? o : 0) + ((B & A) << 31 >> 31) | 0;
          if ((r | 0) < (((p - E >> 2) * 9 | 0) + -9 | 0)) {
           t = r + 9216 | 0;
           z = (t | 0) / 9 | 0;
           r = F + (z + -1023 << 2) | 0;
           t = ((t | 0) % 9 | 0) + 1 | 0;
           if ((t | 0) < 9) {
            s = 10;
            do {
             s = s * 10 | 0;
             t = t + 1 | 0
            } while ((t | 0) != 9)
           } else s = 10;
           x = c[r >> 2] | 0;
           y = (x >>> 0) % (s >>> 0) | 0;
           if ((y | 0) == 0 ? (F + (z + -1022 << 2) | 0) == (p | 0) : 0) s = w;
           else L = 163;
           do
            if ((L | 0) == 163) {
             L = 0;
             v = (((x >>> 0) / (s >>> 0) | 0) & 1 | 0) == 0 ? 9007199254740992.0 : 9007199254740994.0;
             t = (s | 0) / 2 | 0;
             do
              if (y >>> 0 < t >>> 0) q = .5;
              else {
               if ((y | 0) == (t | 0) ? (F + (z + -1022 << 2) | 0) == (p | 0) : 0) {
                q = 1.0;
                break
               }
               q = 1.5
              }
             while (0);
             do
              if (G) {
               if ((a[H >> 0] | 0) != 45) break;
               v = -v;
               q = -q
              }
             while (0);
             t = x - y | 0;
             c[r >> 2] = t;
             if (!(v + q != v)) {
              s = w;
              break
             }
             D = t + s | 0;
             c[r >> 2] = D;
             if (D >>> 0 > 999999999) {
              o = w;
              while (1) {
               s = r + -4 | 0;
               c[r >> 2] = 0;
               if (s >>> 0 < o >>> 0) {
                o = o + -4 | 0;
                c[o >> 2] = 0
               }
               D = (c[s >> 2] | 0) + 1 | 0;
               c[s >> 2] = D;
               if (D >>> 0 > 999999999) r = s;
               else {
                w = o;
                r = s;
                break
               }
              }
             }
             o = (E - w >> 2) * 9 | 0;
             t = c[w >> 2] | 0;
             if (t >>> 0 < 10) {
              s = w;
              break
             } else s = 10;
             do {
              s = s * 10 | 0;
              o = o + 1 | 0
             } while (t >>> 0 >= s >>> 0);
             s = w
            }
           while (0);
           D = r + 4 | 0;
           w = s;
           p = p >>> 0 > D >>> 0 ? D : p
          }
          y = 0 - o | 0;
          while (1) {
           if (p >>> 0 <= w >>> 0) {
            z = 0;
            D = p;
            break
           }
           r = p + -4 | 0;
           if (!(c[r >> 2] | 0)) p = r;
           else {
            z = 1;
            D = p;
            break
           }
          }
          do
           if (A) {
            n = (B & 1 ^ 1) + n | 0;
            if ((n | 0) > (o | 0) & (o | 0) > -5) {
             u = u + -1 | 0;
             n = n + -1 - o | 0
            } else {
             u = u + -2 | 0;
             n = n + -1 | 0
            }
            p = I & 8;
            if (p) break;
            do
             if (z) {
              p = c[D + -4 >> 2] | 0;
              if (!p) {
               r = 9;
               break
              }
              if (!((p >>> 0) % 10 | 0)) {
               s = 10;
               r = 0
              } else {
               r = 0;
               break
              }
              do {
               s = s * 10 | 0;
               r = r + 1 | 0
              } while (((p >>> 0) % (s >>> 0) | 0 | 0) == 0)
             } else r = 9;
            while (0);
            p = ((D - E >> 2) * 9 | 0) + -9 | 0;
            if ((u | 32 | 0) == 102) {
             p = p - r | 0;
             p = (p | 0) < 0 ? 0 : p;
             n = (n | 0) < (p | 0) ? n : p;
             p = 0;
             break
            } else {
             p = p + o - r | 0;
             p = (p | 0) < 0 ? 0 : p;
             n = (n | 0) < (p | 0) ? n : p;
             p = 0;
             break
            }
           } else p = I & 8;
          while (0);
          x = n | p;
          s = (x | 0) != 0 & 1;
          t = (u | 32 | 0) == 102;
          if (t) {
           o = (o | 0) > 0 ? o : 0;
           u = 0
          } else {
           r = (o | 0) < 0 ? y : o;
           r = hj(r, ((r | 0) < 0) << 31 >> 31, X) | 0;
           if (($ - r | 0) < 2)
            do {
             r = r + -1 | 0;
             a[r >> 0] = 48
            } while (($ - r | 0) < 2);
           a[r + -1 >> 0] = (o >> 31 & 2) + 43;
           E = r + -2 | 0;
           a[E >> 0] = u;
           o = $ - E | 0;
           u = E
          }
          y = G + 1 + n + s + o | 0;
          ij(e, 32, K, y, I);
          if (!(c[e >> 2] & 32)) Ji(H, G, e) | 0;
          ij(e, 48, K, y, I ^ 65536);
          do
           if (t) {
            r = w >>> 0 > F >>> 0 ? F : w;
            o = r;
            do {
             p = hj(c[o >> 2] | 0, 0, R) | 0;
             do
              if ((o | 0) == (r | 0)) {
               if ((p | 0) != (R | 0)) break;
               a[T >> 0] = 48;
               p = T
              } else {
               if (p >>> 0 <= da >>> 0) break;
               do {
                p = p + -1 | 0;
                a[p >> 0] = 48
               } while (p >>> 0 > da >>> 0)
              }
             while (0);
             if (!(c[e >> 2] & 32)) Ji(p, S - p | 0, e) | 0;
             o = o + 4 | 0
            } while (o >>> 0 <= F >>> 0);
            do
             if (x) {
              if (c[e >> 2] & 32) break;
              Ji(22020, 1, e) | 0
             }
            while (0);
            if ((n | 0) > 0 & o >>> 0 < D >>> 0) {
             p = o;
             while (1) {
              o = hj(c[p >> 2] | 0, 0, R) | 0;
              if (o >>> 0 > da >>> 0)
               do {
                o = o + -1 | 0;
                a[o >> 0] = 48
               } while (o >>> 0 > da >>> 0);
              if (!(c[e >> 2] & 32)) Ji(o, (n | 0) > 9 ? 9 : n, e) | 0;
              p = p + 4 | 0;
              o = n + -9 | 0;
              if (!((n | 0) > 9 & p >>> 0 < D >>> 0)) {
               n = o;
               break
              } else n = o
             }
            }
            ij(e, 48, n + 9 | 0, 9, 0)
           } else {
            t = z ? D : w + 4 | 0;
            if ((n | 0) > -1) {
             s = (p | 0) == 0;
             r = w;
             do {
              o = hj(c[r >> 2] | 0, 0, R) | 0;
              if ((o | 0) == (R | 0)) {
               a[T >> 0] = 48;
               o = T
              }
              do
               if ((r | 0) == (w | 0)) {
                p = o + 1 | 0;
                if (!(c[e >> 2] & 32)) Ji(o, 1, e) | 0;
                if (s & (n | 0) < 1) {
                 o = p;
                 break
                }
                if (c[e >> 2] & 32) {
                 o = p;
                 break
                }
                Ji(22020, 1, e) | 0;
                o = p
               } else {
                if (o >>> 0 <= da >>> 0) break;
                do {
                 o = o + -1 | 0;
                 a[o >> 0] = 48
                } while (o >>> 0 > da >>> 0)
               }
              while (0);
              p = S - o | 0;
              if (!(c[e >> 2] & 32)) Ji(o, (n | 0) > (p | 0) ? p : n, e) | 0;
              n = n - p | 0;
              r = r + 4 | 0
             } while (r >>> 0 < t >>> 0 & (n | 0) > -1)
            }
            ij(e, 48, n + 18 | 0, 18, 0);
            if (c[e >> 2] & 32) break;
            Ji(u, $ - u | 0, e) | 0
           }
          while (0);
          ij(e, 32, K, y, I ^ 8192);
          n = (y | 0) < (K | 0) ? K : y
         } else {
          t = (u & 32 | 0) != 0;
          s = q != q | 0.0 != 0.0;
          o = s ? 0 : G;
          r = o + 3 | 0;
          ij(e, 32, K, r, p);
          n = c[e >> 2] | 0;
          if (!(n & 32)) {
           Ji(H, o, e) | 0;
           n = c[e >> 2] | 0
          }
          if (!(n & 32)) Ji(s ? (t ? 22012 : 22016) : t ? 22004 : 22008, 3, e) | 0;
          ij(e, 32, K, r, I ^ 8192);
          n = (r | 0) < (K | 0) ? K : r
         }
        while (0);
        w = J;
        continue a
       }
      default:
       {
        p = I;o = r;t = 0;u = 21968;n = N
       }
     }
     while (0);
     g: do
      if ((L | 0) == 64) {
       p = ba;
       o = c[p >> 2] | 0;
       p = c[p + 4 >> 2] | 0;
       s = u & 32;
       if (!((o | 0) == 0 & (p | 0) == 0)) {
        n = N;
        do {
         n = n + -1 | 0;
         a[n >> 0] = d[21952 + (o & 15) >> 0] | s;
         o = ls(o | 0, p | 0, 4) | 0;
         p = C
        } while (!((o | 0) == 0 & (p | 0) == 0));
        L = ba;
        if ((t & 8 | 0) == 0 | (c[L >> 2] | 0) == 0 & (c[L + 4 >> 2] | 0) == 0) {
         o = t;
         t = 0;
         s = 21968;
         L = 77
        } else {
         o = t;
         t = 2;
         s = 21968 + (u >> 4) | 0;
         L = 77
        }
       } else {
        n = N;
        o = t;
        t = 0;
        s = 21968;
        L = 77
       }
      } else
    if ((L | 0) == 76) {
     n = hj(n, o, N) | 0;
     o = I;
     t = p;
     L = 77
    } else if ((L | 0) == 82) {
     L = 0;
     I = Ui(n, 0, r) | 0;
     H = (I | 0) == 0;
     w = n;
     o = H ? r : I - n | 0;
     t = 0;
     u = 21968;
     n = H ? n + r | 0 : I
    } else if ((L | 0) == 86) {
     L = 0;
     o = 0;
     n = 0;
     s = c[ba >> 2] | 0;
     while (1) {
      p = c[s >> 2] | 0;
      if (!p) break;
      n = Ci(fa, p) | 0;
      if ((n | 0) < 0 | n >>> 0 > (r - o | 0) >>> 0) break;
      o = n + o | 0;
      if (r >>> 0 > o >>> 0) s = s + 4 | 0;
      else break
     }
     if ((n | 0) < 0) {
      m = -1;
      break a
     }
     ij(e, 32, K, o, I);
     if (!o) {
      n = 0;
      L = 98
     } else {
      p = 0;
      r = c[ba >> 2] | 0;
      while (1) {
       n = c[r >> 2] | 0;
       if (!n) {
        n = o;
        L = 98;
        break g
       }
       n = Ci(fa, n) | 0;
       p = n + p | 0;
       if ((p | 0) > (o | 0)) {
        n = o;
        L = 98;
        break g
       }
       if (!(c[e >> 2] & 32)) Ji(fa, n, e) | 0;
       if (p >>> 0 >= o >>> 0) {
        n = o;
        L = 98;
        break
       } else r = r + 4 | 0
      }
     }
    }
    while (0);
    if ((L | 0) == 98) {
     L = 0;
     ij(e, 32, K, n, I ^ 8192);
     w = J;
     n = (K | 0) > (n | 0) ? K : n;
     continue
    }
    if ((L | 0) == 77) {
     L = 0;
     p = (r | 0) > -1 ? o & -65537 : o;
     o = ba;
     o = (c[o >> 2] | 0) != 0 | (c[o + 4 >> 2] | 0) != 0;
     if ((r | 0) != 0 | o) {
      o = (o & 1 ^ 1) + (U - n) | 0;
      w = n;
      o = (r | 0) > (o | 0) ? r : o;
      u = s;
      n = N
     } else {
      w = N;
      o = 0;
      u = s;
      n = N
     }
    }
    s = n - w | 0;
    o = (o | 0) < (s | 0) ? s : o;
    r = t + o | 0;
    n = (K | 0) < (r | 0) ? r : K;
    ij(e, 32, n, r, p);
    if (!(c[e >> 2] & 32)) Ji(u, t, e) | 0;
    ij(e, 48, n, r, p ^ 65536);
    ij(e, 48, o, s, 0);
    if (!(c[e >> 2] & 32)) Ji(w, s, e) | 0;
    ij(e, 32, n, r, p ^ 8192);
    w = J
   }
   h: do
    if ((L | 0) == 245)
     if (!e)
      if (f) {
       m = 1;
       while (1) {
        f = c[l + (m << 2) >> 2] | 0;
        if (!f) break;
        gj(j + (m << 3) | 0, f, g);
        m = m + 1 | 0;
        if ((m | 0) >= 10) {
         m = 1;
         break h
        }
       }
       if ((m | 0) < 10)
        while (1) {
         if (c[l + (m << 2) >> 2] | 0) {
          m = -1;
          break h
         }
         m = m + 1 | 0;
         if ((m | 0) >= 10) {
          m = 1;
          break
         }
        } else m = 1
      } else m = 0;
   while (0);
   i = ha;
   return m | 0
  }

  function cj(a, b, c) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   return Fi(a, b, c) | 0
  }

  function dj(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0.0,
    f = 0,
    g = 0,
    h = 0,
    j = 0;
   j = i;
   i = i + 112 | 0;
   h = j;
   f = h;
   g = f + 112 | 0;
   do {
    c[f >> 2] = 0;
    f = f + 4 | 0
   } while ((f | 0) < (g | 0));
   f = h + 4 | 0;
   c[f >> 2] = a;
   g = h + 8 | 0;
   c[g >> 2] = -1;
   c[h + 44 >> 2] = a;
   c[h + 76 >> 2] = -1;
   bi(h, 0);
   e = +$h(h, d, 1);
   d = (c[f >> 2] | 0) - (c[g >> 2] | 0) + (c[h + 108 >> 2] | 0) | 0;
   if (b) c[b >> 2] = (d | 0) != 0 ? a + d | 0 : a;
   i = j;
   return +e
  }

  function ej(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    j = 0,
    k = 0;
   k = i;
   i = i + 112 | 0;
   j = k;
   c[j >> 2] = 0;
   g = j + 4 | 0;
   c[g >> 2] = a;
   c[j + 44 >> 2] = a;
   h = j + 8 | 0;
   c[h >> 2] = (a | 0) < 0 ? -1 : a + 2147483647 | 0;
   c[j + 76 >> 2] = -1;
   bi(j, 0);
   e = ai(j, d, 1, e, f) | 0;
   if (b) c[b >> 2] = a + ((c[g >> 2] | 0) + (c[j + 108 >> 2] | 0) - (c[h >> 2] | 0));
   i = k;
   return e | 0
  }

  function fj(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0;
   e = a + 20 | 0;
   f = c[e >> 2] | 0;
   a = (c[a + 16 >> 2] | 0) - f | 0;
   a = a >>> 0 > d >>> 0 ? d : a;
   ns(f | 0, b | 0, a | 0) | 0;
   c[e >> 2] = (c[e >> 2] | 0) + a;
   return d | 0
  }

  function gj(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0.0;
   a: do
    if (b >>> 0 <= 20)
     do switch (b | 0) {
      case 9:
       {
        e = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);b = c[e >> 2] | 0;c[d >> 2] = e + 4;c[a >> 2] = b;
        break a
       }
      case 10:
       {
        e = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);b = c[e >> 2] | 0;c[d >> 2] = e + 4;e = a;c[e >> 2] = b;c[e + 4 >> 2] = ((b | 0) < 0) << 31 >> 31;
        break a
       }
      case 11:
       {
        e = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);b = c[e >> 2] | 0;c[d >> 2] = e + 4;e = a;c[e >> 2] = b;c[e + 4 >> 2] = 0;
        break a
       }
      case 12:
       {
        e = (c[d >> 2] | 0) + (8 - 1) & ~(8 - 1);b = e;f = c[b >> 2] | 0;b = c[b + 4 >> 2] | 0;c[d >> 2] = e + 8;e = a;c[e >> 2] = f;c[e + 4 >> 2] = b;
        break a
       }
      case 13:
       {
        f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);e = c[f >> 2] | 0;c[d >> 2] = f + 4;e = (e & 65535) << 16 >> 16;f = a;c[f >> 2] = e;c[f + 4 >> 2] = ((e | 0) < 0) << 31 >> 31;
        break a
       }
      case 14:
       {
        f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);e = c[f >> 2] | 0;c[d >> 2] = f + 4;f = a;c[f >> 2] = e & 65535;c[f + 4 >> 2] = 0;
        break a
       }
      case 15:
       {
        f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);e = c[f >> 2] | 0;c[d >> 2] = f + 4;e = (e & 255) << 24 >> 24;f = a;c[f >> 2] = e;c[f + 4 >> 2] = ((e | 0) < 0) << 31 >> 31;
        break a
       }
      case 16:
       {
        f = (c[d >> 2] | 0) + (4 - 1) & ~(4 - 1);e = c[f >> 2] | 0;c[d >> 2] = f + 4;f = a;c[f >> 2] = e & 255;c[f + 4 >> 2] = 0;
        break a
       }
      case 17:
       {
        f = (c[d >> 2] | 0) + (8 - 1) & ~(8 - 1);g = +h[f >> 3];c[d >> 2] = f + 8;h[a >> 3] = g;
        break a
       }
      case 18:
       {
        f = (c[d >> 2] | 0) + (8 - 1) & ~(8 - 1);g = +h[f >> 3];c[d >> 2] = f + 8;h[a >> 3] = g;
        break a
       }
      default:
       break a
     }
     while (0); while (0);
   return
  }

  function hj(b, c, d) {
   b = b | 0;
   c = c | 0;
   d = d | 0;
   var e = 0;
   if (c >>> 0 > 0 | (c | 0) == 0 & b >>> 0 > 4294967295)
    while (1) {
     e = xs(b | 0, c | 0, 10, 0) | 0;
     d = d + -1 | 0;
     a[d >> 0] = e | 48;
     e = ws(b | 0, c | 0, 10, 0) | 0;
     if (c >>> 0 > 9 | (c | 0) == 9 & b >>> 0 > 4294967295) {
      b = e;
      c = C
     } else {
      b = e;
      break
     }
    }
   if (b)
    while (1) {
     d = d + -1 | 0;
     a[d >> 0] = (b >>> 0) % 10 | 0 | 48;
     if (b >>> 0 < 10) break;
     else b = (b >>> 0) / 10 | 0
    }
   return d | 0
  }

  function ij(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    j = 0;
   j = i;
   i = i + 256 | 0;
   h = j;
   do
    if ((d | 0) > (e | 0) & (f & 73728 | 0) == 0) {
     f = d - e | 0;
     ks(h | 0, b | 0, (f >>> 0 > 256 ? 256 : f) | 0) | 0;
     b = c[a >> 2] | 0;
     g = (b & 32 | 0) == 0;
     if (f >>> 0 > 255) {
      e = d - e | 0;
      do {
       if (g) {
        Ji(h, 256, a) | 0;
        b = c[a >> 2] | 0
       }
       f = f + -256 | 0;
       g = (b & 32 | 0) == 0
      } while (f >>> 0 > 255);
      if (g) f = e & 255;
      else break
     } else if (!g) break;
     Ji(h, f, a) | 0
    }
   while (0);
   i = j;
   return
  }

  function jj(a) {
   a = a | 0;
   var b = 0,
    d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0,
    F = 0,
    G = 0,
    H = 0,
    I = 0,
    J = 0,
    K = 0,
    L = 0,
    M = 0;
   do
    if (a >>> 0 < 245) {
     o = a >>> 0 < 11 ? 16 : a + 11 & -8;
     a = o >>> 3;
     i = c[1818] | 0;
     d = i >>> a;
     if (d & 3) {
      a = (d & 1 ^ 1) + a | 0;
      e = a << 1;
      d = 7312 + (e << 2) | 0;
      e = 7312 + (e + 2 << 2) | 0;
      f = c[e >> 2] | 0;
      g = f + 8 | 0;
      h = c[g >> 2] | 0;
      do
       if ((d | 0) != (h | 0)) {
        if (h >>> 0 < (c[1822] | 0) >>> 0) bb();
        b = h + 12 | 0;
        if ((c[b >> 2] | 0) == (f | 0)) {
         c[b >> 2] = d;
         c[e >> 2] = h;
         break
        } else bb()
       } else c[1818] = i & ~(1 << a);
      while (0);
      M = a << 3;
      c[f + 4 >> 2] = M | 3;
      M = f + (M | 4) | 0;
      c[M >> 2] = c[M >> 2] | 1;
      M = g;
      return M | 0
     }
     h = c[1820] | 0;
     if (o >>> 0 > h >>> 0) {
      if (d) {
       e = 2 << a;
       e = d << a & (e | 0 - e);
       e = (e & 0 - e) + -1 | 0;
       j = e >>> 12 & 16;
       e = e >>> j;
       f = e >>> 5 & 8;
       e = e >>> f;
       g = e >>> 2 & 4;
       e = e >>> g;
       d = e >>> 1 & 2;
       e = e >>> d;
       a = e >>> 1 & 1;
       a = (f | j | g | d | a) + (e >>> a) | 0;
       e = a << 1;
       d = 7312 + (e << 2) | 0;
       e = 7312 + (e + 2 << 2) | 0;
       g = c[e >> 2] | 0;
       j = g + 8 | 0;
       f = c[j >> 2] | 0;
       do
        if ((d | 0) != (f | 0)) {
         if (f >>> 0 < (c[1822] | 0) >>> 0) bb();
         b = f + 12 | 0;
         if ((c[b >> 2] | 0) == (g | 0)) {
          c[b >> 2] = d;
          c[e >> 2] = f;
          k = c[1820] | 0;
          break
         } else bb()
        } else {
         c[1818] = i & ~(1 << a);
         k = h
        }
       while (0);
       M = a << 3;
       h = M - o | 0;
       c[g + 4 >> 2] = o | 3;
       i = g + o | 0;
       c[g + (o | 4) >> 2] = h | 1;
       c[g + M >> 2] = h;
       if (k) {
        f = c[1823] | 0;
        d = k >>> 3;
        b = d << 1;
        e = 7312 + (b << 2) | 0;
        a = c[1818] | 0;
        d = 1 << d;
        if (a & d) {
         a = 7312 + (b + 2 << 2) | 0;
         b = c[a >> 2] | 0;
         if (b >>> 0 < (c[1822] | 0) >>> 0) bb();
         else {
          l = a;
          m = b
         }
        } else {
         c[1818] = a | d;
         l = 7312 + (b + 2 << 2) | 0;
         m = e
        }
        c[l >> 2] = f;
        c[m + 12 >> 2] = f;
        c[f + 8 >> 2] = m;
        c[f + 12 >> 2] = e
       }
       c[1820] = h;
       c[1823] = i;
       M = j;
       return M | 0
      }
      a = c[1819] | 0;
      if (a) {
       d = (a & 0 - a) + -1 | 0;
       L = d >>> 12 & 16;
       d = d >>> L;
       K = d >>> 5 & 8;
       d = d >>> K;
       M = d >>> 2 & 4;
       d = d >>> M;
       a = d >>> 1 & 2;
       d = d >>> a;
       e = d >>> 1 & 1;
       e = c[7576 + ((K | L | M | a | e) + (d >>> e) << 2) >> 2] | 0;
       d = (c[e + 4 >> 2] & -8) - o | 0;
       a = e;
       while (1) {
        b = c[a + 16 >> 2] | 0;
        if (!b) {
         b = c[a + 20 >> 2] | 0;
         if (!b) {
          j = d;
          break
         }
        }
        a = (c[b + 4 >> 2] & -8) - o | 0;
        M = a >>> 0 < d >>> 0;
        d = M ? a : d;
        a = b;
        e = M ? b : e
       }
       g = c[1822] | 0;
       if (e >>> 0 < g >>> 0) bb();
       i = e + o | 0;
       if (e >>> 0 >= i >>> 0) bb();
       h = c[e + 24 >> 2] | 0;
       d = c[e + 12 >> 2] | 0;
       do
        if ((d | 0) == (e | 0)) {
         a = e + 20 | 0;
         b = c[a >> 2] | 0;
         if (!b) {
          a = e + 16 | 0;
          b = c[a >> 2] | 0;
          if (!b) {
           n = 0;
           break
          }
         }
         while (1) {
          d = b + 20 | 0;
          f = c[d >> 2] | 0;
          if (f) {
           b = f;
           a = d;
           continue
          }
          d = b + 16 | 0;
          f = c[d >> 2] | 0;
          if (!f) break;
          else {
           b = f;
           a = d
          }
         }
         if (a >>> 0 < g >>> 0) bb();
         else {
          c[a >> 2] = 0;
          n = b;
          break
         }
        } else {
         f = c[e + 8 >> 2] | 0;
         if (f >>> 0 < g >>> 0) bb();
         b = f + 12 | 0;
         if ((c[b >> 2] | 0) != (e | 0)) bb();
         a = d + 8 | 0;
         if ((c[a >> 2] | 0) == (e | 0)) {
          c[b >> 2] = d;
          c[a >> 2] = f;
          n = d;
          break
         } else bb()
        }
       while (0);
       do
        if (h) {
         b = c[e + 28 >> 2] | 0;
         a = 7576 + (b << 2) | 0;
         if ((e | 0) == (c[a >> 2] | 0)) {
          c[a >> 2] = n;
          if (!n) {
           c[1819] = c[1819] & ~(1 << b);
           break
          }
         } else {
          if (h >>> 0 < (c[1822] | 0) >>> 0) bb();
          b = h + 16 | 0;
          if ((c[b >> 2] | 0) == (e | 0)) c[b >> 2] = n;
          else c[h + 20 >> 2] = n;
          if (!n) break
         }
         a = c[1822] | 0;
         if (n >>> 0 < a >>> 0) bb();
         c[n + 24 >> 2] = h;
         b = c[e + 16 >> 2] | 0;
         do
          if (b)
           if (b >>> 0 < a >>> 0) bb();
           else {
            c[n + 16 >> 2] = b;
            c[b + 24 >> 2] = n;
            break
           }
         while (0);
         b = c[e + 20 >> 2] | 0;
         if (b)
          if (b >>> 0 < (c[1822] | 0) >>> 0) bb();
          else {
           c[n + 20 >> 2] = b;
           c[b + 24 >> 2] = n;
           break
          }
        }
       while (0);
       if (j >>> 0 < 16) {
        M = j + o | 0;
        c[e + 4 >> 2] = M | 3;
        M = e + (M + 4) | 0;
        c[M >> 2] = c[M >> 2] | 1
       } else {
        c[e + 4 >> 2] = o | 3;
        c[e + (o | 4) >> 2] = j | 1;
        c[e + (j + o) >> 2] = j;
        b = c[1820] | 0;
        if (b) {
         g = c[1823] | 0;
         d = b >>> 3;
         b = d << 1;
         f = 7312 + (b << 2) | 0;
         a = c[1818] | 0;
         d = 1 << d;
         if (a & d) {
          b = 7312 + (b + 2 << 2) | 0;
          a = c[b >> 2] | 0;
          if (a >>> 0 < (c[1822] | 0) >>> 0) bb();
          else {
           p = b;
           q = a
          }
         } else {
          c[1818] = a | d;
          p = 7312 + (b + 2 << 2) | 0;
          q = f
         }
         c[p >> 2] = g;
         c[q + 12 >> 2] = g;
         c[g + 8 >> 2] = q;
         c[g + 12 >> 2] = f
        }
        c[1820] = j;
        c[1823] = i
       }
       M = e + 8 | 0;
       return M | 0
      } else q = o
     } else q = o
    } else if (a >>> 0 <= 4294967231) {
    a = a + 11 | 0;
    m = a & -8;
    l = c[1819] | 0;
    if (l) {
     d = 0 - m | 0;
     a = a >>> 8;
     if (a)
      if (m >>> 0 > 16777215) k = 31;
      else {
       q = (a + 1048320 | 0) >>> 16 & 8;
       v = a << q;
       p = (v + 520192 | 0) >>> 16 & 4;
       v = v << p;
       k = (v + 245760 | 0) >>> 16 & 2;
       k = 14 - (p | q | k) + (v << k >>> 15) | 0;
       k = m >>> (k + 7 | 0) & 1 | k << 1
      } else k = 0;
     a = c[7576 + (k << 2) >> 2] | 0;
     a: do
      if (!a) {
       f = 0;
       a = 0;
       v = 86
      } else {
       h = d;
       f = 0;
       i = m << ((k | 0) == 31 ? 0 : 25 - (k >>> 1) | 0);
       j = a;
       a = 0;
       while (1) {
        g = c[j + 4 >> 2] & -8;
        d = g - m | 0;
        if (d >>> 0 < h >>> 0)
         if ((g | 0) == (m | 0)) {
          g = j;
          a = j;
          v = 90;
          break a
         } else a = j;
        else d = h;
        v = c[j + 20 >> 2] | 0;
        j = c[j + 16 + (i >>> 31 << 2) >> 2] | 0;
        f = (v | 0) == 0 | (v | 0) == (j | 0) ? f : v;
        if (!j) {
         v = 86;
         break
        } else {
         h = d;
         i = i << 1
        }
       }
      }
     while (0);
     if ((v | 0) == 86) {
      if ((f | 0) == 0 & (a | 0) == 0) {
       a = 2 << k;
       a = l & (a | 0 - a);
       if (!a) {
        q = m;
        break
       }
       a = (a & 0 - a) + -1 | 0;
       n = a >>> 12 & 16;
       a = a >>> n;
       l = a >>> 5 & 8;
       a = a >>> l;
       p = a >>> 2 & 4;
       a = a >>> p;
       q = a >>> 1 & 2;
       a = a >>> q;
       f = a >>> 1 & 1;
       f = c[7576 + ((l | n | p | q | f) + (a >>> f) << 2) >> 2] | 0;
       a = 0
      }
      if (!f) {
       i = d;
       j = a
      } else {
       g = f;
       v = 90
      }
     }
     if ((v | 0) == 90)
      while (1) {
       v = 0;
       q = (c[g + 4 >> 2] & -8) - m | 0;
       f = q >>> 0 < d >>> 0;
       d = f ? q : d;
       a = f ? g : a;
       f = c[g + 16 >> 2] | 0;
       if (f) {
        g = f;
        v = 90;
        continue
       }
       g = c[g + 20 >> 2] | 0;
       if (!g) {
        i = d;
        j = a;
        break
       } else v = 90
      }
     if ((j | 0) != 0 ? i >>> 0 < ((c[1820] | 0) - m | 0) >>> 0 : 0) {
      f = c[1822] | 0;
      if (j >>> 0 < f >>> 0) bb();
      h = j + m | 0;
      if (j >>> 0 >= h >>> 0) bb();
      g = c[j + 24 >> 2] | 0;
      d = c[j + 12 >> 2] | 0;
      do
       if ((d | 0) == (j | 0)) {
        a = j + 20 | 0;
        b = c[a >> 2] | 0;
        if (!b) {
         a = j + 16 | 0;
         b = c[a >> 2] | 0;
         if (!b) {
          o = 0;
          break
         }
        }
        while (1) {
         d = b + 20 | 0;
         e = c[d >> 2] | 0;
         if (e) {
          b = e;
          a = d;
          continue
         }
         d = b + 16 | 0;
         e = c[d >> 2] | 0;
         if (!e) break;
         else {
          b = e;
          a = d
         }
        }
        if (a >>> 0 < f >>> 0) bb();
        else {
         c[a >> 2] = 0;
         o = b;
         break
        }
       } else {
        e = c[j + 8 >> 2] | 0;
        if (e >>> 0 < f >>> 0) bb();
        b = e + 12 | 0;
        if ((c[b >> 2] | 0) != (j | 0)) bb();
        a = d + 8 | 0;
        if ((c[a >> 2] | 0) == (j | 0)) {
         c[b >> 2] = d;
         c[a >> 2] = e;
         o = d;
         break
        } else bb()
       }
      while (0);
      do
       if (g) {
        b = c[j + 28 >> 2] | 0;
        a = 7576 + (b << 2) | 0;
        if ((j | 0) == (c[a >> 2] | 0)) {
         c[a >> 2] = o;
         if (!o) {
          c[1819] = c[1819] & ~(1 << b);
          break
         }
        } else {
         if (g >>> 0 < (c[1822] | 0) >>> 0) bb();
         b = g + 16 | 0;
         if ((c[b >> 2] | 0) == (j | 0)) c[b >> 2] = o;
         else c[g + 20 >> 2] = o;
         if (!o) break
        }
        a = c[1822] | 0;
        if (o >>> 0 < a >>> 0) bb();
        c[o + 24 >> 2] = g;
        b = c[j + 16 >> 2] | 0;
        do
         if (b)
          if (b >>> 0 < a >>> 0) bb();
          else {
           c[o + 16 >> 2] = b;
           c[b + 24 >> 2] = o;
           break
          }
        while (0);
        b = c[j + 20 >> 2] | 0;
        if (b)
         if (b >>> 0 < (c[1822] | 0) >>> 0) bb();
         else {
          c[o + 20 >> 2] = b;
          c[b + 24 >> 2] = o;
          break
         }
       }
      while (0);
      b: do
       if (i >>> 0 >= 16) {
        c[j + 4 >> 2] = m | 3;
        c[j + (m | 4) >> 2] = i | 1;
        c[j + (i + m) >> 2] = i;
        b = i >>> 3;
        if (i >>> 0 < 256) {
         a = b << 1;
         e = 7312 + (a << 2) | 0;
         d = c[1818] | 0;
         b = 1 << b;
         if (d & b) {
          b = 7312 + (a + 2 << 2) | 0;
          a = c[b >> 2] | 0;
          if (a >>> 0 < (c[1822] | 0) >>> 0) bb();
          else {
           s = b;
           t = a
          }
         } else {
          c[1818] = d | b;
          s = 7312 + (a + 2 << 2) | 0;
          t = e
         }
         c[s >> 2] = h;
         c[t + 12 >> 2] = h;
         c[j + (m + 8) >> 2] = t;
         c[j + (m + 12) >> 2] = e;
         break
        }
        b = i >>> 8;
        if (b)
         if (i >>> 0 > 16777215) e = 31;
         else {
          L = (b + 1048320 | 0) >>> 16 & 8;
          M = b << L;
          K = (M + 520192 | 0) >>> 16 & 4;
          M = M << K;
          e = (M + 245760 | 0) >>> 16 & 2;
          e = 14 - (K | L | e) + (M << e >>> 15) | 0;
          e = i >>> (e + 7 | 0) & 1 | e << 1
         } else e = 0;
        b = 7576 + (e << 2) | 0;
        c[j + (m + 28) >> 2] = e;
        c[j + (m + 20) >> 2] = 0;
        c[j + (m + 16) >> 2] = 0;
        a = c[1819] | 0;
        d = 1 << e;
        if (!(a & d)) {
         c[1819] = a | d;
         c[b >> 2] = h;
         c[j + (m + 24) >> 2] = b;
         c[j + (m + 12) >> 2] = h;
         c[j + (m + 8) >> 2] = h;
         break
        }
        b = c[b >> 2] | 0;
        c: do
         if ((c[b + 4 >> 2] & -8 | 0) != (i | 0)) {
          e = i << ((e | 0) == 31 ? 0 : 25 - (e >>> 1) | 0);
          while (1) {
           a = b + 16 + (e >>> 31 << 2) | 0;
           d = c[a >> 2] | 0;
           if (!d) break;
           if ((c[d + 4 >> 2] & -8 | 0) == (i | 0)) {
            y = d;
            break c
           } else {
            e = e << 1;
            b = d
           }
          }
          if (a >>> 0 < (c[1822] | 0) >>> 0) bb();
          else {
           c[a >> 2] = h;
           c[j + (m + 24) >> 2] = b;
           c[j + (m + 12) >> 2] = h;
           c[j + (m + 8) >> 2] = h;
           break b
          }
         } else y = b;
        while (0);
        b = y + 8 | 0;
        a = c[b >> 2] | 0;
        M = c[1822] | 0;
        if (a >>> 0 >= M >>> 0 & y >>> 0 >= M >>> 0) {
         c[a + 12 >> 2] = h;
         c[b >> 2] = h;
         c[j + (m + 8) >> 2] = a;
         c[j + (m + 12) >> 2] = y;
         c[j + (m + 24) >> 2] = 0;
         break
        } else bb()
       } else {
        M = i + m | 0;
        c[j + 4 >> 2] = M | 3;
        M = j + (M + 4) | 0;
        c[M >> 2] = c[M >> 2] | 1
       }
      while (0);
      M = j + 8 | 0;
      return M | 0
     } else q = m
    } else q = m
   } else q = -1;
   while (0);
   d = c[1820] | 0;
   if (d >>> 0 >= q >>> 0) {
    b = d - q | 0;
    a = c[1823] | 0;
    if (b >>> 0 > 15) {
     c[1823] = a + q;
     c[1820] = b;
     c[a + (q + 4) >> 2] = b | 1;
     c[a + d >> 2] = b;
     c[a + 4 >> 2] = q | 3
    } else {
     c[1820] = 0;
     c[1823] = 0;
     c[a + 4 >> 2] = d | 3;
     M = a + (d + 4) | 0;
     c[M >> 2] = c[M >> 2] | 1
    }
    M = a + 8 | 0;
    return M | 0
   }
   a = c[1821] | 0;
   if (a >>> 0 > q >>> 0) {
    L = a - q | 0;
    c[1821] = L;
    M = c[1824] | 0;
    c[1824] = M + q;
    c[M + (q + 4) >> 2] = L | 1;
    c[M + 4 >> 2] = q | 3;
    M = M + 8 | 0;
    return M | 0
   }
   do
    if (!(c[1936] | 0)) {
     a = Pa(30) | 0;
     if (!(a + -1 & a)) {
      c[1938] = a;
      c[1937] = a;
      c[1939] = -1;
      c[1940] = -1;
      c[1941] = 0;
      c[1929] = 0;
      c[1936] = (cb(0) | 0) & -16 ^ 1431655768;
      break
     } else bb()
    }
   while (0);
   j = q + 48 | 0;
   i = c[1938] | 0;
   k = q + 47 | 0;
   h = i + k | 0;
   i = 0 - i | 0;
   l = h & i;
   if (l >>> 0 <= q >>> 0) {
    M = 0;
    return M | 0
   }
   a = c[1928] | 0;
   if ((a | 0) != 0 ? (t = c[1926] | 0, y = t + l | 0, y >>> 0 <= t >>> 0 | y >>> 0 > a >>> 0) : 0) {
    M = 0;
    return M | 0
   }
   d: do
    if (!(c[1929] & 4)) {
     a = c[1824] | 0;
     e: do
      if (a) {
       f = 7720;
       while (1) {
        d = c[f >> 2] | 0;
        if (d >>> 0 <= a >>> 0 ? (r = f + 4 | 0, (d + (c[r >> 2] | 0) | 0) >>> 0 > a >>> 0) : 0) {
         g = f;
         a = r;
         break
        }
        f = c[f + 8 >> 2] | 0;
        if (!f) {
         v = 174;
         break e
        }
       }
       d = h - (c[1821] | 0) & i;
       if (d >>> 0 < 2147483647) {
        f = Xa(d | 0) | 0;
        y = (f | 0) == ((c[g >> 2] | 0) + (c[a >> 2] | 0) | 0);
        a = y ? d : 0;
        if (y) {
         if ((f | 0) != (-1 | 0)) {
          w = f;
          p = a;
          v = 194;
          break d
         }
        } else v = 184
       } else a = 0
      } else v = 174;
     while (0);
     do
      if ((v | 0) == 174) {
       g = Xa(0) | 0;
       if ((g | 0) != (-1 | 0)) {
        a = g;
        d = c[1937] | 0;
        f = d + -1 | 0;
        if (!(f & a)) d = l;
        else d = l - a + (f + a & 0 - d) | 0;
        a = c[1926] | 0;
        f = a + d | 0;
        if (d >>> 0 > q >>> 0 & d >>> 0 < 2147483647) {
         y = c[1928] | 0;
         if ((y | 0) != 0 ? f >>> 0 <= a >>> 0 | f >>> 0 > y >>> 0 : 0) {
          a = 0;
          break
         }
         f = Xa(d | 0) | 0;
         y = (f | 0) == (g | 0);
         a = y ? d : 0;
         if (y) {
          w = g;
          p = a;
          v = 194;
          break d
         } else v = 184
        } else a = 0
       } else a = 0
      }
     while (0);
     f: do
      if ((v | 0) == 184) {
       g = 0 - d | 0;
       do
        if (j >>> 0 > d >>> 0 & (d >>> 0 < 2147483647 & (f | 0) != (-1 | 0)) ? (u = c[1938] | 0, u = k - d + u & 0 - u, u >>> 0 < 2147483647) : 0)
         if ((Xa(u | 0) | 0) == (-1 | 0)) {
          Xa(g | 0) | 0;
          break f
         } else {
          d = u + d | 0;
          break
         }
       while (0);
       if ((f | 0) != (-1 | 0)) {
        w = f;
        p = d;
        v = 194;
        break d
       }
      }
     while (0);
     c[1929] = c[1929] | 4;
     v = 191
    } else {
     a = 0;
     v = 191
    }
   while (0);
   if ((((v | 0) == 191 ? l >>> 0 < 2147483647 : 0) ? (w = Xa(l | 0) | 0, x = Xa(0) | 0, w >>> 0 < x >>> 0 & ((w | 0) != (-1 | 0) & (x | 0) != (-1 | 0))) : 0) ? (z = x - w | 0, A = z >>> 0 > (q + 40 | 0) >>> 0, A) : 0) {
    p = A ? z : a;
    v = 194
   }
   if ((v | 0) == 194) {
    a = (c[1926] | 0) + p | 0;
    c[1926] = a;
    if (a >>> 0 > (c[1927] | 0) >>> 0) c[1927] = a;
    h = c[1824] | 0;
    g: do
     if (h) {
      g = 7720;
      do {
       a = c[g >> 2] | 0;
       d = g + 4 | 0;
       f = c[d >> 2] | 0;
       if ((w | 0) == (a + f | 0)) {
        B = a;
        C = d;
        D = f;
        E = g;
        v = 204;
        break
       }
       g = c[g + 8 >> 2] | 0
      } while ((g | 0) != 0);
      if (((v | 0) == 204 ? (c[E + 12 >> 2] & 8 | 0) == 0 : 0) ? h >>> 0 < w >>> 0 & h >>> 0 >= B >>> 0 : 0) {
       c[C >> 2] = D + p;
       M = (c[1821] | 0) + p | 0;
       L = h + 8 | 0;
       L = (L & 7 | 0) == 0 ? 0 : 0 - L & 7;
       K = M - L | 0;
       c[1824] = h + L;
       c[1821] = K;
       c[h + (L + 4) >> 2] = K | 1;
       c[h + (M + 4) >> 2] = 40;
       c[1825] = c[1940];
       break
      }
      a = c[1822] | 0;
      if (w >>> 0 < a >>> 0) {
       c[1822] = w;
       a = w
      }
      d = w + p | 0;
      g = 7720;
      while (1) {
       if ((c[g >> 2] | 0) == (d | 0)) {
        f = g;
        d = g;
        v = 212;
        break
       }
       g = c[g + 8 >> 2] | 0;
       if (!g) {
        d = 7720;
        break
       }
      }
      if ((v | 0) == 212)
       if (!(c[d + 12 >> 2] & 8)) {
        c[f >> 2] = w;
        n = d + 4 | 0;
        c[n >> 2] = (c[n >> 2] | 0) + p;
        n = w + 8 | 0;
        n = (n & 7 | 0) == 0 ? 0 : 0 - n & 7;
        k = w + (p + 8) | 0;
        k = (k & 7 | 0) == 0 ? 0 : 0 - k & 7;
        b = w + (k + p) | 0;
        m = n + q | 0;
        o = w + m | 0;
        l = b - (w + n) - q | 0;
        c[w + (n + 4) >> 2] = q | 3;
        h: do
         if ((b | 0) != (h | 0)) {
          if ((b | 0) == (c[1823] | 0)) {
           M = (c[1820] | 0) + l | 0;
           c[1820] = M;
           c[1823] = o;
           c[w + (m + 4) >> 2] = M | 1;
           c[w + (M + m) >> 2] = M;
           break
          }
          i = p + 4 | 0;
          d = c[w + (i + k) >> 2] | 0;
          if ((d & 3 | 0) == 1) {
           j = d & -8;
           g = d >>> 3;
           i: do
            if (d >>> 0 >= 256) {
             h = c[w + ((k | 24) + p) >> 2] | 0;
             e = c[w + (p + 12 + k) >> 2] | 0;
             do
              if ((e | 0) == (b | 0)) {
               f = k | 16;
               e = w + (i + f) | 0;
               d = c[e >> 2] | 0;
               if (!d) {
                e = w + (f + p) | 0;
                d = c[e >> 2] | 0;
                if (!d) {
                 J = 0;
                 break
                }
               }
               while (1) {
                f = d + 20 | 0;
                g = c[f >> 2] | 0;
                if (g) {
                 d = g;
                 e = f;
                 continue
                }
                f = d + 16 | 0;
                g = c[f >> 2] | 0;
                if (!g) break;
                else {
                 d = g;
                 e = f
                }
               }
               if (e >>> 0 < a >>> 0) bb();
               else {
                c[e >> 2] = 0;
                J = d;
                break
               }
              } else {
               f = c[w + ((k | 8) + p) >> 2] | 0;
               if (f >>> 0 < a >>> 0) bb();
               a = f + 12 | 0;
               if ((c[a >> 2] | 0) != (b | 0)) bb();
               d = e + 8 | 0;
               if ((c[d >> 2] | 0) == (b | 0)) {
                c[a >> 2] = e;
                c[d >> 2] = f;
                J = e;
                break
               } else bb()
              }
             while (0);
             if (!h) break;
             a = c[w + (p + 28 + k) >> 2] | 0;
             d = 7576 + (a << 2) | 0;
             do
              if ((b | 0) != (c[d >> 2] | 0)) {
               if (h >>> 0 < (c[1822] | 0) >>> 0) bb();
               a = h + 16 | 0;
               if ((c[a >> 2] | 0) == (b | 0)) c[a >> 2] = J;
               else c[h + 20 >> 2] = J;
               if (!J) break i
              } else {
               c[d >> 2] = J;
               if (J) break;
               c[1819] = c[1819] & ~(1 << a);
               break i
              }
             while (0);
             d = c[1822] | 0;
             if (J >>> 0 < d >>> 0) bb();
             c[J + 24 >> 2] = h;
             b = k | 16;
             a = c[w + (b + p) >> 2] | 0;
             do
              if (a)
               if (a >>> 0 < d >>> 0) bb();
               else {
                c[J + 16 >> 2] = a;
                c[a + 24 >> 2] = J;
                break
               }
             while (0);
             b = c[w + (i + b) >> 2] | 0;
             if (!b) break;
             if (b >>> 0 < (c[1822] | 0) >>> 0) bb();
             else {
              c[J + 20 >> 2] = b;
              c[b + 24 >> 2] = J;
              break
             }
            } else {
             e = c[w + ((k | 8) + p) >> 2] | 0;
             f = c[w + (p + 12 + k) >> 2] | 0;
             d = 7312 + (g << 1 << 2) | 0;
             do
              if ((e | 0) != (d | 0)) {
               if (e >>> 0 < a >>> 0) bb();
               if ((c[e + 12 >> 2] | 0) == (b | 0)) break;
               bb()
              }
             while (0);
             if ((f | 0) == (e | 0)) {
              c[1818] = c[1818] & ~(1 << g);
              break
             }
             do
              if ((f | 0) == (d | 0)) F = f + 8 | 0;
              else {
               if (f >>> 0 < a >>> 0) bb();
               a = f + 8 | 0;
               if ((c[a >> 2] | 0) == (b | 0)) {
                F = a;
                break
               }
               bb()
              }
             while (0);
             c[e + 12 >> 2] = f;
             c[F >> 2] = e
            }
           while (0);
           b = w + ((j | k) + p) | 0;
           f = j + l | 0
          } else f = l;
          b = b + 4 | 0;
          c[b >> 2] = c[b >> 2] & -2;
          c[w + (m + 4) >> 2] = f | 1;
          c[w + (f + m) >> 2] = f;
          b = f >>> 3;
          if (f >>> 0 < 256) {
           a = b << 1;
           e = 7312 + (a << 2) | 0;
           d = c[1818] | 0;
           b = 1 << b;
           do
            if (!(d & b)) {
             c[1818] = d | b;
             K = 7312 + (a + 2 << 2) | 0;
             L = e
            } else {
             b = 7312 + (a + 2 << 2) | 0;
             a = c[b >> 2] | 0;
             if (a >>> 0 >= (c[1822] | 0) >>> 0) {
              K = b;
              L = a;
              break
             }
             bb()
            }
           while (0);
           c[K >> 2] = o;
           c[L + 12 >> 2] = o;
           c[w + (m + 8) >> 2] = L;
           c[w + (m + 12) >> 2] = e;
           break
          }
          b = f >>> 8;
          do
           if (!b) e = 0;
           else {
            if (f >>> 0 > 16777215) {
             e = 31;
             break
            }
            K = (b + 1048320 | 0) >>> 16 & 8;
            L = b << K;
            J = (L + 520192 | 0) >>> 16 & 4;
            L = L << J;
            e = (L + 245760 | 0) >>> 16 & 2;
            e = 14 - (J | K | e) + (L << e >>> 15) | 0;
            e = f >>> (e + 7 | 0) & 1 | e << 1
           }
          while (0);
          b = 7576 + (e << 2) | 0;
          c[w + (m + 28) >> 2] = e;
          c[w + (m + 20) >> 2] = 0;
          c[w + (m + 16) >> 2] = 0;
          a = c[1819] | 0;
          d = 1 << e;
          if (!(a & d)) {
           c[1819] = a | d;
           c[b >> 2] = o;
           c[w + (m + 24) >> 2] = b;
           c[w + (m + 12) >> 2] = o;
           c[w + (m + 8) >> 2] = o;
           break
          }
          b = c[b >> 2] | 0;
          j: do
           if ((c[b + 4 >> 2] & -8 | 0) != (f | 0)) {
            e = f << ((e | 0) == 31 ? 0 : 25 - (e >>> 1) | 0);
            while (1) {
             a = b + 16 + (e >>> 31 << 2) | 0;
             d = c[a >> 2] | 0;
             if (!d) break;
             if ((c[d + 4 >> 2] & -8 | 0) == (f | 0)) {
              M = d;
              break j
             } else {
              e = e << 1;
              b = d
             }
            }
            if (a >>> 0 < (c[1822] | 0) >>> 0) bb();
            else {
             c[a >> 2] = o;
             c[w + (m + 24) >> 2] = b;
             c[w + (m + 12) >> 2] = o;
             c[w + (m + 8) >> 2] = o;
             break h
            }
           } else M = b;
          while (0);
          b = M + 8 | 0;
          a = c[b >> 2] | 0;
          L = c[1822] | 0;
          if (a >>> 0 >= L >>> 0 & M >>> 0 >= L >>> 0) {
           c[a + 12 >> 2] = o;
           c[b >> 2] = o;
           c[w + (m + 8) >> 2] = a;
           c[w + (m + 12) >> 2] = M;
           c[w + (m + 24) >> 2] = 0;
           break
          } else bb()
         } else {
          M = (c[1821] | 0) + l | 0;
          c[1821] = M;
          c[1824] = o;
          c[w + (m + 4) >> 2] = M | 1
         }
        while (0);
        M = w + (n | 8) | 0;
        return M | 0
       } else d = 7720;
      while (1) {
       a = c[d >> 2] | 0;
       if (a >>> 0 <= h >>> 0 ? (b = c[d + 4 >> 2] | 0, e = a + b | 0, e >>> 0 > h >>> 0) : 0) break;
       d = c[d + 8 >> 2] | 0
      }
      f = a + (b + -39) | 0;
      a = a + (b + -47 + ((f & 7 | 0) == 0 ? 0 : 0 - f & 7)) | 0;
      f = h + 16 | 0;
      a = a >>> 0 < f >>> 0 ? h : a;
      b = a + 8 | 0;
      d = w + 8 | 0;
      d = (d & 7 | 0) == 0 ? 0 : 0 - d & 7;
      M = p + -40 - d | 0;
      c[1824] = w + d;
      c[1821] = M;
      c[w + (d + 4) >> 2] = M | 1;
      c[w + (p + -36) >> 2] = 40;
      c[1825] = c[1940];
      d = a + 4 | 0;
      c[d >> 2] = 27;
      c[b >> 2] = c[1930];
      c[b + 4 >> 2] = c[1931];
      c[b + 8 >> 2] = c[1932];
      c[b + 12 >> 2] = c[1933];
      c[1930] = w;
      c[1931] = p;
      c[1933] = 0;
      c[1932] = b;
      b = a + 28 | 0;
      c[b >> 2] = 7;
      if ((a + 32 | 0) >>> 0 < e >>> 0)
       do {
        M = b;
        b = b + 4 | 0;
        c[b >> 2] = 7
       } while ((M + 8 | 0) >>> 0 < e >>> 0);
      if ((a | 0) != (h | 0)) {
       g = a - h | 0;
       c[d >> 2] = c[d >> 2] & -2;
       c[h + 4 >> 2] = g | 1;
       c[a >> 2] = g;
       b = g >>> 3;
       if (g >>> 0 < 256) {
        a = b << 1;
        e = 7312 + (a << 2) | 0;
        d = c[1818] | 0;
        b = 1 << b;
        if (d & b) {
         b = 7312 + (a + 2 << 2) | 0;
         a = c[b >> 2] | 0;
         if (a >>> 0 < (c[1822] | 0) >>> 0) bb();
         else {
          G = b;
          H = a
         }
        } else {
         c[1818] = d | b;
         G = 7312 + (a + 2 << 2) | 0;
         H = e
        }
        c[G >> 2] = h;
        c[H + 12 >> 2] = h;
        c[h + 8 >> 2] = H;
        c[h + 12 >> 2] = e;
        break
       }
       b = g >>> 8;
       if (b)
        if (g >>> 0 > 16777215) e = 31;
        else {
         L = (b + 1048320 | 0) >>> 16 & 8;
         M = b << L;
         K = (M + 520192 | 0) >>> 16 & 4;
         M = M << K;
         e = (M + 245760 | 0) >>> 16 & 2;
         e = 14 - (K | L | e) + (M << e >>> 15) | 0;
         e = g >>> (e + 7 | 0) & 1 | e << 1
        } else e = 0;
       d = 7576 + (e << 2) | 0;
       c[h + 28 >> 2] = e;
       c[h + 20 >> 2] = 0;
       c[f >> 2] = 0;
       b = c[1819] | 0;
       a = 1 << e;
       if (!(b & a)) {
        c[1819] = b | a;
        c[d >> 2] = h;
        c[h + 24 >> 2] = d;
        c[h + 12 >> 2] = h;
        c[h + 8 >> 2] = h;
        break
       }
       b = c[d >> 2] | 0;
       k: do
        if ((c[b + 4 >> 2] & -8 | 0) != (g | 0)) {
         e = g << ((e | 0) == 31 ? 0 : 25 - (e >>> 1) | 0);
         while (1) {
          a = b + 16 + (e >>> 31 << 2) | 0;
          d = c[a >> 2] | 0;
          if (!d) break;
          if ((c[d + 4 >> 2] & -8 | 0) == (g | 0)) {
           I = d;
           break k
          } else {
           e = e << 1;
           b = d
          }
         }
         if (a >>> 0 < (c[1822] | 0) >>> 0) bb();
         else {
          c[a >> 2] = h;
          c[h + 24 >> 2] = b;
          c[h + 12 >> 2] = h;
          c[h + 8 >> 2] = h;
          break g
         }
        } else I = b;
       while (0);
       b = I + 8 | 0;
       a = c[b >> 2] | 0;
       M = c[1822] | 0;
       if (a >>> 0 >= M >>> 0 & I >>> 0 >= M >>> 0) {
        c[a + 12 >> 2] = h;
        c[b >> 2] = h;
        c[h + 8 >> 2] = a;
        c[h + 12 >> 2] = I;
        c[h + 24 >> 2] = 0;
        break
       } else bb()
      }
     } else {
      M = c[1822] | 0;
      if ((M | 0) == 0 | w >>> 0 < M >>> 0) c[1822] = w;
      c[1930] = w;
      c[1931] = p;
      c[1933] = 0;
      c[1827] = c[1936];
      c[1826] = -1;
      b = 0;
      do {
       M = b << 1;
       L = 7312 + (M << 2) | 0;
       c[7312 + (M + 3 << 2) >> 2] = L;
       c[7312 + (M + 2 << 2) >> 2] = L;
       b = b + 1 | 0
      } while ((b | 0) != 32);
      M = w + 8 | 0;
      M = (M & 7 | 0) == 0 ? 0 : 0 - M & 7;
      L = p + -40 - M | 0;
      c[1824] = w + M;
      c[1821] = L;
      c[w + (M + 4) >> 2] = L | 1;
      c[w + (p + -36) >> 2] = 40;
      c[1825] = c[1940]
     }
    while (0);
    b = c[1821] | 0;
    if (b >>> 0 > q >>> 0) {
     L = b - q | 0;
     c[1821] = L;
     M = c[1824] | 0;
     c[1824] = M + q;
     c[M + (q + 4) >> 2] = L | 1;
     c[M + 4 >> 2] = q | 3;
     M = M + 8 | 0;
     return M | 0
    }
   }
   c[(Zh() | 0) >> 2] = 12;
   M = 0;
   return M | 0
  }

  function kj(a) {
   a = a | 0;
   var b = 0,
    d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0;
   if (!a) return;
   b = a + -8 | 0;
   i = c[1822] | 0;
   if (b >>> 0 < i >>> 0) bb();
   d = c[a + -4 >> 2] | 0;
   e = d & 3;
   if ((e | 0) == 1) bb();
   o = d & -8;
   q = a + (o + -8) | 0;
   do
    if (!(d & 1)) {
     b = c[b >> 2] | 0;
     if (!e) return;
     j = -8 - b | 0;
     l = a + j | 0;
     m = b + o | 0;
     if (l >>> 0 < i >>> 0) bb();
     if ((l | 0) == (c[1823] | 0)) {
      b = a + (o + -4) | 0;
      d = c[b >> 2] | 0;
      if ((d & 3 | 0) != 3) {
       u = l;
       g = m;
       break
      }
      c[1820] = m;
      c[b >> 2] = d & -2;
      c[a + (j + 4) >> 2] = m | 1;
      c[q >> 2] = m;
      return
     }
     f = b >>> 3;
     if (b >>> 0 < 256) {
      e = c[a + (j + 8) >> 2] | 0;
      d = c[a + (j + 12) >> 2] | 0;
      b = 7312 + (f << 1 << 2) | 0;
      if ((e | 0) != (b | 0)) {
       if (e >>> 0 < i >>> 0) bb();
       if ((c[e + 12 >> 2] | 0) != (l | 0)) bb()
      }
      if ((d | 0) == (e | 0)) {
       c[1818] = c[1818] & ~(1 << f);
       u = l;
       g = m;
       break
      }
      if ((d | 0) != (b | 0)) {
       if (d >>> 0 < i >>> 0) bb();
       b = d + 8 | 0;
       if ((c[b >> 2] | 0) == (l | 0)) h = b;
       else bb()
      } else h = d + 8 | 0;
      c[e + 12 >> 2] = d;
      c[h >> 2] = e;
      u = l;
      g = m;
      break
     }
     h = c[a + (j + 24) >> 2] | 0;
     e = c[a + (j + 12) >> 2] | 0;
     do
      if ((e | 0) == (l | 0)) {
       d = a + (j + 20) | 0;
       b = c[d >> 2] | 0;
       if (!b) {
        d = a + (j + 16) | 0;
        b = c[d >> 2] | 0;
        if (!b) {
         k = 0;
         break
        }
       }
       while (1) {
        e = b + 20 | 0;
        f = c[e >> 2] | 0;
        if (f) {
         b = f;
         d = e;
         continue
        }
        e = b + 16 | 0;
        f = c[e >> 2] | 0;
        if (!f) break;
        else {
         b = f;
         d = e
        }
       }
       if (d >>> 0 < i >>> 0) bb();
       else {
        c[d >> 2] = 0;
        k = b;
        break
       }
      } else {
       f = c[a + (j + 8) >> 2] | 0;
       if (f >>> 0 < i >>> 0) bb();
       b = f + 12 | 0;
       if ((c[b >> 2] | 0) != (l | 0)) bb();
       d = e + 8 | 0;
       if ((c[d >> 2] | 0) == (l | 0)) {
        c[b >> 2] = e;
        c[d >> 2] = f;
        k = e;
        break
       } else bb()
      }
     while (0);
     if (h) {
      b = c[a + (j + 28) >> 2] | 0;
      d = 7576 + (b << 2) | 0;
      if ((l | 0) == (c[d >> 2] | 0)) {
       c[d >> 2] = k;
       if (!k) {
        c[1819] = c[1819] & ~(1 << b);
        u = l;
        g = m;
        break
       }
      } else {
       if (h >>> 0 < (c[1822] | 0) >>> 0) bb();
       b = h + 16 | 0;
       if ((c[b >> 2] | 0) == (l | 0)) c[b >> 2] = k;
       else c[h + 20 >> 2] = k;
       if (!k) {
        u = l;
        g = m;
        break
       }
      }
      d = c[1822] | 0;
      if (k >>> 0 < d >>> 0) bb();
      c[k + 24 >> 2] = h;
      b = c[a + (j + 16) >> 2] | 0;
      do
       if (b)
        if (b >>> 0 < d >>> 0) bb();
        else {
         c[k + 16 >> 2] = b;
         c[b + 24 >> 2] = k;
         break
        }
      while (0);
      b = c[a + (j + 20) >> 2] | 0;
      if (b)
       if (b >>> 0 < (c[1822] | 0) >>> 0) bb();
       else {
        c[k + 20 >> 2] = b;
        c[b + 24 >> 2] = k;
        u = l;
        g = m;
        break
       } else {
       u = l;
       g = m
      }
     } else {
      u = l;
      g = m
     }
    } else {
     u = b;
     g = o
    }
   while (0);
   if (u >>> 0 >= q >>> 0) bb();
   b = a + (o + -4) | 0;
   d = c[b >> 2] | 0;
   if (!(d & 1)) bb();
   if (!(d & 2)) {
    if ((q | 0) == (c[1824] | 0)) {
     t = (c[1821] | 0) + g | 0;
     c[1821] = t;
     c[1824] = u;
     c[u + 4 >> 2] = t | 1;
     if ((u | 0) != (c[1823] | 0)) return;
     c[1823] = 0;
     c[1820] = 0;
     return
    }
    if ((q | 0) == (c[1823] | 0)) {
     t = (c[1820] | 0) + g | 0;
     c[1820] = t;
     c[1823] = u;
     c[u + 4 >> 2] = t | 1;
     c[u + t >> 2] = t;
     return
    }
    g = (d & -8) + g | 0;
    f = d >>> 3;
    do
     if (d >>> 0 >= 256) {
      h = c[a + (o + 16) >> 2] | 0;
      b = c[a + (o | 4) >> 2] | 0;
      do
       if ((b | 0) == (q | 0)) {
        d = a + (o + 12) | 0;
        b = c[d >> 2] | 0;
        if (!b) {
         d = a + (o + 8) | 0;
         b = c[d >> 2] | 0;
         if (!b) {
          p = 0;
          break
         }
        }
        while (1) {
         e = b + 20 | 0;
         f = c[e >> 2] | 0;
         if (f) {
          b = f;
          d = e;
          continue
         }
         e = b + 16 | 0;
         f = c[e >> 2] | 0;
         if (!f) break;
         else {
          b = f;
          d = e
         }
        }
        if (d >>> 0 < (c[1822] | 0) >>> 0) bb();
        else {
         c[d >> 2] = 0;
         p = b;
         break
        }
       } else {
        d = c[a + o >> 2] | 0;
        if (d >>> 0 < (c[1822] | 0) >>> 0) bb();
        e = d + 12 | 0;
        if ((c[e >> 2] | 0) != (q | 0)) bb();
        f = b + 8 | 0;
        if ((c[f >> 2] | 0) == (q | 0)) {
         c[e >> 2] = b;
         c[f >> 2] = d;
         p = b;
         break
        } else bb()
       }
      while (0);
      if (h) {
       b = c[a + (o + 20) >> 2] | 0;
       d = 7576 + (b << 2) | 0;
       if ((q | 0) == (c[d >> 2] | 0)) {
        c[d >> 2] = p;
        if (!p) {
         c[1819] = c[1819] & ~(1 << b);
         break
        }
       } else {
        if (h >>> 0 < (c[1822] | 0) >>> 0) bb();
        b = h + 16 | 0;
        if ((c[b >> 2] | 0) == (q | 0)) c[b >> 2] = p;
        else c[h + 20 >> 2] = p;
        if (!p) break
       }
       d = c[1822] | 0;
       if (p >>> 0 < d >>> 0) bb();
       c[p + 24 >> 2] = h;
       b = c[a + (o + 8) >> 2] | 0;
       do
        if (b)
         if (b >>> 0 < d >>> 0) bb();
         else {
          c[p + 16 >> 2] = b;
          c[b + 24 >> 2] = p;
          break
         }
       while (0);
       b = c[a + (o + 12) >> 2] | 0;
       if (b)
        if (b >>> 0 < (c[1822] | 0) >>> 0) bb();
        else {
         c[p + 20 >> 2] = b;
         c[b + 24 >> 2] = p;
         break
        }
      }
     } else {
      e = c[a + o >> 2] | 0;
      d = c[a + (o | 4) >> 2] | 0;
      b = 7312 + (f << 1 << 2) | 0;
      if ((e | 0) != (b | 0)) {
       if (e >>> 0 < (c[1822] | 0) >>> 0) bb();
       if ((c[e + 12 >> 2] | 0) != (q | 0)) bb()
      }
      if ((d | 0) == (e | 0)) {
       c[1818] = c[1818] & ~(1 << f);
       break
      }
      if ((d | 0) != (b | 0)) {
       if (d >>> 0 < (c[1822] | 0) >>> 0) bb();
       b = d + 8 | 0;
       if ((c[b >> 2] | 0) == (q | 0)) n = b;
       else bb()
      } else n = d + 8 | 0;
      c[e + 12 >> 2] = d;
      c[n >> 2] = e
     }
    while (0);
    c[u + 4 >> 2] = g | 1;
    c[u + g >> 2] = g;
    if ((u | 0) == (c[1823] | 0)) {
     c[1820] = g;
     return
    }
   } else {
    c[b >> 2] = d & -2;
    c[u + 4 >> 2] = g | 1;
    c[u + g >> 2] = g
   }
   b = g >>> 3;
   if (g >>> 0 < 256) {
    d = b << 1;
    f = 7312 + (d << 2) | 0;
    e = c[1818] | 0;
    b = 1 << b;
    if (e & b) {
     b = 7312 + (d + 2 << 2) | 0;
     d = c[b >> 2] | 0;
     if (d >>> 0 < (c[1822] | 0) >>> 0) bb();
     else {
      r = b;
      s = d
     }
    } else {
     c[1818] = e | b;
     r = 7312 + (d + 2 << 2) | 0;
     s = f
    }
    c[r >> 2] = u;
    c[s + 12 >> 2] = u;
    c[u + 8 >> 2] = s;
    c[u + 12 >> 2] = f;
    return
   }
   b = g >>> 8;
   if (b)
    if (g >>> 0 > 16777215) f = 31;
    else {
     r = (b + 1048320 | 0) >>> 16 & 8;
     s = b << r;
     q = (s + 520192 | 0) >>> 16 & 4;
     s = s << q;
     f = (s + 245760 | 0) >>> 16 & 2;
     f = 14 - (q | r | f) + (s << f >>> 15) | 0;
     f = g >>> (f + 7 | 0) & 1 | f << 1
    } else f = 0;
   b = 7576 + (f << 2) | 0;
   c[u + 28 >> 2] = f;
   c[u + 20 >> 2] = 0;
   c[u + 16 >> 2] = 0;
   d = c[1819] | 0;
   e = 1 << f;
   a: do
    if (d & e) {
     b = c[b >> 2] | 0;
     b: do
      if ((c[b + 4 >> 2] & -8 | 0) != (g | 0)) {
       f = g << ((f | 0) == 31 ? 0 : 25 - (f >>> 1) | 0);
       while (1) {
        d = b + 16 + (f >>> 31 << 2) | 0;
        e = c[d >> 2] | 0;
        if (!e) break;
        if ((c[e + 4 >> 2] & -8 | 0) == (g | 0)) {
         t = e;
         break b
        } else {
         f = f << 1;
         b = e
        }
       }
       if (d >>> 0 < (c[1822] | 0) >>> 0) bb();
       else {
        c[d >> 2] = u;
        c[u + 24 >> 2] = b;
        c[u + 12 >> 2] = u;
        c[u + 8 >> 2] = u;
        break a
       }
      } else t = b;
     while (0);
     b = t + 8 | 0;
     d = c[b >> 2] | 0;
     s = c[1822] | 0;
     if (d >>> 0 >= s >>> 0 & t >>> 0 >= s >>> 0) {
      c[d + 12 >> 2] = u;
      c[b >> 2] = u;
      c[u + 8 >> 2] = d;
      c[u + 12 >> 2] = t;
      c[u + 24 >> 2] = 0;
      break
     } else bb()
    } else {
     c[1819] = d | e;
     c[b >> 2] = u;
     c[u + 24 >> 2] = b;
     c[u + 12 >> 2] = u;
     c[u + 8 >> 2] = u
    }
   while (0);
   u = (c[1826] | 0) + -1 | 0;
   c[1826] = u;
   if (!u) b = 7728;
   else return;
   while (1) {
    b = c[b >> 2] | 0;
    if (!b) break;
    else b = b + 8 | 0
   }
   c[1826] = -1;
   return
  }

  function lj(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0;
   if (a) {
    d = _(b, a) | 0;
    if ((b | a) >>> 0 > 65535) d = ((d >>> 0) / (a >>> 0) | 0 | 0) == (b | 0) ? d : -1
   } else d = 0;
   b = jj(d) | 0;
   if (!b) return b | 0;
   if (!(c[b + -4 >> 2] & 3)) return b | 0;
   ks(b | 0, 0, d | 0) | 0;
   return b | 0
  }

  function mj(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0;
   if (!a) {
    a = jj(b) | 0;
    return a | 0
   }
   if (b >>> 0 > 4294967231) {
    c[(Zh() | 0) >> 2] = 12;
    a = 0;
    return a | 0
   }
   d = nj(a + -8 | 0, b >>> 0 < 11 ? 16 : b + 11 & -8) | 0;
   if (d) {
    a = d + 8 | 0;
    return a | 0
   }
   d = jj(b) | 0;
   if (!d) {
    a = 0;
    return a | 0
   }
   e = c[a + -4 >> 2] | 0;
   e = (e & -8) - ((e & 3 | 0) == 0 ? 8 : 4) | 0;
   ns(d | 0, a | 0, (e >>> 0 < b >>> 0 ? e : b) | 0) | 0;
   kj(a);
   a = d;
   return a | 0
  }

  function nj(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0;
   o = a + 4 | 0;
   p = c[o >> 2] | 0;
   j = p & -8;
   l = a + j | 0;
   i = c[1822] | 0;
   d = p & 3;
   if (!((d | 0) != 1 & a >>> 0 >= i >>> 0 & a >>> 0 < l >>> 0)) bb();
   e = a + (j | 4) | 0;
   f = c[e >> 2] | 0;
   if (!(f & 1)) bb();
   if (!d) {
    if (b >>> 0 < 256) {
     a = 0;
     return a | 0
    }
    if (j >>> 0 >= (b + 4 | 0) >>> 0 ? (j - b | 0) >>> 0 <= c[1938] << 1 >>> 0 : 0) return a | 0;
    a = 0;
    return a | 0
   }
   if (j >>> 0 >= b >>> 0) {
    d = j - b | 0;
    if (d >>> 0 <= 15) return a | 0;
    c[o >> 2] = p & 1 | b | 2;
    c[a + (b + 4) >> 2] = d | 3;
    c[e >> 2] = c[e >> 2] | 1;
    oj(a + b | 0, d);
    return a | 0
   }
   if ((l | 0) == (c[1824] | 0)) {
    d = (c[1821] | 0) + j | 0;
    if (d >>> 0 <= b >>> 0) {
     a = 0;
     return a | 0
    }
    n = d - b | 0;
    c[o >> 2] = p & 1 | b | 2;
    c[a + (b + 4) >> 2] = n | 1;
    c[1824] = a + b;
    c[1821] = n;
    return a | 0
   }
   if ((l | 0) == (c[1823] | 0)) {
    e = (c[1820] | 0) + j | 0;
    if (e >>> 0 < b >>> 0) {
     a = 0;
     return a | 0
    }
    d = e - b | 0;
    if (d >>> 0 > 15) {
     c[o >> 2] = p & 1 | b | 2;
     c[a + (b + 4) >> 2] = d | 1;
     c[a + e >> 2] = d;
     e = a + (e + 4) | 0;
     c[e >> 2] = c[e >> 2] & -2;
     e = a + b | 0
    } else {
     c[o >> 2] = p & 1 | e | 2;
     e = a + (e + 4) | 0;
     c[e >> 2] = c[e >> 2] | 1;
     e = 0;
     d = 0
    }
    c[1820] = d;
    c[1823] = e;
    return a | 0
   }
   if (f & 2) {
    a = 0;
    return a | 0
   }
   m = (f & -8) + j | 0;
   if (m >>> 0 < b >>> 0) {
    a = 0;
    return a | 0
   }
   n = m - b | 0;
   g = f >>> 3;
   do
    if (f >>> 0 >= 256) {
     h = c[a + (j + 24) >> 2] | 0;
     g = c[a + (j + 12) >> 2] | 0;
     do
      if ((g | 0) == (l | 0)) {
       e = a + (j + 20) | 0;
       d = c[e >> 2] | 0;
       if (!d) {
        e = a + (j + 16) | 0;
        d = c[e >> 2] | 0;
        if (!d) {
         k = 0;
         break
        }
       }
       while (1) {
        f = d + 20 | 0;
        g = c[f >> 2] | 0;
        if (g) {
         d = g;
         e = f;
         continue
        }
        f = d + 16 | 0;
        g = c[f >> 2] | 0;
        if (!g) break;
        else {
         d = g;
         e = f
        }
       }
       if (e >>> 0 < i >>> 0) bb();
       else {
        c[e >> 2] = 0;
        k = d;
        break
       }
      } else {
       f = c[a + (j + 8) >> 2] | 0;
       if (f >>> 0 < i >>> 0) bb();
       d = f + 12 | 0;
       if ((c[d >> 2] | 0) != (l | 0)) bb();
       e = g + 8 | 0;
       if ((c[e >> 2] | 0) == (l | 0)) {
        c[d >> 2] = g;
        c[e >> 2] = f;
        k = g;
        break
       } else bb()
      }
     while (0);
     if (h) {
      d = c[a + (j + 28) >> 2] | 0;
      e = 7576 + (d << 2) | 0;
      if ((l | 0) == (c[e >> 2] | 0)) {
       c[e >> 2] = k;
       if (!k) {
        c[1819] = c[1819] & ~(1 << d);
        break
       }
      } else {
       if (h >>> 0 < (c[1822] | 0) >>> 0) bb();
       d = h + 16 | 0;
       if ((c[d >> 2] | 0) == (l | 0)) c[d >> 2] = k;
       else c[h + 20 >> 2] = k;
       if (!k) break
      }
      e = c[1822] | 0;
      if (k >>> 0 < e >>> 0) bb();
      c[k + 24 >> 2] = h;
      d = c[a + (j + 16) >> 2] | 0;
      do
       if (d)
        if (d >>> 0 < e >>> 0) bb();
        else {
         c[k + 16 >> 2] = d;
         c[d + 24 >> 2] = k;
         break
        }
      while (0);
      d = c[a + (j + 20) >> 2] | 0;
      if (d)
       if (d >>> 0 < (c[1822] | 0) >>> 0) bb();
       else {
        c[k + 20 >> 2] = d;
        c[d + 24 >> 2] = k;
        break
       }
     }
    } else {
     f = c[a + (j + 8) >> 2] | 0;
     e = c[a + (j + 12) >> 2] | 0;
     d = 7312 + (g << 1 << 2) | 0;
     if ((f | 0) != (d | 0)) {
      if (f >>> 0 < i >>> 0) bb();
      if ((c[f + 12 >> 2] | 0) != (l | 0)) bb()
     }
     if ((e | 0) == (f | 0)) {
      c[1818] = c[1818] & ~(1 << g);
      break
     }
     if ((e | 0) != (d | 0)) {
      if (e >>> 0 < i >>> 0) bb();
      d = e + 8 | 0;
      if ((c[d >> 2] | 0) == (l | 0)) h = d;
      else bb()
     } else h = e + 8 | 0;
     c[f + 12 >> 2] = e;
     c[h >> 2] = f
    }
   while (0);
   if (n >>> 0 < 16) {
    c[o >> 2] = m | p & 1 | 2;
    b = a + (m | 4) | 0;
    c[b >> 2] = c[b >> 2] | 1;
    return a | 0
   } else {
    c[o >> 2] = p & 1 | b | 2;
    c[a + (b + 4) >> 2] = n | 3;
    p = a + (m | 4) | 0;
    c[p >> 2] = c[p >> 2] | 1;
    oj(a + b | 0, n);
    return a | 0
   }
   return 0
  }

  function oj(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0;
   q = a + b | 0;
   d = c[a + 4 >> 2] | 0;
   do
    if (!(d & 1)) {
     k = c[a >> 2] | 0;
     if (!(d & 3)) return;
     n = a + (0 - k) | 0;
     m = k + b | 0;
     j = c[1822] | 0;
     if (n >>> 0 < j >>> 0) bb();
     if ((n | 0) == (c[1823] | 0)) {
      e = a + (b + 4) | 0;
      d = c[e >> 2] | 0;
      if ((d & 3 | 0) != 3) {
       t = n;
       h = m;
       break
      }
      c[1820] = m;
      c[e >> 2] = d & -2;
      c[a + (4 - k) >> 2] = m | 1;
      c[q >> 2] = m;
      return
     }
     g = k >>> 3;
     if (k >>> 0 < 256) {
      f = c[a + (8 - k) >> 2] | 0;
      e = c[a + (12 - k) >> 2] | 0;
      d = 7312 + (g << 1 << 2) | 0;
      if ((f | 0) != (d | 0)) {
       if (f >>> 0 < j >>> 0) bb();
       if ((c[f + 12 >> 2] | 0) != (n | 0)) bb()
      }
      if ((e | 0) == (f | 0)) {
       c[1818] = c[1818] & ~(1 << g);
       t = n;
       h = m;
       break
      }
      if ((e | 0) != (d | 0)) {
       if (e >>> 0 < j >>> 0) bb();
       d = e + 8 | 0;
       if ((c[d >> 2] | 0) == (n | 0)) i = d;
       else bb()
      } else i = e + 8 | 0;
      c[f + 12 >> 2] = e;
      c[i >> 2] = f;
      t = n;
      h = m;
      break
     }
     i = c[a + (24 - k) >> 2] | 0;
     f = c[a + (12 - k) >> 2] | 0;
     do
      if ((f | 0) == (n | 0)) {
       f = 16 - k | 0;
       e = a + (f + 4) | 0;
       d = c[e >> 2] | 0;
       if (!d) {
        e = a + f | 0;
        d = c[e >> 2] | 0;
        if (!d) {
         l = 0;
         break
        }
       }
       while (1) {
        f = d + 20 | 0;
        g = c[f >> 2] | 0;
        if (g) {
         d = g;
         e = f;
         continue
        }
        f = d + 16 | 0;
        g = c[f >> 2] | 0;
        if (!g) break;
        else {
         d = g;
         e = f
        }
       }
       if (e >>> 0 < j >>> 0) bb();
       else {
        c[e >> 2] = 0;
        l = d;
        break
       }
      } else {
       g = c[a + (8 - k) >> 2] | 0;
       if (g >>> 0 < j >>> 0) bb();
       d = g + 12 | 0;
       if ((c[d >> 2] | 0) != (n | 0)) bb();
       e = f + 8 | 0;
       if ((c[e >> 2] | 0) == (n | 0)) {
        c[d >> 2] = f;
        c[e >> 2] = g;
        l = f;
        break
       } else bb()
      }
     while (0);
     if (i) {
      d = c[a + (28 - k) >> 2] | 0;
      e = 7576 + (d << 2) | 0;
      if ((n | 0) == (c[e >> 2] | 0)) {
       c[e >> 2] = l;
       if (!l) {
        c[1819] = c[1819] & ~(1 << d);
        t = n;
        h = m;
        break
       }
      } else {
       if (i >>> 0 < (c[1822] | 0) >>> 0) bb();
       d = i + 16 | 0;
       if ((c[d >> 2] | 0) == (n | 0)) c[d >> 2] = l;
       else c[i + 20 >> 2] = l;
       if (!l) {
        t = n;
        h = m;
        break
       }
      }
      f = c[1822] | 0;
      if (l >>> 0 < f >>> 0) bb();
      c[l + 24 >> 2] = i;
      d = 16 - k | 0;
      e = c[a + d >> 2] | 0;
      do
       if (e)
        if (e >>> 0 < f >>> 0) bb();
        else {
         c[l + 16 >> 2] = e;
         c[e + 24 >> 2] = l;
         break
        }
      while (0);
      d = c[a + (d + 4) >> 2] | 0;
      if (d)
       if (d >>> 0 < (c[1822] | 0) >>> 0) bb();
       else {
        c[l + 20 >> 2] = d;
        c[d + 24 >> 2] = l;
        t = n;
        h = m;
        break
       } else {
       t = n;
       h = m
      }
     } else {
      t = n;
      h = m
     }
    } else {
     t = a;
     h = b
    }
   while (0);
   j = c[1822] | 0;
   if (q >>> 0 < j >>> 0) bb();
   d = a + (b + 4) | 0;
   e = c[d >> 2] | 0;
   if (!(e & 2)) {
    if ((q | 0) == (c[1824] | 0)) {
     s = (c[1821] | 0) + h | 0;
     c[1821] = s;
     c[1824] = t;
     c[t + 4 >> 2] = s | 1;
     if ((t | 0) != (c[1823] | 0)) return;
     c[1823] = 0;
     c[1820] = 0;
     return
    }
    if ((q | 0) == (c[1823] | 0)) {
     s = (c[1820] | 0) + h | 0;
     c[1820] = s;
     c[1823] = t;
     c[t + 4 >> 2] = s | 1;
     c[t + s >> 2] = s;
     return
    }
    h = (e & -8) + h | 0;
    g = e >>> 3;
    do
     if (e >>> 0 >= 256) {
      i = c[a + (b + 24) >> 2] | 0;
      f = c[a + (b + 12) >> 2] | 0;
      do
       if ((f | 0) == (q | 0)) {
        e = a + (b + 20) | 0;
        d = c[e >> 2] | 0;
        if (!d) {
         e = a + (b + 16) | 0;
         d = c[e >> 2] | 0;
         if (!d) {
          p = 0;
          break
         }
        }
        while (1) {
         f = d + 20 | 0;
         g = c[f >> 2] | 0;
         if (g) {
          d = g;
          e = f;
          continue
         }
         f = d + 16 | 0;
         g = c[f >> 2] | 0;
         if (!g) break;
         else {
          d = g;
          e = f
         }
        }
        if (e >>> 0 < j >>> 0) bb();
        else {
         c[e >> 2] = 0;
         p = d;
         break
        }
       } else {
        g = c[a + (b + 8) >> 2] | 0;
        if (g >>> 0 < j >>> 0) bb();
        d = g + 12 | 0;
        if ((c[d >> 2] | 0) != (q | 0)) bb();
        e = f + 8 | 0;
        if ((c[e >> 2] | 0) == (q | 0)) {
         c[d >> 2] = f;
         c[e >> 2] = g;
         p = f;
         break
        } else bb()
       }
      while (0);
      if (i) {
       d = c[a + (b + 28) >> 2] | 0;
       e = 7576 + (d << 2) | 0;
       if ((q | 0) == (c[e >> 2] | 0)) {
        c[e >> 2] = p;
        if (!p) {
         c[1819] = c[1819] & ~(1 << d);
         break
        }
       } else {
        if (i >>> 0 < (c[1822] | 0) >>> 0) bb();
        d = i + 16 | 0;
        if ((c[d >> 2] | 0) == (q | 0)) c[d >> 2] = p;
        else c[i + 20 >> 2] = p;
        if (!p) break
       }
       e = c[1822] | 0;
       if (p >>> 0 < e >>> 0) bb();
       c[p + 24 >> 2] = i;
       d = c[a + (b + 16) >> 2] | 0;
       do
        if (d)
         if (d >>> 0 < e >>> 0) bb();
         else {
          c[p + 16 >> 2] = d;
          c[d + 24 >> 2] = p;
          break
         }
       while (0);
       d = c[a + (b + 20) >> 2] | 0;
       if (d)
        if (d >>> 0 < (c[1822] | 0) >>> 0) bb();
        else {
         c[p + 20 >> 2] = d;
         c[d + 24 >> 2] = p;
         break
        }
      }
     } else {
      f = c[a + (b + 8) >> 2] | 0;
      e = c[a + (b + 12) >> 2] | 0;
      d = 7312 + (g << 1 << 2) | 0;
      if ((f | 0) != (d | 0)) {
       if (f >>> 0 < j >>> 0) bb();
       if ((c[f + 12 >> 2] | 0) != (q | 0)) bb()
      }
      if ((e | 0) == (f | 0)) {
       c[1818] = c[1818] & ~(1 << g);
       break
      }
      if ((e | 0) != (d | 0)) {
       if (e >>> 0 < j >>> 0) bb();
       d = e + 8 | 0;
       if ((c[d >> 2] | 0) == (q | 0)) o = d;
       else bb()
      } else o = e + 8 | 0;
      c[f + 12 >> 2] = e;
      c[o >> 2] = f
     }
    while (0);
    c[t + 4 >> 2] = h | 1;
    c[t + h >> 2] = h;
    if ((t | 0) == (c[1823] | 0)) {
     c[1820] = h;
     return
    }
   } else {
    c[d >> 2] = e & -2;
    c[t + 4 >> 2] = h | 1;
    c[t + h >> 2] = h
   }
   d = h >>> 3;
   if (h >>> 0 < 256) {
    e = d << 1;
    g = 7312 + (e << 2) | 0;
    f = c[1818] | 0;
    d = 1 << d;
    if (f & d) {
     d = 7312 + (e + 2 << 2) | 0;
     e = c[d >> 2] | 0;
     if (e >>> 0 < (c[1822] | 0) >>> 0) bb();
     else {
      r = d;
      s = e
     }
    } else {
     c[1818] = f | d;
     r = 7312 + (e + 2 << 2) | 0;
     s = g
    }
    c[r >> 2] = t;
    c[s + 12 >> 2] = t;
    c[t + 8 >> 2] = s;
    c[t + 12 >> 2] = g;
    return
   }
   d = h >>> 8;
   if (d)
    if (h >>> 0 > 16777215) g = 31;
    else {
     r = (d + 1048320 | 0) >>> 16 & 8;
     s = d << r;
     q = (s + 520192 | 0) >>> 16 & 4;
     s = s << q;
     g = (s + 245760 | 0) >>> 16 & 2;
     g = 14 - (q | r | g) + (s << g >>> 15) | 0;
     g = h >>> (g + 7 | 0) & 1 | g << 1
    } else g = 0;
   d = 7576 + (g << 2) | 0;
   c[t + 28 >> 2] = g;
   c[t + 20 >> 2] = 0;
   c[t + 16 >> 2] = 0;
   e = c[1819] | 0;
   f = 1 << g;
   if (!(e & f)) {
    c[1819] = e | f;
    c[d >> 2] = t;
    c[t + 24 >> 2] = d;
    c[t + 12 >> 2] = t;
    c[t + 8 >> 2] = t;
    return
   }
   d = c[d >> 2] | 0;
   a: do
    if ((c[d + 4 >> 2] & -8 | 0) != (h | 0)) {
     g = h << ((g | 0) == 31 ? 0 : 25 - (g >>> 1) | 0);
     while (1) {
      e = d + 16 + (g >>> 31 << 2) | 0;
      f = c[e >> 2] | 0;
      if (!f) break;
      if ((c[f + 4 >> 2] & -8 | 0) == (h | 0)) {
       d = f;
       break a
      } else {
       g = g << 1;
       d = f
      }
     }
     if (e >>> 0 < (c[1822] | 0) >>> 0) bb();
     c[e >> 2] = t;
     c[t + 24 >> 2] = d;
     c[t + 12 >> 2] = t;
     c[t + 8 >> 2] = t;
     return
    }
   while (0);
   e = d + 8 | 0;
   f = c[e >> 2] | 0;
   s = c[1822] | 0;
   if (!(f >>> 0 >= s >>> 0 & d >>> 0 >= s >>> 0)) bb();
   c[f + 12 >> 2] = t;
   c[e >> 2] = t;
   c[t + 8 >> 2] = f;
   c[t + 12 >> 2] = d;
   c[t + 24 >> 2] = 0;
   return
  }

  function pj(a) {
   a = a | 0;
   var b = 0,
    d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0;
   k = i;
   i = i + 16 | 0;
   b = k + 8 | 0;
   h = k + 4 | 0;
   d = k;
   c[h >> 2] = a;
   do
    if (a >>> 0 >= 212) {
     g = (a >>> 0) / 210 | 0;
     e = g * 210 | 0;
     c[d >> 2] = a - e;
     b = (qj(7960, 8152, d, b) | 0) - 7960 >> 2;
     f = b;
     b = (c[7960 + (b << 2) >> 2] | 0) + e | 0;
     a: while (1) {
      e = 5;
      while (1) {
       if (e >>> 0 >= 47) {
        e = 211;
        j = 8;
        break
       }
       d = c[7768 + (e << 2) >> 2] | 0;
       a = (b >>> 0) / (d >>> 0) | 0;
       if (a >>> 0 < d >>> 0) {
        j = 106;
        break a
       }
       if ((b | 0) == (_(a, d) | 0)) break;
       else e = e + 1 | 0
      }
      b: do
       if ((j | 0) == 8)
        while (1) {
         j = 0;
         d = (b >>> 0) / (e >>> 0) | 0;
         if (d >>> 0 < e >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(d, e) | 0)) break b;
         d = e + 10 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 12 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 16 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 18 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 22 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 28 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 30 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 36 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 40 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 42 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 46 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 52 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 58 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 60 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 66 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 70 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 72 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 78 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 82 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 88 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 96 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 100 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 102 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 106 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 108 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 112 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 120 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 126 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 130 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 136 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 138 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 142 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 148 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 150 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 156 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 162 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 166 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 168 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 172 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 178 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 180 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 186 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 190 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 192 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 196 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 198 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break b;
         d = e + 208 | 0;
         a = (b >>> 0) / (d >>> 0) | 0;
         if (a >>> 0 < d >>> 0) {
          j = 105;
          break a
         }
         if ((b | 0) == (_(a, d) | 0)) break;
         else {
          e = e + 210 | 0;
          j = 8
         }
        }
       while (0);
      e = f + 1 | 0;
      b = (e | 0) == 48;
      e = b ? 0 : e;
      b = (b & 1) + g | 0;
      f = e;
      g = b;
      b = (c[7960 + (e << 2) >> 2] | 0) + (b * 210 | 0) | 0
     }
     if ((j | 0) == 105) {
      c[h >> 2] = b;
      break
     } else if ((j | 0) == 106) {
      c[h >> 2] = b;
      break
     }
    } else b = c[(qj(7768, 7960, h, b) | 0) >> 2] | 0;
   while (0);
   i = k;
   return b | 0
  }

  function qj(a, b, d, e) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0;
   f = c[d >> 2] | 0;
   e = a;
   d = b - a >> 2;
   a: while (1) {
    while (1) {
     if (!d) break a;
     a = (d | 0) / 2 | 0;
     if ((c[e + (a << 2) >> 2] | 0) >>> 0 < f >>> 0) break;
     else d = a
    }
    e = e + (a + 1 << 2) | 0;
    d = d + -1 - a | 0
   }
   return e | 0
  }

  function rj(b, d) {
   b = b | 0;
   d = d | 0;
   if (!(a[d >> 0] & 1)) {
    c[b >> 2] = c[d >> 2];
    c[b + 4 >> 2] = c[d + 4 >> 2];
    c[b + 8 >> 2] = c[d + 8 >> 2]
   } else sj(b, c[d + 8 >> 2] | 0, c[d + 4 >> 2] | 0);
   return
  }

  function sj(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0;
   if (e >>> 0 > 4294967279) ih(b);
   if (e >>> 0 < 11) {
    a[b >> 0] = e << 1;
    b = b + 1 | 0
   } else {
    g = e + 16 & -16;
    f = kh(g) | 0;
    c[b + 8 >> 2] = f;
    c[b >> 2] = g | 1;
    c[b + 4 >> 2] = e;
    b = f
   }
   ns(b | 0, d | 0, e | 0) | 0;
   a[b + e >> 0] = 0;
   return
  }

  function tj(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0;
   if (d >>> 0 > 4294967279) ih(b);
   if (d >>> 0 < 11) {
    a[b >> 0] = d << 1;
    b = b + 1 | 0
   } else {
    g = d + 16 & -16;
    f = kh(g) | 0;
    c[b + 8 >> 2] = f;
    c[b >> 2] = g | 1;
    c[b + 4 >> 2] = d;
    b = f
   }
   ks(b | 0, e | 0, d | 0) | 0;
   a[b + d >> 0] = 0;
   return
  }

  function uj(b) {
   b = b | 0;
   if (a[b >> 0] & 1) mh(c[b + 8 >> 2] | 0);
   return
  }

  function vj(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0;
   if ((b | 0) != (d | 0)) {
    e = a[d >> 0] | 0;
    f = (e & 1) == 0;
    xj(b, f ? d + 1 | 0 : c[d + 8 >> 2] | 0, f ? (e & 255) >>> 1 : c[d + 4 >> 2] | 0) | 0
   }
   return b | 0
  }

  function wj(a, b) {
   a = a | 0;
   b = b | 0;
   return xj(a, b, Xi(b) | 0) | 0
  }

  function xj(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0;
   f = a[b >> 0] | 0;
   if (!(f & 1)) h = 10;
   else {
    f = c[b >> 2] | 0;
    h = (f & -2) + -1 | 0;
    f = f & 255
   }
   g = (f & 1) == 0;
   do
    if (h >>> 0 >= e >>> 0) {
     if (g) f = b + 1 | 0;
     else f = c[b + 8 >> 2] | 0;
     ps(f | 0, d | 0, e | 0) | 0;
     a[f + e >> 0] = 0;
     if (!(a[b >> 0] & 1)) {
      a[b >> 0] = e << 1;
      break
     } else {
      c[b + 4 >> 2] = e;
      break
     }
    } else {
     if (g) f = (f & 255) >>> 1;
     else f = c[b + 4 >> 2] | 0;
     Ej(b, h, e - h | 0, f, 0, f, e, d)
    }
   while (0);
   return b | 0
  }

  function yj(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0;
   f = a[b >> 0] | 0;
   g = (f & 1) == 0;
   if (g) f = (f & 255) >>> 1;
   else f = c[b + 4 >> 2] | 0;
   do
    if (f >>> 0 >= d >>> 0)
     if (g) {
      a[b + 1 + d >> 0] = 0;
      a[b >> 0] = d << 1;
      break
     } else {
      a[(c[b + 8 >> 2] | 0) + d >> 0] = 0;
      c[b + 4 >> 2] = d;
      break
     } else zj(b, d - f | 0, e) | 0; while (0);
   return
  }

  function zj(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0;
   if (d) {
    f = a[b >> 0] | 0;
    if (!(f & 1)) g = 10;
    else {
     f = c[b >> 2] | 0;
     g = (f & -2) + -1 | 0;
     f = f & 255
    }
    if (!(f & 1)) h = (f & 255) >>> 1;
    else h = c[b + 4 >> 2] | 0;
    if ((g - h | 0) >>> 0 < d >>> 0) {
     Fj(b, g, d - g + h | 0, h, h, 0, 0);
     f = a[b >> 0] | 0
    }
    if (!(f & 1)) g = b + 1 | 0;
    else g = c[b + 8 >> 2] | 0;
    ks(g + h | 0, e | 0, d | 0) | 0;
    f = h + d | 0;
    if (!(a[b >> 0] & 1)) a[b >> 0] = f << 1;
    else c[b + 4 >> 2] = f;
    a[g + f >> 0] = 0
   }
   return b | 0
  }

  function Aj(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0;
   if (d >>> 0 > 4294967279) ih(b);
   e = a[b >> 0] | 0;
   if (!(e & 1)) f = 10;
   else {
    e = c[b >> 2] | 0;
    f = (e & -2) + -1 | 0;
    e = e & 255
   }
   if (!(e & 1)) j = (e & 255) >>> 1;
   else j = c[b + 4 >> 2] | 0;
   d = j >>> 0 > d >>> 0 ? j : d;
   if (d >>> 0 < 11) i = 10;
   else i = (d + 16 & -16) + -1 | 0;
   do
    if ((i | 0) != (f | 0)) {
     do
      if ((i | 0) != 10) {
       d = kh(i + 1 | 0) | 0;
       if (!(e & 1)) {
        g = 1;
        f = b + 1 | 0;
        h = 0;
        break
       } else {
        g = 1;
        f = c[b + 8 >> 2] | 0;
        h = 1;
        break
       }
      } else {
       d = b + 1 | 0;
       g = 0;
       f = c[b + 8 >> 2] | 0;
       h = 1
      }
     while (0);
     if (!(e & 1)) e = (e & 255) >>> 1;
     else e = c[b + 4 >> 2] | 0;
     ns(d | 0, f | 0, e + 1 | 0) | 0;
     if (h) mh(f);
     if (g) {
      c[b >> 2] = i + 1 | 1;
      c[b + 4 >> 2] = j;
      c[b + 8 >> 2] = d;
      break
     } else {
      a[b >> 0] = j << 1;
      break
     }
    }
   while (0);
   return
  }

  function Bj(a, b) {
   a = a | 0;
   b = b | 0;
   return Dj(a, b, Xi(b) | 0) | 0
  }

  function Cj(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0;
   e = a[b >> 0] | 0;
   f = (e & 1) != 0;
   if (f) {
    g = (c[b >> 2] & -2) + -1 | 0;
    h = c[b + 4 >> 2] | 0
   } else {
    g = 10;
    h = (e & 255) >>> 1
   }
   if ((h | 0) == (g | 0)) {
    Fj(b, g, 1, g, g, 0, 0);
    if (!(a[b >> 0] & 1)) g = 7;
    else g = 8
   } else if (f) g = 8;
   else g = 7;
   if ((g | 0) == 7) {
    a[b >> 0] = (h << 1) + 2;
    e = b + 1 | 0;
    f = h + 1 | 0
   } else if ((g | 0) == 8) {
    e = c[b + 8 >> 2] | 0;
    f = h + 1 | 0;
    c[b + 4 >> 2] = f
   }
   a[e + h >> 0] = d;
   a[e + f >> 0] = 0;
   return
  }

  function Dj(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0;
   f = a[b >> 0] | 0;
   if (!(f & 1)) g = 10;
   else {
    f = c[b >> 2] | 0;
    g = (f & -2) + -1 | 0;
    f = f & 255
   }
   if (!(f & 1)) h = (f & 255) >>> 1;
   else h = c[b + 4 >> 2] | 0;
   if ((g - h | 0) >>> 0 >= e >>> 0) {
    if (e) {
     if (!(f & 1)) g = b + 1 | 0;
     else g = c[b + 8 >> 2] | 0;
     ns(g + h | 0, d | 0, e | 0) | 0;
     f = h + e | 0;
     if (!(a[b >> 0] & 1)) a[b >> 0] = f << 1;
     else c[b + 4 >> 2] = f;
     a[g + f >> 0] = 0
    }
   } else Ej(b, g, e - g + h | 0, h, h, 0, e, d);
   return b | 0
  }

  function Ej(b, d, e, f, g, h, i, j) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   i = i | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0;
   if ((-18 - d | 0) >>> 0 < e >>> 0) ih(b);
   if (!(a[b >> 0] & 1)) m = b + 1 | 0;
   else m = c[b + 8 >> 2] | 0;
   if (d >>> 0 < 2147483623) {
    k = e + d | 0;
    l = d << 1;
    k = k >>> 0 < l >>> 0 ? l : k;
    k = k >>> 0 < 11 ? 11 : k + 16 & -16
   } else k = -17;
   l = kh(k) | 0;
   if (g) ns(l | 0, m | 0, g | 0) | 0;
   if (i) ns(l + g | 0, j | 0, i | 0) | 0;
   e = f - h | 0;
   if ((e | 0) != (g | 0)) ns(l + (i + g) | 0, m + (h + g) | 0, e - g | 0) | 0;
   if ((d | 0) != 10) mh(m);
   c[b + 8 >> 2] = l;
   c[b >> 2] = k | 1;
   g = e + i | 0;
   c[b + 4 >> 2] = g;
   a[l + g >> 0] = 0;
   return
  }

  function Fj(b, d, e, f, g, h, i) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   i = i | 0;
   var j = 0,
    k = 0,
    l = 0;
   if ((-17 - d | 0) >>> 0 < e >>> 0) ih(b);
   if (!(a[b >> 0] & 1)) l = b + 1 | 0;
   else l = c[b + 8 >> 2] | 0;
   if (d >>> 0 < 2147483623) {
    j = e + d | 0;
    k = d << 1;
    j = j >>> 0 < k >>> 0 ? k : j;
    j = j >>> 0 < 11 ? 11 : j + 16 & -16
   } else j = -17;
   k = kh(j) | 0;
   if (g) ns(k | 0, l | 0, g | 0) | 0;
   e = f - h | 0;
   if ((e | 0) != (g | 0)) ns(k + (i + g) | 0, l + (h + g) | 0, e - g | 0) | 0;
   if ((d | 0) != 10) mh(l);
   c[b + 8 >> 2] = k;
   c[b >> 2] = j | 1;
   return
  }

  function Gj(b, d, e, f) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0;
   if (f >>> 0 > 4294967279) ih(b);
   if (f >>> 0 < 11) {
    a[b >> 0] = e << 1;
    f = b + 1 | 0
   } else {
    g = f + 16 & -16;
    f = kh(g) | 0;
    c[b + 8 >> 2] = f;
    c[b >> 2] = g | 1;
    c[b + 4 >> 2] = e
   }
   ns(f | 0, d | 0, e | 0) | 0;
   a[f + e >> 0] = 0;
   return
  }

  function Hj(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0;
   if (e >>> 0 > 1073741807) ih(b);
   if (e >>> 0 < 2) {
    a[b >> 0] = e << 1;
    b = b + 4 | 0
   } else {
    g = e + 4 & -4;
    f = kh(g << 2) | 0;
    c[b + 8 >> 2] = f;
    c[b >> 2] = g | 1;
    c[b + 4 >> 2] = e;
    b = f
   }
   Zi(b, d, e) | 0;
   c[b + (e << 2) >> 2] = 0;
   return
  }

  function Ij(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0;
   if (d >>> 0 > 1073741807) ih(b);
   if (d >>> 0 < 2) {
    a[b >> 0] = d << 1;
    b = b + 4 | 0
   } else {
    g = d + 4 & -4;
    f = kh(g << 2) | 0;
    c[b + 8 >> 2] = f;
    c[b >> 2] = g | 1;
    c[b + 4 >> 2] = d;
    b = f
   }
   $i(b, e, d) | 0;
   c[b + (d << 2) >> 2] = 0;
   return
  }

  function Jj(b) {
   b = b | 0;
   if (a[b >> 0] & 1) mh(c[b + 8 >> 2] | 0);
   return
  }

  function Kj(a, b) {
   a = a | 0;
   b = b | 0;
   return Lj(a, b, Yi(b) | 0) | 0
  }

  function Lj(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0;
   f = a[b >> 0] | 0;
   if (!(f & 1)) h = 1;
   else {
    f = c[b >> 2] | 0;
    h = (f & -2) + -1 | 0;
    f = f & 255
   }
   g = (f & 1) == 0;
   do
    if (h >>> 0 >= e >>> 0) {
     if (g) f = b + 4 | 0;
     else f = c[b + 8 >> 2] | 0;
     _i(f, d, e) | 0;
     c[f + (e << 2) >> 2] = 0;
     if (!(a[b >> 0] & 1)) {
      a[b >> 0] = e << 1;
      break
     } else {
      c[b + 4 >> 2] = e;
      break
     }
    } else {
     if (g) f = (f & 255) >>> 1;
     else f = c[b + 4 >> 2] | 0;
     Oj(b, h, e - h | 0, f, 0, f, e, d)
    }
   while (0);
   return b | 0
  }

  function Mj(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0;
   if (d >>> 0 > 1073741807) ih(b);
   e = a[b >> 0] | 0;
   if (!(e & 1)) f = 1;
   else {
    e = c[b >> 2] | 0;
    f = (e & -2) + -1 | 0;
    e = e & 255
   }
   if (!(e & 1)) j = (e & 255) >>> 1;
   else j = c[b + 4 >> 2] | 0;
   d = j >>> 0 > d >>> 0 ? j : d;
   if (d >>> 0 < 2) i = 1;
   else i = (d + 4 & -4) + -1 | 0;
   do
    if ((i | 0) != (f | 0)) {
     do
      if ((i | 0) != 1) {
       d = kh((i << 2) + 4 | 0) | 0;
       if (!(e & 1)) {
        g = 1;
        f = b + 4 | 0;
        h = 0;
        break
       } else {
        g = 1;
        f = c[b + 8 >> 2] | 0;
        h = 1;
        break
       }
      } else {
       d = b + 4 | 0;
       g = 0;
       f = c[b + 8 >> 2] | 0;
       h = 1
      }
     while (0);
     if (!(e & 1)) e = (e & 255) >>> 1;
     else e = c[b + 4 >> 2] | 0;
     Zi(d, f, e + 1 | 0) | 0;
     if (h) mh(f);
     if (g) {
      c[b >> 2] = i + 1 | 1;
      c[b + 4 >> 2] = j;
      c[b + 8 >> 2] = d;
      break
     } else {
      a[b >> 0] = j << 1;
      break
     }
    }
   while (0);
   return
  }

  function Nj(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0;
   e = a[b >> 0] | 0;
   f = (e & 1) != 0;
   if (f) {
    g = (c[b >> 2] & -2) + -1 | 0;
    h = c[b + 4 >> 2] | 0
   } else {
    g = 1;
    h = (e & 255) >>> 1
   }
   if ((h | 0) == (g | 0)) {
    Pj(b, g, 1, g, g, 0, 0);
    if (!(a[b >> 0] & 1)) g = 7;
    else g = 8
   } else if (f) g = 8;
   else g = 7;
   if ((g | 0) == 7) {
    a[b >> 0] = (h << 1) + 2;
    e = b + 4 | 0;
    f = h + 1 | 0
   } else if ((g | 0) == 8) {
    e = c[b + 8 >> 2] | 0;
    f = h + 1 | 0;
    c[b + 4 >> 2] = f
   }
   c[e + (h << 2) >> 2] = d;
   c[e + (f << 2) >> 2] = 0;
   return
  }

  function Oj(b, d, e, f, g, h, i, j) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   i = i | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0;
   if ((1073741806 - d | 0) >>> 0 < e >>> 0) ih(b);
   if (!(a[b >> 0] & 1)) m = b + 4 | 0;
   else m = c[b + 8 >> 2] | 0;
   if (d >>> 0 < 536870887) {
    k = e + d | 0;
    l = d << 1;
    k = k >>> 0 < l >>> 0 ? l : k;
    k = k >>> 0 < 2 ? 2 : k + 4 & -4
   } else k = 1073741807;
   l = kh(k << 2) | 0;
   if (g) Zi(l, m, g) | 0;
   if (i) Zi(l + (g << 2) | 0, j, i) | 0;
   e = f - h | 0;
   if ((e | 0) != (g | 0)) Zi(l + (i + g << 2) | 0, m + (h + g << 2) | 0, e - g | 0) | 0;
   if ((d | 0) != 1) mh(m);
   c[b + 8 >> 2] = l;
   c[b >> 2] = k | 1;
   g = e + i | 0;
   c[b + 4 >> 2] = g;
   c[l + (g << 2) >> 2] = 0;
   return
  }

  function Pj(b, d, e, f, g, h, i) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   i = i | 0;
   var j = 0,
    k = 0,
    l = 0;
   if ((1073741807 - d | 0) >>> 0 < e >>> 0) ih(b);
   if (!(a[b >> 0] & 1)) l = b + 4 | 0;
   else l = c[b + 8 >> 2] | 0;
   if (d >>> 0 < 536870887) {
    j = e + d | 0;
    k = d << 1;
    j = j >>> 0 < k >>> 0 ? k : j;
    j = j >>> 0 < 2 ? 2 : j + 4 & -4
   } else j = 1073741807;
   k = kh(j << 2) | 0;
   if (g) Zi(k, l, g) | 0;
   e = f - h | 0;
   if ((e | 0) != (g | 0)) Zi(k + (i + g << 2) | 0, l + (h + g << 2) | 0, e - g | 0) | 0;
   if ((d | 0) != 1) mh(l);
   c[b + 8 >> 2] = k;
   c[b >> 2] = j | 1;
   return
  }

  function Qj(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0;
   n = i;
   i = i + 32 | 0;
   l = n;
   m = n + 8 | 0;
   c[m >> 2] = 0;
   c[m + 4 >> 2] = 0;
   c[m + 8 >> 2] = 0;
   if (!(a[m >> 0] & 1)) f = 10;
   else f = (c[m >> 2] & -2) + -1 | 0;
   yj(m, f, 0);
   h = a[m >> 0] | 0;
   j = m + 1 | 0;
   k = m + 8 | 0;
   g = h;
   h = (h & 1) == 0 ? (h & 255) >>> 1 : c[m + 4 >> 2] | 0;
   while (1) {
    f = (g & 1) == 0 ? j : c[k >> 2] | 0;
    g = l;
    c[g >> 2] = d;
    c[g + 4 >> 2] = e;
    f = Ki(f, h + 1 | 0, 22022, l) | 0;
    if ((f | 0) > -1) {
     if (f >>> 0 <= h >>> 0) break
    } else f = h << 1 | 1;
    yj(m, f, 0);
    g = a[m >> 0] | 0;
    h = f
   }
   yj(m, f, 0);
   c[b >> 2] = c[m >> 2];
   c[b + 4 >> 2] = c[m + 4 >> 2];
   c[b + 8 >> 2] = c[m + 8 >> 2];
   c[m >> 2] = 0;
   c[m + 4 >> 2] = 0;
   c[m + 8 >> 2] = 0;
   uj(m);
   i = n;
   return
  }

  function Rj(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0,
    i = 0;
   g = d;
   f = e - g | 0;
   if (f >>> 0 > 4294967279) ih(b);
   if (f >>> 0 < 11) {
    a[b >> 0] = f << 1;
    h = b + 1 | 0
   } else {
    i = f + 16 & -16;
    h = kh(i) | 0;
    c[b + 8 >> 2] = h;
    c[b >> 2] = i | 1;
    c[b + 4 >> 2] = f
   }
   b = e - g | 0;
   if ((d | 0) != (e | 0)) {
    f = h;
    while (1) {
     a[f >> 0] = a[d >> 0] | 0;
     d = d + 1 | 0;
     if ((d | 0) == (e | 0)) break;
     else f = f + 1 | 0
    }
   }
   a[h + b >> 0] = 0;
   return
  }

  function Sj(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0,
    i = 0;
   h = d;
   f = e - h | 0;
   g = f >> 2;
   if (g >>> 0 > 1073741807) ih(b);
   if (g >>> 0 < 2) {
    a[b >> 0] = f >>> 1;
    b = b + 4 | 0
   } else {
    i = g + 4 & -4;
    f = kh(i << 2) | 0;
    c[b + 8 >> 2] = f;
    c[b >> 2] = i | 1;
    c[b + 4 >> 2] = g;
    b = f
   }
   g = (e - h | 0) >>> 2;
   if ((d | 0) != (e | 0)) {
    f = b;
    while (1) {
     c[f >> 2] = c[d >> 2];
     d = d + 4 | 0;
     if ((d | 0) == (e | 0)) break;
     else f = f + 4 | 0
    }
   }
   c[b + (g << 2) >> 2] = 0;
   return
  }

  function Tj(a, b) {
   a = a | 0;
   b = b | 0;
   c[a + 16 >> 2] = (c[a + 24 >> 2] | 0) == 0 | b;
   return
  }

  function Uj(a) {
   a = a | 0;
   Vj(a);
   return
  }

  function Vj(a) {
   a = a | 0;
   c[a >> 2] = 8224;
   Wj(a, 0);
   Oo(a + 28 | 0);
   kj(c[a + 32 >> 2] | 0);
   kj(c[a + 36 >> 2] | 0);
   kj(c[a + 48 >> 2] | 0);
   kj(c[a + 60 >> 2] | 0);
   return
  }

  function Wj(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0;
   d = c[a + 40 >> 2] | 0;
   e = a + 32 | 0;
   f = a + 36 | 0;
   if (d)
    do {
     d = d + -1 | 0;
     xb[c[(c[e >> 2] | 0) + (d << 2) >> 2] & 0](b, a, c[(c[f >> 2] | 0) + (d << 2) >> 2] | 0)
    } while ((d | 0) != 0);
   return
  }

  function Xj(a) {
   a = a | 0;
   var b = 0,
    d = 0;
   d = i;
   i = i + 16 | 0;
   b = d;
   No(b, a + 28 | 0);
   i = d;
   return c[b >> 2] | 0
  }

  function Yj(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0;
   c[a + 24 >> 2] = b;
   c[a + 16 >> 2] = (b | 0) == 0 & 1;
   c[a + 20 >> 2] = 0;
   c[a + 4 >> 2] = 4098;
   c[a + 12 >> 2] = 0;
   c[a + 8 >> 2] = 6;
   d = a + 28 | 0;
   b = a + 32 | 0;
   a = b + 40 | 0;
   do {
    c[b >> 2] = 0;
    b = b + 4 | 0
   } while ((b | 0) < (a | 0));
   Mo(d);
   return
  }

  function Zj(a) {
   a = a | 0;
   c[a >> 2] = 8160;
   Oo(a + 4 | 0);
   return
  }

  function _j(a) {
   a = a | 0;
   c[a >> 2] = 8160;
   Oo(a + 4 | 0);
   mh(a);
   return
  }

  function $j(a) {
   a = a | 0;
   c[a >> 2] = 8160;
   Mo(a + 4 | 0);
   a = a + 8 | 0;
   c[a >> 2] = 0;
   c[a + 4 >> 2] = 0;
   c[a + 8 >> 2] = 0;
   c[a + 12 >> 2] = 0;
   c[a + 16 >> 2] = 0;
   c[a + 20 >> 2] = 0;
   return
  }

  function ak(a, b) {
   a = a | 0;
   b = b | 0;
   return
  }

  function bk(a, b, c) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   return a | 0
  }

  function ck(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   b = a;
   c[b >> 2] = 0;
   c[b + 4 >> 2] = 0;
   b = a + 8 | 0;
   c[b >> 2] = -1;
   c[b + 4 >> 2] = -1;
   return
  }

  function dk(a, b, d, e) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   b = a;
   c[b >> 2] = 0;
   c[b + 4 >> 2] = 0;
   b = a + 8 | 0;
   c[b >> 2] = -1;
   c[b + 4 >> 2] = -1;
   return
  }

  function ek(a) {
   a = a | 0;
   return 0
  }

  function fk(a) {
   a = a | 0;
   return 0
  }

  function gk(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0,
    i = 0;
   h = b + 12 | 0;
   i = b + 16 | 0;
   a: do
    if ((e | 0) > 0) {
     g = d;
     d = 0;
     while (1) {
      f = c[h >> 2] | 0;
      if (f >>> 0 < (c[i >> 2] | 0) >>> 0) {
       c[h >> 2] = f + 1;
       f = a[f >> 0] | 0
      } else {
       f = wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
       if ((f | 0) == -1) break a;
       f = f & 255
      }
      a[g >> 0] = f;
      d = d + 1 | 0;
      if ((d | 0) < (e | 0)) g = g + 1 | 0;
      else break
     }
    } else d = 0;
   while (0);
   return d | 0
  }

  function hk(a) {
   a = a | 0;
   return -1
  }

  function ik(a) {
   a = a | 0;
   var b = 0;
   if ((wb[c[(c[a >> 2] | 0) + 36 >> 2] & 127](a) | 0) == -1) a = -1;
   else {
    b = a + 12 | 0;
    a = c[b >> 2] | 0;
    c[b >> 2] = a + 1;
    a = d[a >> 0] | 0
   }
   return a | 0
  }

  function jk(a, b) {
   a = a | 0;
   b = b | 0;
   return -1
  }

  function kk(b, e, f) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0;
   i = b + 24 | 0;
   j = b + 28 | 0;
   a: do
    if ((f | 0) > 0) {
     h = e;
     e = 0;
     while (1) {
      g = c[i >> 2] | 0;
      if (g >>> 0 >= (c[j >> 2] | 0) >>> 0) {
       if ((Cb[c[(c[b >> 2] | 0) + 52 >> 2] & 15](b, d[h >> 0] | 0) | 0) == -1) break a
      } else {
       k = a[h >> 0] | 0;
       c[i >> 2] = g + 1;
       a[g >> 0] = k
      }
      e = e + 1 | 0;
      if ((e | 0) < (f | 0)) h = h + 1 | 0;
      else break
     }
    } else e = 0;
   while (0);
   return e | 0
  }

  function lk(a, b) {
   a = a | 0;
   b = b | 0;
   return -1
  }

  function mk(a) {
   a = a | 0;
   Vj(a + 8 | 0);
   return
  }

  function nk(a) {
   a = a | 0;
   Vj(a + ((c[(c[a >> 2] | 0) + -12 >> 2] | 0) + 8) | 0);
   return
  }

  function ok(a) {
   a = a | 0;
   Vj(a + 8 | 0);
   mh(a);
   return
  }

  function pk(a) {
   a = a | 0;
   ok(a + (c[(c[a >> 2] | 0) + -12 >> 2] | 0) | 0);
   return
  }

  function qk(b) {
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0;
   e = i;
   i = i + 16 | 0;
   d = e;
   if (c[b + ((c[(c[b >> 2] | 0) + -12 >> 2] | 0) + 24) >> 2] | 0) {
    vk(d, b);
    if ((a[d >> 0] | 0) != 0 ? (f = c[b + ((c[(c[b >> 2] | 0) + -12 >> 2] | 0) + 24) >> 2] | 0, (wb[c[(c[f >> 2] | 0) + 24 >> 2] & 127](f) | 0) == -1) : 0) {
     f = b + ((c[(c[b >> 2] | 0) + -12 >> 2] | 0) + 16) | 0;
     c[f >> 2] = c[f >> 2] | 1
    }
    wk(d)
   }
   i = e;
   return b | 0
  }

  function rk(a) {
   a = a | 0;
   Vj(a + 4 | 0);
   return
  }

  function sk(a) {
   a = a | 0;
   Vj(a + ((c[(c[a >> 2] | 0) + -12 >> 2] | 0) + 4) | 0);
   return
  }

  function tk(a) {
   a = a | 0;
   Vj(a + 4 | 0);
   mh(a);
   return
  }

  function uk(a) {
   a = a | 0;
   tk(a + (c[(c[a >> 2] | 0) + -12 >> 2] | 0) | 0);
   return
  }

  function vk(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0;
   a[b >> 0] = 0;
   c[b + 4 >> 2] = d;
   e = c[(c[d >> 2] | 0) + -12 >> 2] | 0;
   if (!(c[d + (e + 16) >> 2] | 0)) {
    e = c[d + (e + 72) >> 2] | 0;
    if (e) qk(e) | 0;
    a[b >> 0] = 1
   }
   return
  }

  function wk(a) {
   a = a | 0;
   var b = 0,
    d = 0;
   a = a + 4 | 0;
   d = c[a >> 2] | 0;
   b = c[(c[d >> 2] | 0) + -12 >> 2] | 0;
   if (((((c[d + (b + 24) >> 2] | 0) != 0 ? (c[d + (b + 16) >> 2] | 0) == 0 : 0) ? (c[d + (b + 4) >> 2] & 8192 | 0) != 0 : 0) ? !(Da() | 0) : 0) ? (d = c[a >> 2] | 0, d = c[d + ((c[(c[d >> 2] | 0) + -12 >> 2] | 0) + 24) >> 2] | 0, (wb[c[(c[d >> 2] | 0) + 24 >> 2] & 127](d) | 0) == -1) : 0) {
    d = c[a >> 2] | 0;
    d = d + ((c[(c[d >> 2] | 0) + -12 >> 2] | 0) + 16) | 0;
    c[d >> 2] = c[d >> 2] | 1
   }
   return
  }

  function xk(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0;
   n = i;
   i = i + 32 | 0;
   j = n + 16 | 0;
   k = n + 4 | 0;
   m = n + 8 | 0;
   e = n;
   vk(m, b);
   if (a[m >> 0] | 0) {
    c[e >> 2] = Xj(b + (c[(c[b >> 2] | 0) + -12 >> 2] | 0) | 0) | 0;
    l = Qo(e, 8508) | 0;
    Oo(e);
    f = c[(c[b >> 2] | 0) + -12 >> 2] | 0;
    g = c[b + (f + 24) >> 2] | 0;
    h = b + f | 0;
    f = b + (f + 76) | 0;
    e = c[f >> 2] | 0;
    if ((e | 0) == -1) {
     c[j >> 2] = Xj(h) | 0;
     e = Qo(j, 9336) | 0;
     e = Cb[c[(c[e >> 2] | 0) + 28 >> 2] & 15](e, 32) | 0;
     Oo(j);
     e = e << 24 >> 24;
     c[f >> 2] = e
    }
    f = c[(c[l >> 2] | 0) + 24 >> 2] | 0;
    c[k >> 2] = g;
    c[j >> 2] = c[k >> 2];
    if (!(Db[f & 31](l, j, h, e & 255, d) | 0)) {
     d = b + ((c[(c[b >> 2] | 0) + -12 >> 2] | 0) + 16) | 0;
     c[d >> 2] = c[d >> 2] | 5
    }
   }
   wk(m);
   i = n;
   return b | 0
  }

  function yk(a, b) {
   a = a | 0;
   b = b | 0;
   return
  }

  function zk(a) {
   a = a | 0;
   Vj(a + 12 | 0);
   return
  }

  function Ak(a) {
   a = a | 0;
   Vj(a + -8 + 12 | 0);
   return
  }

  function Bk(a) {
   a = a | 0;
   Vj(a + ((c[(c[a >> 2] | 0) + -12 >> 2] | 0) + 12) | 0);
   return
  }

  function Ck(a) {
   a = a | 0;
   Vj(a + 12 | 0);
   mh(a);
   return
  }

  function Dk(a) {
   a = a | 0;
   Ck(a + -8 | 0);
   return
  }

  function Ek(a) {
   a = a | 0;
   Ck(a + (c[(c[a >> 2] | 0) + -12 >> 2] | 0) | 0);
   return
  }

  function Fk(a) {
   a = a | 0;
   Vj(a);
   mh(a);
   return
  }

  function Gk(a) {
   a = a | 0;
   return
  }

  function Hk(a) {
   a = a | 0;
   return
  }

  function Ik(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Jk(b, c, d, e, f) {
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0;
   a: do
    if ((e | 0) == (f | 0)) h = 6;
    else
     while (1) {
      if ((c | 0) == (d | 0)) {
       c = -1;
       break a
      }
      b = a[c >> 0] | 0;
      g = a[e >> 0] | 0;
      if (b << 24 >> 24 < g << 24 >> 24) {
       c = -1;
       break a
      }
      if (g << 24 >> 24 < b << 24 >> 24) {
       c = 1;
       break a
      }
      c = c + 1 | 0;
      e = e + 1 | 0;
      if ((e | 0) == (f | 0)) {
       h = 6;
       break
      }
     }
    while (0);
   if ((h | 0) == 6) c = (c | 0) != (d | 0) & 1;
   return c | 0
  }

  function Kk(a, b, c, d) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   Rj(a, c, d);
   return
  }

  function Lk(b, c, d) {
   b = b | 0;
   c = c | 0;
   d = d | 0;
   var e = 0;
   if ((c | 0) == (d | 0)) b = 0;
   else {
    b = 0;
    do {
     b = (a[c >> 0] | 0) + (b << 4) | 0;
     e = b & -268435456;
     b = (e >>> 24 | e) ^ b;
     c = c + 1 | 0
    } while ((c | 0) != (d | 0))
   }
   return b | 0
  }

  function Mk(a) {
   a = a | 0;
   return
  }

  function Nk(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Ok(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0;
   a: do
    if ((e | 0) == (f | 0)) h = 6;
    else
     while (1) {
      if ((b | 0) == (d | 0)) {
       b = -1;
       break a
      }
      a = c[b >> 2] | 0;
      g = c[e >> 2] | 0;
      if ((a | 0) < (g | 0)) {
       b = -1;
       break a
      }
      if ((g | 0) < (a | 0)) {
       b = 1;
       break a
      }
      b = b + 4 | 0;
      e = e + 4 | 0;
      if ((e | 0) == (f | 0)) {
       h = 6;
       break
      }
     }
    while (0);
   if ((h | 0) == 6) b = (b | 0) != (d | 0) & 1;
   return b | 0
  }

  function Pk(a, b, c, d) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   Sj(a, c, d);
   return
  }

  function Qk(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0;
   if ((b | 0) == (d | 0)) a = 0;
   else {
    a = 0;
    do {
     a = (c[b >> 2] | 0) + (a << 4) | 0;
     e = a & -268435456;
     a = (e >>> 24 | e) ^ a;
     b = b + 4 | 0
    } while ((b | 0) != (d | 0))
   }
   return a | 0
  }

  function Rk(a) {
   a = a | 0;
   return
  }

  function Sk(a) {
   a = a | 0;
   mh(a);
   return
  }

  function Tk(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0;
   s = i;
   i = i + 64 | 0;
   k = s + 56 | 0;
   j = s + 52 | 0;
   r = s + 48 | 0;
   l = s + 44 | 0;
   m = s + 40 | 0;
   n = s + 36 | 0;
   o = s + 32 | 0;
   q = s + 8 | 0;
   p = s;
   a: do
    if (!(c[f + 4 >> 2] & 1)) {
     c[r >> 2] = -1;
     q = c[(c[b >> 2] | 0) + 16 >> 2] | 0;
     c[l >> 2] = c[d >> 2];
     c[m >> 2] = c[e >> 2];
     c[j >> 2] = c[l >> 2];
     c[k >> 2] = c[m >> 2];
     j = ub[q & 63](b, j, k, f, g, r) | 0;
     c[d >> 2] = j;
     switch (c[r >> 2] | 0) {
      case 0:
       {
        a[h >> 0] = 0;
        break a
       }
      case 1:
       {
        a[h >> 0] = 1;
        break a
       }
      default:
       {
        a[h >> 0] = 1;c[g >> 2] = 4;
        break a
       }
     }
    } else {
     b = Xj(f) | 0;
     c[n >> 2] = b;
     j = Qo(n, 9336) | 0;
     gs(b) | 0;
     b = Xj(f) | 0;
     c[o >> 2] = b;
     r = Qo(o, 9476) | 0;
     gs(b) | 0;
     tb[c[(c[r >> 2] | 0) + 24 >> 2] & 127](q, r);
     tb[c[(c[r >> 2] | 0) + 28 >> 2] & 127](q + 12 | 0, r);
     c[p >> 2] = c[e >> 2];
     c[k >> 2] = c[p >> 2];
     a[h >> 0] = (Cq(d, k, q, q + 24 | 0, j, g, 1) | 0) == (q | 0) & 1;
     j = c[d >> 2] | 0;
     uj(q + 12 | 0);
     uj(q)
    }
   while (0);
   i = s;
   return j | 0
  }

  function Uk(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Dq(a, k, j, e, f, g) | 0;
   i = h;
   return a | 0
  }

  function Vk(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Eq(a, k, j, e, f, g) | 0;
   i = h;
   return a | 0
  }

  function Wk(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Fq(a, k, j, e, f, g) | 0;
   i = h;
   return a | 0
  }

  function Xk(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Gq(a, k, j, e, f, g) | 0;
   i = h;
   return a | 0
  }

  function Yk(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Hq(a, k, j, e, f, g) | 0;
   i = h;
   return a | 0
  }

  function Zk(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Iq(a, k, j, e, f, g) | 0;
   i = h;
   return a | 0
  }

  function _k(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Jq(a, k, j, e, f, g) | 0;
   i = h;
   return a | 0
  }

  function $k(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Kq(a, k, j, e, f, g) | 0;
   i = h;
   return a | 0
  }

  function al(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Lq(a, k, j, e, f, g) | 0;
   i = h;
   return a | 0
  }

  function bl(b, e, f, g, h, j) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0;
   z = i;
   i = i + 240 | 0;
   w = z;
   s = z + 208 | 0;
   y = z + 32 | 0;
   t = z + 28 | 0;
   x = z + 16 | 0;
   v = z + 12 | 0;
   p = z + 48 | 0;
   r = z + 8 | 0;
   q = z + 4 | 0;
   c[y >> 2] = 0;
   c[y + 4 >> 2] = 0;
   c[y + 8 >> 2] = 0;
   u = Xj(g) | 0;
   c[t >> 2] = u;
   t = Qo(t, 9336) | 0;
   Ab[c[(c[t >> 2] | 0) + 32 >> 2] & 7](t, 22094, 22120, s) | 0;
   gs(u) | 0;
   c[x >> 2] = 0;
   c[x + 4 >> 2] = 0;
   c[x + 8 >> 2] = 0;
   if (!(a[x >> 0] & 1)) b = 10;
   else b = (c[x >> 2] & -2) + -1 | 0;
   yj(x, b, 0);
   t = x + 8 | 0;
   u = x + 1 | 0;
   g = (a[x >> 0] & 1) == 0 ? u : c[t >> 2] | 0;
   c[v >> 2] = g;
   c[r >> 2] = p;
   c[q >> 2] = 0;
   o = x + 4 | 0;
   b = c[e >> 2] | 0;
   a: while (1) {
    if (b) {
     if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
      c[e >> 2] = 0;
      b = 0
     }
    } else b = 0;
    l = (b | 0) == 0;
    k = c[f >> 2] | 0;
    do
     if (k) {
      if ((c[k + 12 >> 2] | 0) != (c[k + 16 >> 2] | 0))
       if (l) break;
       else break a;
      if ((wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0) != -1)
       if (l) break;
       else break a;
      else {
       c[f >> 2] = 0;
       A = 13;
       break
      }
     } else A = 13;
    while (0);
    if ((A | 0) == 13) {
     A = 0;
     if (l) {
      k = 0;
      break
     } else k = 0
    }
    l = a[x >> 0] | 0;
    l = (l & 1) == 0 ? (l & 255) >>> 1 : c[o >> 2] | 0;
    if ((c[v >> 2] | 0) == (g + l | 0)) {
     yj(x, l << 1, 0);
     if (!(a[x >> 0] & 1)) g = 10;
     else g = (c[x >> 2] & -2) + -1 | 0;
     yj(x, g, 0);
     g = (a[x >> 0] & 1) == 0 ? u : c[t >> 2] | 0;
     c[v >> 2] = g + l
    }
    m = b + 12 | 0;
    l = c[m >> 2] | 0;
    n = b + 16 | 0;
    if ((l | 0) == (c[n >> 2] | 0)) l = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
    else l = d[l >> 0] | 0;
    if (cl(l & 255, 16, g, v, q, 0, y, p, r, s) | 0) break;
    k = c[m >> 2] | 0;
    if ((k | 0) == (c[n >> 2] | 0)) {
     wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
     continue
    } else {
     c[m >> 2] = k + 1;
     continue
    }
   }
   yj(x, (c[v >> 2] | 0) - g | 0, 0);
   u = (a[x >> 0] & 1) == 0 ? u : c[t >> 2] | 0;
   v = dl() | 0;
   c[w >> 2] = j;
   if ((Mq(u, v, 23478, w) | 0) != 1) c[h >> 2] = 4;
   if (b) {
    if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
     c[e >> 2] = 0;
     b = 0
    }
   } else b = 0;
   b = (b | 0) == 0;
   do
    if (k) {
     if ((c[k + 12 >> 2] | 0) == (c[k + 16 >> 2] | 0) ? (wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0) == -1 : 0) {
      c[f >> 2] = 0;
      A = 37;
      break
     }
     if (!b) A = 38
    } else A = 37;
   while (0);
   if ((A | 0) == 37 ? b : 0) A = 38;
   if ((A | 0) == 38) c[h >> 2] = c[h >> 2] | 2;
   A = c[e >> 2] | 0;
   uj(x);
   uj(y);
   i = z;
   return A | 0
  }

  function cl(b, d, e, f, g, h, i, j, k, l) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   i = i | 0;
   j = j | 0;
   k = k | 0;
   l = l | 0;
   var m = 0,
    n = 0,
    o = 0,
    p = 0;
   o = c[f >> 2] | 0;
   p = (o | 0) == (e | 0);
   do
    if (p) {
     m = (a[l + 24 >> 0] | 0) == b << 24 >> 24;
     if (!m ? (a[l + 25 >> 0] | 0) != b << 24 >> 24 : 0) {
      n = 5;
      break
     }
     c[f >> 2] = e + 1;
     a[e >> 0] = m ? 43 : 45;
     c[g >> 2] = 0;
     m = 0
    } else n = 5;
   while (0);
   a: do
    if ((n | 0) == 5) {
     n = a[i >> 0] | 0;
     if (b << 24 >> 24 == h << 24 >> 24 ? (((n & 1) == 0 ? (n & 255) >>> 1 : c[i + 4 >> 2] | 0) | 0) != 0 : 0) {
      m = c[k >> 2] | 0;
      if ((m - j | 0) >= 160) {
       m = 0;
       break
      }
      f = c[g >> 2] | 0;
      c[k >> 2] = m + 4;
      c[m >> 2] = f;
      c[g >> 2] = 0;
      m = 0;
      break
     }
     h = l + 26 | 0;
     m = l;
     while (1) {
      if ((a[m >> 0] | 0) == b << 24 >> 24) break;
      m = m + 1 | 0;
      if ((m | 0) == (h | 0)) {
       m = h;
       break
      }
     }
     m = m - l | 0;
     if ((m | 0) > 23) m = -1;
     else {
      switch (d | 0) {
       case 10:
       case 8:
        {
         if ((m | 0) >= (d | 0)) {
          m = -1;
          break a
         }
         break
        }
       case 16:
        {
         if ((m | 0) >= 22) {
          if (p) {
           m = -1;
           break a
          }
          if ((o - e | 0) >= 3) {
           m = -1;
           break a
          }
          if ((a[o + -1 >> 0] | 0) != 48) {
           m = -1;
           break a
          }
          c[g >> 2] = 0;
          m = a[22094 + m >> 0] | 0;
          c[f >> 2] = o + 1;
          a[o >> 0] = m;
          m = 0;
          break a
         }
         break
        }
       default:
        {}
      }
      m = a[22094 + m >> 0] | 0;
      c[f >> 2] = o + 1;
      a[o >> 0] = m;
      c[g >> 2] = (c[g >> 2] | 0) + 1;
      m = 0
     }
    }
   while (0);
   return m | 0
  }

  function dl() {
   if ((a[1744] | 0) == 0 ? (ya(1744) | 0) != 0 : 0) {
    c[2475] = ji(2147483647, 23481, 0) | 0;
    Ga(1744)
   }
   return c[2475] | 0
  }

  function el(a) {
   a = a | 0;
   return
  }

  function fl(a) {
   a = a | 0;
   mh(a);
   return
  }

  function gl(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0;
   s = i;
   i = i + 64 | 0;
   k = s + 56 | 0;
   j = s + 52 | 0;
   r = s + 48 | 0;
   l = s + 44 | 0;
   m = s + 40 | 0;
   n = s + 36 | 0;
   o = s + 32 | 0;
   q = s + 8 | 0;
   p = s;
   a: do
    if (!(c[f + 4 >> 2] & 1)) {
     c[r >> 2] = -1;
     q = c[(c[b >> 2] | 0) + 16 >> 2] | 0;
     c[l >> 2] = c[d >> 2];
     c[m >> 2] = c[e >> 2];
     c[j >> 2] = c[l >> 2];
     c[k >> 2] = c[m >> 2];
     j = ub[q & 63](b, j, k, f, g, r) | 0;
     c[d >> 2] = j;
     switch (c[r >> 2] | 0) {
      case 0:
       {
        a[h >> 0] = 0;
        break a
       }
      case 1:
       {
        a[h >> 0] = 1;
        break a
       }
      default:
       {
        a[h >> 0] = 1;c[g >> 2] = 4;
        break a
       }
     }
    } else {
     b = Xj(f) | 0;
     c[n >> 2] = b;
     j = Qo(n, 9328) | 0;
     gs(b) | 0;
     b = Xj(f) | 0;
     c[o >> 2] = b;
     r = Qo(o, 9484) | 0;
     gs(b) | 0;
     tb[c[(c[r >> 2] | 0) + 24 >> 2] & 127](q, r);
     tb[c[(c[r >> 2] | 0) + 28 >> 2] & 127](q + 12 | 0, r);
     c[p >> 2] = c[e >> 2];
     c[k >> 2] = c[p >> 2];
     a[h >> 0] = (Nq(d, k, q, q + 24 | 0, j, g, 1) | 0) == (q | 0) & 1;
     j = c[d >> 2] | 0;
     Jj(q + 12 | 0);
     Jj(q)
    }
   while (0);
   i = s;
   return j | 0
  }

  function hl(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Oq(a, k, j, e, f, g) | 0;
   i = h;
   return a | 0
  }

  function il(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Pq(a, k, j, e, f, g) | 0;
   i = h;
   return a | 0
  }

  function jl(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Qq(a, k, j, e, f, g) | 0;
   i = h;
   return a | 0
  }

  function kl(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Rq(a, k, j, e, f, g) | 0;
   i = h;
   return a | 0
  }

  function ll(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Sq(a, k, j, e, f, g) | 0;
   i = h;
   return a | 0
  }

  function ml(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Tq(a, k, j, e, f, g) | 0;
   i = h;
   return a | 0
  }

  function nl(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Uq(a, k, j, e, f, g) | 0;
   i = h;
   return a | 0
  }

  function ol(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Vq(a, k, j, e, f, g) | 0;
   i = h;
   return a | 0
  }

  function pl(a, b, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
   h = i;
   i = i + 16 | 0;
   j = h + 12 | 0;
   k = h + 8 | 0;
   m = h + 4 | 0;
   l = h;
   c[m >> 2] = c[b >> 2];
   c[l >> 2] = c[d >> 2];
   c[k >> 2] = c[m >> 2];
   c[j >> 2] = c[l >> 2];
   a = Wq(a, k, j, e, f, g) | 0;
   i = h;
   return a | 0
  }

  function Cq(b, e, f, g, h, j, k) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   k = k | 0;
   var l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0;
   A = i;
   i = i + 112 | 0;
   m = A;
   n = (g - f | 0) / 12 | 0;
   if (n >>> 0 > 100) {
    m = jj(n) | 0;
    if (!m) Rh();
    else {
     y = m;
     l = m
    }
   } else {
    y = 0;
    l = m
   }
   if ((f | 0) == (g | 0)) m = 0;
   else {
    q = f;
    o = 0;
    p = l;
    while (1) {
     m = a[q >> 0] | 0;
     if (!(m & 1)) m = (m & 255) >>> 1;
     else m = c[q + 4 >> 2] | 0;
     if (!m) {
      a[p >> 0] = 2;
      m = o + 1 | 0;
      n = n + -1 | 0
     } else {
      a[p >> 0] = 1;
      m = o
     }
     q = q + 12 | 0;
     if ((q | 0) == (g | 0)) break;
     else {
      o = m;
      p = p + 1 | 0
     }
    }
   }
   w = (f | 0) == (g | 0);
   x = (f | 0) == (g | 0);
   v = 0;
   r = m;
   t = n;
   a: while (1) {
    m = c[b >> 2] | 0;
    do
     if (m) {
      if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0))
       if ((wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1) {
        c[b >> 2] = 0;
        m = 0;
        break
       } else {
        m = c[b >> 2] | 0;
        break
       }
     } else m = 0;
    while (0);
    p = (m | 0) == 0;
    n = c[e >> 2] | 0;
    if (n) {
     if ((c[n + 12 >> 2] | 0) == (c[n + 16 >> 2] | 0) ? (wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0) == -1 : 0) {
      c[e >> 2] = 0;
      n = 0
     }
    } else n = 0;
    o = (n | 0) == 0;
    m = c[b >> 2] | 0;
    if (!((t | 0) != 0 & (p ^ o))) break;
    n = c[m + 12 >> 2] | 0;
    if ((n | 0) == (c[m + 16 >> 2] | 0)) m = wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0;
    else m = d[n >> 0] | 0;
    m = m & 255;
    if (!k) m = Cb[c[(c[h >> 2] | 0) + 12 >> 2] & 15](h, m) | 0;
    u = v + 1 | 0;
    if (w) {
     m = 0;
     p = r;
     q = t
    } else {
     q = 0;
     s = f;
     p = r;
     o = t;
     r = l;
     while (1) {
      do
       if ((a[r >> 0] | 0) == 1) {
        if (!(a[s >> 0] & 1)) n = s + 1 | 0;
        else n = c[s + 8 >> 2] | 0;
        n = a[n + v >> 0] | 0;
        if (!k) n = Cb[c[(c[h >> 2] | 0) + 12 >> 2] & 15](h, n) | 0;
        if (m << 24 >> 24 != n << 24 >> 24) {
         a[r >> 0] = 0;
         n = q;
         o = o + -1 | 0;
         break
        }
        n = a[s >> 0] | 0;
        if (!(n & 1)) n = (n & 255) >>> 1;
        else n = c[s + 4 >> 2] | 0;
        if ((n | 0) == (u | 0)) {
         a[r >> 0] = 2;
         n = 1;
         p = p + 1 | 0;
         o = o + -1 | 0
        } else n = 1
       } else n = q;
      while (0);
      s = s + 12 | 0;
      if ((s | 0) == (g | 0)) {
       m = n;
       q = o;
       break
      } else {
       q = n;
       r = r + 1 | 0
      }
     }
    }
    if (!m) {
     v = u;
     r = p;
     t = q;
     continue
    }
    m = c[b >> 2] | 0;
    n = m + 12 | 0;
    o = c[n >> 2] | 0;
    if ((o | 0) == (c[m + 16 >> 2] | 0)) wb[c[(c[m >> 2] | 0) + 40 >> 2] & 127](m) | 0;
    else c[n >> 2] = o + 1;
    if ((p + q | 0) >>> 0 < 2 | x) {
     v = u;
     r = p;
     t = q;
     continue
    } else {
     m = f;
     o = p;
     p = l
    }
    while (1) {
     if ((a[p >> 0] | 0) == 2) {
      n = a[m >> 0] | 0;
      if (!(n & 1)) n = (n & 255) >>> 1;
      else n = c[m + 4 >> 2] | 0;
      if ((n | 0) != (u | 0)) {
       a[p >> 0] = 0;
       o = o + -1 | 0
      }
     }
     m = m + 12 | 0;
     if ((m | 0) == (g | 0)) {
      v = u;
      r = o;
      t = q;
      continue a
     } else p = p + 1 | 0
    }
   }
   do
    if (m) {
     if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0))
      if ((wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1) {
       c[b >> 2] = 0;
       m = 0;
       break
      } else {
       m = c[b >> 2] | 0;
       break
      }
    } else m = 0;
   while (0);
   m = (m | 0) == 0;
   do
    if (!o) {
     if ((c[n + 12 >> 2] | 0) == (c[n + 16 >> 2] | 0) ? (wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0) == -1 : 0) {
      c[e >> 2] = 0;
      z = 65;
      break
     }
     if (!m) z = 66
    } else z = 65;
   while (0);
   if ((z | 0) == 65 ? m : 0) z = 66;
   if ((z | 0) == 66) c[j >> 2] = c[j >> 2] | 2;
   b: do
    if ((f | 0) == (g | 0)) z = 70;
    else
     while (1) {
      if ((a[l >> 0] | 0) == 2) break b;
      f = f + 12 | 0;
      if ((f | 0) == (g | 0)) {
       z = 70;
       break
      } else l = l + 1 | 0
     }
    while (0);
   if ((z | 0) == 70) {
    c[j >> 2] = c[j >> 2] | 4;
    f = g
   }
   kj(y);
   i = A;
   return f | 0
  }

  function Dq(b, e, f, g, h, j) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0;
   A = i;
   i = i + 240 | 0;
   s = A + 202 | 0;
   k = A + 200 | 0;
   z = A + 24 | 0;
   y = A + 12 | 0;
   x = A + 8 | 0;
   w = A + 40 | 0;
   u = A + 4 | 0;
   t = A;
   v = mq(g) | 0;
   sl(z, g, s, k);
   c[y >> 2] = 0;
   c[y + 4 >> 2] = 0;
   c[y + 8 >> 2] = 0;
   if (!(a[y >> 0] & 1)) b = 10;
   else b = (c[y >> 2] & -2) + -1 | 0;
   yj(y, b, 0);
   p = y + 8 | 0;
   q = y + 1 | 0;
   n = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
   c[x >> 2] = n;
   c[u >> 2] = w;
   c[t >> 2] = 0;
   r = y + 4 | 0;
   o = a[k >> 0] | 0;
   b = c[e >> 2] | 0;
   k = n;
   a: while (1) {
    if (b) {
     if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
      c[e >> 2] = 0;
      b = 0
     }
    } else b = 0;
    g = (b | 0) == 0;
    l = c[f >> 2] | 0;
    do
     if (l) {
      if ((c[l + 12 >> 2] | 0) != (c[l + 16 >> 2] | 0))
       if (g) break;
       else break a;
      if ((wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) != -1)
       if (g) break;
       else break a;
      else {
       c[f >> 2] = 0;
       B = 13;
       break
      }
     } else B = 13;
    while (0);
    if ((B | 0) == 13) {
     B = 0;
     if (g) {
      l = 0;
      break
     } else l = 0
    }
    m = a[y >> 0] | 0;
    m = (m & 1) == 0 ? (m & 255) >>> 1 : c[r >> 2] | 0;
    if ((c[x >> 2] | 0) == (k + m | 0)) {
     yj(y, m << 1, 0);
     if (!(a[y >> 0] & 1)) g = 10;
     else g = (c[y >> 2] & -2) + -1 | 0;
     yj(y, g, 0);
     k = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
     c[x >> 2] = k + m
    }
    m = b + 12 | 0;
    g = c[m >> 2] | 0;
    n = b + 16 | 0;
    if ((g | 0) == (c[n >> 2] | 0)) g = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
    else g = d[g >> 0] | 0;
    if (cl(g & 255, v, k, x, t, o, z, w, u, s) | 0) break;
    g = c[m >> 2] | 0;
    if ((g | 0) == (c[n >> 2] | 0)) {
     wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
     continue
    } else {
     c[m >> 2] = g + 1;
     continue
    }
   }
   s = a[z >> 0] | 0;
   g = c[u >> 2] | 0;
   if ((((s & 1) == 0 ? (s & 255) >>> 1 : c[z + 4 >> 2] | 0) | 0) != 0 ? (g - w | 0) < 160 : 0) {
    s = c[t >> 2] | 0;
    t = g + 4 | 0;
    c[u >> 2] = t;
    c[g >> 2] = s;
    g = t
   }
   c[j >> 2] = ds(k, c[x >> 2] | 0, h, v) | 0;
   ao(z, w, g, h);
   if (b) {
    if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
     c[e >> 2] = 0;
     b = 0
    }
   } else b = 0;
   b = (b | 0) == 0;
   do
    if (l) {
     if ((c[l + 12 >> 2] | 0) == (c[l + 16 >> 2] | 0) ? (wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) == -1 : 0) {
      c[f >> 2] = 0;
      B = 38;
      break
     }
     if (!b) B = 39
    } else B = 38;
   while (0);
   if ((B | 0) == 38 ? b : 0) B = 39;
   if ((B | 0) == 39) c[h >> 2] = c[h >> 2] | 2;
   B = c[e >> 2] | 0;
   uj(y);
   uj(z);
   i = A;
   return B | 0
  }

  function Eq(b, e, f, g, h, j) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0;
   A = i;
   i = i + 240 | 0;
   s = A + 202 | 0;
   k = A + 200 | 0;
   z = A + 24 | 0;
   y = A + 12 | 0;
   x = A + 8 | 0;
   w = A + 40 | 0;
   u = A + 4 | 0;
   t = A;
   v = mq(g) | 0;
   sl(z, g, s, k);
   c[y >> 2] = 0;
   c[y + 4 >> 2] = 0;
   c[y + 8 >> 2] = 0;
   if (!(a[y >> 0] & 1)) b = 10;
   else b = (c[y >> 2] & -2) + -1 | 0;
   yj(y, b, 0);
   p = y + 8 | 0;
   q = y + 1 | 0;
   n = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
   c[x >> 2] = n;
   c[u >> 2] = w;
   c[t >> 2] = 0;
   r = y + 4 | 0;
   o = a[k >> 0] | 0;
   b = c[e >> 2] | 0;
   k = n;
   a: while (1) {
    if (b) {
     if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
      c[e >> 2] = 0;
      b = 0
     }
    } else b = 0;
    g = (b | 0) == 0;
    l = c[f >> 2] | 0;
    do
     if (l) {
      if ((c[l + 12 >> 2] | 0) != (c[l + 16 >> 2] | 0))
       if (g) break;
       else break a;
      if ((wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) != -1)
       if (g) break;
       else break a;
      else {
       c[f >> 2] = 0;
       B = 13;
       break
      }
     } else B = 13;
    while (0);
    if ((B | 0) == 13) {
     B = 0;
     if (g) {
      l = 0;
      break
     } else l = 0
    }
    m = a[y >> 0] | 0;
    m = (m & 1) == 0 ? (m & 255) >>> 1 : c[r >> 2] | 0;
    if ((c[x >> 2] | 0) == (k + m | 0)) {
     yj(y, m << 1, 0);
     if (!(a[y >> 0] & 1)) g = 10;
     else g = (c[y >> 2] & -2) + -1 | 0;
     yj(y, g, 0);
     k = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
     c[x >> 2] = k + m
    }
    m = b + 12 | 0;
    g = c[m >> 2] | 0;
    n = b + 16 | 0;
    if ((g | 0) == (c[n >> 2] | 0)) g = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
    else g = d[g >> 0] | 0;
    if (cl(g & 255, v, k, x, t, o, z, w, u, s) | 0) break;
    g = c[m >> 2] | 0;
    if ((g | 0) == (c[n >> 2] | 0)) {
     wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
     continue
    } else {
     c[m >> 2] = g + 1;
     continue
    }
   }
   s = a[z >> 0] | 0;
   g = c[u >> 2] | 0;
   if ((((s & 1) == 0 ? (s & 255) >>> 1 : c[z + 4 >> 2] | 0) | 0) != 0 ? (g - w | 0) < 160 : 0) {
    s = c[t >> 2] | 0;
    t = g + 4 | 0;
    c[u >> 2] = t;
    c[g >> 2] = s;
    g = t
   }
   x = cs(k, c[x >> 2] | 0, h, v) | 0;
   c[j >> 2] = x;
   c[j + 4 >> 2] = C;
   ao(z, w, g, h);
   if (b) {
    if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
     c[e >> 2] = 0;
     b = 0
    }
   } else b = 0;
   b = (b | 0) == 0;
   do
    if (l) {
     if ((c[l + 12 >> 2] | 0) == (c[l + 16 >> 2] | 0) ? (wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) == -1 : 0) {
      c[f >> 2] = 0;
      B = 38;
      break
     }
     if (!b) B = 39
    } else B = 38;
   while (0);
   if ((B | 0) == 38 ? b : 0) B = 39;
   if ((B | 0) == 39) c[h >> 2] = c[h >> 2] | 2;
   B = c[e >> 2] | 0;
   uj(y);
   uj(z);
   i = A;
   return B | 0
  }

  function Fq(e, f, g, h, j, k) {
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   k = k | 0;
   var l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0;
   B = i;
   i = i + 240 | 0;
   t = B + 202 | 0;
   l = B + 200 | 0;
   A = B + 24 | 0;
   z = B + 12 | 0;
   y = B + 8 | 0;
   x = B + 40 | 0;
   v = B + 4 | 0;
   u = B;
   w = mq(h) | 0;
   sl(A, h, t, l);
   c[z >> 2] = 0;
   c[z + 4 >> 2] = 0;
   c[z + 8 >> 2] = 0;
   if (!(a[z >> 0] & 1)) e = 10;
   else e = (c[z >> 2] & -2) + -1 | 0;
   yj(z, e, 0);
   q = z + 8 | 0;
   r = z + 1 | 0;
   o = (a[z >> 0] & 1) == 0 ? r : c[q >> 2] | 0;
   c[y >> 2] = o;
   c[v >> 2] = x;
   c[u >> 2] = 0;
   s = z + 4 | 0;
   p = a[l >> 0] | 0;
   e = c[f >> 2] | 0;
   l = o;
   a: while (1) {
    if (e) {
     if ((c[e + 12 >> 2] | 0) == (c[e + 16 >> 2] | 0) ? (wb[c[(c[e >> 2] | 0) + 36 >> 2] & 127](e) | 0) == -1 : 0) {
      c[f >> 2] = 0;
      e = 0
     }
    } else e = 0;
    h = (e | 0) == 0;
    m = c[g >> 2] | 0;
    do
     if (m) {
      if ((c[m + 12 >> 2] | 0) != (c[m + 16 >> 2] | 0))
       if (h) break;
       else break a;
      if ((wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) != -1)
       if (h) break;
       else break a;
      else {
       c[g >> 2] = 0;
       C = 13;
       break
      }
     } else C = 13;
    while (0);
    if ((C | 0) == 13) {
     C = 0;
     if (h) {
      m = 0;
      break
     } else m = 0
    }
    n = a[z >> 0] | 0;
    n = (n & 1) == 0 ? (n & 255) >>> 1 : c[s >> 2] | 0;
    if ((c[y >> 2] | 0) == (l + n | 0)) {
     yj(z, n << 1, 0);
     if (!(a[z >> 0] & 1)) h = 10;
     else h = (c[z >> 2] & -2) + -1 | 0;
     yj(z, h, 0);
     l = (a[z >> 0] & 1) == 0 ? r : c[q >> 2] | 0;
     c[y >> 2] = l + n
    }
    n = e + 12 | 0;
    h = c[n >> 2] | 0;
    o = e + 16 | 0;
    if ((h | 0) == (c[o >> 2] | 0)) h = wb[c[(c[e >> 2] | 0) + 36 >> 2] & 127](e) | 0;
    else h = d[h >> 0] | 0;
    if (cl(h & 255, w, l, y, u, p, A, x, v, t) | 0) break;
    h = c[n >> 2] | 0;
    if ((h | 0) == (c[o >> 2] | 0)) {
     wb[c[(c[e >> 2] | 0) + 40 >> 2] & 127](e) | 0;
     continue
    } else {
     c[n >> 2] = h + 1;
     continue
    }
   }
   t = a[A >> 0] | 0;
   h = c[v >> 2] | 0;
   if ((((t & 1) == 0 ? (t & 255) >>> 1 : c[A + 4 >> 2] | 0) | 0) != 0 ? (h - x | 0) < 160 : 0) {
    t = c[u >> 2] | 0;
    u = h + 4 | 0;
    c[v >> 2] = u;
    c[h >> 2] = t;
    h = u
   }
   b[k >> 1] = bs(l, c[y >> 2] | 0, j, w) | 0;
   ao(A, x, h, j);
   if (e) {
    if ((c[e + 12 >> 2] | 0) == (c[e + 16 >> 2] | 0) ? (wb[c[(c[e >> 2] | 0) + 36 >> 2] & 127](e) | 0) == -1 : 0) {
     c[f >> 2] = 0;
     e = 0
    }
   } else e = 0;
   e = (e | 0) == 0;
   do
    if (m) {
     if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0) ? (wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1 : 0) {
      c[g >> 2] = 0;
      C = 38;
      break
     }
     if (!e) C = 39
    } else C = 38;
   while (0);
   if ((C | 0) == 38 ? e : 0) C = 39;
   if ((C | 0) == 39) c[j >> 2] = c[j >> 2] | 2;
   C = c[f >> 2] | 0;
   uj(z);
   uj(A);
   i = B;
   return C | 0
  }

  function Gq(b, e, f, g, h, j) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0;
   A = i;
   i = i + 240 | 0;
   s = A + 202 | 0;
   k = A + 200 | 0;
   z = A + 24 | 0;
   y = A + 12 | 0;
   x = A + 8 | 0;
   w = A + 40 | 0;
   u = A + 4 | 0;
   t = A;
   v = mq(g) | 0;
   sl(z, g, s, k);
   c[y >> 2] = 0;
   c[y + 4 >> 2] = 0;
   c[y + 8 >> 2] = 0;
   if (!(a[y >> 0] & 1)) b = 10;
   else b = (c[y >> 2] & -2) + -1 | 0;
   yj(y, b, 0);
   p = y + 8 | 0;
   q = y + 1 | 0;
   n = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
   c[x >> 2] = n;
   c[u >> 2] = w;
   c[t >> 2] = 0;
   r = y + 4 | 0;
   o = a[k >> 0] | 0;
   b = c[e >> 2] | 0;
   k = n;
   a: while (1) {
    if (b) {
     if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
      c[e >> 2] = 0;
      b = 0
     }
    } else b = 0;
    g = (b | 0) == 0;
    l = c[f >> 2] | 0;
    do
     if (l) {
      if ((c[l + 12 >> 2] | 0) != (c[l + 16 >> 2] | 0))
       if (g) break;
       else break a;
      if ((wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) != -1)
       if (g) break;
       else break a;
      else {
       c[f >> 2] = 0;
       B = 13;
       break
      }
     } else B = 13;
    while (0);
    if ((B | 0) == 13) {
     B = 0;
     if (g) {
      l = 0;
      break
     } else l = 0
    }
    m = a[y >> 0] | 0;
    m = (m & 1) == 0 ? (m & 255) >>> 1 : c[r >> 2] | 0;
    if ((c[x >> 2] | 0) == (k + m | 0)) {
     yj(y, m << 1, 0);
     if (!(a[y >> 0] & 1)) g = 10;
     else g = (c[y >> 2] & -2) + -1 | 0;
     yj(y, g, 0);
     k = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
     c[x >> 2] = k + m
    }
    m = b + 12 | 0;
    g = c[m >> 2] | 0;
    n = b + 16 | 0;
    if ((g | 0) == (c[n >> 2] | 0)) g = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
    else g = d[g >> 0] | 0;
    if (cl(g & 255, v, k, x, t, o, z, w, u, s) | 0) break;
    g = c[m >> 2] | 0;
    if ((g | 0) == (c[n >> 2] | 0)) {
     wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
     continue
    } else {
     c[m >> 2] = g + 1;
     continue
    }
   }
   s = a[z >> 0] | 0;
   g = c[u >> 2] | 0;
   if ((((s & 1) == 0 ? (s & 255) >>> 1 : c[z + 4 >> 2] | 0) | 0) != 0 ? (g - w | 0) < 160 : 0) {
    s = c[t >> 2] | 0;
    t = g + 4 | 0;
    c[u >> 2] = t;
    c[g >> 2] = s;
    g = t
   }
   c[j >> 2] = as(k, c[x >> 2] | 0, h, v) | 0;
   ao(z, w, g, h);
   if (b) {
    if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
     c[e >> 2] = 0;
     b = 0
    }
   } else b = 0;
   b = (b | 0) == 0;
   do
    if (l) {
     if ((c[l + 12 >> 2] | 0) == (c[l + 16 >> 2] | 0) ? (wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) == -1 : 0) {
      c[f >> 2] = 0;
      B = 38;
      break
     }
     if (!b) B = 39
    } else B = 38;
   while (0);
   if ((B | 0) == 38 ? b : 0) B = 39;
   if ((B | 0) == 39) c[h >> 2] = c[h >> 2] | 2;
   B = c[e >> 2] | 0;
   uj(y);
   uj(z);
   i = A;
   return B | 0
  }

  function Hq(b, e, f, g, h, j) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0;
   A = i;
   i = i + 240 | 0;
   s = A + 202 | 0;
   k = A + 200 | 0;
   z = A + 24 | 0;
   y = A + 12 | 0;
   x = A + 8 | 0;
   w = A + 40 | 0;
   u = A + 4 | 0;
   t = A;
   v = mq(g) | 0;
   sl(z, g, s, k);
   c[y >> 2] = 0;
   c[y + 4 >> 2] = 0;
   c[y + 8 >> 2] = 0;
   if (!(a[y >> 0] & 1)) b = 10;
   else b = (c[y >> 2] & -2) + -1 | 0;
   yj(y, b, 0);
   p = y + 8 | 0;
   q = y + 1 | 0;
   n = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
   c[x >> 2] = n;
   c[u >> 2] = w;
   c[t >> 2] = 0;
   r = y + 4 | 0;
   o = a[k >> 0] | 0;
   b = c[e >> 2] | 0;
   k = n;
   a: while (1) {
    if (b) {
     if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
      c[e >> 2] = 0;
      b = 0
     }
    } else b = 0;
    g = (b | 0) == 0;
    l = c[f >> 2] | 0;
    do
     if (l) {
      if ((c[l + 12 >> 2] | 0) != (c[l + 16 >> 2] | 0))
       if (g) break;
       else break a;
      if ((wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) != -1)
       if (g) break;
       else break a;
      else {
       c[f >> 2] = 0;
       B = 13;
       break
      }
     } else B = 13;
    while (0);
    if ((B | 0) == 13) {
     B = 0;
     if (g) {
      l = 0;
      break
     } else l = 0
    }
    m = a[y >> 0] | 0;
    m = (m & 1) == 0 ? (m & 255) >>> 1 : c[r >> 2] | 0;
    if ((c[x >> 2] | 0) == (k + m | 0)) {
     yj(y, m << 1, 0);
     if (!(a[y >> 0] & 1)) g = 10;
     else g = (c[y >> 2] & -2) + -1 | 0;
     yj(y, g, 0);
     k = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
     c[x >> 2] = k + m
    }
    m = b + 12 | 0;
    g = c[m >> 2] | 0;
    n = b + 16 | 0;
    if ((g | 0) == (c[n >> 2] | 0)) g = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
    else g = d[g >> 0] | 0;
    if (cl(g & 255, v, k, x, t, o, z, w, u, s) | 0) break;
    g = c[m >> 2] | 0;
    if ((g | 0) == (c[n >> 2] | 0)) {
     wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
     continue
    } else {
     c[m >> 2] = g + 1;
     continue
    }
   }
   s = a[z >> 0] | 0;
   g = c[u >> 2] | 0;
   if ((((s & 1) == 0 ? (s & 255) >>> 1 : c[z + 4 >> 2] | 0) | 0) != 0 ? (g - w | 0) < 160 : 0) {
    s = c[t >> 2] | 0;
    t = g + 4 | 0;
    c[u >> 2] = t;
    c[g >> 2] = s;
    g = t
   }
   c[j >> 2] = $r(k, c[x >> 2] | 0, h, v) | 0;
   ao(z, w, g, h);
   if (b) {
    if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
     c[e >> 2] = 0;
     b = 0
    }
   } else b = 0;
   b = (b | 0) == 0;
   do
    if (l) {
     if ((c[l + 12 >> 2] | 0) == (c[l + 16 >> 2] | 0) ? (wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) == -1 : 0) {
      c[f >> 2] = 0;
      B = 38;
      break
     }
     if (!b) B = 39
    } else B = 38;
   while (0);
   if ((B | 0) == 38 ? b : 0) B = 39;
   if ((B | 0) == 39) c[h >> 2] = c[h >> 2] | 2;
   B = c[e >> 2] | 0;
   uj(y);
   uj(z);
   i = A;
   return B | 0
  }

  function Iq(b, e, f, g, h, j) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0;
   A = i;
   i = i + 240 | 0;
   s = A + 202 | 0;
   k = A + 200 | 0;
   z = A + 24 | 0;
   y = A + 12 | 0;
   x = A + 8 | 0;
   w = A + 40 | 0;
   u = A + 4 | 0;
   t = A;
   v = mq(g) | 0;
   sl(z, g, s, k);
   c[y >> 2] = 0;
   c[y + 4 >> 2] = 0;
   c[y + 8 >> 2] = 0;
   if (!(a[y >> 0] & 1)) b = 10;
   else b = (c[y >> 2] & -2) + -1 | 0;
   yj(y, b, 0);
   p = y + 8 | 0;
   q = y + 1 | 0;
   n = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
   c[x >> 2] = n;
   c[u >> 2] = w;
   c[t >> 2] = 0;
   r = y + 4 | 0;
   o = a[k >> 0] | 0;
   b = c[e >> 2] | 0;
   k = n;
   a: while (1) {
    if (b) {
     if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
      c[e >> 2] = 0;
      b = 0
     }
    } else b = 0;
    g = (b | 0) == 0;
    l = c[f >> 2] | 0;
    do
     if (l) {
      if ((c[l + 12 >> 2] | 0) != (c[l + 16 >> 2] | 0))
       if (g) break;
       else break a;
      if ((wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) != -1)
       if (g) break;
       else break a;
      else {
       c[f >> 2] = 0;
       B = 13;
       break
      }
     } else B = 13;
    while (0);
    if ((B | 0) == 13) {
     B = 0;
     if (g) {
      l = 0;
      break
     } else l = 0
    }
    m = a[y >> 0] | 0;
    m = (m & 1) == 0 ? (m & 255) >>> 1 : c[r >> 2] | 0;
    if ((c[x >> 2] | 0) == (k + m | 0)) {
     yj(y, m << 1, 0);
     if (!(a[y >> 0] & 1)) g = 10;
     else g = (c[y >> 2] & -2) + -1 | 0;
     yj(y, g, 0);
     k = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
     c[x >> 2] = k + m
    }
    m = b + 12 | 0;
    g = c[m >> 2] | 0;
    n = b + 16 | 0;
    if ((g | 0) == (c[n >> 2] | 0)) g = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
    else g = d[g >> 0] | 0;
    if (cl(g & 255, v, k, x, t, o, z, w, u, s) | 0) break;
    g = c[m >> 2] | 0;
    if ((g | 0) == (c[n >> 2] | 0)) {
     wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
     continue
    } else {
     c[m >> 2] = g + 1;
     continue
    }
   }
   s = a[z >> 0] | 0;
   g = c[u >> 2] | 0;
   if ((((s & 1) == 0 ? (s & 255) >>> 1 : c[z + 4 >> 2] | 0) | 0) != 0 ? (g - w | 0) < 160 : 0) {
    s = c[t >> 2] | 0;
    t = g + 4 | 0;
    c[u >> 2] = t;
    c[g >> 2] = s;
    g = t
   }
   x = _r(k, c[x >> 2] | 0, h, v) | 0;
   c[j >> 2] = x;
   c[j + 4 >> 2] = C;
   ao(z, w, g, h);
   if (b) {
    if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
     c[e >> 2] = 0;
     b = 0
    }
   } else b = 0;
   b = (b | 0) == 0;
   do
    if (l) {
     if ((c[l + 12 >> 2] | 0) == (c[l + 16 >> 2] | 0) ? (wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0) == -1 : 0) {
      c[f >> 2] = 0;
      B = 38;
      break
     }
     if (!b) B = 39
    } else B = 38;
   while (0);
   if ((B | 0) == 38 ? b : 0) B = 39;
   if ((B | 0) == 39) c[h >> 2] = c[h >> 2] | 2;
   B = c[e >> 2] | 0;
   uj(y);
   uj(z);
   i = A;
   return B | 0
  }

  function Jq(b, e, f, h, j, k) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   h = h | 0;
   j = j | 0;
   k = k | 0;
   var l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0;
   D = i;
   i = i + 240 | 0;
   v = D + 208 | 0;
   l = D + 203 | 0;
   m = D + 202 | 0;
   C = D + 24 | 0;
   B = D + 12 | 0;
   A = D + 8 | 0;
   z = D + 40 | 0;
   y = D + 4 | 0;
   x = D;
   w = D + 201 | 0;
   u = D + 200 | 0;
   tl(C, h, v, l, m);
   c[B >> 2] = 0;
   c[B + 4 >> 2] = 0;
   c[B + 8 >> 2] = 0;
   if (!(a[B >> 0] & 1)) b = 10;
   else b = (c[B >> 2] & -2) + -1 | 0;
   yj(B, b, 0);
   r = B + 8 | 0;
   s = B + 1 | 0;
   o = (a[B >> 0] & 1) == 0 ? s : c[r >> 2] | 0;
   c[A >> 2] = o;
   c[y >> 2] = z;
   c[x >> 2] = 0;
   a[w >> 0] = 1;
   a[u >> 0] = 69;
   t = B + 4 | 0;
   q = a[l >> 0] | 0;
   p = a[m >> 0] | 0;
   b = c[e >> 2] | 0;
   l = o;
   a: while (1) {
    if (b) {
     if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
      c[e >> 2] = 0;
      b = 0
     }
    } else b = 0;
    h = (b | 0) == 0;
    m = c[f >> 2] | 0;
    do
     if (m) {
      if ((c[m + 12 >> 2] | 0) != (c[m + 16 >> 2] | 0))
       if (h) break;
       else break a;
      if ((wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) != -1)
       if (h) break;
       else break a;
      else {
       c[f >> 2] = 0;
       E = 13;
       break
      }
     } else E = 13;
    while (0);
    if ((E | 0) == 13) {
     E = 0;
     if (h) {
      m = 0;
      break
     } else m = 0
    }
    n = a[B >> 0] | 0;
    n = (n & 1) == 0 ? (n & 255) >>> 1 : c[t >> 2] | 0;
    if ((c[A >> 2] | 0) == (l + n | 0)) {
     yj(B, n << 1, 0);
     if (!(a[B >> 0] & 1)) h = 10;
     else h = (c[B >> 2] & -2) + -1 | 0;
     yj(B, h, 0);
     l = (a[B >> 0] & 1) == 0 ? s : c[r >> 2] | 0;
     c[A >> 2] = l + n
    }
    n = b + 12 | 0;
    h = c[n >> 2] | 0;
    o = b + 16 | 0;
    if ((h | 0) == (c[o >> 2] | 0)) h = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
    else h = d[h >> 0] | 0;
    if (ul(h & 255, w, u, l, A, q, p, C, z, y, x, v) | 0) break;
    h = c[n >> 2] | 0;
    if ((h | 0) == (c[o >> 2] | 0)) {
     wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
     continue
    } else {
     c[n >> 2] = h + 1;
     continue
    }
   }
   v = a[C >> 0] | 0;
   h = c[y >> 2] | 0;
   if (!((a[w >> 0] | 0) == 0 ? 1 : (((v & 1) == 0 ? (v & 255) >>> 1 : c[C + 4 >> 2] | 0) | 0) == 0) ? (h - z | 0) < 160 : 0) {
    w = c[x >> 2] | 0;
    x = h + 4 | 0;
    c[y >> 2] = x;
    c[h >> 2] = w;
    h = x
   }
   g[k >> 2] = +Zr(l, c[A >> 2] | 0, j);
   ao(C, z, h, j);
   if (b) {
    if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
     c[e >> 2] = 0;
     b = 0
    }
   } else b = 0;
   b = (b | 0) == 0;
   do
    if (m) {
     if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0) ? (wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1 : 0) {
      c[f >> 2] = 0;
      E = 38;
      break
     }
     if (!b) E = 39
    } else E = 38;
   while (0);
   if ((E | 0) == 38 ? b : 0) E = 39;
   if ((E | 0) == 39) c[j >> 2] = c[j >> 2] | 2;
   E = c[e >> 2] | 0;
   uj(B);
   uj(C);
   i = D;
   return E | 0
  }

  function Kq(b, e, f, g, j, k) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   j = j | 0;
   k = k | 0;
   var l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0;
   D = i;
   i = i + 240 | 0;
   v = D + 208 | 0;
   l = D + 203 | 0;
   m = D + 202 | 0;
   C = D + 24 | 0;
   B = D + 12 | 0;
   A = D + 8 | 0;
   z = D + 40 | 0;
   y = D + 4 | 0;
   x = D;
   w = D + 201 | 0;
   u = D + 200 | 0;
   tl(C, g, v, l, m);
   c[B >> 2] = 0;
   c[B + 4 >> 2] = 0;
   c[B + 8 >> 2] = 0;
   if (!(a[B >> 0] & 1)) b = 10;
   else b = (c[B >> 2] & -2) + -1 | 0;
   yj(B, b, 0);
   r = B + 8 | 0;
   s = B + 1 | 0;
   o = (a[B >> 0] & 1) == 0 ? s : c[r >> 2] | 0;
   c[A >> 2] = o;
   c[y >> 2] = z;
   c[x >> 2] = 0;
   a[w >> 0] = 1;
   a[u >> 0] = 69;
   t = B + 4 | 0;
   q = a[l >> 0] | 0;
   p = a[m >> 0] | 0;
   b = c[e >> 2] | 0;
   l = o;
   a: while (1) {
    if (b) {
     if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
      c[e >> 2] = 0;
      b = 0
     }
    } else b = 0;
    g = (b | 0) == 0;
    m = c[f >> 2] | 0;
    do
     if (m) {
      if ((c[m + 12 >> 2] | 0) != (c[m + 16 >> 2] | 0))
       if (g) break;
       else break a;
      if ((wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) != -1)
       if (g) break;
       else break a;
      else {
       c[f >> 2] = 0;
       E = 13;
       break
      }
     } else E = 13;
    while (0);
    if ((E | 0) == 13) {
     E = 0;
     if (g) {
      m = 0;
      break
     } else m = 0
    }
    n = a[B >> 0] | 0;
    n = (n & 1) == 0 ? (n & 255) >>> 1 : c[t >> 2] | 0;
    if ((c[A >> 2] | 0) == (l + n | 0)) {
     yj(B, n << 1, 0);
     if (!(a[B >> 0] & 1)) g = 10;
     else g = (c[B >> 2] & -2) + -1 | 0;
     yj(B, g, 0);
     l = (a[B >> 0] & 1) == 0 ? s : c[r >> 2] | 0;
     c[A >> 2] = l + n
    }
    n = b + 12 | 0;
    g = c[n >> 2] | 0;
    o = b + 16 | 0;
    if ((g | 0) == (c[o >> 2] | 0)) g = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
    else g = d[g >> 0] | 0;
    if (ul(g & 255, w, u, l, A, q, p, C, z, y, x, v) | 0) break;
    g = c[n >> 2] | 0;
    if ((g | 0) == (c[o >> 2] | 0)) {
     wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
     continue
    } else {
     c[n >> 2] = g + 1;
     continue
    }
   }
   v = a[C >> 0] | 0;
   g = c[y >> 2] | 0;
   if (!((a[w >> 0] | 0) == 0 ? 1 : (((v & 1) == 0 ? (v & 255) >>> 1 : c[C + 4 >> 2] | 0) | 0) == 0) ? (g - z | 0) < 160 : 0) {
    w = c[x >> 2] | 0;
    x = g + 4 | 0;
    c[y >> 2] = x;
    c[g >> 2] = w;
    g = x
   }
   h[k >> 3] = +Yr(l, c[A >> 2] | 0, j);
   ao(C, z, g, j);
   if (b) {
    if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
     c[e >> 2] = 0;
     b = 0
    }
   } else b = 0;
   b = (b | 0) == 0;
   do
    if (m) {
     if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0) ? (wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1 : 0) {
      c[f >> 2] = 0;
      E = 38;
      break
     }
     if (!b) E = 39
    } else E = 38;
   while (0);
   if ((E | 0) == 38 ? b : 0) E = 39;
   if ((E | 0) == 39) c[j >> 2] = c[j >> 2] | 2;
   E = c[e >> 2] | 0;
   uj(B);
   uj(C);
   i = D;
   return E | 0
  }

  function Lq(b, e, f, g, j, k) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   j = j | 0;
   k = k | 0;
   var l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0,
    E = 0;
   D = i;
   i = i + 240 | 0;
   v = D + 208 | 0;
   l = D + 203 | 0;
   m = D + 202 | 0;
   C = D + 24 | 0;
   B = D + 12 | 0;
   A = D + 8 | 0;
   z = D + 40 | 0;
   y = D + 4 | 0;
   x = D;
   w = D + 201 | 0;
   u = D + 200 | 0;
   tl(C, g, v, l, m);
   c[B >> 2] = 0;
   c[B + 4 >> 2] = 0;
   c[B + 8 >> 2] = 0;
   if (!(a[B >> 0] & 1)) b = 10;
   else b = (c[B >> 2] & -2) + -1 | 0;
   yj(B, b, 0);
   r = B + 8 | 0;
   s = B + 1 | 0;
   o = (a[B >> 0] & 1) == 0 ? s : c[r >> 2] | 0;
   c[A >> 2] = o;
   c[y >> 2] = z;
   c[x >> 2] = 0;
   a[w >> 0] = 1;
   a[u >> 0] = 69;
   t = B + 4 | 0;
   q = a[l >> 0] | 0;
   p = a[m >> 0] | 0;
   b = c[e >> 2] | 0;
   l = o;
   a: while (1) {
    if (b) {
     if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
      c[e >> 2] = 0;
      b = 0
     }
    } else b = 0;
    g = (b | 0) == 0;
    m = c[f >> 2] | 0;
    do
     if (m) {
      if ((c[m + 12 >> 2] | 0) != (c[m + 16 >> 2] | 0))
       if (g) break;
       else break a;
      if ((wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) != -1)
       if (g) break;
       else break a;
      else {
       c[f >> 2] = 0;
       E = 13;
       break
      }
     } else E = 13;
    while (0);
    if ((E | 0) == 13) {
     E = 0;
     if (g) {
      m = 0;
      break
     } else m = 0
    }
    n = a[B >> 0] | 0;
    n = (n & 1) == 0 ? (n & 255) >>> 1 : c[t >> 2] | 0;
    if ((c[A >> 2] | 0) == (l + n | 0)) {
     yj(B, n << 1, 0);
     if (!(a[B >> 0] & 1)) g = 10;
     else g = (c[B >> 2] & -2) + -1 | 0;
     yj(B, g, 0);
     l = (a[B >> 0] & 1) == 0 ? s : c[r >> 2] | 0;
     c[A >> 2] = l + n
    }
    n = b + 12 | 0;
    g = c[n >> 2] | 0;
    o = b + 16 | 0;
    if ((g | 0) == (c[o >> 2] | 0)) g = wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0;
    else g = d[g >> 0] | 0;
    if (ul(g & 255, w, u, l, A, q, p, C, z, y, x, v) | 0) break;
    g = c[n >> 2] | 0;
    if ((g | 0) == (c[o >> 2] | 0)) {
     wb[c[(c[b >> 2] | 0) + 40 >> 2] & 127](b) | 0;
     continue
    } else {
     c[n >> 2] = g + 1;
     continue
    }
   }
   v = a[C >> 0] | 0;
   g = c[y >> 2] | 0;
   if (!((a[w >> 0] | 0) == 0 ? 1 : (((v & 1) == 0 ? (v & 255) >>> 1 : c[C + 4 >> 2] | 0) | 0) == 0) ? (g - z | 0) < 160 : 0) {
    w = c[x >> 2] | 0;
    x = g + 4 | 0;
    c[y >> 2] = x;
    c[g >> 2] = w;
    g = x
   }
   h[k >> 3] = +Xr(l, c[A >> 2] | 0, j);
   ao(C, z, g, j);
   if (b) {
    if ((c[b + 12 >> 2] | 0) == (c[b + 16 >> 2] | 0) ? (wb[c[(c[b >> 2] | 0) + 36 >> 2] & 127](b) | 0) == -1 : 0) {
     c[e >> 2] = 0;
     b = 0
    }
   } else b = 0;
   b = (b | 0) == 0;
   do
    if (m) {
     if ((c[m + 12 >> 2] | 0) == (c[m + 16 >> 2] | 0) ? (wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0) == -1 : 0) {
      c[f >> 2] = 0;
      E = 38;
      break
     }
     if (!b) E = 39
    } else E = 38;
   while (0);
   if ((E | 0) == 38 ? b : 0) E = 39;
   if ((E | 0) == 39) c[j >> 2] = c[j >> 2] | 2;
   E = c[e >> 2] | 0;
   uj(B);
   uj(C);
   i = D;
   return E | 0
  }

  function Mq(a, b, d, e) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0;
   f = i;
   i = i + 16 | 0;
   g = f;
   c[g >> 2] = e;
   e = ki(b) | 0;
   b = Qi(a, d, g) | 0;
   if (e) ki(e) | 0;
   i = f;
   return b | 0
  }

  function Nq(b, d, e, f, g, h, j) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0;
   y = i;
   i = i + 112 | 0;
   l = y;
   m = (f - e | 0) / 12 | 0;
   if (m >>> 0 > 100) {
    l = jj(m) | 0;
    if (!l) Rh();
    else {
     w = l;
     k = l
    }
   } else {
    w = 0;
    k = l
   }
   if ((e | 0) == (f | 0)) l = 0;
   else {
    p = e;
    n = 0;
    o = k;
    while (1) {
     l = a[p >> 0] | 0;
     if (!(l & 1)) l = (l & 255) >>> 1;
     else l = c[p + 4 >> 2] | 0;
     if (!l) {
      a[o >> 0] = 2;
      l = n + 1 | 0;
      m = m + -1 | 0
     } else {
      a[o >> 0] = 1;
      l = n
     }
     p = p + 12 | 0;
     if ((p | 0) == (f | 0)) break;
     else {
      n = l;
      o = o + 1 | 0
     }
    }
   }
   u = (e | 0) == (f | 0);
   v = (e | 0) == (f | 0);
   t = 0;
   q = m;
   a: while (1) {
    m = c[b >> 2] | 0;
    do
     if (m) {
      n = c[m + 12 >> 2] | 0;
      if ((n | 0) == (c[m + 16 >> 2] | 0)) m = wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0;
      else m = c[n >> 2] | 0;
      if ((m | 0) == -1) {
       c[b >> 2] = 0;
       p = 1;
       break
      } else {
       p = (c[b >> 2] | 0) == 0;
       break
      }
     } else p = 1;
    while (0);
    n = c[d >> 2] | 0;
    if (n) {
     m = c[n + 12 >> 2] | 0;
     if ((m | 0) == (c[n + 16 >> 2] | 0)) m = wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0;
     else m = c[m >> 2] | 0;
     if ((m | 0) == -1) {
      c[d >> 2] = 0;
      n = 0;
      o = 1
     } else o = 0
    } else {
     n = 0;
     o = 1
    }
    m = c[b >> 2] | 0;
    if (!((q | 0) != 0 & (p ^ o))) break;
    n = c[m + 12 >> 2] | 0;
    if ((n | 0) == (c[m + 16 >> 2] | 0)) m = wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0;
    else m = c[n >> 2] | 0;
    if (!j) m = Cb[c[(c[g >> 2] | 0) + 28 >> 2] & 15](g, m) | 0;
    s = t + 1 | 0;
    if (u) {
     m = 0;
     p = q
    } else {
     p = 0;
     r = e;
     o = q;
     q = k;
     while (1) {
      do
       if ((a[q >> 0] | 0) == 1) {
        if (!(a[r >> 0] & 1)) n = r + 4 | 0;
        else n = c[r + 8 >> 2] | 0;
        n = c[n + (t << 2) >> 2] | 0;
        if (!j) n = Cb[c[(c[g >> 2] | 0) + 28 >> 2] & 15](g, n) | 0;
        if ((m | 0) != (n | 0)) {
         a[q >> 0] = 0;
         n = p;
         o = o + -1 | 0;
         break
        }
        n = a[r >> 0] | 0;
        if (!(n & 1)) n = (n & 255) >>> 1;
        else n = c[r + 4 >> 2] | 0;
        if ((n | 0) == (s | 0)) {
         a[q >> 0] = 2;
         n = 1;
         l = l + 1 | 0;
         o = o + -1 | 0
        } else n = 1
       } else n = p;
      while (0);
      r = r + 12 | 0;
      if ((r | 0) == (f | 0)) {
       m = n;
       p = o;
       break
      } else {
       p = n;
       q = q + 1 | 0
      }
     }
    }
    if (!m) {
     t = s;
     q = p;
     continue
    }
    m = c[b >> 2] | 0;
    n = m + 12 | 0;
    o = c[n >> 2] | 0;
    if ((o | 0) == (c[m + 16 >> 2] | 0)) wb[c[(c[m >> 2] | 0) + 40 >> 2] & 127](m) | 0;
    else c[n >> 2] = o + 4;
    if ((l + p | 0) >>> 0 < 2 | v) {
     t = s;
     q = p;
     continue
    } else {
     m = e;
     o = k
    }
    while (1) {
     if ((a[o >> 0] | 0) == 2) {
      n = a[m >> 0] | 0;
      if (!(n & 1)) n = (n & 255) >>> 1;
      else n = c[m + 4 >> 2] | 0;
      if ((n | 0) != (s | 0)) {
       a[o >> 0] = 0;
       l = l + -1 | 0
      }
     }
     m = m + 12 | 0;
     if ((m | 0) == (f | 0)) {
      t = s;
      q = p;
      continue a
     } else o = o + 1 | 0
    }
   }
   do
    if (m) {
     l = c[m + 12 >> 2] | 0;
     if ((l | 0) == (c[m + 16 >> 2] | 0)) l = wb[c[(c[m >> 2] | 0) + 36 >> 2] & 127](m) | 0;
     else l = c[l >> 2] | 0;
     if ((l | 0) == -1) {
      c[b >> 2] = 0;
      m = 1;
      break
     } else {
      m = (c[b >> 2] | 0) == 0;
      break
     }
    } else m = 1;
   while (0);
   do
    if (n) {
     l = c[n + 12 >> 2] | 0;
     if ((l | 0) == (c[n + 16 >> 2] | 0)) l = wb[c[(c[n >> 2] | 0) + 36 >> 2] & 127](n) | 0;
     else l = c[l >> 2] | 0;
     if ((l | 0) != -1)
      if (m) break;
      else {
       x = 74;
       break
      } else {
      c[d >> 2] = 0;
      x = 72;
      break
     }
    } else x = 72;
   while (0);
   if ((x | 0) == 72 ? m : 0) x = 74;
   if ((x | 0) == 74) c[h >> 2] = c[h >> 2] | 2;
   b: do
    if ((e | 0) == (f | 0)) x = 78;
    else
     while (1) {
      if ((a[k >> 0] | 0) == 2) break b;
      e = e + 12 | 0;
      if ((e | 0) == (f | 0)) {
       x = 78;
       break
      } else k = k + 1 | 0
     }
    while (0);
   if ((x | 0) == 78) {
    c[h >> 2] = c[h >> 2] | 4;
    e = f
   }
   kj(w);
   i = y;
   return e | 0
  }

  function Oq(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0;
   z = i;
   i = i + 320 | 0;
   r = z + 208 | 0;
   j = z + 200 | 0;
   y = z + 24 | 0;
   x = z + 12 | 0;
   w = z + 8 | 0;
   v = z + 40 | 0;
   t = z + 4 | 0;
   s = z;
   u = mq(f) | 0;
   vl(y, f, r, j);
   c[x >> 2] = 0;
   c[x + 4 >> 2] = 0;
   c[x + 8 >> 2] = 0;
   if (!(a[x >> 0] & 1)) b = 10;
   else b = (c[x >> 2] & -2) + -1 | 0;
   yj(x, b, 0);
   o = x + 8 | 0;
   p = x + 1 | 0;
   f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
   c[w >> 2] = f;
   c[t >> 2] = v;
   c[s >> 2] = 0;
   q = x + 4 | 0;
   n = c[j >> 2] | 0;
   j = c[d >> 2] | 0;
   a: while (1) {
    if (j) {
     b = c[j + 12 >> 2] | 0;
     if ((b | 0) == (c[j + 16 >> 2] | 0)) b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
     else b = c[b >> 2] | 0;
     if ((b | 0) == -1) {
      c[d >> 2] = 0;
      j = 0;
      l = 1
     } else l = 0
    } else {
     j = 0;
     l = 1
    }
    k = c[e >> 2] | 0;
    do
     if (k) {
      b = c[k + 12 >> 2] | 0;
      if ((b | 0) == (c[k + 16 >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
      else b = c[b >> 2] | 0;
      if ((b | 0) != -1)
       if (l) {
        m = k;
        break
       } else break a;
      else {
       c[e >> 2] = 0;
       A = 16;
       break
      }
     } else A = 16;
    while (0);
    if ((A | 0) == 16) {
     A = 0;
     if (l) {
      k = 0;
      break
     } else m = 0
    }
    k = a[x >> 0] | 0;
    k = (k & 1) == 0 ? (k & 255) >>> 1 : c[q >> 2] | 0;
    if ((c[w >> 2] | 0) == (f + k | 0)) {
     yj(x, k << 1, 0);
     if (!(a[x >> 0] & 1)) b = 10;
     else b = (c[x >> 2] & -2) + -1 | 0;
     yj(x, b, 0);
     f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
     c[w >> 2] = f + k
    }
    k = j + 12 | 0;
    b = c[k >> 2] | 0;
    l = j + 16 | 0;
    if ((b | 0) == (c[l >> 2] | 0)) b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
    else b = c[b >> 2] | 0;
    if (rl(b, u, f, w, s, n, y, v, t, r) | 0) {
     k = m;
     break
    }
    b = c[k >> 2] | 0;
    if ((b | 0) == (c[l >> 2] | 0)) {
     wb[c[(c[j >> 2] | 0) + 40 >> 2] & 127](j) | 0;
     continue
    } else {
     c[k >> 2] = b + 4;
     continue
    }
   }
   r = a[y >> 0] | 0;
   b = c[t >> 2] | 0;
   if ((((r & 1) == 0 ? (r & 255) >>> 1 : c[y + 4 >> 2] | 0) | 0) != 0 ? (b - v | 0) < 160 : 0) {
    r = c[s >> 2] | 0;
    s = b + 4 | 0;
    c[t >> 2] = s;
    c[b >> 2] = r;
    b = s
   }
   c[h >> 2] = ds(f, c[w >> 2] | 0, g, u) | 0;
   ao(y, v, b, g);
   if (j) {
    b = c[j + 12 >> 2] | 0;
    if ((b | 0) == (c[j + 16 >> 2] | 0)) b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
    else b = c[b >> 2] | 0;
    if ((b | 0) == -1) {
     c[d >> 2] = 0;
     f = 1
    } else f = 0
   } else f = 1;
   do
    if (k) {
     b = c[k + 12 >> 2] | 0;
     if ((b | 0) == (c[k + 16 >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
     else b = c[b >> 2] | 0;
     if ((b | 0) != -1)
      if (f) break;
      else {
       A = 46;
       break
      } else {
      c[e >> 2] = 0;
      A = 44;
      break
     }
    } else A = 44;
   while (0);
   if ((A | 0) == 44 ? f : 0) A = 46;
   if ((A | 0) == 46) c[g >> 2] = c[g >> 2] | 2;
   A = c[d >> 2] | 0;
   uj(x);
   uj(y);
   i = z;
   return A | 0
  }

  function Pq(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0;
   z = i;
   i = i + 320 | 0;
   r = z + 208 | 0;
   j = z + 200 | 0;
   y = z + 24 | 0;
   x = z + 12 | 0;
   w = z + 8 | 0;
   v = z + 40 | 0;
   t = z + 4 | 0;
   s = z;
   u = mq(f) | 0;
   vl(y, f, r, j);
   c[x >> 2] = 0;
   c[x + 4 >> 2] = 0;
   c[x + 8 >> 2] = 0;
   if (!(a[x >> 0] & 1)) b = 10;
   else b = (c[x >> 2] & -2) + -1 | 0;
   yj(x, b, 0);
   o = x + 8 | 0;
   p = x + 1 | 0;
   f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
   c[w >> 2] = f;
   c[t >> 2] = v;
   c[s >> 2] = 0;
   q = x + 4 | 0;
   n = c[j >> 2] | 0;
   j = c[d >> 2] | 0;
   a: while (1) {
    if (j) {
     b = c[j + 12 >> 2] | 0;
     if ((b | 0) == (c[j + 16 >> 2] | 0)) b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
     else b = c[b >> 2] | 0;
     if ((b | 0) == -1) {
      c[d >> 2] = 0;
      j = 0;
      l = 1
     } else l = 0
    } else {
     j = 0;
     l = 1
    }
    k = c[e >> 2] | 0;
    do
     if (k) {
      b = c[k + 12 >> 2] | 0;
      if ((b | 0) == (c[k + 16 >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
      else b = c[b >> 2] | 0;
      if ((b | 0) != -1)
       if (l) {
        m = k;
        break
       } else break a;
      else {
       c[e >> 2] = 0;
       A = 16;
       break
      }
     } else A = 16;
    while (0);
    if ((A | 0) == 16) {
     A = 0;
     if (l) {
      k = 0;
      break
     } else m = 0
    }
    k = a[x >> 0] | 0;
    k = (k & 1) == 0 ? (k & 255) >>> 1 : c[q >> 2] | 0;
    if ((c[w >> 2] | 0) == (f + k | 0)) {
     yj(x, k << 1, 0);
     if (!(a[x >> 0] & 1)) b = 10;
     else b = (c[x >> 2] & -2) + -1 | 0;
     yj(x, b, 0);
     f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
     c[w >> 2] = f + k
    }
    k = j + 12 | 0;
    b = c[k >> 2] | 0;
    l = j + 16 | 0;
    if ((b | 0) == (c[l >> 2] | 0)) b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
    else b = c[b >> 2] | 0;
    if (rl(b, u, f, w, s, n, y, v, t, r) | 0) {
     k = m;
     break
    }
    b = c[k >> 2] | 0;
    if ((b | 0) == (c[l >> 2] | 0)) {
     wb[c[(c[j >> 2] | 0) + 40 >> 2] & 127](j) | 0;
     continue
    } else {
     c[k >> 2] = b + 4;
     continue
    }
   }
   r = a[y >> 0] | 0;
   b = c[t >> 2] | 0;
   if ((((r & 1) == 0 ? (r & 255) >>> 1 : c[y + 4 >> 2] | 0) | 0) != 0 ? (b - v | 0) < 160 : 0) {
    r = c[s >> 2] | 0;
    s = b + 4 | 0;
    c[t >> 2] = s;
    c[b >> 2] = r;
    b = s
   }
   w = cs(f, c[w >> 2] | 0, g, u) | 0;
   c[h >> 2] = w;
   c[h + 4 >> 2] = C;
   ao(y, v, b, g);
   if (j) {
    b = c[j + 12 >> 2] | 0;
    if ((b | 0) == (c[j + 16 >> 2] | 0)) b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
    else b = c[b >> 2] | 0;
    if ((b | 0) == -1) {
     c[d >> 2] = 0;
     f = 1
    } else f = 0
   } else f = 1;
   do
    if (k) {
     b = c[k + 12 >> 2] | 0;
     if ((b | 0) == (c[k + 16 >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
     else b = c[b >> 2] | 0;
     if ((b | 0) != -1)
      if (f) break;
      else {
       A = 46;
       break
      } else {
      c[e >> 2] = 0;
      A = 44;
      break
     }
    } else A = 44;
   while (0);
   if ((A | 0) == 44 ? f : 0) A = 46;
   if ((A | 0) == 46) c[g >> 2] = c[g >> 2] | 2;
   A = c[d >> 2] | 0;
   uj(x);
   uj(y);
   i = z;
   return A | 0
  }

  function Qq(d, e, f, g, h, j) {
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0;
   A = i;
   i = i + 320 | 0;
   s = A + 208 | 0;
   k = A + 200 | 0;
   z = A + 24 | 0;
   y = A + 12 | 0;
   x = A + 8 | 0;
   w = A + 40 | 0;
   u = A + 4 | 0;
   t = A;
   v = mq(g) | 0;
   vl(z, g, s, k);
   c[y >> 2] = 0;
   c[y + 4 >> 2] = 0;
   c[y + 8 >> 2] = 0;
   if (!(a[y >> 0] & 1)) d = 10;
   else d = (c[y >> 2] & -2) + -1 | 0;
   yj(y, d, 0);
   p = y + 8 | 0;
   q = y + 1 | 0;
   g = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
   c[x >> 2] = g;
   c[u >> 2] = w;
   c[t >> 2] = 0;
   r = y + 4 | 0;
   o = c[k >> 2] | 0;
   k = c[e >> 2] | 0;
   a: while (1) {
    if (k) {
     d = c[k + 12 >> 2] | 0;
     if ((d | 0) == (c[k + 16 >> 2] | 0)) d = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
     else d = c[d >> 2] | 0;
     if ((d | 0) == -1) {
      c[e >> 2] = 0;
      k = 0;
      m = 1
     } else m = 0
    } else {
     k = 0;
     m = 1
    }
    l = c[f >> 2] | 0;
    do
     if (l) {
      d = c[l + 12 >> 2] | 0;
      if ((d | 0) == (c[l + 16 >> 2] | 0)) d = wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0;
      else d = c[d >> 2] | 0;
      if ((d | 0) != -1)
       if (m) {
        n = l;
        break
       } else break a;
      else {
       c[f >> 2] = 0;
       B = 16;
       break
      }
     } else B = 16;
    while (0);
    if ((B | 0) == 16) {
     B = 0;
     if (m) {
      l = 0;
      break
     } else n = 0
    }
    l = a[y >> 0] | 0;
    l = (l & 1) == 0 ? (l & 255) >>> 1 : c[r >> 2] | 0;
    if ((c[x >> 2] | 0) == (g + l | 0)) {
     yj(y, l << 1, 0);
     if (!(a[y >> 0] & 1)) d = 10;
     else d = (c[y >> 2] & -2) + -1 | 0;
     yj(y, d, 0);
     g = (a[y >> 0] & 1) == 0 ? q : c[p >> 2] | 0;
     c[x >> 2] = g + l
    }
    l = k + 12 | 0;
    d = c[l >> 2] | 0;
    m = k + 16 | 0;
    if ((d | 0) == (c[m >> 2] | 0)) d = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
    else d = c[d >> 2] | 0;
    if (rl(d, v, g, x, t, o, z, w, u, s) | 0) {
     l = n;
     break
    }
    d = c[l >> 2] | 0;
    if ((d | 0) == (c[m >> 2] | 0)) {
     wb[c[(c[k >> 2] | 0) + 40 >> 2] & 127](k) | 0;
     continue
    } else {
     c[l >> 2] = d + 4;
     continue
    }
   }
   s = a[z >> 0] | 0;
   d = c[u >> 2] | 0;
   if ((((s & 1) == 0 ? (s & 255) >>> 1 : c[z + 4 >> 2] | 0) | 0) != 0 ? (d - w | 0) < 160 : 0) {
    s = c[t >> 2] | 0;
    t = d + 4 | 0;
    c[u >> 2] = t;
    c[d >> 2] = s;
    d = t
   }
   b[j >> 1] = bs(g, c[x >> 2] | 0, h, v) | 0;
   ao(z, w, d, h);
   if (k) {
    d = c[k + 12 >> 2] | 0;
    if ((d | 0) == (c[k + 16 >> 2] | 0)) d = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
    else d = c[d >> 2] | 0;
    if ((d | 0) == -1) {
     c[e >> 2] = 0;
     g = 1
    } else g = 0
   } else g = 1;
   do
    if (l) {
     d = c[l + 12 >> 2] | 0;
     if ((d | 0) == (c[l + 16 >> 2] | 0)) d = wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0;
     else d = c[d >> 2] | 0;
     if ((d | 0) != -1)
      if (g) break;
      else {
       B = 46;
       break
      } else {
      c[f >> 2] = 0;
      B = 44;
      break
     }
    } else B = 44;
   while (0);
   if ((B | 0) == 44 ? g : 0) B = 46;
   if ((B | 0) == 46) c[h >> 2] = c[h >> 2] | 2;
   B = c[e >> 2] | 0;
   uj(y);
   uj(z);
   i = A;
   return B | 0
  }

  function Rq(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0;
   z = i;
   i = i + 320 | 0;
   r = z + 208 | 0;
   j = z + 200 | 0;
   y = z + 24 | 0;
   x = z + 12 | 0;
   w = z + 8 | 0;
   v = z + 40 | 0;
   t = z + 4 | 0;
   s = z;
   u = mq(f) | 0;
   vl(y, f, r, j);
   c[x >> 2] = 0;
   c[x + 4 >> 2] = 0;
   c[x + 8 >> 2] = 0;
   if (!(a[x >> 0] & 1)) b = 10;
   else b = (c[x >> 2] & -2) + -1 | 0;
   yj(x, b, 0);
   o = x + 8 | 0;
   p = x + 1 | 0;
   f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
   c[w >> 2] = f;
   c[t >> 2] = v;
   c[s >> 2] = 0;
   q = x + 4 | 0;
   n = c[j >> 2] | 0;
   j = c[d >> 2] | 0;
   a: while (1) {
    if (j) {
     b = c[j + 12 >> 2] | 0;
     if ((b | 0) == (c[j + 16 >> 2] | 0)) b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
     else b = c[b >> 2] | 0;
     if ((b | 0) == -1) {
      c[d >> 2] = 0;
      j = 0;
      l = 1
     } else l = 0
    } else {
     j = 0;
     l = 1
    }
    k = c[e >> 2] | 0;
    do
     if (k) {
      b = c[k + 12 >> 2] | 0;
      if ((b | 0) == (c[k + 16 >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
      else b = c[b >> 2] | 0;
      if ((b | 0) != -1)
       if (l) {
        m = k;
        break
       } else break a;
      else {
       c[e >> 2] = 0;
       A = 16;
       break
      }
     } else A = 16;
    while (0);
    if ((A | 0) == 16) {
     A = 0;
     if (l) {
      k = 0;
      break
     } else m = 0
    }
    k = a[x >> 0] | 0;
    k = (k & 1) == 0 ? (k & 255) >>> 1 : c[q >> 2] | 0;
    if ((c[w >> 2] | 0) == (f + k | 0)) {
     yj(x, k << 1, 0);
     if (!(a[x >> 0] & 1)) b = 10;
     else b = (c[x >> 2] & -2) + -1 | 0;
     yj(x, b, 0);
     f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
     c[w >> 2] = f + k
    }
    k = j + 12 | 0;
    b = c[k >> 2] | 0;
    l = j + 16 | 0;
    if ((b | 0) == (c[l >> 2] | 0)) b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
    else b = c[b >> 2] | 0;
    if (rl(b, u, f, w, s, n, y, v, t, r) | 0) {
     k = m;
     break
    }
    b = c[k >> 2] | 0;
    if ((b | 0) == (c[l >> 2] | 0)) {
     wb[c[(c[j >> 2] | 0) + 40 >> 2] & 127](j) | 0;
     continue
    } else {
     c[k >> 2] = b + 4;
     continue
    }
   }
   r = a[y >> 0] | 0;
   b = c[t >> 2] | 0;
   if ((((r & 1) == 0 ? (r & 255) >>> 1 : c[y + 4 >> 2] | 0) | 0) != 0 ? (b - v | 0) < 160 : 0) {
    r = c[s >> 2] | 0;
    s = b + 4 | 0;
    c[t >> 2] = s;
    c[b >> 2] = r;
    b = s
   }
   c[h >> 2] = as(f, c[w >> 2] | 0, g, u) | 0;
   ao(y, v, b, g);
   if (j) {
    b = c[j + 12 >> 2] | 0;
    if ((b | 0) == (c[j + 16 >> 2] | 0)) b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
    else b = c[b >> 2] | 0;
    if ((b | 0) == -1) {
     c[d >> 2] = 0;
     f = 1
    } else f = 0
   } else f = 1;
   do
    if (k) {
     b = c[k + 12 >> 2] | 0;
     if ((b | 0) == (c[k + 16 >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
     else b = c[b >> 2] | 0;
     if ((b | 0) != -1)
      if (f) break;
      else {
       A = 46;
       break
      } else {
      c[e >> 2] = 0;
      A = 44;
      break
     }
    } else A = 44;
   while (0);
   if ((A | 0) == 44 ? f : 0) A = 46;
   if ((A | 0) == 46) c[g >> 2] = c[g >> 2] | 2;
   A = c[d >> 2] | 0;
   uj(x);
   uj(y);
   i = z;
   return A | 0
  }

  function Sq(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0;
   z = i;
   i = i + 320 | 0;
   r = z + 208 | 0;
   j = z + 200 | 0;
   y = z + 24 | 0;
   x = z + 12 | 0;
   w = z + 8 | 0;
   v = z + 40 | 0;
   t = z + 4 | 0;
   s = z;
   u = mq(f) | 0;
   vl(y, f, r, j);
   c[x >> 2] = 0;
   c[x + 4 >> 2] = 0;
   c[x + 8 >> 2] = 0;
   if (!(a[x >> 0] & 1)) b = 10;
   else b = (c[x >> 2] & -2) + -1 | 0;
   yj(x, b, 0);
   o = x + 8 | 0;
   p = x + 1 | 0;
   f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
   c[w >> 2] = f;
   c[t >> 2] = v;
   c[s >> 2] = 0;
   q = x + 4 | 0;
   n = c[j >> 2] | 0;
   j = c[d >> 2] | 0;
   a: while (1) {
    if (j) {
     b = c[j + 12 >> 2] | 0;
     if ((b | 0) == (c[j + 16 >> 2] | 0)) b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
     else b = c[b >> 2] | 0;
     if ((b | 0) == -1) {
      c[d >> 2] = 0;
      j = 0;
      l = 1
     } else l = 0
    } else {
     j = 0;
     l = 1
    }
    k = c[e >> 2] | 0;
    do
     if (k) {
      b = c[k + 12 >> 2] | 0;
      if ((b | 0) == (c[k + 16 >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
      else b = c[b >> 2] | 0;
      if ((b | 0) != -1)
       if (l) {
        m = k;
        break
       } else break a;
      else {
       c[e >> 2] = 0;
       A = 16;
       break
      }
     } else A = 16;
    while (0);
    if ((A | 0) == 16) {
     A = 0;
     if (l) {
      k = 0;
      break
     } else m = 0
    }
    k = a[x >> 0] | 0;
    k = (k & 1) == 0 ? (k & 255) >>> 1 : c[q >> 2] | 0;
    if ((c[w >> 2] | 0) == (f + k | 0)) {
     yj(x, k << 1, 0);
     if (!(a[x >> 0] & 1)) b = 10;
     else b = (c[x >> 2] & -2) + -1 | 0;
     yj(x, b, 0);
     f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
     c[w >> 2] = f + k
    }
    k = j + 12 | 0;
    b = c[k >> 2] | 0;
    l = j + 16 | 0;
    if ((b | 0) == (c[l >> 2] | 0)) b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
    else b = c[b >> 2] | 0;
    if (rl(b, u, f, w, s, n, y, v, t, r) | 0) {
     k = m;
     break
    }
    b = c[k >> 2] | 0;
    if ((b | 0) == (c[l >> 2] | 0)) {
     wb[c[(c[j >> 2] | 0) + 40 >> 2] & 127](j) | 0;
     continue
    } else {
     c[k >> 2] = b + 4;
     continue
    }
   }
   r = a[y >> 0] | 0;
   b = c[t >> 2] | 0;
   if ((((r & 1) == 0 ? (r & 255) >>> 1 : c[y + 4 >> 2] | 0) | 0) != 0 ? (b - v | 0) < 160 : 0) {
    r = c[s >> 2] | 0;
    s = b + 4 | 0;
    c[t >> 2] = s;
    c[b >> 2] = r;
    b = s
   }
   c[h >> 2] = $r(f, c[w >> 2] | 0, g, u) | 0;
   ao(y, v, b, g);
   if (j) {
    b = c[j + 12 >> 2] | 0;
    if ((b | 0) == (c[j + 16 >> 2] | 0)) b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
    else b = c[b >> 2] | 0;
    if ((b | 0) == -1) {
     c[d >> 2] = 0;
     f = 1
    } else f = 0
   } else f = 1;
   do
    if (k) {
     b = c[k + 12 >> 2] | 0;
     if ((b | 0) == (c[k + 16 >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
     else b = c[b >> 2] | 0;
     if ((b | 0) != -1)
      if (f) break;
      else {
       A = 46;
       break
      } else {
      c[e >> 2] = 0;
      A = 44;
      break
     }
    } else A = 44;
   while (0);
   if ((A | 0) == 44 ? f : 0) A = 46;
   if ((A | 0) == 46) c[g >> 2] = c[g >> 2] | 2;
   A = c[d >> 2] | 0;
   uj(x);
   uj(y);
   i = z;
   return A | 0
  }

  function Tq(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0;
   z = i;
   i = i + 320 | 0;
   r = z + 208 | 0;
   j = z + 200 | 0;
   y = z + 24 | 0;
   x = z + 12 | 0;
   w = z + 8 | 0;
   v = z + 40 | 0;
   t = z + 4 | 0;
   s = z;
   u = mq(f) | 0;
   vl(y, f, r, j);
   c[x >> 2] = 0;
   c[x + 4 >> 2] = 0;
   c[x + 8 >> 2] = 0;
   if (!(a[x >> 0] & 1)) b = 10;
   else b = (c[x >> 2] & -2) + -1 | 0;
   yj(x, b, 0);
   o = x + 8 | 0;
   p = x + 1 | 0;
   f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
   c[w >> 2] = f;
   c[t >> 2] = v;
   c[s >> 2] = 0;
   q = x + 4 | 0;
   n = c[j >> 2] | 0;
   j = c[d >> 2] | 0;
   a: while (1) {
    if (j) {
     b = c[j + 12 >> 2] | 0;
     if ((b | 0) == (c[j + 16 >> 2] | 0)) b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
     else b = c[b >> 2] | 0;
     if ((b | 0) == -1) {
      c[d >> 2] = 0;
      j = 0;
      l = 1
     } else l = 0
    } else {
     j = 0;
     l = 1
    }
    k = c[e >> 2] | 0;
    do
     if (k) {
      b = c[k + 12 >> 2] | 0;
      if ((b | 0) == (c[k + 16 >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
      else b = c[b >> 2] | 0;
      if ((b | 0) != -1)
       if (l) {
        m = k;
        break
       } else break a;
      else {
       c[e >> 2] = 0;
       A = 16;
       break
      }
     } else A = 16;
    while (0);
    if ((A | 0) == 16) {
     A = 0;
     if (l) {
      k = 0;
      break
     } else m = 0
    }
    k = a[x >> 0] | 0;
    k = (k & 1) == 0 ? (k & 255) >>> 1 : c[q >> 2] | 0;
    if ((c[w >> 2] | 0) == (f + k | 0)) {
     yj(x, k << 1, 0);
     if (!(a[x >> 0] & 1)) b = 10;
     else b = (c[x >> 2] & -2) + -1 | 0;
     yj(x, b, 0);
     f = (a[x >> 0] & 1) == 0 ? p : c[o >> 2] | 0;
     c[w >> 2] = f + k
    }
    k = j + 12 | 0;
    b = c[k >> 2] | 0;
    l = j + 16 | 0;
    if ((b | 0) == (c[l >> 2] | 0)) b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
    else b = c[b >> 2] | 0;
    if (rl(b, u, f, w, s, n, y, v, t, r) | 0) {
     k = m;
     break
    }
    b = c[k >> 2] | 0;
    if ((b | 0) == (c[l >> 2] | 0)) {
     wb[c[(c[j >> 2] | 0) + 40 >> 2] & 127](j) | 0;
     continue
    } else {
     c[k >> 2] = b + 4;
     continue
    }
   }
   r = a[y >> 0] | 0;
   b = c[t >> 2] | 0;
   if ((((r & 1) == 0 ? (r & 255) >>> 1 : c[y + 4 >> 2] | 0) | 0) != 0 ? (b - v | 0) < 160 : 0) {
    r = c[s >> 2] | 0;
    s = b + 4 | 0;
    c[t >> 2] = s;
    c[b >> 2] = r;
    b = s
   }
   w = _r(f, c[w >> 2] | 0, g, u) | 0;
   c[h >> 2] = w;
   c[h + 4 >> 2] = C;
   ao(y, v, b, g);
   if (j) {
    b = c[j + 12 >> 2] | 0;
    if ((b | 0) == (c[j + 16 >> 2] | 0)) b = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
    else b = c[b >> 2] | 0;
    if ((b | 0) == -1) {
     c[d >> 2] = 0;
     f = 1
    } else f = 0
   } else f = 1;
   do
    if (k) {
     b = c[k + 12 >> 2] | 0;
     if ((b | 0) == (c[k + 16 >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
     else b = c[b >> 2] | 0;
     if ((b | 0) != -1)
      if (f) break;
      else {
       A = 46;
       break
      } else {
      c[e >> 2] = 0;
      A = 44;
      break
     }
    } else A = 44;
   while (0);
   if ((A | 0) == 44 ? f : 0) A = 46;
   if ((A | 0) == 46) c[g >> 2] = c[g >> 2] | 2;
   A = c[d >> 2] | 0;
   uj(x);
   uj(y);
   i = z;
   return A | 0
  }

  function Uq(b, d, e, f, h, j) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   h = h | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0;
   C = i;
   i = i + 352 | 0;
   u = C + 208 | 0;
   k = C + 40 | 0;
   l = C + 36 | 0;
   B = C + 24 | 0;
   A = C + 12 | 0;
   z = C + 8 | 0;
   y = C + 48 | 0;
   x = C + 4 | 0;
   w = C;
   v = C + 337 | 0;
   t = C + 336 | 0;
   wl(B, f, u, k, l);
   c[A >> 2] = 0;
   c[A + 4 >> 2] = 0;
   c[A + 8 >> 2] = 0;
   if (!(a[A >> 0] & 1)) b = 10;
   else b = (c[A >> 2] & -2) + -1 | 0;
   yj(A, b, 0);
   q = A + 8 | 0;
   r = A + 1 | 0;
   f = (a[A >> 0] & 1) == 0 ? r : c[q >> 2] | 0;
   c[z >> 2] = f;
   c[x >> 2] = y;
   c[w >> 2] = 0;
   a[v >> 0] = 1;
   a[t >> 0] = 69;
   s = A + 4 | 0;
   p = c[k >> 2] | 0;
   o = c[l >> 2] | 0;
   k = c[d >> 2] | 0;
   a: while (1) {
    if (k) {
     b = c[k + 12 >> 2] | 0;
     if ((b | 0) == (c[k + 16 >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
     else b = c[b >> 2] | 0;
     if ((b | 0) == -1) {
      c[d >> 2] = 0;
      k = 0;
      m = 1
     } else m = 0
    } else {
     k = 0;
     m = 1
    }
    l = c[e >> 2] | 0;
    do
     if (l) {
      b = c[l + 12 >> 2] | 0;
      if ((b | 0) == (c[l + 16 >> 2] | 0)) b = wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0;
      else b = c[b >> 2] | 0;
      if ((b | 0) != -1)
       if (m) break;
       else break a;
      else {
       c[e >> 2] = 0;
       D = 16;
       break
      }
     } else D = 16;
    while (0);
    if ((D | 0) == 16) {
     D = 0;
     if (m) {
      l = 0;
      break
     } else l = 0
    }
    m = a[A >> 0] | 0;
    m = (m & 1) == 0 ? (m & 255) >>> 1 : c[s >> 2] | 0;
    if ((c[z >> 2] | 0) == (f + m | 0)) {
     yj(A, m << 1, 0);
     if (!(a[A >> 0] & 1)) b = 10;
     else b = (c[A >> 2] & -2) + -1 | 0;
     yj(A, b, 0);
     f = (a[A >> 0] & 1) == 0 ? r : c[q >> 2] | 0;
     c[z >> 2] = f + m
    }
    m = k + 12 | 0;
    b = c[m >> 2] | 0;
    n = k + 16 | 0;
    if ((b | 0) == (c[n >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
    else b = c[b >> 2] | 0;
    if (xl(b, v, t, f, z, p, o, B, y, x, w, u) | 0) break;
    b = c[m >> 2] | 0;
    if ((b | 0) == (c[n >> 2] | 0)) {
     wb[c[(c[k >> 2] | 0) + 40 >> 2] & 127](k) | 0;
     continue
    } else {
     c[m >> 2] = b + 4;
     continue
    }
   }
   u = a[B >> 0] | 0;
   b = c[x >> 2] | 0;
   if (!((a[v >> 0] | 0) == 0 ? 1 : (((u & 1) == 0 ? (u & 255) >>> 1 : c[B + 4 >> 2] | 0) | 0) == 0) ? (b - y | 0) < 160 : 0) {
    v = c[w >> 2] | 0;
    w = b + 4 | 0;
    c[x >> 2] = w;
    c[b >> 2] = v;
    b = w
   }
   g[j >> 2] = +Zr(f, c[z >> 2] | 0, h);
   ao(B, y, b, h);
   if (k) {
    b = c[k + 12 >> 2] | 0;
    if ((b | 0) == (c[k + 16 >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
    else b = c[b >> 2] | 0;
    if ((b | 0) == -1) {
     c[d >> 2] = 0;
     f = 1
    } else f = 0
   } else f = 1;
   do
    if (l) {
     b = c[l + 12 >> 2] | 0;
     if ((b | 0) == (c[l + 16 >> 2] | 0)) b = wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0;
     else b = c[b >> 2] | 0;
     if ((b | 0) != -1)
      if (f) break;
      else {
       D = 46;
       break
      } else {
      c[e >> 2] = 0;
      D = 44;
      break
     }
    } else D = 44;
   while (0);
   if ((D | 0) == 44 ? f : 0) D = 46;
   if ((D | 0) == 46) c[h >> 2] = c[h >> 2] | 2;
   D = c[d >> 2] | 0;
   uj(A);
   uj(B);
   i = C;
   return D | 0
  }

  function Vq(b, d, e, f, g, j) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0;
   C = i;
   i = i + 352 | 0;
   u = C + 208 | 0;
   k = C + 40 | 0;
   l = C + 36 | 0;
   B = C + 24 | 0;
   A = C + 12 | 0;
   z = C + 8 | 0;
   y = C + 48 | 0;
   x = C + 4 | 0;
   w = C;
   v = C + 337 | 0;
   t = C + 336 | 0;
   wl(B, f, u, k, l);
   c[A >> 2] = 0;
   c[A + 4 >> 2] = 0;
   c[A + 8 >> 2] = 0;
   if (!(a[A >> 0] & 1)) b = 10;
   else b = (c[A >> 2] & -2) + -1 | 0;
   yj(A, b, 0);
   q = A + 8 | 0;
   r = A + 1 | 0;
   f = (a[A >> 0] & 1) == 0 ? r : c[q >> 2] | 0;
   c[z >> 2] = f;
   c[x >> 2] = y;
   c[w >> 2] = 0;
   a[v >> 0] = 1;
   a[t >> 0] = 69;
   s = A + 4 | 0;
   p = c[k >> 2] | 0;
   o = c[l >> 2] | 0;
   k = c[d >> 2] | 0;
   a: while (1) {
    if (k) {
     b = c[k + 12 >> 2] | 0;
     if ((b | 0) == (c[k + 16 >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
     else b = c[b >> 2] | 0;
     if ((b | 0) == -1) {
      c[d >> 2] = 0;
      k = 0;
      m = 1
     } else m = 0
    } else {
     k = 0;
     m = 1
    }
    l = c[e >> 2] | 0;
    do
     if (l) {
      b = c[l + 12 >> 2] | 0;
      if ((b | 0) == (c[l + 16 >> 2] | 0)) b = wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0;
      else b = c[b >> 2] | 0;
      if ((b | 0) != -1)
       if (m) break;
       else break a;
      else {
       c[e >> 2] = 0;
       D = 16;
       break
      }
     } else D = 16;
    while (0);
    if ((D | 0) == 16) {
     D = 0;
     if (m) {
      l = 0;
      break
     } else l = 0
    }
    m = a[A >> 0] | 0;
    m = (m & 1) == 0 ? (m & 255) >>> 1 : c[s >> 2] | 0;
    if ((c[z >> 2] | 0) == (f + m | 0)) {
     yj(A, m << 1, 0);
     if (!(a[A >> 0] & 1)) b = 10;
     else b = (c[A >> 2] & -2) + -1 | 0;
     yj(A, b, 0);
     f = (a[A >> 0] & 1) == 0 ? r : c[q >> 2] | 0;
     c[z >> 2] = f + m
    }
    m = k + 12 | 0;
    b = c[m >> 2] | 0;
    n = k + 16 | 0;
    if ((b | 0) == (c[n >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
    else b = c[b >> 2] | 0;
    if (xl(b, v, t, f, z, p, o, B, y, x, w, u) | 0) break;
    b = c[m >> 2] | 0;
    if ((b | 0) == (c[n >> 2] | 0)) {
     wb[c[(c[k >> 2] | 0) + 40 >> 2] & 127](k) | 0;
     continue
    } else {
     c[m >> 2] = b + 4;
     continue
    }
   }
   u = a[B >> 0] | 0;
   b = c[x >> 2] | 0;
   if (!((a[v >> 0] | 0) == 0 ? 1 : (((u & 1) == 0 ? (u & 255) >>> 1 : c[B + 4 >> 2] | 0) | 0) == 0) ? (b - y | 0) < 160 : 0) {
    v = c[w >> 2] | 0;
    w = b + 4 | 0;
    c[x >> 2] = w;
    c[b >> 2] = v;
    b = w
   }
   h[j >> 3] = +Yr(f, c[z >> 2] | 0, g);
   ao(B, y, b, g);
   if (k) {
    b = c[k + 12 >> 2] | 0;
    if ((b | 0) == (c[k + 16 >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
    else b = c[b >> 2] | 0;
    if ((b | 0) == -1) {
     c[d >> 2] = 0;
     f = 1
    } else f = 0
   } else f = 1;
   do
    if (l) {
     b = c[l + 12 >> 2] | 0;
     if ((b | 0) == (c[l + 16 >> 2] | 0)) b = wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0;
     else b = c[b >> 2] | 0;
     if ((b | 0) != -1)
      if (f) break;
      else {
       D = 46;
       break
      } else {
      c[e >> 2] = 0;
      D = 44;
      break
     }
    } else D = 44;
   while (0);
   if ((D | 0) == 44 ? f : 0) D = 46;
   if ((D | 0) == 46) c[g >> 2] = c[g >> 2] | 2;
   D = c[d >> 2] | 0;
   uj(A);
   uj(B);
   i = C;
   return D | 0
  }

  function Wq(b, d, e, f, g, j) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   j = j | 0;
   var k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0,
    s = 0,
    t = 0,
    u = 0,
    v = 0,
    w = 0,
    x = 0,
    y = 0,
    z = 0,
    A = 0,
    B = 0,
    C = 0,
    D = 0;
   C = i;
   i = i + 352 | 0;
   u = C + 208 | 0;
   k = C + 40 | 0;
   l = C + 36 | 0;
   B = C + 24 | 0;
   A = C + 12 | 0;
   z = C + 8 | 0;
   y = C + 48 | 0;
   x = C + 4 | 0;
   w = C;
   v = C + 337 | 0;
   t = C + 336 | 0;
   wl(B, f, u, k, l);
   c[A >> 2] = 0;
   c[A + 4 >> 2] = 0;
   c[A + 8 >> 2] = 0;
   if (!(a[A >> 0] & 1)) b = 10;
   else b = (c[A >> 2] & -2) + -1 | 0;
   yj(A, b, 0);
   q = A + 8 | 0;
   r = A + 1 | 0;
   f = (a[A >> 0] & 1) == 0 ? r : c[q >> 2] | 0;
   c[z >> 2] = f;
   c[x >> 2] = y;
   c[w >> 2] = 0;
   a[v >> 0] = 1;
   a[t >> 0] = 69;
   s = A + 4 | 0;
   p = c[k >> 2] | 0;
   o = c[l >> 2] | 0;
   k = c[d >> 2] | 0;
   a: while (1) {
    if (k) {
     b = c[k + 12 >> 2] | 0;
     if ((b | 0) == (c[k + 16 >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
     else b = c[b >> 2] | 0;
     if ((b | 0) == -1) {
      c[d >> 2] = 0;
      k = 0;
      m = 1
     } else m = 0
    } else {
     k = 0;
     m = 1
    }
    l = c[e >> 2] | 0;
    do
     if (l) {
      b = c[l + 12 >> 2] | 0;
      if ((b | 0) == (c[l + 16 >> 2] | 0)) b = wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0;
      else b = c[b >> 2] | 0;
      if ((b | 0) != -1)
       if (m) break;
       else break a;
      else {
       c[e >> 2] = 0;
       D = 16;
       break
      }
     } else D = 16;
    while (0);
    if ((D | 0) == 16) {
     D = 0;
     if (m) {
      l = 0;
      break
     } else l = 0
    }
    m = a[A >> 0] | 0;
    m = (m & 1) == 0 ? (m & 255) >>> 1 : c[s >> 2] | 0;
    if ((c[z >> 2] | 0) == (f + m | 0)) {
     yj(A, m << 1, 0);
     if (!(a[A >> 0] & 1)) b = 10;
     else b = (c[A >> 2] & -2) + -1 | 0;
     yj(A, b, 0);
     f = (a[A >> 0] & 1) == 0 ? r : c[q >> 2] | 0;
     c[z >> 2] = f + m
    }
    m = k + 12 | 0;
    b = c[m >> 2] | 0;
    n = k + 16 | 0;
    if ((b | 0) == (c[n >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
    else b = c[b >> 2] | 0;
    if (xl(b, v, t, f, z, p, o, B, y, x, w, u) | 0) break;
    b = c[m >> 2] | 0;
    if ((b | 0) == (c[n >> 2] | 0)) {
     wb[c[(c[k >> 2] | 0) + 40 >> 2] & 127](k) | 0;
     continue
    } else {
     c[m >> 2] = b + 4;
     continue
    }
   }
   u = a[B >> 0] | 0;
   b = c[x >> 2] | 0;
   if (!((a[v >> 0] | 0) == 0 ? 1 : (((u & 1) == 0 ? (u & 255) >>> 1 : c[B + 4 >> 2] | 0) | 0) == 0) ? (b - y | 0) < 160 : 0) {
    v = c[w >> 2] | 0;
    w = b + 4 | 0;
    c[x >> 2] = w;
    c[b >> 2] = v;
    b = w
   }
   h[j >> 3] = +Xr(f, c[z >> 2] | 0, g);
   ao(B, y, b, g);
   if (k) {
    b = c[k + 12 >> 2] | 0;
    if ((b | 0) == (c[k + 16 >> 2] | 0)) b = wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0;
    else b = c[b >> 2] | 0;
    if ((b | 0) == -1) {
     c[d >> 2] = 0;
     f = 1
    } else f = 0
   } else f = 1;
   do
    if (l) {
     b = c[l + 12 >> 2] | 0;
     if ((b | 0) == (c[l + 16 >> 2] | 0)) b = wb[c[(c[l >> 2] | 0) + 36 >> 2] & 127](l) | 0;
     else b = c[b >> 2] | 0;
     if ((b | 0) != -1)
      if (f) break;
      else {
       D = 46;
       break
      } else {
      c[e >> 2] = 0;
      D = 44;
      break
     }
    } else D = 44;
   while (0);
   if ((D | 0) == 44 ? f : 0) D = 46;
   if ((D | 0) == 46) c[g >> 2] = c[g >> 2] | 2;
   D = c[d >> 2] | 0;
   uj(A);
   uj(B);
   i = C;
   return D | 0
  }

  function Xq(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0;
   g = i;
   i = i + 16 | 0;
   h = g;
   c[h >> 2] = f;
   f = ki(d) | 0;
   d = Pi(a, b, e, h) | 0;
   if (f) ki(f) | 0;
   i = g;
   return d | 0
  }

  function Yq(a, b, d, e) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0;
   f = i;
   i = i + 16 | 0;
   g = f;
   c[g >> 2] = e;
   e = ki(b) | 0;
   b = Mi(a, d, g) | 0;
   if (e) ki(e) | 0;
   i = f;
   return b | 0
  }

  function Zq(b, d, e, f, g, h) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0;
   o = i;
   i = i + 16 | 0;
   n = o;
   j = c[b >> 2] | 0;
   a: do
    if (!j) j = 0;
    else {
     p = d;
     l = f - p >> 2;
     m = g + 12 | 0;
     g = c[m >> 2] | 0;
     l = (g | 0) > (l | 0) ? g - l | 0 : 0;
     g = e;
     p = g - p | 0;
     k = p >> 2;
     if ((p | 0) > 0 ? (pb[c[(c[j >> 2] | 0) + 48 >> 2] & 31](j, d, k) | 0) != (k | 0) : 0) {
      c[b >> 2] = 0;
      j = 0;
      break
     }
     do
      if ((l | 0) > 0) {
       Ij(n, l, h);
       if ((pb[c[(c[j >> 2] | 0) + 48 >> 2] & 31](j, (a[n >> 0] & 1) == 0 ? n + 4 | 0 : c[n + 8 >> 2] | 0, l) | 0) == (l | 0)) {
        Jj(n);
        break
       } else {
        c[b >> 2] = 0;
        Jj(n);
        j = 0;
        break a
       }
      }
     while (0);
     p = f - g | 0;
     f = p >> 2;
     if ((p | 0) > 0 ? (pb[c[(c[j >> 2] | 0) + 48 >> 2] & 31](j, e, f) | 0) != (f | 0) : 0) {
      c[b >> 2] = 0;
      j = 0;
      break
     }
     c[m >> 2] = 0
    }
   while (0);
   i = o;
   return j | 0
  }

  function _q(a, e, f, g, h) {
   a = a | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   var i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0;
   i = c[a >> 2] | 0;
   do
    if (i) {
     if ((c[i + 12 >> 2] | 0) == (c[i + 16 >> 2] | 0))
      if ((wb[c[(c[i >> 2] | 0) + 36 >> 2] & 127](i) | 0) == -1) {
       c[a >> 2] = 0;
       i = 0;
       break
      } else {
       i = c[a >> 2] | 0;
       break
      }
    } else i = 0;
   while (0);
   j = (i | 0) == 0;
   i = c[e >> 2] | 0;
   do
    if (i) {
     if ((c[i + 12 >> 2] | 0) == (c[i + 16 >> 2] | 0) ? (wb[c[(c[i >> 2] | 0) + 36 >> 2] & 127](i) | 0) == -1 : 0) {
      c[e >> 2] = 0;
      r = 11;
      break
     }
     if (j) r = 13;
     else r = 12
    } else r = 11;
   while (0);
   if ((r | 0) == 11)
    if (j) r = 12;
    else {
     i = 0;
     r = 13
    }
   a: do
    if ((r | 0) == 12) {
     c[f >> 2] = c[f >> 2] | 6;
     i = 0
    } else
   if ((r | 0) == 13) {
    j = c[a >> 2] | 0;
    k = c[j + 12 >> 2] | 0;
    if ((k | 0) == (c[j + 16 >> 2] | 0)) j = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
    else j = d[k >> 0] | 0;
    k = j & 255;
    if (k << 24 >> 24 > -1 ? (q = g + 8 | 0, (b[(c[q >> 2] | 0) + (j << 24 >> 24 << 1) >> 1] & 2048) != 0) : 0) {
     m = (pb[c[(c[g >> 2] | 0) + 36 >> 2] & 31](g, k, 0) | 0) << 24 >> 24;
     j = c[a >> 2] | 0;
     k = j + 12 | 0;
     l = c[k >> 2] | 0;
     if ((l | 0) == (c[j + 16 >> 2] | 0)) {
      wb[c[(c[j >> 2] | 0) + 40 >> 2] & 127](j) | 0;
      o = h;
      n = i;
      h = i;
      i = m
     } else {
      c[k >> 2] = l + 1;
      o = h;
      n = i;
      h = i;
      i = m
     }
     while (1) {
      i = i + -48 | 0;
      p = o + -1 | 0;
      j = c[a >> 2] | 0;
      do
       if (j) {
        if ((c[j + 12 >> 2] | 0) == (c[j + 16 >> 2] | 0))
         if ((wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0) == -1) {
          c[a >> 2] = 0;
          j = 0;
          break
         } else {
          j = c[a >> 2] | 0;
          break
         }
       } else j = 0;
      while (0);
      l = (j | 0) == 0;
      if (h)
       if ((c[h + 12 >> 2] | 0) == (c[h + 16 >> 2] | 0))
        if ((wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0) == -1) {
         c[e >> 2] = 0;
         k = 0;
         h = 0
        } else {
         k = n;
         h = n
        } else k = n;
      else {
       k = n;
       h = 0
      }
      j = c[a >> 2] | 0;
      if (!((o | 0) > 1 & (l ^ (h | 0) == 0))) break;
      l = c[j + 12 >> 2] | 0;
      if ((l | 0) == (c[j + 16 >> 2] | 0)) j = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
      else j = d[l >> 0] | 0;
      l = j & 255;
      if (l << 24 >> 24 <= -1) break a;
      if (!(b[(c[q >> 2] | 0) + (j << 24 >> 24 << 1) >> 1] & 2048)) break a;
      i = ((pb[c[(c[g >> 2] | 0) + 36 >> 2] & 31](g, l, 0) | 0) << 24 >> 24) + (i * 10 | 0) | 0;
      j = c[a >> 2] | 0;
      l = j + 12 | 0;
      m = c[l >> 2] | 0;
      if ((m | 0) == (c[j + 16 >> 2] | 0)) {
       wb[c[(c[j >> 2] | 0) + 40 >> 2] & 127](j) | 0;
       o = p;
       n = k;
       continue
      } else {
       c[l >> 2] = m + 1;
       o = p;
       n = k;
       continue
      }
     }
     do
      if (j) {
       if ((c[j + 12 >> 2] | 0) == (c[j + 16 >> 2] | 0))
        if ((wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0) == -1) {
         c[a >> 2] = 0;
         j = 0;
         break
        } else {
         j = c[a >> 2] | 0;
         break
        }
      } else j = 0;
     while (0);
     j = (j | 0) == 0;
     do
      if (k) {
       if ((c[k + 12 >> 2] | 0) == (c[k + 16 >> 2] | 0) ? (wb[c[(c[k >> 2] | 0) + 36 >> 2] & 127](k) | 0) == -1 : 0) {
        c[e >> 2] = 0;
        r = 50;
        break
       }
       if (j) break a
      } else r = 50;
     while (0);
     if ((r | 0) == 50 ? !j : 0) break;
     c[f >> 2] = c[f >> 2] | 2;
     break
    }
    c[f >> 2] = c[f >> 2] | 4;
    i = 0
   }
   while (0);
   return i | 0
  }

  function $q(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0;
   g = c[a >> 2] | 0;
   do
    if (g) {
     h = c[g + 12 >> 2] | 0;
     if ((h | 0) == (c[g + 16 >> 2] | 0)) g = wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0;
     else g = c[h >> 2] | 0;
     if ((g | 0) == -1) {
      c[a >> 2] = 0;
      i = 1;
      break
     } else {
      i = (c[a >> 2] | 0) == 0;
      break
     }
    } else i = 1;
   while (0);
   h = c[b >> 2] | 0;
   do
    if (h) {
     g = c[h + 12 >> 2] | 0;
     if ((g | 0) == (c[h + 16 >> 2] | 0)) g = wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0;
     else g = c[g >> 2] | 0;
     if ((g | 0) != -1)
      if (i) {
       o = 17;
       break
      } else {
       o = 16;
       break
      } else {
      c[b >> 2] = 0;
      o = 14;
      break
     }
    } else o = 14;
   while (0);
   if ((o | 0) == 14)
    if (i) o = 16;
    else {
     h = 0;
     o = 17
    }
   a: do
    if ((o | 0) == 16) {
     c[d >> 2] = c[d >> 2] | 6;
     g = 0
    } else
   if ((o | 0) == 17) {
    g = c[a >> 2] | 0;
    i = c[g + 12 >> 2] | 0;
    if ((i | 0) == (c[g + 16 >> 2] | 0)) g = wb[c[(c[g >> 2] | 0) + 36 >> 2] & 127](g) | 0;
    else g = c[i >> 2] | 0;
    if (!(pb[c[(c[e >> 2] | 0) + 12 >> 2] & 31](e, 2048, g) | 0)) {
     c[d >> 2] = c[d >> 2] | 4;
     g = 0;
     break
    }
    g = (pb[c[(c[e >> 2] | 0) + 52 >> 2] & 31](e, g, 0) | 0) << 24 >> 24;
    i = c[a >> 2] | 0;
    j = i + 12 | 0;
    k = c[j >> 2] | 0;
    if ((k | 0) == (c[i + 16 >> 2] | 0)) {
     wb[c[(c[i >> 2] | 0) + 40 >> 2] & 127](i) | 0;
     m = f;
     l = h;
     j = h
    } else {
     c[j >> 2] = k + 4;
     m = f;
     l = h;
     j = h
    }
    while (1) {
     g = g + -48 | 0;
     n = m + -1 | 0;
     h = c[a >> 2] | 0;
     do
      if (h) {
       i = c[h + 12 >> 2] | 0;
       if ((i | 0) == (c[h + 16 >> 2] | 0)) h = wb[c[(c[h >> 2] | 0) + 36 >> 2] & 127](h) | 0;
       else h = c[i >> 2] | 0;
       if ((h | 0) == -1) {
        c[a >> 2] = 0;
        k = 1;
        break
       } else {
        k = (c[a >> 2] | 0) == 0;
        break
       }
      } else k = 1;
     while (0);
     do
      if (j) {
       h = c[j + 12 >> 2] | 0;
       if ((h | 0) == (c[j + 16 >> 2] | 0)) h = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
       else h = c[h >> 2] | 0;
       if ((h | 0) == -1) {
        c[b >> 2] = 0;
        j = 0;
        f = 0;
        h = 1;
        break
       } else {
        j = l;
        f = l;
        h = (l | 0) == 0;
        break
       }
      } else {
       j = l;
       f = 0;
       h = 1
      }
     while (0);
     i = c[a >> 2] | 0;
     if (!((m | 0) > 1 & (k ^ h))) break;
     h = c[i + 12 >> 2] | 0;
     if ((h | 0) == (c[i + 16 >> 2] | 0)) h = wb[c[(c[i >> 2] | 0) + 36 >> 2] & 127](i) | 0;
     else h = c[h >> 2] | 0;
     if (!(pb[c[(c[e >> 2] | 0) + 12 >> 2] & 31](e, 2048, h) | 0)) break a;
     g = ((pb[c[(c[e >> 2] | 0) + 52 >> 2] & 31](e, h, 0) | 0) << 24 >> 24) + (g * 10 | 0) | 0;
     h = c[a >> 2] | 0;
     i = h + 12 | 0;
     k = c[i >> 2] | 0;
     if ((k | 0) == (c[h + 16 >> 2] | 0)) {
      wb[c[(c[h >> 2] | 0) + 40 >> 2] & 127](h) | 0;
      m = n;
      l = j;
      j = f;
      continue
     } else {
      c[i >> 2] = k + 4;
      m = n;
      l = j;
      j = f;
      continue
     }
    }
    do
     if (i) {
      h = c[i + 12 >> 2] | 0;
      if ((h | 0) == (c[i + 16 >> 2] | 0)) h = wb[c[(c[i >> 2] | 0) + 36 >> 2] & 127](i) | 0;
      else h = c[h >> 2] | 0;
      if ((h | 0) == -1) {
       c[a >> 2] = 0;
       i = 1;
       break
      } else {
       i = (c[a >> 2] | 0) == 0;
       break
      }
     } else i = 1;
    while (0);
    do
     if (j) {
      h = c[j + 12 >> 2] | 0;
      if ((h | 0) == (c[j + 16 >> 2] | 0)) h = wb[c[(c[j >> 2] | 0) + 36 >> 2] & 127](j) | 0;
      else h = c[h >> 2] | 0;
      if ((h | 0) != -1)
       if (i) break a;
       else break;
      else {
       c[b >> 2] = 0;
       o = 60;
       break
      }
     } else o = 60;
    while (0);
    if ((o | 0) == 60 ? !i : 0) break;
    c[d >> 2] = c[d >> 2] | 2
   }
   while (0);
   return g | 0
  }

  function ar(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0;
   h = a + 4 | 0;
   f = (c[h >> 2] | 0) != 144;
   e = c[a >> 2] | 0;
   i = e;
   g = (c[d >> 2] | 0) - i | 0;
   g = g >>> 0 < 2147483647 ? g << 1 : -1;
   i = (c[b >> 2] | 0) - i | 0;
   e = mj(f ? e : 0, g) | 0;
   if (!e) Rh();
   if (!f) {
    f = c[a >> 2] | 0;
    c[a >> 2] = e;
    if (f) {
     sb[c[h >> 2] & 255](f);
     e = c[a >> 2] | 0
    }
   } else c[a >> 2] = e;
   c[h >> 2] = 147;
   c[b >> 2] = e + i;
   c[d >> 2] = (c[a >> 2] | 0) + g;
   return
  }

  function br(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0;
   h = a + 4 | 0;
   f = (c[h >> 2] | 0) != 144;
   e = c[a >> 2] | 0;
   i = e;
   g = (c[d >> 2] | 0) - i | 0;
   g = g >>> 0 < 2147483647 ? g << 1 : -1;
   i = (c[b >> 2] | 0) - i >> 2;
   e = mj(f ? e : 0, g) | 0;
   if (!e) Rh();
   if (!f) {
    f = c[a >> 2] | 0;
    c[a >> 2] = e;
    if (f) {
     sb[c[h >> 2] & 255](f);
     e = c[a >> 2] | 0
    }
   } else c[a >> 2] = e;
   c[h >> 2] = 147;
   c[b >> 2] = e + (i << 2);
   c[d >> 2] = (c[a >> 2] | 0) + (g >>> 2 << 2);
   return
  }

  function cr(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0;
   h = d;
   f = a[b >> 0] | 0;
   if (!(f & 1)) {
    g = 10;
    k = (f & 255) >>> 1
   } else {
    f = c[b >> 2] | 0;
    g = (f & -2) + -1 | 0;
    k = c[b + 4 >> 2] | 0;
    f = f & 255
   }
   j = e - h | 0;
   do
    if ((e | 0) != (d | 0)) {
     if ((g - k | 0) >>> 0 < j >>> 0) {
      Fj(b, g, k + j - g | 0, k, k, 0, 0);
      f = a[b >> 0] | 0
     }
     if (!(f & 1)) i = b + 1 | 0;
     else i = c[b + 8 >> 2] | 0;
     h = e + (k - h) | 0;
     if ((d | 0) != (e | 0)) {
      f = d;
      g = i + k | 0;
      while (1) {
       a[g >> 0] = a[f >> 0] | 0;
       f = f + 1 | 0;
       if ((f | 0) == (e | 0)) break;
       else g = g + 1 | 0
      }
     }
     a[i + h >> 0] = 0;
     f = k + j | 0;
     if (!(a[b >> 0] & 1)) {
      a[b >> 0] = f << 1;
      break
     } else {
      c[b + 4 >> 2] = f;
      break
     }
    }
   while (0);
   return b | 0
  }

  function dr(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0;
   h = a + 4 | 0;
   f = (c[h >> 2] | 0) != 144;
   e = c[a >> 2] | 0;
   i = e;
   g = (c[d >> 2] | 0) - i | 0;
   g = g >>> 0 < 2147483647 ? g << 1 : -1;
   i = (c[b >> 2] | 0) - i >> 2;
   e = mj(f ? e : 0, g) | 0;
   if (!e) Rh();
   if (!f) {
    f = c[a >> 2] | 0;
    c[a >> 2] = e;
    if (f) {
     sb[c[h >> 2] & 255](f);
     e = c[a >> 2] | 0
    }
   } else c[a >> 2] = e;
   c[h >> 2] = 147;
   c[b >> 2] = e + (i << 2);
   c[d >> 2] = (c[a >> 2] | 0) + (g >>> 2 << 2);
   return
  }

  function er(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0;
   h = d;
   f = a[b >> 0] | 0;
   if (!(f & 1)) {
    g = 1;
    k = (f & 255) >>> 1
   } else {
    f = c[b >> 2] | 0;
    g = (f & -2) + -1 | 0;
    k = c[b + 4 >> 2] | 0;
    f = f & 255
   }
   j = e - h >> 2;
   do
    if (j) {
     if ((g - k | 0) >>> 0 < j >>> 0) {
      Pj(b, g, k + j - g | 0, k, k, 0, 0);
      f = a[b >> 0] | 0
     }
     if (!(f & 1)) i = b + 4 | 0;
     else i = c[b + 8 >> 2] | 0;
     h = k + ((e - h | 0) >>> 2) | 0;
     if ((d | 0) != (e | 0)) {
      f = d;
      g = i + (k << 2) | 0;
      while (1) {
       c[g >> 2] = c[f >> 2];
       f = f + 4 | 0;
       if ((f | 0) == (e | 0)) break;
       else g = g + 4 | 0
      }
     }
     c[i + (h << 2) >> 2] = 0;
     f = k + j | 0;
     if (!(a[b >> 0] & 1)) {
      a[b >> 0] = f << 1;
      break
     } else {
      c[b + 4 >> 2] = f;
      break
     }
    }
   while (0);
   return b | 0
  }

  function fr(b, d) {
   b = b | 0;
   d = d | 0;
   c[b >> 2] = 0;
   c[b + 4 >> 2] = 0;
   c[b + 8 >> 2] = 0;
   a[b + 128 >> 0] = 0;
   if (d) {
    Wr(b, d);
    Sr(b, d)
   }
   return
  }

  function gr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(8264) | 0);
   return
  }

  function hr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(8304) | 0);
   return
  }

  function ir(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(9336) | 0);
   return
  }

  function jr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(9328) | 0);
   return
  }

  function kr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(9396) | 0);
   return
  }

  function lr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(9404) | 0);
   return
  }

  function mr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(9460) | 0);
   return
  }

  function nr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(9468) | 0);
   return
  }

  function or(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(9476) | 0);
   return
  }

  function pr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(9484) | 0);
   return
  }

  function qr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(8376) | 0);
   return
  }

  function rr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(8448) | 0);
   return
  }

  function sr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(8508) | 0);
   return
  }

  function tr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(8568) | 0);
   return
  }

  function ur(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(8880) | 0);
   return
  }

  function vr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(8944) | 0);
   return
  }

  function wr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(9008) | 0);
   return
  }

  function xr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(9072) | 0);
   return
  }

  function yr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(9108) | 0);
   return
  }

  function zr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(9144) | 0);
   return
  }

  function Ar(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(9180) | 0);
   return
  }

  function Br(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(9216) | 0);
   return
  }

  function Cr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(8660) | 0);
   return
  }

  function Dr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(8752) | 0);
   return
  }

  function Er(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(8784) | 0);
   return
  }

  function Fr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(8816) | 0);
   return
  }

  function Gr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(9256) | 0);
   return
  }

  function Hr(a, b) {
   a = a | 0;
   b = b | 0;
   Go(a, b, Po(9296) | 0);
   return
  }

  function Ir(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0;
   h = a + 4 | 0;
   d = c[h >> 2] | 0;
   e = c[a >> 2] | 0;
   f = d - e >> 2;
   if (f >>> 0 >= b >>> 0) {
    if (f >>> 0 > b >>> 0 ? (g = e + (b << 2) | 0, (d | 0) != (g | 0)) : 0) {
     do d = d + -4 | 0; while ((d | 0) != (g | 0));
     c[h >> 2] = d
    }
   } else Rr(a, b - f | 0);
   return
  }

  function Jr(b) {
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0;
   e = c[b >> 2] | 0;
   do
    if (e) {
     f = b + 4 | 0;
     d = c[f >> 2] | 0;
     if ((d | 0) != (e | 0)) {
      do d = d + -4 | 0; while ((d | 0) != (e | 0));
      c[f >> 2] = d
     }
     if ((b + 16 | 0) == (e | 0)) {
      a[b + 128 >> 0] = 0;
      break
     } else {
      mh(e);
      break
     }
    }
   while (0);
   return
  }

  function Kr(a) {
   a = a | 0;
   var b = 0,
    d = 0;
   d = a + 4 | 0;
   b = c[d >> 2] | 0;
   d = c[d + 4 >> 2] | 0;
   a = (c[a >> 2] | 0) + (d >> 1) | 0;
   if (d & 1) b = c[(c[a >> 2] | 0) + b >> 2] | 0;
   sb[b & 255](a);
   return
  }

  function Lr(d, f, g, h, i, j, k, l) {
   d = d | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   i = i | 0;
   j = j | 0;
   k = k | 0;
   l = l | 0;
   var m = 0,
    n = 0;
   c[g >> 2] = d;
   c[j >> 2] = h;
   if (l & 2)
    if ((i - h | 0) < 3) d = 1;
    else {
     c[j >> 2] = h + 1;
     a[h >> 0] = -17;
     m = c[j >> 2] | 0;
     c[j >> 2] = m + 1;
     a[m >> 0] = -69;
     m = c[j >> 2] | 0;
     c[j >> 2] = m + 1;
     a[m >> 0] = -65;
     m = 4
    } else m = 4;
   a: do
    if ((m | 0) == 4) {
     n = f;
     d = c[g >> 2] | 0;
     if (d >>> 0 < f >>> 0)
      while (1) {
       l = b[d >> 1] | 0;
       m = l & 65535;
       if (m >>> 0 > k >>> 0) {
        d = 2;
        break a
       }
       do
        if ((l & 65535) < 128) {
         d = c[j >> 2] | 0;
         if ((i - d | 0) < 1) {
          d = 1;
          break a
         }
         c[j >> 2] = d + 1;
         a[d >> 0] = l
        } else {
         if ((l & 65535) < 2048) {
          d = c[j >> 2] | 0;
          if ((i - d | 0) < 2) {
           d = 1;
           break a
          }
          c[j >> 2] = d + 1;
          a[d >> 0] = m >>> 6 | 192;
          h = c[j >> 2] | 0;
          c[j >> 2] = h + 1;
          a[h >> 0] = m & 63 | 128;
          break
         }
         if ((l & 65535) < 55296) {
          d = c[j >> 2] | 0;
          if ((i - d | 0) < 3) {
           d = 1;
           break a
          }
          c[j >> 2] = d + 1;
          a[d >> 0] = m >>> 12 | 224;
          h = c[j >> 2] | 0;
          c[j >> 2] = h + 1;
          a[h >> 0] = m >>> 6 & 63 | 128;
          h = c[j >> 2] | 0;
          c[j >> 2] = h + 1;
          a[h >> 0] = m & 63 | 128;
          break
         }
         if ((l & 65535) >= 56320) {
          if ((l & 65535) < 57344) {
           d = 2;
           break a
          }
          d = c[j >> 2] | 0;
          if ((i - d | 0) < 3) {
           d = 1;
           break a
          }
          c[j >> 2] = d + 1;
          a[d >> 0] = m >>> 12 | 224;
          h = c[j >> 2] | 0;
          c[j >> 2] = h + 1;
          a[h >> 0] = m >>> 6 & 63 | 128;
          h = c[j >> 2] | 0;
          c[j >> 2] = h + 1;
          a[h >> 0] = m & 63 | 128;
          break
         }
         if ((n - d | 0) < 4) {
          d = 1;
          break a
         }
         d = d + 2 | 0;
         l = e[d >> 1] | 0;
         if ((l & 64512 | 0) != 56320) {
          d = 2;
          break a
         }
         if ((i - (c[j >> 2] | 0) | 0) < 4) {
          d = 1;
          break a
         }
         h = m & 960;
         if (((h << 10) + 65536 | m << 10 & 64512 | l & 1023) >>> 0 > k >>> 0) {
          d = 2;
          break a
         }
         c[g >> 2] = d;
         d = (h >>> 6) + 1 | 0;
         h = c[j >> 2] | 0;
         c[j >> 2] = h + 1;
         a[h >> 0] = d >>> 2 | 240;
         h = c[j >> 2] | 0;
         c[j >> 2] = h + 1;
         a[h >> 0] = m >>> 2 & 15 | d << 4 & 48 | 128;
         h = c[j >> 2] | 0;
         c[j >> 2] = h + 1;
         a[h >> 0] = m << 4 & 48 | l >>> 6 & 15 | 128;
         m = c[j >> 2] | 0;
         c[j >> 2] = m + 1;
         a[m >> 0] = l & 63 | 128
        }
       while (0);
       d = (c[g >> 2] | 0) + 2 | 0;
       c[g >> 2] = d;
       if (d >>> 0 >= f >>> 0) {
        d = 0;
        break
       }
      } else d = 0
    }
   while (0);
   return d | 0
  }

  function Mr(e, f, g, h, i, j, k, l) {
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   i = i | 0;
   j = j | 0;
   k = k | 0;
   l = l | 0;
   var m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0,
    r = 0;
   c[g >> 2] = e;
   c[j >> 2] = h;
   if (l & 4) {
    e = c[g >> 2] | 0;
    l = f;
    if ((((l - e | 0) > 2 ? (a[e >> 0] | 0) == -17 : 0) ? (a[e + 1 >> 0] | 0) == -69 : 0) ? (a[e + 2 >> 0] | 0) == -65 : 0) {
     c[g >> 2] = e + 3;
     m = c[j >> 2] | 0
    } else m = h
   } else {
    m = h;
    l = f
   }
   q = i;
   h = c[g >> 2] | 0;
   e = h >>> 0 < f >>> 0;
   a: do
    if (e & m >>> 0 < i >>> 0)
     while (1) {
      e = a[h >> 0] | 0;
      o = e & 255;
      if (o >>> 0 > k >>> 0) {
       e = 2;
       break a
      }
      do
       if (e << 24 >> 24 > -1) {
        b[m >> 1] = e & 255;
        c[g >> 2] = h + 1
       } else {
        if ((e & 255) < 194) {
         e = 2;
         break a
        }
        if ((e & 255) < 224) {
         if ((l - h | 0) < 2) {
          e = 1;
          break a
         }
         e = d[h + 1 >> 0] | 0;
         if ((e & 192 | 0) != 128) {
          e = 2;
          break a
         }
         e = e & 63 | o << 6 & 1984;
         if (e >>> 0 > k >>> 0) {
          e = 2;
          break a
         }
         b[m >> 1] = e;
         c[g >> 2] = h + 2;
         break
        }
        if ((e & 255) < 240) {
         if ((l - h | 0) < 3) {
          e = 1;
          break a
         }
         n = a[h + 1 >> 0] | 0;
         e = a[h + 2 >> 0] | 0;
         switch (o | 0) {
          case 224:
           {
            if ((n & -32) << 24 >> 24 != -96) {
             e = 2;
             break a
            }
            break
           }
          case 237:
           {
            if ((n & -32) << 24 >> 24 != -128) {
             e = 2;
             break a
            }
            break
           }
          default:
           if ((n & -64) << 24 >> 24 != -128) {
            e = 2;
            break a
           }
         }
         e = e & 255;
         if ((e & 192 | 0) != 128) {
          e = 2;
          break a
         }
         e = (n & 255) << 6 & 4032 | o << 12 | e & 63;
         if ((e & 65535) >>> 0 > k >>> 0) {
          e = 2;
          break a
         }
         b[m >> 1] = e;
         c[g >> 2] = h + 3;
         break
        }
        if ((e & 255) >= 245) {
         e = 2;
         break a
        }
        if ((l - h | 0) < 4) {
         e = 1;
         break a
        }
        n = a[h + 1 >> 0] | 0;
        e = a[h + 2 >> 0] | 0;
        h = a[h + 3 >> 0] | 0;
        switch (o | 0) {
         case 240:
          {
           if ((n + 112 & 255) >= 48) {
            e = 2;
            break a
           }
           break
          }
         case 244:
          {
           if ((n & -16) << 24 >> 24 != -128) {
            e = 2;
            break a
           }
           break
          }
         default:
          if ((n & -64) << 24 >> 24 != -128) {
           e = 2;
           break a
          }
        }
        p = e & 255;
        if ((p & 192 | 0) != 128) {
         e = 2;
         break a
        }
        e = h & 255;
        if ((e & 192 | 0) != 128) {
         e = 2;
         break a
        }
        if ((q - m | 0) < 4) {
         e = 1;
         break a
        }
        o = o & 7;
        h = n & 255;
        n = p << 6;
        e = e & 63;
        if ((h << 12 & 258048 | o << 18 | n & 4032 | e) >>> 0 > k >>> 0) {
         e = 2;
         break a
        }
        b[m >> 1] = h << 2 & 60 | p >>> 4 & 3 | ((h >>> 4 & 3 | o << 2) << 6) + 16320 | 55296;
        p = m + 2 | 0;
        c[j >> 2] = p;
        b[p >> 1] = e | n & 960 | 56320;
        c[g >> 2] = (c[g >> 2] | 0) + 4
       }
      while (0);
      m = (c[j >> 2] | 0) + 2 | 0;
      c[j >> 2] = m;
      h = c[g >> 2] | 0;
      e = h >>> 0 < f >>> 0;
      if (!(e & m >>> 0 < i >>> 0)) {
       r = 39;
       break
      }
     } else r = 39;
   while (0);
   if ((r | 0) == 39) e = e & 1;
   return e | 0
  }

  function Nr(b, c, e, f, g) {
   b = b | 0;
   c = c | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0;
   n = c;
   if ((((g & 4 | 0) != 0 ? (n - b | 0) > 2 : 0) ? (a[b >> 0] | 0) == -17 : 0) ? (a[b + 1 >> 0] | 0) == -69 : 0) g = (a[b + 2 >> 0] | 0) == -65 ? b + 3 | 0 : b;
   else g = b;
   a: do
    if ((e | 0) != 0 & g >>> 0 < c >>> 0) {
     m = g;
     h = 0;
     b: while (1) {
      g = a[m >> 0] | 0;
      l = g & 255;
      if (l >>> 0 > f >>> 0) {
       g = m;
       h = 42;
       break a
      }
      do
       if (g << 24 >> 24 > -1) g = m + 1 | 0;
       else {
        if ((g & 255) < 194) {
         g = m;
         h = 42;
         break a
        }
        if ((g & 255) < 224) {
         if ((n - m | 0) < 2) {
          g = m;
          h = 42;
          break a
         }
         g = d[m + 1 >> 0] | 0;
         if ((g & 192 | 0) != 128) {
          g = m;
          h = 42;
          break a
         }
         if ((g & 63 | l << 6 & 1984) >>> 0 > f >>> 0) {
          g = m;
          h = 42;
          break a
         }
         g = m + 2 | 0;
         break
        }
        if ((g & 255) < 240) {
         g = m;
         if ((n - g | 0) < 3) {
          g = m;
          h = 42;
          break a
         }
         j = a[m + 1 >> 0] | 0;
         i = a[m + 2 >> 0] | 0;
         switch (l | 0) {
          case 224:
           {
            if ((j & -32) << 24 >> 24 != -96) {
             h = 20;
             break b
            }
            break
           }
          case 237:
           {
            if ((j & -32) << 24 >> 24 != -128) {
             h = 22;
             break b
            }
            break
           }
          default:
           if ((j & -64) << 24 >> 24 != -128) {
            h = 24;
            break b
           }
         }
         g = i & 255;
         if ((g & 192 | 0) != 128) {
          g = m;
          h = 42;
          break a
         }
         if (((j & 255) << 6 & 4032 | l << 12 & 61440 | g & 63) >>> 0 > f >>> 0) {
          g = m;
          h = 42;
          break a
         }
         g = m + 3 | 0;
         break
        }
        if ((g & 255) >= 245) {
         g = m;
         h = 42;
         break a
        }
        g = m;
        if ((e - h | 0) >>> 0 < 2 | (n - g | 0) < 4) {
         g = m;
         h = 42;
         break a
        }
        k = a[m + 1 >> 0] | 0;
        i = a[m + 2 >> 0] | 0;
        j = a[m + 3 >> 0] | 0;
        switch (l | 0) {
         case 240:
          {
           if ((k + 112 & 255) >= 48) {
            h = 32;
            break b
           }
           break
          }
         case 244:
          {
           if ((k & -16) << 24 >> 24 != -128) {
            h = 34;
            break b
           }
           break
          }
         default:
          if ((k & -64) << 24 >> 24 != -128) {
           h = 36;
           break b
          }
        }
        i = i & 255;
        if ((i & 192 | 0) != 128) {
         g = m;
         h = 42;
         break a
        }
        g = j & 255;
        if ((g & 192 | 0) != 128) {
         g = m;
         h = 42;
         break a
        }
        if (((k & 255) << 12 & 258048 | l << 18 & 1835008 | i << 6 & 4032 | g & 63) >>> 0 > f >>> 0) {
         g = m;
         h = 42;
         break a
        }
        g = m + 4 | 0;
        h = h + 1 | 0
       }
      while (0);
      h = h + 1 | 0;
      if (!(h >>> 0 < e >>> 0 & g >>> 0 < c >>> 0)) {
       h = 42;
       break a
      } else m = g
     }
     if ((h | 0) == 20) {
      g = g - b | 0;
      break
     } else if ((h | 0) == 22) {
      g = g - b | 0;
      break
     } else if ((h | 0) == 24) {
      g = g - b | 0;
      break
     } else if ((h | 0) == 32) {
      g = g - b | 0;
      break
     } else if ((h | 0) == 34) {
      g = g - b | 0;
      break
     } else if ((h | 0) == 36) {
      g = g - b | 0;
      break
     }
    } else h = 42;
   while (0);
   if ((h | 0) == 42) g = g - b | 0;
   return g | 0
  }

  function Or(b, d, e, f, g, h, i, j) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   i = i | 0;
   j = j | 0;
   var k = 0,
    l = 0;
   c[e >> 2] = b;
   c[h >> 2] = f;
   l = g;
   if (j & 2)
    if ((l - f | 0) < 3) b = 1;
    else {
     c[h >> 2] = f + 1;
     a[f >> 0] = -17;
     k = c[h >> 2] | 0;
     c[h >> 2] = k + 1;
     a[k >> 0] = -69;
     k = c[h >> 2] | 0;
     c[h >> 2] = k + 1;
     a[k >> 0] = -65;
     k = 4
    } else k = 4;
   a: do
    if ((k | 0) == 4) {
     b = c[e >> 2] | 0;
     if (b >>> 0 < d >>> 0)
      while (1) {
       j = c[b >> 2] | 0;
       if (j >>> 0 > i >>> 0 | (j & -2048 | 0) == 55296) {
        b = 2;
        break a
       }
       do
        if (j >>> 0 >= 128) {
         if (j >>> 0 < 2048) {
          b = c[h >> 2] | 0;
          if ((l - b | 0) < 2) {
           b = 1;
           break a
          }
          c[h >> 2] = b + 1;
          a[b >> 0] = j >>> 6 | 192;
          k = c[h >> 2] | 0;
          c[h >> 2] = k + 1;
          a[k >> 0] = j & 63 | 128;
          break
         }
         b = c[h >> 2] | 0;
         g = l - b | 0;
         if (j >>> 0 < 65536) {
          if ((g | 0) < 3) {
           b = 1;
           break a
          }
          c[h >> 2] = b + 1;
          a[b >> 0] = j >>> 12 | 224;
          k = c[h >> 2] | 0;
          c[h >> 2] = k + 1;
          a[k >> 0] = j >>> 6 & 63 | 128;
          k = c[h >> 2] | 0;
          c[h >> 2] = k + 1;
          a[k >> 0] = j & 63 | 128;
          break
         } else {
          if ((g | 0) < 4) {
           b = 1;
           break a
          }
          c[h >> 2] = b + 1;
          a[b >> 0] = j >>> 18 | 240;
          k = c[h >> 2] | 0;
          c[h >> 2] = k + 1;
          a[k >> 0] = j >>> 12 & 63 | 128;
          k = c[h >> 2] | 0;
          c[h >> 2] = k + 1;
          a[k >> 0] = j >>> 6 & 63 | 128;
          k = c[h >> 2] | 0;
          c[h >> 2] = k + 1;
          a[k >> 0] = j & 63 | 128;
          break
         }
        } else {
         b = c[h >> 2] | 0;
         if ((l - b | 0) < 1) {
          b = 1;
          break a
         }
         c[h >> 2] = b + 1;
         a[b >> 0] = j
        }
       while (0);
       b = (c[e >> 2] | 0) + 4 | 0;
       c[e >> 2] = b;
       if (b >>> 0 >= d >>> 0) {
        b = 0;
        break
       }
      } else b = 0
    }
   while (0);
   return b | 0
  }

  function Pr(b, e, f, g, h, i, j, k) {
   b = b | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   i = i | 0;
   j = j | 0;
   k = k | 0;
   var l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0,
    q = 0;
   c[f >> 2] = b;
   c[i >> 2] = g;
   if (k & 4) {
    b = c[f >> 2] | 0;
    k = e;
    if ((((k - b | 0) > 2 ? (a[b >> 0] | 0) == -17 : 0) ? (a[b + 1 >> 0] | 0) == -69 : 0) ? (a[b + 2 >> 0] | 0) == -65 : 0) {
     c[f >> 2] = b + 3;
     g = c[i >> 2] | 0;
     p = k
    } else p = k
   } else p = e;
   k = c[f >> 2] | 0;
   b = k >>> 0 < e >>> 0;
   a: do
    if (b & g >>> 0 < h >>> 0)
     while (1) {
      b = a[k >> 0] | 0;
      o = b & 255;
      do
       if (b << 24 >> 24 > -1) {
        if (o >>> 0 > j >>> 0) {
         b = 2;
         break a
        }
        c[g >> 2] = o;
        c[f >> 2] = k + 1
       } else {
        if ((b & 255) < 194) {
         b = 2;
         break a
        }
        if ((b & 255) < 224) {
         if ((p - k | 0) < 2) {
          b = 1;
          break a
         }
         b = d[k + 1 >> 0] | 0;
         if ((b & 192 | 0) != 128) {
          b = 2;
          break a
         }
         b = b & 63 | o << 6 & 1984;
         if (b >>> 0 > j >>> 0) {
          b = 2;
          break a
         }
         c[g >> 2] = b;
         c[f >> 2] = k + 2;
         break
        }
        if ((b & 255) < 240) {
         if ((p - k | 0) < 3) {
          b = 1;
          break a
         }
         l = a[k + 1 >> 0] | 0;
         b = a[k + 2 >> 0] | 0;
         switch (o | 0) {
          case 224:
           {
            if ((l & -32) << 24 >> 24 != -96) {
             b = 2;
             break a
            }
            break
           }
          case 237:
           {
            if ((l & -32) << 24 >> 24 != -128) {
             b = 2;
             break a
            }
            break
           }
          default:
           if ((l & -64) << 24 >> 24 != -128) {
            b = 2;
            break a
           }
         }
         b = b & 255;
         if ((b & 192 | 0) != 128) {
          b = 2;
          break a
         }
         b = (l & 255) << 6 & 4032 | o << 12 & 61440 | b & 63;
         if (b >>> 0 > j >>> 0) {
          b = 2;
          break a
         }
         c[g >> 2] = b;
         c[f >> 2] = k + 3;
         break
        }
        if ((b & 255) >= 245) {
         b = 2;
         break a
        }
        if ((p - k | 0) < 4) {
         b = 1;
         break a
        }
        n = a[k + 1 >> 0] | 0;
        b = a[k + 2 >> 0] | 0;
        l = a[k + 3 >> 0] | 0;
        switch (o | 0) {
         case 240:
          {
           if ((n + 112 & 255) >= 48) {
            b = 2;
            break a
           }
           break
          }
         case 244:
          {
           if ((n & -16) << 24 >> 24 != -128) {
            b = 2;
            break a
           }
           break
          }
         default:
          if ((n & -64) << 24 >> 24 != -128) {
           b = 2;
           break a
          }
        }
        m = b & 255;
        if ((m & 192 | 0) != 128) {
         b = 2;
         break a
        }
        b = l & 255;
        if ((b & 192 | 0) != 128) {
         b = 2;
         break a
        }
        b = (n & 255) << 12 & 258048 | o << 18 & 1835008 | m << 6 & 4032 | b & 63;
        if (b >>> 0 > j >>> 0) {
         b = 2;
         break a
        }
        c[g >> 2] = b;
        c[f >> 2] = k + 4
       }
      while (0);
      g = (c[i >> 2] | 0) + 4 | 0;
      c[i >> 2] = g;
      k = c[f >> 2] | 0;
      b = k >>> 0 < e >>> 0;
      if (!(b & g >>> 0 < h >>> 0)) {
       q = 38;
       break
      }
     } else q = 38;
   while (0);
   if ((q | 0) == 38) b = b & 1;
   return b | 0
  }

  function Qr(b, c, e, f, g) {
   b = b | 0;
   c = c | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   var h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0;
   n = c;
   if ((((g & 4 | 0) != 0 ? (n - b | 0) > 2 : 0) ? (a[b >> 0] | 0) == -17 : 0) ? (a[b + 1 >> 0] | 0) == -69 : 0) g = (a[b + 2 >> 0] | 0) == -65 ? b + 3 | 0 : b;
   else g = b;
   a: do
    if ((e | 0) != 0 & g >>> 0 < c >>> 0) {
     l = g;
     m = 0;
     b: while (1) {
      g = a[l >> 0] | 0;
      k = g & 255;
      do
       if (g << 24 >> 24 > -1) {
        if (k >>> 0 > f >>> 0) {
         g = l;
         h = 42;
         break a
        }
        g = l + 1 | 0
       } else {
        if ((g & 255) < 194) {
         g = l;
         h = 42;
         break a
        }
        if ((g & 255) < 224) {
         if ((n - l | 0) < 2) {
          g = l;
          h = 42;
          break a
         }
         g = d[l + 1 >> 0] | 0;
         if ((g & 192 | 0) != 128) {
          g = l;
          h = 42;
          break a
         }
         if ((g & 63 | k << 6 & 1984) >>> 0 > f >>> 0) {
          g = l;
          h = 42;
          break a
         }
         g = l + 2 | 0;
         break
        }
        if ((g & 255) < 240) {
         g = l;
         if ((n - g | 0) < 3) {
          g = l;
          h = 42;
          break a
         }
         i = a[l + 1 >> 0] | 0;
         h = a[l + 2 >> 0] | 0;
         switch (k | 0) {
          case 224:
           {
            if ((i & -32) << 24 >> 24 != -96) {
             h = 20;
             break b
            }
            break
           }
          case 237:
           {
            if ((i & -32) << 24 >> 24 != -128) {
             h = 22;
             break b
            }
            break
           }
          default:
           if ((i & -64) << 24 >> 24 != -128) {
            h = 24;
            break b
           }
         }
         g = h & 255;
         if ((g & 192 | 0) != 128) {
          g = l;
          h = 42;
          break a
         }
         if (((i & 255) << 6 & 4032 | k << 12 & 61440 | g & 63) >>> 0 > f >>> 0) {
          g = l;
          h = 42;
          break a
         }
         g = l + 3 | 0;
         break
        }
        if ((g & 255) >= 245) {
         g = l;
         h = 42;
         break a
        }
        g = l;
        if ((n - g | 0) < 4) {
         g = l;
         h = 42;
         break a
        }
        j = a[l + 1 >> 0] | 0;
        h = a[l + 2 >> 0] | 0;
        i = a[l + 3 >> 0] | 0;
        switch (k | 0) {
         case 240:
          {
           if ((j + 112 & 255) >= 48) {
            h = 32;
            break b
           }
           break
          }
         case 244:
          {
           if ((j & -16) << 24 >> 24 != -128) {
            h = 34;
            break b
           }
           break
          }
         default:
          if ((j & -64) << 24 >> 24 != -128) {
           h = 36;
           break b
          }
        }
        h = h & 255;
        if ((h & 192 | 0) != 128) {
         g = l;
         h = 42;
         break a
        }
        g = i & 255;
        if ((g & 192 | 0) != 128) {
         g = l;
         h = 42;
         break a
        }
        if (((j & 255) << 12 & 258048 | k << 18 & 1835008 | h << 6 & 4032 | g & 63) >>> 0 > f >>> 0) {
         g = l;
         h = 42;
         break a
        }
        g = l + 4 | 0
       }
      while (0);
      m = m + 1 | 0;
      if (!(m >>> 0 < e >>> 0 & g >>> 0 < c >>> 0)) {
       h = 42;
       break a
      } else l = g
     }
     if ((h | 0) == 20) {
      g = g - b | 0;
      break
     } else if ((h | 0) == 22) {
      g = g - b | 0;
      break
     } else if ((h | 0) == 24) {
      g = g - b | 0;
      break
     } else if ((h | 0) == 32) {
      g = g - b | 0;
      break
     } else if ((h | 0) == 34) {
      g = g - b | 0;
      break
     } else if ((h | 0) == 36) {
      g = g - b | 0;
      break
     }
    } else h = 42;
   while (0);
   if ((h | 0) == 42) g = g - b | 0;
   return g | 0
  }

  function Rr(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0;
   k = i;
   i = i + 32 | 0;
   j = k;
   g = c[a + 8 >> 2] | 0;
   d = c[a + 4 >> 2] | 0;
   if (g - d >> 2 >>> 0 < b >>> 0) {
    e = c[a >> 2] | 0;
    h = d - e >> 2;
    f = h + b | 0;
    if (f >>> 0 > 1073741823) jh(a);
    d = g - e | 0;
    if (d >> 2 >>> 0 < 536870911) {
     d = d >> 1;
     d = d >>> 0 < f >>> 0 ? f : d
    } else d = 1073741823;
    Tr(j, d, h, a + 16 | 0);
    h = j + 8 | 0;
    g = c[h >> 2] | 0;
    ks(g | 0, 0, b << 2 | 0) | 0;
    c[h >> 2] = g + (b << 2);
    Ur(a, j);
    Vr(j)
   } else Sr(a, b);
   i = k;
   return
  }

  function Sr(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0;
   d = a + 4 | 0;
   a = b;
   b = c[d >> 2] | 0;
   do {
    c[b >> 2] = 0;
    b = (c[d >> 2] | 0) + 4 | 0;
    c[d >> 2] = b;
    a = a + -1 | 0
   } while ((a | 0) != 0);
   return
  }

  function Tr(b, d, e, f) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0;
   c[b + 12 >> 2] = 0;
   c[b + 16 >> 2] = f;
   do
    if (d) {
     g = f + 112 | 0;
     if (d >>> 0 < 29 & (a[g >> 0] | 0) == 0) {
      a[g >> 0] = 1;
      break
     } else {
      f = kh(d << 2) | 0;
      break
     }
    } else f = 0;
   while (0);
   c[b >> 2] = f;
   e = f + (e << 2) | 0;
   c[b + 8 >> 2] = e;
   c[b + 4 >> 2] = e;
   c[b + 12 >> 2] = f + (d << 2);
   return
  }

  function Ur(a, b) {
   a = a | 0;
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0;
   e = c[a >> 2] | 0;
   g = a + 4 | 0;
   d = b + 4 | 0;
   f = (c[g >> 2] | 0) - e | 0;
   h = (c[d >> 2] | 0) + (0 - (f >> 2) << 2) | 0;
   c[d >> 2] = h;
   ns(h | 0, e | 0, f | 0) | 0;
   f = c[a >> 2] | 0;
   c[a >> 2] = c[d >> 2];
   c[d >> 2] = f;
   f = b + 8 | 0;
   e = c[g >> 2] | 0;
   c[g >> 2] = c[f >> 2];
   c[f >> 2] = e;
   f = a + 8 | 0;
   a = b + 12 | 0;
   e = c[f >> 2] | 0;
   c[f >> 2] = c[a >> 2];
   c[a >> 2] = e;
   c[b >> 2] = c[d >> 2];
   return
  }

  function Vr(b) {
   b = b | 0;
   var d = 0,
    e = 0,
    f = 0;
   e = c[b + 4 >> 2] | 0;
   f = b + 8 | 0;
   d = c[f >> 2] | 0;
   if ((d | 0) != (e | 0)) {
    do d = d + -4 | 0; while ((d | 0) != (e | 0));
    c[f >> 2] = d
   }
   e = c[b >> 2] | 0;
   do
    if (e) {
     d = c[b + 16 >> 2] | 0;
     if ((d | 0) == (e | 0)) {
      a[d + 112 >> 0] = 0;
      break
     } else {
      mh(e);
      break
     }
    }
   while (0);
   return
  }

  function Wr(b, d) {
   b = b | 0;
   d = d | 0;
   var e = 0;
   if (d >>> 0 > 1073741823) jh(b);
   e = b + 128 | 0;
   if (d >>> 0 < 29 & (a[e >> 0] | 0) == 0) {
    a[e >> 0] = 1;
    e = b + 16 | 0
   } else e = kh(d << 2) | 0;
   c[b + 4 >> 2] = e;
   c[b >> 2] = e;
   c[b + 8 >> 2] = e + (d << 2);
   return
  }

  function Xr(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0.0,
    f = 0,
    g = 0,
    h = 0,
    j = 0;
   j = i;
   i = i + 16 | 0;
   h = j;
   do
    if ((a | 0) != (b | 0)) {
     f = Zh() | 0;
     g = c[f >> 2] | 0;
     c[f >> 2] = 0;
     e = +Ri(a, h, dl() | 0);
     a = c[f >> 2] | 0;
     if (!a) c[f >> 2] = g;
     if ((c[h >> 2] | 0) != (b | 0)) {
      c[d >> 2] = 4;
      e = 0.0;
      break
     }
     if ((a | 0) == 34) c[d >> 2] = 4
    } else {
     c[d >> 2] = 4;
     e = 0.0
    }
   while (0);
   i = j;
   return +e
  }

  function Yr(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0.0,
    f = 0,
    g = 0,
    h = 0,
    j = 0;
   j = i;
   i = i + 16 | 0;
   h = j;
   do
    if ((a | 0) != (b | 0)) {
     f = Zh() | 0;
     g = c[f >> 2] | 0;
     c[f >> 2] = 0;
     e = +Ri(a, h, dl() | 0);
     a = c[f >> 2] | 0;
     if (!a) c[f >> 2] = g;
     if ((c[h >> 2] | 0) != (b | 0)) {
      c[d >> 2] = 4;
      e = 0.0;
      break
     }
     if ((a | 0) == 34) c[d >> 2] = 4
    } else {
     c[d >> 2] = 4;
     e = 0.0
    }
   while (0);
   i = j;
   return +e
  }

  function Zr(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   var e = 0.0,
    f = 0,
    g = 0,
    h = 0,
    j = 0;
   j = i;
   i = i + 16 | 0;
   h = j;
   do
    if ((a | 0) == (b | 0)) {
     c[d >> 2] = 4;
     e = 0.0
    } else {
     f = Zh() | 0;
     g = c[f >> 2] | 0;
     c[f >> 2] = 0;
     e = +Ri(a, h, dl() | 0);
     a = c[f >> 2] | 0;
     if (!a) c[f >> 2] = g;
     if ((c[h >> 2] | 0) != (b | 0)) {
      c[d >> 2] = 4;
      e = 0.0;
      break
     }
     if ((a | 0) == 34) c[d >> 2] = 4
    }
   while (0);
   i = j;
   return +e
  }

  function _r(b, d, e, f) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    j = 0,
    k = 0;
   k = i;
   i = i + 16 | 0;
   j = k;
   do
    if ((b | 0) != (d | 0)) {
     if ((a[b >> 0] | 0) == 45) {
      c[e >> 2] = 4;
      b = 0;
      f = 0;
      break
     }
     g = Zh() | 0;
     h = c[g >> 2] | 0;
     c[g >> 2] = 0;
     f = Sh(b, j, f, dl() | 0) | 0;
     b = c[g >> 2] | 0;
     if (!b) c[g >> 2] = h;
     if ((c[j >> 2] | 0) != (d | 0)) {
      c[e >> 2] = 4;
      b = 0;
      f = 0;
      break
     }
     if ((b | 0) == 34) {
      c[e >> 2] = 4;
      b = -1;
      f = -1
     } else b = C
    } else {
     c[e >> 2] = 4;
     b = 0;
     f = 0
    }
   while (0);
   C = b;
   i = k;
   return f | 0
  }

  function $r(b, d, e, f) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0;
   l = i;
   i = i + 16 | 0;
   k = l;
   do
    if ((b | 0) != (d | 0)) {
     if ((a[b >> 0] | 0) == 45) {
      c[e >> 2] = 4;
      f = 0;
      break
     }
     h = Zh() | 0;
     j = c[h >> 2] | 0;
     c[h >> 2] = 0;
     f = Sh(b, k, f, dl() | 0) | 0;
     b = C;
     g = c[h >> 2] | 0;
     if (!g) c[h >> 2] = j;
     if ((c[k >> 2] | 0) != (d | 0)) {
      c[e >> 2] = 4;
      f = 0;
      break
     }
     if (b >>> 0 > 0 | (b | 0) == 0 & f >>> 0 > 4294967295 | (g | 0) == 34) {
      c[e >> 2] = 4;
      f = -1;
      break
     } else break
    } else {
     c[e >> 2] = 4;
     f = 0
    }
   while (0);
   i = l;
   return f | 0
  }

  function as(b, d, e, f) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0;
   l = i;
   i = i + 16 | 0;
   k = l;
   do
    if ((b | 0) != (d | 0)) {
     if ((a[b >> 0] | 0) == 45) {
      c[e >> 2] = 4;
      f = 0;
      break
     }
     h = Zh() | 0;
     j = c[h >> 2] | 0;
     c[h >> 2] = 0;
     f = Sh(b, k, f, dl() | 0) | 0;
     b = C;
     g = c[h >> 2] | 0;
     if (!g) c[h >> 2] = j;
     if ((c[k >> 2] | 0) != (d | 0)) {
      c[e >> 2] = 4;
      f = 0;
      break
     }
     if (b >>> 0 > 0 | (b | 0) == 0 & f >>> 0 > 4294967295 | (g | 0) == 34) {
      c[e >> 2] = 4;
      f = -1;
      break
     } else break
    } else {
     c[e >> 2] = 4;
     f = 0
    }
   while (0);
   i = l;
   return f | 0
  }

  function bs(b, d, e, f) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0;
   l = i;
   i = i + 16 | 0;
   k = l;
   do
    if ((b | 0) != (d | 0)) {
     if ((a[b >> 0] | 0) == 45) {
      c[e >> 2] = 4;
      f = 0;
      break
     }
     h = Zh() | 0;
     j = c[h >> 2] | 0;
     c[h >> 2] = 0;
     f = Sh(b, k, f, dl() | 0) | 0;
     b = C;
     g = c[h >> 2] | 0;
     if (!g) c[h >> 2] = j;
     if ((c[k >> 2] | 0) != (d | 0)) {
      c[e >> 2] = 4;
      f = 0;
      break
     }
     if (b >>> 0 > 0 | (b | 0) == 0 & f >>> 0 > 65535 | (g | 0) == 34) {
      c[e >> 2] = 4;
      f = -1;
      break
     } else {
      f = f & 65535;
      break
     }
    } else {
     c[e >> 2] = 4;
     f = 0
    }
   while (0);
   i = l;
   return f | 0
  }

  function cs(a, b, d, e) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0;
   k = i;
   i = i + 16 | 0;
   j = k;
   do
    if ((a | 0) != (b | 0)) {
     g = Zh() | 0;
     h = c[g >> 2] | 0;
     c[g >> 2] = 0;
     e = Th(a, j, e, dl() | 0) | 0;
     a = C;
     f = c[g >> 2] | 0;
     if (!f) c[g >> 2] = h;
     if ((c[j >> 2] | 0) != (b | 0)) {
      c[d >> 2] = 4;
      a = 0;
      e = 0;
      break
     }
     if ((f | 0) == 34) {
      c[d >> 2] = 4;
      d = (a | 0) > 0 | (a | 0) == 0 & e >>> 0 > 0;
      C = d ? 2147483647 : -2147483648;
      i = k;
      return (d ? -1 : 0) | 0
     }
    } else {
     c[d >> 2] = 4;
     a = 0;
     e = 0
    }
   while (0);
   C = a;
   i = k;
   return e | 0
  }

  function ds(a, b, d, e) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0;
   k = i;
   i = i + 16 | 0;
   j = k;
   a: do
    if ((a | 0) == (b | 0)) {
     c[d >> 2] = 4;
     e = 0
    } else {
     g = Zh() | 0;
     h = c[g >> 2] | 0;
     c[g >> 2] = 0;
     e = Th(a, j, e, dl() | 0) | 0;
     a = C;
     f = c[g >> 2] | 0;
     if (!f) c[g >> 2] = h;
     if ((c[j >> 2] | 0) != (b | 0)) {
      c[d >> 2] = 4;
      e = 0;
      break
     }
     do
      if ((f | 0) == 34) {
       c[d >> 2] = 4;
       if ((a | 0) > 0 | (a | 0) == 0 & e >>> 0 > 0) {
        e = 2147483647;
        break a
       }
      } else {
       if ((a | 0) < -1 | (a | 0) == -1 & e >>> 0 < 2147483648) {
        c[d >> 2] = 4;
        break
       }
       if ((a | 0) > 0 | (a | 0) == 0 & e >>> 0 > 2147483647) {
        c[d >> 2] = 4;
        e = 2147483647;
        break a
       } else break a
      }
     while (0);
     e = -2147483648
    }
   while (0);
   i = k;
   return e | 0
  }

  function es(a) {
   a = a | 0;
   return
  }

  function fs(a) {
   a = a | 0;
   a = a + 4 | 0;
   c[a >> 2] = (c[a >> 2] | 0) + 1;
   return
  }

  function gs(a) {
   a = a | 0;
   var b = 0,
    d = 0;
   d = a + 4 | 0;
   b = c[d >> 2] | 0;
   c[d >> 2] = b + -1;
   if (!b) {
    sb[c[(c[a >> 2] | 0) + 8 >> 2] & 255](a);
    a = 1
   } else a = 0;
   return a | 0
  }

  function hs(a, b, d) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   db(12852) | 0;
   if ((c[a >> 2] | 0) == 1)
    do va(12880, 12852) | 0; while ((c[a >> 2] | 0) == 1);
   if (!(c[a >> 2] | 0)) {
    c[a >> 2] = 1;
    Va(12852) | 0;
    sb[d & 255](b);
    db(12852) | 0;
    c[a >> 2] = -1;
    Va(12852) | 0;
    Za(12880) | 0
   } else Va(12852) | 0;
   return
  }

  function is() {}

  function js(a, b, c, d) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   d = b - d - (c >>> 0 > a >>> 0 | 0) >>> 0;
   return (C = d, a - c >>> 0 | 0) | 0
  }

  function ks(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0,
    i = 0;
   f = b + e | 0;
   if ((e | 0) >= 20) {
    d = d & 255;
    h = b & 3;
    i = d | d << 8 | d << 16 | d << 24;
    g = f & ~3;
    if (h) {
     h = b + 4 - h | 0;
     while ((b | 0) < (h | 0)) {
      a[b >> 0] = d;
      b = b + 1 | 0
     }
    }
    while ((b | 0) < (g | 0)) {
     c[b >> 2] = i;
     b = b + 4 | 0
    }
   }
   while ((b | 0) < (f | 0)) {
    a[b >> 0] = d;
    b = b + 1 | 0
   }
   return b - e | 0
  }

  function ls(a, b, c) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   if ((c | 0) < 32) {
    C = b >>> c;
    return a >>> c | (b & (1 << c) - 1) << 32 - c
   }
   C = 0;
   return b >>> c - 32 | 0
  }

  function ms(a, b, c, d) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   c = a + c >>> 0;
   return (C = b + d + (c >>> 0 < a >>> 0 | 0) >>> 0, c | 0) | 0
  }

  function ns(b, d, e) {
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0;
   if ((e | 0) >= 4096) return Ma(b | 0, d | 0, e | 0) | 0;
   f = b | 0;
   if ((b & 3) == (d & 3)) {
    while (b & 3) {
     if (!e) return f | 0;
     a[b >> 0] = a[d >> 0] | 0;
     b = b + 1 | 0;
     d = d + 1 | 0;
     e = e - 1 | 0
    }
    while ((e | 0) >= 4) {
     c[b >> 2] = c[d >> 2];
     b = b + 4 | 0;
     d = d + 4 | 0;
     e = e - 4 | 0
    }
   }
   while ((e | 0) > 0) {
    a[b >> 0] = a[d >> 0] | 0;
    b = b + 1 | 0;
    d = d + 1 | 0;
    e = e - 1 | 0
   }
   return f | 0
  }

  function os(a, b, c) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   if ((c | 0) < 32) {
    C = b << c | (a & (1 << c) - 1 << 32 - c) >>> 32 - c;
    return a << c
   }
   C = a << c - 32;
   return 0
  }

  function ps(b, c, d) {
   b = b | 0;
   c = c | 0;
   d = d | 0;
   var e = 0;
   if ((c | 0) < (b | 0) & (b | 0) < (c + d | 0)) {
    e = b;
    c = c + d | 0;
    b = b + d | 0;
    while ((d | 0) > 0) {
     b = b - 1 | 0;
     c = c - 1 | 0;
     d = d - 1 | 0;
     a[b >> 0] = a[c >> 0] | 0
    }
    b = e
   } else ns(b, c, d) | 0;
   return b | 0
  }

  function qs(a, b, c) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   if ((c | 0) < 32) {
    C = b >> c;
    return a >>> c | (b & (1 << c) - 1) << 32 - c
   }
   C = (b | 0) < 0 ? -1 : 0;
   return b >> c - 32 | 0
  }

  function rs(b) {
   b = b | 0;
   var c = 0;
   c = a[m + (b & 255) >> 0] | 0;
   if ((c | 0) < 8) return c | 0;
   c = a[m + (b >> 8 & 255) >> 0] | 0;
   if ((c | 0) < 8) return c + 8 | 0;
   c = a[m + (b >> 16 & 255) >> 0] | 0;
   if ((c | 0) < 8) return c + 16 | 0;
   return (a[m + (b >>> 24) >> 0] | 0) + 24 | 0
  }

  function ss(a, b) {
   a = a | 0;
   b = b | 0;
   var c = 0,
    d = 0,
    e = 0,
    f = 0;
   f = a & 65535;
   e = b & 65535;
   c = _(e, f) | 0;
   d = a >>> 16;
   a = (c >>> 16) + (_(e, d) | 0) | 0;
   e = b >>> 16;
   b = _(e, f) | 0;
   return (C = (a >>> 16) + (_(e, d) | 0) + (((a & 65535) + b | 0) >>> 16) | 0, a + b << 16 | c & 65535 | 0) | 0
  }

  function ts(a, b, c, d) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   var e = 0,
    f = 0,
    g = 0,
    h = 0,
    i = 0,
    j = 0;
   j = b >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
   i = ((b | 0) < 0 ? -1 : 0) >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
   f = d >> 31 | ((d | 0) < 0 ? -1 : 0) << 1;
   e = ((d | 0) < 0 ? -1 : 0) >> 31 | ((d | 0) < 0 ? -1 : 0) << 1;
   h = js(j ^ a, i ^ b, j, i) | 0;
   g = C;
   a = f ^ j;
   b = e ^ i;
   return js((ys(h, g, js(f ^ c, e ^ d, f, e) | 0, C, 0) | 0) ^ a, C ^ b, a, b) | 0
  }

  function us(a, b, d, e) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0,
    h = 0,
    j = 0,
    k = 0,
    l = 0;
   f = i;
   i = i + 16 | 0;
   j = f | 0;
   h = b >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
   g = ((b | 0) < 0 ? -1 : 0) >> 31 | ((b | 0) < 0 ? -1 : 0) << 1;
   l = e >> 31 | ((e | 0) < 0 ? -1 : 0) << 1;
   k = ((e | 0) < 0 ? -1 : 0) >> 31 | ((e | 0) < 0 ? -1 : 0) << 1;
   a = js(h ^ a, g ^ b, h, g) | 0;
   b = C;
   ys(a, b, js(l ^ d, k ^ e, l, k) | 0, C, j) | 0;
   e = js(c[j >> 2] ^ h, c[j + 4 >> 2] ^ g, h, g) | 0;
   d = C;
   i = f;
   return (C = d, e) | 0
  }

  function vs(a, b, c, d) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   var e = 0,
    f = 0;
   e = a;
   f = c;
   c = ss(e, f) | 0;
   a = C;
   return (C = (_(b, f) | 0) + (_(d, e) | 0) + a | a & 0, c | 0 | 0) | 0
  }

  function ws(a, b, c, d) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   return ys(a, b, c, d, 0) | 0
  }

  function xs(a, b, d, e) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   var f = 0,
    g = 0;
   g = i;
   i = i + 16 | 0;
   f = g | 0;
   ys(a, b, d, e, f) | 0;
   i = g;
   return (C = c[f + 4 >> 2] | 0, c[f >> 2] | 0) | 0
  }

  function ys(a, b, d, e, f) {
   a = a | 0;
   b = b | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   var g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0,
    n = 0,
    o = 0,
    p = 0;
   l = a;
   j = b;
   k = j;
   h = d;
   n = e;
   i = n;
   if (!k) {
    g = (f | 0) != 0;
    if (!i) {
     if (g) {
      c[f >> 2] = (l >>> 0) % (h >>> 0);
      c[f + 4 >> 2] = 0
     }
     n = 0;
     f = (l >>> 0) / (h >>> 0) >>> 0;
     return (C = n, f) | 0
    } else {
     if (!g) {
      n = 0;
      f = 0;
      return (C = n, f) | 0
     }
     c[f >> 2] = a | 0;
     c[f + 4 >> 2] = b & 0;
     n = 0;
     f = 0;
     return (C = n, f) | 0
    }
   }
   g = (i | 0) == 0;
   do
    if (h) {
     if (!g) {
      g = (aa(i | 0) | 0) - (aa(k | 0) | 0) | 0;
      if (g >>> 0 <= 31) {
       m = g + 1 | 0;
       i = 31 - g | 0;
       b = g - 31 >> 31;
       h = m;
       a = l >>> (m >>> 0) & b | k << i;
       b = k >>> (m >>> 0) & b;
       g = 0;
       i = l << i;
       break
      }
      if (!f) {
       n = 0;
       f = 0;
       return (C = n, f) | 0
      }
      c[f >> 2] = a | 0;
      c[f + 4 >> 2] = j | b & 0;
      n = 0;
      f = 0;
      return (C = n, f) | 0
     }
     g = h - 1 | 0;
     if (g & h) {
      i = (aa(h | 0) | 0) + 33 - (aa(k | 0) | 0) | 0;
      p = 64 - i | 0;
      m = 32 - i | 0;
      j = m >> 31;
      o = i - 32 | 0;
      b = o >> 31;
      h = i;
      a = m - 1 >> 31 & k >>> (o >>> 0) | (k << m | l >>> (i >>> 0)) & b;
      b = b & k >>> (i >>> 0);
      g = l << p & j;
      i = (k << p | l >>> (o >>> 0)) & j | l << m & i - 33 >> 31;
      break
     }
     if (f) {
      c[f >> 2] = g & l;
      c[f + 4 >> 2] = 0
     }
     if ((h | 0) == 1) {
      o = j | b & 0;
      p = a | 0 | 0;
      return (C = o, p) | 0
     } else {
      p = rs(h | 0) | 0;
      o = k >>> (p >>> 0) | 0;
      p = k << 32 - p | l >>> (p >>> 0) | 0;
      return (C = o, p) | 0
     }
    } else {
     if (g) {
      if (f) {
       c[f >> 2] = (k >>> 0) % (h >>> 0);
       c[f + 4 >> 2] = 0
      }
      o = 0;
      p = (k >>> 0) / (h >>> 0) >>> 0;
      return (C = o, p) | 0
     }
     if (!l) {
      if (f) {
       c[f >> 2] = 0;
       c[f + 4 >> 2] = (k >>> 0) % (i >>> 0)
      }
      o = 0;
      p = (k >>> 0) / (i >>> 0) >>> 0;
      return (C = o, p) | 0
     }
     g = i - 1 | 0;
     if (!(g & i)) {
      if (f) {
       c[f >> 2] = a | 0;
       c[f + 4 >> 2] = g & k | b & 0
      }
      o = 0;
      p = k >>> ((rs(i | 0) | 0) >>> 0);
      return (C = o, p) | 0
     }
     g = (aa(i | 0) | 0) - (aa(k | 0) | 0) | 0;
     if (g >>> 0 <= 30) {
      b = g + 1 | 0;
      i = 31 - g | 0;
      h = b;
      a = k << i | l >>> (b >>> 0);
      b = k >>> (b >>> 0);
      g = 0;
      i = l << i;
      break
     }
     if (!f) {
      o = 0;
      p = 0;
      return (C = o, p) | 0
     }
     c[f >> 2] = a | 0;
     c[f + 4 >> 2] = j | b & 0;
     o = 0;
     p = 0;
     return (C = o, p) | 0
    }
   while (0);
   if (!h) {
    k = i;
    j = 0;
    i = 0
   } else {
    m = d | 0 | 0;
    l = n | e & 0;
    k = ms(m | 0, l | 0, -1, -1) | 0;
    d = C;
    j = i;
    i = 0;
    do {
     e = j;
     j = g >>> 31 | j << 1;
     g = i | g << 1;
     e = a << 1 | e >>> 31 | 0;
     n = a >>> 31 | b << 1 | 0;
     js(k, d, e, n) | 0;
     p = C;
     o = p >> 31 | ((p | 0) < 0 ? -1 : 0) << 1;
     i = o & 1;
     a = js(e, n, o & m, (((p | 0) < 0 ? -1 : 0) >> 31 | ((p | 0) < 0 ? -1 : 0) << 1) & l) | 0;
     b = C;
     h = h - 1 | 0
    } while ((h | 0) != 0);
    k = j;
    j = 0
   }
   h = 0;
   if (f) {
    c[f >> 2] = a;
    c[f + 4 >> 2] = b
   }
   o = (g | 0) >>> 31 | (k | h) << 1 | (h << 1 | g >>> 31) & 0 | j;
   p = (g << 1 | 0 >>> 31) & -2 | i;
   return (C = o, p) | 0
  }

  function zs(a, b, c, d, e, f, g, h) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   return ob[a & 7](b | 0, c | 0, d | 0, e | 0, f | 0, g | 0, h | 0) | 0
  }

  function As(a, b, c, d) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   return pb[a & 31](b | 0, c | 0, d | 0) | 0
  }

  function Bs(a, b, c, d, e, f) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   qb[a & 3](b | 0, c | 0, d | 0, e | 0, f | 0)
  }

  function Cs(a, b, c, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = +g;
   return rb[a & 3](b | 0, c | 0, d | 0, e | 0, f | 0, +g) | 0
  }

  function Ds(a, b) {
   a = a | 0;
   b = b | 0;
   sb[a & 255](b | 0)
  }

  function Es(a, b, c) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   tb[a & 127](b | 0, c | 0)
  }

  function Fs(a, b, c, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   return ub[a & 63](b | 0, c | 0, d | 0, e | 0, f | 0, g | 0) | 0
  }

  function Gs(a, b, c, d, e, f) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   f = +f;
   return vb[a & 7](b | 0, c | 0, d | 0, e | 0, +f) | 0
  }

  function Hs(a, b) {
   a = a | 0;
   b = b | 0;
   return wb[a & 127](b | 0) | 0
  }

  function Is(a, b, c, d) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   xb[a & 0](b | 0, c | 0, d | 0)
  }

  function Js(a) {
   a = a | 0;
   yb[a & 3]()
  }

  function Ks(a, b, c, d, e, f, g, h, i) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   i = i | 0;
   return zb[a & 15](b | 0, c | 0, d | 0, e | 0, f | 0, g | 0, h | 0, i | 0) | 0
  }

  function Ls(a, b, c, d, e) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   return Ab[a & 7](b | 0, c | 0, d | 0, e | 0) | 0
  }

  function Ms(a, b, c, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   Bb[a & 7](b | 0, c | 0, d | 0, e | 0, f | 0, g | 0)
  }

  function Ns(a, b, c) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   return Cb[a & 15](b | 0, c | 0) | 0
  }

  function Os(a, b, c, d, e, f) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   return Db[a & 31](b | 0, c | 0, d | 0, e | 0, f | 0) | 0
  }

  function Ps(a, b, c, d, e) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   Eb[a & 7](b | 0, c | 0, d | 0, e | 0)
  }

  function Qs(a, b, c, d, e, f, g) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   ba(0);
   return 0
  }

  function Rs(a, b, c) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   ba(1);
   return 0
  }

  function Ss(a, b, c, d, e) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   ba(2)
  }

  function Ts(a, b, c, d, e, f) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   f = +f;
   ba(3);
   return 0
  }

  function Us(a) {
   a = a | 0;
   ba(4)
  }

  function Vs(a, b) {
   a = a | 0;
   b = b | 0;
   ba(5)
  }

  function Ws(a, b, c, d, e, f) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   ba(6);
   return 0
  }

  function Xs(a, b, c, d, e) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = +e;
   ba(7);
   return 0
  }

  function Ys(a) {
   a = a | 0;
   ba(8);
   return 0
  }

  function Zs(a, b, c) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   ba(9)
  }

  function _s() {
   ba(10)
  }

  function $s(a, b, c, d, e, f, g, h) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   g = g | 0;
   h = h | 0;
   ba(11);
   return 0
  }

  function at(a, b, c, d) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   ba(12);
   return 0
  }

  function bt(a, b, c, d, e, f) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   f = f | 0;
   ba(13)
  }

  function ct(a, b) {
   a = a | 0;
   b = b | 0;
   ba(14);
   return 0
  }

  function dt(a, b, c, d, e) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   e = e | 0;
   ba(15);
   return 0
  }

  function et(a, b, c, d) {
   a = a | 0;
   b = b | 0;
   c = c | 0;
   d = d | 0;
   ba(16)
  }

  // EMSCRIPTEN_END_FUNCS
  var ob = [Qs, Ym, an, Xn, _n, eo, go, Qs];
  var pb = [Rs, bk, gk, kk, Bh, fj, Lk, Qk, wo, Bo, jp, lp, op, Vo, _o, ap, dp, cj, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs, Rs];
  var qb = [Ss, Nh, Mh, Jh];
  var rb = [Ts, ko, qo, Ts];
  var sb = [Us, ic, jc, mc, nc, Zc, Ee, He, Ie, ye, Be, Ce, se, ve, we, me, pe, qe, fe, ie, je, _d, be, ce, Ud, Xd, Yd, Od, Rd, Sd, Id, Ld, Md, Cd, Fd, Gd, wd, zd, Ad, qd, td, ud, kd, nd, od, ed, hd, id, _c, bd, cd, vg, wg, xg, yg, zg, Ag, mk, ok, nk, pk, og, pg, zk, Ck, Ak, Dk, Bk, Ek, rk, tk, sk, uk, ph, qh, vh, yh, wh, xh, zh, Ah, Zj, _j, Vj, Fk, Gk, Ik, So, Mk, Nk, Rk, Sk, el, fl, yl, zl, Nl, Ol, _l, $l, xm, ym, Vm, Xm, _m, $m, cn, dn, on, pn, zn, An, Kn, Ln, Vn, Wn, bo, co, io, jo, oo, po, uo, vo, zo, Ao, Ho, Io, gp, hp, Bq, yp, _p, $p, aq, bq, Hk, Ro, Uo, qp, Gp, Op, Wp, Xp, Yn, To, Kr, kj, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us, Us];
  var tb = [Vs, lc, Ge, Je, Ae, De, ue, xe, oe, re, he, ke, ae, de, Wd, Zd, Qd, Td, Kd, Nd, Ed, Hd, yd, Bd, sd, vd, md, pd, gd, jd, ad, dd, ak, gn, hn, jn, kn, mn, nn, sn, tn, un, vn, xn, yn, Dn, En, Fn, Gn, In, Jn, On, Pn, Qn, Rn, Tn, Un, yo, Do, gq, iq, kq, hq, jq, lq, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs, Vs];
  var ub = [Ws, Tk, Uk, Vk, Wk, Xk, Yk, Zk, _k, $k, al, bl, gl, hl, il, jl, kl, ll, ml, nl, ol, pl, ql, Fl, Hl, Sl, Ul, bm, cm, dm, fm, hm, Am, Bm, Cm, Em, Gm, no, to, Ws, Ws, Ws, Ws, Ws, Ws, Ws, Ws, Ws, Ws, Ws, Ws, Ws, Ws, Ws, Ws, Ws, Ws, Ws, Ws, Ws, Ws, Ws, Ws, Ws];
  var vb = [Xs, Il, Ll, Vl, Xl, Xs, Xs, Xs];
  var wb = [Ys, kc, Fe, ze, te, ne, ge, $d, Vd, Pd, Jd, Dd, xd, rd, ld, fd, $c, ek, fk, sg, ik, rh, hk, am, nq, pq, rq, xq, zq, tq, vq, zm, oq, qq, sq, yq, Aq, uq, wq, en, fn, ln, qn, rn, wn, Bn, Cn, Hn, Mn, Nn, Sn, Cp, Dp, Fp, cq, eq, dq, fq, up, vp, xp, Kp, Lp, Np, Sp, Tp, Vp, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys, Ys];
  var xb = [Zs];
  var yb = [_s, Lg, Mg, Ng];
  var zb = [$s, jm, Im, zp, Ap, rp, sp, Hp, Ip, Pp, Qp, $s, $s, $s, $s, $s];
  var Ab = [at, np, Wo, Xo, Yo, cp, at, at];
  var Bb = [bt, qg, Qh, Ph, Oh, ck, xo, Co];
  var Cb = [ct, oc, tg, ug, jk, lk, ip, kp, mp, Zo, $o, bp, ct, ct, ct, ct];
  var Db = [dt, Jk, Ok, Al, Bl, Gl, Ml, Pl, Ql, Tl, Yl, pp, Bp, Ep, ep, tp, wp, Jp, Mp, Rp, Up, dt, dt, dt, dt, dt, dt, dt, dt, dt, dt, dt];
  var Eb = [et, rg, Dh, Eh, Gh, dk, Kk, Pk];
  return {
   _49d2f7fc: pc,
   _2d2d9ef8: Og,
   _6af64a53: Wg,
   _521f56f4: fg,
   _704d5622: Tg,
   _5e0aa768: qc,
   _7a46b18d: zf,
   _1f5fc56a: ls,
   _72dcd92b: tc,
   _11572611: Vg,
   _102e492d: os,
   _790f3ed6: Zg,
   _24a1bf26: Qg,
   _4edc0a70: ks,
   _5bd2358b: rc,
   _7a1b0472: sc,
   _140832cf: ns,
   _5f0f1a43: Ug,
   _3c270459: Df,
   _51a118dd: js,
   _15b6f24d: ms,
   _4756c525: uc,
   _17a318a7: Yg,
   _78594a66: Ef,
   _6c527a0b: Xg,
   _2c66bb39: kj,
   _14faa56: Rg,
   _22bcfc20: ps,
   _578903fe: Gg,
   _ef979e9: jj,
   _6dc4de79: _g,
   _3a1043ed: Sg,
   _158adb39: Pg,
   _17899: Sb,
   _570edbd4: dc,
   _5f3b2dfb: Lf,
   _254d07f4: hg,
   _2f496539: $g,
   runPostSets: is,
   stackAlloc: Fb,
   stackSave: Gb,
   stackRestore: Hb,
   establishStackSpace: Ib,
   setThrew: Jb,
   setTempRet0: Mb,
   getTempRet0: Nb,
   dynCall_iiiiiiii: zs,
   dynCall_iiii: As,
   dynCall_viiiii: Bs,
   dynCall_iiiiiid: Cs,
   dynCall_vi: Ds,
   dynCall_vii: Es,
   dynCall_iiiiiii: Fs,
   dynCall_iiiiid: Gs,
   dynCall_ii: Hs,
   dynCall_viii: Is,
   dynCall_v: Js,
   dynCall_iiiiiiiii: Ks,
   dynCall_iiiii: Ls,
   dynCall_viiiiii: Ms,
   dynCall_iii: Ns,
   dynCall_iiiiii: Os,
   dynCall_viiii: Ps
  }
 })


 // EMSCRIPTEN_END_ASM
 (c.Ia, c.Ja, x), Db = c._49d2f7fc = f._49d2f7fc;
 c._2d2d9ef8 = f._2d2d9ef8;
 var vb =
  c._6af64a53 = f._6af64a53,
  Cb = c._521f56f4 = f._521f56f4,
  Tb = c._2f496539 = f._2f496539,
  xb = c._704d5622 = f._704d5622,
  la = c._7a46b18d = f._7a46b18d,
  bc = c._1f5fc56a = f._1f5fc56a,
  Rb = c._5f3b2dfb = f._5f3b2dfb,
  Hb = c._72dcd92b = f._72dcd92b,
  zb = c._11572611 = f._11572611,
  hc = c._102e492d = f._102e492d,
  Pb = c._17899 = f._17899,
  jb = c._790f3ed6 = f._790f3ed6,
  sb = c._24a1bf26 = f._24a1bf26,
  Qb = c._570edbd4 = f._570edbd4,
  Xb = c._4edc0a70 = f._4edc0a70,
  Fb = c._5bd2358b = f._5bd2358b,
  Gb = c._7a1b0472 = f._7a1b0472,
  ec = c._140832cf = f._140832cf,
  Sb = c._254d07f4 = f._254d07f4,
  yb = c._5f0f1a43 = f._5f0f1a43,
  ib = c._3c270459 = f._3c270459,
  Ub = c._51a118dd = f._51a118dd,
  dc = c._15b6f24d = f._15b6f24d,
  Ib = c._4756c525 = f._4756c525,
  Bb = c._17a318a7 = f._17a318a7;
 c.runPostSets = f.runPostSets;
 var Kb = c._78594a66 = f._78594a66,
  Eb = c._5e0aa768 = f._5e0aa768,
  y = c._2c66bb39 = f._2c66bb39,
  ub = c._14faa56 = f._14faa56,
  ic = c._22bcfc20 = f._22bcfc20,
  Ab = c._578903fe = f._578903fe,
  z = c._ef979e9 = f._ef979e9,
  Jb = c._6dc4de79 = f._6dc4de79,
  tb = c._6c527a0b = f._6c527a0b,
  wb = c._3a1043ed = f._3a1043ed,
  rb = c._158adb39 = f._158adb39;
 c.dynCall_iiiiiiii =
  f.dynCall_iiiiiiii;
 c.dynCall_iiii = f.dynCall_iiii;
 c.dynCall_viiiii = f.dynCall_viiiii;
 c.dynCall_iiiiiid = f.dynCall_iiiiiid;
 c.dynCall_vi = f.dynCall_vi;
 c.dynCall_vii = f.dynCall_vii;
 c.dynCall_iiiiiii = f.dynCall_iiiiiii;
 c.dynCall_iiiiid = f.dynCall_iiiiid;
 c.dynCall_ii = f.dynCall_ii;
 c.dynCall_viii = f.dynCall_viii;
 c.dynCall_v = f.dynCall_v;
 c.dynCall_iiiiiiiii = f.dynCall_iiiiiiiii;
 c.dynCall_iiiii = f.dynCall_iiiii;
 c.dynCall_viiiiii = f.dynCall_viiiiii;
 c.dynCall_iii = f.dynCall_iii;
 c.dynCall_iiiiii = f.dynCall_iiiiii;
 c.dynCall_viiii =
  f.dynCall_viiii;
 k.ba = f.stackAlloc;
 k.pa = f.stackSave;
 k.da = f.stackRestore;
 k.Bb = f.establishStackSpace;
 k.eb = f.setTempRet0;
 k.Qa = f.getTempRet0;
 S.prototype = Error();
 S.prototype.constructor = S;
 var pb, Va = null,
  U = function b() {
   c.calledRun || wa();
   c.calledRun || (U = b)
  };
 c.callMain = c.ub = function(b) {
  function d() {
   for (var b = 0; 3 > b; b++) f.push(0)
  }
  u(0 == H, "cannot call main when async dependencies remain! (listen on _36fa737e)");
  u(0 == ua.length, "cannot call main when preRun functions remain to be called");
  b = b || [];
  Z || (Z = !0, R(ja));
  var e = b.length + 1,
   f = [E(T(c.thisProgram), "i8", 0)];
  d();
  for (var h = 0; h < e - 1; h += 1) f.push(E(T(b[h]), "i8", 0)), d();
  f.push(0);
  f = E(f, "i32", 0);
  try {
   var l = c._2d2d9ef8(e, f, 0);
   Wa(l, !0)
  } catch (k) {
   if (!(k instanceof S))
    if ("SimulateInfiniteLoop" == k) c.noExitRuntime = !0;
    else throw k && "object" === typeof k && k.stack && c.P("exception thrown: " + [k, k.stack]), k;
  } finally {}
 };
 c.run = c.run = wa;
 c.exit = c.exit = Wa;
 var Ya = [];
 c.abort = c.abort = K;
 if (c.preInit)
  for ("function" == typeof c.preInit && (c.preInit = [c.preInit]); 0 < c.preInit.length;) c.preInit.pop()();
 var Ua = !0;
 c.noInitialRun && (Ua = !1);
 c.noExitRuntime = !0;
 wa()
})(window);

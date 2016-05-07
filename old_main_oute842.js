(function(a, c) {
 function r(a, d) {
  if (d) {
   var f = new Date;
   f.setTime(f.getTime() + 864E5 * d);
   f = "; expires=" + f.toGMTString()
  } else f = "";
  document.cookie = "agario_redirect=" + a + f + "; path=/"
 }

 function N() {
  for (var a = document.cookie.split(";"), d = 0; d < a.length; d++) {
   for (var f = a[d];
    " " == f.charAt(0);) f = f.substring(1, f.length);
   if (0 == f.indexOf("agario_redirect=")) return f.substring(16, f.length)
  }
  return null
 }

 function O() {
  c.get(P + "//gc.agar.io", function(a) {
   var d = a.split(" ");
   a = d[0];
   d = d[1] || "";
   q.hasOwnProperty(a) && ("string" == typeof q[a] ? MC.getRegion() || MC.setRegion(q[a]) : q[a].hasOwnProperty(d) && (MC.getRegion() || MC.setRegion(q[a][d])))
  }, "text")
 }

 function Q() {
  a.onkeydown = function(b) {
   if (!y[b.keyCode]) switch (y[b.keyCode] = !0, b.keyCode) {
    case 32:
     a.core && a.core.split && a.core.split();
     b.preventDefault();
     break;
    case 87:
     a.core && a.core.eject && a.core.eject();
     break;
    case 81:
     a.core && a.core.specialOn && a.core.specialOn();
     break;
    case 27:
     b.preventDefault(), MC.showNickDialog(300), c("#oferwallContainer").is(":visible") && a.closeOfferwall(), c("#videoContainer").is(":visible") && a.closeVideoContainer()
   }
  };
  a.onkeyup = function(b) {
   y[b.keyCode] = !1;
   81 == b.keyCode && a.specialOff && a.core.specialOff()
  }
 }

 function B(b) {
  b.preventDefault();
  a.core && a.core.playerZoom && a.core.playerZoom(b.wheelDelta / -120 || b.detail || 0)
 }

 function R() {
  e = t
 }

 function C(a) {
  e.context = "google" == a ? "google" : "facebook";
  u()
 }

 function u() {
  a.localStorage[n] = JSON.stringify(e);
  e = JSON.parse(a.localStorage[n]);
  a.storageInfo = e;
  "google" == e.context ? (c("#gPlusShare").show(), c("#fbShare").hide()) : (c("#gPlusShare").hide(), c("#fbShare").show())
 }

 function D(b) {
  c("#helloContainer").attr("data-has-account-data");
  "" != b.displayName && (b.name = b.displayName);
  if (null == b.name || void 0 == b.name) b.name = "";
  var d = b.name.lastIndexOf("_"); - 1 != d && (b.name = b.name.substring(0, d));
  c("#helloContainer").attr("data-has-account-data", "1");
  c("#helloContainer").attr("data-logged-in", "1");
  c(".agario-profile-panel .progress-bar-star").text(b.level);
  c(".agario-exp-bar .progress-bar-text").text(b.xp + "/" + b.xpNeeded + " XP");
  c(".agario-exp-bar .progress-bar").css("width", (88 * b.xp / b.xpNeeded).toFixed(2) + "%");
  c(".agario-profile-name").text(b.name);
  "" != b.picture && c(".agario-profile-picture").attr("src", b.picture);
  e.userInfo.level = b.level;
  e.userInfo.xp = b.xp;
  e.userInfo.xpNeeded = b.xpNeeded;
  e.userInfo.displayName = b.name;
  e.userInfo.loggedIn = "1";
  a.updateStorage()
 }

 function p(b, d) {
  var f = b;
  if (e.userInfo.loggedIn) {
   var v = c("#helloContainer").is(":visible") && "1" == c("#helloContainer").attr("data-has-account-data");
   if (null == f || void 0 == f) f = e.userInfo;
   if (v) {
    var l = +c(".agario-exp-bar .progress-bar-text").first().text().split("index.html")[0],
     v = +c(".agario-exp-bar .progress-bar-text").first().text().split("index.html")[1].split(" ")[0],
     k = c(".agario-profile-panel .progress-bar-star").first().text();
    if (k != f.level) p({
     xp: v,
     xpNeeded: v,
     level: k
    }, function() {
     c(".agario-profile-panel .progress-bar-star").text(f.level);
     c(".agario-exp-bar .progress-bar").css("width", "100%");
     c(".progress-bar-star").addClass("animated tada").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
      c(".progress-bar-star").removeClass("animated tada")
     });
     setTimeout(function() {
      c(".agario-exp-bar .progress-bar-text").text(f.xpNeeded + "/" + f.xpNeeded + " XP");
      p({
       xp: 0,
       xpNeeded: f.xpNeeded,
       level: f.level
      }, function() {
       p(f)
      })
     }, 1E3)
    });
    else {
     var g = Date.now(),
      m = function() {
       var b;
       b = (Date.now() - g) / 1E3;
       b = 0 > b ? 0 : 1 < b ? 1 : b;
       b = b * b * (3 - 2 * b);
       c(".agario-exp-bar .progress-bar-text").text(~~(l + (f.xp - l) * b) + "/" + f.xpNeeded + " XP");
       c(".agario-exp-bar .progress-bar").css("width", (88 * (l + (f.xp - l) * b) / f.xpNeeded).toFixed(2) + "%");
       d && d();
       1 > b && a.requestAnimationFrame(m)
      };
     a.requestAnimationFrame(m)
    }
   }
  }
 }

 function E() {
  function b() {
   null == a.FB ? alert("You seem to have something blocking Facebook on your browser, please check for any extensions") : (e.loginIntent = "1", a.updateStorage(), a.FB.login(function(a) {
    F(a)
   }, {
    scope: "public_profile, email"
   }))
  }
  1 != G && 0 != z && 0 != H && (G = !0, ("1" == a.storageInfo.loginIntent && "facebook" == a.storageInfo.context || I) && a.FB.getLoginStatus(function(b) {
   "connected" === b.status ? F(b) : a.logout()
  }), a.facebookRelogin = b, a.facebookLogin = b)
 }

 function F(b) {
  if ("connected" == b.status) {
   var d = b.authResponse.accessToken;
   null == d || "undefined" == d || "" == d ? (3 > J && (J++, a.facebookRelogin()), a.logout()) : (a.MC.doLoginWithFB(d), g.cache.login_info = [d, "facebook"], a.FB.api("/me/picture?width=180&height=180", function(d) {
    e.userInfo.picture = d.data.url;
    a.updateStorage();
    c(".agario-profile-picture").attr("src", d.data.url);
    e.userInfo.socialId = b.authResponse.userID;
    w()
   }), c("#helloContainer").attr("data-logged-in", "1"), e.context = "facebook", e.loginIntent = "1", a.updateStorage(), a.MC.showInstructionsPanel(!0))
  }
 }

 function T(b) {
  var d = c(".stats-time-alive").text();
  return a.parseString(b, "%@", [d.split(":")[0], d.split(":")[1], c(".stats-highest-mass").text()])
 }
 var h = document.createElement("canvas");
 if ("undefined" == typeof console || "undefined" == typeof DataView || "undefined" == typeof WebSocket || null == h || null == h.getContext || null == a.localStorage) alert("You browser does not support this game, we recommend you to use Firefox to play this");
 else {
  var z = !1,
   x = {};
  (function() {
   var b = a.location.search;
   "?" == b.charAt(0) && (b = b.slice(1));
   for (var b = b.split("&"), d = 0; d < b.length; d++) {
    var c = b[d].split("=");
    x[c[0]] = c[1]
   }
  })();
  a.queryString = x;
  var I = "fb" in x,
   h = "miniclip" in x,
   U = function() {
    r("", -1)
   },
   K = "http:" != a.location.protocol,
   V = "1" == N(),
   L = !1;
  I || h || (K && !V ? (r("1", 1), a.location.href = "http:" + a.location.href.substring(a.location.protocol.length), L = !0) : r("", -1));
  K || r("", -1);
  L || setTimeout(U, 3E3);
  if (!a.agarioNoInit) {
   var P = a.location.protocol,
    h = a.navigator.userAgent;
   if (-1 != h.indexOf("Android")) a.ga && a.ga("send", "event", "MobileRedirect", "PlayStore"), setTimeout(function() {
    a.location.href = "https://play.google.com/store/apps/details?id=com.miniclip.agar.io"
   }, 1E3);
   else if (-1 != h.indexOf("iPhone") || -1 != h.indexOf("iPad") || -1 != h.indexOf("iPod")) a.ga && a.ga("send", "event", "MobileRedirect", "AppStore"), setTimeout(function() {
    a.location.href = "https://itunes.apple.com/app/agar.io/id995999703?mt=8&at=1l3vajp"
   }, 1E3);
   else {
    var g = {};
    a.agarApp = g;
    (new Image).src = "img/split.png";
    a.agarioInit = function() {
     z = !0;
     MC.wasInitialized();
     null != a.localStorage[n] && (e = JSON.parse(a.localStorage[n]));
     "1" == e.loginIntent && C(e.context);
     "" == e.userInfo.name && "" == e.userInfo.displayName || D(e.userInfo);
     E();
     g.a.b();
     O();
     MC.getLatestConfigurationID();
     g.core.init();
     MC.refreshRegionInfo();
     setInterval(MC.refreshRegionInfo, 18E4);
     /firefox/i.test(navigator.userAgent) ? document.addEventListener("DOMMouseScroll", B, !1) : document.body.onmousewheel = B;
     MC.getRegion() && c("#region").val(MC.getRegion());
     MC.checkRegion();
     MC.setRegion(c("#region").val());
     presetGameMode && MC.setGameMode(presetGameMode, !1);
     MC.reconnect();
     MC.showNickDialog(0);
     a.location.hash && 6 <= a.location.hash.length && MC.joinParty(a.location.hash);
     a.MC.setInGameState(!1)
    };
    a.setAcid = function() {};
    var y = {};
    a.addKeyListeners = Q;
    h = function(b) {
     var d = {},
      f = !1,
      e = {
       skipDraw: !0,
       predictionModifier: 1.1
      };
     b.init = function() {
      g.account.init();
      g.google.g();
      g.a.init();
      (f = "debug" in a.queryString) && g.debug.showDebug()
     };
     b.bind = function(a, b) {
      c(d).bind(a, b)
     };
     b.unbind = function(a, b) {
      c(d).unbind(a, b)
     };
     b.trigger = function(a, b) {
      c(d).trigger(a, b)
     };
     b.__defineGetter__("debug", function() {
      return f
     });
     b.__defineSetter__("debug", function(a) {
      return f = a
     });
     b.__defineGetter__("proxy", function() {
      return a.MC
     });
     b.__defineGetter__("config", function() {
      return e
     });
     return b
    }({});
    g.core = h;
    g.cache = {};
    h = function(a) {
     function d(a, b, d, f) {
      a = a + "Canvas";
      var e = c("<canvas>", {
       id: a
      });
      k.append(e);
      d = new SmoothieChart(d);
      for (e = 0; e < b.length; e++) {
       var l = b[e],
        m = _.extend(S, f[e]);
       d.addTimeSeries(l, m)
      }
      d.streamTo(document.getElementById(a), 0)
     }

     function f(a, b) {
      m[a] = e();
      d(a, [m[a]], b, [{
       strokeStyle: "rgba(0, 255, 0, 1)",
       fillStyle: "rgba(0, 255, 0, 0.2)",
       lineWidth: 2
      }])
     }

     function e() {
      return new TimeSeries({
       w: !1
      })
     }
     var l = !1,
      k, h = !1,
      m = {},
      S = {
       strokeStyle: "rgba(0, 255, 0, 1)",
       fillStyle: "rgba(0, 255, 0, 0.2)",
       lineWidth: 2
      };
     a.showDebug = function() {
      l || (k = c("#debug-overlay"), f("networkUpdate", {
       name: "network updates",
       minValue: 0,
       maxValue: 240
      }), m.rttSDev = e(), m.rttMean = e(), d("rttMean", [m.rttSDev, m.rttMean], {
       name: "rtt",
       minValue: 0,
       maxValue: 120
      }, [{
       strokeStyle: "rgba(255, 0, 0, 1)",
       fillStyle: "rgba(0, 255, 0, 0.2)",
       lineWidth: 2
      }, {
       strokeStyle: "rgba(0, 255, 0, 1)",
       fillStyle: "rgba(0, 255, 0, 0)",
       lineWidth: 2
      }]), f("fps", {
       name: "fps",
       minValue: 0,
       maxValue: 70
      }), l = !0);
      g.core.debug = !0;
      k.show()
     };
     a.hideDebug = function() {
      k.hide();
      g.core.debug = !1
     };
     a.updateChart = function(a, b, d) {
      l && a in m && m[a].append(b, d)
     };
     a.__defineGetter__("showPrediction", function() {
      return h
     });
     a.__defineSetter__("showPrediction", function(a) {
      return h = a
     });
     return a
    }({});
    g.debug = h;
    var q = {
     AF: "JP-Tokyo",
     AX: "EU-London",
     AL: "EU-London",
     DZ: "EU-London",
     AS: "SG-Singapore",
     AD: "EU-London",
     AO: "EU-London",
     AI: "US-Atlanta",
     AG: "US-Atlanta",
     AR: "BR-Brazil",
     AM: "JP-Tokyo",
     AW: "US-Atlanta",
     AU: "SG-Singapore",
     AT: "EU-London",
     AZ: "JP-Tokyo",
     BS: "US-Atlanta",
     BH: "JP-Tokyo",
     BD: "JP-Tokyo",
     BB: "US-Atlanta",
     BY: "EU-London",
     BE: "EU-London",
     BZ: "US-Atlanta",
     BJ: "EU-London",
     BM: "US-Atlanta",
     BT: "JP-Tokyo",
     BO: "BR-Brazil",
     BQ: "US-Atlanta",
     BA: "EU-London",
     BW: "EU-London",
     BR: "BR-Brazil",
     IO: "JP-Tokyo",
     VG: "US-Atlanta",
     BN: "JP-Tokyo",
     BG: "EU-London",
     BF: "EU-London",
     BI: "EU-London",
     KH: "JP-Tokyo",
     CM: "EU-London",
     CA: "US-Atlanta",
     CV: "EU-London",
     KY: "US-Atlanta",
     CF: "EU-London",
     TD: "EU-London",
     CL: "BR-Brazil",
     CN: "CN-China",
     CX: "JP-Tokyo",
     CC: "JP-Tokyo",
     CO: "BR-Brazil",
     KM: "EU-London",
     CD: "EU-London",
     CG: "EU-London",
     CK: "SG-Singapore",
     CR: "US-Atlanta",
     CI: "EU-London",
     HR: "EU-London",
     CU: "US-Atlanta",
     CW: "US-Atlanta",
     CY: "JP-Tokyo",
     CZ: "EU-London",
     DK: "EU-London",
     DJ: "EU-London",
     DM: "US-Atlanta",
     DO: "US-Atlanta",
     EC: "BR-Brazil",
     EG: "EU-London",
     SV: "US-Atlanta",
     GQ: "EU-London",
     ER: "EU-London",
     EE: "EU-London",
     ET: "EU-London",
     FO: "EU-London",
     FK: "BR-Brazil",
     FJ: "SG-Singapore",
     FI: "EU-London",
     FR: "EU-London",
     GF: "BR-Brazil",
     PF: "SG-Singapore",
     GA: "EU-London",
     GM: "EU-London",
     GE: "JP-Tokyo",
     DE: "EU-London",
     GH: "EU-London",
     GI: "EU-London",
     GR: "EU-London",
     GL: "US-Atlanta",
     GD: "US-Atlanta",
     GP: "US-Atlanta",
     GU: "SG-Singapore",
     GT: "US-Atlanta",
     GG: "EU-London",
     GN: "EU-London",
     GW: "EU-London",
     GY: "BR-Brazil",
     HT: "US-Atlanta",
     VA: "EU-London",
     HN: "US-Atlanta",
     HK: "JP-Tokyo",
     HU: "EU-London",
     IS: "EU-London",
     IN: "JP-Tokyo",
     ID: "JP-Tokyo",
     IR: "JP-Tokyo",
     IQ: "JP-Tokyo",
     IE: "EU-London",
     IM: "EU-London",
     IL: "JP-Tokyo",
     IT: "EU-London",
     JM: "US-Atlanta",
     JP: "JP-Tokyo",
     JE: "EU-London",
     JO: "JP-Tokyo",
     KZ: "JP-Tokyo",
     KE: "EU-London",
     KI: "SG-Singapore",
     KP: "JP-Tokyo",
     KR: "JP-Tokyo",
     KW: "JP-Tokyo",
     KG: "JP-Tokyo",
     LA: "JP-Tokyo",
     LV: "EU-London",
     LB: "JP-Tokyo",
     LS: "EU-London",
     LR: "EU-London",
     LY: "EU-London",
     LI: "EU-London",
     LT: "EU-London",
     LU: "EU-London",
     MO: "JP-Tokyo",
     MK: "EU-London",
     MG: "EU-London",
     MW: "EU-London",
     MY: "JP-Tokyo",
     MV: "JP-Tokyo",
     ML: "EU-London",
     MT: "EU-London",
     MH: "SG-Singapore",
     MQ: "US-Atlanta",
     MR: "EU-London",
     MU: "EU-London",
     YT: "EU-London",
     MX: "US-Atlanta",
     FM: "SG-Singapore",
     MD: "EU-London",
     MC: "EU-London",
     MN: "JP-Tokyo",
     ME: "EU-London",
     MS: "US-Atlanta",
     MA: "EU-London",
     MZ: "EU-London",
     MM: "JP-Tokyo",
     NA: "EU-London",
     NR: "SG-Singapore",
     NP: "JP-Tokyo",
     NL: "EU-London",
     NC: "SG-Singapore",
     NZ: "SG-Singapore",
     NI: "US-Atlanta",
     NE: "EU-London",
     NG: "EU-London",
     NU: "SG-Singapore",
     NF: "SG-Singapore",
     MP: "SG-Singapore",
     NO: "EU-London",
     OM: "JP-Tokyo",
     PK: "JP-Tokyo",
     PW: "SG-Singapore",
     PS: "JP-Tokyo",
     PA: "US-Atlanta",
     PG: "SG-Singapore",
     PY: "BR-Brazil",
     PE: "BR-Brazil",
     PH: "JP-Tokyo",
     PN: "SG-Singapore",
     PL: "EU-London",
     PT: "EU-London",
     PR: "US-Atlanta",
     QA: "JP-Tokyo",
     RE: "EU-London",
     RO: "EU-London",
     RU: "RU-Russia",
     RW: "EU-London",
     BL: "US-Atlanta",
     SH: "EU-London",
     KN: "US-Atlanta",
     LC: "US-Atlanta",
     MF: "US-Atlanta",
     PM: "US-Atlanta",
     VC: "US-Atlanta",
     WS: "SG-Singapore",
     SM: "EU-London",
     ST: "EU-London",
     SA: "EU-London",
     SN: "EU-London",
     RS: "EU-London",
     SC: "EU-London",
     SL: "EU-London",
     SG: "JP-Tokyo",
     SX: "US-Atlanta",
     SK: "EU-London",
     SI: "EU-London",
     SB: "SG-Singapore",
     SO: "EU-London",
     ZA: "EU-London",
     SS: "EU-London",
     ES: "EU-London",
     LK: "JP-Tokyo",
     SD: "EU-London",
     SR: "BR-Brazil",
     SJ: "EU-London",
     SZ: "EU-London",
     SE: "EU-London",
     CH: "EU-London",
     SY: "EU-London",
     TW: "JP-Tokyo",
     TJ: "JP-Tokyo",
     TZ: "EU-London",
     TH: "JP-Tokyo",
     TL: "JP-Tokyo",
     TG: "EU-London",
     TK: "SG-Singapore",
     TO: "SG-Singapore",
     TT: "US-Atlanta",
     TN: "EU-London",
     TR: "TK-Turkey",
     TM: "JP-Tokyo",
     TC: "US-Atlanta",
     TV: "SG-Singapore",
     UG: "EU-London",
     UA: "EU-London",
     AE: "EU-London",
     GB: "EU-London",
     US: "US-Atlanta",
     UM: "SG-Singapore",
     VI: "US-Atlanta",
     UY: "BR-Brazil",
     UZ: "JP-Tokyo",
     VU: "SG-Singapore",
     VE: "BR-Brazil",
     VN: "JP-Tokyo",
     WF: "SG-Singapore",
     EH: "EU-London",
     YE: "JP-Tokyo",
     ZM: "EU-London",
     ZW: "EU-London"
    };
    a.Maths = function(a) {
     function d(a, b, d) {
      return a < b ? b : a > d ? d : a
     }
     a.s = function(a, b, c) {
      c = d(c, 0, 1);
      return a + c * (b - a)
     };
     a.o = d;
     a.fixed = function(a, b) {
      var d = Math.pow(10, b);
      return ~~(a * d) / d
     };
     return a
    }({});
    a.Utils = function(a) {
     a.v = function() {
      for (var a = new Date, b = [a.getMonth() + 1, a.getDate(), a.getFullYear()], a = [a.getHours(), a.getMinutes(), a.getSeconds()], c = 1; 3 > c; c++) 10 > a[c] && (a[c] = "0" + a[c]);
      return "[" + b.join("index.html") + " " + a.join(":") + "]"
     };
     return a
    }({});
    Date.now || (Date.now = function() {
     return (new Date).getTime()
    });
    var n = "storeObjectInfo",
     t = {
      context: null,
      defaultProvider: "facebook",
      loginIntent: "0",
      userInfo: {
       socialToken: null,
       tokenExpires: "",
       level: "",
       xp: "",
       xpNeeded: "",
       name: "",
       picture: "",
       displayName: "",
       loggedIn: "0",
       socialId: ""
      }
     },
     e = a.defaultSt = t;
    a.storageInfo = e;
    a.createDefaultStorage = R;
    a.updateStorage = u;
    a.checkLoginStatus = function() {
     "1" == e.loginIntent && (w(), C(e.context))
    };
    var w = function() {
     a.MC.setProfilePicture(e.userInfo.picture);
     a.MC.setSocialId(e.userInfo.socialId)
    };
    a.logout = function() {
     e = t;
     delete a.localStorage[n];
     a.localStorage[n] = JSON.stringify(t);
     u();
     M();
     g.cache.sentGameServerLogin = !1;
     delete g.cache.login_info;
     c("#helloContainer").attr("data-logged-in", "0");
     c("#helloContainer").attr("data-has-account-data", "0");
     c(".timer").text("");
     c("#gPlusShare").hide();
     c("#fbShare").show();
     c("#user-id-tag").text("");
     c(".shop-blocker").fadeOut(100);
     MC.doLogout();
     MC.reconnect()
    };
    a.animateAccountData = p;
    a.toggleSocialLogin = function() {
     c("#socialLoginContainer").toggle();
     c("#settings").hide();
     c("#instructions").hide();
     MC.showInstructionsPanel()
    };
    a.toggleSettings = function() {
     c("#settings").toggle();
     c("#socialLoginContainer").hide();
     c("#instructions").hide();
     MC.showInstructionsPanel()
    };
    g.account = function(b) {
     function d() {}

     function f(b, c) {
      if (null == h || h.id != c.id) h = c, null != a.ssa_json && (a.ssa_json.applicationUserId = "" + c.id, a.ssa_json.custom_user_id = "" + c.id), "undefined" != typeof SSA_CORE && SSA_CORE.start()
     }
     var h = null;
     b.init = function() {
      g.core.bind("user_login", f);
      g.core.bind("user_logout", d)
     };
     b.setUserData = function(a) {
      D(a)
     };
     b.setAccountData = function(a, b) {
      var d = c("#helloContainer").attr("data-has-account-data", "1");
      e.userInfo.xp = a.xp;
      e.userInfo.xpNeeded = a.xpNeeded;
      e.userInfo.level = a.level;
      u();
      d && b ? p(a) : (c(".agario-profile-panel .progress-bar-star").text(a.level), c(".agario-exp-bar .progress-bar-text").text(a.xp + "/" + a.xpNeeded + " XP"), c(".agario-exp-bar .progress-bar").css("width", (88 * a.xp / a.xpNeeded).toFixed(2) + "%"))
     };
     b.m = function(a) {
      p(a)
     };
     return b
    }({});
    var J = 0,
     H = !1,
     G = !1;
    a.fbAsyncInit = function() {
     a.FB.init({
      appId: EnvConfig.fb_app_id,
      cookie: !0,
      xfbml: !0,
      status: !0,
      version: "v2.2"
     });
     H = !0;
     E()
    };
    var A = !1;
    (function(b) {
     function d() {
      var a = document.createElement("script");
      a.type = "text/javascript";
      a.async = !0;
      a.src = "../apis.google.com/js/client_platformb94a.js?onload=gapiAsyncInit";
      var b = document.getElementsByTagName("script")[0];
      b.parentNode.insertBefore(a, b);
      g = !0
     }
     var e = {},
      g = !1;
     a.gapiAsyncInit = function() {
      c(e).trigger("initialized")
     };
     b.google = {
      g: function() {
       d()
      },
      f: function(b, c) {
       a.gapi.client.load("plus", "v1", function() {
        console.log("fetching me profile");
        gapi.client.plus.people.get({
         userId: "me"
        }).execute(function(a) {
         c(a)
        })
       })
      }
     };
     b.j = function(a) {
      g || d();
      "undefined" !== typeof gapi ? a() : c(e).bind("initialized", a)
     };
     return b
    })(g);
    h = function(b) {
     function d(b) {
      a.MC.doLoginWithGPlus(b);
      g.cache.login_info = [b, "google"];
      a.MC.showInstructionsPanel(!0)
     }

     function f(a) {
      e.userInfo.picture = a;
      c(".agario-profile-picture").attr("src", a)
     }
     var h = !1,
      l = !1,
      k = null,
      n = {
       client_id: EnvConfig.gplus_client_id,
       cookie_policy: "single_host_origin",
       scope: "profile email"
      };
     b.a = {
      c: function() {
       return k
      },
      init: function() {
       var b = this;
       g.j(function() {
        a.gapi.ytsubscribe.go("agarYoutube");
        h = !0;
        b.b()
       })
      },
      b: function() {
       if (1 != l && 0 != z && 0 != h) {
        l = !0;
        var b = e && "1" == e.loginIntent && "google" == e.context,
         c = this;
        a.gapi.load("auth2", function() {
         k = a.gapi.auth2.init(n);
         k.attachClickHandler(document.getElementById("gplusLogin"), {}, function(a) {
          console.log("googleUser : " + a)
         }, function(a) {
          console.log("failed to login in google plus: ", JSON.stringify(a, void 0, 2))
         });
         k.currentUser.listen(_.bind(c.i, c));
         b && 1 == k.isSignedIn.get() && k.signIn()
        })
       }
      },
      i: function(b) {
       if (k && b && k.isSignedIn.get() && !A) {
        A = !0;
        e.loginIntent = "1";
        var c = b.getAuthResponse(),
         h = c.access_token;
        a.c = c;
        console.log("loggedIn with G+!");
        var l = b.getBasicProfile();
        b = l.getImageUrl();
        void 0 == b ? g.google.f(c, function(b) {
         b.result.isPlusUser ? (b && f(b.image.url), d(h), b && (e.userInfo.picture = b.image.url), e.userInfo.socialId = l.getId(), w()) : (alert("Please add Google+ to your Google account and try again.\nOr you can login with another account."), a.logout())
        }) : (f(b), e.userInfo.picture = b, e.userInfo.socialId = l.getId(), w(), d(h));
        e.context = "google";
        a.updateStorage()
       }
      },
      h: function() {
       k && (k.signOut(), A = !1)
      }
     };
     return b
    }(g);
    a.gplusModule = h;
    var M = function() {
     g.a.h()
    };
    a.logoutGooglePlus = M;
    a.getStatsString = T;
    a.twitterShareStats = function() {
     a.open("https://twitter.com/intent/tweet?text=" + a.getStatsString("tt_share_stats"), "Agar.io", "width=660,height=310,menubar=no,toolbar=no,resizable=yes,scrollbars=no,left=" + (a.screenX + a.innerWidth / 2 - 330) + ",top=" + (a.innerHeight - 310) / 2)
    };
    a.fbShareStats = function() {
     var b = a.i18n("fb_matchresults_title"),
      c = a.i18n("fb_matchresults_description"),
      e = a.getStatsString("fb_matchresults_subtitle");
     a.FB.ui({
      method: "feed",
      display: "iframe",
      name: b,
      caption: c,
      description: e,
      link: "http://agar.io",
      u: "http://static2.miniclipcdn.com/mobile/agar/Agar.io_matchresults_fb_1200x630.png",
      l: {
       name: "play now!",
       link: "http://agar.io"
      }
     })
    };
    a.fillSocialValues = function(b, c) {
     1 == a.isChrome && "google" == a.storageInfo.context && a.gapi.interactivepost.render(c, {
      contenturl: EnvConfig.game_url,
      clientid: EnvConfig.gplus_client_id,
      cookiepolicy: "http://agar.io",
      prefilltext: b,
      calltoactionlabel: "BEAT",
      calltoactionurl: EnvConfig.game_url
     })
    };
    c(function() {
     "MAsyncInit" in a && a.MAsyncInit();
     c("[data-itr]").each(function() {
      var b = c(this),
       d = b.attr("data-itr");
      b.html(a.i18n(d))
     })
    })
   }
  }
 }
})(window, window.jQuery);
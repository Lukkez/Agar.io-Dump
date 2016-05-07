(function(window, $) {

 var testCanvas = document.createElement('canvas');
 if (typeof console == 'undefined' || typeof DataView == 'undefined' || typeof WebSocket == 'undefined' || testCanvas == null || testCanvas.getContext == null || window.localStorage == null) {
  alert("You browser does not support this game, we recommend you to use Firefox to play this");
  return;
 }

 var hasInitialized = false;

 /** PARSE ALL QUERYSTRING VALUES **/
 var queryString = {};
 (function() {
  var tmp = window.location.search;
  if (tmp.charAt(0) == '?') tmp = tmp.slice(1);
  var arr = tmp.split('&');
  for (var i = 0; i < arr.length; i++) {
   var kv = arr[i].split('=');
   queryString[kv[0]] = kv[1];
  }
 })();
 window["queryString"] = queryString;

 var isInFacebook = 'fb' in queryString;
 var isInMiniclip = 'miniclip' in queryString;
 var hasGamepadSupport = "gamepad" in queryString;


 var doHttpRedirect = function() {
  createCookie('agario_redirect', '1', 1);
  window.location.href = "http:" + window.location.href.substring(window.location.protocol.length);
 }

 /********** COOKIE *****************/
 var clearHttpRedirect = function() {
  eraseCookie('agario_redirect');
 }

 function createCookie(name, value, days) {
  if (days) {
   var date = new Date();
   date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
   var expires = "; expires=" + date.toGMTString();
  } else var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
 }

 function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
   var c = ca[i];
   while (c.charAt(0) == ' ') c = c.substring(1, c.length);
   if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
 }

 function eraseCookie(name) {
  createCookie(name, "", -1);
 }


 // ========== Handle Https redirect and loop detection ==============
 var isHttps = window.location.protocol != "http:";
 var gotRedirected = readCookie('agario_redirect') == '1';

 var goingToRedirect = false;
 if (!(isInFacebook || isInMiniclip)) {
  if (isHttps && !gotRedirected) {
   doHttpRedirect();
   goingToRedirect = true;

  } else {
   clearHttpRedirect();
  }
 }

 if (!isHttps) {
  clearHttpRedirect();
 }
 if (!goingToRedirect) {
  setTimeout(clearHttpRedirect, 3000);
 }

 // /Redirects
 if (window['agarioNoInit']) return;

 var protocol = window.location.protocol;
 var isSecure = (protocol == 'https:');

 var MASTER_URL = protocol + "//" + EnvConfig["master_url"] + "/";

 var ua = window.navigator.userAgent;
 if (ua.indexOf("Android") != -1) {
  if (window['ga']) {
   window['ga']('send', 'event', 'MobileRedirect', 'PlayStore');
  }

  setTimeout(function() {
   window.location.href = "https://play.google.com/store/apps/details?id=com.miniclip.agar.io";
  }, 1000);
  return;
 }

 if (ua.indexOf("iPhone") != -1 || ua.indexOf("iPad") != -1 || ua.indexOf("iPod") != -1) {
  if (window['ga']) {
   window['ga']('send', 'event', 'MobileRedirect', 'AppStore');
  }

  setTimeout(function() {
   window.location.href = "https://itunes.apple.com/app/agar.io/id995999703?mt=8&at=1l3vajp";
  }, 1000);
  return;
 }

 var agarApp = {};
 window['agarApp'] = agarApp;

 var isMobile = ('ontouchstart' in window) && (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent));
 var splitImg = new Image();
 splitImg.src = "/img/split.png";

 var givePriorityToGamepad = false;

 window['agarioInit'] = function() {
  hasInitialized = true;
  MC.wasInitialized();

  processLocalData();

  // check initial user login
  checkFacebookLogin();
  agarApp.gplus.checkGPlusLogin();
  //--

  loadCountryCodes();
  MC.getLatestConfigurationID();

  agarApp.core.init();

  //readStorageSettings();
  //applyStorageSettings();

  MC.refreshRegionInfo();
  setInterval(MC.refreshRegionInfo, 3 * 60 * 1000);

  if (/firefox/i.test(navigator.userAgent)) {
   document.addEventListener("DOMMouseScroll", onMouseWheel, false);
  } else {
   document.body['onmousewheel'] = onMouseWheel;
  }

  if (MC.getRegion()) {
   $('#region')['val'](MC.getRegion());
  }

  MC.checkRegion();
  MC.setRegion($('#region')['val']());

  // set the correct gamemode when tha game is accessed with /ffa, /party, /teams and /experimental
  if (presetGameMode) {
   MC.setGameMode(presetGameMode, false);
  }

  MC.reconnect();
  MC.showNickDialog(0);

  if (window.location.hash && window.location.hash.length >= 6) {
   MC.joinParty(window.location.hash);
  }

  window['MC']["setInGameState"](false);
 }

 var acid;
 window['setAcid'] = function(v) {
  acid = v;
 }

 function loadCountryCodes() {
  $.get(protocol + '//gc.agar.io', function(data) {
   var rdata = data.split(' ');
   var countryCode = rdata[0];
   var subcountryCode = rdata[1] || "";

   if (countries.hasOwnProperty(countryCode)) {
    if (typeof countries[countryCode] == 'string') {
     if (!MC.getRegion()) {
      MC.setRegion(countries[countryCode]);
     }
    } else {
     if (countries[countryCode].hasOwnProperty(subcountryCode)) {
      if (!MC.getRegion()) {
       MC.setRegion(countries[countryCode][subcountryCode]);
      }
     }
    }
   }

  }, 'text');
 }

 //New includes

 var keysDown = {};

 function addKeyListeners() {
  window.onkeydown = function(e) {
   if (keysDown[e.keyCode]) return;

   keysDown[e.keyCode] = true;

   switch (e.keyCode) {
    case 32: //space
     if (window['core'] && window['core']['split']) window['core']['split']();
     e.preventDefault();
     break;
    case 87:
     if (window['core'] && window['core']['eject']) window['core']['eject']();
     break;
    case 81:
     if (window['core'] && window['core']['specialOn']) window['core']['specialOn']();
     break;
    case 27: //ESC Key
     e.preventDefault();
     MC.showNickDialog(300);
     if ($('#oferwallContainer').is(':visible')) {
      window['closeOfferwall']();
     }

     if ($('#videoContainer').is(':visible')) {
      window['closeVideoContainer']();
     }
     break;
   }
  }

  window.onkeyup = function(e) {
   keysDown[e.keyCode] = false;

   if (e.keyCode == 81) {
    if (window['specialOff']) window['core']['specialOff']();
   }
  }
 }
 window["addKeyListeners"] = addKeyListeners;

 function onMouseWheel(e) {
  e.preventDefault();
  if (window['core'] && window['core']["playerZoom"]) window['core']["playerZoom"](e.wheelDelta / -120 || e.detail || 0);
 }



 // Core

 var _core = (function(exports) {
  var events = {};

  var _debug = false;

  var _config = {
   skipDraw: true,
   predictionModifier: 1.1
  }

  exports.init = function() {
   agarApp.account.init();
   agarApp.google.loadServices();
   agarApp.gplus.init();

   _debug = 'debug' in window['queryString'];

   if (_debug) {
    agarApp.debug.showDebug();
   }
  }

  exports.bind = function(event, handler) {
   $(events).bind(event, handler);
  }
  exports.unbind = function(event, handler) {
   $(events).unbind(event, handler);
  }
  exports.trigger = function(event, params) {
   $(events).trigger(event, params);
  }

  exports.__defineGetter__("debug", function() {
   return _debug;
  })

  exports.__defineSetter__("debug", function(value) {
   return _debug = value;
  })

  exports.__defineGetter__("proxy", function() {
   return window['MC'];
  })

  exports.__defineGetter__("config", function() {
   return _config;
  })

  return exports;
 })({});
 agarApp.core = _core;
 agarApp.cache = {}

 var _debug = (function(exports) {
  var _initialized = false;
  var _container;
  var _showPrediction = false;

  var _series = {};
  var _charts = {};

  var defaultSeriesStyle = {
   strokeStyle: 'rgba(0, 255, 0, 1)',
   fillStyle: 'rgba(0, 255, 0, 0.2)',
   lineWidth: 2
  };

  var createTimeseries = function() {
   var tseries = new TimeSeries({
    resetBounds: false
   });
   return tseries;
  }

  var createOneChart = function(id, opts) {
   _series[id] = createTimeseries();
   createChart(id, [_series[id]], opts, [{
    strokeStyle: 'rgba(0, 255, 0, 1)',
    fillStyle: 'rgba(0, 255, 0, 0.2)',
    lineWidth: 2
   }]);
  }
  var createChart = function(id, series, chart_opts, series_opts) {

   var canvasID = id + "Canvas";
   var chartDiv = $("<canvas>", {
    id: canvasID
   });
   _container.append(chartDiv);

   var chart = new SmoothieChart(chart_opts);
   for (var i = 0; i < series.length; i++) {
    var serie = series[i];
    var opts = _.extend(defaultSeriesStyle, series_opts[i]);
    chart.addTimeSeries(serie, opts);
   }

   chart.streamTo(document.getElementById(canvasID), 0);
   _charts[id] = _charts;
  }

  var init = function() {
   if (_initialized) return;

   _container = $('#debug-overlay');

   createOneChart('networkUpdate', {
    name: "network updates",
    minValue: 0,
    maxValue: 240
   });


   _series['rttSDev'] = createTimeseries();
   _series['rttMean'] = createTimeseries();
   createChart('rttMean', [_series['rttSDev'], _series['rttMean']], {
    name: "rtt",
    minValue: 0,
    maxValue: 120
   }, [{
    strokeStyle: 'rgba(255, 0, 0, 1)',
    fillStyle: 'rgba(0, 255, 0, 0.2)',
    lineWidth: 2
   }, {
    strokeStyle: 'rgba(0, 255, 0, 1)',
    fillStyle: 'rgba(0, 255, 0, 0)',
    lineWidth: 2
   }]);

   createOneChart('fps', {
    name: "fps",
    minValue: 0,
    maxValue: 70
   });

   //_charts['rttMean'].addTimeSeries(_series['rttSDev'], { strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 2 });

   _initialized = true;
  };

  exports.showDebug = function() {
   init();
   agarApp.core.debug = true;
   _container.show();
  };

  exports.hideDebug = function() {
   _container.hide();
   agarApp.core.debug = false;
  }

  exports.updateChart = function(id, time, value) {
   if (!_initialized) return;

   if (id in _series) {
    _series[id].append(time, value);
   }
  }

  exports.__defineGetter__("showPrediction", function() {
   return _showPrediction;
  })

  exports.__defineSetter__("showPrediction", function(value) {
   return _showPrediction = value;
  })

  return exports;
 })({});
 agarApp.debug = _debug;


 // Country list

 var countries = {
  'AF': 'JP-Tokyo',
  'AX': 'EU-London',
  'AL': 'EU-London',
  'DZ': 'EU-London',
  /* Actually Africa */
  'AS': 'SG-Singapore',
  'AD': 'EU-London',
  'AO': 'EU-London',
  /* Actually Africa */
  'AI': 'US-Atlanta',
  'AG': 'US-Atlanta',
  'AR': 'BR-Brazil',
  'AM': 'JP-Tokyo',
  'AW': 'US-Atlanta',
  'AU': 'SG-Singapore',
  'AT': 'EU-London',
  'AZ': 'JP-Tokyo',
  'BS': 'US-Atlanta',
  'BH': 'JP-Tokyo',
  'BD': 'JP-Tokyo',
  'BB': 'US-Atlanta',
  'BY': 'EU-London',
  'BE': 'EU-London',
  'BZ': 'US-Atlanta',
  'BJ': 'EU-London',
  /* Actually Africa */
  'BM': 'US-Atlanta',
  'BT': 'JP-Tokyo',
  'BO': 'BR-Brazil',
  'BQ': 'US-Atlanta',
  'BA': 'EU-London',
  'BW': 'EU-London',
  /* Actually Africa */
  'BR': 'BR-Brazil',
  'IO': 'JP-Tokyo',
  'VG': 'US-Atlanta',
  'BN': 'JP-Tokyo',
  'BG': 'EU-London',
  'BF': 'EU-London',
  /* Actually Africa */
  'BI': 'EU-London',
  /* Actually Africa */
  'KH': 'JP-Tokyo',
  'CM': 'EU-London',
  /* Actually Africa */
  'CA': 'US-Atlanta',
  'CV': 'EU-London',
  /* Actually Africa */
  'KY': 'US-Atlanta',
  'CF': 'EU-London',
  /* Actually Africa */
  'TD': 'EU-London',
  /* Actually Africa */
  'CL': 'BR-Brazil',
  'CN': 'CN-China',
  'CX': 'JP-Tokyo',
  'CC': 'JP-Tokyo',
  'CO': 'BR-Brazil',
  'KM': 'EU-London',
  /* Actually Africa */
  'CD': 'EU-London',
  /* Actually Africa */
  'CG': 'EU-London',
  /* Actually Africa */
  'CK': 'SG-Singapore',
  'CR': 'US-Atlanta',
  'CI': 'EU-London',
  /* Actually Africa */
  'HR': 'EU-London',
  'CU': 'US-Atlanta',
  'CW': 'US-Atlanta',
  'CY': 'JP-Tokyo',
  'CZ': 'EU-London',
  'DK': 'EU-London',
  'DJ': 'EU-London',
  /* Actually Africa */
  'DM': 'US-Atlanta',
  'DO': 'US-Atlanta',
  'EC': 'BR-Brazil',
  'EG': 'EU-London',
  /* Actually Africa */
  'SV': 'US-Atlanta',
  'GQ': 'EU-London',
  /* Actually Africa */
  'ER': 'EU-London',
  /* Actually Africa */
  'EE': 'EU-London',
  'ET': 'EU-London',
  /* Actually Africa */
  'FO': 'EU-London',
  'FK': 'BR-Brazil',
  'FJ': 'SG-Singapore',
  'FI': 'EU-London',
  'FR': 'EU-London',
  'GF': 'BR-Brazil',
  'PF': 'SG-Singapore',
  'GA': 'EU-London',
  /* Actually Africa */
  'GM': 'EU-London',
  /* Actually Africa */
  'GE': 'JP-Tokyo',
  'DE': 'EU-London',
  'GH': 'EU-London',
  /* Actually Africa */
  'GI': 'EU-London',
  'GR': 'EU-London',
  'GL': 'US-Atlanta',
  'GD': 'US-Atlanta',
  'GP': 'US-Atlanta',
  'GU': 'SG-Singapore',
  'GT': 'US-Atlanta',
  'GG': 'EU-London',
  'GN': 'EU-London',
  /* Actually Africa */
  'GW': 'EU-London',
  /* Actually Africa */
  'GY': 'BR-Brazil',
  'HT': 'US-Atlanta',
  'VA': 'EU-London',
  'HN': 'US-Atlanta',
  'HK': 'JP-Tokyo',
  'HU': 'EU-London',
  'IS': 'EU-London',
  'IN': 'JP-Tokyo',
  'ID': 'JP-Tokyo',
  'IR': 'JP-Tokyo',
  'IQ': 'JP-Tokyo',
  'IE': 'EU-London',
  'IM': 'EU-London',
  'IL': 'JP-Tokyo',
  'IT': 'EU-London',
  'JM': 'US-Atlanta',
  'JP': 'JP-Tokyo',
  'JE': 'EU-London',
  'JO': 'JP-Tokyo',
  'KZ': 'JP-Tokyo',
  'KE': 'EU-London',
  /* Actually Africa */
  'KI': 'SG-Singapore',
  'KP': 'JP-Tokyo',
  'KR': 'JP-Tokyo',
  'KW': 'JP-Tokyo',
  'KG': 'JP-Tokyo',
  'LA': 'JP-Tokyo',
  'LV': 'EU-London',
  'LB': 'JP-Tokyo',
  'LS': 'EU-London',
  /* Actually Africa */
  'LR': 'EU-London',
  /* Actually Africa */
  'LY': 'EU-London',
  /* Actually Africa */
  'LI': 'EU-London',
  'LT': 'EU-London',
  'LU': 'EU-London',
  'MO': 'JP-Tokyo',
  'MK': 'EU-London',
  'MG': 'EU-London',
  /* Actually Africa */
  'MW': 'EU-London',
  /* Actually Africa */
  'MY': 'JP-Tokyo',
  'MV': 'JP-Tokyo',
  'ML': 'EU-London',
  /* Actually Africa */
  'MT': 'EU-London',
  'MH': 'SG-Singapore',
  'MQ': 'US-Atlanta',
  'MR': 'EU-London',
  /* Actually Africa */
  'MU': 'EU-London',
  /* Actually Africa */
  'YT': 'EU-London',
  /* Actually Africa */
  'MX': 'US-Atlanta',
  'FM': 'SG-Singapore',
  'MD': 'EU-London',
  'MC': 'EU-London',
  'MN': 'JP-Tokyo',
  'ME': 'EU-London',
  'MS': 'US-Atlanta',
  'MA': 'EU-London',
  /* Actually Africa */
  'MZ': 'EU-London',
  /* Actually Africa */
  'MM': 'JP-Tokyo',
  'NA': 'EU-London',
  /* Actually Africa */
  'NR': 'SG-Singapore',
  'NP': 'JP-Tokyo',
  'NL': 'EU-London',
  'NC': 'SG-Singapore',
  'NZ': 'SG-Singapore',
  'NI': 'US-Atlanta',
  'NE': 'EU-London',
  /* Actually Africa */
  'NG': 'EU-London',
  /* Actually Africa */
  'NU': 'SG-Singapore',
  'NF': 'SG-Singapore',
  'MP': 'SG-Singapore',
  'NO': 'EU-London',
  'OM': 'JP-Tokyo',
  'PK': 'JP-Tokyo',
  'PW': 'SG-Singapore',
  'PS': 'JP-Tokyo',
  'PA': 'US-Atlanta',
  'PG': 'SG-Singapore',
  'PY': 'BR-Brazil',
  'PE': 'BR-Brazil',
  'PH': 'JP-Tokyo',
  'PN': 'SG-Singapore',
  'PL': 'EU-London',
  'PT': 'EU-London',
  'PR': 'US-Atlanta',
  'QA': 'JP-Tokyo',
  'RE': 'EU-London',
  /* Actually Africa */
  'RO': 'EU-London',
  'RU': 'RU-Russia',
  'RW': 'EU-London',
  /* Actually Africa */
  'BL': 'US-Atlanta',
  'SH': 'EU-London',
  /* Actually Africa */
  'KN': 'US-Atlanta',
  'LC': 'US-Atlanta',
  'MF': 'US-Atlanta',
  'PM': 'US-Atlanta',
  'VC': 'US-Atlanta',
  'WS': 'SG-Singapore',
  'SM': 'EU-London',
  'ST': 'EU-London',
  /* Actually Africa */
  'SA': 'EU-London',
  'SN': 'EU-London',
  /* Actually Africa */
  'RS': 'EU-London',
  'SC': 'EU-London',
  /* Actually Africa */
  'SL': 'EU-London',
  /* Actually Africa */
  'SG': 'JP-Tokyo',
  'SX': 'US-Atlanta',
  'SK': 'EU-London',
  'SI': 'EU-London',
  'SB': 'SG-Singapore',
  'SO': 'EU-London',
  /* Actually Africa */
  'ZA': 'EU-London',
  /* Actually Africa */
  'SS': 'EU-London',
  /* Actually Africa */
  'ES': 'EU-London',
  'LK': 'JP-Tokyo',
  'SD': 'EU-London',
  /* Actually Africa */
  'SR': 'BR-Brazil',
  'SJ': 'EU-London',
  'SZ': 'EU-London',
  /* Actually Africa */
  'SE': 'EU-London',
  'CH': 'EU-London',
  'SY': 'EU-London',
  'TW': 'JP-Tokyo',
  'TJ': 'JP-Tokyo',
  'TZ': 'EU-London',
  /* Actually Africa */
  'TH': 'JP-Tokyo',
  'TL': 'JP-Tokyo',
  'TG': 'EU-London',
  /* Actually Africa */
  'TK': 'SG-Singapore',
  'TO': 'SG-Singapore',
  'TT': 'US-Atlanta',
  'TN': 'EU-London',
  /* Actually Africa */
  'TR': 'TK-Turkey',
  'TM': 'JP-Tokyo',
  'TC': 'US-Atlanta',
  'TV': 'SG-Singapore',
  'UG': 'EU-London',
  /* Actually Africa */
  'UA': 'EU-London',
  'AE': 'EU-London',
  'GB': 'EU-London',
  'US': 'US-Atlanta',
  'UM': 'SG-Singapore',
  'VI': 'US-Atlanta',
  'UY': 'BR-Brazil',
  'UZ': 'JP-Tokyo',
  'VU': 'SG-Singapore',
  'VE': 'BR-Brazil',
  'VN': 'JP-Tokyo',
  'WF': 'SG-Singapore',
  'EH': 'EU-London',
  /* Actually Africa */
  'YE': 'JP-Tokyo',
  'ZM': 'EU-London',
  /* Actually Africa */
  'ZW': 'EU-London' /* Actually Africa */
 };




 var Maths = (function(module) {

  var lerp = function(value, target, t) {

   t = clamp(t, 0, 1);

   return (value + t * (target - value));

  }; //lerp

  var clamp = function(v, min, max) {
   if (v < min) return min;
   if (v > max) return max;
   return v;
  };

  var fixed = function(value, precision) {
   var n = Math.pow(10, precision);
   return ((~~(value * n)) / n);
  }

  module.lerp = lerp;
  module.clamp = clamp;
  module.fixed = fixed;

  return module;
 }({}));
 window['Maths'] = Maths;

 var Utils = (function(module) {

  var prettyTime = function() {

   var now = new Date();

   // Create an array with the current month, day and time
   var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];

   // Create an array with the current hour, minute and second
   var time = [now.getHours(), now.getMinutes(), now.getSeconds()];

   // Determine AM or PM suffix based on the hour
   //var suffix = ( time[0] < 12 ) ? "AM" : "PM";

   // Convert hour from military time
   //time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

   // If hour is 0, set it to 12
   //time[0] = time[0] || 12;

   // If seconds and minutes are less than 10, add a zero
   for (var i = 1; i < 3; i++) {
    if (time[i] < 10) {
     time[i] = "0" + time[i];
    }
   }

   // Return the formatted string
   return "[" + date.join("/") + " " + time.join(":") + "]";

  }; //prettyTime

  module.ptime = prettyTime;

  return module;
 }({}));
 window['Utils'] = Utils;

 //String prototype to replaceAll
 String.prototype.replaceAll = function(target, newStr) {
  var retStr = this;
  while (retStr.indexOf(target) != -1) {
   retStr = retStr.replace(target, newStr);
  }
  return retStr;
 };


 function isEmpty(val) {
  return val == null || val == undefined || val === '';
 }

 function normalizeAngle(ang) {
  while (ang < -Math.PI) ang += Math.PI * 2;
  while (ang > Math.PI) ang -= Math.PI * 2;
  return ang;
 }

 function RGBtoStyle(c) {
  var str = c.toString(16);
  while (str.length < 6) str = "0" + str;
  return "#" + str;
 }

 function clamp(v, min, max) {
  if (v < min) return min;
  if (v > max) return max;
  return v;
 }

 function smoothStep(x) {
  x = clamp(x, 0.0, 1.0);
  return x;
  //return x*x*(3 - 2*x);
 }

 function smoothStep2(x) {
  x = clamp(x, 0.0, 1.0);
  return x * x * (3 - 2 * x);
 }


 function shuffle(array) {
  var counter = array.length,
   temp, index;

  // While there are elements in the array
  while (counter > 0) {
   // Pick a random index
   index = Math.floor(Math.random() * counter);

   // Decrease counter by 1
   counter--;

   // And swap the last element with it
   temp = array[counter];
   array[counter] = array[index];
   array[index] = temp;
  }

  return array;
 }


 if (!Date.now) {
  Date.now = function() {
   return new Date().getTime();
  }
 }

 // requestAnimationFrame polyfill
 /*
 (function() {
 	var lastTime = 0;
 	var vendors = ['ms', 'moz', 'webkit', 'o'];
 	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
 		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
 		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
 								   || window[vendors[x]+'CancelRequestAnimationFrame'];
 	}
  
 	if(!window.requestAnimationFrame){
 		window.requestAnimationFrame = function(callback, element) {
 			return setTimeout(callback, 1000 / 60);
 		};
 		
 		window.cancelAnimationFrame = function(id) {
 			clearTimeout(id);
 		};
 	}
 }());
 */


 //#include "favicon"

 var DEFAULT_STORE_OBJECT = 'storeObjectInfo';
 var defaultStorage = {
  'context': null,
  'defaultProvider': 'facebook',
  'loginIntent': '0',
  'userInfo': {
   'socialToken': null,
   'tokenExpires': '',
   'level': '',
   'xp': '',
   'xpNeeded': '',
   'name': '',
   'picture': '',
   'displayName': '',
   'loggedIn': '0',
   'socialId': ''
  }
 }
 window['defaultSt'] = defaultStorage;


 var authToken = null;


 var storageInfo = defaultStorage;
 window["storageInfo"] = storageInfo;

 window["createDefaultStorage"] = createDefaultStorage;

 function createDefaultStorage() {
  storageInfo = defaultStorage;
 }

 function performLogin(context) {
  if (context == 'google') {
   context = 'google';
  } else {
   context = 'facebook';
  }
  storageInfo["context"] = context;
  updateStorage();
 }

 window["updateStorage"] = updateStorage;

 function updateStorage() {

  window.localStorage[DEFAULT_STORE_OBJECT] = JSON.stringify(storageInfo);
  storageInfo = JSON.parse(window.localStorage[DEFAULT_STORE_OBJECT]);
  window["storageInfo"] = storageInfo;
  validateContext();
 }

 function validateContext() {
  if (storageInfo.context == 'google') {
   $('#gPlusShare')['show']();
   $('#fbShare')['hide']();
  } else {
   $('#gPlusShare')['hide']();
   $('#fbShare')['show']();
  }
 }

 //Draw the user profile data
 function setUserData(userInfo) {
  var shouldAnimate = $('#helloContainer')['attr']('data-has-account-data') == '1';

  if (userInfo['displayName'] != "") {
   userInfo['name'] = userInfo['displayName'];
  }

  if (userInfo['name'] == null || userInfo['name'] == undefined) {
   userInfo['name'] = "";
  }

  var idx = userInfo['name'].lastIndexOf("_");
  if (idx != -1) {
   userInfo['name'] = userInfo['name'].substring(0, idx);
  }

  $('#helloContainer')['attr']('data-has-account-data', '1');
  $('#helloContainer')['attr']('data-logged-in', '1');

  $('.agario-profile-panel .progress-bar-star')['text'](userInfo["level"]);
  $('.agario-exp-bar .progress-bar-text')['text'](userInfo["xp"] + '/' + userInfo["xpNeeded"] + ' XP');
  $('.agario-exp-bar .progress-bar')['css']('width', (88 * userInfo["xp"] / userInfo["xpNeeded"]).toFixed(2) + '%');
  $('.agario-profile-name')['text'](userInfo['name']);

  if (userInfo["picture"] != "") {
   $('.agario-profile-picture')['attr']('src', userInfo["picture"]);
  }

  //MC.showInstructionsPanel();


  storageInfo["userInfo"]["level"] = userInfo["level"];
  storageInfo["userInfo"]["xp"] = userInfo["xp"];
  storageInfo["userInfo"]["xpNeeded"] = userInfo["xpNeeded"];
  storageInfo["userInfo"]["displayName"] = userInfo["name"];
  storageInfo["userInfo"]["loggedIn"] = "1";
  window['updateStorage']();
 }

 //Process the local data stored on localstorage
 function processLocalData() {
  if (window.localStorage[DEFAULT_STORE_OBJECT] != null) {
   storageInfo = JSON.parse(window.localStorage[DEFAULT_STORE_OBJECT]);
  }

  if (storageInfo["loginIntent"] == '1') {
   performLogin(storageInfo["context"]);
  }

  // populate user profile with cached data
  if (storageInfo["userInfo"]["name"] != '' || storageInfo["userInfo"]["displayName"] != '') {
   setUserData(storageInfo["userInfo"]);
  }
 }

 window['checkLoginStatus'] = function() {
  if (storageInfo["loginIntent"] == '1') {
   updateLoggedUserInfo();
   performLogin(storageInfo["context"]);
  }
 }

 var updateLoggedUserInfo = function() {
  window['MC']['setProfilePicture'](storageInfo['userInfo']['picture']);
  window['MC']['setSocialId'](storageInfo['userInfo']['socialId']);
 }

 window['logout'] = function() {
  storageInfo = defaultStorage;
  delete window.localStorage[DEFAULT_STORE_OBJECT];
  window.localStorage[DEFAULT_STORE_OBJECT] = JSON.stringify(defaultStorage);
  updateStorage();

  authToken = null;
  logoutGooglePlus();

  agarApp.cache['sentGameServerLogin'] = false;
  delete agarApp.cache['login_info'];

  $('#helloContainer')['attr']('data-logged-in', '0');
  $('#helloContainer')['attr']('data-has-account-data', '0');
  $('.timer').text('');
  $('#gPlusShare')['hide']();
  $('#fbShare')['show']();
  $('#user-id-tag').text('');
  $('.shop-blocker').fadeOut(100);

  MC.doLogout();
  MC.reconnect();
  //window["MC"]["doLogout"]();
 }


 function setAccountData(obj, shouldAnimate) {

  var hasUserData = $('#helloContainer')['attr']('data-has-account-data', '1');

  storageInfo["userInfo"]["xp"] = obj["xp"];
  storageInfo["userInfo"]["xpNeeded"] = obj["xpNeeded"];
  storageInfo["userInfo"]["level"] = obj["level"];
  updateStorage();

  if (hasUserData && shouldAnimate) {
   animateAccountData(obj);
  } else {
   $('.agario-profile-panel .progress-bar-star')['text'](obj["level"]);
   $('.agario-exp-bar .progress-bar-text')['text'](obj["xp"] + '/' + obj["xpNeeded"] + ' XP');
   $('.agario-exp-bar .progress-bar')['css']('width', (88 * obj["xp"] / obj["xpNeeded"]).toFixed(2) + '%');
  }
 }

 /**
  * Animate the user level bar
  * @param {Object=} opt_obj
  * @param {function()=} opt_fcb
  */
 function animateAccountData(opt_obj, opt_fcb) {
  var obj = opt_obj;

  var isLoggedIn = storageInfo["userInfo"]['loggedIn'];
  if (!isLoggedIn) return;

  var shouldAnimate = $('#helloContainer').is(":visible") && $('#helloContainer')['attr']('data-has-account-data') == '1';


  if (obj == null || obj == undefined) {
   obj = storageInfo['userInfo'];
  }
  // Workaround to detect if we're animating or if we have a final result
  if (shouldAnimate) {
   var initialXP = +$('.agario-exp-bar .progress-bar-text')['first']()['text']().split('/')[0];
   var initialXPNeeded = +$('.agario-exp-bar .progress-bar-text')['first']()['text']().split('/')[1].split(' ')[0];
   var initialLevel = $('.agario-profile-panel .progress-bar-star')['first']()['text']();
   // Leveled up
   if (initialLevel != obj["level"]) {
    animateAccountData({
     "xp": initialXPNeeded,
     "xpNeeded": initialXPNeeded,
     "level": initialLevel
    }, function() {
     $('.agario-profile-panel .progress-bar-star')['text'](obj["level"]);
     $('.agario-exp-bar .progress-bar')['css']('width', '100%');
     $('.progress-bar-star')['addClass']('animated tada')['one']('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $('.progress-bar-star')['removeClass']('animated tada');
     });

     setTimeout(function() {
      $('.agario-exp-bar .progress-bar-text')['text'](obj["xpNeeded"] + '/' + obj["xpNeeded"] + ' XP');
      animateAccountData({
       "xp": 0,
       "xpNeeded": obj["xpNeeded"],
       "level": obj["level"]

      }, function() {
       animateAccountData(obj);
      });
     }, 1000);
    });
   } else {
    var start = Date.now();
    var cb = function() {
     var progress = smoothStep2((Date.now() - start) / 1000);

     $('.agario-exp-bar .progress-bar-text')['text'](~~(initialXP + (obj["xp"] - initialXP) * progress) + '/' + obj["xpNeeded"] + ' XP');
     $('.agario-exp-bar .progress-bar')['css']('width', (88 * (initialXP + (obj["xp"] - initialXP) * progress) / obj["xpNeeded"]).toFixed(2) + '%');
     if (opt_fcb) opt_fcb();
     if (progress < 1.0) {
      window.requestAnimationFrame(cb);
     }
    }

    window.requestAnimationFrame(cb);
   }
  }
 }
 window['animateAccountData'] = animateAccountData;

 window["toggleSocialLogin"] = function() {
  $('#socialLoginContainer')['toggle']();

  $('#settings')['hide']();
  $('#instructions')['hide']();
  MC.showInstructionsPanel();
 }

 window["toggleSettings"] = function() {
  $('#settings')['toggle']();

  $('#socialLoginContainer')['hide']();
  $('#instructions')['hide']();
  MC.showInstructionsPanel();

 }

 var _account = (function(exports) {
  var _userInfo = null;

  var handleUserLogin = function(event, userInfo) {
   //console.log(Utils.ptime() + " got user login");

   // no need to reset supersonic ads if the user hasn't changed.
   if (_userInfo != null && _userInfo.id == userInfo.id) return;

   _userInfo = userInfo;
   if (window['ssa_json'] != null) {
    window['ssa_json']['applicationUserId'] = "" + userInfo.id;
    window['ssa_json']['custom_user_id'] = "" + userInfo.id;
   }

   if (typeof SSA_CORE != "undefined") {
    SSA_CORE['start']();
   }
  }

  var handleUserLogout = function() {}

  exports.init = function() {
   agarApp.core.bind('user_login', handleUserLogin);
   agarApp.core.bind('user_logout', handleUserLogout);
  }

  exports.setUserData = function(data) {
   setUserData(data);
  }

  exports.setAccountData = function(data, shouldAnimate) {
   setAccountData(data, shouldAnimate)
  }

  exports.animateAccountData = function(obj) {
   animateAccountData(obj);
  }


  return exports;
 })({});
 agarApp.account = _account;


 var retryAttempts = 0;
 var fbLoaded = false;
 var fbInitted = false;

 var fbAsyncInit = function() {
  //console.timeEnd("fbAsyncInit");
  window['FB']['init']({
   'appId': EnvConfig["fb_app_id"],
   'cookie': true,
   'xfbml': true,
   'status': true,
   'version': 'v2.2'
  });

  fbLoaded = true;
  checkFacebookLogin();
 }

 function checkFacebookLogin() {
  if (fbInitted == true || hasInitialized == false || fbLoaded == false) return;
  fbInitted = true;
  //console.time("FB.getLoginStatus");	

  //Check the login status with this user for facebook (If he is logged in and has granted permissions)
  if ((window["storageInfo"]["loginIntent"] == '1' && window["storageInfo"]["context"] == 'facebook') || isInFacebook) {
   window['FB']['getLoginStatus'](function(response) {
    if (response.status === 'connected') {
     // the user is logged in and has authenticated
     fbLoginCallback(response);
    } else if (response.status === 'not_authorized') {
     // the user is logged in to Facebook, 
     // but has not authenticated your app
     window['logout']();
     //facebookLogin();
    } else {
     // the user isn't logged in to Facebook.
     window['logout']();
    }
   });
  }

  function facebookLogin() {

   if (window['FB'] == null) {
    alert("You seem to have something blocking Facebook on your browser, please check for any extensions");
    return;
   }

   storageInfo["loginIntent"] = '1';
   window["updateStorage"]();
   //console.time("FB.login");
   window['FB']['login'](function(response) {
    //	console.timeEnd("FB.login");
    fbLoginCallback(response);
   }, {
    scope: 'public_profile, email'
   });
  }

  window['facebookRelogin'] = facebookLogin;
  window['facebookLogin'] = facebookLogin;
 }


 function fbLoginCallback(response) {
  if (response.status != 'connected') return;

  var fbtoken = response['authResponse']['accessToken'];
  if (fbtoken == null || fbtoken == "undefined" || fbtoken == "") {
   //Relogin when token isn't allright
   if (retryAttempts < 3) {
    retryAttempts++;
    window['facebookRelogin']();
   }
   window['logout']();
  } else {
   //Login on shop
   window["MC"]["doLoginWithFB"](fbtoken);
   agarApp.cache['login_info'] = [fbtoken, 'facebook'];
   //		agarApp.networking.sendLoginToken(fbtoken, 'facebook');

   // Get and store FBPicture
   window['FB']['api']("/me/picture?width=180&height=180", function(pictureResponse) {
    storageInfo["userInfo"]["picture"] = pictureResponse.data.url;
    window["updateStorage"]();
    $('.agario-profile-picture')['attr']('src', pictureResponse.data.url);
    storageInfo['userInfo']['socialId'] = response['authResponse']['userID'];
    updateLoggedUserInfo();
   });

   $('#helloContainer')['attr']('data-logged-in', '1');
   storageInfo["context"] = 'facebook';
   storageInfo["loginIntent"] = '1';
   window["updateStorage"]();

  }
 }
 // exports
 window['fbAsyncInit'] = fbAsyncInit;


 var gplusConnected = false;
 var gplusUser = null;

 var google_ = (function(exports) {
  var events = {};
  var gapiLoaded = false;

  var loadGoogleServices = function() {
   var e = document.createElement("script");
   e.type = "text/javascript";
   e.async = true;
   e.src = "//apis.google.com/js/client:platform.js?onload=gapiAsyncInit";
   var t = document.getElementsByTagName("script")[0];
   t.parentNode.insertBefore(e, t)
   gapiLoaded = true;
  }

  window['gapiAsyncInit'] = function() {
   $(events).trigger("initialized");
  };

  exports.google = {
   loadServices: function() {
    loadGoogleServices();
   },

   getMeProfile: function(token, callback) {
    //window.gapi.auth.setToken(token);
    window.gapi.client.load('plus', 'v1', function() {
     console.log("fetching me profile");
     var request = gapi.client.plus.people.get({
      'userId': 'me'
     });

     request.execute(function(resp) {
      callback(resp);
     });
    });
   }
  };

  exports.onGoogleInit = function(callback) {
   if (!gapiLoaded) {
    loadGoogleServices();
   }

   if (typeof gapi !== "undefined") {
    callback();
   } else {
    $(events).bind("initialized", callback);
   }
  }

  return exports;
 })(agarApp);


 var gplusModule = (function(exports) {

  var gplusLoaded = false;
  var gplusLoginChecked = false;

  var gplusAuth = null;

  var authorizeOpts = {
   "client_id": EnvConfig["gplus_client_id"],
   "cookie_policy": "single_host_origin",
   "scope": "profile email"
  };

  var loadProfilePicture = function(avatar) {
   storageInfo["userInfo"]["picture"] = avatar;
   $('.agario-profile-picture')['attr']('src', avatar);
  }

  var handleUserProfile = function(profile) {
   if (profile) {
    loadProfilePicture(profile.image.url);
   }
  }

  var validateUserToken = function(token) {

   window["MC"]["doLoginWithGPlus"](token);
   agarApp.cache['login_info'] = [token, 'google'];
   //		agarApp.networking.sendLoginToken(token, 'google');
  }



  exports.gplus = {
   userAuth: function() {
    return gplusAuth;
   },

   init: function() {
    var self = this;

    agarApp.onGoogleInit(function() {
     window.gapi.ytsubscribe.go('agarYoutube');

     gplusLoaded = true;
     self.checkGPlusLogin();
    });

   },

   checkGPlusLogin: function() {
    if (gplusLoginChecked == true || hasInitialized == false || gplusLoaded == false) return;
    gplusLoginChecked = true;

    var shouldCheckLogin = (storageInfo && storageInfo['loginIntent'] == '1' && storageInfo['context'] == 'google');

    var self = this;

    window.gapi.load('auth2', function() {
     gplusAuth = window.gapi.auth2.init(authorizeOpts);

     var element = document.getElementById('gplusLogin');
     gplusAuth['attachClickHandler'](element, {},
      function(googleUser) {
       console.log('googleUser : ' + googleUser);
      },
      function(error) {
       console.log("failed to login in google plus: ", JSON.stringify(error, undefined, 2));
      }
     );

     // the automatic login won't work when running in local
     gplusAuth['currentUser']['listen'](_.bind(self.onChangeUser, self));

     if (shouldCheckLogin && gplusAuth['isSignedIn']['get']() == true) {
      gplusAuth['signIn']();
     }

    })


   },

   onChangeUser: function(user) {
    var self = this;

    if (!gplusAuth || !user) return;

    var isSignedIn = gplusAuth['isSignedIn']['get']();
    if (isSignedIn && !gplusConnected) {
     gplusConnected = true;
     storageInfo["loginIntent"] = '1';

     var authResponse = user['getAuthResponse']();
     var access_token = authResponse['access_token'];
     window.authResponse = authResponse;
     console.log('loggedIn with G+!');



     //set picture
     var profile = user['getBasicProfile']();
     var imageUrl = profile['getImageUrl']();
     // sometimes the profile might not have a profile picture.
     if (imageUrl == undefined) {
      agarApp.google.getMeProfile(authResponse, function(plusProfile) {
       if (!plusProfile['result']['isPlusUser']) {
        alert('Please add Google+ to your Google account and try again.\nOr you can login with another account.');
        window["logout"]();
        return
       }
       handleUserProfile(plusProfile);
       validateUserToken(access_token);

       if (plusProfile) {
        storageInfo['userInfo']['picture'] = plusProfile['image']['url'];
       }
       storageInfo['userInfo']['socialId'] = profile['getId']();
       updateLoggedUserInfo();
      });
     } else {
      loadProfilePicture(imageUrl);
      storageInfo['userInfo']['picture'] = imageUrl;
      storageInfo['userInfo']['socialId'] = profile['getId']();
      updateLoggedUserInfo();
      validateUserToken(access_token);
     }


     storageInfo["context"] = "google";

     window["updateStorage"]();
    }
   },

   logout: function() {
    if (!gplusAuth) return;

    //gplusAuth['disconnect']();
    gplusAuth['signOut']();
    gplusConnected = false;
   }
  }

  return exports;
 })(agarApp);
 window['gplusModule'] = gplusModule;


 var logoutGooglePlus = function() {
  agarApp.gplus.logout();
 }

 window['logoutGooglePlus'] = logoutGooglePlus;
 //window['initializeGooglePlus'] = initializeGooglePlus;



 function getStatsString(originalStr) {

  var timeAlive = $('.stats-time-alive').text();
  var minsAlive = timeAlive.split(':')[0];
  var secsAlive = timeAlive.split(':')[1];
  return window["parseString"](originalStr, '%@', [minsAlive, secsAlive, $('.stats-highest-mass').text()]);
 }

 window['getStatsString'] = getStatsString;


 /**
  * @param {function()=} opt_callback
  */
 function fbShare(name, caption, description, link, picture, action_name, action_link, opt_callback) {
  var fbCallbackShare = opt_callback;
  var shareOptions = {
   method: 'feed',
   display: 'iframe',
   name: name,
   caption: caption,
   description: description,
   link: link,
   picture: picture,
   actions: {
    'name': action_name,
    'link': action_link
   }
  };
  if (fbCallbackShare != null) {
   window['FB']['ui'](shareOptions, fbCallbackShare);
  } else {
   window['FB']['ui'](shareOptions);
  }

 }

 window['gPlusShare'] = gPlusShare;

 function gPlusShare() {
  var targetUrl = "https://plus.google.com/share?url=www.agar.io&hl=en-US";
  var width = 484;
  var height = 580;
  var windowOptions = 'width=' + width + ',height=' + height + ',menubar=no,toolbar=no,resizable=yes,scrollbars=no';
  window.open(targetUrl, 'Agar.io', windowOptions + ',left=' +
   ((window.screenX + window.innerWidth / 2) - width / 2) +
   ",top=" + (window.innerHeight - height) / 2);
 }

 function twitterShare(description) {
  var params = "text=" + description;
  var targetUrl = "https://twitter.com/intent/tweet?" + params;
  var width = 660;
  var height = 310;
  var windowOptions = 'width=' + width + ',height=' + height + ',menubar=no,toolbar=no,resizable=yes,scrollbars=no';
  window.open(targetUrl, 'Agar.io', windowOptions + ',left=' +
   ((window.screenX + window.innerWidth / 2) - width / 2) +
   ",top=" + (window.innerHeight - height) / 2);
 }


 window['twitterShareStats'] = function() {
  twitterShare(window['getStatsString']('tt_share_stats'));
 }

 window['fbShareStats'] = function() {
  fbShare(window["i18n"]('fb_matchresults_title'),
   window["i18n"]('fb_matchresults_description'),
   window['getStatsString']('fb_matchresults_subtitle'),
   'http://agar.io',
   'http://static2.miniclipcdn.com/mobile/agar/Agar.io_matchresults_fb_1200x630.png',
   'play now!',
   'http://agar.io');
 }

 window['fillSocialValues'] = function(value, target) {
  if (window['isChrome'] == true && window['storageInfo']['context'] == 'google') {
   var options = {
    'contenturl': EnvConfig['game_url'],
    'clientid': EnvConfig["gplus_client_id"],
    'cookiepolicy': 'http://agar.io',
    'prefilltext': value,
    'calltoactionlabel': 'BEAT',
    'calltoactionurl': EnvConfig['game_url']
   };
   window['gapi']['interactivepost']['render'](target, options); //button with the ID share-button
  }
 }



 // Delay it as much as we can
 $(function() {
  if ("MAsyncInit" in window) {
   window['MAsyncInit']();
  }

  //Apply Localization String
  $('[data-itr]').each(function() {
   var $this = $(this);
   var itr = $this.attr('data-itr');
   $this.html(window["i18n"][itr] || window["i18n_dict"]['en'][itr] || itr);
  });
 });

})(window, window['jQuery']);
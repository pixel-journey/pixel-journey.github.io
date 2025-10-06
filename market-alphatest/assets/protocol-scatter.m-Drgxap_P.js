import { J as Chains, g as PermissionLevel, C as Checksum256, S as Serializer, K as Canceled, q as Transaction, d as SigningRequest } from "./wharfkit-CgoYgCEG.js";
import "./vendor-CP16y5pE.js";
/**
 * @wharfkit/protocol-scatter v1.3.1
 * https://github.com/wharfkit/protocol-scatter
 *
 * @license
 * Copyright (c) 2023 Greymass Inc. All Rights Reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 * 1.  Redistribution of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 * 
 * 2.  Redistribution in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 * 
 * 3.  Neither the name of the copyright holder nor the names of its contributors
 *     may be used to endorse or promote products derived from this software without
 *     specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * YOU ACKNOWLEDGE THAT THIS SOFTWARE IS NOT DESIGNED, LICENSED OR INTENDED FOR USE
 * IN THE DESIGN, CONSTRUCTION, OPERATION OR MAINTENANCE OF ANY MILITARY FACILITY.
 */
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : {};
function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var dist = {};
var eosjsApi = {};
var eosjsSerialize = {};
var eosjsNumeric = {};
var _slicedToArray = /* @__PURE__ */ (function() {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
})();
var _createClass = /* @__PURE__ */ (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var RIPEMD160$2 = (function() {
  function RIPEMD1602() {
    _classCallCheck(this, RIPEMD1602);
  }
  _createClass(RIPEMD1602, null, [{
    key: "get_n_pad_bytes",
    value: function get_n_pad_bytes(message_size) {
      return 64 - (message_size + 8 & 63);
    }
  }, {
    key: "pad",
    value: function pad2(message) {
      var message_size = message.byteLength;
      var n_pad = RIPEMD1602.get_n_pad_bytes(message_size);
      var divmod = function divmod2(dividend, divisor) {
        return [Math.floor(dividend / divisor), dividend % divisor];
      };
      var _divmod$map = divmod(
        message_size,
        536870912
        /* (2 ** 29) */
      ).map(function(x, index) {
        return index ? x * 8 : x;
      }), _divmod$map2 = _slicedToArray(_divmod$map, 2), msg_bit_size_most = _divmod$map2[0], msg_bit_size_least = _divmod$map2[1];
      var padded = new Uint8Array(message_size + n_pad + 8);
      padded.set(new Uint8Array(message), 0);
      var data_view = new DataView(padded.buffer);
      data_view.setUint8(message_size, 128);
      data_view.setUint32(
        message_size + n_pad,
        msg_bit_size_least,
        true
        // Little-endian
      );
      data_view.setUint32(
        message_size + n_pad + 4,
        msg_bit_size_most,
        true
        // Little-endian
      );
      return padded.buffer;
    }
  }, {
    key: "f",
    value: function f(j, x, y, z) {
      if (0 <= j && j <= 15) {
        return x ^ y ^ z;
      }
      if (16 <= j && j <= 31) {
        return x & y | ~x & z;
      }
      if (32 <= j && j <= 47) {
        return (x | ~y) ^ z;
      }
      if (48 <= j && j <= 63) {
        return x & z | y & ~z;
      }
      if (64 <= j && j <= 79) {
        return x ^ (y | ~z);
      }
    }
  }, {
    key: "K",
    value: function K2(j) {
      if (0 <= j && j <= 15) {
        return 0;
      }
      if (16 <= j && j <= 31) {
        return 1518500249;
      }
      if (32 <= j && j <= 47) {
        return 1859775393;
      }
      if (48 <= j && j <= 63) {
        return 2400959708;
      }
      if (64 <= j && j <= 79) {
        return 2840853838;
      }
    }
  }, {
    key: "KP",
    value: function KP(j) {
      if (0 <= j && j <= 15) {
        return 1352829926;
      }
      if (16 <= j && j <= 31) {
        return 1548603684;
      }
      if (32 <= j && j <= 47) {
        return 1836072691;
      }
      if (48 <= j && j <= 63) {
        return 2053994217;
      }
      if (64 <= j && j <= 79) {
        return 0;
      }
    }
  }, {
    key: "add_modulo32",
    value: function add_modulo32() {
      return Array.from(arguments).reduce(function(a, b) {
        return a + b;
      }, 0) | 0;
    }
  }, {
    key: "rol32",
    value: function rol32(value, count) {
      return value << count | value >>> 32 - count;
    }
  }, {
    key: "hash",
    value: function hash2(message) {
      var padded = RIPEMD1602.pad(message);
      var r = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13];
      var rP = [
        // r'
        5,
        14,
        7,
        0,
        9,
        2,
        11,
        4,
        13,
        6,
        15,
        8,
        1,
        10,
        3,
        12,
        6,
        11,
        3,
        7,
        0,
        13,
        5,
        10,
        14,
        15,
        8,
        12,
        4,
        9,
        1,
        2,
        15,
        5,
        1,
        3,
        7,
        14,
        6,
        9,
        11,
        8,
        12,
        2,
        10,
        0,
        4,
        13,
        8,
        6,
        4,
        1,
        3,
        11,
        15,
        0,
        5,
        12,
        2,
        13,
        9,
        7,
        10,
        14,
        12,
        15,
        10,
        4,
        1,
        5,
        8,
        7,
        6,
        2,
        13,
        14,
        0,
        3,
        9,
        11
      ];
      var s = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6];
      var sP = [
        // s'
        8,
        9,
        9,
        11,
        13,
        15,
        15,
        5,
        7,
        7,
        8,
        11,
        14,
        14,
        12,
        6,
        9,
        13,
        15,
        7,
        12,
        8,
        9,
        11,
        7,
        7,
        12,
        7,
        6,
        15,
        13,
        11,
        9,
        7,
        15,
        11,
        8,
        6,
        6,
        14,
        12,
        13,
        5,
        14,
        13,
        13,
        7,
        5,
        15,
        5,
        8,
        11,
        14,
        14,
        6,
        14,
        6,
        9,
        12,
        9,
        12,
        5,
        15,
        8,
        8,
        5,
        12,
        9,
        12,
        5,
        14,
        6,
        8,
        13,
        6,
        5,
        15,
        13,
        11,
        11
      ];
      var word_size = 4;
      var block_size = 64;
      var t = padded.byteLength / block_size;
      var X = new Array(t).fill(void 0).map(function(_2, i2) {
        return function(j2) {
          return new DataView(padded, i2 * block_size, block_size).getUint32(
            j2 * word_size,
            true
            // Little-endian
          );
        };
      });
      var h = [
        1732584193,
        // h_0
        4023233417,
        // h_1
        2562383102,
        // h_2
        271733878,
        // h_3
        3285377520
        // h_4
      ];
      for (var i = 0; i < t; ++i) {
        var A = h[0], B = h[1], C = h[2], D = h[3], E = h[4];
        var AP = A, BP = B, CP = C, DP = D, EP = E;
        for (var j = 0; j < 80; ++j) {
          var _T = RIPEMD1602.add_modulo32(RIPEMD1602.rol32(RIPEMD1602.add_modulo32(A, RIPEMD1602.f(j, B, C, D), X[i](r[j]), RIPEMD1602.K(j)), s[j]), E);
          A = E;
          E = D;
          D = RIPEMD1602.rol32(C, 10);
          C = B;
          B = _T;
          _T = RIPEMD1602.add_modulo32(RIPEMD1602.rol32(RIPEMD1602.add_modulo32(AP, RIPEMD1602.f(79 - j, BP, CP, DP), X[i](rP[j]), RIPEMD1602.KP(j)), sP[j]), EP);
          AP = EP;
          EP = DP;
          DP = RIPEMD1602.rol32(CP, 10);
          CP = BP;
          BP = _T;
        }
        var T = RIPEMD1602.add_modulo32(h[1], C, DP);
        h[1] = RIPEMD1602.add_modulo32(h[2], D, EP);
        h[2] = RIPEMD1602.add_modulo32(h[3], E, AP);
        h[3] = RIPEMD1602.add_modulo32(h[4], A, BP);
        h[4] = RIPEMD1602.add_modulo32(h[0], B, CP);
        h[0] = T;
      }
      var result = new ArrayBuffer(20);
      var data_view = new DataView(result);
      h.forEach(function(h_i, i2) {
        return data_view.setUint32(i2 * 4, h_i, true);
      });
      return result;
    }
  }]);
  return RIPEMD1602;
})();
var ripemd = {
  RIPEMD160: RIPEMD160$2
};
(function(exports2) {
  var __read2 = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
  var __spread2 = commonjsGlobal && commonjsGlobal.__spread || function() {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read2(arguments[i]));
    return ar;
  };
  var __values2 = commonjsGlobal && commonjsGlobal.__values || function(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
      next: function() {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  var ripemd1602 = ripemd.RIPEMD160.hash;
  var base58Chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  var base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  function create_base58_map() {
    var base58M = Array(256).fill(-1);
    for (var i = 0; i < base58Chars.length; ++i) {
      base58M[base58Chars.charCodeAt(i)] = i;
    }
    return base58M;
  }
  var base58Map = create_base58_map();
  function create_base64_map() {
    var base64M = Array(256).fill(-1);
    for (var i = 0; i < base64Chars.length; ++i) {
      base64M[base64Chars.charCodeAt(i)] = i;
    }
    base64M["=".charCodeAt(0)] = 0;
    return base64M;
  }
  var base64Map = create_base64_map();
  function isNegative(bignum) {
    return (bignum[bignum.length - 1] & 128) !== 0;
  }
  exports2.isNegative = isNegative;
  function negate(bignum) {
    var carry = 1;
    for (var i = 0; i < bignum.length; ++i) {
      var x = (~bignum[i] & 255) + carry;
      bignum[i] = x;
      carry = x >> 8;
    }
  }
  exports2.negate = negate;
  function decimalToBinary(size, s) {
    var result = new Uint8Array(size);
    for (var i = 0; i < s.length; ++i) {
      var srcDigit = s.charCodeAt(i);
      if (srcDigit < "0".charCodeAt(0) || srcDigit > "9".charCodeAt(0)) {
        throw new Error("invalid number");
      }
      var carry = srcDigit - "0".charCodeAt(0);
      for (var j = 0; j < size; ++j) {
        var x = result[j] * 10 + carry;
        result[j] = x;
        carry = x >> 8;
      }
      if (carry) {
        throw new Error("number is out of range");
      }
    }
    return result;
  }
  exports2.decimalToBinary = decimalToBinary;
  function signedDecimalToBinary(size, s) {
    var negative = s[0] === "-";
    if (negative) {
      s = s.substr(1);
    }
    var result = decimalToBinary(size, s);
    if (negative) {
      negate(result);
      if (!isNegative(result)) {
        throw new Error("number is out of range");
      }
    } else if (isNegative(result)) {
      throw new Error("number is out of range");
    }
    return result;
  }
  exports2.signedDecimalToBinary = signedDecimalToBinary;
  function binaryToDecimal(bignum, minDigits) {
    if (minDigits === void 0) {
      minDigits = 1;
    }
    var result = Array(minDigits).fill("0".charCodeAt(0));
    for (var i = bignum.length - 1; i >= 0; --i) {
      var carry = bignum[i];
      for (var j = 0; j < result.length; ++j) {
        var x = (result[j] - "0".charCodeAt(0) << 8) + carry;
        result[j] = "0".charCodeAt(0) + x % 10;
        carry = x / 10 | 0;
      }
      while (carry) {
        result.push("0".charCodeAt(0) + carry % 10);
        carry = carry / 10 | 0;
      }
    }
    result.reverse();
    return String.fromCharCode.apply(String, __spread2(result));
  }
  exports2.binaryToDecimal = binaryToDecimal;
  function signedBinaryToDecimal(bignum, minDigits) {
    if (minDigits === void 0) {
      minDigits = 1;
    }
    if (isNegative(bignum)) {
      var x = bignum.slice();
      negate(x);
      return "-" + binaryToDecimal(x, minDigits);
    }
    return binaryToDecimal(bignum, minDigits);
  }
  exports2.signedBinaryToDecimal = signedBinaryToDecimal;
  function base58ToBinary(size, s) {
    var result = new Uint8Array(size);
    for (var i = 0; i < s.length; ++i) {
      var carry = base58Map[s.charCodeAt(i)];
      if (carry < 0) {
        throw new Error("invalid base-58 value");
      }
      for (var j = 0; j < size; ++j) {
        var x = result[j] * 58 + carry;
        result[j] = x;
        carry = x >> 8;
      }
      if (carry) {
        throw new Error("base-58 value is out of range");
      }
    }
    result.reverse();
    return result;
  }
  exports2.base58ToBinary = base58ToBinary;
  function binaryToBase58(bignum, minDigits) {
    var e_1, _a, e_2, _b;
    var result = [];
    try {
      for (var bignum_1 = __values2(bignum), bignum_1_1 = bignum_1.next(); !bignum_1_1.done; bignum_1_1 = bignum_1.next()) {
        var byte = bignum_1_1.value;
        var carry = byte;
        for (var j = 0; j < result.length; ++j) {
          var x = (base58Map[result[j]] << 8) + carry;
          result[j] = base58Chars.charCodeAt(x % 58);
          carry = x / 58 | 0;
        }
        while (carry) {
          result.push(base58Chars.charCodeAt(carry % 58));
          carry = carry / 58 | 0;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (bignum_1_1 && !bignum_1_1.done && (_a = bignum_1.return)) _a.call(bignum_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    try {
      for (var bignum_2 = __values2(bignum), bignum_2_1 = bignum_2.next(); !bignum_2_1.done; bignum_2_1 = bignum_2.next()) {
        var byte = bignum_2_1.value;
        if (byte) {
          break;
        } else {
          result.push("1".charCodeAt(0));
        }
      }
    } catch (e_2_1) {
      e_2 = { error: e_2_1 };
    } finally {
      try {
        if (bignum_2_1 && !bignum_2_1.done && (_b = bignum_2.return)) _b.call(bignum_2);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
    result.reverse();
    return String.fromCharCode.apply(String, __spread2(result));
  }
  exports2.binaryToBase58 = binaryToBase58;
  function base64ToBinary(s) {
    var len = s.length;
    if ((len & 3) === 1 && s[len - 1] === "=") {
      len -= 1;
    }
    if ((len & 3) !== 0) {
      throw new Error("base-64 value is not padded correctly");
    }
    var groups = len >> 2;
    var bytes = groups * 3;
    if (len > 0 && s[len - 1] === "=") {
      if (s[len - 2] === "=") {
        bytes -= 2;
      } else {
        bytes -= 1;
      }
    }
    var result = new Uint8Array(bytes);
    for (var group = 0; group < groups; ++group) {
      var digit0 = base64Map[s.charCodeAt(group * 4 + 0)];
      var digit1 = base64Map[s.charCodeAt(group * 4 + 1)];
      var digit2 = base64Map[s.charCodeAt(group * 4 + 2)];
      var digit3 = base64Map[s.charCodeAt(group * 4 + 3)];
      result[group * 3 + 0] = digit0 << 2 | digit1 >> 4;
      if (group * 3 + 1 < bytes) {
        result[group * 3 + 1] = (digit1 & 15) << 4 | digit2 >> 2;
      }
      if (group * 3 + 2 < bytes) {
        result[group * 3 + 2] = (digit2 & 3) << 6 | digit3;
      }
    }
    return result;
  }
  exports2.base64ToBinary = base64ToBinary;
  var KeyType;
  (function(KeyType2) {
    KeyType2[KeyType2["k1"] = 0] = "k1";
    KeyType2[KeyType2["r1"] = 1] = "r1";
  })(KeyType = exports2.KeyType || (exports2.KeyType = {}));
  exports2.publicKeyDataSize = 33;
  exports2.privateKeyDataSize = 32;
  exports2.signatureDataSize = 65;
  function digestSuffixRipemd160(data, suffix2) {
    var d = new Uint8Array(data.length + suffix2.length);
    for (var i = 0; i < data.length; ++i) {
      d[i] = data[i];
    }
    for (var i = 0; i < suffix2.length; ++i) {
      d[data.length + i] = suffix2.charCodeAt(i);
    }
    return ripemd1602(d);
  }
  function stringToKey(s, type, size, suffix2) {
    var whole = base58ToBinary(size + 4, s);
    var result = { type, data: new Uint8Array(whole.buffer, 0, size) };
    var digest = new Uint8Array(digestSuffixRipemd160(result.data, suffix2));
    if (digest[0] !== whole[size + 0] || digest[1] !== whole[size + 1] || digest[2] !== whole[size + 2] || digest[3] !== whole[size + 3]) {
      throw new Error("checksum doesn't match");
    }
    return result;
  }
  function keyToString(key, suffix2, prefix) {
    var digest = new Uint8Array(digestSuffixRipemd160(key.data, suffix2));
    var whole = new Uint8Array(key.data.length + 4);
    for (var i = 0; i < key.data.length; ++i) {
      whole[i] = key.data[i];
    }
    for (var i = 0; i < 4; ++i) {
      whole[i + key.data.length] = digest[i];
    }
    return prefix + binaryToBase58(whole);
  }
  function stringToPublicKey(s) {
    if (typeof s !== "string") {
      throw new Error("expected string containing public key");
    }
    if (s.substr(0, 3) === "EOS") {
      var whole = base58ToBinary(exports2.publicKeyDataSize + 4, s.substr(3));
      var key = { type: KeyType.k1, data: new Uint8Array(exports2.publicKeyDataSize) };
      for (var i = 0; i < exports2.publicKeyDataSize; ++i) {
        key.data[i] = whole[i];
      }
      var digest = new Uint8Array(ripemd1602(key.data));
      if (digest[0] !== whole[exports2.publicKeyDataSize] || digest[1] !== whole[34] || digest[2] !== whole[35] || digest[3] !== whole[36]) {
        throw new Error("checksum doesn't match");
      }
      return key;
    } else if (s.substr(0, 7) === "PUB_K1_") {
      return stringToKey(s.substr(7), KeyType.k1, exports2.publicKeyDataSize, "K1");
    } else if (s.substr(0, 7) === "PUB_R1_") {
      return stringToKey(s.substr(7), KeyType.r1, exports2.publicKeyDataSize, "R1");
    } else {
      throw new Error("unrecognized public key format");
    }
  }
  exports2.stringToPublicKey = stringToPublicKey;
  function publicKeyToString(key) {
    if (key.type === KeyType.k1 && key.data.length === exports2.publicKeyDataSize) {
      return keyToString(key, "K1", "PUB_K1_");
    } else if (key.type === KeyType.r1 && key.data.length === exports2.publicKeyDataSize) {
      return keyToString(key, "R1", "PUB_R1_");
    } else {
      throw new Error("unrecognized public key format");
    }
  }
  exports2.publicKeyToString = publicKeyToString;
  function convertLegacyPublicKey(s) {
    if (s.substr(0, 3) === "EOS") {
      return publicKeyToString(stringToPublicKey(s));
    }
    return s;
  }
  exports2.convertLegacyPublicKey = convertLegacyPublicKey;
  function convertLegacyPublicKeys(keys2) {
    return keys2.map(convertLegacyPublicKey);
  }
  exports2.convertLegacyPublicKeys = convertLegacyPublicKeys;
  function stringToPrivateKey(s) {
    if (typeof s !== "string") {
      throw new Error("expected string containing private key");
    }
    if (s.substr(0, 7) === "PVT_R1_") {
      return stringToKey(s.substr(7), KeyType.r1, exports2.privateKeyDataSize, "R1");
    } else {
      throw new Error("unrecognized private key format");
    }
  }
  exports2.stringToPrivateKey = stringToPrivateKey;
  function privateKeyToString(key) {
    if (key.type === KeyType.r1) {
      return keyToString(key, "R1", "PVT_R1_");
    } else {
      throw new Error("unrecognized private key format");
    }
  }
  exports2.privateKeyToString = privateKeyToString;
  function stringToSignature(s) {
    if (typeof s !== "string") {
      throw new Error("expected string containing signature");
    }
    if (s.substr(0, 7) === "SIG_K1_") {
      return stringToKey(s.substr(7), KeyType.k1, exports2.signatureDataSize, "K1");
    } else if (s.substr(0, 7) === "SIG_R1_") {
      return stringToKey(s.substr(7), KeyType.r1, exports2.signatureDataSize, "R1");
    } else {
      throw new Error("unrecognized signature format");
    }
  }
  exports2.stringToSignature = stringToSignature;
  function signatureToString(signature) {
    if (signature.type === KeyType.k1) {
      return keyToString(signature, "K1", "SIG_K1_");
    } else if (signature.type === KeyType.r1) {
      return keyToString(signature, "R1", "SIG_R1_");
    } else {
      throw new Error("unrecognized signature format");
    }
  }
  exports2.signatureToString = signatureToString;
})(eosjsNumeric);
eosjsNumeric.default;
var __assign$1 = commonjsGlobal && commonjsGlobal.__assign || function() {
  __assign$1 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$1.apply(this, arguments);
};
var __read$1 = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spread$1 = commonjsGlobal && commonjsGlobal.__spread || function() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$1(arguments[i]));
  return ar;
};
var __values$2 = commonjsGlobal && commonjsGlobal.__values || function(o) {
  var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
  if (m) return m.call(o);
  return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
};
Object.defineProperty(eosjsSerialize, "__esModule", { value: true });
var numeric = eosjsNumeric;
var SerializerState = (
  /** @class */
  /* @__PURE__ */ (function() {
    function SerializerState2(options) {
      if (options === void 0) {
        options = {};
      }
      this.skippedBinaryExtension = false;
      this.options = options;
    }
    return SerializerState2;
  })()
);
eosjsSerialize.SerializerState = SerializerState;
var SerialBuffer = (
  /** @class */
  (function() {
    function SerialBuffer2(_a) {
      var _b = _a === void 0 ? {} : _a, textEncoder = _b.textEncoder, textDecoder = _b.textDecoder, array = _b.array;
      this.readPos = 0;
      this.array = array || new Uint8Array(1024);
      this.length = array ? array.length : 0;
      this.textEncoder = textEncoder || new TextEncoder();
      this.textDecoder = textDecoder || new TextDecoder("utf-8", { fatal: true });
    }
    SerialBuffer2.prototype.reserve = function(size) {
      if (this.length + size <= this.array.length) {
        return;
      }
      var l = this.array.length;
      while (this.length + size > l) {
        l = Math.ceil(l * 1.5);
      }
      var newArray = new Uint8Array(l);
      newArray.set(this.array);
      this.array = newArray;
    };
    SerialBuffer2.prototype.haveReadData = function() {
      return this.readPos < this.length;
    };
    SerialBuffer2.prototype.restartRead = function() {
      this.readPos = 0;
    };
    SerialBuffer2.prototype.asUint8Array = function() {
      return new Uint8Array(this.array.buffer, this.array.byteOffset, this.length);
    };
    SerialBuffer2.prototype.pushArray = function(v) {
      this.reserve(v.length);
      this.array.set(v, this.length);
      this.length += v.length;
    };
    SerialBuffer2.prototype.push = function() {
      var v = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        v[_i] = arguments[_i];
      }
      this.pushArray(v);
    };
    SerialBuffer2.prototype.get = function() {
      if (this.readPos < this.length) {
        return this.array[this.readPos++];
      }
      throw new Error("Read past end of buffer");
    };
    SerialBuffer2.prototype.pushUint8ArrayChecked = function(v, len) {
      if (v.length !== len) {
        throw new Error("Binary data has incorrect size");
      }
      this.pushArray(v);
    };
    SerialBuffer2.prototype.getUint8Array = function(len) {
      if (this.readPos + len > this.length) {
        throw new Error("Read past end of buffer");
      }
      var result = new Uint8Array(this.array.buffer, this.array.byteOffset + this.readPos, len);
      this.readPos += len;
      return result;
    };
    SerialBuffer2.prototype.pushUint16 = function(v) {
      this.push(v >> 0 & 255, v >> 8 & 255);
    };
    SerialBuffer2.prototype.getUint16 = function() {
      var v = 0;
      v |= this.get() << 0;
      v |= this.get() << 8;
      return v;
    };
    SerialBuffer2.prototype.pushUint32 = function(v) {
      this.push(v >> 0 & 255, v >> 8 & 255, v >> 16 & 255, v >> 24 & 255);
    };
    SerialBuffer2.prototype.getUint32 = function() {
      var v = 0;
      v |= this.get() << 0;
      v |= this.get() << 8;
      v |= this.get() << 16;
      v |= this.get() << 24;
      return v >>> 0;
    };
    SerialBuffer2.prototype.pushNumberAsUint64 = function(v) {
      this.pushUint32(v >>> 0);
      this.pushUint32(Math.floor(v / 4294967296) >>> 0);
    };
    SerialBuffer2.prototype.getUint64AsNumber = function() {
      var low = this.getUint32();
      var high = this.getUint32();
      return (high >>> 0) * 4294967296 + (low >>> 0);
    };
    SerialBuffer2.prototype.pushVaruint32 = function(v) {
      while (true) {
        if (v >>> 7) {
          this.push(128 | v & 127);
          v = v >>> 7;
        } else {
          this.push(v);
          break;
        }
      }
    };
    SerialBuffer2.prototype.getVaruint32 = function() {
      var v = 0;
      var bit = 0;
      while (true) {
        var b = this.get();
        v |= (b & 127) << bit;
        bit += 7;
        if (!(b & 128)) {
          break;
        }
      }
      return v >>> 0;
    };
    SerialBuffer2.prototype.pushVarint32 = function(v) {
      this.pushVaruint32(v << 1 ^ v >> 31);
    };
    SerialBuffer2.prototype.getVarint32 = function() {
      var v = this.getVaruint32();
      if (v & 1) {
        return ~v >> 1 | 2147483648;
      } else {
        return v >>> 1;
      }
    };
    SerialBuffer2.prototype.pushFloat32 = function(v) {
      this.pushArray(new Uint8Array(new Float32Array([v]).buffer));
    };
    SerialBuffer2.prototype.getFloat32 = function() {
      return new Float32Array(this.getUint8Array(4).slice().buffer)[0];
    };
    SerialBuffer2.prototype.pushFloat64 = function(v) {
      this.pushArray(new Uint8Array(new Float64Array([v]).buffer));
    };
    SerialBuffer2.prototype.getFloat64 = function() {
      return new Float64Array(this.getUint8Array(8).slice().buffer)[0];
    };
    SerialBuffer2.prototype.pushName = function(s) {
      if (typeof s !== "string") {
        throw new Error("Expected string containing name");
      }
      function charToSymbol(c2) {
        if (c2 >= "a".charCodeAt(0) && c2 <= "z".charCodeAt(0)) {
          return c2 - "a".charCodeAt(0) + 6;
        }
        if (c2 >= "1".charCodeAt(0) && c2 <= "5".charCodeAt(0)) {
          return c2 - "1".charCodeAt(0) + 1;
        }
        return 0;
      }
      var a = new Uint8Array(8);
      var bit = 63;
      for (var i = 0; i < s.length; ++i) {
        var c = charToSymbol(s.charCodeAt(i));
        if (bit < 5) {
          c = c << 1;
        }
        for (var j = 4; j >= 0; --j) {
          if (bit >= 0) {
            a[Math.floor(bit / 8)] |= (c >> j & 1) << bit % 8;
            --bit;
          }
        }
      }
      this.pushArray(a);
    };
    SerialBuffer2.prototype.getName = function() {
      var a = this.getUint8Array(8);
      var result = "";
      for (var bit = 63; bit >= 0; ) {
        var c = 0;
        for (var i = 0; i < 5; ++i) {
          if (bit >= 0) {
            c = c << 1 | a[Math.floor(bit / 8)] >> bit % 8 & 1;
            --bit;
          }
        }
        if (c >= 6) {
          result += String.fromCharCode(c + "a".charCodeAt(0) - 6);
        } else if (c >= 1) {
          result += String.fromCharCode(c + "1".charCodeAt(0) - 1);
        } else {
          result += ".";
        }
      }
      while (result.endsWith(".")) {
        result = result.substr(0, result.length - 1);
      }
      return result;
    };
    SerialBuffer2.prototype.pushBytes = function(v) {
      this.pushVaruint32(v.length);
      this.pushArray(v);
    };
    SerialBuffer2.prototype.getBytes = function() {
      return this.getUint8Array(this.getVaruint32());
    };
    SerialBuffer2.prototype.pushString = function(v) {
      this.pushBytes(this.textEncoder.encode(v));
    };
    SerialBuffer2.prototype.getString = function() {
      return this.textDecoder.decode(this.getBytes());
    };
    SerialBuffer2.prototype.pushSymbolCode = function(name2) {
      if (typeof name2 !== "string") {
        throw new Error("Expected string containing symbol_code");
      }
      var a = [];
      a.push.apply(a, __spread$1(this.textEncoder.encode(name2)));
      while (a.length < 8) {
        a.push(0);
      }
      this.pushArray(a.slice(0, 8));
    };
    SerialBuffer2.prototype.getSymbolCode = function() {
      var a = this.getUint8Array(8);
      var len;
      for (len = 0; len < a.length; ++len) {
        if (!a[len]) {
          break;
        }
      }
      var name2 = this.textDecoder.decode(new Uint8Array(a.buffer, a.byteOffset, len));
      return name2;
    };
    SerialBuffer2.prototype.pushSymbol = function(_a) {
      var name2 = _a.name, precision = _a.precision;
      var a = [precision & 255];
      a.push.apply(a, __spread$1(this.textEncoder.encode(name2)));
      while (a.length < 8) {
        a.push(0);
      }
      this.pushArray(a.slice(0, 8));
    };
    SerialBuffer2.prototype.getSymbol = function() {
      var precision = this.get();
      var a = this.getUint8Array(7);
      var len;
      for (len = 0; len < a.length; ++len) {
        if (!a[len]) {
          break;
        }
      }
      var name2 = this.textDecoder.decode(new Uint8Array(a.buffer, a.byteOffset, len));
      return { name: name2, precision };
    };
    SerialBuffer2.prototype.pushAsset = function(s) {
      if (typeof s !== "string") {
        throw new Error("Expected string containing asset");
      }
      s = s.trim();
      var pos = 0;
      var amount = "";
      var precision = 0;
      if (s[pos] === "-") {
        amount += "-";
        ++pos;
      }
      var foundDigit = false;
      while (pos < s.length && s.charCodeAt(pos) >= "0".charCodeAt(0) && s.charCodeAt(pos) <= "9".charCodeAt(0)) {
        foundDigit = true;
        amount += s[pos];
        ++pos;
      }
      if (!foundDigit) {
        throw new Error("Asset must begin with a number");
      }
      if (s[pos] === ".") {
        ++pos;
        while (pos < s.length && s.charCodeAt(pos) >= "0".charCodeAt(0) && s.charCodeAt(pos) <= "9".charCodeAt(0)) {
          amount += s[pos];
          ++precision;
          ++pos;
        }
      }
      var name2 = s.substr(pos).trim();
      this.pushArray(numeric.signedDecimalToBinary(8, amount));
      this.pushSymbol({ name: name2, precision });
    };
    SerialBuffer2.prototype.getAsset = function() {
      var amount = this.getUint8Array(8);
      var _a = this.getSymbol(), name2 = _a.name, precision = _a.precision;
      var s = numeric.signedBinaryToDecimal(amount, precision + 1);
      if (precision) {
        s = s.substr(0, s.length - precision) + "." + s.substr(s.length - precision);
      }
      return s + " " + name2;
    };
    SerialBuffer2.prototype.pushPublicKey = function(s) {
      var key = numeric.stringToPublicKey(s);
      this.push(key.type);
      this.pushArray(key.data);
    };
    SerialBuffer2.prototype.getPublicKey = function() {
      var type = this.get();
      var data = this.getUint8Array(numeric.publicKeyDataSize);
      return numeric.publicKeyToString({ type, data });
    };
    SerialBuffer2.prototype.pushPrivateKey = function(s) {
      var key = numeric.stringToPrivateKey(s);
      this.push(key.type);
      this.pushArray(key.data);
    };
    SerialBuffer2.prototype.getPrivateKey = function() {
      var type = this.get();
      var data = this.getUint8Array(numeric.privateKeyDataSize);
      return numeric.privateKeyToString({ type, data });
    };
    SerialBuffer2.prototype.pushSignature = function(s) {
      var key = numeric.stringToSignature(s);
      this.push(key.type);
      this.pushArray(key.data);
    };
    SerialBuffer2.prototype.getSignature = function() {
      var type = this.get();
      var data = this.getUint8Array(numeric.signatureDataSize);
      return numeric.signatureToString({ type, data });
    };
    return SerialBuffer2;
  })()
);
eosjsSerialize.SerialBuffer = SerialBuffer;
function supportedAbiVersion(version2) {
  return version2.startsWith("eosio::abi/1.");
}
eosjsSerialize.supportedAbiVersion = supportedAbiVersion;
function checkDateParse(date) {
  var result = Date.parse(date);
  if (Number.isNaN(result)) {
    throw new Error("Invalid time format");
  }
  return result;
}
function dateToTimePoint(date) {
  return Math.round(checkDateParse(date + "Z") * 1e3);
}
eosjsSerialize.dateToTimePoint = dateToTimePoint;
function timePointToDate(us) {
  var s = new Date(us / 1e3).toISOString();
  return s.substr(0, s.length - 1);
}
eosjsSerialize.timePointToDate = timePointToDate;
function dateToTimePointSec(date) {
  return Math.round(checkDateParse(date + "Z") / 1e3);
}
eosjsSerialize.dateToTimePointSec = dateToTimePointSec;
function timePointSecToDate(sec) {
  var s = new Date(sec * 1e3).toISOString();
  return s.substr(0, s.length - 1);
}
eosjsSerialize.timePointSecToDate = timePointSecToDate;
function dateToBlockTimestamp(date) {
  return Math.round((checkDateParse(date + "Z") - 9466848e5) / 500);
}
eosjsSerialize.dateToBlockTimestamp = dateToBlockTimestamp;
function blockTimestampToDate(slot) {
  var s = new Date(slot * 500 + 9466848e5).toISOString();
  return s.substr(0, s.length - 1);
}
eosjsSerialize.blockTimestampToDate = blockTimestampToDate;
function stringToSymbol(s) {
  if (typeof s !== "string") {
    throw new Error("Expected string containing symbol");
  }
  var m = s.match(/^([0-9]+),([A-Z]+)$/);
  if (!m) {
    throw new Error("Invalid symbol");
  }
  return { name: m[2], precision: +m[1] };
}
eosjsSerialize.stringToSymbol = stringToSymbol;
function symbolToString(_a) {
  var name2 = _a.name, precision = _a.precision;
  return precision + "," + name2;
}
eosjsSerialize.symbolToString = symbolToString;
function arrayToHex$1(data) {
  var e_1, _a;
  var result = "";
  try {
    for (var data_1 = __values$2(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
      var x = data_1_1.value;
      result += ("00" + x.toString(16)).slice(-2);
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
  return result.toUpperCase();
}
eosjsSerialize.arrayToHex = arrayToHex$1;
function hexToUint8Array(hex) {
  if (typeof hex !== "string") {
    throw new Error("Expected string containing hex digits");
  }
  if (hex.length % 2) {
    throw new Error("Odd number of hex digits");
  }
  var l = hex.length / 2;
  var result = new Uint8Array(l);
  for (var i = 0; i < l; ++i) {
    var x = parseInt(hex.substr(i * 2, 2), 16);
    if (Number.isNaN(x)) {
      throw new Error("Expected hex string");
    }
    result[i] = x;
  }
  return result;
}
eosjsSerialize.hexToUint8Array = hexToUint8Array;
function serializeUnknown(buffer, data) {
  throw new Error("Don't know how to serialize " + this.name);
}
function deserializeUnknown(buffer) {
  throw new Error("Don't know how to deserialize " + this.name);
}
function serializeStruct(buffer, data, state2, allowExtensions) {
  if (state2 === void 0) {
    state2 = new SerializerState();
  }
  if (allowExtensions === void 0) {
    allowExtensions = true;
  }
  var e_2, _a;
  if (typeof data !== "object") {
    throw new Error("expected object containing data: " + JSON.stringify(data));
  }
  if (this.base) {
    this.base.serialize(buffer, data, state2, allowExtensions);
  }
  try {
    for (var _b = __values$2(this.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
      var field = _c.value;
      if (field.name in data) {
        if (state2.skippedBinaryExtension) {
          throw new Error("unexpected " + this.name + "." + field.name);
        }
        field.type.serialize(buffer, data[field.name], state2, allowExtensions && field === this.fields[this.fields.length - 1]);
      } else {
        if (allowExtensions && field.type.extensionOf) {
          state2.skippedBinaryExtension = true;
        } else {
          throw new Error("missing " + this.name + "." + field.name + " (type=" + field.type.name + ")");
        }
      }
    }
  } catch (e_2_1) {
    e_2 = { error: e_2_1 };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
    } finally {
      if (e_2) throw e_2.error;
    }
  }
}
function deserializeStruct(buffer, state2, allowExtensions) {
  if (state2 === void 0) {
    state2 = new SerializerState();
  }
  if (allowExtensions === void 0) {
    allowExtensions = true;
  }
  var e_3, _a;
  var result;
  if (this.base) {
    result = this.base.deserialize(buffer, state2, allowExtensions);
  } else {
    result = {};
  }
  try {
    for (var _b = __values$2(this.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
      var field = _c.value;
      if (allowExtensions && field.type.extensionOf && !buffer.haveReadData()) {
        state2.skippedBinaryExtension = true;
      } else {
        result[field.name] = field.type.deserialize(buffer, state2, allowExtensions);
      }
    }
  } catch (e_3_1) {
    e_3 = { error: e_3_1 };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
    } finally {
      if (e_3) throw e_3.error;
    }
  }
  return result;
}
function serializeVariant(buffer, data, state2, allowExtensions) {
  if (!Array.isArray(data) || data.length !== 2 || typeof data[0] !== "string") {
    throw new Error('expected variant: ["type", value]');
  }
  var i = this.fields.findIndex(function(field) {
    return field.name === data[0];
  });
  if (i < 0) {
    throw new Error('type "' + data[0] + '" is not valid for variant');
  }
  buffer.pushVaruint32(i);
  this.fields[i].type.serialize(buffer, data[1], state2, allowExtensions);
}
function deserializeVariant(buffer, state2, allowExtensions) {
  var i = buffer.getVaruint32();
  if (i >= this.fields.length) {
    throw new Error("type index " + i + " is not valid for variant");
  }
  var field = this.fields[i];
  return [field.name, field.type.deserialize(buffer, state2, allowExtensions)];
}
function serializeArray(buffer, data, state2, allowExtensions) {
  var e_4, _a;
  buffer.pushVaruint32(data.length);
  try {
    for (var data_2 = __values$2(data), data_2_1 = data_2.next(); !data_2_1.done; data_2_1 = data_2.next()) {
      var item = data_2_1.value;
      this.arrayOf.serialize(buffer, item, state2, false);
    }
  } catch (e_4_1) {
    e_4 = { error: e_4_1 };
  } finally {
    try {
      if (data_2_1 && !data_2_1.done && (_a = data_2.return)) _a.call(data_2);
    } finally {
      if (e_4) throw e_4.error;
    }
  }
}
function deserializeArray(buffer, state2, allowExtensions) {
  var len = buffer.getVaruint32();
  var result = [];
  for (var i = 0; i < len; ++i) {
    result.push(this.arrayOf.deserialize(buffer, state2, false));
  }
  return result;
}
function serializeOptional(buffer, data, state2, allowExtensions) {
  if (data === null || data === void 0) {
    buffer.push(0);
  } else {
    buffer.push(1);
    this.optionalOf.serialize(buffer, data, state2, allowExtensions);
  }
}
function deserializeOptional(buffer, state2, allowExtensions) {
  if (buffer.get()) {
    return this.optionalOf.deserialize(buffer, state2, allowExtensions);
  } else {
    return null;
  }
}
function serializeExtension(buffer, data, state2, allowExtensions) {
  this.extensionOf.serialize(buffer, data, state2, allowExtensions);
}
function deserializeExtension(buffer, state2, allowExtensions) {
  return this.extensionOf.deserialize(buffer, state2, allowExtensions);
}
function createType(attrs) {
  return __assign$1({ name: "<missing name>", aliasOfName: "", arrayOf: null, optionalOf: null, extensionOf: null, baseName: "", base: null, fields: [], serialize: serializeUnknown, deserialize: deserializeUnknown }, attrs);
}
function checkRange(orig, converted) {
  if (Number.isNaN(+orig) || Number.isNaN(+converted) || typeof orig !== "number" && typeof orig !== "string") {
    throw new Error("Expected number");
  }
  if (+orig !== +converted) {
    throw new Error("Number is out of range");
  }
  return +orig;
}
function createInitialTypes() {
  var result = new Map(Object.entries({
    bool: createType({
      name: "bool",
      serialize: function(buffer, data) {
        if (typeof data !== "boolean") {
          throw new Error("Expected true or false");
        }
        buffer.push(data ? 1 : 0);
      },
      deserialize: function(buffer) {
        return !!buffer.get();
      }
    }),
    uint8: createType({
      name: "uint8",
      serialize: function(buffer, data) {
        buffer.push(checkRange(data, data & 255));
      },
      deserialize: function(buffer) {
        return buffer.get();
      }
    }),
    int8: createType({
      name: "int8",
      serialize: function(buffer, data) {
        buffer.push(checkRange(data, data << 24 >> 24));
      },
      deserialize: function(buffer) {
        return buffer.get() << 24 >> 24;
      }
    }),
    uint16: createType({
      name: "uint16",
      serialize: function(buffer, data) {
        buffer.pushUint16(checkRange(data, data & 65535));
      },
      deserialize: function(buffer) {
        return buffer.getUint16();
      }
    }),
    int16: createType({
      name: "int16",
      serialize: function(buffer, data) {
        buffer.pushUint16(checkRange(data, data << 16 >> 16));
      },
      deserialize: function(buffer) {
        return buffer.getUint16() << 16 >> 16;
      }
    }),
    uint32: createType({
      name: "uint32",
      serialize: function(buffer, data) {
        buffer.pushUint32(checkRange(data, data >>> 0));
      },
      deserialize: function(buffer) {
        return buffer.getUint32();
      }
    }),
    uint64: createType({
      name: "uint64",
      serialize: function(buffer, data) {
        buffer.pushArray(numeric.decimalToBinary(8, "" + data));
      },
      deserialize: function(buffer) {
        return numeric.binaryToDecimal(buffer.getUint8Array(8));
      }
    }),
    int64: createType({
      name: "int64",
      serialize: function(buffer, data) {
        buffer.pushArray(numeric.signedDecimalToBinary(8, "" + data));
      },
      deserialize: function(buffer) {
        return numeric.signedBinaryToDecimal(buffer.getUint8Array(8));
      }
    }),
    int32: createType({
      name: "int32",
      serialize: function(buffer, data) {
        buffer.pushUint32(checkRange(data, data | 0));
      },
      deserialize: function(buffer) {
        return buffer.getUint32() | 0;
      }
    }),
    varuint32: createType({
      name: "varuint32",
      serialize: function(buffer, data) {
        buffer.pushVaruint32(checkRange(data, data >>> 0));
      },
      deserialize: function(buffer) {
        return buffer.getVaruint32();
      }
    }),
    varint32: createType({
      name: "varint32",
      serialize: function(buffer, data) {
        buffer.pushVarint32(checkRange(data, data | 0));
      },
      deserialize: function(buffer) {
        return buffer.getVarint32();
      }
    }),
    uint128: createType({
      name: "uint128",
      serialize: function(buffer, data) {
        buffer.pushArray(numeric.decimalToBinary(16, "" + data));
      },
      deserialize: function(buffer) {
        return numeric.binaryToDecimal(buffer.getUint8Array(16));
      }
    }),
    int128: createType({
      name: "int128",
      serialize: function(buffer, data) {
        buffer.pushArray(numeric.signedDecimalToBinary(16, "" + data));
      },
      deserialize: function(buffer) {
        return numeric.signedBinaryToDecimal(buffer.getUint8Array(16));
      }
    }),
    float32: createType({
      name: "float32",
      serialize: function(buffer, data) {
        buffer.pushFloat32(data);
      },
      deserialize: function(buffer) {
        return buffer.getFloat32();
      }
    }),
    float64: createType({
      name: "float64",
      serialize: function(buffer, data) {
        buffer.pushFloat64(data);
      },
      deserialize: function(buffer) {
        return buffer.getFloat64();
      }
    }),
    float128: createType({
      name: "float128",
      serialize: function(buffer, data) {
        buffer.pushUint8ArrayChecked(hexToUint8Array(data), 16);
      },
      deserialize: function(buffer) {
        return arrayToHex$1(buffer.getUint8Array(16));
      }
    }),
    bytes: createType({
      name: "bytes",
      serialize: function(buffer, data) {
        if (data instanceof Uint8Array || Array.isArray(data)) {
          buffer.pushBytes(data);
        } else {
          buffer.pushBytes(hexToUint8Array(data));
        }
      },
      deserialize: function(buffer, state2) {
        if (state2 && state2.options.bytesAsUint8Array) {
          return buffer.getBytes();
        } else {
          return arrayToHex$1(buffer.getBytes());
        }
      }
    }),
    string: createType({
      name: "string",
      serialize: function(buffer, data) {
        buffer.pushString(data);
      },
      deserialize: function(buffer) {
        return buffer.getString();
      }
    }),
    name: createType({
      name: "name",
      serialize: function(buffer, data) {
        buffer.pushName(data);
      },
      deserialize: function(buffer) {
        return buffer.getName();
      }
    }),
    time_point: createType({
      name: "time_point",
      serialize: function(buffer, data) {
        buffer.pushNumberAsUint64(dateToTimePoint(data));
      },
      deserialize: function(buffer) {
        return timePointToDate(buffer.getUint64AsNumber());
      }
    }),
    time_point_sec: createType({
      name: "time_point_sec",
      serialize: function(buffer, data) {
        buffer.pushUint32(dateToTimePointSec(data));
      },
      deserialize: function(buffer) {
        return timePointSecToDate(buffer.getUint32());
      }
    }),
    block_timestamp_type: createType({
      name: "block_timestamp_type",
      serialize: function(buffer, data) {
        buffer.pushUint32(dateToBlockTimestamp(data));
      },
      deserialize: function(buffer) {
        return blockTimestampToDate(buffer.getUint32());
      }
    }),
    symbol_code: createType({
      name: "symbol_code",
      serialize: function(buffer, data) {
        buffer.pushSymbolCode(data);
      },
      deserialize: function(buffer) {
        return buffer.getSymbolCode();
      }
    }),
    symbol: createType({
      name: "symbol",
      serialize: function(buffer, data) {
        buffer.pushSymbol(stringToSymbol(data));
      },
      deserialize: function(buffer) {
        return symbolToString(buffer.getSymbol());
      }
    }),
    asset: createType({
      name: "asset",
      serialize: function(buffer, data) {
        buffer.pushAsset(data);
      },
      deserialize: function(buffer) {
        return buffer.getAsset();
      }
    }),
    checksum160: createType({
      name: "checksum160",
      serialize: function(buffer, data) {
        buffer.pushUint8ArrayChecked(hexToUint8Array(data), 20);
      },
      deserialize: function(buffer) {
        return arrayToHex$1(buffer.getUint8Array(20));
      }
    }),
    checksum256: createType({
      name: "checksum256",
      serialize: function(buffer, data) {
        buffer.pushUint8ArrayChecked(hexToUint8Array(data), 32);
      },
      deserialize: function(buffer) {
        return arrayToHex$1(buffer.getUint8Array(32));
      }
    }),
    checksum512: createType({
      name: "checksum512",
      serialize: function(buffer, data) {
        buffer.pushUint8ArrayChecked(hexToUint8Array(data), 64);
      },
      deserialize: function(buffer) {
        return arrayToHex$1(buffer.getUint8Array(64));
      }
    }),
    public_key: createType({
      name: "public_key",
      serialize: function(buffer, data) {
        buffer.pushPublicKey(data);
      },
      deserialize: function(buffer) {
        return buffer.getPublicKey();
      }
    }),
    private_key: createType({
      name: "private_key",
      serialize: function(buffer, data) {
        buffer.pushPrivateKey(data);
      },
      deserialize: function(buffer) {
        return buffer.getPrivateKey();
      }
    }),
    signature: createType({
      name: "signature",
      serialize: function(buffer, data) {
        buffer.pushSignature(data);
      },
      deserialize: function(buffer) {
        return buffer.getSignature();
      }
    })
  }));
  result.set("extended_asset", createType({
    name: "extended_asset",
    baseName: "",
    fields: [
      { name: "quantity", typeName: "asset", type: result.get("asset") },
      { name: "contract", typeName: "name", type: result.get("name") }
    ],
    serialize: serializeStruct,
    deserialize: deserializeStruct
  }));
  return result;
}
eosjsSerialize.createInitialTypes = createInitialTypes;
function getType(types2, name2) {
  var type = types2.get(name2);
  if (type && type.aliasOfName) {
    return getType(types2, type.aliasOfName);
  }
  if (type) {
    return type;
  }
  if (name2.endsWith("[]")) {
    return createType({
      name: name2,
      arrayOf: getType(types2, name2.substr(0, name2.length - 2)),
      serialize: serializeArray,
      deserialize: deserializeArray
    });
  }
  if (name2.endsWith("?")) {
    return createType({
      name: name2,
      optionalOf: getType(types2, name2.substr(0, name2.length - 1)),
      serialize: serializeOptional,
      deserialize: deserializeOptional
    });
  }
  if (name2.endsWith("$")) {
    return createType({
      name: name2,
      extensionOf: getType(types2, name2.substr(0, name2.length - 1)),
      serialize: serializeExtension,
      deserialize: deserializeExtension
    });
  }
  throw new Error("Unknown type: " + name2);
}
eosjsSerialize.getType = getType;
function getTypesFromAbi(initialTypes, abi) {
  var e_5, _a, e_6, _b, e_7, _c, e_8, _d, e_9, _e;
  var types2 = new Map(initialTypes);
  if (abi.types) {
    try {
      for (var _f = __values$2(abi.types), _g = _f.next(); !_g.done; _g = _f.next()) {
        var _h = _g.value, new_type_name = _h.new_type_name, type = _h.type;
        types2.set(new_type_name, createType({ name: new_type_name, aliasOfName: type }));
      }
    } catch (e_5_1) {
      e_5 = { error: e_5_1 };
    } finally {
      try {
        if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
      } finally {
        if (e_5) throw e_5.error;
      }
    }
  }
  if (abi.structs) {
    try {
      for (var _j = __values$2(abi.structs), _k = _j.next(); !_k.done; _k = _j.next()) {
        var _l = _k.value, name_1 = _l.name, base = _l.base, fields = _l.fields;
        types2.set(name_1, createType({
          name: name_1,
          baseName: base,
          fields: fields.map(function(_a2) {
            var n = _a2.name, type2 = _a2.type;
            return { name: n, typeName: type2, type: null };
          }),
          serialize: serializeStruct,
          deserialize: deserializeStruct
        }));
      }
    } catch (e_6_1) {
      e_6 = { error: e_6_1 };
    } finally {
      try {
        if (_k && !_k.done && (_b = _j.return)) _b.call(_j);
      } finally {
        if (e_6) throw e_6.error;
      }
    }
  }
  if (abi.variants) {
    try {
      for (var _m = __values$2(abi.variants), _o = _m.next(); !_o.done; _o = _m.next()) {
        var _p = _o.value, name_2 = _p.name, t = _p.types;
        types2.set(name_2, createType({
          name: name_2,
          fields: t.map(function(s) {
            return { name: s, typeName: s, type: null };
          }),
          serialize: serializeVariant,
          deserialize: deserializeVariant
        }));
      }
    } catch (e_7_1) {
      e_7 = { error: e_7_1 };
    } finally {
      try {
        if (_o && !_o.done && (_c = _m.return)) _c.call(_m);
      } finally {
        if (e_7) throw e_7.error;
      }
    }
  }
  try {
    for (var types_1 = __values$2(types2), types_1_1 = types_1.next(); !types_1_1.done; types_1_1 = types_1.next()) {
      var _q = __read$1(types_1_1.value, 2), name_3 = _q[0], type = _q[1];
      if (type.baseName) {
        type.base = getType(types2, type.baseName);
      }
      try {
        for (var _r = __values$2(type.fields), _s = _r.next(); !_s.done; _s = _r.next()) {
          var field = _s.value;
          field.type = getType(types2, field.typeName);
        }
      } catch (e_9_1) {
        e_9 = { error: e_9_1 };
      } finally {
        try {
          if (_s && !_s.done && (_e = _r.return)) _e.call(_r);
        } finally {
          if (e_9) throw e_9.error;
        }
      }
    }
  } catch (e_8_1) {
    e_8 = { error: e_8_1 };
  } finally {
    try {
      if (types_1_1 && !types_1_1.done && (_d = types_1.return)) _d.call(types_1);
    } finally {
      if (e_8) throw e_8.error;
    }
  }
  return types2;
}
eosjsSerialize.getTypesFromAbi = getTypesFromAbi;
function transactionHeader(refBlock, expireSeconds) {
  return {
    expiration: timePointSecToDate(dateToTimePointSec(refBlock.timestamp) + expireSeconds),
    ref_block_num: refBlock.block_num & 65535,
    ref_block_prefix: refBlock.ref_block_prefix
  };
}
eosjsSerialize.transactionHeader = transactionHeader;
function serializeActionData(contract, account, name2, data, textEncoder, textDecoder) {
  var action = contract.actions.get(name2);
  if (!action) {
    throw new Error("Unknown action " + name2 + " in contract " + account);
  }
  var buffer = new SerialBuffer({ textEncoder, textDecoder });
  action.serialize(buffer, data);
  return arrayToHex$1(buffer.asUint8Array());
}
eosjsSerialize.serializeActionData = serializeActionData;
function serializeAction(contract, account, name2, authorization, data, textEncoder, textDecoder) {
  return {
    account,
    name: name2,
    authorization,
    data: serializeActionData(contract, account, name2, data, textEncoder, textDecoder)
  };
}
eosjsSerialize.serializeAction = serializeAction;
function deserializeActionData(contract, account, name2, data, textEncoder, textDecoder) {
  var action = contract.actions.get(name2);
  if (typeof data === "string") {
    data = hexToUint8Array(data);
  }
  if (!action) {
    throw new Error("Unknown action " + name2 + " in contract " + account);
  }
  var buffer = new SerialBuffer({ textDecoder, textEncoder });
  buffer.pushArray(data);
  return action.deserialize(buffer);
}
eosjsSerialize.deserializeActionData = deserializeActionData;
function deserializeAction(contract, account, name2, authorization, data, textEncoder, textDecoder) {
  return {
    account,
    name: name2,
    authorization,
    data: deserializeActionData(contract, account, name2, data, textEncoder, textDecoder)
  };
}
eosjsSerialize.deserializeAction = deserializeAction;
var version$2 = "eosio::abi/1.1";
var structs$1 = [
  {
    name: "extensions_entry",
    base: "",
    fields: [
      {
        name: "tag",
        type: "uint16"
      },
      {
        name: "value",
        type: "bytes"
      }
    ]
  },
  {
    name: "type_def",
    base: "",
    fields: [
      {
        name: "new_type_name",
        type: "string"
      },
      {
        name: "type",
        type: "string"
      }
    ]
  },
  {
    name: "field_def",
    base: "",
    fields: [
      {
        name: "name",
        type: "string"
      },
      {
        name: "type",
        type: "string"
      }
    ]
  },
  {
    name: "struct_def",
    base: "",
    fields: [
      {
        name: "name",
        type: "string"
      },
      {
        name: "base",
        type: "string"
      },
      {
        name: "fields",
        type: "field_def[]"
      }
    ]
  },
  {
    name: "action_def",
    base: "",
    fields: [
      {
        name: "name",
        type: "name"
      },
      {
        name: "type",
        type: "string"
      },
      {
        name: "ricardian_contract",
        type: "string"
      }
    ]
  },
  {
    name: "table_def",
    base: "",
    fields: [
      {
        name: "name",
        type: "name"
      },
      {
        name: "index_type",
        type: "string"
      },
      {
        name: "key_names",
        type: "string[]"
      },
      {
        name: "key_types",
        type: "string[]"
      },
      {
        name: "type",
        type: "string"
      }
    ]
  },
  {
    name: "clause_pair",
    base: "",
    fields: [
      {
        name: "id",
        type: "string"
      },
      {
        name: "body",
        type: "string"
      }
    ]
  },
  {
    name: "error_message",
    base: "",
    fields: [
      {
        name: "error_code",
        type: "uint64"
      },
      {
        name: "error_msg",
        type: "string"
      }
    ]
  },
  {
    name: "variant_def",
    base: "",
    fields: [
      {
        name: "name",
        type: "string"
      },
      {
        name: "types",
        type: "string[]"
      }
    ]
  },
  {
    name: "abi_def",
    base: "",
    fields: [
      {
        name: "version",
        type: "string"
      },
      {
        name: "types",
        type: "type_def[]"
      },
      {
        name: "structs",
        type: "struct_def[]"
      },
      {
        name: "actions",
        type: "action_def[]"
      },
      {
        name: "tables",
        type: "table_def[]"
      },
      {
        name: "ricardian_clauses",
        type: "clause_pair[]"
      },
      {
        name: "error_messages",
        type: "error_message[]"
      },
      {
        name: "abi_extensions",
        type: "extensions_entry[]"
      },
      {
        name: "variants",
        type: "variant_def[]$"
      }
    ]
  }
];
var require$$1$2 = {
  version: version$2,
  structs: structs$1
};
var version$1 = "eosio::abi/1.0";
var types = [
  {
    new_type_name: "account_name",
    type: "name"
  },
  {
    new_type_name: "action_name",
    type: "name"
  },
  {
    new_type_name: "permission_name",
    type: "name"
  }
];
var structs = [
  {
    name: "permission_level",
    base: "",
    fields: [
      {
        name: "actor",
        type: "account_name"
      },
      {
        name: "permission",
        type: "permission_name"
      }
    ]
  },
  {
    name: "action",
    base: "",
    fields: [
      {
        name: "account",
        type: "account_name"
      },
      {
        name: "name",
        type: "action_name"
      },
      {
        name: "authorization",
        type: "permission_level[]"
      },
      {
        name: "data",
        type: "bytes"
      }
    ]
  },
  {
    name: "extension",
    base: "",
    fields: [
      {
        name: "type",
        type: "uint16"
      },
      {
        name: "data",
        type: "bytes"
      }
    ]
  },
  {
    name: "transaction_header",
    base: "",
    fields: [
      {
        name: "expiration",
        type: "time_point_sec"
      },
      {
        name: "ref_block_num",
        type: "uint16"
      },
      {
        name: "ref_block_prefix",
        type: "uint32"
      },
      {
        name: "max_net_usage_words",
        type: "varuint32"
      },
      {
        name: "max_cpu_usage_ms",
        type: "uint8"
      },
      {
        name: "delay_sec",
        type: "varuint32"
      }
    ]
  },
  {
    name: "transaction",
    base: "transaction_header",
    fields: [
      {
        name: "context_free_actions",
        type: "action[]"
      },
      {
        name: "actions",
        type: "action[]"
      },
      {
        name: "transaction_extensions",
        type: "extension[]"
      }
    ]
  }
];
var require$$2$1 = {
  version: version$1,
  types,
  structs
};
var __assign = commonjsGlobal && commonjsGlobal.__assign || function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __awaiter$1 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : new P(function(resolve2) {
        resolve2(result.value);
      }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator$1 = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
  var _2 = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_2) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _2.label++;
          return { value: op[1], done: false };
        case 5:
          _2.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _2.ops.pop();
          _2.trys.pop();
          continue;
        default:
          if (!(t = _2.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _2 = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _2.label = op[1];
            break;
          }
          if (op[0] === 6 && _2.label < t[1]) {
            _2.label = t[1];
            t = op;
            break;
          }
          if (t && _2.label < t[2]) {
            _2.label = t[2];
            _2.ops.push(op);
            break;
          }
          if (t[2]) _2.ops.pop();
          _2.trys.pop();
          continue;
      }
      op = body.call(thisArg, _2);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __rest = commonjsGlobal && commonjsGlobal.__rest || function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") {
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
      t[p[i]] = s[p[i]];
  }
  return t;
};
var __read = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spread = commonjsGlobal && commonjsGlobal.__spread || function() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
  return ar;
};
var __values$1 = commonjsGlobal && commonjsGlobal.__values || function(o) {
  var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
  if (m) return m.call(o);
  return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
};
Object.defineProperty(eosjsApi, "__esModule", { value: true });
var ser = eosjsSerialize;
var abiAbi = require$$1$2;
var transactionAbi = require$$2$1;
var Api$1 = (
  /** @class */
  (function() {
    function Api2(args) {
      this.contracts = /* @__PURE__ */ new Map();
      this.cachedAbis = /* @__PURE__ */ new Map();
      this.rpc = args.rpc;
      this.authorityProvider = args.authorityProvider || args.rpc;
      this.abiProvider = args.abiProvider || args.rpc;
      this.signatureProvider = args.signatureProvider;
      this.chainId = args.chainId;
      this.textEncoder = args.textEncoder;
      this.textDecoder = args.textDecoder;
      this.abiTypes = ser.getTypesFromAbi(ser.createInitialTypes(), abiAbi);
      this.transactionTypes = ser.getTypesFromAbi(ser.createInitialTypes(), transactionAbi);
    }
    Api2.prototype.rawAbiToJson = function(rawAbi) {
      var buffer = new ser.SerialBuffer({
        textEncoder: this.textEncoder,
        textDecoder: this.textDecoder,
        array: rawAbi
      });
      if (!ser.supportedAbiVersion(buffer.getString())) {
        throw new Error("Unsupported abi version");
      }
      buffer.restartRead();
      return this.abiTypes.get("abi_def").deserialize(buffer);
    };
    Api2.prototype.getCachedAbi = function(accountName, reload) {
      if (reload === void 0) {
        reload = false;
      }
      return __awaiter$1(this, void 0, void 0, function() {
        var cachedAbi, rawAbi, abi, e_1;
        return __generator$1(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (!reload && this.cachedAbis.get(accountName)) {
                return [2, this.cachedAbis.get(accountName)];
              }
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, , 4]);
              return [4, this.abiProvider.getRawAbi(accountName)];
            case 2:
              rawAbi = _a.sent().abi;
              abi = this.rawAbiToJson(rawAbi);
              cachedAbi = { rawAbi, abi };
              return [3, 4];
            case 3:
              e_1 = _a.sent();
              e_1.message = "fetching abi for " + accountName + ": " + e_1.message;
              throw e_1;
            case 4:
              if (!cachedAbi) {
                throw new Error("Missing abi for " + accountName);
              }
              this.cachedAbis.set(accountName, cachedAbi);
              return [2, cachedAbi];
          }
        });
      });
    };
    Api2.prototype.getAbi = function(accountName, reload) {
      if (reload === void 0) {
        reload = false;
      }
      return __awaiter$1(this, void 0, void 0, function() {
        return __generator$1(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.getCachedAbi(accountName, reload)];
            case 1:
              return [2, _a.sent().abi];
          }
        });
      });
    };
    Api2.prototype.getTransactionAbis = function(transaction, reload) {
      if (reload === void 0) {
        reload = false;
      }
      return __awaiter$1(this, void 0, void 0, function() {
        var accounts, uniqueAccounts, actionPromises;
        var _this = this;
        return __generator$1(this, function(_a) {
          accounts = transaction.actions.map(function(action) {
            return action.account;
          });
          uniqueAccounts = new Set(accounts);
          actionPromises = __spread(uniqueAccounts).map(function(account) {
            return __awaiter$1(_this, void 0, void 0, function() {
              var _a2;
              return __generator$1(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    _a2 = {
                      accountName: account
                    };
                    return [4, this.getCachedAbi(account, reload)];
                  case 1:
                    return [2, (_a2.abi = _b.sent().rawAbi, _a2)];
                }
              });
            });
          });
          return [2, Promise.all(actionPromises)];
        });
      });
    };
    Api2.prototype.getContract = function(accountName, reload) {
      if (reload === void 0) {
        reload = false;
      }
      return __awaiter$1(this, void 0, void 0, function() {
        var e_2, _a, abi, types2, actions, _b, _c, _d, name_1, type, result;
        return __generator$1(this, function(_e) {
          switch (_e.label) {
            case 0:
              if (!reload && this.contracts.get(accountName)) {
                return [2, this.contracts.get(accountName)];
              }
              return [4, this.getAbi(accountName, reload)];
            case 1:
              abi = _e.sent();
              types2 = ser.getTypesFromAbi(ser.createInitialTypes(), abi);
              actions = /* @__PURE__ */ new Map();
              try {
                for (_b = __values$1(abi.actions), _c = _b.next(); !_c.done; _c = _b.next()) {
                  _d = _c.value, name_1 = _d.name, type = _d.type;
                  actions.set(name_1, ser.getType(types2, type));
                }
              } catch (e_2_1) {
                e_2 = { error: e_2_1 };
              } finally {
                try {
                  if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                } finally {
                  if (e_2) throw e_2.error;
                }
              }
              result = { types: types2, actions };
              this.contracts.set(accountName, result);
              return [2, result];
          }
        });
      });
    };
    Api2.prototype.serialize = function(buffer, type, value) {
      this.transactionTypes.get(type).serialize(buffer, value);
    };
    Api2.prototype.deserialize = function(buffer, type) {
      return this.transactionTypes.get(type).deserialize(buffer);
    };
    Api2.prototype.serializeTransaction = function(transaction) {
      var buffer = new ser.SerialBuffer({ textEncoder: this.textEncoder, textDecoder: this.textDecoder });
      this.serialize(buffer, "transaction", __assign({ max_net_usage_words: 0, max_cpu_usage_ms: 0, delay_sec: 0, context_free_actions: [], actions: [], transaction_extensions: [] }, transaction));
      return buffer.asUint8Array();
    };
    Api2.prototype.deserializeTransaction = function(transaction) {
      var buffer = new ser.SerialBuffer({ textEncoder: this.textEncoder, textDecoder: this.textDecoder });
      buffer.pushArray(transaction);
      return this.deserialize(buffer, "transaction");
    };
    Api2.prototype.serializeActions = function(actions) {
      return __awaiter$1(this, void 0, void 0, function() {
        var _this = this;
        return __generator$1(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, Promise.all(actions.map(function(_a2) {
                var account = _a2.account, name2 = _a2.name, authorization = _a2.authorization, data = _a2.data;
                return __awaiter$1(_this, void 0, void 0, function() {
                  var contract;
                  return __generator$1(this, function(_b) {
                    switch (_b.label) {
                      case 0:
                        return [4, this.getContract(account)];
                      case 1:
                        contract = _b.sent();
                        return [2, ser.serializeAction(contract, account, name2, authorization, data, this.textEncoder, this.textDecoder)];
                    }
                  });
                });
              }))];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    Api2.prototype.deserializeActions = function(actions) {
      return __awaiter$1(this, void 0, void 0, function() {
        var _this = this;
        return __generator$1(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, Promise.all(actions.map(function(_a2) {
                var account = _a2.account, name2 = _a2.name, authorization = _a2.authorization, data = _a2.data;
                return __awaiter$1(_this, void 0, void 0, function() {
                  var contract;
                  return __generator$1(this, function(_b) {
                    switch (_b.label) {
                      case 0:
                        return [4, this.getContract(account)];
                      case 1:
                        contract = _b.sent();
                        return [2, ser.deserializeAction(contract, account, name2, authorization, data, this.textEncoder, this.textDecoder)];
                    }
                  });
                });
              }))];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    Api2.prototype.deserializeTransactionWithActions = function(transaction) {
      return __awaiter$1(this, void 0, void 0, function() {
        var deserializedTransaction, deserializedActions;
        return __generator$1(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (typeof transaction === "string") {
                transaction = ser.hexToUint8Array(transaction);
              }
              deserializedTransaction = this.deserializeTransaction(transaction);
              return [4, this.deserializeActions(deserializedTransaction.actions)];
            case 1:
              deserializedActions = _a.sent();
              return [2, __assign({}, deserializedTransaction, { actions: deserializedActions })];
          }
        });
      });
    };
    Api2.prototype.transact = function(transaction, _a) {
      var _b = _a === void 0 ? {} : _a, _c = _b.broadcast, broadcast = _c === void 0 ? true : _c, _d = _b.sign, sign = _d === void 0 ? true : _d, blocksBehind = _b.blocksBehind, expireSeconds = _b.expireSeconds;
      return __awaiter$1(this, void 0, void 0, function() {
        var info, refBlock, abis, _e, _f, serializedTransaction, pushTransactionArgs, availableKeys, requiredKeys;
        return __generator$1(this, function(_g) {
          switch (_g.label) {
            case 0:
              if (!!this.chainId) return [3, 2];
              return [4, this.rpc.get_info()];
            case 1:
              info = _g.sent();
              this.chainId = info.chain_id;
              _g.label = 2;
            case 2:
              if (!(typeof blocksBehind === "number" && expireSeconds)) return [3, 6];
              if (!!info) return [3, 4];
              return [4, this.rpc.get_info()];
            case 3:
              info = _g.sent();
              _g.label = 4;
            case 4:
              return [4, this.rpc.get_block(info.head_block_num - blocksBehind)];
            case 5:
              refBlock = _g.sent();
              transaction = __assign({}, ser.transactionHeader(refBlock, expireSeconds), transaction);
              _g.label = 6;
            case 6:
              if (!this.hasRequiredTaposFields(transaction)) {
                throw new Error("Required configuration or TAPOS fields are not present");
              }
              return [4, this.getTransactionAbis(transaction)];
            case 7:
              abis = _g.sent();
              _e = [{}, transaction];
              _f = {};
              return [4, this.serializeActions(transaction.actions)];
            case 8:
              transaction = __assign.apply(void 0, _e.concat([(_f.actions = _g.sent(), _f)]));
              serializedTransaction = this.serializeTransaction(transaction);
              pushTransactionArgs = { serializedTransaction, signatures: [] };
              if (!sign) return [3, 12];
              return [4, this.signatureProvider.getAvailableKeys()];
            case 9:
              availableKeys = _g.sent();
              return [4, this.authorityProvider.getRequiredKeys({ transaction, availableKeys })];
            case 10:
              requiredKeys = _g.sent();
              return [4, this.signatureProvider.sign({
                chainId: this.chainId,
                requiredKeys,
                serializedTransaction,
                abis
              })];
            case 11:
              pushTransactionArgs = _g.sent();
              _g.label = 12;
            case 12:
              if (broadcast) {
                return [2, this.pushSignedTransaction(pushTransactionArgs)];
              }
              return [2, pushTransactionArgs];
          }
        });
      });
    };
    Api2.prototype.pushSignedTransaction = function(_a) {
      var signatures = _a.signatures, serializedTransaction = _a.serializedTransaction;
      return __awaiter$1(this, void 0, void 0, function() {
        return __generator$1(this, function(_b) {
          return [2, this.rpc.push_transaction({
            signatures,
            serializedTransaction
          })];
        });
      });
    };
    Api2.prototype.hasRequiredTaposFields = function(_a) {
      var expiration = _a.expiration, ref_block_num = _a.ref_block_num, ref_block_prefix = _a.ref_block_prefix;
      __rest(_a, ["expiration", "ref_block_num", "ref_block_prefix"]);
      return !!(expiration && ref_block_num && ref_block_prefix);
    };
    return Api2;
  })()
);
eosjsApi.Api = Api$1;
var eosjsApiInterfaces = {};
Object.defineProperty(eosjsApiInterfaces, "__esModule", { value: true });
var eosjsJsonrpc = {};
var eosjsRpcerror = {};
var __extends = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ (function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
Object.defineProperty(eosjsRpcerror, "__esModule", { value: true });
var RpcError = (
  /** @class */
  (function(_super) {
    __extends(RpcError2, _super);
    function RpcError2(json) {
      var _this = this;
      if (json.error && json.error.details && json.error.details.length && json.error.details[0].message) {
        _this = _super.call(this, json.error.details[0].message) || this;
      } else if (json.processed && json.processed.except && json.processed.except.message) {
        _this = _super.call(this, json.processed.except.message) || this;
      } else {
        _this = _super.call(this, json.message) || this;
      }
      Object.setPrototypeOf(_this, RpcError2.prototype);
      _this.json = json;
      return _this;
    }
    return RpcError2;
  })(Error)
);
eosjsRpcerror.RpcError = RpcError;
var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : new P(function(resolve2) {
        resolve2(result.value);
      }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
  var _2 = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_2) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _2.label++;
          return { value: op[1], done: false };
        case 5:
          _2.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _2.ops.pop();
          _2.trys.pop();
          continue;
        default:
          if (!(t = _2.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _2 = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _2.label = op[1];
            break;
          }
          if (op[0] === 6 && _2.label < t[1]) {
            _2.label = t[1];
            t = op;
            break;
          }
          if (t && _2.label < t[2]) {
            _2.label = t[2];
            _2.ops.push(op);
            break;
          }
          if (t[2]) _2.ops.pop();
          _2.trys.pop();
          continue;
      }
      op = body.call(thisArg, _2);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __values = commonjsGlobal && commonjsGlobal.__values || function(o) {
  var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
  if (m) return m.call(o);
  return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
};
Object.defineProperty(eosjsJsonrpc, "__esModule", { value: true });
var eosjs_numeric_1 = eosjsNumeric;
var eosjs_rpcerror_1$1 = eosjsRpcerror;
function arrayToHex(data) {
  var e_1, _a;
  var result = "";
  try {
    for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
      var x = data_1_1.value;
      result += ("00" + x.toString(16)).slice(-2);
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
  return result;
}
var JsonRpc$1 = (
  /** @class */
  (function() {
    function JsonRpc2(endpoint, args) {
      if (args === void 0) {
        args = {};
      }
      this.endpoint = endpoint;
      if (args.fetch) {
        this.fetchBuiltin = args.fetch;
      } else {
        this.fetchBuiltin = commonjsGlobal.fetch;
      }
    }
    JsonRpc2.prototype.fetch = function(path, body) {
      return __awaiter(this, void 0, void 0, function() {
        var response, json, f, e_2;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 3, , 4]);
              f = this.fetchBuiltin;
              return [4, f(this.endpoint + path, {
                body: JSON.stringify(body),
                method: "POST"
              })];
            case 1:
              response = _a.sent();
              return [4, response.json()];
            case 2:
              json = _a.sent();
              if (json.processed && json.processed.except) {
                throw new eosjs_rpcerror_1$1.RpcError(json);
              }
              return [3, 4];
            case 3:
              e_2 = _a.sent();
              e_2.isFetchError = true;
              throw e_2;
            case 4:
              if (!response.ok) {
                throw new eosjs_rpcerror_1$1.RpcError(json);
              }
              return [2, json];
          }
        });
      });
    };
    JsonRpc2.prototype.get_abi = function(accountName) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.fetch("/v1/chain/get_abi", { account_name: accountName })];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    JsonRpc2.prototype.get_account = function(accountName) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.fetch("/v1/chain/get_account", { account_name: accountName })];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    JsonRpc2.prototype.get_block_header_state = function(blockNumOrId) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.fetch("/v1/chain/get_block_header_state", { block_num_or_id: blockNumOrId })];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    JsonRpc2.prototype.get_block = function(blockNumOrId) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.fetch("/v1/chain/get_block", { block_num_or_id: blockNumOrId })];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    JsonRpc2.prototype.get_code = function(accountName) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.fetch("/v1/chain/get_code", { account_name: accountName })];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    JsonRpc2.prototype.get_currency_balance = function(code, account, symbol) {
      if (symbol === void 0) {
        symbol = null;
      }
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.fetch("/v1/chain/get_currency_balance", { code, account, symbol })];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    JsonRpc2.prototype.get_currency_stats = function(code, symbol) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.fetch("/v1/chain/get_currency_stats", { code, symbol })];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    JsonRpc2.prototype.get_info = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.fetch("/v1/chain/get_info", {})];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    JsonRpc2.prototype.get_producer_schedule = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.fetch("/v1/chain/get_producer_schedule", {})];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    JsonRpc2.prototype.get_producers = function(json, lowerBound, limit) {
      if (json === void 0) {
        json = true;
      }
      if (lowerBound === void 0) {
        lowerBound = "";
      }
      if (limit === void 0) {
        limit = 50;
      }
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.fetch("/v1/chain/get_producers", { json, lower_bound: lowerBound, limit })];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    JsonRpc2.prototype.get_raw_code_and_abi = function(accountName) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.fetch("/v1/chain/get_raw_code_and_abi", { account_name: accountName })];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    JsonRpc2.prototype.getRawAbi = function(accountName) {
      return __awaiter(this, void 0, void 0, function() {
        var rawCodeAndAbi, abi;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.get_raw_code_and_abi(accountName)];
            case 1:
              rawCodeAndAbi = _a.sent();
              abi = eosjs_numeric_1.base64ToBinary(rawCodeAndAbi.abi);
              return [2, { accountName: rawCodeAndAbi.account_name, abi }];
          }
        });
      });
    };
    JsonRpc2.prototype.get_table_rows = function(_a) {
      var _b = _a.json, json = _b === void 0 ? true : _b, code = _a.code, scope = _a.scope, table = _a.table, _c = _a.table_key, table_key = _c === void 0 ? "" : _c, _d = _a.lower_bound, lower_bound = _d === void 0 ? "" : _d, _e = _a.upper_bound, upper_bound = _e === void 0 ? "" : _e, _f = _a.index_position, index_position = _f === void 0 ? 1 : _f, _g = _a.key_type, key_type = _g === void 0 ? "" : _g, _h = _a.limit, limit = _h === void 0 ? 10 : _h, _j = _a.reverse, reverse = _j === void 0 ? false : _j, _k = _a.show_payer, show_payer = _k === void 0 ? false : _k;
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_l) {
          switch (_l.label) {
            case 0:
              return [4, this.fetch("/v1/chain/get_table_rows", {
                json,
                code,
                scope,
                table,
                table_key,
                lower_bound,
                upper_bound,
                index_position,
                key_type,
                limit,
                reverse,
                show_payer
              })];
            case 1:
              return [2, _l.sent()];
          }
        });
      });
    };
    JsonRpc2.prototype.get_table_by_scope = function(_a) {
      var code = _a.code, table = _a.table, _b = _a.lower_bound, lower_bound = _b === void 0 ? "" : _b, _c = _a.upper_bound, upper_bound = _c === void 0 ? "" : _c, _d = _a.limit, limit = _d === void 0 ? 10 : _d;
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_e) {
          switch (_e.label) {
            case 0:
              return [4, this.fetch("/v1/chain/get_table_by_scope", {
                code,
                table,
                lower_bound,
                upper_bound,
                limit
              })];
            case 1:
              return [2, _e.sent()];
          }
        });
      });
    };
    JsonRpc2.prototype.getRequiredKeys = function(args) {
      return __awaiter(this, void 0, void 0, function() {
        var _a;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              _a = eosjs_numeric_1.convertLegacyPublicKeys;
              return [4, this.fetch("/v1/chain/get_required_keys", {
                transaction: args.transaction,
                available_keys: args.availableKeys
              })];
            case 1:
              return [2, _a.apply(void 0, [_b.sent().required_keys])];
          }
        });
      });
    };
    JsonRpc2.prototype.push_transaction = function(_a) {
      var signatures = _a.signatures, serializedTransaction = _a.serializedTransaction;
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              return [4, this.fetch("/v1/chain/push_transaction", {
                signatures,
                compression: 0,
                packed_context_free_data: "",
                packed_trx: arrayToHex(serializedTransaction)
              })];
            case 1:
              return [2, _b.sent()];
          }
        });
      });
    };
    JsonRpc2.prototype.db_size_get = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.fetch("/v1/db_size/get", {})];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    JsonRpc2.prototype.history_get_actions = function(accountName, pos, offset) {
      if (pos === void 0) {
        pos = null;
      }
      if (offset === void 0) {
        offset = null;
      }
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.fetch("/v1/history/get_actions", { account_name: accountName, pos, offset })];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    JsonRpc2.prototype.history_get_transaction = function(id, blockNumHint) {
      if (blockNumHint === void 0) {
        blockNumHint = null;
      }
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.fetch("/v1/history/get_transaction", { id, block_num_hint: blockNumHint })];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    JsonRpc2.prototype.history_get_key_accounts = function(publicKey) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.fetch("/v1/history/get_key_accounts", { public_key: publicKey })];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    JsonRpc2.prototype.history_get_controlled_accounts = function(controllingAccount) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.fetch("/v1/history/get_controlled_accounts", { controlling_account: controllingAccount })];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    return JsonRpc2;
  })()
);
eosjsJsonrpc.JsonRpc = JsonRpc$1;
var eosjsRpcInterfaces = {};
Object.defineProperty(eosjsRpcInterfaces, "__esModule", { value: true });
Object.defineProperty(dist, "__esModule", { value: true });
var eosjs_api_1 = eosjsApi;
var Api = dist.Api = eosjs_api_1.Api;
var ApiInterfaces = eosjsApiInterfaces;
dist.ApiInterfaces = ApiInterfaces;
var eosjs_jsonrpc_1 = eosjsJsonrpc;
var JsonRpc = dist.JsonRpc = eosjs_jsonrpc_1.JsonRpc;
var Numeric = eosjsNumeric;
dist.Numeric = Numeric;
var RpcInterfaces = eosjsRpcInterfaces;
dist.RpcInterfaces = RpcInterfaces;
var eosjs_rpcerror_1 = eosjsRpcerror;
dist.RpcError = eosjs_rpcerror_1.RpcError;
var Serialize = eosjsSerialize;
dist.Serialize = Serialize;
var scatter = {};
var ws = null;
if (typeof WebSocket !== "undefined") {
  ws = WebSocket;
} else if (typeof MozWebSocket !== "undefined") {
  ws = MozWebSocket;
} else if (typeof commonjsGlobal !== "undefined") {
  ws = commonjsGlobal.WebSocket || commonjsGlobal.MozWebSocket;
} else if (typeof window !== "undefined") {
  ws = window.WebSocket || window.MozWebSocket;
} else if (typeof self !== "undefined") {
  ws = self.WebSocket || self.MozWebSocket;
}
var browser$3 = ws;
browser$3.default;
var inherits$d;
if (typeof Object.create === "function") {
  inherits$d = function inherits2(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  inherits$d = function inherits2(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function() {
    };
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}
var inherits$e = inherits$d;
var _polyfillNode_inherits = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: inherits$e
});
var require$$0$1 = /* @__PURE__ */ getAugmentedNamespace(_polyfillNode_inherits);
var safeBuffer = { exports: {} };
var global$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var inited = false;
function init() {
  inited = true;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
}
function toByteArray(b64) {
  if (!inited) {
    init();
  }
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0;
  arr = new Arr(len * 3 / 4 - placeHolders);
  l = placeHolders > 0 ? len - 4 : len;
  var L = 0;
  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = tmp >> 16 & 255;
    arr[L++] = tmp >> 8 & 255;
    arr[L++] = tmp & 255;
  }
  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[L++] = tmp & 255;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[L++] = tmp >> 8 & 255;
    arr[L++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function fromByteArray(uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var output = "";
  var parts = [];
  var maxChunkLength = 16383;
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 63];
    output += "==";
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 63];
    output += lookup[tmp << 2 & 63];
    output += "=";
  }
  parts.push(output);
  return parts.join("");
}
function read(buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
  }
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
  }
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
}
function write(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
  }
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
  }
  buffer[offset + i - d] |= s * 128;
}
var toString = {}.toString;
var isArray$1 = Array.isArray || function(arr) {
  return toString.call(arr) == "[object Array]";
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
var INSPECT_MAX_BYTES = 50;
Buffer$b.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== void 0 ? global$1.TYPED_ARRAY_SUPPORT : true;
var _kMaxLength = kMaxLength();
function kMaxLength() {
  return Buffer$b.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError("Invalid typed array length");
  }
  if (Buffer$b.TYPED_ARRAY_SUPPORT) {
    that = new Uint8Array(length);
    that.__proto__ = Buffer$b.prototype;
  } else {
    if (that === null) {
      that = new Buffer$b(length);
    }
    that.length = length;
  }
  return that;
}
function Buffer$b(arg, encodingOrOffset, length) {
  if (!Buffer$b.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer$b)) {
    return new Buffer$b(arg, encodingOrOffset, length);
  }
  if (typeof arg === "number") {
    if (typeof encodingOrOffset === "string") {
      throw new Error(
        "If encoding is specified then the first argument must be a string"
      );
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}
Buffer$b.poolSize = 8192;
Buffer$b._augment = function(arr) {
  arr.__proto__ = Buffer$b.prototype;
  return arr;
};
function from(that, value, encodingOrOffset, length) {
  if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }
  if (typeof value === "string") {
    return fromString(that, value, encodingOrOffset);
  }
  return fromObject(that, value);
}
Buffer$b.from = function(value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};
if (Buffer$b.TYPED_ARRAY_SUPPORT) {
  Buffer$b.prototype.__proto__ = Uint8Array.prototype;
  Buffer$b.__proto__ = Uint8Array;
  if (typeof Symbol !== "undefined" && Symbol.species && Buffer$b[Symbol.species] === Buffer$b) ;
}
function assertSize(size) {
  if (typeof size !== "number") {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}
function alloc(that, size, fill2, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill2 !== void 0) {
    return typeof encoding === "string" ? createBuffer(that, size).fill(fill2, encoding) : createBuffer(that, size).fill(fill2);
  }
  return createBuffer(that, size);
}
Buffer$b.alloc = function(size, fill2, encoding) {
  return alloc(null, size, fill2, encoding);
};
function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer$b.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that;
}
Buffer$b.allocUnsafe = function(size) {
  return allocUnsafe(null, size);
};
Buffer$b.allocUnsafeSlow = function(size) {
  return allocUnsafe(null, size);
};
function fromString(that, string, encoding) {
  if (typeof encoding !== "string" || encoding === "") {
    encoding = "utf8";
  }
  if (!Buffer$b.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }
  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);
  var actual = that.write(string, encoding);
  if (actual !== length) {
    that = that.slice(0, actual);
  }
  return that;
}
function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that;
}
function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength;
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError("'offset' is out of bounds");
  }
  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError("'length' is out of bounds");
  }
  if (byteOffset === void 0 && length === void 0) {
    array = new Uint8Array(array);
  } else if (length === void 0) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }
  if (Buffer$b.TYPED_ARRAY_SUPPORT) {
    that = array;
    that.__proto__ = Buffer$b.prototype;
  } else {
    that = fromArrayLike(that, array);
  }
  return that;
}
function fromObject(that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);
    if (that.length === 0) {
      return that;
    }
    obj.copy(that, 0, 0, len);
    return that;
  }
  if (obj) {
    if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
      if (typeof obj.length !== "number" || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }
    if (obj.type === "Buffer" && isArray$1(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }
  throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}
function checked(length) {
  if (length >= kMaxLength()) {
    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
  }
  return length | 0;
}
function SlowBuffer(length) {
  if (+length != length) {
    length = 0;
  }
  return Buffer$b.alloc(+length);
}
Buffer$b.isBuffer = isBuffer$1;
function internalIsBuffer(b) {
  return !!(b != null && b._isBuffer);
}
Buffer$b.compare = function compare(a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError("Arguments must be Buffers");
  }
  if (a === b) return 0;
  var x = a.length;
  var y = b.length;
  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }
  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};
Buffer$b.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case "hex":
    case "utf8":
    case "utf-8":
    case "ascii":
    case "latin1":
    case "binary":
    case "base64":
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
      return true;
    default:
      return false;
  }
};
Buffer$b.concat = function concat(list, length) {
  if (!isArray$1(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }
  if (list.length === 0) {
    return Buffer$b.alloc(0);
  }
  var i;
  if (length === void 0) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }
  var buffer = Buffer$b.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!internalIsBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};
function byteLength(string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== "string") {
    string = "" + string;
  }
  var len = string.length;
  if (len === 0) return 0;
  var loweredCase = false;
  for (; ; ) {
    switch (encoding) {
      case "ascii":
      case "latin1":
      case "binary":
        return len;
      case "utf8":
      case "utf-8":
      case void 0:
        return utf8ToBytes(string).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return len * 2;
      case "hex":
        return len >>> 1;
      case "base64":
        return base64ToBytes(string).length;
      default:
        if (loweredCase) return utf8ToBytes(string).length;
        encoding = ("" + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer$b.byteLength = byteLength;
function slowToString(encoding, start, end) {
  var loweredCase = false;
  if (start === void 0 || start < 0) {
    start = 0;
  }
  if (start > this.length) {
    return "";
  }
  if (end === void 0 || end > this.length) {
    end = this.length;
  }
  if (end <= 0) {
    return "";
  }
  end >>>= 0;
  start >>>= 0;
  if (end <= start) {
    return "";
  }
  if (!encoding) encoding = "utf8";
  while (true) {
    switch (encoding) {
      case "hex":
        return hexSlice(this, start, end);
      case "utf8":
      case "utf-8":
        return utf8Slice(this, start, end);
      case "ascii":
        return asciiSlice(this, start, end);
      case "latin1":
      case "binary":
        return latin1Slice(this, start, end);
      case "base64":
        return base64Slice(this, start, end);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return utf16leSlice(this, start, end);
      default:
        if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
        encoding = (encoding + "").toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer$b.prototype._isBuffer = true;
function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}
Buffer$b.prototype.swap16 = function swap16() {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError("Buffer size must be a multiple of 16-bits");
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this;
};
Buffer$b.prototype.swap32 = function swap32() {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError("Buffer size must be a multiple of 32-bits");
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this;
};
Buffer$b.prototype.swap64 = function swap64() {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError("Buffer size must be a multiple of 64-bits");
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this;
};
Buffer$b.prototype.toString = function toString2() {
  var length = this.length | 0;
  if (length === 0) return "";
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};
Buffer$b.prototype.equals = function equals(b) {
  if (!internalIsBuffer(b)) throw new TypeError("Argument must be a Buffer");
  if (this === b) return true;
  return Buffer$b.compare(this, b) === 0;
};
Buffer$b.prototype.inspect = function inspect() {
  var str = "";
  var max = INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
    if (this.length > max) str += " ... ";
  }
  return "<Buffer " + str + ">";
};
Buffer$b.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError("Argument must be a Buffer");
  }
  if (start === void 0) {
    start = 0;
  }
  if (end === void 0) {
    end = target ? target.length : 0;
  }
  if (thisStart === void 0) {
    thisStart = 0;
  }
  if (thisEnd === void 0) {
    thisEnd = this.length;
  }
  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError("out of range index");
  }
  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }
  if (thisStart >= thisEnd) {
    return -1;
  }
  if (start >= end) {
    return 1;
  }
  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;
  if (this === target) return 0;
  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);
  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);
  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }
  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  if (buffer.length === 0) return -1;
  if (typeof byteOffset === "string") {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 2147483647) {
    byteOffset = 2147483647;
  } else if (byteOffset < -2147483648) {
    byteOffset = -2147483648;
  }
  byteOffset = +byteOffset;
  if (isNaN(byteOffset)) {
    byteOffset = dir ? 0 : buffer.length - 1;
  }
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1;
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1;
  }
  if (typeof val === "string") {
    val = Buffer$b.from(val, encoding);
  }
  if (internalIsBuffer(val)) {
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === "number") {
    val = val & 255;
    if (Buffer$b.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }
  throw new TypeError("val must be string, number or Buffer");
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;
  if (encoding !== void 0) {
    encoding = String(encoding).toLowerCase();
    if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }
  function read2(buf, i2) {
    if (indexSize === 1) {
      return buf[i2];
    } else {
      return buf.readUInt16BE(i2 * indexSize);
    }
  }
  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read2(arr, i + j) !== read2(val, j)) {
          found = false;
          break;
        }
      }
      if (found) return i;
    }
  }
  return -1;
}
Buffer$b.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};
Buffer$b.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
Buffer$b.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError("Invalid hex string");
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }
  return i;
}
function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}
function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
Buffer$b.prototype.write = function write2(string, offset, length, encoding) {
  if (offset === void 0) {
    encoding = "utf8";
    length = this.length;
    offset = 0;
  } else if (length === void 0 && typeof offset === "string") {
    encoding = offset;
    length = this.length;
    offset = 0;
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === void 0) encoding = "utf8";
    } else {
      encoding = length;
      length = void 0;
    }
  } else {
    throw new Error(
      "Buffer.write(string, encoding, offset[, length]) is no longer supported"
    );
  }
  var remaining = this.length - offset;
  if (length === void 0 || length > remaining) length = remaining;
  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError("Attempt to write outside buffer bounds");
  }
  if (!encoding) encoding = "utf8";
  var loweredCase = false;
  for (; ; ) {
    switch (encoding) {
      case "hex":
        return hexWrite(this, string, offset, length);
      case "utf8":
      case "utf-8":
        return utf8Write(this, string, offset, length);
      case "ascii":
        return asciiWrite(this, string, offset, length);
      case "latin1":
      case "binary":
        return latin1Write(this, string, offset, length);
      case "base64":
        return base64Write(this, string, offset, length);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return ucs2Write(this, string, offset, length);
      default:
        if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
        encoding = ("" + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};
Buffer$b.prototype.toJSON = function toJSON() {
  return {
    type: "Buffer",
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};
function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf);
  } else {
    return fromByteArray(buf.slice(start, end));
  }
}
function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
            if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      codePoint = 65533;
      bytesPerSequence = 1;
    } else if (codePoint > 65535) {
      codePoint -= 65536;
      res.push(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    res.push(codePoint);
    i += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
var MAX_ARGUMENTS_LENGTH = 4096;
function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints);
  }
  var res = "";
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res;
}
function asciiSlice(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 127);
  }
  return ret;
}
function latin1Slice(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}
function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;
  var out = "";
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out;
}
function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = "";
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}
Buffer$b.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === void 0 ? len : ~~end;
  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }
  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }
  if (end < start) end = start;
  var newBuf;
  if (Buffer$b.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer$b.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer$b(sliceLen, void 0);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }
  return newBuf;
};
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
  if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
}
Buffer$b.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
  offset = offset | 0;
  byteLength2 = byteLength2 | 0;
  if (!noAssert) checkOffset(offset, byteLength2, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength2 && (mul *= 256)) {
    val += this[offset + i] * mul;
  }
  return val;
};
Buffer$b.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
  offset = offset | 0;
  byteLength2 = byteLength2 | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength2, this.length);
  }
  var val = this[offset + --byteLength2];
  var mul = 1;
  while (byteLength2 > 0 && (mul *= 256)) {
    val += this[offset + --byteLength2] * mul;
  }
  return val;
};
Buffer$b.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};
Buffer$b.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};
Buffer$b.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};
Buffer$b.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
};
Buffer$b.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};
Buffer$b.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
  offset = offset | 0;
  byteLength2 = byteLength2 | 0;
  if (!noAssert) checkOffset(offset, byteLength2, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength2 && (mul *= 256)) {
    val += this[offset + i] * mul;
  }
  mul *= 128;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
  return val;
};
Buffer$b.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
  offset = offset | 0;
  byteLength2 = byteLength2 | 0;
  if (!noAssert) checkOffset(offset, byteLength2, this.length);
  var i = byteLength2;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 256)) {
    val += this[offset + --i] * mul;
  }
  mul *= 128;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
  return val;
};
Buffer$b.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 128)) return this[offset];
  return (255 - this[offset] + 1) * -1;
};
Buffer$b.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 32768 ? val | 4294901760 : val;
};
Buffer$b.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 32768 ? val | 4294901760 : val;
};
Buffer$b.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};
Buffer$b.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};
Buffer$b.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4);
};
Buffer$b.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4);
};
Buffer$b.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8);
};
Buffer$b.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8);
};
function checkInt(buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError("Index out of range");
}
Buffer$b.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength2 = byteLength2 | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
    checkInt(this, value, offset, byteLength2, maxBytes, 0);
  }
  var mul = 1;
  var i = 0;
  this[offset] = value & 255;
  while (++i < byteLength2 && (mul *= 256)) {
    this[offset + i] = value / mul & 255;
  }
  return offset + byteLength2;
};
Buffer$b.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength2 = byteLength2 | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
    checkInt(this, value, offset, byteLength2, maxBytes, 0);
  }
  var i = byteLength2 - 1;
  var mul = 1;
  this[offset + i] = value & 255;
  while (--i >= 0 && (mul *= 256)) {
    this[offset + i] = value / mul & 255;
  }
  return offset + byteLength2;
};
Buffer$b.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
  if (!Buffer$b.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 255;
  return offset + 1;
};
function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 65535 + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}
Buffer$b.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
  if (Buffer$b.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};
Buffer$b.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
  if (Buffer$b.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};
function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 4294967295 + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
  }
}
Buffer$b.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
  if (Buffer$b.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 255;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};
Buffer$b.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
  if (Buffer$b.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};
Buffer$b.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength2 - 1);
    checkInt(this, value, offset, byteLength2, limit - 1, -limit);
  }
  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 255;
  while (++i < byteLength2 && (mul *= 256)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 255;
  }
  return offset + byteLength2;
};
Buffer$b.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength2 - 1);
    checkInt(this, value, offset, byteLength2, limit - 1, -limit);
  }
  var i = byteLength2 - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 255;
  while (--i >= 0 && (mul *= 256)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 255;
  }
  return offset + byteLength2;
};
Buffer$b.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
  if (!Buffer$b.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 255 + value + 1;
  this[offset] = value & 255;
  return offset + 1;
};
Buffer$b.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
  if (Buffer$b.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};
Buffer$b.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
  if (Buffer$b.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};
Buffer$b.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
  if (Buffer$b.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};
Buffer$b.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
  if (value < 0) value = 4294967295 + value + 1;
  if (Buffer$b.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};
function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError("Index out of range");
  if (offset < 0) throw new RangeError("Index out of range");
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4);
  }
  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}
Buffer$b.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};
Buffer$b.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};
function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8);
  }
  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}
Buffer$b.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};
Buffer$b.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
};
Buffer$b.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;
  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0;
  if (targetStart < 0) {
    throw new RangeError("targetStart out of bounds");
  }
  if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
  if (end < 0) throw new RangeError("sourceEnd out of bounds");
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }
  var len = end - start;
  var i;
  if (this === target && start < targetStart && targetStart < end) {
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1e3 || !Buffer$b.TYPED_ARRAY_SUPPORT) {
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }
  return len;
};
Buffer$b.prototype.fill = function fill(val, start, end, encoding) {
  if (typeof val === "string") {
    if (typeof start === "string") {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === "string") {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== void 0 && typeof encoding !== "string") {
      throw new TypeError("encoding must be a string");
    }
    if (typeof encoding === "string" && !Buffer$b.isEncoding(encoding)) {
      throw new TypeError("Unknown encoding: " + encoding);
    }
  } else if (typeof val === "number") {
    val = val & 255;
  }
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError("Out of range index");
  }
  if (end <= start) {
    return this;
  }
  start = start >>> 0;
  end = end === void 0 ? this.length : end >>> 0;
  if (!val) val = 0;
  var i;
  if (typeof val === "number") {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer$b(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }
  return this;
};
var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
function base64clean(str) {
  str = stringtrim(str).replace(INVALID_BASE64_RE, "");
  if (str.length < 2) return "";
  while (str.length % 4 !== 0) {
    str = str + "=";
  }
  return str;
}
function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, "");
}
function toHex(n) {
  if (n < 16) return "0" + n.toString(16);
  return n.toString(16);
}
function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];
  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);
    if (codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          continue;
        } else if (i + 1 === length) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        if ((units -= 3) > -1) bytes.push(239, 191, 189);
        leadSurrogate = codePoint;
        continue;
      }
      codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
    } else if (leadSurrogate) {
      if ((units -= 3) > -1) bytes.push(239, 191, 189);
    }
    leadSurrogate = null;
    if (codePoint < 128) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0) break;
      bytes.push(
        codePoint >> 6 | 192,
        codePoint & 63 | 128
      );
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0) break;
      bytes.push(
        codePoint >> 12 | 224,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0) break;
      bytes.push(
        codePoint >> 18 | 240,
        codePoint >> 12 & 63 | 128,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else {
      throw new Error("Invalid code point");
    }
  }
  return bytes;
}
function asciiToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    byteArray.push(str.charCodeAt(i) & 255);
  }
  return byteArray;
}
function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;
    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }
  return byteArray;
}
function base64ToBytes(str) {
  return toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }
  return i;
}
function isnan(val) {
  return val !== val;
}
function isBuffer$1(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
}
function isFastBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
}
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isFastBuffer(obj.slice(0, 0));
}
var _polyfillNode_buffer = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Buffer: Buffer$b,
  INSPECT_MAX_BYTES,
  SlowBuffer,
  isBuffer: isBuffer$1,
  kMaxLength: _kMaxLength
});
var require$$3$1 = /* @__PURE__ */ getAugmentedNamespace(_polyfillNode_buffer);
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
(function(module, exports2) {
  var buffer = require$$3$1;
  var Buffer2 = buffer.Buffer;
  function copyProps(src, dst) {
    for (var key in src) {
      dst[key] = src[key];
    }
  }
  if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
    module.exports = buffer;
  } else {
    copyProps(buffer, exports2);
    exports2.Buffer = SafeBuffer;
  }
  function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer2(arg, encodingOrOffset, length);
  }
  SafeBuffer.prototype = Object.create(Buffer2.prototype);
  copyProps(Buffer2, SafeBuffer);
  SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      throw new TypeError("Argument must not be a number");
    }
    return Buffer2(arg, encodingOrOffset, length);
  };
  SafeBuffer.alloc = function(size, fill2, encoding) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    var buf = Buffer2(size);
    if (fill2 !== void 0) {
      if (typeof encoding === "string") {
        buf.fill(fill2, encoding);
      } else {
        buf.fill(fill2);
      }
    } else {
      buf.fill(0);
    }
    return buf;
  };
  SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return Buffer2(size);
  };
  SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return buffer.SlowBuffer(size);
  };
})(safeBuffer, safeBuffer.exports);
var safeBufferExports = safeBuffer.exports;
safeBufferExports.default;
var readableBrowser = { exports: {} };
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === "function") {
  cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === "function") {
  cachedClearTimeout = clearTimeout;
}
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    return setTimeout(fun, 0);
  }
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e2) {
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    return clearTimeout(marker);
  }
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      return cachedClearTimeout.call(null, marker);
    } catch (e2) {
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function() {
  this.fun.apply(null, this.array);
};
var title = "browser";
var platform = "browser";
var browser$2 = true;
var env = {};
var argv = [];
var version = "";
var versions = {};
var release = {};
var config = {};
function noop$2() {
}
var on = noop$2;
var addListener = noop$2;
var once$2 = noop$2;
var off = noop$2;
var removeListener = noop$2;
var removeAllListeners = noop$2;
var emit = noop$2;
function binding(name2) {
  throw new Error("process.binding is not supported");
}
function cwd() {
  return "/";
}
function chdir(dir) {
  throw new Error("process.chdir is not supported");
}
function umask() {
  return 0;
}
var performance = global$1.performance || {};
var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
  return (/* @__PURE__ */ new Date()).getTime();
};
function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds, nanoseconds];
}
var startTime = /* @__PURE__ */ new Date();
function uptime() {
  var currentTime = /* @__PURE__ */ new Date();
  var dif = currentTime - startTime;
  return dif / 1e3;
}
var browser$1$1 = {
  nextTick,
  title,
  browser: browser$2,
  env,
  argv,
  version,
  versions,
  on,
  addListener,
  once: once$2,
  off,
  removeListener,
  removeAllListeners,
  emit,
  binding,
  cwd,
  chdir,
  umask,
  hrtime,
  platform,
  release,
  config,
  uptime
};
var domain;
function EventHandlers() {
}
EventHandlers.prototype = /* @__PURE__ */ Object.create(null);
function EventEmitter() {
  EventEmitter.init.call(this);
}
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.usingDomains = false;
EventEmitter.prototype.domain = void 0;
EventEmitter.prototype._events = void 0;
EventEmitter.prototype._maxListeners = void 0;
EventEmitter.defaultMaxListeners = 10;
EventEmitter.init = function() {
  this.domain = null;
  if (EventEmitter.usingDomains) {
    if (domain.active) ;
  }
  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
    this._events = new EventHandlers();
    this._eventsCount = 0;
  }
  this._maxListeners = this._maxListeners || void 0;
};
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== "number" || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};
function $getMaxListeners(that) {
  if (that._maxListeners === void 0)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};
function emitNone(handler, isFn, self2) {
  if (isFn)
    handler.call(self2);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners2[i].call(self2);
  }
}
function emitOne(handler, isFn, self2, arg1) {
  if (isFn)
    handler.call(self2, arg1);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners2[i].call(self2, arg1);
  }
}
function emitTwo(handler, isFn, self2, arg1, arg2) {
  if (isFn)
    handler.call(self2, arg1, arg2);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners2[i].call(self2, arg1, arg2);
  }
}
function emitThree(handler, isFn, self2, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self2, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners2[i].call(self2, arg1, arg2, arg3);
  }
}
function emitMany(handler, isFn, self2, args) {
  if (isFn)
    handler.apply(self2, args);
  else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners2[i].apply(self2, args);
  }
}
EventEmitter.prototype.emit = function emit2(type) {
  var er, handler, len, args, i, events, domain2;
  var doError = type === "error";
  events = this._events;
  if (events)
    doError = doError && events.error == null;
  else if (!doError)
    return false;
  domain2 = this.domain;
  if (doError) {
    er = arguments[1];
    if (domain2) {
      if (!er)
        er = new Error('Uncaught, unspecified "error" event');
      er.domainEmitter = this;
      er.domain = domain2;
      er.domainThrown = false;
      domain2.emit("error", er);
    } else if (er instanceof Error) {
      throw er;
    } else {
      var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
      err.context = er;
      throw err;
    }
    return false;
  }
  handler = events[type];
  if (!handler)
    return false;
  var isFn = typeof handler === "function";
  len = arguments.length;
  switch (len) {
    // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
    // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }
  return true;
};
function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  if (typeof listener !== "function")
    throw new TypeError('"listener" argument must be a function');
  events = target._events;
  if (!events) {
    events = target._events = new EventHandlers();
    target._eventsCount = 0;
  } else {
    if (events.newListener) {
      target.emit(
        "newListener",
        type,
        listener.listener ? listener.listener : listener
      );
      events = target._events;
    }
    existing = events[type];
  }
  if (!existing) {
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === "function") {
      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
    } else {
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + type + " listeners added. Use emitter.setMaxListeners() to increase limit");
        w.name = "MaxListenersExceededWarning";
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        emitWarning(w);
      }
    }
  }
  return target;
}
function emitWarning(e) {
  typeof console.warn === "function" ? console.warn(e) : console.log(e);
}
EventEmitter.prototype.addListener = function addListener2(type, listener) {
  return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};
function _onceWrap(target, type, listener) {
  var fired = false;
  function g() {
    target.removeListener(type, g);
    if (!fired) {
      fired = true;
      listener.apply(target, arguments);
    }
  }
  g.listener = listener;
  return g;
}
EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== "function")
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  if (typeof listener !== "function")
    throw new TypeError('"listener" argument must be a function');
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.removeListener = function removeListener2(type, listener) {
  var list, events, position, i, originalListener;
  if (typeof listener !== "function")
    throw new TypeError('"listener" argument must be a function');
  events = this._events;
  if (!events)
    return this;
  list = events[type];
  if (!list)
    return this;
  if (list === listener || list.listener && list.listener === listener) {
    if (--this._eventsCount === 0)
      this._events = new EventHandlers();
    else {
      delete events[type];
      if (events.removeListener)
        this.emit("removeListener", type, list.listener || listener);
    }
  } else if (typeof list !== "function") {
    position = -1;
    for (i = list.length; i-- > 0; ) {
      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }
    if (position < 0)
      return this;
    if (list.length === 1) {
      list[0] = void 0;
      if (--this._eventsCount === 0) {
        this._events = new EventHandlers();
        return this;
      } else {
        delete events[type];
      }
    } else {
      spliceOne(list, position);
    }
    if (events.removeListener)
      this.emit("removeListener", type, originalListener || listener);
  }
  return this;
};
EventEmitter.prototype.off = function(type, listener) {
  return this.removeListener(type, listener);
};
EventEmitter.prototype.removeAllListeners = function removeAllListeners2(type) {
  var listeners2, events;
  events = this._events;
  if (!events)
    return this;
  if (!events.removeListener) {
    if (arguments.length === 0) {
      this._events = new EventHandlers();
      this._eventsCount = 0;
    } else if (events[type]) {
      if (--this._eventsCount === 0)
        this._events = new EventHandlers();
      else
        delete events[type];
    }
    return this;
  }
  if (arguments.length === 0) {
    var keys2 = Object.keys(events);
    for (var i = 0, key; i < keys2.length; ++i) {
      key = keys2[i];
      if (key === "removeListener") continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners("removeListener");
    this._events = new EventHandlers();
    this._eventsCount = 0;
    return this;
  }
  listeners2 = events[type];
  if (typeof listeners2 === "function") {
    this.removeListener(type, listeners2);
  } else if (listeners2) {
    do {
      this.removeListener(type, listeners2[listeners2.length - 1]);
    } while (listeners2[0]);
  }
  return this;
};
EventEmitter.prototype.listeners = function listeners(type) {
  var evlistener;
  var ret;
  var events = this._events;
  if (!events)
    ret = [];
  else {
    evlistener = events[type];
    if (!evlistener)
      ret = [];
    else if (typeof evlistener === "function")
      ret = [evlistener.listener || evlistener];
    else
      ret = unwrapListeners(evlistener);
  }
  return ret;
};
EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === "function") {
    return emitter.listenerCount(type);
  } else {
    return listenerCount$1.call(emitter, type);
  }
};
EventEmitter.prototype.listenerCount = listenerCount$1;
function listenerCount$1(type) {
  var events = this._events;
  if (events) {
    var evlistener = events[type];
    if (typeof evlistener === "function") {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }
  return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}
function arrayClone(arr, i) {
  var copy2 = new Array(i);
  while (i--)
    copy2[i] = arr[i];
  return copy2;
}
function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}
var _polyfillNode_events = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  EventEmitter,
  default: EventEmitter
});
var require$$0 = /* @__PURE__ */ getAugmentedNamespace(_polyfillNode_events);
var streamBrowser;
var hasRequiredStreamBrowser;
function requireStreamBrowser() {
  if (hasRequiredStreamBrowser) return streamBrowser;
  hasRequiredStreamBrowser = 1;
  streamBrowser = require$$0.EventEmitter;
  return streamBrowser;
}
var inherits$b;
if (typeof Object.create === "function") {
  inherits$b = function inherits2(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  inherits$b = function inherits2(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function() {
    };
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}
var inherits$c = inherits$b;
var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
  var keys2 = Object.keys(obj);
  var descriptors = {};
  for (var i = 0; i < keys2.length; i++) {
    descriptors[keys2[i]] = Object.getOwnPropertyDescriptor(obj, keys2[i]);
  }
  return descriptors;
};
var formatRegExp = /%[sdj%]/g;
function format(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect2(arguments[i]));
    }
    return objects.join(" ");
  }
  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x2) {
    if (x2 === "%%") return "%";
    if (i >= len) return x2;
    switch (x2) {
      case "%s":
        return String(args[i++]);
      case "%d":
        return Number(args[i++]);
      case "%j":
        try {
          return JSON.stringify(args[i++]);
        } catch (_2) {
          return "[Circular]";
        }
      default:
        return x2;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += " " + x;
    } else {
      str += " " + inspect2(x);
    }
  }
  return str;
}
function deprecate(fn, msg) {
  if (isUndefined(global$1.process)) {
    return function() {
      return deprecate(fn, msg).apply(this, arguments);
    };
  }
  if (browser$1$1.noDeprecation === true) {
    return fn;
  }
  var warned = false;
  function deprecated() {
    if (!warned) {
      if (browser$1$1.throwDeprecation) {
        throw new Error(msg);
      } else if (browser$1$1.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }
  return deprecated;
}
var debugs = {};
var debugEnviron;
function debuglog(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = browser$1$1.env.NODE_DEBUG || "";
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
      var pid = 0;
      debugs[set] = function() {
        var msg = format.apply(null, arguments);
        console.error("%s %d: %s", set, pid, msg);
      };
    } else {
      debugs[set] = function() {
      };
    }
  }
  return debugs[set];
}
function inspect2(obj, opts) {
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    ctx.showHidden = opts;
  } else if (opts) {
    _extend(ctx, opts);
  }
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
inspect2.colors = {
  "bold": [1, 22],
  "italic": [3, 23],
  "underline": [4, 24],
  "inverse": [7, 27],
  "white": [37, 39],
  "grey": [90, 39],
  "black": [30, 39],
  "blue": [34, 39],
  "cyan": [36, 39],
  "green": [32, 39],
  "magenta": [35, 39],
  "red": [31, 39],
  "yellow": [33, 39]
};
inspect2.styles = {
  "special": "cyan",
  "number": "yellow",
  "boolean": "yellow",
  "undefined": "grey",
  "null": "bold",
  "string": "green",
  "date": "magenta",
  // "name": intentionally not styling
  "regexp": "red"
};
function stylizeWithColor(str, styleType) {
  var style = inspect2.styles[styleType];
  if (style) {
    return "\x1B[" + inspect2.colors[style][0] + "m" + str + "\x1B[" + inspect2.colors[style][1] + "m";
  } else {
    return str;
  }
}
function stylizeNoColor(str, styleType) {
  return str;
}
function arrayToHash(array) {
  var hash2 = {};
  array.forEach(function(val, idx) {
    hash2[val] = true;
  });
  return hash2;
}
function formatValue(ctx, value, recurseTimes) {
  if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
  value.inspect !== inspect2 && // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }
  var keys2 = Object.keys(value);
  var visibleKeys = arrayToHash(keys2);
  if (ctx.showHidden) {
    keys2 = Object.getOwnPropertyNames(value);
  }
  if (isError(value) && (keys2.indexOf("message") >= 0 || keys2.indexOf("description") >= 0)) {
    return formatError(value);
  }
  if (keys2.length === 0) {
    if (isFunction(value)) {
      var name2 = value.name ? ": " + value.name : "";
      return ctx.stylize("[Function" + name2 + "]", "special");
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), "date");
    }
    if (isError(value)) {
      return formatError(value);
    }
  }
  var base = "", array = false, braces = ["{", "}"];
  if (isArray(value)) {
    array = true;
    braces = ["[", "]"];
  }
  if (isFunction(value)) {
    var n = value.name ? ": " + value.name : "";
    base = " [Function" + n + "]";
  }
  if (isRegExp(value)) {
    base = " " + RegExp.prototype.toString.call(value);
  }
  if (isDate(value)) {
    base = " " + Date.prototype.toUTCString.call(value);
  }
  if (isError(value)) {
    base = " " + formatError(value);
  }
  if (keys2.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }
  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
    } else {
      return ctx.stylize("[Object]", "special");
    }
  }
  ctx.seen.push(value);
  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys2);
  } else {
    output = keys2.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }
  ctx.seen.pop();
  return reduceToSingleString(output, base, braces);
}
function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize("undefined", "undefined");
  if (isString(value)) {
    var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
    return ctx.stylize(simple, "string");
  }
  if (isNumber(value))
    return ctx.stylize("" + value, "number");
  if (isBoolean(value))
    return ctx.stylize("" + value, "boolean");
  if (isNull(value))
    return ctx.stylize("null", "null");
}
function formatError(value) {
  return "[" + Error.prototype.toString.call(value) + "]";
}
function formatArray(ctx, value, recurseTimes, visibleKeys, keys2) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(
        ctx,
        value,
        recurseTimes,
        visibleKeys,
        String(i),
        true
      ));
    } else {
      output.push("");
    }
  }
  keys2.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(
        ctx,
        value,
        recurseTimes,
        visibleKeys,
        key,
        true
      ));
    }
  });
  return output;
}
function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name2, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize("[Getter/Setter]", "special");
    } else {
      str = ctx.stylize("[Getter]", "special");
    }
  } else {
    if (desc.set) {
      str = ctx.stylize("[Setter]", "special");
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name2 = "[" + key + "]";
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf("\n") > -1) {
        if (array) {
          str = str.split("\n").map(function(line) {
            return "  " + line;
          }).join("\n").substr(2);
        } else {
          str = "\n" + str.split("\n").map(function(line) {
            return "   " + line;
          }).join("\n");
        }
      }
    } else {
      str = ctx.stylize("[Circular]", "special");
    }
  }
  if (isUndefined(name2)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name2 = JSON.stringify("" + key);
    if (name2.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name2 = name2.substr(1, name2.length - 2);
      name2 = ctx.stylize(name2, "name");
    } else {
      name2 = name2.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name2 = ctx.stylize(name2, "string");
    }
  }
  return name2 + ": " + str;
}
function reduceToSingleString(output, base, braces) {
  var length = output.reduce(function(prev, cur) {
    if (cur.indexOf("\n") >= 0) ;
    return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
  }, 0);
  if (length > 60) {
    return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
  }
  return braces[0] + base + " " + output.join(", ") + " " + braces[1];
}
function isArray(ar) {
  return Array.isArray(ar);
}
function isBoolean(arg) {
  return typeof arg === "boolean";
}
function isNull(arg) {
  return arg === null;
}
function isNullOrUndefined(arg) {
  return arg == null;
}
function isNumber(arg) {
  return typeof arg === "number";
}
function isString(arg) {
  return typeof arg === "string";
}
function isSymbol(arg) {
  return typeof arg === "symbol";
}
function isUndefined(arg) {
  return arg === void 0;
}
function isRegExp(re) {
  return isObject(re) && objectToString(re) === "[object RegExp]";
}
function isObject(arg) {
  return typeof arg === "object" && arg !== null;
}
function isDate(d) {
  return isObject(d) && objectToString(d) === "[object Date]";
}
function isError(e) {
  return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
}
function isFunction(arg) {
  return typeof arg === "function";
}
function isPrimitive(arg) {
  return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
  typeof arg === "undefined";
}
function isBuffer(maybeBuf) {
  return Buffer$b.isBuffer(maybeBuf);
}
function objectToString(o) {
  return Object.prototype.toString.call(o);
}
function pad(n) {
  return n < 10 ? "0" + n.toString(10) : n.toString(10);
}
var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
function timestamp() {
  var d = /* @__PURE__ */ new Date();
  var time = [
    pad(d.getHours()),
    pad(d.getMinutes()),
    pad(d.getSeconds())
  ].join(":");
  return [d.getDate(), months[d.getMonth()], time].join(" ");
}
function log() {
  console.log("%s - %s", timestamp(), format.apply(null, arguments));
}
function _extend(origin, add) {
  if (!add || !isObject(add)) return origin;
  var keys2 = Object.keys(add);
  var i = keys2.length;
  while (i--) {
    origin[keys2[i]] = add[keys2[i]];
  }
  return origin;
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
function promisify(original) {
  if (typeof original !== "function")
    throw new TypeError('The "original" argument must be of type Function');
  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== "function") {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn,
      enumerable: false,
      writable: false,
      configurable: true
    });
    return fn;
  }
  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function(resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function(err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });
    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }
    return promise;
  }
  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn,
    enumerable: false,
    writable: false,
    configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}
promisify.custom = kCustomPromisifiedSymbol;
function callbackifyOnRejected(reason, cb) {
  if (!reason) {
    var newReason = new Error("Promise was rejected with a falsy value");
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}
function callbackify(original) {
  if (typeof original !== "function") {
    throw new TypeError('The "original" argument must be of type Function');
  }
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    var maybeCb = args.pop();
    if (typeof maybeCb !== "function") {
      throw new TypeError("The last argument must be of type Function");
    }
    var self2 = this;
    var cb = function() {
      return maybeCb.apply(self2, arguments);
    };
    original.apply(this, args).then(
      function(ret) {
        browser$1$1.nextTick(cb.bind(null, null, ret));
      },
      function(rej) {
        browser$1$1.nextTick(callbackifyOnRejected.bind(null, rej, cb));
      }
    );
  }
  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
  return callbackified;
}
var _polyfillNode_util = {
  inherits: inherits$c,
  _extend,
  log,
  isBuffer,
  isPrimitive,
  isFunction,
  isError,
  isDate,
  isObject,
  isRegExp,
  isUndefined,
  isSymbol,
  isString,
  isNumber,
  isNullOrUndefined,
  isNull,
  isBoolean,
  isArray,
  inspect: inspect2,
  deprecate,
  format,
  debuglog,
  promisify,
  callbackify
};
var _polyfillNode_util$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  _extend,
  callbackify,
  debuglog,
  default: _polyfillNode_util,
  deprecate,
  format,
  inherits: inherits$c,
  inspect: inspect2,
  isArray,
  isBoolean,
  isBuffer,
  isDate,
  isError,
  isFunction,
  isNull,
  isNullOrUndefined,
  isNumber,
  isObject,
  isPrimitive,
  isRegExp,
  isString,
  isSymbol,
  isUndefined,
  log,
  promisify
});
var require$$3 = /* @__PURE__ */ getAugmentedNamespace(_polyfillNode_util$1);
var buffer_list;
var hasRequiredBuffer_list;
function requireBuffer_list() {
  if (hasRequiredBuffer_list) return buffer_list;
  hasRequiredBuffer_list = 1;
  function ownKeys(object, enumerableOnly) {
    var keys2 = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys2.push.apply(keys2, symbols);
    }
    return keys2;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _classCallCheck2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass2(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint);
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(input);
  }
  var _require = require$$3$1, Buffer2 = _require.Buffer;
  var _require2 = require$$3, inspect3 = _require2.inspect;
  var custom = inspect3 && inspect3.custom || "inspect";
  function copyBuffer(src, target, offset) {
    Buffer2.prototype.copy.call(src, target, offset);
  }
  buffer_list = /* @__PURE__ */ (function() {
    function BufferList2() {
      _classCallCheck2(this, BufferList2);
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
    _createClass2(BufferList2, [{
      key: "push",
      value: function push(v) {
        var entry = {
          data: v,
          next: null
        };
        if (this.length > 0) this.tail.next = entry;
        else this.head = entry;
        this.tail = entry;
        ++this.length;
      }
    }, {
      key: "unshift",
      value: function unshift(v) {
        var entry = {
          data: v,
          next: this.head
        };
        if (this.length === 0) this.tail = entry;
        this.head = entry;
        ++this.length;
      }
    }, {
      key: "shift",
      value: function shift() {
        if (this.length === 0) return;
        var ret = this.head.data;
        if (this.length === 1) this.head = this.tail = null;
        else this.head = this.head.next;
        --this.length;
        return ret;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.head = this.tail = null;
        this.length = 0;
      }
    }, {
      key: "join",
      value: function join(s) {
        if (this.length === 0) return "";
        var p = this.head;
        var ret = "" + p.data;
        while (p = p.next) ret += s + p.data;
        return ret;
      }
    }, {
      key: "concat",
      value: function concat2(n) {
        if (this.length === 0) return Buffer2.alloc(0);
        var ret = Buffer2.allocUnsafe(n >>> 0);
        var p = this.head;
        var i = 0;
        while (p) {
          copyBuffer(p.data, ret, i);
          i += p.data.length;
          p = p.next;
        }
        return ret;
      }
      // Consumes a specified amount of bytes or characters from the buffered data.
    }, {
      key: "consume",
      value: function consume(n, hasStrings) {
        var ret;
        if (n < this.head.data.length) {
          ret = this.head.data.slice(0, n);
          this.head.data = this.head.data.slice(n);
        } else if (n === this.head.data.length) {
          ret = this.shift();
        } else {
          ret = hasStrings ? this._getString(n) : this._getBuffer(n);
        }
        return ret;
      }
    }, {
      key: "first",
      value: function first() {
        return this.head.data;
      }
      // Consumes a specified amount of characters from the buffered data.
    }, {
      key: "_getString",
      value: function _getString(n) {
        var p = this.head;
        var c = 1;
        var ret = p.data;
        n -= ret.length;
        while (p = p.next) {
          var str = p.data;
          var nb = n > str.length ? str.length : n;
          if (nb === str.length) ret += str;
          else ret += str.slice(0, n);
          n -= nb;
          if (n === 0) {
            if (nb === str.length) {
              ++c;
              if (p.next) this.head = p.next;
              else this.head = this.tail = null;
            } else {
              this.head = p;
              p.data = str.slice(nb);
            }
            break;
          }
          ++c;
        }
        this.length -= c;
        return ret;
      }
      // Consumes a specified amount of bytes from the buffered data.
    }, {
      key: "_getBuffer",
      value: function _getBuffer(n) {
        var ret = Buffer2.allocUnsafe(n);
        var p = this.head;
        var c = 1;
        p.data.copy(ret);
        n -= p.data.length;
        while (p = p.next) {
          var buf = p.data;
          var nb = n > buf.length ? buf.length : n;
          buf.copy(ret, ret.length - n, 0, nb);
          n -= nb;
          if (n === 0) {
            if (nb === buf.length) {
              ++c;
              if (p.next) this.head = p.next;
              else this.head = this.tail = null;
            } else {
              this.head = p;
              p.data = buf.slice(nb);
            }
            break;
          }
          ++c;
        }
        this.length -= c;
        return ret;
      }
      // Make sure the linked list only shows the minimal necessary information.
    }, {
      key: custom,
      value: function value(_2, options) {
        return inspect3(this, _objectSpread(_objectSpread({}, options), {}, {
          // Only inspect one level.
          depth: 0,
          // It should not recurse.
          customInspect: false
        }));
      }
    }]);
    return BufferList2;
  })();
  return buffer_list;
}
var destroy_1;
var hasRequiredDestroy;
function requireDestroy() {
  if (hasRequiredDestroy) return destroy_1;
  hasRequiredDestroy = 1;
  function destroy(err, cb) {
    var _this = this;
    var readableDestroyed = this._readableState && this._readableState.destroyed;
    var writableDestroyed = this._writableState && this._writableState.destroyed;
    if (readableDestroyed || writableDestroyed) {
      if (cb) {
        cb(err);
      } else if (err) {
        if (!this._writableState) {
          browser$1$1.nextTick(emitErrorNT, this, err);
        } else if (!this._writableState.errorEmitted) {
          this._writableState.errorEmitted = true;
          browser$1$1.nextTick(emitErrorNT, this, err);
        }
      }
      return this;
    }
    if (this._readableState) {
      this._readableState.destroyed = true;
    }
    if (this._writableState) {
      this._writableState.destroyed = true;
    }
    this._destroy(err || null, function(err2) {
      if (!cb && err2) {
        if (!_this._writableState) {
          browser$1$1.nextTick(emitErrorAndCloseNT, _this, err2);
        } else if (!_this._writableState.errorEmitted) {
          _this._writableState.errorEmitted = true;
          browser$1$1.nextTick(emitErrorAndCloseNT, _this, err2);
        } else {
          browser$1$1.nextTick(emitCloseNT, _this);
        }
      } else if (cb) {
        browser$1$1.nextTick(emitCloseNT, _this);
        cb(err2);
      } else {
        browser$1$1.nextTick(emitCloseNT, _this);
      }
    });
    return this;
  }
  function emitErrorAndCloseNT(self2, err) {
    emitErrorNT(self2, err);
    emitCloseNT(self2);
  }
  function emitCloseNT(self2) {
    if (self2._writableState && !self2._writableState.emitClose) return;
    if (self2._readableState && !self2._readableState.emitClose) return;
    self2.emit("close");
  }
  function undestroy() {
    if (this._readableState) {
      this._readableState.destroyed = false;
      this._readableState.reading = false;
      this._readableState.ended = false;
      this._readableState.endEmitted = false;
    }
    if (this._writableState) {
      this._writableState.destroyed = false;
      this._writableState.ended = false;
      this._writableState.ending = false;
      this._writableState.finalCalled = false;
      this._writableState.prefinished = false;
      this._writableState.finished = false;
      this._writableState.errorEmitted = false;
    }
  }
  function emitErrorNT(self2, err) {
    self2.emit("error", err);
  }
  function errorOrDestroy(stream, err) {
    var rState = stream._readableState;
    var wState = stream._writableState;
    if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);
    else stream.emit("error", err);
  }
  destroy_1 = {
    destroy,
    undestroy,
    errorOrDestroy
  };
  return destroy_1;
}
var errorsBrowser = {};
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
var codes = {};
function createErrorType(code, message, Base2) {
  if (!Base2) {
    Base2 = Error;
  }
  function getMessage(arg1, arg2, arg3) {
    if (typeof message === "string") {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }
  var NodeError = /* @__PURE__ */ (function(_Base) {
    _inheritsLoose(NodeError2, _Base);
    function NodeError2(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }
    return NodeError2;
  })(Base2);
  NodeError.prototype.name = Base2.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
}
function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function(i) {
      return String(i);
    });
    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
}
function startsWith(str, search, pos) {
  return str.substr(0, search.length) === search;
}
function endsWith(str, search, this_len) {
  if (this_len === void 0 || this_len > str.length) {
    this_len = str.length;
  }
  return str.substring(this_len - search.length, this_len) === search;
}
function includes2(str, search, start) {
  if (typeof start !== "number") {
    start = 0;
  }
  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}
createErrorType("ERR_INVALID_OPT_VALUE", function(name2, value) {
  return 'The value "' + value + '" is invalid for option "' + name2 + '"';
}, TypeError);
createErrorType("ERR_INVALID_ARG_TYPE", function(name2, expected, actual) {
  var determiner;
  if (typeof expected === "string" && startsWith(expected, "not ")) {
    determiner = "must not be";
    expected = expected.replace(/^not /, "");
  } else {
    determiner = "must be";
  }
  var msg;
  if (endsWith(name2, " argument")) {
    msg = "The ".concat(name2, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
  } else {
    var type = includes2(name2, ".") ? "property" : "argument";
    msg = 'The "'.concat(name2, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
  }
  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name2) {
  return "The " + name2 + " method is not implemented";
});
createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
createErrorType("ERR_STREAM_DESTROYED", function(name2) {
  return "Cannot call " + name2 + " after a stream was destroyed";
});
createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
  return "Unknown encoding: " + arg;
}, TypeError);
createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
errorsBrowser.codes = codes;
var state;
var hasRequiredState;
function requireState() {
  if (hasRequiredState) return state;
  hasRequiredState = 1;
  var ERR_INVALID_OPT_VALUE = errorsBrowser.codes.ERR_INVALID_OPT_VALUE;
  function highWaterMarkFrom(options, isDuplex, duplexKey) {
    return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
  }
  function getHighWaterMark(state2, options, duplexKey, isDuplex) {
    var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
    if (hwm != null) {
      if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
        var name2 = isDuplex ? duplexKey : "highWaterMark";
        throw new ERR_INVALID_OPT_VALUE(name2, hwm);
      }
      return Math.floor(hwm);
    }
    return state2.objectMode ? 16 : 16 * 1024;
  }
  state = {
    getHighWaterMark
  };
  return state;
}
var browser$1;
var hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser) return browser$1;
  hasRequiredBrowser = 1;
  browser$1 = deprecate2;
  function deprecate2(fn, msg) {
    if (config2("noDeprecation")) {
      return fn;
    }
    var warned = false;
    function deprecated() {
      if (!warned) {
        if (config2("throwDeprecation")) {
          throw new Error(msg);
        } else if (config2("traceDeprecation")) {
          console.trace(msg);
        } else {
          console.warn(msg);
        }
        warned = true;
      }
      return fn.apply(this, arguments);
    }
    return deprecated;
  }
  function config2(name2) {
    try {
      if (!commonjsGlobal.localStorage) return false;
    } catch (_2) {
      return false;
    }
    var val = commonjsGlobal.localStorage[name2];
    if (null == val) return false;
    return String(val).toLowerCase() === "true";
  }
  return browser$1;
}
var _stream_writable;
var hasRequired_stream_writable;
function require_stream_writable() {
  if (hasRequired_stream_writable) return _stream_writable;
  hasRequired_stream_writable = 1;
  _stream_writable = Writable2;
  function CorkedRequest2(state2) {
    var _this = this;
    this.next = null;
    this.entry = null;
    this.finish = function() {
      onCorkedFinish(_this, state2);
    };
  }
  var Duplex2;
  Writable2.WritableState = WritableState2;
  var internalUtil = {
    deprecate: requireBrowser()
  };
  var Stream2 = requireStreamBrowser();
  var Buffer2 = require$$3$1.Buffer;
  var OurUint8Array = (typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
  };
  function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk);
  }
  function _isUint8Array(obj) {
    return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
  }
  var destroyImpl = requireDestroy();
  var _require = requireState(), getHighWaterMark = _require.getHighWaterMark;
  var _require$codes2 = errorsBrowser.codes, ERR_INVALID_ARG_TYPE = _require$codes2.ERR_INVALID_ARG_TYPE, ERR_METHOD_NOT_IMPLEMENTED2 = _require$codes2.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK2 = _require$codes2.ERR_MULTIPLE_CALLBACK, ERR_STREAM_CANNOT_PIPE = _require$codes2.ERR_STREAM_CANNOT_PIPE, ERR_STREAM_DESTROYED2 = _require$codes2.ERR_STREAM_DESTROYED, ERR_STREAM_NULL_VALUES = _require$codes2.ERR_STREAM_NULL_VALUES, ERR_STREAM_WRITE_AFTER_END = _require$codes2.ERR_STREAM_WRITE_AFTER_END, ERR_UNKNOWN_ENCODING = _require$codes2.ERR_UNKNOWN_ENCODING;
  var errorOrDestroy = destroyImpl.errorOrDestroy;
  require$$0$1(Writable2, Stream2);
  function nop2() {
  }
  function WritableState2(options, stream, isDuplex) {
    Duplex2 = Duplex2 || require_stream_duplex();
    options = options || {};
    if (typeof isDuplex !== "boolean") isDuplex = stream instanceof Duplex2;
    this.objectMode = !!options.objectMode;
    if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
    this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
    this.finalCalled = false;
    this.needDrain = false;
    this.ending = false;
    this.ended = false;
    this.finished = false;
    this.destroyed = false;
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.length = 0;
    this.writing = false;
    this.corked = 0;
    this.sync = true;
    this.bufferProcessing = false;
    this.onwrite = function(er) {
      onwrite2(stream, er);
    };
    this.writecb = null;
    this.writelen = 0;
    this.bufferedRequest = null;
    this.lastBufferedRequest = null;
    this.pendingcb = 0;
    this.prefinished = false;
    this.errorEmitted = false;
    this.emitClose = options.emitClose !== false;
    this.autoDestroy = !!options.autoDestroy;
    this.bufferedRequestCount = 0;
    this.corkedRequestsFree = new CorkedRequest2(this);
  }
  WritableState2.prototype.getBuffer = function getBuffer() {
    var current = this.bufferedRequest;
    var out = [];
    while (current) {
      out.push(current);
      current = current.next;
    }
    return out;
  };
  (function() {
    try {
      Object.defineProperty(WritableState2.prototype, "buffer", {
        get: internalUtil.deprecate(function writableStateBufferGetter() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch (_2) {
    }
  })();
  var realHasInstance;
  if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
    realHasInstance = Function.prototype[Symbol.hasInstance];
    Object.defineProperty(Writable2, Symbol.hasInstance, {
      value: function value(object) {
        if (realHasInstance.call(this, object)) return true;
        if (this !== Writable2) return false;
        return object && object._writableState instanceof WritableState2;
      }
    });
  } else {
    realHasInstance = function realHasInstance2(object) {
      return object instanceof this;
    };
  }
  function Writable2(options) {
    Duplex2 = Duplex2 || require_stream_duplex();
    var isDuplex = this instanceof Duplex2;
    if (!isDuplex && !realHasInstance.call(Writable2, this)) return new Writable2(options);
    this._writableState = new WritableState2(options, this, isDuplex);
    this.writable = true;
    if (options) {
      if (typeof options.write === "function") this._write = options.write;
      if (typeof options.writev === "function") this._writev = options.writev;
      if (typeof options.destroy === "function") this._destroy = options.destroy;
      if (typeof options.final === "function") this._final = options.final;
    }
    Stream2.call(this);
  }
  Writable2.prototype.pipe = function() {
    errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
  };
  function writeAfterEnd2(stream, cb) {
    var er = new ERR_STREAM_WRITE_AFTER_END();
    errorOrDestroy(stream, er);
    browser$1$1.nextTick(cb, er);
  }
  function validChunk2(stream, state2, chunk, cb) {
    var er;
    if (chunk === null) {
      er = new ERR_STREAM_NULL_VALUES();
    } else if (typeof chunk !== "string" && !state2.objectMode) {
      er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
    }
    if (er) {
      errorOrDestroy(stream, er);
      browser$1$1.nextTick(cb, er);
      return false;
    }
    return true;
  }
  Writable2.prototype.write = function(chunk, encoding, cb) {
    var state2 = this._writableState;
    var ret = false;
    var isBuf = !state2.objectMode && _isUint8Array(chunk);
    if (isBuf && !Buffer2.isBuffer(chunk)) {
      chunk = _uint8ArrayToBuffer(chunk);
    }
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    if (isBuf) encoding = "buffer";
    else if (!encoding) encoding = state2.defaultEncoding;
    if (typeof cb !== "function") cb = nop2;
    if (state2.ending) writeAfterEnd2(this, cb);
    else if (isBuf || validChunk2(this, state2, chunk, cb)) {
      state2.pendingcb++;
      ret = writeOrBuffer2(this, state2, isBuf, chunk, encoding, cb);
    }
    return ret;
  };
  Writable2.prototype.cork = function() {
    this._writableState.corked++;
  };
  Writable2.prototype.uncork = function() {
    var state2 = this._writableState;
    if (state2.corked) {
      state2.corked--;
      if (!state2.writing && !state2.corked && !state2.bufferProcessing && state2.bufferedRequest) clearBuffer2(this, state2);
    }
  };
  Writable2.prototype.setDefaultEncoding = function setDefaultEncoding2(encoding) {
    if (typeof encoding === "string") encoding = encoding.toLowerCase();
    if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
  };
  Object.defineProperty(Writable2.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function decodeChunk2(state2, chunk, encoding) {
    if (!state2.objectMode && state2.decodeStrings !== false && typeof chunk === "string") {
      chunk = Buffer2.from(chunk, encoding);
    }
    return chunk;
  }
  Object.defineProperty(Writable2.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._writableState.highWaterMark;
    }
  });
  function writeOrBuffer2(stream, state2, isBuf, chunk, encoding, cb) {
    if (!isBuf) {
      var newChunk = decodeChunk2(state2, chunk, encoding);
      if (chunk !== newChunk) {
        isBuf = true;
        encoding = "buffer";
        chunk = newChunk;
      }
    }
    var len = state2.objectMode ? 1 : chunk.length;
    state2.length += len;
    var ret = state2.length < state2.highWaterMark;
    if (!ret) state2.needDrain = true;
    if (state2.writing || state2.corked) {
      var last = state2.lastBufferedRequest;
      state2.lastBufferedRequest = {
        chunk,
        encoding,
        isBuf,
        callback: cb,
        next: null
      };
      if (last) {
        last.next = state2.lastBufferedRequest;
      } else {
        state2.bufferedRequest = state2.lastBufferedRequest;
      }
      state2.bufferedRequestCount += 1;
    } else {
      doWrite2(stream, state2, false, len, chunk, encoding, cb);
    }
    return ret;
  }
  function doWrite2(stream, state2, writev, len, chunk, encoding, cb) {
    state2.writelen = len;
    state2.writecb = cb;
    state2.writing = true;
    state2.sync = true;
    if (state2.destroyed) state2.onwrite(new ERR_STREAM_DESTROYED2("write"));
    else if (writev) stream._writev(chunk, state2.onwrite);
    else stream._write(chunk, encoding, state2.onwrite);
    state2.sync = false;
  }
  function onwriteError2(stream, state2, sync, er, cb) {
    --state2.pendingcb;
    if (sync) {
      browser$1$1.nextTick(cb, er);
      browser$1$1.nextTick(finishMaybe2, stream, state2);
      stream._writableState.errorEmitted = true;
      errorOrDestroy(stream, er);
    } else {
      cb(er);
      stream._writableState.errorEmitted = true;
      errorOrDestroy(stream, er);
      finishMaybe2(stream, state2);
    }
  }
  function onwriteStateUpdate2(state2) {
    state2.writing = false;
    state2.writecb = null;
    state2.length -= state2.writelen;
    state2.writelen = 0;
  }
  function onwrite2(stream, er) {
    var state2 = stream._writableState;
    var sync = state2.sync;
    var cb = state2.writecb;
    if (typeof cb !== "function") throw new ERR_MULTIPLE_CALLBACK2();
    onwriteStateUpdate2(state2);
    if (er) onwriteError2(stream, state2, sync, er, cb);
    else {
      var finished = needFinish2(state2) || stream.destroyed;
      if (!finished && !state2.corked && !state2.bufferProcessing && state2.bufferedRequest) {
        clearBuffer2(stream, state2);
      }
      if (sync) {
        browser$1$1.nextTick(afterWrite2, stream, state2, finished, cb);
      } else {
        afterWrite2(stream, state2, finished, cb);
      }
    }
  }
  function afterWrite2(stream, state2, finished, cb) {
    if (!finished) onwriteDrain2(stream, state2);
    state2.pendingcb--;
    cb();
    finishMaybe2(stream, state2);
  }
  function onwriteDrain2(stream, state2) {
    if (state2.length === 0 && state2.needDrain) {
      state2.needDrain = false;
      stream.emit("drain");
    }
  }
  function clearBuffer2(stream, state2) {
    state2.bufferProcessing = true;
    var entry = state2.bufferedRequest;
    if (stream._writev && entry && entry.next) {
      var l = state2.bufferedRequestCount;
      var buffer = new Array(l);
      var holder2 = state2.corkedRequestsFree;
      holder2.entry = entry;
      var count = 0;
      var allBuffers = true;
      while (entry) {
        buffer[count] = entry;
        if (!entry.isBuf) allBuffers = false;
        entry = entry.next;
        count += 1;
      }
      buffer.allBuffers = allBuffers;
      doWrite2(stream, state2, true, state2.length, buffer, "", holder2.finish);
      state2.pendingcb++;
      state2.lastBufferedRequest = null;
      if (holder2.next) {
        state2.corkedRequestsFree = holder2.next;
        holder2.next = null;
      } else {
        state2.corkedRequestsFree = new CorkedRequest2(state2);
      }
      state2.bufferedRequestCount = 0;
    } else {
      while (entry) {
        var chunk = entry.chunk;
        var encoding = entry.encoding;
        var cb = entry.callback;
        var len = state2.objectMode ? 1 : chunk.length;
        doWrite2(stream, state2, false, len, chunk, encoding, cb);
        entry = entry.next;
        state2.bufferedRequestCount--;
        if (state2.writing) {
          break;
        }
      }
      if (entry === null) state2.lastBufferedRequest = null;
    }
    state2.bufferedRequest = entry;
    state2.bufferProcessing = false;
  }
  Writable2.prototype._write = function(chunk, encoding, cb) {
    cb(new ERR_METHOD_NOT_IMPLEMENTED2("_write()"));
  };
  Writable2.prototype._writev = null;
  Writable2.prototype.end = function(chunk, encoding, cb) {
    var state2 = this._writableState;
    if (typeof chunk === "function") {
      cb = chunk;
      chunk = null;
      encoding = null;
    } else if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    if (chunk !== null && chunk !== void 0) this.write(chunk, encoding);
    if (state2.corked) {
      state2.corked = 1;
      this.uncork();
    }
    if (!state2.ending) endWritable2(this, state2, cb);
    return this;
  };
  Object.defineProperty(Writable2.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._writableState.length;
    }
  });
  function needFinish2(state2) {
    return state2.ending && state2.length === 0 && state2.bufferedRequest === null && !state2.finished && !state2.writing;
  }
  function callFinal(stream, state2) {
    stream._final(function(err) {
      state2.pendingcb--;
      if (err) {
        errorOrDestroy(stream, err);
      }
      state2.prefinished = true;
      stream.emit("prefinish");
      finishMaybe2(stream, state2);
    });
  }
  function prefinish2(stream, state2) {
    if (!state2.prefinished && !state2.finalCalled) {
      if (typeof stream._final === "function" && !state2.destroyed) {
        state2.pendingcb++;
        state2.finalCalled = true;
        browser$1$1.nextTick(callFinal, stream, state2);
      } else {
        state2.prefinished = true;
        stream.emit("prefinish");
      }
    }
  }
  function finishMaybe2(stream, state2) {
    var need = needFinish2(state2);
    if (need) {
      prefinish2(stream, state2);
      if (state2.pendingcb === 0) {
        state2.finished = true;
        stream.emit("finish");
        if (state2.autoDestroy) {
          var rState = stream._readableState;
          if (!rState || rState.autoDestroy && rState.endEmitted) {
            stream.destroy();
          }
        }
      }
    }
    return need;
  }
  function endWritable2(stream, state2, cb) {
    state2.ending = true;
    finishMaybe2(stream, state2);
    if (cb) {
      if (state2.finished) browser$1$1.nextTick(cb);
      else stream.once("finish", cb);
    }
    state2.ended = true;
    stream.writable = false;
  }
  function onCorkedFinish(corkReq, state2, err) {
    var entry = corkReq.entry;
    corkReq.entry = null;
    while (entry) {
      var cb = entry.callback;
      state2.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    state2.corkedRequestsFree.next = corkReq;
  }
  Object.defineProperty(Writable2.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      if (this._writableState === void 0) {
        return false;
      }
      return this._writableState.destroyed;
    },
    set: function set(value) {
      if (!this._writableState) {
        return;
      }
      this._writableState.destroyed = value;
    }
  });
  Writable2.prototype.destroy = destroyImpl.destroy;
  Writable2.prototype._undestroy = destroyImpl.undestroy;
  Writable2.prototype._destroy = function(err, cb) {
    cb(err);
  };
  return _stream_writable;
}
var _stream_duplex;
var hasRequired_stream_duplex;
function require_stream_duplex() {
  if (hasRequired_stream_duplex) return _stream_duplex;
  hasRequired_stream_duplex = 1;
  var objectKeys = Object.keys || function(obj) {
    var keys3 = [];
    for (var key in obj) keys3.push(key);
    return keys3;
  };
  _stream_duplex = Duplex2;
  var Readable2 = require_stream_readable();
  var Writable2 = require_stream_writable();
  require$$0$1(Duplex2, Readable2);
  {
    var keys2 = objectKeys(Writable2.prototype);
    for (var v = 0; v < keys2.length; v++) {
      var method = keys2[v];
      if (!Duplex2.prototype[method]) Duplex2.prototype[method] = Writable2.prototype[method];
    }
  }
  function Duplex2(options) {
    if (!(this instanceof Duplex2)) return new Duplex2(options);
    Readable2.call(this, options);
    Writable2.call(this, options);
    this.allowHalfOpen = true;
    if (options) {
      if (options.readable === false) this.readable = false;
      if (options.writable === false) this.writable = false;
      if (options.allowHalfOpen === false) {
        this.allowHalfOpen = false;
        this.once("end", onend2);
      }
    }
  }
  Object.defineProperty(Duplex2.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._writableState.highWaterMark;
    }
  });
  Object.defineProperty(Duplex2.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  Object.defineProperty(Duplex2.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._writableState.length;
    }
  });
  function onend2() {
    if (this._writableState.ended) return;
    browser$1$1.nextTick(onEndNT2, this);
  }
  function onEndNT2(self2) {
    self2.end();
  }
  Object.defineProperty(Duplex2.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      if (this._readableState === void 0 || this._writableState === void 0) {
        return false;
      }
      return this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function set(value) {
      if (this._readableState === void 0 || this._writableState === void 0) {
        return;
      }
      this._readableState.destroyed = value;
      this._writableState.destroyed = value;
    }
  });
  return _stream_duplex;
}
var isBufferEncoding = Buffer$b.isEncoding || function(encoding) {
  switch (encoding && encoding.toLowerCase()) {
    case "hex":
    case "utf8":
    case "utf-8":
    case "ascii":
    case "binary":
    case "base64":
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
    case "raw":
      return true;
    default:
      return false;
  }
};
function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error("Unknown encoding: " + encoding);
  }
}
function StringDecoder$1(encoding) {
  this.encoding = (encoding || "utf8").toLowerCase().replace(/[-_]/, "");
  assertEncoding(encoding);
  switch (this.encoding) {
    case "utf8":
      this.surrogateSize = 3;
      break;
    case "ucs2":
    case "utf16le":
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case "base64":
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }
  this.charBuffer = new Buffer$b(6);
  this.charReceived = 0;
  this.charLength = 0;
}
StringDecoder$1.prototype.write = function(buffer) {
  var charStr = "";
  while (this.charLength) {
    var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;
    if (this.charReceived < this.charLength) {
      return "";
    }
    buffer = buffer.slice(available, buffer.length);
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 55296 && charCode <= 56319) {
      this.charLength += this.surrogateSize;
      charStr = "";
      continue;
    }
    this.charReceived = this.charLength = 0;
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }
  this.detectIncompleteChar(buffer);
  var end = buffer.length;
  if (this.charLength) {
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }
  charStr += buffer.toString(this.encoding, 0, end);
  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  if (charCode >= 55296 && charCode <= 56319) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }
  return charStr;
};
StringDecoder$1.prototype.detectIncompleteChar = function(buffer) {
  var i = buffer.length >= 3 ? 3 : buffer.length;
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];
    if (i == 1 && c >> 5 == 6) {
      this.charLength = 2;
      break;
    }
    if (i <= 2 && c >> 4 == 14) {
      this.charLength = 3;
      break;
    }
    if (i <= 3 && c >> 3 == 30) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};
StringDecoder$1.prototype.end = function(buffer) {
  var res = "";
  if (buffer && buffer.length)
    res = this.write(buffer);
  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }
  return res;
};
function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}
function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}
function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}
var _polyfillNode_string_decoder = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  StringDecoder: StringDecoder$1
});
var require$$2 = /* @__PURE__ */ getAugmentedNamespace(_polyfillNode_string_decoder);
var ERR_STREAM_PREMATURE_CLOSE = errorsBrowser.codes.ERR_STREAM_PREMATURE_CLOSE;
function once$1(callback) {
  var called = false;
  return function() {
    if (called) return;
    called = true;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    callback.apply(this, args);
  };
}
function noop$1() {
}
function isRequest$1(stream) {
  return stream.setHeader && typeof stream.abort === "function";
}
function eos$1(stream, opts, callback) {
  if (typeof opts === "function") return eos$1(stream, null, opts);
  if (!opts) opts = {};
  callback = once$1(callback || noop$1);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;
  var onlegacyfinish = function onlegacyfinish2() {
    if (!stream.writable) onfinish();
  };
  var writableEnded = stream._writableState && stream._writableState.finished;
  var onfinish = function onfinish2() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };
  var readableEnded = stream._readableState && stream._readableState.endEmitted;
  var onend2 = function onend3() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };
  var onerror = function onerror2(err) {
    callback.call(stream, err);
  };
  var onclose = function onclose2() {
    var err;
    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };
  var onrequest = function onrequest2() {
    stream.req.on("finish", onfinish);
  };
  if (isRequest$1(stream)) {
    stream.on("complete", onfinish);
    stream.on("abort", onclose);
    if (stream.req) onrequest();
    else stream.on("request", onrequest);
  } else if (writable && !stream._writableState) {
    stream.on("end", onlegacyfinish);
    stream.on("close", onlegacyfinish);
  }
  stream.on("end", onend2);
  stream.on("finish", onfinish);
  if (opts.error !== false) stream.on("error", onerror);
  stream.on("close", onclose);
  return function() {
    stream.removeListener("complete", onfinish);
    stream.removeListener("abort", onclose);
    stream.removeListener("request", onrequest);
    if (stream.req) stream.req.removeListener("finish", onfinish);
    stream.removeListener("end", onlegacyfinish);
    stream.removeListener("close", onlegacyfinish);
    stream.removeListener("finish", onfinish);
    stream.removeListener("end", onend2);
    stream.removeListener("error", onerror);
    stream.removeListener("close", onclose);
  };
}
var endOfStream = eos$1;
endOfStream.default;
var async_iterator;
var hasRequiredAsync_iterator;
function requireAsync_iterator() {
  if (hasRequiredAsync_iterator) return async_iterator;
  hasRequiredAsync_iterator = 1;
  var _Object$setPrototypeO;
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint);
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  var finished = endOfStream;
  var kLastResolve = Symbol("lastResolve");
  var kLastReject = Symbol("lastReject");
  var kError = Symbol("error");
  var kEnded = Symbol("ended");
  var kLastPromise = Symbol("lastPromise");
  var kHandlePromise = Symbol("handlePromise");
  var kStream = Symbol("stream");
  function createIterResult(value, done2) {
    return {
      value,
      done: done2
    };
  }
  function readAndResolve(iter) {
    var resolve = iter[kLastResolve];
    if (resolve !== null) {
      var data = iter[kStream].read();
      if (data !== null) {
        iter[kLastPromise] = null;
        iter[kLastResolve] = null;
        iter[kLastReject] = null;
        resolve(createIterResult(data, false));
      }
    }
  }
  function onReadable(iter) {
    browser$1$1.nextTick(readAndResolve, iter);
  }
  function wrapForNext(lastPromise, iter) {
    return function(resolve, reject) {
      lastPromise.then(function() {
        if (iter[kEnded]) {
          resolve(createIterResult(void 0, true));
          return;
        }
        iter[kHandlePromise](resolve, reject);
      }, reject);
    };
  }
  var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
  });
  var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
    get stream() {
      return this[kStream];
    },
    next: function next() {
      var _this = this;
      var error = this[kError];
      if (error !== null) {
        return Promise.reject(error);
      }
      if (this[kEnded]) {
        return Promise.resolve(createIterResult(void 0, true));
      }
      if (this[kStream].destroyed) {
        return new Promise(function(resolve, reject) {
          browser$1$1.nextTick(function() {
            if (_this[kError]) {
              reject(_this[kError]);
            } else {
              resolve(createIterResult(void 0, true));
            }
          });
        });
      }
      var lastPromise = this[kLastPromise];
      var promise;
      if (lastPromise) {
        promise = new Promise(wrapForNext(lastPromise, this));
      } else {
        var data = this[kStream].read();
        if (data !== null) {
          return Promise.resolve(createIterResult(data, false));
        }
        promise = new Promise(this[kHandlePromise]);
      }
      this[kLastPromise] = promise;
      return promise;
    }
  }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
    return this;
  }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
    var _this2 = this;
    return new Promise(function(resolve, reject) {
      _this2[kStream].destroy(null, function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(createIterResult(void 0, true));
      });
    });
  }), _Object$setPrototypeO), AsyncIteratorPrototype);
  var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
    var _Object$create;
    var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
      value: stream,
      writable: true
    }), _defineProperty(_Object$create, kLastResolve, {
      value: null,
      writable: true
    }), _defineProperty(_Object$create, kLastReject, {
      value: null,
      writable: true
    }), _defineProperty(_Object$create, kError, {
      value: null,
      writable: true
    }), _defineProperty(_Object$create, kEnded, {
      value: stream._readableState.endEmitted,
      writable: true
    }), _defineProperty(_Object$create, kHandlePromise, {
      value: function value(resolve, reject) {
        var data = iterator[kStream].read();
        if (data) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve(createIterResult(data, false));
        } else {
          iterator[kLastResolve] = resolve;
          iterator[kLastReject] = reject;
        }
      },
      writable: true
    }), _Object$create));
    iterator[kLastPromise] = null;
    finished(stream, function(err) {
      if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var reject = iterator[kLastReject];
        if (reject !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          reject(err);
        }
        iterator[kError] = err;
        return;
      }
      var resolve = iterator[kLastResolve];
      if (resolve !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(void 0, true));
      }
      iterator[kEnded] = true;
    });
    stream.on("readable", onReadable.bind(null, iterator));
    return iterator;
  };
  async_iterator = createReadableStreamAsyncIterator;
  return async_iterator;
}
var fromBrowser;
var hasRequiredFromBrowser;
function requireFromBrowser() {
  if (hasRequiredFromBrowser) return fromBrowser;
  hasRequiredFromBrowser = 1;
  fromBrowser = function() {
    throw new Error("Readable.from is not available in the browser");
  };
  return fromBrowser;
}
var _stream_readable;
var hasRequired_stream_readable;
function require_stream_readable() {
  if (hasRequired_stream_readable) return _stream_readable;
  hasRequired_stream_readable = 1;
  _stream_readable = Readable2;
  var Duplex2;
  Readable2.ReadableState = ReadableState2;
  require$$0.EventEmitter;
  var EElistenerCount = function EElistenerCount2(emitter, type) {
    return emitter.listeners(type).length;
  };
  var Stream2 = requireStreamBrowser();
  var Buffer2 = require$$3$1.Buffer;
  var OurUint8Array = (typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
  };
  function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk);
  }
  function _isUint8Array(obj) {
    return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
  }
  var debugUtil = require$$3;
  var debug2;
  if (debugUtil && debugUtil.debuglog) {
    debug2 = debugUtil.debuglog("stream");
  } else {
    debug2 = function debug3() {
    };
  }
  var BufferList2 = requireBuffer_list();
  var destroyImpl = requireDestroy();
  var _require = requireState(), getHighWaterMark = _require.getHighWaterMark;
  var _require$codes2 = errorsBrowser.codes, ERR_INVALID_ARG_TYPE = _require$codes2.ERR_INVALID_ARG_TYPE, ERR_STREAM_PUSH_AFTER_EOF = _require$codes2.ERR_STREAM_PUSH_AFTER_EOF, ERR_METHOD_NOT_IMPLEMENTED2 = _require$codes2.ERR_METHOD_NOT_IMPLEMENTED, ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes2.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
  var StringDecoder2;
  var createReadableStreamAsyncIterator;
  var from2;
  require$$0$1(Readable2, Stream2);
  var errorOrDestroy = destroyImpl.errorOrDestroy;
  var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
  function prependListener3(emitter, event, fn) {
    if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);
    else emitter._events[event] = [fn, emitter._events[event]];
  }
  function ReadableState2(options, stream, isDuplex) {
    Duplex2 = Duplex2 || require_stream_duplex();
    options = options || {};
    if (typeof isDuplex !== "boolean") isDuplex = stream instanceof Duplex2;
    this.objectMode = !!options.objectMode;
    if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
    this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
    this.buffer = new BufferList2();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;
    this.sync = true;
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;
    this.paused = true;
    this.emitClose = options.emitClose !== false;
    this.autoDestroy = !!options.autoDestroy;
    this.destroyed = false;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.awaitDrain = 0;
    this.readingMore = false;
    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
      if (!StringDecoder2) StringDecoder2 = require$$2.StringDecoder;
      this.decoder = new StringDecoder2(options.encoding);
      this.encoding = options.encoding;
    }
  }
  function Readable2(options) {
    Duplex2 = Duplex2 || require_stream_duplex();
    if (!(this instanceof Readable2)) return new Readable2(options);
    var isDuplex = this instanceof Duplex2;
    this._readableState = new ReadableState2(options, this, isDuplex);
    this.readable = true;
    if (options) {
      if (typeof options.read === "function") this._read = options.read;
      if (typeof options.destroy === "function") this._destroy = options.destroy;
    }
    Stream2.call(this);
  }
  Object.defineProperty(Readable2.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      if (this._readableState === void 0) {
        return false;
      }
      return this._readableState.destroyed;
    },
    set: function set(value) {
      if (!this._readableState) {
        return;
      }
      this._readableState.destroyed = value;
    }
  });
  Readable2.prototype.destroy = destroyImpl.destroy;
  Readable2.prototype._undestroy = destroyImpl.undestroy;
  Readable2.prototype._destroy = function(err, cb) {
    cb(err);
  };
  Readable2.prototype.push = function(chunk, encoding) {
    var state2 = this._readableState;
    var skipChunkCheck;
    if (!state2.objectMode) {
      if (typeof chunk === "string") {
        encoding = encoding || state2.defaultEncoding;
        if (encoding !== state2.encoding) {
          chunk = Buffer2.from(chunk, encoding);
          encoding = "";
        }
        skipChunkCheck = true;
      }
    } else {
      skipChunkCheck = true;
    }
    return readableAddChunk2(this, chunk, encoding, false, skipChunkCheck);
  };
  Readable2.prototype.unshift = function(chunk) {
    return readableAddChunk2(this, chunk, null, true, false);
  };
  function readableAddChunk2(stream, chunk, encoding, addToFront, skipChunkCheck) {
    debug2("readableAddChunk", chunk);
    var state2 = stream._readableState;
    if (chunk === null) {
      state2.reading = false;
      onEofChunk2(stream, state2);
    } else {
      var er;
      if (!skipChunkCheck) er = chunkInvalid2(state2, chunk);
      if (er) {
        errorOrDestroy(stream, er);
      } else if (state2.objectMode || chunk && chunk.length > 0) {
        if (typeof chunk !== "string" && !state2.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
          chunk = _uint8ArrayToBuffer(chunk);
        }
        if (addToFront) {
          if (state2.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
          else addChunk(stream, state2, chunk, true);
        } else if (state2.ended) {
          errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
        } else if (state2.destroyed) {
          return false;
        } else {
          state2.reading = false;
          if (state2.decoder && !encoding) {
            chunk = state2.decoder.write(chunk);
            if (state2.objectMode || chunk.length !== 0) addChunk(stream, state2, chunk, false);
            else maybeReadMore2(stream, state2);
          } else {
            addChunk(stream, state2, chunk, false);
          }
        }
      } else if (!addToFront) {
        state2.reading = false;
        maybeReadMore2(stream, state2);
      }
    }
    return !state2.ended && (state2.length < state2.highWaterMark || state2.length === 0);
  }
  function addChunk(stream, state2, chunk, addToFront) {
    if (state2.flowing && state2.length === 0 && !state2.sync) {
      state2.awaitDrain = 0;
      stream.emit("data", chunk);
    } else {
      state2.length += state2.objectMode ? 1 : chunk.length;
      if (addToFront) state2.buffer.unshift(chunk);
      else state2.buffer.push(chunk);
      if (state2.needReadable) emitReadable2(stream);
    }
    maybeReadMore2(stream, state2);
  }
  function chunkInvalid2(state2, chunk) {
    var er;
    if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state2.objectMode) {
      er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
    }
    return er;
  }
  Readable2.prototype.isPaused = function() {
    return this._readableState.flowing === false;
  };
  Readable2.prototype.setEncoding = function(enc) {
    if (!StringDecoder2) StringDecoder2 = require$$2.StringDecoder;
    var decoder = new StringDecoder2(enc);
    this._readableState.decoder = decoder;
    this._readableState.encoding = this._readableState.decoder.encoding;
    var p = this._readableState.buffer.head;
    var content = "";
    while (p !== null) {
      content += decoder.write(p.data);
      p = p.next;
    }
    this._readableState.buffer.clear();
    if (content !== "") this._readableState.buffer.push(content);
    this._readableState.length = content.length;
    return this;
  };
  var MAX_HWM2 = 1073741824;
  function computeNewHighWaterMark2(n) {
    if (n >= MAX_HWM2) {
      n = MAX_HWM2;
    } else {
      n--;
      n |= n >>> 1;
      n |= n >>> 2;
      n |= n >>> 4;
      n |= n >>> 8;
      n |= n >>> 16;
      n++;
    }
    return n;
  }
  function howMuchToRead2(n, state2) {
    if (n <= 0 || state2.length === 0 && state2.ended) return 0;
    if (state2.objectMode) return 1;
    if (n !== n) {
      if (state2.flowing && state2.length) return state2.buffer.head.data.length;
      else return state2.length;
    }
    if (n > state2.highWaterMark) state2.highWaterMark = computeNewHighWaterMark2(n);
    if (n <= state2.length) return n;
    if (!state2.ended) {
      state2.needReadable = true;
      return 0;
    }
    return state2.length;
  }
  Readable2.prototype.read = function(n) {
    debug2("read", n);
    n = parseInt(n, 10);
    var state2 = this._readableState;
    var nOrig = n;
    if (n !== 0) state2.emittedReadable = false;
    if (n === 0 && state2.needReadable && ((state2.highWaterMark !== 0 ? state2.length >= state2.highWaterMark : state2.length > 0) || state2.ended)) {
      debug2("read: emitReadable", state2.length, state2.ended);
      if (state2.length === 0 && state2.ended) endReadable2(this);
      else emitReadable2(this);
      return null;
    }
    n = howMuchToRead2(n, state2);
    if (n === 0 && state2.ended) {
      if (state2.length === 0) endReadable2(this);
      return null;
    }
    var doRead = state2.needReadable;
    debug2("need readable", doRead);
    if (state2.length === 0 || state2.length - n < state2.highWaterMark) {
      doRead = true;
      debug2("length less than watermark", doRead);
    }
    if (state2.ended || state2.reading) {
      doRead = false;
      debug2("reading or ended", doRead);
    } else if (doRead) {
      debug2("do read");
      state2.reading = true;
      state2.sync = true;
      if (state2.length === 0) state2.needReadable = true;
      this._read(state2.highWaterMark);
      state2.sync = false;
      if (!state2.reading) n = howMuchToRead2(nOrig, state2);
    }
    var ret;
    if (n > 0) ret = fromList2(n, state2);
    else ret = null;
    if (ret === null) {
      state2.needReadable = state2.length <= state2.highWaterMark;
      n = 0;
    } else {
      state2.length -= n;
      state2.awaitDrain = 0;
    }
    if (state2.length === 0) {
      if (!state2.ended) state2.needReadable = true;
      if (nOrig !== n && state2.ended) endReadable2(this);
    }
    if (ret !== null) this.emit("data", ret);
    return ret;
  };
  function onEofChunk2(stream, state2) {
    debug2("onEofChunk");
    if (state2.ended) return;
    if (state2.decoder) {
      var chunk = state2.decoder.end();
      if (chunk && chunk.length) {
        state2.buffer.push(chunk);
        state2.length += state2.objectMode ? 1 : chunk.length;
      }
    }
    state2.ended = true;
    if (state2.sync) {
      emitReadable2(stream);
    } else {
      state2.needReadable = false;
      if (!state2.emittedReadable) {
        state2.emittedReadable = true;
        emitReadable_2(stream);
      }
    }
  }
  function emitReadable2(stream) {
    var state2 = stream._readableState;
    debug2("emitReadable", state2.needReadable, state2.emittedReadable);
    state2.needReadable = false;
    if (!state2.emittedReadable) {
      debug2("emitReadable", state2.flowing);
      state2.emittedReadable = true;
      browser$1$1.nextTick(emitReadable_2, stream);
    }
  }
  function emitReadable_2(stream) {
    var state2 = stream._readableState;
    debug2("emitReadable_", state2.destroyed, state2.length, state2.ended);
    if (!state2.destroyed && (state2.length || state2.ended)) {
      stream.emit("readable");
      state2.emittedReadable = false;
    }
    state2.needReadable = !state2.flowing && !state2.ended && state2.length <= state2.highWaterMark;
    flow2(stream);
  }
  function maybeReadMore2(stream, state2) {
    if (!state2.readingMore) {
      state2.readingMore = true;
      browser$1$1.nextTick(maybeReadMore_2, stream, state2);
    }
  }
  function maybeReadMore_2(stream, state2) {
    while (!state2.reading && !state2.ended && (state2.length < state2.highWaterMark || state2.flowing && state2.length === 0)) {
      var len = state2.length;
      debug2("maybeReadMore read 0");
      stream.read(0);
      if (len === state2.length)
        break;
    }
    state2.readingMore = false;
  }
  Readable2.prototype._read = function(n) {
    errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED2("_read()"));
  };
  Readable2.prototype.pipe = function(dest, pipeOpts) {
    var src = this;
    var state2 = this._readableState;
    switch (state2.pipesCount) {
      case 0:
        state2.pipes = dest;
        break;
      case 1:
        state2.pipes = [state2.pipes, dest];
        break;
      default:
        state2.pipes.push(dest);
        break;
    }
    state2.pipesCount += 1;
    debug2("pipe count=%d opts=%j", state2.pipesCount, pipeOpts);
    var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== browser$1$1.stdout && dest !== browser$1$1.stderr;
    var endFn = doEnd ? onend2 : unpipe;
    if (state2.endEmitted) browser$1$1.nextTick(endFn);
    else src.once("end", endFn);
    dest.on("unpipe", onunpipe);
    function onunpipe(readable, unpipeInfo) {
      debug2("onunpipe");
      if (readable === src) {
        if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
          unpipeInfo.hasUnpiped = true;
          cleanup();
        }
      }
    }
    function onend2() {
      debug2("onend");
      dest.end();
    }
    var ondrain = pipeOnDrain2(src);
    dest.on("drain", ondrain);
    var cleanedUp = false;
    function cleanup() {
      debug2("cleanup");
      dest.removeListener("close", onclose);
      dest.removeListener("finish", onfinish);
      dest.removeListener("drain", ondrain);
      dest.removeListener("error", onerror);
      dest.removeListener("unpipe", onunpipe);
      src.removeListener("end", onend2);
      src.removeListener("end", unpipe);
      src.removeListener("data", ondata);
      cleanedUp = true;
      if (state2.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
    }
    src.on("data", ondata);
    function ondata(chunk) {
      debug2("ondata");
      var ret = dest.write(chunk);
      debug2("dest.write", ret);
      if (ret === false) {
        if ((state2.pipesCount === 1 && state2.pipes === dest || state2.pipesCount > 1 && indexOf3(state2.pipes, dest) !== -1) && !cleanedUp) {
          debug2("false write response, pause", state2.awaitDrain);
          state2.awaitDrain++;
        }
        src.pause();
      }
    }
    function onerror(er) {
      debug2("onerror", er);
      unpipe();
      dest.removeListener("error", onerror);
      if (EElistenerCount(dest, "error") === 0) errorOrDestroy(dest, er);
    }
    prependListener3(dest, "error", onerror);
    function onclose() {
      dest.removeListener("finish", onfinish);
      unpipe();
    }
    dest.once("close", onclose);
    function onfinish() {
      debug2("onfinish");
      dest.removeListener("close", onclose);
      unpipe();
    }
    dest.once("finish", onfinish);
    function unpipe() {
      debug2("unpipe");
      src.unpipe(dest);
    }
    dest.emit("pipe", src);
    if (!state2.flowing) {
      debug2("pipe resume");
      src.resume();
    }
    return dest;
  };
  function pipeOnDrain2(src) {
    return function pipeOnDrainFunctionResult() {
      var state2 = src._readableState;
      debug2("pipeOnDrain", state2.awaitDrain);
      if (state2.awaitDrain) state2.awaitDrain--;
      if (state2.awaitDrain === 0 && EElistenerCount(src, "data")) {
        state2.flowing = true;
        flow2(src);
      }
    };
  }
  Readable2.prototype.unpipe = function(dest) {
    var state2 = this._readableState;
    var unpipeInfo = {
      hasUnpiped: false
    };
    if (state2.pipesCount === 0) return this;
    if (state2.pipesCount === 1) {
      if (dest && dest !== state2.pipes) return this;
      if (!dest) dest = state2.pipes;
      state2.pipes = null;
      state2.pipesCount = 0;
      state2.flowing = false;
      if (dest) dest.emit("unpipe", this, unpipeInfo);
      return this;
    }
    if (!dest) {
      var dests = state2.pipes;
      var len = state2.pipesCount;
      state2.pipes = null;
      state2.pipesCount = 0;
      state2.flowing = false;
      for (var i = 0; i < len; i++) dests[i].emit("unpipe", this, {
        hasUnpiped: false
      });
      return this;
    }
    var index = indexOf3(state2.pipes, dest);
    if (index === -1) return this;
    state2.pipes.splice(index, 1);
    state2.pipesCount -= 1;
    if (state2.pipesCount === 1) state2.pipes = state2.pipes[0];
    dest.emit("unpipe", this, unpipeInfo);
    return this;
  };
  Readable2.prototype.on = function(ev, fn) {
    var res = Stream2.prototype.on.call(this, ev, fn);
    var state2 = this._readableState;
    if (ev === "data") {
      state2.readableListening = this.listenerCount("readable") > 0;
      if (state2.flowing !== false) this.resume();
    } else if (ev === "readable") {
      if (!state2.endEmitted && !state2.readableListening) {
        state2.readableListening = state2.needReadable = true;
        state2.flowing = false;
        state2.emittedReadable = false;
        debug2("on readable", state2.length, state2.reading);
        if (state2.length) {
          emitReadable2(this);
        } else if (!state2.reading) {
          browser$1$1.nextTick(nReadingNextTick2, this);
        }
      }
    }
    return res;
  };
  Readable2.prototype.addListener = Readable2.prototype.on;
  Readable2.prototype.removeListener = function(ev, fn) {
    var res = Stream2.prototype.removeListener.call(this, ev, fn);
    if (ev === "readable") {
      browser$1$1.nextTick(updateReadableListening, this);
    }
    return res;
  };
  Readable2.prototype.removeAllListeners = function(ev) {
    var res = Stream2.prototype.removeAllListeners.apply(this, arguments);
    if (ev === "readable" || ev === void 0) {
      browser$1$1.nextTick(updateReadableListening, this);
    }
    return res;
  };
  function updateReadableListening(self2) {
    var state2 = self2._readableState;
    state2.readableListening = self2.listenerCount("readable") > 0;
    if (state2.resumeScheduled && !state2.paused) {
      state2.flowing = true;
    } else if (self2.listenerCount("data") > 0) {
      self2.resume();
    }
  }
  function nReadingNextTick2(self2) {
    debug2("readable nexttick read 0");
    self2.read(0);
  }
  Readable2.prototype.resume = function() {
    var state2 = this._readableState;
    if (!state2.flowing) {
      debug2("resume");
      state2.flowing = !state2.readableListening;
      resume2(this, state2);
    }
    state2.paused = false;
    return this;
  };
  function resume2(stream, state2) {
    if (!state2.resumeScheduled) {
      state2.resumeScheduled = true;
      browser$1$1.nextTick(resume_2, stream, state2);
    }
  }
  function resume_2(stream, state2) {
    debug2("resume", state2.reading);
    if (!state2.reading) {
      stream.read(0);
    }
    state2.resumeScheduled = false;
    stream.emit("resume");
    flow2(stream);
    if (state2.flowing && !state2.reading) stream.read(0);
  }
  Readable2.prototype.pause = function() {
    debug2("call pause flowing=%j", this._readableState.flowing);
    if (this._readableState.flowing !== false) {
      debug2("pause");
      this._readableState.flowing = false;
      this.emit("pause");
    }
    this._readableState.paused = true;
    return this;
  };
  function flow2(stream) {
    var state2 = stream._readableState;
    debug2("flow", state2.flowing);
    while (state2.flowing && stream.read() !== null) ;
  }
  Readable2.prototype.wrap = function(stream) {
    var _this = this;
    var state2 = this._readableState;
    var paused = false;
    stream.on("end", function() {
      debug2("wrapped end");
      if (state2.decoder && !state2.ended) {
        var chunk = state2.decoder.end();
        if (chunk && chunk.length) _this.push(chunk);
      }
      _this.push(null);
    });
    stream.on("data", function(chunk) {
      debug2("wrapped data");
      if (state2.decoder) chunk = state2.decoder.write(chunk);
      if (state2.objectMode && (chunk === null || chunk === void 0)) return;
      else if (!state2.objectMode && (!chunk || !chunk.length)) return;
      var ret = _this.push(chunk);
      if (!ret) {
        paused = true;
        stream.pause();
      }
    });
    for (var i in stream) {
      if (this[i] === void 0 && typeof stream[i] === "function") {
        this[i] = /* @__PURE__ */ (function methodWrap(method) {
          return function methodWrapReturnFunction() {
            return stream[method].apply(stream, arguments);
          };
        })(i);
      }
    }
    for (var n = 0; n < kProxyEvents.length; n++) {
      stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
    }
    this._read = function(n2) {
      debug2("wrapped _read", n2);
      if (paused) {
        paused = false;
        stream.resume();
      }
    };
    return this;
  };
  if (typeof Symbol === "function") {
    Readable2.prototype[Symbol.asyncIterator] = function() {
      if (createReadableStreamAsyncIterator === void 0) {
        createReadableStreamAsyncIterator = requireAsync_iterator();
      }
      return createReadableStreamAsyncIterator(this);
    };
  }
  Object.defineProperty(Readable2.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._readableState.highWaterMark;
    }
  });
  Object.defineProperty(Readable2.prototype, "readableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._readableState && this._readableState.buffer;
    }
  });
  Object.defineProperty(Readable2.prototype, "readableFlowing", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._readableState.flowing;
    },
    set: function set(state2) {
      if (this._readableState) {
        this._readableState.flowing = state2;
      }
    }
  });
  Readable2._fromList = fromList2;
  Object.defineProperty(Readable2.prototype, "readableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._readableState.length;
    }
  });
  function fromList2(n, state2) {
    if (state2.length === 0) return null;
    var ret;
    if (state2.objectMode) ret = state2.buffer.shift();
    else if (!n || n >= state2.length) {
      if (state2.decoder) ret = state2.buffer.join("");
      else if (state2.buffer.length === 1) ret = state2.buffer.first();
      else ret = state2.buffer.concat(state2.length);
      state2.buffer.clear();
    } else {
      ret = state2.buffer.consume(n, state2.decoder);
    }
    return ret;
  }
  function endReadable2(stream) {
    var state2 = stream._readableState;
    debug2("endReadable", state2.endEmitted);
    if (!state2.endEmitted) {
      state2.ended = true;
      browser$1$1.nextTick(endReadableNT2, state2, stream);
    }
  }
  function endReadableNT2(state2, stream) {
    debug2("endReadableNT", state2.endEmitted, state2.length);
    if (!state2.endEmitted && state2.length === 0) {
      state2.endEmitted = true;
      stream.readable = false;
      stream.emit("end");
      if (state2.autoDestroy) {
        var wState = stream._writableState;
        if (!wState || wState.autoDestroy && wState.finished) {
          stream.destroy();
        }
      }
    }
  }
  if (typeof Symbol === "function") {
    Readable2.from = function(iterable, opts) {
      if (from2 === void 0) {
        from2 = requireFromBrowser();
      }
      return from2(Readable2, iterable, opts);
    };
  }
  function indexOf3(xs, x) {
    for (var i = 0, l = xs.length; i < l; i++) {
      if (xs[i] === x) return i;
    }
    return -1;
  }
  return _stream_readable;
}
var _stream_transform = Transform$4;
var _require$codes$1 = errorsBrowser.codes, ERR_METHOD_NOT_IMPLEMENTED = _require$codes$1.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK = _require$codes$1.ERR_MULTIPLE_CALLBACK, ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes$1.ERR_TRANSFORM_ALREADY_TRANSFORMING, ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes$1.ERR_TRANSFORM_WITH_LENGTH_0;
var Duplex$1 = require_stream_duplex();
require$$0$1(Transform$4, Duplex$1);
function afterTransform$1(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;
  if (cb === null) {
    return this.emit("error", new ERR_MULTIPLE_CALLBACK());
  }
  ts.writechunk = null;
  ts.writecb = null;
  if (data != null)
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}
function Transform$4(options) {
  if (!(this instanceof Transform$4)) return new Transform$4(options);
  Duplex$1.call(this, options);
  this._transformState = {
    afterTransform: afterTransform$1.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };
  this._readableState.needReadable = true;
  this._readableState.sync = false;
  if (options) {
    if (typeof options.transform === "function") this._transform = options.transform;
    if (typeof options.flush === "function") this._flush = options.flush;
  }
  this.on("prefinish", prefinish$1);
}
function prefinish$1() {
  var _this = this;
  if (typeof this._flush === "function" && !this._readableState.destroyed) {
    this._flush(function(er, data) {
      done$1(_this, er, data);
    });
  } else {
    done$1(this, null, null);
  }
}
Transform$4.prototype.push = function(chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex$1.prototype.push.call(this, chunk, encoding);
};
Transform$4.prototype._transform = function(chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
};
Transform$4.prototype._write = function(chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};
Transform$4.prototype._read = function(n) {
  var ts = this._transformState;
  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    ts.needTransform = true;
  }
};
Transform$4.prototype._destroy = function(err, cb) {
  Duplex$1.prototype._destroy.call(this, err, function(err2) {
    cb(err2);
  });
};
function done$1(stream, er, data) {
  if (er) return stream.emit("error", er);
  if (data != null)
    stream.push(data);
  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}
_stream_transform.default;
var _stream_passthrough = PassThrough$1;
var Transform$3 = _stream_transform;
require$$0$1(PassThrough$1, Transform$3);
function PassThrough$1(options) {
  if (!(this instanceof PassThrough$1)) return new PassThrough$1(options);
  Transform$3.call(this, options);
}
PassThrough$1.prototype._transform = function(chunk, encoding, cb) {
  cb(null, chunk);
};
_stream_passthrough.default;
var eos;
function once2(callback) {
  var called = false;
  return function() {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}
var _require$codes = errorsBrowser.codes, ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS, ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
function noop(err) {
  if (err) throw err;
}
function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === "function";
}
function destroyer(stream, reading, writing, callback) {
  callback = once2(callback);
  var closed = false;
  stream.on("close", function() {
    closed = true;
  });
  if (eos === void 0) eos = endOfStream;
  eos(stream, {
    readable: reading,
    writable: writing
  }, function(err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function(err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true;
    if (isRequest(stream)) return stream.abort();
    if (typeof stream.destroy === "function") return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED("pipe"));
  };
}
function call(fn) {
  fn();
}
function pipe(from2, to) {
  return from2.pipe(to);
}
function popCallback(streams) {
  if (!streams.length) return noop;
  if (typeof streams[streams.length - 1] !== "function") return noop;
  return streams.pop();
}
function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }
  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];
  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS("streams");
  }
  var error;
  var destroys = streams.map(function(stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function(err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}
var pipeline_1 = pipeline;
pipeline_1.default;
(function(module, exports2) {
  exports2 = module.exports = require_stream_readable();
  exports2.Stream = exports2;
  exports2.Readable = exports2;
  exports2.Writable = require_stream_writable();
  exports2.Duplex = require_stream_duplex();
  exports2.Transform = _stream_transform;
  exports2.PassThrough = _stream_passthrough;
  exports2.finished = endOfStream;
  exports2.pipeline = pipeline_1;
})(readableBrowser, readableBrowser.exports);
var readableBrowserExports = readableBrowser.exports;
readableBrowserExports.default;
var Buffer$a = safeBufferExports.Buffer;
var Transform$2 = readableBrowserExports.Transform;
var inherits$a = require$$0$1;
function throwIfNotStringOrBuffer(val, prefix) {
  if (!Buffer$a.isBuffer(val) && typeof val !== "string") {
    throw new TypeError(prefix + " must be a string or a buffer");
  }
}
function HashBase$2(blockSize) {
  Transform$2.call(this);
  this._block = Buffer$a.allocUnsafe(blockSize);
  this._blockSize = blockSize;
  this._blockOffset = 0;
  this._length = [0, 0, 0, 0];
  this._finalized = false;
}
inherits$a(HashBase$2, Transform$2);
HashBase$2.prototype._transform = function(chunk, encoding, callback) {
  var error = null;
  try {
    this.update(chunk, encoding);
  } catch (err) {
    error = err;
  }
  callback(error);
};
HashBase$2.prototype._flush = function(callback) {
  var error = null;
  try {
    this.push(this.digest());
  } catch (err) {
    error = err;
  }
  callback(error);
};
HashBase$2.prototype.update = function(data, encoding) {
  throwIfNotStringOrBuffer(data, "Data");
  if (this._finalized) throw new Error("Digest already called");
  if (!Buffer$a.isBuffer(data)) data = Buffer$a.from(data, encoding);
  var block = this._block;
  var offset = 0;
  while (this._blockOffset + data.length - offset >= this._blockSize) {
    for (var i = this._blockOffset; i < this._blockSize; ) block[i++] = data[offset++];
    this._update();
    this._blockOffset = 0;
  }
  while (offset < data.length) block[this._blockOffset++] = data[offset++];
  for (var j = 0, carry = data.length * 8; carry > 0; ++j) {
    this._length[j] += carry;
    carry = this._length[j] / 4294967296 | 0;
    if (carry > 0) this._length[j] -= 4294967296 * carry;
  }
  return this;
};
HashBase$2.prototype._update = function() {
  throw new Error("_update is not implemented");
};
HashBase$2.prototype.digest = function(encoding) {
  if (this._finalized) throw new Error("Digest already called");
  this._finalized = true;
  var digest = this._digest();
  if (encoding !== void 0) digest = digest.toString(encoding);
  this._block.fill(0);
  this._blockOffset = 0;
  for (var i = 0; i < 4; ++i) this._length[i] = 0;
  return digest;
};
HashBase$2.prototype._digest = function() {
  throw new Error("_digest is not implemented");
};
var hashBase = HashBase$2;
hashBase.default;
var inherits$9 = require$$0$1;
var HashBase$1 = hashBase;
var Buffer$9 = safeBufferExports.Buffer;
var ARRAY16$1 = new Array(16);
function MD5$1() {
  HashBase$1.call(this, 64);
  this._a = 1732584193;
  this._b = 4023233417;
  this._c = 2562383102;
  this._d = 271733878;
}
inherits$9(MD5$1, HashBase$1);
MD5$1.prototype._update = function() {
  var M = ARRAY16$1;
  for (var i = 0; i < 16; ++i) M[i] = this._block.readInt32LE(i * 4);
  var a = this._a;
  var b = this._b;
  var c = this._c;
  var d = this._d;
  a = fnF(a, b, c, d, M[0], 3614090360, 7);
  d = fnF(d, a, b, c, M[1], 3905402710, 12);
  c = fnF(c, d, a, b, M[2], 606105819, 17);
  b = fnF(b, c, d, a, M[3], 3250441966, 22);
  a = fnF(a, b, c, d, M[4], 4118548399, 7);
  d = fnF(d, a, b, c, M[5], 1200080426, 12);
  c = fnF(c, d, a, b, M[6], 2821735955, 17);
  b = fnF(b, c, d, a, M[7], 4249261313, 22);
  a = fnF(a, b, c, d, M[8], 1770035416, 7);
  d = fnF(d, a, b, c, M[9], 2336552879, 12);
  c = fnF(c, d, a, b, M[10], 4294925233, 17);
  b = fnF(b, c, d, a, M[11], 2304563134, 22);
  a = fnF(a, b, c, d, M[12], 1804603682, 7);
  d = fnF(d, a, b, c, M[13], 4254626195, 12);
  c = fnF(c, d, a, b, M[14], 2792965006, 17);
  b = fnF(b, c, d, a, M[15], 1236535329, 22);
  a = fnG(a, b, c, d, M[1], 4129170786, 5);
  d = fnG(d, a, b, c, M[6], 3225465664, 9);
  c = fnG(c, d, a, b, M[11], 643717713, 14);
  b = fnG(b, c, d, a, M[0], 3921069994, 20);
  a = fnG(a, b, c, d, M[5], 3593408605, 5);
  d = fnG(d, a, b, c, M[10], 38016083, 9);
  c = fnG(c, d, a, b, M[15], 3634488961, 14);
  b = fnG(b, c, d, a, M[4], 3889429448, 20);
  a = fnG(a, b, c, d, M[9], 568446438, 5);
  d = fnG(d, a, b, c, M[14], 3275163606, 9);
  c = fnG(c, d, a, b, M[3], 4107603335, 14);
  b = fnG(b, c, d, a, M[8], 1163531501, 20);
  a = fnG(a, b, c, d, M[13], 2850285829, 5);
  d = fnG(d, a, b, c, M[2], 4243563512, 9);
  c = fnG(c, d, a, b, M[7], 1735328473, 14);
  b = fnG(b, c, d, a, M[12], 2368359562, 20);
  a = fnH(a, b, c, d, M[5], 4294588738, 4);
  d = fnH(d, a, b, c, M[8], 2272392833, 11);
  c = fnH(c, d, a, b, M[11], 1839030562, 16);
  b = fnH(b, c, d, a, M[14], 4259657740, 23);
  a = fnH(a, b, c, d, M[1], 2763975236, 4);
  d = fnH(d, a, b, c, M[4], 1272893353, 11);
  c = fnH(c, d, a, b, M[7], 4139469664, 16);
  b = fnH(b, c, d, a, M[10], 3200236656, 23);
  a = fnH(a, b, c, d, M[13], 681279174, 4);
  d = fnH(d, a, b, c, M[0], 3936430074, 11);
  c = fnH(c, d, a, b, M[3], 3572445317, 16);
  b = fnH(b, c, d, a, M[6], 76029189, 23);
  a = fnH(a, b, c, d, M[9], 3654602809, 4);
  d = fnH(d, a, b, c, M[12], 3873151461, 11);
  c = fnH(c, d, a, b, M[15], 530742520, 16);
  b = fnH(b, c, d, a, M[2], 3299628645, 23);
  a = fnI(a, b, c, d, M[0], 4096336452, 6);
  d = fnI(d, a, b, c, M[7], 1126891415, 10);
  c = fnI(c, d, a, b, M[14], 2878612391, 15);
  b = fnI(b, c, d, a, M[5], 4237533241, 21);
  a = fnI(a, b, c, d, M[12], 1700485571, 6);
  d = fnI(d, a, b, c, M[3], 2399980690, 10);
  c = fnI(c, d, a, b, M[10], 4293915773, 15);
  b = fnI(b, c, d, a, M[1], 2240044497, 21);
  a = fnI(a, b, c, d, M[8], 1873313359, 6);
  d = fnI(d, a, b, c, M[15], 4264355552, 10);
  c = fnI(c, d, a, b, M[6], 2734768916, 15);
  b = fnI(b, c, d, a, M[13], 1309151649, 21);
  a = fnI(a, b, c, d, M[4], 4149444226, 6);
  d = fnI(d, a, b, c, M[11], 3174756917, 10);
  c = fnI(c, d, a, b, M[2], 718787259, 15);
  b = fnI(b, c, d, a, M[9], 3951481745, 21);
  this._a = this._a + a | 0;
  this._b = this._b + b | 0;
  this._c = this._c + c | 0;
  this._d = this._d + d | 0;
};
MD5$1.prototype._digest = function() {
  this._block[this._blockOffset++] = 128;
  if (this._blockOffset > 56) {
    this._block.fill(0, this._blockOffset, 64);
    this._update();
    this._blockOffset = 0;
  }
  this._block.fill(0, this._blockOffset, 56);
  this._block.writeUInt32LE(this._length[0], 56);
  this._block.writeUInt32LE(this._length[1], 60);
  this._update();
  var buffer = Buffer$9.allocUnsafe(16);
  buffer.writeInt32LE(this._a, 0);
  buffer.writeInt32LE(this._b, 4);
  buffer.writeInt32LE(this._c, 8);
  buffer.writeInt32LE(this._d, 12);
  return buffer;
};
function rotl$1(x, n) {
  return x << n | x >>> 32 - n;
}
function fnF(a, b, c, d, m, k, s) {
  return rotl$1(a + (b & c | ~b & d) + m + k | 0, s) + b | 0;
}
function fnG(a, b, c, d, m, k, s) {
  return rotl$1(a + (b & d | c & ~d) + m + k | 0, s) + b | 0;
}
function fnH(a, b, c, d, m, k, s) {
  return rotl$1(a + (b ^ c ^ d) + m + k | 0, s) + b | 0;
}
function fnI(a, b, c, d, m, k, s) {
  return rotl$1(a + (c ^ (b | ~d)) + m + k | 0, s) + b | 0;
}
var md5_js = MD5$1;
md5_js.default;
var Buffer$8 = require$$3$1.Buffer;
var inherits$8 = require$$0$1;
var HashBase = hashBase;
var ARRAY16 = new Array(16);
var zl = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  7,
  4,
  13,
  1,
  10,
  6,
  15,
  3,
  12,
  0,
  9,
  5,
  2,
  14,
  11,
  8,
  3,
  10,
  14,
  4,
  9,
  15,
  8,
  1,
  2,
  7,
  0,
  6,
  13,
  11,
  5,
  12,
  1,
  9,
  11,
  10,
  0,
  8,
  12,
  4,
  13,
  3,
  7,
  15,
  14,
  5,
  6,
  2,
  4,
  0,
  5,
  9,
  7,
  12,
  2,
  10,
  14,
  1,
  3,
  8,
  11,
  6,
  15,
  13
];
var zr = [
  5,
  14,
  7,
  0,
  9,
  2,
  11,
  4,
  13,
  6,
  15,
  8,
  1,
  10,
  3,
  12,
  6,
  11,
  3,
  7,
  0,
  13,
  5,
  10,
  14,
  15,
  8,
  12,
  4,
  9,
  1,
  2,
  15,
  5,
  1,
  3,
  7,
  14,
  6,
  9,
  11,
  8,
  12,
  2,
  10,
  0,
  4,
  13,
  8,
  6,
  4,
  1,
  3,
  11,
  15,
  0,
  5,
  12,
  2,
  13,
  9,
  7,
  10,
  14,
  12,
  15,
  10,
  4,
  1,
  5,
  8,
  7,
  6,
  2,
  13,
  14,
  0,
  3,
  9,
  11
];
var sl = [
  11,
  14,
  15,
  12,
  5,
  8,
  7,
  9,
  11,
  13,
  14,
  15,
  6,
  7,
  9,
  8,
  7,
  6,
  8,
  13,
  11,
  9,
  7,
  15,
  7,
  12,
  15,
  9,
  11,
  7,
  13,
  12,
  11,
  13,
  6,
  7,
  14,
  9,
  13,
  15,
  14,
  8,
  13,
  6,
  5,
  12,
  7,
  5,
  11,
  12,
  14,
  15,
  14,
  15,
  9,
  8,
  9,
  14,
  5,
  6,
  8,
  6,
  5,
  12,
  9,
  15,
  5,
  11,
  6,
  8,
  13,
  12,
  5,
  12,
  13,
  14,
  11,
  8,
  5,
  6
];
var sr = [
  8,
  9,
  9,
  11,
  13,
  15,
  15,
  5,
  7,
  7,
  8,
  11,
  14,
  14,
  12,
  6,
  9,
  13,
  15,
  7,
  12,
  8,
  9,
  11,
  7,
  7,
  12,
  7,
  6,
  15,
  13,
  11,
  9,
  7,
  15,
  11,
  8,
  6,
  6,
  14,
  12,
  13,
  5,
  14,
  13,
  13,
  7,
  5,
  15,
  5,
  8,
  11,
  14,
  14,
  6,
  14,
  6,
  9,
  12,
  9,
  12,
  5,
  15,
  8,
  8,
  5,
  12,
  9,
  12,
  5,
  14,
  6,
  8,
  13,
  6,
  5,
  15,
  13,
  11,
  11
];
var hl = [0, 1518500249, 1859775393, 2400959708, 2840853838];
var hr = [1352829926, 1548603684, 1836072691, 2053994217, 0];
function RIPEMD160$1() {
  HashBase.call(this, 64);
  this._a = 1732584193;
  this._b = 4023233417;
  this._c = 2562383102;
  this._d = 271733878;
  this._e = 3285377520;
}
inherits$8(RIPEMD160$1, HashBase);
RIPEMD160$1.prototype._update = function() {
  var words = ARRAY16;
  for (var j = 0; j < 16; ++j) words[j] = this._block.readInt32LE(j * 4);
  var al = this._a | 0;
  var bl = this._b | 0;
  var cl = this._c | 0;
  var dl = this._d | 0;
  var el = this._e | 0;
  var ar = this._a | 0;
  var br = this._b | 0;
  var cr = this._c | 0;
  var dr = this._d | 0;
  var er = this._e | 0;
  for (var i = 0; i < 80; i += 1) {
    var tl;
    var tr;
    if (i < 16) {
      tl = fn1(al, bl, cl, dl, el, words[zl[i]], hl[0], sl[i]);
      tr = fn5(ar, br, cr, dr, er, words[zr[i]], hr[0], sr[i]);
    } else if (i < 32) {
      tl = fn2(al, bl, cl, dl, el, words[zl[i]], hl[1], sl[i]);
      tr = fn4(ar, br, cr, dr, er, words[zr[i]], hr[1], sr[i]);
    } else if (i < 48) {
      tl = fn3(al, bl, cl, dl, el, words[zl[i]], hl[2], sl[i]);
      tr = fn3(ar, br, cr, dr, er, words[zr[i]], hr[2], sr[i]);
    } else if (i < 64) {
      tl = fn4(al, bl, cl, dl, el, words[zl[i]], hl[3], sl[i]);
      tr = fn2(ar, br, cr, dr, er, words[zr[i]], hr[3], sr[i]);
    } else {
      tl = fn5(al, bl, cl, dl, el, words[zl[i]], hl[4], sl[i]);
      tr = fn1(ar, br, cr, dr, er, words[zr[i]], hr[4], sr[i]);
    }
    al = el;
    el = dl;
    dl = rotl(cl, 10);
    cl = bl;
    bl = tl;
    ar = er;
    er = dr;
    dr = rotl(cr, 10);
    cr = br;
    br = tr;
  }
  var t = this._b + cl + dr | 0;
  this._b = this._c + dl + er | 0;
  this._c = this._d + el + ar | 0;
  this._d = this._e + al + br | 0;
  this._e = this._a + bl + cr | 0;
  this._a = t;
};
RIPEMD160$1.prototype._digest = function() {
  this._block[this._blockOffset++] = 128;
  if (this._blockOffset > 56) {
    this._block.fill(0, this._blockOffset, 64);
    this._update();
    this._blockOffset = 0;
  }
  this._block.fill(0, this._blockOffset, 56);
  this._block.writeUInt32LE(this._length[0], 56);
  this._block.writeUInt32LE(this._length[1], 60);
  this._update();
  var buffer = Buffer$8.alloc ? Buffer$8.alloc(20) : new Buffer$8(20);
  buffer.writeInt32LE(this._a, 0);
  buffer.writeInt32LE(this._b, 4);
  buffer.writeInt32LE(this._c, 8);
  buffer.writeInt32LE(this._d, 12);
  buffer.writeInt32LE(this._e, 16);
  return buffer;
};
function rotl(x, n) {
  return x << n | x >>> 32 - n;
}
function fn1(a, b, c, d, e, m, k, s) {
  return rotl(a + (b ^ c ^ d) + m + k | 0, s) + e | 0;
}
function fn2(a, b, c, d, e, m, k, s) {
  return rotl(a + (b & c | ~b & d) + m + k | 0, s) + e | 0;
}
function fn3(a, b, c, d, e, m, k, s) {
  return rotl(a + ((b | ~c) ^ d) + m + k | 0, s) + e | 0;
}
function fn4(a, b, c, d, e, m, k, s) {
  return rotl(a + (b & d | c & ~d) + m + k | 0, s) + e | 0;
}
function fn5(a, b, c, d, e, m, k, s) {
  return rotl(a + (b ^ (c | ~d)) + m + k | 0, s) + e | 0;
}
var ripemd160 = RIPEMD160$1;
ripemd160.default;
var sha_js = { exports: {} };
var Buffer$7 = safeBufferExports.Buffer;
function Hash$7(blockSize, finalSize) {
  this._block = Buffer$7.alloc(blockSize);
  this._finalSize = finalSize;
  this._blockSize = blockSize;
  this._len = 0;
}
Hash$7.prototype.update = function(data, enc) {
  if (typeof data === "string") {
    enc = enc || "utf8";
    data = Buffer$7.from(data, enc);
  }
  var block = this._block;
  var blockSize = this._blockSize;
  var length = data.length;
  var accum = this._len;
  for (var offset = 0; offset < length; ) {
    var assigned = accum % blockSize;
    var remainder = Math.min(length - offset, blockSize - assigned);
    for (var i = 0; i < remainder; i++) {
      block[assigned + i] = data[offset + i];
    }
    accum += remainder;
    offset += remainder;
    if (accum % blockSize === 0) {
      this._update(block);
    }
  }
  this._len += length;
  return this;
};
Hash$7.prototype.digest = function(enc) {
  var rem = this._len % this._blockSize;
  this._block[rem] = 128;
  this._block.fill(0, rem + 1);
  if (rem >= this._finalSize) {
    this._update(this._block);
    this._block.fill(0);
  }
  var bits = this._len * 8;
  if (bits <= 4294967295) {
    this._block.writeUInt32BE(bits, this._blockSize - 4);
  } else {
    var lowBits = (bits & 4294967295) >>> 0;
    var highBits = (bits - lowBits) / 4294967296;
    this._block.writeUInt32BE(highBits, this._blockSize - 8);
    this._block.writeUInt32BE(lowBits, this._blockSize - 4);
  }
  this._update(this._block);
  var hash2 = this._hash();
  return enc ? hash2.toString(enc) : hash2;
};
Hash$7.prototype._update = function() {
  throw new Error("_update must be implemented by subclass");
};
var hash = Hash$7;
hash.default;
var inherits$7 = require$$0$1;
var Hash$6 = hash;
var Buffer$6 = safeBufferExports.Buffer;
var K$3 = [
  1518500249,
  1859775393,
  2400959708 | 0,
  3395469782 | 0
];
var W$5 = new Array(80);
function Sha() {
  this.init();
  this._w = W$5;
  Hash$6.call(this, 64, 56);
}
inherits$7(Sha, Hash$6);
Sha.prototype.init = function() {
  this._a = 1732584193;
  this._b = 4023233417;
  this._c = 2562383102;
  this._d = 271733878;
  this._e = 3285377520;
  return this;
};
function rotl5$1(num) {
  return num << 5 | num >>> 27;
}
function rotl30$1(num) {
  return num << 30 | num >>> 2;
}
function ft$1(s, b, c, d) {
  if (s === 0) return b & c | ~b & d;
  if (s === 2) return b & c | b & d | c & d;
  return b ^ c ^ d;
}
Sha.prototype._update = function(M) {
  var W2 = this._w;
  var a = this._a | 0;
  var b = this._b | 0;
  var c = this._c | 0;
  var d = this._d | 0;
  var e = this._e | 0;
  for (var i = 0; i < 16; ++i) W2[i] = M.readInt32BE(i * 4);
  for (; i < 80; ++i) W2[i] = W2[i - 3] ^ W2[i - 8] ^ W2[i - 14] ^ W2[i - 16];
  for (var j = 0; j < 80; ++j) {
    var s = ~~(j / 20);
    var t = rotl5$1(a) + ft$1(s, b, c, d) + e + W2[j] + K$3[s] | 0;
    e = d;
    d = c;
    c = rotl30$1(b);
    b = a;
    a = t;
  }
  this._a = a + this._a | 0;
  this._b = b + this._b | 0;
  this._c = c + this._c | 0;
  this._d = d + this._d | 0;
  this._e = e + this._e | 0;
};
Sha.prototype._hash = function() {
  var H = Buffer$6.allocUnsafe(20);
  H.writeInt32BE(this._a | 0, 0);
  H.writeInt32BE(this._b | 0, 4);
  H.writeInt32BE(this._c | 0, 8);
  H.writeInt32BE(this._d | 0, 12);
  H.writeInt32BE(this._e | 0, 16);
  return H;
};
var sha$1 = Sha;
sha$1.default;
var inherits$6 = require$$0$1;
var Hash$5 = hash;
var Buffer$5 = safeBufferExports.Buffer;
var K$2 = [
  1518500249,
  1859775393,
  2400959708 | 0,
  3395469782 | 0
];
var W$4 = new Array(80);
function Sha1() {
  this.init();
  this._w = W$4;
  Hash$5.call(this, 64, 56);
}
inherits$6(Sha1, Hash$5);
Sha1.prototype.init = function() {
  this._a = 1732584193;
  this._b = 4023233417;
  this._c = 2562383102;
  this._d = 271733878;
  this._e = 3285377520;
  return this;
};
function rotl1(num) {
  return num << 1 | num >>> 31;
}
function rotl5(num) {
  return num << 5 | num >>> 27;
}
function rotl30(num) {
  return num << 30 | num >>> 2;
}
function ft(s, b, c, d) {
  if (s === 0) return b & c | ~b & d;
  if (s === 2) return b & c | b & d | c & d;
  return b ^ c ^ d;
}
Sha1.prototype._update = function(M) {
  var W2 = this._w;
  var a = this._a | 0;
  var b = this._b | 0;
  var c = this._c | 0;
  var d = this._d | 0;
  var e = this._e | 0;
  for (var i = 0; i < 16; ++i) W2[i] = M.readInt32BE(i * 4);
  for (; i < 80; ++i) W2[i] = rotl1(W2[i - 3] ^ W2[i - 8] ^ W2[i - 14] ^ W2[i - 16]);
  for (var j = 0; j < 80; ++j) {
    var s = ~~(j / 20);
    var t = rotl5(a) + ft(s, b, c, d) + e + W2[j] + K$2[s] | 0;
    e = d;
    d = c;
    c = rotl30(b);
    b = a;
    a = t;
  }
  this._a = a + this._a | 0;
  this._b = b + this._b | 0;
  this._c = c + this._c | 0;
  this._d = d + this._d | 0;
  this._e = e + this._e | 0;
};
Sha1.prototype._hash = function() {
  var H = Buffer$5.allocUnsafe(20);
  H.writeInt32BE(this._a | 0, 0);
  H.writeInt32BE(this._b | 0, 4);
  H.writeInt32BE(this._c | 0, 8);
  H.writeInt32BE(this._d | 0, 12);
  H.writeInt32BE(this._e | 0, 16);
  return H;
};
var sha1 = Sha1;
sha1.default;
var inherits$5 = require$$0$1;
var Hash$4 = hash;
var Buffer$4 = safeBufferExports.Buffer;
var K$1 = [
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
];
var W$3 = new Array(64);
function Sha256$1() {
  this.init();
  this._w = W$3;
  Hash$4.call(this, 64, 56);
}
inherits$5(Sha256$1, Hash$4);
Sha256$1.prototype.init = function() {
  this._a = 1779033703;
  this._b = 3144134277;
  this._c = 1013904242;
  this._d = 2773480762;
  this._e = 1359893119;
  this._f = 2600822924;
  this._g = 528734635;
  this._h = 1541459225;
  return this;
};
function ch(x, y, z) {
  return z ^ x & (y ^ z);
}
function maj$1(x, y, z) {
  return x & y | z & (x | y);
}
function sigma0$1(x) {
  return (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10);
}
function sigma1$1(x) {
  return (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7);
}
function gamma0(x) {
  return (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ x >>> 3;
}
function gamma1(x) {
  return (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ x >>> 10;
}
Sha256$1.prototype._update = function(M) {
  var W2 = this._w;
  var a = this._a | 0;
  var b = this._b | 0;
  var c = this._c | 0;
  var d = this._d | 0;
  var e = this._e | 0;
  var f = this._f | 0;
  var g = this._g | 0;
  var h = this._h | 0;
  for (var i = 0; i < 16; ++i) W2[i] = M.readInt32BE(i * 4);
  for (; i < 64; ++i) W2[i] = gamma1(W2[i - 2]) + W2[i - 7] + gamma0(W2[i - 15]) + W2[i - 16] | 0;
  for (var j = 0; j < 64; ++j) {
    var T1 = h + sigma1$1(e) + ch(e, f, g) + K$1[j] + W2[j] | 0;
    var T2 = sigma0$1(a) + maj$1(a, b, c) | 0;
    h = g;
    g = f;
    f = e;
    e = d + T1 | 0;
    d = c;
    c = b;
    b = a;
    a = T1 + T2 | 0;
  }
  this._a = a + this._a | 0;
  this._b = b + this._b | 0;
  this._c = c + this._c | 0;
  this._d = d + this._d | 0;
  this._e = e + this._e | 0;
  this._f = f + this._f | 0;
  this._g = g + this._g | 0;
  this._h = h + this._h | 0;
};
Sha256$1.prototype._hash = function() {
  var H = Buffer$4.allocUnsafe(32);
  H.writeInt32BE(this._a, 0);
  H.writeInt32BE(this._b, 4);
  H.writeInt32BE(this._c, 8);
  H.writeInt32BE(this._d, 12);
  H.writeInt32BE(this._e, 16);
  H.writeInt32BE(this._f, 20);
  H.writeInt32BE(this._g, 24);
  H.writeInt32BE(this._h, 28);
  return H;
};
var sha256$1 = Sha256$1;
sha256$1.default;
var inherits$4 = require$$0$1;
var Sha256 = sha256$1;
var Hash$3 = hash;
var Buffer$3 = safeBufferExports.Buffer;
var W$2 = new Array(64);
function Sha224() {
  this.init();
  this._w = W$2;
  Hash$3.call(this, 64, 56);
}
inherits$4(Sha224, Sha256);
Sha224.prototype.init = function() {
  this._a = 3238371032;
  this._b = 914150663;
  this._c = 812702999;
  this._d = 4144912697;
  this._e = 4290775857;
  this._f = 1750603025;
  this._g = 1694076839;
  this._h = 3204075428;
  return this;
};
Sha224.prototype._hash = function() {
  var H = Buffer$3.allocUnsafe(28);
  H.writeInt32BE(this._a, 0);
  H.writeInt32BE(this._b, 4);
  H.writeInt32BE(this._c, 8);
  H.writeInt32BE(this._d, 12);
  H.writeInt32BE(this._e, 16);
  H.writeInt32BE(this._f, 20);
  H.writeInt32BE(this._g, 24);
  return H;
};
var sha224 = Sha224;
sha224.default;
var inherits$3 = require$$0$1;
var Hash$2 = hash;
var Buffer$2 = safeBufferExports.Buffer;
var K = [
  1116352408,
  3609767458,
  1899447441,
  602891725,
  3049323471,
  3964484399,
  3921009573,
  2173295548,
  961987163,
  4081628472,
  1508970993,
  3053834265,
  2453635748,
  2937671579,
  2870763221,
  3664609560,
  3624381080,
  2734883394,
  310598401,
  1164996542,
  607225278,
  1323610764,
  1426881987,
  3590304994,
  1925078388,
  4068182383,
  2162078206,
  991336113,
  2614888103,
  633803317,
  3248222580,
  3479774868,
  3835390401,
  2666613458,
  4022224774,
  944711139,
  264347078,
  2341262773,
  604807628,
  2007800933,
  770255983,
  1495990901,
  1249150122,
  1856431235,
  1555081692,
  3175218132,
  1996064986,
  2198950837,
  2554220882,
  3999719339,
  2821834349,
  766784016,
  2952996808,
  2566594879,
  3210313671,
  3203337956,
  3336571891,
  1034457026,
  3584528711,
  2466948901,
  113926993,
  3758326383,
  338241895,
  168717936,
  666307205,
  1188179964,
  773529912,
  1546045734,
  1294757372,
  1522805485,
  1396182291,
  2643833823,
  1695183700,
  2343527390,
  1986661051,
  1014477480,
  2177026350,
  1206759142,
  2456956037,
  344077627,
  2730485921,
  1290863460,
  2820302411,
  3158454273,
  3259730800,
  3505952657,
  3345764771,
  106217008,
  3516065817,
  3606008344,
  3600352804,
  1432725776,
  4094571909,
  1467031594,
  275423344,
  851169720,
  430227734,
  3100823752,
  506948616,
  1363258195,
  659060556,
  3750685593,
  883997877,
  3785050280,
  958139571,
  3318307427,
  1322822218,
  3812723403,
  1537002063,
  2003034995,
  1747873779,
  3602036899,
  1955562222,
  1575990012,
  2024104815,
  1125592928,
  2227730452,
  2716904306,
  2361852424,
  442776044,
  2428436474,
  593698344,
  2756734187,
  3733110249,
  3204031479,
  2999351573,
  3329325298,
  3815920427,
  3391569614,
  3928383900,
  3515267271,
  566280711,
  3940187606,
  3454069534,
  4118630271,
  4000239992,
  116418474,
  1914138554,
  174292421,
  2731055270,
  289380356,
  3203993006,
  460393269,
  320620315,
  685471733,
  587496836,
  852142971,
  1086792851,
  1017036298,
  365543100,
  1126000580,
  2618297676,
  1288033470,
  3409855158,
  1501505948,
  4234509866,
  1607167915,
  987167468,
  1816402316,
  1246189591
];
var W$1 = new Array(160);
function Sha512() {
  this.init();
  this._w = W$1;
  Hash$2.call(this, 128, 112);
}
inherits$3(Sha512, Hash$2);
Sha512.prototype.init = function() {
  this._ah = 1779033703;
  this._bh = 3144134277;
  this._ch = 1013904242;
  this._dh = 2773480762;
  this._eh = 1359893119;
  this._fh = 2600822924;
  this._gh = 528734635;
  this._hh = 1541459225;
  this._al = 4089235720;
  this._bl = 2227873595;
  this._cl = 4271175723;
  this._dl = 1595750129;
  this._el = 2917565137;
  this._fl = 725511199;
  this._gl = 4215389547;
  this._hl = 327033209;
  return this;
};
function Ch(x, y, z) {
  return z ^ x & (y ^ z);
}
function maj(x, y, z) {
  return x & y | z & (x | y);
}
function sigma0(x, xl) {
  return (x >>> 28 | xl << 4) ^ (xl >>> 2 | x << 30) ^ (xl >>> 7 | x << 25);
}
function sigma1(x, xl) {
  return (x >>> 14 | xl << 18) ^ (x >>> 18 | xl << 14) ^ (xl >>> 9 | x << 23);
}
function Gamma0(x, xl) {
  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ x >>> 7;
}
function Gamma0l(x, xl) {
  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7 | xl << 25);
}
function Gamma1(x, xl) {
  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ x >>> 6;
}
function Gamma1l(x, xl) {
  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6 | xl << 26);
}
function getCarry(a, b) {
  return a >>> 0 < b >>> 0 ? 1 : 0;
}
Sha512.prototype._update = function(M) {
  var W2 = this._w;
  var ah = this._ah | 0;
  var bh = this._bh | 0;
  var ch2 = this._ch | 0;
  var dh = this._dh | 0;
  var eh = this._eh | 0;
  var fh = this._fh | 0;
  var gh = this._gh | 0;
  var hh = this._hh | 0;
  var al = this._al | 0;
  var bl = this._bl | 0;
  var cl = this._cl | 0;
  var dl = this._dl | 0;
  var el = this._el | 0;
  var fl = this._fl | 0;
  var gl = this._gl | 0;
  var hl2 = this._hl | 0;
  for (var i = 0; i < 32; i += 2) {
    W2[i] = M.readInt32BE(i * 4);
    W2[i + 1] = M.readInt32BE(i * 4 + 4);
  }
  for (; i < 160; i += 2) {
    var xh = W2[i - 15 * 2];
    var xl = W2[i - 15 * 2 + 1];
    var gamma02 = Gamma0(xh, xl);
    var gamma0l = Gamma0l(xl, xh);
    xh = W2[i - 2 * 2];
    xl = W2[i - 2 * 2 + 1];
    var gamma12 = Gamma1(xh, xl);
    var gamma1l = Gamma1l(xl, xh);
    var Wi7h = W2[i - 7 * 2];
    var Wi7l = W2[i - 7 * 2 + 1];
    var Wi16h = W2[i - 16 * 2];
    var Wi16l = W2[i - 16 * 2 + 1];
    var Wil = gamma0l + Wi7l | 0;
    var Wih = gamma02 + Wi7h + getCarry(Wil, gamma0l) | 0;
    Wil = Wil + gamma1l | 0;
    Wih = Wih + gamma12 + getCarry(Wil, gamma1l) | 0;
    Wil = Wil + Wi16l | 0;
    Wih = Wih + Wi16h + getCarry(Wil, Wi16l) | 0;
    W2[i] = Wih;
    W2[i + 1] = Wil;
  }
  for (var j = 0; j < 160; j += 2) {
    Wih = W2[j];
    Wil = W2[j + 1];
    var majh = maj(ah, bh, ch2);
    var majl = maj(al, bl, cl);
    var sigma0h = sigma0(ah, al);
    var sigma0l = sigma0(al, ah);
    var sigma1h = sigma1(eh, el);
    var sigma1l = sigma1(el, eh);
    var Kih = K[j];
    var Kil = K[j + 1];
    var chh = Ch(eh, fh, gh);
    var chl = Ch(el, fl, gl);
    var t1l = hl2 + sigma1l | 0;
    var t1h = hh + sigma1h + getCarry(t1l, hl2) | 0;
    t1l = t1l + chl | 0;
    t1h = t1h + chh + getCarry(t1l, chl) | 0;
    t1l = t1l + Kil | 0;
    t1h = t1h + Kih + getCarry(t1l, Kil) | 0;
    t1l = t1l + Wil | 0;
    t1h = t1h + Wih + getCarry(t1l, Wil) | 0;
    var t2l = sigma0l + majl | 0;
    var t2h = sigma0h + majh + getCarry(t2l, sigma0l) | 0;
    hh = gh;
    hl2 = gl;
    gh = fh;
    gl = fl;
    fh = eh;
    fl = el;
    el = dl + t1l | 0;
    eh = dh + t1h + getCarry(el, dl) | 0;
    dh = ch2;
    dl = cl;
    ch2 = bh;
    cl = bl;
    bh = ah;
    bl = al;
    al = t1l + t2l | 0;
    ah = t1h + t2h + getCarry(al, t1l) | 0;
  }
  this._al = this._al + al | 0;
  this._bl = this._bl + bl | 0;
  this._cl = this._cl + cl | 0;
  this._dl = this._dl + dl | 0;
  this._el = this._el + el | 0;
  this._fl = this._fl + fl | 0;
  this._gl = this._gl + gl | 0;
  this._hl = this._hl + hl2 | 0;
  this._ah = this._ah + ah + getCarry(this._al, al) | 0;
  this._bh = this._bh + bh + getCarry(this._bl, bl) | 0;
  this._ch = this._ch + ch2 + getCarry(this._cl, cl) | 0;
  this._dh = this._dh + dh + getCarry(this._dl, dl) | 0;
  this._eh = this._eh + eh + getCarry(this._el, el) | 0;
  this._fh = this._fh + fh + getCarry(this._fl, fl) | 0;
  this._gh = this._gh + gh + getCarry(this._gl, gl) | 0;
  this._hh = this._hh + hh + getCarry(this._hl, hl2) | 0;
};
Sha512.prototype._hash = function() {
  var H = Buffer$2.allocUnsafe(64);
  function writeInt64BE(h, l, offset) {
    H.writeInt32BE(h, offset);
    H.writeInt32BE(l, offset + 4);
  }
  writeInt64BE(this._ah, this._al, 0);
  writeInt64BE(this._bh, this._bl, 8);
  writeInt64BE(this._ch, this._cl, 16);
  writeInt64BE(this._dh, this._dl, 24);
  writeInt64BE(this._eh, this._el, 32);
  writeInt64BE(this._fh, this._fl, 40);
  writeInt64BE(this._gh, this._gl, 48);
  writeInt64BE(this._hh, this._hl, 56);
  return H;
};
var sha512 = Sha512;
sha512.default;
var inherits$2 = require$$0$1;
var SHA512 = sha512;
var Hash$1 = hash;
var Buffer$1 = safeBufferExports.Buffer;
var W = new Array(160);
function Sha384() {
  this.init();
  this._w = W;
  Hash$1.call(this, 128, 112);
}
inherits$2(Sha384, SHA512);
Sha384.prototype.init = function() {
  this._ah = 3418070365;
  this._bh = 1654270250;
  this._ch = 2438529370;
  this._dh = 355462360;
  this._eh = 1731405415;
  this._fh = 2394180231;
  this._gh = 3675008525;
  this._hh = 1203062813;
  this._al = 3238371032;
  this._bl = 914150663;
  this._cl = 812702999;
  this._dl = 4144912697;
  this._el = 4290775857;
  this._fl = 1750603025;
  this._gl = 1694076839;
  this._hl = 3204075428;
  return this;
};
Sha384.prototype._hash = function() {
  var H = Buffer$1.allocUnsafe(48);
  function writeInt64BE(h, l, offset) {
    H.writeInt32BE(h, offset);
    H.writeInt32BE(l, offset + 4);
  }
  writeInt64BE(this._ah, this._al, 0);
  writeInt64BE(this._bh, this._bl, 8);
  writeInt64BE(this._ch, this._cl, 16);
  writeInt64BE(this._dh, this._dl, 24);
  writeInt64BE(this._eh, this._el, 32);
  writeInt64BE(this._fh, this._fl, 40);
  return H;
};
var sha384 = Sha384;
sha384.default;
var exports = sha_js.exports = function SHA(algorithm) {
  algorithm = algorithm.toLowerCase();
  var Algorithm = exports[algorithm];
  if (!Algorithm) throw new Error(algorithm + " is not supported (we accept pull requests)");
  return new Algorithm();
};
exports.sha = sha$1;
exports.sha1 = sha1;
exports.sha224 = sha224;
exports.sha256 = sha256$1;
exports.sha384 = sha384;
exports.sha512 = sha512;
var sha_jsExports = sha_js.exports;
function BufferList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}
BufferList.prototype.push = function(v) {
  var entry = { data: v, next: null };
  if (this.length > 0) this.tail.next = entry;
  else this.head = entry;
  this.tail = entry;
  ++this.length;
};
BufferList.prototype.unshift = function(v) {
  var entry = { data: v, next: this.head };
  if (this.length === 0) this.tail = entry;
  this.head = entry;
  ++this.length;
};
BufferList.prototype.shift = function() {
  if (this.length === 0) return;
  var ret = this.head.data;
  if (this.length === 1) this.head = this.tail = null;
  else this.head = this.head.next;
  --this.length;
  return ret;
};
BufferList.prototype.clear = function() {
  this.head = this.tail = null;
  this.length = 0;
};
BufferList.prototype.join = function(s) {
  if (this.length === 0) return "";
  var p = this.head;
  var ret = "" + p.data;
  while (p = p.next) {
    ret += s + p.data;
  }
  return ret;
};
BufferList.prototype.concat = function(n) {
  if (this.length === 0) return Buffer$b.alloc(0);
  if (this.length === 1) return this.head.data;
  var ret = Buffer$b.allocUnsafe(n >>> 0);
  var p = this.head;
  var i = 0;
  while (p) {
    p.data.copy(ret, i);
    i += p.data.length;
    p = p.next;
  }
  return ret;
};
Readable.ReadableState = ReadableState;
var debug = debuglog("stream");
inherits$c(Readable, EventEmitter);
function prependListener2(emitter, event, fn) {
  if (typeof emitter.prependListener === "function") {
    return emitter.prependListener(event, fn);
  } else {
    if (!emitter._events || !emitter._events[event])
      emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event]))
      emitter._events[event].unshift(fn);
    else
      emitter._events[event] = [fn, emitter._events[event]];
  }
}
function listenerCount(emitter, type) {
  return emitter.listeners(type).length;
}
function ReadableState(options, stream) {
  options = options || {};
  this.objectMode = !!options.objectMode;
  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
  this.highWaterMark = ~~this.highWaterMark;
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;
  this.sync = true;
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.defaultEncoding = options.defaultEncoding || "utf8";
  this.ranOut = false;
  this.awaitDrain = 0;
  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    this.decoder = new StringDecoder$1(options.encoding);
    this.encoding = options.encoding;
  }
}
function Readable(options) {
  if (!(this instanceof Readable)) return new Readable(options);
  this._readableState = new ReadableState(options, this);
  this.readable = true;
  if (options && typeof options.read === "function") this._read = options.read;
  EventEmitter.call(this);
}
Readable.prototype.push = function(chunk, encoding) {
  var state2 = this._readableState;
  if (!state2.objectMode && typeof chunk === "string") {
    encoding = encoding || state2.defaultEncoding;
    if (encoding !== state2.encoding) {
      chunk = Buffer$b.from(chunk, encoding);
      encoding = "";
    }
  }
  return readableAddChunk(this, state2, chunk, encoding, false);
};
Readable.prototype.unshift = function(chunk) {
  var state2 = this._readableState;
  return readableAddChunk(this, state2, chunk, "", true);
};
Readable.prototype.isPaused = function() {
  return this._readableState.flowing === false;
};
function readableAddChunk(stream, state2, chunk, encoding, addToFront) {
  var er = chunkInvalid(state2, chunk);
  if (er) {
    stream.emit("error", er);
  } else if (chunk === null) {
    state2.reading = false;
    onEofChunk(stream, state2);
  } else if (state2.objectMode || chunk && chunk.length > 0) {
    if (state2.ended && !addToFront) {
      var e = new Error("stream.push() after EOF");
      stream.emit("error", e);
    } else if (state2.endEmitted && addToFront) {
      var _e = new Error("stream.unshift() after end event");
      stream.emit("error", _e);
    } else {
      var skipAdd;
      if (state2.decoder && !addToFront && !encoding) {
        chunk = state2.decoder.write(chunk);
        skipAdd = !state2.objectMode && chunk.length === 0;
      }
      if (!addToFront) state2.reading = false;
      if (!skipAdd) {
        if (state2.flowing && state2.length === 0 && !state2.sync) {
          stream.emit("data", chunk);
          stream.read(0);
        } else {
          state2.length += state2.objectMode ? 1 : chunk.length;
          if (addToFront) state2.buffer.unshift(chunk);
          else state2.buffer.push(chunk);
          if (state2.needReadable) emitReadable(stream);
        }
      }
      maybeReadMore(stream, state2);
    }
  } else if (!addToFront) {
    state2.reading = false;
  }
  return needMoreData(state2);
}
function needMoreData(state2) {
  return !state2.ended && (state2.needReadable || state2.length < state2.highWaterMark || state2.length === 0);
}
Readable.prototype.setEncoding = function(enc) {
  this._readableState.decoder = new StringDecoder$1(enc);
  this._readableState.encoding = enc;
  return this;
};
var MAX_HWM = 8388608;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}
function howMuchToRead(n, state2) {
  if (n <= 0 || state2.length === 0 && state2.ended) return 0;
  if (state2.objectMode) return 1;
  if (n !== n) {
    if (state2.flowing && state2.length) return state2.buffer.head.data.length;
    else return state2.length;
  }
  if (n > state2.highWaterMark) state2.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state2.length) return n;
  if (!state2.ended) {
    state2.needReadable = true;
    return 0;
  }
  return state2.length;
}
Readable.prototype.read = function(n) {
  debug("read", n);
  n = parseInt(n, 10);
  var state2 = this._readableState;
  var nOrig = n;
  if (n !== 0) state2.emittedReadable = false;
  if (n === 0 && state2.needReadable && (state2.length >= state2.highWaterMark || state2.ended)) {
    debug("read: emitReadable", state2.length, state2.ended);
    if (state2.length === 0 && state2.ended) endReadable(this);
    else emitReadable(this);
    return null;
  }
  n = howMuchToRead(n, state2);
  if (n === 0 && state2.ended) {
    if (state2.length === 0) endReadable(this);
    return null;
  }
  var doRead = state2.needReadable;
  debug("need readable", doRead);
  if (state2.length === 0 || state2.length - n < state2.highWaterMark) {
    doRead = true;
    debug("length less than watermark", doRead);
  }
  if (state2.ended || state2.reading) {
    doRead = false;
    debug("reading or ended", doRead);
  } else if (doRead) {
    debug("do read");
    state2.reading = true;
    state2.sync = true;
    if (state2.length === 0) state2.needReadable = true;
    this._read(state2.highWaterMark);
    state2.sync = false;
    if (!state2.reading) n = howMuchToRead(nOrig, state2);
  }
  var ret;
  if (n > 0) ret = fromList(n, state2);
  else ret = null;
  if (ret === null) {
    state2.needReadable = true;
    n = 0;
  } else {
    state2.length -= n;
  }
  if (state2.length === 0) {
    if (!state2.ended) state2.needReadable = true;
    if (nOrig !== n && state2.ended) endReadable(this);
  }
  if (ret !== null) this.emit("data", ret);
  return ret;
};
function chunkInvalid(state2, chunk) {
  var er = null;
  if (!Buffer$b.isBuffer(chunk) && typeof chunk !== "string" && chunk !== null && chunk !== void 0 && !state2.objectMode) {
    er = new TypeError("Invalid non-string/buffer chunk");
  }
  return er;
}
function onEofChunk(stream, state2) {
  if (state2.ended) return;
  if (state2.decoder) {
    var chunk = state2.decoder.end();
    if (chunk && chunk.length) {
      state2.buffer.push(chunk);
      state2.length += state2.objectMode ? 1 : chunk.length;
    }
  }
  state2.ended = true;
  emitReadable(stream);
}
function emitReadable(stream) {
  var state2 = stream._readableState;
  state2.needReadable = false;
  if (!state2.emittedReadable) {
    debug("emitReadable", state2.flowing);
    state2.emittedReadable = true;
    if (state2.sync) nextTick(emitReadable_, stream);
    else emitReadable_(stream);
  }
}
function emitReadable_(stream) {
  debug("emit readable");
  stream.emit("readable");
  flow(stream);
}
function maybeReadMore(stream, state2) {
  if (!state2.readingMore) {
    state2.readingMore = true;
    nextTick(maybeReadMore_, stream, state2);
  }
}
function maybeReadMore_(stream, state2) {
  var len = state2.length;
  while (!state2.reading && !state2.flowing && !state2.ended && state2.length < state2.highWaterMark) {
    debug("maybeReadMore read 0");
    stream.read(0);
    if (len === state2.length)
      break;
    else len = state2.length;
  }
  state2.readingMore = false;
}
Readable.prototype._read = function(n) {
  this.emit("error", new Error("not implemented"));
};
Readable.prototype.pipe = function(dest, pipeOpts) {
  var src = this;
  var state2 = this._readableState;
  switch (state2.pipesCount) {
    case 0:
      state2.pipes = dest;
      break;
    case 1:
      state2.pipes = [state2.pipes, dest];
      break;
    default:
      state2.pipes.push(dest);
      break;
  }
  state2.pipesCount += 1;
  debug("pipe count=%d opts=%j", state2.pipesCount, pipeOpts);
  var doEnd = !pipeOpts || pipeOpts.end !== false;
  var endFn = doEnd ? onend2 : cleanup;
  if (state2.endEmitted) nextTick(endFn);
  else src.once("end", endFn);
  dest.on("unpipe", onunpipe);
  function onunpipe(readable) {
    debug("onunpipe");
    if (readable === src) {
      cleanup();
    }
  }
  function onend2() {
    debug("onend");
    dest.end();
  }
  var ondrain = pipeOnDrain(src);
  dest.on("drain", ondrain);
  var cleanedUp = false;
  function cleanup() {
    debug("cleanup");
    dest.removeListener("close", onclose);
    dest.removeListener("finish", onfinish);
    dest.removeListener("drain", ondrain);
    dest.removeListener("error", onerror);
    dest.removeListener("unpipe", onunpipe);
    src.removeListener("end", onend2);
    src.removeListener("end", cleanup);
    src.removeListener("data", ondata);
    cleanedUp = true;
    if (state2.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }
  var increasedAwaitDrain = false;
  src.on("data", ondata);
  function ondata(chunk) {
    debug("ondata");
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      if ((state2.pipesCount === 1 && state2.pipes === dest || state2.pipesCount > 1 && indexOf2(state2.pipes, dest) !== -1) && !cleanedUp) {
        debug("false write response, pause", src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }
  function onerror(er) {
    debug("onerror", er);
    unpipe();
    dest.removeListener("error", onerror);
    if (listenerCount(dest, "error") === 0) dest.emit("error", er);
  }
  prependListener2(dest, "error", onerror);
  function onclose() {
    dest.removeListener("finish", onfinish);
    unpipe();
  }
  dest.once("close", onclose);
  function onfinish() {
    debug("onfinish");
    dest.removeListener("close", onclose);
    unpipe();
  }
  dest.once("finish", onfinish);
  function unpipe() {
    debug("unpipe");
    src.unpipe(dest);
  }
  dest.emit("pipe", src);
  if (!state2.flowing) {
    debug("pipe resume");
    src.resume();
  }
  return dest;
};
function pipeOnDrain(src) {
  return function() {
    var state2 = src._readableState;
    debug("pipeOnDrain", state2.awaitDrain);
    if (state2.awaitDrain) state2.awaitDrain--;
    if (state2.awaitDrain === 0 && src.listeners("data").length) {
      state2.flowing = true;
      flow(src);
    }
  };
}
Readable.prototype.unpipe = function(dest) {
  var state2 = this._readableState;
  if (state2.pipesCount === 0) return this;
  if (state2.pipesCount === 1) {
    if (dest && dest !== state2.pipes) return this;
    if (!dest) dest = state2.pipes;
    state2.pipes = null;
    state2.pipesCount = 0;
    state2.flowing = false;
    if (dest) dest.emit("unpipe", this);
    return this;
  }
  if (!dest) {
    var dests = state2.pipes;
    var len = state2.pipesCount;
    state2.pipes = null;
    state2.pipesCount = 0;
    state2.flowing = false;
    for (var _i = 0; _i < len; _i++) {
      dests[_i].emit("unpipe", this);
    }
    return this;
  }
  var i = indexOf2(state2.pipes, dest);
  if (i === -1) return this;
  state2.pipes.splice(i, 1);
  state2.pipesCount -= 1;
  if (state2.pipesCount === 1) state2.pipes = state2.pipes[0];
  dest.emit("unpipe", this);
  return this;
};
Readable.prototype.on = function(ev, fn) {
  var res = EventEmitter.prototype.on.call(this, ev, fn);
  if (ev === "data") {
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === "readable") {
    var state2 = this._readableState;
    if (!state2.endEmitted && !state2.readableListening) {
      state2.readableListening = state2.needReadable = true;
      state2.emittedReadable = false;
      if (!state2.reading) {
        nextTick(nReadingNextTick, this);
      } else if (state2.length) {
        emitReadable(this);
      }
    }
  }
  return res;
};
Readable.prototype.addListener = Readable.prototype.on;
function nReadingNextTick(self2) {
  debug("readable nexttick read 0");
  self2.read(0);
}
Readable.prototype.resume = function() {
  var state2 = this._readableState;
  if (!state2.flowing) {
    debug("resume");
    state2.flowing = true;
    resume(this, state2);
  }
  return this;
};
function resume(stream, state2) {
  if (!state2.resumeScheduled) {
    state2.resumeScheduled = true;
    nextTick(resume_, stream, state2);
  }
}
function resume_(stream, state2) {
  if (!state2.reading) {
    debug("resume read 0");
    stream.read(0);
  }
  state2.resumeScheduled = false;
  state2.awaitDrain = 0;
  stream.emit("resume");
  flow(stream);
  if (state2.flowing && !state2.reading) stream.read(0);
}
Readable.prototype.pause = function() {
  debug("call pause flowing=%j", this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug("pause");
    this._readableState.flowing = false;
    this.emit("pause");
  }
  return this;
};
function flow(stream) {
  var state2 = stream._readableState;
  debug("flow", state2.flowing);
  while (state2.flowing && stream.read() !== null) {
  }
}
Readable.prototype.wrap = function(stream) {
  var state2 = this._readableState;
  var paused = false;
  var self2 = this;
  stream.on("end", function() {
    debug("wrapped end");
    if (state2.decoder && !state2.ended) {
      var chunk = state2.decoder.end();
      if (chunk && chunk.length) self2.push(chunk);
    }
    self2.push(null);
  });
  stream.on("data", function(chunk) {
    debug("wrapped data");
    if (state2.decoder) chunk = state2.decoder.write(chunk);
    if (state2.objectMode && (chunk === null || chunk === void 0)) return;
    else if (!state2.objectMode && (!chunk || !chunk.length)) return;
    var ret = self2.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });
  for (var i in stream) {
    if (this[i] === void 0 && typeof stream[i] === "function") {
      this[i] = /* @__PURE__ */ (function(method) {
        return function() {
          return stream[method].apply(stream, arguments);
        };
      })(i);
    }
  }
  var events = ["error", "close", "destroy", "pause", "resume"];
  forEach(events, function(ev) {
    stream.on(ev, self2.emit.bind(self2, ev));
  });
  self2._read = function(n) {
    debug("wrapped _read", n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };
  return self2;
};
Readable._fromList = fromList;
function fromList(n, state2) {
  if (state2.length === 0) return null;
  var ret;
  if (state2.objectMode) ret = state2.buffer.shift();
  else if (!n || n >= state2.length) {
    if (state2.decoder) ret = state2.buffer.join("");
    else if (state2.buffer.length === 1) ret = state2.buffer.head.data;
    else ret = state2.buffer.concat(state2.length);
    state2.buffer.clear();
  } else {
    ret = fromListPartial(n, state2.buffer, state2.decoder);
  }
  return ret;
}
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    ret = list.shift();
  } else {
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;
    else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;
        else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}
function copyFromBuffer(n, list) {
  var ret = Buffer$b.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;
        else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}
function endReadable(stream) {
  var state2 = stream._readableState;
  if (state2.length > 0) throw new Error('"endReadable()" called on non-empty stream');
  if (!state2.endEmitted) {
    state2.ended = true;
    nextTick(endReadableNT, state2, stream);
  }
}
function endReadableNT(state2, stream) {
  if (!state2.endEmitted && state2.length === 0) {
    state2.endEmitted = true;
    stream.readable = false;
    stream.emit("end");
  }
}
function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}
function indexOf2(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
Writable.WritableState = WritableState;
inherits$c(Writable, EventEmitter);
function nop() {
}
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}
function WritableState(options, stream) {
  Object.defineProperty(this, "buffer", {
    get: deprecate(function() {
      return this.getBuffer();
    }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")
  });
  options = options || {};
  this.objectMode = !!options.objectMode;
  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
  this.highWaterMark = ~~this.highWaterMark;
  this.needDrain = false;
  this.ending = false;
  this.ended = false;
  this.finished = false;
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;
  this.defaultEncoding = options.defaultEncoding || "utf8";
  this.length = 0;
  this.writing = false;
  this.corked = 0;
  this.sync = true;
  this.bufferProcessing = false;
  this.onwrite = function(er) {
    onwrite(stream, er);
  };
  this.writecb = null;
  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null;
  this.pendingcb = 0;
  this.prefinished = false;
  this.errorEmitted = false;
  this.bufferedRequestCount = 0;
  this.corkedRequestsFree = new CorkedRequest(this);
}
WritableState.prototype.getBuffer = function writableStateGetBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};
function Writable(options) {
  if (!(this instanceof Writable) && !(this instanceof Duplex)) return new Writable(options);
  this._writableState = new WritableState(options, this);
  this.writable = true;
  if (options) {
    if (typeof options.write === "function") this._write = options.write;
    if (typeof options.writev === "function") this._writev = options.writev;
  }
  EventEmitter.call(this);
}
Writable.prototype.pipe = function() {
  this.emit("error", new Error("Cannot pipe, not readable"));
};
function writeAfterEnd(stream, cb) {
  var er = new Error("write after end");
  stream.emit("error", er);
  nextTick(cb, er);
}
function validChunk(stream, state2, chunk, cb) {
  var valid = true;
  var er = false;
  if (chunk === null) {
    er = new TypeError("May not write null values to stream");
  } else if (!Buffer$b.isBuffer(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state2.objectMode) {
    er = new TypeError("Invalid non-string/buffer chunk");
  }
  if (er) {
    stream.emit("error", er);
    nextTick(cb, er);
    valid = false;
  }
  return valid;
}
Writable.prototype.write = function(chunk, encoding, cb) {
  var state2 = this._writableState;
  var ret = false;
  if (typeof encoding === "function") {
    cb = encoding;
    encoding = null;
  }
  if (Buffer$b.isBuffer(chunk)) encoding = "buffer";
  else if (!encoding) encoding = state2.defaultEncoding;
  if (typeof cb !== "function") cb = nop;
  if (state2.ended) writeAfterEnd(this, cb);
  else if (validChunk(this, state2, chunk, cb)) {
    state2.pendingcb++;
    ret = writeOrBuffer(this, state2, chunk, encoding, cb);
  }
  return ret;
};
Writable.prototype.cork = function() {
  var state2 = this._writableState;
  state2.corked++;
};
Writable.prototype.uncork = function() {
  var state2 = this._writableState;
  if (state2.corked) {
    state2.corked--;
    if (!state2.writing && !state2.corked && !state2.finished && !state2.bufferProcessing && state2.bufferedRequest) clearBuffer(this, state2);
  }
};
Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  if (typeof encoding === "string") encoding = encoding.toLowerCase();
  if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};
function decodeChunk(state2, chunk, encoding) {
  if (!state2.objectMode && state2.decodeStrings !== false && typeof chunk === "string") {
    chunk = Buffer$b.from(chunk, encoding);
  }
  return chunk;
}
function writeOrBuffer(stream, state2, chunk, encoding, cb) {
  chunk = decodeChunk(state2, chunk, encoding);
  if (Buffer$b.isBuffer(chunk)) encoding = "buffer";
  var len = state2.objectMode ? 1 : chunk.length;
  state2.length += len;
  var ret = state2.length < state2.highWaterMark;
  if (!ret) state2.needDrain = true;
  if (state2.writing || state2.corked) {
    var last = state2.lastBufferedRequest;
    state2.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state2.lastBufferedRequest;
    } else {
      state2.bufferedRequest = state2.lastBufferedRequest;
    }
    state2.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state2, false, len, chunk, encoding, cb);
  }
  return ret;
}
function doWrite(stream, state2, writev, len, chunk, encoding, cb) {
  state2.writelen = len;
  state2.writecb = cb;
  state2.writing = true;
  state2.sync = true;
  if (writev) stream._writev(chunk, state2.onwrite);
  else stream._write(chunk, encoding, state2.onwrite);
  state2.sync = false;
}
function onwriteError(stream, state2, sync, er, cb) {
  --state2.pendingcb;
  if (sync) nextTick(cb, er);
  else cb(er);
  stream._writableState.errorEmitted = true;
  stream.emit("error", er);
}
function onwriteStateUpdate(state2) {
  state2.writing = false;
  state2.writecb = null;
  state2.length -= state2.writelen;
  state2.writelen = 0;
}
function onwrite(stream, er) {
  var state2 = stream._writableState;
  var sync = state2.sync;
  var cb = state2.writecb;
  onwriteStateUpdate(state2);
  if (er) onwriteError(stream, state2, sync, er, cb);
  else {
    var finished = needFinish(state2);
    if (!finished && !state2.corked && !state2.bufferProcessing && state2.bufferedRequest) {
      clearBuffer(stream, state2);
    }
    if (sync) {
      nextTick(afterWrite, stream, state2, finished, cb);
    } else {
      afterWrite(stream, state2, finished, cb);
    }
  }
}
function afterWrite(stream, state2, finished, cb) {
  if (!finished) onwriteDrain(stream, state2);
  state2.pendingcb--;
  cb();
  finishMaybe(stream, state2);
}
function onwriteDrain(stream, state2) {
  if (state2.length === 0 && state2.needDrain) {
    state2.needDrain = false;
    stream.emit("drain");
  }
}
function clearBuffer(stream, state2) {
  state2.bufferProcessing = true;
  var entry = state2.bufferedRequest;
  if (stream._writev && entry && entry.next) {
    var l = state2.bufferedRequestCount;
    var buffer = new Array(l);
    var holder2 = state2.corkedRequestsFree;
    holder2.entry = entry;
    var count = 0;
    while (entry) {
      buffer[count] = entry;
      entry = entry.next;
      count += 1;
    }
    doWrite(stream, state2, true, state2.length, buffer, "", holder2.finish);
    state2.pendingcb++;
    state2.lastBufferedRequest = null;
    if (holder2.next) {
      state2.corkedRequestsFree = holder2.next;
      holder2.next = null;
    } else {
      state2.corkedRequestsFree = new CorkedRequest(state2);
    }
  } else {
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state2.objectMode ? 1 : chunk.length;
      doWrite(stream, state2, false, len, chunk, encoding, cb);
      entry = entry.next;
      if (state2.writing) {
        break;
      }
    }
    if (entry === null) state2.lastBufferedRequest = null;
  }
  state2.bufferedRequestCount = 0;
  state2.bufferedRequest = entry;
  state2.bufferProcessing = false;
}
Writable.prototype._write = function(chunk, encoding, cb) {
  cb(new Error("not implemented"));
};
Writable.prototype._writev = null;
Writable.prototype.end = function(chunk, encoding, cb) {
  var state2 = this._writableState;
  if (typeof chunk === "function") {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === "function") {
    cb = encoding;
    encoding = null;
  }
  if (chunk !== null && chunk !== void 0) this.write(chunk, encoding);
  if (state2.corked) {
    state2.corked = 1;
    this.uncork();
  }
  if (!state2.ending && !state2.finished) endWritable(this, state2, cb);
};
function needFinish(state2) {
  return state2.ending && state2.length === 0 && state2.bufferedRequest === null && !state2.finished && !state2.writing;
}
function prefinish(stream, state2) {
  if (!state2.prefinished) {
    state2.prefinished = true;
    stream.emit("prefinish");
  }
}
function finishMaybe(stream, state2) {
  var need = needFinish(state2);
  if (need) {
    if (state2.pendingcb === 0) {
      prefinish(stream, state2);
      state2.finished = true;
      stream.emit("finish");
    } else {
      prefinish(stream, state2);
    }
  }
  return need;
}
function endWritable(stream, state2, cb) {
  state2.ending = true;
  finishMaybe(stream, state2);
  if (cb) {
    if (state2.finished) nextTick(cb);
    else stream.once("finish", cb);
  }
  state2.ended = true;
  stream.writable = false;
}
function CorkedRequest(state2) {
  var _this = this;
  this.next = null;
  this.entry = null;
  this.finish = function(err) {
    var entry = _this.entry;
    _this.entry = null;
    while (entry) {
      var cb = entry.callback;
      state2.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    if (state2.corkedRequestsFree) {
      state2.corkedRequestsFree.next = _this;
    } else {
      state2.corkedRequestsFree = _this;
    }
  };
}
inherits$c(Duplex, Readable);
var keys = Object.keys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}
function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  if (options && options.readable === false) this.readable = false;
  if (options && options.writable === false) this.writable = false;
  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
  this.once("end", onend);
}
function onend() {
  if (this.allowHalfOpen || this._writableState.ended) return;
  nextTick(onEndNT, this);
}
function onEndNT(self2) {
  self2.end();
}
inherits$c(Transform$1, Duplex);
function TransformState(stream) {
  this.afterTransform = function(er, data) {
    return afterTransform(stream, er, data);
  };
  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}
function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;
  var cb = ts.writecb;
  if (!cb) return stream.emit("error", new Error("no writecb in Transform class"));
  ts.writechunk = null;
  ts.writecb = null;
  if (data !== null && data !== void 0) stream.push(data);
  cb(er);
  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}
function Transform$1(options) {
  if (!(this instanceof Transform$1)) return new Transform$1(options);
  Duplex.call(this, options);
  this._transformState = new TransformState(this);
  var stream = this;
  this._readableState.needReadable = true;
  this._readableState.sync = false;
  if (options) {
    if (typeof options.transform === "function") this._transform = options.transform;
    if (typeof options.flush === "function") this._flush = options.flush;
  }
  this.once("prefinish", function() {
    if (typeof this._flush === "function") this._flush(function(er) {
      done(stream, er);
    });
    else done(stream);
  });
}
Transform$1.prototype.push = function(chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};
Transform$1.prototype._transform = function(chunk, encoding, cb) {
  throw new Error("Not implemented");
};
Transform$1.prototype._write = function(chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};
Transform$1.prototype._read = function(n) {
  var ts = this._transformState;
  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    ts.needTransform = true;
  }
};
function done(stream, er) {
  if (er) return stream.emit("error", er);
  var ws2 = stream._writableState;
  var ts = stream._transformState;
  if (ws2.length) throw new Error("Calling transform done when ws.length != 0");
  if (ts.transforming) throw new Error("Calling transform done when still transforming");
  return stream.push(null);
}
inherits$c(PassThrough, Transform$1);
function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform$1.call(this, options);
}
PassThrough.prototype._transform = function(chunk, encoding, cb) {
  cb(null, chunk);
};
inherits$c(Stream, EventEmitter);
Stream.Readable = Readable;
Stream.Writable = Writable;
Stream.Duplex = Duplex;
Stream.Transform = Transform$1;
Stream.PassThrough = PassThrough;
Stream.Stream = Stream;
function Stream() {
  EventEmitter.call(this);
}
Stream.prototype.pipe = function(dest, options) {
  var source = this;
  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }
  source.on("data", ondata);
  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }
  dest.on("drain", ondrain);
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on("end", onend2);
    source.on("close", onclose);
  }
  var didOnEnd = false;
  function onend2() {
    if (didOnEnd) return;
    didOnEnd = true;
    dest.end();
  }
  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;
    if (typeof dest.destroy === "function") dest.destroy();
  }
  function onerror(er) {
    cleanup();
    if (EventEmitter.listenerCount(this, "error") === 0) {
      throw er;
    }
  }
  source.on("error", onerror);
  dest.on("error", onerror);
  function cleanup() {
    source.removeListener("data", ondata);
    dest.removeListener("drain", ondrain);
    source.removeListener("end", onend2);
    source.removeListener("close", onclose);
    source.removeListener("error", onerror);
    dest.removeListener("error", onerror);
    source.removeListener("end", cleanup);
    source.removeListener("close", cleanup);
    dest.removeListener("close", cleanup);
  }
  source.on("end", cleanup);
  source.on("close", cleanup);
  dest.on("close", cleanup);
  dest.emit("pipe", source);
  return dest;
};
var _polyfillNode_stream = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Duplex,
  PassThrough,
  Readable,
  Stream,
  Transform: Transform$1,
  Writable,
  default: Stream
});
var require$$1$1 = /* @__PURE__ */ getAugmentedNamespace(_polyfillNode_stream);
var Buffer = safeBufferExports.Buffer;
var Transform = require$$1$1.Transform;
var StringDecoder = require$$2.StringDecoder;
var inherits$1 = require$$0$1;
function CipherBase(hashMode) {
  Transform.call(this);
  this.hashMode = typeof hashMode === "string";
  if (this.hashMode) {
    this[hashMode] = this._finalOrDigest;
  } else {
    this.final = this._finalOrDigest;
  }
  if (this._final) {
    this.__final = this._final;
    this._final = null;
  }
  this._decoder = null;
  this._encoding = null;
}
inherits$1(CipherBase, Transform);
CipherBase.prototype.update = function(data, inputEnc, outputEnc) {
  if (typeof data === "string") {
    data = Buffer.from(data, inputEnc);
  }
  var outData = this._update(data);
  if (this.hashMode) return this;
  if (outputEnc) {
    outData = this._toString(outData, outputEnc);
  }
  return outData;
};
CipherBase.prototype.setAutoPadding = function() {
};
CipherBase.prototype.getAuthTag = function() {
  throw new Error("trying to get auth tag in unsupported state");
};
CipherBase.prototype.setAuthTag = function() {
  throw new Error("trying to set auth tag in unsupported state");
};
CipherBase.prototype.setAAD = function() {
  throw new Error("trying to set aad in unsupported state");
};
CipherBase.prototype._transform = function(data, _2, next) {
  var err;
  try {
    if (this.hashMode) {
      this._update(data);
    } else {
      this.push(this._update(data));
    }
  } catch (e) {
    err = e;
  } finally {
    next(err);
  }
};
CipherBase.prototype._flush = function(done2) {
  var err;
  try {
    this.push(this.__final());
  } catch (e) {
    err = e;
  }
  done2(err);
};
CipherBase.prototype._finalOrDigest = function(outputEnc) {
  var outData = this.__final() || Buffer.alloc(0);
  if (outputEnc) {
    outData = this._toString(outData, outputEnc, true);
  }
  return outData;
};
CipherBase.prototype._toString = function(value, enc, fin) {
  if (!this._decoder) {
    this._decoder = new StringDecoder(enc);
    this._encoding = enc;
  }
  if (this._encoding !== enc) throw new Error("can't switch encodings");
  var out = this._decoder.write(value);
  if (fin) {
    out += this._decoder.end();
  }
  return out;
};
var cipherBase = CipherBase;
cipherBase.default;
var inherits = require$$0$1;
var MD5 = md5_js;
var RIPEMD160 = ripemd160;
var sha = sha_jsExports;
var Base = cipherBase;
function Hash(hash2) {
  Base.call(this, "digest");
  this._hash = hash2;
}
inherits(Hash, Base);
Hash.prototype._update = function(data) {
  this._hash.update(data);
};
Hash.prototype._final = function() {
  return this._hash.digest();
};
var browser = function createHash(alg) {
  alg = alg.toLowerCase();
  if (alg === "md5") return new MD5();
  if (alg === "rmd160" || alg === "ripemd160") return new RIPEMD160();
  return new Hash(sha(alg));
};
browser.default;
var win;
if (typeof window !== "undefined") {
  win = window;
} else if (typeof commonjsGlobal !== "undefined") {
  win = commonjsGlobal;
} else if (typeof self !== "undefined") {
  win = self;
} else {
  win = {};
}
var window_1 = win;
window_1.default;
var _polyfillNode_crypto = {};
var _polyfillNode_crypto$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: _polyfillNode_crypto
});
var require$$1 = /* @__PURE__ */ getAugmentedNamespace(_polyfillNode_crypto$1);
var window$1 = window_1;
var nodeCrypto = require$$1;
function getRandomValues$1(buf) {
  if (window$1.crypto && window$1.crypto.getRandomValues) {
    return window$1.crypto.getRandomValues(buf);
  }
  if (typeof window$1.msCrypto === "object" && typeof window$1.msCrypto.getRandomValues === "function") {
    return window$1.msCrypto.getRandomValues(buf);
  }
  if (nodeCrypto.randomBytes) {
    if (!(buf instanceof Uint8Array)) {
      throw new TypeError("expected Uint8Array");
    }
    if (buf.length > 65536) {
      var e = new Error();
      e.code = 22;
      e.message = "Failed to execute 'getRandomValues' on 'Crypto': The ArrayBufferView's byte length (" + buf.length + ") exceeds the number of bytes of entropy available via this API (65536).";
      e.name = "QuotaExceededError";
      throw e;
    }
    var bytes = nodeCrypto.randomBytes(buf.length);
    buf.set(bytes);
    return buf;
  } else {
    throw new Error("No secure random number generator available.");
  }
}
var getRandomValues_1 = getRandomValues$1;
getRandomValues_1.default;
Object.defineProperty(scatter, "__esModule", { value: true });
var WebSocket$1 = browser$3;
var createHash2 = browser;
var getRandomValues = getRandomValues_1;
var _ = require$$3$1;
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var WebSocket__default = /* @__PURE__ */ _interopDefaultLegacy(WebSocket$1);
var createHash__default = /* @__PURE__ */ _interopDefaultLegacy(createHash2);
var getRandomValues__default = /* @__PURE__ */ _interopDefaultLegacy(getRandomValues);
const Blockchains = {
  EOS: "eos",
  ETH: "eth",
  TRX: "trx"
};
Object.keys(Blockchains).map((key) => ({ key, value: Blockchains[key] }));
class Token {
  constructor(blockchain = Blockchains.EOS, contract = "", symbol = "", name2 = null, decimals = null) {
    this.blockchain = blockchain;
    this.contract = contract;
    this.symbol = symbol;
    this.name = name2 ? name2 : symbol;
    this.decimals = decimals;
  }
  static placeholder() {
    return new Token();
  }
  static fromJson(json) {
    return Object.assign(this.placeholder(), json);
  }
}
const BLOCKCHAIN_SUPPORT = "blockchain_support";
const WALLET_SUPPORT = "wallet_support";
var PluginTypes = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BLOCKCHAIN_SUPPORT,
  WALLET_SUPPORT
});
class Plugin {
  constructor(_name = "", _type = "") {
    this.name = _name;
    this.type = _type;
  }
  static placeholder() {
    return new Plugin();
  }
  static fromJson(json) {
    return Object.assign(Plugin.placeholder(), json);
  }
  isSignatureProvider() {
    return this.type === BLOCKCHAIN_SUPPORT;
  }
  isValid() {
    return Object.keys(PluginTypes).map((x) => PluginTypes[x]).includes(this.type);
  }
}
const WALLET_METHODS = {
  disconnect: "disconnect",
  isConnected: "isConnected",
  isPaired: "isPaired",
  addEventHandler: "addEventHandler",
  removeEventHandler: "removeEventHandler",
  listen: "listen",
  getVersion: "getVersion",
  getIdentity: "getIdentity",
  getAllAccountsFor: "getAllAccountsFor",
  getIdentityFromPermissions: "getIdentityFromPermissions",
  forgetIdentity: "forgetIdentity",
  updateIdentity: "updateIdentity",
  authenticate: "authenticate",
  getArbitrarySignature: "getArbitrarySignature",
  getPublicKey: "getPublicKey",
  linkAccount: "linkAccount",
  hasAccountFor: "hasAccountFor",
  suggestNetwork: "suggestNetwork",
  requestTransfer: "requestTransfer",
  getAvatar: "getAvatar",
  requestSignature: "requestSignature",
  createTransaction: "createTransaction",
  addToken: "addToken",
  createEncryptionKey: "createEncryptionKey"
};
const ALTERNATES = {
  [WALLET_METHODS.getIdentity]: "login",
  [WALLET_METHODS.getAllAccountsFor]: "loginAll",
  [WALLET_METHODS.forgetIdentity]: "logout",
  [WALLET_METHODS.getIdentityFromPermissions]: "checkLogin"
};
class WalletInterface {
  constructor(identifier, methods, context) {
    const unavailable = (method) => () => {
      console.error(`${identifier} does not support the ${method} method.`);
      throw new Error(`${identifier} does not support the ${method} method.`);
    };
    const bindToContext = (method, key) => {
      if (typeof context[key] === "undefined") {
        context[key] = method ? method : unavailable(key);
      }
      if (ALTERNATES[key] && typeof context[ALTERNATES[key]] === "undefined") {
        context[ALTERNATES[key]] = context[key] ? context[key] : unavailable(key);
      }
    };
    Object.keys(WALLET_METHODS).map((key) => bindToContext(methods[key], key));
  }
  static bindBasics(context) {
    context.account = (blockchain) => {
      if (!context.identity) return;
      if (!context.identity.accounts) return;
      return context.identity.accounts.find((x) => x.blockchain === blockchain);
    };
  }
}
class WalletAPI {
  static getMethods(context, wallet) {
    const setAndReturnId = (id, forget) => {
      if (id || forget) context.holderFns.get().identity = id;
      return forget || id;
    };
    return {
      [WALLET_METHODS.disconnect]: () => wallet().disconnect(),
      [WALLET_METHODS.isConnected]: () => wallet().isConnected(),
      [WALLET_METHODS.isPaired]: () => wallet().isPaired(),
      [WALLET_METHODS.addEventHandler]: (handler, key = null) => wallet().addEventHandler(handler, key),
      [WALLET_METHODS.removeEventHandler]: (key = null) => wallet().removeEventHandler(key),
      [WALLET_METHODS.listen]: (handler) => wallet().addEventHandler(handler),
      [WALLET_METHODS.getVersion]: () => wallet().sendApiRequest({ type: "getVersion", payload: {} }),
      [WALLET_METHODS.getIdentity]: (requiredFields) => wallet().sendApiRequest({
        type: "getOrRequestIdentity",
        payload: { fields: requiredFields ? requiredFields : { accounts: [context.holderFns.get().network] } }
      }).then(setAndReturnId),
      [WALLET_METHODS.getAllAccountsFor]: (requiredFields) => wallet().sendApiRequest({
        type: "getAllAccountsFor",
        payload: { fields: requiredFields ? requiredFields : { accounts: [context.holderFns.get().network] } }
      }).then(setAndReturnId),
      [WALLET_METHODS.getIdentityFromPermissions]: () => wallet().sendApiRequest({
        type: "identityFromPermissions",
        payload: {}
      }).then(setAndReturnId),
      [WALLET_METHODS.forgetIdentity]: () => wallet().sendApiRequest({
        type: "forgetIdentity",
        payload: {}
      }).then((res) => setAndReturnId(null, res)),
      [WALLET_METHODS.updateIdentity]: ({ name: name2, kyc }) => wallet().sendApiRequest({
        type: "updateIdentity",
        payload: { name: name2, kyc }
      }).then((id) => id ? setAndReturnId(id) : null),
      [WALLET_METHODS.authenticate]: (nonce, data = null, publicKey = null) => wallet().sendApiRequest({
        type: "authenticate",
        payload: { nonce, data, publicKey }
      }),
      [WALLET_METHODS.getArbitrarySignature]: (publicKey, data) => wallet().sendApiRequest({
        type: "requestArbitrarySignature",
        payload: { publicKey, data }
      }),
      [WALLET_METHODS.getPublicKey]: (blockchain) => wallet().sendApiRequest({
        type: "getPublicKey",
        payload: { blockchain }
      }),
      [WALLET_METHODS.linkAccount]: (account, network) => wallet().sendApiRequest({
        type: "linkAccount",
        payload: { account, network: network || context.holderFns.get().network }
      }),
      [WALLET_METHODS.hasAccountFor]: (network) => wallet().sendApiRequest({
        type: "hasAccountFor",
        payload: { network: network || context.holderFns.get().network }
      }),
      [WALLET_METHODS.suggestNetwork]: (network) => wallet().sendApiRequest({
        type: "requestAddNetwork",
        payload: { network: network || context.holderFns.get().network }
      }),
      [WALLET_METHODS.requestTransfer]: (network, to, amount, options = {}) => wallet().sendApiRequest({
        type: "requestTransfer",
        payload: { network: network || context.holderFns.get().network, to, amount, options }
      }),
      [WALLET_METHODS.getAvatar]: () => wallet().sendApiRequest({
        type: "getAvatar",
        payload: {}
      }),
      [WALLET_METHODS.requestSignature]: (payload) => wallet().sendApiRequest({
        type: "requestSignature",
        payload
      }),
      [WALLET_METHODS.createTransaction]: (blockchain, actions, account, network) => wallet().sendApiRequest({
        type: "createTransaction",
        payload: { blockchain, actions, account, network: network || context.holderFns.get().network }
      }),
      [WALLET_METHODS.addToken]: (token, network) => wallet().sendApiRequest({
        type: "addToken",
        payload: { token, network: network || context.holderFns.get().network }
      }),
      [WALLET_METHODS.createEncryptionKey]: (scatterPublicKey, otherPublicKey, nonce = null) => wallet().sendApiRequest({
        type: "createEncryptionKey",
        payload: { scatterPublicKey, otherPublicKey, nonce }
      })
    };
  }
}
let isAvailable$1 = false;
if (typeof document !== "undefined") {
  document.addEventListener("walletLoaded", () => isAvailable$1 = true);
}
const checkForWallet = () => {
  if (typeof window !== "undefined" && typeof window.wallet !== "undefined") {
    isAvailable$1 = true;
    return true;
  }
  return false;
};
const pollExistence$1 = async (resolver = null, tries = 0) => {
  return new Promise((r) => {
    if (!resolver) resolver = r;
    if (isAvailable$1 || checkForWallet()) return resolver(true);
    if (tries > 5) return resolver(false);
    setTimeout(() => pollExistence$1(resolver, tries + 1), 100);
  });
};
class Injection extends Plugin {
  constructor(context, holderFns2) {
    super("InjectedWalletV2", WALLET_SUPPORT);
    this.name = "InjectedWalletV2";
    this.context = context;
    this.holderFns = holderFns2;
  }
  async connect() {
    return new Promise(async (resolve) => {
      const found = await pollExistence$1();
      if (found) {
        if (this.holderFns && !this.holderFns.get().wallet) this.holderFns.get().wallet = this.name;
        resolve({
          disconnect: () => {
          },
          sendApiRequest: window.wallet.sendApiRequest
        });
      }
    });
  }
  async runAfterInterfacing() {
    this.holderFns.get().identity = await this.holderFns.get().getIdentityFromPermissions();
    return true;
  }
  methods() {
    return WalletAPI.getMethods(this, () => window.wallet);
  }
}
class Network {
  constructor(_name = "", _protocol = "https", _host = "", _port = 0, blockchain = Blockchains.EOS, chainId = "") {
    this.name = _name;
    this.protocol = _protocol;
    this.host = _host;
    this.port = _port;
    this.blockchain = blockchain;
    this.chainId = chainId.toString();
    this.token = null;
  }
  static placeholder() {
    return new Network();
  }
  static fromJson(json) {
    const p = Object.assign(Network.placeholder(), json);
    p.chainId = p.chainId ? p.chainId.toString() : "";
    p.token = json.hasOwnProperty("token") && json.token ? Token.fromJson(json.token) : null;
    return p;
  }
  fullhost() {
    return `${this.protocol}://${this.host}${this.port ? ":" : ""}${this.port}`;
  }
  unique() {
    return (`${this.blockchain}:` + (this.chainId.length ? `chain:${this.chainId}` : `${this.host}:${this.port}`)).toLowerCase();
  }
}
let storage = {};
const getWindow = () => {
  if (typeof window !== "undefined") return window;
  return {
    localStorage: {
      setItem: (key, val) => storage[key] = val,
      getItem: (key) => storage[key] || null,
      removeItem: (key) => delete storage[key]
    }
  };
};
class StorageService {
  constructor() {
  }
  static setAppKey(appkey) {
    getWindow().localStorage.setItem("appkey", appkey);
  }
  static getAppKey() {
    return getWindow().localStorage.getItem("appkey");
  }
  static removeAppKey() {
    return getWindow().localStorage.removeItem("appkey");
  }
  static setNonce(nonce) {
    getWindow().localStorage.setItem("nonce", nonce);
  }
  static getNonce() {
    return getWindow().localStorage.getItem("nonce");
  }
  static removeNonce() {
    return getWindow().localStorage.removeItem("nonce");
  }
}
/*!
* device-uuid.js v1.0.4 (https://github.com/biggora/device-uuid/)
* Copyright 2016-2017 Alexey Gordeyev
* Licensed under MIT (https://github.com/biggora/device-uuid/blob/master/LICENSE)
*/
var BOTS = [
  "\\+https:\\/\\/developers.google.com\\/\\+\\/web\\/snippet\\/",
  "googlebot",
  "baiduspider",
  "gurujibot",
  "yandexbot",
  "slurp",
  "msnbot",
  "bingbot",
  "facebookexternalhit",
  "linkedinbot",
  "twitterbot",
  "slackbot",
  "telegrambot",
  "applebot",
  "pingdom",
  "tumblr ",
  "Embedly",
  "spbot"
];
var IS_BOT_REGEXP = new RegExp("^.*(" + BOTS.join("|") + ").*$");
var DeviceUUID = function(options) {
  options = options ? options : {};
  var defOptions = {
    version: false,
    language: false,
    platform: true,
    os: true,
    pixelDepth: true,
    colorDepth: true,
    resolution: false,
    isAuthoritative: true,
    silkAccelerated: true,
    isKindleFire: true,
    isDesktop: true,
    isMobile: true,
    isTablet: true,
    isWindows: true,
    isLinux: true,
    isLinux64: true,
    isChromeOS: true,
    isMac: true,
    isiPad: true,
    isiPhone: true,
    isiPod: true,
    isAndroid: true,
    isSamsung: true,
    isSmartTV: true,
    isRaspberry: true,
    isBlackberry: true,
    isTouchScreen: true,
    isOpera: false,
    isIE: false,
    isEdge: false,
    isIECompatibilityMode: false,
    isSafari: false,
    isFirefox: false,
    isWebkit: false,
    isChrome: false,
    isKonqueror: false,
    isOmniWeb: false,
    isSeaMonkey: false,
    isFlock: false,
    isAmaya: false,
    isPhantomJS: false,
    isEpiphany: false,
    source: false,
    cpuCores: false
  };
  for (var key in options) {
    if (options.hasOwnProperty(key) && typeof defOptions[key] !== "undefined") {
      defOptions[key] = options[key];
    }
  }
  this.options = defOptions;
  this.version = "1.0.0";
  this._Versions = {
    Edge: /Edge\/([\d\w\.\-]+)/i,
    Firefox: /firefox\/([\d\w\.\-]+)/i,
    IE: /msie\s([\d\.]+[\d])|trident\/\d+\.\d+;.*[rv:]+(\d+\.\d)/i,
    Chrome: /chrome\/([\d\w\.\-]+)/i,
    Chromium: /(?:chromium|crios)\/([\d\w\.\-]+)/i,
    Safari: /version\/([\d\w\.\-]+)/i,
    Opera: /version\/([\d\w\.\-]+)|OPR\/([\d\w\.\-]+)/i,
    Ps3: /([\d\w\.\-]+)\)\s*$/i,
    Psp: /([\d\w\.\-]+)\)?\s*$/i,
    Amaya: /amaya\/([\d\w\.\-]+)/i,
    SeaMonkey: /seamonkey\/([\d\w\.\-]+)/i,
    OmniWeb: /omniweb\/v([\d\w\.\-]+)/i,
    Flock: /flock\/([\d\w\.\-]+)/i,
    Epiphany: /epiphany\/([\d\w\.\-]+)/i,
    WinJs: /msapphost\/([\d\w\.\-]+)/i,
    PhantomJS: /phantomjs\/([\d\w\.\-]+)/i,
    UC: /UCBrowser\/([\d\w\.]+)/i
  };
  this._Browsers = {
    Edge: /edge/i,
    Amaya: /amaya/i,
    Konqueror: /konqueror/i,
    Epiphany: /epiphany/i,
    SeaMonkey: /seamonkey/i,
    Flock: /flock/i,
    OmniWeb: /omniweb/i,
    Chromium: /chromium|crios/i,
    Chrome: /chrome/i,
    Safari: /safari/i,
    IE: /msie|trident/i,
    Opera: /opera|OPR/i,
    PS3: /playstation 3/i,
    PSP: /playstation portable/i,
    Firefox: /firefox/i,
    WinJs: /msapphost/i,
    PhantomJS: /phantomjs/i,
    UC: /UCBrowser/i
  };
  this._OS = {
    Windows10: /windows nt 10\.0/i,
    Windows81: /windows nt 6\.3/i,
    Windows8: /windows nt 6\.2/i,
    Windows7: /windows nt 6\.1/i,
    UnknownWindows: /windows nt 6\.\d+/i,
    WindowsVista: /windows nt 6\.0/i,
    Windows2003: /windows nt 5\.2/i,
    WindowsXP: /windows nt 5\.1/i,
    Windows2000: /windows nt 5\.0/i,
    WindowsPhone8: /windows phone 8\./,
    OSXCheetah: /os x 10[._]0/i,
    OSXPuma: /os x 10[._]1(\D|$)/i,
    OSXJaguar: /os x 10[._]2/i,
    OSXPanther: /os x 10[._]3/i,
    OSXTiger: /os x 10[._]4/i,
    OSXLeopard: /os x 10[._]5/i,
    OSXSnowLeopard: /os x 10[._]6/i,
    OSXLion: /os x 10[._]7/i,
    OSXMountainLion: /os x 10[._]8/i,
    OSXMavericks: /os x 10[._]9/i,
    OSXYosemite: /os x 10[._]10/i,
    OSXElCapitan: /os x 10[._]11/i,
    OSXSierra: /os x 10[._]12/i,
    Mac: /os x/i,
    Linux: /linux/i,
    Linux64: /linux x86_64/i,
    ChromeOS: /cros/i,
    Wii: /wii/i,
    PS3: /playstation 3/i,
    PSP: /playstation portable/i,
    iPad: /\(iPad.*os (\d+)[._](\d+)/i,
    iPhone: /\(iPhone.*os (\d+)[._](\d+)/i,
    Bada: /Bada\/(\d+)\.(\d+)/i,
    Curl: /curl\/(\d+)\.(\d+)\.(\d+)/i
  };
  this._Platform = {
    Windows: /windows nt/i,
    WindowsPhone: /windows phone/i,
    Mac: /macintosh/i,
    Linux: /linux/i,
    Wii: /wii/i,
    Playstation: /playstation/i,
    iPad: /ipad/i,
    iPod: /ipod/i,
    iPhone: /iphone/i,
    Android: /android/i,
    Blackberry: /blackberry/i,
    Samsung: /samsung/i,
    Curl: /curl/i
  };
  this.DefaultAgent = {
    isAuthoritative: true,
    isMobile: false,
    isTablet: false,
    isiPad: false,
    isiPod: false,
    isiPhone: false,
    isAndroid: false,
    isBlackberry: false,
    isOpera: false,
    isIE: false,
    isEdge: false,
    isIECompatibilityMode: false,
    isSafari: false,
    isFirefox: false,
    isWebkit: false,
    isChrome: false,
    isKonqueror: false,
    isOmniWeb: false,
    isSeaMonkey: false,
    isFlock: false,
    isAmaya: false,
    isPhantomJS: false,
    isEpiphany: false,
    isDesktop: false,
    isWindows: false,
    isLinux: false,
    isLinux64: false,
    isMac: false,
    isChromeOS: false,
    isBada: false,
    isSamsung: false,
    isRaspberry: false,
    isBot: false,
    isCurl: false,
    isAndroidTablet: false,
    isWinJs: false,
    isKindleFire: false,
    isSilk: false,
    isCaptive: false,
    isSmartTV: false,
    isUC: false,
    isTouchScreen: false,
    silkAccelerated: false,
    colorDepth: -1,
    pixelDepth: -1,
    resolution: [],
    cpuCores: -1,
    language: "unknown",
    browser: "unknown",
    version: "unknown",
    os: "unknown",
    platform: "unknown",
    geoIp: {},
    source: "",
    hashInt: function(string) {
      var hash2 = 0, i, chr, len;
      if (string.length === 0) {
        return hash2;
      }
      for (i = 0, len = string.length; i < len; i++) {
        chr = string.charCodeAt(i);
        hash2 = (hash2 << 5) - hash2 + chr;
        hash2 |= 0;
      }
      return hash2;
    },
    hashMD5: function(string) {
      function rotateLeft(lValue, iShiftBits) {
        return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
      }
      function addUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = lX & 2147483648;
        lY8 = lY & 2147483648;
        lX4 = lX & 1073741824;
        lY4 = lY & 1073741824;
        lResult = (lX & 1073741823) + (lY & 1073741823);
        if (lX4 & lY4) {
          return lResult ^ 2147483648 ^ lX8 ^ lY8;
        }
        if (lX4 | lY4) {
          if (lResult & 1073741824) {
            return lResult ^ 3221225472 ^ lX8 ^ lY8;
          } else {
            return lResult ^ 1073741824 ^ lX8 ^ lY8;
          }
        } else {
          return lResult ^ lX8 ^ lY8;
        }
      }
      function gF(x2, y, z) {
        return x2 & y | ~x2 & z;
      }
      function gG(x2, y, z) {
        return x2 & z | y & ~z;
      }
      function gH(x2, y, z) {
        return x2 ^ y ^ z;
      }
      function gI(x2, y, z) {
        return y ^ (x2 | ~z);
      }
      function gFF(a2, b2, c2, d2, x2, s, ac) {
        a2 = addUnsigned(a2, addUnsigned(addUnsigned(gF(b2, c2, d2), x2), ac));
        return addUnsigned(rotateLeft(a2, s), b2);
      }
      function gGG(a2, b2, c2, d2, x2, s, ac) {
        a2 = addUnsigned(a2, addUnsigned(addUnsigned(gG(b2, c2, d2), x2), ac));
        return addUnsigned(rotateLeft(a2, s), b2);
      }
      function gHH(a2, b2, c2, d2, x2, s, ac) {
        a2 = addUnsigned(a2, addUnsigned(addUnsigned(gH(b2, c2, d2), x2), ac));
        return addUnsigned(rotateLeft(a2, s), b2);
      }
      function gII(a2, b2, c2, d2, x2, s, ac) {
        a2 = addUnsigned(a2, addUnsigned(addUnsigned(gI(b2, c2, d2), x2), ac));
        return addUnsigned(rotateLeft(a2, s), b2);
      }
      function convertToWordArray(string2) {
        var lWordCount;
        var lMessageLength = string2.length;
        var lNumberOfWordsTemp1 = lMessageLength + 8;
        var lNumberOfWordsTemp2 = (lNumberOfWordsTemp1 - lNumberOfWordsTemp1 % 64) / 64;
        var lNumberOfWords = (lNumberOfWordsTemp2 + 1) * 16;
        var lWordArray = new Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
          lWordCount = (lByteCount - lByteCount % 4) / 4;
          lBytePosition = lByteCount % 4 * 8;
          lWordArray[lWordCount] = lWordArray[lWordCount] | string2.charCodeAt(lByteCount) << lBytePosition;
          lByteCount++;
        }
        lWordCount = (lByteCount - lByteCount % 4) / 4;
        lBytePosition = lByteCount % 4 * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | 128 << lBytePosition;
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
      }
      function wordToHex(lValue) {
        var wordToHexValue = "", wordToHexValueTemp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
          lByte = lValue >>> lCount * 8 & 255;
          wordToHexValueTemp = "0" + lByte.toString(16);
          wordToHexValue = wordToHexValue + wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2);
        }
        return wordToHexValue;
      }
      function utf8Encode(string2) {
        string2 = string2.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string2.length; n++) {
          var c2 = string2.charCodeAt(n);
          if (c2 < 128) {
            utftext += String.fromCharCode(c2);
          } else if (c2 > 127 && c2 < 2048) {
            utftext += String.fromCharCode(c2 >> 6 | 192);
            utftext += String.fromCharCode(c2 & 63 | 128);
          } else {
            utftext += String.fromCharCode(c2 >> 12 | 224);
            utftext += String.fromCharCode(c2 >> 6 & 63 | 128);
            utftext += String.fromCharCode(c2 & 63 | 128);
          }
        }
        return utftext;
      }
      var x = [];
      var k, AA, BB, CC, DD, a, b, c, d;
      var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
      var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
      var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
      var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
      string = utf8Encode(string);
      x = convertToWordArray(string);
      a = 1732584193;
      b = 4023233417;
      c = 2562383102;
      d = 271733878;
      for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = gFF(a, b, c, d, x[k + 0], S11, 3614090360);
        d = gFF(d, a, b, c, x[k + 1], S12, 3905402710);
        c = gFF(c, d, a, b, x[k + 2], S13, 606105819);
        b = gFF(b, c, d, a, x[k + 3], S14, 3250441966);
        a = gFF(a, b, c, d, x[k + 4], S11, 4118548399);
        d = gFF(d, a, b, c, x[k + 5], S12, 1200080426);
        c = gFF(c, d, a, b, x[k + 6], S13, 2821735955);
        b = gFF(b, c, d, a, x[k + 7], S14, 4249261313);
        a = gFF(a, b, c, d, x[k + 8], S11, 1770035416);
        d = gFF(d, a, b, c, x[k + 9], S12, 2336552879);
        c = gFF(c, d, a, b, x[k + 10], S13, 4294925233);
        b = gFF(b, c, d, a, x[k + 11], S14, 2304563134);
        a = gFF(a, b, c, d, x[k + 12], S11, 1804603682);
        d = gFF(d, a, b, c, x[k + 13], S12, 4254626195);
        c = gFF(c, d, a, b, x[k + 14], S13, 2792965006);
        b = gFF(b, c, d, a, x[k + 15], S14, 1236535329);
        a = gGG(a, b, c, d, x[k + 1], S21, 4129170786);
        d = gGG(d, a, b, c, x[k + 6], S22, 3225465664);
        c = gGG(c, d, a, b, x[k + 11], S23, 643717713);
        b = gGG(b, c, d, a, x[k + 0], S24, 3921069994);
        a = gGG(a, b, c, d, x[k + 5], S21, 3593408605);
        d = gGG(d, a, b, c, x[k + 10], S22, 38016083);
        c = gGG(c, d, a, b, x[k + 15], S23, 3634488961);
        b = gGG(b, c, d, a, x[k + 4], S24, 3889429448);
        a = gGG(a, b, c, d, x[k + 9], S21, 568446438);
        d = gGG(d, a, b, c, x[k + 14], S22, 3275163606);
        c = gGG(c, d, a, b, x[k + 3], S23, 4107603335);
        b = gGG(b, c, d, a, x[k + 8], S24, 1163531501);
        a = gGG(a, b, c, d, x[k + 13], S21, 2850285829);
        d = gGG(d, a, b, c, x[k + 2], S22, 4243563512);
        c = gGG(c, d, a, b, x[k + 7], S23, 1735328473);
        b = gGG(b, c, d, a, x[k + 12], S24, 2368359562);
        a = gHH(a, b, c, d, x[k + 5], S31, 4294588738);
        d = gHH(d, a, b, c, x[k + 8], S32, 2272392833);
        c = gHH(c, d, a, b, x[k + 11], S33, 1839030562);
        b = gHH(b, c, d, a, x[k + 14], S34, 4259657740);
        a = gHH(a, b, c, d, x[k + 1], S31, 2763975236);
        d = gHH(d, a, b, c, x[k + 4], S32, 1272893353);
        c = gHH(c, d, a, b, x[k + 7], S33, 4139469664);
        b = gHH(b, c, d, a, x[k + 10], S34, 3200236656);
        a = gHH(a, b, c, d, x[k + 13], S31, 681279174);
        d = gHH(d, a, b, c, x[k + 0], S32, 3936430074);
        c = gHH(c, d, a, b, x[k + 3], S33, 3572445317);
        b = gHH(b, c, d, a, x[k + 6], S34, 76029189);
        a = gHH(a, b, c, d, x[k + 9], S31, 3654602809);
        d = gHH(d, a, b, c, x[k + 12], S32, 3873151461);
        c = gHH(c, d, a, b, x[k + 15], S33, 530742520);
        b = gHH(b, c, d, a, x[k + 2], S34, 3299628645);
        a = gII(a, b, c, d, x[k + 0], S41, 4096336452);
        d = gII(d, a, b, c, x[k + 7], S42, 1126891415);
        c = gII(c, d, a, b, x[k + 14], S43, 2878612391);
        b = gII(b, c, d, a, x[k + 5], S44, 4237533241);
        a = gII(a, b, c, d, x[k + 12], S41, 1700485571);
        d = gII(d, a, b, c, x[k + 3], S42, 2399980690);
        c = gII(c, d, a, b, x[k + 10], S43, 4293915773);
        b = gII(b, c, d, a, x[k + 1], S44, 2240044497);
        a = gII(a, b, c, d, x[k + 8], S41, 1873313359);
        d = gII(d, a, b, c, x[k + 15], S42, 4264355552);
        c = gII(c, d, a, b, x[k + 6], S43, 2734768916);
        b = gII(b, c, d, a, x[k + 13], S44, 1309151649);
        a = gII(a, b, c, d, x[k + 4], S41, 4149444226);
        d = gII(d, a, b, c, x[k + 11], S42, 3174756917);
        c = gII(c, d, a, b, x[k + 2], S43, 718787259);
        b = gII(b, c, d, a, x[k + 9], S44, 3951481745);
        a = addUnsigned(a, AA);
        b = addUnsigned(b, BB);
        c = addUnsigned(c, CC);
        d = addUnsigned(d, DD);
      }
      var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
      return temp.toLowerCase();
    }
  };
  this.Agent = {};
  this.getBrowser = function(string) {
    switch (true) {
      case this._Browsers.Edge.test(string):
        this.Agent.isEdge = true;
        return "Edge";
      case this._Browsers.PhantomJS.test(string):
        this.Agent.isPhantomJS = true;
        return "PhantomJS";
      case this._Browsers.Konqueror.test(string):
        this.Agent.isKonqueror = true;
        return "Konqueror";
      case this._Browsers.Amaya.test(string):
        this.Agent.isAmaya = true;
        return "Amaya";
      case this._Browsers.Epiphany.test(string):
        this.Agent.isEpiphany = true;
        return "Epiphany";
      case this._Browsers.SeaMonkey.test(string):
        this.Agent.isSeaMonkey = true;
        return "SeaMonkey";
      case this._Browsers.Flock.test(string):
        this.Agent.isFlock = true;
        return "Flock";
      case this._Browsers.OmniWeb.test(string):
        this.Agent.isOmniWeb = true;
        return "OmniWeb";
      case this._Browsers.Opera.test(string):
        this.Agent.isOpera = true;
        return "Opera";
      case this._Browsers.Chromium.test(string):
        this.Agent.isChrome = true;
        return "Chromium";
      case this._Browsers.Chrome.test(string):
        this.Agent.isChrome = true;
        return "Chrome";
      case this._Browsers.Safari.test(string):
        this.Agent.isSafari = true;
        return "Safari";
      case this._Browsers.WinJs.test(string):
        this.Agent.isWinJs = true;
        return "WinJs";
      case this._Browsers.IE.test(string):
        this.Agent.isIE = true;
        return "IE";
      case this._Browsers.PS3.test(string):
        return "ps3";
      case this._Browsers.PSP.test(string):
        return "psp";
      case this._Browsers.Firefox.test(string):
        this.Agent.isFirefox = true;
        return "Firefox";
      case this._Browsers.UC.test(string):
        this.Agent.isUC = true;
        return "UCBrowser";
      default:
        if (string.indexOf("Mozilla") !== 0 && /^([\d\w\-\.]+)\/[\d\w\.\-]+/i.test(string)) {
          this.Agent.isAuthoritative = false;
          return RegExp.$1;
        }
        return "unknown";
    }
  };
  this.getBrowserVersion = function(string) {
    var regex;
    switch (this.Agent.browser) {
      case "Edge":
        if (this._Versions.Edge.test(string)) {
          return RegExp.$1;
        }
        break;
      case "PhantomJS":
        if (this._Versions.PhantomJS.test(string)) {
          return RegExp.$1;
        }
        break;
      case "Chrome":
        if (this._Versions.Chrome.test(string)) {
          return RegExp.$1;
        }
        break;
      case "Chromium":
        if (this._Versions.Chromium.test(string)) {
          return RegExp.$1;
        }
        break;
      case "Safari":
        if (this._Versions.Safari.test(string)) {
          return RegExp.$1;
        }
        break;
      case "Opera":
        if (this._Versions.Opera.test(string)) {
          return RegExp.$1 ? RegExp.$1 : RegExp.$2;
        }
        break;
      case "Firefox":
        if (this._Versions.Firefox.test(string)) {
          return RegExp.$1;
        }
        break;
      case "WinJs":
        if (this._Versions.WinJs.test(string)) {
          return RegExp.$1;
        }
        break;
      case "IE":
        if (this._Versions.IE.test(string)) {
          return RegExp.$2 ? RegExp.$2 : RegExp.$1;
        }
        break;
      case "ps3":
        if (this._Versions.Ps3.test(string)) {
          return RegExp.$1;
        }
        break;
      case "psp":
        if (this._Versions.Psp.test(string)) {
          return RegExp.$1;
        }
        break;
      case "Amaya":
        if (this._Versions.Amaya.test(string)) {
          return RegExp.$1;
        }
        break;
      case "Epiphany":
        if (this._Versions.Epiphany.test(string)) {
          return RegExp.$1;
        }
        break;
      case "SeaMonkey":
        if (this._Versions.SeaMonkey.test(string)) {
          return RegExp.$1;
        }
        break;
      case "Flock":
        if (this._Versions.Flock.test(string)) {
          return RegExp.$1;
        }
        break;
      case "OmniWeb":
        if (this._Versions.OmniWeb.test(string)) {
          return RegExp.$1;
        }
        break;
      case "UCBrowser":
        if (this._Versions.UC.test(string)) {
          return RegExp.$1;
        }
        break;
      default:
        if (this.Agent.browser !== "unknown") {
          regex = new RegExp(this.Agent.browser + "[\\/ ]([\\d\\w\\.\\-]+)", "i");
          if (regex.test(string)) {
            return RegExp.$1;
          }
        }
    }
  };
  this.getOS = function(string) {
    switch (true) {
      case this._OS.WindowsVista.test(string):
        this.Agent.isWindows = true;
        return "Windows Vista";
      case this._OS.Windows7.test(string):
        this.Agent.isWindows = true;
        return "Windows 7";
      case this._OS.Windows8.test(string):
        this.Agent.isWindows = true;
        return "Windows 8";
      case this._OS.Windows81.test(string):
        this.Agent.isWindows = true;
        return "Windows 8.1";
      case this._OS.Windows10.test(string):
        this.Agent.isWindows = true;
        return "Windows 10.0";
      case this._OS.Windows2003.test(string):
        this.Agent.isWindows = true;
        return "Windows 2003";
      case this._OS.WindowsXP.test(string):
        this.Agent.isWindows = true;
        return "Windows XP";
      case this._OS.Windows2000.test(string):
        this.Agent.isWindows = true;
        return "Windows 2000";
      case this._OS.WindowsPhone8.test(string):
        return "Windows Phone 8";
      case this._OS.Linux64.test(string):
        this.Agent.isLinux = true;
        this.Agent.isLinux64 = true;
        return "Linux 64";
      case this._OS.Linux.test(string):
        this.Agent.isLinux = true;
        return "Linux";
      case this._OS.ChromeOS.test(string):
        this.Agent.isChromeOS = true;
        return "Chrome OS";
      case this._OS.Wii.test(string):
        return "Wii";
      case this._OS.PS3.test(string):
        return "Playstation";
      case this._OS.PSP.test(string):
        return "Playstation";
      case this._OS.OSXCheetah.test(string):
        this.Agent.isMac = true;
        return "OS X Cheetah";
      case this._OS.OSXPuma.test(string):
        this.Agent.isMac = true;
        return "OS X Puma";
      case this._OS.OSXJaguar.test(string):
        this.Agent.isMac = true;
        return "OS X Jaguar";
      case this._OS.OSXPanther.test(string):
        this.Agent.isMac = true;
        return "OS X Panther";
      case this._OS.OSXTiger.test(string):
        this.Agent.isMac = true;
        return "OS X Tiger";
      case this._OS.OSXLeopard.test(string):
        this.Agent.isMac = true;
        return "OS X Leopard";
      case this._OS.OSXSnowLeopard.test(string):
        this.Agent.isMac = true;
        return "OS X Snow Leopard";
      case this._OS.OSXLion.test(string):
        this.Agent.isMac = true;
        return "OS X Lion";
      case this._OS.OSXMountainLion.test(string):
        this.Agent.isMac = true;
        return "OS X Mountain Lion";
      case this._OS.OSXMavericks.test(string):
        this.Agent.isMac = true;
        return "OS X Mavericks";
      case this._OS.OSXYosemite.test(string):
        this.Agent.isMac = true;
        return "OS X Yosemite";
      case this._OS.OSXElCapitan.test(string):
        this.Agent.isMac = true;
        return "OS X El Capitan";
      case this._OS.OSXSierra.test(string):
        this.Agent.isMac = true;
        return "macOS Sierra";
      case this._OS.Mac.test(string):
        this.Agent.isMac = true;
        return "OS X";
      case this._OS.iPad.test(string):
        this.Agent.isiPad = true;
        return string.match(this._OS.iPad)[0].replace("_", ".");
      case this._OS.iPhone.test(string):
        this.Agent.isiPhone = true;
        return string.match(this._OS.iPhone)[0].replace("_", ".");
      case this._OS.Bada.test(string):
        this.Agent.isBada = true;
        return "Bada";
      case this._OS.Curl.test(string):
        this.Agent.isCurl = true;
        return "Curl";
      default:
        return "unknown";
    }
  };
  this.getPlatform = function(string) {
    switch (true) {
      case this._Platform.Windows.test(string):
        return "Microsoft Windows";
      case this._Platform.WindowsPhone.test(string):
        this.Agent.isWindowsPhone = true;
        return "Microsoft Windows Phone";
      case this._Platform.Mac.test(string):
        return "Apple Mac";
      case this._Platform.Curl.test(string):
        return "Curl";
      case this._Platform.Android.test(string):
        this.Agent.isAndroid = true;
        return "Android";
      case this._Platform.Blackberry.test(string):
        this.Agent.isBlackberry = true;
        return "Blackberry";
      case this._Platform.Linux.test(string):
        return "Linux";
      case this._Platform.Wii.test(string):
        return "Wii";
      case this._Platform.Playstation.test(string):
        return "Playstation";
      case this._Platform.iPad.test(string):
        this.Agent.isiPad = true;
        return "iPad";
      case this._Platform.iPod.test(string):
        this.Agent.isiPod = true;
        return "iPod";
      case this._Platform.iPhone.test(string):
        this.Agent.isiPhone = true;
        return "iPhone";
      case this._Platform.Samsung.test(string):
        this.Agent.isiSamsung = true;
        return "Samsung";
      default:
        return "unknown";
    }
  };
  this.testCompatibilityMode = function() {
    var ua = this;
    if (this.Agent.isIE) {
      if (/Trident\/(\d)\.0/i.test(ua.Agent.source)) {
        var tridentVersion = parseInt(RegExp.$1, 10);
        var version2 = parseInt(ua.Agent.version, 10);
        if (version2 === 7 && tridentVersion === 7) {
          ua.Agent.isIECompatibilityMode = true;
          ua.Agent.version = 11;
        }
        if (version2 === 7 && tridentVersion === 6) {
          ua.Agent.isIECompatibilityMode = true;
          ua.Agent.version = 10;
        }
        if (version2 === 7 && tridentVersion === 5) {
          ua.Agent.isIECompatibilityMode = true;
          ua.Agent.version = 9;
        }
        if (version2 === 7 && tridentVersion === 4) {
          ua.Agent.isIECompatibilityMode = true;
          ua.Agent.version = 8;
        }
      }
    }
  };
  this.testSilk = function() {
    var ua = this;
    switch (true) {
      case new RegExp("silk", "gi").test(ua.Agent.source):
        this.Agent.isSilk = true;
        break;
    }
    if (/Silk-Accelerated=true/gi.test(ua.Agent.source)) {
      this.Agent.SilkAccelerated = true;
    }
    return this.Agent.isSilk ? "Silk" : false;
  };
  this.testKindleFire = function() {
    var ua = this;
    switch (true) {
      case /KFOT/gi.test(ua.Agent.source):
        this.Agent.isKindleFire = true;
        return "Kindle Fire";
      case /KFTT/gi.test(ua.Agent.source):
        this.Agent.isKindleFire = true;
        return "Kindle Fire HD";
      case /KFJWI/gi.test(ua.Agent.source):
        this.Agent.isKindleFire = true;
        return "Kindle Fire HD 8.9";
      case /KFJWA/gi.test(ua.Agent.source):
        this.Agent.isKindleFire = true;
        return "Kindle Fire HD 8.9 4G";
      case /KFSOWI/gi.test(ua.Agent.source):
        this.Agent.isKindleFire = true;
        return "Kindle Fire HD 7";
      case /KFTHWI/gi.test(ua.Agent.source):
        this.Agent.isKindleFire = true;
        return "Kindle Fire HDX 7";
      case /KFTHWA/gi.test(ua.Agent.source):
        this.Agent.isKindleFire = true;
        return "Kindle Fire HDX 7 4G";
      case /KFAPWI/gi.test(ua.Agent.source):
        this.Agent.isKindleFire = true;
        return "Kindle Fire HDX 8.9";
      case /KFAPWA/gi.test(ua.Agent.source):
        this.Agent.isKindleFire = true;
        return "Kindle Fire HDX 8.9 4G";
      default:
        return false;
    }
  };
  this.testCaptiveNetwork = function() {
    var ua = this;
    switch (true) {
      case /CaptiveNetwork/gi.test(ua.Agent.source):
        ua.Agent.isCaptive = true;
        ua.Agent.isMac = true;
        ua.Agent.platform = "Apple Mac";
        return "CaptiveNetwork";
      default:
        return false;
    }
  };
  this.testMobile = function testMobile() {
    var ua = this;
    switch (true) {
      case ua.Agent.isWindows:
      case ua.Agent.isLinux:
      case ua.Agent.isMac:
      case ua.Agent.isChromeOS:
        ua.Agent.isDesktop = true;
        break;
      case ua.Agent.isAndroid:
      case ua.Agent.isSamsung:
        ua.Agent.isMobile = true;
        ua.Agent.isDesktop = false;
        break;
    }
    switch (true) {
      case ua.Agent.isiPad:
      case ua.Agent.isiPod:
      case ua.Agent.isiPhone:
      case ua.Agent.isBada:
      case ua.Agent.isBlackberry:
      case ua.Agent.isAndroid:
      case ua.Agent.isWindowsPhone:
        ua.Agent.isMobile = true;
        ua.Agent.isDesktop = false;
        break;
    }
    if (/mobile/i.test(ua.Agent.source)) {
      ua.Agent.isMobile = true;
      ua.Agent.isDesktop = false;
    }
  };
  this.testTablet = function testTablet() {
    var ua = this;
    switch (true) {
      case ua.Agent.isiPad:
      case ua.Agent.isAndroidTablet:
      case ua.Agent.isKindleFire:
        ua.Agent.isTablet = true;
        break;
    }
    if (/tablet/i.test(ua.Agent.source)) {
      ua.Agent.isTablet = true;
    }
  };
  this.testNginxGeoIP = function testNginxGeoIP(headers) {
    var ua = this;
    Object.keys(headers).forEach(function(key2) {
      if (/^GEOIP/i.test(key2)) {
        ua.Agent.geoIp[key2] = headers[key2];
      }
    });
  };
  this.testBot = function testBot() {
    var ua = this;
    var isBot = IS_BOT_REGEXP.exec(ua.Agent.source.toLowerCase());
    if (isBot) {
      ua.Agent.isBot = isBot[1];
    } else if (!ua.Agent.isAuthoritative) {
      ua.Agent.isBot = /bot/i.test(ua.Agent.source);
    }
  };
  this.testSmartTV = function testBot() {
    var ua = this;
    var isSmartTV = new RegExp("smart-tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast.tv", "gi").exec(ua.Agent.source.toLowerCase());
    if (isSmartTV) {
      ua.Agent.isSmartTV = isSmartTV[1];
    }
  };
  this.testAndroidTablet = function testAndroidTablet() {
    var ua = this;
    if (ua.Agent.isAndroid && !/mobile/i.test(ua.Agent.source)) {
      ua.Agent.isAndroidTablet = true;
    }
  };
  this.testTouchSupport = function() {
    var ua = this;
    ua.Agent.isTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  };
  this.getLaguage = function() {
    var ua = this;
    ua.Agent.language = (navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || "").toLowerCase();
  };
  this.getColorDepth = function() {
    var ua = this;
    ua.Agent.colorDepth = screen.colorDepth || -1;
  };
  this.getScreenResolution = function() {
    var ua = this;
    ua.Agent.resolution = [screen.availWidth, screen.availHeight];
  };
  this.getPixelDepth = function() {
    var ua = this;
    ua.Agent.pixelDepth = screen.pixelDepth || -1;
  };
  this.getCPU = function() {
    var ua = this;
    ua.Agent.cpuCores = navigator.hardwareConcurrency || -1;
  };
  this.reset = function reset() {
    var ua = this;
    for (var key2 in ua.DefaultAgent) {
      if (ua.DefaultAgent.hasOwnProperty(key2)) {
        ua.Agent[key2] = ua.DefaultAgent[key2];
      }
    }
    return ua;
  };
  this.parse = function get(source) {
    source = source || navigator.userAgent;
    var ua = new DeviceUUID();
    ua.Agent.source = source.replace(/^\s*/, "").replace(/\s*$/, "");
    ua.Agent.os = ua.getOS(ua.Agent.source);
    ua.Agent.platform = ua.getPlatform(ua.Agent.source);
    ua.Agent.browser = ua.getBrowser(ua.Agent.source);
    ua.Agent.version = ua.getBrowserVersion(ua.Agent.source);
    ua.testBot();
    ua.testSmartTV();
    ua.testMobile();
    ua.testAndroidTablet();
    ua.testTablet();
    ua.testCompatibilityMode();
    ua.testSilk();
    ua.testKindleFire();
    ua.testCaptiveNetwork();
    ua.testTouchSupport();
    ua.getLaguage();
    ua.getColorDepth();
    ua.getPixelDepth();
    ua.getScreenResolution();
    ua.getCPU();
    return ua.Agent;
  };
  this.get = function(customData) {
    var pref = "a", du = this.parse();
    var dua = [];
    for (var key2 in this.options) {
      if (this.options.hasOwnProperty(key2) && this.options[key2] === true) {
        dua.push(du[key2]);
      }
    }
    if (customData) {
      dua.push(customData);
    }
    if (!this.options.resolution && du.isMobile) {
      dua.push(du.resolution);
    }
    pref = "b";
    var tmpUuid = du.hashMD5(dua.join(":"));
    var uuid = [
      tmpUuid.slice(0, 8),
      tmpUuid.slice(8, 12),
      "4" + tmpUuid.slice(12, 15),
      pref + tmpUuid.slice(15, 18),
      tmpUuid.slice(20)
    ];
    return uuid.join("-");
  };
  this.Agent = this.DefaultAgent;
  return this;
};
let device;
if (typeof navigator === "undefined") {
  device = "nodejs_env";
} else {
  const du = new DeviceUUID().parse();
  const dua = [
    du.language,
    du.platform,
    du.os,
    du.cpuCores,
    du.colorDepth
  ];
  device = du.hashMD5(dua.join(":"));
}
var device$1 = device;
const suffix = "/socket.io/?EIO=3&transport=websocket";
const sha256 = (data) => createHash__default["default"]("sha256").update(data).digest("hex");
const random = () => {
  let array = new Uint8Array(24);
  getRandomValues__default["default"](array);
  return array.join("");
};
class SocketService {
  constructor(_plugin, _timeout) {
    this.plugin = _plugin;
    this.timeout = _timeout;
    this.uuid = null;
    this.socket = null;
    this.connected = false;
    this.paired = false;
    this.openRequests = [];
    this.pairingPromise = null;
    this.eventHandlers = {};
    this.appkey = StorageService.getAppKey();
    if (!this.appkey) this.appkey = "appkey:" + random();
  }
  addEventHandler(handler, key) {
    if (!key) key = "app";
    this.eventHandlers[key] = handler;
  }
  removeEventHandler(key) {
    if (!key) key = "app";
    delete this.eventHandlers[key];
  }
  link(allowHttp = true, _uuid = null, socketHost = null) {
    this.uuid = _uuid;
    return new Promise(async (resolve) => {
      const setupSocket = () => {
        this.socket.onmessage = (msg) => {
          if (msg.data.indexOf("42/scatter") === -1) return false;
          const [type, data] = JSON.parse(msg.data.replace("42/scatter,", ""));
          if (type === "pong") return;
          if (type === "ping") return this.socket.send(`42/scatter,["pong"]`);
          switch (type) {
            case "paired":
              return msg_paired(data);
            case "rekey":
              return msg_rekey();
            case "api":
              return msg_api(data);
            case "event":
              return event_api(data);
          }
        };
        const msg_paired = (result) => {
          this.paired = result;
          if (this.paired) {
            const savedKey = StorageService.getAppKey();
            const hashed = this.appkey.indexOf("appkey:") > -1 ? sha256(this.appkey) : this.appkey;
            if (!savedKey || savedKey !== hashed) {
              StorageService.setAppKey(hashed);
              this.appkey = StorageService.getAppKey();
            }
          }
          this.pairingPromise.resolve(result);
        };
        const msg_rekey = () => {
          this.appkey = "appkey:" + random();
          this.send("rekeyed", { data: { appkey: this.appkey, origin: this.getOrigin() }, plugin: this.plugin });
        };
        const msg_api = (response) => {
          try {
            response = JSON.parse(response);
          } catch (e) {
          }
          const openRequest = this.openRequests.find((x) => x.id === response.id);
          if (!openRequest) return;
          this.openRequests = this.openRequests.filter((x) => x.id !== response.id);
          const isErrorResponse = typeof response.result === "object" && response.result !== null && response.result.hasOwnProperty("isError");
          if (isErrorResponse) openRequest.reject(response.result);
          else openRequest.resolve(response.result);
        };
        const event_api = ({ event, payload }) => {
          if (Object.keys(this.eventHandlers).length) Object.keys(this.eventHandlers).map((key) => {
            this.eventHandlers[key](event, payload);
          });
        };
      };
      const getHostname = (port, ssl) => {
        if (socketHost) return socketHost;
        return ssl ? `local.get-scatter.com:${port}` : `127.0.0.1:${port}`;
      };
      const ports = await new Promise(async (portResolver) => {
        if (socketHost) return portResolver([50006]);
        const checkPort = (host, cb) => fetch(host).then((r) => r.text()).then((r) => cb(r === "scatter")).catch(() => cb(false));
        let startingPort = 50005;
        let availablePorts = [];
        const preparePorts = () => (!availablePorts.length ? (
          /* BACKWARDS COMPAT */
          [50006, 50005]
        ) : availablePorts).filter((x) => {
          if (allowHttp) return true;
          return !(x % 2);
        }).sort((a, b) => {
          return !(b % 2) ? 1 : !(a % 2) ? -1 : 0;
        });
        let returned = false;
        const resolveAndPushPort = (port = null) => {
          if (returned) return;
          returned = true;
          if (port !== null) availablePorts.push(port);
          portResolver(preparePorts());
        };
        await Promise.all([...new Array(5).keys()].map(async (i) => {
          if (returned) return;
          const _port = startingPort + i * 1500;
          await checkPort(`https://` + getHostname(_port + 1, true), (x) => x ? resolveAndPushPort(_port + 1) : null);
          if (allowHttp) await checkPort(`http://` + getHostname(_port, false), (x) => x ? resolveAndPushPort(_port) : null);
          return true;
        }));
        resolveAndPushPort();
      });
      const trySocket = (port) => new Promise((socketResolver) => {
        const ssl = !(port % 2);
        const hostname = getHostname(port, ssl);
        const protocol = ssl ? "wss://" : "ws://";
        const s = new WebSocket__default["default"](`${protocol}${hostname}${suffix}`);
        s.onerror = () => socketResolver(false);
        s.onopen = () => socketResolver(s);
      });
      let connected = false;
      for (let i = 0; i < ports.length; i++) {
        if (connected) continue;
        const s = await trySocket(ports[i]);
        if (s) {
          connected = true;
          this.socket = s;
          this.send();
          this.connected = true;
          setupSocket();
          this.pairingPromise = null;
          this.pair(true).then(() => resolve(true));
          break;
        }
      }
    });
  }
  isConnected() {
    return this.socket && this.socket.readyState === 1;
  }
  isPaired() {
    return this.paired;
  }
  disconnect() {
    if (this.socket) this.socket.close();
    return true;
  }
  sendApiRequest(request) {
    return new Promise((resolve, reject) => {
      if (request.type === "identityFromPermissions" && !this.paired) return resolve(false);
      this.pair().then(() => {
        if (!this.paired) return reject({ code: "not_paired", message: "The user did not allow this app to connect to their Scatter" });
        request.id = random();
        request.appkey = this.appkey;
        request.nonce = StorageService.getNonce() || 0;
        const nextNonce = random();
        request.nextNonce = sha256(nextNonce);
        StorageService.setNonce(nextNonce);
        if (request.hasOwnProperty("payload") && !request.payload.hasOwnProperty("origin"))
          request.payload.origin = this.getOrigin();
        this.openRequests.push(Object.assign(request, { resolve, reject }));
        this.send("api", { data: request, plugin: this.plugin });
      });
    });
  }
  pair(passthrough = false) {
    return new Promise((resolve, reject) => {
      this.pairingPromise = { resolve, reject };
      this.send("pair", { data: { appkey: this.appkey, origin: this.getOrigin(), passthrough }, plugin: this.plugin });
    });
  }
  send(type = null, data = null) {
    if (type === null && data === null) this.socket.send("40/scatter");
    else this.socket.send("42/scatter," + JSON.stringify([type, Object.assign(data, { device: device$1, uuid: this.uuid })]));
  }
  getOrigin() {
    return SocketService.getOriginOrPlugin(this.plugin);
  }
  static getOriginOrPlugin(plugin) {
    let origin;
    if (typeof location !== "undefined")
      if (location.hasOwnProperty("hostname") && location.hostname.length && location.hostname !== "localhost")
        origin = location.hostname;
      else origin = plugin;
    else origin = plugin;
    if (origin.substr(0, 4) === "www.") origin = origin.replace("www.", "");
    return origin;
  }
}
class LocalSocket extends Plugin {
  constructor(context, holderFns2) {
    super("LocalSocket", WALLET_SUPPORT);
    this.name = "LocalSocket";
    this.context = context;
    this.holderFns = holderFns2;
  }
  connect(pluginName, options = {}) {
    return new Promise((resolve) => {
      if (!pluginName || !pluginName.length) throw new Error("You must specify a name for this connection");
      options = Object.assign({ linkTimeout: 3e3, allowHttp: true }, options);
      this.socketService = new SocketService(pluginName, options.linkTimeout);
      this.socketService.link(options.allowHttp).then(async (authenticated) => {
        if (!authenticated) return resolve(false);
        this.holderFns.get().isExtension = false;
        if (!this.holderFns.get().wallet) this.holderFns.get().wallet = this.name;
        return resolve(this.socketService);
      });
    });
  }
  async runAfterInterfacing() {
    this.holderFns.get().addEventHandler((t, x) => this.eventHandler(t, x), "internal");
    this.holderFns.get().identity = await this.holderFns.get().getIdentityFromPermissions();
    return true;
  }
  methods() {
    return WalletAPI.getMethods(this, () => this.socketService);
  }
  async eventHandler(event, payload) {
    switch (event) {
      case EVENTS.Disconnected:
        this.holderFns.get().identity = null;
        break;
      case EVENTS.LoggedOut:
        this.holderFns.get().identity = await this.holderFns.get().getIdentityFromPermissions();
        break;
    }
  }
}
const WEB_HOST = `https://relay.get-scatter.com:443`;
const SOCKET_HOST = `relaysock.get-scatter.com:443`;
class RelaySocket extends Plugin {
  constructor(context, holderFns2) {
    super("RelaySocket", WALLET_SUPPORT);
    this.name = "RelaySocket";
    this.context = context;
    this.holderFns = holderFns2;
  }
  connect(pluginName, options = {}) {
    return new Promise(async (resolve) => {
      if (!pluginName || !pluginName.length) throw new Error("You must specify a name for this connection");
      options = Object.assign({ linkTimeout: 3e3, allowHttp: true }, options);
      const uuid = await fetch(`${WEB_HOST}/app/connect/${device$1}`).then((x) => x.status === 200 ? x.json() : null);
      if (!uuid) return resolve(false);
      this.socketService = new SocketService(pluginName, options.linkTimeout);
      this.socketService.link(options.allowHttp, uuid, SOCKET_HOST).then(async (authenticated) => {
        if (!authenticated) return resolve(false);
        this.holderFns.get().isExtension = false;
        if (!this.holderFns.get().wallet) this.holderFns.get().wallet = this.name;
        return resolve(this.socketService);
      });
    });
  }
  async runAfterInterfacing() {
    this.holderFns.get().identity = await this.holderFns.get().getIdentityFromPermissions();
    return true;
  }
  methods() {
    return LocalSocket.getMethods(this);
  }
  async eventHandler(event, payload) {
    switch (event) {
      case EVENTS.Disconnected:
        this.holderFns.get().identity = null;
        break;
      case EVENTS.LoggedOut:
        this.holderFns.get().identity = await this.holderFns.get().getIdentityFromPermissions();
        break;
    }
  }
}
let isAvailable = false;
if (typeof window !== "undefined" && typeof document !== "undefined") {
  if (typeof window.scatter !== "undefined") isAvailable = true;
  else document.addEventListener("scatterLoaded", () => isAvailable = true);
}
const pollExistence = async (resolver = null, tries = 0) => {
  return new Promise((r) => {
    if (!resolver) resolver = r;
    if (isAvailable) return resolver(true);
    if (tries > 5) return resolver(false);
    setTimeout(() => pollExistence(resolver, tries + 1), 100);
  });
};
class LegacyInjection extends Plugin {
  constructor(context, holderFns2) {
    super("InjectedWallet", WALLET_SUPPORT);
    this.name = "InjectedWallet";
    this.context = context;
    this.holderFns = holderFns2;
  }
  async connect() {
    return new Promise(async (resolve) => {
      const found = await pollExistence();
      if (found) {
        if (this.holderFns && !this.holderFns.get().wallet) this.holderFns.get().wallet = this.name;
        resolve("injection");
      }
    });
  }
  async runBeforeInterfacing() {
    const network = this.context.network;
    if (network) {
      const getId = window.scatter.getIdentity.bind(window.scatter);
      const useIdentity = window.scatter.useIdentity.bind(window.scatter);
      window.scatter.getIdentity = (fields) => getId(fields ? fields : { accounts: [network] }).then((id) => {
        this.holderFns.get().identity = id;
        useIdentity(id);
        return id;
      });
      const suggest = window.scatter.suggestNetwork.bind(window.scatter);
      window.scatter.suggestNetwork = (net) => suggest(net ? net : network);
    }
    if (this.holderFns.get().wallet === this.name) {
      window.scatter.wallet = this.name;
    }
    this.holderFns.set(window.scatter);
    this.context = this.holderFns.get();
    return true;
  }
  async runAfterInterfacing() {
    this.context.isExtension = true;
    this.context.connect = this.connect;
    return true;
  }
  methods() {
    return {};
  }
}
class PluginRepositorySingleton {
  constructor() {
    this.plugins = [];
  }
  loadPlugin(plugin) {
    if (!this.plugin(plugin.name))
      this.plugins.push(plugin);
  }
  wallets() {
    return this.plugins.filter((plugin) => plugin.type === WALLET_SUPPORT);
  }
  signatureProviders() {
    return this.plugins.filter((plugin) => plugin.type === BLOCKCHAIN_SUPPORT);
  }
  supportedBlockchains() {
    return this.signatureProviders().map((plugin) => name);
  }
  plugin(name2) {
    return this.plugins.find((plugin) => plugin.name === name2);
  }
  async endorsedNetworks() {
    return await Promise.all(this.signatureProviders().map(async (plugin) => await plugin.getEndorsedNetwork()));
  }
}
const PluginRepository = new PluginRepositorySingleton();
const EVENTS = {
  Disconnected: "dced",
  LoggedOut: "logout"
};
let socket = null;
let socketSetters = [];
let holderFns = {};
class ScatterJS {
  constructor() {
    this.identity = null;
    this.network = null;
    PluginRepository.loadPlugin(new RelaySocket(this, holderFns));
    PluginRepository.loadPlugin(new LocalSocket(this, holderFns));
    PluginRepository.loadPlugin(new Injection(this, holderFns));
    PluginRepository.loadPlugin(new LegacyInjection(this, holderFns));
  }
  loadPlugin(plugin) {
    const noIdFunc = () => {
      if (!holderFns.get().identity) throw new Error("No Identity");
    };
    if (!plugin.isValid()) throw new Error(`${plugin.name} doesn't seem to be a valid ScatterJS plugin.`);
    PluginRepository.loadPlugin(plugin);
    if (plugin.type === BLOCKCHAIN_SUPPORT) {
      this[plugin.name] = plugin.signatureProvider(noIdFunc, () => holderFns.get().identity);
      this[plugin.name + "Hook"] = plugin.hookProvider;
      if (typeof plugin.multiHook === "function") this[plugin.name + "MultiHook"] = plugin.multiHook;
      socketSetters.push(plugin.setSocketService);
    }
    if (plugin.type === WALLET_SUPPORT) {
      plugin.init(this, holderFns, socketSetters);
    }
  }
  async connect(pluginName, options) {
    return new Promise(async (resolve) => {
      if (!options) options = {};
      this.network = options.hasOwnProperty("network") ? options.network : null;
      const wallets = PluginRepository.wallets();
      if (socket) {
        socket.disconnect();
        socket = null;
      }
      let connected = false;
      let promises = [];
      for (let i = 0; i < wallets.length; i++) {
        if (connected) return;
        const wallet = wallets[i];
        promises.push(Promise.race([
          wallet.connect(pluginName, options).then(async (socketService2) => {
            if (socketService2) {
              if (socketService2 !== "injection") {
                socket = socketService2;
                socketSetters.map((x) => x(socketService2));
              }
              if (typeof wallet.runBeforeInterfacing === "function") await wallet.runBeforeInterfacing();
              new WalletInterface(wallet.name, wallet.methods(), holderFns.get());
              if (typeof wallet.runAfterInterfacing === "function") await wallet.runAfterInterfacing();
              WalletInterface.bindBasics(holderFns.get());
              connected = true;
              resolve(true);
            }
          }).catch(() => false),
          new Promise((r) => setTimeout(() => r(false), 5e3))
        ]));
      }
      await Promise.all(promises);
      resolve(false);
    });
  }
}
class Holder {
  constructor(_scatter) {
    this.scatter = _scatter;
  }
  plugins(...plugins) {
    if (!this.scatter.isExtension) {
      plugins.map((plugin) => this.scatter.loadPlugin(plugin));
    }
  }
  connect(...params) {
    return this.scatter.connect(...params);
  }
  catchAll(...params) {
  }
}
let holder = new Proxy(new Holder(new ScatterJS()), {
  get(target, name2) {
    if (typeof target[name2] !== "undefined") return target[name2];
    return target.scatter[name2];
  }
});
holderFns.set = (s) => holder.scatter = s;
holderFns.get = () => holder.scatter;
if (typeof window !== "undefined") window.ScatterJS = holder;
holder.Plugin = Plugin;
holder.PluginTypes = PluginTypes;
holder.Blockchains = Blockchains;
holder.Network = Network;
holder.Token = Token;
holder.SocketService = SocketService;
holder.EVENTS = EVENTS;
holder.WalletInterface = WalletInterface;
holder.WALLET_METHODS = WALLET_METHODS;
let socketService = SocketService;
const proxy = (dummy, handler) => new Proxy(dummy, handler);
class ScatterEOS extends Plugin {
  constructor() {
    super(Blockchains.EOS, BLOCKCHAIN_SUPPORT);
  }
  setSocketService(_s) {
    socketService = _s;
  }
  hookProvider(network, fieldsFetcher = null) {
    network = Network.fromJson(network);
    return {
      requiredFields: {},
      getAvailableKeys: async () => {
        return await socketService.sendApiRequest({
          type: "identityFromPermissions",
          payload: {}
        }).then((id) => {
          if (!id) return [];
          return id.accounts.filter((x) => x.blockchain === Blockchains.EOS).map((x) => x.publicKey);
        });
      },
      sign: async (signargs) => {
        const requiredFields = fieldsFetcher ? fieldsFetcher() : {};
        signargs.serializedTransaction = _.Buffer.from(signargs.serializedTransaction).toString("hex");
        return new Promise(async (resolve, reject) => {
          socketService.sendApiRequest({
            type: "requestSignature",
            payload: { transaction: signargs, blockchain: Blockchains.EOS, network, requiredFields }
          }).then((x) => {
            resolve({ signatures: x.signatures, serializedTransaction: _.Buffer.from(signargs.serializedTransaction, "hex") });
          }).catch((x) => reject(x));
        });
      }
    };
  }
  multiHook(network, signers) {
    const scatterSigner = this.eosHook(network);
    if (!Array.isArray(signers)) signers = [signers];
    return {
      getAvailableKeys: async () => {
        try {
          const scatterKeys = await scatterSigner.getAvailableKeys();
          let otherKeys = [];
          await Promise.all(signers.map(async (signer) => {
            await signer.getAvailableKeys().then((keys2) => {
              keys2.map((key) => otherKeys.push(key));
            });
            return true;
          }));
          return scatterKeys.concat(otherKeys);
        } catch (e) {
          throw new Error(e);
        }
      },
      sign: async (signargs) => {
        try {
          const serializedTransaction = _.Buffer.from(signargs.serializedTransaction, "hex");
          const individualSignArgs = async (provider) => ({
            abis: signargs.abis,
            chainId: network.chainId,
            requiredKeys: await provider.getAvailableKeys(),
            serializedTransaction
          });
          const pullOutSignatures = (result) => {
            if (typeof result === "object" && result.hasOwnProperty("signatures")) return result.signatures;
            return result;
          };
          const scatterSigs = await scatterSigner.sign(await individualSignArgs(scatterSigner)).then((x) => pullOutSignatures(x));
          let otherSigs = [];
          await Promise.all(signers.map(async (signer) => {
            await signer.sign(await individualSignArgs(signer)).then((result) => {
              pullOutSignatures(result).map((sig) => otherSigs.push(sig));
            });
            return true;
          }));
          return {
            signatures: scatterSigs.concat(otherSigs),
            serializedTransaction
          };
        } catch (e) {
          throw new Error(e);
        }
      }
    };
  }
  signatureProvider(...args) {
    args[0];
    return (network, _api, _options = {}) => {
      network = Network.fromJson(network);
      let requiredFields = {};
      const fieldsFetcher = () => requiredFields;
      const signatureProvider = this.hookProvider(network, fieldsFetcher);
      return proxy(new _api(Object.assign(_options, { signatureProvider })), {
        get(eosInstance, method) {
          return (...args2) => {
            if (typeof eosInstance[method] === "undefined") {
              throw new Error(`${method} does not exist on the eosjs.Api() object.`);
            }
            const rqf = args2.find((arg) => arg.hasOwnProperty("requiredFields"));
            requiredFields = rqf ? rqf.requiredFields : {};
            return eosInstance[method](...args2);
          };
        }
      });
    };
  }
}
if (typeof window !== "undefined") {
  window.ScatterEOS = ScatterEOS;
}
scatter.Blockchains = Blockchains;
scatter.EVENTS = EVENTS;
scatter.Network = Network;
scatter.Plugin = Plugin;
scatter.PluginTypes = PluginTypes;
var ScatterEOS_1 = scatter.ScatterEOS = ScatterEOS;
var ScatterJS_1 = scatter.ScatterJS = holder;
scatter.SocketService = SocketService;
scatter.WALLET_METHODS = WALLET_METHODS;
scatter.WalletInterface = WalletInterface;
async function getScatter(context) {
  ScatterJS_1.plugins(new ScatterEOS_1());
  const url = new URL(context.chain.url);
  const protocol = url.protocol.replace(":", "") === "https" ? "https" : "http";
  const network = ScatterJS_1.Network.fromJson({
    blockchain: context.chain.name,
    chainId: String(context.chain.id),
    host: url.hostname,
    port: url.port ? Number(url.port) : protocol === "https" ? 443 : 80,
    protocol
  });
  const connected = await ScatterJS_1.connect(context.appName, { network });
  if (!connected) {
    throw new Error("Unable to connect with Scatter wallet");
  }
  const rpc = new JsonRpc(network.fullhost());
  rpc.getRequiredKeys = async () => [];
  const connector = ScatterJS_1.eos(network, Api, { rpc });
  return {
    scatter: ScatterJS_1,
    connector
  };
}
async function handleLogin(context) {
  if (!context.ui) {
    throw new Error("No UI available");
  }
  const { scatter: scatter2 } = await getScatter(context);
  const scatterIdentity = await scatter2.login();
  if (!scatterIdentity || !scatterIdentity.accounts) {
    throw new Error("Unable to retrieve account from Scatter");
  }
  const account = scatterIdentity.accounts[0];
  let chainId;
  if (account.chainId) {
    chainId = account.chainId;
  } else if (account.blockchain && Object.keys(Chains).includes(account.blockchain.toUpperCase())) {
    chainId = Chains[account.blockchain.toUpperCase()].id;
  } else {
    throw new Error("Unknown chain");
  }
  return {
    chain: Checksum256.from(chainId),
    permissionLevel: PermissionLevel.from(`${account.name}@${account.authority}`)
  };
}
async function handleLogout(context) {
  if (context.session === void 0) {
    throw new Error("Unknown session");
  }
  const { scatter: scatter2 } = await getScatter({ appName: context.appName, chain: context.session.chain });
  await scatter2.logout();
}
async function handleSignatureRequest(resolved, context) {
  if (!context.ui) {
    throw new Error("No UI available");
  }
  const { scatter: scatter2, connector } = await getScatter(context);
  const currentIdentity = await scatter2.checkLogin();
  if (!currentIdentity || !currentIdentity.accounts) {
    throw new Error("Please login first");
  }
  const encoded = Serializer.encode({ object: resolved.transaction });
  const decoded = await connector.deserializeTransactionWithActions(encoded.array);
  const response = await connector.transact(decoded, {
    broadcast: false
  });
  if (!response.serializedTransaction) {
    throw new Canceled("User Canceled request");
  }
  const modified = Serializer.decode({
    data: response.serializedTransaction,
    type: Transaction
  });
  const modifiedRequest = await SigningRequest.create({
    transaction: modified
  }, context.esrOptions);
  const abis = await modifiedRequest.fetchAbis(context.abiCache);
  const modifiedResolved = modifiedRequest.resolve(abis, context.permissionLevel);
  return {
    signatures: response.signatures,
    resolved: modifiedResolved
  };
}
export {
  getScatter,
  handleLogin,
  handleLogout,
  handleSignatureRequest
};
//# sourceMappingURL=protocol-scatter.m-Drgxap_P.js.map
